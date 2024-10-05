import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Disable source maps for faster builds
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Separate vendor chunk for React
        },
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext', // Ensure esbuild uses modern syntax for faster builds
    },
  },
  server: {
    open: true, // Automatically open the browser on server start
    hmr: {
      overlay: false, // Disable HMR overlay to reduce console noise
    },
  },
  cacheDir: 'node_modules/.vite', // Ensure caching is enabled
})
