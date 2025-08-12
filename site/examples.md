# Examples

Explore live interactive demos to see BelowJS in action. Take these open examples and have your own site up and running in minutes.

<div style="margin: 2rem 0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <iframe 
    src="https://patrick-morrison.github.io/belowjs/examples/embed/viewer.html?model=../basic/models/unknown.glb&name=SS%20Timaru&credit=WreckSploration&cx=34.226&cy=10.354&cz=2.12&tx=10.959&ty=-1.07&tz=2.247&bg=%23f8f9fa" 
    width="100%" 
    height="500" 
    frameborder="0"
    title="BelowJS Embed Viewer Example"
    loading="lazy">
  </iframe>
</div>
<p style="text-align: center; font-size: 0.85em; color: #666; margin-top: 0.5rem;">↑ This is the embed viewer in action</p>

## Basic Viewer
Full-featured multi-model viewer with VR support, measurement tools, and dive mode.

**[View Live Demo](https://patrick-morrison.github.io/belowjs/examples/basic/)** | **[Source Code](https://github.com/patrick-morrison/belowjs/tree/main/examples/basic)**

```bash
npm run dev        # or npm run dev:basic
```

## Drag & Drop Loader
File loader with drag-and-drop GLB support and custom UI elements.

**[View Live Demo](https://patrick-morrison.github.io/belowjs/examples/dragdrop/)** | **[Source Code](https://github.com/patrick-morrison/belowjs/tree/main/examples/dragdrop)**

```bash
npm run dev:dragdrop
```

## Embed Viewer
Lightweight viewer designed for iframe embedding with URL parameter configuration.

**[View Live Demo](https://patrick-morrison.github.io/belowjs/examples/embed/)** | **[Source Code](https://github.com/patrick-morrison/belowjs/tree/main/examples/embed)**

```bash
npm run dev:embed
```

## Running locally

```bash
git clone https://github.com/patrick-morrison/belowjs
cd belowjs
npm install && npm run build
npm run dev
```

## Simplest possible BelowJS

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
        
        new ModelViewer('body', {
            models: { 'ship': { url: 'model.glb' } }
        });
    </script>
</body>
</html>
```

## With all features enabled

```javascript
import { ModelViewer } from 'belowjs';

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

## URL parameter embedding

The embed example supports URL parameters for dynamic configuration:

```html
<iframe 
  src="viewer.html?model=wreck.glb&name=Historic%20Wreck&cx=10&cy=5&cz=15"
  width="800" height="600">
</iframe>
```

## Static deployment

Deploy on GitHub Pages or any static hosting:

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

