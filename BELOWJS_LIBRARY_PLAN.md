# BelowJS Library - Development Plan

**A modular Three.js library for creating immersive underwater/dive model viewers with VR support**

---

## ✅ CURRENT STATUS - Phase 1 Complete + Focus System Perfected

### COMPLETED FEATURES:
- ✅ **Core Architecture**: Modular system with BelowViewer, Scene, Camera, ModelLoader
- ✅ **ModelViewer API**: High-level viewer with dropdown, UI management, and configuration
- ✅ **Theme System**: Complete dark/light theme support with proper background colors
- ✅ **Model Management**: Loading, switching, centering, and positioning
- ✅ **UI Components**: Dropdown selector, info panel, loading indicators, status display
- ✅ **Focus System**: **PRODUCTION COMPLETE** ⭐ - Exact replica of original with optimized performance
- ✅ **Build System**: Vite dev server, proper asset serving, CSS/JS imports
- ✅ **Examples**: Basic viewer, light theme, clean minimal viewer
- ✅ **Configuration**: Flexible options for minimal or full-featured viewers
- ✅ **API Documentation**: Complete focus system documentation with technical details

### FOCUS SYSTEM ACHIEVEMENTS ⭐:
- 🎯 **Perfect Timing**: 300ms double-click detection (faster than browser default)
- 📏 **Exact Distance**: Maintains zoom level precisely like original
- 🎬 **Smooth Animation**: 1000ms ease-out cubic, identical behavior
- 🚫 **Smart Prevention**: Drag detection prevents accidental triggers
- ⚡ **Interruptible**: User input cancels animations naturally
- 🔧 **Event Handling**: Custom click detection bypasses OrbitControls conflicts
- 📋 **Production Ready**: Zero debug code, clean event management

### WORKING FEATURES:
- 🖥️ Desktop orbit controls with smooth damping
- 🎯 **Double-click focus**: **PRODUCTION READY** - 300ms detection, maintains zoom distance, interruptible
- 📱 Touch controls for mobile devices
- 🎨 Dark theme (default) and crisp light theme
- 📦 Model loading with progress tracking
- 🔄 Model switching with proper cleanup
- 🎛️ Optional UI components (info panel, status, dropdown)
- 📐 Model centering and camera positioning
- 🎮 **Programmatic camera control**: focusOn() and resetCamera() methods

### READY FOR NEXT PHASE:
- 🎮 VR integration and controller support
- 🔊 Spatial audio system
- 📏 Measurement tools (VR/desktop)
- 💡 Lighting mode switching (Survey/Dive)
- ⚡ Performance optimizations
- 🧪 Testing framework

---

## 🎯 NEXT SESSION PRIORITIES

### HIGH PRIORITY:
1. **🎮 VR Support** - WebXR integration with controller handling and smooth locomotion
2. **🔊 Audio System** - Spatial audio, movement sounds, and underwater ambience
3. **💡 Lighting Modes** - Survey/Dive mode switching with particle effects
4. **⚡ Performance** - Device detection, Quest optimizations, and GPU particles
5. **� Measurement Tools** - VR/desktop precision measurement system

### MEDIUM PRIORITY:
6. **📏 Measurement System** - Precision measurement tools
7. **🔧 Error Handling** - Robust validation and fallbacks
8. **📱 Mobile Polish** - Touch optimization and responsive design
9. **🧪 Testing** - Unit and integration tests
10. **📖 Advanced Examples** - Complex usage scenarios

---

## Overview

BelowJS is a comprehensive refactoring of the WreckSploration VR application into a reusable, modular library. The library provides building blocks for creating sophisticated 3D model viewers with underwater effects, dual lighting modes, VR support, spatial audio, and advanced performance optimizations.

## Current Features Analysis

### Core Systems Identified
- **Dual Mode System**: Survey (bright studio lighting) vs Dive (atmospheric underwater)
- **GPU Particle System**: High-performance underwater sediment particles
- **VR Controller Integration**: Hand tracking, spotlight control, smooth locomotion
- **Spatial Audio System**: Movement sounds, ambient audio, Web Audio API
- **Precision Measurement System**: VR/desktop unified measurement with state sharing
- **Device Optimization**: Quest 2/3 specific performance tuning
- **Material Processing**: Automatic cleanup of embedded lights and materials
- **Progressive Model Loading**: Multi-format support (GLTF, Draco, KTX2, Meshopt)
- **Responsive Controls**: Desktop orbit controls with focus system
- **PWA Integration**: Service worker, install prompts, offline support

---

## Phase 1: Core Architecture & Module Structure

