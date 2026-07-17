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
    

    window.belowViewer = viewer;
    
    window.camera = () => {
      if (!viewer.cameraManager?.camera || !viewer.cameraManager?.controls) {
        console.warn('Camera not initialized');
        return null;
      }

      const cameraPos = viewer.cameraManager.camera.position;
      const targetPos = viewer.cameraManager.controls.target;
      
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
    
    window.camera.setOrthographic = () => {
      if (!viewer.cameraManager?.camera || !viewer.cameraManager?.controls) {
        console.warn('Camera not initialized');
        return null;
      }

      const camera = viewer.setOrthographicCamera?.() || viewer.cameraManager.setOrthographic(
        viewer.container?.clientWidth || window.innerWidth,
        viewer.container?.clientHeight || window.innerHeight
      );

      console.log('Camera projection: orthographic');
      return { projection: 'orthographic', camera };
    };

    window.camera.setPerspective = () => {
      if (!viewer.cameraManager?.camera || !viewer.cameraManager?.controls) {
        console.warn('Camera not initialized');
        return null;
      }

      const camera = viewer.setPerspectiveCamera?.() || viewer.cameraManager.setPerspective(
        viewer.container?.clientWidth || window.innerWidth,
        viewer.container?.clientHeight || window.innerHeight
      );

      console.log('Camera projection: perspective');
      return { projection: 'perspective', camera };
    };

    window.camera.setFar = (far = 2000) => {
      const distance = Number(far);
      if (!Number.isFinite(distance) || distance <= 0) {
        console.warn('Usage: camera.setFar(10000)');
        return null;
      }

      const clipping = viewer.setCameraFar?.(distance) || viewer.cameraManager?.setFar?.(distance);
      if (!clipping) {
        console.warn('Camera not initialized');
        return null;
      }

      console.log(`Camera far clipping: ${clipping.far}`);
      return clipping;
    };

    window.camera.setClipping = (near, far) => {
      if (near === undefined && far === undefined) {
        const camera = viewer.cameraManager?.camera;
        if (!camera) {
          console.warn('Camera not initialized');
          return null;
        }

        const clipping = { near: camera.near, far: camera.far };
        console.table(clipping);
        console.log('Usage: camera.setClipping(0.05, 10000) or camera.setClipping(10000)');
        return clipping;
      }

      const clippingArgs = far === undefined ? { far: near } : { near, far };
      const clipping = viewer.setCameraClipping?.(clippingArgs) || viewer.cameraManager?.setClipping?.(clippingArgs);
      if (!clipping) {
        console.warn('Camera not initialized');
        return null;
      }

      console.log(`Camera clipping: near ${clipping.near}, far ${clipping.far}`);
      return clipping;
    };

    window.camera.fitClipping = (multiplier = 2) => {
      const clipping = viewer.fitCameraClipping?.(multiplier);
      if (!clipping) {
        console.warn('No model bounds available');
        return null;
      }

      console.log(`Camera far clipping: ${clipping.far} (minimum ${clipping.minimumFar.toFixed(3)}, ${clipping.multiplier}x model size)`);
      return clipping;
    };

    window.camera.setMaxDistance = (maxDistance) => {
      const controls = viewer.cameraManager?.getControls?.();
      if (!controls) {
        console.warn('Camera controls not initialized');
        return null;
      }

      if (maxDistance === undefined) {
        const limits = {
          minDistance: controls.minDistance,
          maxDistance: controls.maxDistance
        };
        console.table(limits);
        console.log('Usage: camera.setMaxDistance(250)');
        return limits;
      }

      const distance = Number(maxDistance);
      if (!Number.isFinite(distance) || distance <= controls.minDistance) {
        console.warn(`Usage: camera.setMaxDistance(n) where n is greater than ${controls.minDistance}`);
        return null;
      }

      controls.maxDistance = distance;
      controls.update();

      console.log(`Camera max distance: ${controls.maxDistance}`);
      return {
        minDistance: controls.minDistance,
        maxDistance: controls.maxDistance
      };
    };

    window.camera.setStereo = (enable, eyeSeparation) => {
      if (enable === undefined) {
        const stereoInfo = {
          enabled: viewer.stereoEnabled || false,
          mode: viewer.stereoMode || 'sbs',
          eyeSeparation: viewer.stereoEyeSeparation || 0.064
        };
        console.log('👓 Stereo information:');
        console.table(stereoInfo);
        console.log('');
        console.log('Usage:');
        console.log('  camera.setStereo(true)           - Enable stereo mode');
        console.log('  camera.setStereo(false)          - Disable stereo mode');
        console.log('  camera.setStereo(true, 0.065)    - Enable with custom eye separation');
        return stereoInfo;
      }

      viewer.setStereoEnabled(enable);
      if (eyeSeparation !== undefined) {
        viewer.setStereoEyeSeparation(eyeSeparation);
      }

      console.log(`👓 Stereo ${enable ? 'enabled' : 'disabled'}`);
      if (eyeSeparation !== undefined) {
        console.log(`👓 Eye separation: ${eyeSeparation}m`);
      }

      return { enabled: enable, eyeSeparation: viewer.stereoEyeSeparation };
    };

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

          ear: scene.fog.near,
          far: scene.fog.far
        } : null
      };
      
      console.log('🌍 Scene information:');
      console.table(sceneInfo);
      console.log('Scene object:', scene);
      
      return { info: sceneInfo, scene };
    };

    window.scene.setBrightness = (value = 0) => {
      const brightness = Math.max(-3, Math.min(3, Number(value) || 0));
      const multiplier = Math.pow(2, brightness);
      const scene = viewer.sceneManager?.scene;

      if (!scene && !viewer.renderer) {
        console.warn('Scene not initialized');
        return null;
      }

      scene?.traverse?.((object) => {
        if (!object.isLight) return;
        object.userData.belowBaseIntensity ??= object.intensity ?? 1;
        object.intensity = object.userData.belowBaseIntensity * multiplier;
      });

      if (viewer.renderer) {
        viewer.renderer.userData ||= {};
        viewer.renderer.userData.belowBaseToneMappingExposure ??= viewer.renderer.toneMappingExposure || 1;
        viewer.renderer.toneMappingExposure =
          viewer.renderer.userData.belowBaseToneMappingExposure * multiplier;
      }

      console.log(`Scene brightness: ${brightness} (${multiplier.toFixed(3)}x)`);
      return {
        brightness,
        multiplier,
        toneMappingExposure: viewer.renderer?.toneMappingExposure
      };
    };

    window.vertices = () => {
      if (!viewer.sceneManager?.scene) {
        console.warn('Scene not initialized');
        return null;
      }

      const scene = viewer.sceneManager.scene;
      let meshCount = 0;
      let visibleMeshCount = 0;
      let vertexCount = 0;
      let visibleVertexCount = 0;

      scene.traverse((obj) => {
        const position = obj.geometry?.getAttribute?.('position');
        if (!position) return;

        meshCount += 1;
        const objectVertexCount = obj.isInstancedMesh ? position.count * obj.count : position.count;
        vertexCount += objectVertexCount;

        if (obj.visible) {
          visibleMeshCount += 1;
          visibleVertexCount += objectVertexCount;
        }
      });

      const vertexInfo = {
        meshes: meshCount,
        visibleMeshes: visibleMeshCount,
        vertices: vertexCount,
        visibleVertices: visibleVertexCount
      };

      console.log('🔢 Scene vertex counts:');
      console.table(vertexInfo);
      return vertexInfo;
    };
    
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

          ame: model.name || 'Unnamed',
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
    
    window.particles = () => {
      let particles = null;

      if (viewer.diveSystem?.particles) {
        particles = viewer.diveSystem.particles;
      }
      else if (typeof window !== 'undefined' && window.diveSystem?.particles) {
        particles = window.diveSystem.particles;
      }
      else if (viewer.belowViewer?.diveSystem?.particles) {
        particles = viewer.belowViewer.diveSystem.particles;
      }

      if (!particles) {
        console.log('🌊 Particles not initialized');
        return null;
      }
      const particleInfo = {
        count: particles.particleCount,
        visible: particles.particles ? particles.particles.visible : false,
        bounds: {
          min: {
            x: parseFloat(particles.particleBounds.min.x.toFixed(3)),
            y: parseFloat(particles.particleBounds.min.y.toFixed(3)),
            z: parseFloat(particles.particleBounds.min.z.toFixed(3))
          },
          max: {
            x: parseFloat(particles.particleBounds.max.x.toFixed(3)),
            y: parseFloat(particles.particleBounds.max.y.toFixed(3)),
            z: parseFloat(particles.particleBounds.max.z.toFixed(3))
          }
        }
      };

      console.log('🌊 Particle information:');
      console.table(particleInfo);

      return particleInfo;
    };

    window.stereo = (enable, eyeSeparation) => {
      console.warn('stereo() is deprecated. Use camera.setStereo(...) instead.');
      return window.camera.setStereo(enable, eyeSeparation);
    };

    window.perfStats = (enable = true) => {
      if (!viewer.setPerfStats) {
        console.warn('Performance monitor unavailable');
        return null;
      }
      const monitor = viewer.setPerfStats(enable);
      console.log(`📈 Performance stats ${enable ? 'enabled — watch for [BelowPerf] lines' : 'disabled'}`);
      return monitor;
    };
    
    window.debugHelp = () => {
      console.log('🔧 BelowJS Debug Commands:');
      console.log('  camera()                  - Get current camera position data');
      console.log('  camera.setOrthographic()  - Switch desktop camera to orthographic projection');
      console.log('  camera.setPerspective()   - Switch desktop camera to perspective projection');
      console.log('  camera.setFar(n)          - Set camera far clipping distance');
      console.log('  camera.setClipping(n, f)  - Set near/far, or one value for far only');
      console.log('  camera.fitClipping(2)     - Set far clipping to at least 2x loaded model size');
      console.log('  camera.setMaxDistance(n)  - Set desktop orbit zoom-out distance');
      console.log('  camera.setStereo()        - Get/set stereo mode and eye separation');
      console.log('  scene()                   - Get scene information and object counts');
      console.log('  scene.setBrightness(n)    - Set scene brightness from -3 dark to +3 bright');
      console.log('  vertices()                - Get scene vertex counts');
      console.log('  models()                  - Get loaded models information');
      console.log('  particles()               - Get particle system information');
      console.log('  vr()                      - Get VR state and settings');
      console.log('  perfStats(true|false)     - Toggle [BelowPerf] frame/tileset stats');
      console.log('  stereo()                  - Deprecated; use camera.setStereo()');
      console.log('  debugHelp()               - Show this help message');
      console.log('');
      console.log('Global objects:');
      console.log('  belowViewer - Direct access to BelowViewer instance');
    };
  }
  
  /**
   * Clean up debug commands when viewer is disposed
   */
  static cleanup() {
    if (typeof window === 'undefined') return;

    delete window.camera;
    delete window.scene;
    delete window.vertices;
    delete window.models;
    delete window.particles;
    delete window.vr;
    delete window.stereo;
    delete window.perfStats;
    delete window.debugHelp;
    delete window.belowViewer;
  }
}
