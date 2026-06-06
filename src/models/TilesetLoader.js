import * as THREE from 'three';
import { TilesRenderer } from '3d-tiles-renderer/three';
import { ImplicitTilingPlugin } from '3d-tiles-renderer/plugins';
import { GLTFExtensionsPlugin } from '3d-tiles-renderer/three/plugins';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { resolveAssetPaths } from '../utils/AssetPathUtils.js';

const DEFAULT_DRACO_DECODER_PATH = 'https://unpkg.com/three@0.179.1/examples/jsm/libs/draco/gltf/';
const DEFAULT_KTX2_TRANSCODER_PATH = 'https://unpkg.com/three@0.179.1/examples/jsm/libs/basis/';

class BelowTilesRenderer extends TilesRenderer {
  preprocessTileset(json, url, parent = null) {
    const version = json.asset?.version || '1.0';
    const [major] = version.split('.').map((v) => parseInt(v, 10));
    console.assert(
      major <= 1,
      'TilesRenderer: asset.version is expected to be a 1.x or a compatible version.'
    );

    // Suppress noisy warning for 1.1+ while keeping compatibility behavior unchanged.
    let basePath = url.replace(/\/[^/]*$/, '');
    basePath = new URL(basePath, window.location.href).toString();
    this.preprocessNode(json.root, basePath, parent);
  }
}

export class TilesetLoader {
  constructor(renderer = null, camera = null) {
    this.renderer = renderer;
    this.camera = camera;
    this.activeTilesets = new Set();
    this.tilesetStates = new Map();
    this.pendingQueueTasks = [];
    this._resolutionVec2 = new THREE.Vector2();
  }

  clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  setRenderer(renderer) {
    this.renderer = renderer;
    this.updateResolution();
  }

  getResolutionConfig(state) {
    return {
      usePerEyeResolution: state?.usePerEyeResolution !== false,
      useDrawingBufferResolution: state?.useDrawingBufferResolution !== false,
      usePerEyeCameras: state?.usePerEyeCameras !== false
    };
  }

  getDesiredTraversalCameras(camera, config = {}) {
    if (!camera) {
      return [];
    }

    const usePerEyeCameras = config?.usePerEyeCameras !== false;
    if (usePerEyeCameras && camera.isArrayCamera && Array.isArray(camera.cameras) && camera.cameras.length > 0) {
      return camera.cameras.filter(Boolean);
    }

    return [camera];
  }

  syncTilesetTraversalCameras(tileset, camera, config = {}) {
    if (!tileset || !camera) {
      return [];
    }

    const desiredCameras = this.getDesiredTraversalCameras(camera, config);
    const currentCameras = Array.isArray(tileset.cameras) ? [...tileset.cameras] : [];

    currentCameras.forEach((existingCamera) => {
      if (!desiredCameras.includes(existingCamera)) {
        tileset.deleteCamera(existingCamera);
      }
    });

    desiredCameras.forEach((desiredCamera) => {
      tileset.setCamera(desiredCamera);
    });

    return desiredCameras;
  }

  setCamera(camera) {
    const previousCamera = this.camera;
    this.camera = camera;
    this.activeTilesets.forEach((tileset) => {
      const state = this.tilesetStates.get(tileset);
      const resolutionConfig = this.getResolutionConfig(state);
      if (previousCamera && previousCamera !== this.camera) {
        const previousDesiredCameras = this.getDesiredTraversalCameras(previousCamera, resolutionConfig);
        previousDesiredCameras.forEach((prevCamera) => {
          tileset.deleteCamera(prevCamera);
        });
      }
      if (this.camera) {
        const traversalCameras = this.syncTilesetTraversalCameras(tileset, this.camera, resolutionConfig);
        this.setResolutionForCamera(tileset, this.camera, traversalCameras, resolutionConfig);
      }
    });
  }

