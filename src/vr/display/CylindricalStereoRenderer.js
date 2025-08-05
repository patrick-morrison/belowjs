import * as THREE from 'three';

/**
 * CylindricalStereoRenderer - Render scenes for stereoscopic cylindrical displays.
 *
 * This renderer captures the scene for each eye using a {@link THREE.CubeCamera}
 * and converts the cube map to an unwrapped cylindrical projection. The output
 * is rendered side-by-side (left eye, right eye) so it can be fed directly to a
 * stereoscopic cylindrical screen as described in Paul Bourke's paper on
 * cylindrical panoramic projection.
 *
 * The implementation focuses on clarity over performance and is intended as a
 * starting point for specialised display hardware. It performs six renders per
 * eye (via cube cameras) and then applies a shader pass to unwrap the cube map
 * to a cylindrical image.
 *
 * @class CylindricalStereoRenderer
 */
export class CylindricalStereoRenderer {
  /**
   * @param {THREE.WebGLRenderer} renderer - Active WebGL renderer.
   * @param {THREE.Scene} scene - Scene to render.
   * @param {Object} [options] - Configuration options.
   * @param {number} [options.eyeSeparation=0.064] - Distance between eyes in metres.
   * @param {number} [options.cubeResolution=1024] - Resolution of the intermediate cube map.
   */
  constructor(renderer, scene, options = {}) {
    this.renderer = renderer;
    this.scene = scene;
    this.options = {
      eyeSeparation: options.eyeSeparation || 0.064,
      cubeResolution: options.cubeResolution || 1024
    };

    // Cube cameras capture full environment per eye
    this.leftCamera = new THREE.CubeCamera(0.1, 1000, this.options.cubeResolution);
    this.rightCamera = new THREE.CubeCamera(0.1, 1000, this.options.cubeResolution);

    // Scene for projection pass
    this.projectionScene = new THREE.Scene();
    this.projectionCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this._initProjectionMesh();

    // Reusable vectors
    this._forward = new THREE.Vector3();
    this._right = new THREE.Vector3();
    this._up = new THREE.Vector3();
  }

  _initProjectionMesh() {
    // Shader converts cube map to cylindrical projection
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4( position.xy, 0.0, 1.0 );
      }
    `;

    const fragmentShader = `
      uniform samplerCube envMap;
      varying vec2 vUv;
      const float PI = 3.14159265358979323846264;
      void main() {
        float theta = vUv.x * 2.0 * PI; // angle around cylinder
        float y = (vUv.y - 0.5) * 2.0; // vertical position
        vec3 dir = normalize(vec3(sin(theta), y, cos(theta)));
        gl_FragColor = textureCube(envMap, dir);
      }
    `;

    this.material = new THREE.ShaderMaterial({
      uniforms: { envMap: { value: null } },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide
    });

    const geometry = new THREE.PlaneGeometry(2, 1);
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.projectionScene.add(this.mesh);
  }

  /**
   * Render the current scene to the renderer's drawing buffer using a
   * stereoscopic cylindrical projection.
   *
   * @param {THREE.PerspectiveCamera} baseCamera - Viewer camera defining eye
   *   position and orientation.
   */
  render(baseCamera) {
    // Determine basis vectors from the base camera
    baseCamera.getWorldDirection(this._forward);
    this._up.copy(baseCamera.up).normalize();
    this._right.crossVectors(this._forward, this._up).normalize();
    const eyeOffset = this.options.eyeSeparation / 2;

    // Position cube cameras for left and right eyes
    const leftPos = new THREE.Vector3().copy(baseCamera.position).addScaledVector(this._right, -eyeOffset);
    const rightPos = new THREE.Vector3().copy(baseCamera.position).addScaledVector(this._right, eyeOffset);
    this.leftCamera.position.copy(leftPos);
    this.rightCamera.position.copy(rightPos);

    // Capture environment for each eye
    this.leftCamera.update(this.renderer, this.scene);
    this.rightCamera.update(this.renderer, this.scene);

    // Render cylindrical projection for each eye side-by-side
    const size = this.renderer.getSize(new THREE.Vector2());
    const halfWidth = Math.floor(size.x / 2);

    // Left eye
    this.material.uniforms.envMap.value = this.leftCamera.renderTarget.texture;
    this.renderer.setViewport(0, 0, halfWidth, size.y);
    this.renderer.render(this.projectionScene, this.projectionCamera);

    // Right eye
    this.material.uniforms.envMap.value = this.rightCamera.renderTarget.texture;
    this.renderer.setViewport(halfWidth, 0, halfWidth, size.y);
    this.renderer.render(this.projectionScene, this.projectionCamera);

    // Reset viewport
    this.renderer.setViewport(0, 0, size.x, size.y);
  }

  /**
   * Dispose internal resources
   */
  dispose() {
    this.leftCamera.renderTarget.dispose();
    this.rightCamera.renderTarget.dispose();
    this.mesh.geometry.dispose();
    this.material.dispose();
  }
}

