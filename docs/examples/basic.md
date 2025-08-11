---
layout: doc
sidebar: true
---

# Basic Viewer Example

The Basic Viewer demonstrates a full-featured BelowJS implementation with multiple models, VR support, measurement tools, and dive mode.

## Features

- **Multi-model support** - Switch between different shipwreck models
- **VR integration** - Enter VR mode on supported devices
- **Measurement tools** - Measure distances and annotate models
- **Dive mode** - Experience underwater lighting and particle effects
- **Audio support** - Ambient underwater sounds
- **Touch/mobile friendly** - Works on tablets and phones

## Live Demo

<iframe 
  src="https://patrick-morrison.github.io/belowjs/examples/basic/" 
  style="width: 100%; height: 600px; border: 1px solid #ddd; border-radius: 8px;"
  title="BelowJS Basic Viewer Demo">
</iframe>

**[Open in new window](https://patrick-morrison.github.io/belowjs/examples/basic/)**

## Source Code

View the complete source code on GitHub: **[examples/basic](https://github.com/patrick-morrison/belowjs/tree/main/examples/basic)**

## Local Development

Run this example locally:

```bash
npm run dev        # or npm run dev:basic
```

## Key Implementation

```javascript
import { ModelViewer } from 'belowjs';
import 'belowjs/dist/belowjs.css';

const config = {
    models: {
        'kxi': { url: 'models/kxi.glb' },
        'sesa': { url: 'models/sesa.glb' },
        'unknown': { url: 'models/unknown.glb' }
    },
    ui: {
        showModelPicker: true,
        showMeasurementTools: true,
        showVRButton: true
    },
    vr: {
        enabled: true,
        comfort: 'moderate'
    },
    dive: {
        enabled: true,
        ambientSound: 'sound/vrambience.ogg'
    }
};

const viewer = new ModelViewer('viewer-container', config);
```
