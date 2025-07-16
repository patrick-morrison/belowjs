/**
 * VRManager - Main VR Coordinator (Refactored)
 * 
 * This is the new slim VRManager that coordinates all VR modules.
 * Maintains exact functionality while providing clean modular architecture.
 */

import * as THREE from 'three';
import { VRCore } from '../vr/core/VRCore.js';
import { VRControllers } from '../vr/core/VRControllers.js';
import { VRTeleport } from '../vr/locomotion/VRTeleport.js';
import { VRLocomotion } from '../vr/locomotion/VRLocomotion.js';
import { VRComfort } from '../vr/locomotion/VRComfort.js';
import { VRAudio } from '../vr/audio/VRAudio.js';

export class VRManager {
  constructor(renderer, camera, scene, audioPath = './sound/') {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.audioPath = audioPath;
    
    // Core VR modules
    this.vrCore = new VRCore(renderer, camera, scene);
    this.vrControllers = new VRControllers(renderer, camera);
    this.vrTeleport = new VRTeleport(scene, camera);
    this.vrLocomotion = new VRLocomotion(camera, renderer);
    this.vrComfort = new VRComfort();
    this.vrAudio = new VRAudio();
    
    // Legacy compatibility properties
    this.isVRSupported = false;
    this.isVRPresenting = false;
    this.controller1 = null;
    this.controller2 = null;
    this.controllerGrip1 = null;
    this.controllerGrip2 = null;
    this.controllers = [];
    this.controllerGrips = [];
    
    // Camera state preservation for VR transitions (independent of measurements)
    this._preVRCameraState = {
      target: null,
      position: null,
      zoom: null,
      minDistance: null,
      maxDistance: null,
      enableDamping: null,
      dampingFactor: null,
      enableZoom: null,
      enablePan: null,
      enableRotate: null,
      autoRotate: null,
      autoRotateSpeed: null,
      controls: null // Reference to controls object
    };
    
    // Comfort tracking
    this.lastComfortLog = 0;
    
    // Callbacks - maintain original API
    this.onModeToggle = null;
    this.onMovementStart = null;
    this.onMovementStop = null;
    this.onMovementUpdate = null;
    
    this.init();
  }
  
  init() {
    // Initialize all VR modules
    this.vrCore.init();
    this.vrControllers.init();
    this.vrTeleport.init();
    this.vrLocomotion.init();
    
    // Connect modules together
    this.setupModuleConnections();
    
    // Initialize sound system (optional) - async
    this.vrAudio.init(this.audioPath).catch(error => {
      console.warn('🔇 Sound system initialization failed:', error);
    });
  }
  
  setupModuleConnections() {
    // Connect VR Core callbacks
    this.vrCore.onSessionStart = () => {
      // Always save camera state before entering VR
      console.debug('[VRManager] VR session starting - saving camera state');
      this._saveCameraState();
      this.isVRPresenting = true;
      this.vrAudio.initAudioOnInteraction();
    };
    
    this.vrCore.onSessionEnd = () => {
      console.debug('[VRManager] VR session ending - will restore camera state');
      this.isVRPresenting = false;
      
      // Always restore camera state after exiting VR
      setTimeout(() => {
        this._restoreCameraState();
      }, 100);
    };
    
    // Connect Controller callbacks (no movement sound on trigger, joystick only)
    this.vrControllers.onSelectStart = (handedness, controller, event) => {
      // No-op: let joystick movement control movement state and sound
    };

    this.vrControllers.onSelectEnd = (handedness, controller, event) => {
      // No-op
    };
    
    this.vrControllers.onSqueezeStart = (handedness, controller, event) => {
      this.vrLocomotion.currentBoostLevel = 1.0;
      this.vrLocomotion.targetBoostLevel = 1.0;
    };
    
    this.vrControllers.onSqueezeEnd = (handedness, controller, event) => {
      this.vrLocomotion.currentBoostLevel = 0;
      this.vrLocomotion.targetBoostLevel = 0;
    };
    
    this.vrControllers.onModeToggle = () => {
      if (this.onModeToggle) {
        this.onModeToggle();
      }
    };
    
    // Connect Locomotion callbacks
    this.vrLocomotion.onMovementStart = () => {
      this.vrAudio.startMovementSound();
      if (this.onMovementStart) {
        this.onMovementStart();
      }
    };
    
    this.vrLocomotion.onMovementStop = () => {
      this.vrAudio.stopMovementSound();
      if (this.onMovementStop) {
        this.onMovementStop();
      }
    };
    
    this.vrLocomotion.onMovementUpdate = (movementState) => {
      // Update audio levels with current movement state
      this.vrAudio.updateAudioLevels(movementState.currentSpeed, movementState.currentBoostLevel);
      
      if (this.onMovementUpdate) {
        this.onMovementUpdate(movementState);
      }
    };
    
    // Connect Comfort system to Locomotion
    this.vrComfort.onSettingsChange = (settings) => {
      this.vrLocomotion.setComfortSettings(settings);
    };
    
    // Connect Teleport system to Locomotion
    this.vrLocomotion.setTeleportSystem(this.vrTeleport);
    
    // Sync initial comfort settings ONLY on first load, not on every session start
    if (typeof this._comfortSettingsInitialized === 'undefined') {
      this.vrLocomotion.setComfortSettings(this.vrComfort.getSettings());
      this._comfortSettingsInitialized = true;
    }
  }
  
