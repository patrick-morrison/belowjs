/**
 * ARCore - AR Session management, device detection, and WebXR setup
 *
 * Handles core AR functionality including session management,
 * device detection, and WebXR AR initialization with passthrough.
 *
 * Sessions prefer the 'local-floor' reference space so the world origin is
 * anchored to the tracked floor/boundary rather than the headset's position
 * when the session started. 'local' re-centres whenever the headset is taken
 * off and put back on, and differs between headsets sharing the same room.
 */

export class ARCore {
  constructor(renderer, camera, scene, container = null) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.container = container || document.body;

    // AR support status
    this.isARSupported = false;
    this.isARPresenting = false;

    // Granted reference space ('local-floor' preferred, 'local' fallback)
    this.referenceSpaceType = null;
    this.enabledFeatures = [];
    this.currentSession = null;

    // Optional DOM overlay root (shown in-headset when dom-overlay is granted)
    this.overlayRoot = null;

    // Device detection
    this.isQuest2 = false;
    this.isQuest3 = false;

    // AR button reference
    this.arButton = null;

    // DOM observer for cleanup
    this.buttonObserver = null;

    // Callbacks
    this.onSessionStart = null;
    this.onSessionEnd = null;
    this.onSupportChecked = null;
  }

  setOverlayRoot(element) {
    this.overlayRoot = element;
  }

  init() {
    // Enable XR on renderer
    this.renderer.xr.enabled = true;

    // Remove any existing AR buttons
    this.removeExistingARButtons();

    // Create AR button when ready
    this.checkARSupported().then(() => {
      if (this.onSupportChecked) {
        this.onSupportChecked(this.isARSupported);
      }
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
          navigator.xr.isSessionSupported('immersive-ar')
            .then(supported => {
              this.isARSupported = supported;
              resolve();
            })
            .catch(() => {
              this.isARSupported = false;
              resolve();
            });
        } else {
          this.isARSupported = false;
          resolve();
        }
      } catch {
        this.isARSupported = false;
        resolve();
      }
    });
  }

  createARButton() {
    this.waitForARCSS().then(() => {
      this.arButton = document.createElement('button');
      this.arButton.addEventListener('click', () => this.toggleSession());
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
  }

  getOptionalFeatures() {
    // local-floor anchors the origin to the floor/boundary (persists across
    // doff/don and matches colocated headsets); anchors enable future
    // persistence; dom-overlay shows the status panel in-headset.
    const features = ['local-floor', 'anchors', 'hand-tracking'];
    if (this.overlayRoot) {
      features.push('dom-overlay');
    }
    return features;
  }

  buildSessionInit() {
    const sessionInit = {
      requiredFeatures: ['local'],
      optionalFeatures: this.getOptionalFeatures()
    };
    if (this.overlayRoot) {
      sessionInit.domOverlay = { root: this.overlayRoot };
    }
    return sessionInit;
  }

  async toggleSession() {
    if (this.currentSession) {
      this.currentSession.end();
      return;
    }

    try {
      const session = await navigator.xr.requestSession('immersive-ar', this.buildSessionInit());

      // Prefer floor-anchored space; probe before handing the session to
      // three.js (its WebXRManager has no fallback if the request rejects).
      let referenceSpaceType = 'local-floor';
      try {
        await session.requestReferenceSpace('local-floor');
      } catch {
        referenceSpaceType = 'local';
      }
      this.referenceSpaceType = referenceSpaceType;
      this.enabledFeatures = Array.isArray(session.enabledFeatures) ? Array.from(session.enabledFeatures) : [];

      this.renderer.xr.setReferenceSpaceType(referenceSpaceType);
      await this.renderer.xr.setSession(session);
      this.currentSession = session;

      session.addEventListener('end', () => {
        this.currentSession = null;
      });
    } catch (error) {
      console.warn('AR session request failed:', error);
    }
  }

  styleARButton() {
    const applyStyles = () => {
      const arBtn = document.querySelector('button.ar-button--glass') ||
        this.arButton;
      if (!arBtn) return false;

      arBtn.style.display = 'flex';
      arBtn.style.visibility = 'visible';
      arBtn.style.opacity = '1';
      arBtn.innerHTML = '<span class="ar-icon">👁️</span>ENTER AR';

      if (!arBtn.classList.contains('ar-button--glass')) {
        arBtn.classList.add('ar-button--glass');
      }

      arBtn.disabled = false;
      arBtn.classList.remove('ar-generic-disabled');

      return true;
    };

    if (!applyStyles()) {
      setTimeout(applyStyles, 100);
      setTimeout(applyStyles, 300);
      setTimeout(applyStyles, 500);
    }
  }

  setupSessionListeners() {
    this.renderer.xr.addEventListener('sessionstart', () => {
      this.isARPresenting = true;
      const deviceType = this.detectQuestDevice();
      this.applyQuestOptimizations(deviceType);

      if (this.arButton) {
        this.arButton.innerHTML = '<span class="ar-icon">👁️</span>EXIT AR';
      }

      if (this.onSessionStart) {
        this.onSessionStart();
      }
    });

    this.renderer.xr.addEventListener('sessionend', () => {
      this.isARPresenting = false;
      this.currentSession = null;
      this.referenceSpaceType = null;
      this.enabledFeatures = [];

      if (this.arButton) {
        this.arButton.innerHTML = '<span class="ar-icon">👁️</span>ENTER AR';
      }

      if (this.onSessionEnd) {
        this.onSessionEnd();
      }
    });
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
    } catch {
      return 'unknown';
    }
  }

  applyQuestOptimizations(deviceType) {
    if (deviceType === 'quest2' || deviceType === 'quest3') {
      this.camera.far = 2000;
      this.camera.updateProjectionMatrix();
    }
  }

  async waitForARCSS() {
    return new Promise((resolve) => {
      const checkCSS = () => {
        const testElement = document.createElement('div');
        testElement.className = 'ar-mode-active';
        testElement.style.display = 'none';
        this.container.appendChild(testElement);

        const computed = window.getComputedStyle(testElement);
        const hasARCSS = computed.getPropertyValue('--ar-css-loaded') === 'true' ||
          computed.opacity === '0.998';

        this.container.removeChild(testElement);

        if (hasARCSS) {
          resolve();
        } else {
          setTimeout(checkCSS, 50);
        }
      };

      setTimeout(checkCSS, 100);
    });
  }

  removeExistingARButtons() {
    const existingButtons = document.querySelectorAll('button.legacy-ar-button, a[href="#AR"]');
    existingButtons.forEach(button => {
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
    });
  }

  startARButtonMonitoring() {
    if (this.buttonObserver) return; // Already monitoring

    this.buttonObserver = new MutationObserver((mutations) => {
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
    this.buttonObserver.observe(document.body, { childList: true, subtree: true });
  }

  getARStatus() {
    return {
      supported: this.isARSupported,
      presenting: this.isARPresenting,
      referenceSpaceType: this.referenceSpaceType,
      enabledFeatures: this.enabledFeatures,
      isQuest2: this.isQuest2,
      isQuest3: this.isQuest3
    };
  }

  dispose() {
    if (this.buttonObserver) {
      this.buttonObserver.disconnect();
      this.buttonObserver = null;
    }

    if (this.arButton && this.arButton.parentNode) {
      this.arButton.parentNode.removeChild(this.arButton);
    }

    this.isQuest2 = false;
    this.isQuest3 = false;
    this.isARSupported = false;
    this.isARPresenting = false;
  }
}
