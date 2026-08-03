/* server/serve.js — clean URLs, redirects, headers and traversal refusal for the container.
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
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = 'http://localhost:8090';
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');

let pass = 0; let fail = 0;
const fails = [];
function check(ok, label, detail) {
  if (ok) { pass++; } else { fail++; fails.push(`${label}${detail ? '  -> ' + detail : ''}`); }
}

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e.endsWith('.html')) out.push(p);
  }
  return out;
}

const htmlFiles = walk(DIST);
console.log(`\n── cleanUrls: every prerendered page reachable without .html (${htmlFiles.length} files) ──`);
for (const f of htmlFiles) {
  const rel = '/' + relative(DIST, f).split(sep).join('/');
  // The URL a link on the site would use: drop .html, and drop a trailing /index.
  let clean = rel.replace(/\.html$/, '');
  if (clean.endsWith('/index')) clean = clean.slice(0, -'/index'.length) || '/';
  const r = await fetch(BASE + clean, { redirect: 'manual' });
  check(r.status === 200, `GET ${clean}`, `status ${r.status}`);
}
console.log(`   ${pass} of ${htmlFiles.length} pages served at their clean URL`);

console.log('\n── the 18 redirects from vercel.json ──');
const cfg = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'));
let rOk = 0;
for (const rule of cfg.redirects) {
  const r = await fetch(BASE + rule.source, { redirect: 'manual' });
  const loc = r.headers.get('location');
  const good = r.status === 301 && loc === rule.destination;
  check(good, `redirect ${rule.source}`, `status ${r.status} location ${loc}`);
  if (good) rOk++;
  // The decoded form a browser may send instead of the %20 form.
  const dec = decodeURIComponent(rule.source);
  if (dec !== rule.source) {
    const r2 = await fetch(BASE + encodeURI(dec), { redirect: 'manual' });
    check(r2.status === 301, `redirect (decoded) ${dec}`, `status ${r2.status}`);
  }
}
console.log(`   ${rOk} of ${cfg.redirects.length} redirects return 301 to the right target`);

console.log('\n── the destination of every redirect actually exists ──');
for (const rule of cfg.redirects) {
  const r = await fetch(BASE + rule.destination, { redirect: 'manual' });
  check(r.status === 200, `destination ${rule.destination}`, `status ${r.status}`);
}

console.log('\n── API routes ──');
{
  const g = await fetch(BASE + '/api/contact-sales');
  check(g.status === 405, 'GET /api/contact-sales is 405', `status ${g.status}`);

  const noOrigin = await fetch(BASE + '/api/contact-sales', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'A B', company: 'C D', email: 'a@b.co', teamSize: '1-10', elapsedMs: 9000 }),
  });
  check(noOrigin.status === 403, 'POST without Origin is 403', `status ${noOrigin.status}`);

  for (const [route, body] of [
    ['/api/request-connector', { name: 'a', elapsedMs: 9000 }],
    ['/api/contact-support', { category: 'nope', subject: 'a', elapsedMs: 9000 }],
    ['/api/contact-sales', { name: 'a', company: 'b', email: 'bad', teamSize: 'x', elapsedMs: 9000 }],
  ]) {
    const r = await fetch(BASE + route, {
      method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'http://localhost:8090' },
      body: JSON.stringify(body),
    });
    // 400 proves the module is mounted and the env var is present; nothing is sent upstream.
    check(r.status === 400, `POST ${route} reaches the handler`, `status ${r.status}`);
    check(r.headers.get('cache-control') === 'no-store', `${route} is no-store`, r.headers.get('cache-control'));
  }
}

console.log('\n── path traversal is refused ──');
for (const evil of [
  '/../vercel.json', '/../../package.json', '/..%2f..%2fpackage.json',
  '/assets/../../vercel.json', '/%2e%2e/%2e%2e/package.json',
]) {
  const r = await fetch(BASE + evil, { redirect: 'manual' });
  check(r.status === 404 || r.status === 400 || r.status === 301 || r.status === 308,
    `traversal ${evil} not served`, `status ${r.status}`);
  if (r.status === 200) {
    const t = await r.text();
    check(!t.includes('"buildCommand"') && !t.includes('"devDependencies"'), `traversal ${evil} leaked a file`);
  }
}

console.log('\n── headers and 404 ──');
{
  const html = await fetch(BASE + '/resources/connectors');
  check((html.headers.get('cache-control') || '').includes('must-revalidate'),
    'html is revalidated, not cached forever', html.headers.get('cache-control'));
  check((html.headers.get('x-robots-tag') || '').includes('noindex'),
    'NOINDEX=1 sets x-robots-tag', html.headers.get('x-robots-tag'));
  check((html.headers.get('content-type') || '').includes('text/html'),
    'html content-type', html.headers.get('content-type'));

  const assetName = readdirSync(join(DIST, 'assets')).find((f) => f.endsWith('.js'));
  const asset = await fetch(`${BASE}/assets/${assetName}`);
  check((asset.headers.get('cache-control') || '').includes('immutable'),
    'hashed assets are immutable', asset.headers.get('cache-control'));
  check((asset.headers.get('content-type') || '').includes('javascript'),
    'js content-type', asset.headers.get('content-type'));

  const missing = await fetch(BASE + '/no/such/page');
  check(missing.status === 404, 'unknown path is 404', `status ${missing.status}`);

  const slash = await fetch(BASE + '/resources/connectors/', { redirect: 'manual' });
  check(slash.status === 308, 'trailing slash normalises', `status ${slash.status}`);

  const pub = await fetch(BASE + '/cookie-notice.js');
  check(pub.status === 200, 'public/ assets are served', `status ${pub.status}`);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fails.length) { console.log('\nFAILURES:'); fails.slice(0, 25).forEach((f) => console.log('  ' + f)); }
process.exit(fail === 0 ? 0 : 1);
