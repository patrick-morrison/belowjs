import * as THREE from 'three';

/**
 * DiveTorch - Manages the VR controller spotlight/torch system
 */
export class DiveTorch {
  constructor(scene) {
    this.scene = scene;
    
    // Torch/spotlight references
    this.controllerSpotlight = null;
    this.spotlightTarget = null;
    
    // Device detection for optimization
    this.isQuest2 = false;
    this.isQuest3 = false;
    this.detectQuestDevice();
    
    // Initialize torch system
    this.createSpotlight();
    
    console.log('🔦 Torch system initialized');
  }
  
  /**
   * Detect Quest device type for optimization
   */
  detectQuestDevice() {
    try {
      const userAgent = navigator.userAgent.toLowerCase();
      
      // Quest 2 detection patterns
      if (userAgent.includes('quest 2') || 
          userAgent.includes('oculus quest 2') ||
          (userAgent.includes('oculus') && userAgent.includes('android') && !userAgent.includes('quest 3'))) {
        this.isQuest2 = true;
        return 'quest2';
      }
      
      // Quest 3 detection patterns
      if (userAgent.includes('quest 3') || 
          userAgent.includes('oculus quest 3') ||
          userAgent.includes('meta quest 3')) {
        this.isQuest3 = true;
        return 'quest3';
      }
      
      return 'unknown';
    } catch (error) {
      console.warn('Device detection failed:', error);
      return 'unknown';
    }
  }
  
  /**
   * Create/recreate the spotlight
   */
  createSpotlight(beamWidthDegrees = 25) {
    // Remove existing spotlight if it exists
    if (this.controllerSpotlight) {
      this.scene.remove(this.controllerSpotlight);
      this.scene.remove(this.spotlightTarget);
    }
    
    // Convert degrees to radians
    const beamWidthRadians = (beamWidthDegrees * Math.PI) / 180;
    
    // Adjust spotlight distance based on Quest device for performance
    const spotlightDistance = this.isQuest2 ? 15 : 15; // Keep same distance for now
    
    // Create new spotlight with configurable beam width
    this.controllerSpotlight = new THREE.SpotLight(
      0xffffff,        // Pure white light
      2.5,             // Realistic underwater torch intensity
      spotlightDistance, // Adjustable distance based on device
      beamWidthRadians, // Configurable beam width in radians
      0.15,            // Softer penumbra for more realistic falloff
      0.8              // Higher decay for realistic underwater attenuation
    );
    
    // Configure spotlight properties
    this.controllerSpotlight.position.set(0, 0, 0);
    // Start visible for debugging (normally hidden in Survey mode)
    this.controllerSpotlight.visible = true;
    this.controllerSpotlight.castShadow = true; // Enable shadow casting
    
    // Optimize shadow settings for VR performance and eliminate moire effects
    const shadowMapSize = this.isQuest2 ? 512 : 1024; // Reduce shadow quality on Quest 2
    this.controllerSpotlight.shadow.mapSize.width = shadowMapSize;
    this.controllerSpotlight.shadow.mapSize.height = shadowMapSize;
    this.controllerSpotlight.shadow.camera.near = 0.1;
    this.controllerSpotlight.shadow.camera.far = spotlightDistance; // Match spotlight distance
    this.controllerSpotlight.shadow.camera.fov = beamWidthDegrees; // Match spotlight angle
    
    // Fix shadow acne and moire effects with proper bias settings
    this.controllerSpotlight.shadow.bias = -0.0005; // Negative bias to prevent shadow acne
    this.controllerSpotlight.shadow.normalBias = 0.02; // Normal bias to reduce peter panning
    this.controllerSpotlight.shadow.radius = 4; // Softer shadow edges to reduce artifacts
    this.controllerSpotlight.shadow.blurSamples = 10; // More samples for smoother shadows
    
    // Add spotlight to scene
    this.scene.add(this.controllerSpotlight);
    
    // Create a simple target object for the spotlight
    this.spotlightTarget = new THREE.Object3D();
    this.scene.add(this.spotlightTarget);
    this.controllerSpotlight.target = this.spotlightTarget;
    
    console.log(`🔦 Spotlight created with ${beamWidthDegrees}° beam width, ${spotlightDistance}m distance, and ${shadowMapSize}px shadows`);
  }
  
