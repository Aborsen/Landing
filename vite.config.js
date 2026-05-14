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
        'ai-chat':        resolve(__dirname, 'Platform/AI Chat.html'),
        'integrations':   resolve(__dirname, 'Platform/Integrations.html'),
        'semantic-layer': resolve(__dirname, 'Platform/Semantic Layer.html'),
      }
    }
  }
})
