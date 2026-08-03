/* ═══════════════════════════════════════════════════════════════════════════
   Insight — static analysis of this site, written to tools/insight/data.json
   for the dashboard to render.

   WHY THIS EXISTS RATHER THAN JUST USING GRAPHIFY
   Graphify (tree-sitter) gives an accurate JS *import* graph and nothing else.
   For this repo that leaves the three things we actually keep breaking invisible:

     JSX usage    <Hero /> is not a call and not an import, so tree-sitter emits
                  no edge for it. "Is this component rendered anywhere?" is
                  therefore unanswerable from an import graph — it reports 341
                  unreferenced callables including App() in every page file.
                  This file resolves JSX element usage, so dead components are
                  actually findable.
     CSS          60 stylesheets, reached through a four-level @import chain from
                  src/app.css plus one <link> per HTML shell. None of it is in an
                  AST graph.
     the shells   31 hand-written HTML entry files that decide which page module
                  and which stylesheets load at all.

   Everything here is derived from the source on disk. No network, no LLM, no
   dependencies beyond node built-ins — so it runs in CI and cannot drift from
   the tree it is describing.

   ACCURACY NOTE
   This is a scanner, not a compiler. Strings, comments and regex literals are
   blanked before any structural pattern is applied (see blank()), which removes
   the whole class of "matched something inside a comment" errors. What remains
   is deliberate: class-name usage is collected from EVERY string literal in the
   repo rather than only from className attributes, which over-counts usage on
   purpose. A stylesheet wrongly called unused is a trap; one wrongly called
   used is merely a missed cleanup.
   ═══════════════════════════════════════════════════════════════════════════ */
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, resolve, dirname, relative, extname, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..', '..');
const OUT = join(__dirname, 'data.json');

/* Directories that are not this website: dependencies, build output, other
   tools' output, and the working material (audits, exports, a downloaded theme
   kit) that lives in the tree but ships nowhere. */
const SKIP_DIRS = new Set([
  'node_modules', 'dist', '.git', '.claude', '.vercel', 'graphify-out',
  'audit_media', 'legal-export', 'connector-dark-theme-kit', 'seo-audit',
  '.vite', 'coverage',
]);

const CODE_EXT = new Set(['.js', '.jsx', '.mjs']);
const rel = (abs) => relative(ROOT, abs).split('\\').join('/');

