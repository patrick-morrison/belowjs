# BelowJS Codebase Review & Refinement Plan

This document outlines the findings of a detailed code review conducted on the BelowJS codebase. The goal is to identify areas for improvement, fix potential bugs, and ensure the project is professional, robust, and ready for a public release.

---

## 🚨 High Priority Issues (Potential Bugs & Architectural Flaws)

These issues should be addressed first as they impact the stability and maintainability of the library.

### 1. Vestigial Measurement System in `VRManager.js`

-   **Problem**: `VRManager.js` contains a complete, but unused, legacy measurement system. This includes methods like `handleMeasurement`, `createTargetSphere`, and event listeners for controller inputs. This code is redundant because `MeasurementSystem.js` is now the sole authority for measurements. Its presence adds significant clutter, increases the bundle size, and creates a risk of future bugs if it's accidentally re-enabled.
-   **File**: `src/vr/core/VRManager.js`
-   **Solution**:
    1.  **Remove Legacy Methods**: Delete the following methods entirely from `VRManager.js`:
        -   `handleMeasurement`
        -   `createTargetSphere`
        -   `updateMeasurementLine`
        -   `clearMeasurements`
    2.  **Remove Event Listeners**: In the `init` method (or wherever the controller event listeners are set up), remove the listeners that call `handleMeasurement`. This is typically tied to the `selectstart` and `selectend` events on the VR controllers.
    3.  **Remove State Variables**: Delete any state variables related to the legacy system, such as `measurement`, `isMeasuring`, and `measurementLine`.

### 2. Unstructured Configuration Handling in `ModelViewer.js` (Completed)

-   **Status**: **Completed**.
-   **Summary of Changes**:
    -   Refactored `src/utils/ConfigValidator.js` from a set of exported functions into a standalone `ConfigValidator` class. This class is now responsible for validating a configuration object against a predefined schema.
    -   In `src/viewers/ModelViewer.js`, the constructor now defines a comprehensive schema for all available options.
    -   It uses `ConfigValidator` to process the incoming `options` object, ensuring all settings are validated and have defaults applied. The resulting clean configuration is stored in `this.config`.
    -   All internal references to the raw `options` object have been replaced with `this.config`.
-   **Impact**: This change significantly improves the robustness and maintainability of the `ModelViewer`. Configuration is now centralized, validated, and predictable, reducing the risk of runtime errors from invalid or missing options. The public API of `ModelViewer` remains the same, as it still accepts a raw `options` object.

---

## 🟡 Medium Priority Issues (Professional Practices & Refinements)

These issues affect code quality, developer experience, and bundle size.

### 1. Inconsistent CSS Naming and Structure

-   **Problem**: The CSS files in `src/styles/` use a mix of ID selectors (`#measurement-panel`), generic class names (`.vr-button-glass`), and multiple theme files (`theme.css`, `theme-light.css`). This makes the CSS hard to scale and maintain.
-   **Files**: All files in `src/styles/`
-   **Solution**:
    1.  **Adopt BEM Naming**: Refactor all CSS selectors to follow the BEM (Block__Element--Modifier) convention for consistency. For example, `.vr-button-glass` could become `.vr-button--glass`.
    2.  **Consolidate Themes**: Merge `theme.css` and `theme-light.css` into a single `theme.css`. Use a class on the main container (e.g., `.below-theme-light`) to apply the light theme variations.
        ```css
        /* src/styles/theme.css */
        :root {
          --background-color: #0a1a2a;
          --text-color: #ffffff;
        }

        .below-theme-light {
          --background-color: #ffffff;
          --text-color: #000000;
        }

        .info-panel {
          background-color: var(--background-color);
          color: var(--text-color);
        }
        ```

### 2. Lack of Central `index.js` for Components

-   **Problem**: Modules are imported using their full file paths (e.g., `import { VRManager } from '../vr/core/VRManager.js'`). This is verbose and exposes the internal file structure unnecessarily.
-   **Files**: All subdirectories in `src/`
-   **Solution**: Add an `index.js` file to each major subdirectory (`core`, `dive`, `vr`, etc.) to export the public modules from that directory.
    ```javascript
    // src/core/index.js
    export * from './BelowViewer';
    export * from './Camera';
    export * from './Scene';
    export * from './VRManager';
    ```
    This allows for much cleaner imports elsewhere in the project:
    ```javascript
    // Before
    import { BelowViewer } from './core/BelowViewer.js';
    // After
    import { BelowViewer } from './core';
    ```

### 3. `DebugCommands.js` in Production Build

-   **Problem**: The debugging tools (`DebugCommands.js`) are included in the final production bundle. Even though they are not activated without a URL parameter, this adds unnecessary weight and exposes development tools in a production environment.
-   **Files**: `vite.config.js`, `src/core/BelowViewer.js`
-   **Solution**: Use Vite's environment variables to conditionally import and initialize the debug commands.
    ```javascript
    // src/core/BelowViewer.js
    
    // ... inside the BelowViewer constructor or init method ...
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('debug')) {
      // Use a dynamic import to keep it out of the main bundle
      import('./DebugCommands').then(({ DebugCommands }) => {
        this.debugCommands = new DebugCommands(this);
      }).catch(error => console.error("Failed to load DebugCommands", error));
    }
    ```
    And ensure Vite is configured to handle this correctly, potentially using `build.chunkSizeWarningLimit` if needed, but dynamic import should suffice.

---

## 🟢 Low Priority Issues (Minor Polish)

These are smaller refinements that would improve the codebase but are not critical.

### 1. Redundant `VRComfort.js`

-   **Problem**: `VRComfort.js` is a thin wrapper around `VRTeleport.js` and exists only to manage a "comfort mode" state. This adds an extra file and layer of abstraction for a simple boolean state.
-   **Files**: `src/vr/locomotion/VRComfort.js`, `src/vr/locomotion/VRLocomotion.js`
-   **Solution**:
    1.  Merge the `isComfortMode` state and the `toggleComfortMode` logic directly into `VRLocomotion.js`.
    2.  `VRLocomotion.js` can then decide whether to use teleportation or smooth movement based on this internal state.
    3.  Delete the `VRComfort.js` file and remove its integration from `VRManager.js`.

### 2. Unused `annotations.css`

-   **Problem**: The file `src/styles/annotations.css` exists but is not imported or used anywhere in the project. It appears to be a leftover from a removed feature.
-   **File**: `src/styles/annotations.css`
-   **Solution**: Delete the file.
