import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { pathToFileURL } from 'node:url'

/* ── local /api middleware ──
 * `vite dev` and `vite preview` serve static files only, so without this the
 * connector-request form could not be exercised until it was deployed. The
 * middleware mounts the SAME handler the host runs in production, so a local
 * test proves the real code path rather than a stand-in.
 *
 * The secret is read from a .env file into process.env for the dev server
 * process only. It must never go through Vite's `define`, which would inline it
 * into the client bundle and publish exactly what the proxy exists to hide —
 * this is also why the variable has no VITE_ prefix: prefixed vars are exposed
 * to the browser by design.
 */
function localApiPlugin() {
  /* Keep in step with the files in api/ — one route per endpoint module. */
  const ROUTES = {
    '/api/request-connector': 'server/request-connector.js',
    '/api/contact-support': 'server/contact-support.js',
    '/api/contact-sales': 'server/contact-sales.js',
    '/api/waitlist': 'server/waitlist.js',
  }

  const mount = (server) => {
    for (const [route, modulePath] of Object.entries(ROUTES)) {
      const CORE_MODULE = pathToFileURL(resolve(__dirname, modulePath)).href
      server.middlewares.use(route, async (req, res, next) => {
        if (req.method !== 'POST') return next()
        try {
          /* Absolute file URL, not a relative specifier: Vite bundles this config
             into node_modules/.vite-temp/, so './server/...' resolves from there
             and fails. A file URL is also required on Windows, where importing a
             bare drive path throws.
             No cache-busting query on purpose — a fresh module per request would
             reset the rate-limiter's in-memory table every time, so dev would
             behave unlike production. Editing the handler needs a dev restart. */
          const mod = await import(CORE_MODULE)
          await mod.nodeHandler(req, res)
        } catch (err) {
          console.error(`[local-api] ${route} threw:`, err)
          res.statusCode = 500
          res.setHeader('content-type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ ok: false, error: 'server' }))
        }
      })
    }
  }

  return {
    name: 'insightis-local-api',
    config(_config, { mode }) {
      const env = loadEnv(mode, process.cwd(), '')
      for (const key of ['ZOHO_CONNECTOR_FORM_URL', 'ZOHO_SUPPORT_FORM_URL', 'ZOHO_SALES_FORM_URL', 'ZOHO_WAITLIST_FORM_URL', 'ALLOWED_FORM_ORIGINS']) {
        if (env[key] && !process.env[key]) process.env[key] = env[key]
      }
    },
    configureServer: mount,
    configurePreviewServer: mount,
  }
}

export default defineConfig({
  plugins: [react(), localApiPlugin()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main:             resolve(__dirname, 'index.html'),
        // ── Batch 1: Platform pages ──
        'ai-chat':                resolve(__dirname, 'platform/ai-chat.html'),
        'integrations':           resolve(__dirname, 'platform/integrations.html'),
        'semantic-layer':         resolve(__dirname, 'platform/semantic-layer.html'),
        // ── Batch 2: Solutions pages ──
        'marketing-teams':        resolve(__dirname, 'solutions/marketing-teams.html'),
        'revenue-teams':          resolve(__dirname, 'solutions/revenue-teams.html'),
        'executive-teams':          resolve(__dirname, 'solutions/executive-teams.html'),
        'product-teams':          resolve(__dirname, 'solutions/product-teams.html'),
        'analytics-teams':   resolve(__dirname, 'solutions/analytics-teams.html'),
        'finance-teams':     resolve(__dirname, 'solutions/finance-teams.html'),
        // ── Batch 3: Pricing + Resources + Company + Security + blog + docs ──
        'pricing':                resolve(__dirname, 'pricing.html'),
        'connectors':             resolve(__dirname, 'resources/connectors.html'),
        'contact-support':        resolve(__dirname, 'resources/contact-support.html'),
        'prompt-library':         resolve(__dirname, 'resources/prompt-library.html'),
        'roadmap':                resolve(__dirname, 'resources/roadmap.html'),
        'about-insightis':        resolve(__dirname, 'company/about-insightis.html'),
        'contacts':               resolve(__dirname, 'company/contacts.html'),
        'press-media':            resolve(__dirname, 'company/press-media.html'),
        'success-stories':        resolve(__dirname, 'company/success-stories.html'),
        'cookie-settings':        resolve(__dirname, 'security/cookie-settings.html'),
        'privacy':                resolve(__dirname, 'security/privacy.html'),
        'security':               resolve(__dirname, 'security/security.html'),
        'terms':                  resolve(__dirname, 'security/terms.html'),
        'blog':                            resolve(__dirname, 'blog/index.html'),
        'blog-what-is-ai-data-analysis':   resolve(__dirname, 'blog/what-is-ai-data-analysis.html'),
        'blog-best-ai-data-analysis-tools':resolve(__dirname, 'blog/best-ai-data-analysis-tools.html'),
        'blog-marketing-analytics-tools':  resolve(__dirname, 'blog/marketing-analytics-tools.html'),
        'blog-self-service-bi-guide':      resolve(__dirname, 'blog/self-service-bi-guide.html'),
        'docs':                            resolve(__dirname, 'docs/index.html'),
        // ── Auth (noindex placeholders) ──
        'sign-in':                resolve(__dirname, 'auth/sign-in.html'),
        'sign-up':                resolve(__dirname, 'auth/sign-up.html'),
      }
    }
  }
})
