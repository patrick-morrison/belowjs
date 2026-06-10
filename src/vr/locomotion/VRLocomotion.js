/**
 * VRLocomotion - Movement coordination for VR
 * 
 * Coordinates different locomotion modes including smooth movement,
 * teleportation, and comfort settings.
 */

import * as THREE from 'three';

// Scratch vectors reused by updateMovement to avoid per-frame allocations.
const _moveDir = new THREE.Vector3();
const _forward = new THREE.Vector3();
const _right = new THREE.Vector3();

export class VRLocomotion {
  constructor(camera, renderer) {
    this.camera = camera;
    this.renderer = renderer;
    

    this.MOVE_SPEED = 2.0;    // m/s base movement speed (from original)
    this.TURN_SPEED = 1.5;    // rad/s turn speed (from original)
    this.FLY_SPEED = 1.0;     // m/s vertical movement (from original)
    

    this.currentSpeed = 0;
    this.targetSpeed = 0;
    this.currentBoostLevel = 0;
    this.targetBoostLevel = 0;
    this.SPEED_RAMP_RATE = 3.0;
    this.BOOST_RAMP_RATE = 6.0;


    this.handMoveActive = false;
    this.handMoveBoost = false;
    this.handMoveDirection = new THREE.Vector3();
    this.isMoving = false; // Track movement state for vignetting
    

    this.inputDeadzone = 0.15;  // Increased deadzone
    this.turnSmoothingFactor = 0.1; // Smooth small inputs
    this.lastTurnInput = 0;
    

    this.comfortSettings = {
      locomotionMode: 'smooth', // 'smooth', 'teleport'
      turningMode: 'smooth',    // 'smooth', 'snap'
      snapTurnAngle: 30,        // degrees per snap
      reducedMotion: false,     // slower, gentler movements
      showTeleportArc: true,    // visual feedback for teleportation
      comfortSpeed: 0.5         // speed multiplier when reduced motion is on
    };
    

    this.onMovementStart = null;
    this.onMovementStop = null;
    this.onMovementUpdate = null;
    

    this.teleportSystem = null;
  }
  
  init() {
    this.setupLocomotion();
  }
  

  startMovement(_type = 'forward') {
    this.isMoving = true;
    this.targetSpeed = this.MOVE_SPEED;
    
    if (this.onMovementStart) {
      this.onMovementStart();
    }
    
  }
  
  stopMovement() {
    this.isMoving = false;
    this.targetSpeed = 0;
    
    if (this.onMovementStop) {
      this.onMovementStop();
    }
    
  }
  
  setTeleportSystem(teleportSystem) {
    this.teleportSystem = teleportSystem;
  }
  
