import * as THREE from 'three';

const PANEL_WIDTH = 512;
const PANEL_HEIGHT = 256;

function wrapText(ctx, text, maxWidth) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export class AnnotationXRLayer {
  constructor(system, options = {}) {
    this.system = system;
    this.enabled = options.enabled !== false;
    this.interaction = options.interaction || 'select';
    this.group = new THREE.Group();
    this.group.name = 'BelowJSAnnotationsXR';
    this.group.visible = false;
    this.markerMesh = null;
    this.markerIds = [];
    this.signature = '';
    this.panel = null;
    this.controllers = [];
    this._raycaster = new THREE.Raycaster();
    this._matrix = new THREE.Matrix4();
    this._origin = new THREE.Vector3();
    this._direction = new THREE.Vector3();
    this._cameraWorldQuaternion = new THREE.Quaternion();
    this._parentWorldQuaternion = new THREE.Quaternion();
  }

  attach(model) {
    if (this.group.parent !== model) {
      this.group.removeFromParent();
      model?.add?.(this.group);
    }
    this.bindControllers();
    this.signature = '';
  }

  bindControllers() {
    const renderer = this.system.getRenderer?.();
    if (!renderer?.xr || this.controllers.length) return;
    for (let index = 0; index < 2; index += 1) {
      const controller = renderer.xr.getController?.(index);
      if (!controller) continue;
      const onSelect = () => this.selectFromController(controller);
      controller.addEventListener('selectstart', onSelect);
      this.controllers.push({ controller, onSelect });
    }
  }

  selectFromController(controller) {
    if (!this.group.visible || !this.markerMesh || this.interaction !== 'select') return;
    this._matrix.identity().extractRotation(controller.matrixWorld);
    this._origin.setFromMatrixPosition(controller.matrixWorld);
    this._direction.set(0, 0, -1).applyMatrix4(this._matrix).normalize();
    this._raycaster.set(this._origin, this._direction);
    const hit = this._raycaster.intersectObject(this.markerMesh, false)[0];
    if (!hit || hit.instanceId === undefined) return;
    const annotationId = this.markerIds[hit.instanceId];
    if (annotationId !== undefined) this.system.select([annotationId]);
  }

  sync() {
    if (!this.enabled) return;
    const renderer = this.system.getRenderer?.();
    const presenting = !!renderer?.xr?.isPresenting;
    const model = this.system._activeModel || this.system.getModelRoot?.();
    if (model && this.group.parent !== model) this.attach(model);
    this.group.visible = presenting && this.system.annotationsVisible;
    if (!this.group.visible || !model) return;

    const annotations = this.system.sortedAnnotations();
    const signature = annotations.map((annotation) => [
      annotation.id,
      annotation.position.x,
      annotation.position.y,
      annotation.position.z,
      annotation.collapsed ? 1 : 0
    ].join(':')).join('|');
    if (signature !== this.signature) {
      this.signature = signature;
      this.rebuildMarkers(annotations, model);
    }
    this.updatePanel();
  }

  rebuildMarkers(annotations, model) {
    if (this.markerMesh) {
      this.markerMesh.removeFromParent();
      this.markerMesh.geometry.dispose();
      this.markerMesh.material.dispose();
    }
    this.markerIds = annotations.map((annotation) => annotation.id);
    if (!annotations.length) {
      this.markerMesh = null;
      return;
    }
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3()).length();
    const radius = Math.min(0.25, Math.max(0.02, size * 0.002));
    const geometry = new THREE.SphereGeometry(radius, 12, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0x9ddcf0, depthTest: true });
    const mesh = new THREE.InstancedMesh(geometry, material, annotations.length);
    mesh.name = 'BelowJSAnnotationMarkersXR';
    const matrix = new THREE.Matrix4();
    const scale = new THREE.Vector3();
    annotations.forEach((annotation, index) => {
      scale.setScalar(annotation.collapsed ? 0.45 : 1);
      matrix.compose(
        new THREE.Vector3(annotation.position.x, annotation.position.y, annotation.position.z),
        new THREE.Quaternion(),
        scale
      );
      mesh.setMatrixAt(index, matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    this.markerMesh = mesh;
    this.group.add(mesh);
  }

  updatePanel() {
    const annotationId = this.system.selection?.[0];
    const annotation = this.system.annotations.get(annotationId);
    if (!annotation) {
      this.panel?.removeFromParent();
      return;
    }
    if (!this.panel) this.panel = this.createPanel();
    if (this.panel.userData.annotationId !== annotationId || this.panel.userData.title !== annotation.title || this.panel.userData.notes !== annotation.notes) {
      this.drawPanel(annotation);
    }
    this.panel.position.set(annotation.position.x, annotation.position.y + this.panel.userData.offset, annotation.position.z);
    if (this.panel.parent !== this.group) this.group.add(this.panel);
    const camera = this.system.getCamera?.();
    if (camera) {
      camera.getWorldQuaternion(this._cameraWorldQuaternion);
      this.group.getWorldQuaternion(this._parentWorldQuaternion).invert();
      this.panel.quaternion
        .copy(this._parentWorldQuaternion)
        .multiply(this._cameraWorldQuaternion);
    }
  }

  createPanel() {
    const canvas = document.createElement('canvas');
    canvas.width = PANEL_WIDTH;
    canvas.height = PANEL_HEIGHT;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(1.8, 0.9, 1);
    sprite.userData.canvas = canvas;
    sprite.userData.offset = 0.45;
    return sprite;
  }

  drawPanel(annotation) {
    const canvas = this.panel.userData.canvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(4, 17, 29, 0.94)';
    ctx.strokeStyle = 'rgba(157, 220, 240, 0.8)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(4, 4, canvas.width - 8, canvas.height - 8, 24);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#eef9fc';
    ctx.font = '600 36px -apple-system, sans-serif';
    wrapText(ctx, annotation.title, 448).slice(0, 2).forEach((line, index) => ctx.fillText(line, 32, 54 + index * 42));
    ctx.fillStyle = '#b7cdd5';
    ctx.font = '25px -apple-system, sans-serif';
    wrapText(ctx, annotation.notes, 448).slice(0, 4).forEach((line, index) => ctx.fillText(line, 32, 145 + index * 30));
    this.panel.material.map.needsUpdate = true;
    this.panel.userData.annotationId = annotation.id;
    this.panel.userData.title = annotation.title;
    this.panel.userData.notes = annotation.notes;
  }

  dispose() {
    for (const { controller, onSelect } of this.controllers) controller.removeEventListener('selectstart', onSelect);
    this.controllers = [];
    this.markerMesh?.geometry?.dispose();
    this.markerMesh?.material?.dispose();
    this.panel?.material?.map?.dispose();
    this.panel?.material?.dispose();
    this.group.removeFromParent();
    this.group.clear();
  }
}
