/**
 * BelowJS WordPress front-end initialisation.
 *
 * This is the build entry point. Vite bundles Three.js, BelowJS (source),
 * and the BelowJS stylesheet into a single self-contained output.
 */
import '../../../src/styles/index.css';
import { ModelViewer } from 'belowjs';

document.querySelectorAll( '.belowjs-container[data-belowjs-config]' ).forEach( ( container ) => {
	const config = JSON.parse( container.dataset.belowjsConfig );

	const models = {
		model: {
			url: config.modelUrl,
			name: config.modelName,
			credit: config.credit,
			measurable: config.measurable,
			initialPositions: {
				desktop: {
					camera: { x: config.cameraX, y: config.cameraY, z: config.cameraZ },
					target: { x: config.targetX, y: config.targetY, z: config.targetZ },
				},
			},
		},
	};

	new ModelViewer( container, {
		models,
		autoLoadFirst: true,
		enableVR: config.enableVR,
		enableMeasurement: config.measurable,
		enableDiveSystem: config.diveMode,
		enableFullscreen: config.fullscreen,
		showInfo: false,
		showLoadingIndicator: true,
		enableVRAudio: false,
		viewerConfig: {
			scene: {
				background: { type: 'color', value: config.background },
				fog: { enabled: false },
			},
			camera: {
				fov: 65,
				near: 0.05,
				far: 2000,
			},
		},
	} );
} );
