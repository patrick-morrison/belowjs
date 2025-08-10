# BelowJS API Documentation

**API reference for the BelowJS 3D model viewer library**

*Version 0.1.5*

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

Basic usage with ES modules:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My 3D Viewer</title>
    <link rel="stylesheet" href="/dist/belowjs.css">
</head>
<body>
    <script type="module">
        import { ModelViewer } from '/dist/belowjs.js';
        
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.inset = '0';
        document.body.appendChild(container);
        
        const viewer = new ModelViewer(container, {
            models: {
                'wreck': {
                    url: 'model.glb',
                    name: 'Shipwreck'
                }
            },
            enableVR: true
        });
    </script>
</body>
</html>
```

### Model Configuration

```javascript
import { ModelViewer } from '/dist/belowjs.js';

// Create viewer container first
const container = document.createElement('div');
container.style.position = 'fixed';
container.style.inset = '0';
document.body.appendChild(container);

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

// Create VR-enabled viewer
const viewer = new ModelViewer(container, {
  models: models,
  enableVR: true
});

// VR event handling
viewer.on('vr-session-start', () => {
  // Handle VR session start
});

viewer.on('vr-session-end', () => {
  // Handle VR session end
});
```

### Basic Setup without VR

```javascript
import { ModelViewer } from '/dist/belowjs.js';

const models = {
  'my-model': {
    url: 'path/to/model.glb',
    name: 'My 3D Model'
  }
};

const viewer = new ModelViewer(document.body, {
  models: models,
  autoLoadFirst: true,
  enableVR: false // Disable VR support
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
  showInfo: true
});
```

---

## VR Support

WebXR support for VR headsets.

### VR Features

- Works with Quest 2, Quest 3, and other WebXR headsets
- Thumbstick movement and turning
- Controller button support
- Quest 2 performance optimizations
- Survey/Dive mode switching via controller buttons

### Enabling VR

```javascript
const viewer = new ModelViewer(container, {
  models: {
    'model': { url: 'model.glb', name: 'Model' }
  },
  enableVR: true,              // Enable VR support
  enableVRAudio: true,         // Enable VR movement/ambience audio (optional; default is disabled)
  audioPath: './sound/'        // Path to VR audio files (dpv.ogg, dpvhigh.ogg, vrambience.ogg)
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
  // Hide desktop UI, prepare VR interface
});

viewer.on('vr-session-end', () => {
  // Restore desktop UI
});

// VR mode changes
viewer.on('vr-mode-toggle', () => {
  // Handle mode-specific changes
});

// VR movement tracking
viewer.on('vr-movement-start', () => {
  // Start movement audio, effects
});

viewer.on('vr-movement-stop', () => {
  // Stop movement audio, effects
});

viewer.on('vr-movement-update', ({ speed, boostLevel }) => {
  // Update audio volume, visual effects based on speed
  // Access speed and boostLevel values
});
```

### VR Button Styling

BelowJS includes a restyled VR button:

```css
.vr-button-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 16px 32px;
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

### VR Audio System (VR-only, disabled by default)

BelowJS includes an optional audio system for movement and ambience that plays only while a VR session is active:

```javascript
const container = document.body; // Or your container element  
const models = { 'model': { url: 'model.glb', name: 'Model' } };

const viewer = new ModelViewer(container, {
  models: models,
  enableVR: true,
  enableVRAudio: true,        // Enable VR audio (default: false)
  audioPath: './sound/'       // Path to VR audio files
});
```

**Audio Files Required:**
- `dpv.ogg` - Base movement sound
- `dpvhigh.ogg` - High-speed movement sound  
- `vrambience.ogg` - Background ambience

Behavior:
- Audio initializes and starts only on VR session start; it stops on session end.
- No audio is played on desktop, even if enabled.
- Complies with browser autoplay policies via the VR button gesture.

**Disabling VR Audio:**
Keep `enableVRAudio` unset or set it to `false` to disable audio loading entirely, preventing 404 errors when audio files are not available:

