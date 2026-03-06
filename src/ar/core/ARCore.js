/**
 * ARCore - AR Session management, device detection, and WebXR setup
 *
 * Handles core AR functionality including session management,
 * device detection, and WebXR AR initialization with passthrough.
 */

import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { USDZExporter } from 'three/examples/jsm/exporters/USDZExporter.js';

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
    this.quickLookButton = null;
    this.quickLookImage = null;

    // DOM observer for cleanup
    this.buttonObserver = null;

    // Callbacks
    this.onSessionStart = null;
    this.onSessionEnd = null;

    // Quick Look fallback state
    this.quickLookModel = null;
    this.quickLookExporter = null;
    this.quickLookBlobUrl = null;
    this.quickLookPreparePromise = null;
    this.quickLookExportToken = 0;
    this.quickLookInitialized = false;
    this.quickLookPendingOpen = false;
    this.arSupportCheck = null;
    this.quickLookBlitGeometry = null;
    this.quickLookBlitMaterial = null;
    this.quickLookBlitMesh = null;
    this.quickLookBlitScene = null;
    this.quickLookBlitCamera = null;
    this.quickLookTransientTextures = new Set();
    this.renderControl = {
      pause: () => { },
      resume: () => { },
      restore: () => { }
    };
  }

  getARButtonMarkup() {
    const label = this.isHandheldDevice() ? 'AR MODE' : 'ENTER AR';
    return `<span class="ar-icon">👁️</span>${label}`;
  }

  isHandheldDevice() {
    try {
      const userAgent = navigator.userAgent || '';
      const hasTouch = navigator.maxTouchPoints > 0;
      return /android|iphone|ipad|ipod|mobile/i.test(userAgent) || hasTouch;
    } catch {
      return false;
    }
  }

  init() {
    // Enable XR on renderer
    this.renderer.xr.enabled = true;

    // Remove any existing AR buttons
    this.removeExistingARButtons();

    // Create AR button when ready
    this.arSupportCheck = this.checkARSupported().then(() => {
      if (this.isARSupported) {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            this.createARButton();
          });
        } else {
          // DOM already ready
          this.createARButton();
        }
      } else if (this.isIOSQuickLookDevice()) {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            this.mountQuickLookButton();
          });
        } else {
          this.mountQuickLookButton();
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

  isIOSQuickLookDevice() {
    try {
      const userAgent = navigator.userAgent || '';
      return /iPad|iPhone|iPod/.test(userAgent)
        || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    } catch {
      return false;
    }
  }

  getQuickLookMarkup(label = 'Open in AR') {
    return `
      <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" alt="" aria-hidden="true">
      <span class="quick-look-button__label">${label}</span>
    `;
  }

  setQuickLookButtonState(state, label, href = '#') {
    if (!this.quickLookButton) return;

    this.quickLookButton.classList.add('is-visible');
    this.quickLookButton.classList.toggle('is-loading', state === 'loading');
    this.quickLookButton.classList.toggle('is-disabled', state === 'disabled');
    this.quickLookButton.href = href;
    const labelElement = this.quickLookButton.querySelector('.quick-look-button__label');
    if (labelElement) {
      labelElement.textContent = label;
    }
    this.quickLookButton.setAttribute('aria-disabled', state === 'disabled' ? 'true' : 'false');
  }

  revokeQuickLookUrl() {
    if (this.quickLookBlobUrl) {
      URL.revokeObjectURL(this.quickLookBlobUrl);
      this.quickLookBlobUrl = null;
    }
  }

  setRenderControl(renderControl = {}) {
    this.renderControl = {
      pause: typeof renderControl.pause === 'function' ? renderControl.pause : () => { },
      resume: typeof renderControl.resume === 'function' ? renderControl.resume : () => { },
      restore: typeof renderControl.restore === 'function' ? renderControl.restore : () => { }
    };
  }

  getQuickLookTextureTargetSize(texture) {
    const sourceWidth = texture?.image?.width || 1;
    const sourceHeight = texture?.image?.height || 1;
    const rendererLimit = this.renderer?.capabilities?.maxTextureSize || Infinity;
    const maxDimension = Math.min(rendererLimit, this.isIOSQuickLookDevice() ? 4096 : 8192);
    const maxArea = this.isIOSQuickLookDevice() ? 16777216 : 67108864;
    const area = Math.max(1, sourceWidth * sourceHeight);
    const dimensionScale = Math.min(1, maxDimension / Math.max(sourceWidth, sourceHeight));
    const areaScale = Math.min(1, Math.sqrt(maxArea / area));
    const scale = Math.min(dimensionScale, areaScale);

    return {
      width: Math.max(1, Math.floor(sourceWidth * scale)),
      height: Math.max(1, Math.floor(sourceHeight * scale))
    };
  }

  ensureQuickLookBlitResources(texture) {
    if (!this.quickLookBlitGeometry) {
      this.quickLookBlitGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    }

    if (!this.quickLookBlitMaterial) {
      this.quickLookBlitMaterial = new THREE.ShaderMaterial({
        uniforms: {
          blitTexture: new THREE.Uniform(texture)
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 0.999999);
          }
        `,
        fragmentShader: `
          uniform sampler2D blitTexture;
          varying vec2 vUv;

          void main() {
            #ifdef IS_SRGB
              gl_FragColor = sRGBTransferOETF(texture2D(blitTexture, vUv));
            #else
              gl_FragColor = texture2D(blitTexture, vUv);
            #endif
          }
        `
      });
    }

    this.quickLookBlitMaterial.uniforms.blitTexture.value = texture;
    this.quickLookBlitMaterial.defines = this.quickLookBlitMaterial.defines || {};
    if (texture.colorSpace === THREE.SRGBColorSpace) {
      this.quickLookBlitMaterial.defines.IS_SRGB = '';
    } else {
      delete this.quickLookBlitMaterial.defines.IS_SRGB;
    }
    this.quickLookBlitMaterial.needsUpdate = true;

    if (!this.quickLookBlitMesh) {
      this.quickLookBlitMesh = new THREE.Mesh(this.quickLookBlitGeometry, this.quickLookBlitMaterial);
      this.quickLookBlitMesh.frustumCulled = false;
    }

    if (!this.quickLookBlitScene) {
      this.quickLookBlitScene = new THREE.Scene();
      this.quickLookBlitScene.add(this.quickLookBlitMesh);
    }

    if (!this.quickLookBlitCamera) {
      this.quickLookBlitCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    }
  }

  async yieldQuickLookWork() {
    await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  cleanupQuickLookTransientTextures() {
    this.quickLookTransientTextures.forEach((texture) => {
      const image = texture?.image;
      texture.dispose?.();

      if (image && typeof image === 'object' && 'width' in image && 'height' in image) {
        image.width = 0;
        image.height = 0;
      }
    });
    this.quickLookTransientTextures.clear();
  }

  textureUsesExactQuickLookTransform(texture) {
    if (!texture) {
      return false;
    }

    const hasNonDefaultRepeat = texture.repeat && (texture.repeat.x !== 1 || texture.repeat.y !== 1);
    const hasNonDefaultOffset = texture.offset && (texture.offset.x !== 0 || texture.offset.y !== 0);
    const hasRotation = texture.rotation !== 0;
    const hasNonDefaultCenter = texture.center && (texture.center.x !== 0 || texture.center.y !== 0);
    const hasSecondaryUV = texture.channel > 0;
    const hasCustomMatrix = texture.matrixAutoUpdate === false && texture.matrix && texture.matrix.elements && (
      texture.matrix.elements[0] !== 1 ||
      texture.matrix.elements[1] !== 0 ||
      texture.matrix.elements[2] !== 0 ||
      texture.matrix.elements[3] !== 0 ||
      texture.matrix.elements[4] !== 0 ||
      texture.matrix.elements[5] !== 1 ||
      texture.matrix.elements[6] !== 0 ||
      texture.matrix.elements[7] !== 0 ||
      texture.matrix.elements[8] !== 0 ||
      texture.matrix.elements[9] !== 0 ||
      texture.matrix.elements[10] !== 1 ||
      texture.matrix.elements[11] !== 0 ||
      texture.matrix.elements[12] !== 0 ||
      texture.matrix.elements[13] !== 0 ||
      texture.matrix.elements[14] !== 0 ||
      texture.matrix.elements[15] !== 1
    );

    return hasNonDefaultRepeat
      || hasNonDefaultOffset
      || hasRotation
      || hasNonDefaultCenter
      || hasSecondaryUV
      || hasCustomMatrix;
  }

  shouldUseQuickLookCompatibilityWorkaround(root) {
    let useWorkaround = true;

    root?.traverse?.((object) => {
      if (!useWorkaround) {
        return;
      }

      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.filter(Boolean).forEach((material) => {
        if (!useWorkaround) {
          return;
        }

        Object.values(material).forEach((value) => {
          if (value?.isTexture && this.textureUsesExactQuickLookTransform(value)) {
            useWorkaround = false;
          }
        });
      });
    });

    return useWorkaround;
  }

  async decompressTextureForQuickLook(texture) {
    if (!this.renderer) {
      throw new Error('Quick Look export requires an active renderer.');
    }

    this.ensureQuickLookBlitResources(texture);
    const { width, height } = this.getQuickLookTextureTargetSize(texture);

    const previousTarget = this.renderer.getRenderTarget();
    const previousAutoClear = this.renderer.autoClear;
    const previousViewport = new THREE.Vector4();
    const previousScissor = new THREE.Vector4();
    const previousScissorTest = this.renderer.getScissorTest();
    this.renderer.getViewport(previousViewport);
    this.renderer.getScissor(previousScissor);

    const renderTarget = new THREE.WebGLRenderTarget(width, height, {
      depthBuffer: false,
      stencilBuffer: false,
      generateMipmaps: false
    });

    try {
      await this.yieldQuickLookWork();

      this.renderer.autoClear = true;
      this.renderer.setRenderTarget(renderTarget);
      this.renderer.setViewport(0, 0, width, height);
      this.renderer.setScissor(0, 0, width, height);
      this.renderer.setScissorTest(false);
      this.renderer.clear();
      this.renderer.render(this.quickLookBlitScene, this.quickLookBlitCamera);

      const pixels = new Uint8Array(width * height * 4);
      this.renderer.readRenderTargetPixels(renderTarget, 0, 0, width, height, pixels);

      await this.yieldQuickLookWork();

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Quick Look export could not create a 2D canvas context.');
      }

      const flippedPixels = new Uint8ClampedArray(pixels.length);
      const rowLength = width * 4;

      for (let y = 0; y < height; y += 1) {
        const sourceOffset = y * rowLength;
        const targetOffset = (height - y - 1) * rowLength;
        flippedPixels.set(pixels.subarray(sourceOffset, sourceOffset + rowLength), targetOffset);
      }

      const imageData = context.createImageData(width, height);
      imageData.data.set(flippedPixels);
      context.putImageData(imageData, 0, 0);

      const readableTexture = new THREE.CanvasTexture(canvas);
      // The readback rows are already flipped into top-down canvas order.
      // Leaving flipY=false prevents USDZExporter from inverting the image again.
      readableTexture.flipY = false;
      readableTexture.minFilter = texture.minFilter;
      readableTexture.magFilter = texture.magFilter;
      readableTexture.wrapS = texture.wrapS;
      readableTexture.wrapT = texture.wrapT;
      readableTexture.colorSpace = texture.colorSpace;
      readableTexture.name = texture.name;
      readableTexture.needsUpdate = true;
      this.quickLookTransientTextures.add(readableTexture);

      return readableTexture;
    } finally {
      renderTarget.dispose();
      this.renderer.setRenderTarget(previousTarget);
      this.renderer.setViewport(previousViewport);
      this.renderer.setScissor(previousScissor);
      this.renderer.setScissorTest(previousScissorTest);
      this.renderer.autoClear = previousAutoClear;
    }
  }

  ensureQuickLookExporter() {
    if (this.quickLookExporter) {
      return this.quickLookExporter;
    }

    this.quickLookExporter = new USDZExporter();
    this.quickLookExporter.setTextureUtils({
      decompress: (texture) => this.decompressTextureForQuickLook(texture)
    });

    return this.quickLookExporter;
  }

  createQuickLookButton() {
    if (this.quickLookButton) {
      return this.quickLookButton;
    }

    const button = document.createElement('a');
    button.className = 'quick-look-button';
    button.rel = 'ar';
    button.href = '#';
    button.innerHTML = this.getQuickLookMarkup();
    button.addEventListener('click', async (event) => {
      if (button.classList.contains('is-disabled') || button.classList.contains('is-loading')) {
        event.preventDefault();
        return;
      }

      if (!this.quickLookModel) {
        event.preventDefault();
        this.quickLookPendingOpen = true;
        this.setQuickLookButtonState('loading', 'Loading model...');
        return;
      }

      if (this.quickLookBlobUrl) {
        return;
      }

      event.preventDefault();
      const quickLookUrl = await this.prepareQuickLookModel();
      if (quickLookUrl) {
        requestAnimationFrame(() => button.click());
      }
    });

    this.container.appendChild(button);
    this.quickLookButton = button;
    return button;
  }

  mountQuickLookButton() {
    this.waitForARCSS().then(() => {
      this.createQuickLookButton();
      if (this.quickLookPendingOpen && !this.quickLookModel) {
        this.setQuickLookButtonState('loading', 'Loading model...');
      } else {
        this.setQuickLookButtonState('idle', 'Open in AR');
      }
    });
  }

  async initializeQuickLookIfNeeded() {
    if (this.quickLookInitialized) {
      return;
    }

    if (this.arSupportCheck) {
      await this.arSupportCheck;
    }

    this.quickLookInitialized = true;

    if (this.isARSupported || !this.isIOSQuickLookDevice()) {
      return;
    }

    this.mountQuickLookButton();
  }

  setQuickLookModel(model) {
    this.quickLookModel = model;
    this.quickLookExportToken += 1;
    this.quickLookPreparePromise = null;
    this.revokeQuickLookUrl();

    if (!model) {
      if (this.quickLookButton && !this.quickLookPendingOpen) {
        this.setQuickLookButtonState('idle', 'Open in AR');
      }
      return;
    }

    this.initializeQuickLookIfNeeded().then(() => {
      if (this.quickLookButton && !this.isARSupported && this.isIOSQuickLookDevice()) {
        if (this.quickLookPendingOpen) {
          this.prepareQuickLookModel().then((quickLookUrl) => {
            if (quickLookUrl && this.quickLookButton) {
              this.quickLookPendingOpen = false;
              requestAnimationFrame(() => this.quickLookButton.click());
            }
          });
        } else {
          this.setQuickLookButtonState('idle', 'Open in AR');
        }
      }
    });
  }

  async prepareQuickLookModel() {
    if (!this.quickLookModel) {
      return null;
    }

    if (this.quickLookBlobUrl) {
      return this.quickLookBlobUrl;
    }

    if (this.quickLookPreparePromise) {
      return this.quickLookPreparePromise;
    }

    const token = ++this.quickLookExportToken;
    this.revokeQuickLookUrl();
    this.setQuickLookButtonState('loading', 'Preparing AR...');

    this.quickLookPreparePromise = (async () => {
      let originalParent = null;
      let exportRoot = null;
      let usedWrapper = false;
      let originalScale = null;

      try {
        const exporter = this.ensureQuickLookExporter();
        this.renderControl.pause();
        originalParent = this.quickLookModel.parent;
        exportRoot = new THREE.Group();
        const useQuickLookCompatibilityWorkaround = this.shouldUseQuickLookCompatibilityWorkaround(this.quickLookModel);

        let arrayBuffer;
        if (originalParent) {
          usedWrapper = true;
          originalParent.remove(this.quickLookModel);
          exportRoot.scale.setScalar(0.1);
          exportRoot.add(this.quickLookModel);
          exportRoot.updateMatrixWorld(true);
          arrayBuffer = await exporter.parseAsync(exportRoot, {
            maxTextureSize: Infinity,
            quickLookCompatible: useQuickLookCompatibilityWorkaround
          });
        } else {
          originalScale = this.quickLookModel.scale.clone();
          this.quickLookModel.scale.multiplyScalar(0.1);
          this.quickLookModel.updateMatrixWorld(true);
          arrayBuffer = await exporter.parseAsync(this.quickLookModel, {
            maxTextureSize: Infinity,
            quickLookCompatible: useQuickLookCompatibilityWorkaround
          });
        }

        if (token !== this.quickLookExportToken) {
          return null;
        }

        const blob = new globalThis.Blob([arrayBuffer], { type: 'model/vnd.usdz+zip' });
        this.quickLookBlobUrl = URL.createObjectURL(blob);
        this.quickLookPendingOpen = false;
        this.setQuickLookButtonState('ready', 'Open in AR', this.quickLookBlobUrl);
        return this.quickLookBlobUrl;
      } catch (error) {
        if (token !== this.quickLookExportToken) {
          return null;
        }

        console.error('Failed to prepare Quick Look model:', error);
        this.quickLookPendingOpen = false;
        this.setQuickLookButtonState('idle', 'Try AR Again');
        return null;
      } finally {
        this.cleanupQuickLookTransientTextures();

        if (usedWrapper && exportRoot && originalParent && this.quickLookModel.parent === exportRoot) {
          exportRoot.remove(this.quickLookModel);
          originalParent.add(this.quickLookModel);
          this.quickLookModel.updateMatrixWorld(true);
        } else if (!usedWrapper && originalScale) {
          this.quickLookModel.scale.copy(originalScale);
          this.quickLookModel.updateMatrixWorld(true);
        }

        this.renderControl.restore();
        this.renderControl.resume();
        if (token === this.quickLookExportToken) {
          this.quickLookPreparePromise = null;
        }
      }
    })();

    return this.quickLookPreparePromise;
  }

  createARButton() {
    this.waitForARCSS().then(() => {
      const sessionInit = {
        requiredFeatures: ['local'],
        optionalFeatures: this.getOptionalFeatures()
      };
      this.arButton = ARButton.createButton(this.renderer, sessionInit);
      this.arButton.innerHTML = this.getARButtonMarkup();
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
      arBtn.innerHTML = this.getARButtonMarkup();

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

      if (this.onSessionStart) {
        this.onSessionStart();
      }
    });

    this.renderer.xr.addEventListener('sessionend', () => {
      this.isARPresenting = false;

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

    if (this.quickLookButton && this.quickLookButton.parentNode) {
      this.quickLookButton.parentNode.removeChild(this.quickLookButton);
    }

    this.revokeQuickLookUrl();
    this.cleanupQuickLookTransientTextures();

    this.isQuest2 = false;
    this.isQuest3 = false;
    this.isARSupported = false;
    this.isARPresenting = false;
  }
}
