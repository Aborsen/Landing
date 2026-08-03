/* server/waitlist.js — the waitlist email capture.
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
const ROOT = REPO + 'server/';
const { handleRequest } = await import(pathToFileURL(ROOT + 'waitlist.js').href);

process.env.ZOHO_WAITLIST_FORM_URL = 'https://upstream.invalid/records';
const ZOHO_OK = JSON.stringify({ encoded_string: 'x', thankyou_page_URL: 'https://forms.zohopublic.eu/SECRET' });
let sent = null;
let reply = () => new Response(ZOHO_OK, { status: 200 });
globalThis.fetch = async (_u, init) => { sent = init && init.body; return reply(); };

let ip = 0;
function post(body, headers) {
  const h = { origin: 'https://insightis.ai', 'content-type': 'application/json', ...(headers || {}) };
  if (!h['x-forwarded-for']) h['x-forwarded-for'] = `198.18.0.${(ip++ % 250) + 1}`;
  return handleRequest(new Request('https://insightis.ai/api/waitlist', {
    method: 'POST', headers: h, body: typeof body === 'string' ? body : JSON.stringify(body),
  }));
}
const join = (extra = {}) => ({ email: 'alex@northwind.com', elapsedMs: 5000, ...extra });

let pass = 0; let fail = 0;
async function check(label, run) {
  try { const r = await run(); if (r === true) { pass++; console.log('  PASS  ' + label); } else { fail++; console.log('  FAIL  ' + label + '  -> ' + r); } }
  catch (e) { fail++; console.log('  FAIL  ' + label + '  -> threw ' + e.message); }
}

console.log('\n── mapping ──');
await check('email maps to SingleLine, alone', async () => {
  await post(join());
  return sent === '{"SingleLine":"alex@northwind.com"}' || sent;
});
await check('surrounding whitespace trimmed', async () => {
  await post(join({ email: '  alex@northwind.com  ' }));
  return sent === '{"SingleLine":"alex@northwind.com"}' || sent;
});

console.log('\n── validation (Zoho accepts blanks, so this is the only gate) ──');
for (const [label, email] of Object.entries({
  'empty': '', 'missing @': 'alexnorthwind.com', 'no TLD': 'alex@northwind',
  'spaces inside': 'alex smith@northwind.com', 'just a name': 'Alex',
  'over 254 chars': 'a'.repeat(250) + '@b.co',
})) {
  await check(`rejects ${label}`, async () => {
    const r = await post(join({ email }));
    const b = await r.json();
    return (r.status === 400 && b.error === 'email') || `${r.status} ${JSON.stringify(b)}`;
  });
}
await check('missing email key entirely rejected', async () => {
  const r = await post({ elapsedMs: 5000 });
  return r.status === 400 || `status ${r.status}`;
});
await check('a plus-addressed email is accepted', async () => {
  const r = await post(join({ email: 'alex+insightis@northwind.co.uk' }));
  return r.status === 200 || `status ${r.status}`;
});

console.log('\n── shared controls ──');
await check('foreign origin rejected', async () => {
  const r = await post(join(), { origin: 'https://evil.example' });
  return r.status === 403 || `status ${r.status}`;
});
await check('honeypot accepted but not forwarded', async () => {
  sent = null;
  const r = await post(join({ hp: 'bot' }));
  return (r.status === 200 && sent === null) || `forwarded ${sent}`;
});
await check('instant submit not forwarded', async () => {
  sent = null;
  const r = await post(join({ elapsedMs: 20 }));
  return (r.status === 200 && sent === null) || `forwarded ${sent}`;
});
await check('reply never leaks the Zoho URL', async () => {
  const t = await (await post(join())).text();
  return (!t.includes('zohopublic') && !t.includes('thankyou')) || t;
});
await check('3rd attempt from one IP is 429 (ceiling of 2)', async () => {
  const codes = [];
  for (let i = 0; i < 3; i++) {
    const r = await post(join({ email: `a${i}@b.co` }), { 'x-forwarded-for': '198.18.9.9' });
    codes.push(r.status);
  }
  return (codes[0] === 200 && codes[1] === 200 && codes[2] === 429) || `codes ${codes}`;
});
await check('waitlist has its own bucket, separate from sales', async () => {
  const { handleRequest: sales } = await import(pathToFileURL(ROOT + 'contact-sales.js').href);
  process.env.ZOHO_SALES_FORM_URL = 'https://upstream.invalid/records';
  const r = await sales(new Request('https://insightis.ai/api/contact-sales', {
    method: 'POST',
    headers: { origin: 'https://insightis.ai', 'content-type': 'application/json', 'x-forwarded-for': '198.18.9.9' },
    body: JSON.stringify({ name: 'A B', company: 'C D', email: 'a@b.co', teamSize: '1-10', elapsedMs: 6000 }),
  }));
  return r.status === 200 || `the waitlist limit bled into sales: ${r.status}`;
});
await check('503 when the env var is unset', async () => {
  const saved = process.env.ZOHO_WAITLIST_FORM_URL;
  delete process.env.ZOHO_WAITLIST_FORM_URL;
  const r = await post(join());
  process.env.ZOHO_WAITLIST_FORM_URL = saved;
  return r.status === 503 || `status ${r.status}`;
});
await check('502 when Zoho answers with errors', async () => {
  reply = () => new Response('{"errors":[{"SingleLine":"required"}]}', { status: 400 });
  const r = await post(join());
  reply = () => new Response(ZOHO_OK, { status: 200 });
  return r.status === 502 || `status ${r.status}`;
});
await check('GET rejected', async () => {
  const r = await handleRequest(new Request('https://insightis.ai/api/waitlist', { method: 'GET', headers: { origin: 'https://insightis.ai' } }));
  return r.status === 405 || `status ${r.status}`;
});

console.log('\n── the page stays un-login-like ──');
await check('sign-in ships no password field and one email field', async () => {
  const fs = await import('node:fs');
  const h = fs.readFileSync(REPO + 'dist/auth/sign-in.html', 'utf8');
  const pw = (h.match(/type="password"/g) || []).length;
  const em = (h.match(/type="email"/g) || []).length;
  return (pw === 0 && em === 1) || `password=${pw} email=${em}`;
});
await check('button reads "Join the waitlist", not a sign-in action', async () => {
  const fs = await import('node:fs');
  const h = fs.readFileSync(REPO + 'dist/auth/sign-in.html', 'utf8');
  return h.includes('Join the waitlist') || 'button label missing';
});

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail === 0 ? 0 : 1);
