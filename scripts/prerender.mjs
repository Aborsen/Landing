// Build-time pre-rendering: after `vite build`, render each entry's App
// component to HTML with ReactDOMServer and inject into the dist HTML so
// every page ships with real content (no NO_LCP, faster FCP/LCP).

import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Mirror of vite.config.js rollupOptions.input. Keep in sync if entries change.
const entries = {
  main:                    'index.html',
  'ai-chat':               'Platform/AI Chat.html',
  'integrations':          'Platform/Integrations.html',
  'semantic-layer':        'Platform/Semantic Layer.html',
  'marketing-teams':       'Solutions/Marketing Teams.html',
  'revops-bizops':         'Solutions/RevOps BizOps.html',
  'founders-ceos':         'Solutions/Founders CEOs.html',
  'product-teams':         'Solutions/Product Teams.html',
  'data-analytics-teams':  'Solutions/Data Analytics Teams.html',
  'operations-finance':    'Solutions/Operations Finance.html',
  'pricing':               'Pricing.html',
  'connectors':            'Resources/Connectors.html',
  'contact-support':       'Resources/Contact Support.html',
  'prompt-library':        'Resources/Prompt Library.html',
  'roadmap':               'Resources/Roadmap.html',
  'about-insightis':       'Company/About Insightis.html',
  'contacts':              'Company/Contacts.html',
  'press-media':           'Company/Press Media.html',
  'success-stories':       'Company/Success Stories.html',
  'cookie-settings':       'Security/Cookie Settings.html',
  'privacy':               'Security/Privacy.html',
  'security':              'Security/Security.html',
  'terms':                 'Security/Terms.html',
  'blog':                  'blog/index.html',
  'docs':                  'docs/index.html',
  'sign-in':               'Auth/Sign In.html',
  'sign-up':               'Auth/Sign Up.html',
};

// Replace the content inside <div id="root">...</div>, walking nested <div>
// pairs so SEO fallback markup is overwritten cleanly.
function replaceRootContent(html, newContent) {
  const startMarker = '<div id="root">';
  const startIdx = html.indexOf(startMarker);
  if (startIdx === -1) return null;
  const contentStart = startIdx + startMarker.length;

  let depth = 1;
  let i = contentStart;
  while (i < html.length && depth > 0) {
    const open = html.indexOf('<div', i);
    const close = html.indexOf('</div>', i);
    if (close === -1) return null;
    if (open !== -1 && open < close) { depth++; i = open + 4; }
    else                              { depth--; i = close + 6; }
  }
  if (depth !== 0) return null;
  const closeIdx = i - 6;
  return html.slice(0, contentStart) + newContent + html.slice(closeIdx);
}

const server = await createServer({
  configFile: resolve(root, 'vite.config.js'),
  root,
  server: { middlewareMode: true },
  appType: 'custom',
});

let okCount = 0;
let skipCount = 0;

for (const [name, htmlPath] of Object.entries(entries)) {
  const srcHtmlPath  = resolve(root, htmlPath);
  const distHtmlPath = resolve(root, 'dist', htmlPath);

  let srcHtml;
  try { srcHtml = await readFile(srcHtmlPath, 'utf8'); }
  catch (err) { console.warn(`[prerender] skip ${name}: cannot read source HTML — ${err.message}`); skipCount++; continue; }

  const m = srcHtml.match(/<script[^>]+type=["']module["'][^>]+src=["']([^"']+\.jsx?)["']/);
  if (!m) { console.warn(`[prerender] skip ${name}: no module script in source HTML`); skipCount++; continue; }
  const scriptSrc = m[1];
  const jsxPath = scriptSrc.startsWith('/')
    ? resolve(root, scriptSrc.slice(1))
    : resolve(dirname(srcHtmlPath), scriptSrc);

  let mod;
  try { mod = await server.ssrLoadModule(jsxPath); }
  catch (err) { console.warn(`[prerender] skip ${name}: ssr load failed — ${err.message}`); skipCount++; continue; }
  if (!mod.default) { console.warn(`[prerender] skip ${name}: no default export`); skipCount++; continue; }

  let body;
  try { body = renderToString(createElement(mod.default)); }
  catch (err) { console.warn(`[prerender] skip ${name}: render failed — ${err.message}`); skipCount++; continue; }

  let distHtml;
  try { distHtml = await readFile(distHtmlPath, 'utf8'); }
  catch (err) { console.warn(`[prerender] skip ${name}: cannot read dist HTML — ${err.message}`); skipCount++; continue; }

  const replaced = replaceRootContent(distHtml, body);
  if (replaced === null) {
    console.warn(`[prerender] skip ${name}: <div id="root"> not found / unbalanced`);
    skipCount++; continue;
  }

  await writeFile(distHtmlPath, replaced, 'utf8');
  console.log(`[prerender] ok   ${name}`);
  okCount++;
}

console.log(`\n[prerender] done: ${okCount} ok, ${skipCount} skipped`);
await server.close();
