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
    // Lighting is now managed exclusively by DiveLighting
  }

  // setupLighting removed: all lighting is managed by DiveLighting

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