  /**
   * Enable torch for dive mode
   */
  enableTorch() {
    if (this.controllerSpotlight) {
      console.log('🔦 Torch object:', this.controllerSpotlight);
      console.log('🔦 Torch position before enable:', this.controllerSpotlight.position);
      console.log('🔦 Torch intensity:', this.controllerSpotlight.intensity);
      console.log('🔦 Torch in scene:', this.scene.children.includes(this.controllerSpotlight));
      this.controllerSpotlight.visible = true;
      console.log('🔦 Torch enabled for dive mode, visible:', this.controllerSpotlight.visible);
      console.log('🔦 Torch position after enable:', this.controllerSpotlight.position);
    } else {
      console.error('🔦 Cannot enable torch - controllerSpotlight is null');
    }
  }
  
  /**
   * Disable torch for survey mode
   */
  disableTorch() {
    if (this.controllerSpotlight) {
      this.controllerSpotlight.visible = false;
      console.log('🔦 Torch disabled for survey mode');
    }
  }
  
  /**
   * Update torch position based on controller
   */
  updatePosition(controller) {
    if (!this.controllerSpotlight || !this.spotlightTarget || !controller) {
      if (!controller) {
        console.warn('🔦 updatePosition called with null controller');
      }
      return;
    }
    
    // Get controller world position and rotation
    const controllerPosition = new THREE.Vector3();
    const controllerQuaternion = new THREE.Quaternion();
    
    controller.getWorldPosition(controllerPosition);
    controller.getWorldQuaternion(controllerQuaternion);
    
    // Set spotlight position to controller position
    this.controllerSpotlight.position.copy(controllerPosition);
    
    // Calculate forward direction from controller
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(controllerQuaternion);
    
    // Position target in front of controller
    const targetPosition = controllerPosition.clone().add(forward.multiplyScalar(2));
    this.spotlightTarget.position.copy(targetPosition);
    
    // Debug logging (occasional to avoid spam)
    if (Math.random() < 0.01) { // 1% chance to log
      console.log('🔦 VR torch updated:', {
        controllerPos: controllerPosition.toArray(),
        spotlightPos: this.controllerSpotlight.position.toArray(),
        targetPos: this.spotlightTarget.position.toArray(),
        visible: this.controllerSpotlight.visible,
        intensity: this.controllerSpotlight.intensity
      });
    }
  }
  
  /**
   * Update torch position for non-VR mode (follow camera)
   */
  updateCameraPosition(camera) {
    if (!this.controllerSpotlight || !this.spotlightTarget) return;
    
    // Position spotlight at camera position
    this.controllerSpotlight.position.copy(camera.position);
    
    // Calculate forward direction from camera
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(camera.quaternion);
    
    // Position target in front of camera
    const targetPosition = camera.position.clone().add(forward.multiplyScalar(8));
    this.spotlightTarget.position.copy(targetPosition);
    
    // Debug logging (only occasionally to avoid spam)
    // if (Math.random() < 0.01) { // 1% chance to log
    //   console.log('🔦 Torch positioned at camera:', {
    //     spotlightPos: this.controllerSpotlight.position,
    //     targetPos: this.spotlightTarget.position,
    //     visible: this.controllerSpotlight.visible
    //   });
    // }
  }
  
  /**
   * Set torch intensity
   */
  setIntensity(intensity) {
    if (this.controllerSpotlight) {
      this.controllerSpotlight.intensity = intensity;
    }
  }
  
  /**
   * Set torch color
   */
  setColor(color) {
    if (this.controllerSpotlight) {
      this.controllerSpotlight.color.setHex(color);
    }
  }
  
  /**
   * Set torch beam width
   */
  setBeamWidth(degrees) {
    if (this.controllerSpotlight) {
      const radians = (degrees * Math.PI) / 180;
      this.controllerSpotlight.angle = radians;
      this.controllerSpotlight.shadow.camera.fov = degrees;
      this.controllerSpotlight.shadow.camera.updateProjectionMatrix();
    }
  }
  
  /**
   * Set torch distance
   */
  setDistance(distance) {
    if (this.controllerSpotlight) {
      this.controllerSpotlight.distance = distance;
      this.controllerSpotlight.shadow.camera.far = distance;
      this.controllerSpotlight.shadow.camera.updateProjectionMatrix();
    }
  }
  
  /**
   * Get torch visibility state
   */
  isVisible() {
    return this.controllerSpotlight ? this.controllerSpotlight.visible : false;
  }
  
  /**
   * Update torch system (call in animation loop)
   */
  update(deltaTime) {
    // Could add torch flickering, battery effects, etc. here
    // For now, just maintain steady operation
  }
  
  /**
   * Dispose of torch resources
   */
  dispose() {
    if (this.controllerSpotlight) {
      this.scene.remove(this.controllerSpotlight);
      this.controllerSpotlight = null;
    }
    
    if (this.spotlightTarget) {
      this.scene.remove(this.spotlightTarget);
      this.spotlightTarget = null;
    }
  }
}