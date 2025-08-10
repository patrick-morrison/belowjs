import * as THREE from 'three';

export class DiveLighting {
  constructor(scene) {
    this.scene = scene;
    
    this.overheadLight = null;
    this.clearModeDirectionalLight = null;
    this.clearModeHemisphereLight = null;
    
    this.isTransitioning = false;
    this.currentMode = 'survey';
    this.pendingAnimations = new Set();
    this.isDisposed = false;
    
    this.initializeLighting();
  }
  
  initializeLighting() {
    if (this.isDisposed || !this.scene) {
      console.warn('Cannot initialize lighting: system disposed or no scene');
      return;
    }

    try {
      this.overheadLight = new THREE.AmbientLight(0xffffff, 0.5);
      
      this.currentMode = null;
    } catch (error) {
      console.error('Failed to initialize lighting system:', error);
    }
  }
  
  createSurveyModeLights() {
    if (this.isDisposed || !this.scene) {
      return;
    }

    try {
      if (!this.clearModeDirectionalLight) {
        this.clearModeDirectionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        this.clearModeDirectionalLight.position.set(10, 20, 10);
        this.clearModeDirectionalLight.castShadow = true;
        
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
      
      if (!this.clearModeHemisphereLight) {
        this.clearModeHemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.7);
        this.scene.add(this.clearModeHemisphereLight);
      }

      if (!this.fillLight) {
        this.fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
        this.fillLight.position.set(-10, 10, -10);
        this.scene.add(this.fillLight);
      }


      if (!this.bottomLight) {
        this.bottomLight = new THREE.DirectionalLight(0xffffff, 0.3);
        this.bottomLight.position.set(0, -10, 0);
        this.scene.add(this.bottomLight);
      }
    } catch (error) {
      console.error('Failed to create survey mode lights:', error);
    }
  }
  
  enableDiveMode() {
    
    if (this.overheadLight && this.scene.children.includes(this.overheadLight)) {
      this.scene.remove(this.overheadLight);
    }
    
    if (this.clearModeDirectionalLight) {
      this.scene.remove(this.clearModeDirectionalLight);
      this.clearModeDirectionalLight = null;
    }
    
    if (this.clearModeHemisphereLight) {
      this.scene.remove(this.clearModeHemisphereLight);
      this.clearModeHemisphereLight = null;
    }

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
  
  enableSurveyMode() {
    
    if (this.overheadLight && !this.scene.children.includes(this.overheadLight)) {
      this.scene.add(this.overheadLight);
    }
    
    if (this.overheadLight) {
      this.overheadLight.intensity = 0.6;
      this.overheadLight.color.setHex(0xffffff);
    }
    
    this.createSurveyModeLights();
    
    this.currentMode = 'survey';
  }
  
  setVRDiveMode() {
    if (this.overheadLight && this.scene.children.includes(this.overheadLight)) {
      this.scene.remove(this.overheadLight);
    }
  }
  
  setDesktopDiveMode() {
    if (this.overheadLight && this.scene.children.includes(this.overheadLight)) {
      this.scene.remove(this.overheadLight);
    }
  }
  
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
      if (!this.pendingAnimations.has(animationId) || this.isDisposed) {
        if (onComplete) onComplete();
        return;
      }

      try {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        
        if (!target || (this.scene && !this.scene.children.includes(target))) {
          this.pendingAnimations.delete(animationId);
          if (onComplete) onComplete();
          return;
        }
        
        target.intensity = fromIntensity + (intensityDelta * eased);
        
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

  cancelActiveAnimations() {
    this.pendingAnimations.clear();
  }

  safeRemoveFromScene(object) {
    if (this.scene && object && this.scene.children.includes(object)) {
      try {
        this.scene.remove(object);
      } catch (error) {
        console.error('Error removing object from scene:', error);
      }
    }
  }

  getCurrentMode() {
    return this.currentMode;
  }

  isTransitionInProgress() {
    return this.isTransitioning;
  }
  
  dispose() {
    
    this.isDisposed = true;
    
    this.cancelActiveAnimations();
    
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
        
        this.scene = null;
        
      } catch (error) {
        console.error('Error during lighting system disposal:', error);
      }
    });
  }
}