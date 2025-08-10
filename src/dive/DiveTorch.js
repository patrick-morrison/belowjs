import * as THREE from 'three';

export class DiveTorch {
  constructor(scene) {
    this.scene = scene;
    
    this.controllerSpotlight = null;
    this.spotlightTarget = null;
    
    this.isQuest2 = false;
    this.isQuest3 = false;
    this.detectQuestDevice();
    
    this.createSpotlight();
    
  }
  
  detectQuestDevice() {
    try {
      const userAgent = navigator.userAgent.toLowerCase();
      
      if (userAgent.includes('quest 2') || 
          userAgent.includes('oculus quest 2') ||
          (userAgent.includes('oculus') && userAgent.includes('android') && !userAgent.includes('quest 3'))) {
        this.isQuest2 = true;
        return 'quest2';
      }
      
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

    if (this.controllerSpotlight) {
      this.scene.remove(this.controllerSpotlight);
      this.scene.remove(this.spotlightTarget);
    }
    

    const beamWidthRadians = (beamWidthDegrees * Math.PI) / 180;
    
    const spotlightDistance = this.isQuest2 ? 15 : 15;
    
    this.controllerSpotlight = new THREE.SpotLight(
      0xffffff,        // Pure white light
      2.5,             // Realistic underwater torch intensity
      spotlightDistance, // Adjustable distance based on device
      beamWidthRadians, // Configurable beam width in radians
      0.15,            // Softer penumbra for more realistic falloff
      0.8              // Higher decay for realistic underwater attenuation
    );
    

    this.controllerSpotlight.position.set(0, 0, 0);
    this.controllerSpotlight.visible = true;
    this.controllerSpotlight.castShadow = true;
    

    const shadowMapSize = this.isQuest2 ? 512 : 1024; // Reduce shadow quality on Quest 2
    this.controllerSpotlight.shadow.mapSize.width = shadowMapSize;
    this.controllerSpotlight.shadow.mapSize.height = shadowMapSize;
    this.controllerSpotlight.shadow.camera.near = 0.1;
    this.controllerSpotlight.shadow.camera.far = spotlightDistance; // Match spotlight distance
    this.controllerSpotlight.shadow.camera.fov = beamWidthDegrees; // Match spotlight angle
    

    this.controllerSpotlight.shadow.bias = -0.0005; // Negative bias to prevent shadow acne
    this.controllerSpotlight.shadow.normalBias = 0.02; // Normal bias to reduce peter panning
    this.controllerSpotlight.shadow.radius = 4; // Softer shadow edges to reduce artifacts
    this.controllerSpotlight.shadow.blurSamples = 10; // More samples for smoother shadows
    
    this.scene.add(this.controllerSpotlight);
    
    this.spotlightTarget = new THREE.Object3D();
    this.scene.add(this.spotlightTarget);
    this.controllerSpotlight.target = this.spotlightTarget;
    
  }
  
  enableTorch() {
    if (this.controllerSpotlight) {
      this.controllerSpotlight.visible = true;
    } else {
      console.error('Cannot enable torch - controllerSpotlight is null');
    }
  }
  
  /**
   * Disable torch for survey mode
   */
  disableTorch() {
    if (this.controllerSpotlight) {
      this.controllerSpotlight.visible = false;
    }
  }
  
  /**
   * Update torch position based on controller
   */
  updatePosition(controller) {
    if (!this.controllerSpotlight || !this.spotlightTarget || !controller) {
      if (!controller) {
        console.warn('updatePosition called with null controller');
      }
      return;
    }
    

    const controllerPosition = new THREE.Vector3();
    const controllerQuaternion = new THREE.Quaternion();
    
    controller.getWorldPosition(controllerPosition);
    controller.getWorldQuaternion(controllerQuaternion);
    

    this.controllerSpotlight.position.copy(controllerPosition);
    
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(controllerQuaternion);
    
    const targetPosition = controllerPosition.clone().add(forward.multiplyScalar(2));
    this.spotlightTarget.position.copy(targetPosition);
  }
  
  updateCameraPosition(camera) {
    if (!this.controllerSpotlight || !this.spotlightTarget) return;
    

    this.controllerSpotlight.position.copy(camera.position);
    

    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(camera.quaternion);
    

    const targetPosition = camera.position.clone().add(forward.multiplyScalar(8));
    this.spotlightTarget.position.copy(targetPosition);
    
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