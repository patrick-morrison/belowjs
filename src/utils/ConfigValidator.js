/**
 * Configuration validation and merging utilities
 */

export const defaultConfig = {
  container: '#viewer-container',
  

  models: {},
  

  scene: {
    background: 0x0a1a2a // Deep ocean blue
  },
  

  camera: {
    fov: 65,

ear: 0.05,
    far: 2000,
    position: { x: 0, y: 5, z: 10 }
  },
  

  renderer: {
    antialias: true,
    powerPreference: 'high-performance',
    pixelRatio: Math.min(window.devicePixelRatio, 2.0),
    outputColorSpace: 'srgb',
    toneMapping: 'none',
    toneMappingExposure: 1.0
  },
  

  controls: {
    desktop: {
      enableDamping: true,
      dampingFactor: 0.08,
      maxDistance: 100,
      minDistance: 0.5,
      enableFocus: true
    }
  },
  

  vr: {
    enabled: true,
    

    movement: {
      moveSpeed: 2.0,    // m/s base movement speed
      turnSpeed: 1.5,    // rad/s turn speed
      flySpeed: 1.0      // m/s vertical movement
    },
    

    ramping: {
      speedRampRate: 3.0,
      boostRampRate: 6.0
    },
    

    controllers: {
      leftHand: {
        movement: true,        // horizontal movement
        modeToggleButtons: [4, 5]  // X, Y buttons
      },
      rightHand: {
        turning: true,         // horizontal turning
        verticalMovement: true, // vertical movement
        modeToggleButtons: [4, 5]  // A, B buttons
      },
      gripBoostMultiplier: 3.0  // Original speed boost multiplier
    },
    

    optimization: {
      quest2RenderDistance: 20,  // Limit for Quest 2
      autoDetectDevice: true
    }
  }
};

export function validateConfig(userConfig = {}) {

  const config = mergeDeep(defaultConfig, userConfig);
  

  if (userConfig.container && typeof userConfig.container !== 'string') {
    throw new Error('Container must be a string selector or element ID');
  }
  
  return config;
}

export function mergeConfig(userConfig) {
  return mergeDeep(defaultConfig, userConfig || {});
}

export const ConfigValidator = {
  validate: validateConfig,
  mergeConfig,
  defaultConfig
};

function mergeDeep(target, source) {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = mergeDeep(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}
