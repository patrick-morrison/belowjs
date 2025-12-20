/**
 * ARManager - Main AR Coordinator
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

    // AR modules
    this.arCore = new ARCore(renderer, camera, scene, container);
    this.handTracking = this.config.enableHandTracking ? new ARHandTracking(renderer) : null;

    // Model container group
    this.modelGroup = new THREE.Group();
    this.modelGroup.name = 'AR Model Group';
    this.scene.add(this.modelGroup);
    this.currentModel = null;
    this.pendingModel = null;
    this.pendingModelConfig = null;
    this.currentModelScale = this.config.defaultScale;

    // World cube
    this.worldCube = null;
    if (this.config.enableWorldCube) {
      this.createWorldCube();
    }

    // AR state
    this.isARPresenting = false;
    this.previousGestureType = null;

    this.init();
  }

  init() {
    this.arCore.init();

    if (this.handTracking) {
      this.handTracking.init(this.scene);

      // Set up gesture callbacks
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
      console.log('🚀 ARManager: Session starting!');
      this.isARPresenting = true;

      // Activate the pending model (move it from main scene to AR scene)
      this.activateModel();

      // Show world cube
      if (this.worldCube) {
        this.worldCube.visible = true;
      }

      console.log('🚀 ARManager: Emitting session-start event');
      this.emit('session-start');
    };

    this.arCore.onSessionEnd = () => {
      this.isARPresenting = false;

      // Hide world cube
      if (this.worldCube) {
        this.worldCube.visible = false;
      }

      // Stop hand tracking
      if (this.handTracking) {
        this.handTracking.stop();
      }

      this.emit('session-end');
    };
  }

  prepareModel(model, modelConfig = null) {
    // Store reference to model without adding it to AR scene yet
    // This prevents affecting desktop view
    console.log('🎯 ARManager.prepareModel: Preparing model', model ? 'YES' : 'NO', 'AR presenting:', this.isARPresenting);

    // Stop hand tracking gestures when switching models
    if (this.handTracking) {
      this.handTracking.stop();
    }

    // Store the pending model and config
    this.pendingModel = model;
    this.pendingModelConfig = modelConfig;

    if (model) {
      const modelScale = modelConfig?.defaultScale || model.userData?.defaultScale || this.config.defaultScale;
      this.currentModelScale = modelScale;
      console.log('✅ ARManager.prepareModel: Model ready for AR at scale', modelScale);

      // If AR is already presenting (even if paused), activate immediately
      if (this.isARPresenting) {
        console.log('🔄 ARManager.prepareModel: AR is presenting, activating model now');
        this.activateModel();
      }
    } else {
      console.log('✅ ARManager.prepareModel: Cleared');

      // If AR is presenting and we're clearing, clear the active model too
      if (this.isARPresenting) {
        this.activateModel();
      }
    }
  }

  activateModel() {
    // Move the pending model into AR scene (called when AR session starts)
    console.log('🎯 ARManager.activateModel: Activating model', this.pendingModel ? 'YES' : 'NO');

    // Remove and clear previous model if it exists
    if (this.currentModel) {
      console.log('🗑️ ARManager.activateModel: Removing previous model');
      this.modelGroup.remove(this.currentModel);
      // Clear all children to ensure clean state
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
      console.log('✅ ARManager.activateModel: Model activated at scale', this.currentModelScale);
    } else {
      console.log('✅ ARManager.activateModel: No model to activate');
    }
  }

  // Legacy method for compatibility - now just calls prepareModel
  setTargetModel(model, modelConfig = null) {
    this.prepareModel(model, modelConfig);
  }

  update(deltaTime) {
    if (!this.isActive()) {
      console.log('❌ ARManager.update: AR not active');
      return;
    }

    if (!this.currentModel) {
      console.log('❌ ARManager.update: No model loaded');
      return;
    }

    const deltaSeconds = deltaTime / 1000;

    if (this.handTracking) {
      console.log('✅ ARManager.update: Calling handTracking.update');
      this.handTracking.update(deltaSeconds, this.modelGroup, this.camera);
    } else {
      console.log('❌ ARManager.update: No handTracking');
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
