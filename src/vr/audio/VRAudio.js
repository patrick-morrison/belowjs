/**
 * VRAudio - Web Audio API system for VR underwater environments
 */

export class VRAudio {
  constructor() {
    this.soundEnabled = false;
    this.audioContext = null;
    this._basePath = './sound/';
    this.dpvSound = null;
    this.dpvHighSound = null;
    this.ambienceSound = null;
    this.currentMovementSound = null;
    this.currentBoostSound = null;
    this.currentAmbienceSound = null;
    this.baseGainNode = null;
    this.boostGainNode = null;
    this.ambienceGainNode = null;
    
    this.baseVolumeMultiplier = 1.52;
    this.boostVolumeMultiplier = 1.01;
    this.ambienceVolume = 0.1;
  }
  
  async init(soundBasePath = './sound/') {
    try {
      this._basePath = soundBasePath || this._basePath;
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const [dpvBuffer, dpvHighBuffer, ambienceBuffer] = await Promise.all([
        this.loadAudioBuffer(this._basePath + 'dpv.ogg'),
        this.loadAudioBuffer(this._basePath + 'dpvhigh.ogg'),
        this.loadAudioBuffer(this._basePath + 'vrambience.ogg')
      ]);
      
      this.dpvSound = dpvBuffer;
      this.dpvHighSound = dpvHighBuffer;
      this.ambienceSound = ambienceBuffer;
      // Do not auto-start ambience here; VRManager will start/stop based on VR session state
      
      this.soundEnabled = true;
    } catch (error) {
      console.warn('🔇 VR Audio initialization failed:', error);
      this.soundEnabled = false;
    }
  }
  
  async loadAudioBuffer(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await this.audioContext.decodeAudioData(arrayBuffer);
  }
  
  initAudioOnInteraction(basePath) {
    // Call this in response to a user gesture (pointer/touch/key/VR button)
    try {
      if (!this.audioContext) {
        // Create and fully initialize on first user gesture
        return this.init(basePath || this._basePath);
      }
      if (this.audioContext.state === 'suspended') {
        return this.audioContext.resume();
      }
    } catch (e) {
      console.warn('🔇 Audio unlock failed:', e);
    }
  }

  async initImmediatelyForVR(basePath) {
    // Initialize audio immediately for VR (VR button click is user gesture)
    try {
      if (!this.audioContext) {
        await this.init(basePath || this._basePath);
      }
      if (this.audioContext && this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      return true;
    } catch (e) {
      console.warn('🔇 VR Audio immediate initialization failed:', e);
      return false;
    }
  }
  
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
  
  startMovementSound() {
    if (!this.audioContext || !this.dpvSound || !this.dpvHighSound) return;
    
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
      const baseSource = this.audioContext.createBufferSource();
      this.baseGainNode = this.audioContext.createGain();
      
      baseSource.buffer = this.dpvSound;
      baseSource.connect(this.baseGainNode);
      this.baseGainNode.connect(this.audioContext.destination);
      
      baseSource.loop = true;
      this.baseGainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      
      baseSource.start();
      this.currentMovementSound = baseSource;
      
      const boostSource = this.audioContext.createBufferSource();
      this.boostGainNode = this.audioContext.createGain();
      
      boostSource.buffer = this.dpvHighSound;
      boostSource.connect(this.boostGainNode);
      this.boostGainNode.connect(this.audioContext.destination);
      
      boostSource.loop = true;
      this.boostGainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      
      boostSource.start();
      this.currentBoostSound = boostSource;
      
    } catch (error) {
      console.warn('🔇 Error playing movement sound:', error);
    }
  }
  
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
  
  updateAudioLevels(currentSpeed, currentBoostLevel) {
    if (!this.baseGainNode || !this.boostGainNode || !this.audioContext) return;
    
    try {
      const baseVolume = currentSpeed * this.baseVolumeMultiplier;
      
      const boostVolume = currentBoostLevel * this.boostVolumeMultiplier;
      
      this.baseGainNode.gain.linearRampToValueAtTime(baseVolume, this.audioContext.currentTime + 0.1);
      this.boostGainNode.gain.linearRampToValueAtTime(boostVolume, this.audioContext.currentTime + 0.1);
      
    } catch (error) {
      console.warn('🔇 Error updating audio levels:', error);
    }
  }
  
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
  
  getAudioStatus() {
    return {
      enabled: this.soundEnabled,
      contextState: this.audioContext ? this.audioContext.state : 'none',
      ambiencePlaying: !!this.currentAmbienceSound,
      movementPlaying: !!this.currentMovementSound,
      boostPlaying: !!this.currentBoostSound
    };
  }
  
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
