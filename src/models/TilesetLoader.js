import * as THREE from 'three';
import { Scheduler } from '3d-tiles-renderer';
import { TilesRenderer } from '3d-tiles-renderer/three';
import { ImplicitTilingPlugin } from '3d-tiles-renderer/plugins';
import { GLTFExtensionsPlugin } from '3d-tiles-renderer/three/plugins';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { resolveAssetPaths } from '../utils/AssetPathUtils.js';
import { applyTilesetVRProfileDefaults } from '../utils/VRPerformanceProfile.js';

const DEFAULT_DRACO_DECODER_PATH = 'https://unpkg.com/three@0.179.1/examples/jsm/libs/draco/gltf/';
const DEFAULT_KTX2_TRANSCODER_PATH = 'https://unpkg.com/three@0.179.1/examples/jsm/libs/basis/';

const _idleSamplePosition = new THREE.Vector3();
const _idleSampleQuaternion = new THREE.Quaternion();

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
    this.xrSession = null;
    this._resolutionVec2 = new THREE.Vector2();

    // Diagnostics read by PerfMonitor.
    this.lastUpdateDurationMs = 0;
    this.maxUpdateDurationMs = 0;
    this.updateRunCount = 0;
    this.updateGatedCount = 0;
  }

  clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  setRenderer(renderer) {
    this.renderer = renderer;
    this.updateResolution();
  }

  setXRSession(session = null) {
    if (session === this.xrSession) return;
    this.xrSession = session;
    Scheduler.setXRSession(session);
  }

  getResolutionConfig(state) {
    return {
      usePerEyeResolution: state?.usePerEyeResolution !== false,
      useDrawingBufferResolution: state?.useDrawingBufferResolution !== false,
      // Default false: the XR ArrayCamera carries a union projection spanning
      // both eyes (three r179), so a single traversal covers VR at half the
      // cost of registering each eye camera.
      usePerEyeCameras: state?.usePerEyeCameras === true
    };
  }

  getDesiredTraversalCameras(camera, config = {}) {
    if (!camera) {
      return [];
    }

    const usePerEyeCameras = config?.usePerEyeCameras === true;
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
        if (state) {
          state.traversalCameras = traversalCameras;
          state.syncedTopCamera = this.camera;
          state.lastResolutionWidth = -1;
          state.lastResolutionHeight = -1;
        }
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
      if (state) {
        state.traversalCameras = traversalCameras;
        state.syncedTopCamera = this.camera;
        state.lastResolutionWidth = -1;
        state.lastResolutionHeight = -1;
      }
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
    if (Number.isFinite(options.ktxWorkerLimit) && options.ktxWorkerLimit > 0) {
      ktxLoader.setWorkerLimit(Math.max(1, Math.floor(options.ktxWorkerLimit)));
    }
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

  convertBasicMaterial(material, lighting = 'standard') {
    if (!material?.isMeshBasicMaterial) {
      return material;
    }

    const commonProperties = {
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
    };

    // Lambert shading is markedly cheaper per covered pixel than the PBR
    // pipeline, which matters at VR resolutions on standalone headsets.
    const converted = lighting === 'lambert'
      ? new THREE.MeshLambertMaterial(commonProperties)
      : new THREE.MeshStandardMaterial(commonProperties);
    converted.name = material.name || converted.name;
    if (converted.isMeshStandardMaterial) {
      converted.roughness = 0.92;
      converted.metalness = 0.03;
    }
    converted.toneMapped = material.toneMapped;
    converted.visible = material.visible;
    converted.needsUpdate = true;

    return converted;
  }

  normalizeTileModel(scene, state = null) {
    if (!scene?.traverse) return;

    const castShadow = state?.tileCastShadow !== false;
    const receiveShadow = state?.tileReceiveShadow !== false;
    const lighting = state?.tileLighting === 'lambert' ? 'lambert' : 'standard';

    const convertedMaterialCache = new WeakMap();
    scene.traverse((obj) => {
      if (!obj?.isMesh) return;

      // Metashape tiled exports can be unlit and omit normals.
      // When converting to lit materials for torch support we need normals.
      // This runs on the main thread and can hitch on dense tiles, but only
      // at load time and only when normals are absent.
      if (obj.geometry?.isBufferGeometry && !obj.geometry.getAttribute('normal') && obj.geometry.getAttribute('position')) {
        try {
          obj.geometry.computeVertexNormals();
        } catch {
          // Keep unmodified geometry if normal generation fails on malformed tiles.
        }
      }

      obj.castShadow = castShadow;
      obj.userData.belowTileCastShadowDefault = castShadow;
      obj.receiveShadow = receiveShadow;

      const setMaterial = (material, index = -1) => {
        if (!material) return;

        let nextMaterial = material;
        if (material.isMeshBasicMaterial) {
          if (convertedMaterialCache.has(material)) {
            nextMaterial = convertedMaterialCache.get(material);
          } else {
            nextMaterial = this.convertBasicMaterial(material, lighting);
            convertedMaterialCache.set(material, nextMaterial);
          }
        }

        if (nextMaterial.map) {
          nextMaterial.map.colorSpace = THREE.SRGBColorSpace;
          nextMaterial.map.needsUpdate = true;
          // Upload now rather than stalling the frame the tile first draws.
          this.renderer?.initTexture?.(nextMaterial.map);
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

  getActiveTriangleBudget(state, isXR = false) {
    if (!state) return null;
    return isXR
      ? (state.vrMaxTriangles || state.maxTriangles || null)
      : (state.maxTriangles || null);
  }

  setSceneCastShadow(scene, castShadow) {
    if (!scene?.traverse) return;
    scene.traverse((object) => {
      if (object?.isMesh) {
        object.castShadow = castShadow;
      }
    });
  }

  _restoreTileShadowCasters(state) {
    if (!state?.loadedTileScenes) return;
    state.loadedTileScenes.forEach((scene) => {
      this.setSceneCastShadow(scene, state.tileCastShadow !== false);
    });
    state.shadowCasterTiles.clear();
    state.shadowCastersLimited = false;
  }

  _updateTileShadowCasters(state, camera, nowMs, isXR = false) {
    if (!state?.loadedTileScenes || state.vrShadowCasterMode === 'all') {
      if (!isXR && state?.shadowCastersLimited) {
        this._restoreTileShadowCasters(state);
      }
      return;
    }

    if (!isXR) {
      if (state.shadowCastersLimited) {
        this._restoreTileShadowCasters(state);
      }
      return;
    }

    if (state.tileCastShadow === false || state.vrShadowCasterMode === 'none') {
      if (!state.shadowCastersLimited) {
        state.loadedTileScenes.forEach((scene) => this.setSceneCastShadow(scene, false));
        state.shadowCastersLimited = true;
      }
      state.shadowCasterTiles.forEach((tile) => {
        if (tile?.engineData?.scene) {
          this.setSceneCastShadow(tile.engineData.scene, false);
        }
      });
      state.shadowCasterTiles = new Set();
      return;
    }

    if ((nowMs - state.lastShadowCasterUpdateMs) < state.shadowCasterUpdateIntervalMs) {
      return;
    }
    state.lastShadowCasterUpdateMs = nowMs;

    const radius = state.vrShadowCasterRadius;
    const radiusSq = Number.isFinite(radius) && radius > 0 ? radius * radius : Infinity;
    const candidates = [];
    state.tileset.visibleTiles.forEach((tile) => {
      const scene = tile?.engineData?.scene;
      if (!scene) return;

      const distance = Number.isFinite(tile.traversal?.distanceFromCamera)
        ? tile.traversal.distanceFromCamera
        : Infinity;
      if (distance * distance > radiusSq) return;

      candidates.push({ tile, scene, distance });
    });

    candidates.sort((a, b) => a.distance - b.distance);
    const desired = new Set(
      candidates
        .slice(0, state.vrMaxShadowCastingTiles)
        .map(({ tile }) => tile)
    );

    if (!state.shadowCastersLimited) {
      state.loadedTileScenes.forEach((scene) => this.setSceneCastShadow(scene, false));
      state.shadowCastersLimited = true;
    }

    state.shadowCasterTiles.forEach((tile) => {
      if (!desired.has(tile) && tile?.engineData?.scene) {
        this.setSceneCastShadow(tile.engineData.scene, false);
      }
    });
    desired.forEach((tile) => {
      if (!state.shadowCasterTiles.has(tile)) {
        this.setSceneCastShadow(tile.engineData.scene, true);
      }
    });

    state.shadowCasterTiles = desired;
    state.shadowCastersLimited = true;
  }

  applyTriangleBudget(state, isXR = false) {
    const maxTriangles = this.getActiveTriangleBudget(state, isXR);
    if (!maxTriangles || !this.renderer?.info?.render) {
      return;
    }

    const triangles = this.renderer.info.render.triangles;
    if (!Number.isFinite(triangles) || triangles <= 0) {
      return;
    }

    const { tileset, minErrorTarget, maxErrorTarget } = state;
    const highThreshold = maxTriangles * 1.08;
    const lowThreshold = maxTriangles * 0.75;
    let nextErrorTarget = tileset.errorTarget;

    if (triangles > highThreshold) {
      nextErrorTarget = Math.min(maxErrorTarget, nextErrorTarget * 1.2 + 0.5);
    } else if (triangles < lowThreshold) {
      nextErrorTarget = Math.max(minErrorTarget, nextErrorTarget * 0.9);
    }

    if (isXR && state.vrErrorTargetFloor > 0) {
      nextErrorTarget = Math.max(nextErrorTarget, state.vrErrorTargetFloor);
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
      : (typeof tileset.errorTarget === 'number' && tileset.errorTarget > 0 ? tileset.errorTarget : 16);

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

  applyAdaptiveQuality(state, camera, isXR = false) {
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

    const maxTriangles = this.getActiveTriangleBudget(state, isXR);
    if (maxTriangles && this.renderer?.info?.render) {
      const triangles = this.renderer.info.render.triangles;
      if (Number.isFinite(triangles) && triangles > 0) {
        const highThreshold = maxTriangles * 1.08;
        const lowThreshold = maxTriangles * 0.75;

        if (triangles > highThreshold) {
          targetErrorTarget = Math.max(targetErrorTarget, targetErrorTarget * 1.2 + 0.5);
          targetTilesProcessed = Math.max(adaptive.minTilesProcessed, Math.round(targetTilesProcessed * 0.85));
        } else if (triangles < lowThreshold && settled) {
          targetErrorTarget *= 0.92;
          targetTilesProcessed = Math.min(adaptive.maxTilesProcessed, Math.round(targetTilesProcessed * 1.08));
        }
      }
    }

    // In VR the "still" state must not refine below the floor: standing
    // still right next to a surface is exactly when the headset has the
    // least frame headroom for extra geometry.
    if (isXR && state.vrErrorTargetFloor > 0) {
      targetErrorTarget = Math.max(targetErrorTarget, state.vrErrorTargetFloor);
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
      loadAncestors,
      optimizedLoadStrategy,
      maxTilesProcessed,
      fetchOptions
    } = options;

    // Preserve 3d-tiles-renderer defaults unless a caller deliberately opts out.
    if (typeof errorTarget === 'number') tileset.errorTarget = errorTarget;
    if (typeof maxDepth === 'number') tileset.maxDepth = maxDepth;
    if (typeof loadSiblings === 'boolean') tileset.loadSiblings = loadSiblings;
    if (typeof loadAncestors === 'boolean') {
      tileset.loadAncestors = loadAncestors;
    } else if (typeof optimizedLoadStrategy === 'boolean') {
      // Backward compatibility with 3d-tiles-renderer <= 0.4.x terminology.
      tileset.loadAncestors = !optimizedLoadStrategy;
    }
    if (typeof maxTilesProcessed === 'number') tileset.maxTilesProcessed = maxTilesProcessed;

    if (fetchOptions && typeof fetchOptions === 'object') tileset.fetchOptions = fetchOptions;
  }

  load(url, options = {}) {
    return new Promise((resolve, reject) => {
      const tileset = new BelowTilesRenderer(url);
      const vrProfileDefaults = applyTilesetVRProfileDefaults(options);
      // Add support for subtree-based implicit tiling, common in 3D Tiles 1.1 datasets.
      tileset.registerPlugin(new ImplicitTilingPlugin());
      this.configureScheduling(tileset);
      this.applyOptions(tileset, options);
      this.configureGltfExtensions(tileset, {
        ...options,
        ktxWorkerLimit: vrProfileDefaults.ktxWorkerLimit
      });

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
        maxTriangles: (typeof options.maxTriangles === 'number' && options.maxTriangles > 0) ? options.maxTriangles : null,
        resolvedVRPerformanceProfile: vrProfileDefaults.resolvedVRPerformanceProfile,
        vrMaxTriangles: vrProfileDefaults.vrMaxTriangles,
        minErrorTarget: (typeof options.minErrorTarget === 'number' && options.minErrorTarget > 0) ? options.minErrorTarget : 2,
        maxErrorTarget: (typeof options.maxErrorTarget === 'number' && options.maxErrorTarget > 0) ? options.maxErrorTarget : 64,
        usePerEyeResolution: options.usePerEyeResolution !== false,
        useDrawingBufferResolution: options.useDrawingBufferResolution !== false,
        usePerEyeCameras: options.usePerEyeCameras === true,
        tileCastShadow: options.tileCastShadow !== false,
        tileReceiveShadow: options.tileReceiveShadow !== false,
        tileLighting: options.tileLighting === 'lambert' ? 'lambert' : 'standard',
        vrShadowCasterMode: vrProfileDefaults.vrShadowCasterMode,
        vrMaxShadowCastingTiles: vrProfileDefaults.vrMaxShadowCastingTiles,
        vrShadowCasterRadius: vrProfileDefaults.vrShadowCasterRadius,
        shadowCasterUpdateIntervalMs: (typeof options.shadowCasterUpdateIntervalMs === 'number' && options.shadowCasterUpdateIntervalMs >= 0)
          ? options.shadowCasterUpdateIntervalMs
          : 180,
        lastShadowCasterUpdateMs: 0,
        loadedTileScenes: new Set(),
        shadowCasterTiles: new Set(),
        shadowCastersLimited: false,
        vrErrorTargetFloor: vrProfileDefaults.vrErrorTargetFloor,
        vrMaxDepth: (typeof options.vrMaxDepth === 'number' && options.vrMaxDepth > 0)
          ? Math.floor(options.vrMaxDepth)
          : null,
        desktopMaxDepth: null,
        boundsUpdateIntervalMs: (typeof options.boundsUpdateIntervalMs === 'number' && options.boundsUpdateIntervalMs >= 0)
          ? options.boundsUpdateIntervalMs
          : 500,
        lastBoundsUpdateMs: 0,
        traversalCameras: [],
        syncedTopCamera: null,
        lastResolutionWidth: -1,
        lastResolutionHeight: -1,
        idle: {
          enabled: options.idleGating !== false,
          posEps: (typeof options.idlePositionEpsilon === 'number' && options.idlePositionEpsilon > 0)
            ? options.idlePositionEpsilon
            : 0.02,
          angEps: (typeof options.idleAngleEpsilon === 'number' && options.idleAngleEpsilon > 0)
            ? options.idleAngleEpsilon
            : 0.01,
          heartbeatMs: (typeof options.idleHeartbeatMs === 'number' && options.idleHeartbeatMs >= 0)
            ? options.idleHeartbeatMs
            : 250,
          lastPos: new THREE.Vector3(),
          lastQuat: new THREE.Quaternion(),
          lastRealUpdateMs: 0,
          initialized: false,
          forceUpdate: true
        },
        adaptive: null,
        boundsDirty: true,
        onLoadModel: null,
        onDisposeModel: null,
        onNeedsUpdate: null
      };
      state.adaptive = this.createAdaptiveState(tileset, options, state.minErrorTarget, state.maxErrorTarget);

      if (this.camera) {
        const resolutionConfig = this.getResolutionConfig(state);
        const traversalCameras = this.syncTilesetTraversalCameras(tileset, this.camera, resolutionConfig);
        this.setResolutionForCamera(tileset, this.camera, traversalCameras, resolutionConfig);
      }

      state.onLoadModel = (event) => {
        if (event?.scene) {
          this.normalizeTileModel(event.scene, state);
          state.loadedTileScenes.add(event.scene);
          if (state.shadowCastersLimited) {
            this.setSceneCastShadow(event.scene, false);
          }
        }
        state.boundsDirty = true;
      };
      tileset.addEventListener('load-model', state.onLoadModel);

      state.onDisposeModel = (event) => {
        if (event?.scene) {
          state.loadedTileScenes.delete(event.scene);
        }
        if (event?.tile) {
          state.shadowCasterTiles.delete(event.tile);
        }
      };
      tileset.addEventListener('dispose-model', state.onDisposeModel);

      // 3d-tiles-renderer fires needs-update when queued work lands; use it
      // to break out of idle gating without polling.
      state.onNeedsUpdate = () => {
        state.idle.forceUpdate = true;
      };
      tileset.addEventListener('needs-update', state.onNeedsUpdate);

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
        tileset.removeEventListener('dispose-model', state.onDisposeModel);
        tileset.removeEventListener('needs-update', state.onNeedsUpdate);
        tileset.dispose();
        reject(event?.error || new Error('Tileset failed to load'));
      };

      tileset.addEventListener('load-tileset', handleLoad);
      tileset.addEventListener('load-error', handleError);

      if (options.signal) {
        abortHandler = () => {
          cleanupLoadListeners();
          tileset.removeEventListener('load-model', state.onLoadModel);
          tileset.removeEventListener('dispose-model', state.onDisposeModel);
          tileset.removeEventListener('needs-update', state.onNeedsUpdate);
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

  _isTilesetBusy(tileset) {
    return Boolean(
      tileset.downloadQueue?.running
      || tileset.parseQueue?.running
      || tileset.processNodeQueue?.running
      || this.pendingQueueTasks.length > 0
    );
  }

  _shouldRunTilesUpdate(state, camera, nowMs) {
    const idle = state.idle;
    if (!idle || !idle.enabled || idle.forceUpdate || !idle.initialized) {
      return true;
    }
    if (this._isTilesetBusy(state.tileset)) {
      return true;
    }
    // Heartbeat catches slow drift below the epsilons (and any missed event).
    if ((nowMs - idle.lastRealUpdateMs) >= idle.heartbeatMs) {
      return true;
    }
    if (!camera) {
      return false;
    }

    camera.getWorldPosition(_idleSamplePosition);
    camera.getWorldQuaternion(_idleSampleQuaternion);
    if (_idleSamplePosition.distanceToSquared(idle.lastPos) > idle.posEps * idle.posEps) {
      return true;
    }
    const dot = Math.min(1, Math.abs(_idleSampleQuaternion.dot(idle.lastQuat)));
    return (2 * Math.acos(dot)) > idle.angEps;
  }

  _markTilesUpdateRan(state, camera, nowMs) {
    const idle = state.idle;
    if (!idle) return;
    if (camera) {
      camera.getWorldPosition(idle.lastPos);
      camera.getWorldQuaternion(idle.lastQuat);
      idle.initialized = true;
    }
    idle.lastRealUpdateMs = nowMs;
    idle.forceUpdate = false;
  }

  _syncCamerasIfNeeded(tileset, state, camera) {
    const config = this.getResolutionConfig(state);
    const subCameras = (config.usePerEyeCameras && camera.isArrayCamera && Array.isArray(camera.cameras))
      ? camera.cameras
      : null;

    let needsSync = state.syncedTopCamera !== camera;
    if (!needsSync) {
      const cached = state.traversalCameras;
      if (subCameras) {
        if (cached.length !== subCameras.length) {
          needsSync = true;
        } else {
          for (let i = 0; i < subCameras.length; i += 1) {
            if (cached[i] !== subCameras[i]) {
              needsSync = true;
              break;
            }
          }
        }
      } else if (cached.length !== 1 || cached[0] !== camera) {
        needsSync = true;
      }
    }

    if (needsSync) {
      state.traversalCameras = this.syncTilesetTraversalCameras(tileset, camera, config);
      state.syncedTopCamera = camera;
      state.lastResolutionWidth = -1;
      state.lastResolutionHeight = -1;
    }

    this._syncResolutionIfNeeded(tileset, state, camera, config);
  }

  _syncResolutionIfNeeded(tileset, state, camera, config) {
    let width = 0;
    let height = 0;

    if (config.usePerEyeResolution && config.usePerEyeCameras && camera.isArrayCamera) {
      const viewport = state.traversalCameras[0]?.viewport;
      width = viewport?.z || 0;
      height = viewport?.w || 0;
    } else if (config.useDrawingBufferResolution && this.renderer?.getDrawingBufferSize) {
      this.renderer.getDrawingBufferSize(this._resolutionVec2);
      width = this._resolutionVec2.x;
      height = this._resolutionVec2.y;
    }

    if (width > 0 && height > 0) {
      if (width === state.lastResolutionWidth && height === state.lastResolutionHeight) {
        return;
      }
      state.lastResolutionWidth = width;
      state.lastResolutionHeight = height;
    }

    this.setResolutionForCamera(tileset, camera, state.traversalCameras, config);
  }

  _applyVRDepthClamp(state, isXR) {
    if (!state.vrMaxDepth) return;
    const tileset = state.tileset;
    if (isXR) {
      if (state.desktopMaxDepth === null) {
        state.desktopMaxDepth = tileset.maxDepth;
      }
      tileset.maxDepth = state.vrMaxDepth;
    } else if (state.desktopMaxDepth !== null) {
      tileset.maxDepth = state.desktopMaxDepth;
      state.desktopMaxDepth = null;
    }
  }

  _maybeUpdateBounds(state, nowMs, isXR) {
    const hasValidBox = this.isValidBox3(state.modelGroup?.userData?.boundingBox);

    // Bounds recompute traverses every loaded tile; never pay that while
    // presenting once a usable box exists.
    if (isXR && hasValidBox) {
      return;
    }
    if (hasValidBox && (nowMs - state.lastBoundsUpdateMs) < state.boundsUpdateIntervalMs) {
      return;
    }

    this.updateBoundsAndCenter(state);
    state.lastBoundsUpdateMs = nowMs;
    state.boundsDirty = false;
  }

  update(activeCamera = null, options = {}) {
    const startMs = performance.now();
    const queueOptions = options?.queueOptions;
    const isXR = options?.isXR === true;
    this.runScheduledQueueTasks(queueOptions);

    const camera = activeCamera || this.camera;
    if (camera && camera !== this.camera) {
      this.setCamera(camera);
    }

    this.activeTilesets.forEach((tileset) => {
      const state = this.tilesetStates.get(tileset);
      if (!state) {
        tileset.update();
        return;
      }

      if (!this._shouldRunTilesUpdate(state, camera, startMs)) {
        this.updateGatedCount += 1;
        return;
      }

      if (this.renderer && camera) {
        this._syncCamerasIfNeeded(tileset, state, camera);
      }

      if (state.adaptive) {
        this.applyAdaptiveQuality(state, camera, isXR);
      } else {
        this.applyTriangleBudget(state, isXR);
      }
      this._applyVRDepthClamp(state, isXR);

      tileset.update();
      this.updateRunCount += 1;
      this._updateTileShadowCasters(state, camera, startMs, isXR);
      this._markTilesUpdateRan(state, camera, startMs);

      if (state.boundsDirty) {
        this._maybeUpdateBounds(state, startMs, isXR);
      }
    });

    const durationMs = performance.now() - startMs;
    this.lastUpdateDurationMs = durationMs;
    if (durationMs > this.maxUpdateDurationMs) {
      this.maxUpdateDurationMs = durationMs;
    }
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
    if (state?.onDisposeModel) {
      tileset.removeEventListener('dispose-model', state.onDisposeModel);
    }
    if (state?.onNeedsUpdate) {
      tileset.removeEventListener('needs-update', state.onNeedsUpdate);
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
      if (state?.onDisposeModel) {
        tileset.removeEventListener('dispose-model', state.onDisposeModel);
      }
      if (state?.onNeedsUpdate) {
        tileset.removeEventListener('needs-update', state.onNeedsUpdate);
      }
      tileset.dispose();
    });
    this.activeTilesets.clear();
    this.tilesetStates.clear();
  }
}
