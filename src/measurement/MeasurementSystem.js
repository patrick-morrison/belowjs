// MeasurementSystem.js
// Provides distance measurement tools for both VR and desktop modes.
// Originally inspired by the Adrasan VR Measurement Tool.


import * as THREE from 'three';
import { Line2, LineMaterial, LineGeometry } from './ThickLine.js';

/**
 * @typedef {Object} MeasurementSystemConfig
 * @property {THREE.Scene} scene - Three.js scene for measurement objects
 * @property {THREE.PerspectiveCamera} camera - Three.js camera
 * @property {THREE.WebGLRenderer} renderer - Three.js renderer
 * @property {Object} [controls] - Orbit controls for desktop mode
 * @property {THREE.Group} [dolly] - VR dolly for VR mode positioning
 * @property {Object} [config={}] - Additional configuration options
 * @property {string} [theme='dark'] - UI theme ('dark' or 'light')
 * @property {boolean} [showMeasurementLabels=false] - Whether to show measurement labels in desktop mode (always shown in VR)
 */

/**
 * MeasurementSystem - Distance measurement tools for VR and desktop
 * 
 * Provides precise distance measurement capabilities in both VR and desktop modes.
 * Features click-to-measure for desktop and controller-based measurement for VR,
 * with visual measurement lines, distance labels, and measurement management UI.
 * 
 * @class MeasurementSystem
 * 
 * @param {MeasurementSystemConfig} config - Configuration object
 * 
 * @fires MeasurementSystem#measurement-added - When a new measurement is created
 * @fires MeasurementSystem#measurement-cleared - When measurements are cleared
 * @fires MeasurementSystem#measurement-enabled - When measurement mode is enabled
 * @fires MeasurementSystem#measurement-disabled - When measurement mode is disabled
 * 
 * @example
 * // Basic usage with desktop support
 * const measurementSystem = new MeasurementSystem({
 *   scene: scene,
 *   camera: camera,
 *   renderer: renderer,
 *   controls: orbitControls,
 *   theme: 'dark'
 * });
 * 
 * // Enable measurement mode
 * measurementSystem.enable();
 * 
 * // Set targets for raycasting (usually your 3D models)
 * measurementSystem.setRaycastTargets([model1, model2]);
 * 
 * @example
 * // VR mode with dolly
 * const measurementSystem = new MeasurementSystem({
 *   scene: scene,
 *   camera: camera,
 *   renderer: renderer,
 *   dolly: vrDolly,
 *   theme: 'light'
 * });
 * 
 * // Attach VR controllers
 * measurementSystem.attachVR(renderer);
 * 
 * @since 1.0.0
 */
export class MeasurementSystem {
  /**
   * Set the objects to use for raycasting during measurement
   * 
   * Defines which 3D objects can be measured. Accepts meshes, groups, or arrays
   * and will traverse to find all meshes with geometry, excluding measurement helpers.
   * 
   * @method setRaycastTargets
   * @param {THREE.Object3D|THREE.Object3D[]} targets - Target objects for measurement
   * @returns {void}
   * 
   * @example
   * // Set a single model as measurement target
   * measurementSystem.setRaycastTargets(loadedModel);
   * 
   * @example
   * // Set multiple models as targets
   * measurementSystem.setRaycastTargets([model1, model2, model3]);
   * 
   * @since 1.0.0
   */
  setRaycastTargets(targets) {
    const meshTargets = [];
    const addMeshes = obj => {
      if (Array.isArray(obj)) {
        obj.forEach(addMeshes);
      } else if (obj && typeof obj === 'object') {
        if (obj.isMesh && obj.geometry && !this.isMeasurementHelper(obj)) {
          obj.updateMatrixWorld(true);
          meshTargets.push(obj);
        } else if (obj.traverse) {
          obj.traverse(child => {
            if (child.isMesh && child.geometry && !this.isMeasurementHelper(child)) {
              child.updateMatrixWorld(true);
              meshTargets.push(child);
            }
          });
        }
      }
    };
    addMeshes(targets);
    this._raycastTargets = meshTargets;
    // (Debug logging removed)

  }

  /**
   * Returns true if the object is a measurement helper (sphere, line, etc.)
   * @param {THREE.Object3D} obj
   */
  isMeasurementHelper(obj) {
    // Exclude measurement spheres, lines, and helpers by type, geometry, or userData
    if (!obj) return false;
    // Exclude our measurement spheres (by geometry reference or userData)
    if (obj.geometry === this.sphereGeometry || obj.userData.isMeasurementSphere) return true;
    // Exclude measurement lines (Line2, LineGeometry, etc.)
    if (obj.type === 'Line2' || obj.type === 'Line' || (obj.geometry && obj.geometry.type === 'LineGeometry')) return true;
    // Exclude known helper geometries (Ring, Tube, Plane, etc.)
    const helperGeometries = ['RingGeometry', 'TubeGeometry', 'PlaneGeometry', 'CircleGeometry'];
    if (obj.geometry && helperGeometries.includes(obj.geometry.type)) return true;
    // Exclude by name if you use a naming convention (optional)
    if (typeof obj.name === 'string' && obj.name.startsWith('MeasurementHelper')) return true;
    return false;
  }

