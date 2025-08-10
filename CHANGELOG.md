# Changelog

All notable changes to BelowJS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-08-10 - Public Release

### Added
- **Public Release**: First stable public release of the BelowJS library.
- **Code Review**: Completed a full code review and audit for public release. See `docs/CODE_REVIEW.md` for details.

### Changed
- **Dependencies**: Updated dependencies to their latest stable versions for security and performance.
  - `three`: `^0.179.1`
  - `vite`: `^7.1.1`
- **API**: VR audio is now disabled by default; enable with `enableVRAudio: true`.
- **Behavior**: When enabled, audio plays only during an active VR session (no desktop playback).

### Fixed
- Cleaned up development artifacts, console logs, and debug code from the codebase.

## [0.1.5] - 2025-08-02 - Measurement System Stability

### Fixed
- **Critical**: Measurement orbs no longer disappear when switching between models
- **Critical**: VR ghost spheres now stay attached to controllers when re-entering VR after Quest browser visits
- **Critical**: Added proper measurement system cleanup during VR session transitions
- **Critical**: Fixed ghost sphere positioning corruption that caused orbs to drift far from controllers
- **Bug**: Corrected fullscreen mode mouse coordinate mapping for accurate focus interactions
- **Bug**: Added automatic raycast target cleanup when model loading fails to prevent corruption
- **Bug**: Improved VR controller attachment timing with 100ms delay for reliable ghost sphere positioning

### Added
- **New**: `resetGhostSpherePositions()` method to restore correct controller-relative positioning
- **New**: Automatic position validation and correction in measurement system update loop
- **New**: Enhanced VR session end cleanup to prevent orphaned measurement objects
- **New**: Robust error handling for model loading failures affecting measurement state

### Changed
- **Improvement**: Measurement system now uses local coordinates for ghost spheres instead of world coordinates
- **Improvement**: Enhanced VR re-entry logic ensures measurements work consistently across session changes
- **Improvement**: Mouse coordinate calculation now uses canvas dimensions for accurate fullscreen support
- **Performance**: Reduced coordinate transformation overhead in measurement update loop

### Technical Details
- Ghost spheres are now properly parented to controllers and automatically inherit transforms
- Measurement clearing is atomic during model switches to prevent race conditions
- VR controller attachment includes automatic position reset for Quest browser compatibility
- Enhanced coordinate system validation prevents measurement drift in various viewport states

## [0.1.4] - 2025-01-01 - NPM Publication Ready

### Added
- **NPM Publication Ready**: Complete package configuration for public NPM distribution
- **GPL License Headers**: All source files now include proper GPL-3.0-or-later copyright headers
- **Security Fixes**: Updated to Three.js 0.179.0 and Vite 6.0.0 to resolve security vulnerabilities
- **NPM Configuration**: Added `files`, `publishConfig`, `engines`, and `prepublishOnly` fields
- Professional logging system with reduced console output
- Comprehensive code cleanup removing development artifacts
- Audio path configuration now properly supported via `audioPath` option
- Optional fullscreen toggle via `enableFullscreen` configuration
- VR audio system can now be disabled via `enableVRAudio: false` configuration option

### Changed
- **BREAKING**: Removed emoji-based console logging throughout codebase
- **BREAKING**: Cleaned up unprofessional language in code comments and documentation
- Reduced bundle sizes:
  - ES Module: 409 kB → 400.9 kB (-8.1 kB)
  - UMD Bundle: 319 kB → 311.5 kB (-7.5 kB)
- Console output now professional and minimal (90% reduction in log spam)
- Examples now use proper ES modules pattern with production CSS
- Documentation updated to remove marketing language and emoji references
- UI overlays like the measurement panel and model selector now attach to the viewer container instead of `document.body`
- Measurement and VR comfort controls position absolutely inside the container for reliable embedding

### Fixed
- Audio routing properly configured in basic example
- VRManager debug logging removed
- Measurement system debug output cleaned up
- VR audio initialization feedback made silent
- Locomotion system status messages removed
- Dive system mode switching logs eliminated
- VR audio 404 errors can now be prevented by disabling the audio system entirely

### Developer Experience
- Build system produces cleaner, smaller bundles
- Console debugging experience significantly improved
- Professional codebase suitable for enterprise environments
- All functionality preserved while removing development noise

### Dependencies & Security
- **Updated**: three@0.179.0 (latest stable, MIT license compatible with GPL)
- **Updated**: vite@6.0.0 (fixes esbuild security vulnerability)
- **Confirmed**: Three.js MIT license is fully compatible with GPL-3.0-or-later
- **Zero vulnerabilities**: `npm audit` now reports clean security status

### API Compatibility
- **BREAKING**: UI elements attach to the provided container, so custom CSS may need updates when upgrading
- All configuration options remain the same
- All methods and events unchanged
- Only logging behavior and bundle sizes affected

### Migration Notes
If upgrading from previous version:
- No code changes required
- Console will be much quieter (this is intentional)
- Bundle sizes slightly smaller
- Audio path configuration works correctly now with `audioPath: './sound/'`

## [0.1.3] - Previous Release
- Initial working version with all features
- Emoji-heavy logging and development artifacts
- Larger bundle sizes due to debug code