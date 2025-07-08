/**
 * VRManager - Main VR Coordinator (Refactored)
 * 
 * This is the new slim VRManager that coordinates all VR modules.
 * Maintains exact functionality while providing clean modular architecture.
 */

import * as THREE from 'three';
import { VRCore } from './vr/core/VRCore.js';
import { VRControllers } from './vr/core/VRControllers.js';
import { VRTeleport } from './vr/locomotion/VRTeleport.js';
import { VRLocomotion } from './vr/locomotion/VRLocomotion.js';
import { VRComfort } from './vr/locomotion/VRComfort.js';
import { VRAudio } from './vr/audio/VRAudio.js';

export class VRManager {
  constructor(renderer, camera, scene) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    
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
    this.vrAudio.init().catch(error => {
      console.warn('🔇 Sound system initialization failed:', error);
    });
  }
  
  setupModuleConnections() {
    // Connect VR Core callbacks
    this.vrCore.onSessionStart = () => {
      this.isVRPresenting = true;
      this.vrAudio.initAudioOnInteraction();
    };
    
    this.vrCore.onSessionEnd = () => {
      this.isVRPresenting = false;
    };
    
    // Connect Controller callbacks
    this.vrControllers.onSelectStart = (handedness, controller, event) => {
      if (handedness === 'right') {
        this.startMovement('forward');
      } else if (handedness === 'left') {
        this.startMovement('boost');
      }
    };
    
    this.vrControllers.onSelectEnd = (handedness, controller, event) => {
      this.stopMovement();
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
    
    // Sync initial comfort settings
    this.vrLocomotion.setComfortSettings(this.vrComfort.getSettings());
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
    
    // Update movement system
    const controllers = this.vrControllers.getControllers();
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
