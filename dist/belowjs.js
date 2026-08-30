import * as m from "three";
import { Controls as fo, Vector3 as R, MOUSE as et, TOUCH as Xe, Quaternion as st, Spherical as ss, Vector2 as V, Ray as di, Plane as or, MathUtils as rt, TrianglesDrawMode as mo, TriangleFanDrawMode as ns, TriangleStripDrawMode as ar, Loader as ws, LoaderUtils as vt, FileLoader as Le, MeshPhysicalMaterial as ge, Color as Me, LinearSRGBColorSpace as ue, SRGBColorSpace as Se, SpotLight as go, PointLight as bo, DirectionalLight as yo, Matrix4 as G, InstancedMesh as vs, InstancedBufferAttribute as Co, Object3D as ui, TextureLoader as Eo, ImageBitmapLoader as wo, BufferAttribute as ce, InterleavedBuffer as vo, InterleavedBufferAttribute as Ue, LinearMipmapLinearFilter as Ai, NearestMipmapLinearFilter as So, LinearMipmapNearestFilter as Mo, NearestMipmapNearestFilter as Io, LinearFilter as Ge, NearestFilter as lr, RepeatWrapping as rs, MirroredRepeatWrapping as Bo, ClampToEdgeWrapping as xo, PointsMaterial as cr, Material as Ii, LineBasicMaterial as To, MeshStandardMaterial as Ss, DoubleSide as Ro, MeshBasicMaterial as Ve, PropertyBinding as Qo, BufferGeometry as pi, SkinnedMesh as _o, Mesh as fi, LineSegments as Do, Line as Lo, LineLoop as Po, Points as hr, Group as tt, PerspectiveCamera as ko, OrthographicCamera as dr, Skeleton as Fo, AnimationClip as Uo, Bone as Vo, InterpolateDiscrete as No, InterpolateLinear as ur, Texture as Us, VectorKeyframeTrack as Vs, NumberKeyframeTrack as Ns, QuaternionKeyframeTrack as Gs, ColorManagement as os, FrontSide as Go, Interpolant as Oo, Box3 as ot, Sphere as xt, CompressedCubeTexture as Ho, CompressedArrayTexture as zo, CompressedTexture as Ar, NoColorSpace as Os, RGBA_BPTC_Format as as, RGBA_S3TC_DXT5_Format as ls, RGBA_S3TC_DXT3_Format as Hs, RGB_S3TC_DXT1_Format as zs, RGBA_S3TC_DXT1_Format as cs, RGBA_ASTC_6x6_Format as qs, RGBA_ASTC_4x4_Format as Zt, RGBA_ETC2_EAC_Format as pr, RGB_ETC2_Format as fr, RedFormat as yt, RGFormat as Ct, RGBAFormat as $e, UnsignedByteType as de, HalfFloatType as Ze, FloatType as St, DataTexture as mr, Data3DTexture as qo, RGB_PVRTC_4BPPV1_Format as jo, RGB_ETC1_Format as Ko, RGBA_PVRTC_4BPPV1_Format as Yo, RGB_BPTC_UNSIGNED_Format as Wo, Euler as Jo, TextureUtils as Xo, LoadingManager as $o, EventDispatcher as Lt, Frustum as Zo, DefaultLoadingManager as mi, Matrix3 as gr, Float32BufferAttribute as ni, WebGLRenderer as ea, WebGLRenderTarget as js, ShaderMaterial as br, OneFactor as ta, ZeroFactor as ia, CustomBlending as sa, Box2 as na, Matrix2 as ra, Vector4 as at, SphereGeometry as yr, BoxGeometry as oa, DynamicDrawUsage as aa, InstancedBufferGeometry as la, InstancedInterleavedBuffer as hs, WireframeGeometry as ca, ShaderLib as ei, UniformsUtils as Cr, UniformsLib as ti, Line3 as ha } from "three";
class Pe {
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
class gi {
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
    const t = {}, i = e || {};
    for (const s in this.schema) {
      const n = this.schema[s], r = i[s];
      if (n.type === "object" && n.schema) {
        const o = r ?? n.default;
        t[s] = new gi(n.schema).validate(o || {});
      } else if (r == null)
        t[s] = n.default;
      else if (this.isTypeValid(r, n.type))
        t[s] = r;
      else {
        const o = Array.isArray(n.type) ? n.type.join(" or ") : n.type;
        console.warn(
          `ConfigValidator: Invalid type for option '${s}'. Expected '${o}', but received '${typeof r}'. Using default value: ${JSON.stringify(n.default)}.`
        ), t[s] = n.default;
      }
    }
    for (const s in i)
      Object.prototype.hasOwnProperty.call(this.schema, s) || console.warn(`ConfigValidator: Unknown option '${s}' will be ignored.`);
    return t;
  }
  /**
     * Checks if a value conforms to the specified type or types.
     * @param {*} value The value to check.
     * @param {string|string[]} type The expected type or an array of allowed types.
     * @returns {boolean}
     */
  isTypeValid(e, t) {
    const i = (s, n) => n === "array" ? Array.isArray(s) : n === "object" ? s !== null && typeof s == "object" && !Array.isArray(s) : typeof s === n;
    return Array.isArray(t) ? t.some((s) => i(e, s)) : i(e, t);
  }
}
class da {
  constructor(e = {}) {
    this.config = e, this.scene = new m.Scene(), this.init();
  }
  init() {
    let e = "#001122";
    this.config.background && (typeof this.config.background == "object" && this.config.background.value ? e = this.config.background.value : typeof this.config.background == "string" && (e = this.config.background)), this.scene.background = new m.Color(e);
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
const Ks = { type: "change" }, Ms = { type: "start" }, Er = { type: "end" }, Pt = new di(), Ys = new or(), ua = Math.cos(70 * rt.DEG2RAD), K = new R(), te = 2 * Math.PI, N = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, Bi = 1e-6;
class Aa extends fo {
  /**
   * Constructs a new controls instance.
   *
   * @param {Object3D} object - The object that is managed by the controls.
   * @param {?HTMLDOMElement} domElement - The HTML element used for event listeners.
   */
  constructor(e, t = null) {
    super(e, t), this.state = N.NONE, this.target = new R(), this.cursor = new R(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: et.ROTATE, MIDDLE: et.DOLLY, RIGHT: et.PAN }, this.touches = { ONE: Xe.ROTATE, TWO: Xe.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new R(), this._lastQuaternion = new st(), this._lastTargetPosition = new R(), this._quat = new st().setFromUnitVectors(e.up, new R(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new ss(), this._sphericalDelta = new ss(), this._scale = 1, this._panOffset = new R(), this._rotateStart = new V(), this._rotateEnd = new V(), this._rotateDelta = new V(), this._panStart = new V(), this._panEnd = new V(), this._panDelta = new V(), this._dollyStart = new V(), this._dollyEnd = new V(), this._dollyDelta = new V(), this._dollyDirection = new R(), this._mouse = new V(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = fa.bind(this), this._onPointerDown = pa.bind(this), this._onPointerUp = ma.bind(this), this._onContextMenu = va.bind(this), this._onMouseWheel = ya.bind(this), this._onKeyDown = Ca.bind(this), this._onTouchStart = Ea.bind(this), this._onTouchMove = wa.bind(this), this._onMouseDown = ga.bind(this), this._onMouseMove = ba.bind(this), this._interceptControlDown = Sa.bind(this), this._interceptControlUp = Ma.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Ks), this.update(), this.state = N.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    K.copy(t).sub(this.target), K.applyQuaternion(this._quat), this._spherical.setFromVector3(K), this.autoRotate && this.state === N.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let i = this.minAzimuthAngle, s = this.maxAzimuthAngle;
    isFinite(i) && isFinite(s) && (i < -Math.PI ? i += te : i > Math.PI && (i -= te), s < -Math.PI ? s += te : s > Math.PI && (s -= te), i <= s ? this._spherical.theta = Math.max(i, Math.min(s, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (i + s) / 2 ? Math.max(i, this._spherical.theta) : Math.min(s, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let n = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const r = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), n = r != this._spherical.radius;
    }
    if (K.setFromSpherical(this._spherical), K.applyQuaternion(this._quatInverse), t.copy(this.target).add(K), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let r = null;
      if (this.object.isPerspectiveCamera) {
        const o = K.length();
        r = this._clampDistance(o * this._scale);
        const a = o - r;
        this.object.position.addScaledVector(this._dollyDirection, a), this.object.updateMatrixWorld(), n = !!a;
      } else if (this.object.isOrthographicCamera) {
        const o = new R(this._mouse.x, this._mouse.y, 0);
        o.unproject(this.object);
        const a = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), n = a !== this.object.zoom;
        const l = new R(this._mouse.x, this._mouse.y, 0);
        l.unproject(this.object), this.object.position.sub(l).add(o), this.object.updateMatrixWorld(), r = K.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      r !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position) : (Pt.origin.copy(this.object.position), Pt.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Pt.direction)) < ua ? this.object.lookAt(this.target) : (Ys.setFromNormalAndCoplanarPoint(this.object.up, this.target), Pt.intersectPlane(Ys, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const r = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), r !== this.object.zoom && (this.object.updateProjectionMatrix(), n = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, n || this._lastPosition.distanceToSquared(this.object.position) > Bi || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Bi || this._lastTargetPosition.distanceToSquared(this.target) > Bi ? (this.dispatchEvent(Ks), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? te / 60 * this.autoRotateSpeed * e : te / 60 / 60 * this.autoRotateSpeed;
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
    K.setFromMatrixColumn(t, 0), K.multiplyScalar(-e), this._panOffset.add(K);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? K.setFromMatrixColumn(t, 1) : (K.setFromMatrixColumn(t, 0), K.crossVectors(this.object.up, K)), K.multiplyScalar(e), this._panOffset.add(K);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, t) {
    const i = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const s = this.object.position;
      K.copy(s).sub(this.target);
      let n = K.length();
      n *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * n / i.clientHeight, this.object.matrix), this._panUp(2 * t * n / i.clientHeight, this.object.matrix);
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
    const i = this.domElement.getBoundingClientRect(), s = e - i.left, n = t - i.top, r = i.width, o = i.height;
    this._mouse.x = s / r * 2 - 1, this._mouse.y = -(n / o) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
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
    this._rotateLeft(te * this._rotateDelta.x / t.clientHeight), this._rotateUp(te * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(te * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-te * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(te * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-te * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
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
    const t = this._getSecondPointerPosition(e), i = e.pageX - t.x, s = e.pageY - t.y, n = Math.sqrt(i * i + s * s);
    this._dollyStart.set(0, n);
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
      const i = this._getSecondPointerPosition(e), s = 0.5 * (e.pageX + i.x), n = 0.5 * (e.pageY + i.y);
      this._rotateEnd.set(s, n);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(te * this._rotateDelta.x / t.clientHeight), this._rotateUp(te * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
    const t = this._getSecondPointerPosition(e), i = e.pageX - t.x, s = e.pageY - t.y, n = Math.sqrt(i * i + s * s);
    this._dollyEnd.set(0, n), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const r = (e.pageX + t.x) * 0.5, o = (e.pageY + t.y) * 0.5;
    this._updateZoomParameters(r, o);
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
    t === void 0 && (t = new V(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
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
function pa(c) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(c.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(c) && (this._addPointer(c), c.pointerType === "touch" ? this._onTouchStart(c) : this._onMouseDown(c)));
}
function fa(c) {
  this.enabled !== !1 && (c.pointerType === "touch" ? this._onTouchMove(c) : this._onMouseMove(c));
}
function ma(c) {
  switch (this._removePointer(c), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(c.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Er), this.state = N.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function ga(c) {
  let e;
  switch (c.button) {
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
    case et.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(c), this.state = N.DOLLY;
      break;
    case et.ROTATE:
      if (c.ctrlKey || c.metaKey || c.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(c), this.state = N.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(c), this.state = N.ROTATE;
      }
      break;
    case et.PAN:
      if (c.ctrlKey || c.metaKey || c.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(c), this.state = N.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(c), this.state = N.PAN;
      }
      break;
    default:
      this.state = N.NONE;
  }
  this.state !== N.NONE && this.dispatchEvent(Ms);
}
function ba(c) {
  switch (this.state) {
    case N.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(c);
      break;
    case N.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(c);
      break;
    case N.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(c);
      break;
  }
}
function ya(c) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== N.NONE || (c.preventDefault(), this.dispatchEvent(Ms), this._handleMouseWheel(this._customWheelEvent(c)), this.dispatchEvent(Er));
}
function Ca(c) {
  this.enabled !== !1 && this._handleKeyDown(c);
}
function Ea(c) {
  switch (this._trackPointer(c), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case Xe.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(c), this.state = N.TOUCH_ROTATE;
          break;
        case Xe.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(c), this.state = N.TOUCH_PAN;
          break;
        default:
          this.state = N.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case Xe.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(c), this.state = N.TOUCH_DOLLY_PAN;
          break;
        case Xe.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(c), this.state = N.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = N.NONE;
      }
      break;
    default:
      this.state = N.NONE;
  }
  this.state !== N.NONE && this.dispatchEvent(Ms);
}
function wa(c) {
  switch (this._trackPointer(c), this.state) {
    case N.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(c), this.update();
      break;
    case N.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(c), this.update();
      break;
    case N.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(c), this.update();
      break;
    case N.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(c), this.update();
      break;
    default:
      this.state = N.NONE;
  }
}
function va(c) {
  this.enabled !== !1 && c.preventDefault();
}
function Sa(c) {
  c.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function Ma(c) {
  c.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
class Ia extends Pe {
  /**
   * Creates a new Camera instance
   * 
   * @param {Object} [config={}] - Camera configuration
   */
  constructor(e = {}) {
    super(), this.config = e, this.camera = null, this.controls = null, this.focusAnimation = null, this.init();
  }
  init() {
    this.camera = new m.PerspectiveCamera(
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
      this.controls = new Aa(this.camera, e);
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
    const i = e / t;
    if (this.camera?.isOrthographicCamera) {
      const s = this.camera.userData?.belowOrthoHalfHeight || Math.max((this.camera.top - this.camera.bottom) / 2, 1e-3);
      this.camera.left = -s * i, this.camera.right = s * i, this.camera.top = s, this.camera.bottom = -s, this.camera.updateProjectionMatrix();
      return;
    }
    this.camera.aspect = i, this.camera.updateProjectionMatrix();
  }
  setOrthographic(e = window.innerWidth, t = window.innerHeight) {
    if (!this.camera || this.camera.isOrthographicCamera)
      return this.camera;
    const i = e / t, s = this.controls?.target || new m.Vector3(), n = Math.max(this.camera.position.distanceTo(s), 1e-3), r = this.camera.fov || this.config.fov || 65, o = Math.max(
      Math.tan(m.MathUtils.degToRad(r / 2)) * n,
      1e-3
    ), a = new m.OrthographicCamera(
      -o * i,
      o * i,
      o,
      -o,
      this.camera.near || this.config.near || 0.05,
      this.camera.far || this.config.far || 2e3
    );
    return a.userData = {
      ...this.camera.userData,
      belowProjection: "orthographic",
      belowOrthoHalfHeight: o
    }, this.replaceCamera(a);
  }
  setPerspective(e = window.innerWidth, t = window.innerHeight) {
    if (!this.camera || this.camera.isPerspectiveCamera)
      return this.camera;
    const i = new m.PerspectiveCamera(
      this.config.fov || 65,
      e / t,
      this.camera.near || this.config.near || 0.05,
      this.camera.far || this.config.far || 2e3
    );
    return i.userData = {
      ...this.camera.userData,
      belowProjection: "perspective"
    }, this.replaceCamera(i);
  }
  setClipping({ near: e, far: t } = {}) {
    if (!this.camera)
      return null;
    const i = Number(e), s = Number(t), n = Number.isFinite(s) && s > 0 ? s : this.camera.far;
    return Number.isFinite(i) && i > 0 && i < n && (this.camera.near = i, this.config.near = i), Number.isFinite(s) && s > this.camera.near && (this.camera.far = s, this.config.far = s, this.camera.userData ||= {}, this.camera.userData.belowMinimumFar = s), this.camera.updateProjectionMatrix(), this.emit("change", { camera: this.camera }), {
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
    const i = Number(this.camera.userData?.belowMinimumFar), s = Math.max(
      Number.isFinite(i) ? i : 0,
      t
    );
    return this.camera.userData ||= {}, this.camera.userData.belowMinimumFar = s, this.camera.far < s && (this.camera.far = s, this.config.far = s, this.camera.updateProjectionMatrix(), this.emit("change", { camera: this.camera })), {
      near: this.camera.near,
      far: this.camera.far,
      minimumFar: s
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
    t && Array.isArray(e._pointers) && e._pointers.forEach((i) => {
      try {
        t.hasPointerCapture?.(i) && t.releasePointerCapture(i);
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
    const i = t && t.isVector3 ? t.clone() : new m.Vector3(t || 1, t || 1, t || 1), s = Math.max(i.x, 1e-3), n = Math.max(i.y, 1e-3), r = Math.max(i.z, 1e-3), o = m.MathUtils.degToRad(this.camera.fov), a = 2 * Math.atan(Math.tan(o / 2) * this.camera.aspect), l = n * 0.5 / Math.tan(o / 2), d = s * 0.5 / Math.tan(a / 2), u = Math.max(l, d) * 1.2 + r * 0.5, A = new m.Vector3(0.7, 0.5, 0.7).normalize(), p = e.clone().add(A.multiplyScalar(u));
    this.camera.position.copy(p), this.camera.lookAt(e), this.controls && (this.controls.target.copy(e), this.controls.maxDistance = Math.max(this.controls.maxDistance, u * 4), this.controls.minDistance = Math.min(this.controls.minDistance, Math.max(u * 0.02, 0.05)), this.controls.update());
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
    const i = this.controls.target.clone(), s = this.camera.position.clone(), n = s.clone().sub(i), r = e.clone().add(n), o = 1e3, a = performance.now(), l = () => {
      this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null, this.controls.removeEventListener("start", l));
    };
    this.controls.addEventListener("start", l, { once: !0 });
    const d = () => {
      const h = performance.now() - a, u = Math.min(h / o, 1), A = 1 - Math.pow(1 - u, 3);
      this.controls.target.lerpVectors(i, e, A), this.camera.position.lerpVectors(s, r, A), u < 1 ? this.focusAnimation = requestAnimationFrame(d) : (this.focusAnimation = null, this.controls.removeEventListener("start", l), this.emit("focus-complete", { target: e, position: r }));
    };
    this.focusAnimation = requestAnimationFrame(d), this.emit("focus-start", { target: e, startPosition: s, newPosition: r });
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
function Ba(c) {
  let e = 0;
  for (const i in c.attributes) {
    const s = c.getAttribute(i);
    e += s.count * s.itemSize * s.array.BYTES_PER_ELEMENT;
  }
  const t = c.getIndex();
  return e += t ? t.count * t.itemSize * t.array.BYTES_PER_ELEMENT : 0, e;
}
function Ws(c, e) {
  if (e === mo)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), c;
  if (e === ns || e === ar) {
    let t = c.getIndex();
    if (t === null) {
      const r = [], o = c.getAttribute("position");
      if (o !== void 0) {
        for (let a = 0; a < o.count; a++)
          r.push(a);
        c.setIndex(r), t = c.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), c;
    }
    const i = t.count - 2, s = [];
    if (e === ns)
      for (let r = 1; r <= i; r++)
        s.push(t.getX(0)), s.push(t.getX(r)), s.push(t.getX(r + 1));
    else
      for (let r = 0; r < i; r++)
        r % 2 === 0 ? (s.push(t.getX(r)), s.push(t.getX(r + 1)), s.push(t.getX(r + 2))) : (s.push(t.getX(r + 2)), s.push(t.getX(r + 1)), s.push(t.getX(r)));
    s.length / 3 !== i && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const n = c.clone();
    return n.setIndex(s), n.clearGroups(), n;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), c;
}
class qe extends ws {
  /**
   * Constructs a new glTF loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new _a(t);
    }), this.register(function(t) {
      return new Da(t);
    }), this.register(function(t) {
      return new Oa(t);
    }), this.register(function(t) {
      return new Ha(t);
    }), this.register(function(t) {
      return new za(t);
    }), this.register(function(t) {
      return new Pa(t);
    }), this.register(function(t) {
      return new ka(t);
    }), this.register(function(t) {
      return new Fa(t);
    }), this.register(function(t) {
      return new Ua(t);
    }), this.register(function(t) {
      return new Qa(t);
    }), this.register(function(t) {
      return new Va(t);
    }), this.register(function(t) {
      return new La(t);
    }), this.register(function(t) {
      return new Ga(t);
    }), this.register(function(t) {
      return new Na(t);
    }), this.register(function(t) {
      return new Ta(t);
    }), this.register(function(t) {
      return new qa(t);
    }), this.register(function(t) {
      return new ja(t);
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
    const n = this;
    let r;
    if (this.resourcePath !== "")
      r = this.resourcePath;
    else if (this.path !== "") {
      const l = vt.extractUrlBase(e);
      r = vt.resolveURL(l, this.path);
    } else
      r = vt.extractUrlBase(e);
    this.manager.itemStart(e);
    const o = function(l) {
      s ? s(l) : console.error(l), n.manager.itemError(e), n.manager.itemEnd(e);
    }, a = new Le(this.manager);
    a.setPath(this.path), a.setResponseType("arraybuffer"), a.setRequestHeader(this.requestHeader), a.setWithCredentials(this.withCredentials), a.load(e, function(l) {
      try {
        n.parse(l, r, function(d) {
          t(d), n.manager.itemEnd(e);
        }, o);
      } catch (d) {
        o(d);
      }
    }, i, o);
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
    let n;
    const r = {}, o = {}, a = new TextDecoder();
    if (typeof e == "string")
      n = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (a.decode(new Uint8Array(e, 0, 4)) === wr) {
        try {
          r[k.KHR_BINARY_GLTF] = new Ka(e);
        } catch (h) {
          s && s(h);
          return;
        }
        n = JSON.parse(r[k.KHR_BINARY_GLTF].content);
      } else
        n = JSON.parse(a.decode(e));
    else
      n = e;
    if (n.asset === void 0 || n.asset.version[0] < 2) {
      s && s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const l = new ol(n, {
      path: t || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    l.fileLoader.setRequestHeader(this.requestHeader);
    for (let d = 0; d < this.pluginCallbacks.length; d++) {
      const h = this.pluginCallbacks[d](l);
      h.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), o[h.name] = h, r[h.name] = !0;
    }
    if (n.extensionsUsed)
      for (let d = 0; d < n.extensionsUsed.length; ++d) {
        const h = n.extensionsUsed[d], u = n.extensionsRequired || [];
        switch (h) {
          case k.KHR_MATERIALS_UNLIT:
            r[h] = new Ra();
            break;
          case k.KHR_DRACO_MESH_COMPRESSION:
            r[h] = new Ya(n, this.dracoLoader);
            break;
          case k.KHR_TEXTURE_TRANSFORM:
            r[h] = new Wa();
            break;
          case k.KHR_MESH_QUANTIZATION:
            r[h] = new Ja();
            break;
          default:
            u.indexOf(h) >= 0 && o[h] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + h + '".');
        }
      }
    l.setExtensions(r), l.setPlugins(o), l.parse(i, s);
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
    return new Promise(function(s, n) {
      i.parse(e, t, s, n);
    });
  }
}
function xa() {
  let c = {};
  return {
    get: function(e) {
      return c[e];
    },
    add: function(e, t) {
      c[e] = t;
    },
    remove: function(e) {
      delete c[e];
    },
    removeAll: function() {
      c = {};
    }
  };
}
const k = {
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
class Ta {
  constructor(e) {
    this.parser = e, this.name = k.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const e = this.parser, t = this.parser.json.nodes || [];
    for (let i = 0, s = t.length; i < s; i++) {
      const n = t[i];
      n.extensions && n.extensions[this.name] && n.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, n.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const t = this.parser, i = "light:" + e;
    let s = t.cache.get(i);
    if (s) return s;
    const n = t.json, a = ((n.extensions && n.extensions[this.name] || {}).lights || [])[e];
    let l;
    const d = new Me(16777215);
    a.color !== void 0 && d.setRGB(a.color[0], a.color[1], a.color[2], ue);
    const h = a.range !== void 0 ? a.range : 0;
    switch (a.type) {
      case "directional":
        l = new yo(d), l.target.position.set(0, 0, -1), l.add(l.target);
        break;
      case "point":
        l = new bo(d), l.distance = h;
        break;
      case "spot":
        l = new go(d), l.distance = h, a.spot = a.spot || {}, a.spot.innerConeAngle = a.spot.innerConeAngle !== void 0 ? a.spot.innerConeAngle : 0, a.spot.outerConeAngle = a.spot.outerConeAngle !== void 0 ? a.spot.outerConeAngle : Math.PI / 4, l.angle = a.spot.outerConeAngle, l.penumbra = 1 - a.spot.innerConeAngle / a.spot.outerConeAngle, l.target.position.set(0, 0, -1), l.add(l.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + a.type);
    }
    return l.position.set(0, 0, 0), we(l, a), a.intensity !== void 0 && (l.intensity = a.intensity), l.name = t.createUniqueName(a.name || "light_" + e), s = Promise.resolve(l), t.cache.add(i, s), s;
  }
  getDependency(e, t) {
    if (e === "light")
      return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this, i = this.parser, n = i.json.nodes[e], o = (n.extensions && n.extensions[this.name] || {}).light;
    return o === void 0 ? null : this._loadLight(o).then(function(a) {
      return i._getNodeRef(t.cache, o, a);
    });
  }
}
class Ra {
  constructor() {
    this.name = k.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return Ve;
  }
  extendParams(e, t, i) {
    const s = [];
    e.color = new Me(1, 1, 1), e.opacity = 1;
    const n = t.pbrMetallicRoughness;
    if (n) {
      if (Array.isArray(n.baseColorFactor)) {
        const r = n.baseColorFactor;
        e.color.setRGB(r[0], r[1], r[2], ue), e.opacity = r[3];
      }
      n.baseColorTexture !== void 0 && s.push(i.assignTexture(e, "map", n.baseColorTexture, Se));
    }
    return Promise.all(s);
  }
}
class Qa {
  constructor(e) {
    this.parser = e, this.name = k.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = s.extensions[this.name].emissiveStrength;
    return n !== void 0 && (t.emissiveIntensity = n), Promise.resolve();
  }
}
class _a {
  constructor(e) {
    this.parser = e, this.name = k.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ge;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = [], r = s.extensions[this.name];
    if (r.clearcoatFactor !== void 0 && (t.clearcoat = r.clearcoatFactor), r.clearcoatTexture !== void 0 && n.push(i.assignTexture(t, "clearcoatMap", r.clearcoatTexture)), r.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = r.clearcoatRoughnessFactor), r.clearcoatRoughnessTexture !== void 0 && n.push(i.assignTexture(t, "clearcoatRoughnessMap", r.clearcoatRoughnessTexture)), r.clearcoatNormalTexture !== void 0 && (n.push(i.assignTexture(t, "clearcoatNormalMap", r.clearcoatNormalTexture)), r.clearcoatNormalTexture.scale !== void 0)) {
      const o = r.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new V(o, o);
    }
    return Promise.all(n);
  }
}
class Da {
  constructor(e) {
    this.parser = e, this.name = k.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ge;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = s.extensions[this.name];
    return t.dispersion = n.dispersion !== void 0 ? n.dispersion : 0, Promise.resolve();
  }
}
class La {
  constructor(e) {
    this.parser = e, this.name = k.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ge;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = [], r = s.extensions[this.name];
    return r.iridescenceFactor !== void 0 && (t.iridescence = r.iridescenceFactor), r.iridescenceTexture !== void 0 && n.push(i.assignTexture(t, "iridescenceMap", r.iridescenceTexture)), r.iridescenceIor !== void 0 && (t.iridescenceIOR = r.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), r.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = r.iridescenceThicknessMinimum), r.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = r.iridescenceThicknessMaximum), r.iridescenceThicknessTexture !== void 0 && n.push(i.assignTexture(t, "iridescenceThicknessMap", r.iridescenceThicknessTexture)), Promise.all(n);
  }
}
class Pa {
  constructor(e) {
    this.parser = e, this.name = k.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ge;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = [];
    t.sheenColor = new Me(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const r = s.extensions[this.name];
    if (r.sheenColorFactor !== void 0) {
      const o = r.sheenColorFactor;
      t.sheenColor.setRGB(o[0], o[1], o[2], ue);
    }
    return r.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = r.sheenRoughnessFactor), r.sheenColorTexture !== void 0 && n.push(i.assignTexture(t, "sheenColorMap", r.sheenColorTexture, Se)), r.sheenRoughnessTexture !== void 0 && n.push(i.assignTexture(t, "sheenRoughnessMap", r.sheenRoughnessTexture)), Promise.all(n);
  }
}
class ka {
  constructor(e) {
    this.parser = e, this.name = k.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ge;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = [], r = s.extensions[this.name];
    return r.transmissionFactor !== void 0 && (t.transmission = r.transmissionFactor), r.transmissionTexture !== void 0 && n.push(i.assignTexture(t, "transmissionMap", r.transmissionTexture)), Promise.all(n);
  }
}
class Fa {
  constructor(e) {
    this.parser = e, this.name = k.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ge;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = [], r = s.extensions[this.name];
    t.thickness = r.thicknessFactor !== void 0 ? r.thicknessFactor : 0, r.thicknessTexture !== void 0 && n.push(i.assignTexture(t, "thicknessMap", r.thicknessTexture)), t.attenuationDistance = r.attenuationDistance || 1 / 0;
    const o = r.attenuationColor || [1, 1, 1];
    return t.attenuationColor = new Me().setRGB(o[0], o[1], o[2], ue), Promise.all(n);
  }
}
class Ua {
  constructor(e) {
    this.parser = e, this.name = k.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ge;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = s.extensions[this.name];
    return t.ior = n.ior !== void 0 ? n.ior : 1.5, Promise.resolve();
  }
}
class Va {
  constructor(e) {
    this.parser = e, this.name = k.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ge;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = [], r = s.extensions[this.name];
    t.specularIntensity = r.specularFactor !== void 0 ? r.specularFactor : 1, r.specularTexture !== void 0 && n.push(i.assignTexture(t, "specularIntensityMap", r.specularTexture));
    const o = r.specularColorFactor || [1, 1, 1];
    return t.specularColor = new Me().setRGB(o[0], o[1], o[2], ue), r.specularColorTexture !== void 0 && n.push(i.assignTexture(t, "specularColorMap", r.specularColorTexture, Se)), Promise.all(n);
  }
}
class Na {
  constructor(e) {
    this.parser = e, this.name = k.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ge;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = [], r = s.extensions[this.name];
    return t.bumpScale = r.bumpFactor !== void 0 ? r.bumpFactor : 1, r.bumpTexture !== void 0 && n.push(i.assignTexture(t, "bumpMap", r.bumpTexture)), Promise.all(n);
  }
}
class Ga {
  constructor(e) {
    this.parser = e, this.name = k.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ge;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = [], r = s.extensions[this.name];
    return r.anisotropyStrength !== void 0 && (t.anisotropy = r.anisotropyStrength), r.anisotropyRotation !== void 0 && (t.anisotropyRotation = r.anisotropyRotation), r.anisotropyTexture !== void 0 && n.push(i.assignTexture(t, "anisotropyMap", r.anisotropyTexture)), Promise.all(n);
  }
}
class Oa {
  constructor(e) {
    this.parser = e, this.name = k.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser, i = t.json, s = i.textures[e];
    if (!s.extensions || !s.extensions[this.name])
      return null;
    const n = s.extensions[this.name], r = t.options.ktx2Loader;
    if (!r) {
      if (i.extensionsRequired && i.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, n.source, r);
  }
}
class Ha {
  constructor(e) {
    this.parser = e, this.name = k.EXT_TEXTURE_WEBP;
  }
  loadTexture(e) {
    const t = this.name, i = this.parser, s = i.json, n = s.textures[e];
    if (!n.extensions || !n.extensions[t])
      return null;
    const r = n.extensions[t], o = s.images[r.source];
    let a = i.textureLoader;
    if (o.uri) {
      const l = i.options.manager.getHandler(o.uri);
      l !== null && (a = l);
    }
    return i.loadTextureImage(e, r.source, a);
  }
}
class za {
  constructor(e) {
    this.parser = e, this.name = k.EXT_TEXTURE_AVIF;
  }
  loadTexture(e) {
    const t = this.name, i = this.parser, s = i.json, n = s.textures[e];
    if (!n.extensions || !n.extensions[t])
      return null;
    const r = n.extensions[t], o = s.images[r.source];
    let a = i.textureLoader;
    if (o.uri) {
      const l = i.options.manager.getHandler(o.uri);
      l !== null && (a = l);
    }
    return i.loadTextureImage(e, r.source, a);
  }
}
class qa {
  constructor(e) {
    this.name = k.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const t = this.parser.json, i = t.bufferViews[e];
    if (i.extensions && i.extensions[this.name]) {
      const s = i.extensions[this.name], n = this.parser.getDependency("buffer", s.buffer), r = this.parser.options.meshoptDecoder;
      if (!r || !r.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return n.then(function(o) {
        const a = s.byteOffset || 0, l = s.byteLength || 0, d = s.count, h = s.byteStride, u = new Uint8Array(o, a, l);
        return r.decodeGltfBufferAsync ? r.decodeGltfBufferAsync(d, h, u, s.mode, s.filter).then(function(A) {
          return A.buffer;
        }) : r.ready.then(function() {
          const A = new ArrayBuffer(d * h);
          return r.decodeGltfBuffer(new Uint8Array(A), d, h, u, s.mode, s.filter), A;
        });
      });
    } else
      return null;
  }
}
class ja {
  constructor(e) {
    this.name = k.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, i = t.nodes[e];
    if (!i.extensions || !i.extensions[this.name] || i.mesh === void 0)
      return null;
    const s = t.meshes[i.mesh];
    for (const l of s.primitives)
      if (l.mode !== le.TRIANGLES && l.mode !== le.TRIANGLE_STRIP && l.mode !== le.TRIANGLE_FAN && l.mode !== void 0)
        return null;
    const r = i.extensions[this.name].attributes, o = [], a = {};
    for (const l in r)
      o.push(this.parser.getDependency("accessor", r[l]).then((d) => (a[l] = d, a[l])));
    return o.length < 1 ? null : (o.push(this.parser.createNodeMesh(e)), Promise.all(o).then((l) => {
      const d = l.pop(), h = d.isGroup ? d.children : [d], u = l[0].count, A = [];
      for (const p of h) {
        const f = new G(), g = new R(), b = new st(), y = new R(1, 1, 1), E = new vs(p.geometry, p.material, u);
        for (let C = 0; C < u; C++)
          a.TRANSLATION && g.fromBufferAttribute(a.TRANSLATION, C), a.ROTATION && b.fromBufferAttribute(a.ROTATION, C), a.SCALE && y.fromBufferAttribute(a.SCALE, C), E.setMatrixAt(C, f.compose(g, b, y));
        for (const C in a)
          if (C === "_COLOR_0") {
            const w = a[C];
            E.instanceColor = new Co(w.array, w.itemSize, w.normalized);
          } else C !== "TRANSLATION" && C !== "ROTATION" && C !== "SCALE" && p.geometry.setAttribute(C, a[C]);
        ui.prototype.copy.call(E, p), this.parser.assignFinalMaterial(E), A.push(E);
      }
      return d.isGroup ? (d.clear(), d.add(...A), d) : A[0];
    }));
  }
}
const wr = "glTF", lt = 12, Js = { JSON: 1313821514, BIN: 5130562 };
class Ka {
  constructor(e) {
    this.name = k.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, lt), i = new TextDecoder();
    if (this.header = {
      magic: i.decode(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== wr)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const s = this.header.length - lt, n = new DataView(e, lt);
    let r = 0;
    for (; r < s; ) {
      const o = n.getUint32(r, !0);
      r += 4;
      const a = n.getUint32(r, !0);
      if (r += 4, a === Js.JSON) {
        const l = new Uint8Array(e, lt + r, o);
        this.content = i.decode(l);
      } else if (a === Js.BIN) {
        const l = lt + r;
        this.body = e.slice(l, l + o);
      }
      r += o;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Ya {
  constructor(e, t) {
    if (!t)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = k.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const i = this.json, s = this.dracoLoader, n = e.extensions[this.name].bufferView, r = e.extensions[this.name].attributes, o = {}, a = {}, l = {};
    for (const d in r) {
      const h = ds[d] || d.toLowerCase();
      o[h] = r[d];
    }
    for (const d in e.attributes) {
      const h = ds[d] || d.toLowerCase();
      if (r[d] !== void 0) {
        const u = i.accessors[e.attributes[d]], A = it[u.componentType];
        l[h] = A.name, a[h] = u.normalized === !0;
      }
    }
    return t.getDependency("bufferView", n).then(function(d) {
      return new Promise(function(h, u) {
        s.decodeDracoFile(d, function(A) {
          for (const p in A.attributes) {
            const f = A.attributes[p], g = a[p];
            g !== void 0 && (f.normalized = g);
          }
          h(A);
        }, o, l, ue, u);
      });
    });
  }
}
class Wa {
  constructor() {
    this.name = k.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}
class Ja {
  constructor() {
    this.name = k.KHR_MESH_QUANTIZATION;
  }
}
class vr extends Oo {
  constructor(e, t, i, s) {
    super(e, t, i, s);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, i = this.sampleValues, s = this.valueSize, n = e * s * 3 + s;
    for (let r = 0; r !== s; r++)
      t[r] = i[n + r];
    return t;
  }
  interpolate_(e, t, i, s) {
    const n = this.resultBuffer, r = this.sampleValues, o = this.valueSize, a = o * 2, l = o * 3, d = s - t, h = (i - t) / d, u = h * h, A = u * h, p = e * l, f = p - l, g = -2 * A + 3 * u, b = A - u, y = 1 - g, E = b - u + h;
    for (let C = 0; C !== o; C++) {
      const w = r[f + C + o], S = r[f + C + a] * d, v = r[p + C + o], I = r[p + C] * d;
      n[C] = y * w + E * S + g * v + b * I;
    }
    return n;
  }
}
const Xa = new st();
class $a extends vr {
  interpolate_(e, t, i, s) {
    const n = super.interpolate_(e, t, i, s);
    return Xa.fromArray(n).normalize().toArray(n), n;
  }
}
const le = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
}, it = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, Xs = {
  9728: lr,
  9729: Ge,
  9984: Io,
  9985: Mo,
  9986: So,
  9987: Ai
}, $s = {
  33071: xo,
  33648: Bo,
  10497: rs
}, xi = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, ds = {
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
}, Za = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: ur,
  STEP: No
}, Ti = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function el(c) {
  return c.DefaultMaterial === void 0 && (c.DefaultMaterial = new Ss({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: Go
  })), c.DefaultMaterial;
}
function ke(c, e, t) {
  for (const i in t.extensions)
    c[i] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[i] = t.extensions[i]);
}
function we(c, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(c.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function tl(c, e, t) {
  let i = !1, s = !1, n = !1;
  for (let l = 0, d = e.length; l < d; l++) {
    const h = e[l];
    if (h.POSITION !== void 0 && (i = !0), h.NORMAL !== void 0 && (s = !0), h.COLOR_0 !== void 0 && (n = !0), i && s && n) break;
  }
  if (!i && !s && !n) return Promise.resolve(c);
  const r = [], o = [], a = [];
  for (let l = 0, d = e.length; l < d; l++) {
    const h = e[l];
    if (i) {
      const u = h.POSITION !== void 0 ? t.getDependency("accessor", h.POSITION) : c.attributes.position;
      r.push(u);
    }
    if (s) {
      const u = h.NORMAL !== void 0 ? t.getDependency("accessor", h.NORMAL) : c.attributes.normal;
      o.push(u);
    }
    if (n) {
      const u = h.COLOR_0 !== void 0 ? t.getDependency("accessor", h.COLOR_0) : c.attributes.color;
      a.push(u);
    }
  }
  return Promise.all([
    Promise.all(r),
    Promise.all(o),
    Promise.all(a)
  ]).then(function(l) {
    const d = l[0], h = l[1], u = l[2];
    return i && (c.morphAttributes.position = d), s && (c.morphAttributes.normal = h), n && (c.morphAttributes.color = u), c.morphTargetsRelative = !0, c;
  });
}
function il(c, e) {
  if (c.updateMorphTargets(), e.weights !== void 0)
    for (let t = 0, i = e.weights.length; t < i; t++)
      c.morphTargetInfluences[t] = e.weights[t];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const t = e.extras.targetNames;
    if (c.morphTargetInfluences.length === t.length) {
      c.morphTargetDictionary = {};
      for (let i = 0, s = t.length; i < s; i++)
        c.morphTargetDictionary[t[i]] = i;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function sl(c) {
  let e;
  const t = c.extensions && c.extensions[k.KHR_DRACO_MESH_COMPRESSION];
  if (t ? e = "draco:" + t.bufferView + ":" + t.indices + ":" + Ri(t.attributes) : e = c.indices + ":" + Ri(c.attributes) + ":" + c.mode, c.targets !== void 0)
    for (let i = 0, s = c.targets.length; i < s; i++)
      e += ":" + Ri(c.targets[i]);
  return e;
}
function Ri(c) {
  let e = "";
  const t = Object.keys(c).sort();
  for (let i = 0, s = t.length; i < s; i++)
    e += t[i] + ":" + c[t[i]] + ";";
  return e;
}
function us(c) {
  switch (c) {
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
function nl(c) {
  return c.search(/\.jpe?g($|\?)/i) > 0 || c.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : c.search(/\.webp($|\?)/i) > 0 || c.search(/^data\:image\/webp/) === 0 ? "image/webp" : c.search(/\.ktx2($|\?)/i) > 0 || c.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png";
}
const rl = new G();
class ol {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new xa(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let i = !1, s = -1, n = !1, r = -1;
    if (typeof navigator < "u") {
      const o = navigator.userAgent;
      i = /^((?!chrome|android).)*safari/i.test(o) === !0;
      const a = o.match(/Version\/(\d+)/);
      s = i && a ? parseInt(a[1], 10) : -1, n = o.indexOf("Firefox") > -1, r = n ? o.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || i && s < 17 || n && r < 98 ? this.textureLoader = new Eo(this.options.manager) : this.textureLoader = new wo(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new Le(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    const i = this, s = this.json, n = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(r) {
      return r._markDefs && r._markDefs();
    }), Promise.all(this._invokeAll(function(r) {
      return r.beforeRoot && r.beforeRoot();
    })).then(function() {
      return Promise.all([
        i.getDependencies("scene"),
        i.getDependencies("animation"),
        i.getDependencies("camera")
      ]);
    }).then(function(r) {
      const o = {
        scene: r[0][s.scene || 0],
        scenes: r[0],
        animations: r[1],
        cameras: r[2],
        asset: s.asset,
        parser: i,
        userData: {}
      };
      return ke(n, o, s), we(o, s), Promise.all(i._invokeAll(function(a) {
        return a.afterRoot && a.afterRoot(o);
      })).then(function() {
        for (const a of o.scenes)
          a.updateMatrixWorld();
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
    const e = this.json.nodes || [], t = this.json.skins || [], i = this.json.meshes || [];
    for (let s = 0, n = t.length; s < n; s++) {
      const r = t[s].joints;
      for (let o = 0, a = r.length; o < a; o++)
        e[r[o]].isBone = !0;
    }
    for (let s = 0, n = e.length; s < n; s++) {
      const r = e[s];
      r.mesh !== void 0 && (this._addNodeRef(this.meshCache, r.mesh), r.skin !== void 0 && (i[r.mesh].isSkinnedMesh = !0)), r.camera !== void 0 && this._addNodeRef(this.cameraCache, r.camera);
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
    const s = i.clone(), n = (r, o) => {
      const a = this.associations.get(r);
      a != null && this.associations.set(o, a);
      for (const [l, d] of r.children.entries())
        n(d, o.children[l]);
    };
    return n(i, s), s.name += "_instance_" + e.uses[t]++, s;
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
      const n = e(t[s]);
      n && i.push(n);
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
          s = this._invokeOne(function(n) {
            return n.loadNode && n.loadNode(t);
          });
          break;
        case "mesh":
          s = this._invokeOne(function(n) {
            return n.loadMesh && n.loadMesh(t);
          });
          break;
        case "accessor":
          s = this.loadAccessor(t);
          break;
        case "bufferView":
          s = this._invokeOne(function(n) {
            return n.loadBufferView && n.loadBufferView(t);
          });
          break;
        case "buffer":
          s = this.loadBuffer(t);
          break;
        case "material":
          s = this._invokeOne(function(n) {
            return n.loadMaterial && n.loadMaterial(t);
          });
          break;
        case "texture":
          s = this._invokeOne(function(n) {
            return n.loadTexture && n.loadTexture(t);
          });
          break;
        case "skin":
          s = this.loadSkin(t);
          break;
        case "animation":
          s = this._invokeOne(function(n) {
            return n.loadAnimation && n.loadAnimation(t);
          });
          break;
        case "camera":
          s = this.loadCamera(t);
          break;
        default:
          if (s = this._invokeOne(function(n) {
            return n != this && n.getDependency && n.getDependency(e, t);
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
      t = Promise.all(s.map(function(n, r) {
        return i.getDependency(e, r);
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
      return Promise.resolve(this.extensions[k.KHR_BINARY_GLTF].body);
    const s = this.options;
    return new Promise(function(n, r) {
      i.load(vt.resolveURL(t.uri, s.path), n, void 0, function() {
        r(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
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
      const s = t.byteLength || 0, n = t.byteOffset || 0;
      return i.slice(n, n + s);
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
      const r = xi[s.type], o = it[s.componentType], a = s.normalized === !0, l = new o(s.count * r);
      return Promise.resolve(new ce(l, r, a));
    }
    const n = [];
    return s.bufferView !== void 0 ? n.push(this.getDependency("bufferView", s.bufferView)) : n.push(null), s.sparse !== void 0 && (n.push(this.getDependency("bufferView", s.sparse.indices.bufferView)), n.push(this.getDependency("bufferView", s.sparse.values.bufferView))), Promise.all(n).then(function(r) {
      const o = r[0], a = xi[s.type], l = it[s.componentType], d = l.BYTES_PER_ELEMENT, h = d * a, u = s.byteOffset || 0, A = s.bufferView !== void 0 ? i.bufferViews[s.bufferView].byteStride : void 0, p = s.normalized === !0;
      let f, g;
      if (A && A !== h) {
        const b = Math.floor(u / A), y = "InterleavedBuffer:" + s.bufferView + ":" + s.componentType + ":" + b + ":" + s.count;
        let E = t.cache.get(y);
        E || (f = new l(o, b * A, s.count * A / d), E = new vo(f, A / d), t.cache.add(y, E)), g = new Ue(E, a, u % A / d, p);
      } else
        o === null ? f = new l(s.count * a) : f = new l(o, u, s.count * a), g = new ce(f, a, p);
      if (s.sparse !== void 0) {
        const b = xi.SCALAR, y = it[s.sparse.indices.componentType], E = s.sparse.indices.byteOffset || 0, C = s.sparse.values.byteOffset || 0, w = new y(r[1], E, s.sparse.count * b), S = new l(r[2], C, s.sparse.count * a);
        o !== null && (g = new ce(g.array.slice(), g.itemSize, g.normalized)), g.normalized = !1;
        for (let v = 0, I = w.length; v < I; v++) {
          const B = w[v];
          if (g.setX(B, S[v * a]), a >= 2 && g.setY(B, S[v * a + 1]), a >= 3 && g.setZ(B, S[v * a + 2]), a >= 4 && g.setW(B, S[v * a + 3]), a >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        g.normalized = p;
      }
      return g;
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
    const t = this.json, i = this.options, n = t.textures[e].source, r = t.images[n];
    let o = this.textureLoader;
    if (r.uri) {
      const a = i.manager.getHandler(r.uri);
      a !== null && (o = a);
    }
    return this.loadTextureImage(e, n, o);
  }
  loadTextureImage(e, t, i) {
    const s = this, n = this.json, r = n.textures[e], o = n.images[t], a = (o.uri || o.bufferView) + ":" + r.sampler;
    if (this.textureCache[a])
      return this.textureCache[a];
    const l = this.loadImageSource(t, i).then(function(d) {
      d.flipY = !1, d.name = r.name || o.name || "", d.name === "" && typeof o.uri == "string" && o.uri.startsWith("data:image/") === !1 && (d.name = o.uri);
      const u = (n.samplers || {})[r.sampler] || {};
      return d.magFilter = Xs[u.magFilter] || Ge, d.minFilter = Xs[u.minFilter] || Ai, d.wrapS = $s[u.wrapS] || rs, d.wrapT = $s[u.wrapT] || rs, d.generateMipmaps = !d.isCompressedTexture && d.minFilter !== lr && d.minFilter !== Ge, s.associations.set(d, { textures: e }), d;
    }).catch(function() {
      return null;
    });
    return this.textureCache[a] = l, l;
  }
  loadImageSource(e, t) {
    const i = this, s = this.json, n = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((h) => h.clone());
    const r = s.images[e], o = self.URL || self.webkitURL;
    let a = r.uri || "", l = !1;
    if (r.bufferView !== void 0)
      a = i.getDependency("bufferView", r.bufferView).then(function(h) {
        l = !0;
        const u = new Blob([h], { type: r.mimeType });
        return a = o.createObjectURL(u), a;
      });
    else if (r.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const d = Promise.resolve(a).then(function(h) {
      return new Promise(function(u, A) {
        let p = u;
        t.isImageBitmapLoader === !0 && (p = function(f) {
          const g = new Us(f);
          g.needsUpdate = !0, u(g);
        }), t.load(vt.resolveURL(h, n.path), p, void 0, A);
      });
    }).then(function(h) {
      return l === !0 && o.revokeObjectURL(a), we(h, r), h.userData.mimeType = r.mimeType || nl(r.uri), h;
    }).catch(function(h) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", a), h;
    });
    return this.sourceCache[e] = d, d;
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
    const n = this;
    return this.getDependency("texture", i.index).then(function(r) {
      if (!r) return null;
      if (i.texCoord !== void 0 && i.texCoord > 0 && (r = r.clone(), r.channel = i.texCoord), n.extensions[k.KHR_TEXTURE_TRANSFORM]) {
        const o = i.extensions !== void 0 ? i.extensions[k.KHR_TEXTURE_TRANSFORM] : void 0;
        if (o) {
          const a = n.associations.get(r);
          r = n.extensions[k.KHR_TEXTURE_TRANSFORM].extendTexture(r, o), n.associations.set(r, a);
        }
      }
      return s !== void 0 && (r.colorSpace = s), e[t] = r, r;
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
    const s = t.attributes.tangent === void 0, n = t.attributes.color !== void 0, r = t.attributes.normal === void 0;
    if (e.isPoints) {
      const o = "PointsMaterial:" + i.uuid;
      let a = this.cache.get(o);
      a || (a = new cr(), Ii.prototype.copy.call(a, i), a.color.copy(i.color), a.map = i.map, a.sizeAttenuation = !1, this.cache.add(o, a)), i = a;
    } else if (e.isLine) {
      const o = "LineBasicMaterial:" + i.uuid;
      let a = this.cache.get(o);
      a || (a = new To(), Ii.prototype.copy.call(a, i), a.color.copy(i.color), a.map = i.map, this.cache.add(o, a)), i = a;
    }
    if (s || n || r) {
      let o = "ClonedMaterial:" + i.uuid + ":";
      s && (o += "derivative-tangents:"), n && (o += "vertex-colors:"), r && (o += "flat-shading:");
      let a = this.cache.get(o);
      a || (a = i.clone(), n && (a.vertexColors = !0), r && (a.flatShading = !0), s && (a.normalScale && (a.normalScale.y *= -1), a.clearcoatNormalScale && (a.clearcoatNormalScale.y *= -1)), this.cache.add(o, a), this.associations.set(a, this.associations.get(i))), i = a;
    }
    e.material = i;
  }
  getMaterialType() {
    return Ss;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   *
   * @private
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(e) {
    const t = this, i = this.json, s = this.extensions, n = i.materials[e];
    let r;
    const o = {}, a = n.extensions || {}, l = [];
    if (a[k.KHR_MATERIALS_UNLIT]) {
      const h = s[k.KHR_MATERIALS_UNLIT];
      r = h.getMaterialType(), l.push(h.extendParams(o, n, t));
    } else {
      const h = n.pbrMetallicRoughness || {};
      if (o.color = new Me(1, 1, 1), o.opacity = 1, Array.isArray(h.baseColorFactor)) {
        const u = h.baseColorFactor;
        o.color.setRGB(u[0], u[1], u[2], ue), o.opacity = u[3];
      }
      h.baseColorTexture !== void 0 && l.push(t.assignTexture(o, "map", h.baseColorTexture, Se)), o.metalness = h.metallicFactor !== void 0 ? h.metallicFactor : 1, o.roughness = h.roughnessFactor !== void 0 ? h.roughnessFactor : 1, h.metallicRoughnessTexture !== void 0 && (l.push(t.assignTexture(o, "metalnessMap", h.metallicRoughnessTexture)), l.push(t.assignTexture(o, "roughnessMap", h.metallicRoughnessTexture))), r = this._invokeOne(function(u) {
        return u.getMaterialType && u.getMaterialType(e);
      }), l.push(Promise.all(this._invokeAll(function(u) {
        return u.extendMaterialParams && u.extendMaterialParams(e, o);
      })));
    }
    n.doubleSided === !0 && (o.side = Ro);
    const d = n.alphaMode || Ti.OPAQUE;
    if (d === Ti.BLEND ? (o.transparent = !0, o.depthWrite = !1) : (o.transparent = !1, d === Ti.MASK && (o.alphaTest = n.alphaCutoff !== void 0 ? n.alphaCutoff : 0.5)), n.normalTexture !== void 0 && r !== Ve && (l.push(t.assignTexture(o, "normalMap", n.normalTexture)), o.normalScale = new V(1, 1), n.normalTexture.scale !== void 0)) {
      const h = n.normalTexture.scale;
      o.normalScale.set(h, h);
    }
    if (n.occlusionTexture !== void 0 && r !== Ve && (l.push(t.assignTexture(o, "aoMap", n.occlusionTexture)), n.occlusionTexture.strength !== void 0 && (o.aoMapIntensity = n.occlusionTexture.strength)), n.emissiveFactor !== void 0 && r !== Ve) {
      const h = n.emissiveFactor;
      o.emissive = new Me().setRGB(h[0], h[1], h[2], ue);
    }
    return n.emissiveTexture !== void 0 && r !== Ve && l.push(t.assignTexture(o, "emissiveMap", n.emissiveTexture, Se)), Promise.all(l).then(function() {
      const h = new r(o);
      return n.name && (h.name = n.name), we(h, n), t.associations.set(h, { materials: e }), n.extensions && ke(s, h, n), h;
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
    const t = Qo.sanitizeNodeName(e || "");
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
    function n(o) {
      return i[k.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o, t).then(function(a) {
        return Zs(a, o, t);
      });
    }
    const r = [];
    for (let o = 0, a = e.length; o < a; o++) {
      const l = e[o], d = sl(l), h = s[d];
      if (h)
        r.push(h.promise);
      else {
        let u;
        l.extensions && l.extensions[k.KHR_DRACO_MESH_COMPRESSION] ? u = n(l) : u = Zs(new pi(), l, t), s[d] = { primitive: l, promise: u }, r.push(u);
      }
    }
    return Promise.all(r);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   *
   * @private
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh|Line|Points>}
   */
  loadMesh(e) {
    const t = this, i = this.json, s = this.extensions, n = i.meshes[e], r = n.primitives, o = [];
    for (let a = 0, l = r.length; a < l; a++) {
      const d = r[a].material === void 0 ? el(this.cache) : this.getDependency("material", r[a].material);
      o.push(d);
    }
    return o.push(t.loadGeometries(r)), Promise.all(o).then(function(a) {
      const l = a.slice(0, a.length - 1), d = a[a.length - 1], h = [];
      for (let A = 0, p = d.length; A < p; A++) {
        const f = d[A], g = r[A];
        let b;
        const y = l[A];
        if (g.mode === le.TRIANGLES || g.mode === le.TRIANGLE_STRIP || g.mode === le.TRIANGLE_FAN || g.mode === void 0)
          b = n.isSkinnedMesh === !0 ? new _o(f, y) : new fi(f, y), b.isSkinnedMesh === !0 && b.normalizeSkinWeights(), g.mode === le.TRIANGLE_STRIP ? b.geometry = Ws(b.geometry, ar) : g.mode === le.TRIANGLE_FAN && (b.geometry = Ws(b.geometry, ns));
        else if (g.mode === le.LINES)
          b = new Do(f, y);
        else if (g.mode === le.LINE_STRIP)
          b = new Lo(f, y);
        else if (g.mode === le.LINE_LOOP)
          b = new Po(f, y);
        else if (g.mode === le.POINTS)
          b = new hr(f, y);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + g.mode);
        Object.keys(b.geometry.morphAttributes).length > 0 && il(b, n), b.name = t.createUniqueName(n.name || "mesh_" + e), we(b, n), g.extensions && ke(s, b, g), t.assignFinalMaterial(b), h.push(b);
      }
      for (let A = 0, p = h.length; A < p; A++)
        t.associations.set(h[A], {
          meshes: e,
          primitives: A
        });
      if (h.length === 1)
        return n.extensions && ke(s, h[0], n), h[0];
      const u = new tt();
      n.extensions && ke(s, u, n), t.associations.set(u, { meshes: e });
      for (let A = 0, p = h.length; A < p; A++)
        u.add(h[A]);
      return u;
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
    return i.type === "perspective" ? t = new ko(rt.radToDeg(s.yfov), s.aspectRatio || 1, s.znear || 1, s.zfar || 2e6) : i.type === "orthographic" && (t = new dr(-s.xmag, s.xmag, s.ymag, -s.ymag, s.znear, s.zfar)), i.name && (t.name = this.createUniqueName(i.name)), we(t, i), Promise.resolve(t);
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
    for (let s = 0, n = t.joints.length; s < n; s++)
      i.push(this._loadNodeShallow(t.joints[s]));
    return t.inverseBindMatrices !== void 0 ? i.push(this.getDependency("accessor", t.inverseBindMatrices)) : i.push(null), Promise.all(i).then(function(s) {
      const n = s.pop(), r = s, o = [], a = [];
      for (let l = 0, d = r.length; l < d; l++) {
        const h = r[l];
        if (h) {
          o.push(h);
          const u = new G();
          n !== null && u.fromArray(n.array, l * 16), a.push(u);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[l]);
      }
      return new Fo(o, a);
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
    const t = this.json, i = this, s = t.animations[e], n = s.name ? s.name : "animation_" + e, r = [], o = [], a = [], l = [], d = [];
    for (let h = 0, u = s.channels.length; h < u; h++) {
      const A = s.channels[h], p = s.samplers[A.sampler], f = A.target, g = f.node, b = s.parameters !== void 0 ? s.parameters[p.input] : p.input, y = s.parameters !== void 0 ? s.parameters[p.output] : p.output;
      f.node !== void 0 && (r.push(this.getDependency("node", g)), o.push(this.getDependency("accessor", b)), a.push(this.getDependency("accessor", y)), l.push(p), d.push(f));
    }
    return Promise.all([
      Promise.all(r),
      Promise.all(o),
      Promise.all(a),
      Promise.all(l),
      Promise.all(d)
    ]).then(function(h) {
      const u = h[0], A = h[1], p = h[2], f = h[3], g = h[4], b = [];
      for (let y = 0, E = u.length; y < E; y++) {
        const C = u[y], w = A[y], S = p[y], v = f[y], I = g[y];
        if (C === void 0) continue;
        C.updateMatrix && C.updateMatrix();
        const B = i._createAnimationTracks(C, w, S, v, I);
        if (B)
          for (let M = 0; M < B.length; M++)
            b.push(B[M]);
      }
      return new Uo(n, void 0, b);
    });
  }
  createNodeMesh(e) {
    const t = this.json, i = this, s = t.nodes[e];
    return s.mesh === void 0 ? null : i.getDependency("mesh", s.mesh).then(function(n) {
      const r = i._getNodeRef(i.meshCache, s.mesh, n);
      return s.weights !== void 0 && r.traverse(function(o) {
        if (o.isMesh)
          for (let a = 0, l = s.weights.length; a < l; a++)
            o.morphTargetInfluences[a] = s.weights[a];
      }), r;
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
    const t = this.json, i = this, s = t.nodes[e], n = i._loadNodeShallow(e), r = [], o = s.children || [];
    for (let l = 0, d = o.length; l < d; l++)
      r.push(i.getDependency("node", o[l]));
    const a = s.skin === void 0 ? Promise.resolve(null) : i.getDependency("skin", s.skin);
    return Promise.all([
      n,
      Promise.all(r),
      a
    ]).then(function(l) {
      const d = l[0], h = l[1], u = l[2];
      u !== null && d.traverse(function(A) {
        A.isSkinnedMesh && A.bind(u, rl);
      });
      for (let A = 0, p = h.length; A < p; A++)
        d.add(h[A]);
      return d;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(e) {
    const t = this.json, i = this.extensions, s = this;
    if (this.nodeCache[e] !== void 0)
      return this.nodeCache[e];
    const n = t.nodes[e], r = n.name ? s.createUniqueName(n.name) : "", o = [], a = s._invokeOne(function(l) {
      return l.createNodeMesh && l.createNodeMesh(e);
    });
    return a && o.push(a), n.camera !== void 0 && o.push(s.getDependency("camera", n.camera).then(function(l) {
      return s._getNodeRef(s.cameraCache, n.camera, l);
    })), s._invokeAll(function(l) {
      return l.createNodeAttachment && l.createNodeAttachment(e);
    }).forEach(function(l) {
      o.push(l);
    }), this.nodeCache[e] = Promise.all(o).then(function(l) {
      let d;
      if (n.isBone === !0 ? d = new Vo() : l.length > 1 ? d = new tt() : l.length === 1 ? d = l[0] : d = new ui(), d !== l[0])
        for (let h = 0, u = l.length; h < u; h++)
          d.add(l[h]);
      if (n.name && (d.userData.name = n.name, d.name = r), we(d, n), n.extensions && ke(i, d, n), n.matrix !== void 0) {
        const h = new G();
        h.fromArray(n.matrix), d.applyMatrix4(h);
      } else
        n.translation !== void 0 && d.position.fromArray(n.translation), n.rotation !== void 0 && d.quaternion.fromArray(n.rotation), n.scale !== void 0 && d.scale.fromArray(n.scale);
      if (!s.associations.has(d))
        s.associations.set(d, {});
      else if (n.mesh !== void 0 && s.meshCache.refs[n.mesh] > 1) {
        const h = s.associations.get(d);
        s.associations.set(d, { ...h });
      }
      return s.associations.get(d).nodes = e, d;
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
    const t = this.extensions, i = this.json.scenes[e], s = this, n = new tt();
    i.name && (n.name = s.createUniqueName(i.name)), we(n, i), i.extensions && ke(t, n, i);
    const r = i.nodes || [], o = [];
    for (let a = 0, l = r.length; a < l; a++)
      o.push(s.getDependency("node", r[a]));
    return Promise.all(o).then(function(a) {
      for (let d = 0, h = a.length; d < h; d++)
        n.add(a[d]);
      const l = (d) => {
        const h = /* @__PURE__ */ new Map();
        for (const [u, A] of s.associations)
          (u instanceof Ii || u instanceof Us) && h.set(u, A);
        return d.traverse((u) => {
          const A = s.associations.get(u);
          A != null && h.set(u, A);
        }), h;
      };
      return s.associations = l(n), n;
    });
  }
  _createAnimationTracks(e, t, i, s, n) {
    const r = [], o = e.name ? e.name : e.uuid, a = [];
    Ie[n.path] === Ie.weights ? e.traverse(function(u) {
      u.morphTargetInfluences && a.push(u.name ? u.name : u.uuid);
    }) : a.push(o);
    let l;
    switch (Ie[n.path]) {
      case Ie.weights:
        l = Ns;
        break;
      case Ie.rotation:
        l = Gs;
        break;
      case Ie.translation:
      case Ie.scale:
        l = Vs;
        break;
      default:
        switch (i.itemSize) {
          case 1:
            l = Ns;
            break;
          case 2:
          case 3:
          default:
            l = Vs;
            break;
        }
        break;
    }
    const d = s.interpolation !== void 0 ? Za[s.interpolation] : ur, h = this._getArrayFromAccessor(i);
    for (let u = 0, A = a.length; u < A; u++) {
      const p = new l(
        a[u] + "." + Ie[n.path],
        t.array,
        h,
        d
      );
      s.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(p), r.push(p);
    }
    return r;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const i = us(t.constructor), s = new Float32Array(t.length);
      for (let n = 0, r = t.length; n < r; n++)
        s[n] = t[n] * i;
      t = s;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(i) {
      const s = this instanceof Gs ? $a : vr;
      return new s(this.times, this.values, this.getValueSize() / 3, i);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function al(c, e, t) {
  const i = e.attributes, s = new ot();
  if (i.POSITION !== void 0) {
    const o = t.json.accessors[i.POSITION], a = o.min, l = o.max;
    if (a !== void 0 && l !== void 0) {
      if (s.set(
        new R(a[0], a[1], a[2]),
        new R(l[0], l[1], l[2])
      ), o.normalized) {
        const d = us(it[o.componentType]);
        s.min.multiplyScalar(d), s.max.multiplyScalar(d);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const n = e.targets;
  if (n !== void 0) {
    const o = new R(), a = new R();
    for (let l = 0, d = n.length; l < d; l++) {
      const h = n[l];
      if (h.POSITION !== void 0) {
        const u = t.json.accessors[h.POSITION], A = u.min, p = u.max;
        if (A !== void 0 && p !== void 0) {
          if (a.setX(Math.max(Math.abs(A[0]), Math.abs(p[0]))), a.setY(Math.max(Math.abs(A[1]), Math.abs(p[1]))), a.setZ(Math.max(Math.abs(A[2]), Math.abs(p[2]))), u.normalized) {
            const f = us(it[u.componentType]);
            a.multiplyScalar(f);
          }
          o.max(a);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    s.expandByVector(o);
  }
  c.boundingBox = s;
  const r = new xt();
  s.getCenter(r.center), r.radius = s.min.distanceTo(s.max) / 2, c.boundingSphere = r;
}
function Zs(c, e, t) {
  const i = e.attributes, s = [];
  function n(r, o) {
    return t.getDependency("accessor", r).then(function(a) {
      c.setAttribute(o, a);
    });
  }
  for (const r in i) {
    const o = ds[r] || r.toLowerCase();
    o in c.attributes || s.push(n(i[r], o));
  }
  if (e.indices !== void 0 && !c.index) {
    const r = t.getDependency("accessor", e.indices).then(function(o) {
      c.setIndex(o);
    });
    s.push(r);
  }
  return os.workingColorSpace !== ue && "COLOR_0" in i && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${os.workingColorSpace}" not supported.`), we(c, e), al(c, e, t), Promise.all(s).then(function() {
    return e.targets !== void 0 ? tl(c, e.targets, t) : c;
  });
}
const Qi = /* @__PURE__ */ new WeakMap();
class Sr extends ws {
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
    const n = new Le(this.manager);
    n.setPath(this.path), n.setResponseType("arraybuffer"), n.setRequestHeader(this.requestHeader), n.setWithCredentials(this.withCredentials), n.load(e, (r) => {
      this.parse(r, t, s);
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
    this.decodeDracoFile(e, t, null, null, Se, i).catch(i);
  }
  //
  decodeDracoFile(e, t, i, s, n = ue, r = () => {
  }) {
    const o = {
      attributeIDs: i || this.defaultAttributeIDs,
      attributeTypes: s || this.defaultAttributeTypes,
      useUniqueIDs: !!i,
      vertexColorSpace: n
    };
    return this.decodeGeometry(e, o).then(t).catch(r);
  }
  decodeGeometry(e, t) {
    const i = JSON.stringify(t);
    if (Qi.has(e)) {
      const a = Qi.get(e);
      if (a.key === i)
        return a.promise;
      if (e.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let s;
    const n = this.workerNextTaskID++, r = e.byteLength, o = this._getWorker(n, r).then((a) => (s = a, new Promise((l, d) => {
      s._callbacks[n] = { resolve: l, reject: d }, s.postMessage({ type: "decode", id: n, taskConfig: t, buffer: e }, [e]);
    }))).then((a) => this._createGeometry(a.geometry));
    return o.catch(() => !0).then(() => {
      s && n && this._releaseTask(s, n);
    }), Qi.set(e, {
      key: i,
      promise: o
    }), o;
  }
  _createGeometry(e) {
    const t = new pi();
    e.index && t.setIndex(new ce(e.index.array, 1));
    for (let i = 0; i < e.attributes.length; i++) {
      const s = e.attributes[i], n = s.name, r = s.array, o = s.itemSize, a = new ce(r, o);
      n === "color" && (this._assignVertexColorSpace(a, s.vertexColorSpace), a.normalized = !(r instanceof Float32Array)), t.setAttribute(n, a);
    }
    return t;
  }
  _assignVertexColorSpace(e, t) {
    if (t !== Se) return;
    const i = new Me();
    for (let s = 0, n = e.count; s < n; s++)
      i.fromBufferAttribute(e, s), os.colorSpaceToWorking(i, Se), e.setXYZ(s, i.r, i.g, i.b);
  }
  _loadLibrary(e, t) {
    const i = new Le(this.manager);
    return i.setPath(this.decoderPath), i.setResponseType(t), i.setWithCredentials(this.withCredentials), new Promise((s, n) => {
      i.load(e, s, void 0, n);
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
      const n = ll.toString(), r = [
        "/* draco decoder */",
        s,
        "",
        "/* worker */",
        n.substring(n.indexOf("{") + 1, n.lastIndexOf("}"))
      ].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([r]));
    }), this.decoderPending;
  }
  _getWorker(e, t) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const s = new Worker(this.workerSourceURL);
        s._callbacks = {}, s._taskCosts = {}, s._taskLoad = 0, s.postMessage({ type: "init", decoderConfig: this.decoderConfig }), s.onmessage = function(n) {
          const r = n.data;
          switch (r.type) {
            case "decode":
              s._callbacks[r.id].resolve(r);
              break;
            case "error":
              s._callbacks[r.id].reject(r);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + r.type + '"');
          }
        }, this.workerPool.push(s);
      } else
        this.workerPool.sort(function(s, n) {
          return s._taskLoad > n._taskLoad ? -1 : 1;
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
function ll() {
  let c, e;
  onmessage = function(r) {
    const o = r.data;
    switch (o.type) {
      case "init":
        c = o.decoderConfig, e = new Promise(function(d) {
          c.onModuleLoaded = function(h) {
            d({ draco: h });
          }, DracoDecoderModule(c);
        });
        break;
      case "decode":
        const a = o.buffer, l = o.taskConfig;
        e.then((d) => {
          const h = d.draco, u = new h.Decoder();
          try {
            const A = t(h, u, new Int8Array(a), l), p = A.attributes.map((f) => f.array.buffer);
            A.index && p.push(A.index.array.buffer), self.postMessage({ type: "decode", id: o.id, geometry: A }, p);
          } catch (A) {
            console.error(A), self.postMessage({ type: "error", id: o.id, error: A.message });
          } finally {
            h.destroy(u);
          }
        });
        break;
    }
  };
  function t(r, o, a, l) {
    const d = l.attributeIDs, h = l.attributeTypes;
    let u, A;
    const p = o.GetEncodedGeometryType(a);
    if (p === r.TRIANGULAR_MESH)
      u = new r.Mesh(), A = o.DecodeArrayToMesh(a, a.byteLength, u);
    else if (p === r.POINT_CLOUD)
      u = new r.PointCloud(), A = o.DecodeArrayToPointCloud(a, a.byteLength, u);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!A.ok() || u.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + A.error_msg());
    const f = { index: null, attributes: [] };
    for (const g in d) {
      const b = self[h[g]];
      let y, E;
      if (l.useUniqueIDs)
        E = d[g], y = o.GetAttributeByUniqueId(u, E);
      else {
        if (E = o.GetAttributeId(u, r[d[g]]), E === -1) continue;
        y = o.GetAttribute(u, E);
      }
      const C = s(r, o, u, g, b, y);
      g === "color" && (C.vertexColorSpace = l.vertexColorSpace), f.attributes.push(C);
    }
    return p === r.TRIANGULAR_MESH && (f.index = i(r, o, u)), r.destroy(u), f;
  }
  function i(r, o, a) {
    const d = a.num_faces() * 3, h = d * 4, u = r._malloc(h);
    o.GetTrianglesUInt32Array(a, h, u);
    const A = new Uint32Array(r.HEAPF32.buffer, u, d).slice();
    return r._free(u), { array: A, itemSize: 1 };
  }
  function s(r, o, a, l, d, h) {
    const u = h.num_components(), p = a.num_points() * u, f = p * d.BYTES_PER_ELEMENT, g = n(r, d), b = r._malloc(f);
    o.GetAttributeDataArrayForAllPoints(a, h, g, f, b);
    const y = new d(r.HEAPF32.buffer, b, p).slice();
    return r._free(b), {
      name: l,
      array: y,
      itemSize: u
    };
  }
  function n(r, o) {
    switch (o) {
      case Float32Array:
        return r.DT_FLOAT32;
      case Int8Array:
        return r.DT_INT8;
      case Int16Array:
        return r.DT_INT16;
      case Int32Array:
        return r.DT_INT32;
      case Uint8Array:
        return r.DT_UINT8;
      case Uint16Array:
        return r.DT_UINT16;
      case Uint32Array:
        return r.DT_UINT32;
    }
  }
}
class cl {
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
      const { resolve: s, msg: n, transfer: r } = this.queue.shift();
      this.workersResolve[e] = s, this.workers[e].postMessage(n, r);
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
const hl = 0, en = 2, dl = 1, tn = 2, ul = 0, Al = 1, pl = 10, fl = 0, Mr = 9, Ir = 15, Br = 16, xr = 22, Tr = 37, Rr = 43, Qr = 76, _r = 83, Dr = 97, Lr = 100, Pr = 103, kr = 109, ml = 131, gl = 132, bl = 133, yl = 134, Cl = 137, El = 138, wl = 141, vl = 142, Sl = 145, Ml = 146, Fr = 148, Ur = 152, Il = 157, Bl = 158, Vr = 165, Nr = 166, Is = 1000066e3;
class xl {
  constructor() {
    this.vkFormat = 0, this.typeSize = 1, this.pixelWidth = 0, this.pixelHeight = 0, this.pixelDepth = 0, this.layerCount = 0, this.faceCount = 1, this.supercompressionScheme = 0, this.levels = [], this.dataFormatDescriptor = [{ vendorId: 0, descriptorType: 0, descriptorBlockSize: 0, versionNumber: 2, colorModel: 0, colorPrimaries: 1, transferFunction: 2, flags: 0, texelBlockDimension: [0, 0, 0, 0], bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0], samples: [] }], this.keyValue = {}, this.globalData = null;
  }
}
let ct = class {
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
};
const $ = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function sn(c) {
  return new TextDecoder().decode(c);
}
function Tl(c) {
  const e = new Uint8Array(c.buffer, c.byteOffset, $.length);
  if (e[0] !== $[0] || e[1] !== $[1] || e[2] !== $[2] || e[3] !== $[3] || e[4] !== $[4] || e[5] !== $[5] || e[6] !== $[6] || e[7] !== $[7] || e[8] !== $[8] || e[9] !== $[9] || e[10] !== $[10] || e[11] !== $[11]) throw new Error("Missing KTX 2.0 identifier.");
  const t = new xl(), i = 17 * Uint32Array.BYTES_PER_ELEMENT, s = new ct(c, $.length, i, !0);
  t.vkFormat = s._nextUint32(), t.typeSize = s._nextUint32(), t.pixelWidth = s._nextUint32(), t.pixelHeight = s._nextUint32(), t.pixelDepth = s._nextUint32(), t.layerCount = s._nextUint32(), t.faceCount = s._nextUint32();
  const n = s._nextUint32();
  t.supercompressionScheme = s._nextUint32();
  const r = s._nextUint32(), o = s._nextUint32(), a = s._nextUint32(), l = s._nextUint32(), d = s._nextUint64(), h = s._nextUint64(), u = new ct(c, $.length + i, 3 * n * 8, !0);
  for (let _ = 0; _ < n; _++) t.levels.push({ levelData: new Uint8Array(c.buffer, c.byteOffset + u._nextUint64(), u._nextUint64()), uncompressedByteLength: u._nextUint64() });
  const A = new ct(c, r, o, !0), p = { vendorId: A._skip(4)._nextUint16(), descriptorType: A._nextUint16(), versionNumber: A._nextUint16(), descriptorBlockSize: A._nextUint16(), colorModel: A._nextUint8(), colorPrimaries: A._nextUint8(), transferFunction: A._nextUint8(), flags: A._nextUint8(), texelBlockDimension: [A._nextUint8(), A._nextUint8(), A._nextUint8(), A._nextUint8()], bytesPlane: [A._nextUint8(), A._nextUint8(), A._nextUint8(), A._nextUint8(), A._nextUint8(), A._nextUint8(), A._nextUint8(), A._nextUint8()], samples: [] }, f = (p.descriptorBlockSize / 4 - 6) / 4;
  for (let _ = 0; _ < f; _++) {
    const F = { bitOffset: A._nextUint16(), bitLength: A._nextUint8(), channelType: A._nextUint8(), samplePosition: [A._nextUint8(), A._nextUint8(), A._nextUint8(), A._nextUint8()], sampleLower: -1 / 0, sampleUpper: 1 / 0 };
    64 & F.channelType ? (F.sampleLower = A._nextInt32(), F.sampleUpper = A._nextInt32()) : (F.sampleLower = A._nextUint32(), F.sampleUpper = A._nextUint32()), p.samples[_] = F;
  }
  t.dataFormatDescriptor.length = 0, t.dataFormatDescriptor.push(p);
  const g = new ct(c, a, l, !0);
  for (; g._offset < l; ) {
    const _ = g._nextUint32(), F = g._scan(_), O = sn(F);
    if (t.keyValue[O] = g._nextUint8Array(_ - F.byteLength - 1), O.match(/^ktx/i)) {
      const z = sn(t.keyValue[O]);
      t.keyValue[O] = z.substring(0, z.lastIndexOf("\0"));
    }
    g._skip(_ % 4 ? 4 - _ % 4 : 0);
  }
  if (h <= 0) return t;
  const b = new ct(c, d, h, !0), y = b._nextUint16(), E = b._nextUint16(), C = b._nextUint32(), w = b._nextUint32(), S = b._nextUint32(), v = b._nextUint32(), I = [];
  for (let _ = 0; _ < n; _++) I.push({ imageFlags: b._nextUint32(), rgbSliceByteOffset: b._nextUint32(), rgbSliceByteLength: b._nextUint32(), alphaSliceByteOffset: b._nextUint32(), alphaSliceByteLength: b._nextUint32() });
  const B = d + b._offset, M = B + C, x = M + w, Q = x + S, P = new Uint8Array(c.buffer, c.byteOffset + B, C), T = new Uint8Array(c.buffer, c.byteOffset + M, w), U = new Uint8Array(c.buffer, c.byteOffset + x, S), L = new Uint8Array(c.buffer, c.byteOffset + Q, v);
  return t.globalData = { endpointCount: y, selectorCount: E, imageDescs: I, endpointsData: P, selectorsData: T, tablesData: U, extendedData: L }, t;
}
let _i, Ee, As;
const Di = { env: { emscripten_notify_memory_growth: function(c) {
  As = new Uint8Array(Ee.exports.memory.buffer);
} } };
let Rl = class {
  init() {
    return _i || (_i = typeof fetch < "u" ? fetch("data:application/wasm;base64," + nn).then((e) => e.arrayBuffer()).then((e) => WebAssembly.instantiate(e, Di)).then(this._init) : WebAssembly.instantiate(Buffer.from(nn, "base64"), Di).then(this._init), _i);
  }
  _init(e) {
    Ee = e.instance, Di.env.emscripten_notify_memory_growth(0);
  }
  decode(e, t = 0) {
    if (!Ee) throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const i = e.byteLength, s = Ee.exports.malloc(i);
    As.set(e, s), t = t || Number(Ee.exports.ZSTD_findDecompressedSize(s, i));
    const n = Ee.exports.malloc(t), r = Ee.exports.ZSTD_decompress(n, t, s, i), o = As.slice(n, n + r);
    return Ee.exports.free(s), Ee.exports.free(n), o;
  }
};
const nn = "AGFzbQEAAAABpQEVYAF/AX9gAn9/AGADf39/AX9gBX9/f39/AX9gAX8AYAJ/fwF/YAR/f39/AX9gA39/fwBgBn9/f39/fwF/YAd/f39/f39/AX9gAn9/AX5gAn5+AX5gAABgBX9/f39/AGAGf39/f39/AGAIf39/f39/f38AYAl/f39/f39/f38AYAABf2AIf39/f39/f38Bf2ANf39/f39/f39/f39/fwF/YAF/AX4CJwEDZW52H2Vtc2NyaXB0ZW5fbm90aWZ5X21lbW9yeV9ncm93dGgABANpaAEFAAAFAgEFCwACAQABAgIFBQcAAwABDgsBAQcAEhMHAAUBDAQEAAANBwQCAgYCBAgDAwMDBgEACQkHBgICAAYGAgQUBwYGAwIGAAMCAQgBBwUGCgoEEQAEBAEIAwgDBQgDEA8IAAcABAUBcAECAgUEAQCAAgYJAX8BQaCgwAILB2AHBm1lbW9yeQIABm1hbGxvYwAoBGZyZWUAJgxaU1REX2lzRXJyb3IAaBlaU1REX2ZpbmREZWNvbXByZXNzZWRTaXplAFQPWlNURF9kZWNvbXByZXNzAEoGX3N0YXJ0ACQJBwEAQQELASQKussBaA8AIAAgACgCBCABajYCBAsZACAAKAIAIAAoAgRBH3F0QQAgAWtBH3F2CwgAIABBiH9LC34BBH9BAyEBIAAoAgQiA0EgTQRAIAAoAggiASAAKAIQTwRAIAAQDQ8LIAAoAgwiAiABRgRAQQFBAiADQSBJGw8LIAAgASABIAJrIANBA3YiBCABIARrIAJJIgEbIgJrIgQ2AgggACADIAJBA3RrNgIEIAAgBCgAADYCAAsgAQsUAQF/IAAgARACIQIgACABEAEgAgv3AQECfyACRQRAIABCADcCACAAQQA2AhAgAEIANwIIQbh/DwsgACABNgIMIAAgAUEEajYCECACQQRPBEAgACABIAJqIgFBfGoiAzYCCCAAIAMoAAA2AgAgAUF/ai0AACIBBEAgAEEIIAEQFGs2AgQgAg8LIABBADYCBEF/DwsgACABNgIIIAAgAS0AACIDNgIAIAJBfmoiBEEBTQRAIARBAWtFBEAgACABLQACQRB0IANyIgM2AgALIAAgAS0AAUEIdCADajYCAAsgASACakF/ai0AACIBRQRAIABBADYCBEFsDwsgAEEoIAEQFCACQQN0ams2AgQgAgsWACAAIAEpAAA3AAAgACABKQAINwAICy8BAX8gAUECdEGgHWooAgAgACgCAEEgIAEgACgCBGprQR9xdnEhAiAAIAEQASACCyEAIAFCz9bTvtLHq9lCfiAAfEIfiUKHla+vmLbem55/fgsdAQF/IAAoAgggACgCDEYEfyAAKAIEQSBGBUEACwuCBAEDfyACQYDAAE8EQCAAIAEgAhBnIAAPCyAAIAJqIQMCQCAAIAFzQQNxRQRAAkAgAkEBSARAIAAhAgwBCyAAQQNxRQRAIAAhAgwBCyAAIQIDQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADTw0BIAJBA3ENAAsLAkAgA0F8cSIEQcAASQ0AIAIgBEFAaiIFSw0AA0AgAiABKAIANgIAIAIgASgCBDYCBCACIAEoAgg2AgggAiABKAIMNgIMIAIgASgCEDYCECACIAEoAhQ2AhQgAiABKAIYNgIYIAIgASgCHDYCHCACIAEoAiA2AiAgAiABKAIkNgIkIAIgASgCKDYCKCACIAEoAiw2AiwgAiABKAIwNgIwIAIgASgCNDYCNCACIAEoAjg2AjggAiABKAI8NgI8IAFBQGshASACQUBrIgIgBU0NAAsLIAIgBE8NAQNAIAIgASgCADYCACABQQRqIQEgAkEEaiICIARJDQALDAELIANBBEkEQCAAIQIMAQsgA0F8aiIEIABJBEAgACECDAELIAAhAgNAIAIgAS0AADoAACACIAEtAAE6AAEgAiABLQACOgACIAIgAS0AAzoAAyABQQRqIQEgAkEEaiICIARNDQALCyACIANJBEADQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADRw0ACwsgAAsMACAAIAEpAAA3AAALQQECfyAAKAIIIgEgACgCEEkEQEEDDwsgACAAKAIEIgJBB3E2AgQgACABIAJBA3ZrIgE2AgggACABKAAANgIAQQALDAAgACABKAIANgAAC/cCAQJ/AkAgACABRg0AAkAgASACaiAASwRAIAAgAmoiBCABSw0BCyAAIAEgAhALDwsgACABc0EDcSEDAkACQCAAIAFJBEAgAwRAIAAhAwwDCyAAQQNxRQRAIAAhAwwCCyAAIQMDQCACRQ0EIAMgAS0AADoAACABQQFqIQEgAkF/aiECIANBAWoiA0EDcQ0ACwwBCwJAIAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQhBSAGQQR2IQRBICAAdCIAQQFyIQkgASgCACEPQQAhAiADIQYCQANAIAlBAkggAiAPS3JFBEAgAiEHAkAgCARAA0AgBEH//wNxQf//A0YEQCAHQRhqIQcgBiAQSQR/IAZBAmoiBigAACAFdgUgBUEQaiEFIARBEHYLIQQMAQsLA0AgBEEDcSIIQQNGBEAgBUECaiEFIARBAnYhBCAHQQNqIQcMAQsLIAcgCGoiByAPSw0EIAVBAmohBQNAIAIgB0kEQCANIAJBAXRqQQA7AQAgAkEBaiECDAELCyAGIA5LQQAgBiAFQQN1aiIHIAxLG0UEQCAHKAAAIAVBB3EiBXYhBAwCCyAEQQJ2IQQLIAYhBwsCfyALQX9qIAQgAEF/anEiBiAAQQF0QX9qIgggCWsiEUkNABogBCAIcSIEQQAgESAEIABIG2shBiALCyEIIA0gAkEBdGogBkF/aiIEOwEAIAlBASAGayAEIAZBAUgbayEJA0AgCSAASARAIABBAXUhACALQX9qIQsMAQsLAn8gByAOS0EAIAcgBSAIaiIFQQN1aiIGIAxLG0UEQCAFQQdxDAELIAUgDCIGIAdrQQN0awshBSACQQFqIQIgBEUhCCAGKAAAIAVBH3F2IQQMAQsLQWwgCUEBRyAFQSBKcg0BGiABIAJBf2o2AgAgBiAFQQdqQQN1aiADawwBC0FQCyEAIApBEGokACAACwkAQQFBBSAAGwsMACAAIAEoAAA2AAALqgMBCn8jAEHwAGsiCiQAIAJBAWohDiAAQQhqIQtBgIAEIAVBf2p0QRB1IQxBACECQQEhBkEBIAV0IglBf2oiDyEIA0AgAiAORkUEQAJAIAEgAkEBdCINai8BACIHQf//A0YEQCALIAhBA3RqIAI2AgQgCEF/aiEIQQEhBwwBCyAGQQAgDCAHQRB0QRB1ShshBgsgCiANaiAHOwEAIAJBAWohAgwBCwsgACAFNgIEIAAgBjYCACAJQQN2IAlBAXZqQQNqIQxBACEAQQAhBkEAIQIDQCAGIA5GBEADQAJAIAAgCUYNACAKIAsgAEEDdGoiASgCBCIGQQF0aiICIAIvAQAiAkEBajsBACABIAUgAhAUayIIOgADIAEgAiAIQf8BcXQgCWs7AQAgASAEIAZBAnQiAmooAgA6AAIgASACIANqKAIANgIEIABBAWohAAwBCwsFIAEgBkEBdGouAQAhDUEAIQcDQCAHIA1ORQRAIAsgAkEDdGogBjYCBANAIAIgDGogD3EiAiAISw0ACyAHQQFqIQcMAQsLIAZBAWohBgwBCwsgCkHwAGokAAsjAEIAIAEQCSAAhUKHla+vmLbem55/fkLj3MqV/M7y9YV/fAsQACAAQn43AwggACABNgIACyQBAX8gAARAIAEoAgQiAgRAIAEoAgggACACEQEADwsgABAmCwsfACAAIAEgAi8BABAINgIAIAEQBBogACACQQRqNgIEC0oBAX9BoCAoAgAiASAAaiIAQX9MBEBBiCBBMDYCAEF/DwsCQCAAPwBBEHRNDQAgABBmDQBBiCBBMDYCAEF/DwtBoCAgADYCACABC9cBAQh/Qbp/IQoCQCACKAIEIgggAigCACIJaiIOIAEgAGtLDQBBbCEKIAkgBCADKAIAIgtrSw0AIAAgCWoiBCACKAIIIgxrIQ0gACABQWBqIg8gCyAJQQAQKSADIAkgC2o2AgACQAJAIAwgBCAFa00EQCANIQUMAQsgDCAEIAZrSw0CIAcgDSAFayIAaiIBIAhqIAdNBEAgBCABIAgQDxoMAgsgBCABQQAgAGsQDyEBIAIgACAIaiIINgIEIAEgAGshBAsgBCAPIAUgCEEBECkLIA4hCgsgCgubAgEBfyMAQYABayINJAAgDSADNgJ8AkAgAkEDSwRAQX8hCQwBCwJAAkACQAJAIAJBAWsOAwADAgELIAZFBEBBuH8hCQwEC0FsIQkgBS0AACICIANLDQMgACAHIAJBAnQiAmooAgAgAiAIaigCABA7IAEgADYCAEEBIQkMAwsgASAJNgIAQQAhCQwCCyAKRQRAQWwhCQwCC0EAIQkgC0UgDEEZSHINAUEIIAR0QQhqIQBBACECA0AgAiAATw0CIAJBQGshAgwAAAsAC0FsIQkgDSANQfwAaiANQfgAaiAFIAYQFSICEAMNACANKAJ4IgMgBEsNACAAIA0gDSgCfCAHIAggAxAYIAEgADYCACACIQkLIA1BgAFqJAAgCQsLACAAIAEgAhALGgsQACAALwAAIAAtAAJBEHRyCy8AAn9BuH8gAUEISQ0AGkFyIAAoAAQiAEF3Sw0AGkG4fyAAQQhqIgAgACABSxsLCwkAIAAgATsAAAsDAAELigYBBX8gACAAKAIAIgVBfnE2AgBBACAAIAVBAXZqQYQgKAIAIgQgAEYbIQECQAJAIAAoAgQiAkUNACACKAIAIgNBAXENACACQQhqIgUgA0EBdkF4aiIDQQggA0EISxtnQR9zQQJ0QYAfaiIDKAIARgRAIAMgAigCDDYCAAsgAigCCCIDBEAgAyACKAIMNgIECyACKAIMIgMEQCADIAIoAgg2AgALIAIgAigCACAAKAIAQX5xajYCAEGEICEAAkACQCABRQ0AIAEgAjYCBCABKAIAIgNBAXENASADQQF2QXhqIgNBCCADQQhLG2dBH3NBAnRBgB9qIgMoAgAgAUEIakYEQCADIAEoAgw2AgALIAEoAggiAwRAIAMgASgCDDYCBAsgASgCDCIDBEAgAyABKAIINgIAQYQgKAIAIQQLIAIgAigCACABKAIAQX5xajYCACABIARGDQAgASABKAIAQQF2akEEaiEACyAAIAI2AgALIAIoAgBBAXZBeGoiAEEIIABBCEsbZ0Efc0ECdEGAH2oiASgCACEAIAEgBTYCACACIAA2AgwgAkEANgIIIABFDQEgACAFNgIADwsCQCABRQ0AIAEoAgAiAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAigCACABQQhqRgRAIAIgASgCDDYCAAsgASgCCCICBEAgAiABKAIMNgIECyABKAIMIgIEQCACIAEoAgg2AgBBhCAoAgAhBAsgACAAKAIAIAEoAgBBfnFqIgI2AgACQCABIARHBEAgASABKAIAQQF2aiAANgIEIAAoAgAhAgwBC0GEICAANgIACyACQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgIoAgAhASACIABBCGoiAjYCACAAIAE2AgwgAEEANgIIIAFFDQEgASACNgIADwsgBUEBdkF4aiIBQQggAUEISxtnQR9zQQJ0QYAfaiICKAIAIQEgAiAAQQhqIgI2AgAgACABNgIMIABBADYCCCABRQ0AIAEgAjYCAAsLDgAgAARAIABBeGoQJQsLgAIBA38CQCAAQQ9qQXhxQYQgKAIAKAIAQQF2ayICEB1Bf0YNAAJAQYQgKAIAIgAoAgAiAUEBcQ0AIAFBAXZBeGoiAUEIIAFBCEsbZ0Efc0ECdEGAH2oiASgCACAAQQhqRgRAIAEgACgCDDYCAAsgACgCCCIBBEAgASAAKAIMNgIECyAAKAIMIgFFDQAgASAAKAIINgIAC0EBIQEgACAAKAIAIAJBAXRqIgI2AgAgAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAygCACECIAMgAEEIaiIDNgIAIAAgAjYCDCAAQQA2AgggAkUNACACIAM2AgALIAELtwIBA38CQAJAIABBASAAGyICEDgiAA0AAkACQEGEICgCACIARQ0AIAAoAgAiA0EBcQ0AIAAgA0EBcjYCACADQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgAgAEEIakYEQCABIAAoAgw2AgALIAAoAggiAQRAIAEgACgCDDYCBAsgACgCDCIBBEAgASAAKAIINgIACyACECchAkEAIQFBhCAoAgAhACACDQEgACAAKAIAQX5xNgIAQQAPCyACQQ9qQXhxIgMQHSICQX9GDQIgAkEHakF4cSIAIAJHBEAgACACaxAdQX9GDQMLAkBBhCAoAgAiAUUEQEGAICAANgIADAELIAAgATYCBAtBhCAgADYCACAAIANBAXRBAXI2AgAMAQsgAEUNAQsgAEEIaiEBCyABC7kDAQJ/IAAgA2ohBQJAIANBB0wEQANAIAAgBU8NAiAAIAItAAA6AAAgAEEBaiEAIAJBAWohAgwAAAsACyAEQQFGBEACQCAAIAJrIgZBB00EQCAAIAItAAA6AAAgACACLQABOgABIAAgAi0AAjoAAiAAIAItAAM6AAMgAEEEaiACIAZBAnQiBkHAHmooAgBqIgIQFyACIAZB4B5qKAIAayECDAELIAAgAhAMCyACQQhqIQIgAEEIaiEACwJAAkACQAJAIAUgAU0EQCAAIANqIQEgBEEBRyAAIAJrQQ9Kcg0BA0AgACACEAwgAkEIaiECIABBCGoiACABSQ0ACwwFCyAAIAFLBEAgACEBDAQLIARBAUcgACACa0EPSnINASAAIQMgAiEEA0AgAyAEEAwgBEEIaiEEIANBCGoiAyABSQ0ACwwCCwNAIAAgAhAHIAJBEGohAiAAQRBqIgAgAUkNAAsMAwsgACEDIAIhBANAIAMgBBAHIARBEGohBCADQRBqIgMgAUkNAAsLIAIgASAAa2ohAgsDQCABIAVPDQEgASACLQAAOgAAIAFBAWohASACQQFqIQIMAAALAAsLQQECfyAAIAAoArjgASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigCACACaiAAQQZ2IgFBAnRBsB5qKAIAaiAAQSBxIgBFaiABRSAAQQV2cWoFQbh/CwsdACAAKAKQ4gEQWiAAQQA2AqDiASAAQgA3A5DiAQu1AwEFfyMAQZACayIKJABBuH8hBgJAIAVFDQAgBCwAACIIQf8BcSEHAkAgCEF/TARAIAdBgn9qQQF2IgggBU8NAkFsIQYgB0GBf2oiBUGAAk8NAiAEQQFqIQdBACEGA0AgBiAFTwRAIAUhBiAIIQcMAwUgACAGaiAHIAZBAXZqIgQtAABBBHY6AAAgACAGQQFyaiAELQAAQQ9xOgAAIAZBAmohBgwBCwAACwALIAcgBU8NASAAIARBAWogByAKEFMiBhADDQELIAYhBEEAIQYgAUEAQTQQECEJQQAhBQNAIAQgBkcEQCAAIAZqIggtAAAiAUELSwRAQWwhBgwDBSAJIAFBAnRqIgEgASgCAEEBajYCACAGQQFqIQZBASAILQAAdEEBdSAFaiEFDAILAAsLQWwhBiAFRQ0AIAUQFEEBaiIBQQxLDQAgAyABNgIAQQFBASABdCAFayIDEBQiAXQgA0cNACAAIARqIAFBAWoiADoAACAJIABBAnRqIgAgACgCAEEBajYCACAJKAIEIgBBAkkgAEEBcXINACACIARBAWo2AgAgB0EBaiEGCyAKQZACaiQAIAYLxhEBDH8jAEHwAGsiBSQAQWwhCwJAIANBCkkNACACLwAAIQogAi8AAiEJIAIvAAQhByAFQQhqIAQQDgJAIAMgByAJIApqakEGaiIMSQ0AIAUtAAohCCAFQdgAaiACQQZqIgIgChAGIgsQAw0BIAVBQGsgAiAKaiICIAkQBiILEAMNASAFQShqIAIgCWoiAiAHEAYiCxADDQEgBUEQaiACIAdqIAMgDGsQBiILEAMNASAAIAFqIg9BfWohECAEQQRqIQZBASELIAAgAUEDakECdiIDaiIMIANqIgIgA2oiDiEDIAIhBCAMIQcDQCALIAMgEElxBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgCS0AAyELIAcgBiAFQUBrIAgQAkECdGoiCS8BADsAACAFQUBrIAktAAIQASAJLQADIQogBCAGIAVBKGogCBACQQJ0aiIJLwEAOwAAIAVBKGogCS0AAhABIAktAAMhCSADIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgDS0AAyENIAAgC2oiCyAGIAVB2ABqIAgQAkECdGoiAC8BADsAACAFQdgAaiAALQACEAEgAC0AAyEAIAcgCmoiCiAGIAVBQGsgCBACQQJ0aiIHLwEAOwAAIAVBQGsgBy0AAhABIActAAMhByAEIAlqIgkgBiAFQShqIAgQAkECdGoiBC8BADsAACAFQShqIAQtAAIQASAELQADIQQgAyANaiIDIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgACALaiEAIAcgCmohByAEIAlqIQQgAyANLQADaiEDIAVB2ABqEA0gBUFAaxANciAFQShqEA1yIAVBEGoQDXJFIQsMAQsLIAQgDksgByACS3INAEFsIQsgACAMSw0BIAxBfWohCQNAQQAgACAJSSAFQdgAahAEGwRAIAAgBiAFQdgAaiAIEAJBAnRqIgovAQA7AAAgBUHYAGogCi0AAhABIAAgCi0AA2oiACAGIAVB2ABqIAgQAkECdGoiCi8BADsAACAFQdgAaiAKLQACEAEgACAKLQADaiEADAEFIAxBfmohCgNAIAVB2ABqEAQgACAKS3JFBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgACAJLQADaiEADAELCwNAIAAgCk0EQCAAIAYgBUHYAGogCBACQQJ0aiIJLwEAOwAAIAVB2ABqIAktAAIQASAAIAktAANqIQAMAQsLAkAgACAMTw0AIAAgBiAFQdgAaiAIEAIiAEECdGoiDC0AADoAACAMLQADQQFGBEAgBUHYAGogDC0AAhABDAELIAUoAlxBH0sNACAFQdgAaiAGIABBAnRqLQACEAEgBSgCXEEhSQ0AIAVBIDYCXAsgAkF9aiEMA0BBACAHIAxJIAVBQGsQBBsEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiIAIAYgBUFAayAIEAJBAnRqIgcvAQA7AAAgBUFAayAHLQACEAEgACAHLQADaiEHDAEFIAJBfmohDANAIAVBQGsQBCAHIAxLckUEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwNAIAcgDE0EQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwJAIAcgAk8NACAHIAYgBUFAayAIEAIiAEECdGoiAi0AADoAACACLQADQQFGBEAgBUFAayACLQACEAEMAQsgBSgCREEfSw0AIAVBQGsgBiAAQQJ0ai0AAhABIAUoAkRBIUkNACAFQSA2AkQLIA5BfWohAgNAQQAgBCACSSAFQShqEAQbBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2oiACAGIAVBKGogCBACQQJ0aiIELwEAOwAAIAVBKGogBC0AAhABIAAgBC0AA2ohBAwBBSAOQX5qIQIDQCAFQShqEAQgBCACS3JFBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsDQCAEIAJNBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsCQCAEIA5PDQAgBCAGIAVBKGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBKGogAi0AAhABDAELIAUoAixBH0sNACAFQShqIAYgAEECdGotAAIQASAFKAIsQSFJDQAgBUEgNgIsCwNAQQAgAyAQSSAFQRBqEAQbBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2oiACAGIAVBEGogCBACQQJ0aiICLwEAOwAAIAVBEGogAi0AAhABIAAgAi0AA2ohAwwBBSAPQX5qIQIDQCAFQRBqEAQgAyACS3JFBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsDQCADIAJNBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsCQCADIA9PDQAgAyAGIAVBEGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBEGogAi0AAhABDAELIAUoAhRBH0sNACAFQRBqIAYgAEECdGotAAIQASAFKAIUQSFJDQAgBUEgNgIUCyABQWwgBUHYAGoQCiAFQUBrEApxIAVBKGoQCnEgBUEQahAKcRshCwwJCwAACwALAAALAAsAAAsACwAACwALQWwhCwsgBUHwAGokACALC7UEAQ5/IwBBEGsiBiQAIAZBBGogABAOQVQhBQJAIARB3AtJDQAgBi0ABCEHIANB8ARqQQBB7AAQECEIIAdBDEsNACADQdwJaiIJIAggBkEIaiAGQQxqIAEgAhAxIhAQA0UEQCAGKAIMIgQgB0sNASADQdwFaiEPIANBpAVqIREgAEEEaiESIANBqAVqIQEgBCEFA0AgBSICQX9qIQUgCCACQQJ0aigCAEUNAAsgAkEBaiEOQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgASALaiAKNgIAIAVBAWohBSAKIAxqIQoMAQsLIAEgCjYCAEEAIQUgBigCCCELA0AgBSALRkUEQCABIAUgCWotAAAiDEECdGoiDSANKAIAIg1BAWo2AgAgDyANQQF0aiINIAw6AAEgDSAFOgAAIAVBAWohBQwBCwtBACEBIANBADYCqAUgBEF/cyAHaiEJQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgAyALaiABNgIAIAwgBSAJanQgAWohASAFQQFqIQUMAQsLIAcgBEEBaiIBIAJrIgRrQQFqIQgDQEEBIQUgBCAIT0UEQANAIAUgDk9FBEAgBUECdCIJIAMgBEE0bGpqIAMgCWooAgAgBHY2AgAgBUEBaiEFDAELCyAEQQFqIQQMAQsLIBIgByAPIAogESADIAIgARBkIAZBAToABSAGIAc6AAYgACAGKAIENgIACyAQIQULIAZBEGokACAFC8ENAQt/IwBB8ABrIgUkAEFsIQkCQCADQQpJDQAgAi8AACEKIAIvAAIhDCACLwAEIQYgBUEIaiAEEA4CQCADIAYgCiAMampBBmoiDUkNACAFLQAKIQcgBUHYAGogAkEGaiICIAoQBiIJEAMNASAFQUBrIAIgCmoiAiAMEAYiCRADDQEgBUEoaiACIAxqIgIgBhAGIgkQAw0BIAVBEGogAiAGaiADIA1rEAYiCRADDQEgACABaiIOQX1qIQ8gBEEEaiEGQQEhCSAAIAFBA2pBAnYiAmoiCiACaiIMIAJqIg0hAyAMIQQgCiECA0AgCSADIA9JcQRAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAACAGIAVBQGsgBxACQQF0aiIILQAAIQsgBUFAayAILQABEAEgAiALOgAAIAYgBUEoaiAHEAJBAXRqIggtAAAhCyAFQShqIAgtAAEQASAEIAs6AAAgBiAFQRBqIAcQAkEBdGoiCC0AACELIAVBEGogCC0AARABIAMgCzoAACAGIAVB2ABqIAcQAkEBdGoiCC0AACELIAVB2ABqIAgtAAEQASAAIAs6AAEgBiAFQUBrIAcQAkEBdGoiCC0AACELIAVBQGsgCC0AARABIAIgCzoAASAGIAVBKGogBxACQQF0aiIILQAAIQsgBUEoaiAILQABEAEgBCALOgABIAYgBUEQaiAHEAJBAXRqIggtAAAhCyAFQRBqIAgtAAEQASADIAs6AAEgA0ECaiEDIARBAmohBCACQQJqIQIgAEECaiEAIAkgBUHYAGoQDUVxIAVBQGsQDUVxIAVBKGoQDUVxIAVBEGoQDUVxIQkMAQsLIAQgDUsgAiAMS3INAEFsIQkgACAKSw0BIApBfWohCQNAIAVB2ABqEAQgACAJT3JFBEAgBiAFQdgAaiAHEAJBAXRqIggtAAAhCyAFQdgAaiAILQABEAEgACALOgAAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAASAAQQJqIQAMAQsLA0AgBUHYAGoQBCAAIApPckUEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCwNAIAAgCkkEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCyAMQX1qIQADQCAFQUBrEAQgAiAAT3JFBEAgBiAFQUBrIAcQAkEBdGoiCi0AACEJIAVBQGsgCi0AARABIAIgCToAACAGIAVBQGsgBxACQQF0aiIKLQAAIQkgBUFAayAKLQABEAEgAiAJOgABIAJBAmohAgwBCwsDQCAFQUBrEAQgAiAMT3JFBEAgBiAFQUBrIAcQAkEBdGoiAC0AACEKIAVBQGsgAC0AARABIAIgCjoAACACQQFqIQIMAQsLA0AgAiAMSQRAIAYgBUFAayAHEAJBAXRqIgAtAAAhCiAFQUBrIAAtAAEQASACIAo6AAAgAkEBaiECDAELCyANQX1qIQADQCAFQShqEAQgBCAAT3JFBEAgBiAFQShqIAcQAkEBdGoiAi0AACEKIAVBKGogAi0AARABIAQgCjoAACAGIAVBKGogBxACQQF0aiICLQAAIQogBUEoaiACLQABEAEgBCAKOgABIARBAmohBAwBCwsDQCAFQShqEAQgBCANT3JFBEAgBiAFQShqIAcQAkEBdGoiAC0AACECIAVBKGogAC0AARABIAQgAjoAACAEQQFqIQQMAQsLA0AgBCANSQRAIAYgBUEoaiAHEAJBAXRqIgAtAAAhAiAFQShqIAAtAAEQASAEIAI6AAAgBEEBaiEEDAELCwNAIAVBEGoQBCADIA9PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIAYgBUEQaiAHEAJBAXRqIgAtAAAhAiAFQRBqIAAtAAEQASADIAI6AAEgA0ECaiEDDAELCwNAIAVBEGoQBCADIA5PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIANBAWohAwwBCwsDQCADIA5JBEAgBiAFQRBqIAcQAkEBdGoiAC0AACECIAVBEGogAC0AARABIAMgAjoAACADQQFqIQMMAQsLIAFBbCAFQdgAahAKIAVBQGsQCnEgBUEoahAKcSAFQRBqEApxGyEJDAELQWwhCQsgBUHwAGokACAJC8oCAQR/IwBBIGsiBSQAIAUgBBAOIAUtAAIhByAFQQhqIAIgAxAGIgIQA0UEQCAEQQRqIQIgACABaiIDQX1qIQQDQCAFQQhqEAQgACAET3JFBEAgAiAFQQhqIAcQAkEBdGoiBi0AACEIIAVBCGogBi0AARABIAAgCDoAACACIAVBCGogBxACQQF0aiIGLQAAIQggBUEIaiAGLQABEAEgACAIOgABIABBAmohAAwBCwsDQCAFQQhqEAQgACADT3JFBEAgAiAFQQhqIAcQAkEBdGoiBC0AACEGIAVBCGogBC0AARABIAAgBjoAACAAQQFqIQAMAQsLA0AgACADT0UEQCACIAVBCGogBxACQQF0aiIELQAAIQYgBUEIaiAELQABEAEgACAGOgAAIABBAWohAAwBCwsgAUFsIAVBCGoQChshAgsgBUEgaiQAIAILtgMBCX8jAEEQayIGJAAgBkEANgIMIAZBADYCCEFUIQQCQAJAIANBQGsiDCADIAZBCGogBkEMaiABIAIQMSICEAMNACAGQQRqIAAQDiAGKAIMIgcgBi0ABEEBaksNASAAQQRqIQogBkEAOgAFIAYgBzoABiAAIAYoAgQ2AgAgB0EBaiEJQQEhBANAIAQgCUkEQCADIARBAnRqIgEoAgAhACABIAU2AgAgACAEQX9qdCAFaiEFIARBAWohBAwBCwsgB0EBaiEHQQAhBSAGKAIIIQkDQCAFIAlGDQEgAyAFIAxqLQAAIgRBAnRqIgBBASAEdEEBdSILIAAoAgAiAWoiADYCACAHIARrIQhBACEEAkAgC0EDTQRAA0AgBCALRg0CIAogASAEakEBdGoiACAIOgABIAAgBToAACAEQQFqIQQMAAALAAsDQCABIABPDQEgCiABQQF0aiIEIAg6AAEgBCAFOgAAIAQgCDoAAyAEIAU6AAIgBCAIOgAFIAQgBToABCAEIAg6AAcgBCAFOgAGIAFBBGohAQwAAAsACyAFQQFqIQUMAAALAAsgAiEECyAGQRBqJAAgBAutAQECfwJAQYQgKAIAIABHIAAoAgBBAXYiAyABa0F4aiICQXhxQQhHcgR/IAIFIAMQJ0UNASACQQhqC0EQSQ0AIAAgACgCACICQQFxIAAgAWpBD2pBeHEiASAAa0EBdHI2AgAgASAANgIEIAEgASgCAEEBcSAAIAJBAXZqIAFrIgJBAXRyNgIAQYQgIAEgAkH/////B3FqQQRqQYQgKAIAIABGGyABNgIAIAEQJQsLygIBBX8CQAJAAkAgAEEIIABBCEsbZ0EfcyAAaUEBR2oiAUEESSAAIAF2cg0AIAFBAnRB/B5qKAIAIgJFDQADQCACQXhqIgMoAgBBAXZBeGoiBSAATwRAIAIgBUEIIAVBCEsbZ0Efc0ECdEGAH2oiASgCAEYEQCABIAIoAgQ2AgALDAMLIARBHksNASAEQQFqIQQgAigCBCICDQALC0EAIQMgAUEgTw0BA0AgAUECdEGAH2ooAgAiAkUEQCABQR5LIQIgAUEBaiEBIAJFDQEMAwsLIAIgAkF4aiIDKAIAQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgBGBEAgASACKAIENgIACwsgAigCACIBBEAgASACKAIENgIECyACKAIEIgEEQCABIAIoAgA2AgALIAMgAygCAEEBcjYCACADIAAQNwsgAwvhCwINfwV+IwBB8ABrIgckACAHIAAoAvDhASIINgJcIAEgAmohDSAIIAAoAoDiAWohDwJAAkAgBUUEQCABIQQMAQsgACgCxOABIRAgACgCwOABIREgACgCvOABIQ4gAEEBNgKM4QFBACEIA0AgCEEDRwRAIAcgCEECdCICaiAAIAJqQazQAWooAgA2AkQgCEEBaiEIDAELC0FsIQwgB0EYaiADIAQQBhADDQEgB0EsaiAHQRhqIAAoAgAQEyAHQTRqIAdBGGogACgCCBATIAdBPGogB0EYaiAAKAIEEBMgDUFgaiESIAEhBEEAIQwDQCAHKAIwIAcoAixBA3RqKQIAIhRCEIinQf8BcSEIIAcoAkAgBygCPEEDdGopAgAiFUIQiKdB/wFxIQsgBygCOCAHKAI0QQN0aikCACIWQiCIpyEJIBVCIIghFyAUQiCIpyECAkAgFkIQiKdB/wFxIgNBAk8EQAJAIAZFIANBGUlyRQRAIAkgB0EYaiADQSAgBygCHGsiCiAKIANLGyIKEAUgAyAKayIDdGohCSAHQRhqEAQaIANFDQEgB0EYaiADEAUgCWohCQwBCyAHQRhqIAMQBSAJaiEJIAdBGGoQBBoLIAcpAkQhGCAHIAk2AkQgByAYNwNIDAELAkAgA0UEQCACBEAgBygCRCEJDAMLIAcoAkghCQwBCwJAAkAgB0EYakEBEAUgCSACRWpqIgNBA0YEQCAHKAJEQX9qIgMgA0VqIQkMAQsgA0ECdCAHaigCRCIJIAlFaiEJIANBAUYNAQsgByAHKAJINgJMCwsgByAHKAJENgJIIAcgCTYCRAsgF6chAyALBEAgB0EYaiALEAUgA2ohAwsgCCALakEUTwRAIAdBGGoQBBoLIAgEQCAHQRhqIAgQBSACaiECCyAHQRhqEAQaIAcgB0EYaiAUQhiIp0H/AXEQCCAUp0H//wNxajYCLCAHIAdBGGogFUIYiKdB/wFxEAggFadB//8DcWo2AjwgB0EYahAEGiAHIAdBGGogFkIYiKdB/wFxEAggFqdB//8DcWo2AjQgByACNgJgIAcoAlwhCiAHIAk2AmggByADNgJkAkACQAJAIAQgAiADaiILaiASSw0AIAIgCmoiEyAPSw0AIA0gBGsgC0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdBKGogACgCBBATQQAhBCAHQeAAaiEMIAdB5ABqIQoDQCAHQShqEARBAksgBCAXTnJFBEAgBygCQCAHKAI8QQN0aikCACIdQhCIp0H/AXEhCyAHKAJQIAcoAkxBA3RqKQIAIh5CEIinQf8BcSEJIAcoAkggBygCREEDdGopAgAiH0IgiKchCCAeQiCIISAgHUIgiKchAgJAIB9CEIinQf8BcSIDQQJPBEACQCAGRSADQRlJckUEQCAIIAdBKGogA0EgIAcoAixrIg0gDSADSxsiDRAFIAMgDWsiA3RqIQggB0EoahAEGiADRQ0BIAdBKGogAxAFIAhqIQgMAQsgB0EoaiADEAUgCGohCCAHQShqEAQaCyAHKQJUISEgByAINgJUIAcgITcDWAwBCwJAIANFBEAgAgRAIAcoAlQhCAwDCyAHKAJYIQgMAQsCQAJAIAdBKGpBARAFIAggAkVqaiIDQQNGBEAgBygCVEF/aiIDIANFaiEIDAELIANBAnQgB2ooAlQiCCAIRWohCCADQQFGDQELIAcgBygCWDYCXAsLIAcgBygCVDYCWCAHIAg2AlQLICCnIQMgCQRAIAdBKGogCRAFIANqIQMLIAkgC2pBFE8EQCAHQShqEAQaCyALBEAgB0EoaiALEAUgAmohAgsgB0EoahAEGiAHIAcoAmggAmoiCSADajYCaCAKIAwgCCAJSxsoAgAhDSAHIAdBKGogHUIYiKdB/wFxEAggHadB//8DcWo2AjwgByAHQShqIB5CGIinQf8BcRAIIB6nQf//A3FqNgJMIAdBKGoQBBogB0EoaiAfQhiIp0H/AXEQCCEOIAdB8ABqIARBBHRqIgsgCSANaiAIazYCDCALIAg2AgggCyADNgIEIAsgAjYCACAHIA4gH6dB//8DcWo2AkQgBEEBaiEEDAELCyAEIBdIDQEgEkFgaiEYIAdB4ABqIRogB0HkAGohGyABIQMDQCAHQShqEARBAksgBCAFTnJFBEAgBygCQCAHKAI8QQN0aikCACIdQhCIp0H/AXEhCyAHKAJQIAcoAkxBA3RqKQIAIh5CEIinQf8BcSEIIAcoAkggBygCREEDdGopAgAiH0IgiKchCSAeQiCIISAgHUIgiKchDAJAIB9CEIinQf8BcSICQQJPBEACQCAGRSACQRlJckUEQCAJIAdBKGogAkEgIAcoAixrIgogCiACSxsiChAFIAIgCmsiAnRqIQkgB0EoahAEGiACRQ0BIAdBKGogAhAFIAlqIQkMAQsgB0EoaiACEAUgCWohCSAHQShqEAQaCyAHKQJUISEgByAJNgJUIAcgITcDWAwBCwJAIAJFBEAgDARAIAcoAlQhCQwDCyAHKAJYIQkMAQsCQAJAIAdBKGpBARAFIAkgDEVqaiICQQNGBEAgBygCVEF/aiICIAJFaiEJDAELIAJBAnQgB2ooAlQiCSAJRWohCSACQQFGDQELIAcgBygCWDYCXAsLIAcgBygCVDYCWCAHIAk2AlQLICCnIRQgCARAIAdBKGogCBAFIBRqIRQLIAggC2pBFE8EQCAHQShqEAQaCyALBEAgB0EoaiALEAUgDGohDAsgB0EoahAEGiAHIAcoAmggDGoiGSAUajYCaCAbIBogCSAZSxsoAgAhHCAHIAdBKGogHUIYiKdB/wFxEAggHadB//8DcWo2AjwgByAHQShqIB5CGIinQf8BcRAIIB6nQf//A3FqNgJMIAdBKGoQBBogByAHQShqIB9CGIinQf8BcRAIIB+nQf//A3FqNgJEIAcgB0HwAGogBEEDcUEEdGoiDSkDCCIdNwPIASAHIA0pAwAiHjcDwAECQAJAAkAgBygCvAEiDiAepyICaiIWIBNLDQAgAyAHKALEASIKIAJqIgtqIBhLDQAgEiADayALQSBqTw0BCyAHIAcpA8gBNwMQIAcgBykDwAE3AwggAyASIAdBCGogB0G8AWogEyAPIBUgERAeIQsMAQsgAiADaiEIIAMgDhAHIAJBEU8EQCADQRBqIQIDQCACIA5BEGoiDhAHIAJBEGoiAiAISQ0ACwsgCCAdpyIOayECIAcgFjYCvAEgDiAIIA9rSwRAIA4gCCAVa0sEQEFsIQsMAgsgESACIA9rIgJqIhYgCmogEU0EQCAIIBYgChAPGgwCCyAIIBZBACACaxAPIQggByACIApqIgo2AsQBIAggAmshCCAPIQILIA5BEE8EQCAIIApqIQoDQCAIIAIQByACQRBqIQIgCEEQaiIIIApJDQALDAELAkAgDkEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgDkECdCIKQcAeaigCAGoiAhAXIAIgCkHgHmooAgBrIQIgBygCxAEhCgwBCyAIIAIQDAsgCkEJSQ0AIAggCmohCiAIQQhqIgggAkEIaiICa0EPTARAA0AgCCACEAwgAkEIaiECIAhBCGoiCCAKSQ0ADAIACwALA0AgCCACEAcgAkEQaiECIAhBEGoiCCAKSQ0ACwsgCxADBEAgCyEQDAQFIA0gDDYCACANIBkgHGogCWs2AgwgDSAJNgIIIA0gFDYCBCAEQQFqIQQgAyALaiEDDAILAAsLIAQgBUgNASAEIBdrIQtBACEEA0AgCyAFSARAIAcgB0HwAGogC0EDcUEEdGoiAikDCCIdNwPIASAHIAIpAwAiHjcDwAECQAJAAkAgBygCvAEiDCAepyICaiIKIBNLDQAgAyAHKALEASIJIAJqIhBqIBhLDQAgEiADayAQQSBqTw0BCyAHIAcpA8gBNwMgIAcgBykDwAE3AxggAyASIAdBGGogB0G8AWogEyAPIBUgERAeIRAMAQsgAiADaiEIIAMgDBAHIAJBEU8EQCADQRBqIQIDQCACIAxBEGoiDBAHIAJBEGoiAiAISQ0ACwsgCCAdpyIGayECIAcgCjYCvAEgBiAIIA9rSwRAIAYgCCAVa0sEQEFsIRAMAgsgESACIA9rIgJqIgwgCWogEU0EQCAIIAwgCRAPGgwCCyAIIAxBACACaxAPIQggByACIAlqIgk2AsQBIAggAmshCCAPIQILIAZBEE8EQCAIIAlqIQYDQCAIIAIQByACQRBqIQIgCEEQaiIIIAZJDQALDAELAkAgBkEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgBkECdCIGQcAeaigCAGoiAhAXIAIgBkHgHmooAgBrIQIgBygCxAEhCQwBCyAIIAIQDAsgCUEJSQ0AIAggCWohBiAIQQhqIgggAkEIaiICa0EPTARAA0AgCCACEAwgAkEIaiECIAhBCGoiCCAGSQ0ADAIACwALA0AgCCACEAcgAkEQaiECIAhBEGoiCCAGSQ0ACwsgEBADDQMgC0EBaiELIAMgEGohAwwBCwsDQCAEQQNHBEAgACAEQQJ0IgJqQazQAWogAiAHaigCVDYCACAEQQFqIQQMAQsLIAcoArwBIQgLQbp/IRAgEyAIayIAIBIgA2tLDQAgAwR/IAMgCCAAEAsgAGoFQQALIAFrIRALIAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY0AAQMyIFEAMiBg0AIANBHzYCfCADIANB/ABqIANB+ABqIAQgBCAFaiAGGyIEIAEgAmoiAiAEaxAVIgUQAw0AIAMoAnwiBkEfSw0AIAMoAngiB0EJTw0AIABBiCBqIAMgBkGAC0GADCAHEBggA0E0NgJ8IAMgA0H8AGogA0H4AGogBCAFaiIEIAIgBGsQFSIFEAMNACADKAJ8IgZBNEsNACADKAJ4IgdBCk8NACAAQZAwaiADIAZBgA1B4A4gBxAYIANBIzYCfCADIANB/ABqIANB+ABqIAQgBWoiBCACIARrEBUiBRADDQAgAygCfCIGQSNLDQAgAygCeCIHQQpPDQAgACADIAZBwBBB0BEgBxAYIAQgBWoiBEEMaiIFIAJLDQAgAiAFayEFQQAhAgNAIAJBA0cEQCAEKAAAIgZBf2ogBU8NAiAAIAJBAnRqQZzQAWogBjYCACACQQFqIQIgBEEEaiEEDAELCyAEIAFrIQgLIANBgAFqJAAgCAtGAQN/IABBCGohAyAAKAIEIQJBACEAA0AgACACdkUEQCABIAMgAEEDdGotAAJBFktqIQEgAEEBaiEADAELCyABQQggAmt0C4YDAQV/Qbh/IQcCQCADRQ0AIAItAAAiBEUEQCABQQA2AgBBAUG4fyADQQFGGw8LAn8gAkEBaiIFIARBGHRBGHUiBkF/Sg0AGiAGQX9GBEAgA0EDSA0CIAUvAABBgP4BaiEEIAJBA2oMAQsgA0ECSA0BIAItAAEgBEEIdHJBgIB+aiEEIAJBAmoLIQUgASAENgIAIAVBAWoiASACIANqIgNLDQBBbCEHIABBEGogACAFLQAAIgVBBnZBI0EJIAEgAyABa0HAEEHQEUHwEiAAKAKM4QEgACgCnOIBIAQQHyIGEAMiCA0AIABBmCBqIABBCGogBUEEdkEDcUEfQQggASABIAZqIAgbIgEgAyABa0GAC0GADEGAFyAAKAKM4QEgACgCnOIBIAQQHyIGEAMiCA0AIABBoDBqIABBBGogBUECdkEDcUE0QQkgASABIAZqIAgbIgEgAyABa0GADUHgDkGQGSAAKAKM4QEgACgCnOIBIAQQHyIAEAMNACAAIAFqIAJrIQcLIAcLrQMBCn8jAEGABGsiCCQAAn9BUiACQf8BSw0AGkFUIANBDEsNABogAkEBaiELIABBBGohCUGAgAQgA0F/anRBEHUhCkEAIQJBASEEQQEgA3QiB0F/aiIMIQUDQCACIAtGRQRAAkAgASACQQF0Ig1qLwEAIgZB//8DRgRAIAkgBUECdGogAjoAAiAFQX9qIQVBASEGDAELIARBACAKIAZBEHRBEHVKGyEECyAIIA1qIAY7AQAgAkEBaiECDAELCyAAIAQ7AQIgACADOwEAIAdBA3YgB0EBdmpBA2ohBkEAIQRBACECA0AgBCALRkUEQCABIARBAXRqLgEAIQpBACEAA0AgACAKTkUEQCAJIAJBAnRqIAQ6AAIDQCACIAZqIAxxIgIgBUsNAAsgAEEBaiEADAELCyAEQQFqIQQMAQsLQX8gAg0AGkEAIQIDfyACIAdGBH9BAAUgCCAJIAJBAnRqIgAtAAJBAXRqIgEgAS8BACIBQQFqOwEAIAAgAyABEBRrIgU6AAMgACABIAVB/wFxdCAHazsBACACQQFqIQIMAQsLCyEFIAhBgARqJAAgBQvjBgEIf0FsIQcCQCACQQNJDQACQAJAAkACQCABLQAAIgNBA3EiCUEBaw4DAwEAAgsgACgCiOEBDQBBYg8LIAJBBUkNAkEDIQYgASgAACEFAn8CQAJAIANBAnZBA3EiCEF+aiIEQQFNBEAgBEEBaw0BDAILIAVBDnZB/wdxIQQgBUEEdkH/B3EhAyAIRQwCCyAFQRJ2IQRBBCEGIAVBBHZB//8AcSEDQQAMAQsgBUEEdkH//w9xIgNBgIAISw0DIAEtAARBCnQgBUEWdnIhBEEFIQZBAAshBSAEIAZqIgogAksNAgJAIANBgQZJDQAgACgCnOIBRQ0AQQAhAgNAIAJBg4ABSw0BIAJBQGshAgwAAAsACwJ/IAlBA0YEQCABIAZqIQEgAEHw4gFqIQIgACgCDCEGIAUEQCACIAMgASAEIAYQXwwCCyACIAMgASAEIAYQXQwBCyAAQbjQAWohAiABIAZqIQEgAEHw4gFqIQYgAEGo0ABqIQggBQRAIAggBiADIAEgBCACEF4MAQsgCCAGIAMgASAEIAIQXAsQAw0CIAAgAzYCgOIBIABBATYCiOEBIAAgAEHw4gFqNgLw4QEgCUECRgRAIAAgAEGo0ABqNgIMCyAAIANqIgBBiOMBakIANwAAIABBgOMBakIANwAAIABB+OIBakIANwAAIABB8OIBakIANwAAIAoPCwJ/AkACQAJAIANBAnZBA3FBf2oiBEECSw0AIARBAWsOAgACAQtBASEEIANBA3YMAgtBAiEEIAEvAABBBHYMAQtBAyEEIAEQIUEEdgsiAyAEaiIFQSBqIAJLBEAgBSACSw0CIABB8OIBaiABIARqIAMQCyEBIAAgAzYCgOIBIAAgATYC8OEBIAEgA2oiAEIANwAYIABCADcAECAAQgA3AAggAEIANwAAIAUPCyAAIAM2AoDiASAAIAEgBGo2AvDhASAFDwsCfwJAAkACQCADQQJ2QQNxQX9qIgRBAksNACAEQQFrDgIAAgELQQEhByADQQN2DAILQQIhByABLwAAQQR2DAELIAJBBEkgARAhIgJBj4CAAUtyDQFBAyEHIAJBBHYLIQIgAEHw4gFqIAEgB2otAAAgAkEgahAQIQEgACACNgKA4gEgACABNgLw4QEgB0EBaiEHCyAHC0sAIABC+erQ0OfJoeThADcDICAAQgA3AxggAELP1tO+0ser2UI3AxAgAELW64Lu6v2J9eAANwMIIABCADcDACAAQShqQQBBKBAQGgviAgICfwV+IABBKGoiASAAKAJIaiECAn4gACkDACIDQiBaBEAgACkDECIEQgeJIAApAwgiBUIBiXwgACkDGCIGQgyJfCAAKQMgIgdCEol8IAUQGSAEEBkgBhAZIAcQGQwBCyAAKQMYQsXP2bLx5brqJ3wLIAN8IQMDQCABQQhqIgAgAk0EQEIAIAEpAAAQCSADhUIbiUKHla+vmLbem55/fkLj3MqV/M7y9YV/fCEDIAAhAQwBCwsCQCABQQRqIgAgAksEQCABIQAMAQsgASgAAK1Ch5Wvr5i23puef34gA4VCF4lCz9bTvtLHq9lCfkL5893xmfaZqxZ8IQMLA0AgACACSQRAIAAxAABCxc/ZsvHluuonfiADhUILiUKHla+vmLbem55/fiEDIABBAWohAAwBCwsgA0IhiCADhULP1tO+0ser2UJ+IgNCHYggA4VC+fPd8Zn2masWfiIDQiCIIAOFC+8CAgJ/BH4gACAAKQMAIAKtfDcDAAJAAkAgACgCSCIDIAJqIgRBH00EQCABRQ0BIAAgA2pBKGogASACECAgACgCSCACaiEEDAELIAEgAmohAgJ/IAMEQCAAQShqIgQgA2ogAUEgIANrECAgACAAKQMIIAQpAAAQCTcDCCAAIAApAxAgACkAMBAJNwMQIAAgACkDGCAAKQA4EAk3AxggACAAKQMgIABBQGspAAAQCTcDICAAKAJIIQMgAEEANgJIIAEgA2tBIGohAQsgAUEgaiACTQsEQCACQWBqIQMgACkDICEFIAApAxghBiAAKQMQIQcgACkDCCEIA0AgCCABKQAAEAkhCCAHIAEpAAgQCSEHIAYgASkAEBAJIQYgBSABKQAYEAkhBSABQSBqIgEgA00NAAsgACAFNwMgIAAgBjcDGCAAIAc3AxAgACAINwMICyABIAJPDQEgAEEoaiABIAIgAWsiBBAgCyAAIAQ2AkgLCy8BAX8gAEUEQEG2f0EAIAMbDwtBun8hBCADIAFNBH8gACACIAMQEBogAwVBun8LCy8BAX8gAEUEQEG2f0EAIAMbDwtBun8hBCADIAFNBH8gACACIAMQCxogAwVBun8LC6gCAQZ/IwBBEGsiByQAIABB2OABaikDAEKAgIAQViEIQbh/IQUCQCAEQf//B0sNACAAIAMgBBBCIgUQAyIGDQAgACgCnOIBIQkgACAHQQxqIAMgAyAFaiAGGyIKIARBACAFIAYbayIGEEAiAxADBEAgAyEFDAELIAcoAgwhBCABRQRAQbp/IQUgBEEASg0BCyAGIANrIQUgAyAKaiEDAkAgCQRAIABBADYCnOIBDAELAkACQAJAIARBBUgNACAAQdjgAWopAwBCgICACFgNAAwBCyAAQQA2ApziAQwBCyAAKAIIED8hBiAAQQA2ApziASAGQRRPDQELIAAgASACIAMgBSAEIAgQOSEFDAELIAAgASACIAMgBSAEIAgQOiEFCyAHQRBqJAAgBQtnACAAQdDgAWogASACIAAoAuzhARAuIgEQAwRAIAEPC0G4fyECAkAgAQ0AIABB7OABaigCACIBBEBBYCECIAAoApjiASABRw0BC0EAIQIgAEHw4AFqKAIARQ0AIABBkOEBahBDCyACCycBAX8QVyIERQRAQUAPCyAEIAAgASACIAMgBBBLEE8hACAEEFYgAAs/AQF/AkACQAJAIAAoAqDiAUEBaiIBQQJLDQAgAUEBaw4CAAECCyAAEDBBAA8LIABBADYCoOIBCyAAKAKU4gELvAMCB38BfiMAQRBrIgkkAEG4fyEGAkAgBCgCACIIQQVBCSAAKALs4QEiBRtJDQAgAygCACIHQQFBBSAFGyAFEC8iBRADBEAgBSEGDAELIAggBUEDakkNACAAIAcgBRBJIgYQAw0AIAEgAmohCiAAQZDhAWohCyAIIAVrIQIgBSAHaiEHIAEhBQNAIAcgAiAJECwiBhADDQEgAkF9aiICIAZJBEBBuH8hBgwCCyAJKAIAIghBAksEQEFsIQYMAgsgB0EDaiEHAn8CQAJAAkAgCEEBaw4CAgABCyAAIAUgCiAFayAHIAYQSAwCCyAFIAogBWsgByAGEEcMAQsgBSAKIAVrIActAAAgCSgCCBBGCyIIEAMEQCAIIQYMAgsgACgC8OABBEAgCyAFIAgQRQsgAiAGayECIAYgB2ohByAFIAhqIQUgCSgCBEUNAAsgACkD0OABIgxCf1IEQEFsIQYgDCAFIAFrrFINAQsgACgC8OABBEBBaiEGIAJBBEkNASALEEQhDCAHKAAAIAynRw0BIAdBBGohByACQXxqIQILIAMgBzYCACAEIAI2AgAgBSABayEGCyAJQRBqJAAgBgsuACAAECsCf0EAQQAQAw0AGiABRSACRXJFBEBBYiAAIAEgAhA9EAMNARoLQQALCzcAIAEEQCAAIAAoAsTgASABKAIEIAEoAghqRzYCnOIBCyAAECtBABADIAFFckUEQCAAIAEQWwsL0QIBB38jAEEQayIGJAAgBiAENgIIIAYgAzYCDCAFBEAgBSgCBCEKIAUoAgghCQsgASEIAkACQANAIAAoAuzhARAWIQsCQANAIAQgC0kNASADKAAAQXBxQdDUtMIBRgRAIAMgBBAiIgcQAw0EIAQgB2shBCADIAdqIQMMAQsLIAYgAzYCDCAGIAQ2AggCQCAFBEAgACAFEE5BACEHQQAQA0UNAQwFCyAAIAogCRBNIgcQAw0ECyAAIAgQUCAMQQFHQQAgACAIIAIgBkEMaiAGQQhqEEwiByIDa0EAIAMQAxtBCkdyRQRAQbh/IQcMBAsgBxADDQMgAiAHayECIAcgCGohCEEBIQwgBigCDCEDIAYoAgghBAwBCwsgBiADNgIMIAYgBDYCCEG4fyEHIAQNASAIIAFrIQcMAQsgBiADNgIMIAYgBDYCCAsgBkEQaiQAIAcLRgECfyABIAAoArjgASICRwRAIAAgAjYCxOABIAAgATYCuOABIAAoArzgASEDIAAgATYCvOABIAAgASADIAJrajYCwOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEEdCAAbiECCyAAQQh2IgEgAkEYbCIAQYwIaigCAGwgAEGICGooAgBqIgJBA3YgAmogAEGACGooAgAgAEGECGooAgAgAWxqSQs3ACAAIAMgBCAFQYAQEDMiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQMgVBuH8LC78DAQN/IwBBIGsiBSQAIAVBCGogAiADEAYiAhADRQRAIAAgAWoiB0F9aiEGIAUgBBAOIARBBGohAiAFLQACIQMDQEEAIAAgBkkgBUEIahAEGwRAIAAgAiAFQQhqIAMQAkECdGoiBC8BADsAACAFQQhqIAQtAAIQASAAIAQtAANqIgQgAiAFQQhqIAMQAkECdGoiAC8BADsAACAFQQhqIAAtAAIQASAEIAAtAANqIQAMAQUgB0F+aiEEA0AgBUEIahAEIAAgBEtyRQRAIAAgAiAFQQhqIAMQAkECdGoiBi8BADsAACAFQQhqIAYtAAIQASAAIAYtAANqIQAMAQsLA0AgACAES0UEQCAAIAIgBUEIaiADEAJBAnRqIgYvAQA7AAAgBUEIaiAGLQACEAEgACAGLQADaiEADAELCwJAIAAgB08NACAAIAIgBUEIaiADEAIiA0ECdGoiAC0AADoAACAALQADQQFGBEAgBUEIaiAALQACEAEMAQsgBSgCDEEfSw0AIAVBCGogAiADQQJ0ai0AAhABIAUoAgxBIUkNACAFQSA2AgwLIAFBbCAFQQhqEAobIQILCwsgBUEgaiQAIAILkgIBBH8jAEFAaiIJJAAgCSADQTQQCyEDAkAgBEECSA0AIAMgBEECdGooAgAhCSADQTxqIAgQIyADQQE6AD8gAyACOgA+QQAhBCADKAI8IQoDQCAEIAlGDQEgACAEQQJ0aiAKNgEAIARBAWohBAwAAAsAC0EAIQkDQCAGIAlGRQRAIAMgBSAJQQF0aiIKLQABIgtBAnRqIgwoAgAhBCADQTxqIAotAABBCHQgCGpB//8DcRAjIANBAjoAPyADIAcgC2siCiACajoAPiAEQQEgASAKa3RqIQogAygCPCELA0AgACAEQQJ0aiALNgEAIARBAWoiBCAKSQ0ACyAMIAo2AgAgCUEBaiEJDAELCyADQUBrJAALowIBCX8jAEHQAGsiCSQAIAlBEGogBUE0EAsaIAcgBmshDyAHIAFrIRADQAJAIAMgCkcEQEEBIAEgByACIApBAXRqIgYtAAEiDGsiCGsiC3QhDSAGLQAAIQ4gCUEQaiAMQQJ0aiIMKAIAIQYgCyAPTwRAIAAgBkECdGogCyAIIAUgCEE0bGogCCAQaiIIQQEgCEEBShsiCCACIAQgCEECdGooAgAiCEEBdGogAyAIayAHIA4QYyAGIA1qIQgMAgsgCUEMaiAOECMgCUEBOgAPIAkgCDoADiAGIA1qIQggCSgCDCELA0AgBiAITw0CIAAgBkECdGogCzYBACAGQQFqIQYMAAALAAsgCUHQAGokAA8LIAwgCDYCACAKQQFqIQoMAAALAAs0ACAAIAMgBCAFEDYiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQNAVBuH8LCyMAIAA/AEEQdGtB//8DakEQdkAAQX9GBEBBAA8LQQAQAEEBCzsBAX8gAgRAA0AgACABIAJBgCAgAkGAIEkbIgMQCyEAIAFBgCBqIQEgAEGAIGohACACIANrIgINAAsLCwYAIAAQAwsLqBUJAEGICAsNAQAAAAEAAAACAAAAAgBBoAgLswYBAAAAAQAAAAIAAAACAAAAJgAAAIIAAAAhBQAASgAAAGcIAAAmAAAAwAEAAIAAAABJBQAASgAAAL4IAAApAAAALAIAAIAAAABJBQAASgAAAL4IAAAvAAAAygIAAIAAAACKBQAASgAAAIQJAAA1AAAAcwMAAIAAAACdBQAASgAAAKAJAAA9AAAAgQMAAIAAAADrBQAASwAAAD4KAABEAAAAngMAAIAAAABNBgAASwAAAKoKAABLAAAAswMAAIAAAADBBgAATQAAAB8NAABNAAAAUwQAAIAAAAAjCAAAUQAAAKYPAABUAAAAmQQAAIAAAABLCQAAVwAAALESAABYAAAA2gQAAIAAAABvCQAAXQAAACMUAABUAAAARQUAAIAAAABUCgAAagAAAIwUAABqAAAArwUAAIAAAAB2CQAAfAAAAE4QAAB8AAAA0gIAAIAAAABjBwAAkQAAAJAHAACSAAAAAAAAAAEAAAABAAAABQAAAA0AAAAdAAAAPQAAAH0AAAD9AAAA/QEAAP0DAAD9BwAA/Q8AAP0fAAD9PwAA/X8AAP3/AAD9/wEA/f8DAP3/BwD9/w8A/f8fAP3/PwD9/38A/f//AP3//wH9//8D/f//B/3//w/9//8f/f//P/3//38AAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAeAAAAHwAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAAwAAAANAAAADgAAAA8AAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAIwAAACUAAAAnAAAAKQAAACsAAAAvAAAAMwAAADsAAABDAAAAUwAAAGMAAACDAAAAAwEAAAMCAAADBAAAAwgAAAMQAAADIAAAA0AAAAOAAAADAAEAQeAPC1EBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAEAAAABQAAAAcAAAAIAAAACQAAAAoAAAALAAAADAAAAA0AAAAOAAAADwAAABAAQcQQC4sBAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABIAAAAUAAAAFgAAABgAAAAcAAAAIAAAACgAAAAwAAAAQAAAAIAAAAAAAQAAAAIAAAAEAAAACAAAABAAAAAgAAAAQAAAAIAAAAAAAQBBkBIL5gQBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAAAEAAAAEAAAACAAAAAAAAAABAAEBBgAAAAAAAAQAAAAAEAAABAAAAAAgAAAFAQAAAAAAAAUDAAAAAAAABQQAAAAAAAAFBgAAAAAAAAUHAAAAAAAABQkAAAAAAAAFCgAAAAAAAAUMAAAAAAAABg4AAAAAAAEFEAAAAAAAAQUUAAAAAAABBRYAAAAAAAIFHAAAAAAAAwUgAAAAAAAEBTAAAAAgAAYFQAAAAAAABwWAAAAAAAAIBgABAAAAAAoGAAQAAAAADAYAEAAAIAAABAAAAAAAAAAEAQAAAAAAAAUCAAAAIAAABQQAAAAAAAAFBQAAACAAAAUHAAAAAAAABQgAAAAgAAAFCgAAAAAAAAULAAAAAAAABg0AAAAgAAEFEAAAAAAAAQUSAAAAIAABBRYAAAAAAAIFGAAAACAAAwUgAAAAAAADBSgAAAAAAAYEQAAAABAABgRAAAAAIAAHBYAAAAAAAAkGAAIAAAAACwYACAAAMAAABAAAAAAQAAAEAQAAACAAAAUCAAAAIAAABQMAAAAgAAAFBQAAACAAAAUGAAAAIAAABQgAAAAgAAAFCQAAACAAAAULAAAAIAAABQwAAAAAAAAGDwAAACAAAQUSAAAAIAABBRQAAAAgAAIFGAAAACAAAgUcAAAAIAADBSgAAAAgAAQFMAAAAAAAEAYAAAEAAAAPBgCAAAAAAA4GAEAAAAAADQYAIABBgBcLhwIBAAEBBQAAAAAAAAUAAAAAAAAGBD0AAAAAAAkF/QEAAAAADwX9fwAAAAAVBf3/HwAAAAMFBQAAAAAABwR9AAAAAAAMBf0PAAAAABIF/f8DAAAAFwX9/38AAAAFBR0AAAAAAAgE/QAAAAAADgX9PwAAAAAUBf3/DwAAAAIFAQAAABAABwR9AAAAAAALBf0HAAAAABEF/f8BAAAAFgX9/z8AAAAEBQ0AAAAQAAgE/QAAAAAADQX9HwAAAAATBf3/BwAAAAEFAQAAABAABgQ9AAAAAAAKBf0DAAAAABAF/f8AAAAAHAX9//8PAAAbBf3//wcAABoF/f//AwAAGQX9//8BAAAYBf3//wBBkBkLhgQBAAEBBgAAAAAAAAYDAAAAAAAABAQAAAAgAAAFBQAAAAAAAAUGAAAAAAAABQgAAAAAAAAFCQAAAAAAAAULAAAAAAAABg0AAAAAAAAGEAAAAAAAAAYTAAAAAAAABhYAAAAAAAAGGQAAAAAAAAYcAAAAAAAABh8AAAAAAAAGIgAAAAAAAQYlAAAAAAABBikAAAAAAAIGLwAAAAAAAwY7AAAAAAAEBlMAAAAAAAcGgwAAAAAACQYDAgAAEAAABAQAAAAAAAAEBQAAACAAAAUGAAAAAAAABQcAAAAgAAAFCQAAAAAAAAUKAAAAAAAABgwAAAAAAAAGDwAAAAAAAAYSAAAAAAAABhUAAAAAAAAGGAAAAAAAAAYbAAAAAAAABh4AAAAAAAAGIQAAAAAAAQYjAAAAAAABBicAAAAAAAIGKwAAAAAAAwYzAAAAAAAEBkMAAAAAAAUGYwAAAAAACAYDAQAAIAAABAQAAAAwAAAEBAAAABAAAAQFAAAAIAAABQcAAAAgAAAFCAAAACAAAAUKAAAAIAAABQsAAAAAAAAGDgAAAAAAAAYRAAAAAAAABhQAAAAAAAAGFwAAAAAAAAYaAAAAAAAABh0AAAAAAAAGIAAAAAAAEAYDAAEAAAAPBgOAAAAAAA4GA0AAAAAADQYDIAAAAAAMBgMQAAAAAAsGAwgAAAAACgYDBABBpB0L2QEBAAAAAwAAAAcAAAAPAAAAHwAAAD8AAAB/AAAA/wAAAP8BAAD/AwAA/wcAAP8PAAD/HwAA/z8AAP9/AAD//wAA//8BAP//AwD//wcA//8PAP//HwD//z8A//9/AP///wD///8B////A////wf///8P////H////z////9/AAAAAAEAAAACAAAABAAAAAAAAAACAAAABAAAAAgAAAAAAAAAAQAAAAIAAAABAAAABAAAAAQAAAAEAAAABAAAAAgAAAAIAAAACAAAAAcAAAAIAAAACQAAAAoAAAALAEGgIAsDwBBQ", Ql = "display-p3", _l = "display-p3-linear", Li = /* @__PURE__ */ new WeakMap();
let Pi = 0, ki;
class oe extends ws {
  /**
   * Constructs a new KTX2 loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e), this.transcoderPath = "", this.transcoderBinary = null, this.transcoderPending = null, this.workerPool = new cl(), this.workerSourceURL = "", this.workerConfig = null, typeof MSC_TRANSCODER < "u" && console.warn(
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
      const e = new Le(this.manager);
      e.setPath(this.transcoderPath), e.setWithCredentials(this.withCredentials);
      const t = e.loadAsync("basis_transcoder.js"), i = new Le(this.manager);
      i.setPath(this.transcoderPath), i.setResponseType("arraybuffer"), i.setWithCredentials(this.withCredentials);
      const s = i.loadAsync("basis_transcoder.wasm");
      this.transcoderPending = Promise.all([t, s]).then(([n, r]) => {
        const o = oe.BasisWorker.toString(), a = [
          "/* constants */",
          "let _EngineFormat = " + JSON.stringify(oe.EngineFormat),
          "let _EngineType = " + JSON.stringify(oe.EngineType),
          "let _TranscoderFormat = " + JSON.stringify(oe.TranscoderFormat),
          "let _BasisFormat = " + JSON.stringify(oe.BasisFormat),
          "/* basis_transcoder.js */",
          n,
          "/* worker */",
          o.substring(o.indexOf("{") + 1, o.lastIndexOf("}"))
        ].join(`
`);
        this.workerSourceURL = URL.createObjectURL(new Blob([a])), this.transcoderBinary = r, this.workerPool.setWorkerCreator(() => {
          const l = new Worker(this.workerSourceURL), d = this.transcoderBinary.slice(0);
          return l.postMessage({ type: "init", config: this.workerConfig, transcoderBinary: d }, [d]), l;
        });
      }), Pi > 0 && console.warn(
        "THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."
      ), Pi++;
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
    const n = new Le(this.manager);
    n.setPath(this.path), n.setCrossOrigin(this.crossOrigin), n.setWithCredentials(this.withCredentials), n.setResponseType("arraybuffer"), n.load(e, (r) => {
      this.parse(r, t, s);
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
    if (Li.has(e))
      return Li.get(e).promise.then(t).catch(i);
    this._createTexture(e).then((s) => t ? t(s) : null).catch(i);
  }
  _createTextureFrom(e, t) {
    const { type: i, error: s, data: { faces: n, width: r, height: o, format: a, type: l, dfdFlags: d } } = e;
    if (i === "error") return Promise.reject(s);
    let h;
    if (t.faceCount === 6)
      h = new Ho(n, a, l);
    else {
      const u = n[0].mipmaps;
      h = t.layerCount > 1 ? new zo(u, r, o, t.layerCount, a, l) : new Ar(u, r, o, a, l);
    }
    return h.minFilter = n[0].mipmaps.length === 1 ? Ge : Ai, h.magFilter = Ge, h.generateMipmaps = !1, h.needsUpdate = !0, h.colorSpace = Gr(t), h.premultiplyAlpha = !!(d & dl), h;
  }
  /**
   * @private
   * @param {ArrayBuffer} buffer
   * @param {?Object} config
   * @return {Promise<CompressedTexture|CompressedArrayTexture|DataTexture|Data3DTexture>}
   */
  async _createTexture(e, t = {}) {
    const i = Tl(new Uint8Array(e)), s = i.vkFormat === Is && i.dataFormatDescriptor[0].colorModel === 167;
    if (!(i.vkFormat === fl || s && !this.workerConfig.astcHDRSupported))
      return Ll(i);
    const r = t, o = this.init().then(() => this.workerPool.postMessage({ type: "transcode", buffer: e, taskConfig: r }, [e])).then((a) => this._createTextureFrom(a.data, i));
    return Li.set(e, { promise: o }), o;
  }
  /**
   * Frees internal resources. This method should be called
   * when the loader is no longer required.
   */
  dispose() {
    this.workerPool.dispose(), this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL), Pi--;
  }
}
oe.BasisFormat = {
  ETC1S: 0,
  UASTC: 1,
  UASTC_HDR: 2
};
oe.TranscoderFormat = {
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
oe.EngineFormat = {
  RGBAFormat: $e,
  RGBA_ASTC_4x4_Format: Zt,
  RGB_BPTC_UNSIGNED_Format: Wo,
  RGBA_BPTC_Format: as,
  RGBA_ETC2_EAC_Format: pr,
  RGBA_PVRTC_4BPPV1_Format: Yo,
  RGBA_S3TC_DXT5_Format: ls,
  RGB_ETC1_Format: Ko,
  RGB_ETC2_Format: fr,
  RGB_PVRTC_4BPPV1_Format: jo,
  RGBA_S3TC_DXT1_Format: cs
};
oe.EngineType = {
  UnsignedByteType: de,
  HalfFloatType: Ze,
  FloatType: St
};
oe.BasisWorker = function() {
  let c, e, t;
  const i = _EngineFormat, s = _EngineType, n = _TranscoderFormat, r = _BasisFormat;
  self.addEventListener("message", function(p) {
    const f = p.data;
    switch (f.type) {
      case "init":
        c = f.config, o(f.transcoderBinary);
        break;
      case "transcode":
        e.then(() => {
          try {
            const { faces: g, buffers: b, width: y, height: E, hasAlpha: C, format: w, type: S, dfdFlags: v } = a(f.buffer);
            self.postMessage({ type: "transcode", id: f.id, data: { faces: g, width: y, height: E, hasAlpha: C, format: w, type: S, dfdFlags: v } }, b);
          } catch (g) {
            console.error(g), self.postMessage({ type: "error", id: f.id, error: g.message });
          }
        });
        break;
    }
  });
  function o(p) {
    e = new Promise((f) => {
      t = { wasmBinary: p, onRuntimeInitialized: f }, BASIS(t);
    }).then(() => {
      t.initializeBasis(), t.KTX2File === void 0 && console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.");
    });
  }
  function a(p) {
    const f = new t.KTX2File(new Uint8Array(p));
    function g() {
      f.close(), f.delete();
    }
    if (!f.isValid())
      throw g(), new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");
    let b;
    if (f.isUASTC())
      b = r.UASTC;
    else if (f.isETC1S())
      b = r.ETC1S;
    else if (f.isHDR())
      b = r.UASTC_HDR;
    else
      throw new Error("THREE.KTX2Loader: Unknown Basis encoding");
    const y = f.getWidth(), E = f.getHeight(), C = f.getLayers() || 1, w = f.getLevels(), S = f.getFaces(), v = f.getHasAlpha(), I = f.getDFDFlags(), { transcoderFormat: B, engineFormat: M, engineType: x } = h(b, y, E, v);
    if (!y || !E || !w)
      throw g(), new Error("THREE.KTX2Loader:	Invalid texture");
    if (!f.startTranscoding())
      throw g(), new Error("THREE.KTX2Loader: .startTranscoding failed");
    const Q = [], P = [];
    for (let T = 0; T < S; T++) {
      const U = [];
      for (let L = 0; L < w; L++) {
        const _ = [];
        let F, O;
        for (let j = 0; j < C; j++) {
          const q = f.getImageLevelInfo(L, j, T);
          T === 0 && L === 0 && j === 0 && (q.origWidth % 4 !== 0 || q.origHeight % 4 !== 0) && console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."), w > 1 ? (F = q.origWidth, O = q.origHeight) : (F = q.width, O = q.height);
          let re = new Uint8Array(f.getImageTranscodedSizeInBytes(L, j, 0, B));
          const Dt = f.transcodeImage(re, L, j, T, B, 0, -1, -1);
          if (x === s.HalfFloatType && (re = new Uint16Array(re.buffer, re.byteOffset, re.byteLength / Uint16Array.BYTES_PER_ELEMENT)), !Dt)
            throw g(), new Error("THREE.KTX2Loader: .transcodeImage failed.");
          _.push(re);
        }
        const z = A(_);
        U.push({ data: z, width: F, height: O }), P.push(z.buffer);
      }
      Q.push({ mipmaps: U, width: y, height: E, format: M, type: x });
    }
    return g(), { faces: Q, buffers: P, width: y, height: E, hasAlpha: v, dfdFlags: I, format: M, type: x };
  }
  const l = [
    {
      if: "astcSupported",
      basisFormat: [r.UASTC],
      transcoderFormat: [n.ASTC_4x4, n.ASTC_4x4],
      engineFormat: [i.RGBA_ASTC_4x4_Format, i.RGBA_ASTC_4x4_Format],
      engineType: [s.UnsignedByteType],
      priorityETC1S: 1 / 0,
      priorityUASTC: 1,
      needsPowerOfTwo: !1
    },
    {
      if: "bptcSupported",
      basisFormat: [r.ETC1S, r.UASTC],
      transcoderFormat: [n.BC7_M5, n.BC7_M5],
      engineFormat: [i.RGBA_BPTC_Format, i.RGBA_BPTC_Format],
      engineType: [s.UnsignedByteType],
      priorityETC1S: 3,
      priorityUASTC: 2,
      needsPowerOfTwo: !1
    },
    {
      if: "dxtSupported",
      basisFormat: [r.ETC1S, r.UASTC],
      transcoderFormat: [n.BC1, n.BC3],
      engineFormat: [i.RGBA_S3TC_DXT1_Format, i.RGBA_S3TC_DXT5_Format],
      engineType: [s.UnsignedByteType],
      priorityETC1S: 4,
      priorityUASTC: 5,
      needsPowerOfTwo: !1
    },
    {
      if: "etc2Supported",
      basisFormat: [r.ETC1S, r.UASTC],
      transcoderFormat: [n.ETC1, n.ETC2],
      engineFormat: [i.RGB_ETC2_Format, i.RGBA_ETC2_EAC_Format],
      engineType: [s.UnsignedByteType],
      priorityETC1S: 1,
      priorityUASTC: 3,
      needsPowerOfTwo: !1
    },
    {
      if: "etc1Supported",
      basisFormat: [r.ETC1S, r.UASTC],
      transcoderFormat: [n.ETC1],
      engineFormat: [i.RGB_ETC1_Format],
      engineType: [s.UnsignedByteType],
      priorityETC1S: 2,
      priorityUASTC: 4,
      needsPowerOfTwo: !1
    },
    {
      if: "pvrtcSupported",
      basisFormat: [r.ETC1S, r.UASTC],
      transcoderFormat: [n.PVRTC1_4_RGB, n.PVRTC1_4_RGBA],
      engineFormat: [i.RGB_PVRTC_4BPPV1_Format, i.RGBA_PVRTC_4BPPV1_Format],
      engineType: [s.UnsignedByteType],
      priorityETC1S: 5,
      priorityUASTC: 6,
      needsPowerOfTwo: !0
    },
    {
      if: "bptcSupported",
      basisFormat: [r.UASTC_HDR],
      transcoderFormat: [n.BC6H],
      engineFormat: [i.RGB_BPTC_UNSIGNED_Format],
      engineType: [s.HalfFloatType],
      priorityHDR: 1,
      needsPowerOfTwo: !1
    },
    // Uncompressed fallbacks.
    {
      basisFormat: [r.ETC1S, r.UASTC],
      transcoderFormat: [n.RGBA32, n.RGBA32],
      engineFormat: [i.RGBAFormat, i.RGBAFormat],
      engineType: [s.UnsignedByteType, s.UnsignedByteType],
      priorityETC1S: 100,
      priorityUASTC: 100,
      needsPowerOfTwo: !1
    },
    {
      basisFormat: [r.UASTC_HDR],
      transcoderFormat: [n.RGBA_HALF],
      engineFormat: [i.RGBAFormat],
      engineType: [s.HalfFloatType],
      priorityHDR: 100,
      needsPowerOfTwo: !1
    }
  ], d = {
    // TODO: For ETC1S we intentionally sort by _UASTC_ priority, preserving
    // a historical accident shown to avoid performance pitfalls for Linux with
    // Firefox & AMD GPU (RadeonSI). Further work needed.
    // See https://github.com/mrdoob/three.js/pull/29730.
    [r.ETC1S]: l.filter((p) => p.basisFormat.includes(r.ETC1S)).sort((p, f) => p.priorityUASTC - f.priorityUASTC),
    [r.UASTC]: l.filter((p) => p.basisFormat.includes(r.UASTC)).sort((p, f) => p.priorityUASTC - f.priorityUASTC),
    [r.UASTC_HDR]: l.filter((p) => p.basisFormat.includes(r.UASTC_HDR)).sort((p, f) => p.priorityHDR - f.priorityHDR)
  };
  function h(p, f, g, b) {
    const y = d[p];
    for (let E = 0; E < y.length; E++) {
      const C = y[E];
      if (C.if && !c[C.if] || !C.basisFormat.includes(p) || b && C.transcoderFormat.length < 2 || C.needsPowerOfTwo && !(u(f) && u(g))) continue;
      const w = C.transcoderFormat[b ? 1 : 0], S = C.engineFormat[b ? 1 : 0], v = C.engineType[0];
      return { transcoderFormat: w, engineFormat: S, engineType: v };
    }
    throw new Error("THREE.KTX2Loader: Failed to identify transcoding target.");
  }
  function u(p) {
    return p <= 2 ? !0 : (p & p - 1) === 0 && p !== 0;
  }
  function A(p) {
    if (p.length === 1) return p[0];
    let f = 0;
    for (let y = 0; y < p.length; y++) {
      const E = p[y];
      f += E.byteLength;
    }
    const g = new Uint8Array(f);
    let b = 0;
    for (let y = 0; y < p.length; y++) {
      const E = p[y];
      g.set(E, b), b += E.byteLength;
    }
    return g;
  }
};
const Dl = /* @__PURE__ */ new Set([$e, Ct, yt]), Fi = {
  [kr]: $e,
  [Dr]: $e,
  [Tr]: $e,
  [Rr]: $e,
  [Pr]: Ct,
  [_r]: Ct,
  [Br]: Ct,
  [xr]: Ct,
  [Lr]: yt,
  [Qr]: yt,
  [Ir]: yt,
  [Mr]: yt,
  [Fr]: fr,
  [Ur]: pr,
  [Is]: Zt,
  [Bl]: Zt,
  [Il]: Zt,
  [Nr]: qs,
  [Vr]: qs,
  [bl]: cs,
  [yl]: cs,
  [ml]: zs,
  [gl]: zs,
  [El]: Hs,
  [Cl]: Hs,
  [vl]: ls,
  [wl]: ls,
  [Ml]: as,
  [Sl]: as
}, Ui = {
  [kr]: St,
  [Dr]: Ze,
  [Tr]: de,
  [Rr]: de,
  [Pr]: St,
  [_r]: Ze,
  [Br]: de,
  [xr]: de,
  [Lr]: St,
  [Qr]: Ze,
  [Ir]: de,
  [Mr]: de,
  [Fr]: de,
  [Ur]: de,
  [Is]: Ze,
  [Nr]: de,
  [Vr]: de
};
async function Ll(c) {
  const { vkFormat: e } = c;
  if (Fi[e] === void 0)
    throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");
  let t;
  c.supercompressionScheme === en && (ki || (ki = new Promise(async (n) => {
    const r = new Rl();
    await r.init(), n(r);
  })), t = await ki);
  const i = [];
  for (let n = 0; n < c.levels.length; n++) {
    const r = Math.max(1, c.pixelWidth >> n), o = Math.max(1, c.pixelHeight >> n), a = c.pixelDepth ? Math.max(1, c.pixelDepth >> n) : 0, l = c.levels[n];
    let d;
    if (c.supercompressionScheme === hl)
      d = l.levelData;
    else if (c.supercompressionScheme === en)
      d = t.decode(l.levelData, l.uncompressedByteLength);
    else
      throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");
    let h;
    Ui[e] === St ? h = new Float32Array(
      d.buffer,
      d.byteOffset,
      d.byteLength / Float32Array.BYTES_PER_ELEMENT
    ) : Ui[e] === Ze ? h = new Uint16Array(
      d.buffer,
      d.byteOffset,
      d.byteLength / Uint16Array.BYTES_PER_ELEMENT
    ) : h = d, i.push({
      data: h,
      width: r,
      height: o,
      depth: a
    });
  }
  let s;
  if (Dl.has(Fi[e]))
    s = c.pixelDepth === 0 ? new mr(i[0].data, c.pixelWidth, c.pixelHeight) : new qo(i[0].data, c.pixelWidth, c.pixelHeight, c.pixelDepth);
  else {
    if (c.pixelDepth > 0) throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");
    s = new Ar(i, c.pixelWidth, c.pixelHeight), s.minFilter = i.length === 1 ? Ge : Ai, s.magFilter = Ge;
  }
  return s.mipmaps = i, s.type = Ui[e], s.format = Fi[e], s.colorSpace = Gr(c), s.needsUpdate = !0, Promise.resolve(s);
}
function Gr(c) {
  const e = c.dataFormatDescriptor[0];
  return e.colorPrimaries === Al ? e.transferFunction === tn ? Se : ue : e.colorPrimaries === pl ? e.transferFunction === tn ? Ql : _l : e.colorPrimaries === ul ? Os : (console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${e.colorPrimaries}"`), Os);
}
var Pl = function() {
  var c = "b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q:Odkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq;w8Wqdbk;esezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9Uc;WFbGgocjdaocjd6EhDaicefhocbhqdnindndndnaeaq9nmbaDaeaq9RaqaDfae6Egkcsfglcl4cifcd4hxalc9WGgmTmecbhPawcjdfhsaohzinaraz9Rax6mvarazaxfgo9RcK6mvczhlcbhHinalgic9WfgOawcj;cbffhldndndndndnazaOco4fRbbaHcoG4ciGPlbedibkal9cb83ibalcwf9cb83ibxikalaoRblaoRbbgOco4gAaAciSgAE86bbawcj;cbfaifglcGfaoclfaAfgARbbaOcl4ciGgCaCciSgCE86bbalcVfaAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc7faAaCfgARbbaOciGgOaOciSgOE86bbalctfaAaOfgARbbaoRbegOco4gCaCciSgCE86bbalc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc93faAaCfgARbbaOciGgOaOciSgOE86bbalc94faAaOfgARbbaoRbdgOco4gCaCciSgCE86bbalc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc97faAaCfgARbbaOciGgOaOciSgOE86bbalc98faAaOfgORbbaoRbigoco4gAaAciSgAE86bbalc99faOaAfgORbbaocl4ciGgAaAciSgAE86bbalc9:faOaAfgORbbaocd4ciGgAaAciSgAE86bbalcufaOaAfglRbbaociGgoaociSgoE86bbalaofhoxdkalaoRbwaoRbbgOcl4gAaAcsSgAE86bbawcj;cbfaifglcGfaocwfaAfgARbbaOcsGgOaOcsSgOE86bbalcVfaAaOfgORbbaoRbegAcl4gCaCcsSgCE86bbalc7faOaCfgORbbaAcsGgAaAcsSgAE86bbalctfaOaAfgORbbaoRbdgAcl4gCaCcsSgCE86bbalc91faOaCfgORbbaAcsGgAaAcsSgAE86bbalc4faOaAfgORbbaoRbigAcl4gCaCcsSgCE86bbalc93faOaCfgORbbaAcsGgAaAcsSgAE86bbalc94faOaAfgORbbaoRblgAcl4gCaCcsSgCE86bbalc95faOaCfgORbbaAcsGgAaAcsSgAE86bbalc96faOaAfgORbbaoRbvgAcl4gCaCcsSgCE86bbalc97faOaCfgORbbaAcsGgAaAcsSgAE86bbalc98faOaAfgORbbaoRbogAcl4gCaCcsSgCE86bbalc99faOaCfgORbbaAcsGgAaAcsSgAE86bbalc9:faOaAfgORbbaoRbrgocl4gAaAcsSgAE86bbalcufaOaAfglRbbaocsGgoaocsSgoE86bbalaofhoxekalao8Pbb83bbalcwfaocwf8Pbb83bbaoczfhokdnaiam9pmbaHcdfhHaiczfhlarao9RcL0mekkaiam6mvaoTmvdnakTmbawaPfRbbhHawcj;cbfhlashiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkkascefhsaohzaPcefgPad9hmbxikkcbc99arao9Radcaadca0ESEhoxlkaoaxad2fhCdnakmbadhlinaoTmlarao9Rax6mlaoaxfhoalcufglmbkaChoxekcbhmawcjdfhAinarao9Rax6miawamfRbbhHawcj;cbfhlaAhiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkaAcefhAaoaxfhoamcefgmad9hmbkaChokabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqaombkc9:hoxekc9:hokavcj;ebf8Kjjjjbaok;cseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;oiliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabaiavcefciGfcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavciGfgkcd7cetfaD87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavcufciGfcetfaD87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohvxekcjjjj94hvkabakcetfav87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklzNbb", e = "b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q:6dkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq:p9sqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk:N8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhlaicefhodnaeTmbadTmbalc;WFbGglcjdalcjd6EhwcbhDinawaeaD9RaDawfae6Egqcsfglc9WGgkci2hxakcethmalcl4cifcd4hPabaDad2fhsakc;ab6hzcbhHincbhOaohAdndninaraA9RaP6meavcj;cbfaOak2fhCaAaPfhocbhidnazmbarao9Rc;Gb6mbcbhlinaCalfhidndndndndnaAalco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklbaoczfhokdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklzaoczfhokdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklaaoczfhokdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaoclfaYpQbfaXc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaocwfaYpQbfaXc:q:yjjbfRbbfhoxekaiaopbbbpkl8Waoczfhokalc;abfhialcjefak0meaihlarao9Rc;Fb0mbkkdnaiak9pmbaici4hlinarao9RcK6miaCaifhXdndndndndnaAaico4fRbbalcoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpkbbxikaXaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaXaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaXaopbbbpkbbaoczfhokalcdfhlaiczfgiak6mbkkaoTmeaohAaOcefgOclSmdxbkkc9:hoxlkdnakTmbavcjdfaHfhiavaHfpbdbhYcbhXinaiavcj;cbfaXfglpblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLalakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEalamfpblbg3cep9Ta3aQp9op9Hp9rg3alaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfhiaXczfgXak6mbkkaHclfgHad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfgDae6mbkkcbc99arao9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk::seHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:wPliuo97eue978Jjjjjbca9Rhiaec98Ghldndnadcl9hmbdnalTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalaeSmeaipxbbbbbbbbbbbbbbbbgqpklbaiabalcdtfgdaeciGglcdtgv;8qbbdnalTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDaqp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkadaiav;8qbbskdnalTmbcbhvabhdinadczfgxaxpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oaoarpmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgval6mbkkalaeSmbaiaeciGgvcitgdfcbcaad9R;8kbaiabalcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oaoarpmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalaeSmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbheabhdinadadpbbbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbadczfhdaeclfgeav6mbkkdnavalSmbaialciGgecdtgdVcbc;abad9R;8kbaiabavcdtfgvad;8qbbdnaeTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepklbkavaiad;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz:Dbb", t = new Uint8Array([
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
  var s = WebAssembly.validate(t) ? o(e) : o(c), n, r = WebAssembly.instantiate(s, {}).then(function(b) {
    n = b.instance, n.exports.__wasm_call_ctors();
  });
  function o(b) {
    for (var y = new Uint8Array(b.length), E = 0; E < b.length; ++E) {
      var C = b.charCodeAt(E);
      y[E] = C > 96 ? C - 97 : C > 64 ? C - 39 : C + 4;
    }
    for (var w = 0, E = 0; E < b.length; ++E)
      y[w++] = y[E] < 60 ? i[y[E]] : (y[E] - 60) * 64 + y[++E];
    return y.buffer.slice(0, w);
  }
  function a(b, y, E, C, w, S, v) {
    var I = b.exports.sbrk, B = C + 3 & -4, M = I(B * w), x = I(S.length), Q = new Uint8Array(b.exports.memory.buffer);
    Q.set(S, x);
    var P = y(M, C, w, x, S.length);
    if (P == 0 && v && v(M, B, w), E.set(Q.subarray(M, M + C * w)), I(M - I(0)), P != 0)
      throw new Error("Malformed buffer data: " + P);
  }
  var l = {
    NONE: "",
    OCTAHEDRAL: "meshopt_decodeFilterOct",
    QUATERNION: "meshopt_decodeFilterQuat",
    EXPONENTIAL: "meshopt_decodeFilterExp"
  }, d = {
    ATTRIBUTES: "meshopt_decodeVertexBuffer",
    TRIANGLES: "meshopt_decodeIndexBuffer",
    INDICES: "meshopt_decodeIndexSequence"
  }, h = [], u = 0;
  function A(b) {
    var y = {
      object: new Worker(b),
      pending: 0,
      requests: {}
    };
    return y.object.onmessage = function(E) {
      var C = E.data;
      y.pending -= C.count, y.requests[C.id][C.action](C.value), delete y.requests[C.id];
    }, y;
  }
  function p(b) {
    for (var y = "self.ready = WebAssembly.instantiate(new Uint8Array([" + new Uint8Array(s) + "]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = " + g.name + ";" + a.toString() + g.toString(), E = new Blob([y], { type: "text/javascript" }), C = URL.createObjectURL(E), w = h.length; w < b; ++w)
      h[w] = A(C);
    for (var w = b; w < h.length; ++w)
      h[w].object.postMessage({});
    h.length = b, URL.revokeObjectURL(C);
  }
  function f(b, y, E, C, w) {
    for (var S = h[0], v = 1; v < h.length; ++v)
      h[v].pending < S.pending && (S = h[v]);
    return new Promise(function(I, B) {
      var M = new Uint8Array(E), x = ++u;
      S.pending += b, S.requests[x] = { resolve: I, reject: B }, S.object.postMessage({ id: x, count: b, size: y, source: M, mode: C, filter: w }, [M.buffer]);
    });
  }
  function g(b) {
    var y = b.data;
    if (!y.id)
      return self.close();
    self.ready.then(function(E) {
      try {
        var C = new Uint8Array(y.count * y.size);
        a(E, E.exports[y.mode], C, y.count, y.size, y.source, E.exports[y.filter]), self.postMessage({ id: y.id, count: y.count, action: "resolve", value: C }, [C.buffer]);
      } catch (w) {
        self.postMessage({ id: y.id, count: y.count, action: "reject", value: w });
      }
    });
  }
  return {
    ready: r,
    supported: !0,
    useWorkers: function(b) {
      p(b);
    },
    decodeVertexBuffer: function(b, y, E, C, w) {
      a(n, n.exports.meshopt_decodeVertexBuffer, b, y, E, C, n.exports[l[w]]);
    },
    decodeIndexBuffer: function(b, y, E, C) {
      a(n, n.exports.meshopt_decodeIndexBuffer, b, y, E, C);
    },
    decodeIndexSequence: function(b, y, E, C) {
      a(n, n.exports.meshopt_decodeIndexSequence, b, y, E, C);
    },
    decodeGltfBuffer: function(b, y, E, C, w, S) {
      a(n, n.exports[d[w]], b, y, E, C, n.exports[l[S]]);
    },
    decodeGltfBufferAsync: function(b, y, E, C, w) {
      return h.length > 0 ? f(b, y, E, d[C], l[w]) : r.then(function() {
        var S = new Uint8Array(b * y);
        return a(n, n.exports[d[C]], S, b, y, E, n.exports[l[w]]), S;
      });
    }
  };
}();
function kl(c) {
  if (!c) return;
  (Array.isArray(c) ? c : [c]).forEach((t) => {
    t && (Object.keys(t).forEach((i) => {
      const s = t[i];
      s && s.isTexture && s.dispose();
    }), typeof t.dispose == "function" && t.dispose());
  });
}
function Vi(c) {
  !c || !c.traverse || c.traverse((e) => {
    e.geometry && e.geometry.dispose(), e.material && kl(e.material);
  });
}
function Fl() {
  m.Cache && typeof m.Cache.clear == "function" && m.Cache.clear();
}
const Ul = "https://www.gstatic.com/draco/versioned/decoders/1.5.6/", Vl = "https://cdn.jsdelivr.net/npm/three@0.177.0/examples/jsm/libs/basis/", Nl = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles";
function ps(c) {
  return typeof c != "string" || c.length === 0 || c.endsWith("/") ? c : `${c}/`;
}
function Gl(c) {
  return typeof c != "string" || c.length === 0 ? c : c.replace(/\/+$/, "");
}
function ii(c, e) {
  return typeof c != "string" || c.length === 0 ? e : `${ps(c)}${e.replace(/^\/+/, "")}`;
}
function bi(c = {}, e = {}) {
  const t = c.assetBasePath, i = typeof t == "string" && t.length > 0, s = {
    dracoDecoderPath: e.dracoDecoderPath || Ul,
    ktx2TranscoderPath: e.ktx2TranscoderPath || Vl,
    webxrInputProfilesPath: e.webxrInputProfilesPath || Nl
  };
  return i && (s.dracoDecoderPath = ii(t, "draco/1.5.6/"), s.ktx2TranscoderPath = ii(t, "three/basis/"), s.webxrInputProfilesPath = ii(t, "webxr-input-profiles/assets/1.0/profiles")), typeof c.dracoDecoderPath == "string" && c.dracoDecoderPath.length > 0 && (s.dracoDecoderPath = c.dracoDecoderPath), typeof c.ktx2TranscoderPath == "string" && c.ktx2TranscoderPath.length > 0 && (s.ktx2TranscoderPath = c.ktx2TranscoderPath), typeof c.webxrInputProfilesPath == "string" && c.webxrInputProfilesPath.length > 0 && (s.webxrInputProfilesPath = c.webxrInputProfilesPath), {
    dracoDecoderPath: ps(s.dracoDecoderPath),
    ktx2TranscoderPath: ps(s.ktx2TranscoderPath),
    webxrInputProfilesPath: Gl(s.webxrInputProfilesPath)
  };
}
class ne {
  constructor(e = null, t = {}) {
    this.renderer = e, this.isIOSWebKit = ne.isIOSWebKit(), this.platformKey = ne.getPlatformKey(), this.assetPaths = bi(t), this.loader = new qe(), this.dracoLoader = new Sr(), this.ktx2Loader = null, this.loadQueue = Promise.resolve(), this.activeIOSLoad = !1, this.dracoLoader.setDecoderPath(this.assetPaths.dracoDecoderPath), this.isIOSWebKit && typeof this.dracoLoader.setWorkerLimit == "function" && this.dracoLoader.setWorkerLimit(1), this.loader.setDRACOLoader(this.dracoLoader), this.loader.setMeshoptDecoder(Pl), this.loader.register((i) => ({
      name: "KHR_materials_pbrSpecularGlossiness",
      extendMaterialParams: async (s, n) => {
        const r = i.json.materials[s];
        if (!r.extensions || !r.extensions.KHR_materials_pbrSpecularGlossiness)
          return Promise.resolve();
        const o = r.extensions.KHR_materials_pbrSpecularGlossiness;
        return o.diffuseTexture !== void 0 && (n.map = await i.getDependency("texture", o.diffuseTexture.index)), o.diffuseFactor !== void 0 && (n.color = new m.Color().fromArray(o.diffuseFactor)), o.glossinessFactor !== void 0 && (n.roughness = 1 - o.glossinessFactor), n.metalness = 0, Promise.resolve();
      }
    })), this.cache = /* @__PURE__ */ new Map(), this.ktx2SetupComplete = !1, this.setupKTX2Loader();
  }
  setupKTX2Loader() {
    const e = this.getKTX2LoaderKey();
    try {
      if (!ne.sharedKTX2Loaders.has(e)) {
        const t = new oe();
        t.setTranscoderPath(this.assetPaths.ktx2TranscoderPath), this.isIOSWebKit && typeof t.setWorkerLimit == "function" && t.setWorkerLimit(1), ne.sharedKTX2Loaders.set(e, t), ne.sharedKTX2SetupComplete.set(e, !1);
      }
      this.ktx2Loader = ne.sharedKTX2Loaders.get(e), this.loader.setKTX2Loader(this.ktx2Loader), this.ktx2SetupComplete = ne.sharedKTX2SetupComplete.get(e) || !1, this.renderer && !this.ktx2SetupComplete && this.ensureKTX2Support();
    } catch (t) {
      console.warn("KTX2 loader setup failed, falling back to standard textures:", t), this.ktx2Loader = null;
    }
  }
  ensureKTX2Support() {
    if (!this.ktx2Loader || !this.renderer)
      return;
    const e = this.getKTX2LoaderKey();
    if (ne.sharedKTX2SetupComplete.get(e)) {
      this.ktx2SetupComplete = !0;
      return;
    }
    try {
      this.ktx2Loader.detectSupport(this.renderer), ne.sharedKTX2SetupComplete.set(e, !0), this.ktx2SetupComplete = !0;
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
  async load(e, t = null, i = null, s = null) {
    if (this.cache.has(e)) {
      s && s("cloning");
      const a = this.cache.get(e).scene.clone(!0);
      return this.processModel({ scene: a });
    }
    const n = () => this.performLoad(e, t, i, s);
    if (!this.isIOSWebKit)
      return n();
    const r = this.loadQueue.then(() => (this.activeIOSLoad && typeof s == "function" && s("freeing-resources"), n()));
    return this.loadQueue = r.catch(() => {
    }), r;
  }
  performLoad(e, t = null, i = null, s = null) {
    return new Promise((n, r) => {
      let o = null;
      const a = () => {
        i && o && (i.removeEventListener("abort", o), o = null);
      }, l = () => {
        a(), this.isIOSWebKit && (this.activeIOSLoad = !1), r(new Error("Loading cancelled"));
      };
      if (i && (o = l, i.addEventListener("abort", o), i.aborted)) {
        l();
        return;
      }
      s && s("downloading"), this.isIOSWebKit && (this.activeIOSLoad = !0), this.loader.load(
        e,
        (d) => {
          if (s && s("processing"), i && i.aborted) {
            a();
            return;
          }
          this.cache.set(e, d);
          const h = this.processModel(d);
          s && s("finalizing"), this.releaseParserCaches(d), a(), this.isIOSWebKit && (this.activeIOSLoad = !1), n(h);
        },
        (d) => {
          i && i.aborted || t && t(d);
        },
        (d) => {
          a(), this.isIOSWebKit && (this.activeIOSLoad = !1), r(d);
        }
      );
    });
  }
  processModel(e) {
    const t = e.scene, i = this.getMaxAnisotropy(), s = e.parser || null, n = this.shouldNormalizePhotogrammetryAtlas(s);
    t.traverse((o) => {
      if (o.isLight && (o.visible = !1), o.isMesh && o.material) {
        o.castShadow = !0, o.receiveShadow = !0;
        const l = (Array.isArray(o.material) ? o.material : [o.material]).map(
          (d) => this.normalizeMaterial(d, s, n, i)
        );
        o.material = Array.isArray(o.material) ? l : l[0], o.geometry && (n ? o.geometry.computeVertexNormals() : o.geometry.attributes?.normal || o.geometry.computeVertexNormals(), o.geometry.normalizeNormals(), l.some((h) => h?.normalMap) && this.canComputeTangents(o.geometry) && o.geometry.computeTangents());
      }
    });
    const r = new m.Box3().setFromObject(t);
    return t.userData.boundingBox = r, t;
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
  normalizeMaterial(e, t, i, s) {
    if (!e)
      return e;
    this.clearBakedLighting(e);
    const n = this.getGLTFMaterialDef(t, e), o = i || e.type === "MeshBasicMaterial" || e.type === "MeshPhongMaterial" ? this.createStandardMaterial(e, n, i) : e;
    return this.processMaterialTextures(o, s, i), o.needsUpdate !== void 0 && (o.needsUpdate = !0), e !== o && typeof e.dispose == "function" && e.dispose(), o;
  }
  clearBakedLighting(e) {
    e.emissive && e.emissive.setHex(0), e.emissiveIntensity !== void 0 && (e.emissiveIntensity = 0), e.emissiveMap && (e.emissiveMap = null), e.lightMap && (e.lightMap = null), e.lightMapIntensity !== void 0 && (e.lightMapIntensity = 0);
  }
  createStandardMaterial(e, t, i) {
    const s = t?.pbrMetallicRoughness || {}, n = e.color?.clone?.() || new m.Color(16777215), r = new m.MeshStandardMaterial({
      color: n,
      side: i ? m.FrontSide : e.side ?? m.FrontSide,
      wireframe: e.wireframe || !1,
      vertexColors: e.vertexColors || !1,
      fog: e.fog ?? !0,
      flatShading: !1,
      roughness: i ? 1 : s.roughnessFactor ?? e.roughness ?? 0.8,
      metalness: i ? 0 : s.metallicFactor ?? e.metalness ?? 0.3
    });
    return e.map && (r.map = e.map), e.alphaMap && (r.alphaMap = e.alphaMap), e.transparent !== void 0 && (r.transparent = e.transparent), typeof e.opacity == "number" && (r.opacity = e.opacity), i || (e.aoMap && (r.aoMap = e.aoMap), typeof e.aoMapIntensity == "number" && (r.aoMapIntensity = e.aoMapIntensity), e.envMap && (r.envMap = e.envMap), e.roughnessMap && (r.roughnessMap = e.roughnessMap), e.metalnessMap && (r.metalnessMap = e.metalnessMap), e.normalMap && (r.normalMap = e.normalMap, r.normalScale = e.normalScale || new m.Vector2(1, 1))), r;
  }
  processMaterialTextures(e, t, i) {
    [
      "map",
      "alphaMap",
      "normalMap",
      "roughnessMap",
      "metalnessMap",
      "aoMap",
      "emissiveMap"
    ].forEach((n) => {
      e[n] && this.processTexture(e[n], t, {
        fixPhotogrammetryAtlas: i && n === "map"
      });
    });
  }
  getGLTFMaterialDef(e, t) {
    const i = e?.associations?.get?.(t)?.materials;
    return i == null ? null : e?.json?.materials?.[i] || null;
  }
  shouldNormalizePhotogrammetryAtlas(e) {
    const t = e?.json;
    if (!t)
      return !1;
    const i = t.materials || [], s = t.meshes || [], n = t.accessors || [];
    if (!i.length || !s.length)
      return !1;
    const r = i.some(
      (l) => l?.pbrMetallicRoughness?.baseColorTexture !== void 0
    ), o = i.some(
      (l) => l?.normalTexture || l?.occlusionTexture || l?.emissiveTexture || l?.pbrMetallicRoughness?.metallicRoughnessTexture
    );
    if (!r || o)
      return !1;
    let a = 0;
    for (const l of s)
      for (const d of l.primitives || []) {
        if (d?.attributes?.POSITION === void 0 || d.attributes.TEXCOORD_0 === void 0)
          return !1;
        const h = n[d.attributes.POSITION]?.count || 0, u = d.indices !== void 0 ? n[d.indices]?.count || 0 : h;
        a += Math.floor(u / 3);
      }
    return a >= 5e4;
  }
  processTexture(e, t = null, { fixPhotogrammetryAtlas: i = !1 } = {}) {
    e && (t !== null && (e.anisotropy = t), i && (e.isCompressedTexture || (e.generateMipmaps = !1), e.minFilter = m.LinearFilter, e.wrapS = m.ClampToEdgeWrapping, e.wrapT = m.ClampToEdgeWrapping), e.needsUpdate = !0);
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
    const t = /* @__PURE__ */ new Set(), i = (s) => {
      !s || t.has(s) || (t.add(s), s.traverse((n) => {
        n.isMesh && (n.geometry && n.geometry.dispose(), this.disposeMaterialResources(n.material));
      }));
    };
    Array.isArray(e.scenes) && e.scenes.forEach(i), e.scene && i(e.scene);
  }
  disposeMaterialResources(e) {
    if (!e) return;
    const t = Array.isArray(e) ? e : [e], i = [
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
    t.forEach((s) => {
      s && (i.forEach((n) => {
        const r = s[n];
        r && typeof r.dispose == "function" && r.dispose(), r && r.source && typeof r.source.dispose == "function" && r.source.dispose(), r && r.image && typeof r.image.close == "function" && r.image.close(), r && (s[n] = null);
      }), typeof s.dispose == "function" && s.dispose());
    });
  }
  releaseParserCaches(e) {
    const t = e?.parser;
    t && (t.cache && typeof t.cache.removeAll == "function" && t.cache.removeAll(), t.associations && typeof t.associations.clear == "function" && t.associations.clear(), t.primitiveCache = {}, t.nodeCache = {}, t.meshCache = { refs: {}, uses: {} }, t.cameraCache = { refs: {}, uses: {} }, t.lightCache = { refs: {}, uses: {} }, t.sourceCache = {}, t.textureCache = {}, t.nodeNamesUsed = {}, t.json = null, t.extensions = null, t.plugins = null, t.options = null, t.textureLoader = null, e.parser = null, Fl());
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
    return ne.isIOSWebKit() ? "ios" : "default";
  }
}
ne.sharedKTX2Loaders = /* @__PURE__ */ new Map();
ne.sharedKTX2SetupComplete = /* @__PURE__ */ new Map();
function Ol(c, e = null, t = null) {
  const i = [];
  for (i.push(c), i.push(null), i.push(0); i.length > 0; ) {
    const s = i.pop(), n = i.pop(), r = i.pop();
    if (e && e(r, n, s)) {
      t && t(r, n, s);
      return;
    }
    const o = r.children;
    if (o)
      for (let a = o.length - 1; a >= 0; a--)
        i.push(o[a]), i.push(r), i.push(s + 1);
    t && t(r, n, s);
  }
}
function Oe(c) {
  if (c === null || c.byteLength < 4)
    return "";
  let e;
  if (c instanceof DataView ? e = c : e = new DataView(c), String.fromCharCode(e.getUint8(0)) === "{")
    return null;
  let t = "";
  for (let i = 0; i < 4; i++)
    t += String.fromCharCode(e.getUint8(i));
  return t;
}
const Hl = new TextDecoder();
function Bs(c) {
  return Hl.decode(c);
}
function xs(c) {
  return c.replace(/[\\/][^\\/]+$/, "") + "/";
}
let Tt = class {
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
    }).then((t) => (this.workingPath === "" && (this.workingPath = xs(e)), this.parse(t)));
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
var zl = Object.defineProperty, ql = (c, e, t) => e in c ? zl(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[e] = t, rn = (c, e, t) => ql(c, typeof e != "symbol" ? e + "" : e, t);
function on(c) {
  if (!c)
    return null;
  let e = c.length;
  const t = c.indexOf("?"), i = c.indexOf("#");
  t !== -1 && (e = Math.min(e, t)), i !== -1 && (e = Math.min(e, i));
  const s = c.lastIndexOf(".", e), n = c.lastIndexOf("/", e), r = c.indexOf("://");
  return r !== -1 && r + 2 === n || s === -1 || s < n ? null : c.substring(s + 1, e) || null;
}
class He {
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
    const { session: t, pending: i } = this;
    let s;
    const n = () => {
      i.delete(s), e();
    };
    return t ? s = t.requestAnimationFrame(n) : s = requestAnimationFrame(n), i.set(s, e), s;
  }
  /**
   * Cancel animation frame via handle (defer to XR session if set)
   * @param {number} handle
   */
  static cancelAnimationFrame(e) {
    const { pending: t, session: i } = this;
    t.delete(e), i ? i.cancelAnimationFrame(e) : cancelAnimationFrame(e);
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
rn(He, "pending", /* @__PURE__ */ new Map()), rn(He, "session", null);
const an = 2 ** 30;
class jl {
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
    e.length === 1 ? (console.warn('LRUCache: "unloadPriorityCallback" function has been changed to take two arguments.'), this._unloadPriorityCallback = (t, i) => {
      const s = e(t), n = e(i);
      return s < n ? -1 : s > n ? 1 : 0;
    }) : this._unloadPriorityCallback = e;
  }
  constructor() {
    this.minSize = 6e3, this.maxSize = 8e3, this.minBytesSize = 0.3 * an, this.maxBytesSize = 0.4 * an, this.unloadPercent = 0.05, this.autoMarkUnused = !0, this.itemSet = /* @__PURE__ */ new Map(), this.itemList = [], this.usedSet = /* @__PURE__ */ new Set(), this.callbacks = /* @__PURE__ */ new Map(), this.unloadingHandle = -1, this.cachedBytes = 0, this.bytesMap = /* @__PURE__ */ new Map(), this.loadedSet = /* @__PURE__ */ new Set(), this._unloadPriorityCallback = null;
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
    const { bytesMap: i, itemSet: s } = this;
    s.has(e) && (this.cachedBytes -= i.get(e) || 0, i.set(e, t), this.cachedBytes += t);
  }
  /**
   * Adds an item to the cache. Returns false if the item already exists or the cache is full.
   * @param {any} item
   * @param {RemoveCallback} removeCb - Called with the item when it is evicted
   * @returns {boolean}
   */
  add(e, t) {
    const i = this.itemSet;
    if (i.has(e) || this.isFull())
      return !1;
    const s = this.usedSet, n = this.itemList, r = this.callbacks;
    return n.push(e), s.add(e), i.set(e, Date.now()), r.set(e, t), !0;
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
    const t = this.usedSet, i = this.itemSet, s = this.itemList, n = this.bytesMap, r = this.callbacks, o = this.loadedSet;
    if (i.has(e)) {
      this.cachedBytes -= n.get(e) || 0, n.delete(e), r.get(e)(e);
      const a = s.indexOf(e);
      return s.splice(a, 1), t.delete(e), i.delete(e), r.delete(e), o.delete(e), !0;
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
    const { itemSet: i, loadedSet: s } = this;
    i.has(e) && (t === !0 ? s.add(e) : s.delete(e));
  }
  /**
   * Marks an item as used in the current frame, preventing it from being evicted.
   * @param {any} item
   */
  markUsed(e) {
    const t = this.itemSet, i = this.usedSet;
    t.has(e) && !i.has(e) && (t.set(e, Date.now()), i.add(e));
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
      maxSize: i,
      itemList: s,
      itemSet: n,
      usedSet: r,
      loadedSet: o,
      callbacks: a,
      bytesMap: l,
      minBytesSize: d,
      maxBytesSize: h
    } = this, u = s.length - r.size, A = s.length - o.size, p = Math.max(Math.min(s.length - t, u), 0), f = this.cachedBytes - d, g = this.unloadPriorityCallback || this.defaultPriorityCallback;
    let b = !1;
    const y = p > 0 && u > 0 || A && s.length > i;
    if (u && this.cachedBytes > d || A && this.cachedBytes > h || y) {
      s.sort((B, M) => {
        const x = r.has(B), Q = r.has(M);
        if (x === Q) {
          const P = o.has(B), T = o.has(M);
          return P === T ? -g(B, M) : P ? 1 : -1;
        } else
          return x ? 1 : -1;
      });
      const E = Math.max(t * e, p * e), C = Math.ceil(Math.min(E, u, p)), w = Math.max(e * f, e * d), S = Math.min(w, f);
      let v = 0, I = 0;
      for (; this.cachedBytes - I > h || s.length - v > i; ) {
        const B = s[v], M = l.get(B) || 0;
        if (r.has(B) && o.has(B) || this.cachedBytes - I - M < h && s.length - v <= i)
          break;
        I += M, v++;
      }
      for (; I < S || v < C; ) {
        const B = s[v], M = l.get(B) || 0;
        if (r.has(B) || this.cachedBytes - I - M < d && v >= C)
          break;
        I += M, v++;
      }
      s.splice(0, v).forEach((B) => {
        this.cachedBytes -= l.get(B) || 0, a.get(B)(B), l.delete(B), n.delete(B), a.delete(B), o.delete(B), r.delete(B);
      }), b = v < p || I < f && v < u, b = b && v > 0;
    }
    b && (this.unloadingHandle = He.requestAnimationFrame(() => this.scheduleUnload()));
  }
  /**
   * Schedules `unloadUnusedContent` to run asynchronously via microtask.
   */
  scheduleUnload() {
    He.cancelAnimationFrame(this.unloadingHandle), this.scheduled || (this.scheduled = !0, queueMicrotask(() => {
      this.scheduled = !1, this.unloadUnusedContent();
    }));
  }
}
class Kl extends DOMException {
  constructor() {
    super("PriorityQueue: Item removed", "AbortError");
  }
}
let yi = class {
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
      He.requestAnimationFrame(e);
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
    const i = {
      callback: t,
      reject: null,
      resolve: null,
      promise: null
    };
    return i.promise = new Promise((s, n) => {
      const r = this.items, o = this.callbacks;
      i.resolve = s, i.reject = n, r.unshift(e), o.set(e, i), this.autoUpdate && this.scheduleJobRun();
    }), i.promise;
  }
  /**
   * Removes an item from the queue, rejecting its promise with an `AbortError` DOMException.
   * @param {any} item
   */
  remove(e) {
    const t = this.items, i = this.callbacks, s = t.indexOf(e);
    if (s !== -1) {
      const n = i.get(e);
      n.promise.catch((r) => {
        if (r.name !== "AbortError")
          throw r;
      }), n.reject(new Kl()), t.splice(s, 1), i.delete(e);
    }
  }
  /**
   * Removes all queued items for which `filter` returns true.
   * @param {FilterCallback} filter - Called with each item; return true to remove
   */
  removeByFilter(e) {
    const { items: t } = this;
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      e(s) && (this.remove(s), i--);
    }
  }
  /**
   * Immediately attempts to dequeue and run pending jobs up to `maxJobs` concurrency.
   */
  tryRunJobs() {
    this.sort();
    const e = this.items, t = this.callbacks, i = this.maxJobs;
    let s = 0;
    const n = () => {
      this.currJobs--, this.autoUpdate && this.scheduleJobRun();
    };
    for (; i > this.currJobs && e.length > 0 && s < i; ) {
      this.currJobs++, s++;
      const r = e.pop(), { callback: o, resolve: a, reject: l } = t.get(r);
      t.delete(r);
      let d;
      try {
        d = o(r);
      } catch (h) {
        l(h), n();
      }
      d instanceof Promise ? d.then(a).catch(l).finally(n) : (a(d), n());
    }
  }
  /**
   * Immediately runs the callback for the given item, removing it from the queue.
   * Does nothing if the item is not queued.
   * @param {any} item
   * @returns {Promise<any>|any}
   */
  flush(e) {
    const { items: t, callbacks: i } = this, s = t.indexOf(e);
    if (!i.has(e))
      return;
    const { callback: n, resolve: r, reject: o } = i.get(e);
    i.delete(e), t.splice(s, 1);
    let a;
    try {
      a = n(e);
    } catch (l) {
      o(l);
      return;
    }
    return a instanceof Promise ? a.then(r).catch(o) : r(a), a;
  }
  /**
   * Schedules a deferred call to `tryRunJobs` via `schedulingCallback`.
   */
  scheduleJobRun() {
    this.scheduled || (this._schedulingCallback(this._runjobs), this.scheduled = !0);
  }
};
const Et = -1, Be = 0, kt = 1, Ft = 2, Ni = 3, Qe = 4, ln = 6378137, Yl = 6356752314245179e-9, Ut = {
  inView: !1,
  error: 1 / 0,
  distanceFromCamera: 1 / 0
};
function Ci(c) {
  return c === Qe || c === Et;
}
function ve(c, e) {
  return Ei(c) && c.traversal.lastFrameVisited === e && c.traversal.used;
}
function Ei(c) {
  return !!c.traversal;
}
function Rt(c) {
  const { children: e } = c, t = e.length === 0 || Ei(e[e.length - 1]), i = !c.internal.hasUnrenderableContent || Ci(c.internal.loadingState);
  return t && i;
}
function ze(c) {
  return c.traversal.unconditionallyRefine;
}
function Mt(c, e) {
  if (Ei(c) && (e.ensureChildrenArePreprocessed(c), c.traversal.lastFrameVisited !== e.frameCount && (c.traversal.wasInFrustum = c.traversal.inFrustum, c.traversal.wasSetActive = c.traversal.active, c.traversal.wasSetVisible = c.traversal.visible, c.traversal.usedLastFrame = c.traversal.used, c.traversal.lastFrameVisited = e.frameCount, c.traversal.used = !1, c.traversal.inFrustum = !1, c.traversal.isLeaf = !1, c.traversal.visible = !1, c.traversal.active = !1, c.traversal.error = 1 / 0, c.traversal.distanceFromCamera = 1 / 0, c.traversal.allChildrenReady = !1, c.traversal.allChildrenLoaded = !1, c.traversal.kicked = !1, c.traversal.allUsedChildrenProcessed = !1, e.calculateTileViewErrorWithPlugin(c, Ut), c.traversal.inFrustum = Ut.inView, c.traversal.error = Ut.error, c.traversal.distanceFromCamera = Ut.distanceFromCamera, c.traversal.unconditionallyRefine = c.internal.hasUnrenderableContent, !c.traversal.unconditionallyRefine))) {
    let t = c.parent;
    for (; t && t.traversal.unconditionallyRefine; )
      t = t.parent;
    t && t.geometricError <= c.geometricError && (c.traversal.unconditionallyRefine = !0);
  }
}
function fs(c, e, t = !1) {
  if (Mt(c, e), t ? e.markTileUsed(c) : ri(c), ze(c) && Rt(c)) {
    const i = c.children;
    for (let s = 0, n = i.length; s < n; s++)
      fs(i[s], e, t);
  }
}
function Or(c, e) {
  if (Mt(c, e), c.traversal.usedLastFrame && (ri(c), c.traversal.wasSetActive && (c.traversal.active = !0), (!c.traversal.active || ze(c)) && Rt(c))) {
    const t = c.children;
    for (let i = 0, s = t.length; i < s; i++)
      Or(t[i], e);
  }
}
function ri(c) {
  c.traversal.used = !0;
}
function Wl(c, e) {
  return !(c.traversal.error <= e.errorTarget && !ze(c) || e.maxDepth > 0 && c.internal.depth + 1 >= e.maxDepth || !Rt(c));
}
function Hr(c, e) {
  const { frameCount: t } = e, { children: i } = c;
  for (let s = 0, n = i.length; s < n; s++) {
    const r = i[s];
    ve(r, t) && (r.traversal.active && (r.traversal.kicked = !0, r.traversal.active = !1), Hr(r, e));
  }
}
function cn(c) {
  return !ze(c) && (!c.internal.hasContent || Ci(c.internal.loadingState));
}
function zr(c, e) {
  if (Mt(c, e), !c.traversal.inFrustum)
    return;
  if (!Wl(c, e)) {
    ri(c);
    return;
  }
  let t = !1, i = !1;
  const s = c.children;
  for (let n = 0, r = s.length; n < r; n++) {
    const o = s[n];
    zr(o, e), t = t || ve(o, e.frameCount), i = i || o.traversal.inFrustum;
  }
  if (c.refine === "REPLACE" && !i && s.length !== 0) {
    c.traversal.inFrustum = !1, e.markTileUsed(c);
    for (let n = 0, r = s.length; n < r; n++)
      fs(s[n], e, !0);
    return;
  }
  if (ri(c), c.refine === "REPLACE" && t && (e.loadSiblings || e.loadAncestors))
    for (let n = 0, r = s.length; n < r; n++)
      fs(s[n], e);
}
function qr(c, e) {
  const t = e.frameCount;
  if (!ve(c, t))
    return;
  const i = c.children;
  let s = !1;
  for (let r = 0, o = i.length; r < o; r++) {
    const a = i[r];
    s = s || ve(a, t);
  }
  if (!s)
    c.traversal.isLeaf = !0;
  else {
    for (let o = 0, a = i.length; o < a; o++)
      qr(i[o], e);
    let r = !0;
    for (let o = 0, a = i.length; o < a; o++) {
      const l = i[o];
      if (ve(l, t)) {
        const d = !ze(l), h = !l.internal.hasContent || Ci(l.internal.loadingState);
        d && h || l.traversal.allChildrenLoaded || (r = !1);
      }
    }
    c.traversal.allChildrenLoaded = r;
  }
  let n = !0;
  for (let r = 0, o = i.length; r < o; r++) {
    const a = i[r];
    ve(a, e.frameCount) && !a.traversal.allUsedChildrenProcessed && (n = !1);
  }
  c.traversal.allUsedChildrenProcessed = n && Rt(c);
}
function jr(c, e) {
  if (!ve(c, e.frameCount))
    return;
  const t = c.children;
  if (e.loadAncestors && !c.traversal.allChildrenLoaded && !ze(c) && (c.traversal.isLeaf = !0), c.traversal.isLeaf) {
    if (!ze(c) && (c.traversal.active = !0, Rt(c) && c.internal.hasContent && !Ci(c.internal.loadingState)))
      for (let s = 0, n = t.length; s < n; s++)
        Or(t[s], e);
    return;
  }
  let i = t.length > 0;
  for (let s = 0, n = t.length; s < n; s++) {
    const r = t[s];
    jr(r, e), ve(r, e.frameCount) && !(r.traversal.active && cn(r)) && !r.traversal.allChildrenReady && (i = !1);
  }
  c.traversal.allChildrenReady = i, !i && c.traversal.wasSetActive && cn(c) && (c.traversal.active = !0, Hr(c, e));
}
function Kr(c, e) {
  Mt(c, e);
  const t = ve(c, e.frameCount);
  if (t && (c.internal.hasUnrenderableContent && (e.markTileUsed(c), e.queueTileForDownload(c)), c.internal.hasRenderableContent && c.refine === "ADD" && (c.traversal.active = !0), (c.traversal.active || c.traversal.kicked) && c.internal.hasContent && (e.markTileUsed(c), c.traversal.allUsedChildrenProcessed && e.queueTileForDownload(c), c.internal.loadingState !== Qe && (c.traversal.active = !1)), e.loadAncestors && c.internal.hasContent && (e.markTileUsed(c), e.queueTileForDownload(c)), c.internal.virtualChildCount > 0 && c.internal.hasContent && e.markTileUsed(c), c.traversal.visible = c.internal.hasRenderableContent && c.traversal.active && c.traversal.inFrustum && c.internal.loadingState === Qe, e.stats.used++, c.traversal.inFrustum && e.stats.inFrustum++), t || Ei(c) && c.traversal.usedLastFrame) {
    let i = !1, s = !1;
    t ? (i = c.traversal.active, e.displayActiveTiles ? s = c.traversal.active || c.traversal.visible : s = c.traversal.visible) : Mt(c, e), c.internal.hasRenderableContent && c.internal.loadingState === Qe ? (i && e.stats.active++, s && e.stats.visible++, c.traversal.wasSetActive !== i && e.invokeOnePlugin((r) => r.setTileActive && r.setTileActive(c, i)), c.traversal.wasSetVisible !== s && e.invokeOnePlugin((r) => r.setTileVisible && r.setTileVisible(c, s))) : c.internal.hasRenderableContent || (s = c.traversal.isLeaf, c.traversal.wasSetVisible !== s && e.invokeOnePlugin((r) => r.setEmptyTileVisible && r.setEmptyTileVisible(c, s))), c.traversal.visible = s, c.traversal.active = i;
    const n = c.children;
    for (let r = 0, o = n.length; r < o; r++) {
      const a = n[r];
      Kr(a, e);
    }
  }
}
function Jl(c, e) {
  zr(c, e), qr(c, e), jr(c, e), Kr(c, e);
}
function Xl(c) {
  let e = null;
  return () => {
    e === null && (e = He.requestAnimationFrame(() => {
      e = null, c();
    }));
  };
}
const hn = Symbol("PLUGIN_REGISTERED"), xe = {
  inView: !0,
  error: 0,
  distance: 1 / 0
}, $l = (c, e) => {
  const t = c.priority || 0, i = e.priority || 0;
  return t !== i ? t > i ? 1 : -1 : !c.traversal || !e.traversal ? 0 : c.traversal.used !== e.traversal.used ? c.traversal.used ? 1 : -1 : c.traversal.error !== e.traversal.error ? c.traversal.error > e.traversal.error ? 1 : -1 : c.traversal.distanceFromCamera !== e.traversal.distanceFromCamera ? c.traversal.distanceFromCamera > e.traversal.distanceFromCamera ? -1 : 1 : c.internal.depthFromRenderedParent !== e.internal.depthFromRenderedParent ? c.internal.depthFromRenderedParent > e.internal.depthFromRenderedParent ? -1 : 1 : 0;
}, Zl = (c, e) => c.traversal.used !== e.traversal.used ? c.traversal.used ? 1 : -1 : c.traversal.inFrustum !== e.traversal.inFrustum ? c.traversal.inFrustum ? 1 : -1 : c.internal.hasUnrenderableContent !== e.internal.hasUnrenderableContent ? c.internal.hasUnrenderableContent ? 1 : -1 : c.traversal.distanceFromCamera !== e.traversal.distanceFromCamera ? c.traversal.distanceFromCamera > e.traversal.distanceFromCamera ? -1 : 1 : c.internal.depthFromRenderedParent !== e.internal.depthFromRenderedParent ? c.internal.depthFromRenderedParent > e.internal.depthFromRenderedParent ? -1 : 1 : 0, ec = (c, e) => c.traversal.lastFrameVisited !== e.traversal.lastFrameVisited ? c.traversal.lastFrameVisited > e.traversal.lastFrameVisited ? -1 : 1 : c.internal.depthFromRenderedParent !== e.internal.depthFromRenderedParent ? c.internal.depthFromRenderedParent > e.internal.depthFromRenderedParent ? 1 : -1 : c.internal.loadingState !== e.internal.loadingState ? c.internal.loadingState > e.internal.loadingState ? -1 : 1 : c.internal.hasUnrenderableContent !== e.internal.hasUnrenderableContent ? c.internal.hasUnrenderableContent ? -1 : 1 : c.traversal.error !== e.traversal.error ? c.traversal.error > e.traversal.error ? -1 : 1 : 0, wi = (c, e) => {
  const t = c.priority ?? 1 / 0, i = e.priority ?? 1 / 0;
  if (t !== i)
    return t > i ? 1 : -1;
  if (!c.internal || !e.internal)
    return 0;
  const s = c.internal.renderer, n = e.internal.renderer, r = !s.loadAncestors, o = !n.loadAncestors;
  return r && o ? Zl(c, e) : $l(c, e);
}, Yr = new jl();
Yr.unloadPriorityCallback = ec;
const Ts = new yi();
Ts.maxJobs = 25;
Ts.priorityCallback = wi;
const Rs = new yi();
Rs.maxJobs = 5;
Rs.priorityCallback = wi;
const Qs = new yi();
Qs.maxJobs = 25;
Qs.priorityCallback = (c, e) => {
  const t = c.parent, i = e.parent;
  return t === i ? 0 : t ? i ? wi(t, i) : -1 : 1;
};
let tc = class {
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
    const { stats: e, isLoading: t } = this, i = e.queued + e.downloading + e.parsing, s = e.inCacheSinceLoad + (t ? 1 : 0);
    return s === 0 ? 1 : 1 - i / s;
  }
  /**
   * @param {string} [url] - URL of the root tileset JSON to load.
   */
  constructor(e = null) {
    this.rootLoadingState = Be, this.rootTileset = null, this.rootURL = e, this.fetchOptions = {}, this.plugins = [], this.queuedTiles = [], this.cachedSinceLoadComplete = /* @__PURE__ */ new Set(), this.isLoading = !1, this.processedTiles = /* @__PURE__ */ new WeakSet(), this.visibleTiles = /* @__PURE__ */ new Set(), this.activeTiles = /* @__PURE__ */ new Set(), this.usedSet = /* @__PURE__ */ new Set(), this.loadingTiles = /* @__PURE__ */ new Set(), this.lruCache = Yr, this.downloadQueue = Ts, this.parseQueue = Rs, this.processNodeQueue = Qs, this.stats = {
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
    }, this.frameCount = 0, this._dispatchNeedsUpdateEvent = Xl(() => {
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
    if (e[hn] === !0)
      throw new Error("TilesRendererBase: A plugin can only be registered to a single tileset");
    const t = this.plugins, i = e.priority || 0;
    let s = t.length;
    for (let n = 0; n < t.length; n++)
      if ((t[n].priority || 0) > i) {
        s = n;
        break;
      }
    t.splice(s, 0, e), e[hn] = !0, e.init && e.init(this);
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
      const i = t.indexOf(e);
      return t.splice(i, 1), e.dispose && e.dispose(), !0;
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
    for (let i = 0; i < t.length; i++) {
      const s = e(t[i]);
      if (s)
        return s;
    }
    return null;
  }
  invokeAllPlugins(e) {
    const t = [...this.plugins, this], i = [];
    for (let s = 0; s < t.length; s++) {
      const n = e(t[s]);
      n && i.push(n);
    }
    return i.length === 0 ? null : Promise.all(i);
  }
  // Public API
  /**
   * Iterates over all tiles in the loaded hierarchy. `beforecb` is called before
   * descending into a tile's children; returning true from it skips the subtree.
   * `aftercb` is called after all children have been visited.
   * @param {TileBeforeCallback|null} [beforecb]
   * @param {TileAfterCallback|null} [aftercb]
   */
  traverse(e, t, i = !0) {
    this.root && Ol(this.root, (s, ...n) => (i && this.ensureChildrenArePreprocessed(s, !0), e ? e(s, ...n) : !1), t);
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
    const { lruCache: e, usedSet: t, stats: i, root: s, downloadQueue: n, parseQueue: r, processNodeQueue: o } = this;
    if (this.rootLoadingState === Be && (this.rootLoadingState = Ft, this.invokeOnePlugin((d) => d.loadRootTileset && d.loadRootTileset()).then((d) => {
      let h = this.rootURL;
      h !== null && this.invokeAllPlugins((u) => h = u.preprocessURL ? u.preprocessURL(h, null) : h), this.rootLoadingState = Qe, this.rootTileset = d, this.dispatchEvent({ type: "needs-update" }), this.dispatchEvent({
        type: "load-tileset",
        tileset: d,
        url: h
      }), this.dispatchEvent({
        type: "load-root-tileset",
        tileset: d,
        url: h
      });
    }).catch((d) => {
      this.rootLoadingState = Et, console.error(d), this.rootTileset = null, this.dispatchEvent({
        type: "load-error",
        tile: null,
        error: d,
        url: this.rootURL
      });
    })), !s)
      return;
    let a = null;
    if (this.invokeAllPlugins((d) => {
      if (d.doTilesNeedUpdate) {
        const h = d.doTilesNeedUpdate();
        a === null ? a = h : a = !!(a || h);
      }
    }), a === !1) {
      this.dispatchEvent({ type: "update-before" }), this.dispatchEvent({ type: "update-after" });
      return;
    }
    this.dispatchEvent({ type: "update-before" }), i.inFrustum = 0, i.used = 0, i.active = 0, i.visible = 0, i.tilesProcessed = 0, this.frameCount++, t.forEach((d) => e.markUnused(d)), t.clear(), this.prepareForTraversal(), Jl(s, this), this.removeUnusedPendingTiles();
    const l = this.queuedTiles;
    l.sort(e.unloadPriorityCallback);
    for (let d = 0, h = l.length; d < h && !e.isFull(); d++)
      this.requestTileContents(l[d]);
    l.length = 0, e.scheduleUnload(), (n.running || r.running || o.running) === !1 && this.isLoading === !0 && (this.cachedSinceLoadComplete.clear(), i.inCacheSinceLoad = 0, this.dispatchEvent({ type: "tiles-load-end" }), this.isLoading = !1), this.dispatchEvent({ type: "update-after" });
  }
  /**
   * Resets any tiles that previously failed to load so they will be retried on the next `update`.
   */
  resetFailedTiles() {
    this.rootLoadingState === Et && (this.rootLoadingState = Be);
    const e = this.stats;
    e.failed !== 0 && (this.traverse((t) => {
      t.internal.loadingState === Et && (t.internal.loadingState = Be);
    }, null, !1), e.failed = 0);
  }
  calculateTileViewErrorWithPlugin(e, t) {
    this.calculateTileViewError(e, t);
    let i = null, s = 0, n = 1 / 0;
    this.invokeAllPlugins((r) => {
      r !== this && r.calculateTileViewError && (xe.inView = !0, xe.error = 0, xe.distance = 1 / 0, r.calculateTileViewError(e, xe) && (i === null && (i = !0), i = i && xe.inView, xe.inView && (n = Math.min(n, xe.distance), s = Math.max(s, xe.error))));
    }), t.inView && i !== !1 ? (t.error = Math.max(t.error, s), t.distanceFromCamera = Math.min(t.distanceFromCamera, n)) : i ? (t.inView = !0, t.error = s, t.distanceFromCamera = n) : t.inView = !1;
  }
  /**
   * Disposes all loaded tiles and unregisters all plugins. The renderer should not
   * be used after calling this.
   */
  dispose() {
    [...this.plugins].forEach((i) => {
      this.unregisterPlugin(i);
    });
    const e = this.lruCache, t = [];
    this.traverse((i) => (t.push(i), !1), null, !1);
    for (let i = 0, s = t.length; i < s; i++)
      e.remove(t[i]);
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
  parseTile(e, t, i) {
    return null;
  }
  prepareForTraversal() {
  }
  disposeTile(e) {
    e.traversal.visible && (e.internal.hasRenderableContent ? this.invokeOnePlugin((i) => i.setTileVisible && i.setTileVisible(e, !1)) : this.invokeOnePlugin((i) => i.setEmptyTileVisible && i.setEmptyTileVisible(e, !1)), e.traversal.visible = !1), e.traversal.active && e.internal.hasRenderableContent && this.invokeOnePlugin((i) => i.setTileActive && i.setTileActive(e, !1)), e.traversal.active = !1;
    const { scene: t } = e.engineData;
    t && this.dispatchEvent({
      type: "dispose-model",
      scene: t,
      tile: e
    });
  }
  preprocessNode(e, t, i = null) {
    var s;
    if (this.processedTiles.add(e), this.stats.tilesProcessed++, e.content && (!("uri" in e.content) && "url" in e.content && (e.content.uri = e.content.url, delete e.content.url), e.content.boundingVolume && !("box" in e.content.boundingVolume || "sphere" in e.content.boundingVolume || "region" in e.content.boundingVolume) && delete e.content.boundingVolume), e.parent = i, e.children = e.children || [], e.internal = {
      hasContent: !1,
      hasRenderableContent: !1,
      hasUnrenderableContent: !1,
      loadingState: Be,
      basePath: t,
      depth: -1,
      depthFromRenderedParent: -1,
      isVirtual: !1,
      virtualChildCount: 0,
      renderer: this,
      // preserve any pre-seeded fields
      ...e.internal
    }, (s = e.content) != null && s.uri) {
      const n = on(e.content.uri), r = !!(n && /json$/.test(n));
      e.internal.hasContent = !0, e.internal.hasUnrenderableContent = r, e.internal.hasRenderableContent = !r;
    } else
      e.internal.hasContent = !1, e.internal.hasUnrenderableContent = !1, e.internal.hasRenderableContent = !1;
    i ? (e.internal.depth = i.internal.depth + 1, e.internal.depthFromRenderedParent = i.internal.depthFromRenderedParent + (e.internal.hasRenderableContent ? 1 : 0)) : (e.internal.depth = 0, e.internal.depthFromRenderedParent = e.internal.hasRenderableContent ? 1 : 0), e.traversal = {
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
    }, i === null ? e.refine = e.refine || "REPLACE" : e.refine = e.refine || i.refine, e.engineData = {
      scene: null,
      metadata: null,
      boundingVolume: null
    }, Object.defineProperty(e, "cached", {
      get() {
        return console.warn('TilesRenderer: "tile.cached" field has been renamed to "tile.engineData".'), this.engineData;
      },
      enumerable: !1,
      configurable: !0
    }), this.invokeAllPlugins((n) => {
      n !== this && n.preprocessNode && n.preprocessNode(e, t, i);
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
    const { lruCache: e, loadingTiles: t } = this, i = [];
    for (const s of t)
      !e.isUsed(s) && s.internal.loadingState === kt && i.push(s);
    for (let s = 0; s < i.length; s++)
      e.remove(i[s]);
  }
  // Private Functions
  queueTileForDownload(e) {
    e.internal.loadingState !== Be || this.lruCache.isFull() || this.queuedTiles.push(e);
  }
  markTileUsed(e) {
    this.usedSet.add(e), this.lruCache.markUsed(e);
  }
  fetchData(e, t) {
    return fetch(e, t);
  }
  ensureChildrenArePreprocessed(e, t = this.stats.tilesProcessed < this.maxTilesProcessed) {
    const i = e.children;
    if (i.length === 0 || i[i.length - 1].traversal)
      return;
    const s = (n) => {
      for (let r = 0, o = n.length; r < o; r++) {
        const a = n[r];
        a && !a.traversal && this.preprocessNode(a, e.internal.basePath, e);
      }
    };
    t ? (this.processNodeQueue.remove(e), s(i)) : this.processNodeQueue.has(e) || this.processNodeQueue.add(e, (n) => {
      s(n.children), this._dispatchNeedsUpdateEvent();
    });
  }
  // returns the total bytes used for by the given tile as reported by all plugins
  getBytesUsed(e) {
    let t = 0;
    return this.invokeAllPlugins((i) => {
      i.calculateBytesUsed && (t += i.calculateBytesUsed(e, e.engineData.scene) || 0);
    }), t;
  }
  // force a recalculation of the tile or all tiles if no tile is provided
  recalculateBytesUsed(e = null) {
    const { lruCache: t, processedTiles: i } = this;
    e === null ? t.itemSet.forEach((s) => {
      i.has(s) && t.setMemoryUsage(s, this.getBytesUsed(s));
    }) : t.setMemoryUsage(e, this.getBytesUsed(e));
  }
  preprocessTileset(e, t, i = null) {
    const s = e.asset.version, [n, r] = s.split(".").map((a) => parseInt(a));
    console.assert(
      n <= 1,
      "TilesRenderer: asset.version is expected to be a 1.x or a compatible version."
    ), n === 1 && r > 0 && console.warn("TilesRenderer: tiles versions at 1.1 or higher have limited support. Some new extensions and features may not be supported.");
    let o = t.replace(/\/[^/]*$/, "");
    o = new URL(o, window.location.href).toString(), this.preprocessNode(e.root, o, i);
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
    if (e.internal.loadingState !== Be)
      return;
    let t = !1, i = null, s = new URL(e.content.uri, e.internal.basePath + "/").toString();
    this.invokeAllPlugins((A) => s = A.preprocessURL ? A.preprocessURL(s, e) : s);
    const n = this.stats, r = this.lruCache, o = this.downloadQueue, a = this.parseQueue, l = this.loadingTiles, d = on(s), h = new AbortController(), u = h.signal;
    if (r.add(e, (A) => {
      h.abort(), t ? A.children.length = 0 : this.invokeAllPlugins((p) => {
        p.disposeTile && p.disposeTile(A);
      }), n.inCache--, this.cachedSinceLoadComplete.has(e) && (this.cachedSinceLoadComplete.delete(e), n.inCacheSinceLoad--), A.internal.loadingState === kt ? n.queued-- : A.internal.loadingState === Ft ? n.downloading-- : A.internal.loadingState === Ni ? n.parsing-- : A.internal.loadingState === Qe && n.loaded--, A.internal.loadingState = Be, a.remove(A), o.remove(A), l.delete(A);
    }))
      return this.isLoading || (this.isLoading = !0, this.dispatchEvent({ type: "tiles-load-start" })), r.setMemoryUsage(e, this.getBytesUsed(e)), this.cachedSinceLoadComplete.add(e), n.inCacheSinceLoad++, n.inCache++, n.queued++, e.internal.loadingState = kt, l.add(e), o.add(e, (A) => {
        if (u.aborted)
          return Promise.resolve();
        e.internal.loadingState = Ft, n.downloading++, n.queued--;
        const p = this.invokeOnePlugin((f) => f.fetchData && f.fetchData(s, { ...this.fetchOptions, signal: u }));
        return this.dispatchEvent({
          type: "tile-download-start",
          tile: e,
          url: s,
          get uri() {
            return console.warn('tile-download-start event: "uri" has been renamed to "url".'), this.url;
          }
        }), p;
      }).then((A) => {
        if (!u.aborted)
          if (A instanceof Response) {
            if (A.ok)
              return d === "json" ? A.json() : A.arrayBuffer();
            throw new Error(`Failed to load model with error code ${A.status}`);
          } else return A;
      }).then((A) => {
        if (!u.aborted)
          return n.downloading--, n.parsing++, e.internal.loadingState = Ni, a.add(e, (p) => u.aborted ? Promise.resolve() : d === "json" && A.root ? (this.preprocessTileset(A, s, e), e.children.push(A.root), i = A, t = !0, Promise.resolve()) : this.invokeOnePlugin((f) => f.parseTile && f.parseTile(A, p, d, s, u)));
      }).then(() => {
        if (u.aborted)
          return;
        n.parsing--, n.loaded++, e.internal.loadingState = Qe, l.delete(e), r.setLoaded(e, !0);
        const A = this.getBytesUsed(e);
        if (r.getMemoryUsage(e) === 0 && A > 0 && r.isFull()) {
          r.remove(e);
          return;
        }
        r.setMemoryUsage(e, A), this.dispatchEvent({ type: "needs-update" }), t && this.dispatchEvent({
          type: "load-tileset",
          tileset: i,
          url: s
        }), e.engineData.scene && this.dispatchEvent({
          type: "load-model",
          scene: e.engineData.scene,
          tile: e,
          url: s
        });
      }).catch((A) => {
        u.aborted || (A.name !== "AbortError" ? (a.remove(e), o.remove(e), e.internal.loadingState === kt ? n.queued-- : e.internal.loadingState === Ft ? n.downloading-- : e.internal.loadingState === Ni ? n.parsing-- : e.internal.loadingState === Qe && n.loaded--, n.failed++, console.error(`TilesRenderer : Failed to load tile at url "${e.content.uri}".`), console.error(A), e.internal.loadingState = Et, l.delete(e), r.setLoaded(e, !0), this.dispatchEvent({
          type: "load-error",
          tile: e,
          error: A,
          url: s
        })) : r.remove(e));
      });
  }
};
function Wr(c, e, t, i, s, n) {
  let r;
  switch (i) {
    case "SCALAR":
      r = 1;
      break;
    case "VEC2":
      r = 2;
      break;
    case "VEC3":
      r = 3;
      break;
    case "VEC4":
      r = 4;
      break;
    default:
      throw new Error(`FeatureTable : Feature type not provided for "${n}".`);
  }
  let o;
  const a = t * r;
  switch (s) {
    case "BYTE":
      o = new Int8Array(c, e, a);
      break;
    case "UNSIGNED_BYTE":
      o = new Uint8Array(c, e, a);
      break;
    case "SHORT":
      o = new Int16Array(c, e, a);
      break;
    case "UNSIGNED_SHORT":
      o = new Uint16Array(c, e, a);
      break;
    case "INT":
      o = new Int32Array(c, e, a);
      break;
    case "UNSIGNED_INT":
      o = new Uint32Array(c, e, a);
      break;
    case "FLOAT":
      o = new Float32Array(c, e, a);
      break;
    case "DOUBLE":
      o = new Float64Array(c, e, a);
      break;
    default:
      throw new Error(`FeatureTable : Feature component type not provided for "${n}".`);
  }
  return o;
}
let vi = class {
  /**
   * @param {ArrayBuffer} buffer
   * @param {number} start - Byte offset of the feature table within the buffer
   * @param {number} headerLength - Byte length of the JSON header
   * @param {number} binLength - Byte length of the binary body
   */
  constructor(e, t, i, s) {
    this.buffer = e, this.binOffset = t + i, this.binLength = s;
    let n = null;
    if (i !== 0) {
      const r = new Uint8Array(e, t, i);
      n = JSON.parse(Bs(r));
    } else
      n = {};
    this.header = n;
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
  getData(e, t, i = null, s = null) {
    const n = this.header;
    if (!(e in n))
      return null;
    const r = n[e];
    if (r instanceof Object) {
      if (Array.isArray(r))
        return r;
      {
        const { buffer: o, binOffset: a, binLength: l } = this, d = r.byteOffset || 0, h = r.type || s, u = r.componentType || i;
        if ("type" in r && s && r.type !== s)
          throw new Error("FeatureTable: Specified type does not match expected type.");
        const A = a + d, p = Wr(o, A, t, h, u, e);
        if (A + p.byteLength > a + l)
          throw new Error("FeatureTable: Feature data read outside binary body length.");
        return p;
      }
    } else return r;
  }
  /**
   * Returns a slice of the binary body at the given offset and length.
   * @param {number} byteOffset
   * @param {number} byteLength
   * @returns {ArrayBuffer}
   */
  getBuffer(e, t) {
    const { buffer: i, binOffset: s } = this;
    return i.slice(s + e, s + e + t);
  }
}, ic = class {
  constructor(e) {
    this.batchTable = e;
    const t = e.header.extensions["3DTILES_batch_table_hierarchy"];
    this.classes = t.classes;
    for (const s of this.classes) {
      const n = s.instances;
      for (const r in n)
        s.instances[r] = this._parseProperty(n[r], s.length, r);
    }
    if (this.instancesLength = t.instancesLength, this.classIds = this._parseProperty(t.classIds, this.instancesLength, "classIds"), t.parentCounts ? this.parentCounts = this._parseProperty(t.parentCounts, this.instancesLength, "parentCounts") : this.parentCounts = new Array(this.instancesLength).fill(1), t.parentIds) {
      const s = this.parentCounts.reduce((n, r) => n + r, 0);
      this.parentIds = this._parseProperty(t.parentIds, s, "parentIds");
    } else
      this.parentIds = null;
    this.instancesIds = [];
    const i = {};
    for (const s of this.classIds)
      i[s] = i[s] ?? 0, this.instancesIds.push(i[s]), i[s]++;
  }
  _parseProperty(e, t, i) {
    if (Array.isArray(e))
      return e;
    {
      const { buffer: s, binOffset: n } = this.batchTable, r = e.byteOffset, o = e.componentType || "UNSIGNED_SHORT", a = n + r;
      return Wr(s, a, t, "SCALAR", o, i);
    }
  }
  getDataFromId(e, t = {}) {
    const i = this.parentCounts[e];
    if (this.parentIds && i > 0) {
      let a = 0;
      for (let l = 0; l < e; l++)
        a += this.parentCounts[l];
      for (let l = 0; l < i; l++) {
        const d = this.parentIds[a + l];
        d !== e && this.getDataFromId(d, t);
      }
    }
    const s = this.classIds[e], n = this.classes[s].instances, r = this.classes[s].name, o = this.instancesIds[e];
    for (const a in n)
      t[r] = t[r] || {}, t[r][a] = n[a][o];
    return t;
  }
};
class _s extends vi {
  /**
   * @param {ArrayBuffer} buffer
   * @param {number} count - Number of features in the batch
   * @param {number} start - Byte offset of the batch table within the buffer
   * @param {number} headerLength - Byte length of the JSON header
   * @param {number} binLength - Byte length of the binary body
   */
  constructor(e, t, i, s, n) {
    super(e, i, s, n), this.count = t, this.extensions = {};
    const r = this.header.extensions;
    r && r["3DTILES_batch_table_hierarchy"] && (this.extensions["3DTILES_batch_table_hierarchy"] = new ic(this));
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
    for (const i of this.getKeys())
      t[i] = super.getData(i, this.count)[e];
    for (const i in this.extensions) {
      const s = this.extensions[i];
      s.getDataFromId instanceof Function && (t[i] = t[i] || {}, s.getDataFromId(e, t[i]));
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
let sc = class extends Tt {
  /**
   * Parses a B3DM buffer and returns the raw tile data.
   * @param {ArrayBuffer} buffer
   * @returns {{ version: string, featureTable: FeatureTable, batchTable: BatchTable, glbBytes: Uint8Array }}
   */
  parse(e) {
    const t = new DataView(e), i = Oe(t);
    console.assert(i === "b3dm");
    const s = t.getUint32(4, !0);
    console.assert(s === 1);
    const n = t.getUint32(8, !0);
    console.assert(n === e.byteLength);
    const r = t.getUint32(12, !0), o = t.getUint32(16, !0), a = t.getUint32(20, !0), l = t.getUint32(24, !0), d = 28, h = e.slice(
      d,
      d + r + o
    ), u = new vi(
      h,
      0,
      r,
      o
    ), A = d + r + o, p = e.slice(
      A,
      A + a + l
    ), f = new _s(
      p,
      u.getData("BATCH_LENGTH"),
      0,
      a,
      l
    ), g = A + a + l, b = new Uint8Array(e, g, n - g);
    return {
      version: s,
      featureTable: u,
      batchTable: f,
      glbBytes: b
    };
  }
}, nc = class extends Tt {
  /**
   * Parses an I3DM buffer and returns the raw tile data.
   * @param {ArrayBuffer} buffer
   * @returns {Promise<{ version: string, featureTable: FeatureTable, batchTable: BatchTable, glbBytes: Uint8Array, gltfWorkingPath: string }>}
   */
  parse(e) {
    const t = new DataView(e), i = Oe(t);
    console.assert(i === "i3dm");
    const s = t.getUint32(4, !0);
    console.assert(s === 1);
    const n = t.getUint32(8, !0);
    console.assert(n === e.byteLength);
    const r = t.getUint32(12, !0), o = t.getUint32(16, !0), a = t.getUint32(20, !0), l = t.getUint32(24, !0), d = t.getUint32(28, !0), h = 32, u = e.slice(
      h,
      h + r + o
    ), A = new vi(
      u,
      0,
      r,
      o
    ), p = h + r + o, f = e.slice(
      p,
      p + a + l
    ), g = new _s(
      f,
      A.getData("INSTANCES_LENGTH"),
      0,
      a,
      l
    ), b = p + a + l, y = new Uint8Array(e, b, n - b);
    let E = null, C = null, w = null;
    if (d)
      E = y, C = Promise.resolve();
    else {
      const S = this.resolveExternalURL(Bs(y));
      w = xs(S), C = fetch(S, this.fetchOptions).then((v) => {
        if (!v.ok)
          throw new Error(`I3DMLoaderBase : Failed to load file "${S}" with status ${v.status} : ${v.statusText}`);
        return v.arrayBuffer();
      }).then((v) => {
        E = new Uint8Array(v);
      });
    }
    return C.then(() => ({
      version: s,
      featureTable: A,
      batchTable: g,
      glbBytes: E,
      gltfWorkingPath: w
    }));
  }
}, rc = class extends Tt {
  /**
   * Parses a PNTS buffer and returns the raw tile data.
   * @param {ArrayBuffer} buffer
   * @returns {Promise<{ version: string, featureTable: FeatureTable, batchTable: BatchTable }>}
   */
  parse(e) {
    const t = new DataView(e), i = Oe(t);
    console.assert(i === "pnts");
    const s = t.getUint32(4, !0);
    console.assert(s === 1);
    const n = t.getUint32(8, !0);
    console.assert(n === e.byteLength);
    const r = t.getUint32(12, !0), o = t.getUint32(16, !0), a = t.getUint32(20, !0), l = t.getUint32(24, !0), d = 28, h = e.slice(
      d,
      d + r + o
    ), u = new vi(
      h,
      0,
      r,
      o
    ), A = d + r + o, p = e.slice(
      A,
      A + a + l
    ), f = new _s(
      p,
      u.getData("BATCH_LENGTH") || u.getData("POINTS_LENGTH"),
      0,
      a,
      l
    );
    return Promise.resolve({
      version: s,
      featureTable: u,
      batchTable: f
    });
  }
};
class oc extends Tt {
  /**
   * Parses a CMPT buffer and returns an object containing each inner tile's type and raw buffer.
   * @param {ArrayBuffer} buffer
   * @returns {{ version: string, tiles: Array<{ type: string, buffer: Uint8Array, version: number }> }}
   */
  parse(e) {
    const t = new DataView(e), i = Oe(t);
    console.assert(i === "cmpt", 'CMPTLoader: The magic bytes equal "cmpt".');
    const s = t.getUint32(4, !0);
    console.assert(s === 1, 'CMPTLoader: The version listed in the header is "1".');
    const n = t.getUint32(8, !0);
    console.assert(n === e.byteLength, "CMPTLoader: The contents buffer length listed in the header matches the file.");
    const r = t.getUint32(12, !0), o = [];
    let a = 16;
    for (let l = 0; l < r; l++) {
      const d = new DataView(e, a, 12), h = Oe(d), u = d.getUint32(4, !0), A = d.getUint32(8, !0), p = new Uint8Array(e, a, A);
      o.push({
        type: h,
        buffer: p,
        version: u
      }), a += A;
    }
    return {
      version: s,
      tiles: o
    };
  }
}
function ac(c) {
  const { x: e, y: t, z: i } = c;
  c.x = i, c.y = e, c.z = t;
}
function lc(c) {
  return -c + Math.PI / 2;
}
const dn = /* @__PURE__ */ new ss(), Te = /* @__PURE__ */ new R(), Z = /* @__PURE__ */ new R(), Gi = /* @__PURE__ */ new R(), ae = /* @__PURE__ */ new G(), Ae = /* @__PURE__ */ new G(), Oi = /* @__PURE__ */ new xt(), ie = /* @__PURE__ */ new Jo(), un = /* @__PURE__ */ new R(), An = /* @__PURE__ */ new R(), pn = /* @__PURE__ */ new R(), ht = /* @__PURE__ */ new R(), Vt = /* @__PURE__ */ new di(), cc = 1e-12, hc = 0.1, dc = 0, fn = 1, Nt = 2;
class Jr {
  constructor(e = 1, t = 1, i = 1) {
    this.name = "", this.radius = new R(e, t, i);
  }
  /**
   * Returns the point where the given ray intersects the ellipsoid surface, or null if no
   * intersection exists. Writes the result into `target`.
   * @param {Ray} ray
   * @param {Vector3} target
   * @returns {Vector3|null}
   */
  intersectRay(e, t) {
    return ae.makeScale(...this.radius).invert(), Oi.center.set(0, 0, 0), Oi.radius = 1, Vt.copy(e).applyMatrix4(ae), Vt.intersectSphere(Oi, t) ? (ae.makeScale(...this.radius), t.applyMatrix4(ae), t) : null;
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
  getEastNorthUpFrame(e, t, i, s) {
    return i.isMatrix4 && (s = i, i = 0, console.warn('Ellipsoid: The signature for "getEastNorthUpFrame" has changed.')), this.getEastNorthUpAxes(e, t, un, An, pn), this.getCartographicToPosition(e, t, i, ht), s.makeBasis(un, An, pn).setPosition(ht);
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
  getOrientedEastNorthUpFrame(e, t, i, s, n, r, o) {
    return this.getObjectFrame(e, t, i, s, n, r, o, dc);
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
  getObjectFrame(e, t, i, s, n, r, o, a = Nt) {
    return this.getEastNorthUpFrame(e, t, i, ae), ie.set(n, r, -s, "ZXY"), o.makeRotationFromEuler(ie).premultiply(ae), a === fn ? (ie.set(Math.PI / 2, 0, 0, "XYZ"), Ae.makeRotationFromEuler(ie), o.multiply(Ae)) : a === Nt && (ie.set(-Math.PI / 2, 0, Math.PI, "XYZ"), Ae.makeRotationFromEuler(ie), o.multiply(Ae)), o;
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
  getCartographicFromObjectFrame(e, t, i = Nt) {
    return i === fn ? (ie.set(-Math.PI / 2, 0, 0, "XYZ"), Ae.makeRotationFromEuler(ie).premultiply(e)) : i === Nt ? (ie.set(-Math.PI / 2, 0, Math.PI, "XYZ"), Ae.makeRotationFromEuler(ie).premultiply(e)) : Ae.copy(e), ht.setFromMatrixPosition(Ae), this.getPositionToCartographic(ht, t), this.getEastNorthUpFrame(t.lat, t.lon, 0, ae).invert(), Ae.premultiply(ae), ie.setFromRotationMatrix(Ae, "ZXY"), t.azimuth = -ie.z, t.elevation = ie.x, t.roll = ie.y, t;
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
  getEastNorthUpAxes(e, t, i, s, n, r = ht) {
    this.getCartographicToPosition(e, t, 0, r), this.getCartographicToNormal(e, t, n), i.set(-r.y, r.x, 0).normalize(), s.crossVectors(n, i).normalize();
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
  getCartographicToPosition(e, t, i, s) {
    this.getCartographicToNormal(e, t, Te);
    const n = this.radius;
    Z.copy(Te), Z.x *= n.x ** 2, Z.y *= n.y ** 2, Z.z *= n.z ** 2;
    const r = Math.sqrt(Te.dot(Z));
    return Z.divideScalar(r), s.copy(Z).addScaledVector(Te, i);
  }
  /**
   * Converts a 3D Cartesian position to geographic coordinates (lat, lon, height). Writes the
   * result into `target` and returns it.
   * @param {Vector3} pos
   * @param {Object} target
   * @returns {{ lat: number, lon: number, height: number }}
   */
  getPositionToCartographic(e, t) {
    this.getPositionToSurfacePoint(e, Z), this.getPositionToNormal(Z, Te);
    const i = Gi.subVectors(e, Z);
    return t.lon = Math.atan2(Te.y, Te.x), t.lat = Math.asin(Te.z), t.height = Math.sign(i.dot(e)) * i.length(), t;
  }
  /**
   * Returns the surface normal of the ellipsoid at the given latitude and longitude. Writes the
   * result into `target` and returns it.
   * @param {number} lat Latitude in radians.
   * @param {number} lon Longitude in radians.
   * @param {Vector3} target
   * @returns {Vector3}
   */
  getCartographicToNormal(e, t, i) {
    return dn.set(1, lc(e), t), i.setFromSpherical(dn).normalize(), ac(i), i;
  }
  /**
   * Returns the surface normal of the ellipsoid at the given 3D Cartesian position. Writes the
   * result into `target` and returns it.
   * @param {Vector3} pos
   * @param {Vector3} target
   * @returns {Vector3}
   */
  getPositionToNormal(e, t) {
    const i = this.radius;
    return t.copy(e), t.x /= i.x ** 2, t.y /= i.y ** 2, t.z /= i.z ** 2, t.normalize(), t;
  }
  /**
   * Projects the given 3D position onto the ellipsoid surface along the geodetic normal.
   * Returns null if the position is at or near the center. Writes the result into `target`.
   * @param {Vector3} pos
   * @param {Vector3} target
   * @returns {Vector3|null}
   */
  getPositionToSurfacePoint(e, t) {
    const i = this.radius, s = 1 / i.x ** 2, n = 1 / i.y ** 2, r = 1 / i.z ** 2, o = e.x * e.x * s, a = e.y * e.y * n, l = e.z * e.z * r, d = o + a + l, h = Math.sqrt(1 / d), u = Z.copy(e).multiplyScalar(h);
    if (d < hc)
      return isFinite(h) ? t.copy(u) : null;
    const A = Gi.set(
      u.x * s * 2,
      u.y * n * 2,
      u.z * r * 2
    );
    let p = (1 - h) * e.length() / (0.5 * A.length()), f = 0, g, b, y, E, C, w, S, v, I, B, M;
    do {
      p -= f, y = 1 / (1 + p * s), E = 1 / (1 + p * n), C = 1 / (1 + p * r), w = y * y, S = E * E, v = C * C, I = w * y, B = S * E, M = v * C, g = o * w + a * S + l * v - 1, b = o * I * s + a * B * n + l * M * r;
      const x = -2 * b;
      f = g / x;
    } while (Math.abs(g) > cc);
    return t.set(
      e.x * y,
      e.y * E,
      e.z * C
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
    const i = this.calculateEffectiveRadius(e);
    return Math.sqrt(2 * i * t + t ** 2);
  }
  /**
   * Returns the prime vertical radius of curvature (distance from the center of the ellipsoid
   * to the surface along the normal) at the given latitude.
   * @param {number} latitude Latitude in degrees.
   * @returns {number}
   */
  calculateEffectiveRadius(e) {
    const t = this.radius.x, i = 1 - this.radius.z ** 2 / t ** 2, s = e * rt.DEG2RAD, n = Math.sin(s) ** 2;
    return t / Math.sqrt(1 - i * n);
  }
  /**
   * Returns the height of the given 3D position above (or below) the ellipsoid surface.
   * @param {Vector3} pos
   * @returns {number}
   */
  getPositionElevation(e) {
    this.getPositionToSurfacePoint(e, Z);
    const t = Gi.subVectors(e, Z);
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
    return this.intersectRay(e, t) ? t : (ae.makeScale(...this.radius).invert(), Vt.copy(e).applyMatrix4(ae), Z.set(0, 0, 0), Vt.closestPointToPoint(Z, t).normalize(), ae.makeScale(...this.radius), t.applyMatrix4(ae));
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
const Si = new Jr(ln, ln, Yl);
Si.name = "WGS84 Earth";
const Gt = /* @__PURE__ */ new R(), Ot = /* @__PURE__ */ new R(), se = /* @__PURE__ */ new R(), Ht = /* @__PURE__ */ new di();
let mn = class {
  constructor(e = new ot(), t = new G()) {
    this.box = e.clone(), this.transform = t.clone(), this.inverseTransform = new G(), this.points = new Array(8).fill().map(() => new R()), this.planes = new Array(6).fill().map(() => new or());
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
    return this.clampPoint(e, se).distanceTo(e);
  }
  containsPoint(e) {
    return se.copy(e).applyMatrix4(this.inverseTransform), this.box.containsPoint(se);
  }
  // returns boolean indicating whether the ray has intersected the obb
  intersectsRay(e) {
    return Ht.copy(e).applyMatrix4(this.inverseTransform), Ht.intersectsBox(this.box);
  }
  // Sets "target" equal to the intersection point.
  // Returns "null" if no intersection found.
  intersectRay(e, t) {
    return Ht.copy(e).applyMatrix4(this.inverseTransform), Ht.intersectBox(this.box, t) ? (t.applyMatrix4(this.transform), t) : null;
  }
  update() {
    const { points: e, inverseTransform: t, transform: i, box: s } = this;
    t.copy(i).invert();
    const { min: n, max: r } = s;
    let o = 0;
    for (let a = -1; a <= 1; a += 2)
      for (let l = -1; l <= 1; l += 2)
        for (let d = -1; d <= 1; d += 2)
          e[o].set(
            a < 0 ? n.x : r.x,
            l < 0 ? n.y : r.y,
            d < 0 ? n.z : r.z
          ).applyMatrix4(i), o++;
    this.updatePlanes();
  }
  updatePlanes() {
    Gt.copy(this.box.min).applyMatrix4(this.transform), Ot.copy(this.box.max).applyMatrix4(this.transform), se.set(0, 0, 1).transformDirection(this.transform), this.planes[0].setFromNormalAndCoplanarPoint(se, Gt), this.planes[1].setFromNormalAndCoplanarPoint(se, Ot).negate(), se.set(0, 1, 0).transformDirection(this.transform), this.planes[2].setFromNormalAndCoplanarPoint(se, Gt), this.planes[3].setFromNormalAndCoplanarPoint(se, Ot).negate(), se.set(1, 0, 0).transformDirection(this.transform), this.planes[4].setFromNormalAndCoplanarPoint(se, Gt), this.planes[5].setFromNormalAndCoplanarPoint(se, Ot).negate();
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, se), se.distanceToSquared(e.center) <= e.radius * e.radius;
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
    const i = this.points, s = this.planes;
    for (let n = 0; n < 6; n++) {
      const r = e[n];
      let o = -1 / 0;
      for (let a = 0; a < 8; a++) {
        const l = i[a], d = r.distanceToPoint(l);
        o = o < d ? d : o;
      }
      if (o < 0)
        return !1;
    }
    for (let n = 0; n < 6; n++) {
      const r = s[n];
      let o = -1 / 0;
      for (let a = 0; a < 8; a++) {
        const l = t[a], d = r.distanceToPoint(l);
        o = o < d ? d : o;
      }
      if (o < 0)
        return !1;
    }
    return !0;
  }
};
const Hi = 1e-13, wt = Math.PI, zi = wt / 2, dt = /* @__PURE__ */ new R(), Fe = /* @__PURE__ */ new R(), he = /* @__PURE__ */ new R(), D = /* @__PURE__ */ new R(), ee = /* @__PURE__ */ new G(), uc = /* @__PURE__ */ new ot(), gn = /* @__PURE__ */ new G();
function Re(c, e) {
  e.radius = Math.max(e.radius, c.distanceToSquared(e.center));
}
function bn(c) {
  return c.x !== c.y;
}
class Ac extends Jr {
  constructor(e = 1, t = 1, i = 1, s = -zi, n = zi, r = 0, o = 2 * wt, a = 0, l = 0) {
    super(e, t, i), this.latStart = s, this.latEnd = n, this.lonStart = r, this.lonEnd = o, this.heightStart = a, this.heightEnd = l;
  }
  /**
   * Computes an oriented bounding box for this region. Writes the box extents into `box` and
   * the orientation frame into `matrix`.
   * @param {Box3} box
   * @param {Matrix4} matrix
   */
  getBoundingBox(e, t) {
    bn(this.radius) && console.warn("EllipsoidRegion: Triaxial ellipsoids are not supported.");
    const {
      latStart: i,
      latEnd: s,
      lonStart: n,
      lonEnd: r,
      heightStart: o,
      heightEnd: a
    } = this, l = (i + s) * 0.5, d = (n + r) * 0.5, h = i > 0, u = s < 0;
    let A;
    h ? A = i : u ? A = s : A = 0;
    const { min: p, max: f } = e;
    p.setScalar(1 / 0), f.setScalar(-1 / 0), r - n <= wt ? (this.getCartographicToNormal(l, d, he), Fe.set(0, 0, 1), dt.crossVectors(Fe, he).normalize(), Fe.crossVectors(he, dt).normalize(), t.makeBasis(dt, Fe, he), ee.copy(t).invert(), this.getCartographicToPosition(A, n, a, D).applyMatrix4(ee), f.x = Math.abs(D.x), p.x = -f.x, this.getCartographicToPosition(s, n, a, D).applyMatrix4(ee), f.y = D.y, this.getCartographicToPosition(s, d, a, D).applyMatrix4(ee), f.y = Math.max(D.y, f.y), this.getCartographicToPosition(i, n, a, D).applyMatrix4(ee), p.y = D.y, this.getCartographicToPosition(i, d, a, D).applyMatrix4(ee), p.y = Math.min(D.y, p.y), this.getCartographicToPosition(l, d, a, D).applyMatrix4(ee), f.z = D.z, this.getCartographicToPosition(i, n, o, D).applyMatrix4(ee), p.z = D.z, this.getCartographicToPosition(s, n, o, D).applyMatrix4(ee), p.z = Math.min(D.z, p.z)) : (this.getCartographicToPosition(A, d, a, he), he.z = 0, he.length() < 1e-10 ? he.set(1, 0, 0) : he.normalize(), Fe.set(0, 0, 1), dt.crossVectors(he, Fe).normalize(), t.makeBasis(dt, Fe, he), ee.copy(t).invert(), this.getCartographicToPosition(A, d + zi, a, D).applyMatrix4(ee), f.x = Math.abs(D.x), p.x = -f.x, this.getCartographicToPosition(s, 0, u ? o : a, D).applyMatrix4(ee), f.y = D.y, this.getCartographicToPosition(i, 0, h ? o : a, D).applyMatrix4(ee), p.y = D.y, this.getCartographicToPosition(A, d, a, D).applyMatrix4(ee), f.z = D.z, this.getCartographicToPosition(A, r, a, D).applyMatrix4(ee), p.z = D.z), e.getCenter(D), e.min.sub(D).multiplyScalar(1 + Hi), e.max.sub(D).multiplyScalar(1 + Hi), D.applyMatrix4(t), t.setPosition(D);
  }
  /**
   * Computes a bounding sphere for this region. Writes the result into `sphere`.
   * @param {Sphere} sphere
   */
  getBoundingSphere(e) {
    bn(this.radius) && console.warn("EllipsoidRegion: Triaxial ellipsoids are not supported."), this.getBoundingBox(uc, gn), e.center.setFromMatrixPosition(gn), e.radius = 0;
    const {
      latStart: t,
      latEnd: i,
      lonStart: s,
      lonEnd: n,
      heightStart: r,
      heightEnd: o
    } = this, a = (t + i) * 0.5, l = (s + n) * 0.5, d = t > 0, h = i < 0;
    let u;
    d ? u = t : h ? u = i : u = 0, this.getCartographicToPosition(u, s, o, D), Re(D, e), this.getCartographicToPosition(i, s, o, D), Re(D, e), this.getCartographicToPosition(i, l, o, D), Re(D, e), this.getCartographicToPosition(t, s, o, D), Re(D, e), this.getCartographicToPosition(t, l, o, D), Re(D, e), this.getCartographicToPosition(a, l, o, D), Re(D, e), this.getCartographicToPosition(t, s, r, D), Re(D, e), n - s > wt && (this.getCartographicToPosition(u, l + wt, o, D), Re(D, e)), e.radius = Math.sqrt(e.radius) * (1 + Hi);
  }
}
const ms = 0;
function yn(c, e, t, i) {
  try {
    return Xo.getByteLength(c, e, t, i);
  } catch {
    return ms;
  }
}
function pc(c) {
  var e, t;
  if (!c)
    return 0;
  if (c.isExternalTexture)
    return ((e = c.userData) == null ? void 0 : e.byteLength) ?? ms;
  const { format: i, type: s, image: n, mipmaps: r } = c;
  if (c.isCompressedTexture && Array.isArray(r) && r.length > 0) {
    let a = 0;
    for (const l of r)
      (t = l?.data) != null && t.byteLength ? a += l.data.byteLength : a += yn(l.width, l.height, i, s);
    return a;
  }
  if (!n)
    return ms;
  let o = yn(n.width, n.height, i, s);
  return o *= c.generateMipmaps ? 4 / 3 : 1, o;
}
function fc(c) {
  const e = /* @__PURE__ */ new Set();
  let t = 0;
  return c.traverse((i) => {
    if (i.geometry && !e.has(i.geometry) && (t += Ba(i.geometry), e.add(i.geometry)), i.material) {
      const s = i.material;
      for (const n in s) {
        const r = s[n];
        r && r.isTexture && !e.has(r) && (t += pc(r), e.add(r));
      }
    }
  }), t;
}
class Xr extends sc {
  constructor(e = mi) {
    super(), this.manager = e, this.adjustmentTransform = new G();
  }
  /**
   * Parses a b3dm buffer and resolves to a GLTF result object extended with legacy
   * tile metadata. Both `model` and `model.scene` receive the extra fields.
   * @param {ArrayBuffer} buffer
   * @returns {Promise<{ scene: Group, scenes: Array, batchTable: BatchTable, featureTable: FeatureTable }>}
   */
  parse(e) {
    const t = super.parse(e), i = t.glbBytes.slice().buffer;
    return new Promise((s, n) => {
      const r = this.manager, o = this.fetchOptions, a = r.getHandler("path.gltf") || new qe(r);
      o.credentials === "include" && o.mode === "cors" && a.setCrossOrigin("use-credentials"), "credentials" in o && a.setWithCredentials(o.credentials === "include"), o.headers && a.setRequestHeader(o.headers);
      let l = this.workingPath;
      !/[\\/]$/.test(l) && l.length && (l += "/");
      const d = this.adjustmentTransform;
      a.parse(i, l, (h) => {
        const { batchTable: u, featureTable: A } = t, { scene: p } = h, f = A.getData("RTC_CENTER", 1, "FLOAT", "VEC3");
        f && (p.position.x += f[0], p.position.y += f[1], p.position.z += f[2]), h.scene.updateMatrix(), h.scene.matrix.multiply(d), h.scene.matrix.decompose(h.scene.position, h.scene.quaternion, h.scene.scale), h.batchTable = u, h.featureTable = A, p.batchTable = u, p.featureTable = A, s(h);
      }, n);
    });
  }
}
function mc(c) {
  const e = c >> 11, t = c >> 5 & 63, i = c & 31, s = Math.round(e / 31 * 255), n = Math.round(t / 63 * 255), r = Math.round(i / 31 * 255);
  return [s, n, r];
}
const ut = /* @__PURE__ */ new V();
function gc(c, e, t = new R()) {
  ut.set(c, e).divideScalar(256).multiplyScalar(2).subScalar(1), t.set(ut.x, ut.y, 1 - Math.abs(ut.x) - Math.abs(ut.y));
  const i = rt.clamp(-t.z, 0, 1);
  return t.x >= 0 ? t.setX(t.x - i) : t.setX(t.x + i), t.y >= 0 ? t.setY(t.y - i) : t.setY(t.y + i), t.normalize(), t;
}
const Cn = {
  RGB: "color",
  POSITION: "position"
};
class $r extends rc {
  constructor(e = mi) {
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
      const { featureTable: i, batchTable: s } = t, n = new cr(), r = i.header.extensions, o = new R();
      let a;
      if (r && r["3DTILES_draco_point_compression"]) {
        const { byteOffset: h, byteLength: u, properties: A } = r["3DTILES_draco_point_compression"], p = this.manager.getHandler("draco.drc");
        if (p == null)
          throw new Error("PNTSLoader: dracoLoader not available.");
        const f = {};
        for (const y in A)
          if (y in Cn && y in A) {
            const E = Cn[y];
            f[E] = A[y];
          }
        const g = {
          attributeIDs: f,
          attributeTypes: {
            position: "Float32Array",
            color: "Uint8Array"
          },
          useUniqueIDs: !0
        }, b = i.getBuffer(h, u);
        a = await p.decodeGeometry(b, g), a.attributes.color && (n.vertexColors = !0);
      } else {
        const h = i.getData("POINTS_LENGTH"), u = i.getData("POSITION", h, "FLOAT", "VEC3"), A = i.getData("NORMAL", h, "FLOAT", "VEC3"), p = i.getData("NORMAL", h, "UNSIGNED_BYTE", "VEC2"), f = i.getData("RGB", h, "UNSIGNED_BYTE", "VEC3"), g = i.getData("RGBA", h, "UNSIGNED_BYTE", "VEC4"), b = i.getData("RGB565", h, "UNSIGNED_SHORT", "SCALAR"), y = i.getData("CONSTANT_RGBA", h, "UNSIGNED_BYTE", "VEC4"), E = i.getData("POSITION_QUANTIZED", h, "UNSIGNED_SHORT", "VEC3"), C = i.getData("QUANTIZED_VOLUME_SCALE", h, "FLOAT", "VEC3"), w = i.getData("QUANTIZED_VOLUME_OFFSET", h, "FLOAT", "VEC3");
        if (a = new pi(), E) {
          const S = new Float32Array(h * 3);
          for (let v = 0; v < h; v++)
            for (let I = 0; I < 3; I++) {
              const B = 3 * v + I;
              S[B] = E[B] / 65535 * C[I];
            }
          o.x = w[0], o.y = w[1], o.z = w[2], a.setAttribute("position", new ce(S, 3, !1));
        } else
          a.setAttribute("position", new ce(u, 3, !1));
        if (A !== null)
          a.setAttribute("normal", new ce(A, 3, !1));
        else if (p !== null) {
          const S = new Float32Array(h * 3), v = new R();
          for (let I = 0; I < h; I++) {
            const B = p[I * 2], M = p[I * 2 + 1], x = gc(B, M, v);
            S[I * 3] = x.x, S[I * 3 + 1] = x.y, S[I * 3 + 2] = x.z;
          }
          a.setAttribute("normal", new ce(S, 3, !1));
        }
        if (g !== null)
          a.setAttribute("color", new ce(g, 4, !0)), n.vertexColors = !0, n.transparent = !0, n.depthWrite = !1;
        else if (f !== null)
          a.setAttribute("color", new ce(f, 3, !0)), n.vertexColors = !0;
        else if (b !== null) {
          const S = new Uint8Array(h * 3);
          for (let v = 0; v < h; v++) {
            const I = mc(b[v]);
            for (let B = 0; B < 3; B++) {
              const M = 3 * v + B;
              S[M] = I[B];
            }
          }
          a.setAttribute("color", new ce(S, 3, !0)), n.vertexColors = !0;
        } else if (y !== null) {
          const S = new Me(y[0], y[1], y[2]);
          n.color = S;
          const v = y[3] / 255;
          v < 1 && (n.opacity = v, n.transparent = !0, n.depthWrite = !1);
        }
      }
      const l = new hr(a, n);
      l.position.copy(o), t.scene = l, t.scene.featureTable = i, t.scene.batchTable = s;
      const d = i.getData("RTC_CENTER", 1, "FLOAT", "VEC3");
      return d && (t.scene.position.x += d[0], t.scene.position.y += d[1], t.scene.position.z += d[2]), t;
    });
  }
}
const zt = /* @__PURE__ */ new R(), je = /* @__PURE__ */ new R(), Ke = /* @__PURE__ */ new R(), qi = /* @__PURE__ */ new R(), qt = /* @__PURE__ */ new st(), jt = /* @__PURE__ */ new R(), Ye = /* @__PURE__ */ new G(), En = /* @__PURE__ */ new G(), wn = /* @__PURE__ */ new R(), vn = /* @__PURE__ */ new G(), ji = /* @__PURE__ */ new st(), Ki = {};
function Sn(c, e, t, i) {
  if (c = c / t * 2 - 1, e = e / t * 2 - 1, i.x = c, i.y = e, i.z = 1 - Math.abs(c) - Math.abs(e), i.z < 0) {
    const s = i.x;
    i.x = (1 - Math.abs(i.y)) * (s >= 0 ? 1 : -1), i.y = (1 - Math.abs(s)) * (i.y >= 0 ? 1 : -1);
  }
  return i.normalize(), i;
}
class Zr extends nc {
  constructor(e = mi) {
    super(), this.manager = e, this.adjustmentTransform = new G(), this.ellipsoid = Si.clone();
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
      const { featureTable: i, batchTable: s } = t, n = t.glbBytes.slice().buffer;
      return new Promise((r, o) => {
        const a = this.fetchOptions, l = this.manager, d = l.getHandler("path.gltf") || new qe(l);
        a.credentials === "include" && a.mode === "cors" && d.setCrossOrigin("use-credentials"), "credentials" in a && d.setWithCredentials(a.credentials === "include"), a.headers && d.setRequestHeader(a.headers);
        let h = t.gltfWorkingPath ?? this.workingPath;
        /[\\/]$/.test(h) || (h += "/");
        const u = this.adjustmentTransform;
        d.parse(n, h, (A) => {
          const p = i.getData("INSTANCES_LENGTH");
          let f = i.getData("POSITION", p, "FLOAT", "VEC3");
          const g = i.getData("POSITION_QUANTIZED", p, "UNSIGNED_SHORT", "VEC3"), b = i.getData("QUANTIZED_VOLUME_OFFSET", 1, "FLOAT", "VEC3"), y = i.getData("QUANTIZED_VOLUME_SCALE", 1, "FLOAT", "VEC3"), E = i.getData("NORMAL_UP", p, "FLOAT", "VEC3"), C = i.getData("NORMAL_RIGHT", p, "FLOAT", "VEC3"), w = i.getData("NORMAL_UP_OCT32P", p, "UNSIGNED_SHORT", "VEC2"), S = i.getData("NORMAL_RIGHT_OCT32P", p, "UNSIGNED_SHORT", "VEC2"), v = i.getData("SCALE_NON_UNIFORM", p, "FLOAT", "VEC3"), I = i.getData("SCALE", p, "FLOAT", "SCALAR"), B = i.getData("RTC_CENTER", 1, "FLOAT", "VEC3"), M = i.getData("EAST_NORTH_UP");
          if (!f && g) {
            f = new Float32Array(p * 3);
            for (let T = 0; T < p; T++)
              f[T * 3 + 0] = b[0] + g[T * 3 + 0] / 65535 * y[0], f[T * 3 + 1] = b[1] + g[T * 3 + 1] / 65535 * y[1], f[T * 3 + 2] = b[2] + g[T * 3 + 2] / 65535 * y[2];
          }
          const x = new R();
          for (let T = 0; T < p; T++)
            x.x += f[T * 3 + 0] / p, x.y += f[T * 3 + 1] / p, x.z += f[T * 3 + 2] / p;
          const Q = [], P = [];
          A.scene.updateMatrixWorld(), A.scene.traverse((T) => {
            if (T.isMesh) {
              P.push(T);
              const { geometry: U, material: L } = T, _ = new vs(U, L, p);
              _.position.copy(x), B && (_.position.x += B[0], _.position.y += B[1], _.position.z += B[2]), Q.push(_);
            }
          });
          for (let T = 0; T < p; T++) {
            qi.set(
              f[T * 3 + 0] - x.x,
              f[T * 3 + 1] - x.y,
              f[T * 3 + 2] - x.z
            ), qt.identity(), E && C ? (je.set(
              E[T * 3 + 0],
              E[T * 3 + 1],
              E[T * 3 + 2]
            ), Ke.set(
              C[T * 3 + 0],
              C[T * 3 + 1],
              C[T * 3 + 2]
            ), zt.crossVectors(Ke, je).normalize(), Ye.makeBasis(
              Ke,
              je,
              zt
            ), qt.setFromRotationMatrix(Ye)) : w && S && (Sn(
              w[T * 2 + 0],
              w[T * 2 + 1],
              65535,
              je
            ), Sn(
              S[T * 2 + 0],
              S[T * 2 + 1],
              65535,
              Ke
            ), zt.crossVectors(Ke, je).normalize(), Ye.makeBasis(
              Ke,
              je,
              zt
            ), qt.setFromRotationMatrix(Ye)), jt.set(1, 1, 1), v && jt.set(
              v[T * 3 + 0],
              v[T * 3 + 1],
              v[T * 3 + 2]
            ), I && jt.multiplyScalar(I[T]);
            for (let U = 0, L = Q.length; U < L; U++) {
              const _ = Q[U];
              ji.copy(qt), M && (_.updateMatrixWorld(), wn.copy(qi).applyMatrix4(_.matrixWorld), this.ellipsoid.getPositionToCartographic(wn, Ki), this.ellipsoid.getEastNorthUpFrame(Ki.lat, Ki.lon, vn), ji.setFromRotationMatrix(vn)), Ye.compose(qi, ji, jt).multiply(u);
              const F = P[U];
              En.multiplyMatrices(Ye, F.matrixWorld), _.setMatrixAt(T, En);
            }
          }
          A.scene.clear(), A.scene.add(...Q), A.batchTable = s, A.featureTable = i, A.scene.batchTable = s, A.scene.featureTable = i, r(A);
        }, o);
      });
    });
  }
}
class bc extends oc {
  constructor(e = mi) {
    super(), this.manager = e, this.adjustmentTransform = new G(), this.ellipsoid = Si.clone();
  }
  /**
   * Parses a cmpt buffer and resolves to an object containing a `Group` with all
   * sub-tile scenes added as children, and the individual sub-tile results.
   * @param {ArrayBuffer} buffer
   * @returns {Promise<{ scene: Group, tiles: Array }>}
   */
  parse(e) {
    const t = super.parse(e), { manager: i, ellipsoid: s, adjustmentTransform: n } = this, r = [];
    for (const o in t.tiles) {
      const { type: a, buffer: l } = t.tiles[o];
      switch (a) {
        case "b3dm": {
          const d = l.slice(), h = new Xr(i);
          h.workingPath = this.workingPath, h.fetchOptions = this.fetchOptions, h.adjustmentTransform.copy(n);
          const u = h.parse(d.buffer);
          r.push(u);
          break;
        }
        case "pnts": {
          const d = l.slice(), h = new $r(i);
          h.workingPath = this.workingPath, h.fetchOptions = this.fetchOptions;
          const u = h.parse(d.buffer);
          r.push(u);
          break;
        }
        case "i3dm": {
          const d = l.slice(), h = new Zr(i);
          h.workingPath = this.workingPath, h.fetchOptions = this.fetchOptions, h.ellipsoid.copy(s), h.adjustmentTransform.copy(n);
          const u = h.parse(d.buffer);
          r.push(u);
          break;
        }
      }
    }
    return Promise.all(r).then((o) => {
      const a = new tt();
      return o.forEach((l) => {
        a.add(l.scene);
      }), {
        tiles: o,
        scene: a
      };
    });
  }
}
const At = /* @__PURE__ */ new G();
class yc extends tt {
  constructor(e) {
    super(), this.isTilesGroup = !0, this.name = "TilesRenderer.TilesGroup", this.tilesRenderer = e, this.matrixWorldInverse = new G();
  }
  raycast(e, t) {
    return this.tilesRenderer.raycast(e, t), !1;
  }
  updateMatrixWorld(e) {
    if (this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldNeedsUpdate || e) {
      this.parent === null ? At.copy(this.matrix) : At.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1;
      const t = At.elements, i = this.matrixWorld.elements;
      let s = !1;
      for (let n = 0; n < 16; n++) {
        const r = t[n], o = i[n];
        if (Math.abs(r - o) > Number.EPSILON) {
          s = !0;
          break;
        }
      }
      if (s) {
        this.matrixWorld.copy(At), this.matrixWorldInverse.copy(At).invert();
        const n = this.children;
        for (let l = 0, d = n.length; l < d; l++)
          n[l].updateMatrixWorld();
        const { tilesRenderer: r } = this, { activeTiles: o, visibleTiles: a } = r;
        o.forEach((l) => {
          if (!a.has(l)) {
            const { scene: d } = l.engineData;
            d.traverse((h) => {
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
const Cc = /* @__PURE__ */ new di();
function Ec(c, e, t, i) {
  const { scene: s } = c.engineData;
  t.invokeOnePlugin((n) => n.raycastTile && n.raycastTile(c, s, e, i)) || e.intersectObject(s, !0, i);
}
function wc(c) {
  return "traversal" in c;
}
function eo(c, e, t, i, s = null) {
  if (!wc(e))
    return;
  const { group: n, activeTiles: r } = c, { boundingVolume: o } = e.engineData;
  if (s === null && (s = Cc, s.copy(t.ray).applyMatrix4(n.matrixWorldInverse)), !e.traversal.used || !o.intersectsRay(s))
    return;
  r.has(e) && Ec(e, t, c, i);
  const a = e.children;
  for (let l = 0, d = a.length; l < d; l++)
    eo(c, a[l], t, i, s);
}
const be = /* @__PURE__ */ new R(), ye = /* @__PURE__ */ new R(), Ce = /* @__PURE__ */ new R(), Mn = /* @__PURE__ */ new R(), In = /* @__PURE__ */ new R();
class vc {
  constructor() {
    this.sphere = null, this.obb = null, this.region = null, this.regionObb = null;
  }
  intersectsRay(e) {
    const t = this.sphere, i = this.obb || this.regionObb;
    return !(t && !e.intersectsSphere(t) || i && !i.intersectsRay(e));
  }
  intersectRay(e, t = null) {
    const i = this.sphere, s = this.obb || this.regionObb;
    let n = -1 / 0, r = -1 / 0;
    i && e.intersectSphere(i, Mn) && (n = i.containsPoint(e.origin) ? 0 : e.origin.distanceToSquared(Mn)), s && s.intersectRay(e, In) && (r = s.containsPoint(e.origin) ? 0 : e.origin.distanceToSquared(In));
    const o = Math.max(n, r);
    return o === -1 / 0 ? null : (e.at(Math.sqrt(o), t), t);
  }
  distanceToPoint(e) {
    const t = this.sphere, i = this.obb || this.regionObb;
    let s = -1 / 0, n = -1 / 0;
    return t && (s = Math.max(t.distanceToPoint(e), 0)), i && (n = i.distanceToPoint(e)), s > n ? s : n;
  }
  intersectsFrustum(e) {
    const t = this.obb || this.regionObb, i = this.sphere;
    return i && !e.intersectsSphere(i) || t && !t.intersectsFrustum(e) ? !1 : !!(i || t);
  }
  intersectsSphere(e) {
    const t = this.obb || this.regionObb, i = this.sphere;
    return i && !i.intersectsSphere(e) || t && !t.intersectsSphere(e) ? !1 : !!(i || t);
  }
  intersectsOBB(e) {
    const t = this.obb || this.regionObb, i = this.sphere;
    return i && !e.intersectsSphere(i) || t && !t.intersectsOBB(e) ? !1 : !!(i || t);
  }
  getOBB(e, t) {
    const i = this.obb || this.regionObb;
    i ? (e.copy(i.box), t.copy(i.transform)) : (this.getAABB(e), t.identity());
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
    const i = new mn();
    be.set(e[3], e[4], e[5]), ye.set(e[6], e[7], e[8]), Ce.set(e[9], e[10], e[11]);
    const s = be.length(), n = ye.length(), r = Ce.length();
    be.normalize(), ye.normalize(), Ce.normalize(), s === 0 && be.crossVectors(ye, Ce), n === 0 && ye.crossVectors(be, Ce), r === 0 && Ce.crossVectors(be, ye), i.transform.set(
      be.x,
      ye.x,
      Ce.x,
      e[0],
      be.y,
      ye.y,
      Ce.y,
      e[1],
      be.z,
      ye.z,
      Ce.z,
      e[2],
      0,
      0,
      0,
      1
    ).premultiply(t), i.box.min.set(-s, -n, -r), i.box.max.set(s, n, r), i.update(), this.obb = i;
  }
  setSphereData(e, t, i, s, n) {
    const r = new xt();
    r.center.set(e, t, i), r.radius = s, r.applyMatrix4(n), this.sphere = r;
  }
  setRegionData(e, t, i, s, n, r, o) {
    const a = new Ac(
      ...e.radius,
      i,
      n,
      t,
      s,
      r,
      o
    ), l = new mn();
    a.getBoundingBox(l.box, l.transform), l.update(), this.region = a, this.regionObb = l;
  }
}
const Sc = /* @__PURE__ */ new gr();
function Mc(c, e, t, i) {
  const s = Sc.set(
    c.normal.x,
    c.normal.y,
    c.normal.z,
    e.normal.x,
    e.normal.y,
    e.normal.z,
    t.normal.x,
    t.normal.y,
    t.normal.z
  );
  return i.set(-c.constant, -e.constant, -t.constant), i.applyMatrix3(s.invert()), i;
}
class Ic extends Zo {
  constructor() {
    super(), this.points = Array(8).fill().map(() => new R());
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
    ].forEach((i, s) => {
      Mc(i[0], i[1], i[2], t[s]);
    });
  }
}
const to = Symbol("INITIAL_FRUSTUM_CULLED"), Kt = /* @__PURE__ */ new G(), pt = /* @__PURE__ */ new R(), Yi = /* @__PURE__ */ new V(), Bc = /* @__PURE__ */ new R(1, 0, 0), xc = /* @__PURE__ */ new R(0, 1, 0);
function Bn(c, e) {
  c.traverse((t) => {
    t.frustumCulled = t[to] && e;
  });
}
class Tc extends tc {
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
      Bn(t, !e);
    }));
  }
  constructor(...e) {
    super(...e), this.accelerateRaycast = !0, this.group = new yc(this), this.ellipsoid = Si.clone(), this.cameras = [], this.cameraMap = /* @__PURE__ */ new Map(), this.cameraInfo = [], this._upRotationMatrix = new G(), this._bytesUsed = /* @__PURE__ */ new WeakMap(), this._autoDisableRendererCulling = !0, this.manager = new $o(), this._listeners = {};
  }
  addEventListener(e, t) {
    Lt.prototype.addEventListener.call(this, e, t);
  }
  hasEventListener(e, t) {
    return Lt.prototype.hasEventListener.call(this, e, t);
  }
  removeEventListener(e, t) {
    Lt.prototype.removeEventListener.call(this, e, t);
  }
  dispatchEvent(e) {
    Lt.prototype.dispatchEvent.call(this, e);
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
    const i = this.root.engineData.boundingVolume;
    return i ? (i.getOBB(e, t), !0) : !1;
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
      const i = t.engineData && t.engineData.scene;
      i && e(i, t);
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
        eo(this, this.root, e, t);
      else {
        const i = e.firstHitOnly ? [] : t;
        for (const s of this.activeTiles) {
          const { scene: n } = s.engineData;
          this.invokeOnePlugin((r) => r.raycastTile && r.raycastTile(s, n, e, i)) || e.intersectObject(n, !0, i);
        }
        e.firstHitOnly && i.length > 0 && (i.sort((s, n) => s.distance - n.distance), t.push(i[0]));
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
    const t = this.cameras, i = this.cameraMap;
    return i.has(e) ? !1 : (i.set(e, new V()), t.push(e), this.dispatchEvent({ type: "add-camera", camera: e }), !0);
  }
  /**
   * Sets the render resolution for a registered camera, used for screen-space error calculation.
   * @param {Camera} camera - A previously registered camera.
   * @param {number|Vector2} xOrVec - Render width in pixels, or a Vector2 containing width and height.
   * @param {number} [y] - Render height in pixels when `xOrVec` is a number.
   * @returns {boolean} Whether the camera is registered and the resolution was updated.
   */
  setResolution(e, t, i) {
    const s = this.cameraMap;
    if (!s.has(e))
      return !1;
    const n = t.isVector2 ? t.x : t, r = t.isVector2 ? t.y : i, o = s.get(e);
    return (o.width !== n || o.height !== r) && (o.set(n, r), this.dispatchEvent({ type: "camera-resolution-change" })), !0;
  }
  /**
   * Returns the render resolution previously set for a registered camera.
   * @param {Camera} camera - A previously registered camera.
   * @param {Vector2} target - Vector2 to write the result into.
   * @returns {Vector2|null} The target with width/height filled in, or null if the camera is not registered.
   */
  getResolution(e, t) {
    const i = this.cameraMap.get(e);
    return i ? t.copy(i) : null;
  }
  /**
   * Sets the render resolution for a camera by reading the current size from a WebGLRenderer.
   * @param {Camera} camera - A previously registered camera.
   * @param {WebGLRenderer} renderer
   * @returns {boolean} Whether the camera is registered and the resolution was updated.
   */
  setResolutionFromRenderer(e, t) {
    return t.getSize(Yi), this.setResolution(e, Yi.x, Yi.y);
  }
  /**
   * Unregisters a camera from the renderer.
   * @param {Camera} camera
   * @returns {boolean} Whether the camera was found and removed.
   */
  deleteCamera(e) {
    const t = this.cameras, i = this.cameraMap;
    if (i.has(e)) {
      const s = t.indexOf(e);
      return t.splice(s, 1), i.delete(e), this.dispatchEvent({ type: "delete-camera", camera: e }), !0;
    }
    return !1;
  }
  /* Overriden */
  loadRootTileset(...e) {
    return super.loadRootTileset(...e).then((t) => {
      const { asset: i, extensions: s = {} } = t;
      switch ((i && i.gltfUpAxis || "y").toLowerCase()) {
        case "x":
          this._upRotationMatrix.makeRotationAxis(xc, -Math.PI / 2);
          break;
        case "y":
          this._upRotationMatrix.makeRotationAxis(Bc, Math.PI / 2);
          break;
      }
      if ("3DTILES_ellipsoid" in s) {
        const n = s["3DTILES_ellipsoid"], { ellipsoid: r } = this;
        r.name = n.body, n.radii ? r.radius.set(...n.radii) : r.radius.set(1, 1, 1);
      }
      return t;
    });
  }
  prepareForTraversal() {
    const e = this.group, t = this.cameras, i = this.cameraMap, s = this.cameraInfo;
    for (; s.length > t.length; )
      s.pop();
    for (; s.length < t.length; )
      s.push({
        frustum: new Ic(),
        isOrthographic: !1,
        sseDenominator: -1,
        // used if isOrthographic:false
        position: new R(),
        invScale: -1,
        pixelSize: 0
        // used if isOrthographic:true
      });
    pt.setFromMatrixScale(e.matrixWorldInverse), Math.abs(Math.max(pt.x - pt.y, pt.x - pt.z)) > 1e-6 && console.warn("ThreeTilesRenderer : Non uniform scale used for tile which may cause issues when calculating screen space error.");
    for (let n = 0, r = s.length; n < r; n++) {
      const o = t[n], a = s[n], l = a.frustum, d = a.position, h = i.get(o);
      (h.width === 0 || h.height === 0) && console.warn("TilesRenderer: resolution for camera error calculation is not set.");
      const u = o.projectionMatrix.elements;
      if (a.isOrthographic = u[15] === 1, a.isOrthographic) {
        const A = 2 / u[0], p = 2 / u[5];
        a.pixelSize = Math.max(p / h.height, A / h.width);
      } else
        a.sseDenominator = 2 / u[5] / h.height;
      Kt.copy(e.matrixWorld), Kt.premultiply(o.matrixWorldInverse), Kt.premultiply(o.projectionMatrix), l.setFromProjectionMatrix(Kt, o.coordinateSystem, o.reversedDepth), d.set(0, 0, 0), d.applyMatrix4(o.matrixWorld), d.applyMatrix4(e.matrixWorldInverse);
    }
  }
  update() {
    if (super.update(), this.cameras.length === 0 && this.root) {
      let e = !1;
      this.invokeAllPlugins((t) => e = e || !!(t !== this && t.calculateTileViewError)), e === !1 && console.warn("TilesRenderer: no cameras defined. Cannot update 3d tiles.");
    }
  }
  preprocessNode(e, t, i = null) {
    super.preprocessNode(e, t, i);
    const s = new G();
    if (e.transform) {
      const o = e.transform;
      for (let a = 0; a < 16; a++)
        s.elements[a] = o[a];
    }
    i && s.premultiply(i.engineData.transform);
    const n = new G().copy(s).invert(), r = new vc();
    "sphere" in e.boundingVolume && r.setSphereData(...e.boundingVolume.sphere, s), "box" in e.boundingVolume && r.setObbData(e.boundingVolume.box, s), "region" in e.boundingVolume && r.setRegionData(this.ellipsoid, ...e.boundingVolume.region), e.engineData.transform = s, e.engineData.transformInverse = n, e.engineData.boundingVolume = r, e.engineData.geometry = null, e.engineData.materials = null, e.engineData.textures = null;
  }
  async parseTile(e, t, i, s, n) {
    const r = t.engineData, o = xs(s), a = this.fetchOptions, l = this.manager;
    let d = null;
    const h = r.transform, u = this._upRotationMatrix, A = (Oe(e) || i).toLowerCase();
    switch (A) {
      case "b3dm": {
        const C = new Xr(l);
        C.workingPath = o, C.fetchOptions = a, C.adjustmentTransform.copy(u), d = C.parse(e);
        break;
      }
      case "pnts": {
        const C = new $r(l);
        C.workingPath = o, C.fetchOptions = a, d = C.parse(e);
        break;
      }
      case "i3dm": {
        const C = new Zr(l);
        C.workingPath = o, C.fetchOptions = a, C.adjustmentTransform.copy(u), C.ellipsoid.copy(this.ellipsoid), d = C.parse(e);
        break;
      }
      case "cmpt": {
        const C = new bc(l);
        C.workingPath = o, C.fetchOptions = a, C.adjustmentTransform.copy(u), C.ellipsoid.copy(this.ellipsoid), d = C.parse(e).then((w) => w.scene);
        break;
      }
      // 3DTILES_content_gltf
      case "gltf":
      case "glb": {
        const C = l.getHandler("path.gltf") || l.getHandler("path.glb") || new qe(l);
        C.setWithCredentials(a.credentials === "include"), C.setRequestHeader(a.headers || {}), a.credentials === "include" && a.mode === "cors" && C.setCrossOrigin("use-credentials");
        let w = C.resourcePath || C.path || o;
        !/[\\/]$/.test(w) && w.length && (w += "/"), d = C.parseAsync(e, w).then((S) => {
          S.scene = S.scene || new tt();
          const { scene: v } = S;
          return v.updateMatrix(), v.matrix.multiply(u).decompose(v.position, v.quaternion, v.scale), S;
        });
        break;
      }
      default: {
        d = this.invokeOnePlugin((C) => C.parseToMesh && C.parseToMesh(e, t, i, s, n));
        break;
      }
    }
    const p = await d;
    if (p === null)
      throw new Error(`TilesRenderer: Content type "${A}" not supported.`);
    let f, g;
    p.isObject3D ? (f = p, g = null) : (f = p.scene, g = p), f.updateMatrix(), f.matrix.premultiply(h), f.matrix.decompose(f.position, f.quaternion, f.scale), await this.invokeAllPlugins((C) => C.processTileModel && C.processTileModel(f, t)), f.traverse((C) => {
      C[to] = C.frustumCulled;
    }), Bn(f, !this.autoDisableRendererCulling);
    const b = [], y = [], E = [];
    if (f.traverse((C) => {
      if (C.geometry && y.push(C.geometry), C.material) {
        const w = C.material;
        b.push(C.material);
        for (const S in w) {
          const v = w[S];
          v && v.isTexture && E.push(v);
        }
      }
    }), n.aborted) {
      for (let C = 0, w = E.length; C < w; C++) {
        const S = E[C];
        S.image instanceof ImageBitmap && S.image.close(), S.dispose();
      }
      return;
    }
    r.materials = b, r.geometry = y, r.textures = E, r.scene = f, r.metadata = g;
  }
  disposeTile(e) {
    super.disposeTile(e);
    const t = e.engineData;
    if (t.scene) {
      const i = t.materials, s = t.geometry, n = t.textures, r = t.scene.parent;
      t.scene.traverse((o) => {
        o.userData.meshFeatures && o.userData.meshFeatures.dispose(), o.userData.structuralMetadata && o.userData.structuralMetadata.dispose();
      });
      for (let o = 0, a = s.length; o < a; o++)
        s[o].dispose();
      for (let o = 0, a = i.length; o < a; o++)
        i[o].dispose();
      for (let o = 0, a = n.length; o < a; o++) {
        const l = n[o];
        l.image instanceof ImageBitmap && l.image.close(), l.dispose();
      }
      r && r.remove(t.scene), t.scene = null, t.materials = null, t.textures = null, t.geometry = null, t.metadata = null;
    }
  }
  setTileActive(e, t) {
    const i = e.engineData.scene, s = this.group;
    i && i.traverse((n) => {
      n.updateMatrix(), n.matrixWorld.copy(n.matrix), n.parent ? n.matrixWorld.premultiply(n.parent.matrixWorld) : n.matrixWorld.premultiply(s.matrixWorld);
    }), super.setTileActive(e, t);
  }
  setTileVisible(e, t) {
    const i = e.engineData.scene, s = this.group;
    t ? i && s.add(i) : i && s.remove(i), super.setTileVisible(e, t);
  }
  calculateBytesUsed(e, t) {
    const i = this._bytesUsed;
    return !i.has(e) && t && i.set(e, fc(t)), i.get(e) ?? null;
  }
  calculateTileViewError(e, t) {
    const i = e.engineData, s = this.cameras, n = this.cameraInfo, r = i.boundingVolume;
    let o = !1, a = 0, l = 1 / 0, d = 0, h = 1 / 0;
    for (let u = 0, A = s.length; u < A; u++) {
      const p = n[u];
      let f, g;
      if (p.isOrthographic) {
        const y = p.pixelSize;
        f = e.geometricError / y, g = 1 / 0;
      } else {
        const y = p.sseDenominator;
        g = r.distanceToPoint(p.position), f = g === 0 ? 1 / 0 : e.geometricError / (g * y);
      }
      const b = n[u].frustum;
      r.intersectsFrustum(b) && (o = !0, a = Math.max(a, f), l = Math.min(l, g)), d = Math.max(d, f), h = Math.min(h, g);
    }
    o ? (t.inView = !0, t.error = a, t.distanceFromCamera = l) : (t.inView = !1, t.error = d, t.distanceFromCamera = h);
  }
  dispose() {
    super.dispose(), this.group.removeFromParent();
  }
}
function oi(c) {
  return c.implicitTilingData.root.implicitTiling.subdivisionScheme === "OCTREE";
}
function Wi(c) {
  return oi(c) ? 8 : 4;
}
function Rc(c, e) {
  if (!c)
    return [0, 0, 0];
  const t = c.implicitTilingData.x, i = c.implicitTilingData.y, s = c.implicitTilingData.z, n = 2 * t + e % 2, r = 2 * i + Math.floor(e / 2) % 2, o = oi(c) ? 2 * s + Math.floor(e / 4) % 2 : 0;
  return [n, r, o];
}
class xn {
  constructor(e, t) {
    this.parent = e, this.children = [], this.geometricError = 0, this.boundingVolume = null;
    const [i, s, n] = Rc(e, t);
    this.implicitTilingData = {
      level: e.implicitTilingData.level + 1,
      root: e.implicitTilingData.root,
      subtreeIdx: t,
      x: i,
      y: s,
      z: n
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
class Qc extends Tt {
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
    let i = 0;
    const s = Oe(t);
    console.assert(s === "subt", 'SUBTREELoader: The magic bytes equal "subt".'), i += 4;
    const n = t.getUint32(i, !0);
    console.assert(n === 1, 'SUBTREELoader: The version listed in the header is "1".'), i += 4;
    const r = t.getUint32(i, !0);
    i += 8;
    const o = t.getUint32(i, !0);
    i += 8;
    const a = JSON.parse(Bs(new Uint8Array(e, i, r)));
    i += r;
    const l = e.slice(i, i + o);
    return {
      version: n,
      subtreeJson: a,
      subtreeByte: l
    };
  }
  async parse(e) {
    const t = this.parseBuffer(e), i = t.subtreeJson;
    i.contentAvailabilityHeaders = [].concat(i.contentAvailability);
    const s = this.preprocessBuffers(i.buffers), n = this.preprocessBufferViews(
      i.bufferViews,
      s
    );
    this.markActiveBufferViews(i, n);
    const r = await this.requestActiveBuffers(
      s,
      t.subtreeByte
    ), o = this.parseActiveBufferViews(n, r);
    this.parseAvailability(t, i, o), this.expandSubtree(this.tile, t);
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
    let i;
    const s = e.tileAvailability;
    isNaN(s.bitstream) ? isNaN(s.bufferView) || (i = t[s.bufferView]) : i = t[s.bitstream], i && (i.isActive = !0, i.bufferHeader.isActive = !0);
    const n = e.contentAvailabilityHeaders;
    for (let o = 0; o < n.length; o++)
      i = void 0, isNaN(n[o].bitstream) ? isNaN(n[o].bufferView) || (i = t[n[o].bufferView]) : i = t[n[o].bitstream], i && (i.isActive = !0, i.bufferHeader.isActive = !0);
    i = void 0;
    const r = e.childSubtreeAvailability;
    isNaN(r.bitstream) ? isNaN(r.bufferView) || (i = t[r.bufferView]) : i = t[r.bitstream], i && (i.isActive = !0, i.bufferHeader.isActive = !0);
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
    const i = [];
    for (let r = 0; r < e.length; r++) {
      const o = e[r];
      if (!o.isActive)
        i.push(Promise.resolve());
      else if (o.isExternal) {
        const a = this.parseImplicitURIBuffer(
          this.tile,
          this.rootTile.implicitTiling.subtrees.uri,
          o.uri
        ), l = fetch(a, this.fetchOptions).then((d) => {
          if (!d.ok)
            throw new Error(`SUBTREELoader: Failed to load external buffer from ${o.uri} with error code ${d.status}.`);
          return d.arrayBuffer();
        }).then((d) => new Uint8Array(d));
        i.push(l);
      } else
        i.push(Promise.resolve(new Uint8Array(t)));
    }
    const s = await Promise.all(i), n = {};
    for (let r = 0; r < s.length; r++) {
      const o = s[r];
      o && (n[r] = o);
    }
    return n;
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
    const i = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s];
      if (!n.isActive)
        continue;
      const r = n.byteOffset, o = r + n.byteLength, a = t[n.buffer];
      i[s] = a.slice(r, o);
    }
    return i;
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
      const i = e[t];
      i.isActive = !1, i.isExternal = !!i.uri;
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
    for (let i = 0; i < e.length; i++) {
      const s = e[i];
      s.bufferHeader = t[s.buffer], s.isActive = !1, s.isExternal = s.bufferHeader.isExternal;
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
  parseAvailability(e, t, i) {
    const s = Wi(this.rootTile), n = this.rootTile.implicitTiling.subtreeLevels, r = (Math.pow(s, n) - 1) / (s - 1), o = Math.pow(s, n);
    e._tileAvailability = this.parseAvailabilityBitstream(
      t.tileAvailability,
      i,
      r
    ), e._contentAvailabilityBitstreams = [];
    for (let a = 0; a < t.contentAvailabilityHeaders.length; a++) {
      const l = this.parseAvailabilityBitstream(
        t.contentAvailabilityHeaders[a],
        i,
        // content availability has the same length as tile availability.
        r
      );
      e._contentAvailabilityBitstreams.push(l);
    }
    e._childSubtreeAvailability = this.parseAvailabilityBitstream(
      t.childSubtreeAvailability,
      i,
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
  parseAvailabilityBitstream(e, t, i) {
    if (!isNaN(e.constant))
      return {
        constant: !!e.constant,
        lengthBits: i
      };
    let s;
    return isNaN(e.bitstream) ? isNaN(e.bufferView) || (s = t[e.bufferView]) : s = t[e.bitstream], {
      bitstream: s,
      lengthBits: i
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
    const i = xn.clone(e);
    for (let r = 0; t && r < t._contentAvailabilityBitstreams.length; r++)
      if (t && this.getBit(t._contentAvailabilityBitstreams[r], 0)) {
        i.content = { uri: this.parseImplicitURI(e, this.rootTile.content.uri) };
        break;
      }
    e.children.push(i);
    const s = this.transcodeSubtreeTiles(
      i,
      t
    ), n = this.listChildSubtrees(t, s);
    for (let r = 0; r < n.length; r++) {
      const o = n[r], a = o.tile, l = this.deriveChildTile(
        null,
        a,
        null,
        o.childMortonIndex
      );
      l.content = { uri: this.parseImplicitURI(l, this.rootTile.implicitTiling.subtrees.uri) }, a.children.push(l);
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
    let i = [e], s = [];
    for (let n = 1; n < this.rootTile.implicitTiling.subtreeLevels; n++) {
      const r = Wi(this.rootTile), o = (Math.pow(r, n) - 1) / (r - 1), a = r * i.length;
      for (let l = 0; l < a; l++) {
        const d = o + l, h = l >> Math.log2(r), u = i[h];
        if (!this.getBit(t._tileAvailability, d)) {
          s.push(void 0);
          continue;
        }
        const A = this.deriveChildTile(
          t,
          u,
          d,
          l
        );
        u.children.push(A), s.push(A);
      }
      i = s, s = [];
    }
    return i;
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
  deriveChildTile(e, t, i, s) {
    const n = new xn(t, s);
    n.boundingVolume = this.getTileBoundingVolume(n), n.geometricError = this.getGeometricError(n);
    for (let r = 0; e && r < e._contentAvailabilityBitstreams.length; r++)
      if (e && this.getBit(e._contentAvailabilityBitstreams[r], i)) {
        n.content = { uri: this.parseImplicitURI(n, this.rootTile.content.uri) };
        break;
      }
    return n;
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
    const i = t >> 3, s = t % 8;
    return (new Uint8Array(e.bitstream)[i] >> s & 1) === 1;
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
      const i = [...this.rootTile.boundingVolume.region], s = i[0], n = i[2], r = i[1], o = i[3], a = (n - s) / Math.pow(2, e.implicitTilingData.level), l = (o - r) / Math.pow(2, e.implicitTilingData.level);
      i[0] = s + a * e.implicitTilingData.x, i[2] = s + a * (e.implicitTilingData.x + 1), i[1] = r + l * e.implicitTilingData.y, i[3] = r + l * (e.implicitTilingData.y + 1);
      for (let d = 0; d < 4; d++) {
        const h = i[d];
        h < -Math.PI ? i[d] += 2 * Math.PI : h > Math.PI && (i[d] -= 2 * Math.PI);
      }
      if (oi(e)) {
        const d = i[4], h = (i[5] - d) / Math.pow(2, e.implicitTilingData.level);
        i[4] = d + h * e.implicitTilingData.z, i[5] = d + h * (e.implicitTilingData.z + 1);
      }
      t.region = i;
    }
    if (this.rootTile.boundingVolume.box) {
      const i = [...this.rootTile.boundingVolume.box], s = 2 ** e.implicitTilingData.level - 1, n = Math.pow(2, -e.implicitTilingData.level), r = oi(e) ? 3 : 2;
      for (let o = 0; o < r; o++) {
        i[3 + o * 3 + 0] *= n, i[3 + o * 3 + 1] *= n, i[3 + o * 3 + 2] *= n;
        const a = i[3 + o * 3 + 0], l = i[3 + o * 3 + 1], d = i[3 + o * 3 + 2], h = o === 0 ? e.implicitTilingData.x : o === 1 ? e.implicitTilingData.y : e.implicitTilingData.z;
        i[0] += 2 * a * (-0.5 * s + h), i[1] += 2 * l * (-0.5 * s + h), i[2] += 2 * d * (-0.5 * s + h);
      }
      t.box = i;
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
    const i = [], s = Wi(this.rootTile);
    for (let n = 0; n < t.length; n++) {
      const r = t[n];
      if (r !== void 0)
        for (let o = 0; o < s; o++) {
          const a = n * s + o;
          this.getBit(e._childSubtreeAvailability, a) && i.push({
            tile: r,
            childMortonIndex: a
          });
        }
    }
    return i;
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
  parseImplicitURIBuffer(e, t, i) {
    const s = this.parseImplicitURI(e, t), n = new URL(s, this.workingPath + "/");
    return n.pathname = n.pathname.substring(0, n.pathname.lastIndexOf("/")), new URL(n.pathname + "/" + i, this.workingPath + "/").toString();
  }
}
class _c {
  constructor() {
    this.name = "IMPLICIT_TILING_PLUGIN";
  }
  init(e) {
    this.tiles = e;
  }
  preprocessNode(e, t, i) {
    var s;
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
    }) : /.subtree$/i.test((s = e.content) == null ? void 0 : s.uri) && (e.internal.hasUnrenderableContent = !0, e.internal.hasRenderableContent = !1);
  }
  parseTile(e, t, i) {
    if (/^subtree$/i.test(i)) {
      const s = new Qc(t);
      return s.workingPath = t.internal.basePath, s.fetchOptions = this.tiles.fetchOptions, s.parse(e);
    }
  }
  preprocessURL(e, t) {
    if (t && t.implicitTiling) {
      const i = t.implicitTiling.subtrees.uri.replace("{level}", t.implicitTilingData.level).replace("{x}", t.implicitTilingData.x).replace("{y}", t.implicitTilingData.y).replace("{z}", t.implicitTilingData.z);
      return new URL(i, t.internal.basePath + "/").toString();
    }
    return e;
  }
  disposeTile(e) {
    var t;
    /.subtree$/i.test((t = e.content) == null ? void 0 : t.uri) && (e.children.forEach((i) => {
      this.tiles.processNodeQueue.remove(i);
    }), e.children.length = 0);
  }
}
const Dc = new dr(-1, 1, 1, -1, 0, 1);
class Lc extends pi {
  constructor() {
    super(), this.setAttribute("position", new ni([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), this.setAttribute("uv", new ni([0, 2, 0, 0, 2, 0], 2));
  }
}
const Pc = new Lc();
class io {
  /**
   * Constructs a new full screen quad.
   *
   * @param {?Material} material - The material to render te full screen quad with.
   */
  constructor(e) {
    this._mesh = new fi(Pc, e);
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
    e.render(this._mesh, Dc);
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
const so = /* @__PURE__ */ new yi();
so.maxJobs = 10;
so.priorityCallback = (c, e) => {
  const t = c.tile, i = e.tile, s = t.internal.renderer, n = i.internal.renderer, r = s.visibleTiles.has(t), o = n.visibleTiles.has(i);
  return r !== o ? r ? 1 : -1 : wi(t, i);
};
function Y(c, e, t) {
  return c && e in c ? c[e] : t;
}
function no(c) {
  return c !== "BOOLEAN" && c !== "STRING" && c !== "ENUM";
}
function kc(c) {
  return /^FLOAT/.test(c);
}
function Qt(c) {
  return /^VEC/.test(c);
}
function _t(c) {
  return /^MAT/.test(c);
}
function ro(c, e, t, i = null) {
  return _t(t) || Qt(t) ? i.fromArray(c, e) : c[e];
}
function gs(c) {
  const { type: e, componentType: t } = c;
  switch (e) {
    case "SCALAR":
      return t === "INT64" ? 0n : 0;
    case "VEC2":
      return new V();
    case "VEC3":
      return new R();
    case "VEC4":
      return new at();
    case "MAT2":
      return new ra();
    case "MAT3":
      return new gr();
    case "MAT4":
      return new G();
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
function Tn(c, e) {
  if (e == null)
    return !1;
  switch (c) {
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
function It(c, e = null) {
  switch (c) {
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
function Fc(c, e = null) {
  if (c.array) {
    e = e && Array.isArray(e) ? e : [], e.length = c.count;
    for (let t = 0, i = e.length; t < i; t++)
      e[t] = ai(c, e[t]);
  } else
    e = ai(c, e);
  return e;
}
function ai(c, e = null) {
  const t = c.default, i = c.type;
  if (e = e || gs(c), t === null) {
    switch (i) {
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
  } else if (_t(i))
    e.fromArray(t);
  else if (Qt(i))
    e.fromArray(t);
  else
    return t;
}
function Uc(c, e) {
  if (c.noData === null)
    return e;
  const t = c.noData, i = c.type;
  if (Array.isArray(e))
    for (let r = 0, o = e.length; r < o; r++)
      e[r] = s(e[r]);
  else
    e = s(e);
  return e;
  function s(r) {
    return n(r) && (r = ai(c, r)), r;
  }
  function n(r) {
    if (_t(i)) {
      const o = r.elements;
      for (let a = 0, l = t.length; a < l; a++)
        if (t[a] !== o[a])
          return !1;
      return !0;
    } else if (Qt(i)) {
      for (let o = 0, a = t.length; o < a; o++)
        if (t[o] !== r.getComponent(o))
          return !1;
      return !0;
    } else
      return t === r;
  }
}
function Vc(c, e) {
  switch (c) {
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
function Nc(c, e) {
  const {
    type: t,
    componentType: i,
    scale: s,
    offset: n,
    normalized: r
  } = c;
  if (Array.isArray(e))
    for (let h = 0, u = e.length; h < u; h++)
      e[h] = o(e[h]);
  else
    e = o(e);
  return e;
  function o(h) {
    return _t(t) ? h = l(h) : Qt(t) ? h = a(h) : h = d(h), h;
  }
  function a(h) {
    return h.x = d(h.x), h.y = d(h.y), "z" in h && (h.z = d(h.z)), "w" in h && (h.w = d(h.w)), h;
  }
  function l(h) {
    const u = h.elements;
    for (let A = 0, p = u.length; A < p; A++)
      u[A] = d(u[A]);
    return h;
  }
  function d(h) {
    return r && (h = Vc(i, h)), (r || kc(i)) && (h = h * s + n), h;
  }
}
function Ds(c, e, t = null) {
  if (c.array) {
    Array.isArray(e) || (e = new Array(c.count || 0)), e.length = t !== null ? t : c.count;
    for (let i = 0, s = e.length; i < s; i++)
      Tn(c.type, e[i]) || (e[i] = gs(c));
  } else
    Tn(c.type, e) || (e = gs(c));
  return e;
}
function li(c, e) {
  for (const t in e)
    t in c || delete e[t];
  for (const t in c) {
    const i = c[t];
    e[t] = Ds(i, e[t]);
  }
}
function Gc(c) {
  switch (c) {
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
class Mi {
  constructor(e, t, i = null) {
    this.name = t.name || null, this.description = t.description || null, this.type = t.type, this.componentType = t.componentType || null, this.enumType = t.enumType || null, this.array = t.array || !1, this.count = t.count || 0, this.normalized = t.normalized || !1, this.offset = t.offset || 0, this.scale = Y(t, "scale", 1), this.max = Y(t, "max", 1 / 0), this.min = Y(t, "min", -1 / 0), this.required = t.required || !1, this.noData = Y(t, "noData", null), this.default = Y(t, "default", null), this.semantic = Y(t, "semantic", null), this.enumSet = null, this.accessorProperty = i, i && (this.offset = Y(i, "offset", this.offset), this.scale = Y(i, "scale", this.scale), this.max = Y(i, "max", this.max), this.min = Y(i, "min", this.min)), t.type === "ENUM" && (this.enumSet = e[this.enumType], this.componentType === null && (this.componentType = Y(this.enumSet, "valueType", "UINT16")));
  }
  // shape the given target to match the data type of the property
  // enums are set to their integer value
  shapeToProperty(e, t = null) {
    return Ds(this, e, t);
  }
  // resolve the given object to the default value for the property for a single element
  // enums are set to a default string
  resolveDefaultElement(e) {
    return ai(this, e);
  }
  // resolve the target to the default value for the property for every element if it's an array
  // enums are set to a default string
  resolveDefault(e) {
    return Fc(this, e);
  }
  // converts any instances of no data to the default value
  resolveNoData(e) {
    return Uc(this, e);
  }
  // converts enums integers in the given target to strings
  resolveEnumsToStrings(e) {
    const t = this.enumSet;
    if (this.type === "ENUM")
      if (Array.isArray(e))
        for (let s = 0, n = e.length; s < n; s++)
          e[s] = i(e[s]);
      else
        e = i(e);
    return e;
    function i(s) {
      const n = t.values.find((r) => r.value === s);
      return n === null ? "" : n.name;
    }
  }
  // apply scales
  adjustValueScaleOffset(e) {
    return no(this.type) ? Nc(this, e) : e;
  }
}
class Ls {
  constructor(e, t = {}, i = {}, s = null) {
    this.definition = e, this.class = t[e.class], this.className = e.class, this.enums = i, this.data = s, this.name = "name" in e ? e.name : null, this.properties = null;
  }
  getPropertyNames() {
    return Object.keys(this.class.properties);
  }
  includesData(e) {
    return !!this.definition.properties[e];
  }
  dispose() {
  }
  _initProperties(e = Mi) {
    const t = {};
    for (const i in this.class.properties)
      t[i] = new e(this.enums, this.class.properties[i], this.definition.properties[i]);
    this.properties = t;
  }
}
class Oc extends Mi {
  constructor(e, t, i = null) {
    super(e, t, i), this.attribute = i?.attribute ?? null;
  }
}
class Hc extends Ls {
  constructor(...e) {
    super(...e), this.isPropertyAttributeAccessor = !0, this._initProperties(Oc);
  }
  getData(e, t, i = {}) {
    const s = this.properties;
    li(s, i);
    for (const n in s)
      i[n] = this.getPropertyValue(n, e, t, i[n]);
    return i;
  }
  getPropertyValue(e, t, i, s = null) {
    if (t >= this.count)
      throw new Error("PropertyAttributeAccessor: Requested index is outside the range of the buffer.");
    const n = this.properties[e], r = n.type;
    if (n) {
      if (!this.definition.properties[e])
        return n.resolveDefault(s);
    } else throw new Error("PropertyAttributeAccessor: Requested class property does not exist.");
    s = n.shapeToProperty(s);
    const o = i.getAttribute(n.attribute.toLowerCase());
    if (_t(r)) {
      const a = s.elements;
      for (let l = 0, d = a.length; l < d; l < d)
        a[l] = o.getComponent(t, l);
    } else if (Qt(r))
      s.fromBufferAttribute(o, t);
    else if (r === "SCALAR" || r === "ENUM")
      s = o.getX(t);
    else
      throw new Error("StructuredMetadata.PropertyAttributeAccessor: BOOLEAN and STRING types are not supported by property attributes.");
    return s = n.adjustValueScaleOffset(s), s = n.resolveEnumsToStrings(s), s = n.resolveNoData(s), s;
  }
}
class zc extends Mi {
  constructor(e, t, i = null) {
    super(e, t, i), this.values = i?.values ?? null, this.valueLength = Gc(this.type), this.arrayOffsets = Y(i, "arrayOffsets", null), this.stringOffsets = Y(i, "stringOffsets", null), this.arrayOffsetType = Y(i, "arrayOffsetType", "UINT32"), this.stringOffsetType = Y(i, "stringOffsetType", "UINT32");
  }
  // returns the necessary array length based on the array offsets if present
  getArrayLengthFromId(e, t) {
    let i = this.count;
    if (this.arrayOffsets !== null) {
      const { arrayOffsets: s, arrayOffsetType: n } = this, r = It(n), o = new r(e[s]);
      i = o[t + 1] - o[t];
    }
    return i;
  }
  // returns the index offset into the data buffer for the given id based on the
  // the array offsets if present
  getIndexOffsetFromId(e, t) {
    let i = t;
    if (this.arrayOffsets) {
      const { arrayOffsets: s, arrayOffsetType: n } = this, r = It(n);
      i = new r(e[s])[i];
    } else this.array && (i *= this.count);
    return i;
  }
}
class qc extends Ls {
  constructor(...e) {
    super(...e), this.isPropertyTableAccessor = !0, this.count = this.definition.count, this._initProperties(zc);
  }
  getData(e, t = {}) {
    const i = this.properties;
    li(i, t);
    for (const s in i)
      t[s] = this.getPropertyValue(s, e, t[s]);
    return t;
  }
  // reads an individual element
  _readValueAtIndex(e, t, i, s = null) {
    const n = this.properties[e], { componentType: r, type: o } = n, a = this.data, l = a[n.values], d = It(r, o), h = new d(l), u = n.getIndexOffsetFromId(a, t);
    if (no(o) || o === "ENUM")
      return ro(h, (u + i) * n.valueLength, o, s);
    if (o === "STRING") {
      let A = u + i, p = 0;
      if (n.stringOffsets !== null) {
        const { stringOffsets: g, stringOffsetType: b } = n, y = It(b), E = new y(a[g]);
        p = E[A + 1] - E[A], A = E[A];
      }
      const f = new Uint8Array(h.buffer, A, p);
      s = new TextDecoder().decode(f);
    } else if (o === "BOOLEAN") {
      const A = u + i, p = Math.floor(A / 8), f = A % 8;
      s = (h[p] >> f & 1) === 1;
    }
    return s;
  }
  // Reads the data for the given table index
  getPropertyValue(e, t, i = null) {
    if (t >= this.count)
      throw new Error("PropertyTableAccessor: Requested index is outside the range of the table.");
    const s = this.properties[e];
    if (s) {
      if (!this.definition.properties[e])
        return s.resolveDefault(i);
    } else throw new Error("PropertyTableAccessor: Requested property does not exist.");
    const n = s.array, r = this.data, o = s.getArrayLengthFromId(r, t);
    if (i = s.shapeToProperty(i, o), n)
      for (let a = 0, l = i.length; a < l; a++)
        i[a] = this._readValueAtIndex(e, t, a, i[a]);
    else
      i = this._readValueAtIndex(e, t, 0, i);
    return i = s.adjustValueScaleOffset(i), i = s.resolveEnumsToStrings(i), i = s.resolveNoData(i), i;
  }
}
const ft = /* @__PURE__ */ new na();
class Rn {
  constructor() {
    this._renderer = new ea(), this._target = new js(1, 1), this._texTarget = new js(), this._quad = new io(new br({
      blending: sa,
      blendDst: ia,
      blendSrc: ta,
      uniforms: {
        map: { value: null },
        pixel: { value: new V() }
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
    const { _renderer: t, _target: i } = this;
    return t.readRenderTargetPixelsAsync(i, 0, 0, e.length / 4, 1, e);
  }
  // read data from the rendered texture
  readData(e) {
    const { _renderer: t, _target: i } = this;
    t.readRenderTargetPixels(i, 0, 0, e.length / 4, 1, e);
  }
  // render a single pixel from the source at the destination point on the render target
  // takes the texture, pixel to read from, and pixel to render in to
  renderPixelToTarget(e, t, i) {
    const { _renderer: s, _target: n } = this;
    ft.min.copy(t), ft.max.copy(t), ft.max.x += 1, ft.max.y += 1, s.initRenderTarget(n), s.copyTextureToTexture(e, n.texture, ft, i, 0);
  }
}
const _e = /* @__PURE__ */ new class {
  constructor() {
    let c = null;
    Object.getOwnPropertyNames(Rn.prototype).forEach((e) => {
      e !== "constructor" && (this[e] = (...t) => (c = c || new Rn(), c[e](...t)));
    });
  }
}(), Qn = /* @__PURE__ */ new V(), _n = /* @__PURE__ */ new V(), Dn = /* @__PURE__ */ new V();
function jc(c, e) {
  return e === 0 ? c.getAttribute("uv") : c.getAttribute(`uv${e}`);
}
function oo(c, e, t = new Array(3)) {
  let i = 3 * e, s = 3 * e + 1, n = 3 * e + 2;
  return c.index && (i = c.index.getX(i), s = c.index.getX(s), n = c.index.getX(n)), t[0] = i, t[1] = s, t[2] = n, t;
}
function ao(c, e, t, i, s) {
  const [n, r, o] = i, a = jc(c, e);
  Qn.fromBufferAttribute(a, n), _n.fromBufferAttribute(a, r), Dn.fromBufferAttribute(a, o), s.set(0, 0, 0).addScaledVector(Qn, t.x).addScaledVector(_n, t.y).addScaledVector(Dn, t.z);
}
function lo(c, e, t, i) {
  const s = c.x - Math.floor(c.x), n = c.y - Math.floor(c.y), r = Math.floor(s * e % e), o = Math.floor(n * t % t);
  return i.set(r, o), i;
}
const Ln = /* @__PURE__ */ new V(), Pn = /* @__PURE__ */ new V(), kn = /* @__PURE__ */ new V();
class Kc extends Mi {
  constructor(e, t, i = null) {
    super(e, t, i), this.channels = Y(i, "channels", [0]), this.index = Y(i, "index", null), this.texCoord = Y(i, "texCoord", null), this.valueLength = parseInt(this.type.replace(/[^0-9]/g, "")) || 1;
  }
  // takes the buffer to read from and the value index to read
  readDataFromBuffer(e, t, i = null) {
    const s = this.type;
    if (s === "BOOLEAN" || s === "STRING")
      throw new Error("PropertyTextureAccessor: BOOLEAN and STRING types not supported.");
    return ro(e, t * this.valueLength, s, i);
  }
}
class Yc extends Ls {
  constructor(...e) {
    super(...e), this.isPropertyTextureAccessor = !0, this._asyncRead = !1, this._initProperties(Kc);
  }
  // Reads the full set of property data
  getData(e, t, i, s = {}) {
    const n = this.properties;
    li(n, s);
    const r = Object.keys(n), o = r.map((a) => s[a]);
    return this.getPropertyValuesAtTexel(r, e, t, i, o), r.forEach((a, l) => s[a] = o[l]), s;
  }
  // Reads the full set of property data asynchronously
  async getDataAsync(e, t, i, s = {}) {
    const n = this.properties;
    li(n, s);
    const r = Object.keys(n), o = r.map((a) => s[a]);
    return await this.getPropertyValuesAtTexelAsync(r, e, t, i, o), r.forEach((a, l) => s[a] = o[l]), s;
  }
  // Reads values asynchronously
  getPropertyValuesAtTexelAsync(...e) {
    this._asyncRead = !0;
    const t = this.getPropertyValuesAtTexel(...e);
    return this._asyncRead = !1, t;
  }
  // Reads values from the textures synchronously
  getPropertyValuesAtTexel(e, t, i, s, n = []) {
    for (; n.length < e.length; ) n.push(null);
    n.length = e.length, _e.increaseSizeTo(n.length);
    const r = this.data, o = this.definition.properties, a = this.properties, l = oo(s, t);
    for (let u = 0, A = e.length; u < A; u++) {
      const p = e[u];
      if (!o[p])
        continue;
      const f = a[p], g = r[f.index];
      ao(s, f.texCoord, i, l, Ln), lo(Ln, g.image.width, g.image.height, Pn), kn.set(u, 0), _e.renderPixelToTarget(g, Pn, kn);
    }
    const d = new Uint8Array(e.length * 4);
    if (this._asyncRead)
      return _e.readDataAsync(d).then(() => (h.call(this), n));
    return _e.readData(d), h.call(this), n;
    function h() {
      for (let u = 0, A = e.length; u < A; u++) {
        const p = e[u], f = a[p], g = f.type;
        if (n[u] = Ds(f, n[u]), f) {
          if (!o[p]) {
            n[u] = f.resolveDefault(n);
            continue;
          }
        } else throw new Error("PropertyTextureAccessor: Requested property does not exist.");
        const b = f.valueLength * (f.count || 1), y = f.channels.map((S) => d[4 * u + S]), E = f.componentType, C = It(E, g), w = new C(b);
        if (new Uint8Array(w.buffer).set(y), f.array) {
          const S = n[u];
          for (let v = 0, I = S.length; v < I; v++)
            S[v] = f.readDataFromBuffer(w, v, S[v]);
        } else
          n[u] = f.readDataFromBuffer(w, 0, n[u]);
        n[u] = f.adjustValueScaleOffset(n[u]), n[u] = f.resolveEnumsToStrings(n[u]), n[u] = f.resolveNoData(n[u]);
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
class Fn {
  constructor(e, t, i, s = null, n = null) {
    const {
      schema: r,
      propertyTables: o = [],
      propertyTextures: a = [],
      propertyAttributes: l = []
    } = e, { enums: d, classes: h } = r, u = o.map((f) => new qc(f, h, d, i));
    let A = [], p = [];
    s && (s.propertyTextures && (A = s.propertyTextures.map((f) => new Yc(a[f], h, d, t))), s.propertyAttributes && (p = s.propertyAttributes.map((f) => new Hc(l[f], h, d)))), this.schema = r, this.tableAccessors = u, this.textureAccessors = A, this.attributeAccessors = p, this.object = n, this.textures = t, this.nodeMetadata = s;
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
  getPropertyTableData(e, t, i = null) {
    if (!Array.isArray(e))
      i = i || {}, i = this.tableAccessors[e].getData(t, i);
    else {
      i = i || [];
      const s = Math.min(e.length, t.length);
      i.length = s;
      for (let n = 0; n < s; n++) {
        const r = this.tableAccessors[e[n]];
        i[n] = r.getData(t[n], i[n]);
      }
    }
    if (Array.isArray(e) !== Array.isArray(i) || Array.isArray(e) !== Array.isArray(t))
      throw new Error("StructuralMetadata: Scalar and array inputs cannot be mixed.");
    return i;
  }
  /**
   * Returns name and class information for one or more property tables. Defaults to all
   * tables when `tableIndices` is `null`.
   * @param {Array<number>|null} [tableIndices=null]
   * @returns {Array<{name: string, className: string}>|{name: string, className: string}}
   */
  getPropertyTableInfo(e = null) {
    if (e === null && (e = this.tableAccessors.map((t, i) => i)), Array.isArray(e))
      return e.map((t) => {
        const i = this.tableAccessors[t];
        return {
          name: i.name,
          className: i.definition.class
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
  getPropertyTextureData(e, t, i = []) {
    const s = this.textureAccessors;
    i.length = s.length;
    for (let n = 0; n < s.length; n++) {
      const r = s[n];
      i[n] = r.getData(e, t, this.object.geometry, i[n]);
    }
    return i;
  }
  /**
   * Returns the same data as `getPropertyTextureData` but performs texture reads
   * asynchronously.
   * @param {number} triangle Triangle index from a raycast hit.
   * @param {Vector3} barycoord Barycentric coordinate of the hit point.
   * @param {Array} [target=[]] Optional target array to write into.
   * @returns {Array}
   */
  async getPropertyTextureDataAsync(e, t, i = []) {
    const s = this.textureAccessors;
    i.length = s.length;
    const n = [];
    for (let r = 0; r < s.length; r++) {
      const o = s[r].getDataAsync(e, t, this.object.geometry, i[r]).then((a) => {
        i[r] = a;
      });
      n.push(o);
    }
    return await Promise.all(n), i;
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
    const i = this.attributeAccessors;
    t.length = i.length;
    for (let s = 0; s < i.length; s++) {
      const n = i[s];
      t[s] = n.getData(e, this.object.geometry, t[s]);
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
const mt = "EXT_structural_metadata";
function Wc(c, e = []) {
  var t;
  const i = ((t = c.json.textures) == null ? void 0 : t.length) || 0, s = new Array(i).fill(null);
  return e.forEach(({ properties: n }) => {
    for (const r in n) {
      const { index: o } = n[r];
      s[o] === null && (s[o] = c.loadTexture(o));
    }
  }), Promise.all(s);
}
function Jc(c, e = []) {
  var t;
  const i = ((t = c.json.bufferViews) == null ? void 0 : t.length) || 0, s = new Array(i).fill(null);
  return e.forEach(({ properties: n }) => {
    for (const r in n) {
      const { values: o, arrayOffsets: a, stringOffsets: l } = n[r];
      s[o] === null && (s[o] = c.loadBufferView(o)), s[a] === null && (s[a] = c.loadBufferView(a)), s[l] === null && (s[l] = c.loadBufferView(l));
    }
  }), Promise.all(s);
}
class Xc {
  constructor(e) {
    this.parser = e, this.name = mt;
  }
  async afterRoot({ scene: e, parser: t }) {
    const i = t.json.extensionsUsed;
    if (!i || !i.includes(mt))
      return;
    let s = null, n = t.json.extensions[mt];
    if (n.schemaUri) {
      const { manager: l, path: d, requestHeader: h, crossOrigin: u } = t.options, A = new URL(n.schemaUri, d).toString(), p = new Le(l);
      p.setCrossOrigin(u), p.setResponseType("json"), p.setRequestHeader(h), s = p.loadAsync(A).then((f) => {
        n = { ...n, schema: f };
      });
    }
    const [r, o] = await Promise.all([
      Wc(t, n.propertyTextures),
      Jc(t, n.propertyTables),
      s
    ]), a = new Fn(n, r, o);
    e.userData.structuralMetadata = a, e.traverse((l) => {
      var d;
      if (t.associations.has(l)) {
        const { meshes: h, primitives: u } = t.associations.get(l), A = (d = t.json.meshes[h]) == null ? void 0 : d.primitives[u];
        if (A && A.extensions && A.extensions[mt]) {
          const p = A.extensions[mt];
          l.userData.structuralMetadata = new Fn(n, r, o, p, l);
        } else
          l.userData.structuralMetadata = a;
      }
    });
  }
}
const Un = /* @__PURE__ */ new V(), Vn = /* @__PURE__ */ new V(), Nn = /* @__PURE__ */ new V();
function $c(c) {
  return c.x > c.y && c.x > c.z ? 0 : c.y > c.z ? 1 : 2;
}
class Zc {
  constructor(e, t, i) {
    this.geometry = e, this.textures = t, this.data = i, this._asyncRead = !1, this.featureIds = i.featureIds.map((s) => {
      const { texture: n, ...r } = s, o = {
        label: null,
        propertyTable: null,
        nullFeatureId: null,
        ...r
      };
      return n && (o.texture = {
        texCoord: 0,
        channels: [0],
        ...n
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
    const { geometry: i, textures: s, featureIds: n } = this, r = new Array(n.length).fill(null), o = n.length;
    _e.increaseSizeTo(o);
    const a = oo(i, e), l = a[$c(t)];
    for (let u = 0, A = n.length; u < A; u++) {
      const p = n[u], f = "nullFeatureId" in p ? p.nullFeatureId : null;
      if ("texture" in p) {
        const g = s[p.texture.index];
        ao(i, p.texture.texCoord, t, a, Un), lo(Un, g.image.width, g.image.height, Vn), Nn.set(u, 0), _e.renderPixelToTarget(s[p.texture.index], Vn, Nn);
      } else if ("attribute" in p) {
        const g = i.getAttribute(`_feature_id_${p.attribute}`).getX(l);
        g !== f && (r[u] = g);
      } else {
        const g = l;
        g !== f && (r[u] = g);
      }
    }
    const d = new Uint8Array(o * 4);
    if (this._asyncRead)
      return _e.readDataAsync(d).then(() => (h(), r));
    return _e.readData(d), h(), r;
    function h() {
      const u = new Uint32Array(1);
      for (let A = 0, p = n.length; A < p; A++) {
        const f = n[A], g = "nullFeatureId" in f ? f.nullFeatureId : null;
        if ("texture" in f) {
          const { channels: b } = f.texture, y = b.map((C) => d[4 * A + C]);
          new Uint8Array(u.buffer).set(y);
          const E = u[0];
          E !== g && (r[A] = E);
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
const ci = "EXT_mesh_features";
function Gn(c, e, t) {
  c.traverse((i) => {
    var s;
    if (e.associations.has(i)) {
      const { meshes: n, primitives: r } = e.associations.get(i), o = (s = e.json.meshes[n]) == null ? void 0 : s.primitives[r];
      o && o.extensions && o.extensions[ci] && t(i, o.extensions[ci]);
    }
  });
}
class eh {
  constructor(e) {
    this.parser = e, this.name = ci;
  }
  async afterRoot({ scene: e, parser: t }) {
    var i;
    const s = t.json.extensionsUsed;
    if (!s || !s.includes(ci))
      return;
    const n = ((i = t.json.textures) == null ? void 0 : i.length) || 0, r = new Array(n).fill(null);
    Gn(e, t, (a, { featureIds: l }) => {
      l.forEach((d) => {
        if (d.texture && r[d.texture.index] === null) {
          const h = d.texture.index;
          r[h] = t.loadTexture(h);
        }
      });
    });
    const o = await Promise.all(r);
    Gn(e, t, (a, l) => {
      a.userData.meshFeatures = new Zc(a.geometry, o, l);
    });
  }
}
class th {
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
class ih {
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
    const t = new qe(e.manager);
    this.dracoLoader && (t.setDRACOLoader(this.dracoLoader), e.manager.addHandler(this._dracoRegex, this.dracoLoader)), this.ktxLoader && t.setKTX2Loader(this.ktxLoader), this.meshoptDecoder && t.setMeshoptDecoder(this.meshoptDecoder), this.rtc && t.register(() => new th()), this.metadata && (t.register(() => new Xc()), t.register(() => new eh())), this.plugins.forEach((i) => t.register(i)), e.manager.addHandler(this._gltfRegex, t), this.tiles = e, this._loader = t;
  }
  dispose() {
    this.tiles.manager.removeHandler(this._gltfRegex), this.tiles.manager.removeHandler(this._dracoRegex), this.autoDispose && (this.ktxLoader.dispose(), this.dracoLoader.dispose());
  }
}
const { clamp: wd } = rt;
new io(new Ve());
const sh = new mr(new Uint8Array([255, 255, 255, 255]), 1, 1);
sh.needsUpdate = !0;
const si = {
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
}, Ji = {
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
}, On = {
  standalone: si,
  quest: si,
  mobile: si,
  pcvr: Ji,
  desktop: Ji,
  high: Ji
};
function nh() {
  if (typeof navigator > "u") return "standalone";
  const c = navigator.userAgent || "", e = navigator.platform || "", t = navigator.maxTouchPoints > 0, i = /OculusBrowser|Quest|Meta Quest|Horizon/i.test(c), s = /Android|Mobile|iPhone|iPad|iPod/i.test(c) || /MacIntel/i.test(e) && t;
  return i || s ? "standalone" : "pcvr";
}
function co(c = "auto") {
  const e = String(c || "auto").toLowerCase();
  return e === "auto" ? On[nh()] : On[e] || si;
}
function rh(c = {}, e = "auto", t = {}) {
  const i = co(e);
  return {
    ...c,
    performanceProfile: e || "auto",
    resolvedPerformanceProfile: i.name,
    framebufferScaleFactor: typeof t.framebufferScaleFactor == "number" ? c.framebufferScaleFactor : i.vr.framebufferScaleFactor,
    foveation: typeof t.foveation == "number" ? c.foveation : i.vr.foveation,
    shadowProfile: typeof t.shadowProfile == "string" ? c.shadowProfile : i.vr.shadowProfile
  };
}
function oh(c = {}) {
  const e = co(
    c.vrPerformanceProfile || c.resolvedVRPerformanceProfile || "auto"
  ), t = e.tileset;
  return {
    resolvedVRPerformanceProfile: e.name,
    ktxWorkerLimit: typeof c.ktxWorkerLimit == "number" && c.ktxWorkerLimit > 0 ? Math.floor(c.ktxWorkerLimit) : t.ktxWorkerLimit,
    vrMaxTriangles: typeof c.vrMaxTriangles == "number" && c.vrMaxTriangles > 0 ? c.vrMaxTriangles : t.vrMaxTriangles,
    vrErrorTargetFloor: typeof c.vrErrorTargetFloor == "number" && c.vrErrorTargetFloor >= 0 ? c.vrErrorTargetFloor : t.vrErrorTargetFloor,
    vrShadowCasterMode: ["all", "near", "none"].includes(c.vrShadowCasterMode) ? c.vrShadowCasterMode : t.vrShadowCasterMode,
    vrMaxShadowCastingTiles: typeof c.vrMaxShadowCastingTiles == "number" && c.vrMaxShadowCastingTiles > 0 ? Math.floor(c.vrMaxShadowCastingTiles) : t.vrMaxShadowCastingTiles,
    vrShadowCasterRadius: typeof c.vrShadowCasterRadius == "number" && c.vrShadowCasterRadius > 0 ? c.vrShadowCasterRadius : t.vrShadowCasterRadius
  };
}
const ah = "https://unpkg.com/three@0.179.1/examples/jsm/libs/draco/gltf/", lh = "https://unpkg.com/three@0.179.1/examples/jsm/libs/basis/", Hn = new m.Vector3(), zn = new m.Quaternion();
class ch extends Tc {
  preprocessTileset(e, t, i = null) {
    const s = e.asset?.version || "1.0", [n] = s.split(".").map((o) => parseInt(o, 10));
    console.assert(
      n <= 1,
      "TilesRenderer: asset.version is expected to be a 1.x or a compatible version."
    );
    let r = t.replace(/\/[^/]*$/, "");
    r = new URL(r, window.location.href).toString(), this.preprocessNode(e.root, r, i);
  }
}
class hh {
  constructor(e = null, t = null) {
    this.renderer = e, this.camera = t, this.activeTilesets = /* @__PURE__ */ new Set(), this.tilesetStates = /* @__PURE__ */ new Map(), this.pendingQueueTasks = [], this.xrSession = null, this._resolutionVec2 = new m.Vector2(), this.lastUpdateDurationMs = 0, this.maxUpdateDurationMs = 0, this.updateRunCount = 0, this.updateGatedCount = 0;
  }
  clamp(e, t, i) {
    return Math.min(i, Math.max(t, e));
  }
  setRenderer(e) {
    this.renderer = e, this.updateResolution();
  }
  setXRSession(e = null) {
    e !== this.xrSession && (this.xrSession = e, He.setXRSession(e));
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
  syncTilesetTraversalCameras(e, t, i = {}) {
    if (!e || !t)
      return [];
    const s = this.getDesiredTraversalCameras(t, i);
    return (Array.isArray(e.cameras) ? [...e.cameras] : []).forEach((r) => {
      s.includes(r) || e.deleteCamera(r);
    }), s.forEach((r) => {
      e.setCamera(r);
    }), s;
  }
  setCamera(e) {
    const t = this.camera;
    this.camera = e, this.activeTilesets.forEach((i) => {
      const s = this.tilesetStates.get(i), n = this.getResolutionConfig(s);
      if (t && t !== this.camera && this.getDesiredTraversalCameras(t, n).forEach((o) => {
        i.deleteCamera(o);
      }), this.camera) {
        const r = this.syncTilesetTraversalCameras(i, this.camera, n);
        this.setResolutionForCamera(i, this.camera, r, n), s && (s.traversalCameras = r, s.syncedTopCamera = this.camera, s.lastResolutionWidth = -1, s.lastResolutionHeight = -1);
      }
    });
  }
  setResolutionForCamera(e, t, i = null, s = {}) {
    if (!e || !t || !this.renderer)
      return;
    const n = s?.usePerEyeResolution !== !1, r = s?.useDrawingBufferResolution !== !1, o = Array.isArray(i) && i.length > 0 ? i : this.getDesiredTraversalCameras(t, s);
    if (o.length !== 0) {
      if (n && t.isArrayCamera) {
        let a = !1;
        if (o.forEach((l) => {
          const d = l?.viewport;
          d && Number.isFinite(d.z) && Number.isFinite(d.w) && d.z > 0 && d.w > 0 && (e.setResolution(l, d.z, d.w), a = !0);
        }), a)
          return;
      }
      if (r && this.renderer.getDrawingBufferSize) {
        this.renderer.getDrawingBufferSize(this._resolutionVec2), o.forEach((a) => {
          e.setResolution(a, this._resolutionVec2.x, this._resolutionVec2.y);
        });
        return;
      }
      o.forEach((a) => {
        e.setResolutionFromRenderer(a, this.renderer);
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
      const t = this.tilesetStates.get(e), i = this.getResolutionConfig(t), s = this.syncTilesetTraversalCameras(e, this.camera, i);
      this.setResolutionForCamera(e, this.camera, s, i), t && (t.traversalCameras = s, t.syncedTopCamera = this.camera, t.lastResolutionWidth = -1, t.lastResolutionHeight = -1);
    });
  }
  runScheduledQueueTasks(e = {}) {
    if (this.pendingQueueTasks.length === 0)
      return;
    const i = Number.isFinite(e?.maxTasks) && e.maxTasks > 0 ? Math.max(1, Math.floor(e.maxTasks)) : 1 / 0, s = Number.isFinite(e?.timeBudgetMs) && e.timeBudgetMs >= 0, n = s ? e.timeBudgetMs : 1 / 0, r = s ? performance.now() : 0;
    let o = 0;
    for (; this.pendingQueueTasks.length > 0 && o < i && !(s && performance.now() - r >= n); ) {
      const a = this.pendingQueueTasks.shift();
      typeof a == "function" && a(), o += 1;
    }
  }
  isValidBox3(e) {
    return !e || !(e instanceof m.Box3) || e.isEmpty() ? !1 : Number.isFinite(e.min.x) && Number.isFinite(e.min.y) && Number.isFinite(e.min.z) && Number.isFinite(e.max.x) && Number.isFinite(e.max.y) && Number.isFinite(e.max.z);
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
    return !Array.isArray(t) || t.length !== 16 ? null : t.every((i) => Number.isFinite(i)) ? t : null;
  }
  getRootTransformUpVector(e) {
    const t = this.getRootTransformArray(e);
    if (!t) return null;
    const i = new m.Vector3(t[8], t[9], t[10]);
    return i.lengthSq() <= 1e-12 ? null : i.normalize();
  }
  isLikelyGeospatialTileset(e) {
    const t = e?.rootTileset;
    if (!t) return !1;
    const i = t.properties;
    if (i && typeof i == "object") {
      const n = Object.keys(i).map((r) => r.toLowerCase());
      if (n.includes("latitude") && n.includes("longitude"))
        return !0;
    }
    const s = this.getRootTransformArray(e);
    if (s) {
      const n = s[12], r = s[13], o = s[14];
      if (Number.isFinite(n) && Number.isFinite(r) && Number.isFinite(o) && Math.hypot(n, r, o) > 1e6)
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
    const s = this.getRootTransformUpVector(e.tileset);
    if (!s)
      return !1;
    const n = s.clone().applyQuaternion(e.upGroup.quaternion);
    if (n.lengthSq() <= 1e-12)
      return !1;
    n.normalize();
    const r = new m.Vector3(0, 1, 0), o = new m.Quaternion().setFromUnitVectors(n, r);
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
    const i = bi(t, {
      dracoDecoderPath: ah,
      ktx2TranscoderPath: lh
    }), s = new Sr();
    s.setDecoderPath(i.dracoDecoderPath);
    const n = new oe();
    n.setTranscoderPath(i.ktx2TranscoderPath), Number.isFinite(t.ktxWorkerLimit) && t.ktxWorkerLimit > 0 && n.setWorkerLimit(Math.max(1, Math.floor(t.ktxWorkerLimit))), this.renderer && n.detectSupport(this.renderer);
    const r = new ih({
      rtc: !0,
      dracoLoader: s,
      ktxLoader: n
    });
    return e.registerPlugin(r), { dracoLoader: s, ktxLoader: n, gltfExtensionsPlugin: r };
  }
  convertBasicMaterial(e, t = "standard") {
    if (!e?.isMeshBasicMaterial)
      return e;
    const i = {
      color: e.color ? e.color.clone() : new m.Color(16777215),
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
    }, s = t === "lambert" ? new m.MeshLambertMaterial(i) : new m.MeshStandardMaterial(i);
    return s.name = e.name || s.name, s.isMeshStandardMaterial && (s.roughness = 0.92, s.metalness = 0.03), s.toneMapped = e.toneMapped, s.visible = e.visible, s.needsUpdate = !0, s;
  }
  normalizeTileModel(e, t = null) {
    if (!e?.traverse) return;
    const i = t?.tileCastShadow !== !1, s = t?.tileReceiveShadow !== !1, n = t?.tileLighting === "lambert" ? "lambert" : "standard", r = /* @__PURE__ */ new WeakMap();
    e.traverse((o) => {
      if (!o?.isMesh) return;
      if (o.geometry?.isBufferGeometry && !o.geometry.getAttribute("normal") && o.geometry.getAttribute("position"))
        try {
          o.geometry.computeVertexNormals();
        } catch {
        }
      o.castShadow = i, o.userData.belowTileCastShadowDefault = i, o.receiveShadow = s;
      const a = (l, d = -1) => {
        if (!l) return;
        let h = l;
        l.isMeshBasicMaterial && (r.has(l) ? h = r.get(l) : (h = this.convertBasicMaterial(l, n), r.set(l, h))), h.map && (h.map.colorSpace = m.SRGBColorSpace, h.map.needsUpdate = !0, this.renderer?.initTexture?.(h.map)), h.needsUpdate = !0, d >= 0 && Array.isArray(o.material) ? o.material[d] = h : o.material = h;
      };
      Array.isArray(o.material) ? o.material.forEach((l, d) => a(l, d)) : a(o.material);
    });
  }
  updateBoundsAndCenter(e) {
    if (!e) return !1;
    const { tileset: t, tilesGroup: i, upGroup: s, geoGroup: n, modelGroup: r, autoCenter: o } = e, a = new m.Box3(), l = t.getBoundingBox(a) && this.isValidBox3(a);
    if (o && l && !e.hasAutoCentered) {
      const h = a.getCenter(new m.Vector3());
      i.position.set(-h.x, -h.y, -h.z), i.updateMatrixWorld(!0), e.hasAutoCentered = !0;
    }
    r.updateMatrixWorld(!0);
    const d = new m.Box3().setFromObject(r);
    if (this.isValidBox3(d))
      return r.userData.boundingBox = d, !0;
    if (l) {
      const h = a.clone(), u = new m.Matrix4().multiplyMatrices(n.matrix, s.matrix).multiply(i.matrix);
      if (h.applyMatrix4(u), this.isValidBox3(h))
        return r.userData.boundingBox = h, !0;
    }
    return !1;
  }
  getActiveTriangleBudget(e, t = !1) {
    return e ? t ? e.vrMaxTriangles || e.maxTriangles || null : e.maxTriangles || null : null;
  }
  setSceneCastShadow(e, t) {
    e?.traverse && e.traverse((i) => {
      i?.isMesh && (i.castShadow = t);
    });
  }
  _restoreTileShadowCasters(e) {
    e?.loadedTileScenes && (e.loadedTileScenes.forEach((t) => {
      this.setSceneCastShadow(t, e.tileCastShadow !== !1);
    }), e.shadowCasterTiles.clear(), e.shadowCastersLimited = !1);
  }
  _updateTileShadowCasters(e, t, i, s = !1) {
    if (!e?.loadedTileScenes || e.vrShadowCasterMode === "all") {
      !s && e?.shadowCastersLimited && this._restoreTileShadowCasters(e);
      return;
    }
    if (!s) {
      e.shadowCastersLimited && this._restoreTileShadowCasters(e);
      return;
    }
    if (e.tileCastShadow === !1 || e.vrShadowCasterMode === "none") {
      e.shadowCastersLimited || (e.loadedTileScenes.forEach((l) => this.setSceneCastShadow(l, !1)), e.shadowCastersLimited = !0), e.shadowCasterTiles.forEach((l) => {
        l?.engineData?.scene && this.setSceneCastShadow(l.engineData.scene, !1);
      }), e.shadowCasterTiles = /* @__PURE__ */ new Set();
      return;
    }
    if (i - e.lastShadowCasterUpdateMs < e.shadowCasterUpdateIntervalMs)
      return;
    e.lastShadowCasterUpdateMs = i;
    const n = e.vrShadowCasterRadius, r = Number.isFinite(n) && n > 0 ? n * n : 1 / 0, o = [];
    e.tileset.visibleTiles.forEach((l) => {
      const d = l?.engineData?.scene;
      if (!d) return;
      const h = Number.isFinite(l.traversal?.distanceFromCamera) ? l.traversal.distanceFromCamera : 1 / 0;
      h * h > r || o.push({ tile: l, scene: d, distance: h });
    }), o.sort((l, d) => l.distance - d.distance);
    const a = new Set(
      o.slice(0, e.vrMaxShadowCastingTiles).map(({ tile: l }) => l)
    );
    e.shadowCastersLimited || (e.loadedTileScenes.forEach((l) => this.setSceneCastShadow(l, !1)), e.shadowCastersLimited = !0), e.shadowCasterTiles.forEach((l) => {
      !a.has(l) && l?.engineData?.scene && this.setSceneCastShadow(l.engineData.scene, !1);
    }), a.forEach((l) => {
      e.shadowCasterTiles.has(l) || this.setSceneCastShadow(l.engineData.scene, !0);
    }), e.shadowCasterTiles = a, e.shadowCastersLimited = !0;
  }
  applyTriangleBudget(e, t = !1) {
    const i = this.getActiveTriangleBudget(e, t);
    if (!i || !this.renderer?.info?.render)
      return;
    const s = this.renderer.info.render.triangles;
    if (!Number.isFinite(s) || s <= 0)
      return;
    const { tileset: n, minErrorTarget: r, maxErrorTarget: o } = e, a = i * 1.08, l = i * 0.75;
    let d = n.errorTarget;
    s > a ? d = Math.min(o, d * 1.2 + 0.5) : s < l && (d = Math.max(r, d * 0.9)), t && e.vrErrorTargetFloor > 0 && (d = Math.max(d, e.vrErrorTargetFloor)), Math.abs(d - n.errorTarget) > 0.05 && (n.errorTarget = d);
  }
  createAdaptiveState(e, t, i, s) {
    if (t.adaptiveQuality === !1)
      return null;
    const n = typeof t.errorTarget == "number" && t.errorTarget > 0 ? t.errorTarget : typeof e.errorTarget == "number" && e.errorTarget > 0 ? e.errorTarget : 16, r = this.clamp(
      typeof t.adaptiveMovingErrorTarget == "number" ? t.adaptiveMovingErrorTarget : Math.max(n * 2, n + 7),
      i,
      s
    ), o = this.clamp(
      typeof t.adaptiveStillErrorTarget == "number" ? t.adaptiveStillErrorTarget : Math.max(i, n * 0.75),
      i,
      s
    ), a = typeof t.maxTilesProcessed == "number" && t.maxTilesProcessed > 0 ? t.maxTilesProcessed : typeof e.maxTilesProcessed == "number" && e.maxTilesProcessed > 0 ? e.maxTilesProcessed : 224, l = Math.max(8, Math.round(
      typeof t.adaptiveMinTilesProcessed == "number" ? t.adaptiveMinTilesProcessed : 24
    )), d = Math.max(l, Math.round(
      typeof t.adaptiveMaxTilesProcessed == "number" ? t.adaptiveMaxTilesProcessed : Math.max(a, 512)
    )), h = this.clamp(
      Math.round(
        typeof t.adaptiveMovingMaxTilesProcessed == "number" ? t.adaptiveMovingMaxTilesProcessed : a * 0.25
      ),
      l,
      d
    ), u = this.clamp(
      Math.round(
        typeof t.adaptiveStillMaxTilesProcessed == "number" ? t.adaptiveStillMaxTilesProcessed : a
      ),
      l,
      d
    ), A = this.clamp(
      typeof t.adaptiveFastMovingErrorTarget == "number" ? t.adaptiveFastMovingErrorTarget : Math.max(r * 1.35, r + 6),
      i,
      s
    ), p = this.clamp(
      Math.round(
        typeof t.adaptiveFastMovingMaxTilesProcessed == "number" ? t.adaptiveFastMovingMaxTilesProcessed : h * 0.4
      ),
      l,
      d
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
      movingErrorTarget: r,
      fastMovingErrorTarget: A,
      stillErrorTarget: o,
      minTilesProcessed: l,
      maxTilesProcessed: d,
      movingTilesProcessed: h,
      fastMovingTilesProcessed: p,
      stillTilesProcessed: u,
      lastSampleTimeMs: 0,
      lastMovementTimeMs: 0,
      lastPosition: new m.Vector3(),
      lastQuaternion: new m.Quaternion(),
      samplePosition: new m.Vector3(),
      sampleQuaternion: new m.Quaternion(),
      initialized: !1
    };
  }
  applyAdaptiveQuality(e, t, i = !1) {
    if (!e?.adaptive || !t)
      return;
    const { adaptive: s, tileset: n, minErrorTarget: r, maxErrorTarget: o } = e, a = performance.now();
    if (t.updateMatrixWorld?.(!0), t.getWorldPosition(s.samplePosition), t.getWorldQuaternion(s.sampleQuaternion), !s.initialized) {
      s.lastSampleTimeMs = a, s.lastMovementTimeMs = a, s.lastPosition.copy(s.samplePosition), s.lastQuaternion.copy(s.sampleQuaternion), s.initialized = !0;
      return;
    }
    const l = Math.max((a - s.lastSampleTimeMs) / 1e3, 1e-6), d = s.samplePosition.distanceTo(s.lastPosition), h = this.clamp(Math.abs(s.sampleQuaternion.dot(s.lastQuaternion)), -1, 1), u = 2 * Math.acos(h), A = d / l, p = u / l, f = A > s.linearSpeedThreshold, g = p > s.angularSpeedThreshold, b = A > s.fastLinearSpeedThreshold;
    (f || g) && (s.lastMovementTimeMs = a);
    const E = a - s.lastMovementTimeMs >= s.settleDelayMs;
    let C = s.stillErrorTarget, w = s.stillTilesProcessed;
    E || (b ? (C = s.fastMovingErrorTarget, w = s.fastMovingTilesProcessed) : (C = s.movingErrorTarget, w = s.movingTilesProcessed));
    const S = this.getActiveTriangleBudget(e, i);
    if (S && this.renderer?.info?.render) {
      const I = this.renderer.info.render.triangles;
      if (Number.isFinite(I) && I > 0) {
        const B = S * 1.08, M = S * 0.75;
        I > B ? (C = Math.max(C, C * 1.2 + 0.5), w = Math.max(s.minTilesProcessed, Math.round(w * 0.85))) : I < M && E && (C *= 0.92, w = Math.min(s.maxTilesProcessed, Math.round(w * 1.08)));
      }
    }
    i && e.vrErrorTargetFloor > 0 && (C = Math.max(C, e.vrErrorTargetFloor)), C = this.clamp(C, r, o), w = this.clamp(
      Math.round(w),
      s.minTilesProcessed,
      s.maxTilesProcessed
    );
    const v = n.errorTarget + (C - n.errorTarget) * s.errorLerp;
    Math.abs(v - n.errorTarget) > 0.04 && (n.errorTarget = v), typeof n.maxTilesProcessed == "number" && Math.abs(n.maxTilesProcessed - w) >= 1 && (n.maxTilesProcessed = w), s.lastSampleTimeMs = a, s.lastPosition.copy(s.samplePosition), s.lastQuaternion.copy(s.sampleQuaternion);
  }
  applyOptions(e, t) {
    if (!t)
      return;
    const {
      errorTarget: i,
      maxDepth: s,
      loadSiblings: n,
      loadAncestors: r,
      optimizedLoadStrategy: o,
      maxTilesProcessed: a,
      fetchOptions: l
    } = t;
    typeof i == "number" && (e.errorTarget = i), typeof s == "number" && (e.maxDepth = s), typeof n == "boolean" && (e.loadSiblings = n), typeof r == "boolean" ? e.loadAncestors = r : typeof o == "boolean" && (e.loadAncestors = !o), typeof a == "number" && (e.maxTilesProcessed = a), l && typeof l == "object" && (e.fetchOptions = l);
  }
  load(e, t = {}) {
    return new Promise((i, s) => {
      const n = new ch(e), r = oh(t);
      n.registerPlugin(new _c()), this.configureScheduling(n), this.applyOptions(n, t), this.configureGltfExtensions(n, {
        ...t,
        ktxWorkerLimit: r.ktxWorkerLimit
      });
      const o = new m.Group(), a = new m.Group(), l = new m.Group();
      o.add(a), a.add(l);
      const d = n.group;
      l.add(d), this.setUpAxis(l, t.up || "+Y");
      const h = {
        tileset: n,
        modelGroup: o,
        geoGroup: a,
        upGroup: l,
        tilesGroup: d,
        autoCenter: t.autoCenter !== !1,
        hasAutoCentered: !1,
        geospatialReorientationMode: this.resolveGeospatialReorientationMode(t.geospatialReorientation),
        hasGeospatialReoriented: !1,
        maxTriangles: typeof t.maxTriangles == "number" && t.maxTriangles > 0 ? t.maxTriangles : null,
        resolvedVRPerformanceProfile: r.resolvedVRPerformanceProfile,
        vrMaxTriangles: r.vrMaxTriangles,
        minErrorTarget: typeof t.minErrorTarget == "number" && t.minErrorTarget > 0 ? t.minErrorTarget : 2,
        maxErrorTarget: typeof t.maxErrorTarget == "number" && t.maxErrorTarget > 0 ? t.maxErrorTarget : 64,
        usePerEyeResolution: t.usePerEyeResolution !== !1,
        useDrawingBufferResolution: t.useDrawingBufferResolution !== !1,
        usePerEyeCameras: t.usePerEyeCameras === !0,
        tileCastShadow: t.tileCastShadow !== !1,
        tileReceiveShadow: t.tileReceiveShadow !== !1,
        tileLighting: t.tileLighting === "lambert" ? "lambert" : "standard",
        vrShadowCasterMode: r.vrShadowCasterMode,
        vrMaxShadowCastingTiles: r.vrMaxShadowCastingTiles,
        vrShadowCasterRadius: r.vrShadowCasterRadius,
        shadowCasterUpdateIntervalMs: typeof t.shadowCasterUpdateIntervalMs == "number" && t.shadowCasterUpdateIntervalMs >= 0 ? t.shadowCasterUpdateIntervalMs : 180,
        lastShadowCasterUpdateMs: 0,
        loadedTileScenes: /* @__PURE__ */ new Set(),
        shadowCasterTiles: /* @__PURE__ */ new Set(),
        shadowCastersLimited: !1,
        vrErrorTargetFloor: r.vrErrorTargetFloor,
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
          lastPos: new m.Vector3(),
          lastQuat: new m.Quaternion(),
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
      if (h.adaptive = this.createAdaptiveState(n, t, h.minErrorTarget, h.maxErrorTarget), this.camera) {
        const g = this.getResolutionConfig(h), b = this.syncTilesetTraversalCameras(n, this.camera, g);
        this.setResolutionForCamera(n, this.camera, b, g);
      }
      h.onLoadModel = (g) => {
        g?.scene && (this.normalizeTileModel(g.scene, h), h.loadedTileScenes.add(g.scene), h.shadowCastersLimited && this.setSceneCastShadow(g.scene, !1)), h.boundsDirty = !0;
      }, n.addEventListener("load-model", h.onLoadModel), h.onDisposeModel = (g) => {
        g?.scene && h.loadedTileScenes.delete(g.scene), g?.tile && h.shadowCasterTiles.delete(g.tile);
      }, n.addEventListener("dispose-model", h.onDisposeModel), h.onNeedsUpdate = () => {
        h.idle.forceUpdate = !0;
      }, n.addEventListener("needs-update", h.onNeedsUpdate);
      let u = null;
      const A = () => {
        n.removeEventListener("load-tileset", p), n.removeEventListener("load-error", f), u && t.signal && t.signal.removeEventListener("abort", u);
      }, p = () => {
        A(), this.applyGeospatialReorientation(h), this.updateBoundsAndCenter(h), this.activeTilesets.add(n), this.tilesetStates.set(n, h), i({ group: o, tileset: n });
      }, f = (g) => {
        A(), n.removeEventListener("load-model", h.onLoadModel), n.removeEventListener("dispose-model", h.onDisposeModel), n.removeEventListener("needs-update", h.onNeedsUpdate), n.dispose(), s(g?.error || new Error("Tileset failed to load"));
      };
      if (n.addEventListener("load-tileset", p), n.addEventListener("load-error", f), t.signal && (u = () => {
        A(), n.removeEventListener("load-model", h.onLoadModel), n.removeEventListener("dispose-model", h.onDisposeModel), n.removeEventListener("needs-update", h.onNeedsUpdate), n.dispose(), s(new Error("Loading cancelled"));
      }, t.signal.addEventListener("abort", u), t.signal.aborted)) {
        u();
        return;
      }
      n.update();
    });
  }
  _isTilesetBusy(e) {
    return !!(e.downloadQueue?.running || e.parseQueue?.running || e.processNodeQueue?.running || this.pendingQueueTasks.length > 0);
  }
  _shouldRunTilesUpdate(e, t, i) {
    const s = e.idle;
    if (!s || !s.enabled || s.forceUpdate || !s.initialized || this._isTilesetBusy(e.tileset) || i - s.lastRealUpdateMs >= s.heartbeatMs)
      return !0;
    if (!t)
      return !1;
    if (t.getWorldPosition(Hn), t.getWorldQuaternion(zn), Hn.distanceToSquared(s.lastPos) > s.posEps * s.posEps)
      return !0;
    const n = Math.min(1, Math.abs(zn.dot(s.lastQuat)));
    return 2 * Math.acos(n) > s.angEps;
  }
  _markTilesUpdateRan(e, t, i) {
    const s = e.idle;
    s && (t && (t.getWorldPosition(s.lastPos), t.getWorldQuaternion(s.lastQuat), s.initialized = !0), s.lastRealUpdateMs = i, s.forceUpdate = !1);
  }
  _syncCamerasIfNeeded(e, t, i) {
    const s = this.getResolutionConfig(t), n = s.usePerEyeCameras && i.isArrayCamera && Array.isArray(i.cameras) ? i.cameras : null;
    let r = t.syncedTopCamera !== i;
    if (!r) {
      const o = t.traversalCameras;
      if (n) {
        if (o.length !== n.length)
          r = !0;
        else
          for (let a = 0; a < n.length; a += 1)
            if (o[a] !== n[a]) {
              r = !0;
              break;
            }
      } else (o.length !== 1 || o[0] !== i) && (r = !0);
    }
    r && (t.traversalCameras = this.syncTilesetTraversalCameras(e, i, s), t.syncedTopCamera = i, t.lastResolutionWidth = -1, t.lastResolutionHeight = -1), this._syncResolutionIfNeeded(e, t, i, s);
  }
  _syncResolutionIfNeeded(e, t, i, s) {
    let n = 0, r = 0;
    if (s.usePerEyeResolution && s.usePerEyeCameras && i.isArrayCamera) {
      const o = t.traversalCameras[0]?.viewport;
      n = o?.z || 0, r = o?.w || 0;
    } else s.useDrawingBufferResolution && this.renderer?.getDrawingBufferSize && (this.renderer.getDrawingBufferSize(this._resolutionVec2), n = this._resolutionVec2.x, r = this._resolutionVec2.y);
    if (n > 0 && r > 0) {
      if (n === t.lastResolutionWidth && r === t.lastResolutionHeight)
        return;
      t.lastResolutionWidth = n, t.lastResolutionHeight = r;
    }
    this.setResolutionForCamera(e, i, t.traversalCameras, s);
  }
  _applyVRDepthClamp(e, t) {
    if (!e.vrMaxDepth) return;
    const i = e.tileset;
    t ? (e.desktopMaxDepth === null && (e.desktopMaxDepth = i.maxDepth), i.maxDepth = e.vrMaxDepth) : e.desktopMaxDepth !== null && (i.maxDepth = e.desktopMaxDepth, e.desktopMaxDepth = null);
  }
  _maybeUpdateBounds(e, t, i) {
    const s = this.isValidBox3(e.modelGroup?.userData?.boundingBox);
    i && s || s && t - e.lastBoundsUpdateMs < e.boundsUpdateIntervalMs || (this.updateBoundsAndCenter(e), e.lastBoundsUpdateMs = t, e.boundsDirty = !1);
  }
  update(e = null, t = {}) {
    const i = performance.now(), s = t?.queueOptions, n = t?.isXR === !0;
    this.runScheduledQueueTasks(s);
    const r = e || this.camera;
    r && r !== this.camera && this.setCamera(r), this.activeTilesets.forEach((a) => {
      const l = this.tilesetStates.get(a);
      if (!l) {
        a.update();
        return;
      }
      if (!this._shouldRunTilesUpdate(l, r, i)) {
        this.updateGatedCount += 1;
        return;
      }
      this.renderer && r && this._syncCamerasIfNeeded(a, l, r), l.adaptive ? this.applyAdaptiveQuality(l, r, n) : this.applyTriangleBudget(l, n), this._applyVRDepthClamp(l, n), a.update(), this.updateRunCount += 1, this._updateTileShadowCasters(l, r, i, n), this._markTilesUpdateRan(l, r, i), l.boundsDirty && this._maybeUpdateBounds(l, i, n);
    });
    const o = performance.now() - i;
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
class nt {
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
      let l = null;
      async function d(A) {
        A.addEventListener("end", h), await e.xr.setSession(A), i.textContent = "EXIT VR", l = A;
      }
      function h() {
        l.removeEventListener("end", h), i.textContent = "ENTER VR", l = null;
      }
      i.style.display = "", i.style.cursor = "pointer", i.style.left = "calc(50% - 50px)", i.style.width = "100px", i.textContent = "ENTER VR";
      const u = {
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
        l === null ? navigator.xr.requestSession("immersive-vr", u).then(d) : (l.end(), navigator.xr.offerSession !== void 0 && navigator.xr.offerSession("immersive-vr", u).then(d).catch((A) => {
          console.warn(A);
        }));
      }, navigator.xr.offerSession !== void 0 && navigator.xr.offerSession("immersive-vr", u).then(d).catch((A) => {
        console.warn(A);
      });
    }
    function n() {
      i.style.display = "", i.style.cursor = "auto", i.style.left = "calc(50% - 75px)", i.style.width = "150px", i.onmouseenter = null, i.onmouseleave = null, i.onclick = null;
    }
    function r() {
      n(), i.textContent = "VR NOT SUPPORTED";
    }
    function o(l) {
      n(), console.warn("Exception when trying to call xr.isSessionSupported", l), i.textContent = "VR NOT ALLOWED";
    }
    function a(l) {
      l.style.position = "absolute", l.style.bottom = "20px", l.style.padding = "12px 6px", l.style.border = "1px solid #fff", l.style.borderRadius = "4px", l.style.background = "rgba(0,0,0,0.1)", l.style.color = "#fff", l.style.font = "normal 13px sans-serif", l.style.textAlign = "center", l.style.opacity = "0.5", l.style.outline = "none", l.style.zIndex = "999";
    }
    if ("xr" in navigator)
      return i.id = "VRButton", i.style.display = "none", a(i), navigator.xr.isSessionSupported("immersive-vr").then(function(l) {
        l ? s() : r(), l && nt.xrSessionIsGranted && i.click();
      }).catch(o), i;
    {
      const l = document.createElement("a");
      return window.isSecureContext === !1 ? (l.href = document.location.href.replace(/^http:/, "https:"), l.innerHTML = "WEBXR NEEDS HTTPS") : (l.href = "https://immersiveweb.dev/", l.innerHTML = "WEBXR NOT AVAILABLE"), l.style.left = "calc(50% - 90px)", l.style.width = "180px", l.style.textDecoration = "none", a(l), l;
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
        nt.xrSessionIsGranted = !0;
      });
    }
  }
}
nt.xrSessionIsGranted = !1;
nt.registerSessionGrantedListener();
class dh {
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
          optionalFeatures: this.getOptionalFeatures()
        };
        this.vrButton = nt.createButton(this.renderer, e), this.vrButton.innerHTML = '<span class="vr-icon">🥽</span>ENTER VR', this.vrButton.className = "vr-button--glass vr-button-available", this.vrButton.disabled = !1, this.vrButton.style.cssText = `
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
      const i = e.requestSession && e.requestSession.toString();
      if (typeof i == "string" && !i.includes("[native code]"))
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
        const i = document.createElement("div");
        i.className = "vr-mode-active", i.style.display = "none", this.container.appendChild(i);
        const s = window.getComputedStyle(i), n = s.getPropertyValue("--vr-css-loaded") === "true" || s.opacity === "0.999";
        this.container.removeChild(i), n ? e() : setTimeout(t, 50);
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
            const n = s.querySelectorAll ? s.querySelectorAll('button.legacy-vr-button, a[href="#VR"]') : [];
            if (n.length > 0 || s.tagName === "BUTTON" && s.classList.contains("legacy-vr-button")) {
              const r = n.length > 0 ? n[0] : s;
              r.style.display = "none";
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
const H = {
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
async function ho(c) {
  const e = await fetch(c);
  if (e.ok)
    return e.json();
  throw new Error(e.statusText);
}
async function uh(c) {
  if (!c)
    throw new Error("No basePath supplied");
  return await ho(`${c}/profilesList.json`);
}
async function Ah(c, e, t = null, i = !0) {
  if (!c)
    throw new Error("No xrInputSource supplied");
  if (!e)
    throw new Error("No basePath supplied");
  const s = await uh(e);
  let n;
  if (c.profiles.some((a) => {
    const l = s[a];
    return l && (n = {
      profileId: a,
      profilePath: `${e}/${l.path}`,
      deprecated: !!l.deprecated
    }), !!n;
  }), !n) {
    if (!t)
      throw new Error("No matching profile name found");
    const a = s[t];
    if (!a)
      throw new Error(`No matching profile name found and default profile "${t}" missing.`);
    n = {
      profileId: t,
      profilePath: `${e}/${a.path}`,
      deprecated: !!a.deprecated
    };
  }
  const r = await ho(n.profilePath);
  let o;
  if (i) {
    let a;
    if (c.handedness === "any" ? a = r.layouts[Object.keys(r.layouts)[0]] : a = r.layouts[c.handedness], !a)
      throw new Error(
        `No matching handedness, ${c.handedness}, in profile ${n.profileId}`
      );
    a.assetPath && (o = n.profilePath.replace("profile.json", a.assetPath));
  }
  return { profile: r, assetPath: o };
}
const ph = {
  xAxis: 0,
  yAxis: 0,
  button: 0,
  state: H.ComponentState.DEFAULT
};
function fh(c = 0, e = 0) {
  let t = c, i = e;
  if (Math.sqrt(c * c + e * e) > 1) {
    const r = Math.atan2(e, c);
    t = Math.cos(r), i = Math.sin(r);
  }
  return {
    normalizedXAxis: t * 0.5 + 0.5,
    normalizedYAxis: i * 0.5 + 0.5
  };
}
class mh {
  constructor(e) {
    this.componentProperty = e.componentProperty, this.states = e.states, this.valueNodeName = e.valueNodeName, this.valueNodeProperty = e.valueNodeProperty, this.valueNodeProperty === H.VisualResponseProperty.TRANSFORM && (this.minNodeName = e.minNodeName, this.maxNodeName = e.maxNodeName), this.value = 0, this.updateFromComponent(ph);
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
    const { normalizedXAxis: n, normalizedYAxis: r } = fh(e, t);
    switch (this.componentProperty) {
      case H.ComponentProperty.X_AXIS:
        this.value = this.states.includes(s) ? n : 0.5;
        break;
      case H.ComponentProperty.Y_AXIS:
        this.value = this.states.includes(s) ? r : 0.5;
        break;
      case H.ComponentProperty.BUTTON:
        this.value = this.states.includes(s) ? i : 0;
        break;
      case H.ComponentProperty.STATE:
        this.valueNodeProperty === H.VisualResponseProperty.VISIBILITY ? this.value = this.states.includes(s) : this.value = this.states.includes(s) ? 1 : 0;
        break;
      default:
        throw new Error(`Unexpected visualResponse componentProperty ${this.componentProperty}`);
    }
  }
}
class gh {
  /**
   * @param {Object} componentId - Id of the component
   * @param {Object} componentDescription - Description of the component to be created
   */
  constructor(e, t) {
    if (!e || !t || !t.visualResponses || !t.gamepadIndices || Object.keys(t.gamepadIndices).length === 0)
      throw new Error("Invalid arguments supplied");
    this.id = e, this.type = t.type, this.rootNodeName = t.rootNodeName, this.touchPointNodeName = t.touchPointNodeName, this.visualResponses = {}, Object.keys(t.visualResponses).forEach((i) => {
      const s = new mh(t.visualResponses[i]);
      this.visualResponses[i] = s;
    }), this.gamepadIndices = Object.assign({}, t.gamepadIndices), this.values = {
      state: H.ComponentState.DEFAULT,
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
    if (this.values.state = H.ComponentState.DEFAULT, this.gamepadIndices.button !== void 0 && e.buttons.length > this.gamepadIndices.button) {
      const t = e.buttons[this.gamepadIndices.button];
      this.values.button = t.value, this.values.button = this.values.button < 0 ? 0 : this.values.button, this.values.button = this.values.button > 1 ? 1 : this.values.button, t.pressed || this.values.button === 1 ? this.values.state = H.ComponentState.PRESSED : (t.touched || this.values.button > H.ButtonTouchThreshold) && (this.values.state = H.ComponentState.TOUCHED);
    }
    this.gamepadIndices.xAxis !== void 0 && e.axes.length > this.gamepadIndices.xAxis && (this.values.xAxis = e.axes[this.gamepadIndices.xAxis], this.values.xAxis = this.values.xAxis < -1 ? -1 : this.values.xAxis, this.values.xAxis = this.values.xAxis > 1 ? 1 : this.values.xAxis, this.values.state === H.ComponentState.DEFAULT && Math.abs(this.values.xAxis) > H.AxisTouchThreshold && (this.values.state = H.ComponentState.TOUCHED)), this.gamepadIndices.yAxis !== void 0 && e.axes.length > this.gamepadIndices.yAxis && (this.values.yAxis = e.axes[this.gamepadIndices.yAxis], this.values.yAxis = this.values.yAxis < -1 ? -1 : this.values.yAxis, this.values.yAxis = this.values.yAxis > 1 ? 1 : this.values.yAxis, this.values.state === H.ComponentState.DEFAULT && Math.abs(this.values.yAxis) > H.AxisTouchThreshold && (this.values.state = H.ComponentState.TOUCHED)), Object.values(this.visualResponses).forEach((t) => {
      t.updateFromComponent(this.values);
    });
  }
}
class bh {
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
      const n = this.layoutDescription.components[s];
      this.components[s] = new gh(s, n);
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
const yh = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles", Ch = "generic-trigger";
class Eh extends ui {
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
        const { valueNode: s, minNode: n, maxNode: r, value: o, valueNodeProperty: a } = i;
        s && (a === H.VisualResponseProperty.VISIBILITY ? s.visible = o : a === H.VisualResponseProperty.TRANSFORM && (s.quaternion.slerpQuaternions(
          n.quaternion,
          r.quaternion,
          o
        ), s.position.lerpVectors(
          n.position,
          r.position,
          o
        )));
      });
    }));
  }
}
function wh(c, e) {
  Object.values(c.components).forEach((t) => {
    const { type: i, touchPointNodeName: s, visualResponses: n } = t;
    if (i === H.ComponentType.TOUCHPAD)
      if (t.touchPointNode = e.getObjectByName(s), t.touchPointNode) {
        const r = new yr(1e-3), o = new Ve({ color: 255 }), a = new fi(r, o);
        t.touchPointNode.add(a);
      } else
        console.warn(`Could not find touch dot, ${t.touchPointNodeName}, in touchpad component ${t.id}`);
    Object.values(n).forEach((r) => {
      const { valueNodeName: o, minNodeName: a, maxNodeName: l, valueNodeProperty: d } = r;
      if (d === H.VisualResponseProperty.TRANSFORM) {
        if (r.minNode = e.getObjectByName(a), r.maxNode = e.getObjectByName(l), !r.minNode) {
          console.warn(`Could not find ${a} in the model`);
          return;
        }
        if (!r.maxNode) {
          console.warn(`Could not find ${l} in the model`);
          return;
        }
      }
      r.valueNode = e.getObjectByName(o), r.valueNode || console.warn(`Could not find ${o} in the model`);
    });
  });
}
function qn(c, e) {
  wh(c.motionController, e), c.envMap && e.traverse((t) => {
    t.isMesh && (t.material.envMap = c.envMap, t.material.needsUpdate = !0);
  }), c.add(e);
}
class vh {
  /**
   * Constructs a new XR controller model factory.
   *
   * @param {?GLTFLoader} [gltfLoader=null] - A glTF loader that is used to load controller models.
   * @param {?Function} [onLoad=null] - A callback that is executed when a controller model has been loaded.
   */
  constructor(e = null, t = null) {
    this.gltfLoader = e, this.path = yh, this._assetCache = {}, this.onLoad = t, this.gltfLoader || (this.gltfLoader = new qe());
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
    const t = new Eh();
    let i = null;
    return e.addEventListener("connected", (s) => {
      const n = s.data;
      n.targetRayMode !== "tracked-pointer" || !n.gamepad || n.hand || Ah(n, this.path, Ch).then(({ profile: r, assetPath: o }) => {
        t.motionController = new bh(
          n,
          r,
          o
        );
        const a = this._assetCache[t.motionController.assetUrl];
        if (a)
          i = a.scene.clone(), qn(t, i), this.onLoad && this.onLoad(i);
        else {
          if (!this.gltfLoader)
            throw new Error("GLTFLoader not set.");
          this.gltfLoader.setPath(""), this.gltfLoader.load(
            t.motionController.assetUrl,
            (l) => {
              this._assetCache[t.motionController.assetUrl] = l, i = l.scene.clone(), qn(t, i), this.onLoad && this.onLoad(i);
            },
            null,
            () => {
              throw new Error(`Asset ${t.motionController.assetUrl} missing or malformed.`);
            }
          );
        }
      }).catch((r) => {
        console.warn(r);
      });
    }), e.addEventListener("disconnected", () => {
      t.motionController = null, t.remove(i), i = null;
    }), t;
  }
}
class Sh {
  constructor(e, t, i = {}) {
    this.renderer = e, this.camera = t, this.assetPaths = bi(i), this.controller1 = null, this.controller2 = null, this.controllerGrip1 = null, this.controllerGrip2 = null, this.controllers = [], this.controllerGrips = [], this.buttonStates = /* @__PURE__ */ new Map(), this.inputDeadzone = 0.15, this.turnSmoothingFactor = 0.1, this.lastTurnInput = 0, this.onSelectStart = null, this.onSelectEnd = null, this.onSqueezeStart = null, this.onSqueezeEnd = null, this.onModeToggle = null, this.onMovementStart = null, this.onMovementStop = null, this.handsActive = !1, this.handStates = {
      left: { pinch: !1, fist: !1, direction: new m.Vector3() },
      right: { pinch: !1, fist: !1, direction: new m.Vector3() }
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
    for (const i of e.inputSources)
      i.hand && (t = !0);
    this.handsActive = t;
  }
  updateHandGestures() {
    const e = this.renderer.xr.getSession && this.renderer.xr.getSession();
    if (e) {
      for (const t of e.inputSources)
        if (t.hand && t.handedness) {
          const i = t.handedness, s = t.hand.get("thumb-tip"), n = t.hand.get("index-finger-tip");
          if (!s || !n || !s.transform || !n.transform)
            this.handStates[i].pinch = !1;
          else {
            const a = new m.Vector3().setFromMatrixPosition(new m.Matrix4().fromArray(s.transform.matrix)), l = new m.Vector3().setFromMatrixPosition(new m.Matrix4().fromArray(n.transform.matrix)), d = a.distanceTo(l);
            this.handStates[i].pinch = d < 0.025;
          }
          let r = !0;
          const o = t.hand.get("wrist");
          if (o && o.transform) {
            const a = new m.Vector3().setFromMatrixPosition(new m.Matrix4().fromArray(o.transform.matrix));
            for (const l of ["index-finger-tip", "middle-finger-tip", "ring-finger-tip", "pinky-finger-tip"]) {
              const d = t.hand.get(l);
              if (!d || !d.transform) {
                r = !1;
                continue;
              }
              new m.Vector3().setFromMatrixPosition(new m.Matrix4().fromArray(d.transform.matrix)).distanceTo(a) > 0.045 && (r = !1);
            }
          } else
            r = !1;
          if (this.handStates[i].fist = r, n && o && n.transform && o.transform) {
            const a = new m.Vector3().setFromMatrixPosition(new m.Matrix4().fromArray(o.transform.matrix)), l = new m.Vector3().setFromMatrixPosition(new m.Matrix4().fromArray(n.transform.matrix));
            this.handStates[i].direction = new m.Vector3().subVectors(l, a).normalize();
          }
        }
    }
  }
  initControllers() {
    const e = new vh();
    e.setPath(this.assetPaths.webxrInputProfilesPath);
    for (let t = 0; t < 2; t++) {
      const i = this.renderer.xr.getController(t), s = this.renderer.xr.getControllerGrip(t);
      s.add(e.createControllerModel(s)), this.camera.parent.add(i), this.camera.parent.add(s), this.controllers.push(i), this.controllerGrips.push(s);
    }
    this.setupControllerEvents();
  }
  setupControllerEvents() {
    this.controllers.forEach((e, t) => {
      e.addEventListener("connected", (i) => {
        const { handedness: s, targetRayMode: n, profiles: r } = i.data, o = Array.isArray(r) && r.some((a) => a && a.toLowerCase().includes("hand"));
        n !== "tracked-pointer" || o || (s === "left" ? (this.controller1 = e, this.controllerGrip1 = this.controllerGrips[t]) : s === "right" && (this.controller2 = e, this.controllerGrip2 = this.controllerGrips[t]), e.userData.handedness = s, e.userData.initialised = !0);
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
    const e = this.getInputSources();
    if (!(!e || e.length === 0)) {
      for (const t of e)
        if (t.gamepad && t.handedness) {
          const i = t.gamepad, s = t.handedness, n = `debug-${s}`;
          this.buttonStates.get(n) || this.buttonStates.set(n, !0);
          let r = [];
          s === "left" ? r = [4, 5] : s === "right" && (r = [4, 5]), r.forEach((o) => {
            if (i.buttons[o]) {
              const a = i.buttons[o], l = `${s}-${o}`, d = this.buttonStates.get(l) || !1, h = a.pressed;
              h && !d && this.onModeToggle && this.onModeToggle(), this.buttonStates.set(l, h);
            }
          });
        }
    }
  }
  getControllerInput() {
    const e = this.getInputSources();
    if (!e || e.length === 0) return { movement: null, teleport: null };
    let t = null, i = null;
    for (const s of e)
      if (s.gamepad && s.handedness) {
        const n = s.gamepad, r = s.handedness;
        if (n.axes.length >= 4) {
          const o = n.axes[2] || 0, a = n.axes[3] || 0, l = n.axes[0] || 0, d = n.axes[1] || 0, h = Math.abs(o) > this.inputDeadzone ? o : 0, u = Math.abs(a) > this.inputDeadzone ? a : 0, A = Math.abs(l) > this.inputDeadzone ? l : 0, p = Math.abs(d) > this.inputDeadzone ? d : 0;
          r === "left" ? (h !== 0 || u !== 0) && (t = {
            x: h,
            y: u,
            handedness: "left"
          }) : r === "right" && (A !== 0 || p !== 0) && (i = {
            x: A,
            y: p,
            handedness: "right"
          });
        }
      }
    return { movement: t, teleport: i };
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
    let i = 0;
    for (const s of e) {
      if (!s || !s.buttons || !s.axes) continue;
      const n = this._resolveHandedness(s, i);
      if (!n) {
        i += 1;
        continue;
      }
      t.push({ gamepad: s, handedness: n }), i += 1;
    }
    return t;
  }
  _resolveHandedness(e, t) {
    const i = (e.hand || "").toLowerCase();
    if (i === "left" || i === "right") return i;
    const s = (e.id || "").toLowerCase();
    return s.includes("left") ? "left" : s.includes("right") ? "right" : this._fallbackHandedness.has(e.index) ? this._fallbackHandedness.get(e.index) : t === 0 ? (this._fallbackHandedness.set(e.index, "left"), "left") : t === 1 ? (this._fallbackHandedness.set(e.index, "right"), "right") : null;
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
class Mh {
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
      new m.Vector3(0, 0, 0),
      new m.Vector3(0, 1, -5)
    ], t = new m.CatmullRomCurve3(e), i = new m.TubeGeometry(t, 20, 0.03, 8, !1), s = new m.MeshBasicMaterial({
      color: this.style.accentColor,
      transparent: !0,
      opacity: 0.62,
      side: m.DoubleSide
    });
    if (this.teleportCurve = new m.Mesh(i, s), this.teleportCurve.visible = !1, this.scene.add(this.teleportCurve), !this.teleportMarker) {
      const n = new m.RingGeometry(0.34, 0.5, 28), r = new m.MeshBasicMaterial({
        color: this.style.neutralColor,
        transparent: !0,
        opacity: 0.78,
        side: m.DoubleSide
      });
      this.teleportMarker = new m.Mesh(n, r), this.teleportMarker.rotation.x = -Math.PI / 2, this.teleportMarker.visible = !1, this.scene.add(this.teleportMarker);
    }
    if (!this.teleportArch) {
      const o = 0.07999999999999999, a = 0.34 + o, l = [];
      for (let A = 0; A <= 24; A++) {
        const p = A / 24 * Math.PI;
        l.push(new m.Vector3(
          Math.cos(p) * a,
          Math.sin(p) * a,
          0
        ));
      }
      const d = new m.CatmullRomCurve3(l), h = new m.TubeGeometry(d, 24, o, 8, !1), u = new m.MeshBasicMaterial({
        color: this.style.accentColor,
        transparent: !0,
        opacity: 0.24,
        side: m.DoubleSide,
        depthWrite: !1
      });
      this.teleportArch = new m.Mesh(h, u), this.teleportArch.visible = !1, this.scene.add(this.teleportArch);
    }
    if (!this.teleportFloor) {
      const n = new m.PlaneGeometry(14, 14), r = new m.MeshBasicMaterial({
        color: this.style.floorColor,
        transparent: !0,
        opacity: 0.06,
        side: m.DoubleSide,
        visible: !1
      });
      this.teleportFloor = new m.Mesh(n, r), this.teleportFloor.rotation.x = -Math.PI / 2, this.teleportFloor.visible = !1, this.scene.add(this.teleportFloor);
    }
  }
  executeTeleport() {
    if (!this.validTeleportPosition) return;
    const e = this.validTeleportPosition.clone();
    this.camera.parent.position.copy(e), this.onTeleport && this.onTeleport(e), this.validTeleportPosition = null;
  }
  dashToPosition(e) {
    const t = this.camera.parent.position.clone(), i = t.distanceTo(e), s = Math.min(i * 0.2, 1);
    let n = 0;
    const r = () => {
      n += 1 / 60;
      const o = Math.min(n / s, 1), a = 1 - Math.pow(1 - o, 3);
      this.camera.parent.position.lerpVectors(t, e, a), o < 1 && requestAnimationFrame(r);
    };
    r();
  }
  processSnapTurn(e, t = 30) {
    if (this.teleportPressed) return;
    this.lastSnapTurnTime || (this.lastSnapTurnTime = 0);
    const i = Date.now();
    if (!(i - this.lastSnapTurnTime < 500) && Math.abs(e) > 0.7) {
      const s = t * Math.PI / 180, n = e > 0 ? 1 : -1;
      this.camera.parent.rotation.y -= n * s, this.camera.parent.rotation.y = this.normalizeAngle(this.camera.parent.rotation.y), this.lastSnapTurnTime = i;
    }
  }
  normalizeAngle(e) {
    for (; e > Math.PI; ) e -= 2 * Math.PI;
    for (; e < -Math.PI; ) e += 2 * Math.PI;
    return e;
  }
  processTeleportation(e, t) {
    const i = Math.abs(t);
    if (i > this.teleportThreshold && !this.teleportPressed) {
      this.teleportPressed = !0, this.teleportMaxMagnitude = i, this.teleportController = e;
      const s = this.camera.parent.position.y;
      this.teleportFloorHeight = s, this.teleportFloorMin = s - 10, this.teleportFloorMax = s + 10, this.showTeleportArc(), this.onTeleportStart && this.onTeleportStart();
    } else this.teleportPressed && (this.teleportMaxMagnitude = Math.max(this.teleportMaxMagnitude, i), this.updateTeleportArc(), i < this.teleportReleaseThreshold && (this.calculateAndExecuteTeleport(), this.hideTeleportArc(), this.teleportPressed = !1, this.teleportMaxMagnitude = 0, this.teleportController = null, this.onTeleportEnd && this.onTeleportEnd()));
  }
  showTeleportArc() {
    this.teleportCurve || this.createTeleportArc(), this.teleportCurve.visible = !0, this.teleportMarker && (this.teleportMarker.visible = !1), this.teleportArch && (this.teleportArch.visible = !1), this.updateTeleportFloor();
  }
  hideTeleportArc() {
    this.teleportCurve && (this.teleportCurve.visible = !1), this.teleportMarker && (this.teleportMarker.visible = !1), this.teleportArch && (this.teleportArch.visible = !1), this.teleportFloor && (this.teleportFloor.visible = !1), this.currentTeleportTarget = null;
  }
  updateTeleportArc() {
    if (!this.teleportController || !this.teleportCurve) return;
    const e = new m.Quaternion();
    this.teleportController.getWorldQuaternion(e);
    const t = new m.Vector3(0, 0, -1);
    t.applyQuaternion(e);
    const i = new m.Vector3();
    this.teleportController.getWorldPosition(i), i.addScaledVector(t, 0.07);
    const s = Math.sqrt(t.x * t.x + t.z * t.z);
    if (s < 0.12 && t.y > 0) {
      const M = new m.Vector3();
      if (this.camera.getWorldDirection(M), M.y = 0, M.lengthSq() > 0) {
        M.normalize();
        const x = 0.12 - s;
        t.x += M.x * x, t.z += M.z * x, t.normalize();
      }
    }
    const n = this.teleportMaxDistance, r = Math.min(this.teleportMaxMagnitude / this.teleportThreshold, 1), o = Math.pow(r, 0.78), a = n * o, l = [], d = 32, h = -9.8, u = this.teleportFloorHeight, A = u - i.y;
    let p = Math.sqrt(a * Math.abs(h) / 2);
    t.y < 0 && (p *= Math.max(0.25, 1 - Math.abs(t.y) * 0.75));
    const f = t.x * p, g = t.z * p;
    let b = (t.y + 0.15) * p;
    if (A > 0.5) {
      const M = Math.sqrt(2 * Math.abs(h) * A) * 1.2;
      b = Math.max(b, M);
    }
    const y = b / Math.abs(h), E = 0.4 + (1 - Math.max(0, -t.y)) * 1.1, C = Math.max(y * 2.2, E);
    let w = null, S = !1, v = i.y, I = 0;
    const B = Math.max(8, Math.abs(A) * 1.5 + 2);
    for (let M = 0; M <= d; M++) {
      const x = M / d * C, Q = new m.Vector3(
        i.x + f * x,
        i.y + b * x + 0.5 * h * x * x,
        i.z + g * x
      );
      Math.abs(Q.y - i.y) > B && (Q.y = i.y + Math.sign(Q.y - i.y) * B), !S && Q.y < v && (S = !0, I = x), l.push(Q);
      const P = S ? x - I : 0, T = S && P > 0.1;
      if (!w && T && Q.y <= u) {
        if (M > 0) {
          const L = l[M - 1], _ = (u - L.y) / (Q.y - L.y);
          w = new m.Vector3().lerpVectors(L, Q, _), w.y = u;
        } else
          w = Q.clone(), w.y = u;
        l[M] = w, l.length = M + 1;
        break;
      }
      v = Q.y;
      const U = Math.sqrt(
        Math.pow(Q.x - i.x, 2) + Math.pow(Q.z - i.z, 2)
      );
      if (T && U > n) {
        if (M > 0) {
          const L = l[M - 1], _ = Math.sqrt(
            Math.pow(L.x - i.x, 2) + Math.pow(L.z - i.z, 2)
          ), F = U > _ ? (n - _) / (U - _) : 0.5;
          w = new m.Vector3(
            L.x + (Q.x - L.x) * F,
            u,
            L.z + (Q.z - L.z) * F
          ), l[M] = w, l.length = M + 1;
        }
        break;
      }
    }
    if (!w && l.length > 0) {
      let M = l[0], x = 0;
      for (let Q = 1; Q < l.length; Q++)
        l[Q].y < M.y && (M = l[Q], x = Q);
      x > l.length / 3 && (w = new m.Vector3(M.x, u, M.z), l.length = x + 1, l[x] = w);
    }
    if (l.length > 1) {
      const M = new m.CatmullRomCurve3(l, !1, "centripetal"), x = new m.TubeGeometry(M, 20, 0.012, 6, !1);
      this.teleportCurve.geometry && this.teleportCurve.geometry.dispose(), this.teleportCurve.geometry = x;
    }
    if (this.currentTeleportTarget = w ? w.clone() : null, this.teleportMarker && (w ? (this.teleportMarker.position.copy(w), this.teleportMarker.rotation.set(-Math.PI / 2, 0, 0), this.teleportMarker.material.opacity = 0.78, this.teleportMarker.material.color.setHex(this.style.neutralColor), this.teleportMarker.visible = !0) : this.teleportMarker.visible = !1), this.teleportArch)
      if (w) {
        this.teleportArch.position.copy(w);
        const M = new m.Vector3();
        this.camera.getWorldPosition(M);
        const x = new m.Vector3(
          M.x,
          w.y,
          M.z
        );
        this.teleportArch.lookAt(x);
        const Q = M.distanceTo(w), P = m.MathUtils.clamp((Q - 2.5) / 7.5, 0, 1);
        this.teleportArch.material.opacity = 0.24 * P, this.teleportArch.visible = P > 0.01;
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
        const s = new m.Vector3(e.x, this.teleportFloorHeight, e.z);
        this.validTeleportPosition = s, this.executeTeleport(), this.teleportFloorHeight = null, this.currentTeleportTarget = null;
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
class Ih {
  constructor(e, t) {
    this.camera = e, this.renderer = t, this.MOVE_SPEED = 2, this.TURN_SPEED = 1.5, this.FLY_SPEED = 1, this.currentSpeed = 0, this.targetSpeed = 0, this.currentBoostLevel = 0, this.targetBoostLevel = 0, this.SPEED_RAMP_RATE = 3, this.BOOST_RAMP_RATE = 6, this.handMoveActive = !1, this.handMoveBoost = !1, this.handMoveDirection = new m.Vector3(), this.isMoving = !1, this.inputDeadzone = 0.15, this.turnSmoothingFactor = 0.1, this.lastTurnInput = 0, this.comfortSettings = {
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
    const i = this.renderer.xr.getSession && this.renderer.xr.getSession();
    if (i && i.visibilityState !== "visible")
      return;
    const s = t?.inputSources || (i ? Array.from(i.inputSources || []) : []);
    if (!s || s.length === 0)
      return;
    if (i && t.updateHandGestures && t.handsActive) {
      t.updateHandGestures();
      let A = null;
      const p = new m.Vector3();
      let f = !1;
      for (const g of ["left", "right"])
        if (t.handStates[g].pinch) {
          A = g, p.copy(t.handStates[g].direction), f = t.handStates[g].fist;
          break;
        }
      if (A) {
        this.handMoveActive = !0, this.handMoveBoost = f, this.handMoveDirection.copy(p);
        const g = this.camera.parent || this.camera, b = this.MOVE_SPEED * (f ? 3 : 1) * e;
        g.position.addScaledVector(p, b), this.isMoving = !0, this.onMovementStart && !this._wasMoving && this.onMovementStart(), this.onMovementUpdate && this.onMovementUpdate({
          isMoving: !0,
          currentSpeed: this.MOVE_SPEED,
          isBoosted: f,
          currentBoostLevel: f ? 1 : 0
        }), this._wasMoving = !0;
        return;
      } else
        this.handMoveActive && this.onMovementStop && this.onMovementStop(), this.handMoveActive = !1, this.isMoving = !1, this._wasMoving = !1;
    }
    const n = this.camera.parent || this.camera;
    let r = !1, o = !1;
    for (let A = 0; A < s.length; A++) {
      const p = s[A];
      if (!p || !p.gamepad || !p.gamepad.buttons || !p.gamepad.axes || p.gamepad.axes.length < 4)
        continue;
      const f = p.gamepad, b = p.handedness === "left" ? t.controller1 : t.controller2;
      if (!b) continue;
      const y = f.axes[2] || 0, E = f.axes[3] || 0, C = this.comfortSettings.locomotionMode === "teleport" && this.teleportSystem && b, w = this.teleportSystem && this.teleportSystem.teleportPressed, S = w && this.teleportSystem.teleportController === b, v = w && !S;
      if (p.handedness === "left") {
        const I = f.buttons[1], B = I && I.pressed ? 3 : 1, M = this.comfortSettings.reducedMotion ? this.comfortSettings.comfortSpeed : 1;
        if (I && I.pressed && (o = !0), C && (S || !w)) {
          this.teleportSystem.processTeleportation(b, E), this.comfortSettings.turningMode === "snap" && this.teleportSystem.processSnapTurn(y, this.comfortSettings.snapTurnAngle);
          continue;
        } else if (v)
          Math.abs(E) > 0.1 && this.teleportSystem.adjustFloorHeight(-E * (4 * e));
        else {
          const x = new m.Vector3();
          this.camera.getWorldDirection(x), x.y = 0, x.normalize();
          const Q = new m.Vector3().crossVectors(x, this.camera.up).normalize();
          if (Math.abs(E) > 0.1) {
            const P = this.MOVE_SPEED * B * M * this.currentSpeed * e;
            n.position.addScaledVector(x, -E * P), r = !0;
          }
          if (Math.abs(y) > 0.1) {
            const P = this.MOVE_SPEED * B * M * this.currentSpeed * e;
            n.position.addScaledVector(Q, y * P), r = !0;
          }
        }
      }
      if (p.handedness === "right") {
        const I = f.buttons[1], B = I && I.pressed ? 3 : 1, M = this.comfortSettings.reducedMotion ? this.comfortSettings.comfortSpeed : 1;
        if (I && I.pressed && Math.abs(E) > 0.1 && (o = !0), C && (S || !w)) {
          this.teleportSystem.processTeleportation(b, E), this.comfortSettings.turningMode === "snap" && this.teleportSystem.processSnapTurn(y, this.comfortSettings.snapTurnAngle);
          continue;
        } else if (v)
          Math.abs(E) > 0.1 && this.teleportSystem.adjustFloorHeight(-E * (4 * e));
        else {
          if (this.comfortSettings.turningMode === "snap" && this.teleportSystem)
            this.teleportSystem.processSnapTurn(y, this.comfortSettings.snapTurnAngle);
          else if (Math.abs(y) > this.inputDeadzone) {
            const x = this.lastTurnInput * this.turnSmoothingFactor + y * (1 - this.turnSmoothingFactor);
            if (this.lastTurnInput = x, Math.abs(x) > this.inputDeadzone) {
              const Q = this.comfortSettings.reducedMotion ? this.TURN_SPEED * 0.5 : this.TURN_SPEED, P = x * Q * Math.min(e, 1 / 30);
              n.rotation.y -= P, n.rotation.y = this.normalizeAngle(n.rotation.y);
            }
          } else
            this.lastTurnInput *= 0.9;
          if (Math.abs(E) > 0.1 && this.comfortSettings.locomotionMode !== "teleport") {
            const x = this.FLY_SPEED * B * M * this.currentSpeed * e;
            n.position.y -= E * x, r = !0;
          }
        }
      }
    }
    const a = this.isMoving;
    this.isMoving = r;
    const d = (this.isMoving ? this.MOVE_SPEED : 0) - this.currentSpeed;
    this.currentSpeed += d * this.SPEED_RAMP_RATE * e, this.currentSpeed = Math.max(0, this.currentSpeed);
    const u = (o ? 1 : 0) - this.currentBoostLevel;
    this.currentBoostLevel += u * this.BOOST_RAMP_RATE * e, this.currentBoostLevel = Math.max(0, Math.min(1, this.currentBoostLevel)), !a && this.isMoving && this.onMovementStart && this.onMovementStart(), a && !this.isMoving && this.onMovementStop && this.onMovementStop(), this.onMovementUpdate && this.onMovementUpdate({
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
class Bh {
  constructor() {
    this.soundEnabled = !1, this.audioContext = null, this._basePath = "./sound/", this.dpvSound = null, this.dpvHighSound = null, this.ambienceSound = null, this.currentMovementSound = null, this.currentBoostSound = null, this.currentAmbienceSound = null, this.baseGainNode = null, this.boostGainNode = null, this.ambienceGainNode = null, this.baseVolumeMultiplier = 1.52, this.boostVolumeMultiplier = 1.01, this.ambienceVolume = 0.1;
  }
  async init(e = "./sound/") {
    try {
      this._basePath = e || this._basePath, this.audioContext || (this.audioContext = new (window.AudioContext || window.webkitAudioContext)());
      const [t, i, s] = await Promise.all([
        this.loadAudioBuffer(this._basePath + "dpv.ogg"),
        this.loadAudioBuffer(this._basePath + "dpvhigh.ogg"),
        this.loadAudioBuffer(this._basePath + "vrambience.ogg")
      ]);
      this.dpvSound = t, this.dpvHighSound = i, this.ambienceSound = s, this.soundEnabled = !0;
    } catch (t) {
      console.warn("🔇 VR Audio initialization failed:", t), this.soundEnabled = !1;
    }
  }
  async loadAudioBuffer(e) {
    const i = await (await fetch(e)).arrayBuffer();
    return await this.audioContext.decodeAudioData(i);
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
        const i = e * this.baseVolumeMultiplier, s = t * this.boostVolumeMultiplier;
        this.baseGainNode.gain.linearRampToValueAtTime(i, this.audioContext.currentTime + 0.1), this.boostGainNode.gain.linearRampToValueAtTime(s, this.audioContext.currentTime + 0.1);
      } catch (i) {
        console.warn("🔇 Error updating audio levels:", i);
      }
  }
  setVolumeMultipliers(e, t, i) {
    typeof e == "number" && e >= 0 && (this.baseVolumeMultiplier = e), typeof t == "number" && t >= 0 && (this.boostVolumeMultiplier = t), typeof i == "number" && i >= 0 && (this.ambienceVolume = i, this.ambienceGainNode && this.ambienceGainNode.gain.setValueAtTime(i, this.audioContext.currentTime));
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
class xh {
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
  constructor(e, t, i, s = "./sound/", n = !1, r = null, o = {}) {
    this.renderer = e, this.camera = t, this.scene = i, this.audioPath = s, this.enableAudio = n, this.container = r, this.vrCore = new dh(e, t, i, r), this.vrControllers = new Sh(e, t, o), this.vrTeleport = new Mh(i, t), this.vrLocomotion = new Ih(t, e), this.vrAudio = this.enableAudio ? new Bh() : null, this.isVRSupported = !1, this.isVRPresenting = !1, this.controller1 = null, this.controller2 = null, this.controllerGrip1 = null, this.controllerGrip2 = null, this.controllers = [], this.controllerGrips = [], this._preVRCameraState = {
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
    const t = this.isComfortModeEnabled(), i = this.vrLocomotion.setComfortPreset(e);
    if (i && typeof this.onComfortModeChange == "function") {
      const s = this.isComfortModeEnabled();
      this.onComfortModeChange({
        enabled: s,
        changed: s !== t,
        preset: s ? "comfort" : "free",
        inVR: this.isVRPresenting,
        settings: this.getComfortSettings()
      });
    }
    return i;
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
        const t = e.vr || e, i = this.camera?.parent;
        if (!t || !i)
          return;
        t.camera?.position && this.camera.position.copy(t.camera.position), t.camera?.quaternion && this.camera.quaternion.copy(t.camera.quaternion), t.dolly?.position ? i.position.copy(t.dolly.position) : Number.isFinite(t.dolly?.x) && Number.isFinite(t.dolly?.y) && Number.isFinite(t.dolly?.z) && i.position.set(t.dolly.x, t.dolly.y, t.dolly.z), t.dolly?.quaternion ? i.quaternion.copy(t.dolly.quaternion) : Number.isFinite(t.rotation?.x) && Number.isFinite(t.rotation?.y) && Number.isFinite(t.rotation?.z) && i.rotation.set(t.rotation.x, t.rotation.y, t.rotation.z);
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
    const e = this.vrCore.getVRStatus(), t = this.vrAudio ? this.vrAudio.getAudioStatus() : { enabled: !1 }, i = this.vrLocomotion.getMovementState(), s = this.vrLocomotion.getComfortSettings();
    return {
      ...e,
      audio: t,
      movement: i,
      comfort: s
    };
  }
  setAudioMuted(e) {
    this.vrAudio && this.vrAudio.setMuted(e);
  }
  setAudioVolumeMultipliers(e, t, i) {
    this.vrAudio && this.vrAudio.setVolumeMultipliers(e, t, i);
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
class Th {
  constructor(e, t, i, s = null) {
    this.renderer = e, this.camera = t, this.scene = i, this.container = s || document.body, this.isARSupported = !1, this.isARPresenting = !1, this.isQuest2 = !1, this.isQuest3 = !1, this.arButton = null, this.buttonObserver = null, this.onSessionStart = null, this.onSessionEnd = null, this.onSessionPause = null, this.onSessionResume = null, this.activeSession = null, this.sessionVisibilityHandler = null, this.sessionInit = null, this.sessionRequestPromise = null, this.sessionRequestGeneration = 0, this.sessionRequestTimeoutId = null, this.sessionVisibilityState = "none", this.sessionHiddenAt = 0, this.sessionResumedAt = 0, this.lastHiddenDurationMs = 0, this.failedResumeRecoveryTimer = null, this.longHiddenRecoveryTimer = null, this.sessionFrameHeartbeatId = null, this.sessionFrameWatchInterval = null, this.sessionFrameValidationTimer = null, this.lastSessionFrameAt = 0, this.sessionOfferPromise = null, this.recoverySuggested = !1, this.endingFailedResume = !1, this.failedResumeWindowMs = 2500, this.failedResumeMinHiddenMs = 1e3, this.failedResumeValidationMs = 500, this.longHiddenRecoveryMs = 12e3, this.frameStallRecoveryMs = 12e3, this.frameStallValidationMs = 1e3, this.frameStallPollMs = 1e3, this.sessionRequestTimeoutMs = 12e3, this.isDisposed = !1;
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
      this.sessionInit = {
        requiredFeatures: ["local"],
        optionalFeatures: this.getOptionalFeatures()
      }, this.arButton = document.createElement("button"), this.arButton.id = "ARButton", this.arButton.type = "button", this.arButton.className = "ar-button--glass ar-button-available", this.arButton.dataset.belowjsArButton = "true", this.arButton.addEventListener("click", () => {
        this.activeSession ? (this.recoverySuggested = !1, this.endingFailedResume = !1, this.activeSession.end().catch((e) => {
          console.warn("Unable to end AR session", e);
        })) : (this.recoverySuggested = !1, this.requestARSession());
      }), this.arButton.style.cssText = `
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
      `, this.container.appendChild(this.arButton), this.updateARButtonState(), this.styleARButton(), this.offerARSession();
    });
  }
  getOptionalFeatures() {
    return ["hand-tracking"];
  }
  styleARButton() {
    const e = () => {
      const t = document.querySelector("button.ar-button--glass") || this.arButton;
      return t ? (t.style.display = "flex", t.style.visibility = "visible", t.style.opacity = "1", this.updateARButtonState(), t.classList.contains("ar-button--glass") || t.classList.add("ar-button--glass"), !0) : !1;
    };
    e() || (setTimeout(e, 100), setTimeout(e, 300), setTimeout(e, 500));
  }
  setupSessionListeners() {
    this.renderer.xr.addEventListener("sessionstart", () => {
      if (this.isARPresenting = !0, this.activeSession = this.renderer.xr.getSession?.() || null, this.sessionVisibilityState = this.activeSession?.visibilityState || "visible", this.sessionHiddenAt = 0, this.sessionResumedAt = Date.now(), this.lastHiddenDurationMs = 0, this.sessionOfferPromise = null, this.recoverySuggested = !1, this.endingFailedResume = !1, this.updateARButtonState(), this.activeSession) {
        const t = this.activeSession;
        this.sessionVisibilityHandler = () => {
          this.handleSessionVisibilityChange(t);
        }, t.addEventListener("visibilitychange", this.sessionVisibilityHandler), this.startSessionFrameHeartbeat(t);
      }
      const e = this.detectQuestDevice();
      this.applyQuestOptimizations(e), this.onSessionStart && this.onSessionStart();
    }), this.renderer.xr.addEventListener("sessionend", () => {
      this.isARPresenting = !1, this.clearFailedResumeRecoveryTimer(), this.clearLongHiddenRecoveryTimer(), this.stopSessionFrameHeartbeat(), this.activeSession && this.sessionVisibilityHandler && this.activeSession.removeEventListener("visibilitychange", this.sessionVisibilityHandler), this.activeSession = null, this.sessionVisibilityHandler = null, this.sessionVisibilityState = "none", this.sessionHiddenAt = 0, this.sessionResumedAt = 0, this.lastHiddenDurationMs = 0, this.recoverySuggested = this.endingFailedResume, this.endingFailedResume = !1, this.updateARButtonState(), this.offerARSession(), this.onSessionEnd && this.onSessionEnd();
    });
  }
  updateARButtonState() {
    if (!this.arButton) return;
    const e = !!this.sessionRequestPromise;
    this.arButton.disabled = e, this.arButton.classList.toggle("ar-generic-disabled", e), this.activeSession ? this.arButton.textContent = "EXIT AR" : e ? this.arButton.textContent = "STARTING AR" : this.recoverySuggested ? this.arButton.textContent = "RECOVER AR" : this.arButton.textContent = "ENTER AR";
  }
  getSessionInit() {
    return this.sessionInit || (this.sessionInit = {
      requiredFeatures: ["local"],
      optionalFeatures: this.getOptionalFeatures()
    }), this.sessionInit;
  }
  async activateSession(e) {
    return !e || this.isDisposed ? (await e?.end?.(), null) : (this.renderer.xr.setReferenceSpaceType?.("local"), await this.renderer.xr.setSession(e), e);
  }
  requestARSession() {
    if (this.activeSession || this.sessionRequestPromise || this.isDisposed)
      return this.sessionRequestPromise || this.activeSession;
    const e = ++this.sessionRequestGeneration, t = navigator.xr.requestSession("immersive-ar", this.getSessionInit()).then(async (n) => e !== this.sessionRequestGeneration || this.isDisposed ? (await n?.end?.(), null) : this.activateSession(n)).catch((n) => (console.warn("Unable to start AR session", n), null)), i = new Promise((n) => {
      this.sessionRequestTimeoutId = setTimeout(() => {
        e === this.sessionRequestGeneration && !this.activeSession && (this.sessionRequestGeneration += 1, this.recoverySuggested = !0, console.warn("AR session request timed out; the launch control is available to retry")), n(null);
      }, this.sessionRequestTimeoutMs);
    }), s = Promise.race([t, i]).finally(() => {
      this.sessionRequestTimeoutId && (clearTimeout(this.sessionRequestTimeoutId), this.sessionRequestTimeoutId = null), this.sessionRequestPromise === s && (this.sessionRequestPromise = null, this.updateARButtonState());
    });
    return this.sessionRequestPromise = s, this.updateARButtonState(), s;
  }
  /**
   * Mirror Three.js VRButton's native re-entry path. Quest Browser owns this
   * pending offer and can expose it in browser chrome even when the page cannot
   * manufacture the transient user activation required by requestSession().
   */
  offerARSession() {
    if (this.activeSession || this.sessionRequestPromise || this.sessionOfferPromise || this.isDisposed || typeof navigator?.xr?.offerSession != "function")
      return this.sessionOfferPromise;
    const e = navigator.xr.offerSession("immersive-ar", this.getSessionInit()).then((t) => t ? this.activeSession || this.isDisposed ? (t.end?.(), null) : this.activateSession(t) : null).catch((t) => (t?.name !== "AbortError" && !/cancel/i.test(t?.message || "") && console.warn("Unable to offer AR session", t), null)).finally(() => {
      this.sessionOfferPromise === e && (this.sessionOfferPromise = null);
    });
    return this.sessionOfferPromise = e, e;
  }
  handleSessionVisibilityChange(e) {
    if (!e || e !== this.activeSession) return;
    const t = Date.now(), i = e.visibilityState || "hidden", s = this.sessionVisibilityState;
    if (i === "visible") {
      this.clearFailedResumeRecoveryTimer(), this.clearLongHiddenRecoveryTimer(), this.lastHiddenDurationMs = this.sessionHiddenAt ? t - this.sessionHiddenAt : 0, this.sessionHiddenAt = 0, this.sessionResumedAt = t, this.sessionVisibilityState = "visible", this.isARPresenting = !0, this.onSessionResume?.(e);
      return;
    }
    this.sessionVisibilityState = i, this.sessionHiddenAt || (this.sessionHiddenAt = t), s === "visible" && this.lastHiddenDurationMs >= this.failedResumeMinHiddenMs && this.sessionResumedAt > 0 && t - this.sessionResumedAt <= this.failedResumeWindowMs && this.scheduleFailedResumeRecovery(e), this.scheduleLongHiddenRecovery(e), this.onSessionPause?.(e);
  }
  clearFailedResumeRecoveryTimer() {
    this.failedResumeRecoveryTimer && (clearTimeout(this.failedResumeRecoveryTimer), this.failedResumeRecoveryTimer = null);
  }
  clearLongHiddenRecoveryTimer() {
    this.longHiddenRecoveryTimer && (clearTimeout(this.longHiddenRecoveryTimer), this.longHiddenRecoveryTimer = null);
  }
  scheduleLongHiddenRecovery(e) {
    this.longHiddenRecoveryTimer || (this.longHiddenRecoveryTimer = setTimeout(() => {
      this.longHiddenRecoveryTimer = null, this.endStalledSession(
        e,
        "AR session remained hidden without frames or inputs; ending it and restoring the native AR offer"
      );
    }, this.longHiddenRecoveryMs));
  }
  startSessionFrameHeartbeat(e) {
    if (this.stopSessionFrameHeartbeat(), !e || typeof e.requestAnimationFrame != "function") return;
    this.lastSessionFrameAt = Date.now();
    const t = () => {
      this.isDisposed || e !== this.activeSession || (this.lastSessionFrameAt = Date.now(), this.sessionFrameHeartbeatId = e.requestAnimationFrame(t));
    };
    this.sessionFrameHeartbeatId = e.requestAnimationFrame(t), this.sessionFrameWatchInterval = setInterval(() => {
      this.isDisposed || e !== this.activeSession || Date.now() - this.lastSessionFrameAt < this.frameStallRecoveryMs || this.sessionFrameValidationTimer || (this.sessionFrameValidationTimer = setTimeout(() => {
        this.sessionFrameValidationTimer = null, !(Date.now() - this.lastSessionFrameAt < this.frameStallRecoveryMs) && this.endStalledSession(
          e,
          "AR session stopped producing XR frames; ending it and restoring the native AR offer",
          { allowVisible: !0, allowInputs: !0 }
        );
      }, this.frameStallValidationMs));
    }, this.frameStallPollMs);
  }
  stopSessionFrameHeartbeat() {
    const e = this.activeSession;
    if (this.sessionFrameHeartbeatId !== null && e && typeof e.cancelAnimationFrame == "function")
      try {
        e.cancelAnimationFrame(this.sessionFrameHeartbeatId);
      } catch {
      }
    this.sessionFrameHeartbeatId = null, this.lastSessionFrameAt = 0, this.sessionFrameWatchInterval && (clearInterval(this.sessionFrameWatchInterval), this.sessionFrameWatchInterval = null), this.sessionFrameValidationTimer && (clearTimeout(this.sessionFrameValidationTimer), this.sessionFrameValidationTimer = null);
  }
  async endStalledSession(e, t, { allowVisible: i = !1, allowInputs: s = !1 } = {}) {
    if (this.isDisposed || e !== this.activeSession || !i && e.visibilityState === "visible")
      return !1;
    const n = Array.from(e.inputSources || []);
    if (!s && n.length > 0) return !1;
    this.endingFailedResume = !0, this.recoverySuggested = !0, this.updateARButtonState(), console.warn(t);
    try {
      return await e.end(), !0;
    } catch (r) {
      return this.endingFailedResume = !1, console.warn("Unable to end stalled AR session", r), !1;
    }
  }
  scheduleFailedResumeRecovery(e) {
    this.clearFailedResumeRecoveryTimer(), this.failedResumeRecoveryTimer = setTimeout(async () => {
      this.failedResumeRecoveryTimer = null, await this.endStalledSession(
        e,
        "AR session briefly resumed then returned hidden without inputs; ending the stalled session for explicit recovery"
      );
    }, this.failedResumeValidationMs);
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
        const i = document.createElement("div");
        i.className = "ar-mode-active", i.style.display = "none", this.container.appendChild(i);
        const s = window.getComputedStyle(i), n = s.getPropertyValue("--ar-css-loaded") === "true" || s.opacity === "0.998";
        this.container.removeChild(i), n ? e() : setTimeout(t, 50);
      };
      setTimeout(t, 100);
    });
  }
  removeExistingARButtons() {
    document.querySelectorAll(
      '#ARButton, button.legacy-ar-button, a[href="#AR"]'
    ).forEach((t) => {
      t.parentNode && t.parentNode.removeChild(t);
    });
  }
  startARButtonMonitoring() {
    this.buttonObserver || (this.buttonObserver = new MutationObserver((e) => {
      e.forEach((t) => {
        t.addedNodes.forEach((i) => {
          if (i.nodeType === Node.ELEMENT_NODE) {
            const s = i.querySelectorAll ? i.querySelectorAll('button.legacy-ar-button, a[href="#AR"]') : [];
            if (s.length > 0 || i.tagName === "BUTTON" && i.classList.contains("legacy-ar-button")) {
              const n = s.length > 0 ? s[0] : i;
              n.style.display = "none";
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
    this.isDisposed = !0, this.sessionRequestGeneration += 1, this.sessionRequestTimeoutId && (clearTimeout(this.sessionRequestTimeoutId), this.sessionRequestTimeoutId = null), this.clearFailedResumeRecoveryTimer(), this.clearLongHiddenRecoveryTimer(), this.stopSessionFrameHeartbeat(), this.activeSession && this.sessionVisibilityHandler && this.activeSession.removeEventListener("visibilitychange", this.sessionVisibilityHandler), this.activeSession = null, this.sessionVisibilityHandler = null, this.sessionRequestPromise = null, this.buttonObserver && (this.buttonObserver.disconnect(), this.buttonObserver = null), this.arButton && this.arButton.parentNode && this.arButton.parentNode.removeChild(this.arButton), this.isQuest2 = !1, this.isQuest3 = !1, this.isARSupported = !1, this.isARPresenting = !1;
  }
}
const jn = new G(), Kn = new R();
class Yn {
  /**
   * Constructs a new XR hand primitive model.
   *
   * @param {XRHandModel} handModel - The hand model.
   * @param {Group} controller - The WebXR controller.
   * @param {string} path - The model path.
   * @param {XRHandedness} handedness - The handedness of the XR input source.
   * @param {XRHandPrimitiveModel~Options} options - The model options.
   */
  constructor(e, t, i, s, n) {
    this.controller = t, this.handModel = e, this.envMap = null;
    let r;
    !n || !n.primitive || n.primitive === "sphere" ? r = new yr(1, 10, 10) : n.primitive === "box" && (r = new oa(1, 1, 1));
    const o = new Ss();
    this.handMesh = new vs(r, o, 30), this.handMesh.frustumCulled = !1, this.handMesh.instanceMatrix.setUsage(aa), this.handMesh.castShadow = !0, this.handMesh.receiveShadow = !0, this.handModel.add(this.handMesh), this.joints = [
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
    let i = 0;
    for (let s = 0; s < this.joints.length; s++) {
      const n = t[this.joints[s]];
      n.visible && (Kn.setScalar(n.jointRadius || 8e-3), jn.compose(n.position, n.quaternion, Kn), this.handMesh.setMatrixAt(s, jn), i++);
    }
    this.handMesh.count = i, this.handMesh.instanceMatrix.needsUpdate = !0;
  }
}
const Rh = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles/generic-hand/";
class Qh {
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
  constructor(e, t, i, s, n = null, r = null) {
    this.controller = t, this.handModel = e, this.bones = [], n === null && (n = new qe(), n.setPath(i || Rh)), n.load(`${s}.glb`, (o) => {
      const a = o.scene.children[0];
      this.handModel.add(a);
      const l = a.getObjectByProperty("type", "SkinnedMesh");
      l.frustumCulled = !1, l.castShadow = !0, l.receiveShadow = !0, [
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
        const u = a.getObjectByName(h);
        u !== void 0 ? u.jointName = h : console.warn(`Couldn't find ${h} in ${s} hand mesh`), this.bones.push(u);
      }), r && r(a);
    });
  }
  /**
   * Updates the mesh based on the tracked XR joints data.
   */
  updateMesh() {
    const e = this.controller.joints;
    for (let t = 0; t < this.bones.length; t++) {
      const i = this.bones[t];
      if (i) {
        const s = e[i.jointName];
        if (s.visible) {
          const n = s.position;
          i.position.copy(n), i.quaternion.copy(s.quaternion);
        }
      }
    }
  }
}
class _h extends ui {
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
class Dh {
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
    const i = new _h(e);
    return e.addEventListener("connected", (s) => {
      const n = s.data;
      n.hand && !i.motionController && (i.xrInputSource = n, t === void 0 || t === "spheres" ? i.motionController = new Yn(i, e, this.path, n.handedness, { primitive: "sphere" }) : t === "boxes" ? i.motionController = new Yn(i, e, this.path, n.handedness, { primitive: "box" }) : t === "mesh" && (i.motionController = new Qh(i, e, this.path, n.handedness, this.gltfLoader, this.onLoad))), e.visible = !0;
    }), e.addEventListener("disconnected", () => {
      e.visible = !1;
    }), i;
  }
}
class Lh {
  constructor(e, t = {}) {
    this.renderer = e, this.assetPaths = bi(t), this.handColor = t.handColor ?? 16777215, this.handOpacity = t.handOpacity ?? 0.5, this.handModelFactory = new Dh(
      null,
      (i) => this.onHandModelLoaded(i)
    ), this.handModelFactory.setPath(ii(this.assetPaths.webxrInputProfilesPath, "generic-hand/")), this.hand1 = null, this.hand2 = null, this.interactionEnabled = !0, this.dragging = !1, this.scaling = !1, this.rotating = !1, this.dragStartPos = new m.Vector3(), this.scaleStartDistance = 0, this.rotateStartAngle = 0, this.pinchIntent = {
      hand1Start: 0,
      hand2Start: 0,
      delay: 100
    }, this.inertiaActive = !1, this.posVelocity = new m.Vector3(), this.rotVelocity = 0, this.scaleVelocity = 0, this.POSITION_DAMPING = 100, this.ROTATION_DAMPING = 8, this.SCALE_DAMPING = 8, this.MAX_ROT_VELOCITY = Math.PI, this.MAX_SCALE_VELOCITY = 0.5, this.MIN_SCALE = 0.01, this.MAX_SCALE = 1, this.VELOCITY_DEAD_ZONE = 1e-3, this.DISTANCE_GAIN_THRESHOLD = 5, this.MAX_DISTANCE_GAIN = 3, this.MAX_DELTA_PER_FRAME = 0.5, this.MIN_TWO_HAND_DISTANCE = 0.04, this.MAX_ROT_DELTA_PER_FRAME = 0.35, this.VELOCITY_SMOOTHING = 0.3, this.tempVec1 = new m.Vector3(), this.tempVec2 = new m.Vector3(), this.worldUp = new m.Vector3(0, 1, 0), this.tempYawQuaternion = new m.Quaternion(), this.onGestureStart = null, this.onGestureEnd = null;
  }
  init(e) {
    this.hand1 = this.setupHand(e, 0, "hand1Start"), this.hand2 = this.setupHand(e, 1, "hand2Start");
  }
  setupHand(e, t, i) {
    const s = this.renderer.xr.getHand(t);
    let n = null;
    return s.userData.pinch = !1, s.userData.handedness = null, s.addEventListener("pinchstart", () => {
      if (!this.interactionEnabled) {
        s.userData.pinch = !1, this.pinchIntent[i] = 0;
        return;
      }
      s.userData.pinch = !0, this.pinchIntent[i] = performance.now();
    }), s.addEventListener("pinchend", () => {
      s.userData.pinch = !1, this.onPinchEnd();
    }), s.addEventListener("connected", (r) => {
      const o = r.data?.handedness || null;
      s.userData.handedness = o, s.userData.pinch = !1, this.pinchIntent[i] = 0, this.prepareHandModelForHandedness(n, o);
    }), s.addEventListener("disconnected", () => {
      s.userData.handedness = null, s.userData.pinch = !1, this.pinchIntent[i] = 0, this.onPinchEnd();
    }), n = this.handModelFactory.createHandModel(s, "mesh"), s.add(n), e.add(s), s;
  }
  getLoadedHandedness(e) {
    return e?.getObjectByName?.("l_handMeshNode") ? "left" : e?.getObjectByName?.("r_handMeshNode") ? "right" : null;
  }
  prepareHandModelForHandedness(e, t) {
    if (!e || !t) return;
    const i = e.userData.loadedHandedness || e.xrInputSource?.handedness || null;
    if (e.userData.expectedHandedness = t, !(!i || i === t)) {
      for (const s of [...e.children])
        this.disposeHandObject(s), e.remove(s);
      e.motionController = null, e.xrInputSource = null, e.userData.loadedHandedness = null;
    }
  }
  onHandModelLoaded(e) {
    const t = e?.parent, i = this.getLoadedHandedness(e), s = t?.userData?.expectedHandedness || t?.xrInputSource?.handedness || null;
    if (i && s && i !== s) {
      t.remove(e), this.disposeHandObject(e);
      return;
    }
    t && (t.userData.loadedHandedness = i), this.styleHandModel(e, this.handColor, this.handOpacity);
  }
  disposeHandObject(e) {
    e?.traverse?.((t) => {
      t.geometry?.dispose?.();
      const i = Array.isArray(t.material) ? t.material : [t.material];
      for (const s of i) s?.dispose?.();
      t.skeleton?.dispose?.();
    });
  }
  styleHandModel(e, t, i) {
    e.traverse((s) => {
      s.isMesh && (s.material?.dispose?.(), s.material = new m.MeshStandardMaterial({
        color: t,
        roughness: 0.8,
        metalness: 0.2,
        transparent: !0,
        opacity: i,
        depthWrite: !0,
        side: m.FrontSide
      }));
    });
  }
  update(e, t, i) {
    t && (this.handleGestures(e, t, i), this.inertiaActive && !this.dragging && !this.scaling && !this.rotating && this.applyInertia(e, t));
  }
  handleGestures(e, t, i) {
    if (!this.interactionEnabled || !this.hand1 || !this.hand2) return;
    const s = this.hand1.joints?.["index-finger-tip"], n = this.hand2.joints?.["index-finger-tip"];
    if (!s || !n) {
      (this.dragging || this.scaling || this.rotating) && this.onPinchEnd();
      return;
    }
    const r = performance.now(), o = this.hand1.userData.pinch && r - this.pinchIntent.hand1Start >= this.pinchIntent.delay, a = this.hand2.userData.pinch && r - this.pinchIntent.hand2Start >= this.pinchIntent.delay;
    if (o && !this.hand2.userData.pinch || a && !this.hand1.userData.pinch) {
      const d = (o ? this.hand1 : this.hand2).joints["index-finger-tip"];
      if (!this.dragging)
        (this.scaling || this.rotating) && (this.rotVelocity = 0, this.scaleVelocity = 0), this.dragging = !0, this.scaling = !1, this.rotating = !1, d.getWorldPosition(this.dragStartPos), this.onGestureStart && this.onGestureStart("drag");
      else {
        d.getWorldPosition(this.tempVec1);
        const h = this.tempVec1.clone().sub(this.dragStartPos);
        if (h.length() > this.MAX_DELTA_PER_FRAME && h.normalize().multiplyScalar(this.MAX_DELTA_PER_FRAME), i) {
          const u = i.position.distanceTo(t.position);
          if (u > this.DISTANCE_GAIN_THRESHOLD) {
            const A = Math.min(
              this.MAX_DISTANCE_GAIN,
              1 + (u - this.DISTANCE_GAIN_THRESHOLD) / 7.5
            );
            h.multiplyScalar(A);
          }
        }
        if (t.position.add(h), e > 0) {
          const u = h.clone().divideScalar(e);
          this.posVelocity.lerp(u, this.VELOCITY_SMOOTHING);
        }
        this.dragStartPos.copy(this.tempVec1);
      }
    } else if (o && a) {
      const l = this.hand1.userData.handedness === "right" && this.hand2.userData.handedness === "left", d = l ? n : s, h = l ? s : n;
      d.getWorldPosition(this.tempVec1), h.getWorldPosition(this.tempVec2);
      const u = this.tempVec1.distanceTo(this.tempVec2);
      if (u < this.MIN_TWO_HAND_DISTANCE) {
        this.dragging = !1, this.scaling = !1, this.rotating = !1, this.rotVelocity = 0, this.scaleVelocity = 0;
        return;
      }
      if (!this.scaling && !this.rotating) {
        this.dragging = !1, this.scaling = !0, this.rotating = !0, this.scaleStartDistance = u;
        const A = this.tempVec2.x - this.tempVec1.x, p = this.tempVec2.z - this.tempVec1.z;
        this.rotateStartAngle = Math.atan2(-p, A), this.onGestureStart && this.onGestureStart("two-hand");
      } else {
        const A = u / this.scaleStartDistance, p = Math.log(t.scale.x), f = Math.log(A), g = p + f, b = Math.max(this.MIN_SCALE, Math.min(this.MAX_SCALE, Math.exp(g)));
        if (t.scale.setScalar(b), e > 0) {
          const S = f / e, v = Math.max(-this.MAX_SCALE_VELOCITY, Math.min(this.MAX_SCALE_VELOCITY, S));
          this.scaleVelocity = this.scaleVelocity * (1 - this.VELOCITY_SMOOTHING) + v * this.VELOCITY_SMOOTHING;
        }
        this.scaleStartDistance = u;
        const y = this.tempVec2.x - this.tempVec1.x, E = this.tempVec2.z - this.tempVec1.z, C = Math.atan2(-E, y);
        let w = C - this.rotateStartAngle;
        if (w > Math.PI && (w -= 2 * Math.PI), w < -Math.PI && (w += 2 * Math.PI), w = Math.max(
          -this.MAX_ROT_DELTA_PER_FRAME,
          Math.min(this.MAX_ROT_DELTA_PER_FRAME, w)
        ), this.applyWorldYaw(t, w), e > 0) {
          const S = w / e, v = Math.max(-this.MAX_ROT_VELOCITY, Math.min(this.MAX_ROT_VELOCITY, S));
          this.rotVelocity = this.rotVelocity * (1 - this.VELOCITY_SMOOTHING) + v * this.VELOCITY_SMOOTHING;
        }
        this.rotateStartAngle = C;
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
    const i = Math.exp(-this.POSITION_DAMPING * e), s = Math.exp(-this.ROTATION_DAMPING * e), n = Math.exp(-this.SCALE_DAMPING * e);
    this.posVelocity.multiplyScalar(i), this.rotVelocity *= s, this.scaleVelocity *= n, t.position.addScaledVector(this.posVelocity, e), this.applyWorldYaw(t, this.rotVelocity * e);
    const o = Math.log(t.scale.x) + this.scaleVelocity * e, a = Math.max(this.MIN_SCALE, Math.min(this.MAX_SCALE, Math.exp(o)));
    t.scale.setScalar(a), this.posVelocity.lengthSq() < this.VELOCITY_DEAD_ZONE && this.posVelocity.set(0, 0, 0), Math.abs(this.rotVelocity) < this.VELOCITY_DEAD_ZONE && (this.rotVelocity = 0), Math.abs(this.scaleVelocity) < this.VELOCITY_DEAD_ZONE && (this.scaleVelocity = 0), this.posVelocity.lengthSq() === 0 && this.rotVelocity === 0 && this.scaleVelocity === 0 && (this.inertiaActive = !1);
  }
  applyWorldYaw(e, t) {
    !e?.quaternion || !Number.isFinite(t) || t === 0 || (this.tempYawQuaternion.setFromAxisAngle(this.worldUp, t), e.quaternion.premultiply(this.tempYawQuaternion).normalize());
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
class Ph extends Pe {
  constructor(e, t, i, s = {}, n = null, r = {}) {
    super(), this.renderer = e, this.camera = t, this.scene = i, this.config = {
      enableHandTracking: !0,
      enableWorldCube: !0,
      defaultScale: 0.05,
      worldCubeSize: 1e3,
      worldCubeOpacity: 0.1,
      ...s
    }, this.container = n, this.options = r, this.arCore = new Th(e, t, i, n), this.handTracking = this.config.enableHandTracking ? new Lh(e, r) : null, this.modelGroup = new m.Group(), this.modelGroup.name = "AR Model Group", this.scene.add(this.modelGroup), this.currentModel = null, this.pendingModel = null, this.pendingModelConfig = null, this.currentModelScale = this.config.defaultScale, this.worldCube = null, this.config.enableWorldCube && this.createWorldCube(), this.isARPresenting = !1, this.previousGestureType = null, this.init();
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
    }, this.arCore.onSessionPause = () => {
      this.handTracking?.stop(), this.previousGestureType = null, this.emit("session-pause");
    }, this.arCore.onSessionResume = (e) => {
      this.isARPresenting = !0, this.handTracking?.stop(), this.previousGestureType = null, this.modelGroup.visible = !0, this.worldCube && (this.worldCube.visible = !0), this.emit("session-resume", e);
    };
  }
  prepareModel(e, t = null) {
    if (this.handTracking && this.handTracking.stop(), this.pendingModel = e, this.pendingModelConfig = t, e) {
      const i = t?.defaultScale || e.userData?.defaultScale || this.config.defaultScale;
      this.currentModelScale = i, this.isARPresenting && this.activateModel();
    } else
      this.isARPresenting && this.activateModel();
  }
  activateModel() {
    if (this.currentModel && this.currentModel === this.pendingModel && this.currentModel.parent === this.modelGroup) {
      this.modelGroup.visible = !0;
      return;
    }
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
    const e = this.config.worldCubeSize, t = new m.BoxGeometry(e, e, e), i = new m.MeshBasicMaterial({
      color: 0,
      transparent: !0,
      opacity: this.config.worldCubeOpacity,
      side: m.BackSide,
      depthWrite: !1
    });
    this.worldCube = new m.Mesh(t, i), this.worldCube.name = "AR World Cube", this.worldCube.visible = !1, this.scene.add(this.worldCube);
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
class Wn {
  /**
   * Initialize debug commands with a BelowViewer instance
   * 
   * @param {BelowViewer} viewer - The BelowViewer instance to debug
   */
  static init(e) {
    typeof window > "u" || (window.belowViewer = e, window.camera = () => {
      if (!e.cameraManager?.camera || !e.cameraManager?.controls)
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
      }, n = {
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
      return console.log("🎥 Current camera positions:"), console.log("📋 Copy this for initialPositions config:"), console.log(JSON.stringify(n, null, 2)), n;
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
      const i = Number(t);
      if (!Number.isFinite(i) || i <= 0)
        return console.warn("Usage: camera.setFar(10000)"), null;
      const s = e.setCameraFar?.(i) || e.cameraManager?.setFar?.(i);
      return s ? (console.log(`Camera far clipping: ${s.far}`), s) : (console.warn("Camera not initialized"), null);
    }, window.camera.setClipping = (t, i) => {
      if (t === void 0 && i === void 0) {
        const r = e.cameraManager?.camera;
        if (!r)
          return console.warn("Camera not initialized"), null;
        const o = { near: r.near, far: r.far };
        return console.table(o), console.log("Usage: camera.setClipping(0.05, 10000) or camera.setClipping(10000)"), o;
      }
      const s = i === void 0 ? { far: t } : { near: t, far: i }, n = e.setCameraClipping?.(s) || e.cameraManager?.setClipping?.(s);
      return n ? (console.log(`Camera clipping: near ${n.near}, far ${n.far}`), n) : (console.warn("Camera not initialized"), null);
    }, window.camera.fitClipping = (t = 2) => {
      const i = e.fitCameraClipping?.(t);
      return i ? (console.log(`Camera far clipping: ${i.far} (minimum ${i.minimumFar.toFixed(3)}, ${i.multiplier}x model size)`), i) : (console.warn("No model bounds available"), null);
    }, window.camera.setMaxDistance = (t) => {
      const i = e.cameraManager?.getControls?.();
      if (!i)
        return console.warn("Camera controls not initialized"), null;
      if (t === void 0) {
        const n = {
          minDistance: i.minDistance,
          maxDistance: i.maxDistance
        };
        return console.table(n), console.log("Usage: camera.setMaxDistance(250)"), n;
      }
      const s = Number(t);
      return !Number.isFinite(s) || s <= i.minDistance ? (console.warn(`Usage: camera.setMaxDistance(n) where n is greater than ${i.minDistance}`), null) : (i.maxDistance = s, i.update(), console.log(`Camera max distance: ${i.maxDistance}`), {
        minDistance: i.minDistance,
        maxDistance: i.maxDistance
      });
    }, window.camera.setStereo = (t, i) => {
      if (t === void 0) {
        const s = {
          enabled: e.stereoEnabled || !1,
          mode: e.stereoMode || "sbs",
          eyeSeparation: e.stereoEyeSeparation || 0.064
        };
        return console.log("👓 Stereo information:"), console.table(s), console.log(""), console.log("Usage:"), console.log("  camera.setStereo(true)           - Enable stereo mode"), console.log("  camera.setStereo(false)          - Disable stereo mode"), console.log("  camera.setStereo(true, 0.065)    - Enable with custom eye separation"), s;
      }
      return e.setStereoEnabled(t), i !== void 0 && e.setStereoEyeSeparation(i), console.log(`👓 Stereo ${t ? "enabled" : "disabled"}`), i !== void 0 && console.log(`👓 Eye separation: ${i}m`), { enabled: t, eyeSeparation: e.stereoEyeSeparation };
    }, window.scene = () => {
      if (!e.sceneManager?.scene)
        return console.warn("Scene not initialized"), null;
      const t = e.sceneManager.scene, i = {
        children: t.children.length,
        lights: t.children.filter((s) => s.isLight).length,
        meshes: t.children.filter((s) => s.isMesh).length,
        groups: t.children.filter((s) => s.isGroup).length,
        background: t.background,
        fog: t.fog ? {
          type: t.fog.constructor.name,
          color: t.fog.color.getHexString(),
          ear: t.fog.near,
          far: t.fog.far
        } : null
      };
      return console.log("🌍 Scene information:"), console.table(i), console.log("Scene object:", t), { info: i, scene: t };
    }, window.scene.setBrightness = (t = 0) => {
      const i = Math.max(-3, Math.min(3, Number(t) || 0)), s = Math.pow(2, i), n = e.sceneManager?.scene;
      return !n && !e.renderer ? (console.warn("Scene not initialized"), null) : (n?.traverse?.((r) => {
        r.isLight && (r.userData.belowBaseIntensity ??= r.intensity ?? 1, r.intensity = r.userData.belowBaseIntensity * s);
      }), e.renderer && (e.renderer.userData ||= {}, e.renderer.userData.belowBaseToneMappingExposure ??= e.renderer.toneMappingExposure || 1, e.renderer.toneMappingExposure = e.renderer.userData.belowBaseToneMappingExposure * s), console.log(`Scene brightness: ${i} (${s.toFixed(3)}x)`), {
        brightness: i,
        multiplier: s,
        toneMappingExposure: e.renderer?.toneMappingExposure
      });
    }, window.vertices = () => {
      if (!e.sceneManager?.scene)
        return console.warn("Scene not initialized"), null;
      const t = e.sceneManager.scene;
      let i = 0, s = 0, n = 0, r = 0;
      t.traverse((a) => {
        const l = a.geometry?.getAttribute?.("position");
        if (!l) return;
        i += 1;
        const d = a.isInstancedMesh ? l.count * a.count : l.count;
        n += d, a.visible && (s += 1, r += d);
      });
      const o = {
        meshes: i,
        visibleMeshes: s,
        vertices: n,
        visibleVertices: r
      };
      return console.log("🔢 Scene vertex counts:"), console.table(o), o;
    }, window.models = () => {
      const t = e.getLoadedModels();
      if (t.length === 0)
        return console.log("📦 No models loaded"), [];
      const i = t.map((s, n) => {
        const r = s.model, o = r.userData.boundingBox;
        return {
          index: n,
          url: s.url,
          ame: r.name || "Unnamed",
          position: {
            x: parseFloat(r.position.x.toFixed(3)),
            y: parseFloat(r.position.y.toFixed(3)),
            z: parseFloat(r.position.z.toFixed(3))
          },
          rotation: {
            x: parseFloat(r.rotation.x.toFixed(3)),
            y: parseFloat(r.rotation.y.toFixed(3)),
            z: parseFloat(r.rotation.z.toFixed(3))
          },
          scale: {
            x: parseFloat(r.scale.x.toFixed(3)),
            y: parseFloat(r.scale.y.toFixed(3)),
            z: parseFloat(r.scale.z.toFixed(3))
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
          visible: r.visible,
          children: r.children.length
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
    }, window.particles = () => {
      let t = null;
      if (e.diveSystem?.particles ? t = e.diveSystem.particles : typeof window < "u" && window.diveSystem?.particles ? t = window.diveSystem.particles : e.belowViewer?.diveSystem?.particles && (t = e.belowViewer.diveSystem.particles), !t)
        return console.log("🌊 Particles not initialized"), null;
      const i = {
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
      return console.log("🌊 Particle information:"), console.table(i), i;
    }, window.stereo = (t, i) => (console.warn("stereo() is deprecated. Use camera.setStereo(...) instead."), window.camera.setStereo(t, i)), window.perfStats = (t = !0) => {
      if (!e.setPerfStats)
        return console.warn("Performance monitor unavailable"), null;
      const i = e.setPerfStats(t);
      return console.log(`📈 Performance stats ${t ? "enabled — watch for [BelowPerf] lines" : "disabled"}`), i;
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
class kh {
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
    const t = Array.from(this.frameTimes.subarray(0, e)).sort((r, o) => r - o);
    let i = 0;
    for (let r = 0; r < e; r += 1) i += t[r];
    const s = i / e, n = t[Math.min(e - 1, Math.floor(e * 0.95))];
    return {
      frameMsAvg: Number(s.toFixed(2)),
      frameMsP95: Number(n.toFixed(2)),
      fps: Number((1e3 / s).toFixed(1))
    };
  }
  tilesetStats() {
    const e = this.tilesetLoader;
    if (!e || e.activeTilesets.size === 0) return null;
    const t = [];
    return e.activeTilesets.forEach((i) => {
      const s = i.stats || {}, n = e.tilesetStates?.get?.(i), r = n?.shadowCastersLimited ? n.shadowCasterTiles?.size : n?.loadedTileScenes?.size;
      t.push({
        visible: s.visible ?? null,
        active: s.active ?? null,
        downloading: s.downloading ?? null,
        parsing: s.parsing ?? null,
        queued: s.queued ?? null,
        inCache: s.inCache ?? null,
        errorTarget: Number((i.errorTarget ?? 0).toFixed(2)),
        maxTilesProcessed: i.maxTilesProcessed ?? null,
        cameras: Array.isArray(i.cameras) ? i.cameras.length : 0,
        vrProfile: n?.resolvedVRPerformanceProfile ?? null,
        shadowCasters: r ?? null,
        vrMaxTriangles: n?.vrMaxTriangles ?? null
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
    const e = this.renderer?.info?.render || {}, t = this.renderer?.xr, i = {
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
    }, s = this.tilesetStats();
    return s && (i.tiles = s), this.lastSummary = i, i;
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
class Fh extends Pe {
  /**
   * Creates a new BelowViewer instance
   * 
   * @param {HTMLElement} container - DOM element to render into
   * @param {BelowViewerConfig} [config={}] - Configuration options
   */
  constructor(e, t = {}) {
    super(), this.container = e;
    const i = {
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
    this.config = new gi(i).validate(t), this.config.vr = rh(
      this.config.vr,
      t?.vr?.performanceProfile || "auto",
      t?.vr || {}
    ), this.renderer = null, this.sceneManager = null, this.cameraManager = null, this.modelLoader = null, this.tilesetLoader = null, this.vrManager = null, this.arManager = null, this.stereoCamera = null, this.perfMonitor = null, this.isVREnabled = this.config.vr?.enabled !== !1, this.isAREnabled = this.config.ar?.enabled === !0, this.stereoEnabled = this.config.stereo?.enabled === !0, this.stereoMode = this.config.stereo?.mode || "sbs";
    const s = this.config.stereo?.eyeSeparation ?? 0.064;
    this.stereoEyeSeparation = Math.max(0.05, Math.min(0.07, s)), this.stereoEyeSeparation !== s && console.warn(`[BelowJS] Initial eye separation ${s}m clamped to ${this.stereoEyeSeparation}m (comfortable range for screens: 0.050-0.070m)`), this.dolly = null, this.isInitialized = !1, this.loadedModels = [], this.currentAbortController = null, this.skipRenderDuringLoad = !1, this.pixelRatioBeforeThrottle = 1, this.originalPixelRatio = 1, this.isConstrainedSafari = !1, this.init();
  }
  init() {
    try {
      this.initRenderer(), this.sceneManager = new da(this.config.scene), this.cameraManager = new Ia(this.config.camera), this.modelLoader = new ne(this.renderer, this.config), this.tilesetLoader = new hh(this.renderer, this.cameraManager.camera), this.isConstrainedSafari = this.modelLoader?.isIOSWebKit || !1, this.initStereo(), this.renderer?.getPixelRatio ? this.originalPixelRatio = this.renderer.getPixelRatio() : typeof window < "u" && (this.originalPixelRatio = window.devicePixelRatio || 1), this.pixelRatioBeforeThrottle = this.originalPixelRatio, this.isVREnabled && this.initVR(), this.isAREnabled && this.initAR(), this.cameraManager.initControls(this.renderer.domElement), this.setupEventListeners(), this.startRenderLoop(), this.isInitialized = !0, typeof window < "u" && Wn.init(this), this.config.perfStats && this.setPerfStats(!0), this.emit("initialized");
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
      const i = document.createElement("canvas"), s = i.getContext("webgl2", {
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
      s ? (e.canvas = i, e.context = s) : console.warn("XR-compatible WebGL2 context unavailable; falling back to default renderer context");
    }
    this.renderer = new m.WebGLRenderer(e), this.renderer.setSize(this.container.clientWidth, this.container.clientHeight), this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = m.PCFSoftShadowMap, this.renderer.outputColorSpace = m.SRGBColorSpace;
    const t = {
      none: m.NoToneMapping,
      linear: m.LinearToneMapping,
      reinhard: m.ReinhardToneMapping,
      cineon: m.CineonToneMapping,
      "aces-filmic": m.ACESFilmicToneMapping
    };
    this.config.renderer.toneMapping && t[this.config.renderer.toneMapping] && (this.renderer.toneMapping = t[this.config.renderer.toneMapping]), this.renderer.toneMappingExposure = this.config.renderer.toneMappingExposure, this.container.appendChild(this.renderer.domElement);
  }
  initStereo() {
    this.stereoCamera || (this.stereoCamera = new m.StereoCamera()), this.stereoCamera.eyeSep = this.stereoEyeSeparation;
  }
  initVR() {
    this.dolly = new m.Group(), this.dolly.add(this.cameraManager.camera), this.sceneManager.scene.add(this.dolly);
    const e = this.config.audioPath || "./sound/", t = this.config.enableVRAudio === !0;
    this.vrManager = new xh(this.renderer, this.cameraManager.camera, this.sceneManager.scene, e, t, this.container, this.config), this.applyXRFramebufferScaleFactor(), this.vrManager.setControls(this.cameraManager.controls), this.config.initialPositions && this.vrManager.setInitialPositions(this.config.initialPositions), this.vrManager.onModeToggle = () => {
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
    }, t === "off" ? this.renderer.shadowMap.enabled = !1 : this.renderer.shadowMap.type = m.PCFShadowMap, this._flagShadowMaterialsForRecompile());
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
    return e && !this.perfMonitor ? this.perfMonitor = new kh(this.renderer, {
      tilesetLoader: this.tilesetLoader,
      overlay: t.overlay !== !1,
      overlayContainer: typeof document < "u" ? document.body : null
    }) : !e && this.perfMonitor && (this.perfMonitor.dispose(), this.perfMonitor = null), this.perfMonitor;
  }
  initAR() {
    const e = this.config.ar?.settings || {};
    this.arManager = new Ph(
      this.renderer,
      this.cameraManager.camera,
      this.sceneManager.scene,
      e,
      this.container,
      this.config
    ), this.arManager.on("session-start", () => {
      this.syncCurrentModelToAR(), this.cameraManager.controls && (this.cameraManager.controls.enabled = !1), this.emit("ar-session-start");
    }), this.arManager.on("session-end", () => {
      this.cameraManager.controls && (this.cameraManager.controls.enabled = !0), this.emit("ar-session-end");
    }), this.arManager.on("session-pause", () => {
      this.emit("ar-session-pause");
    }), this.arManager.on("session-resume", (t) => {
      this.cameraManager.controls && (this.cameraManager.controls.enabled = !1), this.emit("ar-session-resume", t);
    }), this.arManager.on("gesture-start", (t) => {
      this.emit("ar-gesture-start", t);
    }), this.arManager.on("gesture-end", (t) => {
      this.emit("ar-gesture-end", t);
    }), this.syncCurrentModelToAR();
  }
  syncCurrentModelToAR() {
    if (!this.arManager) return !1;
    const e = this.loadedModels[this.loadedModels.length - 1] || null;
    return this.arManager.setTargetModel(e?.model || null, e?.options || null), !!e?.model;
  }
  setupEventListeners() {
    window.addEventListener("resize", this.onWindowResize.bind(this)), this.cameraManager && this.cameraManager.on("change", () => {
      this.emit("camera-change");
    });
  }
  onWindowResize() {
    if (!this.isInitialized || this.renderer?.xr?.isPresenting) return;
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
    const i = this.currentAbortController.signal, s = this.isConstrainedSafari;
    try {
      this.emit("model-load-start", { url: e }), s && this.applyLoadRenderingConstraints(!0);
      const n = (d) => {
        i.aborted || this.emit("model-load-progress", { url: e, progress: d });
      }, r = (d) => {
        i.aborted || this.emit("model-load-stage", { url: e, stage: d });
      };
      let o, a = null;
      if (t.type === "tileset") {
        r && r("downloading");
        const d = await this.tilesetLoader.load(e, {
          signal: i,
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
        o = d.group, a = d.tileset, r && r("processing");
      } else
        o = await this.modelLoader.load(e, n, i, r);
      if (i.aborted)
        return null;
      t.position && o.position.fromArray(t.position), t.rotation && o.rotation.fromArray(t.rotation), t.scale && (typeof t.scale == "number" ? o.scale.setScalar(t.scale) : o.scale.fromArray(t.scale));
      const l = this.centerModelAndRecalculateBounds(o);
      return this.sceneManager.add(o), this.loadedModels.push({ model: o, url: e, options: t, originalCenter: l, tileset: a }), this.syncCurrentModelToAR(), t.autoClip !== !1 && this.fitCameraClippingToModel(o, t.cameraFarMultiplier ?? 2), this.loadedModels.length === 1 && t.autoFrame !== !1 && this.frameModel(o), this.cameraManager?.resetControlInteractionState?.(), this.currentAbortController && this.currentAbortController.signal === i && (this.currentAbortController = null), r && r("completed"), this.emit("model-loaded", { model: o, url: e }), o;
    } catch (n) {
      if (this.currentAbortController && this.currentAbortController.signal === i && (this.currentAbortController = null), !i.aborted && n.message !== "Loading cancelled")
        throw console.error("Failed to load model:", n), this.emit("model-load-error", { url: e, error: n }), n;
      if (i.aborted || n.message === "Loading cancelled")
        return this.emit("model-load-cancelled", { url: e }), null;
      throw n;
    } finally {
      s && this.applyLoadRenderingConstraints(!1);
    }
  }
  frameModel(e) {
    const t = this.getValidModelBoundingBox(e);
    if (!t)
      return;
    const i = t.getSize(new m.Vector3()), s = t.getCenter(new m.Vector3());
    this.cameraManager.frameObject(s, i);
  }
  fitCameraClippingToModel(e, t = 2) {
    const i = this.getValidModelBoundingBox(e);
    if (!i || !this.cameraManager)
      return null;
    const s = i.getSize(new m.Vector3()), n = Math.max(s.length(), s.x, s.y, s.z, 1e-3), r = Math.max(Number(t) || 2, 1), o = n * r, a = this.cameraManager.ensureMinimumFar(o);
    return this.emit("camera-clipping-change", {
      model: e,
      modelSize: n,
      multiplier: r,
      ...a
    }), {
      modelSize: n,
      multiplier: r,
      ...a
    };
  }
  fitCameraClipping(e = 2) {
    if (!this.loadedModels.length)
      return null;
    const t = new m.Box3();
    let i = !1;
    if (this.loadedModels.forEach(({ model: n }) => {
      const r = this.getValidModelBoundingBox(n);
      r && (t.union(r), i = !0);
    }), !i)
      return null;
    const s = new m.Group();
    return s.userData.boundingBox = t, this.fitCameraClippingToModel(s, e);
  }
  setCameraClipping({ near: e, far: t } = {}) {
    if (!this.cameraManager)
      return null;
    const i = this.cameraManager.setClipping({ near: e, far: t });
    return this.emit("camera-clipping-change", i), i;
  }
  setCameraFar(e) {
    return this.setCameraClipping({ far: e });
  }
  isValidBox3(e) {
    return !e || !(e instanceof m.Box3) || e.isEmpty() ? !1 : Number.isFinite(e.min.x) && Number.isFinite(e.min.y) && Number.isFinite(e.min.z) && Number.isFinite(e.max.x) && Number.isFinite(e.max.y) && Number.isFinite(e.max.z);
  }
  getValidModelBoundingBox(e) {
    if (this.isValidBox3(e?.userData?.boundingBox))
      return e.userData.boundingBox;
    const t = new m.Box3().setFromObject(e);
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
      return new m.Vector3();
    const i = t.getCenter(new m.Vector3());
    e.position.sub(i);
    const s = new m.Box3().setFromObject(e);
    return this.isValidBox3(s) ? e.userData.boundingBox = s : e.userData.boundingBox = t.clone().translate(i.clone().multiplyScalar(-1)), i;
  }
  startRenderLoop() {
    let e = 0, t = 0;
    const i = (s) => {
      const n = Math.min((s - e) / 1e3, 0.1);
      this.perfMonitor && e > 0 && this.perfMonitor.sample(s - e), e = s, this.vrManager && this.vrManager.update(n), this.arManager && this.arManager.update(n * 1e3), this.cameraManager && this.cameraManager.update(), this.emit("before-render", n);
      const r = this.renderer?.xr?.isPresenting;
      if (this.renderer && this.sceneManager && this.cameraManager) {
        const o = () => {
          (!this.skipRenderDuringLoad || r) && (this.stereoEnabled && !r && this.stereoMode === "sbs" ? this.renderSbsStereo() : this.renderer.render(this.sceneManager.scene, this.cameraManager.camera));
        };
        if (r) {
          if (this.tilesetLoader?.setXRSession(this.renderer.xr.getSession()), o(), this.tilesetLoader) {
            const l = this.vrManager?.getVRStatus?.().movement?.isMoving === !0, d = typeof performance < "u" && typeof performance.now == "function" ? performance.now() : s, h = l ? 28 : 33;
            if (d - t >= h) {
              const A = this.renderer.xr.getCamera(this.cameraManager.camera);
              this.tilesetLoader.update(A, {
                isXR: !0,
                queueOptions: {
                  maxTasks: l ? 1 : 2,
                  timeBudgetMs: l ? 0.7 : 1.5
                }
              }), t = d;
            }
          }
        } else {
          if (this.tilesetLoader?.setXRSession(null), this.tilesetLoader) {
            const a = this.cameraManager.camera;
            this.tilesetLoader.update(a, {
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
    this.renderer.setAnimationLoop(i);
  }
  renderSbsStereo() {
    if (!this.stereoCamera || !this.renderer || !this.sceneManager || !this.cameraManager)
      return;
    const e = this.renderer.getSize(new m.Vector2()), t = e.width, i = e.height, s = Math.floor(t / 2), n = t - s;
    this.stereoCamera.aspect = i > 0 ? s / i : 1, this.stereoCamera.update(this.cameraManager.camera), this.renderer.setScissorTest(!0), this.renderer.setViewport(0, 0, s, i), this.renderer.setScissor(0, 0, s, i), this.renderer.render(this.sceneManager.scene, this.stereoCamera.cameraL), this.renderer.setViewport(s, 0, n, i), this.renderer.setScissor(s, 0, n, i), this.renderer.render(this.sceneManager.scene, this.stereoCamera.cameraR), this.renderer.setScissorTest(!1), this.renderer.setViewport(0, 0, t, i);
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
    const t = this.loadedModels.findIndex((i) => i.model === e);
    if (t >= 0) {
      const { url: i, tileset: s } = this.loadedModels[t];
      this.sceneManager.remove(e), s && this.tilesetLoader && this.tilesetLoader.disposeTileset(s), Vi(e), this.loadedModels.splice(t, 1), this.emit("model-removed", { model: e }), !this.loadedModels.some((r) => r.url === i) && this.modelLoader && this.modelLoader.releaseFromCache(i);
    }
  }
  clearModels() {
    this.arManager && this.arManager.setTargetModel(null);
    const e = new Set(this.loadedModels.map(({ url: t }) => t));
    this.loadedModels.forEach(({ model: t, tileset: i }) => {
      i && this.tilesetLoader && this.tilesetLoader.disposeTileset(i), Vi(t), this.sceneManager.remove(t);
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
    this.currentAbortController && this.currentAbortController.abort(), typeof window < "u" && Wn.cleanup(), this.vrManager && (this.vrManager.dispose(), this.vrManager = null), this.arManager && (this.arManager.dispose(), this.arManager = null), this.renderer && this.renderer.setAnimationLoop(null), this.loadedModels.forEach(({ model: e, tileset: t }) => {
      e.parent && e.parent.remove(e), t && this.tilesetLoader && this.tilesetLoader.disposeTileset(t), Vi(e);
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
const Jn = new ot(), Yt = new R();
class uo extends la {
  /**
   * Constructs a new line segments geometry.
   */
  constructor() {
    super(), this.isLineSegmentsGeometry = !0, this.type = "LineSegmentsGeometry";
    const e = [-1, 2, 0, 1, 2, 0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0, 0, -1, -1, 0, 1, -1, 0], t = [-1, 2, 1, 2, -1, 1, 1, 1, -1, -1, 1, -1, -1, -2, 1, -2], i = [0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5];
    this.setIndex(i), this.setAttribute("position", new ni(e, 3)), this.setAttribute("uv", new ni(t, 2));
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
    const i = new hs(t, 6, 1);
    return this.setAttribute("instanceStart", new Ue(i, 3, 0)), this.setAttribute("instanceEnd", new Ue(i, 3, 3)), this.instanceCount = this.attributes.instanceStart.count, this.computeBoundingBox(), this.computeBoundingSphere(), this;
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
    const i = new hs(t, 6, 1);
    return this.setAttribute("instanceColorStart", new Ue(i, 3, 0)), this.setAttribute("instanceColorEnd", new Ue(i, 3, 3)), this;
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
    return this.fromWireframeGeometry(new ca(e.geometry)), this;
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
    this.boundingBox === null && (this.boundingBox = new ot());
    const e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
    e !== void 0 && t !== void 0 && (this.boundingBox.setFromBufferAttribute(e), Jn.setFromBufferAttribute(t), this.boundingBox.union(Jn));
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new xt()), this.boundingBox === null && this.computeBoundingBox();
    const e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
    if (e !== void 0 && t !== void 0) {
      const i = this.boundingSphere.center;
      this.boundingBox.getCenter(i);
      let s = 0;
      for (let n = 0, r = e.count; n < r; n++)
        Yt.fromBufferAttribute(e, n), s = Math.max(s, i.distanceToSquared(Yt)), Yt.fromBufferAttribute(t, n), s = Math.max(s, i.distanceToSquared(Yt));
      this.boundingSphere.radius = Math.sqrt(s), isNaN(this.boundingSphere.radius) && console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.", this);
    }
  }
  toJSON() {
  }
}
ti.line = {
  worldUnits: { value: 1 },
  linewidth: { value: 1 },
  resolution: { value: new V(1, 1) },
  dashOffset: { value: 0 },
  dashScale: { value: 1 },
  dashSize: { value: 1 },
  gapSize: { value: 1 }
  // todo FIX - maybe change to totalSize
};
ei.line = {
  uniforms: Cr.merge([
    ti.common,
    ti.fog,
    ti.line
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
class Bt extends br {
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
      uniforms: Cr.clone(ei.line.uniforms),
      vertexShader: ei.line.vertexShader,
      fragmentShader: ei.line.fragmentShader,
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
const Xi = new at(), Xn = new R(), $n = new R(), W = new at(), J = new at(), pe = new at(), $i = new R(), Zi = new G(), X = new ha(), Zn = new R(), Wt = new ot(), Jt = new xt(), fe = new at();
let me, Ne;
function er(c, e, t) {
  return fe.set(0, 0, -e, 1).applyMatrix4(c.projectionMatrix), fe.multiplyScalar(1 / fe.w), fe.x = Ne / t.width, fe.y = Ne / t.height, fe.applyMatrix4(c.projectionMatrixInverse), fe.multiplyScalar(1 / fe.w), Math.abs(Math.max(fe.x, fe.y));
}
function Uh(c, e) {
  const t = c.matrixWorld, i = c.geometry, s = i.attributes.instanceStart, n = i.attributes.instanceEnd, r = Math.min(i.instanceCount, s.count);
  for (let o = 0, a = r; o < a; o++) {
    X.start.fromBufferAttribute(s, o), X.end.fromBufferAttribute(n, o), X.applyMatrix4(t);
    const l = new R(), d = new R();
    me.distanceSqToSegment(X.start, X.end, d, l), d.distanceTo(l) < Ne * 0.5 && e.push({
      point: d,
      pointOnLine: l,
      distance: me.origin.distanceTo(d),
      object: c,
      face: null,
      faceIndex: o,
      uv: null,
      uv1: null
    });
  }
}
function Vh(c, e, t) {
  const i = e.projectionMatrix, n = c.material.resolution, r = c.matrixWorld, o = c.geometry, a = o.attributes.instanceStart, l = o.attributes.instanceEnd, d = Math.min(o.instanceCount, a.count), h = -e.near;
  me.at(1, pe), pe.w = 1, pe.applyMatrix4(e.matrixWorldInverse), pe.applyMatrix4(i), pe.multiplyScalar(1 / pe.w), pe.x *= n.x / 2, pe.y *= n.y / 2, pe.z = 0, $i.copy(pe), Zi.multiplyMatrices(e.matrixWorldInverse, r);
  for (let u = 0, A = d; u < A; u++) {
    if (W.fromBufferAttribute(a, u), J.fromBufferAttribute(l, u), W.w = 1, J.w = 1, W.applyMatrix4(Zi), J.applyMatrix4(Zi), W.z > h && J.z > h)
      continue;
    if (W.z > h) {
      const E = W.z - J.z, C = (W.z - h) / E;
      W.lerp(J, C);
    } else if (J.z > h) {
      const E = J.z - W.z, C = (J.z - h) / E;
      J.lerp(W, C);
    }
    W.applyMatrix4(i), J.applyMatrix4(i), W.multiplyScalar(1 / W.w), J.multiplyScalar(1 / J.w), W.x *= n.x / 2, W.y *= n.y / 2, J.x *= n.x / 2, J.y *= n.y / 2, X.start.copy(W), X.start.z = 0, X.end.copy(J), X.end.z = 0;
    const f = X.closestPointToPointParameter($i, !0);
    X.at(f, Zn);
    const g = rt.lerp(W.z, J.z, f), b = g >= -1 && g <= 1, y = $i.distanceTo(Zn) < Ne * 0.5;
    if (b && y) {
      X.start.fromBufferAttribute(a, u), X.end.fromBufferAttribute(l, u), X.start.applyMatrix4(r), X.end.applyMatrix4(r);
      const E = new R(), C = new R();
      me.distanceSqToSegment(X.start, X.end, C, E), t.push({
        point: C,
        pointOnLine: E,
        distance: me.origin.distanceTo(C),
        object: c,
        face: null,
        faceIndex: u,
        uv: null,
        uv1: null
      });
    }
  }
}
class Nh extends fi {
  /**
   * Constructs a new wide line.
   *
   * @param {LineSegmentsGeometry} [geometry] - The line geometry.
   * @param {LineMaterial} [material] - The line material.
   */
  constructor(e = new uo(), t = new Bt({ color: Math.random() * 16777215 })) {
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
    for (let r = 0, o = 0, a = t.count; r < a; r++, o += 2)
      Xn.fromBufferAttribute(t, r), $n.fromBufferAttribute(i, r), s[o] = o === 0 ? 0 : s[o - 1], s[o + 1] = s[o] + Xn.distanceTo($n);
    const n = new hs(s, 2, 1);
    return e.setAttribute("instanceDistanceStart", new Ue(n, 1, 0)), e.setAttribute("instanceDistanceEnd", new Ue(n, 1, 1)), this;
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
    const n = e.params.Line2 !== void 0 && e.params.Line2.threshold || 0;
    me = e.ray;
    const r = this.matrixWorld, o = this.geometry, a = this.material;
    Ne = a.linewidth + n, o.boundingSphere === null && o.computeBoundingSphere(), Jt.copy(o.boundingSphere).applyMatrix4(r);
    let l;
    if (i)
      l = Ne * 0.5;
    else {
      const h = Math.max(s.near, Jt.distanceToPoint(me.origin));
      l = er(s, h, a.resolution);
    }
    if (Jt.radius += l, me.intersectsSphere(Jt) === !1)
      return;
    o.boundingBox === null && o.computeBoundingBox(), Wt.copy(o.boundingBox).applyMatrix4(r);
    let d;
    if (i)
      d = Ne * 0.5;
    else {
      const h = Math.max(s.near, Wt.distanceToPoint(me.origin));
      d = er(s, h, a.resolution);
    }
    Wt.expandByScalar(d), me.intersectsBox(Wt) !== !1 && (i ? Uh(this, t) : Vh(this, s, t));
  }
  onBeforeRender(e) {
    const t = this.material.uniforms;
    t && t.resolution && (e.getViewport(Xi), this.material.uniforms.resolution.value.set(Xi.z, Xi.w));
  }
}
class hi extends uo {
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
class bs extends Nh {
  /**
   * Constructs a new wide line.
   *
   * @param {LineGeometry} [geometry] - The line geometry.
   * @param {LineMaterial} [material] - The line material.
   */
  constructor(e = new hi(), t = new Bt({ color: Math.random() * 16777215 })) {
    super(e, t), this.isLine2 = !0, this.type = "Line2";
  }
}
class Gh {
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
      Array.isArray(s) ? s.forEach(i) : s && typeof s == "object" && (s.isObject3D || s.isMesh || s.traverse) && (s.updateMatrixWorld(!0), t.push(s));
    };
    i(e), this._raycastTargets = t;
  }
  getValidIntersections(e, t = null) {
    const i = t && t.length > 0 ? t : this._raycastTargets && this._raycastTargets.length > 0 ? this._raycastTargets : [];
    return !i || i.length === 0 ? [] : e.intersectObjects(i, !0).filter((n) => {
      const r = this.unifiedMeasurementPoints.some((l) => l.sphere === n.object), o = n.object === this.unifiedMeasurementLine, a = this.isMeasurementHelper(n.object);
      return !r && !o && !a;
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
  constructor({ scene: e, camera: t, renderer: i, controls: s, dolly: n, uiParent: r, getRaycastInfo: o, config: a = {}, theme: l = "dark", showMeasurementLabels: d = !1, allowScaleCalibration: h = !1, onScaleCalibration: u = null, onMeasurementChange: A = null }) {
    this.ghostSpheres = {
      left: null,
      right: null
    }, this.MAX_SPHERES = 2, this.measurementSpheres = [], this.measurementLine = null, this.measurementLabel = null, this.previousTriggerState = {}, this.unifiedMeasurementPoints = [], this.unifiedMeasurementLine = null, this.desktopMeasurementPoints = [], this.desktopMeasurementLine = null, typeof window < "u" && (window.measurementSystem = this), this.scene = e, this.camera = t, this.renderer = i, this.uiParent = r || null, this.getRaycastInfo = typeof o == "function" ? o : null, this.controls = s, this.dolly = n, this.config = a, this.theme = l, this.showMeasurementLabels = d, this.allowScaleCalibration = h === !0, this.onScaleCalibration = typeof u == "function" ? u : null, this.onMeasurementChange = typeof A == "function" ? A : null, this.scaleCalibrationMultiplier = 1, this.hasScaleCalibration = !1, this.isEditingScale = !1, this._suppressPanelClick = !1, this._suppressPanelClickTimer = null, this._panelLongPressTimer = null, this._panelLongPressStart = null, this._panelLongPressReady = !1, this._panelTouchActive = !1, this.scaleEditorUsesModal = !1, this._scaleModalViewportTracking = !1, this._scaleModalAnchor = null, this._boundUpdateScaleModalPosition = () => this.updateScaleModalPosition(), this._raycastTargets = e && e.children ? e.children : [], this.enabled = !0, this.isVR = !1, this.measurementPanel = null, this.desktopMeasurementMode = !1, this.measurementSystemEnabled = !0, this.measurementAvailable = !0, this.desktopMeasurementPoints = [], this.connectionLine = null, this.desktopMeasurementLine = null, this.measurementSprite = null, this.measurementCanvas = null, this.measurementTexture = null, this.lastClickTime = 0, this.lastTriggerTime = 0, this._wasInVR = !1, this.focusAnimation = null, this._cancelFocusOnUserInput = null, this.mouse = new m.Vector2(), this.raycaster = new m.Raycaster(), this.VR_DELETE_RADIUS = Number.isFinite(a.measurementDeleteRadius) ? Math.max(0, a.measurementDeleteRadius) : 0.025, this.VR_DELETE_CANCEL_RADIUS = this.VR_DELETE_RADIUS + 0.01, this.VR_DELETE_INTENT_DELAY_MS = 200, this.VR_DELETE_HOLD_MS = Number.isFinite(a.measurementDeleteHoldDuration) ? Math.max(this.VR_DELETE_INTENT_DELAY_MS + 100, a.measurementDeleteHoldDuration) : 1250, this.VR_DELETE_HOVER_DELAY_MS = 160, this._vrDeleteStates = /* @__PURE__ */ new Map(), this._vrDeleteHoverStates = /* @__PURE__ */ new Map();
    const p = () => {
      let f = null, g = null;
      const b = null, y = null;
      if (e && e.children && e.children.forEach((E) => {
        E && E.inputSource && E.inputSource.handedness && (E.inputSource.handedness === "left" && (f = E), E.inputSource.handedness === "right" && (g = E));
      }), (!f || !g) && i && i.xr && i.xr.getController)
        try {
          f = f || i.xr.getController(0), g = g || i.xr.getController(1);
        } catch {
        }
      f && g ? (this.attachVR({ controller1: f, controller2: g, controllerGrip1: b, controllerGrip2: y }), this.ghostSpheres && this.ghostSpheres.left && this.ghostSpheres.right && (this.ghostSpheres.left.visible = !0, this.ghostSpheres.right.visible = !0)) : (this._ghostSphereAttachRetries || (this._ghostSphereAttachRetries = 0), this._ghostSphereAttachRetries < 40 ? (this._ghostSphereAttachRetries++, setTimeout(p, 250)) : typeof window < "u" && window.console && console.warn("[MeasurementSystem] Could not find VR controllers to attach ghost spheres after multiple attempts."));
    };
    if (p(), i && i.xr && i.xr.addEventListener && i.xr.addEventListener("sessionstart", p), this.sphereGeometry = new m.SphereGeometry(0.02, 8, 6), this.placedMaterial = new m.MeshBasicMaterial({ color: 16777215 }), this.vrLineMaterial = new Bt({
      color: 16777215,
      linewidth: 3,
      transparent: !0,
      opacity: 0.8,
      depthTest: !1,
      vertexColors: !1,
      dashed: !1
    }), this.desktopLineMaterial = new Bt({
      color: 16777215,
      linewidth: 3,
      transparent: !0,
      opacity: 1,
      depthTest: !1,
      vertexColors: !1,
      dashed: !1
    }), this.MAX_DESKTOP_POINTS = 2, this.DRAG_THRESHOLD = 5, this.isDragging = !1, this.dragStartPosition = { x: 0, y: 0 }, this.createMeasurementPanel(), this.updateMeasurementPanel(), this._boundOnMouseClick = this.onMouseClick.bind(this), this._boundOnMouseDown = this.onMouseDown.bind(this), this._boundOnMouseMove = this.onMouseMove.bind(this), this._boundOnMouseUp = this.onMouseUp.bind(this), this.renderer.domElement.addEventListener("click", this._boundOnMouseClick, !1), this.renderer.domElement.addEventListener("mousedown", this._boundOnMouseDown, !1), this.renderer.domElement.addEventListener("mousemove", this._boundOnMouseMove, !1), this.renderer.domElement.addEventListener("mouseup", this._boundOnMouseUp, !1), i && i.xr && typeof i.xr.getController == "function") {
      const f = () => {
        if (i.xr.isPresenting) {
          const g = i.xr.getController(0), b = i.xr.getController(1), y = i.xr.getControllerGrip ? i.xr.getControllerGrip(0) : void 0, E = i.xr.getControllerGrip ? i.xr.getControllerGrip(1) : void 0;
          this.attachVR({ controller1: g, controller2: b, controllerGrip1: y, controllerGrip2: E });
        }
      };
      if (i.xr.addEventListener && i.xr.addEventListener("sessionstart", f), i.xr.isPresenting && f(), i.xr && typeof i.xr.requestSession == "function" && !i.xr._measurementSystemPatched) {
        const g = i.xr.requestSession.bind(i.xr);
        i.xr.requestSession = async (...b) => {
          const y = await g(...b);
          return setTimeout(() => {
            f();
          }, 100), y;
        }, i.xr._measurementSystemPatched = !0;
      }
    }
    setTimeout(() => {
      i && i.xr && typeof i.xr.isPresenting == "boolean" && i.xr.isPresenting && !this.isVR && console.warn("[MeasurementSystem] WARNING: attachVR() was never called. VR ghost spheres and VR measurement will not work.");
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
    this.cancelScaleCalibration(), this._cancelAllVRDeletionHolds();
    const e = this.unifiedMeasurementPoints?.length > 0;
    this.unifiedMeasurementPoints && this.unifiedMeasurementPoints.length > 0 && (this.unifiedMeasurementPoints.forEach((t) => {
      this._removeUnifiedMeasurementSphere(t.sphere);
    }), this.unifiedMeasurementPoints.length = 0), this.unifiedMeasurementLine && (this.scene.remove(this.unifiedMeasurementLine), this.unifiedMeasurementLine = null), this.measurementSprite && (this.measurementSprite.visible = !1, this.scene.remove(this.measurementSprite), this.measurementSprite = null), this.updateMeasurementPanel(), e && this._notifyMeasurementChange("cleared");
  }
  clearVRMeasurement() {
    this.measurementSpheres && (this.measurementSpheres.forEach((e) => this.scene.remove(e)), this.measurementSpheres.length = 0), this.measurementLine && (this.scene.remove(this.measurementLine), this.measurementLine = null), this.measurementLabel && (this.scene.remove(this.measurementLabel), this.measurementLabel = null), this.placedSpheres && (this.placedSpheres.forEach((e) => this.scene.remove(e)), this.placedSpheres.length = 0), this.connectionLine && (this.scene.remove(this.connectionLine), this.connectionLine = null), this.measurementSprite && (this.measurementSprite.visible = !1), this.measurementSystemEnabled = this.measurementAvailable, this.updateMeasurementPanel();
  }
  setMeasurementAvailability(e) {
    this.measurementAvailable = e !== !1, this.measurementAvailable ? (this.measurementSystemEnabled = !0, this.renderer && this.renderer.xr && this.renderer.xr.isPresenting && (this.ghostSpheres.left && (this.ghostSpheres.left.visible = !0), this.ghostSpheres.right && (this.ghostSpheres.right.visible = !0))) : (this.desktopMeasurementMode = !1, this.measurementSystemEnabled = !1, this.clearUnifiedMeasurement(), this.clearLegacyDesktopMeasurement(), this.clearLegacyVRMeasurement(), this.ghostSpheres.left && (this.ghostSpheres.left.visible = !1), this.ghostSpheres.right && (this.ghostSpheres.right.visible = !1), this.setRaycastTargets([])), this.updateMeasurementPanel();
  }
  setScaleCalibrationMultiplier(e = 1) {
    this.scaleCalibrationMultiplier = Number.isFinite(e) && e > 0 ? e : 1, this.hasScaleCalibration = Math.abs(this.scaleCalibrationMultiplier - 1) > Number.EPSILON, this.updateMeasurementPanel();
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
        const t = new m.Mesh(this.sphereGeometry, this.placedMaterial);
        t.position.copy(e.position), this.scene.add(t), this.measurementSpheres.push(t);
      }), this.measurementSpheres.length === 2) {
        const e = new m.BufferGeometry().setFromPoints([
          this.measurementSpheres[0].position,
          this.measurementSpheres[1].position
        ]), t = this.vrLineMaterial || new m.LineBasicMaterial({ color: 16777215, transparent: !0, opacity: 0.8, depthTest: !1 });
        this.connectionLine = new m.Line(e, t), this.scene.add(this.connectionLine), this.createMeasurementDisplay(this.measurementSpheres[0].position.distanceTo(this.measurementSpheres[1].position)), this.measurementSprite && !this.scene.children.includes(this.measurementSprite) && this.scene.add(this.measurementSprite);
      }
      this.measurementSystemEnabled = this.measurementAvailable, this.updateMeasurementPanel();
    }
  }
  syncToDesktop() {
    if (this.measurementSpheres && this.measurementSpheres.length === 2) {
      this.clearLegacyDesktopMeasurement();
      for (let e = 0; e < 2; e++) {
        const t = this.measurementSpheres[e].position.clone();
        let i = t;
        if (this._raycastTargets && this._raycastTargets.length > 0 && this.camera) {
          const n = t.clone().sub(this.camera.position).normalize(), r = new m.Raycaster(this.camera.position, n), o = this.getValidIntersections(r);
          o.length > 0 && (i = o[0].point);
        }
        const s = new m.Mesh(this.sphereGeometry, this.placedMaterial);
        s.position.copy(i), this.scene.add(s), this.desktopMeasurementPoints.push(s);
      }
      if (this.desktopMeasurementPoints.length === 2) {
        const e = new hi();
        e.setPositions([
          this.desktopMeasurementPoints[0].position.x,
          this.desktopMeasurementPoints[0].position.y,
          this.desktopMeasurementPoints[0].position.z,
          this.desktopMeasurementPoints[1].position.x,
          this.desktopMeasurementPoints[1].position.y,
          this.desktopMeasurementPoints[1].position.z
        ]), this.desktopMeasurementLine = new bs(e, this.desktopLineMaterial), this.desktopMeasurementLine.computeLineDistances(), this.scene.add(this.desktopMeasurementLine);
        const t = this.desktopMeasurementPoints[0].position.distanceTo(this.desktopMeasurementPoints[1].position);
        if (this.createMeasurementDisplay(t), this.measurementSprite) {
          const i = new m.Vector3();
          i.addVectors(this.desktopMeasurementPoints[0].position, this.desktopMeasurementPoints[1].position), i.multiplyScalar(0.5);
          const s = Math.max(0.05, Math.min(0.2, t * 0.03));
          i.y += s, this.measurementSprite.position.copy(i), this.measurementSprite.visible = !1, this.scene.children.includes(this.measurementSprite) || this.scene.add(this.measurementSprite);
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
    const t = (window.devicePixelRatio || 1) * 4, i = 256, s = 64, n = i * t, r = s * t;
    this.measurementCanvas || (this.measurementCanvas = document.createElement("canvas")), (this.measurementCanvas.width !== n || this.measurementCanvas.height !== r) && (this.measurementCanvas.width = n, this.measurementCanvas.height = r);
    const o = this.measurementCanvas.getContext("2d");
    o.setTransform(1, 0, 0, 1, 0, 0), o.clearRect(0, 0, n, r), o.save(), o.scale(t, t);
    const a = 24;
    let l;
    e <= 2 ? l = 0.4 + e / 2 * 0.3 : e <= 4 ? l = 0.7 + (e - 2) / 2 * 0.2 : l = 0.9 + Math.min((e - 4) / 16, 1) * 0.5;
    const d = Math.round(a * l);
    o.font = `600 ${d}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`;
    const h = this.formatDistance(e), A = o.measureText(h).width, p = d, f = Math.max(6, d * 0.3), g = A + f * 2, b = p + f * 2, y = (i - g) / 2, E = (s - b) / 2;
    if (o.fillStyle = "rgba(0, 0, 0, 0.8)", o.beginPath(), o.roundRect(y, E, g, b, Math.max(4, d * 0.2)), o.fill(), o.fillStyle = "white", o.textAlign = "center", o.textBaseline = "middle", o.fillText(h, i / 2, s / 2), o.restore(), this.measurementTexture ? this.measurementTexture.needsUpdate = !0 : (this.measurementTexture = new m.CanvasTexture(this.measurementCanvas), this.measurementTexture.minFilter = m.LinearFilter, this.measurementTexture.magFilter = m.LinearFilter), !this.measurementSprite) {
      const v = new m.SpriteMaterial({
        map: this.measurementTexture,
        depthTest: !1,
        depthWrite: !1
      });
      this.measurementSprite = new m.Sprite(v);
    }
    const w = 0.3 * l, S = i / s;
    return this.measurementSprite.scale.set(w * S, w, 1), this.measurementSprite;
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
  attachVR({ controller1: e, controller2: t, controllerGrip1: i, controllerGrip2: s }) {
    this._onVRTriggerDown && [this.controller1, this.controller2].forEach((r) => {
      r && (r.removeEventListener("selectstart", this._onVRTriggerDown), r.removeEventListener("selectend", this._onVRTriggerUp), r.removeEventListener("ybuttondown", this._onVRYButtonDown), r.removeEventListener("ybuttonup", this._onVRYButtonUp));
    }), this.controller1 = e, this.controller2 = t, this.controllerGrip1 = i, this.controllerGrip2 = s;
    const n = new m.MeshBasicMaterial({
      color: 8947848,
      // ghostly grey
      transparent: !0,
      opacity: 0.25,
      depthTest: !1,
      depthWrite: !1
    });
    this.ghostSpheres.left && this.ghostSpheres.left.parent && this.ghostSpheres.left.parent.remove(this.ghostSpheres.left), this.ghostSpheres.right && this.ghostSpheres.right.parent && this.ghostSpheres.right.parent.remove(this.ghostSpheres.right), this.ghostSpheres.left = new m.Mesh(this.sphereGeometry, n.clone()), this.ghostSpheres.right = new m.Mesh(this.sphereGeometry, n.clone()), this.ghostSpheres.left.scale.set(0.5, 0.5, 0.5), this.ghostSpheres.right.scale.set(0.5, 0.5, 0.5), this.ghostSpheres.left.position.set(0, 0, -0.07), this.ghostSpheres.right.position.set(0, 0, -0.07), this.ghostSpheres.left.visible = !0, this.ghostSpheres.right.visible = !0, this.controller1 && this.controller1.add(this.ghostSpheres.left), this.controller2 && this.controller2.add(this.ghostSpheres.right), this.yButtonPressed = !1, this.MAX_SPHERES = 2, this.triggerState = {
      left: !1,
      right: !1
    }, this._onVRTriggerDown || (this._onVRTriggerDown = this._handleVRTriggerDown.bind(this), this._onVRTriggerUp = this._handleVRTriggerUp.bind(this), this._onVRYButtonDown = this._handleVRYButtonDown.bind(this), this._onVRYButtonUp = this._handleVRYButtonUp.bind(this)), this.controller1 && this.controller2 && (this.controller1.addEventListener("selectstart", this._onVRTriggerDown), this.controller1.addEventListener("selectend", this._onVRTriggerUp), this.controller2.addEventListener("selectstart", this._onVRTriggerDown), this.controller2.addEventListener("selectend", this._onVRTriggerUp), this.controller1.addEventListener("ybuttondown", this._onVRYButtonDown), this.controller1.addEventListener("ybuttonup", this._onVRYButtonUp), this.controller2.addEventListener("ybuttondown", this._onVRYButtonDown), this.controller2.addEventListener("ybuttonup", this._onVRYButtonUp)), this.isVR = !0, this.refreshMeasurementDisplayForVR();
  }
  _handleVRTriggerDown(e) {
    if (!this.measurementAvailable || !this.measurementSystemEnabled) return;
    const t = e.target, i = this._findNearbyUnifiedMeasurementPoint(t);
    i && this._startVRDeletionHold(t, i, e.data);
  }
  _handleVRTriggerUp(e) {
    const t = e.target;
    if (t?.userData?.belowjsAnnotationTrigger) {
      t.userData.belowjsAnnotationTrigger = !1;
      const n = this._vrDeleteStates.get(t);
      n && (this._disposeVRDeleteVisual(n), this._vrDeleteStates.delete(t));
      return;
    }
    const i = this._vrDeleteStates.get(t);
    if (i) {
      const n = i.completedAt !== null || !this.unifiedMeasurementPoints.includes(i.point);
      if (this._disposeVRDeleteVisual(i), this._vrDeleteStates.delete(t), n) return;
    }
    if (!this.measurementAvailable) return;
    const s = performance.now();
    if (!(this.lastTriggerTime && s - this.lastTriggerTime < 200) && (this.lastTriggerTime = s, this.measurementSystemEnabled)) {
      const n = new m.Vector3();
      let r = null;
      if (t === this.controller1 && this.ghostSpheres.left ? r = this.ghostSpheres.left : t === this.controller2 && this.ghostSpheres.right && (r = this.ghostSpheres.right), r)
        r.getWorldPosition(n);
      else {
        t.getWorldPosition(n);
        const o = new m.Vector3(0, 0, -0.05);
        o.applyQuaternion(t.quaternion), n.add(o);
      }
      this._placeVRMeasurementPoint(n);
    }
  }
  _handleVRYButtonDown() {
    this.clearUnifiedMeasurement();
  }
  _handleVRYButtonUp() {
  }
  _getVRControllerPosition(e, t = new m.Vector3()) {
    const i = this._getGhostSphereForController(e);
    if (i)
      i.getWorldPosition(t);
    else {
      e.getWorldPosition(t);
      const s = new m.Vector3(0, 0, -0.05);
      e.getWorldQuaternion(this._vrControllerQuaternion || (this._vrControllerQuaternion = new m.Quaternion())), s.applyQuaternion(this._vrControllerQuaternion), t.add(s);
    }
    return t;
  }
  _getGhostSphereForController(e) {
    return e === this.controller1 ? this.ghostSpheres.left : e === this.controller2 ? this.ghostSpheres.right : null;
  }
  _getNearbyUnifiedMeasurementPoint(e, t = this.VR_DELETE_RADIUS) {
    if (!e || !this.unifiedMeasurementPoints.length) return null;
    const i = this._getVRControllerPosition(e);
    let s = null, n = t;
    return this.unifiedMeasurementPoints.forEach((r) => {
      const o = i.distanceTo(r.position);
      o <= n && (s = r, n = o);
    }), s ? { point: s, distance: n } : null;
  }
  _findNearbyUnifiedMeasurementPoint(e) {
    return this._getNearbyUnifiedMeasurementPoint(e)?.point || null;
  }
  _startVRDeletionHold(e, t, i) {
    const s = this._vrDeleteStates.get(e);
    s && this._disposeVRDeleteVisual(s), this._vrDeleteHoverStates.delete(e);
    const n = {
      controller: e,
      point: t,
      inputSource: i,
      startedAt: performance.now(),
      completedAt: null,
      inRange: !0,
      progress: 0,
      visual: this._createVRDeleteVisual(t.position)
    };
    this._vrDeleteStates.set(e, n), this._pulseVRController(n, 0.12, 24);
  }
  _createVRDeleteVisual(e) {
    const t = document.createElement("canvas");
    t.width = 128, t.height = 128;
    const i = new m.CanvasTexture(t);
    i.minFilter = m.LinearFilter, i.magFilter = m.LinearFilter;
    const s = new m.SpriteMaterial({
      map: i,
      transparent: !0,
      depthTest: !1,
      depthWrite: !1
    }), n = new m.Sprite(s);
    n.name = "MeasurementHelperDeleteProgress", n.position.copy(e), n.scale.set(0.05, 0.05, 1), n.renderOrder = 1e3, this.scene.add(n);
    const r = { canvas: t, texture: i, material: s, sprite: n };
    return this._drawVRDeleteProgress(r, 0), r;
  }
  _drawVRDeleteProgress(e, t) {
    if (!e) return;
    const i = e.canvas.getContext("2d"), s = e.canvas.width, n = s / 2, r = s * 0.37, o = Math.max(0, Math.min(t, 1));
    if (i.clearRect(0, 0, s, s), i.beginPath(), i.arc(n, n, r - 8, 0, Math.PI * 2), i.fillStyle = "rgba(5, 12, 22, 0.58)", i.fill(), i.beginPath(), i.arc(n, n, r, 0, Math.PI * 2), i.strokeStyle = "rgba(255, 255, 255, 0.34)", i.lineWidth = 12, i.stroke(), o > 0) {
      const l = Math.round(194 - 77 * o), d = Math.round(107 - 15 * o);
      i.beginPath(), i.arc(n, n, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * o), i.strokeStyle = `rgba(255, ${l}, ${d}, 0.98)`, i.lineWidth = 14, i.lineCap = "round", i.stroke();
    }
    const a = 13 + o * 2;
    i.beginPath(), i.moveTo(n - a, n - a), i.lineTo(n + a, n + a), i.moveTo(n + a, n - a), i.lineTo(n - a, n + a), i.strokeStyle = `rgba(255, 255, 255, ${0.72 + o * 0.28})`, i.lineWidth = 8, i.lineCap = "round", i.stroke(), e.texture.needsUpdate = !0;
  }
  _updateVRDeletionHolds(e) {
    this._vrDeleteStates.forEach((t) => {
      if (t.completedAt !== null) {
        if (t.visual) {
          const a = Math.min((e - t.completedAt) / 180, 1), l = 0.05 + a * 0.014;
          t.visual.sprite.scale.set(l, l, 1), t.visual.sprite.material.opacity = 1 - a, a >= 1 && this._disposeVRDeleteVisual(t);
        }
        return;
      }
      if (!this.unifiedMeasurementPoints.includes(t.point)) {
        t.startedAt = null, this._disposeVRDeleteVisual(t);
        return;
      }
      const i = this._getVRControllerPosition(t.controller), s = t.startedAt === null ? this.VR_DELETE_RADIUS : this.VR_DELETE_CANCEL_RADIUS;
      if (!(i.distanceTo(t.point.position) <= s)) {
        t.startedAt = null, t.inRange = !1, t.progress = 0, this._drawVRDeleteProgress(t.visual, 0), t.visual && (t.visual.material.opacity = 0.45);
        return;
      }
      t.startedAt === null && (t.startedAt = e), t.inRange = !0, t.visual && (t.visual.material.opacity = 1);
      const r = e - t.startedAt, o = this.VR_DELETE_HOLD_MS - this.VR_DELETE_INTENT_DELAY_MS;
      t.progress = Math.min(
        Math.max((r - this.VR_DELETE_INTENT_DELAY_MS) / o, 0),
        1
      ), this._drawVRDeleteProgress(t.visual, t.progress), t.progress >= 1 && (this.removeUnifiedMeasurementPoint(t.point), t.completedAt = e, this._pulseVRController(t, 0.65, 80));
    });
  }
  _pulseVRController(e, t, i) {
    const s = e.inputSource?.gamepad || e.controller?.inputSource?.gamepad, n = s?.hapticActuators?.[0] || s?.vibrationActuator;
    !n || typeof n.pulse != "function" || Promise.resolve(n.pulse(t, i)).catch(() => {
    });
  }
  _updateVRDeleteFeedback(e) {
    this.unifiedMeasurementPoints.forEach((i) => {
      if (!i.sphere) return;
      const s = i.sphere.userData.measurementBaseScale ?? 0.5;
      i.sphere.scale.setScalar(s), i.sphere.material?.color && i.sphere.material.color.set(16777215);
    });
    const t = [this.controller1, this.controller2].filter(Boolean);
    if (t.forEach((i) => {
      const s = this._getGhostSphereForController(i);
      s && (s.scale.setScalar(0.5), s.material.color.set(8947848), s.material.opacity = 0.25);
    }), !this.measurementAvailable || !this.measurementSystemEnabled) {
      this._vrDeleteHoverStates.clear();
      return;
    }
    t.forEach((i) => {
      const s = this._getGhostSphereForController(i), n = this._vrDeleteStates.get(i);
      if (n) {
        if (n.completedAt !== null) {
          const h = Math.min((e - n.completedAt) / 180, 1);
          s && h < 1 && (s.scale.setScalar(0.66 - h * 0.16), s.material.color.set(16741724).lerp(new m.Color(16777215), 1 - h), s.material.opacity = 0.72 - h * 0.47);
          return;
        }
        if (n.inRange !== !1 && this.unifiedMeasurementPoints.includes(n.point)) {
          const h = 0.5 + Math.sin(e / 90) * 0.5, u = n.progress || 0, A = new m.Color(16761451).lerp(new m.Color(16741724), u);
          this._styleMeasurementPointForDelete(n.point, A, 1.13 + h * 0.035), s && (s.scale.setScalar(0.57 + h * 0.025), s.material.color.copy(A), s.material.opacity = 0.58 + u * 0.12);
        }
        return;
      }
      const r = this._getNearbyUnifiedMeasurementPoint(i);
      if (!r) {
        this._vrDeleteHoverStates.delete(i);
        return;
      }
      const o = this._vrDeleteHoverStates.get(i);
      if (!o || o.point !== r.point) {
        this._vrDeleteHoverStates.set(i, { point: r.point, startedAt: e });
        return;
      }
      if (e - o.startedAt < this.VR_DELETE_HOVER_DELAY_MS) return;
      const a = 1 - r.distance / Math.max(this.VR_DELETE_RADIUS, Number.EPSILON), l = 0.5 + Math.sin(e / 180) * 0.5, d = new m.Color(16766880);
      this._styleMeasurementPointForDelete(r.point, d, 1.07 + l * 0.018), s && (s.scale.setScalar(0.53 + a * 0.025), s.material.color.copy(d), s.material.opacity = 0.34 + a * 0.12);
    });
  }
  _styleMeasurementPointForDelete(e, t, i) {
    if (!e?.sphere) return;
    const s = e.sphere.userData.measurementBaseScale ?? 0.5;
    e.sphere.scale.setScalar(s * i), e.sphere.material?.color && e.sphere.material.color.copy(t);
  }
  _disposeVRDeleteVisual(e) {
    if (!e?.visual) return;
    const { sprite: t, material: i, texture: s } = e.visual;
    t.parent && t.parent.remove(t), i.dispose(), s.dispose(), e.visual = null;
  }
  _cancelAllVRDeletionHolds() {
    this._vrDeleteStates && (this._vrDeleteStates.forEach((e) => {
      e.startedAt = null, e.progress = 0, this._disposeVRDeleteVisual(e);
    }), this._vrDeleteStates.clear(), this._vrDeleteHoverStates.clear());
  }
  _getVRControllerIntersection(e) {
    const t = new m.Matrix4();
    t.identity().extractRotation(e.matrixWorld);
    const i = new m.Vector3(), s = new m.Vector3(0, 0, -1).applyMatrix4(t);
    e.getWorldPosition(i);
    const n = new m.Raycaster(i, s.normalize()), r = this.scene && this.scene.children ? this.scene.children : [], o = this.getValidIntersections(n, r);
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
      const s = this.unifiedMeasurementPoints.shift();
      this._removeUnifiedMeasurementSphere(s.sphere);
    }
    const i = new m.Mesh(this.sphereGeometry, this.placedMaterial.clone());
    i.position.copy(e), i.scale.setScalar(0.5), i.userData.isMeasurementSphere = !0, i.userData.measurementBaseScale = 0.5, this.scene.add(i), this.unifiedMeasurementPoints.push({
      position: e.clone(),
      sphere: i,
      source: t
    }), this.updateUnifiedMeasurementLine(), this.updateMeasurementPanel(), this._notifyMeasurementChange("point-added", { source: t });
  }
  removeUnifiedMeasurementPoint(e) {
    this.cancelScaleCalibration();
    const t = this.unifiedMeasurementPoints.indexOf(e);
    if (t === -1) return !1;
    const [i] = this.unifiedMeasurementPoints.splice(t, 1);
    return this._removeUnifiedMeasurementSphere(i.sphere), this.updateUnifiedMeasurementLine(), this.updateMeasurementPanel(), this._notifyMeasurementChange("point-removed", { source: i.source }), !0;
  }
  _notifyMeasurementChange(e, t = {}) {
    if (!this.onMeasurementChange) return;
    const i = this.unifiedMeasurementPoints.map((n) => ({
      position: {
        x: n.position.x,
        y: n.position.y,
        z: n.position.z
      },
      source: n.source
    })), s = i.length === 2 ? {
      start: { ...i[0].position },
      end: { ...i[1].position },
      length: this.unifiedMeasurementPoints[0].position.distanceTo(this.unifiedMeasurementPoints[1].position)
    } : null;
    this.onMeasurementChange({
      reason: e,
      pointCount: i.length,
      points: i,
      line: s,
      ...t
    });
  }
  _removeUnifiedMeasurementSphere(e) {
    e && (e.parent && e.parent.remove(e), e.material && e.material !== this.placedMaterial && e.material.dispose());
  }
  /**
   * Update the unified measurement line connecting the points
   */
  updateUnifiedMeasurementLine() {
    if (this.unifiedMeasurementLine && (this.scene.remove(this.unifiedMeasurementLine), this.unifiedMeasurementLine = null), this.unifiedMeasurementPoints.length !== 2 && (this.measurementSprite && (this.measurementSprite.visible = !1, this.measurementSprite.parent && this.measurementSprite.parent.remove(this.measurementSprite)), this.unifiedMeasurementPoints.forEach((e) => {
      e.sphere && (e.sphere.userData.measurementBaseScale = 0.5, e.sphere.scale.setScalar(0.5));
    })), this.unifiedMeasurementPoints.length === 2) {
      const e = this.unifiedMeasurementPoints[0].position, t = this.unifiedMeasurementPoints[1].position, i = new hi();
      i.setPositions([
        e.x,
        e.y,
        e.z,
        t.x,
        t.y,
        t.z
      ]), this.unifiedMeasurementLine = new bs(i, this.desktopLineMaterial), this.unifiedMeasurementLine.computeLineDistances(), this.unifiedMeasurementLine.userData.isMeasurementLine = !0, this.scene.add(this.unifiedMeasurementLine);
      const s = e.distanceTo(t);
      this.createMeasurementDisplay(s);
      const n = s * 100 <= 20 ? 0.125 : 0.5;
      if (this.unifiedMeasurementPoints.forEach((r) => {
        r.sphere && (r.sphere.userData.measurementBaseScale = n, r.sphere.scale.setScalar(n));
      }), this.measurementSprite) {
        const r = new m.Vector3();
        r.addVectors(e, t), r.multiplyScalar(0.5);
        const o = Math.max(0.05, Math.min(0.2, s * 0.03));
        r.y += o, this.measurementSprite.position.copy(r), this.scene.children.includes(this.measurementSprite) || this.scene.add(this.measurementSprite);
        const a = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting;
        this.measurementSprite.visible = a || this.showMeasurementLabels;
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
    const e = performance.now();
    if (this._vrDeleteStates.size > 0 && this._updateVRDeletionHolds(e), this.isVR && this.ghostSpheres && this._updateVRDeleteFeedback(e), this.isVR && this.ghostSpheres && (this.ghostSpheres.left && this.controller1 && this.ghostSpheres.left.visible && this.ghostSpheres.left.position.length() > 1 && this.resetGhostSpherePositions(), this.ghostSpheres.right && this.controller2 && this.ghostSpheres.right.visible && this.ghostSpheres.right.position.length() > 1 && this.resetGhostSpherePositions()), this.measurementSprite) {
      const t = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting, i = this.unifiedMeasurementPoints && this.unifiedMeasurementPoints.length === 2;
      this.measurementSprite.visible = i && (t || this.showMeasurementLabels);
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
    clearTimeout(this._suppressPanelClickTimer), this._suppressPanelClickTimer = null, this.cancelScaleCalibration(), this.stopScaleModalViewportTracking(), this.measurementScaleModal?.parentNode && this.measurementScaleModal.remove(), this.measurementScaleModal = null, this.measurementModalUi = null, this.measurementPanel && this.measurementPanel.parentNode && (this.measurementPanel.parentNode.removeChild(this.measurementPanel), this.measurementPanel = null), this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null), this.controls && this._cancelFocusOnUserInput && (this.controls.removeEventListener("start", this._cancelFocusOnUserInput), this._cancelFocusOnUserInput = null), this.renderer.domElement.removeEventListener("click", this._boundOnMouseClick, !1), this.renderer.domElement.removeEventListener("mousedown", this._boundOnMouseDown, !1), this.renderer.domElement.removeEventListener("mousemove", this._boundOnMouseMove, !1), this.renderer.domElement.removeEventListener("mouseup", this._boundOnMouseUp, !1), [this.controller1, this.controller2].forEach((e) => {
      e && (e.removeEventListener("selectstart", this._onVRTriggerDown), e.removeEventListener("selectend", this._onVRTriggerUp), e.removeEventListener("ybuttondown", this._onVRYButtonDown), e.removeEventListener("ybuttonup", this._onVRYButtonUp));
    }), this._vrDeleteStates.forEach((e) => this._disposeVRDeleteVisual(e)), this._vrDeleteStates.clear(), this._vrDeleteHoverStates.clear(), this.clearLegacyDesktopMeasurement(), this.clearVRMeasurement(), this.ghostSpheres && (this.ghostSpheres.left && this.scene.remove(this.ghostSpheres.left), this.ghostSpheres.right && this.scene.remove(this.ghostSpheres.right), this.ghostSpheres = null), this.measurementSprite && this.scene.children.includes(this.measurementSprite) && (this.scene.remove(this.measurementSprite), this.measurementSprite = null), this.connectionLine && this.scene.children.includes(this.connectionLine) && (this.scene.remove(this.connectionLine), this.connectionLine = null), this.measurementSpheres = [], this.isVR = !1, typeof window < "u" && window.measurementSystem === this && (window.measurementSystem = void 0);
  }
  createMeasurementPanel() {
    const e = document.createElement("div");
    e.className = `measurement-panel${this.theme === "light" ? " light-theme" : ""}`, e.innerHTML = `
      <div class="measurement-status">
        <div class="measurement-status-primary"></div>
        <div class="measurement-panel-hint"></div>
      </div>
      <form class="measurement-scale-editor" hidden>
        <div class="measurement-scale-row">
          <input class="measurement-scale-input" type="text" inputmode="decimal" enterkeyhint="done" readonly aria-label="Correct measurement">
          <span class="measurement-scale-unit"></span>
          <button class="measurement-scale-confirm" type="submit" aria-label="Confirm and rescale">&#10003;</button>
        </div>
        <label class="measurement-scale-factor-row">
          <span>Scale</span>
          <input class="measurement-scale-factor-input" type="text" inputmode="decimal" enterkeyhint="done" aria-label="Correct scale multiplier">
          <span>&times;</span>
        </label>
      </form>
    `, this.measurementUi = {
      status: e.querySelector(".measurement-status"),
      primary: e.querySelector(".measurement-status-primary"),
      statusHint: e.querySelector(".measurement-panel-hint"),
      editor: e.querySelector(".measurement-scale-editor"),
      input: e.querySelector(".measurement-scale-input"),
      unit: e.querySelector(".measurement-scale-unit"),
      confirm: e.querySelector(".measurement-scale-confirm"),
      factorInput: e.querySelector(".measurement-scale-factor-input")
    }, e.addEventListener("click", (i) => {
      if (this._suppressPanelClick || this.isEditingScale) {
        this._suppressPanelClick = !1;
        return;
      }
      if (!this.measurementAvailable) {
        this.updateMeasurementPanel();
        return;
      }
      this.toggleMeasurementPanelState();
    }), e.addEventListener("contextmenu", (i) => {
      this.canEditScaleCalibration() && (i.preventDefault(), i.stopPropagation(), !this._panelTouchActive && this.beginScaleCalibration({ selectValue: !0 }));
    }), e.addEventListener("pointerdown", (i) => {
      i.pointerType === "touch" || !this.canEditScaleCalibration() || i.pointerType === "mouse" && i.button !== 0 || (this._clearPanelLongPress(), this._panelLongPressStart = { x: i.clientX, y: i.clientY }, this._panelLongPressTimer = setTimeout(() => {
        this._panelLongPressTimer = null, this._panelLongPressReady = !0, this.beginScaleCalibration({ selectValue: !0, focusInput: !0 });
      }, 550));
    }), e.addEventListener("pointermove", (i) => {
      if (!this._panelLongPressTimer || !this._panelLongPressStart) return;
      Math.hypot(
        i.clientX - this._panelLongPressStart.x,
        i.clientY - this._panelLongPressStart.y
      ) > 8 && this._clearPanelLongPress();
    }), e.addEventListener("pointerup", (i) => {
      this._completePanelLongPress(i);
    }), e.addEventListener("touchstart", (i) => {
      if (i.touches.length !== 1 || !this.canEditScaleCalibration()) return;
      this._clearPanelLongPress();
      const s = i.touches[0];
      this._panelTouchActive = !0, this._panelLongPressStart = { x: s.clientX, y: s.clientY }, this._panelLongPressTimer = setTimeout(() => {
        this._panelLongPressTimer = null, this._panelLongPressReady = !0, this.beginScaleCalibration({ selectValue: !0, focusInput: !1 });
      }, 550);
    }, { passive: !0 }), e.addEventListener("touchmove", (i) => {
      if (!this._panelLongPressStart || i.touches.length !== 1) return;
      const s = i.touches[0];
      Math.hypot(
        s.clientX - this._panelLongPressStart.x,
        s.clientY - this._panelLongPressStart.y
      ) > 8 && this._clearPanelLongPress();
    }, { passive: !0 }), e.addEventListener("touchend", (i) => {
      this._completePanelLongPress(i, !0);
    }, { passive: !0 }), e.addEventListener("touchcancel", () => this._clearPanelLongPress()), e.addEventListener("pointercancel", () => this._clearPanelLongPress()), this.measurementUi.editor.addEventListener("click", (i) => {
      this.isEditingScale && i.stopPropagation();
    }), this.measurementUi.editor.addEventListener("submit", (i) => {
      i.preventDefault(), i.stopPropagation(), this.confirmScaleCalibration();
    }), this.measurementUi.input.addEventListener("keydown", (i) => {
      i.key === "Enter" && (i.preventDefault(), this.confirmScaleCalibration()), i.key === "Escape" && this.cancelScaleCalibration();
    }), this.measurementUi.factorInput.addEventListener("keydown", (i) => {
      i.key === "Enter" && (i.preventDefault(), this.confirmScaleCalibration()), i.key === "Escape" && this.cancelScaleCalibration();
    }), this.measurementUi.input.addEventListener("input", () => {
      this._scaleCalibrationEditSource = "measurement", this.syncScaleFactorFromMeasurement(this.measurementUi);
    }), this.measurementUi.factorInput.addEventListener("input", () => {
      this._scaleCalibrationEditSource = "factor", this.syncMeasurementFromScaleFactor(this.measurementUi);
    });
    const t = this.uiParent || this.renderer && this.renderer.domElement && this.renderer.domElement.parentElement || document.body;
    t.appendChild(e), this.measurementPanel = e, this.createMeasurementScaleModal(t);
  }
  toggleMeasurementPanelState() {
    if (!(this.renderer && this.renderer.xr && this.renderer.xr.isPresenting)) {
      this.desktopMeasurementMode = !this.desktopMeasurementMode, this.desktopMeasurementMode || this.clearUnifiedMeasurement(), this.updateMeasurementPanel();
      return;
    }
    this.measurementSystemEnabled = !this.measurementSystemEnabled, this.measurementSystemEnabled ? (this.ghostSpheres.left && (this.ghostSpheres.left.visible = !0), this.ghostSpheres.right && (this.ghostSpheres.right.visible = !0), this.resetGhostSpherePositions()) : (this.clearUnifiedMeasurement(), this.ghostSpheres.left && (this.ghostSpheres.left.visible = !1), this.ghostSpheres.right && (this.ghostSpheres.right.visible = !1)), this.updateMeasurementPanel();
  }
  createMeasurementScaleModal(e) {
    const t = document.createElement("div");
    t.className = "measurement-scale-modal", t.hidden = !0, t.innerHTML = `
      <form class="measurement-scale-modal-card">
        <div class="measurement-scale-modal-title">Correct measurement</div>
        <div class="measurement-scale-modal-row">
          <input class="measurement-scale-modal-input" type="text" inputmode="decimal" enterkeyhint="done" aria-label="Correct measurement value">
          <span class="measurement-scale-modal-unit"></span>
          <button class="measurement-scale-modal-confirm" type="submit" aria-label="Confirm and rescale">&#10003;</button>
        </div>
        <label class="measurement-scale-modal-factor-row">
          <span>Scale</span>
          <input class="measurement-scale-modal-factor-input" type="text" inputmode="decimal" enterkeyhint="done" aria-label="Correct scale multiplier">
          <span>&times;</span>
        </label>
      </form>
    `, this.measurementModalUi = {
      card: t.querySelector(".measurement-scale-modal-card"),
      input: t.querySelector(".measurement-scale-modal-input"),
      unit: t.querySelector(".measurement-scale-modal-unit"),
      factorInput: t.querySelector(".measurement-scale-modal-factor-input")
    }, this.measurementModalUi.card.addEventListener("submit", (i) => {
      i.preventDefault(), i.stopPropagation(), this.confirmScaleCalibration();
    }), this.measurementModalUi.input.addEventListener("keydown", (i) => {
      i.key === "Enter" && (i.preventDefault(), this.confirmScaleCalibration()), i.key === "Escape" && this.cancelScaleCalibration();
    }), this.measurementModalUi.factorInput.addEventListener("keydown", (i) => {
      i.key === "Enter" && (i.preventDefault(), this.confirmScaleCalibration()), i.key === "Escape" && this.cancelScaleCalibration();
    }), this.measurementModalUi.input.addEventListener("input", () => {
      this._scaleCalibrationEditSource = "measurement", this.syncScaleFactorFromMeasurement(this.measurementModalUi);
    }), this.measurementModalUi.factorInput.addEventListener("input", () => {
      this._scaleCalibrationEditSource = "factor", this.syncMeasurementFromScaleFactor(this.measurementModalUi);
    }), t.addEventListener("pointerdown", (i) => {
      i.target === t && (i.preventDefault(), i.stopPropagation(), this.cancelScaleCalibration());
    }), e.appendChild(t), this.measurementScaleModal = t;
  }
  startScaleModalViewportTracking() {
    const e = typeof window < "u" ? window.visualViewport : null;
    e && (this._scaleModalViewportTracking || (e.addEventListener("resize", this._boundUpdateScaleModalPosition), e.addEventListener("scroll", this._boundUpdateScaleModalPosition), this._scaleModalViewportTracking = !0), this.updateScaleModalPosition());
  }
  stopScaleModalViewportTracking() {
    const e = typeof window < "u" ? window.visualViewport : null;
    e && (e.removeEventListener("resize", this._boundUpdateScaleModalPosition), e.removeEventListener("scroll", this._boundUpdateScaleModalPosition)), this._scaleModalViewportTracking = !1, this._scaleModalAnchor = null;
    const t = this.measurementModalUi?.card;
    t && (t.style.left = "", t.style.top = "");
  }
  updateScaleModalPosition() {
    const e = typeof window < "u" ? window.visualViewport : null, t = this.measurementModalUi?.card;
    if (!e || !t || this.measurementScaleModal?.hidden) return;
    const i = t.getBoundingClientRect();
    this._scaleModalAnchor || (this._scaleModalAnchor = {
      left: i.left + i.width / 2,
      top: i.top + i.height / 2
    });
    const s = 12, n = i.width / 2, r = i.height / 2, o = e.offsetLeft + s, a = e.offsetLeft + e.width - s, l = e.offsetTop + s, d = e.offsetTop + e.height - s, h = Math.min(
      Math.max(this._scaleModalAnchor.left, o + n),
      a - n
    ), u = Math.min(
      Math.max(this._scaleModalAnchor.top, l + r),
      d - r
    );
    t.style.left = `${h}px`, t.style.top = `${u}px`;
  }
  _clearPanelLongPress() {
    this._panelLongPressTimer && clearTimeout(this._panelLongPressTimer), this._panelLongPressTimer = null, this._panelLongPressStart = null, this._panelLongPressReady = !1, this._panelTouchActive = !1;
  }
  _completePanelLongPress(e, t = !0) {
    const i = this._panelLongPressReady, s = this.isEditingScale;
    this._clearPanelLongPress(), i && (e.stopPropagation(), s ? this.focusScaleCalibrationInput(t) : this.beginScaleCalibration({ selectValue: t }));
  }
  canEditScaleCalibration() {
    const e = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting;
    return this.allowScaleCalibration && !e && this.measurementAvailable && this.onScaleCalibration && this.unifiedMeasurementPoints?.length === 2;
  }
  usesScaleCalibrationModal() {
    return typeof window < "u" && window.matchMedia("(max-width: 640px)").matches;
  }
  getActiveScaleInput() {
    return this.scaleEditorUsesModal ? this.measurementModalUi?.input : this.measurementUi?.input;
  }
  focusScaleCalibrationInput(e = !0) {
    const t = this.getActiveScaleInput();
    if (t?.focus({ preventScroll: !0 }), e)
      t?.select();
    else if (t?.setSelectionRange) {
      const i = t.value.length;
      t.setSelectionRange(i, i);
    }
  }
  beginScaleCalibration({ selectValue: e = !0, focusInput: t = !0 } = {}) {
    !this.canEditScaleCalibration() || this.isEditingScale || (this.isEditingScale = !0, this.scaleEditorUsesModal = this.usesScaleCalibrationModal(), this.updateMeasurementPanel(), t && this.focusScaleCalibrationInput(e));
  }
  cancelScaleCalibration() {
    this._clearPanelLongPress(), this.isEditingScale && (this.getActiveScaleInput()?.blur(), this.isEditingScale = !1, this.scaleEditorUsesModal = !1, this.stopScaleModalViewportTracking(), this.measurementScaleModal && (this.measurementScaleModal.hidden = !0), this.updateMeasurementPanel());
  }
  confirmScaleCalibration() {
    if (!this.isEditingScale || this.unifiedMeasurementPoints?.length !== 2) return;
    const e = this.getActiveScaleInput(), t = Number.parseFloat(e?.value), i = e?.dataset.unit, s = this.unifiedMeasurementPoints[0].position, n = this.unifiedMeasurementPoints[1].position, r = s.distanceTo(n);
    let o = i === "cm" ? t / 100 : t;
    if (this._scaleCalibrationEditSource === "factor") {
      const h = this.scaleEditorUsesModal ? this.measurementModalUi?.factorInput : this.measurementUi?.factorInput, u = Number.parseFloat(h?.value);
      if (!Number.isFinite(u) || u <= 0 || !this._scaleCalibrationEditMultiplier) {
        h?.setAttribute("aria-invalid", "true"), h?.focus();
        return;
      }
      o = r * (u / this._scaleCalibrationEditMultiplier);
    }
    if (!Number.isFinite(o) || o <= 0 || r <= 0) {
      e?.setAttribute("aria-invalid", "true"), e?.focus();
      return;
    }
    e?.blur();
    const a = o / r, l = this.onScaleCalibration?.({ scaleFactor: a, currentDistance: r, targetDistance: o });
    if (l === !1) return;
    const d = l?.origin;
    d && (this.scaleCalibrationMultiplier = Number.isFinite(l?.scaleMultiplier) ? l.scaleMultiplier : this.scaleCalibrationMultiplier * a, this.hasScaleCalibration = !0, this.unifiedMeasurementPoints.forEach((h) => {
      h.position.sub(d).multiplyScalar(a).add(d);
    }), this.unifiedMeasurementPoints.forEach((h) => h.sphere?.position.copy(h.position)), this.isEditingScale = !1, this.scaleEditorUsesModal = !1, this.stopScaleModalViewportTracking(), this.measurementScaleModal && (this.measurementScaleModal.hidden = !0), this.updateUnifiedMeasurementLine(), this.updateMeasurementPanel(), this._notifyMeasurementChange("scale-calibrated", {
      scaleFactor: a,
      scaleMultiplier: this.scaleCalibrationMultiplier
    }));
  }
  updateScaleCalibrationEditor(e) {
    if (!this.measurementUi) return;
    const t = e * 100 <= 20, i = t ? "cm" : "m", s = t ? e * 100 : e, { input: n, unit: r, confirm: o, factorInput: a } = this.measurementUi, l = s.toFixed(2);
    n.value = l, n.style.width = `${Math.max(3, l.length + 0.15)}ch`, n.dataset.unit = i, n.setAttribute("aria-label", `Correct measurement in ${i}`), n.readOnly = !this.isEditingScale, n.removeAttribute("aria-invalid"), r.textContent = i, o.hidden = !this.isEditingScale, a.value = this.scaleCalibrationMultiplier.toFixed(2), a.removeAttribute("aria-invalid"), this._scaleCalibrationEditDistance = e, this._scaleCalibrationEditMultiplier = this.scaleCalibrationMultiplier, this._scaleCalibrationEditSource = "measurement";
  }
  updateScaleCalibrationModal(e) {
    if (!this.measurementModalUi || !this.measurementScaleModal) return;
    const t = e * 100 <= 20, i = t ? "cm" : "m", n = (t ? e * 100 : e).toFixed(2);
    this.measurementModalUi.input.value = n, this.measurementModalUi.input.style.width = `${Math.max(3, n.length + 0.15)}ch`, this.measurementModalUi.input.dataset.unit = i, this.measurementModalUi.input.removeAttribute("aria-invalid"), this.measurementModalUi.unit.textContent = i, this._scaleCalibrationEditDistance = e, this._scaleCalibrationEditMultiplier = this.scaleCalibrationMultiplier, this._scaleCalibrationEditSource = "measurement", this.measurementModalUi.factorInput.value = this.scaleCalibrationMultiplier.toFixed(2), this.measurementModalUi.factorInput.removeAttribute("aria-invalid"), this.measurementScaleModal.hidden = !1, this.startScaleModalViewportTracking();
  }
  syncScaleFactorFromMeasurement(e) {
    const { input: t, factorInput: i } = e || {}, s = Number.parseFloat(t?.value), n = t?.dataset.unit === "cm" ? s / 100 : s;
    if (!Number.isFinite(n) || n <= 0 || !this._scaleCalibrationEditDistance) return;
    const r = this._scaleCalibrationEditMultiplier * (n / this._scaleCalibrationEditDistance);
    i.value = r.toFixed(2), t.removeAttribute("aria-invalid"), i.removeAttribute("aria-invalid");
  }
  syncMeasurementFromScaleFactor(e) {
    const { input: t, factorInput: i } = e || {}, s = Number.parseFloat(i?.value);
    if (!Number.isFinite(s) || s <= 0 || !this._scaleCalibrationEditMultiplier) return;
    const n = this._scaleCalibrationEditDistance * (s / this._scaleCalibrationEditMultiplier), r = t?.dataset.unit === "cm" ? n * 100 : n;
    t.value = r.toFixed(2), t.style.width = `${Math.max(3, t.value.length + 0.15)}ch`, t.removeAttribute("aria-invalid"), i.removeAttribute("aria-invalid");
  }
  updateMeasurementPanel() {
    const e = this.measurementPanel;
    if (!e) return;
    const t = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting, i = this.unifiedMeasurementPoints ? this.unifiedMeasurementPoints.length : 0, s = i === 2, n = t ? this.measurementSystemEnabled : this.desktopMeasurementMode;
    let r;
    s && (r = this.unifiedMeasurementPoints[0].position.distanceTo(this.unifiedMeasurementPoints[1].position)), e.classList.remove("disabled", "active", "measured", "unavailable", "editing-scale"), e.style.opacity = "", e.style.cursor = "pointer", e.setAttribute("aria-disabled", "false"), e.removeAttribute("title");
    const { status: o, primary: a, statusHint: l, editor: d } = this.measurementUi;
    if (o.hidden = !1, d.hidden = !0, !this.measurementAvailable) {
      e.classList.add("disabled", "unavailable"), e.style.opacity = "0.55", e.style.cursor = "not-allowed", e.setAttribute("aria-disabled", "true"), e.title = "This model is marked as not measurable", a.textContent = "MEASURE", l.textContent = "Not available";
      return;
    }
    if (!n)
      e.classList.add("disabled"), a.textContent = "MEASURE", l.textContent = "Click to enable";
    else if (s)
      e.classList.add("measured"), this.isEditingScale && !this.scaleEditorUsesModal && e.classList.add("editing-scale"), this.allowScaleCalibration && !t && (e.title = "Right-click or long press to correct scale"), this.isEditingScale && !this.scaleEditorUsesModal ? (o.hidden = !0, d.hidden = !1, this.updateScaleCalibrationEditor(r)) : (a.textContent = this.formatDistance(r), l.textContent = this.allowScaleCalibration && this.hasScaleCalibration ? `Scale ${this.scaleCalibrationMultiplier.toFixed(2)}×` : "Click to disable", this.isEditingScale && this.scaleEditorUsesModal && this.updateScaleCalibrationModal(r));
    else {
      e.classList.add("active");
      const h = t ? "Use triggers" : "Click points";
      a.textContent = "MEASURE: ON", l.textContent = `${h} (${i}/2)`;
    }
  }
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
    if (!this.measurementAvailable)
      return;
    const t = Date.now(), i = t - this.lastClickTime < 300;
    if (this.lastClickTime = t, this.isDragging || !this.desktopMeasurementMode)
      return;
    this.desktopMeasurementMode && (e.stopPropagation(), e.preventDefault());
    let s = this.camera, n = !1;
    if (this.getRaycastInfo) {
      const o = this.getRaycastInfo(e);
      o && o.mouse && Number.isFinite(o.mouse.x) && Number.isFinite(o.mouse.y) && (o.mouse.isVector2 ? this.mouse.copy(o.mouse) : (this.mouse.x = o.mouse.x, this.mouse.y = o.mouse.y), o.camera && (s = o.camera), n = !0);
    }
    if (!n) {
      const o = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = (e.clientX - o.left) / o.width * 2 - 1, this.mouse.y = -((e.clientY - o.top) / o.height) * 2 + 1;
    }
    if (this.renderer && this.renderer.xr && this.renderer.xr.isPresenting) {
      const o = this.renderer.xr.getCamera();
      o && (s = o);
    }
    if ((!s || !s.isPerspectiveCamera && !s.isOrthographicCamera) && this.scene && this.scene.children) {
      for (const o of this.scene.children)
        if (o.isCamera) {
          s = o;
          break;
        }
    }
    if ((!s || !s.isPerspectiveCamera && !s.isOrthographicCamera) && typeof window < "u" && window.camera && (window.camera.isPerspectiveCamera || window.camera.isOrthographicCamera) && (s = window.camera), !s || !s.isPerspectiveCamera && !s.isOrthographicCamera && s.type !== "ArrayCamera")
      return;
    this.raycaster.setFromCamera(this.mouse, s);
    const r = this.getValidIntersections(this.raycaster);
    if (r.length > 0)
      if (i)
        this.focusOnPoint(r[0].point);
      else {
        const o = r[0].point;
        this.placeUnifiedMeasurementPoint(o, "desktop");
      }
  }
  focusOnPoint(e) {
    if (!e || !this.controls || !this.camera)
      return;
    this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null), this._cancelFocusOnUserInput && (this.controls.removeEventListener("start", this._cancelFocusOnUserInput), this._cancelFocusOnUserInput = null);
    const t = this.controls.target.clone(), i = this.camera.position.clone(), s = i.clone().sub(t), n = e.clone().add(s), r = 1e3, o = performance.now(), a = () => {
      this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null), this._cancelFocusOnUserInput && (this.controls.removeEventListener("start", this._cancelFocusOnUserInput), this._cancelFocusOnUserInput = null);
    };
    this._cancelFocusOnUserInput = a, this.controls.addEventListener("start", a, { once: !0 });
    const l = () => {
      const d = performance.now() - o, h = Math.min(d / r, 1), u = 1 - Math.pow(1 - h, 3);
      this.controls.target.lerpVectors(t, e, u), this.camera.position.lerpVectors(i, n, u), h < 1 ? this.focusAnimation = requestAnimationFrame(l) : (this.focusAnimation = null, this._cancelFocusOnUserInput && (this.controls.removeEventListener("start", this._cancelFocusOnUserInput), this._cancelFocusOnUserInput = null));
    };
    this.focusAnimation = requestAnimationFrame(l);
  }
  _focusOnPoint(e) {
    if (this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null), !this.controls || !this.camera) {
      console.warn("[MeasurementSystem] No controls or camera available for focusing");
      return;
    }
    const t = this.controls.target.clone(), i = this.camera.position.clone(), s = i.clone().sub(t), n = e.clone().add(s), r = 1e3, o = performance.now(), a = () => {
      const l = performance.now() - o, d = Math.min(l / r, 1), h = 1 - Math.pow(1 - d, 3);
      this.controls.target.lerpVectors(t, e, h), this.camera.position.lerpVectors(i, n, h), this.controls.update(), d < 1 ? this.focusAnimation = requestAnimationFrame(a) : this.focusAnimation = null;
    };
    this.focusAnimation = requestAnimationFrame(a);
  }
  /**
   * Refresh measurement display when entering VR
   * Called when VR mode is activated to ensure sprite is visible
   */
  refreshMeasurementDisplayForVR() {
    if (this.unifiedMeasurementPoints && this.unifiedMeasurementPoints.length === 2) {
      const e = this.unifiedMeasurementPoints[0].position, t = this.unifiedMeasurementPoints[1].position, i = e.distanceTo(t);
      if (this.createMeasurementDisplay(i), this.measurementSprite) {
        const s = new m.Vector3();
        s.addVectors(e, t), s.multiplyScalar(0.5);
        const n = Math.max(0.05, Math.min(0.2, i * 0.03));
        s.y += n, this.measurementSprite.position.copy(s), this.scene.children.includes(this.measurementSprite) || this.scene.add(this.measurementSprite);
        const r = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting;
        this.measurementSprite.visible = r || this.showMeasurementLabels;
      }
    }
  }
}
class Ps {
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
  applyComfortMode(e, { emitEvent: t = !0, applyToManager: i = !0 } = {}) {
    if (this.isComfortMode = e === !0, i && this.vrManager && this.vrManager.setComfortPreset(this.isComfortMode ? "comfort" : "free"), this.updateVisualState(), t && this.element) {
      const s = new CustomEvent("vrcomfortchange", {
        detail: {
          isComfortMode: this.isComfortMode,
          preset: this.isComfortMode ? "comfort" : "free"
        }
      });
      this.element.dispatchEvent(s);
    }
  }
  toggle() {
    const e = Date.now();
    e - this.lastToggleAt < this.options.toggleCooldownMs || (this.lastToggleAt = e, this.applyComfortMode(!this.isComfortMode, { emitEvent: !0, applyToManager: !0 }));
  }
  setComfortMode(e, { emitEvent: t = !0, applyToManager: i = !0 } = {}) {
    const s = e === !0;
    this.isComfortMode !== s ? this.applyComfortMode(s, { emitEvent: t, applyToManager: i }) : this.updateVisualState();
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
    return new Ps(e, t);
  }
}
class Oh {
  constructor(e) {
    this.scene = e, this.particleBounds = {
      min: new m.Vector3(-50, -25, -50),
      max: new m.Vector3(50, 25, 50)
    }, this.particleCount = 1750, this.densityMultiplier = 1, this.createParticleSystem();
  }
  calculateParticleCount(e) {
    const t = new m.Vector3();
    e.getSize(t);
    const s = t.clone().multiplyScalar(2.5), n = s.x * s.y * s.z, r = Math.round(n * 0.01 * this.densityMultiplier);
    return Math.max(100, Math.min(16e3, r));
  }
  /**
   * Set particle density multiplier and recreate system
   */
  setDensity(e) {
    if (this.densityMultiplier = Math.max(0, Math.min(2, e)), this.densityMultiplier === 0) {
      this.disable();
      return;
    }
    const t = new m.Box3(this.particleBounds.min, this.particleBounds.max), i = this.calculateParticleCount(t);
    this.particles && (this.scene.remove(this.particles), this.particles.geometry && this.particles.geometry.dispose(), this.particles.material && this.particles.material.dispose(), this.particles = null), this.particleCount = i, this.createParticleSystem(), this.enable();
  }
  createParticleSystem() {
    const e = new Float32Array(this.particleCount * 3), t = new Float32Array(this.particleCount * 3), i = new Float32Array(this.particleCount);
    this.initializeParticleData(e, t, i);
    const s = new m.BufferGeometry(), n = new Float32Array(this.particleCount);
    for (let r = 0; r < this.particleCount; r++)
      n[r] = r;
    s.setAttribute("position", new m.BufferAttribute(e, 3)), s.setAttribute("originalSize", new m.BufferAttribute(i, 1)), s.setAttribute("velocity", new m.BufferAttribute(t, 3)), s.setAttribute("particleIndex", new m.BufferAttribute(n, 1)), this.originalMaterial = this.createParticleMaterial(), this.particles = new m.Points(s, this.originalMaterial), this.particles.visible = !1, this.scene.add(this.particles);
  }
  /**
   * Initialize particle data arrays
   */
  initializeParticleData(e, t, i) {
    for (let s = 0; s < this.particleCount; s++) {
      const n = s * 3;
      e[n] = this.particleBounds.min.x + Math.random() * (this.particleBounds.max.x - this.particleBounds.min.x), e[n + 1] = this.particleBounds.min.y + Math.random() * (this.particleBounds.max.y - this.particleBounds.min.y), e[n + 2] = this.particleBounds.min.z + Math.random() * (this.particleBounds.max.z - this.particleBounds.min.z);
      const r = 1e-5, o = -5e-6, a = 5e-6;
      t[n] = r + (Math.random() - 0.5) * 2e-5, t[n + 1] = o + (-Math.random() * 1e-5 - 5e-6), t[n + 2] = a + (Math.random() - 0.5) * 2e-5;
      const l = Math.random();
      l < 0.7 ? i[s] = 75e-4 + Math.random() * 5e-3 : l < 0.9 ? i[s] = 0.0125 + Math.random() * 75e-4 : i[s] = 0.02 + Math.random() * 0.01;
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
    const s = new m.CanvasTexture(e);
    return s.needsUpdate = !0, new m.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointTexture: { value: s },
        color: { value: new m.Color(16777215) },
        opacity: { value: 1 },
        size: { value: 2 },
        boundsMin: { value: this.particleBounds.min.clone() },
        boundsMax: { value: this.particleBounds.max.clone() },
        fogColor: { value: new m.Color(268073) },
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
      blending: m.NormalBlending,
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
    const t = new m.Box3().setFromObject(e), i = t.getSize(new m.Vector3()), s = t.getCenter(new m.Vector3()), r = i.clone().multiplyScalar(2.5 * 0.5);
    this.particleBounds.min.copy(s).sub(r), this.particleBounds.max.copy(s).add(r);
    const o = this.calculateParticleCount(new m.Box3(this.particleBounds.min, this.particleBounds.max));
    Math.abs(o - this.particleCount) > this.particleCount * 0.2 ? (this.particles && (this.scene.remove(this.particles), this.particles.geometry && this.particles.geometry.dispose(), this.particles.material && this.particles.material.dispose(), this.particles = null), this.particleCount = o, this.createParticleSystem()) : this.redistributeParticles();
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
class Hh {
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
    const t = e * Math.PI / 180, i = (this.isQuest2, 15);
    this.controllerSpotlight = new m.SpotLight(
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
    this.controllerSpotlight.shadow.mapSize.width = s, this.controllerSpotlight.shadow.mapSize.height = s, this.controllerSpotlight.shadow.camera.near = 0.1, this.controllerSpotlight.shadow.camera.far = i, this.controllerSpotlight.shadow.camera.fov = e, this.controllerSpotlight.shadow.bias = -5e-4, this.controllerSpotlight.shadow.normalBias = 0.02, this.controllerSpotlight.shadow.radius = 4, this.controllerSpotlight.shadow.blurSamples = 10, this.scene.add(this.controllerSpotlight), this.spotlightTarget = new m.Object3D(), this.scene.add(this.spotlightTarget), this.controllerSpotlight.target = this.spotlightTarget;
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
    const t = e === "reduced", i = this.controllerSpotlight.shadow, s = t || this.isQuest2 ? 512 : 1024;
    i.mapSize.width !== s && (i.mapSize.set(s, s), i.map && (i.map.dispose(), i.map = null)), i.radius = t ? 1 : 4, i.blurSamples = t ? 4 : 10;
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
    const t = new m.Vector3(), i = new m.Quaternion();
    e.getWorldPosition(t), e.getWorldQuaternion(i), this.controllerSpotlight.position.copy(t);
    const s = new m.Vector3(0, 0, -1);
    s.applyQuaternion(i);
    const n = t.clone().add(s.multiplyScalar(2));
    this.spotlightTarget.position.copy(n);
  }
  updateCameraPosition(e) {
    if (!this.controllerSpotlight || !this.spotlightTarget) return;
    this.controllerSpotlight.position.copy(e.position);
    const t = new m.Vector3(0, 0, -1);
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
   * Dispose of torch resources
   */
  dispose() {
    this.controllerSpotlight && (this.scene.remove(this.controllerSpotlight), this.controllerSpotlight = null), this.spotlightTarget && (this.scene.remove(this.spotlightTarget), this.spotlightTarget = null);
  }
}
class zh {
  constructor(e) {
    this.scene = e, this.overheadLight = null, this.clearModeDirectionalLight = null, this.clearModeHemisphereLight = null, this.isTransitioning = !1, this.currentMode = "survey", this.pendingAnimations = /* @__PURE__ */ new Set(), this.isDisposed = !1, this.shadowProfile = "full", this.initializeLighting();
  }
  initializeLighting() {
    if (this.isDisposed || !this.scene) {
      console.warn("Cannot initialize lighting: system disposed or no scene");
      return;
    }
    try {
      this.overheadLight = new m.AmbientLight(16777215, 0.5), this.currentMode = null;
    } catch (e) {
      console.error("Failed to initialize lighting system:", e);
    }
  }
  createSurveyModeLights() {
    if (!(this.isDisposed || !this.scene))
      try {
        this.clearModeDirectionalLight || (this.clearModeDirectionalLight = new m.DirectionalLight(16777215, 1.32), this.clearModeDirectionalLight.position.set(50, 100, 50), this.clearModeDirectionalLight.castShadow = this.shadowProfile === "full", this.clearModeDirectionalLight.shadow.mapSize.width = 2048, this.clearModeDirectionalLight.shadow.mapSize.height = 2048, this.clearModeDirectionalLight.shadow.bias = -1e-4, this.clearModeDirectionalLight.shadow.normalBias = 0.03, this.clearModeDirectionalLight.shadow.camera.near = 0.5, this.clearModeDirectionalLight.shadow.camera.far = 500, this.clearModeDirectionalLight.shadow.camera.left = -150, this.clearModeDirectionalLight.shadow.camera.right = 150, this.clearModeDirectionalLight.shadow.camera.top = 150, this.clearModeDirectionalLight.shadow.camera.bottom = -150, this.scene.add(this.clearModeDirectionalLight)), this.clearModeHemisphereLight || (this.clearModeHemisphereLight = new m.HemisphereLight(16777215, 4473924, 0.77), this.scene.add(this.clearModeHemisphereLight)), this.fillLight || (this.fillLight = new m.DirectionalLight(16777215, 0.88), this.fillLight.position.set(-10, 10, -10), this.scene.add(this.fillLight)), this.bottomLight || (this.bottomLight = new m.DirectionalLight(16777215, 0.33), this.bottomLight.position.set(0, -10, 0), this.scene.add(this.bottomLight));
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
  fadeLighting({ target: e, fromIntensity: t, toIntensity: i, fromColor: s, toColor: n, duration: r = 500, onComplete: o }) {
    if (this.isDisposed || !e) {
      o && o();
      return;
    }
    const a = Symbol("fade-animation");
    this.pendingAnimations.add(a);
    const l = performance.now(), d = i - t;
    let h, u;
    s !== void 0 && n !== void 0 && (h = new m.Color(s), u = new m.Color(n));
    const A = (p) => {
      if (!this.pendingAnimations.has(a) || this.isDisposed) {
        o && o();
        return;
      }
      try {
        const f = p - l, g = Math.min(f / r, 1), b = 1 - Math.pow(1 - g, 3);
        if (!e || this.scene && !this.scene.children.includes(e)) {
          this.pendingAnimations.delete(a), o && o();
          return;
        }
        e.intensity = t + d * b, h && u && e.color && e.color.lerpColors(h, u, b), g < 1 ? requestAnimationFrame(A) : (this.pendingAnimations.delete(a), o && o());
      } catch (f) {
        console.error("Error in lighting animation:", f), this.pendingAnimations.delete(a), o && o();
      }
    };
    requestAnimationFrame(A);
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
class qh {
  constructor(e, t, i) {
    this.scene = e, this.renderer = t, this.camera = i, this.isDiveModeEnabled = !1, this.currentVRMode = null, this.lighting = new zh(e), this.particles = new Oh(e), this.torch = new Hh(e), this.isQuest2 = !1, this.isQuest3 = !1, this._fallbackHandedness = /* @__PURE__ */ new Map(), this.detectQuestDevice(), this.applyModeSettings();
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
    this.isQuest2 ? (this.camera.far = Math.max(20, Number.isFinite(e) ? e : 0), this.camera.updateProjectionMatrix(), this.isDiveModeEnabled && (this.scene.fog = new m.FogExp2(268073, 0.084))) : (this.camera.far = Math.max(2e3, Number.isFinite(e) ? e : 0), this.camera.updateProjectionMatrix(), this.isDiveModeEnabled && (this.scene.fog = new m.FogExp2(268073, 0.056)));
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
      e ? (this.scene.fog = new m.FogExp2(268073, 0.056), this.lighting.setVRDiveMode(), this.isDiveModeEnabled && this.torch.enableTorch()) : (this.scene.fog = new m.FogExp2(268073, 5e-3), this.lighting.setDesktopDiveMode()), this.particles.updateFog(this.scene.fog);
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
    if (!e) {
      console.warn("updateTorchFromVRManager: vrManager is null");
      return;
    }
    if (!(!e.isVRPresenting || !this.isDiveModeEnabled)) {
      if (e.controller2)
        this.updateTorchPosition(e.controller2);
      else if (e.controllers && e.controllers.length > 0) {
        const t = e.controllers.find(
          (i) => i.userData && i.userData.inputSource && i.userData.inputSource.handedness === "right"
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
    })) : this.disableDiveMode(), document.querySelectorAll(".toggle-option").forEach((i) => {
      i.addEventListener("click", () => {
        const s = i.classList.contains("right"), n = e ? e.checked : !1;
        (s && !n || !s && n) && this.toggleDiveMode();
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
    const t = e.xr.getSession && e.xr.getSession(), i = t && t.inputSources ? Array.from(t.inputSources) : this._getFallbackInputSources();
    if (!(!i || i.length === 0)) {
      for (const s of i)
        if (s.gamepad && s.handedness) {
          const n = s.gamepad, r = s.handedness;
          [4, 5].forEach((a) => {
            if (n.buttons[a]) {
              const l = n.buttons[a], d = `${r}-${a}`;
              this.buttonStates || (this.buttonStates = /* @__PURE__ */ new Map());
              const h = this.buttonStates.get(d) || !1, u = l.pressed;
              u && !h && this.toggleDiveMode(), this.buttonStates.set(d, u);
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
    let i = 0;
    for (const s of e) {
      if (!s || !s.buttons) continue;
      const n = this._resolveHandedness(s, i);
      if (!n) {
        i += 1;
        continue;
      }
      t.push({ gamepad: s, handedness: n }), i += 1;
    }
    return t;
  }
  _resolveHandedness(e, t) {
    const i = (e.hand || "").toLowerCase();
    if (i === "left" || i === "right") return i;
    const s = (e.id || "").toLowerCase();
    return s.includes("left") ? "left" : s.includes("right") ? "right" : this._fallbackHandedness.has(e.index) ? this._fallbackHandedness.get(e.index) : t === 0 ? (this._fallbackHandedness.set(e.index, "left"), "left") : t === 1 ? (this._fallbackHandedness.set(e.index, "right"), "right") : null;
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
class jh extends Pe {
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
    const t = new m.Box3().setFromObject(e);
    if (t.isEmpty()) return;
    const i = t.getSize(new m.Vector3()), s = Math.max(i.x, i.y, i.z);
    s > 0 && Number.isFinite(s) && (this.modelSize = Math.max(1, Math.min(1e4, s)));
  }
  update(e) {
    if (!this.enabled || !this.pointerLocked) return;
    if (this.renderer?.xr?.isPresenting) {
      this.exitFlyMode();
      return;
    }
    if (!this.camera) return;
    const t = this.modelSize / this.speedScale, i = this.keys.shift ? this.boostSpeed : this.baseSpeed, s = this.keys.shift ? this.slowBoostMultiplier : this.slowSpeedMultiplier, n = this.slowMode ? s : 1, r = i * n * t, o = new m.Vector3();
    this.keys.w && (o.z -= 1), this.keys.s && (o.z += 1), this.keys.a && (o.x -= 1), this.keys.d && (o.x += 1), this.keys.q && (o.y -= 1), this.keys.e && (o.y += 1), this._applyKeyboardLook(e), o.lengthSq() > 0 && (o.normalize(), o.applyQuaternion(this.camera.quaternion), this.camera.position.addScaledVector(o, r * e), this._syncControlsTarget());
  }
  _syncControlsTarget() {
    if (!this.controls || !this.camera) return;
    const e = new m.Vector3(0, 0, -5).applyQuaternion(this.camera.quaternion);
    this.controls.target.copy(this.camera.position).add(e);
  }
  _applyKeyboardLook(e) {
    let t = !1;
    const i = ((this.keys.j ? 1 : 0) + (this.keys.l ? -1 : 0)) * 0.5, s = (this.keys.u ? 1 : 0) + (this.keys.o ? -1 : 0);
    if (i !== 0) {
      const r = this.keys.shift ? this.keyboardBoostYawRate : this.keyboardYawRate, o = this.slowMode ? r * this.keyboardSlowYawMultiplier : r;
      this.cameraYaw += i * o * e, t = !0;
    }
    if (s !== 0) {
      const r = this.keys.shift ? this.keyboardPitchRate * this.keyboardPitchBoostMultiplier : this.keyboardPitchRate;
      this.cameraPitch = this._clampPitch(this.cameraPitch + s * r * e), t = !0;
    } else if (this.keys.k && Math.abs(this.cameraPitch) > 1e-4) {
      const r = this.pitchReturnRate * e;
      this.cameraPitch = Math.abs(this.cameraPitch) <= r ? 0 : this.cameraPitch - Math.sign(this.cameraPitch) * r, t = !0;
    }
    if (!t) return;
    const n = new m.Euler(this.cameraPitch, this.cameraYaw, 0, "YXZ");
    this.camera.quaternion.setFromEuler(n), this._syncControlsTarget();
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
      const s = t.tagName;
      if (s === "INPUT" || s === "SELECT" || s === "TEXTAREA" || t.isContentEditable)
        return;
    }
    const i = e.key.toLowerCase();
    if (i in this.keys && (e.preventDefault(), this.keys[i] = !0), e.shiftKey && (this.keys.shift = !0), e.code === "KeyX" || i === "x") {
      e.preventDefault(), e.repeat || this.toggleSlowMode();
      return;
    }
    if (e.shiftKey && (e.key === "`" || e.key === "~" || e.code === "Backquote")) {
      e.preventDefault(), this.pointerLocked || this.enterFlyMode();
      return;
    }
    (e.code === "KeyF" || i === "f") && (e.preventDefault(), this.toggleFlyMode());
  }
  _onKeyUp(e) {
    const t = e.key.toLowerCase();
    t in this.keys && (this.keys[t] = !1), e.shiftKey || (this.keys.shift = !1);
  }
  _onMouseMove(e) {
    if (!this.pointerLocked || !this.camera) return;
    this.cameraYaw -= e.movementX * this.mouseSensitivity, this.cameraPitch -= e.movementY * this.mouseSensitivity, this.cameraPitch = this._clampPitch(this.cameraPitch);
    const t = new m.Euler(this.cameraPitch, this.cameraYaw, 0, "YXZ");
    this.camera.quaternion.setFromEuler(t), this._syncControlsTarget();
  }
  _onPointerLockChange() {
    const e = this.pointerLocked;
    if (this.pointerLocked = document.pointerLockElement === this.domElement, this.pointerLocked && !e && this.camera) {
      const t = new m.Euler().setFromQuaternion(this.camera.quaternion, "YXZ");
      this.cameraYaw = t.y, this.cameraPitch = t.x;
    }
    this.controls && (this.pointerLocked ? (this._controlsEnabledBefore = this.controls.enabled, this.controls.enabled = !1) : this.controls.enabled = this._controlsEnabledBefore), this.emit("fly-mode-change", { active: this.pointerLocked, slow: this.slowMode });
  }
  _onClick() {
    this.pointerLocked && this.exitFlyMode();
  }
}
const ys = "belowjs-annotations", Cs = 1, Ao = 120, po = 4e3, tr = 500;
function es(c) {
  const e = Number(c);
  return Number.isFinite(e) ? e : null;
}
function De(c) {
  if (!c || typeof c != "object") return null;
  const e = es(c.x), t = es(c.y), i = es(c.z);
  return e === null || t === null || i === null ? null : { x: e, y: t, z: i };
}
function Kh(c, e = {}) {
  const t = [];
  if (!c || typeof c != "object")
    throw new TypeError("Annotation document must be an object.");
  if (c.format !== ys)
    throw new TypeError(`Unsupported annotation format: ${String(c.format || "missing")}`);
  if (c.version !== void 0 && c.version !== Cs)
    throw new TypeError(`Unsupported annotation document version: ${String(c.version)}`);
  const i = Array.isArray(c.annotations) ? c.annotations : [];
  if (i.length > (e.maxAnnotations ?? tr))
    throw new RangeError(`Annotation document exceeds the ${e.maxAnnotations ?? tr} annotation limit.`);
  const s = [], n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set();
  let o = 1;
  i.forEach((A, p) => {
    if (!A || typeof A != "object") {
      t.push({ path: `annotations[${p}]`, message: "Entry is not an object." });
      return;
    }
    const f = String(A.title || "").trim().slice(0, Ao), g = De(A.position);
    if (!f || !g) {
      t.push({ path: `annotations[${p}]`, message: "Entry requires a title and finite position." });
      return;
    }
    let b = A.id;
    if (b == null || r.has(b)) {
      for (; r.has(o); ) o += 1;
      b = o, o += 1;
    } else typeof b == "number" && Number.isFinite(b) && (o = Math.max(o, Math.floor(b) + 1));
    r.add(b), n.set(p, b), s.push({
      id: b,
      title: f,
      notes: String(A.notes || "").slice(0, po),
      position: g,
      collapsed: !!A.collapsed,
      created_by: A.created_by ?? null,
      created_at: A.created_at ?? null,
      updated_at: A.updated_at ?? null
    });
  });
  const a = [], l = /* @__PURE__ */ new Set();
  (Array.isArray(c.scale_bars) ? c.scale_bars : []).forEach((A, p) => {
    const f = A?.a, g = A?.b, b = n.get(f), y = n.get(g);
    if (!Number.isInteger(f) || !Number.isInteger(g) || b === void 0 || y === void 0 || b === y) {
      t.push({ path: `scale_bars[${p}]`, message: "Scale bar endpoints are invalid." });
      return;
    }
    const E = [String(b), String(y)].sort().join(":");
    l.has(E) || (l.add(E), a.push({ id: A.id ?? p + 1, a: b, b: y }));
  });
  const h = c.layer?.coordinate_space, u = h === "model" || h === "world" ? h : h ? "model" : "world";
  return h && u !== h && t.push({ path: "layer.coordinate_space", message: 'Coordinate space must be "model" or "world".' }), {
    document: {
      format: ys,
      version: Cs,
      layer: {
        ...c.layer && typeof c.layer == "object" ? c.layer : {},
        name: String(c.layer?.name || "Annotations"),
        // Version 1 documents created by the original BelowVR annotation
        // runtime stored world-space ray hits and had no metadata. New BelowJS
        // exports always declare model space explicitly.
        coordinate_space: u
      },
      annotations: s,
      scale_bars: a
    },
    warnings: t
  };
}
function Yh({ layer: c, annotations: e, scaleBars: t }) {
  const i = Array.from(e || []), s = new Map(i.map((r, o) => [r.id, o])), n = [];
  for (const r of Array.from(t || [])) {
    const o = s.get(r.a), a = s.get(r.b);
    o === void 0 || a === void 0 || o === a || n.push({ a: o, b: a });
  }
  return {
    format: ys,
    version: Cs,
    layer: {
      ...c || {},
      name: String(c?.name || "Annotations"),
      coordinate_space: "model"
    },
    annotations: i.map((r) => ({
      title: String(r.title || "").slice(0, Ao),
      notes: String(r.notes || "").slice(0, po),
      position: De(r.position) || { x: 0, y: 0, z: 0 },
      collapsed: !!r.collapsed,
      created_by: r.created_by ?? null,
      created_at: r.created_at ?? null,
      updated_at: r.updated_at ?? null
    })),
    scale_bars: n
  };
}
class Wh extends Pe {
  constructor() {
    super(), this.layer = null, this.annotations = /* @__PURE__ */ new Map(), this.scaleBars = /* @__PURE__ */ new Map(), this.selection = [], this.nextLocalId = 1, this.nextLocalScaleBarId = 1;
  }
  replace({ layer: e = null, annotations: t = [], scale_bars: i = [] } = {}) {
    this.layer = e, this.annotations.clear(), this.scaleBars.clear(), this.nextLocalId = 1, this.nextLocalScaleBarId = 1;
    for (const s of t)
      this.annotations.set(s.id, { ...s, position: { ...s.position } }), typeof s.id == "number" && (this.nextLocalId = Math.max(this.nextLocalId, s.id + 1));
    for (const s of i)
      this.scaleBars.set(s.id, { ...s }), typeof s.id == "number" && (this.nextLocalScaleBarId = Math.max(this.nextLocalScaleBarId, s.id + 1));
    this.selection = [], this.emit("change", { action: "replace" });
  }
  clear() {
    this.replace({ layer: null, annotations: [], scale_bars: [] });
  }
  create(e) {
    const t = e.id ?? this.nextLocalId++, i = { ...e, id: t, position: De(e.position) };
    if (!i.position) throw new TypeError("Annotation position must be finite.");
    return this.annotations.set(t, i), this.emit("change", { action: "create", annotation: i }), i;
  }
  update(e, t) {
    const i = this.annotations.get(e);
    if (!i) return null;
    const s = { ...i, ...t };
    if (t.position && (s.position = De(t.position), !s.position))
      throw new TypeError("Annotation position must be finite.");
    return this.annotations.set(e, s), this.emit("change", { action: "update", annotation: s }), s;
  }
  remove(e) {
    const t = this.annotations.get(e);
    if (!t) return null;
    this.annotations.delete(e);
    for (const [i, s] of this.scaleBars)
      (s.a === e || s.b === e) && this.scaleBars.delete(i);
    return this.selection = this.selection.filter((i) => i !== e), this.emit("change", { action: "delete", annotation: t }), t;
  }
  createScaleBar(e, t, i = this.nextLocalScaleBarId++) {
    if (e === t || !this.annotations.has(e) || !this.annotations.has(t)) return null;
    const s = Array.from(this.scaleBars.values()).find((r) => r.a === e && r.b === t || r.a === t && r.b === e);
    if (s) return s;
    const n = { id: i, a: e, b: t };
    return this.scaleBars.set(i, n), this.emit("change", { action: "scalebar_create", scaleBar: n }), n;
  }
  removeScaleBar(e) {
    const t = this.scaleBars.get(e);
    return t ? (this.scaleBars.delete(e), this.emit("change", { action: "scalebar_delete", scaleBar: t }), t) : null;
  }
  select(e) {
    return this.selection = Array.from(new Set(e || [])).filter((t) => this.annotations.has(t)), this.emit("selection-change", { selection: [...this.selection] }), [...this.selection];
  }
}
const ts = 768, is = 384, Jh = 6, ir = 30, Xh = 0.025, $h = 0.14, We = 128, Zh = 32, ed = new m.Color(9296112), td = new m.Color(16777215), id = new m.Color(16765286);
function sr(c, e, t) {
  const i = String(e || "").split(/\s+/).filter(Boolean), s = [];
  let n = "";
  for (const r of i) {
    const o = n ? `${n} ${r}` : r;
    c.measureText(o).width > t && n ? (s.push(n), n = r) : n = o;
  }
  return n && s.push(n), s;
}
class sd {
  constructor(e, t = {}) {
    this.system = e, this.enabled = t.enabled !== !1, this.interaction = t.interaction || "select", this.group = new m.Group(), this.group.name = "BelowJSAnnotationsXR", this.group.visible = !1, this.markerMesh = null, this.markerHaloMesh = null, this.markerHitMesh = null, this.markerAtlasTexture = null, this.markerIds = [], this.signature = "", this.panel = null, this.controllers = [], this._raycaster = new m.Raycaster(), this._matrix = new m.Matrix4(), this._origin = new m.Vector3(), this._direction = new m.Vector3(), this._cameraWorldQuaternion = new m.Quaternion(), this._parentWorldQuaternion = new m.Quaternion(), this._cameraWorldPosition = new m.Vector3(), this._parentWorldScale = new m.Vector3(1, 1, 1), this._worldPosition = new m.Vector3(), this._liftDirection = new m.Vector3(), this._localPosition = new m.Vector3(), this._localScale = new m.Vector3(), this._haloScale = new m.Vector3(), this._panelWorldPosition = new m.Vector3(), this._cameraUp = new m.Vector3(), this._instanceMatrix = new m.Matrix4(), this._identityQuaternion = new m.Quaternion(), this.hoveredIds = /* @__PURE__ */ new Set();
  }
  attach(e) {
    this.group.parent !== e && (this.group.removeFromParent(), e?.add?.(this.group)), this.bindControllers(), this.signature = "";
  }
  bindControllers() {
    const e = this.system.getRenderer?.();
    if (!(!e?.xr || this.controllers.length))
      for (let t = 0; t < 2; t += 1) {
        const i = e.xr.getController?.(t);
        if (!i) continue;
        const s = this.createControllerRay(), n = {
          controller: i,
          ray: s,
          connected: !!i.userData?.initialised,
          rayFade: 0,
          onSelect: null,
          onConnected: null,
          onDisconnected: null
        };
        n.onSelect = (o) => this.selectFromController(i, o), n.onConnected = () => {
          n.connected = !0;
        }, n.onDisconnected = () => {
          n.connected = !1, n.rayFade = 0, s.visible = !1;
        }, i.add(s), i.addEventListener("connected", n.onConnected), i.addEventListener("disconnected", n.onDisconnected);
        const r = n.onSelect;
        i.addEventListener("selectstart", r), this.controllers.push(n);
      }
  }
  createControllerRay() {
    const e = new m.BufferGeometry().setFromPoints([
      new m.Vector3(0, 0, 0),
      new m.Vector3(0, 0, -1)
    ]), t = new m.LineBasicMaterial({
      color: 12118263,
      transparent: !0,
      opacity: 0.62,
      depthTest: !1,
      depthWrite: !1
    }), i = new m.Line(e, t);
    return i.name = "BelowJSAnnotationControllerRay", i.scale.z = Jh, i.renderOrder = 1e3, i.visible = !1, i;
  }
  getControllerHit(e) {
    const t = this.markerHitMesh || this.markerMesh;
    if (!(!this.group.visible || !t || this.interaction !== "select"))
      return e.updateWorldMatrix?.(!0, !1), t.updateWorldMatrix?.(!0, !1), this._matrix.identity().extractRotation(e.matrixWorld), this._origin.setFromMatrixPosition(e.matrixWorld), this._direction.set(0, 0, -1).applyMatrix4(this._matrix).normalize(), this._raycaster.set(this._origin, this._direction), this._raycaster.far = ir, this._raycaster.intersectObject(t, !1)[0] || null;
  }
  selectFromController(e, t = null) {
    const i = this.getControllerHit(e);
    if (e.userData.belowjsAnnotationTrigger = !!(i && i.instanceId !== void 0), !i || i.instanceId === void 0)
      return this.system.selection?.length && this.system.select([]), !1;
    const s = this.markerIds[i.instanceId];
    if (s === void 0) return !1;
    const n = this.system.selection?.length === 1 && this.system.selection[0] === s;
    this.system.select(n ? [] : [s]);
    const r = t?.data?.gamepad || t?.inputSource?.gamepad;
    return (r?.hapticActuators?.[0] || r?.vibrationActuator)?.pulse?.(0.35, 35)?.catch?.(() => {
    }), !0;
  }
  sync() {
    if (!this.enabled) return;
    const t = !!this.system.getRenderer?.()?.xr?.isPresenting, i = this.system._activeModel || this.system.getModelRoot?.();
    if (i && this.group.parent !== i && this.attach(i), this.group.visible = t && this.system.annotationsVisible, !this.group.visible || !i) {
      this.setControllerRaysVisible(!1);
      return;
    }
    const s = this.system.sortedAnnotations(), n = s.map((r) => [
      r.id,
      r.position.x,
      r.position.y,
      r.position.z,
      r.collapsed ? 1 : 0
    ].join(":")).join("|");
    n !== this.signature && (this.signature = n, this.rebuildMarkers(s)), this.updateMarkerTransforms(s), this.updateControllerInteractions(), this.updatePanel();
  }
  disposeMarkerMeshes() {
    this.markerMesh && (this.markerMesh.removeFromParent(), this.markerMesh.geometry.dispose(), this.markerMesh.material.dispose()), this.markerHaloMesh && (this.markerHaloMesh.removeFromParent(), this.markerHaloMesh.geometry.dispose(), this.markerHaloMesh.material.dispose()), this.markerHitMesh && (this.markerHitMesh.removeFromParent(), this.markerHitMesh.geometry.dispose(), this.markerHitMesh.material.dispose()), this.markerMesh = null, this.markerHaloMesh = null, this.markerHitMesh = null, this.markerAtlasTexture?.dispose(), this.markerAtlasTexture = null;
  }
  createMarkerAtlas(e) {
    if (typeof document > "u") return null;
    const t = Math.min(Zh, Math.max(1, e)), i = Math.max(1, Math.ceil(e / t)), s = document.createElement("canvas");
    s.width = t * We, s.height = i * We;
    const n = s.getContext("2d");
    n.textAlign = "center", n.textBaseline = "middle";
    for (let o = 0; o < e; o += 1) {
      const a = o % t, l = Math.floor(o / t), d = a * We + We / 2, h = l * We + We / 2;
      n.save(), n.shadowColor = "rgba(100, 181, 246, 0.52)", n.shadowBlur = 14, n.fillStyle = "#185f87", n.strokeStyle = "rgba(238, 249, 252, 0.96)", n.lineWidth = 6, n.beginPath(), n.arc(d, h, 46, 0, Math.PI * 2), n.fill(), n.stroke(), n.restore(), n.fillStyle = "#ffffff";
      const u = String(o + 1).length;
      n.font = `700 ${u > 2 ? 36 : 44}px -apple-system, sans-serif`, n.fillText(String(o + 1), d, h + 2);
    }
    const r = new m.CanvasTexture(s);
    return r.colorSpace = m.SRGBColorSpace, r.minFilter = m.LinearFilter, r.magFilter = m.LinearFilter, r.generateMipmaps = !1, { texture: r, columns: t, rows: i };
  }
  createMarkerMaterial(e, t, i) {
    return new m.ShaderMaterial({
      uniforms: {
        markerAtlas: { value: e },
        atlasScale: { value: new m.Vector2(1 / t, 1 / i) }
      },
      vertexShader: `
        attribute vec2 annotationUvOffset;
        varying vec2 vAnnotationUv;
        uniform vec2 atlasScale;
        void main() {
          vAnnotationUv = uv * atlasScale + annotationUvOffset;
          vec4 worldPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
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
      transparent: !0,
      depthTest: !0,
      depthWrite: !1,
      side: m.DoubleSide,
      toneMapped: !1
    });
  }
  rebuildMarkers(e) {
    if (this.disposeMarkerMeshes(), this.markerIds = e.map((f) => f.id), !e.length)
      return;
    const t = this.createMarkerAtlas(e.length), i = new m.PlaneGeometry(2, 2), s = new Float32Array(e.length * 2), n = t?.columns || 1, r = t?.rows || 1;
    e.forEach((f, g) => {
      s[g * 2] = g % n / n, s[g * 2 + 1] = (r - 1 - Math.floor(g / n)) / r;
    }), i.setAttribute("annotationUvOffset", new m.InstancedBufferAttribute(s, 2)), this.markerAtlasTexture = t?.texture || null;
    const o = t ? this.createMarkerMaterial(t.texture, n, r) : new m.MeshBasicMaterial({ color: 1597319, depthTest: !0, side: m.DoubleSide }), a = new m.InstancedMesh(i, o, e.length);
    a.name = "BelowJSAnnotationMarkersXR", a.frustumCulled = !1;
    const l = new m.RingGeometry(1.08, 1.32, 28), d = new m.MeshBasicMaterial({
      color: 16777215,
      transparent: !0,
      opacity: 0.2,
      depthTest: !0,
      depthWrite: !1
    }), h = new m.InstancedMesh(l, d, e.length);
    h.name = "BelowJSAnnotationMarkerHalosXR", h.frustumCulled = !1, h.renderOrder = 1;
    const u = new m.SphereGeometry(1, 12, 8), A = new m.MeshBasicMaterial({
      transparent: !0,
      opacity: 0,
      depthTest: !1,
      depthWrite: !1,
      colorWrite: !1
    }), p = new m.InstancedMesh(u, A, e.length);
    p.name = "BelowJSAnnotationMarkerTargetsXR", p.frustumCulled = !1, this.markerMesh = a, this.markerHaloMesh = h, this.markerHitMesh = p, this.group.add(a), this.group.add(h), this.group.add(p), this.updateMarkerTransforms(e);
  }
  getViewCamera() {
    const e = this.system.getCamera?.(), t = this.system.getRenderer?.();
    return !e || !t?.xr?.isPresenting ? e : t.xr.getCamera?.(e) || e;
  }
  updateMarkerTransforms(e) {
    if (!this.markerMesh || !this.markerHaloMesh) return;
    const t = this.getViewCamera();
    this.group.updateWorldMatrix?.(!0, !1), this.group.getWorldScale(this._parentWorldScale), t?.getWorldPosition(this._cameraWorldPosition);
    const i = Math.max(1e-6, Math.abs(this._parentWorldScale.x)), s = Math.max(1e-6, Math.abs(this._parentWorldScale.y)), n = Math.max(1e-6, Math.abs(this._parentWorldScale.z));
    t ? (t.getWorldQuaternion(this._cameraWorldQuaternion), this.group.getWorldQuaternion(this._parentWorldQuaternion).invert(), this._identityQuaternion.copy(this._parentWorldQuaternion).multiply(this._cameraWorldQuaternion)) : this._identityQuaternion.identity(), e.forEach((r, o) => {
      this._localPosition.set(r.position.x, r.position.y, r.position.z), this._worldPosition.copy(this._localPosition).applyMatrix4(this.group.matrixWorld);
      const a = t ? this._cameraWorldPosition.distanceTo(this._worldPosition) : 4;
      let l = m.MathUtils.clamp(a * 0.012, Xh, $h);
      r.collapsed && (l *= 0.55), t && (this._liftDirection.copy(this._cameraWorldPosition).sub(this._worldPosition), this._liftDirection.lengthSq() > 1e-10 && (this._liftDirection.normalize(), this._worldPosition.addScaledVector(this._liftDirection, Math.max(6e-3, l * 0.55)), this._localPosition.copy(this._worldPosition), this.group.worldToLocal(this._localPosition))), this._localScale.set(l / i, l / s, l / n), this._instanceMatrix.compose(this._localPosition, this._identityQuaternion, this._localScale), this.markerMesh.setMatrixAt(o, this._instanceMatrix);
      const d = this.system.selection?.includes(r.id), h = this.hoveredIds.has(r.id);
      this.markerHaloMesh.setColorAt(o, h ? id : d ? td : ed), this._haloScale.copy(this._localScale).multiplyScalar(h || d ? 1.8 : 1.45), this._instanceMatrix.compose(this._localPosition, this._identityQuaternion, this._haloScale), this.markerHaloMesh.setMatrixAt(o, this._instanceMatrix), this.markerHitMesh && (this._haloScale.copy(this._localScale).multiplyScalar(2.15), this._instanceMatrix.compose(this._localPosition, this._identityQuaternion, this._haloScale), this.markerHitMesh.setMatrixAt(o, this._instanceMatrix));
    }), this.markerMesh.instanceMatrix.needsUpdate = !0, this.markerHaloMesh.instanceMatrix.needsUpdate = !0, this.markerHitMesh && (this.markerHitMesh.instanceMatrix.needsUpdate = !0), this.markerHaloMesh.instanceColor && (this.markerHaloMesh.instanceColor.needsUpdate = !0);
  }
  setControllerRaysVisible(e) {
    if (!e)
      for (const t of this.controllers)
        t.rayFade = 0, t.ray.visible = !1;
  }
  updateControllerInteractions() {
    this.hoveredIds.clear();
    for (const e of this.controllers) {
      const i = this.group.visible && (e.connected || e.controller.visible !== !1) ? this.getControllerHit(e.controller) : null, s = i?.instanceId === void 0 ? void 0 : this.markerIds[i.instanceId], n = s === void 0 ? 0 : 1;
      e.rayFade += (n - e.rayFade) * 0.34, s !== void 0 && (this.hoveredIds.add(s), e.ray.scale.z = m.MathUtils.clamp(i.distance, 0.05, ir)), e.ray.visible = e.rayFade > 0.025, e.ray.material.color.set(16765286), e.ray.material.opacity = 0.88 * e.rayFade;
    }
  }
  updatePanel() {
    const e = this.system.selection?.[0], t = this.system.annotations.get(e);
    if (!t) {
      this.panel?.removeFromParent();
      return;
    }
    this.panel || (this.panel = this.createPanel()), (this.panel.userData.annotationId !== e || this.panel.userData.title !== t.title || this.panel.userData.notes !== t.notes) && this.drawPanel(t), this.panel.parent !== this.group && this.group.add(this.panel);
    const i = this.getViewCamera();
    if (i) {
      this.group.updateWorldMatrix?.(!0, !1), i.getWorldPosition(this._cameraWorldPosition), i.getWorldQuaternion(this._cameraWorldQuaternion), this.group.getWorldScale(this._parentWorldScale), this._worldPosition.set(t.position.x, t.position.y, t.position.z).applyMatrix4(this.group.matrixWorld);
      const s = this._cameraWorldPosition.distanceTo(this._worldPosition), n = m.MathUtils.clamp(s * 0.42, 0.55, 1.8), r = n * (is / ts);
      this._cameraUp.set(0, 1, 0).applyQuaternion(this._cameraWorldQuaternion).normalize(), this._panelWorldPosition.copy(this._worldPosition).addScaledVector(this._cameraUp, r * 0.9), this.panel.position.copy(this.group.worldToLocal(this._panelWorldPosition)), this.panel.scale.set(
        n / Math.max(1e-6, Math.abs(this._parentWorldScale.x)),
        r / Math.max(1e-6, Math.abs(this._parentWorldScale.y)),
        1
      ), this.group.getWorldQuaternion(this._parentWorldQuaternion).invert(), this.panel.quaternion.copy(this._parentWorldQuaternion).multiply(this._cameraWorldQuaternion);
    }
  }
  createPanel() {
    const e = document.createElement("canvas");
    e.width = ts, e.height = is;
    const t = new m.CanvasTexture(e);
    t.colorSpace = m.SRGBColorSpace;
    const i = new m.SpriteMaterial({ map: t, transparent: !0, depthTest: !1 }), s = new m.Sprite(i);
    return s.scale.set(1, is / ts, 1), s.userData.canvas = e, s.renderOrder = 1001, s;
  }
  drawPanel(e) {
    const t = this.panel.userData.canvas, i = t.getContext("2d");
    i.clearRect(0, 0, t.width, t.height), i.fillStyle = "rgba(3, 15, 27, 0.96)", i.strokeStyle = "rgba(141, 216, 240, 0.9)", i.lineWidth = 5, i.beginPath(), i.roundRect(5, 5, t.width - 10, t.height - 10, 30), i.fill(), i.stroke();
    const s = Math.max(1, this.system.sortedAnnotations?.().findIndex((n) => n.id === e.id) + 1 || 1);
    i.fillStyle = "#8dd8f0", i.beginPath(), i.arc(62, 70, 30, 0, Math.PI * 2), i.fill(), i.fillStyle = "#03101d", i.font = "700 30px -apple-system, sans-serif", i.textAlign = "center", i.fillText(String(s), 62, 81), i.textAlign = "left", i.fillStyle = "#eef9fc", i.font = "650 42px -apple-system, sans-serif", sr(i, e.title, 610).slice(0, 2).forEach((n, r) => i.fillText(n, 112, 60 + r * 49)), i.fillStyle = "#b7cdd5", i.font = "29px -apple-system, sans-serif", sr(i, e.notes || "No notes", 700).slice(0, 4).forEach((n, r) => i.fillText(n, 34, 185 + r * 36)), i.fillStyle = "rgba(184, 232, 247, 0.62)", i.font = "22px -apple-system, sans-serif", i.fillText("Trigger the marker again to close", 34, 352), this.panel.material.map.needsUpdate = !0, this.panel.userData.annotationId = e.id, this.panel.userData.title = e.title, this.panel.userData.notes = e.notes;
  }
  dispose() {
    for (const e of this.controllers) {
      const { controller: t, onSelect: i, onConnected: s, onDisconnected: n, ray: r } = e;
      t.removeEventListener("selectstart", i), t.removeEventListener("connected", s), t.removeEventListener("disconnected", n), r.removeFromParent(), r.geometry.dispose(), r.material.dispose();
    }
    this.controllers = [], this.disposeMarkerMeshes(), this.panel?.material?.map?.dispose(), this.panel?.material?.dispose(), this.group.removeFromParent(), this.group.clear();
  }
}
const Je = 120, gt = 4e3, nd = 66, nr = 6, Xt = 5, rr = 4e3, rd = 8e3, od = 550, bt = 0.1, $t = 0.22;
class ad extends Pe {
  constructor(e, t = {}) {
    super(), this.viewer = e, this.mode = t.mode === "author" || t.readOnly === !1 ? "author" : "view", this.readOnly = this.mode !== "author", this.send = t.send || null, this.container = t.container || null, this.adapter = null, this._adapterUnsubscribe = null, this._loadGeneration = 0, this._loadController = null, this._pendingSource = null, this._activeModelKey = null, this._activeModel = null, this._modelReady = !1, this.store = new Wh(), this.xrLayer = new sd(this, t.xr || {}), this.options = {
      rightClickPing: t.rightClickPing !== !1,
      // ghost ping at right-click point, shared with the room
      occlusionFade: t.occlusionFade !== !1,
      // fade markers hidden behind the model
      diveLighting: t.diveLighting !== !1,
      // dim markers in dive mode until torch-lit
      initialHidden: t.initialHidden === !0,
      // allow callers to reveal only after viewer/model UI settles
      showToggle: t.showToggle !== !1,
      showExport: t.showExport === !0
    }, this.layer = null, this.annotations = this.store.annotations, this.markers = /* @__PURE__ */ new Map(), this.displayPositions = /* @__PURE__ */ new Map(), this.lerping = /* @__PURE__ */ new Set(), this.pendingCreates = /* @__PURE__ */ new Map(), this.pendingOperations = /* @__PURE__ */ new Map(), this.tempIdCounter = -1, this.scaleBars = /* @__PURE__ */ new Map(), this.selection = [], this.scalePair = null, this.previewBar = null, this.remotePreviewBars = /* @__PURE__ */ new Map(), this._touchPairingAnchor = null, this._touchMultiSelectActive = !1, this.moveTarget = null, this.dragState = null, this.pings = /* @__PURE__ */ new Map(), this.userPings = /* @__PURE__ */ new Map(), this.localPingKey = null, this.pingCounter = 0, this._rightDrag = null, this.remoteFocus = /* @__PURE__ */ new Map(), this._focusInterval = null, this._editDraftTitle = "", this._editDraftNotes = "", this._editingId = null, this.occlusionFactors = /* @__PURE__ */ new Map(), this.occlusionTargets = /* @__PURE__ */ new Map(), this._grid = null, this._gridBuild = null, this._triGrids = null, this._triBuild = null, this.annotationsVisible = !0, this._visBtn = null, this._exportBtn = null, this.openPanelFor = null, this._mirroredFocusUserId = null, this.overlayEl = null, this.panelEl = null, this.menuEl = null, this.toastEl = null, this.canvasEl = null, this._detachLongPress = null, this.toastTimer = null, this.rafHandle = null, this._lastFrameTs = 0, this.destroyed = !1, this._boundOnContextMenu = (i) => this.onCanvasContextMenu(i), this._boundOnCanvasPointerDown = (i) => this.onCanvasPointerDown(i), this._boundOnCanvasPointerUp = (i) => this.onCanvasPointerUp(i), this._boundOnDocPointerDown = (i) => this.onDocumentPointerDown(i), this._boundOnKeyDown = (i) => this.onKeyDown(i), this._boundOnScreenshotClick = (i) => this.onScreenshotClick(i), this.init(), t.adapter && this.setAdapter(t.adapter);
  }
  get THREE() {
    return m;
  }
  setMode(e) {
    return this.mode = e === "author" ? "author" : "view", this.readOnly = this.mode !== "author", this.readOnly && this.dismissTransientUi(), this.updateControlButtons(), this.mode;
  }
  getMode() {
    return this.mode;
  }
  setAdapter(e) {
    return this._adapterUnsubscribe?.(), this._adapterUnsubscribe = null, this.adapter?.dispose?.(), this.adapter = e || null, this.updateControlButtons(), this.adapter?.subscribe && (this._adapterUnsubscribe = this.adapter.subscribe((t) => this.handleAdapterEvent(t))), this.adapter && this._activeModelKey && (this.adapter.setContext?.({
      modelKey: this._activeModelKey,
      modelConfig: this.viewer?.config?.models?.[this._activeModelKey] || null
    }), this._modelReady && this.adapter.requestSnapshot?.()), this;
  }
  handleAdapterEvent(e) {
    if (e && !(!this._modelReady && e.type !== "error")) {
      if (e.message) {
        this.handleSyncMessage(e.message);
        return;
      }
      e.type === "snapshot" ? this.applyState(e.snapshot || e.data || {}) : e.type === "operation" || e.type === "preview" || e.type === "presence" ? this.applyUpdate(e.operation || e.data || e) : e.type === "error" && this.onServerError(e);
    }
  }
  async load(e, t = {}) {
    const i = ++this._loadGeneration;
    this._loadController?.abort(), this._loadController = typeof AbortController > "u" ? null : new AbortController();
    const s = t.signal || this._loadController?.signal;
    try {
      let n = e;
      if (typeof e == "string") {
        const o = await fetch(e, { signal: s });
        if (!o.ok) throw new Error(`Could not load annotations (${o.status})`);
        n = await o.json();
      }
      if (i !== this._loadGeneration) return null;
      const r = this.loadStaticData(this.convertDocumentToModelSpace(n));
      return this.emit("annotations-loaded", {
        modelKey: t.modelKey ?? this._activeModelKey,
        document: this.getDocument(),
        warnings: r?.warnings || []
      }), r;
    } catch (n) {
      if (n?.name === "AbortError" || i !== this._loadGeneration) return null;
      throw this.clear(), this.emit("annotation-error", { error: n, modelKey: t.modelKey ?? this._activeModelKey }), n;
    }
  }
  getActiveModelRoot() {
    if (this._activeModel) return this._activeModel;
    const e = this.viewer?.belowViewer?.getCurrentModel?.();
    return e?.model || e || null;
  }
  convertDocumentToModelSpace(e, t = this.getActiveModelRoot()) {
    if (!e || e.layer?.coordinate_space !== "world") return e;
    if (!t?.worldToLocal || !t?.position?.clone)
      throw new Error("World-space annotations require an active model before loading.");
    return t.updateWorldMatrix?.(!0, !1), {
      ...e,
      layer: { ...e.layer, coordinate_space: "model" },
      annotations: Array.isArray(e.annotations) ? e.annotations.map((i) => {
        const s = De(i?.position);
        if (!s) return i;
        const n = t.worldToLocal(
          t.position.clone().set(s.x, s.y, s.z)
        );
        return {
          ...i,
          position: { x: n.x, y: n.y, z: n.z }
        };
      }) : e.annotations
    };
  }
  prepareModel(e, t = {}) {
    const i = ++this._loadGeneration;
    this._activeModelKey = e, this._activeModel = null, this._modelReady = !1, this.overlayEl && (this.overlayEl.style.visibility = "hidden"), this.adapter?.setContext?.({ modelKey: e, modelConfig: t });
    const s = t?.annotations;
    if (this.adapter || !s) {
      this._pendingSource = Promise.resolve({ generation: i, source: null });
      return;
    }
    this._pendingSource = Promise.resolve(typeof s == "string" ? fetch(s).then((n) => {
      if (!n.ok) throw new Error(`Could not load annotations (${n.status})`);
      return n.json();
    }) : s).then((n) => ({ generation: i, source: n })).catch((n) => {
      if (n?.name === "AbortError" || i !== this._loadGeneration)
        return { generation: i, source: null, stale: !0 };
      throw n;
    });
  }
  async activateModel(e, t, i = {}) {
    if (e === this._activeModelKey) {
      this._activeModel = t || null, this._modelReady = !0, this.xrLayer.attach(this._activeModel);
      try {
        const s = await this._pendingSource;
        if (this.adapter)
          this.adapter.requestSnapshot?.();
        else if (s && s.generation === this._loadGeneration && s.source) {
          const n = this.loadStaticData(
            this.convertDocumentToModelSpace(s.source, this._activeModel)
          );
          this.setAnnotationsVisible(i.annotationsVisible !== !1), this.emit("annotations-loaded", {
            modelKey: e,
            document: this.getDocument(),
            warnings: n.warnings
          });
        } else
          this.clear();
      } catch (s) {
        e === this._activeModelKey && (this.clear(), this.emit("annotation-error", { error: s, modelKey: e }));
      } finally {
        e === this._activeModelKey && this.overlayEl && requestAnimationFrame(() => {
          this.overlayEl && (this.overlayEl.style.visibility = "");
        });
      }
    }
  }
  clear() {
    this.applyState({ layer: null, annotations: [], scale_bars: [] }), this.emit("annotations-cleared", { modelKey: this._activeModelKey });
  }
  getDocument() {
    return Yh({
      layer: this.layer,
      annotations: this.sortedAnnotations(),
      scaleBars: Array.from(this.scaleBars.values(), (e) => e.data)
    });
  }
  list() {
    return this.sortedAnnotations().map((e) => {
      const t = this.markers.get(e.id), i = t?.querySelector(".bv-annotation-marker__dot"), s = i?.getBoundingClientRect();
      return {
        ...e,
        position: { ...e.position },
        number: i?.textContent?.trim() || "",
        selected: this.selection.includes(e.id),
        screen: s ? { x: s.left + s.width / 2, y: s.top + s.height / 2 } : null,
        opacity: t ? Number(window.getComputedStyle(t).opacity) : null
      };
    });
  }
  listScaleBars() {
    return Array.from(this.scaleBars.values(), (e) => ({
      ...e.data,
      label: e.labelEl?.textContent?.trim() || "",
      selected: !!e.sticky,
      opacity: e.labelEl ? Number(window.getComputedStyle(e.labelEl).opacity) : null
    }));
  }
  hitTest(e, t) {
    const i = this.raycastModelFromClient(Number(e), Number(t));
    return i ? this.worldPositionToModel(i) : null;
  }
  project(e) {
    const t = De(e), i = this.getCamera(), s = this.getCanvas();
    if (!t || !i || !s || !this.container) return null;
    const n = s.getBoundingClientRect(), r = this.container.getBoundingClientRect(), o = this.projectToOverlay(
      this.modelPositionToWorld(t),
      i,
      n,
      r,
      !0
    );
    return o ? {
      x: Math.round((o.x + r.left) * 10) / 10,
      y: Math.round((o.y + r.top) * 10) / 10,
      overlayX: o.x,
      overlayY: o.y,
      z: o.z
    } : null;
  }
  download(e = null) {
    const t = this.getDocument(), i = new window.Blob([`${JSON.stringify(t, null, 2)}
`], { type: "application/json" }), s = String(t.layer?.name || "annotations").replace(/[^A-Za-z0-9_-]+/g, "-");
    return this.downloadBlob(i, e || `${s || "annotations"}.annotations.json`), this.emit("annotations-exported", { document: t }), t;
  }
  create(e) {
    return this.readOnly ? null : this.createAnnotation(e.title, e.notes || "", e.position);
  }
  update(e, t = {}) {
    if (this.readOnly || !this.annotations.has(e)) return null;
    const i = this.annotations.get(e);
    if (t.position) return this.move(e, t.position);
    const s = { ...i, ...t };
    this.upsertAnnotation(s);
    const n = this.createClientId();
    this.pendingOperations.set(n, { annotation: i });
    const r = Object.hasOwn(t, "collapsed") && !Object.hasOwn(t, "title") && !Object.hasOwn(t, "notes"), o = r ? "collapse" : "edit";
    return this.sendMessage(r ? {
      type: "annotation_update",
      action: "collapse",
      id: e,
      client_id: n,
      collapsed: !!s.collapsed
    } : {
      type: "annotation_update",
      action: "edit",
      id: e,
      client_id: n,
      title: s.title,
      notes: s.notes || ""
    }, { quiet: !this.adapter && !this.send }) ? !this.adapter && !this.send && this.pendingOperations.delete(n) : this.rollbackOptimisticOperation(n), this.emit("annotation-changed", { action: o, annotation: s }), s;
  }
  move(e, t) {
    if (this.readOnly || !this.annotations.has(e)) return null;
    const i = De(t);
    if (!i) return null;
    const s = { ...this.annotations.get(e), position: i }, n = this.annotations.get(e);
    this.upsertAnnotation(s);
    const r = this.createClientId();
    return this.pendingOperations.set(r, { annotation: n }), this.sendMessage({
      type: "annotation_update",
      action: "move",
      id: e,
      client_id: r,
      position: i
    }) ? !this.adapter && !this.send && this.pendingOperations.delete(r) : this.rollbackOptimisticOperation(r), this.emit("annotation-changed", { action: "move", annotation: s }), s;
  }
  remove(e) {
    return this.readOnly || !this.annotations.has(e) ? !1 : (this.sendMessage({ type: "annotation_update", action: "delete", id: e }), !this.adapter && !this.send && this.removeAnnotationLocal(e), this.emit("annotation-changed", { action: "delete", annotationId: e }), !0);
  }
  createScaleBar(e, t) {
    if (this.readOnly) return null;
    const i = this.scaleBarForPair(e, t);
    if (i) return i.data;
    if (this.adapter || this.send)
      return this.sendMessage({ type: "annotation_update", action: "scalebar_create", a: e, b: t }), { a: e, b: t };
    const s = this.store.createScaleBar(e, t);
    return s && this.addScaleBar(s), s;
  }
  removeScaleBar(e) {
    return this.readOnly || !this.scaleBars.has(e) ? !1 : (this.sendMessage({ type: "annotation_update", action: "scalebar_delete", id: e }), !0);
  }
  setVisible(e) {
    return this.setAnnotationsVisible(e), this.annotationsVisible;
  }
  isVisible() {
    return this.annotationsVisible;
  }
  select(e) {
    return this.selection = this.store.select(e), this.updateSelectionVisuals(), this.sendFocus(), this.emit("annotation-selection-changed", { selection: [...this.selection] }), [...this.selection];
  }
  requestSnapshot() {
    this.requestSync();
  }
  createClientId() {
    return `c${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }
  rollbackOptimisticOperation(e) {
    const t = this.pendingOperations?.get(e);
    this.pendingOperations?.delete(e), t?.annotation && this.upsertAnnotation({ ...t.annotation });
  }
  refreshPresence() {
    this.sendFocus();
  }
  setFollowedParticipant(e) {
    this._followedParticipantId = e == null ? null : String(e), this.syncFollowedAnnotationPanel();
  }
  // ------------------------------------------------------------------
  // Setup / teardown
  // ------------------------------------------------------------------
  init() {
    this.injectStyles();
    const e = this.getCanvas(), t = this.container || e?.parentElement || document.body;
    this.container = t, this.overlayEl = document.createElement("div"), this.overlayEl.className = "bv-annotation-overlay", this.options.initialHidden && (this.overlayEl.style.visibility = "hidden"), this.overlayEl.addEventListener("contextmenu", (n) => n.preventDefault()), t.appendChild(this.overlayEl), this.syncCanvasListeners(), document.addEventListener("pointerdown", this._boundOnDocPointerDown, !0), document.addEventListener("keydown", this._boundOnKeyDown), document.addEventListener("click", this._boundOnScreenshotClick, !0), this._invalidateRects = () => {
      this._rects = null, this.positionVisibilityButton();
    }, window.addEventListener("resize", this._invalidateRects), document.addEventListener("fullscreenchange", this._invalidateRects), this.options.showToggle && this.createVisibilityButton(), this.options.showExport && this.createExportButton();
    const i = (n = 0.016) => {
      if (!this.destroyed)
        try {
          this.updateFrame(Math.min(0.1, Number.isFinite(n) ? n : 0.016));
        } catch (r) {
          this._frameErrorLogged || (this._frameErrorLogged = !0, console.error("Annotation frame error (loop continues):", r));
        }
    };
    if (this._frameHost = this.viewer?.belowViewer || this.viewer, typeof this._frameHost?.on == "function") {
      this._boundOnBeforeRender = i, this._frameHost.on("before-render", this._boundOnBeforeRender);
      return;
    }
    const s = (n) => {
      if (this.destroyed) return;
      const r = this._lastFrameTs ? (n - this._lastFrameTs) / 1e3 : 0.016;
      this._lastFrameTs = n, i(r), this.rafHandle = requestAnimationFrame(s);
    };
    this.rafHandle = requestAnimationFrame(s);
  }
  destroy() {
    this.destroyed = !0, this._loadController?.abort(), this._boundOnBeforeRender && (this._frameHost?.off?.("before-render", this._boundOnBeforeRender), this._boundOnBeforeRender = null), this._frameHost = null, this.rafHandle && cancelAnimationFrame(this.rafHandle), this.detachCanvasListeners(this.canvasEl), this.canvasEl = null, document.removeEventListener("pointerdown", this._boundOnDocPointerDown, !0), document.removeEventListener("keydown", this._boundOnKeyDown), document.removeEventListener("click", this._boundOnScreenshotClick, !0), this._invalidateRects && (window.removeEventListener("resize", this._invalidateRects), document.removeEventListener("fullscreenchange", this._invalidateRects)), clearInterval(this._draftInterval), clearInterval(this._focusInterval), clearInterval(this._visPositionInterval), this.closeMenu(), this.closePanel(), this.clearPreviewBar(), this.clearRemotePreviewBars();
    for (const e of this.scaleBars.values()) this.removeBarVisual(e);
    this.scaleBars.clear();
    for (const e of this.pings.values()) e.el.remove();
    this.pings.clear(), this._visBtn?.remove(), this._exportBtn?.remove(), this.overlayEl?.remove(), this.toastEl?.remove(), this._adapterUnsubscribe?.(), this._adapterUnsubscribe = null, this.adapter?.dispose?.(), this.adapter = null, this.xrLayer.dispose(), this.removeAllListeners();
  }
  injectStyles() {
  }
  // ------------------------------------------------------------------
  // Viewer access helpers
  // ------------------------------------------------------------------
  getCanvas() {
    return (this.viewer?.getRenderer?.() || this.viewer?.renderer || this.viewer?.belowViewer?.renderer)?.domElement || null;
  }
  getRenderer() {
    return this.viewer?.getRenderer?.() || this.viewer?.renderer || this.viewer?.belowViewer?.renderer || null;
  }
  syncCanvasListeners() {
    const e = this.getCanvas();
    e !== this.canvasEl && (this.detachCanvasListeners(this.canvasEl), this.canvasEl = e, e && (this._boundOnCanvasPointerMove || (this._boundOnCanvasPointerMove = (t) => this.onCanvasPointerMove(t)), e.addEventListener("contextmenu", this._boundOnContextMenu), e.addEventListener("pointerdown", this._boundOnCanvasPointerDown), e.addEventListener("pointerup", this._boundOnCanvasPointerUp), e.addEventListener("pointermove", this._boundOnCanvasPointerMove), this._detachLongPress = this.attachLongPress(
      e,
      (t, i) => this.handleModelRightClick({ clientX: t, clientY: i })
    ), this._rects = null));
  }
  detachCanvasListeners(e) {
    e && (e.removeEventListener("contextmenu", this._boundOnContextMenu), e.removeEventListener("pointerdown", this._boundOnCanvasPointerDown), e.removeEventListener("pointerup", this._boundOnCanvasPointerUp), this._boundOnCanvasPointerMove && e.removeEventListener("pointermove", this._boundOnCanvasPointerMove), this._detachLongPress && (this._detachLongPress(), this._detachLongPress = null));
  }
  getCamera() {
    return this.viewer?.getCamera?.() || this.viewer?.camera || null;
  }
  getScene() {
    return this.viewer?.getScene?.() || this.viewer?.scene || this.viewer?.belowViewer?.scene || null;
  }
  rerenderViewer() {
    const e = this.getRenderer(), t = this.getScene(), i = this.getCamera();
    e?.render && t && i && e.render(t, i);
  }
  forceViewerRender() {
    if (typeof this.viewer?.forceRenderCurrentScene == "function") {
      this.viewer.forceRenderCurrentScene();
      return;
    }
    this.rerenderViewer();
  }
  getModelRoot() {
    const e = (n) => n ? n.isObject3D ? n : n.model?.isObject3D ? n.model : n.scene?.isObject3D ? n.scene : n.group?.isObject3D ? n.group : null : null, t = e(this.viewer?.getCurrentModel?.());
    if (t) return t;
    const i = this.viewer?.getLoadedModels?.() || this.viewer?.belowViewer?.getLoadedModels?.() || this.viewer?.belowViewer?.loadedModels;
    if (Array.isArray(i))
      for (let n = i.length - 1; n >= 0; n--) {
        const r = e(i[n]);
        if (r) return r;
      }
    const s = this.viewer?.measurementSystem?._raycastTargets;
    if (Array.isArray(s))
      for (let n = s.length - 1; n >= 0; n--) {
        const r = e(s[n]);
        if (r) return r;
      }
    return null;
  }
  modelPositionToWorld(e, t = new m.Vector3()) {
    t.set(e?.x || 0, e?.y || 0, e?.z || 0);
    const i = this._activeModel || this.getModelRoot();
    return i?.updateWorldMatrix?.(!0, !1), i?.localToWorld ? i.localToWorld(t) : t;
  }
  worldPositionToModel(e) {
    const t = e?.isVector3 ? e.clone() : new m.Vector3(e?.x || 0, e?.y || 0, e?.z || 0), i = this._activeModel || this.getModelRoot();
    return i?.updateWorldMatrix?.(!0, !1), i?.worldToLocal && i.worldToLocal(t), { x: t.x, y: t.y, z: t.z };
  }
  isDynamicTilesetRoot(e) {
    if (!e) return !1;
    const t = this.viewer?.getLoadedModels?.() || this.viewer?.belowViewer?.getLoadedModels?.() || this.viewer?.belowViewer?.loadedModels;
    return Array.isArray(t) ? t.some((i) => (i?.model || i?.scene || i?.group || i) === e && !!i?.tileset) : !1;
  }
  raycastModelFromClient(e, t) {
    const i = this.THREE, s = this.getCanvas(), n = this.getCamera(), r = this.getModelRoot();
    if (!i || !s || !n || !r) return null;
    const o = s.getBoundingClientRect(), a = new i.Vector2(
      (e - o.left) / o.width * 2 - 1,
      -((t - o.top) / o.height) * 2 + 1
    );
    this._raycaster || (this._raycaster = new i.Raycaster()), this._raycaster.setFromCamera(a, n);
    const l = this.isDynamicTilesetRoot(r);
    if (!l && this._triGrids)
      return this.raycastTriGrids(this._raycaster.ray.origin, this._raycaster.ray.direction);
    const d = l ? null : this.gridRaycastFromClient(e, t);
    if (d) return d;
    const h = this._raycaster.intersectObject(r, !0);
    for (const u of h)
      if (u.object?.isMesh && u.object.visible)
        return u.point;
    return null;
  }
  // ------------------------------------------------------------------
  // Sync: messages from the server (or static data)
  // ------------------------------------------------------------------
  handleSyncMessage(e) {
    switch (e.type) {
      case "annotation_state":
        this.applyState(e);
        break;
      case "annotation_update":
        this.applyUpdate(e);
        break;
      case "annotation_error":
        this.onServerError(e);
        break;
    }
  }
  applyState(e) {
    this.layer = e.layer || null, this.exitMoveMode(!1), this.closeMenu(), this.closePanel(), this.clearSelection(), this.pendingCreates.clear(), this.pendingOperations.clear(), this.remoteFocus.clear(), this.clearRemotePreviewBars();
    for (const t of this.markers.values()) t.remove();
    this.markers.clear(), this.displayPositions.clear(), this.lerping.clear(), this.occlusionFactors.clear(), this.occlusionTargets.clear();
    for (const t of this.scaleBars.values()) this.removeBarVisual(t);
    this.scaleBars.clear(), this.store.replace({
      layer: e.layer || null,
      annotations: e.annotations || [],
      scale_bars: e.scale_bars || []
    });
    for (const t of this.annotations.values())
      if (t && t.id !== null && t.id !== void 0) {
        const i = this.modelPositionToWorld(t.position);
        this.displayPositions.set(t.id, { x: i.x, y: i.y, z: i.z }), this.createMarkerElement(t);
      }
    for (const t of e.scale_bars || [])
      t && typeof t.id == "number" && this.addScaleBar(t);
    this.renumberMarkers(), this.updateControlButtons(), !this._visibilityInitialized && typeof e.annotations_visible == "boolean" && (this._visibilityInitialized = !0, e.annotations_visible || this.setAnnotationsVisible(!1));
  }
  applyUpdate(e) {
    e.client_id && this.pendingOperations.delete(e.client_id);
    const t = e.action, i = this.getMessageParticipantId(e), s = this.getLocalParticipantId();
    if (t === "ping") {
      e.position && i !== null && i !== s && this.upsertUserPing(i, e.position, e.title, e.avatar_color || null);
      return;
    }
    if (t === "focus") {
      i !== null && i !== s && this.upsertRemoteFocus(e);
      return;
    }
    if (t === "move" && e.preview) {
      const n = this.annotations.get(e.annotation_id);
      n && e.position && (n.livePosition = e.position, n.liveUntil = performance.now() + 4e3, this.lerping.add(e.annotation_id), this.refreshBarsForAnnotation(e.annotation_id));
      return;
    }
    if (e.layer && (this.layer = e.layer), t === "create" && e.annotation) {
      if (e.client_id && this.pendingCreates.has(e.client_id)) {
        const n = this.pendingCreates.get(e.client_id);
        this.pendingCreates.delete(e.client_id), this.removeAnnotationLocal(n);
      }
      this.upsertAnnotation(e.annotation), this.flashMarker(e.annotation.id);
    } else if ((t === "edit" || t === "move" || t === "collapse") && e.annotation) {
      if (t === "edit") {
        const n = this.remoteFocus.get(i);
        n && n.editing === e.annotation.id && (n.editing = null, n.title = "", this.applyRemoteFocusVisuals());
      }
      this.upsertAnnotation(e.annotation), t === "move" && this.flashMarker(e.annotation.id);
    } else t === "delete" ? (this.openPanelFor === e.annotation_id && this.closePanel(), this.moveTarget === e.annotation_id && this.exitMoveMode(!1), this.removeAnnotationLocal(e.annotation_id)) : t === "scalebar_create" && e.scale_bar ? (this.addScaleBar(e.scale_bar), i !== null && i === s && this.clearSelection()) : t === "scalebar_delete" && this.removeScaleBarVisual(e.scale_bar_id);
    this.renumberMarkers(), this.emit("annotation-changed", {
      action: t,
      annotation: e.annotation || null,
      annotationId: e.annotation_id ?? null,
      scaleBar: e.scale_bar || null,
      scaleBarId: e.scale_bar_id ?? null,
      remote: !0
    });
  }
  onServerError(e) {
    if (e.client_id && this.pendingCreates.has(e.client_id)) {
      const t = this.pendingCreates.get(e.client_id);
      this.pendingCreates.delete(e.client_id), this.removeAnnotationLocal(t), this.renumberMarkers();
    }
    e.client_id && this.rollbackOptimisticOperation(e.client_id), this.showToast(e.message || "Annotation action failed"), this.emit("annotation-error", { error: new Error(e.message || "Annotation action failed"), data: e });
  }
  getLocalParticipantId() {
    const e = typeof window < "u" ? window.collaboration : null, t = this.adapter?.getCurrentParticipantId?.() ?? e?.getCurrentParticipantId?.() ?? e?.currentParticipantId ?? e?.currentUserInfo?.participant_id ?? e?.currentUserInfo?.id;
    return this.focusUserKey(t);
  }
  // Backwards-compatible alias for callers outside this module.
  getLocalUserId() {
    return this.getLocalParticipantId();
  }
  getMessageParticipantId(e) {
    return this.focusUserKey(e?.participant_id ?? e?.user_id);
  }
  focusUserKey(e) {
    return e == null ? null : String(e);
  }
  /**
   * Load annotations from a static `belowjs-annotations` JSON document.
   * Foundation for read-only annotation display on plain belowjs sites.
   */
  loadStaticData(e) {
    const t = Kh(e), i = t.document.annotations, s = t.document.scale_bars;
    return this.applyState({
      layer: { id: 0, ...t.document.layer },
      annotations: i,
      scale_bars: s
    }), t;
  }
  upsertAnnotation(e) {
    const t = this.annotations.get(e.id);
    if (delete e.livePosition, delete e.liveUntil, this.annotations.set(e.id, e), t) {
      const i = this.markers.get(e.id), s = i?.querySelector(".bv-annotation-marker__title");
      s && (s.textContent = e.title), i?.classList.toggle("bv-annotation-marker--collapsed", !!e.collapsed), this.dragState?.id !== e.id && this.lerping.add(e.id);
    } else {
      const i = this.modelPositionToWorld(e.position);
      this.displayPositions.set(e.id, { x: i.x, y: i.y, z: i.z }), this.createMarkerElement(e);
    }
    this.remoteFocus.size > 0 && this.applyRemoteFocusVisuals(), this.refreshBarsForAnnotation(e.id), this.openPanelFor === e.id && this.panelEl?.dataset.mode === "view" && this.openViewPanel(e.id), this.openPanelFor === e.id && this._mirroredFocusUserId !== null && this.syncFollowedAnnotationPanel(), this.remoteFocus.size > 0 && this.reconcileRemotePreviewBars(), this.updateControlButtons();
  }
  removeAnnotationLocal(e) {
    this.annotations.delete(e), this.displayPositions.delete(e), this.lerping.delete(e), this.occlusionFactors.delete(e), this.occlusionTargets.delete(e);
    const t = this.markers.get(e);
    t && (t.remove(), this.markers.delete(e));
    for (const [s, n] of [...this.scaleBars])
      (n.data.a === e || n.data.b === e) && this.removeScaleBarVisual(s);
    const i = this.selection.indexOf(e);
    i !== -1 && (this.selection.splice(i, 1), this.scalePair?.includes(e) && (this.scalePair = null), this._touchPairingAnchor === e && (this._touchPairingAnchor = null), this.updateSelectionVisuals()), this.updateControlButtons();
  }
  // ------------------------------------------------------------------
  // Markers
  // ------------------------------------------------------------------
  createMarkerElement(e) {
    const t = document.createElement("div");
    t.className = "bv-annotation-marker", e.pending && t.classList.add("bv-annotation-marker--pending"), e.collapsed && t.classList.add("bv-annotation-marker--collapsed"), t.dataset.annotationId = String(e.id), t.innerHTML = `
            <div class="bv-annotation-marker__dot"></div>
            <div class="bv-annotation-marker__title"></div>
        `, t.querySelector(".bv-annotation-marker__title").textContent = e.title, t.style.display = "none";
    const i = t.querySelector(".bv-annotation-marker__dot");
    return i.addEventListener("click", (s) => {
      if (s.stopPropagation(), s.ctrlKey) {
        s.preventDefault();
        return;
      }
      if (!this.dragState) {
        if (s.shiftKey) {
          this.selection.length === 0 && this.openPanelFor !== null && this.openPanelFor !== e.id && this.annotations.has(this.openPanelFor) && (this.selection.push(this.openPanelFor), this.closePanel()), this.toggleSelection(e.id);
          return;
        }
        this.extendSelectionFromCurrentFocus(e.id) || this.moveTarget === null && (this.setStickyBar(null), this.clearSelection(), this.openViewPanel(e.id));
      }
    }), i.addEventListener("contextmenu", (s) => {
      s.preventDefault(), s.stopPropagation(), this.openMarkerMenu(e.id, s.clientX, s.clientY);
    }), i.addEventListener("pointerup", (s) => {
      !this.isContextClick(s) || s.button !== 0 || (s.preventDefault(), s.stopPropagation(), this.openMarkerMenu(e.id, s.clientX, s.clientY));
    }), i.addEventListener("wheel", (s) => {
      this.forwardWheelToCanvas(s);
    }, { passive: !1 }), this.attachLongPress(i, (s, n) => this.openMarkerMenu(e.id, s, n, { touchPairing: !0 })), i.addEventListener("mouseenter", () => this.setBarsEndpointLit(e.id, !0)), i.addEventListener("mouseleave", () => this.setBarsEndpointLit(e.id, !1)), i.addEventListener("pointerdown", (s) => {
      s.button !== 0 || this.moveTarget !== e.id || this.readOnly || (s.stopPropagation(), this.startMarkerDrag(e.id, s));
    }), this.overlayEl.appendChild(t), this.markers.set(e.id, t), t;
  }
  sortedAnnotations() {
    return Array.from(this.annotations.values()).sort((e, t) => {
      const i = e.created_at || "", s = t.created_at || "";
      return i !== s ? i < s ? -1 : 1 : (e.id || 0) - (t.id || 0);
    });
  }
  /** One-shot pulse on a marker's dot when it settles into place. */
  flashMarker(e) {
    const t = this.markers.get(e)?.querySelector(".bv-annotation-marker__dot");
    t && (t.classList.remove("bv-annotation-marker__dot--settle"), t.offsetWidth, t.classList.add("bv-annotation-marker__dot--settle"));
  }
  renumberMarkers() {
    let e = 0;
    for (const t of this.sortedAnnotations()) {
      const i = this.markers.get(t.id)?.querySelector(".bv-annotation-marker__dot");
      i && (i.textContent = t.collapsed ? "" : String(++e));
    }
  }
  // ------------------------------------------------------------------
  // Per-frame update: positions, smoothing, fading, scale bars, pings
  // ------------------------------------------------------------------
  // ------------------------------------------------------------------
  // Visibility toggle - dressed like the screenshot button, lives above it
  // ------------------------------------------------------------------
  createVisibilityButton() {
    const e = document.createElement("button");
    e.className = "bv-annotation-vis-button", e.title = "Hide annotations", e.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
                 stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>`, e.addEventListener("click", () => this.setAnnotationsVisibleShared(!this.annotationsVisible)), this.container.appendChild(e), this._visBtn = e, this.updateControlButtons(), setTimeout(() => this.positionVisibilityButton(), 1200), this._visPositionInterval = setInterval(() => this.positionVisibilityButton(), 500), setTimeout(() => {
      clearInterval(this._visPositionInterval), this._visPositionInterval = null, this.positionVisibilityButton();
    }, 8e3);
  }
  createExportButton() {
    const e = document.createElement("button");
    e.className = "bv-annotation-vis-button bv-annotation-export-button", e.title = "Download annotations JSON", e.setAttribute("aria-label", "Download annotations JSON"), e.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
                 stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path>
            </svg>`, e.addEventListener("click", () => this.download()), this.container.appendChild(e), this._exportBtn = e, this.updateControlButtons(), this.positionVisibilityButton();
  }
  updateControlButtons() {
    const e = this.annotations.size > 0;
    if (this._visBtn) {
      const t = this.options.showToggle && e;
      this._visBtn.style.display = t ? "flex" : "none";
    }
    if (this._exportBtn) {
      const t = this.options.showExport && this.mode === "author" && !this.adapter && e;
      this._exportBtn.style.display = t ? "flex" : "none";
    }
    e && this.positionVisibilityButton();
  }
  positionVisibilityButton() {
    const e = this._visBtn;
    if (!e) return;
    const t = this.container.getBoundingClientRect(), s = [
      ".screenshot-button",
      ".fullscreen-button",
      "#vrComfortGlyph",
      ".vr-comfort-glyph",
      ".vr-comfort-button",
      ".comfort-glyph"
    ].flatMap(
      (A) => Array.from(this.container.querySelectorAll(A)).concat(Array.from(document.querySelectorAll(A)))
    ).filter((A, p, f) => {
      if (!A || A === e || f.indexOf(A) !== p || A.closest?.(".below-ui-root--stereo-right")) return !1;
      const g = window.getComputedStyle(A);
      if (g.display === "none" || g.visibility === "hidden" || Number(g.opacity) === 0) return !1;
      const b = A.getBoundingClientRect();
      return b.width > 0 && b.height > 0 && b.right > t.left && b.left < t.right && b.bottom > t.top && b.top < t.bottom;
    });
    if (!s.length) return;
    const n = s.reduce(
      (A, p) => p.getBoundingClientRect().top < A.getBoundingClientRect().top ? p : A
    ), r = s.reduce(
      (A, p) => p.getBoundingClientRect().right > A.getBoundingClientRect().right ? p : A
    ), o = n.getBoundingClientRect(), a = r.getBoundingClientRect(), l = this.container.getBoundingClientRect(), h = Math.max(12, Math.round(l.bottom - o.top + 14)), u = Math.max(8, Math.round(l.right - a.right));
    e.style.bottom = `${h}px`, e.style.right = `${u}px`, this._exportBtn && (this._exportBtn.style.bottom = `${h + e.offsetHeight + 10}px`, this._exportBtn.style.right = `${u}px`);
  }
  onScreenshotClick(e) {
    !e.target?.closest?.(".screenshot-button") || !this.overlayEl || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation?.(), this.captureAnnotatedScreenshot().catch((i) => {
      console.error("Annotated screenshot failed:", i), this.showToast(i?.message || "Could not save screenshot");
    }));
  }
  getScreenshotPixelRatio(e, t) {
    const i = t.width > 0 ? e.width / t.width : 1, s = window.devicePixelRatio || 1, n = Math.max(2, s, i || 1), r = 8192, o = Math.min(
      r / Math.max(1, t.width),
      r / Math.max(1, t.height)
    );
    return Math.max(1, Math.min(n, o));
  }
  withScreenshotResolution(e, t, i) {
    const s = this.getRenderer();
    if (!s?.setPixelRatio || !s?.setSize)
      return i();
    const n = s.getPixelRatio?.() || (t.width > 0 ? e.width / t.width : 1), r = this.getScreenshotPixelRatio(e, t), o = Math.max(1, Math.round(t.width)), a = Math.max(1, Math.round(t.height));
    if (!(Math.abs(r - n) > 0.01))
      return this.forceViewerRender(), i();
    s.setPixelRatio(r), s.setSize(o, a, !1), this.forceViewerRender();
    try {
      return i();
    } finally {
      s.setPixelRatio(n), s.setSize(o, a, !1), this.forceViewerRender();
    }
  }
  async captureAnnotatedScreenshot({
    download: e = !0,
    filename: t = null,
    includeAnnotations: i = this.annotationsVisible
  } = {}) {
    const s = this.getCanvas();
    if (!s || !s.width || !s.height)
      throw new Error("No viewer canvas available");
    const n = s.getBoundingClientRect();
    if (!n.width || !n.height)
      throw new Error("Viewer canvas is not visible");
    const r = [], o = (A) => {
      A?.line && (r.push([A.line, A.line.visible]), A.line.visible = !1);
    };
    o(this.previewBar);
    for (const A of this.remotePreviewBars.values()) o(A);
    r.length > 0 && this.forceViewerRender();
    let a, l = n, d, h;
    try {
      const A = typeof this.viewer?.captureScreenshotCanvas == "function" ? this.viewer.captureScreenshotCanvas() : null;
      A?.canvas ? (a = A.canvas, l = A.sourceRect || n, d = A.scaleX, h = A.scaleY) : a = this.withScreenshotResolution(s, n, () => {
        const p = document.createElement("canvas");
        return p.width = s.width, p.height = s.height, p.getContext("2d").drawImage(s, 0, 0, p.width, p.height), p;
      });
    } finally {
      for (const [A, p] of r) A.visible = p;
      r.length > 0 && this.forceViewerRender();
    }
    const u = a.getContext("2d");
    if (d = d || a.width / l.width, h = h || a.height / l.height, i && this.drawAnnotationsForScreenshot(u, l, d, h), e) {
      const A = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-"), p = i ? "annotations" : "screenshot", f = await this.canvasToPngBlob(a);
      this.downloadBlob(f, t || `belowjs-${p}-${A}.png`), this.showToast(i ? "Screenshot saved with annotations" : "Screenshot saved");
    }
    return a;
  }
  captureScreenshot(e = {}) {
    return this.captureAnnotatedScreenshot(e);
  }
  drawAnnotationsForScreenshot(e, t, i, s) {
    if (!(!this.annotationsVisible || !this.overlayEl)) {
      for (const [n, r] of this.markers)
        try {
          this.drawMarkerForScreenshot(e, n, r, t, i, s);
        } catch (o) {
          console.warn("Skipping annotation marker in screenshot:", n, o);
        }
      for (const n of this.scaleBars.values())
        if (!n.preview && n.labelEl)
          try {
            this.drawScaleLabelForScreenshot(e, n.labelEl, t, i, s);
          } catch (r) {
            console.warn("Skipping scale label in screenshot:", r);
          }
    }
  }
  drawMarkerForScreenshot(e, t, i, s, n, r) {
    if (!Number.isFinite(n) || !Number.isFinite(r) || n <= 0 || r <= 0 || !i || i._bvVisible === !1 || i.style.display === "none") return;
    const o = window.getComputedStyle(i), a = Number(o.opacity);
    if (o.display === "none" || o.visibility === "hidden" || a <= 0) return;
    const l = i.querySelector(".bv-annotation-marker__dot");
    if (!l) return;
    const d = window.getComputedStyle(l), h = l.getBoundingClientRect();
    if (!h.width || !h.height || d.visibility === "hidden") return;
    const u = Math.max(0, Math.min(1, a * Number(d.opacity || 1))), A = (h.left + h.width / 2 - s.left) * n, p = (h.top + h.height / 2 - s.top) * r, f = Math.max(h.width * n, h.height * r) / 2;
    if (![A, p, f].every(Number.isFinite) || f <= 0) return;
    e.save(), e.globalAlpha = u, e.fillStyle = d.backgroundColor || "rgba(13, 18, 26, 0.78)";
    const g = i.classList.contains("bv-annotation-marker--selected"), b = i.classList.contains("bv-annotation-marker--remote-selected");
    e.strokeStyle = g ? "rgba(100, 181, 246, 0.55)" : b ? "rgba(255, 255, 255, 0.55)" : d.borderColor || "rgba(255, 255, 255, 0.85)", e.lineWidth = Math.max(1, parseFloat(d.borderWidth || "1.5") * Math.max(n, r)), e.beginPath(), e.arc(A, p, f, 0, Math.PI * 2), e.fill(), e.stroke();
    const y = l.textContent?.trim() || String(t);
    y && parseFloat(d.fontSize || "0") > 0 && (e.fillStyle = d.color || "white", e.font = this.canvasFontFromStyle(d, r), e.textAlign = "center", e.textBaseline = "middle", e.fillText(y, A, p + 0.5 * r)), e.restore();
    const E = i.querySelector(".bv-annotation-marker__title");
    E && this.drawTitleChipForScreenshot(e, E, a, s, n, r);
  }
  drawTitleChipForScreenshot(e, t, i, s, n, r) {
    if (!Number.isFinite(n) || !Number.isFinite(r) || n <= 0 || r <= 0) return;
    const o = window.getComputedStyle(t), a = Math.max(0, Math.min(1, i * Number(o.opacity || 0)));
    if (a <= 0.01 || o.visibility === "hidden" || o.display === "none") return;
    const l = t.getBoundingClientRect();
    if (!l.width || !l.height) return;
    const d = (l.left - s.left) * n, h = (l.top - s.top) * r, u = l.width * n, A = l.height * r;
    ![d, h, u, A].every(Number.isFinite) || u <= 0 || A <= 0 || (e.save(), e.globalAlpha = a, this.drawRoundedRect(e, d, h, u, A, parseFloat(o.borderRadius || "8") * Math.max(n, r)), e.fillStyle = o.backgroundColor || "rgba(13, 18, 26, 0.82)", e.fill(), e.strokeStyle = o.borderColor || "rgba(255, 255, 255, 0.12)", e.lineWidth = Math.max(1, parseFloat(o.borderWidth || "1") * Math.max(n, r)), e.stroke(), e.fillStyle = o.color || "white", e.font = this.canvasFontFromStyle(o, r), e.textAlign = "left", e.textBaseline = "middle", e.beginPath(), e.rect(d + 6 * n, h, Math.max(0, u - 12 * n), A), e.clip(), e.fillText(t.textContent || "", d + 9 * n, h + A / 2), e.restore());
  }
  drawScaleLabelForScreenshot(e, t, i, s, n) {
    if (!Number.isFinite(s) || !Number.isFinite(n) || s <= 0 || n <= 0) return;
    const r = window.getComputedStyle(t), o = Number(r.opacity || 1);
    if (r.display === "none" || r.visibility === "hidden" || o <= 0.01) return;
    const a = t.getBoundingClientRect();
    if (!a.width || !a.height) return;
    const l = (a.left - i.left) * s, d = (a.top - i.top) * n, h = a.width * s, u = a.height * n;
    ![l, d, h, u].every(Number.isFinite) || h <= 0 || u <= 0 || (e.save(), e.globalAlpha = Math.max(0, Math.min(1, o)), this.drawRoundedRect(e, l, d, h, u, parseFloat(r.borderRadius || "10") * Math.max(s, n)), e.fillStyle = r.backgroundColor || "rgba(13, 18, 26, 0.78)", e.fill(), e.strokeStyle = r.borderColor || "rgba(255, 255, 255, 0.12)", e.lineWidth = Math.max(1, parseFloat(r.borderWidth || "1") * Math.max(s, n)), e.stroke(), e.fillStyle = r.color || "white", e.font = this.canvasFontFromStyle(r, n), e.textAlign = "center", e.textBaseline = "middle", e.fillText(t.textContent || "", l + h / 2, d + u / 2), e.restore());
  }
  drawRoundedRect(e, t, i, s, n, r) {
    const o = Math.min(Math.max(0, r), s / 2, n / 2);
    e.beginPath(), e.moveTo(t + o, i), e.lineTo(t + s - o, i), e.quadraticCurveTo(t + s, i, t + s, i + o), e.lineTo(t + s, i + n - o), e.quadraticCurveTo(t + s, i + n, t + s - o, i + n), e.lineTo(t + o, i + n), e.quadraticCurveTo(t, i + n, t, i + n - o), e.lineTo(t, i + o), e.quadraticCurveTo(t, i, t + o, i), e.closePath();
  }
  canvasFontFromStyle(e, t) {
    const i = Math.max(1, parseFloat(e.fontSize || "12") * t), s = e.fontWeight || "400", n = e.fontFamily || "sans-serif";
    return `${s} ${i}px ${n}`;
  }
  canvasToPngBlob(e) {
    return !e || !e.width || !e.height ? Promise.reject(new Error("Screenshot canvas is empty")) : new Promise((t, i) => {
      e.toBlob((s) => {
        s ? t(s) : i(new Error("PNG export failed"));
      }, "image/png");
    });
  }
  downloadBlob(e, t) {
    const i = URL.createObjectURL(e), s = document.createElement("a");
    s.href = i, s.download = t, document.body.appendChild(s), s.click(), s.remove(), setTimeout(() => URL.revokeObjectURL(i), 1e3);
  }
  setAnnotationsVisible(e) {
    this.annotationsVisible = !!e, this.overlayEl.style.display = e ? "" : "none";
    for (const t of this.scaleBars.values()) t.line.visible = e;
    this.previewBar && (this.previewBar.line.visible = e), e || (this.closeMenu(), this.closePanel(), this.exitMoveMode(!1)), this._visBtn?.classList.toggle("bv-annotation-vis-button--off", !e), this._visBtn && (this._visBtn.title = e ? "Hide annotations" : "Show annotations"), this.emit("annotation-visibility-changed", { visible: this.annotationsVisible }), this.syncFollowedAnnotationPanel();
  }
  setAnnotationsVisibleShared(e) {
    this.setAnnotationsVisible(e), this.sendFocus();
  }
  getRects() {
    const e = performance.now();
    if (!this._rects || e - this._rectsAt > 1e3) {
      const t = this.getCanvas();
      if (!t) return null;
      this._rects = {
        rect: t.getBoundingClientRect(),
        hostRect: this.overlayEl.getBoundingClientRect()
      }, this._rectsAt = e;
    }
    return this._rects;
  }
  syncDisplayPositionsToModelTransform() {
    const e = this._activeModel || this.getModelRoot();
    if (e?.matrixWorld) {
      e.updateWorldMatrix?.(!0, !1), this._modelTransformPoint || (this._modelTransformPoint = new m.Vector3());
      for (const [t, i] of this.annotations) {
        if (this.dragState?.id === t || this.lerping.has(t)) continue;
        const s = this.displayPositions.get(t);
        !s || !i?.position || (this._modelTransformPoint.set(i.position.x, i.position.y, i.position.z).applyMatrix4(e.matrixWorld), s.x = this._modelTransformPoint.x, s.y = this._modelTransformPoint.y, s.z = this._modelTransformPoint.z);
      }
    }
  }
  updateFrame(e) {
    this.syncCanvasListeners(), this.xrLayer.sync();
    const t = this.THREE, i = this.getCamera();
    if (!t || !i) return;
    this._projVector || (this._projVector = new t.Vector3()), this._tmpVecA || (this._tmpVecA = new t.Vector3()), this._tmpVecB || (this._tmpVecB = new t.Vector3());
    const s = this.getRects();
    if (!s) return;
    const { rect: n, hostRect: r } = s;
    if (this._probeTick = (this._probeTick || 0) + 1, i.updateMatrixWorld(), this.syncDisplayPositionsToModelTransform(), this.lerping.size > 0) {
      const d = 1 - Math.exp(-12 * e), h = performance.now();
      for (const u of this.lerping) {
        const A = this.annotations.get(u), p = this.displayPositions.get(u);
        if (!A || !p) {
          this.lerping.delete(u);
          continue;
        }
        A.livePosition && h > (A.liveUntil || 0) && (delete A.livePosition, delete A.liveUntil);
        const f = A.livePosition || A.position, b = this.modelPositionToWorld(f, this._annotationWorldTarget || (this._annotationWorldTarget = new t.Vector3())), y = b.x - p.x, E = b.y - p.y, C = b.z - p.z, w = y * y + E * E + C * C;
        w > 25 ? (p.x = b.x, p.y = b.y, p.z = b.z, A.livePosition || this.lerping.delete(u)) : w < 1e-6 ? (p.x = b.x, p.y = b.y, p.z = b.z, A.livePosition || this.lerping.delete(u)) : (p.x += y * d, p.y += E * d, p.z += C * d), this.refreshBarsForAnnotation(u, !0);
      }
    }
    if (this.stepOcclusionGridBuild(), this.stepTriGridBuild(), !this.annotationsVisible) return;
    if (this.options.occlusionFade && this._probeTick % 3 === 0) {
      const d = this.getModelRoot();
      this.isDynamicTilesetRoot(d) ? this.runTilesetOcclusionTests(i, d) : this._triGrids ? this.runOcclusionTestsTri(i, n) : this.runOcclusionTests(i);
    }
    const o = this.options.diveLighting ? this.getDiveLightState() : null, a = 1 - Math.exp(-8 * e);
    for (const [d, h] of this.markers) {
      const u = this.displayPositions.get(d), A = u ? this.projectToOverlay(u, i, n, r) : null;
      if (!A) {
        h._bvVisible !== !1 && (h.style.display = "none", h._bvVisible = !1);
        continue;
      }
      if (h._bvVisible !== !0 && (h.style.display = "block", h._bvVisible = !0), !(this.dragState?.id === d && this.dragState.screenDrag)) {
        const y = Math.round(A.x * 10) / 10, E = Math.round(A.y * 10) / 10;
        (h._bvX !== y || h._bvY !== E) && (h.style.transform = `translate3d(${y}px, ${E}px, 0)`, h._bvX = y, h._bvY = E);
      }
      let p = this.occlusionFactors.get(d) ?? 1;
      const f = this.occlusionTargets.get(d) ?? 1;
      p += (f - p) * a, this.occlusionFactors.set(d, p);
      let g = p;
      o && (g *= this.computeLightFactor(u, o)), this.markerShouldStayOpaque(d) && (g = 1);
      const b = Math.round(g * 200) / 200;
      h._bvOpacity !== b && (h.style.opacity = String(b), h._bvOpacity = b);
    }
    for (const d of this.scaleBars.values())
      this.updateBarVisual(d, i, n, r, o);
    for (const d of this.remotePreviewBars.values())
      this.updateBarVisual(d, i, n, r, o);
    this.syncLocalPreviewBar(), this.previewBar && this.updateBarVisual(this.previewBar, i, n, r, o);
    const l = performance.now();
    this.remoteFocus.size > 0 && this._probeTick % 30 === 0 && this.sweepRemoteFocus(l);
    for (const [d, h] of this.pings) {
      if (h.leaving) {
        if (l > h.removeAt) {
          h.el.remove(), this.pings.delete(d);
          continue;
        }
      } else h.expiresAt !== null && l > h.expiresAt && this.dismissPing(d);
      const u = this.modelPositionToWorld(
        h.position,
        this._pingWorldPosition || (this._pingWorldPosition = new t.Vector3())
      ), A = this.projectToOverlay(u, i, n, r);
      A ? (h.el.style.display = "block", h.el.style.transform = `translate3d(${A.x}px, ${A.y}px, 0)`) : h.el.style.display = "none";
    }
  }
  projectToOverlay(e, t, i, s, n) {
    const r = this._projVector;
    if (r.set(e.x, e.y, e.z).project(t), r.z > 1 || r.z < -1) return null;
    const o = (r.x * 0.5 + 0.5) * i.width + (i.left - s.left), a = (-r.y * 0.5 + 0.5) * i.height + (i.top - s.top);
    return !n && (o < -60 || a < -60 || o > s.width + 60 || a > s.height + 60) ? null : (this._screenOut || (this._screenOut = { x: 0, y: 0 }), this._screenOut.x = o, this._screenOut.y = a, this._screenOut);
  }
  // ------------------------------------------------------------------
  // Occlusion fade - triangle-grid rays (primary path)
  //
  // Five rays per marker (centre + four quadrant offsets sized to the
  // on-screen dot) march the triangle buckets toward the camera: exact
  // partial occlusion in microseconds, entirely on the CPU. The earlier
  // GPU occlusion queries were "free" on paper but polling query results
  // forces a GPU sync on some drivers - a visible hitch every time a
  // marker crossed an occlusion boundary.
  // ------------------------------------------------------------------
  runOcclusionTestsTri(e, t) {
    const i = this.THREE;
    this._occScratch || (this._occScratch = {
      right: new i.Vector3(),
      up: new i.Vector3(),
      point: new i.Vector3(),
      cam: new i.Vector3()
    });
    const s = this._occScratch;
    s.cam.setFromMatrixPosition(e.matrixWorld), s.right.setFromMatrixColumn(e.matrixWorld, 0), s.up.setFromMatrixColumn(e.matrixWorld, 1);
    const n = 2 * Math.tan((e.fov || 60) * Math.PI / 360);
    for (const [r, o] of this.markers) {
      if (o._bvVisible === !1) continue;
      const a = this.displayPositions.get(r);
      if (!a) continue;
      const l = a.x - s.cam.x, d = a.y - s.cam.y, h = a.z - s.cam.z, u = Math.sqrt(l * l + d * d + h * h), A = Math.max(1e-3, u * n * (9 / Math.max(1, t.height)));
      let p = 0;
      for (let g = 0; g < 5; g++) {
        const b = g === 1 ? A : g === 2 ? -A : 0, y = g === 3 ? A : g === 4 ? -A : 0;
        s.point.set(
          a.x + s.right.x * b + s.up.x * y,
          a.y + s.right.y * b + s.up.y * y,
          a.z + s.right.z * b + s.up.z * y
        ), this.triRayBlocked(s.point, s.cam, u) || p++;
      }
      const f = p / 5;
      this.occlusionTargets.set(r, bt + (1 - bt) * f);
    }
  }
  /**
   * Is the segment point->camera blocked by the model? Clearance at both
   * ends so surface-mounted markers never self-occlude.
   */
  triRayBlocked(e, t, i) {
    const s = this.THREE, n = this._triGrids?.grids;
    if (!n) return !1;
    this._blockScratch || (this._blockScratch = { inv: new s.Matrix4(), p: new s.Vector3(), c: new s.Vector3() });
    const r = this._blockScratch, o = Math.min(0.45, 0.35 / Math.max(1e-3, i)), a = Math.min(0.45, 0.2 / Math.max(1e-3, i));
    for (const l of n) {
      r.inv.copy(l.mesh.matrixWorld).invert(), r.p.copy(e).applyMatrix4(r.inv), r.c.copy(t).applyMatrix4(r.inv);
      const d = r.c.x - r.p.x, h = r.c.y - r.p.y, u = r.c.z - r.p.z, A = r.p.x + d * o, p = r.p.y + h * o, f = r.p.z + u * o, g = this.raycastTriGridLocal(l, A, p, f, d, h, u);
      if (g >= 0 && g < 1 - o - a) return !0;
    }
    return !1;
  }
  // ------------------------------------------------------------------
  // Occlusion fade - voxel occupancy grid (fallback path)
  //
  // Raycasting the wreck mesh per frame is far too expensive (tens of ms
  // on quest-scale models). Instead the model's vertices are sampled once
  // into a coarse voxel grid, built incrementally over a few frames with a
  // small time budget; each occlusion check is then a short ray-march
  // through the grid - microseconds per marker, no frame spikes.
  // Conservative by design: a marker only fades when the ray to the camera
  // passes through clearly solid hull (two consecutive occupied voxels),
  // with clearance at both ends so surface-mounted markers never flicker.
  // ------------------------------------------------------------------
  stepOcclusionGridBuild(e = 2.5) {
    const t = this.getModelRoot();
    if (!t) {
      this._grid = null, this._gridBuild = null;
      return;
    }
    if (this.isDynamicTilesetRoot(t)) {
      this._grid = null, this._gridBuild = null;
      return;
    }
    if (this._grid && this._grid.rootUuid === t.uuid) return;
    this._grid && this._grid.rootUuid !== t.uuid && (this._grid = null), this._gridBuild && this._gridBuild.rootUuid !== t.uuid && (this._gridBuild = null);
    const i = this.THREE;
    if (!this._gridBuild) {
      const a = new i.Box3().setFromObject(t);
      if (a.isEmpty()) return;
      const l = a.getSize(new i.Vector3()), h = Math.max(l.x, l.y, l.z, 1e-3) / 96, u = Math.min(160, Math.max(2, Math.ceil(l.x / h) + 2)), A = Math.min(160, Math.max(2, Math.ceil(l.y / h) + 2)), p = Math.min(160, Math.max(2, Math.ceil(l.z / h) + 2)), f = [];
      t.updateWorldMatrix(!0, !0), t.traverse((g) => {
        g.isMesh && g.visible && g.geometry?.attributes?.position && f.push(g);
      }), this._gridBuild = {
        rootUuid: t.uuid,
        minX: a.min.x - h,
        minY: a.min.y - h,
        minZ: a.min.z - h,
        cell: h,
        nx: u,
        ny: A,
        nz: p,
        data: new Uint8Array(u * A * p),
        jobs: f,
        jobIndex: 0,
        vertIndex: 0
      };
    }
    const s = this._gridBuild, n = performance.now() + e, r = this._tmpVecA;
    let o = 0;
    for (; s.jobIndex < s.jobs.length; ) {
      const a = s.jobs[s.jobIndex], l = a.geometry.attributes.position, d = l.count, h = Math.max(1, Math.floor(d / 2e5));
      let u = s.vertIndex;
      for (; u < d; ) {
        r.fromBufferAttribute(l, u).applyMatrix4(a.matrixWorld);
        const A = (r.x - s.minX) / s.cell | 0, p = (r.y - s.minY) / s.cell | 0, f = (r.z - s.minZ) / s.cell | 0;
        if (A >= 0 && p >= 0 && f >= 0 && A < s.nx && p < s.ny && f < s.nz && (s.data[(f * s.ny + p) * s.nx + A] = 1), u += h, ++o >= 2e3 && (o = 0, performance.now() > n)) {
          s.vertIndex = u;
          return;
        }
      }
      s.jobIndex++, s.vertIndex = 0;
    }
    this._grid = s, this._gridBuild = null;
  }
  gridRayOccluded(e, t, i, s, n) {
    const r = i - t.x, o = s - t.y, a = n - t.z, l = Math.sqrt(r * r + o * o + a * a);
    if (l < e.cell * 3.5) return !1;
    const d = 1 / l, h = r * d, u = o * d, A = a * d, p = e.cell * 1.8, f = l - e.cell * 1.2, g = e.cell * 0.6;
    let b = 0;
    for (let y = p; y < f; y += g) {
      const E = (t.x + h * y - e.minX) / e.cell | 0, C = (t.y + u * y - e.minY) / e.cell | 0, w = (t.z + A * y - e.minZ) / e.cell | 0;
      if (E < 0 || C < 0 || w < 0 || E >= e.nx || C >= e.ny || w >= e.nz) {
        b = 0;
        continue;
      }
      if (e.data[(w * e.ny + C) * e.nx + E]) {
        if (++b >= 2) return !0;
      } else
        b = 0;
    }
    return !1;
  }
  gridRaycastFromClient(e, t) {
    const i = this._grid, s = this.THREE, n = this.getCamera(), r = this.getRects();
    if (!i || !s || !n || !r) return null;
    const o = (e - r.rect.left) / r.rect.width * 2 - 1, a = -((t - r.rect.top) / r.rect.height) * 2 + 1;
    this._gridRaycaster || (this._gridRaycaster = new s.Raycaster()), this._gridRaycaster.setFromCamera({ x: o, y: a }, n);
    const l = this._gridRaycaster.ray.origin, d = this._gridRaycaster.ray.direction, h = i.minX + i.nx * i.cell, u = i.minY + i.ny * i.cell, A = i.minZ + i.nz * i.cell;
    let p = 0, f = 1 / 0;
    const g = [
      [l.x, d.x, i.minX, h],
      [l.y, d.y, i.minY, u],
      [l.z, d.z, i.minZ, A]
    ];
    for (const [y, E, C, w] of g) {
      if (Math.abs(E) < 1e-9) {
        if (y < C || y > w) return null;
        continue;
      }
      const S = (C - y) / E, v = (w - y) / E;
      p = Math.max(p, Math.min(S, v)), f = Math.min(f, Math.max(S, v));
    }
    if (f < p) return null;
    const b = i.cell * 0.5;
    for (let y = Math.max(p, b); y < f; y += b) {
      const E = l.x + d.x * y, C = l.y + d.y * y, w = l.z + d.z * y, S = (E - i.minX) / i.cell | 0, v = (C - i.minY) / i.cell | 0, I = (w - i.minZ) / i.cell | 0;
      if (!(S < 0 || v < 0 || I < 0 || S >= i.nx || v >= i.ny || I >= i.nz) && i.data[(I * i.ny + v) * i.nx + S])
        return { x: E, y: C, z: w };
    }
    return null;
  }
  // ------------------------------------------------------------------
  // Precise raycasts - triangle-bucket grid
  //
  // three.js raycasts the wreck mesh triangle-by-triangle (no BVH): over
  // half a second on photogrammetry-scale models, which froze the frame on
  // every drop, click-to-place and right-click. Instead each mesh's
  // triangles are bucketed once into a coarse local-space grid (built
  // incrementally on the frame budget); a precise raycast is then a short
  // DDA walk through the buckets with exact ray-triangle tests against a
  // handful of triangles - microseconds, mesh-exact. This is what lets the
  // drag path itself be precise, so nothing jumps on release.
  // ------------------------------------------------------------------
  stepTriGridBuild(e = 3) {
    const t = this.getModelRoot();
    if (!t) {
      this._triGrids = null, this._triBuild = null;
      return;
    }
    if (this.isDynamicTilesetRoot(t)) {
      this._triGrids = null, this._triBuild = null;
      return;
    }
    if (this._triGrids && this._triGrids.rootUuid === t.uuid) return;
    if (this._triGrids && this._triGrids.rootUuid !== t.uuid && (this._triGrids = null), this._triBuild && this._triBuild.rootUuid !== t.uuid && (this._triBuild = null), !this._triBuild) {
      t.updateMatrixWorld(!0);
      const n = [];
      if (t.traverse((r) => {
        r.isMesh && r.visible && r.geometry?.attributes?.position && n.push(r);
      }), !n.length) return;
      this._triBuild = { rootUuid: t.uuid, meshes: n, meshIdx: 0, entry: null, grids: [] };
    }
    const i = this._triBuild, s = performance.now() + e;
    for (; performance.now() < s; ) {
      if (i.meshIdx >= i.meshes.length) {
        this._triGrids = { rootUuid: i.rootUuid, grids: i.grids }, this._triBuild = null;
        return;
      }
      const n = i.meshes[i.meshIdx];
      if (!i.entry) {
        const o = n.geometry;
        o.boundingBox || o.computeBoundingBox();
        const a = o.boundingBox, l = o.attributes.position, d = o.index ? o.index.array : null, h = (d ? d.length : l.count) / 3 | 0, u = Math.max(1e-6, a.max.x - a.min.x), A = Math.max(1e-6, a.max.y - a.min.y), p = Math.max(1e-6, a.max.z - a.min.z), f = Math.max(u, A, p) / 128, g = Math.max(1, Math.min(256, Math.ceil(u / f))), b = Math.max(1, Math.min(256, Math.ceil(A / f))), y = Math.max(1, Math.min(256, Math.ceil(p / f)));
        i.entry = {
          mesh: n,
          posAttr: l,
          index: d,
          triCount: h,
          minX: a.min.x,
          minY: a.min.y,
          minZ: a.min.z,
          cellX: u / g,
          cellY: A / b,
          cellZ: p / y,
          nx: g,
          ny: b,
          nz: y,
          counts: new Uint32Array(g * b * y + 1),
          offsets: null,
          buckets: null,
          cursor: 0,
          phase: 0
        };
      }
      const r = i.entry;
      if (r.phase === 0 || r.phase === 2) {
        const a = Math.min(r.triCount, r.cursor + 8e3);
        if (this.bucketTriangles(r, r.cursor, a, r.phase === 2), r.cursor = a, r.cursor >= r.triCount)
          if (r.phase === 0) {
            const l = r.counts;
            for (let d = 1; d < l.length; d++) l[d] += l[d - 1];
            r.offsets = l, r.buckets = new Uint32Array(l[l.length - 1]), r.fillCursor = new Uint32Array(l.length - 1), r.phase = 2, r.cursor = 0;
          } else
            i.grids.push({
              mesh: r.mesh,
              posAttr: r.posAttr,
              index: r.index,
              minX: r.minX,
              minY: r.minY,
              minZ: r.minZ,
              cellX: r.cellX,
              cellY: r.cellY,
              cellZ: r.cellZ,
              nx: r.nx,
              ny: r.ny,
              nz: r.nz,
              offsets: r.offsets,
              buckets: r.buckets
            }), i.meshIdx++, i.entry = null;
      }
    }
  }
  /** Map triangles [from, to) to overlapped cells: count them or write them. */
  bucketTriangles(e, t, i, s) {
    const { posAttr: n, index: r, nx: o, ny: a, nz: l, minX: d, minY: h, minZ: u, cellX: A, cellY: p, cellZ: f } = e;
    for (let g = t; g < i; g++) {
      const b = r ? r[g * 3] : g * 3, y = r ? r[g * 3 + 1] : g * 3 + 1, E = r ? r[g * 3 + 2] : g * 3 + 2, C = n.getX(b), w = n.getY(b), S = n.getZ(b), v = n.getX(y), I = n.getY(y), B = n.getZ(y), M = n.getX(E), x = n.getY(E), Q = n.getZ(E);
      let P = (Math.min(C, v, M) - d) / A | 0, T = (Math.max(C, v, M) - d) / A | 0, U = (Math.min(w, I, x) - h) / p | 0, L = (Math.max(w, I, x) - h) / p | 0, _ = (Math.min(S, B, Q) - u) / f | 0, F = (Math.max(S, B, Q) - u) / f | 0;
      P < 0 && (P = 0), U < 0 && (U = 0), _ < 0 && (_ = 0), T >= o && (T = o - 1), L >= a && (L = a - 1), F >= l && (F = l - 1);
      for (let O = _; O <= F; O++)
        for (let z = U; z <= L; z++) {
          const j = (O * a + z) * o;
          for (let q = P; q <= T; q++) {
            const re = j + q;
            s ? e.buckets[e.offsets[re] + e.fillCursor[re]++] = g : e.counts[re + 1]++;
          }
        }
    }
  }
  /**
   * Exact nearest ray-mesh hit via the bucket grid (local space DDA +
   * Moller-Trumbore). Returns the world-space hit point or null.
   */
  raycastTriGrids(e, t) {
    const i = this.THREE, s = this._triGrids?.grids;
    if (!s || !i) return null;
    this._triScratch || (this._triScratch = {
      inv: new i.Matrix4(),
      o: new i.Vector3(),
      d: new i.Vector3(),
      hit: new i.Vector3(),
      best: new i.Vector3()
    });
    const n = this._triScratch;
    let r = 1 / 0, o = !1;
    for (const a of s) {
      n.inv.copy(a.mesh.matrixWorld).invert(), n.o.copy(e).applyMatrix4(n.inv), n.d.copy(t).transformDirection(n.inv);
      const l = this.raycastTriGridLocal(a, n.o.x, n.o.y, n.o.z, n.d.x, n.d.y, n.d.z);
      if (l >= 0) {
        n.hit.set(n.o.x + n.d.x * l, n.o.y + n.d.y * l, n.o.z + n.d.z * l).applyMatrix4(a.mesh.matrixWorld);
        const d = n.hit.distanceToSquared(e);
        d < r && (r = d, n.best.copy(n.hit), o = !0);
      }
    }
    return o ? { x: n.best.x, y: n.best.y, z: n.best.z } : null;
  }
  /** DDA walk through one grid; returns nearest hit t in local units, or -1. */
  raycastTriGridLocal(e, t, i, s, n, r, o) {
    const a = e.minX + e.nx * e.cellX, l = e.minY + e.ny * e.cellY, d = e.minZ + e.nz * e.cellZ;
    let h = 0, u = 1 / 0;
    const A = [
      [t, n, e.minX, a],
      [i, r, e.minY, l],
      [s, o, e.minZ, d]
    ];
    for (let L = 0; L < 3; L++) {
      const [_, F, O, z] = A[L];
      if (Math.abs(F) < 1e-12) {
        if (_ < O || _ > z) return -1;
        continue;
      }
      const j = (O - _) / F, q = (z - _) / F;
      h = Math.max(h, Math.min(j, q)), u = Math.min(u, Math.max(j, q));
    }
    if (u < h) return -1;
    const p = 1e-7, f = t + n * (h + p), g = i + r * (h + p), b = s + o * (h + p);
    let y = Math.min(e.nx - 1, Math.max(0, (f - e.minX) / e.cellX | 0)), E = Math.min(e.ny - 1, Math.max(0, (g - e.minY) / e.cellY | 0)), C = Math.min(e.nz - 1, Math.max(0, (b - e.minZ) / e.cellZ | 0));
    const w = n > 0 ? 1 : -1, S = r > 0 ? 1 : -1, v = o > 0 ? 1 : -1, I = Math.abs(e.cellX / (n || 1e-30)), B = Math.abs(e.cellY / (r || 1e-30)), M = Math.abs(e.cellZ / (o || 1e-30)), x = (L, _, F, O, z) => _ + (O + (z > 0 ? 1 : 0)) * F;
    let Q = n !== 0 ? h + (x(f, e.minX, e.cellX, y, w) - f) / n : 1 / 0, P = r !== 0 ? h + (x(g, e.minY, e.cellY, E, S) - g) / r : 1 / 0, T = o !== 0 ? h + (x(b, e.minZ, e.cellZ, C, v) - b) / o : 1 / 0, U = 1 / 0;
    for (let L = 0; L < 1024; L++) {
      const _ = (C * e.ny + E) * e.nx + y, F = e.offsets[_], O = e.offsets[_ + 1];
      for (let j = F; j < O; j++) {
        const q = this.rayTriangle(e, e.buckets[j], t, i, s, n, r, o);
        q >= h - 1e-6 && q < U && (U = q);
      }
      const z = Math.min(Q, P, T);
      if (U <= z) return U;
      if (z > u) break;
      if (Q <= P && Q <= T) {
        if (y += w, Q += I, y < 0 || y >= e.nx) break;
      } else if (P <= T) {
        if (E += S, P += B, E < 0 || E >= e.ny) break;
      } else if (C += v, T += M, C < 0 || C >= e.nz) break;
    }
    return U < 1 / 0 ? U : -1;
  }
  /** Moller-Trumbore ray-triangle intersection; returns t or -1. */
  rayTriangle(e, t, i, s, n, r, o, a) {
    const { posAttr: l, index: d } = e, h = d ? d[t * 3] : t * 3, u = d ? d[t * 3 + 1] : t * 3 + 1, A = d ? d[t * 3 + 2] : t * 3 + 2, p = l.getX(h), f = l.getY(h), g = l.getZ(h), b = l.getX(u), y = l.getY(u), E = l.getZ(u), C = l.getX(A), w = l.getY(A), S = l.getZ(A), v = b - p, I = y - f, B = E - g, M = C - p, x = w - f, Q = S - g, P = o * Q - a * x, T = a * M - r * Q, U = r * x - o * M, L = v * P + I * T + B * U;
    if (L > -1e-12 && L < 1e-12) return -1;
    const _ = 1 / L, F = i - p, O = s - f, z = n - g, j = (F * P + O * T + z * U) * _;
    if (j < -1e-6 || j > 1 + 1e-6) return -1;
    const q = O * B - z * I, re = z * v - F * B, Dt = F * I - O * v, ks = (r * q + o * re + a * Dt) * _;
    if (ks < -1e-6 || j + ks > 1 + 1e-6) return -1;
    const Fs = (M * q + x * re + Q * Dt) * _;
    return Fs > 1e-6 ? Fs : -1;
  }
  runOcclusionTests(e) {
    const t = this._grid;
    if (!t) return;
    const i = this._tmpVecB.setFromMatrixPosition(e.matrixWorld);
    for (const [s, n] of this.markers) {
      if (n._bvVisible === !1) continue;
      const r = this.displayPositions.get(s);
      if (!r) continue;
      const o = this.gridRayOccluded(t, r, i.x, i.y, i.z);
      this.occlusionTargets.set(s, o ? bt : 1);
    }
  }
  runTilesetOcclusionTests(e, t) {
    const i = this.THREE;
    if (!i || !t) return;
    this._tilesetOcclusion || (this._tilesetOcclusion = {
      raycaster: new i.Raycaster(),
      camera: new i.Vector3(),
      direction: new i.Vector3(),
      offset: new i.Vector3(),
      box: new i.Box3(),
      size: new i.Vector3(),
      cursor: 0,
      tolerance: 0.35,
      rootUuid: null,
      refreshAt: 0,
      nextAt: 0
    });
    const s = this._tilesetOcclusion, n = performance.now();
    if (n < s.nextAt) return;
    if (s.nextAt = n + 250, s.rootUuid !== t.uuid || n >= s.refreshAt) {
      s.box.setFromObject(t).getSize(s.size);
      const a = Math.max(s.size.x, s.size.y, s.size.z, 1);
      s.tolerance = Math.max(0.15, Math.min(1.5, a * 8e-3)), s.rootUuid = t.uuid, s.refreshAt = n + 1200;
    }
    const r = Array.from(this.markers.entries());
    if (!r.length) return;
    s.camera.setFromMatrixPosition(e.matrixWorld);
    const o = Math.min(1, r.length);
    for (let a = 0; a < o; a++) {
      const [l, d] = r[s.cursor++ % r.length];
      if (d._bvVisible === !1) continue;
      const h = this.displayPositions.get(l);
      if (!h) continue;
      s.direction.set(h.x, h.y, h.z).sub(s.camera);
      const u = s.direction.length();
      if (u < 1e-3) continue;
      s.direction.multiplyScalar(1 / u), s.raycaster.set(s.camera, s.direction), s.raycaster.near = 0, s.raycaster.far = u + s.tolerance;
      const A = s.raycaster.intersectObject(t, !0).find((g) => g.object?.isMesh && g.object.visible);
      if (!A) {
        this.occlusionTargets.set(l, bt);
        continue;
      }
      const p = A.point.distanceTo(h), f = A.distance < u - 0.12;
      p <= s.tolerance ? (s.offset.copy(s.camera).sub(A.point).normalize().multiplyScalar(0.03), h.x = A.point.x + s.offset.x, h.y = A.point.y + s.offset.y, h.z = A.point.z + s.offset.z, this.occlusionTargets.set(l, 1)) : this.occlusionTargets.set(l, f ? bt : 1);
    }
  }
  // ------------------------------------------------------------------
  // Dive-mode torch lighting
  // ------------------------------------------------------------------
  getDiveLightState() {
    const t = (window.BelowJSViewer || this.viewer)?.diveSystem;
    if (!t?.isDiveModeEnabled) return null;
    const i = t.torch;
    if (!!!i?.isVisible?.() || !i.controllerSpotlight || !i.spotlightTarget)
      return { uniformDim: !0 };
    const n = i.controllerSpotlight, r = i.spotlightTarget, o = this._tmpVecB.set(
      r.position.x - n.position.x,
      r.position.y - n.position.y,
      r.position.z - n.position.z
    );
    return o.lengthSq() < 1e-8 ? { uniformDim: !0 } : (o.normalize(), {
      uniformDim: !1,
      position: n.position,
      direction: { x: o.x, y: o.y, z: o.z },
      cosInner: Math.cos((n.angle || 0.5) * 0.75),
      cosOuter: Math.cos((n.angle || 0.5) * 1.35),
      maxDistance: n.distance && n.distance > 0 ? n.distance : 30
    });
  }
  computeLightFactor(e, t) {
    if (t.uniformDim) return $t;
    const i = e.x - t.position.x, s = e.y - t.position.y, n = e.z - t.position.z, r = Math.sqrt(i * i + s * s + n * n);
    if (r < 0.25) return 1;
    if (r > t.maxDistance) return $t;
    const o = (i * t.direction.x + s * t.direction.y + n * t.direction.z) / r;
    let a;
    o >= t.cosInner ? a = 1 : o <= t.cosOuter ? a = 0 : a = (o - t.cosOuter) / (t.cosInner - t.cosOuter);
    const l = 1 - Math.min(1, r / t.maxDistance) * 0.35;
    return $t + (1 - $t) * a * l;
  }
  // ------------------------------------------------------------------
  // Right-click: pings + context menus
  // ------------------------------------------------------------------
  onCanvasContextMenu(e) {
    e.preventDefault();
  }
  handleModelRightClick(e) {
    if (this.readOnly) return;
    if (!this.annotationsVisible) {
      this.showToast("Annotations are hidden · use the pin button to show them");
      return;
    }
    if (this.moveTarget !== null) {
      this.finishMoveMode(!0);
      return;
    }
    for (const [r, o] of this.scaleBars)
      if (o.lineHovered) {
        this.openBarMenu(r, e.clientX, e.clientY);
        return;
      }
    const t = this.raycastModelFromClient(e.clientX, e.clientY);
    if (!t) return;
    const i = this.worldPositionToModel(t), s = e.clientX, n = e.clientY;
    this.options.rightClickPing && (this.removeLocalPing(), this.localPingKey = this.showPing(i, { ttlMs: null }), this.sendMessage({ type: "annotation_update", action: "ping", position: i }, { quiet: !0 })), this.openMenu([
      {
        label: "Add annotation here",
        onSelect: () => this.openCreatePanel(i, s, n)
      }
    ], s, n, () => {
      this.expireLocalPing(900);
    });
  }
  openMarkerMenu(e, t, i, { touchPairing: s = !1 } = {}) {
    if (this.moveTarget !== null) {
      this.finishMoveMode(!0);
      return;
    }
    const n = this.annotations.get(e);
    if (!n) return;
    this.focusAnnotationForPairing(e, { touchPairing: s });
    const r = [
      { label: "View", onSelect: () => this.openViewPanel(e) }
    ];
    if (!this.readOnly) {
      const o = this.remoteEditorOf(e);
      r.push(
        {
          label: "Edit",
          disabled: !!o,
          hint: o ? `${o} is editing` : null,
          onSelect: () => this.openEditPanel(e)
        },
        { label: "Move", onSelect: () => this.enterMoveMode(e) },
        {
          label: n.collapsed ? "Expand" : "Collapse",
          onSelect: () => this.sendMessage({
            type: "annotation_update",
            action: "collapse",
            id: e,
            collapsed: !n.collapsed
          })
        }
      );
      const a = this.currentScalePair();
      if (a && a.includes(e) && !this.scaleBarForPair(a[0], a[1]))
        r.push({ label: "Create scale bar", onSelect: () => this.createScaleBarFromSelection() });
      else if (this.selection.length > 2 && this.selection.includes(e)) {
        const l = this.selection.length, d = this.selection.slice(), h = d.every((u) => this.annotations.get(u)?.collapsed);
        r.push(
          {
            label: h ? `Expand ${l} markers` : `Collapse ${l} markers`,
            onSelect: () => {
              for (const u of d)
                this.sendMessage({
                  type: "annotation_update",
                  action: "collapse",
                  id: u,
                  collapsed: !h
                });
            }
          },
          {
            label: `Delete ${l} markers`,
            danger: !0,
            onSelect: () => {
              for (const u of d)
                this.remove(u);
              this.clearSelection();
            }
          }
        );
      }
      r.push({
        label: "Delete",
        danger: !0,
        onSelect: () => this.remove(e)
      });
    }
    this.openMenu(r, t, i);
  }
  openMenu(e, t, i, s = null) {
    this.closeMenu();
    const n = document.createElement("div");
    n.className = "bv-annotation-menu";
    for (const r of e) {
      const o = document.createElement("button");
      if (o.className = "bv-annotation-menu__item" + (r.danger ? " bv-annotation-menu__item--danger" : ""), o.textContent = r.label, r.disabled) {
        if (o.disabled = !0, r.hint) {
          const a = document.createElement("span");
          a.className = "bv-annotation-menu__hint", a.textContent = r.hint, o.appendChild(a);
        }
      } else
        o.addEventListener("click", (a) => {
          a.stopPropagation(), this._menuChosen = !0, this.closeMenu(), r.onSelect();
        });
      n.appendChild(o);
    }
    this.container.appendChild(n), this.menuEl = n, this._menuChosen = !1, this._menuOnDismiss = s, this.positionFloating(n, t, i);
  }
  closeMenu() {
    if (!this.menuEl) return;
    const e = !this._menuChosen;
    if (this.menuEl.remove(), this.menuEl = null, e && this._menuOnDismiss) {
      const t = this._menuOnDismiss;
      this._menuOnDismiss = null, t();
    } else
      this._menuOnDismiss = null;
  }
  showPing(e, { color: t = null, ttlMs: i = rr, remote: s = !1 } = {}) {
    const n = `ping_${++this.pingCounter}`, r = document.createElement("div");
    r.className = "bv-annotation-ping" + (s ? " bv-annotation-ping--remote" : "");
    const o = document.createElement("div");
    o.className = "bv-annotation-ping__core", t && (o.style.background = t);
    const a = document.createElement("div");
    return a.className = "bv-annotation-ping__title", r.appendChild(o), r.appendChild(a), r.style.display = "none", this.overlayEl.appendChild(r), this.pings.set(n, {
      el: r,
      titleEl: a,
      position: { ...e },
      expiresAt: i === null ? null : performance.now() + i,
      leaving: !1,
      removeAt: 0
    }), n;
  }
  /** One live ping per remote user: update it in place, refresh its TTL. */
  upsertUserPing(e, t, i, s) {
    const n = this.focusUserKey(e);
    if (n === null) return;
    const r = this.userPings.get(n);
    let o = r ? this.pings.get(r) : null;
    if (!o || o.leaving) {
      const a = this.showPing(t, { color: s, remote: !0 });
      this.userPings.set(n, a), o = this.pings.get(a);
    } else
      o.position = { ...t }, o.expiresAt = performance.now() + rr;
    i ? (o.titleEl.textContent = i, o.titleEl.style.display = "block") : o.titleEl.style.display = "none";
  }
  /** Begin a ping's graceful fade-and-shrink exit. */
  dismissPing(e) {
    const t = this.pings.get(e);
    !t || t.leaving || (t.leaving = !0, t.el.classList.add("bv-annotation-ping--leaving"), t.removeAt = performance.now() + 380);
  }
  removeLocalPing() {
    this.localPingKey && (this.dismissPing(this.localPingKey), this.localPingKey = null);
  }
  expireLocalPing(e) {
    if (!this.localPingKey) return;
    const t = this.pings.get(this.localPingKey);
    t && !t.leaving && (t.expiresAt = performance.now() + e), this.localPingKey = null;
  }
  // ------------------------------------------------------------------
  // Focus presence: selections and live edits from other users
  // ------------------------------------------------------------------
  markerShouldStayOpaque(e) {
    if (this.selection.includes(e) || this.openPanelFor === e || this.moveTarget === e || this.dragState?.id === e || this._editingId === e)
      return !0;
    for (const t of this.remoteFocus.values())
      if (t.editing === e || t.selected?.includes(e))
        return !0;
    return !1;
  }
  /** Broadcast what we have selected / open / are editing (broadcast-only, like pings). */
  sendFocus() {
    if (this.readOnly || this._mirroredFocusUserId !== null) return;
    const e = this.selection.slice(0, 31);
    this.openPanelFor !== null && !e.includes(this.openPanelFor) && e.push(this.openPanelFor);
    const t = this.stickyBarIds().slice(0, 31), i = this.currentScalePair(), s = this.openPanelFor !== null && this.panelEl?.dataset.mode ? this.panelEl.dataset.mode === "edit" ? "edit" : "view" : null;
    this.sendMessage({
      type: "annotation_update",
      action: "focus",
      annotations_visible: this.annotationsVisible,
      editing: this._editingId,
      open_panel: this.openPanelFor,
      panel_mode: s,
      selected: e,
      selected_pair: i,
      selected_bars: t,
      title: this._editDraftTitle,
      notes: this._editDraftNotes
    }, { quiet: !0 });
    const n = this._editingId !== null || this.selection.length > 0 || this.hasLocalFollowAudience() || t.length > 0 || this.openPanelFor !== null;
    n && !this._focusInterval ? this._focusInterval = setInterval(() => this.sendFocus(), 2500) : !n && this._focusInterval && (clearInterval(this._focusInterval), this._focusInterval = null);
  }
  upsertRemoteFocus(e) {
    const t = this.getMessageParticipantId(e);
    if (t === null) return;
    const i = typeof e.annotations_visible == "boolean", s = i ? !!e.annotations_visible : !0, n = typeof e.editing == "number" ? e.editing : null, r = typeof e.open_panel == "number" ? e.open_panel : null, o = e.panel_mode === "edit" ? "edit" : e.panel_mode === "view" ? "view" : null, a = Array.isArray(e.selected) ? e.selected.filter((h) => typeof h == "number") : [], l = Array.isArray(e.selected_pair) ? e.selected_pair.filter((h) => typeof h == "number").slice(0, 2) : null, d = Array.isArray(e.selected_bars) ? e.selected_bars.filter((h) => typeof h == "number") : [];
    !i && n === null && r === null && a.length === 0 && !l?.length && d.length === 0 ? this.remoteFocus.delete(t) : this.remoteFocus.set(t, {
      annotationsVisible: s,
      editing: n,
      openPanel: r,
      panelMode: r !== null ? o || (n === r ? "edit" : "view") : null,
      selected: a,
      selectedPair: l?.length === 2 ? l : null,
      selectedBars: d,
      title: String(e.title || ""),
      notes: String(e.notes || ""),
      username: e.username || "",
      color: e.avatar_color || null,
      expiresAt: performance.now() + rd
    }), this.applyRemoteFocusVisuals(), this.syncFollowedAnnotationPanel();
  }
  /** Who (if anyone) is editing this annotation right now. */
  remoteEditorOf(e) {
    for (const t of this.remoteFocus.values())
      if (t.editing === e) return t.username || "Someone";
    return null;
  }
  applyRemoteFocusVisuals() {
    const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
    for (const s of this.remoteFocus.values()) {
      for (const n of s.selected)
        e.has(n) || e.set(n, s.color);
      for (const n of s.selectedBars || [])
        t.has(n) || t.set(n, s.color);
      s.editing !== null && i.set(s.editing, s);
    }
    for (const [s, n] of this.markers) {
      const r = e.get(s);
      n.classList.toggle("bv-annotation-marker--remote-selected", e.has(s)), r ? n.style.setProperty("--bv-remote-ring", this.colorWithAlpha(r, 0.4)) : n.style.removeProperty("--bv-remote-ring");
      const o = i.get(s);
      n.classList.toggle("bv-annotation-marker--remote-editing", !!o);
      const a = n.querySelector(".bv-annotation-marker__title");
      if (a)
        if (o) {
          a.textContent = o.title || this.annotations.get(s)?.title || "";
          const l = document.createElement("span");
          l.className = "bv-annotation-caret", a.appendChild(l), o.color && n.style.setProperty("--bv-remote-color", o.color);
        } else
          a.textContent = this.annotations.get(s)?.title || "", n.style.removeProperty("--bv-remote-color");
    }
    for (const [s, n] of this.scaleBars) {
      const r = t.get(s) || null;
      n.remoteSelected = t.has(s), n.remoteColor = r, n.labelEl && (n.labelEl.classList.toggle("bv-annotation-scale-label--remote-selected", n.remoteSelected), r ? (n.labelEl.style.setProperty("--bv-remote-scale-color", r), n.labelEl.style.setProperty("--bv-remote-scale-ring", this.colorWithAlpha(r, 0.35))) : (n.labelEl.style.removeProperty("--bv-remote-scale-color"), n.labelEl.style.removeProperty("--bv-remote-scale-ring"))), this.setBarHoverState(n);
    }
    if (this.reconcileRemotePreviewBars(), this.panelEl?.dataset.mode === "view" && this.openPanelFor !== null) {
      const s = this.panelEl.querySelector(".bv-annotation-edit");
      if (s) {
        const n = this.remoteEditorOf(this.openPanelFor);
        s.disabled = !!n, s.title = n ? `${n} is editing` : "";
      }
    }
  }
  /** Drop remote focus entries whose keepalive stopped (left, disconnected). */
  sweepRemoteFocus(e) {
    let t = !1;
    for (const [i, s] of this.remoteFocus)
      e > s.expiresAt && (this.remoteFocus.delete(i), t = !0);
    t && (this.applyRemoteFocusVisuals(), this.syncFollowedAnnotationPanel());
  }
  followedUserId() {
    if (this._followedParticipantId !== void 0) return this._followedParticipantId;
    const e = typeof window < "u" ? window.collaboration : null;
    return !e?.isFollowing || e.followingUser === null || e.followingUser === void 0 ? null : String(e.followingUser);
  }
  hasLocalFollowAudience() {
    if (typeof this.adapter?.hasLocalFollowAudience == "function")
      return !!this.adapter.hasLocalFollowAudience();
    const e = typeof window < "u" ? window.collaboration : null, t = e?.getCurrentParticipantId?.() ?? this.getLocalParticipantId();
    if (t == null || !e?.followingRelationships) return !1;
    const i = String(t);
    for (const s of e.followingRelationships.values())
      if (String(s?.following) === i) return !0;
    return !1;
  }
  syncFollowedAnnotationPanel() {
    const e = this.followedUserId(), t = e ? this.remoteFocus.get(e) : null;
    t && typeof t.annotationsVisible == "boolean" && this.annotationsVisible !== t.annotationsVisible && this.setAnnotationsVisible(t.annotationsVisible);
    const i = t?.openPanel ?? null;
    if (!this.annotationsVisible || i === null || !this.annotations.has(i)) {
      this._mirroredFocusUserId !== null && this.closePanel({ broadcast: !1 });
      return;
    }
    const s = t.panelMode === "edit" ? "edit" : "view";
    if (this._mirroredFocusUserId === e && this.openPanelFor === i && this.panelEl?.dataset.mode === `follow-${s}`) {
      this.refreshMirroredPanelContent(i, s, t);
      return;
    }
    this.openMirroredFocusPanel(e, i, s, t);
  }
  openMirroredFocusPanel(e, t, i, s) {
    const n = this.annotations.get(t), r = this.markers.get(t);
    if (!n || !r) return;
    const o = this.buildPanel(`follow-${i}`, { broadcastClose: !1 });
    this._mirroredFocusUserId = String(e), this.openPanelFor = t, r.classList.add("bv-annotation-marker--active"), this.refreshMirroredPanelContent(t, i, s);
    const a = r.getBoundingClientRect();
    this.positionFloating(o, a.right, a.top);
  }
  refreshMirroredPanelContent(e, t, i) {
    const s = this.annotations.get(e);
    if (!s || !this.panelEl) return;
    const n = t === "edit" && i?.title ? i.title : s.title, r = t === "edit" && i?.notes ? i.notes : s.notes || "", o = [];
    if (s.created_by && o.push(s.created_by), s.created_at) {
      const a = new Date(s.created_at);
      isNaN(a) || o.push(a.toLocaleDateString());
    }
    if (t === "edit") {
      this.panelEl.innerHTML = `
                <input type="text" class="bv-annotation-input-title" maxlength="${Je}" readonly>
                <textarea class="bv-annotation-input-notes" maxlength="${gt}" readonly></textarea>
                <div class="bv-annotation-panel__meta"></div>
            `, this.panelEl.querySelector(".bv-annotation-input-title").value = n, this.panelEl.querySelector(".bv-annotation-input-notes").value = r, this.panelEl.querySelector(".bv-annotation-panel__meta").textContent = i?.username ? `${i.username} is editing` : "Editing";
      return;
    }
    this.panelEl.innerHTML = `
            <div class="bv-annotation-panel__title"></div>
            ${r ? '<div class="bv-annotation-panel__notes"></div>' : ""}
            ${o.length ? `<div class="bv-annotation-panel__meta">${o.map((a) => this.escapeHtml(a)).join(" · ")}</div>` : ""}
        `, this.panelEl.querySelector(".bv-annotation-panel__title").textContent = n, r && (this.panelEl.querySelector(".bv-annotation-panel__notes").textContent = r);
  }
  colorWithAlpha(e, t) {
    const i = /^#([0-9a-f]{6})$/i.exec(String(e || ""));
    if (!i) return `rgba(255, 255, 255, ${t})`;
    const s = parseInt(i[1], 16);
    return `rgba(${s >> 16 & 255}, ${s >> 8 & 255}, ${s & 255}, ${t})`;
  }
  // ------------------------------------------------------------------
  // Pointer handling: drag detection + selection cleanup
  // ------------------------------------------------------------------
  onCanvasPointerDown(e) {
    e.pointerType === "touch" && this.clearScaleBarLineHover(), this.isContextClick(e) ? (e.preventDefault(), this._rightDrag = { x: e.clientX, y: e.clientY, moved: !1 }) : e.button === 0 && (this._leftDown = { x: e.clientX, y: e.clientY });
  }
  onCanvasPointerMove(e) {
    if (this._rightDrag && !this._rightDrag.moved) {
      const t = e.clientX - this._rightDrag.x, i = e.clientY - this._rightDrag.y;
      t * t + i * i > nr * nr && (this._rightDrag.moved = !0);
    }
    if (this.shouldSuppressBarHover(e)) {
      this.clearScaleBarLineHover();
      return;
    }
    this.updateBarHover(e.clientX, e.clientY);
  }
  onCanvasPointerUp(e) {
    if (this.isContextClick(e)) {
      e.preventDefault();
      const i = this._rightDrag;
      this._rightDrag = null, i && !i.moved && this.handleModelRightClick(e);
      return;
    }
    if (e.button !== 0) return;
    const t = this._leftDown;
    if (this._leftDown = null, !(this._longPressFired && performance.now() - this._longPressFired < 700)) {
      if (this.moveTarget !== null && t) {
        const i = e.clientX - t.x, s = e.clientY - t.y, n = i * i + s * s <= Xt * Xt, r = !!e.target.closest?.(".bv-annotation-marker");
        n && !r && this.finishMoveMode(!0);
        return;
      }
      if (t) {
        const i = e.clientX - t.x, s = e.clientY - t.y;
        if (i * i + s * s <= Xt * Xt) {
          let n = null;
          for (const [r, o] of this.scaleBars)
            if (o.lineHovered) {
              n = r;
              break;
            }
          e.shiftKey ? n !== null && this.toggleStickyBar(n) : n !== null ? this.setStickyBar(n) : (this.setStickyBar(null), this.clearSelection());
        }
      }
    }
  }
  isContextClick(e) {
    return e.button === 2 || e.button === 0 && e.ctrlKey && e.pointerType !== "touch";
  }
  onDocumentPointerDown(e) {
    this.menuEl && !this.menuEl.contains(e.target) && this.closeMenu(), this.panelEl && !this.panelEl.contains(e.target) && !e.target.closest?.(".bv-annotation-marker") && this.panelEl.dataset.mode === "view" && this.closePanel();
  }
  onKeyDown(e) {
    if (!(e.key !== "Escape" && e.key !== "Enter"))
      if (this.dragState)
        this.finishMoveMode(!0), e.stopPropagation();
      else if (this.moveTarget !== null)
        this.finishMoveMode(!0), e.stopPropagation();
      else {
        if (e.key === "Enter")
          return;
        this.menuEl ? (this.closeMenu(), e.stopPropagation()) : this.panelEl && (this.closePanel(), e.stopPropagation());
      }
  }
  // ------------------------------------------------------------------
  // Move mode: a moveable state, not mouse tracking
  // ------------------------------------------------------------------
  enterMoveMode(e) {
    this.readOnly || !this.annotations.has(e) || (this.exitMoveMode(!1), this.closePanel(), this.moveTarget = e, this.markers.get(e)?.classList.add("bv-annotation-marker--moving"), this.showToast("Drag the marker · click away, Enter, or Esc to finish", 6e3));
  }
  exitMoveMode(e) {
    this.dragState && this.cancelMarkerDrag(), this.moveTarget !== null && (this.markers.get(this.moveTarget)?.classList.remove("bv-annotation-marker--moving"), this.moveTarget = null, e && this.showToast("Move finished", 1200));
  }
  finishMoveMode(e) {
    const t = this.moveTarget;
    if (t === null) return;
    if (this.dragState) {
      const { id: s, cleanup: n, lastValidPoint: r } = this.dragState;
      n?.(), this.dragState = null, s === t && r && this.applyMoveDraftPosition(t, r);
    }
    const i = this.annotations.get(t);
    i && this.commitMoveTo(i.position), this.exitMoveMode(e);
  }
  applyMoveDraftPosition(e, t) {
    const i = this.annotations.get(e);
    if (!i || !t) return;
    i.position = this.worldPositionToModel(t);
    const s = this.displayPositions.get(e);
    s && (s.x = t.x, s.y = t.y, s.z = t.z), this.lerping.delete(e), this.refreshBarsForAnnotation(e);
  }
  commitMoveTo(e) {
    const t = this.moveTarget, i = this.annotations.get(t);
    i && (i.position = { ...e }, this.lerping.add(t), this.refreshBarsForAnnotation(t), this.sendMessage({
      type: "annotation_update",
      action: "move",
      commit: !0,
      id: t,
      position: i.position
    }));
  }
  startMarkerDrag(e, t) {
    const i = this.markers.get(e), s = this.annotations.get(e);
    if (!i || !s) return;
    const n = i.querySelector(".bv-annotation-marker__dot") || i;
    this.dragState = {
      id: e,
      pointerId: t.pointerId,
      moved: !1,
      startX: t.clientX,
      startY: t.clientY,
      originalPosition: { ...s.position },
      lastSentAt: 0
    };
    try {
      n.setPointerCapture(t.pointerId);
    } catch {
    }
    const r = (l) => {
      if (!this.dragState || l.pointerId !== this.dragState.pointerId) return;
      l.preventDefault(), l.stopPropagation();
      const d = l.clientX - this.dragState.startX, h = l.clientY - this.dragState.startY;
      if (!this.dragState.moved && d * d + h * h < 9) return;
      this.dragState.moved = !0, this.dragState.screenDrag = !0;
      const u = this.getRects();
      if (u) {
        const p = Math.round((l.clientX - u.hostRect.left) * 10) / 10, f = Math.round((l.clientY - u.hostRect.top) * 10) / 10;
        i.style.transform = `translate3d(${p}px, ${f}px, 0)`, i._bvX = p, i._bvY = f;
      }
      const A = this.raycastModelFromClient(l.clientX, l.clientY);
      if (A) {
        this.dragState.lastValidPoint = A, this.applyMoveDraftPosition(e, A);
        const p = performance.now();
        p - this.dragState.lastSentAt >= nd && (this.dragState.lastSentAt = p, this.sendMessage({
          type: "annotation_update",
          action: "move",
          commit: !1,
          id: e,
          position: s.position
        }, { quiet: !0 }));
      }
    }, o = (l) => {
      if (!this.dragState || l.pointerId !== this.dragState.pointerId) return;
      l.preventDefault(), l.stopPropagation(), document.removeEventListener("pointermove", r, !0), document.removeEventListener("pointerup", o, !0), document.removeEventListener("pointercancel", a, !0);
      const { moved: d, originalPosition: h, lastValidPoint: u } = this.dragState;
      if (this.dragState = null, !d)
        return;
      const A = this.raycastModelFromClient(l.clientX, l.clientY);
      if (A) {
        const p = { x: A.x, y: A.y, z: A.z };
        this.applyMoveDraftPosition(e, p), this.sendMessage({
          type: "annotation_update",
          action: "move",
          commit: !1,
          id: e,
          position: s.position
        }, { quiet: !0 });
      } else if (u)
        this.applyMoveDraftPosition(e, u), this.sendMessage({
          type: "annotation_update",
          action: "move",
          commit: !1,
          id: e,
          position: s.position
        }, { quiet: !0 });
      else {
        s.position = { ...h };
        const p = this.displayPositions.get(e);
        if (p) {
          const f = this.modelPositionToWorld(h);
          p.x = f.x, p.y = f.y, p.z = f.z;
        }
        this.refreshBarsForAnnotation(e);
      }
    }, a = () => this.cancelMarkerDrag();
    document.addEventListener("pointermove", r, !0), document.addEventListener("pointerup", o, !0), document.addEventListener("pointercancel", a, !0), this.dragState.cleanup = () => {
      document.removeEventListener("pointermove", r, !0), document.removeEventListener("pointerup", o, !0), document.removeEventListener("pointercancel", a, !0);
    };
  }
  cancelMarkerDrag() {
    if (!this.dragState) return;
    const { id: e, originalPosition: t, cleanup: i } = this.dragState;
    i?.(), this.dragState = null;
    const s = this.annotations.get(e);
    if (s && t) {
      s.position = { ...t };
      const n = this.displayPositions.get(e);
      n && (n.x = t.x, n.y = t.y, n.z = t.z), this.refreshBarsForAnnotation(e), this.sendMessage({
        type: "annotation_update",
        action: "move",
        commit: !1,
        id: e,
        position: t
      }, { quiet: !0 });
    }
  }
  // ------------------------------------------------------------------
  // Selection + scale bars
  // ------------------------------------------------------------------
  toggleSelection(e) {
    this._touchPairingAnchor = null, this._touchMultiSelectActive = !1;
    const t = this.selection.indexOf(e);
    t !== -1 ? this.selection.splice(t, 1) : this.selection.push(e), this.scalePair = this.selection.length === 2 ? this.selection.slice(0, 2) : null, this.updateSelectionVisuals(), this.selection.length === 1 ? this.showToast("Shift-click another marker to measure between them", 3200) : this.selection.length === 3 && this.showToast("Multi-select: right-click a selected marker for bulk actions", 3200), this.sendFocus();
  }
  focusAnnotationForPairing(e, { touchPairing: t = !1 } = {}) {
    this.readOnly || !this.annotations.has(e) || ((this.selection.length !== 1 || this.selection[0] !== e) && (this.selection = [e], this.scalePair = null, this.updateSelectionVisuals()), this._touchPairingAnchor = t ? e : null, this._touchMultiSelectActive = !!t, this.sendFocus());
  }
  extendSelectionFromCurrentFocus(e) {
    if (this.readOnly || !this.annotations.has(e) || this.moveTarget !== null) return !1;
    if (this._touchMultiSelectActive && this.selection.length >= 2)
      return this.closeMenu(), this.closePanel(), this.selection.includes(e) || (this.selection.push(e), this.updateSelectionVisuals(), this.sendFocus()), !0;
    let t = null;
    return this._touchPairingAnchor !== null && this._touchPairingAnchor !== e && this.annotations.has(this._touchPairingAnchor) && (t = this._touchPairingAnchor), t === null ? !1 : (this.closeMenu(), this.closePanel(), this.selection = [t, e], this.scalePair = [t, e], this._touchPairingAnchor = t, this._touchMultiSelectActive = !0, this.updateSelectionVisuals(), this.scaleBarForPair(t, e) || (this.syncLocalPreviewBar(), this.showToast("Tap the distance label to create a scale bar", 3200)), this.sendFocus(), !0);
  }
  clearSelection() {
    const e = this.selection.length > 0;
    this.selection = [], this.scalePair = null, this._touchPairingAnchor = null, this._touchMultiSelectActive = !1, this.updateSelectionVisuals(), e && this.sendFocus();
  }
  updateSelectionVisuals() {
    for (const [e, t] of this.markers)
      t.classList.toggle("bv-annotation-marker--selected", this.selection.includes(e));
    this.syncLocalPreviewBar();
    for (const e of this.scaleBars.values()) this.setBarHoverState(e);
    this.remoteFocus.size > 0 && this.reconcileRemotePreviewBars();
  }
  /** A bar is at full strength when hovered, click-selected, or touched by
   *  a hovered/selected endpoint marker. */
  barLit(e) {
    return e.preview || !e.data ? !1 : !!(e.hovered || e.sticky || e.endpointLit || e.remoteSelected || this.selection.includes(e.data.a) || this.selection.includes(e.data.b));
  }
  /** Hovering a marker lights every bar it anchors. */
  setBarsEndpointLit(e, t) {
    for (const i of this.scaleBars.values())
      (i.data.a === e || i.data.b === e) && i.endpointLit !== t && (i.endpointLit = t, this.setBarHoverState(i));
  }
  makeBarLine(e) {
    const t = new hi();
    t.setPositions([0, 0, 0, 0, 0, 0]);
    const i = new Bt({
      color: 16777215,
      linewidth: 1.5,
      transparent: !0,
      opacity: e ? 0.35 : 0.4,
      depthTest: !1,
      depthWrite: !1,
      vertexColors: !1,
      dashed: e,
      dashSize: 0.08,
      gapSize: 0.04
    }), s = new bs(t, i);
    return s.frustumCulled = !1, s.renderOrder = 999, s.material.depthTest = !1, s.material.depthWrite = !1, s.material.needsUpdate = !0, s;
  }
  makeBarLabel(e) {
    const t = document.createElement("div");
    return t.className = "bv-annotation-scale-label" + (e ? " bv-annotation-scale-label--preview" : ""), t.style.display = "none", t.addEventListener("wheel", (i) => this.forwardWheelToCanvas(i), { passive: !1 }), this.overlayEl.appendChild(t), t;
  }
  forwardWheelToCanvas(e) {
    const t = this.getCanvas();
    t && (e.preventDefault(), e.stopPropagation(), t.dispatchEvent(new window.WheelEvent("wheel", {
      bubbles: !0,
      cancelable: !0,
      deltaX: e.deltaX,
      deltaY: e.deltaY,
      deltaZ: e.deltaZ,
      deltaMode: e.deltaMode,
      clientX: e.clientX,
      clientY: e.clientY,
      screenX: e.screenX,
      screenY: e.screenY,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      altKey: e.altKey,
      metaKey: e.metaKey
    })));
  }
  currentScalePair() {
    const e = this.scalePair;
    if (!Array.isArray(e) || e.length !== 2) return null;
    const [t, i] = e;
    return t === i || !this.annotations.has(t) || !this.annotations.has(i) ? null : [t, i];
  }
  createScaleBarFromSelection() {
    const e = this.currentScalePair();
    if (this.readOnly || !e) return;
    const [t, i] = e, s = this.scaleBarForPair(t, i);
    if (s) {
      this.setStickyBar(s.id), this.clearPreviewBar();
      return;
    }
    this.sendMessage({ type: "annotation_update", action: "scalebar_create", a: t, b: i });
  }
  ensurePreviewBar() {
    const e = this.currentScalePair();
    if (this.previewBar || !e || this.scaleBarForPair(e[0], e[1])) return;
    const t = this.getScene();
    if (!t) return;
    const i = this.makeBarLine(!0);
    t.add(i);
    const s = this.makeBarLabel(!0);
    s.addEventListener("click", (n) => {
      n.stopPropagation(), this.createScaleBarFromSelection();
    }), s.addEventListener("contextmenu", (n) => {
      if (n.preventDefault(), n.stopPropagation(), this.readOnly) return;
      const r = [{ label: "Clear selection", onSelect: () => this.clearSelection() }], o = this.currentScalePair();
      o && !this.scaleBarForPair(o[0], o[1]) && r.unshift({ label: "Create scale bar", onSelect: () => this.createScaleBarFromSelection() }), this.openMenu(r, n.clientX, n.clientY);
    }), this.previewBar = {
      data: null,
      // endpoints come from this.selection
      line: i,
      labelEl: s,
      preview: !0,
      dirty: !0
    };
  }
  syncLocalPreviewBar() {
    const e = this.currentScalePair();
    if (!e || this.scaleBarForPair(e[0], e[1])) {
      this.clearPreviewBar();
      return;
    }
    this.ensurePreviewBar();
  }
  clearPreviewBar() {
    this.previewBar && (this.removeBarVisual(this.previewBar), this.previewBar = null);
  }
  updateBarHover(e, t) {
    if (this.scaleBars.size === 0) return;
    const i = this._rects;
    if (!i) return;
    const s = e - i.hostRect.left, n = t - i.hostRect.top;
    for (const r of this.scaleBars.values()) {
      let o = !1;
      if (r._ax !== null && r._ax !== void 0 && r._bx !== null && r._bx !== void 0) {
        const a = r._bx - r._ax, l = r._by - r._ay, d = a * a + l * l;
        let h = d > 0 ? ((s - r._ax) * a + (n - r._ay) * l) / d : 0;
        h = Math.max(0, Math.min(1, h));
        const u = s - (r._ax + a * h), A = n - (r._ay + l * h);
        o = u * u + A * A <= 144;
      }
      o !== r.lineHovered && (r.lineHovered = o, this.setBarHoverState(r));
    }
  }
  shouldSuppressBarHover(e) {
    return !!(e?.pointerType === "touch" || e?.buttons || this.dragState || this._rightDrag);
  }
  clearScaleBarLineHover() {
    for (const e of this.scaleBars.values())
      e.lineHovered && (e.lineHovered = !1, this.setBarHoverState(e));
  }
  setBarHoverState(e) {
    e.hovered = !!(e.lineHovered || e.labelHovered);
    const t = this.barLit(e);
    this.markers.get(e.data.a)?.classList.toggle("bv-annotation-marker--bar-hover", t), this.markers.get(e.data.b)?.classList.toggle("bv-annotation-marker--bar-hover", t);
  }
  /** Click-select one bar (exclusive); null clears all. */
  setStickyBar(e) {
    let t = !1;
    for (const [i, s] of this.scaleBars) {
      const n = i === e;
      s.sticky !== n && (s.sticky = n, t = !0, this.setBarHoverState(s));
    }
    t && this.sendFocus();
  }
  /** Shift-click adds/removes a bar from the selected set. */
  toggleStickyBar(e) {
    const t = this.scaleBars.get(e);
    t && (t.sticky = !t.sticky, this.setBarHoverState(t), this.sendFocus());
  }
  stickyBarIds() {
    const e = [];
    for (const [t, i] of this.scaleBars) i.sticky && e.push(t);
    return e;
  }
  scaleBarForPair(e, t) {
    if (e === t || e === null || e === void 0 || t === null || t === void 0) return null;
    for (const [i, s] of this.scaleBars)
      if (s.data && (s.data.a === e && s.data.b === t || s.data.a === t && s.data.b === e))
        return { id: i, bar: s };
    return null;
  }
  remotePreviewKey(e, t, i) {
    return `${e}:${Math.min(t, i)}:${Math.max(t, i)}`;
  }
  reconcileRemotePreviewBars() {
    const e = this.getScene(), t = /* @__PURE__ */ new Map();
    if (e)
      for (const [i, s] of this.remoteFocus) {
        const r = ((s.selectedPair?.length === 2 ? s.selectedPair : s.selected) || []).filter((l) => this.annotations.has(l));
        if (r.length !== 2) continue;
        const [o, a] = r;
        o === a || this.scaleBarForPair(o, a) || t.set(this.remotePreviewKey(i, o, a), { a: o, b: a, focus: s });
      }
    for (const [i, s] of this.remotePreviewBars)
      t.has(i) || (this.removeBarVisual(s), this.remotePreviewBars.delete(i));
    if (e)
      for (const [i, s] of t) {
        let n = this.remotePreviewBars.get(i);
        if (!n) {
          const r = this.makeBarLine(!0);
          e.add(r);
          const o = this.makeBarLabel(!0);
          o.classList.add("bv-annotation-scale-label--remote-selected"), o.style.pointerEvents = "none", n = {
            data: { a: s.a, b: s.b },
            line: r,
            labelEl: o,
            preview: !0,
            remotePreview: !0,
            dirty: !0
          }, this.remotePreviewBars.set(i, n);
        }
        n.data.a = s.a, n.data.b = s.b, n.remoteColor = s.focus.color || null, n.remoteColor ? (n.labelEl.style.setProperty("--bv-remote-scale-color", n.remoteColor), n.labelEl.style.setProperty("--bv-remote-scale-ring", this.colorWithAlpha(n.remoteColor, 0.22)), n.line.material.color?.set?.(n.remoteColor)) : (n.labelEl.style.removeProperty("--bv-remote-scale-color"), n.labelEl.style.removeProperty("--bv-remote-scale-ring"), n.line.material.color?.set?.(16777215));
      }
  }
  clearRemotePreviewBars() {
    for (const e of this.remotePreviewBars.values()) this.removeBarVisual(e);
    this.remotePreviewBars.clear();
  }
  addScaleBar(e) {
    if (this.scaleBars.has(e.id)) return;
    this.store.scaleBars.set(e.id, { ...e });
    const t = this.getScene();
    if (!t) return;
    const i = this.makeBarLine(!1);
    t.add(i);
    const s = this.makeBarLabel(!1), n = {
      data: e,
      line: i,
      labelEl: s,
      preview: !1,
      dirty: !0,
      hovered: !1,
      lineHovered: !1,
      labelHovered: !1,
      sticky: !1,
      endpointLit: !1,
      remoteSelected: !1,
      remoteColor: null
    };
    s.addEventListener("pointerenter", (o) => {
      this.shouldSuppressBarHover(o) || (n.labelHovered = !0, this.setBarHoverState(n));
    }), s.addEventListener("pointerleave", () => {
      n.labelHovered = !1, this.setBarHoverState(n);
    }), s.addEventListener("click", (o) => {
      o.stopPropagation(), o.shiftKey ? this.toggleStickyBar(e.id) : this.setStickyBar(e.id);
    }), s.addEventListener("contextmenu", (o) => {
      o.preventDefault(), o.stopPropagation(), !this.readOnly && this.openBarMenu(e.id, o.clientX, o.clientY);
    }), this.attachLongPress(s, (o, a) => {
      this.readOnly || this.openBarMenu(e.id, o, a);
    }), this.scaleBars.set(e.id, n);
    const r = this.currentScalePair();
    r && this.scaleBarForPair(r[0], r[1]) && this.clearPreviewBar(), this.remoteFocus.size > 0 && this.applyRemoteFocusVisuals();
  }
  openBarMenu(e, t, i) {
    const s = this.scaleBars.get(e);
    if (!s) return;
    const n = [], r = [s.data.a, s.data.b].filter((l) => this.annotations.has(l)), o = r.length > 0 && r.every((l) => this.annotations.get(l).collapsed);
    n.push({
      label: o ? "Expand endpoint markers" : "Collapse endpoint markers",
      onSelect: () => {
        for (const l of r)
          this.sendMessage({
            type: "annotation_update",
            action: "collapse",
            id: l,
            collapsed: !o
          });
      }
    });
    const a = this.stickyBarIds();
    a.length > 1 && a.includes(e) && n.push({
      label: `Remove ${a.length} scale bars`,
      danger: !0,
      onSelect: () => {
        for (const l of a)
          this.sendMessage({ type: "annotation_update", action: "scalebar_delete", id: l });
      }
    }), n.push({
      label: "Remove scale bar",
      danger: !0,
      onSelect: () => this.sendMessage({ type: "annotation_update", action: "scalebar_delete", id: e })
    }), this.openMenu(n, t, i);
  }
  removeScaleBarVisual(e) {
    const t = this.scaleBars.get(e);
    t && (this.cleanupSelectionForRemovedScaleBar(t), this.removeBarVisual(t), this.scaleBars.delete(e), this.store.scaleBars.delete(e), this.remoteFocus.size > 0 && this.reconcileRemotePreviewBars());
  }
  cleanupSelectionForRemovedScaleBar(e) {
    const t = [e.data?.a, e.data?.b].filter((o) => typeof o == "number");
    if (t.length !== 2) return;
    const [i, s] = t;
    let n = !1;
    this.scalePair && this.scaleBarForPair(i, s)?.id === e.data.id && (this.scalePair = null, n = !0);
    const r = this.selection.filter((o) => o !== i && o !== s);
    r.length !== this.selection.length && (this.selection = r, n = !0), (this._touchPairingAnchor === i || this._touchPairingAnchor === s) && (this._touchPairingAnchor = null, this._touchMultiSelectActive = !1, n = !0), n && (this.clearPreviewBar(), this.updateSelectionVisuals(), this.sendFocus());
  }
  removeBarVisual(e) {
    e.line && (e.line.parent?.remove(e.line), e.line.geometry?.dispose(), e.line.material?.dispose()), e.labelEl?.remove();
  }
  barEndpoints(e) {
    const [t, i] = e.preview && !e.remotePreview ? this.currentScalePair() || [] : [e.data.a, e.data.b], s = this.displayPositions.get(t), n = this.displayPositions.get(i);
    return s && n ? [s, n] : null;
  }
  refreshBarsForAnnotation(e, t = !1) {
    for (const i of this.scaleBars.values())
      (i.data.a === e || i.data.b === e) && (i.dirty = !0);
    this.previewBar && this.selection.includes(e) && (this.previewBar.dirty = !0), this.previewBar && this.scalePair?.includes(e) && (this.previewBar.dirty = !0);
    for (const i of this.remotePreviewBars.values())
      (i.data.a === e || i.data.b === e) && (i.dirty = !0);
  }
  updateBarVisual(e, t, i, s, n) {
    if (!e) return;
    const r = this.barEndpoints(e);
    if (!r) {
      e.line.visible = !1, e.labelEl.style.display = "none";
      return;
    }
    const [o, a] = r, l = a.x - o.x, d = a.y - o.y, h = a.z - o.z, u = Math.sqrt(l * l + d * d + h * h);
    if (e.dirty !== !1 && (e.line.geometry.setPositions([o.x, o.y, o.z, a.x, a.y, a.z]), e.line.computeLineDistances && e.line.computeLineDistances(), e.dirty = !1), e.preview) {
      const x = Math.min(0.08, Math.max(0.01, u / 96)), Q = Math.min(0.16, Math.max(0.02, u / 48));
      (e.line.material.gapSize !== x || e.line.material.dashSize !== Q) && (e.line.material.gapSize = x, e.line.material.dashSize = Q, e.line.material.needsUpdate = !0);
    }
    e.line.visible = !0;
    const A = this.projectToOverlay(o, t, i, s, !0);
    e._ax = A ? A.x : null, e._ay = A ? A.y : null;
    const p = this.projectToOverlay(a, t, i, s, !0);
    e._bx = p ? p.x : null, e._by = p ? p.y : null, this._barMid || (this._barMid = { x: 0, y: 0, z: 0 });
    const f = this._barMid;
    f.x = (o.x + a.x) / 2, f.y = (o.y + a.y) / 2, f.z = (o.z + a.z) / 2;
    const g = this.projectToOverlay(f, t, i, s);
    if (!g) {
      e.labelEl.style.display = "none";
      return;
    }
    const b = `${u.toFixed(2)} m`;
    if (e.labelEl.dataset.text !== b)
      if (e.labelEl.dataset.text = b, e.preview && !e.remotePreview && !this.readOnly) {
        e.labelEl.innerHTML = "", e.labelEl.appendChild(document.createTextNode(b));
        const x = document.createElement("span");
        x.className = "bv-annotation-scale-label__create", x.textContent = "Create", e.labelEl.appendChild(x);
      } else
        e.labelEl.textContent = b;
    e.labelEl.style.display = "block";
    const y = Math.round(g.x * 10) / 10, E = Math.round(g.y * 10) / 10;
    (e.labelEl._bvX !== y || e.labelEl._bvY !== E) && (e.labelEl.style.transform = `translate(${y}px, ${E}px) translate(-50%, -50%)`, e.labelEl._bvX = y, e.labelEl._bvY = E);
    const C = this.barLit(e), w = e.preview ? 0.35 : C ? 0.95 : 0.1, S = e.preview ? 0.95 : C ? 1 : 0.12, v = n ? this.computeLightFactor(f, n) : 1, I = e.sticky ? 0.5 : e.remoteSelected ? 0.35 : 0;
    e.line.material.opacity = Math.max(I, w * v);
    const B = Math.round(Math.max(I, S * v) * 200) / 200;
    e.labelEl._bvOpacity !== B && (e.labelEl.style.opacity = String(B), e.labelEl._bvOpacity = B);
    const M = C ? "85" : "2";
    e.labelEl.style.zIndex !== M && (e.labelEl.style.zIndex = M);
  }
  // ------------------------------------------------------------------
  // Panels (view popup + create/edit form)
  // ------------------------------------------------------------------
  buildPanel(e, { broadcastClose: t = !0 } = {}) {
    this.closePanel({ broadcast: t });
    const i = document.createElement("div");
    return i.className = "bv-annotation-panel below-panel", i.dataset.mode = e, i.addEventListener("contextmenu", (s) => s.stopPropagation()), this.container.appendChild(i), this.panelEl = i, i;
  }
  positionFloating(e, t, i) {
    const s = this.container.getBoundingClientRect();
    let n = t - s.left + 14, r = i - s.top + 10;
    const o = e.getBoundingClientRect();
    n + o.width > s.width - 12 && (n = Math.max(12, t - s.left - o.width - 14)), r + o.height > s.height - 12 && (r = Math.max(12, s.height - o.height - 12)), e.style.left = `${n}px`, e.style.top = `${r}px`;
  }
  closePanel({ broadcast: e = !0 } = {}) {
    const t = this.openPanelFor !== null || this._editingId !== null, i = this._mirroredFocusUserId !== null;
    this.openPanelFor !== null && this.markers.get(this.openPanelFor)?.classList.remove("bv-annotation-marker--active"), this.panelEl?.dataset.mode === "create" && (this.expireLocalPing(400), clearInterval(this._draftInterval), this._draftInterval = null), this._editingId = null, this._editDraftTitle = "", this._editDraftNotes = "", this._mirroredFocusUserId = null, this.openPanelFor = null, this.panelEl?.remove(), this.panelEl = null, t && e && !i && this.sendFocus();
  }
  dismissForFlyMode() {
    this.closeMenu(), this.closePanel(), this.exitMoveMode(!1);
  }
  dismissTransientUi() {
    this.dismissForFlyMode();
  }
  openCreatePanel(e, t, i) {
    const s = this.buildPanel("create");
    s.innerHTML = `
            <input type="text" class="bv-annotation-input-title" placeholder="Title" maxlength="${Je}">
            <textarea class="bv-annotation-input-notes" placeholder="Notes (optional)" maxlength="${gt}"></textarea>
            <div class="bv-annotation-panel__actions">
                <button class="bv-annotation-btn bv-annotation-cancel">Cancel</button>
                <button class="bv-annotation-btn bv-annotation-btn--primary bv-annotation-save">Add</button>
            </div>
        `, this.positionFloating(s, t, i);
    const n = s.querySelector(".bv-annotation-input-title"), r = s.querySelector(".bv-annotation-input-notes"), o = () => {
      this.panelEl?.dataset.mode === "create" && this.sendMessage({
        type: "annotation_update",
        action: "ping",
        position: e,
        title: n.value.trim().slice(0, Je)
      }, { quiet: !0 });
    };
    n.addEventListener("input", this.makeDraftStreamer(o)), clearInterval(this._draftInterval), this._draftInterval = setInterval(o, 2500);
    const a = () => {
      const l = n.value.trim();
      if (!l) {
        n.focus();
        return;
      }
      this.removeLocalPing(), this.createAnnotation(l, r.value, e), this.closePanel();
    };
    s.querySelector(".bv-annotation-save").addEventListener("click", a), s.querySelector(".bv-annotation-cancel").addEventListener("click", () => this.closePanel()), n.addEventListener("keydown", (l) => {
      l.key === "Enter" && (l.preventDefault(), a());
    }), r.addEventListener("keydown", (l) => {
      l.key === "Enter" && !l.shiftKey && (l.preventDefault(), a());
    }), n.focus();
  }
  openViewPanel(e) {
    const t = this.annotations.get(e), i = this.markers.get(e);
    if (!t || !i) return;
    const s = this.buildPanel("view");
    this.openPanelFor = e, i.classList.add("bv-annotation-marker--active"), this.sendFocus();
    const n = [];
    if (t.created_by && n.push(t.created_by), t.created_at) {
      const o = new Date(t.created_at);
      isNaN(o) || n.push(o.toLocaleDateString());
    }
    if (s.innerHTML = `
            <div class="bv-annotation-panel__title"></div>
            ${t.notes ? '<div class="bv-annotation-panel__notes"></div>' : ""}
            ${n.length ? `<div class="bv-annotation-panel__meta">${n.map((o) => this.escapeHtml(o)).join(" · ")}</div>` : ""}
            ${this.readOnly ? "" : `
            <div class="bv-annotation-panel__actions bv-annotation-panel__actions--spread">
                <button class="bv-annotation-btn bv-annotation-btn--danger bv-annotation-delete">Delete</button>
                <div class="bv-annotation-panel__actions-group">
                    <button class="bv-annotation-btn bv-annotation-move">Move</button>
                    <button class="bv-annotation-btn bv-annotation-btn--primary bv-annotation-edit">Edit</button>
                </div>
            </div>`}
        `, s.querySelector(".bv-annotation-panel__title").textContent = t.title, t.notes && (s.querySelector(".bv-annotation-panel__notes").textContent = t.notes), !this.readOnly) {
      const o = s.querySelector(".bv-annotation-delete");
      o.addEventListener("click", () => {
        o.dataset.confirming ? (this.remove(e), this.closePanel()) : (o.dataset.confirming = "1", o.textContent = "Confirm?");
      });
      const a = s.querySelector(".bv-annotation-edit"), l = this.remoteEditorOf(e);
      l && (a.disabled = !0, a.title = `${l} is editing`), a.addEventListener("click", () => {
        a.disabled || this.openEditPanel(e);
      }), s.querySelector(".bv-annotation-move").addEventListener("click", () => {
        this.closePanel(), this.enterMoveMode(e);
      });
    }
    const r = i.getBoundingClientRect();
    this.positionFloating(s, r.right, r.top);
  }
  openEditPanel(e) {
    const t = this.annotations.get(e), i = this.markers.get(e);
    if (!t || !i) return;
    const s = this.remoteEditorOf(e);
    if (s) {
      this.showToast(`${s} is editing this annotation`);
      return;
    }
    const n = this.buildPanel("edit");
    this.openPanelFor = e, i.classList.add("bv-annotation-marker--active"), this._editingId = e, this._editDraftTitle = t.title, this._editDraftNotes = t.notes || "", this.sendFocus(), n.innerHTML = `
            <input type="text" class="bv-annotation-input-title" placeholder="Title" maxlength="${Je}">
            <textarea class="bv-annotation-input-notes" placeholder="Notes (optional)" maxlength="${gt}"></textarea>
            <div class="bv-annotation-panel__actions">
                <button class="bv-annotation-btn bv-annotation-cancel">Cancel</button>
                <button class="bv-annotation-btn bv-annotation-btn--primary bv-annotation-save">Save</button>
            </div>
        `;
    const r = n.querySelector(".bv-annotation-input-title"), o = n.querySelector(".bv-annotation-input-notes");
    r.value = t.title, o.value = t.notes || "";
    const a = this.makeDraftStreamer(() => this.sendFocus());
    r.addEventListener("input", () => {
      this._editDraftTitle = r.value.trim().slice(0, Je), a();
    }), o.addEventListener("input", () => {
      this._editDraftNotes = o.value.slice(0, gt), a();
    });
    const l = () => {
      const h = r.value.trim();
      if (!h) {
        r.focus();
        return;
      }
      t.title = h, t.notes = o.value, this.upsertAnnotation(t), this.sendMessage({
        type: "annotation_update",
        action: "edit",
        id: e,
        title: h,
        notes: o.value
      }), this.closePanel();
    };
    n.querySelector(".bv-annotation-save").addEventListener("click", l), n.querySelector(".bv-annotation-cancel").addEventListener("click", () => this.closePanel()), r.addEventListener("keydown", (h) => {
      h.key === "Enter" && (h.preventDefault(), l());
    }), o.addEventListener("keydown", (h) => {
      h.key === "Enter" && !h.shiftKey && (h.preventDefault(), l());
    });
    const d = i.getBoundingClientRect();
    this.positionFloating(n, d.right, d.top), r.focus(), r.select();
  }
  // ------------------------------------------------------------------
  // Actions
  // ------------------------------------------------------------------
  createAnnotation(e, t, i) {
    if (this.readOnly) return null;
    const s = De(i), n = String(e || "").trim().slice(0, Je), r = String(t || "").slice(0, gt);
    if (!s || !n || this.annotations.size >= 500) return null;
    if (!this.adapter && !this.send) {
      const u = this.store.create({
        title: n,
        notes: r,
        position: s,
        collapsed: !1,
        created_by: null,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: null
      }), A = this.modelPositionToWorld(u.position);
      return this.displayPositions.set(u.id, { x: A.x, y: A.y, z: A.z }), this.createMarkerElement(u), this.renumberMarkers(), this.updateControlButtons(), this.emit("annotation-changed", { action: "create", annotation: u }), u;
    }
    const o = this.createClientId(), a = this.tempIdCounter--, l = {
      id: a,
      title: n,
      notes: r,
      position: { ...s },
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      pending: !0
    };
    this.pendingCreates.set(o, a), this.annotations.set(a, l);
    const d = this.modelPositionToWorld(s);
    return this.displayPositions.set(a, { x: d.x, y: d.y, z: d.z }), this.createMarkerElement(l), this.renumberMarkers(), this.updateControlButtons(), this.sendMessage({
      type: "annotation_update",
      action: "create",
      client_id: o,
      title: n,
      notes: r,
      position: l.position
    }) || (this.pendingCreates.delete(o), this.removeAnnotationLocal(a), this.renumberMarkers()), l;
  }
  requestSync() {
    if (this.adapter?.requestSnapshot) {
      this.adapter.requestSnapshot();
      return;
    }
    this.sendMessage({ type: "annotation_sync_request" }, { quiet: !0 });
  }
  sendMessage(e, { quiet: t = !1 } = {}) {
    if (this.adapter?.send)
      return this.adapter.send(e) !== !1;
    if (!this.send) {
      if (!this.readOnly && e?.type === "annotation_update") {
        if (e.action === "delete") this.removeAnnotationLocal(e.id);
        else if (e.action === "scalebar_delete") this.removeScaleBarVisual(e.id);
        else if (e.action === "scalebar_create") {
          const s = this.store.createScaleBar(e.a, e.b);
          s && this.addScaleBar(s);
        } else if (e.action === "collapse") {
          const s = this.annotations.get(e.id);
          s && this.upsertAnnotation({ ...s, collapsed: !!e.collapsed });
        }
        return !0;
      }
      return !1;
    }
    const i = this.send(e);
    return !i && !t && this.showToast("Not connected - annotation not saved"), i;
  }
  /**
   * Touch long-press helper: fires the handler after a steady 550ms hold.
   * Movement, lift-off or a second touch cancels it.
   */
  attachLongPress(e, t) {
    let i = null, s = 0, n = 0, r = null;
    const o = () => {
      clearTimeout(i), i = null, r = null;
    }, a = (d) => {
      d.pointerType !== "touch" || !d.isPrimary || (s = d.clientX, n = d.clientY, r = d.pointerId, clearTimeout(i), i = setTimeout(() => {
        i = null, this._longPressFired = performance.now(), navigator.vibrate?.(15), t(s, n);
      }, od));
    }, l = (d) => {
      if (!i || d.pointerId !== r) return;
      const h = d.clientX - s, u = d.clientY - n;
      h * h + u * u > 64 && o();
    };
    return e.addEventListener("pointerdown", a), e.addEventListener("pointermove", l), e.addEventListener("pointerup", o), e.addEventListener("pointercancel", o), () => {
      clearTimeout(i), e.removeEventListener("pointerdown", a), e.removeEventListener("pointermove", l), e.removeEventListener("pointerup", o), e.removeEventListener("pointercancel", o);
    };
  }
  /**
   * Leading + trailing throttle for draft streaming. The trailing send is
   * what makes the LAST keystroke land within ~300ms - a plain throttle
   * silently dropped it until the 2.5s keepalive caught up.
   */
  makeDraftStreamer(e, t = 300) {
    let i = 0, s = null;
    return () => {
      const n = performance.now(), r = n - i;
      r >= t ? (i = n, e()) : (clearTimeout(s), s = setTimeout(() => {
        i = performance.now(), e();
      }, t - r));
    };
  }
  // ------------------------------------------------------------------
  // Misc
  // ------------------------------------------------------------------
  showToast(e, t = 2800) {
    this.toastEl || (this.toastEl = document.createElement("div"), this.toastEl.className = "bv-annotation-toast", document.body.appendChild(this.toastEl)), this.toastEl.textContent = e, this.toastEl.classList.add("bv-annotation-toast--visible"), clearTimeout(this.toastTimer), this.toastTimer = setTimeout(() => {
      this.toastEl?.classList.remove("bv-annotation-toast--visible");
    }, t);
  }
  escapeHtml(e) {
    const t = document.createElement("div");
    return t.textContent = String(e), t.innerHTML;
  }
}
const ld = [
  "annotations-loaded",
  "annotations-cleared",
  "annotation-changed",
  "annotation-selection-changed",
  "annotation-visibility-changed",
  "annotation-error"
];
class cd extends Pe {
  constructor(e, t = {}) {
    super(), this.runtime = new ad(e, t), this._runtimeListeners = ld.map((i) => {
      const s = (n) => this.emit(i, n);
      return this.runtime.on(i, s), { eventName: i, listener: s };
    });
  }
  load(e, t) {
    return this.runtime.load(e, t);
  }
  clear() {
    return this.runtime.clear();
  }
  getDocument() {
    return this.runtime.getDocument();
  }
  download(e) {
    return this.runtime.download(e);
  }
  setMode(e) {
    return this.runtime.setMode(e);
  }
  getMode() {
    return this.runtime.getMode();
  }
  setVisible(e) {
    return this.runtime.setVisible(e);
  }
  isVisible() {
    return this.runtime.isVisible();
  }
  setAdapter(e) {
    return this.runtime.setAdapter(e), this;
  }
  create(e) {
    return this.runtime.create(e);
  }
  update(e, t) {
    return this.runtime.update(e, t);
  }
  move(e, t) {
    return this.runtime.move(e, t);
  }
  remove(e) {
    return this.runtime.remove(e);
  }
  createScaleBar(e, t) {
    return this.runtime.createScaleBar(e, t);
  }
  removeScaleBar(e) {
    return this.runtime.removeScaleBar(e);
  }
  select(e) {
    return this.runtime.select(e);
  }
  setFollowedParticipant(e) {
    return this.runtime.setFollowedParticipant(e);
  }
  dismissTransientUi() {
    return this.runtime.dismissTransientUi();
  }
  requestSnapshot() {
    return this.runtime.requestSnapshot();
  }
  refreshPresence() {
    return this.runtime.refreshPresence();
  }
  list() {
    return this.runtime.list();
  }
  listScaleBars() {
    return this.runtime.listScaleBars();
  }
  hitTest(e, t) {
    return this.runtime.hitTest(e, t);
  }
  project(e) {
    return this.runtime.project(e);
  }
  captureScreenshot(e) {
    return this.runtime.captureScreenshot(e);
  }
  // ModelViewer lifecycle hooks. They are intentionally not transport-specific.
  prepareModel(e, t) {
    return this.runtime.prepareModel(e, t);
  }
  activateModel(e, t, i) {
    return this.runtime.activateModel(e, t, i);
  }
  destroy() {
    for (const { eventName: e, listener: t } of this._runtimeListeners)
      this.runtime.off?.(e, t);
    this._runtimeListeners = [], this.runtime.destroy(), this.removeAllListeners();
  }
}
class Es extends Pe {
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
    const i = {
      models: { type: "object", default: {} },
      autoLoadFirst: { type: "boolean", default: !0 },
      showLoadingIndicator: { type: "boolean", default: !0 },
      showStatus: { type: "boolean", default: !1 },
      showInfo: { type: "boolean", default: !1 },
      enableVR: { type: "boolean", default: !1 },
      enableAR: { type: "boolean", default: !1 },
      enableMeasurement: { type: "boolean", default: !0 },
      enableMeasurementScaleCalibration: { type: "boolean", default: !0 },
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
      initialPositions: { type: "object", default: null },
      annotations: { type: "object", default: {} }
    };
    this.config = new gi(i).validate(t), this.options = this.config, this.currentModelKey = null, this.belowViewer = null, this.ui = {}, this.uiRoot = null, this.stereoUiMirror = null, this.stereoUiObserver = null, this.stereoUiSyncQueued = !1, this.stereoUiActive = !1, this.measurementSystem = null, this.annotations = null, this.comfortGlyph = null, this.diveSystem = null, this.fullscreenButton = null, this.screenshotButton = null, this.flyControls = null, this.lastComfortMode = null, this._vrButtonWasVisible = !1, this.isLoading = !1, this.loadingMessage = "", this.loadingModelName = "", this.loadingPercentage = 0, this.lastManualLoadingMessage = "", this.stageOverrideActive = !1, this.vrUpdateLoop = null, this.lastRequestedModelKey = null, this.recoveryHandlers = null, this.recoveryTimer = null, this.recoveryCooldownMs = 1200, this.lastRecoveryAttemptAt = 0, this.recoveryAttempts = 0, this.maxRecoveryAttempts = 3, this.hadContextLoss = !1, this.isDisposed = !1, typeof window < "u" && (window.modelViewer = this), this.init();
  }
  init() {
    const e = {
      ...this.config.viewerConfig,
      // Quest's WebXR projection-layer MSAA target can become invalid across
      // visibility transitions. AR passthrough is composited by the runtime,
      // so use an explicitly XR-compatible, non-multisampled context unless a
      // caller intentionally overrides one of these values.
      ...this.config.enableAR && {
        renderer: {
          antialias: !1,
          xrCompatible: !0,
          preserveDrawingBuffer: !1,
          ...this.config.viewerConfig?.renderer || {}
        }
      },
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
    if (this.belowViewer = new Fh(this.container, e), this.setupEventForwarding(), this.setupRecoveryHandlers(), this.belowViewer.on("initialized", () => {
      this.setupRecoveryHandlers(), this.setupFocusInteraction(), this._maybeAttachMeasurementSystem(), this._maybeAttachVRComfortGlyph(), this._maybeAttachDiveSystem(), this._maybeAttachScreenshotButton(), this._maybeAttachFullscreenButton(), this._maybeAttachFlyControls(), this._maybeAttachAnnotationSystem();
    }), this.belowViewer.isInitialized && (this.setupRecoveryHandlers(), this.setupFocusInteraction(), this._maybeAttachMeasurementSystem(), this._maybeAttachVRComfortGlyph(), this._maybeAttachDiveSystem(), this._maybeAttachScreenshotButton(), this._maybeAttachFullscreenButton(), this._maybeAttachFlyControls(), this._maybeAttachAnnotationSystem()), Object.keys(this.config.models).length > 0 && (this.createUI(), this.populateDropdown(), this.config.autoLoadFirst)) {
      const t = Object.keys(this.config.models)[0];
      setTimeout(() => this.loadModel(t), 100);
    }
  }
  _maybeAttachAnnotationSystem() {
    if (this.annotations) return;
    const e = this.config.annotations || {}, t = Object.values(this.config.models || {}).some((s) => !!s?.annotations);
    if (e.enabled === !0 || e.enabled !== !1 && t) {
      this.annotations = new cd(this, {
        ...e,
        container: e.container || this.container
      });
      for (const s of [
        "annotations-loaded",
        "annotations-cleared",
        "annotation-changed",
        "annotation-selection-changed",
        "annotation-visibility-changed",
        "annotation-error"
      ])
        this.annotations.on(s, (n) => this.emit(s, n));
    }
  }
  _maybeAttachMeasurementSystem() {
    if (!this.config.enableMeasurement || this.measurementSystem) return;
    this.measurementSystem = new Gh({
      scene: this.belowViewer.sceneManager.scene,
      camera: this.belowViewer.cameraManager.camera,
      renderer: this.belowViewer.renderer,
      controls: this.belowViewer.cameraManager.controls,
      uiParent: this.getUiContainer(),
      getRaycastInfo: (t) => this.getPointerRaycastInfo(t),
      theme: this.config.measurementTheme,
      showMeasurementLabels: this.config.showMeasurementLabels,
      allowScaleCalibration: this.config.enableMeasurementScaleCalibration,
      onScaleCalibration: ({ scaleFactor: t }) => this.scaleCurrentModelFromMeasurement(t),
      onMeasurementChange: (t) => this.emit("measurement-changed", t)
    });
    const e = () => this.measurementSystem && this.measurementSystem.update();
    if (this.belowViewer.onAfterRender)
      this.belowViewer.onAfterRender(e);
    else if (typeof this.belowViewer.on == "function")
      this.belowViewer.on("before-render", e);
    else if (this.onAfterRender)
      this.onAfterRender(e);
    else {
      const t = () => {
        e(), requestAnimationFrame(t);
      };
      t();
    }
    if (this.belowViewer.loadedModels && this.belowViewer.loadedModels.length > 0) {
      const t = this.belowViewer.loadedModels[0].model, i = this.currentModelKey ? this.config.models[this.currentModelKey] : null;
      this.applyModelMeasurementConfig(i, t);
    }
  }
  isModelMeasurable(e) {
    return !e || e.measurable !== !1;
  }
  applyModelMeasurementConfig(e, t = null) {
    if (!this.measurementSystem) return;
    const i = this.isModelMeasurable(e);
    if (typeof this.measurementSystem.setMeasurementAvailability == "function" ? this.measurementSystem.setMeasurementAvailability(i) : (this.measurementSystem.clearUnifiedMeasurement(), this.measurementSystem.clearLegacyVRMeasurement(), this.measurementSystem.clearLegacyDesktopMeasurement(), this.measurementSystem.desktopMeasurementMode = !1, this.measurementSystem.measurementSystemEnabled = i, this.measurementSystem.updateMeasurementPanel()), this.measurementSystem.ghostSpheres) {
      const s = i && this.measurementSystem.isVR;
      this.measurementSystem.ghostSpheres.left && (this.measurementSystem.ghostSpheres.left.visible = s), this.measurementSystem.ghostSpheres.right && (this.measurementSystem.ghostSpheres.right.visible = s);
    }
    if (i && t) {
      this.measurementSystem.setScaleCalibrationMultiplier?.(1), this.measurementSystem.setRaycastTargets(t);
      return;
    }
    this.measurementSystem.setRaycastTargets([]);
  }
  scaleCurrentModelFromMeasurement(e) {
    if (!Number.isFinite(e) || e <= 0) return !1;
    const t = this.belowViewer?.getLoadedModels?.().at(-1), i = t?.model;
    if (!i) return !1;
    const s = i.getWorldPosition(new m.Vector3()), n = this.belowViewer?.cameraManager?.camera, r = this.belowViewer?.cameraManager?.controls;
    i.scale.multiplyScalar(e), i.updateMatrixWorld(!0), n && n.position.sub(s).multiplyScalar(e).add(s), r?.target && r.target.sub(s).multiplyScalar(e).add(s), t.measurementScaleMultiplier = (t.measurementScaleMultiplier ?? 1) * e, t.options.scale = i.scale.toArray(), this.currentModelKey && this.config.models[this.currentModelKey] && (this.config.models[this.currentModelKey].scale = i.scale.toArray()), this.belowViewer.fitCameraClippingToModel?.(i, t.options?.cameraFarMultiplier ?? 2), r?.update?.();
    const o = t.measurementScaleMultiplier;
    return this.emit("model-scale-calibrated", {
      model: i,
      scaleFactor: e,
      scaleMultiplier: o,
      modelScale: i.scale.toArray(),
      origin: s.clone()
    }), { origin: s, scaleMultiplier: o };
  }
  async _maybeAttachVRComfortGlyph() {
    if (!this.config.enableVRComfortGlyph || this.comfortGlyph || !this.belowViewer.vrManager || !this.belowViewer.vrManager.vrCore || (await this.belowViewer.vrManager.vrCore.checkVRSupported(), !this.belowViewer.vrManager.vrCore.isVRSupported)) return;
    this.comfortGlyph = new Ps(this.belowViewer.vrManager, {
      position: "bottom-right",
      offsetX: 20,
      offsetY: 70
    });
    const e = this.belowViewer.getVRComfortSettings ? this.belowViewer.getVRComfortSettings() : null, t = e ? e.locomotionMode === "teleport" && e.reducedMotion === !0 : !1, i = typeof this.lastComfortMode == "boolean" ? this.lastComfortMode : t;
    if (this.lastComfortMode = i, this.comfortGlyph.setComfortMode(i, {
      emitEvent: !1,
      applyToManager: !1
    }), this.comfortGlyph.element.addEventListener("vrcomfortchange", (s) => {
      this.lastComfortMode = s.detail.isComfortMode;
    }), this.belowViewer.vrManager) {
      const s = this.belowViewer.vrManager.onComfortModeChange;
      this.belowViewer.vrManager.onComfortModeChange = (n) => {
        s && s(n);
        const r = n && typeof n.enabled == "boolean" ? n.enabled : this.belowViewer.vrManager.isComfortModeEnabled();
        this.lastComfortMode = r, this.comfortGlyph && this.comfortGlyph.setComfortMode(r, {
          emitEvent: !1,
          applyToManager: !1
        }), this.emit("comfort-mode-change", {
          enabled: r,
          inVR: this.belowViewer.vrManager.isVRPresenting,
          preset: r ? "comfort" : "free"
        });
      };
    }
    if (this.belowViewer.vrManager && this.belowViewer.vrManager.vrCore) {
      const s = this.belowViewer.vrManager.vrCore.onSessionStart;
      this.belowViewer.vrManager.vrCore.onSessionStart = async () => {
        s && await s(), this.lastComfortMode !== null && setTimeout(() => {
          this.lastComfortMode ? this.belowViewer.vrManager.setComfortPreset("comfort") : this.belowViewer.vrManager.setComfortPreset("free"), this.comfortGlyph.setComfortMode(this.lastComfortMode, {
            emitEvent: !1,
            applyToManager: !1
          });
        }, 50);
      };
    }
    document.addEventListener("keydown", (s) => {
      Es._isEditableTarget(s.target) || s.code === "KeyC" && (s.ctrlKey || s.metaKey) && (s.preventDefault(), this.comfortGlyph && this.comfortGlyph.toggle());
    }), window.addEventListener("beforeunload", () => this.comfortGlyph && this.comfortGlyph.dispose());
  }
  _maybeAttachDiveSystem() {
    if (!this.config.enableDiveSystem || this.diveSystem) return;
    this.diveSystem = new qh(
      this.belowViewer.sceneManager.scene,
      this.belowViewer.renderer,
      this.belowViewer.cameraManager.camera
    ), setTimeout(() => {
      this.diveSystem.initializeToggleSwitch();
    }, 100), document.addEventListener("keydown", (t) => {
      if (!Es._isEditableTarget(t.target)) {
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
        const i = performance.now();
        this.diveSystem.update(i, t), this.belowViewer.vrManager && this.diveSystem.updateTorchFromVRManager(this.belowViewer.vrManager), this.belowViewer.renderer.xr.isPresenting || this.diveSystem.torch.updateCameraPosition(this.belowViewer.cameraManager.camera);
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
    this.flyControls = new jh({
      domElement: this.belowViewer.renderer.domElement,
      camera: this.belowViewer.cameraManager.camera,
      controls: this.belowViewer.cameraManager.controls,
      renderer: this.belowViewer.renderer,
      ...this.config.flyControls
    }), this._ensureFlyModeIndicator(), this.flyControls.on("fly-mode-change", (t) => {
      this.emit("fly-mode-change", t), t.active && this.annotations?.dismissTransientUi(), this.ui.flyIndicator && this.ui.flyIndicator.classList.toggle("visible", t.active), this._handleVRButtonVisibility(t.active);
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
    const i = this.flyControls?.clickToExit ? "Click to exit or press Esc" : "Press Esc to exit";
    t.innerHTML = `
      <div class="crosshair"></div>
      <div class="hint">
        <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> Move
        <kbd>Q</kbd><kbd>E</kbd> Up/Down
        <kbd>Shift</kbd> Fast<br>
        <span class="fly-exit">${i}</span>
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
    }, i = () => {
      this.queueRecovery("window-focus", { forceReload: !1 });
    }, s = (r) => {
      r && typeof r.preventDefault == "function" && r.preventDefault(), this.hadContextLoss = !0;
    }, n = () => {
      this.queueRecovery("context-restored", { forceReload: !0, delayMs: 120 });
    };
    document.addEventListener("visibilitychange", t), window.addEventListener("focus", i), e.addEventListener("webglcontextlost", s, !1), e.addEventListener("webglcontextrestored", n, !1), this.recoveryHandlers = {
      canvas: e,
      onVisibilityChange: t,
      onWindowFocus: i,
      onContextLost: s,
      onContextRestored: n
    };
  }
  queueRecovery(e, { forceReload: t = !1, delayMs: i = 200 } = {}) {
    this.isDisposed || !this.config.enableAutoRecovery || (this.recoveryTimer && (clearTimeout(this.recoveryTimer), this.recoveryTimer = null), this.recoveryTimer = setTimeout(() => {
      this.recoveryTimer = null, this.tryRecoverFromInterruption(e, { forceReload: t });
    }, i));
  }
  async tryRecoverFromInterruption(e, { forceReload: t = !1 } = {}) {
    if (this.isDisposed || !this.config.enableAutoRecovery || typeof document < "u" && document.hidden) return;
    if (this.isLoading) {
      this.queueRecovery(e, { forceReload: !0, delayMs: 600 });
      return;
    }
    const i = Date.now();
    if (i - this.lastRecoveryAttemptAt < this.recoveryCooldownMs)
      return;
    this.lastRecoveryAttemptAt = i;
    const s = this.belowViewer?.getLoadedModels?.()?.length || 0;
    if (!(t || this.hadContextLoss || s === 0)) {
      this.forceRefreshFrame();
      return;
    }
    const r = Object.keys(this.config.models)[0], o = this.currentModelKey || this.lastRequestedModelKey || r;
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
    const e = this.belowViewer?.renderer, t = this.belowViewer?.sceneManager?.scene, i = this.belowViewer?.cameraManager?.camera;
    if (!(!e || !t || !i) && !e.xr?.isPresenting)
      try {
        this.belowViewer?.stereoEnabled && this.belowViewer?.stereoMode === "sbs" && typeof this.belowViewer.renderSbsStereo == "function" ? this.belowViewer.renderSbsStereo() : e.render(t, i);
      } catch {
      }
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
  getScreenshotPixelRatio(e, t, i = {}) {
    const s = t.width > 0 ? e.width / t.width : 1, n = typeof window < "u" && window.devicePixelRatio || 1, r = i.minPixelRatio ?? 2, o = i.maxDimension ?? 8192, a = Math.max(r, n, s || 1), l = Math.min(
      o / Math.max(1, t.width),
      o / Math.max(1, t.height)
    );
    return Math.max(1, Math.min(a, l));
  }
  withScreenshotResolution(e, t = {}) {
    const i = this.belowViewer?.renderer, s = i?.domElement;
    if (!s)
      throw new Error("No canvas available for screenshot");
    const n = s.getBoundingClientRect();
    if (!n.width || !n.height)
      throw new Error("Viewer canvas is not visible");
    if (!i.setPixelRatio || !i.setSize)
      return this.forceRefreshFrame(), e(s, n);
    const r = i.getPixelRatio?.() || (n.width > 0 ? s.width / n.width : 1), o = this.getScreenshotPixelRatio(s, n, t), a = Math.max(1, Math.round(n.width)), l = Math.max(1, Math.round(n.height));
    if (!(Math.abs(o - r) > 0.01))
      return this.forceRefreshFrame(), e(s, n);
    i.setPixelRatio(o), i.setSize(a, l, !1), this.forceRefreshFrame();
    try {
      return e(s, n);
    } finally {
      i.setPixelRatio(r), i.setSize(a, l, !1), this.forceRefreshFrame();
    }
  }
  captureScreenshotCanvas(e = {}) {
    return this.withScreenshotResolution((t, i) => {
      const s = document.createElement("canvas");
      return s.width = t.width, s.height = t.height, s.getContext("2d").drawImage(t, 0, 0, s.width, s.height), {
        canvas: s,
        sourceRect: i,
        scaleX: s.width / i.width,
        scaleY: s.height / i.height
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
    if (this.annotations) {
      this.annotations.captureScreenshot().catch((e) => {
        console.error("[ModelViewer] Failed to capture annotated screenshot", e);
      });
      return;
    }
    try {
      const t = this.captureScreenshotCanvas().canvas.toDataURL("image/png");
      if (t === "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==") {
        console.error("[ModelViewer] Screenshot captured empty canvas");
        return;
      }
      const i = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "").slice(0, -5), n = `${this.currentModelKey ? this.config.models[this.currentModelKey]?.name?.replace(/[^a-zA-Z0-9\-_]/g, "-") || this.currentModelKey.replace(/[^a-zA-Z0-9\-_]/g, "-") : "unknown"}-belowjs-${i}.png`, r = document.createElement("a");
      r.href = t, r.download = n, document.body.appendChild(r), r.click(), document.body.removeChild(r), console.log(`[ModelViewer] Screenshot saved as ${n}`);
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
    }), this.belowViewer.on("vr-movement-start", (e) => this.emit("vr-movement-start", e)), this.belowViewer.on("vr-movement-stop", (e) => this.emit("vr-movement-stop", e)), this.belowViewer.on("vr-movement-update", (e) => this.emit("vr-movement-update", e)), this.belowViewer.on("ar-session-start", (e) => this.emit("ar-session-start", e)), this.belowViewer.on("ar-session-end", (e) => this.emit("ar-session-end", e)), this.belowViewer.on("ar-session-pause", (e) => this.emit("ar-session-pause", e)), this.belowViewer.on("ar-session-resume", (e) => {
      this.emit("ar-session-resume", e);
    }), this.belowViewer.on("ar-gesture-start", (e) => this.emit("ar-gesture-start", e)), this.belowViewer.on("ar-gesture-end", (e) => this.emit("ar-gesture-end", e));
  }
  onVRSessionStart() {
    if (this.flyControls && this.flyControls.exitFlyMode(), this.ui.info && (this.ui.info.style.display = "none"), this.isLoading && this.updateVRLoadingIndicator(), !this.vrUpdateLoop) {
      let e = 0;
      const t = (i) => {
        this.belowViewer && this.belowViewer.renderer && this.belowViewer.renderer.xr && this.belowViewer.renderer.xr.isPresenting ? (i - e > 100 && (this.vrLoadingSprite && this.belowViewer.sceneManager.scene.children.includes(this.vrLoadingSprite) && this.isLoading && this.positionVRLoadingSprite(), e = i), this.vrUpdateLoop = requestAnimationFrame(t)) : this.vrUpdateLoop = null;
      };
      this.vrUpdateLoop = requestAnimationFrame(t);
    }
    this.measurementSystem && typeof this.measurementSystem.attachVR == "function" && setTimeout(() => {
      const e = this.belowViewer?.renderer;
      if (e && e.xr && typeof e.xr.getController == "function") {
        const t = e.xr.getController(0), i = e.xr.getController(1), s = e.xr.getControllerGrip ? e.xr.getControllerGrip(0) : void 0, n = e.xr.getControllerGrip ? e.xr.getControllerGrip(1) : void 0;
        this.measurementSystem.attachVR({ controller1: t, controller2: i, controllerGrip1: s, controllerGrip2: n }), this.measurementSystem.resetGhostSpherePositions();
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
    let i = 0, s = !1;
    const n = { x: 0, y: 0 }, r = 5, o = (h) => {
      s = !1, n.x = h.clientX, n.y = h.clientY;
    }, a = (h) => {
      if (!s) {
        const u = Math.abs(h.clientX - n.x), A = Math.abs(h.clientY - n.y);
        (u > r || A > r) && (s = !0);
      }
    }, l = () => {
      setTimeout(() => {
        s = !1;
      }, 10);
    }, d = (h) => {
      const u = Date.now(), A = u - i < t;
      i = u, !(this.belowViewer.renderer.xr?.isPresenting || s) && (this.measurementSystem && this.measurementSystem.desktopMeasurementMode || A && this.focusOnPoint(h));
    };
    e.addEventListener("mousedown", o), e.addEventListener("mousemove", a), e.addEventListener("mouseup", l), e.addEventListener("click", d), this.focusEventHandlers = {
      onMouseDown: o,
      onMouseMove: a,
      onMouseUp: l,
      onMouseClick: d
    };
  }
  getPointerRaycastInfo(e) {
    if (!e || typeof e.clientX != "number" || typeof e.clientY != "number" || !this.belowViewer || !this.belowViewer.renderer || !this.belowViewer.cameraManager || this.belowViewer.renderer.xr?.isPresenting)
      return null;
    const i = this.belowViewer.renderer.domElement.getBoundingClientRect();
    if (!i.width || !i.height)
      return null;
    const s = e.clientX - i.left, n = e.clientY - i.top;
    if (!Number.isFinite(s) || !Number.isFinite(n))
      return null;
    const r = this.belowViewer.cameraManager.getCamera();
    let o = r, a = s / i.width * 2 - 1;
    const l = -(n / i.height * 2 - 1), d = this.belowViewer.getStereoSettings?.();
    if (d?.enabled === !0 && d?.mode === "sbs" && this.belowViewer.stereoCamera) {
      const h = this.belowViewer.stereoCamera, u = i.width / 2, A = s <= u, p = A ? u : i.width - u, f = A ? s : s - u;
      p > 0 && (a = f / p * 2 - 1), h.aspect = i.height > 0 ? u / i.height : 1, h.update(r), o = A ? h.cameraL : h.cameraR;
    }
    return {
      mouse: { x: a, y: l },
      camera: o
    };
  }
  focusOnPoint(e) {
    const t = this.getPointerRaycastInfo(e), i = t?.mouse, s = t?.camera;
    if (!i || !s)
      return;
    const n = new m.Raycaster();
    n.setFromCamera(i, s);
    let r = [];
    if (this.measurementSystem && this.measurementSystem._raycastTargets && this.measurementSystem._raycastTargets.length > 0)
      r = this.measurementSystem._raycastTargets;
    else {
      const a = this.belowViewer.sceneManager.getScene();
      r = [], a.traverse((l) => {
        l.isMesh && l.geometry && !this.isMeasurementHelper(l) && r.push(l);
      });
    }
    if (r.length === 0)
      return;
    const o = n.intersectObjects(r, !0);
    if (o.length > 0) {
      const a = o[0].point;
      this.belowViewer.cameraManager.focusOn(a), this.emit("focus", { point: a, intersect: o[0] });
    }
  }
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
    this.container === document.body ? document.documentElement.classList.add("below-viewer") : this.container.classList.add("below-viewer-container"), this.ensureUiRoot();
    const e = Object.keys(this.config.models).length;
    e > 1 && !this.ui.dropdown && this.createModelSelector(), this.config.enableDiveSystem && this.config.showDiveToggle && e <= 1 && !this.ui.diveToggle && this.createDiveModeToggle(), this.config.showInfo && !this.ui.info && this.createInfoPanel(), this.config.showLoadingIndicator && !this.ui.loading && this.createLoadingIndicator(), this.config.showStatus && !this.ui.status && this.createStatusIndicator(), this.ui.dropdown && this.ui.dropdown.addEventListener("change", (t) => {
      const i = t.target.value;
      i && (this.releaseModelSelectorInteraction(t), this.loadModel(i));
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
    const i = document.createElement("div");
    i.className = "model-selector below-panel", e.appendChild(i);
    const s = document.createElement("select");
    if (s.className = "model-selector__dropdown", i.appendChild(s), this.config.enableDiveSystem) {
      const n = document.createElement("div");
      n.id = "modeToggleContainer";
      const r = document.createElement("div");
      r.className = "semantic-toggle";
      const o = document.createElement("input");
      o.type = "checkbox", o.id = "modeToggleSwitch", o.className = "mode-toggle__switch", r.appendChild(o);
      const a = document.createElement("div");
      a.className = "toggle-slider-bg", r.appendChild(a);
      const l = document.createElement("div");
      l.className = "toggle-option left";
      const d = document.createElement("div");
      d.className = "toggle-icon", d.textContent = "📋";
      const h = document.createElement("div");
      h.className = "toggle-text", h.textContent = "Survey", l.appendChild(d), l.appendChild(h);
      const u = document.createElement("div");
      u.className = "toggle-option right";
      const A = document.createElement("div");
      A.className = "toggle-icon", A.textContent = "🌊";
      const p = document.createElement("div");
      p.className = "toggle-text", p.textContent = "Dive", u.appendChild(A), u.appendChild(p), r.appendChild(l), r.appendChild(u), n.appendChild(r), i.appendChild(n);
    }
    this.ui.dropdown = s, this.ui.selector = i;
  }
  createDiveModeToggle() {
    const e = document.createElement("div");
    e.className = "dive-mode-toggle-container", e.style.position = "absolute", e.style.top = "20px", e.style.right = "20px", e.style.zIndex = "1000";
    const t = document.createElement("div");
    t.className = "semantic-toggle";
    const i = document.createElement("input");
    i.type = "checkbox", i.id = "modeToggleSwitch", i.className = "mode-toggle__switch", t.appendChild(i);
    const s = document.createElement("div");
    s.className = "toggle-slider-bg", t.appendChild(s);
    const n = document.createElement("div");
    n.className = "toggle-option left";
    const r = document.createElement("div");
    r.className = "toggle-icon", r.textContent = "📋";
    const o = document.createElement("div");
    o.className = "toggle-text", o.textContent = "Survey", n.appendChild(r), n.appendChild(o);
    const a = document.createElement("div");
    a.className = "toggle-option right";
    const l = document.createElement("div");
    l.className = "toggle-icon", l.textContent = "🌊";
    const d = document.createElement("div");
    d.className = "toggle-text", d.textContent = "Dive", a.appendChild(l), a.appendChild(d), t.appendChild(n), t.appendChild(a), e.appendChild(t), this.getUiContainer().appendChild(e), this.ui.diveToggle = e;
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
  createVRLoadingIndicator(e = "Loading...", t = "", i = 0) {
    const s = (window.devicePixelRatio || 1) * 2, n = 512, r = 256, o = n * s, a = r * s;
    this.vrLoadingCanvas || (this.vrLoadingCanvas = document.createElement("canvas")), (this.vrLoadingCanvas.width !== o || this.vrLoadingCanvas.height !== a) && (this.vrLoadingCanvas.width = o, this.vrLoadingCanvas.height = a);
    const l = this.vrLoadingCanvas.getContext("2d");
    l.setTransform(1, 0, 0, 1, 0, 0), l.clearRect(0, 0, o, a), l.save(), l.scale(s, s);
    const d = n / 2, h = r / 2, u = 25, A = h - 40;
    if (l.shadowColor = "rgba(0, 0, 0, 0.8)", l.shadowBlur = 3, l.strokeStyle = "rgba(255, 255, 255, 0.3)", l.lineWidth = 3, l.beginPath(), l.arc(d, A, u, 0, Math.PI * 2), l.stroke(), l.shadowColor = "transparent", l.shadowBlur = 0, i > 0) {
      const p = i / 100 * Math.PI * 2;
      l.strokeStyle = "#ffffff", l.lineWidth = 3, l.beginPath(), l.arc(d, A, u, -Math.PI / 2, -Math.PI / 2 + p), l.stroke();
    }
    if (l.fillStyle = "white", l.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', l.textAlign = "center", l.textBaseline = "middle", l.shadowColor = "rgba(0, 0, 0, 0.8)", l.shadowBlur = 2, l.shadowOffsetX = 1, l.shadowOffsetY = 1, l.fillText(`${Math.round(i)}%`, d, A), t && (l.fillStyle = "white", l.font = '600 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', l.textAlign = "center", l.textBaseline = "middle", l.shadowColor = "rgba(0, 0, 0, 0.8)", l.shadowBlur = 4, l.shadowOffsetX = 1, l.shadowOffsetY = 1, l.fillText(t, d, h + 20)), l.fillStyle = "rgba(255, 255, 255, 0.9)", l.font = '400 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', l.shadowColor = "rgba(0, 0, 0, 0.8)", l.shadowBlur = 3, l.shadowOffsetX = 1, l.shadowOffsetY = 1, l.fillText(e, d, h + 50), l.restore(), this.vrLoadingTexture ? this.vrLoadingTexture.needsUpdate = !0 : (this.vrLoadingTexture = new m.CanvasTexture(this.vrLoadingCanvas), this.vrLoadingTexture.minFilter = m.LinearFilter, this.vrLoadingTexture.magFilter = m.LinearFilter), !this.vrLoadingSprite) {
      const p = new m.SpriteMaterial({
        map: this.vrLoadingTexture,
        depthTest: !1,
        depthWrite: !1,
        transparent: !0
      });
      this.vrLoadingSprite = new m.Sprite(p);
      const f = 0.7, g = n / r;
      this.vrLoadingSprite.scale.set(f * g, f, 1);
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
    const i = document.createElement("div");
    i.id = "infoControls", i.className = "info-panel__controls", i.innerHTML = `
      <strong>Desktop:</strong> Drag to rotate • Scroll to zoom<br>
      <strong>Mobile:</strong> Touch and drag to explore
    `, e.appendChild(t), e.appendChild(i), this.getUiContainer().appendChild(e), this.ui.info = e;
  }
  populateDropdown() {
    if (!this.ui.dropdown) return;
    this.ui.dropdown.innerHTML = "";
    const e = document.createElement("option");
    e.value = "", e.textContent = "Select a Model", e.disabled = !0, e.selected = !0, this.ui.dropdown.appendChild(e), Object.entries(this.config.models).forEach(([t, i]) => {
      const s = document.createElement("option");
      s.value = t, s.textContent = i.name || t, this.ui.dropdown.appendChild(s);
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
    this._maybeAttachAnnotationSystem(), this.lastRequestedModelKey = e, this.currentModelKey = e, this.annotations?.prepareModel(e, t), this.hadContextLoss = !1, this.recoveryTimer && (clearTimeout(this.recoveryTimer), this.recoveryTimer = null), this.ui.dropdown && (this.ui.dropdown.value = e), this.showLoading("Preparing to load...", t.name || e), this.belowViewer?.getLoadedModels()?.length > 0 && this.setManualLoadingMessage("Cleaning up previous model..."), document.title = `BelowJS – ${t.name || e}`;
    try {
      this.measurementSystem && (this.measurementSystem.clearUnifiedMeasurement(), this.measurementSystem.clearLegacyVRMeasurement(), this.measurementSystem.clearLegacyDesktopMeasurement()), this.belowViewer.clearModels(), this.belowViewer.cameraManager?.resetControlInteractionState?.(), this.belowViewer.vrManager && (this.belowViewer.vrManager.stopMovement(), this.belowViewer.vrManager.resetTeleportState()), await new Promise((r) => setTimeout(r, 50));
      const n = await this.belowViewer.loadModel(t.url, {
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
      if (n) {
        if (this.currentModelKey !== e) return;
        const r = !!t.initialPositions?.desktop;
        this.applyInitialPositions(t, n), this.belowViewer.cameraManager?.resetControlInteractionState?.(), t.type === "tileset" && !r && !this.belowViewer.isVRPresenting() && this.belowViewer.frameModel(n), await this.annotations?.activateModel(e, n, t), this.hideLoading(), this.updateStatus(`Loaded: ${t.name || e}`), this.applyModelMeasurementConfig(t, n), this.modelReady = !0, this.recoveryAttempts = 0, this.settleControlsAfterModelSwitch(), this.emit("model-switched", { modelKey: e, model: n, config: t }), this.emit("modelLoaded", { modelKey: e, model: n, config: t });
      } else this.currentModelKey === e && this.queueRecovery("empty-load-result", { forceReload: !0, delayMs: 350 });
    } catch (n) {
      n.message !== "Loading cancelled" && (console.error("Failed to load model:", n), this.hideLoading(), this.updateStatus(`Error loading ${t.name || e}`), this.applyModelMeasurementConfig(t, null), this.currentModelKey === e && (this.annotations?.clear(), (typeof document > "u" || !document.hidden) && this.queueRecovery("model-load-error", { forceReload: !0, delayMs: 500 })));
    }
  }
  applyInitialPositions(e, t) {
    const i = e.initialPositions;
    if (!i) return;
    const s = this.belowViewer.getVRManager();
    s && s.setInitialPositions(i);
    const n = this.belowViewer.isVRPresenting();
    if (n && i.vr) {
      const r = this.belowViewer.getCamera().parent;
      r && (r.position.set(
        i.vr.dolly.x,
        i.vr.dolly.y,
        i.vr.dolly.z
      ), r.rotation.set(
        i.vr.rotation.x,
        i.vr.rotation.y,
        i.vr.rotation.z
      ));
    } else if (!n && i.desktop) {
      const r = this.belowViewer.getCamera(), o = this.belowViewer.cameraManager.controls;
      r && o && (r.position.set(
        i.desktop.camera.x,
        i.desktop.camera.y,
        i.desktop.camera.z
      ), o.target.set(
        i.desktop.target.x,
        i.desktop.target.y,
        i.desktop.target.z
      ), o.update());
    }
  }
  showLoading(e = "Loading...", t = null) {
    if (this.isLoading = !0, this.loadingModelName = t || "", this.loadingPercentage = 0, this.setManualLoadingMessage(e), this.lastManualLoadingMessage = e || "", this.ui.loading) {
      const i = this.ui.loading.querySelector(".loading-status"), s = this.ui.loading.querySelector(".loading-model-name"), n = this.ui.loading.querySelector(".spinner-percentage");
      i && (i.textContent = e), s && t && (s.textContent = t), n && (n.textContent = "0%"), this.ui.loading.style.display = "flex";
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
    const e = this.belowViewer.cameraManager.camera, t = 2, i = new m.Vector3();
    e.getWorldDirection(i);
    const s = new m.Vector3();
    e.getWorldPosition(s);
    const n = new m.Vector3();
    n.copy(s), n.add(i.multiplyScalar(t)), this.vrLoadingSprite.position.copy(n), this.vrLoadingSprite.lookAt(s);
  }
  updateStatus(e) {
    this.ui.status && (this.ui.status.textContent = e, this.ui.status.style.display = "block");
  }
  updateLoadingProgress({ progress: e }) {
    if (e.lengthComputable && this.currentModelKey) {
      const t = Math.min(100, Math.round(e.loaded / e.total * 100));
      if (this.loadingPercentage = t, this.stageOverrideActive || this.setManualLoadingMessage("Loading model"), this.ui.loading) {
        const i = this.ui.loading.querySelector(".spinner-percentage"), s = this.ui.loading.querySelector(".spinner-path");
        if (i && (i.textContent = `${t}%`), s) {
          const n = 2 * Math.PI * 20, r = n - t / 100 * n;
          s.style.strokeDashoffset = r;
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
        const i = this.belowViewer.cameraManager.getCamera(), s = this.belowViewer.cameraManager.getControls();
        t.camera && i.position.set(t.camera.x, t.camera.y, t.camera.z), t.target && s && (s.target.set(t.target.x, t.target.y, t.target.z), s.update()), this.emit("camera-reset", { modelKey: this.currentModelKey, position: t });
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
    const t = e === "comfort", i = e === "free", s = this.belowViewer && this.belowViewer.setVRComfortPreset ? this.belowViewer.setVRComfortPreset(e) : !1;
    return (t || i) && (this.lastComfortMode = t, this.comfortGlyph && this.comfortGlyph.setComfortMode(t, {
      emitEvent: !1,
      applyToManager: !1
    })), s;
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
    const t = e === !0, i = this.belowViewer && this.belowViewer.setVRComfortMode ? this.belowViewer.setVRComfortMode(t) : !1;
    return this.lastComfortMode = t, this.comfortGlyph && this.comfortGlyph.setComfortMode(t, {
      emitEvent: !1,
      applyToManager: !1
    }), i;
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
      const { canvas: e, onVisibilityChange: t, onWindowFocus: i, onContextLost: s, onContextRestored: n } = this.recoveryHandlers;
      typeof document < "u" && t && document.removeEventListener("visibilitychange", t), typeof window < "u" && i && window.removeEventListener("focus", i), e && s && e.removeEventListener("webglcontextlost", s, !1), e && n && e.removeEventListener("webglcontextrestored", n, !1), this.recoveryHandlers = null;
    }
    if (typeof window < "u" && window.modelViewer === this && (window.modelViewer = null), this.focusEventHandlers && this.belowViewer?.renderer?.domElement) {
      const e = this.belowViewer.renderer.domElement;
      e.removeEventListener("mousedown", this.focusEventHandlers.onMouseDown), e.removeEventListener("mousemove", this.focusEventHandlers.onMouseMove), e.removeEventListener("mouseup", this.focusEventHandlers.onMouseUp), e.removeEventListener("click", this.focusEventHandlers.onMouseClick), this.focusEventHandlers = null;
    }
    this.measurementSystem && (this.measurementSystem.dispose(), this.measurementSystem = null), this.annotations && (this.annotations.destroy(), this.annotations = null), this.comfortGlyph && (this.comfortGlyph.dispose(), this.comfortGlyph = null), this.diveSystem && (this.diveSystem.dispose(), this.diveSystem = null, typeof window < "u" && window.diveSystem === this.diveSystem && (window.diveSystem = null)), this.fullscreenButton && (this.fullscreenButton.remove(), this.fullscreenButton = null, document.removeEventListener("fullscreenchange", this._onFullscreenChange)), this.screenshotButton && (this.screenshotButton.remove(), this.screenshotButton = null), this.stereoUiObserver && (this.stereoUiObserver.disconnect(), this.stereoUiObserver = null), this.stereoUiMirror && (this.stereoUiMirror.remove(), this.stereoUiMirror = null), this.belowViewer && this.belowViewer.dispose(), this.removeAllListeners();
  }
}
export {
  ys as ANNOTATION_DOCUMENT_FORMAT,
  Cs as ANNOTATION_DOCUMENT_VERSION,
  cd as AnnotationSystem,
  Fh as BelowViewer,
  Ia as Camera,
  gi as ConfigValidator,
  Pe as EventSystem,
  jh as FlyControls,
  bs as Line2,
  hi as LineGeometry,
  Bt as LineMaterial,
  ne as ModelLoader,
  Es as ModelViewer,
  kh as PerfMonitor,
  da as Scene,
  xh as VRManager,
  oh as applyTilesetVRProfileDefaults,
  rh as applyVRRenderProfileDefaults,
  nh as detectXRPerformanceClass,
  Kh as normalizeAnnotationDocument,
  co as resolveXRPerformanceProfile,
  Yh as serializeAnnotationDocument
};
