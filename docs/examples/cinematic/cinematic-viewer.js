/**
 * Cinematic viewer — WebGPU/TSL "Blender-class" rendering path for BelowJS.
 *
 * Standalone scaffolding (does not use BelowViewer): WebGPURenderer with AgX
 * tone mapping, raymarched volumetric water lit by dual ROV-style torches,
 * TSL drift particles, and a bloom composite. Exposes the same API surface the
 * animation example UI expects (diveSystem, loadModel, fly mode, etc).
 *
 * Water optics are taken from the Sesa Blender scenes:
 *   scatter colour (0.147, 0.265, 0.454), anisotropy 0.42
 *   absorption     (0.008, 0.046, 0.123)
 *   warm accent torch (1.0, 0.823, 0.65)
 */

import * as THREE from 'three/webgpu';
import {
  Fn, vec3, uniform, time, texture3D, screenUV, screenCoordinate,
  pass, hash, instanceIndex, float, uv, smoothstep, length
} from 'three/tsl';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';
import { bayer16 } from 'three/addons/tsl/math/Bayer.js';
import { gaussianBlur } from 'three/addons/tsl/display/GaussianBlurNode.js';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import { FlyControls } from 'https://cdn.jsdelivr.net/npm/belowjs@1.7.6/dist/belowjs.js';

const LAYER_VOLUMETRIC = 10;

const TORCH_WARM = new THREE.Color(1.0, 0.823, 0.65);

const DIVE_FOG_DENSITY = 0.018;
const SURVEY_FOG_DENSITY = 0.0035;
// In dive mode, distance fades to near-black (Blender's absorption look),
// not to the water colour — that half-fade leaves distant silhouettes.
const DIVE_FOG_DARKEN = 0.12;

function createNoiseTexture3D(size = 96) {
  const data = new Uint8Array(size * size * size);
  const perlin = new ImprovedNoise();
  const repeat = 5.0;
  const scale = 10;
  let i = 0;
  for (let z = 0; z < size; z++) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const n = perlin.noise((x / size) * repeat * scale, (y / size) * repeat * scale, (z / size) * repeat * scale);
        data[i++] = 128 + 128 * n;
      }
    }
  }
  const tex = new THREE.Data3DTexture(data, size, size, size);
  tex.format = THREE.RedFormat;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.unpackAlignment = 1;
  tex.needsUpdate = true;
  return tex;
}

class DualTorch {
  constructor(camera) {
    this.rig = new THREE.Group();
    camera.add(this.rig);

    this.intensityScale = 280; // slider (0.5–20) → candela; tuned so AgX holds the hotspot
    this.spots = [];
    this.targets = [];

    // ROV lighting practice: mount the lights wide off the camera axis and
    // cross-aim them so the cones converge at the subject. The water column
    // directly in front of the lens stays unlit, which is what suppresses
    // backscatter; wide soft beams overlapping at the convergence point give
    // even coverage instead of a hotspot.
    const MOUNT_SEPARATION = 1.5; // total metres between the two lights
    const MOUNT_HEIGHT = 0.25;    // slightly above the lens, ROV-frame style
    const CONVERGE_AT = 14;       // metres ahead where the beams cross

    const offsets = [-MOUNT_SEPARATION / 2, MOUNT_SEPARATION / 2];
    const colors = [0xffffff, TORCH_WARM.getHex()];
    for (let i = 0; i < 2; i++) {
      const spot = new THREE.SpotLight(colors[i], 1.5 * this.intensityScale);
      spot.position.set(offsets[i], MOUNT_HEIGHT, 0.1);
      spot.angle = (50 * Math.PI) / 180 / 2;
      spot.penumbra = 0.7;
      // softer-than-physical falloff: tames the blown-out near field that
      // inverse-square gives when the camera skims close to the seabed
      // (~30x near/far ratio at 2m vs 15m, vs 56x for true inverse-square)
      spot.decay = 1.7;
      spot.distance = 50;
      spot.castShadow = true;
      spot.shadow.mapSize.set(1024, 1024);
      spot.shadow.camera.near = 0.3;
      spot.shadow.camera.far = 50;
      spot.shadow.bias = -0.003;
      spot.shadow.intensity = 0.98;
      spot.layers.enable(LAYER_VOLUMETRIC);

      // both beams converge on the camera axis at CONVERGE_AT metres
      const target = new THREE.Object3D();
      target.position.set(0, -1.5, -CONVERGE_AT);
      this.rig.add(target);
      spot.target = target;
      this.rig.add(spot);

      this.spots.push(spot);
      this.targets.push(target);
    }
    this._intensity = 1.5;
  }

