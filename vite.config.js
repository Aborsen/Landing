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
        'ai-chat':                resolve(__dirname, 'Platform/AI Chat.html'),
        'integrations':           resolve(__dirname, 'Platform/Integrations.html'),
        'semantic-layer':         resolve(__dirname, 'Platform/Semantic Layer.html'),
        // ── Batch 2: Solutions pages ──
        'marketing-teams':        resolve(__dirname, 'Solutions/Marketing Teams.html'),
        'revops-bizops':          resolve(__dirname, 'Solutions/RevOps BizOps.html'),
        'founders-ceos':          resolve(__dirname, 'Solutions/Founders CEOs.html'),
        'product-teams':          resolve(__dirname, 'Solutions/Product Teams.html'),
        'data-analytics-teams':   resolve(__dirname, 'Solutions/Data Analytics Teams.html'),
        'operations-finance':     resolve(__dirname, 'Solutions/Operations Finance.html'),
        // ── Batch 3: Pricing + Resources + Company + Security + blog + docs ──
        'pricing':                resolve(__dirname, 'Pricing.html'),
        'connectors':             resolve(__dirname, 'Resources/Connectors.html'),
        'contact-support':        resolve(__dirname, 'Resources/Contact Support.html'),
        'prompt-library':         resolve(__dirname, 'Resources/Prompt Library.html'),
        'roadmap':                resolve(__dirname, 'Resources/Roadmap.html'),
        'about-insightis':        resolve(__dirname, 'Company/About Insightis.html'),
        'contacts':               resolve(__dirname, 'Company/Contacts.html'),
        'press-media':            resolve(__dirname, 'Company/Press Media.html'),
        'success-stories':        resolve(__dirname, 'Company/Success Stories.html'),
        'cookie-settings':        resolve(__dirname, 'Security/Cookie Settings.html'),
        'privacy':                resolve(__dirname, 'Security/Privacy.html'),
        'security':               resolve(__dirname, 'Security/Security.html'),
        'terms':                  resolve(__dirname, 'Security/Terms.html'),
        'blog':                   resolve(__dirname, 'blog/index.html'),
        'docs':                   resolve(__dirname, 'docs/index.html'),
      }
    }
  }
})
