/*
 * BelowJS - A modular 3D viewer library
 * Copyright (C) 2025 Patrick Morrison
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * @fileoverview <below-viewer> Web Component
 *
 * A custom HTML element for embedding 3D models with minimal configuration.
 * Similar to Google's <model-viewer>, this provides a drop-in solution for
 * displaying GLB/GLTF models with VR support, measurement tools, and more.
 *
 * @example
 * <!-- Basic usage -->
 * <below-viewer src="model.glb"></below-viewer>
 *
 * @example
 * <!-- Full featured -->
 * <below-viewer
 *   src="shipwreck.glb"
 *   name="Historic Shipwreck"
 *   credit="Maritime Museum"
 *   background="#041729"
 *   vr
 *   measurement
 *   dive
 *   fullscreen
 *   screenshot
 * ></below-viewer>
 *
 * @since 1.5.0
 */

import { ModelViewer } from '../viewers/ModelViewer.js';

/**
 * Observed attributes for the below-viewer element
 */
const OBSERVED_ATTRIBUTES = [
  // Model
  'src',
  'name',
  'credit',
  'alt',
  'poster',

  // Appearance
  'background',
  'theme',

  // Features (boolean)
  'vr',
  'ar',
  'measurement',
  'dive',
  'fullscreen',
  'screenshot',
  'auto-rotate',

  // Camera position
  'camera-x',
  'camera-y',
  'camera-z',

  // Camera target
  'target-x',
  'target-y',
  'target-z',

  // VR position
  'vr-x',
  'vr-y',
  'vr-z'
];

/**
 * BelowViewerElement - Custom HTML element for 3D model viewing
 *
 * @class BelowViewerElement
 * @extends HTMLElement
 *
 * @fires load - Fired when model loads successfully
 * @fires error - Fired when model loading fails
 * @fires progress - Fired during model loading with progress info
 *
 * @example
 * const viewer = document.querySelector('below-viewer');
 * viewer.addEventListener('load', (e) => console.log('Model loaded!', e.detail));
 */
export class BelowViewerElement extends HTMLElement {
  /**
   * List of attributes to observe for changes
   */
  static get observedAttributes() {
    return OBSERVED_ATTRIBUTES;
  }

  constructor() {
    super();

    /** @type {ModelViewer|null} */
    this.viewer = null;

    /** @type {boolean} */
    this._initialized = false;

    /** @type {boolean} */
    this._modelLoaded = false;

    /** @type {HTMLDivElement|null} */
    this._container = null;

    /** @type {HTMLDivElement|null} */
    this._poster = null;
  }

  /**
   * Called when element is added to the DOM
   */
  connectedCallback() {
    if (!this._initialized) {
      this._initialize();
    }
  }

  /**
   * Called when element is removed from the DOM
   */
  disconnectedCallback() {
    this._dispose();
  }

