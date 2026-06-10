/**
 * ARManager - AR session coordination and lifecycle management
 */

import * as THREE from 'three';
import { ARCore } from '../ar/core/ARCore.js';
import { ARHandTracking } from '../ar/core/ARHandTracking.js';
import { ARCalibration } from '../ar/core/ARCalibration.js';
import { EventSystem } from '../utils/EventSystem.js';

export class ARManager extends EventSystem {
  constructor(renderer, camera, scene, config = {}, container = null, options = {}) {
    super();

    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.config = {
      enableHandTracking: true,
      enableWorldCube: true,
      enableCalibration: true,
      showStatusPanel: true,
      defaultScale: 0.05,
      worldCubeSize: 1000.0,
      worldCubeOpacity: 0.1,
      ...config
    };
    this.container = container;
    this.options = options;

    this.arCore = new ARCore(renderer, camera, scene, container);
    this.handTracking = this.config.enableHandTracking ? new ARHandTracking(renderer, options) : null;

    // Alignment group: calibration anchors this frame to two physical control
    // points; everything the user manipulates lives inside it
    this.alignmentGroup = new THREE.Group();
    this.alignmentGroup.name = 'AR Alignment Group';
    this.scene.add(this.alignmentGroup);

    this.modelGroup = new THREE.Group();
    this.modelGroup.name = 'AR Model Group';
    this.alignmentGroup.add(this.modelGroup);

    this.calibration = this.config.enableCalibration
      ? new ARCalibration(renderer, scene, this.alignmentGroup, { storageKey: this.config.calibrationStorageKey })
      : null;

    this.overlayRoot = null;
    this.statusPanel = null;
    this.alignButton = null;
    if (this.config.showStatusPanel || this.calibration) {
      this.createOverlayUI();
      this.arCore.setOverlayRoot(this.overlayRoot);
    }

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

    this.arCore.onSupportChecked = (supported) => {
      if (this.overlayRoot) {
        this.overlayRoot.style.display = supported ? '' : 'none';
      }
      this.updateStatusPanel();
    };

    if (this.calibration) {
      this.calibration.onStart = () => {
        if (this.handTracking) this.handTracking.setInteractionEnabled(false);
        this.updateStatusPanel();
        this.emit('calibration-start');
      };
      this.calibration.onPointPlaced = (count) => {
        this.updateStatusPanel();
        this.emit('calibration-point', count);
      };
      this.calibration.onComplete = (state) => {
        if (this.handTracking) this.handTracking.setInteractionEnabled(true);
        this.updateStatusPanel();
        this.emit('calibration-complete', state);
      };
      this.calibration.onCleared = () => {
        if (this.handTracking) this.handTracking.setInteractionEnabled(true);
        this.updateStatusPanel();
        this.emit('calibration-cleared');
      };
    }

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

      if (this.calibration) {
        this.calibration.attach();
        this.calibration.setVisualsVisible(true);
        // Re-anchor to saved control points (valid while the boundary persists)
        this.calibration.restore();
      }

      this.updateStatusPanel();
      this.emit('session-start');
    };

    this.arCore.onSessionEnd = () => {
      this.isARPresenting = false;

      if (this.worldCube) {
        this.worldCube.visible = false;
      }

      if (this.calibration) {
        this.calibration.cancel();
        this.calibration.detach();
        this.calibration.setVisualsVisible(false);
      }

      if (this.handTracking) {
        this.handTracking.stop();
        this.handTracking.setInteractionEnabled(true);
      }

      this.updateStatusPanel();
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
    if (!this.isActive()) return;

    if (this.calibration) {
      this.calibration.update();
    }

    if (!this.currentModel) return;

    const deltaSeconds = deltaTime / 1000;

    if (this.handTracking) {
      this.handTracking.update(deltaSeconds, this.modelGroup, this.camera);
    }
  }

  startCalibration() {
    if (this.calibration) {
      this.calibration.start();
    }
  }

  clearCalibration() {
    if (this.calibration) {
      this.calibration.clear();
    }
  }

  getCalibrationState() {
    return this.calibration ? this.calibration.getState() : null;
  }

