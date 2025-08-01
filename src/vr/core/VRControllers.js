/**
 * VRControllers - Controller input handling and button mapping
 * 
 * Manages VR controller connection, input processing, and button events.
 * Preserves original controller patterns and mapping.
 */

import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

export class VRControllers {
  constructor(renderer, camera) {
    this.renderer = renderer;
    this.camera = camera;
    
    // Controllers (preserving original pattern)
    this.controller1 = null;
    this.controller2 = null;
    this.controllerGrip1 = null;
    this.controllerGrip2 = null;
    this.controllers = [];
    this.controllerGrips = [];
    
    // Button state tracking for controllers (original pattern)
    this.buttonStates = new Map();
    
    // Input smoothing to prevent drift (NEW)
    this.inputDeadzone = 0.15;  // Increased deadzone
    this.turnSmoothingFactor = 0.1; // Smooth small inputs
    this.lastTurnInput = 0;
    
    // Callbacks
    this.onSelectStart = null;
    this.onSelectEnd = null;
    this.onSqueezeStart = null;
    this.onSqueezeEnd = null;
    this.onModeToggle = null;
    this.onMovementStart = null;
    this.onMovementStop = null;
    // Hand tracking/gesture state
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
  // --- Hand tracking/gesture detection scaffold ---
  initHands() {
    // WebXR hand input support (scaffold, real implementation needed)
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
    for (let inputSource of session.inputSources) {
      if (inputSource.hand) {
        handsFound = true;
        // Optionally: store hand inputSource for gesture detection
      }
    }
    this.handsActive = handsFound;
  }

  updateHandGestures() {
    // Call this per-frame to update hand gesture state (scaffold)
    const session = this.renderer.xr.getSession && this.renderer.xr.getSession();
    if (!session) return;
    for (let inputSource of session.inputSources) {
      if (inputSource.hand && inputSource.handedness) {
        const hand = inputSource.handedness;
        // --- Pinch detection (scaffold) ---
        // WebXR: thumb tip (4), index tip (8)
        const thumbTip = inputSource.hand.get('thumb-tip');
        const indexTip = inputSource.hand.get('index-finger-tip');
        if (!thumbTip || !indexTip || !thumbTip.transform || !indexTip.transform) {
          console.warn(`[HandTracking] No joint data for ${hand} hand:`, { thumbTip, indexTip });
          this.handStates[hand].pinch = false;
        } else {
          const thumbPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(thumbTip.transform.matrix));
          const indexPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(indexTip.transform.matrix));
          const pinchDist = thumbPos.distanceTo(indexPos);
          this.handStates[hand].pinch = pinchDist < 0.025; // Threshold for pinch
          if (this.handStates[hand].pinch) {
            // Pinch detected
          }
        }
        // --- Fist detection (scaffold, simple heuristic) ---
        let fist = true;
        const palm = inputSource.hand.get('wrist');
        if (palm && palm.transform) {
          const palmPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(palm.transform.matrix));
          for (let tipName of ['index-finger-tip','middle-finger-tip','ring-finger-tip','pinky-finger-tip']) {
            const tip = inputSource.hand.get(tipName);
            if (!tip || !tip.transform) {
              console.warn(`[HandTracking] No joint data for ${tipName} on ${hand} hand.`);
              fist = false;
              continue;
            }
            const tipPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(tip.transform.matrix));
            if (tipPos.distanceTo(palmPos) > 0.045) fist = false;
          }
        } else {
          console.warn(`[HandTracking] No palm joint for ${hand} hand.`);
          fist = false;
        }
        this.handStates[hand].fist = fist;
        if (fist) {
          // Fist detected
        }
        // --- Direction (scaffold: use index finger direction) ---
        if (indexTip && palm && indexTip.transform && palm.transform) {
          const palmPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(palm.transform.matrix));
          const indexPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(indexTip.transform.matrix));
          this.handStates[hand].direction = new THREE.Vector3().subVectors(indexPos, palmPos).normalize();
        }
        // Log current hand state for debugging
      }
    }
  }
  
  initControllers() {
    // Initialize controllers with original pattern
    const controllerModelFactory = new XRControllerModelFactory();
    
    // Build two placeholder controllers + grips immediately (original pattern)
    for (let i = 0; i < 2; i++) {
      const ctrl = this.renderer.xr.getController(i);
      const grip = this.renderer.xr.getControllerGrip(i);
      grip.add(controllerModelFactory.createControllerModel(grip));
      
      // Add to camera's parent (dolly in original)
      this.camera.parent.add(ctrl);
      this.camera.parent.add(grip);
      
      this.controllers.push(ctrl);
      this.controllerGrips.push(grip);
    }
    
    // Setup controller event listeners (original pattern)
    this.setupControllerEvents();
  }
  
  setupControllerEvents() {
    this.controllers.forEach((ctrl, index) => {
      ctrl.addEventListener('connected', evt => {
        const { handedness, targetRayMode, profiles } = evt.data;
        // Only treat as controller if NOT a hand (targetRayMode === 'tracked-pointer' and not hand profile)
        const isHand = Array.isArray(profiles) && profiles.some(p => p && p.toLowerCase().includes('hand'));
        if (targetRayMode !== 'tracked-pointer' || isHand) {
          return; // skip hands
        }

        // Assign the global refs (original pattern)
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
        // Controller disconnected
      });

      // WebXR Controller Input Events (essential for Chrome WebXR)
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
  
  // Controller input handlers for Chrome WebXR compatibility
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
    // Original controller button checking pattern
    const session = this.renderer.xr.getSession();
    if (!session) return;
    
    // Get input sources (controllers) - original logic
    for (let inputSource of session.inputSources) {
      if (inputSource.gamepad && inputSource.handedness) {
        const gamepad = inputSource.gamepad;
        const handedness = inputSource.handedness;
        
        // Original debug logging (once per controller)
        const debugKey = `debug-${handedness}`;
        if (!this.buttonStates.get(debugKey)) {
          this.buttonStates.set(debugKey, true);
        }
        
        // Original button mapping for mode toggle
        let modeToggleButtons = [];
        if (handedness === 'left') {
          modeToggleButtons = [4, 5]; // X, Y buttons (original)
        } else if (handedness === 'right') {
          modeToggleButtons = [4, 5]; // A, B buttons (original)
        }
        
        // Check mode toggle buttons (original pattern)
        modeToggleButtons.forEach(index => {
          if (gamepad.buttons[index]) {
            const button = gamepad.buttons[index];
            const buttonKey = `${handedness}-${index}`;
            const wasPressed = this.buttonStates.get(buttonKey) || false;
            const isPressed = button.pressed;
            
            // Detect button press (not held) - original logic
            if (isPressed && !wasPressed) {
              // Trigger mode toggle callback
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
    // Process joystick input from controllers
    const session = this.renderer.xr.getSession();
    if (!session) return { movement: null, teleport: null };
    
    let movementInput = null;
    let teleportInput = null;
    
    // Get input sources (controllers)
    for (let inputSource of session.inputSources) {
      if (inputSource.gamepad && inputSource.handedness) {
        const gamepad = inputSource.gamepad;
        const handedness = inputSource.handedness;
        
        // Get joystick axes (standard WebXR gamepad mapping)
        if (gamepad.axes.length >= 4) {
          const leftX = gamepad.axes[2] || 0;  // Left stick X
          const leftY = gamepad.axes[3] || 0;  // Left stick Y
          const rightX = gamepad.axes[0] || 0; // Right stick X
          const rightY = gamepad.axes[1] || 0; // Right stick Y
          
          // Apply deadzone filtering
          const filteredLeftX = Math.abs(leftX) > this.inputDeadzone ? leftX : 0;
          const filteredLeftY = Math.abs(leftY) > this.inputDeadzone ? leftY : 0;
          const filteredRightX = Math.abs(rightX) > this.inputDeadzone ? rightX : 0;
          const filteredRightY = Math.abs(rightY) > this.inputDeadzone ? rightY : 0;
          
          if (handedness === 'left') {
            // Left controller: movement
            if (filteredLeftX !== 0 || filteredLeftY !== 0) {
              movementInput = {
                x: filteredLeftX,
                y: filteredLeftY,
                handedness: 'left'
              };
            }
          } else if (handedness === 'right') {
            // Right controller: teleportation and turning
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
    // Clean up controllers
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
    
    // Clear references
    this.controller1 = null;
    this.controller2 = null;
    this.controllerGrip1 = null;
    this.controllerGrip2 = null;
    this.controllers = [];
    this.controllerGrips = [];
    this.buttonStates.clear();
  }
}
