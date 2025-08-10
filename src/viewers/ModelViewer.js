import * as THREE from 'three';
import { ConfigValidator } from '../utils/ConfigValidator.js';
import { BelowViewer } from '../core/BelowViewer.js';
import { EventSystem } from '../utils/EventSystem.js';
import { MeasurementSystem } from '../measurement/MeasurementSystem.js';
import { VRComfortGlyph } from '../vr/ui/VRComfortGlyph.js';
import { DiveSystem } from '../dive/DiveSystem.js';

/**
 * @typedef {Object} ModelConfig
 * @property {string} url - Path to the GLB model file
 * @property {string} name - Display name for the model
 * @property {string} [credit] - Attribution text for the model
 * @property {Object} [initialPositions] - Camera and target positions for this model
 * @property {Object} [initialPositions.desktop] - Desktop viewing positions
 * @property {Object} [initialPositions.desktop.camera] - Camera position {x, y, z}
 * @property {Object} [initialPositions.desktop.target] - Camera target {x, y, z}
 * @property {Object} [initialPositions.vr] - VR viewing positions
 * @property {Object} [initialPositions.vr.dolly] - VR dolly position {x, y, z}
 * @property {Object} [initialPositions.vr.rotation] - VR rotation {x, y, z}
 */

/**
 * @typedef {Object} VRComfortSettings
 * @property {boolean} [enableComfort=true] - Enable VR comfort features for motion sickness reduction
 * @property {number} [comfortRadius=0.3] - Radius of the comfort zone in meters
 * @property {number} [fadeDistance=0.1] - Distance over which comfort fade effect is applied
 * @property {number} [maxSpeed=2.0] - Maximum movement speed in VR
 * @property {boolean} [enableTeleport=true] - Enable teleportation locomotion
 * @property {boolean} [enableSmootTurn=false] - Enable smooth turning (can cause motion sickness)
 */

/**
 * @typedef {Object} SceneConfig
 * @property {Object} [background] - Scene background configuration
 * @property {string} [background.type='color'] - Background type ('color', 'texture', 'gradient')
 * @property {string} [background.value='#001122'] - Background color or texture path
 * @property {Object} [fog] - Fog settings for depth perception
 * @property {boolean} [fog.enabled=false] - Enable scene fog
 * @property {string} [fog.color='#001122'] - Fog color
 * @property {number} [fog.near=10] - Fog near distance
 * @property {number} [fog.far=100] - Fog far distance
 */

/**
 * @typedef {Object} CameraConfig
 * @property {number} [fov=65] - Field of view in degrees
 * @property {number} [near=0.05] - Near clipping plane distance
 * @property {number} [far=2000] - Far clipping plane distance
 * @property {Object} [position] - Initial camera position
 * @property {number} [position.x=0] - X coordinate
 * @property {number} [position.y=5] - Y coordinate
 * @property {number} [position.z=10] - Z coordinate
 * @property {Object} [desktop] - Desktop-specific camera controls
 * @property {boolean} [desktop.enableDamping=true] - Enable camera damping
 * @property {number} [desktop.dampingFactor=0.08] - Damping factor (0-1)
 * @property {number} [desktop.maxDistance=100] - Maximum zoom distance
 * @property {number} [desktop.minDistance=0.5] - Minimum zoom distance
 */

/**
 * @typedef {Object} ModelViewerOptions
 * @property {Object.<string, ModelConfig>} [models={}] - Object mapping model keys to configurations
 * @property {boolean} [autoLoadFirst=true] - Automatically load the first model
 * @property {boolean} [showLoadingIndicator=true] - Show loading spinner
 * @property {boolean} [showStatus=true] - Show status messages
 * @property {boolean} [showInfo=false] - Show info panel
 * @property {boolean} [enableVR=false] - Enable VR support
 * @property {boolean} [enableMeasurement=false] - Enable measurement system
 * @property {string} [measurementTheme='dark'] - Measurement panel theme ('dark' or 'light')
 * @property {boolean} [showMeasurementLabels=false] - Show measurement labels in desktop mode (always shown in VR)
 * @property {boolean} [enableVRComfortGlyph=false] - Enable VR comfort settings glyph
 * @property {boolean} [enableDiveSystem=false] - Enable underwater dive system
 * @property {boolean} [enableFullscreen=false] - Show fullscreen toggle button
 * @property {boolean} [enableVRAudio=false] - Enable VR audio system (requires audio files)
 * @property {string} [audioPath='./sound/'] - Path to VR audio files
 * @property {Object} [viewerConfig] - Configuration passed to BelowViewer
 * @property {SceneConfig} [viewerConfig.scene] - Scene configuration
 * @property {CameraConfig} [viewerConfig.camera] - Camera configuration
 * @property {Object} [viewerConfig.renderer] - Renderer configuration
 * @property {string} [initialModel] - Key of model to load initially
 * @property {Object} [initialPositions] - Override initial positions for loaded model
 */

