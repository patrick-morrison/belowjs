---
title: 'BelowJS: A modular Three.js library for immersive 3D underwater model viewers with VR support'
tags:
  - JavaScript
  - Three.js
  - WebXR
  - VR
  - underwater exploration
  - 3D visualization
  - marine archaeology
  - cultural heritage
authors:
  - name: Patrick Morrison
    orcid: 0000-0000-0000-0000  # Replace with actual ORCID if available
    affiliation: 1
affiliations:
 - name: Independent Developer
   index: 1
date: 5 August 2025
bibliography: paper.bib
---

# Summary

BelowJS is a JavaScript library built on Three.js that provides both high-level and low-level APIs for creating immersive 3D model viewers specifically designed for underwater exploration applications. The library combines WebXR virtual reality support, measurement tools, and underwater simulation features to enable researchers and developers to create sophisticated visualization platforms for marine archaeology, underwater cultural heritage documentation, and scientific diving applications.

The library architecture consists of modular systems including VR management with Meta Quest device optimizations, distance measurement tools functional in both VR and desktop environments, underwater lighting and particle systems for dive simulation, motion sickness mitigation through teleportation mechanics, and comprehensive audio systems for immersive experience. BelowJS supports multiple deployment scenarios through ES modules and UMD bundles, with production-ready CSS styling and mobile-optimized touch controls.

# Statement of need

Modern underwater photogrammetry workflows have revolutionized marine archaeology data collection, with Structure from Motion (SfM) and Multi-View Stereo (MVS) techniques now producing complete 3D meshes within hours of diving [@menna2018underwater; @calantropio2024underwater]. However, significant barriers remain between data acquisition and public accessibility. Current underwater cultural heritage visualization relies predominantly on desktop applications or bespoke Unity/Unreal Engine builds requiring gigabyte-scale installers and high-end GPU hardware [@skarlatos2020underwater]. This deployment complexity creates substantial friction between underwater discovery and heritage dissemination, particularly affecting smaller archaeological institutions and field research stations with limited technical resources.

Existing web-based heritage visualization tools demonstrate partial solutions but lack underwater-specific functionality. The ATON Framework [@fanini2021aton; @fanini2022webxr] provides WebXR capabilities for cultural heritage but focuses on terrestrial archaeological sites without underwater simulation systems. The 3DHOP (3D Heritage Online Presenter) [@potenziani20153dhop] offers sophisticated web-based 3D visualization but lacks VR support and underwater environmental features essential for marine archaeological contexts. Academic tools like archeoViz [@plutniak2023archeoviz] excel at archaeological spatial data analysis but operate within desktop R environments rather than providing browser-accessible visualization for public engagement.

BelowJS addresses this gap by providing a complete underwater-specific visualization framework that transforms deployment from weeks to minutes. The library's 75 kB bundle size with CDN-based dependency loading enables immediate deployment via standard web servers, while specialized underwater systems including lighting simulation, particle effects, and VR locomotion optimized for diving metaphors provide authentic archaeological site representation. Unlike existing solutions that require extensive customization for underwater applications, BelowJS provides domain-specific functionality out-of-the-box.

The target audience includes marine archaeologists requiring rapid site documentation and dissemination tools, cultural heritage institutions needing accessible public engagement platforms, and educational organizations developing underwater heritage programs. Current solutions force researchers to choose between technical complexity (game engines) or limited functionality (existing web viewers), while BelowJS enables sophisticated underwater visualization accessible to non-technical heritage professionals. This democratization of advanced 3D visualization technology directly supports the archaeological community's need for rapid, accessible heritage dissemination following the established pattern of successful domain-specific tools like PyLithics [@frick2022pylithics] for lithic analysis.

# Key Features and Research Applications

BelowJS provides essential functionality for underwater research visualization through several integrated systems built on Three.js [@threejs2023] and WebXR standards [@webxr2023]. The WebXR VR implementation includes Meta Quest device optimizations, teleportation-based locomotion designed for extended archaeological documentation sessions, and spatial audio systems that enhance immersion through movement sounds and underwater ambience. The measurement system enables precise distance calculations in both VR and desktop modes, supporting archaeological documentation workflows that require accurate spatial measurements of artifacts and site features as established in underwater recording methodologies [@menna2018underwater].

