---
layout: doc
sidebar: true
---

# Drag & Drop Example

The Drag & Drop example demonstrates how to create a file loader interface that accepts GLB files via drag-and-drop or file selection.

## Features

- **Drag & drop interface** - Drop GLB files directly onto the viewer
- **File picker** - Click to browse and select files
- **Dynamic loading** - Load models without page refresh
- **Custom UI elements** - Styled dropzone and controls
- **Error handling** - Graceful handling of invalid files

## Live Demo

<iframe 
  src="https://patrick-morrison.github.io/belowjs/examples/dragdrop/" 
  style="width: 100%; height: 600px; border: 1px solid #ddd; border-radius: 8px;"
  title="BelowJS Drag & Drop Demo">
</iframe>

**[Open in new window](https://patrick-morrison.github.io/belowjs/examples/dragdrop/)**

## Source Code

View the complete source code on GitHub: **[examples/dragdrop](https://github.com/patrick-morrison/belowjs/tree/main/examples/dragdrop)**

## Local Development

Run this example locally:

```bash
npm run dev:dragdrop
```

## Key Implementation

```javascript
import { ModelViewer } from 'belowjs';
import 'belowjs/dist/belowjs.css';

const viewer = new ModelViewer('viewer-container', {
    ui: {
        showDropzone: true,
        acceptedFormats: ['.glb', '.gltf']
    }
});

// Handle file drops
viewer.on('fileDropped', (file) => {
    viewer.loadModel(file);
});
```
