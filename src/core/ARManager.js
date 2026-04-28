/**
 * ARManager - AR session coordination and lifecycle management
 */

import * as THREE from 'three';
import { ARCore } from '../ar/core/ARCore.js';
import { ARHandTracking } from '../ar/core/ARHandTracking.js';
import { EventSystem } from '../utils/EventSystem.js';

export class ARManager extends EventSystem {
  constructor(renderer, camera, scene, config = {}, container = null) {
    super();

    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.config = {
      enableHandTracking: true,
      enableWorldCube: true,
      defaultScale: 0.05,
      worldCubeSize: 1000.0,
      worldCubeOpacity: 0.1,
      ...config
    };
    this.container = container;

    this.arCore = new ARCore(renderer, camera, scene, container);
    this.handTracking = this.config.enableHandTracking ? new ARHandTracking(renderer) : null;

    this.modelGroup = new THREE.Group();
    this.modelGroup.name = 'AR Model Group';
    this.scene.add(this.modelGroup);
    this.currentModel = null;
    this.pendingModel = null;
    this.pendingModelConfig = null;
    this.currentModelScale = this.config.defaultScale;

    this.worldCube = null;
    if (this.config.enableWorldCube) {
      this.createWorldCube();
    }

    this.isARPresenting = false;
    this.previousGestureType = null;

    this.init();
  }

  init() {
    this.arCore.init();

    if (this.handTracking) {
      this.handTracking.init(this.scene);

      this.handTracking.onGestureStart = (type) => {
        if (this.previousGestureType !== type) {
          this.emit('gesture-start', type);
          this.previousGestureType = type;
        }
      };

      this.handTracking.onGestureEnd = () => {
        if (this.previousGestureType) {
          this.emit('gesture-end', this.previousGestureType);
          this.previousGestureType = null;
        }
      };
    }

    this.setupSessionLifecycle();
  }

  setupSessionLifecycle() {
    this.arCore.onSessionStart = () => {
      this.isARPresenting = true;
      this.activateModel();

      if (this.worldCube) {
        this.worldCube.visible = true;
      }

      this.emit('session-start');
    };

    this.arCore.onSessionEnd = () => {
      this.isARPresenting = false;

      if (this.worldCube) {
        this.worldCube.visible = false;
      }

      if (this.handTracking) {
        this.handTracking.stop();
      }

      this.emit('session-end');
    };
  }

  prepareModel(model, modelConfig = null) {
    if (this.handTracking) {
      this.handTracking.stop();
    }

    this.pendingModel = model;
    this.pendingModelConfig = modelConfig;

    if (model) {
      const modelScale = modelConfig?.defaultScale || model.userData?.defaultScale || this.config.defaultScale;
      this.currentModelScale = modelScale;

      if (this.isARPresenting) {
        this.activateModel();
      }
    } else {
      if (this.isARPresenting) {
        this.activateModel();
      }
    }
  }

  activateModel() {
    if (this.currentModel) {
      this.modelGroup.remove(this.currentModel);
      while (this.modelGroup.children.length > 0) {
        this.modelGroup.remove(this.modelGroup.children[0]);
      }
    }

    this.currentModel = this.pendingModel;
    if (this.currentModel) {
      this.modelGroup.add(this.currentModel);
      this.modelGroup.position.set(0, 0, 0);
      this.modelGroup.rotation.set(0, 0, 0);
      this.modelGroup.scale.setScalar(this.currentModelScale);
    }
  }

  setTargetModel(model, modelConfig = null) {
    this.prepareModel(model, modelConfig);
  }

  update(deltaTime) {
    if (!this.isActive() || !this.currentModel) return;

    const deltaSeconds = deltaTime / 1000;

    if (this.handTracking) {
      this.handTracking.update(deltaSeconds, this.modelGroup, this.camera);
    }
  }

  createWorldCube() {
    const size = this.config.worldCubeSize;
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: this.config.worldCubeOpacity,
      side: THREE.BackSide,
      depthWrite: false
    });

    this.worldCube = new THREE.Mesh(geometry, material);
    this.worldCube.name = 'AR World Cube';
    this.worldCube.visible = false;
    this.scene.add(this.worldCube);
  }

  setWorldCubeOpacity(opacity) {
    if (this.worldCube) {
      this.worldCube.material.opacity = Math.max(0, Math.min(1, opacity));
    }
  }

  setModelScale(scale) {
    if (this.modelGroup) {
      this.modelGroup.scale.setScalar(Math.max(0.01, Math.min(1.0, scale)));
    }
  }

  setModelOpacity(opacity) {
    if (this.currentModel) {
      this.currentModel.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = Math.max(0, Math.min(1, opacity));
        }
      });
    }
  }

  getModelTransform() {
    return {
      position: {
        x: this.modelGroup.position.x,
        y: this.modelGroup.position.y,
        z: this.modelGroup.position.z
      },
      rotation: {
        x: this.modelGroup.rotation.x,
        y: this.modelGroup.rotation.y,
        z: this.modelGroup.rotation.z
      },
      scale: {
        x: this.modelGroup.scale.x,
        y: this.modelGroup.scale.y,
        z: this.modelGroup.scale.z
      }
    };
  }

  setModelTransform(transform) {
    if (transform.position) {
      this.modelGroup.position.set(transform.position.x, transform.position.y, transform.position.z);
    }
    if (transform.rotation) {
      this.modelGroup.rotation.set(transform.rotation.x, transform.rotation.y, transform.rotation.z);
    }
    if (transform.scale) {
      this.modelGroup.scale.set(transform.scale.x, transform.scale.y, transform.scale.z);
    }
  }

  isActive() {
    return this.isARPresenting;
  }

  getARStatus() {
    return this.arCore.getARStatus();
  }

  dispose() {
    if (this.arCore) {
      this.arCore.dispose();
    }

    if (this.handTracking) {
      this.handTracking.dispose();
    }

    if (this.worldCube) {
      this.scene.remove(this.worldCube);
      this.worldCube.geometry.dispose();
      this.worldCube.material.dispose();
    }

    if (this.modelGroup) {
      this.scene.remove(this.modelGroup);
    }

    this.isARPresenting = false;
    this.currentModel = null;
  }
}
