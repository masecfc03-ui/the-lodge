import { defineConfig } from 'vite'

export default defineConfig({
  base: '/the-lodge/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ['phaser'],
          nipplejs: ['nipplejs']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})