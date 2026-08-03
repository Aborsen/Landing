/* Static server for the Insight dashboard.
 *
 * Deliberately not Vite: this tool must run when the site's own toolchain is
 * broken — that is half of what it is for — so it depends on nothing but node
 * built-ins. Serves this directory only, re-reads data.json on every request so a
 * re-analysis shows up on refresh, and opens nothing outside tools/insight.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, resolve, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.INSIGHT_PORT || 4318);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://localhost');
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === '/') pathname = '/index.html';

  const target = resolve(join(HERE, normalize(pathname)));
  /* Nothing outside this directory, whatever the request says. */
  if (target !== HERE && !target.startsWith(HERE + (process.platform === 'win32' ? '\\' : '/'))) {
    res.statusCode = 403;
    res.end('403');
    return;
  }

  try {
    const s = await stat(target);
    if (!s.isFile()) throw new Error('not a file');
    const body = await readFile(target);
    res.setHeader('content-type', MIME[extname(target).toLowerCase()] || 'application/octet-stream');
    /* No caching at all: the whole point is to re-run the analyzer and refresh. */
    res.setHeader('cache-control', 'no-store');
    res.end(body);
  } catch {
    res.statusCode = 404;
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    res.end(pathname === '/data.json'
      ? 'data.json is missing — run: npm run insight:build'
      : '404');
  }
});

/* "Already running" is the most likely failure and the least interesting, so say
   it in one line instead of throwing an unhandled 'error' event and printing a
   stack trace that suggests something is wrong with the tool. */
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n  Port ${PORT} is already in use — the dashboard is probably already running at http://localhost:${PORT}`);
    console.error(`  To use a different port:  INSIGHT_PORT=4319 npm run insight\n`);
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, () => {
  console.log(`\n  Insight dashboard   http://localhost:${PORT}\n`);
  console.log('  Relations · Not used · Combine · Health · Actions');
  console.log('  Re-run `npm run insight:build` and refresh to update.\n');
});

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => { server.close(() => process.exit(0)); });
}