/* ── file discovery ─────────────────────────────────────────────────────── */
async function walk(dir, out = []) {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    if (e.name.startsWith('.') && e.name !== '.env.example') {
      /* dotfiles are config, not source — except we do want none of them here */
      if (e.isDirectory()) continue;
    }
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      await walk(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

/* ── blanking: remove comments, string contents and regex literals ────────
   Replaces them with spaces of the same length so every offset and line number
   in the blanked text still matches the original. Structural patterns (imports,
   definitions, JSX tags) are matched against the blanked text; string contents
   are collected on the way through, because class names live in them. */
function blank(src) {
  /* split(''), NOT Array.from(): Array.from walks CODE POINTS, so one emoji —
     and this codebase has several (🔌 🧠 💬 in the showcase steps) — collapses a
     two-unit surrogate pair into a single element. Every index after it is then
     off by one, which silently clobbers newlines, shifts every reported line
     number, and stretches component spans until a live component looks dead.
     split('') splits by UTF-16 units, which is what String indices count. */
  const out = src.split('');
  const strings = [];
  let i = 0;
  let buf = null;      // accumulating string content
  let strStart = -1;   // where the open quote was, for the rewind below
  let reClass = false; // inside [...] of a regex literal
  let mode = 'code';   // code | line | block | sq | dq | tpl | re
  const isRegexStart = () => {
    /* A slash is a regex only where a value can start. Walk back over blanked
       whitespace to the last significant character.

       `<`, `>` and `}` are deliberately NOT in this set even though a value can
       follow them, because this codebase is JSX. Every closing tag is `</div>`
       and every self-closing tag after an inline style ends `}}/>`; reading
       either as the start of a regex swallows everything up to the next slash,
       which ate whole component bodies and reported 131 dead components across
       22,000 lines. `a < /re/.test(b)` and `{} /re/.test(x)` are not things
       anyone writes; `</svg>` and `}}/>`` are on nearly every line here. */
    for (let k = i - 1; k >= 0; k--) {
      const c = src[k];
      if (c === ' ' || c === '\t' || c === '\n' || c === '\r') continue;
      return '(,=:[!&|?{;'.includes(c);
    }
    return true;
  };
  while (i < src.length) {
    const c = src[i];
    const n = src[i + 1];
    if (mode === 'code') {
      if (c === '/' && n === '/') { mode = 'line'; out[i] = out[i + 1] = ' '; i += 2; continue; }
      if (c === '/' && n === '*') { mode = 'block'; out[i] = out[i + 1] = ' '; i += 2; continue; }
      if (c === "'") { mode = 'sq'; buf = []; strStart = i; i++; continue; }
      if (c === '"') { mode = 'dq'; buf = []; strStart = i; i++; continue; }
      if (c === '`') { mode = 'tpl'; buf = []; strStart = i; i++; continue; }
      if (c === '/' && isRegexStart()) { mode = 're'; out[i] = ' '; i++; continue; }
      i++; continue;
    }
    if (mode === 'line') {
      if (c === '\n') { mode = 'code'; i++; continue; }
      out[i] = ' '; i++; continue;
    }
    if (mode === 'block') {
      if (c === '*' && n === '/') { out[i] = out[i + 1] = ' '; mode = 'code'; i += 2; continue; }
      if (c !== '\n') out[i] = ' ';
      i++; continue;
    }
    if (mode === 're') {
      if (c === '\\') { out[i] = out[i + 1] = ' '; i += 2; continue; }
      if (c === '\n') { mode = 'code'; reClass = false; i++; continue; }  // unterminated: bail out
      /* A slash inside a character class does not end the regex. The spam filter
         in server/request-connector.js is /(...|<[a-z/!]|\{\{)/i — treating that
         inner slash as the terminator dropped the rest into "code", where the
         escaped \{\{ read as two real braces and unbalanced the whole file. */
      if (c === '[') reClass = true;
      else if (c === ']') reClass = false;
      out[i] = ' ';
      if (c === '/' && !reClass) mode = 'code';
      i++; continue;
    }
    /* inside a string of some kind */
    const quote = mode === 'sq' ? "'" : mode === 'dq' ? '"' : '`';
    /* A ' or " string cannot contain a raw newline — the language forbids it. So
       a quote whose partner never arrives before the line ends was never a string
       opener: it is an apostrophe in JSX text ("don't"). Rewind and treat it as
       ordinary text, otherwise everything up to the next apostrophe several lines
       away gets blanked, taking braces with it and wrecking every span after. */
    if (c === '\n' && mode !== 'tpl') {
      for (let k = strStart; k < i; k++) out[k] = src[k];
      buf = null; mode = 'code'; i++; continue;
    }
    if (c === '\\') { out[i] = out[i + 1] = ' '; buf.push(src[i + 1]); i += 2; continue; }
    if (c === quote) { strings.push(buf.join('')); buf = null; mode = 'code'; i++; continue; }
    /* ${...} inside a template literal is code again — leave it, and record the
       hole so dynamic class construction can be reported honestly. */
    if (mode === 'tpl' && c === '$' && n === '{') { buf.push('${'); }
    if (c !== '\n') out[i] = ' ';
    buf.push(c);
    i++;
  }
  return { code: out.join(''), strings };
}

const lineAt = (text, index) => text.slice(0, index).split('\n').length;

/* ── module parsing ─────────────────────────────────────────────────────── */
const IMPORT_RE = /import\s+(?:([\w{},*\s]+?)\s+from\s+)?["']([^"']+)["']/g;
const DEF_RE = new RegExp([
  /(?:export\s+)?(?:default\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/,
  /(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>/,
  /(?:export\s+)?class\s+([A-Za-z_$][\w$]*)/,
].map((r) => r.source).join('|'), 'g');
const JSX_RE = /<([A-Z][\w$]*(?:\.[A-Z][\w$]*)?)/g;
const CALL_RE = /\b([A-Za-z_$][\w$]*)\s*\(/g;
const ENV_RE = /process\.env\.([A-Z0-9_]+)/g;

function matchPair(code, at, open, close) {
  let depth = 0;
  for (let k = at; k < code.length; k++) {
    if (code[k] === open) depth++;
    else if (code[k] === close) { depth--; if (depth === 0) return k; }
  }
  return -1;
}

/* Where a symbol's body ends, given the index just past its declaration head.
   Handles the three shapes in this codebase: a braced function body, an arrow
   whose body is a parenthesised JSX tree, and a bare expression arrow.

   This has to be right, because the symbol-level graph is what makes
   transitively-dead trees findable — a component referenced only by another dead
   component is itself dead, which is the shape of the ~330 orphaned lines in
   connectors.jsx. A span that is one line too short silently reassigns every
   reference inside the body to "module top level", which marks its callees live
   and hides the whole tree. */
function blockEnd(code, bodyFrom) {
  const N = code.length;
  let i = bodyFrom;
  while (i < N && /\s/.test(code[i])) i++;
  if (code[i] === '=' && code[i + 1] === '>') { i += 2; while (i < N && /\s/.test(code[i])) i++; }
  if (code[i] === '{') { const e = matchPair(code, i, '{', '}'); return e < 0 ? N : e; }
  if (code[i] === '(') { const e = matchPair(code, i, '(', ')'); return e < 0 ? N : e; }
  while (i < N && code[i] !== ';' && code[i] !== '\n') i++;   // bare expression
  return i;
}

function parseModule(abs, raw) {
  const { code, strings } = blank(raw);
  const path = rel(abs);

  /* Imports are matched against the RAW source, because blank() replaces string
     contents with spaces and the specifier IS a string — matching the blanked
     text returns every import with an empty path. The blanked text is still the
     authority on whether the match is real: if `import` is not still there at
     the same offset, the match was inside a comment or a string. */
  const imports = [];
  for (const m of raw.matchAll(IMPORT_RE)) {
    if (code.slice(m.index, m.index + 6) !== 'import') continue;
    const clause = m[1] || '';
    /* Keep BOTH names per binding. The local name is what references in this file
       use; the exported name is what the target module actually declares, and the
       two differ whenever an import is aliased or renamed on the way in. Resolving
       only by local name made every `import Shared X from './X'` look unused —
       which is exactly how the six Solutions pages import their extracted
       components, so three live shared components were reported dead. */
    const bindings = [];
    /* default binding: anything before the first { or , that is a bare identifier */
    const dflt = clause.replace(/\{[^}]*\}/g, '').split(',')[0].trim();
    if (/^[A-Za-z_$][\w$]*$/.test(dflt)) bindings.push({ local: dflt, exported: null, isDefault: true });
    const braced = clause.match(/\{([^}]*)\}/);
    if (braced) {
      for (const part of braced[1].split(',')) {
        const t = part.trim();
        if (!t) continue;
        const as = t.split(/\s+as\s+/);
        bindings.push({ local: (as[1] || as[0]).trim(), exported: as[0].trim(), isDefault: false });
      }
    }
    imports.push({
      spec: m[2],
      names: bindings.map((b) => b.local),
      bindings,
      line: lineAt(raw, m.index),
    });
  }

  const defs = [];
  for (const m of code.matchAll(DEF_RE)) {
    const name = m[1] || m[2] || m[3];
    if (!name) continue;
    const start = m.index;
    /* `function Name(` ends on the opening paren of the parameter list, so the
       body starts after that list closes. The arrow and class alternatives end
       past the name, so the body starts immediately. */
    let bodyFrom = start + m[0].length;
    if (m[0].endsWith('(')) {
      const params = matchPair(code, start + m[0].length - 1, '(', ')');
      bodyFrom = params < 0 ? bodyFrom : params + 1;
    }
    const end = blockEnd(code, bodyFrom);
    defs.push({
      name,
      line: lineAt(code, start),
      endLine: lineAt(code, end),
      start,
      end,
      lines: lineAt(code, end) - lineAt(code, start) + 1,
      component: /^[A-Z]/.test(name),
    });
  }
  /* Nested definitions (a helper declared inside a component) would otherwise be
     counted as top-level and look dead. Drop anything fully contained in an
     earlier definition's span. */
  const top = defs.filter((d, idx) => !defs.some((o, j) => j !== idx && o.start < d.start && o.end > d.end));

  const refs = [];
  for (const m of code.matchAll(JSX_RE)) {
    const [ns, member] = m[1].split('.');
    refs.push({ name: ns, at: m.index, kind: 'jsx' });
    /* `<BottomCTA.Highlight>` uses two things: the namespace, and the member
       hanging off it. Recording only the namespace left Highlight, HeroMockup.Badge
       and HeroMockup.FloatCard looking dead while they render on nine pages. The
       member resolves in whichever module exports the namespace. */
    if (member) refs.push({ name: member, via: ns, at: m.index, kind: 'jsx-member' });
  }
  for (const m of code.matchAll(CALL_RE)) refs.push({ name: m[1], at: m.index, kind: 'call' });

  /* Structural canary. Once strings, comments and regexes are blanked, braces in
     real source balance. If they do not, the blanker mis-parsed something and
     every span after that point is suspect — which is exactly how a live
     component ends up on the dead list. Surfaced rather than swallowed. */
  const braceDelta = (code.match(/\{/g) || []).length - (code.match(/\}/g) || []).length;

  const env = [...new Set([...code.matchAll(ENV_RE)].map((m) => m[1]))];

  const cssImports = imports.filter((i) => i.spec.endsWith('.css')).map((i) => i.spec);

  return { path, abs, code, raw, strings, imports, defs: top, refs, env, cssImports, braceDelta, loc: raw.split('\n').length };
}

/* ── HTML shells ────────────────────────────────────────────────────────── */
function parseHtml(abs, raw) {
  const path = rel(abs);
  const modules = [...raw.matchAll(/<script[^>]*type=["']module["'][^>]*src=["']([^"']+)["']/g)].map((m) => m[1]);
  const scripts = [...raw.matchAll(/<script(?![^>]*type=["']module["'])[^>]*src=["']([^"']+)["']/g)].map((m) => m[1]);
  const styles = [...raw.matchAll(/<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["']/g)].map((m) => m[1]);
  const classes = [...raw.matchAll(/class=["']([^"']+)["']/g)].flatMap((m) => m[1].split(/\s+/));
  const title = (raw.match(/<title>([\s\S]*?)<\/title>/i) || [, ''])[1].trim();
  const canonical = (raw.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i) || [, ''])[1];
  const robots = (raw.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i) || [, ''])[1];
  const todos = [...raw.matchAll(/<!--\s*(TODO[^>]*?)-->/g)].map((m) => m[1].trim());
  return { path, abs, modules, scripts, styles, classes, title, canonical, robots, todos, loc: raw.split('\n').length };
}

/* ── CSS ────────────────────────────────────────────────────────────────── */
function parseCss(abs, raw) {
  const path = rel(abs);
  const noComments = raw.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
  const importsOf = [...noComments.matchAll(/@import\s+(?:url\()?["']([^"')]+)["']\)?/g)].map((m) => m[1]);
  /* Class selectors: a dot NOT preceded by a word character, so `image.png`
     inside url() does not read as a class called png. */
  const classes = new Map();
  for (const m of noComments.matchAll(/(^|[^\w.\-])\.([a-zA-Z_][\w-]*)/g)) {
    const name = m[2];
    if (!classes.has(name)) classes.set(name, lineAt(noComments, m.index));
  }
  const rules = (noComments.match(/\{/g) || []).length;
  const mediaQueries = (noComments.match(/@media/g) || []).length;
  return { path, abs, importsOf, classes: [...classes], rules, mediaQueries, loc: raw.split('\n').length };
}

/* ── import resolution ──────────────────────────────────────────────────── */
function resolveSpec(spec, fromAbs, known) {
  if (/^https?:/.test(spec)) return null;
  let base;
  if (spec.startsWith('/')) base = join(ROOT, spec.slice(1));
  else if (spec.startsWith('.')) base = resolve(dirname(fromAbs), spec);
  else return null;                       // bare specifier = npm package
  const tries = [base, base + '.js', base + '.jsx', base + '.mjs', join(base, 'index.js'), join(base, 'index.jsx'), join(base, 'index.css')];
  for (const t of tries) if (known.has(resolve(t))) return resolve(t);
  return null;
}

/* Assets under public/ are served from the web root, so /assets/x.css in a shell
   is public/assets/x.css on disk. Vite copies public/ verbatim, which is why an
   orphan in there still ships. */
function resolveWebPath(href, known) {
  if (/^https?:|^data:/.test(href)) return null;
  const clean = href.split('?')[0].split('#')[0];
  for (const cand of [join(ROOT, 'public', clean), join(ROOT, clean.replace(/^\//, ''))]) {
    if (known.has(resolve(cand))) return resolve(cand);
  }
  return null;
}

/* ── main ───────────────────────────────────────────────────────────────── */
const files = await walk(ROOT);
const known = new Set(files.map((f) => resolve(f)));

const modules = new Map();
const htmls = new Map();
const csss = new Map();

for (const abs of files) {
  const ext = extname(abs).toLowerCase();
  const path = rel(abs);
  if (path.startsWith('tools/insight/')) continue;      // don't analyse ourselves
  try {
    if (CODE_EXT.has(ext)) {
      modules.set(resolve(abs), parseModule(abs, await readFile(abs, 'utf8')));
    } else if (ext === '.html') {
      htmls.set(resolve(abs), parseHtml(abs, await readFile(abs, 'utf8')));
    } else if (ext === '.css') {
      csss.set(resolve(abs), parseCss(abs, await readFile(abs, 'utf8')));
    }
  } catch { /* unreadable file: skip rather than fail the whole run */ }
}

/* ── entries: the HTML shells vite is told to build ── */
const viteCfg = await readFile(join(ROOT, 'vite.config.js'), 'utf8').catch(() => '');
const viteEntries = [...viteCfg.matchAll(/resolve\(__dirname,\s*['"]([^'"]+)['"]\)/g)].map((m) => m[1]);
const prerenderSrc = await readFile(join(ROOT, 'scripts', 'prerender.mjs'), 'utf8').catch(() => '');
const prerenderEntries = [...prerenderSrc.matchAll(/^\s*['"]?[\w-]+['"]?:\s*['"]([\w./-]+\.html)['"]/gm)].map((m) => m[1]);

/* ── module reachability from the shells ── */
const moduleEdges = new Map();     // abs -> [abs]
for (const [abs, m] of modules) {
  const outs = [];
  for (const im of m.imports) {
    const t = resolveSpec(im.spec, abs, known);
    if (t) outs.push({ to: t, names: im.names, bindings: im.bindings, line: im.line });
  }
  moduleEdges.set(abs, outs);
}

/* What each module's `export default` actually names, so `import Anything from
   './X'` resolves to the declaration rather than to the local alias. */
const defaultExportName = new Map();
for (const [abs, m] of modules) {
  const d = m.raw.match(/export\s+default\s+(?:function\s+)?([A-Za-z_$][\w$]*)/);
  if (d) defaultExportName.set(m.path, d[1]);
}

const entryModules = new Set();
for (const h of htmls.values()) {
  for (const s of [...h.modules, ...h.scripts]) {
    const t = resolveWebPath(s, known) || resolveSpec(s, h.abs, known);
    if (t && modules.has(t)) entryModules.add(t);
  }
}
/* Build-time and server-side entry points are roots too: nothing imports them,
   they are invoked by node or by the host. */
for (const p of ['vite.config.js', 'scripts/prerender.mjs', 'scripts/inject-gtm.mjs', 'server/serve.js',
  'api/request-connector.js', 'api/contact-support.js', 'api/contact-sales.js', 'api/waitlist.js',
  /* Read by name by the tools that own them, never imported. */
  'tailwind.config.js', 'postcss.config.js']) {
  const a = resolve(join(ROOT, p));
  if (modules.has(a)) entryModules.add(a);
}
/* Anything under test/ and any standalone script is invoked by node directly, so
   nothing imports it and "unreachable" would be the wrong word. Pattern-matched
   rather than listed by name, so a new suite does not have to be registered here
   to avoid being reported as dead code. */
for (const [abs, m] of modules) {
  if (m.path.startsWith('test/') || /^scripts\/[\w-]+\.mjs$/.test(m.path)) entryModules.add(abs);
}

const reachableModules = new Set();
{
  const q = [...entryModules];
  while (q.length) {
    const cur = q.pop();
    if (reachableModules.has(cur)) continue;
    reachableModules.add(cur);
    for (const e of moduleEdges.get(cur) || []) if (modules.has(e.to)) q.push(e.to);
  }
}

/* ── symbol graph: definitions, and who references them ──────────────────
   A definition is a root when it is referenced from module top level (outside
   every other definition) — the `render(<App />)` call, or an export consumed by
   another reachable module. Everything else is reachable only through the
   symbols that mention it, so a dead parent makes its children dead too. */
const symbols = new Map();          // "path#Name" -> record
const keyOf = (path, name) => `${path}#${name}`;

for (const [abs, m] of modules) {
  for (const d of m.defs) {
    symbols.set(keyOf(m.path, d.name), {
      key: keyOf(m.path, d.name), file: m.path, abs, name: d.name, line: d.line, endLine: d.endLine,
      lines: d.lines, component: d.component, start: d.start, end: d.end,
      refsIn: [], usedBy: [], topLevelRef: false, exported: /export/.test(m.code.slice(Math.max(0, d.start - 40), d.start)),
    });
  }
}

/* who does each reference belong to, and what does it point at */
for (const [abs, m] of modules) {
  const owners = m.defs;
  const importedFrom = new Map();   // local name -> { path, name } in the target
  for (const e of moduleEdges.get(abs) || []) {
    if (!modules.has(e.to)) continue;
    const targetPath = modules.get(e.to).path;
    for (const b of e.bindings || []) {
      const name = b.isDefault ? (defaultExportName.get(targetPath) || b.local) : (b.exported || b.local);
      importedFrom.set(b.local, { path: targetPath, name });
    }
  }
  for (const r of m.refs) {
    const owner = owners.find((d) => r.at > d.start && r.at < d.end);
    const localDef = owners.find((d) => d.name === r.name);
    /* A member reference (<Ns.Member/>) lives wherever Ns came from, not wherever
       a same-named symbol happens to exist locally. */
    const viaImport = importedFrom.get(r.via || r.name);
    const targetPath = r.via
      ? (viaImport ? viaImport.path : m.path)
      : (viaImport ? viaImport.path : (localDef ? m.path : null));
    /* A member ref keeps its own member name; a plain ref takes the name the
       target module exports it under, which is what un-aliases the import. */
    const targetName = r.via ? r.name : (viaImport ? viaImport.name : r.name);
    if (!targetPath) continue;
    const target = symbols.get(keyOf(targetPath, targetName));
    if (!target) continue;
    if (owner && owner.name === r.name) continue;             // self-recursion
    if (owner) {
      target.usedBy.push({ from: keyOf(m.path, owner.name), kind: r.kind, line: lineAt(m.code, r.at) });
      symbols.get(keyOf(m.path, owner.name))?.refsIn.push(target.key);
    } else {
      target.topLevelRef = true;
      target.usedBy.push({ from: `${m.path} (top level)`, kind: r.kind, line: lineAt(m.code, r.at) });
    }
  }
}

const liveSymbols = new Set();
{
  const q = [...symbols.values()].filter((s) => s.topLevelRef && reachableModules.has(s.abs)).map((s) => s.key);
  while (q.length) {
    const k = q.pop();
    if (liveSymbols.has(k)) continue;
    liveSymbols.add(k);
    for (const child of symbols.get(k)?.refsIn || []) if (!liveSymbols.has(child)) q.push(child);
  }
}

/* ── CSS reachability: <link> in a shell, or an import from live JS, then the
      @import chain from there ── */
const cssEdges = new Map();
for (const [abs, c] of csss) {
  cssEdges.set(abs, c.importsOf.map((s) => resolveSpec(s, abs, known) || resolveWebPath(s, known)).filter(Boolean));
}
const cssRoots = new Map();         // abs -> [reason]
for (const h of htmls.values()) {
  for (const s of h.styles) {
    const t = resolveWebPath(s, known);
    if (t && csss.has(t)) cssRoots.set(t, [...(cssRoots.get(t) || []), `<link> in ${h.path}`]);
  }
}
for (const abs of reachableModules) {
  const m = modules.get(abs);
  for (const spec of m.cssImports) {
    const t = resolveSpec(spec, abs, known);
    if (t && csss.has(t)) cssRoots.set(t, [...(cssRoots.get(t) || []), `import in ${m.path}`]);
  }
}
const reachableCss = new Set();
{
  const q = [...cssRoots.keys()];
  while (q.length) {
    const cur = q.pop();
    if (reachableCss.has(cur)) continue;
    reachableCss.add(cur);
    for (const t of cssEdges.get(cur) || []) if (csss.has(t)) q.push(t);
  }
}

/* ── class-name usage ──
   Every string literal in every module, plus every class attribute in every
   shell. Deliberately generous: see the accuracy note at the top. */
const usedClasses = new Set();
let dynamicClassStrings = 0;
for (const m of modules.values()) {
  for (const s of m.strings) {
    if (s.includes('${')) dynamicClassStrings++;
    for (const tok of s.split(/[\s"'`]+/)) {
      const t = tok.trim();
      if (t && /^[a-zA-Z_][\w-]*$/.test(t)) usedClasses.add(t);
    }
  }
}
for (const h of htmls.values()) for (const c of h.classes) if (c) usedClasses.add(c);

const cssFiles = [...csss.values()].map((c) => {
  const abs = resolve(c.abs);
  const defined = c.classes.map(([name, line]) => ({ name, line }));
  const unused = defined.filter((d) => !usedClasses.has(d.name));
  return {
    path: c.path,
    loc: c.loc,
    rules: c.rules,
    mediaQueries: c.mediaQueries,
    reachable: reachableCss.has(abs),
    roots: cssRoots.get(abs) || [],
    importsOf: c.importsOf,
    shipsAnyway: c.path.startsWith('public/'),
    classCount: defined.length,
    unusedClasses: unused.map((u) => u.name),
  };
});

/* ── duplicate files ── */
const hashes = new Map();
for (const abs of files) {
  const path = rel(abs);
  if (path.startsWith('tools/insight/')) continue;
  const ext = extname(abs).toLowerCase();
  if (!CODE_EXT.has(ext) && ext !== '.css' && ext !== '.html') continue;
  try {
    const raw = await readFile(abs);
    const h = createHash('sha256').update(raw).digest('hex');
    if (!hashes.has(h)) hashes.set(h, []);
    hashes.get(h).push({ path, bytes: raw.length, loc: raw.toString('utf8').split('\n').length });
  } catch { /* skip */ }
}
const duplicateFiles = [...hashes.values()].filter((g) => g.length > 1)
  .sort((a, b) => b[0].loc * (b.length - 1) - a[0].loc * (a.length - 1));

/* ── the same component written out in several page files ── */
const norm = (s) => s.replace(/\s+/g, ' ').trim();
const byName = new Map();
for (const s of symbols.values()) {
  if (!s.component) continue;
  if (!byName.has(s.name)) byName.set(s.name, []);
  byName.get(s.name).push(s);
}
const repeated = [];
for (const [name, list] of byName) {
  if (list.length < 2) continue;
  /* TWO hashes, because they answer different questions.
     structureHash comes from the blanked source, where every string literal is
     spaces — so it says "is the JSX shape the same, ignoring the words". That is
     the one that matters for extraction: six pages can share a component whose
     copy is passed in as data.
     exactHash comes from the raw source and says "is this the same code,
     copy included" — the only case where the copies can be deleted outright with
     no props at all.
     Conflating them mislabelled FeatureSpotlights as six identical copies
     "replaceable with one import today" when in fact each carries its own
     marketing copy and needs it lifted into props first. */
  const withBody = list.map((s) => {
    const m = modules.get(s.abs);
    const structure = norm(m.code.slice(s.start, s.end));
    const exact = norm(m.raw.slice(s.start, s.end));
    return {
      file: s.file,
      line: s.line,
      lines: s.lines,
      hash: createHash('sha256').update(structure).digest('hex').slice(0, 12),
      exactHash: createHash('sha256').update(exact).digest('hex').slice(0, 12),
    };
  });
  const distinct = new Set(withBody.map((w) => w.hash)).size;
  const distinctExact = new Set(withBody.map((w) => w.exactHash)).size;
  const sharedComponent = [...symbols.values()].find((s) => s.name === name && s.file.startsWith('src/components/'));
  repeated.push({
    name,
    copies: withBody.length,
    distinctBodies: distinct,
    distinctExact,
    /* sameStructure: one shared component, copy passed in as props.
       sameCode: the copies are literally the same text and can just go. */
    sameStructure: distinct === 1,
    sameCode: distinctExact === 1,
    identical: distinctExact === 1,
    totalLines: withBody.reduce((a, w) => a + w.lines, 0),
    savableLines: withBody.slice(1).reduce((a, w) => a + w.lines, 0),
    alreadySharedAs: sharedComponent ? sharedComponent.file : null,
    where: withBody.sort((a, b) => b.lines - a.lines),
  });
}
repeated.sort((a, b) => b.savableLines - a.savableLines);

/* ── the four-place API route registry, and env-var parity ──
   Both waitlist outages came from this: /api/waitlist was registered in
   vite.config.js but not server/serve.js (404 in the container), and
   ZOHO_WAITLIST_FORM_URL was read by the endpoint but not passed by
   docker-compose (503 in production). Nothing in the build checked either. */
/* Raw, not blanked: the route keys we are looking for ARE string literals. */
const serveSrc = modules.get(resolve(join(ROOT, 'server', 'serve.js')))?.raw || '';
const composeSrc = await readFile(join(ROOT, 'docker-compose.yml'), 'utf8').catch(() => '');
const envExample = await readFile(join(ROOT, '.env.example'), 'utf8').catch(() => '');
const ciSrc = await readFile(join(ROOT, '.gitlab-ci.yml'), 'utf8').catch(() => '');

const routesInVite = [...viteCfg.matchAll(/'(\/api\/[\w-]+)'\s*:/g)].map((m) => m[1]);
const routesInServe = [...serveSrc.matchAll(/'(\/api\/[\w-]+)'\s*:/g)].map((m) => m[1]);
const routesInApiDir = [...modules.values()].filter((m) => m.path.startsWith('api/')).map((m) => '/api/' + m.path.slice(4).replace(/\.js$/, ''));
/* From src/ only, and only paths with a segment after /api/. "client" means the
   browser code fetches it, so build scripts have no business voting — and
   scripts/check-wiring.mjs builds route names from the literal '/api/', which the
   analyzer duly reported as a fifth route registered nowhere. A tool that scans
   for routes should not be scanned for routes. */
const routesInClient = [...new Set([...modules.values()]
  .filter((m) => m.path.startsWith('src/'))
  .flatMap((m) => m.strings.filter((s) => /^\/api\/[\w-]+$/.test(s))))];
const allRoutes = [...new Set([...routesInVite, ...routesInServe, ...routesInApiDir, ...routesInClient])].sort();

const routeMatrix = allRoutes.map((r) => ({
  route: r,
  vite: routesInVite.includes(r),
  serve: routesInServe.includes(r),
  apiDir: routesInApiDir.includes(r),
  client: routesInClient.includes(r),
}));

const envRead = [...new Set([...modules.values()].filter((m) => m.path.startsWith('server/')).flatMap((m) => m.env))]
  .filter((v) => v !== 'NODE_ENV').sort();
const envMatrix = envRead.map((v) => ({
  name: v,
  readBy: [...modules.values()].filter((m) => m.env.includes(v)).map((m) => m.path),
  inCompose: composeSrc.includes(v),
  inEnvExample: envExample.includes(v),
  inCi: ciSrc.includes(v),
}));

/* ── page inventory ── */
const pages = [...htmls.values()]
  .filter((h) => viteEntries.includes(h.path))
  .map((h) => {
    const modAbs = h.modules.map((s) => resolveWebPath(s, known) || resolveSpec(s, h.abs, known)).filter(Boolean)[0];
    const m = modAbs ? modules.get(modAbs) : null;
    const componentsUsed = m
      ? [...new Set((moduleEdges.get(modAbs) || [])
          .filter((e) => modules.get(e.to)?.path.startsWith('src/components/'))
          .map((e) => modules.get(e.to).path))]
      : [];
    const localDefs = m ? m.defs.filter((d) => d.component) : [];
    const deadLocal = localDefs.filter((d) => !liveSymbols.has(keyOf(m.path, d.name)));
    return {
      shell: h.path,
      module: m ? m.path : null,
      moduleLoc: m ? m.loc : 0,
      title: h.title,
      canonical: h.canonical,
      robots: h.robots,
      inPrerender: prerenderEntries.includes(h.path),
      stylesheets: h.styles,
      scripts: h.scripts,
      todos: h.todos,
      sharedComponents: componentsUsed,
      localComponents: localDefs.length,
      deadLocalComponents: deadLocal.map((d) => ({ name: d.name, line: d.line, lines: d.lines })),
      deadLocalLines: deadLocal.reduce((a, d) => a + d.lines, 0),
    };
  })
  .sort((a, b) => a.shell.localeCompare(b.shell));

/* ── shared component fan-in ── */
const sharedComponents = [...modules.values()]
  .filter((m) => m.path.startsWith('src/components/'))
  .map((m) => {
    const importers = [...modules.values()]
      .filter((o) => (moduleEdges.get(o.abs) || []).some((e) => e.to === resolve(m.abs)))
      .map((o) => o.path);
    const exported = m.defs.filter((d) => d.component).map((d) => d.name);
    /* Per EXPORT, not per module, and derived from the RESOLVED symbol graph
       rather than name matching. Both mattered: twenty page files declare their
       own local ArrowRightIcon, so name matching claimed BlogPost's icons were
       rendered by BottomCTA; and a module-level answer says "something here is
       used", which is not the same as "this component is used" — BlogPost.jsx
       exports a live BlogPost alongside three genuinely orphaned social icons. */
    const fileOf = (from) => from.replace(/#.*$/, '').replace(/ \(top level\)$/, '');
    const exportUsage = exported.map((n) => {
      const used = (symbols.get(keyOf(m.path, n))?.usedBy || []).filter((u) => fileOf(u.from) !== m.path);
      /* Split by whether the USER is itself alive. "Used only by dead code" is the
         most actionable state on the board: the component is not independently
         removable, but it falls out for free once its dead parent goes — which is
         how one deletion in connectors.jsx reclaims 300 lines rather than 80. */
      const live = used.filter((u) => u.from.includes('(top level)') || liveSymbols.has(u.from));
      return {
        name: n,
        users: [...new Set(used.map((u) => fileOf(u.from)))].sort(),
        liveUsers: [...new Set(live.map((u) => fileOf(u.from)))].sort(),
        dead: !liveSymbols.has(keyOf(m.path, n)),
        lines: m.defs.find((d) => d.name === n)?.lines || 0,
      };
    });
    return {
      path: m.path,
      loc: m.loc,
      exports: exported,
      exportUsage,
      importedBy: importers.sort(),
      renderedBy: [...new Set(exportUsage.flatMap((e) => e.users))].sort(),
      reachable: reachableModules.has(resolve(m.abs)),
    };
  })
  .sort((a, b) => b.importedBy.length - a.importedBy.length);

/* ── dead things ── */
const deadModules = [...modules.values()]
  .filter((m) => !reachableModules.has(resolve(m.abs)))
  .map((m) => ({ path: m.path, loc: m.loc, shipsAnyway: m.path.startsWith('public/') }))
  .sort((a, b) => b.loc - a.loc);

const deadSymbols = [...symbols.values()]
  .filter((s) => s.component && reachableModules.has(s.abs) && !liveSymbols.has(s.key))
  .map((s) => ({
    name: s.name, file: s.file, line: s.line, endLine: s.endLine, lines: s.lines,
    exported: s.exported,
    referencedBy: s.usedBy.map((u) => u.from),
  }))
  .sort((a, b) => b.lines - a.lines);

const orphanCss = cssFiles.filter((c) => !c.reachable).sort((a, b) => b.loc - a.loc);

/* ── totals ── */
const totals = {
  generatedAt: new Date().toISOString(),
  commit: (await readFile(join(ROOT, '.git'), 'utf8').catch(() => '')) ? 'worktree' : 'repo',
  htmlShells: htmls.size,
  viteEntries: viteEntries.length,
  prerenderEntries: prerenderEntries.length,
  modules: modules.size,
  moduleLoc: [...modules.values()].reduce((a, m) => a + m.loc, 0),
  cssFiles: csss.size,
  cssLoc: [...csss.values()].reduce((a, c) => a + c.loc, 0),
  sharedComponents: sharedComponents.length,
  symbols: symbols.size,
  componentSymbols: [...symbols.values()].filter((s) => s.component).length,
  deadModuleLoc: deadModules.reduce((a, d) => a + d.loc, 0),
  deadSymbolLines: deadSymbols.reduce((a, d) => a + d.lines, 0),
  orphanCssLoc: orphanCss.reduce((a, c) => a + c.loc, 0),
  duplicateWastedLoc: duplicateFiles.reduce((a, g) => a + g[0].loc * (g.length - 1), 0),
  savableByConsolidation: repeated.reduce((a, r) => a + (r.sameStructure ? r.savableLines : 0), 0),
  dynamicClassStrings,
  routeHoles: routeMatrix.filter((r) => !(r.vite && r.serve && r.apiDir && r.client)).length,
  envHoles: envMatrix.filter((e) => !e.inCompose || !e.inEnvExample).length,
};

/* Files the blanker could not parse cleanly. Any span derived from these is
   untrustworthy, so they are published rather than hidden: a dashboard that
   quietly guesses is worse than one that admits a gap. */
const parseWarnings = [...modules.values()]
  .filter((m) => m.braceDelta !== 0)
  .map((m) => ({ path: m.path, braceDelta: m.braceDelta }));

const data = {
  totals, pages, sharedComponents, cssFiles, orphanCss, deadModules, deadSymbols,
  duplicateFiles, repeated, routeMatrix, envMatrix, parseWarnings,
  entryDrift: {
    inViteNotPrerender: viteEntries.filter((e) => e.endsWith('.html') && !prerenderEntries.includes(e)),
    inPrerenderNotVite: prerenderEntries.filter((e) => !viteEntries.includes(e)),
  },
};

await writeFile(OUT, JSON.stringify(data, null, 1), 'utf8');

console.log(`[insight] ${totals.modules} modules · ${totals.cssFiles} stylesheets · ${totals.htmlShells} shells`);
console.log(`[insight] dead: ${deadModules.length} modules (${totals.deadModuleLoc} loc) · ${deadSymbols.length} components (${totals.deadSymbolLines} loc) · ${orphanCss.length} stylesheets (${totals.orphanCssLoc} loc)`);
console.log(`[insight] duplicated: ${duplicateFiles.length} file group(s), ${totals.duplicateWastedLoc} redundant loc`);
console.log(`[insight] consolidation: ${repeated.filter((r) => r.sameStructure).length} name(s) share a structure (${repeated.filter((r) => r.sameCode).length} share code exactly), ${totals.savableByConsolidation} loc savable`);
console.log(`[insight] parity: ${totals.routeHoles} route hole(s), ${totals.envHoles} env hole(s)`);
if (parseWarnings.length) {
  console.log(`[insight] WARNING: ${parseWarnings.length} file(s) did not parse cleanly — spans in them are unreliable:`);
  for (const w of parseWarnings) console.log(`[insight]          ${w.path} (brace delta ${w.braceDelta})`);
} else {
  console.log('[insight] parse health: all files brace-balanced');
}
console.log(`[insight] wrote ${rel(OUT)}`);
