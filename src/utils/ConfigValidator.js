/**
 * Configuration validation and merging utilities
 */

export const defaultConfig = {
  container: '#viewer-container',
  
  // Model configuration
  models: {},
  
  // Scene configuration
  scene: {
    background: 0x0a1a2a // Deep ocean blue
  },
  
  // Camera configuration
  camera: {
    fov: 65,
    near: 0.05,
    far: 2000,
    position: { x: 0, y: 5, z: 10 }
  },
  
  // Renderer configuration
  renderer: {
    antialias: true,
    powerPreference: 'high-performance',
    pixelRatio: Math.min(window.devicePixelRatio, 2.0),
    outputColorSpace: 'srgb',
    toneMapping: 'aces-filmic',
    toneMappingExposure: 1.0
  },
  
  // Controls configuration
  controls: {
    desktop: {
      enableDamping: true,
      dampingFactor: 0.08,
      maxDistance: 100,
      minDistance: 0.5,
      enableFocus: true
    }
  }
};

export function validateConfig(userConfig = {}) {
  // Merge user config with defaults
  const config = mergeDeep(defaultConfig, userConfig);
  
  // Basic validation
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
