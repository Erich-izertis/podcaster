/// <reference types="vitest" />
/// <reference types="Vite/client" />

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src'
    }
  },
  server: {
    host: true,
    // you can replace this port with any port
    port: 5173, // This is the port which we will use in docker
    // add the next lines if you're using windows and hot reload doesn't work
    watch: {
      usePolling: true
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/setupTests.ts'],
  }
})
