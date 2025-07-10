import * as THREE from 'three';
import { DiveParticles } from './DiveParticles.js';
import { DiveTorch } from './DiveTorch.js';
import { DiveLighting } from './DiveLighting.js';

/**
 * DiveSystem - Complete dive/survey mode system
 * Manages lighting, particles, fog, and torch for underwater diving simulation
 */
export class DiveSystem {
  constructor(scene, renderer, camera) {
    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
    
    // Core state
    this.isDiveModeEnabled = false;
    this.currentVRMode = null;
    
    // Component systems
    this.lighting = new DiveLighting(scene);
    this.particles = new DiveParticles(scene);
    this.torch = new DiveTorch(scene);
    
    // Device detection
    this.isQuest2 = false;
    this.isQuest3 = false;
    this.detectQuestDevice();
    
    // Initialize in survey mode
    this.applyModeSettings();
    
    console.log('🌊 DiveSystem initialized in Survey mode');
  }
  
  /**
   * Toggle between dive and survey modes
   */
  toggleDiveMode() {
    const previousMode = this.isDiveModeEnabled;
    this.isDiveModeEnabled = !this.isDiveModeEnabled;
    
    console.log(`🔄 Mode toggle: ${previousMode ? 'Dive' : 'Survey'} → ${this.isDiveModeEnabled ? 'Dive' : 'Survey'}`);
    
    // Update toggle switch UI if it exists
    const toggleSwitch = document.getElementById('modeToggleSwitch');
    if (toggleSwitch) {
      toggleSwitch.checked = this.isDiveModeEnabled;
      console.log('🔄 Toggle switch updated:', toggleSwitch.checked);
    }
    
    // Apply the mode settings
    this.applyModeSettings();
    
    console.log(`🔄 Mode changed to: ${this.isDiveModeEnabled ? 'Dive' : 'Survey'}`);
  }
  
  /**
   * Set dive mode directly
   */
  setDiveMode(enabled) {
    if (this.isDiveModeEnabled !== enabled) {
      this.toggleDiveMode();
    }
  }
  
  /**
   * Get current mode state
   */
  isDiveMode() {
    return this.isDiveModeEnabled;
  }
  