```
belowjs/
├── src/
│   ├── core/
│   │   ├── BelowViewer.js       # Main viewer class
│   │   ├── Scene.js             # Scene management
│   │   ├── Camera.js            # Camera & controls
│   │   └── Renderer.js          # WebGL renderer setup
│   ├── models/
│   │   ├── ModelLoader.js       # GLTF loading with optimizations
│   │   ├── ModelManager.js      # Model switching & management
│   │   └── MaterialProcessor.js # Material cleaning & optimization
│   ├── lighting/
│   │   ├── LightingSystem.js    # Lighting mode management
│   │   ├── StudioLighting.js    # Survey mode lighting
│   │   ├── DiveLighting.js      # Underwater lighting
│   │   └── Spotlight.js         # Controller spotlight system
│   ├── particles/
│   │   ├── ParticleSystem.js    # GPU-based particle system
│   │   ├── ParticleShaders.js   # Custom shaders
│   │   └── ParticleManager.js   # Bounds & optimization
│   ├── measurement/
│   │   ├── MeasurementSystem.js # Unified VR/desktop measurement
│   │   ├── MeasurementUI.js     # Measurement panel & display
│   │   ├── DistanceCalculator.js # Distance calculation & formatting
│   │   └── MeasurementSync.js   # State synchronization between modes
│   ├── audio/
│   │   ├── AudioSystem.js       # Web Audio management
│   │   ├── SpatialAudio.js      # 3D audio positioning
│   │   └── SoundEffects.js      # Movement & ambient sounds
│   ├── controls/
│   │   ├── VRControls.js        # VR movement & interaction
│   │   ├── DesktopControls.js   # Orbit controls & focus
│   │   └── ControllerSystem.js  # XR controller management
│   ├── optimization/
│   │   ├── DeviceDetection.js   # Quest/device optimization
│   │   ├── PerformanceMonitor.js # FPS & performance tracking
│   │   └── LODSystem.js         # Level of detail management
│   ├── ui/
│   │   ├── UIManager.js         # UI component management
│   │   ├── ModelSelector.js     # Model dropdown component
│   │   └── ModeToggle.js        # Survey/Dive mode toggle
│   └── utils/
│       ├── MathUtils.js         # Math & animation helpers
│       ├── EventSystem.js       # Event management
│       └── ConfigValidator.js   # Configuration validation
├── examples/
│   ├── basic-viewer/
│   ├── shipwreck-explorer/
│   └── custom-scene/
├── docs/
│   ├── api/
│   ├── guides/
│   └── examples/
├── tests/
├── dist/
└── package.json
```

---

## Phase 2: Core Classes Design

### BelowViewer (Main Entry Point)

```javascript
class BelowViewer {
  constructor(config = {}) {
    this.config = this.validateConfig(config);
    
    // Initialize core systems
    this.scene = new Scene(this.config.scene);
    this.camera = new Camera(this.config.camera);
    this.renderer = new Renderer(this.config.renderer);
    
    // Initialize feature systems
    this.modelManager = new ModelManager(this.config.models);
    this.lightingSystem = new LightingSystem(this.config.lighting);
    this.particleSystem = new ParticleSystem(this.config.particles);
    this.audioSystem = new AudioSystem(this.config.audio);
    this.controls = new ControllerSystem(this.config.controls);
    this.measurementSystem = new MeasurementSystem(this.config.measurement);
    this.ui = new UIManager(this.config.ui);
    
    // Initialize optimization systems
    this.deviceDetection = new DeviceDetection();
    this.performanceMonitor = new PerformanceMonitor();
    
    this.init();
  }
  
  // Public API methods
  async loadModel(modelKey) { /* ... */ }
  setMode(mode) { /* Survey/Dive mode switching */ }
  enableVR() { /* VR session management */ }
  focusOn(point) { /* Camera focus animation */ }
  addMeasurementPoint(position) { /* Add measurement point */ }
  clearMeasurements() { /* Clear all measurements */ }
  getMeasurementDistance() { /* Get current measurement distance */ }
  dispose() { /* Cleanup and resource disposal */ }
  
  // Event system
  on(event, callback) { /* ... */ }
  off(event, callback) { /* ... */ }
  emit(event, data) { /* ... */ }
}
```

### Configuration System

