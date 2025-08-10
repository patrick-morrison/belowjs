/**
 * VRManager - Main VR Coordinator
 * 
 * Coordinates all VR modules including controllers, locomotion, comfort settings,
 * and audio systems. Provides a unified interface for VR functionality while
 * maintaining modular architecture for easy customization and extension.
 * 
 * @class VRManager
 * 
 * @param {THREE.WebGLRenderer} renderer - Three.js WebGL renderer with XR enabled
 * @param {THREE.PerspectiveCamera} camera - Three.js camera for VR dolly system
 * @param {THREE.Scene} scene - Three.js scene for VR objects
 * @param {string} [audioPath='./sound/'] - Path to VR audio files
 * @param {boolean} [enableAudio=false] - Enable VR audio system
 * 
 * @example
 * // Create VR manager with audio
 * const vrManager = new VRManager(renderer, camera, scene, './sounds/', true);
 * 
 * // Configure comfort settings
 * vrManager.setComfortSettings({
 *   enableComfort: true,
 *   comfortRadius: 0.3
 * });
 * 
 * @since 1.0.0
 */

import * as THREE from 'three';
import { VRCore } from '../vr/core/VRCore.js';
import { VRControllers } from '../vr/core/VRControllers.js';
import { VRTeleport } from '../vr/locomotion/VRTeleport.js';
import { VRLocomotion } from '../vr/locomotion/VRLocomotion.js';
import { VRAudio } from '../vr/audio/VRAudio.js';

export class VRManager {
  /**
   * Creates a new VRManager instance
   * 
   * @param {THREE.WebGLRenderer} renderer - Three.js WebGL renderer with XR enabled
   * @param {THREE.PerspectiveCamera} camera - Three.js camera for VR dolly system
   * @param {THREE.Scene} scene - Three.js scene for VR objects
   * @param {string} [audioPath='./sound/'] - Path to VR audio files
  * @param {boolean} [enableAudio=false] - Enable VR audio system
   */
  constructor(renderer, camera, scene, audioPath = './sound/', enableAudio = false, container = null) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.audioPath = audioPath;
    this.enableAudio = enableAudio;
    this.container = container;
    
  this.vrCore = new VRCore(renderer, camera, scene, container);
  this.vrControllers = new VRControllers(renderer, camera);
  this.vrTeleport = new VRTeleport(scene, camera);
  this.vrLocomotion = new VRLocomotion(camera, renderer);
  this.vrAudio = this.enableAudio ? new VRAudio() : null;
    
    this.isVRSupported = false;
    this.isVRPresenting = false;
    this.controller1 = null;
    this.controller2 = null;
    this.controllerGrip1 = null;
    this.controllerGrip2 = null;
    this.controllers = [];
    this.controllerGrips = [];
    

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
    

    this.lastComfortLog = 0;
    
    this.onModeToggle = null;
    this.onMovementStart = null;
    this.onMovementStop = null;
    this.onMovementUpdate = null;
    