  updateMovement(deltaTime, controllers) {

    const session = this.renderer.xr.getSession && this.renderer.xr.getSession();
    if (session && session.visibilityState !== 'visible') {
      return;
    }
    const inputSources = controllers?.inputSources || (session ? Array.from(session.inputSources || []) : []);
    if (!inputSources || inputSources.length === 0) {
      return;
    }


    if (session && controllers.updateHandGestures && controllers.handsActive) {
      controllers.updateHandGestures();

      let handUsed = null;
      const moveDir = _moveDir;
      let boost = false;
      for (const hand of ['left', 'right']) {
        if (controllers.handStates[hand].pinch) {
          handUsed = hand;
          moveDir.copy(controllers.handStates[hand].direction);
          boost = controllers.handStates[hand].fist;
          break;
        }
      }
      if (handUsed) {

        this.handMoveActive = true;
        this.handMoveBoost = boost;
        this.handMoveDirection.copy(moveDir);

        const rig = this.camera.parent || this.camera;
        const speed = this.MOVE_SPEED * (boost ? 3 : 1) * deltaTime;
        rig.position.addScaledVector(moveDir, speed);
        this.isMoving = true;

        if (this.onMovementStart && !this._wasMoving) this.onMovementStart();
        if (this.onMovementUpdate) this.onMovementUpdate({
          isMoving: true,
          currentSpeed: this.MOVE_SPEED,
          isBoosted: boost,
          currentBoostLevel: boost ? 1 : 0
        });
        this._wasMoving = true;
        return; // Skip controller-based movement if hand is active
      } else {
        if (this.handMoveActive && this.onMovementStop) this.onMovementStop();
        this.handMoveActive = false;
        this.isMoving = false;
        this._wasMoving = false;
      }
    }


    const rig = this.camera.parent || this.camera;

    let currentlyMoving = false;
    let isBoosted = false;
    

    for (let i = 0; i < inputSources.length; i++) {
      const src = inputSources[i];
      

      if (!src || !src.gamepad || !src.gamepad.buttons || !src.gamepad.axes || src.gamepad.axes.length < 4) {
        continue; // Graceful skipping
      }
      
      const gamepad = src.gamepad;
      const hand = src.handedness;
      const controller = hand === 'left' ? controllers.controller1 : controllers.controller2;
      
      if (!controller) continue;
      

      const x = gamepad.axes[2] || 0; // strafe/turn
      const y = gamepad.axes[3] || 0; // walk/fly (-y = forward)
      
      const canTeleport = this.comfortSettings.locomotionMode === 'teleport' && this.teleportSystem && controller;
      const teleportActive = this.teleportSystem && this.teleportSystem.teleportPressed;
      // True when this controller is the one aiming the arc
      const isAimingController = teleportActive &&
        this.teleportSystem.teleportController === controller;
      // True when the OTHER controller is aiming and this one should adjust height
      const isHeightController = teleportActive && !isAimingController;

      if (src.handedness === 'left') {

        const gripButton = gamepad.buttons[1];
        const speedMultiplier = (gripButton && gripButton.pressed) ? 3 : 1;
        const comfortSpeedMultiplier = this.comfortSettings.reducedMotion ? this.comfortSettings.comfortSpeed : 1.0;
        if (gripButton && gripButton.pressed) {
          isBoosted = true;
        }

        if (canTeleport && (isAimingController || !teleportActive)) {
          // Y axis: teleport. X axis: snap turn (can do both simultaneously)
          this.teleportSystem.processTeleportation(controller, y);
          if (this.comfortSettings.turningMode === 'snap') {
            this.teleportSystem.processSnapTurn(x, this.comfortSettings.snapTurnAngle);
          }
          continue;
        } else if (isHeightController) {
          // Right is aiming — left Y adjusts height (up = up, down = down)
          if (Math.abs(y) > 0.1) {
            this.teleportSystem.adjustFloorHeight(-y * (4.0 * deltaTime));
          }
        } else {

          const forward = _forward;
          this.camera.getWorldDirection(forward);
          forward.y = 0;
          forward.normalize();
          const right = _right.crossVectors(forward, this.camera.up).normalize();

          if (Math.abs(y) > 0.1) {
            const rampedSpeed = this.MOVE_SPEED * speedMultiplier * comfortSpeedMultiplier * this.currentSpeed * deltaTime;
            rig.position.addScaledVector(forward, -y * rampedSpeed);
            currentlyMoving = true;
          }
          if (Math.abs(x) > 0.1) {
            const rampedSpeed = this.MOVE_SPEED * speedMultiplier * comfortSpeedMultiplier * this.currentSpeed * deltaTime;
            rig.position.addScaledVector(right, x * rampedSpeed);
            currentlyMoving = true;
          }
        }
      }

      if (src.handedness === 'right') {

        const gripButton = gamepad.buttons[1];
        const verticalSpeedMultiplier = (gripButton && gripButton.pressed) ? 3 : 1;
        const comfortSpeedMultiplier = this.comfortSettings.reducedMotion ? this.comfortSettings.comfortSpeed : 1.0;

        if (gripButton && gripButton.pressed && Math.abs(y) > 0.1) {
          isBoosted = true;
        }

        if (canTeleport && (isAimingController || !teleportActive)) {
          // Y axis: teleport. X axis: snap turn (can do both simultaneously)
          this.teleportSystem.processTeleportation(controller, y);
          if (this.comfortSettings.turningMode === 'snap') {
            this.teleportSystem.processSnapTurn(x, this.comfortSettings.snapTurnAngle);
          }
          continue;
        } else if (isHeightController) {
          // Left is aiming — right Y adjusts height (up = up, down = down)
          if (Math.abs(y) > 0.1) {
            this.teleportSystem.adjustFloorHeight(-y * (4.0 * deltaTime));
          }
        } else {

          if (this.comfortSettings.turningMode === 'snap' && this.teleportSystem) {
            this.teleportSystem.processSnapTurn(x, this.comfortSettings.snapTurnAngle);
          } else {
            if (Math.abs(x) > this.inputDeadzone) {
              const smoothedInput = this.lastTurnInput * this.turnSmoothingFactor + x * (1 - this.turnSmoothingFactor);
              this.lastTurnInput = smoothedInput;

              if (Math.abs(smoothedInput) > this.inputDeadzone) {
                const turnSpeed = this.comfortSettings.reducedMotion ? this.TURN_SPEED * 0.5 : this.TURN_SPEED;
                const turnAmount = smoothedInput * turnSpeed * Math.min(deltaTime, 1/30);
                rig.rotation.y -= turnAmount;
                rig.rotation.y = this.normalizeAngle(rig.rotation.y);
              }
            } else {
              this.lastTurnInput *= 0.9;
            }
          }

          if (Math.abs(y) > 0.1 && this.comfortSettings.locomotionMode !== 'teleport') {
            const rampedSpeed = this.FLY_SPEED * verticalSpeedMultiplier * comfortSpeedMultiplier * this.currentSpeed * deltaTime;
            rig.position.y -= y * rampedSpeed;
            currentlyMoving = true;
          }
        }
      }
    }
    

    const wasMoving = this.isMoving;
    this.isMoving = currentlyMoving;


    const targetSpeed = this.isMoving ? this.MOVE_SPEED : 0;
    const speedDiff = targetSpeed - this.currentSpeed;
    this.currentSpeed += speedDiff * this.SPEED_RAMP_RATE * deltaTime;
    this.currentSpeed = Math.max(0, this.currentSpeed);


    const targetBoost = isBoosted ? 1.0 : 0;
    const boostDiff = targetBoost - this.currentBoostLevel;
    this.currentBoostLevel += boostDiff * this.BOOST_RAMP_RATE * deltaTime;
    this.currentBoostLevel = Math.max(0, Math.min(1, this.currentBoostLevel));


    if (!wasMoving && this.isMoving && this.onMovementStart) {
      this.onMovementStart();
    }
    if (wasMoving && !this.isMoving && this.onMovementStop) {
      this.onMovementStop();
    }


    if (this.onMovementUpdate) {
      this.onMovementUpdate({
        isMoving: this.isMoving,
        currentSpeed: this.currentSpeed,
        isBoosted: isBoosted,
        currentBoostLevel: this.currentBoostLevel
      });
    }
  }
  
