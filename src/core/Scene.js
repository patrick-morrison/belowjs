import * as THREE from 'three';

/**
 * Scene management class
 */
export class Scene {
  constructor(config = {}) {
    this.config = config;
    this.scene = new THREE.Scene();
    this.lights = {};
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
    this.lights.ambient = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(this.lights.ambient);

    // Directional light for definition
    this.lights.directional = new THREE.DirectionalLight(0xffffff, 0.8);
    this.lights.directional.position.set(10, 10, 5);
    this.lights.directional.castShadow = true;
    this.scene.add(this.lights.directional);

    // Hemisphere light for natural lighting
    this.lights.hemisphere = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    this.scene.add(this.lights.hemisphere);
  }

  applySurveyLighting() {
    if (!this.lights.ambient) return;

    this.scene.fog = null;
    this.lights.ambient.color.setHex(0xffffff);
    this.lights.ambient.intensity = 0.4;

    if (this.lights.directional) {
      this.lights.directional.color.setHex(0xffffff);
      this.lights.directional.intensity = 0.8;
    }

    if (this.lights.hemisphere) {
      this.lights.hemisphere.color.setHex(0xffffff);
      this.lights.hemisphere.intensity = 0.6;
    }
  }

  applyDiveLighting() {
    if (!this.lights.ambient) return;

    this.scene.fog = new THREE.FogExp2(0x041729, 0.06);
    this.lights.ambient.color.setHex(0x1a3b5c);
    this.lights.ambient.intensity = 0.005;

    if (this.lights.directional) {
      this.lights.directional.intensity = 0;
    }

    if (this.lights.hemisphere) {
      this.lights.hemisphere.intensity = 0;
    }
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
