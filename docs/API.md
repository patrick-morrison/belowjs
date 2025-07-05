# BelowJS API Documentation

**A comprehensive guide to the BelowJS 3D model viewer library**

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [ModelViewer Class](#modelviewer-class)
3. [Configuration Options](#configuration-options)
4. [Events](#events)
5. [Methods](#methods)
6. [Theming](#theming)
7. [Examples](#examples)
8. [Advanced Usage](#advanced-usage)

---

## Quick Start

### Basic Setup

```javascript
import { ModelViewer } from './src/viewers/ModelViewer.js';

// Define your models
const models = {
  'my-model': {
    url: 'path/to/model.glb',
    name: 'My 3D Model',
    credit: 'Model Creator'
  }
};

// Create viewer
const viewer = new ModelViewer(document.body, {
  models: models,
  autoLoadFirst: true,
  showInfo: true
});
```

### Minimal Setup

```javascript
// Minimal viewer with no UI
const viewer = new ModelViewer(document.body, {
  models: models,
  showLoadingIndicator: false,
  showStatus: false,
  showInfo: false
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

### Basic Example

```javascript
const viewer = new ModelViewer('#my-container', {
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
  viewerConfig: {}              // Direct BelowViewer configuration
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

#### `switchModel(modelKey)`
Switch to a different model.

```javascript
await viewer.switchModel('my-other-model');
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

### Complete Basic Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My 3D Viewer</title>
    <link rel="stylesheet" href="/src/styles/theme.css">
</head>
<body>
    <script type="module">
        import { ModelViewer } from '/src/viewers/ModelViewer.js';

        const models = {
            'example': {
                url: '/models/example.glb',
                name: 'Example Model',
                credit: 'Model Creator'
            }
        };

        const viewer = new ModelViewer(document.body, {
            models: models,
            autoLoadFirst: true,
            showInfo: true
        });

        viewer.on('model-loaded', ({ config }) => {
            console.log(`${config.name} is ready!`);
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
        import { ModelViewer } from '/src/viewers/ModelViewer.js';

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

### Minimal Viewer Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Minimal Viewer</title>
    <link rel="stylesheet" href="/src/styles/theme.css">
</head>
<body>
    <script type="module">
        import { ModelViewer } from '/src/viewers/ModelViewer.js';

        // Minimal viewer with no UI
        const viewer = new ModelViewer(document.body, {
            models: {
                'model': {
                    url: '/models/model.glb',
                    name: 'Model'
                }
            },
            autoLoadFirst: true,
            showLoadingIndicator: false,
            showStatus: false,
            showInfo: false
        });
    </script>
</body>
</html>
```

### Multiple Models Example

```javascript
import { ModelViewer } from '/src/viewers/ModelViewer.js';

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
    viewer.switchModel('ship1');
});

document.getElementById('ship2-btn').addEventListener('click', () => {
    viewer.switchModel('ship2');
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
import { ModelViewer } from '/src/viewers/ModelViewer.js';

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

    switchModel(modelKey) {
        return this.viewer.switchModel(modelKey);
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
import { ModelViewer } from '/src/viewers/ModelViewer.js';
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

// New BelowJS code
const viewer = new ModelViewer(container, {
    models: { 'my-model': { url: 'model.glb', name: 'My Model' } },
    autoLoadFirst: true
});
```

### From model-viewer

```html
<!-- Old model-viewer -->
<model-viewer src="model.glb" camera-controls></model-viewer>

<!-- New BelowJS -->
<div id="viewer"></div>
<script type="module">
    import { ModelViewer } from '/src/viewers/ModelViewer.js';
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
