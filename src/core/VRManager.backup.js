/**
 * VRManager - WebXR Support with Original VR Patterns Preserved
 * 
 * This module extracts and preserves the exact VR implementation patterns
 * from the original index.html, maintaining the same feel and behavior.
 */

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

export class VRManager {
  constructor(renderer, camera, scene) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    
    // VR State
    this.isVRSupported = false;
    this.isVRPresenting = false;
    
    // Controllers (preserving original pattern)
    this.controller1 = null;
    this.controller2 = null;
    this.controllerGrip1 = null;
    this.controllerGrip2 = null;
    this.controllers = [];
    this.controllerGrips = [];
    
    // Original VR settings preserved
    this.MOVE_SPEED = 2.0;    // m/s base movement speed (from original)
    this.TURN_SPEED = 1.5;    // rad/s turn speed (from original)
    this.FLY_SPEED = 1.0;     // m/s vertical movement (from original)
    
    // Movement state tracking (original pattern)
    this.currentSpeed = 0;
    this.targetSpeed = 0;
    this.currentBoostLevel = 0;
    this.targetBoostLevel = 0;
    this.SPEED_RAMP_RATE = 3.0;
    this.BOOST_RAMP_RATE = 6.0;
    this.isMoving = false; // Track movement state for vignetting
    
    // Input smoothing to prevent drift (NEW)
    this.inputDeadzone = 0.15;  // Increased deadzone
    this.turnSmoothingFactor = 0.1; // Smooth small inputs
    this.lastTurnInput = 0;
    
    // VR Comfort Settings - Simplified
    this.comfortSettings = {
      locomotionMode: 'smooth', // 'smooth', 'teleport'
      turningMode: 'smooth',    // 'smooth', 'snap'
      snapTurnAngle: 30,        // degrees per snap
      reducedMotion: false,     // slower, gentler movements
      showTeleportArc: true,    // visual feedback for teleportation
      comfortSpeed: 0.5         // speed multiplier when reduced motion is on
    };
    
    // Teleportation system
    this.teleportController = null;
    this.teleportMarker = null;
    this.teleportCurve = null;
    this.teleportFloor = null;        // Invisible floor mesh for height adjustment
    this.validTeleportPosition = null;
    this.teleportThreshold = 0.7;      // Joystick must be pushed this far to start aiming
    this.teleportReleaseThreshold = 0.3; // Below this threshold counts as "released"
    this.teleportPressed = false;      // Track if joystick is currently "pressed"
    this.teleportMaxMagnitude = 0;     // Track the maximum magnitude reached during this gesture
    this.teleportFloorHeight = -1.6;  // Virtual floor height offset from current user position
    this.teleportFloorMin = -10.0;    // Minimum floor height (10m below current)
    this.teleportFloorMax = 10.0;     // Maximum floor height (10m above current)
    
    // Button state tracking for controllers (original pattern)
    this.buttonStates = new Map();
    
    // Device detection (original pattern)
    this.isQuest2 = false;
    this.isQuest3 = false;
    
    // VR UI elements
    this.vrButton = null;
    
    // Sound system (original Web Audio API)
    this.soundEnabled = false;
    this.audioContext = null;
    this.dpvSound = null;
    this.dpvHighSound = null;
    this.ambienceSound = null;
    this.currentMovementSound = null;
    this.currentBoostSound = null;
    this.currentAmbienceSound = null;
    this.baseGainNode = null;
    this.boostGainNode = null;
    this.ambienceGainNode = null;
    
    // Callbacks
    this.onModeToggle = null;
    this.onMovementStart = null;
    this.onMovementStop = null;
    this.onMovementUpdate = null;
    
