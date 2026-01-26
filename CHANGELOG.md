# Changelog

All notable changes to BelowJS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0] - Unreleased

### Added
- Fly mode controls with F key or Shift+~ to activate - port from animation example into core library
- **Stereoscopic viewing mode (Experimental)**: side-by-side stereo rendering with configurable eye separation
- Stereo example with adjustable eye separation controls
- `stereo()` console command for enabling/disabling stereo mode and adjusting eye separation
- Z key to toggle between dive mode and studio mode
- H key to take screenshot

### Changed
- Material conversion upgraded from MeshLambertMaterial to MeshStandardMaterial with shipwreck-appropriate PBR defaults (roughness 0.8, metalness 0.3)
- Studio lighting increased by 10% to compensate for improved material reflections
- Measurement display: distances ≤ 20 cm now shown in cm with 2 decimal places, smaller sphere markers for precision

### Fixed
- Raycasting accuracy in stereo viewing mode
- VR button visibility management with fly mode controls

---

## [1.4.1] - 2025-12-26

### Added
- `setDensity(multiplier)` method on DiveParticles to dynamically adjust particle density (0-2x range)
- Animation example improvements: demo model link, mobile UI polish

---

## [1.4.0] - 2025-12-24

### Added

#### Animation Example
New [animation example](https://patrick-morrison.github.io/belowjs/examples/animation/) for producing shipwreck visualisations in seconds. Designed to mirror our Blender workflow, this demonstrates advanced features built on top of the core viewer:
- Timeline-based keyframe animation with easing
- Orbit mode for quick feature visualisations
- Flight mode navigation, as well as orbit
- Controls on the custom dive lighting system
- Local save and load of keyframes and settings
- Video export as MP4s

#### AR Support (Experimental)
Implements passthrough for AR viewing of 3D models with sensible defaults, natural-feeling hand tracking control and the same studio lighting system used in desktop mode:
- **Hand tracking gestures**: Single-hand movement, two-hand rotate and scale with logarithmic scaling and inertia
- **Quest 2/3 optimisation**: Automatic device detection and far-plane adjustments
- **Designed with shared spaces in mind**: `setInteractionEnabled()` method to lock/unlock hand interactions for remote collaboration scenarios

> **Note**: AR support is experimental and may change in future releases, it is being co-developed with a networked viewer.

### Fixed
- VR audio assets now copied losslessly in docs examples

---

## [1.3.0] - 2025-11-09
- Desktop Quest Link streaming support, best tried with the drag-and-drop viewer (<https://patrick-morrison.github.io/belowjs/examples/dragdrop/>).

## [1.2.0] - 2025-09-10

### Changed
- Limit Draco and KTX2 loader workers to a single thread on iOS to reduce Safari/iOS 26 startup memory pressure.
- Scope shared KTX2 loader instances per platform so renderer detection is repeated only where needed.

### Fixed
- Release cached GLTF scenes, textures, and parser registries as soon as models are cleared to stop Safari desktop/iOS 26 from crashing during model swaps.
- Clean up abort listeners and converted materials immediately after GLTF loads so cancelled requests don’t hold onto GPU resources, matching Apple’s iOS 26 WebKit guidance.

## [1.1.0] - 2025-09-03

### Added
- Screenshot capture button in the viewer UI
- `enableScreenshot` config option on `ModelViewer`
- `takeScreenshot()` method to programmatically save a PNG
- Styles for `.screenshot-button` and light/no-measurement variants

### Changed
- Enable `preserveDrawingBuffer` on the renderer to support screenshots
- Examples updated to include `enableScreenshot: true`

## [1.0.0] - 2025-08-27 - Stable Release

## [1.0.1] - 2025-09-03

### Changed
- Cleaned the basic example (`examples/basic/index.html`):
  - Remove legacy `#vrComfortButton` style rule
  - Remove redundant manual dropdown listener (internal handler used)
  - Disable `autoLoadFirst` and explicitly load initial model (`kxi`)

### Release Notes
- **Stable 1.0.0**: First stable release of the BelowJS library
- **Production ready**: Complete 3D model viewer with VR support
- **Comprehensive documentation**: Full documentation site with examples and guides
- **Quality assurance**: Thorough testing and quality checks completed

### Summary
BelowJS 1.0.0 is now production-ready for underwater/dive model visualization with WebXR support, measurement tools, and comprehensive documentation. The API is stable and fully documented.

**Now Live in Production:** BelowJS 1.0.0 is powering WreckSploration VR - the first production implementation featuring shipwreck exploration in virtual reality.

## [1.0.0-rc.4] - 2025-08-19 - Release Candidate

### Added
- WreckSploration VR implementation showcase
- Comprehensive guides for development workflows
- CDN reference management for all documentation examples

### Improved
- Documentation structure and navigation
- Static documentation system with better maintainability

### Fixed
- Info panel not showing properly by adding below-panel class

## [1.0.0-rc.3] - 2025-08-14 - Release Candidate

### Fixed
- Loading spinner percentage now clamped to maximum 100%
- Loading spinner display issues in light mode
- Fixed wrecksploration.com reference to correct wrecksploration.au domain

### Improved
- Example documentation clarity and structure

## [1.0.0-rc.2] - 2025-08-12 - Release Candidate

### Fixed
- VR locomotion reset bug when switching models

### Added
- VR loading indicator for model changes
- Complete static documentation site

### Improved
- Audio system robustness

## [1.0.0-rc.1] - 2025-08-10 - Release Candidate

### Added
- **Release Candidate**: First public release candidate of the BelowJS library
- **Complete 3D viewer**: GLB model loading with VR support and measurement tools
- **WebXR Integration**: Full VR support optimized for Meta Quest 3
- **Measurement System**: Desktop and VR measurement tools with proper cleanup
- **Dive Mode**: Underwater lighting simulation and particle effects
- **Multiple Examples**: Basic viewer, drag-drop loader, and embeddable viewer

### Technical Details
- Built on Three.js 0.179.1 with modern ES modules
- Modular architecture with clean separation of concerns
- Event-driven system for extensibility
- Production-ready with comprehensive error handling