  // Movement control methods (maintain original API)
  startMovement(type = 'forward') {
    this.vrLocomotion.startMovement(type);
  }
  
  stopMovement() {
    this.vrLocomotion.stopMovement();
  }
  
  // Main update loop (original pattern)
  update(deltaTime) {
    // Update controller button states
    this.vrControllers.checkControllerButtons();

    // Compose controllers object with hand gesture update if available
    const controllers = {
      ...this.vrControllers.getControllers(),
      handsActive: this.vrControllers.handsActive,
      handStates: this.vrControllers.handStates,
      updateHandGestures: this.vrControllers.updateHandGestures ? this.vrControllers.updateHandGestures.bind(this.vrControllers) : undefined
    };
    this.vrLocomotion.updateMovement(deltaTime, controllers);

    // Sync legacy properties for compatibility
    this.syncLegacyProperties();

    // Apply comfort settings periodically
    this.ensureComfortSettingsApplied();

    // Correct any drift
    this.vrLocomotion.correctDrift();
  }
  
  // Sync properties for legacy compatibility
  syncLegacyProperties() {
    const vrStatus = this.vrCore.getVRStatus();
    this.isVRSupported = vrStatus.supported;
    this.isVRPresenting = vrStatus.presenting;
    
    const controllers = this.vrControllers.getControllers();
    this.controller1 = controllers.controller1;
    this.controller2 = controllers.controller2;
    this.controllerGrip1 = controllers.controllerGrip1;
    this.controllerGrip2 = controllers.controllerGrip2;
    this.controllers = controllers.controllers;
    this.controllerGrips = controllers.controllerGrips;
  }
  
  // Comfort settings methods (maintain original API)
  setComfortSettings(settings) {
    this.vrComfort.setSettings(settings);
  }
  
  getComfortSettings() {
    return this.vrComfort.getSettings();
  }
  
  setComfortPreset(preset) {
    this.vrComfort.setPreset(preset);
  }
  
  // Ensure comfort settings are properly applied during VR session
  ensureComfortSettingsApplied() {
    if (!this.isVRPresenting) return;
    
    const settings = this.vrComfort.getSettings();
    
    // Validate that teleportation system is ready if in teleport mode
    if (settings.locomotionMode === 'teleport') {
      if (!this.vrTeleport.teleportCurve || !this.vrTeleport.teleportMarker) {
        console.log('🔧 Teleportation system not ready, reinitializing...');
        this.vrTeleport.setupTeleportation();
      }
    }
    
    // Only log occasionally to avoid spam
    if (!this.lastComfortLog || Date.now() - this.lastComfortLog > 10000) { // Every 10 seconds
      console.log('🎮 VR comfort mode:', settings.locomotionMode === 'teleport' ? 'SAFETY/COMFORT' : 'EXPERIENCED');
      this.lastComfortLog = Date.now();
    }
  }
  
  // Apply VR positions (maintain original API)
  applyVRPositions(positions) {
    if (!this.isVRPresenting || !positions) return;
    
    try {
      if (positions.camera) {
        this.camera.position.copy(positions.camera.position);
        this.camera.quaternion.copy(positions.camera.quaternion);
      }
      
      if (positions.dolly) {
        this.camera.parent.position.copy(positions.dolly.position);
        this.camera.parent.quaternion.copy(positions.dolly.quaternion);
      }
    } catch (error) {
      console.warn('VR position application failed:', error);
    }
  }
  
  /**
   * Set the orbit controls reference for camera state preservation
   * @param {Object} controls - OrbitControls instance
   */
  setControls(controls) {
    this._preVRCameraState.controls = controls;
    console.debug('[VRManager] OrbitControls reference set for camera state preservation');
  }

