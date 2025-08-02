# Basic Viewer Example

This example demonstrates the basic model loading functionality of BelowJS.

## Features Demonstrated

- ✅ Basic BelowViewer initialization
- ✅ GLTF/GLB model loading with progress tracking
- ✅ Automatic camera framing
- ✅ OrbitControls for navigation
- ✅ Basic scene setup with fog
- ✅ Model switching and scene clearing
- ✅ Event system with status updates

## Running the Example

From the root directory, run:

```bash
npm run dev
```

This will start a Vite development server and serve the example at `http://localhost:5173`.

## Available Models

The example comes configured to load the following models from your workspace:

- `models/key_biscayne.glb`
- `models/kxi.glb`
- `models/sesa.glb`
- `models/unknown.glb`

## Controls

- **Left Click + Drag**: Rotate the camera around the model
- **Right Click + Drag**: Pan the camera
- **Scroll Wheel**: Zoom in and out
- **Touch (mobile)**: Touch and drag to rotate

## What to Test

1. **Model Loading**: Try loading different models and verify they load correctly
2. **Camera Controls**: Test all the camera navigation controls
3. **Performance**: Check frame rate and smoothness
4. **Error Handling**: Try loading a non-existent model URL
5. **Responsive Design**: Test on different screen sizes

## Next Steps

After testing this basic example, we'll add:
- Lighting system (Survey/Dive modes)
- Particle system
- Audio system
- Measurement system
- VR support
