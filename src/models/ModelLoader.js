import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { clearThreeGlobalCache } from '../utils/ThreeCleanupUtils.js';

export class ModelLoader {
  constructor(renderer = null) {
    this.renderer = renderer;
    this.isIOSWebKit = ModelLoader.isIOSWebKit();
    this.platformKey = ModelLoader.getPlatformKey();
    this.loader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.ktx2Loader = null;
    this.loadQueue = Promise.resolve();

    this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    if (this.isIOSWebKit && typeof this.dracoLoader.setWorkerLimit === 'function') {
      this.dracoLoader.setWorkerLimit(1);
    }
    this.loader.setDRACOLoader(this.dracoLoader);
    this.loader.setMeshoptDecoder(MeshoptDecoder);

    this.cache = new Map();

    this.ktx2SetupComplete = false;
    this.setupKTX2Loader();
  }

  setupKTX2Loader() {
    const platformKey = this.platformKey;

    try {
      if (!ModelLoader.sharedKTX2Loaders.has(platformKey)) {
        const loader = new KTX2Loader();
        loader.setTranscoderPath('https://cdn.jsdelivr.net/npm/three@0.177.0/examples/jsm/libs/basis/');
        if (this.isIOSWebKit && typeof loader.setWorkerLimit === 'function') {
          loader.setWorkerLimit(1);
        }
        ModelLoader.sharedKTX2Loaders.set(platformKey, loader);
        ModelLoader.sharedKTX2SetupComplete.set(platformKey, false);
      }

      this.ktx2Loader = ModelLoader.sharedKTX2Loaders.get(platformKey);
      this.loader.setKTX2Loader(this.ktx2Loader);
      this.ktx2SetupComplete = ModelLoader.sharedKTX2SetupComplete.get(platformKey) || false;

      if (this.renderer && !this.ktx2SetupComplete) {
        this.ensureKTX2Support();
      }
    } catch (error) {
      console.warn('KTX2 loader setup failed, falling back to standard textures:', error);
      this.ktx2Loader = null;
    }
  }

  ensureKTX2Support() {
    if (!this.ktx2Loader || !this.renderer) {
      return;
    }

    const platformKey = this.platformKey;
    if (ModelLoader.sharedKTX2SetupComplete.get(platformKey)) {
      this.ktx2SetupComplete = true;
      return;
    }

    try {
      this.ktx2Loader.detectSupport(this.renderer);
      ModelLoader.sharedKTX2SetupComplete.set(platformKey, true);
      this.ktx2SetupComplete = true;
    } catch (error) {
      console.warn('Failed to set up KTX2 loader with renderer:', error);
    }
  }

  setRenderer(renderer) {
    this.renderer = renderer;

    if (!renderer) {
      return;
    }

    if (this.ktx2Loader) {
      this.ensureKTX2Support();
    } else {
      this.setupKTX2Loader();
    }
  }

  async load(url, onProgress = null, signal = null, onStageChange = null) {
    if (this.cache.has(url)) {
      if (onStageChange) {
        onStageChange('cloning');
      }
      const cachedGLTF = this.cache.get(url);
      const clonedScene = cachedGLTF.scene.clone(true);
      const model = this.processModel({ scene: clonedScene });
      return model;
    }

    const executeLoad = () => this.performLoad(url, onProgress, signal, onStageChange);

    if (!this.isIOSWebKit) {
      return executeLoad();
    }

    const queuedPromise = this.loadQueue.then(() => executeLoad());
    this.loadQueue = queuedPromise.catch(() => {});
    return queuedPromise;
  }

  performLoad(url, onProgress = null, signal = null, onStageChange = null) {
    return new Promise((resolve, reject) => {
      let abortHandler = null;
      const cleanup = () => {
        if (signal && abortHandler) {
          signal.removeEventListener('abort', abortHandler);
          abortHandler = null;
        }
      };

      const rejectWithCancellation = () => {
        cleanup();
        reject(new Error('Loading cancelled'));
      };

      if (signal) {
        abortHandler = rejectWithCancellation;
        signal.addEventListener('abort', abortHandler);
        
        if (signal.aborted) {
          rejectWithCancellation();
          return;
        }
      }

      if (onStageChange) {
        onStageChange('downloading');
      }

      this.loader.load(
        url,
        (gltf) => {
          if (onStageChange) {
            onStageChange('processing');
          }
          if (signal && signal.aborted) {
            cleanup();
            return;
          }
          
          this.cache.set(url, gltf);
          
          const model = this.processModel(gltf);
          if (onStageChange) {
            onStageChange('finalizing');
          }
          this.releaseParserCaches(gltf);
          cleanup();
          resolve(model);
        },
        (progress) => {
          if (signal && signal.aborted) {
            return;
          }
          if (onProgress) onProgress(progress);
        },
        (error) => {
          cleanup();
          reject(error);
        }
      );
    });
  }

