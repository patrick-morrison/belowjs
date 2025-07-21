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
    // Use shared static KTX2Loader
    this.ktx2Loader = null;

    // Set up Draco decoder path
    this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    this.loader.setDRACOLoader(this.dracoLoader);

    // Set up Meshopt decoder
    this.loader.setMeshoptDecoder(MeshoptDecoder);

    this.cache = new Map();

    // Track if we've already set up KTX2 to avoid multiple instances
    this.ktx2SetupComplete = false;

    // Try to set up KTX2 loader, but don't fail if it doesn't work
    this.setupKTX2Loader();
  }



  setupKTX2Loader() {
    // Use a static/shared KTX2Loader for all ModelLoader instances
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
      // Only set up KTX2 if we have a renderer
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
    
    // If we have a KTX2 loader but haven't completed setup with renderer yet
    if (this.ktx2Loader && renderer && !this.ktx2SetupComplete) {
      try {
        this.ktx2Loader.detectSupport(renderer);
        this.loader.setKTX2Loader(this.ktx2Loader);
      } catch (error) {
        console.warn('Failed to set up KTX2 loader with renderer:', error);
      }
    }
    
    // If we don't have a KTX2 loader yet, try to set it up now
    if (!this.ktx2Loader && renderer) {
      this.setupKTX2Loader();
    }
  }

  async load(url, onProgress = null, signal = null) {
    // Check cache first - but always create a new instance from cached GLTF
    if (this.cache.has(url)) {
      const cachedGLTF = this.cache.get(url);
      // Clone the scene to create a new instance
      const clonedScene = cachedGLTF.scene.clone(true);
      const model = this.processModel({ scene: clonedScene });
      return model;
    }

    return new Promise((resolve, reject) => {
      // Handle cancellation
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
          // Check if cancelled before processing
          if (signal && signal.aborted) {
            reject(new Error('Loading cancelled'));
            return;
          }
          
          // Store in cache
          this.cache.set(url, gltf);
          
          // Basic model processing
          const model = this.processModel(gltf);
          resolve(model);
        },
        (progress) => {
          // Check if cancelled before reporting progress
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
    // Remove/disables all embedded lights and clean all materials
    model.traverse((obj) => {
      if (obj.isLight) {
        obj.visible = false;
      }
      if (obj.isMesh && obj.material) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        materials.forEach((material, idx) => {
          // Remove emissive properties
          if (material.emissive) material.emissive.setHex(0x000000);
          if (material.emissiveIntensity !== undefined) material.emissiveIntensity = 0;
          if (material.emissiveMap) material.emissiveMap = null;
          // Remove light maps
          if (material.lightMap) material.lightMap = null;
          if (material.lightMapIntensity !== undefined) material.lightMapIntensity = 0;
          // Convert problematic materials to MeshLambertMaterial
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
              // Enhanced normal map support
              normalMap: material.normalMap,
              normalScale: material.normalScale || new THREE.Vector2(1, 1),
              // Explicit smooth shading for non-blocky appearance
              flatShading: false
            });
            
            // Enhance texture quality if texture maps exist
            if (newMaterial.map) {
              newMaterial.map.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
              newMaterial.map.needsUpdate = true;
            }
            if (newMaterial.normalMap) {
              newMaterial.normalMap.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
              newMaterial.normalMap.needsUpdate = true;
            }
            
            newMaterial.needsUpdate = true;
            if (Array.isArray(obj.material)) {
              obj.material[idx] = newMaterial;
            } else {
              obj.material = newMaterial;
            }
          } else if (material.type === 'MeshStandardMaterial' || material.type === 'MeshPhysicalMaterial') {
            material.needsUpdate = true;
          }
          // Ensure update for all materials
          const currentMaterial = Array.isArray(obj.material) ? obj.material[idx] : obj.material;
          if (currentMaterial && currentMaterial.needsUpdate !== undefined) {
            currentMaterial.needsUpdate = true;
          }
        });
        // Enhanced geometry processing for better surface quality
        if (obj.geometry) {
          obj.geometry.computeVertexNormals();
          obj.geometry.normalizeNormals();
          
          // Compute tangents for normal maps if any material has them
          const hasMormalMaps = materials.some(mat => mat.normalMap);
          if (hasMormalMaps) {
            obj.geometry.computeTangents();
          }
        }
      }
    });
    // Calculate bounding box for camera positioning
    const box = new THREE.Box3().setFromObject(model);
    model.userData.boundingBox = box;
    return model;
  }

  processMaterial(material) {
    // Deprecated: all material cleaning is now handled in processModel
    // (kept for API compatibility)
    if (material && material.needsUpdate !== undefined) {
      material.needsUpdate = true;
    }
  }

  dispose() {
    // Only dispose KTX2Loader if this is the last instance (not recommended, so skip)
    // Instead, just clean up Draco and cache
    if (this.dracoLoader) {
      this.dracoLoader.dispose();
    }
    // Clear cache
    this.cache.clear();
    this.ktx2SetupComplete = false;

  }
}


// Attach static fields for shared KTX2Loader (only once, after class definition)
ModelLoader.sharedKTX2Loader = null;
ModelLoader.sharedKTX2SetupComplete = false;