  /**
   * Called when an observed attribute changes
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    // Handle src changes specially - reload model
    if (name === 'src' && this._initialized && newValue) {
      this._loadModel();
    }

    // Handle poster changes
    if (name === 'poster' && newValue) {
      this._updatePoster(newValue);
    }

    // Handle alt text changes
    if (name === 'alt') {
      this._updateAltText(newValue);
    }

    // Handle background changes
    if (name === 'background' && this.viewer && this.viewer.belowViewer) {
      const scene = this.viewer.belowViewer.sceneManager;
      if (scene && scene.setBackground) {
        scene.setBackground({ type: 'color', value: newValue });
      }
    }
  }

  /**
   * Initialize the viewer
   * @private
   */
  _initialize() {
    if (this._initialized) return;
    this._initialized = true;

    // Apply base styles to host element
    this._applyHostStyles();

    // Create container
    this._container = document.createElement('div');
    this._container.className = 'below-viewer-inner';
    this._container.style.width = '100%';
    this._container.style.height = '100%';
    this._container.style.position = 'relative';
    this.appendChild(this._container);

    // Create poster element
    this._poster = document.createElement('div');
    this._poster.className = 'below-viewer-poster';
    this._poster.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 10;
      pointer-events: none;
    `;
    this.appendChild(this._poster);

    // Parse configuration from attributes
    const config = this._getConfig();

    // Create the ModelViewer
    this.viewer = new ModelViewer(this._container, config);

    // Forward events from ModelViewer to custom element
    this._setupEventForwarding();

    // Load model if src is specified
    const src = this.getAttribute('src');
    if (src) {
      this._loadModel();
    }

    // Show poster if specified
    const poster = this.getAttribute('poster');
    if (poster) {
      this._updatePoster(poster);
    }
  }

  /**
   * Apply styles to the host element
   * @private
   */
  _applyHostStyles() {
    // Set default display and sizing
    if (!this.style.display || this.style.display === 'inline') {
      this.style.display = 'block';
    }
    if (!this.style.width) {
      this.style.width = '100%';
    }
    if (!this.style.height) {
      this.style.height = '400px';
    }
    if (!this.style.minHeight) {
      this.style.minHeight = '200px';
    }
    this.style.position = 'relative';
    this.style.overflow = 'hidden';

    // Set background from attribute or default
    const bg = this.getAttribute('background') || '#041729';
    if (!this.style.backgroundColor) {
      this.style.backgroundColor = bg;
    }
  }

  /**
   * Parse attributes into ModelViewer configuration
   * @private
   * @returns {Object} Configuration object
   */
  _getConfig() {
    const src = this.getAttribute('src');
    const name = this.getAttribute('name') || 'Model';
    const credit = this.getAttribute('credit') || '';

    // Build models config if src is provided
    const models = src ? {
      'default': {
        url: src,
        name: name,
        credit: credit,
        initialPositions: this._getInitialPositions()
      }
    } : {};

    // Parse feature flags (presence = true)
    const hasVR = this.hasAttribute('vr');
    const hasAR = this.hasAttribute('ar');
    const hasMeasurement = this.hasAttribute('measurement');
    const hasDive = this.hasAttribute('dive');
    const hasFullscreen = this.hasAttribute('fullscreen');
    const hasScreenshot = this.hasAttribute('screenshot');
    const showLoadingIndicator = !this.hasAttribute('no-loading');

    // Parse theme
    const theme = this.getAttribute('theme') || 'dark';

    // Parse background color
    const background = this.getAttribute('background') || '#041729';

    return {
      models,
      autoLoadFirst: false, // We handle loading manually
      showLoadingIndicator,
      showStatus: false,
      showInfo: false,
      enableVR: hasVR,
      enableAR: hasAR,
      enableMeasurement: hasMeasurement,
      measurementTheme: theme,
      enableDiveSystem: hasDive,
      showDiveToggle: hasDive,
      enableFullscreen: hasFullscreen,
      enableScreenshot: hasScreenshot,
      viewerConfig: {
        scene: {
          background: { type: 'color', value: background }
        }
      }
    };
  }

  /**
   * Get initial camera/VR positions from attributes
   * @private
   * @returns {Object|null} Initial positions object
   */
  _getInitialPositions() {
    const cameraX = parseFloat(this.getAttribute('camera-x'));
    const cameraY = parseFloat(this.getAttribute('camera-y'));
    const cameraZ = parseFloat(this.getAttribute('camera-z'));
    const targetX = parseFloat(this.getAttribute('target-x'));
    const targetY = parseFloat(this.getAttribute('target-y'));
    const targetZ = parseFloat(this.getAttribute('target-z'));
    const vrX = parseFloat(this.getAttribute('vr-x'));
    const vrY = parseFloat(this.getAttribute('vr-y'));
    const vrZ = parseFloat(this.getAttribute('vr-z'));

    const hasDesktopPosition = !isNaN(cameraX) || !isNaN(cameraY) || !isNaN(cameraZ);
    const hasDesktopTarget = !isNaN(targetX) || !isNaN(targetY) || !isNaN(targetZ);
    const hasVRPosition = !isNaN(vrX) || !isNaN(vrY) || !isNaN(vrZ);

    if (!hasDesktopPosition && !hasVRPosition) {
      return null;
    }

    const positions = {};

    if (hasDesktopPosition || hasDesktopTarget) {
      positions.desktop = {
        camera: {
          x: isNaN(cameraX) ? 0 : cameraX,
          y: isNaN(cameraY) ? 5 : cameraY,
          z: isNaN(cameraZ) ? 10 : cameraZ
        },
        target: {
          x: isNaN(targetX) ? 0 : targetX,
          y: isNaN(targetY) ? 0 : targetY,
          z: isNaN(targetZ) ? 0 : targetZ
        }
      };
    }

    if (hasVRPosition) {
      positions.vr = {
        dolly: {
          x: isNaN(vrX) ? 0 : vrX,
          y: isNaN(vrY) ? 2 : vrY,
          z: isNaN(vrZ) ? 10 : vrZ
        },
        rotation: { x: 0, y: 0, z: 0 }
      };
    }

    return positions;
  }

  /**
   * Load the model from src attribute
   * @private
   */
  async _loadModel() {
    if (!this.viewer) return;

    const src = this.getAttribute('src');
    if (!src) return;

    // Update the model config
    const name = this.getAttribute('name') || 'Model';
    const credit = this.getAttribute('credit') || '';

    this.viewer.config.models = {
      'default': {
        url: src,
        name: name,
        credit: credit,
        initialPositions: this._getInitialPositions()
      }
    };

    // Ensure dropdown is populated (if multiple models)
    this.viewer.populateDropdown();

    try {
      await this.viewer.loadModel('default');
      this._modelLoaded = true;
      this._hidePoster();
    } catch (error) {
      console.error('[below-viewer] Failed to load model:', error);
    }
  }

  /**
   * Set up event forwarding from ModelViewer to custom element events
   * @private
   */
  _setupEventForwarding() {
    if (!this.viewer) return;

    // Forward model-loaded as 'load' event
    this.viewer.on('model-loaded', (data) => {
      this.dispatchEvent(new CustomEvent('load', {
        detail: data,
        bubbles: true,
        composed: true
      }));
    });

    // Forward model-load-error as 'error' event
    this.viewer.on('model-load-error', (data) => {
      this.dispatchEvent(new CustomEvent('error', {
        detail: data,
        bubbles: true,
        composed: true
      }));
    });

    // Forward model-load-progress as 'progress' event
    this.viewer.on('model-load-progress', (data) => {
      this.dispatchEvent(new CustomEvent('progress', {
        detail: data,
        bubbles: true,
        composed: true
      }));
    });

    // Forward VR events
    this.viewer.on('vr-session-start', (data) => {
      this.dispatchEvent(new CustomEvent('vr-session-start', {
        detail: data,
        bubbles: true,
        composed: true
      }));
    });

    this.viewer.on('vr-session-end', (data) => {
      this.dispatchEvent(new CustomEvent('vr-session-end', {
        detail: data,
        bubbles: true,
        composed: true
      }));
    });

    // Forward focus event
    this.viewer.on('focus', (data) => {
      this.dispatchEvent(new CustomEvent('focus', {
        detail: data,
        bubbles: true,
        composed: true
      }));
    });
  }

  /**
   * Update the poster image
   * @private
   * @param {string} url - Poster image URL
   */
  _updatePoster(url) {
    if (!this._poster) return;
    this._poster.style.backgroundImage = `url(${url})`;
    if (!this._modelLoaded) {
      this._poster.style.display = 'flex';
    }
  }

  /**
   * Hide the poster
   * @private
   */
  _hidePoster() {
    if (this._poster) {
      this._poster.style.display = 'none';
    }
  }

  /**
   * Update alt text for accessibility
   * @private
   * @param {string} text - Alt text
   */
  _updateAltText(text) {
    this.setAttribute('aria-label', text || 'Interactive 3D model viewer');
    this.setAttribute('role', 'img');
  }

  /**
   * Dispose of the viewer
   * @private
   */
  _dispose() {
    if (this.viewer) {
      this.viewer.dispose();
      this.viewer = null;
    }
    if (this._container) {
      this._container.remove();
      this._container = null;
    }
    if (this._poster) {
      this._poster.remove();
      this._poster = null;
    }
    this._initialized = false;
    this._modelLoaded = false;
  }

  // ========================================
  // Public API - Properties
  // ========================================

  /**
   * Get/set the model source URL
   * @type {string}
   */
  get src() {
    return this.getAttribute('src') || '';
  }

  set src(value) {
    if (value) {
      this.setAttribute('src', value);
    } else {
      this.removeAttribute('src');
    }
  }

  /**
   * Get/set the model name
   * @type {string}
   */
  get name() {
    return this.getAttribute('name') || '';
  }

  set name(value) {
    if (value) {
      this.setAttribute('name', value);
    } else {
      this.removeAttribute('name');
    }
  }

  /**
   * Get/set whether VR is enabled
   * @type {boolean}
   */
  get vr() {
    return this.hasAttribute('vr');
  }

  set vr(value) {
    if (value) {
      this.setAttribute('vr', '');
    } else {
      this.removeAttribute('vr');
    }
  }

  /**
   * Get/set whether measurement is enabled
   * @type {boolean}
   */
  get measurement() {
    return this.hasAttribute('measurement');
  }

  set measurement(value) {
    if (value) {
      this.setAttribute('measurement', '');
    } else {
      this.removeAttribute('measurement');
    }
  }

  /**
   * Get whether a model is currently loaded
   * @type {boolean}
   * @readonly
   */
  get loaded() {
    return this._modelLoaded;
  }

  // ========================================
  // Public API - Methods
  // ========================================

  /**
   * Get the underlying ModelViewer instance
   * @returns {ModelViewer|null}
   */
  getViewer() {
    return this.viewer;
  }

  /**
   * Get the Three.js camera
   * @returns {THREE.PerspectiveCamera|null}
   */
  getCamera() {
    return this.viewer?.getCamera() || null;
  }

  /**
   * Get the Three.js scene
   * @returns {THREE.Scene|null}
   */
  getScene() {
    return this.viewer?.getScene() || null;
  }

  /**
   * Get the current 3D model
   * @returns {THREE.Object3D|null}
   */
  getModel() {
    return this.viewer?.getCurrentModel() || null;
  }

  /**
   * Focus camera on a point
   * @param {{x: number, y: number, z: number}} point - Point to focus on
   * @param {number} [distance] - Distance from point
   */
  focusOn(point, distance) {
    this.viewer?.focusOn(point, distance);
  }

  /**
   * Reset camera to initial position
   */
  resetCamera() {
    this.viewer?.resetCamera();
  }

  /**
   * Take a screenshot
   */
  takeScreenshot() {
    this.viewer?.takeScreenshot();
  }

  /**
   * Toggle fullscreen mode
   */
  toggleFullscreen() {
    this.viewer?.toggleFullscreen();
  }

  /**
   * Check if currently in fullscreen
   * @returns {boolean}
   */
  isFullscreen() {
    return this.viewer?.isFullscreen() || false;
  }
}

/**
 * Register the custom element
 * This is called automatically when the module is imported
 */
export function registerBelowViewer() {
  if (typeof customElements !== 'undefined' && !customElements.get('below-viewer')) {
    customElements.define('below-viewer', BelowViewerElement);
  }
}

// Auto-register when module loads
registerBelowViewer();