  createOverlayUI() {
    if (typeof document === 'undefined') return;

    this.overlayRoot = document.createElement('div');
    this.overlayRoot.className = 'ar-overlay-root';
    this.overlayRoot.style.display = 'none';
    // Keep overlay interactions from also firing controller select events
    this.overlayRoot.addEventListener('beforexrselect', (event) => {
      event.preventDefault();
    });

    if (this.config.showStatusPanel) {
      this.statusPanel = document.createElement('div');
      this.statusPanel.className = 'ar-status-panel';
      this.overlayRoot.appendChild(this.statusPanel);
    }

    if (this.calibration) {
      this.alignButton = document.createElement('button');
      this.alignButton.className = 'ar-align-button';
      this.alignButton.innerHTML = '<span class="ar-icon">⚓</span>ALIGN SPACE';
      this.alignButton.addEventListener('click', () => {
        const state = this.getCalibrationState();
        if (state && state.active) {
          this.calibration.cancel();
          if (this.handTracking) this.handTracking.setInteractionEnabled(true);
          this.updateStatusPanel();
        } else {
          this.startCalibration();
        }
      });
      this.overlayRoot.appendChild(this.alignButton);
    }

    (this.container || document.body).appendChild(this.overlayRoot);
    this.updateStatusPanel();
  }

  updateStatusPanel() {
    if (this.alignButton) {
      const state = this.getCalibrationState();
      const active = state && state.active;
      this.alignButton.innerHTML = active
        ? '<span class="ar-icon">✕</span>CANCEL ALIGN'
        : '<span class="ar-icon">⚓</span>ALIGN SPACE';
      this.alignButton.classList.toggle('ar-align-button--active', !!active);
    }

    if (!this.statusPanel) return;

    const status = this.arCore.getARStatus();
    const rows = [];

    rows.push({
      label: 'Session',
      value: status.presenting ? 'active' : 'idle',
      ok: status.presenting
    });

    if (status.presenting) {
      const refSpace = status.referenceSpaceType;
      rows.push({
        label: 'Space',
        value: refSpace === 'local-floor' ? 'local-floor (shared)' : `${refSpace || 'unknown'} — re-centres on wear`,
        ok: refSpace === 'local-floor'
      });

      if (status.enabledFeatures.length > 0) {
        rows.push({
          label: 'Anchors',
          value: status.enabledFeatures.includes('anchors') ? 'available' : 'unavailable',
          ok: status.enabledFeatures.includes('anchors')
        });
      }
    }

    if (this.calibration) {
      const state = this.calibration.getState();
      let value = 'not set';
      let ok = false;
      if (state.active) {
        value = `placing point ${state.pointCount + 1} of 2 — pull trigger`;
      } else if (state.aligned) {
        const distance = state.pointDistance ? `${state.pointDistance.toFixed(2)} m apart` : '';
        value = `aligned${state.restored ? ' (restored)' : ''} · ${distance}`;
        ok = true;
      }
      rows.push({ label: 'Alignment', value, ok });
    }

    this.statusPanel.innerHTML = rows.map(row => `
      <div class="ar-status-row">
        <span class="ar-status-dot ${row.ok ? 'ar-status-dot--ok' : 'ar-status-dot--warn'}"></span>
        <span class="ar-status-label">${row.label}</span>
        <span class="ar-status-value">${row.value}</span>
      </div>
    `).join('');
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

    if (this.calibration) {
      this.calibration.dispose();
      this.calibration = null;
    }

    if (this.overlayRoot && this.overlayRoot.parentNode) {
      this.overlayRoot.parentNode.removeChild(this.overlayRoot);
      this.overlayRoot = null;
      this.statusPanel = null;
      this.alignButton = null;
    }

    if (this.worldCube) {
      this.scene.remove(this.worldCube);
      this.worldCube.geometry.dispose();
      this.worldCube.material.dispose();
    }

    if (this.alignmentGroup) {
      this.scene.remove(this.alignmentGroup);
    }

    this.isARPresenting = false;
    this.currentModel = null;
  }
}
