/* ═══════════════════════════════════════════════════════════════════════════
   Production server for the container image.

   One Node process serves the prerendered site AND the three form endpoints.
   That is deliberate: the alternative — nginx for static plus a second service
   for /api — means a second image, a second registry tag, an nginx.conf and a
   change to the CI DevOps just wrote. This needs none of those, and insightis.ai
   sits behind Cloudflare, which caches static assets at the edge, so nginx's
   advantage at the origin barely applies.

   WHAT THIS HAS TO REPRODUCE
   Vercel was doing more than serving files, and all of it is load-bearing:

     cleanUrls   every one of the 44 pages is linked without .html. Serve the
                 directory naively and all 44 return 404.
     redirects   18 permanent redirects from the old capitalised, space-encoded
                 URLs. Drop them and every existing inbound link breaks.
     headers     X-Robots-Tag: noindex, scoped to preview hosts only.

   Rather than transcribe those rules and let the two copies drift, this reads
   vercel.json at startup. It stays the single source of truth whether the site
   is served by Vercel or by this container.
   ═══════════════════════════════════════════════════════════════════════════ */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { join, extname, normalize, resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

import { nodeHandler as requestConnector } from './request-connector.js';
import { nodeHandler as contactSupport } from './contact-support.js';
import { nodeHandler as contactSales } from './contact-sales.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolvePath(process.env.SITE_ROOT || join(__dirname, '..', 'dist'));
const PORT = Number(process.env.PORT || 8080);
/* Set on staging so a preview host cannot be indexed. Mirrors the vercel.json
   rule that applied noindex to *.vercel.app. */
const NOINDEX = process.env.NOINDEX === '1';

const API_ROUTES = {
  '/api/request-connector': requestConnector,
  '/api/contact-support': contactSupport,
  '/api/contact-sales': contactSales,
};

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.pdf': 'application/pdf',
  '.zip': 'application/zip',
};

/* ── redirects, read from vercel.json ── */
let REDIRECTS = [];
try {
  const cfg = JSON.parse(await readFile(join(__dirname, '..', 'vercel.json'), 'utf8'));
  REDIRECTS = (cfg.redirects || []).map((r) => ({
    /* Vercel matches the decoded path, and the sources here contain %20. Both
       forms are compared so a browser sending either one is redirected. */
    source: r.source,
    decoded: safeDecode(r.source),
    destination: r.destination,
    status: r.permanent === false ? 302 : 301,
  }));
  console.log(`[serve] ${REDIRECTS.length} redirects loaded from vercel.json`);
} catch (err) {
  /* Louder than a warning: losing the redirect table silently would 404 every
     old inbound link, and nothing else in the system would notice. */
  console.error('[serve] FAILED to read vercel.json — redirects are NOT active:', err.message);
}

function safeDecode(s) {
  try { return decodeURIComponent(s); } catch { return s; }
}

function findRedirect(pathname) {
  const decoded = safeDecode(pathname);
  for (const r of REDIRECTS) {
    if (pathname === r.source || decoded === r.decoded || pathname === r.decoded) return r;
  }
  return null;
}

/* ── static resolution ──
   Mirrors Vercel's cleanUrls: /resources/connectors serves
   dist/resources/connectors.html. Tried in the order a visitor's URL is most
   likely to mean. */
async function resolveFile(pathname) {
  /* Reject traversal before touching the filesystem. normalize collapses ../
     and the prefix check catches anything that still escapes ROOT. */
  const unsafe = join(ROOT, normalize(decodeURIComponent(pathname)));
  const candidate = resolvePath(unsafe);
  if (candidate !== ROOT && !candidate.startsWith(ROOT + (process.platform === 'win32' ? '\\' : '/'))) {
    return null;
  }

  const tries = [];
  if (pathname.endsWith('/')) {
    tries.push(join(candidate, 'index.html'));
  } else {
    tries.push(candidate);
    tries.push(candidate + '.html');
    tries.push(join(candidate, 'index.html'));
  }

  for (const file of tries) {
    try {
      const s = await stat(file);
      if (s.isFile()) return { file, size: s.size, mtime: s.mtime };
    } catch { /* next candidate */ }
  }
  return null;
}

