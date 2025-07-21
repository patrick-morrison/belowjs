import * as THREE from 'three';
import { BelowViewer } from '../core/BelowViewer.js';
import { EventSystem } from '../utils/EventSystem.js';
import { MeasurementSystem } from '../measurement/MeasurementSystem.js';
import { VRComfortGlyph } from '../vr/ui/VRComfortGlyph.js';
import { DiveSystem } from '../dive/DiveSystem.js';

/**
 * ModelViewer - A high-level viewer for managing multiple models with dropdown selection
 * This handles the common pattern of a model selector dropdown with automatic UI management
 */
export class ModelViewer extends EventSystem {
  constructor(container, options = {}) {
    super();
    this.container = container;
    this.options = {
      models: {},
      autoLoadFirst: true,
      showLoadingIndicator: true,
      showStatus: true,
      showInfo: false,  // Info panel is optional now
      enableVR: false, // Enable VR support
      enableMeasurement: false, // New: auto-attach measurement system
      measurementTheme: 'dark', // 'dark' or 'light' theme for measurement panel
      enableVRComfortGlyph: false, // New: auto-attach VR comfort glyph
      enableDiveSystem: false, // New: auto-attach dive system
      ...options
    };
    this.currentModelKey = null;
    this.belowViewer = null;
    this.ui = {};
    this.measurementSystem = null;
    this.comfortGlyph = null;
    this.diveSystem = null;
    this.lastComfortMode = null;
    
    // Make this instance globally accessible for measurement system auto-centering
    if (typeof window !== 'undefined') {
      window.modelViewer = this;
    }
    
    this.init();
  }
  
