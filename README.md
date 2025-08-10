# BelowJS

A Three.js-based library for viewing 3D models with WebXR support and measurement tools. Built specifically for underwater archaeology but works with any GLB/GLTF models.

```html
<link rel="stylesheet" href="/dist/belowjs.css">
<script type="module">
  import { ModelViewer } from '/dist/belowjs.es.js';
  
  new ModelViewer(document.body, {
    models: { 'wreck': { url: 'model.glb', name: 'Historic Wreck' } },
    enableVR: true,
    enableMeasurement: true,
    enableDiveSystem: true
  });
</script>
```

This gives you a complete 3D viewer with VR support, precision measurements, and underwater lighting effects.

## What it does

- Loads and displays GLB/GLTF 3D models in a web browser
- Works with VR headsets (Quest 2, Quest 3) through WebXR
- Provides measurement tools for both desktop and VR environments
- Includes underwater lighting simulation and particle effects
- Supports multiple models with dropdown switching
- Can be embedded in iframes with URL parameter configuration

## Examples

Three different implementations are included:

```bash
git clone https://github.com/patrick-morrison/belowjs
cd belowjs
npm install && npm run build
```

- `npm run dev` — Full-featured viewer with model selection and all systems enabled
- `npm run dev:dragdrop` — File loader with drag-and-drop GLB support
- `npm run dev:embed` — Lightweight viewer designed for iframe embedding

## Installation

BelowJS can be installed via npm or by cloning the repository.

### NPM
```bash
npm install belowjs
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
- `belowjs.css` (~21 KB) — Complete stylesheet
- `belowjs.es.js` (~420 KB) — ES modules version  
- `belowjs.umd.js` (~318 KB) — Universal module format

Note: Three.js is a peer dependency and must be installed separately. For ES modules, import Three.js in your application. For the UMD build, ensure `THREE` is available globally by including it via a `<script>` tag.

## Usage

### Basic Setup
```javascript
import { ModelViewer } from 'belowjs';
import 'belowjs/dist/belowjs.css';

new ModelViewer('#container', {
  models: { 'ship': { url: 'model.glb', name: 'Historic Ship' } }
});
```

### With Camera Positioning
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

## Documentation

See [docs/API.md](docs/API.md) for complete API documentation and configuration options, including enabling optional VR audio.

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

Built for underwater archaeology. Models courtesy of [WreckSploration](https://wrecksploration.com).