/**
 * ModelViewer - High-level 3D model viewer with automatic UI management
 * 
 * A complete 3D model viewer that handles multiple models with dropdown selection,
 * VR support, measurement tools, and underwater exploration features. This class
 * provides a simple API for creating production-ready 3D viewers with minimal setup.
 * 
 * @class ModelViewer
 * @extends EventSystem
 * 
 * @param {HTMLElement|string} container - DOM element or CSS selector for the viewer container
 * @param {ModelViewerOptions} [options={}] - Configuration options
 * 
 * @fires ModelViewer#model-loaded - Fired when a model is successfully loaded
 * @fires ModelViewer#model-load-error - Fired when model loading fails
 * @fires ModelViewer#focus - Fired when camera focuses on a point
 * @fires ModelViewer#camera-reset - Fired when camera is reset to initial position
 * @fires ModelViewer#vr-session-start - Fired when VR session begins
 * @fires ModelViewer#vr-session-end - Fired when VR session ends
 * 
 * @example
 * // Basic usage with single model
 * const viewer = new ModelViewer('#viewer-container', {
 *   models: {
 *     'wreck': {
 *       url: 'models/shipwreck.glb',
 *       name: 'Historic Shipwreck',
 *       credit: 'Maritime Museum'
 *     }
 *   },
 *   enableVR: true,
 *   enableMeasurement: true
 * });
 * 
 * @example
 * // Multiple models with custom positions
 * const viewer = new ModelViewer(document.getElementById('viewer'), {
 *   models: {
 *     'model1': {
 *       url: 'path/to/model1.glb',
 *       name: 'Model 1',
 *       initialPositions: {
 *         desktop: {
 *           camera: { x: 10, y: 5, z: 15 },
 *           target: { x: 0, y: 0, z: 0 }
 *         },
 *         vr: {
 *           dolly: { x: 0, y: 2, z: 10 },
 *           rotation: { x: 0, y: 0, z: 0 }
 *         }
 *       }
 *     },
 *     'model2': {
 *       url: 'path/to/model2.glb',
 *       name: 'Model 2'
 *     }
 *   },
 *   enableVR: true,
 *   enableMeasurement: true,
 *   enableDiveSystem: true,
 *   measurementTheme: 'light'
 * });
 * 
 * @since 1.0.0
 */
export class ModelViewer extends EventSystem {
  /**
   * Creates a new ModelViewer instance
   * 
   * @param {HTMLElement|string} container - DOM element or CSS selector for the viewer container
   * @param {ModelViewerOptions} [options={}] - Configuration options
   */
  constructor(container, options = {}) {
    super();
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }
    this.container = container || document.body;
    if (window.getComputedStyle(this.container).position === 'static') {
      this.container.style.position = 'relative';
    }

    const schema = {
      models: { type: 'object', default: {} },
      autoLoadFirst: { type: 'boolean', default: true },
      showLoadingIndicator: { type: 'boolean', default: true },
      showStatus: { type: 'boolean', default: true },
      showInfo: { type: 'boolean', default: false },
      enableVR: { type: 'boolean', default: false },
      enableMeasurement: { type: 'boolean', default: false },
      measurementTheme: { type: 'string', default: 'dark' },
      showMeasurementLabels: { type: 'boolean', default: false },
      enableVRComfortGlyph: { type: 'boolean', default: false },
      enableDiveSystem: { type: 'boolean', default: false },
      enableFullscreen: { type: 'boolean', default: false },
      enableVRAudio: { type: 'boolean', default: false },
      audioPath: { type: 'string', default: './sound/' },
      viewerConfig: {
        type: 'object',
        default: {
          scene: {
            background: { type: 'color', value: '#041729' }
          }
        }
      },
      initialModel: { type: 'string', default: null },
      initialPositions: { type: 'object', default: null }
    };

    this.config = new ConfigValidator(schema).validate(options);
    this.options = this.config; // for backward compatibility if something is missed
    
    this.currentModelKey = null;
    this.belowViewer = null;
    this.ui = {};
    this.measurementSystem = null;
    this.comfortGlyph = null;
    this.diveSystem = null;
    this.fullscreenButton = null;
    this.lastComfortMode = null;
    
    if (typeof window !== 'undefined') {
      window.modelViewer = this;
    }
    
