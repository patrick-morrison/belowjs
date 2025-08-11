---
layout: doc
sidebar: false
prev: false
next: false
---

# Examples

BelowJS is open source - take these examples and build virtual dives in minutes. Each includes complete source code and can be deployed to GitHub Pages for free.

## Live Examples

**[Basic Viewer](https://patrick-morrison.github.io/belowjs/examples/basic/)** — Full-featured multi-model viewer with VR support, measurement tools, and dive mode. | **[Source Code](https://github.com/patrick-morrison/belowjs/tree/main/examples/basic)**

**[Drag & Drop](https://patrick-morrison.github.io/belowjs/examples/dragdrop/)** — File loader with drag-and-drop GLB support and custom UI elements. | **[Source Code](https://github.com/patrick-morrison/belowjs/tree/main/examples/dragdrop)**

**[Embed Viewer](https://patrick-morrison.github.io/belowjs/examples/embed/)** — Lightweight iframe-ready viewer for integration. | **[Source Code](https://github.com/patrick-morrison/belowjs/tree/main/examples/embed)**

## Quick Setup

### Complete HTML Example

This gives you a full-featured model viewer with VR support, measurement tools, and dive mode enabled by default.

```html
<!DOCTYPE html>
<html>
<head>
    <script type="importmap">
    {
        "imports": {
            "three": "https://cdn.jsdelivr.net/npm/three@0.179.1/+esm",
            "belowjs": "https://cdn.jsdelivr.net/npm/belowjs@1.0.0-rc.1/dist/belowjs.js"
        }
    }
    </script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/belowjs@1.0.0-rc.1/dist/belowjs.css">
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

### Advanced Example with Camera Positioning

For more control over camera positioning and multiple models:

```javascript
const models = {
    'kxi': { 
        url: './models/kxi.glb', 
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
        url: './models/sesa.glb', 
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
    }
};

const viewer = new ModelViewer('#container', {
    enableVR: true,
    showInfo: true,
    models: models,
    enableVRComfortGlyph: true,
    enableFullscreen: true,
    enableVRAudio: true,
    audioPath: './sound/',
    viewerConfig: {
        scene: {
            background: '#001122'
        }
    },
    initialModel: 'kxi',
    initialPositions: models['kxi'].initialPositions
});
```

### File Structure for Deployment

Deploy statically on your server or GitHub Pages:

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
