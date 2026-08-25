import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
  // Required for GitHub Pages project site: https://thekisoboqo.github.io/StaticFund-Energy-app/
  base: '/StaticFund-Energy-app/',
  plugins: [preact()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'preact-vendor': ['preact', 'preact/hooks'],
          'lucide-preact': ['lucide-preact']
        }
      }
    }
  }
})
