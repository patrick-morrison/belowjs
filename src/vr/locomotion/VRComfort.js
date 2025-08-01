/**
 * VRComfort - Comfort settings and presets management
 * 
 * Manages VR comfort settings including locomotion modes,
 * turning preferences, and motion sickness reduction features.
 */

export class VRComfort {
  constructor() {
    // VR Comfort Settings - Simplified
    this.settings = {
      locomotionMode: 'smooth', // 'smooth', 'teleport'
      turningMode: 'smooth',    // 'smooth', 'snap'
      snapTurnAngle: 30,        // degrees per snap
      reducedMotion: false,     // slower, gentler movements
      showTeleportArc: true,    // visual feedback for teleportation
      comfortSpeed: 0.5         // speed multiplier when reduced motion is on
    };
    
    // Comfort presets
    this.presets = {
      'max-comfort': {
        locomotionMode: 'teleport',
        turningMode: 'snap',
        snapTurnAngle: 30,
        reducedMotion: true,
        showTeleportArc: true,
        comfortSpeed: 0.3
      },
      'balanced': {
        locomotionMode: 'smooth',
        turningMode: 'smooth',
        reducedMotion: true,
        showTeleportArc: true,
        comfortSpeed: 0.7
      },
      'performance': {
        locomotionMode: 'smooth',
        turningMode: 'smooth',
        reducedMotion: false,
        showTeleportArc: false,
        comfortSpeed: 1.0
      }
    };
    
    // Callbacks
    this.onSettingsChange = null;
  }
  
  setSettings(newSettings) {
    // Apply comfort settings with validation
    const validModes = ['smooth', 'teleport'];
    const validTurningModes = ['smooth', 'snap'];
    
    let changed = false;
    
    if (newSettings.locomotionMode && validModes.includes(newSettings.locomotionMode)) {
      if (this.settings.locomotionMode !== newSettings.locomotionMode) {
        this.settings.locomotionMode = newSettings.locomotionMode;
        changed = true;
      }
    }
    
    if (newSettings.turningMode && validTurningModes.includes(newSettings.turningMode)) {
      if (this.settings.turningMode !== newSettings.turningMode) {
        this.settings.turningMode = newSettings.turningMode;
        changed = true;
      }
    }
    
    if (typeof newSettings.snapTurnAngle === 'number' && newSettings.snapTurnAngle > 0 && newSettings.snapTurnAngle <= 90) {
      if (this.settings.snapTurnAngle !== newSettings.snapTurnAngle) {
        this.settings.snapTurnAngle = newSettings.snapTurnAngle;
        changed = true;
      }
    }
    
    if (typeof newSettings.reducedMotion === 'boolean') {
      if (this.settings.reducedMotion !== newSettings.reducedMotion) {
        this.settings.reducedMotion = newSettings.reducedMotion;
        changed = true;
      }
    }
    
    if (typeof newSettings.showTeleportArc === 'boolean') {
      if (this.settings.showTeleportArc !== newSettings.showTeleportArc) {
        this.settings.showTeleportArc = newSettings.showTeleportArc;
        changed = true;
      }
    }
    
    if (typeof newSettings.comfortSpeed === 'number' && newSettings.comfortSpeed > 0 && newSettings.comfortSpeed <= 2.0) {
      if (this.settings.comfortSpeed !== newSettings.comfortSpeed) {
        this.settings.comfortSpeed = newSettings.comfortSpeed;
        changed = true;
      }
    }
    
    if (changed && this.onSettingsChange) {
      this.onSettingsChange(this.settings);
    }
    
    return changed;
  }
  
  getSettings() {
    return { ...this.settings };
  }
  
  setPreset(presetName) {
    if (this.presets[presetName]) {
      this.setSettings(this.presets[presetName]);
      return true;
    } else {
      console.warn(`Unknown comfort preset: ${presetName}`);
      return false;
    }
  }
  
