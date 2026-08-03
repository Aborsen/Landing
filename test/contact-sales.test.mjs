/* server/contact-sales.js — the sales-enquiry endpoint.
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
const { handleRequest } = await import(pathToFileURL(ROOT + 'contact-sales.js').href);

process.env.ZOHO_SALES_FORM_URL = 'https://upstream.invalid/records';

const ZOHO_OK = JSON.stringify({ encoded_string: 'x', thankyou_page_URL: 'https://forms.zohopublic.eu/SECRET' });
let sent = null;
let reply = () => new Response(ZOHO_OK, { status: 200 });
globalThis.fetch = async (_u, init) => { sent = init && init.body; return reply(); };

let ip = 0;
function post(body, headers) {
  const h = { origin: 'https://insightis.ai', 'content-type': 'application/json', ...(headers || {}) };
  if (!h['x-forwarded-for']) h['x-forwarded-for'] = `192.0.2.${(ip++ % 250) + 1}`;
  return handleRequest(new Request('https://insightis.ai/api/contact-sales', {
    method: 'POST', headers: h, body: typeof body === 'string' ? body : JSON.stringify(body),
  }));
}
const lead = (extra = {}) => ({
  name: 'Alex Morgan', email: 'alex@northwind.com',
  details: 'We use Snowflake and HubSpot.', elapsedMs: 6000, ...extra,
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
await check('maps the three fields to the right Zoho keys', async () => {
  await post(lead());
  const f = JSON.parse(sent);
  return (f.SingleLine === 'Alex Morgan'
    && f.SingleLine2 === 'alex@northwind.com'
    && f.SingleLine4 === 'We use Snowflake and HubSpot.')
    || JSON.stringify(f);
});
await check('skips SingleLine1/SingleLine3 rather than renumbering', async () => {
  // The Zoho form still has five fields. Shifting email into SingleLine1 would
  // file every address under "Name of the company", so the gaps must stay.
  await post(lead());
  const keys = Object.keys(JSON.parse(sent)).sort();
  return keys.join(',') === 'SingleLine,SingleLine2,SingleLine4' || keys.join(',');
});
await check('company and teamSize in the payload are ignored, not forwarded', async () => {
  await post(lead({ company: 'Northwind', teamSize: '11-100' }));
  const f = JSON.parse(sent);
  return (f.SingleLine1 === undefined && f.SingleLine3 === undefined) || JSON.stringify(f);
});
await check('details are optional', async () => {
  const r = await post(lead({ details: '' }));
  return (r.status === 200 && JSON.parse(sent).SingleLine4 === '') || `${r.status} ${sent}`;
});
await check('details keep line breaks', async () => {
  await post(lead({ details: 'Q1: pricing?\nQ2: SSO?' }));
  return JSON.parse(sent).SingleLine4 === 'Q1: pricing?\nQ2: SSO?' || JSON.stringify(JSON.parse(sent).SingleLine4);
});
await check('whitespace is collapsed in the name', async () => {
  await post(lead({ name: '  Alex   Morgan ' }));
  return JSON.parse(sent).SingleLine === 'Alex Morgan' || JSON.parse(sent).SingleLine;
});

console.log('\n── validation, each with its own code ──');
const cases = [
  ['missing name', { name: '' }, 'name'],
  ['one-character name', { name: 'A' }, 'name'],
  ['name with a URL', { name: 'Visit http://spam.example' }, 'name'],
  ['missing email', { email: '' }, 'email'],
  ['malformed email', { email: 'alex@nowhere' }, 'email'],
  ['over-long details', { details: 'x'.repeat(2001) }, 'length'],
];
for (const [label, patch, code] of cases) {
  await check(`rejects ${label} as '${code}'`, async () => {
    const r = await post(lead(patch));
    const b = await r.json();
    return (r.status === 400 && b.error === code) || `${r.status} ${JSON.stringify(b)}`;
  });
}
await check('email is required here, unlike the support form', async () => {
  const r = await post({ name: 'Alex Morgan', elapsedMs: 6000 });
  return r.status === 400 || `status ${r.status}`;
});
await check('a URL in details IS allowed', async () => {
  const r = await post(lead({ details: 'Our site is https://northwind.example' }));
  return r.status === 200 || `status ${r.status}`;
});
await check('oversized body rejected with 413', async () => {
  const r = await post(lead({ pad: 'y'.repeat(20000) }));
  return r.status === 413 || `status ${r.status}`;
});

console.log('\n── shared controls ──');
await check('foreign origin rejected', async () => {
  const r = await post(lead(), { origin: 'https://evil.example' });
  return r.status === 403 || `status ${r.status}`;
});
await check('honeypot accepted but not forwarded', async () => {
  sent = null;
  const r = await post(lead({ hp: 'bot' }));
  return (r.status === 200 && sent === null) || `forwarded ${sent}`;
});
await check('instant submit not forwarded', async () => {
  sent = null;
  const r = await post(lead({ elapsedMs: 10 }));
  return (r.status === 200 && sent === null) || `forwarded ${sent}`;
});
await check('reply never leaks the Zoho URL', async () => {
  const t = await (await post(lead())).text();
  return (!t.includes('zohopublic') && !t.includes('thankyou')) || t;
});
await check('4th lead from one IP is 429', async () => {
  const codes = [];
  for (let i = 0; i < 4; i++) {
    const r = await post(lead({ name: `Alex ${i}` }), { 'x-forwarded-for': '192.0.2.250' });
    codes.push(r.status);
  }
  return (codes.slice(0, 3).every((c) => c === 200) && codes[3] === 429) || `codes ${codes}`;
});
await check('sales has its own rate bucket, separate from support', async () => {
  const { handleRequest: sup } = await import(pathToFileURL(ROOT + 'contact-support.js').href);
  process.env.ZOHO_SUPPORT_FORM_URL = 'https://upstream.invalid/records';
  const r = await sup(new Request('https://insightis.ai/api/contact-support', {
    method: 'POST',
    headers: { origin: 'https://insightis.ai', 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.250' },
    body: JSON.stringify({ category: 'general', subject: 'A question', elapsedMs: 6000 }),
  }));
  return r.status === 200 || `the sales limit bled into support: ${r.status}`;
});
await check('503 when the env var is unset', async () => {
  const saved = process.env.ZOHO_SALES_FORM_URL;
  delete process.env.ZOHO_SALES_FORM_URL;
  const r = await post(lead());
  process.env.ZOHO_SALES_FORM_URL = saved;
  return r.status === 503 || `status ${r.status}`;
});
await check('502 when Zoho answers with errors', async () => {
  reply = () => new Response('{"errors":[{"SingleLine":"required"}]}', { status: 400 });
  const r = await post(lead());
  reply = () => new Response(ZOHO_OK, { status: 200 });
  return r.status === 502 || `status ${r.status}`;
});

console.log('\n── the dialog matches the endpoint ──');
await check('the dialog no longer collects company or team size', async () => {
  const fs = await import('node:fs');
  const c = fs.readFileSync(REPO + 'src/components/SalesEnquiryModal.jsx', 'utf8');
  const stale = ['TEAM_SIZES', 'form.company', 'form.teamSize', 'COMPANY NAME', 'TEAM SIZE'].filter((t) => c.includes(t));
  return stale.length === 0 || `still present: ${stale.join(', ')}`;
});
await check('the dialog asks "YOUR NAME", not "FULL NAME"', async () => {
  const fs = await import('node:fs');
  const c = fs.readFileSync(REPO + 'src/components/SalesEnquiryModal.jsx', 'utf8');
  return (c.includes('YOUR NAME *') && !c.includes('FULL NAME')) || 'label not renamed';
});
await check('the server sends no SingleLine1/SingleLine3 keys', async () => {
  const fs = await import('node:fs');
  const srv = fs.readFileSync(REPO + 'server/contact-sales.js', 'utf8');
  const i = srv.indexOf('fields: {');
  const fields = srv.slice(i, srv.indexOf('};', i));
  return (!fields.includes('SingleLine1') && !fields.includes('SingleLine3')) || fields;
});

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail === 0 ? 0 : 1);