The underwater simulation capabilities include specialized lighting systems that replicate underwater visibility conditions affected by wavelength-dependent absorption [@akkaynak2019sea], GPU-accelerated particle systems for simulating marine snow and water effects using custom GLSL shaders [@webgl2021], and dynamic fog management reflecting actual diving visibility limitations. These features enable researchers to create authentic representations of underwater environments that address the technical challenges of underwater 3D reconstruction [@skarlatos2020underwater] while providing realistic archaeological site visualization.

The library's modular architecture supports diverse research applications from simple model display to comprehensive exploration platforms following established patterns in scientific 3D visualization frameworks. The high-level ModelViewer API enables rapid deployment of fully-featured viewers with minimal configuration, while the low-level BelowViewer API provides direct access to Three.js components for advanced customization. URL parameter integration supports embedding in research websites and digital collections, facilitating broader access to underwater cultural heritage materials as demonstrated by successful web-based heritage visualization approaches [@webgl_heritage2021].

Research applications include documentation and visualization of shipwreck sites, enabling remote access to underwater archaeological locations that may be challenging to visit physically due to depth, location, or environmental conditions [@underwater3d2020]. The precision measurement tools support creation of detailed archaeological documentation with accurate spatial relationships between artifacts and site features, addressing the critical need for precise underwater measurements in archaeological recording. VR capabilities enhance public outreach and educational programs by providing immersive underwater exploration experiences that increase engagement with marine cultural heritage [@vr_archaeology2019], supporting the broader goals of digital archaeology dissemination.

# Implementation

BelowJS achieves its rapid deployment capability through a carefully architected modular system built on Three.js and WebXR standards. The library's 75 kB bundle size results from strategic dependency management, where Three.js loads from CDN with multiple fallback sources rather than being bundled, and specialized underwater systems are implemented using efficient custom shaders and geometry manipulation rather than heavy third-party libraries.

The measurement system demonstrates technical sophistication through sub-millimeter precision calculations using Three.js raycasting with floating-point accuracy, cross-platform consistency via unified measurement logic between VR and desktop modes, and dynamic visual scaling where measurement labels automatically adjust based on camera distance and viewing context. Archaeological workflows benefit from direct measurement placement via raycasting against model geometry, supporting standard documentation practices without requiring specialized training.

VR locomotion implements physics-accurate teleportation using parabolic arc calculations with gravity simulation (9.8 m/s²) and real-time trajectory visualization. The comfort system addresses motion sickness through multi-tiered options including teleportation, snap turning, and smooth locomotion, while hand gesture integration supports pinch/fist gestures for natural underwater navigation metaphors that reflect diving rather than terrestrial movement patterns.

The underwater simulation system achieves realism through scientifically-informed lighting that replicates depth-appropriate color temperature and attenuation, GPU-based particle systems for marine snow bounded by model geometry, and dynamic fog management with device-specific optimization (20m visibility on Quest 2, full distance on Quest 3) reflecting actual diving conditions. Survey/dive mode switching enables instant transitions via VR controller input.

Cross-platform deployment leverages WebXR standards compliance for universal VR headset support, progressive enhancement from VR to desktop to mobile ensuring accessibility across research environments, and production-ready builds with CDN fallback systems for reliable loading in diverse network conditions typical of field research contexts.

## Advanced Compression Architecture

BelowJS handles complex archaeological models exceeding 1 million polygons with 4x 4K texture maps through sophisticated compression techniques addressing the scale demands of modern underwater photogrammetry [@calantropio2024underwater]. The ModelLoader implements a three-tier compression system: Draco geometric compression [@draco2017] reduces polygon data by 80-90% while preserving archaeological detail precision, KTX2 texture compression [@ktx2_2020] with GPU transcoding supports modern formats (ASTC, BC7, ETC2) with automatic fallback to traditional formats, and Meshopt decoder [@meshopt2019] provides additional vertex cache optimization and overdraw reduction. The system uses CDN-based decoder loading with graceful degradation when compression fails, ensuring models load even in challenging network conditions typical of remote archaeological sites.

## GPU-Accelerated Particle System

