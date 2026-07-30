/* ═══════════════════════════════════════════════════════════════════════════
   Shared machinery for posting a public Zoho form server-side.

   Two forms use this: the connector request (one field) and the support ticket
   (four). Everything that is not form-specific lives here — origin checks, rate
   limiting, bot filters, the upstream call, the Node bridge — so a third form is
   a config object rather than another copy of these rules.

   WHY A SERVER SITS IN FRONT OF THESE AT ALL
   Zoho's public form endpoints are unauthenticated writes with no validation.
   Verified against both live forms: POST {} returns 200 with the same
   success-shaped payload as a real submission. Anyone holding the URL can fill
   the inbox. So the URLs live only in environment variables, never in this
   repository (public on GitHub, moving to git.devart.com), and never in the
   client bundle. Zoho's reply is not proxied back either: its thankyou_page_URL
   embeds the same formperma hash as the write endpoint.

   PORTABILITY (production is moving off Vercel)
   Plain Web-standard JavaScript — Request in, Response out. Globals only: fetch,
   Request, Response, Headers, URL, AbortSignal.timeout. Works unchanged on
   Vercel, Cloudflare Workers, Netlify v2, Deno, Bun, and any Node server via the
   nodeAdapter below. The per-host entry point is a one-liner in api/.
   ═══════════════════════════════════════════════════════════════════════════ */

const MIN_FILL_MS = 1200;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const UPSTREAM_TIMEOUT_MS = 8000;

/* When no header identifies the caller every visitor shares one bucket, so the
   normal per-IP ceiling would cap the whole site. This keeps a lid on the shared
   bucket without turning an unidentifiable caller into everyone's problem. */
const RATE_MAX_UNKNOWN = 60;

const DEFAULT_ALLOWED_HOSTS = ['insightis.ai', 'localhost', '127.0.0.1'];
const ALLOWED_HOST_PATTERNS = [/\.vercel\.app$/];

/* Two constants rather than one with the g flag: a global regex carries
   lastIndex between calls, which would make .test() alternate true/false on
   identical input. The g copy is for replace, the plain one for test. */
const CONTROL_CHARS_ALL = /[\u0000-\u001f\u007f]/g;
const CONTROL_CHARS = /[\u0000-\u001f\u007f]/;

const hits = new Map();

function rateLimited(key, max) {
  const now = Date.now();
  const window = (hits.get(key) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (!times.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(k);
    }
  }
  if (window.length >= max) {
    hits.set(key, window);
    return true;
  }
  window.push(now);
  hits.set(key, window);
  return false;
}

export function readEnv(key) {
  if (typeof process !== 'undefined' && process.env && process.env[key]) return process.env[key];
  if (typeof globalThis !== 'undefined' && globalThis[key]) return globalThis[key];
  return undefined;
}

/* Every proxy spells this differently; the specific ones before the generic
   x-forwarded-for, whose first hop is the client. */
function clientIp(headers) {
  const direct = headers.get('cf-connecting-ip')
    || headers.get('x-nf-client-connection-ip')
    || headers.get('x-real-ip')
    || headers.get('true-client-ip');
  if (direct) return direct.trim();
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return 'unknown';
}

/* Origin is sent on same-origin POSTs by every current browser; Referer backs it
   up. Neither proves anything — both are forgeable outside a browser — so this
   is a speed bump against drive-by scripts. The boundary is the secret URL. */
function originAllowed(headers) {
  const candidate = headers.get('origin') || headers.get('referer');
  if (!candidate) return false;
  let host;
  try {
    host = new URL(candidate).hostname.toLowerCase();
  } catch {
    return false;
  }
  const extra = (readEnv('ALLOWED_FORM_ORIGINS') || '')
    .split(',').map((h) => h.trim().toLowerCase()).filter(Boolean);
  const allowed = DEFAULT_ALLOWED_HOSTS.concat(extra);
  if (allowed.some((h) => host === h || host.endsWith('.' + h))) return true;
  return ALLOWED_HOST_PATTERNS.some((re) => re.test(host));
}

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  });
}

/* ── text helpers used by field validators ── */

/* Collapse whitespace runs to single spaces. For single-line fields, where a
   pasted newline should not become part of the value. */
export function oneLine(input) {
  return typeof input === 'string' ? input.replace(/\s+/g, ' ').trim() : '';
}

/* Preserve paragraph breaks, drop other control characters, and cap consecutive
   blank lines. For multi-line fields, where the shape of what someone typed is
   part of the message. */