  setSeparation(totalMetres) {
    const half = Math.max(0.1, totalMetres) / 2;
    this.spots[0].position.x = -half;
    this.spots[1].position.x = half;
  }

  setIntensity(v) {
    this._intensity = v;
    for (const s of this.spots) s.intensity = v * this.intensityScale;
  }

  setBeamWidth(deg) {
    const angle = Math.min(deg, 90) * Math.PI / 180 / 2;
    for (const s of this.spots) s.angle = angle;
  }

  setDistance(d) {
    for (const s of this.spots) {
      s.distance = d;
      s.shadow.camera.far = d;
    }
    // keep the crossover proportional to reach, but never closer than 8m
    for (const t of this.targets) t.position.z = -Math.max(8, Math.min(d * 0.35, 25));
  }

  setVisible(visible) {
    for (const s of this.spots) s.visible = visible;
  }

  // Rig is parented to the camera, so position is always in sync.
  // Kept for API compatibility with the animation example's export loop.
  updateCameraPosition() {}
}

class DriftParticles {
  constructor(scene) {
    this.baseCount = 5000;
    this.center = uniform(vec3(0, 0, 0));
    this.boxSize = uniform(vec3(60, 30, 60));
    this.tint = uniform(new THREE.Color(0xbfd4e0));

    const material = new THREE.SpriteNodeMaterial();
    material.transparent = true;
    material.depthWrite = false;
    material.fog = true;

    const rand = (seed) => hash(instanceIndex.add(seed));

    // per-instance random base position in unit cube
    const base = vec3(rand(1), rand(2), rand(3));
    // slow per-instance drift, wrapped inside the box
    const vel = vec3(rand(4).sub(0.5).mul(0.012), rand(5).sub(0.5).mul(0.006), rand(6).sub(0.5).mul(0.012));
    const wrapped = base.add(vel.mul(time)).fract();
    material.positionNode = wrapped.sub(0.5).mul(this.boxSize).add(this.center);

    material.scaleNode = rand(7).mul(0.045).add(0.012);

    const dist = length(uv().sub(0.5)).mul(2.0);
    const disc = smoothstep(0.35, 1.0, dist).oneMinus();
    material.opacityNode = disc.mul(float(0.5).mul(rand(8).mul(0.7).add(0.3)));
    material.colorNode = this.tint;

    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    this.mesh.count = this.baseCount;
    this.mesh.frustumCulled = false;
    this.mesh.visible = false;
    scene.add(this.mesh);

    this._density = 0.1;
    this.mesh.count = Math.floor(this.baseCount * this._density);
  }

  setBounds(box) {
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    this.center.value.copy(center);
    this.boxSize.value.set(size.x * 1.6, Math.max(size.y * 2.5, 20), size.z * 1.6);
  }

  setDensity(d) {
    this._density = d;
    this.mesh.count = Math.max(1, Math.floor(this.baseCount * d));
    this.mesh.visible = this._visibleWanted && d > 0.001;
  }

  setVisible(visible) {
    this._visibleWanted = visible;
    this.mesh.visible = visible && this._density > 0.001;
  }

  updateFog(fog) {
    if (fog && fog.color) {
      // keep particles slightly brighter than the water they hang in
      const c = fog.color.clone().lerp(new THREE.Color(0xffffff), 0.55);
      this.tint.value.copy(c);
    }
  }
}

class SurveyLighting {
  constructor(scene) {
    this.scene = scene;
    this.brightness = 1.0;

    this.hemi = new THREE.HemisphereLight(0xbfd9ee, 0x18222e, 0.9);

    this.key = new THREE.DirectionalLight(0xffffff, 2.0);
    this.key.position.set(60, 120, 40);
    this.key.castShadow = true;
    this.key.shadow.mapSize.set(2048, 2048);
    this.key.shadow.bias = -0.0001;
    this.key.shadow.normalBias = 0.03;

    this.fill = new THREE.DirectionalLight(0xdce8f4, 0.65);
    this.fill.position.set(-50, 40, -60);

    this.bottom = new THREE.DirectionalLight(0xffffff, 0.15);
    this.bottom.position.set(0, -40, 0);

    this.lights = [this.hemi, this.key, this.fill, this.bottom];
    this.baseIntensities = this.lights.map(l => l.intensity);
  }