```javascript
const container = document.body; // Or your container element
const models = { 'model': { url: 'model.glb', name: 'Model' } };

const viewer = new ModelViewer(container, {
  models: models,
  enableVR: true,
  enableVRAudio: false        // Audio remains disabled (default)
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
}

// Quest 3 Detection
if (isQuest3) {
  // Full render distance maintained
}
```

### VR Manager API

Access the VR manager directly for advanced control:

```javascript
const vrManager = viewer.getVRManager();

// Check VR state
if (vrManager.isVRPresenting) {
  // Handle VR mode
}

// Access controllers
if (vrManager.controller1 && vrManager.controller2) {
  // Both controllers are connected
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
  measurementTheme: 'dark'          // 'dark' or 'light' theme
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

// Clear all measurements (clears unified, legacy VR, and legacy desktop measurements)
measurementSystem.clear();

// Set raycast targets (automatically done when models load)
measurementSystem.setRaycastTargets(model);

// Check if measurement mode is active
const isActive = measurementSystem.desktopMeasurementMode;
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
  enableDiveSystem: true            // Enable dive system
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

### VR Comfort Presets

BelowJS uses comfort presets to manage VR locomotion settings. These can be toggled via the VR Comfort Glyph or set programmatically.

**`'free'` (Default / Comfort Off):**
- **Movement**: Smooth, continuous movement using the thumbstick.
- **Turning**: Smooth, continuous turning using the thumbstick.
- **Best for**: Experienced VR users who are not prone to motion sickness.

**`'comfort'` (Comfort On):**
- **Movement**: Teleportation-based movement. Point with the controller and release the thumbstick to teleport.
- **Turning**: Snap turning, which rotates the view in discrete increments.
- **Best for**: Users who are new to VR or are sensitive to motion sickness.

### VR Comfort API

```javascript
// Access the comfort glyph instance from the ModelViewer
const comfortGlyph = viewer.comfortGlyph;

// Toggle comfort mode programmatically
comfortGlyph.toggle();

// Set comfort mode directly
comfortGlyph.setComfortMode(true);   // Enable comfort mode ('comfort' preset)
comfortGlyph.setComfortMode(false);  // Disable comfort mode ('free' preset)

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

### ModelViewer Options

The `ModelViewer` constructor accepts a single `options` object with the following properties:

```javascript
{
  // Model configuration
  models: {},                    // Required. Object defining available models.
  autoLoadFirst: true,           // Auto-load first model on init.
  initialModel: 'model-key',     // Key of model to load initially, overrides autoLoadFirst.
  
  // UI visibility options
  showLoadingIndicator: true,    // Show loading spinner.
  showStatus: true,              // Show status text.
  showInfo: false,               // Show info panel (optional).
  
  // Feature enablement
  enableVR: false,               // Enable VR support.
  enableVRAudio: false,          // Enable VR audio system (requires audio files).
  enableMeasurement: false,      // Enable measurement system.
  enableDiveSystem: false,       // Enable dive/survey mode system.
  enableFullscreen: false,       // Show fullscreen button.
  enableVRComfortGlyph: false,   // Enable VR comfort toggle UI.
  
  // Feature configuration
  measurementTheme: 'dark',      // Measurement UI theme ('dark' or 'light').
  showMeasurementLabels: false,  // Show measurement labels in desktop mode (always shown in VR).
  audioPath: './sound/',         // Path to VR audio files.
  
  // Low-level viewer configuration
  viewerConfig: {                // Optional. Direct configuration for the underlying BelowViewer.
    scene: {
      background: { type: 'color', value: '#041729' },
      fog: { enabled: false }
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
  // Viewer is ready for use
});
```

#### `model-load-start`
Fired when a model starts loading.

```javascript
viewer.on('model-load-start', ({ url }) => {
  // Handle loading start for URL
});
```

#### `model-loaded`
Fired when a model finishes loading successfully.

