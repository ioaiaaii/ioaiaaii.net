// Import necessary modules from Node.js and Vite
import { fileURLToPath, URL } from 'node:url';  // Allows file system manipulation based on URL paths
import { defineConfig } from 'vite';  // Helper function to define Vite configuration
import vue from '@vitejs/plugin-vue';  // Vite plugin to enable support for Vue.js single-file components (SFCs)

// Export Vite configuration
export default defineConfig({
  // Plugins section: Adds support for Vue SFCs
  plugins: [
    vue(),  // Enables Vue.js SFCs and features like template compilation
  ],

  // Module resolution configuration
  resolve: {
    alias: {
      // Creates '@' alias for the './src' directory to simplify imports
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // Development server configuration
  server: {
    // Port to run the development server on. Changed to 3000 for development convenience
    port: 3000,  // Common port for development (avoid port 80 to prevent permission issues)

    // Host configuration to allow access from all network interfaces (0.0.0.0)
    host: "0.0.0.0",  // Allows LAN access (useful for testing on mobile devices or other computers on the network)

    // Proxy configuration to forward API requests during development
    proxy: {
      // Proxy all requests starting with '/api' to the backend server
      '/api': {
        target: 'http://127.0.0.1:8080',  // Backend API server address (Fiber server in your case)
        changeOrigin: true,  // Adjusts the origin of the host header to match the target URL
        // No rewrite since your API paths already start with '/api'
        // logLevel: 'debug',  // Uncomment this for detailed proxy logs during development (optional)
      },
    },
  },

  // Build configuration for production
  build: {
    // Output directory for production build files
    outDir: './dist',  // Output directory for production build
    // Optional: You can enable source maps for easier debugging in production (commented out here)
    // sourcemap: true,  // Useful for debugging production issues, but be cautious as source maps expose code structure
  },

  // Additional configurations can go here, like customizing optimization settings, CSS processing, etc.
});
