# BelowJS

A modular Three.js library for creating 3D model viewers with WebXR support and underwater exploration capabilities. Designed for underwater shipwreck exploration applications.

## Features

- **VR Support**: WebXR implementation with Quest device optimizations and locomotion systems
- **Measurement System**: Distance measurement tools for both VR and desktop environments
- **Dive/Survey Modes**: Configurable lighting and particle systems for underwater simulation
- **VR Comfort**: Motion sickness mitigation through teleportation and comfort settings
- **Modular Architecture**: Composable API with configurable component systems
- **UI Themes**: Dark and light theme support with customizable interfaces
- **Interactive Controls**: Camera controls with focus targeting and orbit navigation
- **Mobile Support**: Touch-optimized controls for mobile devices
- **TypeScript Ready**: Comprehensive type definitions and documentation
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
        import { ModelViewer } from '/src/index.js';

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

- [Basic Viewer](examples/basic-viewer/) - Full-featured viewer implementation
- [Dark Minimal](examples/dark-minimal/) - Minimal interface configuration
- [Light Measurement](examples/light-measurement/) - Measurement-focused interface

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

MIT License - see LICENSE file for details.

## Credits

Developed for underwater shipwreck exploration applications. Models courtesy of WreckSploration.