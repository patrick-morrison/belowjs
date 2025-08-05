# Cylinder Display Example

This example renders BelowJS models to a stereoscopic cylindrical panorama using the `CylindricalStereoRenderer`.

## Features
- Studio-style lighting (hemisphere + directional light)
- Measurement system enabled
- Model selection dropdown with the same options as the Basic viewer

## Running
From the repository root run:

```bash
npm run dev
```

Then open [http://localhost:5173/examples/cylinder/](http://localhost:5173/examples/cylinder/) in your browser.

## Using with a Cylindrical Display

1. Connect your stereoscopic cylinder display as a second monitor.
2. Move the example window to that display and press `F11` to go full screen.
3. The canvas fills the screen; the left half is the left eye and the right half is the right eye.
4. Configure the display or projector system to map each half of the canvas to the corresponding eye channel.
5. Stand at the center of the cylinder for best results.
