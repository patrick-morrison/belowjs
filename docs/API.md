# BelowJS API Documentation

**API reference for the BelowJS 3D model viewer library**

*Version 0.9.9*

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [ModelViewer Class](#modelviewer-class)
3. [VR Support](#vr-support)
4. [Measurement System](#measurement-system)
5. [Dive System](#dive-system)
6. [Configuration](#configuration)
7. [Events](#events)
8. [Methods](#methods)
9. [Theming](#theming)
10. [Advanced Usage](#advanced-usage)

---

## Quick Start

To get started, include the BelowJS stylesheet and script in your HTML file. Then, create a container element and instantiate the `ModelViewer`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>BelowJS Viewer</title>
    <link rel="stylesheet" href="/dist/belowjs.css">
</head>
<body>
    <div id="viewer-container" style="position: fixed; inset: 0;"></div>

    <script type="module">
        import { ModelViewer } from '/dist/belowjs.js';
        
        const viewer = new ModelViewer('#viewer-container', {
            models: {
                'wreck': {
                    url: 'path/to/your/model.glb',
                    name: 'My Model'
                }
            },
            enableVR: true
        });
    </script>
</body>
</html>
```

### Model Configuration

You can define multiple models and their initial positions for both desktop and VR.

```javascript
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

const viewer = new ModelViewer('#viewer-container', {
  models: models,
  enableVR: true,
  initialModel: 'my-model' // Specify which model to load first
});
```

---

## ModelViewer Class

The `ModelViewer` is the main high-level class for creating 3D model viewers with a complete user interface.

### Constructor

```javascript
new ModelViewer(container, options)
```

- **`container`** (Element | string): The DOM element or CSS selector for the viewer.
- **`options`** (Object): A configuration object. See [Configuration](#configuration) for details.

The viewer injects its UI into the `container`. For proper fullscreen and UI element positioning, the container should have `position: relative` or `position: fixed`.

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

BelowJS provides built-in WebXR support for immersive VR experiences.

### Enabling VR

To enable VR, set `enableVR: true` in the options. You can also enable VR-specific audio.

```javascript
const viewer = new ModelViewer(container, {
  models: { /* ... */ },
  enableVR: true,
  enableVRAudio: true, // Optional: enables movement and ambient sounds in VR
  audioPath: './sound/' // Path to audio files (dpv.ogg, dpvhigh.ogg, vrambience.ogg)
});
```

### VR Model Positioning

You can specify different starting positions for desktop and VR.

```javascript
const models = {
  'wreck-model': {
    url: 'models/wreck.glb',
    name: 'Shipwreck',
    initialPositions: {
      // Desktop orbit camera
      desktop: {
        camera: { x: 33, y: 36, z: -83 },
        target: { x: -3, y: -6, z: -24 }
      },
      // VR player rig (dolly)
      vr: {
        dolly: { x: 0, y: 2, z: 15 },
        rotation: { x: 0, y: 0, z: 0 }
      }
    }
  }
};
```

### VR Controls

- **Left Stick**: Move forward/backward, strafe left/right.
- **Right Stick**: Turn left/right, move up/down.
- **Grip Buttons**: Hold for a 3x speed boost.
- **A/X Buttons**: Toggle between Dive and Survey modes.

---

## Measurement System

The measurement system allows users to measure distances on models in both desktop and VR. It is **enabled by default**.

### Disabling Measurement

```javascript
const viewer = new ModelViewer(container, {
  models: models,
  enableMeasurement: false // Disable the measurement system
});
```

### Usage

- **Desktop**: Click the measurement icon to toggle the mode, then click two points on the model.
- **VR**: Use the controller triggers to place measurement points.

---

## Dive System

The Dive System creates an immersive underwater effect with particles, lighting, and a dive torch. It is **enabled by default**.

### Disabling Dive System

```javascript
const viewer = new ModelViewer(container, {
  models: models,
  enableDiveSystem: false // Disable the dive system
});
```

### Modes

- **Survey Mode**: Bright, even lighting for clear model inspection.
- **Dive Mode**: Darker, atmospheric lighting with a user-controlled torch.

The mode can be toggled via a UI switch or with the A/X buttons on a VR controller.

---

## Configuration

The `ModelViewer` constructor accepts a detailed options object.

| Option                  | Type      | Default                               | Description                                                                                             |
|-------------------------|-----------|---------------------------------------|---------------------------------------------------------------------------------------------------------|
| `models`                | `Object`  | `{}`                                  | An object where keys are model IDs and values are model configuration objects.                          |
| `initialModel`          | `string`  | `null`                                | The key of the model to load first. If `null`, the first model in the `models` object is used.          |
| `autoLoadFirst`         | `boolean` | `true`                                | If `true`, automatically loads the `initialModel` or the first model.                                   |
| `showLoadingIndicator`  | `boolean` | `true`                                | If `true`, displays a loading spinner while models are loading.                                         |
| `showStatus`            | `boolean` | `false`                               | If `true`, shows a status bar with messages. (Primarily for debugging).                                   |
| `showInfo`              | `boolean` | `false`                               | If `true`, displays an information panel with the model name and credit.                                |
| `enableVR`              | `boolean` | `false`                               | If `true`, enables the VR button and all WebXR-related features.                                        |
| `enableVRAudio`         | `boolean` | `false`                               | If `true`, enables ambient and movement audio during a VR session. Requires `enableVR`.                 |
| `audioPath`             | `string`  | `'./sound/'`                          | The path to the directory containing VR audio files.                                                    |
| `enableMeasurement`     | `boolean` | `true`                                | If `true`, enables the distance measurement system.                                                     |
| `measurementTheme`      | `string`  | `'dark'`                              | Sets the theme for the measurement UI. Can be `'dark'` or `'light'`.                                    |
| `showMeasurementLabels` | `boolean` | `false`                               | If `true`, measurement labels are always visible on desktop. In VR, they are always shown.              |
| `enableDiveSystem`      | `boolean` | `true`                                | If `true`, enables the underwater dive simulation with lighting and particle effects.                   |
| `showDiveToggle`        | `boolean` | `true`                                | If `true`, shows the UI toggle for switching between Dive and Survey modes.                             |
| `enableFullscreen`      | `boolean` | `false`                               | If `true`, displays a button to toggle fullscreen mode for the viewer container.                        |
| `enableVRComfortGlyph`  | `boolean` | `false`                               | If `true`, shows a UI element for toggling VR comfort settings (vignette).                              |
| `initialPositions`      | `Object`  | `null`                                | Overrides the `initialPositions` of the loaded model.                                                   |
| `viewerConfig`          | `Object`  | `{ scene: { background: ... } }`      | Advanced configuration passed directly to the underlying `BelowViewer`. See [Advanced Usage](#advanced-usage). |

---

## Events

Listen for events using the `on()` method.

```javascript
viewer.on('model-loaded', (data) => {
  console.log('Model loaded:', data.model);
});
```

| Event                   | Payload                               | Description                                                                    |
|-------------------------|---------------------------------------|--------------------------------------------------------------------------------|
| `initialized`           | `{}`                                  | Fired when the core `BelowViewer` has been initialized.                          |
| `model-load-start`      | `{ key, url }`                        | Fired when a model begins to load.                                             |
| `model-load-progress`   | `{ progress }`                        | Fired periodically during model download, with progress from 0 to 1.           |
| `model-loaded`          | `{ key, model }`                      | Fired when a model has been successfully loaded and added to the scene.        |
| `model-load-error`      | `{ key, error }`                      | Fired if an error occurs while loading a model.                                |
| `vr-session-start`      | `{}`                                  | Fired when a WebXR session is started.                                         |
| `vr-session-end`        | `{}`                                  | Fired when a WebXR session ends.                                               |
| `vr-mode-toggle`        | `{}`                                  | Fired when the VR dive/survey mode is toggled.                                 |
| `vr-movement-start`     | `{}`                                  | Fired when the user starts moving in VR.                                       |
| `vr-movement-stop`      | `{}`                                  | Fired when the user stops moving in VR.                                        |
| `vr-movement-update`    | `{ speed, boostLevel }`               | Fired continuously during VR movement.                                         |

---

## Methods

| Method                  | Parameters                            | Description                                                                    |
|-------------------------|---------------------------------------|--------------------------------------------------------------------------------|
| `loadModel`             | `key` (string)                        | Loads a model from the `models` configuration using its key.                   |
| `getCurrentModel`       |                                       | Returns the currently loaded model object.                                     |
| `resetCamera`           |                                       | Resets the camera to the initial position of the current model.                |
| `focusOn`               | `point` (Object), `distance` (num)    | Moves the camera to focus on a specific 3D point from a given distance.        |
| `getVRManager`          |                                       | Returns the `VRManager` instance.                                              |
| `dispose`               |                                       | Cleans up resources, removes UI, and disposes of the `BelowViewer`.            |

---

## Theming

The UI components respect a dark and light theme. The measurement panel can be themed via the `measurementTheme` option. Other UI elements will adapt to CSS variables defined on a parent element or the root.

```css
:root {
  --theme-bg-color: #ffffff;
  --theme-text-color: #333333;
  --theme-border-color: #dddddd;
  --theme-accent-color: #007bff;
}

.dark-theme {
  --theme-bg-color: #1a1a1a;
  --theme-text-color: #f0f0f0;
  --theme-border-color: #444444;
  --theme-accent-color: #58a6ff;
}
```

---

## Advanced Usage

For full control over the scene, camera, and rendering loop, you can use the core `BelowViewer` class, which `ModelViewer` wraps.

```javascript
import { BelowViewer } from '/dist/belowjs.js';

const viewer = new BelowViewer(container, {
  scene: {
    background: { type: 'color', value: '#041729' }
  },
  vr: { enabled: true }
});

viewer.loadModel('model.glb').then(model => {
  // Manually work with the loaded model
});
```

You can access the `BelowViewer` instance from a `ModelViewer` by calling `viewer.getBelowViewer()`.


