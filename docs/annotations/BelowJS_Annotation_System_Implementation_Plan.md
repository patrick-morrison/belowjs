# BelowJS Annotation System Implementation Plan

## Executive Summary

This document outlines a comprehensive implementation plan for integrating a cross-platform 3D annotation system into BelowJS, enabling rich interactive experiences across desktop and VR environments. The system will support Sketchfab-style annotations with guided tours, content archiving capabilities, and seamless cross-platform compatibility.

## Phase 1: Core Infrastructure & Data Architecture

### 1.1 Data Schema Definition

**Annotation JSON Schema:**
```json
{
  "version": "1.0",
  "modelId": "string",
  "annotations": [
    {
      "id": "string",
      "index": "number",
      "position": {"x": 0, "y": 0, "z": 0},
      "normal": {"x": 0, "y": 1, "z": 0},
      "title": "string",
      "description": "string",
      "htmlContent": "string (optional)",
      "cameraView": {
        "position": {"x": 0, "y": 0, "z": 0},
        "target": {"x": 0, "y": 0, "z": 0},
        "fov": 75
      },
      "autoAdvanceDuration": 5000,
      "metadata": {
        "author": "string",
        "created": "ISO date",
        "tags": ["array"]
      }
    }
  ],
  "tourSettings": {
    "defaultDuration": 8000,
    "transitionDuration": 2000,
    "vrTeleportEnabled": true
  }
}
```

**Implementation Priority:** HIGH
**Timeline:** Session 1-2 (with Claude Code)
**Dependencies:** None

### 1.2 Plugin Architecture Integration

**AnnotationSystem Class Structure:**
```javascript
class AnnotationSystem {
  constructor(viewer, options = {}) {
    this.viewer = viewer;
    this.options = {...defaultOptions, ...options};
    this.annotations = [];
    this.markers = new Map();
    this.activePanel = null;
    this.tourState = { active: false, currentIndex: 0 };
  }

  async loadAnnotations(data) { /* Load and validate annotation data */ }
  createMarkers() { /* Generate 3D sprites for each annotation */ }
  setupInteraction() { /* Handle raycasting and selection */ }
  showPanel(annotation) { /* Display info panel (desktop/VR) */ }
  startTour(mode = 'guided') { /* Begin guided tour sequence */ }
  dispose() { /* Cleanup resources */ }
}
```

**Integration Points:**
- ModelViewer constructor options: `{ annotations: { enabled: true, data: annotationData } }`
- Event system: `viewer.on('annotationSelected', handler)`
- Plugin registration: `BelowJS.registerPlugin('annotations', AnnotationSystem)`

**Implementation Priority:** HIGH
**Timeline:** Session 2-3 (with Claude Code)  
**Dependencies:** 1.1

### 1.3 Annotation Authoring Tool

**Purpose:** Create a web-based tool to author annotation JSON files by clicking on 3D models.

**Authoring Workflow:**
1. Load 3D model in BelowJS viewer
2. Enter "annotation mode" - special UI appears
3. Click on model to place annotation markers
4. Fill in title/description in popup form
5. Set camera view for each annotation (current view when created)
6. Reorder/edit annotations in side panel
7. Export JSON file for download
8. Import existing JSON for editing

**Implementation Features:**
```javascript
class AnnotationAuthoring {
  constructor(viewer) {
    this.viewer = viewer;
    this.mode = 'view'; // 'view' | 'edit' | 'create'
    this.tempAnnotations = [];
    this.ui = new AuthoringUI();
  }

  enterEditMode() {
    this.mode = 'edit';
    this.viewer.canvas.style.cursor = 'crosshair';
    this.setupClickHandler();
    this.ui.showEditPanel();
  }

  onModelClick(event) {
    const intersection = this.raycastModel(event);
    if (intersection) {
      this.createAnnotation(intersection.point, intersection.face.normal);
    }
  }

  exportJSON() {
    const data = this.generateAnnotationJSON();
    this.downloadJSON(data, 'annotations.json');
  }
}
```

