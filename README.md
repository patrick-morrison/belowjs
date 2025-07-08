# BelowJS

A modern, modular Three.js library for creating immersive 3D model viewers with VR support. Originally designed for underwater shipwreck exploration, BelowJS provides a clean, composable API for any 3D model viewing application.

## ✨ Features

- **🎛️ Modular Architecture**: Clean, composable API with configurable components
- **🎨 Beautiful UI**: Dark/light themes with minimal and full-featured UI options
- **🖱️ Interactive Controls**: Intuitive camera controls with double-click-to-focus
- **📱 Mobile Ready**: Touch-optimized controls for mobile devices
- **🔧 Developer Friendly**: TypeScript-ready with comprehensive documentation
- **⚡ Performance Optimized**: Efficient model loading and rendering

## 📦 Installation

BelowJS is distributed as an npm package with Three.js listed as a peer
dependency:

```bash
npm install belowjs three
```

After installation you can import the library into your project:

```javascript
import { ModelViewer } from 'belowjs';
```

## 🚀 Quick Start

```html
<!DOCTYPE html>
<html>
<head>
    <title>My 3D Viewer</title>
    <link rel="stylesheet" href="path/to/belowjs/src/styles/theme.css">
</head>
<body>
    <script type="module">
        import { ModelViewer } from 'belowjs';

        const viewer = new ModelViewer(document.body, {
            models: {
                'my-model': {
                    url: 'path/to/model.glb',
                    name: 'My 3D Model'
                }
            },
            autoLoadFirst: true
        });
    </script>
</body>
</html>
```

## 🌟 Detailed Example

A more complete setup with multiple models and event handling:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>BelowJS Demo</title>
    <link rel="stylesheet" href="path/to/belowjs/src/styles/theme.css">
</head>
<body>
    <select id="model-select"></select>
    <div id="viewer"></div>

    <script type="module">
        import { ModelViewer } from 'belowjs';

        const models = {
            'ship1': { url: '/models/ship1.glb', name: 'Cargo Ship' },
            'ship2': { url: '/models/ship2.glb', name: 'Fishing Vessel' }
        };

        const viewer = new ModelViewer('#viewer', {
            models,
            autoLoadFirst: true,
            showInfo: true
        });

        // Populate the dropdown and switch models
        const select = document.getElementById('model-select');
        Object.keys(models).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = models[key].name;
            select.appendChild(option);
        });
        select.addEventListener('change', e => viewer.switchModel(e.target.value));

        // Listen for events
        viewer.on('model-loaded', ({ config }) => {
            console.log(`Loaded: ${config.name}`);
        });

        viewer.on('model-switched', ({ config }) => {
            document.title = `Viewing: ${config.name}`;
        });
    </script>
</body>
</html>
```

## 📖 Documentation

- **[API Reference](docs/API.md)** - Complete API documentation
- **[Development Plan](BELOWJS_LIBRARY_PLAN.md)** - Roadmap and architecture overview
- **[Examples](examples/)** - Live examples with different configurations

## 🎯 Examples

- **[Basic Viewer](examples/basic-viewer/)** - Full-featured viewer with all UI components
- **[Clean Viewer](examples/clean-viewer/)** - Minimal UI for focused viewing
- **[Light Theme](examples/light-theme/)** - Light theme demonstration

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Credits

Originally developed for underwater shipwreck exploration. Models courtesy of WreckSploration.
