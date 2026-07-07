import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
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
