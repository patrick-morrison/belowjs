# BelowJS API Documentation

**A comprehensive guide to the BelowJS 3D model viewer library with VR support and underwater exploration features**

*Version 0.1.3*

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [ModelViewer Class](#modelviewer-class)
3. [VR Support](#vr-support)
4. [Measurement System](#measurement-system)
5. [Dive System](#dive-system)
6. [VR Comfort Glyph](#vr-comfort-glyph)
7. [Fullscreen Button](#fullscreen-button)
8. [Configuration Options](#configuration-options)
9. [Events](#events)
10. [Methods](#methods)
11. [Theming](#theming)
12. [Examples](#examples)
13. [Advanced Usage](#advanced-usage)

---

## Quick Start

### Production Usage (All Examples Use This)

BelowJS examples use ES modules with production CSS for optimal performance:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My 3D Viewer</title>
    
    <!-- BelowJS Production CSS Bundle -->
    <link rel="stylesheet" href="/dist/belowjs.css">
</head>
<body>
    <script type="module">
        import { ModelViewer } from '/dist/belowjs.es.js';
        
        const viewer = new ModelViewer(container, {
            models: models,
            enableVR: true,
            enableMeasurement: true,
            enableDiveSystem: true
        });
    </script>
</body>
</html>
```

### ES Module Import Pattern

This is the recommended approach used by all examples:

```javascript
import { ModelViewer } from '/src/index.js';

// Define your models with VR positioning
const models = {
  'my-model': {
    url: 'path/to/model.glb',
    name: 'My 3D Model',
    credit: 'Model Creator',
    initialPositions: {
      desktop: {
        camera: { x: 0, y: 5, z: 10 },
        target: { x: 0, y: 0, z: 0 }
      },
      vr: {
        dolly: { x: 0, y: 2, z: 15 },
        rotation: { x: 0, y: 0, z: 0 }
      }
    }
  }
};

// Create viewer container
const viewerContainer = document.createElement('div');
viewerContainer.style.position = 'fixed';
viewerContainer.style.inset = '0';
viewerContainer.style.zIndex = '0';
document.body.appendChild(viewerContainer);

// Create VR-enabled viewer
const viewer = new ModelViewer(viewerContainer, {
  models: models,
  autoLoadFirst: true,
  enableVR: true // Enable VR support
});

// VR event handling
viewer.on('vr-session-start', () => {
  console.log('VR session started');
});

viewer.on('vr-session-end', () => {
  console.log('VR session ended');
});
```

### Basic Setup without VR

```javascript
import { ModelViewer } from '/src/index.js';

const models = {
  'my-model': {
    url: 'path/to/model.glb',
    name: 'My 3D Model'
  }
};

const viewer = new ModelViewer(document.body, {
  models: models,
  autoLoadFirst: true,
  viewerConfig: {
    vr: { enabled: false } // Disable VR support
  }
});
```

---

## ModelViewer Class

The `ModelViewer` is the main high-level class for creating 3D model viewers with automatic UI management.

### Constructor

```javascript
new ModelViewer(container, options)
```

**Parameters:**
- `container` (Element | string): DOM element or selector for the viewer container
- `options` (Object): Configuration options object

The viewer injects its UI elements into the supplied `container`. When embedding the viewer inside another layout, ensure this container has `position: relative` so overlays like the measurement panel and model selector remain positioned correctly in fullscreen.

### Basic Example

```javascript
// Create viewer container
const container = document.getElementById('my-container');
const viewerContainer = document.createElement('div');
viewerContainer.style.width = '100%';
viewerContainer.style.height = '500px';
container.appendChild(viewerContainer);

const viewer = new ModelViewer(viewerContainer, {
  models: {
    'shipwreck': {
      url: 'models/wreck.glb',
      name: 'Historic Shipwreck',
      credit: 'Maritime Museum',
      initialPositions: {
        desktop: {
          camera: { x: 10, y: 5, z: 15 },
          target: { x: 0, y: 0, z: 0 }
        }
      }
    }
  },
  autoLoadFirst: true,
  showInfo: true
});
```

---

## VR Support

BelowJS includes comprehensive WebXR support with Quest-optimized controls and immersive VR navigation.

### VR Features

- **WebXR Compatible**: Works with Quest 2, Quest 3, and other WebXR headsets
- **Smooth Movement**: Thumbstick-based movement with speed ramping
- **Controller Integration**: Full controller support with haptic feedback
- **Automatic Optimization**: Device-specific performance optimizations
- **Mode Toggle**: Switch between Survey and Dive modes in VR
- **Original Patterns**: Preserves the exact VR feel from the original implementation

### VR Configuration

```javascript
const viewer = new ModelViewer(document.body, {
  models: models,
  viewerConfig: {
    vr: {
      enabled: true,             // Enable VR support
      
      // Movement settings (original patterns preserved)
      movement: {
        moveSpeed: 2.0,          // m/s base movement speed
        turnSpeed: 1.5,          // rad/s turn speed
        flySpeed: 1.0            // m/s vertical movement
      },
      
      // Smooth ramping for organic feel
      ramping: {
        speedRampRate: 3.0,      // Speed transition rate
        boostRampRate: 6.0       // Boost transition rate
      },
      
      // Controller configuration
      controllers: {
        leftHand: {
          movement: true,                // Horizontal movement
          modeToggleButtons: [4, 5]      // X, Y buttons
        },
        rightHand: {
          turning: true,                 // Horizontal turning
          verticalMovement: true,        // Vertical movement
          modeToggleButtons: [4, 5]      // A, B buttons
        },
        gripBoostMultiplier: 3.0         // 3x speed when gripping
      },
      
      // Quest optimizations
      optimization: {
        quest2RenderDistance: 20,        // Limit for Quest 2
        autoDetectDevice: true           // Auto-detect and optimize
      }
    }
  }
});
```

### VR Model Positioning

Define separate camera positions for desktop and VR modes:

```javascript
const models = {
  'wreck-model': {
    url: 'models/wreck.glb',
    name: 'Shipwreck',
    initialPositions: {
      // Desktop orbit camera positioning
      desktop: {
        camera: { x: 33.494, y: 36.42, z: -83.442 },
        target: { x: -3.602, y: -6.611, z: -23.97 }
      },
      // VR dolly (camera rig) positioning  
      vr: {
        dolly: { x: 0, y: 2, z: 15 },        // Player starting position
        rotation: { x: 0, y: 0, z: 0 }       // Player starting orientation
      }
    }
  }
};
```

### VR Controls

#### Left Controller (Movement)
- **Thumbstick**: Forward/backward and left/right movement
- **Grip Button**: Hold for 3x speed boost
- **X Button** (Quest): Toggle dive/survey mode
- **Y Button** (Quest): Toggle dive/survey mode

#### Right Controller (Navigation)
- **Thumbstick X**: Smooth horizontal turning
- **Thumbstick Y**: Vertical movement (fly up/down)
- **Grip Button**: Hold for 3x vertical speed boost
- **A Button** (Quest): Toggle dive/survey mode
- **B Button** (Quest): Toggle dive/survey mode

### VR Events

```javascript
// VR session management
viewer.on('vr-session-start', () => {
  console.log('User entered VR');
  // Hide desktop UI, prepare VR interface
});

viewer.on('vr-session-end', () => {
  console.log('User exited VR');
  // Restore desktop UI
});

// VR mode changes
viewer.on('vr-mode-toggle', () => {
  console.log('User toggled dive/survey mode via controller');
  // Handle mode-specific changes
});

// VR movement tracking
viewer.on('vr-movement-start', () => {
  console.log('User started moving in VR');
  // Start movement audio, effects
});

viewer.on('vr-movement-stop', () => {
  console.log('User stopped moving in VR');
  // Stop movement audio, effects
});

viewer.on('vr-movement-update', ({ speed, boostLevel }) => {
  console.log(`Movement speed: ${speed}, boost: ${boostLevel}`);
  // Update audio volume, visual effects based on speed
});
```

### VR Button Styling

BelowJS includes a glassmorphism VR button with shimmer effect:

```css
/* VR button with glassmorphism and shimmer effect */
.vr-button-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 16px 32px;
  
  /* Tasteful shimmer animation */
  position: relative;
  overflow: hidden;
}

.vr-button-glass::before {
  content: '';
  position: absolute;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.2), 
    transparent
  );
  animation: vrShimmer 3s ease-in-out infinite;
}
```

### VR Audio System

BelowJS includes an optional VR audio system that provides immersive sound effects during VR movement:

```javascript
const viewer = new ModelViewer(container, {
  models: models,
  enableVR: true,
  enableVRAudio: true,        // Enable VR audio (default: true)
  audioPath: './sound/',     // Path to VR audio files
  autoLoadFirst: true
});
```

**Audio Files Required:**
- `dpv.ogg` - Base movement sound
- `dpvhigh.ogg` - High-speed movement sound  
- `vrambience.ogg` - Background ambience

**Disabling VR Audio:**
Set `enableVRAudio: false` to disable audio loading entirely, preventing 404 errors when audio files are not available:

```javascript
const viewer = new ModelViewer(container, {
  models: models,
  enableVR: true,
  enableVRAudio: false,       // Disable VR audio system
  autoLoadFirst: true
});
```

This is useful for:
- Measurement-only viewers that don't need audio
- Environments where audio files are not available
- Custom audio implementations

### Device Optimization

BelowJS automatically detects VR devices and applies optimizations:

```javascript
// Quest 2 Detection and Optimization
if (isQuest2) {
  camera.far = 20;  // Limit render distance for performance
  console.log('Quest 2 optimizations applied');
}

// Quest 3 Detection
if (isQuest3) {
  // Full render distance maintained
  console.log('Quest 3 detected - full quality mode');
}
```

### VR Manager API

Access the VR manager directly for advanced control:

```javascript
const vrManager = viewer.getVRManager();

// Check VR state
if (vrManager.isVRPresenting) {
  console.log('Currently in VR mode');
}

// Access controllers
if (vrManager.controller1 && vrManager.controller2) {
  console.log('Both controllers connected');
}

// Manual VR positioning
vrManager.applyVRPositions({
  vr: {
    dolly: { x: 10, y: 5, z: 20 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 }
  }
});
```

---

## Measurement System

BelowJS includes a comprehensive measurement system for both VR and desktop environments, enabling precise distance measurements on 3D models.

### Features

- **VR & Desktop Support**: Point-and-click measurements on desktop, controller-based measurements in VR
- **Real-time Distance Display**: Live measurement updates with metric/imperial units
- **Visual Feedback**: 3D spheres and lines showing measurement points and distances
- **Model Integration**: Automatic target filtering to measure only model geometry
- **Theming**: Dark and light theme support to match your application

### Enabling Measurements

```javascript
const viewer = new ModelViewer(container, {
  models: models,
  enableMeasurement: true,          // Enable the measurement system
  measurementTheme: 'dark',         // 'dark' or 'light' theme
  autoLoadFirst: true
});
```

### Desktop Usage

- Click the measurement toggle button to activate measurement mode
- Click two points on the model to create a measurement
- Measurements appear as connected spheres with distance labels
- Click the clear button to remove all measurements

### VR Usage

- Use controller triggers to place measurement points
- Measurements automatically sync between controllers
- Visual feedback shows placement points and distances in 3D space
- Support for both Quest 2 and Quest 3 controllers

### Measurement API

```javascript
// Access the measurement system
const measurementSystem = viewer.measurementSystem;

// Enable/disable measurement mode
measurementSystem.enable();
measurementSystem.disable();

// Clear all measurements
measurementSystem.clearMeasurements();

// Set raycast targets (automatically done when models load)
measurementSystem.setRaycastTargets(model);

// Check if measurement mode is active
const isActive = measurementSystem.isEnabled();
```

---

## Dive System

The Dive System provides immersive underwater exploration with dynamic lighting, particle effects, and dive/survey mode switching.

### Features

- **Dive/Survey Modes**: Toggle between bright survey lighting and atmospheric dive lighting
- **Dynamic Particles**: Underwater particle simulation with floating debris
- **Interactive Torch**: Flashlight simulation with realistic lighting and shadows
- **VR Integration**: Torch follows VR controller movements, mode switching via controller buttons
- **Quest Optimization**: Automatic performance adjustments for Quest 2 devices

### Enabling Dive System

```javascript
const viewer = new ModelViewer(container, {
  models: models,
  enableDiveSystem: true,           // Enable dive system
  autoLoadFirst: true
});
```

### Mode Toggle

**Desktop:**
- Use the toggle switch in the UI to switch between Survey and Dive modes

**VR:**
- Press X/A buttons on either controller to toggle modes
- Visual feedback shows current mode state

### Dive System API

```javascript
// Access the dive system
const diveSystem = viewer.diveSystem;

// Toggle between dive and survey modes
diveSystem.toggleDiveMode();

// Set mode directly
diveSystem.setDiveMode(true);  // Enable dive mode
diveSystem.setDiveMode(false); // Enable survey mode

// Check current mode
const isDiving = diveSystem.isDiveMode();

// Update particle bounds when model changes
diveSystem.updateParticleBounds(model);
```

### Lighting Modes

**Survey Mode:**
- Bright, even lighting for detailed inspection
- Minimal atmospheric effects
- Clear visibility of all model details

**Dive Mode:**
- Atmospheric underwater lighting
- Dynamic torch illumination
- Particle effects and underwater ambiance
- Reduced ambient lighting for realism

---

## VR Comfort Glyph

The VR Comfort Glyph provides an easy-to-access comfort mode toggle for VR users, helping prevent motion sickness.

### Features

- **Floating UI Element**: Positioned outside the main interface for easy VR access
- **Comfort Mode Toggle**: Switch between smooth movement and comfort settings
- **Accessibility**: Full keyboard and screen reader support
- **Visual Feedback**: Clear indication of current comfort state

### Enabling VR Comfort Glyph

```javascript
const viewer = new ModelViewer(container, {
  models: models,
  enableVR: true,
  enableVRComfortGlyph: true,       // Enable comfort glyph
  autoLoadFirst: true
});
```

### Usage

**Desktop:**
- Click the comfort settings icon to toggle comfort mode
- Keyboard shortcut: `Ctrl+C` (or `Cmd+C` on Mac)

**VR:**
- Look for the floating comfort glyph in your peripheral vision
- Point and click with controller to toggle

### Comfort States

**Comfort Mode OFF (Default):**
- Smooth movement and turning
- Full VR navigation freedom
- Best for experienced VR users

**Comfort Mode ON:**
- Teleportation-based movement
- Snap turning
- Reduced motion effects
- Best for motion-sensitive users

### VR Comfort API

```javascript
// Access the comfort glyph
const comfortGlyph = viewer.comfortGlyph;

// Toggle comfort mode programmatically
comfortGlyph.toggle();

// Set comfort mode directly
comfortGlyph.setComfortMode(true);   // Enable comfort mode
comfortGlyph.setComfortMode(false);  // Disable comfort mode

// Check current state
const isComfortMode = comfortGlyph.isComfortMode;
```

## Fullscreen Button

The viewer can display an optional fullscreen toggle that enters or exits browser fullscreen mode using the standard Fullscreen API.

### Enabling Fullscreen Button

```javascript
const viewer = new ModelViewer(container, {
  models,
  enableFullscreen: true,
  autoLoadFirst: true
});
```

A small circular control appears near the bottom-right corner when `enableFullscreen` is `true`.
Its glassmorphic style matches other buttons and the arrow icon points outward to indicate entering fullscreen, flipping inward once fullscreen is active. The icon color adapts to the current theme.
The button sits near the bottom-right corner, just above the measurement panel and comfort glyph so everything remains visible when embedded or fullscreened.
Press the button or hit `Esc` to exit fullscreen.

---

## Configuration Options

### Top-Level Options

```javascript
{
  // Model configuration
  models: {},                    // Object defining available models
  autoLoadFirst: true,           // Auto-load first model on init
  
  // UI visibility options
  showLoadingIndicator: true,    // Show loading spinner
  showStatus: true,             // Show status text
  showInfo: false,              // Show info panel (optional)
  
  // Feature enablement
  enableVR: false,              // Enable VR support
  enableVRAudio: true,          // Enable VR audio system (default: true)
  enableControls: true,         // Enable camera controls
  enableInfo: true,             // Enable info panel display
  showStats: false,             // Show performance stats
  autoRotate: false,            // Auto-rotate camera
  enableMeasurement: false,     // Enable measurement system
  measurementTheme: 'dark',     // Measurement UI theme ('dark' or 'light')
  enableVRComfortGlyph: false,  // Enable VR comfort toggle UI
  enableDiveSystem: false,      // Enable dive/survey mode system
  enableFullscreen: false,     // Show fullscreen button
  audioPath: './sound/',       // VR audio file path
  
  // Model loading
  initialModel: 'model-key',    // Key of model to load initially
  initialPositions: {},         // Initial camera positions for first model
  
  // Scene configuration (for themes)
  scene: {
    background: { type: 'color', value: '#ffffff' },
    fog: { enabled: false }
  },
  
  // Camera configuration
  camera: {
    fov: 65,
    position: { x: 0, y: 5, z: 10 }
  },
  
  // Advanced configuration
  viewerConfig: {               // Direct BelowViewer configuration
    scene: {
      background: { type: 'color', value: '#ffffff' },
      backgroundColor: '#ffffff' // Alternative syntax
    },
    camera: {
      fov: 65,
      near: 0.05,
      far: 2000
    }
  }
}
```

### Model Definition

Each model in the `models` object should follow this structure:

```javascript
{
  'model-key': {
    url: 'path/to/model.glb',           // Required: Path to GLB/GLTF file
    name: 'Display Name',               // Required: Human-readable name
    credit: 'Creator Name',             // Optional: Attribution
    initialPositions: {                 // Optional: Camera positioning
      desktop: {
        camera: { x: 10, y: 5, z: 15 },  // Camera position
        target: { x: 0, y: 0, z: 0 }     // Look-at target
      },
      vr: {                             // VR-specific positioning
        dolly: { x: 0, y: 2, z: 10 },
        rotation: { x: 0, y: 0, z: 0 }
      }
    }
  }
}
```

### Scene Configuration

For theme-specific backgrounds and environments:

```javascript
{
  scene: {
    background: { 
      type: 'color', 
      value: '#ffffff'        // White background for light theme
    },
    fog: { 
      enabled: false,         // Disable fog
      color: '#ffffff',       // Fog color
      near: 10,              // Fog start distance
      far: 100               // Fog end distance
    }
  }
}
```

### Camera Configuration

```javascript
{
  camera: {
    fov: 65,                  // Field of view in degrees
    near: 0.05,              // Near clipping plane
    far: 2000,               // Far clipping plane
    position: { x: 0, y: 5, z: 10 },  // Initial position
    desktop: {
      enableDamping: true,    // Smooth camera movement
      dampingFactor: 0.08,    // Damping amount
      maxDistance: 100,       // Max zoom out
      minDistance: 0.5        // Max zoom in
    }
  }
}
```

---

## Events

The ModelViewer emits events that you can listen to for custom behavior.

### Event Listeners

```javascript
viewer.on(eventName, callback);
viewer.off(eventName, callback);
```

### Available Events

#### `initialized`
Fired when the viewer is fully initialized.

```javascript
viewer.on('initialized', () => {
  console.log('Viewer ready!');
});
```

#### `model-loading`
Fired when a model starts loading.

```javascript
viewer.on('model-loading', ({ modelKey, config }) => {
  console.log(`Loading ${config.name}...`);
});
```

#### `model-loaded`
Fired when a model finishes loading successfully.

```javascript
viewer.on('model-loaded', ({ modelKey, model, config }) => {
  console.log(`${config.name} loaded successfully`);
  console.log('Model object:', model);
});
```

#### `model-error`
Fired when a model fails to load.

```javascript
viewer.on('model-error', ({ modelKey, error, config }) => {
  console.error(`Failed to load ${config.name}:`, error);
});
```

#### `model-switched`
Fired when switching between models.

```javascript
viewer.on('model-switched', ({ modelKey, model, config }) => {
  console.log(`Switched to ${config.name}`);
});
```

#### `progress`
Fired during model loading to report progress.

```javascript
viewer.on('progress', ({ loaded, total, percentage }) => {
  console.log(`Loading: ${percentage}%`);
});
```

#### `focus`
Fired when the camera focuses on a point (via double-click or programmatic call).

```javascript
viewer.on('focus', ({ point, intersect, distance }) => {
  console.log('Camera focused on:', point);
  if (intersect) {
    console.log('Clicked object:', intersect.object);
  }
});
```

#### `camera-reset`
Fired when the camera is reset to its initial position.

```javascript
viewer.on('camera-reset', ({ modelKey, position }) => {
  console.log(`Camera reset for ${modelKey}`);
});
```

---

## Methods

### Model Management

#### `loadModel(modelKey)`
Load a different model.

```javascript
await viewer.loadModel('my-other-model');
```

#### `getCurrentModel()`
Get the currently loaded model key.

```javascript
const currentKey = viewer.getCurrentModel();
```

#### `getModels()`
Get all available model configurations.

```javascript
const models = viewer.getModels();
```

#### `clearModels()`
Remove all currently loaded models. Useful when loading a model from an arbitrary source.

```javascript
viewer.belowViewer.clearModels();
```

#### Loading a GLB at runtime
You can load a user-provided GLB file by clearing existing models and
calling the lower-level `BelowViewer` instance:

```javascript
const url = URL.createObjectURL(file);
viewer.belowViewer.clearModels();
await viewer.belowViewer.loadModel(url, { autoFrame: true });
URL.revokeObjectURL(url);
```

### Scene Control

#### `focusModel()`
Focus the camera on the current model.

```javascript
viewer.focusModel();
```

#### `resetCamera()`
Reset camera to initial position.

```javascript
viewer.resetCamera();
```

#### `focusOn(point, distance)`
Focus the camera on a specific point in 3D space with smooth animation.

```javascript
// Focus on a specific point
const point = new THREE.Vector3(10, 5, 0);
viewer.focusOn(point);

// Focus with specific distance
viewer.focusOn(point, 15);
```

**Parameters:**
- `point` (THREE.Vector3): The 3D point to focus on
- `distance` (number, optional): Distance from the point. If not specified, maintains current offset

### Interaction

#### Double-click to Focus ✅ COMPLETE
The ModelViewer provides a **production-ready** double-click to focus system that matches the original BelowJS behavior exactly:

- **Fast Detection**: Uses 300ms custom timing (faster than browser default)
- **Zoom Preservation**: Maintains exact camera distance from focus point
- **Smooth Animation**: 1000ms ease-out cubic animation, identical to original
- **Drag Prevention**: Ignores clicks during camera drag operations
- **Interruptible**: Animation cancels when user starts dragging/rotating
- **VR Safe**: Automatically disabled when in VR mode

**Technical Details:**
- Uses manual click event detection with 300ms double-click threshold
- Raycasting against scene meshes to find intersection points
- Maintains camera-to-target offset for consistent zoom level
- Event capture prevents interference with OrbitControls

```javascript
// Listen for focus events
viewer.on('focus', ({ point, intersect }) => {
  console.log('Camera focused on:', point);
  console.log('Clicked object:', intersect.object);
});
```

---

## Focus System ✅ COMPLETE

The BelowJS focus system provides intuitive camera navigation that matches the original implementation exactly.

### User Interaction

**Double-Click Focus:**
- Double-click any part of the 3D model to smoothly focus on that point
- Camera maintains current zoom distance while moving to the new target
- Fast 300ms detection for responsive feel
- Automatically prevented during drag operations

### Programmatic Control

**Manual Focus:**
```javascript
// Focus on a specific point
const targetPoint = new THREE.Vector3(10, 5, -20);
viewer.focusOn(targetPoint);

// Focus with custom distance
viewer.focusOn(targetPoint, 25);

// Focus on model center
const model = viewer.getCurrentModel();
const center = new THREE.Box3().setFromObject(model).getCenter(new THREE.Vector3());
viewer.focusOn(center);
```

**Reset Camera:**
```javascript
// Return to initial camera position
viewer.resetCamera();
```

### Events

```javascript
// Focus started
viewer.on('focus-start', ({ target, startPosition, newPosition }) => {
  console.log('Animation started to:', target);
});

// Focus completed
viewer.on('focus-complete', ({ target, position }) => {
  console.log('Animation completed at:', position);
});

// Focus point selected
viewer.on('focus', ({ point, intersect }) => {
  console.log('User focused on:', point);
  console.log('Mesh object:', intersect.object);
});
```

### Technical Implementation

- **Event Detection**: Manual click timing (300ms) for optimal responsiveness
- **Raycasting**: Intersection testing against scene meshes with fallback traversal
- **Animation**: 1000ms ease-out cubic motion matching original behavior
- **Cancellation**: User input automatically interrupts ongoing animations
- **Conflict Prevention**: Drag detection prevents accidental focus triggers

---

## Theming

BelowJS supports both dark and light themes with proper background colors.

### Dark Theme (Default)

```html
<link rel="stylesheet" href="/src/styles/theme.css">
```

Features:
- Dark blue/black background (`#0a1a2a`)
- Light text and UI elements
- Blue accent colors
- Atmospheric appearance

### Light Theme

```html
<link rel="stylesheet" href="/src/styles/theme-light.css">
```

Features:
- White background (`#ffffff`)
- Black text and UI elements
- Crisp, minimal appearance
- High contrast design

### Theme with Scene Background

For light theme, make sure to set the scene background:

```javascript
const viewer = new ModelViewer(container, {
  models: models,
  scene: {
    background: { type: 'color', value: '#ffffff' }
  }
});
```

### Custom CSS Variables

Both themes use CSS custom properties that you can override:

```css
:root {
  --below-bg-color: #ffffff;           /* Background color */
  --below-text-color: #1a1a1a;        /* Text color */
  --below-accent-color: #000000;      /* Accent color */
  --below-panel-bg: rgba(255, 255, 255, 0.95);  /* Panel background */
  --below-panel-border: rgba(0, 0, 0, 0.15);    /* Panel border */
}
```

---

## Examples

### Basic Viewer Example

Complete example with all features enabled (see `examples/basic/`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BelowJS - Basic Model Viewer</title>
    
    <!-- BelowJS Production Build -->
    <link rel="stylesheet" href="/dist/belowjs.css">
</head>
<body>
    <div id="info">
        <div id="infoTitle">BelowJS Model Viewer</div>
        <div id="infoControls">
            <strong>Controls:</strong> Drag to rotate • Scroll to zoom • Double-click to focus<br>
            <strong>VR:</strong> Thumbsticks to move • X/A to toggle dive mode<br>
        </div>
    </div>

    <div id="modelSelector">
        <select id="modelDropdown"></select>
        <div id="modeToggleContainer">
            <div class="semantic-toggle">
                <input type="checkbox" id="modeToggleSwitch">
                <div class="toggle-slider-bg"></div>
                <div class="toggle-option left">
                    <div class="toggle-icon">S</div>
                    <div class="toggle-text">Survey</div>
                </div>
                <div class="toggle-option right">
                    <div class="toggle-icon">D</div>
                    <div class="toggle-text">Dive</div>
                </div>
            </div>
        </div>
    </div>

    <div id="loading">Loading...</div>

    <!-- Three.js from CDN -->
    <script src="https://cdn.jsdelivr.net/npm/three@0.177.0/build/three.min.js"></script>
    
    <!-- BelowJS Production Bundle -->
    <script src="/dist/belowjs.umd.js"></script>
    
    <script>
        const models = {
            'shipwreck': {
                url: '/models/wreck.glb',
                name: 'Historic Shipwreck',
                credit: 'Maritime Museum',
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
            }
        };

        // Create viewer container
        const viewerContainer = document.createElement('div');
        viewerContainer.style.position = 'fixed';
        viewerContainer.style.inset = '0';
        viewerContainer.style.zIndex = '0';
        document.body.appendChild(viewerContainer);

        const viewer = new BelowJS.ModelViewer(viewerContainer, {
            enableVR: true,
            models: models,
            enableMeasurement: true,
            enableVRComfortGlyph: true,
            enableDiveSystem: true,
            autoLoadFirst: true,
            showInfo: true
        });

        // Handle model selection
        const dropdown = document.getElementById('modelDropdown');
        dropdown.addEventListener('change', (event) => {
            if (event.target.value) {
                viewer.loadModel(event.target.value);
            }
        });
    </script>
</body>
</html>
```

### Build and Distribution

To create production bundles:

```bash
npm run build
```

This creates:
- `dist/belowjs.umd.js` - UMD bundle for script tags
- `dist/belowjs.es.js` - ES modules bundle 
- `dist/belowjs.css` - Complete CSS bundle

### Package.json Configuration

```json
{
  "main": "dist/belowjs.umd.js",
  "module": "dist/belowjs.es.js", 
  "style": "dist/belowjs.css"
}
```

### Required HTML Structure

BelowJS automatically creates UI elements, but you can provide custom HTML structure for better control:

```html
<body>
    <!-- Info panel (optional) -->
    <div id="info">
        <div id="infoTitle">BelowJS Model Viewer</div>
        <div id="infoControls">
            <strong>Controls:</strong> Drag to rotate • Scroll to zoom • Double-click to focus<br>
            <strong>VR:</strong> Thumbsticks to move • X/A to toggle dive mode<br>
        </div>
    </div>

    <!-- Model selector and dive mode toggle -->
    <div id="modelSelector">
        <select id="modelDropdown"></select>
        <div id="modeToggleContainer">
            <div class="semantic-toggle">
                <input type="checkbox" id="modeToggleSwitch">
                <div class="toggle-slider-bg"></div>
                <div class="toggle-option left">
                    <div class="toggle-icon">S</div>
                    <div class="toggle-text">Survey</div>
                </div>
                <div class="toggle-option right">
                    <div class="toggle-icon">D</div>
                    <div class="toggle-text">Dive</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Loading indicator -->
    <div id="loading">Loading...</div>
    
    <!-- Your viewer container will be created by JavaScript -->
</body>
```

### Complete Featured Example with All Systems

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BelowJS - Full Featured Viewer</title>
    <link rel="stylesheet" href="/src/styles/theme.css">
    <link rel="stylesheet" href="/src/styles/vr.css">
    <link rel="stylesheet" href="/src/vr/ui/vrui.css">
    <link rel="stylesheet" href="/src/styles/measurement.css">
    <link rel="stylesheet" href="/src/styles/dive.css">
</head>
<body>
    <script type="module">
        import { ModelViewer } from '/dist/belowjs.es.js';

        const models = {
            'shipwreck': {
                url: '/models/wreck.glb',
                name: 'Historic Shipwreck',
                credit: 'Maritime Museum',
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
            }
        };

        // Create full-featured viewer with all systems enabled
        const viewer = new ModelViewer(document.body, {
            models: models,
            autoLoadFirst: true,
            showInfo: true,
            
            // Enable all advanced features
            enableVR: true,                    // VR support
            enableMeasurement: true,           // Measurement system
            measurementTheme: 'dark',          // Dark measurement theme
            enableVRComfortGlyph: true,        // VR comfort toggle
            enableDiveSystem: true,            // Dive/survey modes
            audioPath: './sound/',            // VR audio files
            
            // Scene configuration for underwater theme
            scene: {
                background: { type: 'color', value: '#001122' }
            }
        });

        // Event listeners for all systems
        viewer.on('model-loaded', ({ config }) => {
            console.log(`${config.name} loaded successfully`);
        });

        viewer.on('vr-session-start', () => {
            console.log('VR session started');
        });

        viewer.on('vr-session-end', () => {
            console.log('VR session ended');
        });

        // Access individual systems
        // Handle model selection changes
        const dropdown = document.getElementById('modelDropdown');
        if (dropdown) {
            dropdown.addEventListener('change', (event) => {
                const selectedModelKey = event.target.value;
                if (selectedModelKey) {
                    console.log('Loading model:', selectedModelKey);
                    viewer.loadModel(selectedModelKey);
                }
            });
        }

        viewer.on('initialized', () => {
            // Measurement system
            const measurementSystem = viewer.measurementSystem;
            console.log('Measurement system ready:', measurementSystem);
            
            // Dive system
            const diveSystem = viewer.diveSystem;
            console.log('Dive system ready:', diveSystem);
            
            // VR comfort glyph
            const comfortGlyph = viewer.comfortGlyph;
            console.log('Comfort glyph ready:', comfortGlyph);
        });
    </script>
</body>
</html>
```

### Light Theme Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Light Theme Viewer</title>
    <link rel="stylesheet" href="/src/styles/theme-light.css">
</head>
<body>
    <script type="module">
        import { ModelViewer } from '/dist/belowjs.es.js';

        const viewer = new ModelViewer(document.body, {
            models: {
                'model': {
                    url: '/models/model.glb',
                    name: 'My Model'
                }
            },
            scene: {
                background: { type: 'color', value: '#ffffff' }
            },
            autoLoadFirst: true,
            showInfo: true
        });
    </script>
</body>
</html>
```

### Light Measurement Example (URL Parameter Integration)

A measurement-focused viewer that can be embedded with URL parameters and disabled VR audio:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Light Measurement Viewer</title>
    <link rel="stylesheet" href="/dist/belowjs.css">
</head>
<body>
    <script type="module">
        import { ModelViewer } from '/dist/belowjs.es.js';

        // Parse URL parameters for dynamic configuration
        const urlParams = new URLSearchParams(window.location.search);
        const modelUrl = urlParams.get('model') || 'default-model.glb';
        const modelName = urlParams.get('name') || 'Default Model';
        const backgroundColor = urlParams.get('bg') || '#f8f9fa';

        const viewer = new ModelViewer(container, {
            models: {
                'model': { 
                    url: modelUrl, 
                    name: modelName 
                }
            },
            enableMeasurement: true,
            measurementTheme: 'light',
            enableVRAudio: false,        // Disable VR audio for measurement-focused viewer
            enableFullscreen: true,
            autoLoadFirst: true,
            showInfo: false,
            viewerConfig: {
                scene: {
                    background: { type: 'color', value: backgroundColor }
                }
            }
        });
    </script>
</body>
</html>
```

**Usage in iframe:**
```html
<iframe 
    src="viewer.html?model=wreck.glb&name=Historic%20Wreck&bg=%23f8f9fa"
    width="100%" 
    height="500px">
</iframe>
```

### Minimal Viewer Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dark Minimal Viewer</title>
    <!-- BelowJS Core Styling -->
    <link rel="stylesheet" href="/src/styles/theme.css">
    <link rel="stylesheet" href="/src/styles/vr.css">
    <link rel="stylesheet" href="/src/styles/dive.css">
    
    <style>
        body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background: #0f172a;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
    </style>
</head>
<body>
    <!-- Model selector with dive mode toggle -->
    <div id="modelSelector">
        <select id="modelDropdown"></select>
        <div id="modeToggleContainer">
            <div class="semantic-toggle">
                <input type="checkbox" id="modeToggleSwitch">
                <div class="toggle-slider-bg"></div>
                <div class="toggle-option left">
                    <div class="toggle-icon">S</div>
                    <div class="toggle-text">Survey</div>
                </div>
                <div class="toggle-option right">
                    <div class="toggle-icon">D</div>
                    <div class="toggle-text">Dive</div>
                </div>
            </div>
        </div>
    </div>

    <script type="module">
        import { ModelViewer } from '/dist/belowjs.es.js';

        const models = {
            'shipwreck': {
                url: '/models/wreck.glb',
                name: 'Shipwreck',
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
            }
        };

        // Create viewer container
        const viewerContainer = document.createElement('div');
        viewerContainer.style.position = 'fixed';
        viewerContainer.style.top = '0';
        viewerContainer.style.left = '0';
        viewerContainer.style.position = 'fixed';
        viewerContainer.style.inset = '0';
        viewerContainer.style.zIndex = '0';
        document.body.appendChild(viewerContainer);

        // Dark minimal viewer: just models, dive mode, and VR
        const viewer = new ModelViewer(viewerContainer, {
            models: models,
            enableDiveSystem: true,
            enableVR: true,
            showInfo: false,
            showStatus: false,
            showLoadingIndicator: false,
            viewerConfig: {
                scene: {
                    background: { type: 'color', value: '#0f172a' }
                }
            }
        });
    </script>
</body>
</html>
```

### Multiple Models Example

```javascript
import { ModelViewer } from '/src/index.js';

const models = {
    'ship1': {
        url: '/models/ship1.glb',
        name: 'Cargo Ship',
        credit: 'Maritime Museum',
        initialPositions: {
            desktop: {
                camera: { x: 20, y: 10, z: 30 },
                target: { x: 0, y: 0, z: 0 }
            }
        }
    },
    'ship2': {
        url: '/models/ship2.glb',
        name: 'Fishing Vessel',
        credit: 'Ocean Archive',
        initialPositions: {
            desktop: {
                camera: { x: 15, y: 8, z: 25 },
                target: { x: 2, y: -1, z: 3 }
            }
        }
    }
};

const viewer = new ModelViewer('#container', {
    models: models,
    autoLoadFirst: true,
    showInfo: true
});

// Listen for model switches
viewer.on('model-switched', ({ config }) => {
    document.title = `Viewing: ${config.name}`;
});

// Programmatically switch models
document.getElementById('ship1-btn').addEventListener('click', () => {
    viewer.loadModel('ship1');
});

document.getElementById('ship2-btn').addEventListener('click', () => {
    viewer.loadModel('ship2');
});
```

---

## Advanced Usage

### Custom Scene Configuration

```javascript
const viewer = new ModelViewer(container, {
    models: models,
    scene: {
        background: { type: 'color', value: '#1a1a2e' },
        fog: {
            enabled: true,
            color: '#16213e',
            near: 20,
            far: 100
        }
    },
    camera: {
        fov: 75,
        position: { x: 0, y: 10, z: 20 },
        desktop: {
            dampingFactor: 0.12,
            maxDistance: 200
        }
    }
});
```

### Error Handling

```javascript
const viewer = new ModelViewer(container, {
    models: models,
    autoLoadFirst: true
});

viewer.on('model-error', ({ modelKey, error, config }) => {
    console.error(`Failed to load ${config.name}:`, error);
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = `Could not load ${config.name}. Please try again.`;
    document.body.appendChild(errorDiv);
});

viewer.on('model-loaded', () => {
    // Clear any error messages
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
});
```

### Performance Monitoring

```javascript
viewer.on('model-loaded', ({ model }) => {
    console.log('Model statistics:');
    console.log('- Vertices:', model.userData.stats?.vertices || 'Unknown');
    console.log('- Triangles:', model.userData.stats?.triangles || 'Unknown');
    console.log('- Materials:', model.userData.stats?.materials || 'Unknown');
});

viewer.on('progress', ({ loaded, total, percentage }) => {
    // Update custom progress bar
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
        progressBar.textContent = `${Math.round(percentage)}%`;
    }
});
```

### Integration with Other Libraries

```javascript
// Example: Integration with a UI framework
import { ModelViewer } from '/src/index.js';

class ViewerComponent {
    constructor(element, props) {
        this.element = element;
        this.props = props;
        this.viewer = null;
        this.init();
    }

    init() {
        this.viewer = new ModelViewer(this.element, {
            models: this.props.models,
            autoLoadFirst: this.props.autoLoad !== false,
            showInfo: this.props.showInfo !== false
        });

        this.setupEventHandlers();
    }

    setupEventHandlers() {
        this.viewer.on('model-loaded', (data) => {
            if (this.props.onModelLoaded) {
                this.props.onModelLoaded(data);
            }
        });

        this.viewer.on('model-error', (data) => {
            if (this.props.onError) {
                this.props.onError(data);
            }
        });
        
        this.viewer.on('focus', ({ point }) => {
            console.log('User focused on point:', point);
        });
    }

    loadModel(modelKey) {
        return this.viewer.loadModel(modelKey);
    }

    dispose() {
        if (this.viewer) {
            this.viewer.dispose();
            this.viewer = null;
        }
    }
}

// Usage
const component = new ViewerComponent(document.getElementById('viewer'), {
    models: myModels,
    autoLoad: true,
    showInfo: true,
    onModelLoaded: (data) => console.log('Component: Model loaded', data),
    onError: (error) => console.error('Component: Error', error)
});
```

### Focus and Camera Control Examples

```javascript
import { ModelViewer } from '/src/index.js';
import * as THREE from 'three';

const viewer = new ModelViewer(container, {
    models: models,
    autoLoadFirst: true
});

// Listen for focus events from double-clicking
viewer.on('focus', ({ point, intersect }) => {
    console.log('User focused on:', point);
    
    // Show a UI marker at the focused point
    showMarker(point);
    
    // Display information about the clicked object
    if (intersect && intersect.object.userData.name) {
        showTooltip(intersect.object.userData.name);
    }
});

// Programmatically focus on specific points
viewer.on('model-loaded', ({ model }) => {
    // Focus on the center of the model after loading
    setTimeout(() => {
        const center = new THREE.Vector3(0, 0, 0);
        viewer.focusOn(center);
    }, 1000);
});

// Create interactive hotspots
const hotspots = [
    { name: 'Engine Room', position: new THREE.Vector3(10, -5, 0) },
    { name: 'Bridge', position: new THREE.Vector3(-8, 12, 15) },
    { name: 'Cargo Hold', position: new THREE.Vector3(0, -10, -20) }
];

hotspots.forEach(hotspot => {
    createHotspotButton(hotspot.name, () => {
        viewer.focusOn(hotspot.position, 20); // Focus with 20 unit distance
    });
});

// Reset camera to initial view
document.getElementById('reset-btn').addEventListener('click', () => {
    viewer.resetCamera();
});

function showMarker(point) {
    // Add a temporary marker at the focused point
    const marker = document.createElement('div');
    marker.className = 'focus-marker';
    marker.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background: red;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
    `;
    document.body.appendChild(marker);
    
    // Remove marker after 2 seconds
    setTimeout(() => marker.remove(), 2000);
}
```

---

## Browser Support

- **Chrome 90+** (recommended)
- **Firefox 90+**
- **Safari 14+**
- **Edge 90+**

### WebXR Support (Future)
- **Quest 2/3**
- **HTC Vive**
- **Valve Index**
- Other WebXR-compatible devices

---

## Performance Tips

1. **Model Optimization**: Use compressed GLTF with Draco compression
2. **Texture Sizes**: Keep textures under 2048x2048 for mobile compatibility
3. **Polygon Count**: Aim for under 100k triangles for smooth performance
4. **Material Count**: Minimize the number of unique materials
5. **Auto-loading**: Set `autoLoadFirst: false` for faster initial page load

---

## Migration from Other Libraries

### From Three.js directly

```javascript
// Old Three.js code
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
// ... lots of setup code

// BelowJS implementation
const viewer = new ModelViewer(container, {
    models: { 'my-model': { url: 'model.glb', name: 'My Model' } },
    autoLoadFirst: true
});
```

### From model-viewer

```html
<!-- Old model-viewer -->
<model-viewer src="model.glb" camera-controls></model-viewer>

<!-- BelowJS implementation -->
<div id="viewer"></div>
<script type="module">
    import { ModelViewer } from '/src/index.js';
    new ModelViewer('#viewer', {
        models: { 'model': { url: 'model.glb', name: 'Model' } },
        autoLoadFirst: true
    });
</script>
```

---

## Troubleshooting

### Common Issues

#### Model not loading
```javascript
viewer.on('model-error', ({ error }) => {
    console.error('Model loading failed:', error);
    // Check: file path, CORS, file format
});
```

#### White/blank screen
- Check that CSS is properly loaded
- Verify container has dimensions
- Check browser console for errors

#### Poor performance
- Reduce model complexity
- Use smaller textures
- Enable device optimizations

#### Theme not applying
- Ensure CSS is loaded after base styles
- Check CSS variable overrides
- Verify scene background configuration

### Getting Help

1. Check browser console for errors
2. Verify file paths and CORS settings
3. Test with a simple model first
4. Check the examples for reference implementations

---

*This documentation covers the current stable API. Features marked as "Future" are planned for upcoming releases.*

## VR Comfort Settings

BelowJS includes VR comfort features to prevent motion sickness:

### Comfort Presets
```javascript
// Quick comfort configurations
viewer.setVRComfortPreset('comfort');    // Best for motion-sensitive users
viewer.setVRComfortPreset('moderate');   // Balanced experience  
viewer.setVRComfortPreset('experienced'); // Full freedom of movement
```

### Custom Comfort Settings
```javascript
viewer.setVRComfortSettings({
  locomotionMode: 'teleport',  // 'smooth', 'teleport', 'dash'
  turningMode: 'snap',         // 'smooth', 'snap'  
  snapTurnAngle: 30,           // degrees per snap turn
  vignetting: true,            // reduces peripheral vision during movement
  vignetteIntensity: 0.7,      // 0-1 vignette strength
  reducedMotion: true,         // slower, gentler movements
  comfortSpeed: 0.5            // speed multiplier for reduced motion
});
```

### Locomotion Modes
- **Smooth**: Traditional joystick movement (can cause motion sickness)
- **Teleport**: Point and teleport (most comfortable)
- **Dash**: Smooth movement to target position (moderate comfort)

### Turning Modes  
- **Smooth**: Continuous rotation with joystick
- **Snap**: Discrete rotation in fixed increments
