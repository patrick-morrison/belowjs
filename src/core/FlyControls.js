import * as THREE from 'three';
import { EventSystem } from '../utils/EventSystem.js';

/**
 * FlyControls - Pointer-lock fly navigation for desktop
 *
 * Enables first-person fly movement using keyboard (W/A/S/D/Q/E) and mouse look
 * while pointer-locked. Designed to integrate with OrbitControls by syncing
 * the controls target to the camera forward direction.
 */
export class FlyControls extends EventSystem {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.domElement - Element used for pointer lock
   * @param {THREE.PerspectiveCamera} options.camera - Camera to control
   * @param {Object} options.controls - OrbitControls instance
   * @param {THREE.WebGLRenderer} [options.renderer] - Renderer (for XR checks)
   * @param {boolean} [options.enabled=true] - Enable fly controls
   * @param {number} [options.baseSpeed=6] - Base movement speed
   * @param {number} [options.boostSpeed=20] - Boosted speed (shift held)
   * @param {number} [options.speedScale=100] - Reference size for scaling speed
   * @param {number} [options.mouseSensitivity=0.002] - Mouse sensitivity
   * @param {boolean} [options.clickToExit=true] - Exit fly mode on click
   */
  constructor(options = {}) {
    super();

    this.domElement = options.domElement || null;
    this.camera = options.camera || null;
    this.controls = options.controls || null;
    this.renderer = options.renderer || null;

    this.enabled = options.enabled ?? true;
    this.baseSpeed = options.baseSpeed ?? 6;
    this.boostSpeed = options.boostSpeed ?? 20;
    this.speedScale = options.speedScale ?? 100;
    this.mouseSensitivity = options.mouseSensitivity ?? 0.002;
    this.clickToExit = options.clickToExit ?? true;

    this.pointerLocked = false;
    this.modelSize = this.speedScale;
    this.cameraYaw = 0;
    this.cameraPitch = 0;

    this.keys = {
      w: false,
      a: false,
      s: false,
      d: false,
      q: false,
      e: false,
      shift: false
    };

    this._controlsEnabledBefore = true;

    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onPointerLockChange = this._onPointerLockChange.bind(this);
    this._onClick = this._onClick.bind(this);

    this.attach();
  }

  attach() {
    if (!this.domElement || typeof document === 'undefined') return;

    document.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('keyup', this._onKeyUp);
    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('pointerlockchange', this._onPointerLockChange);

    if (this.clickToExit) {
      this.domElement.addEventListener('click', this._onClick);
    }
  }

  dispose() {
    document.removeEventListener('keydown', this._onKeyDown);
    document.removeEventListener('keyup', this._onKeyUp);
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('pointerlockchange', this._onPointerLockChange);

    if (this.domElement && this.clickToExit) {
      this.domElement.removeEventListener('click', this._onClick);
    }

    this.exitFlyMode();
  }

  setEnabled(enabled) {
    this.enabled = Boolean(enabled);
    if (!this.enabled) {
      this.exitFlyMode();
    }
  }

  isActive() {
    return this.pointerLocked;
  }

  enterFlyMode() {
    if (!this.enabled || !this.domElement) return;
    if (document.pointerLockElement !== this.domElement) {
      this.domElement.requestPointerLock();
    }
  }

  exitFlyMode() {
    if (typeof document === 'undefined') return;
    if (document.pointerLockElement === this.domElement) {
      document.exitPointerLock();
    }
  }

  toggleFlyMode() {
    if (this.pointerLocked) {
      this.exitFlyMode();
    } else {
      this.enterFlyMode();
    }
  }

  setModelSizeFromObject(object3d) {
    if (!object3d) return;
    const box = new THREE.Box3().setFromObject(object3d);
    if (box.isEmpty()) return;
    const size = box.getSize(new THREE.Vector3());
    const maxSize = Math.max(size.x, size.y, size.z);
    if (maxSize > 0 && Number.isFinite(maxSize)) {
      this.modelSize = Math.max(1, Math.min(10000, maxSize));
    }
  }

  update(delta) {
    if (!this.enabled || !this.pointerLocked) return;
    if (this.renderer?.xr?.isPresenting) {
      this.exitFlyMode();
      return;
    }
    if (!this.camera) return;

    const sizeMultiplier = this.modelSize / this.speedScale;
    const baseSpeed = this.keys.shift ? this.boostSpeed : this.baseSpeed;
    const speed = baseSpeed * sizeMultiplier;
    const direction = new THREE.Vector3();

    if (this.keys.w) direction.z -= 1;
    if (this.keys.s) direction.z += 1;
    if (this.keys.a) direction.x -= 1;
    if (this.keys.d) direction.x += 1;
    if (this.keys.q) direction.y -= 1;
    if (this.keys.e) direction.y += 1;

    if (direction.lengthSq() > 0) {
      direction.normalize();
      direction.applyQuaternion(this.camera.quaternion);
      this.camera.position.addScaledVector(direction, speed * delta);
      this._syncControlsTarget();
    }
  }

  _syncControlsTarget() {
    if (!this.controls || !this.camera) return;
    const forward = new THREE.Vector3(0, 0, -5).applyQuaternion(this.camera.quaternion);
    this.controls.target.copy(this.camera.position).add(forward);
  }

  _onKeyDown(event) {
    if (!this.enabled) return;
    const target = event.target;
    if (target instanceof HTMLElement) {
      const tag = target.tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || target.isContentEditable) {
        return;
      }
    }

    const key = event.key.toLowerCase();
    if (key in this.keys) {
      this.keys[key] = true;
    }
    if (event.shiftKey) {
      this.keys.shift = true;
    }

    if (event.shiftKey && (event.key === '`' || event.key === '~' || event.code === 'Backquote')) {
      event.preventDefault();
      if (!this.pointerLocked) {
        this.enterFlyMode();
      }
      return;
    }

    if (event.code === 'KeyF' || key === 'f') {
      event.preventDefault();
      this.toggleFlyMode();
    }
  }

  _onKeyUp(event) {
    const key = event.key.toLowerCase();
    if (key in this.keys) {
      this.keys[key] = false;
    }
    if (!event.shiftKey) {
      this.keys.shift = false;
    }
  }

  _onMouseMove(event) {
    if (!this.pointerLocked || !this.camera) return;

    this.cameraYaw -= event.movementX * this.mouseSensitivity;
    this.cameraPitch -= event.movementY * this.mouseSensitivity;

    this.cameraPitch = Math.max(
      -Math.PI / 2 + 0.01,
      Math.min(Math.PI / 2 - 0.01, this.cameraPitch)
    );

    const euler = new THREE.Euler(this.cameraPitch, this.cameraYaw, 0, 'YXZ');
    this.camera.quaternion.setFromEuler(euler);
    this._syncControlsTarget();
  }

  _onPointerLockChange() {
    const wasLocked = this.pointerLocked;
    this.pointerLocked = document.pointerLockElement === this.domElement;

    if (this.pointerLocked && !wasLocked && this.camera) {
      const euler = new THREE.Euler().setFromQuaternion(this.camera.quaternion, 'YXZ');
      this.cameraYaw = euler.y;
      this.cameraPitch = euler.x;
    }

    if (this.controls) {
      if (this.pointerLocked) {
        this._controlsEnabledBefore = this.controls.enabled;
        this.controls.enabled = false;
      } else {
        this.controls.enabled = this._controlsEnabledBefore;
      }
    }

    this.emit('fly-mode-change', { active: this.pointerLocked });
  }

  _onClick() {
    if (this.pointerLocked) {
      this.exitFlyMode();
    }
  }
}