  setResolutionForCamera(tileset, camera, traversalCameras = null, config = {}) {
    if (!tileset || !camera || !this.renderer) {
      return;
    }

    const usePerEyeResolution = config?.usePerEyeResolution !== false;
    const useDrawingBufferResolution = config?.useDrawingBufferResolution !== false;
    const cameras = Array.isArray(traversalCameras) && traversalCameras.length > 0
      ? traversalCameras
      : this.getDesiredTraversalCameras(camera, config);

    if (cameras.length === 0) {
      return;
    }

    // In XR with per-eye traversal cameras, set each eye's pixel viewport directly.
    if (usePerEyeResolution && camera.isArrayCamera) {
      let updatedAnyEye = false;
      cameras.forEach((eyeCamera) => {
        const viewport = eyeCamera?.viewport;
        if (viewport && Number.isFinite(viewport.z) && Number.isFinite(viewport.w) && viewport.z > 0 && viewport.w > 0) {
          tileset.setResolution(eyeCamera, viewport.z, viewport.w);
          updatedAnyEye = true;
        }
      });
      if (updatedAnyEye) {
        return;
      }
    }

    if (useDrawingBufferResolution && this.renderer.getDrawingBufferSize) {
      this.renderer.getDrawingBufferSize(this._resolutionVec2);
      cameras.forEach((activeCamera) => {
        tileset.setResolution(activeCamera, this._resolutionVec2.x, this._resolutionVec2.y);
      });
      return;
    }

    cameras.forEach((activeCamera) => {
      tileset.setResolutionFromRenderer(activeCamera, this.renderer);
    });
  }

  getQueueSchedulingCallback() {
    return (runJobs) => {
      this.pendingQueueTasks.push(runJobs);
    };
  }

  configureScheduling(tileset) {
    if (!tileset) return;

    const schedulingCallback = this.getQueueSchedulingCallback();
    if (tileset.downloadQueue) {
      tileset.downloadQueue.schedulingCallback = schedulingCallback;
    }
    if (tileset.parseQueue) {
      tileset.parseQueue.schedulingCallback = schedulingCallback;
    }
    if (tileset.processNodeQueue) {
      tileset.processNodeQueue.schedulingCallback = schedulingCallback;
    }
  }

  updateResolution() {
    if (!this.renderer || !this.camera) {
      return;
    }
    this.activeTilesets.forEach((tileset) => {
      const state = this.tilesetStates.get(tileset);
      const resolutionConfig = this.getResolutionConfig(state);
      const traversalCameras = this.syncTilesetTraversalCameras(tileset, this.camera, resolutionConfig);
      this.setResolutionForCamera(tileset, this.camera, traversalCameras, resolutionConfig);
    });
  }

  runScheduledQueueTasks(options = {}) {
    if (this.pendingQueueTasks.length === 0) {
      return;
    }

    const hasMaxTasks = Number.isFinite(options?.maxTasks) && options.maxTasks > 0;
    const maxTasks = hasMaxTasks ? Math.max(1, Math.floor(options.maxTasks)) : Infinity;
    const hasTimeBudget = Number.isFinite(options?.timeBudgetMs) && options.timeBudgetMs >= 0;
    const timeBudgetMs = hasTimeBudget ? options.timeBudgetMs : Infinity;
    const startTimeMs = hasTimeBudget ? performance.now() : 0;

    let tasksRun = 0;
    while (this.pendingQueueTasks.length > 0 && tasksRun < maxTasks) {
      if (hasTimeBudget && (performance.now() - startTimeMs) >= timeBudgetMs) {
        break;
      }

      const task = this.pendingQueueTasks.shift();
      if (typeof task === 'function') {
        task();
      }
      tasksRun += 1;
    }
  }

  isValidBox3(box) {
    if (!box || !(box instanceof THREE.Box3) || box.isEmpty()) {
      return false;
    }
    return Number.isFinite(box.min.x)
      && Number.isFinite(box.min.y)
      && Number.isFinite(box.min.z)
      && Number.isFinite(box.max.x)
      && Number.isFinite(box.max.y)
      && Number.isFinite(box.max.z);
  }

  normalizeUpAxis(up = '+Y') {
    const normalized = String(up || '+Y').trim().toUpperCase();
    switch (normalized) {
    case '+Z':
    case '-Z':
    case '+X':
    case '-X':
    case '-Y':
    case '+Y':
      return normalized;
    default:
      return '+Y';
    }
  }

  resolveGeospatialReorientationMode(mode = undefined) {
    if (mode === false) return 'off';
    if (typeof mode === 'string') {
      const normalized = mode.trim().toLowerCase();
      if (normalized === 'off' || normalized === 'none' || normalized === 'false') return 'off';
      if (normalized === 'force' || normalized === 'always') return 'force';
    }
    return 'auto';
  }