  normalizeAngle(angle) {
    while (angle > Math.PI) angle -= 2 * Math.PI;
    while (angle < -Math.PI) angle += 2 * Math.PI;
    return angle;
  }
  

  correctDrift() {

    const dolly = this.camera.parent || this.camera;
    if (!dolly) return;

    dolly.rotation.y = this.normalizeAngle(dolly.rotation.y);
    

    dolly.position.x = Math.round(dolly.position.x * 1000) / 1000;
    dolly.position.y = Math.round(dolly.position.y * 1000) / 1000;
    dolly.position.z = Math.round(dolly.position.z * 1000) / 1000;
  }
  
  setComfortSettings(settings) {

    const validModes = ['smooth', 'teleport'];
    const validTurningModes = ['smooth', 'snap'];
    
    if (settings.locomotionMode && validModes.includes(settings.locomotionMode)) {
      const oldMode = this.comfortSettings.locomotionMode;
      this.comfortSettings.locomotionMode = settings.locomotionMode;
      
      if (oldMode !== settings.locomotionMode) {

        if (this.teleportSystem) {
          this.teleportSystem.resetTeleportState();
        }
      }
    }
    
    if (settings.turningMode && validTurningModes.includes(settings.turningMode)) {
      const oldTurningMode = this.comfortSettings.turningMode;
      this.comfortSettings.turningMode = settings.turningMode;
      
      if (oldTurningMode !== settings.turningMode) {
        if (this.teleportSystem) {
          this.teleportSystem.resetSnapTurnState();
        }
      }
    }
    
    if (typeof settings.snapTurnAngle === 'number' && settings.snapTurnAngle > 0 && settings.snapTurnAngle <= 90) {
      this.comfortSettings.snapTurnAngle = settings.snapTurnAngle;
    }
    
    if (typeof settings.reducedMotion === 'boolean') {
      this.comfortSettings.reducedMotion = settings.reducedMotion;
    }
    
    if (typeof settings.showTeleportArc === 'boolean') {
      this.comfortSettings.showTeleportArc = settings.showTeleportArc;
    }
    
    if (typeof settings.comfortSpeed === 'number' && settings.comfortSpeed > 0 && settings.comfortSpeed <= 2.0) {
      this.comfortSettings.comfortSpeed = settings.comfortSpeed;
    }
    

    this.ensureComfortSettingsApplied();
  }
  
  getComfortSettings() {
    return { ...this.comfortSettings };
  }
  
  setComfortPreset(preset) {
    if (preset === 'comfort') {
      this.setComfortSettings({
        locomotionMode: 'teleport',
        turningMode: 'snap',
        snapTurnAngle: 22.5,
        reducedMotion: true,
        showTeleportArc: true,
        comfortSpeed: 0.45
      });
      return true;
    } else if (preset === 'free') {
      this.setComfortSettings({
        locomotionMode: 'smooth',
        turningMode: 'smooth',
        reducedMotion: false,
        showTeleportArc: false,
        comfortSpeed: 1.0
      });
      return true;
    } else {
      console.warn(`Unknown comfort preset: ${preset}`);
      return false;
    }
  }

  toggleLocomotionMode() {
    const newMode = this.comfortSettings.locomotionMode === 'smooth' ? 'teleport' : 'smooth';
    return this.setComfortSettings({ locomotionMode: newMode });
  }

  toggleTurningMode() {
    const newMode = this.comfortSettings.turningMode === 'smooth' ? 'snap' : 'smooth';
    return this.setComfortSettings({ turningMode: newMode });
  }

  toggleReducedMotion() {
    return this.setComfortSettings({ reducedMotion: !this.comfortSettings.reducedMotion });
  }
  
  setupLocomotion() {

  }
  
  ensureComfortSettingsApplied() {


  }
  
  getMovementState() {
    return {
      isMoving: this.isMoving,
      currentSpeed: this.currentSpeed,
      targetSpeed: this.targetSpeed,
      currentBoostLevel: this.currentBoostLevel,
      targetBoostLevel: this.targetBoostLevel
    };
  }
}