**New Example: `/examples/annotations/`**
- **Primary development environment** for annotation system
- Dedicated annotation authoring and viewing interface
- Clean, focused UI for annotation workflow
- Uses same models as basic-viewer but annotation-focused
- Save/load from browser localStorage for persistence
- Export/import JSON annotation files

**Implementation Priority:** HIGH (Essential for content creation)
**Timeline:** Session 2-3 (with Claude Code)
**Dependencies:** 1.1, 1.2

### 1.4 Backend Integration (Django) - DEFERRED

**Note:** Backend integration will be implemented after core frontend features are working.

**Implementation Priority:** LOW (Phase 2)
**Timeline:** After core system is complete

## Phase 2: 3D Marker System

### 2.1 Sprite-Based Markers

**Technical Approach:**
- Use THREE.Sprite with canvas-generated textures
- Numbered circular badges (1-99 supported)
- Always face camera (billboard behavior)
- Depth testing disabled for visibility

**Marker Generation:**
```javascript
createMarkerTexture(number, theme = 'default') {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.height = 128;
  
  // Draw circular background
  ctx.fillStyle = theme.backgroundColor || '#FF6B35';
  ctx.beginPath();
  ctx.arc(64, 64, 60, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw number
  ctx.fillStyle = theme.textColor || '#FFFFFF';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(number, 64, 76);
  
  return canvas;
}
```

**Visual States:**
- Default: Solid color with white number
- Hover: Scale animation (1.0 → 1.2)
- Active: Pulsing glow effect
- Occluded: 50% opacity (configurable)

**Implementation Priority:** HIGH
**Timeline:** Session 3-4 (with Claude Code)
**Dependencies:** 1.2

### 2.2 Occlusion Detection

**Raycasting Approach:**
```javascript
checkOcclusion(markerPosition, cameraPosition) {
  const raycaster = new THREE.Raycaster();
  const direction = markerPosition.clone().sub(cameraPosition).normalize();
  raycaster.set(cameraPosition, direction);
  
  const intersects = raycaster.intersectObjects(this.viewer.scene.children, true);
  const markerDistance = cameraPosition.distanceTo(markerPosition);
  
  return intersects.some(hit => hit.distance < markerDistance - 0.1);
}
```

**Performance Optimization:**
- Only check occlusion for visible markers
- Throttle checks to 10fps maximum
- Use bounding sphere approximation for complex geometries

**Implementation Priority:** MEDIUM
**Timeline:** Session 4-5 (with Claude Code)
**Dependencies:** 2.1

## Phase 3: Desktop Interaction System

### 3.1 HTML Overlay Panels

**Panel Architecture:**
```javascript
class AnnotationPanel {
  constructor(annotation, theme) {
    this.element = this.createElement();
    this.annotation = annotation;
    this.theme = theme;
    this.isVisible = false;
  }

  createElement() {
    const panel = document.createElement('div');
    panel.className = 'annotation-panel';
    panel.innerHTML = `
      <div class="panel-header">
        <h3 class="panel-title"></h3>
        <button class="panel-close">×</button>
      </div>
      <div class="panel-content"></div>
      <div class="panel-footer">
        <button class="panel-prev">Previous</button>
        <button class="panel-next">Next</button>
      </div>
    `;
    return panel;
  }
}
```

**Positioning Algorithm:**
- Project 3D position to screen coordinates
- Apply viewport bounds checking
- Smart positioning (left/right flip based on screen center)
- Connection line to marker (SVG overlay)

**Implementation Priority:** HIGH
**Timeline:** Session 5-6 (with Claude Code)
**Dependencies:** 2.1

### 3.2 Camera Animation System

