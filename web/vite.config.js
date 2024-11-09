import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // Development server configuration
  server: {
    // Port to run the development server on
    port: 3000,  // Common port for development 

    // Host configuration to allow access from all network interfaces (0.0.0.0)
    host: "0.0.0.0",

    // Proxy configuration to forward API requests during development
    proxy: {
      // Proxy all requests starting with '/api' to the backend server
      '/api/v1': {
        target: 'http://127.0.0.1:8080',  // Backend API server address (Fiber server in your case)
        changeOrigin: true,  // Adjusts the origin of the host header to match the target URL
        // logLevel: 'debug',  // Uncomment this for detailed proxy logs during development (optional)
      },
    },
  },  
})
