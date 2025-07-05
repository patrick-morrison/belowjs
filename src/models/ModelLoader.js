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
    this.ktx2Loader = null; // Initialize as null, will be set up conditionally
    
    // Set up Draco decoder path
    this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    this.loader.setDRACOLoader(this.dracoLoader);
    
    // Set up Meshopt decoder
    this.loader.setMeshoptDecoder(MeshoptDecoder);
    
    this.cache = new Map();
    
    // Try to set up KTX2 loader, but don't fail if it doesn't work
    this.setupKTX2Loader();
  }

  setupKTX2Loader() {
    try {
      this.ktx2Loader = new KTX2Loader();
      
      // Use the same CDN path as the working original implementation
      this.ktx2Loader.setTranscoderPath('https://cdn.jsdelivr.net/npm/three@0.177.0/examples/jsm/libs/basis/');
      
      // Only set up KTX2 if we have a renderer
      if (this.renderer) {
        this.ktx2Loader.detectSupport(this.renderer);
        this.loader.setKTX2Loader(this.ktx2Loader);
      }
    } catch (error) {
      console.warn('KTX2 loader setup failed, falling back to standard textures:', error);
      this.ktx2Loader = null;
    }
  }

  setRenderer(renderer) {
    this.renderer = renderer;
    
    // If we have a KTX2 loader but haven't set it up with renderer yet
    if (this.ktx2Loader && renderer) {
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
    
    // Basic material processing - convert problematic materials
    model.traverse((child) => {
      if (child.isMesh) {
        // Enable shadows
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Basic material processing
        if (child.material) {
          this.processMaterial(child.material);
        }
      }
    });

    // Calculate bounding box for camera positioning
    const box = new THREE.Box3().setFromObject(model);
    model.userData.boundingBox = box;
    
    return model;
  }

  processMaterial(material) {
    // Remove emissive properties that can interfere with lighting
    if (material.emissive) {
      material.emissive.setHex(0x000000);
      material.emissiveIntensity = 0;
    }
    
    // Ensure materials work well with our lighting
    if (material.type === 'MeshStandardMaterial') {
      // Keep standard materials as-is, they work well with PBR lighting
      material.needsUpdate = true;
    }
  }

  dispose() {
    this.cache.clear();
    this.dracoLoader.dispose();
    if (this.ktx2Loader) {
      this.ktx2Loader.dispose();
    }
  }
}