```javascript
const defaultConfig = {
  container: '#viewer-container',
  
  // Model configuration
  models: {
    'example-model': {
      url: 'models/example.glb',
      name: 'Example Model',
      credit: 'Creator Name',
      initialPositions: {
        desktop: {
          camera: { x: 10, y: 5, z: 15 },
          target: { x: 0, y: 0, z: 0 }
        },
        vr: {
          dolly: { x: 0, y: 2, z: 10 },
          rotation: { x: 0, y: 0, z: 0 }
        }
      }
    }
  },
  
  // Lighting system configuration
  lighting: {
    modes: ['survey', 'dive'],
    defaultMode: 'survey',
    survey: {
      ambient: { color: 0xffffff, intensity: 0.5 },
      directional: { color: 0xffffff, intensity: 0.72 },
      hemisphere: { skyColor: 0xffffff, groundColor: 0xcccccc, intensity: 0.6 }
    },
    dive: {
      ambient: { color: 0x1a3b5c, intensity: 0.005 },
      fog: { color: 0x041729, density: 0.056 }
    },
    spotlight: {
      beamWidth: 35,
      intensity: 2.5,
      distance: 15,
      enableShadows: true
    }
  },
  
  // Particle system configuration
  particles: {
    enabled: true,
    count: 'auto', // or specific number
    behavior: 'underwater',
    bounds: 'auto', // or custom bounds
    shader: 'default' // or custom shader
  },
  
  // Audio system configuration
  audio: {
    enabled: true,
    sounds: {
      movement: 'sounds/dpv.ogg',
      movementHigh: 'sounds/dpvhigh.ogg',
      ambient: 'sounds/underwater.ogg'
    },
    spatialAudio: true,
    volume: {
      master: 1.0,
      movement: 1.52,
      boost: 1.01,
      ambient: 0.1
    }
  },
  
  // Control system configuration
  controls: {
    desktop: {
      enableFocus: true,
      dampingFactor: 0.08,
      maxDistance: 100,
      minDistance: 0.5
    },
    vr: {
      moveSpeed: 2.0,
      turnSpeed: 1.5,
      flySpeed: 1.0,
      enableSpeedBoost: true,
      boostMultiplier: 3.0
    }
  },
  
  // Optimization configuration
  optimization: {
    autoDetectDevice: true,
    questOptimizations: true,
    performanceMonitoring: true,
    adaptiveQuality: true
  },
  
  // Measurement system configuration
  measurement: {
    enabled: true,
    maxPoints: 2,
    sphereSize: 0.02, // 2cm radius for VR
    desktopSphereSize: 0.04, // 4cm radius for desktop
    lineWidth: 3, // pixels
    showDistanceLabel: true,
    distanceUnits: 'meters', // 'meters', 'feet', 'centimeters'
    precision: 2, // decimal places
    syncBetweenModes: true, // sync measurements between VR/desktop
    ui: {
      panelPosition: 'bottom-right',
      showToggleButton: true,
      pulseAnimation: true,
      clickToEnable: true
    },
    colors: {
      sphere: 0xffffff,
      ghostSphere: { color: 0xffffff, opacity: 0.2 },
      line: 0xffffff,
      lineOpacity: 0.8
    }
  },
  
  // UI configuration
  ui: {
    showModelSelector: true,
    showModeToggle: true,
    showVRButton: true,
    showCredits: true,
    theme: 'dark'
  }
};
```

---

## Phase 3: Module Implementation Strategy

### 1. Scene Management
**File: `src/core/Scene.js`**
- Scene setup and configuration
- Background and environment management
- Fog system for atmospheric effects
- Scene graph organization

### 2. Model System
**Files: `src/models/`**
- **ModelLoader.js**: GLTF loading with Draco, KTX2, Meshopt support
- **ModelManager.js**: Model switching, caching, and lifecycle management
- **MaterialProcessor.js**: Automatic material cleanup and optimization

Key features:
- Progress tracking for model loading
- Material cleaning pipeline (remove embedded lights, emissive materials)
- Bounds calculation for particle systems
- Initial position management
- Shadow and lighting optimization

### 3. Lighting System
**Files: `src/lighting/`**

```javascript
class LightingSystem {
  constructor(config) {
    this.config = config;
    this.modes = new Map();
    this.currentMode = null;
    
    // Initialize lighting modes
    this.modes.set('survey', new StudioLighting(config.survey));
    this.modes.set('dive', new DiveLighting(config.dive));
    
    // Initialize spotlight system
    this.spotlight = new Spotlight(config.spotlight);
  }
  
  setMode(mode) {
    if (this.currentMode) {
      this.currentMode.disable();
    }
    
    this.currentMode = this.modes.get(mode);
    if (this.currentMode) {
      this.currentMode.enable();
    }
    
    // Update spotlight visibility based on mode
    this.spotlight.setVisible(mode === 'dive');
  }
  
  updateSpotlight(position, direction) {
    this.spotlight.update(position, direction);
  }
}
```

### 4. Particle System
**Files: `src/particles/`**

Features:
- GPU-based particle animation using custom shaders
- Dynamic particle count based on model bounds
- Boundary management and wrapping
- Fog integration
- Performance optimization for Quest devices

### 5. Measurement System
**Files: `src/measurement/`**

