import * as THREE from 'three';
import { EventSystem } from '../utils/EventSystem.js';
import { ConfigValidator } from '../utils/ConfigValidator.js';
import { Scene } from './Scene.js';
import { Camera } from './Camera.js';
import { ModelLoader } from '../models/ModelLoader.js';
import { TilesetLoader } from '../models/TilesetLoader.js';
import { disposeObject3D } from '../utils/ThreeCleanupUtils.js';
import { VRManager } from './VRManager.js';
import { ARManager } from './ARManager.js';
import { DebugCommands } from './DebugCommands.js';
import { PerfMonitor } from '../utils/PerfMonitor.js';
import { applyVRRenderProfileDefaults } from '../utils/VRPerformanceProfile.js';

/**
 * @typedef {Object} BelowViewerConfig
 * @property {Object} [scene] - Scene configuration
 * @property {Object} [scene.background] - Background settings
 * @property {string} [scene.background.type='color'] - Background type ('color', 'texture', 'gradient')
 * @property {string} [scene.background.value='#001122'] - Background color value
 * @property {Object} [scene.fog] - Fog settings
 * @property {boolean} [scene.fog.enabled=false] - Enable fog
 * @property {string} [scene.fog.color='#001122'] - Fog color
 * @property {number} [scene.fog.near=10] - Fog near distance
 * @property {number} [scene.fog.far=100] - Fog far distance
 * @property {Object} [camera] - Camera configuration
 * @property {number} [camera.fov=65] - Field of view in degrees
 * @property {number} [camera.near=0.05] - Near clipping plane
 * @property {number} [camera.far=2000] - Far clipping plane
 * @property {Object} [camera.position] - Initial camera position
 * @property {Object} [camera.desktop] - Desktop-specific camera settings
 * @property {Object} [renderer] - Renderer configuration
 * @property {boolean} [renderer.antialias=true] - Enable antialiasing
 * @property {boolean} [renderer.alpha=false] - Enable transparency
 * @property {string} [renderer.powerPreference='high-performance'] - GPU preference
 * @property {boolean} [renderer.logarithmicDepthBuffer=false] - Enable logarithmic depth buffer for large scenes
 * @property {Object} [stereo] - Stereo rendering configuration
 * @property {boolean} [stereo.enabled=false] - Enable SBS stereo rendering
 * @property {string} [stereo.mode='sbs'] - Stereo mode ('sbs')
 * @property {number} [stereo.eyeSeparation=0.064] - Eye separation in meters (clamped to 0.050-0.070m for screen comfort)
 * @property {Object} [vr] - VR configuration
 * @property {boolean} [vr.enabled=true] - Enable VR support
 * @property {string} [vr.performanceProfile='auto'] - VR performance profile ('auto', 'standalone', 'pcvr')
 * @property {number} [vr.foveation=1.0] - XR fixed foveation level, 0..1
 * @property {number} [vr.framebufferScaleFactor=1.0] - XR framebuffer scale; set below 1.0 for GPU-bound VR scenes
 * @property {string} [assetBasePath] - Base path for offline decoder/transcoder/WebXR assets
 * @property {string} [dracoDecoderPath] - DRACO decoder path for GLB and tileset loading
 * @property {string} [ktx2TranscoderPath] - KTX2/Basis transcoder path for GLB and tileset loading
 * @property {string} [webxrInputProfilesPath] - WebXR input profiles path for controller models
 * @property {Object} [ar] - AR configuration
 * @property {boolean} [ar.enabled=false] - Enable AR support
 * @property {Object} [ar.settings] - AR settings (hand tracking, world cube, etc.)
 */

/**
 * BelowViewer - Core 3D rendering engine for BelowJS
 * 
 * The low-level viewer that provides direct access to Three.js scene, camera, 
 * and renderer with VR capabilities and model loading. This is the foundation
 * class that powers ModelViewer and can be used directly for custom implementations.
 * 
 * @class BelowViewer
 * @extends EventSystem
 * 
 * @param {HTMLElement} container - DOM element to render into
 * @param {BelowViewerConfig} [config={}] - Configuration options
 * 
 * @fires BelowViewer#initialized - Fired when viewer is fully initialized
 * @fires BelowViewer#model-loaded - Fired when a model is loaded successfully
 * @fires BelowViewer#model-load-progress - Fired during model loading
 * @fires BelowViewer#model-load-error - Fired when model loading fails
 * @fires BelowViewer#vr-session-start - Fired when VR session begins
 * @fires BelowViewer#vr-session-end - Fired when VR session ends
 * @fires BelowViewer#camera-change - Fired when camera position changes
 * 
 * @example
 * // Basic usage
 * const viewer = new BelowViewer(document.getElementById('container'), {
 *   scene: {
 *     background: { type: 'color', value: '#041729' }
 *   },
 *   camera: {
 *     fov: 65,
 *     position: { x: 0, y: 5, z: 10 }
 *   },
 *   vr: {
 *     enabled: true
 *   }
 * });
 * 
 * // Load a model
 * viewer.loadModel('path/to/model.glb');
 * 
 * // Access Three.js objects directly
 * const scene = viewer.sceneManager.scene;
 * const camera = viewer.cameraManager.camera;
 * const renderer = viewer.renderer;
 * 
 * @since 1.0.0
 */
