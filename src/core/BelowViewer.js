import * as THREE from 'three';
import { EventSystem } from '../utils/EventSystem.js';
import { ConfigValidator } from '../utils/ConfigValidator.js';
import { Scene } from './Scene.js';
import { Camera } from './Camera.js';
import { ModelLoader } from '../models/ModelLoader.js';
import { VRManager } from './VRManager.js';

export class BelowViewer extends EventSystem {
  constructor(container, config = {}) {
    super();
    
    this.container = container;
    this.config = ConfigValidator.validate(config);
    
    // Core components
    this.renderer = null;
    this.sceneManager = null;
    this.cameraManager = null;
    this.modelLoader = null;
    this.vrManager = null;
    
    // VR State
    this.isVREnabled = this.config.vr?.enabled !== false; // Default to enabled
    this.dolly = null; // VR camera rig
    
    // State
    this.isInitialized = false;
    this.loadedModels = [];
    this.currentAbortController = null;
    
    this.init();
  }

  init() {
    try {
      // Initialize renderer
      this.initRenderer();
      
      // Initialize core managers
      this.sceneManager = new Scene(this.config.scene);
      this.cameraManager = new Camera(this.config.camera);
      this.modelLoader = new ModelLoader(this.renderer);
      
      // Setup VR if enabled
      if (this.isVREnabled) {
        this.initVR();
      }
      
      // Setup camera controls with the canvas
      this.cameraManager.initControls(this.renderer.domElement);
      
      // Event listeners
      this.setupEventListeners();
      
      // Start render loop
      this.startRenderLoop();
      
      this.isInitialized = true;
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
    
    // Enable shadows
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Better color space
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    this.container.appendChild(this.renderer.domElement);
  }

  initVR() {
    // Create dolly (VR camera rig) following original pattern
    this.dolly = new THREE.Group();
    this.dolly.add(this.cameraManager.camera);
    this.sceneManager.scene.add(this.dolly);
    
    // Initialize VR manager with original patterns
    this.vrManager = new VRManager(this.renderer, this.cameraManager.camera, this.sceneManager.scene);
    
    // Set controls reference for camera state preservation
    this.vrManager.setControls(this.cameraManager.controls);
    
    // Make BelowViewer globally accessible for VR-measurement coordination
    if (typeof window !== 'undefined') {
      window.belowViewer = this;
    }
    
    // Setup VR callbacks
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
      // Apply VR positions to current model
      if (this.loadedModels.length > 0) {
        const currentModel = this.loadedModels[this.loadedModels.length - 1];
        if (currentModel.options && currentModel.options.initialPositions) {
          this.vrManager.applyVRPositions(currentModel.options.initialPositions);
        }
      }
      
      // Disable orbit controls in VR
      if (this.cameraManager.controls) {
        this.cameraManager.controls.enabled = false;
      }
      
      this.emit('vr-session-start');
    };
    
    this.vrManager.onSessionEnd = () => {
      // Re-enable orbit controls
      if (this.cameraManager.controls) {
        this.cameraManager.controls.enabled = true;
        this.cameraManager.controls.update();
      }
      
      // Reset dolly to origin
      this.dolly.position.set(0, 0, 0);
      this.dolly.rotation.set(0, 0, 0);
      
      // Apply desktop positions to current model
      if (this.loadedModels.length > 0) {
        const currentModel = this.loadedModels[this.loadedModels.length - 1];
        if (currentModel.options && currentModel.options.initialPositions && currentModel.options.initialPositions.desktop) {
          this.applyDesktopPositions(currentModel.options.initialPositions.desktop);
        }
      }
      
      this.emit('vr-session-end');
    };
    
    console.log('✅ VR support initialized');
  }

