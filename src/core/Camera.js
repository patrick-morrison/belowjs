import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EventSystem } from '../utils/EventSystem.js';

/**
 * Camera - 3D camera management with controls and animation
 * 
 * Manages Three.js PerspectiveCamera with OrbitControls, provides smooth
 * focus animations, and handles camera positioning and framing operations.
 * 
 * @class Camera
 * @extends EventSystem
 * 
 * @param {Object} [config={}] - Camera configuration
 * @param {number} [config.fov=65] - Field of view in degrees
 * @param {number} [config.near=0.05] - Near clipping plane
 * @param {number} [config.far=2000] - Far clipping plane
 * @param {Object} [config.position] - Initial camera position {x, y, z}
 * @param {Object} [config.desktop] - Desktop-specific control settings
 * 
 * @fires Camera#focus-start - When focus animation begins
 * @fires Camera#focus-complete - When focus animation completes
 * @fires Camera#controls-change - When camera position changes via controls
 * 
 * @example
 * // Create camera with custom settings
 * const camera = new Camera({
 *   fov: 75,
 *   position: { x: 10, y: 5, z: 15 },
 *   desktop: {
 *     enableDamping: true,
 *     dampingFactor: 0.1
 *   }
 * });
 * 
 * @since 1.0.0
 */
export class Camera extends EventSystem {
  /**
   * Creates a new Camera instance
   * 
   * @param {Object} [config={}] - Camera configuration
   */
  constructor(config = {}) {
    super();
    this.config = config;
    this.camera = null;
    this.controls = null;
    this.focusAnimation = null; // Track ongoing focus animation
    this.init();
  }

  init() {
    // Create perspective camera
    this.camera = new THREE.PerspectiveCamera(
      this.config.fov || 65,
      window.innerWidth / window.innerHeight,
      this.config.near || 0.05,
      this.config.far || 2000
    );

    // Set initial position
    const pos = this.config.position || { x: 0, y: 5, z: 10 };
    this.camera.position.set(pos.x, pos.y, pos.z);
  }

  initControls(domElement) {
    if (!this.controls) {
      this.controls = new OrbitControls(this.camera, domElement);
      
      const controlsConfig = this.config.desktop || {};
      this.controls.enableDamping = controlsConfig.enableDamping ?? true;
      this.controls.dampingFactor = controlsConfig.dampingFactor ?? 0.08;
      this.controls.maxDistance = controlsConfig.maxDistance ?? 100;
      this.controls.minDistance = controlsConfig.minDistance ?? 0.5;
      
      // Emit change events when controls change
      this.controls.addEventListener('change', () => {
        this.emit('change');
      });
    }
  }

  update() {
    if (this.controls) {
      this.controls.update();
    }
  }

  setSize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  getCamera() {
    return this.camera;
  }

  getControls() {
    return this.controls;
  }

  /**
   * Frame an object by positioning the camera to view it optimally
   * 
   * @method frameObject
   * @param {THREE.Vector3} center - Center point of the object
   * @param {number} size - Size/radius of the object
   * @returns {void}
   * 
   * @example
   * // Frame a model based on its bounding box
   * const box = new THREE.Box3().setFromObject(model);
   * const center = box.getCenter(new THREE.Vector3());
   * const size = box.getSize(new THREE.Vector3()).length();
   * camera.frameObject(center, size);
   * 
   * @since 1.0.0
   */
  frameObject(center, size) {
    // Calculate distance to frame the object nicely
    const distance = size * 1.5; // Adjust multiplier for desired framing
    
    // Position camera
    this.camera.position.set(
      center.x + distance * 0.7,
      center.y + distance * 0.5,
      center.z + distance * 0.7
    );
    
    // Update controls target
    if (this.controls) {
      this.controls.target.copy(center);
      this.controls.update();
    }
  }

  /**
   * Smoothly focus the camera on a target point
   * 
   * @method focusOn
   * @param {THREE.Vector3|Object} target - Target position to focus on
   * @param {number} target.x - X coordinate
   * @param {number} target.y - Y coordinate  
   * @param {number} target.z - Z coordinate
   * @param {number} [distance=null] - Distance from target (auto-calculated if null)
   * @returns {void}
   * 
   * @fires Camera#focus-start - When animation begins
   * @fires Camera#focus-complete - When animation completes
   * 
   * @example
   * // Focus on a specific point
   * camera.focusOn({ x: 10, y: 5, z: 0 });
   * 
   * // Focus with custom distance
   * camera.focusOn(targetPoint, 15);
   * 
   * @since 1.0.0
   */
  focusOn(target, distance = null) {
    if (!this.controls) return;
    
    // Cancel any existing focus animation
    if (this.focusAnimation) {
      cancelAnimationFrame(this.focusAnimation);
      this.focusAnimation = null;
    }
    
    const startTarget = this.controls.target.clone();
    const startPosition = this.camera.position.clone();
    
    // Calculate new camera position (maintain relative offset) - EXACTLY like original
    const offset = startPosition.clone().sub(startTarget);
    const newPosition = target.clone().add(offset);
    
    // Match original animation exactly
    const duration = 1000; // 1 second - same as original
    const startTime = performance.now();
    
    // Set up user input cancellation
    const cancelOnUserInput = () => {
      if (this.focusAnimation) {
        cancelAnimationFrame(this.focusAnimation);
        this.focusAnimation = null;
        this.controls.removeEventListener('start', cancelOnUserInput);
      }
    };
    
    // Cancel animation if user starts interacting with controls
    this.controls.addEventListener('start', cancelOnUserInput, { once: true });
    
    const animate = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Use exact same easing as original - ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      
      this.controls.target.lerpVectors(startTarget, target, eased);
      this.camera.position.lerpVectors(startPosition, newPosition, eased);
      
      if (progress < 1) {
        this.focusAnimation = requestAnimationFrame(animate);
      } else {
        this.focusAnimation = null; // Animation complete
        this.controls.removeEventListener('start', cancelOnUserInput);
        this.emit('focus-complete', { target, position: newPosition });
      }
    };
    
    this.focusAnimation = requestAnimationFrame(animate);
    this.emit('focus-start', { target, startPosition, newPosition });
  }

  /**
   * Clean up and dispose of camera resources
   * 
   * Cancels any ongoing animations, disposes of controls, and cleans up
   * event listeners. Call this when done with the camera.
   * 
   * @method dispose
   * @returns {void}
   * 
   * @example
   * // Clean up camera
   * camera.dispose();
   * 
   * @since 1.0.0
   */
  dispose() {
    // Cancel any ongoing focus animation
    if (this.focusAnimation) {
      cancelAnimationFrame(this.focusAnimation);
      this.focusAnimation = null;
    }
    
    if (this.controls) {
      this.controls.dispose();
    }
    
    // Clean up event listeners
    this.removeAllListeners();
  }
}
