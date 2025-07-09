# Reusability & Deployment Plan

This document outlines how BelowJS can be packaged so users can compose a custom viewer in a single HTML file while still letting the library stay modular for development.

## Goals
- **Highly modular source** in `src/` so each system (core, VR, measurement, etc.) can evolve independently.
- **Flexible builds**: provide a single bundled JS/CSS for quick CDN usage but also allow importing individual modules.
- **Simple HTML integration** through GitHub Pages or any CDN hosting.

## Current Structure
BelowJS already separates features into folders such as `core`, `models`, `measurement`, and `vr` as shown below:

```text
src/
  core/ ...
  measurement/ ...
  models/ ...
  styles/ ...
  vr/ ...
```

The default Vite build outputs both ES module and UMD bundles:

```
dist/belowjs.es.js
dist/belowjs.umd.js
```

## Recommended Approach
1. **Keep Modules During Development**
   - Continue using individual files for each system. This keeps the code base easy to maintain and extend.
   - Add optional entry points (e.g. `src/index-lite.js`) that export only selected modules for lighter bundles.

2. **Bundling Strategy**
   - Use Vite/Rollup to produce different bundles:
     - **`belowjs.es.js`** – ES module for modern build pipelines.
     - **`belowjs.umd.js`** – UMD bundle for direct `<script>` use.
     - Optionally generate feature bundles (e.g. `belowjs.core.js`, `belowjs.vr.js`).
   - CSS can mirror this approach with a complete `theme.css` and smaller component files (`base.css`, `components.css`, etc.).

3. **CDN Hosting**
   - Publish the `dist/` directory to GitHub Pages or npm. Users can include a script tag:
     ```html
     <script src="https://cdn.example.com/belowjs.umd.js"></script>
     <link rel="stylesheet" href="https://cdn.example.com/theme.css">
     ```
   - Provide versioned URLs so viewers are reproducible.

4. **Single File Examples**
   - In the `examples/` folder, keep minimal HTML files that load the UMD bundle from `dist/`. These are ideal for GitHub Pages demos.
   - For advanced usage, document how to import individual modules via ES modules.

5. **Optional Plugin System**
   - Consider exposing a plugin API. Features like measurement or VR could be optional plugins that register themselves with `BelowViewer`.
   - This keeps the core small while giving developers the ability to extend functionality.

## Does a Single JS/CSS Make Sense?
- **Pros**: Extremely easy for newcomers—just drop one script and one stylesheet like Bootstrap.
- **Cons**: Less control over unused code and styles. Harder to tree-shake in advanced setups.

A hybrid approach works well:
- Develop in modules (as today).
- Create one “complete” bundle for quick CDN inclusion.
- Offer smaller bundles or tree-shakable ES modules for advanced consumers.

## Deployment Steps
1. Build the project (`npm run build`). This produces the `dist/` files.
2. Commit the `dist/` directory or publish to a registry/CDN.
3. Use GitHub Pages to serve the examples and the compiled JS/CSS.

By following this plan, BelowJS stays maintainable while giving end users simple options to embed viewers with as many or as few features as they need.
