# Changelog

All notable changes to BelowJS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-08-27 - Stable Release

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