```javascript
class MeasurementSystem {
  constructor(config) {
    this.config = config;
    this.enabled = config.enabled;
    this.maxPoints = config.maxPoints || 2;
    this.measurementPoints = [];
    this.ghostSpheres = {};
    this.measurementLine = null;
    this.measurementDisplay = null;
    this.ui = new MeasurementUI(config.ui);
    this.sync = new MeasurementSync();
  }
  
  addPoint(position, mode = 'vr') {
    if (this.measurementPoints.length >= this.maxPoints) {
      this.removeOldestPoint();
    }
    
    const point = this.createMeasurementPoint(position, mode);
    this.measurementPoints.push(point);
    
    if (this.measurementPoints.length === 2) {
      this.createMeasurementLine();
      this.updateDistanceDisplay();
    }
    
    this.emit('pointAdded', { point, totalPoints: this.measurementPoints.length });
  }
  
  clearMeasurements() {
    this.measurementPoints.forEach(point => this.scene.remove(point));
    this.measurementPoints = [];
    
    if (this.measurementLine) {
      this.scene.remove(this.measurementLine);
      this.measurementLine = null;
    }
    
    this.ui.updatePanel({ hasPoints: false });
    this.emit('measurementsCleared');
  }
  
  syncBetweenModes(fromMode, toMode) {
    if (!this.config.syncBetweenModes) return;
    
    return this.sync.convertMeasurements(
      this.measurementPoints,
      fromMode,
      toMode
    );
  }
  
  getDistance() {
    if (this.measurementPoints.length !== 2) return null;
    
    return this.measurementPoints[0].position.distanceTo(
      this.measurementPoints[1].position
    );
  }
}
```

Features:
- **Unified VR/Desktop Interface**: Single system handles both input modes
- **State Synchronization**: Measurements persist when switching between VR/desktop
- **Interactive UI Panel**: Toggle measurement mode, show distance, point count
- **Precise Distance Calculation**: Configurable units and precision
- **Visual Feedback**: Ghost spheres in VR, thick lines with pulse animation
- **Controller Integration**: Y button toggle in VR, trigger placement, grip boost
- **Desktop Click Placement**: Click-to-place with drag detection
- **Automatic Cleanup**: Remove oldest points when exceeding maximum

### 6. Audio System
**Files: `src/audio/`**

```javascript
class AudioSystem {
  constructor(config) {
    this.context = null;
    this.sounds = new Map();
    this.spatialAudio = new SpatialAudio();
    this.config = config;
  }
  
  async init() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    await this.loadSounds();
  }
  
  playMovementSound(speed, boost) {
    // Implement ramped movement audio
  }
  
  playAmbientSound() {
    // Implement looping ambient audio
  }
  
  setListenerPosition(position, orientation) {
    // Update spatial audio listener
  }
}
```

### 7. Control Systems
**Files: `src/controls/`**
- **VRControls.js**: VR locomotion, controller input, button handling
- **DesktopControls.js**: Orbit controls, focus system, mouse interaction
- **ControllerSystem.js**: XR controller management and event handling

---

## Detailed Measurement System Architecture

The measurement system is one of the most sophisticated features, providing seamless measurement capabilities across VR and desktop modes with shared state.

### MeasurementSystem Class Structure