**Smooth Transitions:**
```javascript
animateToAnnotation(annotation, duration = 2000) {
  const start = {
    position: this.camera.position.clone(),
    target: this.controls.target.clone()
  };
  
  const end = {
    position: new THREE.Vector3().fromArray(annotation.cameraView.position),
    target: new THREE.Vector3().fromArray(annotation.cameraView.target)
  };
  
  return new Promise(resolve => {
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = this.easeInOutCubic(progress);
      
      this.camera.position.lerpVectors(start.position, end.position, eased);
      this.controls.target.lerpVectors(start.target, end.target, eased);
      this.controls.update();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    };
    
    requestAnimationFrame(animate);
  });
}
```

**Implementation Priority:** HIGH
**Timeline:** Session 6-7 (with Claude Code)
**Dependencies:** 3.1

## Phase 4: VR Integration

### 4.1 VR Marker Adaptation

**Marker Scaling:**
- Dynamic size based on distance (0.5m - 2.0m range)
- Minimum readable size enforcement
- Hand controller proximity highlighting

**VR Interaction:**
```javascript
handleVRSelection(controller, intersectedObject) {
  if (intersectedObject.userData.annotationType === 'marker') {
    const annotation = this.getAnnotationById(intersectedObject.userData.id);
    
    // Haptic feedback
    if (controller.gamepad && controller.gamepad.hapticActuators) {
      controller.gamepad.hapticActuators[0].pulse(0.3, 100);
    }
    
    this.showVRPanel(annotation, controller.position);
  }
}
```

**Implementation Priority:** HIGH
**Timeline:** Session 7-8 (with Claude Code)
**Dependencies:** 2.1

### 4.2 VR Panel System

**3D Text Panels:**
```javascript
createVRPanel(annotation) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Render text with word wrapping
  this.renderTextToCanvas(ctx, annotation.title, annotation.description);
  
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
  const geometry = new THREE.PlaneGeometry(2, 1);
  
  return new THREE.Mesh(geometry, material);
}
```

**Positioning Strategy:**
- Spawn 2 meters in front of user
- Always face camera (lookAt)
- Avoid overlap with scene geometry
- Smooth fade in/out animations

**Implementation Priority:** HIGH
**Timeline:** Session 8-9 (with Claude Code)
**Dependencies:** 4.1

### 4.3 VR Teleportation System

**Guided Tour Movement:**
```javascript
async teleportToAnnotation(annotation, fadeTime = 500) {
  // Fade out
  await this.vrFadeOverlay.fadeOut(fadeTime);
  
  // Position user at annotation viewpoint
  const vrPosition = this.convertCameraViewToVR(annotation.cameraView);
  this.viewer.vrSystem.setUserPosition(vrPosition.position);
  this.viewer.vrSystem.setUserRotation(vrPosition.rotation);
  
  // Fade in
  await this.vrFadeOverlay.fadeIn(fadeTime);
}
```

**Comfort Features:**
- Configurable teleport vs smooth movement
- Vignetting during movement
- Audio cues for transitions
- Emergency stop button

**Implementation Priority:** MEDIUM
**Timeline:** Session 9-10 (with Claude Code)
**Dependencies:** 4.2

## Phase 5: Tour System

### 5.1 Tour Modes

**Free Exploration Mode:**
- All markers visible and clickable
- No forced navigation
- Optional numbered sequence hints

**Ordered Tour Mode:**
- Guided sequence with next/previous controls
- Progress indicator
- Bookmark system for pausing/resuming

**Automatic Guided Tour:**
- Timed progression between annotations
- Configurable durations per annotation
- Play/pause/stop controls
- Speed adjustment (0.5x - 2x)

**Implementation Priority:** MEDIUM
**Timeline:** Session 10-12 (with Claude Code)
**Dependencies:** 3.2, 4.3

### 5.2 Multi-User Synchronization