  getPresets() {
    return Object.keys(this.presets);
  }
  
  getPreset(presetName) {
    return this.presets[presetName] ? { ...this.presets[presetName] } : null;
  }
  
  addCustomPreset(name, settings) {
    // Validate settings before adding
    const validSettings = {};
    
    if (settings.locomotionMode && ['smooth', 'teleport'].includes(settings.locomotionMode)) {
      validSettings.locomotionMode = settings.locomotionMode;
    }
    
    if (settings.turningMode && ['smooth', 'snap'].includes(settings.turningMode)) {
      validSettings.turningMode = settings.turningMode;
    }
    
    if (typeof settings.snapTurnAngle === 'number' && settings.snapTurnAngle > 0 && settings.snapTurnAngle <= 90) {
      validSettings.snapTurnAngle = settings.snapTurnAngle;
    }
    
    if (typeof settings.reducedMotion === 'boolean') {
      validSettings.reducedMotion = settings.reducedMotion;
    }
    
    if (typeof settings.showTeleportArc === 'boolean') {
      validSettings.showTeleportArc = settings.showTeleportArc;
    }
    
    if (typeof settings.comfortSpeed === 'number' && settings.comfortSpeed > 0 && settings.comfortSpeed <= 2.0) {
      validSettings.comfortSpeed = settings.comfortSpeed;
    }
    
    if (Object.keys(validSettings).length > 0) {
      this.presets[name] = validSettings;
      console.log(`✅ Added custom comfort preset: ${name}`);
      return true;
    } else {
      console.warn('Invalid settings for custom preset');
      return false;
    }
  }
  
  toggleLocomotionMode() {
    const newMode = this.settings.locomotionMode === 'smooth' ? 'teleport' : 'smooth';
    return this.setSettings({ locomotionMode: newMode });
  }
  
  toggleTurningMode() {
    const newMode = this.settings.turningMode === 'smooth' ? 'snap' : 'smooth';
    return this.setSettings({ turningMode: newMode });
  }
  
  toggleReducedMotion() {
    return this.setSettings({ reducedMotion: !this.settings.reducedMotion });
  }
  
  getComfortLevel() {
    // Calculate overall comfort level based on settings (0-100)
    let comfortScore = 0;
    
    // Locomotion mode scoring
    if (this.settings.locomotionMode === 'teleport') comfortScore += 40;
    else if (this.settings.locomotionMode === 'smooth') comfortScore += 20;
    
    // Turning mode scoring
    if (this.settings.turningMode === 'snap') comfortScore += 30;
    else if (this.settings.turningMode === 'smooth') comfortScore += 15;
    
    // Motion reduction scoring
    if (this.settings.reducedMotion) comfortScore += 20;
    
    // Speed scoring
    if (this.settings.comfortSpeed <= 0.5) comfortScore += 10;
    else if (this.settings.comfortSpeed <= 0.8) comfortScore += 5;
    
    return Math.min(100, comfortScore);
  }
  
  getRecommendations() {
    const recommendations = [];
    
    if (this.settings.locomotionMode === 'smooth') {
      recommendations.push('Consider teleportation for maximum comfort');
    }
    
    if (this.settings.turningMode === 'smooth') {
      recommendations.push('Try snap turning to reduce motion sickness');
    }
    
    if (!this.settings.reducedMotion) {
      recommendations.push('Enable reduced motion for gentler movement');
    }
    
    if (this.settings.comfortSpeed > 0.8) {
      recommendations.push('Lower movement speed for increased comfort');
    }
    
    return recommendations;
  }
  
  exportSettings() {
    return JSON.stringify(this.settings, null, 2);
  }
  
  importSettings(jsonString) {
    try {
      const importedSettings = JSON.parse(jsonString);
      return this.setSettings(importedSettings);
    } catch (error) {
      console.error('Failed to import settings:', error);
      return false;
    }
  }
}
