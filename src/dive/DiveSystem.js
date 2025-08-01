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
    
  }
  
  /**
   * Toggle between dive and survey modes
   */
  toggleDiveMode() {
    const previousMode = this.isDiveModeEnabled;
    this.isDiveModeEnabled = !this.isDiveModeEnabled;
    
    
    // Update toggle switch UI if it exists
    const toggleSwitch = document.getElementById('modeToggleSwitch');
    if (toggleSwitch) {
      toggleSwitch.checked = this.isDiveModeEnabled;
    }
    
    // Apply the mode settings
    this.applyModeSettings();
    
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
        return 'quest2';
      }
      
      // Quest 3 detection patterns
      if (userAgent.includes('quest 3') || 
          userAgent.includes('oculus quest 3') ||
          userAgent.includes('meta quest 3')) {
        this.isQuest3 = true;
        return 'quest3';
      }
      
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
      
    } else {
      // Quest 3 or other devices - use full render distance
      this.camera.far = 2000;
      this.camera.updateProjectionMatrix();
      
      // Only update fog if dive mode is enabled
      if (this.isDiveModeEnabled) {
        this.scene.fog = new THREE.FogExp2(0x041729, 0.056); // Enhanced visibility for full render distance
      }
      
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
      return; // Exit early - don't modify lighting in Survey mode
    }
    
    if (isVRMode) {
      // VR Mode - keep original settings for dive mode with 30% more visibility
      this.scene.fog = new THREE.FogExp2(0x041729, 0.056); // Reduced from 0.08 for 30% more visibility (~20m visibility)
      // Keep dim ambient lighting for VR dive mode
      this.lighting.setVRDiveMode();
      // Ensure torch is enabled in VR dive mode
      if (this.isDiveModeEnabled) {
        this.torch.enableTorch();
      }
    } else {
      // Desktop Mode - enhanced visibility with lighter fog for dive mode
      this.scene.fog = new THREE.FogExp2(0x041729, 0.005); // Reduced from 0.0105 for 50% clearer visibility (~280m visibility)
      // Neutral lighting for desktop dive mode
      this.lighting.setDesktopDiveMode();
      // Torch may be handled differently on desktop
    }
    
    // Update particle material fog uniforms if they exist
    this.particles.updateFog(this.scene.fog);
  }
  
  /**
   * Apply all mode-specific settings
   */
  applyModeSettings() {
    
    if (this.isDiveModeEnabled) {
      this.enableDiveMode();
    } else {
      this.disableDiveMode();
    }
    
  }
  
  /**
   * Enable dive mode (fog + particles + torch)
   */
  enableDiveMode() {
    
    // Set lighting
    this.lighting.enableDiveMode();
    
    // Set fog
    this.applyQuestOptimizations();
    
    // Enable particles
    this.particles.enable();
    
    // Enable torch
    this.torch.enableTorch();
    
  }
  
  /**
   * Disable dive mode (no fog + no particles) - Survey Mode
   */
  disableDiveMode() {
    
    // Remove fog
    this.scene.fog = null;
    
    // Disable particles
    this.particles.disable();
    
    // Disable torch
    this.torch.disableTorch();
    
    // Set lighting
    this.lighting.enableSurveyMode();
    
  }
  
  /**
   * Update particle boundaries based on model
   */
  updateParticleBounds(model) {
    
    if (model) {
      this.particles.updateBounds(model);
    } else {
      console.warn('updateParticleBounds called with no model');
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
   * Update torch position using the right-hand VR controller (if present)
   * Call this in your animation loop for VR torch tracking.
   */
  updateTorchFromRightController() {
    if (!this.renderer.xr.isPresenting || !this.isDiveModeEnabled) return;
    
    const session = this.renderer.xr.getSession && this.renderer.xr.getSession();
    if (!session) return;
    
    const inputSources = session.inputSources;
    for (let i = 0; i < inputSources.length; i++) {
      if (inputSources[i].handedness === 'right') {
        const rightController = this.renderer.xr.getController(i);
        this.updateTorchPosition(rightController);
        break;
      }
    }
  }

  /**
   * Update torch position using VRManager (recommended approach)
   * This uses the VRManager's synced controller properties for consistency
   */
  updateTorchFromVRManager(vrManager) {
    if (!vrManager || !vrManager.isVRPresenting || !this.isDiveModeEnabled) {
      if (!vrManager) {
        console.warn('updateTorchFromVRManager: vrManager is null');
      } else if (!vrManager.isVRPresenting) {
        // This is normal when not in VR, don't spam console
      } else if (!this.isDiveModeEnabled) {
        // This is normal when not in dive mode, don't spam console
      }
      return;
    }
    
    // Use controller2 (right hand) for torch tracking
    if (vrManager.controller2) {
      this.updateTorchPosition(vrManager.controller2);
    } else if (vrManager.controllers && vrManager.controllers.length > 0) {
      // Fallback: find right-handed controller in controllers array
      const rightController = vrManager.controllers.find(c => 
        c.userData && c.userData.inputSource && c.userData.inputSource.handedness === 'right'
      );
      if (rightController) {
        this.updateTorchPosition(rightController);
      } else {
      }
    } else {
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
    
    // Check VR controller buttons for mode switching
    if (this.renderer) {
      this.checkVRControllerButtons(this.renderer);
    }
    
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
        this.toggleDiveMode();
      });
      
    } else {
      console.warn('Mode toggle switch not found in DOM');
      // Still apply initial mode settings even without UI
      this.disableDiveMode();
    }
    
    // Add click handlers for toggle options
    const toggleOptions = document.querySelectorAll('.toggle-option');
    
    
    toggleOptions.forEach((option) => {
      option.addEventListener('click', () => {
        const isRight = option.classList.contains('right'); // Right = Dive
        const currentlyDiveMode = modeToggleSwitch ? modeToggleSwitch.checked : false;
        
        
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
   * Check VR controller buttons for mode switching
   * This replaces the button checking logic that was in the example
   */
  checkVRControllerButtons(renderer) {
    if (!renderer || !renderer.xr) return;
    
    const session = renderer.xr.getSession();
    if (!session) return;

    // Get input sources (controllers)
    for (let inputSource of session.inputSources) {
      if (inputSource.gamepad && inputSource.handedness) {
        const gamepad = inputSource.gamepad;
        const handedness = inputSource.handedness;
        
        // Check for X button (left controller, button 4) or A button (right controller, button 4)
        let modeToggleButtons = [4, 5]; // X/A buttons or Y/B buttons
        
        modeToggleButtons.forEach(index => {
          if (gamepad.buttons[index]) {
            const button = gamepad.buttons[index];
            const buttonKey = `${handedness}-${index}`;
            
            // Initialize button states if not exists
            if (!this.buttonStates) {
              this.buttonStates = new Map();
            }
            
            const wasPressed = this.buttonStates.get(buttonKey) || false;
            const isPressed = button.pressed;
            
            // Detect button press (not held)
            if (isPressed && !wasPressed) {
              this.toggleDiveMode();
            }
            
            this.buttonStates.set(buttonKey, isPressed);
          }
        });
      }
    }
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