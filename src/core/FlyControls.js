import * as THREE from 'three';
import { EventSystem } from '../utils/EventSystem.js';

/**
 * FlyControls - Pointer-lock fly navigation for desktop
 *
 * Enables first-person fly movement using keyboard (W/A/S/D/Q/E/J/K/L/U/O) and mouse look
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
   * @param {number} [options.keyboardYawRate=0.18] - Keyboard yaw speed in radians per second
   * @param {number} [options.keyboardBoostYawRate=0.4] - Shift keyboard yaw speed in radians per second
   * @param {number} [options.keyboardPitchRate=0.2] - Keyboard pitch speed in radians per second
   * @param {number} [options.keyboardPitchBoostMultiplier=2.0] - Shift multiplier for keyboard pitch
   * @param {number} [options.pitchReturnRate=0.35] - Pitch return speed when K is held
   * @param {number} [options.slowSpeedMultiplier=0.2] - Slow-mode multiplier for base movement
   * @param {number} [options.slowBoostMultiplier=0.3333333333333333] - Slow-mode multiplier for boosted movement
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
    this.keyboardYawRate = options.keyboardYawRate ?? 0.18;
    this.keyboardBoostYawRate = options.keyboardBoostYawRate ?? 0.4;
    this.keyboardPitchRate = options.keyboardPitchRate ?? 0.2;
    this.keyboardPitchBoostMultiplier = options.keyboardPitchBoostMultiplier ?? 2.0;
    this.pitchReturnRate = options.pitchReturnRate ?? 0.35;
    this.slowSpeedMultiplier = options.slowSpeedMultiplier ?? 0.2;
    this.slowBoostMultiplier = options.slowBoostMultiplier ?? (1 / 3);
    this.clickToExit = options.clickToExit ?? true;

    this.pointerLocked = false;
    this.modelSize = this.speedScale;
    this.cameraYaw = 0;
    this.cameraPitch = 0;
    this.slowMode = Boolean(options.slowMode ?? false);

    this.keys = {
      w: false,
      a: false,
      s: false,
      d: false,
      q: false,
      e: false,
      j: false,
      k: false,
      l: false,
      u: false,
      o: false,
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

  isSlowMode() {
    return this.slowMode;
  }

  setSlowMode(enabled) {
    const next = Boolean(enabled);
    if (this.slowMode === next) return;
    this.slowMode = next;
    this.emit('slow-mode-change', { active: this.slowMode });
  }

  toggleSlowMode() {
    this.setSlowMode(!this.slowMode);
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
    const slowMultiplier = this.keys.shift ? this.slowBoostMultiplier : this.slowSpeedMultiplier;
    const speedMultiplier = this.slowMode ? slowMultiplier : 1;
    const speed = baseSpeed * speedMultiplier * sizeMultiplier;
    const direction = new THREE.Vector3();

    if (this.keys.w) direction.z -= 1;
    if (this.keys.s) direction.z += 1;
    if (this.keys.a) direction.x -= 1;
    if (this.keys.d) direction.x += 1;
    if (this.keys.q) direction.y -= 1;
    if (this.keys.e) direction.y += 1;

    this._applyKeyboardLook(delta);

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

  _applyKeyboardLook(delta) {
    let changed = false;
    const yawInput = ((this.keys.j ? 1 : 0) + (this.keys.l ? -1 : 0)) * 0.5;
    const pitchInput = (this.keys.u ? 1 : 0) + (this.keys.o ? -1 : 0);

    if (yawInput !== 0) {
      const turnRate = this.keys.shift ? this.keyboardBoostYawRate : this.keyboardYawRate;
      this.cameraYaw += yawInput * turnRate * delta;
      changed = true;
    }

    if (pitchInput !== 0) {
      const pitchRate = this.keys.shift
        ? this.keyboardPitchRate * this.keyboardPitchBoostMultiplier
        : this.keyboardPitchRate;
      this.cameraPitch = this._clampPitch(this.cameraPitch + pitchInput * pitchRate * delta);
      changed = true;
    } else if (this.keys.k && Math.abs(this.cameraPitch) > 0.0001) {
      const step = this.pitchReturnRate * delta;
      this.cameraPitch = Math.abs(this.cameraPitch) <= step
        ? 0
        : this.cameraPitch - Math.sign(this.cameraPitch) * step;
      changed = true;
    }

    if (!changed) return;
    const euler = new THREE.Euler(this.cameraPitch, this.cameraYaw, 0, 'YXZ');
    this.camera.quaternion.setFromEuler(euler);
    this._syncControlsTarget();
  }

  _clampPitch(value) {
    return Math.max(
      -Math.PI / 2 + 0.01,
      Math.min(Math.PI / 2 - 0.01, value)
    );
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
      event.preventDefault();
      this.keys[key] = true;
    }
    if (event.shiftKey) {
      this.keys.shift = true;
    }

    if (event.code === 'KeyX' || key === 'x') {
      event.preventDefault();
      if (!event.repeat) {
        this.toggleSlowMode();
      }
      return;
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

    this.cameraPitch = this._clampPitch(this.cameraPitch);

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

    this.emit('fly-mode-change', { active: this.pointerLocked, slow: this.slowMode });
  }

  _onClick() {
    if (this.pointerLocked) {
      this.exitFlyMode();
    }
  }
}