```javascript
class MeasurementSystem extends EventEmitter {
  constructor(scene, camera, renderer, config = {}) {
    super();
    
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.config = this.mergeConfig(config);
    
    // State management
    this.enabled = this.config.enabled;
    this.measurementPoints = [];
    this.maxPoints = this.config.maxPoints;
    
    // VR-specific components
    this.ghostSpheres = { left: null, right: null };
    this.controllerStates = new Map();
    
    // Desktop-specific components
    this.desktopMode = false;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    
    // Visual components
    this.measurementLine = null;
    this.measurementSprite = null;
    this.lineMaterials = {
      vr: new LineMaterial({ /* VR line config */ }),
      desktop: new LineMaterial({ /* Desktop line config */ })
    };
    
    // UI components
    this.measurementPanel = new MeasurementUI(this.config.ui);
    this.distanceCalculator = new DistanceCalculator(this.config);
    this.synchronizer = new MeasurementSync();
    
    this.init();
  }
  
  init() {
    this.createGhostSpheres();
    this.setupEventListeners();
    this.measurementPanel.create();
    this.updateUI();
  }
  
  // VR measurement methods
  enableVRMeasurement() {
    this.enabled = true;
    this.showGhostSpheres();
    this.updateUI();
  }
  
  disableVRMeasurement() {
    this.enabled = false;
    this.hideGhostSpheres();
    this.clearMeasurements();
    this.updateUI();
  }
  
  updateGhostSpheres(controllers) {
    if (!this.enabled) return;
    
    ['left', 'right'].forEach(hand => {
      const controller = controllers[hand];
      const ghostSphere = this.ghostSpheres[hand];
      
      if (controller && ghostSphere) {
        controller.getWorldPosition(ghostSphere.position);
        ghostSphere.visible = true;
        
        // Handle trigger input
        this.handleControllerInput(controller, hand);
      }
    });
  }
  
  handleControllerInput(controller, hand) {
    const session = this.renderer.xr.getSession();
    if (!session) return;
    
    // Find input source for this controller
    const inputSource = session.inputSources.find(src => 
      src.handedness === hand && src.gamepad
    );
    
    if (!inputSource) return;
    
    const gamepad = inputSource.gamepad;
    const triggerButton = gamepad.buttons[0];
    const yButton = gamepad.buttons[3]; // Y button for toggle
    
    // Handle Y button toggle (right controller only)
    if (hand === 'right' && yButton) {
      this.handleYButtonToggle(yButton.pressed);
    }
    
    // Handle trigger for point placement
    if (triggerButton) {
      this.handleTriggerInput(triggerButton.pressed, hand);
    }
  }
  
  handleTriggerInput(pressed, hand) {
    const stateKey = `trigger-${hand}`;
    const wasPressed = this.controllerStates.get(stateKey) || false;
    
    // Trigger just released - place point
    if (!pressed && wasPressed) {
      const position = this.ghostSpheres[hand].position.clone();
      this.addMeasurementPoint(position, 'vr');
    }
    
    this.controllerStates.set(stateKey, pressed);
  }
  
  // Desktop measurement methods
  enableDesktopMeasurement() {
    this.desktopMode = true;
    this.updateUI();
  }
  
  disableDesktopMeasurement() {
    this.desktopMode = false;
    this.clearMeasurements();
    this.updateUI();
  }
  
  handleDesktopClick(event) {
    if (!this.desktopMode || this.renderer.xr.isPresenting) return;
    
    // Calculate mouse position
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Raycast to find intersection
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);
    
    // Filter out measurement objects
    const validIntersects = intersects.filter(intersect => 
      !this.isMeasurementObject(intersect.object)
    );
    
    if (validIntersects.length > 0) {
      const position = validIntersects[0].point;
      this.addMeasurementPoint(position, 'desktop');
    }
  }
  
  // Core measurement methods
  addMeasurementPoint(position, mode = 'vr') {
    // Remove oldest point if at max capacity
    if (this.measurementPoints.length >= this.maxPoints) {
      this.removeOldestPoint();
    }
    
    // Create sphere at position
    const sphere = this.createMeasurementSphere(position, mode);
    this.measurementPoints.push(sphere);
    this.scene.add(sphere);
    
    // Update measurement line and display
    this.updateMeasurementLine(mode);
    this.updateDistanceDisplay();
    this.updateUI();
    
    // Emit event
    this.emit('pointAdded', {
      position: position.clone(),
      totalPoints: this.measurementPoints.length,
      mode
    });
    
    // If we have 2 points, emit measurement complete
    if (this.measurementPoints.length === 2) {
      const distance = this.getDistance();
      this.emit('measurementCompleted', {
        distance,
        points: this.measurementPoints.map(p => p.position.clone()),
        mode
      });
    }
  }
  
  updateMeasurementLine(mode) {
    // Remove existing line
    if (this.measurementLine) {
      this.scene.remove(this.measurementLine);
      this.measurementLine = null;
    }
    
    // Create new line if we have 2 points
    if (this.measurementPoints.length === 2) {
      const geometry = new LineGeometry();
      const positions = [];
      
      this.measurementPoints.forEach(point => {
        positions.push(point.position.x, point.position.y, point.position.z);
      });
      
      geometry.setPositions(positions);
      
      const material = this.lineMaterials[mode].clone();
      this.measurementLine = new Line2(geometry, material);
      this.measurementLine.computeLineDistances();
      
      this.scene.add(this.measurementLine);
    }
  }
  
  // Mode synchronization
  syncToVRMode() {
    return this.synchronizer.convertToVR(this.measurementPoints);
  }
  
  syncToDesktopMode() {
    return this.synchronizer.convertToDesktop(this.measurementPoints);
  }
  
  // State management
  getDistance() {
    if (this.measurementPoints.length !== 2) return null;
    
    return this.distanceCalculator.calculate(
      this.measurementPoints[0].position,
      this.measurementPoints[1].position
    );
  }
  
  clearMeasurements() {
    // Remove all spheres
    this.measurementPoints.forEach(sphere => this.scene.remove(sphere));
    this.measurementPoints = [];
    
    // Remove line
    if (this.measurementLine) {
      this.scene.remove(this.measurementLine);
      this.measurementLine = null;
    }
    
    // Hide distance display
    if (this.measurementSprite) {
      this.measurementSprite.visible = false;
    }
    
    this.updateUI();
    this.emit('measurementsCleared');
  }
  
  // Utility methods
  createMeasurementSphere(position, mode) {
    const size = mode === 'vr' ? this.config.sphereSize : this.config.desktopSphereSize;
    const geometry = new THREE.SphereGeometry(size, 8, 6);
    const material = new THREE.MeshBasicMaterial({ color: this.config.colors.sphere });
    
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.copy(position);
    sphere.userData.isMeasurementSphere = true;
    
    return sphere;
  }
  
  isMeasurementObject(object) {
    return object.userData.isMeasurementSphere || 
           object === this.measurementLine ||
           Object.values(this.ghostSpheres).includes(object);
  }
  
  dispose() {
    this.clearMeasurements();
    this.measurementPanel.dispose();
    this.removeAllListeners();
  }
}
```