**WebSocket Integration:**
```javascript
class TourSynchronizer {
  constructor(websocketUrl) {
    this.socket = new WebSocket(websocketUrl);
    this.isLeader = false;
    this.participants = new Map();
  }

  broadcastAnnotationSelection(annotationId) {
    if (this.isLeader) {
      this.socket.send(JSON.stringify({
        type: 'annotation_selected',
        annotationId,
        timestamp: Date.now()
      }));
    }
  }

  onRemoteAnnotationSelection(data) {
    if (!this.isLeader) {
      this.annotationSystem.selectAnnotation(data.annotationId, { fromRemote: true });
    }
  }
}
```

**Implementation Priority:** LOW (Phase 2)
**Timeline:** Future sessions after core features
**Dependencies:** 5.1

## Phase 6: BelowArchive Integration

### 6.1 Sketchfab Import System

**Core Archiver Class:**
```javascript
class BelowArchiver {
  constructor() {
    this.sketchfabAPI = new SketchfabAPIClient();
    this.progressCallbacks = [];
  }

  async archiveModel(sketchfabUrl, options = {}) {
    const modelId = this.extractModelId(sketchfabUrl);
    
    // Step 1: Extract annotations using Viewer API
    const annotations = await this.extractAnnotations(modelId);
    
    // Step 2: Download model if permitted
    const modelFile = await this.downloadModel(modelId, options.apiToken);
    
    // Step 3: Fetch metadata
    const metadata = await this.fetchMetadata(modelId);
    
    // Step 4: Convert to BelowJS format
    const belowjsData = this.convertToBelowJSFormat(annotations, metadata);
    
    return {
      model: modelFile,
      annotations: belowjsData,
      metadata: metadata,
      packageInfo: this.generatePackageInfo()
    };
  }
}
```

**Sketchfab Viewer API Integration:**
```javascript
extractAnnotations(modelId) {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    const client = new Sketchfab(iframe);
    client.init(modelId, {
      success: (api) => {
        api.addEventListener('viewerready', () => {
          api.getAnnotationList((err, annotations) => {
            if (err) reject(err);
            else resolve(annotations);
            document.body.removeChild(iframe);
          });
        });
      },
      error: reject,
      autostart: 1,
      preload: 1
    });
  });
}
```

**Implementation Priority:** MEDIUM (Optional)
**Timeline:** Session 13-15 (if needed)
**Dependencies:** 1.1

### 6.2 Format Conversion & Export

**Sketchfab to BelowJS Converter:**
```javascript
convertSketchfabAnnotations(sketchfabAnnotations) {
  return sketchfabAnnotations.map((annotation, index) => ({
    id: `annotation_${index}`,
    index: index + 1,
    position: {
      x: annotation.position[0],
      y: annotation.position[1], 
      z: annotation.position[2]
    },
    normal: annotation.normal ? {
      x: annotation.normal[0],
      y: annotation.normal[1],
      z: annotation.normal[2]
    } : { x: 0, y: 1, z: 0 },
    title: annotation.name || `Annotation ${index + 1}`,
    description: annotation.content || '',
    cameraView: this.convertCameraView(annotation.cameraTarget, annotation.cameraPosition),
    metadata: {
      originalSketchfabId: annotation.uid,
      converted: new Date().toISOString()
    }
  }));
}
```

**Export Formats:**
- BelowJS native JSON
- glTF with annotations extension
- model-viewer compatible HTML
- ZIP package with all assets

**Implementation Priority:** MEDIUM (Optional)
**Timeline:** Session 15-16 (if needed)
**Dependencies:** 6.1

## Phase 7: Performance & Polish

### 7.1 Performance Optimization

**Rendering Optimizations:**
- LOD system for markers based on distance
- Frustum culling for off-screen annotations
- Batched DOM updates for panel positioning
- WebGL instanced rendering for large annotation sets

