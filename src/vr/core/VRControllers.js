/**
 * VRControllers - VR controller input handling and button mapping
 */

import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

export class VRControllers {
  constructor(renderer, camera) {
    this.renderer = renderer;
    this.camera = camera;
    
    this.controller1 = null;
    this.controller2 = null;
    this.controllerGrip1 = null;
    this.controllerGrip2 = null;
    this.controllers = [];
    this.controllerGrips = [];
    
    this.buttonStates = new Map();
    
    this.inputDeadzone = 0.15;
    this.turnSmoothingFactor = 0.1;
    this.lastTurnInput = 0;
    
    this.onSelectStart = null;
    this.onSelectEnd = null;
    this.onSqueezeStart = null;
    this.onSqueezeEnd = null;
    this.onModeToggle = null;
    this.onMovementStart = null;
    this.onMovementStop = null;
    this.handsActive = false;
    this.handStates = {
      left: { pinch: false, fist: false, direction: new THREE.Vector3() },
      right: { pinch: false, fist: false, direction: new THREE.Vector3() }
    };
  }
  
  init() {
    this.initControllers();
    this.initHands();
  }
  initHands() {
    const session = this.renderer.xr.getSession && this.renderer.xr.getSession();
    if (!session) return;
    session.addEventListener('inputsourceschange', () => {
      this.checkHandsActive();
    });
    this.checkHandsActive();
  }

  checkHandsActive() {
    const session = this.renderer.xr.getSession && this.renderer.xr.getSession();
    if (!session) return;
    let handsFound = false;
    for (const inputSource of session.inputSources) {
      if (inputSource.hand) {
        handsFound = true;
      }
    }
    this.handsActive = handsFound;
  }

