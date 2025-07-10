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
      console.warn('💡 Cannot initialize lighting: system disposed or no scene');
      return;
    }

    try {
      // Create overhead light but don't add it to scene yet
      this.overheadLight = new THREE.AmbientLight(0xffffff, 0.5);
      
      // Don't set currentMode - let DiveSystem handle the initial mode setup
      this.currentMode = null;
      console.log('💡 Lighting system initialized (no initial mode set)');
    } catch (error) {
      console.error('💡 Failed to initialize lighting system:', error);
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
      // Add directional light for survey mode
      if (!this.clearModeDirectionalLight) {
        this.clearModeDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.72);
        this.clearModeDirectionalLight.position.set(5, 10, 5);
        this.clearModeDirectionalLight.castShadow = false;
        this.scene.add(this.clearModeDirectionalLight);
      }
      
      // Add hemisphere light for even lighting from all directions
      if (!this.clearModeHemisphereLight) {
        this.clearModeHemisphereLight = new THREE.HemisphereLight(0xffffff, 0xcccccc, 0.6);
        this.scene.add(this.clearModeHemisphereLight);
      }
    } catch (error) {
      console.error('💡 Failed to create survey mode lights:', error);
    }
  }
  
  /**
   * Enable dive mode lighting
   */
  enableDiveMode() {
    console.log('🌊 Setting dive mode lighting - NO AMBIENT LIGHT');
    
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
    
    this.currentMode = 'dive';
    console.log('🌊 Dive mode lighting set');
  }
  
  /**
   * Enable survey mode lighting
   */
  enableSurveyMode() {
    console.log('☀️ Setting survey mode lighting');
    
    // Add overhead light to scene if not already there
    if (this.overheadLight && !this.scene.children.includes(this.overheadLight)) {
      this.scene.add(this.overheadLight);
    }
    
    // Set bright lighting immediately
    if (this.overheadLight) {
      this.overheadLight.intensity = 0.5;
      this.overheadLight.color.setHex(0xffffff);
    }
    
    // Create survey mode lights
    this.createSurveyModeLights();
    
    this.currentMode = 'survey';
    console.log('☀️ Survey mode lighting set');
  }
  
  /**
   * Set VR dive mode lighting
   */
  setVRDiveMode() {
    // No ambient light in VR dive mode - torch only
    if (this.overheadLight && this.scene.children.includes(this.overheadLight)) {
      this.scene.remove(this.overheadLight);
    }
    console.log('🥽 VR dive mode: No ambient light - torch only');
  }
  
  /**
   * Set desktop dive mode lighting
   */
  setDesktopDiveMode() {
    // No ambient light in desktop dive mode - torch only
    if (this.overheadLight && this.scene.children.includes(this.overheadLight)) {
      this.scene.remove(this.overheadLight);
    }
    console.log('🖥️ Desktop dive mode: No ambient light - torch only');
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
        console.error('💡 Error in lighting animation:', error);
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
        console.error('💡 Error removing object from scene:', error);
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
    console.log('💡 Disposing lighting system...');
    
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
        
        console.log('💡 Lighting system disposed successfully');
      } catch (error) {
        console.error('💡 Error during lighting system disposal:', error);
      }
    });
  }
}