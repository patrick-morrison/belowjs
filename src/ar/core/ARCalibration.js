/**
 * ARCalibration - Manual shared-space alignment from two control points
 *
 * Lets users place two control points with the controllers (trigger) or by
 * pinching with hand tracking. The points define a frame — origin at point 1,
 * yaw oriented along point 1 → point 2 — that the AR content is anchored to.
 * Two colocated headsets that mark the same physical landmarks in the same
 * order see the model in the same physical place, without any shared-spaces
 * API.
 *
 * Points are stored in 'local-floor' coordinates, which are tied to the
 * persisted boundary, so the alignment is saved to localStorage and restored
 * when a session restarts in the same play space.
 */

import * as THREE from 'three';

const STORAGE_PREFIX = 'belowjs:ar-calibration:';

export class ARCalibration {
  constructor(renderer, scene, targetGroup, options = {}) {
    this.renderer = renderer;
    this.scene = scene;
    this.targetGroup = targetGroup;

    const pageKey = (typeof window !== 'undefined' && window.location?.pathname) ? window.location.pathname : 'default';
    this.storageKey = STORAGE_PREFIX + (options.storageKey || pageKey);

    this.active = false;
    this.aligned = false;
    this.restored = false;
    this.points = [];

    // Visuals styled to match the measurement system spheres
    this.sphereGeometry = new THREE.SphereGeometry(0.02, 8, 6);
    this.placedMaterial = new THREE.MeshBasicMaterial({ color: 0x64c8ff });
    this.ghostMaterial = new THREE.MeshBasicMaterial({
      color: 0x64c8ff,
      transparent: true,
      opacity: 0.25,
      depthTest: false,
      depthWrite: false
    });
    this.lineMaterial = new THREE.LineBasicMaterial({
      color: 0x64c8ff,
      transparent: true,
      opacity: 0.8,
      depthTest: false
    });

    this.visuals = new THREE.Group();
    this.visuals.name = 'AR Calibration Points';
    this.visuals.visible = false;
    this.scene.add(this.visuals);

    this.controllers = [];
    this.ghostSpheres = [];
    this.connectionLine = null;

    // Hold both grips to restart calibration from inside the headset
    this.squeezeHeld = [false, false];
    this.squeezeHoldStart = 0;
    this.SQUEEZE_HOLD_MS = 1200;
    this.lastPlaceTime = 0;

    this.onStart = null;
    this.onPointPlaced = null;
    this.onComplete = null;
    this.onCleared = null;

    this._listeners = [];
  }

  attach() {
    if (this.controllers.length > 0) return;

    for (let i = 0; i < 2; i++) {
      const controller = this.renderer.xr.getController(i);
      if (!controller.parent) {
        this.scene.add(controller);
      }

      const onSelectEnd = () => this._handleSelect(i);
      const onSqueezeStart = () => this._handleSqueeze(i, true);
      const onSqueezeEnd = () => this._handleSqueeze(i, false);
      controller.addEventListener('selectend', onSelectEnd);
      controller.addEventListener('squeezestart', onSqueezeStart);
      controller.addEventListener('squeezeend', onSqueezeEnd);
      this._listeners.push({ controller, onSelectEnd, onSqueezeStart, onSqueezeEnd });

      this.controllers.push(controller);
    }

    // Calibration may have been armed before the session started
    if (this.active) {
      this._addGhostSpheres();
    }
  }

  detach() {
    this._listeners.forEach(({ controller, onSelectEnd, onSqueezeStart, onSqueezeEnd }) => {
      controller.removeEventListener('selectend', onSelectEnd);
      controller.removeEventListener('squeezestart', onSqueezeStart);
      controller.removeEventListener('squeezeend', onSqueezeEnd);
    });
    this._listeners = [];
    this._removeGhostSpheres();
    this.controllers = [];
    this.squeezeHeld = [false, false];
    this.active = false;
  }

  /** Begin placing the two control points (clears any existing alignment). */
  start() {
    this.clear({ silent: true });
    this.active = true;
    this._addGhostSpheres();
    if (this.onStart) this.onStart();
  }

  cancel() {
    this.active = false;
    this._removeGhostSpheres();
    if (!this.aligned && this.points.length > 0) {
      this._clearVisuals();
      this.points = [];
    }
  }

  clear({ silent = false } = {}) {
    this.cancel();
    this._clearVisuals();
    this.points = [];
    this.aligned = false;
    this.restored = false;
    this.targetGroup.position.set(0, 0, 0);
    this.targetGroup.rotation.set(0, 0, 0);
    try {
      window.localStorage.removeItem(this.storageKey);
    } catch {
      // Storage unavailable (private mode); alignment is session-only
    }
    if (!silent && this.onCleared) this.onCleared();
  }