  getRootTransformArray(tileset) {
    const transform = tileset?.rootTileset?.root?.transform;
    if (!Array.isArray(transform) || transform.length !== 16) {
      return null;
    }
    return transform.every((v) => Number.isFinite(v)) ? transform : null;
  }

  getRootTransformUpVector(tileset) {
    const transform = this.getRootTransformArray(tileset);
    if (!transform) return null;

    // 3D Tiles uses column-major matrices; indices 8..10 represent local +Z transformed.
    const upVector = new THREE.Vector3(transform[8], transform[9], transform[10]);
    if (upVector.lengthSq() <= 1e-12) {
      return null;
    }
    return upVector.normalize();
  }

  isLikelyGeospatialTileset(tileset) {
    const rootTileset = tileset?.rootTileset;
    if (!rootTileset) return false;

    const properties = rootTileset.properties;
    if (properties && typeof properties === 'object') {
      const keys = Object.keys(properties).map((key) => key.toLowerCase());
      if (keys.includes('latitude') && keys.includes('longitude')) {
        return true;
      }
    }

    const transform = this.getRootTransformArray(tileset);
    if (transform) {
      const tx = transform[12];
      const ty = transform[13];
      const tz = transform[14];
      if (Number.isFinite(tx) && Number.isFinite(ty) && Number.isFinite(tz)) {
        // ECEF translations are typically on the order of Earth's radius (~6.3e6m).
        if (Math.hypot(tx, ty, tz) > 1e6) {
          return true;
        }
      }
    }

    return false;
  }

  applyGeospatialReorientation(state) {
    if (!state?.geoGroup || !state?.upGroup || !state?.tileset) {
      return false;
    }

    const mode = state.geospatialReorientationMode || 'auto';
    const shouldReorient = mode === 'force'
      || (mode === 'auto' && this.isLikelyGeospatialTileset(state.tileset));
    if (!shouldReorient) {
      state.geoGroup.quaternion.identity();
      state.geoGroup.updateMatrixWorld(true);
      state.hasGeospatialReoriented = false;
      return false;
    }

    const rootUpVector = this.getRootTransformUpVector(state.tileset);
    if (!rootUpVector) {
      return false;
    }

    const adjustedUpVector = rootUpVector.clone().applyQuaternion(state.upGroup.quaternion);
    if (adjustedUpVector.lengthSq() <= 1e-12) {
      return false;
    }
    adjustedUpVector.normalize();

    const worldUp = new THREE.Vector3(0, 1, 0);
    const levelQuaternion = new THREE.Quaternion().setFromUnitVectors(adjustedUpVector, worldUp);
    state.geoGroup.quaternion.copy(levelQuaternion);
    state.geoGroup.updateMatrixWorld(true);
    state.hasGeospatialReoriented = true;
    return true;
  }

  setUpAxis(targetGroup, up = '+Y') {
    if (!targetGroup) return;

    targetGroup.rotation.set(0, 0, 0);
    const normalized = this.normalizeUpAxis(up);

    switch (normalized) {
    case '+Z':
      targetGroup.rotation.x = -Math.PI / 2;
      break;
    case '-Z':
      targetGroup.rotation.x = Math.PI / 2;
      break;
    case '+X':
      targetGroup.rotation.z = Math.PI / 2;
      break;
    case '-X':
      targetGroup.rotation.z = -Math.PI / 2;
      break;
    case '-Y':
      targetGroup.rotation.x = Math.PI;
      break;
    case '+Y':
    default:
      break;
    }

    targetGroup.updateMatrixWorld(true);
  }

  configureGltfExtensions(tileset, options = {}) {
    if (options.enableGltfExtensions === false) {
      return null;
    }

    const assetPaths = resolveAssetPaths(options, {
      dracoDecoderPath: DEFAULT_DRACO_DECODER_PATH,
      ktx2TranscoderPath: DEFAULT_KTX2_TRANSCODER_PATH
    });

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(assetPaths.dracoDecoderPath);

    const ktxLoader = new KTX2Loader();
    ktxLoader.setTranscoderPath(assetPaths.ktx2TranscoderPath);
    if (this.renderer) {
      ktxLoader.detectSupport(this.renderer);
    }

    const gltfExtensionsPlugin = new GLTFExtensionsPlugin({
      rtc: true,
      dracoLoader,
      ktxLoader
    });
    tileset.registerPlugin(gltfExtensionsPlugin);

    return { dracoLoader, ktxLoader, gltfExtensionsPlugin };
  }

