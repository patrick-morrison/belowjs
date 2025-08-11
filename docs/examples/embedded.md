---
layout: doc
sidebar: true
---

# Embedded Viewer Example

The Embedded Viewer demonstrates a minimal BelowJS implementation designed for embedding in other applications or websites.

## Features

- **Minimal footprint** - Lightweight configuration
- **Embeddable design** - Clean interface for integration
- **Responsive layout** - Adapts to container size
- **Essential controls** - Only core viewing functionality
- **Fast loading** - Optimized for quick startup

## Live Demo

<iframe 
  src="https://patrick-morrison.github.io/belowjs/examples/embed/" 
  style="width: 100%; height: 600px; border: 1px solid #ddd; border-radius: 8px;"
  title="BelowJS Embedded Viewer Demo">
</iframe>

**[Open in new window](https://patrick-morrison.github.io/belowjs/examples/embed/)**

## Source Code

View the complete source code on GitHub: **[examples/embed](https://github.com/patrick-morrison/belowjs/tree/main/examples/embed)**

## Local Development

Run this example locally:

```bash
npm run dev:embed
```

## Key Implementation

```javascript
import { ModelViewer } from 'belowjs';
import 'belowjs/dist/belowjs.css';

const config = {
    models: {
        'wreck': { url: 'models/wreck.glb' }
    },
    ui: {
        minimal: true,
        showUI: false
    },
    controls: {
        enableZoom: true,
        enablePan: true,
        enableRotate: true
    }
};

const viewer = new ModelViewer('viewer-container', config);
```

## Integration

Perfect for embedding in:
- Museum websites
- Research publications
- Educational platforms
- Portfolio sites
- Documentation
