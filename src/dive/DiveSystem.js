import * as THREE from 'three';
import { DiveParticles } from './DiveParticles.js';
import { DiveTorch } from './DiveTorch.js';
import { DiveLighting } from './DiveLighting.js';

export class DiveSystem {
  constructor(scene, renderer, camera) {
    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
    
    this.isDiveModeEnabled = false;
    this.currentVRMode = null;
    
    this.lighting = new DiveLighting(scene);
    this.particles = new DiveParticles(scene);
    this.torch = new DiveTorch(scene);
    
    this.isQuest2 = false;
    this.isQuest3 = false;
    this.detectQuestDevice();
    
    this.applyModeSettings();
    
  }
  
  /**
   * Toggle between dive and survey modes
   */
  toggleDiveMode() {
    const previousMode = this.isDiveModeEnabled;
    this.isDiveModeEnabled = !this.isDiveModeEnabled;
    
    const toggleSwitch = document.querySelector('.mode-toggle__switch');
    if (toggleSwitch) {
      toggleSwitch.checked = this.isDiveModeEnabled;
    }
    
    this.applyModeSettings();
    
  }
  
  setDiveMode(enabled) {
    if (this.isDiveModeEnabled !== enabled) {
      this.toggleDiveMode();
    }
  }
  
  isDiveMode() {
    return this.isDiveModeEnabled;
  }
  
  detectQuestDevice() {
    try {
      const userAgent = navigator.userAgent.toLowerCase();
      

      if (userAgent.includes('quest 2') || 
          userAgent.includes('oculus quest 2') ||
          (userAgent.includes('oculus') && userAgent.includes('android') && !userAgent.includes('quest 3'))) {
        this.isQuest2 = true;
        return 'quest2';
      }
      

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

      this.camera.far = 20;
      this.camera.updateProjectionMatrix();
      

      if (this.isDiveModeEnabled) {
        this.scene.fog = new THREE.FogExp2(0x041729, 0.084); // Enhanced visibility - denser fog for 20m visibility on Quest 2
      }
      
    } else {

      this.camera.far = 2000;
      this.camera.updateProjectionMatrix();
      

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
    

    if (this.currentVRMode === isVRMode) return;
    
    this.currentVRMode = isVRMode;
    

    if (!this.isDiveModeEnabled) {
      this.scene.fog = null;
      return; // Exit early - don't modify lighting in Survey mode
    }
    
    if (isVRMode) {

      this.scene.fog = new THREE.FogExp2(0x041729, 0.056); // Reduced from 0.08 for 30% more visibility (~20m visibility)

      this.lighting.setVRDiveMode();

      if (this.isDiveModeEnabled) {
        this.torch.enableTorch();
      }
    } else {

      this.scene.fog = new THREE.FogExp2(0x041729, 0.005); // Reduced from 0.0105 for 50% clearer visibility (~280m visibility)

      this.lighting.setDesktopDiveMode();

    }
    

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
    
    this.lighting.enableDiveMode();
    
    this.applyQuestOptimizations();
    
    this.particles.enable();
    
    this.torch.enableTorch();
    
  }
  
  /**
   * Disable dive mode (no fog + no particles) - Survey Mode
   */
  disableDiveMode() {
    
    this.scene.fog = null;
    
    this.particles.disable();
    
    this.torch.disableTorch();
    
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

      } else if (!this.isDiveModeEnabled) {

      }
      return;
    }
    

    if (vrManager.controller2) {
      this.updateTorchPosition(vrManager.controller2);
    } else if (vrManager.controllers && vrManager.controllers.length > 0) {

      const rightController = vrManager.controllers.find(c => 
        c.userData && c.userData.inputSource && c.userData.inputSource.handedness === 'right'
      );
      if (rightController) {
        this.updateTorchPosition(rightController);
      }
    }
  }

  /**
   * Update system (call in animation loop)
   */
  update(time, deltaTime) {

    this.particles.update(time);
    

    this.torch.update(deltaTime);
    

    if (this.renderer) {
      this.checkVRControllerButtons(this.renderer);
    }
    
    this.applyModeSpecificSettings();
  }
  
  initializeToggleSwitch() {
    const modeToggleSwitch = document.querySelector('.mode-toggle__switch');
    
    if (modeToggleSwitch) {
      modeToggleSwitch.checked = false;
      this.isDiveModeEnabled = false;
      
      this.disableDiveMode();
      
      modeToggleSwitch.addEventListener('change', () => {
        this.toggleDiveMode();
      });
      
    } else {

      this.disableDiveMode();
    }
    

    const toggleOptions = document.querySelectorAll('.toggle-option');
    
    
    toggleOptions.forEach((option) => {
      option.addEventListener('click', () => {
        const isRight = option.classList.contains('right'); // Right = Dive
        const currentlyDiveMode = modeToggleSwitch ? modeToggleSwitch.checked : false;
        
        

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


    for (let inputSource of session.inputSources) {
      if (inputSource.gamepad && inputSource.handedness) {
        const gamepad = inputSource.gamepad;
        const handedness = inputSource.handedness;
        

        let modeToggleButtons = [4, 5]; // X/A buttons or Y/B buttons
        
        modeToggleButtons.forEach(index => {
          if (gamepad.buttons[index]) {
            const button = gamepad.buttons[index];
            const buttonKey = `${handedness}-${index}`;
            

            if (!this.buttonStates) {
              this.buttonStates = new Map();
            }
            
            const wasPressed = this.buttonStates.get(buttonKey) || false;
            const isPressed = button.pressed;
            

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