  convertBasicMaterial(material) {
    if (!material?.isMeshBasicMaterial) {
      return material;
    }

    const converted = new THREE.MeshStandardMaterial({
      color: material.color ? material.color.clone() : new THREE.Color(0xffffff),
      map: material.map || null,
      alphaMap: material.alphaMap || null,
      transparent: material.transparent,
      opacity: material.opacity,
      alphaTest: material.alphaTest,
      depthTest: material.depthTest,
      depthWrite: material.depthWrite,
      side: material.side,
      vertexColors: material.vertexColors === true,
      wireframe: material.wireframe,
      fog: material.fog
    });
    converted.name = material.name || converted.name;
    converted.roughness = 0.92;
    converted.metalness = 0.03;
    converted.toneMapped = material.toneMapped;
    converted.visible = material.visible;
    converted.needsUpdate = true;

    return converted;
  }

  normalizeTileModel(scene) {
    if (!scene?.traverse) return;

    const convertedMaterialCache = new WeakMap();
    scene.traverse((obj) => {
      if (!obj?.isMesh) return;

      // Metashape tiled exports can be unlit and omit normals.
      // When converting to lit materials for torch support we need normals.
      if (obj.geometry?.isBufferGeometry && !obj.geometry.getAttribute('normal') && obj.geometry.getAttribute('position')) {
        try {
          obj.geometry.computeVertexNormals();
        } catch {
          // Keep unmodified geometry if normal generation fails on malformed tiles.
        }
      }

      obj.castShadow = true;
      obj.receiveShadow = true;

      const setMaterial = (material, index = -1) => {
        if (!material) return;

        let nextMaterial = material;
        if (material.isMeshBasicMaterial) {
          if (convertedMaterialCache.has(material)) {
            nextMaterial = convertedMaterialCache.get(material);
          } else {
            nextMaterial = this.convertBasicMaterial(material);
            convertedMaterialCache.set(material, nextMaterial);
          }
        }

        if (nextMaterial.map) {
          nextMaterial.map.colorSpace = THREE.SRGBColorSpace;
          nextMaterial.map.needsUpdate = true;
        }
        nextMaterial.needsUpdate = true;

        if (index >= 0 && Array.isArray(obj.material)) {
          obj.material[index] = nextMaterial;
        } else {
          obj.material = nextMaterial;
        }
      };

      if (Array.isArray(obj.material)) {
        obj.material.forEach((material, index) => setMaterial(material, index));
      } else {
        setMaterial(obj.material);
      }
    });
  }

  updateBoundsAndCenter(state) {
    if (!state) return false;

    const { tileset, tilesGroup, upGroup, geoGroup, modelGroup, autoCenter } = state;
    const metadataBounds = new THREE.Box3();
    const hasMetadataBounds = tileset.getBoundingBox(metadataBounds) && this.isValidBox3(metadataBounds);

    // Center once from tileset metadata bounds for deterministic placement.
    if (autoCenter && hasMetadataBounds && !state.hasAutoCentered) {
      const center = metadataBounds.getCenter(new THREE.Vector3());
      tilesGroup.position.set(-center.x, -center.y, -center.z);
      tilesGroup.updateMatrixWorld(true);
      state.hasAutoCentered = true;
    }

    modelGroup.updateMatrixWorld(true);
    const loadedModelBounds = new THREE.Box3().setFromObject(modelGroup);
    if (this.isValidBox3(loadedModelBounds)) {
      modelGroup.userData.boundingBox = loadedModelBounds;
      return true;
    }

    // Fallback for early load phase when geometry is not available yet.
    if (hasMetadataBounds) {
      const metadataModelBounds = metadataBounds.clone();
      const modelSpaceTransform = new THREE.Matrix4()
        .multiplyMatrices(geoGroup.matrix, upGroup.matrix)
        .multiply(tilesGroup.matrix);
      metadataModelBounds.applyMatrix4(modelSpaceTransform);
      if (this.isValidBox3(metadataModelBounds)) {
        modelGroup.userData.boundingBox = metadataModelBounds;
        return true;
      }
    }

    return false;
  }

