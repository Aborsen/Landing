/* server/contact-support.js — the support-ticket endpoint.
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
const { handleRequest } = await import(pathToFileURL(ROOT + 'contact-support.js').href);

process.env.ZOHO_SUPPORT_FORM_URL = 'https://upstream.invalid/records';

const ZOHO_OK = JSON.stringify({ encoded_string: 'x', thankyou_page_URL: 'https://forms.zohopublic.eu/SECRET' });
let sent = null;
let reply = () => new Response(ZOHO_OK, { status: 200 });
globalThis.fetch = async (url, init) => { sent = init && init.body; return reply(); };

let ip = 0;
function post(body, headers) {
  const h = { origin: 'https://insightis.ai', 'content-type': 'application/json', ...(headers || {}) };
  if (!h['x-forwarded-for']) h['x-forwarded-for'] = `203.0.113.${(ip++ % 250) + 1}`;
  return handleRequest(new Request('https://insightis.ai/api/contact-support', {
    method: 'POST', headers: h, body: typeof body === 'string' ? body : JSON.stringify(body),
  }));
}
const ticket = (extra = {}) => ({
  category: 'bug', subject: 'Export to PDF fails', details: 'Steps:\n1. open report\n2. export',
  email: 'user@company.com', elapsedMs: 6000, ...extra,
});

let pass = 0; let fail = 0;
async function check(label, run) {
  try {
    const r = await run();
    if (r === true) { pass++; console.log('  PASS  ' + label); }
    else { fail++; console.log('  FAIL  ' + label + '  -> ' + r); }
  } catch (e) { fail++; console.log('  FAIL  ' + label + '  -> threw ' + e.message); }
}

console.log('\n── field mapping (the spec) ──');
await check('maps all four fields to the right Zoho keys', async () => {
  await post(ticket({ details: 'plain details' }));
  const f = JSON.parse(sent);
  return (f.SingleLine === 'Report a Bug' && f.SingleLine1 === 'Export to PDF fails'
    && f.SingleLine2 === 'plain details' && f.SingleLine3 === 'user@company.com')
    || JSON.stringify(f);
});
await check('category id becomes the human label', async () => {
  await post(ticket({ category: 'connection' }));
  return JSON.parse(sent).SingleLine === 'Data Connections' || JSON.parse(sent).SingleLine;
});
await check('every category in the UI is accepted', async () => {
  const ids = ['general', 'bug', 'billing', 'connection', 'feature', 'other'];
  for (const id of ids) {
    const r = await post(ticket({ category: id }));
    if (r.status !== 200) return `${id} -> ${r.status}`;
  }
  return true;
});
await check('unknown category is rejected', async () => {
  const r = await post(ticket({ category: 'admin' }));
  return r.status === 400 || `status ${r.status}`;
});
await check('details keeps line breaks', async () => {
  await post(ticket({ details: 'line one\nline two' }));
  return JSON.parse(sent).SingleLine2 === 'line one\nline two' || JSON.stringify(JSON.parse(sent).SingleLine2);
});
await check('a URL in the ticket is allowed (bug reports need it)', async () => {
  const r = await post(ticket({ subject: 'Broken at https://app.insightis.ai/r/42' }));
  return r.status === 200 || `status ${r.status}`;
});
await check('empty details and email are fine', async () => {
  const r = await post({ category: 'general', subject: 'Just a question', elapsedMs: 6000 });
  const f = JSON.parse(sent);
  return (r.status === 200 && f.SingleLine2 === '' && f.SingleLine3 === '') || `${r.status} ${sent}`;
});

console.log('\n── attachments (names only) ──');
await check('file names are appended to details', async () => {
  await post(ticket({ details: 'see attached', fileNames: ['screen.png', 'log.txt'] }));
  const d = JSON.parse(sent).SingleLine2;
  return (d.includes('see attached') && d.includes('screen.png') && d.includes('log.txt')) || d;
});
await check('names are capped at five', async () => {
  await post(ticket({ fileNames: ['a.png', 'b.png', 'c.png', 'd.png', 'e.png', 'f.png'] }));
  return !JSON.parse(sent).SingleLine2.includes('f.png') || 'sixth name leaked through';
});
await check('a malicious file name is sanitised, not trusted', async () => {
  await post(ticket({ fileNames: ['a\u0000b\nc.png'] }));
  const d = JSON.parse(sent).SingleLine2;
  return (!d.includes('\u0000')) || 'control char survived';
});
await check('non-array fileNames does not throw', async () => {
  const r = await post(ticket({ fileNames: 'screen.png' }));
  return r.status === 200 || `status ${r.status}`;
});

console.log('\n── validation ──');
await check('missing subject rejected', async () => {
  const r = await post(ticket({ subject: '' }));
  return r.status === 400 || `status ${r.status}`;
});
await check('over-long subject rejected', async () => {
  const r = await post(ticket({ subject: 'x'.repeat(201) }));
  return r.status === 400 || `status ${r.status}`;
});
await check('over-long details rejected', async () => {
  const r = await post(ticket({ details: 'x'.repeat(5001) }));
  return r.status === 400 || `status ${r.status}`;
});
await check('bad email rejected with its own code', async () => {
  const r = await post(ticket({ email: 'not-an-email' }));
  const b = await r.json();
  return (r.status === 400 && b.error === 'email') || `${r.status} ${JSON.stringify(b)}`;
});
await check('oversized body rejected with 413', async () => {
  const r = await post(ticket({ pad: 'y'.repeat(40000) }));
  return r.status === 413 || `status ${r.status}`;
});

console.log('\n── shared controls still apply ──');
await check('foreign origin rejected', async () => {
  const r = await post(ticket(), { origin: 'https://evil.example' });
  return r.status === 403 || `status ${r.status}`;
});
await check('honeypot accepted but not forwarded', async () => {
  sent = null;
  const r = await post(ticket({ hp: 'bot' }));
  return (r.status === 200 && sent === null) || `forwarded ${sent}`;
});
await check('instant submit not forwarded', async () => {
  sent = null;
  const r = await post(ticket({ elapsedMs: 10 }));
  return (r.status === 200 && sent === null) || `forwarded ${sent}`;
});
await check('reply never leaks the Zoho URL', async () => {
  const t = await (await post(ticket())).text();
  return (!t.includes('zohopublic') && !t.includes('thankyou')) || t;
});
await check('4th ticket from one IP is 429', async () => {
  const codes = [];
  for (let i = 0; i < 4; i++) {
    const r = await post(ticket({ subject: `Ticket ${i}` }), { 'x-forwarded-for': '198.51.100.200' });
    codes.push(r.status);
  }
  return (codes.slice(0, 3).every((c) => c === 200) && codes[3] === 429) || `codes ${codes}`;
});
await check('connector form has its own rate bucket', async () => {
  const { handleRequest: conn } = await import(pathToFileURL(ROOT + 'request-connector.js').href);
  process.env.ZOHO_CONNECTOR_FORM_URL = 'https://upstream.invalid/records';
  const r = await conn(new Request('https://insightis.ai/api/request-connector', {
    method: 'POST',
    headers: { origin: 'https://insightis.ai', 'content-type': 'application/json', 'x-forwarded-for': '198.51.100.200' },
    body: JSON.stringify({ name: 'Pipedrive', elapsedMs: 6000 }),
  }));
  return r.status === 200 || `the support form's limit bled into the connector form: ${r.status}`;
});
await check('503 when the env var is unset', async () => {
  const saved = process.env.ZOHO_SUPPORT_FORM_URL;
  delete process.env.ZOHO_SUPPORT_FORM_URL;
  const r = await post(ticket());
  process.env.ZOHO_SUPPORT_FORM_URL = saved;
  return r.status === 503 || `status ${r.status}`;
});
await check('502 when Zoho answers with errors', async () => {
  reply = () => new Response('{"errors":[{"SingleLine1":"required"}]}', { status: 400 });
  const r = await post(ticket());
  reply = () => new Response(ZOHO_OK, { status: 200 });
  return r.status === 502 || `status ${r.status}`;
});

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail === 0 ? 0 : 1);
