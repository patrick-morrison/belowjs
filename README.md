# BelowJS

[![npm version](https://badge.fury.io/js/belowjs.svg)](https://www.npmjs.com/package/belowjs)
[![npm downloads](https://img.shields.io/npm/dm/belowjs.svg)](https://www.npmjs.com/package/belowjs)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

📖 **[Full Documentation & Examples at belowjs.com](https://belowjs.com)**

> **Note:** This is a pre-release version (`1.0.0-rc.3`). The API is stable, but please be aware that minor changes may occur before the final 1.0.0 release.

**Dive Shipwrecks in Virtual Reality**

Setup virtual dives in minutes. Full control over your underwater photogrammetry models. Web and virtual reality as first class technologies.

## About

BelowJS is a 3D model viewer built on Three.js that allows communities to share their underwater photogrammetry models on the web and in VR. 

Virtual reality and desktop modes are tightly integrated with a measurement system, so archaeologists can research sites with confidence. An optional dive mode lets audiences feel the wrecks as they are - optimised for the Meta Quest 3 headset.

BelowJS can be deployed statically or as part of a system. A simple GitHub page can share optimised models for free, and will last forever with little maintenance. Conversely, it can power dynamic systems like BelowVR, which lets teams virtually dive together.

Sensible defaults make your work look beautiful. We have tools to help you optimise, scale and annotate them.

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
            url: 'shipwreck.glb'
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
            "belowjs": "https://cdn.jsdelivr.net/npm/belowjs@1.0.0-rc.3/dist/belowjs.js"
        }
    }
    </script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/belowjs@1.0.0-rc.3/dist/belowjs.css">
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
                    url: 'shipwreck.glb'
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

Three different examples are included:

```bash
git clone https://github.com/patrick-morrison/belowjs
cd belowjs
npm install && npm run build
```

- `npm run dev` — Full-featured viewer with model selection and all systems enabled
- `npm run dev:dragdrop` — File loader with drag-and-drop GLB support and custom UI elements
- `npm run dev:embed` — Lightweight viewer designed for iframe embedding

### Live Examples

- [Basic Viewer](https://patrick-morrison.github.io/belowjs/examples/basic/) — Full-featured multi-model viewer
- [Drag & Drop](https://patrick-morrison.github.io/belowjs/examples/dragdrop/) — File loader with custom UI
- [Embed Viewer](https://patrick-morrison.github.io/belowjs/examples/embed/) — Lightweight iframe-ready viewer

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
  models: { 'ship': { url: 'model.glb', name: 'Historic Ship' } }
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
  enableDiveSystem: true
});
```

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