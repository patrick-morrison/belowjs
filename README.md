# BelowJS

A modern, modular Three.js library for creating immersive 3D model viewers with VR support. Originally designed for underwater shipwreck exploration, BelowJS provides a clean, composable API for any 3D model viewing application.

## ✨ Features

- **🎛️ Modular Architecture**: Clean, composable API with configurable components
- **🎨 Beautiful UI**: Dark/light themes with minimal and full-featured UI options
- **🖱️ Interactive Controls**: Intuitive camera controls with double-click-to-focus
- **📱 Mobile Ready**: Touch-optimized controls for mobile devices
- **🔧 Developer Friendly**: TypeScript-ready with comprehensive documentation
- **⚡ Performance Optimized**: Efficient model loading and rendering
- **📏 Precision Measurement**: Modular desktop and VR measurement tools

## 🚀 Quick Start

```html
<!DOCTYPE html>
<html>
<head>
    <title>My 3D Viewer</title>
    <link rel="stylesheet" href="/src/styles/theme.css">
</head>
<body>
    <script type="module">
        import { ModelViewer } from '/src/index.js';

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
