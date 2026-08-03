/* server/request-connector.js — the connector-request endpoint.
 *
 * Recovered into the repo on 2026-08-03. These ran green during development and
 * then lived in a scratch directory, which meant the whole suite was one cleanup
 * away from never running again. Paths now resolve from import.meta.url so they
 * work from any checkout; nothing else about them changed.
 *
 * The upstream Zoho call is mocked in every case. That is not only for speed —
 * all four form endpoints accept POST {} with a 200, so a test that reached the
 * real form would silently add rows to a live sheet.
 */
import { pathToFileURL, fileURLToPath } from 'node:url';

const REPO = fileURLToPath(new URL('../', import.meta.url));
const CORE = REPO + 'server/request-connector.js';
const { handleRequest } = await import(pathToFileURL(CORE).href);

process.env.ZOHO_CONNECTOR_FORM_URL = 'https://upstream.invalid/records';

const ZOHO_OK = JSON.stringify({
  open_thankyou_page_URL_in: 1,
  encoded_string: 'x',
  thankyou_page_URL: 'https://forms.zohopublic.eu/.../thankyou/formperma/SECRET',
  redirect_type: 1,
});

let lastUpstream = null;
let upstreamReply = () => new Response(ZOHO_OK, { status: 200 });
globalThis.fetch = async (url, init) => {
  lastUpstream = { url, body: init && init.body };
  return upstreamReply();
};

const GOOD_ORIGIN = { origin: 'https://insightis.ai', 'content-type': 'application/json' };

/* Each request gets its own client IP unless a test pins one. Without this every
   case shares the 'unknown' bucket and the rate limiter fails the whole suite —
   which is what caught the shared-bucket problem in the first place. */
let ipCounter = 0;
function post(body, headers = GOOD_ORIGIN) {
  const h = { ...headers };
  if (!h['x-forwarded-for']) h['x-forwarded-for'] = `198.51.100.${(ipCounter++ % 250) + 1}`;
  return handleRequest(new Request('https://insightis.ai/api/request-connector', {
    method: 'POST', headers: h, body: typeof body === 'string' ? body : JSON.stringify(body),
  }));
}

const human = (extra = {}) => ({ name: 'Pipedrive', elapsedMs: 5000, ...extra });

let pass = 0; let fail = 0;
async function check(label, run) {
  try {
    const ok = await run();
    if (ok === true) { pass++; console.log('  PASS  ' + label); }
    else { fail++; console.log('  FAIL  ' + label + '  -> ' + ok); }
  } catch (err) {
    fail++; console.log('  FAIL  ' + label + '  -> threw ' + err.message);
  }
}

console.log('\n── happy path ──');
await check('valid submission returns 200 {ok:true}', async () => {
  const r = await post(human());
  const b = await r.json();
  return (r.status === 200 && b.ok === true) || `status ${r.status} body ${JSON.stringify(b)}`;
});
await check('upstream receives {"SingleLine":"..."}', () =>
  lastUpstream.body === '{"SingleLine":"Pipedrive"}' || `sent ${lastUpstream.body}`);
await check('whitespace is collapsed before sending', async () => {
  await post(human({ name: '  Google   Ads  ' }));
  return lastUpstream.body === '{"SingleLine":"Google Ads"}' || `sent ${lastUpstream.body}`;
});
await check('reply never leaks the Zoho thank-you URL', async () => {
  const text = await (await post(human())).text();
  return (!text.includes('formperma') && !text.includes('thankyou') && !text.includes('zohopublic'))
    || `leaked: ${text}`;
});
await check('sets cache-control: no-store', async () => {
  const r = await post(human());
  return r.headers.get('cache-control') === 'no-store' || r.headers.get('cache-control');
});

