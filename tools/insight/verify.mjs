/* Self-check for the analyzer. Run after analyze.mjs.
 *
 * A dashboard that quietly mislabels live code as dead is worse than no
 * dashboard — someone deletes a component on its word. These assertions are the
 * things that were actually wrong during development, each kept as a permanent
 * guard:
 *
 *   - every reported line number really contains that definition (offsets drifted
 *     by one per emoji, because Array.from walks code points not UTF-16 units)
 *   - no component span is absurd (`</svg>` was parsed as a regex literal and ate
 *     hundreds of lines)
 *   - components that provably render are not in the dead list (an apostrophe in
 *     JSX text opened a string that swallowed the next brace)
 *   - the known-true relationships still hold
 *
 * Exits non-zero on any failure, so it can gate a commit.
 */
import { readFile } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..', '..');
const d = JSON.parse(await readFile(join(__dirname, 'data.json'), 'utf8'));

let pass = 0;
const fails = [];
const check = (label, ok, detail = '') => {
  if (ok) { pass++; console.log(`  ok    ${label}`); }
  else { fails.push(`${label}${detail ? ' — ' + detail : ''}`); console.log(`  FAIL  ${label}${detail ? ' — ' + detail : ''}`); }
};

const cache = new Map();
async function lines(path) {
  if (!cache.has(path)) cache.set(path, (await readFile(join(ROOT, path), 'utf8')).split('\n'));
  return cache.get(path);
}

console.log('\n── reported line numbers point at the real definition ──');
{
  let wrong = [];
  for (const s of d.deadSymbols) {
    const src = await lines(s.file);
    const text = (src[s.line - 1] || '') + (src[s.line] || '');
    if (!text.includes(s.name)) wrong.push(`${s.file}:${s.line} should define ${s.name}`);
  }
  check(`all ${d.deadSymbols.length} dead-component line numbers resolve`, wrong.length === 0, wrong.slice(0, 3).join(' | '));
}

console.log('\n── spans are plausible ──');
{
  const absurd = d.deadSymbols.filter((s) => s.lines > 400);
  check('no component span over 400 lines', absurd.length === 0, absurd.map((s) => `${s.name}=${s.lines}`).join(', '));
  const negative = d.deadSymbols.filter((s) => s.lines < 1 || s.endLine < s.line);
  check('no inverted or empty spans', negative.length === 0, negative.map((s) => s.name).join(', '));
}

console.log('\n── components that provably render are NOT called dead ──');
{
  /* Anything imported AND used as a JSX element by a reachable page is alive by
     construction. If the dead list and this disagree, the dead list is wrong. */
  const deadKeys = new Set(d.deadSymbols.map((s) => `${s.file}#${s.name}`));
  const contradictions = [];
  for (const c of d.sharedComponents) {
    /* Per export. A module-level "rendered by" answer says only that SOMETHING in
       the file is used, which is compatible with a sibling export being orphaned —
       BlogPost.jsx is exactly that case. */
    for (const e of c.exportUsage) {
      /* liveUsers, not users: being referenced by a component that is itself dead
         does not make you alive. TestimonialCard is reached only from a dead
         Testimonials() in analytics-teams.jsx, and XIcon only from a dead
         PainPointGrid — both correctly dead, transitively. */
      if (e.liveUsers.length > 0 && deadKeys.has(`${c.path}#${e.name}`)) {
        contradictions.push(`${c.path}#${e.name} used by live ${e.liveUsers[0]}`);
      }
    }
  }
  check('no export is both live-used and dead', contradictions.length === 0, contradictions.slice(0, 3).join(' | '));

  /* Spot list: page bodies that definitely ship. */
  const mustLive = [
    ['src/pages/cookie-settings.jsx', 'CookieContent'],
    ['src/pages/privacy.jsx', 'PrivacyContent'],
    ['src/components/SupportTicketModal.jsx', 'SupportTicketModal'],
    ['src/components/SalesEnquiryModal.jsx', 'SalesEnquiryModal'],
    ['src/components/WaitlistForm.jsx', 'WaitlistForm'],
    ['src/components/MetricsCatalog.jsx', 'MetricsCatalog'],
    ['src/components/BottomCTA.jsx', 'BottomCTA'],
  ];
  const wrongly = mustLive.filter(([f, n]) => deadKeys.has(`${f}#${n}`)).map(([f, n]) => `${f}#${n}`);
  check('known-live components absent from the dead list', wrongly.length === 0, wrongly.join(', '));

  check('no App() is reported dead', d.deadSymbols.filter((s) => s.name === 'App').length === 0);
}