  /**
   * Save current camera state before entering VR
   */
  _saveCameraState() {
    if (this._preVRCameraState.controls && this._preVRCameraState.controls.target && this.camera) {
      const controls = this._preVRCameraState.controls;
      
      // Save camera position and target
      this._preVRCameraState.target = controls.target.clone();
      this._preVRCameraState.position = this.camera.position.clone();
      this._preVRCameraState.zoom = this.camera.zoom;
      
      // Save all OrbitControls properties
      this._preVRCameraState.minDistance = controls.minDistance;
      this._preVRCameraState.maxDistance = controls.maxDistance;
      this._preVRCameraState.enableDamping = controls.enableDamping;
      this._preVRCameraState.dampingFactor = controls.dampingFactor;
      this._preVRCameraState.enableZoom = controls.enableZoom;
      this._preVRCameraState.enablePan = controls.enablePan;
      this._preVRCameraState.enableRotate = controls.enableRotate;
      this._preVRCameraState.autoRotate = controls.autoRotate;
      this._preVRCameraState.autoRotateSpeed = controls.autoRotateSpeed;
      
      console.debug('[VRManager] Saved complete pre-VR camera state:', {
        target: this._preVRCameraState.target.toArray(),
        position: this._preVRCameraState.position.toArray(),
        zoom: this._preVRCameraState.zoom,
        minDistance: this._preVRCameraState.minDistance,
        maxDistance: this._preVRCameraState.maxDistance,
        enableDamping: this._preVRCameraState.enableDamping
      });
    }
  }

  /**
   * Restore camera state after exiting VR
   */
  _restoreCameraState() {
    if (!this._preVRCameraState.controls || !this._preVRCameraState.target || !this._preVRCameraState.position) {
      console.debug('[VRManager] No saved camera state to restore');
      return;
    }
    
    const controls = this._preVRCameraState.controls;
    
    console.debug('[VRManager] Restoring complete camera state from pre-VR:', {
      target: this._preVRCameraState.target.toArray(),
      position: this._preVRCameraState.position.toArray(),
      zoom: this._preVRCameraState.zoom
    });
    
    // Restore camera properties
    this.camera.position.copy(this._preVRCameraState.position);
    this.camera.zoom = this._preVRCameraState.zoom || 1;
    this.camera.updateProjectionMatrix();
    
    // Restore OrbitControls properties
    controls.target.copy(this._preVRCameraState.target);
    controls.minDistance = this._preVRCameraState.minDistance;
    controls.maxDistance = this._preVRCameraState.maxDistance;
    controls.enableDamping = this._preVRCameraState.enableDamping;
    controls.dampingFactor = this._preVRCameraState.dampingFactor;
    controls.enableZoom = this._preVRCameraState.enableZoom;
    controls.enablePan = this._preVRCameraState.enablePan;
    controls.enableRotate = this._preVRCameraState.enableRotate;
    controls.autoRotate = this._preVRCameraState.autoRotate;
    controls.autoRotateSpeed = this._preVRCameraState.autoRotateSpeed;
    
    // Force controls update to apply all changes
    controls.update();
    
    console.debug('[VRManager] Camera state restoration complete');
  }
  
  // Get VR system status
  getVRStatus() {
    const coreStatus = this.vrCore.getVRStatus();
    const audioStatus = this.vrAudio.getAudioStatus();
    const movementState = this.vrLocomotion.getMovementState();
    const comfortSettings = this.vrComfort.getSettings();
    
    return {
      ...coreStatus,
      audio: audioStatus,
      movement: movementState,
      comfort: comfortSettings
    };
  }
  
  // Audio control methods
  setAudioMuted(muted) {
    this.vrAudio.setMuted(muted);
  }
  
  setAudioVolumeMultipliers(base, boost, ambience) {
    this.vrAudio.setVolumeMultipliers(base, boost, ambience);
  }
  
  // Teleportation methods
  resetTeleportState() {
    this.vrTeleport.resetTeleportState();
  }
  
  // Dispose of all VR systems
  dispose() {
    // Dispose all modules
    this.vrCore.dispose();
    this.vrControllers.dispose();
    this.vrTeleport.dispose();
    this.vrAudio.dispose();
    
    // Clear callbacks
    this.onModeToggle = null;
    this.onMovementStart = null;
    this.onMovementStop = null;
    this.onMovementUpdate = null;
    
    console.log('🧹 VR Manager disposed completely');
  }
  
  // Legacy method compatibility
  checkVRSupport() {
    return this.vrCore.checkVRSupported();
  }
  
  normalizeAngle(angle) {
    return this.vrLocomotion.normalizeAngle(angle);
  }
}