  /**
   * Set the measurement target (single mesh, group, or array) for convenience.
   * Accepts a THREE.Object3D, Mesh, or array of meshes/groups.
   * @param {THREE.Object3D|THREE.Object3D[]} target
   */
  setTarget(target) {
    if (target) {
      this.setRaycastTargets(target);
    } else {
      this.setRaycastTargets([]);
    }
  }
  /**
   * @param {Object} opts
   * @param {THREE.Scene} opts.scene
   * @param {THREE.Camera} opts.camera
   * @param {THREE.WebGLRenderer} opts.renderer
   * @param {Object} opts.controls - OrbitControls or similar
   * @param {THREE.Group} [opts.dolly] - VR dolly/group (optional)
   * @param {Object} [opts.config] - UI/behavior config (optional)
   */
  /**
   * Creates a new MeasurementSystem instance
   * 
   * @param {MeasurementSystemConfig} config - Configuration object
   */
  constructor({ scene, camera, renderer, controls, dolly, config = {}, theme = 'dark', showMeasurementLabels = false }) {
    // Always initialize ghostSpheres to avoid undefined and allow debug visibility
    this.ghostSpheres = {
      left: null,
      right: null
    };
    // Always keep two spheres in VR mode (fix: ensure defined before attachVR)
    this.MAX_SPHERES = 2;
    
    // VR measurement state (Adrasan-style FIFO queue)
    this.measurementSpheres = []; // FIFO queue for spheres (max 2)
    this.measurementLine = null;
    this.measurementLabel = null;
    this.previousTriggerState = {}; // Track trigger state for polling
    
    // Unified measurement points (works across VR and desktop)
    this.unifiedMeasurementPoints = []; // Max 2 points, works in both VR and desktop
    this.unifiedMeasurementLine = null;
    
    // Legacy desktop state (for compatibility)
    this.desktopMeasurementPoints = [];
    this.desktopMeasurementLine = null;
    
    // Expose for debugging
    if (typeof window !== 'undefined') {
      window.measurementSystem = this;
    }
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.controls = controls;
    this.dolly = dolly;
    this.config = config;
    this.theme = theme; // 'dark' or 'light'
    this.showMeasurementLabels = showMeasurementLabels;

    // By default, raycast against all scene children
    this._raycastTargets = (scene && scene.children) ? scene.children : [];

    // Measurement state
    this.enabled = true; // Start enabled by default
    this.isVR = false;
    this.measurementPanel = null;
    this.desktopMeasurementMode = false; // Start disabled by default
    this.measurementSystemEnabled = true;
    this.desktopMeasurementPoints = [];
    this.connectionLine = null;
    this.desktopMeasurementLine = null;
    this.measurementSprite = null;
    this.measurementCanvas = null;
    this.measurementTexture = null;
    this.lastClickTime = 0;
    this.lastTriggerTime = 0; // Debounce for VR trigger events
    this._wasInVR = false; // Track VR state changes
    this.focusAnimation = null;
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    // --- Robust VR controller parenting for ghost spheres (auto-attach logic) ---
    // This logic will auto-attach ghost spheres to VR controllers if present, and re-attach on session start or controller reconnection.
    // --- Robust VR controller parenting for ghost spheres (auto-attach logic, with fallback and visibility) ---
    const tryAttachMeasurementVR = () => {
      let controller1 = null, controller2 = null, controllerGrip1 = null, controllerGrip2 = null;
      // Try to find controllers via scene graph (THREE/WebXR convention)
      if (scene && scene.children) {
        scene.children.forEach(obj => {
          if (obj && obj.inputSource && obj.inputSource.handedness) {
            if (obj.inputSource.handedness === 'left') controller1 = obj;
            if (obj.inputSource.handedness === 'right') controller2 = obj;
          }
        });
      }
      // Fallback: try to get from renderer.xr if available (for custom VRManager)
      if ((!controller1 || !controller2) && renderer && renderer.xr && renderer.xr.getController) {
        try {
          controller1 = controller1 || renderer.xr.getController(0);
          controller2 = controller2 || renderer.xr.getController(1);
        } catch (e) {}
      }
      // If controllers found, attach and force ghost spheres visible
      if (controller1 && controller2) {
        this.attachVR({ controller1, controller2, controllerGrip1, controllerGrip2 });
        if (this.ghostSpheres && this.ghostSpheres.left && this.ghostSpheres.right) {
          this.ghostSpheres.left.visible = true;
          this.ghostSpheres.right.visible = true;
        }
      } else {
        // If not found, try again later (up to 10s)
        if (!this._ghostSphereAttachRetries) this._ghostSphereAttachRetries = 0;
        if (this._ghostSphereAttachRetries < 40) {
          this._ghostSphereAttachRetries++;
          setTimeout(tryAttachMeasurementVR, 250);
        } else {
          // After repeated failures, log a warning
          if (typeof window !== 'undefined' && window.console) {
            console.warn('[MeasurementSystem] Could not find VR controllers to attach ghost spheres after multiple attempts.');
          }
        }
      }
    };
    tryAttachMeasurementVR();
    // Optionally, listen for WebXR session events if available
    if (renderer && renderer.xr && renderer.xr.addEventListener) {
      renderer.xr.addEventListener('sessionstart', tryAttachMeasurementVR);
    }
    this.sphereGeometry = new THREE.SphereGeometry(0.02, 8, 6);
    this.placedMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    // Thick line materials for VR and desktop
    this.vrLineMaterial = new LineMaterial({
      color: 0xffffff,
      linewidth: 3, // 3px thick
      transparent: true,
      opacity: 0.8,
      depthTest: false,
      vertexColors: false,
      dashed: false
    });
    this.desktopLineMaterial = new LineMaterial({
      color: 0xffffff,
      linewidth: 3, // 3px thick
      transparent: true,
      opacity: 1.0,
      depthTest: false,
      vertexColors: false,
      dashed: false
    });
    this.MAX_DESKTOP_POINTS = 2;
    this.DRAG_THRESHOLD = 5;
    this.isDragging = false;
    this.dragStartPosition = { x: 0, y: 0 };

    // Panel
    this.createMeasurementPanel();
    this.updateMeasurementPanel();

    // Mouse events (don't use capture to avoid interfering with ModelViewer's focus system)
    this._boundOnMouseClick = this.onMouseClick.bind(this);
    //
    this._boundOnMouseDown = this.onMouseDown.bind(this);
    this._boundOnMouseMove = this.onMouseMove.bind(this);
    this._boundOnMouseUp = this.onMouseUp.bind(this);
    this.renderer.domElement.addEventListener('click', this._boundOnMouseClick, false);
    this.renderer.domElement.addEventListener('mousedown', this._boundOnMouseDown, false);
    this.renderer.domElement.addEventListener('mousemove', this._boundOnMouseMove, false);
    this.renderer.domElement.addEventListener('mouseup', this._boundOnMouseUp, false);

    // --- AUTO-ATTACH VR CONTROLLERS IF AVAILABLE ---
    if (renderer && renderer.xr && typeof renderer.xr.getController === 'function') {
      // Always attach VR controllers on every session start
      const manualAttachVR = () => {
        if (renderer.xr.isPresenting) {
          const controller1 = renderer.xr.getController(0);
          const controller2 = renderer.xr.getController(1);
          const controllerGrip1 = renderer.xr.getControllerGrip ? renderer.xr.getControllerGrip(0) : undefined;
          const controllerGrip2 = renderer.xr.getControllerGrip ? renderer.xr.getControllerGrip(1) : undefined;
          // Always call attachVR if controllers are available
          this.attachVR({ controller1, controller2, controllerGrip1, controllerGrip2 });
        }
      };
      // Listen for XR session start
      if (renderer.xr.addEventListener) {
        renderer.xr.addEventListener('sessionstart', manualAttachVR);
      }
      // If already presenting, attach immediately
      if (renderer.xr.isPresenting) {
        manualAttachVR();
      }
      // Also patch the renderer.xr object's requestSession to always call attachVR after session starts
      if (renderer.xr && typeof renderer.xr.requestSession === 'function' && !renderer.xr._measurementSystemPatched) {
        const origRequestSession = renderer.xr.requestSession.bind(renderer.xr);
        renderer.xr.requestSession = async (...args) => {
          const session = await origRequestSession(...args);
          // Wait for session to be fully started
          setTimeout(() => {
            manualAttachVR();
          }, 100);
          return session;
        };
        renderer.xr._measurementSystemPatched = true;
      }
    }

    // DEBUG: Warn if attachVR is never called, but only if WebXR is available and presenting
    setTimeout(() => {
      if (
        renderer && renderer.xr && typeof renderer.xr.isPresenting === 'boolean' &&
        renderer.xr.isPresenting &&
        !this.isVR
      ) {
        console.warn('[MeasurementSystem] WARNING: attachVR() was never called. VR ghost spheres and VR measurement will not work.');
      }
    }, 5000);
  }