  init() {
    // Create the BelowViewer with default config
    const defaultConfig = {
      scene: {
        background: { type: 'color', value: '#041729' },
        fog: { 
          enabled: false, 
          color: '#041729', 
          near: 10, 
          far: 100 
        }
      },
      camera: {
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
      renderer: {
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      }
    };

    // Merge with user-provided configuration
    const viewerConfig = {
      ...defaultConfig,
      ...this.options.viewerConfig,
      // Enable VR if requested
      ...(this.options.enableVR && { vr: { enabled: true } }),
      // Pass audioPath if provided
      ...(this.options.audioPath && { audioPath: this.options.audioPath }),
      // Allow scene config to be passed at top level for convenience
      ...(this.options.scene && { scene: { ...defaultConfig.scene, ...this.options.scene } }),
      ...(this.options.camera && { camera: { ...defaultConfig.camera, ...this.options.camera } }),
      ...(this.options.renderer && { renderer: { ...defaultConfig.renderer, ...this.options.renderer } }),
      ...(this.options.vr && { vr: { ...this.options.vr } })
    };
    
    this.belowViewer = new BelowViewer(this.container, viewerConfig);

    // Set up BelowViewer event forwarding
    this.setupEventForwarding();

    // Set up double-click to focus interaction (wait for initialization)
    this.belowViewer.on('initialized', () => {
      this.setupFocusInteraction();
      this._maybeAttachMeasurementSystem();
      this._maybeAttachVRComfortGlyph();
      this._maybeAttachDiveSystem();
    });

    // Also try setting it up immediately in case the event already fired
    if (this.belowViewer.isInitialized) {
      this.setupFocusInteraction();
      this._maybeAttachMeasurementSystem();
      this._maybeAttachVRComfortGlyph();
      this._maybeAttachDiveSystem();
    }

    // Create UI if models are provided
    if (Object.keys(this.options.models).length > 0) {
      this.createUI();
      this.populateDropdown();

      // Auto-load first model if enabled
      if (this.options.autoLoadFirst) {
        const firstModelKey = Object.keys(this.options.models)[0];
        setTimeout(() => this.loadModel(firstModelKey), 100);
      }
    }
  }

  _maybeAttachMeasurementSystem() {
    if (!this.options.enableMeasurement || this.measurementSystem) return;
    this.measurementSystem = new MeasurementSystem({
      scene: this.belowViewer.sceneManager.scene,
      camera: this.belowViewer.cameraManager.camera,
      renderer: this.belowViewer.renderer,
      controls: this.belowViewer.cameraManager.controls,
      theme: this.options.measurementTheme
    });
    // Note: Measurement system starts disabled by default - user must click to enable
    // Attach update to render loop
    const update = () => this.measurementSystem && this.measurementSystem.update();
    if (this.belowViewer.onAfterRender) {
      this.belowViewer.onAfterRender(update);
    } else if (this.onAfterRender) {
      this.onAfterRender(update);
    } else {
      // fallback: requestAnimationFrame
      const loop = () => { update(); requestAnimationFrame(loop); };
      loop();
    }
    // Set initial target if model loaded
    if (this.belowViewer.loadedModels && this.belowViewer.loadedModels.length > 0) {
      const modelRoot = this.belowViewer.loadedModels[0].model;
      this.measurementSystem.setRaycastTargets(modelRoot);
    }
  }

  async _maybeAttachVRComfortGlyph() {
    if (!this.options.enableVRComfortGlyph || this.comfortGlyph) return;
    if (!this.belowViewer.vrManager) return;
    if (!this.belowViewer.vrManager.vrCore) return;
    
    // Wait for VR support check to complete
    await this.belowViewer.vrManager.vrCore.checkVRSupported();
    
    // Only create comfort glyph if VR is supported
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
    // Keyboard shortcut for comfort glyph
    document.addEventListener('keydown', (event) => {
      if (event.code === 'KeyC' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        if (this.comfortGlyph) this.comfortGlyph.toggle();
      }
    });
    // Cleanup
    window.addEventListener('beforeunload', () => this.comfortGlyph && this.comfortGlyph.dispose());
  }

  _maybeAttachDiveSystem() {
    if (!this.options.enableDiveSystem || this.diveSystem) return;
    
    this.diveSystem = new DiveSystem(
      this.belowViewer.sceneManager.scene,
      this.belowViewer.renderer,
      this.belowViewer.cameraManager.camera
    );

    // Initialize UI toggle switch
    setTimeout(() => {
      this.diveSystem.initializeToggleSwitch();
    }, 100);

    // Attach update to render loop
    const update = (deltaTime) => {
      if (this.diveSystem) {
        const currentTime = performance.now();
        this.diveSystem.update(currentTime, deltaTime);
        
        // Update torch from VRManager if available
        if (this.belowViewer.vrManager) {
          this.diveSystem.updateTorchFromVRManager(this.belowViewer.vrManager);
        }
        
        // Update torch for desktop camera when not in VR
        if (!this.belowViewer.renderer.xr.isPresenting) {
          this.diveSystem.torch.updateCameraPosition(this.belowViewer.cameraManager.camera);
        }
      }
    };

    if (this.belowViewer.onAfterRender) {
      this.belowViewer.onAfterRender(update);
    } else {
      // Use the before-render event
      this.belowViewer.on('before-render', update);
    }

    // Update particle bounds when model loads
    this.on('model-loaded', (data) => {
      if (this.diveSystem && data.model) {
        console.log('🌊 Model loaded, updating particle bounds for:', data.model);
        this.diveSystem.updateParticleBounds(data.model);
      }
    });

    // Make dive system globally accessible for debugging
    if (typeof window !== 'undefined') {
      window.diveSystem = this.diveSystem;
    }

    console.log('🌊 DiveSystem attached to ModelViewer');
  }
  
  setupEventForwarding() {
    // Forward all BelowViewer events
    this.belowViewer.on('initialized', (data) => this.emit('initialized', data));
    this.belowViewer.on('model-load-start', (data) => this.emit('model-load-start', data));
    this.belowViewer.on('model-load-progress', (data) => {
      this.emit('model-load-progress', data);
      this.updateLoadingProgress(data);
    });
    this.belowViewer.on('model-loaded', (data) => {
      this.emit('model-loaded', data);
      this.onModelLoaded(data);
    });
    this.belowViewer.on('model-load-error', (data) => {
      this.emit('model-load-error', data);
      this.onModelLoadError(data);
    });
    this.belowViewer.on('model-load-cancelled', (data) => this.emit('model-load-cancelled', data));
    this.belowViewer.on('error', (data) => this.emit('error', data));
    
    // Forward VR events
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

  // VR event handlers
  onVRSessionStart() {
    // Hide desktop UI elements in VR
    if (this.ui.info) {
      this.ui.info.style.display = 'none';
    }
    if (this.ui.selector) {
      this.ui.selector.style.pointerEvents = 'none';
      this.ui.selector.style.opacity = '0.5';
    }

    // --- Ensure VR measurement system is attached ---
    if (this.measurementSystem && typeof this.measurementSystem.attachVR === 'function') {
      // Try to get controllers from renderer.xr if available
      const renderer = this.belowViewer?.renderer;
      if (renderer && renderer.xr && typeof renderer.xr.getController === 'function') {
        const controller1 = renderer.xr.getController(0);
        const controller2 = renderer.xr.getController(1);
        const controllerGrip1 = renderer.xr.getControllerGrip ? renderer.xr.getControllerGrip(0) : undefined;
        const controllerGrip2 = renderer.xr.getControllerGrip ? renderer.xr.getControllerGrip(1) : undefined;
        this.measurementSystem.attachVR({ controller1, controller2, controllerGrip1, controllerGrip2 });
      }
    }

    console.log('🥽 VR session started - UI adapted for VR');
  }

  onVRSessionEnd() {
    // Restore desktop UI elements
    if (this.ui.info && this.options.showInfo) {
      this.ui.info.style.display = 'block';
    }
    if (this.ui.selector) {
      this.ui.selector.style.pointerEvents = 'auto';
      this.ui.selector.style.opacity = '1';
    }
    
    console.log('🖥️ VR session ended - UI restored for desktop');
  }

  onVRModeToggle() {
    // This could be used for mode-specific UI changes in the future
    console.log('🔄 VR mode toggled');
  }
   setupFocusInteraction() {
    const domElement = this.belowViewer.renderer.domElement;

    // Use manual double-click detection like the original for faster response
    const DOUBLE_CLICK_TIME = 300; // 300ms like the original
    let lastClickTime = 0;
    let isDragging = false;
    let dragStartPosition = { x: 0, y: 0 };
    const DRAG_THRESHOLD = 5; // pixels

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
      // Reset drag state after a short delay to allow click event to process
      setTimeout(() => {
        isDragging = false;
      }, 10);
    };

    const onMouseClick = (event) => {
      const currentTime = Date.now();
      const isDoubleClick = currentTime - lastClickTime < DOUBLE_CLICK_TIME;
      lastClickTime = currentTime;
      
      // Don't process when in VR or dragging
      if (this.belowViewer.renderer.xr?.isPresenting || isDragging) return;
      
      if (isDoubleClick) {
        this.focusOnPoint(event);
      }
    };

    // Add event listeners (same as original)
    domElement.addEventListener('mousedown', onMouseDown);
    domElement.addEventListener('mousemove', onMouseMove);
    domElement.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('click', onMouseClick);

    // Store references for cleanup
    this.focusEventHandlers = {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseClick
    };
  }
   focusOnPoint(event) {
    // Calculate mouse position - use same method as original
    const mouse = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1
    };

    // Create raycaster
    const raycaster = new THREE.Raycaster();
    const camera = this.belowViewer.cameraManager.getCamera();
    raycaster.setFromCamera(mouse, camera);

    // Use proper raycast targets - prefer measurement system's curated targets if available
    let raycastTargets = [];
    
    if (this.measurementSystem && this.measurementSystem._raycastTargets && this.measurementSystem._raycastTargets.length > 0) {
      // Use measurement system's curated targets (excludes helpers, only model geometry)
      raycastTargets = this.measurementSystem._raycastTargets;
    } else {
      // Fallback: filter scene children to exclude measurement helpers
      const scene = this.belowViewer.sceneManager.getScene();
      raycastTargets = [];
      scene.traverse(child => {
        if (child.isMesh && child.geometry && !this.isMeasurementHelper(child)) {
          raycastTargets.push(child);
        }
      });
    }
    
    if (raycastTargets.length === 0) {
      console.debug('[ModelViewer] No valid raycast targets found for focusing');
      return;
    }

    // Find intersections with proper targets only
    const intersects = raycaster.intersectObjects(raycastTargets, true);
    
    if (intersects.length > 0) {
      const point = intersects[0].point;
      this.belowViewer.cameraManager.focusOn(point);
      this.emit('focus', { point, intersect: intersects[0] });
    } else {
      console.debug('[ModelViewer] No intersections found with valid targets');
    }
  }

