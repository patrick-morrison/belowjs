/**
 * VRAudio - Web Audio API system for VR
 * 
 * Handles the original Web Audio API sound system with perfect volume ratios
 * and underwater ambience for VR environments.
 */

export class VRAudio {
  constructor() {
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
    
    // Audio settings
    this.baseVolumeMultiplier = 1.52; // Original ratio for movement
    this.boostVolumeMultiplier = 1.01; // Original ratio for boost
    this.ambienceVolume = 0.1; // Ambient underwater sound level
  }
  
  // Initialize the VR sound system (optional feature) - EXACT ORIGINAL
  async init(soundBasePath = './sound/') {
    try {
      // Create audio context (original pattern)
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Load DPV sounds and ambience (original pattern)
      const [dpvBuffer, dpvHighBuffer, ambienceBuffer] = await Promise.all([
        this.loadAudioBuffer(soundBasePath + 'dpv.ogg'),
        this.loadAudioBuffer(soundBasePath + 'dpvhigh.ogg'),
        this.loadAudioBuffer(soundBasePath + 'vrambience.ogg')
      ]);
      
      // Store buffers (original pattern)
      this.dpvSound = dpvBuffer;
      this.dpvHighSound = dpvHighBuffer;
      this.ambienceSound = ambienceBuffer;
      
      // Start ambient sound immediately (original pattern)
      this.startAmbientSound();
      
      this.soundEnabled = true;
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
      this.ambienceGainNode.gain.setValueAtTime(this.ambienceVolume, this.audioContext.currentTime);
      
      ambienceSource.start();
      this.currentAmbienceSound = ambienceSource;
      
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
  updateAudioLevels(currentSpeed, currentBoostLevel) {
    if (!this.baseGainNode || !this.boostGainNode || !this.audioContext) return;
    
    try {
      // Base volume scales with movement speed (original ratio)
      const baseVolume = currentSpeed * this.baseVolumeMultiplier;
      
      // Boost volume scales with boost level (original ratio)
      const boostVolume = currentBoostLevel * this.boostVolumeMultiplier;
      
      // Smooth volume transitions (original)
      this.baseGainNode.gain.linearRampToValueAtTime(baseVolume, this.audioContext.currentTime + 0.1);
      this.boostGainNode.gain.linearRampToValueAtTime(boostVolume, this.audioContext.currentTime + 0.1);
      
    } catch (error) {
      console.warn('🔇 Error updating audio levels:', error);
    }
  }
  
  // Set audio volume multipliers
  setVolumeMultipliers(base, boost, ambience) {
    if (typeof base === 'number' && base >= 0) {
      this.baseVolumeMultiplier = base;
    }
    if (typeof boost === 'number' && boost >= 0) {
      this.boostVolumeMultiplier = boost;
    }
    if (typeof ambience === 'number' && ambience >= 0) {
      this.ambienceVolume = ambience;
      if (this.ambienceGainNode) {
        this.ambienceGainNode.gain.setValueAtTime(ambience, this.audioContext.currentTime);
      }
    }
  }
  
  // Get current audio status
  getAudioStatus() {
    return {
      enabled: this.soundEnabled,
      contextState: this.audioContext ? this.audioContext.state : 'none',
      ambiencePlaying: !!this.currentAmbienceSound,
      movementPlaying: !!this.currentMovementSound,
      boostPlaying: !!this.currentBoostSound
    };
  }
  
  // Mute/unmute audio
  setMuted(muted) {
    if (!this.audioContext) return;
    
    try {
      const targetVolume = muted ? 0 : 1;
      
      if (this.ambienceGainNode) {
        this.ambienceGainNode.gain.linearRampToValueAtTime(
          muted ? 0 : this.ambienceVolume, 
          this.audioContext.currentTime + 0.1
        );
      }
      
      if (this.baseGainNode) {
        this.baseGainNode.gain.linearRampToValueAtTime(
          targetVolume, 
          this.audioContext.currentTime + 0.1
        );
      }
      
      if (this.boostGainNode) {
        this.boostGainNode.gain.linearRampToValueAtTime(
          targetVolume, 
          this.audioContext.currentTime + 0.1
        );
      }
    } catch (error) {
      console.warn('🔇 Error setting mute state:', error);
    }
  }
  
  // Dispose of sound system (original pattern)
  dispose() {
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
  }
}