  applyTriangleBudget(state) {
    if (!state?.maxTriangles || !this.renderer?.info?.render) {
      return;
    }

    const triangles = this.renderer.info.render.triangles;
    if (!Number.isFinite(triangles) || triangles <= 0) {
      return;
    }

    const { tileset, maxTriangles, minErrorTarget, maxErrorTarget } = state;
    const highThreshold = maxTriangles * 1.08;
    const lowThreshold = maxTriangles * 0.75;
    let nextErrorTarget = tileset.errorTarget;

    if (triangles > highThreshold) {
      nextErrorTarget = Math.min(maxErrorTarget, nextErrorTarget * 1.2 + 0.5);
    } else if (triangles < lowThreshold) {
      nextErrorTarget = Math.max(minErrorTarget, nextErrorTarget * 0.9);
    }

    if (Math.abs(nextErrorTarget - tileset.errorTarget) > 0.05) {
      tileset.errorTarget = nextErrorTarget;
    }
  }

  createAdaptiveState(tileset, options, minErrorTarget, maxErrorTarget) {
    if (options.adaptiveQuality === false) {
      return null;
    }

    const baseErrorTarget = (typeof options.errorTarget === 'number' && options.errorTarget > 0)
      ? options.errorTarget
      : (typeof tileset.errorTarget === 'number' && tileset.errorTarget > 0 ? tileset.errorTarget : 12);

    const movingErrorTarget = this.clamp(
      typeof options.adaptiveMovingErrorTarget === 'number'
        ? options.adaptiveMovingErrorTarget
        : Math.max(baseErrorTarget * 2.0, baseErrorTarget + 7),
      minErrorTarget,
      maxErrorTarget
    );

    const stillErrorTarget = this.clamp(
      typeof options.adaptiveStillErrorTarget === 'number'
        ? options.adaptiveStillErrorTarget
        : Math.max(minErrorTarget, baseErrorTarget * 0.75),
      minErrorTarget,
      maxErrorTarget
    );

    const baseMaxTilesProcessed = (typeof options.maxTilesProcessed === 'number' && options.maxTilesProcessed > 0)
      ? options.maxTilesProcessed
      : (typeof tileset.maxTilesProcessed === 'number' && tileset.maxTilesProcessed > 0 ? tileset.maxTilesProcessed : 224);

    const minTilesProcessed = Math.max(8, Math.round(
      typeof options.adaptiveMinTilesProcessed === 'number'
        ? options.adaptiveMinTilesProcessed
        : 24
    ));
    const maxTilesProcessed = Math.max(minTilesProcessed, Math.round(
      typeof options.adaptiveMaxTilesProcessed === 'number'
        ? options.adaptiveMaxTilesProcessed
        : Math.max(baseMaxTilesProcessed, 512)
    ));

    const movingTilesProcessed = this.clamp(
      Math.round(
        typeof options.adaptiveMovingMaxTilesProcessed === 'number'
          ? options.adaptiveMovingMaxTilesProcessed
          : baseMaxTilesProcessed * 0.25
      ),
      minTilesProcessed,
      maxTilesProcessed
    );

    const stillTilesProcessed = this.clamp(
      Math.round(
        typeof options.adaptiveStillMaxTilesProcessed === 'number'
          ? options.adaptiveStillMaxTilesProcessed
          : baseMaxTilesProcessed
      ),
      minTilesProcessed,
      maxTilesProcessed
    );

    const fastMovingErrorTarget = this.clamp(
      typeof options.adaptiveFastMovingErrorTarget === 'number'
        ? options.adaptiveFastMovingErrorTarget
        : Math.max(movingErrorTarget * 1.35, movingErrorTarget + 6),
      minErrorTarget,
      maxErrorTarget
    );

    const fastMovingTilesProcessed = this.clamp(
      Math.round(
        typeof options.adaptiveFastMovingMaxTilesProcessed === 'number'
          ? options.adaptiveFastMovingMaxTilesProcessed
          : movingTilesProcessed * 0.4
      ),
      minTilesProcessed,
      maxTilesProcessed
    );

    return {
      linearSpeedThreshold: (typeof options.adaptiveLinearSpeedThreshold === 'number' && options.adaptiveLinearSpeedThreshold > 0)
        ? options.adaptiveLinearSpeedThreshold
        : 0.12,
      fastLinearSpeedThreshold: (typeof options.adaptiveFastLinearSpeedThreshold === 'number' && options.adaptiveFastLinearSpeedThreshold > 0)
        ? options.adaptiveFastLinearSpeedThreshold
        : 0.85,
      angularSpeedThreshold: (typeof options.adaptiveAngularSpeedThreshold === 'number' && options.adaptiveAngularSpeedThreshold > 0)
        ? options.adaptiveAngularSpeedThreshold
        : 0.4,
      settleDelayMs: (typeof options.adaptiveSettleDelayMs === 'number' && options.adaptiveSettleDelayMs >= 0)
        ? options.adaptiveSettleDelayMs
        : 450,
      errorLerp: this.clamp(
        (typeof options.adaptiveErrorLerp === 'number') ? options.adaptiveErrorLerp : 0.12,
        0.02,
        1
      ),
      movingErrorTarget,
      fastMovingErrorTarget,
      stillErrorTarget,
      minTilesProcessed,
      maxTilesProcessed,
      movingTilesProcessed,
      fastMovingTilesProcessed,
      stillTilesProcessed,
      lastSampleTimeMs: 0,
      lastMovementTimeMs: 0,
      lastPosition: new THREE.Vector3(),
      lastQuaternion: new THREE.Quaternion(),
      samplePosition: new THREE.Vector3(),
      sampleQuaternion: new THREE.Quaternion(),
      initialized: false
    };
  }

