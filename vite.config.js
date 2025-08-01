import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',  // Serve from project root instead of examples/basic-viewer
  publicDir: 'public',
  server: {
    port: 5173,
    open: 'examples/basic-viewer/',  // Open the basic-viewer example by default
    cors: true
  },
  resolve: {
    alias: {
      '/models': '/models'
    }
  },
  build: {
    outDir: 'dist',
    cssCodeSplit: false, // Bundle all CSS into one file
    lib: {
      entry: 'src/index.js',
      name: 'BelowJS',
      fileName: (format) => `belowjs.${format}.js`
    },
    rollupOptions: {
      external: ['three'],
      output: {
        globals: {
          three: 'THREE'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'belowjs.css';
          }
          return '[name].[ext]';
        }
      }
    }
  }
});