### Key Features Implementation

1. **Unified State Management**: Single source of truth for measurement points
2. **Mode Synchronization**: Seamless transition between VR and desktop
3. **Interactive UI**: Real-time panel updates with measurement status
4. **Visual Feedback**: Ghost spheres, pulsing lines, distance labels
5. **Event System**: Comprehensive events for integration
6. **Performance Optimized**: Efficient rendering and memory management

---

## Phase 4: API Design

### Simple Usage

```javascript
import { BelowViewer } from 'belowjs';

// Minimal setup
const viewer = new BelowViewer({
  container: '#my-viewer',
  models: {
    'shipwreck': {
      url: 'models/wreck.glb',
      name: 'Historic Shipwreck'
    }
  }
});

// Load and display model
await viewer.loadModel('shipwreck');
```

### Advanced Usage

```javascript
import { BelowViewer } from 'belowjs';

// Full configuration
const viewer = new BelowViewer({
  container: '#advanced-viewer',
  
  models: {
    'wreck-1': { url: 'models/wreck1.glb', name: 'Titanic' },
    'wreck-2': { url: 'models/wreck2.glb', name: 'Lusitania' }
  },
  
  lighting: {
    modes: ['survey', 'dive', 'studio'],
    defaultMode: 'survey',
    spotlight: {
      beamWidth: 30,
      distance: 20,
      intensity: 3.0
    }
  },
  
  particles: {
    count: 5000,
    behavior: 'custom',
    shader: customParticleShader
  },
  
  audio: {
    spatialAudio: true,
    customSounds: {
      movement: 'custom/movement.ogg',
      ambient: 'custom/ambient.ogg'
    }
  },
  
  controls: {
    vr: { customMovement: true },
    desktop: { focusAnimation: true }
  }
});

// Event handling
viewer.on('modelLoaded', (model) => {
  console.log('Model loaded:', model.name);
});

viewer.on('modeChanged', (mode) => {
  console.log('Lighting mode changed to:', mode);
});

viewer.on('measurementCompleted', (distance) => {
  console.log('Distance measured:', distance, 'meters');
});

viewer.on('vrSessionStart', () => {
  console.log('VR session started');
});

// Method chaining
await viewer
  .loadModel('wreck-1')
  .setMode('dive')
  .enableMeasurement()
  .enableVR();
```

### Component-Based Usage

```javascript
// Use individual components
import { 
  ParticleSystem, 
  LightingSystem, 
  AudioSystem,
  MeasurementSystem 
} from 'belowjs';

// Create custom particle system
const particles = new ParticleSystem({
  count: 3000,
  bounds: customBounds,
  shader: customShader
});

// Create custom lighting
const lighting = new LightingSystem({
  modes: ['day', 'night', 'underwater']
});

// Create measurement system
const measurement = new MeasurementSystem({
  maxPoints: 3,
  units: 'feet',
  precision: 3,
  colors: { sphere: 0xff0000, line: 0x00ff00 }
});

// Create audio system
const audio = new AudioSystem({
  spatialAudio: true,
  customSounds: soundLibrary
});
```

---

## Phase 5: Migration Strategy

### Step 1: Extract Core Systems (Weeks 1-2)
**Priority: Critical**

1. **Create main BelowViewer class**
   - Basic constructor and configuration
   - Scene, camera, renderer initialization
   - Event system foundation

2. **Extract scene management**
   - Scene setup and background
   - Basic fog management
   - Camera and renderer configuration

3. **Implement basic model loading**
   - GLTF loader setup with extensions
   - Basic model switching
   - Progress tracking

4. **Create simple test example**
   - Basic HTML page
   - Single model loading
   - Verify core functionality

### Step 2: Lighting & Visual Systems (Weeks 3-4)
**Priority: High**

1. **Extract lighting mode system**
   - Survey/Dive mode switching
   - Lighting transitions and animations
   - Fog system integration

2. **Implement GPU particle system**
   - Custom shader implementation
   - Bounds management
   - Performance optimization

3. **Create material processing pipeline**
   - Material cleaning and optimization
   - Shadow system setup
   - Texture handling

4. **Add atmosphere management**
   - Fog density calculation
   - Device-specific optimizations
   - Visual quality scaling

### Step 3: Interaction Systems (Weeks 5-6)
**Priority: High**

1. **Extract VR controller system**
   - Controller detection and management
   - Movement and locomotion
   - Button input handling

2. **Implement desktop controls**
   - Orbit controls with damping
   - Focus system and animations
   - Mouse interaction handling

