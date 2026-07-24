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

    // DOM observer for cleanup
    this.buttonObserver = null;

    // Callbacks
    this.onSessionStart = null;
    this.onSessionEnd = null;
    this.onSessionPause = null;
    this.onSessionResume = null;
    this.activeSession = null;
    this.sessionVisibilityHandler = null;
    this.sessionInit = null;

    // Quest can occasionally leave an immersive session permanently hidden
    // after the proximity/Guardian lifecycle has returned to the browser. In
    // that state the WebGL context is healthy, but no XR frames or input
    // sources arrive. A short hidden-session watchdog replaces only that stale
    // session through Quest's user-safe offerSession flow.
    this.sessionRecoveryTimer = null;
    this.sessionRecoveryInFlight = false;
    this.sessionRecoveryDelayMs = 6000;
    this.isDisposed = false;
  }

  init() {
    // Enable XR on renderer
    this.renderer.xr.enabled = true;

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
      const sessionInit = {
        requiredFeatures: ['local'],
        optionalFeatures: this.getOptionalFeatures()
      };
      this.sessionInit = sessionInit;
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
  }

  getOptionalFeatures() {
    return ['hand-tracking'];
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
      this.clearSessionRecoveryTimer();
      this.sessionRecoveryInFlight = false;
      this.isARPresenting = true;
      this.activeSession = this.renderer.xr.getSession?.() || null;
      if (this.activeSession) {
        const session = this.activeSession;
        this.sessionVisibilityHandler = () => {
          this.handleSessionVisibilityChange(session);
        };
        session.addEventListener('visibilitychange', this.sessionVisibilityHandler);
      }
      const deviceType = this.detectQuestDevice();
      this.applyQuestOptimizations(deviceType);

      if (this.onSessionStart) {
        this.onSessionStart();
      }
    });

    this.renderer.xr.addEventListener('sessionend', () => {
      this.clearSessionRecoveryTimer();
      this.isARPresenting = false;
      if (this.activeSession && this.sessionVisibilityHandler) {
        this.activeSession.removeEventListener('visibilitychange', this.sessionVisibilityHandler);
      }
      this.activeSession = null;
      this.sessionVisibilityHandler = null;

      if (this.onSessionEnd) {
        this.onSessionEnd();
      }
    });
  }

  handleSessionVisibilityChange(session) {
    if (!session || session !== this.activeSession) return;

    if (session.visibilityState === 'visible') {
      this.clearSessionRecoveryTimer();
      this.isARPresenting = true;
      this.onSessionResume?.(session);
      return;
    }

    this.onSessionPause?.(session);
    if (session.visibilityState === 'hidden') {
      this.scheduleStalledSessionRecovery(session);
    }
  }

  clearSessionRecoveryTimer() {
    if (!this.sessionRecoveryTimer) return;
    clearTimeout(this.sessionRecoveryTimer);
    this.sessionRecoveryTimer = null;
  }

  scheduleStalledSessionRecovery(session) {
    this.clearSessionRecoveryTimer();
    if (!session || session !== this.activeSession) return;
    if (!this.isQuest2 && !this.isQuest3) return;
    if (typeof navigator?.xr?.offerSession !== 'function') return;

    this.sessionRecoveryTimer = setTimeout(() => {
      this.sessionRecoveryTimer = null;
      if (this.isDisposed || session !== this.activeSession) return;
      if (session.visibilityState !== 'hidden') return;
      this.recoverStalledSession(session);
    }, this.sessionRecoveryDelayMs);
  }

  async recoverStalledSession(session) {
    if (this.sessionRecoveryInFlight || this.isDisposed) return false;
    if (!session || session !== this.activeSession) return false;
    if (session.visibilityState !== 'hidden') return false;
    if (typeof navigator?.xr?.offerSession !== 'function') return false;

    this.sessionRecoveryInFlight = true;
    try {
      await session.end();
      if (this.isDisposed) return false;

      const sessionInit = this.sessionInit || {
        requiredFeatures: ['local'],
        optionalFeatures: this.getOptionalFeatures()
      };
      const replacement = await navigator.xr.offerSession('immersive-ar', sessionInit);
      if (!replacement || this.isDisposed) {
        await replacement?.end?.();
        return false;
      }

      await this.renderer.xr.setSession(replacement);
      return true;
    } catch (error) {
      console.warn('Unable to recover stalled AR session', error);
      return false;
    } finally {
      this.sessionRecoveryInFlight = false;
    }
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
      isQuest2: this.isQuest2,
      isQuest3: this.isQuest3
    };
  }

  dispose() {
    this.isDisposed = true;
    this.clearSessionRecoveryTimer();
    if (this.activeSession && this.sessionVisibilityHandler) {
      this.activeSession.removeEventListener('visibilitychange', this.sessionVisibilityHandler);
    }
    this.activeSession = null;
    this.sessionVisibilityHandler = null;
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
