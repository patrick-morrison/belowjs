import * as THREE from 'three';

/**
 * Scene management class
 */
export class Scene {
  constructor(config = {}) {
    this.config = config;
    this.scene = new THREE.Scene();
    this.init();
  }

  init() {
    // Set background color - handle both direct color and config object
    let backgroundColor = 0x0a1a2a; // Default
    
    if (this.config.background) {
      if (typeof this.config.background === 'object' && this.config.background.value) {
        backgroundColor = this.config.background.value;
      } else {
        backgroundColor = this.config.background;
      }
    }
    
    this.scene.background = new THREE.Color(backgroundColor);
    
    // Basic lighting setup
    this.setupLighting();
  }

  setupLighting() {
    // Ambient light for basic visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    // Directional light for definition
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    // Hemisphere light for natural lighting
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    this.scene.add(hemisphereLight);
  }

  add(object) {
    this.scene.add(object);
  }

  remove(object) {
    this.scene.remove(object);
  }

  getScene() {
    return this.scene;
  }

  dispose() {
    // Clean up scene
    this.scene.clear();
  }
}