  // Helper method to identify measurement helpers (similar to MeasurementSystem)
  isMeasurementHelper(obj) {
    if (!obj) return false;
    
    // Check userData flags
    if (obj.userData.isMeasurementSphere || obj.userData.isMeasurementLine) return true;
    
    // Check object types
    if (obj.type === 'Line2' || obj.type === 'Line') return true;
    
    // Check geometry types that are typically helpers
    if (obj.geometry) {
      const helperGeometries = ['RingGeometry', 'TubeGeometry', 'PlaneGeometry', 'CircleGeometry', 'SphereGeometry'];
      if (helperGeometries.includes(obj.geometry.type)) {
        // For sphere geometry, check if it's small (likely a measurement sphere)
        if (obj.geometry.type === 'SphereGeometry') {
          const sphere = obj.geometry;
          if (sphere.parameters && sphere.parameters.radius < 0.1) return true;
        } else {
          return true;
        }
      }
    }
    
    // Check by name convention
    if (typeof obj.name === 'string' && 
        (obj.name.startsWith('MeasurementHelper') || 
         obj.name.includes('measurement') || 
         obj.name.includes('ghost'))) {
      return true;
    }
    
    return false;
  }
  
  createUI() {
    // Add CSS classes to container
    if (this.container === document.body) {
      document.documentElement.classList.add('below-viewer');
    } else {
      this.container.classList.add('below-viewer-container');
    }
    
    // Only create model selector dropdown if there are multiple models
    const modelCount = Object.keys(this.options.models).length;
    if (modelCount > 1) {
      if (!document.getElementById('modelDropdown')) {
        this.createModelSelector();
      } else {
        this.ui.dropdown = document.getElementById('modelDropdown');
      }
    }
    
    // Create info panel only if enabled and doesn't exist
    if (this.options.showInfo && !document.getElementById('info')) {
      this.createInfoPanel();
    }
    
    // Create loading indicator if it doesn't exist and enabled
    if (this.options.showLoadingIndicator && !document.getElementById('loading')) {
      this.createLoadingIndicator();
    } else if (this.options.showLoadingIndicator) {
      this.ui.loading = document.getElementById('loading');
    }
    
    // Create status indicator if it doesn't exist and enabled
    if (this.options.showStatus && !document.getElementById('status')) {
      this.createStatusIndicator();
    } else if (this.options.showStatus) {
      this.ui.status = document.getElementById('status');
    }
    
    // Set up event listeners
    if (this.ui.dropdown) {
      this.ui.dropdown.addEventListener('change', (event) => {
        if (event.target.value) {
          this.loadModel(event.target.value);
        }
      });
    }
  }
  