  applyAdaptiveQuality(state, camera) {
    if (!state?.adaptive || !camera) {
      return;
    }

    const { adaptive, tileset, minErrorTarget, maxErrorTarget } = state;
    const now = performance.now();

    camera.updateMatrixWorld?.(true);
    camera.getWorldPosition(adaptive.samplePosition);
    camera.getWorldQuaternion(adaptive.sampleQuaternion);

    if (!adaptive.initialized) {
      adaptive.lastSampleTimeMs = now;
      adaptive.lastMovementTimeMs = now;
      adaptive.lastPosition.copy(adaptive.samplePosition);
      adaptive.lastQuaternion.copy(adaptive.sampleQuaternion);
      adaptive.initialized = true;
      return;
    }

    const dtSeconds = Math.max((now - adaptive.lastSampleTimeMs) / 1000, 1e-6);
    const distance = adaptive.samplePosition.distanceTo(adaptive.lastPosition);
    const dot = this.clamp(Math.abs(adaptive.sampleQuaternion.dot(adaptive.lastQuaternion)), -1, 1);
    const angularDistance = 2 * Math.acos(dot);
    const linearSpeed = distance / dtSeconds;
    const angularSpeed = angularDistance / dtSeconds;

    const movingLinearly = linearSpeed > adaptive.linearSpeedThreshold;
    const movingAngularly = angularSpeed > adaptive.angularSpeedThreshold;
    const movingFastLinearly = linearSpeed > adaptive.fastLinearSpeedThreshold;
    const movingNow = movingLinearly || movingAngularly;
    if (movingNow) {
      adaptive.lastMovementTimeMs = now;
    }
    const settled = (now - adaptive.lastMovementTimeMs) >= adaptive.settleDelayMs;

    let targetErrorTarget = adaptive.stillErrorTarget;
    let targetTilesProcessed = adaptive.stillTilesProcessed;
    if (!settled) {
      if (movingFastLinearly) {
        targetErrorTarget = adaptive.fastMovingErrorTarget;
        targetTilesProcessed = adaptive.fastMovingTilesProcessed;
      } else {
        targetErrorTarget = adaptive.movingErrorTarget;
        targetTilesProcessed = adaptive.movingTilesProcessed;
      }
    }

    if (state.maxTriangles && this.renderer?.info?.render) {
      const triangles = this.renderer.info.render.triangles;
      if (Number.isFinite(triangles) && triangles > 0) {
        const highThreshold = state.maxTriangles * 1.08;
        const lowThreshold = state.maxTriangles * 0.75;

        if (triangles > highThreshold) {
          targetErrorTarget = Math.max(targetErrorTarget, targetErrorTarget * 1.2 + 0.5);
          targetTilesProcessed = Math.max(adaptive.minTilesProcessed, Math.round(targetTilesProcessed * 0.85));
        } else if (triangles < lowThreshold && settled) {
          targetErrorTarget *= 0.92;
          targetTilesProcessed = Math.min(adaptive.maxTilesProcessed, Math.round(targetTilesProcessed * 1.08));
        }
      }
    }

    targetErrorTarget = this.clamp(targetErrorTarget, minErrorTarget, maxErrorTarget);
    targetTilesProcessed = this.clamp(
      Math.round(targetTilesProcessed),
      adaptive.minTilesProcessed,
      adaptive.maxTilesProcessed
    );

    const smoothedErrorTarget = tileset.errorTarget + (targetErrorTarget - tileset.errorTarget) * adaptive.errorLerp;
    if (Math.abs(smoothedErrorTarget - tileset.errorTarget) > 0.04) {
      tileset.errorTarget = smoothedErrorTarget;
    }

    if (typeof tileset.maxTilesProcessed === 'number' && Math.abs(tileset.maxTilesProcessed - targetTilesProcessed) >= 1) {
      tileset.maxTilesProcessed = targetTilesProcessed;
    }

    adaptive.lastSampleTimeMs = now;
    adaptive.lastPosition.copy(adaptive.samplePosition);
    adaptive.lastQuaternion.copy(adaptive.sampleQuaternion);
  }