    this.init();
  }
  
  init() {
    // Enable WebXR (original pattern)
    this.renderer.xr.enabled = true;
    
    // Check VR support
    this.checkVRSupport();
    
    // Clean up any existing VR buttons first
    this.removeExistingVRButtons();
    
    // Create VR button with original styling - wait for DOM if needed
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.createVRButton();
      });
    } else {
      // DOM is already loaded, create immediately
      this.createVRButton();
    }
    
    // Initialize controllers with original patterns
    this.initControllers();
    
    // Setup VR session listeners (original pattern)
    this.setupSessionListeners();
    
    // Initialize comfort systems
    this.setupLocomotion();
    
    // Initialize sound system (optional) - async
    this.initializeSoundSystem().catch(error => {
      console.warn('🔇 Sound system initialization failed:', error);
    });
    
    // Only monitor VR buttons if VR is not supported
    // If VR is supported, let all VR-related buttons work normally
    if ('xr' in navigator) {
      navigator.xr.isSessionSupported('immersive-vr')
        .then(supported => {
          if (!supported) {
            this.startVRButtonMonitoring();
          }
        })
        .catch(() => {
          this.startVRButtonMonitoring();
        });
    } else {
      this.startVRButtonMonitoring();
    }
    
    // Initialize sound system
    this.initializeSoundSystem();
  }
  
  checkVRSupport() {
    if ('xr' in navigator) {
      navigator.xr.isSessionSupported('immersive-vr')
        .then(supported => {
          this.isVRSupported = supported;
          this.updateVRButton();
        })
        .catch(() => {
          this.isVRSupported = false;
          this.updateVRButton();
        });
    } else {
      this.isVRSupported = false;
      this.updateVRButton();
    }
  }
  
  createVRButton() {
    // Check VR availability without triggering VR
    this.checkVRAvailability().then((status) => {
      if (status === 'not-supported') {
        // Completely hide if not supported
        console.log('🚫 VR not supported - hiding button');
        return;
      }
      
      // Create button for available VR (let Three.js handle permission checks on click)
      console.log('✅ Creating VR button - Three.js will handle permissions on click');
      this.vrButton = VRButton.createButton(this.renderer);
      
      // Add VR icon and modern styling
      this.vrButton.innerHTML = `<span class="vr-icon">🥽</span>ENTER VR`;
      this.vrButton.className = 'vr-button-glass vr-button-available';
      this.vrButton.disabled = false;
      
      // Ensure button is immediately visible with inline styles
      this.vrButton.style.cssText = `
        position: fixed !important;
        bottom: 80px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        z-index: 100 !important;
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
      `;
      
      document.body.appendChild(this.vrButton);
      
      // Apply styling
      this.styleVRButton();
      
      // Wait for VR CSS to load, then re-apply full styling
      this.waitForVRCSS().then(() => {
        this.styleVRButton();
      });
      
      // Add click listener to handle permission issues when button is actually clicked
      this.vrButton.addEventListener('click', (event) => {
        console.log('🥽 VR button clicked - Three.js will handle session request');
        
        // Listen for session start/end to handle any permission errors
        const handleSessionError = (error) => {
          if (error && (error.name === 'NotAllowedError' || error.message?.includes('not allowed'))) {
            console.log('🔒 VR permission denied after click');
            // Update button to show denied state
            this.vrButton.innerHTML = `<span class="vr-icon">🔒</span>VR NOT ALLOWED`;
            this.vrButton.className = 'vr-button-glass vr-button-disabled';
            this.vrButton.disabled = true;
          }
        };
        
        // Monitor for session errors
        setTimeout(() => {
          if (!this.renderer.xr.isPresenting) {
            // VR didn't start - might be permission issue
            console.log('🔍 VR session did not start - checking for permission issues');
          }
        }, 1000);
      });
    });
  }
  
  // Check VR availability without triggering VR session
  async checkVRAvailability() {
    if (!navigator.xr) {
      console.log('🚫 WebXR not supported');
      return 'not-supported';
    }
    
    try {
      const isSupported = await navigator.xr.isSessionSupported('immersive-vr');
      if (!isSupported) {
        console.log('🚫 VR sessions not supported');
        return 'not-supported';
      }
      
      // DON'T actually request a session - just check if it's supported
      // The button itself will handle the actual session request when clicked
      console.log('✅ VR is available (ready for user to activate)');
      return 'available';
    } catch (error) {
      console.log('🚫 VR check failed:', error);
      return 'not-supported';
    }
  }
  
  styleVRButton() {
    // Apply modern glassmorphism styling with shimmer
    // Try immediately first, then with timeouts for CSS loading
    const applyStyles = () => {
      const vrBtn = document.querySelector('button.vr-button-glass') || 
                   document.querySelector('button') || 
                   this.vrButton;
      if (!vrBtn) return false;
      
      // Ensure button is visible (only call this if button should exist)
      vrBtn.style.display = 'flex';
      vrBtn.style.visibility = 'visible';
      vrBtn.style.opacity = '1';
      
      // Keep the VR available format
      vrBtn.innerHTML = `<span class="vr-icon">🥽</span>ENTER VR`;
      
      // Ensure glassmorphism class is applied
      if (!vrBtn.classList.contains('vr-button-glass')) {
        vrBtn.classList.add('vr-button-glass');
      }
      
      // Normal VR available styling with shimmer
      vrBtn.disabled = false;
      vrBtn.classList.remove('vr-generic-disabled');
      console.log('✨ VR Button styled - Ready with glassmorphism and shimmer');
      
      return true;
    };
    
    // Try immediately
    if (!applyStyles()) {
      // If CSS might not be loaded, try again with small delays
      setTimeout(applyStyles, 100);
      setTimeout(applyStyles, 300);
      setTimeout(applyStyles, 500);
    }
  }
  
  updateVRButton() {
    if (!this.vrButton) return;
    this.styleVRButton();
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
        const { handedness, targetRayMode } = evt.data;
        if (targetRayMode !== 'tracked-pointer') return; // skip hands
        
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
        console.log(`✅ ${handedness} controller connected`);
      });
      
      ctrl.addEventListener('disconnected', () => {
        console.log('❌ Controller disconnected');
      });
      
      // WebXR Controller Input Events (essential for Chrome WebXR)
      ctrl.addEventListener('selectstart', (event) => {
        console.log(`🎯 ${ctrl.userData.handedness} controller select started`);
        this.onControllerSelectStart(ctrl, event);
      });
      
      ctrl.addEventListener('selectend', (event) => {
        console.log(`🎯 ${ctrl.userData.handedness} controller select ended`);
        this.onControllerSelectEnd(ctrl, event);
      });
      
      ctrl.addEventListener('squeezestart', (event) => {
        console.log(`✊ ${ctrl.userData.handedness} controller squeeze started`);
        this.onControllerSqueezeStart(ctrl, event);
      });
      
      ctrl.addEventListener('squeezeend', (event) => {
        console.log(`✊ ${ctrl.userData.handedness} controller squeeze ended`);
        this.onControllerSqueezeEnd(ctrl, event);
      });
    });
  }
  
  // Controller input handlers for Chrome WebXR compatibility
  onControllerSelectStart(controller, event) {
    const handedness = controller.userData.handedness;
    if (handedness === 'right') {
      // Right controller select = primary action (movement forward)
      this.startMovement('forward');
    } else if (handedness === 'left') {
      // Left controller select = secondary action
      this.startMovement('boost');
    }
  }
  
  onControllerSelectEnd(controller, event) {
    const handedness = controller.userData.handedness;
    if (handedness === 'right') {
      this.stopMovement();
    } else if (handedness === 'left') {
      this.stopMovement();
    }
  }
  
  onControllerSqueezeStart(controller, event) {
    const handedness = controller.userData.handedness;
    console.log(`🚀 ${handedness} controller squeeze - boost activated`);
    this.currentBoostLevel = 1.0;
    this.targetBoostLevel = 1.0;
  }
  
  onControllerSqueezeEnd(controller, event) {
    const handedness = controller.userData.handedness;
    console.log(`🛑 ${handedness} controller squeeze ended - boost deactivated`);
    this.currentBoostLevel = 0;
    this.targetBoostLevel = 0;
  }
  
  // Movement control methods
  startMovement(type = 'forward') {
    this.isMoving = true;
    this.targetSpeed = this.MOVE_SPEED;
    
    if (this.onMovementStart) {
      this.onMovementStart();
    }
    
    // Start movement sound
    this.startMovementSound(false);
    
    console.log(`🏊‍♂️ VR movement started: ${type}`);
  }
  
  stopMovement() {
    this.isMoving = false;
    this.targetSpeed = 0;
    
    if (this.onMovementStop) {
      this.onMovementStop();
    }
    
    // Stop movement sound
    this.stopMovementSound();
    
    console.log('🛑 VR movement stopped');
  }
  
  setupSessionListeners() {
    // Original VR session event listeners
    this.renderer.xr.addEventListener('sessionstart', () => {
      console.log('VR session started');
      this.isVRPresenting = true;
      
      // Detect Quest device and apply optimizations (original pattern)
      const deviceType = this.detectQuestDevice();
      this.applyQuestOptimizations(deviceType);
      
      // Start ambient sound
      this.startAmbientSound();
      
      // Trigger session start callback
      if (this.onSessionStart) {
        this.onSessionStart();
      }
    });
    
    this.renderer.xr.addEventListener('sessionend', () => {
      console.log('VR session ended');
      this.isVRPresenting = false;
      
      // Reset Quest detection flags (original pattern)
      this.isQuest2 = false;
      this.isQuest3 = false;
      
      // Stop ambient sound
      this.stopAmbientSound();
      
      // Trigger session end callback
      if (this.onSessionEnd) {
        this.onSessionEnd();
      }
    });
  }
  
  detectQuestDevice() {
    // Original Quest device detection
    try {
      const userAgent = navigator.userAgent.toLowerCase();
      
      // Quest 2 detection patterns (original)
      if (userAgent.includes('quest 2') || 
          userAgent.includes('oculus quest 2') ||
          (userAgent.includes('oculus') && userAgent.includes('android') && !userAgent.includes('quest 3'))) {
        this.isQuest2 = true;
        console.log('🥽 Quest 2 detected - applying performance optimizations');
        return 'quest2';
      }
      
      // Quest 3 detection patterns (original)
      if (userAgent.includes('quest 3') || 
          userAgent.includes('oculus quest 3') ||
          userAgent.includes('meta quest 3')) {
        this.isQuest3 = true;
        console.log('🥽 Quest 3 detected - using full render distance');
        return 'quest3';
      }
      
      console.log('🥽 Unknown VR device or desktop - using default settings');
      return 'unknown';
    } catch (error) {
      console.warn('Device detection failed:', error);
      return 'unknown';
    }
  }
  
  applyQuestOptimizations(deviceType) {
    // Original Quest-specific optimizations
    if (deviceType === 'quest2') {
      // Limit render distance to 20m for Quest 2 performance (original)
      this.camera.far = 20;
      this.camera.updateProjectionMatrix();
      console.log('📊 Quest 2 optimizations applied - render distance limited to 20m');
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
          console.log(`🎮 ${handedness} controller detected with ${gamepad.buttons.length} buttons:`);
          gamepad.buttons.forEach((button, index) => {
            console.log(`  Button[${index}]: pressed=${button.pressed}, touched=${button.touched}, value=${button.value}`);
          });
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
              console.log(`🎮 ${handedness} controller button[${index}] pressed for mode toggle!`);
              
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
  
  updateMovement(deltaTime) {
    // Original VR movement logic
    const session = this.renderer.xr.getSession();
    if (!session || session.visibilityState !== 'visible') {
      return;
    }
    
    // Initialize audio on first VR interaction (original pattern)
    this.initAudioOnInteraction();
    
    // Early return if controllers aren't ready (original pattern)
    if (!this.controller1 || !this.controller2) {
      return;
    }
    
    // Track movement state for ramping (original)
    let currentlyMoving = false;
    let isBoosted = false;
    
    // Process input sources - original logic with validation
    for (let i = 0; i < session.inputSources.length; i++) {
      const src = session.inputSources[i];
      
      // Enhanced validation - original pattern
      if (!src || !src.gamepad || !src.gamepad.buttons || !src.gamepad.axes || src.gamepad.axes.length < 4) {
        continue; // Graceful skipping
      }
      
      const gamepad = src.gamepad;
      const hand = src.handedness;
      const controller = hand === 'left' ? this.controller1 : this.controller2;
      
      if (!controller) continue;
      
      // Movement controls - original axes mapping
      const x = gamepad.axes[2] || 0; // strafe/turn
      const y = gamepad.axes[3] || 0; // walk/fly (-y = forward)
      
      if (src.handedness === 'left') {
        // Left controller - locomotion (mode-dependent)
        const gripButton = gamepad.buttons[1];
        const speedMultiplier = (gripButton && gripButton.pressed) ? 3 : 1;
        const comfortSpeedMultiplier = this.comfortSettings.reducedMotion ? this.comfortSettings.comfortSpeed : 1.0;
        
        if (gripButton && gripButton.pressed) {
          isBoosted = true;
        }
        
        // Handle different locomotion modes
        if (this.comfortSettings.locomotionMode === 'teleport') {
          // Lightweight teleportation
          this.processTeleportation(controller, x, y);
        } else {
          // Traditional smooth movement (with comfort adjustments)
          const forward = new THREE.Vector3();
          this.camera.getWorldDirection(forward);
          forward.y = 0; // Lock to dolly's yaw
          forward.normalize();
          
          const right = new THREE.Vector3().crossVectors(forward, this.camera.up).normalize();
          
          // Apply movement with comfort speed multiplier
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
        // Right controller - turning and vertical movement
        const gripButton = gamepad.buttons[1];
        const verticalSpeedMultiplier = (gripButton && gripButton.pressed) ? 3 : 1;
        const comfortSpeedMultiplier = this.comfortSettings.reducedMotion ? this.comfortSettings.comfortSpeed : 1.0;
        
        if (gripButton && gripButton.pressed && Math.abs(y) > 0.1) {
          isBoosted = true;
        }
        
        // If teleport arc is visible, use Y-axis for floor height adjustment instead of normal vertical movement
        if (this.teleportPressed && this.teleportCurve && this.teleportCurve.visible) {
          // Adjust teleport floor height with right joystick Y-axis (up = up)
          if (Math.abs(y) > 0.1) {
            const floorAdjustSpeed = 4.0 * deltaTime; // 4 units per second (twice as fast)
            this.teleportFloorHeight += y * floorAdjustSpeed; // Positive because joystick up should raise floor
            this.teleportFloorHeight = Math.max(this.teleportFloorMin, Math.min(this.teleportFloorMax, this.teleportFloorHeight));
            
            // Update floor position and arc intersection
            this.updateTeleportFloor();
          }
        } else {
          // Normal vertical movement when not teleporting
          
          // Handle turning based on comfort setting
          if (this.comfortSettings.turningMode === 'snap') {
            // Snap turning for comfort
            this.processSnapTurn(x);
          } else {
            // Smooth turning (original with comfort adjustments)
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
          
          // Vertical movement with comfort speed
          if (Math.abs(y) > 0.1) {
            const rampedSpeed = this.FLY_SPEED * verticalSpeedMultiplier * comfortSpeedMultiplier * this.currentSpeed * deltaTime;
            this.camera.parent.position.y -= y * rampedSpeed;
            currentlyMoving = true;
          }
        }
      }
    }
    
    // Update target speeds based on input (original pattern)
    this.targetSpeed = currentlyMoving ? 1.0 : 0.0;
    this.targetBoostLevel = isBoosted ? 1.0 : 0.0;
    
    // Smoothly ramp speeds towards targets (original)
    if (this.currentSpeed < this.targetSpeed) {
      this.currentSpeed = Math.min(this.targetSpeed, this.currentSpeed + this.SPEED_RAMP_RATE * deltaTime);
    } else if (this.currentSpeed > this.targetSpeed) {
      this.currentSpeed = Math.max(this.targetSpeed, this.currentSpeed - this.SPEED_RAMP_RATE * deltaTime);
    }
    
    if (this.currentBoostLevel < this.targetBoostLevel) {
      this.currentBoostLevel = Math.min(this.targetBoostLevel, this.currentBoostLevel + this.BOOST_RAMP_RATE * deltaTime);
    } else if (this.currentBoostLevel > this.targetBoostLevel) {
      this.currentBoostLevel = Math.max(this.targetBoostLevel, this.currentBoostLevel - this.BOOST_RAMP_RATE * deltaTime);
    }
    
    // Handle movement callbacks
    if (this.currentSpeed > 0.05) { // Small threshold to avoid flutter
      if (!this.isMoving) {
        this.isMoving = true;
        if (this.onMovementStart) {
          this.onMovementStart();
        }
        // Start movement sound based on boost level
        this.startMovementSound();
      }
      if (this.onMovementUpdate) {
        this.onMovementUpdate(this.currentSpeed, this.currentBoostLevel);
      }
      // Update movement sound volume (original pattern)
      this.updateAudioLevels();
    } else {
      if (this.isMoving) {
        this.isMoving = false;
        if (this.onMovementStop) {
          this.onMovementStop();
        }
        // Stop movement sound
        this.stopMovementSound();
      }
    }
  }
  
  update(deltaTime) {
    if (!this.isVRPresenting) return;
    
    // Check controller buttons for mode toggle (original pattern)
    this.checkControllerButtons();
    
    // Update movement (original pattern)
    this.updateMovement(deltaTime);
    
    // Correct drift every 60 frames (about 1 second at 60fps)
    if (!this.driftCorrectionCounter) this.driftCorrectionCounter = 0;
    this.driftCorrectionCounter++;
    if (this.driftCorrectionCounter >= 60) {
      this.correctDrift();
      this.driftCorrectionCounter = 0;
      
      // Also validate comfort settings every second
      this.ensureComfortSettingsApplied();
    }
  }
  
  // Apply VR initial positions from model config (original pattern)
  applyVRPositions(positions) {
    if (!this.isVRPresenting || !positions || !positions.vr) return;
    
    const dolly = this.camera.parent;
    if (dolly) {
      dolly.position.set(
        positions.vr.dolly.x,
        positions.vr.dolly.y,
        positions.vr.dolly.z
      );
      dolly.rotation.set(
        positions.vr.rotation.x,
        positions.vr.rotation.y,
        positions.vr.rotation.z
      );
      
      console.log('📍 Applied VR initial position:', positions.vr);
    }
  }
  
  dispose() {
    // Clean up VR button
    if (this.vrButton && this.vrButton.parentNode) {
      this.vrButton.parentNode.removeChild(this.vrButton);
    }
    
    // Clean up controllers
    this.controllers.forEach(ctrl => {
      if (ctrl.parent) {
        ctrl.parent.remove(ctrl);
      }
    });
    
    this.controllerGrips.forEach(grip => {
      if (grip.parent) {
        grip.parent.remove(grip);
      }
    });
    
    this.controllers = [];
    this.controllerGrips = [];
    this.buttonStates.clear();
     // Clean up teleport marker and floor
    if (this.teleportMarker) {
      this.scene.remove(this.teleportMarker);
      this.teleportMarker = null;
    }
    if (this.teleportFloor) {
      this.scene.remove(this.teleportFloor);
      this.teleportFloor = null;
    }
    
    // Dispose sound system
    this.disposeSoundSystem();
  }
  
  // Helper method to detect when VR CSS is loaded
  waitForVRCSS() {
    return new Promise((resolve) => {
      // Check if vr.css styles are available by testing for computed styles
      const testElement = document.createElement('div');
      testElement.className = 'vr-button-glass';
      testElement.style.visibility = 'hidden';
      testElement.style.position = 'absolute';
      document.body.appendChild(testElement);
      
      const checkStyles = () => {
        const computedStyle = window.getComputedStyle(testElement);
        const hasGlassmorphism = computedStyle.backdropFilter && 
                               computedStyle.backdropFilter.includes('blur');
        
        if (hasGlassmorphism) {
          document.body.removeChild(testElement);
          resolve(true);
        } else {
          // CSS not loaded yet, try again
          setTimeout(checkStyles, 50);
        }
      };
      
      // Start checking after a small delay
      setTimeout(checkStyles, 10);
    });
  }
  
  // Clean up any existing VR buttons that shouldn't be there (only when not supported)
  removeExistingVRButtons() {
    // Only remove buttons if VR is completely not supported
    // Don't remove if it's just not allowed (greyed out state is fine)
    const allButtons = document.querySelectorAll('button, a');
    allButtons.forEach(button => {
      const text = (button.textContent || '').toUpperCase();
      // Only remove actual VR session buttons, not settings or other VR-related buttons
      if ((text.includes('ENTER VR') || text.includes('WEBXR') || 
           (text.includes('VR') && (text.includes('ENTER') || text.includes('START') || text.includes('ENABLE')))) &&
          !text.includes('NOT ALLOWED') && // Don't remove "not allowed" buttons
          !text.includes('SETTINGS') && // Don't remove VR settings buttons
          !text.includes('COMFORT') && // Don't remove VR comfort buttons
          !button.classList.contains('vr-button-disabled') &&
          button.id !== 'vrComfortButton') { // Specifically protect our comfort button
        console.log('🧹 Removing unsupported VR button:', button.textContent);
        button.remove();
      }
    });
  }
  
  // Periodically check for basic VR support (without triggering sessions)
  startVRButtonMonitoring() {
    setInterval(() => {
      // Only monitor and remove buttons if VR is completely not supported
      if (!navigator.xr) {
        this.removeExistingVRButtons();
        return;
      }
      
      navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
        if (!supported) {
          this.removeExistingVRButtons();
        }
        // If VR is supported, don't remove any buttons - let them work normally
      }).catch(() => {
        // Only remove if there's an error checking support
        this.removeExistingVRButtons();
      });
    }, 5000); // Check every 5 seconds (less frequent since VR support rarely changes)
  }
  
  // Helper method to normalize angles and prevent drift accumulation
  normalizeAngle(angle) {
    // Normalize angle to [-π, π] range to prevent floating point accumulation errors
    while (angle > Math.PI) {
      angle -= 2 * Math.PI;
    }
    while (angle < -Math.PI) {
      angle += 2 * Math.PI;
    }
    return angle;
  }
  
  // Reset method to correct any accumulated drift periodically
  correctDrift() {
    if (this.camera && this.camera.parent) {
      // Normalize all rotations to prevent accumulation errors
      this.camera.parent.rotation.x = this.normalizeAngle(this.camera.parent.rotation.x);
      this.camera.parent.rotation.y = this.normalizeAngle(this.camera.parent.rotation.y);
      this.camera.parent.rotation.z = this.normalizeAngle(this.camera.parent.rotation.z);
      
      // Reset tiny input accumulations
      if (Math.abs(this.lastTurnInput) < 0.01) {
        this.lastTurnInput = 0;
      }
    }
  }
  
  // Configure VR comfort settings - enhanced for mid-session robustness
  setComfortSettings(settings) {
    const oldSettings = { ...this.comfortSettings };
    this.comfortSettings = { ...this.comfortSettings, ...settings };
    console.log('🎮 VR comfort settings updated:', this.comfortSettings);
    
    // Handle locomotion mode changes mid-session
    if (settings.locomotionMode && settings.locomotionMode !== oldSettings.locomotionMode) {
      console.log(`🔄 Locomotion mode changed from ${oldSettings.locomotionMode} to ${settings.locomotionMode}`);
      this.setupLocomotion();
      
      // If switching to teleport mode mid-session, ensure teleport system is ready
      if (settings.locomotionMode === 'teleport' && this.isVRPresenting) {
        this.resetTeleportState();
      }
      
      // If switching away from teleport, hide any active teleport visuals
      if (oldSettings.locomotionMode === 'teleport' && settings.locomotionMode !== 'teleport') {
        this.hideTeleportArc();
        this.resetTeleportState();
      }
    }
    
    // Handle turning mode changes mid-session
    if (settings.turningMode && settings.turningMode !== oldSettings.turningMode) {
      console.log(`🔄 Turning mode changed from ${oldSettings.turningMode} to ${settings.turningMode}`);
      this.resetSnapTurnState();
    }
    
    // Handle motion comfort changes
    if (settings.reducedMotion !== undefined && settings.reducedMotion !== oldSettings.reducedMotion) {
      console.log(`🔄 Reduced motion changed from ${oldSettings.reducedMotion} to ${settings.reducedMotion}`);
    }
  }
  
  // Get current comfort settings
  getComfortSettings() {
    return { ...this.comfortSettings };
  }
   // Preset comfort configurations - simplified
  setComfortPreset(preset) {
    const presets = {
      'comfort': {
        locomotionMode: 'teleport',
        turningMode: 'snap',
        reducedMotion: true,
        comfortSpeed: 0.3
      },
      'experienced': {
        locomotionMode: 'smooth',
        turningMode: 'smooth',
        reducedMotion: false,
        comfortSpeed: 1.0
      }
    };

    if (presets[preset]) {
      this.setComfortSettings(presets[preset]);
      console.log(`🎯 Applied ${preset} comfort preset`);
    }
  }
  
  // Setup locomotion system based on comfort settings
  setupLocomotion() {
    if (this.comfortSettings.locomotionMode === 'teleport') {
      this.setupTeleportation();
    } else {
      // Hide any existing teleport visuals when switching away from teleport mode
      this.hideTeleportArc();
    }
  }
  
  // Reset teleport state - useful for mid-session mode changes
  resetTeleportState() {
    this.teleportPressed = false;
    this.teleportMaxMagnitude = 0;
    this.teleportController = null;
    this.validTeleportPosition = null;
    this.hideTeleportArc();
    console.log('🎯 Teleport state reset');
  }
  
  // Reset snap turn state - useful for mid-session mode changes
  resetSnapTurnState() {
    this.lastSnapTurnTime = 0;
    console.log('🔄 Snap turn state reset');
  }
  
  // Enhanced teleport failure feedback
  showTeleportFailureFeedback() {
    // Visual feedback: briefly flash the teleport marker red
    if (this.teleportMarker) {
      const originalColor = this.teleportMarker.material.color.clone();
      this.teleportMarker.material.color.setHex(0xff4444);
      this.teleportMarker.visible = true;
      
      setTimeout(() => {
        if (this.teleportMarker) {
          this.teleportMarker.material.color.copy(originalColor);
          this.teleportMarker.visible = false;
        }
      }, 300);
    }
    
    // Audio feedback: play a subtle negative sound (if available)
    try {
      // Create a brief negative tone using Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      // Audio feedback not available, continue silently
    }
    
    console.log('🚫 Teleport failed - no valid surface found');
  }
  
  // Initialize smooth teleportation system with arc
  setupTeleportation() {
    // Create the smooth teleport arc system
    this.createTeleportArc();
    console.log('🎯 Enhanced teleportation system with smooth arc initialized');
  }
  
  // Create the smooth white teleport arc
  createTeleportArc() {
    // Create a smooth white tube for the arc
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 1, -5)
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 20, 0.03, 8, false);
    
    // White material with slight transparency and glow
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
    
    this.teleportCurve = new THREE.Mesh(geometry, material);
    this.teleportCurve.visible = false;
    this.scene.add(this.teleportCurve);
    
    // Create teleport landing marker - white glowing ring
    if (!this.teleportMarker) {
      const markerGeometry = new THREE.RingGeometry(0.4, 0.6, 20);
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
      });
      
      this.teleportMarker = new THREE.Mesh(markerGeometry, markerMaterial);
      this.teleportMarker.rotation.x = -Math.PI / 2; // Lay flat on ground
      this.teleportMarker.visible = false;
      this.scene.add(this.teleportMarker);
      
      // Add a subtle glow effect
      const glowGeometry = new THREE.RingGeometry(0.3, 0.7, 20);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.rotation.x = -Math.PI / 2;
      this.teleportMarker.add(glow);
    }
    
    // Create invisible virtual floor for height adjustment
    if (!this.teleportFloor) {
      const floorGeometry = new THREE.PlaneGeometry(100, 100); // Large invisible plane
      const floorMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.1, // Very subtle when visible
        side: THREE.DoubleSide,
        visible: false // Invisible by default
      });
      
      this.teleportFloor = new THREE.Mesh(floorGeometry, floorMaterial);
      this.teleportFloor.rotation.x = -Math.PI / 2; // Lay flat like ground
      this.teleportFloor.visible = false;
      this.scene.add(this.teleportFloor);
    }
  }

  // Execute the teleport to the calculated position
  executeTeleport() {
    if (!this.validTeleportPosition) return;
    
    // Use the position directly (Y level already set to maintain user's current height)
    const targetPosition = this.validTeleportPosition.clone();
    
    // Smoothly move the dolly (camera parent) to the target position
    this.camera.parent.position.copy(targetPosition);
    
    // Optional: Add teleport effect/sound here
    console.log(`🚀 Teleported to: ${targetPosition.x.toFixed(2)}, ${targetPosition.y.toFixed(2)}, ${targetPosition.z.toFixed(2)}`);
    
    // Clear the teleport position
    this.validTeleportPosition = null;
  }

  // Smooth dash movement (comfort alternative to instant teleport)
  dashToPosition(targetPosition) {
    const startPosition = this.camera.parent.position.clone();
    const distance = startPosition.distanceTo(targetPosition);
    const dashDuration = Math.min(distance * 0.2, 1.0); // Max 1 second dash
    
    let dashTime = 0;
    const dashUpdate = () => {
      dashTime += 1/60; // Assume 60fps
      const progress = Math.min(dashTime / dashDuration, 1);
      
      // Ease-out curve for comfortable movement
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      this.camera.parent.position.lerpVectors(startPosition, targetPosition, easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(dashUpdate);
      }
    };
    
    dashUpdate();
  }
  
  // Snap turning implementation (comfort feature)
  processSnapTurn(inputX) {
    if (!this.lastSnapTurnTime) this.lastSnapTurnTime = 0;
    const now = Date.now();
    
    // Prevent rapid snap turning (500ms cooldown)
    if (now - this.lastSnapTurnTime < 500) return;
    
    if (Math.abs(inputX) > 0.7) { // Strong input required for snap turn
      const snapAngle = this.comfortSettings.snapTurnAngle * Math.PI / 180; // Convert to radians
      const turnDirection = inputX > 0 ? 1 : -1;
      
      this.camera.parent.rotation.y -= turnDirection * snapAngle;
      this.camera.parent.rotation.y = this.normalizeAngle(this.camera.parent.rotation.y);
      
      this.lastSnapTurnTime = now;
      console.log(`🔄 Snap turn: ${turnDirection > 0 ? 'right' : 'left'} ${this.comfortSettings.snapTurnAngle}°`);
    }
  }
  
  // Lightweight teleportation processing
  processTeleportation(controller, x, y) {
    // Calculate joystick magnitude (any direction can trigger teleportation)
    const magnitude = Math.sqrt(x * x + y * y);
    
    // Check if joystick is being "pressed" (above threshold)
    if (magnitude > this.teleportThreshold && !this.teleportPressed) {
      // Start aiming - show arc immediately
      this.teleportPressed = true;
      this.teleportMaxMagnitude = magnitude;
      this.teleportController = controller;
      this.showTeleportArc();
    } else if (this.teleportPressed) {
      // Track max magnitude during gesture for distance calculation
      this.teleportMaxMagnitude = Math.max(this.teleportMaxMagnitude, magnitude);
      
      // Update the arc visualization in real-time
      this.updateTeleportArc();
      
      // Check if joystick was released (below release threshold)
      if (magnitude < this.teleportReleaseThreshold) {
        // Calculate landing position ONCE and execute teleport
        this.calculateAndExecuteTeleport();
        this.hideTeleportArc();
        this.teleportPressed = false;
        this.teleportMaxMagnitude = 0;
        this.teleportController = null;
      }
    }
  }

  // Show the smooth white teleport arc
  showTeleportArc() {
    if (!this.teleportCurve) {
      this.createTeleportArc();
    }
    this.teleportCurve.visible = true;
    if (this.teleportMarker) {
      this.teleportMarker.visible = true;
    }
    // Position and show the virtual floor at default height
    this.updateTeleportFloor();
  }

  // Hide the teleport arc
  hideTeleportArc() {
    if (this.teleportCurve) {
      this.teleportCurve.visible = false;
    }
    if (this.teleportMarker) {
      this.teleportMarker.visible = false;
    }
    if (this.teleportFloor) {
      this.teleportFloor.visible = false;
    }
  }

  // Update arc in real-time while aiming (natural physics arc with floor intersection)
  updateTeleportArc() {
    if (!this.teleportController || !this.teleportCurve) return;
    
    // Get controller position and orientation
    const controllerPos = new THREE.Vector3();
    this.teleportController.getWorldPosition(controllerPos);
    
    const controllerQuat = new THREE.Quaternion();
    this.teleportController.getWorldQuaternion(controllerQuat);
    
    // Get the actual pointing direction from the controller
    const forwardDir = new THREE.Vector3(0, 0, -1);
    forwardDir.applyQuaternion(controllerQuat);
    
    // Enhanced distance control with finer sensitivity for left joystick
    const minDistance = 3;   // Minimum 3m
    const maxDistance = 30;  // Maximum 30m
    
    // More sensitive/fine control - use a more nuanced mapping
    const normalizedMagnitude = Math.min(this.teleportMaxMagnitude / this.teleportThreshold, 1.0);
    const distanceRange = maxDistance - minDistance;
    
    // Use a quadratic curve for finer control at lower distances
    const distanceRatio = Math.pow(normalizedMagnitude, 0.7); // Gentler curve for finer control
    const targetDistance = minDistance + (distanceRange * distanceRatio);
    
    // Physics-based parabolic arc that always bends to ground within 30m
    const arcPoints = [];
    const steps = 40; // More steps for better precision
    const gravity = -9.8; // m/s² downward
    
    // Calculate initial velocity to ensure arc always reaches target distance and bends down
    // Adjust velocity based on controller angle to ensure natural arc behavior
    let baseVelocity = Math.sqrt(targetDistance * Math.abs(gravity) / 2); // Physics-based velocity
    
    // Adjust for controller pointing direction
    if (forwardDir.y > 0.3) {
      // Pointing up too much - reduce velocity to ensure it comes down
      baseVelocity *= (1.0 - forwardDir.y * 0.5);
    } else if (forwardDir.y < -0.5) {
      // Pointing down - increase horizontal component to reach target distance
      baseVelocity *= (1.0 + Math.abs(forwardDir.y) * 0.3);
    }
    
    // Ensure the arc always completes within 30m horizontally
    const horizontalDistance = Math.sqrt(forwardDir.x * forwardDir.x + forwardDir.z * forwardDir.z);
    if (horizontalDistance > 0.1) {
      // Scale velocity to ensure we don't overshoot horizontally
      const velocityScale = Math.min(1.0, targetDistance / (baseVelocity * 2.0));
      baseVelocity *= velocityScale;
    }
    
    // Calculate initial velocity components
    const initialVelX = forwardDir.x * baseVelocity;
    const initialVelY = Math.max(forwardDir.y * baseVelocity, baseVelocity * 0.3); // Minimum upward component
    const initialVelZ = forwardDir.z * baseVelocity;
    
    // Time duration for the arc - calculate based on physics to ensure it completes
    const timeToApex = initialVelY / Math.abs(gravity); // Time to reach peak
    const maxTime = Math.max(timeToApex * 2.2, 1.5); // Ensure arc completes, minimum 1.5 seconds
    
    // Calculate virtual floor height (relative to current user position)
    const currentUserY = this.camera.parent.position.y;
    const virtualFloorY = currentUserY + this.teleportFloorHeight;
    
    // Build the natural physics arc and find intersection with virtual floor
    let intersectionPoint = null;
    let peakReached = false;
    let previousY = controllerPos.y;
    let peakTime = 0;
    
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * maxTime; // Time in seconds
      
      // Physics equations: position = initial_position + initial_velocity * t + 0.5 * acceleration * t²
      const point = new THREE.Vector3(
        controllerPos.x + initialVelX * t,
        controllerPos.y + initialVelY * t + 0.5 * gravity * t * t, // Real physics with gravity
        controllerPos.z + initialVelZ * t
      );
      
      // Check if we've reached the peak (start of downward trajectory)
      if (!peakReached && point.y < previousY) {
        peakReached = true;
        peakTime = t;
      }
      
      arcPoints.push(point);
      
      // Only check for intersection AFTER the peak AND after sufficient downward travel
      const timeAfterPeak = peakReached ? (t - peakTime) : 0;
      const isOnDownwardTrajectory = peakReached && timeAfterPeak > 0.1; // Must be at least 0.1s after peak
      
      if (!intersectionPoint && isOnDownwardTrajectory && point.y <= virtualFloorY) {
        // Linear interpolation to find more precise intersection point
        if (i > 0) {
          const prevPoint = arcPoints[i - 1];
          const ratio = (virtualFloorY - prevPoint.y) / (point.y - prevPoint.y);
          intersectionPoint = new THREE.Vector3().lerpVectors(prevPoint, point, ratio);
          intersectionPoint.y = virtualFloorY; // Snap to exact floor height
        } else {
          intersectionPoint = point.clone();
          intersectionPoint.y = virtualFloorY;
        }
        
        // Truncate arc at intersection point
        arcPoints[i] = intersectionPoint;
        arcPoints.length = i + 1; // Remove points beyond intersection
        break;
      }
      
      previousY = point.y;
      
      // Safety check: if arc goes too far horizontally, force it to end
      const horizontalDist = Math.sqrt(
        Math.pow(point.x - controllerPos.x, 2) + 
        Math.pow(point.z - controllerPos.z, 2)
      );
      if (horizontalDist > maxDistance) {
        // Force end of arc at max distance
        if (isOnDownwardTrajectory) {
          intersectionPoint = new THREE.Vector3(point.x, virtualFloorY, point.z);
          arcPoints[i] = intersectionPoint;
          arcPoints.length = i + 1;
        }
        break;
      }
    }
    
    // If no intersection found, ensure we have a valid endpoint
    if (!intersectionPoint && arcPoints.length > 0) {
      // Find the lowest point in the arc and create intersection there
      let lowestPoint = arcPoints[0];
      let lowestIndex = 0;
      
      for (let i = 1; i < arcPoints.length; i++) {
        if (arcPoints[i].y < lowestPoint.y) {
          lowestPoint = arcPoints[i];
          lowestIndex = i;
        }
      }
      
      // Only create intersection if we're past the peak
      if (lowestIndex > arcPoints.length / 3) { // Must be in latter part of arc
        // Force intersection at virtual floor level at the lowest horizontal position
        intersectionPoint = new THREE.Vector3(lowestPoint.x, virtualFloorY, lowestPoint.z);
        
        // Truncate arc at this point
        arcPoints.length = lowestIndex + 1;
        arcPoints[lowestIndex] = intersectionPoint;
      }
    }
    
    // Update arc geometry with the natural physics curve
    if (arcPoints.length > 1) {
      const curve = new THREE.CatmullRomCurve3(arcPoints);
      const newGeometry = new THREE.TubeGeometry(curve, 20, 0.03, 6, false);
      
      if (this.teleportCurve.geometry) {
        this.teleportCurve.geometry.dispose();
      }
      this.teleportCurve.geometry = newGeometry;
    }
    
    // Position marker at the intersection point (where arc hits virtual floor)
    if (this.teleportMarker && intersectionPoint) {
      this.teleportMarker.position.copy(intersectionPoint);
      this.teleportMarker.visible = true;
      
      // Visual feedback: change marker color based on floor height
      if (this.teleportFloorHeight < -0.5) {
        // Below normal height - blue tint
        this.teleportMarker.material.color.setHex(0x88ccff);
      } else if (this.teleportFloorHeight > 0.5) {
        // Above normal height - yellow tint
        this.teleportMarker.material.color.setHex(0xffff88);
      } else {
        // Normal height range - white
        this.teleportMarker.material.color.setHex(0xffffff);
      }
    }
  }

  // Update virtual floor position and make it slightly visible during adjustment
  updateTeleportFloor() {
    if (!this.teleportFloor) return;
    
    // Position floor at the adjusted height relative to current user position
    const currentUserY = this.camera.parent.position.y;
    const virtualFloorY = currentUserY + this.teleportFloorHeight;
    
    this.teleportFloor.position.y = virtualFloorY;
    
    // Make floor slightly visible when adjusting (subtle grid/plane)
    this.teleportFloor.visible = true;
    this.teleportFloor.material.visible = true;
    this.teleportFloor.material.opacity = 0.15;
    
    // Color-code the floor based on height
    if (this.teleportFloorHeight < -0.5) {
      // Below normal - blue tint
      this.teleportFloor.material.color.setHex(0x4488ff);
    } else if (this.teleportFloorHeight > 0.5) {
      // Above normal - yellow tint  
      this.teleportFloor.material.color.setHex(0xffff44);
    } else {
      // Normal range - green tint
      this.teleportFloor.material.color.setHex(0x44ff88);
    }
    
    // Update the arc to intersect with the new floor position
    this.updateTeleportArc();
  }

  // Update teleport marker height when adjusting with right joystick
  updateTeleportArcHeight() {
    // Floor adjustment is now handled by updateTeleportFloor()
    // This method triggers the floor update which updates the arc intersection
    this.updateTeleportFloor();
  }
  
  // Calculate teleport arc and landing (only lands on downward arc intersection)
  calculateAndExecuteTeleport() {
    if (!this.teleportController || this.teleportMaxMagnitude < this.teleportThreshold) return;
    
    // The intersection point is already calculated in updateTeleportArc
    // Only teleport if marker is visible and represents a valid downward intersection
    if (this.teleportMarker && this.teleportMarker.visible) {
      const intersectionPoint = this.teleportMarker.position.clone();
      
      // Validate that this is a reasonable teleport position
      const currentUserPos = this.camera.parent.position;
      const horizontalDistance = Math.sqrt(
        Math.pow(intersectionPoint.x - currentUserPos.x, 2) + 
        Math.pow(intersectionPoint.z - currentUserPos.z, 2)
      );
      
      // Only allow teleport if within reasonable range and on downward trajectory
      if (horizontalDistance >= 3 && horizontalDistance <= 30) {
        // Keep the user's current Y level for teleportation (not the intersection Y)
        const currentUserY = this.camera.parent.position.y;
        const teleportPosition = new THREE.Vector3(intersectionPoint.x, currentUserY, intersectionPoint.z);
        
        this.validTeleportPosition = teleportPosition;
        this.executeTeleport();
        
        // Reset floor height to default after teleport
        this.teleportFloorHeight = -1.6;
        
        console.log(`🚀 Teleported to floor intersection: ${teleportPosition.x.toFixed(2)}, ${teleportPosition.y.toFixed(2)}, ${teleportPosition.z.toFixed(2)}`);
      } else {
        console.log(`🚫 Invalid teleport distance: ${horizontalDistance.toFixed(2)}m (must be 3-30m)`);
      }
    } else {
      console.log('🚫 No valid downward intersection point found');
    }
  }
  
  // Ensure comfort settings are properly applied during VR session
  ensureComfortSettingsApplied() {
    if (!this.isVRPresenting) return;
    
    // Validate that teleportation system is ready if in teleport mode
    if (this.comfortSettings.locomotionMode === 'teleport') {
      if (!this.teleportCurve || !this.teleportMarker) {
        console.log('🔧 Teleportation system not ready, reinitializing...');
        this.setupTeleportation();
      }
    }
    
    // Only log occasionally to avoid spam
    if (!this.lastComfortLog || Date.now() - this.lastComfortLog > 10000) { // Every 10 seconds
      console.log('🎮 VR comfort mode:', this.comfortSettings.locomotionMode === 'teleport' ? 'SAFETY/COMFORT' : 'EXPERIENCED');
      this.lastComfortLog = Date.now();
    }
  }
  
  // Sound System Methods - Original Web Audio API Implementation
  
  // Initialize the VR sound system (optional feature) - EXACT ORIGINAL
  async initializeSoundSystem() {
    try {
      // Create audio context (original pattern)
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Load DPV sounds and ambience (original pattern)
      const [dpvBuffer, dpvHighBuffer, ambienceBuffer] = await Promise.all([
        this.loadAudioBuffer('sound/dpv.ogg'),
        this.loadAudioBuffer('sound/dpvhigh.ogg'),
        this.loadAudioBuffer('sound/vrambience.ogg')
      ]);
      
      // Store buffers (original pattern)
      this.dpvSound = dpvBuffer;
      this.dpvHighSound = dpvHighBuffer;
      this.ambienceSound = ambienceBuffer;
      
      // Start ambient sound immediately (original pattern)
      this.startAmbientSound();
      
      this.soundEnabled = true;
      console.log('🔊 VR Audio system initialized successfully (Web Audio API)');
    } catch (error) {
      console.warn('🔇 VR Audio initialization failed:', error);
      this.soundEnabled = false;
    }
  }
  
  // Load audio buffer from URL (original)
  async loadAudioBuffer(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await this.audioContext.decodeAudioData(arrayBuffer);
  }
  
  // Initialize audio on user interaction (required for web audio) (original)
  initAudioOnInteraction() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
  
  // Start ambient sound when entering VR (original pattern)
  startAmbientSound() {
    if (!this.audioContext || !this.ambienceSound || this.currentAmbienceSound) return;
    
    try {
      const ambienceSource = this.audioContext.createBufferSource();
      this.ambienceGainNode = this.audioContext.createGain();
      
      ambienceSource.buffer = this.ambienceSound;
      ambienceSource.connect(this.ambienceGainNode);
      this.ambienceGainNode.connect(this.audioContext.destination);
      
      ambienceSource.loop = true;
      this.ambienceGainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime); // Start at full volume - seamless loop
      
      ambienceSource.start();
      this.currentAmbienceSound = ambienceSource;
      
      console.log('🎵 Ambient underwater sound started');
    } catch (error) {
      console.warn('🔇 Error starting ambient sound:', error);
    }
  }
  
  // Stop ambient sound when exiting VR (original pattern)
  stopAmbientSound() {
    if (this.currentAmbienceSound && this.ambienceGainNode && this.audioContext) {
      try {
        this.currentAmbienceSound.stop();
        this.currentAmbienceSound = null;
        this.ambienceGainNode = null;
        console.log('🔇 Ambient sound stopped');
      } catch (error) {
        console.warn('🔇 Error stopping ambient sound:', error);
      }
    }
  }
  
  // Start movement sound with smooth audio setup (original pattern)
  startMovementSound() {
    if (!this.audioContext || !this.dpvSound || !this.dpvHighSound) return;
    
    // Stop current movement sounds if playing
    if (this.currentMovementSound) {
      this.currentMovementSound.stop();
      this.currentMovementSound = null;
    }
    if (this.currentBoostSound) {
      this.currentBoostSound.stop();
      this.currentBoostSound = null;
    }
    if (this.baseGainNode) {
      this.baseGainNode.disconnect();
    }
    if (this.boostGainNode) {
      this.boostGainNode.disconnect();
    }
    
    try {
      // Always create and play the base DPV sound (original pattern)
      const baseSource = this.audioContext.createBufferSource();
      this.baseGainNode = this.audioContext.createGain();
      
      baseSource.buffer = this.dpvSound;
      baseSource.connect(this.baseGainNode);
      this.baseGainNode.connect(this.audioContext.destination);
      
      baseSource.loop = true;
      this.baseGainNode.gain.setValueAtTime(0, this.audioContext.currentTime); // Start at 0 for smooth ramp
      
      baseSource.start();
      this.currentMovementSound = baseSource;
      
      // Create boost sound (always available for smooth transitions) (original pattern)
      const boostSource = this.audioContext.createBufferSource();
      this.boostGainNode = this.audioContext.createGain();
      
      boostSource.buffer = this.dpvHighSound;
      boostSource.connect(this.boostGainNode);
      this.boostGainNode.connect(this.audioContext.destination);
      
      boostSource.loop = true;
      this.boostGainNode.gain.setValueAtTime(0, this.audioContext.currentTime); // Start at 0
      
      boostSource.start();
      this.currentBoostSound = boostSource;
      
      console.log('🎵 Movement audio system started with smooth ramping');
    } catch (error) {
      console.warn('🔇 Error playing movement sound:', error);
    }
  }
  
  // Stop movement sound with smooth fade (original pattern)
  stopMovementSound() {
    if (this.baseGainNode && this.audioContext) {
      try {
        this.baseGainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.2);
        setTimeout(() => {
          if (this.currentMovementSound) {
            this.currentMovementSound.stop();
            this.currentMovementSound = null;
          }
        }, 250);
      } catch (error) {
        console.warn('🔇 Error stopping base movement sound:', error);
      }
    }
    
    if (this.boostGainNode && this.audioContext) {
      try {
        this.boostGainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.2);
        setTimeout(() => {
          if (this.currentBoostSound) {
            this.currentBoostSound.stop();
            this.currentBoostSound = null;
          }
          this.baseGainNode = null;
          this.boostGainNode = null;
        }, 250);
      } catch (error) {
        console.warn('🔇 Error stopping boost movement sound:', error);
      }
    }
  }
  
  // Update audio volumes based on current speed and boost levels (original)
  updateAudioLevels() {
    if (!this.baseGainNode || !this.boostGainNode || !this.audioContext) return;
    
    try {
      // Base volume scales with movement speed (increased by 1.3x again: 1.17 → 1.52) (original)
      const baseVolume = this.currentSpeed * 1.52;
      
      // Boost volume scales with boost level (increased by 1.3x again: 0.78 → 1.01) (original)
      const boostVolume = this.currentBoostLevel * 1.01;
      
      // Smooth volume transitions (original)
      this.baseGainNode.gain.linearRampToValueAtTime(baseVolume, this.audioContext.currentTime + 0.1);
      this.boostGainNode.gain.linearRampToValueAtTime(boostVolume, this.audioContext.currentTime + 0.1);
      
    } catch (error) {
      console.warn('🔇 Error updating audio levels:', error);
    }
  }
  
  // Dispose of sound system (original pattern)
  disposeSoundSystem() {
    this.stopAmbientSound();
    this.stopMovementSound();
    
    if (this.audioContext) {
      try {
        this.audioContext.close();
        this.audioContext = null;
      } catch (error) {
        console.warn('🔇 Audio context disposal failed:', error);
      }
    }
    
    // Clear audio buffers
    this.dpvSound = null;
    this.dpvHighSound = null;
    this.ambienceSound = null;
    this.currentMovementSound = null;
    this.currentBoostSound = null;
    this.currentAmbienceSound = null;
    this.baseGainNode = null;
    this.boostGainNode = null;
    this.ambienceGainNode = null;
    
    this.soundEnabled = false;
    console.log('🔇 VR Sound system disposed');
  }
}