  /** Restore a saved alignment (valid while the boundary/floor persists). */
  restore() {
    if (this.aligned || this.active) return false;

    let saved = null;
    try {
      saved = JSON.parse(window.localStorage.getItem(this.storageKey));
    } catch {
      return false;
    }
    if (!saved || !Array.isArray(saved.points) || saved.points.length !== 2) return false;

    this.points = saved.points.map(p => new THREE.Vector3(p[0], p[1], p[2]));
    this.points.forEach(point => this._addPlacedSphere(point));
    this._updateConnectionLine();

    if (this._applyAlignment()) {
      this.aligned = true;
      this.restored = true;
      if (this.onComplete) this.onComplete(this.getState());
      return true;
    }

    this.clear({ silent: true });
    return false;
  }

  update() {
    if (this.controllers.length === 0) return;

    // Both grips held: restart calibration
    if (this.squeezeHeld[0] && this.squeezeHeld[1] && this.squeezeHoldStart > 0) {
      if (performance.now() - this.squeezeHoldStart >= this.SQUEEZE_HOLD_MS) {
        this.squeezeHoldStart = 0;
        this.start();
      }
    }
  }

  getState() {
    return {
      active: this.active,
      aligned: this.aligned,
      restored: this.restored,
      pointCount: this.points.length,
      pointDistance: this.points.length === 2 ? this.points[0].distanceTo(this.points[1]) : null
    };
  }

  setVisualsVisible(visible) {
    this.visuals.visible = visible;
  }

  _handleSqueeze(index, held) {
    this.squeezeHeld[index] = held;
    if (this.squeezeHeld[0] && this.squeezeHeld[1]) {
      this.squeezeHoldStart = performance.now();
    } else {
      this.squeezeHoldStart = 0;
    }
  }

  _handleSelect(index) {
    if (!this.active) return;

    const now = performance.now();
    if (now - this.lastPlaceTime < 300) return;
    this.lastPlaceTime = now;

    const ghost = this.ghostSpheres[index];
    const source = ghost || this.controllers[index];
    if (!source) return;

    const point = new THREE.Vector3();
    source.getWorldPosition(point);

    this.points.push(point);
    this._addPlacedSphere(point);
    if (this.onPointPlaced) this.onPointPlaced(this.points.length);

    if (this.points.length >= 2) {
      this._completeCalibration();
    }
  }

  _completeCalibration() {
    this.active = false;
    this._removeGhostSpheres();
    this._updateConnectionLine();

    if (!this._applyAlignment()) {
      // Points too close together to define a direction; try again
      this.start();
      return;
    }

    this.aligned = true;
    this.restored = false;
    this._save();
    if (this.onComplete) this.onComplete(this.getState());
  }

  _applyAlignment() {
    if (this.points.length !== 2) return false;

    const [a, b] = this.points;
    const direction = new THREE.Vector3().subVectors(b, a);
    direction.y = 0;
    if (direction.lengthSq() < 1e-4) return false;
    direction.normalize();

    // Frame: origin at point 1, +X pointing horizontally toward point 2
    const yaw = Math.atan2(-direction.z, direction.x);
    this.targetGroup.position.copy(a);
    this.targetGroup.rotation.set(0, yaw, 0);
    return true;
  }

  _save() {
    try {
      window.localStorage.setItem(this.storageKey, JSON.stringify({
        points: this.points.map(p => [p.x, p.y, p.z]),
        savedAt: Date.now()
      }));
    } catch {
      // Storage unavailable; alignment is session-only
    }
  }

  _addGhostSpheres() {
    this._removeGhostSpheres();
    this.controllers.forEach((controller, i) => {
      const ghost = new THREE.Mesh(this.sphereGeometry, this.ghostMaterial.clone());
      ghost.scale.set(0.5, 0.5, 0.5);
      ghost.position.set(0, 0, -0.07);
      controller.add(ghost);
      this.ghostSpheres[i] = ghost;
    });
  }

  _removeGhostSpheres() {
    this.ghostSpheres.forEach(ghost => {
      if (ghost && ghost.parent) ghost.parent.remove(ghost);
    });
    this.ghostSpheres = [];
  }

  _addPlacedSphere(point) {
    const sphere = new THREE.Mesh(this.sphereGeometry, this.placedMaterial.clone());
    sphere.position.copy(point);
    sphere.name = 'AR Calibration Point';
    this.visuals.add(sphere);
  }

  _updateConnectionLine() {
    if (this.connectionLine) {
      this.visuals.remove(this.connectionLine);
      this.connectionLine.geometry.dispose();
      this.connectionLine = null;
    }
    if (this.points.length === 2) {
      const geometry = new THREE.BufferGeometry().setFromPoints(this.points);
      this.connectionLine = new THREE.Line(geometry, this.lineMaterial);
      this.visuals.add(this.connectionLine);
    }
  }

  _clearVisuals() {
    if (this.connectionLine) {
      this.visuals.remove(this.connectionLine);
      this.connectionLine.geometry.dispose();
      this.connectionLine = null;
    }
    [...this.visuals.children].forEach(child => {
      this.visuals.remove(child);
      if (child.material && child.material.dispose) child.material.dispose();
    });
  }

  dispose() {
    this.detach();
    this._clearVisuals();
    this.scene.remove(this.visuals);
    this.sphereGeometry.dispose();
    this.placedMaterial.dispose();
    this.ghostMaterial.dispose();
    this.lineMaterial.dispose();
  }
}
