import { ModelViewer } from '../../src/index.js';

// Model configuration
const models = {
  'key_biscayne': { 
    url: 'models/key_biscayne.glb', 
    name: 'Key Biscayne', 
    credit: 'WreckSploration',
    initialPositions: {
      desktop: {
        camera: { x: 33.494, y: 36.42, z: -83.442 },
        target: { x: -3.602, y: -6.611, z: -23.97 }
      },
      vr: {
        dolly: { x: 0, y: 2, z: 15 },
        rotation: { x: 0, y: 0, z: 0 }
      }
    }
  },
  'kxi': { 
    url: 'models/kxi.glb', 
    name: 'HNLMS K XI (1946)', 
    credit: 'WreckSploration',
    initialPositions: {
      desktop: {
        camera: { x: -6.391, y: 12.461, z: -42.105 },
        target: { x: 1.529, y: 0.088, z: -14.334 }
      },
      vr: {
        dolly: { x: 0, y: 2, z: 15 },
        rotation: { x: 0, y: 0, z: 0 }
      }
    }
  },
  'sesa': { 
    url: 'models/sesa.glb', 
    name: 'Sesa', 
    credit: 'WreckSploration',
    initialPositions: {
      desktop: {
        camera: { x: 18.93, y: 11.572, z: 52.508 },
        target: { x: -1.613, y: -8.088, z: 4.822 }
      },
      vr: {
        dolly: { x: 0, y: 2, z: 15 },
        rotation: { x: 0, y: 0, z: 0 }
      }
    }
  },
  'unknown': { 
    url: 'models/unknown.glb', 
    name: 'Unknown Wreck', 
    credit: 'WreckSploration',
    initialPositions: {
      desktop: {
        camera: { x: 34.226, y: 10.354, z: 2.12 },
        target: { x: 10.959, y: -1.07, z: 2.247 }
      },
      vr: {
        dolly: { x: 0, y: 2, z: 15 },
        rotation: { x: 0, y: 0, z: 0 }
      }
    }
  }
};

// Initialize the model viewer
const viewer = new ModelViewer(document.body, {
  models: models,
  autoLoadFirst: true,
  showLoadingIndicator: true,
  showStatus: true
});

// Optional: Set up custom event listeners
viewer.on('model-switched', ({ modelKey, model, config }) => {
  console.log(`Switched to model: ${config.name}`);
});

viewer.on('initialized', () => {
  console.log('ModelViewer ready!');
});

// Handle page cleanup
window.addEventListener('beforeunload', () => {
  viewer.dispose();
});
