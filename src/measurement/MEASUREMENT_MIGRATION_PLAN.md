# Measurement System Migration Plan for BelowJS

## Goal
Move the measurement system from the "Adrasan VR Measurement Tool" into the BelowJS library as `measurement.js`, ensuring seamless operation in both VR and desktop modes, matching the original behavior and UI exactly.

---

## 1. Identify and Isolate Measurement System Code
- Extract all code related to:
  - Measurement panel UI (HTML/CSS/JS)
  - Desktop measurement (mouse, click, drag, double-click, focus, spheres, lines)
  - VR measurement (controllers, triggers, Y button, spheres, lines)
  - Shared logic (sync between VR/desktop, clear, update, display, sprite, etc.)
- Exclude unrelated code (model loading, lighting, service worker, etc.)

---

## 2. Design the API for the Library Module
- Implement as a class/module, e.g. `MeasurementSystem`.
- Initialization:
  - Accepts Three.js scene, camera, renderer, controls, and optionally dolly/group for VR.
  - Optional config for UI placement, colors, etc.
- Expose methods:
  - `enable()`, `disable()`, `toggle()`
  - `clear()`
  - `syncToVR()`, `syncToDesktop()`
  - `dispose()`
- Optionally emit events/callbacks for measurement changes.

---

## 3. Move and Refactor UI Panel Creation
- Move `createMeasurementPanel` and `updateMeasurementPanel` logic into the module.
- Panel is created/managed by the measurement system.
- Allow custom placement via config.

---

## 4. Move and Refactor Desktop Measurement Logic
- Move all mouse event listeners and logic for placing spheres, lines, double-click focus into the module.
- Module attaches/detaches its own event listeners to the renderer's DOM element.
- All Three.js objects (spheres, lines) managed internally.

---

## 5. Move and Refactor VR Measurement Logic
- Move all controller event handling, ghost spheres, placed spheres, and line logic into the module.
- Module accepts references to controllers/grips, or manages them if possible.
- Y button toggle and trigger logic encapsulated.

---

## 6. Move and Refactor Shared Logic
- Move measurement display (sprite/canvas) logic into the module.
- Move sync functions (desktop <-> VR) into the module.
- Move clear/reset logic into the module.
- Move update/render loop logic (line pulsing, sprite positioning) into a method the app can call from its main render loop.

---

## 7. Refactor for Integration
- Remove all direct DOM manipulation from the app except for the measurement panel (now managed by the module).
- App instantiates the measurement system and calls its methods as needed.
- Measurement system can clean up after itself (remove event listeners, DOM elements, Three.js objects).

---

## 8. Testing and Parity
- Test the new module in both VR and desktop modes.
- Ensure all features work exactly as before:
  - Panel toggling and instructions
  - Placing and clearing points
  - Line and distance display
  - Syncing between VR and desktop
  - Focus on double-click
  - Controller and mouse interactions
  - Visual style and behavior

---

## 9. Documentation
- Document the API and usage in the library.
- Provide an example of integrating the measurement system into a BelowJS viewer.

---

## 10. File Placement
- Place the new module at `src/measurement/MeasurementSystem.js` (or `src/utils/measurement.js`).
- Export as ES module.

---

**Summary:**
Create a `MeasurementSystem` class/module that encapsulates all measurement logic, UI, and Three.js objects, and can be plugged into any BelowJS viewer. The API will allow enabling/disabling, clearing, syncing, and will work seamlessly in both VR and desktop, matching the original Adrasan tool's behavior and UI exactly.
