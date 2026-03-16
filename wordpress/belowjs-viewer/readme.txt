=== BelowJS 3D Viewer ===
Contributors: patrickmorrison
Tags: 3d, model, viewer, glb, photogrammetry, underwater, archaeology
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPL-3.0-or-later
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Embed interactive 3D model viewers on any WordPress page using BelowJS.

== Description ==

BelowJS 3D Viewer lets you embed interactive 3D photogrammetry models directly into your WordPress pages and posts. Built on [BelowJS](https://github.com/patrick-morrison/belowjs), a Three.js-based viewer designed for underwater archaeology and heritage documentation.

**Features:**

* Upload GLB files to your WordPress media library and embed them with one click
* Gutenberg block with full sidebar controls — no code required
* Classic editor shortcode for older setups
* Measurement tools for precise on-model measurements
* Dive mode with underwater lighting and particle effects
* Optional VR support for WebXR headsets
* Fullscreen viewing
* Self-contained — Three.js and BelowJS are bundled in the plugin, no CDN dependency
* Responsive and mobile-friendly

== Usage ==

**Gutenberg Block:**

1. In the block editor, add the "BelowJS 3D Viewer" block (found under Embeds)
2. Click "Choose GLB File" to upload or select a model from your media library
3. Configure height, background colour, camera position, and feature toggles in the block sidebar

**Shortcode (Classic Editor):**

    [belowjs url="https://example.com/model.glb" name="Shipwreck" height="500px"]

All shortcode attributes:

* `url` — GLB file URL (required)
* `name` — Display name (default: "3D Model")
* `credit` — Attribution text
* `height` — Container height (default: "500px")
* `background` — Hex background colour (default: "#041729")
* `cx`, `cy`, `cz` — Camera position (default: 0, 10, 20)
* `tx`, `ty`, `tz` — Camera target (default: 0, 0, 0)
* `vr` — Enable VR mode, true/false (default: false)
* `measurable` — Enable measurement tool, true/false (default: true)
* `dive` — Enable dive mode, true/false (default: true)
* `fullscreen` — Enable fullscreen button, true/false (default: true)

== Installation ==

1. Upload the `belowjs-viewer` folder to `/wp-content/plugins/`
2. Activate the plugin through the Plugins menu
3. Add 3D models to your pages using the Gutenberg block or shortcode

== Frequently Asked Questions ==

= What file formats are supported? =

GLB (binary glTF 2.0). This is the standard format exported by photogrammetry tools like Metashape, RealityCapture, and Meshroom.

= How large can models be? =

Models under 50 MB work best for web delivery. Use DRACO compression in your export settings to reduce file size.

= Does this work with page builders? =

Yes — use the `[belowjs]` shortcode in any page builder that supports shortcodes (Elementor, Beaver Builder, Divi, etc.).

= Where is BelowJS loaded from? =

Three.js and BelowJS are bundled directly in the plugin. No external CDN calls are made. To upgrade, rebuild the plugin from the belowjs repository with `npm run build:wordpress`.

== Changelog ==

= 1.0.0 =
* Initial release
* Gutenberg block with media library integration
* Classic editor shortcode
* GLB upload support
* Configurable camera, background, and feature toggles