  processModel(gltf) {
    const model = gltf.scene;
    const maxAnisotropy = this.getMaxAnisotropy();

    model.traverse((obj) => {
      if (obj.isLight) {
        obj.visible = false;
      }
      if (obj.isMesh && obj.material) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        materials.forEach((material, idx) => {

          if (material.emissive) material.emissive.setHex(0x000000);
          if (material.emissiveIntensity !== undefined) material.emissiveIntensity = 0;
          if (material.emissiveMap) material.emissiveMap = null;

          if (material.lightMap) material.lightMap = null;
          if (material.lightMapIntensity !== undefined) material.lightMapIntensity = 0;

          if (material.type === 'MeshBasicMaterial' || material.type === 'MeshPhongMaterial') {
            const newMaterial = new THREE.MeshLambertMaterial({
              // Only include common, safe params; set specialized textures conditionally below
              color: material.color || new THREE.Color(0xffffff),
              side: material.side !== undefined ? material.side : THREE.FrontSide,
              wireframe: material.wireframe || false,
              vertexColors: material.vertexColors || false,
              fog: material.fog !== undefined ? material.fog : true,
              flatShading: false
            });

            // Conditionally copy supported maps/props to avoid undefined warnings
            if (material.map) newMaterial.map = material.map;
            if (material.alphaMap) newMaterial.alphaMap = material.alphaMap;
            if (material.aoMap) newMaterial.aoMap = material.aoMap;
            if (typeof material.aoMapIntensity === 'number') newMaterial.aoMapIntensity = material.aoMapIntensity;
            if (material.envMap) newMaterial.envMap = material.envMap;
            if (typeof material.reflectivity === 'number') newMaterial.reflectivity = material.reflectivity;
            if (typeof material.refractionRatio === 'number') newMaterial.refractionRatio = material.refractionRatio;
            if (material.combine !== undefined) newMaterial.combine = material.combine;
            if (material.transparent !== undefined) newMaterial.transparent = material.transparent;
            if (typeof material.opacity === 'number') newMaterial.opacity = material.opacity;
            if (material.normalMap) {
              newMaterial.normalMap = material.normalMap;
              newMaterial.normalScale = material.normalScale || new THREE.Vector2(1, 1);
            }
            

            if (newMaterial.map && maxAnisotropy !== null) {
              newMaterial.map.anisotropy = maxAnisotropy;
              newMaterial.map.needsUpdate = true;
            }
            if (newMaterial.normalMap && maxAnisotropy !== null) {
              newMaterial.normalMap.anisotropy = maxAnisotropy;
              newMaterial.normalMap.needsUpdate = true;
            }
            
            newMaterial.needsUpdate = true;
            if (Array.isArray(obj.material)) {
              obj.material[idx] = newMaterial;
            } else {
              obj.material = newMaterial;
            }

            if (material !== newMaterial && typeof material?.dispose === 'function') {
              material.dispose();
            }
          } else if (material.type === 'MeshStandardMaterial' || material.type === 'MeshPhysicalMaterial') {
            material.needsUpdate = true;
          }

          const currentMaterial = Array.isArray(obj.material) ? obj.material[idx] : obj.material;
          if (currentMaterial && currentMaterial.needsUpdate !== undefined) {
            currentMaterial.needsUpdate = true;
          }
        });

        if (obj.geometry) {
          obj.geometry.computeVertexNormals();
          obj.geometry.normalizeNormals();
          

          const hasNormalMaps = materials.some(mat => mat.normalMap);
          if (hasNormalMaps) {
            obj.geometry.computeTangents();
          }
        }
      }
    });