    this.init();
  }
  
  init() {
    this.vrCore.init();
    this.vrControllers.init();
    this.vrTeleport.init();
    this.vrLocomotion.init();
    
    this.setupModuleConnections();
  // Audio is VR-only: no desktop gesture unlock listeners here
  }
  
  setupModuleConnections() {
    // VR session lifecycle
    this.vrCore.onSessionStart = () => {
      this._saveCameraState();
      this.isVRPresenting = true;
      if (this.vrAudio) {
        // VR button click counts as a user gesture; initialize/resume and start ambience
        this.vrAudio.initAudioOnInteraction(this.audioPath);
        this.vrAudio.startAmbientSound();
      }
    };

    this.vrCore.onSessionEnd = () => {
      this.isVRPresenting = false;
      if (this.vrAudio) {
        this.vrAudio.stopMovementSound();
        this.vrAudio.stopAmbientSound();
      }
      setTimeout(() => {
        this._restoreCameraState();
      }, 100);
    };

    // Controller events
    this.vrControllers.onSelectStart = (handedness, controller, event) => {
      // no-op for audio
    };

    this.vrControllers.onSelectEnd = (handedness, controller, event) => {
      // no-op for audio
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

    // Locomotion events -> audio
    this.vrLocomotion.onMovementStart = () => {
      if (this.vrAudio && this.isVRPresenting) {
        this.vrAudio.startMovementSound();
      }
      if (this.onMovementStart) {
        this.onMovementStart();
      }
    };

    this.vrLocomotion.onMovementStop = () => {
      if (this.vrAudio && this.isVRPresenting) {
        this.vrAudio.stopMovementSound();
      }
      if (this.onMovementStop) {
        this.onMovementStop();
      }
    };

    this.vrLocomotion.onMovementUpdate = (movementState) => {
      if (this.vrAudio && this.isVRPresenting) {
        this.vrAudio.updateAudioLevels(
          movementState.currentSpeed,
          movementState.currentBoostLevel
        );
      }
      if (this.onMovementUpdate) {
        this.onMovementUpdate(movementState);
      }
    };

    this.vrLocomotion.setTeleportSystem(this.vrTeleport);

    if (typeof this._comfortSettingsInitialized === 'undefined') {
      // Default comfort settings can be set here if needed
      this._comfortSettingsInitialized = true;
    }
  }
  

  startMovement(type = 'forward') {
    this.vrLocomotion.startMovement(type);
  }
  
  stopMovement() {
    this.vrLocomotion.stopMovement();
  }
  

  update(deltaTime) {
    this.vrControllers.checkControllerButtons();


    const controllers = {
      ...this.vrControllers.getControllers(),
      handsActive: this.vrControllers.handsActive,
      handStates: this.vrControllers.handStates,
      updateHandGestures: this.vrControllers.updateHandGestures ? this.vrControllers.updateHandGestures.bind(this.vrControllers) : undefined
    };
    this.vrLocomotion.updateMovement(deltaTime, controllers);
    
    this.syncLegacyProperties();


    this.ensureComfortSettingsApplied();


    this.vrLocomotion.correctDrift();
  }
  

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
  

  /**
   * Set VR comfort settings for motion sickness reduction
   * 
   * @method setComfortSettings
   * @param {Object} settings - Comfort configuration object
   * @param {boolean} [settings.enableComfort] - Enable comfort features
   * @param {number} [settings.comfortRadius] - Radius of comfort zone
   * @param {number} [settings.fadeDistance] - Distance for fade effect
   * @param {number} [settings.maxSpeed] - Maximum movement speed
   * @returns {void}
   * 
   * @example
   * // Configure comfort settings
   * vrManager.setComfortSettings({
   *   enableComfort: true,
   *   comfortRadius: 0.4,
   *   fadeDistance: 0.15,
   *   maxSpeed: 2.0
   * });
   * 
   * @since 1.0.0
   */
  setComfortSettings(settings) {
  this.vrLocomotion.setComfortSettings(settings);
  }
  
  /**
   * Get current VR comfort settings
   * 
   * @method getComfortSettings
   * @returns {Object} Current comfort settings object
   * 
   * @example
   * // Check current settings
   * const settings = vrManager.getComfortSettings();
   * // Comfort status: settings.enableComfort
   * 
   * @since 1.0.0
   */
  getComfortSettings() {
  return this.vrLocomotion.getComfortSettings();
  }
  
  /**
   * Apply a predefined comfort preset
   * 
   * @method setComfortPreset
   * @param {string} preset - Preset name ('conservative', 'moderate', 'advanced')
   * @returns {void}
   * 
   * @example
   * // Use conservative comfort settings for sensitive users
   * vrManager.setComfortPreset('conservative');
   * 
   * @since 1.0.0
   */
  setComfortPreset(preset) {
  this.vrLocomotion.setComfortPreset(preset);
  }
  

  ensureComfortSettingsApplied() {
    if (!this.isVRPresenting) return;
    const settings = this.vrLocomotion.getComfortSettings();
    if (settings.locomotionMode === 'teleport') {
      if (!this.vrTeleport.teleportCurve || !this.vrTeleport.teleportMarker) {
        this.vrTeleport.setupTeleportation();
      }
    }
    if (!this.lastComfortLog || Date.now() - this.lastComfortLog > 10000) {
      this.lastComfortLog = Date.now();
    }
  }
  

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
  }

  /**
   * Save current camera state before entering VR
   */
  _saveCameraState() {
    if (this._preVRCameraState.controls && this._preVRCameraState.controls.target && this.camera) {
      const controls = this._preVRCameraState.controls;
      
      this._preVRCameraState.target = controls.target.clone();
      this._preVRCameraState.position = this.camera.position.clone();
      this._preVRCameraState.zoom = this.camera.zoom;
      
      this._preVRCameraState.minDistance = controls.minDistance;
      this._preVRCameraState.maxDistance = controls.maxDistance;
      this._preVRCameraState.enableDamping = controls.enableDamping;
      this._preVRCameraState.dampingFactor = controls.dampingFactor;
      this._preVRCameraState.enableZoom = controls.enableZoom;
      this._preVRCameraState.enablePan = controls.enablePan;
      this._preVRCameraState.enableRotate = controls.enableRotate;
      this._preVRCameraState.autoRotate = controls.autoRotate;
      this._preVRCameraState.autoRotateSpeed = controls.autoRotateSpeed;
      
    }
  }

  /**
   * Restore camera state after exiting VR
   */
  _restoreCameraState() {
    if (!this._preVRCameraState.controls || !this._preVRCameraState.target || !this._preVRCameraState.position) {
      return;
    }
    
    const controls = this._preVRCameraState.controls;
    
    
    this.camera.position.copy(this._preVRCameraState.position);
    this.camera.zoom = this._preVRCameraState.zoom || 1;
    this.camera.updateProjectionMatrix();
    
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
    
    controls.update();
    
  }
  

  getVRStatus() {
    const coreStatus = this.vrCore.getVRStatus();
    const audioStatus = this.vrAudio ? this.vrAudio.getAudioStatus() : { enabled: false };
    const movementState = this.vrLocomotion.getMovementState();
    const comfortSettings = this.vrLocomotion.getComfortSettings();
    return {
      ...coreStatus,
      audio: audioStatus,
      movement: movementState,
      comfort: comfortSettings
    };
  }
  

  setAudioMuted(muted) {
    if (this.vrAudio) {
      this.vrAudio.setMuted(muted);
    }
  }
  
  setAudioVolumeMultipliers(base, boost, ambience) {
    if (this.vrAudio) {
      this.vrAudio.setVolumeMultipliers(base, boost, ambience);
    }
  }
  

  resetTeleportState() {
    this.vrTeleport.resetTeleportState();
  }
  

  /**
   * Clean up and dispose of all VR resources
   * 
   * Properly disposes of all VR modules, controllers, audio systems, and
   * clears event callbacks. Call this when done with VR functionality.
   * 
   * @method dispose
   * @returns {void}
   * 
   * @example
   * // Clean up VR system
   * vrManager.dispose();
   * 
   * @since 1.0.0
   */
  dispose() {
    this.vrCore.dispose();
    this.vrControllers.dispose();
    this.vrTeleport.dispose();
    if (this.vrAudio) {
      this.vrAudio.dispose();
    }
    
    this.onModeToggle = null;
    this.onMovementStart = null;
    this.onMovementStop = null;
    this.onMovementUpdate = null;
  }
  

  checkVRSupport() {
    return this.vrCore.checkVRSupported();
  }
  

  normalizeAngle(angle) {
    return this.vrLocomotion.normalizeAngle(angle);
  }
}
