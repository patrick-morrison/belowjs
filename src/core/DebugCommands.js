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
      if (enable === undefined) {
        // Just return current state
        const stereoInfo = {
          enabled: viewer.stereoEnabled || false,
          mode: viewer.stereoMode || 'sbs',
          eyeSeparation: viewer.stereoEyeSeparation || 0.064
        };
        console.log('👓 Stereo information:');
        console.table(stereoInfo);
        console.log('');
        console.log('Usage:');
        console.log('  stereo(true)           - Enable stereo mode');
        console.log('  stereo(false)          - Disable stereo mode');
        console.log('  stereo(true, 0.065)    - Enable with custom eye separation');
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
    
    window.tiles = (showVRPanel) => {
      const tl = viewer.tilesetLoader;
      const r = viewer.renderer;
      const info = r?.info;

      if (!tl) {
        console.log('No tileset loader active');
        return null;
      }

      const fps = viewer._smoothedFrameTimeMs > 0
        ? Math.round(1000 / viewer._smoothedFrameTimeMs)
        : '?';
      const frameTimeMs = viewer._smoothedFrameTimeMs?.toFixed(1) || '?';
      const triangles = info?.render?.triangles || 0;
      const calls = info?.render?.calls || 0;

      const tileData = [];
      tl.activeTilesets.forEach((tileset) => {
        const state = tl.tilesetStates.get(tileset);
        tileData.push({
          errorTarget: tileset.errorTarget?.toFixed(2),
          maxTilesProcessed: tileset.maxTilesProcessed,
          pendingQueue: tl.pendingQueueTasks.length,
          maxTriangles: state?.maxTriangles || 'none'
        });
      });

      const result = {
        fps,
        frameTimeMs,
        triangles,
        drawCalls: calls,
        tilesets: tileData
      };

      console.log('🧱 Tile streaming stats:');
      console.log(`  FPS: ${fps} (${frameTimeMs}ms)`);
      console.log(`  Triangles: ${(triangles / 1e6).toFixed(2)}M`);
      console.log(`  Draw calls: ${calls}`);
      tileData.forEach((td, i) => {
        console.log(`  Tileset ${i}: errorTarget=${td.errorTarget}, maxTilesProcessed=${td.maxTilesProcessed}, pending=${td.pendingQueue}`);
      });

      // Toggle VR stats panel
      if (showVRPanel !== undefined) {
        viewer._vrStatsEnabled = !!showVRPanel;
        console.log(`  VR stats panel: ${showVRPanel ? 'enabled' : 'disabled'}`);
      }

      return result;
    };

    window.debugHelp = () => {
      console.log('🔧 BelowJS Debug Commands:');
      console.log('  camera()    - Get current camera position data');
      console.log('  scene()     - Get scene information and object counts');
      console.log('  vertices()  - Get scene vertex counts');
      console.log('  models()    - Get loaded models information');
      console.log('  particles() - Get particle system information');
      console.log('  vr()        - Get VR state and settings');
      console.log('  stereo()    - Get/set stereo mode and eye separation');
      console.log('  tiles()     - Get tile streaming stats; tiles(true/false) toggles VR panel');
      console.log('  debugHelp() - Show this help message');
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
    delete window.tiles;
    delete window.debugHelp;
    delete window.belowViewer;
  }
}
