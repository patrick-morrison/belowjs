# BelowJS

[![npm version](https://badge.fury.io/js/belowjs.svg)](https://www.npmjs.com/package/belowjs)
[![npm downloads](https://img.shields.io/npm/dm/belowjs.svg)](https://www.npmjs.com/package/belowjs)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

📖 **[Full Documentation & Examples](https://patrick-morrison.github.io/belowjs/)**

> **Current Version:** `1.10.0` - First-class static, authored, collaborative, and XR annotations with model-local anchoring.

**Dive Shipwrecks in Virtual Reality**

Setup virtual dives in minutes. Full control over your underwater photogrammetry models. Web and virtual reality as first class technologies.

## About

BelowJS is a 3D model viewer built on Three.js that allows communities to share their underwater photogrammetry models on the web and in VR. 

Virtual reality and desktop modes are tightly integrated with a measurement system, so archaeologists can research sites with confidence. An optional dive mode lets audiences feel the wrecks as they are - optimised for the Meta Quest 3 headset.

BelowJS can be deployed statically or as part of a system. A simple GitHub page can share optimised models for free, and will last forever with little maintenance. Conversely, it can power dynamic systems like BelowVR, which lets teams virtually dive together.

Sensible defaults make your work look beautiful. The drag-and-drop viewer helps you inspect, measure and correct model scale before building your own viewer.

The code is yours, as long as you share what you do with it.

## Quick Start

### With npm

```bash
npm install belowjs three
```

```javascript
import { ModelViewer } from 'belowjs';
import 'belowjs/dist/belowjs.css';

const config = {
    models: {
        'kxi': {
            url: 'shipwreck.glb',
            measurable: true // optional, defaults to true
        }
    }
};

const viewer = new ModelViewer('body', config);
```

### With CDN

This gives you a complete VR-ready 3D viewer with dive lighting, measurement tools, and mode switching enabled by default.

```html
<!DOCTYPE html>
<html>
<head>
    <script type="importmap">
    {
        "imports": {
            "three": "https://cdn.jsdelivr.net/npm/three@0.179.1/+esm",
            "belowjs": "https://cdn.jsdelivr.net/npm/belowjs@1.10.0/dist/belowjs.js"
        }
    }
    </script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/belowjs@1.10.0/dist/belowjs.css">
    <style>
        body, html { margin: 0; padding: 0; overflow: hidden; }
    </style>
</head>
<body>
    <script type="module">
        import { ModelViewer } from 'belowjs';
        
        const config = {
            models: {
                'kxi': {
                    url: 'shipwreck.glb',
                    measurable: true // optional, defaults to true
                }
            }
        };
        
        const viewer = new ModelViewer('body', config);
    </script>
</body>
</html>
```

## What it does

- Loads and displays GLB 3D models in a web browser
- Works with VR headsets through WebXR, optimised for Quest 3
- Provides measurement tools for both desktop and VR environments
- Includes underwater lighting simulation and particle effects
- Supports multiple models with dropdown switching
- Can be embedded in iframes with URL parameter configuration 

## Examples

Examples are included:

```bash
git clone https://github.com/patrick-morrison/belowjs
cd belowjs
npm install && npm run build
```

- `npm run dev` — Full-featured viewer with model selection and all systems enabled
- `npm run dev:dragdrop` — Load a GLB, inspect measurements, then right-click to create or drop an annotations JSON
- `npm run dev:embed` — Lightweight viewer designed for iframe embedding
- `npm run dev:tileset` — 3D Tiles streaming example for large datasets

### Live Examples

- [Basic Viewer](https://patrick-morrison.github.io/belowjs/examples/basic/) — Full-featured multi-model viewer
- [Drag & Drop](https://patrick-morrison.github.io/belowjs/examples/dragdrop/) — Load a GLB, inspect measurements, then right-click to create or drop an annotations JSON
- [Embed Viewer](https://patrick-morrison.github.io/belowjs/examples/embed/) — Lightweight iframe-ready viewer
- [Tileset Viewer](https://patrick-morrison.github.io/belowjs/examples/tileset/) — 3D Tiles streaming example

## Installation

### npm
```bash
npm install belowjs three
```

### Manual Installation
If you prefer to install manually, clone the repository and build the distribution files:
```bash
git clone https://github.com/patrick-morrison/belowjs
cd belowjs
npm install
npm run build
```

This builds the necessary files into the `/dist` directory:
- `belowjs.js` (~419 KB) — ES modules version  
- `belowjs.css` (~20 KB) — Complete stylesheet

## Deployment

Deploy statically on your server, integrate with JS/ES modules in an app, or simplest of all - GitHub Pages:

```
shipwrecks-vr/
├── index.html          # Main HTML with BelowJS
├── belowjs.js          # Download from releases
├── belowjs.css         # Download from releases
└── models/
    ├── kxi.glb
    └── kozvii.glb
```

Push to GitHub, enable Pages in Settings → live in minutes.


## Usage

### Basic Setup
```javascript
import { ModelViewer } from 'belowjs';
import 'belowjs/dist/belowjs.css';

new ModelViewer('#container', {
  models: {
    'ship': { url: 'model.glb', name: 'Historic Ship', measurable: true }
  }
});
```

### Per-Model Measurement Availability
```javascript
new ModelViewer('#container', {
  models: {
    'draftSite': {
      url: 'draft-site.glb',
      name: 'Draft Site',
      measurable: false // disable measurements for uncertain scale
    }
  }
});
```

### Per-model annotations

Annotations are read-only by default. Point a model at a portable version 1 JSON document, or pass the document inline. The drag-and-drop viewer opts into authoring and adds a compact JSON download action only after an annotation exists; ordinary viewers and hosted workspaces do not show export UI. Without a persistence adapter, author-mode edits remain in memory until `download()` is called. New documents declare `layer.coordinate_space: "model"`; legacy version 1 documents without this metadata are interpreted as world space and normalized against the active model when they load.

```javascript
const viewer = new ModelViewer('#container', {
  annotations: {
    mode: 'view',
    occlusionFade: true,
    diveLighting: true,
    xr: { enabled: true, interaction: 'select' }
  },
  models: {
    wreck: {
      url: './models/wreck.glb',
      annotations: './annotations/wreck.annotations.json',
      annotationsVisible: true
    }
  }
});

viewer.annotations.setMode('author');
viewer.annotations.download();
```

The stable facade also provides `load`, `clear`, `getDocument`, `setVisible`, `setAdapter`, CRUD operations, scale-bar operations, selection, follow-mode presence, and transient-UI dismissal. Set `annotations.enabled: false` for a hard opt-out. A viewer can explicitly request a built-in export glyph with `showExport: true`, but it is off by default.

In immersive VR and AR, annotations keep the desktop visual language: model-attached numbered blue badges maintain a readable angular size, and the selected annotation opens in a dark camera-facing detail card. Point directly at a badge to reveal the contextual controller or hand ray, then trigger to inspect it. Annotation hits are isolated from the controller-proximity measurement orb.

Collaborative hosts provide persistence through a small transport adapter; BelowJS remains responsible for state and presentation:

```javascript
viewer.annotations.setAdapter({
  setContext({ modelKey, modelConfig }) {},
  requestSnapshot() {},
  send(operation) {},
  subscribe(listener) { return () => {}; },
  dispose() {}
});
```

Adapter listeners receive generic `snapshot`, `operation`, `preview`, `presence`, and `error` events. Static sites omit the adapter entirely.

### Correcting Model Scale

In the [drag-and-drop viewer](https://patrick-morrison.github.io/belowjs/examples/dragdrop/), make a measurement across a known distance, then right-click its measurement box on desktop or long press it on mobile. Enter the correct distance and BelowJS will rescale the model around its original origin. The applied scale is shown so you can use the same factor when preparing the final model.

Scale correction is enabled by default. Disable it for a viewer with:

```javascript
new ModelViewer('#container', {
  enableMeasurementScaleCalibration: false
});
```

### With Camera Positioning and All Features
```javascript
new ModelViewer(document.body, {
  models: {
    'wreck': {
      url: 'shipwreck.glb',
      name: 'Historic Shipwreck',
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
  enableVR: true,
  enableMeasurement: true,
  enableDiveSystem: true,
  enableScreenshot: true
});
```

Enable `enableScreenshot` to add a button that captures the scene without UI overlays.

### 3D Tiles (Experimental)
BelowJS can stream 3D Tiles datasets for large environments. Tilesets still require a `tileset.json` root plus streamed tile content hosted alongside it. Point a model at the `tileset.json` and set `type: 'tileset'`:

```javascript
new ModelViewer('#container', {
  models: {
    'site': {
      url: 'https://example.com/tiles/site/tileset.json',
      type: 'tileset',
      name: 'Survey Site',
      autoCenter: true,
      maxTriangles: 1000000, // adaptive LOD target for VR
      errorTarget: 16,
      loadAncestors: true
    }
  }
});
```

Ancestor fallback keeps a coarse tile visible until its detailed children are ready, avoiding distracting holes during movement. BelowJS automatically uses a smaller texture-transcoding worker pool on standalone headsets and a larger pool on PCVR; set `ktxWorkerLimit` only when profiling a specific deployment.

### URL Parameter Integration
The embed example supports URL parameters for dynamic configuration:

```html
<iframe 
  src="viewer.html?model=wreck.glb&name=Historic%20Wreck&cx=10&cy=5&cz=15"
  width="800" height="600">
</iframe>
```

## Development

```bash
npm run build    # Build distribution files
npm run dev      # Start development server
```

The examples load from `/dist/`. Run `npm run build` once before first testing to generate `/dist/`. During `npm run dev`, source edits will auto-rebuild the library.

## License

GPL-3.0-or-later — See [LICENSE](LICENSE) file.

---

Created by [Patrick Morrison](https://padmorrison.com).

Built for underwater archaeology. Models courtesy of [WreckSploration](https://wrecksploration.au).