console.log('\n── validation ──');
const badNames = {
  'too short': 'A',
  'too long': 'x'.repeat(81),
  'contains a URL': 'Buy cheap http://spam.example',
  'contains www.': 'see www.spam.example now',
  'contains an email': 'mail me at bob@spam.example',
  'contains markup': '<a href=#>x</a>',
  'template injection': 'Zoho {{7*7}}',
  'digits/letters absent': '---  ---',
};
for (const [label, name] of Object.entries(badNames)) {
  await check(`rejects ${label}`, async () => {
    const r = await post(human({ name }));
    return r.status === 400 || `status ${r.status}`;
  });
}
await check('accepts a legitimate hyphenated name', async () => {
  const r = await post(human({ name: 'X-Ray Analytics - v2' }));
  return r.status === 200 || `status ${r.status}`;
});
await check('accepts a non-Latin name', async () => {
  const r = await post(human({ name: '\u4f01\u4e1a\u5fae\u4fe1' }));
  return r.status === 200 || `status ${r.status}`;
});
await check('rejects a non-string name', async () => {
  const r = await post(human({ name: { toString: () => 'x' } }));
  return r.status === 400 || `status ${r.status}`;
});
await check('rejects malformed JSON', async () => {
  const r = await post('{not json');
  return r.status === 400 || `status ${r.status}`;
});
await check('rejects an oversized body', async () => {
  const r = await post(human({ name: 'ok', pad: 'y'.repeat(3000) }));
  return r.status === 413 || `status ${r.status}`;
});

console.log('\n── bot controls ──');
await check('honeypot submission is silently accepted, not forwarded', async () => {
  lastUpstream = null;
  const r = await post(human({ hp: 'http://spam.example' }));
  const b = await r.json();
  return (r.status === 200 && b.ok === true && lastUpstream === null)
    || `status ${r.status} forwarded ${JSON.stringify(lastUpstream)}`;
});
await check('instant submit is silently accepted, not forwarded', async () => {
  lastUpstream = null;
  const r = await post(human({ elapsedMs: 40 }));
  return (r.status === 200 && lastUpstream === null) || `forwarded ${JSON.stringify(lastUpstream)}`;
});
await check('missing timing field is not forwarded', async () => {
  lastUpstream = null;
  const r = await post({ name: 'Pipedrive' });
  return (r.status === 200 && lastUpstream === null) || `forwarded ${JSON.stringify(lastUpstream)}`;
});

console.log('\n── origin ──');
await check('rejects a foreign origin', async () => {
  const r = await post(human(), { origin: 'https://evil.example', 'content-type': 'application/json' });
  return r.status === 403 || `status ${r.status}`;
});
await check('rejects a missing origin and referer', async () => {
  const r = await post(human(), { 'content-type': 'application/json' });
  return r.status === 403 || `status ${r.status}`;
});
await check('accepts a subdomain of insightis.ai', async () => {
  const r = await post(human(), { origin: 'https://staging.insightis.ai', 'content-type': 'application/json' });
  return r.status === 200 || `status ${r.status}`;
});
await check('accepts a vercel.app preview', async () => {
  const r = await post(human(), { origin: 'https://insightis-landing.vercel.app', 'content-type': 'application/json' });
  return r.status === 200 || `status ${r.status}`;
});
await check('accepts a host added via ALLOWED_FORM_ORIGINS', async () => {
  process.env.ALLOWED_FORM_ORIGINS = 'insightis.devart.com';
  const r = await post(human(), { origin: 'https://insightis.devart.com', 'content-type': 'application/json' });
  delete process.env.ALLOWED_FORM_ORIGINS;
  return r.status === 200 || `status ${r.status}`;
});
await check('falls back to referer when origin is absent', async () => {
  const r = await post(human(), { referer: 'https://insightis.ai/resources/connectors', 'content-type': 'application/json' });
  return r.status === 200 || `status ${r.status}`;
});

