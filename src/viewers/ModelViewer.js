import * as THREE from 'three';
import { BelowViewer } from '../core/BelowViewer.js';
import { EventSystem } from '../utils/EventSystem.js';

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
      ...options
    };
    
    this.currentModelKey = null;
    this.belowViewer = null;
    this.ui = {};
    
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
      // Allow scene config to be passed at top level for convenience
      ...(this.options.scene && { scene: { ...defaultConfig.scene, ...this.options.scene } }),
      ...(this.options.camera && { camera: { ...defaultConfig.camera, ...this.options.camera } }),
      ...(this.options.renderer && { renderer: { ...defaultConfig.renderer, ...this.options.renderer } })
    };
    
    this.belowViewer = new BelowViewer(this.container, viewerConfig);
    
    // Set up BelowViewer event forwarding
    this.setupEventForwarding();
    
    // Set up double-click to focus interaction (wait for initialization)
    this.belowViewer.on('initialized', () => {
      this.setupFocusInteraction();
    });
    
    // Also try setting it up immediately in case the event already fired
    if (this.belowViewer.isInitialized) {
      this.setupFocusInteraction();
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

    // Find intersections with scene objects
    const scene = this.belowViewer.sceneManager.getScene();
    
    // Try the scene children approach first
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length === 0) {
      // Fallback: try all meshes directly
      const allMeshes = [];
      scene.traverse(child => {
        if (child.isMesh) {
          allMeshes.push(child);
        }
      });
      
      if (allMeshes.length > 0) {
        const meshIntersects = raycaster.intersectObjects(allMeshes, false);
        
        if (meshIntersects.length > 0) {
          const point = meshIntersects[0].point;
          this.belowViewer.cameraManager.focusOn(point);
          this.emit('focus', { point, intersect: meshIntersects[0] });
          return;
        }
      }
    } else {
      const point = intersects[0].point;
      this.belowViewer.cameraManager.focusOn(point);
      this.emit('focus', { point, intersect: intersects[0] });
      return;
    }

    // No intersections found - could emit a 'focus-miss' event if needed
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
    
    if (!positions) {
      this.belowViewer.frameModel(model);
      return;
    }
    
    // Check if we're in VR mode
    const isVRMode = this.belowViewer.isVRPresenting();
    
    if (isVRMode && positions.vr) {
      // Apply VR positions using the BelowViewer VR manager
      this.belowViewer.applyInitialPositions(positions);
    } else if (!isVRMode && positions.desktop) {
      // Apply desktop positions with proper timing
      setTimeout(() => {
        const camera = this.belowViewer.getCamera();
        const controls = this.belowViewer.cameraManager.controls;
        
        if (camera && controls && positions.desktop) {
          const targetCameraPos = new THREE.Vector3(
            positions.desktop.camera.x,
            positions.desktop.camera.y,
            positions.desktop.camera.z
          );
          
          const targetControlsTarget = new THREE.Vector3(
            positions.desktop.target.x,
            positions.desktop.target.y,
            positions.desktop.target.z
          );
          
          camera.position.copy(targetCameraPos);
          controls.target.copy(targetControlsTarget);
          
          // Force multiple updates to ensure camera positioning
          controls.update();
          
          // Additional update after a frame
          requestAnimationFrame(() => {
            controls.update();
            console.log('📍 Applied Desktop initial position:', positions.desktop);
          });
        }
      }, 100); // Small delay to ensure model is fully loaded and positioned
    } else {
      // No specific positions defined, auto-frame the model with delay
      setTimeout(() => {
        this.belowViewer.frameModel(model);
      }, 100);
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
    // Clean up focus interaction event handlers
    if (this.focusEventHandlers && this.belowViewer?.renderer?.domElement) {
      const domElement = this.belowViewer.renderer.domElement;
      domElement.removeEventListener('mousedown', this.focusEventHandlers.onMouseDown);
      domElement.removeEventListener('mousemove', this.focusEventHandlers.onMouseMove);
      domElement.removeEventListener('mouseup', this.focusEventHandlers.onMouseUp);
      domElement.removeEventListener('click', this.focusEventHandlers.onMouseClick);
      this.focusEventHandlers = null;
    }
    
    if (this.belowViewer) {
      this.belowViewer.dispose();
    }
    this.removeAllListeners();
  }
}
