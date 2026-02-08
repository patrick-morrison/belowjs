import * as THREE from 'three';
import { TilesRenderer } from '3d-tiles-renderer/three';

export class TilesetLoader {
  constructor(renderer = null, camera = null) {
    this.renderer = renderer;
    this.camera = camera;
    this.activeTilesets = new Set();
  }

  setRenderer(renderer) {
    this.renderer = renderer;
    this.updateResolution();
  }

  setCamera(camera) {
    this.camera = camera;
    if (this.camera) {
      this.activeTilesets.forEach((tileset) => tileset.setCamera(this.camera));
    }
  }

  updateResolution() {
    if (!this.renderer || !this.camera) {
      return;
    }
    this.activeTilesets.forEach((tileset) => {
      tileset.setResolutionFromRenderer(this.camera, this.renderer);
    });
  }

  applyOptions(tileset, options) {
    if (!options) {
      return;
    }

    const {
      errorTarget,
      maxDepth,
      loadSiblings,
      optimizedLoadStrategy,
      maxTilesProcessed,
      fetchOptions
    } = options;

    if (typeof errorTarget === 'number') tileset.errorTarget = errorTarget;
    if (typeof maxDepth === 'number') tileset.maxDepth = maxDepth;
    if (typeof loadSiblings === 'boolean') tileset.loadSiblings = loadSiblings;
    if (typeof optimizedLoadStrategy === 'boolean') tileset.optimizedLoadStrategy = optimizedLoadStrategy;
    if (typeof maxTilesProcessed === 'number') tileset.maxTilesProcessed = maxTilesProcessed;
    if (fetchOptions && typeof fetchOptions === 'object') tileset.fetchOptions = fetchOptions;
  }

  load(url, options = {}) {
    return new Promise((resolve, reject) => {
      const tileset = new TilesRenderer(url);
      this.applyOptions(tileset, options);

      if (this.camera) {
        tileset.setCamera(this.camera);
      }
      if (this.renderer && this.camera) {
        tileset.setResolutionFromRenderer(this.camera, this.renderer);
      }

      let abortHandler = null;
      const cleanup = () => {
        tileset.removeEventListener('load-tileset', handleLoad);
        tileset.removeEventListener('load-error', handleError);
        if (abortHandler && options.signal) {
          options.signal.removeEventListener('abort', abortHandler);
        }
      };

      const handleLoad = () => {
        cleanup();
        const group = tileset.group;
        const bounds = new THREE.Box3();
        if (tileset.getBoundingBox(bounds)) {
          group.userData.boundingBox = bounds;
        }
        this.activeTilesets.add(tileset);
        resolve({ group, tileset });
      };

      const handleError = (event) => {
        cleanup();
        tileset.dispose();
        reject(event?.error || new Error('Tileset failed to load'));
      };

      tileset.addEventListener('load-tileset', handleLoad);
      tileset.addEventListener('load-error', handleError);

      if (options.signal) {
        abortHandler = () => {
          cleanup();
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

  update() {
    this.activeTilesets.forEach((tileset) => {
      tileset.update();
    });
  }

  disposeTileset(tileset) {
    if (!tileset) {
      return;
    }
    if (this.activeTilesets.has(tileset)) {
      this.activeTilesets.delete(tileset);
    }
    tileset.dispose();
  }

  dispose() {
    this.activeTilesets.forEach((tileset) => tileset.dispose());
    this.activeTilesets.clear();
  }
}
