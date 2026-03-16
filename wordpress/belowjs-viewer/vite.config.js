/**
 * Vite config for the BelowJS WordPress plugin.
 *
 * Bundles Three.js + BelowJS + the frontend init script into a single
 * self-contained file so the plugin has no external CDN dependencies.
 *
 * Run from the repo root:
 *   npm run build:wordpress
 */
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	build: {
		outDir: resolve( __dirname, 'dist' ),
		emptyOutDir: true,
		cssCodeSplit: false,
		lib: {
			entry: resolve( __dirname, 'src/frontend.js' ),
			formats: [ 'es' ],
			fileName: () => 'belowjs-viewer.js',
		},
		rollupOptions: {
			// Do NOT externalise three — bundle it so the plugin is self-contained.
			output: {
				assetFileNames: ( assetInfo ) => {
					if ( assetInfo.name && assetInfo.name.endsWith( '.css' ) ) {
						return 'belowjs-viewer.css';
					}
					return '[name].[ext]';
				},
			},
		},
	},
	resolve: {
		alias: {
			// Point bare 'belowjs' imports at the library source so vite can
			// tree-shake and bundle everything (including three) in one pass.
			belowjs: resolve( __dirname, '../../src/index.js' ),
		},
	},
});
