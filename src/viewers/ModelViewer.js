import * as THREE from 'three';
import { ConfigValidator } from '../utils/ConfigValidator.js';
import { BelowViewer } from '../core/BelowViewer.js';
import { EventSystem } from '../utils/EventSystem.js';
import { MeasurementSystem } from '../measurement/MeasurementSystem.js';
import { VRComfortGlyph } from '../vr/ui/VRComfortGlyph.js';
import { DiveSystem } from '../dive/DiveSystem.js';
import { FlyControls } from '../core/FlyControls.js';

/**
 * @typedef {Object} ModelConfig
 * @property {string} url - Path to the GLB model file
 * @property {string} [type='gltf'] - Model type ('gltf' or 'tileset')
 * @property {string} name - Display name for the model
 * @property {string} [credit] - Attribution text for the model
 * @property {boolean} [measurable=true] - Whether this model can use the measurement system
 * @property {number} [errorTarget] - Tileset SSE target for streaming refinement
 * @property {number} [maxDepth] - Tileset traversal depth limit
 * @property {boolean} [loadSiblings] - Load sibling tiles for smoother refinement
 * @property {boolean} [optimizedLoadStrategy] - Prioritize closer tiles over SSE error
 * @property {number} [maxTilesProcessed] - Tiles processed per frame for streaming tilesets
 * @property {Object} [fetchOptions] - Fetch options for tileset network requests
 * @property {string} [up='+Y'] - Up-axis hint for tilesets ('+Y', '+Z', '-Z', '+X', '-X', '-Y')
 * @property {boolean|string} [geospatialReorientation='auto'] - Auto-level geospatial tilesets ('auto' | 'force' | false)
 * @property {boolean} [autoCenter=true] - Recenter streamed tilesets around origin as bounds become available
 * @property {number} [maxTriangles] - Approximate triangle budget for adaptive LOD (best-effort)
 * @property {number} [minErrorTarget=2] - Lower clamp for adaptive errorTarget when maxTriangles is set
 * @property {number} [maxErrorTarget=64] - Upper clamp for adaptive errorTarget when maxTriangles is set
 * @property {boolean} [enableGltfExtensions=true] - Enable GLTFExtensionsPlugin (DRACO/KTX2/RTC) for tilesets
 * @property {string} [dracoDecoderPath] - Optional DRACO decoder path for GLTFExtensionsPlugin
 * @property {string} [ktx2TranscoderPath] - Optional KTX2 transcoder path for GLTFExtensionsPlugin
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
 * @property {boolean} [enableScreenshot=false] - Show screenshot button
 * @property {boolean} [enableFlyControls=true] - Enable keyboard/mouse fly mode (pointer lock)
 * @property {Object} [flyControls] - Fly controls configuration
 * @property {number} [flyControls.baseSpeed=6] - Base fly movement speed
 * @property {number} [flyControls.boostSpeed=20] - Boosted fly speed (shift held)
 * @property {number} [flyControls.speedScale=100] - Reference size for speed scaling
 * @property {number} [flyControls.mouseSensitivity=0.002] - Mouse sensitivity for fly mode
 * @property {number} [flyControls.keyboardYawRate=0.34] - Keyboard yaw speed for J/L in fly mode
 * @property {number} [flyControls.keyboardBoostYawRate=0.95] - Shift keyboard yaw speed for J/L in fly mode
 * @property {number} [flyControls.keyboardSlowYawMultiplier=0.53] - Slow-mode multiplier for J/L yaw speed
 * @property {number} [flyControls.keyboardPitchRate=0.2] - Keyboard pitch speed for U/O in fly mode
 * @property {number} [flyControls.keyboardPitchBoostMultiplier=2.0] - Shift multiplier for U/O pitch speed
 * @property {number} [flyControls.pitchReturnRate=0.35] - Pitch return speed when K is held
 * @property {number} [flyControls.slowSpeedMultiplier=0.2] - Slow-mode multiplier for base movement
 * @property {number} [flyControls.slowBoostMultiplier=0.3333333333333333] - Slow-mode multiplier for boosted movement
 * @property {boolean} [flyControls.clickToExit=true] - Exit fly mode on click
 * @property {boolean} [enableVRAudio=false] - Enable VR audio system (requires audio files)
 * @property {string} [audioPath='./sound/'] - Path to VR audio files
 * @property {string} [assetBasePath] - Base path for offline decoder/transcoder/WebXR assets
 * @property {string} [dracoDecoderPath] - DRACO decoder path for GLB and tileset loading
 * @property {string} [ktx2TranscoderPath] - KTX2/Basis transcoder path for GLB and tileset loading
 * @property {string} [webxrInputProfilesPath] - WebXR input profiles path for controller models
 * @property {Object} [viewerConfig] - Configuration passed to BelowViewer
 * @property {SceneConfig} [viewerConfig.scene] - Scene configuration
 * @property {CameraConfig} [viewerConfig.camera] - Camera configuration
 * @property {Object} [viewerConfig.renderer] - Renderer configuration
 * @property {Object} [viewerConfig.stereo] - Stereo rendering configuration
 * @property {boolean} [enableAutoRecovery=true] - Retry loading when tab focus/context interruptions leave the viewer blank
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
 * @fires ModelViewer#fly-mode-change - Fired when fly mode is toggled
 * 
 * @example
 * // Basic usage with single model
 * const viewer = new ModelViewer('#viewer-container', {
 *   models: {
 *     'wreck': {
 *       url: 'models/shipwreck.glb',
 *       name: 'Historic Shipwreck',
 *       credit: 'Maritime Museum',
 *       measurable: true
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
 *       name: 'Model 2',
 *       measurable: false
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
  static _isEditableTarget(target) {
    if (!(target instanceof HTMLElement)) return false;
    const tag = target.tagName;
    return tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || target.isContentEditable;
  }

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
      showStatus: { type: 'boolean', default: false },
      showInfo: { type: 'boolean', default: false },
      enableVR: { type: 'boolean', default: false },
      enableAR: { type: 'boolean', default: false },
      enableMeasurement: { type: 'boolean', default: true },
      measurementTheme: { type: 'string', default: 'dark' },
      showMeasurementLabels: { type: 'boolean', default: false },
      enableVRComfortGlyph: { type: 'boolean', default: false },
      enableDiveSystem: { type: 'boolean', default: true },
      showDiveToggle: { type: 'boolean', default: true },
      enableFullscreen: { type: 'boolean', default: false },
      enableScreenshot: { type: 'boolean', default: false },
      enableFlyControls: { type: 'boolean', default: true },
      flyControls: { type: 'object', default: {} },
      enableVRAudio: { type: 'boolean', default: false },
      audioPath: { type: 'string', default: './sound/' },
      assetBasePath: { type: 'string', default: null },
      dracoDecoderPath: { type: 'string', default: null },
      ktx2TranscoderPath: { type: 'string', default: null },
      webxrInputProfilesPath: { type: 'string', default: null },
      enableAutoRecovery: { type: 'boolean', default: true },
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
    this.uiRoot = null;
    this.stereoUiMirror = null;
    this.stereoUiObserver = null;
    this.stereoUiSyncQueued = false;
    this.stereoUiActive = false;
    this.measurementSystem = null;
    this.comfortGlyph = null;
    this.diveSystem = null;
    this.fullscreenButton = null;
    this.screenshotButton = null;
    this.flyControls = null;
    this.lastComfortMode = null;
    this._vrButtonWasVisible = false;
    
    // VR loading state
    this.isLoading = false;
    this.loadingMessage = '';
    this.loadingModelName = '';
    this.loadingPercentage = 0;
    this.lastManualLoadingMessage = '';
    this.stageOverrideActive = false;
    this.vrUpdateLoop = null;

    // Recovery state for focus/context interruptions
    this.lastRequestedModelKey = null;
    this.recoveryHandlers = null;
    this.recoveryTimer = null;
    this.recoveryCooldownMs = 1200;
    this.lastRecoveryAttemptAt = 0;
    this.recoveryAttempts = 0;
    this.maxRecoveryAttempts = 3;
    this.hadContextLoss = false;
    this.isDisposed = false;
    
    if (typeof window !== 'undefined') {
      window.modelViewer = this;
    }
    
    this.init();
  }
  
  init() {
    const viewerConfig = {
      ...this.config.viewerConfig,
      // Enable VR only if AR is not enabled
      ...(this.config.enableVR && !this.config.enableAR && { vr: { enabled: true } }),
      // Enable AR if requested
      ...(this.config.enableAR && { ar: { enabled: true, ...(this.config.viewerConfig?.ar || {}) } }),
      // Explicitly disable VR when AR is enabled
      ...(this.config.enableAR && { vr: { enabled: false } }),
      ...(this.config.audioPath && { audioPath: this.config.audioPath }),
      ...(typeof this.config.enableVRAudio !== 'undefined' && { enableVRAudio: this.config.enableVRAudio }),
      ...(this.config.assetBasePath && { assetBasePath: this.config.assetBasePath }),
      ...(this.config.dracoDecoderPath && { dracoDecoderPath: this.config.dracoDecoderPath }),
      ...(this.config.ktx2TranscoderPath && { ktx2TranscoderPath: this.config.ktx2TranscoderPath }),
      ...(this.config.webxrInputProfilesPath && { webxrInputProfilesPath: this.config.webxrInputProfilesPath })
    };

    this.belowViewer = new BelowViewer(this.container, viewerConfig);

    this.setupEventForwarding();
    this.setupRecoveryHandlers();


    this.belowViewer.on('initialized', () => {
      this.setupRecoveryHandlers();
      this.setupFocusInteraction();
      this._maybeAttachMeasurementSystem();
      this._maybeAttachVRComfortGlyph();
      this._maybeAttachDiveSystem();
      this._maybeAttachScreenshotButton();
      this._maybeAttachFullscreenButton();
      this._maybeAttachFlyControls();
    });


    if (this.belowViewer.isInitialized) {
      this.setupRecoveryHandlers();
      this.setupFocusInteraction();
      this._maybeAttachMeasurementSystem();
      this._maybeAttachVRComfortGlyph();
      this._maybeAttachDiveSystem();
      this._maybeAttachScreenshotButton();
      this._maybeAttachFullscreenButton();
      this._maybeAttachFlyControls();
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
      uiParent: this.getUiContainer(),
      getRaycastInfo: (event) => this.getPointerRaycastInfo(event),
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
      const modelConfig = this.currentModelKey ? this.config.models[this.currentModelKey] : null;
      this.applyModelMeasurementConfig(modelConfig, modelRoot);
    }
  }

  isModelMeasurable(modelConfig) {
    return !modelConfig || modelConfig.measurable !== false;
  }

  applyModelMeasurementConfig(modelConfig, model = null) {
    if (!this.measurementSystem) return;

    const measurable = this.isModelMeasurable(modelConfig);
    if (typeof this.measurementSystem.setMeasurementAvailability === 'function') {
      this.measurementSystem.setMeasurementAvailability(measurable);
    } else {
      this.measurementSystem.clearUnifiedMeasurement();
      this.measurementSystem.clearLegacyVRMeasurement();
      this.measurementSystem.clearLegacyDesktopMeasurement();
      this.measurementSystem.desktopMeasurementMode = false;
      this.measurementSystem.measurementSystemEnabled = measurable;
      this.measurementSystem.updateMeasurementPanel();
    }

    if (this.measurementSystem.ghostSpheres) {
      const showGhostSpheres = measurable && this.measurementSystem.isVR;
      if (this.measurementSystem.ghostSpheres.left) {
        this.measurementSystem.ghostSpheres.left.visible = showGhostSpheres;
      }
      if (this.measurementSystem.ghostSpheres.right) {
        this.measurementSystem.ghostSpheres.right.visible = showGhostSpheres;
      }
    }

    if (measurable && model) {
      this.measurementSystem.setRaycastTargets(model);
      return;
    }
    this.measurementSystem.setRaycastTargets([]);
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

    const settings = this.belowViewer.getVRComfortSettings ? this.belowViewer.getVRComfortSettings() : null;
    const fallbackMode = settings
      ? settings.locomotionMode === 'teleport' && settings.reducedMotion === true
      : false;
    const initialComfortMode = typeof this.lastComfortMode === 'boolean'
      ? this.lastComfortMode
      : fallbackMode;
    this.lastComfortMode = initialComfortMode;
    this.comfortGlyph.setComfortMode(initialComfortMode, {
      emitEvent: false,
      applyToManager: false
    });

    this.comfortGlyph.element.addEventListener('vrcomfortchange', (event) => {
      this.lastComfortMode = event.detail.isComfortMode;
    });
    if (this.belowViewer.vrManager) {
      const originalComfortChange = this.belowViewer.vrManager.onComfortModeChange;
      this.belowViewer.vrManager.onComfortModeChange = (data) => {
        if (originalComfortChange) {
          originalComfortChange(data);
        }
        const enabled = data && typeof data.enabled === 'boolean'
          ? data.enabled
          : this.belowViewer.vrManager.isComfortModeEnabled();
        this.lastComfortMode = enabled;
        if (this.comfortGlyph) {
          this.comfortGlyph.setComfortMode(enabled, {
            emitEvent: false,
            applyToManager: false
          });
        }
        this.emit('comfort-mode-change', {
          enabled,
          inVR: this.belowViewer.vrManager.isVRPresenting,
          preset: enabled ? 'comfort' : 'free'
        });
      };
    }
    if (this.belowViewer.vrManager && this.belowViewer.vrManager.vrCore) {
      // Chain with existing onSessionStart callback instead of replacing it
      const originalCallback = this.belowViewer.vrManager.vrCore.onSessionStart;
      this.belowViewer.vrManager.vrCore.onSessionStart = async () => {
        // Call original VRManager callback first (for audio initialization)
        if (originalCallback) {
          await originalCallback();
        }
        // Then handle comfort glyph
        if (this.lastComfortMode !== null) {
          setTimeout(() => {
            if (this.lastComfortMode) {
              this.belowViewer.vrManager.setComfortPreset('comfort');
            } else {
              this.belowViewer.vrManager.setComfortPreset('free');
            }
            this.comfortGlyph.setComfortMode(this.lastComfortMode, {
              emitEvent: false,
              applyToManager: false
            });
          }, 50);
        }
      };
    }

    document.addEventListener('keydown', (event) => {
      if (ModelViewer._isEditableTarget(event.target)) return;
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

    document.addEventListener('keydown', (event) => {
      if (ModelViewer._isEditableTarget(event.target)) return;
      if (event.code === 'KeyZ' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        if (this.belowViewer?.arManager?.isActive?.()) {
          return;
        }
        event.preventDefault();
        if (this.diveSystem) this.diveSystem.toggleDiveMode();
      }
      if (event.code === 'KeyH' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        this.takeScreenshot();
      }
    });


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

    this.belowViewer.on('ar-session-start', () => {
      if (this.diveSystem) {
        this.diveSystem.setDiveMode(false);
      }
    });


    this.on('model-loaded', (data) => {
      if (this.diveSystem && data.model) {
        this.diveSystem.updateParticleBounds(data.model);
      }
    });

    if (typeof window !== 'undefined') {
      window.diveSystem = this.diveSystem;
    }

  }


  _maybeAttachScreenshotButton() {
    if (!this.config.enableScreenshot || this.screenshotButton) return;

    const button = document.createElement('div');
    button.id = 'screenshotButton';
    button.className = 'screenshot-button';
    if (this.config.measurementTheme === 'light') {
      button.classList.add('light-theme');
    }
    if (!this.config.enableMeasurement) {
      button.classList.add('no-measurement');
    }
    button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
      <circle cx="12" cy="13" r="4"></circle>
    </svg>`;
    button.tabIndex = 0;
    button.title = 'Save Screenshot';
    button.setAttribute('aria-label', 'Save Screenshot');

    button.addEventListener('click', () => this.takeScreenshot());
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.takeScreenshot();
      }
    });

    this.getUiContainer().appendChild(button);
    this.screenshotButton = button;
    this.ui.screenshot = button;
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

    this.getUiContainer().appendChild(button);
    this.fullscreenButton = button;
    this.ui.fullscreen = button;

    this._onFullscreenChange = () => this.updateFullscreenButton();
    document.addEventListener('fullscreenchange', this._onFullscreenChange);
    this.updateFullscreenButton();
  }

  _maybeAttachFlyControls() {
    if (!this.config.enableFlyControls || this.flyControls) return;
    if (!this.belowViewer?.cameraManager || !this.belowViewer?.renderer) return;

    this.flyControls = new FlyControls({
      domElement: this.belowViewer.renderer.domElement,
      camera: this.belowViewer.cameraManager.camera,
      controls: this.belowViewer.cameraManager.controls,
      renderer: this.belowViewer.renderer,
      ...this.config.flyControls
    });

    this._ensureFlyModeIndicator();

    this.flyControls.on('fly-mode-change', (data) => {
      this.emit('fly-mode-change', data);
      if (this.ui.flyIndicator) {
        this.ui.flyIndicator.classList.toggle('visible', data.active);
      }

      // Hide/show VR button when entering/exiting fly mode
      this._handleVRButtonVisibility(data.active);
    });

    this.flyControls.on('slow-mode-change', (data) => {
      this.emit('fly-slow-mode-change', data);
    });

    const update = (delta) => {
      if (this.flyControls) {
        this.flyControls.update(delta);
      }
    };

    if (this.belowViewer.onAfterRender) {
      this.belowViewer.onAfterRender(update);
    } else {
      this.belowViewer.on('before-render', update);
    }
  }

  _ensureFlyModeIndicator() {
    if (this.ui.flyIndicator || typeof document === 'undefined') return;

    const existing = document.getElementById('flyModeIndicator');
    if (existing) {
      this.ui.flyIndicator = existing;
      return;
    }

    const indicator = document.createElement('div');
    indicator.className = 'fly-mode-indicator';

    const exitHint = this.flyControls?.clickToExit
      ? 'Click to exit or press Esc'
      : 'Press Esc to exit';

    indicator.innerHTML = `
      <div class="crosshair"></div>
      <div class="hint">
        <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> Move
        <kbd>Q</kbd><kbd>E</kbd> Up/Down
        <kbd>Shift</kbd> Fast<br>
        <span class="fly-exit">${exitHint}</span>
      </div>
    `;

    this.container.appendChild(indicator);
    this.ui.flyIndicator = indicator;
  }

  _handleVRButtonVisibility(flyModeActive) {
    const vrButton = this.belowViewer?.vrManager?.vrCore?.vrButton;
    if (!vrButton) return;

    if (flyModeActive) {
      // Entering fly mode - hide VR button if it's showing
      const currentVisibility = window.getComputedStyle(vrButton).visibility;
      if (currentVisibility !== 'hidden') {
        this._vrButtonWasVisible = true;
        // Use setProperty with 'important' to override inline !important styles
        vrButton.style.setProperty('visibility', 'hidden', 'important');
        vrButton.style.setProperty('opacity', '0', 'important');
        vrButton.style.setProperty('pointer-events', 'none', 'important');
      }
    } else {
      // Exiting fly mode - restore VR button if it was visible before
      if (this._vrButtonWasVisible) {
        vrButton.style.setProperty('visibility', 'visible', 'important');
        vrButton.style.setProperty('opacity', '1', 'important');
        vrButton.style.setProperty('pointer-events', 'auto', 'important');
        this._vrButtonWasVisible = false;
      }
    }
  }

  setupRecoveryHandlers() {
    if (this.recoveryHandlers || !this.config.enableAutoRecovery) return;
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const canvas = this.belowViewer?.renderer?.domElement;
    if (!canvas) return;

    const onVisibilityChange = () => {
      if (!document.hidden) {
        this.queueRecovery('visibility-change', { forceReload: this.hadContextLoss });
      }
    };

    const onWindowFocus = () => {
      this.queueRecovery('window-focus', { forceReload: false });
    };

    const onContextLost = (event) => {
      if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
      }
      this.hadContextLoss = true;
    };

    const onContextRestored = () => {
      this.queueRecovery('context-restored', { forceReload: true, delayMs: 120 });
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('focus', onWindowFocus);
    canvas.addEventListener('webglcontextlost', onContextLost, false);
    canvas.addEventListener('webglcontextrestored', onContextRestored, false);

    this.recoveryHandlers = {
      canvas,
      onVisibilityChange,
      onWindowFocus,
      onContextLost,
      onContextRestored
    };
  }

  queueRecovery(reason, { forceReload = false, delayMs = 200 } = {}) {
    if (this.isDisposed || !this.config.enableAutoRecovery) return;

    if (this.recoveryTimer) {
      clearTimeout(this.recoveryTimer);
      this.recoveryTimer = null;
    }

    this.recoveryTimer = setTimeout(() => {
      this.recoveryTimer = null;
      this.tryRecoverFromInterruption(reason, { forceReload });
    }, delayMs);
  }

  async tryRecoverFromInterruption(reason, { forceReload = false } = {}) {
    if (this.isDisposed || !this.config.enableAutoRecovery) return;
    if (typeof document !== 'undefined' && document.hidden) return;
    if (this.isLoading) {
      this.queueRecovery(reason, { forceReload: true, delayMs: 600 });
      return;
    }

    const now = Date.now();
    if (now - this.lastRecoveryAttemptAt < this.recoveryCooldownMs) {
      return;
    }
    this.lastRecoveryAttemptAt = now;

    const loadedCount = this.belowViewer?.getLoadedModels?.()?.length || 0;
    const shouldReload = forceReload || this.hadContextLoss || loadedCount === 0;

    if (!shouldReload) {
      this.forceRefreshFrame();
      return;
    }

    const fallbackKey = Object.keys(this.config.models)[0];
    const modelKey = this.currentModelKey || this.lastRequestedModelKey || fallbackKey;
    if (!modelKey || !this.config.models[modelKey]) {
      this.forceRefreshFrame();
      return;
    }

    this.recoveryAttempts += 1;
    this.updateStatus('Recovering viewer...');
    await this.loadModel(modelKey);

    const recovered = (this.belowViewer?.getLoadedModels?.()?.length || 0) > 0;
    if (recovered) {
      this.hadContextLoss = false;
      this.recoveryAttempts = 0;
      this.forceRefreshFrame();
      this.emit('viewer-recovered', { reason, modelKey });
      return;
    }

    if (this.recoveryAttempts < this.maxRecoveryAttempts) {
      this.queueRecovery(reason, {
        forceReload: true,
        delayMs: 400 + this.recoveryAttempts * 300
      });
    } else {
      this.updateStatus('Recovery failed. Try selecting the model again.');
    }
  }

  forceRefreshFrame() {
    const renderer = this.belowViewer?.renderer;
    const scene = this.belowViewer?.sceneManager?.scene;
    const camera = this.belowViewer?.cameraManager?.camera;
    if (!renderer || !scene || !camera) return;

    try {
      const isXRPresenting = renderer.xr?.isPresenting;
      if (this.belowViewer?.stereoEnabled && !isXRPresenting && this.belowViewer?.stereoMode === 'sbs' &&
        typeof this.belowViewer.renderSbsStereo === 'function') {
        this.belowViewer.renderSbsStereo();
      } else {
        renderer.render(scene, camera);
      }
    } catch {
      // Ignore one-off render errors and rely on next animation frame.
    }
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

  getScreenshotPixelRatio(canvas, rect, options = {}) {
    const currentRatio = rect.width > 0 ? canvas.width / rect.width : 1;
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const minPixelRatio = options.minPixelRatio ?? 2;
    const maxDimension = options.maxDimension ?? 8192;
    const targetRatio = Math.max(minPixelRatio, dpr, currentRatio || 1);
    const maxRatio = Math.min(
      maxDimension / Math.max(1, rect.width),
      maxDimension / Math.max(1, rect.height)
    );
    return Math.max(1, Math.min(targetRatio, maxRatio));
  }

  withScreenshotResolution(callback, options = {}) {
    const renderer = this.belowViewer?.renderer;
    const canvas = renderer?.domElement;
    if (!canvas) {
      throw new Error('No canvas available for screenshot');
    }

    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      throw new Error('Viewer canvas is not visible');
    }

    if (!renderer.setPixelRatio || !renderer.setSize) {
      this.forceRefreshFrame();
      return callback(canvas, rect);
    }

    const previousRatio = renderer.getPixelRatio?.() || (rect.width > 0 ? canvas.width / rect.width : 1);
    const targetRatio = this.getScreenshotPixelRatio(canvas, rect, options);
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    const shouldResize = Math.abs(targetRatio - previousRatio) > 0.01;

    if (!shouldResize) {
      this.forceRefreshFrame();
      return callback(canvas, rect);
    }

    renderer.setPixelRatio(targetRatio);
    renderer.setSize(width, height, false);
    this.forceRefreshFrame();

    try {
      return callback(canvas, rect);
    } finally {
      renderer.setPixelRatio(previousRatio);
      renderer.setSize(width, height, false);
      this.forceRefreshFrame();
    }
  }

  captureScreenshotCanvas(options = {}) {
    return this.withScreenshotResolution((source, sourceRect) => {
      const output = document.createElement('canvas');
      output.width = source.width;
      output.height = source.height;
      const ctx = output.getContext('2d');
      ctx.drawImage(source, 0, 0, output.width, output.height);
      return {
        canvas: output,
        sourceRect,
        scaleX: output.width / sourceRect.width,
        scaleY: output.height / sourceRect.height
      };
    }, options);
  }

  /**
   * Captures a screenshot of the current 3D scene without UI overlays
   * 
   * The method temporarily renders at a high pixel ratio, validates the
   * resulting image data, and automatically downloads the screenshot as a PNG
   * file with a timestamp-based filename.
   * 
   * @method takeScreenshot
   * @throws {Error} Will log errors if canvas is unavailable or screenshot capture fails
   * @returns {void}
   * 
   * @example
   * // Programmatically capture a screenshot
   * viewer.takeScreenshot();
   * 
   * @since 1.0.0
   */
  takeScreenshot() {
    try {
      const captured = this.captureScreenshotCanvas();
      const dataURL = captured.canvas.toDataURL('image/png');
      
      // Check if we got a valid image (not just a black/empty canvas)
      if (dataURL === 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==') {
        console.error('[ModelViewer] Screenshot captured empty canvas');
        return;
      }
      
      // Generate filename with model name and timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '').slice(0, -5);
      const modelName = this.currentModelKey ? 
        this.config.models[this.currentModelKey]?.name?.replace(/[^a-zA-Z0-9\-_]/g, '-') || this.currentModelKey.replace(/[^a-zA-Z0-9\-_]/g, '-') :
        'unknown';
      const filename = `${modelName}-belowjs-${timestamp}.png`;
      
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log(`[ModelViewer] Screenshot saved as ${filename}`);
    } catch (err) {
      console.error('[ModelViewer] Failed to capture screenshot', err);
    }
  }
  
  setupEventForwarding() {

    this.belowViewer.on('initialized', (data) => this.emit('initialized', data));
    this.belowViewer.on('model-load-start', (data) => this.emit('model-load-start', data));
    this.belowViewer.on('model-load-progress', (data) => {
      this.emit('model-load-progress', data);
      this.updateLoadingProgress(data);
    });
    this.belowViewer.on('model-load-stage', (data) => {
      this.emit('model-load-stage', data);
      this.onModelLoadStage(data);
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
    if (this.flyControls) {
      this.flyControls.exitFlyMode();
    }
    if (this.ui.info) {
      this.ui.info.style.display = 'none';
    }
    // Show VR loading indicator if loading is in progress
    if (this.isLoading) {
      this.updateVRLoadingIndicator();
    }

    // Set up VR loading sprite update loop
    if (!this.vrUpdateLoop) {
      let lastUpdateTime = 0;
      const updateVRElements = (currentTime) => {
        if (this.belowViewer && this.belowViewer.renderer && 
            this.belowViewer.renderer.xr && this.belowViewer.renderer.xr.isPresenting) {
          
          // Only update position periodically to avoid jitter (every 100ms)
          if (currentTime - lastUpdateTime > 100) {
            // Update VR loading sprite position if it exists and is visible
            if (this.vrLoadingSprite && 
                this.belowViewer.sceneManager.scene.children.includes(this.vrLoadingSprite) &&
                this.isLoading) {
              this.positionVRLoadingSprite();
            }
            lastUpdateTime = currentTime;
          }
          
          this.vrUpdateLoop = requestAnimationFrame(updateVRElements);
        } else {
          this.vrUpdateLoop = null;
        }
      };
      this.vrUpdateLoop = requestAnimationFrame(updateVRElements);
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

    // Clean up VR update loop
    if (this.vrUpdateLoop) {
      cancelAnimationFrame(this.vrUpdateLoop);
      this.vrUpdateLoop = null;
    }

    // Hide VR loading indicator when exiting VR
    this.updateVRLoadingIndicator();
    

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
    const dragStartPosition = { x: 0, y: 0 };
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
      if (this.measurementSystem && this.measurementSystem.desktopMeasurementMode) return;
      
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

  getPointerRaycastInfo(event) {
    if (!event || typeof event.clientX !== 'number' || typeof event.clientY !== 'number') {
      return null;
    }
    if (!this.belowViewer || !this.belowViewer.renderer || !this.belowViewer.cameraManager) {
      return null;
    }
    if (this.belowViewer.renderer.xr?.isPresenting) {
      return null;
    }

    const canvas = this.belowViewer.renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return null;
    }

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return null;
    }

    const baseCamera = this.belowViewer.cameraManager.getCamera();
    let camera = baseCamera;
    let normX = (x / rect.width) * 2 - 1;
    const normY = -((y / rect.height) * 2 - 1);

    const settings = this.belowViewer.getStereoSettings?.();
    if (settings?.enabled === true && settings?.mode === 'sbs' && this.belowViewer.stereoCamera) {
      const stereoCamera = this.belowViewer.stereoCamera;
      const halfWidth = rect.width / 2;
      const isLeft = x <= halfWidth;
      const eyeWidth = isLeft ? halfWidth : (rect.width - halfWidth);
      const eyeX = isLeft ? x : (x - halfWidth);
      if (eyeWidth > 0) {
        normX = (eyeX / eyeWidth) * 2 - 1;
      }
      // Calculate aspect ratio for each eye viewport (width/height)
      stereoCamera.aspect = rect.height > 0 ? halfWidth / rect.height : 1.0;
      stereoCamera.update(baseCamera);
      camera = isLeft ? stereoCamera.cameraL : stereoCamera.cameraR;
    }

    return {
      mouse: { x: normX, y: normY },
      camera
    };
  }

  focusOnPoint(event) {
    const raycastInfo = this.getPointerRaycastInfo(event);
    const mouse = raycastInfo?.mouse;
    const camera = raycastInfo?.camera;
    if (!mouse || !camera) {
      return;
    }

    const raycaster = new THREE.Raycaster();
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

    this.ensureUiRoot();


    const modelCount = Object.keys(this.config.models).length;
    if (modelCount > 1 && !this.ui.dropdown) {
      this.createModelSelector();
    }

    // Create standalone dive mode toggle if dive system is enabled but no model selector
    if (this.config.enableDiveSystem && this.config.showDiveToggle && modelCount <= 1 && !this.ui.diveToggle) {
      this.createDiveModeToggle();
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

  ensureUiRoot() {
    if (this.uiRoot) {
      return this.uiRoot;
    }
    const root = document.createElement('div');
    root.className = 'below-ui-root';
    this.container.appendChild(root);
    this.uiRoot = root;
    this.applyStereoUiState();
    return root;
  }

  getUiContainer() {
    return this.ensureUiRoot();
  }

  applyStereoUiState() {
    const settings = this.belowViewer?.getStereoSettings?.();
    const isStereo = settings?.enabled === true && settings?.mode === 'sbs';
    if (!this.uiRoot) {
      return;
    }
    if (isStereo) {
      this.enableStereoUi();
    } else {
      this.disableStereoUi();
    }
  }

  updateStereoUiState() {
    this.applyStereoUiState();
  }

  enableStereoUi() {
    if (this.stereoUiActive) {
      this.scheduleStereoUiSync();
      return;
    }
    this.stereoUiActive = true;
    this.uiRoot.classList.add('below-ui-root--stereo-left');

    if (!this.stereoUiMirror) {
      const mirror = document.createElement('div');
      mirror.className = 'below-ui-root below-ui-root--stereo-right';
      mirror.setAttribute('aria-hidden', 'true');
      mirror.setAttribute('inert', '');
      mirror.tabIndex = -1;
      mirror.style.pointerEvents = 'none';
      this.container.appendChild(mirror);
      this.stereoUiMirror = mirror;
    }

    this.scheduleStereoUiSync();

    if (!this.stereoUiObserver && typeof MutationObserver !== 'undefined') {
      this.stereoUiObserver = new MutationObserver(() => this.scheduleStereoUiSync());
      this.stereoUiObserver.observe(this.uiRoot, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true
      });
    }
  }

  disableStereoUi() {
    if (!this.stereoUiActive) {
      return;
    }
    this.stereoUiActive = false;
    this.uiRoot.classList.remove('below-ui-root--stereo-left');
    if (this.stereoUiObserver) {
      this.stereoUiObserver.disconnect();
      this.stereoUiObserver = null;
    }
    if (this.stereoUiMirror) {
      this.stereoUiMirror.remove();
      this.stereoUiMirror = null;
    }
  }

  scheduleStereoUiSync() {
    if (this.stereoUiSyncQueued || !this.stereoUiMirror) {
      return;
    }
    this.stereoUiSyncQueued = true;
    const schedule = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : (cb) => setTimeout(cb, 0);
    schedule(() => {
      this.stereoUiSyncQueued = false;
      this.syncStereoUiMirror();
    });
  }

  syncStereoUiMirror() {
    if (!this.stereoUiMirror || !this.uiRoot) {
      return;
    }
    this.stereoUiMirror.innerHTML = '';
    for (const child of this.uiRoot.childNodes) {
      const clone = child.cloneNode(true);
      this.stripStereoCloneIds(clone);
      this.stereoUiMirror.appendChild(clone);
    }
  }

  stripStereoCloneIds(node) {
    if (!node || node.nodeType !== 1) {
      return;
    }
    if (node.hasAttribute('id')) {
      node.removeAttribute('id');
    }
    if (node.hasAttribute('for')) {
      node.removeAttribute('for');
    }
    for (const child of node.children) {
      this.stripStereoCloneIds(child);
    }
  }
  
  createModelSelector() {
    const parent = this.getUiContainer();


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

  createDiveModeToggle() {
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'dive-mode-toggle-container';
    toggleContainer.style.position = 'absolute';
    toggleContainer.style.top = '20px';
    toggleContainer.style.right = '20px';
    toggleContainer.style.zIndex = '1000';

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
    this.getUiContainer().appendChild(toggleContainer);

    this.ui.diveToggle = toggleContainer;
  }
  
  createLoadingIndicator() {
    const loading = document.createElement('div');
    loading.className = 'loading-indicator below-loading';
    if (this.config.measurementTheme === 'light') {
      loading.classList.add('light-theme');
    }
    loading.style.display = 'none';
    
    // Create the inner structure
    loading.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner-circle">
          <div class="spinner-path"></div>
        </div>
        <div class="spinner-percentage">0%</div>
      </div>
      <div class="loading-content">
        <div class="loading-model-name">Loading Model</div>
        <div class="loading-status">Initializing...</div>
      </div>
    `;
    
    this.getUiContainer().appendChild(loading);
    this.ui.loading = loading;
  }

  /**
   * Create VR loading indicator as a canvas-based sprite
   * Similar to measurement labels, this creates a world-space UI element for VR
   */
  createVRLoadingIndicator(message = 'Loading...', modelName = '', percentage = 0) {
    const DPR = (window.devicePixelRatio || 1) * 2;
    const logicalWidth = 512;
    const logicalHeight = 256;
    const canvasWidth = logicalWidth * DPR;
    const canvasHeight = logicalHeight * DPR;

    // Create or reuse canvas
    if (!this.vrLoadingCanvas) {
      this.vrLoadingCanvas = document.createElement('canvas');
    }
    
    if (this.vrLoadingCanvas.width !== canvasWidth || this.vrLoadingCanvas.height !== canvasHeight) {
      this.vrLoadingCanvas.width = canvasWidth;
      this.vrLoadingCanvas.height = canvasHeight;
    }

    const context = this.vrLoadingCanvas.getContext('2d');
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.save();
    context.scale(DPR, DPR);

    const centerX = logicalWidth / 2;
    const centerY = logicalHeight / 2;

    // Spinner circle (floating, no background)
    const spinnerRadius = 25;
    const spinnerY = centerY - 40;
    
    // Outer circle (track) with shadow
    context.shadowColor = 'rgba(0, 0, 0, 0.8)';
    context.shadowBlur = 3;
    context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    context.lineWidth = 3;
    context.beginPath();
    context.arc(centerX, spinnerY, spinnerRadius, 0, Math.PI * 2);
    context.stroke();
    
    // Reset shadow for progress arc
    context.shadowColor = 'transparent';
    context.shadowBlur = 0;
    
    // Progress arc
    if (percentage > 0) {
      const progressAngle = (percentage / 100) * Math.PI * 2;
      context.strokeStyle = '#ffffff';
      context.lineWidth = 3;
      context.beginPath();
      context.arc(centerX, spinnerY, spinnerRadius, -Math.PI / 2, -Math.PI / 2 + progressAngle);
      context.stroke();
    }

    // Percentage text inside spinner
    context.fillStyle = 'white';
    context.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.shadowColor = 'rgba(0, 0, 0, 0.8)';
    context.shadowBlur = 2;
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 1;
    context.fillText(`${Math.round(percentage)}%`, centerX, spinnerY);

    // Main model name text
    if (modelName) {
      context.fillStyle = 'white';
      context.font = '600 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.shadowColor = 'rgba(0, 0, 0, 0.8)';
      context.shadowBlur = 4;
      context.shadowOffsetX = 1;
      context.shadowOffsetY = 1;
      context.fillText(modelName, centerX, centerY + 20);
    }

    // Loading message
    context.fillStyle = 'rgba(255, 255, 255, 0.9)';
    context.font = '400 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    context.shadowColor = 'rgba(0, 0, 0, 0.8)';
    context.shadowBlur = 3;
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 1;
    context.fillText(message, centerX, centerY + 50);

    context.restore();

    // Create or update texture
    if (!this.vrLoadingTexture) {
      this.vrLoadingTexture = new THREE.CanvasTexture(this.vrLoadingCanvas);
      this.vrLoadingTexture.minFilter = THREE.LinearFilter;
      this.vrLoadingTexture.magFilter = THREE.LinearFilter;
    } else {
      this.vrLoadingTexture.needsUpdate = true;
    }

    // Create or update sprite
    if (!this.vrLoadingSprite) {
      const spriteMaterial = new THREE.SpriteMaterial({ 
        map: this.vrLoadingTexture,
        depthTest: false,
        depthWrite: false,
        transparent: true
      });
      this.vrLoadingSprite = new THREE.Sprite(spriteMaterial);
      
      // Set scale
      const scale = 0.7;
      const aspectRatio = logicalWidth / logicalHeight;
      this.vrLoadingSprite.scale.set(scale * aspectRatio, scale, 1);
    }

    return this.vrLoadingSprite;
  }
  
  createStatusIndicator() {
    const status = document.createElement('div');
    status.id = 'status';
    status.className = 'status below-status';
    status.style.display = 'none';
    this.getUiContainer().appendChild(status);
    this.ui.status = status;
  }
  
  createInfoPanel() {
    const info = document.createElement('div');
    info.id = 'info';
    info.className = 'below-panel info-panel';
    
    const title = document.createElement('div');
    title.id = 'infoTitle';
    title.className = 'info-panel__title';
    title.textContent = 'BelowJS';
    
    const controls = document.createElement('div');
    controls.id = 'infoControls';
    controls.className = 'info-panel__controls';
    controls.innerHTML = `
      <strong>Desktop:</strong> Drag to rotate • Scroll to zoom<br>
      <strong>Mobile:</strong> Touch and drag to explore
    `;
    
    info.appendChild(title);
    info.appendChild(controls);
    this.getUiContainer().appendChild(info);

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
    this.lastRequestedModelKey = modelKey;
    this.currentModelKey = modelKey;
    this.hadContextLoss = false;
    if (this.recoveryTimer) {
      clearTimeout(this.recoveryTimer);
      this.recoveryTimer = null;
    }

    if (this.ui.dropdown) {
      this.ui.dropdown.value = modelKey;
    }

    this.showLoading('Preparing to load...', modelConfig.name || modelKey);
    const hadExistingModel = this.belowViewer?.getLoadedModels()?.length > 0;
    const shouldAnnounceCleanup = hadExistingModel;
    if (shouldAnnounceCleanup) {
      this.setManualLoadingMessage('Cleaning up previous model...');
    }

    document.title = `BelowJS – ${modelConfig.name || modelKey}`;
    try {

      if (this.measurementSystem) {
        this.measurementSystem.clearUnifiedMeasurement();
        this.measurementSystem.clearLegacyVRMeasurement();
        this.measurementSystem.clearLegacyDesktopMeasurement();
      }

      this.belowViewer.clearModels();
      this.belowViewer.cameraManager?.resetControlInteractionState?.();

      // When switching models while in VR, locomotion state can persist which
      // leaves movement controls unresponsive in the next model. Explicitly
      // reset VR movement systems after clearing the previous model so the
      // new session starts fresh.
      if (this.belowViewer.vrManager) {
        this.belowViewer.vrManager.stopMovement();
        this.belowViewer.vrManager.resetTeleportState();
      }

      await new Promise(resolve => setTimeout(resolve, 50));

      const model = await this.belowViewer.loadModel(modelConfig.url, {
        autoFrame: false,  // We'll handle positioning manually
        initialPositions: modelConfig.initialPositions,  // Pass VR/desktop positions
        position: modelConfig.position,
        rotation: modelConfig.rotation,
        scale: modelConfig.scale,
        type: modelConfig.type,
        errorTarget: modelConfig.errorTarget,
        maxDepth: modelConfig.maxDepth,
        loadSiblings: modelConfig.loadSiblings,
        optimizedLoadStrategy: modelConfig.optimizedLoadStrategy,
        maxTilesProcessed: modelConfig.maxTilesProcessed,
        fetchOptions: modelConfig.fetchOptions,
        up: modelConfig.up,
        geospatialReorientation: modelConfig.geospatialReorientation,
        autoCenter: modelConfig.autoCenter,
        maxTriangles: modelConfig.maxTriangles,
        minErrorTarget: modelConfig.minErrorTarget,
        maxErrorTarget: modelConfig.maxErrorTarget,
        enableGltfExtensions: modelConfig.enableGltfExtensions,
        assetBasePath: modelConfig.assetBasePath,
        dracoDecoderPath: modelConfig.dracoDecoderPath,
        ktx2TranscoderPath: modelConfig.ktx2TranscoderPath
      });
      if (model) {
        const hasInitialDesktopPosition = Boolean(modelConfig.initialPositions?.desktop);
        this.applyInitialPositions(modelConfig, model);
        this.belowViewer.cameraManager?.resetControlInteractionState?.();
        const shouldAutoFrameTileset = modelConfig.type === 'tileset'
          && !hasInitialDesktopPosition
          && !this.belowViewer.isVRPresenting();
        if (shouldAutoFrameTileset) {
          this.belowViewer.frameModel(model);
        }

        this.hideLoading();
        this.updateStatus(`Loaded: ${modelConfig.name || modelKey}`);

        this.applyModelMeasurementConfig(modelConfig, model);
        

        this.modelReady = true;
        this.recoveryAttempts = 0;
        this.emit('model-switched', { modelKey, model, config: modelConfig });
        this.emit('modelLoaded', { modelKey, model, config: modelConfig });
      } else if (this.currentModelKey === modelKey) {
        this.queueRecovery('empty-load-result', { forceReload: true, delayMs: 350 });
      }
    } catch (error) {
      if (error.message !== 'Loading cancelled') {
        console.error('Failed to load model:', error);
        this.hideLoading();
        this.updateStatus(`Error loading ${modelConfig.name || modelKey}`);
        

        this.applyModelMeasurementConfig(modelConfig, null);
        if (this.currentModelKey === modelKey) {
          const shouldRetryNow = typeof document === 'undefined' || !document.hidden;
          if (shouldRetryNow) {
            this.queueRecovery('model-load-error', { forceReload: true, delayMs: 500 });
          }
        }
      }
    }
  }
  
  applyInitialPositions(modelConfig, _model) {
    const positions = modelConfig.initialPositions;
    if (!positions) return;

    // Update VRManager with latest initial positions for proper restoration
    const vrManager = this.belowViewer.getVRManager();
    if (vrManager) {
      vrManager.setInitialPositions(positions);
    }

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
  
  showLoading(message = 'Loading...', modelName = null) {
    // Store loading state for VR
    this.isLoading = true;
    this.loadingModelName = modelName || '';
    this.loadingPercentage = 0;
    this.setManualLoadingMessage(message);
    this.lastManualLoadingMessage = message || '';
    
    // Show desktop loading indicator
    if (this.ui.loading) {
      const statusElement = this.ui.loading.querySelector('.loading-status');
      const modelNameElement = this.ui.loading.querySelector('.loading-model-name');
      const percentageElement = this.ui.loading.querySelector('.spinner-percentage');
      
      if (statusElement) {
        statusElement.textContent = message;
      }
      if (modelNameElement && modelName) {
        modelNameElement.textContent = modelName;
      }
      if (percentageElement) {
        percentageElement.textContent = '0%';
      }
      
      this.ui.loading.style.display = 'flex';
    }

    // Always create and show VR loading indicator if in VR
    this.updateVRLoadingIndicator();
  }

  /**
   * Show VR loading sprite in the scene
   */
  showVRLoadingSprite() {
    if (!this.vrLoadingSprite || !this.belowViewer?.sceneManager) {
      return;
    }

    // Always recalculate position when showing
    this.positionVRLoadingSprite();
    
    // Remove and re-add to ensure clean state
    if (this.belowViewer.sceneManager.scene.children.includes(this.vrLoadingSprite)) {
      this.belowViewer.sceneManager.scene.remove(this.vrLoadingSprite);
    }
    
    this.belowViewer.sceneManager.scene.add(this.vrLoadingSprite);
  }

  /**
   * Update VR loading indicator based on current state
   */
  updateVRLoadingIndicator() {
    const inVR = this.belowViewer && this.belowViewer.renderer && 
                 this.belowViewer.renderer.xr && this.belowViewer.renderer.xr.isPresenting;
    
    if (this.isLoading && inVR) {
      // Always recreate the VR loading indicator to ensure fresh state
      this.createVRLoadingIndicator(this.loadingMessage, this.loadingModelName, this.loadingPercentage);
      this.showVRLoadingSprite();
    } else if (this.vrLoadingSprite && this.belowViewer?.sceneManager) {
      // Hide VR loading indicator if not loading or not in VR
      this.belowViewer.sceneManager.scene.remove(this.vrLoadingSprite);
    }
  }
  
  hideLoading() {
    // Clear loading state
    this.isLoading = false;
    this.loadingMessage = '';
    this.loadingModelName = '';
    this.loadingPercentage = 0;
    
    // Hide desktop loading indicator
    if (this.ui.loading) {
      this.ui.loading.style.display = 'none';
    }

    // Hide and cleanup VR loading indicator
    if (this.vrLoadingSprite && this.belowViewer && this.belowViewer.sceneManager) {
      this.belowViewer.sceneManager.scene.remove(this.vrLoadingSprite);
      
      // Reset sprite position to avoid positioning issues on next load
      this.vrLoadingSprite.position.set(0, 0, 0);
      this.vrLoadingSprite.rotation.set(0, 0, 0);
    }
  }

  setManualLoadingMessage(message) {
    this.lastManualLoadingMessage = message || '';
    this.stageOverrideActive = false;
    this.updateLoadingText(message);
  }

  setStageLoadingMessage(message) {
    this.stageOverrideActive = true;
    this.updateLoadingText(message);
  }

  restoreManualLoadingMessage() {
    if (!this.lastManualLoadingMessage) {
      this.stageOverrideActive = false;
      return;
    }
    this.stageOverrideActive = false;
    this.updateLoadingText(this.lastManualLoadingMessage);
  }

  updateLoadingText(message) {
    this.loadingMessage = message || '';
    if (this.ui.loading) {
      const statusElement = this.ui.loading.querySelector('.loading-status');
      if (statusElement) {
        statusElement.textContent = this.loadingMessage;
      }
    }
    this.updateVRLoadingIndicator();
  }

  /**
   * Position VR loading sprite in front of user's view
   */
  positionVRLoadingSprite() {
    if (!this.vrLoadingSprite || !this.belowViewer || !this.belowViewer.cameraManager) {
      return;
    }

    const camera = this.belowViewer.cameraManager.camera;
    const distance = 2.0; // 2 meters in front
    
    // Get fresh camera direction
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    
    // Get fresh camera position
    const cameraPosition = new THREE.Vector3();
    camera.getWorldPosition(cameraPosition);
    
    // Position sprite in front of camera
    const position = new THREE.Vector3();
    position.copy(cameraPosition);
    position.add(direction.multiplyScalar(distance));
    
    this.vrLoadingSprite.position.copy(position);
    
    // Make sprite face the camera
    this.vrLoadingSprite.lookAt(cameraPosition);
  }
  
  updateStatus(message) {
    if (this.ui.status) {
      this.ui.status.textContent = message;
      this.ui.status.style.display = 'block';
    }
  }
  
  updateLoadingProgress({ progress }) {
    if (progress.lengthComputable && this.currentModelKey) {
      const percent = Math.min(100, Math.round((progress.loaded / progress.total) * 100));
      
      // Update loading state
      this.loadingPercentage = percent;
      if (!this.stageOverrideActive) {
        this.setManualLoadingMessage('Loading model');
      }
      
      // Update desktop loading indicator
      if (this.ui.loading) {
        const percentageElement = this.ui.loading.querySelector('.spinner-percentage');
        const spinnerPath = this.ui.loading.querySelector('.spinner-path');
        
        if (percentageElement) {
          percentageElement.textContent = `${percent}%`;
        }
        if (spinnerPath) {
          // Update the circular progress
          const circumference = 2 * Math.PI * 20; // radius is 20
          const offset = circumference - (percent / 100) * circumference;
          spinnerPath.style.strokeDashoffset = offset;
        }
      }

      // Update VR loading indicator
      this.updateVRLoadingIndicator();
    }
  }
  
  onModelLoaded({ model }) {
    const modelConfig = this.currentModelKey ? this.config.models[this.currentModelKey] : null;
    this.applyModelMeasurementConfig(modelConfig, model);
    if (this.flyControls) {
      this.flyControls.setModelSizeFromObject(model);
    }
  }
  
  onModelLoadError({ error }) {
    this.hideLoading();
    this.updateStatus(`Failed to load model: ${error.message}`);
  }

  onModelLoadStage({ stage }) {
    if (!this.isLoading) return;

    const stageMessages = {
      downloading: 'Downloading model...',
      'freeing-resources': 'Freeing GPU memory...',
      cloning: 'Fetching from cache...',
      processing: 'Uploading textures... almost there',
      finalizing: 'Finalizing view...'
    };

    if (stageMessages[stage]) {
      this.setStageLoadingMessage(stageMessages[stage]);
    } else if (stage === 'completed') {
      this.restoreManualLoadingMessage();
    }
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
   * Enable or disable fly controls.
   *
   * @method setFlyControlsEnabled
   * @param {boolean} enabled - Whether fly controls should be enabled
   */
  setFlyControlsEnabled(enabled) {
    if (this.flyControls) {
      this.flyControls.setEnabled(enabled);
    }
  }

  /**
   * Enter fly mode (pointer lock).
   *
   * @method enterFlyMode
   */
  enterFlyMode() {
    if (this.flyControls) {
      this.flyControls.enterFlyMode();
    }
  }

  /**
   * Exit fly mode (pointer lock).
   *
   * @method exitFlyMode
   */
  exitFlyMode() {
    if (this.flyControls) {
      this.flyControls.exitFlyMode();
    }
  }

  /**
   * Toggle fly mode (pointer lock).
   *
   * @method toggleFlyMode
   */
  toggleFlyMode() {
    if (this.flyControls) {
      this.flyControls.toggleFlyMode();
    }
  }

  /**
   * Enable or disable slow fly movement.
   *
   * @method setFlySlowMode
   * @param {boolean} enabled - Whether fly mode movement should use slow speed
   */
  setFlySlowMode(enabled) {
    if (this.flyControls?.setSlowMode) {
      this.flyControls.setSlowMode(enabled);
    }
  }

  /**
   * Toggle slow fly movement.
   *
   * @method toggleFlySlowMode
   */
  toggleFlySlowMode() {
    if (this.flyControls?.toggleSlowMode) {
      this.flyControls.toggleSlowMode();
    }
  }

  /**
   * Check if slow fly movement is currently enabled.
   *
   * @method isFlySlowMode
   * @returns {boolean} True if slow fly mode is enabled
   */
  isFlySlowMode() {
    return this.flyControls?.isSlowMode ? this.flyControls.isSlowMode() : false;
  }

  /**
   * Check if fly mode is currently active.
   *
   * @method isFlyModeActive
   * @returns {boolean} True if fly mode is active
   */
  isFlyModeActive() {
    return this.flyControls ? this.flyControls.isActive() : false;
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
    const isComfort = preset === 'comfort';
    const isFree = preset === 'free';
    const changed = this.belowViewer && this.belowViewer.setVRComfortPreset
      ? this.belowViewer.setVRComfortPreset(preset)
      : false;

    if (isComfort || isFree) {
      this.lastComfortMode = isComfort;
      if (this.comfortGlyph) {
        this.comfortGlyph.setComfortMode(isComfort, {
          emitEvent: false,
          applyToManager: false
        });
      }
    }

    return changed;
  }

  /**
   * Enable or disable comfort mode.
   *
   * Works both inside and outside active VR sessions.
   *
   * @param {boolean} enabled
   * @returns {boolean}
   */
  setComfortMode(enabled) {
    const target = enabled === true;
    const changed = this.belowViewer && this.belowViewer.setVRComfortMode
      ? this.belowViewer.setVRComfortMode(target)
      : false;

    this.lastComfortMode = target;
    if (this.comfortGlyph) {
      this.comfortGlyph.setComfortMode(target, {
        emitEvent: false,
        applyToManager: false
      });
    }

    return changed;
  }

  /**
   * Toggle comfort mode.
   *
   * Works both inside and outside active VR sessions.
   *
   * @returns {boolean} New comfort mode state
   */
  toggleComfortMode() {
    const next = !this.getComfortMode();
    this.setComfortMode(next);
    return next;
  }

  /**
   * Check current comfort mode state.
   *
   * @returns {boolean}
   */
  getComfortMode() {
    if (typeof this.lastComfortMode === 'boolean') {
      return this.lastComfortMode;
    }

    const settings = this.getVRComfortSettings();
    if (!settings) return false;
    return settings.locomotionMode === 'teleport' && settings.reducedMotion === true;
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
   * Enable or disable SBS stereo rendering.
   *
   * @param {boolean} enabled - Whether stereo rendering is enabled.
   */
  setStereoEnabled(enabled) {
    if (this.belowViewer && this.belowViewer.setStereoEnabled) {
      this.belowViewer.setStereoEnabled(enabled);
    }
    this.updateStereoUiState();
  }

  /**
   * Adjust the SBS stereo eye separation.
   *
   * @param {number} eyeSeparation - Eye separation in meters.
   */
  setStereoEyeSeparation(eyeSeparation) {
    if (this.belowViewer && this.belowViewer.setStereoEyeSeparation) {
      this.belowViewer.setStereoEyeSeparation(eyeSeparation);
    }
  }

  /**
   * Set the stereo mode (currently only 'sbs').
   *
   * @param {string} mode - Stereo mode string.
   */
  setStereoMode(mode) {
    if (this.belowViewer && this.belowViewer.setStereoMode) {
      this.belowViewer.setStereoMode(mode);
    }
    this.updateStereoUiState();
  }

  /**
   * Get current stereo settings.
   *
   * @returns {{enabled: boolean, mode: string, eyeSeparation: number}|null}
   */
  getStereoSettings() {
    if (this.belowViewer && this.belowViewer.getStereoSettings) {
      return this.belowViewer.getStereoSettings();
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
    this.isDisposed = true;
    if (this.recoveryTimer) {
      clearTimeout(this.recoveryTimer);
      this.recoveryTimer = null;
    }
    if (this.recoveryHandlers) {
      const { canvas, onVisibilityChange, onWindowFocus, onContextLost, onContextRestored } = this.recoveryHandlers;
      if (typeof document !== 'undefined' && onVisibilityChange) {
        document.removeEventListener('visibilitychange', onVisibilityChange);
      }
      if (typeof window !== 'undefined' && onWindowFocus) {
        window.removeEventListener('focus', onWindowFocus);
      }
      if (canvas && onContextLost) {
        canvas.removeEventListener('webglcontextlost', onContextLost, false);
      }
      if (canvas && onContextRestored) {
        canvas.removeEventListener('webglcontextrestored', onContextRestored, false);
      }
      this.recoveryHandlers = null;
    }
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
    if (this.screenshotButton) {
      this.screenshotButton.remove();
      this.screenshotButton = null;
    }
    if (this.stereoUiObserver) {
      this.stereoUiObserver.disconnect();
      this.stereoUiObserver = null;
    }
    if (this.stereoUiMirror) {
      this.stereoUiMirror.remove();
      this.stereoUiMirror = null;
    }
    if (this.belowViewer) {
      this.belowViewer.dispose();
    }
    this.removeAllListeners();
  }
}