  createModelSelector() {
    // Check if modelSelector div exists
    let selectorContainer = document.getElementById('modelSelector');
    if (!selectorContainer) {
      selectorContainer = document.createElement('div');
      selectorContainer.id = 'modelSelector';
      selectorContainer.className = 'below-panel';
      document.body.appendChild(selectorContainer);
    }
    
    // Create dropdown if it doesn't exist
    if (!document.getElementById('modelDropdown')) {
      const dropdown = document.createElement('select');
      dropdown.id = 'modelDropdown';
      selectorContainer.appendChild(dropdown);
    }
    
    this.ui.dropdown = document.getElementById('modelDropdown');
  }
  
  createLoadingIndicator() {
    const loading = document.createElement('div');
    loading.id = 'loading';
    loading.className = 'below-loading';
    loading.textContent = 'Loading...';
    loading.style.display = 'none';
    document.body.appendChild(loading);
    this.ui.loading = loading;
  }
  
  createStatusIndicator() {
    const status = document.createElement('div');
    status.id = 'status';
    status.className = 'status below-status';
    status.style.display = 'none';
    document.body.appendChild(status);
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
    document.body.appendChild(info);
    
    this.ui.info = info;
  }
  
  populateDropdown() {
    if (!this.ui.dropdown) return;  // No dropdown if only one model
    
    // Clear existing options
    this.ui.dropdown.innerHTML = '';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a Model';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    this.ui.dropdown.appendChild(defaultOption);
    
    // Add model options
    Object.entries(this.options.models).forEach(([key, model]) => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = model.name || key;
      this.ui.dropdown.appendChild(option);
    });
  }
  
  async loadModel(modelKey) {
    const modelConfig = this.options.models[modelKey];
    if (!modelConfig) {
      console.error('Model not found:', modelKey);
      return;
    }
    this.currentModelKey = modelKey;
    // Update dropdown selection if dropdown exists
    if (this.ui.dropdown) {
      this.ui.dropdown.value = modelKey;
    }
    // Show loading indicator
    this.showLoading(`Loading ${modelConfig.name || modelKey}...`);
    // Update page title
    document.title = `BelowJS – ${modelConfig.name || modelKey}`;
    try {
      // Clear existing models
      this.belowViewer.clearModels();
      // Small delay to ensure cleanup completes
      await new Promise(resolve => setTimeout(resolve, 50));
      // Load the model with initialPositions for VR support
      const model = await this.belowViewer.loadModel(modelConfig.url, {
        autoFrame: false,  // We'll handle positioning manually
        initialPositions: modelConfig.initialPositions  // Pass VR/desktop positions
      });
      if (model) {
        // Apply initial positions based on current mode (VR or desktop)
        this.applyInitialPositions(modelConfig, model);
        // Hide loading and update status
        this.hideLoading();
        this.updateStatus(`Loaded: ${modelConfig.name || modelKey}`);
        // Set measurement raycast targets if enabled
        if (this.measurementSystem) {
          this.measurementSystem.setRaycastTargets(model);
        }
        this.emit('model-switched', { modelKey, model, config: modelConfig });
      }
    } catch (error) {
      if (error.message !== 'Loading cancelled') {
        console.error('Failed to load model:', error);
        this.hideLoading();
        this.updateStatus(`Error loading ${modelConfig.name || modelKey}`);
      }
    }
  }
  
  applyInitialPositions(modelConfig, model) {
    const positions = modelConfig.initialPositions;
    if (!positions) return;

    const isVRMode = this.belowViewer.isVRPresenting();

    if (isVRMode && positions.vr) {
      // Set dolly position/rotation directly (backup style)
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
      // Set camera position and controls target directly (backup style)
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
      const modelConfig = this.options.models[this.currentModelKey];
      const percent = Math.round((progress.loaded / progress.total) * 100);
      this.showLoading(`Loading ${modelConfig?.name || 'model'}: ${percent}%`);
    }
  }
  
  onModelLoaded({ model }) {
    const box = model.userData.boundingBox;
    if (box) {
      const size = box.getSize(new THREE.Vector3());
    }
    
    // Update measurement system with the loaded model
    if (this.measurementSystem) {
      this.measurementSystem.setRaycastTargets(model);
    }
  }
  
  onModelLoadError({ error }) {
    this.hideLoading();
    this.updateStatus(`Failed to load model: ${error.message}`);
  }
  
  // Public API methods
  getCurrentModel() {
    return this.belowViewer ? this.belowViewer.getCurrentModel() : null;
  }
  
  getCamera() {
    return this.belowViewer ? this.belowViewer.getCamera() : null;
  }
  
  getScene() {
    return this.belowViewer ? this.belowViewer.sceneManager.scene : null;
  }
  
  /**
   * Focus the camera on a specific point in 3D space
   * @param {THREE.Vector3} point - The point to focus on
   * @param {number} distance - Optional distance from the point
   */
  focusOn(point, distance = null) {
    if (this.belowViewer?.cameraManager) {
      this.belowViewer.cameraManager.focusOn(point, distance);
      this.emit('focus', { point, distance });
    }
  }
  
  /**
   * Reset camera to the model's initial position
   */
  resetCamera() {
    if (this.currentModelKey && this.belowViewer) {
      const modelConfig = this.options.models[this.currentModelKey];
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
  
  // VR Comfort Settings API
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
  
  getVRComfortSettings() {
    if (this.belowViewer && this.belowViewer.getVRComfortSettings) {
      return this.belowViewer.getVRComfortSettings();
    }
    return null;
  }
  
  dispose() {
    // Clean up global reference
    if (typeof window !== 'undefined' && window.modelViewer === this) {
      window.modelViewer = null;
    }
    
    // Clean up focus interaction event handlers
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
      // Clean up global reference
      if (typeof window !== 'undefined' && window.diveSystem === this.diveSystem) {
        window.diveSystem = null;
      }
    }
    if (this.belowViewer) {
      this.belowViewer.dispose();
    }
    this.removeAllListeners();
  }
}