  fitShadows(box) {
    const size = box.getSize(new THREE.Vector3());
    const radius = Math.max(size.x, size.z) * 0.75;
    const cam = this.key.shadow.camera;
    cam.left = -radius; cam.right = radius;
    cam.top = radius; cam.bottom = -radius;
    cam.near = 1; cam.far = 500;
    cam.updateProjectionMatrix();
    const center = box.getCenter(new THREE.Vector3());
    this.key.target.position.copy(center);
    this.scene.add(this.key.target);
  }

  setSurveyBrightness(mult) {
    this.brightness = Math.max(0.5, Math.min(5.0, mult));
    this.lights.forEach((l, i) => { l.intensity = this.baseIntensities[i] * this.brightness; });
  }

  setVisible(visible) {
    for (const l of this.lights) l.visible = visible;
  }

  addTo(scene) {
    for (const l of this.lights) scene.add(l);
  }
}

class VolumetricDive {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this._isDive = false;
    this._fogColor = new THREE.Color('#041729');

    this.lighting = new SurveyLighting(scene);
    this.lighting.addTo(scene);

    this.torch = new DualTorch(camera);
    this.torch.setVisible(false);

    this.particles = new DriftParticles(scene);

    // Water volume — raymarched scattering medium (lit by the torches).
    // Density is optical-depth per metre of ray; tuned visually against the
    // Sesa Blender renders (higher values saturate to white over long paths).
    this.waterDensity = uniform(0.022);
    this.scatterTint = uniform(new THREE.Color(0.09, 0.21, 0.42));
    const noise3d = createNoiseTexture3D();

    const material = new THREE.VolumeNodeMaterial();
    material.steps = 16;
    material.offsetNode = bayer16(screenCoordinate);
    material.scatteringNode = Fn(({ positionRay }) => {
      const drift = vec3(time.mul(0.04), time.mul(0.012), time.mul(0.025));
      const grain = (scale, t = 1) =>
        texture3D(noise3d, positionRay.add(drift.mul(t)).mul(scale).mod(1), 0).r.add(0.5);
      let density = grain(0.05);
      density = density.mul(grain(0.015, 2));
      // anisotropy/absorption folded into a single tint+density approximation
      return this.scatterTint.mul(density).mul(this.waterDensity);
    });
    this.volumeMaterial = material;

    this.volumeMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
    this.volumeMesh.layers.disableAll();
    this.volumeMesh.layers.enable(LAYER_VOLUMETRIC);
    this.volumeMesh.visible = false;
    this.volumeMesh.frustumCulled = false;
    scene.add(this.volumeMesh);

    this.scene.fog = new THREE.FogExp2(this._fogColor.getHex(), SURVEY_FOG_DENSITY);
  }

  setModelBounds(box) {
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.z);
    this.volumeMesh.position.copy(center);
    // tall enough that the box ceiling stays out of frame from above
    this.volumeMesh.scale.set(size.x * 2.2, Math.max(size.y * 4, maxDim * 0.9), size.z * 2.2);
    this.particles.setBounds(box);
    this.lighting.fitShadows(box);
  }

  _applyWater() {
    const c = this._isDive
      ? this._fogColor.clone().multiplyScalar(DIVE_FOG_DARKEN)
      : this._fogColor.clone();
    this.scene.fog.color.copy(c);
    this.scene.background = c;
    this.scene.fog.density = this._isDive ? DIVE_FOG_DENSITY : SURVEY_FOG_DENSITY;
    this.particles.updateFog({ color: this._fogColor });
  }

  setWaterColor(colorHex) {
    this._fogColor.set(colorHex);
    this._applyWater();
  }

  setDiveMode(enabled) {
    this._isDive = enabled;
    this.lighting.setVisible(!enabled);
    this.torch.setVisible(enabled);
    this.particles.setVisible(enabled);
    this.volumeMesh.visible = enabled;
    this._applyWater();
  }

  isDiveMode() {
    return this._isDive;
  }

  enableDiveMode() { this.setDiveMode(true); }
  disableDiveMode() { this.setDiveMode(false); }
}

