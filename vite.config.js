import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Required for GitHub Pages project site: https://thekisoboqo.github.io/StaticFund-Energy-app/
  base: '/StaticFund-Energy-app/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'lucide-react': ['lucide-react']
        }
      }
    }
  }
})