  // --- VR/Shared Logic (Stub for now, will be filled in) ---
  // These methods will be filled in with the full VR and shared logic ported from Adrasan.

  /**
   * Enable measurement mode
   * 
   * Activates the measurement system, showing the measurement panel and
   * enabling click-to-measure functionality for desktop mode.
   * 
   * @method enable
   * @returns {void}
   * 
   * @fires MeasurementSystem#measurement-enabled
   * 
   * @example
   * // Enable measurement mode
   * measurementSystem.enable();
   * 
   * @since 1.0.0
   */
  enable() {
    this.desktopMeasurementMode = true;
    this.updateMeasurementPanel();
  }

  /**
   * Disable measurement mode
   * 
   * Deactivates the measurement system, hiding the measurement panel and
   * clearing any active desktop measurements.
   * 
   * @method disable
   * @returns {void}
   * 
   * @fires MeasurementSystem#measurement-disabled
   * 
   * @example
   * // Disable measurement mode
   * measurementSystem.disable();
   * 
   * @since 1.0.0
   */
  disable() {
    this.desktopMeasurementMode = false;
    this.updateMeasurementPanel();
    this.clearDesktopMeasurement();
  }

  // Toggle measurement system
  toggle() {
    this.desktopMeasurementMode = !this.desktopMeasurementMode;
    this.updateMeasurementPanel();
    if (!this.desktopMeasurementMode) {
      this.clearDesktopMeasurement();
    }
  }

  // Clear all measurements (desktop and VR)
  clear() {
    this.clearUnifiedMeasurement();
    this.clearLegacyDesktopMeasurement();
    this.clearLegacyVRMeasurement();
  }

  // Clear unified measurements
  clearUnifiedMeasurement() {
    // Clear unified measurement points
    if (this.unifiedMeasurementPoints && this.unifiedMeasurementPoints.length > 0) {
      this.unifiedMeasurementPoints.forEach(point => {
        if (point.sphere && this.scene.children.includes(point.sphere)) {
          this.scene.remove(point.sphere);
        }
      });
      this.unifiedMeasurementPoints.length = 0;
    }
    
    // Clear unified measurement line
    if (this.unifiedMeasurementLine) {
      this.scene.remove(this.unifiedMeasurementLine);
      this.unifiedMeasurementLine = null;
    }
    
    // Clear measurement sprite/label
    if (this.measurementSprite) {
      this.measurementSprite.visible = false;
      this.scene.remove(this.measurementSprite);
      this.measurementSprite = null;
    }
    
    this.updateMeasurementPanel();
  }

  // Clear VR measurements
  clearVRMeasurement() {
    // Clear FIFO queue spheres (Adrasan-style)
    if (this.measurementSpheres) {
      this.measurementSpheres.forEach(sphere => this.scene.remove(sphere));
      this.measurementSpheres.length = 0;
    }
    // Clear measurement line
    if (this.measurementLine) {
      this.scene.remove(this.measurementLine);
      this.measurementLine = null;
    }
    // Clear measurement label
    if (this.measurementLabel) {
      this.scene.remove(this.measurementLabel);
      this.measurementLabel = null;
    }
    // Clear old placedSpheres if any (legacy compatibility)
    if (this.placedSpheres) {
      this.placedSpheres.forEach(sphere => this.scene.remove(sphere));
      this.placedSpheres.length = 0;
    }
    if (this.connectionLine) {
      this.scene.remove(this.connectionLine);
      this.connectionLine = null;
    }
    if (this.measurementSprite) {
      this.measurementSprite.visible = false;
    }
    this.measurementSystemEnabled = true;
    this.updateMeasurementPanel();
  }

  /**
   * Clear legacy VR measurements (old system compatibility)
   */
  clearLegacyVRMeasurement() {
    // Clear old VR FIFO queue spheres (measurementSpheres)
    if (this.measurementSpheres && this.measurementSpheres.length > 0) {
      this.measurementSpheres.forEach(sphere => {
        if (sphere && this.scene.children.includes(sphere)) {
          this.scene.remove(sphere);
        }
      });
      this.measurementSpheres.length = 0;
    }
    
    // Clear old VR measurement line
    if (this.measurementLine) {
      this.scene.remove(this.measurementLine);
      this.measurementLine = null;
    }
    
    // Clear old connection line
    if (this.connectionLine) {
      this.scene.remove(this.connectionLine);
      this.connectionLine = null;
    }
    
    // Clear old measurement label/sprite
    if (this.measurementLabel) {
      this.scene.remove(this.measurementLabel);
      this.measurementLabel = null;
    }
  }

