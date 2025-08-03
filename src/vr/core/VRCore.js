/**
 * VRCore - Session management, device detection, and WebXR setup
 * 
 * Handles core VR functionality including session management,
 * device detection, and basic WebXR initialization.
 */

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

export class VRCore {
  constructor(renderer, camera, scene, container = null) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.container = container || document.body;
    
    // VR State
    this.isVRSupported = false;
    this.isVRPresenting = false;
    
    // Device detection (original pattern)
    this.isQuest2 = false;
    this.isQuest3 = false;
    
    // VR UI elements
    this.vrButton = null;
    
    // Session callbacks
    this.onSessionStart = null;
    this.onSessionEnd = null;
  }
  
  init() {
    // Enable WebXR (original pattern)
    this.renderer.xr.enabled = true;
    
    // Check VR support
    this.checkVRSupported();
    
    // Clean up any existing VR buttons first
    this.removeExistingVRButtons();
    
    // Create VR button only if WebXR is supported
    this.checkVRSupported().then(() => {
      if (this.isVRSupported) {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            this.createVRButton();
          });
        } else {
          // DOM is already loaded, create immediately
          this.createVRButton();
        }
      }
    });
    
    // Setup VR session listeners (original pattern)
    this.setupSessionListeners();
    
    // Only monitor VR buttons if VR is not supported
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
  }
  
  checkVRSupported() {
    return new Promise((resolve) => {
      try {
        if ('xr' in navigator) {
          navigator.xr.isSessionSupported('immersive-vr')
            .then(supported => {
              this.isVRSupported = supported;
              resolve();
            })
            .catch(error => {
              console.warn('VR support check failed:', error);
              this.isVRSupported = false;
              resolve();
            });
        } else {
          this.isVRSupported = false;
          resolve();
        }
      } catch (error) {
        console.warn('VR support check error:', error);
        this.isVRSupported = false;
        resolve();
      }
    });
  }
  
  createVRButton() {
    try {
      // Wait for VR CSS to load before creating button
      this.waitForVRCSS().then(() => {
        const sessionInit = {
          optionalFeatures: [
            'hand-tracking',
            'local-floor',
            'bounded-floor',
            'layers'
          ]
        };
        this.vrButton = VRButton.createButton(this.renderer, sessionInit);
        this.vrButton.innerHTML = `<span class="vr-icon">🥽</span>ENTER VR`;
        this.vrButton.className = 'vr-button-glass vr-button-available';
        this.vrButton.disabled = false;
        this.vrButton.style.cssText = `
          position: fixed !important;
          bottom: 80px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          z-index: 2147483647 !important;
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          pointer-events: auto !important;
          cursor: pointer !important;
        `;
        this.container.appendChild(this.vrButton);
        this.styleVRButton();
      });
    } catch (error) {
      console.error('❌ VR button creation failed:', error);
    }
  }
  
  styleVRButton() {
    // Apply modern glassmorphism styling with shimmer (original pattern)
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
      // VR Button styled
      
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
    // VR button updates handled by THREE.js VRButton automatically
  }
  
  setupSessionListeners() {
    // VR session start (original pattern)
    this.renderer.xr.addEventListener('sessionstart', () => {
      this.isVRPresenting = true;
      
      // Detect Quest device and apply optimizations (original)
      const deviceType = this.detectQuestDevice();
      this.applyQuestOptimizations(deviceType);
      
      if (this.onSessionStart) {
        this.onSessionStart();
      }
    });
    
    // VR session end (original pattern)
    this.renderer.xr.addEventListener('sessionend', () => {
      this.isVRPresenting = false;
      
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
        return 'quest2';
      }
      
      // Quest 3 detection patterns (original)
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
  
  applyQuestOptimizations(deviceType) {
    // Original Quest-specific optimizations
    if (deviceType === 'quest2') {
      // Limit render distance to 20m for Quest 2 performance (original)
      this.camera.far = 20;
      this.camera.updateProjectionMatrix();
    }
  }
  
  async waitForVRCSS() {
    // Wait for VR CSS to load (original pattern)
    return new Promise((resolve) => {
      const checkCSS = () => {
        const testElement = document.createElement('div');
        testElement.className = 'vr-mode-active';
        testElement.style.display = 'none';
        this.container.appendChild(testElement);
        
        const computed = window.getComputedStyle(testElement);
        const hasVRCSS = computed.getPropertyValue('--vr-css-loaded') === 'true' ||
                         computed.opacity === '0.999'; // Our CSS marker
        
        this.container.removeChild(testElement);
        
        if (hasVRCSS) {
          resolve();
        } else {
          setTimeout(checkCSS, 50);
        }
      };
      
      // Start checking after a short delay
      setTimeout(checkCSS, 100);
    });
  }
  
  removeExistingVRButtons() {
    // Remove only legacy VR buttons to prevent duplicates, but do NOT remove new VR button (less aggressive)
    const existingButtons = document.querySelectorAll('button.legacy-vr-button, a[href="#VR"]');
    existingButtons.forEach(button => {
      try {
        if (button.parentNode) {
          button.parentNode.removeChild(button);
        }
      } catch (error) {
        console.warn('Failed to remove VR button:', error);
      }
    });
  }
  
  startVRButtonMonitoring() {
    // Monitor for programmatically added VR buttons and handle them
    // Only hide legacy VR buttons, not the new VR button
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const vrButtons = node.querySelectorAll ? 
              node.querySelectorAll('button.legacy-vr-button, a[href="#VR"]') : [];
            if (vrButtons.length > 0 || 
                (node.tagName === 'BUTTON' && node.classList.contains('legacy-vr-button'))) {
              const buttonToHide = vrButtons.length > 0 ? vrButtons[0] : node;
              buttonToHide.style.display = 'none';
            }
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  getVRStatus() {
    return {
      supported: this.isVRSupported,
      presenting: this.isVRPresenting,
      isQuest2: this.isQuest2,
      isQuest3: this.isQuest3
    };
  }
  
  dispose() {
    // Clean up VR button
    if (this.vrButton && this.vrButton.parentNode) {
      this.vrButton.parentNode.removeChild(this.vrButton);
    }
    
    // Clear device flags
    this.isQuest2 = false;
    this.isQuest3 = false;
    this.isVRSupported = false;
    this.isVRPresenting = false;
  }
}
