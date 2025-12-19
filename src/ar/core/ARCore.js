/**
 * ARCore - AR Session management, device detection, and WebXR setup
 *
 * Handles core AR functionality including session management,
 * device detection, and WebXR AR initialization with passthrough.
 */

import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';

export class ARCore {
  constructor(renderer, camera, scene, container = null) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.container = container || document.body;

    // AR support status
    this.isARSupported = false;
    this.isARPresenting = false;

    // Device detection
    this.isQuest2 = false;
    this.isQuest3 = false;

    // AR button reference
    this.arButton = null;

    // Callbacks
    this.onSessionStart = null;
    this.onSessionEnd = null;
  }

  init() {
    // Enable XR on renderer
    this.renderer.xr.enabled = true;

    // Check AR support
    this.checkARSupported();

    // Remove any existing AR buttons
    this.removeExistingARButtons();

    // Create AR button when ready
    this.checkARSupported().then(() => {
      if (this.isARSupported) {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            this.createARButton();
          });
        } else {
          // DOM already ready
          this.createARButton();
        }
      }
    });

    // Setup session event listeners
    this.setupSessionListeners();

    // Monitor for legacy AR buttons
    if ('xr' in navigator) {
      // Check if AR is supported
      navigator.xr.isSessionSupported('immersive-ar')
        .then(supported => {
          if (!supported) {
            this.startARButtonMonitoring();
          }
        })
        .catch(() => {
          this.startARButtonMonitoring();
        });
    } else {
      this.startARButtonMonitoring();
    }
  }

  checkARSupported() {
    return new Promise((resolve) => {
      try {
        if ('xr' in navigator) {
          // Check for immersive-ar support
          navigator.xr.isSessionSupported('immersive-ar')
            .then(supported => {
              this.isARSupported = supported;
              resolve();
            })
            .catch(error => {
              console.warn('AR support check failed:', error);
              this.isARSupported = false;
              resolve();
            });
        } else {
          this.isARSupported = false;
          resolve();
        }
      } catch (error) {
        console.warn('AR support check error:', error);
        this.isARSupported = false;
        resolve();
      }
    });
  }

  createARButton() {
    try {
      // Wait for CSS to load
      this.waitForARCSS().then(() => {
        const sessionInit = {
          requiredFeatures: ['local'],
          optionalFeatures: this.getOptionalFeatures()
        };
        this.arButton = ARButton.createButton(this.renderer, sessionInit);
        this.arButton.innerHTML = '<span class="ar-icon">👁️</span>ENTER AR';
        this.arButton.className = 'ar-button--glass ar-button-available';
        this.arButton.disabled = false;
        this.arButton.style.cssText = `
          position: fixed !important;
          bottom: 140px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          z-index: 2147483647 !important;
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          pointer-events: auto !important;
          cursor: pointer !important;
        `;
        this.container.appendChild(this.arButton);
        this.styleARButton();
      });
    } catch (error) {
      console.error('❌ AR button creation failed:', error);
    }
  }

  getOptionalFeatures() {
    const features = ['hand-tracking'];

    // Don't add dom-overlay or passthrough - they cause warnings and aren't needed
    // Quest handles passthrough automatically for immersive-ar

    return features;
  }

  supportsPassthrough() {
    // Detect Quest 3 or devices with AR passthrough capability
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('quest 3') || userAgent.includes('meta quest 3');
  }

  styleARButton() {
    // Apply styling with retries in case of timing issues
    const applyStyles = () => {
      const arBtn = document.querySelector('button.ar-button--glass') ||
                   document.querySelector('button') ||
                   this.arButton;
      if (!arBtn) return false;

      // Force visibility
      arBtn.style.display = 'flex';
      arBtn.style.visibility = 'visible';
      arBtn.style.opacity = '1';

      // Set content
      arBtn.innerHTML = '<span class="ar-icon">👁️</span>ENTER AR';

      // Add glass class
      if (!arBtn.classList.contains('ar-button--glass')) {
        arBtn.classList.add('ar-button--glass');
      }

      // Enable button
      arBtn.disabled = false;
      arBtn.classList.remove('ar-generic-disabled');


      return true;
    };

    // Initial application
    if (!applyStyles()) {
      // Retry with delays
      setTimeout(applyStyles, 100);
      setTimeout(applyStyles, 300);
      setTimeout(applyStyles, 500);
    }
  }

  setupSessionListeners() {
    // Session start event
    this.renderer.xr.addEventListener('sessionstart', () => {
      this.isARPresenting = true;

      // Detect device and apply optimizations
      const deviceType = this.detectQuestDevice();
      this.applyQuestOptimizations(deviceType);

      if (this.onSessionStart) {
        this.onSessionStart();
      }
    });

    // Session end event
    this.renderer.xr.addEventListener('sessionend', () => {
      this.isARPresenting = false;

      if (this.onSessionEnd) {
        this.onSessionEnd();
      }
    });
  }

  detectQuestDevice() {
    // Detect Quest 2 or Quest 3 for AR
    try {
      const userAgent = navigator.userAgent.toLowerCase();

      // Quest 2 detection
      if (userAgent.includes('quest 2') ||
          userAgent.includes('oculus quest 2') ||
          (userAgent.includes('oculus') && userAgent.includes('android') && !userAgent.includes('quest 3'))) {
        this.isQuest2 = true;
        return 'quest2';
      }

      // Quest 3 detection
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
    // Apply device-specific optimizations
    if (deviceType === 'quest2') {
      // Quest 2: Large far plane for 1000m world cube and 100% scale models
      this.camera.far = 2000;
      this.camera.updateProjectionMatrix();
    } else if (deviceType === 'quest3') {
      // Quest 3: Large far plane for 1000m world cube and 100% scale models
      this.camera.far = 2000;
      this.camera.updateProjectionMatrix();
    }
  }

  async waitForARCSS() {
    // Wait for AR-specific CSS to load
    return new Promise((resolve) => {
      const checkCSS = () => {
        const testElement = document.createElement('div');
        testElement.className = 'ar-mode-active';
        testElement.style.display = 'none';
        this.container.appendChild(testElement);

        const computed = window.getComputedStyle(testElement);
        const hasARCSS = computed.getPropertyValue('--ar-css-loaded') === 'true' ||
                         computed.opacity === '0.998'; // AR CSS marker

        this.container.removeChild(testElement);

        if (hasARCSS) {
          resolve();
        } else {
          setTimeout(checkCSS, 50);
        }
      };

      // Start checking after brief delay
      setTimeout(checkCSS, 100);
    });
  }

  removeExistingARButtons() {
    // Remove any legacy AR buttons
    const existingButtons = document.querySelectorAll('button.legacy-ar-button, a[href="#AR"]');
    existingButtons.forEach(button => {
      try {
        if (button.parentNode) {
          button.parentNode.removeChild(button);
        }
      } catch (error) {
        console.warn('Failed to remove AR button:', error);
      }
    });
  }

  startARButtonMonitoring() {
    // Monitor DOM for legacy AR button additions
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const arButtons = node.querySelectorAll ?
              node.querySelectorAll('button.legacy-ar-button, a[href="#AR"]') : [];
            if (arButtons.length > 0 ||
                (node.tagName === 'BUTTON' && node.classList.contains('legacy-ar-button'))) {
              const buttonToHide = arButtons.length > 0 ? arButtons[0] : node;
              buttonToHide.style.display = 'none';
            }
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  getARStatus() {
    return {
      supported: this.isARSupported,
      presenting: this.isARPresenting,
      isQuest2: this.isQuest2,
      isQuest3: this.isQuest3
    };
  }

  dispose() {
    // Clean up AR button
    if (this.arButton && this.arButton.parentNode) {
      this.arButton.parentNode.removeChild(this.arButton);
    }

    // Reset state
    this.isQuest2 = false;
    this.isQuest3 = false;
    this.isARSupported = false;
    this.isARPresenting = false;
  }
}
