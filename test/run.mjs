/* `npm test` — runs every suite in test/ and returns a single verdict.
 *
 * Three kinds of suite, and the runner's whole job is knowing what each needs:
 *
 *   unit         the four form endpoints, exercised against the real handler with
 *                the Zoho call mocked. No build, no server, no network.
 *   build        the waitlist suite also reads dist/auth/sign-in.html, because
 *                part of what it asserts is that the shipped page has one email
 *                field and no password field — the Safe Browsing constraint that
 *                is easy to undo by accident.
 *   server       serve.test.mjs drives a real server. The runner starts
 *                server/serve.js on 8090 against dist/, waits for it, and stops
 *                it afterwards.
 *
 * Suites that need something absent are SKIPPED loudly, never silently passed.
 * A green run that quietly tested three of five suites is worse than a red one.
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..');
const PORT = 8090;

const SUITES = [
  { file: 'request-connector.test.mjs', needs: [] },
  { file: 'contact-support.test.mjs', needs: [] },
  { file: 'contact-sales.test.mjs', needs: [] },
  { file: 'waitlist.test.mjs', needs: ['dist'] },
  { file: 'serve.test.mjs', needs: ['dist', 'server'] },
];

/* Values are irrelevant — the suites assert 400s and 403s that never reach
   upstream — but they must be SET, because an unset variable makes the endpoint
   answer 503 and the test would be measuring the wrong failure. */
const FAKE_ENV = {
  ZOHO_CONNECTOR_FORM_URL: 'https://upstream.invalid/records',
  ZOHO_SUPPORT_FORM_URL: 'https://upstream.invalid/records',
  ZOHO_SALES_FORM_URL: 'https://upstream.invalid/records',
  ZOHO_WAITLIST_FORM_URL: 'https://upstream.invalid/records',
  ALLOWED_FORM_ORIGINS: `http://localhost:${PORT}`,
};

const run = (file) => new Promise((resolve) => {
  const child = spawn(process.execPath, [join(HERE, file)], {
    cwd: REPO,
    env: { ...process.env, ...FAKE_ENV },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let out = '';
  child.stdout.on('data', (d) => { out += d; });
  child.stderr.on('data', (d) => { out += d; });
  child.on('close', (code) => resolve({ code, out }));
});

async function startServer() {
  const child = spawn(process.execPath, [join(REPO, 'server', 'serve.js')], {
    cwd: REPO,
    env: {
      ...process.env,
      ...FAKE_ENV,
      PORT: String(PORT),
      SITE_ROOT: join(REPO, 'dist'),
      /* Staging configuration on purpose: the suite asserts that NOINDEX=1
         produces X-Robots-Tag, which is the switch that keeps
         insightis.devart.info out of the index. Run the server by hand without
         it to check the other direction — production must NOT send the header,
         and a stray noindex there is the more expensive mistake of the two. */
      NOINDEX: '1',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  /* Poll rather than sleep: a fixed wait is either too short on a cold start or
     wasted time on a warm one. */
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://localhost:${PORT}/`);
      if (r.ok) return child;
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  child.kill();
  throw new Error(`server did not come up on ${PORT} within 15s`);
}

const haveDist = existsSync(join(REPO, 'dist', 'index.html'));

let passed = 0;
let failed = 0;
const skipped = [];
const results = [];
let server = null;

for (const s of SUITES) {
  const missing = s.needs.filter((n) => (n === 'dist' ? !haveDist : false));
  if (missing.length) {
    skipped.push(`${s.file} — needs dist/ (run \`npm run build\` first)`);
    continue;
  }

  if (s.needs.includes('server') && !server) {
    try {
      server = await startServer();
    } catch (err) {
      skipped.push(`${s.file} — ${err.message}`);
      continue;
    }
  }

  process.stdout.write(`\n══ ${s.file} ${'═'.repeat(Math.max(0, 58 - s.file.length))}\n`);
  const { code, out } = await run(s.file);
  process.stdout.write(out.split('\n').filter((l) => !/^\s*PASS/.test(l)).join('\n'));

  const tally = [...out.matchAll(/(\d+) passed, (\d+) failed/g)].pop();
  if (tally) { passed += Number(tally[1]); failed += Number(tally[2]); }
  else if (code !== 0) failed += 1;
  results.push({ file: s.file, code, tally: tally ? `${tally[1]}/${Number(tally[1]) + Number(tally[2])}` : code === 0 ? 'ok' : 'error' });
}

if (server) server.kill();

console.log(`\n${'─'.repeat(62)}`);
for (const r of results) console.log(`  ${r.code === 0 ? 'PASS' : 'FAIL'}  ${r.file.padEnd(34)} ${r.tally}`);
for (const s of skipped) console.log(`  SKIP  ${s}`);
console.log(`${'─'.repeat(62)}`);
console.log(`  ${passed} assertions passed, ${failed} failed, ${skipped.length} suite(s) skipped\n`);

/* A skipped suite fails the run in CI. Locally it is a nudge to build first;
   in CI it means coverage silently vanished, which is the thing to catch. */
const strict = process.env.CI === 'true' || process.argv.includes('--strict');
process.exit(failed > 0 || (strict && skipped.length) ? 1 : 0);
