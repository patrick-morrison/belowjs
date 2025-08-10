import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

export class ModelLoader {
  constructor(renderer = null) {
    this.renderer = renderer;
    this.loader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.ktx2Loader = null;

    this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    this.loader.setDRACOLoader(this.dracoLoader);
    this.loader.setMeshoptDecoder(MeshoptDecoder);

    this.cache = new Map();

    this.ktx2SetupComplete = false;
    this.setupKTX2Loader();
  }

  setupKTX2Loader() {

    if (ModelLoader.sharedKTX2SetupComplete && ModelLoader.sharedKTX2Loader) {
      this.ktx2Loader = ModelLoader.sharedKTX2Loader;
      this.ktx2SetupComplete = true;
      this.loader.setKTX2Loader(this.ktx2Loader);
      return;
    }

    try {
      if (!ModelLoader.sharedKTX2Loader) {
        ModelLoader.sharedKTX2Loader = new KTX2Loader();
        ModelLoader.sharedKTX2Loader.setTranscoderPath('https://cdn.jsdelivr.net/npm/three@0.177.0/examples/jsm/libs/basis/');
      }
      this.ktx2Loader = ModelLoader.sharedKTX2Loader;

      if (this.renderer && !ModelLoader.sharedKTX2SetupComplete) {
        this.ktx2Loader.detectSupport(this.renderer);
        ModelLoader.sharedKTX2SetupComplete = true;
      }
      this.loader.setKTX2Loader(this.ktx2Loader);
      this.ktx2SetupComplete = true;
    } catch (error) {
      console.warn('KTX2 loader setup failed, falling back to standard textures:', error);
      this.ktx2Loader = null;
    }
  }

  setRenderer(renderer) {
    this.renderer = renderer;
    

    if (this.ktx2Loader && renderer && !this.ktx2SetupComplete) {
      try {
        this.ktx2Loader.detectSupport(renderer);
        this.loader.setKTX2Loader(this.ktx2Loader);
      } catch (error) {
        console.warn('Failed to set up KTX2 loader with renderer:', error);
      }
    }
    

    if (!this.ktx2Loader && renderer) {
      this.setupKTX2Loader();
    }
  }

  async load(url, onProgress = null, signal = null) {
    if (this.cache.has(url)) {
      const cachedGLTF = this.cache.get(url);
      const clonedScene = cachedGLTF.scene.clone(true);
      const model = this.processModel({ scene: clonedScene });
      return model;
    }

    return new Promise((resolve, reject) => {

      if (signal) {
        signal.addEventListener('abort', () => {
          reject(new Error('Loading cancelled'));
        });
        
        if (signal.aborted) {
          reject(new Error('Loading cancelled'));
          return;
        }
      }

      this.loader.load(
        url,
        (gltf) => {
          if (signal && signal.aborted) {
            reject(new Error('Loading cancelled'));
            return;
          }
          
          this.cache.set(url, gltf);
          
          const model = this.processModel(gltf);
          resolve(model);
        },
        (progress) => {
          if (signal && signal.aborted) {
            return;
          }
          if (onProgress) onProgress(progress);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  processModel(gltf) {
    const model = gltf.scene;

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
              map: material.map,
              color: material.color || new THREE.Color(0xffffff),
              transparent: material.transparent,
              opacity: material.opacity !== undefined ? material.opacity : 1.0,
              alphaMap: material.alphaMap,
              side: material.side !== undefined ? material.side : THREE.FrontSide,
              wireframe: material.wireframe || false,
              vertexColors: material.vertexColors || false,
              fog: material.fog !== undefined ? material.fog : true,
              aoMap: material.aoMap,
              aoMapIntensity: material.aoMapIntensity || 1.0,
              envMap: material.envMap,
              reflectivity: material.reflectivity || 1.0,
              refractionRatio: material.refractionRatio || 0.98,
              combine: material.combine || THREE.MultiplyOperation,

ormalMap: material.normalMap,

ormalScale: material.normalScale || new THREE.Vector2(1, 1),
              flatShading: false
            });
            

            if (newMaterial.map) {

ewMaterial.map.anisotropy = this.renderer.capabilities.getMaxAnisotropy();

ewMaterial.map.needsUpdate = true;
            }
            if (newMaterial.normalMap) {

ewMaterial.normalMap.anisotropy = this.renderer.capabilities.getMaxAnisotropy();

ewMaterial.normalMap.needsUpdate = true;
            }
            

ewMaterial.needsUpdate = true;
            if (Array.isArray(obj.material)) {
              obj.material[idx] = newMaterial;
            } else {
              obj.material = newMaterial;
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
          

          const hasMormalMaps = materials.some(mat => mat.normalMap);
          if (hasMormalMaps) {
            obj.geometry.computeTangents();
          }
        }
      }
    });

    const box = new THREE.Box3().setFromObject(model);
    model.userData.boundingBox = box;
    return model;
  }

  processMaterial(material) {

    if (material && material.needsUpdate !== undefined) {
      material.needsUpdate = true;
    }
  }

  dispose() {

    if (this.dracoLoader) {
      this.dracoLoader.dispose();
    }

    this.cache.clear();
    this.ktx2SetupComplete = false;
  }
}

ModelLoader.sharedKTX2Loader = null;
ModelLoader.sharedKTX2SetupComplete = false;
