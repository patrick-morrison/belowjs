## 2025-08-10: VR Button CSS Modernization

**Action:** Removed all legacy selectors for `#VRButton`, `button[id*="VR"]`, `div[id*="VR"] button`, and `[style*="position: absolute"][style*="bottom"]` from `src/styles/vr.css`. Only BEM classes (`.vr-button--glass`, `.vr-button-available`) are now used for VR button styling.

**Rationale:** This step fully modernizes the VR button CSS, eliminates legacy/ID-based support, and ensures all VR UI is styled via BEM classes only.

**Next:** Continue this systematic cleanup for other legacy selectors in the codebase (e.g., fullscreen, status, modelSelector, etc.).
# ---
# ⚠️ BEM Refactor Change Log (August 2025)

The following major changes were made to CSS and UI structure for BEM compliance:

- All UI component selectors were refactored from IDs and generic class names to BEM-style class names:
    - `#info` → `.info-panel` (and children: `.info-panel__title`, `.info-panel__controls`)
    - `#modelSelector` → `.model-selector` (and dropdown: `.model-selector__dropdown`)
    - `#loading` → `.loading-indicator`
    - `#measurement-panel`/`#measurementPanel` → `.measurement-panel`
    - `.vr-button-glass` → `.vr-button--glass`
- All related HTML/JS code was updated to use the new class names instead of IDs.
- All CSS selectors in `src/styles/` and related files were updated to match the new BEM classes.
- Any legacy `id` attributes for these components were removed where possible.
- Example and demo code was updated to use `querySelector` with the new class names, with fallback logic for dynamic elements.

**If you encounter issues in other apps or demos:**
- Check for any code, templates, or scripts that reference the old IDs or class names and update them to the new BEM classes.
- Review the change log above for the new class names.
- If you need to temporarily restore compatibility, you can add legacy selectors as aliases in the CSS, but this is discouraged for long-term maintenance.

This section documents the BEM refactor for future troubleshooting and onboarding.
# BelowJS Codebase Review & Refinement Plan


## 🟡 Medium Priority Issues (Professional Practices & Refinements)

These issues affect code quality, developer experience, and bundle size.

### 1. Inconsistent CSS Naming and Structure

-   **Status**: Complete
-   **Plan**: Refactor UI components to use BEM class names instead of IDs or generic class names. Update both HTML and CSS for each component.
    -   [x] Refactor Info Panel (`#info` → `.info-panel`)
    -   [x] Refactor Model Selector (`#modelSelector` → `.model-selector`)
    -   [x] Refactor Loading Indicator (`#loading` → `.loading-indicator`)
    -   [x] Refactor Measurement Panel (`#measurement-panel` → `.measurement-panel`)
    -   [x] Refactor VR Button Glass (`.vr-button-glass` → `.vr-button--glass`)

-   **Problem**: The CSS files in `src/styles/` use a mix of ID selectors, generic class names, and multiple theme files (`theme.css`, `theme-light.css`). This makes the CSS hard to scale and maintain.
-   **Files**: All files in `src/styles/`
-   **Solution**:
    1.  **Adopt BEM Naming**: Refactor all CSS selectors to follow the BEM (Block__Element--Modifier) convention for consistency. For example, `.vr-button-glass` should become `.vr-button--glass`.
    2.  **Update HTML**: Replace IDs and old class names in HTML with new BEM class names.
    3.  **Remove Redundant Selectors**: Eliminate unused or duplicate selectors after refactor.

## 2025-08-10: Final Legacy Selector Audit & BEM Compliance

**Action:** Completed a comprehensive audit of all CSS files in `src/styles/` to ensure there are no remaining legacy ID selectors (e.g., `#something`). Verified that all selectors are now BEM-compliant classes or variables (e.g., `#fff`, `#1a1a1a` for colors only).

- Removed all remaining legacy selectors, including:
    - `#VRButton` and related ID-based selectors from `vr.css`
    - `#status` from `theme-light.css`
- Confirmed via regex and text search that no ID selectors remain in any CSS file.
- All UI styling is now handled exclusively via BEM classes.

**Rationale:** This ensures maintainability, scalability, and consistency across the codebase. No legacy or ID-based selectors remain, and all future development should use BEM methodology.

**Status:** BEM compliance is now complete and enforced across all stylesheets.
