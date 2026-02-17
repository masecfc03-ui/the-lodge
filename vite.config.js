import { defineConfig } from 'vite'

export default defineConfig({
  base: '/the-lodge/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 3000,
    open: true
  },
  publicDir: 'public',
  // Serve the data directory as static files
  define: {
    __DATA_PATH__: JSON.stringify('/the-lodge/data/')
  }
})