# Changelog

All notable changes to BelowJS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2025-08-01

### Added
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
- Audio routing properly configured in basic-viewer example
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