export function multiLine(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.replace(CONTROL_CHARS_ALL, '').replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export const hasControlChars = (s) => CONTROL_CHARS.test(s);
export const hasAlnum = (s) => /[\p{L}\p{N}]/u.test(s);

/* Deliberately loose: the goal is catching a typo, not adjudicating RFC 5322. */
export const looksLikeEmail = (s) => /^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/.test(s);

/* ── the factory ──
 * config:
 *   envVar      string   name of the env var holding the Zoho .../records URL
 *   label       string   log prefix
 *   rateMax     number   submissions per IP per 10 minutes
 *   maxBody     number   request body ceiling in bytes
 *   build(data) -> { fields } | { error }
 *               maps the client payload to Zoho's field keys, or names the
 *               validation failure. Per-form because the rules genuinely differ:
 *               a connector name must not contain a URL, a bug report may.
 */
export function createFormHandler(config) {
  async function handleRequest(request) {
    if (request.method !== 'POST') return json(405, { ok: false, error: 'method' });

    const headers = request.headers;
    if (!originAllowed(headers)) return json(403, { ok: false, error: 'origin' });

    const endpoint = readEnv(config.envVar);
    if (!endpoint) {
      /* Loud in the logs, vague to the caller: a missing variable is ours to fix,
         and naming it would tell a prober what to look for. */
      console.error(`[${config.label}] ${config.envVar} is not set — refusing to submit`);
      return json(503, { ok: false, error: 'unavailable' });
    }

    let raw;
    try {
      raw = await request.text();
    } catch {
      return json(400, { ok: false, error: 'invalid' });
    }
    if (raw.length > config.maxBody) return json(413, { ok: false, error: 'length' });

    let data;
    try {
      data = JSON.parse(raw || '{}');
    } catch {
      return json(400, { ok: false, error: 'invalid' });
    }
    if (!data || typeof data !== 'object') return json(400, { ok: false, error: 'invalid' });

    /* Honeypot and fill-time both answer 200 rather than 400. A bot told it was
       caught adapts; one that thinks it succeeded moves on. Neither is
       forwarded. */
    if (data.hp) return json(200, { ok: true });
    const elapsed = Number(data.elapsedMs);
    if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) return json(200, { ok: true });

    const built = config.build(data);
    if (built.error) return json(400, { ok: false, error: built.error });

    const ip = clientIp(headers);
    if (ip === 'unknown') {
      console.warn(`[${config.label}] no client IP header — per-visitor rate limiting is degraded`);
    }
    const ceiling = ip === 'unknown' ? RATE_MAX_UNKNOWN : config.rateMax;
    if (rateLimited(`${config.label}:${ip}`, ceiling)) return json(429, { ok: false, error: 'rate' });

    let upstream;
    let body;
    try {
      upstream = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(built.fields),
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });
      body = await upstream.text();
    } catch (err) {
      /* Never log `endpoint` — logs get pasted into tickets and screenshots. */
      console.error(`[${config.label}] upstream request failed:`, err && err.name);
      return json(502, { ok: false, error: 'upstream' });
    }

    /* Zoho answers 200 with a thank-you payload and no status code in the body,
       so the markers are the only success signal available. A 200 carrying
       neither means something changed upstream, and we must not tell the visitor
       their message landed. A validation refusal comes back as {"errors":[...]}. */
    const accepted = upstream.ok
      && (body.includes('thankyou_page_URL') || body.includes('encoded_string'));

    if (!accepted) {
      console.error(
        `[${config.label}] unexpected upstream reply — status %s, errors %s`,
        upstream.status,
        body.includes('"errors"'),
      );
      return json(502, { ok: false, error: 'upstream' });
    }

    return json(200, { ok: true });
  }

  return { handleRequest, nodeHandler: nodeAdapter(handleRequest, config.maxBody) };
}

/* ── Node bridge ──
   For hosts that speak (req, res): Vercel's Node runtime today, a bare Node
   server or Express after the move, and the Vite dev middleware locally — so a
   local test exercises this exact code rather than a stand-in. */
export function nodeAdapter(handleRequest, maxBody) {
  return async function nodeHandler(req, res) {
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers || {})) {
      if (Array.isArray(value)) value.forEach((v) => headers.append(key, v));
      else if (value != null) headers.set(key, String(value));
    }

    /* Behind a platform proxy one of the forwarding headers is always set. Run
       directly — a bare Node server on our own box, the likely shape after the
       move — none are, and the rate limiter would have nothing to key on. The
       socket address is the real peer in exactly that case, and only then: with
       a proxy in front it is the proxy's address, so it must not win. */
    if (!headers.has('x-forwarded-for') && req.socket && req.socket.remoteAddress) {
      headers.set('x-forwarded-for', req.socket.remoteAddress);
    }

    let body;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      /* Some hosts (Vercel among them) parse the JSON body before we see it,
         which consumes the stream — take the parsed copy when it exists, read
         the stream when it does not. */
      if (req.body !== undefined && req.body !== null && req.body !== '') {
        body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      } else {
        try {
          body = await readBody(req, maxBody);
        } catch {
          res.statusCode = 413;
          res.setHeader('content-type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({ ok: false, error: 'length' }));
          return;
        }
      }
    }

    const request = new Request('https://local.invalid' + (req.url || '/'), {
      method: req.method,
      headers,
      body,
    });

    const response = await handleRequest(request);
    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));
    res.end(await response.text());
  };
}

function readBody(req, maxBody) {
  return new Promise((resolve, reject) => {
    let data = '';
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > maxBody) {
        reject(new Error('body too large'));
        req.destroy();
        return;
      }
      data += chunk;
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}