  // Sync desktop measurements to VR (stub)
  syncToVR() {
    // Copy desktop measurement points to VR state
    if (this.desktopMeasurementPoints.length === 2) {
      this.clearVRMeasurement();
      this.desktopMeasurementPoints.forEach(point => {
        const newSphere = new THREE.Mesh(this.sphereGeometry, this.placedMaterial);
        newSphere.position.copy(point.position);
        this.scene.add(newSphere);
        this.measurementSpheres.push(newSphere);
      });
      // Create VR line
      if (this.measurementSpheres.length === 2) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          this.measurementSpheres[0].position,
          this.measurementSpheres[1].position
        ]);
        const material = this.vrLineMaterial || new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8, depthTest: false });
        this.connectionLine = new THREE.Line(geometry, material);
        this.scene.add(this.connectionLine);
        // Create measurement display
        this.createMeasurementDisplay(this.measurementSpheres[0].position.distanceTo(this.measurementSpheres[1].position));
        if (this.measurementSprite && !this.scene.children.includes(this.measurementSprite)) {
          this.scene.add(this.measurementSprite);
        }
      }
      this.measurementSystemEnabled = true;
      this.updateMeasurementPanel();
    }
  }

  // Sync VR measurements to desktop (stub)
  syncToDesktop() {
    // Copy VR measurement points to desktop state, using new measurementSpheres array
    if (this.measurementSpheres && this.measurementSpheres.length === 2) {
      this.clearDesktopMeasurement();
      // For each VR point, find closest point on model (raycast from camera to point direction)
      for (let i = 0; i < 2; i++) {
        const vrPos = this.measurementSpheres[i].position.clone();
        let clampedPos = vrPos;
        // Try to clamp to model geometry if possible
        if (this._raycastTargets && this._raycastTargets.length > 0 && this.camera) {
          // Ray from camera to VR point
          const dir = vrPos.clone().sub(this.camera.position).normalize();
          const raycaster = new THREE.Raycaster(this.camera.position, dir);
          const intersects = raycaster.intersectObjects(this._raycastTargets, true);
          if (intersects.length > 0) {
            clampedPos = intersects[0].point;
          }
        }
        const newSphere = new THREE.Mesh(this.sphereGeometry, this.placedMaterial);
        newSphere.position.copy(clampedPos);
        this.scene.add(newSphere);
        this.desktopMeasurementPoints.push(newSphere);
      }
      // Create desktop line using Line2 for consistency
      if (this.desktopMeasurementPoints.length === 2) {
        const lineGeometry = new LineGeometry();
        lineGeometry.setPositions([
          this.desktopMeasurementPoints[0].position.x, this.desktopMeasurementPoints[0].position.y, this.desktopMeasurementPoints[0].position.z,
          this.desktopMeasurementPoints[1].position.x, this.desktopMeasurementPoints[1].position.y, this.desktopMeasurementPoints[1].position.z
        ]);
        this.desktopMeasurementLine = new Line2(lineGeometry, this.desktopLineMaterial);
        this.desktopMeasurementLine.computeLineDistances();
        this.scene.add(this.desktopMeasurementLine);
        
        // Create measurement sprite for desktop display
        const distance = this.desktopMeasurementPoints[0].position.distanceTo(this.desktopMeasurementPoints[1].position);
        this.createMeasurementDisplay(distance);
        if (this.measurementSprite) {
          // Calculate proper midpoint between the two spheres
          const midpoint = new THREE.Vector3();
          midpoint.addVectors(this.desktopMeasurementPoints[0].position, this.desktopMeasurementPoints[1].position);
          midpoint.multiplyScalar(0.5);
          
          // Add a proportional offset above the line based on distance
          const offsetScale = Math.max(0.05, Math.min(0.2, distance * 0.03));
          midpoint.y += offsetScale;
          
          this.measurementSprite.position.copy(midpoint);
          // Note: Sprite should never be visible in desktop mode, even when syncing from VR
          this.measurementSprite.visible = false;
          if (!this.scene.children.includes(this.measurementSprite)) {
            this.scene.add(this.measurementSprite);
          }
          
          // Auto-centering is now handled directly by VRManager on session end
        }
      }
      // Note: Don't auto-enable desktop measurement mode when syncing from VR
      this.updateMeasurementPanel();
    }
  }

  // Update method for render loop (stub)
  // --- Shared Measurement Display (Sprite/Canvas) ---
  createMeasurementDisplay(distance) {
    // Use a high-DPI canvas for sharp text at any scale
    const DPR = (window.devicePixelRatio || 1);
    const logicalWidth = 256;
    const logicalHeight = 64;
    const canvasWidth = logicalWidth * DPR;
    const canvasHeight = logicalHeight * DPR;
    if (!this.measurementCanvas) {
      this.measurementCanvas = document.createElement('canvas');
    }
    if (this.measurementCanvas.width !== canvasWidth || this.measurementCanvas.height !== canvasHeight) {
      this.measurementCanvas.width = canvasWidth;
      this.measurementCanvas.height = canvasHeight;
    }
    const context = this.measurementCanvas.getContext('2d');
    context.setTransform(1, 0, 0, 1, 0, 0); // reset any transforms
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    // Scale context for high-DPI rendering
    context.save();
    context.scale(DPR, DPR);
    const baseFontSize = 24;
    let scaleFactor;
    if (distance <= 2.0) {
      scaleFactor = 0.4 + (distance / 2.0) * 0.3;
    } else if (distance <= 4.0) {
      scaleFactor = 0.7 + ((distance - 2.0) / 2.0) * 0.2;
    } else {
      const progress = Math.min((distance - 4.0) / 16.0, 1.0);
      scaleFactor = 0.9 + progress * 0.5;
    }
    const fontSize = Math.round(baseFontSize * scaleFactor);
    context.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`;
    const text = `${distance.toFixed(2)}m`;
    const textMetrics = context.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = fontSize;
    const padding = Math.max(6, fontSize * 0.3);
    const bgWidth = textWidth + (padding * 2);
    const bgHeight = textHeight + (padding * 2);
    const bgX = (logicalWidth - bgWidth) / 2;
    const bgY = (logicalHeight - bgHeight) / 2;
    context.fillStyle = 'rgba(0, 0, 0, 0.8)';
    context.beginPath();
    context.roundRect(bgX, bgY, bgWidth, bgHeight, Math.max(4, fontSize * 0.2));
    context.fill();
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, logicalWidth / 2, logicalHeight / 2);
    context.restore();
    if (!this.measurementTexture) {
      this.measurementTexture = new THREE.CanvasTexture(this.measurementCanvas);
      this.measurementTexture.minFilter = THREE.LinearFilter;
      this.measurementTexture.magFilter = THREE.LinearFilter;
    } else {
      this.measurementTexture.needsUpdate = true;
    }
    if (!this.measurementSprite) {
      const spriteMaterial = new THREE.SpriteMaterial({ 
        map: this.measurementTexture,
        depthTest: false,
        depthWrite: false 
      });
      this.measurementSprite = new THREE.Sprite(spriteMaterial);
    }
    const baseScale = 0.3;
    const spriteScale = baseScale * scaleFactor;
    const aspectRatio = logicalWidth / logicalHeight;
    this.measurementSprite.scale.set(spriteScale * aspectRatio, spriteScale, 1);
    return this.measurementSprite;
  }

  // --- VR Logic ---
  // Call this after VR controllers are available and renderer.xr is enabled
  /**
   * Attach VR controllers for VR measurement mode
   * 
   * Sets up VR controller support for measurement functionality, including
   * ghost spheres for controller position indication and trigger-based measurement.
   * 
   * @method attachVR
   * @param {Object} controllers - VR controller objects
   * @param {THREE.Object3D} controllers.controller1 - First VR controller
   * @param {THREE.Object3D} controllers.controller2 - Second VR controller  
   * @param {THREE.Object3D} controllers.controllerGrip1 - First controller grip
   * @param {THREE.Object3D} controllers.controllerGrip2 - Second controller grip
   * @returns {void}
   * 
   * @example
   * // Attach VR controllers from VRManager
   * measurementSystem.attachVR({
   *   controller1: vrManager.controller1,
   *   controller2: vrManager.controller2,
   *   controllerGrip1: vrManager.controllerGrip1,
   *   controllerGrip2: vrManager.controllerGrip2
   * });
   * 
   * @since 1.0.0
   */
  attachVR({ controller1, controller2, controllerGrip1, controllerGrip2 }) {
    
    this.controller1 = controller1;
    this.controller2 = controller2;
    this.controllerGrip1 = controllerGrip1;
    this.controllerGrip2 = controllerGrip2;
    // Ghost spheres for VR (attach to controllers, not scene)
    // Make ghost spheres ghostly grey, semi-opaque
    const ghostMaterial = new THREE.MeshBasicMaterial({
      color: 0x888888, // ghostly grey
      transparent: true,
      opacity: 0.25,
      depthTest: false,
      depthWrite: false
    });
    // Remove any previous ghost spheres from scene or controllers
    if (this.ghostSpheres.left && this.ghostSpheres.left.parent) this.ghostSpheres.left.parent.remove(this.ghostSpheres.left);
    if (this.ghostSpheres.right && this.ghostSpheres.right.parent) this.ghostSpheres.right.parent.remove(this.ghostSpheres.right);
    // Create new ghost spheres
    this.ghostSpheres.left = new THREE.Mesh(this.sphereGeometry, ghostMaterial.clone());
    this.ghostSpheres.right = new THREE.Mesh(this.sphereGeometry, ghostMaterial.clone());
    // Match ghost sphere size to measurement spheres
    this.ghostSpheres.left.scale.set(1, 1, 1);
    this.ghostSpheres.right.scale.set(1, 1, 1);
    // Position at controller tip
    this.ghostSpheres.left.position.set(0, 0, -0.05);
    this.ghostSpheres.right.position.set(0, 0, -0.05);
    // Make them visible by default in VR
    this.ghostSpheres.left.visible = true;
    this.ghostSpheres.right.visible = true;
    if (this.controller1) this.controller1.add(this.ghostSpheres.left);
    if (this.controller2) this.controller2.add(this.ghostSpheres.right);
    // VR event state
    this.yButtonPressed = false;
    this.MAX_SPHERES = 2;
    
    // Track trigger state for each hand (like Adrasan)
    this.triggerState = {
      left: false,
      right: false
    };

    // VR controller event listeners
    this._onVRTriggerDown = this._onVRTriggerDown.bind(this);
    this._onVRTriggerUp = this._onVRTriggerUp.bind(this);
    this._onVRYButtonDown = this._onVRYButtonDown.bind(this);
    this._onVRYButtonUp = this._onVRYButtonUp.bind(this);
    if (this.controller1 && this.controller2) {
      this.controller1.addEventListener('selectstart', this._onVRTriggerDown);
      this.controller1.addEventListener('selectend', this._onVRTriggerUp);
      this.controller2.addEventListener('selectstart', this._onVRTriggerDown);
      this.controller2.addEventListener('selectend', this._onVRTriggerUp);
      this.controller1.addEventListener('ybuttondown', this._onVRYButtonDown);
      this.controller1.addEventListener('ybuttonup', this._onVRYButtonUp);
      this.controller2.addEventListener('ybuttondown', this._onVRYButtonDown);
      this.controller2.addEventListener('ybuttonup', this._onVRYButtonUp);
    }
    this.isVR = true;
    
    // Refresh measurement display for VR if we have existing measurements
    this.refreshMeasurementDisplayForVR();
  }

  // VR controller event handlers (kept for Y button, but trigger logic moved to update loop)
  _onVRTriggerDown(event) {
    // Track which controller triggered
    const controller = event.target;
    const handedness = controller.userData?.inputSource?.handedness || 'unknown';
  }

  _onVRTriggerUp(event) {
    // Place sphere on trigger release - simple approach
    const controller = event.target;
    const handedness = controller.userData?.inputSource?.handedness || 'unknown';
    
    // Debounce to prevent multiple placements from one trigger press
    const now = performance.now();
    if (this.lastTriggerTime && (now - this.lastTriggerTime) < 200) {
      return;
    }
    this.lastTriggerTime = now;
    
    if (this.measurementSystemEnabled) {
      // Get the world position where the ghost sphere is positioned
      const controllerPos = new THREE.Vector3();
      
      // Find which ghost sphere corresponds to this controller
      let ghostSphere = null;
      if (controller === this.controller1 && this.ghostSpheres.left) {
        ghostSphere = this.ghostSpheres.left;
      } else if (controller === this.controller2 && this.ghostSpheres.right) {
        ghostSphere = this.ghostSpheres.right;
      }
      
      if (ghostSphere) {
        // Get the world position of the ghost sphere to match exactly
        ghostSphere.getWorldPosition(controllerPos);
      } else {
        // Fallback: controller position with offset
        controller.getWorldPosition(controllerPos);
        const forward = new THREE.Vector3(0, 0, -0.05);
        forward.applyQuaternion(controller.quaternion);
        controllerPos.add(forward);
      }
      
      this._placeVRMeasurementPoint(controllerPos);
    }
  }

  _onVRYButtonDown(event) {
    // Clear unified measurement
    this.clearUnifiedMeasurement();
  }

  _onVRYButtonUp(event) {
    // No-op
  }

  _getVRControllerIntersection(controller) {
    // Raycast from controller
    const tempMatrix = new THREE.Matrix4();
    tempMatrix.identity().extractRotation(controller.matrixWorld);
    const rayOrigin = new THREE.Vector3();
    const rayDirection = new THREE.Vector3(0, 0, -1).applyMatrix4(tempMatrix);
    controller.getWorldPosition(rayOrigin);
    const raycaster = new THREE.Raycaster(rayOrigin, rayDirection.normalize());
    const intersects = raycaster.intersectObjects(this.scene.children, true);
    // Filter out measurement spheres/lines using unified system
    const validIntersects = intersects.filter(intersect => {
      // Check if object is in unified measurement points
      const isUnifiedSphere = this.unifiedMeasurementPoints.some(point => point.sphere === intersect.object);
      // Check if object is the unified measurement line
      const isUnifiedLine = intersect.object === this.unifiedMeasurementLine;
      // Check by userData for measurement helpers
      const isMeasurementHelper = this.isMeasurementHelper(intersect.object);
      
      return !isUnifiedSphere && !isUnifiedLine && !isMeasurementHelper;
    });
    return validIntersects.length > 0 ? validIntersects[0] : null;
  }

  _placeVRMeasurementPoint(point) {
    
    if (this.measurementSystemEnabled) {
      // Use the unified measurement system
      this.placeUnifiedMeasurementPoint(point, 'vr');
    }
  }

  /**
   * Clear legacy desktop measurements
   */
  clearLegacyDesktopMeasurement() {
    // Clear old desktop measurement points
    if (this.desktopMeasurementPoints && this.desktopMeasurementPoints.length > 0) {
      this.desktopMeasurementPoints.forEach(sphere => {
        if (sphere && this.scene.children.includes(sphere)) {
          this.scene.remove(sphere);
        }
      });
      this.desktopMeasurementPoints.length = 0;
    }
    
    // Clear old desktop measurement line
    if (this.desktopMeasurementLine) {
      this.scene.remove(this.desktopMeasurementLine);
      this.desktopMeasurementLine = null;
    }
  }

  /**
   * Unified measurement point placement that works across VR and desktop
   * @param {THREE.Vector3} point - World position to place measurement point
   * @param {string} source - 'vr' or 'desktop' for tracking
   */
  placeUnifiedMeasurementPoint(point, source = 'unknown') {
    
    // Only clear legacy systems if this is the start of a new measurement
    if (this.unifiedMeasurementPoints.length === 0) {
      this.clearLegacyVRMeasurement();
      this.clearLegacyDesktopMeasurement();
    }
    
    // Remove oldest point if we already have 2 (FIFO)
    if (this.unifiedMeasurementPoints.length >= 2) {
      const oldestPoint = this.unifiedMeasurementPoints.shift();
      if (oldestPoint.sphere) this.scene.remove(oldestPoint.sphere);
    }
    
    // Create new sphere for this point
    const sphere = new THREE.Mesh(this.sphereGeometry, this.placedMaterial);
    sphere.position.copy(point);
    sphere.userData.isMeasurementSphere = true;
    this.scene.add(sphere);
    
    // Add to unified measurement points
    this.unifiedMeasurementPoints.push({
      position: point.clone(),
      sphere: sphere,
      source: source
    });
    
    // Update the unified line if we have 2 points
    this.updateUnifiedMeasurementLine();
    
    // Update panel
    this.updateMeasurementPanel();
    
  }

  /**
   * Update the unified measurement line connecting the points
   */
  updateUnifiedMeasurementLine() {
    // Remove existing unified line
    if (this.unifiedMeasurementLine) {
      this.scene.remove(this.unifiedMeasurementLine);
      this.unifiedMeasurementLine = null;
    }
    
    // Create new line if we have 2 points
    if (this.unifiedMeasurementPoints.length === 2) {
      const point1 = this.unifiedMeasurementPoints[0].position;
      const point2 = this.unifiedMeasurementPoints[1].position;
      
      const lineGeometry = new LineGeometry();
      lineGeometry.setPositions([
        point1.x, point1.y, point1.z,
        point2.x, point2.y, point2.z
      ]);
      
      // Use the same material for consistency
      this.unifiedMeasurementLine = new Line2(lineGeometry, this.desktopLineMaterial);
      this.unifiedMeasurementLine.computeLineDistances();
      this.unifiedMeasurementLine.userData.isMeasurementLine = true;
      this.scene.add(this.unifiedMeasurementLine);
      
      // Create/update measurement display
      const distance = point1.distanceTo(point2);
      this.createMeasurementDisplay(distance);
      
      if (this.measurementSprite) {
        const midpoint = new THREE.Vector3();
        midpoint.addVectors(point1, point2);
        midpoint.multiplyScalar(0.5);
        
        const offsetScale = Math.max(0.05, Math.min(0.2, distance * 0.03));
        midpoint.y += offsetScale;
        
        this.measurementSprite.position.copy(midpoint);
        
        // Add sprite to scene if not already there
        if (!this.scene.children.includes(this.measurementSprite)) {
          this.scene.add(this.measurementSprite);
        }
        
        // Ensure sprite visibility is set correctly right away
        const inVR = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting;
        this.measurementSprite.visible = inVR || this.showMeasurementLabels;
      }
      
      // Auto-enable desktop measurement mode so measurements persist
      if (!this.desktopMeasurementMode) {
        this.desktopMeasurementMode = true;
      }
    }
 }

  /**
   * Reset ghost sphere positions to correct local coordinates
   * Useful when VR coordinate systems get corrupted (e.g., returning from Quest browser)
   */
  resetGhostSpherePositions() {
    if (this.isVR && this.ghostSpheres) {
      // Reset to local controller coordinates, not world coordinates
      if (this.ghostSpheres.left && this.controller1 && this.ghostSpheres.left.parent === this.controller1) {
        this.ghostSpheres.left.position.set(0, 0, -0.05);
        this.ghostSpheres.left.rotation.set(0, 0, 0);
        this.ghostSpheres.left.scale.set(1, 1, 1);
      }
      if (this.ghostSpheres.right && this.controller2 && this.ghostSpheres.right.parent === this.controller2) {
        this.ghostSpheres.right.position.set(0, 0, -0.05);
        this.ghostSpheres.right.rotation.set(0, 0, 0);
        this.ghostSpheres.right.scale.set(1, 1, 1);
      }
    }
  }

  /**
   * Update method called each frame by the render loop
   */
  update() {
    // No need to update ghost sphere positions if they're parented to controllers
    // They automatically inherit controller transforms
    // Only reset if they seem to be in wrong position (basic validation)
    if (this.isVR && this.ghostSpheres) {
      if (this.ghostSpheres.left && this.controller1 && this.ghostSpheres.left.visible) {
        // Check if position is unreasonably far from origin (indicates corruption)
        if (this.ghostSpheres.left.position.length() > 1.0) {
          this.resetGhostSpherePositions();
        }
      }
      if (this.ghostSpheres.right && this.controller2 && this.ghostSpheres.right.visible) {
        // Check if position is unreasonably far from origin (indicates corruption)
        if (this.ghostSpheres.right.position.length() > 1.0) {
          this.resetGhostSpherePositions();
        }
      }
    }
    
    // Update measurement sprite visibility based on current VR state
    if (this.measurementSprite) {
      const inVR = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting;
      const hasUnifiedMeasurement = this.unifiedMeasurementPoints && this.unifiedMeasurementPoints.length === 2;
      this.measurementSprite.visible = hasUnifiedMeasurement && (inVR || this.showMeasurementLabels);
    }
  }

  // Dispose/cleanup
  /**
   * Clean up and dispose of measurement system resources
   * 
   * Removes the measurement panel, clears all measurements, disposes of
   * materials and geometries, and removes event listeners.
   * 
   * @method dispose
   * @returns {void}
   * 
   * @example
   * // Clean up measurement system
   * measurementSystem.dispose();
   * 
   * @since 1.0.0
   */
  dispose() {
    // Remove panel
    if (this.measurementPanel && this.measurementPanel.parentNode) {
      this.measurementPanel.parentNode.removeChild(this.measurementPanel);
      this.measurementPanel = null;
    }
    // Remove event listeners
    this.renderer.domElement.removeEventListener('click', this._boundOnMouseClick, false);
    this.renderer.domElement.removeEventListener('mousedown', this._boundOnMouseDown, false);
    this.renderer.domElement.removeEventListener('mousemove', this._boundOnMouseMove, false);
    this.renderer.domElement.removeEventListener('mouseup', this._boundOnMouseUp, false);
    // Remove VR controller listeners
    if (this.controller1 && this.controller2) {
      this.controller1.removeEventListener('selectstart', this._onVRTriggerDown);
      this.controller1.removeEventListener('selectend', this._onVRTriggerUp);
      this.controller2.removeEventListener('selectstart', this._onVRTriggerDown);
      this.controller2.removeEventListener('selectend', this._onVRTriggerUp);
      this.controller1.removeEventListener('ybuttondown', this._onVRYButtonDown);
      this.controller1.removeEventListener('ybuttonup', this._onVRYButtonUp);
      this.controller2.removeEventListener('ybuttondown', this._onVRYButtonDown);
      this.controller2.removeEventListener('ybuttonup', this._onVRYButtonUp);
    }
    // Remove Three.js objects
    this.clearDesktopMeasurement();
    this.clearVRMeasurement();
    if (this.ghostSpheres) {
      if (this.ghostSpheres.left) this.scene.remove(this.ghostSpheres.left);
      if (this.ghostSpheres.right) this.scene.remove(this.ghostSpheres.right);
      this.ghostSpheres = null;
    }
    if (this.measurementSprite && this.scene.children.includes(this.measurementSprite)) {
      this.scene.remove(this.measurementSprite);
      this.measurementSprite = null;
    }
    if (this.connectionLine && this.scene.children.includes(this.connectionLine)) {
      this.scene.remove(this.connectionLine);
      this.connectionLine = null;
    }
    this.measurementSpheres = [];
    this.isVR = false;
    
    // Clean up global references
    if (typeof window !== 'undefined' && window.measurementSystem === this) {
      window.measurementSystem = undefined;
    }
  }
  // --- UI Panel ---
  createMeasurementPanel() {
    const panel = document.createElement('div');
    panel.id = 'measurementPanel';
    panel.className = `measurement-panel${this.theme === 'light' ? ' light-theme' : ''}`;
    
    panel.addEventListener('click', () => {
      if (!(this.renderer && this.renderer.xr && this.renderer.xr.isPresenting)) {
        // Desktop mode: toggle desktop measurement
        this.desktopMeasurementMode = !this.desktopMeasurementMode;
        
        if (!this.desktopMeasurementMode) {
          // When disabling desktop mode, clear everything using unified system
          this.clearUnifiedMeasurement();
        }
        this.updateMeasurementPanel();
      } else {
        // VR mode: toggle VR measurement system
        this.measurementSystemEnabled = !this.measurementSystemEnabled;
        
        if (!this.measurementSystemEnabled) {
          // Clear unified measurement when disabling VR
          this.clearUnifiedMeasurement();
          if (this.ghostSpheres.left) this.ghostSpheres.left.visible = false;
          if (this.ghostSpheres.right) this.ghostSpheres.right.visible = false;
        } else {
          // Re-enable ghost spheres when enabling VR
          if (this.ghostSpheres.left) this.ghostSpheres.left.visible = true;
          if (this.ghostSpheres.right) this.ghostSpheres.right.visible = true;
          // Reset positions to ensure they're at controller tips, not corrupted
          this.resetGhostSpherePositions();
        }
        this.updateMeasurementPanel();
      }
    });
    const parent = (this.renderer && this.renderer.domElement && this.renderer.domElement.parentElement) || document.body;
    parent.appendChild(panel);
    this.measurementPanel = panel;
  }

  updateMeasurementPanel() {
    const panel = this.measurementPanel;
    if (!panel) return;
    const isVR = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting;
    
    // Use unified measurement system
    const hasPoints = this.unifiedMeasurementPoints ? this.unifiedMeasurementPoints.length : 0;
    const hasMeasurement = hasPoints === 2;
    
    const isEnabled = isVR ? this.measurementSystemEnabled : this.desktopMeasurementMode;
    
    let distance;
    if (hasMeasurement) {
      distance = this.unifiedMeasurementPoints[0].position.distanceTo(this.unifiedMeasurementPoints[1].position);
    }
    
    // Clear existing state classes
    panel.classList.remove('disabled', 'active', 'measured');
    
    if (!isEnabled) {
      panel.classList.add('disabled');
      panel.innerHTML = `
        <div>MEASURE</div>
        <div style="font-size: 12px; margin-top: 4px;">Click to enable</div>
      `;
    } else if (hasMeasurement) {
      panel.classList.add('measured');
      panel.innerHTML = `
        <div>${distance.toFixed(2)}m</div>
        <div style="font-size: 12px; margin-top: 4px;">Click to disable</div>
      `;
    } else {
      panel.classList.add('active');
      const instruction = isVR ? 'Use triggers' : 'Click points';
      panel.innerHTML = `
        <div>MEASURE: ON</div>
        <div style="font-size: 12px; margin-top: 4px;">${instruction} (${hasPoints}/2)</div>
      `;
    }
  }

  // --- Desktop Measurement Events ---
  onMouseDown(event) {
    this.isDragging = false;
    this.dragStartPosition.x = event.clientX;
    this.dragStartPosition.y = event.clientY;
  }
  onMouseMove(event) {
    if (!this.isDragging) {
      const deltaX = Math.abs(event.clientX - this.dragStartPosition.x);
      const deltaY = Math.abs(event.clientY - this.dragStartPosition.y);
      if (deltaX > this.DRAG_THRESHOLD || deltaY > this.DRAG_THRESHOLD) {
        this.isDragging = true;
      }
    }
  }
  onMouseUp(event) {
    setTimeout(() => {
      this.isDragging = false;
    }, 10);
  }
  onMouseClick(event) {
    //
    const currentTime = Date.now();
    const isDoubleClick = currentTime - this.lastClickTime < 300;
    this.lastClickTime = currentTime;
    if (this.isDragging) {
      return;
    }
    if (!this.desktopMeasurementMode) {
      // When measurement is disabled, don't interfere with other click handlers
      // (like the ModelViewer's double-click focus system)
      return;
    }
    
    // Prevent other click handlers from running when in measurement mode
    if (this.desktopMeasurementMode) {
      event.stopPropagation();
      event.preventDefault();
    }
    // Calculate mouse position
    //
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    //
    // Robust camera fallback: try all possible sources
    let camera = this.camera;
    // Use XR camera only if presenting in VR
    if (this.renderer && this.renderer.xr && this.renderer.xr.isPresenting) {
      const xrCamera = this.renderer.xr.getCamera();
      if (xrCamera) {
        camera = xrCamera;
        //
      }
    }
    // If still not valid, try to find a camera in the scene
    if (!camera || (!camera.isPerspectiveCamera && !camera.isOrthographicCamera)) {
      if (this.scene && this.scene.children) {
        for (const obj of this.scene.children) {
          if (obj.isCamera) {
            camera = obj;
            //
            break;
          }
        }
      }
    }
    // Try window.camera as a last resort
    if (!camera || (!camera.isPerspectiveCamera && !camera.isOrthographicCamera)) {
      if (typeof window !== 'undefined' && window.camera && (window.camera.isPerspectiveCamera || window.camera.isOrthographicCamera)) {
        camera = window.camera;
        //
      }
    }
    // If still not valid, try to find any PerspectiveCamera or OrthographicCamera in the scene graph (deep search)
    if (!camera || (!camera.isPerspectiveCamera && !camera.isOrthographicCamera && camera.type !== 'ArrayCamera')) {
      //
      return;
    }
    // Raycast from camera
    this.raycaster.setFromCamera(this.mouse, camera);
    // Only use the specified raycast targets (model geometry) for intersection
    const raycastTargets = (this._raycastTargets && this._raycastTargets.length > 0) ? this._raycastTargets : [];
    if (raycastTargets.length === 0) {
      //
      return;
    }
    const intersects = this.raycaster.intersectObjects(raycastTargets, true);
    //
    // Only place a measurement point if there is a valid intersection
    if (intersects.length === 0) {
      return;
    }
    //
    // Filter out measurement spheres and lines from intersections
    const validIntersects = intersects.filter(intersect => {
      // Check if object is in unified measurement points
      const isUnifiedSphere = this.unifiedMeasurementPoints.some(point => point.sphere === intersect.object);
      // Check if object is the unified measurement line
      const isUnifiedLine = intersect.object === this.unifiedMeasurementLine;
      // Check by userData for measurement helpers
      const isMeasurementHelper = this.isMeasurementHelper(intersect.object);
      
      return !isUnifiedSphere && !isUnifiedLine && !isMeasurementHelper;
    });
    //
    if (validIntersects.length > 0) {
      if (isDoubleClick) {
        //
        this.focusOnPoint(validIntersects[0].point);
      } else {
        // Place measurement point using unified system
        const intersectionPoint = validIntersects[0].point;
        this.placeUnifiedMeasurementPoint(intersectionPoint, 'desktop');
      }
    } else {
      //
    }
  }

  focusOnPoint(point) {
    if (this.focusAnimation) {
      cancelAnimationFrame(this.focusAnimation);
      this.focusAnimation = null;
    }
    const startTarget = this.controls.target.clone();
    const startPosition = this.camera.position.clone();
    const offset = startPosition.clone().sub(startTarget);
    const newPosition = point.clone().add(offset);
    const duration = 1000;
    const startTime = performance.now();
    const animate = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.controls.target.lerpVectors(startTarget, point, eased);
      this.camera.position.lerpVectors(startPosition, newPosition, eased);
      if (progress < 1) {
        this.focusAnimation = requestAnimationFrame(animate);
      } else {
        this.focusAnimation = null;
      }
    };
    this.focusAnimation = requestAnimationFrame(animate);
  }

  _focusOnPoint(point) {
    // Internal focus method that cancels any existing animation and smoothly moves to point
    if (this.focusAnimation) {
      cancelAnimationFrame(this.focusAnimation);
      this.focusAnimation = null;
    }
    
    if (!this.controls || !this.camera) {
      console.warn('[MeasurementSystem] No controls or camera available for focusing');
      return;
    }
    
    const startTarget = this.controls.target.clone();
    const startPosition = this.camera.position.clone();
    const offset = startPosition.clone().sub(startTarget);
    const newPosition = point.clone().add(offset);
    const duration = 1000;
    const startTime = performance.now();
    
    const animate = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      
      this.controls.target.lerpVectors(startTarget, point, eased);
      this.camera.position.lerpVectors(startPosition, newPosition, eased);
      this.controls.update();
      
      if (progress < 1) {
        this.focusAnimation = requestAnimationFrame(animate);
      } else {
        this.focusAnimation = null;
      }
    };
    this.focusAnimation = requestAnimationFrame(animate);
  }

  /**
   * Refresh measurement display when entering VR
   * Called when VR mode is activated to ensure sprite is visible
   */
  refreshMeasurementDisplayForVR() {
    if (this.unifiedMeasurementPoints && this.unifiedMeasurementPoints.length === 2) {
      const point1 = this.unifiedMeasurementPoints[0].position;
      const point2 = this.unifiedMeasurementPoints[1].position;
      const distance = point1.distanceTo(point2);
      
      // Recreate measurement display to ensure it's properly set up for VR
      this.createMeasurementDisplay(distance);
      
      if (this.measurementSprite) {
        const midpoint = new THREE.Vector3();
        midpoint.addVectors(point1, point2);
        midpoint.multiplyScalar(0.5);
        
        const offsetScale = Math.max(0.05, Math.min(0.2, distance * 0.03));
        midpoint.y += offsetScale;
        
        this.measurementSprite.position.copy(midpoint);
        
        // Ensure sprite is in scene and visible in VR
        if (!this.scene.children.includes(this.measurementSprite)) {
          this.scene.add(this.measurementSprite);
        }
        
        // Force visibility in VR (always), or in desktop if labels are enabled
        const inVR = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting;
        this.measurementSprite.visible = inVR || this.showMeasurementLabels;
      }
    }
  }

  // Set measurement system state
}