  applyOptions(tileset, options) {
    if (!options) {
      return;
    }

    const {
      errorTarget,
      maxDepth,
      loadSiblings,
      optimizedLoadStrategy,
      maxTilesProcessed,
      fetchOptions
    } = options;

    if (typeof errorTarget === 'number') tileset.errorTarget = errorTarget;
    else tileset.errorTarget = 12;

    if (typeof maxDepth === 'number') tileset.maxDepth = maxDepth;
    else tileset.maxDepth = 25;

    if (typeof loadSiblings === 'boolean') tileset.loadSiblings = loadSiblings;
    else tileset.loadSiblings = true;

    if (typeof optimizedLoadStrategy === 'boolean') tileset.optimizedLoadStrategy = optimizedLoadStrategy;
    else tileset.optimizedLoadStrategy = false;

    if (typeof maxTilesProcessed === 'number') tileset.maxTilesProcessed = maxTilesProcessed;
    else tileset.maxTilesProcessed = 224;

    if (fetchOptions && typeof fetchOptions === 'object') tileset.fetchOptions = fetchOptions;
  }

  load(url, options = {}) {
    return new Promise((resolve, reject) => {
      const tileset = new BelowTilesRenderer(url);
      // Add support for subtree-based implicit tiling, common in 3D Tiles 1.1 datasets.
      tileset.registerPlugin(new ImplicitTilingPlugin());
      this.configureScheduling(tileset);
      this.applyOptions(tileset, options);
      this.configureGltfExtensions(tileset, options);

      const modelGroup = new THREE.Group();
      const geoGroup = new THREE.Group();
      const upGroup = new THREE.Group();
      modelGroup.add(geoGroup);
      geoGroup.add(upGroup);

      const tilesGroup = tileset.group;
      upGroup.add(tilesGroup);
      this.setUpAxis(upGroup, options.up || '+Y');

      const state = {
        tileset,
        modelGroup,
        geoGroup,
        upGroup,
        tilesGroup,
        autoCenter: options.autoCenter !== false,
        hasAutoCentered: false,
        geospatialReorientationMode: this.resolveGeospatialReorientationMode(options.geospatialReorientation),
        hasGeospatialReoriented: false,
        maxTriangles: Object.prototype.hasOwnProperty.call(options, 'maxTriangles')
          ? ((typeof options.maxTriangles === 'number' && options.maxTriangles > 0) ? options.maxTriangles : null)
          : 1000000,
        minErrorTarget: (typeof options.minErrorTarget === 'number' && options.minErrorTarget > 0) ? options.minErrorTarget : 2,
        maxErrorTarget: (typeof options.maxErrorTarget === 'number' && options.maxErrorTarget > 0) ? options.maxErrorTarget : 64,
        usePerEyeResolution: options.usePerEyeResolution !== false,
        useDrawingBufferResolution: options.useDrawingBufferResolution !== false,
        usePerEyeCameras: options.usePerEyeCameras !== false,
        adaptive: null,
        boundsDirty: true,
        onLoadModel: null
      };
      state.adaptive = this.createAdaptiveState(tileset, options, state.minErrorTarget, state.maxErrorTarget);

      if (this.camera) {
        const resolutionConfig = this.getResolutionConfig(state);
        const traversalCameras = this.syncTilesetTraversalCameras(tileset, this.camera, resolutionConfig);
        this.setResolutionForCamera(tileset, this.camera, traversalCameras, resolutionConfig);
      }

      state.onLoadModel = (event) => {
        if (event?.scene) {
          this.normalizeTileModel(event.scene);
        }
        state.boundsDirty = true;
      };
      tileset.addEventListener('load-model', state.onLoadModel);

      let abortHandler = null;
      const cleanupLoadListeners = () => {
        tileset.removeEventListener('load-tileset', handleLoad);
        tileset.removeEventListener('load-error', handleError);
        if (abortHandler && options.signal) {
          options.signal.removeEventListener('abort', abortHandler);
        }
      };

      const handleLoad = () => {
        cleanupLoadListeners();
        this.applyGeospatialReorientation(state);
        this.updateBoundsAndCenter(state);

        this.activeTilesets.add(tileset);
        this.tilesetStates.set(tileset, state);
        resolve({ group: modelGroup, tileset });
      };

      const handleError = (event) => {
        cleanupLoadListeners();
        tileset.removeEventListener('load-model', state.onLoadModel);
        tileset.dispose();
        reject(event?.error || new Error('Tileset failed to load'));
      };

      tileset.addEventListener('load-tileset', handleLoad);
      tileset.addEventListener('load-error', handleError);

      if (options.signal) {
        abortHandler = () => {
          cleanupLoadListeners();
          tileset.removeEventListener('load-model', state.onLoadModel);
          tileset.dispose();
          reject(new Error('Loading cancelled'));
        };
        options.signal.addEventListener('abort', abortHandler);
        if (options.signal.aborted) {
          abortHandler();
          return;
        }
      }

      tileset.update();
    });
  }

