# BelowJS

A modular Three.js library for creating 3D model viewers with WebXR support and underwater exploration capabilities. Designed for underwater shipwreck exploration applications.

## Features

- **VR Support**: WebXR implementation with Quest device optimizations and locomotion systems
- **VR Audio System**: Optional immersive audio with movement sounds (can be disabled)
- **Cylindrical Stereo Display**: Experimental support for stereoscopic cylindrical screens
- **Measurement System**: Distance measurement tools for both VR and desktop environments
- **Dive/Survey Modes**: Configurable lighting and particle systems for underwater simulation
- **VR Comfort**: Motion sickness mitigation through teleportation and comfort settings
- **Modular Architecture**: Composable API with configurable component systems
- **UI Themes**: Dark and light theme support with customizable interfaces
- **Interactive Controls**: Camera controls with focus targeting and orbit navigation
- **Mobile Support**: Touch-optimized controls for mobile devices
- **Performance Optimized**: Efficient model loading and rendering pipeline

## Installation

### Build Requirements
Build the production bundles:

```bash
npm run build
```

This generates:
- **CSS Bundle**: `dist/belowjs.css` (19.7 kB) - Complete stylesheet
- **ES Module**: `dist/belowjs.es.js` (400.9 kB) - Modern browser support  
- **UMD Bundle**: `dist/belowjs.umd.js` (311.5 kB) - Script tag compatibility

### Future NPM Installation
```bash
npm install belowjs  # Not yet published
```

## Quick Start

### ES Modules with Production CSS

```html
<!DOCTYPE html>
<html>
<head>
    <title>3D Model Viewer</title>
    <link rel="stylesheet" href="/dist/belowjs.css">
</head>
<body>
    <script type="module">
        import { ModelViewer } from '/dist/belowjs.es.js';

        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        document.body.appendChild(container);

        const viewer = new ModelViewer(container, {
            models: {
                'model-key': {
                    url: 'path/to/model.glb',
                    name: 'Model Name',
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
            autoLoadFirst: true,
            enableVR: true,
            enableVRAudio: true,             // Optional VR audio system (default: true)
            enableMeasurement: true,
            enableDiveSystem: true,
            enableVRComfortGlyph: true
        });
    </script>
</body>
</html>
```

### Development Workflow

1. Modify source files in `/src/`
2. Build production bundles: `npm run build`
3. Test with examples: `npm run dev`

Examples use production builds, so rebuild after source changes.

## Documentation

- [API Reference](docs/API.md) - Complete API documentation
- [Development Plan](BELOWJS_LIBRARY_PLAN.md) - Architecture and roadmap
- [Examples](examples/) - Implementation examples

## Examples

- [Basic](examples/basic/) - Full-featured viewer implementation with model selector and all systems
- [Cylinder Display](examples/cylinder/) - Stereoscopic cylindrical panorama with measurement tools and model selector
- [Drag & Drop](examples/dragdrop/) - File-focused interface with drag & drop, measurement tools, and mode toggle
- [Embed](examples/embed/) - Embeddable measurement viewer with URL parameter support

### URL Parameter Integration

The Embed example includes URL parameter support for easy website integration:

```html
<iframe src="viewer.html?model=path/to/model.glb&name=Model%20Name&credit=Attribution"></iframe>
```

**Supported Parameters:**
- `model` - Path to GLB model file
- `name` - Display name for the model
- `credit` - Attribution text (optional)
- `cx`, `cy`, `cz` - Camera position coordinates
- `tx`, `ty`, `tz` - Camera target coordinates  
- `bg` - Background color (hex format: `%23ffffff`)

**Example with full configuration:**
```html
<iframe 
    src="viewer.html?model=wreck.glb&name=Historic%20Wreck&credit=Museum&cx=10&cy=5&cz=15&tx=0&ty=0&tz=0&bg=%23f8f9fa"
    width="100%" 
    height="500px" 
    frameborder="0">
</iframe>
```

This makes the viewer highly extensible for embedding different models across website pages without code changes.

## Configuration Options

### VR Audio System

BelowJS includes an optional VR audio system that provides immersive movement sounds. This can be disabled to prevent 404 errors when audio files are not available:

```javascript
const viewer = new ModelViewer(container, {
  models: models,
  enableVR: true,
  enableVRAudio: false,        // Disable VR audio system
  autoLoadFirst: true
});
```

**When to disable VR audio:**
- Measurement-focused viewers that don't need audio
- Embedding scenarios where audio files are not available
- Custom audio implementations
- Reducing bundle size and dependencies

**Required audio files (when enabled):**
- `dpv.ogg` - Base movement sound
- `dpvhigh.ogg` - High-speed movement sound
- `vrambience.ogg` - Background ambience

**Default behavior:** VR audio is enabled by default when VR is enabled.

### Cylindrical Stereo Display

BelowJS includes an experimental `CylindricalStereoRenderer` for driving stereoscopic cylindrical screens. It captures a cube map for each eye and unwraps it to a side-by-side cylindrical panorama.

```javascript
import { CylindricalStereoRenderer } from 'belowjs';

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();

const cylinder = new CylindricalStereoRenderer(renderer, scene);
function animate() {
  cylinder.render(camera);
  requestAnimationFrame(animate);
}
animate();
```

This output can be sent directly to a cylindrical display that expects left and right eye images.

#### Displaying on Hardware

1. **Connect the display** – attach your stereoscopic cylinder screen as a secondary monitor.
2. **Match the resolution** – set the renderer or browser window size to the pixel resolution of the display (`renderer.setSize(width, height)`).
3. **Open the cylinder example** – run `npm run dev` and navigate to [`/examples/cylinder/`](examples/cylinder/).
4. **Move to the cylinder display** – drag the browser window to the cylinder screen and press `F11` to enter full screen.
5. **Feed each eye** – the left half of the canvas is the left eye and the right half is the right eye. Configure your display or projector setup to map each half to the corresponding eye.
6. **Center the viewer** – position the audience at the center of the cylinder for correct stereo alignment.

These steps output a live side-by-side cylindrical panorama that can be used directly on compatible hardware.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## License

GPLv3 License - see LICENSE file for details.

## Credits

Developed for underwater shipwreck exploration applications. Models courtesy of WreckSploration.