    const box = new THREE.Box3().setFromObject(model);
    model.userData.boundingBox = box;
    return model;
  }

  getMaxAnisotropy() {
    if (!this.renderer || !this.renderer.capabilities || typeof this.renderer.capabilities.getMaxAnisotropy !== 'function') {
      return null;
    }
    const value = this.renderer.capabilities.getMaxAnisotropy();
    return typeof value === 'number' ? value : null;
  }

  processMaterial(material) {

    if (material && material.needsUpdate !== undefined) {
      material.needsUpdate = true;
    }
  }

  releaseFromCache(url) {
    if (!this.cache.has(url)) {
      return;
    }

    const cachedGLTF = this.cache.get(url);
    this.disposeGLTFResources(cachedGLTF);
    this.cache.delete(url);
  }

  disposeGLTFResources(gltf) {
    if (!gltf) return;
    this.releaseParserCaches(gltf);

    const processedScenes = new Set();
    const processScene = (scene) => {
      if (!scene || processedScenes.has(scene)) return;
      processedScenes.add(scene);

      scene.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) {
            child.geometry.dispose();
          }
          this.disposeMaterialResources(child.material);
        }
      });
    };

    if (Array.isArray(gltf.scenes)) {
      gltf.scenes.forEach(processScene);
    }

    if (gltf.scene) {
      processScene(gltf.scene);
    }
  }

  disposeMaterialResources(material) {
    if (!material) return;

    const materials = Array.isArray(material) ? material : [material];
    const textureSlots = [
      'map',
      'alphaMap',
      'aoMap',
      'bumpMap',
      'clearcoatMap',
      'clearcoatNormalMap',
      'clearcoatRoughnessMap',
      'displacementMap',
      'emissiveMap',
      'envMap',
      'iridescenceMap',
      'lightMap',
      'metalnessMap',
      'normalMap',
      'roughnessMap',
      'specularMap',
      'specularColorMap',
      'specularIntensityMap',
      'sheenColorMap',
      'sheenRoughnessMap',
      'thicknessMap',
      'transmissionMap',
      'anisotropyMap'
    ];

    materials.forEach((mat) => {
      if (!mat) return;

      textureSlots.forEach((slot) => {
        const texture = mat[slot];
        if (texture && typeof texture.dispose === 'function') {
          texture.dispose();
        }
        if (texture && texture.source && typeof texture.source.dispose === 'function') {
          texture.source.dispose();
        }
        if (texture && texture.image && typeof texture.image.close === 'function') {
          texture.image.close();
        }
        if (texture) {
          mat[slot] = null;
        }
      });

      if (typeof mat.dispose === 'function') {
        mat.dispose();
      }
    });
  }

  releaseParserCaches(gltf) {
    const parser = gltf?.parser;
    if (!parser) return;

    if (parser.cache && typeof parser.cache.removeAll === 'function') {
      parser.cache.removeAll();
    }
    if (parser.associations && typeof parser.associations.clear === 'function') {
      parser.associations.clear();
    }

    parser.primitiveCache = {};
    parser.nodeCache = {};
    parser.meshCache = { refs: {}, uses: {} };
    parser.cameraCache = { refs: {}, uses: {} };
    parser.lightCache = { refs: {}, uses: {} };
    parser.sourceCache = {};
    parser.textureCache = {};
    parser.nodeNamesUsed = {};
    parser.json = null;
    parser.extensions = null;
    parser.plugins = null;
    parser.options = null;
    parser.textureLoader = null;
    gltf.parser = null;
    clearThreeGlobalCache();
  }

  dispose() {

    if (this.dracoLoader) {
      this.dracoLoader.dispose();
    }

    this.cache.forEach((gltf) => {
      this.disposeGLTFResources(gltf);
    });
    this.cache.clear();
    this.ktx2SetupComplete = false;
  }

  static isIOSWebKit() {
    if (typeof navigator === 'undefined') {
      return false;
    }

    const ua = navigator.userAgent || '';
    const platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';

    if (/iPhone|iPad|iPod/.test(platform)) {
      return true;
    }

    if (platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
      return true;
    }

    if (/AppleWebKit/.test(ua) && /Mobile/.test(ua) && !/Chrome|CriOS|FxiOS/.test(ua)) {
      return true;
    }

    return false;
  }

  static getPlatformKey() {
    return ModelLoader.isIOSWebKit() ? 'ios' : 'default';
  }
}

ModelLoader.sharedKTX2Loaders = new Map();
ModelLoader.sharedKTX2SetupComplete = new Map();