console.log('\n── known-true relationships ──');
{
  const byPath = new Map(d.sharedComponents.map((c) => [c.path, c]));
  const stm = byPath.get('src/components/SupportTicketModal.jsx');
  check('SupportTicketModal is shared by exactly the support and contacts pages',
    stm && stm.importedBy.join(',') === 'src/pages/contact-support.jsx,src/pages/contacts.jsx',
    stm && stm.importedBy.join(','));
  const btn = byPath.get('src/components/Button.jsx');
  /* A snapshot canary, not a rule: it catches import resolution silently
     collapsing, which is how a whole class of analyzer bug shows up. It is
     SUPPOSED to break when a new file legitimately imports Button — bump it then,
     deliberately. 22 → 23 on 2026-08-03 when the extracted UseCases picked up the
     promo CTA button that six pages used to declare each for themselves. */
  check('Button import fan-in is 23', btn && btn.importedBy.length === 23, btn && String(btn.importedBy.length));
  check('every /api route is registered in all four places',
    d.routeMatrix.every((r) => r.vite && r.serve && r.apiDir && r.client),
    d.routeMatrix.filter((r) => !(r.vite && r.serve && r.apiDir && r.client)).map((r) => r.route).join(', '));
  check('vite entries and prerender entries agree',
    d.entryDrift.inViteNotPrerender.length === 0 && d.entryDrift.inPrerenderNotVite.length === 0,
    [...d.entryDrift.inViteNotPrerender, ...d.entryDrift.inPrerenderNotVite].join(', '));
  check('31 page entries found', d.pages.length === 31, String(d.pages.length));
}

console.log('\n── dead claims agree with the built output ──');
{
  /* The only unarguable test: if a component renders, its text is in the
     prerendered HTML. Sample the largest dead claims that belong to a page with a
     built file, take a distinctive sentence from the body, and require it absent. */
  let tested = 0;
  const wrong = [];
  const builtFor = (module) => {
    const page = d.pages.find((p) => p.module === module);
    return page ? join(ROOT, 'dist', page.shell) : null;
  };
  for (const s of d.deadSymbols.slice(0, 30)) {
    const built = builtFor(s.file);
    if (!built) continue;
    let html;
    try { html = await readFile(built, 'utf8'); } catch { continue; }
    const whole = (await lines(s.file)).join('\n');
    const src = (await lines(s.file)).slice(s.line - 1, s.endLine).join('\n');
    /* A run of visible words between two tags, long enough to be distinctive AND
       occurring only once in the whole file. Without the uniqueness requirement a
       heading shared by five sibling panels reads as "still in the page" and the
       check fires on components that really are dead. */
    const probe = [...src.matchAll(/>([^<>{}\n]{20,90})</g)]
      .map((m) => m[1].trim())
      .find((t) => /^[A-Za-z0-9]/.test(t)
        && !/[$`]/.test(t)
        && t.split(/\s+/).length >= 3
        && whole.split(t).length === 2);
    if (!probe) continue;
    tested++;
    if (html.includes(probe)) wrong.push(`${s.file}#${s.name} — "${probe.slice(0, 40)}" IS in ${built.split(/[\\/]/).pop()}`);
  }
  check(`${tested} dead component(s) confirmed absent from their built page`, wrong.length === 0, wrong.slice(0, 3).join(' | '));
  if (tested === 0) console.log('        (no probe text extractable — build dist/ first for this check to run)');
}

console.log(`\n${pass} passed, ${fails.length} failed\n`);
process.exit(fails.length === 0 ? 0 : 1);
