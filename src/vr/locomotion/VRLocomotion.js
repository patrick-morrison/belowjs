/**
 * VRLocomotion - Movement coordination for VR
 * 
 * Coordinates different locomotion modes including smooth movement,
 * teleportation, and comfort settings.
 */

import * as THREE from 'three';

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
  

  startMovement(type = 'forward') {
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

    const session = this.renderer.xr.getSession();
    if (!session || session.visibilityState !== 'visible') {
      return;
    }


    if (controllers.updateHandGestures && controllers.handsActive) {
      controllers.updateHandGestures();

      let handUsed = null;
      let moveDir = new THREE.Vector3();
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

        const speed = this.MOVE_SPEED * (boost ? 3 : 1) * deltaTime;
        this.camera.parent.position.addScaledVector(moveDir, speed);
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


    if (!controllers.controller1 || !controllers.controller2) {
      return;
    }
    

    let currentlyMoving = false;
    let isBoosted = false;
    

    for (let i = 0; i < session.inputSources.length; i++) {
      const src = session.inputSources[i];
      

      if (!src || !src.gamepad || !src.gamepad.buttons || !src.gamepad.axes || src.gamepad.axes.length < 4) {
        continue; // Graceful skipping
      }
      
      const gamepad = src.gamepad;
      const hand = src.handedness;
      const controller = hand === 'left' ? controllers.controller1 : controllers.controller2;
      
      if (!controller) continue;
      

      const x = gamepad.axes[2] || 0; // strafe/turn
      const y = gamepad.axes[3] || 0; // walk/fly (-y = forward)
      
      if (src.handedness === 'left') {

        const gripButton = gamepad.buttons[1];
        const speedMultiplier = (gripButton && gripButton.pressed) ? 3 : 1;
        const comfortSpeedMultiplier = this.comfortSettings.reducedMotion ? this.comfortSettings.comfortSpeed : 1.0;
        if (gripButton && gripButton.pressed) {
          isBoosted = true;
        }

        if (this.comfortSettings.locomotionMode === 'teleport' && this.teleportSystem) {

          this.teleportSystem.processTeleportation(controller, x, y);

          continue;
        } else {

          const forward = new THREE.Vector3();
          this.camera.getWorldDirection(forward);
          forward.y = 0; // Lock to dolly's yaw
          forward.normalize();
          const right = new THREE.Vector3().crossVectors(forward, this.camera.up).normalize();

          if (Math.abs(y) > 0.1) {
            const rampedSpeed = this.MOVE_SPEED * speedMultiplier * comfortSpeedMultiplier * this.currentSpeed * deltaTime;
            this.camera.parent.position.addScaledVector(forward, -y * rampedSpeed);
            currentlyMoving = true;
          }
          if (Math.abs(x) > 0.1) {
            const rampedSpeed = this.MOVE_SPEED * speedMultiplier * comfortSpeedMultiplier * this.currentSpeed * deltaTime;
            this.camera.parent.position.addScaledVector(right, x * rampedSpeed);
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
        

        if (this.teleportSystem && this.teleportSystem.teleportPressed && this.teleportSystem.teleportCurve && this.teleportSystem.teleportCurve.visible) {

          if (Math.abs(y) > 0.1) {
            const floorAdjustSpeed = 4.0 * deltaTime; // 4 units per second (twice as fast)
            this.teleportSystem.adjustFloorHeight(y * floorAdjustSpeed);
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
                this.camera.parent.rotation.y -= turnAmount;
                this.camera.parent.rotation.y = this.normalizeAngle(this.camera.parent.rotation.y);
              }
            } else {
              this.lastTurnInput *= 0.9;
            }
          }
          

          if (Math.abs(y) > 0.1) {
            const rampedSpeed = this.FLY_SPEED * verticalSpeedMultiplier * comfortSpeedMultiplier * this.currentSpeed * deltaTime;
            this.camera.parent.position.y -= y * rampedSpeed;
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

    const dolly = this.camera.parent;
    

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
        snapTurnAngle: 30,
        reducedMotion: true,
        showTeleportArc: true,
        comfortSpeed: 0.3
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