    this.init();
  }
  
  init() {
    const viewerConfig = {
      ...this.config.viewerConfig,
      ...(this.config.enableVR && { vr: { enabled: true } }),
      ...(this.config.audioPath && { audioPath: this.config.audioPath }),
      ...(typeof this.config.enableVRAudio !== 'undefined' && { enableVRAudio: this.config.enableVRAudio }),
    };
    
    this.belowViewer = new BelowViewer(this.container, viewerConfig);

    this.setupEventForwarding();


    this.belowViewer.on('initialized', () => {
      this.setupFocusInteraction();
      this._maybeAttachMeasurementSystem();
      this._maybeAttachVRComfortGlyph();
      this._maybeAttachDiveSystem();
      this._maybeAttachFullscreenButton();
    });


    if (this.belowViewer.isInitialized) {
      this.setupFocusInteraction();
      this._maybeAttachMeasurementSystem();
      this._maybeAttachVRComfortGlyph();
      this._maybeAttachDiveSystem();
      this._maybeAttachFullscreenButton();
    }

    if (Object.keys(this.config.models).length > 0) {
      this.createUI();
      this.populateDropdown();


      if (this.config.autoLoadFirst) {
        const firstModelKey = Object.keys(this.config.models)[0];
        setTimeout(() => this.loadModel(firstModelKey), 100);
      }
    }
  }

  _maybeAttachMeasurementSystem() {
    if (!this.config.enableMeasurement || this.measurementSystem) return;
    this.measurementSystem = new MeasurementSystem({
      scene: this.belowViewer.sceneManager.scene,
      camera: this.belowViewer.cameraManager.camera,
      renderer: this.belowViewer.renderer,
      controls: this.belowViewer.cameraManager.controls,
      theme: this.config.measurementTheme,
      showMeasurementLabels: this.config.showMeasurementLabels
    });
    const update = () => this.measurementSystem && this.measurementSystem.update();
    if (this.belowViewer.onAfterRender) {
      this.belowViewer.onAfterRender(update);
    } else if (this.onAfterRender) {
      this.onAfterRender(update);
    } else {
      const loop = () => { update(); requestAnimationFrame(loop); };
      loop();
    }
    if (this.belowViewer.loadedModels && this.belowViewer.loadedModels.length > 0) {
      const modelRoot = this.belowViewer.loadedModels[0].model;
      this.measurementSystem.setRaycastTargets(modelRoot);
    }
  }

  async _maybeAttachVRComfortGlyph() {
    if (!this.config.enableVRComfortGlyph || this.comfortGlyph) return;
    if (!this.belowViewer.vrManager) return;
    if (!this.belowViewer.vrManager.vrCore) return;
    

    await this.belowViewer.vrManager.vrCore.checkVRSupported();
    

    if (!this.belowViewer.vrManager.vrCore.isVRSupported) return;
    
    this.comfortGlyph = new VRComfortGlyph(this.belowViewer.vrManager, {
      position: 'bottom-right',
      offsetX: 20,
      offsetY: 70
    });
    this.lastComfortMode = this.comfortGlyph.isComfortMode;
    this.comfortGlyph.element.addEventListener('vrcomfortchange', (event) => {
      this.lastComfortMode = event.detail.isComfortMode;
    });
    if (this.belowViewer.vrManager && this.belowViewer.vrManager.vrCore) {
      this.belowViewer.vrManager.vrCore.onSessionStart = () => {
        if (this.lastComfortMode !== null) {
          setTimeout(() => {
            if (this.lastComfortMode) {
              this.belowViewer.vrManager.setComfortPreset('max-comfort');
            } else {
              this.belowViewer.vrManager.setComfortPreset('performance');
            }
            this.comfortGlyph.setComfortMode(this.lastComfortMode);
          }, 50);
        }
      };
    }

    document.addEventListener('keydown', (event) => {
      if (event.code === 'KeyC' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        if (this.comfortGlyph) this.comfortGlyph.toggle();
      }
    });

    window.addEventListener('beforeunload', () => this.comfortGlyph && this.comfortGlyph.dispose());
  }

  _maybeAttachDiveSystem() {
    if (!this.config.enableDiveSystem || this.diveSystem) return;
    
    this.diveSystem = new DiveSystem(
      this.belowViewer.sceneManager.scene,
      this.belowViewer.renderer,
      this.belowViewer.cameraManager.camera
    );

    setTimeout(() => {
      this.diveSystem.initializeToggleSwitch();
    }, 100);


    const update = (deltaTime) => {
      if (this.diveSystem) {
        const currentTime = performance.now();
        this.diveSystem.update(currentTime, deltaTime);
        
        if (this.belowViewer.vrManager) {
          this.diveSystem.updateTorchFromVRManager(this.belowViewer.vrManager);
        }
        
        if (!this.belowViewer.renderer.xr.isPresenting) {
          this.diveSystem.torch.updateCameraPosition(this.belowViewer.cameraManager.camera);
        }
      }
    };

    if (this.belowViewer.onAfterRender) {
      this.belowViewer.onAfterRender(update);
    } else {

      this.belowViewer.on('before-render', update);
    }


    this.on('model-loaded', (data) => {
      if (this.diveSystem && data.model) {
        this.diveSystem.updateParticleBounds(data.model);
      }
    });

    if (typeof window !== 'undefined') {
      window.diveSystem = this.diveSystem;
    }

  }


  _maybeAttachFullscreenButton() {
    if (!this.config.enableFullscreen || this.fullscreenButton) return;

    const button = document.createElement('div');
    button.id = 'fullscreenButton';
    button.className = 'fullscreen-button';
    if (this.config.measurementTheme === 'light') {
      button.classList.add('light-theme');
    }
    if (!this.config.enableMeasurement) {
      button.classList.add('no-measurement');
    }
    button.textContent = '\u26F6';
    button.tabIndex = 0;
    button.title = 'Enter Fullscreen';
    button.setAttribute('aria-label', 'Enter Fullscreen');

    button.addEventListener('click', () => this.toggleFullscreen());
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleFullscreen();
      }
    });

    this.container.appendChild(button);
    this.fullscreenButton = button;
    this.ui.fullscreen = button;

    this._onFullscreenChange = () => this.updateFullscreenButton();
    document.addEventListener('fullscreenchange', this._onFullscreenChange);
    this.updateFullscreenButton();
  }

  toggleFullscreen() {
    if (this.isFullscreen()) {
      const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
      if (exit) exit.call(document);
      this.updateFullscreenButton();
    } else {
      const elem = this.container;
      const request = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.msRequestFullscreen;
      if (request) {
        request.call(elem).catch((err) => console.error('[ModelViewer] Failed to enter fullscreen', err));
      }
      this.updateFullscreenButton();
    }
  }

  isFullscreen() {
    const elem = this.container;
    return document.fullscreenElement === elem || document.webkitFullscreenElement === elem || document.msFullscreenElement === elem;
  }

  updateFullscreenButton() {
    if (!this.fullscreenButton) return;
    const active = this.isFullscreen();
    this.fullscreenButton.title = active ? 'Exit Fullscreen' : 'Enter Fullscreen';
    this.fullscreenButton.setAttribute('aria-label', active ? 'Exit Fullscreen' : 'Enter Fullscreen');
    this.fullscreenButton.textContent = active ? '\u26F6' : '\u26F6';
  }
  
  setupEventForwarding() {

    this.belowViewer.on('initialized', (data) => this.emit('initialized', data));
    this.belowViewer.on('model-load-start', (data) => this.emit('model-load-start', data));
    this.belowViewer.on('model-load-progress', (data) => {
      this.emit('model-load-progress', data);
      this.updateLoadingProgress(data);
    });
    this.belowViewer.on('model-loaded', (data) => {
      this.emit('model-loaded', data);
      this.emit('modelLoaded', data);
      this.onModelLoaded(data);
    });
    this.belowViewer.on('model-load-error', (data) => {
      this.emit('model-load-error', data);
      this.onModelLoadError(data);
    });
    this.belowViewer.on('model-load-cancelled', (data) => this.emit('model-load-cancelled', data));
    this.belowViewer.on('error', (data) => this.emit('error', data));
    

    this.belowViewer.on('vr-session-start', (data) => {
      this.emit('vr-session-start', data);
      this.onVRSessionStart();
    });
    this.belowViewer.on('vr-session-end', (data) => {
      this.emit('vr-session-end', data);
      this.onVRSessionEnd();
    });
    this.belowViewer.on('vr-mode-toggle', (data) => {
      this.emit('vr-mode-toggle', data);
      this.onVRModeToggle();
    });
    this.belowViewer.on('vr-movement-start', (data) => this.emit('vr-movement-start', data));
    this.belowViewer.on('vr-movement-stop', (data) => this.emit('vr-movement-stop', data));
    this.belowViewer.on('vr-movement-update', (data) => this.emit('vr-movement-update', data));
  }


  onVRSessionStart() {

    if (this.ui.info) {
      this.ui.info.style.display = 'none';
    }
    if (this.ui.selector) {
      this.ui.selector.style.pointerEvents = 'none';
      this.ui.selector.style.opacity = '0.5';
    }


    if (this.measurementSystem && typeof this.measurementSystem.attachVR === 'function') {

      setTimeout(() => {

        const renderer = this.belowViewer?.renderer;
        if (renderer && renderer.xr && typeof renderer.xr.getController === 'function') {
          const controller1 = renderer.xr.getController(0);
          const controller2 = renderer.xr.getController(1);
          const controllerGrip1 = renderer.xr.getControllerGrip ? renderer.xr.getControllerGrip(0) : undefined;
          const controllerGrip2 = renderer.xr.getControllerGrip ? renderer.xr.getControllerGrip(1) : undefined;

          this.measurementSystem.attachVR({ controller1, controller2, controllerGrip1, controllerGrip2 });

          this.measurementSystem.resetGhostSpherePositions();
        }
      }, 100); // 100ms delay to ensure controllers are ready
    }

  }

  onVRSessionEnd() {

    if (this.ui.info && this.config.showInfo) {
      this.ui.info.style.display = 'block';
    }
    if (this.ui.selector) {
      this.ui.selector.style.pointerEvents = 'auto';
      this.ui.selector.style.opacity = '1';
    }
    

    if (this.measurementSystem) {

      this.measurementSystem.controller1 = null;
      this.measurementSystem.controller2 = null;
      this.measurementSystem.controllerGrip1 = null;
      this.measurementSystem.controllerGrip2 = null;
      this.measurementSystem.isVR = false;
      

      if (this.measurementSystem.ghostSpheres) {
        if (this.measurementSystem.ghostSpheres.left) {
          this.measurementSystem.ghostSpheres.left.visible = false;
        }
        if (this.measurementSystem.ghostSpheres.right) {
          this.measurementSystem.ghostSpheres.right.visible = false;
        }
      }
    }
  }

  onVRModeToggle() {

  }
   setupFocusInteraction() {
    const domElement = this.belowViewer.renderer.domElement;


    const DOUBLE_CLICK_TIME = 300;
    let lastClickTime = 0;
    let isDragging = false;
    let dragStartPosition = { x: 0, y: 0 };
    const DRAG_THRESHOLD = 5;

    const onMouseDown = (event) => {
      isDragging = false;
      dragStartPosition.x = event.clientX;
      dragStartPosition.y = event.clientY;
    };

    const onMouseMove = (event) => {
      if (!isDragging) {
        const deltaX = Math.abs(event.clientX - dragStartPosition.x);
        const deltaY = Math.abs(event.clientY - dragStartPosition.y);
        
        if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
          isDragging = true;
        }
      }
    };

    const onMouseUp = () => {
      setTimeout(() => {
        isDragging = false;
      }, 10);
    };

    const onMouseClick = (event) => {
      const currentTime = Date.now();
      const isDoubleClick = currentTime - lastClickTime < DOUBLE_CLICK_TIME;
      lastClickTime = currentTime;
      
      if (this.belowViewer.renderer.xr?.isPresenting || isDragging) return;
      
      if (isDoubleClick) {
        this.focusOnPoint(event);
      }
    };

    domElement.addEventListener('mousedown', onMouseDown);
    domElement.addEventListener('mousemove', onMouseMove);
    domElement.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('click', onMouseClick);

    this.focusEventHandlers = {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseClick
    };
  }
   focusOnPoint(event) {
    const canvas = this.belowViewer.renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    const mouse = {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((event.clientY - rect.top) / rect.height) * 2 + 1
    };

    const raycaster = new THREE.Raycaster();
    const camera = this.belowViewer.cameraManager.getCamera();
    raycaster.setFromCamera(mouse, camera);

    let raycastTargets = [];
    
    if (this.measurementSystem && this.measurementSystem._raycastTargets && this.measurementSystem._raycastTargets.length > 0) {
      raycastTargets = this.measurementSystem._raycastTargets;
    } else {
      const scene = this.belowViewer.sceneManager.getScene();
      raycastTargets = [];
      scene.traverse(child => {
        if (child.isMesh && child.geometry && !this.isMeasurementHelper(child)) {
          raycastTargets.push(child);
        }
      });
    }
    
    if (raycastTargets.length === 0) {
      return;
    }

    const intersects = raycaster.intersectObjects(raycastTargets, true);
    
    if (intersects.length > 0) {
      const point = intersects[0].point;
      this.belowViewer.cameraManager.focusOn(point);
      this.emit('focus', { point, intersect: intersects[0] });
    }
  }


  isMeasurementHelper(obj) {
    if (!obj) return false;
    

    if (obj.userData.isMeasurementSphere || obj.userData.isMeasurementLine) return true;
    

    if (obj.type === 'Line2' || obj.type === 'Line') return true;
    

    if (obj.geometry) {
      const helperGeometries = ['RingGeometry', 'TubeGeometry', 'PlaneGeometry', 'CircleGeometry', 'SphereGeometry'];
      if (helperGeometries.includes(obj.geometry.type)) {

        if (obj.geometry.type === 'SphereGeometry') {
          const sphere = obj.geometry;
          if (sphere.parameters && sphere.parameters.radius < 0.1) return true;
        } else {
          return true;
        }
      }
    }
    

    if (typeof obj.name === 'string' && 
        (obj.name.startsWith('MeasurementHelper') || 
         obj.name.includes('measurement') || 
         obj.name.includes('ghost'))) {
      return true;
    }
    
    return false;
  }
  
  createUI() {

    if (this.container === document.body) {
      document.documentElement.classList.add('below-viewer');
    } else {
      this.container.classList.add('below-viewer-container');
    }


    const modelCount = Object.keys(this.config.models).length;
    if (modelCount > 1 && !this.ui.dropdown) {
      this.createModelSelector();
    }


    if (this.config.showInfo && !this.ui.info) {
      this.createInfoPanel();
    }


    if (this.config.showLoadingIndicator && !this.ui.loading) {
      this.createLoadingIndicator();
    }


    if (this.config.showStatus && !this.ui.status) {
      this.createStatusIndicator();
    }
    

    if (this.ui.dropdown) {
      this.ui.dropdown.addEventListener('change', (event) => {
        if (event.target.value) {
          this.loadModel(event.target.value);
        }
      });
    }
  }
  
  createModelSelector() {
    const parent = this.container;


    const existing = parent.querySelector('.model-selector');
    if (existing && existing.parentElement) {
      existing.remove();
    }

    const selectorContainer = document.createElement('div');
    selectorContainer.className = 'model-selector below-panel';
    parent.appendChild(selectorContainer);

    const dropdown = document.createElement('select');
    dropdown.className = 'model-selector__dropdown';
    selectorContainer.appendChild(dropdown);

    if (this.config.enableDiveSystem) {
      const toggleContainer = document.createElement('div');
      toggleContainer.id = 'modeToggleContainer';

      const toggle = document.createElement('div');
      toggle.className = 'semantic-toggle';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = 'modeToggleSwitch';
      checkbox.className = 'mode-toggle__switch';
      toggle.appendChild(checkbox);

      const slider = document.createElement('div');
      slider.className = 'toggle-slider-bg';
      toggle.appendChild(slider);

      const left = document.createElement('div');
      left.className = 'toggle-option left';
      const leftIcon = document.createElement('div');
      leftIcon.className = 'toggle-icon';
      leftIcon.textContent = '\uD83D\uDCCB';
      const leftText = document.createElement('div');
      leftText.className = 'toggle-text';
      leftText.textContent = 'Survey';
      left.appendChild(leftIcon);
      left.appendChild(leftText);

      const right = document.createElement('div');
      right.className = 'toggle-option right';
      const rightIcon = document.createElement('div');
      rightIcon.className = 'toggle-icon';
      rightIcon.textContent = '\uD83C\uDF0A';
      const rightText = document.createElement('div');
      rightText.className = 'toggle-text';
      rightText.textContent = 'Dive';
      right.appendChild(rightIcon);
      right.appendChild(rightText);

      toggle.appendChild(left);
      toggle.appendChild(right);
      toggleContainer.appendChild(toggle);
      selectorContainer.appendChild(toggleContainer);
    }

    this.ui.dropdown = dropdown;
    this.ui.selector = selectorContainer;
  }
  
  createLoadingIndicator() {
    const loading = document.createElement('div');
  loading.className = 'loading-indicator below-loading';
    loading.textContent = 'Loading...';
    loading.style.display = 'none';
    this.container.appendChild(loading);
    this.ui.loading = loading;
  }
  
  createStatusIndicator() {
    const status = document.createElement('div');
    status.id = 'status';
    status.className = 'status below-status';
    status.style.display = 'none';
    this.container.appendChild(status);
    this.ui.status = status;
  }
  
  createInfoPanel() {
    const info = document.createElement('div');
    info.id = 'info';
    info.className = 'below-panel';
    
    const title = document.createElement('div');
    title.id = 'infoTitle';
    title.textContent = 'BelowJS';
    
    const controls = document.createElement('div');
    controls.id = 'infoControls';
    controls.innerHTML = `
      <strong>Desktop:</strong> Drag to rotate • Scroll to zoom<br>
      <strong>Mobile:</strong> Touch and drag to explore
    `;
    
    info.appendChild(title);
    info.appendChild(controls);
    this.container.appendChild(info);

    this.ui.info = info;
  }
  
  populateDropdown() {
    if (!this.ui.dropdown) return;  // No dropdown if only one model
    
    this.ui.dropdown.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a Model';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    this.ui.dropdown.appendChild(defaultOption);
    
    Object.entries(this.config.models).forEach(([key, model]) => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = model.name || key;
      this.ui.dropdown.appendChild(option);
    });
  }
  
  /**
   * Load a model by its key
   * 
   * @async
   * @method loadModel
   * @param {string} modelKey - The key of the model to load (must exist in config.models)
   * @returns {Promise<void>} Promise that resolves when model loading is complete
   * 
   * @fires ModelViewer#model-loaded - When model loads successfully
   * @fires ModelViewer#model-load-error - When model loading fails
   * 
   * @example
   * // Load a specific model
   * await viewer.loadModel('shipwreck');
   * 
   * @since 1.0.0
   */
  async loadModel(modelKey) {
    const modelConfig = this.config.models[modelKey];
    if (!modelConfig) {
      console.error('Model not found:', modelKey);
      return;
    }
    this.currentModelKey = modelKey;

    if (this.ui.dropdown) {
      this.ui.dropdown.value = modelKey;
    }

    this.showLoading(`Loading ${modelConfig.name || modelKey}...`);

    document.title = `BelowJS – ${modelConfig.name || modelKey}`;
    try {

      if (this.measurementSystem) {
        this.measurementSystem.clearUnifiedMeasurement();
        this.measurementSystem.clearLegacyVRMeasurement();
        this.measurementSystem.clearLegacyDesktopMeasurement();
      }

      this.belowViewer.clearModels();

      await new Promise(resolve => setTimeout(resolve, 50));

      const model = await this.belowViewer.loadModel(modelConfig.url, {
        autoFrame: false,  // We'll handle positioning manually
        initialPositions: modelConfig.initialPositions  // Pass VR/desktop positions
      });
      if (model) {

        this.applyInitialPositions(modelConfig, model);

        this.hideLoading();
        this.updateStatus(`Loaded: ${modelConfig.name || modelKey}`);

        if (this.measurementSystem) {
          this.measurementSystem.setRaycastTargets(model);
        }
        

        this.modelReady = true;
        this.emit('model-switched', { modelKey, model, config: modelConfig });
        this.emit('modelLoaded', { modelKey, model, config: modelConfig });
      }
    } catch (error) {
      if (error.message !== 'Loading cancelled') {
        console.error('Failed to load model:', error);
        this.hideLoading();
        this.updateStatus(`Error loading ${modelConfig.name || modelKey}`);
        

        if (this.measurementSystem) {
          this.measurementSystem.setRaycastTargets([]);
        }
      }
    }
  }
  
  applyInitialPositions(modelConfig, model) {
    const positions = modelConfig.initialPositions;
    if (!positions) return;

    const isVRMode = this.belowViewer.isVRPresenting();

    if (isVRMode && positions.vr) {

      const dolly = this.belowViewer.getCamera().parent;
      if (dolly) {
        dolly.position.set(
          positions.vr.dolly.x,
          positions.vr.dolly.y,
          positions.vr.dolly.z
        );
        dolly.rotation.set(
          positions.vr.rotation.x,
          positions.vr.rotation.y,
          positions.vr.rotation.z
        );
      }
    } else if (!isVRMode && positions.desktop) {

      const camera = this.belowViewer.getCamera();
      const controls = this.belowViewer.cameraManager.controls;
      if (camera && controls) {
        camera.position.set(
          positions.desktop.camera.x,
          positions.desktop.camera.y,
          positions.desktop.camera.z
        );
        controls.target.set(
          positions.desktop.target.x,
          positions.desktop.target.y,
          positions.desktop.target.z
        );
        controls.update();
      }
    }
  }
  
  showLoading(message = 'Loading...') {
    if (this.ui.loading) {
      this.ui.loading.textContent = message;
      this.ui.loading.style.display = 'block';
    }
  }
  
  hideLoading() {
    if (this.ui.loading) {
      this.ui.loading.style.display = 'none';
    }
  }
  
  updateStatus(message) {
    if (this.ui.status) {
      this.ui.status.textContent = message;
      this.ui.status.style.display = 'block';
    }
  }
  
  updateLoadingProgress({ progress }) {
    if (progress.lengthComputable && this.currentModelKey) {
      const modelConfig = this.config.models[this.currentModelKey];
      const percent = Math.round((progress.loaded / progress.total) * 100);
      this.showLoading(`Loading ${modelConfig?.name || 'model'}: ${percent}%`);
    }
  }
  
  onModelLoaded({ model }) {
    if (this.measurementSystem) {
      this.measurementSystem.setRaycastTargets(model);
    }
  }
  
  onModelLoadError({ error }) {
    this.hideLoading();
    this.updateStatus(`Failed to load model: ${error.message}`);
  }
  
  /**
   * Get the currently loaded model object
   * 
   * @method getCurrentModel
   * @returns {THREE.Object3D|null} The current Three.js model object or null if none loaded
   * 
   * @example
   * const model = viewer.getCurrentModel();
   * if (model) {
   *   // Inspect model properties and children
   * }
   * 
   * @since 1.0.0
   */
  getCurrentModel() {
    return this.belowViewer ? this.belowViewer.getCurrentModel() : null;
  }
  
  /**
   * Get the Three.js camera instance
   * 
   * @method getCamera
   * @returns {THREE.PerspectiveCamera|null} The Three.js camera or null if not initialized
   * 
   * @example
   * const camera = viewer.getCamera();
   * if (camera) {
   *   // Access camera.position, camera.rotation, etc.
   * }
   * 
   * @since 1.0.0
   */
  getCamera() {
    return this.belowViewer ? this.belowViewer.getCamera() : null;
  }
  
  /**
   * Get the Three.js scene instance
   * 
   * @method getScene
   * @returns {THREE.Scene|null} The Three.js scene or null if not initialized
   * 
   * @example
   * // Add custom objects to the scene
   * const scene = viewer.getScene();
   * if (scene) {
   *   scene.add(myCustomObject);
   * }
   * 
   * @since 1.0.0
   */
  getScene() {
    return this.belowViewer ? this.belowViewer.sceneManager.scene : null;
  }
  
  /**
   * Focus the camera on a specific 3D point
   * 
   * @method focusOn
   * @param {Object} point - 3D point to focus on
   * @param {number} point.x - X coordinate
   * @param {number} point.y - Y coordinate  
   * @param {number} point.z - Z coordinate
   * @param {number} [distance=null] - Distance from the point (uses default if null)
   * 
   * @fires ModelViewer#focus - When camera focus changes
   * 
   * @example
   * // Focus on a specific point
   * viewer.focusOn({ x: 10, y: 5, z: 0 }, 15);
   * 
   * @since 1.0.0
   */
  focusOn(point, distance = null) {
    if (this.belowViewer?.cameraManager) {
      this.belowViewer.cameraManager.focusOn(point, distance);
      this.emit('focus', { point, distance });
    }
  }
  
  /**
   * Reset camera to the initial position for the current model
   * 
   * @method resetCamera
   * @returns {void}
   * 
   * @fires ModelViewer#camera-reset - When camera is reset
   * 
   * @example
   * // Reset camera to initial view
   * viewer.resetCamera();
   * 
   * @since 1.0.0
   */
  resetCamera() {
    if (this.currentModelKey && this.belowViewer) {
      const modelConfig = this.config.models[this.currentModelKey];
      const initialPos = modelConfig?.initialPositions?.desktop;
      
      if (initialPos) {
        const camera = this.belowViewer.cameraManager.getCamera();
        const controls = this.belowViewer.cameraManager.getControls();
        
        if (initialPos.camera) {
          camera.position.set(initialPos.camera.x, initialPos.camera.y, initialPos.camera.z);
        }
        if (initialPos.target && controls) {
          controls.target.set(initialPos.target.x, initialPos.target.y, initialPos.target.z);
          controls.update();
        }
        
        this.emit('camera-reset', { modelKey: this.currentModelKey, position: initialPos });
      }
    }
  }
  

  /**
   * Set VR comfort settings for motion sickness reduction
   * 
   * @method setVRComfortSettings
   * @param {Object} settings - VR comfort configuration
   * @param {boolean} [settings.enableComfort=true] - Enable comfort features
   * @param {number} [settings.comfortRadius=0.3] - Radius of comfort zone
   * @param {number} [settings.fadeDistance=0.1] - Distance for fade effect
   * @returns {void}
   * 
   * @example
   * // Configure VR comfort settings
   * viewer.setVRComfortSettings({
   *   enableComfort: true,
   *   comfortRadius: 0.4,
   *   fadeDistance: 0.15
   * });
   * 
   * @since 1.0.0
   */
  setVRComfortSettings(settings) {
    if (this.belowViewer && this.belowViewer.setVRComfortSettings) {
      return this.belowViewer.setVRComfortSettings(settings);
    }
  }
  
  setVRComfortPreset(preset) {
    if (this.belowViewer && this.belowViewer.setVRComfortPreset) {
      return this.belowViewer.setVRComfortPreset(preset);
    }
  }
  
  /**
   * Get current VR comfort settings
   * 
   * @method getVRComfortSettings
   * @returns {Object|null} Current VR comfort settings or null if not available
   * 
   * @example
   * const settings = viewer.getVRComfortSettings();
   * // Check settings?.enableComfort
   * 
   * @since 1.0.0
   */
  getVRComfortSettings() {
    if (this.belowViewer && this.belowViewer.getVRComfortSettings) {
      return this.belowViewer.getVRComfortSettings();
    }
    return null;
  }
  
  /**
   * Clean up and dispose of all resources
   * 
   * Call this method when you're done with the ModelViewer to free up memory
   * and remove event listeners. The viewer will not be usable after disposal.
   * 
   * @method dispose
   * @returns {void}
   * 
   * @example
   * // Clean up when done
   * viewer.dispose();
   * 
   * @since 1.0.0
   */
  dispose() {
    if (typeof window !== 'undefined' && window.modelViewer === this) {
      window.modelViewer = null;
    }
    if (this.focusEventHandlers && this.belowViewer?.renderer?.domElement) {
      const domElement = this.belowViewer.renderer.domElement;
      domElement.removeEventListener('mousedown', this.focusEventHandlers.onMouseDown);
      domElement.removeEventListener('mousemove', this.focusEventHandlers.onMouseMove);
      domElement.removeEventListener('mouseup', this.focusEventHandlers.onMouseUp);
      domElement.removeEventListener('click', this.focusEventHandlers.onMouseClick);
      this.focusEventHandlers = null;
    }
    if (this.measurementSystem) {
      this.measurementSystem.dispose();
      this.measurementSystem = null;
    }
    if (this.comfortGlyph) {
      this.comfortGlyph.dispose();
      this.comfortGlyph = null;
    }
    if (this.diveSystem) {
      this.diveSystem.dispose();
      this.diveSystem = null;
      if (typeof window !== 'undefined' && window.diveSystem === this.diveSystem) {
        window.diveSystem = null;
      }
    }
    if (this.fullscreenButton) {
      this.fullscreenButton.remove();
      this.fullscreenButton = null;
      document.removeEventListener('fullscreenchange', this._onFullscreenChange);
    }
    if (this.belowViewer) {
      this.belowViewer.dispose();
    }
    this.removeAllListeners();
  }
}
