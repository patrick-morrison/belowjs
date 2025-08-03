import { defineConfig } from 'vite';
import { exec } from 'child_process';

// Plugin to rebuild dist files when source changes
const autoBuildPlugin = () => {
  let isBuilding = false;
  
  return {
    name: 'auto-build',
    handleHotUpdate(ctx) {
      // Check if the changed file is in src/ and we're not already building
      if (ctx.file.includes('/src/') && !isBuilding) {
        isBuilding = true;
        console.log('Source file changed:', ctx.file.split('/').pop(), '- rebuilding...');
        
        exec('npm run build', (error, stdout, stderr) => {
          isBuilding = false;
          
          if (error) {
            console.error('Build error:', error);
            return;
          }
          if (stderr) {
            console.error('Build stderr:', stderr);
            return;
          }
          
          console.log('✅ Build completed successfully');
          
          // Force reload by updating a watched file
          ctx.server.ws.send({
            type: 'full-reload'
          });
        });
      }
      
      // Don't let Vite handle the hot update for src files since we're rebuilding
      if (ctx.file.includes('/src/')) {
        return [];
      }
    }
  };
};

export default defineConfig({
  root: '.',  // Serve from project root instead of examples/basic
  publicDir: 'public',
  plugins: [autoBuildPlugin()],
  server: {
    port: 5173,
    open: 'examples/basic/',  // Open the basic example by default
    cors: true,
    watch: {
      // Watch source files and built files
      include: ['src/**/*', 'dist/**/*', 'examples/**/*'],
      // Ignore node_modules
      ignored: ['**/node_modules/**', '**/.git/**']
    },
    // Force reload on file changes
    hmr: {
      overlay: false
    }
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
