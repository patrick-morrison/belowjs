---
layout: doc
sidebar: true
---

# Annotations Example

Learn how to add interactive annotations and measurement tools to your 3D models using BelowJS.

## Features

- **Interactive annotations** - Click to add information points
- **Measurement tools** - Measure distances between points
- **Custom markers** - Add visual indicators to important features
- **Info panels** - Display contextual information
- **Persistent data** - Save and load annotation sets

## Coming Soon

This example is currently in development. It will demonstrate:

- Adding clickable hotspots to models
- Creating measurement overlays
- Implementing custom annotation UI
- Saving annotation data
- Loading pre-configured annotations

## Alternative: Basic Viewer

For now, you can see measurement tools in action in the **[Basic Viewer example](/examples/basic)**, which includes:

- Distance measurement tools
- Interactive controls
- Multiple model support

## Implementation Preview

```javascript
import { ModelViewer } from 'belowjs';
import 'belowjs/dist/belowjs.css';

const config = {
    models: {
        'wreck': { url: 'models/wreck.glb' }
    },
    ui: {
        showMeasurementTools: true,
        showAnnotationTools: true
    },
    annotations: {
        enabled: true,
        persistent: true,
        customMarkers: true
    }
};

const viewer = new ModelViewer('viewer-container', config);

// Add annotation
viewer.addAnnotation({
    position: [10, 5, -2],
    title: "Ship's Bow",
    description: "Well-preserved bow section showing original construction details"
});
```

## Related Documentation

- **[Basic Viewer](/examples/basic)** - See measurement tools in action
- **[API Reference](/api/)** - Full API documentation
- **[Model Setup Guide](/guides/model-setup)** - Preparing models for annotations