export class BelowViewer extends EventSystem {
  /**
   * Creates a new BelowViewer instance
   * 
   * @param {HTMLElement} container - DOM element to render into
   * @param {BelowViewerConfig} [config={}] - Configuration options
   */
  constructor(container, config = {}) {
    super();
    
    this.container = container;

    const schema = {
      scene: {
        type: 'object',
        default: {
          background: { type: 'color', value: '#001122' },
          fog: { enabled: false, color: '#001122', near: 10, far: 100 }
        },
        schema: {
          background: { type: ['object', 'string'], default: { type: 'color', value: '#001122' } },
          fog: { type: 'object', default: {} }
        }
      },
      camera: {
        type: 'object',
        default: {
          fov: 65,
          near: 0.05,
          far: 2000,
          position: { x: 0, y: 5, z: 10 },
          desktop: {
            enableDamping: true,
            dampingFactor: 0.08,
            maxDistance: 150,
            minDistance: 0.5
          }
        },
        schema: {
          fov: { type: 'number', default: 65 },
          near: { type: 'number', default: 0.05 },
          far: { type: 'number', default: 2000 },
          position: { type: 'object', default: {} },
          desktop: { type: 'object', default: {} }
        }
      },
      renderer: {
        type: 'object',
        default: {
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          logarithmicDepthBuffer: false,
          preserveDrawingBuffer: true,
          xrCompatible: false
        },
        schema: {
          antialias: { type: 'boolean', default: true },
          alpha: { type: 'boolean', default: false },
          powerPreference: { type: 'string', default: 'high-performance' },
          logarithmicDepthBuffer: { type: 'boolean', default: false },
          preserveDrawingBuffer: { type: 'boolean', default: true },
          xrCompatible: { type: 'boolean', default: false }
        }
      },
      stereo: {
        type: 'object',
        default: {
          enabled: false,
          mode: 'sbs',
          eyeSeparation: 0.064
        },
        schema: {
          enabled: { type: 'boolean', default: false },
          mode: { type: 'string', default: 'sbs' },
          eyeSeparation: { type: 'number', default: 0.064 }
        }
      },
      vr: {
        type: 'object',
        default: { enabled: true },
        schema: {
          enabled: { type: 'boolean', default: true },
          performanceProfile: { type: 'string', default: 'auto' },
          foveation: { type: 'number', default: 1.0 },
          framebufferScaleFactor: { type: 'number', default: 1.0 },
          shadowProfile: { type: 'string', default: 'reduced' }
        }
      },
      ar: {
        type: 'object',
        default: {
          enabled: false,
          settings: {
            enableHandTracking: true,
            enableWorldCube: true,
            defaultScale: 0.05,
            worldCubeSize: 20.0,
            worldCubeOpacity: 0.1
          }
        },
        schema: {
          enabled: { type: 'boolean', default: false },
          settings: { type: 'object', default: {} }
        }
      },
      audioPath: { type: 'string', default: './sound/' },
      enableVRAudio: { type: 'boolean', default: false },
      perfStats: { type: 'boolean', default: false },
      assetBasePath: { type: 'string', default: null },
      dracoDecoderPath: { type: 'string', default: null },
      ktx2TranscoderPath: { type: 'string', default: null },
      webxrInputProfilesPath: { type: 'string', default: null }
    };
    
    this.config = new ConfigValidator(schema).validate(config);
    this.config.vr = applyVRRenderProfileDefaults(
      this.config.vr,
      config?.vr?.performanceProfile || 'auto',
      config?.vr || {}
    );
    
    this.renderer = null;
    this.sceneManager = null;
    this.cameraManager = null;
    this.modelLoader = null;
    this.tilesetLoader = null;
    this.vrManager = null;
    this.arManager = null;
    this.stereoCamera = null;
    this.perfMonitor = null;

    this.isVREnabled = this.config.vr?.enabled !== false;
    this.isAREnabled = this.config.ar?.enabled === true;
    this.stereoEnabled = this.config.stereo?.enabled === true;
    this.stereoMode = this.config.stereo?.mode || 'sbs';
    // Clamp eye separation to comfortable range for screen-based stereo (50-70mm)
    // IMAX and cinema 3D use conservative ranges to prevent eye strain on flat displays
    const rawEyeSep = this.config.stereo?.eyeSeparation ?? 0.064;
    this.stereoEyeSeparation = Math.max(0.050, Math.min(0.070, rawEyeSep));
    if (this.stereoEyeSeparation !== rawEyeSep) {
      console.warn(`[BelowJS] Initial eye separation ${rawEyeSep}m clamped to ${this.stereoEyeSeparation}m (comfortable range for screens: 0.050-0.070m)`);
    }
    this.dolly = null;
    
    this.isInitialized = false;
    this.loadedModels = [];
    this.currentAbortController = null;
    this.skipRenderDuringLoad = false;
    this.pixelRatioBeforeThrottle = 1;
    this.originalPixelRatio = 1;
    this.isConstrainedSafari = false;
    
    this.init();
  }

  init() {
    try {
      this.initRenderer();
      
      this.sceneManager = new Scene(this.config.scene);
      this.cameraManager = new Camera(this.config.camera);
      this.modelLoader = new ModelLoader(this.renderer, this.config);
      this.tilesetLoader = new TilesetLoader(this.renderer, this.cameraManager.camera);
      this.isConstrainedSafari = this.modelLoader?.isIOSWebKit || false;
      this.initStereo();
      if (this.renderer?.getPixelRatio) {
        this.originalPixelRatio = this.renderer.getPixelRatio();
      } else if (typeof window !== 'undefined') {
        this.originalPixelRatio = window.devicePixelRatio || 1;
      }
      this.pixelRatioBeforeThrottle = this.originalPixelRatio;
      
      if (this.isVREnabled) {
        this.initVR();
      }

      if (this.isAREnabled) {
        this.initAR();
      }

      this.cameraManager.initControls(this.renderer.domElement);
      
      this.setupEventListeners();
      
      this.startRenderLoop();
      
      this.isInitialized = true;
      
      if (typeof window !== 'undefined') {
        DebugCommands.init(this);
      }

      if (this.config.perfStats) {
        this.setPerfStats(true);
      }

      this.emit('initialized');
      
    } catch (error) {
      console.error('Failed to initialize BelowViewer:', error);
      this.emit('error', error);
    }
  }

  initRenderer() {
    const rendererOptions = {
      antialias: this.config.renderer.antialias,
      alpha: this.config.renderer.alpha,
      powerPreference: this.config.renderer.powerPreference,
      logarithmicDepthBuffer: this.config.renderer.logarithmicDepthBuffer,
      preserveDrawingBuffer: this.config.renderer.preserveDrawingBuffer
    };

    if (this.config.renderer.xrCompatible && typeof document !== 'undefined') {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl2', {
        alpha: this.config.renderer.alpha,
        depth: true,
        stencil: false,
        antialias: this.config.renderer.antialias,
        premultipliedAlpha: true,
        preserveDrawingBuffer: this.config.renderer.preserveDrawingBuffer,
        powerPreference: this.config.renderer.powerPreference,
        failIfMajorPerformanceCaveat: false,
        xrCompatible: true
      });

