/* ═══════════════════════════════════════════════════════════════════════════
   Google Tag Manager — injected into dist/ after the build.

   WHY THIS IS A POST-BUILD STEP AND NOT A LINE IN THE 31 HTML SHELLS
   One commit goes to two remotes: GitHub, which Vercel builds and serves at
   insightis-landing.vercel.app, and GitLab, whose pipeline builds the container
   image behind insightis.ai. The tag is wanted on the GitLab deployment only.
   A snippet in the source HTML would ship to both, and a static file has no
   per-host switch to turn it off again.

   So it is applied here, and this script is invoked from the Dockerfile — the
   one build path only the container takes. `npm run build` does not run it, so
   Vercel and `npm run dev` cannot pick it up even by accident. Nothing has to be
   remembered or unset on that side; the step simply does not exist there.

   To see the tagged output locally:  npm run build && node scripts/inject-gtm.mjs GTM-TSTTC7TZ
   (dist/ is git-ignored, so that leaves nothing behind.)

   STAGING GETS IT TOO, DELIBERATELY
   The pipeline builds once on deploy-staging and production redeploys that same
   image tag with --no-build, so insightis.devart.info runs the tagged image as
   well. That is the right way round: GTM Preview needs gtm.js on the page to
   debug a tag before it is promoted. Keep staging out of the numbers where that
   belongs — a hostname filter in GA/GTM — not by withholding the snippet from
   the environment it exists to be tested on.
   ═══════════════════════════════════════════════════════════════════════════ */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(process.env.SITE_DIST || join(__dirname, '..', 'dist'));

/* The site ships 44 pages plus Search Console's verification file. The Dockerfile
   asserts that floor on the build output; this asserts it on the tagging, so a
   page that is still emitted but stops receiving the snippet is caught too. */
const MIN_PAGES = 44;

const MARKER = 'googletagmanager.com/gtm.js';

const gtmId = String(process.argv[2] || process.env.GTM_ID || '').trim();

/* No ID is not an error — it is the Vercel and local path, where this script is
   either not called at all or called with nothing to inject. */
if (!gtmId) {
  console.log('[gtm] no container ID given — nothing injected');
  process.exit(0);
}

/* The ID is interpolated into a script literal and an iframe URL. A real
   container ID is GTM- plus the container's short code; anything else is a
   mangled build argument, not a container, and must not be written into 44
   pages where it would either break the tag or inject markup. */
if (!/^GTM-[A-Z0-9]{4,12}$/.test(gtmId)) {
  console.error(`[gtm] FAIL: "${gtmId}" is not a GTM container ID (expected GTM-XXXXXXX)`);
  process.exit(1);
}

/* Google's snippet, verbatim apart from the ID. Left unminified and uncommented
   on purpose: it is the code Google publishes, and anyone comparing this against
   the Tag Manager install screen should find the two identical. */
const HEAD_SNIPPET = `
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');</script>
<!-- End Google Tag Manager -->`;

const BODY_SNIPPET = `
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;

/* Google asks for the loader "as high in the <head> as possible". As high as it
   can go here is second: the encoding declaration has to land inside the first
   1024 bytes of the document, and pushing <meta charset> down for a tag costs
   more than the milliseconds it buys. */
function insertInHead(html) {
  const charset = html.match(/<meta\s+charset=[^>]*>/i);
  if (charset) {
    const at = charset.index + charset[0].length;
    return html.slice(0, at) + HEAD_SNIPPET + html.slice(at);
  }
  const head = html.match(/<head[^>]*>/i);
  if (!head) return null;
  const at = head.index + head[0].length;
  return html.slice(0, at) + HEAD_SNIPPET + html.slice(at);
}

function insertAfterBody(html) {
  const body = html.match(/<body[^>]*>/i);
  if (!body) return null;
  const at = body.index + body[0].length;
  return html.slice(0, at) + BODY_SNIPPET + html.slice(at);
}

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await htmlFiles(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

let files;
try {
  files = await htmlFiles(DIST);
} catch (err) {
  console.error(`[gtm] FAIL: cannot read ${DIST} — build first. ${err.message}`);
  process.exit(1);
}

let injected = 0;
let already = 0;
let skipped = 0;
const failures = [];

for (const file of files) {
  const rel = relative(DIST, file).split(sep).join('/');
  const html = await readFile(file, 'utf8');

  /* Idempotent, so a re-run — or a rebuilt layer — cannot end up with the loader
     twice, which would fire every tag in the container twice. */
  if (html.includes(MARKER)) { already++; continue; }

  if (!/<head[^>]*>/i.test(html) && !/<body[^>]*>/i.test(html)) {
    /* google<hash>.html is Search Console's verification file: one line of text
       that happens to end in .html. It has no document structure and has to stay
       byte-for-byte what Google issued, or verification fails. */
    console.log(`[gtm] skip ${rel} — not an HTML document`);
    skipped++;
    continue;
  }

  const withHead = insertInHead(html);
  const out = withHead && insertAfterBody(withHead);
  if (!out) { failures.push(rel); continue; }

  await writeFile(file, out, 'utf8');
  injected++;
}

if (failures.length) {
  console.error(`[gtm] FAIL: no <head>/<body> anchor in ${failures.length} page(s): ${failures.join(', ')}`);
  process.exit(1);
}

const tagged = injected + already;
console.log(`[gtm] ${gtmId}: ${injected} injected, ${already} already tagged, ${skipped} skipped (not documents)`);

/* A silent partial tagging is the failure mode worth guarding: the build stays
   green, the site works, and half the traffic is simply never measured. */
if (tagged < MIN_PAGES) {
  console.error(`[gtm] FAIL: ${tagged} page(s) carry the tag, expected at least ${MIN_PAGES}`);
  process.exit(1);
}