3. **Create audio system**
   - Web Audio API integration
   - Spatial audio positioning
   - Movement sound system

4. **Implement measurement system**
   - VR controller point placement
   - Desktop click-to-measure
   - State synchronization between modes
   - Distance calculation and display

5. **Add device optimization**
   - Quest device detection
   - Performance scaling
   - Quality adaptation

### Step 4: UI & Configuration (Weeks 7-8)
**Priority: Medium**

1. **Create modular UI components**
   - Model selector component
   - Mode toggle component
   - VR button styling

2. **Implement configuration system**
   - Config validation and defaults
   - Runtime configuration updates
   - Type checking and validation

3. **Add comprehensive event system**
   - Event emitter pattern
   - Lifecycle events
   - Custom event support

4. **Create documentation framework**
   - API documentation
   - Usage examples
   - Migration guides

### Step 5: Examples & Testing (Weeks 9-10)
**Priority: Medium**

1. **Create multiple usage examples**
   - Basic viewer example
   - Advanced configuration example
   - Component-based example
   - Custom shader example

2. **Performance testing and optimization**
   - Benchmark different devices
   - Memory usage optimization
   - Loading time optimization

3. **Cross-platform compatibility testing**
   - Desktop browsers
   - Mobile devices
   - VR headsets (Quest 2/3, other WebXR devices)

4. **Documentation and API reference**
   - Complete API documentation
   - Tutorial series
   - Best practices guide

---

## Phase 6: Key Features to Preserve

### 1. Device Optimization
- **Quest 2/3 Detection**: Automatic device detection and performance tuning
- **Render Distance Scaling**: 20m for Quest 2, 2000m for others
- **Shadow Quality Adaptation**: Dynamic shadow map sizing
- **Fog Density Adjustment**: Device-appropriate fog settings

### 2. Dual Mode System
- **Survey Mode**: Bright studio lighting, no fog, no particles
- **Dive Mode**: Atmospheric underwater lighting, fog, particles
- **Smooth Transitions**: Animated transitions between modes
- **Controller Integration**: VR button support for mode switching

### 3. GPU Particle System
- **Custom Shaders**: Vertex and fragment shaders for particles
- **Dynamic Bounds**: Automatic particle boundary calculation
- **Performance Optimization**: 60fps target on Quest devices
- **Fog Integration**: Particle fog interaction

### 4. Spatial Audio
- **Movement Sounds**: Speed-ramped DPV sounds
- **Boost Audio**: High-speed movement audio
- **Ambient Sounds**: Looping underwater ambience
- **3D Positioning**: Spatial audio with Web Audio API

### 5. VR Controllers
- **Spotlight Control**: Right controller spotlight positioning
- **Smooth Locomotion**: Ramped movement with damping
- **Button Mapping**: X/A buttons for mode switching
- **Grip Controls**: Speed boost with controller grips

### 6. Material Processing
- **Embedded Light Removal**: Automatic cleanup of model lighting
- **Material Conversion**: Convert problematic materials to Lambert
- **Shadow Optimization**: Consistent shadow casting/receiving
- **Texture Preservation**: Maintain diffuse and normal maps

### 7. Focus System
- **Double-click Focus**: Desktop camera focus on clicked points
- **Smooth Animation**: Eased camera transitions
- **VR Cancellation**: Focus animation cancellation in VR
- **Raycast Integration**: Accurate mesh intersection

### 8. Progressive Loading
- **Loading Indicators**: Progress bars and status messages
- **Error Handling**: Graceful failure and retry mechanisms
- **Asset Optimization**: Draco, KTX2, Meshopt support
- **Caching Strategy**: Efficient asset caching

### 9. Precision Measurement System
- **VR Point Placement**: Trigger-based point placement with visual feedback
- **Desktop Click-to-Measure**: Click intersection points with drag detection
- **State Synchronization**: Measurements persist when switching VR/desktop modes
- **Interactive UI Panel**: Toggle measurement mode, show distance and point count
- **Multiple Units**: Support for meters, feet, centimeters with configurable precision
- **Visual Feedback**: Ghost spheres in VR, thick pulsing lines, distance sprites
- **Controller Integration**: Y button toggle, trigger placement, grip speed boost
- **Smart Cleanup**: Automatic removal of oldest points when exceeding maximum

### 10. Responsive Design
- **Mobile Adaptation**: Touch-friendly controls
- **Desktop Optimization**: Full feature set
- **VR Mode**: Complete VR experience
- **UI Scaling**: Responsive interface elements

---

## Phase 7: Extension Points

### 1. Custom Shaders
```javascript
// Plugin system for particle shaders
viewer.particles.setCustomShader({
  vertex: customVertexShader,
  fragment: customFragmentShader,
  uniforms: customUniforms
});

// Material shader customization
viewer.models.setMaterialProcessor((material) => {
  // Custom material processing
  return processedMaterial;
});
```

