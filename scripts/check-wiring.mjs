/* Registration parity gate — the check that was missing twice.
 *
 * /api/waitlist shipped registered in vite.config.js but not in server/serve.js,
 * so it 404'd in the container while working locally. Then the endpoint read
 * ZOHO_WAITLIST_FORM_URL, which docker-compose.yml did not pass, so it 503'd in
 * production. Both times the unit tests passed and the build was clean, because
 * nothing anywhere compared one file's list against another's.
 *
 * This does. It is deliberately its own script rather than part of the test suite:
 * it needs no build, no server and no fixtures, so the Dockerfile can run it
 * before anything expensive and fail the image instead of the site.
 *
 *   node scripts/check-wiring.mjs
 *
 * Exits 1 on any hole. Add a route or a variable and this tells you which of the
 * five places you forgot.
 */
import { readFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = async (f) => readFile(join(ROOT, f), 'utf8').catch(() => '');

const [vite, serve, compose, envExample] = await Promise.all([
  read('vite.config.js'),
  read('server/serve.js'),
  read('docker-compose.yml'),
  read('.env.example'),
]);

const apiDir = (await readdir(join(ROOT, 'api')).catch(() => []))
  .filter((f) => f.endsWith('.js'))
  .map((f) => '/api/' + f.replace(/\.js$/, ''));

/* Client-side callers: any string literal starting /api/ anywhere in src/. */
async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
    const full = join(dir, e.name);
    if (e.isDirectory()) await walk(full, out);
    else if (/\.(jsx?|mjs)$/.test(e.name)) out.push(full);
  }
  return out;
}
const clientFiles = await walk(join(ROOT, 'src'));
const clientRoutes = new Set();
for (const f of clientFiles) {
  const s = await readFile(f, 'utf8');
  for (const m of s.matchAll(/['"`](\/api\/[\w-]+)['"`]/g)) clientRoutes.add(m[1]);
}

const routeKeys = (src) => new Set([...src.matchAll(/['"](\/api\/[\w-]+)['"]\s*:/g)].map((m) => m[1]));
const inVite = routeKeys(vite);
const inServe = routeKeys(serve);

const routes = [...new Set([...inVite, ...inServe, ...apiDir, ...clientRoutes])].sort();

const problems = [];

console.log('\nAPI routes — each must be registered in four places');
console.log('  route                       vite  serve  api/  client');
for (const r of routes) {
  const row = {
    vite: inVite.has(r),
    serve: inServe.has(r),
    api: apiDir.includes(r),
    client: clientRoutes.has(r),
  };
  const mark = (b) => (b ? ' yes ' : ' NO  ');
  const ok = row.vite && row.serve && row.api && row.client;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${r.padEnd(24)}${mark(row.vite)}${mark(row.serve)}${mark(row.api)}${mark(row.client)}`);
  if (!ok) {
    const missing = Object.entries(row).filter(([, v]) => !v).map(([k]) => k);
    problems.push(`${r} is missing from: ${missing.join(', ')}`);
  }
}

/* Env vars the server actually reads, minus the ones the platform provides. */
const PLATFORM = new Set(['NODE_ENV', 'PORT', 'SITE_ROOT', 'CI']);
const serverFiles = (await readdir(join(ROOT, 'server')).catch(() => [])).filter((f) => f.endsWith('.js'));
const readVars = new Set();
for (const f of serverFiles) {
  const s = await read(`server/${f}`);
  for (const m of s.matchAll(/process\.env\.([A-Z0-9_]+)/g)) if (!PLATFORM.has(m[1])) readVars.add(m[1]);
}

console.log('\nEnvironment — each variable the server reads must reach the container');
console.log('  variable                   compose  .env.example');
for (const v of [...readVars].sort()) {
  const inCompose = compose.includes(v);
  const documented = envExample.includes(v);
  const mark = (b) => (b ? ' yes   ' : ' NO    ');
  console.log(`  ${inCompose ? 'ok  ' : 'FAIL'} ${v.padEnd(24)}${mark(inCompose)}${mark(documented)}`);
  /* Missing from compose is an outage: the endpoint answers 503 while every
     other form works. Missing from .env.example only costs the next person time,
     so it is a warning, not a failure. */
  if (!inCompose) problems.push(`${v} is read by server/ but not passed in docker-compose.yml — that form will 503`);
  else if (!documented) console.log(`        note: ${v} is undocumented in .env.example`);
}

if (problems.length) {
  console.error('\nWIRING CHECK FAILED');
  for (const p of problems) console.error(`  - ${p}`);
  console.error('');
  process.exit(1);
}
console.log('\nwiring check passed\n');
