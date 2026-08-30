
import * as THREE from 'three';
import { Line2, LineMaterial, LineGeometry } from './ThickLine.js';

/**
 * @typedef {Object} MeasurementSystemConfig
 * @property {THREE.Scene} scene - Three.js scene for measurement objects
 * @property {THREE.PerspectiveCamera} camera - Three.js camera
 * @property {THREE.WebGLRenderer} renderer - Three.js renderer
 * @property {HTMLElement} [uiParent] - Optional parent element for measurement UI
 * @property {Function} [getRaycastInfo] - Optional function to resolve raycast mouse coords and camera
 * @property {Object} [controls] - Orbit controls for desktop mode
 * @property {THREE.Group} [dolly] - VR dolly for VR mode positioning
 * @property {Object} [config={}] - Additional configuration options
 * @property {number} [config.measurementDeleteRadius=0.025] - VR controller distance from a measurement point that enables hold-to-delete, in metres
 * @property {number} [config.measurementDeleteHoldDuration=1250] - Total VR hold duration required to delete a measurement point, in milliseconds
 * @property {string} [theme='dark'] - UI theme ('dark' or 'light')
 * @property {boolean} [showMeasurementLabels=false] - Whether to show measurement labels in desktop mode (always shown in VR)
 * @property {boolean} [allowScaleCalibration=false] - Allow right-click/long-press editing of a completed measurement
 * @property {Function} [onScaleCalibration] - Callback that uniformly rescales the measured model
 * @property {Function} [onMeasurementChange] - Callback fired when unified measurement points change
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
    const normalizedTargets = [];
    const addTargets = obj => {
      if (Array.isArray(obj)) {
        obj.forEach(addTargets);
      } else if (obj && typeof obj === 'object') {
        // Keep object roots instead of flattening to meshes so streamed content
        // (e.g. 3D Tiles) can be raycast as children appear over time.
        if (obj.isObject3D || obj.isMesh || obj.traverse) {
          obj.updateMatrixWorld(true);
          normalizedTargets.push(obj);
        }
      }
    };
    addTargets(targets);
    this._raycastTargets = normalizedTargets;
  }

  getValidIntersections(raycaster, targets = null) {
    const raycastTargets = (targets && targets.length > 0)
      ? targets
      : ((this._raycastTargets && this._raycastTargets.length > 0) ? this._raycastTargets : []);

    if (!raycastTargets || raycastTargets.length === 0) {
      return [];
    }

    const intersects = raycaster.intersectObjects(raycastTargets, true);
    return intersects.filter(intersect => {
      const isUnifiedSphere = this.unifiedMeasurementPoints.some(point => point.sphere === intersect.object);
      const isUnifiedLine = intersect.object === this.unifiedMeasurementLine;
      const isMeasurementHelper = this.isMeasurementHelper(intersect.object);
      
      return !isUnifiedSphere && !isUnifiedLine && !isMeasurementHelper;
    });
  }

  isMeasurementHelper(obj) {
    if (!obj) return false;
    if (obj.geometry === this.sphereGeometry || obj.userData.isMeasurementSphere) return true;
    if (obj.type === 'Line2' || obj.type === 'Line' || (obj.geometry && obj.geometry.type === 'LineGeometry')) return true;
    const helperGeometries = ['RingGeometry', 'TubeGeometry', 'PlaneGeometry', 'CircleGeometry'];
    if (obj.geometry && helperGeometries.includes(obj.geometry.type)) return true;
    if (typeof obj.name === 'string' && obj.name.startsWith('MeasurementHelper')) return true;
    return false;
  }

  setTarget(target) {
    if (target) {
      this.setRaycastTargets(target);
    } else {
      this.setRaycastTargets([]);
    }
  }

  setCamera(camera) {
    this.camera = camera;
  }

  /**
   * Creates a new MeasurementSystem instance
   * 
   * @param {MeasurementSystemConfig} config - Configuration object
   */
  constructor({ scene, camera, renderer, controls, dolly, uiParent, getRaycastInfo, config = {}, theme = 'dark', showMeasurementLabels = false, allowScaleCalibration = false, onScaleCalibration = null, onMeasurementChange = null }) {
    this.ghostSpheres = {
      left: null,
      right: null
    };
    this.MAX_SPHERES = 2;
    this.measurementSpheres = [];
    this.measurementLine = null;
    this.measurementLabel = null;
    this.previousTriggerState = {};
    this.unifiedMeasurementPoints = [];
    this.unifiedMeasurementLine = null;
    
    this.desktopMeasurementPoints = [];
    this.desktopMeasurementLine = null;
    
    if (typeof window !== 'undefined') {
      window.measurementSystem = this;
    }
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.uiParent = uiParent || null;
    this.getRaycastInfo = typeof getRaycastInfo === 'function' ? getRaycastInfo : null;
    this.controls = controls;
    this.dolly = dolly;
    this.config = config;
    this.theme = theme;
    this.showMeasurementLabels = showMeasurementLabels;
    this.allowScaleCalibration = allowScaleCalibration === true;
    this.onScaleCalibration = typeof onScaleCalibration === 'function' ? onScaleCalibration : null;
    this.onMeasurementChange = typeof onMeasurementChange === 'function' ? onMeasurementChange : null;
    this.scaleCalibrationMultiplier = 1;
    this.hasScaleCalibration = false;
    this.isEditingScale = false;
    this._suppressPanelClick = false;
    this._suppressPanelClickTimer = null;
    this._panelLongPressTimer = null;
    this._panelLongPressStart = null;
    this._panelLongPressReady = false;
    this._panelTouchActive = false;
    this.scaleEditorUsesModal = false;
    this._scaleModalViewportTracking = false;
    this._scaleModalAnchor = null;
    this._boundUpdateScaleModalPosition = () => this.updateScaleModalPosition();

    this._raycastTargets = (scene && scene.children) ? scene.children : [];

    this.enabled = true;
    this.isVR = false;
    this.measurementPanel = null;
    this.desktopMeasurementMode = false;
    this.measurementSystemEnabled = true;
    this.measurementAvailable = true;
    this.desktopMeasurementPoints = [];
    this.connectionLine = null;
    this.desktopMeasurementLine = null;
    this.measurementSprite = null;
    this.measurementCanvas = null;
    this.measurementTexture = null;
    this.lastClickTime = 0;
    this.lastTriggerTime = 0;
    this._wasInVR = false;
    this.focusAnimation = null;
    this._cancelFocusOnUserInput = null;
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.VR_DELETE_RADIUS = Number.isFinite(config.measurementDeleteRadius)
      ? Math.max(0, config.measurementDeleteRadius)
      : 0.025;
    this.VR_DELETE_CANCEL_RADIUS = this.VR_DELETE_RADIUS + 0.01;
    this.VR_DELETE_INTENT_DELAY_MS = 200;
    this.VR_DELETE_HOLD_MS = Number.isFinite(config.measurementDeleteHoldDuration)
      ? Math.max(this.VR_DELETE_INTENT_DELAY_MS + 100, config.measurementDeleteHoldDuration)
      : 1250;
    this.VR_DELETE_HOVER_DELAY_MS = 160;
    this._vrDeleteStates = new Map();
    this._vrDeleteHoverStates = new Map();

    const tryAttachMeasurementVR = () => {
      let controller1 = null, controller2 = null;
      const controllerGrip1 = null, controllerGrip2 = null;
      if (scene && scene.children) {
        scene.children.forEach(obj => {
          if (obj && obj.inputSource && obj.inputSource.handedness) {
            if (obj.inputSource.handedness === 'left') controller1 = obj;
            if (obj.inputSource.handedness === 'right') controller2 = obj;
          }
        });
      }
      if ((!controller1 || !controller2) && renderer && renderer.xr && renderer.xr.getController) {
        try {
          controller1 = controller1 || renderer.xr.getController(0);
          controller2 = controller2 || renderer.xr.getController(1);
        } catch {
          // Controller access failed, ignore
        }
      }
      if (controller1 && controller2) {
        this.attachVR({ controller1, controller2, controllerGrip1, controllerGrip2 });
        if (this.ghostSpheres && this.ghostSpheres.left && this.ghostSpheres.right) {
          this.ghostSpheres.left.visible = true;
          this.ghostSpheres.right.visible = true;
        }
      } else {
        if (!this._ghostSphereAttachRetries) this._ghostSphereAttachRetries = 0;
        if (this._ghostSphereAttachRetries < 40) {
          this._ghostSphereAttachRetries++;
          setTimeout(tryAttachMeasurementVR, 250);
        } else {
          if (typeof window !== 'undefined' && window.console) {
            console.warn('[MeasurementSystem] Could not find VR controllers to attach ghost spheres after multiple attempts.');
          }
        }
      }
    };
    tryAttachMeasurementVR();
    if (renderer && renderer.xr && renderer.xr.addEventListener) {
      renderer.xr.addEventListener('sessionstart', tryAttachMeasurementVR);
    }
    this.sphereGeometry = new THREE.SphereGeometry(0.02, 8, 6);
    this.placedMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.vrLineMaterial = new LineMaterial({
      color: 0xffffff,
      linewidth: 3,
      transparent: true,
      opacity: 0.8,
      depthTest: false,
      vertexColors: false,
      dashed: false
    });
    this.desktopLineMaterial = new LineMaterial({
      color: 0xffffff,
      linewidth: 3,
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

    this.createMeasurementPanel();
    this.updateMeasurementPanel();

    this._boundOnMouseClick = this.onMouseClick.bind(this);
    this._boundOnMouseDown = this.onMouseDown.bind(this);
    this._boundOnMouseMove = this.onMouseMove.bind(this);
    this._boundOnMouseUp = this.onMouseUp.bind(this);
    this.renderer.domElement.addEventListener('click', this._boundOnMouseClick, false);
    this.renderer.domElement.addEventListener('mousedown', this._boundOnMouseDown, false);
    this.renderer.domElement.addEventListener('mousemove', this._boundOnMouseMove, false);
    this.renderer.domElement.addEventListener('mouseup', this._boundOnMouseUp, false);

    if (renderer && renderer.xr && typeof renderer.xr.getController === 'function') {
      const manualAttachVR = () => {
        if (renderer.xr.isPresenting) {
          const controller1 = renderer.xr.getController(0);
          const controller2 = renderer.xr.getController(1);
          const controllerGrip1 = renderer.xr.getControllerGrip ? renderer.xr.getControllerGrip(0) : undefined;
          const controllerGrip2 = renderer.xr.getControllerGrip ? renderer.xr.getControllerGrip(1) : undefined;
          this.attachVR({ controller1, controller2, controllerGrip1, controllerGrip2 });
        }
      };
      if (renderer.xr.addEventListener) {
        renderer.xr.addEventListener('sessionstart', manualAttachVR);
      }
      if (renderer.xr.isPresenting) {
        manualAttachVR();
      }
      if (renderer.xr && typeof renderer.xr.requestSession === 'function' && !renderer.xr._measurementSystemPatched) {
        const origRequestSession = renderer.xr.requestSession.bind(renderer.xr);
        renderer.xr.requestSession = async (...args) => {
          const session = await origRequestSession(...args);
          setTimeout(() => {
            manualAttachVR();
          }, 100);
          return session;
        };
        renderer.xr._measurementSystemPatched = true;
      }
    }

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
    this.clearLegacyDesktopMeasurement();
  }

  toggle() {
    this.desktopMeasurementMode = !this.desktopMeasurementMode;
    this.updateMeasurementPanel();
    if (!this.desktopMeasurementMode) {
      this.clearLegacyDesktopMeasurement();
    }
  }

  clear() {
    this.clearUnifiedMeasurement();
    this.clearLegacyDesktopMeasurement();
    this.clearLegacyVRMeasurement();
  }

  clearUnifiedMeasurement() {
    this.cancelScaleCalibration();
    this._cancelAllVRDeletionHolds();
    const hadPoints = this.unifiedMeasurementPoints?.length > 0;

    if (this.unifiedMeasurementPoints && this.unifiedMeasurementPoints.length > 0) {
      this.unifiedMeasurementPoints.forEach(point => {
        this._removeUnifiedMeasurementSphere(point.sphere);
      });
      this.unifiedMeasurementPoints.length = 0;
    }
    
    if (this.unifiedMeasurementLine) {
      this.scene.remove(this.unifiedMeasurementLine);
      this.unifiedMeasurementLine = null;
    }
    
    if (this.measurementSprite) {
      this.measurementSprite.visible = false;
      this.scene.remove(this.measurementSprite);
      this.measurementSprite = null;
    }
    
    this.updateMeasurementPanel();
    if (hadPoints) this._notifyMeasurementChange('cleared');
  }

  clearVRMeasurement() {
    if (this.measurementSpheres) {
      this.measurementSpheres.forEach(sphere => this.scene.remove(sphere));
      this.measurementSpheres.length = 0;
    }
    if (this.measurementLine) {
      this.scene.remove(this.measurementLine);
      this.measurementLine = null;
    }
    if (this.measurementLabel) {
      this.scene.remove(this.measurementLabel);
      this.measurementLabel = null;
    }
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
    this.measurementSystemEnabled = this.measurementAvailable;
    this.updateMeasurementPanel();
  }

  setMeasurementAvailability(available) {
    this.measurementAvailable = available !== false;
    if (!this.measurementAvailable) {
      this.desktopMeasurementMode = false;
      this.measurementSystemEnabled = false;
      this.clearUnifiedMeasurement();
      this.clearLegacyDesktopMeasurement();
      this.clearLegacyVRMeasurement();
      if (this.ghostSpheres.left) this.ghostSpheres.left.visible = false;
      if (this.ghostSpheres.right) this.ghostSpheres.right.visible = false;
      this.setRaycastTargets([]);
    } else {
      this.measurementSystemEnabled = true;
      if (this.renderer && this.renderer.xr && this.renderer.xr.isPresenting) {
        if (this.ghostSpheres.left) this.ghostSpheres.left.visible = true;
        if (this.ghostSpheres.right) this.ghostSpheres.right.visible = true;
      }
    }
    this.updateMeasurementPanel();
  }

  setScaleCalibrationMultiplier(multiplier = 1) {
    this.scaleCalibrationMultiplier = Number.isFinite(multiplier) && multiplier > 0 ? multiplier : 1;
    this.hasScaleCalibration = Math.abs(this.scaleCalibrationMultiplier - 1) > Number.EPSILON;
    this.updateMeasurementPanel();
  }

  /**
   * Clear legacy VR measurements (old system compatibility)
   */
  clearLegacyVRMeasurement() {
    if (this.measurementSpheres && this.measurementSpheres.length > 0) {
      this.measurementSpheres.forEach(sphere => {
        if (sphere && this.scene.children.includes(sphere)) {
          this.scene.remove(sphere);
        }
      });
      this.measurementSpheres.length = 0;
    }
    
    if (this.measurementLine) {
      this.scene.remove(this.measurementLine);
      this.measurementLine = null;
    }
    
    if (this.connectionLine) {
      this.scene.remove(this.connectionLine);
      this.connectionLine = null;
    }
    
    if (this.measurementLabel) {
      this.scene.remove(this.measurementLabel);
      this.measurementLabel = null;
    }
  }

  syncToVR() {
    if (this.desktopMeasurementPoints.length === 2) {
      this.clearVRMeasurement();
      this.desktopMeasurementPoints.forEach(point => {
        const newSphere = new THREE.Mesh(this.sphereGeometry, this.placedMaterial);

        newSphere.position.copy(point.position);
        this.scene.add(newSphere);
        this.measurementSpheres.push(newSphere);
      });
      if (this.measurementSpheres.length === 2) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          this.measurementSpheres[0].position,
          this.measurementSpheres[1].position
        ]);
        const material = this.vrLineMaterial || new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8, depthTest: false });
        this.connectionLine = new THREE.Line(geometry, material);
        this.scene.add(this.connectionLine);
        this.createMeasurementDisplay(this.measurementSpheres[0].position.distanceTo(this.measurementSpheres[1].position));
        if (this.measurementSprite && !this.scene.children.includes(this.measurementSprite)) {
          this.scene.add(this.measurementSprite);
        }
      }
      this.measurementSystemEnabled = this.measurementAvailable;
      this.updateMeasurementPanel();
    }
  }

  syncToDesktop() {
    if (this.measurementSpheres && this.measurementSpheres.length === 2) {
      this.clearLegacyDesktopMeasurement();
      for (let i = 0; i < 2; i++) {
        const vrPos = this.measurementSpheres[i].position.clone();
        let clampedPos = vrPos;
        if (this._raycastTargets && this._raycastTargets.length > 0 && this.camera) {
          const dir = vrPos.clone().sub(this.camera.position).normalize();
          const raycaster = new THREE.Raycaster(this.camera.position, dir);
          const intersects = this.getValidIntersections(raycaster);
          if (intersects.length > 0) {
            clampedPos = intersects[0].point;
          }
        }
        const newSphere = new THREE.Mesh(this.sphereGeometry, this.placedMaterial);

        newSphere.position.copy(clampedPos);
        this.scene.add(newSphere);
        this.desktopMeasurementPoints.push(newSphere);
      }
      if (this.desktopMeasurementPoints.length === 2) {
        const lineGeometry = new LineGeometry();
        lineGeometry.setPositions([
          this.desktopMeasurementPoints[0].position.x, this.desktopMeasurementPoints[0].position.y, this.desktopMeasurementPoints[0].position.z,
          this.desktopMeasurementPoints[1].position.x, this.desktopMeasurementPoints[1].position.y, this.desktopMeasurementPoints[1].position.z
        ]);
        this.desktopMeasurementLine = new Line2(lineGeometry, this.desktopLineMaterial);
        this.desktopMeasurementLine.computeLineDistances();
        this.scene.add(this.desktopMeasurementLine);
        
        const distance = this.desktopMeasurementPoints[0].position.distanceTo(this.desktopMeasurementPoints[1].position);
        this.createMeasurementDisplay(distance);
        if (this.measurementSprite) {
          const midpoint = new THREE.Vector3();
          midpoint.addVectors(this.desktopMeasurementPoints[0].position, this.desktopMeasurementPoints[1].position);
          midpoint.multiplyScalar(0.5);
          
          const offsetScale = Math.max(0.05, Math.min(0.2, distance * 0.03));
          midpoint.y += offsetScale;
          
          this.measurementSprite.position.copy(midpoint);
          this.measurementSprite.visible = false;
          if (!this.scene.children.includes(this.measurementSprite)) {
            this.scene.add(this.measurementSprite);
          }
          
        }
      }
      this.updateMeasurementPanel();
    }
  }

  formatDistance(distance) {
    const distanceCm = distance * 100;
    if (distanceCm <= 20.0) {
      return `${distanceCm.toFixed(2)} cm`;
    }
    return `${distance.toFixed(2)}m`;
  }

  createMeasurementDisplay(distance) {
    const DPR = (window.devicePixelRatio || 1) * 4;
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
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvasWidth, canvasHeight);
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
    const text = this.formatDistance(distance);
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
    if (this._onVRTriggerDown) {
      [this.controller1, this.controller2].forEach(controller => {
        if (!controller) return;
        controller.removeEventListener('selectstart', this._onVRTriggerDown);
        controller.removeEventListener('selectend', this._onVRTriggerUp);
        controller.removeEventListener('ybuttondown', this._onVRYButtonDown);
        controller.removeEventListener('ybuttonup', this._onVRYButtonUp);
      });
    }

    this.controller1 = controller1;
    this.controller2 = controller2;
    this.controllerGrip1 = controllerGrip1;
    this.controllerGrip2 = controllerGrip2;
    const ghostMaterial = new THREE.MeshBasicMaterial({
      color: 0x888888, // ghostly grey
      transparent: true,
      opacity: 0.25,
      depthTest: false,
      depthWrite: false
    });
    if (this.ghostSpheres.left && this.ghostSpheres.left.parent) this.ghostSpheres.left.parent.remove(this.ghostSpheres.left);
    if (this.ghostSpheres.right && this.ghostSpheres.right.parent) this.ghostSpheres.right.parent.remove(this.ghostSpheres.right);
    this.ghostSpheres.left = new THREE.Mesh(this.sphereGeometry, ghostMaterial.clone());
    this.ghostSpheres.right = new THREE.Mesh(this.sphereGeometry, ghostMaterial.clone());
    this.ghostSpheres.left.scale.set(0.5, 0.5, 0.5);
    this.ghostSpheres.right.scale.set(0.5, 0.5, 0.5);
    this.ghostSpheres.left.position.set(0, 0, -0.07);
    this.ghostSpheres.right.position.set(0, 0, -0.07);
    this.ghostSpheres.left.visible = true;
    this.ghostSpheres.right.visible = true;
    if (this.controller1) this.controller1.add(this.ghostSpheres.left);
    if (this.controller2) this.controller2.add(this.ghostSpheres.right);
    this.yButtonPressed = false;
    this.MAX_SPHERES = 2;
    
    this.triggerState = {
      left: false,
      right: false
    };

    if (!this._onVRTriggerDown) {
      this._onVRTriggerDown = this._handleVRTriggerDown.bind(this);
      this._onVRTriggerUp = this._handleVRTriggerUp.bind(this);
      this._onVRYButtonDown = this._handleVRYButtonDown.bind(this);
      this._onVRYButtonUp = this._handleVRYButtonUp.bind(this);
    }
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
    
    this.refreshMeasurementDisplayForVR();
  }

  _handleVRTriggerDown(event) {
    if (!this.measurementAvailable || !this.measurementSystemEnabled) return;

    const controller = event.target;
    const point = this._findNearbyUnifiedMeasurementPoint(controller);
    if (point) {
      this._startVRDeletionHold(controller, point, event.data);
    }
  }

  _handleVRTriggerUp(event) {
    const controller = event.target;

    // Annotation selection owns a trigger that began over an XR annotation
    // marker. Do not also place or delete a measurement point when that same
    // trigger is released; all other triggers retain the orb workflow.
    if (controller?.userData?.belowjsAnnotationTrigger) {
      controller.userData.belowjsAnnotationTrigger = false;
      const annotationDeleteState = this._vrDeleteStates.get(controller);
      if (annotationDeleteState) {
        this._disposeVRDeleteVisual(annotationDeleteState);
        this._vrDeleteStates.delete(controller);
      }
      return;
    }

    const deleteState = this._vrDeleteStates.get(controller);
    if (deleteState) {
      const deletionCompleted = deleteState.completedAt !== null
        || !this.unifiedMeasurementPoints.includes(deleteState.point);
      this._disposeVRDeleteVisual(deleteState);
      this._vrDeleteStates.delete(controller);
      if (deletionCompleted) return;
    }

    if (!this.measurementAvailable) return;
    
    const now = performance.now();
    if (this.lastTriggerTime && (now - this.lastTriggerTime) < 200) {
      return;
    }
    this.lastTriggerTime = now;
    
    if (this.measurementSystemEnabled) {
      const controllerPos = new THREE.Vector3();
      
      let ghostSphere = null;
      if (controller === this.controller1 && this.ghostSpheres.left) {
        ghostSphere = this.ghostSpheres.left;
      } else if (controller === this.controller2 && this.ghostSpheres.right) {
        ghostSphere = this.ghostSpheres.right;
      }
      
      if (ghostSphere) {
        ghostSphere.getWorldPosition(controllerPos);
      } else {
        controller.getWorldPosition(controllerPos);
        const forward = new THREE.Vector3(0, 0, -0.05);
        forward.applyQuaternion(controller.quaternion);
        controllerPos.add(forward);
      }
      
      this._placeVRMeasurementPoint(controllerPos);
    }
  }

  _handleVRYButtonDown() {
    this.clearUnifiedMeasurement();
  }

  _handleVRYButtonUp() {
  }

  _getVRControllerPosition(controller, target = new THREE.Vector3()) {
    const ghostSphere = this._getGhostSphereForController(controller);

    if (ghostSphere) {
      ghostSphere.getWorldPosition(target);
    } else {
      controller.getWorldPosition(target);
      const forward = new THREE.Vector3(0, 0, -0.05);
      controller.getWorldQuaternion(this._vrControllerQuaternion || (this._vrControllerQuaternion = new THREE.Quaternion()));
      forward.applyQuaternion(this._vrControllerQuaternion);
      target.add(forward);
    }
    return target;
  }

  _getGhostSphereForController(controller) {
    if (controller === this.controller1) return this.ghostSpheres.left;
    if (controller === this.controller2) return this.ghostSpheres.right;
    return null;
  }

  _getNearbyUnifiedMeasurementPoint(controller, radius = this.VR_DELETE_RADIUS) {
    if (!controller || !this.unifiedMeasurementPoints.length) return null;

    const controllerPosition = this._getVRControllerPosition(controller);
    let closestPoint = null;
    let closestDistance = radius;
    this.unifiedMeasurementPoints.forEach(point => {
      const distance = controllerPosition.distanceTo(point.position);
      if (distance <= closestDistance) {
        closestPoint = point;
        closestDistance = distance;
      }
    });
    return closestPoint ? { point: closestPoint, distance: closestDistance } : null;
  }

  _findNearbyUnifiedMeasurementPoint(controller) {
    return this._getNearbyUnifiedMeasurementPoint(controller)?.point || null;
  }

  _startVRDeletionHold(controller, point, inputSource) {
    const existingState = this._vrDeleteStates.get(controller);
    if (existingState) this._disposeVRDeleteVisual(existingState);
    this._vrDeleteHoverStates.delete(controller);

    const state = {
      controller,
      point,
      inputSource,
      startedAt: performance.now(),
      completedAt: null,
      inRange: true,
      progress: 0,
      visual: this._createVRDeleteVisual(point.position)
    };
    this._vrDeleteStates.set(controller, state);
    this._pulseVRController(state, 0.12, 24);
  }

  _createVRDeleteVisual(position) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false,
      depthWrite: false
    });
    const sprite = new THREE.Sprite(material);
    sprite.name = 'MeasurementHelperDeleteProgress';
    sprite.position.copy(position);
    sprite.scale.set(0.05, 0.05, 1);
    sprite.renderOrder = 1000;
    this.scene.add(sprite);

    const visual = { canvas, texture, material, sprite };
    this._drawVRDeleteProgress(visual, 0);
    return visual;
  }

  _drawVRDeleteProgress(visual, progress) {
    if (!visual) return;
    const context = visual.canvas.getContext('2d');
    const size = visual.canvas.width;
    const center = size / 2;
    const radius = size * 0.37;
    const clampedProgress = Math.max(0, Math.min(progress, 1));
    context.clearRect(0, 0, size, size);

    context.beginPath();
    context.arc(center, center, radius - 8, 0, Math.PI * 2);
    context.fillStyle = 'rgba(5, 12, 22, 0.58)';
    context.fill();

    context.beginPath();
    context.arc(center, center, radius, 0, Math.PI * 2);
    context.strokeStyle = 'rgba(255, 255, 255, 0.34)';
    context.lineWidth = 12;
    context.stroke();

    if (clampedProgress > 0) {
      const green = Math.round(194 - (77 * clampedProgress));
      const blue = Math.round(107 - (15 * clampedProgress));
      context.beginPath();
      context.arc(center, center, radius, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * clampedProgress));
      context.strokeStyle = `rgba(255, ${green}, ${blue}, 0.98)`;
      context.lineWidth = 14;
      context.lineCap = 'round';
      context.stroke();
    }

    const glyphRadius = 13 + (clampedProgress * 2);
    context.beginPath();
    context.moveTo(center - glyphRadius, center - glyphRadius);
    context.lineTo(center + glyphRadius, center + glyphRadius);
    context.moveTo(center + glyphRadius, center - glyphRadius);
    context.lineTo(center - glyphRadius, center + glyphRadius);
    context.strokeStyle = `rgba(255, 255, 255, ${0.72 + (clampedProgress * 0.28)})`;
    context.lineWidth = 8;
    context.lineCap = 'round';
    context.stroke();

    visual.texture.needsUpdate = true;
  }

  _updateVRDeletionHolds(now) {
    this._vrDeleteStates.forEach(state => {
      if (state.completedAt !== null) {
        if (state.visual) {
          const confirmationProgress = Math.min((now - state.completedAt) / 180, 1);
          const confirmationScale = 0.05 + (confirmationProgress * 0.014);
          state.visual.sprite.scale.set(confirmationScale, confirmationScale, 1);
          state.visual.sprite.material.opacity = 1 - confirmationProgress;
          if (confirmationProgress >= 1) this._disposeVRDeleteVisual(state);
        }
        return;
      }

      if (!this.unifiedMeasurementPoints.includes(state.point)) {
        state.startedAt = null;
        this._disposeVRDeleteVisual(state);
        return;
      }

      const controllerPosition = this._getVRControllerPosition(state.controller);
      const activeRadius = state.startedAt === null ? this.VR_DELETE_RADIUS : this.VR_DELETE_CANCEL_RADIUS;
      const inRange = controllerPosition.distanceTo(state.point.position) <= activeRadius;
      if (!inRange) {
        state.startedAt = null;
        state.inRange = false;
        state.progress = 0;
        this._drawVRDeleteProgress(state.visual, 0);
        if (state.visual) state.visual.material.opacity = 0.45;
        return;
      }

      if (state.startedAt === null) state.startedAt = now;
      state.inRange = true;
      if (state.visual) state.visual.material.opacity = 1;
      const heldFor = now - state.startedAt;
      const fillDuration = this.VR_DELETE_HOLD_MS - this.VR_DELETE_INTENT_DELAY_MS;
      state.progress = Math.min(
        Math.max((heldFor - this.VR_DELETE_INTENT_DELAY_MS) / fillDuration, 0),
        1
      );
      this._drawVRDeleteProgress(state.visual, state.progress);

      if (state.progress >= 1) {
        this.removeUnifiedMeasurementPoint(state.point);
        state.completedAt = now;
        this._pulseVRController(state, 0.65, 80);
      }
    });
  }

  _pulseVRController(state, intensity, duration) {
    const gamepad = state.inputSource?.gamepad || state.controller?.inputSource?.gamepad;
    const actuator = gamepad?.hapticActuators?.[0] || gamepad?.vibrationActuator;
    if (!actuator || typeof actuator.pulse !== 'function') return;
    Promise.resolve(actuator.pulse(intensity, duration)).catch(() => {});
  }

  _updateVRDeleteFeedback(now) {
    this.unifiedMeasurementPoints.forEach(point => {
      if (!point.sphere) return;
      const baseScale = point.sphere.userData.measurementBaseScale ?? 0.5;
      point.sphere.scale.setScalar(baseScale);
      if (point.sphere.material?.color) point.sphere.material.color.set(0xffffff);
    });

    const controllers = [this.controller1, this.controller2].filter(Boolean);
    controllers.forEach(controller => {
      const ghostSphere = this._getGhostSphereForController(controller);
      if (ghostSphere) {
        ghostSphere.scale.setScalar(0.5);
        ghostSphere.material.color.set(0x888888);
        ghostSphere.material.opacity = 0.25;
      }
    });

    if (!this.measurementAvailable || !this.measurementSystemEnabled) {
      this._vrDeleteHoverStates.clear();
      return;
    }

    controllers.forEach(controller => {
      const ghostSphere = this._getGhostSphereForController(controller);
      const deleteState = this._vrDeleteStates.get(controller);

      if (deleteState) {
        if (deleteState.completedAt !== null) {
          const completionProgress = Math.min((now - deleteState.completedAt) / 180, 1);
          if (ghostSphere && completionProgress < 1) {
            ghostSphere.scale.setScalar(0.66 - (completionProgress * 0.16));
            ghostSphere.material.color.set(0xff755c).lerp(new THREE.Color(0xffffff), 1 - completionProgress);
            ghostSphere.material.opacity = 0.72 - (completionProgress * 0.47);
          }
          return;
        }

        if (deleteState.inRange !== false && this.unifiedMeasurementPoints.includes(deleteState.point)) {
          const pulse = 0.5 + (Math.sin(now / 90) * 0.5);
          const progress = deleteState.progress || 0;
          const colour = new THREE.Color(0xffc26b).lerp(new THREE.Color(0xff755c), progress);
          this._styleMeasurementPointForDelete(deleteState.point, colour, 1.13 + (pulse * 0.035));
          if (ghostSphere) {
            ghostSphere.scale.setScalar(0.57 + (pulse * 0.025));
            ghostSphere.material.color.copy(colour);
            ghostSphere.material.opacity = 0.58 + (progress * 0.12);
          }
        }
        return;
      }

      const nearby = this._getNearbyUnifiedMeasurementPoint(controller);
      if (!nearby) {
        this._vrDeleteHoverStates.delete(controller);
        return;
      }

      const previousHover = this._vrDeleteHoverStates.get(controller);
      if (!previousHover || previousHover.point !== nearby.point) {
        this._vrDeleteHoverStates.set(controller, { point: nearby.point, startedAt: now });
        return;
      }
      if ((now - previousHover.startedAt) < this.VR_DELETE_HOVER_DELAY_MS) return;

      const proximity = 1 - (nearby.distance / Math.max(this.VR_DELETE_RADIUS, Number.EPSILON));
      const pulse = 0.5 + (Math.sin(now / 180) * 0.5);
      const hoverColour = new THREE.Color(0xffd7a0);
      this._styleMeasurementPointForDelete(nearby.point, hoverColour, 1.07 + (pulse * 0.018));
      if (ghostSphere) {
        ghostSphere.scale.setScalar(0.53 + (proximity * 0.025));
        ghostSphere.material.color.copy(hoverColour);
        ghostSphere.material.opacity = 0.34 + (proximity * 0.12);
      }
    });
  }

  _styleMeasurementPointForDelete(point, colour, scaleMultiplier) {
    if (!point?.sphere) return;
    const baseScale = point.sphere.userData.measurementBaseScale ?? 0.5;
    point.sphere.scale.setScalar(baseScale * scaleMultiplier);
    if (point.sphere.material?.color) point.sphere.material.color.copy(colour);
  }

  _disposeVRDeleteVisual(state) {
    if (!state?.visual) return;
    const { sprite, material, texture } = state.visual;
    if (sprite.parent) sprite.parent.remove(sprite);
    material.dispose();
    texture.dispose();
    state.visual = null;
  }

  _cancelAllVRDeletionHolds() {
    if (!this._vrDeleteStates) return;
    this._vrDeleteStates.forEach(state => {
      state.startedAt = null;
      state.progress = 0;
      this._disposeVRDeleteVisual(state);
    });
    this._vrDeleteStates.clear();
    this._vrDeleteHoverStates.clear();
  }

  _getVRControllerIntersection(controller) {
    const tempMatrix = new THREE.Matrix4();
    tempMatrix.identity().extractRotation(controller.matrixWorld);
    const rayOrigin = new THREE.Vector3();
    const rayDirection = new THREE.Vector3(0, 0, -1).applyMatrix4(tempMatrix);
    controller.getWorldPosition(rayOrigin);
    const raycaster = new THREE.Raycaster(rayOrigin, rayDirection.normalize());
    const fallbackTargets = (this.scene && this.scene.children) ? this.scene.children : [];
    const validIntersects = this.getValidIntersections(raycaster, fallbackTargets);
    return validIntersects.length > 0 ? validIntersects[0] : null;
  }

  _placeVRMeasurementPoint(point) {
    
    if (this.measurementSystemEnabled) {

      this.placeUnifiedMeasurementPoint(point, 'vr');
    }
  }

  /**
   * Clear legacy desktop measurements
   */
  clearLegacyDesktopMeasurement() {

    if (this.desktopMeasurementPoints && this.desktopMeasurementPoints.length > 0) {
      this.desktopMeasurementPoints.forEach(sphere => {
        if (sphere && this.scene.children.includes(sphere)) {
          this.scene.remove(sphere);
        }
      });
      this.desktopMeasurementPoints.length = 0;
    }
    

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
    

    if (this.unifiedMeasurementPoints.length === 0) {
      this.clearLegacyVRMeasurement();
      this.clearLegacyDesktopMeasurement();
    }
    

    if (this.unifiedMeasurementPoints.length >= 2) {
      const oldestPoint = this.unifiedMeasurementPoints.shift();
      this._removeUnifiedMeasurementSphere(oldestPoint.sphere);
    }
    

    const sphere = new THREE.Mesh(this.sphereGeometry, this.placedMaterial.clone());
    sphere.position.copy(point);
    sphere.scale.setScalar(0.5);
    sphere.userData.isMeasurementSphere = true;
    sphere.userData.measurementBaseScale = 0.5;
    this.scene.add(sphere);
    

    this.unifiedMeasurementPoints.push({
      position: point.clone(),
      sphere: sphere,
      source: source
    });
    

    this.updateUnifiedMeasurementLine();
    

    this.updateMeasurementPanel();
    this._notifyMeasurementChange('point-added', { source });
    
  }

  removeUnifiedMeasurementPoint(point) {
    this.cancelScaleCalibration();
    const pointIndex = this.unifiedMeasurementPoints.indexOf(point);
    if (pointIndex === -1) return false;

    const [removedPoint] = this.unifiedMeasurementPoints.splice(pointIndex, 1);
    this._removeUnifiedMeasurementSphere(removedPoint.sphere);
    this.updateUnifiedMeasurementLine();
    this.updateMeasurementPanel();
    this._notifyMeasurementChange('point-removed', { source: removedPoint.source });
    return true;
  }

  _notifyMeasurementChange(reason, details = {}) {
    if (!this.onMeasurementChange) return;
    const points = this.unifiedMeasurementPoints.map(point => ({
      position: {
        x: point.position.x,
        y: point.position.y,
        z: point.position.z
      },
      source: point.source
    }));
    const line = points.length === 2 ? {
      start: { ...points[0].position },
      end: { ...points[1].position },
      length: this.unifiedMeasurementPoints[0].position.distanceTo(this.unifiedMeasurementPoints[1].position)
    } : null;
    this.onMeasurementChange({
      reason,
      pointCount: points.length,
      points,
      line,
      ...details
    });
  }

  _removeUnifiedMeasurementSphere(sphere) {
    if (!sphere) return;
    if (sphere.parent) sphere.parent.remove(sphere);
    if (sphere.material && sphere.material !== this.placedMaterial) {
      sphere.material.dispose();
    }
  }

  /**
   * Update the unified measurement line connecting the points
   */
  updateUnifiedMeasurementLine() {

    if (this.unifiedMeasurementLine) {
      this.scene.remove(this.unifiedMeasurementLine);
      this.unifiedMeasurementLine = null;
    }

    if (this.unifiedMeasurementPoints.length !== 2) {
      if (this.measurementSprite) {
        this.measurementSprite.visible = false;
        if (this.measurementSprite.parent) this.measurementSprite.parent.remove(this.measurementSprite);
      }
      this.unifiedMeasurementPoints.forEach(point => {
        if (point.sphere) {
          point.sphere.userData.measurementBaseScale = 0.5;
          point.sphere.scale.setScalar(0.5);
        }
      });
    }
    

    if (this.unifiedMeasurementPoints.length === 2) {
      const point1 = this.unifiedMeasurementPoints[0].position;
      const point2 = this.unifiedMeasurementPoints[1].position;
      
      const lineGeometry = new LineGeometry();
      lineGeometry.setPositions([
        point1.x, point1.y, point1.z,
        point2.x, point2.y, point2.z
      ]);
      

      this.unifiedMeasurementLine = new Line2(lineGeometry, this.desktopLineMaterial);
      this.unifiedMeasurementLine.computeLineDistances();
      this.unifiedMeasurementLine.userData.isMeasurementLine = true;
      this.scene.add(this.unifiedMeasurementLine);
      

      const distance = point1.distanceTo(point2);
      this.createMeasurementDisplay(distance);

      // Scale spheres: half size normally, 1/4 of that for small measurements (≤ 20 cm)
      const sphereScale = (distance * 100 <= 20.0) ? 0.125 : 0.5;
      this.unifiedMeasurementPoints.forEach(point => {
        if (point.sphere) {
          point.sphere.userData.measurementBaseScale = sphereScale;
          point.sphere.scale.setScalar(sphereScale);
        }
      });

      if (this.measurementSprite) {
        const midpoint = new THREE.Vector3();
        midpoint.addVectors(point1, point2);
        midpoint.multiplyScalar(0.5);
        
        const offsetScale = Math.max(0.05, Math.min(0.2, distance * 0.03));
        midpoint.y += offsetScale;
        
        this.measurementSprite.position.copy(midpoint);
        

        if (!this.scene.children.includes(this.measurementSprite)) {
          this.scene.add(this.measurementSprite);
        }
        

        const inVR = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting;
        this.measurementSprite.visible = inVR || this.showMeasurementLabels;
      }
      

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

      if (this.ghostSpheres.left && this.controller1 && this.ghostSpheres.left.parent === this.controller1) {
        this.ghostSpheres.left.position.set(0, 0, -0.07);
        this.ghostSpheres.left.rotation.set(0, 0, 0);
        this.ghostSpheres.left.scale.set(0.5, 0.5, 0.5);
      }
      if (this.ghostSpheres.right && this.controller2 && this.ghostSpheres.right.parent === this.controller2) {
        this.ghostSpheres.right.position.set(0, 0, -0.07);
        this.ghostSpheres.right.rotation.set(0, 0, 0);
        this.ghostSpheres.right.scale.set(0.5, 0.5, 0.5);
      }
    }
  }

  /**
   * Update method called each frame by the render loop
   */
  update() {
    const now = performance.now();
    if (this._vrDeleteStates.size > 0) {
      this._updateVRDeletionHolds(now);
    }
    if (this.isVR && this.ghostSpheres) {
      this._updateVRDeleteFeedback(now);
    }
    if (this.isVR && this.ghostSpheres) {
      if (this.ghostSpheres.left && this.controller1 && this.ghostSpheres.left.visible) {

        if (this.ghostSpheres.left.position.length() > 1.0) {
          this.resetGhostSpherePositions();
        }
      }
      if (this.ghostSpheres.right && this.controller2 && this.ghostSpheres.right.visible) {

        if (this.ghostSpheres.right.position.length() > 1.0) {
          this.resetGhostSpherePositions();
        }
      }
    }
    

    if (this.measurementSprite) {
      const inVR = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting;
      const hasUnifiedMeasurement = this.unifiedMeasurementPoints && this.unifiedMeasurementPoints.length === 2;
      this.measurementSprite.visible = hasUnifiedMeasurement && (inVR || this.showMeasurementLabels);
    }
  }


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
    clearTimeout(this._suppressPanelClickTimer);
    this._suppressPanelClickTimer = null;
    this.cancelScaleCalibration();
    this.stopScaleModalViewportTracking();
    if (this.measurementScaleModal?.parentNode) this.measurementScaleModal.remove();
    this.measurementScaleModal = null;
    this.measurementModalUi = null;
    if (this.measurementPanel && this.measurementPanel.parentNode) {
      this.measurementPanel.parentNode.removeChild(this.measurementPanel);
      this.measurementPanel = null;
    }

    if (this.focusAnimation) {
      cancelAnimationFrame(this.focusAnimation);
      this.focusAnimation = null;
    }
    if (this.controls && this._cancelFocusOnUserInput) {
      this.controls.removeEventListener('start', this._cancelFocusOnUserInput);
      this._cancelFocusOnUserInput = null;
    }

    this.renderer.domElement.removeEventListener('click', this._boundOnMouseClick, false);
    this.renderer.domElement.removeEventListener('mousedown', this._boundOnMouseDown, false);
    this.renderer.domElement.removeEventListener('mousemove', this._boundOnMouseMove, false);
    this.renderer.domElement.removeEventListener('mouseup', this._boundOnMouseUp, false);

    [this.controller1, this.controller2].forEach(controller => {
      if (!controller) return;
      controller.removeEventListener('selectstart', this._onVRTriggerDown);
      controller.removeEventListener('selectend', this._onVRTriggerUp);
      controller.removeEventListener('ybuttondown', this._onVRYButtonDown);
      controller.removeEventListener('ybuttonup', this._onVRYButtonUp);
    });

    this._vrDeleteStates.forEach(state => this._disposeVRDeleteVisual(state));
    this._vrDeleteStates.clear();
    this._vrDeleteHoverStates.clear();

    this.clearLegacyDesktopMeasurement();
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
    

    if (typeof window !== 'undefined' && window.measurementSystem === this) {
      window.measurementSystem = undefined;
    }
  }

  createMeasurementPanel() {
    const panel = document.createElement('div');
    panel.className = `measurement-panel${this.theme === 'light' ? ' light-theme' : ''}`;
    panel.innerHTML = `
      <div class="measurement-status">
        <div class="measurement-status-primary"></div>
        <div class="measurement-panel-hint"></div>
      </div>
      <form class="measurement-scale-editor" hidden>
        <div class="measurement-scale-row">
          <input class="measurement-scale-input" type="text" inputmode="decimal" enterkeyhint="done" readonly aria-label="Correct measurement">
          <span class="measurement-scale-unit"></span>
          <button class="measurement-scale-confirm" type="submit" aria-label="Confirm and rescale">&#10003;</button>
        </div>
        <label class="measurement-scale-factor-row">
          <span>Scale</span>
          <input class="measurement-scale-factor-input" type="text" inputmode="decimal" enterkeyhint="done" aria-label="Correct scale multiplier">
          <span>&times;</span>
        </label>
      </form>
    `;

    this.measurementUi = {
      status: panel.querySelector('.measurement-status'),
      primary: panel.querySelector('.measurement-status-primary'),
      statusHint: panel.querySelector('.measurement-panel-hint'),
      editor: panel.querySelector('.measurement-scale-editor'),
      input: panel.querySelector('.measurement-scale-input'),
      unit: panel.querySelector('.measurement-scale-unit'),
      confirm: panel.querySelector('.measurement-scale-confirm'),
      factorInput: panel.querySelector('.measurement-scale-factor-input')
    };
    
    panel.addEventListener('click', (_event) => {
      if (this._suppressPanelClick || this.isEditingScale) {
        this._suppressPanelClick = false;
        return;
      }
      if (!this.measurementAvailable) {
        this.updateMeasurementPanel();
        return;
      }

      this.toggleMeasurementPanelState();
    });

    panel.addEventListener('contextmenu', (event) => {
      if (!this.canEditScaleCalibration()) return;
      event.preventDefault();
      event.stopPropagation();
      if (this._panelTouchActive) return;
      this.beginScaleCalibration({ selectValue: true });
    });

    panel.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch' || !this.canEditScaleCalibration()) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      this._clearPanelLongPress();
      this._panelLongPressStart = { x: event.clientX, y: event.clientY };
      this._panelLongPressTimer = setTimeout(() => {
        this._panelLongPressTimer = null;
        this._panelLongPressReady = true;
        this.beginScaleCalibration({ selectValue: true, focusInput: true });
      }, 550);
    });

    panel.addEventListener('pointermove', (event) => {
      if (!this._panelLongPressTimer || !this._panelLongPressStart) return;
      const distance = Math.hypot(
        event.clientX - this._panelLongPressStart.x,
        event.clientY - this._panelLongPressStart.y
      );
      if (distance > 8) this._clearPanelLongPress();
    });
    panel.addEventListener('pointerup', (event) => {
      this._completePanelLongPress(event);
    });
    panel.addEventListener('touchstart', (event) => {
      if (event.touches.length !== 1 || !this.canEditScaleCalibration()) return;
      this._clearPanelLongPress();
      const touch = event.touches[0];
      this._panelTouchActive = true;
      this._panelLongPressStart = { x: touch.clientX, y: touch.clientY };
      this._panelLongPressTimer = setTimeout(() => {
        this._panelLongPressTimer = null;
        this._panelLongPressReady = true;
        this.beginScaleCalibration({ selectValue: true, focusInput: false });
      }, 550);
    }, { passive: true });
    panel.addEventListener('touchmove', (event) => {
      if (!this._panelLongPressStart || event.touches.length !== 1) return;
      const touch = event.touches[0];
      const distance = Math.hypot(
        touch.clientX - this._panelLongPressStart.x,
        touch.clientY - this._panelLongPressStart.y
      );
      if (distance > 8) this._clearPanelLongPress();
    }, { passive: true });
    panel.addEventListener('touchend', (event) => {
      this._completePanelLongPress(event, true);
    }, { passive: true });
    panel.addEventListener('touchcancel', () => this._clearPanelLongPress());
    panel.addEventListener('pointercancel', () => this._clearPanelLongPress());

    this.measurementUi.editor.addEventListener('click', (event) => {
      if (this.isEditingScale) event.stopPropagation();
    });
    this.measurementUi.editor.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.confirmScaleCalibration();
    });
    this.measurementUi.input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.confirmScaleCalibration();
      }
      if (event.key === 'Escape') this.cancelScaleCalibration();
    });
    this.measurementUi.factorInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.confirmScaleCalibration();
      }
      if (event.key === 'Escape') this.cancelScaleCalibration();
    });
    this.measurementUi.input.addEventListener('input', () => {
      this._scaleCalibrationEditSource = 'measurement';
      this.syncScaleFactorFromMeasurement(this.measurementUi);
    });
    this.measurementUi.factorInput.addEventListener('input', () => {
      this._scaleCalibrationEditSource = 'factor';
      this.syncMeasurementFromScaleFactor(this.measurementUi);
    });

    const parent = this.uiParent || (this.renderer && this.renderer.domElement && this.renderer.domElement.parentElement) || document.body;
    parent.appendChild(panel);
    this.measurementPanel = panel;
    this.createMeasurementScaleModal(parent);
  }

  toggleMeasurementPanelState() {
    if (!(this.renderer && this.renderer.xr && this.renderer.xr.isPresenting)) {
      this.desktopMeasurementMode = !this.desktopMeasurementMode;
      if (!this.desktopMeasurementMode) this.clearUnifiedMeasurement();
      this.updateMeasurementPanel();
      return;
    }

    this.measurementSystemEnabled = !this.measurementSystemEnabled;
    if (!this.measurementSystemEnabled) {
      this.clearUnifiedMeasurement();
      if (this.ghostSpheres.left) this.ghostSpheres.left.visible = false;
      if (this.ghostSpheres.right) this.ghostSpheres.right.visible = false;
    } else {
      if (this.ghostSpheres.left) this.ghostSpheres.left.visible = true;
      if (this.ghostSpheres.right) this.ghostSpheres.right.visible = true;
      this.resetGhostSpherePositions();
    }
    this.updateMeasurementPanel();
  }

  createMeasurementScaleModal(parent) {
    const modal = document.createElement('div');
    modal.className = 'measurement-scale-modal';
    modal.hidden = true;
    modal.innerHTML = `
      <form class="measurement-scale-modal-card">
        <div class="measurement-scale-modal-title">Correct measurement</div>
        <div class="measurement-scale-modal-row">
          <input class="measurement-scale-modal-input" type="text" inputmode="decimal" enterkeyhint="done" aria-label="Correct measurement value">
          <span class="measurement-scale-modal-unit"></span>
          <button class="measurement-scale-modal-confirm" type="submit" aria-label="Confirm and rescale">&#10003;</button>
        </div>
        <label class="measurement-scale-modal-factor-row">
          <span>Scale</span>
          <input class="measurement-scale-modal-factor-input" type="text" inputmode="decimal" enterkeyhint="done" aria-label="Correct scale multiplier">
          <span>&times;</span>
        </label>
      </form>
    `;
    this.measurementModalUi = {
      card: modal.querySelector('.measurement-scale-modal-card'),
      input: modal.querySelector('.measurement-scale-modal-input'),
      unit: modal.querySelector('.measurement-scale-modal-unit'),
      factorInput: modal.querySelector('.measurement-scale-modal-factor-input')
    };
    this.measurementModalUi.card.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.confirmScaleCalibration();
    });
    this.measurementModalUi.input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.confirmScaleCalibration();
      }
      if (event.key === 'Escape') this.cancelScaleCalibration();
    });
    this.measurementModalUi.factorInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.confirmScaleCalibration();
      }
      if (event.key === 'Escape') this.cancelScaleCalibration();
    });
    this.measurementModalUi.input.addEventListener('input', () => {
      this._scaleCalibrationEditSource = 'measurement';
      this.syncScaleFactorFromMeasurement(this.measurementModalUi);
    });
    this.measurementModalUi.factorInput.addEventListener('input', () => {
      this._scaleCalibrationEditSource = 'factor';
      this.syncMeasurementFromScaleFactor(this.measurementModalUi);
    });
    modal.addEventListener('pointerdown', (event) => {
      if (event.target === modal) {
        event.preventDefault();
        event.stopPropagation();
        this.cancelScaleCalibration();
      }
    });
    parent.appendChild(modal);
    this.measurementScaleModal = modal;
  }

  startScaleModalViewportTracking() {
    const viewport = typeof window !== 'undefined' ? window.visualViewport : null;
    if (!viewport) return;
    if (!this._scaleModalViewportTracking) {
      viewport.addEventListener('resize', this._boundUpdateScaleModalPosition);
      viewport.addEventListener('scroll', this._boundUpdateScaleModalPosition);
      this._scaleModalViewportTracking = true;
    }
    this.updateScaleModalPosition();
  }

  stopScaleModalViewportTracking() {
    const viewport = typeof window !== 'undefined' ? window.visualViewport : null;
    if (viewport) {
      viewport.removeEventListener('resize', this._boundUpdateScaleModalPosition);
      viewport.removeEventListener('scroll', this._boundUpdateScaleModalPosition);
    }
    this._scaleModalViewportTracking = false;
    this._scaleModalAnchor = null;
    const card = this.measurementModalUi?.card;
    if (card) {
      card.style.left = '';
      card.style.top = '';
    }
  }

  updateScaleModalPosition() {
    const viewport = typeof window !== 'undefined' ? window.visualViewport : null;
    const card = this.measurementModalUi?.card;
    if (!viewport || !card || this.measurementScaleModal?.hidden) return;
    const rect = card.getBoundingClientRect();
    if (!this._scaleModalAnchor) {
      this._scaleModalAnchor = {
        left: rect.left + (rect.width / 2),
        top: rect.top + (rect.height / 2)
      };
    }

    const margin = 12;
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;
    const visibleLeft = viewport.offsetLeft + margin;
    const visibleRight = viewport.offsetLeft + viewport.width - margin;
    const visibleTop = viewport.offsetTop + margin;
    const visibleBottom = viewport.offsetTop + viewport.height - margin;
    const left = Math.min(
      Math.max(this._scaleModalAnchor.left, visibleLeft + halfWidth),
      visibleRight - halfWidth
    );
    const top = Math.min(
      Math.max(this._scaleModalAnchor.top, visibleTop + halfHeight),
      visibleBottom - halfHeight
    );

    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
  }

  _clearPanelLongPress() {
    if (this._panelLongPressTimer) clearTimeout(this._panelLongPressTimer);
    this._panelLongPressTimer = null;
    this._panelLongPressStart = null;
    this._panelLongPressReady = false;
    this._panelTouchActive = false;
  }

  _completePanelLongPress(event, selectValue = true) {
    const shouldOpenEditor = this._panelLongPressReady;
    const editorAlreadyOpen = this.isEditingScale;
    this._clearPanelLongPress();
    if (!shouldOpenEditor) return;
    event.stopPropagation();
    if (editorAlreadyOpen) {
      this.focusScaleCalibrationInput(selectValue);
    } else {
      this.beginScaleCalibration({ selectValue });
    }
  }

  canEditScaleCalibration() {
    const isVR = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting;
    return this.allowScaleCalibration
      && !isVR
      && this.measurementAvailable
      && this.onScaleCalibration
      && this.unifiedMeasurementPoints?.length === 2;
  }

  usesScaleCalibrationModal() {
    return typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;
  }

  getActiveScaleInput() {
    return this.scaleEditorUsesModal ? this.measurementModalUi?.input : this.measurementUi?.input;
  }

  focusScaleCalibrationInput(selectValue = true) {
    const input = this.getActiveScaleInput();
    input?.focus({ preventScroll: true });
    if (selectValue) {
      input?.select();
    } else if (input?.setSelectionRange) {
      const caretPosition = input.value.length;
      input.setSelectionRange(caretPosition, caretPosition);
    }
  }

  beginScaleCalibration({ selectValue = true, focusInput = true } = {}) {
    if (!this.canEditScaleCalibration() || this.isEditingScale) return;
    this.isEditingScale = true;
    this.scaleEditorUsesModal = this.usesScaleCalibrationModal();
    this.updateMeasurementPanel();
    if (focusInput) this.focusScaleCalibrationInput(selectValue);
  }

  cancelScaleCalibration() {
    this._clearPanelLongPress();
    if (!this.isEditingScale) return;
    this.getActiveScaleInput()?.blur();
    this.isEditingScale = false;
    this.scaleEditorUsesModal = false;
    this.stopScaleModalViewportTracking();
    if (this.measurementScaleModal) this.measurementScaleModal.hidden = true;
    this.updateMeasurementPanel();
  }

  confirmScaleCalibration() {
    if (!this.isEditingScale || this.unifiedMeasurementPoints?.length !== 2) return;
    const input = this.getActiveScaleInput();
    const enteredValue = Number.parseFloat(input?.value);
    const unit = input?.dataset.unit;
    const point1 = this.unifiedMeasurementPoints[0].position;
    const point2 = this.unifiedMeasurementPoints[1].position;
    const currentDistance = point1.distanceTo(point2);
    let targetDistance = unit === 'cm' ? enteredValue / 100 : enteredValue;

    if (this._scaleCalibrationEditSource === 'factor') {
      const factorInput = this.scaleEditorUsesModal
        ? this.measurementModalUi?.factorInput
        : this.measurementUi?.factorInput;
      const targetMultiplier = Number.parseFloat(factorInput?.value);
      if (!Number.isFinite(targetMultiplier) || targetMultiplier <= 0 || !this._scaleCalibrationEditMultiplier) {
        factorInput?.setAttribute('aria-invalid', 'true');
        factorInput?.focus();
        return;
      }
      targetDistance = currentDistance * (targetMultiplier / this._scaleCalibrationEditMultiplier);
    }

    if (!Number.isFinite(targetDistance) || targetDistance <= 0 || currentDistance <= 0) {
      input?.setAttribute('aria-invalid', 'true');
      input?.focus();
      return;
    }

    input?.blur();
    const scaleFactor = targetDistance / currentDistance;
    const applied = this.onScaleCalibration?.({ scaleFactor, currentDistance, targetDistance });
    if (applied === false) return;

    const origin = applied?.origin;
    if (!origin) return;
    this.scaleCalibrationMultiplier = Number.isFinite(applied?.scaleMultiplier)
      ? applied.scaleMultiplier
      : this.scaleCalibrationMultiplier * scaleFactor;
    this.hasScaleCalibration = true;
    this.unifiedMeasurementPoints.forEach(point => {
      point.position.sub(origin).multiplyScalar(scaleFactor).add(origin);
    });
    this.unifiedMeasurementPoints.forEach(point => point.sphere?.position.copy(point.position));
    this.isEditingScale = false;
    this.scaleEditorUsesModal = false;
    this.stopScaleModalViewportTracking();
    if (this.measurementScaleModal) this.measurementScaleModal.hidden = true;
    this.updateUnifiedMeasurementLine();
    this.updateMeasurementPanel();
    this._notifyMeasurementChange('scale-calibrated', {
      scaleFactor,
      scaleMultiplier: this.scaleCalibrationMultiplier
    });
  }

  updateScaleCalibrationEditor(distance) {
    if (!this.measurementUi) return;
    const useCentimetres = distance * 100 <= 20;
    const unit = useCentimetres ? 'cm' : 'm';
    const value = useCentimetres ? distance * 100 : distance;
    const { input, unit: unitLabel, confirm, factorInput } = this.measurementUi;
    const displayValue = value.toFixed(2);
    input.value = displayValue;
    input.style.width = `${Math.max(3, displayValue.length + 0.15)}ch`;
    input.dataset.unit = unit;
    input.setAttribute('aria-label', `Correct measurement in ${unit}`);
    input.readOnly = !this.isEditingScale;
    input.removeAttribute('aria-invalid');
    unitLabel.textContent = unit;
    confirm.hidden = !this.isEditingScale;
    factorInput.value = this.scaleCalibrationMultiplier.toFixed(2);
    factorInput.removeAttribute('aria-invalid');
    this._scaleCalibrationEditDistance = distance;
    this._scaleCalibrationEditMultiplier = this.scaleCalibrationMultiplier;
    this._scaleCalibrationEditSource = 'measurement';
  }

  updateScaleCalibrationModal(distance) {
    if (!this.measurementModalUi || !this.measurementScaleModal) return;
    const useCentimetres = distance * 100 <= 20;
    const unit = useCentimetres ? 'cm' : 'm';
    const value = useCentimetres ? distance * 100 : distance;
    const displayValue = value.toFixed(2);
    this.measurementModalUi.input.value = displayValue;
    this.measurementModalUi.input.style.width = `${Math.max(3, displayValue.length + 0.15)}ch`;
    this.measurementModalUi.input.dataset.unit = unit;
    this.measurementModalUi.input.removeAttribute('aria-invalid');
    this.measurementModalUi.unit.textContent = unit;
    this._scaleCalibrationEditDistance = distance;
    this._scaleCalibrationEditMultiplier = this.scaleCalibrationMultiplier;
    this._scaleCalibrationEditSource = 'measurement';
    this.measurementModalUi.factorInput.value = this.scaleCalibrationMultiplier.toFixed(2);
    this.measurementModalUi.factorInput.removeAttribute('aria-invalid');
    this.measurementScaleModal.hidden = false;
    this.startScaleModalViewportTracking();
  }

  syncScaleFactorFromMeasurement(ui) {
    const { input, factorInput } = ui || {};
    const enteredValue = Number.parseFloat(input?.value);
    const targetDistance = input?.dataset.unit === 'cm' ? enteredValue / 100 : enteredValue;
    if (!Number.isFinite(targetDistance) || targetDistance <= 0 || !this._scaleCalibrationEditDistance) return;
    const multiplier = this._scaleCalibrationEditMultiplier * (targetDistance / this._scaleCalibrationEditDistance);
    factorInput.value = multiplier.toFixed(2);
    input.removeAttribute('aria-invalid');
    factorInput.removeAttribute('aria-invalid');
  }

  syncMeasurementFromScaleFactor(ui) {
    const { input, factorInput } = ui || {};
    const multiplier = Number.parseFloat(factorInput?.value);
    if (!Number.isFinite(multiplier) || multiplier <= 0 || !this._scaleCalibrationEditMultiplier) return;
    const targetDistance = this._scaleCalibrationEditDistance * (multiplier / this._scaleCalibrationEditMultiplier);
    const displayValue = input?.dataset.unit === 'cm' ? targetDistance * 100 : targetDistance;
    input.value = displayValue.toFixed(2);
    input.style.width = `${Math.max(3, input.value.length + 0.15)}ch`;
    input.removeAttribute('aria-invalid');
    factorInput.removeAttribute('aria-invalid');
  }

  updateMeasurementPanel() {
    const panel = this.measurementPanel;
    if (!panel) return;
    const isVR = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting;
    

    const hasPoints = this.unifiedMeasurementPoints ? this.unifiedMeasurementPoints.length : 0;
    const hasMeasurement = hasPoints === 2;
    
    const isEnabled = isVR ? this.measurementSystemEnabled : this.desktopMeasurementMode;
    
    let distance;
    if (hasMeasurement) {
      distance = this.unifiedMeasurementPoints[0].position.distanceTo(this.unifiedMeasurementPoints[1].position);
    }
    

    panel.classList.remove('disabled', 'active', 'measured', 'unavailable', 'editing-scale');
    panel.style.opacity = '';
    panel.style.cursor = 'pointer';
    panel.setAttribute('aria-disabled', 'false');
    panel.removeAttribute('title');

    const { status, primary, statusHint, editor } = this.measurementUi;
    status.hidden = false;
    editor.hidden = true;

    if (!this.measurementAvailable) {
      panel.classList.add('disabled', 'unavailable');
      panel.style.opacity = '0.55';
      panel.style.cursor = 'not-allowed';
      panel.setAttribute('aria-disabled', 'true');
      panel.title = 'This model is marked as not measurable';
      primary.textContent = 'MEASURE';
      statusHint.textContent = 'Not available';
      return;
    }
    
    if (!isEnabled) {
      panel.classList.add('disabled');
      primary.textContent = 'MEASURE';
      statusHint.textContent = 'Click to enable';
    } else if (hasMeasurement) {
      panel.classList.add('measured');
      if (this.isEditingScale && !this.scaleEditorUsesModal) panel.classList.add('editing-scale');
      if (this.allowScaleCalibration && !isVR) {
        panel.title = 'Right-click or long press to correct scale';
      }
      if (this.isEditingScale && !this.scaleEditorUsesModal) {
        status.hidden = true;
        editor.hidden = false;
        this.updateScaleCalibrationEditor(distance);
      } else {
        primary.textContent = this.formatDistance(distance);
        statusHint.textContent = this.allowScaleCalibration && this.hasScaleCalibration
          ? `Scale ${this.scaleCalibrationMultiplier.toFixed(2)}×`
          : 'Click to disable';
        if (this.isEditingScale && this.scaleEditorUsesModal) {
          this.updateScaleCalibrationModal(distance);
        }
      }
    } else {
      panel.classList.add('active');
      const instruction = isVR ? 'Use triggers' : 'Click points';
      primary.textContent = 'MEASURE: ON';
      statusHint.textContent = `${instruction} (${hasPoints}/2)`;
    }
  }


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
  onMouseUp(_event) {
    setTimeout(() => {
      this.isDragging = false;
    }, 10);
  }
  onMouseClick(event) {
    if (!this.measurementAvailable) {
      return;
    }
    const currentTime = Date.now();
    const isDoubleClick = currentTime - this.lastClickTime < 300;
    this.lastClickTime = currentTime;
    if (this.isDragging) {
      return;
    }
    if (!this.desktopMeasurementMode) {


      return;
    }
    

    if (this.desktopMeasurementMode) {
      event.stopPropagation();
      event.preventDefault();
    }

    let camera = this.camera;
    let usedCustomRay = false;

    if (this.getRaycastInfo) {
      const info = this.getRaycastInfo(event);
      if (info && info.mouse && Number.isFinite(info.mouse.x) && Number.isFinite(info.mouse.y)) {
        if (info.mouse.isVector2) {
          this.mouse.copy(info.mouse);
        } else {
          this.mouse.x = info.mouse.x;
          this.mouse.y = info.mouse.y;
        }
        if (info.camera) {
          camera = info.camera;
        }
        usedCustomRay = true;
      }
    }

    if (!usedCustomRay) {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    if (this.renderer && this.renderer.xr && this.renderer.xr.isPresenting) {
      const xrCamera = this.renderer.xr.getCamera();
      if (xrCamera) {
        camera = xrCamera;
      }
    }

    if (!camera || (!camera.isPerspectiveCamera && !camera.isOrthographicCamera)) {
      if (this.scene && this.scene.children) {
        for (const obj of this.scene.children) {
          if (obj.isCamera) {
            camera = obj;
            break;
          }
        }
      }
    }

    if (!camera || (!camera.isPerspectiveCamera && !camera.isOrthographicCamera)) {
      if (typeof window !== 'undefined' && window.camera && (window.camera.isPerspectiveCamera || window.camera.isOrthographicCamera)) {
        camera = window.camera;
      }
    }

    if (!camera || (!camera.isPerspectiveCamera && !camera.isOrthographicCamera && camera.type !== 'ArrayCamera')) {
      return;
    }

    this.raycaster.setFromCamera(this.mouse, camera);

    const validIntersects = this.getValidIntersections(this.raycaster);
    if (validIntersects.length > 0) {
      if (isDoubleClick) {
        this.focusOnPoint(validIntersects[0].point);
      } else {

        const intersectionPoint = validIntersects[0].point;
        this.placeUnifiedMeasurementPoint(intersectionPoint, 'desktop');
      }
    }
  }

  focusOnPoint(point) {
    if (!point || !this.controls || !this.camera) {
      return;
    }

    if (this.focusAnimation) {
      cancelAnimationFrame(this.focusAnimation);
      this.focusAnimation = null;
    }

    if (this._cancelFocusOnUserInput) {
      this.controls.removeEventListener('start', this._cancelFocusOnUserInput);
      this._cancelFocusOnUserInput = null;
    }

    const startTarget = this.controls.target.clone();
    const startPosition = this.camera.position.clone();
    const offset = startPosition.clone().sub(startTarget);
    const newPosition = point.clone().add(offset);
    const duration = 1000;
    const startTime = performance.now();

    const cancelOnUserInput = () => {
      if (this.focusAnimation) {
        cancelAnimationFrame(this.focusAnimation);
        this.focusAnimation = null;
      }
      if (this._cancelFocusOnUserInput) {
        this.controls.removeEventListener('start', this._cancelFocusOnUserInput);
        this._cancelFocusOnUserInput = null;
      }
    };

    this._cancelFocusOnUserInput = cancelOnUserInput;
    this.controls.addEventListener('start', cancelOnUserInput, { once: true });

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
        if (this._cancelFocusOnUserInput) {
          this.controls.removeEventListener('start', this._cancelFocusOnUserInput);
          this._cancelFocusOnUserInput = null;
        }
      }
    };
    this.focusAnimation = requestAnimationFrame(animate);
  }

  _focusOnPoint(point) {

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
      

      this.createMeasurementDisplay(distance);
      
      if (this.measurementSprite) {
        const midpoint = new THREE.Vector3();
        midpoint.addVectors(point1, point2);
        midpoint.multiplyScalar(0.5);
        
        const offsetScale = Math.max(0.05, Math.min(0.2, distance * 0.03));
        midpoint.y += offsetScale;
        
        this.measurementSprite.position.copy(midpoint);
        

        if (!this.scene.children.includes(this.measurementSprite)) {
          this.scene.add(this.measurementSprite);
        }
        

        const inVR = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting;
        this.measurementSprite.visible = inVR || this.showMeasurementLabels;
      }
    }
  }


}