  updateHandGestures() {
    const session = this.renderer.xr.getSession && this.renderer.xr.getSession();
    if (!session) return;
    for (const inputSource of session.inputSources) {
      if (inputSource.hand && inputSource.handedness) {
        const hand = inputSource.handedness;
        const thumbTip = inputSource.hand.get('thumb-tip');
        const indexTip = inputSource.hand.get('index-finger-tip');
        if (!thumbTip || !indexTip || !thumbTip.transform || !indexTip.transform) {
          this.handStates[hand].pinch = false;
        } else {
          const thumbPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(thumbTip.transform.matrix));
          const indexPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(indexTip.transform.matrix));
          const pinchDist = thumbPos.distanceTo(indexPos);
          this.handStates[hand].pinch = pinchDist < 0.025;
        }
        let fist = true;
        const palm = inputSource.hand.get('wrist');
        if (palm && palm.transform) {
          const palmPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(palm.transform.matrix));
          for (const tipName of ['index-finger-tip','middle-finger-tip','ring-finger-tip','pinky-finger-tip']) {
            const tip = inputSource.hand.get(tipName);
            if (!tip || !tip.transform) {
              fist = false;
              continue;
            }
            const tipPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(tip.transform.matrix));
            if (tipPos.distanceTo(palmPos) > 0.045) fist = false;
          }
        } else {
          fist = false;
        }
        this.handStates[hand].fist = fist;
        if (indexTip && palm && indexTip.transform && palm.transform) {
          const palmPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(palm.transform.matrix));
          const indexPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(indexTip.transform.matrix));
          this.handStates[hand].direction = new THREE.Vector3().subVectors(indexPos, palmPos).normalize();
        }
      }
    }
  }
  
  initControllers() {
    const controllerModelFactory = new XRControllerModelFactory();
    
    for (let i = 0; i < 2; i++) {
      const ctrl = this.renderer.xr.getController(i);
      const grip = this.renderer.xr.getControllerGrip(i);
      grip.add(controllerModelFactory.createControllerModel(grip));
      
      this.camera.parent.add(ctrl);
      this.camera.parent.add(grip);
      
      this.controllers.push(ctrl);
      this.controllerGrips.push(grip);
    }
    
    this.setupControllerEvents();
  }
  
  setupControllerEvents() {
    this.controllers.forEach((ctrl, index) => {
      ctrl.addEventListener('connected', evt => {
        const { handedness, targetRayMode, profiles } = evt.data;
        const isHand = Array.isArray(profiles) && profiles.some(p => p && p.toLowerCase().includes('hand'));
        if (targetRayMode !== 'tracked-pointer' || isHand) {
          return;
        }

        if (handedness === 'left') {
          this.controller1 = ctrl;
          this.controllerGrip1 = this.controllerGrips[index];
        } else if (handedness === 'right') {
          this.controller2 = ctrl;
          this.controllerGrip2 = this.controllerGrips[index];
        }

        ctrl.userData.handedness = handedness;
        ctrl.userData.initialised = true;
      });

      ctrl.addEventListener('disconnected', () => {
      });

      ctrl.addEventListener('selectstart', (event) => {
        if (ctrl.userData && ctrl.userData.initialised) {
          this.onControllerSelectStart(ctrl, event);
        }
      });

      ctrl.addEventListener('selectend', (event) => {
        if (ctrl.userData && ctrl.userData.initialised) {
          this.onControllerSelectEnd(ctrl, event);
        }
      });

      ctrl.addEventListener('squeezestart', (event) => {
        if (ctrl.userData && ctrl.userData.initialised) {
          this.onControllerSqueezeStart(ctrl, event);
        }
      });

      ctrl.addEventListener('squeezeend', (event) => {
        if (ctrl.userData && ctrl.userData.initialised) {
          this.onControllerSqueezeEnd(ctrl, event);
        }
      });
    });
  }
  
  onControllerSelectStart(controller, event) {
    const handedness = controller.userData.handedness;
    if (this.onSelectStart) {
      this.onSelectStart(handedness, controller, event);
    }
  }
  
  onControllerSelectEnd(controller, event) {
    const handedness = controller.userData.handedness;
    if (this.onSelectEnd) {
      this.onSelectEnd(handedness, controller, event);
    }
  }
  
  onControllerSqueezeStart(controller, event) {
    const handedness = controller.userData.handedness;
    if (this.onSqueezeStart) {
      this.onSqueezeStart(handedness, controller, event);
    }
  }
  
  onControllerSqueezeEnd(controller, event) {
    const handedness = controller.userData.handedness;
    if (this.onSqueezeEnd) {
      this.onSqueezeEnd(handedness, controller, event);
    }
  }
  
  checkControllerButtons() {
    const session = this.renderer.xr.getSession();
    if (!session) return;
    
    for (const inputSource of session.inputSources) {
      if (inputSource.gamepad && inputSource.handedness) {
        const gamepad = inputSource.gamepad;
        const handedness = inputSource.handedness;
        
        const debugKey = `debug-${handedness}`;
        if (!this.buttonStates.get(debugKey)) {
          this.buttonStates.set(debugKey, true);
        }
        
        let modeToggleButtons = [];
        if (handedness === 'left') {
          modeToggleButtons = [4, 5];
        } else if (handedness === 'right') {
          modeToggleButtons = [4, 5];
        }
        
        modeToggleButtons.forEach(index => {
          if (gamepad.buttons[index]) {
            const button = gamepad.buttons[index];
            const buttonKey = `${handedness}-${index}`;
            const wasPressed = this.buttonStates.get(buttonKey) || false;
            const isPressed = button.pressed;
            
            if (isPressed && !wasPressed) {
              if (this.onModeToggle) {
                this.onModeToggle();
              }
            }
            
            this.buttonStates.set(buttonKey, isPressed);
          }
        });
      }
    }
  }
  
  getControllerInput() {
    const session = this.renderer.xr.getSession();
    if (!session) return { movement: null, teleport: null };
    
    let movementInput = null;
    let teleportInput = null;
    
    for (const inputSource of session.inputSources) {
      if (inputSource.gamepad && inputSource.handedness) {
        const gamepad = inputSource.gamepad;
        const handedness = inputSource.handedness;
        
        if (gamepad.axes.length >= 4) {
          const leftX = gamepad.axes[2] || 0;
          const leftY = gamepad.axes[3] || 0;
          const rightX = gamepad.axes[0] || 0;
          const rightY = gamepad.axes[1] || 0;
          
          const filteredLeftX = Math.abs(leftX) > this.inputDeadzone ? leftX : 0;
          const filteredLeftY = Math.abs(leftY) > this.inputDeadzone ? leftY : 0;
          const filteredRightX = Math.abs(rightX) > this.inputDeadzone ? rightX : 0;
          const filteredRightY = Math.abs(rightY) > this.inputDeadzone ? rightY : 0;
          
          if (handedness === 'left') {
            if (filteredLeftX !== 0 || filteredLeftY !== 0) {
              movementInput = {
                x: filteredLeftX,
                y: filteredLeftY,
                handedness: 'left'
              };
            }
          } else if (handedness === 'right') {
            if (filteredRightX !== 0 || filteredRightY !== 0) {
              teleportInput = {
                x: filteredRightX,
                y: filteredRightY,
                handedness: 'right'
              };
            }
          }
        }
      }
    }
    
    return { movement: movementInput, teleport: teleportInput };
  }
  
  getControllers() {
    return {
      controller1: this.controller1,
      controller2: this.controller2,
      controllerGrip1: this.controllerGrip1,
      controllerGrip2: this.controllerGrip2,
      controllers: this.controllers,
      controllerGrips: this.controllerGrips
    };
  }
  
  dispose() {
    this.controllers.forEach(controller => {
      if (controller.parent) {
        controller.parent.remove(controller);
      }
    });
    
    this.controllerGrips.forEach(grip => {
      if (grip.parent) {
        grip.parent.remove(grip);
      }
    });
    
    this.controller1 = null;
    this.controller2 = null;
    this.controllerGrip1 = null;
    this.controllerGrip2 = null;
    this.controllers = [];
    this.controllerGrips = [];
    this.buttonStates.clear();
  }
}
