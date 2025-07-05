# VR Viewer Example

This example demonstrates BelowJS's WebXR VR support with the same interaction patterns and feel as the original implementation.

## Features

### VR Support
- **WebXR Integration**: Full WebXR session management
- **Quest Optimization**: Automatic detection and optimization for Quest 2/3
- **Controller Support**: Thumbstick movement and button interactions
- **Original VR Patterns**: Preserves exact movement feel and camera positioning

### VR Controls
- **Left Controller**:
  - Thumbstick: Forward/backward and strafe movement
  - Grip button: 3x speed boost for horizontal movement
  - X/Y buttons: Toggle dive/survey mode

- **Right Controller**:
  - Thumbstick X: Smooth turning
  - Thumbstick Y: Vertical movement (fly up/down)
  - Grip button: 3x speed boost for vertical movement
  - A/B buttons: Toggle dive/survey mode

### VR Button
- **Modern Glassmorphism**: Premium glass design with shimmer effect
- **Responsive States**: Ready, disabled, and not-supported states
- **Original Positioning**: Exact placement and behavior from original

### Desktop Fallback
- **Full Compatibility**: Works seamlessly without VR headset
- **Orbit Controls**: Drag to orbit, scroll to zoom, double-click to focus
- **Model Selector**: Dropdown for switching between models

## Model Positioning

Each model includes VR-specific positioning:

```javascript
initialPositions: {
  desktop: {
    camera: { x: 33.494, y: 36.42, z: -83.442 },
    target: { x: -3.602, y: -6.611, z: -23.97 }
  },
  vr: {
    dolly: { x: 0, y: 2, z: 15 },
    rotation: { x: 0, y: 0, z: 0 }
  }
}
```

## Files

- `vr-demo.html` - Main VR demo with full functionality
- `index.html` - Original VR example (for comparison)

## Usage

1. Open `vr-demo.html` in a VR-capable browser
2. Click the "ENTER VR" button when using a VR headset
3. Use controller thumbsticks to navigate underwater wrecks
4. Press X/A buttons to toggle between dive and survey modes
5. Hold grip buttons for speed boost

## Browser Compatibility

- **VR Required**: Chrome/Edge with WebXR support
- **Desktop**: Any modern browser (VR button will show as disabled)
- **Mobile**: Touch navigation (VR not available)

## Technical Notes

- Preserves original VR interaction patterns and timing
- Automatic Quest 2 performance optimizations (20m render distance)
- Modern glassmorphism VR button with tasteful shimmer
- Seamless desktop/VR mode transitions
