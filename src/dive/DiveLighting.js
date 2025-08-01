import * as THREE from 'three';

/**
 * DiveLighting - Manages lighting transitions between dive and survey modes
 */
export class DiveLighting {
  constructor(scene) {
    this.scene = scene;
    
    // Lighting references
    this.overheadLight = null;
    this.clearModeDirectionalLight = null;
    this.clearModeHemisphereLight = null;
    
    // State management
    this.isTransitioning = false;
    this.currentMode = 'survey'; // Track current mode
    this.pendingAnimations = new Set(); // Track active animations
    this.isDisposed = false;
    
    // Initialize with survey mode lighting
    this.initializeLighting();
  }
  
  /**
   * Initialize lighting system with minimal setup
   */
  initializeLighting() {
    if (this.isDisposed || !this.scene) {
      console.warn('Cannot initialize lighting: system disposed or no scene');
      return;
    }

    try {
      // Create overhead light but don't add it to scene yet - enhanced intensity
      this.overheadLight = new THREE.AmbientLight(0xffffff, 0.5);
      
      // Don't set currentMode - let DiveSystem handle the initial mode setup
      this.currentMode = null;
    } catch (error) {
      console.error('Failed to initialize lighting system:', error);
    }
  }
  
  /**
   * Create survey mode lights
   */
  createSurveyModeLights() {
    if (this.isDisposed || !this.scene) {
      return;
    }

    try {
      // Enhanced main directional light with high-quality shadows
      if (!this.clearModeDirectionalLight) {
        this.clearModeDirectionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        this.clearModeDirectionalLight.position.set(10, 20, 10);
        this.clearModeDirectionalLight.castShadow = true;
        
        // High-resolution shadow mapping
        this.clearModeDirectionalLight.shadow.mapSize.width = 2048;
        this.clearModeDirectionalLight.shadow.mapSize.height = 2048;
        this.clearModeDirectionalLight.shadow.camera.near = 0.5;
        this.clearModeDirectionalLight.shadow.camera.far = 100;
        this.clearModeDirectionalLight.shadow.camera.left = -20;
        this.clearModeDirectionalLight.shadow.camera.right = 20;
        this.clearModeDirectionalLight.shadow.camera.top = 20;
        this.clearModeDirectionalLight.shadow.camera.bottom = -20;
        
        this.scene.add(this.clearModeDirectionalLight);
      }
      
      // Enhanced hemisphere light for natural gradient
      if (!this.clearModeHemisphereLight) {
        this.clearModeHemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.7);
        this.scene.add(this.clearModeHemisphereLight);
      }

      // Add fill light from opposite side
      if (!this.fillLight) {
        this.fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
        this.fillLight.position.set(-10, 10, -10);
        this.scene.add(this.fillLight);
      }

      // Add bottom light for surface detail visibility
      if (!this.bottomLight) {
        this.bottomLight = new THREE.DirectionalLight(0xffffff, 0.3);
        this.bottomLight.position.set(0, -10, 0);
        this.scene.add(this.bottomLight);
      }
    } catch (error) {
      console.error('Failed to create survey mode lights:', error);
    }
  }
  
  /**
   * Enable dive mode lighting
   */
  enableDiveMode() {
    
    // Remove overhead light completely in dive mode
    if (this.overheadLight && this.scene.children.includes(this.overheadLight)) {
      this.scene.remove(this.overheadLight);
    }
    
    // Remove survey mode lights
    if (this.clearModeDirectionalLight) {
      this.scene.remove(this.clearModeDirectionalLight);
      this.clearModeDirectionalLight = null;
    }
    
    if (this.clearModeHemisphereLight) {
      this.scene.remove(this.clearModeHemisphereLight);
      this.clearModeHemisphereLight = null;
    }

    // Remove additional survey lights
    if (this.fillLight) {
      this.scene.remove(this.fillLight);
      this.fillLight = null;
    }

    if (this.bottomLight) {
      this.scene.remove(this.bottomLight);
      this.bottomLight = null;
    }
    
    this.currentMode = 'dive';
  }
  
  /**
   * Enable survey mode lighting
   */
  enableSurveyMode() {
    
    // Add overhead light to scene if not already there
    if (this.overheadLight && !this.scene.children.includes(this.overheadLight)) {
      this.scene.add(this.overheadLight);
    }
    
    // Set bright lighting immediately
    if (this.overheadLight) {
      this.overheadLight.intensity = 0.6;
      this.overheadLight.color.setHex(0xffffff);
    }
    
    // Create survey mode lights
    this.createSurveyModeLights();
    
    this.currentMode = 'survey';
  }
  
  /**
   * Set VR dive mode lighting
   */
  setVRDiveMode() {
    // No ambient light in VR dive mode - torch only
    if (this.overheadLight && this.scene.children.includes(this.overheadLight)) {
      this.scene.remove(this.overheadLight);
    }
  }
  
  /**
   * Set desktop dive mode lighting
   */
  setDesktopDiveMode() {
    // No ambient light in desktop dive mode - torch only
    if (this.overheadLight && this.scene.children.includes(this.overheadLight)) {
      this.scene.remove(this.overheadLight);
    }
  }
  
  /**
   * Fade lighting helper function
   */
  fadeLighting({target, fromIntensity, toIntensity, fromColor, toColor, duration = 500, onComplete}) {
    if (this.isDisposed || !target) {
      if (onComplete) onComplete();
      return;
    }

    const animationId = Symbol('fade-animation');
    this.pendingAnimations.add(animationId);

    const startTime = performance.now();
    const intensityDelta = toIntensity - fromIntensity;
    
    let colorFrom, colorTo;
    if (fromColor !== undefined && toColor !== undefined) {
      colorFrom = new THREE.Color(fromColor);
      colorTo = new THREE.Color(toColor);
    }
    
    const animate = (currentTime) => {
      // Check if this animation was cancelled
      if (!this.pendingAnimations.has(animationId) || this.isDisposed) {
        if (onComplete) onComplete();
        return;
      }

      try {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        
        // Validate target still exists and is in scene
        if (!target || (this.scene && !this.scene.children.includes(target))) {
          this.pendingAnimations.delete(animationId);
          if (onComplete) onComplete();
          return;
        }
        
        // Fade intensity
        target.intensity = fromIntensity + (intensityDelta * eased);
        
        // Fade color if specified
        if (colorFrom && colorTo && target.color) {
          target.color.lerpColors(colorFrom, colorTo, eased);
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this.pendingAnimations.delete(animationId);
          if (onComplete) onComplete();
        }
      } catch (error) {
        console.error('Error in lighting animation:', error);
        this.pendingAnimations.delete(animationId);
        if (onComplete) onComplete();
      }
    };
    
    requestAnimationFrame(animate);
  }

  /**
   * Cancel all active animations
   */
  cancelActiveAnimations() {
    this.pendingAnimations.clear();
  }

  /**
   * Safely remove object from scene
   */
  safeRemoveFromScene(object) {
    if (this.scene && object && this.scene.children.includes(object)) {
      try {
        this.scene.remove(object);
      } catch (error) {
        console.error('Error removing object from scene:', error);
      }
    }
  }

  /**
   * Get current lighting mode
   */
  getCurrentMode() {
    return this.currentMode;
  }

  /**
   * Check if system is transitioning
   */
  isTransitionInProgress() {
    return this.isTransitioning;
  }
  
  /**
   * Dispose of lighting resources
   */
  dispose() {
    
    // Mark as disposed to prevent further operations
    this.isDisposed = true;
    
    // Cancel all pending animations
    this.cancelActiveAnimations();
    
    // Wait a frame to ensure animations have stopped
    requestAnimationFrame(() => {
      try {
        if (this.overheadLight) {
          this.safeRemoveFromScene(this.overheadLight);
          this.overheadLight = null;
        }
        
        if (this.clearModeDirectionalLight) {
          this.safeRemoveFromScene(this.clearModeDirectionalLight);
          this.clearModeDirectionalLight = null;
        }
        
        if (this.clearModeHemisphereLight) {
          this.safeRemoveFromScene(this.clearModeHemisphereLight);
          this.clearModeHemisphereLight = null;
        }
        
        // Clear scene reference
        this.scene = null;
        
      } catch (error) {
        console.error('Error during lighting system disposal:', error);
      }
    });
  }
}