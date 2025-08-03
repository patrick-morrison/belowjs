/**
 * DebugCommands - Developer debugging utilities for BelowJS
 * 
 * Provides console commands for inspecting camera positions, scene state,
 * and other debugging information during development.
 * 
 * @class DebugCommands
 * 
 * @example
 * // In browser console after BelowViewer is initialized:
 * camera()  // Get current camera position data
 * scene()   // Get scene information
 * models()  // Get loaded models info
 * 
 * @since 1.0.0
 */
export class DebugCommands {
  /**
   * Initialize debug commands with a BelowViewer instance
   * 
   * @param {BelowViewer} viewer - The BelowViewer instance to debug
   */
  static init(viewer) {
    if (typeof window === 'undefined') return;
    
    // Make viewer globally accessible for debugging
    window.belowViewer = viewer;
    
    // Global camera position debugging function
    window.camera = () => {
      if (!viewer.cameraManager?.camera || !viewer.cameraManager?.controls) {
        console.warn('Camera not initialized');
        return null;
      }

      const cameraPos = viewer.cameraManager.camera.position;
      const targetPos = viewer.cameraManager.controls.target;
      
      // Get VR dolly position if available
      const vrData = viewer.dolly ? {
        dolly: {
          x: parseFloat(viewer.dolly.position.x.toFixed(3)),
          y: parseFloat(viewer.dolly.position.y.toFixed(3)),
          z: parseFloat(viewer.dolly.position.z.toFixed(3))
        },
        rotation: {
          x: parseFloat(viewer.dolly.rotation.x.toFixed(3)),
          y: parseFloat(viewer.dolly.rotation.y.toFixed(3)),
          z: parseFloat(viewer.dolly.rotation.z.toFixed(3))
        }
      } : {
        dolly: { x: 0, y: 2, z: 15 },
        rotation: { x: 0, y: 0, z: 0 }
      };

      const positionData = {
        desktop: {
          camera: {
            x: parseFloat(cameraPos.x.toFixed(3)),
            y: parseFloat(cameraPos.y.toFixed(3)),
            z: parseFloat(cameraPos.z.toFixed(3))
          },
          target: {
            x: parseFloat(targetPos.x.toFixed(3)),
            y: parseFloat(targetPos.y.toFixed(3)),
            z: parseFloat(targetPos.z.toFixed(3))
          }
        },
        vr: vrData
      };

      console.log('🎥 Current camera positions:');
      console.log('📋 Copy this for initialPositions config:');
      console.log(JSON.stringify(positionData, null, 2));
      
      return positionData;
    };
    
    // Scene debugging function
    window.scene = () => {
      if (!viewer.sceneManager?.scene) {
        console.warn('Scene not initialized');
        return null;
      }
      
      const scene = viewer.sceneManager.scene;
      const sceneInfo = {
        children: scene.children.length,
        lights: scene.children.filter(child => child.isLight).length,
        meshes: scene.children.filter(child => child.isMesh).length,
        groups: scene.children.filter(child => child.isGroup).length,
        background: scene.background,
        fog: scene.fog ? {
          type: scene.fog.constructor.name,
          color: scene.fog.color.getHexString(),
          near: scene.fog.near,
          far: scene.fog.far
        } : null
      };
      
      console.log('🌍 Scene information:');
      console.table(sceneInfo);
      console.log('Scene object:', scene);
      
      return { info: sceneInfo, scene };
    };
    
    // Models debugging function
    window.models = () => {
      const loadedModels = viewer.getLoadedModels();
      
      if (loadedModels.length === 0) {
        console.log('📦 No models loaded');
        return [];
      }
      
      const modelInfo = loadedModels.map((modelData, index) => {
        const model = modelData.model;
        const box = model.userData.boundingBox;
        
        return {
          index,
          url: modelData.url,
          name: model.name || 'Unnamed',
          position: {
            x: parseFloat(model.position.x.toFixed(3)),
            y: parseFloat(model.position.y.toFixed(3)),
            z: parseFloat(model.position.z.toFixed(3))
          },
          rotation: {
            x: parseFloat(model.rotation.x.toFixed(3)),
            y: parseFloat(model.rotation.y.toFixed(3)),
            z: parseFloat(model.rotation.z.toFixed(3))
          },
          scale: {
            x: parseFloat(model.scale.x.toFixed(3)),
            y: parseFloat(model.scale.y.toFixed(3)),
            z: parseFloat(model.scale.z.toFixed(3))
          },
          boundingBox: box ? {
            min: {
              x: parseFloat(box.min.x.toFixed(3)),
              y: parseFloat(box.min.y.toFixed(3)),
              z: parseFloat(box.min.z.toFixed(3))
            },
            max: {
              x: parseFloat(box.max.x.toFixed(3)),
              y: parseFloat(box.max.y.toFixed(3)),
              z: parseFloat(box.max.z.toFixed(3))
            }
          } : null,
          visible: model.visible,
          children: model.children.length
        };
      });
      
      console.log('📦 Loaded models:');
      console.table(modelInfo);
      
      return { models: modelInfo, rawData: loadedModels };
    };
    
    // VR debugging function
    window.vr = () => {
      if (!viewer.vrManager) {
        console.log('🥽 VR not enabled');
        return null;
      }
      
      const vrInfo = {
        isPresenting: viewer.isVRPresenting(),
        isSupported: navigator.xr !== undefined,
        dollyPosition: viewer.dolly ? {
          x: parseFloat(viewer.dolly.position.x.toFixed(3)),
          y: parseFloat(viewer.dolly.position.y.toFixed(3)),
          z: parseFloat(viewer.dolly.position.z.toFixed(3))
        } : null,
        comfortSettings: viewer.getVRComfortSettings()
      };
      
      console.log('🥽 VR information:');
      console.table(vrInfo);
      
      return vrInfo;
    };
    
    // Help function to show available commands
    window.debugHelp = () => {
      console.log('🔧 BelowJS Debug Commands:');
      console.log('  camera()    - Get current camera position data');
      console.log('  scene()     - Get scene information and object counts');
      console.log('  models()    - Get loaded models information');
      console.log('  vr()        - Get VR state and settings');
      console.log('  debugHelp() - Show this help message');
      console.log('');
      console.log('Global objects:');
      console.log('  belowViewer - Direct access to BelowViewer instance');
    };
    
    console.log('🔧 BelowJS debug commands loaded! Type debugHelp() for available commands.');
  }
  
  /**
   * Clean up debug commands when viewer is disposed
   */
  static cleanup() {
    if (typeof window === 'undefined') return;
    
    delete window.camera;
    delete window.scene;
    delete window.models;
    delete window.vr;
    delete window.debugHelp;
    delete window.belowViewer;
  }
}