**Memory Management:**
```javascript
class AnnotationMemoryManager {
  constructor(maxActiveAnnotations = 50) {
    this.maxActive = maxActiveAnnotations;
    this.annotationPool = [];
    this.activeAnnotations = new Set();
  }

  getAnnotation() {
    if (this.annotationPool.length > 0) {
      return this.annotationPool.pop();
    }
    return new AnnotationMarker();
  }

  releaseAnnotation(annotation) {
    annotation.reset();
    this.annotationPool.push(annotation);
    this.activeAnnotations.delete(annotation);
  }
}
```

**Implementation Priority:** HIGH
**Timeline:** Session 16-18 (with Claude Code)
**Dependencies:** Core features complete

### 7.2 Accessibility & UX

**Accessibility Features:**
- Keyboard navigation (Tab through annotations)
- Screen reader compatibility
- High contrast mode
- Reduced motion options
- Focus indicators

**User Experience Enhancements:**
- Smooth hover effects
- Loading states and progress indicators
- Error handling and recovery
- Undo/redo for tour navigation
- Search and filter annotations

**Implementation Priority:** MEDIUM
**Timeline:** Session 18-20 (with Claude Code)
**Dependencies:** 7.1

### 7.3 Testing & Documentation

**Testing Strategy:**
- Unit tests for core annotation logic
- Integration tests for VR/desktop parity
- Performance benchmarks
- Cross-browser compatibility testing
- Accessibility audit

**Documentation Deliverables:**
- API reference documentation
- Integration guide for developers
- Content creator tutorial
- Performance best practices
- Troubleshooting guide

**Implementation Priority:** HIGH
**Timeline:** Session 20+ (with Claude Code)
**Dependencies:** 7.2

## Implementation Timeline (Claude Code Development)

**Total Duration:** 15-20 Claude Code sessions (2-3 months of development)

**Phased Development with Claude Code:**
1. **Sessions 1-3:** Core infrastructure (data schema, plugin architecture, new annotations example)
2. **Sessions 4-7:** 3D marker system and desktop interaction  
3. **Sessions 8-10:** VR integration and panel system
4. **Sessions 11-12:** Tour system and camera animations
5. **Sessions 13-16:** BelowArchive integration (optional)
6. **Sessions 17-20:** Performance optimization and polish

**Development Approach:**
- **Iterative Implementation:** Build and test each component incrementally
- **Claude Code Assistance:** Leverage AI for rapid prototyping and code generation
- **Continuous Testing:** Test in browser after each major component
- **Modular Design:** Implement as independent modules that can be developed separately

**Claude Code Development Strategy:**
- Focus on one feature at a time for thorough implementation
- Use Claude's expertise in Three.js, WebGL, and browser APIs
- Leverage existing BelowJS patterns and conventions
- **Primary workspace:** `/examples/annotations/` - new dedicated example
- Test frequently using the dev server (`npm run dev:annotations`)
- Build production bundles (`npm run build`) before testing changes

**Risk Mitigation:**
- Start with desktop implementation (simpler) before VR
- Create minimal viable versions before adding polish
- Test cross-browser compatibility early and often
- Use existing Three.js examples and documentation for reference

## Success Metrics

**Technical Metrics:**
- Annotation render performance: >60fps with 100+ markers
- Panel positioning accuracy: <2px deviation
- Tour transition smoothness: <16ms frame times
- VR comfort rating: >8/10 from user testing

**User Experience Metrics:**
- Tour completion rate: >80%
- Annotation engagement: >70% click-through
- VR adoption rate: >40% of desktop users try VR
- Cross-platform feature parity: 100%

**Business Metrics:**
- Sketchfab import success rate: >95%
- Content creator adoption: 50+ annotated models in first month
- Developer integration time: <4 hours for basic setup

This implementation plan provides a comprehensive roadmap for creating an industry-leading 3D annotation system with Claude Code assistance. The modular approach allows for iterative development, testing each component thoroughly before moving to the next phase. Claude Code's expertise in Three.js and web technologies will accelerate development while maintaining high code quality and following BelowJS conventions.