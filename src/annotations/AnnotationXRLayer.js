import * as THREE from 'three';

const PANEL_WIDTH = 1024;
const PANEL_HEIGHT = 420;
const DEFAULT_RAY_LENGTH = 6;
const MAX_RAY_LENGTH = 30;
const MARKER_MIN_RADIUS = 0.025;
const MARKER_MAX_RADIUS = 0.14;
const MARKER_ATLAS_CELL = 128;
const MARKER_ATLAS_COLUMNS = 32;
const BILLBOARD_RESPONSE = 3.2;
const BILLBOARD_START_ANGLE = THREE.MathUtils.degToRad(22);
const BILLBOARD_STOP_ANGLE = THREE.MathUtils.degToRad(4);

const MARKER_COLOR = new THREE.Color(0x8dd8f0);
const MARKER_SELECTED_COLOR = new THREE.Color(0xffffff);
const MARKER_HOVER_COLOR = new THREE.Color(0xffd166);

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
    this.markerHaloMesh = null;
    this.markerHitMesh = null;
    this.markerAtlasTexture = null;
    this.markerIds = [];
    this.signature = '';
    this.panel = null;
    this.controllers = [];
    this._raycaster = new THREE.Raycaster();
    this._matrix = new THREE.Matrix4();
    this._origin = new THREE.Vector3();
    this._direction = new THREE.Vector3();
    this._cameraWorldQuaternion = new THREE.Quaternion();
    this._billboardWorldQuaternion = new THREE.Quaternion();
    this._targetBillboardQuaternion = new THREE.Quaternion();
    this._billboardInitialized = false;
    this._billboardFollowing = false;
    this._billboardRight = new THREE.Vector3(1, 0, 0);
    this._billboardUp = new THREE.Vector3(0, 1, 0);
    this._billboardNormal = new THREE.Vector3(0, 0, 1);
    this._worldUp = new THREE.Vector3(0, 1, 0);
    this._billboardMatrix = new THREE.Matrix4();
    this._cameraWorldPosition = new THREE.Vector3();
    this._parentWorldScale = new THREE.Vector3(1, 1, 1);
    this._worldPosition = new THREE.Vector3();
    this._liftDirection = new THREE.Vector3();
    this._localPosition = new THREE.Vector3();
    this._localScale = new THREE.Vector3();
    this._haloScale = new THREE.Vector3();
    this._panelWorldPosition = new THREE.Vector3();
    this._instanceMatrix = new THREE.Matrix4();
    this._identityQuaternion = new THREE.Quaternion();
    this.hoveredIds = new Set();
  }

  attach(model) {
    if (this.group.parent !== model) {
      this.group.removeFromParent();
      model?.add?.(this.group);
    }
    this.bindControllers();
    this.signature = '';
    this._billboardInitialized = false;
    this._billboardFollowing = false;
  }

  bindControllers() {
    const renderer = this.system.getRenderer?.();
    if (!renderer?.xr || this.controllers.length) return;
    for (let index = 0; index < 2; index += 1) {
      const controller = renderer.xr.getController?.(index);
      if (!controller) continue;
      const ray = this.createControllerRay();
      const record = {
        controller,
        ray,
        connected: !!controller.userData?.initialised,
        inputSource: controller.userData?.inputSource || null,
        hoveredId: undefined,
        rayFade: 0,
        onSelect: null,
        onConnected: null,
        onDisconnected: null
      };
      record.onSelect = (event) => this.selectFromController(controller, event);
      record.onConnected = (event) => {
        record.connected = true;
        record.inputSource = event?.data || event?.inputSource || record.inputSource;
      };
      record.onDisconnected = () => {
        record.connected = false;
        record.inputSource = null;
        record.hoveredId = undefined;
        record.rayFade = 0;
        ray.visible = false;
      };
      controller.add(ray);
      controller.addEventListener('connected', record.onConnected);
      controller.addEventListener('disconnected', record.onDisconnected);
      const onSelect = record.onSelect;
      controller.addEventListener('selectstart', onSelect);
      this.controllers.push(record);
    }
  }

  createControllerRay() {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1)
    ]);
    const material = new THREE.LineBasicMaterial({
      color: 0xf4fbff,
      transparent: true,
      opacity: 0.72,
      depthTest: false,
      depthWrite: false
    });
    const ray = new THREE.Line(geometry, material);
    ray.name = 'BelowJSAnnotationControllerRay';
    ray.scale.z = DEFAULT_RAY_LENGTH;
    ray.renderOrder = 1000;
    ray.visible = false;
    const reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.66, 1, 28),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        depthTest: false,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false
      })
    );
    reticle.name = 'BelowJSAnnotationControllerReticle';
    reticle.position.z = -1;
    reticle.renderOrder = 1001;
    reticle.visible = false;
    ray.add(reticle);
    ray.userData.reticle = reticle;
    return ray;
  }

  pulseHaptics(gamepad, intensity, duration) {
    const actuator = gamepad?.hapticActuators?.[0] || gamepad?.vibrationActuator;
    try {
      actuator?.pulse?.(intensity, duration)?.catch?.(() => {});
    } catch {
      // Haptics are optional and must never interrupt annotation input.
    }
  }

  getControllerHit(controller) {
    const hitTarget = this.markerHitMesh || this.markerMesh;
    if (!this.group.visible || !hitTarget || this.interaction !== 'select') return;
    controller.updateWorldMatrix?.(true, false);
    hitTarget.updateWorldMatrix?.(true, false);
    this._matrix.identity().extractRotation(controller.matrixWorld);
    this._origin.setFromMatrixPosition(controller.matrixWorld);
    this._direction.set(0, 0, -1).applyMatrix4(this._matrix).normalize();
    this._raycaster.set(this._origin, this._direction);
    this._raycaster.far = MAX_RAY_LENGTH;
    return this._raycaster.intersectObject(hitTarget, false)[0] || null;
  }

  selectFromController(controller, event = null) {
    const hit = this.getControllerHit(controller);
    controller.userData.belowjsAnnotationTrigger = !!(hit && hit.instanceId !== undefined);
    if (!hit || hit.instanceId === undefined) {
      if (this.system.selection?.length) this.system.select([]);
      return false;
    }
    const annotationId = this.markerIds[hit.instanceId];
    if (annotationId === undefined) return false;
    const alreadySelected = this.system.selection?.length === 1 && this.system.selection[0] === annotationId;
    this.system.select(alreadySelected ? [] : [annotationId]);
    const gamepad = event?.data?.gamepad || event?.inputSource?.gamepad;
    this.pulseHaptics(gamepad, 0.35, 35);
    return true;
  }

  sync(dt = 0.016) {
    if (!this.enabled) return;
    const renderer = this.system.getRenderer?.();
    const presenting = !!renderer?.xr?.isPresenting;
    const model = this.system._activeModel || this.system.getModelRoot?.();
    if (model && this.group.parent !== model) this.attach(model);
    this.group.visible = presenting && this.system.annotationsVisible;
    if (!this.group.visible || !model) {
      this._billboardInitialized = false;
      this._billboardFollowing = false;
      this.setControllerRaysVisible(false);
      return;
    }

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
      this.rebuildMarkers(annotations);
    }
    this.updateFacing(dt);
    this.updateMarkerTransforms(annotations);
    this.updateControllerInteractions();
    this.updatePanel();
  }

  disposeMarkerMeshes() {
    if (this.markerMesh) {
      this.markerMesh.removeFromParent();
      this.markerMesh.geometry.dispose();
      this.markerMesh.material.dispose();
    }
    if (this.markerHaloMesh) {
      this.markerHaloMesh.removeFromParent();
      this.markerHaloMesh.geometry.dispose();
      this.markerHaloMesh.material.dispose();
    }
    if (this.markerHitMesh) {
      this.markerHitMesh.removeFromParent();
      this.markerHitMesh.geometry.dispose();
      this.markerHitMesh.material.dispose();
    }
    this.markerMesh = null;
    this.markerHaloMesh = null;
    this.markerHitMesh = null;
    this.markerAtlasTexture?.dispose();
    this.markerAtlasTexture = null;
  }

  createMarkerAtlas(count) {
    if (typeof document === 'undefined') return null;
    const columns = Math.min(MARKER_ATLAS_COLUMNS, Math.max(1, count));
    const rows = Math.max(1, Math.ceil(count / columns));
    const canvas = document.createElement('canvas');
    canvas.width = columns * MARKER_ATLAS_CELL;
    canvas.height = rows * MARKER_ATLAS_CELL;
    const ctx = canvas.getContext('2d');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let index = 0; index < count; index += 1) {
      const column = index % columns;
      const row = Math.floor(index / columns);
      const x = column * MARKER_ATLAS_CELL + MARKER_ATLAS_CELL / 2;
      const y = row * MARKER_ATLAS_CELL + MARKER_ATLAS_CELL / 2;
      ctx.save();
      ctx.shadowColor = 'rgba(100, 181, 246, 0.52)';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#185f87';
      ctx.strokeStyle = 'rgba(238, 249, 252, 0.96)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(x, y, 46, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.fillStyle = '#ffffff';
      const digits = String(index + 1).length;
      ctx.font = `700 ${digits > 2 ? 36 : 44}px -apple-system, sans-serif`;
      ctx.fillText(String(index + 1), x, y + 2);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = Math.min(8, this.system.getRenderer?.()?.capabilities?.getMaxAnisotropy?.() || 1);
    return { texture, columns, rows };
  }

  createMarkerMaterial(atlas, columns, rows) {
    return new THREE.ShaderMaterial({
      uniforms: {
        markerAtlas: { value: atlas },
        atlasScale: { value: new THREE.Vector2(1 / columns, 1 / rows) },
        billboardRight: { value: this._billboardRight },
        billboardUp: { value: this._billboardUp }
      },
      vertexShader: `
        attribute vec2 annotationUvOffset;
        varying vec2 vAnnotationUv;
        uniform vec2 atlasScale;
        uniform vec3 billboardRight;
        uniform vec3 billboardUp;
        void main() {
          vAnnotationUv = uv * atlasScale + annotationUvOffset;
          mat4 instanceModel = modelMatrix * instanceMatrix;
          vec4 worldCenter = instanceModel * vec4(0.0, 0.0, 0.0, 1.0);
          vec2 billboardScale = vec2(
            length(instanceModel[0].xyz),
            length(instanceModel[1].xyz)
          );
          vec3 billboardPosition = worldCenter.xyz
            + billboardRight * position.x * billboardScale.x
            + billboardUp * position.y * billboardScale.y;
          gl_Position = projectionMatrix * viewMatrix * vec4(billboardPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D markerAtlas;
        varying vec2 vAnnotationUv;
        void main() {
          vec4 marker = texture2D(markerAtlas, vAnnotationUv);
          if (marker.a < 0.08) discard;
          gl_FragColor = marker;
        }
      `,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false
    });
  }

  createHaloMaterial() {
    return new THREE.ShaderMaterial({
      uniforms: {
        billboardRight: { value: this._billboardRight },
        billboardUp: { value: this._billboardUp }
      },
      vertexShader: `
        varying vec3 vInstanceColor;
        uniform vec3 billboardRight;
        uniform vec3 billboardUp;
        void main() {
          vInstanceColor = instanceColor;
          mat4 instanceModel = modelMatrix * instanceMatrix;
          vec4 worldCenter = instanceModel * vec4(0.0, 0.0, 0.0, 1.0);
          vec2 billboardScale = vec2(
            length(instanceModel[0].xyz),
            length(instanceModel[1].xyz)
          );
          vec3 billboardPosition = worldCenter.xyz
            + billboardRight * position.x * billboardScale.x
            + billboardUp * position.y * billboardScale.y;
          gl_Position = projectionMatrix * viewMatrix * vec4(billboardPosition, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vInstanceColor;
        void main() {
          gl_FragColor = vec4(vInstanceColor, 0.24);
        }
      `,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false
    });
  }

  rebuildMarkers(annotations) {
    this.disposeMarkerMeshes();
    this.markerIds = annotations.map((annotation) => annotation.id);
    if (!annotations.length) {
      return;
    }
    const atlas = this.createMarkerAtlas(annotations.length);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const offsets = new Float32Array(annotations.length * 2);
    const columns = atlas?.columns || 1;
    const rows = atlas?.rows || 1;
    annotations.forEach((_annotation, index) => {
      offsets[index * 2] = (index % columns) / columns;
      offsets[index * 2 + 1] = (rows - 1 - Math.floor(index / columns)) / rows;
    });
    geometry.setAttribute('annotationUvOffset', new THREE.InstancedBufferAttribute(offsets, 2));
    this.markerAtlasTexture = atlas?.texture || null;
    const material = atlas
      ? this.createMarkerMaterial(atlas.texture, columns, rows)
      : new THREE.MeshBasicMaterial({ color: 0x185f87, depthTest: true, side: THREE.DoubleSide });
    const mesh = new THREE.InstancedMesh(geometry, material, annotations.length);
    mesh.name = 'BelowJSAnnotationMarkersXR';
    mesh.frustumCulled = false;
    const haloGeometry = new THREE.RingGeometry(1.08, 1.32, 28);
    const haloMaterial = this.createHaloMaterial();
    const haloMesh = new THREE.InstancedMesh(haloGeometry, haloMaterial, annotations.length);
    haloMesh.name = 'BelowJSAnnotationMarkerHalosXR';
    haloMesh.frustumCulled = false;
    haloMesh.renderOrder = 1;
    const hitGeometry = new THREE.SphereGeometry(1, 12, 8);
    const hitMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthTest: false,
      depthWrite: false,
      colorWrite: false
    });
    const hitMesh = new THREE.InstancedMesh(hitGeometry, hitMaterial, annotations.length);
    hitMesh.name = 'BelowJSAnnotationMarkerTargetsXR';
    hitMesh.frustumCulled = false;
    this.markerMesh = mesh;
    this.markerHaloMesh = haloMesh;
    this.markerHitMesh = hitMesh;
    this.group.add(mesh);
    this.group.add(haloMesh);
    this.group.add(hitMesh);
    this.updateMarkerTransforms(annotations);
  }

  getViewCamera() {
    const camera = this.system.getCamera?.();
    const renderer = this.system.getRenderer?.();
    if (!camera || !renderer?.xr?.isPresenting) return camera;
    return renderer.xr.getCamera?.(camera) || camera;
  }

  updateFacing(dt = 0.016) {
    const camera = this.getViewCamera();
    if (!camera) return;
    camera.getWorldQuaternion(this._cameraWorldQuaternion);
    this._billboardNormal.set(0, 0, 1).applyQuaternion(this._cameraWorldQuaternion).normalize();
    this._billboardRight.crossVectors(this._worldUp, this._billboardNormal);
    if (this._billboardRight.lengthSq() < 1e-6) {
      this._billboardRight.set(1, 0, 0).applyQuaternion(this._cameraWorldQuaternion);
    }
    this._billboardRight.normalize();
    this._billboardUp.crossVectors(this._billboardNormal, this._billboardRight).normalize();
    this._billboardMatrix.makeBasis(this._billboardRight, this._billboardUp, this._billboardNormal);
    this._targetBillboardQuaternion.setFromRotationMatrix(this._billboardMatrix);
    if (!this._billboardInitialized) {
      this._billboardWorldQuaternion.copy(this._targetBillboardQuaternion);
      this._billboardInitialized = true;
    } else {
      const facingError = this._billboardWorldQuaternion.angleTo(this._targetBillboardQuaternion);
      if (this._billboardFollowing) {
        if (facingError <= BILLBOARD_STOP_ANGLE) this._billboardFollowing = false;
      } else if (facingError >= BILLBOARD_START_ANGLE) {
        this._billboardFollowing = true;
      }
      if (this._billboardFollowing) {
        const follow = 1 - Math.exp(-BILLBOARD_RESPONSE * Math.max(0, Math.min(0.1, dt)));
        this._billboardWorldQuaternion.slerp(this._targetBillboardQuaternion, follow);
      }
    }
    this._billboardRight.set(1, 0, 0).applyQuaternion(this._billboardWorldQuaternion).normalize();
    this._billboardUp.set(0, 1, 0).applyQuaternion(this._billboardWorldQuaternion).normalize();
  }

  updateMarkerTransforms(annotations) {
    if (!this.markerMesh || !this.markerHaloMesh) return;
    const camera = this.getViewCamera();
    this.group.updateWorldMatrix?.(true, false);
    this.group.getWorldScale(this._parentWorldScale);
    camera?.getWorldPosition(this._cameraWorldPosition);
    const sx = Math.max(1e-6, Math.abs(this._parentWorldScale.x));
    const sy = Math.max(1e-6, Math.abs(this._parentWorldScale.y));
    const sz = Math.max(1e-6, Math.abs(this._parentWorldScale.z));
    // Visible marker planes billboard per eye in their vertex shaders. Keep
    // instance matrices rotation-free so stereo rendering never inherits a
    // stale mono/headset quaternion from the CPU frame lifecycle.
    this._identityQuaternion.identity();
    annotations.forEach((annotation, index) => {
      this._localPosition.set(annotation.position.x, annotation.position.y, annotation.position.z);
      this._worldPosition.copy(this._localPosition).applyMatrix4(this.group.matrixWorld);
      const distance = camera ? this._cameraWorldPosition.distanceTo(this._worldPosition) : 4;
      let worldRadius = THREE.MathUtils.clamp(distance * 0.012, MARKER_MIN_RADIUS, MARKER_MAX_RADIUS);
      if (annotation.collapsed) worldRadius *= 0.55;
      if (camera) {
        this._liftDirection.copy(this._cameraWorldPosition).sub(this._worldPosition);
        if (this._liftDirection.lengthSq() > 1e-10) {
          this._liftDirection.normalize();
          this._worldPosition.addScaledVector(this._liftDirection, Math.max(0.006, worldRadius * 0.55));
          this._localPosition.copy(this._worldPosition);
          this.group.worldToLocal(this._localPosition);
        }
      }
      this._localScale.set(worldRadius / sx, worldRadius / sy, worldRadius / sz);
      this._instanceMatrix.compose(this._localPosition, this._identityQuaternion, this._localScale);
      this.markerMesh.setMatrixAt(index, this._instanceMatrix);
      const selected = this.system.selection?.includes(annotation.id);
      const hovered = this.hoveredIds.has(annotation.id);
      this.markerHaloMesh.setColorAt(index, hovered ? MARKER_HOVER_COLOR : selected ? MARKER_SELECTED_COLOR : MARKER_COLOR);
      this._haloScale.copy(this._localScale).multiplyScalar(hovered || selected ? 1.8 : 1.45);
      this._instanceMatrix.compose(this._localPosition, this._identityQuaternion, this._haloScale);
      this.markerHaloMesh.setMatrixAt(index, this._instanceMatrix);
      if (this.markerHitMesh) {
        this._haloScale.copy(this._localScale).multiplyScalar(2.15);
        this._instanceMatrix.compose(this._localPosition, this._identityQuaternion, this._haloScale);
        this.markerHitMesh.setMatrixAt(index, this._instanceMatrix);
      }
    });
    this.markerMesh.instanceMatrix.needsUpdate = true;
    this.markerHaloMesh.instanceMatrix.needsUpdate = true;
    if (this.markerHitMesh) this.markerHitMesh.instanceMatrix.needsUpdate = true;
    if (this.markerHaloMesh.instanceColor) this.markerHaloMesh.instanceColor.needsUpdate = true;
  }

  setControllerRaysVisible(visible) {
    if (!visible) {
      for (const record of this.controllers) {
        record.rayFade = 0;
        record.ray.visible = false;
      }
    }
  }

  updateControllerInteractions() {
    this.hoveredIds.clear();
    for (const record of this.controllers) {
      const active = this.group.visible && (record.connected || record.controller.visible !== false);
      const hit = active ? this.getControllerHit(record.controller) : null;
      const annotationId = hit?.instanceId === undefined ? undefined : this.markerIds[hit.instanceId];
      if (annotationId !== undefined && annotationId !== record.hoveredId) {
        this.pulseHaptics(record.inputSource?.gamepad, 0.12, 18);
      }
      record.hoveredId = annotationId;
      const targetFade = annotationId === undefined ? 0 : 1;
      record.rayFade += (targetFade - record.rayFade) * 0.34;
      if (annotationId !== undefined) {
        this.hoveredIds.add(annotationId);
        record.ray.scale.z = THREE.MathUtils.clamp(hit.distance, 0.05, MAX_RAY_LENGTH);
      }
      record.ray.visible = record.rayFade > 0.025;
      record.ray.material.color.set(0xf4fbff);
      record.ray.material.opacity = 0.76 * record.rayFade;
      const reticle = record.ray.userData.reticle;
      if (reticle) {
        const reticleSize = hit
          ? THREE.MathUtils.clamp(hit.distance * 0.006, 0.014, 0.045)
          : 0.014;
        reticle.scale.setScalar(reticleSize);
        reticle.material.opacity = 0.94 * record.rayFade;
        reticle.visible = record.ray.visible;
      }
    }
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
    if (this.panel.parent !== this.group) this.group.add(this.panel);
    const camera = this.getViewCamera();
    if (camera) {
      this.group.updateWorldMatrix?.(true, false);
      camera.getWorldPosition(this._cameraWorldPosition);
      this.group.getWorldScale(this._parentWorldScale);
      this._worldPosition
        .set(annotation.position.x, annotation.position.y, annotation.position.z)
        .applyMatrix4(this.group.matrixWorld);
      const distance = this._cameraWorldPosition.distanceTo(this._worldPosition);
      const worldWidth = THREE.MathUtils.clamp(distance * 0.22, 0.36, 0.95);
      const worldHeight = worldWidth * (PANEL_HEIGHT / PANEL_WIDTH);
      this._panelWorldPosition
        .copy(this._worldPosition)
        .addScaledVector(this._billboardUp, worldHeight * 0.72 + 0.05);
      this.panel.position.copy(this.group.worldToLocal(this._panelWorldPosition));
      this.panel.scale.set(
        worldWidth / Math.max(1e-6, Math.abs(this._parentWorldScale.x)),
        worldHeight / Math.max(1e-6, Math.abs(this._parentWorldScale.y)),
        1
      );
    }
  }

  createPanel() {
    const canvas = document.createElement('canvas');
    canvas.width = PANEL_WIDTH;
    canvas.height = PANEL_HEIGHT;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = Math.min(8, this.system.getRenderer?.()?.capabilities?.getMaxAnisotropy?.() || 1);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        panelMap: { value: texture },
        billboardRight: { value: this._billboardRight },
        billboardUp: { value: this._billboardUp }
      },
      vertexShader: `
        varying vec2 vPanelUv;
        uniform vec3 billboardRight;
        uniform vec3 billboardUp;
        void main() {
          vPanelUv = uv;
          vec4 worldCenter = modelMatrix * vec4(0.0, 0.0, 0.0, 1.0);
          vec2 panelScale = vec2(
            length(modelMatrix[0].xyz),
            length(modelMatrix[1].xyz)
          );
          vec3 panelPosition = worldCenter.xyz
            + billboardRight * position.x * panelScale.x
            + billboardUp * position.y * panelScale.y;
          gl_Position = projectionMatrix * viewMatrix * vec4(panelPosition, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vPanelUv;
        uniform sampler2D panelMap;
        void main() {
          vec4 panel = texture2D(panelMap, vPanelUv);
          if (panel.a < 0.02) discard;
          gl_FragColor = panel;
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false
    });
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    panel.scale.set(1, PANEL_HEIGHT / PANEL_WIDTH, 1);
    panel.userData.canvas = canvas;
    panel.renderOrder = 1001;
    return panel;
  }

  drawPanel(annotation) {
    const canvas = this.panel.userData.canvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(3, 15, 27, 0.96)';
    ctx.strokeStyle = 'rgba(141, 216, 240, 0.9)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(4, 4, canvas.width - 8, canvas.height - 8, 24);
    ctx.fill();
    ctx.stroke();
    const number = Math.max(1, this.system.sortedAnnotations?.().findIndex((item) => item.id === annotation.id) + 1 || 1);
    ctx.fillStyle = '#8dd8f0';
    ctx.beginPath();
    ctx.arc(52, 58, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#03101d';
    ctx.font = '700 26px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(String(number), 52, 67);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#eef9fc';
    ctx.font = '650 40px -apple-system, sans-serif';
    wrapText(ctx, annotation.title, 895).slice(0, 2).forEach((line, index) => ctx.fillText(line, 92, 54 + index * 46));
    ctx.fillStyle = '#b7cdd5';
    ctx.font = '30px -apple-system, sans-serif';
    wrapText(ctx, annotation.notes || 'No notes', 952).slice(0, 4).forEach((line, index) => ctx.fillText(line, 36, 158 + index * 39));
    ctx.fillStyle = 'rgba(184, 232, 247, 0.62)';
    ctx.font = '22px -apple-system, sans-serif';
    ctx.fillText('Trigger again to close', 36, 386);
    this.panel.material.uniforms.panelMap.value.needsUpdate = true;
    this.panel.userData.annotationId = annotation.id;
    this.panel.userData.title = annotation.title;
    this.panel.userData.notes = annotation.notes;
  }

  dispose() {
    for (const record of this.controllers) {
      const { controller, onSelect, onConnected, onDisconnected, ray } = record;
      controller.removeEventListener('selectstart', onSelect);
      controller.removeEventListener('connected', onConnected);
      controller.removeEventListener('disconnected', onDisconnected);
      ray.removeFromParent();
      ray.userData.reticle?.geometry?.dispose();
      ray.userData.reticle?.material?.dispose();
      ray.geometry.dispose();
      ray.material.dispose();
    }
    this.controllers = [];
    this.disposeMarkerMeshes();
    this.panel?.material?.uniforms?.panelMap?.value?.dispose();
    this.panel?.geometry?.dispose();
    this.panel?.material?.dispose();
    this.group.removeFromParent();
    this.group.clear();
  }
}