export async function createCinematicViewer(container) {
  const listeners = {};
  const emit = (name, data) => (listeners[name] || []).forEach(fn => fn(data));

  if (navigator.gpu === undefined) {
    console.warn('WebGPU not available — three.js will fall back to WebGL2.');
  }

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  await renderer.init();
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#041729');

  const initialAspect = (container.clientWidth && container.clientHeight)
    ? container.clientWidth / container.clientHeight
    : 16 / 9; // container can measure 0x0 before layout settles
  const camera = new THREE.PerspectiveCamera(50, initialAspect, 0.1, 2000);
  camera.position.set(0, 20, 50);
  scene.add(camera);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;

  const diveSystem = new VolumetricDive(scene, camera);

  // --- Post-processing: scene + quarter-res volumetric pass + bloom ---
  const postProcessing = new THREE.PostProcessing(renderer);

  const volumetricLayer = new THREE.Layers();
  volumetricLayer.disableAll();
  volumetricLayer.enable(LAYER_VOLUMETRIC);

  const scenePass = pass(scene, camera);
  const sceneDepth = scenePass.getTextureNode('depth');
  diveSystem.volumeMaterial.depthNode = sceneDepth.sample(screenUV);

  const volumetricPass = pass(scene, camera, { depthBuffer: false });
  volumetricPass.setLayers(volumetricLayer);
  volumetricPass.setResolution(0.25);

  const volumetricIntensity = uniform(1.0);
  const blurredVolumetric = gaussianBlur(volumetricPass, uniform(0.6));
  const composed = scenePass.add(blurredVolumetric.mul(volumetricIntensity));
  const bloomed = composed.add(bloom(composed, 0.35, 0.3, 0.8));
  postProcessing.outputNode = bloomed;

  // --- Loaders ---
  const ktx2Loader = new KTX2Loader()
    .setTranscoderPath('https://cdn.jsdelivr.net/npm/three@0.179.1/examples/jsm/libs/basis/')
    .detectSupport(renderer);
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.179.1/examples/jsm/libs/draco/gltf/');
  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);
  gltfLoader.setKTX2Loader(ktx2Loader);
  gltfLoader.setMeshoptDecoder(MeshoptDecoder);

  const loadedModels = [];

  function prepareMaterial(material) {
    const map = material.map || null;
    // Unlit/basic photogrammetry → lit standard material, Blender-style:
    // roughness 1, metalness 0, micro-relief bumped from the albedo itself.
    const std = new THREE.MeshStandardMaterial({
      map,
      roughness: 1.0,
      metalness: 0.0
    });
    if (map) {
      map.anisotropy = Math.min(8, renderer.getMaxAnisotropy?.() ?? 8);
      std.bumpMap = map;
      std.bumpScale = 4; // bump-from-albedo, mirrors the Blender Bump node
    }
    return std;
  }

  async function loadModel(url, { autoFrame = true } = {}) {
    const gltf = await gltfLoader.loadAsync(url);
    const model = gltf.scene;

    model.traverse((obj) => {
      if (obj.isLight) obj.visible = false;
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        if (!obj.geometry.attributes.normal) obj.geometry.computeVertexNormals();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        const prepared = mats.map(prepareMaterial);
        obj.material = Array.isArray(obj.material) ? prepared : prepared[0];
      }
    });

    scene.add(model);
    loadedModels.push(model);

    const box = new THREE.Box3().setFromObject(model);
    diveSystem.setModelBounds(box);
    flyControls.setModelSizeFromObject?.(model);

    if (autoFrame) {
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      camera.near = Math.max(maxDim / 1000, 0.01);
      camera.far = maxDim * 50;
      camera.updateProjectionMatrix();
      controls.maxDistance = maxDim * 5;
      controls.minDistance = maxDim / 500;
      controls.target.copy(center);
      camera.position.set(
        center.x + maxDim * 0.28,
        center.y + maxDim * 0.16,
        center.z + maxDim * 0.38
      );
      controls.update();
    }
    return model;
  }

  function clearModels() {
    for (const model of loadedModels) {
      scene.remove(model);
      model.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach(m => { m.map?.dispose(); m.dispose?.(); });
        }
      });
    }
    loadedModels.length = 0;
  }

  // --- Double-click to focus (ported from ModelViewer) ---
  let focusAnimation = null;
  function focusOn(target) {
    if (focusAnimation) cancelAnimationFrame(focusAnimation);
    const startTarget = controls.target.clone();
    const startPosition = camera.position.clone();
    const newPosition = target.clone().add(startPosition.clone().sub(startTarget));
    const duration = 1000;
    const startTime = performance.now();

    const cancelOnUserInput = () => {
      if (focusAnimation) { cancelAnimationFrame(focusAnimation); focusAnimation = null; }
    };
    controls.addEventListener('start', cancelOnUserInput, { once: true });

    const animateFocus = () => {
      const progress = Math.min((performance.now() - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      controls.target.lerpVectors(startTarget, target, eased);
      camera.position.lerpVectors(startPosition, newPosition, eased);
      focusAnimation = progress < 1 ? requestAnimationFrame(animateFocus) : null;
    };
    animateFocus();
  }

  let downPos = null;
  renderer.domElement.addEventListener('pointerdown', (e) => { downPos = [e.clientX, e.clientY]; });
  renderer.domElement.addEventListener('dblclick', (e) => {
    if (downPos && (Math.abs(e.clientX - downPos[0]) > 5 || Math.abs(e.clientY - downPos[1]) > 5)) return;
    const rect = renderer.domElement.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(loadedModels, true);
    if (hits.length > 0) focusOn(hits[0].point);
  });

  // --- Fly controls (reused from belowjs core) ---
  const flyControls = new FlyControls({
    domElement: renderer.domElement,
    camera,
    controls,
    renderer
  });
  flyControls.on('fly-mode-change', (data) => emit('fly-mode-change', data));

  // --- Screenshot button (animation example rebinds #screenshotButton) ---
  const screenshotButton = document.createElement('button');
  screenshotButton.id = 'screenshotButton';
  screenshotButton.className = 'screenshot-button';
  screenshotButton.title = 'Screenshot';
  screenshotButton.innerHTML = '📷';
  container.appendChild(screenshotButton);

  // --- Render loop ---
  let exporting = false;
  let lastTime = performance.now();
  renderer.setAnimationLoop(() => {
    if (exporting) return;
    const now = performance.now();
    const delta = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
    flyControls.update(delta);
    controls.update();
    postProcessing.render();
  });

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h || !Number.isFinite(w / h)) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', resize);

  const viewer = {
    renderer,
    scene,
    camera,
    controls,
    diveSystem,
    postProcessing,
    screenshotButton,

    // events
    on(name, fn) { (listeners[name] ||= []).push(fn); },

    // BelowViewer-compatible plumbing used by the animation example UI
    belowViewer: {
      renderer,
      loadModel,
      clearModels,
      sceneManager: { scene },
      cameraManager: {
        camera,
        controls,
        getCamera: () => camera,
        getControls: () => controls
      }
    },

    getScene: () => scene,
    setWaterColor: (hex) => diveSystem.setWaterColor(hex),
    focusOn,

    // fly mode
    isFlyModeActive: () => flyControls.isActive(),
    enterFlyMode: () => flyControls.enterFlyMode(),
    exitFlyMode: () => flyControls.exitFlyMode(),
    setFlyControlsEnabled: (enabled) => flyControls.setEnabled(enabled),

    // export hooks
    setExporting(value, { highQuality = true } = {}) {
      exporting = value;
      diveSystem.volumeMaterial.steps = value && highQuality ? 28 : 16;
      volumetricPass.setResolution(value && highQuality ? 0.5 : 0.25);
    },
    async renderFrame() {
      await postProcessing.renderAsync();
    },

    takeScreenshot() {
      postProcessing.renderAsync().then(() => {
        renderer.domElement.toBlob((blob) => {
          if (!blob) return;
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = `screenshot_${Date.now()}.png`;
          a.click();
          setTimeout(() => URL.revokeObjectURL(a.href), 1000);
        });
      });
    }
  };

  setTimeout(() => emit('initialized'), 0);
  return viewer;
}
