// Current-page path resolution that works in both render environments:
// - browser: window.location.pathname
// - build-time prerender: scripts/prerender.mjs sets globalThis.__PRERENDER_PATH__
//   per entry before renderToString (there is no window in that pass — an
//   unguarded window access would make the prerenderer silently skip the page).
//
// normalizePath makes the two worlds comparable: Vercel (cleanUrls) serves
// "/platform/ai-chat", the dev server serves "/platform/ai-chat.html", link
// maps use "/docs/" — all normalize to the same key.

export function normalizePath(p) {
  if (!p) return '';
  let out = p.toLowerCase();
  out = out.replace(/index\.html$/, '');
  out = out.replace(/\.html$/, '');
  if (out.length > 1) out = out.replace(/\/+$/, '');
  return out || '/';
}

export function getCurrentPath() {
  const raw = typeof window !== 'undefined'
    ? window.location.pathname
    : (globalThis.__PRERENDER_PATH__ || '');
  return normalizePath(raw);
}