The underwater simulation employs custom GLSL shaders [@webgl2021] for realistic marine particle effects addressing the environmental context critical for underwater archaeological site representation. The particle system calculates optimal particle count dynamically based on model bounding volume using archaeological site-appropriate density algorithms (0.0625-3.5 particles per cubic unit depending on scale), with total counts ranging from 100-8000 particles. The vertex shader implements real-time physics including constant velocity drift simulation, sinusoidal wave motion with particle-specific phase offsets, boundary wrapping for infinite particle fields, and distance-based size attenuation. The fragment shader provides exponential squared fog calculation (fog factor = 1.0 - exp(-distance² * 0.0064)), circular particle textures generated via canvas gradients, and alpha testing for performance optimization following established WebGL optimization patterns [@lekschas2023regl]. Particle behavior reflects real underwater physics with ultra-slow current simulation (10⁻⁵ m/s base velocities) and size distribution matching marine snow characteristics.

## High-Performance Material Processing

The model processing pipeline optimizes imported archaeological models through material standardization and enhancement. The system converts problematic MeshBasicMaterial and MeshPhongMaterial instances to MeshLambertMaterial for consistent lighting, removes embedded lights and emissive properties that interfere with underwater simulation, applies maximum anisotropic filtering (typically 16x) to texture maps for archaeological detail preservation, and implements proper normal mapping with configurable intensity scaling. Shadow system uses high-resolution shadow maps (2048x2048) with optimized camera bounds for archaeological site documentation, while fog integration provides depth perception crucial for spatial understanding of underwater sites.

## VR Performance Optimization System

The VR implementation includes device-specific performance profiles detected through WebXR device characteristics. Quest 2 optimization limits fog distance to 20m and reduces particle density, while Quest 3 profiles enable full-distance fog and maximum particle counts. The comfort system implements motion sickness mitigation through scientifically-informed presets: maximum comfort mode uses teleportation-only locomotion with 30-degree snap turns, balanced mode combines smooth locomotion with reduced speed multipliers, and performance mode enables full smooth locomotion for experienced users. The teleportation system calculates physics-accurate parabolic trajectories using standard gravity (9.8 m/s²) with real-time arc visualization, while hand tracking supports pinch and fist gestures for natural underwater interaction metaphors.

## Precision Measurement Implementation

The measurement system achieves sub-millimeter precision through sophisticated raycasting algorithms using Three.js Raycaster with configurable precision thresholds. Distance calculations use 64-bit floating-point arithmetic with metric units exclusively, supporting archaeological documentation standards. Cross-platform consistency ensures identical measurements in VR and desktop modes through unified calculation logic, while visual scaling algorithms maintain measurement label readability across viewing distances from millimeters to hundreds of meters. The system supports direct placement on model geometry via surface normal calculation, enabling proper measurement orientation relative to archaeological features without manual adjustment.

## Annotation and Documentation Architecture

The 3D annotation system employs spatial indexing for performance with large archaeological datasets. Annotations store precise camera position and target vectors for repeatable documentation perspectives, implement automatic occlusion testing with opacity adjustment for buried features, and support hierarchical organization with metadata tagging for archaeological classification. The JSON-based data format includes version control fields, creation/modification timestamps, and validation schemas compatible with archaeological database systems. Camera transitions between annotation points use smooth interpolation with configurable duration and easing functions, supporting both automated tours and manual navigation workflows.

## Memory Management and Caching

The architecture implements sophisticated memory management for extended archaeological documentation sessions. Model caching uses deep cloning to create multiple instances from single loaded GLTF files, reducing memory footprint for comparative analysis workflows. The system tracks and disposes of unused geometries, materials, and textures to prevent memory leaks during extended VR sessions. Shared KTX2 and Draco loaders prevent redundant decoder instantiation across model loading operations, while abort controllers enable clean cancellation of loading operations when switching between archaeological sites.

## Archaeological Workflow Integration

The deployment architecture specifically addresses archaeological field research requirements. Single HTML file deployment with production builds enables immediate sharing of new discoveries via standard web servers, while URL parameter integration supports direct model loading for museum and educational contexts. The system preserves camera state during VR transitions to maintain documentation consistency, implements auto-save functionality for measurement and annotation data using browser localStorage, and provides export capabilities compatible with GIS systems and archaeological databases. Theme support (dark/light) accommodates different documentation environments from field stations to museum displays.

# Acknowledgements

BelowJS was developed for underwater shipwreck exploration applications, with models and use cases derived from collaboration with underwater cultural heritage research initiatives. The library builds upon the Three.js ecosystem and WebXR specifications to provide specialized functionality for marine archaeology visualization.

# References