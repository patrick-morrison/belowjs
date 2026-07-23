import * as f from "three";
import { Controls as Kn, Vector3 as x, MOUSE as Je, TOUCH as je, Quaternion as Ze, Spherical as zs, Vector2 as k, Ray as ss, Plane as Gr, MathUtils as et, TrianglesDrawMode as Yn, TriangleFanDrawMode as js, TriangleStripDrawMode as Nr, Loader as li, LoaderUtils as mt, FileLoader as Te, MeshPhysicalMaterial as de, Color as ye, LinearSRGBColorSpace as ae, SRGBColorSpace as Ce, SpotLight as Jn, PointLight as Wn, DirectionalLight as Xn, Matrix4 as U, InstancedMesh as ci, InstancedBufferAttribute as Zn, Object3D as is, TextureLoader as $n, ImageBitmapLoader as eo, BufferAttribute as re, InterleavedBuffer as to, InterleavedBufferAttribute as De, LinearMipmapLinearFilter as rs, NearestMipmapLinearFilter as so, LinearMipmapNearestFilter as io, NearestMipmapNearestFilter as ro, LinearFilter as ke, NearestFilter as Vr, RepeatWrapping as Ks, MirroredRepeatWrapping as no, ClampToEdgeWrapping as oo, PointsMaterial as Or, Material as ms, LineBasicMaterial as ao, MeshStandardMaterial as hi, DoubleSide as lo, MeshBasicMaterial as Le, PropertyBinding as co, BufferGeometry as ns, SkinnedMesh as ho, Mesh as os, LineSegments as Ao, Line as uo, LineLoop as po, Points as Hr, Group as We, PerspectiveCamera as go, OrthographicCamera as qr, Skeleton as fo, AnimationClip as mo, Bone as bo, InterpolateDiscrete as Co, InterpolateLinear as zr, Texture as Ii, VectorKeyframeTrack as wi, NumberKeyframeTrack as Bi, QuaternionKeyframeTrack as Si, ColorManagement as Ys, FrontSide as yo, Interpolant as Eo, Box3 as tt, Sphere as Et, CompressedCubeTexture as Io, CompressedArrayTexture as wo, CompressedTexture as jr, NoColorSpace as Mi, RGBA_BPTC_Format as Js, RGBA_S3TC_DXT5_Format as Ws, RGBA_S3TC_DXT3_Format as vi, RGB_S3TC_DXT1_Format as xi, RGBA_S3TC_DXT1_Format as Xs, RGBA_ASTC_6x6_Format as Ti, RGBA_ASTC_4x4_Format as qt, RGBA_ETC2_EAC_Format as Kr, RGB_ETC2_Format as Yr, RedFormat as ut, RGFormat as pt, RGBAFormat as Ke, UnsignedByteType as oe, HalfFloatType as Ye, FloatType as bt, DataTexture as Jr, Data3DTexture as Bo, RGB_PVRTC_4BPPV1_Format as So, RGB_ETC1_Format as Mo, RGBA_PVRTC_4BPPV1_Format as vo, RGB_BPTC_UNSIGNED_Format as xo, Euler as To, TextureUtils as Qo, LoadingManager as Ro, EventDispatcher as vt, Frustum as Do, DefaultLoadingManager as as, Matrix3 as Wr, Float32BufferAttribute as Jt, WebGLRenderer as Lo, WebGLRenderTarget as Qi, ShaderMaterial as Xr, OneFactor as Fo, ZeroFactor as ko, CustomBlending as Po, Box2 as _o, Matrix2 as Uo, Vector4 as st, SphereGeometry as Zr, BoxGeometry as Go, DynamicDrawUsage as No, InstancedBufferGeometry as Vo, InstancedInterleavedBuffer as Zs, WireframeGeometry as Oo, ShaderLib as zt, UniformsUtils as $r, UniformsLib as jt, Line3 as Ho } from "three";
class It {
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
   *   // Process loaded model
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
    return this.events[e] ? (t ? this.events[e] = this.events[e].filter((s) => s !== t) : this.events[e] = [], this) : this;
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
    return this.events[e] ? (this.events[e].forEach((s) => {
      try {
        s(t);
      } catch (i) {
        console.error(`Error in event callback for '${e}':`, i);
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
class ls {
  /**
     * @param {object} schema - Defines validation rules for each configuration key.
     */
  constructor(e) {
    if (!e || typeof e != "object")
      throw new Error("A valid schema object is required.");
    this.schema = e;
  }
  /**
     * Validates an options object against the schema.
     * @param {object} options - The raw options object to validate.
     * @returns {object} A validated configuration object with defaults applied.
     */
  validate(e) {
    const t = {}, s = e || {};
    for (const i in this.schema) {
      const r = this.schema[i], n = s[i];
      if (r.type === "object" && r.schema) {
        const o = n ?? r.default;
        t[i] = new ls(r.schema).validate(o || {});
      } else if (n == null)
        t[i] = r.default;
      else if (this.isTypeValid(n, r.type))
        t[i] = n;
      else {
        const o = Array.isArray(r.type) ? r.type.join(" or ") : r.type;
        console.warn(
          `ConfigValidator: Invalid type for option '${i}'. Expected '${o}', but received '${typeof n}'. Using default value: ${JSON.stringify(r.default)}.`
        ), t[i] = r.default;
      }
    }
    for (const i in s)
      Object.prototype.hasOwnProperty.call(this.schema, i) || console.warn(`ConfigValidator: Unknown option '${i}' will be ignored.`);
    return t;
  }
  /**
     * Checks if a value conforms to the specified type or types.
     * @param {*} value The value to check.
     * @param {string|string[]} type The expected type or an array of allowed types.
     * @returns {boolean}
     */
  isTypeValid(e, t) {
    const s = (i, r) => r === "array" ? Array.isArray(i) : r === "object" ? i !== null && typeof i == "object" && !Array.isArray(i) : typeof i === r;
    return Array.isArray(t) ? t.some((i) => s(e, i)) : s(e, t);
  }
}
class qo {
  constructor(e = {}) {
    this.config = e, this.scene = new f.Scene(), this.init();
  }
  init() {
    let e = "#001122";
    this.config.background && (typeof this.config.background == "object" && this.config.background.value ? e = this.config.background.value : typeof this.config.background == "string" && (e = this.config.background)), this.scene.background = new f.Color(e);
  }
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
const Ri = { type: "change" }, Ai = { type: "start" }, en = { type: "end" }, xt = new ss(), Di = new Gr(), zo = Math.cos(70 * et.DEG2RAD), V = new x(), X = 2 * Math.PI, P = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, bs = 1e-6;
class jo extends Kn {
  /**
   * Constructs a new controls instance.
   *
   * @param {Object3D} object - The object that is managed by the controls.
   * @param {?HTMLDOMElement} domElement - The HTML element used for event listeners.
   */
  constructor(e, t = null) {
    super(e, t), this.state = P.NONE, this.target = new x(), this.cursor = new x(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Je.ROTATE, MIDDLE: Je.DOLLY, RIGHT: Je.PAN }, this.touches = { ONE: je.ROTATE, TWO: je.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new x(), this._lastQuaternion = new Ze(), this._lastTargetPosition = new x(), this._quat = new Ze().setFromUnitVectors(e.up, new x(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new zs(), this._sphericalDelta = new zs(), this._scale = 1, this._panOffset = new x(), this._rotateStart = new k(), this._rotateEnd = new k(), this._rotateDelta = new k(), this._panStart = new k(), this._panEnd = new k(), this._panDelta = new k(), this._dollyStart = new k(), this._dollyEnd = new k(), this._dollyDelta = new k(), this._dollyDirection = new x(), this._mouse = new k(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = Yo.bind(this), this._onPointerDown = Ko.bind(this), this._onPointerUp = Jo.bind(this), this._onContextMenu = sa.bind(this), this._onMouseWheel = Zo.bind(this), this._onKeyDown = $o.bind(this), this._onTouchStart = ea.bind(this), this._onTouchMove = ta.bind(this), this._onMouseDown = Wo.bind(this), this._onMouseMove = Xo.bind(this), this._interceptControlDown = ia.bind(this), this._interceptControlUp = ra.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Ri), this.update(), this.state = P.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    V.copy(t).sub(this.target), V.applyQuaternion(this._quat), this._spherical.setFromVector3(V), this.autoRotate && this.state === P.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let s = this.minAzimuthAngle, i = this.maxAzimuthAngle;
    isFinite(s) && isFinite(i) && (s < -Math.PI ? s += X : s > Math.PI && (s -= X), i < -Math.PI ? i += X : i > Math.PI && (i -= X), s <= i ? this._spherical.theta = Math.max(s, Math.min(i, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (s + i) / 2 ? Math.max(s, this._spherical.theta) : Math.min(i, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let r = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const n = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), r = n != this._spherical.radius;
    }
    if (V.setFromSpherical(this._spherical), V.applyQuaternion(this._quatInverse), t.copy(this.target).add(V), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let n = null;
      if (this.object.isPerspectiveCamera) {
        const o = V.length();
        n = this._clampDistance(o * this._scale);
        const l = o - n;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), r = !!l;
      } else if (this.object.isOrthographicCamera) {
        const o = new x(this._mouse.x, this._mouse.y, 0);
        o.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), r = l !== this.object.zoom;
        const c = new x(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object), this.object.position.sub(c).add(o), this.object.updateMatrixWorld(), n = V.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      n !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(n).add(this.object.position) : (xt.origin.copy(this.object.position), xt.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(xt.direction)) < zo ? this.object.lookAt(this.target) : (Di.setFromNormalAndCoplanarPoint(this.object.up, this.target), xt.intersectPlane(Di, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const n = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), n !== this.object.zoom && (this.object.updateProjectionMatrix(), r = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, r || this._lastPosition.distanceToSquared(this.object.position) > bs || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > bs || this._lastTargetPosition.distanceToSquared(this.target) > bs ? (this.dispatchEvent(Ri), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? X / 60 * this.autoRotateSpeed * e : X / 60 / 60 * this.autoRotateSpeed;
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
    V.setFromMatrixColumn(t, 0), V.multiplyScalar(-e), this._panOffset.add(V);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? V.setFromMatrixColumn(t, 1) : (V.setFromMatrixColumn(t, 0), V.crossVectors(this.object.up, V)), V.multiplyScalar(e), this._panOffset.add(V);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, t) {
    const s = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const i = this.object.position;
      V.copy(i).sub(this.target);
      let r = V.length();
      r *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * r / s.clientHeight, this.object.matrix), this._panUp(2 * t * r / s.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / s.clientWidth, this.object.matrix), this._panUp(t * (this.object.top - this.object.bottom) / this.object.zoom / s.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
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
    const s = this.domElement.getBoundingClientRect(), i = e - s.left, r = t - s.top, n = s.width, o = s.height;
    this._mouse.x = i / n * 2 - 1, this._mouse.y = -(r / o) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
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
    this._rotateLeft(X * this._rotateDelta.x / t.clientHeight), this._rotateUp(X * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(X * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-X * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(X * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-X * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
        break;
    }
    t && (e.preventDefault(), this.update());
  }
  _handleTouchStartRotate(e) {
    if (this._pointers.length === 1)
      this._rotateStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), s = 0.5 * (e.pageX + t.x), i = 0.5 * (e.pageY + t.y);
      this._rotateStart.set(s, i);
    }
  }
  _handleTouchStartPan(e) {
    if (this._pointers.length === 1)
      this._panStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), s = 0.5 * (e.pageX + t.x), i = 0.5 * (e.pageY + t.y);
      this._panStart.set(s, i);
    }
  }
  _handleTouchStartDolly(e) {
    const t = this._getSecondPointerPosition(e), s = e.pageX - t.x, i = e.pageY - t.y, r = Math.sqrt(s * s + i * i);
    this._dollyStart.set(0, r);
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
      const s = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + s.x), r = 0.5 * (e.pageY + s.y);
      this._rotateEnd.set(i, r);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(X * this._rotateDelta.x / t.clientHeight), this._rotateUp(X * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(e) {
    if (this._pointers.length === 1)
      this._panEnd.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), s = 0.5 * (e.pageX + t.x), i = 0.5 * (e.pageY + t.y);
      this._panEnd.set(s, i);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(e) {
    const t = this._getSecondPointerPosition(e), s = e.pageX - t.x, i = e.pageY - t.y, r = Math.sqrt(s * s + i * i);
    this._dollyEnd.set(0, r), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const n = (e.pageX + t.x) * 0.5, o = (e.pageY + t.y) * 0.5;
    this._updateZoomParameters(n, o);
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
    t === void 0 && (t = new k(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
  }
  _getSecondPointerPosition(e) {
    const t = e.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[t];
  }
  //
  _customWheelEvent(e) {
    const t = e.deltaMode, s = {
      clientX: e.clientX,
      clientY: e.clientY,
      deltaY: e.deltaY
    };
    switch (t) {
      case 1:
        s.deltaY *= 16;
        break;
      case 2:
        s.deltaY *= 100;
        break;
    }
    return e.ctrlKey && !this._controlActive && (s.deltaY *= 10), s;
  }
}
function Ko(a) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(a.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(a) && (this._addPointer(a), a.pointerType === "touch" ? this._onTouchStart(a) : this._onMouseDown(a)));
}
function Yo(a) {
  this.enabled !== !1 && (a.pointerType === "touch" ? this._onTouchMove(a) : this._onMouseMove(a));
}
function Jo(a) {
  switch (this._removePointer(a), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(a.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(en), this.state = P.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function Wo(a) {
  let e;
  switch (a.button) {
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
    case Je.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(a), this.state = P.DOLLY;
      break;
    case Je.ROTATE:
      if (a.ctrlKey || a.metaKey || a.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(a), this.state = P.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(a), this.state = P.ROTATE;
      }
      break;
    case Je.PAN:
      if (a.ctrlKey || a.metaKey || a.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(a), this.state = P.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(a), this.state = P.PAN;
      }
      break;
    default:
      this.state = P.NONE;
  }
  this.state !== P.NONE && this.dispatchEvent(Ai);
}
function Xo(a) {
  switch (this.state) {
    case P.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(a);
      break;
    case P.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(a);
      break;
    case P.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(a);
      break;
  }
}
function Zo(a) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== P.NONE || (a.preventDefault(), this.dispatchEvent(Ai), this._handleMouseWheel(this._customWheelEvent(a)), this.dispatchEvent(en));
}
function $o(a) {
  this.enabled !== !1 && this._handleKeyDown(a);
}
function ea(a) {
  switch (this._trackPointer(a), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case je.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(a), this.state = P.TOUCH_ROTATE;
          break;
        case je.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(a), this.state = P.TOUCH_PAN;
          break;
        default:
          this.state = P.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case je.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(a), this.state = P.TOUCH_DOLLY_PAN;
          break;
        case je.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(a), this.state = P.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = P.NONE;
      }
      break;
    default:
      this.state = P.NONE;
  }
  this.state !== P.NONE && this.dispatchEvent(Ai);
}
function ta(a) {
  switch (this._trackPointer(a), this.state) {
    case P.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(a), this.update();
      break;
    case P.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(a), this.update();
      break;
    case P.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(a), this.update();
      break;
    case P.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(a), this.update();
      break;
    default:
      this.state = P.NONE;
  }
}
function sa(a) {
  this.enabled !== !1 && a.preventDefault();
}
function ia(a) {
  a.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function ra(a) {
  a.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
class na extends It {
  /**
   * Creates a new Camera instance
   * 
   * @param {Object} [config={}] - Camera configuration
   */
  constructor(e = {}) {
    super(), this.config = e, this.camera = null, this.controls = null, this.focusAnimation = null, this.init();
  }
  init() {
    this.camera = new f.PerspectiveCamera(
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
      this.controls = new jo(this.camera, e);
      const t = this.config.desktop || {};
      this.controls.enableDamping = t.enableDamping ?? !0, this.controls.dampingFactor = t.dampingFactor ?? 0.08, this.controls.maxDistance = t.maxDistance ?? 150, this.controls.minDistance = t.minDistance ?? 0.5, this.controls.addEventListener("change", () => {
        this.emit("change");
      });
    }
  }
  update() {
    this.controls && this.controls.update();
  }
  setSize(e, t) {
    const s = e / t;
    if (this.camera?.isOrthographicCamera) {
      const i = this.camera.userData?.belowOrthoHalfHeight || Math.max((this.camera.top - this.camera.bottom) / 2, 1e-3);
      this.camera.left = -i * s, this.camera.right = i * s, this.camera.top = i, this.camera.bottom = -i, this.camera.updateProjectionMatrix();
      return;
    }
    this.camera.aspect = s, this.camera.updateProjectionMatrix();
  }
  setOrthographic(e = window.innerWidth, t = window.innerHeight) {
    if (!this.camera || this.camera.isOrthographicCamera)
      return this.camera;
    const s = e / t, i = this.controls?.target || new f.Vector3(), r = Math.max(this.camera.position.distanceTo(i), 1e-3), n = this.camera.fov || this.config.fov || 65, o = Math.max(
      Math.tan(f.MathUtils.degToRad(n / 2)) * r,
      1e-3
    ), l = new f.OrthographicCamera(
      -o * s,
      o * s,
      o,
      -o,
      this.camera.near || this.config.near || 0.05,
      this.camera.far || this.config.far || 2e3
    );
    return l.userData = {
      ...this.camera.userData,
      belowProjection: "orthographic",
      belowOrthoHalfHeight: o
    }, this.replaceCamera(l);
  }
  setPerspective(e = window.innerWidth, t = window.innerHeight) {
    if (!this.camera || this.camera.isPerspectiveCamera)
      return this.camera;
    const s = new f.PerspectiveCamera(
      this.config.fov || 65,
      e / t,
      this.camera.near || this.config.near || 0.05,
      this.camera.far || this.config.far || 2e3
    );
    return s.userData = {
      ...this.camera.userData,
      belowProjection: "perspective"
    }, this.replaceCamera(s);
  }
  setClipping({ near: e, far: t } = {}) {
    if (!this.camera)
      return null;
    const s = Number(e), i = Number(t), r = Number.isFinite(i) && i > 0 ? i : this.camera.far;
    return Number.isFinite(s) && s > 0 && s < r && (this.camera.near = s, this.config.near = s), Number.isFinite(i) && i > this.camera.near && (this.camera.far = i, this.config.far = i, this.camera.userData ||= {}, this.camera.userData.belowMinimumFar = i), this.camera.updateProjectionMatrix(), this.emit("change", { camera: this.camera }), {
      near: this.camera.near,
      far: this.camera.far
    };
  }
  setFar(e) {
    return this.setClipping({ far: e });
  }
  ensureMinimumFar(e) {
    if (!this.camera)
      return null;
    const t = Number(e);
    if (!Number.isFinite(t) || t <= this.camera.near)
      return {
        near: this.camera.near,
        far: this.camera.far
      };
    const s = Number(this.camera.userData?.belowMinimumFar), i = Math.max(
      Number.isFinite(s) ? s : 0,
      t
    );
    return this.camera.userData ||= {}, this.camera.userData.belowMinimumFar = i, this.camera.far < i && (this.camera.far = i, this.config.far = i, this.camera.updateProjectionMatrix(), this.emit("change", { camera: this.camera })), {
      near: this.camera.near,
      far: this.camera.far,
      minimumFar: i
    };
  }
  replaceCamera(e) {
    const t = this.camera;
    return !t || !e ? t || e || null : (e.position.copy(t.position), e.quaternion.copy(t.quaternion), e.up.copy(t.up), e.zoom = t.zoom || 1, e.layers.mask = t.layers.mask, e.name = t.name, e.updateProjectionMatrix(), t.parent && (t.parent.add(e), t.parent.remove(t)), this.camera = e, this.controls && (this.controls.object = e, this.controls.update()), this.emit("change", { camera: e, previousCamera: t }), e);
  }
  getCamera() {
    return this.camera;
  }
  getControls() {
    return this.controls;
  }
  resetControlInteractionState() {
    if (!this.controls) return;
    const e = this.controls, t = e.domElement;
    t && Array.isArray(e._pointers) && e._pointers.forEach((s) => {
      try {
        t.hasPointerCapture?.(s) && t.releasePointerCapture(s);
      } catch {
      }
    }), t && (e._onPointerMove && t.removeEventListener("pointermove", e._onPointerMove), e._onPointerUp && t.removeEventListener("pointerup", e._onPointerUp)), Array.isArray(e._pointers) && (e._pointers.length = 0), e._pointerPositions && (e._pointerPositions = {}), e.state = -1;
  }
  /**
   * Frame an object by positioning the camera to view it optimally
   * 
   * @method frameObject
   * @param {THREE.Vector3} center - Center point of the object
   * @param {number|THREE.Vector3} size - Bounding size (legacy scalar or box dimensions)
   * @returns {void}
   * 
   * @example
   * // Frame a model based on its bounding box
   * const box = new THREE.Box3().setFromObject(model);
   * const center = box.getCenter(new THREE.Vector3());
   * const size = box.getSize(new THREE.Vector3());
   * camera.frameObject(center, size);
   * 
   * @since 1.0.0
   */
  frameObject(e, t) {
    const s = t && t.isVector3 ? t.clone() : new f.Vector3(t || 1, t || 1, t || 1), i = Math.max(s.x, 1e-3), r = Math.max(s.y, 1e-3), n = Math.max(s.z, 1e-3), o = f.MathUtils.degToRad(this.camera.fov), l = 2 * Math.atan(Math.tan(o / 2) * this.camera.aspect), c = r * 0.5 / Math.tan(o / 2), A = i * 0.5 / Math.tan(l / 2), d = Math.max(c, A) * 1.2 + n * 0.5, u = new f.Vector3(0.7, 0.5, 0.7).normalize(), p = e.clone().add(u.multiplyScalar(d));
    this.camera.position.copy(p), this.camera.lookAt(e), this.controls && (this.controls.target.copy(e), this.controls.maxDistance = Math.max(this.controls.maxDistance, d * 4), this.controls.minDistance = Math.min(this.controls.minDistance, Math.max(d * 0.02, 0.05)), this.controls.update());
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
    const s = this.controls.target.clone(), i = this.camera.position.clone(), r = i.clone().sub(s), n = e.clone().add(r), o = 1e3, l = performance.now(), c = () => {
      this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null, this.controls.removeEventListener("start", c));
    };
    this.controls.addEventListener("start", c, { once: !0 });
    const A = () => {
      const h = performance.now() - l, d = Math.min(h / o, 1), u = 1 - Math.pow(1 - d, 3);
      this.controls.target.lerpVectors(s, e, u), this.camera.position.lerpVectors(i, n, u), d < 1 ? this.focusAnimation = requestAnimationFrame(A) : (this.focusAnimation = null, this.controls.removeEventListener("start", c), this.emit("focus-complete", { target: e, position: n }));
    };
    this.focusAnimation = requestAnimationFrame(A), this.emit("focus-start", { target: e, startPosition: i, newPosition: n });
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
function oa(a) {
  let e = 0;
  for (const s in a.attributes) {
    const i = a.getAttribute(s);
    e += i.count * i.itemSize * i.array.BYTES_PER_ELEMENT;
  }
  const t = a.getIndex();
  return e += t ? t.count * t.itemSize * t.array.BYTES_PER_ELEMENT : 0, e;
}
function Li(a, e) {
  if (e === Yn)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), a;
  if (e === js || e === Nr) {
    let t = a.getIndex();
    if (t === null) {
      const n = [], o = a.getAttribute("position");
      if (o !== void 0) {
        for (let l = 0; l < o.count; l++)
          n.push(l);
        a.setIndex(n), t = a.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), a;
    }
    const s = t.count - 2, i = [];
    if (e === js)
      for (let n = 1; n <= s; n++)
        i.push(t.getX(0)), i.push(t.getX(n)), i.push(t.getX(n + 1));
    else
      for (let n = 0; n < s; n++)
        n % 2 === 0 ? (i.push(t.getX(n)), i.push(t.getX(n + 1)), i.push(t.getX(n + 2))) : (i.push(t.getX(n + 2)), i.push(t.getX(n + 1)), i.push(t.getX(n)));
    i.length / 3 !== s && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const r = a.clone();
    return r.setIndex(i), r.clearGroups(), r;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), a;
}
class Ge extends li {
  /**
   * Constructs a new glTF loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new Aa(t);
    }), this.register(function(t) {
      return new da(t);
    }), this.register(function(t) {
      return new Ea(t);
    }), this.register(function(t) {
      return new Ia(t);
    }), this.register(function(t) {
      return new wa(t);
    }), this.register(function(t) {
      return new pa(t);
    }), this.register(function(t) {
      return new ga(t);
    }), this.register(function(t) {
      return new fa(t);
    }), this.register(function(t) {
      return new ma(t);
    }), this.register(function(t) {
      return new ha(t);
    }), this.register(function(t) {
      return new ba(t);
    }), this.register(function(t) {
      return new ua(t);
    }), this.register(function(t) {
      return new ya(t);
    }), this.register(function(t) {
      return new Ca(t);
    }), this.register(function(t) {
      return new la(t);
    }), this.register(function(t) {
      return new Ba(t);
    }), this.register(function(t) {
      return new Sa(t);
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
  load(e, t, s, i) {
    const r = this;
    let n;
    if (this.resourcePath !== "")
      n = this.resourcePath;
    else if (this.path !== "") {
      const c = mt.extractUrlBase(e);
      n = mt.resolveURL(c, this.path);
    } else
      n = mt.extractUrlBase(e);
    this.manager.itemStart(e);
    const o = function(c) {
      i ? i(c) : console.error(c), r.manager.itemError(e), r.manager.itemEnd(e);
    }, l = new Te(this.manager);
    l.setPath(this.path), l.setResponseType("arraybuffer"), l.setRequestHeader(this.requestHeader), l.setWithCredentials(this.withCredentials), l.load(e, function(c) {
      try {
        r.parse(c, n, function(A) {
          t(A), r.manager.itemEnd(e);
        }, o);
      } catch (A) {
        o(A);
      }
    }, s, o);
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
  parse(e, t, s, i) {
    let r;
    const n = {}, o = {}, l = new TextDecoder();
    if (typeof e == "string")
      r = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (l.decode(new Uint8Array(e, 0, 4)) === tn) {
        try {
          n[L.KHR_BINARY_GLTF] = new Ma(e);
        } catch (h) {
          i && i(h);
          return;
        }
        r = JSON.parse(n[L.KHR_BINARY_GLTF].content);
      } else
        r = JSON.parse(l.decode(e));
    else
      r = e;
    if (r.asset === void 0 || r.asset.version[0] < 2) {
      i && i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const c = new Ga(r, {
      path: t || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    c.fileLoader.setRequestHeader(this.requestHeader);
    for (let A = 0; A < this.pluginCallbacks.length; A++) {
      const h = this.pluginCallbacks[A](c);
      h.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), o[h.name] = h, n[h.name] = !0;
    }
    if (r.extensionsUsed)
      for (let A = 0; A < r.extensionsUsed.length; ++A) {
        const h = r.extensionsUsed[A], d = r.extensionsRequired || [];
        switch (h) {
          case L.KHR_MATERIALS_UNLIT:
            n[h] = new ca();
            break;
          case L.KHR_DRACO_MESH_COMPRESSION:
            n[h] = new va(r, this.dracoLoader);
            break;
          case L.KHR_TEXTURE_TRANSFORM:
            n[h] = new xa();
            break;
          case L.KHR_MESH_QUANTIZATION:
            n[h] = new Ta();
            break;
          default:
            d.indexOf(h) >= 0 && o[h] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + h + '".');
        }
      }
    c.setExtensions(n), c.setPlugins(o), c.parse(s, i);
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
    const s = this;
    return new Promise(function(i, r) {
      s.parse(e, t, i, r);
    });
  }
}
function aa() {
  let a = {};
  return {
    get: function(e) {
      return a[e];
    },
    add: function(e, t) {
      a[e] = t;
    },
    remove: function(e) {
      delete a[e];
    },
    removeAll: function() {
      a = {};
    }
  };
}
const L = {
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
class la {
  constructor(e) {
    this.parser = e, this.name = L.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const e = this.parser, t = this.parser.json.nodes || [];
    for (let s = 0, i = t.length; s < i; s++) {
      const r = t[s];
      r.extensions && r.extensions[this.name] && r.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, r.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const t = this.parser, s = "light:" + e;
    let i = t.cache.get(s);
    if (i) return i;
    const r = t.json, l = ((r.extensions && r.extensions[this.name] || {}).lights || [])[e];
    let c;
    const A = new ye(16777215);
    l.color !== void 0 && A.setRGB(l.color[0], l.color[1], l.color[2], ae);
    const h = l.range !== void 0 ? l.range : 0;
    switch (l.type) {
      case "directional":
        c = new Xn(A), c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      case "point":
        c = new Wn(A), c.distance = h;
        break;
      case "spot":
        c = new Jn(A), c.distance = h, l.spot = l.spot || {}, l.spot.innerConeAngle = l.spot.innerConeAngle !== void 0 ? l.spot.innerConeAngle : 0, l.spot.outerConeAngle = l.spot.outerConeAngle !== void 0 ? l.spot.outerConeAngle : Math.PI / 4, c.angle = l.spot.outerConeAngle, c.penumbra = 1 - l.spot.innerConeAngle / l.spot.outerConeAngle, c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + l.type);
    }
    return c.position.set(0, 0, 0), me(c, l), l.intensity !== void 0 && (c.intensity = l.intensity), c.name = t.createUniqueName(l.name || "light_" + e), i = Promise.resolve(c), t.cache.add(s, i), i;
  }
  getDependency(e, t) {
    if (e === "light")
      return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this, s = this.parser, r = s.json.nodes[e], o = (r.extensions && r.extensions[this.name] || {}).light;
    return o === void 0 ? null : this._loadLight(o).then(function(l) {
      return s._getNodeRef(t.cache, o, l);
    });
  }
}
class ca {
  constructor() {
    this.name = L.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return Le;
  }
  extendParams(e, t, s) {
    const i = [];
    e.color = new ye(1, 1, 1), e.opacity = 1;
    const r = t.pbrMetallicRoughness;
    if (r) {
      if (Array.isArray(r.baseColorFactor)) {
        const n = r.baseColorFactor;
        e.color.setRGB(n[0], n[1], n[2], ae), e.opacity = n[3];
      }
      r.baseColorTexture !== void 0 && i.push(s.assignTexture(e, "map", r.baseColorTexture, Ce));
    }
    return Promise.all(i);
  }
}
class ha {
  constructor(e) {
    this.parser = e, this.name = L.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const i = this.parser.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const r = i.extensions[this.name].emissiveStrength;
    return r !== void 0 && (t.emissiveIntensity = r), Promise.resolve();
  }
}
class Aa {
  constructor(e) {
    this.parser = e, this.name = L.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : de;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const r = [], n = i.extensions[this.name];
    if (n.clearcoatFactor !== void 0 && (t.clearcoat = n.clearcoatFactor), n.clearcoatTexture !== void 0 && r.push(s.assignTexture(t, "clearcoatMap", n.clearcoatTexture)), n.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = n.clearcoatRoughnessFactor), n.clearcoatRoughnessTexture !== void 0 && r.push(s.assignTexture(t, "clearcoatRoughnessMap", n.clearcoatRoughnessTexture)), n.clearcoatNormalTexture !== void 0 && (r.push(s.assignTexture(t, "clearcoatNormalMap", n.clearcoatNormalTexture)), n.clearcoatNormalTexture.scale !== void 0)) {
      const o = n.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new k(o, o);
    }
    return Promise.all(r);
  }
}
class da {
  constructor(e) {
    this.parser = e, this.name = L.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : de;
  }
  extendMaterialParams(e, t) {
    const i = this.parser.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const r = i.extensions[this.name];
    return t.dispersion = r.dispersion !== void 0 ? r.dispersion : 0, Promise.resolve();
  }
}
class ua {
  constructor(e) {
    this.parser = e, this.name = L.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : de;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const r = [], n = i.extensions[this.name];
    return n.iridescenceFactor !== void 0 && (t.iridescence = n.iridescenceFactor), n.iridescenceTexture !== void 0 && r.push(s.assignTexture(t, "iridescenceMap", n.iridescenceTexture)), n.iridescenceIor !== void 0 && (t.iridescenceIOR = n.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), n.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = n.iridescenceThicknessMinimum), n.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = n.iridescenceThicknessMaximum), n.iridescenceThicknessTexture !== void 0 && r.push(s.assignTexture(t, "iridescenceThicknessMap", n.iridescenceThicknessTexture)), Promise.all(r);
  }
}
class pa {
  constructor(e) {
    this.parser = e, this.name = L.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : de;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const r = [];
    t.sheenColor = new ye(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const n = i.extensions[this.name];
    if (n.sheenColorFactor !== void 0) {
      const o = n.sheenColorFactor;
      t.sheenColor.setRGB(o[0], o[1], o[2], ae);
    }
    return n.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = n.sheenRoughnessFactor), n.sheenColorTexture !== void 0 && r.push(s.assignTexture(t, "sheenColorMap", n.sheenColorTexture, Ce)), n.sheenRoughnessTexture !== void 0 && r.push(s.assignTexture(t, "sheenRoughnessMap", n.sheenRoughnessTexture)), Promise.all(r);
  }
}
class ga {
  constructor(e) {
    this.parser = e, this.name = L.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : de;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const r = [], n = i.extensions[this.name];
    return n.transmissionFactor !== void 0 && (t.transmission = n.transmissionFactor), n.transmissionTexture !== void 0 && r.push(s.assignTexture(t, "transmissionMap", n.transmissionTexture)), Promise.all(r);
  }
}
class fa {
  constructor(e) {
    this.parser = e, this.name = L.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : de;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const r = [], n = i.extensions[this.name];
    t.thickness = n.thicknessFactor !== void 0 ? n.thicknessFactor : 0, n.thicknessTexture !== void 0 && r.push(s.assignTexture(t, "thicknessMap", n.thicknessTexture)), t.attenuationDistance = n.attenuationDistance || 1 / 0;
    const o = n.attenuationColor || [1, 1, 1];
    return t.attenuationColor = new ye().setRGB(o[0], o[1], o[2], ae), Promise.all(r);
  }
}
class ma {
  constructor(e) {
    this.parser = e, this.name = L.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : de;
  }
  extendMaterialParams(e, t) {
    const i = this.parser.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const r = i.extensions[this.name];
    return t.ior = r.ior !== void 0 ? r.ior : 1.5, Promise.resolve();
  }
}
class ba {
  constructor(e) {
    this.parser = e, this.name = L.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : de;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const r = [], n = i.extensions[this.name];
    t.specularIntensity = n.specularFactor !== void 0 ? n.specularFactor : 1, n.specularTexture !== void 0 && r.push(s.assignTexture(t, "specularIntensityMap", n.specularTexture));
    const o = n.specularColorFactor || [1, 1, 1];
    return t.specularColor = new ye().setRGB(o[0], o[1], o[2], ae), n.specularColorTexture !== void 0 && r.push(s.assignTexture(t, "specularColorMap", n.specularColorTexture, Ce)), Promise.all(r);
  }
}
class Ca {
  constructor(e) {
    this.parser = e, this.name = L.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : de;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const r = [], n = i.extensions[this.name];
    return t.bumpScale = n.bumpFactor !== void 0 ? n.bumpFactor : 1, n.bumpTexture !== void 0 && r.push(s.assignTexture(t, "bumpMap", n.bumpTexture)), Promise.all(r);
  }
}
class ya {
  constructor(e) {
    this.parser = e, this.name = L.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : de;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const r = [], n = i.extensions[this.name];
    return n.anisotropyStrength !== void 0 && (t.anisotropy = n.anisotropyStrength), n.anisotropyRotation !== void 0 && (t.anisotropyRotation = n.anisotropyRotation), n.anisotropyTexture !== void 0 && r.push(s.assignTexture(t, "anisotropyMap", n.anisotropyTexture)), Promise.all(r);
  }
}
class Ea {
  constructor(e) {
    this.parser = e, this.name = L.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser, s = t.json, i = s.textures[e];
    if (!i.extensions || !i.extensions[this.name])
      return null;
    const r = i.extensions[this.name], n = t.options.ktx2Loader;
    if (!n) {
      if (s.extensionsRequired && s.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, r.source, n);
  }
}
class Ia {
  constructor(e) {
    this.parser = e, this.name = L.EXT_TEXTURE_WEBP;
  }
  loadTexture(e) {
    const t = this.name, s = this.parser, i = s.json, r = i.textures[e];
    if (!r.extensions || !r.extensions[t])
      return null;
    const n = r.extensions[t], o = i.images[n.source];
    let l = s.textureLoader;
    if (o.uri) {
      const c = s.options.manager.getHandler(o.uri);
      c !== null && (l = c);
    }
    return s.loadTextureImage(e, n.source, l);
  }
}
class wa {
  constructor(e) {
    this.parser = e, this.name = L.EXT_TEXTURE_AVIF;
  }
  loadTexture(e) {
    const t = this.name, s = this.parser, i = s.json, r = i.textures[e];
    if (!r.extensions || !r.extensions[t])
      return null;
    const n = r.extensions[t], o = i.images[n.source];
    let l = s.textureLoader;
    if (o.uri) {
      const c = s.options.manager.getHandler(o.uri);
      c !== null && (l = c);
    }
    return s.loadTextureImage(e, n.source, l);
  }
}
class Ba {
  constructor(e) {
    this.name = L.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const t = this.parser.json, s = t.bufferViews[e];
    if (s.extensions && s.extensions[this.name]) {
      const i = s.extensions[this.name], r = this.parser.getDependency("buffer", i.buffer), n = this.parser.options.meshoptDecoder;
      if (!n || !n.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return r.then(function(o) {
        const l = i.byteOffset || 0, c = i.byteLength || 0, A = i.count, h = i.byteStride, d = new Uint8Array(o, l, c);
        return n.decodeGltfBufferAsync ? n.decodeGltfBufferAsync(A, h, d, i.mode, i.filter).then(function(u) {
          return u.buffer;
        }) : n.ready.then(function() {
          const u = new ArrayBuffer(A * h);
          return n.decodeGltfBuffer(new Uint8Array(u), A, h, d, i.mode, i.filter), u;
        });
      });
    } else
      return null;
  }
}
class Sa {
  constructor(e) {
    this.name = L.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, s = t.nodes[e];
    if (!s.extensions || !s.extensions[this.name] || s.mesh === void 0)
      return null;
    const i = t.meshes[s.mesh];
    for (const c of i.primitives)
      if (c.mode !== ie.TRIANGLES && c.mode !== ie.TRIANGLE_STRIP && c.mode !== ie.TRIANGLE_FAN && c.mode !== void 0)
        return null;
    const n = s.extensions[this.name].attributes, o = [], l = {};
    for (const c in n)
      o.push(this.parser.getDependency("accessor", n[c]).then((A) => (l[c] = A, l[c])));
    return o.length < 1 ? null : (o.push(this.parser.createNodeMesh(e)), Promise.all(o).then((c) => {
      const A = c.pop(), h = A.isGroup ? A.children : [A], d = c[0].count, u = [];
      for (const p of h) {
        const g = new U(), b = new x(), C = new Ze(), y = new x(1, 1, 1), E = new ci(p.geometry, p.material, d);
        for (let m = 0; m < d; m++)
          l.TRANSLATION && b.fromBufferAttribute(l.TRANSLATION, m), l.ROTATION && C.fromBufferAttribute(l.ROTATION, m), l.SCALE && y.fromBufferAttribute(l.SCALE, m), E.setMatrixAt(m, g.compose(b, C, y));
        for (const m in l)
          if (m === "_COLOR_0") {
            const I = l[m];
            E.instanceColor = new Zn(I.array, I.itemSize, I.normalized);
          } else m !== "TRANSLATION" && m !== "ROTATION" && m !== "SCALE" && p.geometry.setAttribute(m, l[m]);
        is.prototype.copy.call(E, p), this.parser.assignFinalMaterial(E), u.push(E);
      }
      return A.isGroup ? (A.clear(), A.add(...u), A) : u[0];
    }));
  }
}
const tn = "glTF", rt = 12, Fi = { JSON: 1313821514, BIN: 5130562 };
class Ma {
  constructor(e) {
    this.name = L.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, rt), s = new TextDecoder();
    if (this.header = {
      magic: s.decode(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== tn)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const i = this.header.length - rt, r = new DataView(e, rt);
    let n = 0;
    for (; n < i; ) {
      const o = r.getUint32(n, !0);
      n += 4;
      const l = r.getUint32(n, !0);
      if (n += 4, l === Fi.JSON) {
        const c = new Uint8Array(e, rt + n, o);
        this.content = s.decode(c);
      } else if (l === Fi.BIN) {
        const c = rt + n;
        this.body = e.slice(c, c + o);
      }
      n += o;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class va {
  constructor(e, t) {
    if (!t)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = L.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const s = this.json, i = this.dracoLoader, r = e.extensions[this.name].bufferView, n = e.extensions[this.name].attributes, o = {}, l = {}, c = {};
    for (const A in n) {
      const h = $s[A] || A.toLowerCase();
      o[h] = n[A];
    }
    for (const A in e.attributes) {
      const h = $s[A] || A.toLowerCase();
      if (n[A] !== void 0) {
        const d = s.accessors[e.attributes[A]], u = Xe[d.componentType];
        c[h] = u.name, l[h] = d.normalized === !0;
      }
    }
    return t.getDependency("bufferView", r).then(function(A) {
      return new Promise(function(h, d) {
        i.decodeDracoFile(A, function(u) {
          for (const p in u.attributes) {
            const g = u.attributes[p], b = l[p];
            b !== void 0 && (g.normalized = b);
          }
          h(u);
        }, o, c, ae, d);
      });
    });
  }
}
class xa {
  constructor() {
    this.name = L.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}
class Ta {
  constructor() {
    this.name = L.KHR_MESH_QUANTIZATION;
  }
}
class sn extends Eo {
  constructor(e, t, s, i) {
    super(e, t, s, i);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, s = this.sampleValues, i = this.valueSize, r = e * i * 3 + i;
    for (let n = 0; n !== i; n++)
      t[n] = s[r + n];
    return t;
  }
  interpolate_(e, t, s, i) {
    const r = this.resultBuffer, n = this.sampleValues, o = this.valueSize, l = o * 2, c = o * 3, A = i - t, h = (s - t) / A, d = h * h, u = d * h, p = e * c, g = p - c, b = -2 * u + 3 * d, C = u - d, y = 1 - b, E = C - d + h;
    for (let m = 0; m !== o; m++) {
      const I = n[g + m + o], B = n[g + m + l] * A, w = n[p + m + o], v = n[p + m] * A;
      r[m] = y * I + E * B + b * w + C * v;
    }
    return r;
  }
}
const Qa = new Ze();
class Ra extends sn {
  interpolate_(e, t, s, i) {
    const r = super.interpolate_(e, t, s, i);
    return Qa.fromArray(r).normalize().toArray(r), r;
  }
}
const ie = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
}, Xe = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, ki = {
  9728: Vr,
  9729: ke,
  9984: ro,
  9985: io,
  9986: so,
  9987: rs
}, Pi = {
  33071: oo,
  33648: no,
  10497: Ks
}, Cs = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, $s = {
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
}, Ie = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, Da = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: zr,
  STEP: Co
}, ys = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function La(a) {
  return a.DefaultMaterial === void 0 && (a.DefaultMaterial = new hi({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: yo
  })), a.DefaultMaterial;
}
function Qe(a, e, t) {
  for (const s in t.extensions)
    a[s] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[s] = t.extensions[s]);
}
function me(a, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(a.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function Fa(a, e, t) {
  let s = !1, i = !1, r = !1;
  for (let c = 0, A = e.length; c < A; c++) {
    const h = e[c];
    if (h.POSITION !== void 0 && (s = !0), h.NORMAL !== void 0 && (i = !0), h.COLOR_0 !== void 0 && (r = !0), s && i && r) break;
  }
  if (!s && !i && !r) return Promise.resolve(a);
  const n = [], o = [], l = [];
  for (let c = 0, A = e.length; c < A; c++) {
    const h = e[c];
    if (s) {
      const d = h.POSITION !== void 0 ? t.getDependency("accessor", h.POSITION) : a.attributes.position;
      n.push(d);
    }
    if (i) {
      const d = h.NORMAL !== void 0 ? t.getDependency("accessor", h.NORMAL) : a.attributes.normal;
      o.push(d);
    }
    if (r) {
      const d = h.COLOR_0 !== void 0 ? t.getDependency("accessor", h.COLOR_0) : a.attributes.color;
      l.push(d);
    }
  }
  return Promise.all([
    Promise.all(n),
    Promise.all(o),
    Promise.all(l)
  ]).then(function(c) {
    const A = c[0], h = c[1], d = c[2];
    return s && (a.morphAttributes.position = A), i && (a.morphAttributes.normal = h), r && (a.morphAttributes.color = d), a.morphTargetsRelative = !0, a;
  });
}
function ka(a, e) {
  if (a.updateMorphTargets(), e.weights !== void 0)
    for (let t = 0, s = e.weights.length; t < s; t++)
      a.morphTargetInfluences[t] = e.weights[t];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const t = e.extras.targetNames;
    if (a.morphTargetInfluences.length === t.length) {
      a.morphTargetDictionary = {};
      for (let s = 0, i = t.length; s < i; s++)
        a.morphTargetDictionary[t[s]] = s;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function Pa(a) {
  let e;
  const t = a.extensions && a.extensions[L.KHR_DRACO_MESH_COMPRESSION];
  if (t ? e = "draco:" + t.bufferView + ":" + t.indices + ":" + Es(t.attributes) : e = a.indices + ":" + Es(a.attributes) + ":" + a.mode, a.targets !== void 0)
    for (let s = 0, i = a.targets.length; s < i; s++)
      e += ":" + Es(a.targets[s]);
  return e;
}
function Es(a) {
  let e = "";
  const t = Object.keys(a).sort();
  for (let s = 0, i = t.length; s < i; s++)
    e += t[s] + ":" + a[t[s]] + ";";
  return e;
}
function ei(a) {
  switch (a) {
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
function _a(a) {
  return a.search(/\.jpe?g($|\?)/i) > 0 || a.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : a.search(/\.webp($|\?)/i) > 0 || a.search(/^data\:image\/webp/) === 0 ? "image/webp" : a.search(/\.ktx2($|\?)/i) > 0 || a.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png";
}
const Ua = new U();
class Ga {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new aa(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let s = !1, i = -1, r = !1, n = -1;
    if (typeof navigator < "u") {
      const o = navigator.userAgent;
      s = /^((?!chrome|android).)*safari/i.test(o) === !0;
      const l = o.match(/Version\/(\d+)/);
      i = s && l ? parseInt(l[1], 10) : -1, r = o.indexOf("Firefox") > -1, n = r ? o.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || s && i < 17 || r && n < 98 ? this.textureLoader = new $n(this.options.manager) : this.textureLoader = new eo(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new Te(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    const s = this, i = this.json, r = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(n) {
      return n._markDefs && n._markDefs();
    }), Promise.all(this._invokeAll(function(n) {
      return n.beforeRoot && n.beforeRoot();
    })).then(function() {
      return Promise.all([
        s.getDependencies("scene"),
        s.getDependencies("animation"),
        s.getDependencies("camera")
      ]);
    }).then(function(n) {
      const o = {
        scene: n[0][i.scene || 0],
        scenes: n[0],
        animations: n[1],
        cameras: n[2],
        asset: i.asset,
        parser: s,
        userData: {}
      };
      return Qe(r, o, i), me(o, i), Promise.all(s._invokeAll(function(l) {
        return l.afterRoot && l.afterRoot(o);
      })).then(function() {
        for (const l of o.scenes)
          l.updateMatrixWorld();
        e(o);
      });
    }).catch(t);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   *
   * @private
   */
  _markDefs() {
    const e = this.json.nodes || [], t = this.json.skins || [], s = this.json.meshes || [];
    for (let i = 0, r = t.length; i < r; i++) {
      const n = t[i].joints;
      for (let o = 0, l = n.length; o < l; o++)
        e[n[o]].isBone = !0;
    }
    for (let i = 0, r = e.length; i < r; i++) {
      const n = e[i];
      n.mesh !== void 0 && (this._addNodeRef(this.meshCache, n.mesh), n.skin !== void 0 && (s[n.mesh].isSkinnedMesh = !0)), n.camera !== void 0 && this._addNodeRef(this.cameraCache, n.camera);
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
  _getNodeRef(e, t, s) {
    if (e.refs[t] <= 1) return s;
    const i = s.clone(), r = (n, o) => {
      const l = this.associations.get(n);
      l != null && this.associations.set(o, l);
      for (const [c, A] of n.children.entries())
        r(A, o.children[c]);
    };
    return r(s, i), i.name += "_instance_" + e.uses[t]++, i;
  }
  _invokeOne(e) {
    const t = Object.values(this.plugins);
    t.push(this);
    for (let s = 0; s < t.length; s++) {
      const i = e(t[s]);
      if (i) return i;
    }
    return null;
  }
  _invokeAll(e) {
    const t = Object.values(this.plugins);
    t.unshift(this);
    const s = [];
    for (let i = 0; i < t.length; i++) {
      const r = e(t[i]);
      r && s.push(r);
    }
    return s;
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
    const s = e + ":" + t;
    let i = this.cache.get(s);
    if (!i) {
      switch (e) {
        case "scene":
          i = this.loadScene(t);
          break;
        case "node":
          i = this._invokeOne(function(r) {
            return r.loadNode && r.loadNode(t);
          });
          break;
        case "mesh":
          i = this._invokeOne(function(r) {
            return r.loadMesh && r.loadMesh(t);
          });
          break;
        case "accessor":
          i = this.loadAccessor(t);
          break;
        case "bufferView":
          i = this._invokeOne(function(r) {
            return r.loadBufferView && r.loadBufferView(t);
          });
          break;
        case "buffer":
          i = this.loadBuffer(t);
          break;
        case "material":
          i = this._invokeOne(function(r) {
            return r.loadMaterial && r.loadMaterial(t);
          });
          break;
        case "texture":
          i = this._invokeOne(function(r) {
            return r.loadTexture && r.loadTexture(t);
          });
          break;
        case "skin":
          i = this.loadSkin(t);
          break;
        case "animation":
          i = this._invokeOne(function(r) {
            return r.loadAnimation && r.loadAnimation(t);
          });
          break;
        case "camera":
          i = this.loadCamera(t);
          break;
        default:
          if (i = this._invokeOne(function(r) {
            return r != this && r.getDependency && r.getDependency(e, t);
          }), !i)
            throw new Error("Unknown type: " + e);
          break;
      }
      this.cache.add(s, i);
    }
    return i;
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
      const s = this, i = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      t = Promise.all(i.map(function(r, n) {
        return s.getDependency(e, n);
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
    const t = this.json.buffers[e], s = this.fileLoader;
    if (t.type && t.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
    if (t.uri === void 0 && e === 0)
      return Promise.resolve(this.extensions[L.KHR_BINARY_GLTF].body);
    const i = this.options;
    return new Promise(function(r, n) {
      s.load(mt.resolveURL(t.uri, i.path), r, void 0, function() {
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
    return this.getDependency("buffer", t.buffer).then(function(s) {
      const i = t.byteLength || 0, r = t.byteOffset || 0;
      return s.slice(r, r + i);
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
    const t = this, s = this.json, i = this.json.accessors[e];
    if (i.bufferView === void 0 && i.sparse === void 0) {
      const n = Cs[i.type], o = Xe[i.componentType], l = i.normalized === !0, c = new o(i.count * n);
      return Promise.resolve(new re(c, n, l));
    }
    const r = [];
    return i.bufferView !== void 0 ? r.push(this.getDependency("bufferView", i.bufferView)) : r.push(null), i.sparse !== void 0 && (r.push(this.getDependency("bufferView", i.sparse.indices.bufferView)), r.push(this.getDependency("bufferView", i.sparse.values.bufferView))), Promise.all(r).then(function(n) {
      const o = n[0], l = Cs[i.type], c = Xe[i.componentType], A = c.BYTES_PER_ELEMENT, h = A * l, d = i.byteOffset || 0, u = i.bufferView !== void 0 ? s.bufferViews[i.bufferView].byteStride : void 0, p = i.normalized === !0;
      let g, b;
      if (u && u !== h) {
        const C = Math.floor(d / u), y = "InterleavedBuffer:" + i.bufferView + ":" + i.componentType + ":" + C + ":" + i.count;
        let E = t.cache.get(y);
        E || (g = new c(o, C * u, i.count * u / A), E = new to(g, u / A), t.cache.add(y, E)), b = new De(E, l, d % u / A, p);
      } else
        o === null ? g = new c(i.count * l) : g = new c(o, d, i.count * l), b = new re(g, l, p);
      if (i.sparse !== void 0) {
        const C = Cs.SCALAR, y = Xe[i.sparse.indices.componentType], E = i.sparse.indices.byteOffset || 0, m = i.sparse.values.byteOffset || 0, I = new y(n[1], E, i.sparse.count * C), B = new c(n[2], m, i.sparse.count * l);
        o !== null && (b = new re(b.array.slice(), b.itemSize, b.normalized)), b.normalized = !1;
        for (let w = 0, v = I.length; w < v; w++) {
          const M = I[w];
          if (b.setX(M, B[w * l]), l >= 2 && b.setY(M, B[w * l + 1]), l >= 3 && b.setZ(M, B[w * l + 2]), l >= 4 && b.setW(M, B[w * l + 3]), l >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        b.normalized = p;
      }
      return b;
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
    const t = this.json, s = this.options, r = t.textures[e].source, n = t.images[r];
    let o = this.textureLoader;
    if (n.uri) {
      const l = s.manager.getHandler(n.uri);
      l !== null && (o = l);
    }
    return this.loadTextureImage(e, r, o);
  }
  loadTextureImage(e, t, s) {
    const i = this, r = this.json, n = r.textures[e], o = r.images[t], l = (o.uri || o.bufferView) + ":" + n.sampler;
    if (this.textureCache[l])
      return this.textureCache[l];
    const c = this.loadImageSource(t, s).then(function(A) {
      A.flipY = !1, A.name = n.name || o.name || "", A.name === "" && typeof o.uri == "string" && o.uri.startsWith("data:image/") === !1 && (A.name = o.uri);
      const d = (r.samplers || {})[n.sampler] || {};
      return A.magFilter = ki[d.magFilter] || ke, A.minFilter = ki[d.minFilter] || rs, A.wrapS = Pi[d.wrapS] || Ks, A.wrapT = Pi[d.wrapT] || Ks, A.generateMipmaps = !A.isCompressedTexture && A.minFilter !== Vr && A.minFilter !== ke, i.associations.set(A, { textures: e }), A;
    }).catch(function() {
      return null;
    });
    return this.textureCache[l] = c, c;
  }
  loadImageSource(e, t) {
    const s = this, i = this.json, r = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((h) => h.clone());
    const n = i.images[e], o = self.URL || self.webkitURL;
    let l = n.uri || "", c = !1;
    if (n.bufferView !== void 0)
      l = s.getDependency("bufferView", n.bufferView).then(function(h) {
        c = !0;
        const d = new Blob([h], { type: n.mimeType });
        return l = o.createObjectURL(d), l;
      });
    else if (n.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const A = Promise.resolve(l).then(function(h) {
      return new Promise(function(d, u) {
        let p = d;
        t.isImageBitmapLoader === !0 && (p = function(g) {
          const b = new Ii(g);
          b.needsUpdate = !0, d(b);
        }), t.load(mt.resolveURL(h, r.path), p, void 0, u);
      });
    }).then(function(h) {
      return c === !0 && o.revokeObjectURL(l), me(h, n), h.userData.mimeType = n.mimeType || _a(n.uri), h;
    }).catch(function(h) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", l), h;
    });
    return this.sourceCache[e] = A, A;
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
  assignTexture(e, t, s, i) {
    const r = this;
    return this.getDependency("texture", s.index).then(function(n) {
      if (!n) return null;
      if (s.texCoord !== void 0 && s.texCoord > 0 && (n = n.clone(), n.channel = s.texCoord), r.extensions[L.KHR_TEXTURE_TRANSFORM]) {
        const o = s.extensions !== void 0 ? s.extensions[L.KHR_TEXTURE_TRANSFORM] : void 0;
        if (o) {
          const l = r.associations.get(n);
          n = r.extensions[L.KHR_TEXTURE_TRANSFORM].extendTexture(n, o), r.associations.set(n, l);
        }
      }
      return i !== void 0 && (n.colorSpace = i), e[t] = n, n;
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
    let s = e.material;
    const i = t.attributes.tangent === void 0, r = t.attributes.color !== void 0, n = t.attributes.normal === void 0;
    if (e.isPoints) {
      const o = "PointsMaterial:" + s.uuid;
      let l = this.cache.get(o);
      l || (l = new Or(), ms.prototype.copy.call(l, s), l.color.copy(s.color), l.map = s.map, l.sizeAttenuation = !1, this.cache.add(o, l)), s = l;
    } else if (e.isLine) {
      const o = "LineBasicMaterial:" + s.uuid;
      let l = this.cache.get(o);
      l || (l = new ao(), ms.prototype.copy.call(l, s), l.color.copy(s.color), l.map = s.map, this.cache.add(o, l)), s = l;
    }
    if (i || r || n) {
      let o = "ClonedMaterial:" + s.uuid + ":";
      i && (o += "derivative-tangents:"), r && (o += "vertex-colors:"), n && (o += "flat-shading:");
      let l = this.cache.get(o);
      l || (l = s.clone(), r && (l.vertexColors = !0), n && (l.flatShading = !0), i && (l.normalScale && (l.normalScale.y *= -1), l.clearcoatNormalScale && (l.clearcoatNormalScale.y *= -1)), this.cache.add(o, l), this.associations.set(l, this.associations.get(s))), s = l;
    }
    e.material = s;
  }
  getMaterialType() {
    return hi;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   *
   * @private
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(e) {
    const t = this, s = this.json, i = this.extensions, r = s.materials[e];
    let n;
    const o = {}, l = r.extensions || {}, c = [];
    if (l[L.KHR_MATERIALS_UNLIT]) {
      const h = i[L.KHR_MATERIALS_UNLIT];
      n = h.getMaterialType(), c.push(h.extendParams(o, r, t));
    } else {
      const h = r.pbrMetallicRoughness || {};
      if (o.color = new ye(1, 1, 1), o.opacity = 1, Array.isArray(h.baseColorFactor)) {
        const d = h.baseColorFactor;
        o.color.setRGB(d[0], d[1], d[2], ae), o.opacity = d[3];
      }
      h.baseColorTexture !== void 0 && c.push(t.assignTexture(o, "map", h.baseColorTexture, Ce)), o.metalness = h.metallicFactor !== void 0 ? h.metallicFactor : 1, o.roughness = h.roughnessFactor !== void 0 ? h.roughnessFactor : 1, h.metallicRoughnessTexture !== void 0 && (c.push(t.assignTexture(o, "metalnessMap", h.metallicRoughnessTexture)), c.push(t.assignTexture(o, "roughnessMap", h.metallicRoughnessTexture))), n = this._invokeOne(function(d) {
        return d.getMaterialType && d.getMaterialType(e);
      }), c.push(Promise.all(this._invokeAll(function(d) {
        return d.extendMaterialParams && d.extendMaterialParams(e, o);
      })));
    }
    r.doubleSided === !0 && (o.side = lo);
    const A = r.alphaMode || ys.OPAQUE;
    if (A === ys.BLEND ? (o.transparent = !0, o.depthWrite = !1) : (o.transparent = !1, A === ys.MASK && (o.alphaTest = r.alphaCutoff !== void 0 ? r.alphaCutoff : 0.5)), r.normalTexture !== void 0 && n !== Le && (c.push(t.assignTexture(o, "normalMap", r.normalTexture)), o.normalScale = new k(1, 1), r.normalTexture.scale !== void 0)) {
      const h = r.normalTexture.scale;
      o.normalScale.set(h, h);
    }
    if (r.occlusionTexture !== void 0 && n !== Le && (c.push(t.assignTexture(o, "aoMap", r.occlusionTexture)), r.occlusionTexture.strength !== void 0 && (o.aoMapIntensity = r.occlusionTexture.strength)), r.emissiveFactor !== void 0 && n !== Le) {
      const h = r.emissiveFactor;
      o.emissive = new ye().setRGB(h[0], h[1], h[2], ae);
    }
    return r.emissiveTexture !== void 0 && n !== Le && c.push(t.assignTexture(o, "emissiveMap", r.emissiveTexture, Ce)), Promise.all(c).then(function() {
      const h = new n(o);
      return r.name && (h.name = r.name), me(h, r), t.associations.set(h, { materials: e }), r.extensions && Qe(i, h, r), h;
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
    const t = co.sanitizeNodeName(e || "");
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
    const t = this, s = this.extensions, i = this.primitiveCache;
    function r(o) {
      return s[L.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o, t).then(function(l) {
        return _i(l, o, t);
      });
    }
    const n = [];
    for (let o = 0, l = e.length; o < l; o++) {
      const c = e[o], A = Pa(c), h = i[A];
      if (h)
        n.push(h.promise);
      else {
        let d;
        c.extensions && c.extensions[L.KHR_DRACO_MESH_COMPRESSION] ? d = r(c) : d = _i(new ns(), c, t), i[A] = { primitive: c, promise: d }, n.push(d);
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
    const t = this, s = this.json, i = this.extensions, r = s.meshes[e], n = r.primitives, o = [];
    for (let l = 0, c = n.length; l < c; l++) {
      const A = n[l].material === void 0 ? La(this.cache) : this.getDependency("material", n[l].material);
      o.push(A);
    }
    return o.push(t.loadGeometries(n)), Promise.all(o).then(function(l) {
      const c = l.slice(0, l.length - 1), A = l[l.length - 1], h = [];
      for (let u = 0, p = A.length; u < p; u++) {
        const g = A[u], b = n[u];
        let C;
        const y = c[u];
        if (b.mode === ie.TRIANGLES || b.mode === ie.TRIANGLE_STRIP || b.mode === ie.TRIANGLE_FAN || b.mode === void 0)
          C = r.isSkinnedMesh === !0 ? new ho(g, y) : new os(g, y), C.isSkinnedMesh === !0 && C.normalizeSkinWeights(), b.mode === ie.TRIANGLE_STRIP ? C.geometry = Li(C.geometry, Nr) : b.mode === ie.TRIANGLE_FAN && (C.geometry = Li(C.geometry, js));
        else if (b.mode === ie.LINES)
          C = new Ao(g, y);
        else if (b.mode === ie.LINE_STRIP)
          C = new uo(g, y);
        else if (b.mode === ie.LINE_LOOP)
          C = new po(g, y);
        else if (b.mode === ie.POINTS)
          C = new Hr(g, y);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + b.mode);
        Object.keys(C.geometry.morphAttributes).length > 0 && ka(C, r), C.name = t.createUniqueName(r.name || "mesh_" + e), me(C, r), b.extensions && Qe(i, C, b), t.assignFinalMaterial(C), h.push(C);
      }
      for (let u = 0, p = h.length; u < p; u++)
        t.associations.set(h[u], {
          meshes: e,
          primitives: u
        });
      if (h.length === 1)
        return r.extensions && Qe(i, h[0], r), h[0];
      const d = new We();
      r.extensions && Qe(i, d, r), t.associations.set(d, { meshes: e });
      for (let u = 0, p = h.length; u < p; u++)
        d.add(h[u]);
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
    const s = this.json.cameras[e], i = s[s.type];
    if (!i) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return s.type === "perspective" ? t = new go(et.radToDeg(i.yfov), i.aspectRatio || 1, i.znear || 1, i.zfar || 2e6) : s.type === "orthographic" && (t = new qr(-i.xmag, i.xmag, i.ymag, -i.ymag, i.znear, i.zfar)), s.name && (t.name = this.createUniqueName(s.name)), me(t, s), Promise.resolve(t);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   *
   * @private
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(e) {
    const t = this.json.skins[e], s = [];
    for (let i = 0, r = t.joints.length; i < r; i++)
      s.push(this._loadNodeShallow(t.joints[i]));
    return t.inverseBindMatrices !== void 0 ? s.push(this.getDependency("accessor", t.inverseBindMatrices)) : s.push(null), Promise.all(s).then(function(i) {
      const r = i.pop(), n = i, o = [], l = [];
      for (let c = 0, A = n.length; c < A; c++) {
        const h = n[c];
        if (h) {
          o.push(h);
          const d = new U();
          r !== null && d.fromArray(r.array, c * 16), l.push(d);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[c]);
      }
      return new fo(o, l);
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
    const t = this.json, s = this, i = t.animations[e], r = i.name ? i.name : "animation_" + e, n = [], o = [], l = [], c = [], A = [];
    for (let h = 0, d = i.channels.length; h < d; h++) {
      const u = i.channels[h], p = i.samplers[u.sampler], g = u.target, b = g.node, C = i.parameters !== void 0 ? i.parameters[p.input] : p.input, y = i.parameters !== void 0 ? i.parameters[p.output] : p.output;
      g.node !== void 0 && (n.push(this.getDependency("node", b)), o.push(this.getDependency("accessor", C)), l.push(this.getDependency("accessor", y)), c.push(p), A.push(g));
    }
    return Promise.all([
      Promise.all(n),
      Promise.all(o),
      Promise.all(l),
      Promise.all(c),
      Promise.all(A)
    ]).then(function(h) {
      const d = h[0], u = h[1], p = h[2], g = h[3], b = h[4], C = [];
      for (let y = 0, E = d.length; y < E; y++) {
        const m = d[y], I = u[y], B = p[y], w = g[y], v = b[y];
        if (m === void 0) continue;
        m.updateMatrix && m.updateMatrix();
        const M = s._createAnimationTracks(m, I, B, w, v);
        if (M)
          for (let S = 0; S < M.length; S++)
            C.push(M[S]);
      }
      return new mo(r, void 0, C);
    });
  }
  createNodeMesh(e) {
    const t = this.json, s = this, i = t.nodes[e];
    return i.mesh === void 0 ? null : s.getDependency("mesh", i.mesh).then(function(r) {
      const n = s._getNodeRef(s.meshCache, i.mesh, r);
      return i.weights !== void 0 && n.traverse(function(o) {
        if (o.isMesh)
          for (let l = 0, c = i.weights.length; l < c; l++)
            o.morphTargetInfluences[l] = i.weights[l];
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
    const t = this.json, s = this, i = t.nodes[e], r = s._loadNodeShallow(e), n = [], o = i.children || [];
    for (let c = 0, A = o.length; c < A; c++)
      n.push(s.getDependency("node", o[c]));
    const l = i.skin === void 0 ? Promise.resolve(null) : s.getDependency("skin", i.skin);
    return Promise.all([
      r,
      Promise.all(n),
      l
    ]).then(function(c) {
      const A = c[0], h = c[1], d = c[2];
      d !== null && A.traverse(function(u) {
        u.isSkinnedMesh && u.bind(d, Ua);
      });
      for (let u = 0, p = h.length; u < p; u++)
        A.add(h[u]);
      return A;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(e) {
    const t = this.json, s = this.extensions, i = this;
    if (this.nodeCache[e] !== void 0)
      return this.nodeCache[e];
    const r = t.nodes[e], n = r.name ? i.createUniqueName(r.name) : "", o = [], l = i._invokeOne(function(c) {
      return c.createNodeMesh && c.createNodeMesh(e);
    });
    return l && o.push(l), r.camera !== void 0 && o.push(i.getDependency("camera", r.camera).then(function(c) {
      return i._getNodeRef(i.cameraCache, r.camera, c);
    })), i._invokeAll(function(c) {
      return c.createNodeAttachment && c.createNodeAttachment(e);
    }).forEach(function(c) {
      o.push(c);
    }), this.nodeCache[e] = Promise.all(o).then(function(c) {
      let A;
      if (r.isBone === !0 ? A = new bo() : c.length > 1 ? A = new We() : c.length === 1 ? A = c[0] : A = new is(), A !== c[0])
        for (let h = 0, d = c.length; h < d; h++)
          A.add(c[h]);
      if (r.name && (A.userData.name = r.name, A.name = n), me(A, r), r.extensions && Qe(s, A, r), r.matrix !== void 0) {
        const h = new U();
        h.fromArray(r.matrix), A.applyMatrix4(h);
      } else
        r.translation !== void 0 && A.position.fromArray(r.translation), r.rotation !== void 0 && A.quaternion.fromArray(r.rotation), r.scale !== void 0 && A.scale.fromArray(r.scale);
      if (!i.associations.has(A))
        i.associations.set(A, {});
      else if (r.mesh !== void 0 && i.meshCache.refs[r.mesh] > 1) {
        const h = i.associations.get(A);
        i.associations.set(A, { ...h });
      }
      return i.associations.get(A).nodes = e, A;
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
    const t = this.extensions, s = this.json.scenes[e], i = this, r = new We();
    s.name && (r.name = i.createUniqueName(s.name)), me(r, s), s.extensions && Qe(t, r, s);
    const n = s.nodes || [], o = [];
    for (let l = 0, c = n.length; l < c; l++)
      o.push(i.getDependency("node", n[l]));
    return Promise.all(o).then(function(l) {
      for (let A = 0, h = l.length; A < h; A++)
        r.add(l[A]);
      const c = (A) => {
        const h = /* @__PURE__ */ new Map();
        for (const [d, u] of i.associations)
          (d instanceof ms || d instanceof Ii) && h.set(d, u);
        return A.traverse((d) => {
          const u = i.associations.get(d);
          u != null && h.set(d, u);
        }), h;
      };
      return i.associations = c(r), r;
    });
  }
  _createAnimationTracks(e, t, s, i, r) {
    const n = [], o = e.name ? e.name : e.uuid, l = [];
    Ie[r.path] === Ie.weights ? e.traverse(function(d) {
      d.morphTargetInfluences && l.push(d.name ? d.name : d.uuid);
    }) : l.push(o);
    let c;
    switch (Ie[r.path]) {
      case Ie.weights:
        c = Bi;
        break;
      case Ie.rotation:
        c = Si;
        break;
      case Ie.translation:
      case Ie.scale:
        c = wi;
        break;
      default:
        switch (s.itemSize) {
          case 1:
            c = Bi;
            break;
          case 2:
          case 3:
          default:
            c = wi;
            break;
        }
        break;
    }
    const A = i.interpolation !== void 0 ? Da[i.interpolation] : zr, h = this._getArrayFromAccessor(s);
    for (let d = 0, u = l.length; d < u; d++) {
      const p = new c(
        l[d] + "." + Ie[r.path],
        t.array,
        h,
        A
      );
      i.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(p), n.push(p);
    }
    return n;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const s = ei(t.constructor), i = new Float32Array(t.length);
      for (let r = 0, n = t.length; r < n; r++)
        i[r] = t[r] * s;
      t = i;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(s) {
      const i = this instanceof Si ? Ra : sn;
      return new i(this.times, this.values, this.getValueSize() / 3, s);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function Na(a, e, t) {
  const s = e.attributes, i = new tt();
  if (s.POSITION !== void 0) {
    const o = t.json.accessors[s.POSITION], l = o.min, c = o.max;
    if (l !== void 0 && c !== void 0) {
      if (i.set(
        new x(l[0], l[1], l[2]),
        new x(c[0], c[1], c[2])
      ), o.normalized) {
        const A = ei(Xe[o.componentType]);
        i.min.multiplyScalar(A), i.max.multiplyScalar(A);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const r = e.targets;
  if (r !== void 0) {
    const o = new x(), l = new x();
    for (let c = 0, A = r.length; c < A; c++) {
      const h = r[c];
      if (h.POSITION !== void 0) {
        const d = t.json.accessors[h.POSITION], u = d.min, p = d.max;
        if (u !== void 0 && p !== void 0) {
          if (l.setX(Math.max(Math.abs(u[0]), Math.abs(p[0]))), l.setY(Math.max(Math.abs(u[1]), Math.abs(p[1]))), l.setZ(Math.max(Math.abs(u[2]), Math.abs(p[2]))), d.normalized) {
            const g = ei(Xe[d.componentType]);
            l.multiplyScalar(g);
          }
          o.max(l);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    i.expandByVector(o);
  }
  a.boundingBox = i;
  const n = new Et();
  i.getCenter(n.center), n.radius = i.min.distanceTo(i.max) / 2, a.boundingSphere = n;
}
function _i(a, e, t) {
  const s = e.attributes, i = [];
  function r(n, o) {
    return t.getDependency("accessor", n).then(function(l) {
      a.setAttribute(o, l);
    });
  }
  for (const n in s) {
    const o = $s[n] || n.toLowerCase();
    o in a.attributes || i.push(r(s[n], o));
  }
  if (e.indices !== void 0 && !a.index) {
    const n = t.getDependency("accessor", e.indices).then(function(o) {
      a.setIndex(o);
    });
    i.push(n);
  }
  return Ys.workingColorSpace !== ae && "COLOR_0" in s && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ys.workingColorSpace}" not supported.`), me(a, e), Na(a, e, t), Promise.all(i).then(function() {
    return e.targets !== void 0 ? Fa(a, e.targets, t) : a;
  });
}
const Is = /* @__PURE__ */ new WeakMap();
class rn extends li {
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
  load(e, t, s, i) {
    const r = new Te(this.manager);
    r.setPath(this.path), r.setResponseType("arraybuffer"), r.setRequestHeader(this.requestHeader), r.setWithCredentials(this.withCredentials), r.load(e, (n) => {
      this.parse(n, t, i);
    }, s, i);
  }
  /**
   * Parses the given Draco data.
   *
   * @param {ArrayBuffer} buffer - The raw Draco data as an array buffer.
   * @param {function(BufferGeometry)} onLoad - Executed when the loading/parsing process has been finished.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  parse(e, t, s = () => {
  }) {
    this.decodeDracoFile(e, t, null, null, Ce, s).catch(s);
  }
  //
  decodeDracoFile(e, t, s, i, r = ae, n = () => {
  }) {
    const o = {
      attributeIDs: s || this.defaultAttributeIDs,
      attributeTypes: i || this.defaultAttributeTypes,
      useUniqueIDs: !!s,
      vertexColorSpace: r
    };
    return this.decodeGeometry(e, o).then(t).catch(n);
  }
  decodeGeometry(e, t) {
    const s = JSON.stringify(t);
    if (Is.has(e)) {
      const l = Is.get(e);
      if (l.key === s)
        return l.promise;
      if (e.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let i;
    const r = this.workerNextTaskID++, n = e.byteLength, o = this._getWorker(r, n).then((l) => (i = l, new Promise((c, A) => {
      i._callbacks[r] = { resolve: c, reject: A }, i.postMessage({ type: "decode", id: r, taskConfig: t, buffer: e }, [e]);
    }))).then((l) => this._createGeometry(l.geometry));
    return o.catch(() => !0).then(() => {
      i && r && this._releaseTask(i, r);
    }), Is.set(e, {
      key: s,
      promise: o
    }), o;
  }
  _createGeometry(e) {
    const t = new ns();
    e.index && t.setIndex(new re(e.index.array, 1));
    for (let s = 0; s < e.attributes.length; s++) {
      const i = e.attributes[s], r = i.name, n = i.array, o = i.itemSize, l = new re(n, o);
      r === "color" && (this._assignVertexColorSpace(l, i.vertexColorSpace), l.normalized = !(n instanceof Float32Array)), t.setAttribute(r, l);
    }
    return t;
  }
  _assignVertexColorSpace(e, t) {
    if (t !== Ce) return;
    const s = new ye();
    for (let i = 0, r = e.count; i < r; i++)
      s.fromBufferAttribute(e, i), Ys.colorSpaceToWorking(s, Ce), e.setXYZ(i, s.r, s.g, s.b);
  }
  _loadLibrary(e, t) {
    const s = new Te(this.manager);
    return s.setPath(this.decoderPath), s.setResponseType(t), s.setWithCredentials(this.withCredentials), new Promise((i, r) => {
      s.load(e, i, void 0, r);
    });
  }
  preload() {
    return this._initDecoder(), this;
  }
  _initDecoder() {
    if (this.decoderPending) return this.decoderPending;
    const e = typeof WebAssembly != "object" || this.decoderConfig.type === "js", t = [];
    return e ? t.push(this._loadLibrary("draco_decoder.js", "text")) : (t.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), t.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(t).then((s) => {
      const i = s[0];
      e || (this.decoderConfig.wasmBinary = s[1]);
      const r = Va.toString(), n = [
        "/* draco decoder */",
        i,
        "",
        "/* worker */",
        r.substring(r.indexOf("{") + 1, r.lastIndexOf("}"))
      ].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([n]));
    }), this.decoderPending;
  }
  _getWorker(e, t) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const i = new Worker(this.workerSourceURL);
        i._callbacks = {}, i._taskCosts = {}, i._taskLoad = 0, i.postMessage({ type: "init", decoderConfig: this.decoderConfig }), i.onmessage = function(r) {
          const n = r.data;
          switch (n.type) {
            case "decode":
              i._callbacks[n.id].resolve(n);
              break;
            case "error":
              i._callbacks[n.id].reject(n);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + n.type + '"');
          }
        }, this.workerPool.push(i);
      } else
        this.workerPool.sort(function(i, r) {
          return i._taskLoad > r._taskLoad ? -1 : 1;
        });
      const s = this.workerPool[this.workerPool.length - 1];
      return s._taskCosts[e] = t, s._taskLoad += t, s;
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
function Va() {
  let a, e;
  onmessage = function(n) {
    const o = n.data;
    switch (o.type) {
      case "init":
        a = o.decoderConfig, e = new Promise(function(A) {
          a.onModuleLoaded = function(h) {
            A({ draco: h });
          }, DracoDecoderModule(a);
        });
        break;
      case "decode":
        const l = o.buffer, c = o.taskConfig;
        e.then((A) => {
          const h = A.draco, d = new h.Decoder();
          try {
            const u = t(h, d, new Int8Array(l), c), p = u.attributes.map((g) => g.array.buffer);
            u.index && p.push(u.index.array.buffer), self.postMessage({ type: "decode", id: o.id, geometry: u }, p);
          } catch (u) {
            console.error(u), self.postMessage({ type: "error", id: o.id, error: u.message });
          } finally {
            h.destroy(d);
          }
        });
        break;
    }
  };
  function t(n, o, l, c) {
    const A = c.attributeIDs, h = c.attributeTypes;
    let d, u;
    const p = o.GetEncodedGeometryType(l);
    if (p === n.TRIANGULAR_MESH)
      d = new n.Mesh(), u = o.DecodeArrayToMesh(l, l.byteLength, d);
    else if (p === n.POINT_CLOUD)
      d = new n.PointCloud(), u = o.DecodeArrayToPointCloud(l, l.byteLength, d);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!u.ok() || d.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + u.error_msg());
    const g = { index: null, attributes: [] };
    for (const b in A) {
      const C = self[h[b]];
      let y, E;
      if (c.useUniqueIDs)
        E = A[b], y = o.GetAttributeByUniqueId(d, E);
      else {
        if (E = o.GetAttributeId(d, n[A[b]]), E === -1) continue;
        y = o.GetAttribute(d, E);
      }
      const m = i(n, o, d, b, C, y);
      b === "color" && (m.vertexColorSpace = c.vertexColorSpace), g.attributes.push(m);
    }
    return p === n.TRIANGULAR_MESH && (g.index = s(n, o, d)), n.destroy(d), g;
  }
  function s(n, o, l) {
    const A = l.num_faces() * 3, h = A * 4, d = n._malloc(h);
    o.GetTrianglesUInt32Array(l, h, d);
    const u = new Uint32Array(n.HEAPF32.buffer, d, A).slice();
    return n._free(d), { array: u, itemSize: 1 };
  }
  function i(n, o, l, c, A, h) {
    const d = h.num_components(), p = l.num_points() * d, g = p * A.BYTES_PER_ELEMENT, b = r(n, A), C = n._malloc(g);
    o.GetAttributeDataArrayForAllPoints(l, h, b, g, C);
    const y = new A(n.HEAPF32.buffer, C, p).slice();
    return n._free(C), {
      name: c,
      array: y,
      itemSize: d
    };
  }
  function r(n, o) {
    switch (o) {
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
class Oa {
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
    const s = this.workersResolve[e];
    if (s && s(t), this.queue.length) {
      const { resolve: i, msg: r, transfer: n } = this.queue.shift();
      this.workersResolve[e] = i, this.workers[e].postMessage(r, n);
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
    return new Promise((s) => {
      const i = this._getIdleWorker();
      i !== -1 ? (this._initWorker(i), this.workerStatus |= 1 << i, this.workersResolve[i] = s, this.workers[i].postMessage(e, t)) : this.queue.push({ resolve: s, msg: e, transfer: t });
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
const Ha = 0, Ui = 2, qa = 1, Gi = 2, za = 0, ja = 1, Ka = 10, Ya = 0, nn = 9, on = 15, an = 16, ln = 22, cn = 37, hn = 43, An = 76, dn = 83, un = 97, pn = 100, gn = 103, fn = 109, Ja = 131, Wa = 132, Xa = 133, Za = 134, $a = 137, el = 138, tl = 141, sl = 142, il = 145, rl = 146, mn = 148, bn = 152, nl = 157, ol = 158, Cn = 165, yn = 166, di = 1000066e3;
class al {
  constructor() {
    this.vkFormat = 0, this.typeSize = 1, this.pixelWidth = 0, this.pixelHeight = 0, this.pixelDepth = 0, this.layerCount = 0, this.faceCount = 1, this.supercompressionScheme = 0, this.levels = [], this.dataFormatDescriptor = [{ vendorId: 0, descriptorType: 0, descriptorBlockSize: 0, versionNumber: 2, colorModel: 0, colorPrimaries: 1, transferFunction: 2, flags: 0, texelBlockDimension: [0, 0, 0, 0], bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0], samples: [] }], this.keyValue = {}, this.globalData = null;
  }
}
let nt = class {
  constructor(e, t, s, i) {
    this._dataView = void 0, this._littleEndian = void 0, this._offset = void 0, this._dataView = new DataView(e.buffer, e.byteOffset + t, s), this._littleEndian = i, this._offset = 0;
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
    const s = this._offset;
    let i = 0;
    for (; this._dataView.getUint8(this._offset) !== t && i < e; ) i++, this._offset++;
    return i < e && this._offset++, new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + s, i);
  }
};
const Y = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function Ni(a) {
  return new TextDecoder().decode(a);
}
function ll(a) {
  const e = new Uint8Array(a.buffer, a.byteOffset, Y.length);
  if (e[0] !== Y[0] || e[1] !== Y[1] || e[2] !== Y[2] || e[3] !== Y[3] || e[4] !== Y[4] || e[5] !== Y[5] || e[6] !== Y[6] || e[7] !== Y[7] || e[8] !== Y[8] || e[9] !== Y[9] || e[10] !== Y[10] || e[11] !== Y[11]) throw new Error("Missing KTX 2.0 identifier.");
  const t = new al(), s = 17 * Uint32Array.BYTES_PER_ELEMENT, i = new nt(a, Y.length, s, !0);
  t.vkFormat = i._nextUint32(), t.typeSize = i._nextUint32(), t.pixelWidth = i._nextUint32(), t.pixelHeight = i._nextUint32(), t.pixelDepth = i._nextUint32(), t.layerCount = i._nextUint32(), t.faceCount = i._nextUint32();
  const r = i._nextUint32();
  t.supercompressionScheme = i._nextUint32();
  const n = i._nextUint32(), o = i._nextUint32(), l = i._nextUint32(), c = i._nextUint32(), A = i._nextUint64(), h = i._nextUint64(), d = new nt(a, Y.length + s, 3 * r * 8, !0);
  for (let F = 0; F < r; F++) t.levels.push({ levelData: new Uint8Array(a.buffer, a.byteOffset + d._nextUint64(), d._nextUint64()), uncompressedByteLength: d._nextUint64() });
  const u = new nt(a, n, o, !0), p = { vendorId: u._skip(4)._nextUint16(), descriptorType: u._nextUint16(), versionNumber: u._nextUint16(), descriptorBlockSize: u._nextUint16(), colorModel: u._nextUint8(), colorPrimaries: u._nextUint8(), transferFunction: u._nextUint8(), flags: u._nextUint8(), texelBlockDimension: [u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8()], bytesPlane: [u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8()], samples: [] }, g = (p.descriptorBlockSize / 4 - 6) / 4;
  for (let F = 0; F < g; F++) {
    const O = { bitOffset: u._nextUint16(), bitLength: u._nextUint8(), channelType: u._nextUint8(), samplePosition: [u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8()], sampleLower: -1 / 0, sampleUpper: 1 / 0 };
    64 & O.channelType ? (O.sampleLower = u._nextInt32(), O.sampleUpper = u._nextInt32()) : (O.sampleLower = u._nextUint32(), O.sampleUpper = u._nextUint32()), p.samples[F] = O;
  }
  t.dataFormatDescriptor.length = 0, t.dataFormatDescriptor.push(p);
  const b = new nt(a, l, c, !0);
  for (; b._offset < c; ) {
    const F = b._nextUint32(), O = b._scan(F), Ee = Ni(O);
    if (t.keyValue[Ee] = b._nextUint8Array(F - O.byteLength - 1), Ee.match(/^ktx/i)) {
      const it = Ni(t.keyValue[Ee]);
      t.keyValue[Ee] = it.substring(0, it.lastIndexOf("\0"));
    }
    b._skip(F % 4 ? 4 - F % 4 : 0);
  }
  if (h <= 0) return t;
  const C = new nt(a, A, h, !0), y = C._nextUint16(), E = C._nextUint16(), m = C._nextUint32(), I = C._nextUint32(), B = C._nextUint32(), w = C._nextUint32(), v = [];
  for (let F = 0; F < r; F++) v.push({ imageFlags: C._nextUint32(), rgbSliceByteOffset: C._nextUint32(), rgbSliceByteLength: C._nextUint32(), alphaSliceByteOffset: C._nextUint32(), alphaSliceByteLength: C._nextUint32() });
  const M = A + C._offset, S = M + m, T = S + I, D = T + B, _ = new Uint8Array(a.buffer, a.byteOffset + M, m), Q = new Uint8Array(a.buffer, a.byteOffset + S, I), K = new Uint8Array(a.buffer, a.byteOffset + T, B), G = new Uint8Array(a.buffer, a.byteOffset + D, w);
  return t.globalData = { endpointCount: y, selectorCount: E, imageDescs: v, endpointsData: _, selectorsData: Q, tablesData: K, extendedData: G }, t;
}
let ws, fe, ti;
const Bs = { env: { emscripten_notify_memory_growth: function(a) {
  ti = new Uint8Array(fe.exports.memory.buffer);
} } };
let cl = class {
  init() {
    return ws || (ws = typeof fetch < "u" ? fetch("data:application/wasm;base64," + Vi).then((e) => e.arrayBuffer()).then((e) => WebAssembly.instantiate(e, Bs)).then(this._init) : WebAssembly.instantiate(Buffer.from(Vi, "base64"), Bs).then(this._init), ws);
  }
  _init(e) {
    fe = e.instance, Bs.env.emscripten_notify_memory_growth(0);
  }
  decode(e, t = 0) {
    if (!fe) throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const s = e.byteLength, i = fe.exports.malloc(s);
    ti.set(e, i), t = t || Number(fe.exports.ZSTD_findDecompressedSize(i, s));
    const r = fe.exports.malloc(t), n = fe.exports.ZSTD_decompress(r, t, i, s), o = ti.slice(r, r + n);
    return fe.exports.free(i), fe.exports.free(r), o;
  }
};
const Vi = "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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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", hl = "display-p3", Al = "display-p3-linear", Ss = /* @__PURE__ */ new WeakMap();
let Ms = 0, vs;
class te extends li {
  /**
   * Constructs a new KTX2 loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e), this.transcoderPath = "", this.transcoderBinary = null, this.transcoderPending = null, this.workerPool = new Oa(), this.workerSourceURL = "", this.workerConfig = null, typeof MSC_TRANSCODER < "u" && console.warn(
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
      const e = new Te(this.manager);
      e.setPath(this.transcoderPath), e.setWithCredentials(this.withCredentials);
      const t = e.loadAsync("basis_transcoder.js"), s = new Te(this.manager);
      s.setPath(this.transcoderPath), s.setResponseType("arraybuffer"), s.setWithCredentials(this.withCredentials);
      const i = s.loadAsync("basis_transcoder.wasm");
      this.transcoderPending = Promise.all([t, i]).then(([r, n]) => {
        const o = te.BasisWorker.toString(), l = [
          "/* constants */",
          "let _EngineFormat = " + JSON.stringify(te.EngineFormat),
          "let _EngineType = " + JSON.stringify(te.EngineType),
          "let _TranscoderFormat = " + JSON.stringify(te.TranscoderFormat),
          "let _BasisFormat = " + JSON.stringify(te.BasisFormat),
          "/* basis_transcoder.js */",
          r,
          "/* worker */",
          o.substring(o.indexOf("{") + 1, o.lastIndexOf("}"))
        ].join(`
`);
        this.workerSourceURL = URL.createObjectURL(new Blob([l])), this.transcoderBinary = n, this.workerPool.setWorkerCreator(() => {
          const c = new Worker(this.workerSourceURL), A = this.transcoderBinary.slice(0);
          return c.postMessage({ type: "init", config: this.workerConfig, transcoderBinary: A }, [A]), c;
        });
      }), Ms > 0 && console.warn(
        "THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."
      ), Ms++;
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
  load(e, t, s, i) {
    if (this.workerConfig === null)
      throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");
    const r = new Te(this.manager);
    r.setPath(this.path), r.setCrossOrigin(this.crossOrigin), r.setWithCredentials(this.withCredentials), r.setResponseType("arraybuffer"), r.load(e, (n) => {
      this.parse(n, t, i);
    }, s, i);
  }
  /**
   * Parses the given KTX2 data.
   *
   * @param {ArrayBuffer} buffer - The raw KTX2 data as an array buffer.
   * @param {function(CompressedTexture)} onLoad - Executed when the loading/parsing process has been finished.
   * @param {onErrorCallback} onError - Executed when errors occur.
   * @returns {Promise} A Promise that resolves when the parsing has been finished.
   */
  parse(e, t, s) {
    if (this.workerConfig === null)
      throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");
    if (Ss.has(e))
      return Ss.get(e).promise.then(t).catch(s);
    this._createTexture(e).then((i) => t ? t(i) : null).catch(s);
  }
  _createTextureFrom(e, t) {
    const { type: s, error: i, data: { faces: r, width: n, height: o, format: l, type: c, dfdFlags: A } } = e;
    if (s === "error") return Promise.reject(i);
    let h;
    if (t.faceCount === 6)
      h = new Io(r, l, c);
    else {
      const d = r[0].mipmaps;
      h = t.layerCount > 1 ? new wo(d, n, o, t.layerCount, l, c) : new jr(d, n, o, l, c);
    }
    return h.minFilter = r[0].mipmaps.length === 1 ? ke : rs, h.magFilter = ke, h.generateMipmaps = !1, h.needsUpdate = !0, h.colorSpace = En(t), h.premultiplyAlpha = !!(A & qa), h;
  }
  /**
   * @private
   * @param {ArrayBuffer} buffer
   * @param {?Object} config
   * @return {Promise<CompressedTexture|CompressedArrayTexture|DataTexture|Data3DTexture>}
   */
  async _createTexture(e, t = {}) {
    const s = ll(new Uint8Array(e)), i = s.vkFormat === di && s.dataFormatDescriptor[0].colorModel === 167;
    if (!(s.vkFormat === Ya || i && !this.workerConfig.astcHDRSupported))
      return ul(s);
    const n = t, o = this.init().then(() => this.workerPool.postMessage({ type: "transcode", buffer: e, taskConfig: n }, [e])).then((l) => this._createTextureFrom(l.data, s));
    return Ss.set(e, { promise: o }), o;
  }
  /**
   * Frees internal resources. This method should be called
   * when the loader is no longer required.
   */
  dispose() {
    this.workerPool.dispose(), this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL), Ms--;
  }
}
te.BasisFormat = {
  ETC1S: 0,
  UASTC: 1,
  UASTC_HDR: 2
};
te.TranscoderFormat = {
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
te.EngineFormat = {
  RGBAFormat: Ke,
  RGBA_ASTC_4x4_Format: qt,
  RGB_BPTC_UNSIGNED_Format: xo,
  RGBA_BPTC_Format: Js,
  RGBA_ETC2_EAC_Format: Kr,
  RGBA_PVRTC_4BPPV1_Format: vo,
  RGBA_S3TC_DXT5_Format: Ws,
  RGB_ETC1_Format: Mo,
  RGB_ETC2_Format: Yr,
  RGB_PVRTC_4BPPV1_Format: So,
  RGBA_S3TC_DXT1_Format: Xs
};
te.EngineType = {
  UnsignedByteType: oe,
  HalfFloatType: Ye,
  FloatType: bt
};
te.BasisWorker = function() {
  let a, e, t;
  const s = _EngineFormat, i = _EngineType, r = _TranscoderFormat, n = _BasisFormat;
  self.addEventListener("message", function(p) {
    const g = p.data;
    switch (g.type) {
      case "init":
        a = g.config, o(g.transcoderBinary);
        break;
      case "transcode":
        e.then(() => {
          try {
            const { faces: b, buffers: C, width: y, height: E, hasAlpha: m, format: I, type: B, dfdFlags: w } = l(g.buffer);
            self.postMessage({ type: "transcode", id: g.id, data: { faces: b, width: y, height: E, hasAlpha: m, format: I, type: B, dfdFlags: w } }, C);
          } catch (b) {
            console.error(b), self.postMessage({ type: "error", id: g.id, error: b.message });
          }
        });
        break;
    }
  });
  function o(p) {
    e = new Promise((g) => {
      t = { wasmBinary: p, onRuntimeInitialized: g }, BASIS(t);
    }).then(() => {
      t.initializeBasis(), t.KTX2File === void 0 && console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.");
    });
  }
  function l(p) {
    const g = new t.KTX2File(new Uint8Array(p));
    function b() {
      g.close(), g.delete();
    }
    if (!g.isValid())
      throw b(), new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");
    let C;
    if (g.isUASTC())
      C = n.UASTC;
    else if (g.isETC1S())
      C = n.ETC1S;
    else if (g.isHDR())
      C = n.UASTC_HDR;
    else
      throw new Error("THREE.KTX2Loader: Unknown Basis encoding");
    const y = g.getWidth(), E = g.getHeight(), m = g.getLayers() || 1, I = g.getLevels(), B = g.getFaces(), w = g.getHasAlpha(), v = g.getDFDFlags(), { transcoderFormat: M, engineFormat: S, engineType: T } = h(C, y, E, w);
    if (!y || !E || !I)
      throw b(), new Error("THREE.KTX2Loader:	Invalid texture");
    if (!g.startTranscoding())
      throw b(), new Error("THREE.KTX2Loader: .startTranscoding failed");
    const D = [], _ = [];
    for (let Q = 0; Q < B; Q++) {
      const K = [];
      for (let G = 0; G < I; G++) {
        const F = [];
        let O, Ee;
        for (let Ne = 0; Ne < m; Ne++) {
          const Ve = g.getImageLevelInfo(G, Ne, Q);
          Q === 0 && G === 0 && Ne === 0 && (Ve.origWidth % 4 !== 0 || Ve.origHeight % 4 !== 0) && console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."), I > 1 ? (O = Ve.origWidth, Ee = Ve.origHeight) : (O = Ve.width, Ee = Ve.height);
          let Oe = new Uint8Array(g.getImageTranscodedSizeInBytes(G, Ne, 0, M));
          const jn = g.transcodeImage(Oe, G, Ne, Q, M, 0, -1, -1);
          if (T === i.HalfFloatType && (Oe = new Uint16Array(Oe.buffer, Oe.byteOffset, Oe.byteLength / Uint16Array.BYTES_PER_ELEMENT)), !jn)
            throw b(), new Error("THREE.KTX2Loader: .transcodeImage failed.");
          F.push(Oe);
        }
        const it = u(F);
        K.push({ data: it, width: O, height: Ee }), _.push(it.buffer);
      }
      D.push({ mipmaps: K, width: y, height: E, format: S, type: T });
    }
    return b(), { faces: D, buffers: _, width: y, height: E, hasAlpha: w, dfdFlags: v, format: S, type: T };
  }
  const c = [
    {
      if: "astcSupported",
      basisFormat: [n.UASTC],
      transcoderFormat: [r.ASTC_4x4, r.ASTC_4x4],
      engineFormat: [s.RGBA_ASTC_4x4_Format, s.RGBA_ASTC_4x4_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 1 / 0,
      priorityUASTC: 1,
      needsPowerOfTwo: !1
    },
    {
      if: "bptcSupported",
      basisFormat: [n.ETC1S, n.UASTC],
      transcoderFormat: [r.BC7_M5, r.BC7_M5],
      engineFormat: [s.RGBA_BPTC_Format, s.RGBA_BPTC_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 3,
      priorityUASTC: 2,
      needsPowerOfTwo: !1
    },
    {
      if: "dxtSupported",
      basisFormat: [n.ETC1S, n.UASTC],
      transcoderFormat: [r.BC1, r.BC3],
      engineFormat: [s.RGBA_S3TC_DXT1_Format, s.RGBA_S3TC_DXT5_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 4,
      priorityUASTC: 5,
      needsPowerOfTwo: !1
    },
    {
      if: "etc2Supported",
      basisFormat: [n.ETC1S, n.UASTC],
      transcoderFormat: [r.ETC1, r.ETC2],
      engineFormat: [s.RGB_ETC2_Format, s.RGBA_ETC2_EAC_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 1,
      priorityUASTC: 3,
      needsPowerOfTwo: !1
    },
    {
      if: "etc1Supported",
      basisFormat: [n.ETC1S, n.UASTC],
      transcoderFormat: [r.ETC1],
      engineFormat: [s.RGB_ETC1_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 2,
      priorityUASTC: 4,
      needsPowerOfTwo: !1
    },
    {
      if: "pvrtcSupported",
      basisFormat: [n.ETC1S, n.UASTC],
      transcoderFormat: [r.PVRTC1_4_RGB, r.PVRTC1_4_RGBA],
      engineFormat: [s.RGB_PVRTC_4BPPV1_Format, s.RGBA_PVRTC_4BPPV1_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 5,
      priorityUASTC: 6,
      needsPowerOfTwo: !0
    },
    {
      if: "bptcSupported",
      basisFormat: [n.UASTC_HDR],
      transcoderFormat: [r.BC6H],
      engineFormat: [s.RGB_BPTC_UNSIGNED_Format],
      engineType: [i.HalfFloatType],
      priorityHDR: 1,
      needsPowerOfTwo: !1
    },
    // Uncompressed fallbacks.
    {
      basisFormat: [n.ETC1S, n.UASTC],
      transcoderFormat: [r.RGBA32, r.RGBA32],
      engineFormat: [s.RGBAFormat, s.RGBAFormat],
      engineType: [i.UnsignedByteType, i.UnsignedByteType],
      priorityETC1S: 100,
      priorityUASTC: 100,
      needsPowerOfTwo: !1
    },
    {
      basisFormat: [n.UASTC_HDR],
      transcoderFormat: [r.RGBA_HALF],
      engineFormat: [s.RGBAFormat],
      engineType: [i.HalfFloatType],
      priorityHDR: 100,
      needsPowerOfTwo: !1
    }
  ], A = {
    // TODO: For ETC1S we intentionally sort by _UASTC_ priority, preserving
    // a historical accident shown to avoid performance pitfalls for Linux with
    // Firefox & AMD GPU (RadeonSI). Further work needed.
    // See https://github.com/mrdoob/three.js/pull/29730.
    [n.ETC1S]: c.filter((p) => p.basisFormat.includes(n.ETC1S)).sort((p, g) => p.priorityUASTC - g.priorityUASTC),
    [n.UASTC]: c.filter((p) => p.basisFormat.includes(n.UASTC)).sort((p, g) => p.priorityUASTC - g.priorityUASTC),
    [n.UASTC_HDR]: c.filter((p) => p.basisFormat.includes(n.UASTC_HDR)).sort((p, g) => p.priorityHDR - g.priorityHDR)
  };
  function h(p, g, b, C) {
    const y = A[p];
    for (let E = 0; E < y.length; E++) {
      const m = y[E];
      if (m.if && !a[m.if] || !m.basisFormat.includes(p) || C && m.transcoderFormat.length < 2 || m.needsPowerOfTwo && !(d(g) && d(b))) continue;
      const I = m.transcoderFormat[C ? 1 : 0], B = m.engineFormat[C ? 1 : 0], w = m.engineType[0];
      return { transcoderFormat: I, engineFormat: B, engineType: w };
    }
    throw new Error("THREE.KTX2Loader: Failed to identify transcoding target.");
  }
  function d(p) {
    return p <= 2 ? !0 : (p & p - 1) === 0 && p !== 0;
  }
  function u(p) {
    if (p.length === 1) return p[0];
    let g = 0;
    for (let y = 0; y < p.length; y++) {
      const E = p[y];
      g += E.byteLength;
    }
    const b = new Uint8Array(g);
    let C = 0;
    for (let y = 0; y < p.length; y++) {
      const E = p[y];
      b.set(E, C), C += E.byteLength;
    }
    return b;
  }
};
const dl = /* @__PURE__ */ new Set([Ke, pt, ut]), xs = {
  [fn]: Ke,
  [un]: Ke,
  [cn]: Ke,
  [hn]: Ke,
  [gn]: pt,
  [dn]: pt,
  [an]: pt,
  [ln]: pt,
  [pn]: ut,
  [An]: ut,
  [on]: ut,
  [nn]: ut,
  [mn]: Yr,
  [bn]: Kr,
  [di]: qt,
  [ol]: qt,
  [nl]: qt,
  [yn]: Ti,
  [Cn]: Ti,
  [Xa]: Xs,
  [Za]: Xs,
  [Ja]: xi,
  [Wa]: xi,
  [el]: vi,
  [$a]: vi,
  [sl]: Ws,
  [tl]: Ws,
  [rl]: Js,
  [il]: Js
}, Ts = {
  [fn]: bt,
  [un]: Ye,
  [cn]: oe,
  [hn]: oe,
  [gn]: bt,
  [dn]: Ye,
  [an]: oe,
  [ln]: oe,
  [pn]: bt,
  [An]: Ye,
  [on]: oe,
  [nn]: oe,
  [mn]: oe,
  [bn]: oe,
  [di]: Ye,
  [yn]: oe,
  [Cn]: oe
};
async function ul(a) {
  const { vkFormat: e } = a;
  if (xs[e] === void 0)
    throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");
  let t;
  a.supercompressionScheme === Ui && (vs || (vs = new Promise(async (r) => {
    const n = new cl();
    await n.init(), r(n);
  })), t = await vs);
  const s = [];
  for (let r = 0; r < a.levels.length; r++) {
    const n = Math.max(1, a.pixelWidth >> r), o = Math.max(1, a.pixelHeight >> r), l = a.pixelDepth ? Math.max(1, a.pixelDepth >> r) : 0, c = a.levels[r];
    let A;
    if (a.supercompressionScheme === Ha)
      A = c.levelData;
    else if (a.supercompressionScheme === Ui)
      A = t.decode(c.levelData, c.uncompressedByteLength);
    else
      throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");
    let h;
    Ts[e] === bt ? h = new Float32Array(
      A.buffer,
      A.byteOffset,
      A.byteLength / Float32Array.BYTES_PER_ELEMENT
    ) : Ts[e] === Ye ? h = new Uint16Array(
      A.buffer,
      A.byteOffset,
      A.byteLength / Uint16Array.BYTES_PER_ELEMENT
    ) : h = A, s.push({
      data: h,
      width: n,
      height: o,
      depth: l
    });
  }
  let i;
  if (dl.has(xs[e]))
    i = a.pixelDepth === 0 ? new Jr(s[0].data, a.pixelWidth, a.pixelHeight) : new Bo(s[0].data, a.pixelWidth, a.pixelHeight, a.pixelDepth);
  else {
    if (a.pixelDepth > 0) throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");
    i = new jr(s, a.pixelWidth, a.pixelHeight), i.minFilter = s.length === 1 ? ke : rs, i.magFilter = ke;
  }
  return i.mipmaps = s, i.type = Ts[e], i.format = xs[e], i.colorSpace = En(a), i.needsUpdate = !0, Promise.resolve(i);
}
function En(a) {
  const e = a.dataFormatDescriptor[0];
  return e.colorPrimaries === ja ? e.transferFunction === Gi ? Ce : ae : e.colorPrimaries === Ka ? e.transferFunction === Gi ? hl : Al : e.colorPrimaries === za ? Mi : (console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${e.colorPrimaries}"`), Mi);
}
var pl = function() {
  var a = "b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q:Odkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq;w8Wqdbk;esezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9Uc;WFbGgocjdaocjd6EhDaicefhocbhqdnindndndnaeaq9nmbaDaeaq9RaqaDfae6Egkcsfglcl4cifcd4hxalc9WGgmTmecbhPawcjdfhsaohzinaraz9Rax6mvarazaxfgo9RcK6mvczhlcbhHinalgic9WfgOawcj;cbffhldndndndndnazaOco4fRbbaHcoG4ciGPlbedibkal9cb83ibalcwf9cb83ibxikalaoRblaoRbbgOco4gAaAciSgAE86bbawcj;cbfaifglcGfaoclfaAfgARbbaOcl4ciGgCaCciSgCE86bbalcVfaAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc7faAaCfgARbbaOciGgOaOciSgOE86bbalctfaAaOfgARbbaoRbegOco4gCaCciSgCE86bbalc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc93faAaCfgARbbaOciGgOaOciSgOE86bbalc94faAaOfgARbbaoRbdgOco4gCaCciSgCE86bbalc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc97faAaCfgARbbaOciGgOaOciSgOE86bbalc98faAaOfgORbbaoRbigoco4gAaAciSgAE86bbalc99faOaAfgORbbaocl4ciGgAaAciSgAE86bbalc9:faOaAfgORbbaocd4ciGgAaAciSgAE86bbalcufaOaAfglRbbaociGgoaociSgoE86bbalaofhoxdkalaoRbwaoRbbgOcl4gAaAcsSgAE86bbawcj;cbfaifglcGfaocwfaAfgARbbaOcsGgOaOcsSgOE86bbalcVfaAaOfgORbbaoRbegAcl4gCaCcsSgCE86bbalc7faOaCfgORbbaAcsGgAaAcsSgAE86bbalctfaOaAfgORbbaoRbdgAcl4gCaCcsSgCE86bbalc91faOaCfgORbbaAcsGgAaAcsSgAE86bbalc4faOaAfgORbbaoRbigAcl4gCaCcsSgCE86bbalc93faOaCfgORbbaAcsGgAaAcsSgAE86bbalc94faOaAfgORbbaoRblgAcl4gCaCcsSgCE86bbalc95faOaCfgORbbaAcsGgAaAcsSgAE86bbalc96faOaAfgORbbaoRbvgAcl4gCaCcsSgCE86bbalc97faOaCfgORbbaAcsGgAaAcsSgAE86bbalc98faOaAfgORbbaoRbogAcl4gCaCcsSgCE86bbalc99faOaCfgORbbaAcsGgAaAcsSgAE86bbalc9:faOaAfgORbbaoRbrgocl4gAaAcsSgAE86bbalcufaOaAfglRbbaocsGgoaocsSgoE86bbalaofhoxekalao8Pbb83bbalcwfaocwf8Pbb83bbaoczfhokdnaiam9pmbaHcdfhHaiczfhlarao9RcL0mekkaiam6mvaoTmvdnakTmbawaPfRbbhHawcj;cbfhlashiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkkascefhsaohzaPcefgPad9hmbxikkcbc99arao9Radcaadca0ESEhoxlkaoaxad2fhCdnakmbadhlinaoTmlarao9Rax6mlaoaxfhoalcufglmbkaChoxekcbhmawcjdfhAinarao9Rax6miawamfRbbhHawcj;cbfhlaAhiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkaAcefhAaoaxfhoamcefgmad9hmbkaChokabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqaombkc9:hoxekc9:hokavcj;ebf8Kjjjjbaok;cseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;oiliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabaiavcefciGfcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavciGfgkcd7cetfaD87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavcufciGfcetfaD87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohvxekcjjjj94hvkabakcetfav87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklzNbb", e = "b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q:6dkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq:p9sqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk:N8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhlaicefhodnaeTmbadTmbalc;WFbGglcjdalcjd6EhwcbhDinawaeaD9RaDawfae6Egqcsfglc9WGgkci2hxakcethmalcl4cifcd4hPabaDad2fhsakc;ab6hzcbhHincbhOaohAdndninaraA9RaP6meavcj;cbfaOak2fhCaAaPfhocbhidnazmbarao9Rc;Gb6mbcbhlinaCalfhidndndndndnaAalco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklbaoczfhokdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklzaoczfhokdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklaaoczfhokdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaoclfaYpQbfaXc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaocwfaYpQbfaXc:q:yjjbfRbbfhoxekaiaopbbbpkl8Waoczfhokalc;abfhialcjefak0meaihlarao9Rc;Fb0mbkkdnaiak9pmbaici4hlinarao9RcK6miaCaifhXdndndndndnaAaico4fRbbalcoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpkbbxikaXaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaXaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaXaopbbbpkbbaoczfhokalcdfhlaiczfgiak6mbkkaoTmeaohAaOcefgOclSmdxbkkc9:hoxlkdnakTmbavcjdfaHfhiavaHfpbdbhYcbhXinaiavcj;cbfaXfglpblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLalakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEalamfpblbg3cep9Ta3aQp9op9Hp9rg3alaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfhiaXczfgXak6mbkkaHclfgHad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfgDae6mbkkcbc99arao9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk::seHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:wPliuo97eue978Jjjjjbca9Rhiaec98Ghldndnadcl9hmbdnalTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalaeSmeaipxbbbbbbbbbbbbbbbbgqpklbaiabalcdtfgdaeciGglcdtgv;8qbbdnalTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDaqp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkadaiav;8qbbskdnalTmbcbhvabhdinadczfgxaxpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oaoarpmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgval6mbkkalaeSmbaiaeciGgvcitgdfcbcaad9R;8kbaiabalcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oaoarpmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalaeSmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbheabhdinadadpbbbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbadczfhdaeclfgeav6mbkkdnavalSmbaialciGgecdtgdVcbc;abad9R;8kbaiabavcdtfgvad;8qbbdnaeTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepklbkavaiad;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz:Dbb", t = new Uint8Array([
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
  ]), s = new Uint8Array([
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
  var i = WebAssembly.validate(t) ? o(e) : o(a), r, n = WebAssembly.instantiate(i, {}).then(function(C) {
    r = C.instance, r.exports.__wasm_call_ctors();
  });
  function o(C) {
    for (var y = new Uint8Array(C.length), E = 0; E < C.length; ++E) {
      var m = C.charCodeAt(E);
      y[E] = m > 96 ? m - 97 : m > 64 ? m - 39 : m + 4;
    }
    for (var I = 0, E = 0; E < C.length; ++E)
      y[I++] = y[E] < 60 ? s[y[E]] : (y[E] - 60) * 64 + y[++E];
    return y.buffer.slice(0, I);
  }
  function l(C, y, E, m, I, B, w) {
    var v = C.exports.sbrk, M = m + 3 & -4, S = v(M * I), T = v(B.length), D = new Uint8Array(C.exports.memory.buffer);
    D.set(B, T);
    var _ = y(S, m, I, T, B.length);
    if (_ == 0 && w && w(S, M, I), E.set(D.subarray(S, S + m * I)), v(S - v(0)), _ != 0)
      throw new Error("Malformed buffer data: " + _);
  }
  var c = {
    NONE: "",
    OCTAHEDRAL: "meshopt_decodeFilterOct",
    QUATERNION: "meshopt_decodeFilterQuat",
    EXPONENTIAL: "meshopt_decodeFilterExp"
  }, A = {
    ATTRIBUTES: "meshopt_decodeVertexBuffer",
    TRIANGLES: "meshopt_decodeIndexBuffer",
    INDICES: "meshopt_decodeIndexSequence"
  }, h = [], d = 0;
  function u(C) {
    var y = {
      object: new Worker(C),
      pending: 0,
      requests: {}
    };
    return y.object.onmessage = function(E) {
      var m = E.data;
      y.pending -= m.count, y.requests[m.id][m.action](m.value), delete y.requests[m.id];
    }, y;
  }
  function p(C) {
    for (var y = "self.ready = WebAssembly.instantiate(new Uint8Array([" + new Uint8Array(i) + "]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = " + b.name + ";" + l.toString() + b.toString(), E = new Blob([y], { type: "text/javascript" }), m = URL.createObjectURL(E), I = h.length; I < C; ++I)
      h[I] = u(m);
    for (var I = C; I < h.length; ++I)
      h[I].object.postMessage({});
    h.length = C, URL.revokeObjectURL(m);
  }
  function g(C, y, E, m, I) {
    for (var B = h[0], w = 1; w < h.length; ++w)
      h[w].pending < B.pending && (B = h[w]);
    return new Promise(function(v, M) {
      var S = new Uint8Array(E), T = ++d;
      B.pending += C, B.requests[T] = { resolve: v, reject: M }, B.object.postMessage({ id: T, count: C, size: y, source: S, mode: m, filter: I }, [S.buffer]);
    });
  }
  function b(C) {
    var y = C.data;
    if (!y.id)
      return self.close();
    self.ready.then(function(E) {
      try {
        var m = new Uint8Array(y.count * y.size);
        l(E, E.exports[y.mode], m, y.count, y.size, y.source, E.exports[y.filter]), self.postMessage({ id: y.id, count: y.count, action: "resolve", value: m }, [m.buffer]);
      } catch (I) {
        self.postMessage({ id: y.id, count: y.count, action: "reject", value: I });
      }
    });
  }
  return {
    ready: n,
    supported: !0,
    useWorkers: function(C) {
      p(C);
    },
    decodeVertexBuffer: function(C, y, E, m, I) {
      l(r, r.exports.meshopt_decodeVertexBuffer, C, y, E, m, r.exports[c[I]]);
    },
    decodeIndexBuffer: function(C, y, E, m) {
      l(r, r.exports.meshopt_decodeIndexBuffer, C, y, E, m);
    },
    decodeIndexSequence: function(C, y, E, m) {
      l(r, r.exports.meshopt_decodeIndexSequence, C, y, E, m);
    },
    decodeGltfBuffer: function(C, y, E, m, I, B) {
      l(r, r.exports[A[I]], C, y, E, m, r.exports[c[B]]);
    },
    decodeGltfBufferAsync: function(C, y, E, m, I) {
      return h.length > 0 ? g(C, y, E, A[m], c[I]) : n.then(function() {
        var B = new Uint8Array(C * y);
        return l(r, r.exports[A[m]], B, C, y, E, r.exports[c[I]]), B;
      });
    }
  };
}();
function gl(a) {
  if (!a) return;
  (Array.isArray(a) ? a : [a]).forEach((t) => {
    t && (Object.keys(t).forEach((s) => {
      const i = t[s];
      i && i.isTexture && i.dispose();
    }), typeof t.dispose == "function" && t.dispose());
  });
}
function Qs(a) {
  !a || !a.traverse || a.traverse((e) => {
    e.geometry && e.geometry.dispose(), e.material && gl(e.material);
  });
}
function fl() {
  f.Cache && typeof f.Cache.clear == "function" && f.Cache.clear();
}
const ml = "https://www.gstatic.com/draco/versioned/decoders/1.5.6/", bl = "https://cdn.jsdelivr.net/npm/three@0.177.0/examples/jsm/libs/basis/", Cl = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles";
function si(a) {
  return typeof a != "string" || a.length === 0 || a.endsWith("/") ? a : `${a}/`;
}
function yl(a) {
  return typeof a != "string" || a.length === 0 ? a : a.replace(/\/+$/, "");
}
function Kt(a, e) {
  return typeof a != "string" || a.length === 0 ? e : `${si(a)}${e.replace(/^\/+/, "")}`;
}
function cs(a = {}, e = {}) {
  const t = a.assetBasePath, s = typeof t == "string" && t.length > 0, i = {
    dracoDecoderPath: e.dracoDecoderPath || ml,
    ktx2TranscoderPath: e.ktx2TranscoderPath || bl,
    webxrInputProfilesPath: e.webxrInputProfilesPath || Cl
  };
  return s && (i.dracoDecoderPath = Kt(t, "draco/1.5.6/"), i.ktx2TranscoderPath = Kt(t, "three/basis/"), i.webxrInputProfilesPath = Kt(t, "webxr-input-profiles/assets/1.0/profiles")), typeof a.dracoDecoderPath == "string" && a.dracoDecoderPath.length > 0 && (i.dracoDecoderPath = a.dracoDecoderPath), typeof a.ktx2TranscoderPath == "string" && a.ktx2TranscoderPath.length > 0 && (i.ktx2TranscoderPath = a.ktx2TranscoderPath), typeof a.webxrInputProfilesPath == "string" && a.webxrInputProfilesPath.length > 0 && (i.webxrInputProfilesPath = a.webxrInputProfilesPath), {
    dracoDecoderPath: si(i.dracoDecoderPath),
    ktx2TranscoderPath: si(i.ktx2TranscoderPath),
    webxrInputProfilesPath: yl(i.webxrInputProfilesPath)
  };
}
class ee {
  constructor(e = null, t = {}) {
    this.renderer = e, this.isIOSWebKit = ee.isIOSWebKit(), this.platformKey = ee.getPlatformKey(), this.assetPaths = cs(t), this.loader = new Ge(), this.dracoLoader = new rn(), this.ktx2Loader = null, this.loadQueue = Promise.resolve(), this.activeIOSLoad = !1, this.dracoLoader.setDecoderPath(this.assetPaths.dracoDecoderPath), this.isIOSWebKit && typeof this.dracoLoader.setWorkerLimit == "function" && this.dracoLoader.setWorkerLimit(1), this.loader.setDRACOLoader(this.dracoLoader), this.loader.setMeshoptDecoder(pl), this.loader.register((s) => ({
      name: "KHR_materials_pbrSpecularGlossiness",
      extendMaterialParams: async (i, r) => {
        const n = s.json.materials[i];
        if (!n.extensions || !n.extensions.KHR_materials_pbrSpecularGlossiness)
          return Promise.resolve();
        const o = n.extensions.KHR_materials_pbrSpecularGlossiness;
        return o.diffuseTexture !== void 0 && (r.map = await s.getDependency("texture", o.diffuseTexture.index)), o.diffuseFactor !== void 0 && (r.color = new f.Color().fromArray(o.diffuseFactor)), o.glossinessFactor !== void 0 && (r.roughness = 1 - o.glossinessFactor), r.metalness = 0, Promise.resolve();
      }
    })), this.cache = /* @__PURE__ */ new Map(), this.ktx2SetupComplete = !1, this.setupKTX2Loader();
  }
  setupKTX2Loader() {
    const e = this.getKTX2LoaderKey();
    try {
      if (!ee.sharedKTX2Loaders.has(e)) {
        const t = new te();
        t.setTranscoderPath(this.assetPaths.ktx2TranscoderPath), this.isIOSWebKit && typeof t.setWorkerLimit == "function" && t.setWorkerLimit(1), ee.sharedKTX2Loaders.set(e, t), ee.sharedKTX2SetupComplete.set(e, !1);
      }
      this.ktx2Loader = ee.sharedKTX2Loaders.get(e), this.loader.setKTX2Loader(this.ktx2Loader), this.ktx2SetupComplete = ee.sharedKTX2SetupComplete.get(e) || !1, this.renderer && !this.ktx2SetupComplete && this.ensureKTX2Support();
    } catch (t) {
      console.warn("KTX2 loader setup failed, falling back to standard textures:", t), this.ktx2Loader = null;
    }
  }
  ensureKTX2Support() {
    if (!this.ktx2Loader || !this.renderer)
      return;
    const e = this.getKTX2LoaderKey();
    if (ee.sharedKTX2SetupComplete.get(e)) {
      this.ktx2SetupComplete = !0;
      return;
    }
    try {
      this.ktx2Loader.detectSupport(this.renderer), ee.sharedKTX2SetupComplete.set(e, !0), this.ktx2SetupComplete = !0;
    } catch (t) {
      console.warn("Failed to set up KTX2 loader with renderer:", t);
    }
  }
  getKTX2LoaderKey() {
    return `${this.platformKey}|${this.assetPaths.ktx2TranscoderPath}`;
  }
  setRenderer(e) {
    this.renderer = e, e && (this.ktx2Loader ? this.ensureKTX2Support() : this.setupKTX2Loader());
  }
  async load(e, t = null, s = null, i = null) {
    if (this.cache.has(e)) {
      i && i("cloning");
      const l = this.cache.get(e).scene.clone(!0);
      return this.processModel({ scene: l });
    }
    const r = () => this.performLoad(e, t, s, i);
    if (!this.isIOSWebKit)
      return r();
    const n = this.loadQueue.then(() => (this.activeIOSLoad && typeof i == "function" && i("freeing-resources"), r()));
    return this.loadQueue = n.catch(() => {
    }), n;
  }
  performLoad(e, t = null, s = null, i = null) {
    return new Promise((r, n) => {
      let o = null;
      const l = () => {
        s && o && (s.removeEventListener("abort", o), o = null);
      }, c = () => {
        l(), this.isIOSWebKit && (this.activeIOSLoad = !1), n(new Error("Loading cancelled"));
      };
      if (s && (o = c, s.addEventListener("abort", o), s.aborted)) {
        c();
        return;
      }
      i && i("downloading"), this.isIOSWebKit && (this.activeIOSLoad = !0), this.loader.load(
        e,
        (A) => {
          if (i && i("processing"), s && s.aborted) {
            l();
            return;
          }
          this.cache.set(e, A);
          const h = this.processModel(A);
          i && i("finalizing"), this.releaseParserCaches(A), l(), this.isIOSWebKit && (this.activeIOSLoad = !1), r(h);
        },
        (A) => {
          s && s.aborted || t && t(A);
        },
        (A) => {
          l(), this.isIOSWebKit && (this.activeIOSLoad = !1), n(A);
        }
      );
    });
  }
  processModel(e) {
    const t = e.scene, s = this.getMaxAnisotropy(), i = e.parser || null, r = this.shouldNormalizePhotogrammetryAtlas(i);
    t.traverse((o) => {
      if (o.isLight && (o.visible = !1), o.isMesh && o.material) {
        o.castShadow = !0, o.receiveShadow = !0;
        const c = (Array.isArray(o.material) ? o.material : [o.material]).map(
          (A) => this.normalizeMaterial(A, i, r, s)
        );
        o.material = Array.isArray(o.material) ? c : c[0], o.geometry && (r ? o.geometry.computeVertexNormals() : o.geometry.attributes?.normal || o.geometry.computeVertexNormals(), o.geometry.normalizeNormals(), c.some((h) => h?.normalMap) && this.canComputeTangents(o.geometry) && o.geometry.computeTangents());
      }
    });
    const n = new f.Box3().setFromObject(t);
    return t.userData.boundingBox = n, t;
  }
  getMaxAnisotropy() {
    if (!this.renderer || !this.renderer.capabilities || typeof this.renderer.capabilities.getMaxAnisotropy != "function")
      return null;
    const e = this.renderer.capabilities.getMaxAnisotropy();
    return typeof e == "number" ? e : null;
  }
  processMaterial(e) {
    e && e.needsUpdate !== void 0 && (e.needsUpdate = !0);
  }
  normalizeMaterial(e, t, s, i) {
    if (!e)
      return e;
    this.clearBakedLighting(e);
    const r = this.getGLTFMaterialDef(t, e), o = s || e.type === "MeshBasicMaterial" || e.type === "MeshPhongMaterial" ? this.createStandardMaterial(e, r, s) : e;
    return this.processMaterialTextures(o, i, s), o.needsUpdate !== void 0 && (o.needsUpdate = !0), e !== o && typeof e.dispose == "function" && e.dispose(), o;
  }
  clearBakedLighting(e) {
    e.emissive && e.emissive.setHex(0), e.emissiveIntensity !== void 0 && (e.emissiveIntensity = 0), e.emissiveMap && (e.emissiveMap = null), e.lightMap && (e.lightMap = null), e.lightMapIntensity !== void 0 && (e.lightMapIntensity = 0);
  }
  createStandardMaterial(e, t, s) {
    const i = t?.pbrMetallicRoughness || {}, r = e.color?.clone?.() || new f.Color(16777215), n = new f.MeshStandardMaterial({
      color: r,
      side: s ? f.FrontSide : e.side ?? f.FrontSide,
      wireframe: e.wireframe || !1,
      vertexColors: e.vertexColors || !1,
      fog: e.fog ?? !0,
      flatShading: !1,
      roughness: s ? 1 : i.roughnessFactor ?? e.roughness ?? 0.8,
      metalness: s ? 0 : i.metallicFactor ?? e.metalness ?? 0.3
    });
    return e.map && (n.map = e.map), e.alphaMap && (n.alphaMap = e.alphaMap), e.transparent !== void 0 && (n.transparent = e.transparent), typeof e.opacity == "number" && (n.opacity = e.opacity), s || (e.aoMap && (n.aoMap = e.aoMap), typeof e.aoMapIntensity == "number" && (n.aoMapIntensity = e.aoMapIntensity), e.envMap && (n.envMap = e.envMap), e.roughnessMap && (n.roughnessMap = e.roughnessMap), e.metalnessMap && (n.metalnessMap = e.metalnessMap), e.normalMap && (n.normalMap = e.normalMap, n.normalScale = e.normalScale || new f.Vector2(1, 1))), n;
  }
  processMaterialTextures(e, t, s) {
    [
      "map",
      "alphaMap",
      "normalMap",
      "roughnessMap",
      "metalnessMap",
      "aoMap",
      "emissiveMap"
    ].forEach((r) => {
      e[r] && this.processTexture(e[r], t, {
        fixPhotogrammetryAtlas: s && r === "map"
      });
    });
  }
  getGLTFMaterialDef(e, t) {
    const s = e?.associations?.get?.(t)?.materials;
    return s == null ? null : e?.json?.materials?.[s] || null;
  }
  shouldNormalizePhotogrammetryAtlas(e) {
    const t = e?.json;
    if (!t)
      return !1;
    const s = t.materials || [], i = t.meshes || [], r = t.accessors || [];
    if (!s.length || !i.length)
      return !1;
    const n = s.some(
      (c) => c?.pbrMetallicRoughness?.baseColorTexture !== void 0
    ), o = s.some(
      (c) => c?.normalTexture || c?.occlusionTexture || c?.emissiveTexture || c?.pbrMetallicRoughness?.metallicRoughnessTexture
    );
    if (!n || o)
      return !1;
    let l = 0;
    for (const c of i)
      for (const A of c.primitives || []) {
        if (A?.attributes?.POSITION === void 0 || A.attributes.TEXCOORD_0 === void 0)
          return !1;
        const h = r[A.attributes.POSITION]?.count || 0, d = A.indices !== void 0 ? r[A.indices]?.count || 0 : h;
        l += Math.floor(d / 3);
      }
    return l >= 5e4;
  }
  processTexture(e, t = null, { fixPhotogrammetryAtlas: s = !1 } = {}) {
    e && (t !== null && (e.anisotropy = t), s && (e.isCompressedTexture || (e.generateMipmaps = !1), e.minFilter = f.LinearFilter, e.wrapS = f.ClampToEdgeWrapping, e.wrapT = f.ClampToEdgeWrapping), e.needsUpdate = !0);
  }
  canComputeTangents(e) {
    return !!(e?.index && e.attributes?.position && e.attributes?.normal && e.attributes?.uv);
  }
  releaseFromCache(e) {
    if (!this.cache.has(e))
      return;
    const t = this.cache.get(e);
    this.disposeGLTFResources(t), this.cache.delete(e);
  }
  disposeGLTFResources(e) {
    if (!e) return;
    this.releaseParserCaches(e);
    const t = /* @__PURE__ */ new Set(), s = (i) => {
      !i || t.has(i) || (t.add(i), i.traverse((r) => {
        r.isMesh && (r.geometry && r.geometry.dispose(), this.disposeMaterialResources(r.material));
      }));
    };
    Array.isArray(e.scenes) && e.scenes.forEach(s), e.scene && s(e.scene);
  }
  disposeMaterialResources(e) {
    if (!e) return;
    const t = Array.isArray(e) ? e : [e], s = [
      "map",
      "alphaMap",
      "aoMap",
      "bumpMap",
      "clearcoatMap",
      "clearcoatNormalMap",
      "clearcoatRoughnessMap",
      "displacementMap",
      "emissiveMap",
      "envMap",
      "iridescenceMap",
      "lightMap",
      "metalnessMap",
      "normalMap",
      "roughnessMap",
      "specularMap",
      "specularColorMap",
      "specularIntensityMap",
      "sheenColorMap",
      "sheenRoughnessMap",
      "thicknessMap",
      "transmissionMap",
      "anisotropyMap"
    ];
    t.forEach((i) => {
      i && (s.forEach((r) => {
        const n = i[r];
        n && typeof n.dispose == "function" && n.dispose(), n && n.source && typeof n.source.dispose == "function" && n.source.dispose(), n && n.image && typeof n.image.close == "function" && n.image.close(), n && (i[r] = null);
      }), typeof i.dispose == "function" && i.dispose());
    });
  }
  releaseParserCaches(e) {
    const t = e?.parser;
    t && (t.cache && typeof t.cache.removeAll == "function" && t.cache.removeAll(), t.associations && typeof t.associations.clear == "function" && t.associations.clear(), t.primitiveCache = {}, t.nodeCache = {}, t.meshCache = { refs: {}, uses: {} }, t.cameraCache = { refs: {}, uses: {} }, t.lightCache = { refs: {}, uses: {} }, t.sourceCache = {}, t.textureCache = {}, t.nodeNamesUsed = {}, t.json = null, t.extensions = null, t.plugins = null, t.options = null, t.textureLoader = null, e.parser = null, fl());
  }
  dispose() {
    this.dracoLoader && this.dracoLoader.dispose(), this.cache.forEach((e) => {
      this.disposeGLTFResources(e);
    }), this.cache.clear(), this.ktx2SetupComplete = !1;
  }
  static isIOSWebKit() {
    if (typeof navigator > "u")
      return !1;
    const e = navigator.userAgent || "", t = navigator.userAgentData && navigator.userAgentData.platform || navigator.platform || "";
    return !!(/iPhone|iPad|iPod/.test(t) || t === "MacIntel" && navigator.maxTouchPoints > 1 || /AppleWebKit/.test(e) && /Mobile/.test(e) && !/Chrome|CriOS|FxiOS/.test(e));
  }
  static getPlatformKey() {
    return ee.isIOSWebKit() ? "ios" : "default";
  }
}
ee.sharedKTX2Loaders = /* @__PURE__ */ new Map();
ee.sharedKTX2SetupComplete = /* @__PURE__ */ new Map();
function El(a, e = null, t = null) {
  const s = [];
  for (s.push(a), s.push(null), s.push(0); s.length > 0; ) {
    const i = s.pop(), r = s.pop(), n = s.pop();
    if (e && e(n, r, i)) {
      t && t(n, r, i);
      return;
    }
    const o = n.children;
    if (o)
      for (let l = o.length - 1; l >= 0; l--)
        s.push(o[l]), s.push(n), s.push(i + 1);
    t && t(n, r, i);
  }
}
function Pe(a) {
  if (a === null || a.byteLength < 4)
    return "";
  let e;
  if (a instanceof DataView ? e = a : e = new DataView(a), String.fromCharCode(e.getUint8(0)) === "{")
    return null;
  let t = "";
  for (let s = 0; s < 4; s++)
    t += String.fromCharCode(e.getUint8(s));
  return t;
}
const Il = new TextDecoder();
function ui(a) {
  return Il.decode(a);
}
function pi(a) {
  return a.replace(/[\\/][^\\/]+$/, "") + "/";
}
let wt = class {
  constructor() {
    this.fetchOptions = {}, this.workingPath = "";
  }
  /**
   * Fetches and parses content from the given URL.
   * @param {string} url
   * @returns {Promise<any>}
   */
  loadAsync(e) {
    return fetch(e, this.fetchOptions).then((t) => {
      if (!t.ok)
        throw new Error(`Failed to load file "${e}" with status ${t.status} : ${t.statusText}`);
      return t.arrayBuffer();
    }).then((t) => (this.workingPath === "" && (this.workingPath = pi(e)), this.parse(t)));
  }
  /**
   * Resolves a relative URL against `workingPath`.
   * @param {string} url
   * @returns {string}
   */
  resolveExternalURL(e) {
    return new URL(e, this.workingPath).href;
  }
  /**
   * Parses a raw buffer into a tile result object. Must be implemented by subclasses.
   * @param {ArrayBuffer} buffer
   * @returns {any}
   */
  parse(e) {
    throw new Error("LoaderBase: Parse not implemented.");
  }
};
var wl = Object.defineProperty, Bl = (a, e, t) => e in a ? wl(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t, Oi = (a, e, t) => Bl(a, typeof e != "symbol" ? e + "" : e, t);
function Hi(a) {
  if (!a)
    return null;
  let e = a.length;
  const t = a.indexOf("?"), s = a.indexOf("#");
  t !== -1 && (e = Math.min(e, t)), s !== -1 && (e = Math.min(e, s));
  const i = a.lastIndexOf(".", e), r = a.lastIndexOf("/", e), n = a.indexOf("://");
  return n !== -1 && n + 2 === r || i === -1 || i < r ? null : a.substring(i + 1, e) || null;
}
class _e {
  /**
   * Sets the active "XRSession" value to use to scheduling rAF callbacks.
   * @param {XRSession} session
   */
  static setXRSession(e) {
    e !== this.session && (this.flushPending(), this.session = e);
  }
  /**
   * Request animation frame (defer to XR session if set)
   * @param {Function} cb
   * @returns {number}
   */
  static requestAnimationFrame(e) {
    const { session: t, pending: s } = this;
    let i;
    const r = () => {
      s.delete(i), e();
    };
    return t ? i = t.requestAnimationFrame(r) : i = requestAnimationFrame(r), s.set(i, e), i;
  }
  /**
   * Cancel animation frame via handle (defer to XR session if set)
   * @param {number} handle
   */
  static cancelAnimationFrame(e) {
    const { pending: t, session: s } = this;
    t.delete(e), s ? s.cancelAnimationFrame(e) : cancelAnimationFrame(e);
  }
  /**
   * Flush and complete pending AFs (defer to XR session if set)
   */
  static flushPending() {
    this.pending.forEach((e, t) => {
      e(), this.cancelAnimationFrame(t);
    });
  }
}
Oi(_e, "pending", /* @__PURE__ */ new Map()), Oi(_e, "session", null);
const qi = 2 ** 30;
class Sl {
  /**
   * Comparator used to determine eviction order. Items that sort last are evicted first.
   * When `null`, eviction order is by last-used time.
   * @type {UnloadPriorityCallback|null}
   * @default null
   */
  get unloadPriorityCallback() {
    return this._unloadPriorityCallback;
  }
  set unloadPriorityCallback(e) {
    e.length === 1 ? (console.warn('LRUCache: "unloadPriorityCallback" function has been changed to take two arguments.'), this._unloadPriorityCallback = (t, s) => {
      const i = e(t), r = e(s);
      return i < r ? -1 : i > r ? 1 : 0;
    }) : this._unloadPriorityCallback = e;
  }
  constructor() {
    this.minSize = 6e3, this.maxSize = 8e3, this.minBytesSize = 0.3 * qi, this.maxBytesSize = 0.4 * qi, this.unloadPercent = 0.05, this.autoMarkUnused = !0, this.itemSet = /* @__PURE__ */ new Map(), this.itemList = [], this.usedSet = /* @__PURE__ */ new Set(), this.callbacks = /* @__PURE__ */ new Map(), this.unloadingHandle = -1, this.cachedBytes = 0, this.bytesMap = /* @__PURE__ */ new Map(), this.loadedSet = /* @__PURE__ */ new Set(), this._unloadPriorityCallback = null;
    const e = this.itemSet;
    this.defaultPriorityCallback = (t) => e.get(t);
  }
  /**
   * Returns whether the cache has reached its maximum item count or byte size.
   * @returns {boolean}
   */
  isFull() {
    return this.itemSet.size >= this.maxSize || this.cachedBytes >= this.maxBytesSize;
  }
  /**
   * Returns the byte size registered for the given item, or 0 if not tracked.
   * @param {any} item
   * @returns {number}
   */
  getMemoryUsage(e) {
    return this.bytesMap.get(e) || 0;
  }
  /**
   * Sets the byte size for the given item, updating the total `cachedBytes` count.
   * @param {any} item
   * @param {number} bytes
   */
  setMemoryUsage(e, t) {
    const { bytesMap: s, itemSet: i } = this;
    i.has(e) && (this.cachedBytes -= s.get(e) || 0, s.set(e, t), this.cachedBytes += t);
  }
  /**
   * Adds an item to the cache. Returns false if the item already exists or the cache is full.
   * @param {any} item
   * @param {RemoveCallback} removeCb - Called with the item when it is evicted
   * @returns {boolean}
   */
  add(e, t) {
    const s = this.itemSet;
    if (s.has(e) || this.isFull())
      return !1;
    const i = this.usedSet, r = this.itemList, n = this.callbacks;
    return r.push(e), i.add(e), s.set(e, Date.now()), n.set(e, t), !0;
  }
  /**
   * Returns whether the given item is in the cache.
   * @param {any} item
   * @returns {boolean}
   */
  has(e) {
    return this.itemSet.has(e);
  }
  /**
   * Removes an item from the cache immediately, invoking its removal callback.
   * Returns false if the item was not in the cache.
   * @param {any} item
   * @returns {boolean}
   */
  remove(e) {
    const t = this.usedSet, s = this.itemSet, i = this.itemList, r = this.bytesMap, n = this.callbacks, o = this.loadedSet;
    if (s.has(e)) {
      this.cachedBytes -= r.get(e) || 0, r.delete(e), n.get(e)(e);
      const l = i.indexOf(e);
      return i.splice(l, 1), t.delete(e), s.delete(e), n.delete(e), o.delete(e), !0;
    }
    return !1;
  }
  /**
   * Marks whether an item has finished loading. Unloaded items may be evicted early
   * when the cache is over its max size limits, even if they are marked as used.
   * @param {any} item
   * @param {boolean} value
   */
  setLoaded(e, t) {
    const { itemSet: s, loadedSet: i } = this;
    s.has(e) && (t === !0 ? i.add(e) : i.delete(e));
  }
  /**
   * Marks an item as used in the current frame, preventing it from being evicted.
   * @param {any} item
   */
  markUsed(e) {
    const t = this.itemSet, s = this.usedSet;
    t.has(e) && !s.has(e) && (t.set(e, Date.now()), s.add(e));
  }
  /**
   * Marks an item as unused, making it eligible for eviction.
   * @param {any} item
   */
  markUnused(e) {
    this.usedSet.delete(e);
  }
  /**
   * Marks all items in the cache as unused.
   */
  markAllUnused() {
    this.usedSet.clear();
  }
  /**
   * Returns whether the given item is currently marked as used.
   * @param {any} item
   * @returns {boolean}
   */
  isUsed(e) {
    return this.usedSet.has(e);
  }
  /**
   * Evicts unused items until the cache is within its min size and byte limits.
   * Items are sorted by `unloadPriorityCallback` before eviction.
   */
  // TODO: this should be renamed because it's not necessarily unloading all unused content
  // Maybe call it "cleanup" or "unloadToMinSize"
  unloadUnusedContent() {
    const {
      unloadPercent: e,
      minSize: t,
      maxSize: s,
      itemList: i,
      itemSet: r,
      usedSet: n,
      loadedSet: o,
      callbacks: l,
      bytesMap: c,
      minBytesSize: A,
      maxBytesSize: h
    } = this, d = i.length - n.size, u = i.length - o.size, p = Math.max(Math.min(i.length - t, d), 0), g = this.cachedBytes - A, b = this.unloadPriorityCallback || this.defaultPriorityCallback;
    let C = !1;
    const y = p > 0 && d > 0 || u && i.length > s;
    if (d && this.cachedBytes > A || u && this.cachedBytes > h || y) {
      i.sort((M, S) => {
        const T = n.has(M), D = n.has(S);
        if (T === D) {
          const _ = o.has(M), Q = o.has(S);
          return _ === Q ? -b(M, S) : _ ? 1 : -1;
        } else
          return T ? 1 : -1;
      });
      const E = Math.max(t * e, p * e), m = Math.ceil(Math.min(E, d, p)), I = Math.max(e * g, e * A), B = Math.min(I, g);
      let w = 0, v = 0;
      for (; this.cachedBytes - v > h || i.length - w > s; ) {
        const M = i[w], S = c.get(M) || 0;
        if (n.has(M) && o.has(M) || this.cachedBytes - v - S < h && i.length - w <= s)
          break;
        v += S, w++;
      }
      for (; v < B || w < m; ) {
        const M = i[w], S = c.get(M) || 0;
        if (n.has(M) || this.cachedBytes - v - S < A && w >= m)
          break;
        v += S, w++;
      }
      i.splice(0, w).forEach((M) => {
        this.cachedBytes -= c.get(M) || 0, l.get(M)(M), c.delete(M), r.delete(M), l.delete(M), o.delete(M), n.delete(M);
      }), C = w < p || v < g && w < d, C = C && w > 0;
    }
    C && (this.unloadingHandle = _e.requestAnimationFrame(() => this.scheduleUnload()));
  }
  /**
   * Schedules `unloadUnusedContent` to run asynchronously via microtask.
   */
  scheduleUnload() {
    _e.cancelAnimationFrame(this.unloadingHandle), this.scheduled || (this.scheduled = !0, queueMicrotask(() => {
      this.scheduled = !1, this.unloadUnusedContent();
    }));
  }
}
class Ml extends DOMException {
  constructor() {
    super("PriorityQueue: Item removed", "AbortError");
  }
}
let hs = class {
  /**
   * returns whether tasks are queued or actively running
   * @readonly
   * @type {boolean}
   */
  get running() {
    return this.items.length !== 0 || this.currJobs !== 0;
  }
  constructor() {
    this.maxJobs = 6, this.items = [], this.callbacks = /* @__PURE__ */ new Map(), this.currJobs = 0, this.scheduled = !1, this.autoUpdate = !0, this.priorityCallback = null, this._schedulingCallback = (e) => {
      _e.requestAnimationFrame(e);
    }, this._runjobs = () => {
      this.scheduled = !1, this.tryRunJobs();
    };
  }
  /**
   * Sorts the pending item list using `priorityCallback`, if set.
   */
  sort() {
    const e = this.priorityCallback, t = this.items;
    e !== null && t.sort(e);
  }
  /**
   * Returns whether the given item is currently queued.
   * @param {any} item
   * @returns {boolean}
   */
  has(e) {
    return this.callbacks.has(e);
  }
  /**
   * Adds an item to the queue and returns a Promise that resolves when the item's
   * callback completes, or rejects if the item is removed before running.
   * @param {any} item
   * @param {ItemCallback} callback - Invoked with `item` when it is dequeued; may return a Promise
   * @returns {Promise<any>}
   */
  add(e, t) {
    const s = {
      callback: t,
      reject: null,
      resolve: null,
      promise: null
    };
    return s.promise = new Promise((i, r) => {
      const n = this.items, o = this.callbacks;
      s.resolve = i, s.reject = r, n.unshift(e), o.set(e, s), this.autoUpdate && this.scheduleJobRun();
    }), s.promise;
  }
  /**
   * Removes an item from the queue, rejecting its promise with an `AbortError` DOMException.
   * @param {any} item
   */
  remove(e) {
    const t = this.items, s = this.callbacks, i = t.indexOf(e);
    if (i !== -1) {
      const r = s.get(e);
      r.promise.catch((n) => {
        if (n.name !== "AbortError")
          throw n;
      }), r.reject(new Ml()), t.splice(i, 1), s.delete(e);
    }
  }
  /**
   * Removes all queued items for which `filter` returns true.
   * @param {FilterCallback} filter - Called with each item; return true to remove
   */
  removeByFilter(e) {
    const { items: t } = this;
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      e(i) && (this.remove(i), s--);
    }
  }
  /**
   * Immediately attempts to dequeue and run pending jobs up to `maxJobs` concurrency.
   */
  tryRunJobs() {
    this.sort();
    const e = this.items, t = this.callbacks, s = this.maxJobs;
    let i = 0;
    const r = () => {
      this.currJobs--, this.autoUpdate && this.scheduleJobRun();
    };
    for (; s > this.currJobs && e.length > 0 && i < s; ) {
      this.currJobs++, i++;
      const n = e.pop(), { callback: o, resolve: l, reject: c } = t.get(n);
      t.delete(n);
      let A;
      try {
        A = o(n);
      } catch (h) {
        c(h), r();
      }
      A instanceof Promise ? A.then(l).catch(c).finally(r) : (l(A), r());
    }
  }
  /**
   * Immediately runs the callback for the given item, removing it from the queue.
   * Does nothing if the item is not queued.
   * @param {any} item
   * @returns {Promise<any>|any}
   */
  flush(e) {
    const { items: t, callbacks: s } = this, i = t.indexOf(e);
    if (!s.has(e))
      return;
    const { callback: r, resolve: n, reject: o } = s.get(e);
    s.delete(e), t.splice(i, 1);
    let l;
    try {
      l = r(e);
    } catch (c) {
      o(c);
      return;
    }
    return l instanceof Promise ? l.then(n).catch(o) : n(l), l;
  }
  /**
   * Schedules a deferred call to `tryRunJobs` via `schedulingCallback`.
   */
  scheduleJobRun() {
    this.scheduled || (this._schedulingCallback(this._runjobs), this.scheduled = !0);
  }
};
const gt = -1, we = 0, Tt = 1, Qt = 2, Rs = 3, ve = 4, zi = 6378137, vl = 6356752314245179e-9, Rt = {
  inView: !1,
  error: 1 / 0,
  distanceFromCamera: 1 / 0
};
function As(a) {
  return a === ve || a === gt;
}
function be(a, e) {
  return ds(a) && a.traversal.lastFrameVisited === e && a.traversal.used;
}
function ds(a) {
  return !!a.traversal;
}
function Bt(a) {
  const { children: e } = a, t = e.length === 0 || ds(e[e.length - 1]), s = !a.internal.hasUnrenderableContent || As(a.internal.loadingState);
  return t && s;
}
function Ue(a) {
  return a.traversal.unconditionallyRefine;
}
function Ct(a, e) {
  if (ds(a) && (e.ensureChildrenArePreprocessed(a), a.traversal.lastFrameVisited !== e.frameCount && (a.traversal.wasInFrustum = a.traversal.inFrustum, a.traversal.wasSetActive = a.traversal.active, a.traversal.wasSetVisible = a.traversal.visible, a.traversal.usedLastFrame = a.traversal.used, a.traversal.lastFrameVisited = e.frameCount, a.traversal.used = !1, a.traversal.inFrustum = !1, a.traversal.isLeaf = !1, a.traversal.visible = !1, a.traversal.active = !1, a.traversal.error = 1 / 0, a.traversal.distanceFromCamera = 1 / 0, a.traversal.allChildrenReady = !1, a.traversal.allChildrenLoaded = !1, a.traversal.kicked = !1, a.traversal.allUsedChildrenProcessed = !1, e.calculateTileViewErrorWithPlugin(a, Rt), a.traversal.inFrustum = Rt.inView, a.traversal.error = Rt.error, a.traversal.distanceFromCamera = Rt.distanceFromCamera, a.traversal.unconditionallyRefine = a.internal.hasUnrenderableContent, !a.traversal.unconditionallyRefine))) {
    let t = a.parent;
    for (; t && t.traversal.unconditionallyRefine; )
      t = t.parent;
    t && t.geometricError <= a.geometricError && (a.traversal.unconditionallyRefine = !0);
  }
}
function ii(a, e, t = !1) {
  if (Ct(a, e), t ? e.markTileUsed(a) : Wt(a), Ue(a) && Bt(a)) {
    const s = a.children;
    for (let i = 0, r = s.length; i < r; i++)
      ii(s[i], e, t);
  }
}
function In(a, e) {
  if (Ct(a, e), a.traversal.usedLastFrame && (Wt(a), a.traversal.wasSetActive && (a.traversal.active = !0), (!a.traversal.active || Ue(a)) && Bt(a))) {
    const t = a.children;
    for (let s = 0, i = t.length; s < i; s++)
      In(t[s], e);
  }
}
function Wt(a) {
  a.traversal.used = !0;
}
function xl(a, e) {
  return !(a.traversal.error <= e.errorTarget && !Ue(a) || e.maxDepth > 0 && a.internal.depth + 1 >= e.maxDepth || !Bt(a));
}
function wn(a, e) {
  const { frameCount: t } = e, { children: s } = a;
  for (let i = 0, r = s.length; i < r; i++) {
    const n = s[i];
    be(n, t) && (n.traversal.active && (n.traversal.kicked = !0, n.traversal.active = !1), wn(n, e));
  }
}
function ji(a) {
  return !Ue(a) && (!a.internal.hasContent || As(a.internal.loadingState));
}
function Bn(a, e) {
  if (Ct(a, e), !a.traversal.inFrustum)
    return;
  if (!xl(a, e)) {
    Wt(a);
    return;
  }
  let t = !1, s = !1;
  const i = a.children;
  for (let r = 0, n = i.length; r < n; r++) {
    const o = i[r];
    Bn(o, e), t = t || be(o, e.frameCount), s = s || o.traversal.inFrustum;
  }
  if (a.refine === "REPLACE" && !s && i.length !== 0) {
    a.traversal.inFrustum = !1, e.markTileUsed(a);
    for (let r = 0, n = i.length; r < n; r++)
      ii(i[r], e, !0);
    return;
  }
  if (Wt(a), a.refine === "REPLACE" && t && (e.loadSiblings || e.loadAncestors))
    for (let r = 0, n = i.length; r < n; r++)
      ii(i[r], e);
}
function Sn(a, e) {
  const t = e.frameCount;
  if (!be(a, t))
    return;
  const s = a.children;
  let i = !1;
  for (let n = 0, o = s.length; n < o; n++) {
    const l = s[n];
    i = i || be(l, t);
  }
  if (!i)
    a.traversal.isLeaf = !0;
  else {
    for (let o = 0, l = s.length; o < l; o++)
      Sn(s[o], e);
    let n = !0;
    for (let o = 0, l = s.length; o < l; o++) {
      const c = s[o];
      if (be(c, t)) {
        const A = !Ue(c), h = !c.internal.hasContent || As(c.internal.loadingState);
        A && h || c.traversal.allChildrenLoaded || (n = !1);
      }
    }
    a.traversal.allChildrenLoaded = n;
  }
  let r = !0;
  for (let n = 0, o = s.length; n < o; n++) {
    const l = s[n];
    be(l, e.frameCount) && !l.traversal.allUsedChildrenProcessed && (r = !1);
  }
  a.traversal.allUsedChildrenProcessed = r && Bt(a);
}
function Mn(a, e) {
  if (!be(a, e.frameCount))
    return;
  const t = a.children;
  if (e.loadAncestors && !a.traversal.allChildrenLoaded && !Ue(a) && (a.traversal.isLeaf = !0), a.traversal.isLeaf) {
    if (!Ue(a) && (a.traversal.active = !0, Bt(a) && a.internal.hasContent && !As(a.internal.loadingState)))
      for (let i = 0, r = t.length; i < r; i++)
        In(t[i], e);
    return;
  }
  let s = t.length > 0;
  for (let i = 0, r = t.length; i < r; i++) {
    const n = t[i];
    Mn(n, e), be(n, e.frameCount) && !(n.traversal.active && ji(n)) && !n.traversal.allChildrenReady && (s = !1);
  }
  a.traversal.allChildrenReady = s, !s && a.traversal.wasSetActive && ji(a) && (a.traversal.active = !0, wn(a, e));
}
function vn(a, e) {
  Ct(a, e);
  const t = be(a, e.frameCount);
  if (t && (a.internal.hasUnrenderableContent && (e.markTileUsed(a), e.queueTileForDownload(a)), a.internal.hasRenderableContent && a.refine === "ADD" && (a.traversal.active = !0), (a.traversal.active || a.traversal.kicked) && a.internal.hasContent && (e.markTileUsed(a), a.traversal.allUsedChildrenProcessed && e.queueTileForDownload(a), a.internal.loadingState !== ve && (a.traversal.active = !1)), e.loadAncestors && a.internal.hasContent && (e.markTileUsed(a), e.queueTileForDownload(a)), a.internal.virtualChildCount > 0 && a.internal.hasContent && e.markTileUsed(a), a.traversal.visible = a.internal.hasRenderableContent && a.traversal.active && a.traversal.inFrustum && a.internal.loadingState === ve, e.stats.used++, a.traversal.inFrustum && e.stats.inFrustum++), t || ds(a) && a.traversal.usedLastFrame) {
    let s = !1, i = !1;
    t ? (s = a.traversal.active, e.displayActiveTiles ? i = a.traversal.active || a.traversal.visible : i = a.traversal.visible) : Ct(a, e), a.internal.hasRenderableContent && a.internal.loadingState === ve ? (s && e.stats.active++, i && e.stats.visible++, a.traversal.wasSetActive !== s && e.invokeOnePlugin((n) => n.setTileActive && n.setTileActive(a, s)), a.traversal.wasSetVisible !== i && e.invokeOnePlugin((n) => n.setTileVisible && n.setTileVisible(a, i))) : a.internal.hasRenderableContent || (i = a.traversal.isLeaf, a.traversal.wasSetVisible !== i && e.invokeOnePlugin((n) => n.setEmptyTileVisible && n.setEmptyTileVisible(a, i))), a.traversal.visible = i, a.traversal.active = s;
    const r = a.children;
    for (let n = 0, o = r.length; n < o; n++) {
      const l = r[n];
      vn(l, e);
    }
  }
}
function Tl(a, e) {
  Bn(a, e), Sn(a, e), Mn(a, e), vn(a, e);
}
function Ql(a) {
  let e = null;
  return () => {
    e === null && (e = _e.requestAnimationFrame(() => {
      e = null, a();
    }));
  };
}
const Ki = Symbol("PLUGIN_REGISTERED"), Be = {
  inView: !0,
  error: 0,
  distance: 1 / 0
}, Rl = (a, e) => {
  const t = a.priority || 0, s = e.priority || 0;
  return t !== s ? t > s ? 1 : -1 : !a.traversal || !e.traversal ? 0 : a.traversal.used !== e.traversal.used ? a.traversal.used ? 1 : -1 : a.traversal.error !== e.traversal.error ? a.traversal.error > e.traversal.error ? 1 : -1 : a.traversal.distanceFromCamera !== e.traversal.distanceFromCamera ? a.traversal.distanceFromCamera > e.traversal.distanceFromCamera ? -1 : 1 : a.internal.depthFromRenderedParent !== e.internal.depthFromRenderedParent ? a.internal.depthFromRenderedParent > e.internal.depthFromRenderedParent ? -1 : 1 : 0;
}, Dl = (a, e) => a.traversal.used !== e.traversal.used ? a.traversal.used ? 1 : -1 : a.traversal.inFrustum !== e.traversal.inFrustum ? a.traversal.inFrustum ? 1 : -1 : a.internal.hasUnrenderableContent !== e.internal.hasUnrenderableContent ? a.internal.hasUnrenderableContent ? 1 : -1 : a.traversal.distanceFromCamera !== e.traversal.distanceFromCamera ? a.traversal.distanceFromCamera > e.traversal.distanceFromCamera ? -1 : 1 : a.internal.depthFromRenderedParent !== e.internal.depthFromRenderedParent ? a.internal.depthFromRenderedParent > e.internal.depthFromRenderedParent ? -1 : 1 : 0, Ll = (a, e) => a.traversal.lastFrameVisited !== e.traversal.lastFrameVisited ? a.traversal.lastFrameVisited > e.traversal.lastFrameVisited ? -1 : 1 : a.internal.depthFromRenderedParent !== e.internal.depthFromRenderedParent ? a.internal.depthFromRenderedParent > e.internal.depthFromRenderedParent ? 1 : -1 : a.internal.loadingState !== e.internal.loadingState ? a.internal.loadingState > e.internal.loadingState ? -1 : 1 : a.internal.hasUnrenderableContent !== e.internal.hasUnrenderableContent ? a.internal.hasUnrenderableContent ? -1 : 1 : a.traversal.error !== e.traversal.error ? a.traversal.error > e.traversal.error ? -1 : 1 : 0, us = (a, e) => {
  const t = a.priority ?? 1 / 0, s = e.priority ?? 1 / 0;
  if (t !== s)
    return t > s ? 1 : -1;
  if (!a.internal || !e.internal)
    return 0;
  const i = a.internal.renderer, r = e.internal.renderer, n = !i.loadAncestors, o = !r.loadAncestors;
  return n && o ? Dl(a, e) : Rl(a, e);
}, xn = new Sl();
xn.unloadPriorityCallback = Ll;
const gi = new hs();
gi.maxJobs = 25;
gi.priorityCallback = us;
const fi = new hs();
fi.maxJobs = 5;
fi.priorityCallback = us;
const mi = new hs();
mi.maxJobs = 25;
mi.priorityCallback = (a, e) => {
  const t = a.parent, s = e.parent;
  return t === s ? 0 : t ? s ? us(t, s) : -1 : 1;
};
let Fl = class {
  /**
   * Root tile of the loaded root tileset, or null if not yet loaded.
   * @type {Tile|null}
   * @readonly
   */
  get root() {
    const e = this.rootTileset;
    return e ? e.root : null;
  }
  /**
   * Fraction of tiles loaded since the last idle state, from 0 (nothing loaded) to 1 (all loaded).
   * @type {number}
   * @readonly
   */
  get loadProgress() {
    const { stats: e, isLoading: t } = this, s = e.queued + e.downloading + e.parsing, i = e.inCacheSinceLoad + (t ? 1 : 0);
    return i === 0 ? 1 : 1 - s / i;
  }
  /**
   * @param {string} [url] - URL of the root tileset JSON to load.
   */
  constructor(e = null) {
    this.rootLoadingState = we, this.rootTileset = null, this.rootURL = e, this.fetchOptions = {}, this.plugins = [], this.queuedTiles = [], this.cachedSinceLoadComplete = /* @__PURE__ */ new Set(), this.isLoading = !1, this.processedTiles = /* @__PURE__ */ new WeakSet(), this.visibleTiles = /* @__PURE__ */ new Set(), this.activeTiles = /* @__PURE__ */ new Set(), this.usedSet = /* @__PURE__ */ new Set(), this.loadingTiles = /* @__PURE__ */ new Set(), this.lruCache = xn, this.downloadQueue = gi, this.parseQueue = fi, this.processNodeQueue = mi, this.stats = {
      inCacheSinceLoad: 0,
      inCache: 0,
      queued: 0,
      downloading: 0,
      parsing: 0,
      loaded: 0,
      failed: 0,
      inFrustum: 0,
      used: 0,
      active: 0,
      visible: 0,
      tilesProcessed: 0
    }, this.frameCount = 0, this._dispatchNeedsUpdateEvent = Ql(() => {
      this.dispatchEvent({ type: "needs-update" });
    }), this.errorTarget = 16, this.displayActiveTiles = !1, this.maxDepth = 1 / 0, this.loadSiblings = !0, this.loadAncestors = !0, this.maxTilesProcessed = 250;
  }
  // Plugins
  /**
   * Registers a plugin with this renderer. Plugins are inserted in priority order and
   * receive lifecycle callbacks throughout the tile loading and rendering process.
   * A plugin instance may only be registered to one renderer at a time.
   * @param {Object} plugin
   */
  registerPlugin(e) {
    if (e[Ki] === !0)
      throw new Error("TilesRendererBase: A plugin can only be registered to a single tileset");
    const t = this.plugins, s = e.priority || 0;
    let i = t.length;
    for (let r = 0; r < t.length; r++)
      if ((t[r].priority || 0) > s) {
        i = r;
        break;
      }
    t.splice(i, 0, e), e[Ki] = !0, e.init && e.init(this);
  }
  /**
   * Removes a registered plugin. Calls `plugin.dispose()` if defined.
   * Accepts either the plugin instance or its string name.
   * Returns true if the plugin was found and removed.
   * @param {Object|string} plugin
   * @returns {boolean}
   */
  unregisterPlugin(e) {
    const t = this.plugins;
    if (typeof e == "string" && (e = this.getPluginByName(e)), t.includes(e)) {
      const s = t.indexOf(e);
      return t.splice(s, 1), e.dispose && e.dispose(), !0;
    }
    return !1;
  }
  /**
   * Returns the first registered plugin whose `name` property matches, or null.
   * @param {string} name
   * @returns {Object|null}
   */
  getPluginByName(e) {
    return this.plugins.find((t) => t.name === e) || null;
  }
  invokeOnePlugin(e) {
    const t = [...this.plugins, this];
    for (let s = 0; s < t.length; s++) {
      const i = e(t[s]);
      if (i)
        return i;
    }
    return null;
  }
  invokeAllPlugins(e) {
    const t = [...this.plugins, this], s = [];
    for (let i = 0; i < t.length; i++) {
      const r = e(t[i]);
      r && s.push(r);
    }
    return s.length === 0 ? null : Promise.all(s);
  }
  // Public API
  /**
   * Iterates over all tiles in the loaded hierarchy. `beforecb` is called before
   * descending into a tile's children; returning true from it skips the subtree.
   * `aftercb` is called after all children have been visited.
   * @param {TileBeforeCallback|null} [beforecb]
   * @param {TileAfterCallback|null} [aftercb]
   */
  traverse(e, t, s = !0) {
    this.root && El(this.root, (i, ...r) => (s && this.ensureChildrenArePreprocessed(i, !0), e ? e(i, ...r) : !1), t);
  }
  /**
   * Collects attribution data from all registered plugins into `target` and returns it.
   * @param {Array<{type: string, value: any}>} [target]
   * @returns {Array<{type: string, value: any}>}
   */
  getAttributions(e = []) {
    return this.invokeAllPlugins((t) => t !== this && t.getAttributions && t.getAttributions(e)), e;
  }
  /**
   * Runs the tile traversal and update loop. Should be called once per frame after
   * camera matrices have been updated. Triggers tile loading, visibility updates,
   * and LRU cache eviction.
   */
  update() {
    const { lruCache: e, usedSet: t, stats: s, root: i, downloadQueue: r, parseQueue: n, processNodeQueue: o } = this;
    if (this.rootLoadingState === we && (this.rootLoadingState = Qt, this.invokeOnePlugin((A) => A.loadRootTileset && A.loadRootTileset()).then((A) => {
      let h = this.rootURL;
      h !== null && this.invokeAllPlugins((d) => h = d.preprocessURL ? d.preprocessURL(h, null) : h), this.rootLoadingState = ve, this.rootTileset = A, this.dispatchEvent({ type: "needs-update" }), this.dispatchEvent({
        type: "load-tileset",
        tileset: A,
        url: h
      }), this.dispatchEvent({
        type: "load-root-tileset",
        tileset: A,
        url: h
      });
    }).catch((A) => {
      this.rootLoadingState = gt, console.error(A), this.rootTileset = null, this.dispatchEvent({
        type: "load-error",
        tile: null,
        error: A,
        url: this.rootURL
      });
    })), !i)
      return;
    let l = null;
    if (this.invokeAllPlugins((A) => {
      if (A.doTilesNeedUpdate) {
        const h = A.doTilesNeedUpdate();
        l === null ? l = h : l = !!(l || h);
      }
    }), l === !1) {
      this.dispatchEvent({ type: "update-before" }), this.dispatchEvent({ type: "update-after" });
      return;
    }
    this.dispatchEvent({ type: "update-before" }), s.inFrustum = 0, s.used = 0, s.active = 0, s.visible = 0, s.tilesProcessed = 0, this.frameCount++, t.forEach((A) => e.markUnused(A)), t.clear(), this.prepareForTraversal(), Tl(i, this), this.removeUnusedPendingTiles();
    const c = this.queuedTiles;
    c.sort(e.unloadPriorityCallback);
    for (let A = 0, h = c.length; A < h && !e.isFull(); A++)
      this.requestTileContents(c[A]);
    c.length = 0, e.scheduleUnload(), (r.running || n.running || o.running) === !1 && this.isLoading === !0 && (this.cachedSinceLoadComplete.clear(), s.inCacheSinceLoad = 0, this.dispatchEvent({ type: "tiles-load-end" }), this.isLoading = !1), this.dispatchEvent({ type: "update-after" });
  }
  /**
   * Resets any tiles that previously failed to load so they will be retried on the next `update`.
   */
  resetFailedTiles() {
    this.rootLoadingState === gt && (this.rootLoadingState = we);
    const e = this.stats;
    e.failed !== 0 && (this.traverse((t) => {
      t.internal.loadingState === gt && (t.internal.loadingState = we);
    }, null, !1), e.failed = 0);
  }
  calculateTileViewErrorWithPlugin(e, t) {
    this.calculateTileViewError(e, t);
    let s = null, i = 0, r = 1 / 0;
    this.invokeAllPlugins((n) => {
      n !== this && n.calculateTileViewError && (Be.inView = !0, Be.error = 0, Be.distance = 1 / 0, n.calculateTileViewError(e, Be) && (s === null && (s = !0), s = s && Be.inView, Be.inView && (r = Math.min(r, Be.distance), i = Math.max(i, Be.error))));
    }), t.inView && s !== !1 ? (t.error = Math.max(t.error, i), t.distanceFromCamera = Math.min(t.distanceFromCamera, r)) : s ? (t.inView = !0, t.error = i, t.distanceFromCamera = r) : t.inView = !1;
  }
  /**
   * Disposes all loaded tiles and unregisters all plugins. The renderer should not
   * be used after calling this.
   */
  dispose() {
    [...this.plugins].forEach((s) => {
      this.unregisterPlugin(s);
    });
    const e = this.lruCache, t = [];
    this.traverse((s) => (t.push(s), !1), null, !1);
    for (let s = 0, i = t.length; s < i; s++)
      e.remove(t[s]);
    this.stats = {
      queued: 0,
      parsing: 0,
      downloading: 0,
      failed: 0,
      inFrustum: 0,
      traversed: 0,
      used: 0,
      active: 0,
      visible: 0
    }, this.frameCount = 0, this.loadingTiles.clear();
  }
  // Overrideable
  calculateBytesUsed(e, t) {
    return 0;
  }
  /**
   * Dispatches an event to all registered listeners for the given event type.
   * @param {{ type: string }} e
   */
  dispatchEvent(e) {
  }
  /**
   * Registers a listener for the given event type.
   * @param {string} name
   * @param {EventCallback} callback
   */
  addEventListener(e, t) {
  }
  /**
   * Removes a previously registered event listener.
   * @param {string} name
   * @param {EventCallback} callback
   */
  removeEventListener(e, t) {
  }
  parseTile(e, t, s) {
    return null;
  }
  prepareForTraversal() {
  }
  disposeTile(e) {
    e.traversal.visible && (e.internal.hasRenderableContent ? this.invokeOnePlugin((s) => s.setTileVisible && s.setTileVisible(e, !1)) : this.invokeOnePlugin((s) => s.setEmptyTileVisible && s.setEmptyTileVisible(e, !1)), e.traversal.visible = !1), e.traversal.active && e.internal.hasRenderableContent && this.invokeOnePlugin((s) => s.setTileActive && s.setTileActive(e, !1)), e.traversal.active = !1;
    const { scene: t } = e.engineData;
    t && this.dispatchEvent({
      type: "dispose-model",
      scene: t,
      tile: e
    });
  }
  preprocessNode(e, t, s = null) {
    var i;
    if (this.processedTiles.add(e), this.stats.tilesProcessed++, e.content && (!("uri" in e.content) && "url" in e.content && (e.content.uri = e.content.url, delete e.content.url), e.content.boundingVolume && !("box" in e.content.boundingVolume || "sphere" in e.content.boundingVolume || "region" in e.content.boundingVolume) && delete e.content.boundingVolume), e.parent = s, e.children = e.children || [], e.internal = {
      hasContent: !1,
      hasRenderableContent: !1,
      hasUnrenderableContent: !1,
      loadingState: we,
      basePath: t,
      depth: -1,
      depthFromRenderedParent: -1,
      isVirtual: !1,
      virtualChildCount: 0,
      renderer: this,
      // preserve any pre-seeded fields
      ...e.internal
    }, (i = e.content) != null && i.uri) {
      const r = Hi(e.content.uri), n = !!(r && /json$/.test(r));
      e.internal.hasContent = !0, e.internal.hasUnrenderableContent = n, e.internal.hasRenderableContent = !n;
    } else
      e.internal.hasContent = !1, e.internal.hasUnrenderableContent = !1, e.internal.hasRenderableContent = !1;
    s ? (e.internal.depth = s.internal.depth + 1, e.internal.depthFromRenderedParent = s.internal.depthFromRenderedParent + (e.internal.hasRenderableContent ? 1 : 0)) : (e.internal.depth = 0, e.internal.depthFromRenderedParent = e.internal.hasRenderableContent ? 1 : 0), e.traversal = {
      distanceFromCamera: 1 / 0,
      error: 1 / 0,
      inFrustum: !1,
      wasInFrustum: !1,
      isLeaf: !1,
      used: !1,
      usedLastFrame: !1,
      visible: !1,
      wasSetVisible: !1,
      active: !1,
      wasSetActive: !1,
      allChildrenReady: !1,
      allChildrenLoaded: !1,
      kicked: !1,
      allUsedChildrenProcessed: !1,
      lastFrameVisited: -1
    }, s === null ? e.refine = e.refine || "REPLACE" : e.refine = e.refine || s.refine, e.engineData = {
      scene: null,
      metadata: null,
      boundingVolume: null
    }, Object.defineProperty(e, "cached", {
      get() {
        return console.warn('TilesRenderer: "tile.cached" field has been renamed to "tile.engineData".'), this.engineData;
      },
      enumerable: !1,
      configurable: !0
    }), this.invokeAllPlugins((r) => {
      r !== this && r.preprocessNode && r.preprocessNode(e, t, s);
    });
  }
  setTileActive(e, t) {
    t ? this.activeTiles.add(e) : this.activeTiles.delete(e);
  }
  setTileVisible(e, t) {
    t ? this.visibleTiles.add(e) : this.visibleTiles.delete(e), this.dispatchEvent({
      type: "tile-visibility-change",
      scene: e.engineData.scene,
      tile: e,
      visible: t
    });
  }
  calculateTileViewError(e, t) {
  }
  removeUnusedPendingTiles() {
    const { lruCache: e, loadingTiles: t } = this, s = [];
    for (const i of t)
      !e.isUsed(i) && i.internal.loadingState === Tt && s.push(i);
    for (let i = 0; i < s.length; i++)
      e.remove(s[i]);
  }
  // Private Functions
  queueTileForDownload(e) {
    e.internal.loadingState !== we || this.lruCache.isFull() || this.queuedTiles.push(e);
  }
  markTileUsed(e) {
    this.usedSet.add(e), this.lruCache.markUsed(e);
  }
  fetchData(e, t) {
    return fetch(e, t);
  }
  ensureChildrenArePreprocessed(e, t = this.stats.tilesProcessed < this.maxTilesProcessed) {
    const s = e.children;
    if (s.length === 0 || s[s.length - 1].traversal)
      return;
    const i = (r) => {
      for (let n = 0, o = r.length; n < o; n++) {
        const l = r[n];
        l && !l.traversal && this.preprocessNode(l, e.internal.basePath, e);
      }
    };
    t ? (this.processNodeQueue.remove(e), i(s)) : this.processNodeQueue.has(e) || this.processNodeQueue.add(e, (r) => {
      i(r.children), this._dispatchNeedsUpdateEvent();
    });
  }
  // returns the total bytes used for by the given tile as reported by all plugins
  getBytesUsed(e) {
    let t = 0;
    return this.invokeAllPlugins((s) => {
      s.calculateBytesUsed && (t += s.calculateBytesUsed(e, e.engineData.scene) || 0);
    }), t;
  }
  // force a recalculation of the tile or all tiles if no tile is provided
  recalculateBytesUsed(e = null) {
    const { lruCache: t, processedTiles: s } = this;
    e === null ? t.itemSet.forEach((i) => {
      s.has(i) && t.setMemoryUsage(i, this.getBytesUsed(i));
    }) : t.setMemoryUsage(e, this.getBytesUsed(e));
  }
  preprocessTileset(e, t, s = null) {
    const i = e.asset.version, [r, n] = i.split(".").map((l) => parseInt(l));
    console.assert(
      r <= 1,
      "TilesRenderer: asset.version is expected to be a 1.x or a compatible version."
    ), r === 1 && n > 0 && console.warn("TilesRenderer: tiles versions at 1.1 or higher have limited support. Some new extensions and features may not be supported.");
    let o = t.replace(/\/[^/]*$/, "");
    o = new URL(o, window.location.href).toString(), this.preprocessNode(e.root, o, s);
  }
  loadRootTileset() {
    let e = this.rootURL;
    return this.invokeAllPlugins((t) => e = t.preprocessURL ? t.preprocessURL(e, null) : e), this.invokeOnePlugin((t) => t.fetchData && t.fetchData(e, this.fetchOptions)).then((t) => {
      if (t instanceof Response) {
        if (t.ok)
          return t.json();
        throw new Error(`TilesRenderer: Failed to load tileset "${e}" with status ${t.status} : ${t.statusText}`);
      } else return t;
    }).then((t) => (this.preprocessTileset(t, e), t));
  }
  requestTileContents(e) {
    if (e.internal.loadingState !== we)
      return;
    let t = !1, s = null, i = new URL(e.content.uri, e.internal.basePath + "/").toString();
    this.invokeAllPlugins((u) => i = u.preprocessURL ? u.preprocessURL(i, e) : i);
    const r = this.stats, n = this.lruCache, o = this.downloadQueue, l = this.parseQueue, c = this.loadingTiles, A = Hi(i), h = new AbortController(), d = h.signal;
    if (n.add(e, (u) => {
      h.abort(), t ? u.children.length = 0 : this.invokeAllPlugins((p) => {
        p.disposeTile && p.disposeTile(u);
      }), r.inCache--, this.cachedSinceLoadComplete.has(e) && (this.cachedSinceLoadComplete.delete(e), r.inCacheSinceLoad--), u.internal.loadingState === Tt ? r.queued-- : u.internal.loadingState === Qt ? r.downloading-- : u.internal.loadingState === Rs ? r.parsing-- : u.internal.loadingState === ve && r.loaded--, u.internal.loadingState = we, l.remove(u), o.remove(u), c.delete(u);
    }))
      return this.isLoading || (this.isLoading = !0, this.dispatchEvent({ type: "tiles-load-start" })), n.setMemoryUsage(e, this.getBytesUsed(e)), this.cachedSinceLoadComplete.add(e), r.inCacheSinceLoad++, r.inCache++, r.queued++, e.internal.loadingState = Tt, c.add(e), o.add(e, (u) => {
        if (d.aborted)
          return Promise.resolve();
        e.internal.loadingState = Qt, r.downloading++, r.queued--;
        const p = this.invokeOnePlugin((g) => g.fetchData && g.fetchData(i, { ...this.fetchOptions, signal: d }));
        return this.dispatchEvent({
          type: "tile-download-start",
          tile: e,
          url: i,
          get uri() {
            return console.warn('tile-download-start event: "uri" has been renamed to "url".'), this.url;
          }
        }), p;
      }).then((u) => {
        if (!d.aborted)
          if (u instanceof Response) {
            if (u.ok)
              return A === "json" ? u.json() : u.arrayBuffer();
            throw new Error(`Failed to load model with error code ${u.status}`);
          } else return u;
      }).then((u) => {
        if (!d.aborted)
          return r.downloading--, r.parsing++, e.internal.loadingState = Rs, l.add(e, (p) => d.aborted ? Promise.resolve() : A === "json" && u.root ? (this.preprocessTileset(u, i, e), e.children.push(u.root), s = u, t = !0, Promise.resolve()) : this.invokeOnePlugin((g) => g.parseTile && g.parseTile(u, p, A, i, d)));
      }).then(() => {
        if (d.aborted)
          return;
        r.parsing--, r.loaded++, e.internal.loadingState = ve, c.delete(e), n.setLoaded(e, !0);
        const u = this.getBytesUsed(e);
        if (n.getMemoryUsage(e) === 0 && u > 0 && n.isFull()) {
          n.remove(e);
          return;
        }
        n.setMemoryUsage(e, u), this.dispatchEvent({ type: "needs-update" }), t && this.dispatchEvent({
          type: "load-tileset",
          tileset: s,
          url: i
        }), e.engineData.scene && this.dispatchEvent({
          type: "load-model",
          scene: e.engineData.scene,
          tile: e,
          url: i
        });
      }).catch((u) => {
        d.aborted || (u.name !== "AbortError" ? (l.remove(e), o.remove(e), e.internal.loadingState === Tt ? r.queued-- : e.internal.loadingState === Qt ? r.downloading-- : e.internal.loadingState === Rs ? r.parsing-- : e.internal.loadingState === ve && r.loaded--, r.failed++, console.error(`TilesRenderer : Failed to load tile at url "${e.content.uri}".`), console.error(u), e.internal.loadingState = gt, c.delete(e), n.setLoaded(e, !0), this.dispatchEvent({
          type: "load-error",
          tile: e,
          error: u,
          url: i
        })) : n.remove(e));
      });
  }
};
function Tn(a, e, t, s, i, r) {
  let n;
  switch (s) {
    case "SCALAR":
      n = 1;
      break;
    case "VEC2":
      n = 2;
      break;
    case "VEC3":
      n = 3;
      break;
    case "VEC4":
      n = 4;
      break;
    default:
      throw new Error(`FeatureTable : Feature type not provided for "${r}".`);
  }
  let o;
  const l = t * n;
  switch (i) {
    case "BYTE":
      o = new Int8Array(a, e, l);
      break;
    case "UNSIGNED_BYTE":
      o = new Uint8Array(a, e, l);
      break;
    case "SHORT":
      o = new Int16Array(a, e, l);
      break;
    case "UNSIGNED_SHORT":
      o = new Uint16Array(a, e, l);
      break;
    case "INT":
      o = new Int32Array(a, e, l);
      break;
    case "UNSIGNED_INT":
      o = new Uint32Array(a, e, l);
      break;
    case "FLOAT":
      o = new Float32Array(a, e, l);
      break;
    case "DOUBLE":
      o = new Float64Array(a, e, l);
      break;
    default:
      throw new Error(`FeatureTable : Feature component type not provided for "${r}".`);
  }
  return o;
}
let ps = class {
  /**
   * @param {ArrayBuffer} buffer
   * @param {number} start - Byte offset of the feature table within the buffer
   * @param {number} headerLength - Byte length of the JSON header
   * @param {number} binLength - Byte length of the binary body
   */
  constructor(e, t, s, i) {
    this.buffer = e, this.binOffset = t + s, this.binLength = i;
    let r = null;
    if (s !== 0) {
      const n = new Uint8Array(e, t, s);
      r = JSON.parse(ui(n));
    } else
      r = {};
    this.header = r;
  }
  /**
   * Returns all property key names defined in the feature table header, excluding `extensions`.
   * @returns {Array<string>}
   */
  getKeys() {
    return Object.keys(this.header).filter((e) => e !== "extensions");
  }
  /**
   * Returns the value for the given property key. For binary properties, reads typed array data
   * from the binary body using the provided count, component type, and vector type.
   * @param {string} key
   * @param {number} count - Number of elements to read for binary properties
   * @param {string | null} [defaultComponentType] - Fallback component type (e.g. `'FLOAT'`, `'UNSIGNED_SHORT'`)
   * @param {string | null} [defaultType] - Fallback vector type (e.g. `'SCALAR'`, `'VEC3'`)
   * @returns {number | string | ArrayBufferView | null}
   */
  getData(e, t, s = null, i = null) {
    const r = this.header;
    if (!(e in r))
      return null;
    const n = r[e];
    if (n instanceof Object) {
      if (Array.isArray(n))
        return n;
      {
        const { buffer: o, binOffset: l, binLength: c } = this, A = n.byteOffset || 0, h = n.type || i, d = n.componentType || s;
        if ("type" in n && i && n.type !== i)
          throw new Error("FeatureTable: Specified type does not match expected type.");
        const u = l + A, p = Tn(o, u, t, h, d, e);
        if (u + p.byteLength > l + c)
          throw new Error("FeatureTable: Feature data read outside binary body length.");
        return p;
      }
    } else return n;
  }
  /**
   * Returns a slice of the binary body at the given offset and length.
   * @param {number} byteOffset
   * @param {number} byteLength
   * @returns {ArrayBuffer}
   */
  getBuffer(e, t) {
    const { buffer: s, binOffset: i } = this;
    return s.slice(i + e, i + e + t);
  }
}, kl = class {
  constructor(e) {
    this.batchTable = e;
    const t = e.header.extensions["3DTILES_batch_table_hierarchy"];
    this.classes = t.classes;
    for (const i of this.classes) {
      const r = i.instances;
      for (const n in r)
        i.instances[n] = this._parseProperty(r[n], i.length, n);
    }
    if (this.instancesLength = t.instancesLength, this.classIds = this._parseProperty(t.classIds, this.instancesLength, "classIds"), t.parentCounts ? this.parentCounts = this._parseProperty(t.parentCounts, this.instancesLength, "parentCounts") : this.parentCounts = new Array(this.instancesLength).fill(1), t.parentIds) {
      const i = this.parentCounts.reduce((r, n) => r + n, 0);
      this.parentIds = this._parseProperty(t.parentIds, i, "parentIds");
    } else
      this.parentIds = null;
    this.instancesIds = [];
    const s = {};
    for (const i of this.classIds)
      s[i] = s[i] ?? 0, this.instancesIds.push(s[i]), s[i]++;
  }
  _parseProperty(e, t, s) {
    if (Array.isArray(e))
      return e;
    {
      const { buffer: i, binOffset: r } = this.batchTable, n = e.byteOffset, o = e.componentType || "UNSIGNED_SHORT", l = r + n;
      return Tn(i, l, t, "SCALAR", o, s);
    }
  }
  getDataFromId(e, t = {}) {
    const s = this.parentCounts[e];
    if (this.parentIds && s > 0) {
      let l = 0;
      for (let c = 0; c < e; c++)
        l += this.parentCounts[c];
      for (let c = 0; c < s; c++) {
        const A = this.parentIds[l + c];
        A !== e && this.getDataFromId(A, t);
      }
    }
    const i = this.classIds[e], r = this.classes[i].instances, n = this.classes[i].name, o = this.instancesIds[e];
    for (const l in r)
      t[n] = t[n] || {}, t[n][l] = r[l][o];
    return t;
  }
};
class bi extends ps {
  /**
   * @param {ArrayBuffer} buffer
   * @param {number} count - Number of features in the batch
   * @param {number} start - Byte offset of the batch table within the buffer
   * @param {number} headerLength - Byte length of the JSON header
   * @param {number} binLength - Byte length of the binary body
   */
  constructor(e, t, s, i, r) {
    super(e, s, i, r), this.count = t, this.extensions = {};
    const n = this.header.extensions;
    n && n["3DTILES_batch_table_hierarchy"] && (this.extensions["3DTILES_batch_table_hierarchy"] = new kl(this));
  }
  /**
   * Returns an object with all properties of the batch table and its extensions for the
   * given feature id. A `target` object can be specified to store the result. Throws if
   * `id` is out of bounds.
   * @param {number} id - Feature index (0 to count - 1)
   * @param {Object} [target={}] - Optional object to write properties into
   * @returns {Object}
   */
  getDataFromId(e, t = {}) {
    if (e < 0 || e >= this.count)
      throw new Error(`BatchTable: id value "${e}" out of bounds for "${this.count}" features number.`);
    for (const s of this.getKeys())
      t[s] = super.getData(s, this.count)[e];
    for (const s in this.extensions) {
      const i = this.extensions[s];
      i.getDataFromId instanceof Function && (t[s] = t[s] || {}, i.getDataFromId(e, t[s]));
    }
    return t;
  }
  /**
   * Returns the array of values for the given property key across all features. Returns
   * `null` if the key is not in the table.
   * @param {string} key
   * @returns {Array | TypedArray | null}
   */
  getPropertyArray(e) {
    return super.getData(e, this.count);
  }
}
let Pl = class extends wt {
  /**
   * Parses a B3DM buffer and returns the raw tile data.
   * @param {ArrayBuffer} buffer
   * @returns {{ version: string, featureTable: FeatureTable, batchTable: BatchTable, glbBytes: Uint8Array }}
   */
  parse(e) {
    const t = new DataView(e), s = Pe(t);
    console.assert(s === "b3dm");
    const i = t.getUint32(4, !0);
    console.assert(i === 1);
    const r = t.getUint32(8, !0);
    console.assert(r === e.byteLength);
    const n = t.getUint32(12, !0), o = t.getUint32(16, !0), l = t.getUint32(20, !0), c = t.getUint32(24, !0), A = 28, h = e.slice(
      A,
      A + n + o
    ), d = new ps(
      h,
      0,
      n,
      o
    ), u = A + n + o, p = e.slice(
      u,
      u + l + c
    ), g = new bi(
      p,
      d.getData("BATCH_LENGTH"),
      0,
      l,
      c
    ), b = u + l + c, C = new Uint8Array(e, b, r - b);
    return {
      version: i,
      featureTable: d,
      batchTable: g,
      glbBytes: C
    };
  }
}, _l = class extends wt {
  /**
   * Parses an I3DM buffer and returns the raw tile data.
   * @param {ArrayBuffer} buffer
   * @returns {Promise<{ version: string, featureTable: FeatureTable, batchTable: BatchTable, glbBytes: Uint8Array, gltfWorkingPath: string }>}
   */
  parse(e) {
    const t = new DataView(e), s = Pe(t);
    console.assert(s === "i3dm");
    const i = t.getUint32(4, !0);
    console.assert(i === 1);
    const r = t.getUint32(8, !0);
    console.assert(r === e.byteLength);
    const n = t.getUint32(12, !0), o = t.getUint32(16, !0), l = t.getUint32(20, !0), c = t.getUint32(24, !0), A = t.getUint32(28, !0), h = 32, d = e.slice(
      h,
      h + n + o
    ), u = new ps(
      d,
      0,
      n,
      o
    ), p = h + n + o, g = e.slice(
      p,
      p + l + c
    ), b = new bi(
      g,
      u.getData("INSTANCES_LENGTH"),
      0,
      l,
      c
    ), C = p + l + c, y = new Uint8Array(e, C, r - C);
    let E = null, m = null, I = null;
    if (A)
      E = y, m = Promise.resolve();
    else {
      const B = this.resolveExternalURL(ui(y));
      I = pi(B), m = fetch(B, this.fetchOptions).then((w) => {
        if (!w.ok)
          throw new Error(`I3DMLoaderBase : Failed to load file "${B}" with status ${w.status} : ${w.statusText}`);
        return w.arrayBuffer();
      }).then((w) => {
        E = new Uint8Array(w);
      });
    }
    return m.then(() => ({
      version: i,
      featureTable: u,
      batchTable: b,
      glbBytes: E,
      gltfWorkingPath: I
    }));
  }
}, Ul = class extends wt {
  /**
   * Parses a PNTS buffer and returns the raw tile data.
   * @param {ArrayBuffer} buffer
   * @returns {Promise<{ version: string, featureTable: FeatureTable, batchTable: BatchTable }>}
   */
  parse(e) {
    const t = new DataView(e), s = Pe(t);
    console.assert(s === "pnts");
    const i = t.getUint32(4, !0);
    console.assert(i === 1);
    const r = t.getUint32(8, !0);
    console.assert(r === e.byteLength);
    const n = t.getUint32(12, !0), o = t.getUint32(16, !0), l = t.getUint32(20, !0), c = t.getUint32(24, !0), A = 28, h = e.slice(
      A,
      A + n + o
    ), d = new ps(
      h,
      0,
      n,
      o
    ), u = A + n + o, p = e.slice(
      u,
      u + l + c
    ), g = new bi(
      p,
      d.getData("BATCH_LENGTH") || d.getData("POINTS_LENGTH"),
      0,
      l,
      c
    );
    return Promise.resolve({
      version: i,
      featureTable: d,
      batchTable: g
    });
  }
};
class Gl extends wt {
  /**
   * Parses a CMPT buffer and returns an object containing each inner tile's type and raw buffer.
   * @param {ArrayBuffer} buffer
   * @returns {{ version: string, tiles: Array<{ type: string, buffer: Uint8Array, version: number }> }}
   */
  parse(e) {
    const t = new DataView(e), s = Pe(t);
    console.assert(s === "cmpt", 'CMPTLoader: The magic bytes equal "cmpt".');
    const i = t.getUint32(4, !0);
    console.assert(i === 1, 'CMPTLoader: The version listed in the header is "1".');
    const r = t.getUint32(8, !0);
    console.assert(r === e.byteLength, "CMPTLoader: The contents buffer length listed in the header matches the file.");
    const n = t.getUint32(12, !0), o = [];
    let l = 16;
    for (let c = 0; c < n; c++) {
      const A = new DataView(e, l, 12), h = Pe(A), d = A.getUint32(4, !0), u = A.getUint32(8, !0), p = new Uint8Array(e, l, u);
      o.push({
        type: h,
        buffer: p,
        version: d
      }), l += u;
    }
    return {
      version: i,
      tiles: o
    };
  }
}
function Nl(a) {
  const { x: e, y: t, z: s } = a;
  a.x = s, a.y = e, a.z = t;
}
function Vl(a) {
  return -a + Math.PI / 2;
}
const Yi = /* @__PURE__ */ new zs(), Se = /* @__PURE__ */ new x(), J = /* @__PURE__ */ new x(), Ds = /* @__PURE__ */ new x(), se = /* @__PURE__ */ new U(), le = /* @__PURE__ */ new U(), Ls = /* @__PURE__ */ new Et(), Z = /* @__PURE__ */ new To(), Ji = /* @__PURE__ */ new x(), Wi = /* @__PURE__ */ new x(), Xi = /* @__PURE__ */ new x(), ot = /* @__PURE__ */ new x(), Dt = /* @__PURE__ */ new ss(), Ol = 1e-12, Hl = 0.1, ql = 0, Zi = 1, Lt = 2;
class Qn {
  constructor(e = 1, t = 1, s = 1) {
    this.name = "", this.radius = new x(e, t, s);
  }
  /**
   * Returns the point where the given ray intersects the ellipsoid surface, or null if no
   * intersection exists. Writes the result into `target`.
   * @param {Ray} ray
   * @param {Vector3} target
   * @returns {Vector3|null}
   */
  intersectRay(e, t) {
    return se.makeScale(...this.radius).invert(), Ls.center.set(0, 0, 0), Ls.radius = 1, Dt.copy(e).applyMatrix4(se), Dt.intersectSphere(Ls, t) ? (se.makeScale(...this.radius), t.applyMatrix4(se), t) : null;
  }
  /**
   * Returns a Matrix4 representing the East-North-Up (ENU) frame at the given geographic
   * position: X points east, Y points north, Z points up. Writes the result into `target`.
   * @param {number} lat Latitude in radians.
   * @param {number} lon Longitude in radians.
   * @param {number} height Height above the ellipsoid surface in meters.
   * @param {Matrix4} target
   * @returns {Matrix4}
   */
  getEastNorthUpFrame(e, t, s, i) {
    return s.isMatrix4 && (i = s, s = 0, console.warn('Ellipsoid: The signature for "getEastNorthUpFrame" has changed.')), this.getEastNorthUpAxes(e, t, Ji, Wi, Xi), this.getCartographicToPosition(e, t, s, ot), i.makeBasis(Ji, Wi, Xi).setPosition(ot);
  }
  /**
   * Returns a Matrix4 representing the ENU frame at the given position, rotated by the given
   * azimuth, elevation, and roll. Equivalent to `getObjectFrame` with `ENU_FRAME`.
   * @param {number} lat Latitude in radians.
   * @param {number} lon Longitude in radians.
   * @param {number} height Height above the ellipsoid surface in meters.
   * @param {number} az Azimuth in radians, measured from true north towards east.
   * @param {number} el Elevation in radians, measured from the horizon upward.
   * @param {number} roll Roll in radians around the north axis.
   * @param {Matrix4} target
   * @returns {Matrix4}
   */
  getOrientedEastNorthUpFrame(e, t, s, i, r, n, o) {
    return this.getObjectFrame(e, t, s, i, r, n, o, ql);
  }
  /**
   * Returns a Matrix4 representing a frame at the given geographic position, rotated by the
   * given azimuth, elevation, and roll, and adjusted to match the three.js `frame` convention.
   * `OBJECT_FRAME` orients with "+Y" up and "+Z" forward; `CAMERA_FRAME` orients with "+Y" up
   * and "-Z" forward; `ENU_FRAME` returns the raw ENU-relative rotation.
   * @param {number} lat Latitude in radians.
   * @param {number} lon Longitude in radians.
   * @param {number} height Height above the ellipsoid surface in meters.
   * @param {number} az Azimuth in radians, measured from true north towards east.
   * @param {number} el Elevation in radians, measured from the horizon upward.
   * @param {number} roll Roll in radians around the north axis.
   * @param {Matrix4} target
   * @param {Frames} [frame=OBJECT_FRAME]
   * @returns {Matrix4}
   */
  getObjectFrame(e, t, s, i, r, n, o, l = Lt) {
    return this.getEastNorthUpFrame(e, t, s, se), Z.set(r, n, -i, "ZXY"), o.makeRotationFromEuler(Z).premultiply(se), l === Zi ? (Z.set(Math.PI / 2, 0, 0, "XYZ"), le.makeRotationFromEuler(Z), o.multiply(le)) : l === Lt && (Z.set(-Math.PI / 2, 0, Math.PI, "XYZ"), le.makeRotationFromEuler(Z), o.multiply(le)), o;
  }
  /**
   * Extracts geographic position and orientation (lat, lon, height, azimuth, elevation, roll)
   * from the given object/camera frame matrix. The inverse of `getObjectFrame`. Writes the
   * result into `target` and returns it.
   * @param {Matrix4} matrix
   * @param {Object} target
   * @param {Frames} [frame=OBJECT_FRAME]
   * @returns {{ lat: number, lon: number, height: number, azimuth: number, elevation: number, roll: number }}
   */
  getCartographicFromObjectFrame(e, t, s = Lt) {
    return s === Zi ? (Z.set(-Math.PI / 2, 0, 0, "XYZ"), le.makeRotationFromEuler(Z).premultiply(e)) : s === Lt ? (Z.set(-Math.PI / 2, 0, Math.PI, "XYZ"), le.makeRotationFromEuler(Z).premultiply(e)) : le.copy(e), ot.setFromMatrixPosition(le), this.getPositionToCartographic(ot, t), this.getEastNorthUpFrame(t.lat, t.lon, 0, se).invert(), le.premultiply(se), Z.setFromRotationMatrix(le, "ZXY"), t.azimuth = -Z.z, t.elevation = Z.x, t.roll = Z.y, t;
  }
  /**
   * Fills in the east, north, and up unit vectors for the ENU frame at the given latitude and
   * longitude. Optionally writes the surface position into `point`.
   * @param {number} lat Latitude in radians.
   * @param {number} lon Longitude in radians.
   * @param {Vector3} vecEast
   * @param {Vector3} vecNorth
   * @param {Vector3} vecUp
   * @param {Vector3} [point]
   */
  getEastNorthUpAxes(e, t, s, i, r, n = ot) {
    this.getCartographicToPosition(e, t, 0, n), this.getCartographicToNormal(e, t, r), s.set(-n.y, n.x, 0).normalize(), i.crossVectors(r, s).normalize();
  }
  /**
   * Converts geographic coordinates to a 3D Cartesian position on the ellipsoid surface
   * (plus the given height offset). Writes the result into `target` and returns it.
   * @param {number} lat Latitude in radians.
   * @param {number} lon Longitude in radians.
   * @param {number} height Height above the ellipsoid surface in meters.
   * @param {Vector3} target
   * @returns {Vector3}
   */
  getCartographicToPosition(e, t, s, i) {
    this.getCartographicToNormal(e, t, Se);
    const r = this.radius;
    J.copy(Se), J.x *= r.x ** 2, J.y *= r.y ** 2, J.z *= r.z ** 2;
    const n = Math.sqrt(Se.dot(J));
    return J.divideScalar(n), i.copy(J).addScaledVector(Se, s);
  }
  /**
   * Converts a 3D Cartesian position to geographic coordinates (lat, lon, height). Writes the
   * result into `target` and returns it.
   * @param {Vector3} pos
   * @param {Object} target
   * @returns {{ lat: number, lon: number, height: number }}
   */
  getPositionToCartographic(e, t) {
    this.getPositionToSurfacePoint(e, J), this.getPositionToNormal(J, Se);
    const s = Ds.subVectors(e, J);
    return t.lon = Math.atan2(Se.y, Se.x), t.lat = Math.asin(Se.z), t.height = Math.sign(s.dot(e)) * s.length(), t;
  }
  /**
   * Returns the surface normal of the ellipsoid at the given latitude and longitude. Writes the
   * result into `target` and returns it.
   * @param {number} lat Latitude in radians.
   * @param {number} lon Longitude in radians.
   * @param {Vector3} target
   * @returns {Vector3}
   */
  getCartographicToNormal(e, t, s) {
    return Yi.set(1, Vl(e), t), s.setFromSpherical(Yi).normalize(), Nl(s), s;
  }
  /**
   * Returns the surface normal of the ellipsoid at the given 3D Cartesian position. Writes the
   * result into `target` and returns it.
   * @param {Vector3} pos
   * @param {Vector3} target
   * @returns {Vector3}
   */
  getPositionToNormal(e, t) {
    const s = this.radius;
    return t.copy(e), t.x /= s.x ** 2, t.y /= s.y ** 2, t.z /= s.z ** 2, t.normalize(), t;
  }
  /**
   * Projects the given 3D position onto the ellipsoid surface along the geodetic normal.
   * Returns null if the position is at or near the center. Writes the result into `target`.
   * @param {Vector3} pos
   * @param {Vector3} target
   * @returns {Vector3|null}
   */
  getPositionToSurfacePoint(e, t) {
    const s = this.radius, i = 1 / s.x ** 2, r = 1 / s.y ** 2, n = 1 / s.z ** 2, o = e.x * e.x * i, l = e.y * e.y * r, c = e.z * e.z * n, A = o + l + c, h = Math.sqrt(1 / A), d = J.copy(e).multiplyScalar(h);
    if (A < Hl)
      return isFinite(h) ? t.copy(d) : null;
    const u = Ds.set(
      d.x * i * 2,
      d.y * r * 2,
      d.z * n * 2
    );
    let p = (1 - h) * e.length() / (0.5 * u.length()), g = 0, b, C, y, E, m, I, B, w, v, M, S;
    do {
      p -= g, y = 1 / (1 + p * i), E = 1 / (1 + p * r), m = 1 / (1 + p * n), I = y * y, B = E * E, w = m * m, v = I * y, M = B * E, S = w * m, b = o * I + l * B + c * w - 1, C = o * v * i + l * M * r + c * S * n;
      const T = -2 * C;
      g = b / T;
    } while (Math.abs(b) > Ol);
    return t.set(
      e.x * y,
      e.y * E,
      e.z * m
    );
  }
  /**
   * Returns the geometric distance to the horizon from the given latitude and elevation above
   * the ellipsoid surface.
   * @param {number} latitude Latitude in degrees.
   * @param {number} elevation Height above the ellipsoid surface in meters.
   * @returns {number}
   */
  calculateHorizonDistance(e, t) {
    const s = this.calculateEffectiveRadius(e);
    return Math.sqrt(2 * s * t + t ** 2);
  }
  /**
   * Returns the prime vertical radius of curvature (distance from the center of the ellipsoid
   * to the surface along the normal) at the given latitude.
   * @param {number} latitude Latitude in degrees.
   * @returns {number}
   */
  calculateEffectiveRadius(e) {
    const t = this.radius.x, s = 1 - this.radius.z ** 2 / t ** 2, i = e * et.DEG2RAD, r = Math.sin(i) ** 2;
    return t / Math.sqrt(1 - s * r);
  }
  /**
   * Returns the height of the given 3D position above (or below) the ellipsoid surface.
   * @param {Vector3} pos
   * @returns {number}
   */
  getPositionElevation(e) {
    this.getPositionToSurfacePoint(e, J);
    const t = Ds.subVectors(e, J);
    return Math.sign(t.dot(e)) * t.length();
  }
  /**
   * Returns an estimate of the closest point on the ellipsoid surface to the given ray.
   * Returns the exact surface intersection point if the ray intersects the ellipsoid.
   * @param {Ray} ray
   * @param {Vector3} target
   * @returns {Vector3}
   */
  closestPointToRayEstimate(e, t) {
    return this.intersectRay(e, t) ? t : (se.makeScale(...this.radius).invert(), Dt.copy(e).applyMatrix4(se), J.set(0, 0, 0), Dt.closestPointToPoint(J, t).normalize(), se.makeScale(...this.radius), t.applyMatrix4(se));
  }
  /**
   * Copies the radius from the given ellipsoid into this one.
   * @param {Ellipsoid} source
   * @returns {this}
   */
  copy(e) {
    return this.radius.copy(e.radius), this;
  }
  /**
   * Returns a new Ellipsoid with the same radius as this one.
   * @returns {Ellipsoid}
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
const gs = new Qn(zi, zi, vl);
gs.name = "WGS84 Earth";
const Ft = /* @__PURE__ */ new x(), kt = /* @__PURE__ */ new x(), $ = /* @__PURE__ */ new x(), Pt = /* @__PURE__ */ new ss();
let $i = class {
  constructor(e = new tt(), t = new U()) {
    this.box = e.clone(), this.transform = t.clone(), this.inverseTransform = new U(), this.points = new Array(8).fill().map(() => new x()), this.planes = new Array(6).fill().map(() => new Gr());
  }
  copy(e) {
    return this.box.copy(e.box), this.transform.copy(e.transform), this.update(), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Clamps the given point within the bounds of this OBB
   * @param {Vector3} point
   * @param {Vector3} result
   * @returns {Vector3}
   */
  clampPoint(e, t) {
    return t.copy(e).applyMatrix4(this.inverseTransform).clamp(this.box.min, this.box.max).applyMatrix4(this.transform);
  }
  /**
   * Returns the distance from any edge of this OBB to the specified point.
   * If the point lies inside of this box, the distance will be 0.
   * @param {Vector3} point
   * @returns {number}
   */
  distanceToPoint(e) {
    return this.clampPoint(e, $).distanceTo(e);
  }
  containsPoint(e) {
    return $.copy(e).applyMatrix4(this.inverseTransform), this.box.containsPoint($);
  }
  // returns boolean indicating whether the ray has intersected the obb
  intersectsRay(e) {
    return Pt.copy(e).applyMatrix4(this.inverseTransform), Pt.intersectsBox(this.box);
  }
  // Sets "target" equal to the intersection point.
  // Returns "null" if no intersection found.
  intersectRay(e, t) {
    return Pt.copy(e).applyMatrix4(this.inverseTransform), Pt.intersectBox(this.box, t) ? (t.applyMatrix4(this.transform), t) : null;
  }
  update() {
    const { points: e, inverseTransform: t, transform: s, box: i } = this;
    t.copy(s).invert();
    const { min: r, max: n } = i;
    let o = 0;
    for (let l = -1; l <= 1; l += 2)
      for (let c = -1; c <= 1; c += 2)
        for (let A = -1; A <= 1; A += 2)
          e[o].set(
            l < 0 ? r.x : n.x,
            c < 0 ? r.y : n.y,
            A < 0 ? r.z : n.z
          ).applyMatrix4(s), o++;
    this.updatePlanes();
  }
  updatePlanes() {
    Ft.copy(this.box.min).applyMatrix4(this.transform), kt.copy(this.box.max).applyMatrix4(this.transform), $.set(0, 0, 1).transformDirection(this.transform), this.planes[0].setFromNormalAndCoplanarPoint($, Ft), this.planes[1].setFromNormalAndCoplanarPoint($, kt).negate(), $.set(0, 1, 0).transformDirection(this.transform), this.planes[2].setFromNormalAndCoplanarPoint($, Ft), this.planes[3].setFromNormalAndCoplanarPoint($, kt).negate(), $.set(1, 0, 0).transformDirection(this.transform), this.planes[4].setFromNormalAndCoplanarPoint($, Ft), this.planes[5].setFromNormalAndCoplanarPoint($, kt).negate();
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, $), $.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsFrustum(e) {
    return this._intersectsPlaneShape(e.planes, e.points);
  }
  intersectsOBB(e) {
    return this._intersectsPlaneShape(e.planes, e.points);
  }
  // takes a series of 6 planes that define and enclosed shape and the 8 points that lie at the corners
  // of that shape to determine whether the OBB is intersected with.
  _intersectsPlaneShape(e, t) {
    const s = this.points, i = this.planes;
    for (let r = 0; r < 6; r++) {
      const n = e[r];
      let o = -1 / 0;
      for (let l = 0; l < 8; l++) {
        const c = s[l], A = n.distanceToPoint(c);
        o = o < A ? A : o;
      }
      if (o < 0)
        return !1;
    }
    for (let r = 0; r < 6; r++) {
      const n = i[r];
      let o = -1 / 0;
      for (let l = 0; l < 8; l++) {
        const c = t[l], A = n.distanceToPoint(c);
        o = o < A ? A : o;
      }
      if (o < 0)
        return !1;
    }
    return !0;
  }
};
const Fs = 1e-13, ft = Math.PI, ks = ft / 2, at = /* @__PURE__ */ new x(), Re = /* @__PURE__ */ new x(), ne = /* @__PURE__ */ new x(), R = /* @__PURE__ */ new x(), W = /* @__PURE__ */ new U(), zl = /* @__PURE__ */ new tt(), er = /* @__PURE__ */ new U();
function Me(a, e) {
  e.radius = Math.max(e.radius, a.distanceToSquared(e.center));
}
function tr(a) {
  return a.x !== a.y;
}
class jl extends Qn {
  constructor(e = 1, t = 1, s = 1, i = -ks, r = ks, n = 0, o = 2 * ft, l = 0, c = 0) {
    super(e, t, s), this.latStart = i, this.latEnd = r, this.lonStart = n, this.lonEnd = o, this.heightStart = l, this.heightEnd = c;
  }
  /**
   * Computes an oriented bounding box for this region. Writes the box extents into `box` and
   * the orientation frame into `matrix`.
   * @param {Box3} box
   * @param {Matrix4} matrix
   */
  getBoundingBox(e, t) {
    tr(this.radius) && console.warn("EllipsoidRegion: Triaxial ellipsoids are not supported.");
    const {
      latStart: s,
      latEnd: i,
      lonStart: r,
      lonEnd: n,
      heightStart: o,
      heightEnd: l
    } = this, c = (s + i) * 0.5, A = (r + n) * 0.5, h = s > 0, d = i < 0;
    let u;
    h ? u = s : d ? u = i : u = 0;
    const { min: p, max: g } = e;
    p.setScalar(1 / 0), g.setScalar(-1 / 0), n - r <= ft ? (this.getCartographicToNormal(c, A, ne), Re.set(0, 0, 1), at.crossVectors(Re, ne).normalize(), Re.crossVectors(ne, at).normalize(), t.makeBasis(at, Re, ne), W.copy(t).invert(), this.getCartographicToPosition(u, r, l, R).applyMatrix4(W), g.x = Math.abs(R.x), p.x = -g.x, this.getCartographicToPosition(i, r, l, R).applyMatrix4(W), g.y = R.y, this.getCartographicToPosition(i, A, l, R).applyMatrix4(W), g.y = Math.max(R.y, g.y), this.getCartographicToPosition(s, r, l, R).applyMatrix4(W), p.y = R.y, this.getCartographicToPosition(s, A, l, R).applyMatrix4(W), p.y = Math.min(R.y, p.y), this.getCartographicToPosition(c, A, l, R).applyMatrix4(W), g.z = R.z, this.getCartographicToPosition(s, r, o, R).applyMatrix4(W), p.z = R.z, this.getCartographicToPosition(i, r, o, R).applyMatrix4(W), p.z = Math.min(R.z, p.z)) : (this.getCartographicToPosition(u, A, l, ne), ne.z = 0, ne.length() < 1e-10 ? ne.set(1, 0, 0) : ne.normalize(), Re.set(0, 0, 1), at.crossVectors(ne, Re).normalize(), t.makeBasis(at, Re, ne), W.copy(t).invert(), this.getCartographicToPosition(u, A + ks, l, R).applyMatrix4(W), g.x = Math.abs(R.x), p.x = -g.x, this.getCartographicToPosition(i, 0, d ? o : l, R).applyMatrix4(W), g.y = R.y, this.getCartographicToPosition(s, 0, h ? o : l, R).applyMatrix4(W), p.y = R.y, this.getCartographicToPosition(u, A, l, R).applyMatrix4(W), g.z = R.z, this.getCartographicToPosition(u, n, l, R).applyMatrix4(W), p.z = R.z), e.getCenter(R), e.min.sub(R).multiplyScalar(1 + Fs), e.max.sub(R).multiplyScalar(1 + Fs), R.applyMatrix4(t), t.setPosition(R);
  }
  /**
   * Computes a bounding sphere for this region. Writes the result into `sphere`.
   * @param {Sphere} sphere
   */
  getBoundingSphere(e) {
    tr(this.radius) && console.warn("EllipsoidRegion: Triaxial ellipsoids are not supported."), this.getBoundingBox(zl, er), e.center.setFromMatrixPosition(er), e.radius = 0;
    const {
      latStart: t,
      latEnd: s,
      lonStart: i,
      lonEnd: r,
      heightStart: n,
      heightEnd: o
    } = this, l = (t + s) * 0.5, c = (i + r) * 0.5, A = t > 0, h = s < 0;
    let d;
    A ? d = t : h ? d = s : d = 0, this.getCartographicToPosition(d, i, o, R), Me(R, e), this.getCartographicToPosition(s, i, o, R), Me(R, e), this.getCartographicToPosition(s, c, o, R), Me(R, e), this.getCartographicToPosition(t, i, o, R), Me(R, e), this.getCartographicToPosition(t, c, o, R), Me(R, e), this.getCartographicToPosition(l, c, o, R), Me(R, e), this.getCartographicToPosition(t, i, n, R), Me(R, e), r - i > ft && (this.getCartographicToPosition(d, c + ft, o, R), Me(R, e)), e.radius = Math.sqrt(e.radius) * (1 + Fs);
  }
}
const ri = 0;
function sr(a, e, t, s) {
  try {
    return Qo.getByteLength(a, e, t, s);
  } catch {
    return ri;
  }
}
function Kl(a) {
  var e, t;
  if (!a)
    return 0;
  if (a.isExternalTexture)
    return ((e = a.userData) == null ? void 0 : e.byteLength) ?? ri;
  const { format: s, type: i, image: r, mipmaps: n } = a;
  if (a.isCompressedTexture && Array.isArray(n) && n.length > 0) {
    let l = 0;
    for (const c of n)
      (t = c?.data) != null && t.byteLength ? l += c.data.byteLength : l += sr(c.width, c.height, s, i);
    return l;
  }
  if (!r)
    return ri;
  let o = sr(r.width, r.height, s, i);
  return o *= a.generateMipmaps ? 4 / 3 : 1, o;
}
function Yl(a) {
  const e = /* @__PURE__ */ new Set();
  let t = 0;
  return a.traverse((s) => {
    if (s.geometry && !e.has(s.geometry) && (t += oa(s.geometry), e.add(s.geometry)), s.material) {
      const i = s.material;
      for (const r in i) {
        const n = i[r];
        n && n.isTexture && !e.has(n) && (t += Kl(n), e.add(n));
      }
    }
  }), t;
}
class Rn extends Pl {
  constructor(e = as) {
    super(), this.manager = e, this.adjustmentTransform = new U();
  }
  /**
   * Parses a b3dm buffer and resolves to a GLTF result object extended with legacy
   * tile metadata. Both `model` and `model.scene` receive the extra fields.
   * @param {ArrayBuffer} buffer
   * @returns {Promise<{ scene: Group, scenes: Array, batchTable: BatchTable, featureTable: FeatureTable }>}
   */
  parse(e) {
    const t = super.parse(e), s = t.glbBytes.slice().buffer;
    return new Promise((i, r) => {
      const n = this.manager, o = this.fetchOptions, l = n.getHandler("path.gltf") || new Ge(n);
      o.credentials === "include" && o.mode === "cors" && l.setCrossOrigin("use-credentials"), "credentials" in o && l.setWithCredentials(o.credentials === "include"), o.headers && l.setRequestHeader(o.headers);
      let c = this.workingPath;
      !/[\\/]$/.test(c) && c.length && (c += "/");
      const A = this.adjustmentTransform;
      l.parse(s, c, (h) => {
        const { batchTable: d, featureTable: u } = t, { scene: p } = h, g = u.getData("RTC_CENTER", 1, "FLOAT", "VEC3");
        g && (p.position.x += g[0], p.position.y += g[1], p.position.z += g[2]), h.scene.updateMatrix(), h.scene.matrix.multiply(A), h.scene.matrix.decompose(h.scene.position, h.scene.quaternion, h.scene.scale), h.batchTable = d, h.featureTable = u, p.batchTable = d, p.featureTable = u, i(h);
      }, r);
    });
  }
}
function Jl(a) {
  const e = a >> 11, t = a >> 5 & 63, s = a & 31, i = Math.round(e / 31 * 255), r = Math.round(t / 63 * 255), n = Math.round(s / 31 * 255);
  return [i, r, n];
}
const lt = /* @__PURE__ */ new k();
function Wl(a, e, t = new x()) {
  lt.set(a, e).divideScalar(256).multiplyScalar(2).subScalar(1), t.set(lt.x, lt.y, 1 - Math.abs(lt.x) - Math.abs(lt.y));
  const s = et.clamp(-t.z, 0, 1);
  return t.x >= 0 ? t.setX(t.x - s) : t.setX(t.x + s), t.y >= 0 ? t.setY(t.y - s) : t.setY(t.y + s), t.normalize(), t;
}
const ir = {
  RGB: "color",
  POSITION: "position"
};
class Dn extends Ul {
  constructor(e = as) {
    super(), this.manager = e;
  }
  /**
   * Parses a pnts buffer and resolves to a result object containing a constructed
   * three.js `Points` scene with metadata attached.
   * @param {ArrayBuffer} buffer
   * @returns {Promise<{ scene: Points, batchTable: BatchTable, featureTable: FeatureTable }>}
   */
  parse(e) {
    return super.parse(e).then(async (t) => {
      const { featureTable: s, batchTable: i } = t, r = new Or(), n = s.header.extensions, o = new x();
      let l;
      if (n && n["3DTILES_draco_point_compression"]) {
        const { byteOffset: h, byteLength: d, properties: u } = n["3DTILES_draco_point_compression"], p = this.manager.getHandler("draco.drc");
        if (p == null)
          throw new Error("PNTSLoader: dracoLoader not available.");
        const g = {};
        for (const y in u)
          if (y in ir && y in u) {
            const E = ir[y];
            g[E] = u[y];
          }
        const b = {
          attributeIDs: g,
          attributeTypes: {
            position: "Float32Array",
            color: "Uint8Array"
          },
          useUniqueIDs: !0
        }, C = s.getBuffer(h, d);
        l = await p.decodeGeometry(C, b), l.attributes.color && (r.vertexColors = !0);
      } else {
        const h = s.getData("POINTS_LENGTH"), d = s.getData("POSITION", h, "FLOAT", "VEC3"), u = s.getData("NORMAL", h, "FLOAT", "VEC3"), p = s.getData("NORMAL", h, "UNSIGNED_BYTE", "VEC2"), g = s.getData("RGB", h, "UNSIGNED_BYTE", "VEC3"), b = s.getData("RGBA", h, "UNSIGNED_BYTE", "VEC4"), C = s.getData("RGB565", h, "UNSIGNED_SHORT", "SCALAR"), y = s.getData("CONSTANT_RGBA", h, "UNSIGNED_BYTE", "VEC4"), E = s.getData("POSITION_QUANTIZED", h, "UNSIGNED_SHORT", "VEC3"), m = s.getData("QUANTIZED_VOLUME_SCALE", h, "FLOAT", "VEC3"), I = s.getData("QUANTIZED_VOLUME_OFFSET", h, "FLOAT", "VEC3");
        if (l = new ns(), E) {
          const B = new Float32Array(h * 3);
          for (let w = 0; w < h; w++)
            for (let v = 0; v < 3; v++) {
              const M = 3 * w + v;
              B[M] = E[M] / 65535 * m[v];
            }
          o.x = I[0], o.y = I[1], o.z = I[2], l.setAttribute("position", new re(B, 3, !1));
        } else
          l.setAttribute("position", new re(d, 3, !1));
        if (u !== null)
          l.setAttribute("normal", new re(u, 3, !1));
        else if (p !== null) {
          const B = new Float32Array(h * 3), w = new x();
          for (let v = 0; v < h; v++) {
            const M = p[v * 2], S = p[v * 2 + 1], T = Wl(M, S, w);
            B[v * 3] = T.x, B[v * 3 + 1] = T.y, B[v * 3 + 2] = T.z;
          }
          l.setAttribute("normal", new re(B, 3, !1));
        }
        if (b !== null)
          l.setAttribute("color", new re(b, 4, !0)), r.vertexColors = !0, r.transparent = !0, r.depthWrite = !1;
        else if (g !== null)
          l.setAttribute("color", new re(g, 3, !0)), r.vertexColors = !0;
        else if (C !== null) {
          const B = new Uint8Array(h * 3);
          for (let w = 0; w < h; w++) {
            const v = Jl(C[w]);
            for (let M = 0; M < 3; M++) {
              const S = 3 * w + M;
              B[S] = v[M];
            }
          }
          l.setAttribute("color", new re(B, 3, !0)), r.vertexColors = !0;
        } else if (y !== null) {
          const B = new ye(y[0], y[1], y[2]);
          r.color = B;
          const w = y[3] / 255;
          w < 1 && (r.opacity = w, r.transparent = !0, r.depthWrite = !1);
        }
      }
      const c = new Hr(l, r);
      c.position.copy(o), t.scene = c, t.scene.featureTable = s, t.scene.batchTable = i;
      const A = s.getData("RTC_CENTER", 1, "FLOAT", "VEC3");
      return A && (t.scene.position.x += A[0], t.scene.position.y += A[1], t.scene.position.z += A[2]), t;
    });
  }
}
const _t = /* @__PURE__ */ new x(), He = /* @__PURE__ */ new x(), qe = /* @__PURE__ */ new x(), Ps = /* @__PURE__ */ new x(), Ut = /* @__PURE__ */ new Ze(), Gt = /* @__PURE__ */ new x(), ze = /* @__PURE__ */ new U(), rr = /* @__PURE__ */ new U(), nr = /* @__PURE__ */ new x(), or = /* @__PURE__ */ new U(), _s = /* @__PURE__ */ new Ze(), Us = {};
function ar(a, e, t, s) {
  if (a = a / t * 2 - 1, e = e / t * 2 - 1, s.x = a, s.y = e, s.z = 1 - Math.abs(a) - Math.abs(e), s.z < 0) {
    const i = s.x;
    s.x = (1 - Math.abs(s.y)) * (i >= 0 ? 1 : -1), s.y = (1 - Math.abs(i)) * (s.y >= 0 ? 1 : -1);
  }
  return s.normalize(), s;
}
class Ln extends _l {
  constructor(e = as) {
    super(), this.manager = e, this.adjustmentTransform = new U(), this.ellipsoid = gs.clone();
  }
  resolveExternalURL(e) {
    return this.manager.resolveURL(super.resolveExternalURL(e));
  }
  /**
   * Parses an i3dm buffer and resolves to a GLTF result object where the scene's
   * meshes have been replaced with `InstancedMesh` objects (one per GLTF mesh), with
   * metadata attached to both `model` and `model.scene`.
   * @param {ArrayBuffer} buffer
   * @returns {Promise<{ scene: Group, batchTable: BatchTable, featureTable: FeatureTable }>}
   */
  parse(e) {
    return super.parse(e).then((t) => {
      const { featureTable: s, batchTable: i } = t, r = t.glbBytes.slice().buffer;
      return new Promise((n, o) => {
        const l = this.fetchOptions, c = this.manager, A = c.getHandler("path.gltf") || new Ge(c);
        l.credentials === "include" && l.mode === "cors" && A.setCrossOrigin("use-credentials"), "credentials" in l && A.setWithCredentials(l.credentials === "include"), l.headers && A.setRequestHeader(l.headers);
        let h = t.gltfWorkingPath ?? this.workingPath;
        /[\\/]$/.test(h) || (h += "/");
        const d = this.adjustmentTransform;
        A.parse(r, h, (u) => {
          const p = s.getData("INSTANCES_LENGTH");
          let g = s.getData("POSITION", p, "FLOAT", "VEC3");
          const b = s.getData("POSITION_QUANTIZED", p, "UNSIGNED_SHORT", "VEC3"), C = s.getData("QUANTIZED_VOLUME_OFFSET", 1, "FLOAT", "VEC3"), y = s.getData("QUANTIZED_VOLUME_SCALE", 1, "FLOAT", "VEC3"), E = s.getData("NORMAL_UP", p, "FLOAT", "VEC3"), m = s.getData("NORMAL_RIGHT", p, "FLOAT", "VEC3"), I = s.getData("NORMAL_UP_OCT32P", p, "UNSIGNED_SHORT", "VEC2"), B = s.getData("NORMAL_RIGHT_OCT32P", p, "UNSIGNED_SHORT", "VEC2"), w = s.getData("SCALE_NON_UNIFORM", p, "FLOAT", "VEC3"), v = s.getData("SCALE", p, "FLOAT", "SCALAR"), M = s.getData("RTC_CENTER", 1, "FLOAT", "VEC3"), S = s.getData("EAST_NORTH_UP");
          if (!g && b) {
            g = new Float32Array(p * 3);
            for (let Q = 0; Q < p; Q++)
              g[Q * 3 + 0] = C[0] + b[Q * 3 + 0] / 65535 * y[0], g[Q * 3 + 1] = C[1] + b[Q * 3 + 1] / 65535 * y[1], g[Q * 3 + 2] = C[2] + b[Q * 3 + 2] / 65535 * y[2];
          }
          const T = new x();
          for (let Q = 0; Q < p; Q++)
            T.x += g[Q * 3 + 0] / p, T.y += g[Q * 3 + 1] / p, T.z += g[Q * 3 + 2] / p;
          const D = [], _ = [];
          u.scene.updateMatrixWorld(), u.scene.traverse((Q) => {
            if (Q.isMesh) {
              _.push(Q);
              const { geometry: K, material: G } = Q, F = new ci(K, G, p);
              F.position.copy(T), M && (F.position.x += M[0], F.position.y += M[1], F.position.z += M[2]), D.push(F);
            }
          });
          for (let Q = 0; Q < p; Q++) {
            Ps.set(
              g[Q * 3 + 0] - T.x,
              g[Q * 3 + 1] - T.y,
              g[Q * 3 + 2] - T.z
            ), Ut.identity(), E && m ? (He.set(
              E[Q * 3 + 0],
              E[Q * 3 + 1],
              E[Q * 3 + 2]
            ), qe.set(
              m[Q * 3 + 0],
              m[Q * 3 + 1],
              m[Q * 3 + 2]
            ), _t.crossVectors(qe, He).normalize(), ze.makeBasis(
              qe,
              He,
              _t
            ), Ut.setFromRotationMatrix(ze)) : I && B && (ar(
              I[Q * 2 + 0],
              I[Q * 2 + 1],
              65535,
              He
            ), ar(
              B[Q * 2 + 0],
              B[Q * 2 + 1],
              65535,
              qe
            ), _t.crossVectors(qe, He).normalize(), ze.makeBasis(
              qe,
              He,
              _t
            ), Ut.setFromRotationMatrix(ze)), Gt.set(1, 1, 1), w && Gt.set(
              w[Q * 3 + 0],
              w[Q * 3 + 1],
              w[Q * 3 + 2]
            ), v && Gt.multiplyScalar(v[Q]);
            for (let K = 0, G = D.length; K < G; K++) {
              const F = D[K];
              _s.copy(Ut), S && (F.updateMatrixWorld(), nr.copy(Ps).applyMatrix4(F.matrixWorld), this.ellipsoid.getPositionToCartographic(nr, Us), this.ellipsoid.getEastNorthUpFrame(Us.lat, Us.lon, or), _s.setFromRotationMatrix(or)), ze.compose(Ps, _s, Gt).multiply(d);
              const O = _[K];
              rr.multiplyMatrices(ze, O.matrixWorld), F.setMatrixAt(Q, rr);
            }
          }
          u.scene.clear(), u.scene.add(...D), u.batchTable = i, u.featureTable = s, u.scene.batchTable = i, u.scene.featureTable = s, n(u);
        }, o);
      });
    });
  }
}
class Xl extends Gl {
  constructor(e = as) {
    super(), this.manager = e, this.adjustmentTransform = new U(), this.ellipsoid = gs.clone();
  }
  /**
   * Parses a cmpt buffer and resolves to an object containing a `Group` with all
   * sub-tile scenes added as children, and the individual sub-tile results.
   * @param {ArrayBuffer} buffer
   * @returns {Promise<{ scene: Group, tiles: Array }>}
   */
  parse(e) {
    const t = super.parse(e), { manager: s, ellipsoid: i, adjustmentTransform: r } = this, n = [];
    for (const o in t.tiles) {
      const { type: l, buffer: c } = t.tiles[o];
      switch (l) {
        case "b3dm": {
          const A = c.slice(), h = new Rn(s);
          h.workingPath = this.workingPath, h.fetchOptions = this.fetchOptions, h.adjustmentTransform.copy(r);
          const d = h.parse(A.buffer);
          n.push(d);
          break;
        }
        case "pnts": {
          const A = c.slice(), h = new Dn(s);
          h.workingPath = this.workingPath, h.fetchOptions = this.fetchOptions;
          const d = h.parse(A.buffer);
          n.push(d);
          break;
        }
        case "i3dm": {
          const A = c.slice(), h = new Ln(s);
          h.workingPath = this.workingPath, h.fetchOptions = this.fetchOptions, h.ellipsoid.copy(i), h.adjustmentTransform.copy(r);
          const d = h.parse(A.buffer);
          n.push(d);
          break;
        }
      }
    }
    return Promise.all(n).then((o) => {
      const l = new We();
      return o.forEach((c) => {
        l.add(c.scene);
      }), {
        tiles: o,
        scene: l
      };
    });
  }
}
const ct = /* @__PURE__ */ new U();
class Zl extends We {
  constructor(e) {
    super(), this.isTilesGroup = !0, this.name = "TilesRenderer.TilesGroup", this.tilesRenderer = e, this.matrixWorldInverse = new U();
  }
  raycast(e, t) {
    return this.tilesRenderer.raycast(e, t), !1;
  }
  updateMatrixWorld(e) {
    if (this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldNeedsUpdate || e) {
      this.parent === null ? ct.copy(this.matrix) : ct.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1;
      const t = ct.elements, s = this.matrixWorld.elements;
      let i = !1;
      for (let r = 0; r < 16; r++) {
        const n = t[r], o = s[r];
        if (Math.abs(n - o) > Number.EPSILON) {
          i = !0;
          break;
        }
      }
      if (i) {
        this.matrixWorld.copy(ct), this.matrixWorldInverse.copy(ct).invert();
        const r = this.children;
        for (let c = 0, A = r.length; c < A; c++)
          r[c].updateMatrixWorld();
        const { tilesRenderer: n } = this, { activeTiles: o, visibleTiles: l } = n;
        o.forEach((c) => {
          if (!l.has(c)) {
            const { scene: A } = c.engineData;
            A.traverse((h) => {
              h.updateMatrix(), h.matrixWorld.copy(h.matrix), h.parent ? h.matrixWorld.premultiply(h.parent.matrixWorld) : h.matrixWorld.premultiply(this.matrixWorld);
            });
          }
        });
      }
    }
  }
  updateWorldMatrix(e, t) {
    this.parent && e && this.parent.updateWorldMatrix(e, !1), this.updateMatrixWorld(!0);
  }
}
const $l = /* @__PURE__ */ new ss();
function ec(a, e, t, s) {
  const { scene: i } = a.engineData;
  t.invokeOnePlugin((r) => r.raycastTile && r.raycastTile(a, i, e, s)) || e.intersectObject(i, !0, s);
}
function tc(a) {
  return "traversal" in a;
}
function Fn(a, e, t, s, i = null) {
  if (!tc(e))
    return;
  const { group: r, activeTiles: n } = a, { boundingVolume: o } = e.engineData;
  if (i === null && (i = $l, i.copy(t.ray).applyMatrix4(r.matrixWorldInverse)), !e.traversal.used || !o.intersectsRay(i))
    return;
  n.has(e) && ec(e, t, a, s);
  const l = e.children;
  for (let c = 0, A = l.length; c < A; c++)
    Fn(a, l[c], t, s, i);
}
const ue = /* @__PURE__ */ new x(), pe = /* @__PURE__ */ new x(), ge = /* @__PURE__ */ new x(), lr = /* @__PURE__ */ new x(), cr = /* @__PURE__ */ new x();
class sc {
  constructor() {
    this.sphere = null, this.obb = null, this.region = null, this.regionObb = null;
  }
  intersectsRay(e) {
    const t = this.sphere, s = this.obb || this.regionObb;
    return !(t && !e.intersectsSphere(t) || s && !s.intersectsRay(e));
  }
  intersectRay(e, t = null) {
    const s = this.sphere, i = this.obb || this.regionObb;
    let r = -1 / 0, n = -1 / 0;
    s && e.intersectSphere(s, lr) && (r = s.containsPoint(e.origin) ? 0 : e.origin.distanceToSquared(lr)), i && i.intersectRay(e, cr) && (n = i.containsPoint(e.origin) ? 0 : e.origin.distanceToSquared(cr));
    const o = Math.max(r, n);
    return o === -1 / 0 ? null : (e.at(Math.sqrt(o), t), t);
  }
  distanceToPoint(e) {
    const t = this.sphere, s = this.obb || this.regionObb;
    let i = -1 / 0, r = -1 / 0;
    return t && (i = Math.max(t.distanceToPoint(e), 0)), s && (r = s.distanceToPoint(e)), i > r ? i : r;
  }
  intersectsFrustum(e) {
    const t = this.obb || this.regionObb, s = this.sphere;
    return s && !e.intersectsSphere(s) || t && !t.intersectsFrustum(e) ? !1 : !!(s || t);
  }
  intersectsSphere(e) {
    const t = this.obb || this.regionObb, s = this.sphere;
    return s && !s.intersectsSphere(e) || t && !t.intersectsSphere(e) ? !1 : !!(s || t);
  }
  intersectsOBB(e) {
    const t = this.obb || this.regionObb, s = this.sphere;
    return s && !e.intersectsSphere(s) || t && !t.intersectsOBB(e) ? !1 : !!(s || t);
  }
  getOBB(e, t) {
    const s = this.obb || this.regionObb;
    s ? (e.copy(s.box), t.copy(s.transform)) : (this.getAABB(e), t.identity());
  }
  getAABB(e) {
    if (this.sphere)
      this.sphere.getBoundingBox(e);
    else {
      const t = this.obb || this.regionObb;
      e.copy(t.box).applyMatrix4(t.transform);
    }
  }
  getSphere(e) {
    if (this.sphere)
      e.copy(this.sphere);
    else if (this.region)
      this.region.getBoundingSphere(e);
    else {
      const t = this.obb || this.regionObb;
      t.box.getBoundingSphere(e), e.applyMatrix4(t.transform);
    }
  }
  setObbData(e, t) {
    const s = new $i();
    ue.set(e[3], e[4], e[5]), pe.set(e[6], e[7], e[8]), ge.set(e[9], e[10], e[11]);
    const i = ue.length(), r = pe.length(), n = ge.length();
    ue.normalize(), pe.normalize(), ge.normalize(), i === 0 && ue.crossVectors(pe, ge), r === 0 && pe.crossVectors(ue, ge), n === 0 && ge.crossVectors(ue, pe), s.transform.set(
      ue.x,
      pe.x,
      ge.x,
      e[0],
      ue.y,
      pe.y,
      ge.y,
      e[1],
      ue.z,
      pe.z,
      ge.z,
      e[2],
      0,
      0,
      0,
      1
    ).premultiply(t), s.box.min.set(-i, -r, -n), s.box.max.set(i, r, n), s.update(), this.obb = s;
  }
  setSphereData(e, t, s, i, r) {
    const n = new Et();
    n.center.set(e, t, s), n.radius = i, n.applyMatrix4(r), this.sphere = n;
  }
  setRegionData(e, t, s, i, r, n, o) {
    const l = new jl(
      ...e.radius,
      s,
      r,
      t,
      i,
      n,
      o
    ), c = new $i();
    l.getBoundingBox(c.box, c.transform), c.update(), this.region = l, this.regionObb = c;
  }
}
const ic = /* @__PURE__ */ new Wr();
function rc(a, e, t, s) {
  const i = ic.set(
    a.normal.x,
    a.normal.y,
    a.normal.z,
    e.normal.x,
    e.normal.y,
    e.normal.z,
    t.normal.x,
    t.normal.y,
    t.normal.z
  );
  return s.set(-a.constant, -e.constant, -t.constant), s.applyMatrix3(i.invert()), s;
}
class nc extends Do {
  constructor() {
    super(), this.points = Array(8).fill().map(() => new x());
  }
  setFromProjectionMatrix(...e) {
    return super.setFromProjectionMatrix(...e), this.calculateFrustumPoints(), this;
  }
  calculateFrustumPoints() {
    const { planes: e, points: t } = this;
    [
      [e[0], e[3], e[4]],
      // Near top left
      [e[1], e[3], e[4]],
      // Near top right
      [e[0], e[2], e[4]],
      // Near bottom left
      [e[1], e[2], e[4]],
      // Near bottom right
      [e[0], e[3], e[5]],
      // Far top left
      [e[1], e[3], e[5]],
      // Far top right
      [e[0], e[2], e[5]],
      // Far bottom left
      [e[1], e[2], e[5]]
      // Far bottom right
    ].forEach((s, i) => {
      rc(s[0], s[1], s[2], t[i]);
    });
  }
}
const kn = Symbol("INITIAL_FRUSTUM_CULLED"), Nt = /* @__PURE__ */ new U(), ht = /* @__PURE__ */ new x(), Gs = /* @__PURE__ */ new k(), oc = /* @__PURE__ */ new x(1, 0, 0), ac = /* @__PURE__ */ new x(0, 1, 0);
function hr(a, e) {
  a.traverse((t) => {
    t.frustumCulled = t[kn] && e;
  });
}
class lc extends Fl {
  /**
   * If `true`, all tile meshes automatically have `frustumCulled` set to `false` since the
   * tiles renderer performs its own frustum culling. If `displayActiveTiles` is `true` or
   * multiple cameras are being used, consider setting this to `false`.
   * @type {boolean}
   * @default true
   */
  get autoDisableRendererCulling() {
    return this._autoDisableRendererCulling;
  }
  set autoDisableRendererCulling(e) {
    this._autoDisableRendererCulling !== e && (super._autoDisableRendererCulling = e, this.forEachLoadedModel((t) => {
      hr(t, !e);
    }));
  }
  constructor(...e) {
    super(...e), this.accelerateRaycast = !0, this.group = new Zl(this), this.ellipsoid = gs.clone(), this.cameras = [], this.cameraMap = /* @__PURE__ */ new Map(), this.cameraInfo = [], this._upRotationMatrix = new U(), this._bytesUsed = /* @__PURE__ */ new WeakMap(), this._autoDisableRendererCulling = !0, this.manager = new Ro(), this._listeners = {};
  }
  addEventListener(e, t) {
    vt.prototype.addEventListener.call(this, e, t);
  }
  hasEventListener(e, t) {
    return vt.prototype.hasEventListener.call(this, e, t);
  }
  removeEventListener(e, t) {
    vt.prototype.removeEventListener.call(this, e, t);
  }
  dispatchEvent(e) {
    vt.prototype.dispatchEvent.call(this, e);
  }
  /* Public API */
  /**
   * Returns the axis-aligned bounding box of the root tile in the group's local space.
   * @param {Box3} target - Target box to write into.
   * @returns {boolean} Whether the tileset is loaded and a bounding box is available.
   */
  getBoundingBox(e) {
    if (!this.root)
      return !1;
    const t = this.root.engineData.boundingVolume;
    return t ? (t.getAABB(e), !0) : !1;
  }
  /**
   * Returns the oriented bounding box and transform of the root tile.
   * @param {Box3} targetBox - Target box to write into (in local OBB space).
   * @param {Matrix4} targetMatrix - Transform from OBB local space to group local space.
   * @returns {boolean} Whether the tileset is loaded and an OBB is available.
   */
  getOrientedBoundingBox(e, t) {
    if (!this.root)
      return !1;
    const s = this.root.engineData.boundingVolume;
    return s ? (s.getOBB(e, t), !0) : !1;
  }
  /**
   * Returns the bounding sphere of the root tile in the group's local space.
   * @param {Sphere} target - Target sphere to write into.
   * @returns {boolean} Whether the tileset is loaded and a bounding sphere is available.
   */
  getBoundingSphere(e) {
    if (!this.root)
      return !1;
    const t = this.root.engineData.boundingVolume;
    return t ? (t.getSphere(e), !0) : !1;
  }
  /**
   * Iterates over all currently loaded tile scenes.
   * @param {Function} callback - Called with `( scene: Object3D, tile: object )` for each loaded tile.
   */
  forEachLoadedModel(e) {
    this.traverse((t) => {
      const s = t.engineData && t.engineData.scene;
      s && e(s, t);
    }, null, !1);
  }
  /**
   * Performs a raycast against all loaded tile scenes. Compatible with Three.js raycasting.
   * Supports `raycaster.firstHitOnly` for early termination.
   * @param {Raycaster} raycaster
   * @param {Array} intersects - Array to push intersection results into.
   */
  raycast(e, t) {
    if (this.root)
      if (this.accelerateRaycast)
        Fn(this, this.root, e, t);
      else {
        const s = e.firstHitOnly ? [] : t;
        for (const i of this.activeTiles) {
          const { scene: r } = i.engineData;
          this.invokeOnePlugin((n) => n.raycastTile && n.raycastTile(i, r, e, s)) || e.intersectObject(r, !0, s);
        }
        e.firstHitOnly && s.length > 0 && (s.sort((i, r) => i.distance - r.distance), t.push(s[0]));
      }
  }
  /**
   * Returns whether the given camera is registered with this renderer.
   * @param {Camera} camera
   * @returns {boolean}
   */
  hasCamera(e) {
    return this.cameraMap.has(e);
  }
  /**
   * Registers a camera with the renderer so it is used for tile selection and screen-space error
   * calculation. Use `setResolution` or `setResolutionFromRenderer` to provide the camera's resolution.
   * @param {Camera} camera
   * @returns {boolean} Whether the camera was newly added.
   */
  setCamera(e) {
    const t = this.cameras, s = this.cameraMap;
    return s.has(e) ? !1 : (s.set(e, new k()), t.push(e), this.dispatchEvent({ type: "add-camera", camera: e }), !0);
  }
  /**
   * Sets the render resolution for a registered camera, used for screen-space error calculation.
   * @param {Camera} camera - A previously registered camera.
   * @param {number|Vector2} xOrVec - Render width in pixels, or a Vector2 containing width and height.
   * @param {number} [y] - Render height in pixels when `xOrVec` is a number.
   * @returns {boolean} Whether the camera is registered and the resolution was updated.
   */
  setResolution(e, t, s) {
    const i = this.cameraMap;
    if (!i.has(e))
      return !1;
    const r = t.isVector2 ? t.x : t, n = t.isVector2 ? t.y : s, o = i.get(e);
    return (o.width !== r || o.height !== n) && (o.set(r, n), this.dispatchEvent({ type: "camera-resolution-change" })), !0;
  }
  /**
   * Returns the render resolution previously set for a registered camera.
   * @param {Camera} camera - A previously registered camera.
   * @param {Vector2} target - Vector2 to write the result into.
   * @returns {Vector2|null} The target with width/height filled in, or null if the camera is not registered.
   */
  getResolution(e, t) {
    const s = this.cameraMap.get(e);
    return s ? t.copy(s) : null;
  }
  /**
   * Sets the render resolution for a camera by reading the current size from a WebGLRenderer.
   * @param {Camera} camera - A previously registered camera.
   * @param {WebGLRenderer} renderer
   * @returns {boolean} Whether the camera is registered and the resolution was updated.
   */
  setResolutionFromRenderer(e, t) {
    return t.getSize(Gs), this.setResolution(e, Gs.x, Gs.y);
  }
  /**
   * Unregisters a camera from the renderer.
   * @param {Camera} camera
   * @returns {boolean} Whether the camera was found and removed.
   */
  deleteCamera(e) {
    const t = this.cameras, s = this.cameraMap;
    if (s.has(e)) {
      const i = t.indexOf(e);
      return t.splice(i, 1), s.delete(e), this.dispatchEvent({ type: "delete-camera", camera: e }), !0;
    }
    return !1;
  }
  /* Overriden */
  loadRootTileset(...e) {
    return super.loadRootTileset(...e).then((t) => {
      const { asset: s, extensions: i = {} } = t;
      switch ((s && s.gltfUpAxis || "y").toLowerCase()) {
        case "x":
          this._upRotationMatrix.makeRotationAxis(ac, -Math.PI / 2);
          break;
        case "y":
          this._upRotationMatrix.makeRotationAxis(oc, Math.PI / 2);
          break;
      }
      if ("3DTILES_ellipsoid" in i) {
        const r = i["3DTILES_ellipsoid"], { ellipsoid: n } = this;
        n.name = r.body, r.radii ? n.radius.set(...r.radii) : n.radius.set(1, 1, 1);
      }
      return t;
    });
  }
  prepareForTraversal() {
    const e = this.group, t = this.cameras, s = this.cameraMap, i = this.cameraInfo;
    for (; i.length > t.length; )
      i.pop();
    for (; i.length < t.length; )
      i.push({
        frustum: new nc(),
        isOrthographic: !1,
        sseDenominator: -1,
        // used if isOrthographic:false
        position: new x(),
        invScale: -1,
        pixelSize: 0
        // used if isOrthographic:true
      });
    ht.setFromMatrixScale(e.matrixWorldInverse), Math.abs(Math.max(ht.x - ht.y, ht.x - ht.z)) > 1e-6 && console.warn("ThreeTilesRenderer : Non uniform scale used for tile which may cause issues when calculating screen space error.");
    for (let r = 0, n = i.length; r < n; r++) {
      const o = t[r], l = i[r], c = l.frustum, A = l.position, h = s.get(o);
      (h.width === 0 || h.height === 0) && console.warn("TilesRenderer: resolution for camera error calculation is not set.");
      const d = o.projectionMatrix.elements;
      if (l.isOrthographic = d[15] === 1, l.isOrthographic) {
        const u = 2 / d[0], p = 2 / d[5];
        l.pixelSize = Math.max(p / h.height, u / h.width);
      } else
        l.sseDenominator = 2 / d[5] / h.height;
      Nt.copy(e.matrixWorld), Nt.premultiply(o.matrixWorldInverse), Nt.premultiply(o.projectionMatrix), c.setFromProjectionMatrix(Nt, o.coordinateSystem, o.reversedDepth), A.set(0, 0, 0), A.applyMatrix4(o.matrixWorld), A.applyMatrix4(e.matrixWorldInverse);
    }
  }
  update() {
    if (super.update(), this.cameras.length === 0 && this.root) {
      let e = !1;
      this.invokeAllPlugins((t) => e = e || !!(t !== this && t.calculateTileViewError)), e === !1 && console.warn("TilesRenderer: no cameras defined. Cannot update 3d tiles.");
    }
  }
  preprocessNode(e, t, s = null) {
    super.preprocessNode(e, t, s);
    const i = new U();
    if (e.transform) {
      const o = e.transform;
      for (let l = 0; l < 16; l++)
        i.elements[l] = o[l];
    }
    s && i.premultiply(s.engineData.transform);
    const r = new U().copy(i).invert(), n = new sc();
    "sphere" in e.boundingVolume && n.setSphereData(...e.boundingVolume.sphere, i), "box" in e.boundingVolume && n.setObbData(e.boundingVolume.box, i), "region" in e.boundingVolume && n.setRegionData(this.ellipsoid, ...e.boundingVolume.region), e.engineData.transform = i, e.engineData.transformInverse = r, e.engineData.boundingVolume = n, e.engineData.geometry = null, e.engineData.materials = null, e.engineData.textures = null;
  }
  async parseTile(e, t, s, i, r) {
    const n = t.engineData, o = pi(i), l = this.fetchOptions, c = this.manager;
    let A = null;
    const h = n.transform, d = this._upRotationMatrix, u = (Pe(e) || s).toLowerCase();
    switch (u) {
      case "b3dm": {
        const m = new Rn(c);
        m.workingPath = o, m.fetchOptions = l, m.adjustmentTransform.copy(d), A = m.parse(e);
        break;
      }
      case "pnts": {
        const m = new Dn(c);
        m.workingPath = o, m.fetchOptions = l, A = m.parse(e);
        break;
      }
      case "i3dm": {
        const m = new Ln(c);
        m.workingPath = o, m.fetchOptions = l, m.adjustmentTransform.copy(d), m.ellipsoid.copy(this.ellipsoid), A = m.parse(e);
        break;
      }
      case "cmpt": {
        const m = new Xl(c);
        m.workingPath = o, m.fetchOptions = l, m.adjustmentTransform.copy(d), m.ellipsoid.copy(this.ellipsoid), A = m.parse(e).then((I) => I.scene);
        break;
      }
      // 3DTILES_content_gltf
      case "gltf":
      case "glb": {
        const m = c.getHandler("path.gltf") || c.getHandler("path.glb") || new Ge(c);
        m.setWithCredentials(l.credentials === "include"), m.setRequestHeader(l.headers || {}), l.credentials === "include" && l.mode === "cors" && m.setCrossOrigin("use-credentials");
        let I = m.resourcePath || m.path || o;
        !/[\\/]$/.test(I) && I.length && (I += "/"), A = m.parseAsync(e, I).then((B) => {
          B.scene = B.scene || new We();
          const { scene: w } = B;
          return w.updateMatrix(), w.matrix.multiply(d).decompose(w.position, w.quaternion, w.scale), B;
        });
        break;
      }
      default: {
        A = this.invokeOnePlugin((m) => m.parseToMesh && m.parseToMesh(e, t, s, i, r));
        break;
      }
    }
    const p = await A;
    if (p === null)
      throw new Error(`TilesRenderer: Content type "${u}" not supported.`);
    let g, b;
    p.isObject3D ? (g = p, b = null) : (g = p.scene, b = p), g.updateMatrix(), g.matrix.premultiply(h), g.matrix.decompose(g.position, g.quaternion, g.scale), await this.invokeAllPlugins((m) => m.processTileModel && m.processTileModel(g, t)), g.traverse((m) => {
      m[kn] = m.frustumCulled;
    }), hr(g, !this.autoDisableRendererCulling);
    const C = [], y = [], E = [];
    if (g.traverse((m) => {
      if (m.geometry && y.push(m.geometry), m.material) {
        const I = m.material;
        C.push(m.material);
        for (const B in I) {
          const w = I[B];
          w && w.isTexture && E.push(w);
        }
      }
    }), r.aborted) {
      for (let m = 0, I = E.length; m < I; m++) {
        const B = E[m];
        B.image instanceof ImageBitmap && B.image.close(), B.dispose();
      }
      return;
    }
    n.materials = C, n.geometry = y, n.textures = E, n.scene = g, n.metadata = b;
  }
  disposeTile(e) {
    super.disposeTile(e);
    const t = e.engineData;
    if (t.scene) {
      const s = t.materials, i = t.geometry, r = t.textures, n = t.scene.parent;
      t.scene.traverse((o) => {
        o.userData.meshFeatures && o.userData.meshFeatures.dispose(), o.userData.structuralMetadata && o.userData.structuralMetadata.dispose();
      });
      for (let o = 0, l = i.length; o < l; o++)
        i[o].dispose();
      for (let o = 0, l = s.length; o < l; o++)
        s[o].dispose();
      for (let o = 0, l = r.length; o < l; o++) {
        const c = r[o];
        c.image instanceof ImageBitmap && c.image.close(), c.dispose();
      }
      n && n.remove(t.scene), t.scene = null, t.materials = null, t.textures = null, t.geometry = null, t.metadata = null;
    }
  }
  setTileActive(e, t) {
    const s = e.engineData.scene, i = this.group;
    s && s.traverse((r) => {
      r.updateMatrix(), r.matrixWorld.copy(r.matrix), r.parent ? r.matrixWorld.premultiply(r.parent.matrixWorld) : r.matrixWorld.premultiply(i.matrixWorld);
    }), super.setTileActive(e, t);
  }
  setTileVisible(e, t) {
    const s = e.engineData.scene, i = this.group;
    t ? s && i.add(s) : s && i.remove(s), super.setTileVisible(e, t);
  }
  calculateBytesUsed(e, t) {
    const s = this._bytesUsed;
    return !s.has(e) && t && s.set(e, Yl(t)), s.get(e) ?? null;
  }
  calculateTileViewError(e, t) {
    const s = e.engineData, i = this.cameras, r = this.cameraInfo, n = s.boundingVolume;
    let o = !1, l = 0, c = 1 / 0, A = 0, h = 1 / 0;
    for (let d = 0, u = i.length; d < u; d++) {
      const p = r[d];
      let g, b;
      if (p.isOrthographic) {
        const y = p.pixelSize;
        g = e.geometricError / y, b = 1 / 0;
      } else {
        const y = p.sseDenominator;
        b = n.distanceToPoint(p.position), g = b === 0 ? 1 / 0 : e.geometricError / (b * y);
      }
      const C = r[d].frustum;
      n.intersectsFrustum(C) && (o = !0, l = Math.max(l, g), c = Math.min(c, b)), A = Math.max(A, g), h = Math.min(h, b);
    }
    o ? (t.inView = !0, t.error = l, t.distanceFromCamera = c) : (t.inView = !1, t.error = A, t.distanceFromCamera = h);
  }
  dispose() {
    super.dispose(), this.group.removeFromParent();
  }
}
function Xt(a) {
  return a.implicitTilingData.root.implicitTiling.subdivisionScheme === "OCTREE";
}
function Ns(a) {
  return Xt(a) ? 8 : 4;
}
function cc(a, e) {
  if (!a)
    return [0, 0, 0];
  const t = a.implicitTilingData.x, s = a.implicitTilingData.y, i = a.implicitTilingData.z, r = 2 * t + e % 2, n = 2 * s + Math.floor(e / 2) % 2, o = Xt(a) ? 2 * i + Math.floor(e / 4) % 2 : 0;
  return [r, n, o];
}
class Ar {
  constructor(e, t) {
    this.parent = e, this.children = [], this.geometricError = 0, this.boundingVolume = null;
    const [s, i, r] = cc(e, t);
    this.implicitTilingData = {
      level: e.implicitTilingData.level + 1,
      root: e.implicitTilingData.root,
      subtreeIdx: t,
      x: s,
      y: i,
      z: r
    };
  }
  static clone(e) {
    return {
      parent: e.parent,
      children: [],
      geometricError: e.geometricError,
      boundingVolume: e.boundingVolume,
      implicitTilingData: {
        ...e.implicitTilingData
      }
    };
  }
}
class hc extends wt {
  constructor(e) {
    super(), this.tile = e, this.rootTile = e.implicitTilingData.root, this.workingPath = null;
  }
  /**
   * A helper object for storing the two parts of the subtree binary
   *
   * @typedef {Object} Subtree
   * @property {number} version
   * @property {JSON} subtreeJson
   * @property {ArrayBuffer} subtreeByte
   * @private
   */
  /**
   *
   * @param {ArrayBuffer} buffer
   * @returns {Subtree}
   */
  parseBuffer(e) {
    const t = new DataView(e);
    let s = 0;
    const i = Pe(t);
    console.assert(i === "subt", 'SUBTREELoader: The magic bytes equal "subt".'), s += 4;
    const r = t.getUint32(s, !0);
    console.assert(r === 1, 'SUBTREELoader: The version listed in the header is "1".'), s += 4;
    const n = t.getUint32(s, !0);
    s += 8;
    const o = t.getUint32(s, !0);
    s += 8;
    const l = JSON.parse(ui(new Uint8Array(e, s, n)));
    s += n;
    const c = e.slice(s, s + o);
    return {
      version: r,
      subtreeJson: l,
      subtreeByte: c
    };
  }
  async parse(e) {
    const t = this.parseBuffer(e), s = t.subtreeJson;
    s.contentAvailabilityHeaders = [].concat(s.contentAvailability);
    const i = this.preprocessBuffers(s.buffers), r = this.preprocessBufferViews(
      s.bufferViews,
      i
    );
    this.markActiveBufferViews(s, r);
    const n = await this.requestActiveBuffers(
      i,
      t.subtreeByte
    ), o = this.parseActiveBufferViews(r, n);
    this.parseAvailability(t, s, o), this.expandSubtree(this.tile, t);
  }
  /**
   * Determine which buffer views need to be loaded into memory. This includes:
   *
   * <ul>
   * <li>The tile availability bitstream (if a bitstream is defined)</li>
   * <li>The content availability bitstream(s) (if a bitstream is defined)</li>
   * <li>The child subtree availability bitstream (if a bitstream is defined)</li>
   * </ul>
   *
   * <p>
   * This function modifies the buffer view headers' isActive flags in place.
   * </p>
   *
   * @param {JSON} subtreeJson The JSON chunk from the subtree
   * @param {BufferViewHeader[]} bufferViewHeaders The preprocessed buffer view headers
   * @private
   */
  markActiveBufferViews(e, t) {
    let s;
    const i = e.tileAvailability;
    isNaN(i.bitstream) ? isNaN(i.bufferView) || (s = t[i.bufferView]) : s = t[i.bitstream], s && (s.isActive = !0, s.bufferHeader.isActive = !0);
    const r = e.contentAvailabilityHeaders;
    for (let o = 0; o < r.length; o++)
      s = void 0, isNaN(r[o].bitstream) ? isNaN(r[o].bufferView) || (s = t[r[o].bufferView]) : s = t[r[o].bitstream], s && (s.isActive = !0, s.bufferHeader.isActive = !0);
    s = void 0;
    const n = e.childSubtreeAvailability;
    isNaN(n.bitstream) ? isNaN(n.bufferView) || (s = t[n.bufferView]) : s = t[n.bitstream], s && (s.isActive = !0, s.bufferHeader.isActive = !0);
  }
  /**
   * Go through the list of buffers and gather all the active ones into
   * a dictionary.
   * <p>
   * The results are put into a dictionary object. The keys are indices of
   * buffers, and the values are Uint8Arrays of the contents. Only buffers
   * marked with the isActive flag are fetched.
   * </p>
   * <p>
   * The internal buffer (the subtree's binary chunk) is also stored in this
   * dictionary if it is marked active.
   * </p>
   * @param {BufferHeader[]} bufferHeaders The preprocessed buffer headers
   * @param {ArrayBuffer} internalBuffer The binary chunk of the subtree file
   * @returns {Object} buffersU8 A dictionary of buffer index to a Uint8Array of its contents.
   * @private
   */
  async requestActiveBuffers(e, t) {
    const s = [];
    for (let n = 0; n < e.length; n++) {
      const o = e[n];
      if (!o.isActive)
        s.push(Promise.resolve());
      else if (o.isExternal) {
        const l = this.parseImplicitURIBuffer(
          this.tile,
          this.rootTile.implicitTiling.subtrees.uri,
          o.uri
        ), c = fetch(l, this.fetchOptions).then((A) => {
          if (!A.ok)
            throw new Error(`SUBTREELoader: Failed to load external buffer from ${o.uri} with error code ${A.status}.`);
          return A.arrayBuffer();
        }).then((A) => new Uint8Array(A));
        s.push(c);
      } else
        s.push(Promise.resolve(new Uint8Array(t)));
    }
    const i = await Promise.all(s), r = {};
    for (let n = 0; n < i.length; n++) {
      const o = i[n];
      o && (r[n] = o);
    }
    return r;
  }
  /**
   * Go through the list of buffer views, and if they are marked as active,
   * extract a subarray from one of the active buffers.
   *
   * @param {BufferViewHeader[]} bufferViewHeaders
   * @param {Object} buffersU8 A dictionary of buffer index to a Uint8Array of its contents.
   * @returns {Object} A dictionary of buffer view index to a Uint8Array of its contents.
   * @private
   */
  parseActiveBufferViews(e, t) {
    const s = {};
    for (let i = 0; i < e.length; i++) {
      const r = e[i];
      if (!r.isActive)
        continue;
      const n = r.byteOffset, o = n + r.byteLength, l = t[r.buffer];
      s[i] = l.slice(n, o);
    }
    return s;
  }
  /**
   * A buffer header is the JSON header from the subtree JSON chunk plus
   * a couple extra boolean flags for easy reference.
   *
   * Buffers are assumed inactive until explicitly marked active. This is used
   * to avoid fetching unneeded buffers.
   *
   * @typedef {Object} BufferHeader
   * @property {boolean} isActive Whether this buffer is currently used.
   * @property {string} [uri] The URI of the buffer (external buffers only)
   * @property {number} byteLength The byte length of the buffer, including any padding contained within.
   * @private
   */
  /**
   * Iterate over the list of buffers from the subtree JSON and add the isActive field for easier parsing later.
   * This modifies the objects in place.
   * @param {Object[]} [bufferHeaders=[]] The JSON from subtreeJson.buffers.
   * @returns {BufferHeader[]} The same array of headers with additional fields.
   * @private
   */
  preprocessBuffers(e = []) {
    for (let t = 0; t < e.length; t++) {
      const s = e[t];
      s.isActive = !1, s.isExternal = !!s.uri;
    }
    return e;
  }
  /**
   * A buffer view header is the JSON header from the subtree JSON chunk plus
   * the isActive flag and a reference to the header for the underlying buffer.
   *
   * @typedef {Object} BufferViewHeader
   * @property {BufferHeader} bufferHeader A reference to the header for the underlying buffer
   * @property {boolean} isActive Whether this bufferView is currently used.
   * @property {number} buffer The index of the underlying buffer.
   * @property {number} byteOffset The start byte of the bufferView within the buffer.
   * @property {number} byteLength The length of the bufferView. No padding is included in this length.
   * @private
   */
  /**
   * Iterate the list of buffer views from the subtree JSON and add the
   * isActive flag. Also save a reference to the bufferHeader.
   *
   * @param {Object[]} [bufferViewHeaders=[]] The JSON from subtree.bufferViews.
   * @param {BufferHeader[]} bufferHeaders The preprocessed buffer headers.
   * @returns {BufferViewHeader[]} The same array of bufferView headers with additional fields.
   * @private
   */
  preprocessBufferViews(e = [], t) {
    for (let s = 0; s < e.length; s++) {
      const i = e[s];
      i.bufferHeader = t[i.buffer], i.isActive = !1, i.isExternal = i.bufferHeader.isExternal;
    }
    return e;
  }
  /**
   * Parse the three availability bitstreams and store them in the subtree.
   *
   * @param {Subtree} subtree The subtree to modify.
   * @param {Object} subtreeJson The subtree JSON.
   * @param {Object} bufferViewsU8 A dictionary of buffer view index to a Uint8Array of its contents.
   * @private
   */
  parseAvailability(e, t, s) {
    const i = Ns(this.rootTile), r = this.rootTile.implicitTiling.subtreeLevels, n = (Math.pow(i, r) - 1) / (i - 1), o = Math.pow(i, r);
    e._tileAvailability = this.parseAvailabilityBitstream(
      t.tileAvailability,
      s,
      n
    ), e._contentAvailabilityBitstreams = [];
    for (let l = 0; l < t.contentAvailabilityHeaders.length; l++) {
      const c = this.parseAvailabilityBitstream(
        t.contentAvailabilityHeaders[l],
        s,
        // content availability has the same length as tile availability.
        n
      );
      e._contentAvailabilityBitstreams.push(c);
    }
    e._childSubtreeAvailability = this.parseAvailabilityBitstream(
      t.childSubtreeAvailability,
      s,
      o
    );
  }
  /**
   * Given the JSON describing an availability bitstream, turn it into an
   * in-memory representation using an object. This handles bitstreams from a bufferView.
   *
   * @param {Object} availabilityJson A JSON object representing the availability.
   * @param {Object} bufferViewsU8 A dictionary of buffer view index to its Uint8Array contents.
   * @param {number} lengthBits The length of the availability bitstream in bits.
   * @returns {Object}
   * @private
   */
  parseAvailabilityBitstream(e, t, s) {
    if (!isNaN(e.constant))
      return {
        constant: !!e.constant,
        lengthBits: s
      };
    let i;
    return isNaN(e.bitstream) ? isNaN(e.bufferView) || (i = t[e.bufferView]) : i = t[e.bitstream], {
      bitstream: i,
      lengthBits: s
    };
  }
  /**
   * Expand a single subtree tile. This transcodes the subtree into
   * a tree of {@link SubtreeTile}. The root of this tree is stored in
   * the placeholder tile's children array. This method also creates
   * tiles for the child subtrees to be lazily expanded as needed.
   *
   * @param {Object | SubtreeTile} subtreeRoot The first node of the subtree.
   * @param {Subtree} subtree The parsed subtree.
   * @private
   */
  expandSubtree(e, t) {
    const s = Ar.clone(e);
    for (let n = 0; t && n < t._contentAvailabilityBitstreams.length; n++)
      if (t && this.getBit(t._contentAvailabilityBitstreams[n], 0)) {
        s.content = { uri: this.parseImplicitURI(e, this.rootTile.content.uri) };
        break;
      }
    e.children.push(s);
    const i = this.transcodeSubtreeTiles(
      s,
      t
    ), r = this.listChildSubtrees(t, i);
    for (let n = 0; n < r.length; n++) {
      const o = r[n], l = o.tile, c = this.deriveChildTile(
        null,
        l,
        null,
        o.childMortonIndex
      );
      c.content = { uri: this.parseImplicitURI(c, this.rootTile.implicitTiling.subtrees.uri) }, l.children.push(c);
    }
  }
  /**
   * Transcode the implicitly defined tiles within this subtree and generate
   * explicit {@link SubtreeTile} objects. This function only transcodes tiles,
   * child subtrees are handled separately.
   *
   * @param {Object | SubtreeTile} subtreeRoot The root of the current subtree.
   * @param {Subtree} subtree The subtree to get availability information.
   * @returns {Array} The bottom row of transcoded tiles. This is helpful for processing child subtrees.
   * @private
   */
  transcodeSubtreeTiles(e, t) {
    let s = [e], i = [];
    for (let r = 1; r < this.rootTile.implicitTiling.subtreeLevels; r++) {
      const n = Ns(this.rootTile), o = (Math.pow(n, r) - 1) / (n - 1), l = n * s.length;
      for (let c = 0; c < l; c++) {
        const A = o + c, h = c >> Math.log2(n), d = s[h];
        if (!this.getBit(t._tileAvailability, A)) {
          i.push(void 0);
          continue;
        }
        const u = this.deriveChildTile(
          t,
          d,
          A,
          c
        );
        d.children.push(u), i.push(u);
      }
      s = i, i = [];
    }
    return s;
  }
  /**
   * Given a parent tile and information about which child to create, derive
   * the properties of the child tile implicitly.
   * <p>
   * This creates a real tile for rendering.
   * </p>
   *
   * @param {Subtree} subtree The subtree the child tile belongs to.
   * @param {Object | SubtreeTile} parentTile The parent of the new child tile.
   * @param {number} childBitIndex The index of the child tile within the tile's availability information.
   * @param {number} childMortonIndex The morton index of the child tile relative to its parent.
   * @returns {SubtreeTile} The new child tile.
   * @private
   */
  deriveChildTile(e, t, s, i) {
    const r = new Ar(t, i);
    r.boundingVolume = this.getTileBoundingVolume(r), r.geometricError = this.getGeometricError(r);
    for (let n = 0; e && n < e._contentAvailabilityBitstreams.length; n++)
      if (e && this.getBit(e._contentAvailabilityBitstreams[n], s)) {
        r.content = { uri: this.parseImplicitURI(r, this.rootTile.content.uri) };
        break;
      }
    return r;
  }
  /**
   * Get a bit from the bitstream as a Boolean. If the bitstream
   * is a constant, the constant value is returned instead.
   *
   * @param {ParsedBitstream} object
   * @param {number} index The integer index of the bit.
   * @returns {boolean} The value of the bit.
   * @private
   */
  getBit(e, t) {
    if (t < 0 || t >= e.lengthBits)
      throw new Error("Bit index out of bounds.");
    if (e.constant !== void 0)
      return e.constant;
    const s = t >> 3, i = t % 8;
    return (new Uint8Array(e.bitstream)[s] >> i & 1) === 1;
  }
  /**
   * //TODO Adapt for Sphere
   * To maintain numerical stability during this subdivision process,
   * the actual bounding volumes should not be computed progressively by subdividing a non-root tile volume.
   * Instead, the exact bounding volumes are computed directly for a given level.
   * @param {Object | SubtreeTile} tile
   * @returns {Object} object containing the bounding volume.
   */
  getTileBoundingVolume(e) {
    const t = {};
    if (this.rootTile.boundingVolume.region) {
      const s = [...this.rootTile.boundingVolume.region], i = s[0], r = s[2], n = s[1], o = s[3], l = (r - i) / Math.pow(2, e.implicitTilingData.level), c = (o - n) / Math.pow(2, e.implicitTilingData.level);
      s[0] = i + l * e.implicitTilingData.x, s[2] = i + l * (e.implicitTilingData.x + 1), s[1] = n + c * e.implicitTilingData.y, s[3] = n + c * (e.implicitTilingData.y + 1);
      for (let A = 0; A < 4; A++) {
        const h = s[A];
        h < -Math.PI ? s[A] += 2 * Math.PI : h > Math.PI && (s[A] -= 2 * Math.PI);
      }
      if (Xt(e)) {
        const A = s[4], h = (s[5] - A) / Math.pow(2, e.implicitTilingData.level);
        s[4] = A + h * e.implicitTilingData.z, s[5] = A + h * (e.implicitTilingData.z + 1);
      }
      t.region = s;
    }
    if (this.rootTile.boundingVolume.box) {
      const s = [...this.rootTile.boundingVolume.box], i = 2 ** e.implicitTilingData.level - 1, r = Math.pow(2, -e.implicitTilingData.level), n = Xt(e) ? 3 : 2;
      for (let o = 0; o < n; o++) {
        s[3 + o * 3 + 0] *= r, s[3 + o * 3 + 1] *= r, s[3 + o * 3 + 2] *= r;
        const l = s[3 + o * 3 + 0], c = s[3 + o * 3 + 1], A = s[3 + o * 3 + 2], h = o === 0 ? e.implicitTilingData.x : o === 1 ? e.implicitTilingData.y : e.implicitTilingData.z;
        s[0] += 2 * l * (-0.5 * i + h), s[1] += 2 * c * (-0.5 * i + h), s[2] += 2 * A * (-0.5 * i + h);
      }
      t.box = s;
    }
    return t;
  }
  /**
   * Each child’s geometricError is half of its parent’s geometricError.
   * @param {Object | SubtreeTile} tile
   * @returns {number}
   */
  getGeometricError(e) {
    return this.rootTile.geometricError / Math.pow(2, e.implicitTilingData.level);
  }
  /**
   * Determine what child subtrees exist and return a list of information.
   *
   * @param {Object} subtree The subtree for looking up availability.
   * @param {Array} bottomRow The bottom row of tiles in a transcoded subtree.
   * @returns {Array} A list of identifiers for the child subtrees.
   * @private
   */
  listChildSubtrees(e, t) {
    const s = [], i = Ns(this.rootTile);
    for (let r = 0; r < t.length; r++) {
      const n = t[r];
      if (n !== void 0)
        for (let o = 0; o < i; o++) {
          const l = r * i + o;
          this.getBit(e._childSubtreeAvailability, l) && s.push({
            tile: n,
            childMortonIndex: l
          });
        }
    }
    return s;
  }
  /**
   * Replaces placeholder tokens in a URI template with the corresponding tile properties.
   *
   * The URI template should contain the tokens:
   * - `{level}` for the tile's subdivision level.
   * - `{x}` for the tile's x-coordinate.
   * - `{y}` for the tile's y-coordinate.
   * - `{z}` for the tile's z-coordinate.
   *
   * @param {Object} tile - The tile object containing properties __level, __x, __y, and __z.
   * @param {string} uri - The URI template string with placeholders.
   * @returns {string} The URI with placeholders replaced by the tile's properties.
   */
  parseImplicitURI(e, t) {
    return t = t.replace("{level}", e.implicitTilingData.level), t = t.replace("{x}", e.implicitTilingData.x), t = t.replace("{y}", e.implicitTilingData.y), t = t.replace("{z}", e.implicitTilingData.z), t;
  }
  /**
   * Generates the full external buffer URI for a tile by combining an implicit URI with a buffer URI.
   *
   * First, it parses the implicit URI using the tile properties and the provided template. Then, it creates a new URL
   * relative to the tile's base path, removes the last path segment, and appends the buffer URI.
   *
   * @param {Object} tile - The tile object that contains properties:
   *   - __level: the subdivision level,
   *   - __x, __y, __z: the tile coordinates,
   * @param {string} uri - The URI template string with placeholders for the tile (e.g., `{level}`, `{x}`, `{y}`, `{z}`).
   * @param {string} bufUri - The buffer file name to append (e.g., "0_1.bin").
   * @returns {string} The full external buffer URI.
   */
  parseImplicitURIBuffer(e, t, s) {
    const i = this.parseImplicitURI(e, t), r = new URL(i, this.workingPath + "/");
    return r.pathname = r.pathname.substring(0, r.pathname.lastIndexOf("/")), new URL(r.pathname + "/" + s, this.workingPath + "/").toString();
  }
}
class Ac {
  constructor() {
    this.name = "IMPLICIT_TILING_PLUGIN";
  }
  init(e) {
    this.tiles = e;
  }
  preprocessNode(e, t, s) {
    var i;
    e.implicitTiling ? (e.internal.hasUnrenderableContent = !0, e.internal.hasRenderableContent = !1, e.implicitTilingData = {
      // Keep this tile as an Implicit Root Tile
      root: e,
      // Idx of the tile in its subtree
      subtreeIdx: 0,
      // Coords of the tile
      x: 0,
      y: 0,
      z: 0,
      level: 0
    }) : /.subtree$/i.test((i = e.content) == null ? void 0 : i.uri) && (e.internal.hasUnrenderableContent = !0, e.internal.hasRenderableContent = !1);
  }
  parseTile(e, t, s) {
    if (/^subtree$/i.test(s)) {
      const i = new hc(t);
      return i.workingPath = t.internal.basePath, i.fetchOptions = this.tiles.fetchOptions, i.parse(e);
    }
  }
  preprocessURL(e, t) {
    if (t && t.implicitTiling) {
      const s = t.implicitTiling.subtrees.uri.replace("{level}", t.implicitTilingData.level).replace("{x}", t.implicitTilingData.x).replace("{y}", t.implicitTilingData.y).replace("{z}", t.implicitTilingData.z);
      return new URL(s, t.internal.basePath + "/").toString();
    }
    return e;
  }
  disposeTile(e) {
    var t;
    /.subtree$/i.test((t = e.content) == null ? void 0 : t.uri) && (e.children.forEach((s) => {
      this.tiles.processNodeQueue.remove(s);
    }), e.children.length = 0);
  }
}
const dc = new qr(-1, 1, 1, -1, 0, 1);
class uc extends ns {
  constructor() {
    super(), this.setAttribute("position", new Jt([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), this.setAttribute("uv", new Jt([0, 2, 0, 0, 2, 0], 2));
  }
}
const pc = new uc();
class Pn {
  /**
   * Constructs a new full screen quad.
   *
   * @param {?Material} material - The material to render te full screen quad with.
   */
  constructor(e) {
    this._mesh = new os(pc, e);
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever the instance is no longer used in your app.
   */
  dispose() {
    this._mesh.geometry.dispose();
  }
  /**
   * Renders the full screen quad.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   */
  render(e) {
    e.render(this._mesh, dc);
  }
  /**
   * The quad's material.
   *
   * @type {?Material}
   */
  get material() {
    return this._mesh.material;
  }
  set material(e) {
    this._mesh.material = e;
  }
}
const _n = /* @__PURE__ */ new hs();
_n.maxJobs = 10;
_n.priorityCallback = (a, e) => {
  const t = a.tile, s = e.tile, i = t.internal.renderer, r = s.internal.renderer, n = i.visibleTiles.has(t), o = r.visibleTiles.has(s);
  return n !== o ? n ? 1 : -1 : us(t, s);
};
function H(a, e, t) {
  return a && e in a ? a[e] : t;
}
function Un(a) {
  return a !== "BOOLEAN" && a !== "STRING" && a !== "ENUM";
}
function gc(a) {
  return /^FLOAT/.test(a);
}
function St(a) {
  return /^VEC/.test(a);
}
function Mt(a) {
  return /^MAT/.test(a);
}
function Gn(a, e, t, s = null) {
  return Mt(t) || St(t) ? s.fromArray(a, e) : a[e];
}
function ni(a) {
  const { type: e, componentType: t } = a;
  switch (e) {
    case "SCALAR":
      return t === "INT64" ? 0n : 0;
    case "VEC2":
      return new k();
    case "VEC3":
      return new x();
    case "VEC4":
      return new st();
    case "MAT2":
      return new Uo();
    case "MAT3":
      return new Wr();
    case "MAT4":
      return new U();
    case "BOOLEAN":
      return !1;
    case "STRING":
      return "";
    // the final value for enums is a string but are represented as integers
    // during intermediate steps
    case "ENUM":
      return 0;
  }
}
function dr(a, e) {
  if (e == null)
    return !1;
  switch (a) {
    case "SCALAR":
      return typeof e == "number" || typeof e == "bigint";
    case "VEC2":
      return e.isVector2;
    case "VEC3":
      return e.isVector3;
    case "VEC4":
      return e.isVector4;
    case "MAT2":
      return e.isMatrix2;
    case "MAT3":
      return e.isMatrix3;
    case "MAT4":
      return e.isMatrix4;
    case "BOOLEAN":
      return typeof e == "boolean";
    case "STRING":
      return typeof e == "string";
    case "ENUM":
      return typeof e == "number" || typeof e == "bigint";
  }
  throw new Error("ClassProperty: invalid type.");
}
function yt(a, e = null) {
  switch (a) {
    case "INT8":
      return Int8Array;
    case "INT16":
      return Int16Array;
    case "INT32":
      return Int32Array;
    case "INT64":
      return BigInt64Array;
    case "UINT8":
      return Uint8Array;
    case "UINT16":
      return Uint16Array;
    case "UINT32":
      return Uint32Array;
    case "UINT64":
      return BigUint64Array;
    case "FLOAT32":
      return Float32Array;
    case "FLOAT64":
      return Float64Array;
  }
  switch (e) {
    case "BOOLEAN":
      return Uint8Array;
    case "STRING":
      return Uint8Array;
  }
  throw new Error("ClassProperty: invalid type.");
}
function fc(a, e = null) {
  if (a.array) {
    e = e && Array.isArray(e) ? e : [], e.length = a.count;
    for (let t = 0, s = e.length; t < s; t++)
      e[t] = Zt(a, e[t]);
  } else
    e = Zt(a, e);
  return e;
}
function Zt(a, e = null) {
  const t = a.default, s = a.type;
  if (e = e || ni(a), t === null) {
    switch (s) {
      case "SCALAR":
        return 0;
      case "VEC2":
        return e.set(0, 0);
      case "VEC3":
        return e.set(0, 0, 0);
      case "VEC4":
        return e.set(0, 0, 0, 0);
      case "MAT2":
        return e.identity();
      case "MAT3":
        return e.identity();
      case "MAT4":
        return e.identity();
      case "BOOLEAN":
        return !1;
      case "STRING":
        return "";
      case "ENUM":
        return "";
    }
    throw new Error("ClassProperty: invalid type.");
  } else if (Mt(s))
    e.fromArray(t);
  else if (St(s))
    e.fromArray(t);
  else
    return t;
}
function mc(a, e) {
  if (a.noData === null)
    return e;
  const t = a.noData, s = a.type;
  if (Array.isArray(e))
    for (let n = 0, o = e.length; n < o; n++)
      e[n] = i(e[n]);
  else
    e = i(e);
  return e;
  function i(n) {
    return r(n) && (n = Zt(a, n)), n;
  }
  function r(n) {
    if (Mt(s)) {
      const o = n.elements;
      for (let l = 0, c = t.length; l < c; l++)
        if (t[l] !== o[l])
          return !1;
      return !0;
    } else if (St(s)) {
      for (let o = 0, l = t.length; o < l; o++)
        if (t[o] !== n.getComponent(o))
          return !1;
      return !0;
    } else
      return t === n;
  }
}
function bc(a, e) {
  switch (a) {
    case "INT8":
      return Math.max(e / 127, -1);
    case "INT16":
      return Math.max(e, 32767, -1);
    case "INT32":
      return Math.max(e / 2147483647, -1);
    case "INT64":
      return Math.max(Number(e) / 9223372036854776e3, -1);
    // eslint-disable-line no-loss-of-precision
    case "UINT8":
      return e / 255;
    case "UINT16":
      return e / 65535;
    case "UINT32":
      return e / 4294967295;
    case "UINT64":
      return Number(e) / 18446744073709552e3;
  }
}
function Cc(a, e) {
  const {
    type: t,
    componentType: s,
    scale: i,
    offset: r,
    normalized: n
  } = a;
  if (Array.isArray(e))
    for (let h = 0, d = e.length; h < d; h++)
      e[h] = o(e[h]);
  else
    e = o(e);
  return e;
  function o(h) {
    return Mt(t) ? h = c(h) : St(t) ? h = l(h) : h = A(h), h;
  }
  function l(h) {
    return h.x = A(h.x), h.y = A(h.y), "z" in h && (h.z = A(h.z)), "w" in h && (h.w = A(h.w)), h;
  }
  function c(h) {
    const d = h.elements;
    for (let u = 0, p = d.length; u < p; u++)
      d[u] = A(d[u]);
    return h;
  }
  function A(h) {
    return n && (h = bc(s, h)), (n || gc(s)) && (h = h * i + r), h;
  }
}
function Ci(a, e, t = null) {
  if (a.array) {
    Array.isArray(e) || (e = new Array(a.count || 0)), e.length = t !== null ? t : a.count;
    for (let s = 0, i = e.length; s < i; s++)
      dr(a.type, e[s]) || (e[s] = ni(a));
  } else
    dr(a.type, e) || (e = ni(a));
  return e;
}
function $t(a, e) {
  for (const t in e)
    t in a || delete e[t];
  for (const t in a) {
    const s = a[t];
    e[t] = Ci(s, e[t]);
  }
}
function yc(a) {
  switch (a) {
    case "ENUM":
      return 1;
    case "SCALAR":
      return 1;
    case "VEC2":
      return 2;
    case "VEC3":
      return 3;
    case "VEC4":
      return 4;
    case "MAT2":
      return 4;
    case "MAT3":
      return 9;
    case "MAT4":
      return 16;
    // unused
    case "BOOLEAN":
      return -1;
    case "STRING":
      return -1;
    default:
      return -1;
  }
}
class fs {
  constructor(e, t, s = null) {
    this.name = t.name || null, this.description = t.description || null, this.type = t.type, this.componentType = t.componentType || null, this.enumType = t.enumType || null, this.array = t.array || !1, this.count = t.count || 0, this.normalized = t.normalized || !1, this.offset = t.offset || 0, this.scale = H(t, "scale", 1), this.max = H(t, "max", 1 / 0), this.min = H(t, "min", -1 / 0), this.required = t.required || !1, this.noData = H(t, "noData", null), this.default = H(t, "default", null), this.semantic = H(t, "semantic", null), this.enumSet = null, this.accessorProperty = s, s && (this.offset = H(s, "offset", this.offset), this.scale = H(s, "scale", this.scale), this.max = H(s, "max", this.max), this.min = H(s, "min", this.min)), t.type === "ENUM" && (this.enumSet = e[this.enumType], this.componentType === null && (this.componentType = H(this.enumSet, "valueType", "UINT16")));
  }
  // shape the given target to match the data type of the property
  // enums are set to their integer value
  shapeToProperty(e, t = null) {
    return Ci(this, e, t);
  }
  // resolve the given object to the default value for the property for a single element
  // enums are set to a default string
  resolveDefaultElement(e) {
    return Zt(this, e);
  }
  // resolve the target to the default value for the property for every element if it's an array
  // enums are set to a default string
  resolveDefault(e) {
    return fc(this, e);
  }
  // converts any instances of no data to the default value
  resolveNoData(e) {
    return mc(this, e);
  }
  // converts enums integers in the given target to strings
  resolveEnumsToStrings(e) {
    const t = this.enumSet;
    if (this.type === "ENUM")
      if (Array.isArray(e))
        for (let i = 0, r = e.length; i < r; i++)
          e[i] = s(e[i]);
      else
        e = s(e);
    return e;
    function s(i) {
      const r = t.values.find((n) => n.value === i);
      return r === null ? "" : r.name;
    }
  }
  // apply scales
  adjustValueScaleOffset(e) {
    return Un(this.type) ? Cc(this, e) : e;
  }
}
class yi {
  constructor(e, t = {}, s = {}, i = null) {
    this.definition = e, this.class = t[e.class], this.className = e.class, this.enums = s, this.data = i, this.name = "name" in e ? e.name : null, this.properties = null;
  }
  getPropertyNames() {
    return Object.keys(this.class.properties);
  }
  includesData(e) {
    return !!this.definition.properties[e];
  }
  dispose() {
  }
  _initProperties(e = fs) {
    const t = {};
    for (const s in this.class.properties)
      t[s] = new e(this.enums, this.class.properties[s], this.definition.properties[s]);
    this.properties = t;
  }
}
class Ec extends fs {
  constructor(e, t, s = null) {
    super(e, t, s), this.attribute = s?.attribute ?? null;
  }
}
class Ic extends yi {
  constructor(...e) {
    super(...e), this.isPropertyAttributeAccessor = !0, this._initProperties(Ec);
  }
  getData(e, t, s = {}) {
    const i = this.properties;
    $t(i, s);
    for (const r in i)
      s[r] = this.getPropertyValue(r, e, t, s[r]);
    return s;
  }
  getPropertyValue(e, t, s, i = null) {
    if (t >= this.count)
      throw new Error("PropertyAttributeAccessor: Requested index is outside the range of the buffer.");
    const r = this.properties[e], n = r.type;
    if (r) {
      if (!this.definition.properties[e])
        return r.resolveDefault(i);
    } else throw new Error("PropertyAttributeAccessor: Requested class property does not exist.");
    i = r.shapeToProperty(i);
    const o = s.getAttribute(r.attribute.toLowerCase());
    if (Mt(n)) {
      const l = i.elements;
      for (let c = 0, A = l.length; c < A; c < A)
        l[c] = o.getComponent(t, c);
    } else if (St(n))
      i.fromBufferAttribute(o, t);
    else if (n === "SCALAR" || n === "ENUM")
      i = o.getX(t);
    else
      throw new Error("StructuredMetadata.PropertyAttributeAccessor: BOOLEAN and STRING types are not supported by property attributes.");
    return i = r.adjustValueScaleOffset(i), i = r.resolveEnumsToStrings(i), i = r.resolveNoData(i), i;
  }
}
class wc extends fs {
  constructor(e, t, s = null) {
    super(e, t, s), this.values = s?.values ?? null, this.valueLength = yc(this.type), this.arrayOffsets = H(s, "arrayOffsets", null), this.stringOffsets = H(s, "stringOffsets", null), this.arrayOffsetType = H(s, "arrayOffsetType", "UINT32"), this.stringOffsetType = H(s, "stringOffsetType", "UINT32");
  }
  // returns the necessary array length based on the array offsets if present
  getArrayLengthFromId(e, t) {
    let s = this.count;
    if (this.arrayOffsets !== null) {
      const { arrayOffsets: i, arrayOffsetType: r } = this, n = yt(r), o = new n(e[i]);
      s = o[t + 1] - o[t];
    }
    return s;
  }
  // returns the index offset into the data buffer for the given id based on the
  // the array offsets if present
  getIndexOffsetFromId(e, t) {
    let s = t;
    if (this.arrayOffsets) {
      const { arrayOffsets: i, arrayOffsetType: r } = this, n = yt(r);
      s = new n(e[i])[s];
    } else this.array && (s *= this.count);
    return s;
  }
}
class Bc extends yi {
  constructor(...e) {
    super(...e), this.isPropertyTableAccessor = !0, this.count = this.definition.count, this._initProperties(wc);
  }
  getData(e, t = {}) {
    const s = this.properties;
    $t(s, t);
    for (const i in s)
      t[i] = this.getPropertyValue(i, e, t[i]);
    return t;
  }
  // reads an individual element
  _readValueAtIndex(e, t, s, i = null) {
    const r = this.properties[e], { componentType: n, type: o } = r, l = this.data, c = l[r.values], A = yt(n, o), h = new A(c), d = r.getIndexOffsetFromId(l, t);
    if (Un(o) || o === "ENUM")
      return Gn(h, (d + s) * r.valueLength, o, i);
    if (o === "STRING") {
      let u = d + s, p = 0;
      if (r.stringOffsets !== null) {
        const { stringOffsets: b, stringOffsetType: C } = r, y = yt(C), E = new y(l[b]);
        p = E[u + 1] - E[u], u = E[u];
      }
      const g = new Uint8Array(h.buffer, u, p);
      i = new TextDecoder().decode(g);
    } else if (o === "BOOLEAN") {
      const u = d + s, p = Math.floor(u / 8), g = u % 8;
      i = (h[p] >> g & 1) === 1;
    }
    return i;
  }
  // Reads the data for the given table index
  getPropertyValue(e, t, s = null) {
    if (t >= this.count)
      throw new Error("PropertyTableAccessor: Requested index is outside the range of the table.");
    const i = this.properties[e];
    if (i) {
      if (!this.definition.properties[e])
        return i.resolveDefault(s);
    } else throw new Error("PropertyTableAccessor: Requested property does not exist.");
    const r = i.array, n = this.data, o = i.getArrayLengthFromId(n, t);
    if (s = i.shapeToProperty(s, o), r)
      for (let l = 0, c = s.length; l < c; l++)
        s[l] = this._readValueAtIndex(e, t, l, s[l]);
    else
      s = this._readValueAtIndex(e, t, 0, s);
    return s = i.adjustValueScaleOffset(s), s = i.resolveEnumsToStrings(s), s = i.resolveNoData(s), s;
  }
}
const At = /* @__PURE__ */ new _o();
class ur {
  constructor() {
    this._renderer = new Lo(), this._target = new Qi(1, 1), this._texTarget = new Qi(), this._quad = new Pn(new Xr({
      blending: Po,
      blendDst: ko,
      blendSrc: Fo,
      uniforms: {
        map: { value: null },
        pixel: { value: new k() }
      },
      vertexShader: (
        /* glsl */
        `
				void main() {

					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `
				uniform sampler2D map;
				uniform ivec2 pixel;

				void main() {

					gl_FragColor = texelFetch( map, pixel, 0 );

				}
			`
      )
    }));
  }
  // increases the width of the target render target to support more data
  increaseSizeTo(e) {
    this._target.setSize(Math.max(this._target.width, e), 1);
  }
  // read data from the rendered texture asynchronously
  readDataAsync(e) {
    const { _renderer: t, _target: s } = this;
    return t.readRenderTargetPixelsAsync(s, 0, 0, e.length / 4, 1, e);
  }
  // read data from the rendered texture
  readData(e) {
    const { _renderer: t, _target: s } = this;
    t.readRenderTargetPixels(s, 0, 0, e.length / 4, 1, e);
  }
  // render a single pixel from the source at the destination point on the render target
  // takes the texture, pixel to read from, and pixel to render in to
  renderPixelToTarget(e, t, s) {
    const { _renderer: i, _target: r } = this;
    At.min.copy(t), At.max.copy(t), At.max.x += 1, At.max.y += 1, i.initRenderTarget(r), i.copyTextureToTexture(e, r.texture, At, s, 0);
  }
}
const xe = /* @__PURE__ */ new class {
  constructor() {
    let a = null;
    Object.getOwnPropertyNames(ur.prototype).forEach((e) => {
      e !== "constructor" && (this[e] = (...t) => (a = a || new ur(), a[e](...t)));
    });
  }
}(), pr = /* @__PURE__ */ new k(), gr = /* @__PURE__ */ new k(), fr = /* @__PURE__ */ new k();
function Sc(a, e) {
  return e === 0 ? a.getAttribute("uv") : a.getAttribute(`uv${e}`);
}
function Nn(a, e, t = new Array(3)) {
  let s = 3 * e, i = 3 * e + 1, r = 3 * e + 2;
  return a.index && (s = a.index.getX(s), i = a.index.getX(i), r = a.index.getX(r)), t[0] = s, t[1] = i, t[2] = r, t;
}
function Vn(a, e, t, s, i) {
  const [r, n, o] = s, l = Sc(a, e);
  pr.fromBufferAttribute(l, r), gr.fromBufferAttribute(l, n), fr.fromBufferAttribute(l, o), i.set(0, 0, 0).addScaledVector(pr, t.x).addScaledVector(gr, t.y).addScaledVector(fr, t.z);
}
function On(a, e, t, s) {
  const i = a.x - Math.floor(a.x), r = a.y - Math.floor(a.y), n = Math.floor(i * e % e), o = Math.floor(r * t % t);
  return s.set(n, o), s;
}
const mr = /* @__PURE__ */ new k(), br = /* @__PURE__ */ new k(), Cr = /* @__PURE__ */ new k();
class Mc extends fs {
  constructor(e, t, s = null) {
    super(e, t, s), this.channels = H(s, "channels", [0]), this.index = H(s, "index", null), this.texCoord = H(s, "texCoord", null), this.valueLength = parseInt(this.type.replace(/[^0-9]/g, "")) || 1;
  }
  // takes the buffer to read from and the value index to read
  readDataFromBuffer(e, t, s = null) {
    const i = this.type;
    if (i === "BOOLEAN" || i === "STRING")
      throw new Error("PropertyTextureAccessor: BOOLEAN and STRING types not supported.");
    return Gn(e, t * this.valueLength, i, s);
  }
}
class vc extends yi {
  constructor(...e) {
    super(...e), this.isPropertyTextureAccessor = !0, this._asyncRead = !1, this._initProperties(Mc);
  }
  // Reads the full set of property data
  getData(e, t, s, i = {}) {
    const r = this.properties;
    $t(r, i);
    const n = Object.keys(r), o = n.map((l) => i[l]);
    return this.getPropertyValuesAtTexel(n, e, t, s, o), n.forEach((l, c) => i[l] = o[c]), i;
  }
  // Reads the full set of property data asynchronously
  async getDataAsync(e, t, s, i = {}) {
    const r = this.properties;
    $t(r, i);
    const n = Object.keys(r), o = n.map((l) => i[l]);
    return await this.getPropertyValuesAtTexelAsync(n, e, t, s, o), n.forEach((l, c) => i[l] = o[c]), i;
  }
  // Reads values asynchronously
  getPropertyValuesAtTexelAsync(...e) {
    this._asyncRead = !0;
    const t = this.getPropertyValuesAtTexel(...e);
    return this._asyncRead = !1, t;
  }
  // Reads values from the textures synchronously
  getPropertyValuesAtTexel(e, t, s, i, r = []) {
    for (; r.length < e.length; ) r.push(null);
    r.length = e.length, xe.increaseSizeTo(r.length);
    const n = this.data, o = this.definition.properties, l = this.properties, c = Nn(i, t);
    for (let d = 0, u = e.length; d < u; d++) {
      const p = e[d];
      if (!o[p])
        continue;
      const g = l[p], b = n[g.index];
      Vn(i, g.texCoord, s, c, mr), On(mr, b.image.width, b.image.height, br), Cr.set(d, 0), xe.renderPixelToTarget(b, br, Cr);
    }
    const A = new Uint8Array(e.length * 4);
    if (this._asyncRead)
      return xe.readDataAsync(A).then(() => (h.call(this), r));
    return xe.readData(A), h.call(this), r;
    function h() {
      for (let d = 0, u = e.length; d < u; d++) {
        const p = e[d], g = l[p], b = g.type;
        if (r[d] = Ci(g, r[d]), g) {
          if (!o[p]) {
            r[d] = g.resolveDefault(r);
            continue;
          }
        } else throw new Error("PropertyTextureAccessor: Requested property does not exist.");
        const C = g.valueLength * (g.count || 1), y = g.channels.map((B) => A[4 * d + B]), E = g.componentType, m = yt(E, b), I = new m(C);
        if (new Uint8Array(I.buffer).set(y), g.array) {
          const B = r[d];
          for (let w = 0, v = B.length; w < v; w++)
            B[w] = g.readDataFromBuffer(I, w, B[w]);
        } else
          r[d] = g.readDataFromBuffer(I, 0, r[d]);
        r[d] = g.adjustValueScaleOffset(r[d]), r[d] = g.resolveEnumsToStrings(r[d]), r[d] = g.resolveNoData(r[d]);
      }
    }
  }
  // dispose all of the texture data used
  dispose() {
    this.data.forEach((e) => {
      e && (e.dispose(), e.image instanceof ImageBitmap && e.image.close());
    });
  }
}
class yr {
  constructor(e, t, s, i = null, r = null) {
    const {
      schema: n,
      propertyTables: o = [],
      propertyTextures: l = [],
      propertyAttributes: c = []
    } = e, { enums: A, classes: h } = n, d = o.map((g) => new Bc(g, h, A, s));
    let u = [], p = [];
    i && (i.propertyTextures && (u = i.propertyTextures.map((g) => new vc(l[g], h, A, t))), i.propertyAttributes && (p = i.propertyAttributes.map((g) => new Ic(c[g], h, A)))), this.schema = n, this.tableAccessors = d, this.textureAccessors = u, this.attributeAccessors = p, this.object = r, this.textures = t, this.nodeMetadata = i;
  }
  // Property Tables
  /**
   * Returns data from one or more property tables. Pass a single table index and row ID to
   * get one object, or parallel arrays of table indices and row IDs to get an array of
   * results. Each returned object conforms to the structure class referenced in the schema.
   * @param {number|Array<number>} tableIndices Table index or array of table indices.
   * @param {number|Array<number>} ids Row ID or array of row IDs.
   * @param {Object|Array|null} [target=null] Optional target object or array to write into.
   * @returns {Object|Array}
   */
  getPropertyTableData(e, t, s = null) {
    if (!Array.isArray(e))
      s = s || {}, s = this.tableAccessors[e].getData(t, s);
    else {
      s = s || [];
      const i = Math.min(e.length, t.length);
      s.length = i;
      for (let r = 0; r < i; r++) {
        const n = this.tableAccessors[e[r]];
        s[r] = n.getData(t[r], s[r]);
      }
    }
    if (Array.isArray(e) !== Array.isArray(s) || Array.isArray(e) !== Array.isArray(t))
      throw new Error("StructuralMetadata: Scalar and array inputs cannot be mixed.");
    return s;
  }
  /**
   * Returns name and class information for one or more property tables. Defaults to all
   * tables when `tableIndices` is `null`.
   * @param {Array<number>|null} [tableIndices=null]
   * @returns {Array<{name: string, className: string}>|{name: string, className: string}}
   */
  getPropertyTableInfo(e = null) {
    if (e === null && (e = this.tableAccessors.map((t, s) => s)), Array.isArray(e))
      return e.map((t) => {
        const s = this.tableAccessors[t];
        return {
          name: s.name,
          className: s.definition.class
        };
      });
    {
      const t = this.tableAccessors[e];
      return {
        name: t.name,
        className: t.definition.class
      };
    }
  }
  // Property Textures
  /**
   * Returns data from property textures at the given point on the mesh. Takes the triangle
   * index and barycentric coordinate from a raycast result. See `MeshFeatures.getFeatures`
   * for how to obtain these values.
   * @param {number} triangle Triangle index from a raycast hit.
   * @param {Vector3} barycoord Barycentric coordinate of the hit point.
   * @param {Array} [target=[]] Optional target array to write into.
   * @returns {Array}
   */
  getPropertyTextureData(e, t, s = []) {
    const i = this.textureAccessors;
    s.length = i.length;
    for (let r = 0; r < i.length; r++) {
      const n = i[r];
      s[r] = n.getData(e, t, this.object.geometry, s[r]);
    }
    return s;
  }
  /**
   * Returns the same data as `getPropertyTextureData` but performs texture reads
   * asynchronously.
   * @param {number} triangle Triangle index from a raycast hit.
   * @param {Vector3} barycoord Barycentric coordinate of the hit point.
   * @param {Array} [target=[]] Optional target array to write into.
   * @returns {Array}
   */
  async getPropertyTextureDataAsync(e, t, s = []) {
    const i = this.textureAccessors;
    s.length = i.length;
    const r = [];
    for (let n = 0; n < i.length; n++) {
      const o = i[n].getDataAsync(e, t, this.object.geometry, s[n]).then((l) => {
        s[n] = l;
      });
      r.push(o);
    }
    return await Promise.all(r), s;
  }
  /**
   * Returns information about the property texture accessors, including their class names
   * and per-property channel/texcoord mappings.
   * @returns {Array<{name: string, className: string, properties: Object}>}
   */
  getPropertyTextureInfo() {
    return this.textureAccessors;
  }
  // Property Attributes
  /**
   * Returns data stored as property attributes for the given vertex index.
   * @param {number} attributeIndex Vertex index.
   * @param {Array} [target=[]] Optional target array to write into.
   * @returns {Array}
   */
  getPropertyAttributeData(e, t = []) {
    const s = this.attributeAccessors;
    t.length = s.length;
    for (let i = 0; i < s.length; i++) {
      const r = s[i];
      t[i] = r.getData(e, this.object.geometry, t[i]);
    }
    return t;
  }
  /**
   * Returns name and class information for all property attribute accessors.
   * @returns {Array<{name: string, className: string}>}
   */
  getPropertyAttributeInfo() {
    return this.attributeAccessors.map((e) => ({
      name: e.name,
      className: e.definition.class
    }));
  }
  /**
   * Disposes all texture, table, and attribute accessors.
   */
  dispose() {
    this.textureAccessors.forEach((e) => e.dispose()), this.tableAccessors.forEach((e) => e.dispose()), this.attributeAccessors.forEach((e) => e.dispose());
  }
}
const dt = "EXT_structural_metadata";
function xc(a, e = []) {
  var t;
  const s = ((t = a.json.textures) == null ? void 0 : t.length) || 0, i = new Array(s).fill(null);
  return e.forEach(({ properties: r }) => {
    for (const n in r) {
      const { index: o } = r[n];
      i[o] === null && (i[o] = a.loadTexture(o));
    }
  }), Promise.all(i);
}
function Tc(a, e = []) {
  var t;
  const s = ((t = a.json.bufferViews) == null ? void 0 : t.length) || 0, i = new Array(s).fill(null);
  return e.forEach(({ properties: r }) => {
    for (const n in r) {
      const { values: o, arrayOffsets: l, stringOffsets: c } = r[n];
      i[o] === null && (i[o] = a.loadBufferView(o)), i[l] === null && (i[l] = a.loadBufferView(l)), i[c] === null && (i[c] = a.loadBufferView(c));
    }
  }), Promise.all(i);
}
class Qc {
  constructor(e) {
    this.parser = e, this.name = dt;
  }
  async afterRoot({ scene: e, parser: t }) {
    const s = t.json.extensionsUsed;
    if (!s || !s.includes(dt))
      return;
    let i = null, r = t.json.extensions[dt];
    if (r.schemaUri) {
      const { manager: c, path: A, requestHeader: h, crossOrigin: d } = t.options, u = new URL(r.schemaUri, A).toString(), p = new Te(c);
      p.setCrossOrigin(d), p.setResponseType("json"), p.setRequestHeader(h), i = p.loadAsync(u).then((g) => {
        r = { ...r, schema: g };
      });
    }
    const [n, o] = await Promise.all([
      xc(t, r.propertyTextures),
      Tc(t, r.propertyTables),
      i
    ]), l = new yr(r, n, o);
    e.userData.structuralMetadata = l, e.traverse((c) => {
      var A;
      if (t.associations.has(c)) {
        const { meshes: h, primitives: d } = t.associations.get(c), u = (A = t.json.meshes[h]) == null ? void 0 : A.primitives[d];
        if (u && u.extensions && u.extensions[dt]) {
          const p = u.extensions[dt];
          c.userData.structuralMetadata = new yr(r, n, o, p, c);
        } else
          c.userData.structuralMetadata = l;
      }
    });
  }
}
const Er = /* @__PURE__ */ new k(), Ir = /* @__PURE__ */ new k(), wr = /* @__PURE__ */ new k();
function Rc(a) {
  return a.x > a.y && a.x > a.z ? 0 : a.y > a.z ? 1 : 2;
}
class Dc {
  constructor(e, t, s) {
    this.geometry = e, this.textures = t, this.data = s, this._asyncRead = !1, this.featureIds = s.featureIds.map((i) => {
      const { texture: r, ...n } = i, o = {
        label: null,
        propertyTable: null,
        nullFeatureId: null,
        ...n
      };
      return r && (o.texture = {
        texCoord: 0,
        channels: [0],
        ...r
      }), o;
    });
  }
  /**
   * Returns an indexed list of all textures used by features in the extension.
   * @returns {Array<Texture>}
   */
  getTextures() {
    return this.textures;
  }
  /**
   * Returns the feature ID info for each feature set defined on this primitive.
   * @returns {Array<FeatureInfo>}
   */
  getFeatureInfo() {
    return this.featureIds;
  }
  /**
   * Performs the same function as `getFeatures` but reads texture data asynchronously.
   * @param {number} triangle Triangle index from a raycast hit.
   * @param {Vector3} barycoord Barycentric coordinate of the hit point.
   * @returns {Promise<Array<number|null>>}
   */
  getFeaturesAsync(...e) {
    this._asyncRead = !0;
    const t = this.getFeatures(...e);
    return this._asyncRead = !1, t;
  }
  /**
   * Returns the list of feature IDs at the given point on the mesh. Takes the triangle
   * index from a raycast result and a barycentric coordinate. Results are indexed in the
   * same order as the feature info returned by `getFeatureInfo()`.
   * @param {number} triangle Triangle index from a raycast hit.
   * @param {Vector3} barycoord Barycentric coordinate of the hit point.
   * @returns {Array<number|null>}
   */
  getFeatures(e, t) {
    const { geometry: s, textures: i, featureIds: r } = this, n = new Array(r.length).fill(null), o = r.length;
    xe.increaseSizeTo(o);
    const l = Nn(s, e), c = l[Rc(t)];
    for (let d = 0, u = r.length; d < u; d++) {
      const p = r[d], g = "nullFeatureId" in p ? p.nullFeatureId : null;
      if ("texture" in p) {
        const b = i[p.texture.index];
        Vn(s, p.texture.texCoord, t, l, Er), On(Er, b.image.width, b.image.height, Ir), wr.set(d, 0), xe.renderPixelToTarget(i[p.texture.index], Ir, wr);
      } else if ("attribute" in p) {
        const b = s.getAttribute(`_feature_id_${p.attribute}`).getX(c);
        b !== g && (n[d] = b);
      } else {
        const b = c;
        b !== g && (n[d] = b);
      }
    }
    const A = new Uint8Array(o * 4);
    if (this._asyncRead)
      return xe.readDataAsync(A).then(() => (h(), n));
    return xe.readData(A), h(), n;
    function h() {
      const d = new Uint32Array(1);
      for (let u = 0, p = r.length; u < p; u++) {
        const g = r[u], b = "nullFeatureId" in g ? g.nullFeatureId : null;
        if ("texture" in g) {
          const { channels: C } = g.texture, y = C.map((m) => A[4 * u + m]);
          new Uint8Array(d.buffer).set(y);
          const E = d[0];
          E !== b && (n[u] = E);
        }
      }
    }
  }
  /**
   * Disposes all textures used by this instance.
   */
  dispose() {
    this.textures.forEach((e) => {
      e && (e.dispose(), e.image instanceof ImageBitmap && e.image.close());
    });
  }
}
const es = "EXT_mesh_features";
function Br(a, e, t) {
  a.traverse((s) => {
    var i;
    if (e.associations.has(s)) {
      const { meshes: r, primitives: n } = e.associations.get(s), o = (i = e.json.meshes[r]) == null ? void 0 : i.primitives[n];
      o && o.extensions && o.extensions[es] && t(s, o.extensions[es]);
    }
  });
}
class Lc {
  constructor(e) {
    this.parser = e, this.name = es;
  }
  async afterRoot({ scene: e, parser: t }) {
    var s;
    const i = t.json.extensionsUsed;
    if (!i || !i.includes(es))
      return;
    const r = ((s = t.json.textures) == null ? void 0 : s.length) || 0, n = new Array(r).fill(null);
    Br(e, t, (l, { featureIds: c }) => {
      c.forEach((A) => {
        if (A.texture && n[A.texture.index] === null) {
          const h = A.texture.index;
          n[h] = t.loadTexture(h);
        }
      });
    });
    const o = await Promise.all(n);
    Br(e, t, (l, c) => {
      l.userData.meshFeatures = new Dc(l.geometry, o, c);
    });
  }
}
class Fc {
  constructor() {
    this.name = "CESIUM_RTC";
  }
  afterRoot(e) {
    if (e.parser.json.extensions && e.parser.json.extensions.CESIUM_RTC) {
      const { center: t } = e.parser.json.extensions.CESIUM_RTC;
      t && (e.scene.position.x += t[0], e.scene.position.y += t[1], e.scene.position.z += t[2]);
    }
  }
}
class kc {
  constructor(e) {
    e = {
      metadata: !0,
      rtc: !0,
      plugins: [],
      dracoLoader: null,
      ktxLoader: null,
      meshoptDecoder: null,
      autoDispose: !0,
      ...e
    }, this.tiles = null, this.metadata = e.metadata, this.rtc = e.rtc, this.plugins = e.plugins, this.dracoLoader = e.dracoLoader, this.ktxLoader = e.ktxLoader, this.meshoptDecoder = e.meshoptDecoder, this._gltfRegex = /\.(gltf|glb)$/g, this._dracoRegex = /\.drc$/g, this._loader = null;
  }
  init(e) {
    const t = new Ge(e.manager);
    this.dracoLoader && (t.setDRACOLoader(this.dracoLoader), e.manager.addHandler(this._dracoRegex, this.dracoLoader)), this.ktxLoader && t.setKTX2Loader(this.ktxLoader), this.meshoptDecoder && t.setMeshoptDecoder(this.meshoptDecoder), this.rtc && t.register(() => new Fc()), this.metadata && (t.register(() => new Qc()), t.register(() => new Lc())), this.plugins.forEach((s) => t.register(s)), e.manager.addHandler(this._gltfRegex, t), this.tiles = e, this._loader = t;
  }
  dispose() {
    this.tiles.manager.removeHandler(this._gltfRegex), this.tiles.manager.removeHandler(this._dracoRegex), this.autoDispose && (this.ktxLoader.dispose(), this.dracoLoader.dispose());
  }
}
const { clamp: Gh } = et;
new Pn(new Le());
const Pc = new Jr(new Uint8Array([255, 255, 255, 255]), 1, 1);
Pc.needsUpdate = !0;
const Yt = {
  name: "standalone",
  vr: {
    framebufferScaleFactor: 0.9,
    foveation: 1,
    shadowProfile: "reduced"
  },
  tileset: {
    ktxWorkerLimit: 2,
    vrMaxTriangles: 75e4,
    vrErrorTargetFloor: 16,
    vrShadowCasterMode: "near",
    vrMaxShadowCastingTiles: 72,
    vrShadowCasterRadius: 8
  }
}, Vs = {
  name: "pcvr",
  vr: {
    framebufferScaleFactor: 1.15,
    foveation: 0,
    shadowProfile: "full"
  },
  tileset: {
    ktxWorkerLimit: 4,
    vrMaxTriangles: 24e5,
    vrErrorTargetFloor: 4,
    vrShadowCasterMode: "all",
    vrMaxShadowCastingTiles: 256,
    vrShadowCasterRadius: 16
  }
}, Sr = {
  standalone: Yt,
  quest: Yt,
  mobile: Yt,
  pcvr: Vs,
  desktop: Vs,
  high: Vs
};
function _c() {
  if (typeof navigator > "u") return "standalone";
  const a = navigator.userAgent || "", e = navigator.platform || "", t = navigator.maxTouchPoints > 0, s = /OculusBrowser|Quest|Meta Quest|Horizon/i.test(a), i = /Android|Mobile|iPhone|iPad|iPod/i.test(a) || /MacIntel/i.test(e) && t;
  return s || i ? "standalone" : "pcvr";
}
function Hn(a = "auto") {
  const e = String(a || "auto").toLowerCase();
  return e === "auto" ? Sr[_c()] : Sr[e] || Yt;
}
function Uc(a = {}, e = "auto", t = {}) {
  const s = Hn(e);
  return {
    ...a,
    performanceProfile: e || "auto",
    resolvedPerformanceProfile: s.name,
    framebufferScaleFactor: typeof t.framebufferScaleFactor == "number" ? a.framebufferScaleFactor : s.vr.framebufferScaleFactor,
    foveation: typeof t.foveation == "number" ? a.foveation : s.vr.foveation,
    shadowProfile: typeof t.shadowProfile == "string" ? a.shadowProfile : s.vr.shadowProfile
  };
}
function Gc(a = {}) {
  const e = Hn(
    a.vrPerformanceProfile || a.resolvedVRPerformanceProfile || "auto"
  ), t = e.tileset;
  return {
    resolvedVRPerformanceProfile: e.name,
    ktxWorkerLimit: typeof a.ktxWorkerLimit == "number" && a.ktxWorkerLimit > 0 ? Math.floor(a.ktxWorkerLimit) : t.ktxWorkerLimit,
    vrMaxTriangles: typeof a.vrMaxTriangles == "number" && a.vrMaxTriangles > 0 ? a.vrMaxTriangles : t.vrMaxTriangles,
    vrErrorTargetFloor: typeof a.vrErrorTargetFloor == "number" && a.vrErrorTargetFloor >= 0 ? a.vrErrorTargetFloor : t.vrErrorTargetFloor,
    vrShadowCasterMode: ["all", "near", "none"].includes(a.vrShadowCasterMode) ? a.vrShadowCasterMode : t.vrShadowCasterMode,
    vrMaxShadowCastingTiles: typeof a.vrMaxShadowCastingTiles == "number" && a.vrMaxShadowCastingTiles > 0 ? Math.floor(a.vrMaxShadowCastingTiles) : t.vrMaxShadowCastingTiles,
    vrShadowCasterRadius: typeof a.vrShadowCasterRadius == "number" && a.vrShadowCasterRadius > 0 ? a.vrShadowCasterRadius : t.vrShadowCasterRadius
  };
}
const Nc = "https://unpkg.com/three@0.179.1/examples/jsm/libs/draco/gltf/", Vc = "https://unpkg.com/three@0.179.1/examples/jsm/libs/basis/", Mr = new f.Vector3(), vr = new f.Quaternion();
class Oc extends lc {
  preprocessTileset(e, t, s = null) {
    const i = e.asset?.version || "1.0", [r] = i.split(".").map((o) => parseInt(o, 10));
    console.assert(
      r <= 1,
      "TilesRenderer: asset.version is expected to be a 1.x or a compatible version."
    );
    let n = t.replace(/\/[^/]*$/, "");
    n = new URL(n, window.location.href).toString(), this.preprocessNode(e.root, n, s);
  }
}
class Hc {
  constructor(e = null, t = null) {
    this.renderer = e, this.camera = t, this.activeTilesets = /* @__PURE__ */ new Set(), this.tilesetStates = /* @__PURE__ */ new Map(), this.pendingQueueTasks = [], this.xrSession = null, this._resolutionVec2 = new f.Vector2(), this.lastUpdateDurationMs = 0, this.maxUpdateDurationMs = 0, this.updateRunCount = 0, this.updateGatedCount = 0;
  }
  clamp(e, t, s) {
    return Math.min(s, Math.max(t, e));
  }
  setRenderer(e) {
    this.renderer = e, this.updateResolution();
  }
  setXRSession(e = null) {
    e !== this.xrSession && (this.xrSession = e, _e.setXRSession(e));
  }
  getResolutionConfig(e) {
    return {
      usePerEyeResolution: e?.usePerEyeResolution !== !1,
      useDrawingBufferResolution: e?.useDrawingBufferResolution !== !1,
      // Default false: the XR ArrayCamera carries a union projection spanning
      // both eyes (three r179), so a single traversal covers VR at half the
      // cost of registering each eye camera.
      usePerEyeCameras: e?.usePerEyeCameras === !0
    };
  }
  getDesiredTraversalCameras(e, t = {}) {
    return e ? t?.usePerEyeCameras === !0 && e.isArrayCamera && Array.isArray(e.cameras) && e.cameras.length > 0 ? e.cameras.filter(Boolean) : [e] : [];
  }
  syncTilesetTraversalCameras(e, t, s = {}) {
    if (!e || !t)
      return [];
    const i = this.getDesiredTraversalCameras(t, s);
    return (Array.isArray(e.cameras) ? [...e.cameras] : []).forEach((n) => {
      i.includes(n) || e.deleteCamera(n);
    }), i.forEach((n) => {
      e.setCamera(n);
    }), i;
  }
  setCamera(e) {
    const t = this.camera;
    this.camera = e, this.activeTilesets.forEach((s) => {
      const i = this.tilesetStates.get(s), r = this.getResolutionConfig(i);
      if (t && t !== this.camera && this.getDesiredTraversalCameras(t, r).forEach((o) => {
        s.deleteCamera(o);
      }), this.camera) {
        const n = this.syncTilesetTraversalCameras(s, this.camera, r);
        this.setResolutionForCamera(s, this.camera, n, r), i && (i.traversalCameras = n, i.syncedTopCamera = this.camera, i.lastResolutionWidth = -1, i.lastResolutionHeight = -1);
      }
    });
  }
  setResolutionForCamera(e, t, s = null, i = {}) {
    if (!e || !t || !this.renderer)
      return;
    const r = i?.usePerEyeResolution !== !1, n = i?.useDrawingBufferResolution !== !1, o = Array.isArray(s) && s.length > 0 ? s : this.getDesiredTraversalCameras(t, i);
    if (o.length !== 0) {
      if (r && t.isArrayCamera) {
        let l = !1;
        if (o.forEach((c) => {
          const A = c?.viewport;
          A && Number.isFinite(A.z) && Number.isFinite(A.w) && A.z > 0 && A.w > 0 && (e.setResolution(c, A.z, A.w), l = !0);
        }), l)
          return;
      }
      if (n && this.renderer.getDrawingBufferSize) {
        this.renderer.getDrawingBufferSize(this._resolutionVec2), o.forEach((l) => {
          e.setResolution(l, this._resolutionVec2.x, this._resolutionVec2.y);
        });
        return;
      }
      o.forEach((l) => {
        e.setResolutionFromRenderer(l, this.renderer);
      });
    }
  }
  getQueueSchedulingCallback() {
    return (e) => {
      this.pendingQueueTasks.push(e);
    };
  }
  configureScheduling(e) {
    if (!e) return;
    const t = this.getQueueSchedulingCallback();
    e.downloadQueue && (e.downloadQueue.schedulingCallback = t), e.parseQueue && (e.parseQueue.schedulingCallback = t), e.processNodeQueue && (e.processNodeQueue.schedulingCallback = t);
  }
  updateResolution() {
    !this.renderer || !this.camera || this.activeTilesets.forEach((e) => {
      const t = this.tilesetStates.get(e), s = this.getResolutionConfig(t), i = this.syncTilesetTraversalCameras(e, this.camera, s);
      this.setResolutionForCamera(e, this.camera, i, s), t && (t.traversalCameras = i, t.syncedTopCamera = this.camera, t.lastResolutionWidth = -1, t.lastResolutionHeight = -1);
    });
  }
  runScheduledQueueTasks(e = {}) {
    if (this.pendingQueueTasks.length === 0)
      return;
    const s = Number.isFinite(e?.maxTasks) && e.maxTasks > 0 ? Math.max(1, Math.floor(e.maxTasks)) : 1 / 0, i = Number.isFinite(e?.timeBudgetMs) && e.timeBudgetMs >= 0, r = i ? e.timeBudgetMs : 1 / 0, n = i ? performance.now() : 0;
    let o = 0;
    for (; this.pendingQueueTasks.length > 0 && o < s && !(i && performance.now() - n >= r); ) {
      const l = this.pendingQueueTasks.shift();
      typeof l == "function" && l(), o += 1;
    }
  }
  isValidBox3(e) {
    return !e || !(e instanceof f.Box3) || e.isEmpty() ? !1 : Number.isFinite(e.min.x) && Number.isFinite(e.min.y) && Number.isFinite(e.min.z) && Number.isFinite(e.max.x) && Number.isFinite(e.max.y) && Number.isFinite(e.max.z);
  }
  normalizeUpAxis(e = "+Y") {
    const t = String(e || "+Y").trim().toUpperCase();
    switch (t) {
      case "+Z":
      case "-Z":
      case "+X":
      case "-X":
      case "-Y":
      case "+Y":
        return t;
      default:
        return "+Y";
    }
  }
  resolveGeospatialReorientationMode(e = void 0) {
    if (e === !1) return "off";
    if (typeof e == "string") {
      const t = e.trim().toLowerCase();
      if (t === "off" || t === "none" || t === "false") return "off";
      if (t === "force" || t === "always") return "force";
    }
    return "auto";
  }
  getRootTransformArray(e) {
    const t = e?.rootTileset?.root?.transform;
    return !Array.isArray(t) || t.length !== 16 ? null : t.every((s) => Number.isFinite(s)) ? t : null;
  }
  getRootTransformUpVector(e) {
    const t = this.getRootTransformArray(e);
    if (!t) return null;
    const s = new f.Vector3(t[8], t[9], t[10]);
    return s.lengthSq() <= 1e-12 ? null : s.normalize();
  }
  isLikelyGeospatialTileset(e) {
    const t = e?.rootTileset;
    if (!t) return !1;
    const s = t.properties;
    if (s && typeof s == "object") {
      const r = Object.keys(s).map((n) => n.toLowerCase());
      if (r.includes("latitude") && r.includes("longitude"))
        return !0;
    }
    const i = this.getRootTransformArray(e);
    if (i) {
      const r = i[12], n = i[13], o = i[14];
      if (Number.isFinite(r) && Number.isFinite(n) && Number.isFinite(o) && Math.hypot(r, n, o) > 1e6)
        return !0;
    }
    return !1;
  }
  applyGeospatialReorientation(e) {
    if (!e?.geoGroup || !e?.upGroup || !e?.tileset)
      return !1;
    const t = e.geospatialReorientationMode || "auto";
    if (!(t === "force" || t === "auto" && this.isLikelyGeospatialTileset(e.tileset)))
      return e.geoGroup.quaternion.identity(), e.geoGroup.updateMatrixWorld(!0), e.hasGeospatialReoriented = !1, !1;
    const i = this.getRootTransformUpVector(e.tileset);
    if (!i)
      return !1;
    const r = i.clone().applyQuaternion(e.upGroup.quaternion);
    if (r.lengthSq() <= 1e-12)
      return !1;
    r.normalize();
    const n = new f.Vector3(0, 1, 0), o = new f.Quaternion().setFromUnitVectors(r, n);
    return e.geoGroup.quaternion.copy(o), e.geoGroup.updateMatrixWorld(!0), e.hasGeospatialReoriented = !0, !0;
  }
  setUpAxis(e, t = "+Y") {
    if (!e) return;
    switch (e.rotation.set(0, 0, 0), this.normalizeUpAxis(t)) {
      case "+Z":
        e.rotation.x = -Math.PI / 2;
        break;
      case "-Z":
        e.rotation.x = Math.PI / 2;
        break;
      case "+X":
        e.rotation.z = Math.PI / 2;
        break;
      case "-X":
        e.rotation.z = -Math.PI / 2;
        break;
      case "-Y":
        e.rotation.x = Math.PI;
        break;
    }
    e.updateMatrixWorld(!0);
  }
  configureGltfExtensions(e, t = {}) {
    if (t.enableGltfExtensions === !1)
      return null;
    const s = cs(t, {
      dracoDecoderPath: Nc,
      ktx2TranscoderPath: Vc
    }), i = new rn();
    i.setDecoderPath(s.dracoDecoderPath);
    const r = new te();
    r.setTranscoderPath(s.ktx2TranscoderPath), Number.isFinite(t.ktxWorkerLimit) && t.ktxWorkerLimit > 0 && r.setWorkerLimit(Math.max(1, Math.floor(t.ktxWorkerLimit))), this.renderer && r.detectSupport(this.renderer);
    const n = new kc({
      rtc: !0,
      dracoLoader: i,
      ktxLoader: r
    });
    return e.registerPlugin(n), { dracoLoader: i, ktxLoader: r, gltfExtensionsPlugin: n };
  }
  convertBasicMaterial(e, t = "standard") {
    if (!e?.isMeshBasicMaterial)
      return e;
    const s = {
      color: e.color ? e.color.clone() : new f.Color(16777215),
      map: e.map || null,
      alphaMap: e.alphaMap || null,
      transparent: e.transparent,
      opacity: e.opacity,
      alphaTest: e.alphaTest,
      depthTest: e.depthTest,
      depthWrite: e.depthWrite,
      side: e.side,
      vertexColors: e.vertexColors === !0,
      wireframe: e.wireframe,
      fog: e.fog
    }, i = t === "lambert" ? new f.MeshLambertMaterial(s) : new f.MeshStandardMaterial(s);
    return i.name = e.name || i.name, i.isMeshStandardMaterial && (i.roughness = 0.92, i.metalness = 0.03), i.toneMapped = e.toneMapped, i.visible = e.visible, i.needsUpdate = !0, i;
  }
  normalizeTileModel(e, t = null) {
    if (!e?.traverse) return;
    const s = t?.tileCastShadow !== !1, i = t?.tileReceiveShadow !== !1, r = t?.tileLighting === "lambert" ? "lambert" : "standard", n = /* @__PURE__ */ new WeakMap();
    e.traverse((o) => {
      if (!o?.isMesh) return;
      if (o.geometry?.isBufferGeometry && !o.geometry.getAttribute("normal") && o.geometry.getAttribute("position"))
        try {
          o.geometry.computeVertexNormals();
        } catch {
        }
      o.castShadow = s, o.userData.belowTileCastShadowDefault = s, o.receiveShadow = i;
      const l = (c, A = -1) => {
        if (!c) return;
        let h = c;
        c.isMeshBasicMaterial && (n.has(c) ? h = n.get(c) : (h = this.convertBasicMaterial(c, r), n.set(c, h))), h.map && (h.map.colorSpace = f.SRGBColorSpace, h.map.needsUpdate = !0, this.renderer?.initTexture?.(h.map)), h.needsUpdate = !0, A >= 0 && Array.isArray(o.material) ? o.material[A] = h : o.material = h;
      };
      Array.isArray(o.material) ? o.material.forEach((c, A) => l(c, A)) : l(o.material);
    });
  }
  updateBoundsAndCenter(e) {
    if (!e) return !1;
    const { tileset: t, tilesGroup: s, upGroup: i, geoGroup: r, modelGroup: n, autoCenter: o } = e, l = new f.Box3(), c = t.getBoundingBox(l) && this.isValidBox3(l);
    if (o && c && !e.hasAutoCentered) {
      const h = l.getCenter(new f.Vector3());
      s.position.set(-h.x, -h.y, -h.z), s.updateMatrixWorld(!0), e.hasAutoCentered = !0;
    }
    n.updateMatrixWorld(!0);
    const A = new f.Box3().setFromObject(n);
    if (this.isValidBox3(A))
      return n.userData.boundingBox = A, !0;
    if (c) {
      const h = l.clone(), d = new f.Matrix4().multiplyMatrices(r.matrix, i.matrix).multiply(s.matrix);
      if (h.applyMatrix4(d), this.isValidBox3(h))
        return n.userData.boundingBox = h, !0;
    }
    return !1;
  }
  getActiveTriangleBudget(e, t = !1) {
    return e ? t ? e.vrMaxTriangles || e.maxTriangles || null : e.maxTriangles || null : null;
  }
  setSceneCastShadow(e, t) {
    e?.traverse && e.traverse((s) => {
      s?.isMesh && (s.castShadow = t);
    });
  }
  _restoreTileShadowCasters(e) {
    e?.loadedTileScenes && (e.loadedTileScenes.forEach((t) => {
      this.setSceneCastShadow(t, e.tileCastShadow !== !1);
    }), e.shadowCasterTiles.clear(), e.shadowCastersLimited = !1);
  }
  _updateTileShadowCasters(e, t, s, i = !1) {
    if (!e?.loadedTileScenes || e.vrShadowCasterMode === "all") {
      !i && e?.shadowCastersLimited && this._restoreTileShadowCasters(e);
      return;
    }
    if (!i) {
      e.shadowCastersLimited && this._restoreTileShadowCasters(e);
      return;
    }
    if (e.tileCastShadow === !1 || e.vrShadowCasterMode === "none") {
      e.shadowCastersLimited || (e.loadedTileScenes.forEach((c) => this.setSceneCastShadow(c, !1)), e.shadowCastersLimited = !0), e.shadowCasterTiles.forEach((c) => {
        c?.engineData?.scene && this.setSceneCastShadow(c.engineData.scene, !1);
      }), e.shadowCasterTiles = /* @__PURE__ */ new Set();
      return;
    }
    if (s - e.lastShadowCasterUpdateMs < e.shadowCasterUpdateIntervalMs)
      return;
    e.lastShadowCasterUpdateMs = s;
    const r = e.vrShadowCasterRadius, n = Number.isFinite(r) && r > 0 ? r * r : 1 / 0, o = [];
    e.tileset.visibleTiles.forEach((c) => {
      const A = c?.engineData?.scene;
      if (!A) return;
      const h = Number.isFinite(c.traversal?.distanceFromCamera) ? c.traversal.distanceFromCamera : 1 / 0;
      h * h > n || o.push({ tile: c, scene: A, distance: h });
    }), o.sort((c, A) => c.distance - A.distance);
    const l = new Set(
      o.slice(0, e.vrMaxShadowCastingTiles).map(({ tile: c }) => c)
    );
    e.shadowCastersLimited || (e.loadedTileScenes.forEach((c) => this.setSceneCastShadow(c, !1)), e.shadowCastersLimited = !0), e.shadowCasterTiles.forEach((c) => {
      !l.has(c) && c?.engineData?.scene && this.setSceneCastShadow(c.engineData.scene, !1);
    }), l.forEach((c) => {
      e.shadowCasterTiles.has(c) || this.setSceneCastShadow(c.engineData.scene, !0);
    }), e.shadowCasterTiles = l, e.shadowCastersLimited = !0;
  }
  applyTriangleBudget(e, t = !1) {
    const s = this.getActiveTriangleBudget(e, t);
    if (!s || !this.renderer?.info?.render)
      return;
    const i = this.renderer.info.render.triangles;
    if (!Number.isFinite(i) || i <= 0)
      return;
    const { tileset: r, minErrorTarget: n, maxErrorTarget: o } = e, l = s * 1.08, c = s * 0.75;
    let A = r.errorTarget;
    i > l ? A = Math.min(o, A * 1.2 + 0.5) : i < c && (A = Math.max(n, A * 0.9)), t && e.vrErrorTargetFloor > 0 && (A = Math.max(A, e.vrErrorTargetFloor)), Math.abs(A - r.errorTarget) > 0.05 && (r.errorTarget = A);
  }
  createAdaptiveState(e, t, s, i) {
    if (t.adaptiveQuality === !1)
      return null;
    const r = typeof t.errorTarget == "number" && t.errorTarget > 0 ? t.errorTarget : typeof e.errorTarget == "number" && e.errorTarget > 0 ? e.errorTarget : 16, n = this.clamp(
      typeof t.adaptiveMovingErrorTarget == "number" ? t.adaptiveMovingErrorTarget : Math.max(r * 2, r + 7),
      s,
      i
    ), o = this.clamp(
      typeof t.adaptiveStillErrorTarget == "number" ? t.adaptiveStillErrorTarget : Math.max(s, r * 0.75),
      s,
      i
    ), l = typeof t.maxTilesProcessed == "number" && t.maxTilesProcessed > 0 ? t.maxTilesProcessed : typeof e.maxTilesProcessed == "number" && e.maxTilesProcessed > 0 ? e.maxTilesProcessed : 224, c = Math.max(8, Math.round(
      typeof t.adaptiveMinTilesProcessed == "number" ? t.adaptiveMinTilesProcessed : 24
    )), A = Math.max(c, Math.round(
      typeof t.adaptiveMaxTilesProcessed == "number" ? t.adaptiveMaxTilesProcessed : Math.max(l, 512)
    )), h = this.clamp(
      Math.round(
        typeof t.adaptiveMovingMaxTilesProcessed == "number" ? t.adaptiveMovingMaxTilesProcessed : l * 0.25
      ),
      c,
      A
    ), d = this.clamp(
      Math.round(
        typeof t.adaptiveStillMaxTilesProcessed == "number" ? t.adaptiveStillMaxTilesProcessed : l
      ),
      c,
      A
    ), u = this.clamp(
      typeof t.adaptiveFastMovingErrorTarget == "number" ? t.adaptiveFastMovingErrorTarget : Math.max(n * 1.35, n + 6),
      s,
      i
    ), p = this.clamp(
      Math.round(
        typeof t.adaptiveFastMovingMaxTilesProcessed == "number" ? t.adaptiveFastMovingMaxTilesProcessed : h * 0.4
      ),
      c,
      A
    );
    return {
      linearSpeedThreshold: typeof t.adaptiveLinearSpeedThreshold == "number" && t.adaptiveLinearSpeedThreshold > 0 ? t.adaptiveLinearSpeedThreshold : 0.12,
      fastLinearSpeedThreshold: typeof t.adaptiveFastLinearSpeedThreshold == "number" && t.adaptiveFastLinearSpeedThreshold > 0 ? t.adaptiveFastLinearSpeedThreshold : 0.85,
      angularSpeedThreshold: typeof t.adaptiveAngularSpeedThreshold == "number" && t.adaptiveAngularSpeedThreshold > 0 ? t.adaptiveAngularSpeedThreshold : 0.4,
      settleDelayMs: typeof t.adaptiveSettleDelayMs == "number" && t.adaptiveSettleDelayMs >= 0 ? t.adaptiveSettleDelayMs : 450,
      errorLerp: this.clamp(
        typeof t.adaptiveErrorLerp == "number" ? t.adaptiveErrorLerp : 0.12,
        0.02,
        1
      ),
      movingErrorTarget: n,
      fastMovingErrorTarget: u,
      stillErrorTarget: o,
      minTilesProcessed: c,
      maxTilesProcessed: A,
      movingTilesProcessed: h,
      fastMovingTilesProcessed: p,
      stillTilesProcessed: d,
      lastSampleTimeMs: 0,
      lastMovementTimeMs: 0,
      lastPosition: new f.Vector3(),
      lastQuaternion: new f.Quaternion(),
      samplePosition: new f.Vector3(),
      sampleQuaternion: new f.Quaternion(),
      initialized: !1
    };
  }
  applyAdaptiveQuality(e, t, s = !1) {
    if (!e?.adaptive || !t)
      return;
    const { adaptive: i, tileset: r, minErrorTarget: n, maxErrorTarget: o } = e, l = performance.now();
    if (t.updateMatrixWorld?.(!0), t.getWorldPosition(i.samplePosition), t.getWorldQuaternion(i.sampleQuaternion), !i.initialized) {
      i.lastSampleTimeMs = l, i.lastMovementTimeMs = l, i.lastPosition.copy(i.samplePosition), i.lastQuaternion.copy(i.sampleQuaternion), i.initialized = !0;
      return;
    }
    const c = Math.max((l - i.lastSampleTimeMs) / 1e3, 1e-6), A = i.samplePosition.distanceTo(i.lastPosition), h = this.clamp(Math.abs(i.sampleQuaternion.dot(i.lastQuaternion)), -1, 1), d = 2 * Math.acos(h), u = A / c, p = d / c, g = u > i.linearSpeedThreshold, b = p > i.angularSpeedThreshold, C = u > i.fastLinearSpeedThreshold;
    (g || b) && (i.lastMovementTimeMs = l);
    const E = l - i.lastMovementTimeMs >= i.settleDelayMs;
    let m = i.stillErrorTarget, I = i.stillTilesProcessed;
    E || (C ? (m = i.fastMovingErrorTarget, I = i.fastMovingTilesProcessed) : (m = i.movingErrorTarget, I = i.movingTilesProcessed));
    const B = this.getActiveTriangleBudget(e, s);
    if (B && this.renderer?.info?.render) {
      const v = this.renderer.info.render.triangles;
      if (Number.isFinite(v) && v > 0) {
        const M = B * 1.08, S = B * 0.75;
        v > M ? (m = Math.max(m, m * 1.2 + 0.5), I = Math.max(i.minTilesProcessed, Math.round(I * 0.85))) : v < S && E && (m *= 0.92, I = Math.min(i.maxTilesProcessed, Math.round(I * 1.08)));
      }
    }
    s && e.vrErrorTargetFloor > 0 && (m = Math.max(m, e.vrErrorTargetFloor)), m = this.clamp(m, n, o), I = this.clamp(
      Math.round(I),
      i.minTilesProcessed,
      i.maxTilesProcessed
    );
    const w = r.errorTarget + (m - r.errorTarget) * i.errorLerp;
    Math.abs(w - r.errorTarget) > 0.04 && (r.errorTarget = w), typeof r.maxTilesProcessed == "number" && Math.abs(r.maxTilesProcessed - I) >= 1 && (r.maxTilesProcessed = I), i.lastSampleTimeMs = l, i.lastPosition.copy(i.samplePosition), i.lastQuaternion.copy(i.sampleQuaternion);
  }
  applyOptions(e, t) {
    if (!t)
      return;
    const {
      errorTarget: s,
      maxDepth: i,
      loadSiblings: r,
      loadAncestors: n,
      optimizedLoadStrategy: o,
      maxTilesProcessed: l,
      fetchOptions: c
    } = t;
    typeof s == "number" && (e.errorTarget = s), typeof i == "number" && (e.maxDepth = i), typeof r == "boolean" && (e.loadSiblings = r), typeof n == "boolean" ? e.loadAncestors = n : typeof o == "boolean" && (e.loadAncestors = !o), typeof l == "number" && (e.maxTilesProcessed = l), c && typeof c == "object" && (e.fetchOptions = c);
  }
  load(e, t = {}) {
    return new Promise((s, i) => {
      const r = new Oc(e), n = Gc(t);
      r.registerPlugin(new Ac()), this.configureScheduling(r), this.applyOptions(r, t), this.configureGltfExtensions(r, {
        ...t,
        ktxWorkerLimit: n.ktxWorkerLimit
      });
      const o = new f.Group(), l = new f.Group(), c = new f.Group();
      o.add(l), l.add(c);
      const A = r.group;
      c.add(A), this.setUpAxis(c, t.up || "+Y");
      const h = {
        tileset: r,
        modelGroup: o,
        geoGroup: l,
        upGroup: c,
        tilesGroup: A,
        autoCenter: t.autoCenter !== !1,
        hasAutoCentered: !1,
        geospatialReorientationMode: this.resolveGeospatialReorientationMode(t.geospatialReorientation),
        hasGeospatialReoriented: !1,
        maxTriangles: typeof t.maxTriangles == "number" && t.maxTriangles > 0 ? t.maxTriangles : null,
        resolvedVRPerformanceProfile: n.resolvedVRPerformanceProfile,
        vrMaxTriangles: n.vrMaxTriangles,
        minErrorTarget: typeof t.minErrorTarget == "number" && t.minErrorTarget > 0 ? t.minErrorTarget : 2,
        maxErrorTarget: typeof t.maxErrorTarget == "number" && t.maxErrorTarget > 0 ? t.maxErrorTarget : 64,
        usePerEyeResolution: t.usePerEyeResolution !== !1,
        useDrawingBufferResolution: t.useDrawingBufferResolution !== !1,
        usePerEyeCameras: t.usePerEyeCameras === !0,
        tileCastShadow: t.tileCastShadow !== !1,
        tileReceiveShadow: t.tileReceiveShadow !== !1,
        tileLighting: t.tileLighting === "lambert" ? "lambert" : "standard",
        vrShadowCasterMode: n.vrShadowCasterMode,
        vrMaxShadowCastingTiles: n.vrMaxShadowCastingTiles,
        vrShadowCasterRadius: n.vrShadowCasterRadius,
        shadowCasterUpdateIntervalMs: typeof t.shadowCasterUpdateIntervalMs == "number" && t.shadowCasterUpdateIntervalMs >= 0 ? t.shadowCasterUpdateIntervalMs : 180,
        lastShadowCasterUpdateMs: 0,
        loadedTileScenes: /* @__PURE__ */ new Set(),
        shadowCasterTiles: /* @__PURE__ */ new Set(),
        shadowCastersLimited: !1,
        vrErrorTargetFloor: n.vrErrorTargetFloor,
        vrMaxDepth: typeof t.vrMaxDepth == "number" && t.vrMaxDepth > 0 ? Math.floor(t.vrMaxDepth) : null,
        desktopMaxDepth: null,
        boundsUpdateIntervalMs: typeof t.boundsUpdateIntervalMs == "number" && t.boundsUpdateIntervalMs >= 0 ? t.boundsUpdateIntervalMs : 500,
        lastBoundsUpdateMs: 0,
        traversalCameras: [],
        syncedTopCamera: null,
        lastResolutionWidth: -1,
        lastResolutionHeight: -1,
        idle: {
          enabled: t.idleGating !== !1,
          posEps: typeof t.idlePositionEpsilon == "number" && t.idlePositionEpsilon > 0 ? t.idlePositionEpsilon : 0.02,
          angEps: typeof t.idleAngleEpsilon == "number" && t.idleAngleEpsilon > 0 ? t.idleAngleEpsilon : 0.01,
          heartbeatMs: typeof t.idleHeartbeatMs == "number" && t.idleHeartbeatMs >= 0 ? t.idleHeartbeatMs : 250,
          lastPos: new f.Vector3(),
          lastQuat: new f.Quaternion(),
          lastRealUpdateMs: 0,
          initialized: !1,
          forceUpdate: !0
        },
        adaptive: null,
        boundsDirty: !0,
        onLoadModel: null,
        onDisposeModel: null,
        onNeedsUpdate: null
      };
      if (h.adaptive = this.createAdaptiveState(r, t, h.minErrorTarget, h.maxErrorTarget), this.camera) {
        const b = this.getResolutionConfig(h), C = this.syncTilesetTraversalCameras(r, this.camera, b);
        this.setResolutionForCamera(r, this.camera, C, b);
      }
      h.onLoadModel = (b) => {
        b?.scene && (this.normalizeTileModel(b.scene, h), h.loadedTileScenes.add(b.scene), h.shadowCastersLimited && this.setSceneCastShadow(b.scene, !1)), h.boundsDirty = !0;
      }, r.addEventListener("load-model", h.onLoadModel), h.onDisposeModel = (b) => {
        b?.scene && h.loadedTileScenes.delete(b.scene), b?.tile && h.shadowCasterTiles.delete(b.tile);
      }, r.addEventListener("dispose-model", h.onDisposeModel), h.onNeedsUpdate = () => {
        h.idle.forceUpdate = !0;
      }, r.addEventListener("needs-update", h.onNeedsUpdate);
      let d = null;
      const u = () => {
        r.removeEventListener("load-tileset", p), r.removeEventListener("load-error", g), d && t.signal && t.signal.removeEventListener("abort", d);
      }, p = () => {
        u(), this.applyGeospatialReorientation(h), this.updateBoundsAndCenter(h), this.activeTilesets.add(r), this.tilesetStates.set(r, h), s({ group: o, tileset: r });
      }, g = (b) => {
        u(), r.removeEventListener("load-model", h.onLoadModel), r.removeEventListener("dispose-model", h.onDisposeModel), r.removeEventListener("needs-update", h.onNeedsUpdate), r.dispose(), i(b?.error || new Error("Tileset failed to load"));
      };
      if (r.addEventListener("load-tileset", p), r.addEventListener("load-error", g), t.signal && (d = () => {
        u(), r.removeEventListener("load-model", h.onLoadModel), r.removeEventListener("dispose-model", h.onDisposeModel), r.removeEventListener("needs-update", h.onNeedsUpdate), r.dispose(), i(new Error("Loading cancelled"));
      }, t.signal.addEventListener("abort", d), t.signal.aborted)) {
        d();
        return;
      }
      r.update();
    });
  }
  _isTilesetBusy(e) {
    return !!(e.downloadQueue?.running || e.parseQueue?.running || e.processNodeQueue?.running || this.pendingQueueTasks.length > 0);
  }
  _shouldRunTilesUpdate(e, t, s) {
    const i = e.idle;
    if (!i || !i.enabled || i.forceUpdate || !i.initialized || this._isTilesetBusy(e.tileset) || s - i.lastRealUpdateMs >= i.heartbeatMs)
      return !0;
    if (!t)
      return !1;
    if (t.getWorldPosition(Mr), t.getWorldQuaternion(vr), Mr.distanceToSquared(i.lastPos) > i.posEps * i.posEps)
      return !0;
    const r = Math.min(1, Math.abs(vr.dot(i.lastQuat)));
    return 2 * Math.acos(r) > i.angEps;
  }
  _markTilesUpdateRan(e, t, s) {
    const i = e.idle;
    i && (t && (t.getWorldPosition(i.lastPos), t.getWorldQuaternion(i.lastQuat), i.initialized = !0), i.lastRealUpdateMs = s, i.forceUpdate = !1);
  }
  _syncCamerasIfNeeded(e, t, s) {
    const i = this.getResolutionConfig(t), r = i.usePerEyeCameras && s.isArrayCamera && Array.isArray(s.cameras) ? s.cameras : null;
    let n = t.syncedTopCamera !== s;
    if (!n) {
      const o = t.traversalCameras;
      if (r) {
        if (o.length !== r.length)
          n = !0;
        else
          for (let l = 0; l < r.length; l += 1)
            if (o[l] !== r[l]) {
              n = !0;
              break;
            }
      } else (o.length !== 1 || o[0] !== s) && (n = !0);
    }
    n && (t.traversalCameras = this.syncTilesetTraversalCameras(e, s, i), t.syncedTopCamera = s, t.lastResolutionWidth = -1, t.lastResolutionHeight = -1), this._syncResolutionIfNeeded(e, t, s, i);
  }
  _syncResolutionIfNeeded(e, t, s, i) {
    let r = 0, n = 0;
    if (i.usePerEyeResolution && i.usePerEyeCameras && s.isArrayCamera) {
      const o = t.traversalCameras[0]?.viewport;
      r = o?.z || 0, n = o?.w || 0;
    } else i.useDrawingBufferResolution && this.renderer?.getDrawingBufferSize && (this.renderer.getDrawingBufferSize(this._resolutionVec2), r = this._resolutionVec2.x, n = this._resolutionVec2.y);
    if (r > 0 && n > 0) {
      if (r === t.lastResolutionWidth && n === t.lastResolutionHeight)
        return;
      t.lastResolutionWidth = r, t.lastResolutionHeight = n;
    }
    this.setResolutionForCamera(e, s, t.traversalCameras, i);
  }
  _applyVRDepthClamp(e, t) {
    if (!e.vrMaxDepth) return;
    const s = e.tileset;
    t ? (e.desktopMaxDepth === null && (e.desktopMaxDepth = s.maxDepth), s.maxDepth = e.vrMaxDepth) : e.desktopMaxDepth !== null && (s.maxDepth = e.desktopMaxDepth, e.desktopMaxDepth = null);
  }
  _maybeUpdateBounds(e, t, s) {
    const i = this.isValidBox3(e.modelGroup?.userData?.boundingBox);
    s && i || i && t - e.lastBoundsUpdateMs < e.boundsUpdateIntervalMs || (this.updateBoundsAndCenter(e), e.lastBoundsUpdateMs = t, e.boundsDirty = !1);
  }
  update(e = null, t = {}) {
    const s = performance.now(), i = t?.queueOptions, r = t?.isXR === !0;
    this.runScheduledQueueTasks(i);
    const n = e || this.camera;
    n && n !== this.camera && this.setCamera(n), this.activeTilesets.forEach((l) => {
      const c = this.tilesetStates.get(l);
      if (!c) {
        l.update();
        return;
      }
      if (!this._shouldRunTilesUpdate(c, n, s)) {
        this.updateGatedCount += 1;
        return;
      }
      this.renderer && n && this._syncCamerasIfNeeded(l, c, n), c.adaptive ? this.applyAdaptiveQuality(c, n, r) : this.applyTriangleBudget(c, r), this._applyVRDepthClamp(c, r), l.update(), this.updateRunCount += 1, this._updateTileShadowCasters(c, n, s, r), this._markTilesUpdateRan(c, n, s), c.boundsDirty && this._maybeUpdateBounds(c, s, r);
    });
    const o = performance.now() - s;
    this.lastUpdateDurationMs = o, o > this.maxUpdateDurationMs && (this.maxUpdateDurationMs = o);
  }
  disposeTileset(e) {
    if (!e)
      return;
    this.activeTilesets.has(e) && this.activeTilesets.delete(e);
    const t = this.tilesetStates.get(e);
    t?.onLoadModel && e.removeEventListener("load-model", t.onLoadModel), t?.onDisposeModel && e.removeEventListener("dispose-model", t.onDisposeModel), t?.onNeedsUpdate && e.removeEventListener("needs-update", t.onNeedsUpdate), this.tilesetStates.delete(e), e.dispose();
  }
  dispose() {
    this.pendingQueueTasks.length = 0, this.activeTilesets.forEach((e) => {
      const t = this.tilesetStates.get(e);
      t?.onLoadModel && e.removeEventListener("load-model", t.onLoadModel), t?.onDisposeModel && e.removeEventListener("dispose-model", t.onDisposeModel), t?.onNeedsUpdate && e.removeEventListener("needs-update", t.onNeedsUpdate), e.dispose();
    }), this.activeTilesets.clear(), this.tilesetStates.clear();
  }
}
class $e {
  /**
   * Constructs a new VR button.
   *
   * @param {WebGLRenderer|WebGPURenderer} renderer - The renderer.
   * @param {XRSessionInit} [sessionInit] - The a configuration object for the AR session.
   * @return {HTMLElement} The button or an error message if `immersive-ar` isn't supported.
   */
  static createButton(e, t = {}) {
    const s = document.createElement("button");
    function i() {
      let c = null;
      async function A(u) {
        u.addEventListener("end", h), await e.xr.setSession(u), s.textContent = "EXIT VR", c = u;
      }
      function h() {
        c.removeEventListener("end", h), s.textContent = "ENTER VR", c = null;
      }
      s.style.display = "", s.style.cursor = "pointer", s.style.left = "calc(50% - 50px)", s.style.width = "100px", s.textContent = "ENTER VR";
      const d = {
        ...t,
        optionalFeatures: [
          "local-floor",
          "bounded-floor",
          "layers",
          ...t.optionalFeatures || []
        ]
      };
      s.onmouseenter = function() {
        s.style.opacity = "1.0";
      }, s.onmouseleave = function() {
        s.style.opacity = "0.5";
      }, s.onclick = function() {
        c === null ? navigator.xr.requestSession("immersive-vr", d).then(A) : (c.end(), navigator.xr.offerSession !== void 0 && navigator.xr.offerSession("immersive-vr", d).then(A).catch((u) => {
          console.warn(u);
        }));
      }, navigator.xr.offerSession !== void 0 && navigator.xr.offerSession("immersive-vr", d).then(A).catch((u) => {
        console.warn(u);
      });
    }
    function r() {
      s.style.display = "", s.style.cursor = "auto", s.style.left = "calc(50% - 75px)", s.style.width = "150px", s.onmouseenter = null, s.onmouseleave = null, s.onclick = null;
    }
    function n() {
      r(), s.textContent = "VR NOT SUPPORTED";
    }
    function o(c) {
      r(), console.warn("Exception when trying to call xr.isSessionSupported", c), s.textContent = "VR NOT ALLOWED";
    }
    function l(c) {
      c.style.position = "absolute", c.style.bottom = "20px", c.style.padding = "12px 6px", c.style.border = "1px solid #fff", c.style.borderRadius = "4px", c.style.background = "rgba(0,0,0,0.1)", c.style.color = "#fff", c.style.font = "normal 13px sans-serif", c.style.textAlign = "center", c.style.opacity = "0.5", c.style.outline = "none", c.style.zIndex = "999";
    }
    if ("xr" in navigator)
      return s.id = "VRButton", s.style.display = "none", l(s), navigator.xr.isSessionSupported("immersive-vr").then(function(c) {
        c ? i() : n(), c && $e.xrSessionIsGranted && s.click();
      }).catch(o), s;
    {
      const c = document.createElement("a");
      return window.isSecureContext === !1 ? (c.href = document.location.href.replace(/^http:/, "https:"), c.innerHTML = "WEBXR NEEDS HTTPS") : (c.href = "https://immersiveweb.dev/", c.innerHTML = "WEBXR NOT AVAILABLE"), c.style.left = "calc(50% - 90px)", c.style.width = "180px", c.style.textDecoration = "none", l(c), c;
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
        $e.xrSessionIsGranted = !0;
      });
    }
  }
}
$e.xrSessionIsGranted = !1;
$e.registerSessionGrantedListener();
class qc {
  constructor(e, t, s, i = null) {
    this.renderer = e, this.camera = t, this.scene = s, this.container = i || document.body, this.isVRSupported = !1, this.isVRPresenting = !1, this.isQuest2 = !1, this.isQuest3 = !1, this.vrButton = null, this.onSessionStart = null, this.onSessionEnd = null;
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
          optionalFeatures: this.getOptionalFeatures()
        };
        this.vrButton = $e.createButton(this.renderer, e), this.vrButton.innerHTML = '<span class="vr-icon">🥽</span>ENTER VR', this.vrButton.className = "vr-button--glass vr-button-available", this.vrButton.disabled = !1, this.vrButton.style.cssText = `
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
  getOptionalFeatures() {
    const e = ["hand-tracking", "local-floor"];
    try {
      this.supportsBoundedFloor() && e.push("bounded-floor");
    } catch (t) {
      console.warn("VR optional feature detection failed:", t);
    }
    return e;
  }
  supportsBoundedFloor() {
    if (typeof navigator > "u" || this.isPolyfilledXR())
      return !1;
    const e = navigator.xr;
    return e ? Array.isArray(e.supportedReferenceSpaceTypes) ? e.supportedReferenceSpaceTypes.includes("bounded-floor") : typeof window < "u" && typeof window.XRBoundedReferenceSpace < "u" : !1;
  }
  isPolyfilledXR() {
    if (typeof window < "u" && typeof window.WebXRPolyfill < "u")
      return !0;
    if (typeof navigator > "u" || !navigator.xr)
      return !1;
    const e = navigator.xr, t = e.constructor && e.constructor.name;
    if (t && t.toLowerCase().includes("polyfill"))
      return !0;
    try {
      const s = e.requestSession && e.requestSession.toString();
      if (typeof s == "string" && !s.includes("[native code]"))
        return !0;
    } catch {
      return !0;
    }
    return !1;
  }
  styleVRButton() {
    const e = () => {
      const t = document.querySelector("button.vr-button--glass") || document.querySelector("button") || this.vrButton;
      return t ? (t.style.display = "flex", t.style.visibility = "visible", t.style.opacity = "1", t.innerHTML = '<span class="vr-icon">🥽</span>ENTER VR', t.classList.contains("vr-button--glass") || t.classList.add("vr-button--glass"), t.disabled = !1, t.classList.remove("vr-generic-disabled"), !0) : !1;
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
    if (e === "quest2") {
      const t = Number(this.camera.userData?.belowMinimumFar);
      this.camera.far = Math.max(20, Number.isFinite(t) ? t : 0), this.camera.updateProjectionMatrix();
    }
  }
  async waitForVRCSS() {
    return new Promise((e) => {
      const t = () => {
        const s = document.createElement("div");
        s.className = "vr-mode-active", s.style.display = "none", this.container.appendChild(s);
        const i = window.getComputedStyle(s), r = i.getPropertyValue("--vr-css-loaded") === "true" || i.opacity === "0.999";
        this.container.removeChild(s), r ? e() : setTimeout(t, 50);
      };
      setTimeout(t, 100);
    });
  }
  removeExistingVRButtons() {
    document.querySelectorAll('button.legacy-vr-button, a[href="#VR"]').forEach((t) => {
      try {
        t.parentNode && t.parentNode.removeChild(t);
      } catch (s) {
        console.warn("Failed to remove VR button:", s);
      }
    });
  }
  startVRButtonMonitoring() {
    new MutationObserver((t) => {
      t.forEach((s) => {
        s.addedNodes.forEach((i) => {
          if (i.nodeType === Node.ELEMENT_NODE) {
            const r = i.querySelectorAll ? i.querySelectorAll('button.legacy-vr-button, a[href="#VR"]') : [];
            if (r.length > 0 || i.tagName === "BUTTON" && i.classList.contains("legacy-vr-button")) {
              const n = r.length > 0 ? r[0] : i;
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
const N = {
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
async function qn(a) {
  const e = await fetch(a);
  if (e.ok)
    return e.json();
  throw new Error(e.statusText);
}
async function zc(a) {
  if (!a)
    throw new Error("No basePath supplied");
  return await qn(`${a}/profilesList.json`);
}
async function jc(a, e, t = null, s = !0) {
  if (!a)
    throw new Error("No xrInputSource supplied");
  if (!e)
    throw new Error("No basePath supplied");
  const i = await zc(e);
  let r;
  if (a.profiles.some((l) => {
    const c = i[l];
    return c && (r = {
      profileId: l,
      profilePath: `${e}/${c.path}`,
      deprecated: !!c.deprecated
    }), !!r;
  }), !r) {
    if (!t)
      throw new Error("No matching profile name found");
    const l = i[t];
    if (!l)
      throw new Error(`No matching profile name found and default profile "${t}" missing.`);
    r = {
      profileId: t,
      profilePath: `${e}/${l.path}`,
      deprecated: !!l.deprecated
    };
  }
  const n = await qn(r.profilePath);
  let o;
  if (s) {
    let l;
    if (a.handedness === "any" ? l = n.layouts[Object.keys(n.layouts)[0]] : l = n.layouts[a.handedness], !l)
      throw new Error(
        `No matching handedness, ${a.handedness}, in profile ${r.profileId}`
      );
    l.assetPath && (o = r.profilePath.replace("profile.json", l.assetPath));
  }
  return { profile: n, assetPath: o };
}
const Kc = {
  xAxis: 0,
  yAxis: 0,
  button: 0,
  state: N.ComponentState.DEFAULT
};
function Yc(a = 0, e = 0) {
  let t = a, s = e;
  if (Math.sqrt(a * a + e * e) > 1) {
    const n = Math.atan2(e, a);
    t = Math.cos(n), s = Math.sin(n);
  }
  return {
    normalizedXAxis: t * 0.5 + 0.5,
    normalizedYAxis: s * 0.5 + 0.5
  };
}
class Jc {
  constructor(e) {
    this.componentProperty = e.componentProperty, this.states = e.states, this.valueNodeName = e.valueNodeName, this.valueNodeProperty = e.valueNodeProperty, this.valueNodeProperty === N.VisualResponseProperty.TRANSFORM && (this.minNodeName = e.minNodeName, this.maxNodeName = e.maxNodeName), this.value = 0, this.updateFromComponent(Kc);
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
    button: s,
    state: i
  }) {
    const { normalizedXAxis: r, normalizedYAxis: n } = Yc(e, t);
    switch (this.componentProperty) {
      case N.ComponentProperty.X_AXIS:
        this.value = this.states.includes(i) ? r : 0.5;
        break;
      case N.ComponentProperty.Y_AXIS:
        this.value = this.states.includes(i) ? n : 0.5;
        break;
      case N.ComponentProperty.BUTTON:
        this.value = this.states.includes(i) ? s : 0;
        break;
      case N.ComponentProperty.STATE:
        this.valueNodeProperty === N.VisualResponseProperty.VISIBILITY ? this.value = this.states.includes(i) : this.value = this.states.includes(i) ? 1 : 0;
        break;
      default:
        throw new Error(`Unexpected visualResponse componentProperty ${this.componentProperty}`);
    }
  }
}
class Wc {
  /**
   * @param {Object} componentId - Id of the component
   * @param {Object} componentDescription - Description of the component to be created
   */
  constructor(e, t) {
    if (!e || !t || !t.visualResponses || !t.gamepadIndices || Object.keys(t.gamepadIndices).length === 0)
      throw new Error("Invalid arguments supplied");
    this.id = e, this.type = t.type, this.rootNodeName = t.rootNodeName, this.touchPointNodeName = t.touchPointNodeName, this.visualResponses = {}, Object.keys(t.visualResponses).forEach((s) => {
      const i = new Jc(t.visualResponses[s]);
      this.visualResponses[s] = i;
    }), this.gamepadIndices = Object.assign({}, t.gamepadIndices), this.values = {
      state: N.ComponentState.DEFAULT,
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
    if (this.values.state = N.ComponentState.DEFAULT, this.gamepadIndices.button !== void 0 && e.buttons.length > this.gamepadIndices.button) {
      const t = e.buttons[this.gamepadIndices.button];
      this.values.button = t.value, this.values.button = this.values.button < 0 ? 0 : this.values.button, this.values.button = this.values.button > 1 ? 1 : this.values.button, t.pressed || this.values.button === 1 ? this.values.state = N.ComponentState.PRESSED : (t.touched || this.values.button > N.ButtonTouchThreshold) && (this.values.state = N.ComponentState.TOUCHED);
    }
    this.gamepadIndices.xAxis !== void 0 && e.axes.length > this.gamepadIndices.xAxis && (this.values.xAxis = e.axes[this.gamepadIndices.xAxis], this.values.xAxis = this.values.xAxis < -1 ? -1 : this.values.xAxis, this.values.xAxis = this.values.xAxis > 1 ? 1 : this.values.xAxis, this.values.state === N.ComponentState.DEFAULT && Math.abs(this.values.xAxis) > N.AxisTouchThreshold && (this.values.state = N.ComponentState.TOUCHED)), this.gamepadIndices.yAxis !== void 0 && e.axes.length > this.gamepadIndices.yAxis && (this.values.yAxis = e.axes[this.gamepadIndices.yAxis], this.values.yAxis = this.values.yAxis < -1 ? -1 : this.values.yAxis, this.values.yAxis = this.values.yAxis > 1 ? 1 : this.values.yAxis, this.values.state === N.ComponentState.DEFAULT && Math.abs(this.values.yAxis) > N.AxisTouchThreshold && (this.values.state = N.ComponentState.TOUCHED)), Object.values(this.visualResponses).forEach((t) => {
      t.updateFromComponent(this.values);
    });
  }
}
class Xc {
  /**
   * @param {Object} xrInputSource - The XRInputSource to build the MotionController around
   * @param {Object} profile - The best matched profile description for the supplied xrInputSource
   * @param {string} assetUrl
   */
  constructor(e, t, s) {
    if (!e)
      throw new Error("No xrInputSource supplied");
    if (!t)
      throw new Error("No profile supplied");
    this.xrInputSource = e, this.assetUrl = s, this.id = t.profileId, this.layoutDescription = t.layouts[e.handedness], this.components = {}, Object.keys(this.layoutDescription.components).forEach((i) => {
      const r = this.layoutDescription.components[i];
      this.components[i] = new Wc(i, r);
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
const Zc = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles", $c = "generic-trigger";
class eh extends is {
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
      Object.values(t.visualResponses).forEach((s) => {
        const { valueNode: i, minNode: r, maxNode: n, value: o, valueNodeProperty: l } = s;
        i && (l === N.VisualResponseProperty.VISIBILITY ? i.visible = o : l === N.VisualResponseProperty.TRANSFORM && (i.quaternion.slerpQuaternions(
          r.quaternion,
          n.quaternion,
          o
        ), i.position.lerpVectors(
          r.position,
          n.position,
          o
        )));
      });
    }));
  }
}
function th(a, e) {
  Object.values(a.components).forEach((t) => {
    const { type: s, touchPointNodeName: i, visualResponses: r } = t;
    if (s === N.ComponentType.TOUCHPAD)
      if (t.touchPointNode = e.getObjectByName(i), t.touchPointNode) {
        const n = new Zr(1e-3), o = new Le({ color: 255 }), l = new os(n, o);
        t.touchPointNode.add(l);
      } else
        console.warn(`Could not find touch dot, ${t.touchPointNodeName}, in touchpad component ${t.id}`);
    Object.values(r).forEach((n) => {
      const { valueNodeName: o, minNodeName: l, maxNodeName: c, valueNodeProperty: A } = n;
      if (A === N.VisualResponseProperty.TRANSFORM) {
        if (n.minNode = e.getObjectByName(l), n.maxNode = e.getObjectByName(c), !n.minNode) {
          console.warn(`Could not find ${l} in the model`);
          return;
        }
        if (!n.maxNode) {
          console.warn(`Could not find ${c} in the model`);
          return;
        }
      }
      n.valueNode = e.getObjectByName(o), n.valueNode || console.warn(`Could not find ${o} in the model`);
    });
  });
}
function xr(a, e) {
  th(a.motionController, e), a.envMap && e.traverse((t) => {
    t.isMesh && (t.material.envMap = a.envMap, t.material.needsUpdate = !0);
  }), a.add(e);
}
class sh {
  /**
   * Constructs a new XR controller model factory.
   *
   * @param {?GLTFLoader} [gltfLoader=null] - A glTF loader that is used to load controller models.
   * @param {?Function} [onLoad=null] - A callback that is executed when a controller model has been loaded.
   */
  constructor(e = null, t = null) {
    this.gltfLoader = e, this.path = Zc, this._assetCache = {}, this.onLoad = t, this.gltfLoader || (this.gltfLoader = new Ge());
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
    const t = new eh();
    let s = null;
    return e.addEventListener("connected", (i) => {
      const r = i.data;
      r.targetRayMode !== "tracked-pointer" || !r.gamepad || r.hand || jc(r, this.path, $c).then(({ profile: n, assetPath: o }) => {
        t.motionController = new Xc(
          r,
          n,
          o
        );
        const l = this._assetCache[t.motionController.assetUrl];
        if (l)
          s = l.scene.clone(), xr(t, s), this.onLoad && this.onLoad(s);
        else {
          if (!this.gltfLoader)
            throw new Error("GLTFLoader not set.");
          this.gltfLoader.setPath(""), this.gltfLoader.load(
            t.motionController.assetUrl,
            (c) => {
              this._assetCache[t.motionController.assetUrl] = c, s = c.scene.clone(), xr(t, s), this.onLoad && this.onLoad(s);
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
      t.motionController = null, t.remove(s), s = null;
    }), t;
  }
}
class ih {
  constructor(e, t, s = {}) {
    this.renderer = e, this.camera = t, this.assetPaths = cs(s), this.controller1 = null, this.controller2 = null, this.controllerGrip1 = null, this.controllerGrip2 = null, this.controllers = [], this.controllerGrips = [], this.buttonStates = /* @__PURE__ */ new Map(), this.inputDeadzone = 0.15, this.turnSmoothingFactor = 0.1, this.lastTurnInput = 0, this.onSelectStart = null, this.onSelectEnd = null, this.onSqueezeStart = null, this.onSqueezeEnd = null, this.onModeToggle = null, this.onMovementStart = null, this.onMovementStop = null, this.handsActive = !1, this.handStates = {
      left: { pinch: !1, fist: !1, direction: new f.Vector3() },
      right: { pinch: !1, fist: !1, direction: new f.Vector3() }
    }, this._fallbackHandedness = /* @__PURE__ */ new Map();
  }
  init() {
    this.initControllers(), this.initHands();
  }
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
    for (const s of e.inputSources)
      s.hand && (t = !0);
    this.handsActive = t;
  }
  updateHandGestures() {
    const e = this.renderer.xr.getSession && this.renderer.xr.getSession();
    if (e) {
      for (const t of e.inputSources)
        if (t.hand && t.handedness) {
          const s = t.handedness, i = t.hand.get("thumb-tip"), r = t.hand.get("index-finger-tip");
          if (!i || !r || !i.transform || !r.transform)
            this.handStates[s].pinch = !1;
          else {
            const l = new f.Vector3().setFromMatrixPosition(new f.Matrix4().fromArray(i.transform.matrix)), c = new f.Vector3().setFromMatrixPosition(new f.Matrix4().fromArray(r.transform.matrix)), A = l.distanceTo(c);
            this.handStates[s].pinch = A < 0.025;
          }
          let n = !0;
          const o = t.hand.get("wrist");
          if (o && o.transform) {
            const l = new f.Vector3().setFromMatrixPosition(new f.Matrix4().fromArray(o.transform.matrix));
            for (const c of ["index-finger-tip", "middle-finger-tip", "ring-finger-tip", "pinky-finger-tip"]) {
              const A = t.hand.get(c);
              if (!A || !A.transform) {
                n = !1;
                continue;
              }
              new f.Vector3().setFromMatrixPosition(new f.Matrix4().fromArray(A.transform.matrix)).distanceTo(l) > 0.045 && (n = !1);
            }
          } else
            n = !1;
          if (this.handStates[s].fist = n, r && o && r.transform && o.transform) {
            const l = new f.Vector3().setFromMatrixPosition(new f.Matrix4().fromArray(o.transform.matrix)), c = new f.Vector3().setFromMatrixPosition(new f.Matrix4().fromArray(r.transform.matrix));
            this.handStates[s].direction = new f.Vector3().subVectors(c, l).normalize();
          }
        }
    }
  }
  initControllers() {
    const e = new sh();
    e.setPath(this.assetPaths.webxrInputProfilesPath);
    for (let t = 0; t < 2; t++) {
      const s = this.renderer.xr.getController(t), i = this.renderer.xr.getControllerGrip(t);
      i.add(e.createControllerModel(i)), this.camera.parent.add(s), this.camera.parent.add(i), this.controllers.push(s), this.controllerGrips.push(i);
    }
    this.setupControllerEvents();
  }
  setupControllerEvents() {
    this.controllers.forEach((e, t) => {
      e.addEventListener("connected", (s) => {
        const { handedness: i, targetRayMode: r, profiles: n } = s.data, o = Array.isArray(n) && n.some((l) => l && l.toLowerCase().includes("hand"));
        r !== "tracked-pointer" || o || (i === "left" ? (this.controller1 = e, this.controllerGrip1 = this.controllerGrips[t]) : i === "right" && (this.controller2 = e, this.controllerGrip2 = this.controllerGrips[t]), e.userData.handedness = i, e.userData.initialised = !0);
      }), e.addEventListener("disconnected", () => {
      }), e.addEventListener("selectstart", (s) => {
        e.userData && e.userData.initialised && this.onControllerSelectStart(e, s);
      }), e.addEventListener("selectend", (s) => {
        e.userData && e.userData.initialised && this.onControllerSelectEnd(e, s);
      }), e.addEventListener("squeezestart", (s) => {
        e.userData && e.userData.initialised && this.onControllerSqueezeStart(e, s);
      }), e.addEventListener("squeezeend", (s) => {
        e.userData && e.userData.initialised && this.onControllerSqueezeEnd(e, s);
      });
    });
  }
  onControllerSelectStart(e, t) {
    const s = e.userData.handedness;
    this.onSelectStart && this.onSelectStart(s, e, t);
  }
  onControllerSelectEnd(e, t) {
    const s = e.userData.handedness;
    this.onSelectEnd && this.onSelectEnd(s, e, t);
  }
  onControllerSqueezeStart(e, t) {
    const s = e.userData.handedness;
    this.onSqueezeStart && this.onSqueezeStart(s, e, t);
  }
  onControllerSqueezeEnd(e, t) {
    const s = e.userData.handedness;
    this.onSqueezeEnd && this.onSqueezeEnd(s, e, t);
  }
  checkControllerButtons() {
    const e = this.getInputSources();
    if (!(!e || e.length === 0)) {
      for (const t of e)
        if (t.gamepad && t.handedness) {
          const s = t.gamepad, i = t.handedness, r = `debug-${i}`;
          this.buttonStates.get(r) || this.buttonStates.set(r, !0);
          let n = [];
          i === "left" ? n = [4, 5] : i === "right" && (n = [4, 5]), n.forEach((o) => {
            if (s.buttons[o]) {
              const l = s.buttons[o], c = `${i}-${o}`, A = this.buttonStates.get(c) || !1, h = l.pressed;
              h && !A && this.onModeToggle && this.onModeToggle(), this.buttonStates.set(c, h);
            }
          });
        }
    }
  }
  getControllerInput() {
    const e = this.getInputSources();
    if (!e || e.length === 0) return { movement: null, teleport: null };
    let t = null, s = null;
    for (const i of e)
      if (i.gamepad && i.handedness) {
        const r = i.gamepad, n = i.handedness;
        if (r.axes.length >= 4) {
          const o = r.axes[2] || 0, l = r.axes[3] || 0, c = r.axes[0] || 0, A = r.axes[1] || 0, h = Math.abs(o) > this.inputDeadzone ? o : 0, d = Math.abs(l) > this.inputDeadzone ? l : 0, u = Math.abs(c) > this.inputDeadzone ? c : 0, p = Math.abs(A) > this.inputDeadzone ? A : 0;
          n === "left" ? (h !== 0 || d !== 0) && (t = {
            x: h,
            y: d,
            handedness: "left"
          }) : n === "right" && (u !== 0 || p !== 0) && (s = {
            x: u,
            y: p,
            handedness: "right"
          });
        }
      }
    return { movement: t, teleport: s };
  }
  getInputSources() {
    const e = this.renderer.xr.getSession && this.renderer.xr.getSession();
    return e && e.inputSources ? Array.from(e.inputSources) : this._getFallbackInputSources();
  }
  _getFallbackInputSources() {
    if (typeof navigator > "u" || !navigator.getGamepads) return [];
    const e = navigator.getGamepads();
    if (!e) return [];
    const t = [];
    let s = 0;
    for (const i of e) {
      if (!i || !i.buttons || !i.axes) continue;
      const r = this._resolveHandedness(i, s);
      if (!r) {
        s += 1;
        continue;
      }
      t.push({ gamepad: i, handedness: r }), s += 1;
    }
    return t;
  }
  _resolveHandedness(e, t) {
    const s = (e.hand || "").toLowerCase();
    if (s === "left" || s === "right") return s;
    const i = (e.id || "").toLowerCase();
    return i.includes("left") ? "left" : i.includes("right") ? "right" : this._fallbackHandedness.has(e.index) ? this._fallbackHandedness.get(e.index) : t === 0 ? (this._fallbackHandedness.set(e.index, "left"), "left") : t === 1 ? (this._fallbackHandedness.set(e.index, "right"), "right") : null;
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
class rh {
  constructor(e, t) {
    this.scene = e, this.camera = t, this.style = {
      neutralColor: 14870768,
      accentColor: 9741240,
      floorColor: 6583435
    }, this.teleportController = null, this.teleportMarker = null, this.teleportArch = null, this.teleportCurve = null, this.teleportFloor = null, this.validTeleportPosition = null, this.currentTeleportTarget = null, this.teleportThreshold = 0.7, this.teleportReleaseThreshold = 0.3, this.teleportPressed = !1, this.teleportMaxMagnitude = 0, this.teleportMaxDistance = 20, this.teleportFloorHeight = null, this.teleportFloorMin = -10, this.teleportFloorMax = 10, this.lastSnapTurnTime = 0, this.onTeleport = null, this.onTeleportStart = null, this.onTeleportEnd = null;
  }
  init() {
    this.setupTeleportation();
  }
  setupTeleportation() {
    this.createTeleportArc();
  }
  createTeleportArc() {
    const e = [
      new f.Vector3(0, 0, 0),
      new f.Vector3(0, 1, -5)
    ], t = new f.CatmullRomCurve3(e), s = new f.TubeGeometry(t, 20, 0.03, 8, !1), i = new f.MeshBasicMaterial({
      color: this.style.accentColor,
      transparent: !0,
      opacity: 0.62,
      side: f.DoubleSide
    });
    if (this.teleportCurve = new f.Mesh(s, i), this.teleportCurve.visible = !1, this.scene.add(this.teleportCurve), !this.teleportMarker) {
      const r = new f.RingGeometry(0.34, 0.5, 28), n = new f.MeshBasicMaterial({
        color: this.style.neutralColor,
        transparent: !0,
        opacity: 0.78,
        side: f.DoubleSide
      });
      this.teleportMarker = new f.Mesh(r, n), this.teleportMarker.rotation.x = -Math.PI / 2, this.teleportMarker.visible = !1, this.scene.add(this.teleportMarker);
    }
    if (!this.teleportArch) {
      const o = 0.07999999999999999, l = 0.34 + o, c = [];
      for (let u = 0; u <= 24; u++) {
        const p = u / 24 * Math.PI;
        c.push(new f.Vector3(
          Math.cos(p) * l,
          Math.sin(p) * l,
          0
        ));
      }
      const A = new f.CatmullRomCurve3(c), h = new f.TubeGeometry(A, 24, o, 8, !1), d = new f.MeshBasicMaterial({
        color: this.style.accentColor,
        transparent: !0,
        opacity: 0.24,
        side: f.DoubleSide,
        depthWrite: !1
      });
      this.teleportArch = new f.Mesh(h, d), this.teleportArch.visible = !1, this.scene.add(this.teleportArch);
    }
    if (!this.teleportFloor) {
      const r = new f.PlaneGeometry(14, 14), n = new f.MeshBasicMaterial({
        color: this.style.floorColor,
        transparent: !0,
        opacity: 0.06,
        side: f.DoubleSide,
        visible: !1
      });
      this.teleportFloor = new f.Mesh(r, n), this.teleportFloor.rotation.x = -Math.PI / 2, this.teleportFloor.visible = !1, this.scene.add(this.teleportFloor);
    }
  }
  executeTeleport() {
    if (!this.validTeleportPosition) return;
    const e = this.validTeleportPosition.clone();
    this.camera.parent.position.copy(e), this.onTeleport && this.onTeleport(e), this.validTeleportPosition = null;
  }
  dashToPosition(e) {
    const t = this.camera.parent.position.clone(), s = t.distanceTo(e), i = Math.min(s * 0.2, 1);
    let r = 0;
    const n = () => {
      r += 1 / 60;
      const o = Math.min(r / i, 1), l = 1 - Math.pow(1 - o, 3);
      this.camera.parent.position.lerpVectors(t, e, l), o < 1 && requestAnimationFrame(n);
    };
    n();
  }
  processSnapTurn(e, t = 30) {
    if (this.teleportPressed) return;
    this.lastSnapTurnTime || (this.lastSnapTurnTime = 0);
    const s = Date.now();
    if (!(s - this.lastSnapTurnTime < 500) && Math.abs(e) > 0.7) {
      const i = t * Math.PI / 180, r = e > 0 ? 1 : -1;
      this.camera.parent.rotation.y -= r * i, this.camera.parent.rotation.y = this.normalizeAngle(this.camera.parent.rotation.y), this.lastSnapTurnTime = s;
    }
  }
  normalizeAngle(e) {
    for (; e > Math.PI; ) e -= 2 * Math.PI;
    for (; e < -Math.PI; ) e += 2 * Math.PI;
    return e;
  }
  processTeleportation(e, t) {
    const s = Math.abs(t);
    if (s > this.teleportThreshold && !this.teleportPressed) {
      this.teleportPressed = !0, this.teleportMaxMagnitude = s, this.teleportController = e;
      const i = this.camera.parent.position.y;
      this.teleportFloorHeight = i, this.teleportFloorMin = i - 10, this.teleportFloorMax = i + 10, this.showTeleportArc(), this.onTeleportStart && this.onTeleportStart();
    } else this.teleportPressed && (this.teleportMaxMagnitude = Math.max(this.teleportMaxMagnitude, s), this.updateTeleportArc(), s < this.teleportReleaseThreshold && (this.calculateAndExecuteTeleport(), this.hideTeleportArc(), this.teleportPressed = !1, this.teleportMaxMagnitude = 0, this.teleportController = null, this.onTeleportEnd && this.onTeleportEnd()));
  }
  showTeleportArc() {
    this.teleportCurve || this.createTeleportArc(), this.teleportCurve.visible = !0, this.teleportMarker && (this.teleportMarker.visible = !1), this.teleportArch && (this.teleportArch.visible = !1), this.updateTeleportFloor();
  }
  hideTeleportArc() {
    this.teleportCurve && (this.teleportCurve.visible = !1), this.teleportMarker && (this.teleportMarker.visible = !1), this.teleportArch && (this.teleportArch.visible = !1), this.teleportFloor && (this.teleportFloor.visible = !1), this.currentTeleportTarget = null;
  }
  updateTeleportArc() {
    if (!this.teleportController || !this.teleportCurve) return;
    const e = new f.Quaternion();
    this.teleportController.getWorldQuaternion(e);
    const t = new f.Vector3(0, 0, -1);
    t.applyQuaternion(e);
    const s = new f.Vector3();
    this.teleportController.getWorldPosition(s), s.addScaledVector(t, 0.07);
    const i = Math.sqrt(t.x * t.x + t.z * t.z);
    if (i < 0.12 && t.y > 0) {
      const S = new f.Vector3();
      if (this.camera.getWorldDirection(S), S.y = 0, S.lengthSq() > 0) {
        S.normalize();
        const T = 0.12 - i;
        t.x += S.x * T, t.z += S.z * T, t.normalize();
      }
    }
    const r = this.teleportMaxDistance, n = Math.min(this.teleportMaxMagnitude / this.teleportThreshold, 1), o = Math.pow(n, 0.78), l = r * o, c = [], A = 32, h = -9.8, d = this.teleportFloorHeight, u = d - s.y;
    let p = Math.sqrt(l * Math.abs(h) / 2);
    t.y < 0 && (p *= Math.max(0.25, 1 - Math.abs(t.y) * 0.75));
    const g = t.x * p, b = t.z * p;
    let C = (t.y + 0.15) * p;
    if (u > 0.5) {
      const S = Math.sqrt(2 * Math.abs(h) * u) * 1.2;
      C = Math.max(C, S);
    }
    const y = C / Math.abs(h), E = 0.4 + (1 - Math.max(0, -t.y)) * 1.1, m = Math.max(y * 2.2, E);
    let I = null, B = !1, w = s.y, v = 0;
    const M = Math.max(8, Math.abs(u) * 1.5 + 2);
    for (let S = 0; S <= A; S++) {
      const T = S / A * m, D = new f.Vector3(
        s.x + g * T,
        s.y + C * T + 0.5 * h * T * T,
        s.z + b * T
      );
      Math.abs(D.y - s.y) > M && (D.y = s.y + Math.sign(D.y - s.y) * M), !B && D.y < w && (B = !0, v = T), c.push(D);
      const _ = B ? T - v : 0, Q = B && _ > 0.1;
      if (!I && Q && D.y <= d) {
        if (S > 0) {
          const G = c[S - 1], F = (d - G.y) / (D.y - G.y);
          I = new f.Vector3().lerpVectors(G, D, F), I.y = d;
        } else
          I = D.clone(), I.y = d;
        c[S] = I, c.length = S + 1;
        break;
      }
      w = D.y;
      const K = Math.sqrt(
        Math.pow(D.x - s.x, 2) + Math.pow(D.z - s.z, 2)
      );
      if (Q && K > r) {
        if (S > 0) {
          const G = c[S - 1], F = Math.sqrt(
            Math.pow(G.x - s.x, 2) + Math.pow(G.z - s.z, 2)
          ), O = K > F ? (r - F) / (K - F) : 0.5;
          I = new f.Vector3(
            G.x + (D.x - G.x) * O,
            d,
            G.z + (D.z - G.z) * O
          ), c[S] = I, c.length = S + 1;
        }
        break;
      }
    }
    if (!I && c.length > 0) {
      let S = c[0], T = 0;
      for (let D = 1; D < c.length; D++)
        c[D].y < S.y && (S = c[D], T = D);
      T > c.length / 3 && (I = new f.Vector3(S.x, d, S.z), c.length = T + 1, c[T] = I);
    }
    if (c.length > 1) {
      const S = new f.CatmullRomCurve3(c, !1, "centripetal"), T = new f.TubeGeometry(S, 20, 0.012, 6, !1);
      this.teleportCurve.geometry && this.teleportCurve.geometry.dispose(), this.teleportCurve.geometry = T;
    }
    if (this.currentTeleportTarget = I ? I.clone() : null, this.teleportMarker && (I ? (this.teleportMarker.position.copy(I), this.teleportMarker.rotation.set(-Math.PI / 2, 0, 0), this.teleportMarker.material.opacity = 0.78, this.teleportMarker.material.color.setHex(this.style.neutralColor), this.teleportMarker.visible = !0) : this.teleportMarker.visible = !1), this.teleportArch)
      if (I) {
        this.teleportArch.position.copy(I);
        const S = new f.Vector3();
        this.camera.getWorldPosition(S);
        const T = new f.Vector3(
          S.x,
          I.y,
          S.z
        );
        this.teleportArch.lookAt(T);
        const D = S.distanceTo(I), _ = f.MathUtils.clamp((D - 2.5) / 7.5, 0, 1);
        this.teleportArch.material.opacity = 0.24 * _, this.teleportArch.visible = _ > 0.01;
      } else
        this.teleportArch.visible = !1;
  }
  updateTeleportFloor() {
    this.teleportFloorHeight !== null && (this.teleportFloor && (this.teleportFloor.position.y = this.teleportFloorHeight), this.updateTeleportArc());
  }
  updateTeleportArcHeight() {
    this.updateTeleportFloor();
  }
  calculateAndExecuteTeleport() {
    if (!(!this.teleportController || this.teleportMaxMagnitude < this.teleportThreshold) && this.currentTeleportTarget) {
      const e = this.currentTeleportTarget.clone(), t = this.camera.parent.position;
      if (Math.sqrt(
        Math.pow(e.x - t.x, 2) + Math.pow(e.z - t.z, 2)
      ) <= this.teleportMaxDistance) {
        const i = new f.Vector3(e.x, this.teleportFloorHeight, e.z);
        this.validTeleportPosition = i, this.executeTeleport(), this.teleportFloorHeight = null, this.currentTeleportTarget = null;
      }
    }
  }
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
    this.teleportCurve && (this.teleportCurve.geometry && this.teleportCurve.geometry.dispose(), this.teleportCurve.material && this.teleportCurve.material.dispose(), this.scene.remove(this.teleportCurve)), this.teleportMarker && (this.teleportMarker.geometry && this.teleportMarker.geometry.dispose(), this.teleportMarker.material && this.teleportMarker.material.dispose(), this.scene.remove(this.teleportMarker)), this.teleportArch && (this.teleportArch.geometry && this.teleportArch.geometry.dispose(), this.teleportArch.material && this.teleportArch.material.dispose(), this.scene.remove(this.teleportArch)), this.teleportFloor && (this.teleportFloor.geometry && this.teleportFloor.geometry.dispose(), this.teleportFloor.material && this.teleportFloor.material.dispose(), this.scene.remove(this.teleportFloor)), this.resetTeleportState();
  }
  resetSnapTurnState() {
    this.lastSnapTurnTime = 0;
  }
}
class nh {
  constructor(e, t) {
    this.camera = e, this.renderer = t, this.MOVE_SPEED = 2, this.TURN_SPEED = 1.5, this.FLY_SPEED = 1, this.currentSpeed = 0, this.targetSpeed = 0, this.currentBoostLevel = 0, this.targetBoostLevel = 0, this.SPEED_RAMP_RATE = 3, this.BOOST_RAMP_RATE = 6, this.handMoveActive = !1, this.handMoveBoost = !1, this.handMoveDirection = new f.Vector3(), this.isMoving = !1, this.inputDeadzone = 0.15, this.turnSmoothingFactor = 0.1, this.lastTurnInput = 0, this.comfortSettings = {
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
    const s = this.renderer.xr.getSession && this.renderer.xr.getSession();
    if (s && s.visibilityState !== "visible")
      return;
    const i = t?.inputSources || (s ? Array.from(s.inputSources || []) : []);
    if (!i || i.length === 0)
      return;
    if (s && t.updateHandGestures && t.handsActive) {
      t.updateHandGestures();
      let u = null;
      const p = new f.Vector3();
      let g = !1;
      for (const b of ["left", "right"])
        if (t.handStates[b].pinch) {
          u = b, p.copy(t.handStates[b].direction), g = t.handStates[b].fist;
          break;
        }
      if (u) {
        this.handMoveActive = !0, this.handMoveBoost = g, this.handMoveDirection.copy(p);
        const b = this.camera.parent || this.camera, C = this.MOVE_SPEED * (g ? 3 : 1) * e;
        b.position.addScaledVector(p, C), this.isMoving = !0, this.onMovementStart && !this._wasMoving && this.onMovementStart(), this.onMovementUpdate && this.onMovementUpdate({
          isMoving: !0,
          currentSpeed: this.MOVE_SPEED,
          isBoosted: g,
          currentBoostLevel: g ? 1 : 0
        }), this._wasMoving = !0;
        return;
      } else
        this.handMoveActive && this.onMovementStop && this.onMovementStop(), this.handMoveActive = !1, this.isMoving = !1, this._wasMoving = !1;
    }
    const r = this.camera.parent || this.camera;
    let n = !1, o = !1;
    for (let u = 0; u < i.length; u++) {
      const p = i[u];
      if (!p || !p.gamepad || !p.gamepad.buttons || !p.gamepad.axes || p.gamepad.axes.length < 4)
        continue;
      const g = p.gamepad, C = p.handedness === "left" ? t.controller1 : t.controller2;
      if (!C) continue;
      const y = g.axes[2] || 0, E = g.axes[3] || 0, m = this.comfortSettings.locomotionMode === "teleport" && this.teleportSystem && C, I = this.teleportSystem && this.teleportSystem.teleportPressed, B = I && this.teleportSystem.teleportController === C, w = I && !B;
      if (p.handedness === "left") {
        const v = g.buttons[1], M = v && v.pressed ? 3 : 1, S = this.comfortSettings.reducedMotion ? this.comfortSettings.comfortSpeed : 1;
        if (v && v.pressed && (o = !0), m && (B || !I)) {
          this.teleportSystem.processTeleportation(C, E), this.comfortSettings.turningMode === "snap" && this.teleportSystem.processSnapTurn(y, this.comfortSettings.snapTurnAngle);
          continue;
        } else if (w)
          Math.abs(E) > 0.1 && this.teleportSystem.adjustFloorHeight(-E * (4 * e));
        else {
          const T = new f.Vector3();
          this.camera.getWorldDirection(T), T.y = 0, T.normalize();
          const D = new f.Vector3().crossVectors(T, this.camera.up).normalize();
          if (Math.abs(E) > 0.1) {
            const _ = this.MOVE_SPEED * M * S * this.currentSpeed * e;
            r.position.addScaledVector(T, -E * _), n = !0;
          }
          if (Math.abs(y) > 0.1) {
            const _ = this.MOVE_SPEED * M * S * this.currentSpeed * e;
            r.position.addScaledVector(D, y * _), n = !0;
          }
        }
      }
      if (p.handedness === "right") {
        const v = g.buttons[1], M = v && v.pressed ? 3 : 1, S = this.comfortSettings.reducedMotion ? this.comfortSettings.comfortSpeed : 1;
        if (v && v.pressed && Math.abs(E) > 0.1 && (o = !0), m && (B || !I)) {
          this.teleportSystem.processTeleportation(C, E), this.comfortSettings.turningMode === "snap" && this.teleportSystem.processSnapTurn(y, this.comfortSettings.snapTurnAngle);
          continue;
        } else if (w)
          Math.abs(E) > 0.1 && this.teleportSystem.adjustFloorHeight(-E * (4 * e));
        else {
          if (this.comfortSettings.turningMode === "snap" && this.teleportSystem)
            this.teleportSystem.processSnapTurn(y, this.comfortSettings.snapTurnAngle);
          else if (Math.abs(y) > this.inputDeadzone) {
            const T = this.lastTurnInput * this.turnSmoothingFactor + y * (1 - this.turnSmoothingFactor);
            if (this.lastTurnInput = T, Math.abs(T) > this.inputDeadzone) {
              const D = this.comfortSettings.reducedMotion ? this.TURN_SPEED * 0.5 : this.TURN_SPEED, _ = T * D * Math.min(e, 1 / 30);
              r.rotation.y -= _, r.rotation.y = this.normalizeAngle(r.rotation.y);
            }
          } else
            this.lastTurnInput *= 0.9;
          if (Math.abs(E) > 0.1 && this.comfortSettings.locomotionMode !== "teleport") {
            const T = this.FLY_SPEED * M * S * this.currentSpeed * e;
            r.position.y -= E * T, n = !0;
          }
        }
      }
    }
    const l = this.isMoving;
    this.isMoving = n;
    const A = (this.isMoving ? this.MOVE_SPEED : 0) - this.currentSpeed;
    this.currentSpeed += A * this.SPEED_RAMP_RATE * e, this.currentSpeed = Math.max(0, this.currentSpeed);
    const d = (o ? 1 : 0) - this.currentBoostLevel;
    this.currentBoostLevel += d * this.BOOST_RAMP_RATE * e, this.currentBoostLevel = Math.max(0, Math.min(1, this.currentBoostLevel)), !l && this.isMoving && this.onMovementStart && this.onMovementStart(), l && !this.isMoving && this.onMovementStop && this.onMovementStop(), this.onMovementUpdate && this.onMovementUpdate({
      isMoving: this.isMoving,
      currentSpeed: this.currentSpeed,
      isBoosted: o,
      currentBoostLevel: this.currentBoostLevel
    });
  }
  normalizeAngle(e) {
    for (; e > Math.PI; ) e -= 2 * Math.PI;
    for (; e < -Math.PI; ) e += 2 * Math.PI;
    return e;
  }
  correctDrift() {
    const e = this.camera.parent || this.camera;
    e && (e.rotation.y = this.normalizeAngle(e.rotation.y), e.position.x = Math.round(e.position.x * 1e3) / 1e3, e.position.y = Math.round(e.position.y * 1e3) / 1e3, e.position.z = Math.round(e.position.z * 1e3) / 1e3);
  }
  setComfortSettings(e) {
    const t = ["smooth", "teleport"], s = ["smooth", "snap"];
    if (e.locomotionMode && t.includes(e.locomotionMode)) {
      const i = this.comfortSettings.locomotionMode;
      this.comfortSettings.locomotionMode = e.locomotionMode, i !== e.locomotionMode && this.teleportSystem && this.teleportSystem.resetTeleportState();
    }
    if (e.turningMode && s.includes(e.turningMode)) {
      const i = this.comfortSettings.turningMode;
      this.comfortSettings.turningMode = e.turningMode, i !== e.turningMode && this.teleportSystem && this.teleportSystem.resetSnapTurnState();
    }
    typeof e.snapTurnAngle == "number" && e.snapTurnAngle > 0 && e.snapTurnAngle <= 90 && (this.comfortSettings.snapTurnAngle = e.snapTurnAngle), typeof e.reducedMotion == "boolean" && (this.comfortSettings.reducedMotion = e.reducedMotion), typeof e.showTeleportArc == "boolean" && (this.comfortSettings.showTeleportArc = e.showTeleportArc), typeof e.comfortSpeed == "number" && e.comfortSpeed > 0 && e.comfortSpeed <= 2 && (this.comfortSettings.comfortSpeed = e.comfortSpeed), this.ensureComfortSettingsApplied();
  }
  getComfortSettings() {
    return { ...this.comfortSettings };
  }
  setComfortPreset(e) {
    return e === "comfort" ? (this.setComfortSettings({
      locomotionMode: "teleport",
      turningMode: "snap",
      snapTurnAngle: 22.5,
      reducedMotion: !0,
      showTeleportArc: !0,
      comfortSpeed: 0.45
    }), !0) : e === "free" ? (this.setComfortSettings({
      locomotionMode: "smooth",
      turningMode: "smooth",
      reducedMotion: !1,
      showTeleportArc: !1,
      comfortSpeed: 1
    }), !0) : (console.warn(`Unknown comfort preset: ${e}`), !1);
  }
  toggleLocomotionMode() {
    const e = this.comfortSettings.locomotionMode === "smooth" ? "teleport" : "smooth";
    return this.setComfortSettings({ locomotionMode: e });
  }
  toggleTurningMode() {
    const e = this.comfortSettings.turningMode === "smooth" ? "snap" : "smooth";
    return this.setComfortSettings({ turningMode: e });
  }
  toggleReducedMotion() {
    return this.setComfortSettings({ reducedMotion: !this.comfortSettings.reducedMotion });
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
class oh {
  constructor() {
    this.soundEnabled = !1, this.audioContext = null, this._basePath = "./sound/", this.dpvSound = null, this.dpvHighSound = null, this.ambienceSound = null, this.currentMovementSound = null, this.currentBoostSound = null, this.currentAmbienceSound = null, this.baseGainNode = null, this.boostGainNode = null, this.ambienceGainNode = null, this.baseVolumeMultiplier = 1.52, this.boostVolumeMultiplier = 1.01, this.ambienceVolume = 0.1;
  }
  async init(e = "./sound/") {
    try {
      this._basePath = e || this._basePath, this.audioContext || (this.audioContext = new (window.AudioContext || window.webkitAudioContext)());
      const [t, s, i] = await Promise.all([
        this.loadAudioBuffer(this._basePath + "dpv.ogg"),
        this.loadAudioBuffer(this._basePath + "dpvhigh.ogg"),
        this.loadAudioBuffer(this._basePath + "vrambience.ogg")
      ]);
      this.dpvSound = t, this.dpvHighSound = s, this.ambienceSound = i, this.soundEnabled = !0;
    } catch (t) {
      console.warn("🔇 VR Audio initialization failed:", t), this.soundEnabled = !1;
    }
  }
  async loadAudioBuffer(e) {
    const s = await (await fetch(e)).arrayBuffer();
    return await this.audioContext.decodeAudioData(s);
  }
  initAudioOnInteraction(e) {
    try {
      if (!this.audioContext)
        return this.init(e || this._basePath);
      if (this.audioContext.state === "suspended")
        return this.audioContext.resume();
    } catch (t) {
      console.warn("🔇 Audio unlock failed:", t);
    }
  }
  async initImmediatelyForVR(e) {
    try {
      return this.audioContext || await this.init(e || this._basePath), this.audioContext && this.audioContext.state === "suspended" && await this.audioContext.resume(), !0;
    } catch (t) {
      return console.warn("🔇 VR Audio immediate initialization failed:", t), !1;
    }
  }
  startAmbientSound() {
    if (!(!this.audioContext || !this.ambienceSound || this.currentAmbienceSound))
      try {
        const e = this.audioContext.createBufferSource();
        this.ambienceGainNode = this.audioContext.createGain(), e.buffer = this.ambienceSound, e.connect(this.ambienceGainNode), this.ambienceGainNode.connect(this.audioContext.destination), e.loop = !0, this.ambienceGainNode.gain.setValueAtTime(this.ambienceVolume, this.audioContext.currentTime), e.start(), this.currentAmbienceSound = e;
      } catch (e) {
        console.warn("🔇 Error starting ambient sound:", e);
      }
  }
  stopAmbientSound() {
    if (this.currentAmbienceSound && this.ambienceGainNode && this.audioContext)
      try {
        this.currentAmbienceSound.stop(), this.currentAmbienceSound = null, this.ambienceGainNode = null;
      } catch (e) {
        console.warn("🔇 Error stopping ambient sound:", e);
      }
  }
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
  updateAudioLevels(e, t) {
    if (!(!this.baseGainNode || !this.boostGainNode || !this.audioContext))
      try {
        const s = e * this.baseVolumeMultiplier, i = t * this.boostVolumeMultiplier;
        this.baseGainNode.gain.linearRampToValueAtTime(s, this.audioContext.currentTime + 0.1), this.boostGainNode.gain.linearRampToValueAtTime(i, this.audioContext.currentTime + 0.1);
      } catch (s) {
        console.warn("🔇 Error updating audio levels:", s);
      }
  }
  setVolumeMultipliers(e, t, s) {
    typeof e == "number" && e >= 0 && (this.baseVolumeMultiplier = e), typeof t == "number" && t >= 0 && (this.boostVolumeMultiplier = t), typeof s == "number" && s >= 0 && (this.ambienceVolume = s, this.ambienceGainNode && this.ambienceGainNode.gain.setValueAtTime(s, this.audioContext.currentTime));
  }
  getAudioStatus() {
    return {
      enabled: this.soundEnabled,
      contextState: this.audioContext ? this.audioContext.state : "none",
      ambiencePlaying: !!this.currentAmbienceSound,
      movementPlaying: !!this.currentMovementSound,
      boostPlaying: !!this.currentBoostSound
    };
  }
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
class ah {
  /**
   * Creates a new VRManager instance
   * 
   * @param {THREE.WebGLRenderer} renderer - Three.js WebGL renderer with XR enabled
   * @param {THREE.PerspectiveCamera} camera - Three.js camera for VR dolly system
   * @param {THREE.Scene} scene - Three.js scene for VR objects
   * @param {string} [audioPath='./sound/'] - Path to VR audio files
   * @param {boolean} [enableAudio=false] - Enable VR audio system
   * @param {HTMLElement} [container=null] - Container for VR UI
   * @param {Object} [options={}] - VR asset path options
   */
  constructor(e, t, s, i = "./sound/", r = !1, n = null, o = {}) {
    this.renderer = e, this.camera = t, this.scene = s, this.audioPath = i, this.enableAudio = r, this.container = n, this.vrCore = new qc(e, t, s, n), this.vrControllers = new ih(e, t, o), this.vrTeleport = new rh(s, t), this.vrLocomotion = new nh(t, e), this.vrAudio = this.enableAudio ? new oh() : null, this.isVRSupported = !1, this.isVRPresenting = !1, this.controller1 = null, this.controller2 = null, this.controllerGrip1 = null, this.controllerGrip2 = null, this.controllers = [], this.controllerGrips = [], this._preVRCameraState = {
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
    }, this._initialPositions = null, this.lastComfortLog = 0, this.onModeToggle = null, this.onSessionStart = null, this.onSessionEnd = null, this.onMovementStart = null, this.onMovementStop = null, this.onMovementUpdate = null, this.onComfortModeChange = null, this.init();
  }
  setCamera(e) {
    this.camera = e, this.vrCore.camera = e, this.vrControllers.camera = e, this.vrTeleport.camera = e, this.vrLocomotion.camera = e;
  }
  init() {
    this.vrCore.init(), this.vrControllers.init(), this.vrTeleport.init(), this.vrLocomotion.init(), this.setupModuleConnections();
  }
  setupModuleConnections() {
    this.vrCore.onSessionStart = async () => {
      this._saveCameraState(), this.isVRPresenting = !0, this.vrAudio && await this.vrAudio.initImmediatelyForVR(this.audioPath) && this.vrAudio.startAmbientSound(), this.onSessionStart && this.onSessionStart();
    }, this.vrCore.onSessionEnd = () => {
      this.isVRPresenting = !1, this.vrAudio && (this.vrAudio.stopMovementSound(), this.vrAudio.stopAmbientSound()), this._restoreCameraState(), this.onSessionEnd && this.onSessionEnd();
    }, this.vrControllers.onModeToggle = () => {
      this.onModeToggle && this.onModeToggle();
    }, this.vrLocomotion.onMovementStart = () => {
      this.vrAudio && this.isVRPresenting && this.vrAudio.startMovementSound(), this.onMovementStart && this.onMovementStart();
    }, this.vrLocomotion.onMovementStop = () => {
      this.vrAudio && this.isVRPresenting && this.vrAudio.stopMovementSound(), this.onMovementStop && this.onMovementStop();
    }, this.vrLocomotion.onMovementUpdate = (e) => {
      this.vrAudio && this.isVRPresenting && this.vrAudio.updateAudioLevels(
        e.currentSpeed,
        e.currentBoostLevel
      ), this.onMovementUpdate && this.onMovementUpdate(e);
    }, this.vrLocomotion.setTeleportSystem(this.vrTeleport), typeof this._comfortSettingsInitialized > "u" && (this._comfortSettingsInitialized = !0);
  }
  startMovement(e = "forward") {
    this.vrLocomotion.startMovement(e);
  }
  stopMovement() {
    this.vrLocomotion.stopMovement();
  }
  update(e) {
    this.vrControllers.checkControllerButtons();
    const t = {
      ...this.vrControllers.getControllers(),
      inputSources: this.vrControllers.getInputSources(),
      handsActive: this.vrControllers.handsActive,
      handStates: this.vrControllers.handStates,
      updateHandGestures: this.vrControllers.updateHandGestures ? this.vrControllers.updateHandGestures.bind(this.vrControllers) : void 0
    };
    this.vrLocomotion.updateMovement(e, t), this.syncLegacyProperties(), this.ensureComfortSettingsApplied(), this.vrLocomotion.correctDrift();
  }
  syncLegacyProperties() {
    const e = this.vrCore.getVRStatus();
    this.isVRSupported = e.supported, this.isVRPresenting = e.presenting;
    const t = this.vrControllers.getControllers();
    this.controller1 = t.controller1, this.controller2 = t.controller2, this.controllerGrip1 = t.controllerGrip1, this.controllerGrip2 = t.controllerGrip2, this.controllers = t.controllers, this.controllerGrips = t.controllerGrips;
  }
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
    this.vrLocomotion.setComfortSettings(e);
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
   * // Comfort status: settings.enableComfort
   * 
   * @since 1.0.0
   */
  getComfortSettings() {
    return this.vrLocomotion.getComfortSettings();
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
    const t = this.isComfortModeEnabled(), s = this.vrLocomotion.setComfortPreset(e);
    if (s && typeof this.onComfortModeChange == "function") {
      const i = this.isComfortModeEnabled();
      this.onComfortModeChange({
        enabled: i,
        changed: i !== t,
        preset: i ? "comfort" : "free",
        inVR: this.isVRPresenting,
        settings: this.getComfortSettings()
      });
    }
    return s;
  }
  /**
   * Enable or disable comfort mode explicitly.
   *
   * Works both inside and outside active VR sessions by updating locomotion state.
   *
   * @param {boolean} enabled
   * @returns {boolean}
   */
  setComfortMode(e) {
    return this.setComfortPreset(e ? "comfort" : "free");
  }
  /**
   * Toggle comfort mode.
   *
   * @returns {boolean} The new comfort mode state.
   */
  toggleComfortMode() {
    const e = !this.isComfortModeEnabled();
    return this.setComfortMode(e), e;
  }
  /**
   * Check whether comfort mode is currently enabled.
   *
   * @returns {boolean}
   */
  isComfortModeEnabled() {
    const e = this.vrLocomotion.getComfortSettings();
    return e.locomotionMode === "teleport" && e.reducedMotion === !0;
  }
  ensureComfortSettingsApplied() {
    if (!this.isVRPresenting) return;
    this.vrLocomotion.getComfortSettings().locomotionMode === "teleport" && (!this.vrTeleport.teleportCurve || !this.vrTeleport.teleportMarker) && this.vrTeleport.setupTeleportation(), (!this.lastComfortLog || Date.now() - this.lastComfortLog > 1e4) && (this.lastComfortLog = Date.now());
  }
  applyVRPositions(e) {
    if (!(!this.isVRPresenting || !e))
      try {
        const t = e.vr || e, s = this.camera?.parent;
        if (!t || !s)
          return;
        t.camera?.position && this.camera.position.copy(t.camera.position), t.camera?.quaternion && this.camera.quaternion.copy(t.camera.quaternion), t.dolly?.position ? s.position.copy(t.dolly.position) : Number.isFinite(t.dolly?.x) && Number.isFinite(t.dolly?.y) && Number.isFinite(t.dolly?.z) && s.position.set(t.dolly.x, t.dolly.y, t.dolly.z), t.dolly?.quaternion ? s.quaternion.copy(t.dolly.quaternion) : Number.isFinite(t.rotation?.x) && Number.isFinite(t.rotation?.y) && Number.isFinite(t.rotation?.z) && s.rotation.set(t.rotation.x, t.rotation.y, t.rotation.z);
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
   * Set initial positions for fallback when no pre-VR state exists
   * @param {Object} initialPositions - Initial desktop positions
   */
  setInitialPositions(e) {
    this._initialPositions = e;
  }
  /**
   * Save current camera state before entering VR
   */
  _saveCameraState() {
    if (this._preVRCameraState.controls && this._preVRCameraState.controls.target && this.camera) {
      const e = this._preVRCameraState.controls;
      this._preVRCameraState.target = e.target.clone(), this._preVRCameraState.position = this.camera.position.clone(), this._preVRCameraState.zoom = this.camera.zoom, this._preVRCameraState.minDistance = e.minDistance, this._preVRCameraState.maxDistance = e.maxDistance, this._preVRCameraState.enableDamping = e.enableDamping, this._preVRCameraState.dampingFactor = e.dampingFactor, this._preVRCameraState.enableZoom = e.enableZoom, this._preVRCameraState.enablePan = e.enablePan, this._preVRCameraState.enableRotate = e.enableRotate, this._preVRCameraState.autoRotate = e.autoRotate, this._preVRCameraState.autoRotateSpeed = e.autoRotateSpeed;
    }
  }
  /**
   * Restore camera state after exiting VR
   * First tries to restore pre-VR state, falls back to initial positions if available
   */
  _restoreCameraState() {
    const e = this._preVRCameraState.controls;
    if (!e) {
      console.warn("VRManager: No controls reference for camera restoration");
      return;
    }
    if (this._preVRCameraState.target && this._preVRCameraState.position)
      this.camera.position.copy(this._preVRCameraState.position), this.camera.zoom = this._preVRCameraState.zoom || 1, this.camera.updateProjectionMatrix(), e.target.copy(this._preVRCameraState.target), e.minDistance = this._preVRCameraState.minDistance, e.maxDistance = this._preVRCameraState.maxDistance, e.enableDamping = this._preVRCameraState.enableDamping, e.dampingFactor = this._preVRCameraState.dampingFactor, e.enableZoom = this._preVRCameraState.enableZoom, e.enablePan = this._preVRCameraState.enablePan, e.enableRotate = this._preVRCameraState.enableRotate, e.autoRotate = this._preVRCameraState.autoRotate, e.autoRotateSpeed = this._preVRCameraState.autoRotateSpeed;
    else if (this._initialPositions && this._initialPositions.desktop) {
      const t = this._initialPositions.desktop;
      t.camera && this.camera.position.set(
        t.camera.x,
        t.camera.y,
        t.camera.z
      ), t.target && e.target.set(
        t.target.x,
        t.target.y,
        t.target.z
      );
    } else
      console.warn("VRManager: No pre-VR state or initial positions available for restoration");
    e.update(), requestAnimationFrame(() => {
      e.update();
    });
  }
  getVRStatus() {
    const e = this.vrCore.getVRStatus(), t = this.vrAudio ? this.vrAudio.getAudioStatus() : { enabled: !1 }, s = this.vrLocomotion.getMovementState(), i = this.vrLocomotion.getComfortSettings();
    return {
      ...e,
      audio: t,
      movement: s,
      comfort: i
    };
  }
  setAudioMuted(e) {
    this.vrAudio && this.vrAudio.setMuted(e);
  }
  setAudioVolumeMultipliers(e, t, s) {
    this.vrAudio && this.vrAudio.setVolumeMultipliers(e, t, s);
  }
  resetTeleportState() {
    this.vrTeleport.resetTeleportState();
  }
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
    this.vrCore.dispose(), this.vrControllers.dispose(), this.vrTeleport.dispose(), this.vrAudio && this.vrAudio.dispose(), this.onModeToggle = null, this.onSessionStart = null, this.onSessionEnd = null, this.onMovementStart = null, this.onMovementStop = null, this.onMovementUpdate = null;
  }
  checkVRSupport() {
    return this.vrCore.checkVRSupported();
  }
  normalizeAngle(e) {
    return this.vrLocomotion.normalizeAngle(e);
  }
}
class lh {
  /**
   * Constructs a new AR button.
   *
   * @param {WebGLRenderer|WebGPURenderer} renderer - The renderer.
   * @param {XRSessionInit} [sessionInit] - The a configuration object for the AR session.
   * @return {HTMLElement} The button or an error message if `immersive-ar` isn't supported.
   */
  static createButton(e, t = {}) {
    const s = document.createElement("button");
    function i() {
      if (t.domOverlay === void 0) {
        const d = document.createElement("div");
        d.style.display = "none", document.body.appendChild(d);
        const u = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        u.setAttribute("width", 38), u.setAttribute("height", 38), u.style.position = "absolute", u.style.right = "20px", u.style.top = "20px", u.addEventListener("click", function() {
          c.end();
        }), d.appendChild(u);
        const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
        p.setAttribute("d", "M 12,12 L 28,28 M 28,12 12,28"), p.setAttribute("stroke", "#fff"), p.setAttribute("stroke-width", 2), u.appendChild(p), t.optionalFeatures === void 0 && (t.optionalFeatures = []), t.optionalFeatures.push("dom-overlay"), t.domOverlay = { root: d };
      }
      let c = null;
      async function A(d) {
        d.addEventListener("end", h), e.xr.setReferenceSpaceType("local"), await e.xr.setSession(d), s.textContent = "STOP AR", t.domOverlay.root.style.display = "", c = d;
      }
      function h() {
        c.removeEventListener("end", h), s.textContent = "START AR", t.domOverlay.root.style.display = "none", c = null;
      }
      s.style.display = "", s.style.cursor = "pointer", s.style.left = "calc(50% - 50px)", s.style.width = "100px", s.textContent = "START AR", s.onmouseenter = function() {
        s.style.opacity = "1.0";
      }, s.onmouseleave = function() {
        s.style.opacity = "0.5";
      }, s.onclick = function() {
        c === null ? navigator.xr.requestSession("immersive-ar", t).then(A) : (c.end(), navigator.xr.offerSession !== void 0 && navigator.xr.offerSession("immersive-ar", t).then(A).catch((d) => {
          console.warn(d);
        }));
      }, navigator.xr.offerSession !== void 0 && navigator.xr.offerSession("immersive-ar", t).then(A).catch((d) => {
        console.warn(d);
      });
    }
    function r() {
      s.style.display = "", s.style.cursor = "auto", s.style.left = "calc(50% - 75px)", s.style.width = "150px", s.onmouseenter = null, s.onmouseleave = null, s.onclick = null;
    }
    function n() {
      r(), s.textContent = "AR NOT SUPPORTED";
    }
    function o(c) {
      r(), console.warn("Exception when trying to call xr.isSessionSupported", c), s.textContent = "AR NOT ALLOWED";
    }
    function l(c) {
      c.style.position = "absolute", c.style.bottom = "20px", c.style.padding = "12px 6px", c.style.border = "1px solid #fff", c.style.borderRadius = "4px", c.style.background = "rgba(0,0,0,0.1)", c.style.color = "#fff", c.style.font = "normal 13px sans-serif", c.style.textAlign = "center", c.style.opacity = "0.5", c.style.outline = "none", c.style.zIndex = "999";
    }
    if ("xr" in navigator)
      return s.id = "ARButton", s.style.display = "none", l(s), navigator.xr.isSessionSupported("immersive-ar").then(function(c) {
        c ? i() : n();
      }).catch(o), s;
    {
      const c = document.createElement("a");
      return window.isSecureContext === !1 ? (c.href = document.location.href.replace(/^http:/, "https:"), c.innerHTML = "WEBXR NEEDS HTTPS") : (c.href = "https://immersiveweb.dev/", c.innerHTML = "WEBXR NOT AVAILABLE"), c.style.left = "calc(50% - 90px)", c.style.width = "180px", c.style.textDecoration = "none", l(c), c;
    }
  }
}
class ch {
  constructor(e, t, s, i = null) {
    this.renderer = e, this.camera = t, this.scene = s, this.container = i || document.body, this.isARSupported = !1, this.isARPresenting = !1, this.isQuest2 = !1, this.isQuest3 = !1, this.arButton = null, this.buttonObserver = null, this.onSessionStart = null, this.onSessionEnd = null;
  }
  init() {
    this.renderer.xr.enabled = !0, this.removeExistingARButtons(), this.checkARSupported().then(() => {
      this.isARSupported && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
        this.createARButton();
      }) : this.createARButton());
    }), this.setupSessionListeners(), "xr" in navigator ? navigator.xr.isSessionSupported("immersive-ar").then((e) => {
      e || this.startARButtonMonitoring();
    }).catch(() => {
      this.startARButtonMonitoring();
    }) : this.startARButtonMonitoring();
  }
  checkARSupported() {
    return new Promise((e) => {
      try {
        "xr" in navigator ? navigator.xr.isSessionSupported("immersive-ar").then((t) => {
          this.isARSupported = t, e();
        }).catch(() => {
          this.isARSupported = !1, e();
        }) : (this.isARSupported = !1, e());
      } catch {
        this.isARSupported = !1, e();
      }
    });
  }
  createARButton() {
    this.waitForARCSS().then(() => {
      const e = {
        requiredFeatures: ["local"],
        optionalFeatures: this.getOptionalFeatures()
      };
      this.arButton = lh.createButton(this.renderer, e), this.arButton.innerHTML = '<span class="ar-icon">👁️</span>ENTER AR', this.arButton.className = "ar-button--glass ar-button-available", this.arButton.disabled = !1, this.arButton.style.cssText = `
        position: fixed !important;
        bottom: 140px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        z-index: 2147483647 !important;
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
        cursor: pointer !important;
      `, this.container.appendChild(this.arButton), this.styleARButton();
    });
  }
  getOptionalFeatures() {
    return ["hand-tracking"];
  }
  styleARButton() {
    const e = () => {
      const t = document.querySelector("button.ar-button--glass") || this.arButton;
      return t ? (t.style.display = "flex", t.style.visibility = "visible", t.style.opacity = "1", t.innerHTML = '<span class="ar-icon">👁️</span>ENTER AR', t.classList.contains("ar-button--glass") || t.classList.add("ar-button--glass"), t.disabled = !1, t.classList.remove("ar-generic-disabled"), !0) : !1;
    };
    e() || (setTimeout(e, 100), setTimeout(e, 300), setTimeout(e, 500));
  }
  setupSessionListeners() {
    this.renderer.xr.addEventListener("sessionstart", () => {
      this.isARPresenting = !0;
      const e = this.detectQuestDevice();
      this.applyQuestOptimizations(e), this.onSessionStart && this.onSessionStart();
    }), this.renderer.xr.addEventListener("sessionend", () => {
      this.isARPresenting = !1, this.onSessionEnd && this.onSessionEnd();
    });
  }
  detectQuestDevice() {
    try {
      const e = navigator.userAgent.toLowerCase();
      return e.includes("quest 2") || e.includes("oculus quest 2") || e.includes("oculus") && e.includes("android") && !e.includes("quest 3") ? (this.isQuest2 = !0, "quest2") : e.includes("quest 3") || e.includes("oculus quest 3") || e.includes("meta quest 3") ? (this.isQuest3 = !0, "quest3") : "unknown";
    } catch {
      return "unknown";
    }
  }
  applyQuestOptimizations(e) {
    (e === "quest2" || e === "quest3") && (this.camera.far = 2e3, this.camera.updateProjectionMatrix());
  }
  async waitForARCSS() {
    return new Promise((e) => {
      const t = () => {
        const s = document.createElement("div");
        s.className = "ar-mode-active", s.style.display = "none", this.container.appendChild(s);
        const i = window.getComputedStyle(s), r = i.getPropertyValue("--ar-css-loaded") === "true" || i.opacity === "0.998";
        this.container.removeChild(s), r ? e() : setTimeout(t, 50);
      };
      setTimeout(t, 100);
    });
  }
  removeExistingARButtons() {
    document.querySelectorAll('button.legacy-ar-button, a[href="#AR"]').forEach((t) => {
      t.parentNode && t.parentNode.removeChild(t);
    });
  }
  startARButtonMonitoring() {
    this.buttonObserver || (this.buttonObserver = new MutationObserver((e) => {
      e.forEach((t) => {
        t.addedNodes.forEach((s) => {
          if (s.nodeType === Node.ELEMENT_NODE) {
            const i = s.querySelectorAll ? s.querySelectorAll('button.legacy-ar-button, a[href="#AR"]') : [];
            if (i.length > 0 || s.tagName === "BUTTON" && s.classList.contains("legacy-ar-button")) {
              const r = i.length > 0 ? i[0] : s;
              r.style.display = "none";
            }
          }
        });
      });
    }), this.buttonObserver.observe(document.body, { childList: !0, subtree: !0 }));
  }
  getARStatus() {
    return {
      supported: this.isARSupported,
      presenting: this.isARPresenting,
      isQuest2: this.isQuest2,
      isQuest3: this.isQuest3
    };
  }
  dispose() {
    this.buttonObserver && (this.buttonObserver.disconnect(), this.buttonObserver = null), this.arButton && this.arButton.parentNode && this.arButton.parentNode.removeChild(this.arButton), this.isQuest2 = !1, this.isQuest3 = !1, this.isARSupported = !1, this.isARPresenting = !1;
  }
}
const Tr = new U(), Qr = new x();
class Rr {
  /**
   * Constructs a new XR hand primitive model.
   *
   * @param {XRHandModel} handModel - The hand model.
   * @param {Group} controller - The WebXR controller.
   * @param {string} path - The model path.
   * @param {XRHandedness} handedness - The handedness of the XR input source.
   * @param {XRHandPrimitiveModel~Options} options - The model options.
   */
  constructor(e, t, s, i, r) {
    this.controller = t, this.handModel = e, this.envMap = null;
    let n;
    !r || !r.primitive || r.primitive === "sphere" ? n = new Zr(1, 10, 10) : r.primitive === "box" && (n = new Go(1, 1, 1));
    const o = new hi();
    this.handMesh = new ci(n, o, 30), this.handMesh.frustumCulled = !1, this.handMesh.instanceMatrix.setUsage(No), this.handMesh.castShadow = !0, this.handMesh.receiveShadow = !0, this.handModel.add(this.handMesh), this.joints = [
      "wrist",
      "thumb-metacarpal",
      "thumb-phalanx-proximal",
      "thumb-phalanx-distal",
      "thumb-tip",
      "index-finger-metacarpal",
      "index-finger-phalanx-proximal",
      "index-finger-phalanx-intermediate",
      "index-finger-phalanx-distal",
      "index-finger-tip",
      "middle-finger-metacarpal",
      "middle-finger-phalanx-proximal",
      "middle-finger-phalanx-intermediate",
      "middle-finger-phalanx-distal",
      "middle-finger-tip",
      "ring-finger-metacarpal",
      "ring-finger-phalanx-proximal",
      "ring-finger-phalanx-intermediate",
      "ring-finger-phalanx-distal",
      "ring-finger-tip",
      "pinky-finger-metacarpal",
      "pinky-finger-phalanx-proximal",
      "pinky-finger-phalanx-intermediate",
      "pinky-finger-phalanx-distal",
      "pinky-finger-tip"
    ];
  }
  /**
   * Updates the mesh based on the tracked XR joints data.
   */
  updateMesh() {
    const t = this.controller.joints;
    let s = 0;
    for (let i = 0; i < this.joints.length; i++) {
      const r = t[this.joints[i]];
      r.visible && (Qr.setScalar(r.jointRadius || 8e-3), Tr.compose(r.position, r.quaternion, Qr), this.handMesh.setMatrixAt(i, Tr), s++);
    }
    this.handMesh.count = s, this.handMesh.instanceMatrix.needsUpdate = !0;
  }
}
const hh = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles/generic-hand/";
class Ah {
  /**
   * Constructs a new XR hand mesh model.
   *
   * @param {XRHandModel} handModel - The hand model.
   * @param {Group} controller - The WebXR controller.
   * @param {?string} path - The model path.
   * @param {XRHandedness} handedness - The handedness of the XR input source.
   * @param {?Loader} [loader=null] - The loader. If not provided, an instance of `GLTFLoader` will be used to load models.
   * @param {?Function} [onLoad=null] - A callback that is executed when a controller model has been loaded.
   */
  constructor(e, t, s, i, r = null, n = null) {
    this.controller = t, this.handModel = e, this.bones = [], r === null && (r = new Ge(), r.setPath(s || hh)), r.load(`${i}.glb`, (o) => {
      const l = o.scene.children[0];
      this.handModel.add(l);
      const c = l.getObjectByProperty("type", "SkinnedMesh");
      c.frustumCulled = !1, c.castShadow = !0, c.receiveShadow = !0, [
        "wrist",
        "thumb-metacarpal",
        "thumb-phalanx-proximal",
        "thumb-phalanx-distal",
        "thumb-tip",
        "index-finger-metacarpal",
        "index-finger-phalanx-proximal",
        "index-finger-phalanx-intermediate",
        "index-finger-phalanx-distal",
        "index-finger-tip",
        "middle-finger-metacarpal",
        "middle-finger-phalanx-proximal",
        "middle-finger-phalanx-intermediate",
        "middle-finger-phalanx-distal",
        "middle-finger-tip",
        "ring-finger-metacarpal",
        "ring-finger-phalanx-proximal",
        "ring-finger-phalanx-intermediate",
        "ring-finger-phalanx-distal",
        "ring-finger-tip",
        "pinky-finger-metacarpal",
        "pinky-finger-phalanx-proximal",
        "pinky-finger-phalanx-intermediate",
        "pinky-finger-phalanx-distal",
        "pinky-finger-tip"
      ].forEach((h) => {
        const d = l.getObjectByName(h);
        d !== void 0 ? d.jointName = h : console.warn(`Couldn't find ${h} in ${i} hand mesh`), this.bones.push(d);
      }), n && n(l);
    });
  }
  /**
   * Updates the mesh based on the tracked XR joints data.
   */
  updateMesh() {
    const e = this.controller.joints;
    for (let t = 0; t < this.bones.length; t++) {
      const s = this.bones[t];
      if (s) {
        const i = e[s.jointName];
        if (i.visible) {
          const r = i.position;
          s.position.copy(r), s.quaternion.copy(i.quaternion);
        }
      }
    }
  }
}
class dh extends is {
  /**
   * Constructs a new XR hand model.
   *
   * @param {Group} controller - The hand controller.
   */
  constructor(e) {
    super(), this.controller = e, this.motionController = null, this.envMap = null, this.mesh = null;
  }
  /**
   * Overwritten with a custom implementation. Makes sure the motion controller updates the mesh.
   *
   * @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
   * when {@link Object3D#matrixWorldAutoUpdate} is set to `false`.
   */
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.motionController && this.motionController.updateMesh();
  }
}
class uh {
  /**
   * Constructs a new XR hand model factory.
   *
   * @param {?GLTFLoader} [gltfLoader=null] - A glTF loader that is used to load hand models.
   * @param {?Function} [onLoad=null] - A callback that is executed when a hand model has been loaded.
   */
  constructor(e = null, t = null) {
    this.gltfLoader = e, this.path = null, this.onLoad = t;
  }
  /**
   * Sets the path to the hand model repository.
   *
   * @param {string} path - The path to set.
   * @return {XRHandModelFactory} A reference to this instance.
   */
  setPath(e) {
    return this.path = e, this;
  }
  /**
   * Creates a controller model for the given WebXR hand controller.
   *
   * @param {Group} controller - The hand controller.
   * @param {('spheres'|'boxes'|'mesh')} [profile] - The model profile that defines the model type.
   * @return {XRHandModel} The XR hand model.
   */
  createHandModel(e, t) {
    const s = new dh(e);
    return e.addEventListener("connected", (i) => {
      const r = i.data;
      r.hand && !s.motionController && (s.xrInputSource = r, t === void 0 || t === "spheres" ? s.motionController = new Rr(s, e, this.path, r.handedness, { primitive: "sphere" }) : t === "boxes" ? s.motionController = new Rr(s, e, this.path, r.handedness, { primitive: "box" }) : t === "mesh" && (s.motionController = new Ah(s, e, this.path, r.handedness, this.gltfLoader, this.onLoad))), e.visible = !0;
    }), e.addEventListener("disconnected", () => {
      e.visible = !1;
    }), s;
  }
}
class ph {
  constructor(e, t = {}) {
    this.renderer = e, this.assetPaths = cs(t), this.handModelFactory = new uh(), this.handModelFactory.setPath(Kt(this.assetPaths.webxrInputProfilesPath, "generic-hand/")), this.hand1 = null, this.hand2 = null, this.interactionEnabled = !0, this.dragging = !1, this.scaling = !1, this.rotating = !1, this.dragStartPos = new f.Vector3(), this.scaleStartDistance = 0, this.rotateStartAngle = 0, this.pinchIntent = {
      hand1Start: 0,
      hand2Start: 0,
      delay: 100
    }, this.inertiaActive = !1, this.posVelocity = new f.Vector3(), this.rotVelocity = 0, this.scaleVelocity = 0, this.POSITION_DAMPING = 100, this.ROTATION_DAMPING = 8, this.SCALE_DAMPING = 8, this.MAX_ROT_VELOCITY = Math.PI, this.MAX_SCALE_VELOCITY = 0.5, this.MIN_SCALE = 0.01, this.MAX_SCALE = 1, this.VELOCITY_DEAD_ZONE = 1e-3, this.DISTANCE_GAIN_THRESHOLD = 5, this.MAX_DISTANCE_GAIN = 3, this.MAX_DELTA_PER_FRAME = 0.5, this.MIN_TWO_HAND_DISTANCE = 0.04, this.MAX_ROT_DELTA_PER_FRAME = 0.35, this.VELOCITY_SMOOTHING = 0.3, this.tempVec1 = new f.Vector3(), this.tempVec2 = new f.Vector3(), this.onGestureStart = null, this.onGestureEnd = null;
  }
  init(e) {
    this.hand1 = this.setupHand(e, 0, "hand1Start"), this.hand2 = this.setupHand(e, 1, "hand2Start");
  }
  setupHand(e, t, s) {
    const i = this.renderer.xr.getHand(t);
    i.userData.pinch = !1, i.userData.handedness = null, i.addEventListener("pinchstart", () => {
      if (!this.interactionEnabled) {
        i.userData.pinch = !1, this.pinchIntent[s] = 0;
        return;
      }
      i.userData.pinch = !0, this.pinchIntent[s] = performance.now();
    }), i.addEventListener("pinchend", () => {
      i.userData.pinch = !1, this.onPinchEnd();
    }), i.addEventListener("connected", (n) => {
      i.userData.handedness = n.data?.handedness || null, i.userData.pinch = !1, this.pinchIntent[s] = 0;
    }), i.addEventListener("disconnected", () => {
      i.userData.handedness = null, i.userData.pinch = !1, this.pinchIntent[s] = 0, this.onPinchEnd();
    });
    const r = this.handModelFactory.createHandModel(i, "mesh");
    return i.add(r), e.add(i), r.addEventListener("connected", () => {
      this.styleHandModel(r, 16777215, 0.5);
    }), i;
  }
  styleHandModel(e, t, s) {
    e.traverse((i) => {
      i.isMesh && (i.material = new f.MeshStandardMaterial({
        color: t,
        roughness: 0.8,
        metalness: 0.2,
        transparent: !0,
        opacity: s
      }));
    });
  }
  update(e, t, s) {
    t && (this.handleGestures(e, t, s), this.inertiaActive && !this.dragging && !this.scaling && !this.rotating && this.applyInertia(e, t));
  }
  handleGestures(e, t, s) {
    if (!this.interactionEnabled || !this.hand1 || !this.hand2) return;
    const i = this.hand1.joints?.["index-finger-tip"], r = this.hand2.joints?.["index-finger-tip"];
    if (!i || !r) {
      (this.dragging || this.scaling || this.rotating) && this.onPinchEnd();
      return;
    }
    const n = performance.now(), o = this.hand1.userData.pinch && n - this.pinchIntent.hand1Start >= this.pinchIntent.delay, l = this.hand2.userData.pinch && n - this.pinchIntent.hand2Start >= this.pinchIntent.delay;
    if (o && !this.hand2.userData.pinch || l && !this.hand1.userData.pinch) {
      const A = (o ? this.hand1 : this.hand2).joints["index-finger-tip"];
      if (!this.dragging)
        (this.scaling || this.rotating) && (this.rotVelocity = 0, this.scaleVelocity = 0), this.dragging = !0, this.scaling = !1, this.rotating = !1, A.getWorldPosition(this.dragStartPos), this.onGestureStart && this.onGestureStart("drag");
      else {
        A.getWorldPosition(this.tempVec1);
        const h = this.tempVec1.clone().sub(this.dragStartPos);
        if (h.length() > this.MAX_DELTA_PER_FRAME && h.normalize().multiplyScalar(this.MAX_DELTA_PER_FRAME), s) {
          const d = s.position.distanceTo(t.position);
          if (d > this.DISTANCE_GAIN_THRESHOLD) {
            const u = Math.min(
              this.MAX_DISTANCE_GAIN,
              1 + (d - this.DISTANCE_GAIN_THRESHOLD) / 7.5
            );
            h.multiplyScalar(u);
          }
        }
        if (t.position.add(h), e > 0) {
          const d = h.clone().divideScalar(e);
          this.posVelocity.lerp(d, this.VELOCITY_SMOOTHING);
        }
        this.dragStartPos.copy(this.tempVec1);
      }
    } else if (o && l) {
      const c = this.hand1.userData.handedness === "right" && this.hand2.userData.handedness === "left", A = c ? r : i, h = c ? i : r;
      A.getWorldPosition(this.tempVec1), h.getWorldPosition(this.tempVec2);
      const d = this.tempVec1.distanceTo(this.tempVec2);
      if (d < this.MIN_TWO_HAND_DISTANCE) {
        this.dragging = !1, this.scaling = !1, this.rotating = !1, this.rotVelocity = 0, this.scaleVelocity = 0;
        return;
      }
      if (!this.scaling && !this.rotating) {
        this.dragging = !1, this.scaling = !0, this.rotating = !0, this.scaleStartDistance = d;
        const u = this.tempVec2.x - this.tempVec1.x, p = this.tempVec2.z - this.tempVec1.z;
        this.rotateStartAngle = Math.atan2(p, u), this.onGestureStart && this.onGestureStart("two-hand");
      } else {
        const u = d / this.scaleStartDistance, p = Math.log(t.scale.x), g = Math.log(u), b = p + g, C = Math.max(this.MIN_SCALE, Math.min(this.MAX_SCALE, Math.exp(b)));
        if (t.scale.setScalar(C), e > 0) {
          const B = g / e, w = Math.max(-this.MAX_SCALE_VELOCITY, Math.min(this.MAX_SCALE_VELOCITY, B));
          this.scaleVelocity = this.scaleVelocity * (1 - this.VELOCITY_SMOOTHING) + w * this.VELOCITY_SMOOTHING;
        }
        this.scaleStartDistance = d;
        const y = this.tempVec2.x - this.tempVec1.x, E = this.tempVec2.z - this.tempVec1.z, m = Math.atan2(E, y);
        let I = m - this.rotateStartAngle;
        if (I > Math.PI && (I -= 2 * Math.PI), I < -Math.PI && (I += 2 * Math.PI), I = Math.max(
          -this.MAX_ROT_DELTA_PER_FRAME,
          Math.min(this.MAX_ROT_DELTA_PER_FRAME, I)
        ), t.rotation.y += I, e > 0) {
          const B = I / e, w = Math.max(-this.MAX_ROT_VELOCITY, Math.min(this.MAX_ROT_VELOCITY, B));
          this.rotVelocity = this.rotVelocity * (1 - this.VELOCITY_SMOOTHING) + w * this.VELOCITY_SMOOTHING;
        }
        this.rotateStartAngle = m;
      }
    }
  }
  onPinchEnd() {
    if (!this.hand1.userData.pinch && !this.hand2.userData.pinch) {
      const e = this.dragging || this.scaling || this.rotating;
      this.dragging = !1, this.scaling = !1, this.rotating = !1, e && (this.onGestureEnd && this.onGestureEnd(), this.posVelocity.lengthSq() < this.VELOCITY_DEAD_ZONE && this.posVelocity.set(0, 0, 0), Math.abs(this.rotVelocity) < this.VELOCITY_DEAD_ZONE && (this.rotVelocity = 0), Math.abs(this.scaleVelocity) < this.VELOCITY_DEAD_ZONE && (this.scaleVelocity = 0), (this.posVelocity.lengthSq() > 0 || Math.abs(this.rotVelocity) > 0 || Math.abs(this.scaleVelocity) > 0) && (this.inertiaActive = !0));
    } else (!this.hand1.userData.pinch || !this.hand2.userData.pinch) && (this.scaling = !1, this.rotating = !1, this.rotVelocity = 0, this.scaleVelocity = 0);
  }
  applyInertia(e, t) {
    const s = Math.exp(-this.POSITION_DAMPING * e), i = Math.exp(-this.ROTATION_DAMPING * e), r = Math.exp(-this.SCALE_DAMPING * e);
    this.posVelocity.multiplyScalar(s), this.rotVelocity *= i, this.scaleVelocity *= r, t.position.addScaledVector(this.posVelocity, e), t.rotation.y += this.rotVelocity * e;
    const o = Math.log(t.scale.x) + this.scaleVelocity * e, l = Math.max(this.MIN_SCALE, Math.min(this.MAX_SCALE, Math.exp(o)));
    t.scale.setScalar(l), this.posVelocity.lengthSq() < this.VELOCITY_DEAD_ZONE && this.posVelocity.set(0, 0, 0), Math.abs(this.rotVelocity) < this.VELOCITY_DEAD_ZONE && (this.rotVelocity = 0), Math.abs(this.scaleVelocity) < this.VELOCITY_DEAD_ZONE && (this.scaleVelocity = 0), this.posVelocity.lengthSq() === 0 && this.rotVelocity === 0 && this.scaleVelocity === 0 && (this.inertiaActive = !1);
  }
  stop() {
    this.dragging = !1, this.scaling = !1, this.rotating = !1, this.inertiaActive = !1, this.posVelocity.set(0, 0, 0), this.rotVelocity = 0, this.scaleVelocity = 0, this.hand1 && (this.hand1.userData.pinch = !1), this.hand2 && (this.hand2.userData.pinch = !1), this.pinchIntent.hand1Start = 0, this.pinchIntent.hand2Start = 0;
  }
  /**
   * Enable or disable hand gesture interactions.
   * When disabled, all gestures are silently ignored (useful for remote scenarios).
   * @param {boolean} enabled - true to allow interactions, false to block them
   */
  setInteractionEnabled(e) {
    this.interactionEnabled !== e && this.stop(), this.interactionEnabled = e, e || this.stop();
  }
  dispose() {
    this.hand1 && this.hand1.clear(), this.hand2 && this.hand2.clear(), this.stop();
  }
}
class gh extends It {
  constructor(e, t, s, i = {}, r = null, n = {}) {
    super(), this.renderer = e, this.camera = t, this.scene = s, this.config = {
      enableHandTracking: !0,
      enableWorldCube: !0,
      defaultScale: 0.05,
      worldCubeSize: 1e3,
      worldCubeOpacity: 0.1,
      ...i
    }, this.container = r, this.options = n, this.arCore = new ch(e, t, s, r), this.handTracking = this.config.enableHandTracking ? new ph(e, n) : null, this.modelGroup = new f.Group(), this.modelGroup.name = "AR Model Group", this.scene.add(this.modelGroup), this.currentModel = null, this.pendingModel = null, this.pendingModelConfig = null, this.currentModelScale = this.config.defaultScale, this.worldCube = null, this.config.enableWorldCube && this.createWorldCube(), this.isARPresenting = !1, this.previousGestureType = null, this.init();
  }
  setCamera(e) {
    this.camera = e, this.arCore.camera = e;
  }
  init() {
    this.arCore.init(), this.handTracking && (this.handTracking.init(this.scene), this.handTracking.onGestureStart = (e) => {
      this.previousGestureType !== e && (this.emit("gesture-start", e), this.previousGestureType = e);
    }, this.handTracking.onGestureEnd = () => {
      this.previousGestureType && (this.emit("gesture-end", this.previousGestureType), this.previousGestureType = null);
    }), this.setupSessionLifecycle();
  }
  setupSessionLifecycle() {
    this.arCore.onSessionStart = () => {
      this.isARPresenting = !0, this.activateModel(), this.worldCube && (this.worldCube.visible = !0), this.emit("session-start");
    }, this.arCore.onSessionEnd = () => {
      this.isARPresenting = !1, this.worldCube && (this.worldCube.visible = !1), this.handTracking && this.handTracking.stop(), this.emit("session-end");
    };
  }
  prepareModel(e, t = null) {
    if (this.handTracking && this.handTracking.stop(), this.pendingModel = e, this.pendingModelConfig = t, e) {
      const s = t?.defaultScale || e.userData?.defaultScale || this.config.defaultScale;
      this.currentModelScale = s, this.isARPresenting && this.activateModel();
    } else
      this.isARPresenting && this.activateModel();
  }
  activateModel() {
    if (this.currentModel)
      for (this.modelGroup.remove(this.currentModel); this.modelGroup.children.length > 0; )
        this.modelGroup.remove(this.modelGroup.children[0]);
    this.currentModel = this.pendingModel, this.currentModel && (this.modelGroup.add(this.currentModel), this.modelGroup.position.set(0, 0, 0), this.modelGroup.rotation.set(0, 0, 0), this.modelGroup.scale.setScalar(this.currentModelScale));
  }
  setTargetModel(e, t = null) {
    this.prepareModel(e, t);
  }
  update(e) {
    if (!this.isActive() || !this.currentModel) return;
    const t = e / 1e3;
    this.handTracking && this.handTracking.update(t, this.modelGroup, this.camera);
  }
  createWorldCube() {
    const e = this.config.worldCubeSize, t = new f.BoxGeometry(e, e, e), s = new f.MeshBasicMaterial({
      color: 0,
      transparent: !0,
      opacity: this.config.worldCubeOpacity,
      side: f.BackSide,
      depthWrite: !1
    });
    this.worldCube = new f.Mesh(t, s), this.worldCube.name = "AR World Cube", this.worldCube.visible = !1, this.scene.add(this.worldCube);
  }
  setWorldCubeOpacity(e) {
    this.worldCube && (this.worldCube.material.opacity = Math.max(0, Math.min(1, e)));
  }
  setModelScale(e) {
    this.modelGroup && this.modelGroup.scale.setScalar(Math.max(0.01, Math.min(1, e)));
  }
  setModelOpacity(e) {
    this.currentModel && this.currentModel.traverse((t) => {
      t.isMesh && t.material && (t.material.transparent = !0, t.material.opacity = Math.max(0, Math.min(1, e)));
    });
  }
  getModelTransform() {
    return {
      position: {
        x: this.modelGroup.position.x,
        y: this.modelGroup.position.y,
        z: this.modelGroup.position.z
      },
      rotation: {
        x: this.modelGroup.rotation.x,
        y: this.modelGroup.rotation.y,
        z: this.modelGroup.rotation.z
      },
      scale: {
        x: this.modelGroup.scale.x,
        y: this.modelGroup.scale.y,
        z: this.modelGroup.scale.z
      }
    };
  }
  setModelTransform(e) {
    e.position && this.modelGroup.position.set(e.position.x, e.position.y, e.position.z), e.rotation && this.modelGroup.rotation.set(e.rotation.x, e.rotation.y, e.rotation.z), e.scale && this.modelGroup.scale.set(e.scale.x, e.scale.y, e.scale.z);
  }
  isActive() {
    return this.isARPresenting;
  }
  getARStatus() {
    return this.arCore.getARStatus();
  }
  dispose() {
    this.arCore && this.arCore.dispose(), this.handTracking && this.handTracking.dispose(), this.worldCube && (this.scene.remove(this.worldCube), this.worldCube.geometry.dispose(), this.worldCube.material.dispose()), this.modelGroup && this.scene.remove(this.modelGroup), this.isARPresenting = !1, this.currentModel = null;
  }
}
class Dr {
  /**
   * Initialize debug commands with a BelowViewer instance
   * 
   * @param {BelowViewer} viewer - The BelowViewer instance to debug
   */
  static init(e) {
    typeof window > "u" || (window.belowViewer = e, window.camera = () => {
      if (!e.cameraManager?.camera || !e.cameraManager?.controls)
        return console.warn("Camera not initialized"), null;
      const t = e.cameraManager.camera.position, s = e.cameraManager.controls.target, i = e.dolly ? {
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
      }, r = {
        desktop: {
          camera: {
            x: parseFloat(t.x.toFixed(3)),
            y: parseFloat(t.y.toFixed(3)),
            z: parseFloat(t.z.toFixed(3))
          },
          target: {
            x: parseFloat(s.x.toFixed(3)),
            y: parseFloat(s.y.toFixed(3)),
            z: parseFloat(s.z.toFixed(3))
          }
        },
        vr: i
      };
      return console.log("🎥 Current camera positions:"), console.log("📋 Copy this for initialPositions config:"), console.log(JSON.stringify(r, null, 2)), r;
    }, window.camera.setOrthographic = () => {
      if (!e.cameraManager?.camera || !e.cameraManager?.controls)
        return console.warn("Camera not initialized"), null;
      const t = e.setOrthographicCamera?.() || e.cameraManager.setOrthographic(
        e.container?.clientWidth || window.innerWidth,
        e.container?.clientHeight || window.innerHeight
      );
      return console.log("Camera projection: orthographic"), { projection: "orthographic", camera: t };
    }, window.camera.setPerspective = () => {
      if (!e.cameraManager?.camera || !e.cameraManager?.controls)
        return console.warn("Camera not initialized"), null;
      const t = e.setPerspectiveCamera?.() || e.cameraManager.setPerspective(
        e.container?.clientWidth || window.innerWidth,
        e.container?.clientHeight || window.innerHeight
      );
      return console.log("Camera projection: perspective"), { projection: "perspective", camera: t };
    }, window.camera.setFar = (t = 2e3) => {
      const s = Number(t);
      if (!Number.isFinite(s) || s <= 0)
        return console.warn("Usage: camera.setFar(10000)"), null;
      const i = e.setCameraFar?.(s) || e.cameraManager?.setFar?.(s);
      return i ? (console.log(`Camera far clipping: ${i.far}`), i) : (console.warn("Camera not initialized"), null);
    }, window.camera.setClipping = (t, s) => {
      if (t === void 0 && s === void 0) {
        const n = e.cameraManager?.camera;
        if (!n)
          return console.warn("Camera not initialized"), null;
        const o = { near: n.near, far: n.far };
        return console.table(o), console.log("Usage: camera.setClipping(0.05, 10000) or camera.setClipping(10000)"), o;
      }
      const i = s === void 0 ? { far: t } : { near: t, far: s }, r = e.setCameraClipping?.(i) || e.cameraManager?.setClipping?.(i);
      return r ? (console.log(`Camera clipping: near ${r.near}, far ${r.far}`), r) : (console.warn("Camera not initialized"), null);
    }, window.camera.fitClipping = (t = 2) => {
      const s = e.fitCameraClipping?.(t);
      return s ? (console.log(`Camera far clipping: ${s.far} (minimum ${s.minimumFar.toFixed(3)}, ${s.multiplier}x model size)`), s) : (console.warn("No model bounds available"), null);
    }, window.camera.setMaxDistance = (t) => {
      const s = e.cameraManager?.getControls?.();
      if (!s)
        return console.warn("Camera controls not initialized"), null;
      if (t === void 0) {
        const r = {
          minDistance: s.minDistance,
          maxDistance: s.maxDistance
        };
        return console.table(r), console.log("Usage: camera.setMaxDistance(250)"), r;
      }
      const i = Number(t);
      return !Number.isFinite(i) || i <= s.minDistance ? (console.warn(`Usage: camera.setMaxDistance(n) where n is greater than ${s.minDistance}`), null) : (s.maxDistance = i, s.update(), console.log(`Camera max distance: ${s.maxDistance}`), {
        minDistance: s.minDistance,
        maxDistance: s.maxDistance
      });
    }, window.camera.setStereo = (t, s) => {
      if (t === void 0) {
        const i = {
          enabled: e.stereoEnabled || !1,
          mode: e.stereoMode || "sbs",
          eyeSeparation: e.stereoEyeSeparation || 0.064
        };
        return console.log("👓 Stereo information:"), console.table(i), console.log(""), console.log("Usage:"), console.log("  camera.setStereo(true)           - Enable stereo mode"), console.log("  camera.setStereo(false)          - Disable stereo mode"), console.log("  camera.setStereo(true, 0.065)    - Enable with custom eye separation"), i;
      }
      return e.setStereoEnabled(t), s !== void 0 && e.setStereoEyeSeparation(s), console.log(`👓 Stereo ${t ? "enabled" : "disabled"}`), s !== void 0 && console.log(`👓 Eye separation: ${s}m`), { enabled: t, eyeSeparation: e.stereoEyeSeparation };
    }, window.scene = () => {
      if (!e.sceneManager?.scene)
        return console.warn("Scene not initialized"), null;
      const t = e.sceneManager.scene, s = {
        children: t.children.length,
        lights: t.children.filter((i) => i.isLight).length,
        meshes: t.children.filter((i) => i.isMesh).length,
        groups: t.children.filter((i) => i.isGroup).length,
        background: t.background,
        fog: t.fog ? {
          type: t.fog.constructor.name,
          color: t.fog.color.getHexString(),
          ear: t.fog.near,
          far: t.fog.far
        } : null
      };
      return console.log("🌍 Scene information:"), console.table(s), console.log("Scene object:", t), { info: s, scene: t };
    }, window.scene.setBrightness = (t = 0) => {
      const s = Math.max(-3, Math.min(3, Number(t) || 0)), i = Math.pow(2, s), r = e.sceneManager?.scene;
      return !r && !e.renderer ? (console.warn("Scene not initialized"), null) : (r?.traverse?.((n) => {
        n.isLight && (n.userData.belowBaseIntensity ??= n.intensity ?? 1, n.intensity = n.userData.belowBaseIntensity * i);
      }), e.renderer && (e.renderer.userData ||= {}, e.renderer.userData.belowBaseToneMappingExposure ??= e.renderer.toneMappingExposure || 1, e.renderer.toneMappingExposure = e.renderer.userData.belowBaseToneMappingExposure * i), console.log(`Scene brightness: ${s} (${i.toFixed(3)}x)`), {
        brightness: s,
        multiplier: i,
        toneMappingExposure: e.renderer?.toneMappingExposure
      });
    }, window.vertices = () => {
      if (!e.sceneManager?.scene)
        return console.warn("Scene not initialized"), null;
      const t = e.sceneManager.scene;
      let s = 0, i = 0, r = 0, n = 0;
      t.traverse((l) => {
        const c = l.geometry?.getAttribute?.("position");
        if (!c) return;
        s += 1;
        const A = l.isInstancedMesh ? c.count * l.count : c.count;
        r += A, l.visible && (i += 1, n += A);
      });
      const o = {
        meshes: s,
        visibleMeshes: i,
        vertices: r,
        visibleVertices: n
      };
      return console.log("🔢 Scene vertex counts:"), console.table(o), o;
    }, window.models = () => {
      const t = e.getLoadedModels();
      if (t.length === 0)
        return console.log("📦 No models loaded"), [];
      const s = t.map((i, r) => {
        const n = i.model, o = n.userData.boundingBox;
        return {
          index: r,
          url: i.url,
          ame: n.name || "Unnamed",
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
          boundingBox: o ? {
            min: {
              x: parseFloat(o.min.x.toFixed(3)),
              y: parseFloat(o.min.y.toFixed(3)),
              z: parseFloat(o.min.z.toFixed(3))
            },
            max: {
              x: parseFloat(o.max.x.toFixed(3)),
              y: parseFloat(o.max.y.toFixed(3)),
              z: parseFloat(o.max.z.toFixed(3))
            }
          } : null,
          visible: n.visible,
          children: n.children.length
        };
      });
      return console.log("📦 Loaded models:"), console.table(s), { models: s, rawData: t };
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
    }, window.particles = () => {
      let t = null;
      if (e.diveSystem?.particles ? t = e.diveSystem.particles : typeof window < "u" && window.diveSystem?.particles ? t = window.diveSystem.particles : e.belowViewer?.diveSystem?.particles && (t = e.belowViewer.diveSystem.particles), !t)
        return console.log("🌊 Particles not initialized"), null;
      const s = {
        count: t.particleCount,
        visible: t.particles ? t.particles.visible : !1,
        bounds: {
          min: {
            x: parseFloat(t.particleBounds.min.x.toFixed(3)),
            y: parseFloat(t.particleBounds.min.y.toFixed(3)),
            z: parseFloat(t.particleBounds.min.z.toFixed(3))
          },
          max: {
            x: parseFloat(t.particleBounds.max.x.toFixed(3)),
            y: parseFloat(t.particleBounds.max.y.toFixed(3)),
            z: parseFloat(t.particleBounds.max.z.toFixed(3))
          }
        }
      };
      return console.log("🌊 Particle information:"), console.table(s), s;
    }, window.stereo = (t, s) => (console.warn("stereo() is deprecated. Use camera.setStereo(...) instead."), window.camera.setStereo(t, s)), window.perfStats = (t = !0) => {
      if (!e.setPerfStats)
        return console.warn("Performance monitor unavailable"), null;
      const s = e.setPerfStats(t);
      return console.log(`📈 Performance stats ${t ? "enabled — watch for [BelowPerf] lines" : "disabled"}`), s;
    }, window.debugHelp = () => {
      console.log("🔧 BelowJS Debug Commands:"), console.log("  camera()                  - Get current camera position data"), console.log("  camera.setOrthographic()  - Switch desktop camera to orthographic projection"), console.log("  camera.setPerspective()   - Switch desktop camera to perspective projection"), console.log("  camera.setFar(n)          - Set camera far clipping distance"), console.log("  camera.setClipping(n, f)  - Set near/far, or one value for far only"), console.log("  camera.fitClipping(2)     - Set far clipping to at least 2x loaded model size"), console.log("  camera.setMaxDistance(n)  - Set desktop orbit zoom-out distance"), console.log("  camera.setStereo()        - Get/set stereo mode and eye separation"), console.log("  scene()                   - Get scene information and object counts"), console.log("  scene.setBrightness(n)    - Set scene brightness from -3 dark to +3 bright"), console.log("  vertices()                - Get scene vertex counts"), console.log("  models()                  - Get loaded models information"), console.log("  particles()               - Get particle system information"), console.log("  vr()                      - Get VR state and settings"), console.log("  perfStats(true|false)     - Toggle [BelowPerf] frame/tileset stats"), console.log("  stereo()                  - Deprecated; use camera.setStereo()"), console.log("  debugHelp()               - Show this help message"), console.log(""), console.log("Global objects:"), console.log("  belowViewer - Direct access to BelowViewer instance");
    });
  }
  /**
   * Clean up debug commands when viewer is disposed
   */
  static cleanup() {
    typeof window > "u" || (delete window.camera, delete window.scene, delete window.vertices, delete window.models, delete window.particles, delete window.vr, delete window.stereo, delete window.perfStats, delete window.debugHelp, delete window.belowViewer);
  }
}
class fh {
  constructor(e, t = {}) {
    this.renderer = e, this.tilesetLoader = t.tilesetLoader || null, this.logIntervalMs = typeof t.logIntervalMs == "number" ? t.logIntervalMs : 2e3, this.maxSamples = 240, this.frameTimes = new Float32Array(this.maxSamples), this.sampleCount = 0, this.sampleIndex = 0, this.lastLogTimeMs = 0, this.lastSummary = null, this.overlayElement = null, this.enabled = !0, t.overlay && typeof document < "u" && this.createOverlay(t.overlayContainer || document.body);
  }
  setTilesetLoader(e) {
    this.tilesetLoader = e;
  }
  createOverlay(e) {
    if (this.overlayElement || typeof document > "u") return;
    const t = document.createElement("pre");
    t.id = "belowPerfOverlay", t.style.cssText = [
      "position:fixed",
      "top:8px",
      "left:8px",
      "z-index:10000",
      "margin:0",
      "padding:6px 8px",
      "border-radius:6px",
      "background:rgba(0,10,20,0.72)",
      "color:#9fe8ff",
      "font:11px/1.45 ui-monospace,Menlo,monospace",
      "pointer-events:none",
      "white-space:pre"
    ].join(";"), e.appendChild(t), this.overlayElement = t;
  }
  /**
   * Record one frame. Call once per animation-loop tick.
   * @param {number} deltaTimeMs - Frame delta in milliseconds
   */
  sample(e) {
    if (!this.enabled || !Number.isFinite(e) || e <= 0 || e > 4e3) return;
    this.frameTimes[this.sampleIndex] = e, this.sampleIndex = (this.sampleIndex + 1) % this.maxSamples, this.sampleCount < this.maxSamples && (this.sampleCount += 1);
    const t = performance.now();
    t - this.lastLogTimeMs >= this.logIntervalMs && (this.lastLogTimeMs = t, this.publish());
  }
  frameStats() {
    const e = this.sampleCount;
    if (e === 0)
      return { frameMsAvg: 0, frameMsP95: 0, fps: 0 };
    const t = Array.from(this.frameTimes.subarray(0, e)).sort((n, o) => n - o);
    let s = 0;
    for (let n = 0; n < e; n += 1) s += t[n];
    const i = s / e, r = t[Math.min(e - 1, Math.floor(e * 0.95))];
    return {
      frameMsAvg: Number(i.toFixed(2)),
      frameMsP95: Number(r.toFixed(2)),
      fps: Number((1e3 / i).toFixed(1))
    };
  }
  tilesetStats() {
    const e = this.tilesetLoader;
    if (!e || e.activeTilesets.size === 0) return null;
    const t = [];
    return e.activeTilesets.forEach((s) => {
      const i = s.stats || {}, r = e.tilesetStates?.get?.(s), n = r?.shadowCastersLimited ? r.shadowCasterTiles?.size : r?.loadedTileScenes?.size;
      t.push({
        visible: i.visible ?? null,
        active: i.active ?? null,
        downloading: i.downloading ?? null,
        parsing: i.parsing ?? null,
        queued: i.queued ?? null,
        inCache: i.inCache ?? null,
        errorTarget: Number((s.errorTarget ?? 0).toFixed(2)),
        maxTilesProcessed: s.maxTilesProcessed ?? null,
        cameras: Array.isArray(s.cameras) ? s.cameras.length : 0,
        vrProfile: r?.resolvedVRPerformanceProfile ?? null,
        shadowCasters: n ?? null,
        vrMaxTriangles: r?.vrMaxTriangles ?? null
      });
    }), {
      tilesets: t,
      update: {
        lastMs: Number((e.lastUpdateDurationMs ?? 0).toFixed(2)),
        maxMs: Number((e.maxUpdateDurationMs ?? 0).toFixed(2)),
        ran: e.updateRunCount ?? 0,
        gated: e.updateGatedCount ?? 0
      }
    };
  }
  summary() {
    const e = this.renderer?.info?.render || {}, t = this.renderer?.xr, s = {
      t: Math.round(performance.now()),
      ...this.frameStats(),
      calls: e.calls ?? 0,
      triangles: e.triangles ?? 0,
      xrPresenting: t?.isPresenting === !0,
      foveation: t?.getFoveation ? t.getFoveation() : null,
      shadows: {
        enabled: this.renderer?.shadowMap?.enabled === !0,
        type: this.renderer?.shadowMap?.type ?? null
      }
    }, i = this.tilesetStats();
    return i && (s.tiles = i), this.lastSummary = s, s;
  }
  publish() {
    const e = this.summary();
    if (typeof window < "u" && (window.__belowPerf = e), console.log("[BelowPerf]", JSON.stringify(e)), this.overlayElement) {
      const t = e.tiles;
      this.overlayElement.textContent = [
        `fps ${e.fps}  ms ${e.frameMsAvg} (p95 ${e.frameMsP95})`,
        `calls ${e.calls}  tris ${(e.triangles / 1e6).toFixed(2)}M`,
        t ? `tiles vis ${t.tilesets[0]?.visible ?? "-"}  err ${t.tilesets[0]?.errorTarget ?? "-"}  cast ${t.tilesets[0]?.shadowCasters ?? "-"}  upd ${t.update.lastMs}ms` : "tiles -",
        `xr ${e.xrPresenting ? "on" : "off"}  shadows ${e.shadows.enabled ? e.shadows.type : "off"}`
      ].join(`
`);
    }
  }
  dispose() {
    this.enabled = !1, this.overlayElement?.parentNode && this.overlayElement.parentNode.removeChild(this.overlayElement), this.overlayElement = null, typeof window < "u" && window.__belowPerf === this.lastSummary && delete window.__belowPerf;
  }
}
class mh extends It {
  /**
   * Creates a new BelowViewer instance
   * 
   * @param {HTMLElement} container - DOM element to render into
   * @param {BelowViewerConfig} [config={}] - Configuration options
   */
  constructor(e, t = {}) {
    super(), this.container = e;
    const s = {
      scene: {
        type: "object",
        default: {
          background: { type: "color", value: "#001122" },
          fog: { enabled: !1, color: "#001122", near: 10, far: 100 }
        },
        schema: {
          background: { type: ["object", "string"], default: { type: "color", value: "#001122" } },
          fog: { type: "object", default: {} }
        }
      },
      camera: {
        type: "object",
        default: {
          fov: 65,
          near: 0.05,
          far: 2e3,
          position: { x: 0, y: 5, z: 10 },
          desktop: {
            enableDamping: !0,
            dampingFactor: 0.08,
            maxDistance: 150,
            minDistance: 0.5
          }
        },
        schema: {
          fov: { type: "number", default: 65 },
          near: { type: "number", default: 0.05 },
          far: { type: "number", default: 2e3 },
          position: { type: "object", default: {} },
          desktop: { type: "object", default: {} }
        }
      },
      renderer: {
        type: "object",
        default: {
          antialias: !0,
          alpha: !1,
          powerPreference: "high-performance",
          logarithmicDepthBuffer: !1,
          preserveDrawingBuffer: !0,
          xrCompatible: !1
        },
        schema: {
          antialias: { type: "boolean", default: !0 },
          alpha: { type: "boolean", default: !1 },
          powerPreference: { type: "string", default: "high-performance" },
          logarithmicDepthBuffer: { type: "boolean", default: !1 },
          preserveDrawingBuffer: { type: "boolean", default: !0 },
          xrCompatible: { type: "boolean", default: !1 }
        }
      },
      stereo: {
        type: "object",
        default: {
          enabled: !1,
          mode: "sbs",
          eyeSeparation: 0.064
        },
        schema: {
          enabled: { type: "boolean", default: !1 },
          mode: { type: "string", default: "sbs" },
          eyeSeparation: { type: "number", default: 0.064 }
        }
      },
      vr: {
        type: "object",
        default: { enabled: !0 },
        schema: {
          enabled: { type: "boolean", default: !0 },
          performanceProfile: { type: "string", default: "auto" },
          foveation: { type: "number", default: 1 },
          framebufferScaleFactor: { type: "number", default: 1 },
          shadowProfile: { type: "string", default: "reduced" }
        }
      },
      ar: {
        type: "object",
        default: {
          enabled: !1,
          settings: {
            enableHandTracking: !0,
            enableWorldCube: !0,
            defaultScale: 0.05,
            worldCubeSize: 20,
            worldCubeOpacity: 0.1
          }
        },
        schema: {
          enabled: { type: "boolean", default: !1 },
          settings: { type: "object", default: {} }
        }
      },
      audioPath: { type: "string", default: "./sound/" },
      enableVRAudio: { type: "boolean", default: !1 },
      perfStats: { type: "boolean", default: !1 },
      assetBasePath: { type: "string", default: null },
      dracoDecoderPath: { type: "string", default: null },
      ktx2TranscoderPath: { type: "string", default: null },
      webxrInputProfilesPath: { type: "string", default: null }
    };
    this.config = new ls(s).validate(t), this.config.vr = Uc(
      this.config.vr,
      t?.vr?.performanceProfile || "auto",
      t?.vr || {}
    ), this.renderer = null, this.sceneManager = null, this.cameraManager = null, this.modelLoader = null, this.tilesetLoader = null, this.vrManager = null, this.arManager = null, this.stereoCamera = null, this.perfMonitor = null, this.isVREnabled = this.config.vr?.enabled !== !1, this.isAREnabled = this.config.ar?.enabled === !0, this.stereoEnabled = this.config.stereo?.enabled === !0, this.stereoMode = this.config.stereo?.mode || "sbs";
    const i = this.config.stereo?.eyeSeparation ?? 0.064;
    this.stereoEyeSeparation = Math.max(0.05, Math.min(0.07, i)), this.stereoEyeSeparation !== i && console.warn(`[BelowJS] Initial eye separation ${i}m clamped to ${this.stereoEyeSeparation}m (comfortable range for screens: 0.050-0.070m)`), this.dolly = null, this.isInitialized = !1, this.loadedModels = [], this.currentAbortController = null, this.skipRenderDuringLoad = !1, this.pixelRatioBeforeThrottle = 1, this.originalPixelRatio = 1, this.isConstrainedSafari = !1, this.init();
  }
  init() {
    try {
      this.initRenderer(), this.sceneManager = new qo(this.config.scene), this.cameraManager = new na(this.config.camera), this.modelLoader = new ee(this.renderer, this.config), this.tilesetLoader = new Hc(this.renderer, this.cameraManager.camera), this.isConstrainedSafari = this.modelLoader?.isIOSWebKit || !1, this.initStereo(), this.renderer?.getPixelRatio ? this.originalPixelRatio = this.renderer.getPixelRatio() : typeof window < "u" && (this.originalPixelRatio = window.devicePixelRatio || 1), this.pixelRatioBeforeThrottle = this.originalPixelRatio, this.isVREnabled && this.initVR(), this.isAREnabled && this.initAR(), this.cameraManager.initControls(this.renderer.domElement), this.setupEventListeners(), this.startRenderLoop(), this.isInitialized = !0, typeof window < "u" && Dr.init(this), this.config.perfStats && this.setPerfStats(!0), this.emit("initialized");
    } catch (e) {
      console.error("Failed to initialize BelowViewer:", e), this.emit("error", e);
    }
  }
  initRenderer() {
    const e = {
      antialias: this.config.renderer.antialias,
      alpha: this.config.renderer.alpha,
      powerPreference: this.config.renderer.powerPreference,
      logarithmicDepthBuffer: this.config.renderer.logarithmicDepthBuffer,
      preserveDrawingBuffer: this.config.renderer.preserveDrawingBuffer
    };
    if (this.config.renderer.xrCompatible && typeof document < "u") {
      const s = document.createElement("canvas"), i = s.getContext("webgl2", {
        alpha: this.config.renderer.alpha,
        depth: !0,
        stencil: !1,
        antialias: this.config.renderer.antialias,
        premultipliedAlpha: !0,
        preserveDrawingBuffer: this.config.renderer.preserveDrawingBuffer,
        powerPreference: this.config.renderer.powerPreference,
        failIfMajorPerformanceCaveat: !1,
        xrCompatible: !0
      });
      i ? (e.canvas = s, e.context = i) : console.warn("XR-compatible WebGL2 context unavailable; falling back to default renderer context");
    }
    this.renderer = new f.WebGLRenderer(e), this.renderer.setSize(this.container.clientWidth, this.container.clientHeight), this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = f.PCFSoftShadowMap, this.renderer.outputColorSpace = f.SRGBColorSpace;
    const t = {
      none: f.NoToneMapping,
      linear: f.LinearToneMapping,
      reinhard: f.ReinhardToneMapping,
      cineon: f.CineonToneMapping,
      "aces-filmic": f.ACESFilmicToneMapping
    };
    this.config.renderer.toneMapping && t[this.config.renderer.toneMapping] && (this.renderer.toneMapping = t[this.config.renderer.toneMapping]), this.renderer.toneMappingExposure = this.config.renderer.toneMappingExposure, this.container.appendChild(this.renderer.domElement);
  }
  initStereo() {
    this.stereoCamera || (this.stereoCamera = new f.StereoCamera()), this.stereoCamera.eyeSep = this.stereoEyeSeparation;
  }
  initVR() {
    this.dolly = new f.Group(), this.dolly.add(this.cameraManager.camera), this.sceneManager.scene.add(this.dolly);
    const e = this.config.audioPath || "./sound/", t = this.config.enableVRAudio === !0;
    this.vrManager = new ah(this.renderer, this.cameraManager.camera, this.sceneManager.scene, e, t, this.container, this.config), this.applyXRFramebufferScaleFactor(), this.vrManager.setControls(this.cameraManager.controls), this.config.initialPositions && this.vrManager.setInitialPositions(this.config.initialPositions), this.vrManager.onModeToggle = () => {
      this.emit("vr-mode-toggle");
    }, this.vrManager.onMovementStart = () => {
      this.emit("vr-movement-start");
    }, this.vrManager.onMovementStop = () => {
      this.emit("vr-movement-stop");
    }, this.vrManager.onMovementUpdate = (s, i) => {
      this.emit("vr-movement-update", { speed: s, boostLevel: i });
    }, this.vrManager.onSessionStart = () => {
      if (this.loadedModels.length > 0) {
        const s = this.loadedModels[this.loadedModels.length - 1];
        s.options && s.options.initialPositions && this.vrManager.applyVRPositions(s.options.initialPositions);
      }
      this.cameraManager.controls && (this.cameraManager.controls.enabled = !1), this.applyVRRenderProfile(), this.emit("vr-session-start");
    }, this.vrManager.onSessionEnd = () => {
      this.cameraManager.controls && (this.cameraManager.controls.enabled = !0), this.dolly.position.set(0, 0, 0), this.dolly.rotation.set(0, 0, 0), this.restoreDesktopRenderProfile(), this.emit("vr-session-end");
    };
  }
  /**
   * Apply the configured VR render profile at XR session start.
   *
   * `vr.shadowProfile`: 'full' leaves shadows untouched; 'reduced' swaps
   * PCFSoft for plain PCF filtering (much cheaper per covered pixel on
   * mobile GPUs); 'off' disables shadow maps entirely while presenting.
   * The desktop state is restored on session end.
   */
  applyVRRenderProfile() {
    if (!this.renderer) return;
    this.applyXRFramebufferScaleFactor();
    const e = this.config.vr?.foveation;
    typeof e == "number" && this.renderer.xr?.setFoveation && this.renderer.xr.setFoveation(Math.min(1, Math.max(0, e)));
    const t = this.config.vr?.shadowProfile || "reduced";
    t !== "full" && (this._shadowStateBeforeVR = {
      enabled: this.renderer.shadowMap.enabled,
      type: this.renderer.shadowMap.type
    }, t === "off" ? this.renderer.shadowMap.enabled = !1 : this.renderer.shadowMap.type = f.PCFShadowMap, this._flagShadowMaterialsForRecompile());
  }
  applyXRFramebufferScaleFactor() {
    const e = this.config.vr?.framebufferScaleFactor;
    typeof e != "number" || !this.renderer?.xr?.setFramebufferScaleFactor || this.renderer.xr.isPresenting || this.renderer.xr.setFramebufferScaleFactor(Math.min(1.5, Math.max(0.5, e)));
  }
  restoreDesktopRenderProfile() {
    !this._shadowStateBeforeVR || !this.renderer || (this.renderer.shadowMap.enabled = this._shadowStateBeforeVR.enabled, this.renderer.shadowMap.type = this._shadowStateBeforeVR.type, this._shadowStateBeforeVR = null, this._flagShadowMaterialsForRecompile());
  }
  _flagShadowMaterialsForRecompile() {
    this.sceneManager?.scene?.traverse((e) => {
      !e.isMesh || !e.material || (Array.isArray(e.material) ? e.material.forEach((t) => {
        t.needsUpdate = !0;
      }) : e.material.needsUpdate = !0);
    });
  }
  /**
   * Enable or disable the runtime performance monitor.
   *
   * @param {boolean} enabled - Turn the monitor on or off
   * @param {Object} [options] - Monitor options
   * @param {boolean} [options.overlay=true] - Show the DOM overlay readout
   * @returns {PerfMonitor|null} The active monitor, if any
   */
  setPerfStats(e, t = {}) {
    return e && !this.perfMonitor ? this.perfMonitor = new fh(this.renderer, {
      tilesetLoader: this.tilesetLoader,
      overlay: t.overlay !== !1,
      overlayContainer: typeof document < "u" ? document.body : null
    }) : !e && this.perfMonitor && (this.perfMonitor.dispose(), this.perfMonitor = null), this.perfMonitor;
  }
  initAR() {
    const e = this.config.ar?.settings || {};
    this.arManager = new gh(
      this.renderer,
      this.cameraManager.camera,
      this.sceneManager.scene,
      e,
      this.container,
      this.config
    ), this.arManager.on("session-start", () => {
      this.cameraManager.controls && (this.cameraManager.controls.enabled = !1), this.emit("ar-session-start");
    }), this.arManager.on("session-end", () => {
      this.cameraManager.controls && (this.cameraManager.controls.enabled = !0), this.emit("ar-session-end");
    }), this.arManager.on("gesture-start", (t) => {
      this.emit("ar-gesture-start", t);
    }), this.arManager.on("gesture-end", (t) => {
      this.emit("ar-gesture-end", t);
    }), this.on("model-loaded", ({ model: t, options: s }) => {
      this.arManager && this.arManager.setTargetModel(t, s);
    });
  }
  setupEventListeners() {
    window.addEventListener("resize", this.onWindowResize.bind(this)), this.cameraManager && this.cameraManager.on("change", () => {
      this.emit("camera-change");
    });
  }
  onWindowResize() {
    if (!this.isInitialized) return;
    const e = this.container.clientWidth, t = this.container.clientHeight;
    this.cameraManager.setSize(e, t), this.renderer.setSize(e, t), this.tilesetLoader && this.tilesetLoader.updateResolution(), this.emit("resize", { width: e, height: t });
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
   * @param {string} [options.type='gltf'] - Model type ('gltf' or 'tileset')
   * @param {number} [options.errorTarget] - Tileset SSE target for streaming refinement
   * @param {number} [options.maxDepth] - Tileset traversal depth limit
   * @param {boolean} [options.loadSiblings] - Load sibling tiles for smoother refinement
   * @param {boolean} [options.loadAncestors] - Keep coarse ancestors visible while detailed children load
   * @param {boolean} [options.optimizedLoadStrategy] - Deprecated alias; true sets loadAncestors=false
   * @param {number} [options.maxTilesProcessed] - Tiles processed per frame for streaming tilesets
   * @param {number} [options.ktxWorkerLimit] - KTX2 transcoder workers; defaults by VR performance profile
   * @param {Object} [options.fetchOptions] - Fetch options for tileset network requests
   * @param {string} [options.up='+Y'] - Up-axis hint for tilesets ('+Y', '+Z', '-Z', '+X', '-X', '-Y')
   * @param {boolean|string} [options.geospatialReorientation='auto'] - Auto-level geospatial tilesets ('auto' | 'force' | false)
   * @param {boolean} [options.autoCenter=true] - Recenter streamed tilesets around origin as bounds become available
   * @param {number} [options.maxTriangles] - Approximate triangle budget for adaptive LOD (best-effort)
   * @param {number} [options.vrMaxTriangles] - VR-only triangle budget for adaptive LOD
   * @param {number} [options.minErrorTarget=2] - Lower clamp for adaptive errorTarget when maxTriangles is set
   * @param {number} [options.maxErrorTarget=64] - Upper clamp for adaptive errorTarget when maxTriangles is set
   * @param {boolean} [options.enableGltfExtensions=true] - Enable GLTFExtensionsPlugin (DRACO/KTX2/RTC) for tilesets
   * @param {string} [options.dracoDecoderPath] - Optional DRACO decoder path for GLTFExtensionsPlugin
   * @param {string} [options.ktx2TranscoderPath] - Optional KTX2 transcoder path for GLTFExtensionsPlugin
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
   *       // Update loading UI with progress percentage
   *       const percent = Math.round(progress.loaded / progress.total * 100);
   *     }
   *   });
   *   // Model loaded successfully
   * } catch (error) {      
   *   console.error('Failed to load model:', error);
   * }
   * 
   * @since 1.0.0
   */
  async loadModel(e, t = {}) {
    this.currentAbortController && this.currentAbortController.abort(), this.currentAbortController = new AbortController();
    const s = this.currentAbortController.signal, i = this.isConstrainedSafari;
    try {
      this.emit("model-load-start", { url: e }), i && this.applyLoadRenderingConstraints(!0);
      const r = (A) => {
        s.aborted || this.emit("model-load-progress", { url: e, progress: A });
      }, n = (A) => {
        s.aborted || this.emit("model-load-stage", { url: e, stage: A });
      };
      let o, l = null;
      if (t.type === "tileset") {
        n && n("downloading");
        const A = await this.tilesetLoader.load(e, {
          signal: s,
          errorTarget: t.errorTarget,
          maxDepth: t.maxDepth,
          loadSiblings: t.loadSiblings,
          loadAncestors: t.loadAncestors,
          optimizedLoadStrategy: t.optimizedLoadStrategy,
          maxTilesProcessed: t.maxTilesProcessed,
          ktxWorkerLimit: t.ktxWorkerLimit,
          fetchOptions: t.fetchOptions,
          up: t.up,
          autoCenter: t.autoCenter,
          maxTriangles: t.maxTriangles,
          vrMaxTriangles: t.vrMaxTriangles,
          vrPerformanceProfile: t.vrPerformanceProfile || this.config.vr?.performanceProfile,
          resolvedVRPerformanceProfile: this.config.vr?.resolvedPerformanceProfile,
          minErrorTarget: t.minErrorTarget,
          maxErrorTarget: t.maxErrorTarget,
          tileCastShadow: t.tileCastShadow,
          tileReceiveShadow: t.tileReceiveShadow,
          tileLighting: t.tileLighting,
          vrShadowCasterMode: t.vrShadowCasterMode,
          vrMaxShadowCastingTiles: t.vrMaxShadowCastingTiles,
          vrShadowCasterRadius: t.vrShadowCasterRadius,
          shadowCasterUpdateIntervalMs: t.shadowCasterUpdateIntervalMs,
          idleGating: t.idleGating,
          idlePositionEpsilon: t.idlePositionEpsilon,
          idleAngleEpsilon: t.idleAngleEpsilon,
          idleHeartbeatMs: t.idleHeartbeatMs,
          vrErrorTargetFloor: t.vrErrorTargetFloor,
          vrMaxDepth: t.vrMaxDepth,
          usePerEyeCameras: t.usePerEyeCameras,
          boundsUpdateIntervalMs: t.boundsUpdateIntervalMs,
          enableGltfExtensions: t.enableGltfExtensions,
          assetBasePath: t.assetBasePath || this.config.assetBasePath,
          dracoDecoderPath: t.dracoDecoderPath || this.config.dracoDecoderPath,
          ktx2TranscoderPath: t.ktx2TranscoderPath || this.config.ktx2TranscoderPath
        });
        o = A.group, l = A.tileset, n && n("processing");
      } else
        o = await this.modelLoader.load(e, r, s, n);
      if (s.aborted)
        return null;
      t.position && o.position.fromArray(t.position), t.rotation && o.rotation.fromArray(t.rotation), t.scale && (typeof t.scale == "number" ? o.scale.setScalar(t.scale) : o.scale.fromArray(t.scale));
      const c = this.centerModelAndRecalculateBounds(o);
      return this.sceneManager.add(o), this.loadedModels.push({ model: o, url: e, options: t, originalCenter: c, tileset: l }), t.autoClip !== !1 && this.fitCameraClippingToModel(o, t.cameraFarMultiplier ?? 2), this.loadedModels.length === 1 && t.autoFrame !== !1 && this.frameModel(o), this.cameraManager?.resetControlInteractionState?.(), this.currentAbortController && this.currentAbortController.signal === s && (this.currentAbortController = null), n && n("completed"), this.emit("model-loaded", { model: o, url: e }), o;
    } catch (r) {
      if (this.currentAbortController && this.currentAbortController.signal === s && (this.currentAbortController = null), !s.aborted && r.message !== "Loading cancelled")
        throw console.error("Failed to load model:", r), this.emit("model-load-error", { url: e, error: r }), r;
      if (s.aborted || r.message === "Loading cancelled")
        return this.emit("model-load-cancelled", { url: e }), null;
      throw r;
    } finally {
      i && this.applyLoadRenderingConstraints(!1);
    }
  }
  frameModel(e) {
    const t = this.getValidModelBoundingBox(e);
    if (!t)
      return;
    const s = t.getSize(new f.Vector3()), i = t.getCenter(new f.Vector3());
    this.cameraManager.frameObject(i, s);
  }
  fitCameraClippingToModel(e, t = 2) {
    const s = this.getValidModelBoundingBox(e);
    if (!s || !this.cameraManager)
      return null;
    const i = s.getSize(new f.Vector3()), r = Math.max(i.length(), i.x, i.y, i.z, 1e-3), n = Math.max(Number(t) || 2, 1), o = r * n, l = this.cameraManager.ensureMinimumFar(o);
    return this.emit("camera-clipping-change", {
      model: e,
      modelSize: r,
      multiplier: n,
      ...l
    }), {
      modelSize: r,
      multiplier: n,
      ...l
    };
  }
  fitCameraClipping(e = 2) {
    if (!this.loadedModels.length)
      return null;
    const t = new f.Box3();
    let s = !1;
    if (this.loadedModels.forEach(({ model: r }) => {
      const n = this.getValidModelBoundingBox(r);
      n && (t.union(n), s = !0);
    }), !s)
      return null;
    const i = new f.Group();
    return i.userData.boundingBox = t, this.fitCameraClippingToModel(i, e);
  }
  setCameraClipping({ near: e, far: t } = {}) {
    if (!this.cameraManager)
      return null;
    const s = this.cameraManager.setClipping({ near: e, far: t });
    return this.emit("camera-clipping-change", s), s;
  }
  setCameraFar(e) {
    return this.setCameraClipping({ far: e });
  }
  isValidBox3(e) {
    return !e || !(e instanceof f.Box3) || e.isEmpty() ? !1 : Number.isFinite(e.min.x) && Number.isFinite(e.min.y) && Number.isFinite(e.min.z) && Number.isFinite(e.max.x) && Number.isFinite(e.max.y) && Number.isFinite(e.max.z);
  }
  getValidModelBoundingBox(e) {
    if (this.isValidBox3(e?.userData?.boundingBox))
      return e.userData.boundingBox;
    const t = new f.Box3().setFromObject(e);
    return this.isValidBox3(t) ? (e.userData.boundingBox = t, t) : null;
  }
  /**
   * Centers the model at the origin and recalculates its bounding box.
   * Note: This method modifies the model's position as a side effect.
   * 
   * @param {THREE.Object3D} model - The model to center.
   * @returns {THREE.Vector3} The original center offset for reference.
   */
  centerModelAndRecalculateBounds(e) {
    const t = this.getValidModelBoundingBox(e);
    if (!t)
      return new f.Vector3();
    const s = t.getCenter(new f.Vector3());
    e.position.sub(s);
    const i = new f.Box3().setFromObject(e);
    return this.isValidBox3(i) ? e.userData.boundingBox = i : e.userData.boundingBox = t.clone().translate(s.clone().multiplyScalar(-1)), s;
  }
  startRenderLoop() {
    let e = 0, t = 0;
    const s = (i) => {
      const r = Math.min((i - e) / 1e3, 0.1);
      this.perfMonitor && e > 0 && this.perfMonitor.sample(i - e), e = i, this.vrManager && this.vrManager.update(r), this.arManager && this.arManager.update(r * 1e3), this.cameraManager && this.cameraManager.update(), this.emit("before-render", r);
      const n = this.renderer?.xr?.isPresenting;
      if (this.renderer && this.sceneManager && this.cameraManager) {
        const o = () => {
          (!this.skipRenderDuringLoad || n) && (this.stereoEnabled && !n && this.stereoMode === "sbs" ? this.renderSbsStereo() : this.renderer.render(this.sceneManager.scene, this.cameraManager.camera));
        };
        if (n) {
          if (this.tilesetLoader?.setXRSession(this.renderer.xr.getSession()), o(), this.tilesetLoader) {
            const c = this.vrManager?.getVRStatus?.().movement?.isMoving === !0, A = typeof performance < "u" && typeof performance.now == "function" ? performance.now() : i, h = c ? 28 : 33;
            if (A - t >= h) {
              const u = this.renderer.xr.getCamera(this.cameraManager.camera);
              this.tilesetLoader.update(u, {
                isXR: !0,
                queueOptions: {
                  maxTasks: c ? 1 : 2,
                  timeBudgetMs: c ? 0.7 : 1.5
                }
              }), t = A;
            }
          }
        } else {
          if (this.tilesetLoader?.setXRSession(null), this.tilesetLoader) {
            const l = this.cameraManager.camera;
            this.tilesetLoader.update(l, {
              queueOptions: {
                maxTasks: 4,
                timeBudgetMs: 2
              }
            });
          }
          o();
        }
      }
    };
    this.renderer.setAnimationLoop(s);
  }
  renderSbsStereo() {
    if (!this.stereoCamera || !this.renderer || !this.sceneManager || !this.cameraManager)
      return;
    const e = this.renderer.getSize(new f.Vector2()), t = e.width, s = e.height, i = Math.floor(t / 2), r = t - i;
    this.stereoCamera.aspect = s > 0 ? i / s : 1, this.stereoCamera.update(this.cameraManager.camera), this.renderer.setScissorTest(!0), this.renderer.setViewport(0, 0, i, s), this.renderer.setScissor(0, 0, i, s), this.renderer.render(this.sceneManager.scene, this.stereoCamera.cameraL), this.renderer.setViewport(i, 0, r, s), this.renderer.setScissor(i, 0, r, s), this.renderer.render(this.sceneManager.scene, this.stereoCamera.cameraR), this.renderer.setScissorTest(!1), this.renderer.setViewport(0, 0, t, s);
  }
  /**
   * Enable or disable stereo rendering.
   *
   * Note: Stereo rendering (SBS) is automatically disabled when entering VR/XR mode,
   * as VR headsets provide native stereoscopic rendering. When exiting VR, stereo
   * rendering will resume if it was enabled before entering VR.
   *
   * @param {boolean} enabled - Whether stereo rendering is enabled.
   */
  setStereoEnabled(e) {
    this.stereoEnabled = e === !0, this.stereoEnabled && this.initStereo();
  }
  /**
   * Set the eye separation distance for stereo rendering.
   *
   * @param {number} eyeSeparation - Eye separation in meters (clamped to 0.050-0.070m for screen comfort).
   */
  setStereoEyeSeparation(e) {
    if (typeof e != "number" || Number.isNaN(e))
      return;
    const t = Math.max(0.05, Math.min(0.07, e));
    t !== e && console.warn(`[BelowJS] Eye separation ${e}m clamped to ${t}m (comfortable range for screens: 0.050-0.070m)`), this.stereoEyeSeparation = t, this.stereoCamera && (this.stereoCamera.eyeSep = t);
  }
  /**
   * Set the stereo mode (currently only 'sbs').
   *
   * @param {string} mode - Stereo mode string.
   */
  setStereoMode(e) {
    e === "sbs" && (this.stereoMode = e);
  }
  /**
   * Get the current stereo configuration.
   *
   * @returns {{enabled: boolean, mode: string, eyeSeparation: number}}
   */
  getStereoSettings() {
    return {
      enabled: this.stereoEnabled,
      mode: this.stereoMode,
      eyeSeparation: this.stereoEyeSeparation
    };
  }
  applyLoadRenderingConstraints(e) {
    if (!(!this.isConstrainedSafari || !this.renderer))
      if (e) {
        if (this.pixelRatioBeforeThrottle = this.renderer.getPixelRatio ? this.renderer.getPixelRatio() : this.originalPixelRatio, typeof this.renderer.setPixelRatio == "function") {
          const t = Math.min(this.pixelRatioBeforeThrottle || this.originalPixelRatio, 1.25);
          this.renderer.setPixelRatio(t);
        }
        this.skipRenderDuringLoad = !0;
      } else
        typeof this.renderer.setPixelRatio == "function" && this.renderer.setPixelRatio(this.pixelRatioBeforeThrottle || this.originalPixelRatio), this.skipRenderDuringLoad = !1;
  }
  getScene() {
    return this.sceneManager?.scene;
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
    return this.cameraManager?.camera;
  }
  setOrthographicCamera() {
    if (!this.cameraManager)
      return null;
    const e = this.cameraManager.setOrthographic(
      this.container?.clientWidth || window.innerWidth,
      this.container?.clientHeight || window.innerHeight
    );
    return this.syncCameraReferences(e), this.emit("camera-projection-change", { projection: "orthographic", camera: e }), e;
  }
  setPerspectiveCamera() {
    if (!this.cameraManager)
      return null;
    const e = this.cameraManager.setPerspective(
      this.container?.clientWidth || window.innerWidth,
      this.container?.clientHeight || window.innerHeight
    );
    return this.syncCameraReferences(e), this.emit("camera-projection-change", { projection: "perspective", camera: e }), e;
  }
  syncCameraReferences(e = this.cameraManager?.camera) {
    e && (this.tilesetLoader?.setCamera?.(e), this.vrManager?.setCamera?.(e), this.arManager?.setCamera?.(e), this.diveSystem?.setCamera?.(e), this.measurementSystem && (typeof this.measurementSystem.setCamera == "function" ? this.measurementSystem.setCamera(e) : this.measurementSystem.camera = e));
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
   * // Process models array (length: models.length)
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
    const t = this.loadedModels.findIndex((s) => s.model === e);
    if (t >= 0) {
      const { url: s, tileset: i } = this.loadedModels[t];
      this.sceneManager.remove(e), i && this.tilesetLoader && this.tilesetLoader.disposeTileset(i), Qs(e), this.loadedModels.splice(t, 1), this.emit("model-removed", { model: e }), !this.loadedModels.some((n) => n.url === s) && this.modelLoader && this.modelLoader.releaseFromCache(s);
    }
  }
  clearModels() {
    this.arManager && this.arManager.setTargetModel(null);
    const e = new Set(this.loadedModels.map(({ url: t }) => t));
    this.loadedModels.forEach(({ model: t, tileset: s }) => {
      s && this.tilesetLoader && this.tilesetLoader.disposeTileset(s), Qs(t), this.sceneManager.remove(t);
    }), this.loadedModels.length = 0, e.forEach((t) => {
      this.modelLoader && this.modelLoader.releaseFromCache(t);
    }), this.cameraManager?.resetControlInteractionState?.(), this.emit("models-cleared");
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
    this.currentAbortController && this.currentAbortController.abort(), typeof window < "u" && Dr.cleanup(), this.vrManager && (this.vrManager.dispose(), this.vrManager = null), this.arManager && (this.arManager.dispose(), this.arManager = null), this.renderer && this.renderer.setAnimationLoop(null), this.loadedModels.forEach(({ model: e, tileset: t }) => {
      e.parent && e.parent.remove(e), t && this.tilesetLoader && this.tilesetLoader.disposeTileset(t), Qs(e);
    }), this.loadedModels = [], this.cameraManager && (this.cameraManager.dispose(), this.cameraManager = null), this.renderer && (this.renderer.dispose(), this.renderer.domElement && this.renderer.domElement.parentNode && this.renderer.domElement.parentNode.removeChild(this.renderer.domElement), this.renderer = null), this.modelLoader && (this.modelLoader.dispose(), this.modelLoader = null), this.tilesetLoader && (this.tilesetLoader.dispose(), this.tilesetLoader = null), this.perfMonitor && (this.perfMonitor.dispose(), this.perfMonitor = null), window.removeEventListener("resize", this.onWindowResize.bind(this)), this.removeAllListeners(), this.isInitialized = !1;
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
  isVRPresenting() {
    return this.vrManager ? this.vrManager.isVRPresenting : !1;
  }
  getVRManager() {
    return this.vrManager;
  }
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
   * // Access comfort settings: settings?.enableComfort
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
    return this.vrManager ? this.vrManager.setComfortPreset(e) : !1;
  }
  /**
   * Enable or disable comfort mode.
   *
   * Works while in VR and before entering VR by pre-configuring locomotion settings.
   *
   * @param {boolean} enabled
   * @returns {boolean}
   */
  setVRComfortMode(e) {
    return this.vrManager ? this.vrManager.setComfortMode(e) : !1;
  }
  /**
   * Toggle comfort mode and return the new state.
   *
   * @returns {boolean}
   */
  toggleVRComfortMode() {
    return this.vrManager ? this.vrManager.toggleComfortMode() : !1;
  }
  /**
   * Check if comfort mode is enabled.
   *
   * @returns {boolean}
   */
  isVRComfortModeEnabled() {
    return this.vrManager ? this.vrManager.isComfortModeEnabled() : !1;
  }
  applyInitialPositions(e) {
    if (!e) return;
    const t = this.isVRPresenting();
    t && e.vr && this.vrManager ? this.vrManager.applyVRPositions(e) : !t && e.desktop && this.applyDesktopPositions(e.desktop);
  }
}
const Lr = new tt(), Vt = new x();
class zn extends Vo {
  /**
   * Constructs a new line segments geometry.
   */
  constructor() {
    super(), this.isLineSegmentsGeometry = !0, this.type = "LineSegmentsGeometry";
    const e = [-1, 2, 0, 1, 2, 0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0, 0, -1, -1, 0, 1, -1, 0], t = [-1, 2, 1, 2, -1, 1, 1, 1, -1, -1, 1, -1, -1, -2, 1, -2], s = [0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5];
    this.setIndex(s), this.setAttribute("position", new Jt(e, 3)), this.setAttribute("uv", new Jt(t, 2));
  }
  /**
   * Applies the given 4x4 transformation matrix to the geometry.
   *
   * @param {Matrix4} matrix - The matrix to apply.
   * @return {LineSegmentsGeometry} A reference to this instance.
   */
  applyMatrix4(e) {
    const t = this.attributes.instanceStart, s = this.attributes.instanceEnd;
    return t !== void 0 && (t.applyMatrix4(e), s.applyMatrix4(e), t.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
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
    const s = new Zs(t, 6, 1);
    return this.setAttribute("instanceStart", new De(s, 3, 0)), this.setAttribute("instanceEnd", new De(s, 3, 3)), this.instanceCount = this.attributes.instanceStart.count, this.computeBoundingBox(), this.computeBoundingSphere(), this;
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
    const s = new Zs(t, 6, 1);
    return this.setAttribute("instanceColorStart", new De(s, 3, 0)), this.setAttribute("instanceColorEnd", new De(s, 3, 3)), this;
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
    return this.fromWireframeGeometry(new Oo(e.geometry)), this;
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
    this.boundingBox === null && (this.boundingBox = new tt());
    const e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
    e !== void 0 && t !== void 0 && (this.boundingBox.setFromBufferAttribute(e), Lr.setFromBufferAttribute(t), this.boundingBox.union(Lr));
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Et()), this.boundingBox === null && this.computeBoundingBox();
    const e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
    if (e !== void 0 && t !== void 0) {
      const s = this.boundingSphere.center;
      this.boundingBox.getCenter(s);
      let i = 0;
      for (let r = 0, n = e.count; r < n; r++)
        Vt.fromBufferAttribute(e, r), i = Math.max(i, s.distanceToSquared(Vt)), Vt.fromBufferAttribute(t, r), i = Math.max(i, s.distanceToSquared(Vt));
      this.boundingSphere.radius = Math.sqrt(i), isNaN(this.boundingSphere.radius) && console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.", this);
    }
  }
  toJSON() {
  }
}
jt.line = {
  worldUnits: { value: 1 },
  linewidth: { value: 1 },
  resolution: { value: new k(1, 1) },
  dashOffset: { value: 0 },
  dashScale: { value: 1 },
  dashSize: { value: 1 },
  gapSize: { value: 1 }
  // todo FIX - maybe change to totalSize
};
zt.line = {
  uniforms: $r.merge([
    jt.common,
    jt.fog,
    jt.line
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
class ts extends Xr {
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
      uniforms: $r.clone(zt.line.uniforms),
      vertexShader: zt.line.vertexShader,
      fragmentShader: zt.line.fragmentShader,
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
const Os = new st(), Fr = new x(), kr = new x(), q = new st(), z = new st(), ce = new st(), Hs = new x(), qs = new U(), j = new Ho(), Pr = new x(), Ot = new tt(), Ht = new Et(), he = new st();
let Ae, Fe;
function _r(a, e, t) {
  return he.set(0, 0, -e, 1).applyMatrix4(a.projectionMatrix), he.multiplyScalar(1 / he.w), he.x = Fe / t.width, he.y = Fe / t.height, he.applyMatrix4(a.projectionMatrixInverse), he.multiplyScalar(1 / he.w), Math.abs(Math.max(he.x, he.y));
}
function bh(a, e) {
  const t = a.matrixWorld, s = a.geometry, i = s.attributes.instanceStart, r = s.attributes.instanceEnd, n = Math.min(s.instanceCount, i.count);
  for (let o = 0, l = n; o < l; o++) {
    j.start.fromBufferAttribute(i, o), j.end.fromBufferAttribute(r, o), j.applyMatrix4(t);
    const c = new x(), A = new x();
    Ae.distanceSqToSegment(j.start, j.end, A, c), A.distanceTo(c) < Fe * 0.5 && e.push({
      point: A,
      pointOnLine: c,
      distance: Ae.origin.distanceTo(A),
      object: a,
      face: null,
      faceIndex: o,
      uv: null,
      uv1: null
    });
  }
}
function Ch(a, e, t) {
  const s = e.projectionMatrix, r = a.material.resolution, n = a.matrixWorld, o = a.geometry, l = o.attributes.instanceStart, c = o.attributes.instanceEnd, A = Math.min(o.instanceCount, l.count), h = -e.near;
  Ae.at(1, ce), ce.w = 1, ce.applyMatrix4(e.matrixWorldInverse), ce.applyMatrix4(s), ce.multiplyScalar(1 / ce.w), ce.x *= r.x / 2, ce.y *= r.y / 2, ce.z = 0, Hs.copy(ce), qs.multiplyMatrices(e.matrixWorldInverse, n);
  for (let d = 0, u = A; d < u; d++) {
    if (q.fromBufferAttribute(l, d), z.fromBufferAttribute(c, d), q.w = 1, z.w = 1, q.applyMatrix4(qs), z.applyMatrix4(qs), q.z > h && z.z > h)
      continue;
    if (q.z > h) {
      const E = q.z - z.z, m = (q.z - h) / E;
      q.lerp(z, m);
    } else if (z.z > h) {
      const E = z.z - q.z, m = (z.z - h) / E;
      z.lerp(q, m);
    }
    q.applyMatrix4(s), z.applyMatrix4(s), q.multiplyScalar(1 / q.w), z.multiplyScalar(1 / z.w), q.x *= r.x / 2, q.y *= r.y / 2, z.x *= r.x / 2, z.y *= r.y / 2, j.start.copy(q), j.start.z = 0, j.end.copy(z), j.end.z = 0;
    const g = j.closestPointToPointParameter(Hs, !0);
    j.at(g, Pr);
    const b = et.lerp(q.z, z.z, g), C = b >= -1 && b <= 1, y = Hs.distanceTo(Pr) < Fe * 0.5;
    if (C && y) {
      j.start.fromBufferAttribute(l, d), j.end.fromBufferAttribute(c, d), j.start.applyMatrix4(n), j.end.applyMatrix4(n);
      const E = new x(), m = new x();
      Ae.distanceSqToSegment(j.start, j.end, m, E), t.push({
        point: m,
        pointOnLine: E,
        distance: Ae.origin.distanceTo(m),
        object: a,
        face: null,
        faceIndex: d,
        uv: null,
        uv1: null
      });
    }
  }
}
class yh extends os {
  /**
   * Constructs a new wide line.
   *
   * @param {LineSegmentsGeometry} [geometry] - The line geometry.
   * @param {LineMaterial} [material] - The line material.
   */
  constructor(e = new zn(), t = new ts({ color: Math.random() * 16777215 })) {
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
    const e = this.geometry, t = e.attributes.instanceStart, s = e.attributes.instanceEnd, i = new Float32Array(2 * t.count);
    for (let n = 0, o = 0, l = t.count; n < l; n++, o += 2)
      Fr.fromBufferAttribute(t, n), kr.fromBufferAttribute(s, n), i[o] = o === 0 ? 0 : i[o - 1], i[o + 1] = i[o] + Fr.distanceTo(kr);
    const r = new Zs(i, 2, 1);
    return e.setAttribute("instanceDistanceStart", new De(r, 1, 0)), e.setAttribute("instanceDistanceEnd", new De(r, 1, 1)), this;
  }
  /**
   * Computes intersection points between a casted ray and this instance.
   *
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - The target array that holds the intersection points.
   */
  raycast(e, t) {
    const s = this.material.worldUnits, i = e.camera;
    i === null && !s && console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');
    const r = e.params.Line2 !== void 0 && e.params.Line2.threshold || 0;
    Ae = e.ray;
    const n = this.matrixWorld, o = this.geometry, l = this.material;
    Fe = l.linewidth + r, o.boundingSphere === null && o.computeBoundingSphere(), Ht.copy(o.boundingSphere).applyMatrix4(n);
    let c;
    if (s)
      c = Fe * 0.5;
    else {
      const h = Math.max(i.near, Ht.distanceToPoint(Ae.origin));
      c = _r(i, h, l.resolution);
    }
    if (Ht.radius += c, Ae.intersectsSphere(Ht) === !1)
      return;
    o.boundingBox === null && o.computeBoundingBox(), Ot.copy(o.boundingBox).applyMatrix4(n);
    let A;
    if (s)
      A = Fe * 0.5;
    else {
      const h = Math.max(i.near, Ot.distanceToPoint(Ae.origin));
      A = _r(i, h, l.resolution);
    }
    Ot.expandByScalar(A), Ae.intersectsBox(Ot) !== !1 && (s ? bh(this, t) : Ch(this, i, t));
  }
  onBeforeRender(e) {
    const t = this.material.uniforms;
    t && t.resolution && (e.getViewport(Os), this.material.uniforms.resolution.value.set(Os.z, Os.w));
  }
}
class oi extends zn {
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
    const t = e.length - 3, s = new Float32Array(2 * t);
    for (let i = 0; i < t; i += 3)
      s[2 * i] = e[i], s[2 * i + 1] = e[i + 1], s[2 * i + 2] = e[i + 2], s[2 * i + 3] = e[i + 3], s[2 * i + 4] = e[i + 4], s[2 * i + 5] = e[i + 5];
    return super.setPositions(s), this;
  }
  /**
   * Sets the given line colors for this geometry.
   *
   * @param {Float32Array|Array<number>} array - The position data to set.
   * @return {LineGeometry} A reference to this geometry.
   */
  setColors(e) {
    const t = e.length - 3, s = new Float32Array(2 * t);
    for (let i = 0; i < t; i += 3)
      s[2 * i] = e[i], s[2 * i + 1] = e[i + 1], s[2 * i + 2] = e[i + 2], s[2 * i + 3] = e[i + 3], s[2 * i + 4] = e[i + 4], s[2 * i + 5] = e[i + 5];
    return super.setColors(s), this;
  }
  /**
   * Setups this line segments geometry from the given sequence of points.
   *
   * @param {Array<Vector3|Vector2>} points - An array of points in 2D or 3D space.
   * @return {LineGeometry} A reference to this geometry.
   */
  setFromPoints(e) {
    const t = e.length - 1, s = new Float32Array(6 * t);
    for (let i = 0; i < t; i++)
      s[6 * i] = e[i].x, s[6 * i + 1] = e[i].y, s[6 * i + 2] = e[i].z || 0, s[6 * i + 3] = e[i + 1].x, s[6 * i + 4] = e[i + 1].y, s[6 * i + 5] = e[i + 1].z || 0;
    return super.setPositions(s), this;
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
class Ur extends yh {
  /**
   * Constructs a new wide line.
   *
   * @param {LineGeometry} [geometry] - The line geometry.
   * @param {LineMaterial} [material] - The line material.
   */
  constructor(e = new oi(), t = new ts({ color: Math.random() * 16777215 })) {
    super(e, t), this.isLine2 = !0, this.type = "Line2";
  }
}
class Eh {
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
    const t = [], s = (i) => {
      Array.isArray(i) ? i.forEach(s) : i && typeof i == "object" && (i.isObject3D || i.isMesh || i.traverse) && (i.updateMatrixWorld(!0), t.push(i));
    };
    s(e), this._raycastTargets = t;
  }
  getValidIntersections(e, t = null) {
    const s = t && t.length > 0 ? t : this._raycastTargets && this._raycastTargets.length > 0 ? this._raycastTargets : [];
    return !s || s.length === 0 ? [] : e.intersectObjects(s, !0).filter((r) => {
      const n = this.unifiedMeasurementPoints.some((c) => c.sphere === r.object), o = r.object === this.unifiedMeasurementLine, l = this.isMeasurementHelper(r.object);
      return !n && !o && !l;
    });
  }
  isMeasurementHelper(e) {
    if (!e) return !1;
    if (e.geometry === this.sphereGeometry || e.userData.isMeasurementSphere || e.type === "Line2" || e.type === "Line" || e.geometry && e.geometry.type === "LineGeometry") return !0;
    const t = ["RingGeometry", "TubeGeometry", "PlaneGeometry", "CircleGeometry"];
    return !!(e.geometry && t.includes(e.geometry.type) || typeof e.name == "string" && e.name.startsWith("MeasurementHelper"));
  }
  setTarget(e) {
    e ? this.setRaycastTargets(e) : this.setRaycastTargets([]);
  }
  setCamera(e) {
    this.camera = e;
  }
  /**
   * Creates a new MeasurementSystem instance
   * 
   * @param {MeasurementSystemConfig} config - Configuration object
   */
  constructor({ scene: e, camera: t, renderer: s, controls: i, dolly: r, uiParent: n, getRaycastInfo: o, config: l = {}, theme: c = "dark", showMeasurementLabels: A = !1 }) {
    this.ghostSpheres = {
      left: null,
      right: null
    }, this.MAX_SPHERES = 2, this.measurementSpheres = [], this.measurementLine = null, this.measurementLabel = null, this.previousTriggerState = {}, this.unifiedMeasurementPoints = [], this.unifiedMeasurementLine = null, this.desktopMeasurementPoints = [], this.desktopMeasurementLine = null, typeof window < "u" && (window.measurementSystem = this), this.scene = e, this.camera = t, this.renderer = s, this.uiParent = n || null, this.getRaycastInfo = typeof o == "function" ? o : null, this.controls = i, this.dolly = r, this.config = l, this.theme = c, this.showMeasurementLabels = A, this._raycastTargets = e && e.children ? e.children : [], this.enabled = !0, this.isVR = !1, this.measurementPanel = null, this.desktopMeasurementMode = !1, this.measurementSystemEnabled = !0, this.measurementAvailable = !0, this.desktopMeasurementPoints = [], this.connectionLine = null, this.desktopMeasurementLine = null, this.measurementSprite = null, this.measurementCanvas = null, this.measurementTexture = null, this.lastClickTime = 0, this.lastTriggerTime = 0, this._wasInVR = !1, this.focusAnimation = null, this._cancelFocusOnUserInput = null, this.mouse = new f.Vector2(), this.raycaster = new f.Raycaster();
    const h = () => {
      let d = null, u = null;
      const p = null, g = null;
      if (e && e.children && e.children.forEach((b) => {
        b && b.inputSource && b.inputSource.handedness && (b.inputSource.handedness === "left" && (d = b), b.inputSource.handedness === "right" && (u = b));
      }), (!d || !u) && s && s.xr && s.xr.getController)
        try {
          d = d || s.xr.getController(0), u = u || s.xr.getController(1);
        } catch {
        }
      d && u ? (this.attachVR({ controller1: d, controller2: u, controllerGrip1: p, controllerGrip2: g }), this.ghostSpheres && this.ghostSpheres.left && this.ghostSpheres.right && (this.ghostSpheres.left.visible = !0, this.ghostSpheres.right.visible = !0)) : (this._ghostSphereAttachRetries || (this._ghostSphereAttachRetries = 0), this._ghostSphereAttachRetries < 40 ? (this._ghostSphereAttachRetries++, setTimeout(h, 250)) : typeof window < "u" && window.console && console.warn("[MeasurementSystem] Could not find VR controllers to attach ghost spheres after multiple attempts."));
    };
    if (h(), s && s.xr && s.xr.addEventListener && s.xr.addEventListener("sessionstart", h), this.sphereGeometry = new f.SphereGeometry(0.02, 8, 6), this.placedMaterial = new f.MeshBasicMaterial({ color: 16777215 }), this.vrLineMaterial = new ts({
      color: 16777215,
      linewidth: 3,
      transparent: !0,
      opacity: 0.8,
      depthTest: !1,
      vertexColors: !1,
      dashed: !1
    }), this.desktopLineMaterial = new ts({
      color: 16777215,
      linewidth: 3,
      transparent: !0,
      opacity: 1,
      depthTest: !1,
      vertexColors: !1,
      dashed: !1
    }), this.MAX_DESKTOP_POINTS = 2, this.DRAG_THRESHOLD = 5, this.isDragging = !1, this.dragStartPosition = { x: 0, y: 0 }, this.createMeasurementPanel(), this.updateMeasurementPanel(), this._boundOnMouseClick = this.onMouseClick.bind(this), this._boundOnMouseDown = this.onMouseDown.bind(this), this._boundOnMouseMove = this.onMouseMove.bind(this), this._boundOnMouseUp = this.onMouseUp.bind(this), this.renderer.domElement.addEventListener("click", this._boundOnMouseClick, !1), this.renderer.domElement.addEventListener("mousedown", this._boundOnMouseDown, !1), this.renderer.domElement.addEventListener("mousemove", this._boundOnMouseMove, !1), this.renderer.domElement.addEventListener("mouseup", this._boundOnMouseUp, !1), s && s.xr && typeof s.xr.getController == "function") {
      const d = () => {
        if (s.xr.isPresenting) {
          const u = s.xr.getController(0), p = s.xr.getController(1), g = s.xr.getControllerGrip ? s.xr.getControllerGrip(0) : void 0, b = s.xr.getControllerGrip ? s.xr.getControllerGrip(1) : void 0;
          this.attachVR({ controller1: u, controller2: p, controllerGrip1: g, controllerGrip2: b });
        }
      };
      if (s.xr.addEventListener && s.xr.addEventListener("sessionstart", d), s.xr.isPresenting && d(), s.xr && typeof s.xr.requestSession == "function" && !s.xr._measurementSystemPatched) {
        const u = s.xr.requestSession.bind(s.xr);
        s.xr.requestSession = async (...p) => {
          const g = await u(...p);
          return setTimeout(() => {
            d();
          }, 100), g;
        }, s.xr._measurementSystemPatched = !0;
      }
    }
    setTimeout(() => {
      s && s.xr && typeof s.xr.isPresenting == "boolean" && s.xr.isPresenting && !this.isVR && console.warn("[MeasurementSystem] WARNING: attachVR() was never called. VR ghost spheres and VR measurement will not work.");
    }, 5e3);
  }
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
    this.desktopMeasurementMode = !1, this.updateMeasurementPanel(), this.clearLegacyDesktopMeasurement();
  }
  toggle() {
    this.desktopMeasurementMode = !this.desktopMeasurementMode, this.updateMeasurementPanel(), this.desktopMeasurementMode || this.clearLegacyDesktopMeasurement();
  }
  clear() {
    this.clearUnifiedMeasurement(), this.clearLegacyDesktopMeasurement(), this.clearLegacyVRMeasurement();
  }
  clearUnifiedMeasurement() {
    this.unifiedMeasurementPoints && this.unifiedMeasurementPoints.length > 0 && (this.unifiedMeasurementPoints.forEach((e) => {
      e.sphere && this.scene.children.includes(e.sphere) && this.scene.remove(e.sphere);
    }), this.unifiedMeasurementPoints.length = 0), this.unifiedMeasurementLine && (this.scene.remove(this.unifiedMeasurementLine), this.unifiedMeasurementLine = null), this.measurementSprite && (this.measurementSprite.visible = !1, this.scene.remove(this.measurementSprite), this.measurementSprite = null), this.updateMeasurementPanel();
  }
  clearVRMeasurement() {
    this.measurementSpheres && (this.measurementSpheres.forEach((e) => this.scene.remove(e)), this.measurementSpheres.length = 0), this.measurementLine && (this.scene.remove(this.measurementLine), this.measurementLine = null), this.measurementLabel && (this.scene.remove(this.measurementLabel), this.measurementLabel = null), this.placedSpheres && (this.placedSpheres.forEach((e) => this.scene.remove(e)), this.placedSpheres.length = 0), this.connectionLine && (this.scene.remove(this.connectionLine), this.connectionLine = null), this.measurementSprite && (this.measurementSprite.visible = !1), this.measurementSystemEnabled = this.measurementAvailable, this.updateMeasurementPanel();
  }
  setMeasurementAvailability(e) {
    this.measurementAvailable = e !== !1, this.measurementAvailable ? (this.measurementSystemEnabled = !0, this.renderer && this.renderer.xr && this.renderer.xr.isPresenting && (this.ghostSpheres.left && (this.ghostSpheres.left.visible = !0), this.ghostSpheres.right && (this.ghostSpheres.right.visible = !0))) : (this.desktopMeasurementMode = !1, this.measurementSystemEnabled = !1, this.clearUnifiedMeasurement(), this.clearLegacyDesktopMeasurement(), this.clearLegacyVRMeasurement(), this.ghostSpheres.left && (this.ghostSpheres.left.visible = !1), this.ghostSpheres.right && (this.ghostSpheres.right.visible = !1), this.setRaycastTargets([])), this.updateMeasurementPanel();
  }
  /**
   * Clear legacy VR measurements (old system compatibility)
   */
  clearLegacyVRMeasurement() {
    this.measurementSpheres && this.measurementSpheres.length > 0 && (this.measurementSpheres.forEach((e) => {
      e && this.scene.children.includes(e) && this.scene.remove(e);
    }), this.measurementSpheres.length = 0), this.measurementLine && (this.scene.remove(this.measurementLine), this.measurementLine = null), this.connectionLine && (this.scene.remove(this.connectionLine), this.connectionLine = null), this.measurementLabel && (this.scene.remove(this.measurementLabel), this.measurementLabel = null);
  }
  syncToVR() {
    if (this.desktopMeasurementPoints.length === 2) {
      if (this.clearVRMeasurement(), this.desktopMeasurementPoints.forEach((e) => {
        const t = new f.Mesh(this.sphereGeometry, this.placedMaterial);
        t.position.copy(e.position), this.scene.add(t), this.measurementSpheres.push(t);
      }), this.measurementSpheres.length === 2) {
        const e = new f.BufferGeometry().setFromPoints([
          this.measurementSpheres[0].position,
          this.measurementSpheres[1].position
        ]), t = this.vrLineMaterial || new f.LineBasicMaterial({ color: 16777215, transparent: !0, opacity: 0.8, depthTest: !1 });
        this.connectionLine = new f.Line(e, t), this.scene.add(this.connectionLine), this.createMeasurementDisplay(this.measurementSpheres[0].position.distanceTo(this.measurementSpheres[1].position)), this.measurementSprite && !this.scene.children.includes(this.measurementSprite) && this.scene.add(this.measurementSprite);
      }
      this.measurementSystemEnabled = this.measurementAvailable, this.updateMeasurementPanel();
    }
  }
  syncToDesktop() {
    if (this.measurementSpheres && this.measurementSpheres.length === 2) {
      this.clearLegacyDesktopMeasurement();
      for (let e = 0; e < 2; e++) {
        const t = this.measurementSpheres[e].position.clone();
        let s = t;
        if (this._raycastTargets && this._raycastTargets.length > 0 && this.camera) {
          const r = t.clone().sub(this.camera.position).normalize(), n = new f.Raycaster(this.camera.position, r), o = this.getValidIntersections(n);
          o.length > 0 && (s = o[0].point);
        }
        const i = new f.Mesh(this.sphereGeometry, this.placedMaterial);
        i.position.copy(s), this.scene.add(i), this.desktopMeasurementPoints.push(i);
      }
      if (this.desktopMeasurementPoints.length === 2) {
        const e = new oi();
        e.setPositions([
          this.desktopMeasurementPoints[0].position.x,
          this.desktopMeasurementPoints[0].position.y,
          this.desktopMeasurementPoints[0].position.z,
          this.desktopMeasurementPoints[1].position.x,
          this.desktopMeasurementPoints[1].position.y,
          this.desktopMeasurementPoints[1].position.z
        ]), this.desktopMeasurementLine = new Ur(e, this.desktopLineMaterial), this.desktopMeasurementLine.computeLineDistances(), this.scene.add(this.desktopMeasurementLine);
        const t = this.desktopMeasurementPoints[0].position.distanceTo(this.desktopMeasurementPoints[1].position);
        if (this.createMeasurementDisplay(t), this.measurementSprite) {
          const s = new f.Vector3();
          s.addVectors(this.desktopMeasurementPoints[0].position, this.desktopMeasurementPoints[1].position), s.multiplyScalar(0.5);
          const i = Math.max(0.05, Math.min(0.2, t * 0.03));
          s.y += i, this.measurementSprite.position.copy(s), this.measurementSprite.visible = !1, this.scene.children.includes(this.measurementSprite) || this.scene.add(this.measurementSprite);
        }
      }
      this.updateMeasurementPanel();
    }
  }
  formatDistance(e) {
    const t = e * 100;
    return t <= 20 ? `${t.toFixed(2)} cm` : `${e.toFixed(2)}m`;
  }
  createMeasurementDisplay(e) {
    const t = (window.devicePixelRatio || 1) * 4, s = 256, i = 64, r = s * t, n = i * t;
    this.measurementCanvas || (this.measurementCanvas = document.createElement("canvas")), (this.measurementCanvas.width !== r || this.measurementCanvas.height !== n) && (this.measurementCanvas.width = r, this.measurementCanvas.height = n);
    const o = this.measurementCanvas.getContext("2d");
    o.setTransform(1, 0, 0, 1, 0, 0), o.clearRect(0, 0, r, n), o.save(), o.scale(t, t);
    const l = 24;
    let c;
    e <= 2 ? c = 0.4 + e / 2 * 0.3 : e <= 4 ? c = 0.7 + (e - 2) / 2 * 0.2 : c = 0.9 + Math.min((e - 4) / 16, 1) * 0.5;
    const A = Math.round(l * c);
    o.font = `600 ${A}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`;
    const h = this.formatDistance(e), u = o.measureText(h).width, p = A, g = Math.max(6, A * 0.3), b = u + g * 2, C = p + g * 2, y = (s - b) / 2, E = (i - C) / 2;
    if (o.fillStyle = "rgba(0, 0, 0, 0.8)", o.beginPath(), o.roundRect(y, E, b, C, Math.max(4, A * 0.2)), o.fill(), o.fillStyle = "white", o.textAlign = "center", o.textBaseline = "middle", o.fillText(h, s / 2, i / 2), o.restore(), this.measurementTexture ? this.measurementTexture.needsUpdate = !0 : (this.measurementTexture = new f.CanvasTexture(this.measurementCanvas), this.measurementTexture.minFilter = f.LinearFilter, this.measurementTexture.magFilter = f.LinearFilter), !this.measurementSprite) {
      const w = new f.SpriteMaterial({
        map: this.measurementTexture,
        depthTest: !1,
        depthWrite: !1
      });
      this.measurementSprite = new f.Sprite(w);
    }
    const I = 0.3 * c, B = s / i;
    return this.measurementSprite.scale.set(I * B, I, 1), this.measurementSprite;
  }
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
  attachVR({ controller1: e, controller2: t, controllerGrip1: s, controllerGrip2: i }) {
    this.controller1 = e, this.controller2 = t, this.controllerGrip1 = s, this.controllerGrip2 = i;
    const r = new f.MeshBasicMaterial({
      color: 8947848,
      // ghostly grey
      transparent: !0,
      opacity: 0.25,
      depthTest: !1,
      depthWrite: !1
    });
    this.ghostSpheres.left && this.ghostSpheres.left.parent && this.ghostSpheres.left.parent.remove(this.ghostSpheres.left), this.ghostSpheres.right && this.ghostSpheres.right.parent && this.ghostSpheres.right.parent.remove(this.ghostSpheres.right), this.ghostSpheres.left = new f.Mesh(this.sphereGeometry, r.clone()), this.ghostSpheres.right = new f.Mesh(this.sphereGeometry, r.clone()), this.ghostSpheres.left.scale.set(0.5, 0.5, 0.5), this.ghostSpheres.right.scale.set(0.5, 0.5, 0.5), this.ghostSpheres.left.position.set(0, 0, -0.07), this.ghostSpheres.right.position.set(0, 0, -0.07), this.ghostSpheres.left.visible = !0, this.ghostSpheres.right.visible = !0, this.controller1 && this.controller1.add(this.ghostSpheres.left), this.controller2 && this.controller2.add(this.ghostSpheres.right), this.yButtonPressed = !1, this.MAX_SPHERES = 2, this.triggerState = {
      left: !1,
      right: !1
    }, this._onVRTriggerDown = this._onVRTriggerDown.bind(this), this._onVRTriggerUp = this._onVRTriggerUp.bind(this), this._onVRYButtonDown = this._onVRYButtonDown.bind(this), this._onVRYButtonUp = this._onVRYButtonUp.bind(this), this.controller1 && this.controller2 && (this.controller1.addEventListener("selectstart", this._onVRTriggerDown), this.controller1.addEventListener("selectend", this._onVRTriggerUp), this.controller2.addEventListener("selectstart", this._onVRTriggerDown), this.controller2.addEventListener("selectend", this._onVRTriggerUp), this.controller1.addEventListener("ybuttondown", this._onVRYButtonDown), this.controller1.addEventListener("ybuttonup", this._onVRYButtonUp), this.controller2.addEventListener("ybuttondown", this._onVRYButtonDown), this.controller2.addEventListener("ybuttonup", this._onVRYButtonUp)), this.isVR = !0, this.refreshMeasurementDisplayForVR();
  }
  _onVRTriggerDown() {
  }
  _onVRTriggerUp(e) {
    if (!this.measurementAvailable) return;
    const t = e.target, s = performance.now();
    if (!(this.lastTriggerTime && s - this.lastTriggerTime < 200) && (this.lastTriggerTime = s, this.measurementSystemEnabled)) {
      const i = new f.Vector3();
      let r = null;
      if (t === this.controller1 && this.ghostSpheres.left ? r = this.ghostSpheres.left : t === this.controller2 && this.ghostSpheres.right && (r = this.ghostSpheres.right), r)
        r.getWorldPosition(i);
      else {
        t.getWorldPosition(i);
        const n = new f.Vector3(0, 0, -0.05);
        n.applyQuaternion(t.quaternion), i.add(n);
      }
      this._placeVRMeasurementPoint(i);
    }
  }
  _onVRYButtonDown() {
    this.clearUnifiedMeasurement();
  }
  _onVRYButtonUp() {
  }
  _getVRControllerIntersection(e) {
    const t = new f.Matrix4();
    t.identity().extractRotation(e.matrixWorld);
    const s = new f.Vector3(), i = new f.Vector3(0, 0, -1).applyMatrix4(t);
    e.getWorldPosition(s);
    const r = new f.Raycaster(s, i.normalize()), n = this.scene && this.scene.children ? this.scene.children : [], o = this.getValidIntersections(r, n);
    return o.length > 0 ? o[0] : null;
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
      const i = this.unifiedMeasurementPoints.shift();
      i.sphere && this.scene.remove(i.sphere);
    }
    const s = new f.Mesh(this.sphereGeometry, this.placedMaterial);
    s.position.copy(e), s.scale.setScalar(0.5), s.userData.isMeasurementSphere = !0, this.scene.add(s), this.unifiedMeasurementPoints.push({
      position: e.clone(),
      sphere: s,
      source: t
    }), this.updateUnifiedMeasurementLine(), this.updateMeasurementPanel();
  }
  /**
   * Update the unified measurement line connecting the points
   */
  updateUnifiedMeasurementLine() {
    if (this.unifiedMeasurementLine && (this.scene.remove(this.unifiedMeasurementLine), this.unifiedMeasurementLine = null), this.unifiedMeasurementPoints.length === 2) {
      const e = this.unifiedMeasurementPoints[0].position, t = this.unifiedMeasurementPoints[1].position, s = new oi();
      s.setPositions([
        e.x,
        e.y,
        e.z,
        t.x,
        t.y,
        t.z
      ]), this.unifiedMeasurementLine = new Ur(s, this.desktopLineMaterial), this.unifiedMeasurementLine.computeLineDistances(), this.unifiedMeasurementLine.userData.isMeasurementLine = !0, this.scene.add(this.unifiedMeasurementLine);
      const i = e.distanceTo(t);
      this.createMeasurementDisplay(i);
      const r = i * 100 <= 20 ? 0.125 : 0.5;
      if (this.unifiedMeasurementPoints.forEach((n) => {
        n.sphere && n.sphere.scale.setScalar(r);
      }), this.measurementSprite) {
        const n = new f.Vector3();
        n.addVectors(e, t), n.multiplyScalar(0.5);
        const o = Math.max(0.05, Math.min(0.2, i * 0.03));
        n.y += o, this.measurementSprite.position.copy(n), this.scene.children.includes(this.measurementSprite) || this.scene.add(this.measurementSprite);
        const l = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting;
        this.measurementSprite.visible = l || this.showMeasurementLabels;
      }
      this.desktopMeasurementMode || (this.desktopMeasurementMode = !0);
    }
  }
  /**
   * Reset ghost sphere positions to correct local coordinates
   * Useful when VR coordinate systems get corrupted (e.g., returning from Quest browser)
   */
  resetGhostSpherePositions() {
    this.isVR && this.ghostSpheres && (this.ghostSpheres.left && this.controller1 && this.ghostSpheres.left.parent === this.controller1 && (this.ghostSpheres.left.position.set(0, 0, -0.07), this.ghostSpheres.left.rotation.set(0, 0, 0), this.ghostSpheres.left.scale.set(0.5, 0.5, 0.5)), this.ghostSpheres.right && this.controller2 && this.ghostSpheres.right.parent === this.controller2 && (this.ghostSpheres.right.position.set(0, 0, -0.07), this.ghostSpheres.right.rotation.set(0, 0, 0), this.ghostSpheres.right.scale.set(0.5, 0.5, 0.5)));
  }
  /**
   * Update method called each frame by the render loop
   */
  update() {
    if (this.isVR && this.ghostSpheres && (this.ghostSpheres.left && this.controller1 && this.ghostSpheres.left.visible && this.ghostSpheres.left.position.length() > 1 && this.resetGhostSpherePositions(), this.ghostSpheres.right && this.controller2 && this.ghostSpheres.right.visible && this.ghostSpheres.right.position.length() > 1 && this.resetGhostSpherePositions()), this.measurementSprite) {
      const e = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting, t = this.unifiedMeasurementPoints && this.unifiedMeasurementPoints.length === 2;
      this.measurementSprite.visible = t && (e || this.showMeasurementLabels);
    }
  }
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
    this.measurementPanel && this.measurementPanel.parentNode && (this.measurementPanel.parentNode.removeChild(this.measurementPanel), this.measurementPanel = null), this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null), this.controls && this._cancelFocusOnUserInput && (this.controls.removeEventListener("start", this._cancelFocusOnUserInput), this._cancelFocusOnUserInput = null), this.renderer.domElement.removeEventListener("click", this._boundOnMouseClick, !1), this.renderer.domElement.removeEventListener("mousedown", this._boundOnMouseDown, !1), this.renderer.domElement.removeEventListener("mousemove", this._boundOnMouseMove, !1), this.renderer.domElement.removeEventListener("mouseup", this._boundOnMouseUp, !1), this.controller1 && this.controller2 && (this.controller1.removeEventListener("selectstart", this._onVRTriggerDown), this.controller1.removeEventListener("selectend", this._onVRTriggerUp), this.controller2.removeEventListener("selectstart", this._onVRTriggerDown), this.controller2.removeEventListener("selectend", this._onVRTriggerUp), this.controller1.removeEventListener("ybuttondown", this._onVRYButtonDown), this.controller1.removeEventListener("ybuttonup", this._onVRYButtonUp), this.controller2.removeEventListener("ybuttondown", this._onVRYButtonDown), this.controller2.removeEventListener("ybuttonup", this._onVRYButtonUp)), this.clearLegacyDesktopMeasurement(), this.clearVRMeasurement(), this.ghostSpheres && (this.ghostSpheres.left && this.scene.remove(this.ghostSpheres.left), this.ghostSpheres.right && this.scene.remove(this.ghostSpheres.right), this.ghostSpheres = null), this.measurementSprite && this.scene.children.includes(this.measurementSprite) && (this.scene.remove(this.measurementSprite), this.measurementSprite = null), this.connectionLine && this.scene.children.includes(this.connectionLine) && (this.scene.remove(this.connectionLine), this.connectionLine = null), this.measurementSpheres = [], this.isVR = !1, typeof window < "u" && window.measurementSystem === this && (window.measurementSystem = void 0);
  }
  createMeasurementPanel() {
    const e = document.createElement("div");
    e.className = `measurement-panel${this.theme === "light" ? " light-theme" : ""}`, e.addEventListener("click", () => {
      if (!this.measurementAvailable) {
        this.updateMeasurementPanel();
        return;
      }
      this.renderer && this.renderer.xr && this.renderer.xr.isPresenting ? (this.measurementSystemEnabled = !this.measurementSystemEnabled, this.measurementSystemEnabled ? (this.ghostSpheres.left && (this.ghostSpheres.left.visible = !0), this.ghostSpheres.right && (this.ghostSpheres.right.visible = !0), this.resetGhostSpherePositions()) : (this.clearUnifiedMeasurement(), this.ghostSpheres.left && (this.ghostSpheres.left.visible = !1), this.ghostSpheres.right && (this.ghostSpheres.right.visible = !1)), this.updateMeasurementPanel()) : (this.desktopMeasurementMode = !this.desktopMeasurementMode, this.desktopMeasurementMode || this.clearUnifiedMeasurement(), this.updateMeasurementPanel());
    }), (this.uiParent || this.renderer && this.renderer.domElement && this.renderer.domElement.parentElement || document.body).appendChild(e), this.measurementPanel = e;
  }
  updateMeasurementPanel() {
    const e = this.measurementPanel;
    if (!e) return;
    const t = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting, s = this.unifiedMeasurementPoints ? this.unifiedMeasurementPoints.length : 0, i = s === 2, r = t ? this.measurementSystemEnabled : this.desktopMeasurementMode;
    let n;
    if (i && (n = this.unifiedMeasurementPoints[0].position.distanceTo(this.unifiedMeasurementPoints[1].position)), e.classList.remove("disabled", "active", "measured", "unavailable"), e.style.opacity = "", e.style.cursor = "pointer", e.setAttribute("aria-disabled", "false"), e.removeAttribute("title"), !this.measurementAvailable) {
      e.classList.add("disabled", "unavailable"), e.style.opacity = "0.55", e.style.cursor = "not-allowed", e.setAttribute("aria-disabled", "true"), e.title = "This model is marked as not measurable", e.innerHTML = `
        <div>MEASURE</div>
        <div style="font-size: 12px; margin-top: 4px;">Not available</div>
      `;
      return;
    }
    if (!r)
      e.classList.add("disabled"), e.innerHTML = `
        <div>MEASURE</div>
        <div style="font-size: 12px; margin-top: 4px;">Click to enable</div>
      `;
    else if (i)
      e.classList.add("measured"), e.innerHTML = `
        <div>${this.formatDistance(n)}</div>
        <div style="font-size: 12px; margin-top: 4px;">Click to disable</div>
      `;
    else {
      e.classList.add("active");
      const o = t ? "Use triggers" : "Click points";
      e.innerHTML = `
        <div>MEASURE: ON</div>
        <div style="font-size: 12px; margin-top: 4px;">${o} (${s}/2)</div>
      `;
    }
  }
  onMouseDown(e) {
    this.isDragging = !1, this.dragStartPosition.x = e.clientX, this.dragStartPosition.y = e.clientY;
  }
  onMouseMove(e) {
    if (!this.isDragging) {
      const t = Math.abs(e.clientX - this.dragStartPosition.x), s = Math.abs(e.clientY - this.dragStartPosition.y);
      (t > this.DRAG_THRESHOLD || s > this.DRAG_THRESHOLD) && (this.isDragging = !0);
    }
  }
  onMouseUp(e) {
    setTimeout(() => {
      this.isDragging = !1;
    }, 10);
  }
  onMouseClick(e) {
    if (!this.measurementAvailable)
      return;
    const t = Date.now(), s = t - this.lastClickTime < 300;
    if (this.lastClickTime = t, this.isDragging || !this.desktopMeasurementMode)
      return;
    this.desktopMeasurementMode && (e.stopPropagation(), e.preventDefault());
    let i = this.camera, r = !1;
    if (this.getRaycastInfo) {
      const o = this.getRaycastInfo(e);
      o && o.mouse && Number.isFinite(o.mouse.x) && Number.isFinite(o.mouse.y) && (o.mouse.isVector2 ? this.mouse.copy(o.mouse) : (this.mouse.x = o.mouse.x, this.mouse.y = o.mouse.y), o.camera && (i = o.camera), r = !0);
    }
    if (!r) {
      const o = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = (e.clientX - o.left) / o.width * 2 - 1, this.mouse.y = -((e.clientY - o.top) / o.height) * 2 + 1;
    }
    if (this.renderer && this.renderer.xr && this.renderer.xr.isPresenting) {
      const o = this.renderer.xr.getCamera();
      o && (i = o);
    }
    if ((!i || !i.isPerspectiveCamera && !i.isOrthographicCamera) && this.scene && this.scene.children) {
      for (const o of this.scene.children)
        if (o.isCamera) {
          i = o;
          break;
        }
    }
    if ((!i || !i.isPerspectiveCamera && !i.isOrthographicCamera) && typeof window < "u" && window.camera && (window.camera.isPerspectiveCamera || window.camera.isOrthographicCamera) && (i = window.camera), !i || !i.isPerspectiveCamera && !i.isOrthographicCamera && i.type !== "ArrayCamera")
      return;
    this.raycaster.setFromCamera(this.mouse, i);
    const n = this.getValidIntersections(this.raycaster);
    if (n.length > 0)
      if (s)
        this.focusOnPoint(n[0].point);
      else {
        const o = n[0].point;
        this.placeUnifiedMeasurementPoint(o, "desktop");
      }
  }
  focusOnPoint(e) {
    if (!e || !this.controls || !this.camera)
      return;
    this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null), this._cancelFocusOnUserInput && (this.controls.removeEventListener("start", this._cancelFocusOnUserInput), this._cancelFocusOnUserInput = null);
    const t = this.controls.target.clone(), s = this.camera.position.clone(), i = s.clone().sub(t), r = e.clone().add(i), n = 1e3, o = performance.now(), l = () => {
      this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null), this._cancelFocusOnUserInput && (this.controls.removeEventListener("start", this._cancelFocusOnUserInput), this._cancelFocusOnUserInput = null);
    };
    this._cancelFocusOnUserInput = l, this.controls.addEventListener("start", l, { once: !0 });
    const c = () => {
      const A = performance.now() - o, h = Math.min(A / n, 1), d = 1 - Math.pow(1 - h, 3);
      this.controls.target.lerpVectors(t, e, d), this.camera.position.lerpVectors(s, r, d), h < 1 ? this.focusAnimation = requestAnimationFrame(c) : (this.focusAnimation = null, this._cancelFocusOnUserInput && (this.controls.removeEventListener("start", this._cancelFocusOnUserInput), this._cancelFocusOnUserInput = null));
    };
    this.focusAnimation = requestAnimationFrame(c);
  }
  _focusOnPoint(e) {
    if (this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null), !this.controls || !this.camera) {
      console.warn("[MeasurementSystem] No controls or camera available for focusing");
      return;
    }
    const t = this.controls.target.clone(), s = this.camera.position.clone(), i = s.clone().sub(t), r = e.clone().add(i), n = 1e3, o = performance.now(), l = () => {
      const c = performance.now() - o, A = Math.min(c / n, 1), h = 1 - Math.pow(1 - A, 3);
      this.controls.target.lerpVectors(t, e, h), this.camera.position.lerpVectors(s, r, h), this.controls.update(), A < 1 ? this.focusAnimation = requestAnimationFrame(l) : this.focusAnimation = null;
    };
    this.focusAnimation = requestAnimationFrame(l);
  }
  /**
   * Refresh measurement display when entering VR
   * Called when VR mode is activated to ensure sprite is visible
   */
  refreshMeasurementDisplayForVR() {
    if (this.unifiedMeasurementPoints && this.unifiedMeasurementPoints.length === 2) {
      const e = this.unifiedMeasurementPoints[0].position, t = this.unifiedMeasurementPoints[1].position, s = e.distanceTo(t);
      if (this.createMeasurementDisplay(s), this.measurementSprite) {
        const i = new f.Vector3();
        i.addVectors(e, t), i.multiplyScalar(0.5);
        const r = Math.max(0.05, Math.min(0.2, s * 0.03));
        i.y += r, this.measurementSprite.position.copy(i), this.scene.children.includes(this.measurementSprite) || this.scene.add(this.measurementSprite);
        const n = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting;
        this.measurementSprite.visible = n || this.showMeasurementLabels;
      }
    }
  }
}
class Ei {
  constructor(e, t = {}) {
    this.vrManager = e, this.isComfortMode = !1, this._iconRendered = !1, this.lastToggleAt = 0, this.options = {
      containerId: t.containerId || "modelSelector",
      useInlineLayout: t.useInlineLayout !== !1,
      position: t.position || "bottom-right",
      offsetX: t.offsetX || 20,
      offsetY: t.offsetY || 120,
      toggleCooldownMs: t.toggleCooldownMs || 180,
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
    this.element = document.createElement("div"), this.element.id = "vrComfortGlyph", this.element.className = "vr-comfort-circle comfort-off", this.renderIcon(), this.element.tabIndex = 0, this.element.role = "button", this.element.title = "Comfort Mode Off", this.element.setAttribute("aria-label", "Comfort mode off. Click to enable.");
    const t = e.querySelector(".semantic-toggle");
    t ? e.insertBefore(this.element, t.nextSibling) : e.appendChild(this.element), this.updateInlineVisualState();
  }
  createFloatingElement() {
    this.element = document.createElement("div"), this.element.id = "vrComfortGlyph", this.element.className = "vr-comfort-glyph comfort-off", this.renderIcon(), this.element.title = "Comfort Mode Off", this.element.tabIndex = 0, this.element.role = "button", this.element.setAttribute("aria-label", "Comfort mode off. Click to enable.");
    const e = this.options.containerId ? document.getElementById(this.options.containerId) : document.body;
    e ? e.appendChild(this.element) : (console.warn("VRComfortGlyph: Container not found, appending to body"), document.body.appendChild(this.element));
  }
  attachStyles() {
    if (this.renderIcon(), document.getElementById("vr-comfort-glyph-styles"))
      return;
    const e = document.createElement("style");
    e.id = "vr-comfort-glyph-styles", e.textContent = `
      .vr-comfort-glyph {
        position: absolute;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: rgba(15, 23, 42, 0.58);
        border: 1px solid rgba(255, 255, 255, 0.22);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 120ms ease, border-color 120ms ease, box-shadow 140ms ease, color 120ms ease;
        font-size: 16px;
        z-index: 10000;
        backdrop-filter: blur(8px);
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
  -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      .vr-comfort-circle {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 120ms ease, border-color 120ms ease, box-shadow 140ms ease, color 120ms ease;
        font-size: 16px;
        margin-left: 10px;
        position: relative;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
  -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        overflow: hidden;
        flex-shrink: 0;
      }
      
      .vr-comfort-circle:hover {
        background: rgba(255, 255, 255, 0.09);
        border-color: rgba(255, 255, 255, 0.18);
      }
      
  .vr-comfort-circle:focus-visible {
        outline: 2px solid transparent;
        outline-offset: 2px;
      }
  .vr-comfort-circle.comfort-on:focus-visible { outline-color: #4ade80; }
  .vr-comfort-circle.comfort-off:focus-visible { outline-color: rgba(255,255,255,0.4); }
      
      .vr-comfort-circle:active {
      }
      
      .vr-comfort-circle.comfort-off {
        color: rgba(255, 255, 255, 0.5) !important;
        background: rgba(255, 255, 255, 0.06) !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
        box-shadow: none !important;
      }
      
      .vr-comfort-circle.comfort-off:hover {
        color: rgba(255, 255, 255, 0.68) !important;
        background: rgba(255, 255, 255, 0.09) !important;
        border-color: rgba(255, 255, 255, 0.18) !important;
        box-shadow: none !important;
      }
      
      .vr-comfort-circle.comfort-on {
        color: rgba(236, 253, 245, 0.98) !important;
        background: rgba(74, 222, 128, 0.14) !important;
        border-color: rgba(74, 222, 128, 0.8) !important;
        box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.86), 0 6px 18px rgba(2, 6, 23, 0.24) !important;
      }
      
      .vr-comfort-circle.comfort-on:hover {
        background: rgba(74, 222, 128, 0.2) !important;
        border-color: rgba(74, 222, 128, 0.9) !important;
        box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.92), 0 8px 22px rgba(2, 6, 23, 0.3) !important;
      }
      
      #modeToggleContainer {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 0 !important;
      }
      
      .semantic-toggle {
        flex-shrink: 0 !important;
      }
      
      .vr-comfort-glyph:hover {
        background: rgba(15, 23, 42, 0.7);
      }
      
  .vr-comfort-glyph:focus-visible {
        outline: 3px solid transparent;
        outline-offset: 2px;
      }
  .vr-comfort-glyph.comfort-on:focus-visible { outline-color: #4ade80; }
  .vr-comfort-glyph.comfort-off:focus-visible { outline-color: rgba(255,255,255,0.35); }
      
      .vr-comfort-glyph.comfort-off {
        color: rgba(226, 232, 240, 0.55);
        border-color: rgba(255, 255, 255, 0.22);
        background: rgba(15, 23, 42, 0.58);
        box-shadow: none;
      }
      
      .vr-comfort-glyph.comfort-on {
        color: rgba(236, 253, 245, 0.98);
        border-color: rgba(74, 222, 128, 0.8);
        background: rgba(74, 222, 128, 0.15);
        box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.86), 0 6px 20px rgba(2, 6, 23, 0.25);
      }

      
      .vr-comfort-emoji {
        display: block;
        font-size: 16px;
        line-height: 1;
        transform: translateY(0.5px);
        transition: transform 90ms ease;
      }
      .vr-comfort-circle:active .vr-comfort-emoji,
      .vr-comfort-glyph:active .vr-comfort-emoji {
        transform: translateY(0.5px) scale(0.98);
      }
      
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
      
      @media (max-width: 768px) {
        .vr-comfort-circle {
          width: 48px;
          height: 48px;
          font-size: 16px;
          margin-left: 8px;
        }
        
        #modeToggleContainer {
          flex-wrap: nowrap !important;
          justify-content: center !important;
        }
        
        
        .vr-comfort-glyph {
          width: 42px !important;
          height: 42px !important;
          font-size: 20px !important;
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
    this.element && (this._onClick = (e) => {
      this.toggle(), this.element && !(e instanceof KeyboardEvent) && this.element.blur();
    }, this._onKeydown = (e) => {
      (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.toggle());
    }, this._onPointerDown = () => {
      this.element && this.element.blur();
    }, this.element.addEventListener("click", this._onClick), this.element.addEventListener("keydown", this._onKeydown), this.element.addEventListener("pointerdown", this._onPointerDown));
  }
  renderIcon() {
    this.element && (this._iconRendered || (this.element.innerHTML = '<span class="vr-comfort-emoji" aria-hidden="true">🛋️</span>', this._iconRendered = !0));
  }
  updatePosition() {
    this.element && (this.element.classList.remove("position-bottom-right", "position-bottom-left", "position-top-right", "position-top-left"), this.element.classList.add(`position-${this.options.position}`));
  }
  updateVisualState() {
    this.element && (this.options.useInlineLayout ? this.updateInlineVisualState() : this.updateFloatingVisualState());
  }
  updateInlineVisualState() {
    this.element && (this.element.classList.remove("comfort-off", "comfort-on"), this.element.style.removeProperty("background"), this.element.style.removeProperty("border-color"), this.element.style.removeProperty("color"), this.element.style.removeProperty("box-shadow"), this.isComfortMode ? (this.element.classList.add("comfort-on"), this.element.title = "Comfort Mode On", this.element.setAttribute("aria-label", "Comfort mode on. Click to disable.")) : (this.element.classList.add("comfort-off"), this.element.title = "Comfort Mode Off", this.element.setAttribute("aria-label", "Comfort mode off. Click to enable.")));
  }
  updateFloatingVisualState() {
    this.element && (this.updatePosition(), this.element.classList.remove("comfort-off", "comfort-on"), this.isComfortMode ? (this.element.classList.add("comfort-on"), this.element.title = "Comfort Mode On", this.element.setAttribute("aria-label", "Comfort mode on. Click to disable.")) : (this.element.classList.add("comfort-off"), this.element.title = "Comfort Mode Off", this.element.setAttribute("aria-label", "Comfort mode off. Click to enable.")), this.renderIcon());
  }
  applyComfortMode(e, { emitEvent: t = !0, applyToManager: s = !0 } = {}) {
    if (this.isComfortMode = e === !0, s && this.vrManager && this.vrManager.setComfortPreset(this.isComfortMode ? "comfort" : "free"), this.updateVisualState(), t && this.element) {
      const i = new CustomEvent("vrcomfortchange", {
        detail: {
          isComfortMode: this.isComfortMode,
          preset: this.isComfortMode ? "comfort" : "free"
        }
      });
      this.element.dispatchEvent(i);
    }
  }
  toggle() {
    const e = Date.now();
    e - this.lastToggleAt < this.options.toggleCooldownMs || (this.lastToggleAt = e, this.applyComfortMode(!this.isComfortMode, { emitEvent: !0, applyToManager: !0 }));
  }
  setComfortMode(e, { emitEvent: t = !0, applyToManager: s = !0 } = {}) {
    const i = e === !0;
    this.isComfortMode !== i ? this.applyComfortMode(i, { emitEvent: t, applyToManager: s }) : this.updateVisualState();
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
    if (this.element && (this._onClick && this.element.removeEventListener("click", this._onClick), this._onKeydown && this.element.removeEventListener("keydown", this._onKeydown), this._onPointerDown && this.element.removeEventListener("pointerdown", this._onPointerDown), this.element.parentNode && this.element.parentNode.removeChild(this.element), this.element = null), document.querySelectorAll(".vr-comfort-glyph").length === 0) {
      const t = document.getElementById("vr-comfort-glyph-styles");
      t && t.remove();
    }
    this.vrManager = null;
  }
  static create(e, t = {}) {
    return new Ei(e, t);
  }
}
class Ih {
  constructor(e) {
    this.scene = e, this.particleBounds = {
      min: new f.Vector3(-50, -25, -50),
      max: new f.Vector3(50, 25, 50)
    }, this.particleCount = 1750, this.densityMultiplier = 1, this.createParticleSystem();
  }
  calculateParticleCount(e) {
    const t = new f.Vector3();
    e.getSize(t);
    const i = t.clone().multiplyScalar(2.5), r = i.x * i.y * i.z, n = Math.round(r * 0.01 * this.densityMultiplier);
    return Math.max(100, Math.min(16e3, n));
  }
  /**
   * Set particle density multiplier and recreate system
   */
  setDensity(e) {
    if (this.densityMultiplier = Math.max(0, Math.min(2, e)), this.densityMultiplier === 0) {
      this.disable();
      return;
    }
    const t = new f.Box3(this.particleBounds.min, this.particleBounds.max), s = this.calculateParticleCount(t);
    this.particles && (this.scene.remove(this.particles), this.particles.geometry && this.particles.geometry.dispose(), this.particles.material && this.particles.material.dispose(), this.particles = null), this.particleCount = s, this.createParticleSystem(), this.enable();
  }
  createParticleSystem() {
    const e = new Float32Array(this.particleCount * 3), t = new Float32Array(this.particleCount * 3), s = new Float32Array(this.particleCount);
    this.initializeParticleData(e, t, s);
    const i = new f.BufferGeometry(), r = new Float32Array(this.particleCount);
    for (let n = 0; n < this.particleCount; n++)
      r[n] = n;
    i.setAttribute("position", new f.BufferAttribute(e, 3)), i.setAttribute("originalSize", new f.BufferAttribute(s, 1)), i.setAttribute("velocity", new f.BufferAttribute(t, 3)), i.setAttribute("particleIndex", new f.BufferAttribute(r, 1)), this.originalMaterial = this.createParticleMaterial(), this.particles = new f.Points(i, this.originalMaterial), this.particles.visible = !1, this.scene.add(this.particles);
  }
  /**
   * Initialize particle data arrays
   */
  initializeParticleData(e, t, s) {
    for (let i = 0; i < this.particleCount; i++) {
      const r = i * 3;
      e[r] = this.particleBounds.min.x + Math.random() * (this.particleBounds.max.x - this.particleBounds.min.x), e[r + 1] = this.particleBounds.min.y + Math.random() * (this.particleBounds.max.y - this.particleBounds.min.y), e[r + 2] = this.particleBounds.min.z + Math.random() * (this.particleBounds.max.z - this.particleBounds.min.z);
      const n = 1e-5, o = -5e-6, l = 5e-6;
      t[r] = n + (Math.random() - 0.5) * 2e-5, t[r + 1] = o + (-Math.random() * 1e-5 - 5e-6), t[r + 2] = l + (Math.random() - 0.5) * 2e-5;
      const c = Math.random();
      c < 0.7 ? s[i] = 75e-4 + Math.random() * 5e-3 : c < 0.9 ? s[i] = 0.0125 + Math.random() * 75e-4 : s[i] = 0.02 + Math.random() * 0.01;
    }
  }
  /**
   * Create particle material with GPU shaders
   */
  createParticleMaterial() {
    const e = document.createElement("canvas");
    e.width = e.height = 32;
    const t = e.getContext("2d"), s = t.createRadialGradient(16, 16, 0, 16, 16, 16);
    s.addColorStop(0, "rgba(255, 255, 255, 1)"), s.addColorStop(0.7, "rgba(255, 255, 255, 0.8)"), s.addColorStop(1, "rgba(255, 255, 255, 0)"), t.fillStyle = s, t.fillRect(0, 0, 32, 32);
    const i = new f.CanvasTexture(e);
    return i.needsUpdate = !0, new f.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointTexture: { value: i },
        color: { value: new f.Color(16777215) },
        opacity: { value: 1 },
        size: { value: 2 },
        boundsMin: { value: this.particleBounds.min.clone() },
        boundsMax: { value: this.particleBounds.max.clone() },
        fogColor: { value: new f.Color(268073) },
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
      blending: f.NormalBlending,
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
    const t = new f.Box3().setFromObject(e), s = t.getSize(new f.Vector3()), i = t.getCenter(new f.Vector3()), n = s.clone().multiplyScalar(2.5 * 0.5);
    this.particleBounds.min.copy(i).sub(n), this.particleBounds.max.copy(i).add(n);
    const o = this.calculateParticleCount(new f.Box3(this.particleBounds.min, this.particleBounds.max));
    Math.abs(o - this.particleCount) > this.particleCount * 0.2 ? (this.particles && (this.scene.remove(this.particles), this.particles.geometry && this.particles.geometry.dispose(), this.particles.material && this.particles.material.dispose(), this.particles = null), this.particleCount = o, this.createParticleSystem()) : this.redistributeParticles();
  }
  /**
   * Redistribute particles within current bounds
   */
  redistributeParticles() {
    if (!this.particles || !this.particles.geometry.attributes.position) return;
    const e = this.particles.geometry.attributes.position.array;
    for (let t = 0; t < this.particleCount; t++) {
      const s = t * 3;
      e[s] = this.particleBounds.min.x + Math.random() * (this.particleBounds.max.x - this.particleBounds.min.x), e[s + 1] = this.particleBounds.min.y + Math.random() * (this.particleBounds.max.y - this.particleBounds.min.y), e[s + 2] = this.particleBounds.min.z + Math.random() * (this.particleBounds.max.z - this.particleBounds.min.z);
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
class wh {
  constructor(e) {
    this.scene = e, this.controllerSpotlight = null, this.spotlightTarget = null, this.isQuest2 = !1, this.isQuest3 = !1, this.detectQuestDevice(), this.createSpotlight();
  }
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
    const t = e * Math.PI / 180, s = (this.isQuest2, 15);
    this.controllerSpotlight = new f.SpotLight(
      16777215,
      // Pure white light
      2.5,
      // Realistic underwater torch intensity
      s,
      // Adjustable distance based on device
      t,
      // Configurable beam width in radians
      0.15,
      // Softer penumbra for more realistic falloff
      0.8
      // Higher decay for realistic underwater attenuation
    ), this.controllerSpotlight.position.set(0, 0, 0), this.controllerSpotlight.visible = !0, this.controllerSpotlight.castShadow = !0;
    const i = this.isQuest2 ? 512 : 1024;
    this.controllerSpotlight.shadow.mapSize.width = i, this.controllerSpotlight.shadow.mapSize.height = i, this.controllerSpotlight.shadow.camera.near = 0.1, this.controllerSpotlight.shadow.camera.far = s, this.controllerSpotlight.shadow.camera.fov = e, this.controllerSpotlight.shadow.bias = -5e-4, this.controllerSpotlight.shadow.normalBias = 0.02, this.controllerSpotlight.shadow.radius = 4, this.controllerSpotlight.shadow.blurSamples = 10, this.scene.add(this.controllerSpotlight), this.spotlightTarget = new f.Object3D(), this.scene.add(this.spotlightTarget), this.controllerSpotlight.target = this.spotlightTarget;
  }
  /**
   * Switch torch shadow quality. 'reduced' is intended for VR sessions on
   * standalone headsets where the moving spotlight re-renders its shadow
   * map every frame over everything it lights.
   *
   * @param {string} profile - 'full' or 'reduced'
   */
  setQuality(e = "full") {
    if (!this.controllerSpotlight) return;
    const t = e === "reduced", s = this.controllerSpotlight.shadow, i = t || this.isQuest2 ? 512 : 1024;
    s.mapSize.width !== i && (s.mapSize.set(i, i), s.map && (s.map.dispose(), s.map = null)), s.radius = t ? 1 : 4, s.blurSamples = t ? 4 : 10;
  }
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
    const t = new f.Vector3(), s = new f.Quaternion();
    e.getWorldPosition(t), e.getWorldQuaternion(s), this.controllerSpotlight.position.copy(t);
    const i = new f.Vector3(0, 0, -1);
    i.applyQuaternion(s);
    const r = t.clone().add(i.multiplyScalar(2));
    this.spotlightTarget.position.copy(r);
  }
  updateCameraPosition(e) {
    if (!this.controllerSpotlight || !this.spotlightTarget) return;
    this.controllerSpotlight.position.copy(e.position);
    const t = new f.Vector3(0, 0, -1);
    t.applyQuaternion(e.quaternion);
    const s = e.position.clone().add(t.multiplyScalar(8));
    this.spotlightTarget.position.copy(s);
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
   * Dispose of torch resources
   */
  dispose() {
    this.controllerSpotlight && (this.scene.remove(this.controllerSpotlight), this.controllerSpotlight = null), this.spotlightTarget && (this.scene.remove(this.spotlightTarget), this.spotlightTarget = null);
  }
}
class Bh {
  constructor(e) {
    this.scene = e, this.overheadLight = null, this.clearModeDirectionalLight = null, this.clearModeHemisphereLight = null, this.isTransitioning = !1, this.currentMode = "survey", this.pendingAnimations = /* @__PURE__ */ new Set(), this.isDisposed = !1, this.shadowProfile = "full", this.initializeLighting();
  }
  initializeLighting() {
    if (this.isDisposed || !this.scene) {
      console.warn("Cannot initialize lighting: system disposed or no scene");
      return;
    }
    try {
      this.overheadLight = new f.AmbientLight(16777215, 0.5), this.currentMode = null;
    } catch (e) {
      console.error("Failed to initialize lighting system:", e);
    }
  }
  createSurveyModeLights() {
    if (!(this.isDisposed || !this.scene))
      try {
        this.clearModeDirectionalLight || (this.clearModeDirectionalLight = new f.DirectionalLight(16777215, 1.32), this.clearModeDirectionalLight.position.set(50, 100, 50), this.clearModeDirectionalLight.castShadow = this.shadowProfile === "full", this.clearModeDirectionalLight.shadow.mapSize.width = 2048, this.clearModeDirectionalLight.shadow.mapSize.height = 2048, this.clearModeDirectionalLight.shadow.bias = -1e-4, this.clearModeDirectionalLight.shadow.normalBias = 0.03, this.clearModeDirectionalLight.shadow.camera.near = 0.5, this.clearModeDirectionalLight.shadow.camera.far = 500, this.clearModeDirectionalLight.shadow.camera.left = -150, this.clearModeDirectionalLight.shadow.camera.right = 150, this.clearModeDirectionalLight.shadow.camera.top = 150, this.clearModeDirectionalLight.shadow.camera.bottom = -150, this.scene.add(this.clearModeDirectionalLight)), this.clearModeHemisphereLight || (this.clearModeHemisphereLight = new f.HemisphereLight(16777215, 4473924, 0.77), this.scene.add(this.clearModeHemisphereLight)), this.fillLight || (this.fillLight = new f.DirectionalLight(16777215, 0.88), this.fillLight.position.set(-10, 10, -10), this.scene.add(this.fillLight)), this.bottomLight || (this.bottomLight = new f.DirectionalLight(16777215, 0.33), this.bottomLight.position.set(0, -10, 0), this.scene.add(this.bottomLight));
      } catch (e) {
        console.error("Failed to create survey mode lights:", e);
      }
  }
  enableDiveMode() {
    this.overheadLight && this.scene.children.includes(this.overheadLight) && this.scene.remove(this.overheadLight), this.clearModeDirectionalLight && (this.scene.remove(this.clearModeDirectionalLight), this.clearModeDirectionalLight = null), this.clearModeHemisphereLight && (this.scene.remove(this.clearModeHemisphereLight), this.clearModeHemisphereLight = null), this.fillLight && (this.scene.remove(this.fillLight), this.fillLight = null), this.bottomLight && (this.scene.remove(this.bottomLight), this.bottomLight = null), this.currentMode = "dive";
  }
  enableSurveyMode() {
    this.overheadLight && !this.scene.children.includes(this.overheadLight) && this.scene.add(this.overheadLight), this.overheadLight && (this.overheadLight.intensity = 0.66, this.overheadLight.color.setHex(16777215)), this.createSurveyModeLights(), this.currentMode = "survey";
  }
  /**
   * Set shadow quality for the survey-mode directional light. Anything
   * below 'full' turns its shadow casting off — a 2048px map over a whole
   * tileset is too expensive to re-render on a standalone headset.
   *
   * @param {string} profile - 'full', 'reduced', or 'off'
   */
  setShadowQuality(e = "full") {
    this.shadowProfile = e, this.clearModeDirectionalLight && (this.clearModeDirectionalLight.castShadow = e === "full");
  }
  setVRDiveMode() {
    this.overheadLight && this.scene.children.includes(this.overheadLight) && this.scene.remove(this.overheadLight);
  }
  setDesktopDiveMode() {
    this.overheadLight && this.scene.children.includes(this.overheadLight) && this.scene.remove(this.overheadLight);
  }
  fadeLighting({ target: e, fromIntensity: t, toIntensity: s, fromColor: i, toColor: r, duration: n = 500, onComplete: o }) {
    if (this.isDisposed || !e) {
      o && o();
      return;
    }
    const l = Symbol("fade-animation");
    this.pendingAnimations.add(l);
    const c = performance.now(), A = s - t;
    let h, d;
    i !== void 0 && r !== void 0 && (h = new f.Color(i), d = new f.Color(r));
    const u = (p) => {
      if (!this.pendingAnimations.has(l) || this.isDisposed) {
        o && o();
        return;
      }
      try {
        const g = p - c, b = Math.min(g / n, 1), C = 1 - Math.pow(1 - b, 3);
        if (!e || this.scene && !this.scene.children.includes(e)) {
          this.pendingAnimations.delete(l), o && o();
          return;
        }
        e.intensity = t + A * C, h && d && e.color && e.color.lerpColors(h, d, C), b < 1 ? requestAnimationFrame(u) : (this.pendingAnimations.delete(l), o && o());
      } catch (g) {
        console.error("Error in lighting animation:", g), this.pendingAnimations.delete(l), o && o();
      }
    };
    requestAnimationFrame(u);
  }
  cancelActiveAnimations() {
    this.pendingAnimations.clear();
  }
  safeRemoveFromScene(e) {
    if (this.scene && e && this.scene.children.includes(e))
      try {
        this.scene.remove(e);
      } catch (t) {
        console.error("Error removing object from scene:", t);
      }
  }
  getCurrentMode() {
    return this.currentMode;
  }
  isTransitionInProgress() {
    return this.isTransitioning;
  }
  setSurveyBrightness(e = 1) {
    const t = Math.max(0.5, Math.min(5, e));
    this.overheadLight && (this.overheadLight.intensity = 0.66 * t), this.clearModeDirectionalLight && (this.clearModeDirectionalLight.intensity = 1.32 * t), this.clearModeHemisphereLight && (this.clearModeHemisphereLight.intensity = 0.77 * t), this.fillLight && (this.fillLight.intensity = 0.88 * t), this.bottomLight && (this.bottomLight.intensity = 0.33 * t);
  }
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
class Sh {
  constructor(e, t, s) {
    this.scene = e, this.renderer = t, this.camera = s, this.isDiveModeEnabled = !1, this.currentVRMode = null, this.lighting = new Bh(e), this.particles = new Ih(e), this.torch = new wh(e), this.isQuest2 = !1, this.isQuest3 = !1, this._fallbackHandedness = /* @__PURE__ */ new Map(), this.detectQuestDevice(), this.applyModeSettings();
  }
  setCamera(e) {
    this.camera = e;
  }
  /**
   * Toggle between dive and survey modes
   */
  toggleDiveMode() {
    this.setDiveMode(!this.isDiveModeEnabled);
  }
  setDiveMode(e) {
    if (this.isARSessionActive() && e || this.isDiveModeEnabled === e)
      return;
    this.isDiveModeEnabled = e;
    const t = document.querySelector(".mode-toggle__switch");
    t && (t.checked = this.isDiveModeEnabled), this.applyModeSettings();
  }
  isDiveMode() {
    return this.isDiveModeEnabled;
  }
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
    const e = Number(this.camera.userData?.belowMinimumFar);
    this.isQuest2 ? (this.camera.far = Math.max(20, Number.isFinite(e) ? e : 0), this.camera.updateProjectionMatrix(), this.isDiveModeEnabled && (this.scene.fog = new f.FogExp2(268073, 0.084))) : (this.camera.far = Math.max(2e3, Number.isFinite(e) ? e : 0), this.camera.updateProjectionMatrix(), this.isDiveModeEnabled && (this.scene.fog = new f.FogExp2(268073, 0.056)));
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
      e ? (this.scene.fog = new f.FogExp2(268073, 0.056), this.lighting.setVRDiveMode(), this.isDiveModeEnabled && this.torch.enableTorch()) : (this.scene.fog = new f.FogExp2(268073, 5e-3), this.lighting.setDesktopDiveMode()), this.particles.updateFog(this.scene.fog);
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
    for (let s = 0; s < t.length; s++)
      if (t[s].handedness === "right") {
        const i = this.renderer.xr.getController(s);
        this.updateTorchPosition(i);
        break;
      }
  }
  /**
   * Update torch position using VRManager (recommended approach)
   * This uses the VRManager's synced controller properties for consistency
   */
  updateTorchFromVRManager(e) {
    if (!e) {
      console.warn("updateTorchFromVRManager: vrManager is null");
      return;
    }
    if (!(!e.isVRPresenting || !this.isDiveModeEnabled)) {
      if (e.controller2)
        this.updateTorchPosition(e.controller2);
      else if (e.controllers && e.controllers.length > 0) {
        const t = e.controllers.find(
          (s) => s.userData && s.userData.inputSource && s.userData.inputSource.handedness === "right"
        );
        t && this.updateTorchPosition(t);
      }
    }
  }
  /**
   * Update system (call in animation loop)
   */
  update(e, t) {
    this.particles.update(e), this.renderer && this.checkVRControllerButtons(this.renderer), this.applyModeSpecificSettings();
  }
  initializeToggleSwitch() {
    const e = document.querySelector(".mode-toggle__switch");
    e ? (e.checked = !1, this.isDiveModeEnabled = !1, this.disableDiveMode(), e.addEventListener("change", () => {
      this.toggleDiveMode();
    })) : this.disableDiveMode(), document.querySelectorAll(".toggle-option").forEach((s) => {
      s.addEventListener("click", () => {
        const i = s.classList.contains("right"), r = e ? e.checked : !1;
        (i && !r || !i && r) && this.toggleDiveMode();
      });
    });
  }
  /**
   * Handle VR controller button presses for mode switching
   */
  handleControllerButton(e, t) {
    return this.isARSessionActive() ? !1 : t === 4 ? (this.toggleDiveMode(), !0) : !1;
  }
  /**
   * Check VR controller buttons for mode switching
   * This replaces the button checking logic that was in the example
   */
  checkVRControllerButtons(e) {
    if (!e || !e.xr || !e.xr.isPresenting || this.isARSessionActive()) return;
    const t = e.xr.getSession && e.xr.getSession(), s = t && t.inputSources ? Array.from(t.inputSources) : this._getFallbackInputSources();
    if (!(!s || s.length === 0)) {
      for (const i of s)
        if (i.gamepad && i.handedness) {
          const r = i.gamepad, n = i.handedness;
          [4, 5].forEach((l) => {
            if (r.buttons[l]) {
              const c = r.buttons[l], A = `${n}-${l}`;
              this.buttonStates || (this.buttonStates = /* @__PURE__ */ new Map());
              const h = this.buttonStates.get(A) || !1, d = c.pressed;
              d && !h && this.toggleDiveMode(), this.buttonStates.set(A, d);
            }
          });
        }
    }
  }
  _getFallbackInputSources() {
    if (typeof navigator > "u" || !navigator.getGamepads) return [];
    const e = navigator.getGamepads();
    if (!e) return [];
    const t = [];
    let s = 0;
    for (const i of e) {
      if (!i || !i.buttons) continue;
      const r = this._resolveHandedness(i, s);
      if (!r) {
        s += 1;
        continue;
      }
      t.push({ gamepad: i, handedness: r }), s += 1;
    }
    return t;
  }
  _resolveHandedness(e, t) {
    const s = (e.hand || "").toLowerCase();
    if (s === "left" || s === "right") return s;
    const i = (e.id || "").toLowerCase();
    return i.includes("left") ? "left" : i.includes("right") ? "right" : this._fallbackHandedness.has(e.index) ? this._fallbackHandedness.get(e.index) : t === 0 ? (this._fallbackHandedness.set(e.index, "left"), "left") : t === 1 ? (this._fallbackHandedness.set(e.index, "right"), "right") : null;
  }
  isARSessionActive() {
    if (!this.renderer?.xr) return !1;
    const e = this.renderer.xr.getSession && this.renderer.xr.getSession();
    return e ? e.mode === "immersive-ar" ? !0 : e.mode === "immersive-vr" ? !1 : e.environmentBlendMode === "alpha-blend" || e.environmentBlendMode === "additive" : !1;
  }
  /**
   * Dispose of all resources
   */
  dispose() {
    this.lighting.dispose(), this.particles.dispose(), this.torch.dispose();
  }
}
class Mh extends It {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.domElement - Element used for pointer lock
   * @param {THREE.PerspectiveCamera} options.camera - Camera to control
   * @param {Object} options.controls - OrbitControls instance
   * @param {THREE.WebGLRenderer} [options.renderer] - Renderer (for XR checks)
   * @param {boolean} [options.enabled=true] - Enable fly controls
   * @param {number} [options.baseSpeed=6] - Base movement speed
   * @param {number} [options.boostSpeed=20] - Boosted speed (shift held)
   * @param {number} [options.speedScale=100] - Reference size for scaling speed
   * @param {number} [options.mouseSensitivity=0.002] - Mouse sensitivity
   * @param {number} [options.keyboardYawRate=0.34] - Keyboard yaw speed in radians per second
   * @param {number} [options.keyboardBoostYawRate=0.95] - Shift keyboard yaw speed in radians per second
   * @param {number} [options.keyboardSlowYawMultiplier=0.53] - Slow-mode multiplier for keyboard yaw
   * @param {number} [options.keyboardPitchRate=0.2] - Keyboard pitch speed in radians per second
   * @param {number} [options.keyboardPitchBoostMultiplier=2.0] - Shift multiplier for keyboard pitch
   * @param {number} [options.pitchReturnRate=0.35] - Pitch return speed when K is held
   * @param {number} [options.slowSpeedMultiplier=0.2] - Slow-mode multiplier for base movement
   * @param {number} [options.slowBoostMultiplier=0.3333333333333333] - Slow-mode multiplier for boosted movement
   * @param {boolean} [options.clickToExit=true] - Exit fly mode on click
   */
  constructor(e = {}) {
    super(), this.domElement = e.domElement || null, this.camera = e.camera || null, this.controls = e.controls || null, this.renderer = e.renderer || null, this.enabled = e.enabled ?? !0, this.baseSpeed = e.baseSpeed ?? 6, this.boostSpeed = e.boostSpeed ?? 20, this.speedScale = e.speedScale ?? 100, this.mouseSensitivity = e.mouseSensitivity ?? 2e-3, this.keyboardYawRate = e.keyboardYawRate ?? 0.34, this.keyboardBoostYawRate = e.keyboardBoostYawRate ?? 0.95, this.keyboardSlowYawMultiplier = e.keyboardSlowYawMultiplier ?? 0.53, this.keyboardPitchRate = e.keyboardPitchRate ?? 0.2, this.keyboardPitchBoostMultiplier = e.keyboardPitchBoostMultiplier ?? 2, this.pitchReturnRate = e.pitchReturnRate ?? 0.35, this.slowSpeedMultiplier = e.slowSpeedMultiplier ?? 0.2, this.slowBoostMultiplier = e.slowBoostMultiplier ?? 1 / 3, this.clickToExit = e.clickToExit ?? !0, this.pointerLocked = !1, this.modelSize = this.speedScale, this.cameraYaw = 0, this.cameraPitch = 0, this.slowMode = !!(e.slowMode ?? !1), this.keys = {
      w: !1,
      a: !1,
      s: !1,
      d: !1,
      q: !1,
      e: !1,
      j: !1,
      k: !1,
      l: !1,
      u: !1,
      o: !1,
      shift: !1
    }, this._controlsEnabledBefore = !0, this._onKeyDown = this._onKeyDown.bind(this), this._onKeyUp = this._onKeyUp.bind(this), this._onMouseMove = this._onMouseMove.bind(this), this._onPointerLockChange = this._onPointerLockChange.bind(this), this._onClick = this._onClick.bind(this), this.attach();
  }
  attach() {
    !this.domElement || typeof document > "u" || (document.addEventListener("keydown", this._onKeyDown), document.addEventListener("keyup", this._onKeyUp), document.addEventListener("mousemove", this._onMouseMove), document.addEventListener("pointerlockchange", this._onPointerLockChange), this.clickToExit && this.domElement.addEventListener("click", this._onClick));
  }
  dispose() {
    document.removeEventListener("keydown", this._onKeyDown), document.removeEventListener("keyup", this._onKeyUp), document.removeEventListener("mousemove", this._onMouseMove), document.removeEventListener("pointerlockchange", this._onPointerLockChange), this.domElement && this.clickToExit && this.domElement.removeEventListener("click", this._onClick), this.exitFlyMode();
  }
  setEnabled(e) {
    this.enabled = !!e, this.enabled || this.exitFlyMode();
  }
  isActive() {
    return this.pointerLocked;
  }
  isSlowMode() {
    return this.slowMode;
  }
  setSlowMode(e) {
    const t = !!e;
    this.slowMode !== t && (this.slowMode = t, this.emit("slow-mode-change", { active: this.slowMode }));
  }
  toggleSlowMode() {
    this.setSlowMode(!this.slowMode);
  }
  enterFlyMode() {
    !this.enabled || !this.domElement || document.pointerLockElement !== this.domElement && this.domElement.requestPointerLock();
  }
  exitFlyMode() {
    typeof document > "u" || document.pointerLockElement === this.domElement && document.exitPointerLock();
  }
  toggleFlyMode() {
    this.pointerLocked ? this.exitFlyMode() : this.enterFlyMode();
  }
  setModelSizeFromObject(e) {
    if (!e) return;
    const t = new f.Box3().setFromObject(e);
    if (t.isEmpty()) return;
    const s = t.getSize(new f.Vector3()), i = Math.max(s.x, s.y, s.z);
    i > 0 && Number.isFinite(i) && (this.modelSize = Math.max(1, Math.min(1e4, i)));
  }
  update(e) {
    if (!this.enabled || !this.pointerLocked) return;
    if (this.renderer?.xr?.isPresenting) {
      this.exitFlyMode();
      return;
    }
    if (!this.camera) return;
    const t = this.modelSize / this.speedScale, s = this.keys.shift ? this.boostSpeed : this.baseSpeed, i = this.keys.shift ? this.slowBoostMultiplier : this.slowSpeedMultiplier, r = this.slowMode ? i : 1, n = s * r * t, o = new f.Vector3();
    this.keys.w && (o.z -= 1), this.keys.s && (o.z += 1), this.keys.a && (o.x -= 1), this.keys.d && (o.x += 1), this.keys.q && (o.y -= 1), this.keys.e && (o.y += 1), this._applyKeyboardLook(e), o.lengthSq() > 0 && (o.normalize(), o.applyQuaternion(this.camera.quaternion), this.camera.position.addScaledVector(o, n * e), this._syncControlsTarget());
  }
  _syncControlsTarget() {
    if (!this.controls || !this.camera) return;
    const e = new f.Vector3(0, 0, -5).applyQuaternion(this.camera.quaternion);
    this.controls.target.copy(this.camera.position).add(e);
  }
  _applyKeyboardLook(e) {
    let t = !1;
    const s = ((this.keys.j ? 1 : 0) + (this.keys.l ? -1 : 0)) * 0.5, i = (this.keys.u ? 1 : 0) + (this.keys.o ? -1 : 0);
    if (s !== 0) {
      const n = this.keys.shift ? this.keyboardBoostYawRate : this.keyboardYawRate, o = this.slowMode ? n * this.keyboardSlowYawMultiplier : n;
      this.cameraYaw += s * o * e, t = !0;
    }
    if (i !== 0) {
      const n = this.keys.shift ? this.keyboardPitchRate * this.keyboardPitchBoostMultiplier : this.keyboardPitchRate;
      this.cameraPitch = this._clampPitch(this.cameraPitch + i * n * e), t = !0;
    } else if (this.keys.k && Math.abs(this.cameraPitch) > 1e-4) {
      const n = this.pitchReturnRate * e;
      this.cameraPitch = Math.abs(this.cameraPitch) <= n ? 0 : this.cameraPitch - Math.sign(this.cameraPitch) * n, t = !0;
    }
    if (!t) return;
    const r = new f.Euler(this.cameraPitch, this.cameraYaw, 0, "YXZ");
    this.camera.quaternion.setFromEuler(r), this._syncControlsTarget();
  }
  _clampPitch(e) {
    return Math.max(
      -Math.PI / 2 + 0.01,
      Math.min(Math.PI / 2 - 0.01, e)
    );
  }
  _onKeyDown(e) {
    if (!this.enabled) return;
    const t = e.target;
    if (t instanceof HTMLElement) {
      const i = t.tagName;
      if (i === "INPUT" || i === "SELECT" || i === "TEXTAREA" || t.isContentEditable)
        return;
    }
    const s = e.key.toLowerCase();
    if (s in this.keys && (e.preventDefault(), this.keys[s] = !0), e.shiftKey && (this.keys.shift = !0), e.code === "KeyX" || s === "x") {
      e.preventDefault(), e.repeat || this.toggleSlowMode();
      return;
    }
    if (e.shiftKey && (e.key === "`" || e.key === "~" || e.code === "Backquote")) {
      e.preventDefault(), this.pointerLocked || this.enterFlyMode();
      return;
    }
    (e.code === "KeyF" || s === "f") && (e.preventDefault(), this.toggleFlyMode());
  }
  _onKeyUp(e) {
    const t = e.key.toLowerCase();
    t in this.keys && (this.keys[t] = !1), e.shiftKey || (this.keys.shift = !1);
  }
  _onMouseMove(e) {
    if (!this.pointerLocked || !this.camera) return;
    this.cameraYaw -= e.movementX * this.mouseSensitivity, this.cameraPitch -= e.movementY * this.mouseSensitivity, this.cameraPitch = this._clampPitch(this.cameraPitch);
    const t = new f.Euler(this.cameraPitch, this.cameraYaw, 0, "YXZ");
    this.camera.quaternion.setFromEuler(t), this._syncControlsTarget();
  }
  _onPointerLockChange() {
    const e = this.pointerLocked;
    if (this.pointerLocked = document.pointerLockElement === this.domElement, this.pointerLocked && !e && this.camera) {
      const t = new f.Euler().setFromQuaternion(this.camera.quaternion, "YXZ");
      this.cameraYaw = t.y, this.cameraPitch = t.x;
    }
    this.controls && (this.pointerLocked ? (this._controlsEnabledBefore = this.controls.enabled, this.controls.enabled = !1) : this.controls.enabled = this._controlsEnabledBefore), this.emit("fly-mode-change", { active: this.pointerLocked, slow: this.slowMode });
  }
  _onClick() {
    this.pointerLocked && this.exitFlyMode();
  }
}
class ai extends It {
  static _isEditableTarget(e) {
    if (!(e instanceof HTMLElement)) return !1;
    const t = e.tagName;
    return t === "INPUT" || t === "SELECT" || t === "TEXTAREA" || e.isContentEditable;
  }
  /**
   * Creates a new ModelViewer instance
   * 
   * @param {HTMLElement|string} container - DOM element or CSS selector for the viewer container
   * @param {ModelViewerOptions} [options={}] - Configuration options
   */
  constructor(e, t = {}) {
    super(), typeof e == "string" && (e = document.querySelector(e)), this.container = e || document.body, window.getComputedStyle(this.container).position === "static" && (this.container.style.position = "relative");
    const s = {
      models: { type: "object", default: {} },
      autoLoadFirst: { type: "boolean", default: !0 },
      showLoadingIndicator: { type: "boolean", default: !0 },
      showStatus: { type: "boolean", default: !1 },
      showInfo: { type: "boolean", default: !1 },
      enableVR: { type: "boolean", default: !1 },
      enableAR: { type: "boolean", default: !1 },
      enableMeasurement: { type: "boolean", default: !0 },
      measurementTheme: { type: "string", default: "dark" },
      showMeasurementLabels: { type: "boolean", default: !1 },
      enableVRComfortGlyph: { type: "boolean", default: !1 },
      enableDiveSystem: { type: "boolean", default: !0 },
      showDiveToggle: { type: "boolean", default: !0 },
      enableFullscreen: { type: "boolean", default: !1 },
      enableScreenshot: { type: "boolean", default: !1 },
      enableFlyControls: { type: "boolean", default: !0 },
      flyControls: { type: "object", default: {} },
      enableVRAudio: { type: "boolean", default: !1 },
      audioPath: { type: "string", default: "./sound/" },
      assetBasePath: { type: "string", default: null },
      dracoDecoderPath: { type: "string", default: null },
      ktx2TranscoderPath: { type: "string", default: null },
      webxrInputProfilesPath: { type: "string", default: null },
      enableAutoRecovery: { type: "boolean", default: !0 },
      viewerConfig: {
        type: "object",
        default: {
          scene: {
            background: { type: "color", value: "#041729" }
          }
        }
      },
      initialModel: { type: "string", default: null },
      initialPositions: { type: "object", default: null }
    };
    this.config = new ls(s).validate(t), this.options = this.config, this.currentModelKey = null, this.belowViewer = null, this.ui = {}, this.uiRoot = null, this.stereoUiMirror = null, this.stereoUiObserver = null, this.stereoUiSyncQueued = !1, this.stereoUiActive = !1, this.measurementSystem = null, this.comfortGlyph = null, this.diveSystem = null, this.fullscreenButton = null, this.screenshotButton = null, this.flyControls = null, this.lastComfortMode = null, this._vrButtonWasVisible = !1, this.isLoading = !1, this.loadingMessage = "", this.loadingModelName = "", this.loadingPercentage = 0, this.lastManualLoadingMessage = "", this.stageOverrideActive = !1, this.vrUpdateLoop = null, this.lastRequestedModelKey = null, this.recoveryHandlers = null, this.recoveryTimer = null, this.recoveryCooldownMs = 1200, this.lastRecoveryAttemptAt = 0, this.recoveryAttempts = 0, this.maxRecoveryAttempts = 3, this.hadContextLoss = !1, this.isDisposed = !1, typeof window < "u" && (window.modelViewer = this), this.init();
  }
  init() {
    const e = {
      ...this.config.viewerConfig,
      // Enable VR only if AR is not enabled (preserve other vr settings such
      // as shadowProfile/foveation from viewerConfig)
      ...this.config.enableVR && !this.config.enableAR && { vr: { ...this.config.viewerConfig?.vr || {}, enabled: !0 } },
      // Enable AR if requested
      ...this.config.enableAR && { ar: { enabled: !0, ...this.config.viewerConfig?.ar || {} } },
      // Explicitly disable VR when AR is enabled
      ...this.config.enableAR && { vr: { ...this.config.viewerConfig?.vr || {}, enabled: !1 } },
      ...this.config.audioPath && { audioPath: this.config.audioPath },
      ...typeof this.config.enableVRAudio < "u" && { enableVRAudio: this.config.enableVRAudio },
      ...this.config.assetBasePath && { assetBasePath: this.config.assetBasePath },
      ...this.config.dracoDecoderPath && { dracoDecoderPath: this.config.dracoDecoderPath },
      ...this.config.ktx2TranscoderPath && { ktx2TranscoderPath: this.config.ktx2TranscoderPath },
      ...this.config.webxrInputProfilesPath && { webxrInputProfilesPath: this.config.webxrInputProfilesPath }
    };
    if (this.belowViewer = new mh(this.container, e), this.setupEventForwarding(), this.setupRecoveryHandlers(), this.belowViewer.on("initialized", () => {
      this.setupRecoveryHandlers(), this.setupFocusInteraction(), this._maybeAttachMeasurementSystem(), this._maybeAttachVRComfortGlyph(), this._maybeAttachDiveSystem(), this._maybeAttachScreenshotButton(), this._maybeAttachFullscreenButton(), this._maybeAttachFlyControls();
    }), this.belowViewer.isInitialized && (this.setupRecoveryHandlers(), this.setupFocusInteraction(), this._maybeAttachMeasurementSystem(), this._maybeAttachVRComfortGlyph(), this._maybeAttachDiveSystem(), this._maybeAttachScreenshotButton(), this._maybeAttachFullscreenButton(), this._maybeAttachFlyControls()), Object.keys(this.config.models).length > 0 && (this.createUI(), this.populateDropdown(), this.config.autoLoadFirst)) {
      const t = Object.keys(this.config.models)[0];
      setTimeout(() => this.loadModel(t), 100);
    }
  }
  _maybeAttachMeasurementSystem() {
    if (!this.config.enableMeasurement || this.measurementSystem) return;
    this.measurementSystem = new Eh({
      scene: this.belowViewer.sceneManager.scene,
      camera: this.belowViewer.cameraManager.camera,
      renderer: this.belowViewer.renderer,
      controls: this.belowViewer.cameraManager.controls,
      uiParent: this.getUiContainer(),
      getRaycastInfo: (t) => this.getPointerRaycastInfo(t),
      theme: this.config.measurementTheme,
      showMeasurementLabels: this.config.showMeasurementLabels
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
      const t = this.belowViewer.loadedModels[0].model, s = this.currentModelKey ? this.config.models[this.currentModelKey] : null;
      this.applyModelMeasurementConfig(s, t);
    }
  }
  isModelMeasurable(e) {
    return !e || e.measurable !== !1;
  }
  applyModelMeasurementConfig(e, t = null) {
    if (!this.measurementSystem) return;
    const s = this.isModelMeasurable(e);
    if (typeof this.measurementSystem.setMeasurementAvailability == "function" ? this.measurementSystem.setMeasurementAvailability(s) : (this.measurementSystem.clearUnifiedMeasurement(), this.measurementSystem.clearLegacyVRMeasurement(), this.measurementSystem.clearLegacyDesktopMeasurement(), this.measurementSystem.desktopMeasurementMode = !1, this.measurementSystem.measurementSystemEnabled = s, this.measurementSystem.updateMeasurementPanel()), this.measurementSystem.ghostSpheres) {
      const i = s && this.measurementSystem.isVR;
      this.measurementSystem.ghostSpheres.left && (this.measurementSystem.ghostSpheres.left.visible = i), this.measurementSystem.ghostSpheres.right && (this.measurementSystem.ghostSpheres.right.visible = i);
    }
    if (s && t) {
      this.measurementSystem.setRaycastTargets(t);
      return;
    }
    this.measurementSystem.setRaycastTargets([]);
  }
  async _maybeAttachVRComfortGlyph() {
    if (!this.config.enableVRComfortGlyph || this.comfortGlyph || !this.belowViewer.vrManager || !this.belowViewer.vrManager.vrCore || (await this.belowViewer.vrManager.vrCore.checkVRSupported(), !this.belowViewer.vrManager.vrCore.isVRSupported)) return;
    this.comfortGlyph = new Ei(this.belowViewer.vrManager, {
      position: "bottom-right",
      offsetX: 20,
      offsetY: 70
    });
    const e = this.belowViewer.getVRComfortSettings ? this.belowViewer.getVRComfortSettings() : null, t = e ? e.locomotionMode === "teleport" && e.reducedMotion === !0 : !1, s = typeof this.lastComfortMode == "boolean" ? this.lastComfortMode : t;
    if (this.lastComfortMode = s, this.comfortGlyph.setComfortMode(s, {
      emitEvent: !1,
      applyToManager: !1
    }), this.comfortGlyph.element.addEventListener("vrcomfortchange", (i) => {
      this.lastComfortMode = i.detail.isComfortMode;
    }), this.belowViewer.vrManager) {
      const i = this.belowViewer.vrManager.onComfortModeChange;
      this.belowViewer.vrManager.onComfortModeChange = (r) => {
        i && i(r);
        const n = r && typeof r.enabled == "boolean" ? r.enabled : this.belowViewer.vrManager.isComfortModeEnabled();
        this.lastComfortMode = n, this.comfortGlyph && this.comfortGlyph.setComfortMode(n, {
          emitEvent: !1,
          applyToManager: !1
        }), this.emit("comfort-mode-change", {
          enabled: n,
          inVR: this.belowViewer.vrManager.isVRPresenting,
          preset: n ? "comfort" : "free"
        });
      };
    }
    if (this.belowViewer.vrManager && this.belowViewer.vrManager.vrCore) {
      const i = this.belowViewer.vrManager.vrCore.onSessionStart;
      this.belowViewer.vrManager.vrCore.onSessionStart = async () => {
        i && await i(), this.lastComfortMode !== null && setTimeout(() => {
          this.lastComfortMode ? this.belowViewer.vrManager.setComfortPreset("comfort") : this.belowViewer.vrManager.setComfortPreset("free"), this.comfortGlyph.setComfortMode(this.lastComfortMode, {
            emitEvent: !1,
            applyToManager: !1
          });
        }, 50);
      };
    }
    document.addEventListener("keydown", (i) => {
      ai._isEditableTarget(i.target) || i.code === "KeyC" && (i.ctrlKey || i.metaKey) && (i.preventDefault(), this.comfortGlyph && this.comfortGlyph.toggle());
    }), window.addEventListener("beforeunload", () => this.comfortGlyph && this.comfortGlyph.dispose());
  }
  _maybeAttachDiveSystem() {
    if (!this.config.enableDiveSystem || this.diveSystem) return;
    this.diveSystem = new Sh(
      this.belowViewer.sceneManager.scene,
      this.belowViewer.renderer,
      this.belowViewer.cameraManager.camera
    ), setTimeout(() => {
      this.diveSystem.initializeToggleSwitch();
    }, 100), document.addEventListener("keydown", (t) => {
      if (!ai._isEditableTarget(t.target)) {
        if (t.code === "KeyZ" && !t.ctrlKey && !t.metaKey && !t.altKey) {
          if (this.belowViewer?.arManager?.isActive?.())
            return;
          t.preventDefault(), this.diveSystem && this.diveSystem.toggleDiveMode();
        }
        t.code === "KeyH" && !t.ctrlKey && !t.metaKey && !t.altKey && (t.preventDefault(), this.takeScreenshot());
      }
    });
    const e = (t) => {
      if (this.diveSystem) {
        const s = performance.now();
        this.diveSystem.update(s, t), this.belowViewer.vrManager && this.diveSystem.updateTorchFromVRManager(this.belowViewer.vrManager), this.belowViewer.renderer.xr.isPresenting || this.diveSystem.torch.updateCameraPosition(this.belowViewer.cameraManager.camera);
      }
    };
    this.belowViewer.onAfterRender ? this.belowViewer.onAfterRender(e) : this.belowViewer.on("before-render", e), this.belowViewer.on("ar-session-start", () => {
      this.diveSystem && this.diveSystem.setDiveMode(!1);
    }), this.belowViewer.on("vr-session-start", () => {
      const t = this.belowViewer.config?.vr?.shadowProfile || "reduced";
      this.diveSystem && t !== "full" && (this.diveSystem.torch?.setQuality?.("reduced"), this.diveSystem.lighting?.setShadowQuality?.(t));
    }), this.belowViewer.on("vr-session-end", () => {
      this.diveSystem && (this.diveSystem.torch?.setQuality?.("full"), this.diveSystem.lighting?.setShadowQuality?.("full"));
    }), this.on("model-loaded", (t) => {
      this.diveSystem && t.model && this.diveSystem.updateParticleBounds(t.model);
    }), typeof window < "u" && (window.diveSystem = this.diveSystem);
  }
  _maybeAttachScreenshotButton() {
    if (!this.config.enableScreenshot || this.screenshotButton) return;
    const e = document.createElement("div");
    e.id = "screenshotButton", e.className = "screenshot-button", this.config.measurementTheme === "light" && e.classList.add("light-theme"), this.config.enableMeasurement || e.classList.add("no-measurement"), e.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
      <circle cx="12" cy="13" r="4"></circle>
    </svg>`, e.tabIndex = 0, e.title = "Save Screenshot", e.setAttribute("aria-label", "Save Screenshot"), e.addEventListener("click", () => this.takeScreenshot()), e.addEventListener("keydown", (t) => {
      (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.takeScreenshot());
    }), this.getUiContainer().appendChild(e), this.screenshotButton = e, this.ui.screenshot = e;
  }
  _maybeAttachFullscreenButton() {
    if (!this.config.enableFullscreen || this.fullscreenButton) return;
    const e = document.createElement("div");
    e.id = "fullscreenButton", e.className = "fullscreen-button", this.config.measurementTheme === "light" && e.classList.add("light-theme"), this.config.enableMeasurement || e.classList.add("no-measurement"), e.textContent = "⛶", e.tabIndex = 0, e.title = "Enter Fullscreen", e.setAttribute("aria-label", "Enter Fullscreen"), e.addEventListener("click", () => this.toggleFullscreen()), e.addEventListener("keydown", (t) => {
      (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.toggleFullscreen());
    }), this.getUiContainer().appendChild(e), this.fullscreenButton = e, this.ui.fullscreen = e, this._onFullscreenChange = () => this.updateFullscreenButton(), document.addEventListener("fullscreenchange", this._onFullscreenChange), this.updateFullscreenButton();
  }
  _maybeAttachFlyControls() {
    if (!this.config.enableFlyControls || this.flyControls || !this.belowViewer?.cameraManager || !this.belowViewer?.renderer) return;
    this.flyControls = new Mh({
      domElement: this.belowViewer.renderer.domElement,
      camera: this.belowViewer.cameraManager.camera,
      controls: this.belowViewer.cameraManager.controls,
      renderer: this.belowViewer.renderer,
      ...this.config.flyControls
    }), this._ensureFlyModeIndicator(), this.flyControls.on("fly-mode-change", (t) => {
      this.emit("fly-mode-change", t), this.ui.flyIndicator && this.ui.flyIndicator.classList.toggle("visible", t.active), this._handleVRButtonVisibility(t.active);
    }), this.flyControls.on("slow-mode-change", (t) => {
      this.emit("fly-slow-mode-change", t);
    });
    const e = (t) => {
      this.flyControls && this.flyControls.update(t);
    };
    this.belowViewer.onAfterRender ? this.belowViewer.onAfterRender(e) : this.belowViewer.on("before-render", e);
  }
  _ensureFlyModeIndicator() {
    if (this.ui.flyIndicator || typeof document > "u") return;
    const e = document.getElementById("flyModeIndicator");
    if (e) {
      this.ui.flyIndicator = e;
      return;
    }
    const t = document.createElement("div");
    t.className = "fly-mode-indicator";
    const s = this.flyControls?.clickToExit ? "Click to exit or press Esc" : "Press Esc to exit";
    t.innerHTML = `
      <div class="crosshair"></div>
      <div class="hint">
        <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> Move
        <kbd>Q</kbd><kbd>E</kbd> Up/Down
        <kbd>Shift</kbd> Fast<br>
        <span class="fly-exit">${s}</span>
      </div>
    `, this.container.appendChild(t), this.ui.flyIndicator = t;
  }
  _handleVRButtonVisibility(e) {
    const t = this.belowViewer?.vrManager?.vrCore?.vrButton;
    t && (e ? window.getComputedStyle(t).visibility !== "hidden" && (this._vrButtonWasVisible = !0, t.style.setProperty("visibility", "hidden", "important"), t.style.setProperty("opacity", "0", "important"), t.style.setProperty("pointer-events", "none", "important")) : this._vrButtonWasVisible && (t.style.setProperty("visibility", "visible", "important"), t.style.setProperty("opacity", "1", "important"), t.style.setProperty("pointer-events", "auto", "important"), this._vrButtonWasVisible = !1));
  }
  setupRecoveryHandlers() {
    if (this.recoveryHandlers || !this.config.enableAutoRecovery || typeof window > "u" || typeof document > "u") return;
    const e = this.belowViewer?.renderer?.domElement;
    if (!e) return;
    const t = () => {
      document.hidden || this.queueRecovery("visibility-change", { forceReload: this.hadContextLoss });
    }, s = () => {
      this.queueRecovery("window-focus", { forceReload: !1 });
    }, i = (n) => {
      n && typeof n.preventDefault == "function" && n.preventDefault(), this.hadContextLoss = !0;
    }, r = () => {
      this.queueRecovery("context-restored", { forceReload: !0, delayMs: 120 });
    };
    document.addEventListener("visibilitychange", t), window.addEventListener("focus", s), e.addEventListener("webglcontextlost", i, !1), e.addEventListener("webglcontextrestored", r, !1), this.recoveryHandlers = {
      canvas: e,
      onVisibilityChange: t,
      onWindowFocus: s,
      onContextLost: i,
      onContextRestored: r
    };
  }
  queueRecovery(e, { forceReload: t = !1, delayMs: s = 200 } = {}) {
    this.isDisposed || !this.config.enableAutoRecovery || (this.recoveryTimer && (clearTimeout(this.recoveryTimer), this.recoveryTimer = null), this.recoveryTimer = setTimeout(() => {
      this.recoveryTimer = null, this.tryRecoverFromInterruption(e, { forceReload: t });
    }, s));
  }
  async tryRecoverFromInterruption(e, { forceReload: t = !1 } = {}) {
    if (this.isDisposed || !this.config.enableAutoRecovery || typeof document < "u" && document.hidden) return;
    if (this.isLoading) {
      this.queueRecovery(e, { forceReload: !0, delayMs: 600 });
      return;
    }
    const s = Date.now();
    if (s - this.lastRecoveryAttemptAt < this.recoveryCooldownMs)
      return;
    this.lastRecoveryAttemptAt = s;
    const i = this.belowViewer?.getLoadedModels?.()?.length || 0;
    if (!(t || this.hadContextLoss || i === 0)) {
      this.forceRefreshFrame();
      return;
    }
    const n = Object.keys(this.config.models)[0], o = this.currentModelKey || this.lastRequestedModelKey || n;
    if (!o || !this.config.models[o]) {
      this.forceRefreshFrame();
      return;
    }
    if (this.recoveryAttempts += 1, this.updateStatus("Recovering viewer..."), await this.loadModel(o), (this.belowViewer?.getLoadedModels?.()?.length || 0) > 0) {
      this.hadContextLoss = !1, this.recoveryAttempts = 0, this.forceRefreshFrame(), this.emit("viewer-recovered", { reason: e, modelKey: o });
      return;
    }
    this.recoveryAttempts < this.maxRecoveryAttempts ? this.queueRecovery(e, {
      forceReload: !0,
      delayMs: 400 + this.recoveryAttempts * 300
    }) : this.updateStatus("Recovery failed. Try selecting the model again.");
  }
  forceRefreshFrame() {
    const e = this.belowViewer?.renderer, t = this.belowViewer?.sceneManager?.scene, s = this.belowViewer?.cameraManager?.camera;
    if (!(!e || !t || !s))
      try {
        const i = e.xr?.isPresenting;
        this.belowViewer?.stereoEnabled && !i && this.belowViewer?.stereoMode === "sbs" && typeof this.belowViewer.renderSbsStereo == "function" ? this.belowViewer.renderSbsStereo() : e.render(t, s);
      } catch {
      }
  }
  toggleFullscreen() {
    if (this.isFullscreen()) {
      const e = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
      e && e.call(document), this.updateFullscreenButton();
    } else {
      const e = this.container, t = e.requestFullscreen || e.webkitRequestFullscreen || e.msRequestFullscreen;
      t && t.call(e).catch((s) => console.error("[ModelViewer] Failed to enter fullscreen", s)), this.updateFullscreenButton();
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
  getScreenshotPixelRatio(e, t, s = {}) {
    const i = t.width > 0 ? e.width / t.width : 1, r = typeof window < "u" && window.devicePixelRatio || 1, n = s.minPixelRatio ?? 2, o = s.maxDimension ?? 8192, l = Math.max(n, r, i || 1), c = Math.min(
      o / Math.max(1, t.width),
      o / Math.max(1, t.height)
    );
    return Math.max(1, Math.min(l, c));
  }
  withScreenshotResolution(e, t = {}) {
    const s = this.belowViewer?.renderer, i = s?.domElement;
    if (!i)
      throw new Error("No canvas available for screenshot");
    const r = i.getBoundingClientRect();
    if (!r.width || !r.height)
      throw new Error("Viewer canvas is not visible");
    if (!s.setPixelRatio || !s.setSize)
      return this.forceRefreshFrame(), e(i, r);
    const n = s.getPixelRatio?.() || (r.width > 0 ? i.width / r.width : 1), o = this.getScreenshotPixelRatio(i, r, t), l = Math.max(1, Math.round(r.width)), c = Math.max(1, Math.round(r.height));
    if (!(Math.abs(o - n) > 0.01))
      return this.forceRefreshFrame(), e(i, r);
    s.setPixelRatio(o), s.setSize(l, c, !1), this.forceRefreshFrame();
    try {
      return e(i, r);
    } finally {
      s.setPixelRatio(n), s.setSize(l, c, !1), this.forceRefreshFrame();
    }
  }
  captureScreenshotCanvas(e = {}) {
    return this.withScreenshotResolution((t, s) => {
      const i = document.createElement("canvas");
      return i.width = t.width, i.height = t.height, i.getContext("2d").drawImage(t, 0, 0, i.width, i.height), {
        canvas: i,
        sourceRect: s,
        scaleX: i.width / s.width,
        scaleY: i.height / s.height
      };
    }, e);
  }
  /**
   * Captures a screenshot of the current 3D scene without UI overlays
   * 
   * The method temporarily renders at a high pixel ratio, validates the
   * resulting image data, and automatically downloads the screenshot as a PNG
   * file with a timestamp-based filename.
   * 
   * @method takeScreenshot
   * @throws {Error} Will log errors if canvas is unavailable or screenshot capture fails
   * @returns {void}
   * 
   * @example
   * // Programmatically capture a screenshot
   * viewer.takeScreenshot();
   * 
   * @since 1.0.0
   */
  takeScreenshot() {
    try {
      const t = this.captureScreenshotCanvas().canvas.toDataURL("image/png");
      if (t === "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==") {
        console.error("[ModelViewer] Screenshot captured empty canvas");
        return;
      }
      const s = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "").slice(0, -5), r = `${this.currentModelKey ? this.config.models[this.currentModelKey]?.name?.replace(/[^a-zA-Z0-9\-_]/g, "-") || this.currentModelKey.replace(/[^a-zA-Z0-9\-_]/g, "-") : "unknown"}-belowjs-${s}.png`, n = document.createElement("a");
      n.href = t, n.download = r, document.body.appendChild(n), n.click(), document.body.removeChild(n), console.log(`[ModelViewer] Screenshot saved as ${r}`);
    } catch (e) {
      console.error("[ModelViewer] Failed to capture screenshot", e);
    }
  }
  setupEventForwarding() {
    this.belowViewer.on("initialized", (e) => this.emit("initialized", e)), this.belowViewer.on("model-load-start", (e) => this.emit("model-load-start", e)), this.belowViewer.on("model-load-progress", (e) => {
      this.emit("model-load-progress", e), this.updateLoadingProgress(e);
    }), this.belowViewer.on("model-load-stage", (e) => {
      this.emit("model-load-stage", e), this.onModelLoadStage(e);
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
  onVRSessionStart() {
    if (this.flyControls && this.flyControls.exitFlyMode(), this.ui.info && (this.ui.info.style.display = "none"), this.isLoading && this.updateVRLoadingIndicator(), !this.vrUpdateLoop) {
      let e = 0;
      const t = (s) => {
        this.belowViewer && this.belowViewer.renderer && this.belowViewer.renderer.xr && this.belowViewer.renderer.xr.isPresenting ? (s - e > 100 && (this.vrLoadingSprite && this.belowViewer.sceneManager.scene.children.includes(this.vrLoadingSprite) && this.isLoading && this.positionVRLoadingSprite(), e = s), this.vrUpdateLoop = requestAnimationFrame(t)) : this.vrUpdateLoop = null;
      };
      this.vrUpdateLoop = requestAnimationFrame(t);
    }
    this.measurementSystem && typeof this.measurementSystem.attachVR == "function" && setTimeout(() => {
      const e = this.belowViewer?.renderer;
      if (e && e.xr && typeof e.xr.getController == "function") {
        const t = e.xr.getController(0), s = e.xr.getController(1), i = e.xr.getControllerGrip ? e.xr.getControllerGrip(0) : void 0, r = e.xr.getControllerGrip ? e.xr.getControllerGrip(1) : void 0;
        this.measurementSystem.attachVR({ controller1: t, controller2: s, controllerGrip1: i, controllerGrip2: r }), this.measurementSystem.resetGhostSpherePositions();
      }
    }, 100);
  }
  onVRSessionEnd() {
    this.ui.info && this.config.showInfo && (this.ui.info.style.display = "block"), this.ui.selector && (this.ui.selector.style.pointerEvents = "auto", this.ui.selector.style.opacity = "1"), this.vrUpdateLoop && (cancelAnimationFrame(this.vrUpdateLoop), this.vrUpdateLoop = null), this.updateVRLoadingIndicator(), this.measurementSystem && (this.measurementSystem.controller1 = null, this.measurementSystem.controller2 = null, this.measurementSystem.controllerGrip1 = null, this.measurementSystem.controllerGrip2 = null, this.measurementSystem.isVR = !1, this.measurementSystem.ghostSpheres && (this.measurementSystem.ghostSpheres.left && (this.measurementSystem.ghostSpheres.left.visible = !1), this.measurementSystem.ghostSpheres.right && (this.measurementSystem.ghostSpheres.right.visible = !1)));
  }
  onVRModeToggle() {
  }
  setupFocusInteraction() {
    const e = this.belowViewer.renderer.domElement, t = 300;
    let s = 0, i = !1;
    const r = { x: 0, y: 0 }, n = 5, o = (h) => {
      i = !1, r.x = h.clientX, r.y = h.clientY;
    }, l = (h) => {
      if (!i) {
        const d = Math.abs(h.clientX - r.x), u = Math.abs(h.clientY - r.y);
        (d > n || u > n) && (i = !0);
      }
    }, c = () => {
      setTimeout(() => {
        i = !1;
      }, 10);
    }, A = (h) => {
      const d = Date.now(), u = d - s < t;
      s = d, !(this.belowViewer.renderer.xr?.isPresenting || i) && (this.measurementSystem && this.measurementSystem.desktopMeasurementMode || u && this.focusOnPoint(h));
    };
    e.addEventListener("mousedown", o), e.addEventListener("mousemove", l), e.addEventListener("mouseup", c), e.addEventListener("click", A), this.focusEventHandlers = {
      onMouseDown: o,
      onMouseMove: l,
      onMouseUp: c,
      onMouseClick: A
    };
  }
  getPointerRaycastInfo(e) {
    if (!e || typeof e.clientX != "number" || typeof e.clientY != "number" || !this.belowViewer || !this.belowViewer.renderer || !this.belowViewer.cameraManager || this.belowViewer.renderer.xr?.isPresenting)
      return null;
    const s = this.belowViewer.renderer.domElement.getBoundingClientRect();
    if (!s.width || !s.height)
      return null;
    const i = e.clientX - s.left, r = e.clientY - s.top;
    if (!Number.isFinite(i) || !Number.isFinite(r))
      return null;
    const n = this.belowViewer.cameraManager.getCamera();
    let o = n, l = i / s.width * 2 - 1;
    const c = -(r / s.height * 2 - 1), A = this.belowViewer.getStereoSettings?.();
    if (A?.enabled === !0 && A?.mode === "sbs" && this.belowViewer.stereoCamera) {
      const h = this.belowViewer.stereoCamera, d = s.width / 2, u = i <= d, p = u ? d : s.width - d, g = u ? i : i - d;
      p > 0 && (l = g / p * 2 - 1), h.aspect = s.height > 0 ? d / s.height : 1, h.update(n), o = u ? h.cameraL : h.cameraR;
    }
    return {
      mouse: { x: l, y: c },
      camera: o
    };
  }
  focusOnPoint(e) {
    const t = this.getPointerRaycastInfo(e), s = t?.mouse, i = t?.camera;
    if (!s || !i)
      return;
    const r = new f.Raycaster();
    r.setFromCamera(s, i);
    let n = [];
    if (this.measurementSystem && this.measurementSystem._raycastTargets && this.measurementSystem._raycastTargets.length > 0)
      n = this.measurementSystem._raycastTargets;
    else {
      const l = this.belowViewer.sceneManager.getScene();
      n = [], l.traverse((c) => {
        c.isMesh && c.geometry && !this.isMeasurementHelper(c) && n.push(c);
      });
    }
    if (n.length === 0)
      return;
    const o = r.intersectObjects(n, !0);
    if (o.length > 0) {
      const l = o[0].point;
      this.belowViewer.cameraManager.focusOn(l), this.emit("focus", { point: l, intersect: o[0] });
    }
  }
  isMeasurementHelper(e) {
    if (!e) return !1;
    if (e.userData.isMeasurementSphere || e.userData.isMeasurementLine || e.type === "Line2" || e.type === "Line") return !0;
    if (e.geometry && ["RingGeometry", "TubeGeometry", "PlaneGeometry", "CircleGeometry", "SphereGeometry"].includes(e.geometry.type))
      if (e.geometry.type === "SphereGeometry") {
        const s = e.geometry;
        if (s.parameters && s.parameters.radius < 0.1) return !0;
      } else
        return !0;
    return !!(typeof e.name == "string" && (e.name.startsWith("MeasurementHelper") || e.name.includes("measurement") || e.name.includes("ghost")));
  }
  createUI() {
    this.container === document.body ? document.documentElement.classList.add("below-viewer") : this.container.classList.add("below-viewer-container"), this.ensureUiRoot();
    const e = Object.keys(this.config.models).length;
    e > 1 && !this.ui.dropdown && this.createModelSelector(), this.config.enableDiveSystem && this.config.showDiveToggle && e <= 1 && !this.ui.diveToggle && this.createDiveModeToggle(), this.config.showInfo && !this.ui.info && this.createInfoPanel(), this.config.showLoadingIndicator && !this.ui.loading && this.createLoadingIndicator(), this.config.showStatus && !this.ui.status && this.createStatusIndicator(), this.ui.dropdown && this.ui.dropdown.addEventListener("change", (t) => {
      const s = t.target.value;
      s && (this.releaseModelSelectorInteraction(t), this.loadModel(s));
    });
  }
  focusRendererCanvas() {
    const e = this.belowViewer?.renderer?.domElement;
    e && (e.hasAttribute("tabindex") || (e.tabIndex = -1), e.focus?.({ preventScroll: !0 }));
  }
  releaseModelSelectorInteraction(e = {}) {
    const t = e.target?.closest?.(".model-selector__dropdown") || this.ui.dropdown;
    t && t.blur(), this.focusRendererCanvas();
  }
  settleControlsAfterModelSwitch() {
    this.releaseModelSelectorInteraction();
    const e = this.belowViewer?.cameraManager?.getControls?.();
    e && (e.enabled = !0, this.belowViewer?.cameraManager?.resetControlInteractionState?.(), e.update?.()), requestAnimationFrame(() => {
      this.releaseModelSelectorInteraction(), this.belowViewer?.cameraManager?.resetControlInteractionState?.(), e?.update?.();
    });
  }
  ensureUiRoot() {
    if (this.uiRoot)
      return this.uiRoot;
    const e = document.createElement("div");
    return e.className = "below-ui-root", this.container.appendChild(e), this.uiRoot = e, this.applyStereoUiState(), e;
  }
  getUiContainer() {
    return this.ensureUiRoot();
  }
  applyStereoUiState() {
    const e = this.belowViewer?.getStereoSettings?.(), t = e?.enabled === !0 && e?.mode === "sbs";
    this.uiRoot && (t ? this.enableStereoUi() : this.disableStereoUi());
  }
  updateStereoUiState() {
    this.applyStereoUiState();
  }
  enableStereoUi() {
    if (this.stereoUiActive) {
      this.scheduleStereoUiSync();
      return;
    }
    if (this.stereoUiActive = !0, this.uiRoot.classList.add("below-ui-root--stereo-left"), !this.stereoUiMirror) {
      const e = document.createElement("div");
      e.className = "below-ui-root below-ui-root--stereo-right", e.setAttribute("aria-hidden", "true"), e.setAttribute("inert", ""), e.tabIndex = -1, e.style.pointerEvents = "none", this.container.appendChild(e), this.stereoUiMirror = e;
    }
    this.scheduleStereoUiSync(), !this.stereoUiObserver && typeof MutationObserver < "u" && (this.stereoUiObserver = new MutationObserver(() => this.scheduleStereoUiSync()), this.stereoUiObserver.observe(this.uiRoot, {
      childList: !0,
      attributes: !0,
      characterData: !0,
      subtree: !0
    }));
  }
  disableStereoUi() {
    this.stereoUiActive && (this.stereoUiActive = !1, this.uiRoot.classList.remove("below-ui-root--stereo-left"), this.stereoUiObserver && (this.stereoUiObserver.disconnect(), this.stereoUiObserver = null), this.stereoUiMirror && (this.stereoUiMirror.remove(), this.stereoUiMirror = null));
  }
  scheduleStereoUiSync() {
    if (this.stereoUiSyncQueued || !this.stereoUiMirror)
      return;
    this.stereoUiSyncQueued = !0, (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (t) => setTimeout(t, 0))(() => {
      this.stereoUiSyncQueued = !1, this.syncStereoUiMirror();
    });
  }
  syncStereoUiMirror() {
    if (!(!this.stereoUiMirror || !this.uiRoot)) {
      this.stereoUiMirror.innerHTML = "";
      for (const e of this.uiRoot.childNodes) {
        const t = e.cloneNode(!0);
        this.stripStereoCloneIds(t), this.stereoUiMirror.appendChild(t);
      }
    }
  }
  stripStereoCloneIds(e) {
    if (!(!e || e.nodeType !== 1)) {
      e.hasAttribute("id") && e.removeAttribute("id"), e.hasAttribute("for") && e.removeAttribute("for");
      for (const t of e.children)
        this.stripStereoCloneIds(t);
    }
  }
  createModelSelector() {
    const e = this.getUiContainer(), t = e.querySelector(".model-selector");
    t && t.parentElement && t.remove();
    const s = document.createElement("div");
    s.className = "model-selector below-panel", e.appendChild(s);
    const i = document.createElement("select");
    if (i.className = "model-selector__dropdown", s.appendChild(i), this.config.enableDiveSystem) {
      const r = document.createElement("div");
      r.id = "modeToggleContainer";
      const n = document.createElement("div");
      n.className = "semantic-toggle";
      const o = document.createElement("input");
      o.type = "checkbox", o.id = "modeToggleSwitch", o.className = "mode-toggle__switch", n.appendChild(o);
      const l = document.createElement("div");
      l.className = "toggle-slider-bg", n.appendChild(l);
      const c = document.createElement("div");
      c.className = "toggle-option left";
      const A = document.createElement("div");
      A.className = "toggle-icon", A.textContent = "📋";
      const h = document.createElement("div");
      h.className = "toggle-text", h.textContent = "Survey", c.appendChild(A), c.appendChild(h);
      const d = document.createElement("div");
      d.className = "toggle-option right";
      const u = document.createElement("div");
      u.className = "toggle-icon", u.textContent = "🌊";
      const p = document.createElement("div");
      p.className = "toggle-text", p.textContent = "Dive", d.appendChild(u), d.appendChild(p), n.appendChild(c), n.appendChild(d), r.appendChild(n), s.appendChild(r);
    }
    this.ui.dropdown = i, this.ui.selector = s;
  }
  createDiveModeToggle() {
    const e = document.createElement("div");
    e.className = "dive-mode-toggle-container", e.style.position = "absolute", e.style.top = "20px", e.style.right = "20px", e.style.zIndex = "1000";
    const t = document.createElement("div");
    t.className = "semantic-toggle";
    const s = document.createElement("input");
    s.type = "checkbox", s.id = "modeToggleSwitch", s.className = "mode-toggle__switch", t.appendChild(s);
    const i = document.createElement("div");
    i.className = "toggle-slider-bg", t.appendChild(i);
    const r = document.createElement("div");
    r.className = "toggle-option left";
    const n = document.createElement("div");
    n.className = "toggle-icon", n.textContent = "📋";
    const o = document.createElement("div");
    o.className = "toggle-text", o.textContent = "Survey", r.appendChild(n), r.appendChild(o);
    const l = document.createElement("div");
    l.className = "toggle-option right";
    const c = document.createElement("div");
    c.className = "toggle-icon", c.textContent = "🌊";
    const A = document.createElement("div");
    A.className = "toggle-text", A.textContent = "Dive", l.appendChild(c), l.appendChild(A), t.appendChild(r), t.appendChild(l), e.appendChild(t), this.getUiContainer().appendChild(e), this.ui.diveToggle = e;
  }
  createLoadingIndicator() {
    const e = document.createElement("div");
    e.className = "loading-indicator below-loading", this.config.measurementTheme === "light" && e.classList.add("light-theme"), e.style.display = "none", e.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner-circle">
          <div class="spinner-path"></div>
        </div>
        <div class="spinner-percentage">0%</div>
      </div>
      <div class="loading-content">
        <div class="loading-model-name">Loading Model</div>
        <div class="loading-status">Initializing...</div>
      </div>
    `, this.getUiContainer().appendChild(e), this.ui.loading = e;
  }
  /**
   * Create VR loading indicator as a canvas-based sprite
   * Similar to measurement labels, this creates a world-space UI element for VR
   */
  createVRLoadingIndicator(e = "Loading...", t = "", s = 0) {
    const i = (window.devicePixelRatio || 1) * 2, r = 512, n = 256, o = r * i, l = n * i;
    this.vrLoadingCanvas || (this.vrLoadingCanvas = document.createElement("canvas")), (this.vrLoadingCanvas.width !== o || this.vrLoadingCanvas.height !== l) && (this.vrLoadingCanvas.width = o, this.vrLoadingCanvas.height = l);
    const c = this.vrLoadingCanvas.getContext("2d");
    c.setTransform(1, 0, 0, 1, 0, 0), c.clearRect(0, 0, o, l), c.save(), c.scale(i, i);
    const A = r / 2, h = n / 2, d = 25, u = h - 40;
    if (c.shadowColor = "rgba(0, 0, 0, 0.8)", c.shadowBlur = 3, c.strokeStyle = "rgba(255, 255, 255, 0.3)", c.lineWidth = 3, c.beginPath(), c.arc(A, u, d, 0, Math.PI * 2), c.stroke(), c.shadowColor = "transparent", c.shadowBlur = 0, s > 0) {
      const p = s / 100 * Math.PI * 2;
      c.strokeStyle = "#ffffff", c.lineWidth = 3, c.beginPath(), c.arc(A, u, d, -Math.PI / 2, -Math.PI / 2 + p), c.stroke();
    }
    if (c.fillStyle = "white", c.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', c.textAlign = "center", c.textBaseline = "middle", c.shadowColor = "rgba(0, 0, 0, 0.8)", c.shadowBlur = 2, c.shadowOffsetX = 1, c.shadowOffsetY = 1, c.fillText(`${Math.round(s)}%`, A, u), t && (c.fillStyle = "white", c.font = '600 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', c.textAlign = "center", c.textBaseline = "middle", c.shadowColor = "rgba(0, 0, 0, 0.8)", c.shadowBlur = 4, c.shadowOffsetX = 1, c.shadowOffsetY = 1, c.fillText(t, A, h + 20)), c.fillStyle = "rgba(255, 255, 255, 0.9)", c.font = '400 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', c.shadowColor = "rgba(0, 0, 0, 0.8)", c.shadowBlur = 3, c.shadowOffsetX = 1, c.shadowOffsetY = 1, c.fillText(e, A, h + 50), c.restore(), this.vrLoadingTexture ? this.vrLoadingTexture.needsUpdate = !0 : (this.vrLoadingTexture = new f.CanvasTexture(this.vrLoadingCanvas), this.vrLoadingTexture.minFilter = f.LinearFilter, this.vrLoadingTexture.magFilter = f.LinearFilter), !this.vrLoadingSprite) {
      const p = new f.SpriteMaterial({
        map: this.vrLoadingTexture,
        depthTest: !1,
        depthWrite: !1,
        transparent: !0
      });
      this.vrLoadingSprite = new f.Sprite(p);
      const g = 0.7, b = r / n;
      this.vrLoadingSprite.scale.set(g * b, g, 1);
    }
    return this.vrLoadingSprite;
  }
  createStatusIndicator() {
    const e = document.createElement("div");
    e.id = "status", e.className = "status below-status", e.style.display = "none", this.getUiContainer().appendChild(e), this.ui.status = e;
  }
  createInfoPanel() {
    const e = document.createElement("div");
    e.id = "info", e.className = "below-panel info-panel";
    const t = document.createElement("div");
    t.id = "infoTitle", t.className = "info-panel__title", t.textContent = "BelowJS";
    const s = document.createElement("div");
    s.id = "infoControls", s.className = "info-panel__controls", s.innerHTML = `
      <strong>Desktop:</strong> Drag to rotate • Scroll to zoom<br>
      <strong>Mobile:</strong> Touch and drag to explore
    `, e.appendChild(t), e.appendChild(s), this.getUiContainer().appendChild(e), this.ui.info = e;
  }
  populateDropdown() {
    if (!this.ui.dropdown) return;
    this.ui.dropdown.innerHTML = "";
    const e = document.createElement("option");
    e.value = "", e.textContent = "Select a Model", e.disabled = !0, e.selected = !0, this.ui.dropdown.appendChild(e), Object.entries(this.config.models).forEach(([t, s]) => {
      const i = document.createElement("option");
      i.value = t, i.textContent = s.name || t, this.ui.dropdown.appendChild(i);
    });
  }
  /**
   * Load a model by its key
   * 
   * @async
   * @method loadModel
   * @param {string} modelKey - The key of the model to load (must exist in config.models)
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
    const t = this.config.models[e];
    if (!t) {
      console.error("Model not found:", e);
      return;
    }
    this.lastRequestedModelKey = e, this.currentModelKey = e, this.hadContextLoss = !1, this.recoveryTimer && (clearTimeout(this.recoveryTimer), this.recoveryTimer = null), this.ui.dropdown && (this.ui.dropdown.value = e), this.showLoading("Preparing to load...", t.name || e), this.belowViewer?.getLoadedModels()?.length > 0 && this.setManualLoadingMessage("Cleaning up previous model..."), document.title = `BelowJS – ${t.name || e}`;
    try {
      this.measurementSystem && (this.measurementSystem.clearUnifiedMeasurement(), this.measurementSystem.clearLegacyVRMeasurement(), this.measurementSystem.clearLegacyDesktopMeasurement()), this.belowViewer.clearModels(), this.belowViewer.cameraManager?.resetControlInteractionState?.(), this.belowViewer.vrManager && (this.belowViewer.vrManager.stopMovement(), this.belowViewer.vrManager.resetTeleportState()), await new Promise((n) => setTimeout(n, 50));
      const r = await this.belowViewer.loadModel(t.url, {
        autoFrame: !1,
        // We'll handle positioning manually
        initialPositions: t.initialPositions,
        // Pass VR/desktop positions
        position: t.position,
        rotation: t.rotation,
        scale: t.scale,
        type: t.type,
        errorTarget: t.errorTarget,
        maxDepth: t.maxDepth,
        loadSiblings: t.loadSiblings,
        loadAncestors: t.loadAncestors,
        optimizedLoadStrategy: t.optimizedLoadStrategy,
        maxTilesProcessed: t.maxTilesProcessed,
        ktxWorkerLimit: t.ktxWorkerLimit,
        fetchOptions: t.fetchOptions,
        up: t.up,
        geospatialReorientation: t.geospatialReorientation,
        autoCenter: t.autoCenter,
        maxTriangles: t.maxTriangles,
        vrMaxTriangles: t.vrMaxTriangles,
        vrPerformanceProfile: t.vrPerformanceProfile,
        minErrorTarget: t.minErrorTarget,
        maxErrorTarget: t.maxErrorTarget,
        tileCastShadow: t.tileCastShadow,
        tileReceiveShadow: t.tileReceiveShadow,
        tileLighting: t.tileLighting,
        vrShadowCasterMode: t.vrShadowCasterMode,
        vrMaxShadowCastingTiles: t.vrMaxShadowCastingTiles,
        vrShadowCasterRadius: t.vrShadowCasterRadius,
        shadowCasterUpdateIntervalMs: t.shadowCasterUpdateIntervalMs,
        idleGating: t.idleGating,
        idlePositionEpsilon: t.idlePositionEpsilon,
        idleAngleEpsilon: t.idleAngleEpsilon,
        idleHeartbeatMs: t.idleHeartbeatMs,
        vrErrorTargetFloor: t.vrErrorTargetFloor,
        vrMaxDepth: t.vrMaxDepth,
        usePerEyeCameras: t.usePerEyeCameras,
        boundsUpdateIntervalMs: t.boundsUpdateIntervalMs,
        enableGltfExtensions: t.enableGltfExtensions,
        assetBasePath: t.assetBasePath,
        dracoDecoderPath: t.dracoDecoderPath,
        ktx2TranscoderPath: t.ktx2TranscoderPath
      });
      if (r) {
        const n = !!t.initialPositions?.desktop;
        this.applyInitialPositions(t, r), this.belowViewer.cameraManager?.resetControlInteractionState?.(), t.type === "tileset" && !n && !this.belowViewer.isVRPresenting() && this.belowViewer.frameModel(r), this.hideLoading(), this.updateStatus(`Loaded: ${t.name || e}`), this.applyModelMeasurementConfig(t, r), this.modelReady = !0, this.recoveryAttempts = 0, this.settleControlsAfterModelSwitch(), this.emit("model-switched", { modelKey: e, model: r, config: t }), this.emit("modelLoaded", { modelKey: e, model: r, config: t });
      } else this.currentModelKey === e && this.queueRecovery("empty-load-result", { forceReload: !0, delayMs: 350 });
    } catch (r) {
      r.message !== "Loading cancelled" && (console.error("Failed to load model:", r), this.hideLoading(), this.updateStatus(`Error loading ${t.name || e}`), this.applyModelMeasurementConfig(t, null), this.currentModelKey === e && (typeof document > "u" || !document.hidden) && this.queueRecovery("model-load-error", { forceReload: !0, delayMs: 500 }));
    }
  }
  applyInitialPositions(e, t) {
    const s = e.initialPositions;
    if (!s) return;
    const i = this.belowViewer.getVRManager();
    i && i.setInitialPositions(s);
    const r = this.belowViewer.isVRPresenting();
    if (r && s.vr) {
      const n = this.belowViewer.getCamera().parent;
      n && (n.position.set(
        s.vr.dolly.x,
        s.vr.dolly.y,
        s.vr.dolly.z
      ), n.rotation.set(
        s.vr.rotation.x,
        s.vr.rotation.y,
        s.vr.rotation.z
      ));
    } else if (!r && s.desktop) {
      const n = this.belowViewer.getCamera(), o = this.belowViewer.cameraManager.controls;
      n && o && (n.position.set(
        s.desktop.camera.x,
        s.desktop.camera.y,
        s.desktop.camera.z
      ), o.target.set(
        s.desktop.target.x,
        s.desktop.target.y,
        s.desktop.target.z
      ), o.update());
    }
  }
  showLoading(e = "Loading...", t = null) {
    if (this.isLoading = !0, this.loadingModelName = t || "", this.loadingPercentage = 0, this.setManualLoadingMessage(e), this.lastManualLoadingMessage = e || "", this.ui.loading) {
      const s = this.ui.loading.querySelector(".loading-status"), i = this.ui.loading.querySelector(".loading-model-name"), r = this.ui.loading.querySelector(".spinner-percentage");
      s && (s.textContent = e), i && t && (i.textContent = t), r && (r.textContent = "0%"), this.ui.loading.style.display = "flex";
    }
    this.updateVRLoadingIndicator();
  }
  /**
   * Show VR loading sprite in the scene
   */
  showVRLoadingSprite() {
    !this.vrLoadingSprite || !this.belowViewer?.sceneManager || (this.positionVRLoadingSprite(), this.belowViewer.sceneManager.scene.children.includes(this.vrLoadingSprite) && this.belowViewer.sceneManager.scene.remove(this.vrLoadingSprite), this.belowViewer.sceneManager.scene.add(this.vrLoadingSprite));
  }
  /**
   * Update VR loading indicator based on current state
   */
  updateVRLoadingIndicator() {
    const e = this.belowViewer && this.belowViewer.renderer && this.belowViewer.renderer.xr && this.belowViewer.renderer.xr.isPresenting;
    this.isLoading && e ? (this.createVRLoadingIndicator(this.loadingMessage, this.loadingModelName, this.loadingPercentage), this.showVRLoadingSprite()) : this.vrLoadingSprite && this.belowViewer?.sceneManager && this.belowViewer.sceneManager.scene.remove(this.vrLoadingSprite);
  }
  hideLoading() {
    this.isLoading = !1, this.loadingMessage = "", this.loadingModelName = "", this.loadingPercentage = 0, this.ui.loading && (this.ui.loading.style.display = "none"), this.vrLoadingSprite && this.belowViewer && this.belowViewer.sceneManager && (this.belowViewer.sceneManager.scene.remove(this.vrLoadingSprite), this.vrLoadingSprite.position.set(0, 0, 0), this.vrLoadingSprite.rotation.set(0, 0, 0));
  }
  setManualLoadingMessage(e) {
    this.lastManualLoadingMessage = e || "", this.stageOverrideActive = !1, this.updateLoadingText(e);
  }
  setStageLoadingMessage(e) {
    this.stageOverrideActive = !0, this.updateLoadingText(e);
  }
  restoreManualLoadingMessage() {
    if (!this.lastManualLoadingMessage) {
      this.stageOverrideActive = !1;
      return;
    }
    this.stageOverrideActive = !1, this.updateLoadingText(this.lastManualLoadingMessage);
  }
  updateLoadingText(e) {
    if (this.loadingMessage = e || "", this.ui.loading) {
      const t = this.ui.loading.querySelector(".loading-status");
      t && (t.textContent = this.loadingMessage);
    }
    this.updateVRLoadingIndicator();
  }
  /**
   * Position VR loading sprite in front of user's view
   */
  positionVRLoadingSprite() {
    if (!this.vrLoadingSprite || !this.belowViewer || !this.belowViewer.cameraManager)
      return;
    const e = this.belowViewer.cameraManager.camera, t = 2, s = new f.Vector3();
    e.getWorldDirection(s);
    const i = new f.Vector3();
    e.getWorldPosition(i);
    const r = new f.Vector3();
    r.copy(i), r.add(s.multiplyScalar(t)), this.vrLoadingSprite.position.copy(r), this.vrLoadingSprite.lookAt(i);
  }
  updateStatus(e) {
    this.ui.status && (this.ui.status.textContent = e, this.ui.status.style.display = "block");
  }
  updateLoadingProgress({ progress: e }) {
    if (e.lengthComputable && this.currentModelKey) {
      const t = Math.min(100, Math.round(e.loaded / e.total * 100));
      if (this.loadingPercentage = t, this.stageOverrideActive || this.setManualLoadingMessage("Loading model"), this.ui.loading) {
        const s = this.ui.loading.querySelector(".spinner-percentage"), i = this.ui.loading.querySelector(".spinner-path");
        if (s && (s.textContent = `${t}%`), i) {
          const r = 2 * Math.PI * 20, n = r - t / 100 * r;
          i.style.strokeDashoffset = n;
        }
      }
      this.updateVRLoadingIndicator();
    }
  }
  onModelLoaded({ model: e }) {
    const t = this.currentModelKey ? this.config.models[this.currentModelKey] : null;
    this.applyModelMeasurementConfig(t, e), this.flyControls && this.flyControls.setModelSizeFromObject(e);
  }
  onModelLoadError({ error: e }) {
    this.hideLoading(), this.updateStatus(`Failed to load model: ${e.message}`);
  }
  onModelLoadStage({ stage: e }) {
    if (!this.isLoading) return;
    const t = {
      downloading: "Downloading model...",
      "freeing-resources": "Freeing GPU memory...",
      cloning: "Fetching from cache...",
      processing: "Uploading textures... almost there",
      finalizing: "Finalizing view..."
    };
    t[e] ? this.setStageLoadingMessage(t[e]) : e === "completed" && this.restoreManualLoadingMessage();
  }
  /**
   * Get the currently loaded model object
   * 
   * @method getCurrentModel
   * @returns {THREE.Object3D|null} The current Three.js model object or null if none loaded
   * 
   * @example
   * const model = viewer.getCurrentModel();
   * if (model) {
   *   // Inspect model properties and children
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
   * const camera = viewer.getCamera();
   * if (camera) {
   *   // Access camera.position, camera.rotation, etc.
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
    this.belowViewer?.cameraManager && (this.belowViewer.cameraManager.focusOn(e, t), this.emit("focus", { point: e, distance: t }));
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
    if (this.currentModelKey && this.belowViewer) {
      const t = this.config.models[this.currentModelKey]?.initialPositions?.desktop;
      if (t) {
        const s = this.belowViewer.cameraManager.getCamera(), i = this.belowViewer.cameraManager.getControls();
        t.camera && s.position.set(t.camera.x, t.camera.y, t.camera.z), t.target && i && (i.target.set(t.target.x, t.target.y, t.target.z), i.update()), this.emit("camera-reset", { modelKey: this.currentModelKey, position: t });
      }
    }
  }
  /**
   * Enable or disable fly controls.
   *
   * @method setFlyControlsEnabled
   * @param {boolean} enabled - Whether fly controls should be enabled
   */
  setFlyControlsEnabled(e) {
    this.flyControls && this.flyControls.setEnabled(e);
  }
  /**
   * Enter fly mode (pointer lock).
   *
   * @method enterFlyMode
   */
  enterFlyMode() {
    this.flyControls && this.flyControls.enterFlyMode();
  }
  /**
   * Exit fly mode (pointer lock).
   *
   * @method exitFlyMode
   */
  exitFlyMode() {
    this.flyControls && this.flyControls.exitFlyMode();
  }
  /**
   * Toggle fly mode (pointer lock).
   *
   * @method toggleFlyMode
   */
  toggleFlyMode() {
    this.flyControls && this.flyControls.toggleFlyMode();
  }
  /**
   * Enable or disable slow fly movement.
   *
   * @method setFlySlowMode
   * @param {boolean} enabled - Whether fly mode movement should use slow speed
   */
  setFlySlowMode(e) {
    this.flyControls?.setSlowMode && this.flyControls.setSlowMode(e);
  }
  /**
   * Toggle slow fly movement.
   *
   * @method toggleFlySlowMode
   */
  toggleFlySlowMode() {
    this.flyControls?.toggleSlowMode && this.flyControls.toggleSlowMode();
  }
  /**
   * Check if slow fly movement is currently enabled.
   *
   * @method isFlySlowMode
   * @returns {boolean} True if slow fly mode is enabled
   */
  isFlySlowMode() {
    return this.flyControls?.isSlowMode ? this.flyControls.isSlowMode() : !1;
  }
  /**
   * Check if fly mode is currently active.
   *
   * @method isFlyModeActive
   * @returns {boolean} True if fly mode is active
   */
  isFlyModeActive() {
    return this.flyControls ? this.flyControls.isActive() : !1;
  }
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
    const t = e === "comfort", s = e === "free", i = this.belowViewer && this.belowViewer.setVRComfortPreset ? this.belowViewer.setVRComfortPreset(e) : !1;
    return (t || s) && (this.lastComfortMode = t, this.comfortGlyph && this.comfortGlyph.setComfortMode(t, {
      emitEvent: !1,
      applyToManager: !1
    })), i;
  }
  /**
   * Enable or disable comfort mode.
   *
   * Works both inside and outside active VR sessions.
   *
   * @param {boolean} enabled
   * @returns {boolean}
   */
  setComfortMode(e) {
    const t = e === !0, s = this.belowViewer && this.belowViewer.setVRComfortMode ? this.belowViewer.setVRComfortMode(t) : !1;
    return this.lastComfortMode = t, this.comfortGlyph && this.comfortGlyph.setComfortMode(t, {
      emitEvent: !1,
      applyToManager: !1
    }), s;
  }
  /**
   * Toggle comfort mode.
   *
   * Works both inside and outside active VR sessions.
   *
   * @returns {boolean} New comfort mode state
   */
  toggleComfortMode() {
    const e = !this.getComfortMode();
    return this.setComfortMode(e), e;
  }
  /**
   * Check current comfort mode state.
   *
   * @returns {boolean}
   */
  getComfortMode() {
    if (typeof this.lastComfortMode == "boolean")
      return this.lastComfortMode;
    const e = this.getVRComfortSettings();
    return e ? e.locomotionMode === "teleport" && e.reducedMotion === !0 : !1;
  }
  /**
   * Get current VR comfort settings
   * 
   * @method getVRComfortSettings
   * @returns {Object|null} Current VR comfort settings or null if not available
   * 
   * @example
   * const settings = viewer.getVRComfortSettings();
   * // Check settings?.enableComfort
   * 
   * @since 1.0.0
   */
  getVRComfortSettings() {
    return this.belowViewer && this.belowViewer.getVRComfortSettings ? this.belowViewer.getVRComfortSettings() : null;
  }
  /**
   * Enable or disable SBS stereo rendering.
   *
   * @param {boolean} enabled - Whether stereo rendering is enabled.
   */
  setStereoEnabled(e) {
    this.belowViewer && this.belowViewer.setStereoEnabled && this.belowViewer.setStereoEnabled(e), this.updateStereoUiState();
  }
  /**
   * Adjust the SBS stereo eye separation.
   *
   * @param {number} eyeSeparation - Eye separation in meters.
   */
  setStereoEyeSeparation(e) {
    this.belowViewer && this.belowViewer.setStereoEyeSeparation && this.belowViewer.setStereoEyeSeparation(e);
  }
  /**
   * Set the stereo mode (currently only 'sbs').
   *
   * @param {string} mode - Stereo mode string.
   */
  setStereoMode(e) {
    this.belowViewer && this.belowViewer.setStereoMode && this.belowViewer.setStereoMode(e), this.updateStereoUiState();
  }
  /**
   * Get current stereo settings.
   *
   * @returns {{enabled: boolean, mode: string, eyeSeparation: number}|null}
   */
  getStereoSettings() {
    return this.belowViewer && this.belowViewer.getStereoSettings ? this.belowViewer.getStereoSettings() : null;
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
    if (this.isDisposed = !0, this.recoveryTimer && (clearTimeout(this.recoveryTimer), this.recoveryTimer = null), this.recoveryHandlers) {
      const { canvas: e, onVisibilityChange: t, onWindowFocus: s, onContextLost: i, onContextRestored: r } = this.recoveryHandlers;
      typeof document < "u" && t && document.removeEventListener("visibilitychange", t), typeof window < "u" && s && window.removeEventListener("focus", s), e && i && e.removeEventListener("webglcontextlost", i, !1), e && r && e.removeEventListener("webglcontextrestored", r, !1), this.recoveryHandlers = null;
    }
    if (typeof window < "u" && window.modelViewer === this && (window.modelViewer = null), this.focusEventHandlers && this.belowViewer?.renderer?.domElement) {
      const e = this.belowViewer.renderer.domElement;
      e.removeEventListener("mousedown", this.focusEventHandlers.onMouseDown), e.removeEventListener("mousemove", this.focusEventHandlers.onMouseMove), e.removeEventListener("mouseup", this.focusEventHandlers.onMouseUp), e.removeEventListener("click", this.focusEventHandlers.onMouseClick), this.focusEventHandlers = null;
    }
    this.measurementSystem && (this.measurementSystem.dispose(), this.measurementSystem = null), this.comfortGlyph && (this.comfortGlyph.dispose(), this.comfortGlyph = null), this.diveSystem && (this.diveSystem.dispose(), this.diveSystem = null, typeof window < "u" && window.diveSystem === this.diveSystem && (window.diveSystem = null)), this.fullscreenButton && (this.fullscreenButton.remove(), this.fullscreenButton = null, document.removeEventListener("fullscreenchange", this._onFullscreenChange)), this.screenshotButton && (this.screenshotButton.remove(), this.screenshotButton = null), this.stereoUiObserver && (this.stereoUiObserver.disconnect(), this.stereoUiObserver = null), this.stereoUiMirror && (this.stereoUiMirror.remove(), this.stereoUiMirror = null), this.belowViewer && this.belowViewer.dispose(), this.removeAllListeners();
  }
}
export {
  mh as BelowViewer,
  na as Camera,
  ls as ConfigValidator,
  It as EventSystem,
  Mh as FlyControls,
  Ur as Line2,
  oi as LineGeometry,
  ts as LineMaterial,
  ee as ModelLoader,
  ai as ModelViewer,
  fh as PerfMonitor,
  qo as Scene,
  ah as VRManager,
  Gc as applyTilesetVRProfileDefaults,
  Uc as applyVRRenderProfileDefaults,
  _c as detectXRPerformanceClass,
  Hn as resolveXRPerformanceProfile
};
