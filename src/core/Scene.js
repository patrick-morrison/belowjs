import * as THREE from 'three';

export class Scene {
  constructor(config = {}) {
    this.config = config;
    this.scene = new THREE.Scene();
    this.init();
  }

  init() {
    let backgroundColor = 0x0a1a2a;
    if (this.config.background) {
      if (typeof this.config.background === 'object' && this.config.background.value) {
        backgroundColor = this.config.background.value;
      } else {
        backgroundColor = this.config.background;
      }
    }
    this.scene.background = new THREE.Color(backgroundColor);
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
    this.scene.clear();
  }
}
