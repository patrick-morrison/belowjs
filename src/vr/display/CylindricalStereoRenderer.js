import * as THREE from 'three';

/**
 * CylindricalStereoRenderer - Render scenes for stereoscopic cylindrical displays.
 * 
 * Based on Three.js StereoEffect pattern and Paul Bourke's cylindrical projection methodology.
 * Renders side-by-side stereo images using Three.js StereoCamera for proper eye separation.
 *
 * @class CylindricalStereoRenderer
 */
export class CylindricalStereoRenderer {
  /**
   * @param {THREE.WebGLRenderer} renderer - Active WebGL renderer.
   * @param {THREE.Scene} scene - Scene to render.
   * @param {Object} [options] - Configuration options.
   * @param {number} [options.eyeSeparation=0.064] - Distance between eyes in metres.
   */
  constructor(renderer, scene, options = {}) {
    this.renderer = renderer;
    this.scene = scene;
    this.options = {
      eyeSeparation: options.eyeSeparation || 0.064
    };

    // Use Three.js StereoCamera for proper stereo setup
    this.stereoCamera = new THREE.StereoCamera();
    this.stereoCamera.aspect = 0.5; // Each eye gets half the width
    this.stereoCamera.eyeSep = this.options.eyeSeparation;
    
    // Cache size vector for reuse
    this.size = new THREE.Vector2();
  }

  /**
   * Render the current scene using stereoscopic side-by-side projection.
   * Based on Three.js StereoEffect implementation pattern.
   *
   * @param {THREE.PerspectiveCamera} camera - Viewer camera defining eye position and orientation.
   */
  render(camera) {
    // Update scene and camera matrices
    this.scene.updateMatrixWorld();
    if (camera.parent === null) camera.updateMatrixWorld();
    
    // Update stereo camera based on main camera
    this.stereoCamera.update(camera);
    
    // Get current renderer size
    this.renderer.getSize(this.size);
    
    // Clear if needed
    if (this.renderer.autoClear) this.renderer.clear();
    
    // Enable scissor test for split-screen rendering
    this.renderer.setScissorTest(true);
    
    // Calculate half width for each eye
    const halfWidth = this.size.width / 2;
    
    // Render left eye to left half
    this.renderer.setScissor(0, 0, halfWidth, this.size.height);
    this.renderer.setViewport(0, 0, halfWidth, this.size.height);
    this.renderer.render(this.scene, this.stereoCamera.cameraL);
    
    // Render right eye to right half
    this.renderer.setScissor(halfWidth, 0, halfWidth, this.size.height);
    this.renderer.setViewport(halfWidth, 0, halfWidth, this.size.height);
    this.renderer.render(this.scene, this.stereoCamera.cameraR);
    
    // Reset scissor and viewport to full screen
    this.renderer.setScissorTest(false);
    this.renderer.setScissor(0, 0, this.size.width, this.size.height);
    this.renderer.setViewport(0, 0, this.size.width, this.size.height);
  }

  /**
   * Set eye separation distance
   * @param {number} eyeSep - Eye separation in meters
   */
  setEyeSeparation(eyeSep) {
    this.options.eyeSeparation = eyeSep;
    this.stereoCamera.eyeSep = eyeSep;
  }

  /**
   * Get current eye separation
   * @returns {number} Eye separation in meters
   */
  getEyeSeparation() {
    return this.stereoCamera.eyeSep;
  }

  /**
   * Dispose internal resources
   */
  dispose() {
    // Three.js StereoCamera doesn't need explicit disposal
    // but we can clean up references
    this.stereoCamera = null;
    this.size = null;
  }
}