      if (context) {
        rendererOptions.canvas = canvas;
        rendererOptions.context = context;
      } else {
        console.warn('XR-compatible WebGL2 context unavailable; falling back to default renderer context');
      }
    }

    this.renderer = new THREE.WebGLRenderer(rendererOptions);
    
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    // More flexible tone mapping from config
    const toneMappingMap = {
      'none': THREE.NoToneMapping,
      'linear': THREE.LinearToneMapping,
      'reinhard': THREE.ReinhardToneMapping,
      'cineon': THREE.CineonToneMapping,
      'aces-filmic': THREE.ACESFilmicToneMapping
    };
    
    if (this.config.renderer.toneMapping && toneMappingMap[this.config.renderer.toneMapping]) {
      this.renderer.toneMapping = toneMappingMap[this.config.renderer.toneMapping];
    }
    
    this.renderer.toneMappingExposure = this.config.renderer.toneMappingExposure;
    
    this.container.appendChild(this.renderer.domElement);
  }

  initStereo() {
    if (!this.stereoCamera) {
      this.stereoCamera = new THREE.StereoCamera();
    }
    this.stereoCamera.eyeSep = this.stereoEyeSeparation;
  }

  initVR() {
    this.dolly = new THREE.Group();
    this.dolly.add(this.cameraManager.camera);
    this.sceneManager.scene.add(this.dolly);
    
    const audioPath = this.config.audioPath || './sound/';
    // API change: audio disabled by default; must be explicitly enabled
    const enableAudio = this.config.enableVRAudio === true;
    this.vrManager = new VRManager(this.renderer, this.cameraManager.camera, this.sceneManager.scene, audioPath, enableAudio, this.container, this.config);
    this.applyXRFramebufferScaleFactor();
    

    this.vrManager.setControls(this.cameraManager.controls);
    
    // Pass initial positions to VRManager for proper restoration
    if (this.config.initialPositions) {
      this.vrManager.setInitialPositions(this.config.initialPositions);
    }
    
    this.vrManager.onModeToggle = () => {
      this.emit('vr-mode-toggle');
    };
    
    this.vrManager.onMovementStart = () => {
      this.emit('vr-movement-start');
    };
    
    this.vrManager.onMovementStop = () => {
      this.emit('vr-movement-stop');
    };
    
    this.vrManager.onMovementUpdate = (speed, boostLevel) => {
      this.emit('vr-movement-update', { speed, boostLevel });
    };
    
    this.vrManager.onSessionStart = () => {
      if (this.loadedModels.length > 0) {
        const currentModel = this.loadedModels[this.loadedModels.length - 1];
        if (currentModel.options && currentModel.options.initialPositions) {
          this.vrManager.applyVRPositions(currentModel.options.initialPositions);
        }
      }


      if (this.cameraManager.controls) {
        this.cameraManager.controls.enabled = false;
      }

      this.applyVRRenderProfile();

      this.emit('vr-session-start');
    };

    this.vrManager.onSessionEnd = () => {
      // VR session cleanup - VRManager handles camera restoration
      if (this.cameraManager.controls) {
        this.cameraManager.controls.enabled = true;
      }

      // Reset VR dolly to origin
      this.dolly.position.set(0, 0, 0);
      this.dolly.rotation.set(0, 0, 0);

      this.restoreDesktopRenderProfile();

      this.emit('vr-session-end');
    };

  }

  /**
   * Apply the configured VR render profile at XR session start.
   *
   * `vr.shadowProfile`: 'full' leaves shadows untouched; 'reduced' swaps
   * PCFSoft for plain PCF filtering (much cheaper per covered pixel on
   * mobile GPUs); 'off' disables shadow maps entirely while presenting.
   * The desktop state is restored on session end.
   */
  applyVRRenderProfile() {
    if (!this.renderer) return;

    this.applyXRFramebufferScaleFactor();

    const foveation = this.config.vr?.foveation;
    if (typeof foveation === 'number' && this.renderer.xr?.setFoveation) {
      this.renderer.xr.setFoveation(Math.min(1, Math.max(0, foveation)));
    }

    const profile = this.config.vr?.shadowProfile || 'reduced';
    if (profile === 'full') return;

    this._shadowStateBeforeVR = {
      enabled: this.renderer.shadowMap.enabled,
      type: this.renderer.shadowMap.type
    };

    if (profile === 'off') {
      this.renderer.shadowMap.enabled = false;
    } else {
      this.renderer.shadowMap.type = THREE.PCFShadowMap;
    }
    this._flagShadowMaterialsForRecompile();
  }

  applyXRFramebufferScaleFactor() {
    const scale = this.config.vr?.framebufferScaleFactor;
    if (
      typeof scale !== 'number'
      || !this.renderer?.xr?.setFramebufferScaleFactor
      || this.renderer.xr.isPresenting
    ) {
      return;
    }
    this.renderer.xr.setFramebufferScaleFactor(Math.min(1.5, Math.max(0.5, scale)));
  }

  restoreDesktopRenderProfile() {
    if (!this._shadowStateBeforeVR || !this.renderer) return;
    this.renderer.shadowMap.enabled = this._shadowStateBeforeVR.enabled;
    this.renderer.shadowMap.type = this._shadowStateBeforeVR.type;
    this._shadowStateBeforeVR = null;
    this._flagShadowMaterialsForRecompile();
  }

  _flagShadowMaterialsForRecompile() {
    // Shadow filtering is baked into the shaders, so a shadowMap.type or
    // enabled change only takes effect after materials recompile.
    this.sceneManager?.scene?.traverse((object) => {
      if (!object.isMesh || !object.material) return;
      if (Array.isArray(object.material)) {
        object.material.forEach((material) => { material.needsUpdate = true; });
      } else {
        object.material.needsUpdate = true;
      }
    });
  }

  /**
   * Enable or disable the runtime performance monitor.
   *
   * @param {boolean} enabled - Turn the monitor on or off
   * @param {Object} [options] - Monitor options
   * @param {boolean} [options.overlay=true] - Show the DOM overlay readout
   * @returns {PerfMonitor|null} The active monitor, if any
   */
  setPerfStats(enabled, options = {}) {
    if (enabled && !this.perfMonitor) {
      this.perfMonitor = new PerfMonitor(this.renderer, {
        tilesetLoader: this.tilesetLoader,
        overlay: options.overlay !== false,
        overlayContainer: typeof document !== 'undefined' ? document.body : null
      });
    } else if (!enabled && this.perfMonitor) {
      this.perfMonitor.dispose();
      this.perfMonitor = null;
    }
    return this.perfMonitor;
  }

  initAR() {
    const arSettings = this.config.ar?.settings || {};
    this.arManager = new ARManager(
      this.renderer,
      this.cameraManager.camera,
      this.sceneManager.scene,
      arSettings,
      this.container,
      this.config
    );

    this.arManager.on('session-start', () => {
      if (this.cameraManager.controls) {
        this.cameraManager.controls.enabled = false;
      }

      this.emit('ar-session-start');
    });

    this.arManager.on('session-end', () => {
      if (this.cameraManager.controls) {
        this.cameraManager.controls.enabled = true;
      }

      this.emit('ar-session-end');
    });

    this.arManager.on('session-pause', () => {
      this.emit('ar-session-pause');
    });

    this.arManager.on('session-resume', (session) => {
      if (this.cameraManager.controls) {
        this.cameraManager.controls.enabled = false;
      }

      this.emit('ar-session-resume', session);
    });

    this.arManager.on('gesture-start', (gestureType) => {
      this.emit('ar-gesture-start', gestureType);
    });

    this.arManager.on('gesture-end', (gestureType) => {
      this.emit('ar-gesture-end', gestureType);
    });

    this.on('model-loaded', ({ model, options }) => {
      if (this.arManager) {
        this.arManager.setTargetModel(model, options);
      }
    });
  }

  setupEventListeners() {
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    if (this.cameraManager) {
      this.cameraManager.on('change', () => {
        this.emit('camera-change');
      });
    }
  }

  onWindowResize() {
    // WebXR owns the projection layer dimensions while presenting. Quest can
    // emit window resize events during headset visibility transitions; do not
    // let the desktop resize path touch camera/renderer sizing in that epoch.
    if (!this.isInitialized || this.renderer?.xr?.isPresenting) return;
    
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    
    this.cameraManager.setSize(width, height);
    this.renderer.setSize(width, height);
    if (this.tilesetLoader) {
      this.tilesetLoader.updateResolution();
    }
    
    this.emit('resize', { width, height });
  }

  /**
   * Load a 3D model from a URL
   * 
   * @async
   * @method loadModel
   * @param {string} url - Path to the GLB model file
   * @param {Object} [options={}] - Loading options
   * @param {AbortSignal} [options.signal] - AbortSignal for cancelling the load
   * @param {Function} [options.onProgress] - Progress callback function
   * @param {Object} [options.initialPositions] - Camera positions for this model
   * @param {string} [options.type='gltf'] - Model type ('gltf' or 'tileset')
   * @param {number} [options.errorTarget] - Tileset SSE target for streaming refinement
   * @param {number} [options.maxDepth] - Tileset traversal depth limit
   * @param {boolean} [options.loadSiblings] - Load sibling tiles for smoother refinement
   * @param {boolean} [options.loadAncestors] - Keep coarse ancestors visible while detailed children load
   * @param {boolean} [options.optimizedLoadStrategy] - Deprecated alias; true sets loadAncestors=false
   * @param {number} [options.maxTilesProcessed] - Tiles processed per frame for streaming tilesets
   * @param {number} [options.ktxWorkerLimit] - KTX2 transcoder workers; defaults by VR performance profile
   * @param {Object} [options.fetchOptions] - Fetch options for tileset network requests
   * @param {string} [options.up='+Y'] - Up-axis hint for tilesets ('+Y', '+Z', '-Z', '+X', '-X', '-Y')
   * @param {boolean|string} [options.geospatialReorientation='auto'] - Auto-level geospatial tilesets ('auto' | 'force' | false)
   * @param {boolean} [options.autoCenter=true] - Recenter streamed tilesets around origin as bounds become available
   * @param {number} [options.maxTriangles] - Approximate triangle budget for adaptive LOD (best-effort)
   * @param {number} [options.vrMaxTriangles] - VR-only triangle budget for adaptive LOD
   * @param {number} [options.minErrorTarget=2] - Lower clamp for adaptive errorTarget when maxTriangles is set
   * @param {number} [options.maxErrorTarget=64] - Upper clamp for adaptive errorTarget when maxTriangles is set
   * @param {boolean} [options.enableGltfExtensions=true] - Enable GLTFExtensionsPlugin (DRACO/KTX2/RTC) for tilesets
   * @param {string} [options.dracoDecoderPath] - Optional DRACO decoder path for GLTFExtensionsPlugin
   * @param {string} [options.ktx2TranscoderPath] - Optional KTX2 transcoder path for GLTFExtensionsPlugin
   * @returns {Promise<THREE.Object3D>} Promise that resolves to the loaded model
   * 
   * @fires BelowViewer#model-loaded - When model loads successfully
   * @fires BelowViewer#model-load-progress - During loading progress
   * @fires BelowViewer#model-load-error - When loading fails
   * 
   * @example
   * // Load a model with progress tracking
   * try {
   *   const model = await viewer.loadModel('model.glb', {
   *     onProgress: (progress) => {
   *       // Update loading UI with progress percentage
   *       const percent = Math.round(progress.loaded / progress.total * 100);
   *     }
   *   });
   *   // Model loaded successfully
   * } catch (error) {      
   *   console.error('Failed to load model:', error);
   * }
   * 
   * @since 1.0.0
   */
  async loadModel(url, options = {}) {

    if (this.currentAbortController) {
      this.currentAbortController.abort();
    }
    
    this.currentAbortController = new AbortController();
    const signal = this.currentAbortController.signal;
    
    const shouldThrottleRendering = this.isConstrainedSafari;
    try {
      this.emit('model-load-start', { url });
      if (shouldThrottleRendering) {
        this.applyLoadRenderingConstraints(true);
      }
      
      const onProgress = (progress) => {
        if (!signal.aborted) {
          this.emit('model-load-progress', { url, progress });
        }
      };
      const onStageChange = (stage) => {
        if (!signal.aborted) {
          this.emit('model-load-stage', { url, stage });
        }
      };
      
      let model;
      let tileset = null;
      if (options.type === 'tileset') {
        if (onStageChange) {
          onStageChange('downloading');
        }
        const tilesetResult = await this.tilesetLoader.load(url, {
          signal,
          errorTarget: options.errorTarget,
          maxDepth: options.maxDepth,
          loadSiblings: options.loadSiblings,
          loadAncestors: options.loadAncestors,
          optimizedLoadStrategy: options.optimizedLoadStrategy,
          maxTilesProcessed: options.maxTilesProcessed,
          ktxWorkerLimit: options.ktxWorkerLimit,
          fetchOptions: options.fetchOptions,
          up: options.up,
          autoCenter: options.autoCenter,
          maxTriangles: options.maxTriangles,
          vrMaxTriangles: options.vrMaxTriangles,
          vrPerformanceProfile: options.vrPerformanceProfile || this.config.vr?.performanceProfile,
          resolvedVRPerformanceProfile: this.config.vr?.resolvedPerformanceProfile,
          minErrorTarget: options.minErrorTarget,
          maxErrorTarget: options.maxErrorTarget,
          tileCastShadow: options.tileCastShadow,
          tileReceiveShadow: options.tileReceiveShadow,
          tileLighting: options.tileLighting,
          vrShadowCasterMode: options.vrShadowCasterMode,
          vrMaxShadowCastingTiles: options.vrMaxShadowCastingTiles,
          vrShadowCasterRadius: options.vrShadowCasterRadius,
          shadowCasterUpdateIntervalMs: options.shadowCasterUpdateIntervalMs,
          idleGating: options.idleGating,
          idlePositionEpsilon: options.idlePositionEpsilon,
          idleAngleEpsilon: options.idleAngleEpsilon,
          idleHeartbeatMs: options.idleHeartbeatMs,
          vrErrorTargetFloor: options.vrErrorTargetFloor,
          vrMaxDepth: options.vrMaxDepth,
          usePerEyeCameras: options.usePerEyeCameras,
          boundsUpdateIntervalMs: options.boundsUpdateIntervalMs,
          enableGltfExtensions: options.enableGltfExtensions,
          assetBasePath: options.assetBasePath || this.config.assetBasePath,
          dracoDecoderPath: options.dracoDecoderPath || this.config.dracoDecoderPath,
          ktx2TranscoderPath: options.ktx2TranscoderPath || this.config.ktx2TranscoderPath
        });
        model = tilesetResult.group;
        tileset = tilesetResult.tileset;
        if (onStageChange) {
          onStageChange('processing');
        }
      } else {
        model = await this.modelLoader.load(url, onProgress, signal, onStageChange);
      }
      
      if (signal.aborted) {
        return null;
      }
      
      if (options.position) {
        model.position.fromArray(options.position);
      }
      if (options.rotation) {
        model.rotation.fromArray(options.rotation);
      }
      if (options.scale) {
        if (typeof options.scale === 'number') {
          model.scale.setScalar(options.scale);
        } else {
          model.scale.fromArray(options.scale);
        }
      }
      

      const originalCenter = this.centerModelAndRecalculateBounds(model);
      
      this.sceneManager.add(model);
      this.loadedModels.push({ model, url, options, originalCenter, tileset });
      if (options.autoClip !== false) {
        this.fitCameraClippingToModel(model, options.cameraFarMultiplier ?? 2);
      }
      
      if (this.loadedModels.length === 1 && options.autoFrame !== false) {
        this.frameModel(model);
      }
      this.cameraManager?.resetControlInteractionState?.();
      
      if (this.currentAbortController && this.currentAbortController.signal === signal) {
        this.currentAbortController = null;
      }
      
      if (onStageChange) {
        onStageChange('completed');
      }
      this.emit('model-loaded', { model, url });
      return model;
      
    } catch (error) {
      if (this.currentAbortController && this.currentAbortController.signal === signal) {
        this.currentAbortController = null;
      }
      

      if (!signal.aborted && error.message !== 'Loading cancelled') {
        console.error('Failed to load model:', error);
        this.emit('model-load-error', { url, error });
        throw error;
      } else if (signal.aborted || error.message === 'Loading cancelled') {
        this.emit('model-load-cancelled', { url });
        return null;
      }
      
      throw error;
    } finally {
      if (shouldThrottleRendering) {
        this.applyLoadRenderingConstraints(false);
      }
    }
  }

  frameModel(model) {
    const box = this.getValidModelBoundingBox(model);
    if (!box) {
      return;
    }

    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    
    this.cameraManager.frameObject(center, size);
  }

  fitCameraClippingToModel(model, multiplier = 2) {
    const box = this.getValidModelBoundingBox(model);
    if (!box || !this.cameraManager) {
      return null;
    }

    const size = box.getSize(new THREE.Vector3());
    const modelSize = Math.max(size.length(), size.x, size.y, size.z, 0.001);
    const farMultiplier = Math.max(Number(multiplier) || 2, 1);
    const minimumFar = modelSize * farMultiplier;
    const clipping = this.cameraManager.ensureMinimumFar(minimumFar);

    this.emit('camera-clipping-change', {
      model,
      modelSize,
      multiplier: farMultiplier,
      ...clipping
    });

    return {
      modelSize,
      multiplier: farMultiplier,
      ...clipping
    };
  }

  fitCameraClipping(multiplier = 2) {
    if (!this.loadedModels.length) {
      return null;
    }

    const bounds = new THREE.Box3();
    let hasBounds = false;
    this.loadedModels.forEach(({ model }) => {
      const box = this.getValidModelBoundingBox(model);
      if (!box) return;
      bounds.union(box);
      hasBounds = true;
    });

    if (!hasBounds) {
      return null;
    }

    const tempGroup = new THREE.Group();
    tempGroup.userData.boundingBox = bounds;
    return this.fitCameraClippingToModel(tempGroup, multiplier);
  }

  setCameraClipping({ near, far } = {}) {
    if (!this.cameraManager) {
      return null;
    }

    const clipping = this.cameraManager.setClipping({ near, far });
    this.emit('camera-clipping-change', clipping);
    return clipping;
  }

  setCameraFar(far) {
    return this.setCameraClipping({ far });
  }

  isValidBox3(box) {
    if (!box || !(box instanceof THREE.Box3)) {
      return false;
    }

    if (box.isEmpty()) {
      return false;
    }

    return Number.isFinite(box.min.x)
      && Number.isFinite(box.min.y)
      && Number.isFinite(box.min.z)
      && Number.isFinite(box.max.x)
      && Number.isFinite(box.max.y)
      && Number.isFinite(box.max.z);
  }

  getValidModelBoundingBox(model) {
    if (this.isValidBox3(model?.userData?.boundingBox)) {
      return model.userData.boundingBox;
    }

    const computedBox = new THREE.Box3().setFromObject(model);
    if (this.isValidBox3(computedBox)) {
      model.userData.boundingBox = computedBox;
      return computedBox;
    }

    return null;
  }

  /**
   * Centers the model at the origin and recalculates its bounding box.
   * Note: This method modifies the model's position as a side effect.
   * 
   * @param {THREE.Object3D} model - The model to center.
   * @returns {THREE.Vector3} The original center offset for reference.
   */
  centerModelAndRecalculateBounds(model) {
    const box = this.getValidModelBoundingBox(model);
    if (!box) {
      return new THREE.Vector3();
    }

    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    const recomputedBox = new THREE.Box3().setFromObject(model);
    if (this.isValidBox3(recomputedBox)) {
      model.userData.boundingBox = recomputedBox;
    } else {
      // Tilesets can still be streaming and have no loaded meshes yet.
      // Preserve a usable box by translating the known bounds by the applied center offset.
      model.userData.boundingBox = box.clone().translate(center.clone().multiplyScalar(-1));
    }
    
    return center; // Return the original center offset for reference
  }

  startRenderLoop() {
    let lastTime = 0;
    let lastVRTilesUpdateTimeMs = 0;

    const animate = (time) => {
      const deltaTime = Math.min((time - lastTime) / 1000, 0.1);
      if (this.perfMonitor && lastTime > 0) {
        this.perfMonitor.sample(time - lastTime);
      }
      lastTime = time;

      if (this.vrManager) {
        this.vrManager.update(deltaTime);
      }

      if (this.arManager) {
        this.arManager.update(deltaTime * 1000);
      }


      if (this.cameraManager) {
        this.cameraManager.update();
      }
      

      this.emit('before-render', deltaTime);
      
      const isXRPresenting = this.renderer?.xr?.isPresenting;
      if (this.renderer && this.sceneManager && this.cameraManager) {
        const renderScene = () => {
          if (!this.skipRenderDuringLoad || isXRPresenting) {
            // Use SBS stereo rendering only when enabled and NOT in VR/XR mode
            // (VR headsets provide native stereoscopic rendering)
            if (this.stereoEnabled && !isXRPresenting && this.stereoMode === 'sbs') {
              this.renderSbsStereo();
            } else {
              this.renderer.render(this.sceneManager.scene, this.cameraManager.camera);
            }
          }
        };

        // In VR, prioritize rendering first and throttle tile update work to
        // reduce locomotion hitches from streaming/parsing bursts.
        if (isXRPresenting) {
          this.tilesetLoader?.setXRSession(this.renderer.xr.getSession());
          renderScene();

          if (this.tilesetLoader) {
            const movement = this.vrManager?.getVRStatus?.().movement;
            const isMoving = movement?.isMoving === true;
            const nowMs = (typeof performance !== 'undefined' && typeof performance.now === 'function')
              ? performance.now()
              : time;

            // Idle gating inside TilesetLoader covers the stationary case, so the
            // still interval only bounds how often the epsilon check itself runs.
            const minUpdateIntervalMs = isMoving ? 28 : 33;
            const shouldUpdateTiles = (nowMs - lastVRTilesUpdateTimeMs) >= minUpdateIntervalMs;

            if (shouldUpdateTiles) {
              const activeTilesCamera = this.renderer.xr.getCamera(this.cameraManager.camera);
              this.tilesetLoader.update(activeTilesCamera, {
                isXR: true,
                queueOptions: {
                  maxTasks: isMoving ? 1 : 2,
                  timeBudgetMs: isMoving ? 0.7 : 1.5
                }
              });
              lastVRTilesUpdateTimeMs = nowMs;
            }
          }
        } else {
          this.tilesetLoader?.setXRSession(null);
          if (this.tilesetLoader) {
            const activeTilesCamera = this.cameraManager.camera;
            // Budget queue ticks on desktop too: unbudgeted draining lands
            // several parsed tiles in one frame, and their first-draw GPU
            // uploads stack into a visible hitch.
            this.tilesetLoader.update(activeTilesCamera, {
              queueOptions: {
                maxTasks: 4,
                timeBudgetMs: 2
              }
            });
          }
          renderScene();
        }
      }
    };
    

    this.renderer.setAnimationLoop(animate);
  }

  renderSbsStereo() {
    if (!this.stereoCamera || !this.renderer || !this.sceneManager || !this.cameraManager) {
      return;
    }

    const size = this.renderer.getSize(new THREE.Vector2());
    const width = size.width;
    const height = size.height;
    const halfWidth = Math.floor(width / 2);
    const rightWidth = width - halfWidth;

    // Calculate aspect ratio for each eye viewport (width/height)
    this.stereoCamera.aspect = height > 0 ? halfWidth / height : 1.0;
    this.stereoCamera.update(this.cameraManager.camera);

    this.renderer.setScissorTest(true);

    this.renderer.setViewport(0, 0, halfWidth, height);
    this.renderer.setScissor(0, 0, halfWidth, height);
    this.renderer.render(this.sceneManager.scene, this.stereoCamera.cameraL);

    this.renderer.setViewport(halfWidth, 0, rightWidth, height);
    this.renderer.setScissor(halfWidth, 0, rightWidth, height);
    this.renderer.render(this.sceneManager.scene, this.stereoCamera.cameraR);

    this.renderer.setScissorTest(false);
    this.renderer.setViewport(0, 0, width, height);
  }

  /**
   * Enable or disable stereo rendering.
   *
   * Note: Stereo rendering (SBS) is automatically disabled when entering VR/XR mode,
   * as VR headsets provide native stereoscopic rendering. When exiting VR, stereo
   * rendering will resume if it was enabled before entering VR.
   *
   * @param {boolean} enabled - Whether stereo rendering is enabled.
   */
  setStereoEnabled(enabled) {
    this.stereoEnabled = enabled === true;
    if (this.stereoEnabled) {
      this.initStereo();
    }
  }

  /**
   * Set the eye separation distance for stereo rendering.
   *
   * @param {number} eyeSeparation - Eye separation in meters (clamped to 0.050-0.070m for screen comfort).
   */
  setStereoEyeSeparation(eyeSeparation) {
    if (typeof eyeSeparation !== 'number' || Number.isNaN(eyeSeparation)) {
      return;
    }
    // Clamp to comfortable range for screen-based stereo: 50mm to 70mm
    // IMAX and cinema 3D use conservative interaxial distances (often 50-65mm)
    // to prevent eye strain and dizziness on flat displays. This is smaller than
    // natural human IPD range (55-75mm) because screens lack depth cues of real world.
    const clampedSeparation = Math.max(0.050, Math.min(0.070, eyeSeparation));
    if (clampedSeparation !== eyeSeparation) {
      console.warn(`[BelowJS] Eye separation ${eyeSeparation}m clamped to ${clampedSeparation}m (comfortable range for screens: 0.050-0.070m)`);
    }
    this.stereoEyeSeparation = clampedSeparation;
    if (this.stereoCamera) {
      this.stereoCamera.eyeSep = clampedSeparation;
    }
  }

  /**
   * Set the stereo mode (currently only 'sbs').
   *
   * @param {string} mode - Stereo mode string.
   */
  setStereoMode(mode) {
    if (mode !== 'sbs') {
      return;
    }
    this.stereoMode = mode;
  }

  /**
   * Get the current stereo configuration.
   *
   * @returns {{enabled: boolean, mode: string, eyeSeparation: number}}
   */
  getStereoSettings() {
    return {
      enabled: this.stereoEnabled,
      mode: this.stereoMode,
      eyeSeparation: this.stereoEyeSeparation
    };
  }

  applyLoadRenderingConstraints(isLoading) {
    if (!this.isConstrainedSafari || !this.renderer) {
      return;
    }

    if (isLoading) {
      this.pixelRatioBeforeThrottle = this.renderer.getPixelRatio ? this.renderer.getPixelRatio() : this.originalPixelRatio;
      if (typeof this.renderer.setPixelRatio === 'function') {
        const targetRatio = Math.min(this.pixelRatioBeforeThrottle || this.originalPixelRatio, 1.25);
        this.renderer.setPixelRatio(targetRatio);
      }
      this.skipRenderDuringLoad = true;
    } else {
      if (typeof this.renderer.setPixelRatio === 'function') {
        this.renderer.setPixelRatio(this.pixelRatioBeforeThrottle || this.originalPixelRatio);
      }
      this.skipRenderDuringLoad = false;
    }
  }


  getScene() {
    return this.sceneManager?.scene;
  }

  /**
   * Get the Three.js camera instance
   * 
   * @method getCamera
   * @returns {THREE.PerspectiveCamera|null} The Three.js camera or null if not initialized
   * 
   * @example
   * // Access camera directly
   * const camera = viewer.getCamera();
   * if (camera) {
   *   camera.position.set(10, 5, 15);
   * }
   * 
   * @since 1.0.0
   */
  getCamera() {
    return this.cameraManager?.camera;
  }

  setOrthographicCamera() {
    if (!this.cameraManager) {
      return null;
    }

    const camera = this.cameraManager.setOrthographic(
      this.container?.clientWidth || window.innerWidth,
      this.container?.clientHeight || window.innerHeight
    );
    this.syncCameraReferences(camera);
    this.emit('camera-projection-change', { projection: 'orthographic', camera });
    return camera;
  }

  setPerspectiveCamera() {
    if (!this.cameraManager) {
      return null;
    }

    const camera = this.cameraManager.setPerspective(
      this.container?.clientWidth || window.innerWidth,
      this.container?.clientHeight || window.innerHeight
    );
    this.syncCameraReferences(camera);
    this.emit('camera-projection-change', { projection: 'perspective', camera });
    return camera;
  }

  syncCameraReferences(camera = this.cameraManager?.camera) {
    if (!camera) {
      return;
    }

    this.tilesetLoader?.setCamera?.(camera);
    this.vrManager?.setCamera?.(camera);
    this.arManager?.setCamera?.(camera);
    this.diveSystem?.setCamera?.(camera);

    if (this.measurementSystem) {
      if (typeof this.measurementSystem.setCamera === 'function') {
        this.measurementSystem.setCamera(camera);
      } else {
        this.measurementSystem.camera = camera;
      }
    }
  }

  /**
   * Get the Three.js WebGL renderer instance
   * 
   * @method getRenderer
   * @returns {THREE.WebGLRenderer|null} The Three.js renderer or null if not initialized
   * 
   * @example
   * // Configure renderer directly
   * const renderer = viewer.getRenderer();
   * if (renderer) {
   *   renderer.shadowMap.enabled = true;
   * }
   * 
   * @since 1.0.0
   */
  getRenderer() {
    return this.renderer;
  }

  /**
   * Get all loaded models
   * 
   * @method getLoadedModels
   * @returns {Array<Object>} Array of loaded model objects with metadata
   * 
   * @example
   * // List all loaded models
   * const models = viewer.getLoadedModels();
   * // Process models array (length: models.length)
   * 
   * @since 1.0.0
   */
  getLoadedModels() {
    return this.loadedModels;
  }

  /**
   * Get the most recently loaded model
   * 
   * @method getCurrentModel
   * @returns {THREE.Object3D|null} The current model object or null if none loaded
   * 
   * @example
   * // Get current model and modify it
   * const model = viewer.getCurrentModel();
   * if (model) {
   *   model.visible = false;
   * }
   * 
   * @since 1.0.0
   */
  getCurrentModel() {
    return this.loadedModels.length > 0 ? this.loadedModels[this.loadedModels.length - 1] : null;
  }

  removeModel(model) {
    const index = this.loadedModels.findIndex(item => item.model === model);
    if (index >= 0) {
      const { url, tileset } = this.loadedModels[index];
      this.sceneManager.remove(model);
      if (tileset && this.tilesetLoader) {
        this.tilesetLoader.disposeTileset(tileset);
      }
      disposeObject3D(model);
      this.loadedModels.splice(index, 1);
      this.emit('model-removed', { model });

      const isUrlStillInUse = this.loadedModels.some(item => item.url === url);
      if (!isUrlStillInUse && this.modelLoader) {
        this.modelLoader.releaseFromCache(url);
      }
    }
  }

  clearModels() {
    if (this.arManager) {
      this.arManager.setTargetModel(null);
    }

    const urlsToRelease = new Set(this.loadedModels.map(({ url }) => url));

    this.loadedModels.forEach(({ model, tileset }) => {
      if (tileset && this.tilesetLoader) {
        this.tilesetLoader.disposeTileset(tileset);
      }
      disposeObject3D(model);
      this.sceneManager.remove(model);
    });

    this.loadedModels.length = 0;
    urlsToRelease.forEach((url) => {
      if (this.modelLoader) {
        this.modelLoader.releaseFromCache(url);
      }
    });
    this.cameraManager?.resetControlInteractionState?.();
    this.emit('models-cleared');
  }

  /**
   * Clean up and dispose of all resources
   * 
   * Properly disposes of the renderer, scene, models, and all associated resources.
   * Call this when you're done with the viewer to prevent memory leaks.
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

    if (this.currentAbortController) {
      this.currentAbortController.abort();
    }
    
    if (typeof window !== 'undefined') {
      DebugCommands.cleanup();
    }
    
    if (this.vrManager) {
      this.vrManager.dispose();
      this.vrManager = null;
    }

    if (this.arManager) {
      this.arManager.dispose();
      this.arManager = null;
    }

    if (this.renderer) {
      this.renderer.setAnimationLoop(null);
    }
    
    this.loadedModels.forEach(({ model, tileset }) => {
      if (model.parent) {
        model.parent.remove(model);
      }
      if (tileset && this.tilesetLoader) {
        this.tilesetLoader.disposeTileset(tileset);
      }
      disposeObject3D(model);
    });
    this.loadedModels = [];
    

    if (this.cameraManager) {
      this.cameraManager.dispose();
      this.cameraManager = null;
    }
    

    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
      this.renderer = null;
    }
    
    if (this.modelLoader) {
      this.modelLoader.dispose();
      this.modelLoader = null;
    }

    if (this.tilesetLoader) {
      this.tilesetLoader.dispose();
      this.tilesetLoader = null;
    }

    if (this.perfMonitor) {
      this.perfMonitor.dispose();
      this.perfMonitor = null;
    }

    window.removeEventListener('resize', this.onWindowResize.bind(this));
    
    this.removeAllListeners();
    
    this.isInitialized = false;
  }
  
  applyDesktopPositions(positions) {
    if (!positions || !this.cameraManager) return;
    

    const applyPositions = () => {
      if (positions.camera) {
        this.cameraManager.camera.position.set(
          positions.camera.x,
          positions.camera.y,
          positions.camera.z
        );
      }
      
      if (positions.target && this.cameraManager.controls) {
        this.cameraManager.controls.target.set(
          positions.target.x,
          positions.target.y,
          positions.target.z
        );
        

        this.cameraManager.controls.update();
        

        requestAnimationFrame(() => {
          this.cameraManager.controls.update();
        });
      }
      
    };
    

    applyPositions();
    setTimeout(applyPositions, 50);
  }


  isVRPresenting() {
    return this.vrManager ? this.vrManager.isVRPresenting : false;
  }

  getVRManager() {
    return this.vrManager;
  }


  /**
   * Set VR comfort settings for motion sickness reduction
   * 
   * @method setVRComfortSettings
   * @param {Object} settings - VR comfort configuration
   * @param {boolean} [settings.enableComfort] - Enable comfort features
   * @param {number} [settings.comfortRadius] - Radius of comfort zone
   * @param {number} [settings.fadeDistance] - Distance for fade effect
   * @returns {void}
   * 
   * @example
   * // Configure VR comfort
   * viewer.setVRComfortSettings({
   *   enableComfort: true,
   *   comfortRadius: 0.4
   * });
   * 
   * @since 1.0.0
   */
  setVRComfortSettings(settings) {
    if (this.vrManager) {
      this.vrManager.setComfortSettings(settings);
    }
  }
  
  /**
   * Get current VR comfort settings
   * 
   * @method getVRComfortSettings
   * @returns {Object|null} Current VR comfort settings or null if VR not enabled
   * 
   * @example
   * // Check current settings
   * const settings = viewer.getVRComfortSettings();
   * // Access comfort settings: settings?.enableComfort
   * 
   * @since 1.0.0
   */
  getVRComfortSettings() {
    return this.vrManager ? this.vrManager.getComfortSettings() : null;
  }
  
  /**
   * Apply a predefined VR comfort preset
   * 
   * @method setVRComfortPreset
   * @param {string} preset - Preset name ('conservative', 'moderate', 'advanced')
   * @returns {void}
   * 
   * @example
   * // Use conservative comfort settings
   * viewer.setVRComfortPreset('conservative');
   * 
   * @since 1.0.0
   */
  setVRComfortPreset(preset) {
    if (this.vrManager) {
      return this.vrManager.setComfortPreset(preset);
    }
    return false;
  }

  /**
   * Enable or disable comfort mode.
   *
   * Works while in VR and before entering VR by pre-configuring locomotion settings.
   *
   * @param {boolean} enabled
   * @returns {boolean}
   */
  setVRComfortMode(enabled) {
    if (this.vrManager) {
      return this.vrManager.setComfortMode(enabled);
    }
    return false;
  }

  /**
   * Toggle comfort mode and return the new state.
   *
   * @returns {boolean}
   */
  toggleVRComfortMode() {
    if (this.vrManager) {
      return this.vrManager.toggleComfortMode();
    }
    return false;
  }

  /**
   * Check if comfort mode is enabled.
   *
   * @returns {boolean}
   */
  isVRComfortModeEnabled() {
    if (this.vrManager) {
      return this.vrManager.isComfortModeEnabled();
    }
    return false;
  }


  applyInitialPositions(positions) {
    if (!positions) return;
    
    const isVRMode = this.isVRPresenting();
    
    if (isVRMode && positions.vr && this.vrManager) {
      this.vrManager.applyVRPositions(positions);
    } else if (!isVRMode && positions.desktop) {
      this.applyDesktopPositions(positions.desktop);
    }
  }
}