```javascript
viewer.on('model-loaded', ({ modelKey, model, config }) => {
  // Handle successful load: config.name
  // Access loaded model object
});
});
```

#### `model-load-error`
Fired when a model fails to load.

```javascript
viewer.on('model-load-error', ({ url, error }) => {
  console.error(`Failed to load ${url}:`, error);
});
```

#### `model-switched`
Fired when switching between models.

```javascript
viewer.on('model-switched', ({ modelKey, model, config }) => {
  // Handle model switch: config.name
});
```

#### `model-load-progress`
Fired during model loading to report progress.

```javascript
viewer.on('model-load-progress', ({ url, progress }) => {
  // Update loading UI: progress.loaded, progress.total
  const percentage = Math.round(progress.loaded / progress.total * 100);
});
```

#### `focus`
Fired when the camera focuses on a point (via double-click or programmatic call).

```javascript
viewer.on('focus', ({ point, intersect, distance }) => {
  // Handle camera focus: point coordinates
  // Note: intersect only present for double-click focus
  // distance only present for programmatic focus
  if (intersect) {
    // Access clicked object: intersect.object
  }
});
```

#### `camera-reset`
Fired when the camera is reset to its initial position.

```javascript
viewer.on('camera-reset', ({ modelKey, position }) => {
  // Handle camera reset for modelKey
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

#### Double-click to Focus
Double-click any part of a 3D model to focus the camera on that point.

- Uses 300ms double-click detection
- Maintains current camera distance from the target
- Smooth camera animation to the new focus point
- Disabled during camera drag operations
- Automatically disabled in VR mode

```javascript
// Listen for focus events
viewer.on('focus', ({ point, intersect }) => {
  console.log('Camera focused on:', point);
  console.log('Clicked object:', intersect.object);
});
```

---

## Camera Focus

### Programmatic Focus
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
<link rel="stylesheet" href="/dist/belowjs.css">
```

Features:
- Dark blue/black background (`#0a1a2a`)
- Light text and UI elements
- Blue accent colors
- Atmospheric appearance

### Light Theme

```html
<link rel="stylesheet" href="/dist/belowjs.css">
<!-- Note: Theme selection is done via CSS classes or configuration, not separate stylesheets -->
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
    <script src="/dist/belowjs.js"></script>
    
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
- `dist/belowjs.js` - UMD bundle for script tags
- `dist/belowjs.js` - ES modules bundle 
- `dist/belowjs.css` - Complete CSS bundle

### Package.json Configuration

```json
{
  "main": "dist/belowjs.js",
  "module": "dist/belowjs.js", 
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
    <link rel="stylesheet" href="/dist/belowjs.css">
</head>
<body>
    <script type="module">
        import { ModelViewer } from '/dist/belowjs.js';

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
    <link rel="stylesheet" href="/dist/belowjs.css">
</head>
<body>
    <script type="module">
        import { ModelViewer } from '/dist/belowjs.js';

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
        import { ModelViewer } from '/dist/belowjs.js';

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
    <!-- BelowJS Production Bundle -->
    <link rel="stylesheet" href="/dist/belowjs.css">
    
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
        import { ModelViewer } from '/dist/belowjs.js';

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
import { ModelViewer } from '/dist/belowjs.js';

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



---

## Browser Support

- **Chrome 90+** (recommended)
- **Firefox 90+**
- **Safari 14+**
- **Edge 90+**

### WebXR Support
- **Quest 2/3**
- **HTC Vive**
- **Valve Index**
- Other WebXR-compatible devices

---

## Performance Tips

1. **Model Optimization**: Use compressed GLTF with Draco compression
2. **Texture Sizes**: Keep textures under 2048x2048 for mobile compatibility
3. **Polygon Count**: Aim for under 1 million triangles for smooth performance
4. **Material Count**: Minimize the number of unique materials
5. **Auto-loading**: Set `autoLoadFirst: false` for faster initial page load

---


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