  setupEventListeners() {
    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    // Forward camera events
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

  async loadModel(url, options = {}) {
    // Cancel any existing loading operation
    if (this.currentAbortController) {
      this.currentAbortController.abort();
    }
    
    // Create a new abort controller for this operation
    this.currentAbortController = new AbortController();
    const signal = this.currentAbortController.signal;
    
    try {
      this.emit('model-load-start', { url });
      
      const onProgress = (progress) => {
        if (!signal.aborted) {
          this.emit('model-load-progress', { url, progress });
        }
      };
      
      // Pass the abort signal to the model loader
      const model = await this.modelLoader.load(url, onProgress, signal);
      
      // Check if this operation was cancelled
      if (signal.aborted) {
        return null;
      }
      
      // Apply position/rotation/scale from options
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
      
      // Always center the model at world origin for consistent positioning
      const originalCenter = this.centerModel(model);
      
      // Add to scene
      this.sceneManager.add(model);
      this.loadedModels.push({ model, url, options, originalCenter });
      
      // Auto-frame the camera if this is the first model and autoFrame is not disabled
      if (this.loadedModels.length === 1 && options.autoFrame !== false) {
        this.frameModel(model);
      }
      
      // Clear the abort controller if this operation completed successfully
      if (this.currentAbortController && this.currentAbortController.signal === signal) {
        this.currentAbortController = null;
      }
      
      this.emit('model-loaded', { model, url });
      return model;
      
    } catch (error) {
      // Clear the abort controller
      if (this.currentAbortController && this.currentAbortController.signal === signal) {
        this.currentAbortController = null;
      }
      
      // Don't emit error events for cancelled operations
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
    
    // Position camera to view the model nicely
    this.cameraManager.frameObject(center, size);
  }

  centerModel(model) {
    // Calculate the model's bounding box
    if (!model.userData.boundingBox) {
      const box = new THREE.Box3().setFromObject(model);
      model.userData.boundingBox = box;
    }
    
    const box = model.userData.boundingBox;
    const center = box.getCenter(new THREE.Vector3());
    
    // Offset the model so its center is at world origin
    model.position.sub(center);
    
    // Recalculate bounding box after centering
    model.userData.boundingBox = new THREE.Box3().setFromObject(model);
    
    return center; // Return the original center offset for reference
  }

  startRenderLoop() {
    let lastTime = 0;
    
    const animate = (time) => {
      // Calculate delta time
      const deltaTime = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      
      // Update VR if enabled
      if (this.vrManager) {
        this.vrManager.update(deltaTime);
      }
      
      // Update camera controls (disabled automatically in VR)
      if (this.cameraManager) {
        this.cameraManager.update();
      }
      
      // Render the scene
      if (this.renderer && this.sceneManager && this.cameraManager) {
        this.renderer.render(this.sceneManager.scene, this.cameraManager.camera);
      }
    };
    
    // Use setAnimationLoop for VR compatibility
    this.renderer.setAnimationLoop(animate);
  }

  // Public API methods
  getScene() {
    return this.sceneManager?.scene;
  }

  getCamera() {
    return this.cameraManager?.camera;
  }

  getRenderer() {
    return this.renderer;
  }

  getLoadedModels() {
    return this.loadedModels;
  }

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
      // Properly dispose of materials and geometries
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

  dispose() {
    // Cancel any pending model loads
    if (this.currentAbortController) {
      this.currentAbortController.abort();
    }
    
    // Clean up global reference
    if (typeof window !== 'undefined' && window.belowViewer === this) {
      window.belowViewer = undefined;
    }
    
    // Dispose VR manager
    if (this.vrManager) {
      this.vrManager.dispose();
      this.vrManager = null;
    }
    
    // Stop render loop
    if (this.renderer) {
      this.renderer.setAnimationLoop(null);
    }
    
    // Clean up loaded models
    this.loadedModels.forEach(({ model }) => {
      if (model.parent) {
        model.parent.remove(model);
      }
      // Dispose geometries and materials
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
    
    // Dispose camera manager
    if (this.cameraManager) {
      this.cameraManager.dispose();
      this.cameraManager = null;
    }
    
    // Dispose renderer
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
      this.renderer = null;
    }
    
    // Remove event listeners
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    
    // Clear all event listeners
    this.removeAllListeners();
    
    this.isInitialized = false;
    
    console.log('✅ BelowViewer disposed');
  }
  
  applyDesktopPositions(positions) {
    if (!positions || !this.cameraManager) return;
    
    // Apply desktop camera and target positions with proper timing
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
        
        // Force multiple updates to ensure proper positioning
        this.cameraManager.controls.update();
        
        // Additional update after animation frame
        requestAnimationFrame(() => {
          this.cameraManager.controls.update();
        });
      }
      
      console.log('📍 Applied Desktop initial position:', positions);
    };
    
    // Apply immediately and also after a short delay to handle timing issues
    applyPositions();
    setTimeout(applyPositions, 50);
  }

  // VR-specific methods
  isVRPresenting() {
    return this.vrManager ? this.vrManager.isVRPresenting : false;
  }

  getVRManager() {
    return this.vrManager;
  }

  // VR Comfort Settings API
  setVRComfortSettings(settings) {
    if (this.vrManager) {
      this.vrManager.setComfortSettings(settings);
    }
  }
  
  getVRComfortSettings() {
    return this.vrManager ? this.vrManager.getComfortSettings() : null;
  }
  
  setVRComfortPreset(preset) {
    if (this.vrManager) {
      this.vrManager.setComfortPreset(preset);
    }
  }

  // Apply initial positions based on current mode (VR or desktop)
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
