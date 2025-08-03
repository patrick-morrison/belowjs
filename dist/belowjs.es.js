import * as u from "three";
import { Controls as Gi, Vector3 as D, MOUSE as Ce, TOUCH as pe, Quaternion as Ue, Spherical as xt, Vector2 as H, Ray as Pi, Plane as Ni, MathUtils as Ct, TrianglesDrawMode as Ui, TriangleFanDrawMode as At, TriangleStripDrawMode as oi, Loader as Et, LoaderUtils as ve, FileLoader as le, MeshPhysicalMaterial as ee, Color as ae, LinearSRGBColorSpace as Y, SRGBColorSpace as se, SpotLight as Hi, PointLight as Oi, DirectionalLight as Vi, Matrix4 as Re, InstancedMesh as qi, InstancedBufferAttribute as ji, Object3D as It, TextureLoader as zi, ImageBitmapLoader as Ki, BufferAttribute as xe, InterleavedBuffer as Yi, InterleavedBufferAttribute as Ae, LinearMipmapLinearFilter as Oe, NearestMipmapLinearFilter as Ji, LinearMipmapNearestFilter as Wi, NearestMipmapNearestFilter as Xi, LinearFilter as he, NearestFilter as ni, RepeatWrapping as lt, MirroredRepeatWrapping as Zi, ClampToEdgeWrapping as $i, PointsMaterial as es, Material as je, LineBasicMaterial as ts, MeshStandardMaterial as ai, DoubleSide as is, MeshBasicMaterial as me, PropertyBinding as ss, BufferGeometry as ri, SkinnedMesh as os, Mesh as Bt, LineSegments as ns, Line as as, LineLoop as rs, Points as As, Group as ze, PerspectiveCamera as ls, OrthographicCamera as cs, Skeleton as hs, AnimationClip as ds, Bone as gs, InterpolateDiscrete as us, InterpolateLinear as Ai, Texture as Dt, VectorKeyframeTrack as Rt, NumberKeyframeTrack as Tt, QuaternionKeyframeTrack as kt, ColorManagement as ct, FrontSide as ps, Interpolant as ms, Box3 as Ve, Sphere as yt, CompressedCubeTexture as fs, CompressedArrayTexture as bs, CompressedTexture as li, NoColorSpace as Lt, RGBA_BPTC_Format as ht, RGBA_S3TC_DXT5_Format as dt, RGBA_S3TC_DXT3_Format as Ft, RGB_S3TC_DXT1_Format as _t, RGBA_S3TC_DXT1_Format as gt, RGBA_ASTC_6x6_Format as Gt, RGBA_ASTC_4x4_Format as Ge, RGBA_ETC2_EAC_Format as ci, RGB_ETC2_Format as hi, RedFormat as Se, RGFormat as Me, RGBAFormat as fe, UnsignedByteType as K, HalfFloatType as be, FloatType as De, DataTexture as Cs, Data3DTexture as Es, RGB_PVRTC_4BPPV1_Format as Is, RGB_ETC1_Format as Bs, RGBA_PVRTC_4BPPV1_Format as ys, RGB_BPTC_UNSIGNED_Format as ws, SphereGeometry as Qs, InstancedBufferGeometry as Ss, Float32BufferAttribute as Pt, InstancedInterleavedBuffer as ut, WireframeGeometry as Ms, ShaderMaterial as vs, ShaderLib as Pe, UniformsUtils as di, UniformsLib as Ne, Vector4 as Te, Line3 as xs } from "three";
class qe {
  /**
   * Creates a new EventSystem instance
   */
  constructor() {
    this.events = {};
  }
  /**
   * Add an event listener
   * 
   * @method on
   * @param {string} event - Event name to listen for
   * @param {Function} callback - Callback function to execute
   * @returns {EventSystem} Returns this for chaining
   * 
   * @example
   * // Listen for model loading events
   * viewer.on('model-loaded', (data) => {
   *   console.log('Loaded:', data.model.name);
   * });
   * 
   * // Chain multiple listeners
   * viewer
   *   .on('model-loaded', onLoaded)
   *   .on('model-error', onError);
   * 
   * @since 1.0.0
   */
  on(e, t) {
    return this.events[e] || (this.events[e] = []), this.events[e].push(t), this;
  }
  /**
   * Remove an event listener
   * 
   * @method off
   * @param {string} event - Event name
   * @param {Function} [callback] - Specific callback to remove (optional)
   * @returns {EventSystem} Returns this for chaining
   * 
   * @example
   * // Remove specific callback
   * viewer.off('model-loaded', myCallback);
   * 
   * // Remove all listeners for an event
   * viewer.off('model-loaded');
   * 
   * @since 1.0.0
   */
  off(e, t) {
    return this.events[e] ? (t ? this.events[e] = this.events[e].filter((i) => i !== t) : this.events[e] = [], this) : this;
  }
  /**
   * Emit an event to all listeners
   * 
   * @method emit
   * @param {string} event - Event name to emit
   * @param {*} [data] - Data to pass to event listeners
   * @returns {EventSystem} Returns this for chaining
   * 
   * @example
   * // Emit event with data
   * this.emit('model-loaded', { 
   *   model: loadedModel, 
   *   loadTime: Date.now() - startTime 
   * });
   * 
   * // Emit event without data
   * this.emit('rendering-complete');
   * 
   * @since 1.0.0
   */
  emit(e, t) {
    return this.events[e] ? (this.events[e].forEach((i) => {
      try {
        i(t);
      } catch (s) {
        console.error(`Error in event callback for '${e}':`, s);
      }
    }), this) : this;
  }
  /**
   * Remove all event listeners
   * 
   * @method removeAllListeners
   * @returns {EventSystem} Returns this for chaining
   * 
   * @example
   * // Clean up all listeners
   * viewer.removeAllListeners();
   * 
   * @since 1.0.0
   */
  removeAllListeners() {
    return this.events = {}, this;
  }
}
const wt = {
  container: "#viewer-container",
  // Model configuration
  models: {},
  // Scene configuration
  scene: {
    background: 662058
    // Deep ocean blue
  },
  // Camera configuration
  camera: {
    fov: 65,
    near: 0.05,
    far: 2e3,
    position: { x: 0, y: 5, z: 10 }
  },
  // Renderer configuration
  renderer: {
    antialias: !0,
    powerPreference: "high-performance",
    pixelRatio: Math.min(window.devicePixelRatio, 2),
    outputColorSpace: "srgb",
    toneMapping: "none",
    toneMappingExposure: 1
  },
  // Controls configuration
  controls: {
    desktop: {
      enableDamping: !0,
      dampingFactor: 0.08,
      maxDistance: 100,
      minDistance: 0.5,
      enableFocus: !0
    }
  },
  // VR configuration - preserving original patterns
  vr: {
    enabled: !0,
    // Original movement speeds from index.html
    movement: {
      moveSpeed: 2,
      // m/s base movement speed
      turnSpeed: 1.5,
      // rad/s turn speed
      flySpeed: 1
      // m/s vertical movement
    },
    // Original ramping speeds for smooth movement
    ramping: {
      speedRampRate: 3,
      boostRampRate: 6
    },
    // Original controller mappings
    controllers: {
      leftHand: {
        movement: !0,
        // horizontal movement
        modeToggleButtons: [4, 5]
        // X, Y buttons
      },
      rightHand: {
        turning: !0,
        // horizontal turning
        verticalMovement: !0,
        // vertical movement
        modeToggleButtons: [4, 5]
        // A, B buttons
      },
      gripBoostMultiplier: 3
      // Original speed boost multiplier
    },
    // Original Quest optimizations
    optimization: {
      quest2RenderDistance: 20,
      // Limit for Quest 2
      autoDetectDevice: !0
    }
  }
};
function Ds(l = {}) {
  const e = Qt(wt, l);
  if (l.container && typeof l.container != "string")
    throw new Error("Container must be a string selector or element ID");
  return e;
}
function Rs(l) {
  return Qt(wt, l || {});
}
const Ts = {
  validate: Ds,
  mergeConfig: Rs,
  defaultConfig: wt
};
function Qt(l, e) {
  const t = { ...l };
  for (const i in e)
    e[i] && typeof e[i] == "object" && !Array.isArray(e[i]) ? t[i] = Qt(l[i] || {}, e[i]) : t[i] = e[i];
  return t;
}
class ks {
  constructor(e = {}) {
    this.config = e, this.scene = new u.Scene(), this.init();
  }
  init() {
    let e = 662058;
    this.config.background && (typeof this.config.background == "object" && this.config.background.value ? e = this.config.background.value : e = this.config.background), this.scene.background = new u.Color(e);
  }
  // setupLighting removed: all lighting is managed by DiveLighting
  add(e) {
    this.scene.add(e);
  }
  remove(e) {
    this.scene.remove(e);
  }
  getScene() {
    return this.scene;
  }
  dispose() {
    this.scene.clear();
  }
}
const Nt = { type: "change" }, St = { type: "start" }, gi = { type: "end" }, ke = new Pi(), Ut = new Ni(), Ls = Math.cos(70 * Ct.DEG2RAD), F = new D(), U = 2 * Math.PI, v = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, Ke = 1e-6;
class Fs extends Gi {
  /**
   * Constructs a new controls instance.
   *
   * @param {Object3D} object - The object that is managed by the controls.
   * @param {?HTMLDOMElement} domElement - The HTML element used for event listeners.
   */
  constructor(e, t = null) {
    super(e, t), this.state = v.NONE, this.target = new D(), this.cursor = new D(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Ce.ROTATE, MIDDLE: Ce.DOLLY, RIGHT: Ce.PAN }, this.touches = { ONE: pe.ROTATE, TWO: pe.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new D(), this._lastQuaternion = new Ue(), this._lastTargetPosition = new D(), this._quat = new Ue().setFromUnitVectors(e.up, new D(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new xt(), this._sphericalDelta = new xt(), this._scale = 1, this._panOffset = new D(), this._rotateStart = new H(), this._rotateEnd = new H(), this._rotateDelta = new H(), this._panStart = new H(), this._panEnd = new H(), this._panDelta = new H(), this._dollyStart = new H(), this._dollyEnd = new H(), this._dollyDelta = new H(), this._dollyDirection = new D(), this._mouse = new H(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = Gs.bind(this), this._onPointerDown = _s.bind(this), this._onPointerUp = Ps.bind(this), this._onContextMenu = js.bind(this), this._onMouseWheel = Hs.bind(this), this._onKeyDown = Os.bind(this), this._onTouchStart = Vs.bind(this), this._onTouchMove = qs.bind(this), this._onMouseDown = Ns.bind(this), this._onMouseMove = Us.bind(this), this._interceptControlDown = zs.bind(this), this._interceptControlUp = Ks.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
  }
  connect(e) {
    super.connect(e), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, { passive: !0, capture: !0 }), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  /**
   * Get the current vertical rotation, in radians.
   *
   * @return {number} The current vertical rotation, in radians.
   */
  getPolarAngle() {
    return this._spherical.phi;
  }
  /**
   * Get the current horizontal rotation, in radians.
   *
   * @return {number} The current horizontal rotation, in radians.
   */
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  /**
   * Returns the distance from the camera to the target.
   *
   * @return {number} The distance from the camera to the target.
   */
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  /**
   * Adds key event listeners to the given DOM element.
   * `window` is a recommended argument for using this method.
   *
   * @param {HTMLDOMElement} domElement - The DOM element
   */
  listenToKeyEvents(e) {
    e.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = e;
  }
  /**
   * Removes the key event listener previously defined with `listenToKeyEvents()`.
   */
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  /**
   * Save the current state of the controls. This can later be recovered with `reset()`.
   */
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  /**
   * Reset the controls to their state from either the last time the `saveState()`
   * was called, or the initial state.
   */
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Nt), this.update(), this.state = v.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    F.copy(t).sub(this.target), F.applyQuaternion(this._quat), this._spherical.setFromVector3(F), this.autoRotate && this.state === v.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let i = this.minAzimuthAngle, s = this.maxAzimuthAngle;
    isFinite(i) && isFinite(s) && (i < -Math.PI ? i += U : i > Math.PI && (i -= U), s < -Math.PI ? s += U : s > Math.PI && (s -= U), i <= s ? this._spherical.theta = Math.max(i, Math.min(s, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (i + s) / 2 ? Math.max(i, this._spherical.theta) : Math.min(s, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let o = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const n = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), o = n != this._spherical.radius;
    }
    if (F.setFromSpherical(this._spherical), F.applyQuaternion(this._quatInverse), t.copy(this.target).add(F), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let n = null;
      if (this.object.isPerspectiveCamera) {
        const a = F.length();
        n = this._clampDistance(a * this._scale);
        const r = a - n;
        this.object.position.addScaledVector(this._dollyDirection, r), this.object.updateMatrixWorld(), o = !!r;
      } else if (this.object.isOrthographicCamera) {
        const a = new D(this._mouse.x, this._mouse.y, 0);
        a.unproject(this.object);
        const r = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), o = r !== this.object.zoom;
        const A = new D(this._mouse.x, this._mouse.y, 0);
        A.unproject(this.object), this.object.position.sub(A).add(a), this.object.updateMatrixWorld(), n = F.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      n !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(n).add(this.object.position) : (ke.origin.copy(this.object.position), ke.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(ke.direction)) < Ls ? this.object.lookAt(this.target) : (Ut.setFromNormalAndCoplanarPoint(this.object.up, this.target), ke.intersectPlane(Ut, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const n = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), n !== this.object.zoom && (this.object.updateProjectionMatrix(), o = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, o || this._lastPosition.distanceToSquared(this.object.position) > Ke || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Ke || this._lastTargetPosition.distanceToSquared(this.target) > Ke ? (this.dispatchEvent(Nt), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? U / 60 * this.autoRotateSpeed * e : U / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(e) {
    const t = Math.abs(e * 0.01);
    return Math.pow(0.95, this.zoomSpeed * t);
  }
  _rotateLeft(e) {
    this._sphericalDelta.theta -= e;
  }
  _rotateUp(e) {
    this._sphericalDelta.phi -= e;
  }
  _panLeft(e, t) {
    F.setFromMatrixColumn(t, 0), F.multiplyScalar(-e), this._panOffset.add(F);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? F.setFromMatrixColumn(t, 1) : (F.setFromMatrixColumn(t, 0), F.crossVectors(this.object.up, F)), F.multiplyScalar(e), this._panOffset.add(F);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, t) {
    const i = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const s = this.object.position;
      F.copy(s).sub(this.target);
      let o = F.length();
      o *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * o / i.clientHeight, this.object.matrix), this._panUp(2 * t * o / i.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / i.clientWidth, this.object.matrix), this._panUp(t * (this.object.top - this.object.bottom) / this.object.zoom / i.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
  }
  _dollyOut(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _dollyIn(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _updateZoomParameters(e, t) {
    if (!this.zoomToCursor)
      return;
    this._performCursorZoom = !0;
    const i = this.domElement.getBoundingClientRect(), s = e - i.left, o = t - i.top, n = i.width, a = i.height;
    this._mouse.x = s / n * 2 - 1, this._mouse.y = -(o / a) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(e) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, e));
  }
  //
  // event callbacks - update the object state
  //
  _handleMouseDownRotate(e) {
    this._rotateStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownDolly(e) {
    this._updateZoomParameters(e.clientX, e.clientX), this._dollyStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownPan(e) {
    this._panStart.set(e.clientX, e.clientY);
  }
  _handleMouseMoveRotate(e) {
    this._rotateEnd.set(e.clientX, e.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(U * this._rotateDelta.x / t.clientHeight), this._rotateUp(U * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(e) {
    this._dollyEnd.set(e.clientX, e.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(e) {
    this._panEnd.set(e.clientX, e.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(e) {
    this._updateZoomParameters(e.clientX, e.clientY), e.deltaY < 0 ? this._dollyIn(this._getZoomScale(e.deltaY)) : e.deltaY > 0 && this._dollyOut(this._getZoomScale(e.deltaY)), this.update();
  }
  _handleKeyDown(e) {
    let t = !1;
    switch (e.code) {
      case this.keys.UP:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(U * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-U * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(U * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-U * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
        break;
    }
    t && (e.preventDefault(), this.update());
  }
  _handleTouchStartRotate(e) {
    if (this._pointers.length === 1)
      this._rotateStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + t.x), s = 0.5 * (e.pageY + t.y);
      this._rotateStart.set(i, s);
    }
  }
  _handleTouchStartPan(e) {
    if (this._pointers.length === 1)
      this._panStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + t.x), s = 0.5 * (e.pageY + t.y);
      this._panStart.set(i, s);
    }
  }
  _handleTouchStartDolly(e) {
    const t = this._getSecondPointerPosition(e), i = e.pageX - t.x, s = e.pageY - t.y, o = Math.sqrt(i * i + s * s);
    this._dollyStart.set(0, o);
  }
  _handleTouchStartDollyPan(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enablePan && this._handleTouchStartPan(e);
  }
  _handleTouchStartDollyRotate(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enableRotate && this._handleTouchStartRotate(e);
  }
  _handleTouchMoveRotate(e) {
    if (this._pointers.length == 1)
      this._rotateEnd.set(e.pageX, e.pageY);
    else {
      const i = this._getSecondPointerPosition(e), s = 0.5 * (e.pageX + i.x), o = 0.5 * (e.pageY + i.y);
      this._rotateEnd.set(s, o);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(U * this._rotateDelta.x / t.clientHeight), this._rotateUp(U * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(e) {
    if (this._pointers.length === 1)
      this._panEnd.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + t.x), s = 0.5 * (e.pageY + t.y);
      this._panEnd.set(i, s);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(e) {
    const t = this._getSecondPointerPosition(e), i = e.pageX - t.x, s = e.pageY - t.y, o = Math.sqrt(i * i + s * s);
    this._dollyEnd.set(0, o), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const n = (e.pageX + t.x) * 0.5, a = (e.pageY + t.y) * 0.5;
    this._updateZoomParameters(n, a);
  }
  _handleTouchMoveDollyPan(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enablePan && this._handleTouchMovePan(e);
  }
  _handleTouchMoveDollyRotate(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enableRotate && this._handleTouchMoveRotate(e);
  }
  // pointers
  _addPointer(e) {
    this._pointers.push(e.pointerId);
  }
  _removePointer(e) {
    delete this._pointerPositions[e.pointerId];
    for (let t = 0; t < this._pointers.length; t++)
      if (this._pointers[t] == e.pointerId) {
        this._pointers.splice(t, 1);
        return;
      }
  }
  _isTrackingPointer(e) {
    for (let t = 0; t < this._pointers.length; t++)
      if (this._pointers[t] == e.pointerId) return !0;
    return !1;
  }
  _trackPointer(e) {
    let t = this._pointerPositions[e.pointerId];
    t === void 0 && (t = new H(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
  }
  _getSecondPointerPosition(e) {
    const t = e.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[t];
  }
  //
  _customWheelEvent(e) {
    const t = e.deltaMode, i = {
      clientX: e.clientX,
      clientY: e.clientY,
      deltaY: e.deltaY
    };
    switch (t) {
      case 1:
        i.deltaY *= 16;
        break;
      case 2:
        i.deltaY *= 100;
        break;
    }
    return e.ctrlKey && !this._controlActive && (i.deltaY *= 10), i;
  }
}
function _s(l) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(l.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(l) && (this._addPointer(l), l.pointerType === "touch" ? this._onTouchStart(l) : this._onMouseDown(l)));
}
function Gs(l) {
  this.enabled !== !1 && (l.pointerType === "touch" ? this._onTouchMove(l) : this._onMouseMove(l));
}
function Ps(l) {
  switch (this._removePointer(l), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(l.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(gi), this.state = v.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function Ns(l) {
  let e;
  switch (l.button) {
    case 0:
      e = this.mouseButtons.LEFT;
      break;
    case 1:
      e = this.mouseButtons.MIDDLE;
      break;
    case 2:
      e = this.mouseButtons.RIGHT;
      break;
    default:
      e = -1;
  }
  switch (e) {
    case Ce.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(l), this.state = v.DOLLY;
      break;
    case Ce.ROTATE:
      if (l.ctrlKey || l.metaKey || l.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(l), this.state = v.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(l), this.state = v.ROTATE;
      }
      break;
    case Ce.PAN:
      if (l.ctrlKey || l.metaKey || l.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(l), this.state = v.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(l), this.state = v.PAN;
      }
      break;
    default:
      this.state = v.NONE;
  }
  this.state !== v.NONE && this.dispatchEvent(St);
}
function Us(l) {
  switch (this.state) {
    case v.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(l);
      break;
    case v.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(l);
      break;
    case v.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(l);
      break;
  }
}
function Hs(l) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== v.NONE || (l.preventDefault(), this.dispatchEvent(St), this._handleMouseWheel(this._customWheelEvent(l)), this.dispatchEvent(gi));
}
function Os(l) {
  this.enabled !== !1 && this._handleKeyDown(l);
}
function Vs(l) {
  switch (this._trackPointer(l), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case pe.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(l), this.state = v.TOUCH_ROTATE;
          break;
        case pe.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(l), this.state = v.TOUCH_PAN;
          break;
        default:
          this.state = v.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case pe.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(l), this.state = v.TOUCH_DOLLY_PAN;
          break;
        case pe.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(l), this.state = v.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = v.NONE;
      }
      break;
    default:
      this.state = v.NONE;
  }
  this.state !== v.NONE && this.dispatchEvent(St);
}
function qs(l) {
  switch (this._trackPointer(l), this.state) {
    case v.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(l), this.update();
      break;
    case v.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(l), this.update();
      break;
    case v.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(l), this.update();
      break;
    case v.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(l), this.update();
      break;
    default:
      this.state = v.NONE;
  }
}
function js(l) {
  this.enabled !== !1 && l.preventDefault();
}
function zs(l) {
  l.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function Ks(l) {
  l.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
class Ys extends qe {
  /**
   * Creates a new Camera instance
   * 
   * @param {Object} [config={}] - Camera configuration
   */
  constructor(e = {}) {
    super(), this.config = e, this.camera = null, this.controls = null, this.focusAnimation = null, this.init();
  }
  init() {
    this.camera = new u.PerspectiveCamera(
      this.config.fov || 65,
      window.innerWidth / window.innerHeight,
      this.config.near || 0.05,
      this.config.far || 2e3
    );
    const e = this.config.position || { x: 0, y: 5, z: 10 };
    this.camera.position.set(e.x, e.y, e.z);
  }
  initControls(e) {
    if (!this.controls) {
      this.controls = new Fs(this.camera, e);
      const t = this.config.desktop || {};
      this.controls.enableDamping = t.enableDamping ?? !0, this.controls.dampingFactor = t.dampingFactor ?? 0.08, this.controls.maxDistance = t.maxDistance ?? 100, this.controls.minDistance = t.minDistance ?? 0.5, this.controls.addEventListener("change", () => {
        this.emit("change");
      });
    }
  }
  update() {
    this.controls && this.controls.update();
  }
  setSize(e, t) {
    this.camera.aspect = e / t, this.camera.updateProjectionMatrix();
  }
  getCamera() {
    return this.camera;
  }
  getControls() {
    return this.controls;
  }
  /**
   * Frame an object by positioning the camera to view it optimally
   * 
   * @method frameObject
   * @param {THREE.Vector3} center - Center point of the object
   * @param {number} size - Size/radius of the object
   * @returns {void}
   * 
   * @example
   * // Frame a model based on its bounding box
   * const box = new THREE.Box3().setFromObject(model);
   * const center = box.getCenter(new THREE.Vector3());
   * const size = box.getSize(new THREE.Vector3()).length();
   * camera.frameObject(center, size);
   * 
   * @since 1.0.0
   */
  frameObject(e, t) {
    const i = t * 1.5;
    this.camera.position.set(
      e.x + i * 0.7,
      e.y + i * 0.5,
      e.z + i * 0.7
    ), this.controls && (this.controls.target.copy(e), this.controls.update());
  }
  /**
   * Smoothly focus the camera on a target point
   * 
   * @method focusOn
   * @param {THREE.Vector3|Object} target - Target position to focus on
   * @param {number} target.x - X coordinate
   * @param {number} target.y - Y coordinate  
   * @param {number} target.z - Z coordinate
   * @param {number} [distance=null] - Distance from target (auto-calculated if null)
   * @returns {void}
   * 
   * @fires Camera#focus-start - When animation begins
   * @fires Camera#focus-complete - When animation completes
   * 
   * @example
   * // Focus on a specific point
   * camera.focusOn({ x: 10, y: 5, z: 0 });
   * 
   * // Focus with custom distance
   * camera.focusOn(targetPoint, 15);
   * 
   * @since 1.0.0
   */
  focusOn(e, t = null) {
    if (!this.controls) return;
    this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null);
    const i = this.controls.target.clone(), s = this.camera.position.clone(), o = s.clone().sub(i), n = e.clone().add(o), a = 1e3, r = performance.now(), A = () => {
      this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null, this.controls.removeEventListener("start", A));
    };
    this.controls.addEventListener("start", A, { once: !0 });
    const c = () => {
      const h = performance.now() - r, d = Math.min(h / a, 1), g = 1 - Math.pow(1 - d, 3);
      this.controls.target.lerpVectors(i, e, g), this.camera.position.lerpVectors(s, n, g), d < 1 ? this.focusAnimation = requestAnimationFrame(c) : (this.focusAnimation = null, this.controls.removeEventListener("start", A), this.emit("focus-complete", { target: e, position: n }));
    };
    this.focusAnimation = requestAnimationFrame(c), this.emit("focus-start", { target: e, startPosition: s, newPosition: n });
  }
  /**
   * Clean up and dispose of camera resources
   * 
   * Cancels any ongoing animations, disposes of controls, and cleans up
   * event listeners. Call this when done with the camera.
   * 
   * @method dispose
   * @returns {void}
   * 
   * @example
   * // Clean up camera
   * camera.dispose();
   * 
   * @since 1.0.0
   */
  dispose() {
    this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null), this.controls && this.controls.dispose(), this.removeAllListeners();
  }
}
function Ht(l, e) {
  if (e === Ui)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), l;
  if (e === At || e === oi) {
    let t = l.getIndex();
    if (t === null) {
      const n = [], a = l.getAttribute("position");
      if (a !== void 0) {
        for (let r = 0; r < a.count; r++)
          n.push(r);
        l.setIndex(n), t = l.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), l;
    }
    const i = t.count - 2, s = [];
    if (e === At)
      for (let n = 1; n <= i; n++)
        s.push(t.getX(0)), s.push(t.getX(n)), s.push(t.getX(n + 1));
    else
      for (let n = 0; n < i; n++)
        n % 2 === 0 ? (s.push(t.getX(n)), s.push(t.getX(n + 1)), s.push(t.getX(n + 2))) : (s.push(t.getX(n + 2)), s.push(t.getX(n + 1)), s.push(t.getX(n)));
    s.length / 3 !== i && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const o = l.clone();
    return o.setIndex(s), o.clearGroups(), o;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), l;
}
class ui extends Et {
  /**
   * Constructs a new glTF loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new $s(t);
    }), this.register(function(t) {
      return new eo(t);
    }), this.register(function(t) {
      return new lo(t);
    }), this.register(function(t) {
      return new co(t);
    }), this.register(function(t) {
      return new ho(t);
    }), this.register(function(t) {
      return new io(t);
    }), this.register(function(t) {
      return new so(t);
    }), this.register(function(t) {
      return new oo(t);
    }), this.register(function(t) {
      return new no(t);
    }), this.register(function(t) {
      return new Zs(t);
    }), this.register(function(t) {
      return new ao(t);
    }), this.register(function(t) {
      return new to(t);
    }), this.register(function(t) {
      return new Ao(t);
    }), this.register(function(t) {
      return new ro(t);
    }), this.register(function(t) {
      return new Ws(t);
    }), this.register(function(t) {
      return new go(t);
    }), this.register(function(t) {
      return new uo(t);
    });
  }
  /**
   * Starts loading from the given URL and passes the loaded glTF asset
   * to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(GLTFLoader~LoadObject)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  load(e, t, i, s) {
    const o = this;
    let n;
    if (this.resourcePath !== "")
      n = this.resourcePath;
    else if (this.path !== "") {
      const A = ve.extractUrlBase(e);
      n = ve.resolveURL(A, this.path);
    } else
      n = ve.extractUrlBase(e);
    this.manager.itemStart(e);
    const a = function(A) {
      s ? s(A) : console.error(A), o.manager.itemError(e), o.manager.itemEnd(e);
    }, r = new le(this.manager);
    r.setPath(this.path), r.setResponseType("arraybuffer"), r.setRequestHeader(this.requestHeader), r.setWithCredentials(this.withCredentials), r.load(e, function(A) {
      try {
        o.parse(A, n, function(c) {
          t(c), o.manager.itemEnd(e);
        }, a);
      } catch (c) {
        a(c);
      }
    }, i, a);
  }
  /**
   * Sets the given Draco loader to this loader. Required for decoding assets
   * compressed with the `KHR_draco_mesh_compression` extension.
   *
   * @param {DRACOLoader} dracoLoader - The Draco loader to set.
   * @return {GLTFLoader} A reference to this loader.
   */
  setDRACOLoader(e) {
    return this.dracoLoader = e, this;
  }
  /**
   * Sets the given KTX2 loader to this loader. Required for loading KTX2
   * compressed textures.
   *
   * @param {KTX2Loader} ktx2Loader - The KTX2 loader to set.
   * @return {GLTFLoader} A reference to this loader.
   */
  setKTX2Loader(e) {
    return this.ktx2Loader = e, this;
  }
  /**
   * Sets the given meshopt decoder. Required for decoding assets
   * compressed with the `EXT_meshopt_compression` extension.
   *
   * @param {Object} meshoptDecoder - The meshopt decoder to set.
   * @return {GLTFLoader} A reference to this loader.
   */
  setMeshoptDecoder(e) {
    return this.meshoptDecoder = e, this;
  }
  /**
   * Registers a plugin callback. This API is internally used to implement the various
   * glTF extensions but can also used by third-party code to add additional logic
   * to the loader.
   *
   * @param {function(parser:GLTFParser)} callback - The callback function to register.
   * @return {GLTFLoader} A reference to this loader.
   */
  register(e) {
    return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
  }
  /**
   * Unregisters a plugin callback.
   *
   * @param {Function} callback - The callback function to unregister.
   * @return {GLTFLoader} A reference to this loader.
   */
  unregister(e) {
    return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
  }
  /**
   * Parses the given FBX data and returns the resulting group.
   *
   * @param {string|ArrayBuffer} data - The raw glTF data.
   * @param {string} path - The URL base path.
   * @param {function(GLTFLoader~LoadObject)} onLoad - Executed when the loading process has been finished.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  parse(e, t, i, s) {
    let o;
    const n = {}, a = {}, r = new TextDecoder();
    if (typeof e == "string")
      o = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (r.decode(new Uint8Array(e, 0, 4)) === pi) {
        try {
          n[S.KHR_BINARY_GLTF] = new po(e);
        } catch (h) {
          s && s(h);
          return;
        }
        o = JSON.parse(n[S.KHR_BINARY_GLTF].content);
      } else
        o = JSON.parse(r.decode(e));
    else
      o = e;
    if (o.asset === void 0 || o.asset.version[0] < 2) {
      s && s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const A = new vo(o, {
      path: t || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    A.fileLoader.setRequestHeader(this.requestHeader);
    for (let c = 0; c < this.pluginCallbacks.length; c++) {
      const h = this.pluginCallbacks[c](A);
      h.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), a[h.name] = h, n[h.name] = !0;
    }
    if (o.extensionsUsed)
      for (let c = 0; c < o.extensionsUsed.length; ++c) {
        const h = o.extensionsUsed[c], d = o.extensionsRequired || [];
        switch (h) {
          case S.KHR_MATERIALS_UNLIT:
            n[h] = new Xs();
            break;
          case S.KHR_DRACO_MESH_COMPRESSION:
            n[h] = new mo(o, this.dracoLoader);
            break;
          case S.KHR_TEXTURE_TRANSFORM:
            n[h] = new fo();
            break;
          case S.KHR_MESH_QUANTIZATION:
            n[h] = new bo();
            break;
          default:
            d.indexOf(h) >= 0 && a[h] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + h + '".');
        }
      }
    A.setExtensions(n), A.setPlugins(a), A.parse(i, s);
  }
  /**
   * Async version of {@link GLTFLoader#parse}.
   *
   * @async
   * @param {string|ArrayBuffer} data - The raw glTF data.
   * @param {string} path - The URL base path.
   * @return {Promise<GLTFLoader~LoadObject>} A Promise that resolves with the loaded glTF when the parsing has been finished.
   */
  parseAsync(e, t) {
    const i = this;
    return new Promise(function(s, o) {
      i.parse(e, t, s, o);
    });
  }
}
function Js() {
  let l = {};
  return {
    get: function(e) {
      return l[e];
    },
    add: function(e, t) {
      l[e] = t;
    },
    remove: function(e) {
      delete l[e];
    },
    removeAll: function() {
      l = {};
    }
  };
}
const S = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class Ws {
  constructor(e) {
    this.parser = e, this.name = S.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const e = this.parser, t = this.parser.json.nodes || [];
    for (let i = 0, s = t.length; i < s; i++) {
      const o = t[i];
      o.extensions && o.extensions[this.name] && o.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, o.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const t = this.parser, i = "light:" + e;
    let s = t.cache.get(i);
    if (s) return s;
    const o = t.json, r = ((o.extensions && o.extensions[this.name] || {}).lights || [])[e];
    let A;
    const c = new ae(16777215);
    r.color !== void 0 && c.setRGB(r.color[0], r.color[1], r.color[2], Y);
    const h = r.range !== void 0 ? r.range : 0;
    switch (r.type) {
      case "directional":
        A = new Vi(c), A.target.position.set(0, 0, -1), A.add(A.target);
        break;
      case "point":
        A = new Oi(c), A.distance = h;
        break;
      case "spot":
        A = new Hi(c), A.distance = h, r.spot = r.spot || {}, r.spot.innerConeAngle = r.spot.innerConeAngle !== void 0 ? r.spot.innerConeAngle : 0, r.spot.outerConeAngle = r.spot.outerConeAngle !== void 0 ? r.spot.outerConeAngle : Math.PI / 4, A.angle = r.spot.outerConeAngle, A.penumbra = 1 - r.spot.innerConeAngle / r.spot.outerConeAngle, A.target.position.set(0, 0, -1), A.add(A.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + r.type);
    }
    return A.position.set(0, 0, 0), ie(A, r), r.intensity !== void 0 && (A.intensity = r.intensity), A.name = t.createUniqueName(r.name || "light_" + e), s = Promise.resolve(A), t.cache.add(i, s), s;
  }
  getDependency(e, t) {
    if (e === "light")
      return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this, i = this.parser, o = i.json.nodes[e], a = (o.extensions && o.extensions[this.name] || {}).light;
    return a === void 0 ? null : this._loadLight(a).then(function(r) {
      return i._getNodeRef(t.cache, a, r);
    });
  }
}
class Xs {
  constructor() {
    this.name = S.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return me;
  }
  extendParams(e, t, i) {
    const s = [];
    e.color = new ae(1, 1, 1), e.opacity = 1;
    const o = t.pbrMetallicRoughness;
    if (o) {
      if (Array.isArray(o.baseColorFactor)) {
        const n = o.baseColorFactor;
        e.color.setRGB(n[0], n[1], n[2], Y), e.opacity = n[3];
      }
      o.baseColorTexture !== void 0 && s.push(i.assignTexture(e, "map", o.baseColorTexture, se));
    }
    return Promise.all(s);
  }
}
class Zs {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const o = s.extensions[this.name].emissiveStrength;
    return o !== void 0 && (t.emissiveIntensity = o), Promise.resolve();
  }
}
class $s {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ee;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const o = [], n = s.extensions[this.name];
    if (n.clearcoatFactor !== void 0 && (t.clearcoat = n.clearcoatFactor), n.clearcoatTexture !== void 0 && o.push(i.assignTexture(t, "clearcoatMap", n.clearcoatTexture)), n.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = n.clearcoatRoughnessFactor), n.clearcoatRoughnessTexture !== void 0 && o.push(i.assignTexture(t, "clearcoatRoughnessMap", n.clearcoatRoughnessTexture)), n.clearcoatNormalTexture !== void 0 && (o.push(i.assignTexture(t, "clearcoatNormalMap", n.clearcoatNormalTexture)), n.clearcoatNormalTexture.scale !== void 0)) {
      const a = n.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new H(a, a);
    }
    return Promise.all(o);
  }
}
class eo {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ee;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const o = s.extensions[this.name];
    return t.dispersion = o.dispersion !== void 0 ? o.dispersion : 0, Promise.resolve();
  }
}
class to {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ee;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const o = [], n = s.extensions[this.name];
    return n.iridescenceFactor !== void 0 && (t.iridescence = n.iridescenceFactor), n.iridescenceTexture !== void 0 && o.push(i.assignTexture(t, "iridescenceMap", n.iridescenceTexture)), n.iridescenceIor !== void 0 && (t.iridescenceIOR = n.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), n.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = n.iridescenceThicknessMinimum), n.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = n.iridescenceThicknessMaximum), n.iridescenceThicknessTexture !== void 0 && o.push(i.assignTexture(t, "iridescenceThicknessMap", n.iridescenceThicknessTexture)), Promise.all(o);
  }
}
class io {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ee;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const o = [];
    t.sheenColor = new ae(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const n = s.extensions[this.name];
    if (n.sheenColorFactor !== void 0) {
      const a = n.sheenColorFactor;
      t.sheenColor.setRGB(a[0], a[1], a[2], Y);
    }
    return n.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = n.sheenRoughnessFactor), n.sheenColorTexture !== void 0 && o.push(i.assignTexture(t, "sheenColorMap", n.sheenColorTexture, se)), n.sheenRoughnessTexture !== void 0 && o.push(i.assignTexture(t, "sheenRoughnessMap", n.sheenRoughnessTexture)), Promise.all(o);
  }
}
class so {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ee;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const o = [], n = s.extensions[this.name];
    return n.transmissionFactor !== void 0 && (t.transmission = n.transmissionFactor), n.transmissionTexture !== void 0 && o.push(i.assignTexture(t, "transmissionMap", n.transmissionTexture)), Promise.all(o);
  }
}
class oo {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ee;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const o = [], n = s.extensions[this.name];
    t.thickness = n.thicknessFactor !== void 0 ? n.thicknessFactor : 0, n.thicknessTexture !== void 0 && o.push(i.assignTexture(t, "thicknessMap", n.thicknessTexture)), t.attenuationDistance = n.attenuationDistance || 1 / 0;
    const a = n.attenuationColor || [1, 1, 1];
    return t.attenuationColor = new ae().setRGB(a[0], a[1], a[2], Y), Promise.all(o);
  }
}
class no {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ee;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const o = s.extensions[this.name];
    return t.ior = o.ior !== void 0 ? o.ior : 1.5, Promise.resolve();
  }
}
class ao {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ee;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const o = [], n = s.extensions[this.name];
    t.specularIntensity = n.specularFactor !== void 0 ? n.specularFactor : 1, n.specularTexture !== void 0 && o.push(i.assignTexture(t, "specularIntensityMap", n.specularTexture));
    const a = n.specularColorFactor || [1, 1, 1];
    return t.specularColor = new ae().setRGB(a[0], a[1], a[2], Y), n.specularColorTexture !== void 0 && o.push(i.assignTexture(t, "specularColorMap", n.specularColorTexture, se)), Promise.all(o);
  }
}
class ro {
  constructor(e) {
    this.parser = e, this.name = S.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ee;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const o = [], n = s.extensions[this.name];
    return t.bumpScale = n.bumpFactor !== void 0 ? n.bumpFactor : 1, n.bumpTexture !== void 0 && o.push(i.assignTexture(t, "bumpMap", n.bumpTexture)), Promise.all(o);
  }
}
class Ao {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ee;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const o = [], n = s.extensions[this.name];
    return n.anisotropyStrength !== void 0 && (t.anisotropy = n.anisotropyStrength), n.anisotropyRotation !== void 0 && (t.anisotropyRotation = n.anisotropyRotation), n.anisotropyTexture !== void 0 && o.push(i.assignTexture(t, "anisotropyMap", n.anisotropyTexture)), Promise.all(o);
  }
}
class lo {
  constructor(e) {
    this.parser = e, this.name = S.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser, i = t.json, s = i.textures[e];
    if (!s.extensions || !s.extensions[this.name])
      return null;
    const o = s.extensions[this.name], n = t.options.ktx2Loader;
    if (!n) {
      if (i.extensionsRequired && i.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, o.source, n);
  }
}
class co {
  constructor(e) {
    this.parser = e, this.name = S.EXT_TEXTURE_WEBP;
  }
  loadTexture(e) {
    const t = this.name, i = this.parser, s = i.json, o = s.textures[e];
    if (!o.extensions || !o.extensions[t])
      return null;
    const n = o.extensions[t], a = s.images[n.source];
    let r = i.textureLoader;
    if (a.uri) {
      const A = i.options.manager.getHandler(a.uri);
      A !== null && (r = A);
    }
    return i.loadTextureImage(e, n.source, r);
  }
}
class ho {
  constructor(e) {
    this.parser = e, this.name = S.EXT_TEXTURE_AVIF;
  }
  loadTexture(e) {
    const t = this.name, i = this.parser, s = i.json, o = s.textures[e];
    if (!o.extensions || !o.extensions[t])
      return null;
    const n = o.extensions[t], a = s.images[n.source];
    let r = i.textureLoader;
    if (a.uri) {
      const A = i.options.manager.getHandler(a.uri);
      A !== null && (r = A);
    }
    return i.loadTextureImage(e, n.source, r);
  }
}
class go {
  constructor(e) {
    this.name = S.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const t = this.parser.json, i = t.bufferViews[e];
    if (i.extensions && i.extensions[this.name]) {
      const s = i.extensions[this.name], o = this.parser.getDependency("buffer", s.buffer), n = this.parser.options.meshoptDecoder;
      if (!n || !n.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return o.then(function(a) {
        const r = s.byteOffset || 0, A = s.byteLength || 0, c = s.count, h = s.byteStride, d = new Uint8Array(a, r, A);
        return n.decodeGltfBufferAsync ? n.decodeGltfBufferAsync(c, h, d, s.mode, s.filter).then(function(g) {
          return g.buffer;
        }) : n.ready.then(function() {
          const g = new ArrayBuffer(c * h);
          return n.decodeGltfBuffer(new Uint8Array(g), c, h, d, s.mode, s.filter), g;
        });
      });
    } else
      return null;
  }
}
class uo {
  constructor(e) {
    this.name = S.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, i = t.nodes[e];
    if (!i.extensions || !i.extensions[this.name] || i.mesh === void 0)
      return null;
    const s = t.meshes[i.mesh];
    for (const A of s.primitives)
      if (A.mode !== j.TRIANGLES && A.mode !== j.TRIANGLE_STRIP && A.mode !== j.TRIANGLE_FAN && A.mode !== void 0)
        return null;
    const n = i.extensions[this.name].attributes, a = [], r = {};
    for (const A in n)
      a.push(this.parser.getDependency("accessor", n[A]).then((c) => (r[A] = c, r[A])));
    return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(e)), Promise.all(a).then((A) => {
      const c = A.pop(), h = c.isGroup ? c.children : [c], d = A[0].count, g = [];
      for (const p of h) {
        const C = new Re(), E = new D(), m = new Ue(), f = new D(1, 1, 1), I = new qi(p.geometry, p.material, d);
        for (let b = 0; b < d; b++)
          r.TRANSLATION && E.fromBufferAttribute(r.TRANSLATION, b), r.ROTATION && m.fromBufferAttribute(r.ROTATION, b), r.SCALE && f.fromBufferAttribute(r.SCALE, b), I.setMatrixAt(b, C.compose(E, m, f));
        for (const b in r)
          if (b === "_COLOR_0") {
            const B = r[b];
            I.instanceColor = new ji(B.array, B.itemSize, B.normalized);
          } else b !== "TRANSLATION" && b !== "ROTATION" && b !== "SCALE" && p.geometry.setAttribute(b, r[b]);
        It.prototype.copy.call(I, p), this.parser.assignFinalMaterial(I), g.push(I);
      }
      return c.isGroup ? (c.clear(), c.add(...g), c) : g[0];
    }));
  }
}
const pi = "glTF", we = 12, Ot = { JSON: 1313821514, BIN: 5130562 };
class po {
  constructor(e) {
    this.name = S.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, we), i = new TextDecoder();
    if (this.header = {
      magic: i.decode(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== pi)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const s = this.header.length - we, o = new DataView(e, we);
    let n = 0;
    for (; n < s; ) {
      const a = o.getUint32(n, !0);
      n += 4;
      const r = o.getUint32(n, !0);
      if (n += 4, r === Ot.JSON) {
        const A = new Uint8Array(e, we + n, a);
        this.content = i.decode(A);
      } else if (r === Ot.BIN) {
        const A = we + n;
        this.body = e.slice(A, A + a);
      }
      n += a;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class mo {
  constructor(e, t) {
    if (!t)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = S.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const i = this.json, s = this.dracoLoader, o = e.extensions[this.name].bufferView, n = e.extensions[this.name].attributes, a = {}, r = {}, A = {};
    for (const c in n) {
      const h = pt[c] || c.toLowerCase();
      a[h] = n[c];
    }
    for (const c in e.attributes) {
      const h = pt[c] || c.toLowerCase();
      if (n[c] !== void 0) {
        const d = i.accessors[e.attributes[c]], g = Ee[d.componentType];
        A[h] = g.name, r[h] = d.normalized === !0;
      }
    }
    return t.getDependency("bufferView", o).then(function(c) {
      return new Promise(function(h, d) {
        s.decodeDracoFile(c, function(g) {
          for (const p in g.attributes) {
            const C = g.attributes[p], E = r[p];
            E !== void 0 && (C.normalized = E);
          }
          h(g);
        }, a, A, Y, d);
      });
    });
  }
}
class fo {
  constructor() {
    this.name = S.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}
class bo {
  constructor() {
    this.name = S.KHR_MESH_QUANTIZATION;
  }
}
class mi extends ms {
  constructor(e, t, i, s) {
    super(e, t, i, s);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, i = this.sampleValues, s = this.valueSize, o = e * s * 3 + s;
    for (let n = 0; n !== s; n++)
      t[n] = i[o + n];
    return t;
  }
  interpolate_(e, t, i, s) {
    const o = this.resultBuffer, n = this.sampleValues, a = this.valueSize, r = a * 2, A = a * 3, c = s - t, h = (i - t) / c, d = h * h, g = d * h, p = e * A, C = p - A, E = -2 * g + 3 * d, m = g - d, f = 1 - E, I = m - d + h;
    for (let b = 0; b !== a; b++) {
      const B = n[C + b + a], y = n[C + b + r] * c, w = n[p + b + a], k = n[p + b] * c;
      o[b] = f * B + I * y + E * w + m * k;
    }
    return o;
  }
}
const Co = new Ue();
class Eo extends mi {
  interpolate_(e, t, i, s) {
    const o = super.interpolate_(e, t, i, s);
    return Co.fromArray(o).normalize().toArray(o), o;
  }
}
const j = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
}, Ee = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, Vt = {
  9728: ni,
  9729: he,
  9984: Xi,
  9985: Wi,
  9986: Ji,
  9987: Oe
}, qt = {
  33071: $i,
  33648: Zi,
  10497: lt
}, Ye = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, pt = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv1",
  TEXCOORD_2: "uv2",
  TEXCOORD_3: "uv3",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
}, ne = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, Io = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: Ai,
  STEP: us
}, Je = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Bo(l) {
  return l.DefaultMaterial === void 0 && (l.DefaultMaterial = new ai({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: ps
  })), l.DefaultMaterial;
}
function re(l, e, t) {
  for (const i in t.extensions)
    l[i] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[i] = t.extensions[i]);
}
function ie(l, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(l.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function yo(l, e, t) {
  let i = !1, s = !1, o = !1;
  for (let A = 0, c = e.length; A < c; A++) {
    const h = e[A];
    if (h.POSITION !== void 0 && (i = !0), h.NORMAL !== void 0 && (s = !0), h.COLOR_0 !== void 0 && (o = !0), i && s && o) break;
  }
  if (!i && !s && !o) return Promise.resolve(l);
  const n = [], a = [], r = [];
  for (let A = 0, c = e.length; A < c; A++) {
    const h = e[A];
    if (i) {
      const d = h.POSITION !== void 0 ? t.getDependency("accessor", h.POSITION) : l.attributes.position;
      n.push(d);
    }
    if (s) {
      const d = h.NORMAL !== void 0 ? t.getDependency("accessor", h.NORMAL) : l.attributes.normal;
      a.push(d);
    }
    if (o) {
      const d = h.COLOR_0 !== void 0 ? t.getDependency("accessor", h.COLOR_0) : l.attributes.color;
      r.push(d);
    }
  }
  return Promise.all([
    Promise.all(n),
    Promise.all(a),
    Promise.all(r)
  ]).then(function(A) {
    const c = A[0], h = A[1], d = A[2];
    return i && (l.morphAttributes.position = c), s && (l.morphAttributes.normal = h), o && (l.morphAttributes.color = d), l.morphTargetsRelative = !0, l;
  });
}
function wo(l, e) {
  if (l.updateMorphTargets(), e.weights !== void 0)
    for (let t = 0, i = e.weights.length; t < i; t++)
      l.morphTargetInfluences[t] = e.weights[t];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const t = e.extras.targetNames;
    if (l.morphTargetInfluences.length === t.length) {
      l.morphTargetDictionary = {};
      for (let i = 0, s = t.length; i < s; i++)
        l.morphTargetDictionary[t[i]] = i;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function Qo(l) {
  let e;
  const t = l.extensions && l.extensions[S.KHR_DRACO_MESH_COMPRESSION];
  if (t ? e = "draco:" + t.bufferView + ":" + t.indices + ":" + We(t.attributes) : e = l.indices + ":" + We(l.attributes) + ":" + l.mode, l.targets !== void 0)
    for (let i = 0, s = l.targets.length; i < s; i++)
      e += ":" + We(l.targets[i]);
  return e;
}
function We(l) {
  let e = "";
  const t = Object.keys(l).sort();
  for (let i = 0, s = t.length; i < s; i++)
    e += t[i] + ":" + l[t[i]] + ";";
  return e;
}
function mt(l) {
  switch (l) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function So(l) {
  return l.search(/\.jpe?g($|\?)/i) > 0 || l.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : l.search(/\.webp($|\?)/i) > 0 || l.search(/^data\:image\/webp/) === 0 ? "image/webp" : l.search(/\.ktx2($|\?)/i) > 0 || l.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png";
}
const Mo = new Re();
class vo {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new Js(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let i = !1, s = -1, o = !1, n = -1;
    if (typeof navigator < "u") {
      const a = navigator.userAgent;
      i = /^((?!chrome|android).)*safari/i.test(a) === !0;
      const r = a.match(/Version\/(\d+)/);
      s = i && r ? parseInt(r[1], 10) : -1, o = a.indexOf("Firefox") > -1, n = o ? a.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || i && s < 17 || o && n < 98 ? this.textureLoader = new zi(this.options.manager) : this.textureLoader = new Ki(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new le(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    const i = this, s = this.json, o = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(n) {
      return n._markDefs && n._markDefs();
    }), Promise.all(this._invokeAll(function(n) {
      return n.beforeRoot && n.beforeRoot();
    })).then(function() {
      return Promise.all([
        i.getDependencies("scene"),
        i.getDependencies("animation"),
        i.getDependencies("camera")
      ]);
    }).then(function(n) {
      const a = {
        scene: n[0][s.scene || 0],
        scenes: n[0],
        animations: n[1],
        cameras: n[2],
        asset: s.asset,
        parser: i,
        userData: {}
      };
      return re(o, a, s), ie(a, s), Promise.all(i._invokeAll(function(r) {
        return r.afterRoot && r.afterRoot(a);
      })).then(function() {
        for (const r of a.scenes)
          r.updateMatrixWorld();
        e(a);
      });
    }).catch(t);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   *
   * @private
   */
  _markDefs() {
    const e = this.json.nodes || [], t = this.json.skins || [], i = this.json.meshes || [];
    for (let s = 0, o = t.length; s < o; s++) {
      const n = t[s].joints;
      for (let a = 0, r = n.length; a < r; a++)
        e[n[a]].isBone = !0;
    }
    for (let s = 0, o = e.length; s < o; s++) {
      const n = e[s];
      n.mesh !== void 0 && (this._addNodeRef(this.meshCache, n.mesh), n.skin !== void 0 && (i[n.mesh].isSkinnedMesh = !0)), n.camera !== void 0 && this._addNodeRef(this.cameraCache, n.camera);
    }
  }
  /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   *
   * @private
   * @param {Object} cache
   * @param {Object3D} index
   */
  _addNodeRef(e, t) {
    t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
  }
  /**
   * Returns a reference to a shared resource, cloning it if necessary.
   *
   * @private
   * @param {Object} cache
   * @param {number} index
   * @param {Object} object
   * @return {Object}
   */
  _getNodeRef(e, t, i) {
    if (e.refs[t] <= 1) return i;
    const s = i.clone(), o = (n, a) => {
      const r = this.associations.get(n);
      r != null && this.associations.set(a, r);
      for (const [A, c] of n.children.entries())
        o(c, a.children[A]);
    };
    return o(i, s), s.name += "_instance_" + e.uses[t]++, s;
  }
  _invokeOne(e) {
    const t = Object.values(this.plugins);
    t.push(this);
    for (let i = 0; i < t.length; i++) {
      const s = e(t[i]);
      if (s) return s;
    }
    return null;
  }
  _invokeAll(e) {
    const t = Object.values(this.plugins);
    t.unshift(this);
    const i = [];
    for (let s = 0; s < t.length; s++) {
      const o = e(t[s]);
      o && i.push(o);
    }
    return i;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   *
   * @private
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(e, t) {
    const i = e + ":" + t;
    let s = this.cache.get(i);
    if (!s) {
      switch (e) {
        case "scene":
          s = this.loadScene(t);
          break;
        case "node":
          s = this._invokeOne(function(o) {
            return o.loadNode && o.loadNode(t);
          });
          break;
        case "mesh":
          s = this._invokeOne(function(o) {
            return o.loadMesh && o.loadMesh(t);
          });
          break;
        case "accessor":
          s = this.loadAccessor(t);
          break;
        case "bufferView":
          s = this._invokeOne(function(o) {
            return o.loadBufferView && o.loadBufferView(t);
          });
          break;
        case "buffer":
          s = this.loadBuffer(t);
          break;
        case "material":
          s = this._invokeOne(function(o) {
            return o.loadMaterial && o.loadMaterial(t);
          });
          break;
        case "texture":
          s = this._invokeOne(function(o) {
            return o.loadTexture && o.loadTexture(t);
          });
          break;
        case "skin":
          s = this.loadSkin(t);
          break;
        case "animation":
          s = this._invokeOne(function(o) {
            return o.loadAnimation && o.loadAnimation(t);
          });
          break;
        case "camera":
          s = this.loadCamera(t);
          break;
        default:
          if (s = this._invokeOne(function(o) {
            return o != this && o.getDependency && o.getDependency(e, t);
          }), !s)
            throw new Error("Unknown type: " + e);
          break;
      }
      this.cache.add(i, s);
    }
    return s;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   *
   * @private
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(e) {
    let t = this.cache.get(e);
    if (!t) {
      const i = this, s = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      t = Promise.all(s.map(function(o, n) {
        return i.getDependency(e, n);
      })), this.cache.add(e, t);
    }
    return t;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   *
   * @private
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(e) {
    const t = this.json.buffers[e], i = this.fileLoader;
    if (t.type && t.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
    if (t.uri === void 0 && e === 0)
      return Promise.resolve(this.extensions[S.KHR_BINARY_GLTF].body);
    const s = this.options;
    return new Promise(function(o, n) {
      i.load(ve.resolveURL(t.uri, s.path), o, void 0, function() {
        n(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   *
   * @private
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(e) {
    const t = this.json.bufferViews[e];
    return this.getDependency("buffer", t.buffer).then(function(i) {
      const s = t.byteLength || 0, o = t.byteOffset || 0;
      return i.slice(o, o + s);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   *
   * @private
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(e) {
    const t = this, i = this.json, s = this.json.accessors[e];
    if (s.bufferView === void 0 && s.sparse === void 0) {
      const n = Ye[s.type], a = Ee[s.componentType], r = s.normalized === !0, A = new a(s.count * n);
      return Promise.resolve(new xe(A, n, r));
    }
    const o = [];
    return s.bufferView !== void 0 ? o.push(this.getDependency("bufferView", s.bufferView)) : o.push(null), s.sparse !== void 0 && (o.push(this.getDependency("bufferView", s.sparse.indices.bufferView)), o.push(this.getDependency("bufferView", s.sparse.values.bufferView))), Promise.all(o).then(function(n) {
      const a = n[0], r = Ye[s.type], A = Ee[s.componentType], c = A.BYTES_PER_ELEMENT, h = c * r, d = s.byteOffset || 0, g = s.bufferView !== void 0 ? i.bufferViews[s.bufferView].byteStride : void 0, p = s.normalized === !0;
      let C, E;
      if (g && g !== h) {
        const m = Math.floor(d / g), f = "InterleavedBuffer:" + s.bufferView + ":" + s.componentType + ":" + m + ":" + s.count;
        let I = t.cache.get(f);
        I || (C = new A(a, m * g, s.count * g / c), I = new Yi(C, g / c), t.cache.add(f, I)), E = new Ae(I, r, d % g / c, p);
      } else
        a === null ? C = new A(s.count * r) : C = new A(a, d, s.count * r), E = new xe(C, r, p);
      if (s.sparse !== void 0) {
        const m = Ye.SCALAR, f = Ee[s.sparse.indices.componentType], I = s.sparse.indices.byteOffset || 0, b = s.sparse.values.byteOffset || 0, B = new f(n[1], I, s.sparse.count * m), y = new A(n[2], b, s.sparse.count * r);
        a !== null && (E = new xe(E.array.slice(), E.itemSize, E.normalized)), E.normalized = !1;
        for (let w = 0, k = B.length; w < k; w++) {
          const R = B[w];
          if (E.setX(R, y[w * r]), r >= 2 && E.setY(R, y[w * r + 1]), r >= 3 && E.setZ(R, y[w * r + 2]), r >= 4 && E.setW(R, y[w * r + 3]), r >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        E.normalized = p;
      }
      return E;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   *
   * @private
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture|null>}
   */
  loadTexture(e) {
    const t = this.json, i = this.options, o = t.textures[e].source, n = t.images[o];
    let a = this.textureLoader;
    if (n.uri) {
      const r = i.manager.getHandler(n.uri);
      r !== null && (a = r);
    }
    return this.loadTextureImage(e, o, a);
  }
  loadTextureImage(e, t, i) {
    const s = this, o = this.json, n = o.textures[e], a = o.images[t], r = (a.uri || a.bufferView) + ":" + n.sampler;
    if (this.textureCache[r])
      return this.textureCache[r];
    const A = this.loadImageSource(t, i).then(function(c) {
      c.flipY = !1, c.name = n.name || a.name || "", c.name === "" && typeof a.uri == "string" && a.uri.startsWith("data:image/") === !1 && (c.name = a.uri);
      const d = (o.samplers || {})[n.sampler] || {};
      return c.magFilter = Vt[d.magFilter] || he, c.minFilter = Vt[d.minFilter] || Oe, c.wrapS = qt[d.wrapS] || lt, c.wrapT = qt[d.wrapT] || lt, c.generateMipmaps = !c.isCompressedTexture && c.minFilter !== ni && c.minFilter !== he, s.associations.set(c, { textures: e }), c;
    }).catch(function() {
      return null;
    });
    return this.textureCache[r] = A, A;
  }
  loadImageSource(e, t) {
    const i = this, s = this.json, o = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((h) => h.clone());
    const n = s.images[e], a = self.URL || self.webkitURL;
    let r = n.uri || "", A = !1;
    if (n.bufferView !== void 0)
      r = i.getDependency("bufferView", n.bufferView).then(function(h) {
        A = !0;
        const d = new Blob([h], { type: n.mimeType });
        return r = a.createObjectURL(d), r;
      });
    else if (n.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const c = Promise.resolve(r).then(function(h) {
      return new Promise(function(d, g) {
        let p = d;
        t.isImageBitmapLoader === !0 && (p = function(C) {
          const E = new Dt(C);
          E.needsUpdate = !0, d(E);
        }), t.load(ve.resolveURL(h, o.path), p, void 0, g);
      });
    }).then(function(h) {
      return A === !0 && a.revokeObjectURL(r), ie(h, n), h.userData.mimeType = n.mimeType || So(n.uri), h;
    }).catch(function(h) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", r), h;
    });
    return this.sourceCache[e] = c, c;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   *
   * @private
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @param {string} [colorSpace]
   * @return {Promise<Texture>}
   */
  assignTexture(e, t, i, s) {
    const o = this;
    return this.getDependency("texture", i.index).then(function(n) {
      if (!n) return null;
      if (i.texCoord !== void 0 && i.texCoord > 0 && (n = n.clone(), n.channel = i.texCoord), o.extensions[S.KHR_TEXTURE_TRANSFORM]) {
        const a = i.extensions !== void 0 ? i.extensions[S.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const r = o.associations.get(n);
          n = o.extensions[S.KHR_TEXTURE_TRANSFORM].extendTexture(n, a), o.associations.set(n, r);
        }
      }
      return s !== void 0 && (n.colorSpace = s), e[t] = n, n;
    });
  }
  /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   *
   * @private
   * @param {Object3D} mesh Mesh, Line, or Points instance.
   */
  assignFinalMaterial(e) {
    const t = e.geometry;
    let i = e.material;
    const s = t.attributes.tangent === void 0, o = t.attributes.color !== void 0, n = t.attributes.normal === void 0;
    if (e.isPoints) {
      const a = "PointsMaterial:" + i.uuid;
      let r = this.cache.get(a);
      r || (r = new es(), je.prototype.copy.call(r, i), r.color.copy(i.color), r.map = i.map, r.sizeAttenuation = !1, this.cache.add(a, r)), i = r;
    } else if (e.isLine) {
      const a = "LineBasicMaterial:" + i.uuid;
      let r = this.cache.get(a);
      r || (r = new ts(), je.prototype.copy.call(r, i), r.color.copy(i.color), r.map = i.map, this.cache.add(a, r)), i = r;
    }
    if (s || o || n) {
      let a = "ClonedMaterial:" + i.uuid + ":";
      s && (a += "derivative-tangents:"), o && (a += "vertex-colors:"), n && (a += "flat-shading:");
      let r = this.cache.get(a);
      r || (r = i.clone(), o && (r.vertexColors = !0), n && (r.flatShading = !0), s && (r.normalScale && (r.normalScale.y *= -1), r.clearcoatNormalScale && (r.clearcoatNormalScale.y *= -1)), this.cache.add(a, r), this.associations.set(r, this.associations.get(i))), i = r;
    }
    e.material = i;
  }
  getMaterialType() {
    return ai;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   *
   * @private
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(e) {
    const t = this, i = this.json, s = this.extensions, o = i.materials[e];
    let n;
    const a = {}, r = o.extensions || {}, A = [];
    if (r[S.KHR_MATERIALS_UNLIT]) {
      const h = s[S.KHR_MATERIALS_UNLIT];
      n = h.getMaterialType(), A.push(h.extendParams(a, o, t));
    } else {
      const h = o.pbrMetallicRoughness || {};
      if (a.color = new ae(1, 1, 1), a.opacity = 1, Array.isArray(h.baseColorFactor)) {
        const d = h.baseColorFactor;
        a.color.setRGB(d[0], d[1], d[2], Y), a.opacity = d[3];
      }
      h.baseColorTexture !== void 0 && A.push(t.assignTexture(a, "map", h.baseColorTexture, se)), a.metalness = h.metallicFactor !== void 0 ? h.metallicFactor : 1, a.roughness = h.roughnessFactor !== void 0 ? h.roughnessFactor : 1, h.metallicRoughnessTexture !== void 0 && (A.push(t.assignTexture(a, "metalnessMap", h.metallicRoughnessTexture)), A.push(t.assignTexture(a, "roughnessMap", h.metallicRoughnessTexture))), n = this._invokeOne(function(d) {
        return d.getMaterialType && d.getMaterialType(e);
      }), A.push(Promise.all(this._invokeAll(function(d) {
        return d.extendMaterialParams && d.extendMaterialParams(e, a);
      })));
    }
    o.doubleSided === !0 && (a.side = is);
    const c = o.alphaMode || Je.OPAQUE;
    if (c === Je.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, c === Je.MASK && (a.alphaTest = o.alphaCutoff !== void 0 ? o.alphaCutoff : 0.5)), o.normalTexture !== void 0 && n !== me && (A.push(t.assignTexture(a, "normalMap", o.normalTexture)), a.normalScale = new H(1, 1), o.normalTexture.scale !== void 0)) {
      const h = o.normalTexture.scale;
      a.normalScale.set(h, h);
    }
    if (o.occlusionTexture !== void 0 && n !== me && (A.push(t.assignTexture(a, "aoMap", o.occlusionTexture)), o.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = o.occlusionTexture.strength)), o.emissiveFactor !== void 0 && n !== me) {
      const h = o.emissiveFactor;
      a.emissive = new ae().setRGB(h[0], h[1], h[2], Y);
    }
    return o.emissiveTexture !== void 0 && n !== me && A.push(t.assignTexture(a, "emissiveMap", o.emissiveTexture, se)), Promise.all(A).then(function() {
      const h = new n(a);
      return o.name && (h.name = o.name), ie(h, o), t.associations.set(h, { materials: e }), o.extensions && re(s, h, o), h;
    });
  }
  /**
   * When Object3D instances are targeted by animation, they need unique names.
   *
   * @private
   * @param {string} originalName
   * @return {string}
   */
  createUniqueName(e) {
    const t = ss.sanitizeNodeName(e || "");
    return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @private
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(e) {
    const t = this, i = this.extensions, s = this.primitiveCache;
    function o(a) {
      return i[S.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, t).then(function(r) {
        return jt(r, a, t);
      });
    }
    const n = [];
    for (let a = 0, r = e.length; a < r; a++) {
      const A = e[a], c = Qo(A), h = s[c];
      if (h)
        n.push(h.promise);
      else {
        let d;
        A.extensions && A.extensions[S.KHR_DRACO_MESH_COMPRESSION] ? d = o(A) : d = jt(new ri(), A, t), s[c] = { primitive: A, promise: d }, n.push(d);
      }
    }
    return Promise.all(n);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   *
   * @private
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh|Line|Points>}
   */
  loadMesh(e) {
    const t = this, i = this.json, s = this.extensions, o = i.meshes[e], n = o.primitives, a = [];
    for (let r = 0, A = n.length; r < A; r++) {
      const c = n[r].material === void 0 ? Bo(this.cache) : this.getDependency("material", n[r].material);
      a.push(c);
    }
    return a.push(t.loadGeometries(n)), Promise.all(a).then(function(r) {
      const A = r.slice(0, r.length - 1), c = r[r.length - 1], h = [];
      for (let g = 0, p = c.length; g < p; g++) {
        const C = c[g], E = n[g];
        let m;
        const f = A[g];
        if (E.mode === j.TRIANGLES || E.mode === j.TRIANGLE_STRIP || E.mode === j.TRIANGLE_FAN || E.mode === void 0)
          m = o.isSkinnedMesh === !0 ? new os(C, f) : new Bt(C, f), m.isSkinnedMesh === !0 && m.normalizeSkinWeights(), E.mode === j.TRIANGLE_STRIP ? m.geometry = Ht(m.geometry, oi) : E.mode === j.TRIANGLE_FAN && (m.geometry = Ht(m.geometry, At));
        else if (E.mode === j.LINES)
          m = new ns(C, f);
        else if (E.mode === j.LINE_STRIP)
          m = new as(C, f);
        else if (E.mode === j.LINE_LOOP)
          m = new rs(C, f);
        else if (E.mode === j.POINTS)
          m = new As(C, f);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + E.mode);
        Object.keys(m.geometry.morphAttributes).length > 0 && wo(m, o), m.name = t.createUniqueName(o.name || "mesh_" + e), ie(m, o), E.extensions && re(s, m, E), t.assignFinalMaterial(m), h.push(m);
      }
      for (let g = 0, p = h.length; g < p; g++)
        t.associations.set(h[g], {
          meshes: e,
          primitives: g
        });
      if (h.length === 1)
        return o.extensions && re(s, h[0], o), h[0];
      const d = new ze();
      o.extensions && re(s, d, o), t.associations.set(d, { meshes: e });
      for (let g = 0, p = h.length; g < p; g++)
        d.add(h[g]);
      return d;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   *
   * @private
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(e) {
    let t;
    const i = this.json.cameras[e], s = i[i.type];
    if (!s) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return i.type === "perspective" ? t = new ls(Ct.radToDeg(s.yfov), s.aspectRatio || 1, s.znear || 1, s.zfar || 2e6) : i.type === "orthographic" && (t = new cs(-s.xmag, s.xmag, s.ymag, -s.ymag, s.znear, s.zfar)), i.name && (t.name = this.createUniqueName(i.name)), ie(t, i), Promise.resolve(t);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   *
   * @private
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(e) {
    const t = this.json.skins[e], i = [];
    for (let s = 0, o = t.joints.length; s < o; s++)
      i.push(this._loadNodeShallow(t.joints[s]));
    return t.inverseBindMatrices !== void 0 ? i.push(this.getDependency("accessor", t.inverseBindMatrices)) : i.push(null), Promise.all(i).then(function(s) {
      const o = s.pop(), n = s, a = [], r = [];
      for (let A = 0, c = n.length; A < c; A++) {
        const h = n[A];
        if (h) {
          a.push(h);
          const d = new Re();
          o !== null && d.fromArray(o.array, A * 16), r.push(d);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[A]);
      }
      return new hs(a, r);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   *
   * @private
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(e) {
    const t = this.json, i = this, s = t.animations[e], o = s.name ? s.name : "animation_" + e, n = [], a = [], r = [], A = [], c = [];
    for (let h = 0, d = s.channels.length; h < d; h++) {
      const g = s.channels[h], p = s.samplers[g.sampler], C = g.target, E = C.node, m = s.parameters !== void 0 ? s.parameters[p.input] : p.input, f = s.parameters !== void 0 ? s.parameters[p.output] : p.output;
      C.node !== void 0 && (n.push(this.getDependency("node", E)), a.push(this.getDependency("accessor", m)), r.push(this.getDependency("accessor", f)), A.push(p), c.push(C));
    }
    return Promise.all([
      Promise.all(n),
      Promise.all(a),
      Promise.all(r),
      Promise.all(A),
      Promise.all(c)
    ]).then(function(h) {
      const d = h[0], g = h[1], p = h[2], C = h[3], E = h[4], m = [];
      for (let f = 0, I = d.length; f < I; f++) {
        const b = d[f], B = g[f], y = p[f], w = C[f], k = E[f];
        if (b === void 0) continue;
        b.updateMatrix && b.updateMatrix();
        const R = i._createAnimationTracks(b, B, y, w, k);
        if (R)
          for (let Q = 0; Q < R.length; Q++)
            m.push(R[Q]);
      }
      return new ds(o, void 0, m);
    });
  }
  createNodeMesh(e) {
    const t = this.json, i = this, s = t.nodes[e];
    return s.mesh === void 0 ? null : i.getDependency("mesh", s.mesh).then(function(o) {
      const n = i._getNodeRef(i.meshCache, s.mesh, o);
      return s.weights !== void 0 && n.traverse(function(a) {
        if (a.isMesh)
          for (let r = 0, A = s.weights.length; r < A; r++)
            a.morphTargetInfluences[r] = s.weights[r];
      }), n;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   *
   * @private
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(e) {
    const t = this.json, i = this, s = t.nodes[e], o = i._loadNodeShallow(e), n = [], a = s.children || [];
    for (let A = 0, c = a.length; A < c; A++)
      n.push(i.getDependency("node", a[A]));
    const r = s.skin === void 0 ? Promise.resolve(null) : i.getDependency("skin", s.skin);
    return Promise.all([
      o,
      Promise.all(n),
      r
    ]).then(function(A) {
      const c = A[0], h = A[1], d = A[2];
      d !== null && c.traverse(function(g) {
        g.isSkinnedMesh && g.bind(d, Mo);
      });
      for (let g = 0, p = h.length; g < p; g++)
        c.add(h[g]);
      return c;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(e) {
    const t = this.json, i = this.extensions, s = this;
    if (this.nodeCache[e] !== void 0)
      return this.nodeCache[e];
    const o = t.nodes[e], n = o.name ? s.createUniqueName(o.name) : "", a = [], r = s._invokeOne(function(A) {
      return A.createNodeMesh && A.createNodeMesh(e);
    });
    return r && a.push(r), o.camera !== void 0 && a.push(s.getDependency("camera", o.camera).then(function(A) {
      return s._getNodeRef(s.cameraCache, o.camera, A);
    })), s._invokeAll(function(A) {
      return A.createNodeAttachment && A.createNodeAttachment(e);
    }).forEach(function(A) {
      a.push(A);
    }), this.nodeCache[e] = Promise.all(a).then(function(A) {
      let c;
      if (o.isBone === !0 ? c = new gs() : A.length > 1 ? c = new ze() : A.length === 1 ? c = A[0] : c = new It(), c !== A[0])
        for (let h = 0, d = A.length; h < d; h++)
          c.add(A[h]);
      if (o.name && (c.userData.name = o.name, c.name = n), ie(c, o), o.extensions && re(i, c, o), o.matrix !== void 0) {
        const h = new Re();
        h.fromArray(o.matrix), c.applyMatrix4(h);
      } else
        o.translation !== void 0 && c.position.fromArray(o.translation), o.rotation !== void 0 && c.quaternion.fromArray(o.rotation), o.scale !== void 0 && c.scale.fromArray(o.scale);
      if (!s.associations.has(c))
        s.associations.set(c, {});
      else if (o.mesh !== void 0 && s.meshCache.refs[o.mesh] > 1) {
        const h = s.associations.get(c);
        s.associations.set(c, { ...h });
      }
      return s.associations.get(c).nodes = e, c;
    }), this.nodeCache[e];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   *
   * @private
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(e) {
    const t = this.extensions, i = this.json.scenes[e], s = this, o = new ze();
    i.name && (o.name = s.createUniqueName(i.name)), ie(o, i), i.extensions && re(t, o, i);
    const n = i.nodes || [], a = [];
    for (let r = 0, A = n.length; r < A; r++)
      a.push(s.getDependency("node", n[r]));
    return Promise.all(a).then(function(r) {
      for (let c = 0, h = r.length; c < h; c++)
        o.add(r[c]);
      const A = (c) => {
        const h = /* @__PURE__ */ new Map();
        for (const [d, g] of s.associations)
          (d instanceof je || d instanceof Dt) && h.set(d, g);
        return c.traverse((d) => {
          const g = s.associations.get(d);
          g != null && h.set(d, g);
        }), h;
      };
      return s.associations = A(o), o;
    });
  }
  _createAnimationTracks(e, t, i, s, o) {
    const n = [], a = e.name ? e.name : e.uuid, r = [];
    ne[o.path] === ne.weights ? e.traverse(function(d) {
      d.morphTargetInfluences && r.push(d.name ? d.name : d.uuid);
    }) : r.push(a);
    let A;
    switch (ne[o.path]) {
      case ne.weights:
        A = Tt;
        break;
      case ne.rotation:
        A = kt;
        break;
      case ne.translation:
      case ne.scale:
        A = Rt;
        break;
      default:
        switch (i.itemSize) {
          case 1:
            A = Tt;
            break;
          case 2:
          case 3:
          default:
            A = Rt;
            break;
        }
        break;
    }
    const c = s.interpolation !== void 0 ? Io[s.interpolation] : Ai, h = this._getArrayFromAccessor(i);
    for (let d = 0, g = r.length; d < g; d++) {
      const p = new A(
        r[d] + "." + ne[o.path],
        t.array,
        h,
        c
      );
      s.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(p), n.push(p);
    }
    return n;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const i = mt(t.constructor), s = new Float32Array(t.length);
      for (let o = 0, n = t.length; o < n; o++)
        s[o] = t[o] * i;
      t = s;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(i) {
      const s = this instanceof kt ? Eo : mi;
      return new s(this.times, this.values, this.getValueSize() / 3, i);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function xo(l, e, t) {
  const i = e.attributes, s = new Ve();
  if (i.POSITION !== void 0) {
    const a = t.json.accessors[i.POSITION], r = a.min, A = a.max;
    if (r !== void 0 && A !== void 0) {
      if (s.set(
        new D(r[0], r[1], r[2]),
        new D(A[0], A[1], A[2])
      ), a.normalized) {
        const c = mt(Ee[a.componentType]);
        s.min.multiplyScalar(c), s.max.multiplyScalar(c);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const o = e.targets;
  if (o !== void 0) {
    const a = new D(), r = new D();
    for (let A = 0, c = o.length; A < c; A++) {
      const h = o[A];
      if (h.POSITION !== void 0) {
        const d = t.json.accessors[h.POSITION], g = d.min, p = d.max;
        if (g !== void 0 && p !== void 0) {
          if (r.setX(Math.max(Math.abs(g[0]), Math.abs(p[0]))), r.setY(Math.max(Math.abs(g[1]), Math.abs(p[1]))), r.setZ(Math.max(Math.abs(g[2]), Math.abs(p[2]))), d.normalized) {
            const C = mt(Ee[d.componentType]);
            r.multiplyScalar(C);
          }
          a.max(r);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    s.expandByVector(a);
  }
  l.boundingBox = s;
  const n = new yt();
  s.getCenter(n.center), n.radius = s.min.distanceTo(s.max) / 2, l.boundingSphere = n;
}
function jt(l, e, t) {
  const i = e.attributes, s = [];
  function o(n, a) {
    return t.getDependency("accessor", n).then(function(r) {
      l.setAttribute(a, r);
    });
  }
  for (const n in i) {
    const a = pt[n] || n.toLowerCase();
    a in l.attributes || s.push(o(i[n], a));
  }
  if (e.indices !== void 0 && !l.index) {
    const n = t.getDependency("accessor", e.indices).then(function(a) {
      l.setIndex(a);
    });
    s.push(n);
  }
  return ct.workingColorSpace !== Y && "COLOR_0" in i && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ct.workingColorSpace}" not supported.`), ie(l, e), xo(l, e, t), Promise.all(s).then(function() {
    return e.targets !== void 0 ? yo(l, e.targets, t) : l;
  });
}
const Xe = /* @__PURE__ */ new WeakMap();
class Do extends Et {
  /**
   * Constructs a new Draco loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e), this.decoderPath = "", this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = {
      position: "POSITION",
      normal: "NORMAL",
      color: "COLOR",
      uv: "TEX_COORD"
    }, this.defaultAttributeTypes = {
      position: "Float32Array",
      normal: "Float32Array",
      color: "Float32Array",
      uv: "Float32Array"
    };
  }
  /**
   * Provides configuration for the decoder libraries. Configuration cannot be changed after decoding begins.
   *
   * @param {string} path - The decoder path.
   * @return {DRACOLoader} A reference to this loader.
   */
  setDecoderPath(e) {
    return this.decoderPath = e, this;
  }
  /**
   * Provides configuration for the decoder libraries. Configuration cannot be changed after decoding begins.
   *
   * @param {{type:('js'|'wasm')}} config - The decoder config.
   * @return {DRACOLoader} A reference to this loader.
   */
  setDecoderConfig(e) {
    return this.decoderConfig = e, this;
  }
  /**
   * Sets the maximum number of Web Workers to be used during decoding.
   * A lower limit may be preferable if workers are also for other tasks in the application.
   *
   * @param {number} workerLimit - The worker limit.
   * @return {DRACOLoader} A reference to this loader.
   */
  setWorkerLimit(e) {
    return this.workerLimit = e, this;
  }
  /**
   * Starts loading from the given URL and passes the loaded Draco asset
   * to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(BufferGeometry)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  load(e, t, i, s) {
    const o = new le(this.manager);
    o.setPath(this.path), o.setResponseType("arraybuffer"), o.setRequestHeader(this.requestHeader), o.setWithCredentials(this.withCredentials), o.load(e, (n) => {
      this.parse(n, t, s);
    }, i, s);
  }
  /**
   * Parses the given Draco data.
   *
   * @param {ArrayBuffer} buffer - The raw Draco data as an array buffer.
   * @param {function(BufferGeometry)} onLoad - Executed when the loading/parsing process has been finished.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  parse(e, t, i = () => {
  }) {
    this.decodeDracoFile(e, t, null, null, se, i).catch(i);
  }
  //
  decodeDracoFile(e, t, i, s, o = Y, n = () => {
  }) {
    const a = {
      attributeIDs: i || this.defaultAttributeIDs,
      attributeTypes: s || this.defaultAttributeTypes,
      useUniqueIDs: !!i,
      vertexColorSpace: o
    };
    return this.decodeGeometry(e, a).then(t).catch(n);
  }
  decodeGeometry(e, t) {
    const i = JSON.stringify(t);
    if (Xe.has(e)) {
      const r = Xe.get(e);
      if (r.key === i)
        return r.promise;
      if (e.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let s;
    const o = this.workerNextTaskID++, n = e.byteLength, a = this._getWorker(o, n).then((r) => (s = r, new Promise((A, c) => {
      s._callbacks[o] = { resolve: A, reject: c }, s.postMessage({ type: "decode", id: o, taskConfig: t, buffer: e }, [e]);
    }))).then((r) => this._createGeometry(r.geometry));
    return a.catch(() => !0).then(() => {
      s && o && this._releaseTask(s, o);
    }), Xe.set(e, {
      key: i,
      promise: a
    }), a;
  }
  _createGeometry(e) {
    const t = new ri();
    e.index && t.setIndex(new xe(e.index.array, 1));
    for (let i = 0; i < e.attributes.length; i++) {
      const s = e.attributes[i], o = s.name, n = s.array, a = s.itemSize, r = new xe(n, a);
      o === "color" && (this._assignVertexColorSpace(r, s.vertexColorSpace), r.normalized = !(n instanceof Float32Array)), t.setAttribute(o, r);
    }
    return t;
  }
  _assignVertexColorSpace(e, t) {
    if (t !== se) return;
    const i = new ae();
    for (let s = 0, o = e.count; s < o; s++)
      i.fromBufferAttribute(e, s), ct.colorSpaceToWorking(i, se), e.setXYZ(s, i.r, i.g, i.b);
  }
  _loadLibrary(e, t) {
    const i = new le(this.manager);
    return i.setPath(this.decoderPath), i.setResponseType(t), i.setWithCredentials(this.withCredentials), new Promise((s, o) => {
      i.load(e, s, void 0, o);
    });
  }
  preload() {
    return this._initDecoder(), this;
  }
  _initDecoder() {
    if (this.decoderPending) return this.decoderPending;
    const e = typeof WebAssembly != "object" || this.decoderConfig.type === "js", t = [];
    return e ? t.push(this._loadLibrary("draco_decoder.js", "text")) : (t.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), t.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(t).then((i) => {
      const s = i[0];
      e || (this.decoderConfig.wasmBinary = i[1]);
      const o = Ro.toString(), n = [
        "/* draco decoder */",
        s,
        "",
        "/* worker */",
        o.substring(o.indexOf("{") + 1, o.lastIndexOf("}"))
      ].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([n]));
    }), this.decoderPending;
  }
  _getWorker(e, t) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const s = new Worker(this.workerSourceURL);
        s._callbacks = {}, s._taskCosts = {}, s._taskLoad = 0, s.postMessage({ type: "init", decoderConfig: this.decoderConfig }), s.onmessage = function(o) {
          const n = o.data;
          switch (n.type) {
            case "decode":
              s._callbacks[n.id].resolve(n);
              break;
            case "error":
              s._callbacks[n.id].reject(n);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + n.type + '"');
          }
        }, this.workerPool.push(s);
      } else
        this.workerPool.sort(function(s, o) {
          return s._taskLoad > o._taskLoad ? -1 : 1;
        });
      const i = this.workerPool[this.workerPool.length - 1];
      return i._taskCosts[e] = t, i._taskLoad += t, i;
    });
  }
  _releaseTask(e, t) {
    e._taskLoad -= e._taskCosts[t], delete e._callbacks[t], delete e._taskCosts[t];
  }
  debug() {
    console.log("Task load: ", this.workerPool.map((e) => e._taskLoad));
  }
  dispose() {
    for (let e = 0; e < this.workerPool.length; ++e)
      this.workerPool[e].terminate();
    return this.workerPool.length = 0, this.workerSourceURL !== "" && URL.revokeObjectURL(this.workerSourceURL), this;
  }
}
function Ro() {
  let l, e;
  onmessage = function(n) {
    const a = n.data;
    switch (a.type) {
      case "init":
        l = a.decoderConfig, e = new Promise(function(c) {
          l.onModuleLoaded = function(h) {
            c({ draco: h });
          }, DracoDecoderModule(l);
        });
        break;
      case "decode":
        const r = a.buffer, A = a.taskConfig;
        e.then((c) => {
          const h = c.draco, d = new h.Decoder();
          try {
            const g = t(h, d, new Int8Array(r), A), p = g.attributes.map((C) => C.array.buffer);
            g.index && p.push(g.index.array.buffer), self.postMessage({ type: "decode", id: a.id, geometry: g }, p);
          } catch (g) {
            console.error(g), self.postMessage({ type: "error", id: a.id, error: g.message });
          } finally {
            h.destroy(d);
          }
        });
        break;
    }
  };
  function t(n, a, r, A) {
    const c = A.attributeIDs, h = A.attributeTypes;
    let d, g;
    const p = a.GetEncodedGeometryType(r);
    if (p === n.TRIANGULAR_MESH)
      d = new n.Mesh(), g = a.DecodeArrayToMesh(r, r.byteLength, d);
    else if (p === n.POINT_CLOUD)
      d = new n.PointCloud(), g = a.DecodeArrayToPointCloud(r, r.byteLength, d);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!g.ok() || d.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + g.error_msg());
    const C = { index: null, attributes: [] };
    for (const E in c) {
      const m = self[h[E]];
      let f, I;
      if (A.useUniqueIDs)
        I = c[E], f = a.GetAttributeByUniqueId(d, I);
      else {
        if (I = a.GetAttributeId(d, n[c[E]]), I === -1) continue;
        f = a.GetAttribute(d, I);
      }
      const b = s(n, a, d, E, m, f);
      E === "color" && (b.vertexColorSpace = A.vertexColorSpace), C.attributes.push(b);
    }
    return p === n.TRIANGULAR_MESH && (C.index = i(n, a, d)), n.destroy(d), C;
  }
  function i(n, a, r) {
    const c = r.num_faces() * 3, h = c * 4, d = n._malloc(h);
    a.GetTrianglesUInt32Array(r, h, d);
    const g = new Uint32Array(n.HEAPF32.buffer, d, c).slice();
    return n._free(d), { array: g, itemSize: 1 };
  }
  function s(n, a, r, A, c, h) {
    const d = h.num_components(), p = r.num_points() * d, C = p * c.BYTES_PER_ELEMENT, E = o(n, c), m = n._malloc(C);
    a.GetAttributeDataArrayForAllPoints(r, h, E, C, m);
    const f = new c(n.HEAPF32.buffer, m, p).slice();
    return n._free(m), {
      name: A,
      array: f,
      itemSize: d
    };
  }
  function o(n, a) {
    switch (a) {
      case Float32Array:
        return n.DT_FLOAT32;
      case Int8Array:
        return n.DT_INT8;
      case Int16Array:
        return n.DT_INT16;
      case Int32Array:
        return n.DT_INT32;
      case Uint8Array:
        return n.DT_UINT8;
      case Uint16Array:
        return n.DT_UINT16;
      case Uint32Array:
        return n.DT_UINT32;
    }
  }
}
class To {
  /**
   * Constructs a new Worker pool.
   *
   * @param {number} [pool=4] - The size of the pool.
   */
  constructor(e = 4) {
    this.pool = e, this.queue = [], this.workers = [], this.workersResolve = [], this.workerStatus = 0, this.workerCreator = null;
  }
  _initWorker(e) {
    if (!this.workers[e]) {
      const t = this.workerCreator();
      t.addEventListener("message", this._onMessage.bind(this, e)), this.workers[e] = t;
    }
  }
  _getIdleWorker() {
    for (let e = 0; e < this.pool; e++)
      if (!(this.workerStatus & 1 << e)) return e;
    return -1;
  }
  _onMessage(e, t) {
    const i = this.workersResolve[e];
    if (i && i(t), this.queue.length) {
      const { resolve: s, msg: o, transfer: n } = this.queue.shift();
      this.workersResolve[e] = s, this.workers[e].postMessage(o, n);
    } else
      this.workerStatus ^= 1 << e;
  }
  /**
   * Sets a function that is responsible for creating Workers.
   *
   * @param {Function} workerCreator - The worker creator function.
   */
  setWorkerCreator(e) {
    this.workerCreator = e;
  }
  /**
   * Sets the Worker limit
   *
   * @param {number} pool - The size of the pool.
   */
  setWorkerLimit(e) {
    this.pool = e;
  }
  /**
   * Post a message to an idle Worker. If no Worker is available,
   * the message is pushed into a message queue for later processing.
   *
   * @param {Object} msg - The message.
   * @param {Array<ArrayBuffer>} transfer - An array with array buffers for data transfer.
   * @return {Promise} A Promise that resolves when the message has been processed.
   */
  postMessage(e, t) {
    return new Promise((i) => {
      const s = this._getIdleWorker();
      s !== -1 ? (this._initWorker(s), this.workerStatus |= 1 << s, this.workersResolve[s] = i, this.workers[s].postMessage(e, t)) : this.queue.push({ resolve: i, msg: e, transfer: t });
    });
  }
  /**
   * Terminates all Workers of this pool. Call this  method whenever this
   * Worker pool is no longer used in your app.
   */
  dispose() {
    this.workers.forEach((e) => e.terminate()), this.workersResolve.length = 0, this.workers.length = 0, this.queue.length = 0, this.workerStatus = 0;
  }
}
const ko = 0, zt = 2, Lo = 1, Kt = 2, Fo = 0, _o = 1, Go = 10, Po = 0, fi = 9, bi = 15, Ci = 16, Ei = 22, Ii = 37, Bi = 43, yi = 76, wi = 83, Qi = 97, Si = 100, Mi = 103, vi = 109, No = 131, Uo = 132, Ho = 133, Oo = 134, Vo = 137, qo = 138, jo = 141, zo = 142, Ko = 145, Yo = 146, xi = 148, Di = 152, Jo = 157, Wo = 158, Ri = 165, Ti = 166, Mt = 1000066e3;
class Xo {
  constructor() {
    this.vkFormat = 0, this.typeSize = 1, this.pixelWidth = 0, this.pixelHeight = 0, this.pixelDepth = 0, this.layerCount = 0, this.faceCount = 1, this.supercompressionScheme = 0, this.levels = [], this.dataFormatDescriptor = [{ vendorId: 0, descriptorType: 0, descriptorBlockSize: 0, versionNumber: 2, colorModel: 0, colorPrimaries: 1, transferFunction: 2, flags: 0, texelBlockDimension: [0, 0, 0, 0], bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0], samples: [] }], this.keyValue = {}, this.globalData = null;
  }
}
class Qe {
  constructor(e, t, i, s) {
    this._dataView = void 0, this._littleEndian = void 0, this._offset = void 0, this._dataView = new DataView(e.buffer, e.byteOffset + t, i), this._littleEndian = s, this._offset = 0;
  }
  _nextUint8() {
    const e = this._dataView.getUint8(this._offset);
    return this._offset += 1, e;
  }
  _nextUint16() {
    const e = this._dataView.getUint16(this._offset, this._littleEndian);
    return this._offset += 2, e;
  }
  _nextUint32() {
    const e = this._dataView.getUint32(this._offset, this._littleEndian);
    return this._offset += 4, e;
  }
  _nextUint64() {
    const e = this._dataView.getUint32(this._offset, this._littleEndian) + 4294967296 * this._dataView.getUint32(this._offset + 4, this._littleEndian);
    return this._offset += 8, e;
  }
  _nextInt32() {
    const e = this._dataView.getInt32(this._offset, this._littleEndian);
    return this._offset += 4, e;
  }
  _nextUint8Array(e) {
    const t = new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + this._offset, e);
    return this._offset += e, t;
  }
  _skip(e) {
    return this._offset += e, this;
  }
  _scan(e, t) {
    t === void 0 && (t = 0);
    const i = this._offset;
    let s = 0;
    for (; this._dataView.getUint8(this._offset) !== t && s < e; ) s++, this._offset++;
    return s < e && this._offset++, new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + i, s);
  }
}
const N = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function Yt(l) {
  return new TextDecoder().decode(l);
}
function Zo(l) {
  const e = new Uint8Array(l.buffer, l.byteOffset, N.length);
  if (e[0] !== N[0] || e[1] !== N[1] || e[2] !== N[2] || e[3] !== N[3] || e[4] !== N[4] || e[5] !== N[5] || e[6] !== N[6] || e[7] !== N[7] || e[8] !== N[8] || e[9] !== N[9] || e[10] !== N[10] || e[11] !== N[11]) throw new Error("Missing KTX 2.0 identifier.");
  const t = new Xo(), i = 17 * Uint32Array.BYTES_PER_ELEMENT, s = new Qe(l, N.length, i, !0);
  t.vkFormat = s._nextUint32(), t.typeSize = s._nextUint32(), t.pixelWidth = s._nextUint32(), t.pixelHeight = s._nextUint32(), t.pixelDepth = s._nextUint32(), t.layerCount = s._nextUint32(), t.faceCount = s._nextUint32();
  const o = s._nextUint32();
  t.supercompressionScheme = s._nextUint32();
  const n = s._nextUint32(), a = s._nextUint32(), r = s._nextUint32(), A = s._nextUint32(), c = s._nextUint64(), h = s._nextUint64(), d = new Qe(l, N.length + i, 3 * o * 8, !0);
  for (let L = 0; L < o; L++) t.levels.push({ levelData: new Uint8Array(l.buffer, l.byteOffset + d._nextUint64(), d._nextUint64()), uncompressedByteLength: d._nextUint64() });
  const g = new Qe(l, n, a, !0), p = { vendorId: g._skip(4)._nextUint16(), descriptorType: g._nextUint16(), versionNumber: g._nextUint16(), descriptorBlockSize: g._nextUint16(), colorModel: g._nextUint8(), colorPrimaries: g._nextUint8(), transferFunction: g._nextUint8(), flags: g._nextUint8(), texelBlockDimension: [g._nextUint8(), g._nextUint8(), g._nextUint8(), g._nextUint8()], bytesPlane: [g._nextUint8(), g._nextUint8(), g._nextUint8(), g._nextUint8(), g._nextUint8(), g._nextUint8(), g._nextUint8(), g._nextUint8()], samples: [] }, C = (p.descriptorBlockSize / 4 - 6) / 4;
  for (let L = 0; L < C; L++) {
    const O = { bitOffset: g._nextUint16(), bitLength: g._nextUint8(), channelType: g._nextUint8(), samplePosition: [g._nextUint8(), g._nextUint8(), g._nextUint8(), g._nextUint8()], sampleLower: -1 / 0, sampleUpper: 1 / 0 };
    64 & O.channelType ? (O.sampleLower = g._nextInt32(), O.sampleUpper = g._nextInt32()) : (O.sampleLower = g._nextUint32(), O.sampleUpper = g._nextUint32()), p.samples[L] = O;
  }
  t.dataFormatDescriptor.length = 0, t.dataFormatDescriptor.push(p);
  const E = new Qe(l, r, A, !0);
  for (; E._offset < A; ) {
    const L = E._nextUint32(), O = E._scan(L), oe = Yt(O);
    if (t.keyValue[oe] = E._nextUint8Array(L - O.byteLength - 1), oe.match(/^ktx/i)) {
      const ye = Yt(t.keyValue[oe]);
      t.keyValue[oe] = ye.substring(0, ye.lastIndexOf("\0"));
    }
    E._skip(L % 4 ? 4 - L % 4 : 0);
  }
  if (h <= 0) return t;
  const m = new Qe(l, c, h, !0), f = m._nextUint16(), I = m._nextUint16(), b = m._nextUint32(), B = m._nextUint32(), y = m._nextUint32(), w = m._nextUint32(), k = [];
  for (let L = 0; L < o; L++) k.push({ imageFlags: m._nextUint32(), rgbSliceByteOffset: m._nextUint32(), rgbSliceByteLength: m._nextUint32(), alphaSliceByteOffset: m._nextUint32(), alphaSliceByteLength: m._nextUint32() });
  const R = c + m._offset, Q = R + b, x = Q + B, M = x + y, J = new Uint8Array(l.buffer, l.byteOffset + R, b), W = new Uint8Array(l.buffer, l.byteOffset + Q, B), Be = new Uint8Array(l.buffer, l.byteOffset + x, y), q = new Uint8Array(l.buffer, l.byteOffset + M, w);
  return t.globalData = { endpointCount: f, selectorCount: I, imageDescs: k, endpointsData: J, selectorsData: W, tablesData: Be, extendedData: q }, t;
}
let Ze, te, ft;
const $e = { env: { emscripten_notify_memory_growth: function(l) {
  ft = new Uint8Array(te.exports.memory.buffer);
} } };
class $o {
  init() {
    return Ze || (Ze = typeof fetch < "u" ? fetch("data:application/wasm;base64," + Jt).then((e) => e.arrayBuffer()).then((e) => WebAssembly.instantiate(e, $e)).then(this._init) : WebAssembly.instantiate(Buffer.from(Jt, "base64"), $e).then(this._init), Ze);
  }
  _init(e) {
    te = e.instance, $e.env.emscripten_notify_memory_growth(0);
  }
  decode(e, t = 0) {
    if (!te) throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const i = e.byteLength, s = te.exports.malloc(i);
    ft.set(e, s), t = t || Number(te.exports.ZSTD_findDecompressedSize(s, i));
    const o = te.exports.malloc(t), n = te.exports.ZSTD_decompress(o, t, s, i), a = ft.slice(o, o + n);
    return te.exports.free(s), te.exports.free(o), a;
  }
}
const Jt = "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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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", en = "display-p3", tn = "display-p3-linear", et = /* @__PURE__ */ new WeakMap();
let tt = 0, it;
class z extends Et {
  /**
   * Constructs a new KTX2 loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e), this.transcoderPath = "", this.transcoderBinary = null, this.transcoderPending = null, this.workerPool = new To(), this.workerSourceURL = "", this.workerConfig = null, typeof MSC_TRANSCODER < "u" && console.warn(
      'THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.'
    );
  }
  /**
   * Sets the transcoder path.
   *
   * The WASM transcoder and JS wrapper are available from the `examples/jsm/libs/basis` directory.
   *
   * @param {string} path - The transcoder path to set.
   * @return {KTX2Loader} A reference to this loader.
   */
  setTranscoderPath(e) {
    return this.transcoderPath = e, this;
  }
  /**
   * Sets the maximum number of Web Workers to be allocated by this instance.
   *
   * @param {number} workerLimit - The worker limit.
   * @return {KTX2Loader} A reference to this loader.
   */
  setWorkerLimit(e) {
    return this.workerPool.setWorkerLimit(e), this;
  }
  /**
   * Async version of {@link KTX2Loader#detectSupport}.
   *
   * @async
   * @param {WebGPURenderer|WebGLRenderer} renderer - The renderer.
   * @return {Promise} A Promise that resolves when the support has been detected.
   */
  async detectSupportAsync(e) {
    return this.workerConfig = {
      astcSupported: await e.hasFeatureAsync("texture-compression-astc"),
      astcHDRSupported: !1,
      // https://github.com/gpuweb/gpuweb/issues/3856
      etc1Supported: await e.hasFeatureAsync("texture-compression-etc1"),
      etc2Supported: await e.hasFeatureAsync("texture-compression-etc2"),
      dxtSupported: await e.hasFeatureAsync("texture-compression-bc"),
      bptcSupported: await e.hasFeatureAsync("texture-compression-bptc"),
      pvrtcSupported: await e.hasFeatureAsync("texture-compression-pvrtc")
    }, this;
  }
  /**
   * Detects hardware support for available compressed texture formats, to determine
   * the output format for the transcoder. Must be called before loading a texture.
   *
   * @param {WebGPURenderer|WebGLRenderer} renderer - The renderer.
   * @return {KTX2Loader} A reference to this loader.
   */
  detectSupport(e) {
    return e.isWebGPURenderer === !0 ? this.workerConfig = {
      astcSupported: e.hasFeature("texture-compression-astc"),
      astcHDRSupported: !1,
      // https://github.com/gpuweb/gpuweb/issues/3856
      etc1Supported: e.hasFeature("texture-compression-etc1"),
      etc2Supported: e.hasFeature("texture-compression-etc2"),
      dxtSupported: e.hasFeature("texture-compression-bc"),
      bptcSupported: e.hasFeature("texture-compression-bptc"),
      pvrtcSupported: e.hasFeature("texture-compression-pvrtc")
    } : this.workerConfig = {
      astcSupported: e.extensions.has("WEBGL_compressed_texture_astc"),
      astcHDRSupported: e.extensions.has("WEBGL_compressed_texture_astc") && e.extensions.get("WEBGL_compressed_texture_astc").getSupportedProfiles().includes("hdr"),
      etc1Supported: e.extensions.has("WEBGL_compressed_texture_etc1"),
      etc2Supported: e.extensions.has("WEBGL_compressed_texture_etc"),
      dxtSupported: e.extensions.has("WEBGL_compressed_texture_s3tc"),
      bptcSupported: e.extensions.has("EXT_texture_compression_bptc"),
      pvrtcSupported: e.extensions.has("WEBGL_compressed_texture_pvrtc") || e.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")
    }, this;
  }
  // TODO: Make this method private
  init() {
    if (!this.transcoderPending) {
      const e = new le(this.manager);
      e.setPath(this.transcoderPath), e.setWithCredentials(this.withCredentials);
      const t = e.loadAsync("basis_transcoder.js"), i = new le(this.manager);
      i.setPath(this.transcoderPath), i.setResponseType("arraybuffer"), i.setWithCredentials(this.withCredentials);
      const s = i.loadAsync("basis_transcoder.wasm");
      this.transcoderPending = Promise.all([t, s]).then(([o, n]) => {
        const a = z.BasisWorker.toString(), r = [
          "/* constants */",
          "let _EngineFormat = " + JSON.stringify(z.EngineFormat),
          "let _EngineType = " + JSON.stringify(z.EngineType),
          "let _TranscoderFormat = " + JSON.stringify(z.TranscoderFormat),
          "let _BasisFormat = " + JSON.stringify(z.BasisFormat),
          "/* basis_transcoder.js */",
          o,
          "/* worker */",
          a.substring(a.indexOf("{") + 1, a.lastIndexOf("}"))
        ].join(`
`);
        this.workerSourceURL = URL.createObjectURL(new Blob([r])), this.transcoderBinary = n, this.workerPool.setWorkerCreator(() => {
          const A = new Worker(this.workerSourceURL), c = this.transcoderBinary.slice(0);
          return A.postMessage({ type: "init", config: this.workerConfig, transcoderBinary: c }, [c]), A;
        });
      }), tt > 0 && console.warn(
        "THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."
      ), tt++;
    }
    return this.transcoderPending;
  }
  /**
   * Starts loading from the given URL and passes the loaded KTX2 texture
   * to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(CompressedTexture)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  load(e, t, i, s) {
    if (this.workerConfig === null)
      throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");
    const o = new le(this.manager);
    o.setPath(this.path), o.setCrossOrigin(this.crossOrigin), o.setWithCredentials(this.withCredentials), o.setResponseType("arraybuffer"), o.load(e, (n) => {
      this.parse(n, t, s);
    }, i, s);
  }
  /**
   * Parses the given KTX2 data.
   *
   * @param {ArrayBuffer} buffer - The raw KTX2 data as an array buffer.
   * @param {function(CompressedTexture)} onLoad - Executed when the loading/parsing process has been finished.
   * @param {onErrorCallback} onError - Executed when errors occur.
   * @returns {Promise} A Promise that resolves when the parsing has been finished.
   */
  parse(e, t, i) {
    if (this.workerConfig === null)
      throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");
    if (et.has(e))
      return et.get(e).promise.then(t).catch(i);
    this._createTexture(e).then((s) => t ? t(s) : null).catch(i);
  }
  _createTextureFrom(e, t) {
    const { type: i, error: s, data: { faces: o, width: n, height: a, format: r, type: A, dfdFlags: c } } = e;
    if (i === "error") return Promise.reject(s);
    let h;
    if (t.faceCount === 6)
      h = new fs(o, r, A);
    else {
      const d = o[0].mipmaps;
      h = t.layerCount > 1 ? new bs(d, n, a, t.layerCount, r, A) : new li(d, n, a, r, A);
    }
    return h.minFilter = o[0].mipmaps.length === 1 ? he : Oe, h.magFilter = he, h.generateMipmaps = !1, h.needsUpdate = !0, h.colorSpace = ki(t), h.premultiplyAlpha = !!(c & Lo), h;
  }
  /**
   * @private
   * @param {ArrayBuffer} buffer
   * @param {?Object} config
   * @return {Promise<CompressedTexture|CompressedArrayTexture|DataTexture|Data3DTexture>}
   */
  async _createTexture(e, t = {}) {
    const i = Zo(new Uint8Array(e)), s = i.vkFormat === Mt && i.dataFormatDescriptor[0].colorModel === 167;
    if (!(i.vkFormat === Po || s && !this.workerConfig.astcHDRSupported))
      return on(i);
    const n = t, a = this.init().then(() => this.workerPool.postMessage({ type: "transcode", buffer: e, taskConfig: n }, [e])).then((r) => this._createTextureFrom(r.data, i));
    return et.set(e, { promise: a }), a;
  }
  /**
   * Frees internal resources. This method should be called
   * when the loader is no longer required.
   */
  dispose() {
    this.workerPool.dispose(), this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL), tt--;
  }
}
z.BasisFormat = {
  ETC1S: 0,
  UASTC: 1,
  UASTC_HDR: 2
};
z.TranscoderFormat = {
  ETC1: 0,
  ETC2: 1,
  BC1: 2,
  BC3: 3,
  BC4: 4,
  BC5: 5,
  BC7_M6_OPAQUE_ONLY: 6,
  BC7_M5: 7,
  PVRTC1_4_RGB: 8,
  PVRTC1_4_RGBA: 9,
  ASTC_4x4: 10,
  ATC_RGB: 11,
  ATC_RGBA_INTERPOLATED_ALPHA: 12,
  RGBA32: 13,
  RGB565: 14,
  BGR565: 15,
  RGBA4444: 16,
  BC6H: 22,
  RGB_HALF: 24,
  RGBA_HALF: 25
};
z.EngineFormat = {
  RGBAFormat: fe,
  RGBA_ASTC_4x4_Format: Ge,
  RGB_BPTC_UNSIGNED_Format: ws,
  RGBA_BPTC_Format: ht,
  RGBA_ETC2_EAC_Format: ci,
  RGBA_PVRTC_4BPPV1_Format: ys,
  RGBA_S3TC_DXT5_Format: dt,
  RGB_ETC1_Format: Bs,
  RGB_ETC2_Format: hi,
  RGB_PVRTC_4BPPV1_Format: Is,
  RGBA_S3TC_DXT1_Format: gt
};
z.EngineType = {
  UnsignedByteType: K,
  HalfFloatType: be,
  FloatType: De
};
z.BasisWorker = function() {
  let l, e, t;
  const i = _EngineFormat, s = _EngineType, o = _TranscoderFormat, n = _BasisFormat;
  self.addEventListener("message", function(p) {
    const C = p.data;
    switch (C.type) {
      case "init":
        l = C.config, a(C.transcoderBinary);
        break;
      case "transcode":
        e.then(() => {
          try {
            const { faces: E, buffers: m, width: f, height: I, hasAlpha: b, format: B, type: y, dfdFlags: w } = r(C.buffer);
            self.postMessage({ type: "transcode", id: C.id, data: { faces: E, width: f, height: I, hasAlpha: b, format: B, type: y, dfdFlags: w } }, m);
          } catch (E) {
            console.error(E), self.postMessage({ type: "error", id: C.id, error: E.message });
          }
        });
        break;
    }
  });
  function a(p) {
    e = new Promise((C) => {
      t = { wasmBinary: p, onRuntimeInitialized: C }, BASIS(t);
    }).then(() => {
      t.initializeBasis(), t.KTX2File === void 0 && console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.");
    });
  }
  function r(p) {
    const C = new t.KTX2File(new Uint8Array(p));
    function E() {
      C.close(), C.delete();
    }
    if (!C.isValid())
      throw E(), new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");
    let m;
    if (C.isUASTC())
      m = n.UASTC;
    else if (C.isETC1S())
      m = n.ETC1S;
    else if (C.isHDR())
      m = n.UASTC_HDR;
    else
      throw new Error("THREE.KTX2Loader: Unknown Basis encoding");
    const f = C.getWidth(), I = C.getHeight(), b = C.getLayers() || 1, B = C.getLevels(), y = C.getFaces(), w = C.getHasAlpha(), k = C.getDFDFlags(), { transcoderFormat: R, engineFormat: Q, engineType: x } = h(m, f, I, w);
    if (!f || !I || !B)
      throw E(), new Error("THREE.KTX2Loader:	Invalid texture");
    if (!C.startTranscoding())
      throw E(), new Error("THREE.KTX2Loader: .startTranscoding failed");
    const M = [], J = [];
    for (let W = 0; W < y; W++) {
      const Be = [];
      for (let q = 0; q < B; q++) {
        const L = [];
        let O, oe;
        for (let de = 0; de < b; de++) {
          const ge = C.getImageLevelInfo(q, de, W);
          W === 0 && q === 0 && de === 0 && (ge.origWidth % 4 !== 0 || ge.origHeight % 4 !== 0) && console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."), B > 1 ? (O = ge.origWidth, oe = ge.origHeight) : (O = ge.width, oe = ge.height);
          let ue = new Uint8Array(C.getImageTranscodedSizeInBytes(q, de, 0, R));
          const _i = C.transcodeImage(ue, q, de, W, R, 0, -1, -1);
          if (x === s.HalfFloatType && (ue = new Uint16Array(ue.buffer, ue.byteOffset, ue.byteLength / Uint16Array.BYTES_PER_ELEMENT)), !_i)
            throw E(), new Error("THREE.KTX2Loader: .transcodeImage failed.");
          L.push(ue);
        }
        const ye = g(L);
        Be.push({ data: ye, width: O, height: oe }), J.push(ye.buffer);
      }
      M.push({ mipmaps: Be, width: f, height: I, format: Q, type: x });
    }
    return E(), { faces: M, buffers: J, width: f, height: I, hasAlpha: w, dfdFlags: k, format: Q, type: x };
  }
  const A = [
    {
      if: "astcSupported",
      basisFormat: [n.UASTC],
      transcoderFormat: [o.ASTC_4x4, o.ASTC_4x4],
      engineFormat: [i.RGBA_ASTC_4x4_Format, i.RGBA_ASTC_4x4_Format],
      engineType: [s.UnsignedByteType],
      priorityETC1S: 1 / 0,
      priorityUASTC: 1,
      needsPowerOfTwo: !1
    },
    {
      if: "bptcSupported",
      basisFormat: [n.ETC1S, n.UASTC],
      transcoderFormat: [o.BC7_M5, o.BC7_M5],
      engineFormat: [i.RGBA_BPTC_Format, i.RGBA_BPTC_Format],
      engineType: [s.UnsignedByteType],
      priorityETC1S: 3,
      priorityUASTC: 2,
      needsPowerOfTwo: !1
    },
    {
      if: "dxtSupported",
      basisFormat: [n.ETC1S, n.UASTC],
      transcoderFormat: [o.BC1, o.BC3],
      engineFormat: [i.RGBA_S3TC_DXT1_Format, i.RGBA_S3TC_DXT5_Format],
      engineType: [s.UnsignedByteType],
      priorityETC1S: 4,
      priorityUASTC: 5,
      needsPowerOfTwo: !1
    },
    {
      if: "etc2Supported",
      basisFormat: [n.ETC1S, n.UASTC],
      transcoderFormat: [o.ETC1, o.ETC2],
      engineFormat: [i.RGB_ETC2_Format, i.RGBA_ETC2_EAC_Format],
      engineType: [s.UnsignedByteType],
      priorityETC1S: 1,
      priorityUASTC: 3,
      needsPowerOfTwo: !1
    },
    {
      if: "etc1Supported",
      basisFormat: [n.ETC1S, n.UASTC],
      transcoderFormat: [o.ETC1],
      engineFormat: [i.RGB_ETC1_Format],
      engineType: [s.UnsignedByteType],
      priorityETC1S: 2,
      priorityUASTC: 4,
      needsPowerOfTwo: !1
    },
    {
      if: "pvrtcSupported",
      basisFormat: [n.ETC1S, n.UASTC],
      transcoderFormat: [o.PVRTC1_4_RGB, o.PVRTC1_4_RGBA],
      engineFormat: [i.RGB_PVRTC_4BPPV1_Format, i.RGBA_PVRTC_4BPPV1_Format],
      engineType: [s.UnsignedByteType],
      priorityETC1S: 5,
      priorityUASTC: 6,
      needsPowerOfTwo: !0
    },
    {
      if: "bptcSupported",
      basisFormat: [n.UASTC_HDR],
      transcoderFormat: [o.BC6H],
      engineFormat: [i.RGB_BPTC_UNSIGNED_Format],
      engineType: [s.HalfFloatType],
      priorityHDR: 1,
      needsPowerOfTwo: !1
    },
    // Uncompressed fallbacks.
    {
      basisFormat: [n.ETC1S, n.UASTC],
      transcoderFormat: [o.RGBA32, o.RGBA32],
      engineFormat: [i.RGBAFormat, i.RGBAFormat],
      engineType: [s.UnsignedByteType, s.UnsignedByteType],
      priorityETC1S: 100,
      priorityUASTC: 100,
      needsPowerOfTwo: !1
    },
    {
      basisFormat: [n.UASTC_HDR],
      transcoderFormat: [o.RGBA_HALF],
      engineFormat: [i.RGBAFormat],
      engineType: [s.HalfFloatType],
      priorityHDR: 100,
      needsPowerOfTwo: !1
    }
  ], c = {
    // TODO: For ETC1S we intentionally sort by _UASTC_ priority, preserving
    // a historical accident shown to avoid performance pitfalls for Linux with
    // Firefox & AMD GPU (RadeonSI). Further work needed.
    // See https://github.com/mrdoob/three.js/pull/29730.
    [n.ETC1S]: A.filter((p) => p.basisFormat.includes(n.ETC1S)).sort((p, C) => p.priorityUASTC - C.priorityUASTC),
    [n.UASTC]: A.filter((p) => p.basisFormat.includes(n.UASTC)).sort((p, C) => p.priorityUASTC - C.priorityUASTC),
    [n.UASTC_HDR]: A.filter((p) => p.basisFormat.includes(n.UASTC_HDR)).sort((p, C) => p.priorityHDR - C.priorityHDR)
  };
  function h(p, C, E, m) {
    const f = c[p];
    for (let I = 0; I < f.length; I++) {
      const b = f[I];
      if (b.if && !l[b.if] || !b.basisFormat.includes(p) || m && b.transcoderFormat.length < 2 || b.needsPowerOfTwo && !(d(C) && d(E))) continue;
      const B = b.transcoderFormat[m ? 1 : 0], y = b.engineFormat[m ? 1 : 0], w = b.engineType[0];
      return { transcoderFormat: B, engineFormat: y, engineType: w };
    }
    throw new Error("THREE.KTX2Loader: Failed to identify transcoding target.");
  }
  function d(p) {
    return p <= 2 ? !0 : (p & p - 1) === 0 && p !== 0;
  }
  function g(p) {
    if (p.length === 1) return p[0];
    let C = 0;
    for (let f = 0; f < p.length; f++) {
      const I = p[f];
      C += I.byteLength;
    }
    const E = new Uint8Array(C);
    let m = 0;
    for (let f = 0; f < p.length; f++) {
      const I = p[f];
      E.set(I, m), m += I.byteLength;
    }
    return E;
  }
};
const sn = /* @__PURE__ */ new Set([fe, Me, Se]), st = {
  [vi]: fe,
  [Qi]: fe,
  [Ii]: fe,
  [Bi]: fe,
  [Mi]: Me,
  [wi]: Me,
  [Ci]: Me,
  [Ei]: Me,
  [Si]: Se,
  [yi]: Se,
  [bi]: Se,
  [fi]: Se,
  [xi]: hi,
  [Di]: ci,
  [Mt]: Ge,
  [Wo]: Ge,
  [Jo]: Ge,
  [Ti]: Gt,
  [Ri]: Gt,
  [Ho]: gt,
  [Oo]: gt,
  [No]: _t,
  [Uo]: _t,
  [qo]: Ft,
  [Vo]: Ft,
  [zo]: dt,
  [jo]: dt,
  [Yo]: ht,
  [Ko]: ht
}, ot = {
  [vi]: De,
  [Qi]: be,
  [Ii]: K,
  [Bi]: K,
  [Mi]: De,
  [wi]: be,
  [Ci]: K,
  [Ei]: K,
  [Si]: De,
  [yi]: be,
  [bi]: K,
  [fi]: K,
  [xi]: K,
  [Di]: K,
  [Mt]: be,
  [Ti]: K,
  [Ri]: K
};
async function on(l) {
  const { vkFormat: e } = l;
  if (st[e] === void 0)
    throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");
  let t;
  l.supercompressionScheme === zt && (it || (it = new Promise(async (o) => {
    const n = new $o();
    await n.init(), o(n);
  })), t = await it);
  const i = [];
  for (let o = 0; o < l.levels.length; o++) {
    const n = Math.max(1, l.pixelWidth >> o), a = Math.max(1, l.pixelHeight >> o), r = l.pixelDepth ? Math.max(1, l.pixelDepth >> o) : 0, A = l.levels[o];
    let c;
    if (l.supercompressionScheme === ko)
      c = A.levelData;
    else if (l.supercompressionScheme === zt)
      c = t.decode(A.levelData, A.uncompressedByteLength);
    else
      throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");
    let h;
    ot[e] === De ? h = new Float32Array(
      c.buffer,
      c.byteOffset,
      c.byteLength / Float32Array.BYTES_PER_ELEMENT
    ) : ot[e] === be ? h = new Uint16Array(
      c.buffer,
      c.byteOffset,
      c.byteLength / Uint16Array.BYTES_PER_ELEMENT
    ) : h = c, i.push({
      data: h,
      width: n,
      height: a,
      depth: r
    });
  }
  let s;
  if (sn.has(st[e]))
    s = l.pixelDepth === 0 ? new Cs(i[0].data, l.pixelWidth, l.pixelHeight) : new Es(i[0].data, l.pixelWidth, l.pixelHeight, l.pixelDepth);
  else {
    if (l.pixelDepth > 0) throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");
    s = new li(i, l.pixelWidth, l.pixelHeight), s.minFilter = i.length === 1 ? he : Oe, s.magFilter = he;
  }
  return s.mipmaps = i, s.type = ot[e], s.format = st[e], s.colorSpace = ki(l), s.needsUpdate = !0, Promise.resolve(s);
}
function ki(l) {
  const e = l.dataFormatDescriptor[0];
  return e.colorPrimaries === _o ? e.transferFunction === Kt ? se : Y : e.colorPrimaries === Go ? e.transferFunction === Kt ? en : tn : e.colorPrimaries === Fo ? Lt : (console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${e.colorPrimaries}"`), Lt);
}
var nn = function() {
  var l = "b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q:Odkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq;w8Wqdbk;esezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9Uc;WFbGgocjdaocjd6EhDaicefhocbhqdnindndndnaeaq9nmbaDaeaq9RaqaDfae6Egkcsfglcl4cifcd4hxalc9WGgmTmecbhPawcjdfhsaohzinaraz9Rax6mvarazaxfgo9RcK6mvczhlcbhHinalgic9WfgOawcj;cbffhldndndndndnazaOco4fRbbaHcoG4ciGPlbedibkal9cb83ibalcwf9cb83ibxikalaoRblaoRbbgOco4gAaAciSgAE86bbawcj;cbfaifglcGfaoclfaAfgARbbaOcl4ciGgCaCciSgCE86bbalcVfaAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc7faAaCfgARbbaOciGgOaOciSgOE86bbalctfaAaOfgARbbaoRbegOco4gCaCciSgCE86bbalc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc93faAaCfgARbbaOciGgOaOciSgOE86bbalc94faAaOfgARbbaoRbdgOco4gCaCciSgCE86bbalc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc97faAaCfgARbbaOciGgOaOciSgOE86bbalc98faAaOfgORbbaoRbigoco4gAaAciSgAE86bbalc99faOaAfgORbbaocl4ciGgAaAciSgAE86bbalc9:faOaAfgORbbaocd4ciGgAaAciSgAE86bbalcufaOaAfglRbbaociGgoaociSgoE86bbalaofhoxdkalaoRbwaoRbbgOcl4gAaAcsSgAE86bbawcj;cbfaifglcGfaocwfaAfgARbbaOcsGgOaOcsSgOE86bbalcVfaAaOfgORbbaoRbegAcl4gCaCcsSgCE86bbalc7faOaCfgORbbaAcsGgAaAcsSgAE86bbalctfaOaAfgORbbaoRbdgAcl4gCaCcsSgCE86bbalc91faOaCfgORbbaAcsGgAaAcsSgAE86bbalc4faOaAfgORbbaoRbigAcl4gCaCcsSgCE86bbalc93faOaCfgORbbaAcsGgAaAcsSgAE86bbalc94faOaAfgORbbaoRblgAcl4gCaCcsSgCE86bbalc95faOaCfgORbbaAcsGgAaAcsSgAE86bbalc96faOaAfgORbbaoRbvgAcl4gCaCcsSgCE86bbalc97faOaCfgORbbaAcsGgAaAcsSgAE86bbalc98faOaAfgORbbaoRbogAcl4gCaCcsSgCE86bbalc99faOaCfgORbbaAcsGgAaAcsSgAE86bbalc9:faOaAfgORbbaoRbrgocl4gAaAcsSgAE86bbalcufaOaAfglRbbaocsGgoaocsSgoE86bbalaofhoxekalao8Pbb83bbalcwfaocwf8Pbb83bbaoczfhokdnaiam9pmbaHcdfhHaiczfhlarao9RcL0mekkaiam6mvaoTmvdnakTmbawaPfRbbhHawcj;cbfhlashiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkkascefhsaohzaPcefgPad9hmbxikkcbc99arao9Radcaadca0ESEhoxlkaoaxad2fhCdnakmbadhlinaoTmlarao9Rax6mlaoaxfhoalcufglmbkaChoxekcbhmawcjdfhAinarao9Rax6miawamfRbbhHawcj;cbfhlaAhiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkaAcefhAaoaxfhoamcefgmad9hmbkaChokabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqaombkc9:hoxekc9:hokavcj;ebf8Kjjjjbaok;cseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;oiliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabaiavcefciGfcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavciGfgkcd7cetfaD87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavcufciGfcetfaD87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohvxekcjjjj94hvkabakcetfav87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklzNbb", e = "b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q:6dkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq:p9sqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk:N8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhlaicefhodnaeTmbadTmbalc;WFbGglcjdalcjd6EhwcbhDinawaeaD9RaDawfae6Egqcsfglc9WGgkci2hxakcethmalcl4cifcd4hPabaDad2fhsakc;ab6hzcbhHincbhOaohAdndninaraA9RaP6meavcj;cbfaOak2fhCaAaPfhocbhidnazmbarao9Rc;Gb6mbcbhlinaCalfhidndndndndnaAalco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklbaoczfhokdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklzaoczfhokdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklaaoczfhokdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaoclfaYpQbfaXc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaocwfaYpQbfaXc:q:yjjbfRbbfhoxekaiaopbbbpkl8Waoczfhokalc;abfhialcjefak0meaihlarao9Rc;Fb0mbkkdnaiak9pmbaici4hlinarao9RcK6miaCaifhXdndndndndnaAaico4fRbbalcoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpkbbxikaXaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaXaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaXaopbbbpkbbaoczfhokalcdfhlaiczfgiak6mbkkaoTmeaohAaOcefgOclSmdxbkkc9:hoxlkdnakTmbavcjdfaHfhiavaHfpbdbhYcbhXinaiavcj;cbfaXfglpblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLalakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEalamfpblbg3cep9Ta3aQp9op9Hp9rg3alaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfhiaXczfgXak6mbkkaHclfgHad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfgDae6mbkkcbc99arao9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk::seHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:wPliuo97eue978Jjjjjbca9Rhiaec98Ghldndnadcl9hmbdnalTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalaeSmeaipxbbbbbbbbbbbbbbbbgqpklbaiabalcdtfgdaeciGglcdtgv;8qbbdnalTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDaqp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkadaiav;8qbbskdnalTmbcbhvabhdinadczfgxaxpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oaoarpmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgval6mbkkalaeSmbaiaeciGgvcitgdfcbcaad9R;8kbaiabalcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oaoarpmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalaeSmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbheabhdinadadpbbbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbadczfhdaeclfgeav6mbkkdnavalSmbaialciGgecdtgdVcbc;abad9R;8kbaiabavcdtfgvad;8qbbdnaeTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepklbkavaiad;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz:Dbb", t = new Uint8Array([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    4,
    1,
    96,
    0,
    0,
    3,
    3,
    2,
    0,
    0,
    5,
    3,
    1,
    0,
    1,
    12,
    1,
    0,
    10,
    22,
    2,
    12,
    0,
    65,
    0,
    65,
    0,
    65,
    0,
    252,
    10,
    0,
    0,
    11,
    7,
    0,
    65,
    0,
    253,
    15,
    26,
    11
  ]), i = new Uint8Array([
    32,
    0,
    65,
    2,
    1,
    106,
    34,
    33,
    3,
    128,
    11,
    4,
    13,
    64,
    6,
    253,
    10,
    7,
    15,
    116,
    127,
    5,
    8,
    12,
    40,
    16,
    19,
    54,
    20,
    9,
    27,
    255,
    113,
    17,
    42,
    67,
    24,
    23,
    146,
    148,
    18,
    14,
    22,
    45,
    70,
    69,
    56,
    114,
    101,
    21,
    25,
    63,
    75,
    136,
    108,
    28,
    118,
    29,
    73,
    115
  ]);
  if (typeof WebAssembly != "object")
    return {
      supported: !1
    };
  var s = WebAssembly.validate(t) ? a(e) : a(l), o, n = WebAssembly.instantiate(s, {}).then(function(m) {
    o = m.instance, o.exports.__wasm_call_ctors();
  });
  function a(m) {
    for (var f = new Uint8Array(m.length), I = 0; I < m.length; ++I) {
      var b = m.charCodeAt(I);
      f[I] = b > 96 ? b - 97 : b > 64 ? b - 39 : b + 4;
    }
    for (var B = 0, I = 0; I < m.length; ++I)
      f[B++] = f[I] < 60 ? i[f[I]] : (f[I] - 60) * 64 + f[++I];
    return f.buffer.slice(0, B);
  }
  function r(m, f, I, b, B, y, w) {
    var k = m.exports.sbrk, R = b + 3 & -4, Q = k(R * B), x = k(y.length), M = new Uint8Array(m.exports.memory.buffer);
    M.set(y, x);
    var J = f(Q, b, B, x, y.length);
    if (J == 0 && w && w(Q, R, B), I.set(M.subarray(Q, Q + b * B)), k(Q - k(0)), J != 0)
      throw new Error("Malformed buffer data: " + J);
  }
  var A = {
    NONE: "",
    OCTAHEDRAL: "meshopt_decodeFilterOct",
    QUATERNION: "meshopt_decodeFilterQuat",
    EXPONENTIAL: "meshopt_decodeFilterExp"
  }, c = {
    ATTRIBUTES: "meshopt_decodeVertexBuffer",
    TRIANGLES: "meshopt_decodeIndexBuffer",
    INDICES: "meshopt_decodeIndexSequence"
  }, h = [], d = 0;
  function g(m) {
    var f = {
      object: new Worker(m),
      pending: 0,
      requests: {}
    };
    return f.object.onmessage = function(I) {
      var b = I.data;
      f.pending -= b.count, f.requests[b.id][b.action](b.value), delete f.requests[b.id];
    }, f;
  }
  function p(m) {
    for (var f = "self.ready = WebAssembly.instantiate(new Uint8Array([" + new Uint8Array(s) + "]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = " + E.name + ";" + r.toString() + E.toString(), I = new Blob([f], { type: "text/javascript" }), b = URL.createObjectURL(I), B = h.length; B < m; ++B)
      h[B] = g(b);
    for (var B = m; B < h.length; ++B)
      h[B].object.postMessage({});
    h.length = m, URL.revokeObjectURL(b);
  }
  function C(m, f, I, b, B) {
    for (var y = h[0], w = 1; w < h.length; ++w)
      h[w].pending < y.pending && (y = h[w]);
    return new Promise(function(k, R) {
      var Q = new Uint8Array(I), x = ++d;
      y.pending += m, y.requests[x] = { resolve: k, reject: R }, y.object.postMessage({ id: x, count: m, size: f, source: Q, mode: b, filter: B }, [Q.buffer]);
    });
  }
  function E(m) {
    var f = m.data;
    if (!f.id)
      return self.close();
    self.ready.then(function(I) {
      try {
        var b = new Uint8Array(f.count * f.size);
        r(I, I.exports[f.mode], b, f.count, f.size, f.source, I.exports[f.filter]), self.postMessage({ id: f.id, count: f.count, action: "resolve", value: b }, [b.buffer]);
      } catch (B) {
        self.postMessage({ id: f.id, count: f.count, action: "reject", value: B });
      }
    });
  }
  return {
    ready: n,
    supported: !0,
    useWorkers: function(m) {
      p(m);
    },
    decodeVertexBuffer: function(m, f, I, b, B) {
      r(o, o.exports.meshopt_decodeVertexBuffer, m, f, I, b, o.exports[A[B]]);
    },
    decodeIndexBuffer: function(m, f, I, b) {
      r(o, o.exports.meshopt_decodeIndexBuffer, m, f, I, b);
    },
    decodeIndexSequence: function(m, f, I, b) {
      r(o, o.exports.meshopt_decodeIndexSequence, m, f, I, b);
    },
    decodeGltfBuffer: function(m, f, I, b, B, y) {
      r(o, o.exports[c[B]], m, f, I, b, o.exports[A[y]]);
    },
    decodeGltfBufferAsync: function(m, f, I, b, B) {
      return h.length > 0 ? C(m, f, I, c[b], A[B]) : n.then(function() {
        var y = new Uint8Array(m * f);
        return r(o, o.exports[c[b]], y, m, f, I, o.exports[A[B]]), y;
      });
    }
  };
}();
class V {
  constructor(e = null) {
    this.renderer = e, this.loader = new ui(), this.dracoLoader = new Do(), this.ktx2Loader = null, this.dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"), this.loader.setDRACOLoader(this.dracoLoader), this.loader.setMeshoptDecoder(nn), this.cache = /* @__PURE__ */ new Map(), this.ktx2SetupComplete = !1, this.setupKTX2Loader();
  }
  setupKTX2Loader() {
    if (V.sharedKTX2SetupComplete && V.sharedKTX2Loader) {
      this.ktx2Loader = V.sharedKTX2Loader, this.ktx2SetupComplete = !0, this.loader.setKTX2Loader(this.ktx2Loader);
      return;
    }
    try {
      V.sharedKTX2Loader || (V.sharedKTX2Loader = new z(), V.sharedKTX2Loader.setTranscoderPath("https://cdn.jsdelivr.net/npm/three@0.177.0/examples/jsm/libs/basis/")), this.ktx2Loader = V.sharedKTX2Loader, this.renderer && !V.sharedKTX2SetupComplete && (this.ktx2Loader.detectSupport(this.renderer), V.sharedKTX2SetupComplete = !0), this.loader.setKTX2Loader(this.ktx2Loader), this.ktx2SetupComplete = !0;
    } catch (e) {
      console.warn("KTX2 loader setup failed, falling back to standard textures:", e), this.ktx2Loader = null;
    }
  }
  setRenderer(e) {
    if (this.renderer = e, this.ktx2Loader && e && !this.ktx2SetupComplete)
      try {
        this.ktx2Loader.detectSupport(e), this.loader.setKTX2Loader(this.ktx2Loader);
      } catch (t) {
        console.warn("Failed to set up KTX2 loader with renderer:", t);
      }
    !this.ktx2Loader && e && this.setupKTX2Loader();
  }
  async load(e, t = null, i = null) {
    if (this.cache.has(e)) {
      const o = this.cache.get(e).scene.clone(!0);
      return this.processModel({ scene: o });
    }
    return new Promise((s, o) => {
      if (i && (i.addEventListener("abort", () => {
        o(new Error("Loading cancelled"));
      }), i.aborted)) {
        o(new Error("Loading cancelled"));
        return;
      }
      this.loader.load(
        e,
        (n) => {
          if (i && i.aborted) {
            o(new Error("Loading cancelled"));
            return;
          }
          this.cache.set(e, n);
          const a = this.processModel(n);
          s(a);
        },
        (n) => {
          i && i.aborted || t && t(n);
        },
        (n) => {
          o(n);
        }
      );
    });
  }
  processModel(e) {
    const t = e.scene;
    t.traverse((s) => {
      if (s.isLight && (s.visible = !1), s.isMesh && s.material) {
        s.castShadow = !0, s.receiveShadow = !0;
        const o = Array.isArray(s.material) ? s.material : [s.material];
        o.forEach((n, a) => {
          if (n.emissive && n.emissive.setHex(0), n.emissiveIntensity !== void 0 && (n.emissiveIntensity = 0), n.emissiveMap && (n.emissiveMap = null), n.lightMap && (n.lightMap = null), n.lightMapIntensity !== void 0 && (n.lightMapIntensity = 0), n.type === "MeshBasicMaterial" || n.type === "MeshPhongMaterial") {
            const A = new u.MeshLambertMaterial({
              map: n.map,
              color: n.color || new u.Color(16777215),
              transparent: n.transparent,
              opacity: n.opacity !== void 0 ? n.opacity : 1,
              alphaMap: n.alphaMap,
              side: n.side !== void 0 ? n.side : u.FrontSide,
              wireframe: n.wireframe || !1,
              vertexColors: n.vertexColors || !1,
              fog: n.fog !== void 0 ? n.fog : !0,
              aoMap: n.aoMap,
              aoMapIntensity: n.aoMapIntensity || 1,
              envMap: n.envMap,
              reflectivity: n.reflectivity || 1,
              refractionRatio: n.refractionRatio || 0.98,
              combine: n.combine || u.MultiplyOperation,
              // Enhanced normal map support
              normalMap: n.normalMap,
              normalScale: n.normalScale || new u.Vector2(1, 1),
              // Explicit smooth shading for non-blocky appearance
              flatShading: !1
            });
            A.map && (A.map.anisotropy = this.renderer.capabilities.getMaxAnisotropy(), A.map.needsUpdate = !0), A.normalMap && (A.normalMap.anisotropy = this.renderer.capabilities.getMaxAnisotropy(), A.normalMap.needsUpdate = !0), A.needsUpdate = !0, Array.isArray(s.material) ? s.material[a] = A : s.material = A;
          } else (n.type === "MeshStandardMaterial" || n.type === "MeshPhysicalMaterial") && (n.needsUpdate = !0);
          const r = Array.isArray(s.material) ? s.material[a] : s.material;
          r && r.needsUpdate !== void 0 && (r.needsUpdate = !0);
        }), s.geometry && (s.geometry.computeVertexNormals(), s.geometry.normalizeNormals(), o.some((a) => a.normalMap) && s.geometry.computeTangents());
      }
    });
    const i = new u.Box3().setFromObject(t);
    return t.userData.boundingBox = i, t;
  }
  processMaterial(e) {
    e && e.needsUpdate !== void 0 && (e.needsUpdate = !0);
  }
  dispose() {
    this.dracoLoader && this.dracoLoader.dispose(), this.cache.clear(), this.ktx2SetupComplete = !1;
  }
}
V.sharedKTX2Loader = null;
V.sharedKTX2SetupComplete = !1;
class Ie {
  /**
   * Constructs a new VR button.
   *
   * @param {WebGLRenderer|WebGPURenderer} renderer - The renderer.
   * @param {XRSessionInit} [sessionInit] - The a configuration object for the AR session.
   * @return {HTMLElement} The button or an error message if `immersive-ar` isn't supported.
   */
  static createButton(e, t = {}) {
    const i = document.createElement("button");
    function s() {
      let A = null;
      async function c(g) {
        g.addEventListener("end", h), await e.xr.setSession(g), i.textContent = "EXIT VR", A = g;
      }
      function h() {
        A.removeEventListener("end", h), i.textContent = "ENTER VR", A = null;
      }
      i.style.display = "", i.style.cursor = "pointer", i.style.left = "calc(50% - 50px)", i.style.width = "100px", i.textContent = "ENTER VR";
      const d = {
        ...t,
        optionalFeatures: [
          "local-floor",
          "bounded-floor",
          "layers",
          ...t.optionalFeatures || []
        ]
      };
      i.onmouseenter = function() {
        i.style.opacity = "1.0";
      }, i.onmouseleave = function() {
        i.style.opacity = "0.5";
      }, i.onclick = function() {
        A === null ? navigator.xr.requestSession("immersive-vr", d).then(c) : (A.end(), navigator.xr.offerSession !== void 0 && navigator.xr.offerSession("immersive-vr", d).then(c).catch((g) => {
          console.warn(g);
        }));
      }, navigator.xr.offerSession !== void 0 && navigator.xr.offerSession("immersive-vr", d).then(c).catch((g) => {
        console.warn(g);
      });
    }
    function o() {
      i.style.display = "", i.style.cursor = "auto", i.style.left = "calc(50% - 75px)", i.style.width = "150px", i.onmouseenter = null, i.onmouseleave = null, i.onclick = null;
    }
    function n() {
      o(), i.textContent = "VR NOT SUPPORTED";
    }
    function a(A) {
      o(), console.warn("Exception when trying to call xr.isSessionSupported", A), i.textContent = "VR NOT ALLOWED";
    }
    function r(A) {
      A.style.position = "absolute", A.style.bottom = "20px", A.style.padding = "12px 6px", A.style.border = "1px solid #fff", A.style.borderRadius = "4px", A.style.background = "rgba(0,0,0,0.1)", A.style.color = "#fff", A.style.font = "normal 13px sans-serif", A.style.textAlign = "center", A.style.opacity = "0.5", A.style.outline = "none", A.style.zIndex = "999";
    }
    if ("xr" in navigator)
      return i.id = "VRButton", i.style.display = "none", r(i), navigator.xr.isSessionSupported("immersive-vr").then(function(A) {
        A ? s() : n(), A && Ie.xrSessionIsGranted && i.click();
      }).catch(a), i;
    {
      const A = document.createElement("a");
      return window.isSecureContext === !1 ? (A.href = document.location.href.replace(/^http:/, "https:"), A.innerHTML = "WEBXR NEEDS HTTPS") : (A.href = "https://immersiveweb.dev/", A.innerHTML = "WEBXR NOT AVAILABLE"), A.style.left = "calc(50% - 90px)", A.style.width = "180px", A.style.textDecoration = "none", r(A), A;
    }
  }
  /**
   * Registers a `sessiongranted` event listener. When a session is granted, the {@link VRButton#xrSessionIsGranted}
   * flag will evaluate to `true`. This method is automatically called by the module itself so there
   * should be no need to use it on app level.
   */
  static registerSessionGrantedListener() {
    if (typeof navigator < "u" && "xr" in navigator) {
      if (/WebXRViewer\//i.test(navigator.userAgent)) return;
      navigator.xr.addEventListener("sessiongranted", () => {
        Ie.xrSessionIsGranted = !0;
      });
    }
  }
}
Ie.xrSessionIsGranted = !1;
Ie.registerSessionGrantedListener();
class an {
  constructor(e, t, i, s = null) {
    this.renderer = e, this.camera = t, this.scene = i, this.container = s || document.body, this.isVRSupported = !1, this.isVRPresenting = !1, this.isQuest2 = !1, this.isQuest3 = !1, this.vrButton = null, this.onSessionStart = null, this.onSessionEnd = null;
  }
  init() {
    this.renderer.xr.enabled = !0, this.checkVRSupported(), this.removeExistingVRButtons(), this.checkVRSupported().then(() => {
      this.isVRSupported && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
        this.createVRButton();
      }) : this.createVRButton());
    }), this.setupSessionListeners(), "xr" in navigator ? navigator.xr.isSessionSupported("immersive-vr").then((e) => {
      e || this.startVRButtonMonitoring();
    }).catch(() => {
      this.startVRButtonMonitoring();
    }) : this.startVRButtonMonitoring();
  }
  checkVRSupported() {
    return new Promise((e) => {
      try {
        "xr" in navigator ? navigator.xr.isSessionSupported("immersive-vr").then((t) => {
          this.isVRSupported = t, e();
        }).catch((t) => {
          console.warn("VR support check failed:", t), this.isVRSupported = !1, e();
        }) : (this.isVRSupported = !1, e());
      } catch (t) {
        console.warn("VR support check error:", t), this.isVRSupported = !1, e();
      }
    });
  }
  createVRButton() {
    try {
      this.waitForVRCSS().then(() => {
        const e = {
          optionalFeatures: [
            "hand-tracking",
            "local-floor",
            "bounded-floor",
            "layers"
          ]
        };
        this.vrButton = Ie.createButton(this.renderer, e), this.vrButton.innerHTML = '<span class="vr-icon">🥽</span>ENTER VR', this.vrButton.className = "vr-button-glass vr-button-available", this.vrButton.disabled = !1, this.vrButton.style.cssText = `
          position: fixed !important;
          bottom: 80px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          z-index: 2147483647 !important;
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          pointer-events: auto !important;
          cursor: pointer !important;
        `, this.container.appendChild(this.vrButton), this.styleVRButton();
      });
    } catch (e) {
      console.error("❌ VR button creation failed:", e);
    }
  }
  styleVRButton() {
    const e = () => {
      const t = document.querySelector("button.vr-button-glass") || document.querySelector("button") || this.vrButton;
      return t ? (t.style.display = "flex", t.style.visibility = "visible", t.style.opacity = "1", t.innerHTML = '<span class="vr-icon">🥽</span>ENTER VR', t.classList.contains("vr-button-glass") || t.classList.add("vr-button-glass"), t.disabled = !1, t.classList.remove("vr-generic-disabled"), !0) : !1;
    };
    e() || (setTimeout(e, 100), setTimeout(e, 300), setTimeout(e, 500));
  }
  updateVRButton() {
  }
  setupSessionListeners() {
    this.renderer.xr.addEventListener("sessionstart", () => {
      this.isVRPresenting = !0;
      const e = this.detectQuestDevice();
      this.applyQuestOptimizations(e), this.onSessionStart && this.onSessionStart();
    }), this.renderer.xr.addEventListener("sessionend", () => {
      this.isVRPresenting = !1, this.onSessionEnd && this.onSessionEnd();
    });
  }
  detectQuestDevice() {
    try {
      const e = navigator.userAgent.toLowerCase();
      return e.includes("quest 2") || e.includes("oculus quest 2") || e.includes("oculus") && e.includes("android") && !e.includes("quest 3") ? (this.isQuest2 = !0, "quest2") : e.includes("quest 3") || e.includes("oculus quest 3") || e.includes("meta quest 3") ? (this.isQuest3 = !0, "quest3") : "unknown";
    } catch (e) {
      return console.warn("Device detection failed:", e), "unknown";
    }
  }
  applyQuestOptimizations(e) {
    e === "quest2" && (this.camera.far = 20, this.camera.updateProjectionMatrix());
  }
  async waitForVRCSS() {
    return new Promise((e) => {
      const t = () => {
        const i = document.createElement("div");
        i.className = "vr-mode-active", i.style.display = "none", this.container.appendChild(i);
        const s = window.getComputedStyle(i), o = s.getPropertyValue("--vr-css-loaded") === "true" || s.opacity === "0.999";
        this.container.removeChild(i), o ? e() : setTimeout(t, 50);
      };
      setTimeout(t, 100);
    });
  }
  removeExistingVRButtons() {
    document.querySelectorAll('button.legacy-vr-button, a[href="#VR"]').forEach((t) => {
      try {
        t.parentNode && t.parentNode.removeChild(t);
      } catch (i) {
        console.warn("Failed to remove VR button:", i);
      }
    });
  }
  startVRButtonMonitoring() {
    new MutationObserver((t) => {
      t.forEach((i) => {
        i.addedNodes.forEach((s) => {
          if (s.nodeType === Node.ELEMENT_NODE) {
            const o = s.querySelectorAll ? s.querySelectorAll('button.legacy-vr-button, a[href="#VR"]') : [];
            if (o.length > 0 || s.tagName === "BUTTON" && s.classList.contains("legacy-vr-button")) {
              const n = o.length > 0 ? o[0] : s;
              n.style.display = "none";
            }
          }
        });
      });
    }).observe(document.body, { childList: !0, subtree: !0 });
  }
  getVRStatus() {
    return {
      supported: this.isVRSupported,
      presenting: this.isVRPresenting,
      isQuest2: this.isQuest2,
      isQuest3: this.isQuest3
    };
  }
  dispose() {
    this.vrButton && this.vrButton.parentNode && this.vrButton.parentNode.removeChild(this.vrButton), this.isQuest2 = !1, this.isQuest3 = !1, this.isVRSupported = !1, this.isVRPresenting = !1;
  }
}
const T = {
  ComponentState: Object.freeze({
    DEFAULT: "default",
    TOUCHED: "touched",
    PRESSED: "pressed"
  }),
  ComponentProperty: Object.freeze({
    BUTTON: "button",
    X_AXIS: "xAxis",
    Y_AXIS: "yAxis",
    STATE: "state"
  }),
  ComponentType: Object.freeze({
    TRIGGER: "trigger",
    SQUEEZE: "squeeze",
    TOUCHPAD: "touchpad",
    THUMBSTICK: "thumbstick",
    BUTTON: "button"
  }),
  ButtonTouchThreshold: 0.05,
  AxisTouchThreshold: 0.1,
  VisualResponseProperty: Object.freeze({
    TRANSFORM: "transform",
    VISIBILITY: "visibility"
  })
};
async function Li(l) {
  const e = await fetch(l);
  if (e.ok)
    return e.json();
  throw new Error(e.statusText);
}
async function rn(l) {
  if (!l)
    throw new Error("No basePath supplied");
  return await Li(`${l}/profilesList.json`);
}
async function An(l, e, t = null, i = !0) {
  if (!l)
    throw new Error("No xrInputSource supplied");
  if (!e)
    throw new Error("No basePath supplied");
  const s = await rn(e);
  let o;
  if (l.profiles.some((r) => {
    const A = s[r];
    return A && (o = {
      profileId: r,
      profilePath: `${e}/${A.path}`,
      deprecated: !!A.deprecated
    }), !!o;
  }), !o) {
    if (!t)
      throw new Error("No matching profile name found");
    const r = s[t];
    if (!r)
      throw new Error(`No matching profile name found and default profile "${t}" missing.`);
    o = {
      profileId: t,
      profilePath: `${e}/${r.path}`,
      deprecated: !!r.deprecated
    };
  }
  const n = await Li(o.profilePath);
  let a;
  if (i) {
    let r;
    if (l.handedness === "any" ? r = n.layouts[Object.keys(n.layouts)[0]] : r = n.layouts[l.handedness], !r)
      throw new Error(
        `No matching handedness, ${l.handedness}, in profile ${o.profileId}`
      );
    r.assetPath && (a = o.profilePath.replace("profile.json", r.assetPath));
  }
  return { profile: n, assetPath: a };
}
const ln = {
  xAxis: 0,
  yAxis: 0,
  button: 0,
  state: T.ComponentState.DEFAULT
};
function cn(l = 0, e = 0) {
  let t = l, i = e;
  if (Math.sqrt(l * l + e * e) > 1) {
    const n = Math.atan2(e, l);
    t = Math.cos(n), i = Math.sin(n);
  }
  return {
    normalizedXAxis: t * 0.5 + 0.5,
    normalizedYAxis: i * 0.5 + 0.5
  };
}
class hn {
  constructor(e) {
    this.componentProperty = e.componentProperty, this.states = e.states, this.valueNodeName = e.valueNodeName, this.valueNodeProperty = e.valueNodeProperty, this.valueNodeProperty === T.VisualResponseProperty.TRANSFORM && (this.minNodeName = e.minNodeName, this.maxNodeName = e.maxNodeName), this.value = 0, this.updateFromComponent(ln);
  }
  /**
   * Computes the visual response's interpolation weight based on component state
   * @param {Object} componentValues - The component from which to update
   * @param {number} xAxis - The reported X axis value of the component
   * @param {number} yAxis - The reported Y axis value of the component
   * @param {number} button - The reported value of the component's button
   * @param {string} state - The component's active state
   */
  updateFromComponent({
    xAxis: e,
    yAxis: t,
    button: i,
    state: s
  }) {
    const { normalizedXAxis: o, normalizedYAxis: n } = cn(e, t);
    switch (this.componentProperty) {
      case T.ComponentProperty.X_AXIS:
        this.value = this.states.includes(s) ? o : 0.5;
        break;
      case T.ComponentProperty.Y_AXIS:
        this.value = this.states.includes(s) ? n : 0.5;
        break;
      case T.ComponentProperty.BUTTON:
        this.value = this.states.includes(s) ? i : 0;
        break;
      case T.ComponentProperty.STATE:
        this.valueNodeProperty === T.VisualResponseProperty.VISIBILITY ? this.value = this.states.includes(s) : this.value = this.states.includes(s) ? 1 : 0;
        break;
      default:
        throw new Error(`Unexpected visualResponse componentProperty ${this.componentProperty}`);
    }
  }
}
class dn {
  /**
   * @param {Object} componentId - Id of the component
   * @param {Object} componentDescription - Description of the component to be created
   */
  constructor(e, t) {
    if (!e || !t || !t.visualResponses || !t.gamepadIndices || Object.keys(t.gamepadIndices).length === 0)
      throw new Error("Invalid arguments supplied");
    this.id = e, this.type = t.type, this.rootNodeName = t.rootNodeName, this.touchPointNodeName = t.touchPointNodeName, this.visualResponses = {}, Object.keys(t.visualResponses).forEach((i) => {
      const s = new hn(t.visualResponses[i]);
      this.visualResponses[i] = s;
    }), this.gamepadIndices = Object.assign({}, t.gamepadIndices), this.values = {
      state: T.ComponentState.DEFAULT,
      button: this.gamepadIndices.button !== void 0 ? 0 : void 0,
      xAxis: this.gamepadIndices.xAxis !== void 0 ? 0 : void 0,
      yAxis: this.gamepadIndices.yAxis !== void 0 ? 0 : void 0
    };
  }
  get data() {
    return { id: this.id, ...this.values };
  }
  /**
   * @description Poll for updated data based on current gamepad state
   * @param {Object} gamepad - The gamepad object from which the component data should be polled
   */
  updateFromGamepad(e) {
    if (this.values.state = T.ComponentState.DEFAULT, this.gamepadIndices.button !== void 0 && e.buttons.length > this.gamepadIndices.button) {
      const t = e.buttons[this.gamepadIndices.button];
      this.values.button = t.value, this.values.button = this.values.button < 0 ? 0 : this.values.button, this.values.button = this.values.button > 1 ? 1 : this.values.button, t.pressed || this.values.button === 1 ? this.values.state = T.ComponentState.PRESSED : (t.touched || this.values.button > T.ButtonTouchThreshold) && (this.values.state = T.ComponentState.TOUCHED);
    }
    this.gamepadIndices.xAxis !== void 0 && e.axes.length > this.gamepadIndices.xAxis && (this.values.xAxis = e.axes[this.gamepadIndices.xAxis], this.values.xAxis = this.values.xAxis < -1 ? -1 : this.values.xAxis, this.values.xAxis = this.values.xAxis > 1 ? 1 : this.values.xAxis, this.values.state === T.ComponentState.DEFAULT && Math.abs(this.values.xAxis) > T.AxisTouchThreshold && (this.values.state = T.ComponentState.TOUCHED)), this.gamepadIndices.yAxis !== void 0 && e.axes.length > this.gamepadIndices.yAxis && (this.values.yAxis = e.axes[this.gamepadIndices.yAxis], this.values.yAxis = this.values.yAxis < -1 ? -1 : this.values.yAxis, this.values.yAxis = this.values.yAxis > 1 ? 1 : this.values.yAxis, this.values.state === T.ComponentState.DEFAULT && Math.abs(this.values.yAxis) > T.AxisTouchThreshold && (this.values.state = T.ComponentState.TOUCHED)), Object.values(this.visualResponses).forEach((t) => {
      t.updateFromComponent(this.values);
    });
  }
}
class gn {
  /**
   * @param {Object} xrInputSource - The XRInputSource to build the MotionController around
   * @param {Object} profile - The best matched profile description for the supplied xrInputSource
   * @param {string} assetUrl
   */
  constructor(e, t, i) {
    if (!e)
      throw new Error("No xrInputSource supplied");
    if (!t)
      throw new Error("No profile supplied");
    this.xrInputSource = e, this.assetUrl = i, this.id = t.profileId, this.layoutDescription = t.layouts[e.handedness], this.components = {}, Object.keys(this.layoutDescription.components).forEach((s) => {
      const o = this.layoutDescription.components[s];
      this.components[s] = new dn(s, o);
    }), this.updateFromGamepad();
  }
  get gripSpace() {
    return this.xrInputSource.gripSpace;
  }
  get targetRaySpace() {
    return this.xrInputSource.targetRaySpace;
  }
  /**
   * @description Returns a subset of component data for simplified debugging
   */
  get data() {
    const e = [];
    return Object.values(this.components).forEach((t) => {
      e.push(t.data);
    }), e;
  }
  /**
   * @description Poll for updated data based on current gamepad state
   */
  updateFromGamepad() {
    Object.values(this.components).forEach((e) => {
      e.updateFromGamepad(this.xrInputSource.gamepad);
    });
  }
}
const un = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles", pn = "generic-trigger";
class mn extends It {
  /**
   * Constructs a new XR controller model.
   */
  constructor() {
    super(), this.motionController = null, this.envMap = null;
  }
  /**
   * Sets an environment map that is applied to the controller model.
   *
   * @param {?Texture} envMap - The environment map to apply.
   * @return {XRControllerModel} A reference to this instance.
   */
  setEnvironmentMap(e) {
    return this.envMap == e ? this : (this.envMap = e, this.traverse((t) => {
      t.isMesh && (t.material.envMap = this.envMap, t.material.needsUpdate = !0);
    }), this);
  }
  /**
   * Overwritten with a custom implementation. Polls data from the XRInputSource and updates the
   * model's components to match the real world data.
   *
   * @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
   * when {@link Object3D#matrixWorldAutoUpdate} is set to `false`.
   */
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.motionController && (this.motionController.updateFromGamepad(), Object.values(this.motionController.components).forEach((t) => {
      Object.values(t.visualResponses).forEach((i) => {
        const { valueNode: s, minNode: o, maxNode: n, value: a, valueNodeProperty: r } = i;
        s && (r === T.VisualResponseProperty.VISIBILITY ? s.visible = a : r === T.VisualResponseProperty.TRANSFORM && (s.quaternion.slerpQuaternions(
          o.quaternion,
          n.quaternion,
          a
        ), s.position.lerpVectors(
          o.position,
          n.position,
          a
        )));
      });
    }));
  }
}
function fn(l, e) {
  Object.values(l.components).forEach((t) => {
    const { type: i, touchPointNodeName: s, visualResponses: o } = t;
    if (i === T.ComponentType.TOUCHPAD)
      if (t.touchPointNode = e.getObjectByName(s), t.touchPointNode) {
        const n = new Qs(1e-3), a = new me({ color: 255 }), r = new Bt(n, a);
        t.touchPointNode.add(r);
      } else
        console.warn(`Could not find touch dot, ${t.touchPointNodeName}, in touchpad component ${t.id}`);
    Object.values(o).forEach((n) => {
      const { valueNodeName: a, minNodeName: r, maxNodeName: A, valueNodeProperty: c } = n;
      if (c === T.VisualResponseProperty.TRANSFORM) {
        if (n.minNode = e.getObjectByName(r), n.maxNode = e.getObjectByName(A), !n.minNode) {
          console.warn(`Could not find ${r} in the model`);
          return;
        }
        if (!n.maxNode) {
          console.warn(`Could not find ${A} in the model`);
          return;
        }
      }
      n.valueNode = e.getObjectByName(a), n.valueNode || console.warn(`Could not find ${a} in the model`);
    });
  });
}
function Wt(l, e) {
  fn(l.motionController, e), l.envMap && e.traverse((t) => {
    t.isMesh && (t.material.envMap = l.envMap, t.material.needsUpdate = !0);
  }), l.add(e);
}
class bn {
  /**
   * Constructs a new XR controller model factory.
   *
   * @param {?GLTFLoader} [gltfLoader=null] - A glTF loader that is used to load controller models.
   * @param {?Function} [onLoad=null] - A callback that is executed when a controller model has been loaded.
   */
  constructor(e = null, t = null) {
    this.gltfLoader = e, this.path = un, this._assetCache = {}, this.onLoad = t, this.gltfLoader || (this.gltfLoader = new ui());
  }
  /**
   * Sets the path to the model repository.
   *
   * @param {string} path - The path to set.
   * @return {XRControllerModelFactory} A reference to this instance.
   */
  setPath(e) {
    return this.path = e, this;
  }
  /**
   * Creates a controller model for the given WebXR controller.
   *
   * @param {Group} controller - The controller.
   * @return {XRControllerModel} The XR controller model.
   */
  createControllerModel(e) {
    const t = new mn();
    let i = null;
    return e.addEventListener("connected", (s) => {
      const o = s.data;
      o.targetRayMode !== "tracked-pointer" || !o.gamepad || o.hand || An(o, this.path, pn).then(({ profile: n, assetPath: a }) => {
        t.motionController = new gn(
          o,
          n,
          a
        );
        const r = this._assetCache[t.motionController.assetUrl];
        if (r)
          i = r.scene.clone(), Wt(t, i), this.onLoad && this.onLoad(i);
        else {
          if (!this.gltfLoader)
            throw new Error("GLTFLoader not set.");
          this.gltfLoader.setPath(""), this.gltfLoader.load(
            t.motionController.assetUrl,
            (A) => {
              this._assetCache[t.motionController.assetUrl] = A, i = A.scene.clone(), Wt(t, i), this.onLoad && this.onLoad(i);
            },
            null,
            () => {
              throw new Error(`Asset ${t.motionController.assetUrl} missing or malformed.`);
            }
          );
        }
      }).catch((n) => {
        console.warn(n);
      });
    }), e.addEventListener("disconnected", () => {
      t.motionController = null, t.remove(i), i = null;
    }), t;
  }
}
class Cn {
  constructor(e, t) {
    this.renderer = e, this.camera = t, this.controller1 = null, this.controller2 = null, this.controllerGrip1 = null, this.controllerGrip2 = null, this.controllers = [], this.controllerGrips = [], this.buttonStates = /* @__PURE__ */ new Map(), this.inputDeadzone = 0.15, this.turnSmoothingFactor = 0.1, this.lastTurnInput = 0, this.onSelectStart = null, this.onSelectEnd = null, this.onSqueezeStart = null, this.onSqueezeEnd = null, this.onModeToggle = null, this.onMovementStart = null, this.onMovementStop = null, this.handsActive = !1, this.handStates = {
      left: { pinch: !1, fist: !1, direction: new u.Vector3() },
      right: { pinch: !1, fist: !1, direction: new u.Vector3() }
    };
  }
  init() {
    this.initControllers(), this.initHands();
  }
  // --- Hand tracking/gesture detection scaffold ---
  initHands() {
    const e = this.renderer.xr.getSession && this.renderer.xr.getSession();
    e && (e.addEventListener("inputsourceschange", () => {
      this.checkHandsActive();
    }), this.checkHandsActive());
  }
  checkHandsActive() {
    const e = this.renderer.xr.getSession && this.renderer.xr.getSession();
    if (!e) return;
    let t = !1;
    for (let i of e.inputSources)
      i.hand && (t = !0);
    this.handsActive = t;
  }
  updateHandGestures() {
    const e = this.renderer.xr.getSession && this.renderer.xr.getSession();
    if (e) {
      for (let t of e.inputSources)
        if (t.hand && t.handedness) {
          const i = t.handedness, s = t.hand.get("thumb-tip"), o = t.hand.get("index-finger-tip");
          if (!s || !o || !s.transform || !o.transform)
            console.warn(`[HandTracking] No joint data for ${i} hand:`, { thumbTip: s, indexTip: o }), this.handStates[i].pinch = !1;
          else {
            const r = new u.Vector3().setFromMatrixPosition(new u.Matrix4().fromArray(s.transform.matrix)), A = new u.Vector3().setFromMatrixPosition(new u.Matrix4().fromArray(o.transform.matrix)), c = r.distanceTo(A);
            this.handStates[i].pinch = c < 0.025, this.handStates[i].pinch;
          }
          let n = !0;
          const a = t.hand.get("wrist");
          if (a && a.transform) {
            const r = new u.Vector3().setFromMatrixPosition(new u.Matrix4().fromArray(a.transform.matrix));
            for (let A of ["index-finger-tip", "middle-finger-tip", "ring-finger-tip", "pinky-finger-tip"]) {
              const c = t.hand.get(A);
              if (!c || !c.transform) {
                console.warn(`[HandTracking] No joint data for ${A} on ${i} hand.`), n = !1;
                continue;
              }
              new u.Vector3().setFromMatrixPosition(new u.Matrix4().fromArray(c.transform.matrix)).distanceTo(r) > 0.045 && (n = !1);
            }
          } else
            console.warn(`[HandTracking] No palm joint for ${i} hand.`), n = !1;
          if (this.handStates[i].fist = n, o && a && o.transform && a.transform) {
            const r = new u.Vector3().setFromMatrixPosition(new u.Matrix4().fromArray(a.transform.matrix)), A = new u.Vector3().setFromMatrixPosition(new u.Matrix4().fromArray(o.transform.matrix));
            this.handStates[i].direction = new u.Vector3().subVectors(A, r).normalize();
          }
        }
    }
  }
  initControllers() {
    const e = new bn();
    for (let t = 0; t < 2; t++) {
      const i = this.renderer.xr.getController(t), s = this.renderer.xr.getControllerGrip(t);
      s.add(e.createControllerModel(s)), this.camera.parent.add(i), this.camera.parent.add(s), this.controllers.push(i), this.controllerGrips.push(s);
    }
    this.setupControllerEvents();
  }
  setupControllerEvents() {
    this.controllers.forEach((e, t) => {
      e.addEventListener("connected", (i) => {
        const { handedness: s, targetRayMode: o, profiles: n } = i.data, a = Array.isArray(n) && n.some((r) => r && r.toLowerCase().includes("hand"));
        o !== "tracked-pointer" || a || (s === "left" ? (this.controller1 = e, this.controllerGrip1 = this.controllerGrips[t]) : s === "right" && (this.controller2 = e, this.controllerGrip2 = this.controllerGrips[t]), e.userData.handedness = s, e.userData.initialised = !0);
      }), e.addEventListener("disconnected", () => {
      }), e.addEventListener("selectstart", (i) => {
        e.userData && e.userData.initialised && this.onControllerSelectStart(e, i);
      }), e.addEventListener("selectend", (i) => {
        e.userData && e.userData.initialised && this.onControllerSelectEnd(e, i);
      }), e.addEventListener("squeezestart", (i) => {
        e.userData && e.userData.initialised && this.onControllerSqueezeStart(e, i);
      }), e.addEventListener("squeezeend", (i) => {
        e.userData && e.userData.initialised && this.onControllerSqueezeEnd(e, i);
      });
    });
  }
  // Controller input handlers for Chrome WebXR compatibility
  onControllerSelectStart(e, t) {
    const i = e.userData.handedness;
    this.onSelectStart && this.onSelectStart(i, e, t);
  }
  onControllerSelectEnd(e, t) {
    const i = e.userData.handedness;
    this.onSelectEnd && this.onSelectEnd(i, e, t);
  }
  onControllerSqueezeStart(e, t) {
    const i = e.userData.handedness;
    this.onSqueezeStart && this.onSqueezeStart(i, e, t);
  }
  onControllerSqueezeEnd(e, t) {
    const i = e.userData.handedness;
    this.onSqueezeEnd && this.onSqueezeEnd(i, e, t);
  }
  checkControllerButtons() {
    const e = this.renderer.xr.getSession();
    if (e) {
      for (let t of e.inputSources)
        if (t.gamepad && t.handedness) {
          const i = t.gamepad, s = t.handedness, o = `debug-${s}`;
          this.buttonStates.get(o) || this.buttonStates.set(o, !0);
          let n = [];
          s === "left" ? n = [4, 5] : s === "right" && (n = [4, 5]), n.forEach((a) => {
            if (i.buttons[a]) {
              const r = i.buttons[a], A = `${s}-${a}`, c = this.buttonStates.get(A) || !1, h = r.pressed;
              h && !c && this.onModeToggle && this.onModeToggle(), this.buttonStates.set(A, h);
            }
          });
        }
    }
  }
  getControllerInput() {
    const e = this.renderer.xr.getSession();
    if (!e) return { movement: null, teleport: null };
    let t = null, i = null;
    for (let s of e.inputSources)
      if (s.gamepad && s.handedness) {
        const o = s.gamepad, n = s.handedness;
        if (o.axes.length >= 4) {
          const a = o.axes[2] || 0, r = o.axes[3] || 0, A = o.axes[0] || 0, c = o.axes[1] || 0, h = Math.abs(a) > this.inputDeadzone ? a : 0, d = Math.abs(r) > this.inputDeadzone ? r : 0, g = Math.abs(A) > this.inputDeadzone ? A : 0, p = Math.abs(c) > this.inputDeadzone ? c : 0;
          n === "left" ? (h !== 0 || d !== 0) && (t = {
            x: h,
            y: d,
            handedness: "left"
          }) : n === "right" && (g !== 0 || p !== 0) && (i = {
            x: g,
            y: p,
            handedness: "right"
          });
        }
      }
    return { movement: t, teleport: i };
  }
  getControllers() {
    return {
      controller1: this.controller1,
      controller2: this.controller2,
      controllerGrip1: this.controllerGrip1,
      controllerGrip2: this.controllerGrip2,
      controllers: this.controllers,
      controllerGrips: this.controllerGrips
    };
  }
  dispose() {
    this.controllers.forEach((e) => {
      e.parent && e.parent.remove(e);
    }), this.controllerGrips.forEach((e) => {
      e.parent && e.parent.remove(e);
    }), this.controller1 = null, this.controller2 = null, this.controllerGrip1 = null, this.controllerGrip2 = null, this.controllers = [], this.controllerGrips = [], this.buttonStates.clear();
  }
}
class En {
  constructor(e, t) {
    this.scene = e, this.camera = t, this.teleportController = null, this.teleportMarker = null, this.teleportCurve = null, this.teleportFloor = null, this.validTeleportPosition = null, this.teleportThreshold = 0.7, this.teleportReleaseThreshold = 0.3, this.teleportPressed = !1, this.teleportMaxMagnitude = 0, this.teleportFloorHeight = null, this.teleportFloorMin = -10, this.teleportFloorMax = 10, this.lastSnapTurnTime = 0, this.onTeleport = null, this.onTeleportStart = null, this.onTeleportEnd = null;
  }
  init() {
    this.setupTeleportation();
  }
  // Initialize smooth teleportation system with arc
  setupTeleportation() {
    this.createTeleportArc();
  }
  // Create the smooth white teleport arc
  createTeleportArc() {
    const e = [
      new u.Vector3(0, 0, 0),
      new u.Vector3(0, 1, -5)
    ], t = new u.CatmullRomCurve3(e), i = new u.TubeGeometry(t, 20, 0.03, 8, !1), s = new u.MeshBasicMaterial({
      color: 16777215,
      transparent: !0,
      opacity: 0.8,
      side: u.DoubleSide
    });
    if (this.teleportCurve = new u.Mesh(i, s), this.teleportCurve.visible = !1, this.scene.add(this.teleportCurve), !this.teleportMarker) {
      const o = new u.RingGeometry(0.4, 0.6, 20), n = new u.MeshBasicMaterial({
        color: 16777215,
        transparent: !0,
        opacity: 0.9,
        side: u.DoubleSide
      });
      this.teleportMarker = new u.Mesh(o, n), this.teleportMarker.rotation.x = -Math.PI / 2, this.teleportMarker.visible = !1, this.scene.add(this.teleportMarker);
      const a = new u.RingGeometry(0.3, 0.7, 20), r = new u.MeshBasicMaterial({
        color: 16777215,
        transparent: !0,
        opacity: 0.3,
        side: u.DoubleSide
      }), A = new u.Mesh(a, r);
      A.rotation.x = -Math.PI / 2, this.teleportMarker.add(A);
    }
    if (!this.teleportFloor) {
      const o = new u.PlaneGeometry(100, 100), n = new u.MeshBasicMaterial({
        color: 65280,
        transparent: !0,
        opacity: 0.1,
        // Very subtle when visible
        side: u.DoubleSide,
        visible: !1
        // Invisible by default
      });
      this.teleportFloor = new u.Mesh(o, n), this.teleportFloor.rotation.x = -Math.PI / 2, this.teleportFloor.visible = !1, this.scene.add(this.teleportFloor);
    }
  }
  // Execute the teleport to the calculated position
  executeTeleport() {
    if (!this.validTeleportPosition) return;
    const e = this.validTeleportPosition.clone();
    this.camera.parent.position.copy(e), this.onTeleport && this.onTeleport(e), this.validTeleportPosition = null;
  }
  // Smooth dash movement (comfort alternative to instant teleport)
  dashToPosition(e) {
    const t = this.camera.parent.position.clone(), i = t.distanceTo(e), s = Math.min(i * 0.2, 1);
    let o = 0;
    const n = () => {
      o += 1 / 60;
      const a = Math.min(o / s, 1), r = 1 - Math.pow(1 - a, 3);
      this.camera.parent.position.lerpVectors(t, e, r), a < 1 && requestAnimationFrame(n);
    };
    n();
  }
  // Snap turning implementation (comfort feature)
  processSnapTurn(e, t = 30) {
    this.lastSnapTurnTime || (this.lastSnapTurnTime = 0);
    const i = Date.now();
    if (!(i - this.lastSnapTurnTime < 500) && Math.abs(e) > 0.7) {
      const s = t * Math.PI / 180, o = e > 0 ? 1 : -1;
      this.camera.parent.rotation.y -= o * s, this.camera.parent.rotation.y = this.normalizeAngle(this.camera.parent.rotation.y), this.lastSnapTurnTime = i;
    }
  }
  // Normalize angle to [-PI, PI]
  normalizeAngle(e) {
    for (; e > Math.PI; ) e -= 2 * Math.PI;
    for (; e < -Math.PI; ) e += 2 * Math.PI;
    return e;
  }
  // Lightweight teleportation processing
  processTeleportation(e, t, i) {
    const s = Math.sqrt(t * t + i * i), o = e && e.inputSource && e.inputSource.handedness === "right", n = i;
    if (s > this.teleportThreshold && !this.teleportPressed)
      this.teleportPressed = !0, this.teleportMaxMagnitude = s, this.teleportController = e, this.teleportFloorHeight = this.camera.parent.position.y, this.showTeleportArc(), this.onTeleportStart && this.onTeleportStart();
    else if (this.teleportPressed) {
      if (this.teleportMaxMagnitude = Math.max(this.teleportMaxMagnitude, s), o && Math.abs(n) > 0.1) {
        const a = 0.06666666666666667;
        this.teleportFloorHeight += n * a, this.teleportFloorHeight = Math.max(this.teleportFloorMin, Math.min(this.teleportFloorMax, this.teleportFloorHeight)), this.updateTeleportFloor();
      }
      this.updateTeleportArc(), s < this.teleportReleaseThreshold && (this.calculateAndExecuteTeleport(), this.hideTeleportArc(), this.teleportPressed = !1, this.teleportMaxMagnitude = 0, this.teleportController = null, this.onTeleportEnd && this.onTeleportEnd());
    }
  }
  // Show the smooth white teleport arc
  showTeleportArc() {
    this.teleportCurve || this.createTeleportArc(), this.teleportCurve.visible = !0, this.teleportMarker && (this.teleportMarker.visible = !0, this.teleportMarker.children && this.teleportMarker.children.length > 0 && this.teleportMarker.children.forEach((e) => e.visible = !0)), this.updateTeleportFloor();
  }
  // Hide the teleport arc
  hideTeleportArc() {
    this.teleportCurve && (this.teleportCurve.visible = !1), this.teleportMarker && (this.teleportMarker.visible = !1, this.teleportMarker.children && this.teleportMarker.children.length > 0 && this.teleportMarker.children.forEach((e) => e.visible = !1)), this.teleportFloor && (this.teleportFloor.visible = !1);
  }
  // Update arc in real-time while aiming (natural physics arc with floor intersection)
  updateTeleportArc() {
    if (!this.teleportController || !this.teleportCurve) return;
    const e = new u.Vector3();
    this.teleportController.getWorldPosition(e);
    const t = new u.Quaternion();
    this.teleportController.getWorldQuaternion(t);
    const i = new u.Vector3(0, 0, -1);
    i.applyQuaternion(t);
    const s = 3, o = 30, n = Math.min(this.teleportMaxMagnitude / this.teleportThreshold, 1), a = o - s, r = Math.pow(n, 0.7), A = s + a * r, c = [], h = 40, d = -9.8;
    let g = Math.sqrt(A * Math.abs(d) / 2);
    if (i.y > 0.3 ? g *= 1 - i.y * 0.5 : i.y < -0.5 && (g *= 1 + Math.abs(i.y) * 0.3), Math.sqrt(i.x * i.x + i.z * i.z) > 0.1) {
      const Q = Math.min(1, A / (g * 2));
      g *= Q;
    }
    const C = i.x * g, E = Math.max(i.y * g, g * 0.3), m = i.z * g, f = E / Math.abs(d), I = Math.max(f * 2.2, 1.5), b = this.teleportFloorHeight;
    let B = null, y = !1, w = e.y, k = 0, R = 8;
    for (let Q = 0; Q <= h; Q++) {
      const x = Q / h * I, M = new u.Vector3(
        e.x + C * x,
        e.y + E * x + 0.5 * d * x * x,
        e.z + m * x
      );
      Math.abs(M.y - e.y) > R && (M.y = e.y + Math.sign(M.y - e.y) * R), !y && M.y < w && (y = !0, k = x), c.push(M);
      const J = y ? x - k : 0, W = y && J > 0.1;
      if (!B && W && M.y <= b) {
        if (Q > 0) {
          const q = c[Q - 1], L = (b - q.y) / (M.y - q.y);
          B = new u.Vector3().lerpVectors(q, M, L), B.y = b;
        } else
          B = M.clone(), B.y = b;
        c[Q] = B, c.length = Q + 1;
        break;
      }
      if (w = M.y, Math.sqrt(
        Math.pow(M.x - e.x, 2) + Math.pow(M.z - e.z, 2)
      ) > o) {
        W && (B = new u.Vector3(M.x, b, M.z), c[Q] = B, c.length = Q + 1);
        break;
      }
    }
    if (!B && c.length > 0) {
      let Q = c[0], x = 0;
      for (let M = 1; M < c.length; M++)
        c[M].y < Q.y && (Q = c[M], x = M);
      x > c.length / 3 && (B = new u.Vector3(Q.x, b, Q.z), c.length = x + 1, c[x] = B);
    }
    if (c.length > 1) {
      const Q = new u.CatmullRomCurve3(c), x = new u.TubeGeometry(Q, 20, 0.03, 6, !1);
      this.teleportCurve.geometry && this.teleportCurve.geometry.dispose(), this.teleportCurve.geometry = x;
    }
    this.teleportMarker && B && (this.teleportMarker.position.copy(B), this.teleportMarker.visible = !0, this.teleportFloorHeight < -0.5 ? this.teleportMarker.material.color.setHex(8965375) : this.teleportFloorHeight > 0.5 ? this.teleportMarker.material.color.setHex(16777096) : this.teleportMarker.material.color.setHex(16777215));
  }
  // Update virtual floor position and make it slightly visible during adjustment
  updateTeleportFloor() {
    this.teleportFloor && this.teleportFloorHeight !== null && (this.teleportFloor.position.y = this.teleportFloorHeight, this.teleportFloor.visible = !0, this.teleportFloor.material.visible = !0, this.teleportFloor.material.opacity = 0.15, this.teleportFloorHeight < -0.5 ? this.teleportFloor.material.color.setHex(4491519) : this.teleportFloorHeight > 0.5 ? this.teleportFloor.material.color.setHex(16777028) : this.teleportFloor.material.color.setHex(4521864), this.updateTeleportArc());
  }
  // Update teleport marker height when adjusting with right joystick
  updateTeleportArcHeight() {
    this.updateTeleportFloor();
  }
  // Calculate teleport arc and landing (only lands on downward arc intersection)
  calculateAndExecuteTeleport() {
    if (!(!this.teleportController || this.teleportMaxMagnitude < this.teleportThreshold) && this.teleportMarker && this.teleportMarker.visible) {
      const e = this.teleportMarker.position.clone(), t = this.camera.parent.position, i = Math.sqrt(
        Math.pow(e.x - t.x, 2) + Math.pow(e.z - t.z, 2)
      );
      if (i >= 3 && i <= 30) {
        const s = new u.Vector3(e.x, this.teleportFloorHeight, e.z);
        this.validTeleportPosition = s, this.executeTeleport(), this.teleportFloorHeight = null;
      }
    }
  }
  // Floor height adjustment methods
  adjustFloorHeight(e) {
    this.teleportFloorHeight = Math.max(
      this.teleportFloorMin,
      Math.min(this.teleportFloorMax, this.teleportFloorHeight + e)
    ), this.updateTeleportFloor();
  }
  setFloorHeight(e) {
    this.teleportFloorHeight = Math.max(
      this.teleportFloorMin,
      Math.min(this.teleportFloorMax, e)
    ), this.updateTeleportFloor();
  }
  resetTeleportState() {
    this.teleportPressed = !1, this.teleportMaxMagnitude = 0, this.teleportController = null, this.validTeleportPosition = null, this.hideTeleportArc();
  }
  dispose() {
    this.teleportCurve && (this.teleportCurve.geometry && this.teleportCurve.geometry.dispose(), this.teleportCurve.material && this.teleportCurve.material.dispose(), this.scene.remove(this.teleportCurve)), this.teleportMarker && (this.teleportMarker.geometry && this.teleportMarker.geometry.dispose(), this.teleportMarker.material && this.teleportMarker.material.dispose(), this.scene.remove(this.teleportMarker)), this.teleportFloor && (this.teleportFloor.geometry && this.teleportFloor.geometry.dispose(), this.teleportFloor.material && this.teleportFloor.material.dispose(), this.scene.remove(this.teleportFloor)), this.resetTeleportState();
  }
  // Reset snap turn state - useful for mid-session mode changes
  resetSnapTurnState() {
    this.lastSnapTurnTime = 0;
  }
}
class In {
  constructor(e, t) {
    this.camera = e, this.renderer = t, this.MOVE_SPEED = 2, this.TURN_SPEED = 1.5, this.FLY_SPEED = 1, this.currentSpeed = 0, this.targetSpeed = 0, this.currentBoostLevel = 0, this.targetBoostLevel = 0, this.SPEED_RAMP_RATE = 3, this.BOOST_RAMP_RATE = 6, this.handMoveActive = !1, this.handMoveBoost = !1, this.handMoveDirection = new u.Vector3(), this.isMoving = !1, this.inputDeadzone = 0.15, this.turnSmoothingFactor = 0.1, this.lastTurnInput = 0, this.comfortSettings = {
      locomotionMode: "smooth",
      // 'smooth', 'teleport'
      turningMode: "smooth",
      // 'smooth', 'snap'
      snapTurnAngle: 30,
      // degrees per snap
      reducedMotion: !1,
      // slower, gentler movements
      showTeleportArc: !0,
      // visual feedback for teleportation
      comfortSpeed: 0.5
      // speed multiplier when reduced motion is on
    }, this.onMovementStart = null, this.onMovementStop = null, this.onMovementUpdate = null, this.teleportSystem = null;
  }
  init() {
    this.setupLocomotion();
  }
  // Movement control methods
  startMovement(e = "forward") {
    this.isMoving = !0, this.targetSpeed = this.MOVE_SPEED, this.onMovementStart && this.onMovementStart();
  }
  stopMovement() {
    this.isMoving = !1, this.targetSpeed = 0, this.onMovementStop && this.onMovementStop();
  }
  setTeleportSystem(e) {
    this.teleportSystem = e;
  }
  updateMovement(e, t) {
    const i = this.renderer.xr.getSession();
    if (!i || i.visibilityState !== "visible")
      return;
    if (t.updateHandGestures && t.handsActive) {
      t.updateHandGestures();
      let h = null, d = new u.Vector3(), g = !1;
      for (const p of ["left", "right"])
        if (t.handStates[p].pinch) {
          h = p, d.copy(t.handStates[p].direction), g = t.handStates[p].fist;
          break;
        }
      if (h) {
        this.handMoveActive = !0, this.handMoveBoost = g, this.handMoveDirection.copy(d);
        const p = this.MOVE_SPEED * (g ? 3 : 1) * e;
        this.camera.parent.position.addScaledVector(d, p), this.isMoving = !0, this.onMovementStart && !this._wasMoving && this.onMovementStart(), this.onMovementUpdate && this.onMovementUpdate({
          isMoving: !0,
          currentSpeed: this.MOVE_SPEED,
          isBoosted: g,
          currentBoostLevel: g ? 1 : 0
        }), this._wasMoving = !0;
        return;
      } else
        this.handMoveActive && this.onMovementStop && this.onMovementStop(), this.handMoveActive = !1, this.isMoving = !1, this._wasMoving = !1;
    }
    if (!t.controller1 || !t.controller2)
      return;
    let s = !1, o = !1;
    for (let h = 0; h < i.inputSources.length; h++) {
      const d = i.inputSources[h];
      if (!d || !d.gamepad || !d.gamepad.buttons || !d.gamepad.axes || d.gamepad.axes.length < 4)
        continue;
      const g = d.gamepad, C = d.handedness === "left" ? t.controller1 : t.controller2;
      if (!C) continue;
      const E = g.axes[2] || 0, m = g.axes[3] || 0;
      if (d.handedness === "left") {
        const f = g.buttons[1], I = f && f.pressed ? 3 : 1, b = this.comfortSettings.reducedMotion ? this.comfortSettings.comfortSpeed : 1;
        if (f && f.pressed && (o = !0), this.comfortSettings.locomotionMode === "teleport" && this.teleportSystem) {
          this.teleportSystem.processTeleportation(C, E, m);
          continue;
        } else {
          const B = new u.Vector3();
          this.camera.getWorldDirection(B), B.y = 0, B.normalize();
          const y = new u.Vector3().crossVectors(B, this.camera.up).normalize();
          if (Math.abs(m) > 0.1) {
            const w = this.MOVE_SPEED * I * b * this.currentSpeed * e;
            this.camera.parent.position.addScaledVector(B, -m * w), s = !0;
          }
          if (Math.abs(E) > 0.1) {
            const w = this.MOVE_SPEED * I * b * this.currentSpeed * e;
            this.camera.parent.position.addScaledVector(y, E * w), s = !0;
          }
        }
      }
      if (d.handedness === "right") {
        const f = g.buttons[1], I = f && f.pressed ? 3 : 1, b = this.comfortSettings.reducedMotion ? this.comfortSettings.comfortSpeed : 1;
        if (f && f.pressed && Math.abs(m) > 0.1 && (o = !0), this.teleportSystem && this.teleportSystem.teleportPressed && this.teleportSystem.teleportCurve && this.teleportSystem.teleportCurve.visible) {
          if (Math.abs(m) > 0.1) {
            const B = 4 * e;
            this.teleportSystem.adjustFloorHeight(m * B);
          }
        } else {
          if (this.comfortSettings.turningMode === "snap" && this.teleportSystem)
            this.teleportSystem.processSnapTurn(E, this.comfortSettings.snapTurnAngle);
          else if (Math.abs(E) > this.inputDeadzone) {
            const B = this.lastTurnInput * this.turnSmoothingFactor + E * (1 - this.turnSmoothingFactor);
            if (this.lastTurnInput = B, Math.abs(B) > this.inputDeadzone) {
              const y = this.comfortSettings.reducedMotion ? this.TURN_SPEED * 0.5 : this.TURN_SPEED, w = B * y * Math.min(e, 1 / 30);
              this.camera.parent.rotation.y -= w, this.camera.parent.rotation.y = this.normalizeAngle(this.camera.parent.rotation.y);
            }
          } else
            this.lastTurnInput *= 0.9;
          if (Math.abs(m) > 0.1) {
            const B = this.FLY_SPEED * I * b * this.currentSpeed * e;
            this.camera.parent.position.y -= m * B, s = !0;
          }
        }
      }
    }
    const n = this.isMoving;
    this.isMoving = s;
    const r = (this.isMoving ? this.MOVE_SPEED : 0) - this.currentSpeed;
    this.currentSpeed += r * this.SPEED_RAMP_RATE * e, this.currentSpeed = Math.max(0, this.currentSpeed);
    const c = (o ? 1 : 0) - this.currentBoostLevel;
    this.currentBoostLevel += c * this.BOOST_RAMP_RATE * e, this.currentBoostLevel = Math.max(0, Math.min(1, this.currentBoostLevel)), !n && this.isMoving && this.onMovementStart && this.onMovementStart(), n && !this.isMoving && this.onMovementStop && this.onMovementStop(), this.onMovementUpdate && this.onMovementUpdate({
      isMoving: this.isMoving,
      currentSpeed: this.currentSpeed,
      isBoosted: o,
      currentBoostLevel: this.currentBoostLevel
    });
  }
  // Normalize angle to [-PI, PI]
  normalizeAngle(e) {
    for (; e > Math.PI; ) e -= 2 * Math.PI;
    for (; e < -Math.PI; ) e += 2 * Math.PI;
    return e;
  }
  // Correct drift (original pattern)
  correctDrift() {
    const e = this.camera.parent;
    e.rotation.y = this.normalizeAngle(e.rotation.y), e.position.x = Math.round(e.position.x * 1e3) / 1e3, e.position.y = Math.round(e.position.y * 1e3) / 1e3, e.position.z = Math.round(e.position.z * 1e3) / 1e3;
  }
  setComfortSettings(e) {
    const t = ["smooth", "teleport"], i = ["smooth", "snap"];
    if (e.locomotionMode && t.includes(e.locomotionMode)) {
      const s = this.comfortSettings.locomotionMode;
      this.comfortSettings.locomotionMode = e.locomotionMode, s !== e.locomotionMode && this.teleportSystem && this.teleportSystem.resetTeleportState();
    }
    if (e.turningMode && i.includes(e.turningMode)) {
      const s = this.comfortSettings.turningMode;
      this.comfortSettings.turningMode = e.turningMode, s !== e.turningMode && this.teleportSystem && this.teleportSystem.resetSnapTurnState();
    }
    typeof e.snapTurnAngle == "number" && e.snapTurnAngle > 0 && e.snapTurnAngle <= 90 && (this.comfortSettings.snapTurnAngle = e.snapTurnAngle), typeof e.reducedMotion == "boolean" && (this.comfortSettings.reducedMotion = e.reducedMotion), typeof e.showTeleportArc == "boolean" && (this.comfortSettings.showTeleportArc = e.showTeleportArc), typeof e.comfortSpeed == "number" && e.comfortSpeed > 0 && e.comfortSpeed <= 2 && (this.comfortSettings.comfortSpeed = e.comfortSpeed), this.ensureComfortSettingsApplied();
  }
  getComfortSettings() {
    return { ...this.comfortSettings };
  }
  setComfortPreset(e) {
    const t = {
      "max-comfort": {
        locomotionMode: "teleport",
        turningMode: "snap",
        snapTurnAngle: 30,
        reducedMotion: !0,
        showTeleportArc: !0,
        comfortSpeed: 0.3
      },
      balanced: {
        locomotionMode: "smooth",
        turningMode: "smooth",
        reducedMotion: !0,
        showTeleportArc: !0,
        comfortSpeed: 0.7
      },
      performance: {
        locomotionMode: "smooth",
        turningMode: "smooth",
        reducedMotion: !1,
        showTeleportArc: !1,
        comfortSpeed: 1
      }
    };
    t[e] ? this.setComfortSettings(t[e]) : console.warn(`Unknown comfort preset: ${e}`);
  }
  setupLocomotion() {
  }
  ensureComfortSettingsApplied() {
  }
  getMovementState() {
    return {
      isMoving: this.isMoving,
      currentSpeed: this.currentSpeed,
      targetSpeed: this.targetSpeed,
      currentBoostLevel: this.currentBoostLevel,
      targetBoostLevel: this.targetBoostLevel
    };
  }
}
class Bn {
  constructor() {
    this.settings = {
      locomotionMode: "smooth",
      // 'smooth', 'teleport'
      turningMode: "smooth",
      // 'smooth', 'snap'
      snapTurnAngle: 30,
      // degrees per snap
      reducedMotion: !1,
      // slower, gentler movements
      showTeleportArc: !0,
      // visual feedback for teleportation
      comfortSpeed: 0.5
      // speed multiplier when reduced motion is on
    }, this.presets = {
      "max-comfort": {
        locomotionMode: "teleport",
        turningMode: "snap",
        snapTurnAngle: 30,
        reducedMotion: !0,
        showTeleportArc: !0,
        comfortSpeed: 0.3
      },
      balanced: {
        locomotionMode: "smooth",
        turningMode: "smooth",
        reducedMotion: !0,
        showTeleportArc: !0,
        comfortSpeed: 0.7
      },
      performance: {
        locomotionMode: "smooth",
        turningMode: "smooth",
        reducedMotion: !1,
        showTeleportArc: !1,
        comfortSpeed: 1
      }
    }, this.onSettingsChange = null;
  }
  setSettings(e) {
    const t = ["smooth", "teleport"], i = ["smooth", "snap"];
    let s = !1;
    return e.locomotionMode && t.includes(e.locomotionMode) && this.settings.locomotionMode !== e.locomotionMode && (this.settings.locomotionMode = e.locomotionMode, s = !0), e.turningMode && i.includes(e.turningMode) && this.settings.turningMode !== e.turningMode && (this.settings.turningMode = e.turningMode, s = !0), typeof e.snapTurnAngle == "number" && e.snapTurnAngle > 0 && e.snapTurnAngle <= 90 && this.settings.snapTurnAngle !== e.snapTurnAngle && (this.settings.snapTurnAngle = e.snapTurnAngle, s = !0), typeof e.reducedMotion == "boolean" && this.settings.reducedMotion !== e.reducedMotion && (this.settings.reducedMotion = e.reducedMotion, s = !0), typeof e.showTeleportArc == "boolean" && this.settings.showTeleportArc !== e.showTeleportArc && (this.settings.showTeleportArc = e.showTeleportArc, s = !0), typeof e.comfortSpeed == "number" && e.comfortSpeed > 0 && e.comfortSpeed <= 2 && this.settings.comfortSpeed !== e.comfortSpeed && (this.settings.comfortSpeed = e.comfortSpeed, s = !0), s && this.onSettingsChange && this.onSettingsChange(this.settings), s;
  }
  getSettings() {
    return { ...this.settings };
  }
  setPreset(e) {
    return this.presets[e] ? (this.setSettings(this.presets[e]), !0) : (console.warn(`Unknown comfort preset: ${e}`), !1);
  }
  getPresets() {
    return Object.keys(this.presets);
  }
  getPreset(e) {
    return this.presets[e] ? { ...this.presets[e] } : null;
  }
  addCustomPreset(e, t) {
    const i = {};
    return t.locomotionMode && ["smooth", "teleport"].includes(t.locomotionMode) && (i.locomotionMode = t.locomotionMode), t.turningMode && ["smooth", "snap"].includes(t.turningMode) && (i.turningMode = t.turningMode), typeof t.snapTurnAngle == "number" && t.snapTurnAngle > 0 && t.snapTurnAngle <= 90 && (i.snapTurnAngle = t.snapTurnAngle), typeof t.reducedMotion == "boolean" && (i.reducedMotion = t.reducedMotion), typeof t.showTeleportArc == "boolean" && (i.showTeleportArc = t.showTeleportArc), typeof t.comfortSpeed == "number" && t.comfortSpeed > 0 && t.comfortSpeed <= 2 && (i.comfortSpeed = t.comfortSpeed), Object.keys(i).length > 0 ? (this.presets[e] = i, !0) : (console.warn("Invalid settings for custom preset"), !1);
  }
  toggleLocomotionMode() {
    const e = this.settings.locomotionMode === "smooth" ? "teleport" : "smooth";
    return this.setSettings({ locomotionMode: e });
  }
  toggleTurningMode() {
    const e = this.settings.turningMode === "smooth" ? "snap" : "smooth";
    return this.setSettings({ turningMode: e });
  }
  toggleReducedMotion() {
    return this.setSettings({ reducedMotion: !this.settings.reducedMotion });
  }
  getComfortLevel() {
    let e = 0;
    return this.settings.locomotionMode === "teleport" ? e += 40 : this.settings.locomotionMode === "smooth" && (e += 20), this.settings.turningMode === "snap" ? e += 30 : this.settings.turningMode === "smooth" && (e += 15), this.settings.reducedMotion && (e += 20), this.settings.comfortSpeed <= 0.5 ? e += 10 : this.settings.comfortSpeed <= 0.8 && (e += 5), Math.min(100, e);
  }
  getRecommendations() {
    const e = [];
    return this.settings.locomotionMode === "smooth" && e.push("Consider teleportation for maximum comfort"), this.settings.turningMode === "smooth" && e.push("Try snap turning to reduce motion sickness"), this.settings.reducedMotion || e.push("Enable reduced motion for gentler movement"), this.settings.comfortSpeed > 0.8 && e.push("Lower movement speed for increased comfort"), e;
  }
  exportSettings() {
    return JSON.stringify(this.settings, null, 2);
  }
  importSettings(e) {
    try {
      const t = JSON.parse(e);
      return this.setSettings(t);
    } catch (t) {
      return console.error("Failed to import settings:", t), !1;
    }
  }
}
class yn {
  constructor() {
    this.soundEnabled = !1, this.audioContext = null, this.dpvSound = null, this.dpvHighSound = null, this.ambienceSound = null, this.currentMovementSound = null, this.currentBoostSound = null, this.currentAmbienceSound = null, this.baseGainNode = null, this.boostGainNode = null, this.ambienceGainNode = null, this.baseVolumeMultiplier = 1.52, this.boostVolumeMultiplier = 1.01, this.ambienceVolume = 0.1;
  }
  // Initialize the VR sound system (optional feature) - EXACT ORIGINAL
  async init(e = "./sound/") {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const [t, i, s] = await Promise.all([
        this.loadAudioBuffer(e + "dpv.ogg"),
        this.loadAudioBuffer(e + "dpvhigh.ogg"),
        this.loadAudioBuffer(e + "vrambience.ogg")
      ]);
      this.dpvSound = t, this.dpvHighSound = i, this.ambienceSound = s, this.startAmbientSound(), this.soundEnabled = !0;
    } catch (t) {
      console.warn("🔇 VR Audio initialization failed:", t), this.soundEnabled = !1;
    }
  }
  // Load audio buffer from URL (original)
  async loadAudioBuffer(e) {
    const i = await (await fetch(e)).arrayBuffer();
    return await this.audioContext.decodeAudioData(i);
  }
  // Initialize audio on user interaction (required for web audio) (original)
  initAudioOnInteraction() {
    this.audioContext && this.audioContext.state === "suspended" && this.audioContext.resume();
  }
  // Start ambient sound when entering VR (original pattern)
  startAmbientSound() {
    if (!(!this.audioContext || !this.ambienceSound || this.currentAmbienceSound))
      try {
        const e = this.audioContext.createBufferSource();
        this.ambienceGainNode = this.audioContext.createGain(), e.buffer = this.ambienceSound, e.connect(this.ambienceGainNode), this.ambienceGainNode.connect(this.audioContext.destination), e.loop = !0, this.ambienceGainNode.gain.setValueAtTime(this.ambienceVolume, this.audioContext.currentTime), e.start(), this.currentAmbienceSound = e;
      } catch (e) {
        console.warn("🔇 Error starting ambient sound:", e);
      }
  }
  // Stop ambient sound when exiting VR (original pattern)
  stopAmbientSound() {
    if (this.currentAmbienceSound && this.ambienceGainNode && this.audioContext)
      try {
        this.currentAmbienceSound.stop(), this.currentAmbienceSound = null, this.ambienceGainNode = null;
      } catch (e) {
        console.warn("🔇 Error stopping ambient sound:", e);
      }
  }
  // Start movement sound with smooth audio setup (original pattern)
  startMovementSound() {
    if (!(!this.audioContext || !this.dpvSound || !this.dpvHighSound)) {
      this.currentMovementSound && (this.currentMovementSound.stop(), this.currentMovementSound = null), this.currentBoostSound && (this.currentBoostSound.stop(), this.currentBoostSound = null), this.baseGainNode && this.baseGainNode.disconnect(), this.boostGainNode && this.boostGainNode.disconnect();
      try {
        const e = this.audioContext.createBufferSource();
        this.baseGainNode = this.audioContext.createGain(), e.buffer = this.dpvSound, e.connect(this.baseGainNode), this.baseGainNode.connect(this.audioContext.destination), e.loop = !0, this.baseGainNode.gain.setValueAtTime(0, this.audioContext.currentTime), e.start(), this.currentMovementSound = e;
        const t = this.audioContext.createBufferSource();
        this.boostGainNode = this.audioContext.createGain(), t.buffer = this.dpvHighSound, t.connect(this.boostGainNode), this.boostGainNode.connect(this.audioContext.destination), t.loop = !0, this.boostGainNode.gain.setValueAtTime(0, this.audioContext.currentTime), t.start(), this.currentBoostSound = t;
      } catch (e) {
        console.warn("🔇 Error playing movement sound:", e);
      }
    }
  }
  // Stop movement sound with smooth fade (original pattern)
  stopMovementSound() {
    if (this.baseGainNode && this.audioContext)
      try {
        this.baseGainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.2), setTimeout(() => {
          this.currentMovementSound && (this.currentMovementSound.stop(), this.currentMovementSound = null);
        }, 250);
      } catch (e) {
        console.warn("🔇 Error stopping base movement sound:", e);
      }
    if (this.boostGainNode && this.audioContext)
      try {
        this.boostGainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.2), setTimeout(() => {
          this.currentBoostSound && (this.currentBoostSound.stop(), this.currentBoostSound = null), this.baseGainNode = null, this.boostGainNode = null;
        }, 250);
      } catch (e) {
        console.warn("🔇 Error stopping boost movement sound:", e);
      }
  }
  // Update audio volumes based on current speed and boost levels (original)
  updateAudioLevels(e, t) {
    if (!(!this.baseGainNode || !this.boostGainNode || !this.audioContext))
      try {
        const i = e * this.baseVolumeMultiplier, s = t * this.boostVolumeMultiplier;
        this.baseGainNode.gain.linearRampToValueAtTime(i, this.audioContext.currentTime + 0.1), this.boostGainNode.gain.linearRampToValueAtTime(s, this.audioContext.currentTime + 0.1);
      } catch (i) {
        console.warn("🔇 Error updating audio levels:", i);
      }
  }
  // Set audio volume multipliers
  setVolumeMultipliers(e, t, i) {
    typeof e == "number" && e >= 0 && (this.baseVolumeMultiplier = e), typeof t == "number" && t >= 0 && (this.boostVolumeMultiplier = t), typeof i == "number" && i >= 0 && (this.ambienceVolume = i, this.ambienceGainNode && this.ambienceGainNode.gain.setValueAtTime(i, this.audioContext.currentTime));
  }
  // Get current audio status
  getAudioStatus() {
    return {
      enabled: this.soundEnabled,
      contextState: this.audioContext ? this.audioContext.state : "none",
      ambiencePlaying: !!this.currentAmbienceSound,
      movementPlaying: !!this.currentMovementSound,
      boostPlaying: !!this.currentBoostSound
    };
  }
  // Mute/unmute audio
  setMuted(e) {
    if (this.audioContext)
      try {
        const t = e ? 0 : 1;
        this.ambienceGainNode && this.ambienceGainNode.gain.linearRampToValueAtTime(
          e ? 0 : this.ambienceVolume,
          this.audioContext.currentTime + 0.1
        ), this.baseGainNode && this.baseGainNode.gain.linearRampToValueAtTime(
          t,
          this.audioContext.currentTime + 0.1
        ), this.boostGainNode && this.boostGainNode.gain.linearRampToValueAtTime(
          t,
          this.audioContext.currentTime + 0.1
        );
      } catch (t) {
        console.warn("🔇 Error setting mute state:", t);
      }
  }
  // Dispose of sound system (original pattern)
  dispose() {
    if (this.stopAmbientSound(), this.stopMovementSound(), this.audioContext)
      try {
        this.audioContext.close(), this.audioContext = null;
      } catch (e) {
        console.warn("🔇 Audio context disposal failed:", e);
      }
    this.dpvSound = null, this.dpvHighSound = null, this.ambienceSound = null, this.currentMovementSound = null, this.currentBoostSound = null, this.currentAmbienceSound = null, this.baseGainNode = null, this.boostGainNode = null, this.ambienceGainNode = null, this.soundEnabled = !1;
  }
}
class wn {
  /**
   * Creates a new VRManager instance
   * 
   * @param {THREE.WebGLRenderer} renderer - Three.js WebGL renderer with XR enabled
   * @param {THREE.PerspectiveCamera} camera - Three.js camera for VR dolly system
   * @param {THREE.Scene} scene - Three.js scene for VR objects
   * @param {string} [audioPath='./sound/'] - Path to VR audio files
   * @param {boolean} [enableAudio=true] - Enable VR audio system
   */
  constructor(e, t, i, s = "./sound/", o = !0, n = null) {
    this.renderer = e, this.camera = t, this.scene = i, this.audioPath = s, this.enableAudio = o, this.container = n, this.vrCore = new an(e, t, i, n), this.vrControllers = new Cn(e, t), this.vrTeleport = new En(i, t), this.vrLocomotion = new In(t, e), this.vrComfort = new Bn(), this.vrAudio = this.enableAudio ? new yn() : null, this.isVRSupported = !1, this.isVRPresenting = !1, this.controller1 = null, this.controller2 = null, this.controllerGrip1 = null, this.controllerGrip2 = null, this.controllers = [], this.controllerGrips = [], this._preVRCameraState = {
      target: null,
      position: null,
      zoom: null,
      minDistance: null,
      maxDistance: null,
      enableDamping: null,
      dampingFactor: null,
      enableZoom: null,
      enablePan: null,
      enableRotate: null,
      autoRotate: null,
      autoRotateSpeed: null,
      controls: null
      // Reference to controls object
    }, this.lastComfortLog = 0, this.onModeToggle = null, this.onMovementStart = null, this.onMovementStop = null, this.onMovementUpdate = null, this.init();
  }
  init() {
    this.vrCore.init(), this.vrControllers.init(), this.vrTeleport.init(), this.vrLocomotion.init(), this.setupModuleConnections(), this.vrAudio && this.vrAudio.init(this.audioPath).catch((e) => {
      console.warn("🔇 Sound system initialization failed:", e);
    });
  }
  setupModuleConnections() {
    this.vrCore.onSessionStart = () => {
      console.debug("[VRManager] VR session starting - saving camera state"), this._saveCameraState(), this.isVRPresenting = !0, this.vrAudio && this.vrAudio.initAudioOnInteraction();
    }, this.vrCore.onSessionEnd = () => {
      console.debug("[VRManager] VR session ending - will restore camera state"), this.isVRPresenting = !1, setTimeout(() => {
        this._restoreCameraState();
      }, 100);
    }, this.vrControllers.onSelectStart = (e, t, i) => {
    }, this.vrControllers.onSelectEnd = (e, t, i) => {
    }, this.vrControllers.onSqueezeStart = (e, t, i) => {
      this.vrLocomotion.currentBoostLevel = 1, this.vrLocomotion.targetBoostLevel = 1;
    }, this.vrControllers.onSqueezeEnd = (e, t, i) => {
      this.vrLocomotion.currentBoostLevel = 0, this.vrLocomotion.targetBoostLevel = 0;
    }, this.vrControllers.onModeToggle = () => {
      this.onModeToggle && this.onModeToggle();
    }, this.vrLocomotion.onMovementStart = () => {
      this.vrAudio && this.vrAudio.startMovementSound(), this.onMovementStart && this.onMovementStart();
    }, this.vrLocomotion.onMovementStop = () => {
      this.vrAudio && this.vrAudio.stopMovementSound(), this.onMovementStop && this.onMovementStop();
    }, this.vrLocomotion.onMovementUpdate = (e) => {
      this.vrAudio && this.vrAudio.updateAudioLevels(e.currentSpeed, e.currentBoostLevel), this.onMovementUpdate && this.onMovementUpdate(e);
    }, this.vrComfort.onSettingsChange = (e) => {
      this.vrLocomotion.setComfortSettings(e);
    }, this.vrLocomotion.setTeleportSystem(this.vrTeleport), typeof this._comfortSettingsInitialized > "u" && (this.vrLocomotion.setComfortSettings(this.vrComfort.getSettings()), this._comfortSettingsInitialized = !0);
  }
  // Movement control methods (maintain original API)
  startMovement(e = "forward") {
    this.vrLocomotion.startMovement(e);
  }
  stopMovement() {
    this.vrLocomotion.stopMovement();
  }
  // Main update loop (original pattern)
  update(e) {
    this.vrControllers.checkControllerButtons();
    const t = {
      ...this.vrControllers.getControllers(),
      handsActive: this.vrControllers.handsActive,
      handStates: this.vrControllers.handStates,
      updateHandGestures: this.vrControllers.updateHandGestures ? this.vrControllers.updateHandGestures.bind(this.vrControllers) : void 0
    };
    this.vrLocomotion.updateMovement(e, t), this.syncLegacyProperties(), this.ensureComfortSettingsApplied(), this.vrLocomotion.correctDrift();
  }
  // Sync properties for legacy compatibility
  syncLegacyProperties() {
    const e = this.vrCore.getVRStatus();
    this.isVRSupported = e.supported, this.isVRPresenting = e.presenting;
    const t = this.vrControllers.getControllers();
    this.controller1 = t.controller1, this.controller2 = t.controller2, this.controllerGrip1 = t.controllerGrip1, this.controllerGrip2 = t.controllerGrip2, this.controllers = t.controllers, this.controllerGrips = t.controllerGrips;
  }
  // Comfort settings methods (maintain original API)
  /**
   * Set VR comfort settings for motion sickness reduction
   * 
   * @method setComfortSettings
   * @param {Object} settings - Comfort configuration object
   * @param {boolean} [settings.enableComfort] - Enable comfort features
   * @param {number} [settings.comfortRadius] - Radius of comfort zone
   * @param {number} [settings.fadeDistance] - Distance for fade effect
   * @param {number} [settings.maxSpeed] - Maximum movement speed
   * @returns {void}
   * 
   * @example
   * // Configure comfort settings
   * vrManager.setComfortSettings({
   *   enableComfort: true,
   *   comfortRadius: 0.4,
   *   fadeDistance: 0.15,
   *   maxSpeed: 2.0
   * });
   * 
   * @since 1.0.0
   */
  setComfortSettings(e) {
    this.vrComfort.setSettings(e);
  }
  /**
   * Get current VR comfort settings
   * 
   * @method getComfortSettings
   * @returns {Object} Current comfort settings object
   * 
   * @example
   * // Check current settings
   * const settings = vrManager.getComfortSettings();
   * console.log('Comfort enabled:', settings.enableComfort);
   * 
   * @since 1.0.0
   */
  getComfortSettings() {
    return this.vrComfort.getSettings();
  }
  /**
   * Apply a predefined comfort preset
   * 
   * @method setComfortPreset
   * @param {string} preset - Preset name ('conservative', 'moderate', 'advanced')
   * @returns {void}
   * 
   * @example
   * // Use conservative comfort settings for sensitive users
   * vrManager.setComfortPreset('conservative');
   * 
   * @since 1.0.0
   */
  setComfortPreset(e) {
    this.vrComfort.setPreset(e);
  }
  // Ensure comfort settings are properly applied during VR session
  ensureComfortSettingsApplied() {
    if (!this.isVRPresenting) return;
    this.vrComfort.getSettings().locomotionMode === "teleport" && (!this.vrTeleport.teleportCurve || !this.vrTeleport.teleportMarker) && this.vrTeleport.setupTeleportation(), (!this.lastComfortLog || Date.now() - this.lastComfortLog > 1e4) && (this.lastComfortLog = Date.now());
  }
  // Apply VR positions (maintain original API)
  applyVRPositions(e) {
    if (!(!this.isVRPresenting || !e))
      try {
        e.camera && (this.camera.position.copy(e.camera.position), this.camera.quaternion.copy(e.camera.quaternion)), e.dolly && (this.camera.parent.position.copy(e.dolly.position), this.camera.parent.quaternion.copy(e.dolly.quaternion));
      } catch (t) {
        console.warn("VR position application failed:", t);
      }
  }
  /**
   * Set the orbit controls reference for camera state preservation
   * @param {Object} controls - OrbitControls instance
   */
  setControls(e) {
    this._preVRCameraState.controls = e;
  }
  /**
   * Save current camera state before entering VR
   */
  _saveCameraState() {
    if (this._preVRCameraState.controls && this._preVRCameraState.controls.target && this.camera) {
      const e = this._preVRCameraState.controls;
      this._preVRCameraState.target = e.target.clone(), this._preVRCameraState.position = this.camera.position.clone(), this._preVRCameraState.zoom = this.camera.zoom, this._preVRCameraState.minDistance = e.minDistance, this._preVRCameraState.maxDistance = e.maxDistance, this._preVRCameraState.enableDamping = e.enableDamping, this._preVRCameraState.dampingFactor = e.dampingFactor, this._preVRCameraState.enableZoom = e.enableZoom, this._preVRCameraState.enablePan = e.enablePan, this._preVRCameraState.enableRotate = e.enableRotate, this._preVRCameraState.autoRotate = e.autoRotate, this._preVRCameraState.autoRotateSpeed = e.autoRotateSpeed, console.debug("[VRManager] Saved complete pre-VR camera state:", {
        target: this._preVRCameraState.target.toArray(),
        position: this._preVRCameraState.position.toArray(),
        zoom: this._preVRCameraState.zoom,
        minDistance: this._preVRCameraState.minDistance,
        maxDistance: this._preVRCameraState.maxDistance,
        enableDamping: this._preVRCameraState.enableDamping
      });
    }
  }
  /**
   * Restore camera state after exiting VR
   */
  _restoreCameraState() {
    if (!this._preVRCameraState.controls || !this._preVRCameraState.target || !this._preVRCameraState.position) {
      console.debug("[VRManager] No saved camera state to restore");
      return;
    }
    const e = this._preVRCameraState.controls;
    console.debug("[VRManager] Restoring complete camera state from pre-VR:", {
      target: this._preVRCameraState.target.toArray(),
      position: this._preVRCameraState.position.toArray(),
      zoom: this._preVRCameraState.zoom
    }), this.camera.position.copy(this._preVRCameraState.position), this.camera.zoom = this._preVRCameraState.zoom || 1, this.camera.updateProjectionMatrix(), e.target.copy(this._preVRCameraState.target), e.minDistance = this._preVRCameraState.minDistance, e.maxDistance = this._preVRCameraState.maxDistance, e.enableDamping = this._preVRCameraState.enableDamping, e.dampingFactor = this._preVRCameraState.dampingFactor, e.enableZoom = this._preVRCameraState.enableZoom, e.enablePan = this._preVRCameraState.enablePan, e.enableRotate = this._preVRCameraState.enableRotate, e.autoRotate = this._preVRCameraState.autoRotate, e.autoRotateSpeed = this._preVRCameraState.autoRotateSpeed, e.update(), console.debug("[VRManager] Camera state restoration complete");
  }
  // Get VR system status
  getVRStatus() {
    const e = this.vrCore.getVRStatus(), t = this.vrAudio ? this.vrAudio.getAudioStatus() : { enabled: !1 }, i = this.vrLocomotion.getMovementState(), s = this.vrComfort.getSettings();
    return {
      ...e,
      audio: t,
      movement: i,
      comfort: s
    };
  }
  // Audio control methods
  setAudioMuted(e) {
    this.vrAudio && this.vrAudio.setMuted(e);
  }
  setAudioVolumeMultipliers(e, t, i) {
    this.vrAudio && this.vrAudio.setVolumeMultipliers(e, t, i);
  }
  // Teleportation methods
  resetTeleportState() {
    this.vrTeleport.resetTeleportState();
  }
  // Dispose of all VR systems
  /**
   * Clean up and dispose of all VR resources
   * 
   * Properly disposes of all VR modules, controllers, audio systems, and
   * clears event callbacks. Call this when done with VR functionality.
   * 
   * @method dispose
   * @returns {void}
   * 
   * @example
   * // Clean up VR system
   * vrManager.dispose();
   * 
   * @since 1.0.0
   */
  dispose() {
    this.vrCore.dispose(), this.vrControllers.dispose(), this.vrTeleport.dispose(), this.vrAudio && this.vrAudio.dispose(), this.onModeToggle = null, this.onMovementStart = null, this.onMovementStop = null, this.onMovementUpdate = null;
  }
  // Legacy method compatibility
  checkVRSupport() {
    return this.vrCore.checkVRSupported();
  }
  normalizeAngle(e) {
    return this.vrLocomotion.normalizeAngle(e);
  }
}
class Xt {
  /**
   * Initialize debug commands with a BelowViewer instance
   * 
   * @param {BelowViewer} viewer - The BelowViewer instance to debug
   */
  static init(e) {
    typeof window > "u" || (window.belowViewer = e, window.camera = () => {
      var n, a;
      if (!((n = e.cameraManager) != null && n.camera) || !((a = e.cameraManager) != null && a.controls))
        return console.warn("Camera not initialized"), null;
      const t = e.cameraManager.camera.position, i = e.cameraManager.controls.target, s = e.dolly ? {
        dolly: {
          x: parseFloat(e.dolly.position.x.toFixed(3)),
          y: parseFloat(e.dolly.position.y.toFixed(3)),
          z: parseFloat(e.dolly.position.z.toFixed(3))
        },
        rotation: {
          x: parseFloat(e.dolly.rotation.x.toFixed(3)),
          y: parseFloat(e.dolly.rotation.y.toFixed(3)),
          z: parseFloat(e.dolly.rotation.z.toFixed(3))
        }
      } : {
        dolly: { x: 0, y: 2, z: 15 },
        rotation: { x: 0, y: 0, z: 0 }
      }, o = {
        desktop: {
          camera: {
            x: parseFloat(t.x.toFixed(3)),
            y: parseFloat(t.y.toFixed(3)),
            z: parseFloat(t.z.toFixed(3))
          },
          target: {
            x: parseFloat(i.x.toFixed(3)),
            y: parseFloat(i.y.toFixed(3)),
            z: parseFloat(i.z.toFixed(3))
          }
        },
        vr: s
      };
      return console.log("🎥 Current camera positions:"), console.log("📋 Copy this for initialPositions config:"), console.log(JSON.stringify(o, null, 2)), o;
    }, window.scene = () => {
      var s;
      if (!((s = e.sceneManager) != null && s.scene))
        return console.warn("Scene not initialized"), null;
      const t = e.sceneManager.scene, i = {
        children: t.children.length,
        lights: t.children.filter((o) => o.isLight).length,
        meshes: t.children.filter((o) => o.isMesh).length,
        groups: t.children.filter((o) => o.isGroup).length,
        background: t.background,
        fog: t.fog ? {
          type: t.fog.constructor.name,
          color: t.fog.color.getHexString(),
          near: t.fog.near,
          far: t.fog.far
        } : null
      };
      return console.log("🌍 Scene information:"), console.table(i), console.log("Scene object:", t), { info: i, scene: t };
    }, window.models = () => {
      const t = e.getLoadedModels();
      if (t.length === 0)
        return console.log("📦 No models loaded"), [];
      const i = t.map((s, o) => {
        const n = s.model, a = n.userData.boundingBox;
        return {
          index: o,
          url: s.url,
          name: n.name || "Unnamed",
          position: {
            x: parseFloat(n.position.x.toFixed(3)),
            y: parseFloat(n.position.y.toFixed(3)),
            z: parseFloat(n.position.z.toFixed(3))
          },
          rotation: {
            x: parseFloat(n.rotation.x.toFixed(3)),
            y: parseFloat(n.rotation.y.toFixed(3)),
            z: parseFloat(n.rotation.z.toFixed(3))
          },
          scale: {
            x: parseFloat(n.scale.x.toFixed(3)),
            y: parseFloat(n.scale.y.toFixed(3)),
            z: parseFloat(n.scale.z.toFixed(3))
          },
          boundingBox: a ? {
            min: {
              x: parseFloat(a.min.x.toFixed(3)),
              y: parseFloat(a.min.y.toFixed(3)),
              z: parseFloat(a.min.z.toFixed(3))
            },
            max: {
              x: parseFloat(a.max.x.toFixed(3)),
              y: parseFloat(a.max.y.toFixed(3)),
              z: parseFloat(a.max.z.toFixed(3))
            }
          } : null,
          visible: n.visible,
          children: n.children.length
        };
      });
      return console.log("📦 Loaded models:"), console.table(i), { models: i, rawData: t };
    }, window.vr = () => {
      if (!e.vrManager)
        return console.log("🥽 VR not enabled"), null;
      const t = {
        isPresenting: e.isVRPresenting(),
        isSupported: navigator.xr !== void 0,
        dollyPosition: e.dolly ? {
          x: parseFloat(e.dolly.position.x.toFixed(3)),
          y: parseFloat(e.dolly.position.y.toFixed(3)),
          z: parseFloat(e.dolly.position.z.toFixed(3))
        } : null,
        comfortSettings: e.getVRComfortSettings()
      };
      return console.log("🥽 VR information:"), console.table(t), t;
    }, window.debugHelp = () => {
      console.log("🔧 BelowJS Debug Commands:"), console.log("  camera()    - Get current camera position data"), console.log("  scene()     - Get scene information and object counts"), console.log("  models()    - Get loaded models information"), console.log("  vr()        - Get VR state and settings"), console.log("  debugHelp() - Show this help message"), console.log(""), console.log("Global objects:"), console.log("  belowViewer - Direct access to BelowViewer instance");
    }, console.log("🔧 BelowJS debug commands loaded! Type debugHelp() for available commands."));
  }
  /**
   * Clean up debug commands when viewer is disposed
   */
  static cleanup() {
    typeof window > "u" || (delete window.camera, delete window.scene, delete window.models, delete window.vr, delete window.debugHelp, delete window.belowViewer);
  }
}
class Qn extends qe {
  /**
   * Creates a new BelowViewer instance
   * 
   * @param {HTMLElement} container - DOM element to render into
   * @param {BelowViewerConfig} [config={}] - Configuration options
   */
  constructor(e, t = {}) {
    var i;
    super(), this.container = e, this.config = Ts.validate(t), this.renderer = null, this.sceneManager = null, this.cameraManager = null, this.modelLoader = null, this.vrManager = null, this.isVREnabled = ((i = this.config.vr) == null ? void 0 : i.enabled) !== !1, this.dolly = null, this.isInitialized = !1, this.loadedModels = [], this.currentAbortController = null, this.init();
  }
  init() {
    try {
      this.initRenderer(), this.sceneManager = new ks(this.config.scene), this.cameraManager = new Ys(this.config.camera), this.modelLoader = new V(this.renderer), this.isVREnabled && this.initVR(), this.cameraManager.initControls(this.renderer.domElement), this.setupEventListeners(), this.startRenderLoop(), this.isInitialized = !0, typeof window < "u" && Xt.init(this), this.emit("initialized");
    } catch (e) {
      console.error("Failed to initialize BelowViewer:", e), this.emit("error", e);
    }
  }
  initRenderer() {
    this.renderer = new u.WebGLRenderer({
      antialias: this.config.renderer.antialias,
      alpha: this.config.renderer.alpha,
      powerPreference: this.config.renderer.powerPreference
    }), this.renderer.setSize(this.container.clientWidth, this.container.clientHeight), this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = u.PCFSoftShadowMap, this.renderer.outputColorSpace = u.SRGBColorSpace, this.config.renderer.toneMapping === "aces-filmic" ? this.renderer.toneMapping = u.ACESFilmicToneMapping : this.config.renderer.toneMapping === "none" && (this.renderer.toneMapping = u.NoToneMapping), this.renderer.toneMappingExposure = this.config.renderer.toneMappingExposure, this.container.appendChild(this.renderer.domElement);
  }
  initVR() {
    this.dolly = new u.Group(), this.dolly.add(this.cameraManager.camera), this.sceneManager.scene.add(this.dolly);
    const e = this.config.audioPath || "./sound/", t = this.config.enableVRAudio !== !1;
    this.vrManager = new wn(this.renderer, this.cameraManager.camera, this.sceneManager.scene, e, t, this.container), this.vrManager.setControls(this.cameraManager.controls), this.vrManager.onModeToggle = () => {
      this.emit("vr-mode-toggle");
    }, this.vrManager.onMovementStart = () => {
      this.emit("vr-movement-start");
    }, this.vrManager.onMovementStop = () => {
      this.emit("vr-movement-stop");
    }, this.vrManager.onMovementUpdate = (i, s) => {
      this.emit("vr-movement-update", { speed: i, boostLevel: s });
    }, this.vrManager.onSessionStart = () => {
      if (this.loadedModels.length > 0) {
        const i = this.loadedModels[this.loadedModels.length - 1];
        i.options && i.options.initialPositions && this.vrManager.applyVRPositions(i.options.initialPositions);
      }
      this.cameraManager.controls && (this.cameraManager.controls.enabled = !1), this.emit("vr-session-start");
    }, this.vrManager.onSessionEnd = () => {
      if (this.cameraManager.controls && (this.cameraManager.controls.enabled = !0, this.cameraManager.controls.update()), this.dolly.position.set(0, 0, 0), this.dolly.rotation.set(0, 0, 0), this.loadedModels.length > 0) {
        const i = this.loadedModels[this.loadedModels.length - 1];
        i.options && i.options.initialPositions && i.options.initialPositions.desktop && this.applyDesktopPositions(i.options.initialPositions.desktop);
      }
      this.emit("vr-session-end");
    };
  }
  setupEventListeners() {
    window.addEventListener("resize", this.onWindowResize.bind(this)), this.cameraManager && this.cameraManager.on("change", () => {
      this.emit("camera-change");
    });
  }
  onWindowResize() {
    if (!this.isInitialized) return;
    const e = this.container.clientWidth, t = this.container.clientHeight;
    this.cameraManager.setSize(e, t), this.renderer.setSize(e, t), this.emit("resize", { width: e, height: t });
  }
  /**
   * Load a 3D model from a URL
   * 
   * @async
   * @method loadModel
   * @param {string} url - Path to the GLB model file
   * @param {Object} [options={}] - Loading options
   * @param {AbortSignal} [options.signal] - AbortSignal for cancelling the load
   * @param {Function} [options.onProgress] - Progress callback function
   * @param {Object} [options.initialPositions] - Camera positions for this model
   * @returns {Promise<THREE.Object3D>} Promise that resolves to the loaded model
   * 
   * @fires BelowViewer#model-loaded - When model loads successfully
   * @fires BelowViewer#model-load-progress - During loading progress
   * @fires BelowViewer#model-load-error - When loading fails
   * 
   * @example
   * // Load a model with progress tracking
   * try {
   *   const model = await viewer.loadModel('model.glb', {
   *     onProgress: (progress) => {
   *       console.log('Loading:', Math.round(progress.loaded / progress.total * 100) + '%');
   *     }
   *   });
   *   console.log('Model loaded:', model);
   * } catch (error) {      
   *   console.error('Failed to load model:', error);
   * }
   * 
   * @since 1.0.0
   */
  async loadModel(e, t = {}) {
    this.currentAbortController && this.currentAbortController.abort(), this.currentAbortController = new AbortController();
    const i = this.currentAbortController.signal;
    try {
      this.emit("model-load-start", { url: e });
      const s = (a) => {
        i.aborted || this.emit("model-load-progress", { url: e, progress: a });
      }, o = await this.modelLoader.load(e, s, i);
      if (i.aborted)
        return null;
      t.position && o.position.fromArray(t.position), t.rotation && o.rotation.fromArray(t.rotation), t.scale && (typeof t.scale == "number" ? o.scale.setScalar(t.scale) : o.scale.fromArray(t.scale));
      const n = this.centerModel(o);
      return this.sceneManager.add(o), this.loadedModels.push({ model: o, url: e, options: t, originalCenter: n }), this.loadedModels.length === 1 && t.autoFrame !== !1 && this.frameModel(o), this.currentAbortController && this.currentAbortController.signal === i && (this.currentAbortController = null), this.emit("model-loaded", { model: o, url: e }), o;
    } catch (s) {
      if (this.currentAbortController && this.currentAbortController.signal === i && (this.currentAbortController = null), !i.aborted && s.message !== "Loading cancelled")
        throw console.error("Failed to load model:", s), this.emit("model-load-error", { url: e, error: s }), s;
      if (i.aborted || s.message === "Loading cancelled")
        return this.emit("model-load-cancelled", { url: e }), null;
      throw s;
    }
  }
  frameModel(e) {
    if (!e.userData.boundingBox) {
      const o = new u.Box3().setFromObject(e);
      e.userData.boundingBox = o;
    }
    const t = e.userData.boundingBox, i = t.getSize(new u.Vector3()).length(), s = t.getCenter(new u.Vector3());
    this.cameraManager.frameObject(s, i);
  }
  centerModel(e) {
    if (!e.userData.boundingBox) {
      const s = new u.Box3().setFromObject(e);
      e.userData.boundingBox = s;
    }
    const i = e.userData.boundingBox.getCenter(new u.Vector3());
    return e.position.sub(i), e.userData.boundingBox = new u.Box3().setFromObject(e), i;
  }
  startRenderLoop() {
    let e = 0;
    const t = (i) => {
      const s = Math.min((i - e) / 1e3, 0.1);
      e = i, this.vrManager && this.vrManager.update(s), this.cameraManager && this.cameraManager.update(), this.emit("before-render", s), this.renderer && this.sceneManager && this.cameraManager && this.renderer.render(this.sceneManager.scene, this.cameraManager.camera);
    };
    this.renderer.setAnimationLoop(t);
  }
  // Public API methods
  getScene() {
    var e;
    return (e = this.sceneManager) == null ? void 0 : e.scene;
  }
  /**
   * Get the Three.js camera instance
   * 
   * @method getCamera
   * @returns {THREE.PerspectiveCamera|null} The Three.js camera or null if not initialized
   * 
   * @example
   * // Access camera directly
   * const camera = viewer.getCamera();
   * if (camera) {
   *   camera.position.set(10, 5, 15);
   * }
   * 
   * @since 1.0.0
   */
  getCamera() {
    var e;
    return (e = this.cameraManager) == null ? void 0 : e.camera;
  }
  /**
   * Get the Three.js WebGL renderer instance
   * 
   * @method getRenderer
   * @returns {THREE.WebGLRenderer|null} The Three.js renderer or null if not initialized
   * 
   * @example
   * // Configure renderer directly
   * const renderer = viewer.getRenderer();
   * if (renderer) {
   *   renderer.shadowMap.enabled = true;
   * }
   * 
   * @since 1.0.0
   */
  getRenderer() {
    return this.renderer;
  }
  /**
   * Get all loaded models
   * 
   * @method getLoadedModels
   * @returns {Array<Object>} Array of loaded model objects with metadata
   * 
   * @example
   * // List all loaded models
   * const models = viewer.getLoadedModels();
   * console.log('Loaded models:', models.length);
   * 
   * @since 1.0.0
   */
  getLoadedModels() {
    return this.loadedModels;
  }
  /**
   * Get the most recently loaded model
   * 
   * @method getCurrentModel
   * @returns {THREE.Object3D|null} The current model object or null if none loaded
   * 
   * @example
   * // Get current model and modify it
   * const model = viewer.getCurrentModel();
   * if (model) {
   *   model.visible = false;
   * }
   * 
   * @since 1.0.0
   */
  getCurrentModel() {
    return this.loadedModels.length > 0 ? this.loadedModels[this.loadedModels.length - 1] : null;
  }
  removeModel(e) {
    const t = this.loadedModels.findIndex((i) => i.model === e);
    t >= 0 && (this.sceneManager.remove(e), this.loadedModels.splice(t, 1), this.emit("model-removed", { model: e }));
  }
  clearModels() {
    this.loadedModels.forEach(({ model: e }) => {
      e.traverse((t) => {
        t.isMesh && (t.geometry && t.geometry.dispose(), t.material && (Array.isArray(t.material) ? t.material.forEach((i) => {
          i.map && i.map.dispose(), i.normalMap && i.normalMap.dispose(), i.roughnessMap && i.roughnessMap.dispose(), i.metalnessMap && i.metalnessMap.dispose(), i.dispose();
        }) : (t.material.map && t.material.map.dispose(), t.material.normalMap && t.material.normalMap.dispose(), t.material.roughnessMap && t.material.roughnessMap.dispose(), t.material.metalnessMap && t.material.metalnessMap.dispose(), t.material.dispose())));
      }), this.sceneManager.remove(e);
    }), this.loadedModels.length = 0, this.emit("models-cleared");
  }
  /**
   * Clean up and dispose of all resources
   * 
   * Properly disposes of the renderer, scene, models, and all associated resources.
   * Call this when you're done with the viewer to prevent memory leaks.
   * 
   * @method dispose
   * @returns {void}
   * 
   * @example
   * // Clean up when done
   * viewer.dispose();
   * 
   * @since 1.0.0
   */
  dispose() {
    this.currentAbortController && this.currentAbortController.abort(), typeof window < "u" && Xt.cleanup(), this.vrManager && (this.vrManager.dispose(), this.vrManager = null), this.renderer && this.renderer.setAnimationLoop(null), this.loadedModels.forEach(({ model: e }) => {
      e.parent && e.parent.remove(e), e.traverse((t) => {
        t.geometry && t.geometry.dispose(), t.material && (Array.isArray(t.material) ? t.material.forEach((i) => i.dispose()) : t.material.dispose());
      });
    }), this.loadedModels = [], this.cameraManager && (this.cameraManager.dispose(), this.cameraManager = null), this.renderer && (this.renderer.dispose(), this.renderer.domElement && this.renderer.domElement.parentNode && this.renderer.domElement.parentNode.removeChild(this.renderer.domElement), this.renderer = null), window.removeEventListener("resize", this.onWindowResize.bind(this)), this.removeAllListeners(), this.isInitialized = !1;
  }
  applyDesktopPositions(e) {
    if (!e || !this.cameraManager) return;
    const t = () => {
      e.camera && this.cameraManager.camera.position.set(
        e.camera.x,
        e.camera.y,
        e.camera.z
      ), e.target && this.cameraManager.controls && (this.cameraManager.controls.target.set(
        e.target.x,
        e.target.y,
        e.target.z
      ), this.cameraManager.controls.update(), requestAnimationFrame(() => {
        this.cameraManager.controls.update();
      }));
    };
    t(), setTimeout(t, 50);
  }
  // VR-specific methods
  isVRPresenting() {
    return this.vrManager ? this.vrManager.isVRPresenting : !1;
  }
  getVRManager() {
    return this.vrManager;
  }
  // VR Comfort Settings API
  /**
   * Set VR comfort settings for motion sickness reduction
   * 
   * @method setVRComfortSettings
   * @param {Object} settings - VR comfort configuration
   * @param {boolean} [settings.enableComfort] - Enable comfort features
   * @param {number} [settings.comfortRadius] - Radius of comfort zone
   * @param {number} [settings.fadeDistance] - Distance for fade effect
   * @returns {void}
   * 
   * @example
   * // Configure VR comfort
   * viewer.setVRComfortSettings({
   *   enableComfort: true,
   *   comfortRadius: 0.4
   * });
   * 
   * @since 1.0.0
   */
  setVRComfortSettings(e) {
    this.vrManager && this.vrManager.setComfortSettings(e);
  }
  /**
   * Get current VR comfort settings
   * 
   * @method getVRComfortSettings
   * @returns {Object|null} Current VR comfort settings or null if VR not enabled
   * 
   * @example
   * // Check current settings
   * const settings = viewer.getVRComfortSettings();
   * console.log('Comfort enabled:', settings?.enableComfort);
   * 
   * @since 1.0.0
   */
  getVRComfortSettings() {
    return this.vrManager ? this.vrManager.getComfortSettings() : null;
  }
  /**
   * Apply a predefined VR comfort preset
   * 
   * @method setVRComfortPreset
   * @param {string} preset - Preset name ('conservative', 'moderate', 'advanced')
   * @returns {void}
   * 
   * @example
   * // Use conservative comfort settings
   * viewer.setVRComfortPreset('conservative');
   * 
   * @since 1.0.0
   */
  setVRComfortPreset(e) {
    this.vrManager && this.vrManager.setComfortPreset(e);
  }
  // Apply initial positions based on current mode (VR or desktop)
  applyInitialPositions(e) {
    if (!e) return;
    const t = this.isVRPresenting();
    t && e.vr && this.vrManager ? this.vrManager.applyVRPositions(e) : !t && e.desktop && this.applyDesktopPositions(e.desktop);
  }
}
const Zt = new Ve(), Le = new D();
class Fi extends Ss {
  /**
   * Constructs a new line segments geometry.
   */
  constructor() {
    super(), this.isLineSegmentsGeometry = !0, this.type = "LineSegmentsGeometry";
    const e = [-1, 2, 0, 1, 2, 0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0, 0, -1, -1, 0, 1, -1, 0], t = [-1, 2, 1, 2, -1, 1, 1, 1, -1, -1, 1, -1, -1, -2, 1, -2], i = [0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5];
    this.setIndex(i), this.setAttribute("position", new Pt(e, 3)), this.setAttribute("uv", new Pt(t, 2));
  }
  /**
   * Applies the given 4x4 transformation matrix to the geometry.
   *
   * @param {Matrix4} matrix - The matrix to apply.
   * @return {LineSegmentsGeometry} A reference to this instance.
   */
  applyMatrix4(e) {
    const t = this.attributes.instanceStart, i = this.attributes.instanceEnd;
    return t !== void 0 && (t.applyMatrix4(e), i.applyMatrix4(e), t.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  /**
   * Sets the given line positions for this geometry. The length must be a multiple of six since
   * each line segment is defined by a start end vertex in the pattern `(xyz xyz)`.
   *
   * @param {Float32Array|Array<number>} array - The position data to set.
   * @return {LineSegmentsGeometry} A reference to this geometry.
   */
  setPositions(e) {
    let t;
    e instanceof Float32Array ? t = e : Array.isArray(e) && (t = new Float32Array(e));
    const i = new ut(t, 6, 1);
    return this.setAttribute("instanceStart", new Ae(i, 3, 0)), this.setAttribute("instanceEnd", new Ae(i, 3, 3)), this.instanceCount = this.attributes.instanceStart.count, this.computeBoundingBox(), this.computeBoundingSphere(), this;
  }
  /**
   * Sets the given line colors for this geometry. The length must be a multiple of six since
   * each line segment is defined by a start end color in the pattern `(rgb rgb)`.
   *
   * @param {Float32Array|Array<number>} array - The position data to set.
   * @return {LineSegmentsGeometry} A reference to this geometry.
   */
  setColors(e) {
    let t;
    e instanceof Float32Array ? t = e : Array.isArray(e) && (t = new Float32Array(e));
    const i = new ut(t, 6, 1);
    return this.setAttribute("instanceColorStart", new Ae(i, 3, 0)), this.setAttribute("instanceColorEnd", new Ae(i, 3, 3)), this;
  }
  /**
   * Setups this line segments geometry from the given wireframe geometry.
   *
   * @param {WireframeGeometry} geometry - The geometry that should be used as a data source for this geometry.
   * @return {LineSegmentsGeometry} A reference to this geometry.
   */
  fromWireframeGeometry(e) {
    return this.setPositions(e.attributes.position.array), this;
  }
  /**
   * Setups this line segments geometry from the given edges geometry.
   *
   * @param {EdgesGeometry} geometry - The geometry that should be used as a data source for this geometry.
   * @return {LineSegmentsGeometry} A reference to this geometry.
   */
  fromEdgesGeometry(e) {
    return this.setPositions(e.attributes.position.array), this;
  }
  /**
   * Setups this line segments geometry from the given mesh.
   *
   * @param {Mesh} mesh - The mesh geometry that should be used as a data source for this geometry.
   * @return {LineSegmentsGeometry} A reference to this geometry.
   */
  fromMesh(e) {
    return this.fromWireframeGeometry(new Ms(e.geometry)), this;
  }
  /**
   * Setups this line segments geometry from the given line segments.
   *
   * @param {LineSegments} lineSegments - The line segments that should be used as a data source for this geometry.
   * Assumes the source geometry is not using indices.
   * @return {LineSegmentsGeometry} A reference to this geometry.
   */
  fromLineSegments(e) {
    const t = e.geometry;
    return this.setPositions(t.attributes.position.array), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Ve());
    const e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
    e !== void 0 && t !== void 0 && (this.boundingBox.setFromBufferAttribute(e), Zt.setFromBufferAttribute(t), this.boundingBox.union(Zt));
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new yt()), this.boundingBox === null && this.computeBoundingBox();
    const e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
    if (e !== void 0 && t !== void 0) {
      const i = this.boundingSphere.center;
      this.boundingBox.getCenter(i);
      let s = 0;
      for (let o = 0, n = e.count; o < n; o++)
        Le.fromBufferAttribute(e, o), s = Math.max(s, i.distanceToSquared(Le)), Le.fromBufferAttribute(t, o), s = Math.max(s, i.distanceToSquared(Le));
      this.boundingSphere.radius = Math.sqrt(s), isNaN(this.boundingSphere.radius) && console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.", this);
    }
  }
  toJSON() {
  }
}
Ne.line = {
  worldUnits: { value: 1 },
  linewidth: { value: 1 },
  resolution: { value: new H(1, 1) },
  dashOffset: { value: 0 },
  dashScale: { value: 1 },
  dashSize: { value: 1 },
  gapSize: { value: 1 }
  // todo FIX - maybe change to totalSize
};
Pe.line = {
  uniforms: di.merge([
    Ne.common,
    Ne.fog,
    Ne.line
  ]),
  vertexShader: (
    /* glsl */
    `
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`
  ),
  fragmentShader: (
    /* glsl */
    `
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`
  )
};
class He extends vs {
  /**
   * Constructs a new line segments geometry.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super({
      type: "LineMaterial",
      uniforms: di.clone(Pe.line.uniforms),
      vertexShader: Pe.line.vertexShader,
      fragmentShader: Pe.line.fragmentShader,
      clipping: !0
      // required for clipping support
    }), this.isLineMaterial = !0, this.setValues(e);
  }
  /**
   * The material's color.
   *
   * @type {Color}
   * @default (1,1,1)
   */
  get color() {
    return this.uniforms.diffuse.value;
  }
  set color(e) {
    this.uniforms.diffuse.value = e;
  }
  /**
   * Whether the material's sizes (width, dash gaps) are in world units.
   *
   * @type {boolean}
   * @default false
   */
  get worldUnits() {
    return "WORLD_UNITS" in this.defines;
  }
  set worldUnits(e) {
    e === !0 ? this.defines.WORLD_UNITS = "" : delete this.defines.WORLD_UNITS;
  }
  /**
   * Controls line thickness in CSS pixel units when `worldUnits` is `false` (default),
   * or in world units when `worldUnits` is `true`.
   *
   * @type {number}
   * @default 1
   */
  get linewidth() {
    return this.uniforms.linewidth.value;
  }
  set linewidth(e) {
    this.uniforms.linewidth && (this.uniforms.linewidth.value = e);
  }
  /**
   * Whether the line is dashed, or solid.
   *
   * @type {boolean}
   * @default false
   */
  get dashed() {
    return "USE_DASH" in this.defines;
  }
  set dashed(e) {
    e === !0 !== this.dashed && (this.needsUpdate = !0), e === !0 ? this.defines.USE_DASH = "" : delete this.defines.USE_DASH;
  }
  /**
   * The scale of the dashes and gaps.
   *
   * @type {number}
   * @default 1
   */
  get dashScale() {
    return this.uniforms.dashScale.value;
  }
  set dashScale(e) {
    this.uniforms.dashScale.value = e;
  }
  /**
   * The size of the dash.
   *
   * @type {number}
   * @default 1
   */
  get dashSize() {
    return this.uniforms.dashSize.value;
  }
  set dashSize(e) {
    this.uniforms.dashSize.value = e;
  }
  /**
   * Where in the dash cycle the dash starts.
   *
   * @type {number}
   * @default 0
   */
  get dashOffset() {
    return this.uniforms.dashOffset.value;
  }
  set dashOffset(e) {
    this.uniforms.dashOffset.value = e;
  }
  /**
   * The size of the gap.
   *
   * @type {number}
   * @default 0
   */
  get gapSize() {
    return this.uniforms.gapSize.value;
  }
  set gapSize(e) {
    this.uniforms.gapSize.value = e;
  }
  /**
   * The opacity.
   *
   * @type {number}
   * @default 1
   */
  get opacity() {
    return this.uniforms.opacity.value;
  }
  set opacity(e) {
    this.uniforms && (this.uniforms.opacity.value = e);
  }
  /**
   * The size of the viewport, in screen pixels. This must be kept updated to make
   * screen-space rendering accurate.The `LineSegments2.onBeforeRender` callback
   * performs the update for visible objects.
   *
   * @type {Vector2}
   */
  get resolution() {
    return this.uniforms.resolution.value;
  }
  set resolution(e) {
    this.uniforms.resolution.value.copy(e);
  }
  /**
   * Whether to use alphaToCoverage or not. When enabled, this can improve the
   * anti-aliasing of line edges when using MSAA.
   *
   * @type {boolean}
   */
  get alphaToCoverage() {
    return "USE_ALPHA_TO_COVERAGE" in this.defines;
  }
  set alphaToCoverage(e) {
    this.defines && (e === !0 !== this.alphaToCoverage && (this.needsUpdate = !0), e === !0 ? this.defines.USE_ALPHA_TO_COVERAGE = "" : delete this.defines.USE_ALPHA_TO_COVERAGE);
  }
}
const nt = new Te(), $t = new D(), ei = new D(), _ = new Te(), G = new Te(), X = new Te(), at = new D(), rt = new Re(), P = new xs(), ti = new D(), Fe = new Ve(), _e = new yt(), Z = new Te();
let $, ce;
function ii(l, e, t) {
  return Z.set(0, 0, -e, 1).applyMatrix4(l.projectionMatrix), Z.multiplyScalar(1 / Z.w), Z.x = ce / t.width, Z.y = ce / t.height, Z.applyMatrix4(l.projectionMatrixInverse), Z.multiplyScalar(1 / Z.w), Math.abs(Math.max(Z.x, Z.y));
}
function Sn(l, e) {
  const t = l.matrixWorld, i = l.geometry, s = i.attributes.instanceStart, o = i.attributes.instanceEnd, n = Math.min(i.instanceCount, s.count);
  for (let a = 0, r = n; a < r; a++) {
    P.start.fromBufferAttribute(s, a), P.end.fromBufferAttribute(o, a), P.applyMatrix4(t);
    const A = new D(), c = new D();
    $.distanceSqToSegment(P.start, P.end, c, A), c.distanceTo(A) < ce * 0.5 && e.push({
      point: c,
      pointOnLine: A,
      distance: $.origin.distanceTo(c),
      object: l,
      face: null,
      faceIndex: a,
      uv: null,
      uv1: null
    });
  }
}
function Mn(l, e, t) {
  const i = e.projectionMatrix, o = l.material.resolution, n = l.matrixWorld, a = l.geometry, r = a.attributes.instanceStart, A = a.attributes.instanceEnd, c = Math.min(a.instanceCount, r.count), h = -e.near;
  $.at(1, X), X.w = 1, X.applyMatrix4(e.matrixWorldInverse), X.applyMatrix4(i), X.multiplyScalar(1 / X.w), X.x *= o.x / 2, X.y *= o.y / 2, X.z = 0, at.copy(X), rt.multiplyMatrices(e.matrixWorldInverse, n);
  for (let d = 0, g = c; d < g; d++) {
    if (_.fromBufferAttribute(r, d), G.fromBufferAttribute(A, d), _.w = 1, G.w = 1, _.applyMatrix4(rt), G.applyMatrix4(rt), _.z > h && G.z > h)
      continue;
    if (_.z > h) {
      const I = _.z - G.z, b = (_.z - h) / I;
      _.lerp(G, b);
    } else if (G.z > h) {
      const I = G.z - _.z, b = (G.z - h) / I;
      G.lerp(_, b);
    }
    _.applyMatrix4(i), G.applyMatrix4(i), _.multiplyScalar(1 / _.w), G.multiplyScalar(1 / G.w), _.x *= o.x / 2, _.y *= o.y / 2, G.x *= o.x / 2, G.y *= o.y / 2, P.start.copy(_), P.start.z = 0, P.end.copy(G), P.end.z = 0;
    const C = P.closestPointToPointParameter(at, !0);
    P.at(C, ti);
    const E = Ct.lerp(_.z, G.z, C), m = E >= -1 && E <= 1, f = at.distanceTo(ti) < ce * 0.5;
    if (m && f) {
      P.start.fromBufferAttribute(r, d), P.end.fromBufferAttribute(A, d), P.start.applyMatrix4(n), P.end.applyMatrix4(n);
      const I = new D(), b = new D();
      $.distanceSqToSegment(P.start, P.end, b, I), t.push({
        point: b,
        pointOnLine: I,
        distance: $.origin.distanceTo(b),
        object: l,
        face: null,
        faceIndex: d,
        uv: null,
        uv1: null
      });
    }
  }
}
class vn extends Bt {
  /**
   * Constructs a new wide line.
   *
   * @param {LineSegmentsGeometry} [geometry] - The line geometry.
   * @param {LineMaterial} [material] - The line material.
   */
  constructor(e = new Fi(), t = new He({ color: Math.random() * 16777215 })) {
    super(e, t), this.isLineSegments2 = !0, this.type = "LineSegments2";
  }
  /**
   * Computes an array of distance values which are necessary for rendering dashed lines.
   * For each vertex in the geometry, the method calculates the cumulative length from the
   * current point to the very beginning of the line.
   *
   * @return {LineSegments2} A reference to this instance.
   */
  computeLineDistances() {
    const e = this.geometry, t = e.attributes.instanceStart, i = e.attributes.instanceEnd, s = new Float32Array(2 * t.count);
    for (let n = 0, a = 0, r = t.count; n < r; n++, a += 2)
      $t.fromBufferAttribute(t, n), ei.fromBufferAttribute(i, n), s[a] = a === 0 ? 0 : s[a - 1], s[a + 1] = s[a] + $t.distanceTo(ei);
    const o = new ut(s, 2, 1);
    return e.setAttribute("instanceDistanceStart", new Ae(o, 1, 0)), e.setAttribute("instanceDistanceEnd", new Ae(o, 1, 1)), this;
  }
  /**
   * Computes intersection points between a casted ray and this instance.
   *
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - The target array that holds the intersection points.
   */
  raycast(e, t) {
    const i = this.material.worldUnits, s = e.camera;
    s === null && !i && console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');
    const o = e.params.Line2 !== void 0 && e.params.Line2.threshold || 0;
    $ = e.ray;
    const n = this.matrixWorld, a = this.geometry, r = this.material;
    ce = r.linewidth + o, a.boundingSphere === null && a.computeBoundingSphere(), _e.copy(a.boundingSphere).applyMatrix4(n);
    let A;
    if (i)
      A = ce * 0.5;
    else {
      const h = Math.max(s.near, _e.distanceToPoint($.origin));
      A = ii(s, h, r.resolution);
    }
    if (_e.radius += A, $.intersectsSphere(_e) === !1)
      return;
    a.boundingBox === null && a.computeBoundingBox(), Fe.copy(a.boundingBox).applyMatrix4(n);
    let c;
    if (i)
      c = ce * 0.5;
    else {
      const h = Math.max(s.near, Fe.distanceToPoint($.origin));
      c = ii(s, h, r.resolution);
    }
    Fe.expandByScalar(c), $.intersectsBox(Fe) !== !1 && (i ? Sn(this, t) : Mn(this, s, t));
  }
  onBeforeRender(e) {
    const t = this.material.uniforms;
    t && t.resolution && (e.getViewport(nt), this.material.uniforms.resolution.value.set(nt.z, nt.w));
  }
}
class bt extends Fi {
  /**
   * Constructs a new line geometry.
   */
  constructor() {
    super(), this.isLineGeometry = !0, this.type = "LineGeometry";
  }
  /**
   * Sets the given line positions for this geometry.
   *
   * @param {Float32Array|Array<number>} array - The position data to set.
   * @return {LineGeometry} A reference to this geometry.
   */
  setPositions(e) {
    const t = e.length - 3, i = new Float32Array(2 * t);
    for (let s = 0; s < t; s += 3)
      i[2 * s] = e[s], i[2 * s + 1] = e[s + 1], i[2 * s + 2] = e[s + 2], i[2 * s + 3] = e[s + 3], i[2 * s + 4] = e[s + 4], i[2 * s + 5] = e[s + 5];
    return super.setPositions(i), this;
  }
  /**
   * Sets the given line colors for this geometry.
   *
   * @param {Float32Array|Array<number>} array - The position data to set.
   * @return {LineGeometry} A reference to this geometry.
   */
  setColors(e) {
    const t = e.length - 3, i = new Float32Array(2 * t);
    for (let s = 0; s < t; s += 3)
      i[2 * s] = e[s], i[2 * s + 1] = e[s + 1], i[2 * s + 2] = e[s + 2], i[2 * s + 3] = e[s + 3], i[2 * s + 4] = e[s + 4], i[2 * s + 5] = e[s + 5];
    return super.setColors(i), this;
  }
  /**
   * Setups this line segments geometry from the given sequence of points.
   *
   * @param {Array<Vector3|Vector2>} points - An array of points in 2D or 3D space.
   * @return {LineGeometry} A reference to this geometry.
   */
  setFromPoints(e) {
    const t = e.length - 1, i = new Float32Array(6 * t);
    for (let s = 0; s < t; s++)
      i[6 * s] = e[s].x, i[6 * s + 1] = e[s].y, i[6 * s + 2] = e[s].z || 0, i[6 * s + 3] = e[s + 1].x, i[6 * s + 4] = e[s + 1].y, i[6 * s + 5] = e[s + 1].z || 0;
    return super.setPositions(i), this;
  }
  /**
   * Setups this line segments geometry from the given line.
   *
   * @param {Line} line - The line that should be used as a data source for this geometry.
   * @return {LineGeometry} A reference to this geometry.
   */
  fromLine(e) {
    const t = e.geometry;
    return this.setPositions(t.attributes.position.array), this;
  }
}
class si extends vn {
  /**
   * Constructs a new wide line.
   *
   * @param {LineGeometry} [geometry] - The line geometry.
   * @param {LineMaterial} [material] - The line material.
   */
  constructor(e = new bt(), t = new He({ color: Math.random() * 16777215 })) {
    super(e, t), this.isLine2 = !0, this.type = "Line2";
  }
}
class xn {
  /**
   * Set the objects to use for raycasting during measurement
   * 
   * Defines which 3D objects can be measured. Accepts meshes, groups, or arrays
   * and will traverse to find all meshes with geometry, excluding measurement helpers.
   * 
   * @method setRaycastTargets
   * @param {THREE.Object3D|THREE.Object3D[]} targets - Target objects for measurement
   * @returns {void}
   * 
   * @example
   * // Set a single model as measurement target
   * measurementSystem.setRaycastTargets(loadedModel);
   * 
   * @example
   * // Set multiple models as targets
   * measurementSystem.setRaycastTargets([model1, model2, model3]);
   * 
   * @since 1.0.0
   */
  setRaycastTargets(e) {
    const t = [], i = (s) => {
      Array.isArray(s) ? s.forEach(i) : s && typeof s == "object" && (s.isMesh && s.geometry && !this.isMeasurementHelper(s) ? (s.updateMatrixWorld(!0), t.push(s)) : s.traverse && s.traverse((o) => {
        o.isMesh && o.geometry && !this.isMeasurementHelper(o) && (o.updateMatrixWorld(!0), t.push(o));
      }));
    };
    i(e), this._raycastTargets = t;
  }
  /**
   * Returns true if the object is a measurement helper (sphere, line, etc.)
   * @param {THREE.Object3D} obj
   */
  isMeasurementHelper(e) {
    if (!e) return !1;
    if (e.geometry === this.sphereGeometry || e.userData.isMeasurementSphere || e.type === "Line2" || e.type === "Line" || e.geometry && e.geometry.type === "LineGeometry") return !0;
    const t = ["RingGeometry", "TubeGeometry", "PlaneGeometry", "CircleGeometry"];
    return !!(e.geometry && t.includes(e.geometry.type) || typeof e.name == "string" && e.name.startsWith("MeasurementHelper"));
  }
  /**
   * Set the measurement target (single mesh, group, or array) for convenience.
   * Accepts a THREE.Object3D, Mesh, or array of meshes/groups.
   * @param {THREE.Object3D|THREE.Object3D[]} target
   */
  setTarget(e) {
    e ? this.setRaycastTargets(e) : this.setRaycastTargets([]);
  }
  /**
   * @param {Object} opts
   * @param {THREE.Scene} opts.scene
   * @param {THREE.Camera} opts.camera
   * @param {THREE.WebGLRenderer} opts.renderer
   * @param {Object} opts.controls - OrbitControls or similar
   * @param {THREE.Group} [opts.dolly] - VR dolly/group (optional)
   * @param {Object} [opts.config] - UI/behavior config (optional)
   */
  /**
   * Creates a new MeasurementSystem instance
   * 
   * @param {MeasurementSystemConfig} config - Configuration object
   */
  constructor({ scene: e, camera: t, renderer: i, controls: s, dolly: o, config: n = {}, theme: a = "dark" }) {
    this.ghostSpheres = {
      left: null,
      right: null
    }, this.MAX_SPHERES = 2, this.measurementSpheres = [], this.measurementLine = null, this.measurementLabel = null, this.previousTriggerState = {}, this.unifiedMeasurementPoints = [], this.unifiedMeasurementLine = null, this.desktopMeasurementPoints = [], this.desktopMeasurementLine = null, typeof window < "u" && (window.measurementSystem = this), this.scene = e, this.camera = t, this.renderer = i, this.controls = s, this.dolly = o, this.config = n, this.theme = a, this._raycastTargets = e && e.children ? e.children : [], this.enabled = !0, this.isVR = !1, this.measurementPanel = null, this.desktopMeasurementMode = !1, this.measurementSystemEnabled = !0, this.desktopMeasurementPoints = [], this.connectionLine = null, this.desktopMeasurementLine = null, this.measurementSprite = null, this.measurementCanvas = null, this.measurementTexture = null, this.lastClickTime = 0, this.lastTriggerTime = 0, this._wasInVR = !1, this.focusAnimation = null, this.mouse = new u.Vector2(), this.raycaster = new u.Raycaster();
    const r = () => {
      let A = null, c = null, h = null, d = null;
      if (e && e.children && e.children.forEach((g) => {
        g && g.inputSource && g.inputSource.handedness && (g.inputSource.handedness === "left" && (A = g), g.inputSource.handedness === "right" && (c = g));
      }), (!A || !c) && i && i.xr && i.xr.getController)
        try {
          A = A || i.xr.getController(0), c = c || i.xr.getController(1);
        } catch {
        }
      A && c ? (this.attachVR({ controller1: A, controller2: c, controllerGrip1: h, controllerGrip2: d }), this.ghostSpheres && this.ghostSpheres.left && this.ghostSpheres.right && (this.ghostSpheres.left.visible = !0, this.ghostSpheres.right.visible = !0)) : (this._ghostSphereAttachRetries || (this._ghostSphereAttachRetries = 0), this._ghostSphereAttachRetries < 40 ? (this._ghostSphereAttachRetries++, setTimeout(r, 250)) : typeof window < "u" && window.console && console.warn("[MeasurementSystem] Could not find VR controllers to attach ghost spheres after multiple attempts."));
    };
    if (r(), i && i.xr && i.xr.addEventListener && i.xr.addEventListener("sessionstart", r), this.sphereGeometry = new u.SphereGeometry(0.02, 8, 6), this.placedMaterial = new u.MeshBasicMaterial({ color: 16777215 }), this.vrLineMaterial = new He({
      color: 16777215,
      linewidth: 3,
      // 3px thick
      transparent: !0,
      opacity: 0.8,
      depthTest: !1,
      vertexColors: !1,
      dashed: !1
    }), this.desktopLineMaterial = new He({
      color: 16777215,
      linewidth: 3,
      // 3px thick
      transparent: !0,
      opacity: 1,
      depthTest: !1,
      vertexColors: !1,
      dashed: !1
    }), this.MAX_DESKTOP_POINTS = 2, this.DRAG_THRESHOLD = 5, this.isDragging = !1, this.dragStartPosition = { x: 0, y: 0 }, this.createMeasurementPanel(), this.updateMeasurementPanel(), this._boundOnMouseClick = this.onMouseClick.bind(this), this._boundOnMouseDown = this.onMouseDown.bind(this), this._boundOnMouseMove = this.onMouseMove.bind(this), this._boundOnMouseUp = this.onMouseUp.bind(this), this.renderer.domElement.addEventListener("click", this._boundOnMouseClick, !1), this.renderer.domElement.addEventListener("mousedown", this._boundOnMouseDown, !1), this.renderer.domElement.addEventListener("mousemove", this._boundOnMouseMove, !1), this.renderer.domElement.addEventListener("mouseup", this._boundOnMouseUp, !1), i && i.xr && typeof i.xr.getController == "function") {
      const A = () => {
        if (i.xr.isPresenting) {
          const c = i.xr.getController(0), h = i.xr.getController(1), d = i.xr.getControllerGrip ? i.xr.getControllerGrip(0) : void 0, g = i.xr.getControllerGrip ? i.xr.getControllerGrip(1) : void 0;
          this.attachVR({ controller1: c, controller2: h, controllerGrip1: d, controllerGrip2: g });
        }
      };
      if (i.xr.addEventListener && i.xr.addEventListener("sessionstart", A), i.xr.isPresenting && A(), i.xr && typeof i.xr.requestSession == "function" && !i.xr._measurementSystemPatched) {
        const c = i.xr.requestSession.bind(i.xr);
        i.xr.requestSession = async (...h) => {
          const d = await c(...h);
          return setTimeout(() => {
            A();
          }, 100), d;
        }, i.xr._measurementSystemPatched = !0;
      }
    }
    setTimeout(() => {
      i && i.xr && typeof i.xr.isPresenting == "boolean" && i.xr.isPresenting && !this.isVR && console.warn("[MeasurementSystem] WARNING: attachVR() was never called. VR ghost spheres and VR measurement will not work.");
    }, 5e3);
  }
  // --- VR/Shared Logic (Stub for now, will be filled in) ---
  // These methods will be filled in with the full VR and shared logic ported from Adrasan.
  /**
   * Enable measurement mode
   * 
   * Activates the measurement system, showing the measurement panel and
   * enabling click-to-measure functionality for desktop mode.
   * 
   * @method enable
   * @returns {void}
   * 
   * @fires MeasurementSystem#measurement-enabled
   * 
   * @example
   * // Enable measurement mode
   * measurementSystem.enable();
   * 
   * @since 1.0.0
   */
  enable() {
    this.desktopMeasurementMode = !0, this.updateMeasurementPanel();
  }
  /**
   * Disable measurement mode
   * 
   * Deactivates the measurement system, hiding the measurement panel and
   * clearing any active desktop measurements.
   * 
   * @method disable
   * @returns {void}
   * 
   * @fires MeasurementSystem#measurement-disabled
   * 
   * @example
   * // Disable measurement mode
   * measurementSystem.disable();
   * 
   * @since 1.0.0
   */
  disable() {
    this.desktopMeasurementMode = !1, this.updateMeasurementPanel(), this.clearDesktopMeasurement();
  }
  // Toggle measurement system
  toggle() {
    this.desktopMeasurementMode = !this.desktopMeasurementMode, this.updateMeasurementPanel(), this.desktopMeasurementMode || this.clearDesktopMeasurement();
  }
  // Clear all measurements (desktop and VR)
  clear() {
    this.clearUnifiedMeasurement(), this.clearLegacyDesktopMeasurement(), this.clearLegacyVRMeasurement();
  }
  // Clear unified measurements
  clearUnifiedMeasurement() {
    this.unifiedMeasurementPoints && this.unifiedMeasurementPoints.length > 0 && (this.unifiedMeasurementPoints.forEach((e) => {
      e.sphere && this.scene.children.includes(e.sphere) && this.scene.remove(e.sphere);
    }), this.unifiedMeasurementPoints.length = 0), this.unifiedMeasurementLine && (this.scene.remove(this.unifiedMeasurementLine), this.unifiedMeasurementLine = null), this.measurementSprite && (this.measurementSprite.visible = !1, this.scene.remove(this.measurementSprite), this.measurementSprite = null), this.updateMeasurementPanel();
  }
  // Clear VR measurements
  clearVRMeasurement() {
    this.measurementSpheres && (this.measurementSpheres.forEach((e) => this.scene.remove(e)), this.measurementSpheres.length = 0), this.measurementLine && (this.scene.remove(this.measurementLine), this.measurementLine = null), this.measurementLabel && (this.scene.remove(this.measurementLabel), this.measurementLabel = null), this.placedSpheres && (this.placedSpheres.forEach((e) => this.scene.remove(e)), this.placedSpheres.length = 0), this.connectionLine && (this.scene.remove(this.connectionLine), this.connectionLine = null), this.measurementSprite && (this.measurementSprite.visible = !1), this.measurementSystemEnabled = !0, this.updateMeasurementPanel();
  }
  /**
   * Clear legacy VR measurements (old system compatibility)
   */
  clearLegacyVRMeasurement() {
    this.measurementSpheres && this.measurementSpheres.length > 0 && (this.measurementSpheres.forEach((e) => {
      e && this.scene.children.includes(e) && this.scene.remove(e);
    }), this.measurementSpheres.length = 0), this.measurementLine && (this.scene.remove(this.measurementLine), this.measurementLine = null), this.connectionLine && (this.scene.remove(this.connectionLine), this.connectionLine = null), this.measurementLabel && (this.scene.remove(this.measurementLabel), this.measurementLabel = null);
  }
  // Sync desktop measurements to VR (stub)
  syncToVR() {
    if (this.desktopMeasurementPoints.length === 2) {
      if (this.clearVRMeasurement(), this.desktopMeasurementPoints.forEach((e) => {
        const t = new u.Mesh(this.sphereGeometry, this.placedMaterial);
        t.position.copy(e.position), this.scene.add(t), this.measurementSpheres.push(t);
      }), this.measurementSpheres.length === 2) {
        const e = new u.BufferGeometry().setFromPoints([
          this.measurementSpheres[0].position,
          this.measurementSpheres[1].position
        ]), t = this.vrLineMaterial || new u.LineBasicMaterial({ color: 16777215, transparent: !0, opacity: 0.8, depthTest: !1 });
        this.connectionLine = new u.Line(e, t), this.scene.add(this.connectionLine), this.createMeasurementDisplay(this.measurementSpheres[0].position.distanceTo(this.measurementSpheres[1].position)), this.measurementSprite && !this.scene.children.includes(this.measurementSprite) && this.scene.add(this.measurementSprite);
      }
      this.measurementSystemEnabled = !0, this.updateMeasurementPanel();
    }
  }
  // Sync VR measurements to desktop (stub)
  syncToDesktop() {
    if (this.measurementSpheres && this.measurementSpheres.length === 2) {
      this.clearDesktopMeasurement();
      for (let e = 0; e < 2; e++) {
        const t = this.measurementSpheres[e].position.clone();
        let i = t;
        if (this._raycastTargets && this._raycastTargets.length > 0 && this.camera) {
          const o = t.clone().sub(this.camera.position).normalize(), a = new u.Raycaster(this.camera.position, o).intersectObjects(this._raycastTargets, !0);
          a.length > 0 && (i = a[0].point);
        }
        const s = new u.Mesh(this.sphereGeometry, this.placedMaterial);
        s.position.copy(i), this.scene.add(s), this.desktopMeasurementPoints.push(s);
      }
      if (this.desktopMeasurementPoints.length === 2) {
        const e = new bt();
        e.setPositions([
          this.desktopMeasurementPoints[0].position.x,
          this.desktopMeasurementPoints[0].position.y,
          this.desktopMeasurementPoints[0].position.z,
          this.desktopMeasurementPoints[1].position.x,
          this.desktopMeasurementPoints[1].position.y,
          this.desktopMeasurementPoints[1].position.z
        ]), this.desktopMeasurementLine = new si(e, this.desktopLineMaterial), this.desktopMeasurementLine.computeLineDistances(), this.scene.add(this.desktopMeasurementLine);
        const t = this.desktopMeasurementPoints[0].position.distanceTo(this.desktopMeasurementPoints[1].position);
        if (this.createMeasurementDisplay(t), this.measurementSprite) {
          const i = new u.Vector3();
          i.addVectors(this.desktopMeasurementPoints[0].position, this.desktopMeasurementPoints[1].position), i.multiplyScalar(0.5);
          const s = Math.max(0.05, Math.min(0.2, t * 0.03));
          i.y += s, this.measurementSprite.position.copy(i), this.measurementSprite.visible = !1, this.scene.children.includes(this.measurementSprite) || this.scene.add(this.measurementSprite);
        }
      }
      this.updateMeasurementPanel();
    }
  }
  // Update method for render loop (stub)
  // --- Shared Measurement Display (Sprite/Canvas) ---
  createMeasurementDisplay(e) {
    const t = window.devicePixelRatio || 1, i = 256, s = 64, o = i * t, n = s * t;
    this.measurementCanvas || (this.measurementCanvas = document.createElement("canvas")), (this.measurementCanvas.width !== o || this.measurementCanvas.height !== n) && (this.measurementCanvas.width = o, this.measurementCanvas.height = n);
    const a = this.measurementCanvas.getContext("2d");
    a.setTransform(1, 0, 0, 1, 0, 0), a.clearRect(0, 0, o, n), a.save(), a.scale(t, t);
    const r = 24;
    let A;
    e <= 2 ? A = 0.4 + e / 2 * 0.3 : e <= 4 ? A = 0.7 + (e - 2) / 2 * 0.2 : A = 0.9 + Math.min((e - 4) / 16, 1) * 0.5;
    const c = Math.round(r * A);
    a.font = `600 ${c}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`;
    const h = `${e.toFixed(2)}m`, g = a.measureText(h).width, p = c, C = Math.max(6, c * 0.3), E = g + C * 2, m = p + C * 2, f = (i - E) / 2, I = (s - m) / 2;
    if (a.fillStyle = "rgba(0, 0, 0, 0.8)", a.beginPath(), a.roundRect(f, I, E, m, Math.max(4, c * 0.2)), a.fill(), a.fillStyle = "white", a.textAlign = "center", a.textBaseline = "middle", a.fillText(h, i / 2, s / 2), a.restore(), this.measurementTexture ? this.measurementTexture.needsUpdate = !0 : (this.measurementTexture = new u.CanvasTexture(this.measurementCanvas), this.measurementTexture.minFilter = u.LinearFilter, this.measurementTexture.magFilter = u.LinearFilter), !this.measurementSprite) {
      const w = new u.SpriteMaterial({
        map: this.measurementTexture,
        depthTest: !1,
        depthWrite: !1
      });
      this.measurementSprite = new u.Sprite(w);
    }
    const B = 0.3 * A, y = i / s;
    return this.measurementSprite.scale.set(B * y, B, 1), this.measurementSprite;
  }
  // --- VR Logic ---
  // Call this after VR controllers are available and renderer.xr is enabled
  /**
   * Attach VR controllers for VR measurement mode
   * 
   * Sets up VR controller support for measurement functionality, including
   * ghost spheres for controller position indication and trigger-based measurement.
   * 
   * @method attachVR
   * @param {Object} controllers - VR controller objects
   * @param {THREE.Object3D} controllers.controller1 - First VR controller
   * @param {THREE.Object3D} controllers.controller2 - Second VR controller  
   * @param {THREE.Object3D} controllers.controllerGrip1 - First controller grip
   * @param {THREE.Object3D} controllers.controllerGrip2 - Second controller grip
   * @returns {void}
   * 
   * @example
   * // Attach VR controllers from VRManager
   * measurementSystem.attachVR({
   *   controller1: vrManager.controller1,
   *   controller2: vrManager.controller2,
   *   controllerGrip1: vrManager.controllerGrip1,
   *   controllerGrip2: vrManager.controllerGrip2
   * });
   * 
   * @since 1.0.0
   */
  attachVR({ controller1: e, controller2: t, controllerGrip1: i, controllerGrip2: s }) {
    this.controller1 = e, this.controller2 = t, this.controllerGrip1 = i, this.controllerGrip2 = s;
    const o = new u.MeshBasicMaterial({
      color: 8947848,
      // ghostly grey
      transparent: !0,
      opacity: 0.25,
      depthTest: !1,
      depthWrite: !1
    });
    this.ghostSpheres.left && this.ghostSpheres.left.parent && this.ghostSpheres.left.parent.remove(this.ghostSpheres.left), this.ghostSpheres.right && this.ghostSpheres.right.parent && this.ghostSpheres.right.parent.remove(this.ghostSpheres.right), this.ghostSpheres.left = new u.Mesh(this.sphereGeometry, o.clone()), this.ghostSpheres.right = new u.Mesh(this.sphereGeometry, o.clone()), this.ghostSpheres.left.scale.set(1, 1, 1), this.ghostSpheres.right.scale.set(1, 1, 1), this.ghostSpheres.left.position.set(0, 0, -0.05), this.ghostSpheres.right.position.set(0, 0, -0.05), this.ghostSpheres.left.visible = !0, this.ghostSpheres.right.visible = !0, this.controller1 && this.controller1.add(this.ghostSpheres.left), this.controller2 && this.controller2.add(this.ghostSpheres.right), this.yButtonPressed = !1, this.MAX_SPHERES = 2, this.triggerState = {
      left: !1,
      right: !1
    }, this._onVRTriggerDown = this._onVRTriggerDown.bind(this), this._onVRTriggerUp = this._onVRTriggerUp.bind(this), this._onVRYButtonDown = this._onVRYButtonDown.bind(this), this._onVRYButtonUp = this._onVRYButtonUp.bind(this), this.controller1 && this.controller2 && (this.controller1.addEventListener("selectstart", this._onVRTriggerDown), this.controller1.addEventListener("selectend", this._onVRTriggerUp), this.controller2.addEventListener("selectstart", this._onVRTriggerDown), this.controller2.addEventListener("selectend", this._onVRTriggerUp), this.controller1.addEventListener("ybuttondown", this._onVRYButtonDown), this.controller1.addEventListener("ybuttonup", this._onVRYButtonUp), this.controller2.addEventListener("ybuttondown", this._onVRYButtonDown), this.controller2.addEventListener("ybuttonup", this._onVRYButtonUp)), this.isVR = !0, this.refreshMeasurementDisplayForVR();
  }
  // VR controller event handlers (kept for Y button, but trigger logic moved to update loop)
  _onVRTriggerDown(e) {
    var i, s;
    (s = (i = e.target.userData) == null ? void 0 : i.inputSource) != null && s.handedness;
  }
  _onVRTriggerUp(e) {
    var s, o;
    const t = e.target;
    (o = (s = t.userData) == null ? void 0 : s.inputSource) != null && o.handedness;
    const i = performance.now();
    if (!(this.lastTriggerTime && i - this.lastTriggerTime < 200) && (this.lastTriggerTime = i, this.measurementSystemEnabled)) {
      const n = new u.Vector3();
      let a = null;
      if (t === this.controller1 && this.ghostSpheres.left ? a = this.ghostSpheres.left : t === this.controller2 && this.ghostSpheres.right && (a = this.ghostSpheres.right), a)
        a.getWorldPosition(n);
      else {
        t.getWorldPosition(n);
        const r = new u.Vector3(0, 0, -0.05);
        r.applyQuaternion(t.quaternion), n.add(r);
      }
      this._placeVRMeasurementPoint(n);
    }
  }
  _onVRYButtonDown(e) {
    this.clearUnifiedMeasurement();
  }
  _onVRYButtonUp(e) {
  }
  _getVRControllerIntersection(e) {
    const t = new u.Matrix4();
    t.identity().extractRotation(e.matrixWorld);
    const i = new u.Vector3(), s = new u.Vector3(0, 0, -1).applyMatrix4(t);
    e.getWorldPosition(i);
    const a = new u.Raycaster(i, s.normalize()).intersectObjects(this.scene.children, !0).filter((r) => {
      const A = this.unifiedMeasurementPoints.some((d) => d.sphere === r.object), c = r.object === this.unifiedMeasurementLine, h = this.isMeasurementHelper(r.object);
      return !A && !c && !h;
    });
    return a.length > 0 ? a[0] : null;
  }
  _placeVRMeasurementPoint(e) {
    this.measurementSystemEnabled && this.placeUnifiedMeasurementPoint(e, "vr");
  }
  /**
   * Clear legacy desktop measurements
   */
  clearLegacyDesktopMeasurement() {
    this.desktopMeasurementPoints && this.desktopMeasurementPoints.length > 0 && (this.desktopMeasurementPoints.forEach((e) => {
      e && this.scene.children.includes(e) && this.scene.remove(e);
    }), this.desktopMeasurementPoints.length = 0), this.desktopMeasurementLine && (this.scene.remove(this.desktopMeasurementLine), this.desktopMeasurementLine = null);
  }
  /**
   * Unified measurement point placement that works across VR and desktop
   * @param {THREE.Vector3} point - World position to place measurement point
   * @param {string} source - 'vr' or 'desktop' for tracking
   */
  placeUnifiedMeasurementPoint(e, t = "unknown") {
    if (this.unifiedMeasurementPoints.length === 0 && (this.clearLegacyVRMeasurement(), this.clearLegacyDesktopMeasurement()), this.unifiedMeasurementPoints.length >= 2) {
      const s = this.unifiedMeasurementPoints.shift();
      s.sphere && this.scene.remove(s.sphere);
    }
    const i = new u.Mesh(this.sphereGeometry, this.placedMaterial);
    i.position.copy(e), i.userData.isMeasurementSphere = !0, this.scene.add(i), this.unifiedMeasurementPoints.push({
      position: e.clone(),
      sphere: i,
      source: t
    }), this.updateUnifiedMeasurementLine(), this.updateMeasurementPanel();
  }
  /**
   * Update the unified measurement line connecting the points
   */
  updateUnifiedMeasurementLine() {
    if (this.unifiedMeasurementLine && (this.scene.remove(this.unifiedMeasurementLine), this.unifiedMeasurementLine = null), this.unifiedMeasurementPoints.length === 2) {
      const e = this.unifiedMeasurementPoints[0].position, t = this.unifiedMeasurementPoints[1].position, i = new bt();
      i.setPositions([
        e.x,
        e.y,
        e.z,
        t.x,
        t.y,
        t.z
      ]), this.unifiedMeasurementLine = new si(i, this.desktopLineMaterial), this.unifiedMeasurementLine.computeLineDistances(), this.unifiedMeasurementLine.userData.isMeasurementLine = !0, this.scene.add(this.unifiedMeasurementLine);
      const s = e.distanceTo(t);
      if (this.createMeasurementDisplay(s), this.measurementSprite) {
        const o = new u.Vector3();
        o.addVectors(e, t), o.multiplyScalar(0.5);
        const n = Math.max(0.05, Math.min(0.2, s * 0.03));
        o.y += n, this.measurementSprite.position.copy(o), this.scene.children.includes(this.measurementSprite) || this.scene.add(this.measurementSprite);
        const a = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting;
        this.measurementSprite.visible = a;
      }
      this.desktopMeasurementMode || (this.desktopMeasurementMode = !0);
    }
  }
  /**
   * Reset ghost sphere positions to correct local coordinates
   * Useful when VR coordinate systems get corrupted (e.g., returning from Quest browser)
   */
  resetGhostSpherePositions() {
    this.isVR && this.ghostSpheres && (this.ghostSpheres.left && this.controller1 && this.ghostSpheres.left.parent === this.controller1 && (this.ghostSpheres.left.position.set(0, 0, -0.05), this.ghostSpheres.left.rotation.set(0, 0, 0), this.ghostSpheres.left.scale.set(1, 1, 1)), this.ghostSpheres.right && this.controller2 && this.ghostSpheres.right.parent === this.controller2 && (this.ghostSpheres.right.position.set(0, 0, -0.05), this.ghostSpheres.right.rotation.set(0, 0, 0), this.ghostSpheres.right.scale.set(1, 1, 1)));
  }
  /**
   * Update method called each frame by the render loop
   */
  update() {
    if (this.isVR && this.ghostSpheres && (this.ghostSpheres.left && this.controller1 && this.ghostSpheres.left.visible && this.ghostSpheres.left.position.length() > 1 && this.resetGhostSpherePositions(), this.ghostSpheres.right && this.controller2 && this.ghostSpheres.right.visible && this.ghostSpheres.right.position.length() > 1 && this.resetGhostSpherePositions()), this.measurementSprite) {
      const e = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting, t = this.unifiedMeasurementPoints && this.unifiedMeasurementPoints.length === 2;
      this.measurementSprite.visible = e && t;
    }
  }
  // Dispose/cleanup
  /**
   * Clean up and dispose of measurement system resources
   * 
   * Removes the measurement panel, clears all measurements, disposes of
   * materials and geometries, and removes event listeners.
   * 
   * @method dispose
   * @returns {void}
   * 
   * @example
   * // Clean up measurement system
   * measurementSystem.dispose();
   * 
   * @since 1.0.0
   */
  dispose() {
    this.measurementPanel && this.measurementPanel.parentNode && (this.measurementPanel.parentNode.removeChild(this.measurementPanel), this.measurementPanel = null), this.renderer.domElement.removeEventListener("click", this._boundOnMouseClick, !1), this.renderer.domElement.removeEventListener("mousedown", this._boundOnMouseDown, !1), this.renderer.domElement.removeEventListener("mousemove", this._boundOnMouseMove, !1), this.renderer.domElement.removeEventListener("mouseup", this._boundOnMouseUp, !1), this.controller1 && this.controller2 && (this.controller1.removeEventListener("selectstart", this._onVRTriggerDown), this.controller1.removeEventListener("selectend", this._onVRTriggerUp), this.controller2.removeEventListener("selectstart", this._onVRTriggerDown), this.controller2.removeEventListener("selectend", this._onVRTriggerUp), this.controller1.removeEventListener("ybuttondown", this._onVRYButtonDown), this.controller1.removeEventListener("ybuttonup", this._onVRYButtonUp), this.controller2.removeEventListener("ybuttondown", this._onVRYButtonDown), this.controller2.removeEventListener("ybuttonup", this._onVRYButtonUp)), this.clearDesktopMeasurement(), this.clearVRMeasurement(), this.ghostSpheres && (this.ghostSpheres.left && this.scene.remove(this.ghostSpheres.left), this.ghostSpheres.right && this.scene.remove(this.ghostSpheres.right), this.ghostSpheres = null), this.measurementSprite && this.scene.children.includes(this.measurementSprite) && (this.scene.remove(this.measurementSprite), this.measurementSprite = null), this.connectionLine && this.scene.children.includes(this.connectionLine) && (this.scene.remove(this.connectionLine), this.connectionLine = null), this.measurementSpheres = [], this.isVR = !1, typeof window < "u" && window.measurementSystem === this && (window.measurementSystem = void 0);
  }
  // --- UI Panel ---
  createMeasurementPanel() {
    const e = document.createElement("div");
    e.id = "measurementPanel", e.className = `measurement-panel${this.theme === "light" ? " light-theme" : ""}`, e.addEventListener("click", () => {
      this.renderer && this.renderer.xr && this.renderer.xr.isPresenting ? (this.measurementSystemEnabled = !this.measurementSystemEnabled, this.measurementSystemEnabled ? (this.ghostSpheres.left && (this.ghostSpheres.left.visible = !0), this.ghostSpheres.right && (this.ghostSpheres.right.visible = !0), this.resetGhostSpherePositions()) : (this.clearUnifiedMeasurement(), this.ghostSpheres.left && (this.ghostSpheres.left.visible = !1), this.ghostSpheres.right && (this.ghostSpheres.right.visible = !1)), this.updateMeasurementPanel()) : (this.desktopMeasurementMode = !this.desktopMeasurementMode, this.desktopMeasurementMode || this.clearUnifiedMeasurement(), this.updateMeasurementPanel());
    }), (this.renderer && this.renderer.domElement && this.renderer.domElement.parentElement || document.body).appendChild(e), this.measurementPanel = e;
  }
  updateMeasurementPanel() {
    const e = this.measurementPanel;
    if (!e) return;
    const t = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting, i = this.unifiedMeasurementPoints ? this.unifiedMeasurementPoints.length : 0, s = i === 2, o = t ? this.measurementSystemEnabled : this.desktopMeasurementMode;
    let n;
    if (s && (n = this.unifiedMeasurementPoints[0].position.distanceTo(this.unifiedMeasurementPoints[1].position)), e.classList.remove("disabled", "active", "measured"), !o)
      e.classList.add("disabled"), e.innerHTML = `
        <div>MEASURE</div>
        <div style="font-size: 12px; margin-top: 4px;">Click to enable</div>
      `;
    else if (s)
      e.classList.add("measured"), e.innerHTML = `
        <div>${n.toFixed(2)}m</div>
        <div style="font-size: 12px; margin-top: 4px;">Click to disable</div>
      `;
    else {
      e.classList.add("active");
      const a = t ? "Use triggers" : "Click points";
      e.innerHTML = `
        <div>MEASURE: ON</div>
        <div style="font-size: 12px; margin-top: 4px;">${a} (${i}/2)</div>
      `;
    }
  }
  // --- Desktop Measurement Events ---
  onMouseDown(e) {
    this.isDragging = !1, this.dragStartPosition.x = e.clientX, this.dragStartPosition.y = e.clientY;
  }
  onMouseMove(e) {
    if (!this.isDragging) {
      const t = Math.abs(e.clientX - this.dragStartPosition.x), i = Math.abs(e.clientY - this.dragStartPosition.y);
      (t > this.DRAG_THRESHOLD || i > this.DRAG_THRESHOLD) && (this.isDragging = !0);
    }
  }
  onMouseUp(e) {
    setTimeout(() => {
      this.isDragging = !1;
    }, 10);
  }
  onMouseClick(e) {
    const t = Date.now(), i = t - this.lastClickTime < 300;
    if (this.lastClickTime = t, this.isDragging || !this.desktopMeasurementMode)
      return;
    this.desktopMeasurementMode && (e.stopPropagation(), e.preventDefault());
    const s = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = (e.clientX - s.left) / s.width * 2 - 1, this.mouse.y = -((e.clientY - s.top) / s.height) * 2 + 1;
    let o = this.camera;
    if (this.renderer && this.renderer.xr && this.renderer.xr.isPresenting) {
      const A = this.renderer.xr.getCamera();
      A && (o = A);
    }
    if ((!o || !o.isPerspectiveCamera && !o.isOrthographicCamera) && this.scene && this.scene.children) {
      for (const A of this.scene.children)
        if (A.isCamera) {
          o = A;
          break;
        }
    }
    if ((!o || !o.isPerspectiveCamera && !o.isOrthographicCamera) && typeof window < "u" && window.camera && (window.camera.isPerspectiveCamera || window.camera.isOrthographicCamera) && (o = window.camera), !o || !o.isPerspectiveCamera && !o.isOrthographicCamera && o.type !== "ArrayCamera")
      return;
    this.raycaster.setFromCamera(this.mouse, o);
    const n = this._raycastTargets && this._raycastTargets.length > 0 ? this._raycastTargets : [];
    if (n.length === 0)
      return;
    const a = this.raycaster.intersectObjects(n, !0);
    if (a.length === 0)
      return;
    const r = a.filter((A) => {
      const c = this.unifiedMeasurementPoints.some((g) => g.sphere === A.object), h = A.object === this.unifiedMeasurementLine, d = this.isMeasurementHelper(A.object);
      return !c && !h && !d;
    });
    if (r.length > 0)
      if (i)
        this.focusOnPoint(r[0].point);
      else {
        const A = r[0].point;
        this.placeUnifiedMeasurementPoint(A, "desktop");
      }
  }
  focusOnPoint(e) {
    this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null);
    const t = this.controls.target.clone(), i = this.camera.position.clone(), s = i.clone().sub(t), o = e.clone().add(s), n = 1e3, a = performance.now(), r = () => {
      const A = performance.now() - a, c = Math.min(A / n, 1), h = 1 - Math.pow(1 - c, 3);
      this.controls.target.lerpVectors(t, e, h), this.camera.position.lerpVectors(i, o, h), c < 1 ? this.focusAnimation = requestAnimationFrame(r) : this.focusAnimation = null;
    };
    this.focusAnimation = requestAnimationFrame(r);
  }
  _focusOnPoint(e) {
    if (this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null), !this.controls || !this.camera) {
      console.warn("[MeasurementSystem] No controls or camera available for focusing");
      return;
    }
    const t = this.controls.target.clone(), i = this.camera.position.clone(), s = i.clone().sub(t), o = e.clone().add(s), n = 1e3, a = performance.now(), r = () => {
      const A = performance.now() - a, c = Math.min(A / n, 1), h = 1 - Math.pow(1 - c, 3);
      this.controls.target.lerpVectors(t, e, h), this.camera.position.lerpVectors(i, o, h), this.controls.update(), c < 1 ? this.focusAnimation = requestAnimationFrame(r) : this.focusAnimation = null;
    };
    this.focusAnimation = requestAnimationFrame(r);
  }
  /**
   * Refresh measurement display when entering VR
   * Called when VR mode is activated to ensure sprite is visible
   */
  refreshMeasurementDisplayForVR() {
    if (this.unifiedMeasurementPoints && this.unifiedMeasurementPoints.length === 2) {
      const e = this.unifiedMeasurementPoints[0].position, t = this.unifiedMeasurementPoints[1].position, i = e.distanceTo(t);
      if (this.createMeasurementDisplay(i), this.measurementSprite) {
        const s = new u.Vector3();
        s.addVectors(e, t), s.multiplyScalar(0.5);
        const o = Math.max(0.05, Math.min(0.2, i * 0.03));
        s.y += o, this.measurementSprite.position.copy(s), this.scene.children.includes(this.measurementSprite) || this.scene.add(this.measurementSprite), this.measurementSprite.visible = !0;
      }
    }
  }
  // Set measurement system state
}
class vt {
  constructor(e, t = {}) {
    this.vrManager = e, this.isComfortMode = !1, this.options = {
      containerId: t.containerId || "modelSelector",
      // Default to model selector
      useInlineLayout: t.useInlineLayout !== !1,
      // Default to true for inline layout
      position: t.position || "bottom-right",
      // Fallback for floating mode
      offsetX: t.offsetX || 20,
      offsetY: t.offsetY || 120,
      ...t
    }, this.element = null, this.init();
  }
  init() {
    this.createElement(), this.attachStyles(), this.attachEvents(), this.updateVisualState();
  }
  createElement() {
    this.options.useInlineLayout ? this.createInlineElement() : this.createFloatingElement();
  }
  createInlineElement() {
    const e = document.getElementById("modeToggleContainer");
    if (!e) {
      console.warn("VRComfortGlyph: modeToggleContainer not found, falling back to floating mode"), this.createFloatingElement();
      return;
    }
    this.element = document.createElement("div"), this.element.id = "vrComfortGlyph", this.element.className = "vr-comfort-circle comfort-off", this.element.textContent = "🛡️", this.element.tabIndex = 0, this.element.role = "button", this.element.title = "Comfort Mode: OFF (Smooth Movement)", this.element.setAttribute("aria-label", "Comfort Mode is OFF - Click to enable");
    const t = e.querySelector(".semantic-toggle");
    t ? e.insertBefore(this.element, t.nextSibling) : e.appendChild(this.element), this.updateInlineVisualState();
  }
  createFloatingElement() {
    this.element = document.createElement("div"), this.element.id = "vrComfortGlyph", this.element.className = "vr-comfort-glyph comfort-off", this.element.textContent = "🛡️", this.element.title = "Comfort Mode: OFF (Smooth Movement)", this.element.tabIndex = 0, this.element.role = "button", this.element.setAttribute("aria-label", "Comfort Mode is OFF - Click to enable comfortable movement");
    const e = this.options.containerId ? document.getElementById(this.options.containerId) : document.body;
    e ? e.appendChild(this.element) : (console.warn("VRComfortGlyph: Container not found, appending to body"), document.body.appendChild(this.element));
  }
  attachStyles() {
    if (document.getElementById("vr-comfort-glyph-styles"))
      return;
    const e = document.createElement("style");
    e.id = "vr-comfort-glyph-styles", e.textContent = `
      /* VR Comfort Glyph Styles */
      .vr-comfort-glyph {
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.6);
        border: 2px solid #666;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 20px;
        z-index: 10000;
        backdrop-filter: blur(10px);
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        touch-action: manipulation;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      /* Inline Comfort Circle Styles - matches Survey/Dive toggle design */
      .vr-comfort-circle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        font-size: 20px;
        margin-left: 15px;
        position: relative;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        touch-action: manipulation;
        overflow: hidden;
        flex-shrink: 0;
      }
      
      .vr-comfort-circle:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
        transform: scale(1.02);
      }
      
      .vr-comfort-circle:focus {
        outline: 2px solid #4ade80;
        outline-offset: 2px;
      }
      
      .vr-comfort-circle:active {
        transform: scale(0.98);
      }
      
      .vr-comfort-circle.comfort-off {
        color: rgba(255, 255, 255, 0.5) !important;
        background: rgba(255, 255, 255, 0.06) !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
        box-shadow: none !important;
      }
      
      .vr-comfort-circle.comfort-off:hover {
        color: rgba(255, 255, 255, 0.7) !important;
        background: rgba(255, 255, 255, 0.1) !important;
        border-color: rgba(255, 255, 255, 0.2) !important;
        box-shadow: none !important;
      }
      
      .vr-comfort-circle.comfort-on {
        color: #4ade80 !important;
        background: rgba(74, 222, 128, 0.1) !important;
        border-color: rgba(74, 222, 128, 0.3) !important;
        box-shadow: 0 0 20px rgba(74, 222, 128, 0.1) !important;
      }
      
      .vr-comfort-circle.comfort-on:hover {
        background: rgba(74, 222, 128, 0.15) !important;
        border-color: rgba(74, 222, 128, 0.4) !important;
        box-shadow: 0 0 30px rgba(74, 222, 128, 0.15) !important;
      }
      
      /* Update modeToggleContainer to flex layout */
      #modeToggleContainer {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 0 !important;
      }
      
      /* Ensure semantic toggle doesn't take full width */
      .semantic-toggle {
        flex-shrink: 0 !important;
      }
      
      /* Original floating glyph styles */
      .vr-comfort-glyph:hover {
        transform: scale(1.1);
        background: rgba(0, 0, 0, 0.8);
      }
      
      .vr-comfort-glyph:focus {
        outline: 3px solid #4ade80;
        outline-offset: 2px;
      }
      
      .vr-comfort-glyph.comfort-off {
        color: #666;
        border-color: #666;
        background: rgba(0, 0, 0, 0.6);
        box-shadow: none;
        filter: none;
      }
      
      .vr-comfort-glyph.comfort-on {
        color: #4ade80;
        border-color: #4ade80;
        background: rgba(74, 222, 128, 0.1);
        box-shadow: 0 0 20px rgba(74, 222, 128, 0.3);
        filter: drop-shadow(0 0 8px rgba(74, 222, 128, 0.4));
      }
      
      /* Position variants for floating mode */
      .vr-comfort-glyph.position-bottom-right {
        bottom: var(--vr-comfort-offset-y, 120px);
        right: var(--vr-comfort-offset-x, 20px);
      }
      
      .vr-comfort-glyph.position-bottom-left {
        bottom: var(--vr-comfort-offset-y, 120px);
        left: var(--vr-comfort-offset-x, 20px);
      }
      
      .vr-comfort-glyph.position-top-right {
        top: var(--vr-comfort-offset-y, 20px);
        right: var(--vr-comfort-offset-x, 20px);
      }
      
      .vr-comfort-glyph.position-top-left {
        top: var(--vr-comfort-offset-y, 20px);
        left: var(--vr-comfort-offset-x, 20px);
      }
      
      /* Mobile responsive */
      @media (max-width: 768px) {
        .vr-comfort-circle {
          width: 50px;
          height: 50px;
          font-size: 18px;
          margin-left: 10px;
        }
        
        #modeToggleContainer {
          flex-wrap: nowrap !important;
          justify-content: center !important;
        }
        
        
        .vr-comfort-glyph {
          width: 48px !important;
          height: 48px !important;
          font-size: 24px !important;
        }
        
        .vr-comfort-glyph.position-bottom-right {
          bottom: var(--vr-comfort-offset-y-mobile, 130px);
          right: var(--vr-comfort-offset-x-mobile, 15px);
        }
        
        .vr-comfort-glyph.position-bottom-left {
          bottom: var(--vr-comfort-offset-y-mobile, 130px);
          left: var(--vr-comfort-offset-x-mobile, 15px);
        }
      }
    `, document.head.appendChild(e), document.documentElement.style.setProperty("--vr-comfort-offset-x", this.options.offsetX + "px"), document.documentElement.style.setProperty("--vr-comfort-offset-y", this.options.offsetY + "px"), document.documentElement.style.setProperty("--vr-comfort-offset-x-mobile", this.options.offsetX - 5 + "px"), document.documentElement.style.setProperty("--vr-comfort-offset-y-mobile", this.options.offsetY + 10 + "px");
  }
  attachEvents() {
    if (!this.element) return;
    const e = () => {
      this.toggle();
    };
    this.element.addEventListener("click", e), this.element.addEventListener("keydown", (t) => {
      (t.key === "Enter" || t.key === " ") && (t.preventDefault(), e());
    });
  }
  updatePosition() {
    this.element && (this.element.classList.remove("position-bottom-right", "position-bottom-left", "position-top-right", "position-top-left"), this.element.classList.add(`position-${this.options.position}`));
  }
  updateVisualState() {
    this.element && (this.options.useInlineLayout ? this.updateInlineVisualState() : this.updateFloatingVisualState());
  }
  updateInlineVisualState() {
    this.element && (this.element.classList.remove("comfort-off", "comfort-on"), this.element.style.removeProperty("background"), this.element.style.removeProperty("border-color"), this.element.style.removeProperty("color"), this.element.style.removeProperty("box-shadow"), this.element.textContent = "🛡️", this.element.offsetHeight, this.isComfortMode ? (this.element.classList.add("comfort-on"), this.element.title = "Comfort Mode: ON (Teleport Movement)", this.element.setAttribute("aria-label", "Comfort Mode is ON - Click to disable")) : (this.element.classList.add("comfort-off"), this.element.title = "Comfort Mode: OFF (Smooth Movement)", this.element.setAttribute("aria-label", "Comfort Mode is OFF - Click to enable")), setTimeout(() => {
      this.element && this.element.offsetHeight;
    }, 0));
  }
  updateFloatingVisualState() {
    this.element && (this.updatePosition(), this.element.textContent = "🛡️", this.element.classList.remove("comfort-off", "comfort-on"), this.isComfortMode ? (this.element.classList.add("comfort-on"), this.element.title = "Comfort Mode: ON (Teleport Movement)", this.element.setAttribute("aria-label", "Comfort Mode is ON - Click to disable")) : (this.element.classList.add("comfort-off"), this.element.title = "Comfort Mode: OFF (Smooth Movement)", this.element.setAttribute("aria-label", "Comfort Mode is OFF - Click to enable comfortable movement")), this.element.style.display = "none", this.element.offsetHeight, this.element.style.display = "flex");
  }
  toggle() {
    this.isComfortMode = !this.isComfortMode, this.vrManager && (this.isComfortMode ? this.vrManager.setComfortPreset("max-comfort") : this.vrManager.setComfortPreset("performance")), this.updateVisualState();
    const e = new CustomEvent("vrcomfortchange", {
      detail: {
        isComfortMode: this.isComfortMode,
        preset: this.isComfortMode ? "max-comfort" : "performance"
      }
    });
    this.element.dispatchEvent(e);
  }
  setComfortMode(e) {
    this.isComfortMode !== e && this.toggle();
  }
  getComfortMode() {
    return this.isComfortMode;
  }
  updateOptions(e) {
    this.options = { ...this.options, ...e }, e.offsetX !== void 0 && (document.documentElement.style.setProperty("--vr-comfort-offset-x", this.options.offsetX + "px"), document.documentElement.style.setProperty("--vr-comfort-offset-x-mobile", this.options.offsetX - 5 + "px")), e.offsetY !== void 0 && (document.documentElement.style.setProperty("--vr-comfort-offset-y", this.options.offsetY + "px"), document.documentElement.style.setProperty("--vr-comfort-offset-y-mobile", this.options.offsetY + 10 + "px")), e.position !== void 0 && this.updatePosition();
  }
  hide() {
    this.element && (this.element.style.display = "none");
  }
  show() {
    this.element && (this.element.style.display = "flex");
  }
  dispose() {
    if (this.element && (this.element.removeEventListener("click", this.toggle), this.element.removeEventListener("keydown", this.toggle), this.element.parentNode && this.element.parentNode.removeChild(this.element), this.element = null), document.querySelectorAll(".vr-comfort-glyph").length === 0) {
      const t = document.getElementById("vr-comfort-glyph-styles");
      t && t.remove();
    }
    this.vrManager = null;
  }
  // Static method to create and initialize
  static create(e, t = {}) {
    return new vt(e, t);
  }
}
class Dn {
  constructor(e) {
    this.scene = e, this.particleBounds = {
      min: new u.Vector3(-50, -25, -50),
      max: new u.Vector3(50, 25, 50)
    }, this.particleCount = 1750, this.createParticleSystem();
  }
  /**
   * Calculate optimal particle count based on bounds (volume)
   * Matches WreckSploration logic
   */
  calculateParticleCount(e) {
    const t = new u.Vector3();
    e.getSize(t);
    const s = t.clone().multiplyScalar(2.5), o = s.x * s.y * s.z;
    let n;
    o < 5e3 ? n = 0.0625 : o < 2e4 ? n = 0.0625 + (o - 5e3) / 15e3 * 1.9375 : n = 3.5;
    const a = Math.round(o * n);
    return Math.max(100, Math.min(8e3, a));
  }
  /**
   * Create the complete particle system
   */
  createParticleSystem() {
    const e = new Float32Array(this.particleCount * 3), t = new Float32Array(this.particleCount * 3), i = new Float32Array(this.particleCount);
    this.initializeParticleData(e, t, i);
    const s = new u.BufferGeometry(), o = new Float32Array(this.particleCount);
    for (let n = 0; n < this.particleCount; n++)
      o[n] = n;
    s.setAttribute("position", new u.BufferAttribute(e, 3)), s.setAttribute("originalSize", new u.BufferAttribute(i, 1)), s.setAttribute("velocity", new u.BufferAttribute(t, 3)), s.setAttribute("particleIndex", new u.BufferAttribute(o, 1)), this.originalMaterial = this.createParticleMaterial(), this.particles = new u.Points(s, this.originalMaterial), this.particles.visible = !1, this.scene.add(this.particles);
  }
  /**
   * Initialize particle data arrays
   */
  initializeParticleData(e, t, i) {
    for (let s = 0; s < this.particleCount; s++) {
      const o = s * 3;
      e[o] = this.particleBounds.min.x + Math.random() * (this.particleBounds.max.x - this.particleBounds.min.x), e[o + 1] = this.particleBounds.min.y + Math.random() * (this.particleBounds.max.y - this.particleBounds.min.y), e[o + 2] = this.particleBounds.min.z + Math.random() * (this.particleBounds.max.z - this.particleBounds.min.z);
      const n = 1e-5, a = -5e-6, r = 5e-6;
      t[o] = n + (Math.random() - 0.5) * 2e-5, t[o + 1] = a + (-Math.random() * 1e-5 - 5e-6), t[o + 2] = r + (Math.random() - 0.5) * 2e-5;
      const A = Math.random();
      A < 0.7 ? i[s] = 0.03 + Math.random() * 0.02 : A < 0.9 ? i[s] = 0.05 + Math.random() * 0.03 : i[s] = 0.08 + Math.random() * 0.04;
    }
  }
  /**
   * Create particle material with GPU shaders
   */
  createParticleMaterial() {
    const e = document.createElement("canvas");
    e.width = e.height = 32;
    const t = e.getContext("2d"), i = t.createRadialGradient(16, 16, 0, 16, 16, 16);
    i.addColorStop(0, "rgba(255, 255, 255, 1)"), i.addColorStop(0.7, "rgba(255, 255, 255, 0.8)"), i.addColorStop(1, "rgba(255, 255, 255, 0)"), t.fillStyle = i, t.fillRect(0, 0, 32, 32);
    const s = new u.CanvasTexture(e);
    return s.needsUpdate = !0, new u.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointTexture: { value: s },
        color: { value: new u.Color(16777215) },
        opacity: { value: 1 },
        size: { value: 2 },
        boundsMin: { value: this.particleBounds.min.clone() },
        boundsMax: { value: this.particleBounds.max.clone() },
        fogColor: { value: new u.Color(268073) },
        fogDensity: { value: 0 }
      },
      vertexShader: `
        uniform float time;
        uniform float size;
        uniform vec3 boundsMin;
        uniform vec3 boundsMax;
        
        attribute float originalSize;
        attribute vec3 velocity;
        attribute float particleIndex;
        
        varying float vOpacity;
        varying float vFogFactor;
        
        void main() {
          // Calculate animated position
          vec3 animatedPosition = position;
          
          // Apply constant velocity drift
          animatedPosition += velocity * time;
          
          // Add gentle wave motion
          float waveX = sin(time * 0.00025 + particleIndex * 0.01) * 0.5;
          float waveY = cos(time * 0.0002 + particleIndex * 0.008) * 0.25;
          float waveZ = sin(time * 0.0003 + particleIndex * 0.012) * 0.5;
          animatedPosition += vec3(waveX, waveY, waveZ);
          
          // Boundary wrapping
          vec3 boundsSize = boundsMax - boundsMin;
          animatedPosition = boundsMin + mod(animatedPosition - boundsMin, boundsSize);
          
          // Size calculation
          float finalSize = originalSize * size;
          
          // Transform to screen space
          vec4 mvPosition = modelViewMatrix * vec4(animatedPosition, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Size attenuation
          gl_PointSize = finalSize * (300.0 / -mvPosition.z);
          
          // Calculate fog factor for exponential squared fog
          float fogDistance = -mvPosition.z;
          vFogFactor = 1.0 - exp(-fogDistance * fogDistance * 0.0064);
          vFogFactor = clamp(vFogFactor, 0.0, 1.0);
          
          // Simple opacity variation
          vOpacity = 0.8 + sin(particleIndex * 0.1) * 0.2;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        uniform vec3 color;
        uniform float opacity;
        uniform vec3 fogColor;
        
        varying float vOpacity;
        varying float vFogFactor;
        
        void main() {
          // Sample the circular texture
          vec4 textureColor = texture2D(pointTexture, gl_PointCoord);
          
          // Base particle color
          vec3 finalColor = color;
          
          // Apply fog mixing
          finalColor = mix(finalColor, fogColor, vFogFactor);
          
          // Final alpha with fog consideration
          float finalAlpha = textureColor.a * opacity * vOpacity * (1.0 - vFogFactor * 0.8);
          
          gl_FragColor = vec4(finalColor, finalAlpha);
          
          // Alpha test
          if (gl_FragColor.a < 0.01) discard;
        }
      `,
      transparent: !0,
      depthWrite: !1,
      blending: u.NormalBlending,
      fog: !1
    });
  }
  /**
   * Enable particles
   */
  enable() {
    this.particles && (this.particles.material = this.originalMaterial, this.particles.visible = !0);
  }
  /**
   * Disable particles
   */
  disable() {
    this.particles && (this.particles.visible = !1);
  }
  /**
   * Update particle system (call in animation loop)
   */
  update(e) {
    this.particles && this.particles.material && this.particles.material.uniforms && (this.particles.material.uniforms.time.value = e);
  }
  /**
   * Update particle boundaries based on model
   */
  updateBounds(e) {
    if (!e) return;
    const t = new u.Box3().setFromObject(e), i = t.getSize(new u.Vector3()), s = t.getCenter(new u.Vector3()), n = i.clone().multiplyScalar(2.5 * 0.5);
    this.particleBounds.min.copy(s).sub(n), this.particleBounds.max.copy(s).add(n);
    const a = this.calculateParticleCount(new u.Box3(this.particleBounds.min, this.particleBounds.max));
    Math.abs(a - this.particleCount) > this.particleCount * 0.2 ? (this.particles && (this.scene.remove(this.particles), this.particles.geometry && this.particles.geometry.dispose(), this.particles.material && this.particles.material.dispose(), this.particles = null), this.particleCount = a, this.createParticleSystem()) : this.redistributeParticles();
  }
  /**
   * Redistribute particles within current bounds
   */
  redistributeParticles() {
    if (!this.particles || !this.particles.geometry.attributes.position) return;
    const e = this.particles.geometry.attributes.position.array;
    for (let t = 0; t < this.particleCount; t++) {
      const i = t * 3;
      e[i] = this.particleBounds.min.x + Math.random() * (this.particleBounds.max.x - this.particleBounds.min.x), e[i + 1] = this.particleBounds.min.y + Math.random() * (this.particleBounds.max.y - this.particleBounds.min.y), e[i + 2] = this.particleBounds.min.z + Math.random() * (this.particleBounds.max.z - this.particleBounds.min.z);
    }
    this.particles.geometry.attributes.position.needsUpdate = !0, this.particles.material.uniforms && (this.particles.material.uniforms.boundsMin.value.copy(this.particleBounds.min), this.particles.material.uniforms.boundsMax.value.copy(this.particleBounds.max));
  }
  /**
   * Update fog uniforms for shader material
   */
  updateFog(e) {
    this.particles && this.particles.material && this.particles.material.uniforms && (e ? (this.particles.material.uniforms.fogColor.value.copy(e.color), this.particles.material.uniforms.fogDensity.value = e.density) : this.particles.material.uniforms.fogDensity.value = 0);
  }
  /**
   * Dispose of particle system
   */
  dispose() {
    this.particles && (this.scene.remove(this.particles), this.particles.geometry && this.particles.geometry.dispose(), this.particles.material && this.particles.material.dispose(), this.particles = null);
  }
}
class Rn {
  constructor(e) {
    this.scene = e, this.controllerSpotlight = null, this.spotlightTarget = null, this.isQuest2 = !1, this.isQuest3 = !1, this.detectQuestDevice(), this.createSpotlight();
  }
  /**
   * Detect Quest device type for optimization
   */
  detectQuestDevice() {
    try {
      const e = navigator.userAgent.toLowerCase();
      return e.includes("quest 2") || e.includes("oculus quest 2") || e.includes("oculus") && e.includes("android") && !e.includes("quest 3") ? (this.isQuest2 = !0, "quest2") : e.includes("quest 3") || e.includes("oculus quest 3") || e.includes("meta quest 3") ? (this.isQuest3 = !0, "quest3") : "unknown";
    } catch (e) {
      return console.warn("Device detection failed:", e), "unknown";
    }
  }
  /**
   * Create/recreate the spotlight
   */
  createSpotlight(e = 25) {
    this.controllerSpotlight && (this.scene.remove(this.controllerSpotlight), this.scene.remove(this.spotlightTarget));
    const t = e * Math.PI / 180, i = (this.isQuest2, 15);
    this.controllerSpotlight = new u.SpotLight(
      16777215,
      // Pure white light
      2.5,
      // Realistic underwater torch intensity
      i,
      // Adjustable distance based on device
      t,
      // Configurable beam width in radians
      0.15,
      // Softer penumbra for more realistic falloff
      0.8
      // Higher decay for realistic underwater attenuation
    ), this.controllerSpotlight.position.set(0, 0, 0), this.controllerSpotlight.visible = !0, this.controllerSpotlight.castShadow = !0;
    const s = this.isQuest2 ? 512 : 1024;
    this.controllerSpotlight.shadow.mapSize.width = s, this.controllerSpotlight.shadow.mapSize.height = s, this.controllerSpotlight.shadow.camera.near = 0.1, this.controllerSpotlight.shadow.camera.far = i, this.controllerSpotlight.shadow.camera.fov = e, this.controllerSpotlight.shadow.bias = -5e-4, this.controllerSpotlight.shadow.normalBias = 0.02, this.controllerSpotlight.shadow.radius = 4, this.controllerSpotlight.shadow.blurSamples = 10, this.scene.add(this.controllerSpotlight), this.spotlightTarget = new u.Object3D(), this.scene.add(this.spotlightTarget), this.controllerSpotlight.target = this.spotlightTarget;
  }
  /**
   * Enable torch for dive mode
   */
  enableTorch() {
    this.controllerSpotlight ? this.controllerSpotlight.visible = !0 : console.error("Cannot enable torch - controllerSpotlight is null");
  }
  /**
   * Disable torch for survey mode
   */
  disableTorch() {
    this.controllerSpotlight && (this.controllerSpotlight.visible = !1);
  }
  /**
   * Update torch position based on controller
   */
  updatePosition(e) {
    if (!this.controllerSpotlight || !this.spotlightTarget || !e) {
      e || console.warn("updatePosition called with null controller");
      return;
    }
    const t = new u.Vector3(), i = new u.Quaternion();
    e.getWorldPosition(t), e.getWorldQuaternion(i), this.controllerSpotlight.position.copy(t);
    const s = new u.Vector3(0, 0, -1);
    s.applyQuaternion(i);
    const o = t.clone().add(s.multiplyScalar(2));
    this.spotlightTarget.position.copy(o);
  }
  /**
   * Update torch position for non-VR mode (follow camera)
   */
  updateCameraPosition(e) {
    if (!this.controllerSpotlight || !this.spotlightTarget) return;
    this.controllerSpotlight.position.copy(e.position);
    const t = new u.Vector3(0, 0, -1);
    t.applyQuaternion(e.quaternion);
    const i = e.position.clone().add(t.multiplyScalar(8));
    this.spotlightTarget.position.copy(i);
  }
  /**
   * Set torch intensity
   */
  setIntensity(e) {
    this.controllerSpotlight && (this.controllerSpotlight.intensity = e);
  }
  /**
   * Set torch color
   */
  setColor(e) {
    this.controllerSpotlight && this.controllerSpotlight.color.setHex(e);
  }
  /**
   * Set torch beam width
   */
  setBeamWidth(e) {
    if (this.controllerSpotlight) {
      const t = e * Math.PI / 180;
      this.controllerSpotlight.angle = t, this.controllerSpotlight.shadow.camera.fov = e, this.controllerSpotlight.shadow.camera.updateProjectionMatrix();
    }
  }
  /**
   * Set torch distance
   */
  setDistance(e) {
    this.controllerSpotlight && (this.controllerSpotlight.distance = e, this.controllerSpotlight.shadow.camera.far = e, this.controllerSpotlight.shadow.camera.updateProjectionMatrix());
  }
  /**
   * Get torch visibility state
   */
  isVisible() {
    return this.controllerSpotlight ? this.controllerSpotlight.visible : !1;
  }
  /**
   * Update torch system (call in animation loop)
   */
  update(e) {
  }
  /**
   * Dispose of torch resources
   */
  dispose() {
    this.controllerSpotlight && (this.scene.remove(this.controllerSpotlight), this.controllerSpotlight = null), this.spotlightTarget && (this.scene.remove(this.spotlightTarget), this.spotlightTarget = null);
  }
}
class Tn {
  constructor(e) {
    this.scene = e, this.overheadLight = null, this.clearModeDirectionalLight = null, this.clearModeHemisphereLight = null, this.isTransitioning = !1, this.currentMode = "survey", this.pendingAnimations = /* @__PURE__ */ new Set(), this.isDisposed = !1, this.initializeLighting();
  }
  /**
   * Initialize lighting system with minimal setup
   */
  initializeLighting() {
    if (this.isDisposed || !this.scene) {
      console.warn("Cannot initialize lighting: system disposed or no scene");
      return;
    }
    try {
      this.overheadLight = new u.AmbientLight(16777215, 0.5), this.currentMode = null;
    } catch (e) {
      console.error("Failed to initialize lighting system:", e);
    }
  }
  /**
   * Create survey mode lights
   */
  createSurveyModeLights() {
    if (!(this.isDisposed || !this.scene))
      try {
        this.clearModeDirectionalLight || (this.clearModeDirectionalLight = new u.DirectionalLight(16777215, 1.2), this.clearModeDirectionalLight.position.set(10, 20, 10), this.clearModeDirectionalLight.castShadow = !0, this.clearModeDirectionalLight.shadow.mapSize.width = 2048, this.clearModeDirectionalLight.shadow.mapSize.height = 2048, this.clearModeDirectionalLight.shadow.camera.near = 0.5, this.clearModeDirectionalLight.shadow.camera.far = 100, this.clearModeDirectionalLight.shadow.camera.left = -20, this.clearModeDirectionalLight.shadow.camera.right = 20, this.clearModeDirectionalLight.shadow.camera.top = 20, this.clearModeDirectionalLight.shadow.camera.bottom = -20, this.scene.add(this.clearModeDirectionalLight)), this.clearModeHemisphereLight || (this.clearModeHemisphereLight = new u.HemisphereLight(16777215, 4473924, 0.7), this.scene.add(this.clearModeHemisphereLight)), this.fillLight || (this.fillLight = new u.DirectionalLight(16777215, 0.8), this.fillLight.position.set(-10, 10, -10), this.scene.add(this.fillLight)), this.bottomLight || (this.bottomLight = new u.DirectionalLight(16777215, 0.3), this.bottomLight.position.set(0, -10, 0), this.scene.add(this.bottomLight));
      } catch (e) {
        console.error("Failed to create survey mode lights:", e);
      }
  }
  /**
   * Enable dive mode lighting
   */
  enableDiveMode() {
    this.overheadLight && this.scene.children.includes(this.overheadLight) && this.scene.remove(this.overheadLight), this.clearModeDirectionalLight && (this.scene.remove(this.clearModeDirectionalLight), this.clearModeDirectionalLight = null), this.clearModeHemisphereLight && (this.scene.remove(this.clearModeHemisphereLight), this.clearModeHemisphereLight = null), this.fillLight && (this.scene.remove(this.fillLight), this.fillLight = null), this.bottomLight && (this.scene.remove(this.bottomLight), this.bottomLight = null), this.currentMode = "dive";
  }
  /**
   * Enable survey mode lighting
   */
  enableSurveyMode() {
    this.overheadLight && !this.scene.children.includes(this.overheadLight) && this.scene.add(this.overheadLight), this.overheadLight && (this.overheadLight.intensity = 0.6, this.overheadLight.color.setHex(16777215)), this.createSurveyModeLights(), this.currentMode = "survey";
  }
  /**
   * Set VR dive mode lighting
   */
  setVRDiveMode() {
    this.overheadLight && this.scene.children.includes(this.overheadLight) && this.scene.remove(this.overheadLight);
  }
  /**
   * Set desktop dive mode lighting
   */
  setDesktopDiveMode() {
    this.overheadLight && this.scene.children.includes(this.overheadLight) && this.scene.remove(this.overheadLight);
  }
  /**
   * Fade lighting helper function
   */
  fadeLighting({ target: e, fromIntensity: t, toIntensity: i, fromColor: s, toColor: o, duration: n = 500, onComplete: a }) {
    if (this.isDisposed || !e) {
      a && a();
      return;
    }
    const r = Symbol("fade-animation");
    this.pendingAnimations.add(r);
    const A = performance.now(), c = i - t;
    let h, d;
    s !== void 0 && o !== void 0 && (h = new u.Color(s), d = new u.Color(o));
    const g = (p) => {
      if (!this.pendingAnimations.has(r) || this.isDisposed) {
        a && a();
        return;
      }
      try {
        const C = p - A, E = Math.min(C / n, 1), m = 1 - Math.pow(1 - E, 3);
        if (!e || this.scene && !this.scene.children.includes(e)) {
          this.pendingAnimations.delete(r), a && a();
          return;
        }
        e.intensity = t + c * m, h && d && e.color && e.color.lerpColors(h, d, m), E < 1 ? requestAnimationFrame(g) : (this.pendingAnimations.delete(r), a && a());
      } catch (C) {
        console.error("Error in lighting animation:", C), this.pendingAnimations.delete(r), a && a();
      }
    };
    requestAnimationFrame(g);
  }
  /**
   * Cancel all active animations
   */
  cancelActiveAnimations() {
    this.pendingAnimations.clear();
  }
  /**
   * Safely remove object from scene
   */
  safeRemoveFromScene(e) {
    if (this.scene && e && this.scene.children.includes(e))
      try {
        this.scene.remove(e);
      } catch (t) {
        console.error("Error removing object from scene:", t);
      }
  }
  /**
   * Get current lighting mode
   */
  getCurrentMode() {
    return this.currentMode;
  }
  /**
   * Check if system is transitioning
   */
  isTransitionInProgress() {
    return this.isTransitioning;
  }
  /**
   * Dispose of lighting resources
   */
  dispose() {
    this.isDisposed = !0, this.cancelActiveAnimations(), requestAnimationFrame(() => {
      try {
        this.overheadLight && (this.safeRemoveFromScene(this.overheadLight), this.overheadLight = null), this.clearModeDirectionalLight && (this.safeRemoveFromScene(this.clearModeDirectionalLight), this.clearModeDirectionalLight = null), this.clearModeHemisphereLight && (this.safeRemoveFromScene(this.clearModeHemisphereLight), this.clearModeHemisphereLight = null), this.scene = null;
      } catch (e) {
        console.error("Error during lighting system disposal:", e);
      }
    });
  }
}
class kn {
  constructor(e, t, i) {
    this.scene = e, this.renderer = t, this.camera = i, this.isDiveModeEnabled = !1, this.currentVRMode = null, this.lighting = new Tn(e), this.particles = new Dn(e), this.torch = new Rn(e), this.isQuest2 = !1, this.isQuest3 = !1, this.detectQuestDevice(), this.applyModeSettings();
  }
  /**
   * Toggle between dive and survey modes
   */
  toggleDiveMode() {
    this.isDiveModeEnabled, this.isDiveModeEnabled = !this.isDiveModeEnabled;
    const e = document.getElementById("modeToggleSwitch");
    e && (e.checked = this.isDiveModeEnabled), this.applyModeSettings();
  }
  /**
   * Set dive mode directly
   */
  setDiveMode(e) {
    this.isDiveModeEnabled !== e && this.toggleDiveMode();
  }
  /**
   * Get current mode state
   */
  isDiveMode() {
    return this.isDiveModeEnabled;
  }
  /**
   * Detect Quest device type for optimization
   */
  detectQuestDevice() {
    try {
      const e = navigator.userAgent.toLowerCase();
      return e.includes("quest 2") || e.includes("oculus quest 2") || e.includes("oculus") && e.includes("android") && !e.includes("quest 3") ? (this.isQuest2 = !0, "quest2") : e.includes("quest 3") || e.includes("oculus quest 3") || e.includes("meta quest 3") ? (this.isQuest3 = !0, "quest3") : "unknown";
    } catch (e) {
      return console.warn("Device detection failed:", e), "unknown";
    }
  }
  /**
   * Apply Quest-specific optimizations
   */
  applyQuestOptimizations() {
    this.isQuest2 ? (this.camera.far = 20, this.camera.updateProjectionMatrix(), this.isDiveModeEnabled && (this.scene.fog = new u.FogExp2(268073, 0.084))) : (this.camera.far = 2e3, this.camera.updateProjectionMatrix(), this.isDiveModeEnabled && (this.scene.fog = new u.FogExp2(268073, 0.056)));
  }
  /**
   * Apply mode-specific settings for VR vs Desktop
   */
  applyModeSpecificSettings() {
    const e = this.renderer.xr.isPresenting;
    if (this.currentVRMode !== e) {
      if (this.currentVRMode = e, !this.isDiveModeEnabled) {
        this.scene.fog = null;
        return;
      }
      e ? (this.scene.fog = new u.FogExp2(268073, 0.056), this.lighting.setVRDiveMode(), this.isDiveModeEnabled && this.torch.enableTorch()) : (this.scene.fog = new u.FogExp2(268073, 5e-3), this.lighting.setDesktopDiveMode()), this.particles.updateFog(this.scene.fog);
    }
  }
  /**
   * Apply all mode-specific settings
   */
  applyModeSettings() {
    this.isDiveModeEnabled ? this.enableDiveMode() : this.disableDiveMode();
  }
  /**
   * Enable dive mode (fog + particles + torch)
   */
  enableDiveMode() {
    this.lighting.enableDiveMode(), this.applyQuestOptimizations(), this.particles.enable(), this.torch.enableTorch();
  }
  /**
   * Disable dive mode (no fog + no particles) - Survey Mode
   */
  disableDiveMode() {
    this.scene.fog = null, this.particles.disable(), this.torch.disableTorch(), this.lighting.enableSurveyMode();
  }
  /**
   * Update particle boundaries based on model
   */
  updateParticleBounds(e) {
    e ? this.particles.updateBounds(e) : console.warn("updateParticleBounds called with no model");
  }
  /**
   * Update torch position (for VR controllers)
   */
  updateTorchPosition(e) {
    this.isDiveModeEnabled && this.torch.updatePosition(e);
  }
  /**
   * Update torch position using the right-hand VR controller (if present)
   * Call this in your animation loop for VR torch tracking.
   */
  updateTorchFromRightController() {
    if (!this.renderer.xr.isPresenting || !this.isDiveModeEnabled) return;
    const e = this.renderer.xr.getSession && this.renderer.xr.getSession();
    if (!e) return;
    const t = e.inputSources;
    for (let i = 0; i < t.length; i++)
      if (t[i].handedness === "right") {
        const s = this.renderer.xr.getController(i);
        this.updateTorchPosition(s);
        break;
      }
  }
  /**
   * Update torch position using VRManager (recommended approach)
   * This uses the VRManager's synced controller properties for consistency
   */
  updateTorchFromVRManager(e) {
    if (!e || !e.isVRPresenting || !this.isDiveModeEnabled) {
      e ? e.isVRPresenting && this.isDiveModeEnabled : console.warn("updateTorchFromVRManager: vrManager is null");
      return;
    }
    if (e.controller2)
      this.updateTorchPosition(e.controller2);
    else if (e.controllers && e.controllers.length > 0) {
      const t = e.controllers.find(
        (i) => i.userData && i.userData.inputSource && i.userData.inputSource.handedness === "right"
      );
      t && this.updateTorchPosition(t);
    }
  }
  /**
   * Update system (call in animation loop)
   */
  update(e, t) {
    this.particles.update(e), this.torch.update(t), this.renderer && this.checkVRControllerButtons(this.renderer), this.applyModeSpecificSettings();
  }
  /**
   * Initialize UI toggle switch
   */
  initializeToggleSwitch() {
    const e = document.getElementById("modeToggleSwitch");
    e ? (e.checked = !1, this.isDiveModeEnabled = !1, this.disableDiveMode(), e.addEventListener("change", () => {
      this.toggleDiveMode();
    })) : this.disableDiveMode(), document.querySelectorAll(".toggle-option").forEach((i) => {
      i.addEventListener("click", () => {
        const s = i.classList.contains("right"), o = e ? e.checked : !1;
        (s && !o || !s && o) && this.toggleDiveMode();
      });
    });
  }
  /**
   * Handle VR controller button presses for mode switching
   */
  handleControllerButton(e, t) {
    return t === 4 ? (this.toggleDiveMode(), !0) : !1;
  }
  /**
   * Check VR controller buttons for mode switching
   * This replaces the button checking logic that was in the example
   */
  checkVRControllerButtons(e) {
    if (!e || !e.xr) return;
    const t = e.xr.getSession();
    if (t) {
      for (let i of t.inputSources)
        if (i.gamepad && i.handedness) {
          const s = i.gamepad, o = i.handedness;
          [4, 5].forEach((a) => {
            if (s.buttons[a]) {
              const r = s.buttons[a], A = `${o}-${a}`;
              this.buttonStates || (this.buttonStates = /* @__PURE__ */ new Map());
              const c = this.buttonStates.get(A) || !1, h = r.pressed;
              h && !c && this.toggleDiveMode(), this.buttonStates.set(A, h);
            }
          });
        }
    }
  }
  /**
   * Dispose of all resources
   */
  dispose() {
    this.lighting.dispose(), this.particles.dispose(), this.torch.dispose();
  }
}
class Ln extends qe {
  constructor(e = {}) {
    super(), this.viewer = e.viewer, this.scene = e.scene, this.camera = e.camera, this.renderer = e.renderer, this.controls = e.controls, this.canvas = e.canvas, this.container = e.container || document.body, this.options = {
      markerColor: "#FFFFFF",
      markerBorderColor: "#2D3748",
      markerTextColor: "#2D3748",
      markerSize: 0.6,
      maxMarkers: 99,
      autoSave: !0,
      occludedOpacity: 0.3,
      ...e
    }, this.annotations = [], this.markers = /* @__PURE__ */ new Map(), this.activePanel = null, this.activeCard = null, this.activeAnnotation = null, this.editMode = !1, this.nextIndex = 1, this.currentAnimation = null, this.cardClickOutsideHandler = null, this.renderLoopId = null, this.cardPositionUpdateId = null, this.raycaster = new u.Raycaster(), this.mouse = new u.Vector2(), this._raycastTargets = [], this.init();
  }
  init() {
    this.setupEventListeners(), this.setupAnnotationSyncing();
  }
  setupAnnotationSyncing() {
    this.on("annotationUpdated", (e) => {
      e.source === "manager" && this.activeCard && this.activeAnnotation && this.activeAnnotation.id === e.annotation.id && this.updateActiveCard(e.updates);
    });
  }
  updateActiveCard(e) {
    this.activeCard && Object.keys(e).forEach((t) => {
      const i = this.activeCard.querySelector(`[data-field="${t}"]`);
      i && (i.textContent = e[t]);
    });
  }
  /**
   * Start render loop for marker scaling
   */
  startRenderLoop() {
    const e = () => {
      this.markers.size > 0 && this.updateAllMarkerScales(), this.renderLoopId = requestAnimationFrame(e);
    };
    this.renderLoopId = requestAnimationFrame(e);
  }
  /**
   * Stop render loop
   */
  stopRenderLoop() {
    this.renderLoopId && (cancelAnimationFrame(this.renderLoopId), this.renderLoopId = null);
  }
  /**
   * Called when model is loaded and raycast targets are set
   * This is when we should load annotations from storage
   */
  onModelLoaded() {
    this.loadAnnotationsFromStorage();
  }
  /**
   * Set raycast targets (model geometry) for annotation placement
   * @param {THREE.Object3D|THREE.Object3D[]} targets - Model objects to raycast against
   */
  setRaycastTargets(e) {
    if (!e) {
      this._raycastTargets = [];
      return;
    }
    const t = Array.isArray(e) ? e : [e], i = [];
    t.forEach((s) => {
      s && s.type === "Mesh" ? i.push(s) : s && s.children && s.traverse((o) => {
        o.type === "Mesh" && i.push(o);
      });
    }), this._raycastTargets = i;
  }
  setupEventListeners() {
    if (!this.canvas) {
      console.warn("No canvas found for annotation system event listeners");
      return;
    }
    this.canvas.addEventListener("click", (e) => {
      this.editMode ? this.handleEditModeClick(e) : this.handleViewModeClick(e);
    }), this.canvas.addEventListener("mousemove", (e) => {
      this.handleMouseMove(e);
    }), this.canvas.addEventListener("mouseleave", () => {
      this.clearAllHoverStates();
    }), this.canvas.addEventListener("mousedown", () => {
      this.currentAnimation && this.stopCameraAnimation();
    }), this.controls && this.controls.addEventListener("start", () => {
      this.currentAnimation && this.stopCameraAnimation();
    }), document.addEventListener("keydown", (e) => {
      e.key === "Escape" && (this.hideAnnotationCard(), this.currentAnimation && this.stopCameraAnimation());
    });
  }
  /**
   * Annotation Data Schema Validation
   */
  validateAnnotationData(e) {
    const t = {
      version: "string",
      modelId: "string",
      annotations: "array",
      tourSettings: "object"
    };
    if (!e || typeof e != "object")
      throw new Error("Invalid annotation data: must be an object");
    for (const [i, s] of Object.entries(t))
      if (i !== "tourSettings") {
        if (!(i in e))
          throw new Error(`Missing required field: ${i}`);
        if (s === "array") {
          if (!Array.isArray(e[i]))
            throw new Error(`Invalid type for ${i}: expected ${s}, got ${typeof e[i]}`);
        } else if (typeof e[i] !== s)
          throw new Error(`Invalid type for ${i}: expected ${s}, got ${typeof e[i]}`);
      }
    if (!Array.isArray(e.annotations))
      throw new Error("annotations must be an array");
    return e.annotations.forEach((i, s) => {
      this.validateAnnotation(i, s);
    }), !0;
  }
  validateAnnotation(e, t = 0) {
    const i = ["id", "index", "position", "title"];
    for (const s of i)
      if (!(s in e))
        throw new Error(`Annotation ${t}: missing required field '${s}'`);
    if (!this.isValidVector3(e.position))
      throw new Error(`Annotation ${t}: invalid position vector`);
    if (e.normal && !this.isValidVector3(e.normal))
      throw new Error(`Annotation ${t}: invalid normal vector`);
    if (e.cameraView && (!this.isValidVector3(e.cameraView.position) || !this.isValidVector3(e.cameraView.target)))
      throw new Error(`Annotation ${t}: invalid camera view`);
    return !0;
  }
  isValidVector3(e) {
    return e && typeof e == "object" && typeof e.x == "number" && typeof e.y == "number" && typeof e.z == "number";
  }
  /**
   * Create default annotation data structure
   */
  createAnnotationData() {
    return {
      version: "1.0",
      modelId: this.viewer.currentModel || "default",
      annotations: this.annotations,
      tourSettings: {
        defaultDuration: 8e3,
        transitionDuration: 2e3,
        vrTeleportEnabled: !0
      }
    };
  }
  /**
   * Edit Mode - Place new annotations
   */
  enterEditMode() {
    this.editMode = !0, this.canvas && this.canvas.style && (this.canvas.style.cursor = "crosshair"), console.log("Entered annotation edit mode");
  }
  exitEditMode() {
    this.editMode = !1, this.canvas && this.canvas.style && (this.canvas.style.cursor = "default"), console.log("Exited annotation edit mode");
  }
  handleEditModeClick(e) {
    if (e.preventDefault(), !this._raycastTargets || this._raycastTargets.length === 0) {
      console.warn("No raycast targets set for annotation placement");
      return;
    }
    const t = this.canvas.getBoundingClientRect();
    if (this.mouse.x = (e.clientX - t.left) / t.width * 2 - 1, this.mouse.y = -((e.clientY - t.top) / t.height) * 2 + 1, !this.camera) {
      console.warn("No camera found for raycasting");
      return;
    }
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const i = this.raycaster.intersectObjects(this._raycastTargets, !0);
    if (i.length > 0) {
      const s = i[0];
      this.createAnnotationAtPoint(s.point, s.face.normal);
    }
  }
  handleViewModeClick(e) {
    e.preventDefault();
    const t = this.canvas.getBoundingClientRect();
    if (this.mouse.x = (e.clientX - t.left) / t.width * 2 - 1, this.mouse.y = -((e.clientY - t.top) / t.height) * 2 + 1, !this.camera) {
      console.warn("No camera found for raycasting");
      return;
    }
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const i = Array.from(this.markers.values()), s = this.raycaster.intersectObjects(i);
    if (s.length > 0) {
      const o = s[0].object, n = this.annotations.find((a) => a.id === o.userData.annotationId);
      n && this.selectAnnotation(n);
    } else
      this.hideAnnotationCard();
  }
  createAnnotationAtPoint(e, t = null) {
    const s = {
      id: `annotation_${this.nextIndex}`,
      index: this.nextIndex,
      position: { x: e.x, y: e.y, z: e.z },
      normal: t ? { x: t.x, y: t.y, z: t.z } : { x: 0, y: 1, z: 0 },
      title: `Annotation ${this.nextIndex}`,
      description: "Click to edit this annotation description",
      cameraView: this.getCurrentCameraView(),
      metadata: {
        created: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
    this.addAnnotation(s), this.selectAnnotation(s);
  }
  addAnnotation(e) {
    this.annotations.push(e), this.createMarker(e), this.nextIndex++, this.options.autoSave && this.saveAnnotationsToStorage(), this.emit("annotationAdded", { annotation: e }), this.emit("annotationsChanged", { annotations: this.annotations }), console.log("Added annotation:", e);
  }
  createMarker(e) {
    const t = this.createMarkerTexture(e, "normal"), i = new u.SpriteMaterial({
      map: t,
      transparent: !0,
      alphaTest: 0.1,
      depthTest: !1,
      // Always visible on top for now - we can add occlusion later if needed
      depthWrite: !1,
      opacity: 0.7
      // Lower default opacity so selected state is more obvious
    });
    i.userData = {
      annotation: e,
      normalTexture: t,
      hoverTexture: null,
      selectedTexture: null,
      isHovered: !1,
      isSelected: !1
    };
    const s = new u.Sprite(i);
    return s.position.set(e.position.x, e.position.y, e.position.z), s.userData.annotationId = e.id, s.userData.annotationType = "marker", s.userData.baseSize = this.options.markerSize, this.updateMarkerScale(s), this.markers.set(e.id, s), this.scene && this.scene.add(s), s;
  }
  createMarkerTexture(e, t = "normal") {
    const i = document.createElement("canvas"), s = i.getContext("2d"), o = 256;
    i.width = i.height = o;
    const n = o / 2, a = 100;
    s.imageSmoothingEnabled = !0, s.imageSmoothingQuality = "high";
    let r = this.options.markerColor, A = this.options.markerBorderColor, c = this.options.markerTextColor, h = 0.3, d = !1, g = !1;
    t === "hover" ? (r = "#FFFFFF", A = "#1A202C", d = !0, h = 0.4) : t === "selected" && (r = "#64B5F6", A = "#1976D2", c = "#FFFFFF", g = !0, h = 0.6), s.save(), s.shadowColor = `rgba(0, 0, 0, ${h})`, s.shadowBlur = t === "selected" ? 12 : 8, s.shadowOffsetX = 2, s.shadowOffsetY = 2, s.fillStyle = r, s.beginPath(), s.arc(n, n, a, 0, Math.PI * 2), s.fill(), s.restore(), g && (s.save(), s.shadowColor = "rgba(25, 118, 210, 0.8)", s.shadowBlur = 25, s.strokeStyle = "rgba(25, 118, 210, 0.9)", s.lineWidth = 4, s.beginPath(), s.arc(n, n, a + 8, 0, Math.PI * 2), s.stroke(), s.shadowColor = "rgba(100, 181, 246, 0.6)", s.shadowBlur = 15, s.strokeStyle = "rgba(100, 181, 246, 0.7)", s.lineWidth = 2, s.beginPath(), s.arc(n, n, a + 12, 0, Math.PI * 2), s.stroke(), s.restore()), s.strokeStyle = A, s.lineWidth = 6, s.beginPath(), s.arc(n, n, a, 0, Math.PI * 2), s.stroke(), d && (s.save(), s.fillStyle = "rgba(255, 255, 255, 0.15)", s.beginPath(), s.arc(n, n, a - 8, 0, Math.PI * 2), s.fill(), s.restore()), s.strokeStyle = t === "normal" ? "rgba(45, 55, 72, 0.1)" : "rgba(45, 55, 72, 0.2)", s.lineWidth = 2, s.beginPath(), s.arc(n, n, a - 15, 0, Math.PI * 2), s.stroke(), s.fillStyle = c, s.font = 'bold 84px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif', s.textAlign = "center", s.textBaseline = "middle", s.save(), s.shadowColor = "rgba(0, 0, 0, 0.9)", s.shadowBlur = 4, s.shadowOffsetX = 1, s.shadowOffsetY = 1, s.fillText(e.index.toString(), n, n), s.restore(), s.save(), s.shadowColor = "rgba(255, 255, 255, 0.4)", s.shadowBlur = 1, s.fillText(e.index.toString(), n, n), s.restore();
    const p = new u.CanvasTexture(i);
    return p.generateMipmaps = !1, p.minFilter = u.LinearFilter, p.magFilter = u.LinearFilter, p;
  }
  handleMouseMove(e) {
    if (!this.raycaster || !this.camera) return;
    const t = document.elementFromPoint(e.clientX, e.clientY);
    if (t && t.closest(".belowjs-annotation-card")) {
      this.clearAllHoverStates();
      return;
    }
    const i = this.canvas.getBoundingClientRect(), s = new u.Vector2(
      (e.clientX - i.left) / i.width * 2 - 1,
      -((e.clientY - i.top) / i.height) * 2 + 1
    );
    this.raycaster.setFromCamera(s, this.camera);
    const o = Array.from(this.markers.values());
    this.raycaster.near = 0.1, this.raycaster.far = 1e3;
    const n = this.raycaster.intersectObjects(o);
    let a = null;
    n.length > 0 && (a = n[0].object.userData.annotationId), this.markers.forEach((r, A) => {
      this.setMarkerHovered(A, !1);
    }), a && this.setMarkerHovered(a, !0), this.canvas.style.cursor = a ? "pointer" : "default";
  }
  clearAllHoverStates() {
    this.markers.forEach((e, t) => {
      this.setMarkerHovered(t, !1);
    }), this.canvas.style.cursor = "default";
  }
  setMarkerHovered(e, t) {
    const i = this.markers.get(e);
    if (!i) return;
    const s = i.material, o = s.userData;
    !o || o.isHovered === t || (o.isHovered = t, t && !o.isSelected ? (o.hoverTexture || (o.hoverTexture = this.createMarkerTexture(o.annotation, "hover")), s.map = o.hoverTexture, s.opacity = 1) : o.isSelected || (s.map = o.normalTexture, s.opacity = 0.7), s.needsUpdate = !0, this.updateMarkerScale(i));
  }
  setMarkerSelected(e, t) {
    const i = this.markers.get(e);
    if (!i) return;
    const s = i.material, o = s.userData;
    o.isSelected !== t && (o.isSelected = t, t ? (o.selectedTexture || (o.selectedTexture = this.createMarkerTexture(o.annotation, "selected")), s.map = o.selectedTexture, s.opacity = 1) : o.isHovered ? (o.hoverTexture || (o.hoverTexture = this.createMarkerTexture(o.annotation, "hover")), s.map = o.hoverTexture, s.opacity = 1) : (s.map = o.normalTexture, s.opacity = 0.7), s.needsUpdate = !0, this.updateMarkerScale(i));
  }
  selectAnnotation(e) {
    this.activeAnnotation && this.setMarkerSelected(this.activeAnnotation.id, !1), this.activeAnnotation = e, e && this.setMarkerSelected(e.id, !0), this.updateAnnotationOpacity(), this.showAnnotationCard(e), !this.editMode && e.cameraView && this.animateToAnnotation(e), this.emit("annotationSelected", { annotation: e });
  }
  /**
   * Update opacity for all annotation markers based on active state
   */
  updateAnnotationOpacity() {
    this.markers.forEach((e, t) => {
      this.activeAnnotation && t === this.activeAnnotation.id ? e.material.opacity = 0.8 : e.material.opacity = 0.7;
    });
  }
  /**
   * Update marker scale based on distance from camera
   */
  updateMarkerScale(e) {
    if (!this.camera) return;
    const t = 0.8;
    let i = t;
    const s = e.material.userData;
    s && s.isHovered && !s.isSelected && (i = t * 1.15), e.scale.set(i, i, 1);
  }
  /**
   * Update all marker scales - called from render loop
   */
  updateAllMarkerScales() {
    this.camera && this.markers.forEach((e) => {
      this.updateMarkerScale(e);
    });
  }
  /**
   * Update camera view for an annotation to current position
   * @param {string} annotationId - ID of annotation to update
   */
  updateAnnotationCameraView(e) {
    const t = this.annotations.find((i) => i.id === e);
    return t ? (t.cameraView = this.getCurrentCameraView(), t.metadata = t.metadata || {}, t.metadata.modified = (/* @__PURE__ */ new Date()).toISOString(), this.options.autoSave && this.saveAnnotationsToStorage(), this.emit("annotationUpdated", { annotation: t, updates: { cameraView: t.cameraView } }), this.emit("annotationsChanged", { annotations: this.annotations }), console.log("Updated camera view for annotation:", e), !0) : (console.warn("Annotation not found:", e), !1);
  }
  /**
   * Update an existing annotation
   * @param {string} annotationId - ID of annotation to update
   * @param {Object} updates - Fields to update
   */
  updateAnnotation(e, t) {
    const i = this.annotations.find((s) => s.id === e);
    return i ? (Object.assign(i, t), i.metadata = i.metadata || {}, i.metadata.modified = (/* @__PURE__ */ new Date()).toISOString(), this.options.autoSave && this.saveAnnotationsToStorage(), this.emit("annotationUpdated", { annotation: i, updates: t }), this.emit("annotationsChanged", { annotations: this.annotations }), !0) : (console.warn("Annotation not found:", e), !1);
  }
  /**
   * Remove an annotation
   * @param {string} annotationId - ID of annotation to remove
   */
  removeAnnotation(e) {
    const t = this.annotations.findIndex((o) => o.id === e);
    if (t === -1)
      return console.warn("Annotation not found:", e), !1;
    const i = this.annotations[t], s = this.markers.get(e);
    return s && (this.scene && this.scene.remove(s), this.markers.delete(e)), this.annotations.splice(t, 1), this.activeAnnotation && this.activeAnnotation.id === e && this.hideAnnotationCard(), this.options.autoSave && this.saveAnnotationsToStorage(), this.emit("annotationRemoved", { annotation: i }), this.emit("annotationsChanged", { annotations: this.annotations }), !0;
  }
  showAnnotationCard(e) {
    if (this.hideAnnotationCard(), !this.camera || !this.renderer) {
      console.warn("Missing camera or renderer for annotation card positioning");
      return;
    }
    if (!this.markers.get(e.id)) {
      console.warn("No marker found for annotation:", e.id);
      return;
    }
    const i = this.editMode, s = document.createElement("div");
    if (s.className = "belowjs-annotation-card belowjs-annotation-card-base", s.innerHTML = `
            <div class="belowjs-annotation-card-header">
                <span class="belowjs-annotation-card-index">${e.index}.</span>
                <h4 class="belowjs-annotation-card-title" contenteditable="${i}" data-field="title">${this.escapeHtml(e.title)}</h4>
                <div class="belowjs-annotation-card-actions">
                    ${i ? `
                        <button class="belowjs-annotation-card-action-btn card-camera" title="Update camera view">📷</button>
                        <button class="belowjs-annotation-card-action-btn card-delete" title="Delete annotation">🗑️</button>
                    ` : ""}
                    <button class="belowjs-annotation-card-action-btn card-close" title="Close">×</button>
                </div>
            </div>
            <div class="belowjs-annotation-card-content">
                <div class="belowjs-annotation-card-description" contenteditable="${i}" data-field="description">${this.escapeHtml(e.description || "")}</div>
            </div>
        `, this.activeCard = s, this.activePanel = e, s.querySelector(".card-close").addEventListener("click", () => this.hideAnnotationCard()), i) {
      const n = s.querySelector(".card-camera"), a = s.querySelector(".card-delete");
      n && n.addEventListener("click", () => this.updateAnnotationCameraView(e.id)), a && a.addEventListener("click", () => {
        confirm("Are you sure you want to delete this annotation?") && this.removeAnnotation(e.id);
      });
    }
    i && this.setupCardEditing(s, e), this.positionCard(s, e), this.container.appendChild(s), this.setupCardClickOutside(s), this.startCardPositionUpdates(e), s.classList.add("active"), console.log("Annotation card shown for:", e.title);
  }
  setupCardEditing(e, t) {
    e.querySelectorAll('[contenteditable="true"]').forEach((s) => {
      s.addEventListener("blur", () => {
        const o = s.dataset.field, n = s.textContent.trim(), a = t[o];
        n !== a && (this.updateAnnotation(t.id, { [o]: n }), this.emit("annotationUpdated", { annotation: t, updates: { [o]: n }, source: "card" }));
      }), s.addEventListener("keydown", (o) => {
        o.key === "Enter" && (o.preventDefault(), s.blur());
      });
    });
  }
  setupCardClickOutside(e) {
    this.cardClickOutsideHandler && document.removeEventListener("click", this.cardClickOutsideHandler), this.cardClickOutsideHandler = (t) => {
      e.contains(t.target) || this.hideAnnotationCard();
    }, setTimeout(() => {
      document.addEventListener("click", this.cardClickOutsideHandler);
    }, 100);
  }
  hideAnnotationCard() {
    this.stopCardPositionUpdates(), this.cardClickOutsideHandler && (document.removeEventListener("click", this.cardClickOutsideHandler), this.cardClickOutsideHandler = null), this.activeCard && (this.activeCard.remove(), this.activeCard = null), this.activePanel = null, this.activeAnnotation = null, this.updateAnnotationOpacity(), this.emit("annotationDeselected");
  }
  positionCard(e, t) {
    const i = this.markers.get(t.id);
    if (!i || !this.camera || !this.renderer) {
      e.style.position = "fixed", e.style.left = "50px", e.style.top = "100px", e.style.zIndex = "1001";
      return;
    }
    try {
      const s = i.position.clone();
      s.project(this.camera);
      const n = this.renderer.domElement.getBoundingClientRect(), a = (s.x * 0.5 + 0.5) * n.width + n.left, r = (-s.y * 0.5 + 0.5) * n.height + n.top, A = 280, c = 40, h = -20;
      let d = a + c, g = r + h;
      d + A > window.innerWidth - 20 && (d = a - A - c), d = Math.max(20, Math.min(d, window.innerWidth - A - 20)), g = Math.max(20, Math.min(g, window.innerHeight - 200)), e.style.position = "fixed", e.style.left = d + "px", e.style.top = g + "px", e.style.zIndex = "1001";
    } catch (s) {
      console.warn("Error positioning annotation card:", s), e.style.position = "fixed", e.style.left = "50px", e.style.top = "100px", e.style.zIndex = "1001";
    }
  }
  /**
   * Start continuous position updates for the active card
   */
  startCardPositionUpdates(e) {
    this.cardPositionUpdateId && this.stopCardPositionUpdates();
    const t = () => {
      this.activeCard && this.activeAnnotation && e.id === this.activeAnnotation.id && (this.positionCard(this.activeCard, e), this.cardPositionUpdateId = requestAnimationFrame(t));
    };
    this.cardPositionUpdateId = requestAnimationFrame(t);
  }
  /**
   * Stop continuous position updates for cards
   */
  stopCardPositionUpdates() {
    this.cardPositionUpdateId && (cancelAnimationFrame(this.cardPositionUpdateId), this.cardPositionUpdateId = null);
  }
  escapeHtml(e) {
    if (!e) return "";
    const t = document.createElement("div");
    return t.textContent = e, t.innerHTML;
  }
  getCurrentCameraView() {
    var e, t, i, s, o, n, a, r, A, c, h, d, g;
    return {
      position: {
        x: ((t = (e = this.camera) == null ? void 0 : e.position) == null ? void 0 : t.x) || 0,
        y: ((s = (i = this.camera) == null ? void 0 : i.position) == null ? void 0 : s.y) || 0,
        z: ((n = (o = this.camera) == null ? void 0 : o.position) == null ? void 0 : n.z) || 0
      },
      target: {
        x: ((r = (a = this.controls) == null ? void 0 : a.target) == null ? void 0 : r.x) || 0,
        y: ((c = (A = this.controls) == null ? void 0 : A.target) == null ? void 0 : c.y) || 0,
        z: ((d = (h = this.controls) == null ? void 0 : h.target) == null ? void 0 : d.z) || 0
      },
      fov: ((g = this.camera) == null ? void 0 : g.fov) || 75
    };
  }
  animateToAnnotation(e, t = 2e3) {
    if (!e.cameraView || !this.camera || !this.controls) return;
    this.currentAnimation && (cancelAnimationFrame(this.currentAnimation), this.currentAnimation = null);
    const i = {
      position: this.camera.position.clone(),
      target: this.controls.target.clone()
    }, s = {
      position: new u.Vector3(
        e.cameraView.position.x,
        e.cameraView.position.y,
        e.cameraView.position.z
      ),
      target: new u.Vector3(
        e.cameraView.target.x,
        e.cameraView.target.y,
        e.cameraView.target.z
      )
    }, o = performance.now();
    let n;
    const a = (r) => {
      const A = r - o, c = Math.min(A / t, 1), h = this.easeInOutCubic(c);
      this.camera.position.lerpVectors(i.position, s.position, h), this.controls.target.lerpVectors(i.target, s.target, h), this.controls.update(), c < 1 ? (n = requestAnimationFrame(a), this.currentAnimation = n) : (this.currentAnimation = null, this.emit("cameraAnimationComplete", { annotation: e }));
    };
    n = requestAnimationFrame(a), this.currentAnimation = n, this.emit("cameraAnimationStart", { annotation: e });
  }
  stopCameraAnimation() {
    this.currentAnimation && (cancelAnimationFrame(this.currentAnimation), this.currentAnimation = null, this.emit("cameraAnimationInterrupted"), console.log("Camera animation interrupted"));
  }
  easeInOutCubic(e) {
    return e < 0.5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1;
  }
  updateAnnotationList() {
    const e = document.getElementById("annotationList");
    e && (e.innerHTML = "", this.annotations.forEach((t) => {
      const i = document.createElement("div");
      i.className = "annotation-item", i.textContent = `${t.index}. ${t.title}`, i.addEventListener("click", () => this.selectAnnotation(t)), e.appendChild(i);
    }));
  }
  /**
   * Storage and Export/Import
   */
  saveAnnotationsToStorage() {
    const e = this.createAnnotationData();
    localStorage.setItem("belowjs_annotations", JSON.stringify(e));
  }
  loadAnnotationsFromStorage() {
    const e = localStorage.getItem("belowjs_annotations");
    if (e)
      try {
        const t = JSON.parse(e);
        this.loadAnnotations(t);
      } catch (t) {
        console.error("Failed to load annotations from storage:", t);
      }
  }
  loadAnnotations(e) {
    try {
      this.validateAnnotationData(e), this.clearAnnotations(), this.annotations = e.annotations, this.nextIndex = Math.max(...this.annotations.map((t) => t.index), 0) + 1, this.annotations.forEach((t) => {
        this.createMarker(t);
      }), this.emit("annotationsLoaded", { data: e, annotations: this.annotations }), this.emit("annotationsChanged", { annotations: this.annotations }), console.log(`Loaded ${this.annotations.length} annotations`);
    } catch (t) {
      console.error("Failed to load annotations:", t), this.emit("annotationError", { error: t, message: "Failed to load annotations" });
    }
  }
  clearAnnotations() {
    this.markers.forEach((e) => {
      this.scene && this.scene.remove(e);
    }), this.markers.clear(), this.annotations = [], this.activeAnnotation = null, this.hideAnnotationCard(), this.emit("annotationsCleared"), this.emit("annotationsChanged", { annotations: this.annotations });
  }
  exportAnnotations() {
    const e = this.createAnnotationData(), t = JSON.stringify(e, null, 2), i = new Blob([t], { type: "application/json" }), s = URL.createObjectURL(i), o = document.createElement("a");
    o.href = s, o.download = `annotations_${Date.now()}.json`, this.container.appendChild(o), o.click(), this.container.removeChild(o), URL.revokeObjectURL(s), console.log("Exported annotations:", e);
  }
  importAnnotations(e) {
    const t = new FileReader();
    t.onload = (i) => {
      try {
        const s = JSON.parse(i.target.result);
        this.loadAnnotations(s);
      } catch (s) {
        console.error("Failed to import annotations:", s), alert("Failed to import annotations: Invalid JSON file");
      }
    }, t.readAsText(e);
  }
  /**
   * Cleanup
   */
  dispose() {
    this.clearAnnotations(), this.hideAnnotationCard(), this.cardClickOutsideHandler && (document.removeEventListener("click", this.cardClickOutsideHandler), this.cardClickOutsideHandler = null), this.currentAnimation && (cancelAnimationFrame(this.currentAnimation), this.currentAnimation = null), this.stopCardPositionUpdates();
  }
}
class _n extends qe {
  /**
   * Creates a new ModelViewer instance
   * 
   * @param {HTMLElement|string} container - DOM element or CSS selector for the viewer container
   * @param {ModelViewerOptions} [options={}] - Configuration options
   */
  constructor(e, t = {}) {
    super(), typeof e == "string" && (e = document.querySelector(e)), this.container = e || document.body, window.getComputedStyle(this.container).position === "static" && (this.container.style.position = "relative"), this.options = {
      models: {},
      autoLoadFirst: !0,
      showLoadingIndicator: !0,
      showStatus: !0,
      showInfo: !1,
      // Info panel is optional now
      enableVR: !1,
      // Enable VR support
      enableMeasurement: !1,
      // Auto-attach measurement system
      measurementTheme: "dark",
      // 'dark' or 'light' theme for measurement panel
      enableVRComfortGlyph: !1,
      // Auto-attach VR comfort glyph
      enableDiveSystem: !1,
      // Auto-attach dive system
      enableFullscreen: !1,
      // Show fullscreen toggle button
      enableAnnotations: !1,
      // Auto-attach annotation system (default disabled)
      annotationOptions: {},
      // Options to pass to AnnotationSystem
      ...t
    }, this.currentModelKey = null, this.belowViewer = null, this.ui = {}, this.measurementSystem = null, this.comfortGlyph = null, this.diveSystem = null, this.fullscreenButton = null, this.annotationSystem = null, this.lastComfortMode = null, typeof window < "u" && (window.modelViewer = this), this.init();
  }
  init() {
    const e = {
      scene: {
        background: { type: "color", value: "#041729" },
        fog: {
          enabled: !1,
          color: "#041729",
          near: 10,
          far: 100
        }
      },
      camera: {
        fov: 65,
        near: 0.05,
        far: 2e3,
        position: { x: 0, y: 5, z: 10 },
        desktop: {
          enableDamping: !0,
          dampingFactor: 0.08,
          maxDistance: 100,
          minDistance: 0.5
        }
      },
      renderer: {
        antialias: !0,
        alpha: !1,
        powerPreference: "high-performance"
      }
    }, t = {
      ...e,
      ...this.options.viewerConfig,
      // Enable VR if requested
      ...this.options.enableVR && { vr: { enabled: !0 } },
      // Pass audioPath if provided
      ...this.options.audioPath && { audioPath: this.options.audioPath },
      // Pass VR audio enablement option
      ...typeof this.options.enableVRAudio < "u" && { enableVRAudio: this.options.enableVRAudio },
      // Allow scene config to be passed at top level for convenience
      ...this.options.scene && { scene: { ...e.scene, ...this.options.scene } },
      ...this.options.camera && { camera: { ...e.camera, ...this.options.camera } },
      ...this.options.renderer && { renderer: { ...e.renderer, ...this.options.renderer } },
      ...this.options.vr && { vr: { ...this.options.vr } }
    };
    if (this.belowViewer = new Qn(this.container, t), this.setupEventForwarding(), this.belowViewer.on("initialized", () => {
      this.setupFocusInteraction(), this._maybeAttachMeasurementSystem(), this._maybeAttachVRComfortGlyph(), this._maybeAttachDiveSystem(), this._maybeAttachAnnotationSystem(), this._maybeAttachFullscreenButton();
    }), this.belowViewer.isInitialized && (this.setupFocusInteraction(), this._maybeAttachMeasurementSystem(), this._maybeAttachVRComfortGlyph(), this._maybeAttachDiveSystem(), this._maybeAttachAnnotationSystem(), this._maybeAttachFullscreenButton()), Object.keys(this.options.models).length > 0 && (this.createUI(), this.populateDropdown(), this.options.autoLoadFirst)) {
      const i = Object.keys(this.options.models)[0];
      setTimeout(() => this.loadModel(i), 100);
    }
  }
  _maybeAttachMeasurementSystem() {
    if (!this.options.enableMeasurement || this.measurementSystem) return;
    this.measurementSystem = new xn({
      scene: this.belowViewer.sceneManager.scene,
      camera: this.belowViewer.cameraManager.camera,
      renderer: this.belowViewer.renderer,
      controls: this.belowViewer.cameraManager.controls,
      theme: this.options.measurementTheme
    });
    const e = () => this.measurementSystem && this.measurementSystem.update();
    if (this.belowViewer.onAfterRender)
      this.belowViewer.onAfterRender(e);
    else if (this.onAfterRender)
      this.onAfterRender(e);
    else {
      const t = () => {
        e(), requestAnimationFrame(t);
      };
      t();
    }
    if (this.belowViewer.loadedModels && this.belowViewer.loadedModels.length > 0) {
      const t = this.belowViewer.loadedModels[0].model;
      this.measurementSystem.setRaycastTargets(t);
    }
  }
  async _maybeAttachVRComfortGlyph() {
    !this.options.enableVRComfortGlyph || this.comfortGlyph || this.belowViewer.vrManager && this.belowViewer.vrManager.vrCore && (await this.belowViewer.vrManager.vrCore.checkVRSupported(), this.belowViewer.vrManager.vrCore.isVRSupported && (this.comfortGlyph = new vt(this.belowViewer.vrManager, {
      position: "bottom-right",
      offsetX: 20,
      offsetY: 70
    }), this.lastComfortMode = this.comfortGlyph.isComfortMode, this.comfortGlyph.element.addEventListener("vrcomfortchange", (e) => {
      this.lastComfortMode = e.detail.isComfortMode;
    }), this.belowViewer.vrManager && this.belowViewer.vrManager.vrCore && (this.belowViewer.vrManager.vrCore.onSessionStart = () => {
      this.lastComfortMode !== null && setTimeout(() => {
        this.lastComfortMode ? this.belowViewer.vrManager.setComfortPreset("max-comfort") : this.belowViewer.vrManager.setComfortPreset("performance"), this.comfortGlyph.setComfortMode(this.lastComfortMode);
      }, 50);
    }), document.addEventListener("keydown", (e) => {
      e.code === "KeyC" && (e.ctrlKey || e.metaKey) && (e.preventDefault(), this.comfortGlyph && this.comfortGlyph.toggle());
    }), window.addEventListener("beforeunload", () => this.comfortGlyph && this.comfortGlyph.dispose())));
  }
  _maybeAttachDiveSystem() {
    if (!this.options.enableDiveSystem || this.diveSystem) return;
    this.diveSystem = new kn(
      this.belowViewer.sceneManager.scene,
      this.belowViewer.renderer,
      this.belowViewer.cameraManager.camera
    ), setTimeout(() => {
      this.diveSystem.initializeToggleSwitch();
    }, 100);
    const e = (t) => {
      if (this.diveSystem) {
        const i = performance.now();
        this.diveSystem.update(i, t), this.belowViewer.vrManager && this.diveSystem.updateTorchFromVRManager(this.belowViewer.vrManager), this.belowViewer.renderer.xr.isPresenting || this.diveSystem.torch.updateCameraPosition(this.belowViewer.cameraManager.camera);
      }
    };
    this.belowViewer.onAfterRender ? this.belowViewer.onAfterRender(e) : this.belowViewer.on("before-render", e), this.on("model-loaded", (t) => {
      this.diveSystem && t.model && this.diveSystem.updateParticleBounds(t.model);
    }), typeof window < "u" && (window.diveSystem = this.diveSystem);
  }
  async _maybeAttachAnnotationSystem() {
    var e;
    if (!(!this.options.enableAnnotations || this.annotationSystem)) {
      if (this.annotationSystem = new Ln({
        viewer: this.belowViewer,
        scene: this.belowViewer.sceneManager.scene,
        camera: this.belowViewer.cameraManager.camera,
        renderer: this.belowViewer.renderer,
        controls: this.belowViewer.cameraManager.controls,
        canvas: this.belowViewer.renderer.domElement,
        container: this.container,
        ...this.options.annotationOptions
      }), this.modelReady && this.currentModelKey && ((e = this.belowViewer.loadedModels) == null ? void 0 : e.length) > 0) {
        const t = this.belowViewer.loadedModels[0].model;
        this.annotationSystem.setRaycastTargets(t), this.annotationSystem.onModelLoaded();
      }
      typeof window < "u" && (window.annotationSystem = this.annotationSystem);
    }
  }
  _maybeAttachFullscreenButton() {
    if (!this.options.enableFullscreen || this.fullscreenButton) return;
    const e = document.createElement("div");
    e.id = "fullscreenButton", e.className = "fullscreen-button", this.options.measurementTheme === "light" && e.classList.add("light-theme"), this.options.enableMeasurement || e.classList.add("no-measurement"), e.textContent = "⛶", e.tabIndex = 0, e.title = "Enter Fullscreen", e.setAttribute("aria-label", "Enter Fullscreen"), e.addEventListener("click", () => this.toggleFullscreen()), e.addEventListener("keydown", (t) => {
      (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.toggleFullscreen());
    }), this.container.appendChild(e), this.fullscreenButton = e, this.ui.fullscreen = e, this._onFullscreenChange = () => this.updateFullscreenButton(), document.addEventListener("fullscreenchange", this._onFullscreenChange), this.updateFullscreenButton();
  }
  toggleFullscreen() {
    if (this.isFullscreen()) {
      const e = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
      e && e.call(document), this.updateFullscreenButton();
    } else {
      const e = this.container, t = e.requestFullscreen || e.webkitRequestFullscreen || e.msRequestFullscreen;
      t && t.call(e).catch((i) => console.error("[ModelViewer] Failed to enter fullscreen", i)), this.updateFullscreenButton();
    }
  }
  isFullscreen() {
    const e = this.container;
    return document.fullscreenElement === e || document.webkitFullscreenElement === e || document.msFullscreenElement === e;
  }
  updateFullscreenButton() {
    if (!this.fullscreenButton) return;
    const e = this.isFullscreen();
    this.fullscreenButton.title = e ? "Exit Fullscreen" : "Enter Fullscreen", this.fullscreenButton.setAttribute("aria-label", e ? "Exit Fullscreen" : "Enter Fullscreen"), this.fullscreenButton.textContent = "⛶";
  }
  setupEventForwarding() {
    this.belowViewer.on("initialized", (e) => this.emit("initialized", e)), this.belowViewer.on("model-load-start", (e) => this.emit("model-load-start", e)), this.belowViewer.on("model-load-progress", (e) => {
      this.emit("model-load-progress", e), this.updateLoadingProgress(e);
    }), this.belowViewer.on("model-loaded", (e) => {
      this.emit("model-loaded", e), this.emit("modelLoaded", e), this.onModelLoaded(e);
    }), this.belowViewer.on("model-load-error", (e) => {
      this.emit("model-load-error", e), this.onModelLoadError(e);
    }), this.belowViewer.on("model-load-cancelled", (e) => this.emit("model-load-cancelled", e)), this.belowViewer.on("error", (e) => this.emit("error", e)), this.belowViewer.on("vr-session-start", (e) => {
      this.emit("vr-session-start", e), this.onVRSessionStart();
    }), this.belowViewer.on("vr-session-end", (e) => {
      this.emit("vr-session-end", e), this.onVRSessionEnd();
    }), this.belowViewer.on("vr-mode-toggle", (e) => {
      this.emit("vr-mode-toggle", e), this.onVRModeToggle();
    }), this.belowViewer.on("vr-movement-start", (e) => this.emit("vr-movement-start", e)), this.belowViewer.on("vr-movement-stop", (e) => this.emit("vr-movement-stop", e)), this.belowViewer.on("vr-movement-update", (e) => this.emit("vr-movement-update", e));
  }
  // VR event handlers
  onVRSessionStart() {
    this.ui.info && (this.ui.info.style.display = "none"), this.ui.selector && (this.ui.selector.style.pointerEvents = "none", this.ui.selector.style.opacity = "0.5"), this.measurementSystem && typeof this.measurementSystem.attachVR == "function" && setTimeout(() => {
      var t;
      const e = (t = this.belowViewer) == null ? void 0 : t.renderer;
      if (e && e.xr && typeof e.xr.getController == "function") {
        const i = e.xr.getController(0), s = e.xr.getController(1), o = e.xr.getControllerGrip ? e.xr.getControllerGrip(0) : void 0, n = e.xr.getControllerGrip ? e.xr.getControllerGrip(1) : void 0;
        this.measurementSystem.attachVR({ controller1: i, controller2: s, controllerGrip1: o, controllerGrip2: n }), this.measurementSystem.resetGhostSpherePositions();
      }
    }, 100);
  }
  onVRSessionEnd() {
    this.ui.info && this.options.showInfo && (this.ui.info.style.display = "block"), this.ui.selector && (this.ui.selector.style.pointerEvents = "auto", this.ui.selector.style.opacity = "1"), this.measurementSystem && (this.measurementSystem.controller1 = null, this.measurementSystem.controller2 = null, this.measurementSystem.controllerGrip1 = null, this.measurementSystem.controllerGrip2 = null, this.measurementSystem.isVR = !1, this.measurementSystem.ghostSpheres && (this.measurementSystem.ghostSpheres.left && (this.measurementSystem.ghostSpheres.left.visible = !1), this.measurementSystem.ghostSpheres.right && (this.measurementSystem.ghostSpheres.right.visible = !1)));
  }
  onVRModeToggle() {
  }
  setupFocusInteraction() {
    const e = this.belowViewer.renderer.domElement, t = 300;
    let i = 0, s = !1, o = { x: 0, y: 0 };
    const n = 5, a = (h) => {
      s = !1, o.x = h.clientX, o.y = h.clientY;
    }, r = (h) => {
      if (!s) {
        const d = Math.abs(h.clientX - o.x), g = Math.abs(h.clientY - o.y);
        (d > n || g > n) && (s = !0);
      }
    }, A = () => {
      setTimeout(() => {
        s = !1;
      }, 10);
    }, c = (h) => {
      var p;
      const d = Date.now(), g = d - i < t;
      i = d, !((p = this.belowViewer.renderer.xr) != null && p.isPresenting || s) && g && this.focusOnPoint(h);
    };
    e.addEventListener("mousedown", a), e.addEventListener("mousemove", r), e.addEventListener("mouseup", A), e.addEventListener("click", c), this.focusEventHandlers = {
      onMouseDown: a,
      onMouseMove: r,
      onMouseUp: A,
      onMouseClick: c
    };
  }
  focusOnPoint(e) {
    const i = this.belowViewer.renderer.domElement.getBoundingClientRect(), s = {
      x: (e.clientX - i.left) / i.width * 2 - 1,
      y: -((e.clientY - i.top) / i.height) * 2 + 1
    }, o = new u.Raycaster(), n = this.belowViewer.cameraManager.getCamera();
    o.setFromCamera(s, n);
    let a = [];
    if (this.measurementSystem && this.measurementSystem._raycastTargets && this.measurementSystem._raycastTargets.length > 0)
      a = this.measurementSystem._raycastTargets;
    else {
      const A = this.belowViewer.sceneManager.getScene();
      a = [], A.traverse((c) => {
        c.isMesh && c.geometry && !this.isMeasurementHelper(c) && a.push(c);
      });
    }
    if (a.length === 0) {
      console.debug("[ModelViewer] No valid raycast targets found for focusing");
      return;
    }
    const r = o.intersectObjects(a, !0);
    if (r.length > 0) {
      const A = r[0].point;
      this.belowViewer.cameraManager.focusOn(A), this.emit("focus", { point: A, intersect: r[0] });
    } else
      console.debug("[ModelViewer] No intersections found with valid targets");
  }
  // Helper method to identify measurement helpers (similar to MeasurementSystem)
  isMeasurementHelper(e) {
    if (!e) return !1;
    if (e.userData.isMeasurementSphere || e.userData.isMeasurementLine || e.type === "Line2" || e.type === "Line") return !0;
    if (e.geometry && ["RingGeometry", "TubeGeometry", "PlaneGeometry", "CircleGeometry", "SphereGeometry"].includes(e.geometry.type))
      if (e.geometry.type === "SphereGeometry") {
        const i = e.geometry;
        if (i.parameters && i.parameters.radius < 0.1) return !0;
      } else
        return !0;
    return !!(typeof e.name == "string" && (e.name.startsWith("MeasurementHelper") || e.name.includes("measurement") || e.name.includes("ghost")));
  }
  createUI() {
    this.container === document.body ? document.documentElement.classList.add("below-viewer") : this.container.classList.add("below-viewer-container"), Object.keys(this.options.models).length > 1 && !this.ui.dropdown && this.createModelSelector(), this.options.showInfo && !this.ui.info && this.createInfoPanel(), this.options.showLoadingIndicator && !this.ui.loading && this.createLoadingIndicator(), this.options.showStatus && !this.ui.status && this.createStatusIndicator(), this.ui.dropdown && this.ui.dropdown.addEventListener("change", (t) => {
      t.target.value && this.loadModel(t.target.value);
    });
  }
  createModelSelector() {
    const e = this.container, t = e.querySelector("#modelSelector") || document.getElementById("modelSelector");
    t && t.parentElement && t.remove();
    const i = document.createElement("div");
    i.id = "modelSelector", i.className = "below-panel", e.appendChild(i);
    const s = document.createElement("select");
    if (s.id = "modelDropdown", i.appendChild(s), this.options.enableDiveSystem) {
      const o = document.createElement("div");
      o.id = "modeToggleContainer";
      const n = document.createElement("div");
      n.className = "semantic-toggle";
      const a = document.createElement("input");
      a.type = "checkbox", a.id = "modeToggleSwitch", n.appendChild(a);
      const r = document.createElement("div");
      r.className = "toggle-slider-bg", n.appendChild(r);
      const A = document.createElement("div");
      A.className = "toggle-option left";
      const c = document.createElement("div");
      c.className = "toggle-icon", c.textContent = "📋";
      const h = document.createElement("div");
      h.className = "toggle-text", h.textContent = "Survey", A.appendChild(c), A.appendChild(h);
      const d = document.createElement("div");
      d.className = "toggle-option right";
      const g = document.createElement("div");
      g.className = "toggle-icon", g.textContent = "🌊";
      const p = document.createElement("div");
      p.className = "toggle-text", p.textContent = "Dive", d.appendChild(g), d.appendChild(p), n.appendChild(A), n.appendChild(d), o.appendChild(n), i.appendChild(o);
    }
    this.ui.dropdown = s, this.ui.selector = i;
  }
  createLoadingIndicator() {
    const e = document.createElement("div");
    e.id = "loading", e.className = "below-loading", e.textContent = "Loading...", e.style.display = "none", this.container.appendChild(e), this.ui.loading = e;
  }
  createStatusIndicator() {
    const e = document.createElement("div");
    e.id = "status", e.className = "status below-status", e.style.display = "none", this.container.appendChild(e), this.ui.status = e;
  }
  createInfoPanel() {
    const e = document.createElement("div");
    e.id = "info", e.className = "below-panel";
    const t = document.createElement("div");
    t.id = "infoTitle", t.textContent = "BelowJS";
    const i = document.createElement("div");
    i.id = "infoControls", i.innerHTML = `
      <strong>Desktop:</strong> Drag to rotate • Scroll to zoom<br>
      <strong>Mobile:</strong> Touch and drag to explore
    `, e.appendChild(t), e.appendChild(i), this.container.appendChild(e), this.ui.info = e;
  }
  populateDropdown() {
    if (!this.ui.dropdown) return;
    this.ui.dropdown.innerHTML = "";
    const e = document.createElement("option");
    e.value = "", e.textContent = "Select a Model", e.disabled = !0, e.selected = !0, this.ui.dropdown.appendChild(e), Object.entries(this.options.models).forEach(([t, i]) => {
      const s = document.createElement("option");
      s.value = t, s.textContent = i.name || t, this.ui.dropdown.appendChild(s);
    });
  }
  /**
   * Load a model by its key
   * 
   * @async
   * @method loadModel
   * @param {string} modelKey - The key of the model to load (must exist in options.models)
   * @returns {Promise<void>} Promise that resolves when model loading is complete
   * 
   * @fires ModelViewer#model-loaded - When model loads successfully
   * @fires ModelViewer#model-load-error - When model loading fails
   * 
   * @example
   * // Load a specific model
   * await viewer.loadModel('shipwreck');
   * 
   * @since 1.0.0
   */
  async loadModel(e) {
    const t = this.options.models[e];
    if (!t) {
      console.error("Model not found:", e);
      return;
    }
    this.currentModelKey = e, this.ui.dropdown && (this.ui.dropdown.value = e), this.showLoading(`Loading ${t.name || e}...`), document.title = `BelowJS – ${t.name || e}`;
    try {
      this.measurementSystem && (this.measurementSystem.clearUnifiedMeasurement(), this.measurementSystem.clearLegacyVRMeasurement(), this.measurementSystem.clearLegacyDesktopMeasurement()), this.belowViewer.clearModels(), await new Promise((s) => setTimeout(s, 50));
      const i = await this.belowViewer.loadModel(t.url, {
        autoFrame: !1,
        // We'll handle positioning manually
        initialPositions: t.initialPositions
        // Pass VR/desktop positions
      });
      i && (this.applyInitialPositions(t, i), this.hideLoading(), this.updateStatus(`Loaded: ${t.name || e}`), this.measurementSystem && this.measurementSystem.setRaycastTargets(i), this.annotationSystem && (this.annotationSystem.setRaycastTargets(i), this.annotationSystem.onModelLoaded()), this.modelReady = !0, this.emit("model-switched", { modelKey: e, model: i, config: t }), this.emit("modelLoaded", { modelKey: e, model: i, config: t }));
    } catch (i) {
      i.message !== "Loading cancelled" && (console.error("Failed to load model:", i), this.hideLoading(), this.updateStatus(`Error loading ${t.name || e}`), this.measurementSystem && this.measurementSystem.setRaycastTargets([]), this.annotationSystem && this.annotationSystem.setRaycastTargets([]));
    }
  }
  applyInitialPositions(e, t) {
    const i = e.initialPositions;
    if (!i) return;
    const s = this.belowViewer.isVRPresenting();
    if (s && i.vr) {
      const o = this.belowViewer.getCamera().parent;
      o && (o.position.set(
        i.vr.dolly.x,
        i.vr.dolly.y,
        i.vr.dolly.z
      ), o.rotation.set(
        i.vr.rotation.x,
        i.vr.rotation.y,
        i.vr.rotation.z
      ));
    } else if (!s && i.desktop) {
      const o = this.belowViewer.getCamera(), n = this.belowViewer.cameraManager.controls;
      o && n && (o.position.set(
        i.desktop.camera.x,
        i.desktop.camera.y,
        i.desktop.camera.z
      ), n.target.set(
        i.desktop.target.x,
        i.desktop.target.y,
        i.desktop.target.z
      ), n.update());
    }
  }
  showLoading(e = "Loading...") {
    this.ui.loading && (this.ui.loading.textContent = e, this.ui.loading.style.display = "block");
  }
  hideLoading() {
    this.ui.loading && (this.ui.loading.style.display = "none");
  }
  updateStatus(e) {
    this.ui.status && (this.ui.status.textContent = e, this.ui.status.style.display = "block");
  }
  updateLoadingProgress({ progress: e }) {
    if (e.lengthComputable && this.currentModelKey) {
      const t = this.options.models[this.currentModelKey], i = Math.round(e.loaded / e.total * 100);
      this.showLoading(`Loading ${(t == null ? void 0 : t.name) || "model"}: ${i}%`);
    }
  }
  onModelLoaded({ model: e }) {
    const t = e.userData.boundingBox;
    t && t.getSize(new u.Vector3()), this.measurementSystem && this.measurementSystem.setRaycastTargets(e), this.annotationSystem && (this.annotationSystem.setRaycastTargets(e), this.annotationSystem.onModelLoaded());
  }
  onModelLoadError({ error: e }) {
    this.hideLoading(), this.updateStatus(`Failed to load model: ${e.message}`);
  }
  // Public API methods
  /**
   * Get the currently loaded model object
   * 
   * @method getCurrentModel
   * @returns {THREE.Object3D|null} The current Three.js model object or null if none loaded
   * 
   * @example
   * // Get current model and inspect it
   * const model = viewer.getCurrentModel();
   * if (model) {
   *   console.log('Model has', model.children.length, 'children');
   * }
   * 
   * @since 1.0.0
   */
  getCurrentModel() {
    return this.belowViewer ? this.belowViewer.getCurrentModel() : null;
  }
  /**
   * Get the Three.js camera instance
   * 
   * @method getCamera
   * @returns {THREE.PerspectiveCamera|null} The Three.js camera or null if not initialized
   * 
   * @example
   * // Access camera properties
   * const camera = viewer.getCamera();
   * if (camera) {
   *   console.log('Camera position:', camera.position);
   * }
   * 
   * @since 1.0.0
   */
  getCamera() {
    return this.belowViewer ? this.belowViewer.getCamera() : null;
  }
  /**
   * Get the Three.js scene instance
   * 
   * @method getScene
   * @returns {THREE.Scene|null} The Three.js scene or null if not initialized
   * 
   * @example
   * // Add custom objects to the scene
   * const scene = viewer.getScene();
   * if (scene) {
   *   scene.add(myCustomObject);
   * }
   * 
   * @since 1.0.0
   */
  getScene() {
    return this.belowViewer ? this.belowViewer.sceneManager.scene : null;
  }
  /**
   * Focus the camera on a specific 3D point
   * 
   * @method focusOn
   * @param {Object} point - 3D point to focus on
   * @param {number} point.x - X coordinate
   * @param {number} point.y - Y coordinate  
   * @param {number} point.z - Z coordinate
   * @param {number} [distance=null] - Distance from the point (uses default if null)
   * 
   * @fires ModelViewer#focus - When camera focus changes
   * 
   * @example
   * // Focus on a specific point
   * viewer.focusOn({ x: 10, y: 5, z: 0 }, 15);
   * 
   * @since 1.0.0
   */
  focusOn(e, t = null) {
    var i;
    (i = this.belowViewer) != null && i.cameraManager && (this.belowViewer.cameraManager.focusOn(e, t), this.emit("focus", { point: e, distance: t }));
  }
  /**
   * Reset camera to the initial position for the current model
   * 
   * @method resetCamera
   * @returns {void}
   * 
   * @fires ModelViewer#camera-reset - When camera is reset
   * 
   * @example
   * // Reset camera to initial view
   * viewer.resetCamera();
   * 
   * @since 1.0.0
   */
  resetCamera() {
    var e;
    if (this.currentModelKey && this.belowViewer) {
      const t = this.options.models[this.currentModelKey], i = (e = t == null ? void 0 : t.initialPositions) == null ? void 0 : e.desktop;
      if (i) {
        const s = this.belowViewer.cameraManager.getCamera(), o = this.belowViewer.cameraManager.getControls();
        i.camera && s.position.set(i.camera.x, i.camera.y, i.camera.z), i.target && o && (o.target.set(i.target.x, i.target.y, i.target.z), o.update()), this.emit("camera-reset", { modelKey: this.currentModelKey, position: i });
      }
    }
  }
  // VR Comfort Settings API
  /**
   * Set VR comfort settings for motion sickness reduction
   * 
   * @method setVRComfortSettings
   * @param {Object} settings - VR comfort configuration
   * @param {boolean} [settings.enableComfort=true] - Enable comfort features
   * @param {number} [settings.comfortRadius=0.3] - Radius of comfort zone
   * @param {number} [settings.fadeDistance=0.1] - Distance for fade effect
   * @returns {void}
   * 
   * @example
   * // Configure VR comfort settings
   * viewer.setVRComfortSettings({
   *   enableComfort: true,
   *   comfortRadius: 0.4,
   *   fadeDistance: 0.15
   * });
   * 
   * @since 1.0.0
   */
  setVRComfortSettings(e) {
    if (this.belowViewer && this.belowViewer.setVRComfortSettings)
      return this.belowViewer.setVRComfortSettings(e);
  }
  setVRComfortPreset(e) {
    if (this.belowViewer && this.belowViewer.setVRComfortPreset)
      return this.belowViewer.setVRComfortPreset(e);
  }
  /**
   * Get current VR comfort settings
   * 
   * @method getVRComfortSettings
   * @returns {Object|null} Current VR comfort settings or null if not available
   * 
   * @example
   * // Get current comfort settings
   * const settings = viewer.getVRComfortSettings();
   * console.log('Comfort enabled:', settings?.enableComfort);
   * 
   * @since 1.0.0
   */
  getVRComfortSettings() {
    return this.belowViewer && this.belowViewer.getVRComfortSettings ? this.belowViewer.getVRComfortSettings() : null;
  }
  /**
   * Clean up and dispose of all resources
   * 
   * Call this method when you're done with the ModelViewer to free up memory
   * and remove event listeners. The viewer will not be usable after disposal.
   * 
   * @method dispose
   * @returns {void}
   * 
   * @example
   * // Clean up when done
   * viewer.dispose();
   * 
   * @since 1.0.0
   */
  dispose() {
    var e, t;
    if (typeof window < "u" && window.modelViewer === this && (window.modelViewer = null), this.focusEventHandlers && ((t = (e = this.belowViewer) == null ? void 0 : e.renderer) != null && t.domElement)) {
      const i = this.belowViewer.renderer.domElement;
      i.removeEventListener("mousedown", this.focusEventHandlers.onMouseDown), i.removeEventListener("mousemove", this.focusEventHandlers.onMouseMove), i.removeEventListener("mouseup", this.focusEventHandlers.onMouseUp), i.removeEventListener("click", this.focusEventHandlers.onMouseClick), this.focusEventHandlers = null;
    }
    this.measurementSystem && (this.measurementSystem.dispose(), this.measurementSystem = null), this.comfortGlyph && (this.comfortGlyph.dispose(), this.comfortGlyph = null), this.diveSystem && (this.diveSystem.dispose(), this.diveSystem = null, typeof window < "u" && window.diveSystem === this.diveSystem && (window.diveSystem = null)), this.annotationSystem && (this.annotationSystem.dispose(), this.annotationSystem = null, typeof window < "u" && window.annotationSystem === this.annotationSystem && (window.annotationSystem = null)), this.fullscreenButton && (this.fullscreenButton.remove(), this.fullscreenButton = null, document.removeEventListener("fullscreenchange", this._onFullscreenChange)), this.belowViewer && this.belowViewer.dispose(), this.removeAllListeners();
  }
}
class Gn {
  constructor(e, t = {}) {
    this.annotationSystem = e, this.options = {
      theme: "light",
      // 'light' or 'dark'
      position: "right",
      // 'left' or 'right'
      collapsed: !1,
      showFileControls: !0,
      container: null,
      // Will use annotationSystem.container if not provided
      ...t
    }, this.element = null, this.isCollapsed = this.options.collapsed || !1, this.init();
  }
  init() {
    this.createElement(), this.attachEventListeners(), this.updateAnnotationList(), this.annotationSystem && (this.annotationSystem.on("annotationAdded", () => this.updateAnnotationList()), this.annotationSystem.on("annotationRemoved", () => this.updateAnnotationList()), this.annotationSystem.on("annotationsLoaded", () => this.updateAnnotationList()), this.annotationSystem.on("annotationsChanged", () => this.updateAnnotationList()), this.annotationSystem.on("annotationUpdated", (e) => {
      e.source === "card" && this.updateAnnotationList();
    }), this.annotationSystem.on("annotationSelected", (e) => this.onAnnotationSelected(e.annotation)), this.annotationSystem.on("annotationDeselected", () => this.onAnnotationDeselected()));
  }
  createElement() {
    const e = document.querySelector(".belowjs-annotation-manager");
    e && (e.remove(), console.log("Removed existing annotation manager")), this.element = document.createElement("div"), this.element.className = `belowjs-annotation-manager ${this.options.theme}-theme ${this.isCollapsed ? "collapsed" : ""}`, this.options.position === "right" && (this.element.style.left = "auto", this.element.style.right = "0"), this.element.innerHTML = `
            <div class="manager-panel">
                <div class="manager-header">
                    <h3 class="manager-title">Annotations</h3>
                    <button class="manager-minimize" title="Collapse panel">‹</button>
                </div>
                <div class="manager-content">
                    <div class="manager-controls">
                        <button class="control-btn" id="editModeBtn">Edit Mode</button>
                        <button class="control-btn" id="clearAllBtn">Clear All</button>
                    </div>
                    
                    <div class="manager-list-container">
                        <div class="manager-list" id="annotationList">
                            <!-- Annotation items will be populated here -->
                        </div>
                    </div>
                    
                    ${this.options.showFileControls ? `
                    <div class="manager-shelf">
                        <div class="shelf-divider"></div>
                        <div class="shelf-controls">
                            <button class="shelf-btn" id="exportBtn">Export JSON</button>
                            <button class="shelf-btn" id="importBtn">Import JSON</button>
                            <input type="file" class="file-input" id="importFile" accept=".json">
                        </div>
                    </div>
                    ` : ""}
                </div>
            </div>
        `, (this.options.container || this.annotationSystem && this.annotationSystem.container || document.body).appendChild(this.element), this.createTab();
  }
  createTab() {
    const e = document.querySelector(".belowjs-annotation-tab");
    e && e.remove(), this.tabElement = document.createElement("div"), this.tabElement.className = `belowjs-annotation-tab ${this.isCollapsed ? "collapsed" : ""}`, this.tabElement.id = "managerTab", this.tabElement.innerHTML = `
            <span class="tab-label">Annotations</span>
        `, (this.options.container || this.annotationSystem && this.annotationSystem.container || document.body).appendChild(this.tabElement);
  }
  attachEventListeners() {
    const e = this.element.querySelector(".manager-minimize"), t = this.element.querySelector("#editModeBtn"), i = this.element.querySelector("#clearAllBtn"), s = this.element.querySelector("#exportBtn"), o = this.element.querySelector("#importBtn"), n = this.element.querySelector("#importFile"), a = this.tabElement || document.querySelector("#managerTab");
    e == null || e.addEventListener("click", () => this.toggleMinimize()), t == null || t.addEventListener("click", () => this.toggleEditMode()), i == null || i.addEventListener("click", () => this.clearAllAnnotations()), s == null || s.addEventListener("click", () => this.exportAnnotations()), o == null || o.addEventListener("click", () => n == null ? void 0 : n.click()), n == null || n.addEventListener("change", (r) => this.importAnnotations(r)), a == null || a.addEventListener("click", () => this.toggleMinimize()), document.addEventListener("keydown", (r) => {
      var A;
      r.key === "Escape" && ((A = this.annotationSystem) != null && A.editMode) && this.toggleEditMode();
    });
  }
  toggleMinimize() {
    var t, i;
    this.isCollapsed = !this.isCollapsed;
    const e = this.element.querySelector(".manager-minimize");
    (t = this.tabElement) == null || t.querySelector(".tab-arrow"), console.log("Toggling collapse state. Current:", this.isCollapsed), this.isCollapsed ? (this.element.classList.add("collapsed"), this.tabElement && this.tabElement.classList.add("collapsed"), e && (e.textContent = "›", e.title = "Expand panel")) : (this.element.classList.remove("collapsed"), this.tabElement && this.tabElement.classList.remove("collapsed"), e && (e.textContent = "‹", e.title = "Collapse panel")), console.log("Collapse state after toggle:", this.isCollapsed, "Panel classes:", this.element.className, "Tab classes:", (i = this.tabElement) == null ? void 0 : i.className);
  }
  toggleEditMode() {
    if (!this.annotationSystem) {
      console.warn("No annotation system available for edit mode toggle");
      return;
    }
    const e = this.element.querySelector("#editModeBtn");
    console.log("Toggling edit mode. Current state:", this.annotationSystem.editMode), this.annotationSystem.editMode ? (this.annotationSystem.exitEditMode(), e && (e.textContent = "Edit Mode", e.classList.remove("active")), this.element.classList.remove("edit-mode")) : (this.annotationSystem.enterEditMode(), e && (e.textContent = "Exit Edit", e.classList.add("active")), this.element.classList.add("edit-mode")), console.log("Edit mode after toggle:", this.annotationSystem.editMode), this.updateAnnotationList();
  }
  syncEditModeState() {
    if (!this.annotationSystem || !this.element) return;
    const e = this.annotationSystem.editMode, t = this.element.querySelector("#editModeBtn");
    e ? this.element.classList.add("edit-mode") : this.element.classList.remove("edit-mode"), t && (e ? (t.textContent = "Exit Edit", t.classList.add("active")) : (t.textContent = "Edit Mode", t.classList.remove("active")));
  }
  clearAllAnnotations() {
    this.annotationSystem && confirm("Are you sure you want to clear all annotations? This cannot be undone.") && (this.annotationSystem.clearAnnotations(), this.updateAnnotationList());
  }
  exportAnnotations() {
    this.annotationSystem && this.annotationSystem.exportAnnotations();
  }
  importAnnotations(e) {
    if (!this.annotationSystem) return;
    const t = e.target.files[0];
    t && this.annotationSystem.importAnnotations(t);
  }
  updateAnnotationList() {
    var s, o;
    const e = (s = this.element) == null ? void 0 : s.querySelector("#annotationList");
    if (!e || !this.annotationSystem) return;
    this.syncEditModeState();
    const t = this.annotationSystem.annotations || [];
    if (t.length === 0) {
      e.innerHTML = `
                <div style="text-align: center; color: #666; font-size: 13px; padding: 20px;">
                    No annotations yet.<br>
                    ${this.annotationSystem.editMode ? "Click on the 3D model to add annotations." : "Enter edit mode to start adding annotations."}
                </div>
            `;
      return;
    }
    const i = ((o = this.annotationSystem) == null ? void 0 : o.editMode) || !1;
    e.innerHTML = t.map((n, a) => `
            <div class="annotation-list-item belowjs-annotation-card-base" data-annotation-id="${n.id}" draggable="${i}">
                <div class="belowjs-annotation-card-header">
                    <span class="drag-handle">⋮⋮</span>
                    <span class="belowjs-annotation-card-index">${a + 1}.</span>
                    <span class="belowjs-annotation-card-title" contenteditable="${i}" data-field="title">${this.escapeHtml(n.title)}</span>
                    <div class="belowjs-annotation-card-actions">
                        <button class="belowjs-annotation-card-action-btn item-camera-btn" title="Update camera view" data-annotation-id="${n.id}">📷</button>
                        <button class="belowjs-annotation-card-action-btn item-delete" title="Delete annotation">🗑️</button>
                    </div>
                </div>
                <div class="belowjs-annotation-card-content">
                    <div class="belowjs-annotation-card-description" contenteditable="${i}" data-field="description">${this.escapeHtml(n.description || "")}</div>
                </div>
            </div>
        `).join(""), e.querySelectorAll(".annotation-list-item").forEach((n) => {
      const a = n.dataset.annotationId, r = t.find((h) => h.id === a);
      n.addEventListener("click", (h) => {
        h.target.contentEditable === "true" || h.target.classList.contains("belowjs-annotation-card-action-btn") || h.target.classList.contains("item-delete") || r && this.selectAnnotation(r);
      }), i && n.querySelectorAll('[contenteditable="true"]').forEach((d) => {
        d.addEventListener("blur", () => {
          const g = d.dataset.field, p = d.textContent.trim(), C = r[g];
          p !== C && this.updateAnnotationField(a, g, p);
        }), d.addEventListener("keydown", (g) => {
          g.key === "Enter" && (g.preventDefault(), d.blur());
        });
      });
      const A = n.querySelector(".item-delete");
      A && A.addEventListener("click", (h) => {
        h.stopPropagation(), this.deleteAnnotation(a);
      });
      const c = n.querySelector(".item-camera-btn");
      c && c.addEventListener("click", (h) => {
        h.stopPropagation(), this.updateAnnotationCamera(a);
      }), i && this.setupDragAndDrop(n, a);
    });
  }
  selectAnnotation(e) {
    this.annotationSystem && this.annotationSystem.selectAnnotation(e);
  }
  onAnnotationSelected(e) {
    this.element.querySelectorAll(".annotation-list-item").forEach((i) => {
      i.classList.remove("active");
    });
    const t = this.element.querySelector(`[data-annotation-id="${e.id}"]`);
    t && t.classList.add("active"), this.updateCameraButtonState();
  }
  onAnnotationDeselected() {
    this.element.querySelectorAll(".annotation-list-item").forEach((e) => {
      e.classList.remove("active");
    }), this.updateCameraButtonState();
  }
  updateAnnotationField(e, t, i) {
    if (!this.annotationSystem) return;
    const s = {};
    s[t] = i, this.annotationSystem.updateAnnotation(e, s);
    const o = this.annotationSystem.annotations.find((n) => n.id === e);
    o && this.annotationSystem.emit("annotationUpdated", { annotation: o, updates: s, source: "manager" }), console.log(`Updated annotation ${e} ${t}:`, i);
  }
  deleteAnnotation(e) {
    this.annotationSystem && confirm("Are you sure you want to delete this annotation?") && this.annotationSystem.removeAnnotation(e);
  }
  setTheme(e) {
    this.options.theme = e, this.element.className = `belowjs-annotation-manager ${e}-theme`;
  }
  show() {
    this.element && this.element.classList.remove("hidden");
  }
  hide() {
    this.element && this.element.classList.add("hidden");
  }
  updateSelectedCamera() {
    if (!this.annotationSystem || !this.annotationSystem.activeAnnotation) {
      console.warn("No annotation selected");
      return;
    }
    const e = this.annotationSystem.activeAnnotation.id;
    this.annotationSystem.updateAnnotationCameraView(e) && (this.updateAnnotationList(), console.log("Camera position updated for annotation:", e));
  }
  updateCameraButtonState() {
  }
  updateAnnotationCamera(e) {
    this.annotationSystem && this.annotationSystem.updateAnnotationCameraView(e) && console.log("Camera position updated for annotation:", e);
  }
  setupDragAndDrop(e, t) {
    let i = null;
    e.addEventListener("dragstart", (s) => {
      console.log("Drag started for:", t), i = e, e.classList.add("dragging"), s.dataTransfer.effectAllowed = "move", s.dataTransfer.setData("text/html", e.outerHTML);
    }), e.addEventListener("dragend", () => {
      console.log("Drag ended for:", t), e.classList.remove("dragging"), i = null, document.querySelectorAll(".drag-over").forEach((s) => s.classList.remove("drag-over"));
    }), e.addEventListener("dragover", (s) => {
      s.preventDefault(), s.dataTransfer.dropEffect = "move", i && i !== e && e.classList.add("drag-over");
    }), e.addEventListener("dragleave", () => {
      e.classList.remove("drag-over");
    }), e.addEventListener("drop", (s) => {
      s.preventDefault(), e.classList.remove("drag-over"), i && i !== e && (console.log("Dropping:", i.dataset.annotationId, "on:", e.dataset.annotationId), this.reorderAnnotations(i.dataset.annotationId, e.dataset.annotationId));
    });
  }
  reorderAnnotations(e, t) {
    if (!this.annotationSystem) return;
    console.log("Reordering annotations:", e, "->", t);
    const i = this.annotationSystem.annotations, s = i.findIndex((a) => a.id === e), o = i.findIndex((a) => a.id === t);
    if (console.log("Found indexes:", s, "->", o), s === -1 || o === -1) {
      console.warn("Could not find annotation indexes");
      return;
    }
    const [n] = i.splice(s, 1);
    i.splice(o, 0, n), console.log("Reordered array, updating indexes..."), this.updateAnnotationIndexes(), this.annotationSystem.options.autoSave && this.annotationSystem.saveAnnotationsToStorage(), console.log("Refreshing annotation list..."), this.updateAnnotationList(), this.annotationSystem.emit("annotationsReordered", { annotations: i });
  }
  updateAnnotationIndexes() {
    this.annotationSystem && (console.log("Updating annotation indexes..."), this.annotationSystem.annotations.forEach((e, t) => {
      const i = t + 1, s = e.index;
      e.index = i, console.log(`Updating annotation ${e.id}: ${s} -> ${i}`);
      const o = this.annotationSystem.markers.get(e.id);
      o ? (console.log(`Recreating marker for annotation ${e.id} with new index ${i}`), this.annotationSystem.markers.delete(e.id), this.annotationSystem.scene && this.annotationSystem.scene.remove(o), this.annotationSystem.createMarker(e)) : console.warn(`No marker found for annotation ${e.id}`);
    }), this.annotationSystem.nextIndex = this.annotationSystem.annotations.length + 1, console.log("Updated nextIndex to:", this.annotationSystem.nextIndex), this.annotationSystem.updateAnnotationOpacity());
  }
  escapeHtml(e) {
    if (!e) return "";
    const t = document.createElement("div");
    return t.textContent = e, t.innerHTML;
  }
  dispose() {
    this.element && (this.element.remove(), this.element = null), this.tabElement && (this.tabElement.remove(), this.tabElement = null);
  }
}
export {
  Gn as AnnotationManager,
  Ln as AnnotationSystem,
  Qn as BelowViewer,
  Ys as Camera,
  Ts as ConfigValidator,
  qe as EventSystem,
  V as ModelLoader,
  _n as ModelViewer,
  ks as Scene,
  wn as VRManager
};
