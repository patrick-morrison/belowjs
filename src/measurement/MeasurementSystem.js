// MeasurementSystem.js
// BelowJS Measurement System (EXTRACTION STUB)
// This file will encapsulate all measurement logic for VR and desktop, ported from the Adrasan VR Measurement Tool.
//
// Step 1: Scaffold the class and API, ready for incremental porting.


console.debug('[MeasurementSystem] MeasurementSystem.js loaded');
import * as THREE from 'three';
import { Line2, LineMaterial, LineGeometry } from './ThickLine.js';

/**
 * MeasurementSystem
 * Encapsulates measurement UI and logic for both VR and desktop.
 *
 * Usage:
 *   const ms = new MeasurementSystem({ scene, camera, renderer, controls, dolly, config });
 *   ms.enable();
 *   // ...
 *   ms.dispose();
 */
export class MeasurementSystem {
  /**
   * Set the objects to use for raycasting (e.g. model meshes only)
   * Accepts meshes, groups, or arrays; will traverse and filter for meshes with geometry.
   * @param {THREE.Object3D|THREE.Object3D[]} targets
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
    // Debug info
    console.debug('[MeasurementSystem] setRaycastTargets called:', {
      input: targets,
      meshTargets,
      meshCount: meshTargets.length,
      meshNames: meshTargets.map(m => m.name || m.uuid),
      meshTypes: meshTargets.map(m => m.type),
      meshWorldMatrices: meshTargets.map(m => m.matrixWorld.clone()),
    });

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
  constructor({ scene, camera, renderer, controls, dolly, config = {} }) {
    console.debug('[MeasurementSystem] constructor called', { scene, camera, renderer, controls, dolly, config });
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

    // By default, raycast against all scene children
    this._raycastTargets = (scene && scene.children) ? scene.children : [];

    // Measurement state
    this.enabled = false;
    this.isVR = false;
    this.measurementPanel = null;
    this.desktopMeasurementMode = false;
    this.measurementSystemEnabled = true;
    this.placedSpheres = [];
    this.desktopMeasurementPoints = [];
    this.connectionLine = null;
    this.desktopMeasurementLine = null;
    this.measurementSprite = null;
    this.measurementCanvas = null;
    this.measurementTexture = null;
    this.lastClickTime = 0;
    this.focusAnimation = null;
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
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

    // Mouse events (use capture phase to ensure we get events even if Three.js stops propagation)
    this._boundOnMouseClick = this.onMouseClick.bind(this);
    console.debug('[MeasurementSystem] Adding mouse event listeners to', this.renderer.domElement);
    this._boundOnMouseDown = this.onMouseDown.bind(this);
    this._boundOnMouseMove = this.onMouseMove.bind(this);
    this._boundOnMouseUp = this.onMouseUp.bind(this);
    this.renderer.domElement.addEventListener('click', this._boundOnMouseClick, true);
    this.renderer.domElement.addEventListener('mousedown', this._boundOnMouseDown, true);
    this.renderer.domElement.addEventListener('mousemove', this._boundOnMouseMove, true);
    this.renderer.domElement.addEventListener('mouseup', this._boundOnMouseUp, true);
  }

  // --- VR/Shared Logic (Stub for now, will be filled in) ---
  // These methods will be filled in with the full VR and shared logic ported from Adrasan.

  // Enable measurement system
  enable() {
    this.desktopMeasurementMode = true;
    this.updateMeasurementPanel();
  }

  // Disable measurement system
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
    this.clearDesktopMeasurement();
    this.clearVRMeasurement();
  }

  // Clear VR measurements
  clearVRMeasurement() {
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

  // Sync desktop measurements to VR (stub)
  syncToVR() {
    // Copy desktop measurement points to VR state
    if (this.desktopMeasurementPoints.length === 2) {
      this.clearVRMeasurement();
      this.desktopMeasurementPoints.forEach(point => {
        const newSphere = new THREE.Mesh(this.sphereGeometry, this.placedMaterial);
        newSphere.position.copy(point.position);
        this.scene.add(newSphere);
        this.placedSpheres.push(newSphere);
      });
      // Create VR line
      if (this.placedSpheres.length === 2) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          this.placedSpheres[0].position,
          this.placedSpheres[1].position
        ]);
        const material = this.vrLineMaterial || new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8, depthTest: false });
        this.connectionLine = new THREE.Line(geometry, material);
        this.scene.add(this.connectionLine);
        // Create measurement display
        this.createMeasurementDisplay(this.placedSpheres[0].position.distanceTo(this.placedSpheres[1].position));
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
    // Copy VR measurement points to desktop state, and clamp to model geometry
    if (this.placedSpheres.length === 2) {
      this.clearDesktopMeasurement();
      // For each VR point, find closest point on model (raycast from camera to point direction)
      for (let i = 0; i < 2; i++) {
        const vrPos = this.placedSpheres[i].position.clone();
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
      // Create desktop line
      if (this.desktopMeasurementPoints.length === 2) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          this.desktopMeasurementPoints[0].position,
          this.desktopMeasurementPoints[1].position
        ]);
        // Always visible line: depthTest false, transparent true, opacity 1
        const material = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 1.0,
          depthTest: false
        });
        this.desktopMeasurementLine = new THREE.Line(geometry, material);
        this.scene.add(this.desktopMeasurementLine);
      }
      this.desktopMeasurementMode = true;
      this.updateMeasurementPanel();
    }
  }

  // Update method for render loop (stub)
  // --- Shared Measurement Display (Sprite/Canvas) ---
  createMeasurementDisplay(distance) {
    if (!this.measurementCanvas) {
      this.measurementCanvas = document.createElement('canvas');
      this.measurementCanvas.width = 256;
      this.measurementCanvas.height = 64;
    }
    const context = this.measurementCanvas.getContext('2d');
    context.clearRect(0, 0, this.measurementCanvas.width, this.measurementCanvas.height);
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
    const bgX = (this.measurementCanvas.width - bgWidth) / 2;
    const bgY = (this.measurementCanvas.height - bgHeight) / 2;
    context.fillStyle = 'rgba(0, 0, 0, 0.8)';
    context.beginPath();
    context.roundRect(bgX, bgY, bgWidth, bgHeight, Math.max(4, fontSize * 0.2));
    context.fill();
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, this.measurementCanvas.width / 2, this.measurementCanvas.height / 2);
    if (!this.measurementTexture) {
      this.measurementTexture = new THREE.CanvasTexture(this.measurementCanvas);
    } else {
      this.measurementTexture.needsUpdate = true;
    }
    if (!this.measurementSprite) {
      const spriteMaterial = new THREE.SpriteMaterial({ map: this.measurementTexture });
      this.measurementSprite = new THREE.Sprite(spriteMaterial);
    }
    const baseScale = 0.3;
    const spriteScale = baseScale * scaleFactor;
    const aspectRatio = this.measurementCanvas.width / this.measurementCanvas.height;
    this.measurementSprite.scale.set(spriteScale * aspectRatio, spriteScale, 1);
    return this.measurementSprite;
  }

  // --- VR Logic ---
  // Call this after VR controllers are available and renderer.xr is enabled
  attachVR({ controller1, controller2, controllerGrip1, controllerGrip2 }) {
    this.controller1 = controller1;
    this.controller2 = controller2;
    this.controllerGrip1 = controllerGrip1;
    this.controllerGrip2 = controllerGrip2;
    // Ghost spheres for VR
    this.ghostSpheres = {
      left: new THREE.Mesh(this.sphereGeometry, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 })),
      right: new THREE.Mesh(this.sphereGeometry, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 }))
    };
    this.ghostSpheres.left.visible = false;
    this.ghostSpheres.right.visible = false;
    this.scene.add(this.ghostSpheres.left);
    this.scene.add(this.ghostSpheres.right);
    // VR event state
    this.yButtonPressed = false;
    this.MAX_SPHERES = 2;
    // VR line material
    this.vrLineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8, depthTest: false });

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
  }

  // VR controller event handlers
  _onVRTriggerDown(event) {
    // Place a measurement point at the controller's tip (free in space, not clamped)
    const controller = event.target;
    // Get the tip position in world space
    const tip = new THREE.Vector3(0, 0, -0.05); // 5cm in front of controller
    tip.applyMatrix4(controller.matrixWorld);
    this._placeVRMeasurementPoint(tip);
  }

  _onVRTriggerUp(event) {
    // No-op for now (could be used for drag/hold in future)
  }

  _onVRYButtonDown(event) {
    // Clear VR measurement
    this.clearVRMeasurement();
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
    // Filter out measurement spheres/lines
    const validIntersects = intersects.filter(intersect =>
      !this.placedSpheres.includes(intersect.object) &&
      intersect.object !== this.connectionLine &&
      !this.desktopMeasurementPoints.includes(intersect.object)
    );
    return validIntersects.length > 0 ? validIntersects[0] : null;
  }

  _placeVRMeasurementPoint(point) {
    if (this.placedSpheres.length >= this.MAX_SPHERES) {
      const oldest = this.placedSpheres.shift();
      this.scene.remove(oldest);
    }
    const sphere = new THREE.Mesh(this.sphereGeometry, this.placedMaterial);
    sphere.position.copy(point);
    this.scene.add(sphere);
    this.placedSpheres.push(sphere);
    // Update VR line (thick)
    if (this.placedSpheres.length === 2) {
      if (this.connectionLine) this.scene.remove(this.connectionLine);
      const lineGeometry = new LineGeometry();
      lineGeometry.setPositions([
        this.placedSpheres[0].position.x, this.placedSpheres[0].position.y, this.placedSpheres[0].position.z,
        this.placedSpheres[1].position.x, this.placedSpheres[1].position.y, this.placedSpheres[1].position.z
      ]);
      this.connectionLine = new Line2(lineGeometry, this.vrLineMaterial);
      this.connectionLine.computeLineDistances();
      this.scene.add(this.connectionLine);
      // Measurement display
      const dist = this.placedSpheres[0].position.distanceTo(this.placedSpheres[1].position);
      this.createMeasurementDisplay(dist);
      if (this.measurementSprite && !this.scene.children.includes(this.measurementSprite)) {
        this.scene.add(this.measurementSprite);
      }
    } else {
      if (this.connectionLine) {
        this.scene.remove(this.connectionLine);
        this.connectionLine = null;
      }
      if (this.measurementSprite) {
        this.measurementSprite.visible = false;
      }
    }
    this.measurementSystemEnabled = true;
  }

  // VR ghost spheres update (called from update)
  _updateVRGhostSpheres() {
    if (!this.isVR || !this.ghostSpheres) return;
    // Show ghost spheres at controller tips (free in space)
    const showGhost = this.placedSpheres.length < this.MAX_SPHERES;
    ['left', 'right'].forEach(hand => {
      const controller = hand === 'left' ? this.controller1 : this.controller2;
      if (!controller) return;
      if (showGhost) {
        // Place ghost sphere at tip of controller
        const tip = new THREE.Vector3(0, 0, -0.05); // 5cm in front
        tip.applyMatrix4(controller.matrixWorld);
        this.ghostSpheres[hand].position.copy(tip);
        this.ghostSpheres[hand].visible = true;
      } else {
        this.ghostSpheres[hand].visible = false;
      }
    });
  }

  // Call this from your render loop
  update(time = performance.now()) {
    // Desktop line pulsing
    if (this.desktopMeasurementLine && !this.isVR) {
      const pulse = (Math.sin(time * 0.004) + 1) * 0.2 + 0.5;
      this.desktopMeasurementLine.material.opacity = pulse;
      this.desktopMeasurementLine.visible = true;
    } else if (this.desktopMeasurementLine) {
      this.desktopMeasurementLine.visible = false;
    }
    // VR line pulsing and sprite
    if (this.connectionLine && this.measurementSystemEnabled && this.isVR) {
      const pulse = (Math.sin(time * 0.003) + 1) * 0.2 + 0.5;
      this.connectionLine.material.opacity = pulse;
      this.connectionLine.visible = true;
      if (this.measurementSprite && this.placedSpheres.length === 2) {
        const midpoint = new THREE.Vector3();
        midpoint.addVectors(this.placedSpheres[0].position, this.placedSpheres[1].position);
        midpoint.multiplyScalar(0.5);
        const currentDistance = this.placedSpheres[0].position.distanceTo(this.placedSpheres[1].position);
        const offsetScale = Math.max(0.1, Math.min(0.3, currentDistance * 0.05));
        this.measurementSprite.position.copy(midpoint);
        this.measurementSprite.position.y += offsetScale;
        this.measurementSprite.material.depthTest = false;
        this.measurementSprite.material.depthWrite = false;
        this.measurementSprite.material.opacity = 0.9;
        this.measurementSprite.material.transparent = true;
        this.measurementSprite.visible = true;
      }
    } else if (this.connectionLine) {
      this.connectionLine.visible = false;
    }
    // VR ghost spheres
    this._updateVRGhostSpheres();
  }

  // Dispose/cleanup
  dispose() {
    // Remove panel
    if (this.measurementPanel && this.measurementPanel.parentNode) {
      this.measurementPanel.parentNode.removeChild(this.measurementPanel);
      this.measurementPanel = null;
    }
    // Remove event listeners
    this.renderer.domElement.removeEventListener('click', this._boundOnMouseClick, true);
    this.renderer.domElement.removeEventListener('mousedown', this._boundOnMouseDown, true);
    this.renderer.domElement.removeEventListener('mousemove', this._boundOnMouseMove, true);
    this.renderer.domElement.removeEventListener('mouseup', this._boundOnMouseUp, true);
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
    this.placedSpheres = [];
    this.isVR = false;
  }
  // --- UI Panel ---
  createMeasurementPanel() {
    const panel = document.createElement('div');
    panel.id = 'measurementPanel';
    panel.className = 'measurement-panel';
    panel.style.zIndex = 9999;
    panel.style.position = 'fixed';
    // Place in bottom right, matching CSS
    panel.style.bottom = '20px';
    panel.style.right = '20px';
    // Remove top positioning if present
    panel.style.top = '';
    panel.style.pointerEvents = 'auto';
    panel.style.display = 'inline-block';
    panel.style.maxWidth = '240px';
    panel.style.minHeight = '48px';
    panel.style.boxSizing = 'border-box';
    panel.style.verticalAlign = 'top';
    panel.style.overflow = 'hidden';
    panel.addEventListener('click', () => {
      this.desktopMeasurementMode = !this.desktopMeasurementMode;
      this.updateMeasurementPanel();
      if (!this.desktopMeasurementMode) {
        this.clearDesktopMeasurement();
      }
    });
    document.body.appendChild(panel);
    this.measurementPanel = panel;
  }

  updateMeasurementPanel() {
    const panel = this.measurementPanel;
    if (!panel) return;
    const isEnabled = this.desktopMeasurementMode;
    const hasPoints = this.desktopMeasurementPoints.length;
    const hasMeasurement = (this.desktopMeasurementPoints.length === 2);
    if (!isEnabled) {
      panel.innerHTML = `
        <div class="disabled">MEASURE</div>
        <div style="font-size: 12px; margin-top: 4px;">Click to enable</div>
      `;
    } else if (hasMeasurement) {
      const distance = this.desktopMeasurementPoints[0].position.distanceTo(this.desktopMeasurementPoints[1].position);
      panel.innerHTML = `
        <div class="measured">${distance.toFixed(2)}m</div>
        <div style="font-size: 12px; margin-top: 4px;">Click to disable</div>
      `;
    } else {
      panel.innerHTML = `
        <div class="active">MEASURE: ON</div>
        <div style="font-size: 12px; margin-top: 4px;">Click points (${hasPoints}/2)</div>
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
    // --- DEBUG: Confirm click handler is firing and DOM layering ---
    console.debug('[MeasurementSystem] onMouseClick event listener fired', event);
    const elemUnderMouse = document.elementFromPoint(event.clientX, event.clientY);
    console.debug('[MeasurementSystem] DOM element under mouse:', elemUnderMouse);
    // Debug: Print current raycast targets
    if (this._raycastTargets) {
      console.debug('[MeasurementSystem] Current raycast targets:', this._raycastTargets);
      this._raycastTargets.forEach((obj, i) => {
        console.debug(`[MeasurementSystem] Target[${i}]:`, {
          name: obj.name,
          uuid: obj.uuid,
          type: obj.type,
          visible: obj.visible,
          geometry: obj.geometry,
          matrixWorld: obj.matrixWorld,
        });
      });
    }

    // --- DEBUG: Confirm drag/mode logic ---
    const currentTime = Date.now();
    const isDoubleClick = currentTime - this.lastClickTime < 300;
    this.lastClickTime = currentTime;
    if (this.isDragging) {
      console.debug('[MeasurementSystem] Ignored click: dragging');
      return;
    }
    if (!this.desktopMeasurementMode) {
      console.debug('[MeasurementSystem] Ignored click: measurement mode not enabled');
      return;
    }
    // Calculate mouse position
    // Debug: Use renderer.domElement bounding rect for pointer NDC
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    console.debug('[MeasurementSystem] Mouse NDC:', { x: this.mouse.x, y: this.mouse.y, clientX: event.clientX, clientY: event.clientY, rect });
    // Robust camera fallback: try all possible sources
    let camera = this.camera;
    // Use XR camera only if presenting in VR
    if (this.renderer && this.renderer.xr && this.renderer.xr.isPresenting) {
      const xrCamera = this.renderer.xr.getCamera();
      if (xrCamera) {
        camera = xrCamera;
        console.debug('[MeasurementSystem] Using renderer.xr.getCamera() (presenting VR)', xrCamera);
      }
    }
    // If still not valid, try to find a camera in the scene
    if (!camera || (!camera.isPerspectiveCamera && !camera.isOrthographicCamera)) {
      if (this.scene && this.scene.children) {
        for (const obj of this.scene.children) {
          if (obj.isCamera) {
            camera = obj;
            console.debug('[MeasurementSystem] Found camera in scene.children', camera);
            break;
          }
        }
      }
    }
    // Try window.camera as a last resort
    if (!camera || (!camera.isPerspectiveCamera && !camera.isOrthographicCamera)) {
      if (typeof window !== 'undefined' && window.camera && (window.camera.isPerspectiveCamera || window.camera.isOrthographicCamera)) {
        camera = window.camera;
        console.debug('[MeasurementSystem] Using window.camera', camera);
      }
    }
    // If still not valid, try to find any PerspectiveCamera or OrthographicCamera in the scene graph (deep search)
    if (!camera || (!camera.isPerspectiveCamera && !camera.isOrthographicCamera)) {
      if (this.scene && this.scene.traverse) {
        this.scene.traverse(obj => {
          if (!camera && (obj.isPerspectiveCamera || obj.isOrthographicCamera)) {
            camera = obj;
            console.debug('[MeasurementSystem] Found camera by traverse', camera);
          }
        });
      }
    }
    if (!camera || (!camera.isPerspectiveCamera && !camera.isOrthographicCamera && camera.type !== 'ArrayCamera')) {
      console.warn('[MeasurementSystem] No valid camera found for raycasting');
      return;
    }
    // Raycast from camera
    this.raycaster.setFromCamera(this.mouse, camera);
    // Only use the specified raycast targets (model geometry) for intersection
    const raycastTargets = (this._raycastTargets && this._raycastTargets.length > 0) ? this._raycastTargets : [];
    if (raycastTargets.length === 0) {
      console.warn('[MeasurementSystem] No raycast targets set for measurement!');
      return;
    }
    const intersects = this.raycaster.intersectObjects(raycastTargets, true);
    console.debug('[MeasurementSystem] Raycast result:', {
      count: intersects.length,
      intersects,
      raycastTargets,
      mouse: { x: this.mouse.x, y: this.mouse.y },
      camera,
    });
    // Only place a measurement point if there is a valid intersection
    if (intersects.length === 0) {
      console.debug('[MeasurementSystem] No intersects found, not placing measurement point.');
      return;
    }
    // --- DEBUG: Place a temporary test sphere at the first intersection point, regardless of filtering ---
    const testPoint = intersects[0].point;
    if (testPoint) {
      const debugSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.01, 8, 6),
        new THREE.MeshBasicMaterial({ color: 0xff00ff, transparent: true, opacity: 0.5 })
      );
      debugSphere.position.copy(testPoint);
      this.scene.add(debugSphere);
      setTimeout(() => {
        this.scene.remove(debugSphere);
      }, 1000);
      console.debug('[MeasurementSystem] Placed debug sphere at', testPoint);
    }
    // Filter out measurement spheres and lines from intersections
    const validIntersects = intersects.filter(intersect =>
      !this.desktopMeasurementPoints.includes(intersect.object) &&
      intersect.object !== this.desktopMeasurementLine &&
      !this.placedSpheres.includes(intersect.object)
    );
    console.debug('[MeasurementSystem] Valid intersects', { count: validIntersects.length, validIntersects });
    if (validIntersects.length > 0) {
      if (isDoubleClick) {
        console.debug('[MeasurementSystem] Double click: focusing on point', validIntersects[0].point);
        this.focusOnPoint(validIntersects[0].point);
      } else {
        // Place measurement point
        const intersectionPoint = validIntersects[0].point;
        console.debug('[MeasurementSystem] Placing measurement point at', intersectionPoint);
        if (this.desktopMeasurementPoints.length >= this.MAX_DESKTOP_POINTS) {
          const oldestSphere = this.desktopMeasurementPoints.shift();
          this.scene.remove(oldestSphere);
          console.debug('[MeasurementSystem] Removed oldest measurement sphere');
        }
        const measurementSphere = new THREE.Mesh(this.sphereGeometry, this.placedMaterial);
        measurementSphere.position.copy(intersectionPoint);
        this.scene.add(measurementSphere);
        this.desktopMeasurementPoints.push(measurementSphere);
        console.debug('[MeasurementSystem] Added new measurement sphere', measurementSphere);
        this.updateDesktopMeasurement();
      }
    } else {
      console.debug('[MeasurementSystem] No valid intersects for measurement');
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

  updateDesktopMeasurement() {
    this.updateMeasurementPanel();
    if (this.desktopMeasurementPoints.length === 2) {
      if (this.desktopMeasurementLine) {
        this.scene.remove(this.desktopMeasurementLine);
      }
      const lineGeometry = new LineGeometry();
      lineGeometry.setPositions([
        this.desktopMeasurementPoints[0].position.x, this.desktopMeasurementPoints[0].position.y, this.desktopMeasurementPoints[0].position.z,
        this.desktopMeasurementPoints[1].position.x, this.desktopMeasurementPoints[1].position.y, this.desktopMeasurementPoints[1].position.z
      ]);
      this.desktopMeasurementLine = new Line2(lineGeometry, this.desktopLineMaterial);
      this.desktopMeasurementLine.computeLineDistances();
      this.scene.add(this.desktopMeasurementLine);
    } else {
      if (this.desktopMeasurementLine) {
        this.scene.remove(this.desktopMeasurementLine);
        this.desktopMeasurementLine = null;
      }
    }
  }

  clearDesktopMeasurement() {
    this.desktopMeasurementPoints.forEach(sphere => this.scene.remove(sphere));
    this.desktopMeasurementPoints.length = 0;
    if (this.desktopMeasurementLine) {
      this.scene.remove(this.desktopMeasurementLine);
      this.desktopMeasurementLine = null;
    }
    this.updateMeasurementPanel();
  }
}
