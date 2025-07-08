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