  /**
   * Detect Quest device type for optimization
   */
  detectQuestDevice() {
    try {
      const userAgent = navigator.userAgent.toLowerCase();
      
      // Quest 2 detection patterns
      if (userAgent.includes('quest 2') || 
          userAgent.includes('oculus quest 2') ||
          (userAgent.includes('oculus') && userAgent.includes('android') && !userAgent.includes('quest 3'))) {
        this.isQuest2 = true;
        console.log('🥽 Quest 2 detected - applying performance optimizations');
        return 'quest2';
      }
      
      // Quest 3 detection patterns
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
  
  /**
   * Apply Quest-specific optimizations
   */
  applyQuestOptimizations() {
    if (this.isQuest2) {
      // Limit render distance to 20m for Quest 2 performance
      this.camera.far = 20;
      this.camera.updateProjectionMatrix();
      
      // Only update fog if dive mode is enabled
      if (this.isDiveModeEnabled) {
        this.scene.fog = new THREE.FogExp2(0x041729, 0.084); // Enhanced visibility - denser fog for 20m visibility on Quest 2
      }
      
      console.log('📊 Quest 2 optimizations applied: 20m render limit, denser fog');
    } else {
      // Quest 3 or other devices - use full render distance
      this.camera.far = 2000;
      this.camera.updateProjectionMatrix();
      
      // Only update fog if dive mode is enabled
      if (this.isDiveModeEnabled) {
        this.scene.fog = new THREE.FogExp2(0x041729, 0.056); // Enhanced visibility for full render distance
      }
      
      console.log('📊 Full render distance maintained: 2000m range');
    }
  }
  
  /**
   * Apply mode-specific settings for VR vs Desktop
   */
  applyModeSpecificSettings() {
    const isVRMode = this.renderer.xr.isPresenting;
    
    // Only update if mode has changed
    if (this.currentVRMode === isVRMode) return;
    
    this.currentVRMode = isVRMode;
    
    // Only apply fog and lighting changes if dive mode is enabled
    if (!this.isDiveModeEnabled) {
      this.scene.fog = null;
      console.log('🌊 Dive mode disabled - no fog applied, Survey mode lighting preserved');
      return; // Exit early - don't modify lighting in Survey mode
    }
    
    if (isVRMode) {
      // VR Mode - keep original settings for dive mode with 30% more visibility
      this.scene.fog = new THREE.FogExp2(0x041729, 0.056); // Reduced from 0.08 for 30% more visibility (~20m visibility)
      
      // Keep dim ambient lighting for VR dive mode
      this.lighting.setVRDiveMode();
      
      console.log('🥽 VR dive mode: Enhanced fog visibility and dim lighting applied');
    } else {
      // Desktop Mode - enhanced visibility with lighter fog for dive mode
      this.scene.fog = new THREE.FogExp2(0x041729, 0.0105); // Reduced from 0.015 for 30% more visibility (~140m visibility)
      
      // Neutral lighting for desktop dive mode
      this.lighting.setDesktopDiveMode();
      
      console.log('🖥️ Desktop dive mode: Enhanced fog visibility and neutral lighting applied');
    }
    
    // Update particle material fog uniforms if they exist
    this.particles.updateFog(this.scene.fog);
  }
  
  /**
   * Apply all mode-specific settings
   */
  applyModeSettings() {
    console.log(`🎯 Applying ${this.isDiveModeEnabled ? 'Dive' : 'Survey'} mode settings...`);
    
    if (this.isDiveModeEnabled) {
      this.enableDiveMode();
    } else {
      this.disableDiveMode();
    }
    
    console.log(`✅ ${this.isDiveModeEnabled ? 'Dive' : 'Survey'} mode settings applied`);
  }
  
  /**
   * Enable dive mode (fog + particles + torch)
   */
  enableDiveMode() {
    console.log('🌊 Enabling dive mode');
    
    // Set lighting
    this.lighting.enableDiveMode();
    
    // Set fog
    this.applyQuestOptimizations();
    
    // Enable particles
    this.particles.enable();
    
    // Enable torch
    this.torch.enableTorch();
    
    console.log('🌊 Dive mode enabled');
  }
  
  /**
   * Disable dive mode (no fog + no particles) - Survey Mode
   */
  disableDiveMode() {
    console.log('📋 Enabling survey mode');
    
    // Remove fog
    this.scene.fog = null;
    
    // Disable particles
    this.particles.disable();
    
    // Disable torch
    this.torch.disableTorch();
    
    // Set lighting
    this.lighting.enableSurveyMode();
    
    console.log('📋 Survey mode enabled');
  }
  
  /**
   * Update particle boundaries based on model
   */
  updateParticleBounds(model) {
    console.log('🎯 DiveSystem.updateParticleBounds called with model:', model);
    
    if (model) {
      this.particles.updateBounds(model);
      console.log('🎯 Particle bounds updated successfully');
    } else {
      console.warn('🎯 updateParticleBounds called with no model');
    }
  }
  
  /**
   * Update torch position (for VR controllers)
   */
  updateTorchPosition(controller) {
    if (this.isDiveModeEnabled) {
      this.torch.updatePosition(controller);
    }
  }
  
  /**
   * Update system (call in animation loop)
   */
  update(time, deltaTime) {
    // Update particles with time (not deltaTime) for GPU shader uniforms
    this.particles.update(time);
    
    // Update torch with deltaTime for animation
    this.torch.update(deltaTime);
    
    // Check for VR mode changes
    this.applyModeSpecificSettings();
  }
  
  /**
   * Initialize UI toggle switch
   */
  initializeToggleSwitch() {
    const modeToggleSwitch = document.getElementById('modeToggleSwitch');
    
    if (modeToggleSwitch) {
      // Ensure toggle starts in Survey mode (unchecked)
      modeToggleSwitch.checked = false;
      this.isDiveModeEnabled = false;
      
      // Force initial survey mode settings
      this.disableDiveMode();
      
      modeToggleSwitch.addEventListener('change', () => {
        console.log('🔄 Toggle switch changed:', modeToggleSwitch.checked);
        this.toggleDiveMode();
      });
      
      console.log('📋 Mode toggle initialized: Survey mode (unchecked) is default');
    } else {
      console.warn('📋 Mode toggle switch not found in DOM');
      // Still apply initial mode settings even without UI
      this.disableDiveMode();
    }
    
    // Add click handlers for toggle options
    const toggleOptions = document.querySelectorAll('.toggle-option');
    
    console.log('📋 Found toggle options:', toggleOptions.length);
    
    toggleOptions.forEach((option) => {
      option.addEventListener('click', () => {
        const isRight = option.classList.contains('right'); // Right = Dive
        const currentlyDiveMode = modeToggleSwitch ? modeToggleSwitch.checked : false;
        
        console.log('📋 Toggle option clicked:', { isRight, currentlyDiveMode });
        
        // Only toggle if clicking on inactive option
        if ((isRight && !currentlyDiveMode) || (!isRight && currentlyDiveMode)) {
          this.toggleDiveMode();
        }
      });
    });
  }
  
  /**
   * Handle VR controller button presses for mode switching
   */
  handleControllerButton(controller, buttonIndex) {
    // X button (left controller, button 4) or A button (right controller, button 4)
    if (buttonIndex === 4) {
      this.toggleDiveMode();
      return true;
    }
    return false;
  }
  
  /**
   * Dispose of all resources
   */
  dispose() {
    this.lighting.dispose();
    this.particles.dispose();
    this.torch.dispose();
  }
}