console.log('\n── method, config, upstream failure ──');
await check('rejects GET', async () => {
  const r = await handleRequest(new Request('https://insightis.ai/api/request-connector', {
    method: 'GET', headers: { origin: 'https://insightis.ai' },
  }));
  return r.status === 405 || `status ${r.status}`;
});
await check('503 when the env var is unset, without naming it', async () => {
  const saved = process.env.ZOHO_CONNECTOR_FORM_URL;
  delete process.env.ZOHO_CONNECTOR_FORM_URL;
  const r = await post(human());
  const text = await r.text();
  process.env.ZOHO_CONNECTOR_FORM_URL = saved;
  return (r.status === 503 && !text.includes('ZOHO')) || `status ${r.status} body ${text}`;
});
await check('502 when upstream returns 200 without the markers', async () => {
  upstreamReply = () => new Response('{"unexpected":true}', { status: 200 });
  const r = await post(human());
  upstreamReply = () => new Response(ZOHO_OK, { status: 200 });
  return r.status === 502 || `status ${r.status}`;
});
await check('502 when upstream errors', async () => {
  upstreamReply = () => { throw new Error('boom'); };
  const r = await post(human());
  upstreamReply = () => new Response(ZOHO_OK, { status: 200 });
  return r.status === 502 || `status ${r.status}`;
});

console.log('\n── rate limit ──');
await check('6th request from one IP is 429, a different IP is not', async () => {
  const ipHeaders = (ip) => ({ ...GOOD_ORIGIN, 'x-forwarded-for': ip });
  const codes = [];
  for (let i = 0; i < 6; i++) {
    const r = await post(human({ name: `Tool ${i}` }), ipHeaders('203.0.113.9'));
    codes.push(r.status);
  }
  const other = await post(human(), ipHeaders('203.0.113.10'));
  return (codes.slice(0, 5).every((c) => c === 200) && codes[5] === 429 && other.status === 200)
    || `codes ${codes} other ${other.status}`;
});

console.log('\n── node bridge (self-hosted shape: no proxy headers) ──');
const { nodeHandler } = await import(pathToFileURL(CORE).href);
const { Readable } = await import('node:stream');

function nodeCall(payload, remoteAddress) {
  const req = Readable.from([JSON.stringify(payload)]);
  req.method = 'POST';
  req.url = '/api/request-connector';
  req.headers = { origin: 'https://insightis.ai', 'content-type': 'application/json' };
  req.socket = { remoteAddress };
  const res = {
    statusCode: 0, headers: {}, body: '',
    setHeader(k, v) { this.headers[k.toLowerCase()] = v; },
    end(b) { this.body = b || ''; },
  };
  return nodeHandler(req, res).then(() => res);
}

await check('(req,res) bridge streams the body and returns 200', async () => {
  const res = await nodeCall(human(), '192.0.2.77');
  return (res.statusCode === 200 && JSON.parse(res.body).ok === true)
    || `status ${res.statusCode} body ${res.body}`;
});
await check('bridge sets the JSON content type', async () => {
  const res = await nodeCall(human(), '192.0.2.78');
  return (res.headers['content-type'] || '').includes('application/json')
    || JSON.stringify(res.headers);
});
await check('socket address keys the rate limiter when no proxy header exists', async () => {
  const codes = [];
  for (let i = 0; i < 6; i++) {
    const res = await nodeCall(human({ name: `Tool ${i}` }), '192.0.2.99');
    codes.push(res.statusCode);
  }
  const other = await nodeCall(human(), '192.0.2.100');
  return (codes.slice(0, 5).every((c) => c === 200) && codes[5] === 429 && other.statusCode === 200)
    || `codes ${codes} other ${other.statusCode}`;
});
await check('bridge rejects an oversized streamed body with 413', async () => {
  const res = await nodeCall(human({ name: 'ok', pad: 'y'.repeat(4000) }), '192.0.2.101');
  return res.statusCode === 413 || `status ${res.statusCode}`;
});

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail === 0 ? 0 : 1);