  update(activeCamera = null, options = {}) {
    const queueOptions = options?.queueOptions;
    this.runScheduledQueueTasks(queueOptions);

    const camera = activeCamera || this.camera;
    if (camera && camera !== this.camera) {
      this.setCamera(camera);
    }

    if (this.renderer && camera) {
      this.activeTilesets.forEach((tileset) => {
        const state = this.tilesetStates.get(tileset);
        const resolutionConfig = this.getResolutionConfig(state);
        const traversalCameras = this.syncTilesetTraversalCameras(tileset, camera, resolutionConfig);
        this.setResolutionForCamera(tileset, camera, traversalCameras, resolutionConfig);
      });
    }

    this.activeTilesets.forEach((tileset) => {
      const state = this.tilesetStates.get(tileset);
      if (state) {
        if (state.adaptive) {
          this.applyAdaptiveQuality(state, camera);
        } else {
          this.applyTriangleBudget(state);
        }
      }
      tileset.update();

      if (state && state.boundsDirty) {
        this.updateBoundsAndCenter(state);
        state.boundsDirty = false;
      }
    });
  }

  disposeTileset(tileset) {
    if (!tileset) {
      return;
    }
    if (this.activeTilesets.has(tileset)) {
      this.activeTilesets.delete(tileset);
    }
    const state = this.tilesetStates.get(tileset);
    if (state?.onLoadModel) {
      tileset.removeEventListener('load-model', state.onLoadModel);
    }
    this.tilesetStates.delete(tileset);
    tileset.dispose();
  }

  dispose() {
    this.pendingQueueTasks.length = 0;
    this.activeTilesets.forEach((tileset) => {
      const state = this.tilesetStates.get(tileset);
      if (state?.onLoadModel) {
        tileset.removeEventListener('load-model', state.onLoadModel);
      }
      tileset.dispose();
    });
    this.activeTilesets.clear();
    this.tilesetStates.clear();
  }
}