function cacheControlFor(file) {
  /* Hashed asset names change whenever their content does, so they can be held
     for a year. HTML must not be: prerendered pages are rewritten on every
     deploy under the same URL. This is also what fixed the stale-preview problem
     we kept hitting locally, where only an ETag was sent. */
  if (file.includes('/assets/') || file.includes('\\assets\\')) {
    return 'public, max-age=31536000, immutable';
  }
  if (file.endsWith('.html')) return 'public, max-age=0, must-revalidate';
  return 'public, max-age=3600';
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://localhost');
  const pathname = url.pathname;

  try {
    /* 1. API first — before any static resolution, so no file can shadow it. */
    const api = API_ROUTES[pathname.replace(/\/$/, '')];
    if (api) {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.setHeader('content-type', 'application/json; charset=utf-8');
        res.setHeader('cache-control', 'no-store');
        res.end(JSON.stringify({ ok: false, error: 'method' }));
        return;
      }
      await api(req, res);
      return;
    }

    /* 2. Redirects, before serving files: an old URL must not be answered with
          content, or search engines never learn the new address. */
    const hit = findRedirect(pathname);
    if (hit) {
      res.statusCode = hit.status;
      res.setHeader('location', hit.destination + (url.search || ''));
      res.setHeader('cache-control', 'no-store');
      res.end();
      return;
    }

    /* 3. Trailing-slash normalisation, so /resources/connectors/ and
          /resources/connectors are not two indexable URLs for one page. */
    if (pathname.length > 1 && pathname.endsWith('/')) {
      const trimmed = pathname.slice(0, -1);
      if (await resolveFile(trimmed)) {
        res.statusCode = 308;
        res.setHeader('location', trimmed + (url.search || ''));
        res.end();
        return;
      }
    }

    /* 4. Static, with cleanUrls. */
    const found = await resolveFile(pathname);
    if (found) {
      const type = MIME[extname(found.file).toLowerCase()] || 'application/octet-stream';
      res.setHeader('content-type', type);
      res.setHeader('content-length', found.size);
      res.setHeader('cache-control', cacheControlFor(found.file.replace(/\\/g, '/')));
      res.setHeader('x-content-type-options', 'nosniff');
      if (NOINDEX) res.setHeader('x-robots-tag', 'noindex, nofollow');
      if (req.method === 'HEAD') { res.end(); return; }
      createReadStream(found.file).pipe(res);
      return;
    }

    /* 5. 404 — the built 404 page if the site ships one, plain text otherwise.
          Never the SPA shell: this is a prerendered multi-page site, and
          answering 200 with the wrong page would let search engines index
          soft-404s. */
    const notFound = await resolveFile('/404');
    res.statusCode = 404;
    if (NOINDEX) res.setHeader('x-robots-tag', 'noindex, nofollow');
    if (notFound) {
      res.setHeader('content-type', 'text/html; charset=utf-8');
      res.setHeader('cache-control', 'no-store');
      createReadStream(notFound.file).pipe(res);
    } else {
      res.setHeader('content-type', 'text/plain; charset=utf-8');
      res.end('404 Not Found');
    }
  } catch (err) {
    console.error('[serve] unhandled error for', pathname, err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader('content-type', 'text/plain; charset=utf-8');
    }
    res.end('500 Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`[serve] root ${ROOT}`);
  console.log(`[serve] listening on ${PORT}${NOINDEX ? ' (noindex)' : ''}`);
  for (const key of ['ZOHO_CONNECTOR_FORM_URL', 'ZOHO_SUPPORT_FORM_URL', 'ZOHO_SALES_FORM_URL']) {
    /* Say so at boot rather than letting the first visitor discover it: an unset
       variable means that form answers 503 for as long as nobody notices. */
    console.log(`[serve] ${key}: ${process.env[key] ? 'set' : 'NOT SET — that form will return 503'}`);
  }
});

/* The container gets SIGTERM on redeploy; finish in-flight requests rather than
   dropping a visitor's submission mid-POST. */
for (const sig of ['SIGTERM', 'SIGINT']) {
  process.on(sig, () => {
    console.log(`[serve] ${sig} — closing`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 10000).unref();
  });
}
