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
    this.activeIOSLoad = false;

    this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    if (this.isIOSWebKit && typeof this.dracoLoader.setWorkerLimit === 'function') {
      this.dracoLoader.setWorkerLimit(1);
    }
    this.loader.setDRACOLoader(this.dracoLoader);
    this.loader.setMeshoptDecoder(MeshoptDecoder);

    // Register plugin to convert deprecated KHR_materials_pbrSpecularGlossiness to standard PBR
    this.loader.register((parser) => {
      return {
        name: 'KHR_materials_pbrSpecularGlossiness',
        extendMaterialParams: async (materialIndex, materialParams) => {
          const materialDef = parser.json.materials[materialIndex];
          if (!materialDef.extensions || !materialDef.extensions.KHR_materials_pbrSpecularGlossiness) {
            return Promise.resolve();
          }

          const sgExt = materialDef.extensions.KHR_materials_pbrSpecularGlossiness;

          // Convert diffuse texture to baseColor/map
          if (sgExt.diffuseTexture !== undefined) {
            materialParams.map = await parser.getDependency('texture', sgExt.diffuseTexture.index);
          }

          // Convert diffuse factor to color
          if (sgExt.diffuseFactor !== undefined) {
            materialParams.color = new THREE.Color().fromArray(sgExt.diffuseFactor);
          }

          // Convert glossiness to roughness (roughness = 1 - glossiness)
          if (sgExt.glossinessFactor !== undefined) {
            materialParams.roughness = 1.0 - sgExt.glossinessFactor;
          }

          // Assume non-metallic for specular-glossiness workflows
          materialParams.metalness = 0.0;

          return Promise.resolve();
        }
      };
    });

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

    const queuedPromise = this.loadQueue.then(() => {
      if (this.activeIOSLoad && typeof onStageChange === 'function') {
        onStageChange('freeing-resources');
      }
      return executeLoad();
    });
    this.loadQueue = queuedPromise.catch(() => { });
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
        if (this.isIOSWebKit) {
          this.activeIOSLoad = false;
        }
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

      if (this.isIOSWebKit) {
        this.activeIOSLoad = true;
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
          if (this.isIOSWebKit) {
            this.activeIOSLoad = false;
          }
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
          if (this.isIOSWebKit) {
            this.activeIOSLoad = false;
          }
          reject(error);
        }
      );
    });
  }

  processModel(gltf) {
    let model = gltf.scene;
    const maxAnisotropy = this.getMaxAnisotropy();
    const parser = gltf.parser || null;
    const normalizePhotogrammetry = this.shouldNormalizePhotogrammetryAtlas(parser);

    if (normalizePhotogrammetry) {
      model = this.bakeMeshWorldTransforms(model);
      gltf.scene = model;
    }

    model.traverse((obj) => {
      if (obj.isLight) {
        obj.visible = false;
      }
      if (obj.isMesh && obj.material) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        const normalizedMaterials = materials.map((material) =>
          this.normalizeMaterial(material, parser, normalizePhotogrammetry, maxAnisotropy)
        );
        obj.material = Array.isArray(obj.material) ? normalizedMaterials : normalizedMaterials[0];

        if (obj.geometry) {
          if (normalizePhotogrammetry) {
            obj.geometry.computeVertexNormals();
          } else if (!obj.geometry.attributes?.normal) {
            obj.geometry.computeVertexNormals();
          }
          obj.geometry.normalizeNormals();

          const hasNormalMaps = normalizedMaterials.some(mat => mat?.normalMap);
          if (hasNormalMaps && this.canComputeTangents(obj.geometry)) {
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

  normalizeMaterial(material, parser, normalizePhotogrammetry, maxAnisotropy) {
    if (!material) {
      return material;
    }

    this.clearBakedLighting(material);

    const materialDef = this.getGLTFMaterialDef(parser, material);
    const shouldConvertToStandard = normalizePhotogrammetry ||
      material.type === 'MeshBasicMaterial' ||
      material.type === 'MeshPhongMaterial';

    const outputMaterial = shouldConvertToStandard
      ? this.createStandardMaterial(material, materialDef, normalizePhotogrammetry)
      : material;

    this.processMaterialTextures(outputMaterial, maxAnisotropy, normalizePhotogrammetry);

    if (outputMaterial.needsUpdate !== undefined) {
      outputMaterial.needsUpdate = true;
    }

    if (material !== outputMaterial && typeof material.dispose === 'function') {
      material.dispose();
    }

    return outputMaterial;
  }

  clearBakedLighting(material) {
    if (material.emissive) material.emissive.setHex(0x000000);
    if (material.emissiveIntensity !== undefined) material.emissiveIntensity = 0;
    if (material.emissiveMap) material.emissiveMap = null;
    if (material.lightMap) material.lightMap = null;
    if (material.lightMapIntensity !== undefined) material.lightMapIntensity = 0;
  }

  createStandardMaterial(material, materialDef, normalizePhotogrammetry) {
    const pbr = materialDef?.pbrMetallicRoughness || {};
    const color = material.color?.clone?.() || new THREE.Color(0xffffff);
    const standardMaterial = new THREE.MeshStandardMaterial({
      color,
      side: normalizePhotogrammetry ? THREE.FrontSide : (material.side ?? THREE.FrontSide),
      wireframe: material.wireframe || false,
      vertexColors: material.vertexColors || false,
      fog: material.fog ?? true,
      flatShading: false,
      roughness: normalizePhotogrammetry ? 1 : (pbr.roughnessFactor ?? material.roughness ?? 0.8),
      metalness: normalizePhotogrammetry ? 0 : (pbr.metallicFactor ?? material.metalness ?? 0.3)
    });

    if (material.map) standardMaterial.map = material.map;
    if (material.alphaMap) standardMaterial.alphaMap = material.alphaMap;
    if (material.transparent !== undefined) standardMaterial.transparent = material.transparent;
    if (typeof material.opacity === 'number') standardMaterial.opacity = material.opacity;

    if (!normalizePhotogrammetry) {
      if (material.aoMap) standardMaterial.aoMap = material.aoMap;
      if (typeof material.aoMapIntensity === 'number') standardMaterial.aoMapIntensity = material.aoMapIntensity;
      if (material.envMap) standardMaterial.envMap = material.envMap;
      if (material.roughnessMap) standardMaterial.roughnessMap = material.roughnessMap;
      if (material.metalnessMap) standardMaterial.metalnessMap = material.metalnessMap;
      if (material.normalMap) {
        standardMaterial.normalMap = material.normalMap;
        standardMaterial.normalScale = material.normalScale || new THREE.Vector2(1, 1);
      }
    }

    return standardMaterial;
  }

  processMaterialTextures(material, maxAnisotropy, normalizePhotogrammetry) {
    const textureSlots = [
      'map',
      'alphaMap',
      'normalMap',
      'roughnessMap',
      'metalnessMap',
      'aoMap',
      'emissiveMap'
    ];

    textureSlots.forEach(slot => {
      if (material[slot]) {
        this.processTexture(material[slot], maxAnisotropy, {
          fixPhotogrammetryAtlas: normalizePhotogrammetry && slot === 'map'
        });
      }
    });
  }

  getGLTFMaterialDef(parser, material) {
    const materialIndex = parser?.associations?.get?.(material)?.materials;
    if (materialIndex === undefined || materialIndex === null) {
      return null;
    }
    return parser?.json?.materials?.[materialIndex] || null;
  }

  shouldNormalizePhotogrammetryAtlas(parser) {
    const json = parser?.json;
    if (!json) {
      return false;
    }

    const materials = json.materials || [];
    const meshes = json.meshes || [];
    const accessors = json.accessors || [];

    if (!materials.length || !meshes.length) {
      return false;
    }

    // Large photogrammetry exports often carry a baked color atlas as the
    // shading source. In that workflow, stale exporter normals, double-sided
    // flags, and glossy defaults can show up as broad bands. If authored
    // lighting maps exist, leave the material/normal authoring intact.
    const hasBaseColorTexture = materials.some((materialDef) =>
      materialDef?.pbrMetallicRoughness?.baseColorTexture !== undefined
    );
    const hasGeneratedLightingMaps = materials.some((materialDef) =>
      materialDef?.normalTexture ||
      materialDef?.occlusionTexture ||
      materialDef?.emissiveTexture ||
      materialDef?.pbrMetallicRoughness?.metallicRoughnessTexture
    );

    if (!hasBaseColorTexture || hasGeneratedLightingMaps) {
      return false;
    }

    let triangleCount = 0;
    for (const mesh of meshes) {
      for (const primitive of mesh.primitives || []) {
        if (primitive?.attributes?.POSITION === undefined || primitive.attributes.TEXCOORD_0 === undefined) {
          return false;
        }
        const positionCount = accessors[primitive.attributes.POSITION]?.count || 0;
        const indexCount = primitive.indices !== undefined
          ? accessors[primitive.indices]?.count || 0
          : positionCount;
        triangleCount += Math.floor(indexCount / 3);
      }
    }

    return triangleCount >= 50000;
  }

  bakeMeshWorldTransforms(model) {
    if (!model) {
      return model;
    }

    model.updateMatrixWorld(true);

    const bakedRoot = new THREE.Group();
    bakedRoot.name = model.name || 'BakedPhotogrammetryModel';
    bakedRoot.userData = { ...model.userData, bakedWorldTransforms: true };

    const meshes = [];
    model.traverse((object) => {
      if (object.isMesh) {
        meshes.push(object);
      }
    });

    const sourceGeometries = new Set();
    meshes.forEach((mesh) => {
      const worldMatrix = mesh.matrixWorld.clone();
      const sourceGeometry = mesh.geometry;
      if (sourceGeometry) {
        sourceGeometries.add(sourceGeometry);
        mesh.geometry = sourceGeometry.clone();
        mesh.geometry.applyMatrix4(worldMatrix);
      }

      mesh.position.set(0, 0, 0);
      mesh.quaternion.identity();
      mesh.scale.set(1, 1, 1);
      mesh.matrix.identity();
      mesh.matrixWorld.identity();
      mesh.matrixAutoUpdate = true;

      bakedRoot.add(mesh);
    });

    sourceGeometries.forEach((geometry) => {
      if (typeof geometry?.dispose === 'function') {
        geometry.dispose();
      }
    });

    bakedRoot.updateMatrixWorld(true);
    return bakedRoot;
  }

  processTexture(texture, maxAnisotropy = null, { fixPhotogrammetryAtlas = false } = {}) {
    if (!texture) {
      return;
    }

    if (maxAnisotropy !== null) {
      texture.anisotropy = maxAnisotropy;
    }

    // Photogrammetry GLBs commonly use tightly packed atlases with mipmapped
    // repeat sampling. Lower mip levels can bleed across UV islands and appear
    // as broad bands. KTX2 conversions can preserve those mip levels, so force
    // base-level sampling for color atlases.
    if (fixPhotogrammetryAtlas) {
      if (!texture.isCompressedTexture) {
        texture.generateMipmaps = false;
      }
      texture.minFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
    }

    texture.needsUpdate = true;
  }

  canComputeTangents(geometry) {
    return Boolean(
      geometry?.index &&
      geometry.attributes?.position &&
      geometry.attributes?.normal &&
      geometry.attributes?.uv
    );
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
