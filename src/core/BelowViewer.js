import * as THREE from 'three';
import { EventSystem } from '../utils/EventSystem.js';
import { ConfigValidator } from '../utils/ConfigValidator.js';
import { Scene } from './Scene.js';
import { Camera } from './Camera.js';
import { ModelLoader } from '../models/ModelLoader.js';
import { VRManager } from './VRManager.js';
import { DebugCommands } from './DebugCommands.js';

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
 * @property {Object} [vr] - VR configuration
 * @property {boolean} [vr.enabled=true] - Enable VR support
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
            maxDistance: 100,
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
          powerPreference: 'high-performance'
        },
        schema: {
          antialias: { type: 'boolean', default: true },
          alpha: { type: 'boolean', default: false },
          powerPreference: { type: 'string', default: 'high-performance' }
        }
      },
      vr: {
        type: 'object',
        default: { enabled: true },
        schema: {
          enabled: { type: 'boolean', default: true }
        }
      },
      audioPath: { type: 'string', default: './sound/' },
      enableVRAudio: { type: 'boolean', default: false }
    };
    
    this.config = new ConfigValidator(schema).validate(config);
    
    this.renderer = null;
    this.sceneManager = null;
    this.cameraManager = null;
    this.modelLoader = null;
    this.vrManager = null;
    
    this.isVREnabled = this.config.vr?.enabled !== false;
    this.dolly = null;
    
    this.isInitialized = false;
    this.loadedModels = [];
    this.currentAbortController = null;
    
    this.init();
  }

  init() {
    try {
      this.initRenderer();
      
      this.sceneManager = new Scene(this.config.scene);
      this.cameraManager = new Camera(this.config.camera);
      this.modelLoader = new ModelLoader(this.renderer);
      
      if (this.isVREnabled) {
        this.initVR();
      }
      
      this.cameraManager.initControls(this.renderer.domElement);
      
      this.setupEventListeners();
      
      this.startRenderLoop();
      
      this.isInitialized = true;
      
      if (typeof window !== 'undefined') {
        DebugCommands.init(this);
      }
      
      this.emit('initialized');
      
    } catch (error) {
      console.error('Failed to initialize BelowViewer:', error);
      this.emit('error', error);
    }
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: this.config.renderer.antialias,
      alpha: this.config.renderer.alpha,
      powerPreference: this.config.renderer.powerPreference
    });
    
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    if (this.config.renderer.toneMapping === 'aces-filmic') {
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    } else if (this.config.renderer.toneMapping === 'none') {
      this.renderer.toneMapping = THREE.NoToneMapping;
    }
    this.renderer.toneMappingExposure = this.config.renderer.toneMappingExposure;
    
    this.container.appendChild(this.renderer.domElement);
  }

  initVR() {
    this.dolly = new THREE.Group();
    this.dolly.add(this.cameraManager.camera);
    this.sceneManager.scene.add(this.dolly);
    
  const audioPath = this.config.audioPath || './sound/';
  // API change: audio disabled by default; must be explicitly enabled
  const enableAudio = this.config.enableVRAudio === true;
    this.vrManager = new VRManager(this.renderer, this.cameraManager.camera, this.sceneManager.scene, audioPath, enableAudio, this.container);
    

    this.vrManager.setControls(this.cameraManager.controls);
    
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
      
      this.emit('vr-session-start');
    };
    
    this.vrManager.onSessionEnd = () => {

      if (this.cameraManager.controls) {
        this.cameraManager.controls.enabled = true;
        this.cameraManager.controls.update();
      }
      
      this.dolly.position.set(0, 0, 0);
      this.dolly.rotation.set(0, 0, 0);
      
      if (this.loadedModels.length > 0) {
        const currentModel = this.loadedModels[this.loadedModels.length - 1];
        if (currentModel.options && currentModel.options.initialPositions && currentModel.options.initialPositions.desktop) {
          this.applyDesktopPositions(currentModel.options.initialPositions.desktop);
        }
      }
      
      this.emit('vr-session-end');
    };
    
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
    if (!this.isInitialized) return;
    
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    
    this.cameraManager.setSize(width, height);
    this.renderer.setSize(width, height);
    
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
    
    try {
      this.emit('model-load-start', { url });
      
      const onProgress = (progress) => {
        if (!signal.aborted) {
          this.emit('model-load-progress', { url, progress });
        }
      };
      
      const model = await this.modelLoader.load(url, onProgress, signal);
      
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
      

      const originalCenter = this.centerModel(model);
      
      this.sceneManager.add(model);
      this.loadedModels.push({ model, url, options, originalCenter });
      
      if (this.loadedModels.length === 1 && options.autoFrame !== false) {
        this.frameModel(model);
      }
      
      if (this.currentAbortController && this.currentAbortController.signal === signal) {
        this.currentAbortController = null;
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
    }
  }

  frameModel(model) {
    if (!model.userData.boundingBox) {
      const box = new THREE.Box3().setFromObject(model);
      model.userData.boundingBox = box;
    }
    
    const box = model.userData.boundingBox;
    const size = box.getSize(new THREE.Vector3()).length();
    const center = box.getCenter(new THREE.Vector3());
    
    this.cameraManager.frameObject(center, size);
  }

  centerModel(model) {
    if (!model.userData.boundingBox) {
      const box = new THREE.Box3().setFromObject(model);
      model.userData.boundingBox = box;
    }
    
    const box = model.userData.boundingBox;
    const center = box.getCenter(new THREE.Vector3());
    

    model.position.sub(center);
    

    model.userData.boundingBox = new THREE.Box3().setFromObject(model);
    
    return center; // Return the original center offset for reference
  }

  startRenderLoop() {
    let lastTime = 0;
    
    const animate = (time) => {
      const deltaTime = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      
      if (this.vrManager) {
        this.vrManager.update(deltaTime);
      }
      

      if (this.cameraManager) {
        this.cameraManager.update();
      }
      

      this.emit('before-render', deltaTime);
      
      if (this.renderer && this.sceneManager && this.cameraManager) {
        this.renderer.render(this.sceneManager.scene, this.cameraManager.camera);
      }
    };
    

    this.renderer.setAnimationLoop(animate);
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
      this.sceneManager.remove(model);
      this.loadedModels.splice(index, 1);
      this.emit('model-removed', { model });
    }
  }

  clearModels() {
    this.loadedModels.forEach(({ model }) => {

      model.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) {
            child.geometry.dispose();
          }
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => {
                if (mat.map) mat.map.dispose();
                if (mat.normalMap) mat.normalMap.dispose();
                if (mat.roughnessMap) mat.roughnessMap.dispose();
                if (mat.metalnessMap) mat.metalnessMap.dispose();
                mat.dispose();
              });
            } else {
              if (child.material.map) child.material.map.dispose();
              if (child.material.normalMap) child.material.normalMap.dispose();
              if (child.material.roughnessMap) child.material.roughnessMap.dispose();
              if (child.material.metalnessMap) child.material.metalnessMap.dispose();
              child.material.dispose();
            }
          }
        }
      });
      
      this.sceneManager.remove(model);
    });
    
    this.loadedModels.length = 0;
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
    
    if (this.renderer) {
      this.renderer.setAnimationLoop(null);
    }
    
    this.loadedModels.forEach(({ model }) => {
      if (model.parent) {
        model.parent.remove(model);
      }

      model.traverse((child) => {
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
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
      this.vrManager.setComfortPreset(preset);
    }
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