### 2. Custom Controls
```javascript
// Extensible input handling
viewer.controls.addCustomHandler('gamepad', (input) => {
  // Custom gamepad handling
});

// Custom movement patterns
viewer.controls.vr.setMovementPattern('custom', {
  update: (delta, input) => {
    // Custom VR movement
  }
});
```

### 3. Audio Plugins
```javascript
// Custom audio effects
viewer.audio.addEffect('reverb', customReverbEffect);

// Audio processing pipeline
viewer.audio.setProcessor('movement', (audioBuffer) => {
  // Custom audio processing
  return processedBuffer;
});
```

### 7. Measurement Plugins
```javascript
// Custom measurement tools
viewer.measurement.addTool('area', customAreaTool);
viewer.measurement.addTool('angle', customAngleTool);

// Custom distance formatting
viewer.measurement.setFormatter('imperial', (distance) => {
  const feet = Math.floor(distance * 3.28084);
  const inches = Math.round((distance * 3.28084 - feet) * 12);
  return `${feet}' ${inches}"`;
});

// Custom measurement validation
viewer.measurement.setValidator((points) => {
  // Custom validation logic
  return points.length >= 2 && points.length <= 5;
});
```

### 8. Model Processors
```javascript
// Custom model cleaning
viewer.models.addProcessor('custom', (gltf) => {
  // Custom model processing
  return processedGLTF;
});

// LOD system integration
viewer.models.setLODStrategy('adaptive', customLODStrategy);
```

### 9. UI Themes
```javascript
// Custom UI styling
viewer.ui.setTheme('custom', {
  colors: { /* ... */ },
  fonts: { /* ... */ },
  components: { /* ... */ }
});

// Custom UI components
viewer.ui.addComponent('custom-panel', CustomPanelComponent);
```

### 10. Performance Hooks
```javascript
// Custom optimization strategies
viewer.optimization.addStrategy('custom', {
  shouldOptimize: (metrics) => boolean,
  optimize: (scene) => void
});

// Performance monitoring
viewer.on('performance', (metrics) => {
  // Custom performance handling
});
```

---

## Development Guidelines

### Code Quality Standards
- **TypeScript**: Full TypeScript support with type definitions
- **ESLint**: Consistent code style and linting
- **Testing**: Unit tests with Jest, integration tests
- **Documentation**: JSDoc comments for all public APIs

### Performance Requirements
- **60fps Target**: Maintain 60fps on Quest 2 devices
- **Memory Efficiency**: Proper resource cleanup and disposal
- **Loading Speed**: Fast initial load and model switching
- **Bundle Size**: Keep library size reasonable for web use

### Browser Compatibility
- **Modern Browsers**: Chrome 90+, Firefox 90+, Safari 14+
- **WebXR Support**: Quest 2/3, Pico, Vive, Index
- **Mobile Support**: iOS Safari, Android Chrome
- **Progressive Enhancement**: Graceful degradation

### API Design Principles
- **Simplicity**: Easy to use for basic cases
- **Flexibility**: Powerful configuration for advanced use
- **Consistency**: Predictable API patterns
- **Extensibility**: Plugin system for customization

---

## Success Metrics

### Technical Metrics
- **Performance**: 60fps on target devices
- **Bundle Size**: <2MB gzipped
- **Loading Time**: <3s for typical models
- **Memory Usage**: <500MB on Quest 2

### Adoption Metrics
- **Ease of Use**: <10 lines for basic setup
- **Documentation**: Complete API coverage
- **Examples**: 5+ working examples
- **Community**: GitHub stars, issues, contributions

### Feature Completeness
- **Core Features**: 100% feature parity with original
- **New Features**: Enhanced modularity and extensibility
- **Cross-Platform**: Works on all target devices
- **Backwards Compatibility**: Migration path from original

---

## Timeline Summary

| Phase | Duration | Deliverables |
|-------|----------|-------------|
| 1. Architecture | 1-2 weeks | Module structure, core classes |
| 2. Core Systems | 2-3 weeks | Scene, models, basic functionality |
| 3. Visual Systems | 2-3 weeks | Lighting, particles, materials |
| 4. Interaction | 2-3 weeks | VR/desktop controls, audio |
| 5. UI & Config | 2 weeks | Components, validation, events |
| 6. Testing & Docs | 2 weeks | Examples, tests, documentation |

**Total Estimated Time: 10-12 weeks**

---

## Next Steps

1. **Set up project structure** and build system
2. **Create basic BelowViewer class** with configuration
3. **Extract scene management** from current implementation
4. **Implement model loading system** with progress tracking
5. **Begin modular architecture** with proper separation of concerns

This plan provides a solid foundation for creating a professional, reusable library while preserving all the sophisticated features of your current implementation.
