import * as THREE from 'three';

function disposeMaterial(material) {
  if (!material) return;

  const materials = Array.isArray(material) ? material : [material];
  materials.forEach((mat) => {
    if (!mat) return;

    Object.keys(mat).forEach((key) => {
      const value = mat[key];
      if (value && value.isTexture) {
        value.dispose();
      }
    });

    if (typeof mat.dispose === 'function') {
      mat.dispose();
    }
  });
}

export function disposeObject3D(root) {
  if (!root || !root.traverse) return;

  root.traverse((child) => {
    if (child.geometry) {
      child.geometry.dispose();
    }
    if (child.material) {
      disposeMaterial(child.material);
    }
  });
}

export function clearThreeGlobalCache() {
  if (THREE.Cache && typeof THREE.Cache.clear === 'function') {
    THREE.Cache.clear();
  }
}
