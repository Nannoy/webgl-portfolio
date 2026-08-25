import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  server: {
    open: '/',
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: { main: 'index.html' },
    },
  },
})
