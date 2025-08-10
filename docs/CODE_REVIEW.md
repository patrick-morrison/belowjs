# BelowJS Codebase Review & Refinement Plan


## 🟡 Medium Priority Issues (Professional Practices & Refinements)

These issues affect code quality, developer experience, and bundle size.

### 1. Inconsistent CSS Naming and Structure

-   **Status**: In Progress
-   **Plan**: Refactor UI components one by one to use BEM class names instead of IDs.
    -   [ ] Info Panel (`#info` -> `.info-panel`)
    -   [ ] Model Selector (`#modelSelector` -> `.model-selector`)
    -   [ ] Loading Indicator (`#loading` -> `.loading-indicator`)
    -   [ ] Measurement Panel (`#measurement-panel` -> `.measurement-panel`)
    -   [ ] Consolidate theme files. (Skipped for now)

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
