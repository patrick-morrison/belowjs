import * as m from "three";
import { Controls as ir, Vector3 as v, MOUSE as We, TOUCH as Ke, Quaternion as $e, Spherical as qs, Vector2 as k, Ray as is, Plane as Pn, MathUtils as st, TrianglesDrawMode as nr, TriangleFanDrawMode as zs, TriangleStripDrawMode as Gn, Loader as ai, LoaderUtils as mt, FileLoader as xe, MeshPhysicalMaterial as ue, Color as Ee, LinearSRGBColorSpace as le, SRGBColorSpace as Ce, SpotLight as or, PointLight as rr, DirectionalLight as ar, Matrix4 as P, InstancedMesh as li, InstancedBufferAttribute as lr, Object3D as ns, TextureLoader as cr, ImageBitmapLoader as Ar, BufferAttribute as ne, InterleavedBuffer as hr, InterleavedBufferAttribute as Fe, LinearMipmapLinearFilter as os, NearestMipmapLinearFilter as dr, LinearMipmapNearestFilter as ur, NearestMipmapNearestFilter as gr, LinearFilter as Ge, NearestFilter as Un, RepeatWrapping as js, MirroredRepeatWrapping as pr, ClampToEdgeWrapping as fr, PointsMaterial as Nn, Material as gs, LineBasicMaterial as mr, MeshStandardMaterial as ci, DoubleSide as br, MeshBasicMaterial as ke, PropertyBinding as Cr, BufferGeometry as rs, SkinnedMesh as Er, Mesh as as, LineSegments as yr, Line as Ir, LineLoop as Br, Points as Vn, Group as Xe, PerspectiveCamera as wr, OrthographicCamera as On, Skeleton as Sr, AnimationClip as vr, Bone as Mr, InterpolateDiscrete as xr, InterpolateLinear as Hn, Texture as yi, VectorKeyframeTrack as Ii, NumberKeyframeTrack as Bi, QuaternionKeyframeTrack as wi, ColorManagement as Ks, FrontSide as Qr, Interpolant as Tr, Box3 as it, Sphere as Et, CompressedCubeTexture as Rr, CompressedArrayTexture as Dr, CompressedTexture as qn, NoColorSpace as Si, RGBA_BPTC_Format as Ys, RGBA_S3TC_DXT5_Format as Js, RGBA_S3TC_DXT3_Format as vi, RGB_S3TC_DXT1_Format as Mi, RGBA_S3TC_DXT1_Format as Ws, RGBA_ASTC_6x6_Format as xi, RGBA_ASTC_4x4_Format as jt, RGBA_ETC2_EAC_Format as zn, RGB_ETC2_Format as jn, RedFormat as gt, RGFormat as pt, RGBAFormat as Ye, UnsignedByteType as re, HalfFloatType as Je, FloatType as bt, DataTexture as Kn, Data3DTexture as Lr, RGB_PVRTC_4BPPV1_Format as Fr, RGB_ETC1_Format as kr, RGBA_PVRTC_4BPPV1_Format as _r, RGB_BPTC_UNSIGNED_Format as Pr, Euler as Yn, TextureUtils as Gr, LoadingManager as Ur, EventDispatcher as vt, Frustum as Nr, DefaultLoadingManager as ls, Matrix3 as Jn, Float32BufferAttribute as Jt, WebGLRenderer as Vr, WebGLRenderTarget as Qi, ShaderMaterial as Wn, OneFactor as Or, ZeroFactor as Hr, CustomBlending as qr, Box2 as zr, Matrix2 as jr, Vector4 as nt, SphereGeometry as Xn, BoxGeometry as Kr, DynamicDrawUsage as Yr, InstancedBufferGeometry as Jr, InstancedInterleavedBuffer as Xs, WireframeGeometry as Wr, ShaderLib as Kt, UniformsUtils as Zn, UniformsLib as Yt, Line3 as Xr } from "three";
class yt {
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
class cs {
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
      const n = this.schema[i], o = s[i];
      if (n.type === "object" && n.schema) {
        const r = o ?? n.default;
        t[i] = new cs(n.schema).validate(r || {});
      } else if (o == null)
        t[i] = n.default;
      else if (this.isTypeValid(o, n.type))
        t[i] = o;
      else {
        const r = Array.isArray(n.type) ? n.type.join(" or ") : n.type;
        console.warn(
          `ConfigValidator: Invalid type for option '${i}'. Expected '${r}', but received '${typeof o}'. Using default value: ${JSON.stringify(n.default)}.`
        ), t[i] = n.default;
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
    const s = (i, n) => n === "array" ? Array.isArray(i) : n === "object" ? i !== null && typeof i == "object" && !Array.isArray(i) : typeof i === n;
    return Array.isArray(t) ? t.some((i) => s(e, i)) : s(e, t);
  }
}
class Zr {
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
const Ti = { type: "change" }, Ai = { type: "start" }, $n = { type: "end" }, Mt = new is(), Ri = new Pn(), $r = Math.cos(70 * st.DEG2RAD), U = new v(), J = 2 * Math.PI, _ = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, ps = 1e-6;
class ea extends ir {
  /**
   * Constructs a new controls instance.
   *
   * @param {Object3D} object - The object that is managed by the controls.
   * @param {?HTMLDOMElement} domElement - The HTML element used for event listeners.
   */
  constructor(e, t = null) {
    super(e, t), this.state = _.NONE, this.target = new v(), this.cursor = new v(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: We.ROTATE, MIDDLE: We.DOLLY, RIGHT: We.PAN }, this.touches = { ONE: Ke.ROTATE, TWO: Ke.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new v(), this._lastQuaternion = new $e(), this._lastTargetPosition = new v(), this._quat = new $e().setFromUnitVectors(e.up, new v(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new qs(), this._sphericalDelta = new qs(), this._scale = 1, this._panOffset = new v(), this._rotateStart = new k(), this._rotateEnd = new k(), this._rotateDelta = new k(), this._panStart = new k(), this._panEnd = new k(), this._panDelta = new k(), this._dollyStart = new k(), this._dollyEnd = new k(), this._dollyDelta = new k(), this._dollyDirection = new v(), this._mouse = new k(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = sa.bind(this), this._onPointerDown = ta.bind(this), this._onPointerUp = ia.bind(this), this._onContextMenu = Aa.bind(this), this._onMouseWheel = ra.bind(this), this._onKeyDown = aa.bind(this), this._onTouchStart = la.bind(this), this._onTouchMove = ca.bind(this), this._onMouseDown = na.bind(this), this._onMouseMove = oa.bind(this), this._interceptControlDown = ha.bind(this), this._interceptControlUp = da.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Ti), this.update(), this.state = _.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    U.copy(t).sub(this.target), U.applyQuaternion(this._quat), this._spherical.setFromVector3(U), this.autoRotate && this.state === _.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let s = this.minAzimuthAngle, i = this.maxAzimuthAngle;
    isFinite(s) && isFinite(i) && (s < -Math.PI ? s += J : s > Math.PI && (s -= J), i < -Math.PI ? i += J : i > Math.PI && (i -= J), s <= i ? this._spherical.theta = Math.max(s, Math.min(i, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (s + i) / 2 ? Math.max(s, this._spherical.theta) : Math.min(i, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let n = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const o = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), n = o != this._spherical.radius;
    }
    if (U.setFromSpherical(this._spherical), U.applyQuaternion(this._quatInverse), t.copy(this.target).add(U), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let o = null;
      if (this.object.isPerspectiveCamera) {
        const r = U.length();
        o = this._clampDistance(r * this._scale);
        const l = r - o;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), n = !!l;
      } else if (this.object.isOrthographicCamera) {
        const r = new v(this._mouse.x, this._mouse.y, 0);
        r.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), n = l !== this.object.zoom;
        const c = new v(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object), this.object.position.sub(c).add(r), this.object.updateMatrixWorld(), o = U.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      o !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position) : (Mt.origin.copy(this.object.position), Mt.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Mt.direction)) < $r ? this.object.lookAt(this.target) : (Ri.setFromNormalAndCoplanarPoint(this.object.up, this.target), Mt.intersectPlane(Ri, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const o = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), o !== this.object.zoom && (this.object.updateProjectionMatrix(), n = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, n || this._lastPosition.distanceToSquared(this.object.position) > ps || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > ps || this._lastTargetPosition.distanceToSquared(this.target) > ps ? (this.dispatchEvent(Ti), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? J / 60 * this.autoRotateSpeed * e : J / 60 / 60 * this.autoRotateSpeed;
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
    U.setFromMatrixColumn(t, 0), U.multiplyScalar(-e), this._panOffset.add(U);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? U.setFromMatrixColumn(t, 1) : (U.setFromMatrixColumn(t, 0), U.crossVectors(this.object.up, U)), U.multiplyScalar(e), this._panOffset.add(U);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, t) {
    const s = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const i = this.object.position;
      U.copy(i).sub(this.target);
      let n = U.length();
      n *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * n / s.clientHeight, this.object.matrix), this._panUp(2 * t * n / s.clientHeight, this.object.matrix);
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
    const s = this.domElement.getBoundingClientRect(), i = e - s.left, n = t - s.top, o = s.width, r = s.height;
    this._mouse.x = i / o * 2 - 1, this._mouse.y = -(n / r) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
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
    this._rotateLeft(J * this._rotateDelta.x / t.clientHeight), this._rotateUp(J * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(J * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-J * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(J * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-J * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
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
    const t = this._getSecondPointerPosition(e), s = e.pageX - t.x, i = e.pageY - t.y, n = Math.sqrt(s * s + i * i);
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
      const s = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + s.x), n = 0.5 * (e.pageY + s.y);
      this._rotateEnd.set(i, n);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(J * this._rotateDelta.x / t.clientHeight), this._rotateUp(J * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
    const t = this._getSecondPointerPosition(e), s = e.pageX - t.x, i = e.pageY - t.y, n = Math.sqrt(s * s + i * i);
    this._dollyEnd.set(0, n), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const o = (e.pageX + t.x) * 0.5, r = (e.pageY + t.y) * 0.5;
    this._updateZoomParameters(o, r);
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
function ta(a) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(a.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(a) && (this._addPointer(a), a.pointerType === "touch" ? this._onTouchStart(a) : this._onMouseDown(a)));
}
function sa(a) {
  this.enabled !== !1 && (a.pointerType === "touch" ? this._onTouchMove(a) : this._onMouseMove(a));
}
function ia(a) {
  switch (this._removePointer(a), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(a.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent($n), this.state = _.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function na(a) {
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
    case We.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(a), this.state = _.DOLLY;
      break;
    case We.ROTATE:
      if (a.ctrlKey || a.metaKey || a.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(a), this.state = _.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(a), this.state = _.ROTATE;
      }
      break;
    case We.PAN:
      if (a.ctrlKey || a.metaKey || a.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(a), this.state = _.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(a), this.state = _.PAN;
      }
      break;
    default:
      this.state = _.NONE;
  }
  this.state !== _.NONE && this.dispatchEvent(Ai);
}
function oa(a) {
  switch (this.state) {
    case _.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(a);
      break;
    case _.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(a);
      break;
    case _.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(a);
      break;
  }
}
function ra(a) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== _.NONE || (a.preventDefault(), this.dispatchEvent(Ai), this._handleMouseWheel(this._customWheelEvent(a)), this.dispatchEvent($n));
}
function aa(a) {
  this.enabled !== !1 && this._handleKeyDown(a);
}
function la(a) {
  switch (this._trackPointer(a), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case Ke.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(a), this.state = _.TOUCH_ROTATE;
          break;
        case Ke.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(a), this.state = _.TOUCH_PAN;
          break;
        default:
          this.state = _.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case Ke.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(a), this.state = _.TOUCH_DOLLY_PAN;
          break;
        case Ke.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(a), this.state = _.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = _.NONE;
      }
      break;
    default:
      this.state = _.NONE;
  }
  this.state !== _.NONE && this.dispatchEvent(Ai);
}
function ca(a) {
  switch (this._trackPointer(a), this.state) {
    case _.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(a), this.update();
      break;
    case _.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(a), this.update();
      break;
    case _.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(a), this.update();
      break;
    case _.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(a), this.update();
      break;
    default:
      this.state = _.NONE;
  }
}
function Aa(a) {
  this.enabled !== !1 && a.preventDefault();
}
function ha(a) {
  a.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function da(a) {
  a.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
class ua extends yt {
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
      this.controls = new ea(this.camera, e);
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
    const s = t && t.isVector3 ? t.clone() : new m.Vector3(t || 1, t || 1, t || 1), i = Math.max(s.x, 1e-3), n = Math.max(s.y, 1e-3), o = Math.max(s.z, 1e-3), r = m.MathUtils.degToRad(this.camera.fov), l = 2 * Math.atan(Math.tan(r / 2) * this.camera.aspect), c = n * 0.5 / Math.tan(r / 2), A = i * 0.5 / Math.tan(l / 2), d = Math.max(c, A) * 1.2 + o * 0.5, u = new m.Vector3(0.7, 0.5, 0.7).normalize(), g = e.clone().add(u.multiplyScalar(d));
    this.camera.position.copy(g), this.camera.lookAt(e), this.controls && (this.controls.target.copy(e), this.controls.maxDistance = Math.max(this.controls.maxDistance, d * 4), this.controls.minDistance = Math.min(this.controls.minDistance, Math.max(d * 0.02, 0.05)), this.controls.update());
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
    const s = this.controls.target.clone(), i = this.camera.position.clone(), n = i.clone().sub(s), o = e.clone().add(n), r = 1e3, l = performance.now(), c = () => {
      this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null, this.controls.removeEventListener("start", c));
    };
    this.controls.addEventListener("start", c, { once: !0 });
    const A = () => {
      const h = performance.now() - l, d = Math.min(h / r, 1), u = 1 - Math.pow(1 - d, 3);
      this.controls.target.lerpVectors(s, e, u), this.camera.position.lerpVectors(i, o, u), d < 1 ? this.focusAnimation = requestAnimationFrame(A) : (this.focusAnimation = null, this.controls.removeEventListener("start", c), this.emit("focus-complete", { target: e, position: o }));
    };
    this.focusAnimation = requestAnimationFrame(A), this.emit("focus-start", { target: e, startPosition: i, newPosition: o });
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
function ga(a) {
  let e = 0;
  for (const s in a.attributes) {
    const i = a.getAttribute(s);
    e += i.count * i.itemSize * i.array.BYTES_PER_ELEMENT;
  }
  const t = a.getIndex();
  return e += t ? t.count * t.itemSize * t.array.BYTES_PER_ELEMENT : 0, e;
}
function Di(a, e) {
  if (e === nr)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), a;
  if (e === zs || e === Gn) {
    let t = a.getIndex();
    if (t === null) {
      const o = [], r = a.getAttribute("position");
      if (r !== void 0) {
        for (let l = 0; l < r.count; l++)
          o.push(l);
        a.setIndex(o), t = a.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), a;
    }
    const s = t.count - 2, i = [];
    if (e === zs)
      for (let o = 1; o <= s; o++)
        i.push(t.getX(0)), i.push(t.getX(o)), i.push(t.getX(o + 1));
    else
      for (let o = 0; o < s; o++)
        o % 2 === 0 ? (i.push(t.getX(o)), i.push(t.getX(o + 1)), i.push(t.getX(o + 2))) : (i.push(t.getX(o + 2)), i.push(t.getX(o + 1)), i.push(t.getX(o)));
    i.length / 3 !== s && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const n = a.clone();
    return n.setIndex(i), n.clearGroups(), n;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), a;
}
class Ne extends ai {
  /**
   * Constructs a new glTF loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new Ca(t);
    }), this.register(function(t) {
      return new Ea(t);
    }), this.register(function(t) {
      return new Qa(t);
    }), this.register(function(t) {
      return new Ta(t);
    }), this.register(function(t) {
      return new Ra(t);
    }), this.register(function(t) {
      return new Ia(t);
    }), this.register(function(t) {
      return new Ba(t);
    }), this.register(function(t) {
      return new wa(t);
    }), this.register(function(t) {
      return new Sa(t);
    }), this.register(function(t) {
      return new ba(t);
    }), this.register(function(t) {
      return new va(t);
    }), this.register(function(t) {
      return new ya(t);
    }), this.register(function(t) {
      return new xa(t);
    }), this.register(function(t) {
      return new Ma(t);
    }), this.register(function(t) {
      return new fa(t);
    }), this.register(function(t) {
      return new Da(t);
    }), this.register(function(t) {
      return new La(t);
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
    const n = this;
    let o;
    if (this.resourcePath !== "")
      o = this.resourcePath;
    else if (this.path !== "") {
      const c = mt.extractUrlBase(e);
      o = mt.resolveURL(c, this.path);
    } else
      o = mt.extractUrlBase(e);
    this.manager.itemStart(e);
    const r = function(c) {
      i ? i(c) : console.error(c), n.manager.itemError(e), n.manager.itemEnd(e);
    }, l = new xe(this.manager);
    l.setPath(this.path), l.setResponseType("arraybuffer"), l.setRequestHeader(this.requestHeader), l.setWithCredentials(this.withCredentials), l.load(e, function(c) {
      try {
        n.parse(c, o, function(A) {
          t(A), n.manager.itemEnd(e);
        }, r);
      } catch (A) {
        r(A);
      }
    }, s, r);
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
    let n;
    const o = {}, r = {}, l = new TextDecoder();
    if (typeof e == "string")
      n = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (l.decode(new Uint8Array(e, 0, 4)) === eo) {
        try {
          o[D.KHR_BINARY_GLTF] = new Fa(e);
        } catch (h) {
          i && i(h);
          return;
        }
        n = JSON.parse(o[D.KHR_BINARY_GLTF].content);
      } else
        n = JSON.parse(l.decode(e));
    else
      n = e;
    if (n.asset === void 0 || n.asset.version[0] < 2) {
      i && i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const c = new Ka(n, {
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
      h.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), r[h.name] = h, o[h.name] = !0;
    }
    if (n.extensionsUsed)
      for (let A = 0; A < n.extensionsUsed.length; ++A) {
        const h = n.extensionsUsed[A], d = n.extensionsRequired || [];
        switch (h) {
          case D.KHR_MATERIALS_UNLIT:
            o[h] = new ma();
            break;
          case D.KHR_DRACO_MESH_COMPRESSION:
            o[h] = new ka(n, this.dracoLoader);
            break;
          case D.KHR_TEXTURE_TRANSFORM:
            o[h] = new _a();
            break;
          case D.KHR_MESH_QUANTIZATION:
            o[h] = new Pa();
            break;
          default:
            d.indexOf(h) >= 0 && r[h] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + h + '".');
        }
      }
    c.setExtensions(o), c.setPlugins(r), c.parse(s, i);
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
    return new Promise(function(i, n) {
      s.parse(e, t, i, n);
    });
  }
}
function pa() {
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
const D = {
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
class fa {
  constructor(e) {
    this.parser = e, this.name = D.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const e = this.parser, t = this.parser.json.nodes || [];
    for (let s = 0, i = t.length; s < i; s++) {
      const n = t[s];
      n.extensions && n.extensions[this.name] && n.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, n.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const t = this.parser, s = "light:" + e;
    let i = t.cache.get(s);
    if (i) return i;
    const n = t.json, l = ((n.extensions && n.extensions[this.name] || {}).lights || [])[e];
    let c;
    const A = new Ee(16777215);
    l.color !== void 0 && A.setRGB(l.color[0], l.color[1], l.color[2], le);
    const h = l.range !== void 0 ? l.range : 0;
    switch (l.type) {
      case "directional":
        c = new ar(A), c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      case "point":
        c = new rr(A), c.distance = h;
        break;
      case "spot":
        c = new or(A), c.distance = h, l.spot = l.spot || {}, l.spot.innerConeAngle = l.spot.innerConeAngle !== void 0 ? l.spot.innerConeAngle : 0, l.spot.outerConeAngle = l.spot.outerConeAngle !== void 0 ? l.spot.outerConeAngle : Math.PI / 4, c.angle = l.spot.outerConeAngle, c.penumbra = 1 - l.spot.innerConeAngle / l.spot.outerConeAngle, c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + l.type);
    }
    return c.position.set(0, 0, 0), be(c, l), l.intensity !== void 0 && (c.intensity = l.intensity), c.name = t.createUniqueName(l.name || "light_" + e), i = Promise.resolve(c), t.cache.add(s, i), i;
  }
  getDependency(e, t) {
    if (e === "light")
      return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this, s = this.parser, n = s.json.nodes[e], r = (n.extensions && n.extensions[this.name] || {}).light;
    return r === void 0 ? null : this._loadLight(r).then(function(l) {
      return s._getNodeRef(t.cache, r, l);
    });
  }
}
class ma {
  constructor() {
    this.name = D.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return ke;
  }
  extendParams(e, t, s) {
    const i = [];
    e.color = new Ee(1, 1, 1), e.opacity = 1;
    const n = t.pbrMetallicRoughness;
    if (n) {
      if (Array.isArray(n.baseColorFactor)) {
        const o = n.baseColorFactor;
        e.color.setRGB(o[0], o[1], o[2], le), e.opacity = o[3];
      }
      n.baseColorTexture !== void 0 && i.push(s.assignTexture(e, "map", n.baseColorTexture, Ce));
    }
    return Promise.all(i);
  }
}
class ba {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const i = this.parser.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = i.extensions[this.name].emissiveStrength;
    return n !== void 0 && (t.emissiveIntensity = n), Promise.resolve();
  }
}
class Ca {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = [], o = i.extensions[this.name];
    if (o.clearcoatFactor !== void 0 && (t.clearcoat = o.clearcoatFactor), o.clearcoatTexture !== void 0 && n.push(s.assignTexture(t, "clearcoatMap", o.clearcoatTexture)), o.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = o.clearcoatRoughnessFactor), o.clearcoatRoughnessTexture !== void 0 && n.push(s.assignTexture(t, "clearcoatRoughnessMap", o.clearcoatRoughnessTexture)), o.clearcoatNormalTexture !== void 0 && (n.push(s.assignTexture(t, "clearcoatNormalMap", o.clearcoatNormalTexture)), o.clearcoatNormalTexture.scale !== void 0)) {
      const r = o.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new k(r, r);
    }
    return Promise.all(n);
  }
}
class Ea {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const i = this.parser.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = i.extensions[this.name];
    return t.dispersion = n.dispersion !== void 0 ? n.dispersion : 0, Promise.resolve();
  }
}
class ya {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = [], o = i.extensions[this.name];
    return o.iridescenceFactor !== void 0 && (t.iridescence = o.iridescenceFactor), o.iridescenceTexture !== void 0 && n.push(s.assignTexture(t, "iridescenceMap", o.iridescenceTexture)), o.iridescenceIor !== void 0 && (t.iridescenceIOR = o.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), o.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = o.iridescenceThicknessMinimum), o.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = o.iridescenceThicknessMaximum), o.iridescenceThicknessTexture !== void 0 && n.push(s.assignTexture(t, "iridescenceThicknessMap", o.iridescenceThicknessTexture)), Promise.all(n);
  }
}
class Ia {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = [];
    t.sheenColor = new Ee(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const o = i.extensions[this.name];
    if (o.sheenColorFactor !== void 0) {
      const r = o.sheenColorFactor;
      t.sheenColor.setRGB(r[0], r[1], r[2], le);
    }
    return o.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = o.sheenRoughnessFactor), o.sheenColorTexture !== void 0 && n.push(s.assignTexture(t, "sheenColorMap", o.sheenColorTexture, Ce)), o.sheenRoughnessTexture !== void 0 && n.push(s.assignTexture(t, "sheenRoughnessMap", o.sheenRoughnessTexture)), Promise.all(n);
  }
}
class Ba {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = [], o = i.extensions[this.name];
    return o.transmissionFactor !== void 0 && (t.transmission = o.transmissionFactor), o.transmissionTexture !== void 0 && n.push(s.assignTexture(t, "transmissionMap", o.transmissionTexture)), Promise.all(n);
  }
}
class wa {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = [], o = i.extensions[this.name];
    t.thickness = o.thicknessFactor !== void 0 ? o.thicknessFactor : 0, o.thicknessTexture !== void 0 && n.push(s.assignTexture(t, "thicknessMap", o.thicknessTexture)), t.attenuationDistance = o.attenuationDistance || 1 / 0;
    const r = o.attenuationColor || [1, 1, 1];
    return t.attenuationColor = new Ee().setRGB(r[0], r[1], r[2], le), Promise.all(n);
  }
}
class Sa {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const i = this.parser.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = i.extensions[this.name];
    return t.ior = n.ior !== void 0 ? n.ior : 1.5, Promise.resolve();
  }
}
class va {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = [], o = i.extensions[this.name];
    t.specularIntensity = o.specularFactor !== void 0 ? o.specularFactor : 1, o.specularTexture !== void 0 && n.push(s.assignTexture(t, "specularIntensityMap", o.specularTexture));
    const r = o.specularColorFactor || [1, 1, 1];
    return t.specularColor = new Ee().setRGB(r[0], r[1], r[2], le), o.specularColorTexture !== void 0 && n.push(s.assignTexture(t, "specularColorMap", o.specularColorTexture, Ce)), Promise.all(n);
  }
}
class Ma {
  constructor(e) {
    this.parser = e, this.name = D.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = [], o = i.extensions[this.name];
    return t.bumpScale = o.bumpFactor !== void 0 ? o.bumpFactor : 1, o.bumpTexture !== void 0 && n.push(s.assignTexture(t, "bumpMap", o.bumpTexture)), Promise.all(n);
  }
}
class xa {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = [], o = i.extensions[this.name];
    return o.anisotropyStrength !== void 0 && (t.anisotropy = o.anisotropyStrength), o.anisotropyRotation !== void 0 && (t.anisotropyRotation = o.anisotropyRotation), o.anisotropyTexture !== void 0 && n.push(s.assignTexture(t, "anisotropyMap", o.anisotropyTexture)), Promise.all(n);
  }
}
class Qa {
  constructor(e) {
    this.parser = e, this.name = D.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser, s = t.json, i = s.textures[e];
    if (!i.extensions || !i.extensions[this.name])
      return null;
    const n = i.extensions[this.name], o = t.options.ktx2Loader;
    if (!o) {
      if (s.extensionsRequired && s.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, n.source, o);
  }
}
class Ta {
  constructor(e) {
    this.parser = e, this.name = D.EXT_TEXTURE_WEBP;
  }
  loadTexture(e) {
    const t = this.name, s = this.parser, i = s.json, n = i.textures[e];
    if (!n.extensions || !n.extensions[t])
      return null;
    const o = n.extensions[t], r = i.images[o.source];
    let l = s.textureLoader;
    if (r.uri) {
      const c = s.options.manager.getHandler(r.uri);
      c !== null && (l = c);
    }
    return s.loadTextureImage(e, o.source, l);
  }
}
class Ra {
  constructor(e) {
    this.parser = e, this.name = D.EXT_TEXTURE_AVIF;
  }
  loadTexture(e) {
    const t = this.name, s = this.parser, i = s.json, n = i.textures[e];
    if (!n.extensions || !n.extensions[t])
      return null;
    const o = n.extensions[t], r = i.images[o.source];
    let l = s.textureLoader;
    if (r.uri) {
      const c = s.options.manager.getHandler(r.uri);
      c !== null && (l = c);
    }
    return s.loadTextureImage(e, o.source, l);
  }
}
class Da {
  constructor(e) {
    this.name = D.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const t = this.parser.json, s = t.bufferViews[e];
    if (s.extensions && s.extensions[this.name]) {
      const i = s.extensions[this.name], n = this.parser.getDependency("buffer", i.buffer), o = this.parser.options.meshoptDecoder;
      if (!o || !o.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return n.then(function(r) {
        const l = i.byteOffset || 0, c = i.byteLength || 0, A = i.count, h = i.byteStride, d = new Uint8Array(r, l, c);
        return o.decodeGltfBufferAsync ? o.decodeGltfBufferAsync(A, h, d, i.mode, i.filter).then(function(u) {
          return u.buffer;
        }) : o.ready.then(function() {
          const u = new ArrayBuffer(A * h);
          return o.decodeGltfBuffer(new Uint8Array(u), A, h, d, i.mode, i.filter), u;
        });
      });
    } else
      return null;
  }
}
class La {
  constructor(e) {
    this.name = D.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, s = t.nodes[e];
    if (!s.extensions || !s.extensions[this.name] || s.mesh === void 0)
      return null;
    const i = t.meshes[s.mesh];
    for (const c of i.primitives)
      if (c.mode !== ie.TRIANGLES && c.mode !== ie.TRIANGLE_STRIP && c.mode !== ie.TRIANGLE_FAN && c.mode !== void 0)
        return null;
    const o = s.extensions[this.name].attributes, r = [], l = {};
    for (const c in o)
      r.push(this.parser.getDependency("accessor", o[c]).then((A) => (l[c] = A, l[c])));
    return r.length < 1 ? null : (r.push(this.parser.createNodeMesh(e)), Promise.all(r).then((c) => {
      const A = c.pop(), h = A.isGroup ? A.children : [A], d = c[0].count, u = [];
      for (const g of h) {
        const p = new P(), b = new v(), E = new $e(), C = new v(1, 1, 1), y = new li(g.geometry, g.material, d);
        for (let f = 0; f < d; f++)
          l.TRANSLATION && b.fromBufferAttribute(l.TRANSLATION, f), l.ROTATION && E.fromBufferAttribute(l.ROTATION, f), l.SCALE && C.fromBufferAttribute(l.SCALE, f), y.setMatrixAt(f, p.compose(b, E, C));
        for (const f in l)
          if (f === "_COLOR_0") {
            const I = l[f];
            y.instanceColor = new lr(I.array, I.itemSize, I.normalized);
          } else f !== "TRANSLATION" && f !== "ROTATION" && f !== "SCALE" && g.geometry.setAttribute(f, l[f]);
        ns.prototype.copy.call(y, g), this.parser.assignFinalMaterial(y), u.push(y);
      }
      return A.isGroup ? (A.clear(), A.add(...u), A) : u[0];
    }));
  }
}
const eo = "glTF", rt = 12, Li = { JSON: 1313821514, BIN: 5130562 };
class Fa {
  constructor(e) {
    this.name = D.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, rt), s = new TextDecoder();
    if (this.header = {
      magic: s.decode(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== eo)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const i = this.header.length - rt, n = new DataView(e, rt);
    let o = 0;
    for (; o < i; ) {
      const r = n.getUint32(o, !0);
      o += 4;
      const l = n.getUint32(o, !0);
      if (o += 4, l === Li.JSON) {
        const c = new Uint8Array(e, rt + o, r);
        this.content = s.decode(c);
      } else if (l === Li.BIN) {
        const c = rt + o;
        this.body = e.slice(c, c + r);
      }
      o += r;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class ka {
  constructor(e, t) {
    if (!t)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = D.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const s = this.json, i = this.dracoLoader, n = e.extensions[this.name].bufferView, o = e.extensions[this.name].attributes, r = {}, l = {}, c = {};
    for (const A in o) {
      const h = Zs[A] || A.toLowerCase();
      r[h] = o[A];
    }
    for (const A in e.attributes) {
      const h = Zs[A] || A.toLowerCase();
      if (o[A] !== void 0) {
        const d = s.accessors[e.attributes[A]], u = Ze[d.componentType];
        c[h] = u.name, l[h] = d.normalized === !0;
      }
    }
    return t.getDependency("bufferView", n).then(function(A) {
      return new Promise(function(h, d) {
        i.decodeDracoFile(A, function(u) {
          for (const g in u.attributes) {
            const p = u.attributes[g], b = l[g];
            b !== void 0 && (p.normalized = b);
          }
          h(u);
        }, r, c, le, d);
      });
    });
  }
}
class _a {
  constructor() {
    this.name = D.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}
class Pa {
  constructor() {
    this.name = D.KHR_MESH_QUANTIZATION;
  }
}
class to extends Tr {
  constructor(e, t, s, i) {
    super(e, t, s, i);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, s = this.sampleValues, i = this.valueSize, n = e * i * 3 + i;
    for (let o = 0; o !== i; o++)
      t[o] = s[n + o];
    return t;
  }
  interpolate_(e, t, s, i) {
    const n = this.resultBuffer, o = this.sampleValues, r = this.valueSize, l = r * 2, c = r * 3, A = i - t, h = (s - t) / A, d = h * h, u = d * h, g = e * c, p = g - c, b = -2 * u + 3 * d, E = u - d, C = 1 - b, y = E - d + h;
    for (let f = 0; f !== r; f++) {
      const I = o[p + f + r], w = o[p + f + l] * A, B = o[g + f + r], M = o[g + f] * A;
      n[f] = C * I + y * w + b * B + E * M;
    }
    return n;
  }
}
const Ga = new $e();
class Ua extends to {
  interpolate_(e, t, s, i) {
    const n = super.interpolate_(e, t, s, i);
    return Ga.fromArray(n).normalize().toArray(n), n;
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
}, Ze = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, Fi = {
  9728: Un,
  9729: Ge,
  9984: gr,
  9985: ur,
  9986: dr,
  9987: os
}, ki = {
  33071: fr,
  33648: pr,
  10497: js
}, fs = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, Zs = {
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
}, Na = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: Hn,
  STEP: xr
}, ms = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Va(a) {
  return a.DefaultMaterial === void 0 && (a.DefaultMaterial = new ci({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: Qr
  })), a.DefaultMaterial;
}
function Re(a, e, t) {
  for (const s in t.extensions)
    a[s] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[s] = t.extensions[s]);
}
function be(a, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(a.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function Oa(a, e, t) {
  let s = !1, i = !1, n = !1;
  for (let c = 0, A = e.length; c < A; c++) {
    const h = e[c];
    if (h.POSITION !== void 0 && (s = !0), h.NORMAL !== void 0 && (i = !0), h.COLOR_0 !== void 0 && (n = !0), s && i && n) break;
  }
  if (!s && !i && !n) return Promise.resolve(a);
  const o = [], r = [], l = [];
  for (let c = 0, A = e.length; c < A; c++) {
    const h = e[c];
    if (s) {
      const d = h.POSITION !== void 0 ? t.getDependency("accessor", h.POSITION) : a.attributes.position;
      o.push(d);
    }
    if (i) {
      const d = h.NORMAL !== void 0 ? t.getDependency("accessor", h.NORMAL) : a.attributes.normal;
      r.push(d);
    }
    if (n) {
      const d = h.COLOR_0 !== void 0 ? t.getDependency("accessor", h.COLOR_0) : a.attributes.color;
      l.push(d);
    }
  }
  return Promise.all([
    Promise.all(o),
    Promise.all(r),
    Promise.all(l)
  ]).then(function(c) {
    const A = c[0], h = c[1], d = c[2];
    return s && (a.morphAttributes.position = A), i && (a.morphAttributes.normal = h), n && (a.morphAttributes.color = d), a.morphTargetsRelative = !0, a;
  });
}
function Ha(a, e) {
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
function qa(a) {
  let e;
  const t = a.extensions && a.extensions[D.KHR_DRACO_MESH_COMPRESSION];
  if (t ? e = "draco:" + t.bufferView + ":" + t.indices + ":" + bs(t.attributes) : e = a.indices + ":" + bs(a.attributes) + ":" + a.mode, a.targets !== void 0)
    for (let s = 0, i = a.targets.length; s < i; s++)
      e += ":" + bs(a.targets[s]);
  return e;
}
function bs(a) {
  let e = "";
  const t = Object.keys(a).sort();
  for (let s = 0, i = t.length; s < i; s++)
    e += t[s] + ":" + a[t[s]] + ";";
  return e;
}
function $s(a) {
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
function za(a) {
  return a.search(/\.jpe?g($|\?)/i) > 0 || a.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : a.search(/\.webp($|\?)/i) > 0 || a.search(/^data\:image\/webp/) === 0 ? "image/webp" : a.search(/\.ktx2($|\?)/i) > 0 || a.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png";
}
const ja = new P();
class Ka {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new pa(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let s = !1, i = -1, n = !1, o = -1;
    if (typeof navigator < "u") {
      const r = navigator.userAgent;
      s = /^((?!chrome|android).)*safari/i.test(r) === !0;
      const l = r.match(/Version\/(\d+)/);
      i = s && l ? parseInt(l[1], 10) : -1, n = r.indexOf("Firefox") > -1, o = n ? r.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || s && i < 17 || n && o < 98 ? this.textureLoader = new cr(this.options.manager) : this.textureLoader = new Ar(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new xe(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    const s = this, i = this.json, n = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(o) {
      return o._markDefs && o._markDefs();
    }), Promise.all(this._invokeAll(function(o) {
      return o.beforeRoot && o.beforeRoot();
    })).then(function() {
      return Promise.all([
        s.getDependencies("scene"),
        s.getDependencies("animation"),
        s.getDependencies("camera")
      ]);
    }).then(function(o) {
      const r = {
        scene: o[0][i.scene || 0],
        scenes: o[0],
        animations: o[1],
        cameras: o[2],
        asset: i.asset,
        parser: s,
        userData: {}
      };
      return Re(n, r, i), be(r, i), Promise.all(s._invokeAll(function(l) {
        return l.afterRoot && l.afterRoot(r);
      })).then(function() {
        for (const l of r.scenes)
          l.updateMatrixWorld();
        e(r);
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
    for (let i = 0, n = t.length; i < n; i++) {
      const o = t[i].joints;
      for (let r = 0, l = o.length; r < l; r++)
        e[o[r]].isBone = !0;
    }
    for (let i = 0, n = e.length; i < n; i++) {
      const o = e[i];
      o.mesh !== void 0 && (this._addNodeRef(this.meshCache, o.mesh), o.skin !== void 0 && (s[o.mesh].isSkinnedMesh = !0)), o.camera !== void 0 && this._addNodeRef(this.cameraCache, o.camera);
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
    const i = s.clone(), n = (o, r) => {
      const l = this.associations.get(o);
      l != null && this.associations.set(r, l);
      for (const [c, A] of o.children.entries())
        n(A, r.children[c]);
    };
    return n(s, i), i.name += "_instance_" + e.uses[t]++, i;
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
      const n = e(t[i]);
      n && s.push(n);
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
          i = this._invokeOne(function(n) {
            return n.loadNode && n.loadNode(t);
          });
          break;
        case "mesh":
          i = this._invokeOne(function(n) {
            return n.loadMesh && n.loadMesh(t);
          });
          break;
        case "accessor":
          i = this.loadAccessor(t);
          break;
        case "bufferView":
          i = this._invokeOne(function(n) {
            return n.loadBufferView && n.loadBufferView(t);
          });
          break;
        case "buffer":
          i = this.loadBuffer(t);
          break;
        case "material":
          i = this._invokeOne(function(n) {
            return n.loadMaterial && n.loadMaterial(t);
          });
          break;
        case "texture":
          i = this._invokeOne(function(n) {
            return n.loadTexture && n.loadTexture(t);
          });
          break;
        case "skin":
          i = this.loadSkin(t);
          break;
        case "animation":
          i = this._invokeOne(function(n) {
            return n.loadAnimation && n.loadAnimation(t);
          });
          break;
        case "camera":
          i = this.loadCamera(t);
          break;
        default:
          if (i = this._invokeOne(function(n) {
            return n != this && n.getDependency && n.getDependency(e, t);
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
      t = Promise.all(i.map(function(n, o) {
        return s.getDependency(e, o);
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
      return Promise.resolve(this.extensions[D.KHR_BINARY_GLTF].body);
    const i = this.options;
    return new Promise(function(n, o) {
      s.load(mt.resolveURL(t.uri, i.path), n, void 0, function() {
        o(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
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
      const i = t.byteLength || 0, n = t.byteOffset || 0;
      return s.slice(n, n + i);
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
      const o = fs[i.type], r = Ze[i.componentType], l = i.normalized === !0, c = new r(i.count * o);
      return Promise.resolve(new ne(c, o, l));
    }
    const n = [];
    return i.bufferView !== void 0 ? n.push(this.getDependency("bufferView", i.bufferView)) : n.push(null), i.sparse !== void 0 && (n.push(this.getDependency("bufferView", i.sparse.indices.bufferView)), n.push(this.getDependency("bufferView", i.sparse.values.bufferView))), Promise.all(n).then(function(o) {
      const r = o[0], l = fs[i.type], c = Ze[i.componentType], A = c.BYTES_PER_ELEMENT, h = A * l, d = i.byteOffset || 0, u = i.bufferView !== void 0 ? s.bufferViews[i.bufferView].byteStride : void 0, g = i.normalized === !0;
      let p, b;
      if (u && u !== h) {
        const E = Math.floor(d / u), C = "InterleavedBuffer:" + i.bufferView + ":" + i.componentType + ":" + E + ":" + i.count;
        let y = t.cache.get(C);
        y || (p = new c(r, E * u, i.count * u / A), y = new hr(p, u / A), t.cache.add(C, y)), b = new Fe(y, l, d % u / A, g);
      } else
        r === null ? p = new c(i.count * l) : p = new c(r, d, i.count * l), b = new ne(p, l, g);
      if (i.sparse !== void 0) {
        const E = fs.SCALAR, C = Ze[i.sparse.indices.componentType], y = i.sparse.indices.byteOffset || 0, f = i.sparse.values.byteOffset || 0, I = new C(o[1], y, i.sparse.count * E), w = new c(o[2], f, i.sparse.count * l);
        r !== null && (b = new ne(b.array.slice(), b.itemSize, b.normalized)), b.normalized = !1;
        for (let B = 0, M = I.length; B < M; B++) {
          const S = I[B];
          if (b.setX(S, w[B * l]), l >= 2 && b.setY(S, w[B * l + 1]), l >= 3 && b.setZ(S, w[B * l + 2]), l >= 4 && b.setW(S, w[B * l + 3]), l >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        b.normalized = g;
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
    const t = this.json, s = this.options, n = t.textures[e].source, o = t.images[n];
    let r = this.textureLoader;
    if (o.uri) {
      const l = s.manager.getHandler(o.uri);
      l !== null && (r = l);
    }
    return this.loadTextureImage(e, n, r);
  }
  loadTextureImage(e, t, s) {
    const i = this, n = this.json, o = n.textures[e], r = n.images[t], l = (r.uri || r.bufferView) + ":" + o.sampler;
    if (this.textureCache[l])
      return this.textureCache[l];
    const c = this.loadImageSource(t, s).then(function(A) {
      A.flipY = !1, A.name = o.name || r.name || "", A.name === "" && typeof r.uri == "string" && r.uri.startsWith("data:image/") === !1 && (A.name = r.uri);
      const d = (n.samplers || {})[o.sampler] || {};
      return A.magFilter = Fi[d.magFilter] || Ge, A.minFilter = Fi[d.minFilter] || os, A.wrapS = ki[d.wrapS] || js, A.wrapT = ki[d.wrapT] || js, A.generateMipmaps = !A.isCompressedTexture && A.minFilter !== Un && A.minFilter !== Ge, i.associations.set(A, { textures: e }), A;
    }).catch(function() {
      return null;
    });
    return this.textureCache[l] = c, c;
  }
  loadImageSource(e, t) {
    const s = this, i = this.json, n = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((h) => h.clone());
    const o = i.images[e], r = self.URL || self.webkitURL;
    let l = o.uri || "", c = !1;
    if (o.bufferView !== void 0)
      l = s.getDependency("bufferView", o.bufferView).then(function(h) {
        c = !0;
        const d = new Blob([h], { type: o.mimeType });
        return l = r.createObjectURL(d), l;
      });
    else if (o.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const A = Promise.resolve(l).then(function(h) {
      return new Promise(function(d, u) {
        let g = d;
        t.isImageBitmapLoader === !0 && (g = function(p) {
          const b = new yi(p);
          b.needsUpdate = !0, d(b);
        }), t.load(mt.resolveURL(h, n.path), g, void 0, u);
      });
    }).then(function(h) {
      return c === !0 && r.revokeObjectURL(l), be(h, o), h.userData.mimeType = o.mimeType || za(o.uri), h;
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
    const n = this;
    return this.getDependency("texture", s.index).then(function(o) {
      if (!o) return null;
      if (s.texCoord !== void 0 && s.texCoord > 0 && (o = o.clone(), o.channel = s.texCoord), n.extensions[D.KHR_TEXTURE_TRANSFORM]) {
        const r = s.extensions !== void 0 ? s.extensions[D.KHR_TEXTURE_TRANSFORM] : void 0;
        if (r) {
          const l = n.associations.get(o);
          o = n.extensions[D.KHR_TEXTURE_TRANSFORM].extendTexture(o, r), n.associations.set(o, l);
        }
      }
      return i !== void 0 && (o.colorSpace = i), e[t] = o, o;
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
    const i = t.attributes.tangent === void 0, n = t.attributes.color !== void 0, o = t.attributes.normal === void 0;
    if (e.isPoints) {
      const r = "PointsMaterial:" + s.uuid;
      let l = this.cache.get(r);
      l || (l = new Nn(), gs.prototype.copy.call(l, s), l.color.copy(s.color), l.map = s.map, l.sizeAttenuation = !1, this.cache.add(r, l)), s = l;
    } else if (e.isLine) {
      const r = "LineBasicMaterial:" + s.uuid;
      let l = this.cache.get(r);
      l || (l = new mr(), gs.prototype.copy.call(l, s), l.color.copy(s.color), l.map = s.map, this.cache.add(r, l)), s = l;
    }
    if (i || n || o) {
      let r = "ClonedMaterial:" + s.uuid + ":";
      i && (r += "derivative-tangents:"), n && (r += "vertex-colors:"), o && (r += "flat-shading:");
      let l = this.cache.get(r);
      l || (l = s.clone(), n && (l.vertexColors = !0), o && (l.flatShading = !0), i && (l.normalScale && (l.normalScale.y *= -1), l.clearcoatNormalScale && (l.clearcoatNormalScale.y *= -1)), this.cache.add(r, l), this.associations.set(l, this.associations.get(s))), s = l;
    }
    e.material = s;
  }
  getMaterialType() {
    return ci;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   *
   * @private
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(e) {
    const t = this, s = this.json, i = this.extensions, n = s.materials[e];
    let o;
    const r = {}, l = n.extensions || {}, c = [];
    if (l[D.KHR_MATERIALS_UNLIT]) {
      const h = i[D.KHR_MATERIALS_UNLIT];
      o = h.getMaterialType(), c.push(h.extendParams(r, n, t));
    } else {
      const h = n.pbrMetallicRoughness || {};
      if (r.color = new Ee(1, 1, 1), r.opacity = 1, Array.isArray(h.baseColorFactor)) {
        const d = h.baseColorFactor;
        r.color.setRGB(d[0], d[1], d[2], le), r.opacity = d[3];
      }
      h.baseColorTexture !== void 0 && c.push(t.assignTexture(r, "map", h.baseColorTexture, Ce)), r.metalness = h.metallicFactor !== void 0 ? h.metallicFactor : 1, r.roughness = h.roughnessFactor !== void 0 ? h.roughnessFactor : 1, h.metallicRoughnessTexture !== void 0 && (c.push(t.assignTexture(r, "metalnessMap", h.metallicRoughnessTexture)), c.push(t.assignTexture(r, "roughnessMap", h.metallicRoughnessTexture))), o = this._invokeOne(function(d) {
        return d.getMaterialType && d.getMaterialType(e);
      }), c.push(Promise.all(this._invokeAll(function(d) {
        return d.extendMaterialParams && d.extendMaterialParams(e, r);
      })));
    }
    n.doubleSided === !0 && (r.side = br);
    const A = n.alphaMode || ms.OPAQUE;
    if (A === ms.BLEND ? (r.transparent = !0, r.depthWrite = !1) : (r.transparent = !1, A === ms.MASK && (r.alphaTest = n.alphaCutoff !== void 0 ? n.alphaCutoff : 0.5)), n.normalTexture !== void 0 && o !== ke && (c.push(t.assignTexture(r, "normalMap", n.normalTexture)), r.normalScale = new k(1, 1), n.normalTexture.scale !== void 0)) {
      const h = n.normalTexture.scale;
      r.normalScale.set(h, h);
    }
    if (n.occlusionTexture !== void 0 && o !== ke && (c.push(t.assignTexture(r, "aoMap", n.occlusionTexture)), n.occlusionTexture.strength !== void 0 && (r.aoMapIntensity = n.occlusionTexture.strength)), n.emissiveFactor !== void 0 && o !== ke) {
      const h = n.emissiveFactor;
      r.emissive = new Ee().setRGB(h[0], h[1], h[2], le);
    }
    return n.emissiveTexture !== void 0 && o !== ke && c.push(t.assignTexture(r, "emissiveMap", n.emissiveTexture, Ce)), Promise.all(c).then(function() {
      const h = new o(r);
      return n.name && (h.name = n.name), be(h, n), t.associations.set(h, { materials: e }), n.extensions && Re(i, h, n), h;
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
    const t = Cr.sanitizeNodeName(e || "");
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
    function n(r) {
      return s[D.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(r, t).then(function(l) {
        return _i(l, r, t);
      });
    }
    const o = [];
    for (let r = 0, l = e.length; r < l; r++) {
      const c = e[r], A = qa(c), h = i[A];
      if (h)
        o.push(h.promise);
      else {
        let d;
        c.extensions && c.extensions[D.KHR_DRACO_MESH_COMPRESSION] ? d = n(c) : d = _i(new rs(), c, t), i[A] = { primitive: c, promise: d }, o.push(d);
      }
    }
    return Promise.all(o);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   *
   * @private
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh|Line|Points>}
   */
  loadMesh(e) {
    const t = this, s = this.json, i = this.extensions, n = s.meshes[e], o = n.primitives, r = [];
    for (let l = 0, c = o.length; l < c; l++) {
      const A = o[l].material === void 0 ? Va(this.cache) : this.getDependency("material", o[l].material);
      r.push(A);
    }
    return r.push(t.loadGeometries(o)), Promise.all(r).then(function(l) {
      const c = l.slice(0, l.length - 1), A = l[l.length - 1], h = [];
      for (let u = 0, g = A.length; u < g; u++) {
        const p = A[u], b = o[u];
        let E;
        const C = c[u];
        if (b.mode === ie.TRIANGLES || b.mode === ie.TRIANGLE_STRIP || b.mode === ie.TRIANGLE_FAN || b.mode === void 0)
          E = n.isSkinnedMesh === !0 ? new Er(p, C) : new as(p, C), E.isSkinnedMesh === !0 && E.normalizeSkinWeights(), b.mode === ie.TRIANGLE_STRIP ? E.geometry = Di(E.geometry, Gn) : b.mode === ie.TRIANGLE_FAN && (E.geometry = Di(E.geometry, zs));
        else if (b.mode === ie.LINES)
          E = new yr(p, C);
        else if (b.mode === ie.LINE_STRIP)
          E = new Ir(p, C);
        else if (b.mode === ie.LINE_LOOP)
          E = new Br(p, C);
        else if (b.mode === ie.POINTS)
          E = new Vn(p, C);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + b.mode);
        Object.keys(E.geometry.morphAttributes).length > 0 && Ha(E, n), E.name = t.createUniqueName(n.name || "mesh_" + e), be(E, n), b.extensions && Re(i, E, b), t.assignFinalMaterial(E), h.push(E);
      }
      for (let u = 0, g = h.length; u < g; u++)
        t.associations.set(h[u], {
          meshes: e,
          primitives: u
        });
      if (h.length === 1)
        return n.extensions && Re(i, h[0], n), h[0];
      const d = new Xe();
      n.extensions && Re(i, d, n), t.associations.set(d, { meshes: e });
      for (let u = 0, g = h.length; u < g; u++)
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
    return s.type === "perspective" ? t = new wr(st.radToDeg(i.yfov), i.aspectRatio || 1, i.znear || 1, i.zfar || 2e6) : s.type === "orthographic" && (t = new On(-i.xmag, i.xmag, i.ymag, -i.ymag, i.znear, i.zfar)), s.name && (t.name = this.createUniqueName(s.name)), be(t, s), Promise.resolve(t);
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
    for (let i = 0, n = t.joints.length; i < n; i++)
      s.push(this._loadNodeShallow(t.joints[i]));
    return t.inverseBindMatrices !== void 0 ? s.push(this.getDependency("accessor", t.inverseBindMatrices)) : s.push(null), Promise.all(s).then(function(i) {
      const n = i.pop(), o = i, r = [], l = [];
      for (let c = 0, A = o.length; c < A; c++) {
        const h = o[c];
        if (h) {
          r.push(h);
          const d = new P();
          n !== null && d.fromArray(n.array, c * 16), l.push(d);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[c]);
      }
      return new Sr(r, l);
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
    const t = this.json, s = this, i = t.animations[e], n = i.name ? i.name : "animation_" + e, o = [], r = [], l = [], c = [], A = [];
    for (let h = 0, d = i.channels.length; h < d; h++) {
      const u = i.channels[h], g = i.samplers[u.sampler], p = u.target, b = p.node, E = i.parameters !== void 0 ? i.parameters[g.input] : g.input, C = i.parameters !== void 0 ? i.parameters[g.output] : g.output;
      p.node !== void 0 && (o.push(this.getDependency("node", b)), r.push(this.getDependency("accessor", E)), l.push(this.getDependency("accessor", C)), c.push(g), A.push(p));
    }
    return Promise.all([
      Promise.all(o),
      Promise.all(r),
      Promise.all(l),
      Promise.all(c),
      Promise.all(A)
    ]).then(function(h) {
      const d = h[0], u = h[1], g = h[2], p = h[3], b = h[4], E = [];
      for (let C = 0, y = d.length; C < y; C++) {
        const f = d[C], I = u[C], w = g[C], B = p[C], M = b[C];
        if (f === void 0) continue;
        f.updateMatrix && f.updateMatrix();
        const S = s._createAnimationTracks(f, I, w, B, M);
        if (S)
          for (let x = 0; x < S.length; x++)
            E.push(S[x]);
      }
      return new vr(n, void 0, E);
    });
  }
  createNodeMesh(e) {
    const t = this.json, s = this, i = t.nodes[e];
    return i.mesh === void 0 ? null : s.getDependency("mesh", i.mesh).then(function(n) {
      const o = s._getNodeRef(s.meshCache, i.mesh, n);
      return i.weights !== void 0 && o.traverse(function(r) {
        if (r.isMesh)
          for (let l = 0, c = i.weights.length; l < c; l++)
            r.morphTargetInfluences[l] = i.weights[l];
      }), o;
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
    const t = this.json, s = this, i = t.nodes[e], n = s._loadNodeShallow(e), o = [], r = i.children || [];
    for (let c = 0, A = r.length; c < A; c++)
      o.push(s.getDependency("node", r[c]));
    const l = i.skin === void 0 ? Promise.resolve(null) : s.getDependency("skin", i.skin);
    return Promise.all([
      n,
      Promise.all(o),
      l
    ]).then(function(c) {
      const A = c[0], h = c[1], d = c[2];
      d !== null && A.traverse(function(u) {
        u.isSkinnedMesh && u.bind(d, ja);
      });
      for (let u = 0, g = h.length; u < g; u++)
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
    const n = t.nodes[e], o = n.name ? i.createUniqueName(n.name) : "", r = [], l = i._invokeOne(function(c) {
      return c.createNodeMesh && c.createNodeMesh(e);
    });
    return l && r.push(l), n.camera !== void 0 && r.push(i.getDependency("camera", n.camera).then(function(c) {
      return i._getNodeRef(i.cameraCache, n.camera, c);
    })), i._invokeAll(function(c) {
      return c.createNodeAttachment && c.createNodeAttachment(e);
    }).forEach(function(c) {
      r.push(c);
    }), this.nodeCache[e] = Promise.all(r).then(function(c) {
      let A;
      if (n.isBone === !0 ? A = new Mr() : c.length > 1 ? A = new Xe() : c.length === 1 ? A = c[0] : A = new ns(), A !== c[0])
        for (let h = 0, d = c.length; h < d; h++)
          A.add(c[h]);
      if (n.name && (A.userData.name = n.name, A.name = o), be(A, n), n.extensions && Re(s, A, n), n.matrix !== void 0) {
        const h = new P();
        h.fromArray(n.matrix), A.applyMatrix4(h);
      } else
        n.translation !== void 0 && A.position.fromArray(n.translation), n.rotation !== void 0 && A.quaternion.fromArray(n.rotation), n.scale !== void 0 && A.scale.fromArray(n.scale);
      if (!i.associations.has(A))
        i.associations.set(A, {});
      else if (n.mesh !== void 0 && i.meshCache.refs[n.mesh] > 1) {
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
    const t = this.extensions, s = this.json.scenes[e], i = this, n = new Xe();
    s.name && (n.name = i.createUniqueName(s.name)), be(n, s), s.extensions && Re(t, n, s);
    const o = s.nodes || [], r = [];
    for (let l = 0, c = o.length; l < c; l++)
      r.push(i.getDependency("node", o[l]));
    return Promise.all(r).then(function(l) {
      for (let A = 0, h = l.length; A < h; A++)
        n.add(l[A]);
      const c = (A) => {
        const h = /* @__PURE__ */ new Map();
        for (const [d, u] of i.associations)
          (d instanceof gs || d instanceof yi) && h.set(d, u);
        return A.traverse((d) => {
          const u = i.associations.get(d);
          u != null && h.set(d, u);
        }), h;
      };
      return i.associations = c(n), n;
    });
  }
  _createAnimationTracks(e, t, s, i, n) {
    const o = [], r = e.name ? e.name : e.uuid, l = [];
    Ie[n.path] === Ie.weights ? e.traverse(function(d) {
      d.morphTargetInfluences && l.push(d.name ? d.name : d.uuid);
    }) : l.push(r);
    let c;
    switch (Ie[n.path]) {
      case Ie.weights:
        c = Bi;
        break;
      case Ie.rotation:
        c = wi;
        break;
      case Ie.translation:
      case Ie.scale:
        c = Ii;
        break;
      default:
        switch (s.itemSize) {
          case 1:
            c = Bi;
            break;
          case 2:
          case 3:
          default:
            c = Ii;
            break;
        }
        break;
    }
    const A = i.interpolation !== void 0 ? Na[i.interpolation] : Hn, h = this._getArrayFromAccessor(s);
    for (let d = 0, u = l.length; d < u; d++) {
      const g = new c(
        l[d] + "." + Ie[n.path],
        t.array,
        h,
        A
      );
      i.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(g), o.push(g);
    }
    return o;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const s = $s(t.constructor), i = new Float32Array(t.length);
      for (let n = 0, o = t.length; n < o; n++)
        i[n] = t[n] * s;
      t = i;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(s) {
      const i = this instanceof wi ? Ua : to;
      return new i(this.times, this.values, this.getValueSize() / 3, s);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function Ya(a, e, t) {
  const s = e.attributes, i = new it();
  if (s.POSITION !== void 0) {
    const r = t.json.accessors[s.POSITION], l = r.min, c = r.max;
    if (l !== void 0 && c !== void 0) {
      if (i.set(
        new v(l[0], l[1], l[2]),
        new v(c[0], c[1], c[2])
      ), r.normalized) {
        const A = $s(Ze[r.componentType]);
        i.min.multiplyScalar(A), i.max.multiplyScalar(A);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const n = e.targets;
  if (n !== void 0) {
    const r = new v(), l = new v();
    for (let c = 0, A = n.length; c < A; c++) {
      const h = n[c];
      if (h.POSITION !== void 0) {
        const d = t.json.accessors[h.POSITION], u = d.min, g = d.max;
        if (u !== void 0 && g !== void 0) {
          if (l.setX(Math.max(Math.abs(u[0]), Math.abs(g[0]))), l.setY(Math.max(Math.abs(u[1]), Math.abs(g[1]))), l.setZ(Math.max(Math.abs(u[2]), Math.abs(g[2]))), d.normalized) {
            const p = $s(Ze[d.componentType]);
            l.multiplyScalar(p);
          }
          r.max(l);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    i.expandByVector(r);
  }
  a.boundingBox = i;
  const o = new Et();
  i.getCenter(o.center), o.radius = i.min.distanceTo(i.max) / 2, a.boundingSphere = o;
}
function _i(a, e, t) {
  const s = e.attributes, i = [];
  function n(o, r) {
    return t.getDependency("accessor", o).then(function(l) {
      a.setAttribute(r, l);
    });
  }
  for (const o in s) {
    const r = Zs[o] || o.toLowerCase();
    r in a.attributes || i.push(n(s[o], r));
  }
  if (e.indices !== void 0 && !a.index) {
    const o = t.getDependency("accessor", e.indices).then(function(r) {
      a.setIndex(r);
    });
    i.push(o);
  }
  return Ks.workingColorSpace !== le && "COLOR_0" in s && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ks.workingColorSpace}" not supported.`), be(a, e), Ya(a, e, t), Promise.all(i).then(function() {
    return e.targets !== void 0 ? Oa(a, e.targets, t) : a;
  });
}
const Cs = /* @__PURE__ */ new WeakMap();
class so extends ai {
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
    const n = new xe(this.manager);
    n.setPath(this.path), n.setResponseType("arraybuffer"), n.setRequestHeader(this.requestHeader), n.setWithCredentials(this.withCredentials), n.load(e, (o) => {
      this.parse(o, t, i);
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
  decodeDracoFile(e, t, s, i, n = le, o = () => {
  }) {
    const r = {
      attributeIDs: s || this.defaultAttributeIDs,
      attributeTypes: i || this.defaultAttributeTypes,
      useUniqueIDs: !!s,
      vertexColorSpace: n
    };
    return this.decodeGeometry(e, r).then(t).catch(o);
  }
  decodeGeometry(e, t) {
    const s = JSON.stringify(t);
    if (Cs.has(e)) {
      const l = Cs.get(e);
      if (l.key === s)
        return l.promise;
      if (e.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let i;
    const n = this.workerNextTaskID++, o = e.byteLength, r = this._getWorker(n, o).then((l) => (i = l, new Promise((c, A) => {
      i._callbacks[n] = { resolve: c, reject: A }, i.postMessage({ type: "decode", id: n, taskConfig: t, buffer: e }, [e]);
    }))).then((l) => this._createGeometry(l.geometry));
    return r.catch(() => !0).then(() => {
      i && n && this._releaseTask(i, n);
    }), Cs.set(e, {
      key: s,
      promise: r
    }), r;
  }
  _createGeometry(e) {
    const t = new rs();
    e.index && t.setIndex(new ne(e.index.array, 1));
    for (let s = 0; s < e.attributes.length; s++) {
      const i = e.attributes[s], n = i.name, o = i.array, r = i.itemSize, l = new ne(o, r);
      n === "color" && (this._assignVertexColorSpace(l, i.vertexColorSpace), l.normalized = !(o instanceof Float32Array)), t.setAttribute(n, l);
    }
    return t;
  }
  _assignVertexColorSpace(e, t) {
    if (t !== Ce) return;
    const s = new Ee();
    for (let i = 0, n = e.count; i < n; i++)
      s.fromBufferAttribute(e, i), Ks.colorSpaceToWorking(s, Ce), e.setXYZ(i, s.r, s.g, s.b);
  }
  _loadLibrary(e, t) {
    const s = new xe(this.manager);
    return s.setPath(this.decoderPath), s.setResponseType(t), s.setWithCredentials(this.withCredentials), new Promise((i, n) => {
      s.load(e, i, void 0, n);
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
      const n = Ja.toString(), o = [
        "/* draco decoder */",
        i,
        "",
        "/* worker */",
        n.substring(n.indexOf("{") + 1, n.lastIndexOf("}"))
      ].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([o]));
    }), this.decoderPending;
  }
  _getWorker(e, t) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const i = new Worker(this.workerSourceURL);
        i._callbacks = {}, i._taskCosts = {}, i._taskLoad = 0, i.postMessage({ type: "init", decoderConfig: this.decoderConfig }), i.onmessage = function(n) {
          const o = n.data;
          switch (o.type) {
            case "decode":
              i._callbacks[o.id].resolve(o);
              break;
            case "error":
              i._callbacks[o.id].reject(o);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + o.type + '"');
          }
        }, this.workerPool.push(i);
      } else
        this.workerPool.sort(function(i, n) {
          return i._taskLoad > n._taskLoad ? -1 : 1;
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
function Ja() {
  let a, e;
  onmessage = function(o) {
    const r = o.data;
    switch (r.type) {
      case "init":
        a = r.decoderConfig, e = new Promise(function(A) {
          a.onModuleLoaded = function(h) {
            A({ draco: h });
          }, DracoDecoderModule(a);
        });
        break;
      case "decode":
        const l = r.buffer, c = r.taskConfig;
        e.then((A) => {
          const h = A.draco, d = new h.Decoder();
          try {
            const u = t(h, d, new Int8Array(l), c), g = u.attributes.map((p) => p.array.buffer);
            u.index && g.push(u.index.array.buffer), self.postMessage({ type: "decode", id: r.id, geometry: u }, g);
          } catch (u) {
            console.error(u), self.postMessage({ type: "error", id: r.id, error: u.message });
          } finally {
            h.destroy(d);
          }
        });
        break;
    }
  };
  function t(o, r, l, c) {
    const A = c.attributeIDs, h = c.attributeTypes;
    let d, u;
    const g = r.GetEncodedGeometryType(l);
    if (g === o.TRIANGULAR_MESH)
      d = new o.Mesh(), u = r.DecodeArrayToMesh(l, l.byteLength, d);
    else if (g === o.POINT_CLOUD)
      d = new o.PointCloud(), u = r.DecodeArrayToPointCloud(l, l.byteLength, d);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!u.ok() || d.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + u.error_msg());
    const p = { index: null, attributes: [] };
    for (const b in A) {
      const E = self[h[b]];
      let C, y;
      if (c.useUniqueIDs)
        y = A[b], C = r.GetAttributeByUniqueId(d, y);
      else {
        if (y = r.GetAttributeId(d, o[A[b]]), y === -1) continue;
        C = r.GetAttribute(d, y);
      }
      const f = i(o, r, d, b, E, C);
      b === "color" && (f.vertexColorSpace = c.vertexColorSpace), p.attributes.push(f);
    }
    return g === o.TRIANGULAR_MESH && (p.index = s(o, r, d)), o.destroy(d), p;
  }
  function s(o, r, l) {
    const A = l.num_faces() * 3, h = A * 4, d = o._malloc(h);
    r.GetTrianglesUInt32Array(l, h, d);
    const u = new Uint32Array(o.HEAPF32.buffer, d, A).slice();
    return o._free(d), { array: u, itemSize: 1 };
  }
  function i(o, r, l, c, A, h) {
    const d = h.num_components(), g = l.num_points() * d, p = g * A.BYTES_PER_ELEMENT, b = n(o, A), E = o._malloc(p);
    r.GetAttributeDataArrayForAllPoints(l, h, b, p, E);
    const C = new A(o.HEAPF32.buffer, E, g).slice();
    return o._free(E), {
      name: c,
      array: C,
      itemSize: d
    };
  }
  function n(o, r) {
    switch (r) {
      case Float32Array:
        return o.DT_FLOAT32;
      case Int8Array:
        return o.DT_INT8;
      case Int16Array:
        return o.DT_INT16;
      case Int32Array:
        return o.DT_INT32;
      case Uint8Array:
        return o.DT_UINT8;
      case Uint16Array:
        return o.DT_UINT16;
      case Uint32Array:
        return o.DT_UINT32;
    }
  }
}
class Wa {
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
      const { resolve: i, msg: n, transfer: o } = this.queue.shift();
      this.workersResolve[e] = i, this.workers[e].postMessage(n, o);
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
const Xa = 0, Pi = 2, Za = 1, Gi = 2, $a = 0, el = 1, tl = 10, sl = 0, io = 9, no = 15, oo = 16, ro = 22, ao = 37, lo = 43, co = 76, Ao = 83, ho = 97, uo = 100, go = 103, po = 109, il = 131, nl = 132, ol = 133, rl = 134, al = 137, ll = 138, cl = 141, Al = 142, hl = 145, dl = 146, fo = 148, mo = 152, ul = 157, gl = 158, bo = 165, Co = 166, hi = 1000066e3;
class pl {
  constructor() {
    this.vkFormat = 0, this.typeSize = 1, this.pixelWidth = 0, this.pixelHeight = 0, this.pixelDepth = 0, this.layerCount = 0, this.faceCount = 1, this.supercompressionScheme = 0, this.levels = [], this.dataFormatDescriptor = [{ vendorId: 0, descriptorType: 0, descriptorBlockSize: 0, versionNumber: 2, colorModel: 0, colorPrimaries: 1, transferFunction: 2, flags: 0, texelBlockDimension: [0, 0, 0, 0], bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0], samples: [] }], this.keyValue = {}, this.globalData = null;
  }
}
class at {
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
}
const K = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function Ui(a) {
  return new TextDecoder().decode(a);
}
function fl(a) {
  const e = new Uint8Array(a.buffer, a.byteOffset, K.length);
  if (e[0] !== K[0] || e[1] !== K[1] || e[2] !== K[2] || e[3] !== K[3] || e[4] !== K[4] || e[5] !== K[5] || e[6] !== K[6] || e[7] !== K[7] || e[8] !== K[8] || e[9] !== K[9] || e[10] !== K[10] || e[11] !== K[11]) throw new Error("Missing KTX 2.0 identifier.");
  const t = new pl(), s = 17 * Uint32Array.BYTES_PER_ELEMENT, i = new at(a, K.length, s, !0);
  t.vkFormat = i._nextUint32(), t.typeSize = i._nextUint32(), t.pixelWidth = i._nextUint32(), t.pixelHeight = i._nextUint32(), t.pixelDepth = i._nextUint32(), t.layerCount = i._nextUint32(), t.faceCount = i._nextUint32();
  const n = i._nextUint32();
  t.supercompressionScheme = i._nextUint32();
  const o = i._nextUint32(), r = i._nextUint32(), l = i._nextUint32(), c = i._nextUint32(), A = i._nextUint64(), h = i._nextUint64(), d = new at(a, K.length + s, 3 * n * 8, !0);
  for (let F = 0; F < n; F++) t.levels.push({ levelData: new Uint8Array(a.buffer, a.byteOffset + d._nextUint64(), d._nextUint64()), uncompressedByteLength: d._nextUint64() });
  const u = new at(a, o, r, !0), g = { vendorId: u._skip(4)._nextUint16(), descriptorType: u._nextUint16(), versionNumber: u._nextUint16(), descriptorBlockSize: u._nextUint16(), colorModel: u._nextUint8(), colorPrimaries: u._nextUint8(), transferFunction: u._nextUint8(), flags: u._nextUint8(), texelBlockDimension: [u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8()], bytesPlane: [u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8()], samples: [] }, p = (g.descriptorBlockSize / 4 - 6) / 4;
  for (let F = 0; F < p; F++) {
    const j = { bitOffset: u._nextUint16(), bitLength: u._nextUint8(), channelType: u._nextUint8(), samplePosition: [u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8()], sampleLower: -1 / 0, sampleUpper: 1 / 0 };
    64 & j.channelType ? (j.sampleLower = u._nextInt32(), j.sampleUpper = u._nextInt32()) : (j.sampleLower = u._nextUint32(), j.sampleUpper = u._nextUint32()), g.samples[F] = j;
  }
  t.dataFormatDescriptor.length = 0, t.dataFormatDescriptor.push(g);
  const b = new at(a, l, c, !0);
  for (; b._offset < c; ) {
    const F = b._nextUint32(), j = b._scan(F), ye = Ui(j);
    if (t.keyValue[ye] = b._nextUint8Array(F - j.byteLength - 1), ye.match(/^ktx/i)) {
      const ot = Ui(t.keyValue[ye]);
      t.keyValue[ye] = ot.substring(0, ot.lastIndexOf("\0"));
    }
    b._skip(F % 4 ? 4 - F % 4 : 0);
  }
  if (h <= 0) return t;
  const E = new at(a, A, h, !0), C = E._nextUint16(), y = E._nextUint16(), f = E._nextUint32(), I = E._nextUint32(), w = E._nextUint32(), B = E._nextUint32(), M = [];
  for (let F = 0; F < n; F++) M.push({ imageFlags: E._nextUint32(), rgbSliceByteOffset: E._nextUint32(), rgbSliceByteLength: E._nextUint32(), alphaSliceByteOffset: E._nextUint32(), alphaSliceByteLength: E._nextUint32() });
  const S = A + E._offset, x = S + f, R = x + I, L = R + w, q = new Uint8Array(a.buffer, a.byteOffset + S, f), Q = new Uint8Array(a.buffer, a.byteOffset + x, I), te = new Uint8Array(a.buffer, a.byteOffset + R, w), z = new Uint8Array(a.buffer, a.byteOffset + L, B);
  return t.globalData = { endpointCount: C, selectorCount: y, imageDescs: M, endpointsData: q, selectorsData: Q, tablesData: te, extendedData: z }, t;
}
let Es, me, ei;
const ys = { env: { emscripten_notify_memory_growth: function(a) {
  ei = new Uint8Array(me.exports.memory.buffer);
} } };
let ml = class {
  init() {
    return Es || (Es = typeof fetch < "u" ? fetch("data:application/wasm;base64," + Ni).then((e) => e.arrayBuffer()).then((e) => WebAssembly.instantiate(e, ys)).then(this._init) : WebAssembly.instantiate(Buffer.from(Ni, "base64"), ys).then(this._init), Es);
  }
  _init(e) {
    me = e.instance, ys.env.emscripten_notify_memory_growth(0);
  }
  decode(e, t = 0) {
    if (!me) throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const s = e.byteLength, i = me.exports.malloc(s);
    ei.set(e, i), t = t || Number(me.exports.ZSTD_findDecompressedSize(i, s));
    const n = me.exports.malloc(t), o = me.exports.ZSTD_decompress(n, t, i, s), r = ei.slice(n, n + o);
    return me.exports.free(i), me.exports.free(n), r;
  }
};
const Ni = "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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEEdCAAbiECCyAAQQh2IgEgAkEYbCIAQYwIaigCAGwgAEGICGooAgBqIgJBA3YgAmogAEGACGooAgAgAEGECGooAgAgAWxqSQs3ACAAIAMgBCAFQYAQEDMiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQMgVBuH8LC78DAQN/IwBBIGsiBSQAIAVBCGogAiADEAYiAhADRQRAIAAgAWoiB0F9aiEGIAUgBBAOIARBBGohAiAFLQACIQMDQEEAIAAgBkkgBUEIahAEGwRAIAAgAiAFQQhqIAMQAkECdGoiBC8BADsAACAFQQhqIAQtAAIQASAAIAQtAANqIgQgAiAFQQhqIAMQAkECdGoiAC8BADsAACAFQQhqIAAtAAIQASAEIAAtAANqIQAMAQUgB0F+aiEEA0AgBUEIahAEIAAgBEtyRQRAIAAgAiAFQQhqIAMQAkECdGoiBi8BADsAACAFQQhqIAYtAAIQASAAIAYtAANqIQAMAQsLA0AgACAES0UEQCAAIAIgBUEIaiADEAJBAnRqIgYvAQA7AAAgBUEIaiAGLQACEAEgACAGLQADaiEADAELCwJAIAAgB08NACAAIAIgBUEIaiADEAIiA0ECdGoiAC0AADoAACAALQADQQFGBEAgBUEIaiAALQACEAEMAQsgBSgCDEEfSw0AIAVBCGogAiADQQJ0ai0AAhABIAUoAgxBIUkNACAFQSA2AgwLIAFBbCAFQQhqEAobIQILCwsgBUEgaiQAIAILkgIBBH8jAEFAaiIJJAAgCSADQTQQCyEDAkAgBEECSA0AIAMgBEECdGooAgAhCSADQTxqIAgQIyADQQE6AD8gAyACOgA+QQAhBCADKAI8IQoDQCAEIAlGDQEgACAEQQJ0aiAKNgEAIARBAWohBAwAAAsAC0EAIQkDQCAGIAlGRQRAIAMgBSAJQQF0aiIKLQABIgtBAnRqIgwoAgAhBCADQTxqIAotAABBCHQgCGpB//8DcRAjIANBAjoAPyADIAcgC2siCiACajoAPiAEQQEgASAKa3RqIQogAygCPCELA0AgACAEQQJ0aiALNgEAIARBAWoiBCAKSQ0ACyAMIAo2AgAgCUEBaiEJDAELCyADQUBrJAALowIBCX8jAEHQAGsiCSQAIAlBEGogBUE0EAsaIAcgBmshDyAHIAFrIRADQAJAIAMgCkcEQEEBIAEgByACIApBAXRqIgYtAAEiDGsiCGsiC3QhDSAGLQAAIQ4gCUEQaiAMQQJ0aiIMKAIAIQYgCyAPTwRAIAAgBkECdGogCyAIIAUgCEE0bGogCCAQaiIIQQEgCEEBShsiCCACIAQgCEECdGooAgAiCEEBdGogAyAIayAHIA4QYyAGIA1qIQgMAgsgCUEMaiAOECMgCUEBOgAPIAkgCDoADiAGIA1qIQggCSgCDCELA0AgBiAITw0CIAAgBkECdGogCzYBACAGQQFqIQYMAAALAAsgCUHQAGokAA8LIAwgCDYCACAKQQFqIQoMAAALAAs0ACAAIAMgBCAFEDYiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQNAVBuH8LCyMAIAA/AEEQdGtB//8DakEQdkAAQX9GBEBBAA8LQQAQAEEBCzsBAX8gAgRAA0AgACABIAJBgCAgAkGAIEkbIgMQCyEAIAFBgCBqIQEgAEGAIGohACACIANrIgINAAsLCwYAIAAQAwsLqBUJAEGICAsNAQAAAAEAAAACAAAAAgBBoAgLswYBAAAAAQAAAAIAAAACAAAAJgAAAIIAAAAhBQAASgAAAGcIAAAmAAAAwAEAAIAAAABJBQAASgAAAL4IAAApAAAALAIAAIAAAABJBQAASgAAAL4IAAAvAAAAygIAAIAAAACKBQAASgAAAIQJAAA1AAAAcwMAAIAAAACdBQAASgAAAKAJAAA9AAAAgQMAAIAAAADrBQAASwAAAD4KAABEAAAAngMAAIAAAABNBgAASwAAAKoKAABLAAAAswMAAIAAAADBBgAATQAAAB8NAABNAAAAUwQAAIAAAAAjCAAAUQAAAKYPAABUAAAAmQQAAIAAAABLCQAAVwAAALESAABYAAAA2gQAAIAAAABvCQAAXQAAACMUAABUAAAARQUAAIAAAABUCgAAagAAAIwUAABqAAAArwUAAIAAAAB2CQAAfAAAAE4QAAB8AAAA0gIAAIAAAABjBwAAkQAAAJAHAACSAAAAAAAAAAEAAAABAAAABQAAAA0AAAAdAAAAPQAAAH0AAAD9AAAA/QEAAP0DAAD9BwAA/Q8AAP0fAAD9PwAA/X8AAP3/AAD9/wEA/f8DAP3/BwD9/w8A/f8fAP3/PwD9/38A/f//AP3//wH9//8D/f//B/3//w/9//8f/f//P/3//38AAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAeAAAAHwAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAAwAAAANAAAADgAAAA8AAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAIwAAACUAAAAnAAAAKQAAACsAAAAvAAAAMwAAADsAAABDAAAAUwAAAGMAAACDAAAAAwEAAAMCAAADBAAAAwgAAAMQAAADIAAAA0AAAAOAAAADAAEAQeAPC1EBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAEAAAABQAAAAcAAAAIAAAACQAAAAoAAAALAAAADAAAAA0AAAAOAAAADwAAABAAQcQQC4sBAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABIAAAAUAAAAFgAAABgAAAAcAAAAIAAAACgAAAAwAAAAQAAAAIAAAAAAAQAAAAIAAAAEAAAACAAAABAAAAAgAAAAQAAAAIAAAAAAAQBBkBIL5gQBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAAAEAAAAEAAAACAAAAAAAAAABAAEBBgAAAAAAAAQAAAAAEAAABAAAAAAgAAAFAQAAAAAAAAUDAAAAAAAABQQAAAAAAAAFBgAAAAAAAAUHAAAAAAAABQkAAAAAAAAFCgAAAAAAAAUMAAAAAAAABg4AAAAAAAEFEAAAAAAAAQUUAAAAAAABBRYAAAAAAAIFHAAAAAAAAwUgAAAAAAAEBTAAAAAgAAYFQAAAAAAABwWAAAAAAAAIBgABAAAAAAoGAAQAAAAADAYAEAAAIAAABAAAAAAAAAAEAQAAAAAAAAUCAAAAIAAABQQAAAAAAAAFBQAAACAAAAUHAAAAAAAABQgAAAAgAAAFCgAAAAAAAAULAAAAAAAABg0AAAAgAAEFEAAAAAAAAQUSAAAAIAABBRYAAAAAAAIFGAAAACAAAwUgAAAAAAADBSgAAAAAAAYEQAAAABAABgRAAAAAIAAHBYAAAAAAAAkGAAIAAAAACwYACAAAMAAABAAAAAAQAAAEAQAAACAAAAUCAAAAIAAABQMAAAAgAAAFBQAAACAAAAUGAAAAIAAABQgAAAAgAAAFCQAAACAAAAULAAAAIAAABQwAAAAAAAAGDwAAACAAAQUSAAAAIAABBRQAAAAgAAIFGAAAACAAAgUcAAAAIAADBSgAAAAgAAQFMAAAAAAAEAYAAAEAAAAPBgCAAAAAAA4GAEAAAAAADQYAIABBgBcLhwIBAAEBBQAAAAAAAAUAAAAAAAAGBD0AAAAAAAkF/QEAAAAADwX9fwAAAAAVBf3/HwAAAAMFBQAAAAAABwR9AAAAAAAMBf0PAAAAABIF/f8DAAAAFwX9/38AAAAFBR0AAAAAAAgE/QAAAAAADgX9PwAAAAAUBf3/DwAAAAIFAQAAABAABwR9AAAAAAALBf0HAAAAABEF/f8BAAAAFgX9/z8AAAAEBQ0AAAAQAAgE/QAAAAAADQX9HwAAAAATBf3/BwAAAAEFAQAAABAABgQ9AAAAAAAKBf0DAAAAABAF/f8AAAAAHAX9//8PAAAbBf3//wcAABoF/f//AwAAGQX9//8BAAAYBf3//wBBkBkLhgQBAAEBBgAAAAAAAAYDAAAAAAAABAQAAAAgAAAFBQAAAAAAAAUGAAAAAAAABQgAAAAAAAAFCQAAAAAAAAULAAAAAAAABg0AAAAAAAAGEAAAAAAAAAYTAAAAAAAABhYAAAAAAAAGGQAAAAAAAAYcAAAAAAAABh8AAAAAAAAGIgAAAAAAAQYlAAAAAAABBikAAAAAAAIGLwAAAAAAAwY7AAAAAAAEBlMAAAAAAAcGgwAAAAAACQYDAgAAEAAABAQAAAAAAAAEBQAAACAAAAUGAAAAAAAABQcAAAAgAAAFCQAAAAAAAAUKAAAAAAAABgwAAAAAAAAGDwAAAAAAAAYSAAAAAAAABhUAAAAAAAAGGAAAAAAAAAYbAAAAAAAABh4AAAAAAAAGIQAAAAAAAQYjAAAAAAABBicAAAAAAAIGKwAAAAAAAwYzAAAAAAAEBkMAAAAAAAUGYwAAAAAACAYDAQAAIAAABAQAAAAwAAAEBAAAABAAAAQFAAAAIAAABQcAAAAgAAAFCAAAACAAAAUKAAAAIAAABQsAAAAAAAAGDgAAAAAAAAYRAAAAAAAABhQAAAAAAAAGFwAAAAAAAAYaAAAAAAAABh0AAAAAAAAGIAAAAAAAEAYDAAEAAAAPBgOAAAAAAA4GA0AAAAAADQYDIAAAAAAMBgMQAAAAAAsGAwgAAAAACgYDBABBpB0L2QEBAAAAAwAAAAcAAAAPAAAAHwAAAD8AAAB/AAAA/wAAAP8BAAD/AwAA/wcAAP8PAAD/HwAA/z8AAP9/AAD//wAA//8BAP//AwD//wcA//8PAP//HwD//z8A//9/AP///wD///8B////A////wf///8P////H////z////9/AAAAAAEAAAACAAAABAAAAAAAAAACAAAABAAAAAgAAAAAAAAAAQAAAAIAAAABAAAABAAAAAQAAAAEAAAABAAAAAgAAAAIAAAACAAAAAcAAAAIAAAACQAAAAoAAAALAEGgIAsDwBBQ", bl = "display-p3", Cl = "display-p3-linear", Is = /* @__PURE__ */ new WeakMap();
let Bs = 0, ws;
class ee extends ai {
  /**
   * Constructs a new KTX2 loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e), this.transcoderPath = "", this.transcoderBinary = null, this.transcoderPending = null, this.workerPool = new Wa(), this.workerSourceURL = "", this.workerConfig = null, typeof MSC_TRANSCODER < "u" && console.warn(
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
      const e = new xe(this.manager);
      e.setPath(this.transcoderPath), e.setWithCredentials(this.withCredentials);
      const t = e.loadAsync("basis_transcoder.js"), s = new xe(this.manager);
      s.setPath(this.transcoderPath), s.setResponseType("arraybuffer"), s.setWithCredentials(this.withCredentials);
      const i = s.loadAsync("basis_transcoder.wasm");
      this.transcoderPending = Promise.all([t, i]).then(([n, o]) => {
        const r = ee.BasisWorker.toString(), l = [
          "/* constants */",
          "let _EngineFormat = " + JSON.stringify(ee.EngineFormat),
          "let _EngineType = " + JSON.stringify(ee.EngineType),
          "let _TranscoderFormat = " + JSON.stringify(ee.TranscoderFormat),
          "let _BasisFormat = " + JSON.stringify(ee.BasisFormat),
          "/* basis_transcoder.js */",
          n,
          "/* worker */",
          r.substring(r.indexOf("{") + 1, r.lastIndexOf("}"))
        ].join(`
`);
        this.workerSourceURL = URL.createObjectURL(new Blob([l])), this.transcoderBinary = o, this.workerPool.setWorkerCreator(() => {
          const c = new Worker(this.workerSourceURL), A = this.transcoderBinary.slice(0);
          return c.postMessage({ type: "init", config: this.workerConfig, transcoderBinary: A }, [A]), c;
        });
      }), Bs > 0 && console.warn(
        "THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."
      ), Bs++;
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
    const n = new xe(this.manager);
    n.setPath(this.path), n.setCrossOrigin(this.crossOrigin), n.setWithCredentials(this.withCredentials), n.setResponseType("arraybuffer"), n.load(e, (o) => {
      this.parse(o, t, i);
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
    if (Is.has(e))
      return Is.get(e).promise.then(t).catch(s);
    this._createTexture(e).then((i) => t ? t(i) : null).catch(s);
  }
  _createTextureFrom(e, t) {
    const { type: s, error: i, data: { faces: n, width: o, height: r, format: l, type: c, dfdFlags: A } } = e;
    if (s === "error") return Promise.reject(i);
    let h;
    if (t.faceCount === 6)
      h = new Rr(n, l, c);
    else {
      const d = n[0].mipmaps;
      h = t.layerCount > 1 ? new Dr(d, o, r, t.layerCount, l, c) : new qn(d, o, r, l, c);
    }
    return h.minFilter = n[0].mipmaps.length === 1 ? Ge : os, h.magFilter = Ge, h.generateMipmaps = !1, h.needsUpdate = !0, h.colorSpace = Eo(t), h.premultiplyAlpha = !!(A & Za), h;
  }
  /**
   * @private
   * @param {ArrayBuffer} buffer
   * @param {?Object} config
   * @return {Promise<CompressedTexture|CompressedArrayTexture|DataTexture|Data3DTexture>}
   */
  async _createTexture(e, t = {}) {
    const s = fl(new Uint8Array(e)), i = s.vkFormat === hi && s.dataFormatDescriptor[0].colorModel === 167;
    if (!(s.vkFormat === sl || i && !this.workerConfig.astcHDRSupported))
      return yl(s);
    const o = t, r = this.init().then(() => this.workerPool.postMessage({ type: "transcode", buffer: e, taskConfig: o }, [e])).then((l) => this._createTextureFrom(l.data, s));
    return Is.set(e, { promise: r }), r;
  }
  /**
   * Frees internal resources. This method should be called
   * when the loader is no longer required.
   */
  dispose() {
    this.workerPool.dispose(), this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL), Bs--;
  }
}
ee.BasisFormat = {
  ETC1S: 0,
  UASTC: 1,
  UASTC_HDR: 2
};
ee.TranscoderFormat = {
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
ee.EngineFormat = {
  RGBAFormat: Ye,
  RGBA_ASTC_4x4_Format: jt,
  RGB_BPTC_UNSIGNED_Format: Pr,
  RGBA_BPTC_Format: Ys,
  RGBA_ETC2_EAC_Format: zn,
  RGBA_PVRTC_4BPPV1_Format: _r,
  RGBA_S3TC_DXT5_Format: Js,
  RGB_ETC1_Format: kr,
  RGB_ETC2_Format: jn,
  RGB_PVRTC_4BPPV1_Format: Fr,
  RGBA_S3TC_DXT1_Format: Ws
};
ee.EngineType = {
  UnsignedByteType: re,
  HalfFloatType: Je,
  FloatType: bt
};
ee.BasisWorker = function() {
  let a, e, t;
  const s = _EngineFormat, i = _EngineType, n = _TranscoderFormat, o = _BasisFormat;
  self.addEventListener("message", function(g) {
    const p = g.data;
    switch (p.type) {
      case "init":
        a = p.config, r(p.transcoderBinary);
        break;
      case "transcode":
        e.then(() => {
          try {
            const { faces: b, buffers: E, width: C, height: y, hasAlpha: f, format: I, type: w, dfdFlags: B } = l(p.buffer);
            self.postMessage({ type: "transcode", id: p.id, data: { faces: b, width: C, height: y, hasAlpha: f, format: I, type: w, dfdFlags: B } }, E);
          } catch (b) {
            console.error(b), self.postMessage({ type: "error", id: p.id, error: b.message });
          }
        });
        break;
    }
  });
  function r(g) {
    e = new Promise((p) => {
      t = { wasmBinary: g, onRuntimeInitialized: p }, BASIS(t);
    }).then(() => {
      t.initializeBasis(), t.KTX2File === void 0 && console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.");
    });
  }
  function l(g) {
    const p = new t.KTX2File(new Uint8Array(g));
    function b() {
      p.close(), p.delete();
    }
    if (!p.isValid())
      throw b(), new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");
    let E;
    if (p.isUASTC())
      E = o.UASTC;
    else if (p.isETC1S())
      E = o.ETC1S;
    else if (p.isHDR())
      E = o.UASTC_HDR;
    else
      throw new Error("THREE.KTX2Loader: Unknown Basis encoding");
    const C = p.getWidth(), y = p.getHeight(), f = p.getLayers() || 1, I = p.getLevels(), w = p.getFaces(), B = p.getHasAlpha(), M = p.getDFDFlags(), { transcoderFormat: S, engineFormat: x, engineType: R } = h(E, C, y, B);
    if (!C || !y || !I)
      throw b(), new Error("THREE.KTX2Loader:	Invalid texture");
    if (!p.startTranscoding())
      throw b(), new Error("THREE.KTX2Loader: .startTranscoding failed");
    const L = [], q = [];
    for (let Q = 0; Q < w; Q++) {
      const te = [];
      for (let z = 0; z < I; z++) {
        const F = [];
        let j, ye;
        for (let Ve = 0; Ve < f; Ve++) {
          const Oe = p.getImageLevelInfo(z, Ve, Q);
          Q === 0 && z === 0 && Ve === 0 && (Oe.origWidth % 4 !== 0 || Oe.origHeight % 4 !== 0) && console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."), I > 1 ? (j = Oe.origWidth, ye = Oe.origHeight) : (j = Oe.width, ye = Oe.height);
          let He = new Uint8Array(p.getImageTranscodedSizeInBytes(z, Ve, 0, S));
          const sr = p.transcodeImage(He, z, Ve, Q, S, 0, -1, -1);
          if (R === i.HalfFloatType && (He = new Uint16Array(He.buffer, He.byteOffset, He.byteLength / Uint16Array.BYTES_PER_ELEMENT)), !sr)
            throw b(), new Error("THREE.KTX2Loader: .transcodeImage failed.");
          F.push(He);
        }
        const ot = u(F);
        te.push({ data: ot, width: j, height: ye }), q.push(ot.buffer);
      }
      L.push({ mipmaps: te, width: C, height: y, format: x, type: R });
    }
    return b(), { faces: L, buffers: q, width: C, height: y, hasAlpha: B, dfdFlags: M, format: x, type: R };
  }
  const c = [
    {
      if: "astcSupported",
      basisFormat: [o.UASTC],
      transcoderFormat: [n.ASTC_4x4, n.ASTC_4x4],
      engineFormat: [s.RGBA_ASTC_4x4_Format, s.RGBA_ASTC_4x4_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 1 / 0,
      priorityUASTC: 1,
      needsPowerOfTwo: !1
    },
    {
      if: "bptcSupported",
      basisFormat: [o.ETC1S, o.UASTC],
      transcoderFormat: [n.BC7_M5, n.BC7_M5],
      engineFormat: [s.RGBA_BPTC_Format, s.RGBA_BPTC_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 3,
      priorityUASTC: 2,
      needsPowerOfTwo: !1
    },
    {
      if: "dxtSupported",
      basisFormat: [o.ETC1S, o.UASTC],
      transcoderFormat: [n.BC1, n.BC3],
      engineFormat: [s.RGBA_S3TC_DXT1_Format, s.RGBA_S3TC_DXT5_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 4,
      priorityUASTC: 5,
      needsPowerOfTwo: !1
    },
    {
      if: "etc2Supported",
      basisFormat: [o.ETC1S, o.UASTC],
      transcoderFormat: [n.ETC1, n.ETC2],
      engineFormat: [s.RGB_ETC2_Format, s.RGBA_ETC2_EAC_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 1,
      priorityUASTC: 3,
      needsPowerOfTwo: !1
    },
    {
      if: "etc1Supported",
      basisFormat: [o.ETC1S, o.UASTC],
      transcoderFormat: [n.ETC1],
      engineFormat: [s.RGB_ETC1_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 2,
      priorityUASTC: 4,
      needsPowerOfTwo: !1
    },
    {
      if: "pvrtcSupported",
      basisFormat: [o.ETC1S, o.UASTC],
      transcoderFormat: [n.PVRTC1_4_RGB, n.PVRTC1_4_RGBA],
      engineFormat: [s.RGB_PVRTC_4BPPV1_Format, s.RGBA_PVRTC_4BPPV1_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 5,
      priorityUASTC: 6,
      needsPowerOfTwo: !0
    },
    {
      if: "bptcSupported",
      basisFormat: [o.UASTC_HDR],
      transcoderFormat: [n.BC6H],
      engineFormat: [s.RGB_BPTC_UNSIGNED_Format],
      engineType: [i.HalfFloatType],
      priorityHDR: 1,
      needsPowerOfTwo: !1
    },
    // Uncompressed fallbacks.
    {
      basisFormat: [o.ETC1S, o.UASTC],
      transcoderFormat: [n.RGBA32, n.RGBA32],
      engineFormat: [s.RGBAFormat, s.RGBAFormat],
      engineType: [i.UnsignedByteType, i.UnsignedByteType],
      priorityETC1S: 100,
      priorityUASTC: 100,
      needsPowerOfTwo: !1
    },
    {
      basisFormat: [o.UASTC_HDR],
      transcoderFormat: [n.RGBA_HALF],
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
    [o.ETC1S]: c.filter((g) => g.basisFormat.includes(o.ETC1S)).sort((g, p) => g.priorityUASTC - p.priorityUASTC),
    [o.UASTC]: c.filter((g) => g.basisFormat.includes(o.UASTC)).sort((g, p) => g.priorityUASTC - p.priorityUASTC),
    [o.UASTC_HDR]: c.filter((g) => g.basisFormat.includes(o.UASTC_HDR)).sort((g, p) => g.priorityHDR - p.priorityHDR)
  };
  function h(g, p, b, E) {
    const C = A[g];
    for (let y = 0; y < C.length; y++) {
      const f = C[y];
      if (f.if && !a[f.if] || !f.basisFormat.includes(g) || E && f.transcoderFormat.length < 2 || f.needsPowerOfTwo && !(d(p) && d(b))) continue;
      const I = f.transcoderFormat[E ? 1 : 0], w = f.engineFormat[E ? 1 : 0], B = f.engineType[0];
      return { transcoderFormat: I, engineFormat: w, engineType: B };
    }
    throw new Error("THREE.KTX2Loader: Failed to identify transcoding target.");
  }
  function d(g) {
    return g <= 2 ? !0 : (g & g - 1) === 0 && g !== 0;
  }
  function u(g) {
    if (g.length === 1) return g[0];
    let p = 0;
    for (let C = 0; C < g.length; C++) {
      const y = g[C];
      p += y.byteLength;
    }
    const b = new Uint8Array(p);
    let E = 0;
    for (let C = 0; C < g.length; C++) {
      const y = g[C];
      b.set(y, E), E += y.byteLength;
    }
    return b;
  }
};
const El = /* @__PURE__ */ new Set([Ye, pt, gt]), Ss = {
  [po]: Ye,
  [ho]: Ye,
  [ao]: Ye,
  [lo]: Ye,
  [go]: pt,
  [Ao]: pt,
  [oo]: pt,
  [ro]: pt,
  [uo]: gt,
  [co]: gt,
  [no]: gt,
  [io]: gt,
  [fo]: jn,
  [mo]: zn,
  [hi]: jt,
  [gl]: jt,
  [ul]: jt,
  [Co]: xi,
  [bo]: xi,
  [ol]: Ws,
  [rl]: Ws,
  [il]: Mi,
  [nl]: Mi,
  [ll]: vi,
  [al]: vi,
  [Al]: Js,
  [cl]: Js,
  [dl]: Ys,
  [hl]: Ys
}, vs = {
  [po]: bt,
  [ho]: Je,
  [ao]: re,
  [lo]: re,
  [go]: bt,
  [Ao]: Je,
  [oo]: re,
  [ro]: re,
  [uo]: bt,
  [co]: Je,
  [no]: re,
  [io]: re,
  [fo]: re,
  [mo]: re,
  [hi]: Je,
  [Co]: re,
  [bo]: re
};
async function yl(a) {
  const { vkFormat: e } = a;
  if (Ss[e] === void 0)
    throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");
  let t;
  a.supercompressionScheme === Pi && (ws || (ws = new Promise(async (n) => {
    const o = new ml();
    await o.init(), n(o);
  })), t = await ws);
  const s = [];
  for (let n = 0; n < a.levels.length; n++) {
    const o = Math.max(1, a.pixelWidth >> n), r = Math.max(1, a.pixelHeight >> n), l = a.pixelDepth ? Math.max(1, a.pixelDepth >> n) : 0, c = a.levels[n];
    let A;
    if (a.supercompressionScheme === Xa)
      A = c.levelData;
    else if (a.supercompressionScheme === Pi)
      A = t.decode(c.levelData, c.uncompressedByteLength);
    else
      throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");
    let h;
    vs[e] === bt ? h = new Float32Array(
      A.buffer,
      A.byteOffset,
      A.byteLength / Float32Array.BYTES_PER_ELEMENT
    ) : vs[e] === Je ? h = new Uint16Array(
      A.buffer,
      A.byteOffset,
      A.byteLength / Uint16Array.BYTES_PER_ELEMENT
    ) : h = A, s.push({
      data: h,
      width: o,
      height: r,
      depth: l
    });
  }
  let i;
  if (El.has(Ss[e]))
    i = a.pixelDepth === 0 ? new Kn(s[0].data, a.pixelWidth, a.pixelHeight) : new Lr(s[0].data, a.pixelWidth, a.pixelHeight, a.pixelDepth);
  else {
    if (a.pixelDepth > 0) throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");
    i = new qn(s, a.pixelWidth, a.pixelHeight), i.minFilter = s.length === 1 ? Ge : os, i.magFilter = Ge;
  }
  return i.mipmaps = s, i.type = vs[e], i.format = Ss[e], i.colorSpace = Eo(a), i.needsUpdate = !0, Promise.resolve(i);
}
function Eo(a) {
  const e = a.dataFormatDescriptor[0];
  return e.colorPrimaries === el ? e.transferFunction === Gi ? Ce : le : e.colorPrimaries === tl ? e.transferFunction === Gi ? bl : Cl : e.colorPrimaries === $a ? Si : (console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${e.colorPrimaries}"`), Si);
}
var Il = function() {
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
  var i = WebAssembly.validate(t) ? r(e) : r(a), n, o = WebAssembly.instantiate(i, {}).then(function(E) {
    n = E.instance, n.exports.__wasm_call_ctors();
  });
  function r(E) {
    for (var C = new Uint8Array(E.length), y = 0; y < E.length; ++y) {
      var f = E.charCodeAt(y);
      C[y] = f > 96 ? f - 97 : f > 64 ? f - 39 : f + 4;
    }
    for (var I = 0, y = 0; y < E.length; ++y)
      C[I++] = C[y] < 60 ? s[C[y]] : (C[y] - 60) * 64 + C[++y];
    return C.buffer.slice(0, I);
  }
  function l(E, C, y, f, I, w, B) {
    var M = E.exports.sbrk, S = f + 3 & -4, x = M(S * I), R = M(w.length), L = new Uint8Array(E.exports.memory.buffer);
    L.set(w, R);
    var q = C(x, f, I, R, w.length);
    if (q == 0 && B && B(x, S, I), y.set(L.subarray(x, x + f * I)), M(x - M(0)), q != 0)
      throw new Error("Malformed buffer data: " + q);
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
  function u(E) {
    var C = {
      object: new Worker(E),
      pending: 0,
      requests: {}
    };
    return C.object.onmessage = function(y) {
      var f = y.data;
      C.pending -= f.count, C.requests[f.id][f.action](f.value), delete C.requests[f.id];
    }, C;
  }
  function g(E) {
    for (var C = "self.ready = WebAssembly.instantiate(new Uint8Array([" + new Uint8Array(i) + "]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = " + b.name + ";" + l.toString() + b.toString(), y = new Blob([C], { type: "text/javascript" }), f = URL.createObjectURL(y), I = h.length; I < E; ++I)
      h[I] = u(f);
    for (var I = E; I < h.length; ++I)
      h[I].object.postMessage({});
    h.length = E, URL.revokeObjectURL(f);
  }
  function p(E, C, y, f, I) {
    for (var w = h[0], B = 1; B < h.length; ++B)
      h[B].pending < w.pending && (w = h[B]);
    return new Promise(function(M, S) {
      var x = new Uint8Array(y), R = ++d;
      w.pending += E, w.requests[R] = { resolve: M, reject: S }, w.object.postMessage({ id: R, count: E, size: C, source: x, mode: f, filter: I }, [x.buffer]);
    });
  }
  function b(E) {
    var C = E.data;
    if (!C.id)
      return self.close();
    self.ready.then(function(y) {
      try {
        var f = new Uint8Array(C.count * C.size);
        l(y, y.exports[C.mode], f, C.count, C.size, C.source, y.exports[C.filter]), self.postMessage({ id: C.id, count: C.count, action: "resolve", value: f }, [f.buffer]);
      } catch (I) {
        self.postMessage({ id: C.id, count: C.count, action: "reject", value: I });
      }
    });
  }
  return {
    ready: o,
    supported: !0,
    useWorkers: function(E) {
      g(E);
    },
    decodeVertexBuffer: function(E, C, y, f, I) {
      l(n, n.exports.meshopt_decodeVertexBuffer, E, C, y, f, n.exports[c[I]]);
    },
    decodeIndexBuffer: function(E, C, y, f) {
      l(n, n.exports.meshopt_decodeIndexBuffer, E, C, y, f);
    },
    decodeIndexSequence: function(E, C, y, f) {
      l(n, n.exports.meshopt_decodeIndexSequence, E, C, y, f);
    },
    decodeGltfBuffer: function(E, C, y, f, I, w) {
      l(n, n.exports[A[I]], E, C, y, f, n.exports[c[w]]);
    },
    decodeGltfBufferAsync: function(E, C, y, f, I) {
      return h.length > 0 ? p(E, C, y, A[f], c[I]) : o.then(function() {
        var w = new Uint8Array(E * C);
        return l(n, n.exports[A[f]], w, E, C, y, n.exports[c[I]]), w;
      });
    }
  };
}();
function Bl(a) {
  if (!a) return;
  (Array.isArray(a) ? a : [a]).forEach((t) => {
    t && (Object.keys(t).forEach((s) => {
      const i = t[s];
      i && i.isTexture && i.dispose();
    }), typeof t.dispose == "function" && t.dispose());
  });
}
function Ms(a) {
  !a || !a.traverse || a.traverse((e) => {
    e.geometry && e.geometry.dispose(), e.material && Bl(e.material);
  });
}
function wl() {
  m.Cache && typeof m.Cache.clear == "function" && m.Cache.clear();
}
class $ {
  constructor(e = null) {
    this.renderer = e, this.isIOSWebKit = $.isIOSWebKit(), this.platformKey = $.getPlatformKey(), this.loader = new Ne(), this.dracoLoader = new so(), this.ktx2Loader = null, this.loadQueue = Promise.resolve(), this.activeIOSLoad = !1, this.dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"), this.isIOSWebKit && typeof this.dracoLoader.setWorkerLimit == "function" && this.dracoLoader.setWorkerLimit(1), this.loader.setDRACOLoader(this.dracoLoader), this.loader.setMeshoptDecoder(Il), this.loader.register((t) => ({
      name: "KHR_materials_pbrSpecularGlossiness",
      extendMaterialParams: async (s, i) => {
        const n = t.json.materials[s];
        if (!n.extensions || !n.extensions.KHR_materials_pbrSpecularGlossiness)
          return Promise.resolve();
        const o = n.extensions.KHR_materials_pbrSpecularGlossiness;
        return o.diffuseTexture !== void 0 && (i.map = await t.getDependency("texture", o.diffuseTexture.index)), o.diffuseFactor !== void 0 && (i.color = new m.Color().fromArray(o.diffuseFactor)), o.glossinessFactor !== void 0 && (i.roughness = 1 - o.glossinessFactor), i.metalness = 0, Promise.resolve();
      }
    })), this.cache = /* @__PURE__ */ new Map(), this.ktx2SetupComplete = !1, this.setupKTX2Loader();
  }
  setupKTX2Loader() {
    const e = this.platformKey;
    try {
      if (!$.sharedKTX2Loaders.has(e)) {
        const t = new ee();
        t.setTranscoderPath("https://cdn.jsdelivr.net/npm/three@0.177.0/examples/jsm/libs/basis/"), this.isIOSWebKit && typeof t.setWorkerLimit == "function" && t.setWorkerLimit(1), $.sharedKTX2Loaders.set(e, t), $.sharedKTX2SetupComplete.set(e, !1);
      }
      this.ktx2Loader = $.sharedKTX2Loaders.get(e), this.loader.setKTX2Loader(this.ktx2Loader), this.ktx2SetupComplete = $.sharedKTX2SetupComplete.get(e) || !1, this.renderer && !this.ktx2SetupComplete && this.ensureKTX2Support();
    } catch (t) {
      console.warn("KTX2 loader setup failed, falling back to standard textures:", t), this.ktx2Loader = null;
    }
  }
  ensureKTX2Support() {
    if (!this.ktx2Loader || !this.renderer)
      return;
    const e = this.platformKey;
    if ($.sharedKTX2SetupComplete.get(e)) {
      this.ktx2SetupComplete = !0;
      return;
    }
    try {
      this.ktx2Loader.detectSupport(this.renderer), $.sharedKTX2SetupComplete.set(e, !0), this.ktx2SetupComplete = !0;
    } catch (t) {
      console.warn("Failed to set up KTX2 loader with renderer:", t);
    }
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
    const n = () => this.performLoad(e, t, s, i);
    if (!this.isIOSWebKit)
      return n();
    const o = this.loadQueue.then(() => (this.activeIOSLoad && typeof i == "function" && i("freeing-resources"), n()));
    return this.loadQueue = o.catch(() => {
    }), o;
  }
  performLoad(e, t = null, s = null, i = null) {
    return new Promise((n, o) => {
      let r = null;
      const l = () => {
        s && r && (s.removeEventListener("abort", r), r = null);
      }, c = () => {
        l(), this.isIOSWebKit && (this.activeIOSLoad = !1), o(new Error("Loading cancelled"));
      };
      if (s && (r = c, s.addEventListener("abort", r), s.aborted)) {
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
          i && i("finalizing"), this.releaseParserCaches(A), l(), this.isIOSWebKit && (this.activeIOSLoad = !1), n(h);
        },
        (A) => {
          s && s.aborted || t && t(A);
        },
        (A) => {
          l(), this.isIOSWebKit && (this.activeIOSLoad = !1), o(A);
        }
      );
    });
  }
  processModel(e) {
    const t = e.scene, s = this.getMaxAnisotropy();
    t.traverse((n) => {
      if (n.isLight && (n.visible = !1), n.isMesh && n.material) {
        n.castShadow = !0, n.receiveShadow = !0;
        const o = Array.isArray(n.material) ? n.material : [n.material];
        o.forEach((r, l) => {
          if (r.emissive && r.emissive.setHex(0), r.emissiveIntensity !== void 0 && (r.emissiveIntensity = 0), r.emissiveMap && (r.emissiveMap = null), r.lightMap && (r.lightMap = null), r.lightMapIntensity !== void 0 && (r.lightMapIntensity = 0), r.type === "MeshBasicMaterial" || r.type === "MeshPhongMaterial") {
            const A = new m.MeshStandardMaterial({
              // Only include common, safe params; set specialized textures conditionally below
              color: r.color || new m.Color(16777215),
              side: r.side !== void 0 ? r.side : m.FrontSide,
              wireframe: r.wireframe || !1,
              vertexColors: r.vertexColors || !1,
              fog: r.fog !== void 0 ? r.fog : !0,
              flatShading: !1,
              // Realistic shipwreck appearance
              roughness: 0.8,
              // Weathered, corroded metal/wood
              metalness: 0.3
              // Mix of metal and non-metal
            });
            r.map && (A.map = r.map), r.alphaMap && (A.alphaMap = r.alphaMap), r.aoMap && (A.aoMap = r.aoMap), typeof r.aoMapIntensity == "number" && (A.aoMapIntensity = r.aoMapIntensity), r.envMap && (A.envMap = r.envMap), r.roughnessMap && (A.roughnessMap = r.roughnessMap), r.metalnessMap && (A.metalnessMap = r.metalnessMap), r.transparent !== void 0 && (A.transparent = r.transparent), typeof r.opacity == "number" && (A.opacity = r.opacity), r.normalMap && (A.normalMap = r.normalMap, A.normalScale = r.normalScale || new m.Vector2(1, 1)), s !== null && ["map", "normalMap", "roughnessMap", "metalnessMap", "aoMap"].forEach((d) => {
              A[d] && (A[d].anisotropy = s, A[d].needsUpdate = !0);
            }), A.needsUpdate = !0, Array.isArray(n.material) ? n.material[l] = A : n.material = A, r !== A && typeof r?.dispose == "function" && r.dispose();
          } else (r.type === "MeshStandardMaterial" || r.type === "MeshPhysicalMaterial") && (s !== null && ["map", "normalMap", "roughnessMap", "metalnessMap", "aoMap", "emissiveMap"].forEach((h) => {
            r[h] && (r[h].anisotropy = s, r[h].needsUpdate = !0);
          }), r.needsUpdate = !0);
          const c = Array.isArray(n.material) ? n.material[l] : n.material;
          c && c.needsUpdate !== void 0 && (c.needsUpdate = !0);
        }), n.geometry && (n.geometry.computeVertexNormals(), n.geometry.normalizeNormals(), o.some((l) => l.normalMap) && n.geometry.computeTangents());
      }
    });
    const i = new m.Box3().setFromObject(t);
    return t.userData.boundingBox = i, t;
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
      !i || t.has(i) || (t.add(i), i.traverse((n) => {
        n.isMesh && (n.geometry && n.geometry.dispose(), this.disposeMaterialResources(n.material));
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
      i && (s.forEach((n) => {
        const o = i[n];
        o && typeof o.dispose == "function" && o.dispose(), o && o.source && typeof o.source.dispose == "function" && o.source.dispose(), o && o.image && typeof o.image.close == "function" && o.image.close(), o && (i[n] = null);
      }), typeof i.dispose == "function" && i.dispose());
    });
  }
  releaseParserCaches(e) {
    const t = e?.parser;
    t && (t.cache && typeof t.cache.removeAll == "function" && t.cache.removeAll(), t.associations && typeof t.associations.clear == "function" && t.associations.clear(), t.primitiveCache = {}, t.nodeCache = {}, t.meshCache = { refs: {}, uses: {} }, t.cameraCache = { refs: {}, uses: {} }, t.lightCache = { refs: {}, uses: {} }, t.sourceCache = {}, t.textureCache = {}, t.nodeNamesUsed = {}, t.json = null, t.extensions = null, t.plugins = null, t.options = null, t.textureLoader = null, e.parser = null, wl());
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
    return $.isIOSWebKit() ? "ios" : "default";
  }
}
$.sharedKTX2Loaders = /* @__PURE__ */ new Map();
$.sharedKTX2SetupComplete = /* @__PURE__ */ new Map();
let Sl = class {
  get unloadPriorityCallback() {
    return this._unloadPriorityCallback;
  }
  set unloadPriorityCallback(e) {
    e.length === 1 ? (console.warn('LRUCache: "unloadPriorityCallback" function has been changed to take two arguments.'), this._unloadPriorityCallback = (t, s) => {
      const i = e(t), n = e(s);
      return i < n ? -1 : i > n ? 1 : 0;
    }) : this._unloadPriorityCallback = e;
  }
  constructor() {
    this.minSize = 6e3, this.maxSize = 8e3, this.minBytesSize = 0.3 * 1073741824, this.maxBytesSize = 0.4 * 1073741824, this.unloadPercent = 0.05, this.autoMarkUnused = !0, this.itemSet = /* @__PURE__ */ new Map(), this.itemList = [], this.usedSet = /* @__PURE__ */ new Set(), this.callbacks = /* @__PURE__ */ new Map(), this.unloadingHandle = -1, this.cachedBytes = 0, this.bytesMap = /* @__PURE__ */ new Map(), this.loadedSet = /* @__PURE__ */ new Set(), this._unloadPriorityCallback = null;
    const e = this.itemSet;
    this.defaultPriorityCallback = (t) => e.get(t);
  }
  // Returns whether or not the cache has reached the maximum size
  isFull() {
    return this.itemSet.size >= this.maxSize || this.cachedBytes >= this.maxBytesSize;
  }
  getMemoryUsage(e) {
    return this.bytesMap.get(e) || 0;
  }
  setMemoryUsage(e, t) {
    const { bytesMap: s, itemSet: i } = this;
    i.has(e) && (this.cachedBytes -= s.get(e) || 0, s.set(e, t), this.cachedBytes += t);
  }
  add(e, t) {
    const s = this.itemSet;
    if (s.has(e) || this.isFull())
      return !1;
    const i = this.usedSet, n = this.itemList, o = this.callbacks;
    return n.push(e), i.add(e), s.set(e, Date.now()), o.set(e, t), !0;
  }
  has(e) {
    return this.itemSet.has(e);
  }
  remove(e) {
    const t = this.usedSet, s = this.itemSet, i = this.itemList, n = this.bytesMap, o = this.callbacks, r = this.loadedSet;
    if (s.has(e)) {
      this.cachedBytes -= n.get(e) || 0, n.delete(e), o.get(e)(e);
      const l = i.indexOf(e);
      return i.splice(l, 1), t.delete(e), s.delete(e), o.delete(e), r.delete(e), !0;
    }
    return !1;
  }
  // Marks whether tiles in the cache have been completely loaded or not. Tiles that have not been completely
  // loaded are subject to being disposed early if the cache is full above its max size limits, even if they
  // are marked as used.
  setLoaded(e, t) {
    const { itemSet: s, loadedSet: i } = this;
    s.has(e) && (t === !0 ? i.add(e) : i.delete(e));
  }
  markUsed(e) {
    const t = this.itemSet, s = this.usedSet;
    t.has(e) && !s.has(e) && (t.set(e, Date.now()), s.add(e));
  }
  markUnused(e) {
    this.usedSet.delete(e);
  }
  markAllUnused() {
    this.usedSet.clear();
  }
  isUsed(e) {
    return this.usedSet.has(e);
  }
  // TODO: this should be renamed because it's not necessarily unloading all unused content
  // Maybe call it "cleanup" or "unloadToMinSize"
  unloadUnusedContent() {
    const {
      unloadPercent: e,
      minSize: t,
      maxSize: s,
      itemList: i,
      itemSet: n,
      usedSet: o,
      loadedSet: r,
      callbacks: l,
      bytesMap: c,
      minBytesSize: A,
      maxBytesSize: h
    } = this, d = i.length - o.size, u = i.length - r.size, g = Math.max(Math.min(i.length - t, d), 0), p = this.cachedBytes - A, b = this.unloadPriorityCallback || this.defaultPriorityCallback;
    let E = !1;
    const C = g > 0 && d > 0 || u && i.length > s;
    if (d && this.cachedBytes > A || u && this.cachedBytes > h || C) {
      i.sort((S, x) => {
        const R = o.has(S), L = o.has(x);
        if (R === L) {
          const q = r.has(S), Q = r.has(x);
          return q === Q ? -b(S, x) : q ? 1 : -1;
        } else
          return R ? 1 : -1;
      });
      const y = Math.max(t * e, g * e), f = Math.ceil(Math.min(y, d, g)), I = Math.max(e * p, e * A), w = Math.min(I, p);
      let B = 0, M = 0;
      for (; this.cachedBytes - M > h || i.length - B > s; ) {
        const S = i[B], x = c.get(S) || 0;
        if (o.has(S) && r.has(S) || this.cachedBytes - M - x < h && i.length - B <= s)
          break;
        M += x, B++;
      }
      for (; M < w || B < f; ) {
        const S = i[B], x = c.get(S) || 0;
        if (o.has(S) || this.cachedBytes - M - x < A && B >= f)
          break;
        M += x, B++;
      }
      i.splice(0, B).forEach((S) => {
        this.cachedBytes -= c.get(S) || 0, l.get(S)(S), c.delete(S), n.delete(S), l.delete(S), r.delete(S), o.delete(S);
      }), E = B < g || M < p && B < d, E = E && B > 0;
    }
    E && (this.unloadingHandle = requestAnimationFrame(() => this.scheduleUnload()));
  }
  scheduleUnload() {
    cancelAnimationFrame(this.unloadingHandle), this.scheduled || (this.scheduled = !0, queueMicrotask(() => {
      this.scheduled = !1, this.unloadUnusedContent();
    }));
  }
}, Vi = class extends Error {
  constructor() {
    super("PriorityQueue: Item removed"), this.name = "PriorityQueueItemRemovedError";
  }
}, xs = class {
  // returns whether tasks are queued or actively running
  get running() {
    return this.items.length !== 0 || this.currJobs !== 0;
  }
  constructor() {
    this.maxJobs = 6, this.items = [], this.callbacks = /* @__PURE__ */ new Map(), this.currJobs = 0, this.scheduled = !1, this.autoUpdate = !0, this.priorityCallback = null, this.schedulingCallback = (e) => {
      requestAnimationFrame(e);
    }, this._runjobs = () => {
      this.scheduled = !1, this.tryRunJobs();
    };
  }
  sort() {
    const e = this.priorityCallback, t = this.items;
    e !== null && t.sort(e);
  }
  has(e) {
    return this.callbacks.has(e);
  }
  add(e, t) {
    const s = {
      callback: t,
      reject: null,
      resolve: null,
      promise: null
    };
    return s.promise = new Promise((i, n) => {
      const o = this.items, r = this.callbacks;
      s.resolve = i, s.reject = n, o.unshift(e), r.set(e, s), this.autoUpdate && this.scheduleJobRun();
    }), s.promise;
  }
  remove(e) {
    const t = this.items, s = this.callbacks, i = t.indexOf(e);
    if (i !== -1) {
      const n = s.get(e);
      n.promise.catch((o) => {
        if (!(o instanceof Vi))
          throw o;
      }), n.reject(new Vi()), t.splice(i, 1), s.delete(e);
    }
  }
  removeByFilter(e) {
    const { items: t } = this;
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      e(i) && (this.remove(i), s--);
    }
  }
  tryRunJobs() {
    this.sort();
    const e = this.items, t = this.callbacks, s = this.maxJobs;
    let i = 0;
    const n = () => {
      this.currJobs--, this.autoUpdate && this.scheduleJobRun();
    };
    for (; s > this.currJobs && e.length > 0 && i < s; ) {
      this.currJobs++, i++;
      const o = e.pop(), { callback: r, resolve: l, reject: c } = t.get(o);
      t.delete(o);
      let A;
      try {
        A = r(o);
      } catch (h) {
        c(h), n();
      }
      A instanceof Promise ? A.then(l).catch(c).finally(n) : (l(A), n());
    }
  }
  scheduleJobRun() {
    this.scheduled || (this.schedulingCallback(this._runjobs), this.scheduled = !0);
  }
};
const _e = -1, Be = 0, xt = 1, Qt = 2, Qs = 3, ae = 4, Oi = 6378137, vl = 6356752314245179e-9;
function Ml(a, e = null, t = null) {
  const s = [];
  for (s.push(a), s.push(null), s.push(0); s.length > 0; ) {
    const i = s.pop(), n = s.pop(), o = s.pop();
    if (e && e(o, n, i)) {
      t && t(o, n, i);
      return;
    }
    const r = o.children;
    if (r)
      for (let l = r.length - 1; l >= 0; l--)
        s.push(r[l]), s.push(o), s.push(i + 1);
    t && t(o, n, i);
  }
}
function Ue(a) {
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
const xl = new TextDecoder();
function di(a) {
  return xl.decode(a);
}
function ui(a) {
  return a.replace(/[\\/][^\\/]+$/, "") + "/";
}
let It = class {
  constructor() {
    this.fetchOptions = {}, this.workingPath = "";
  }
  load(...e) {
    return console.warn('Loader: "load" function has been deprecated in favor of "loadAsync".'), this.loadAsync(...e);
  }
  loadAsync(e) {
    return fetch(e, this.fetchOptions).then((t) => {
      if (!t.ok)
        throw new Error(`Failed to load file "${e}" with status ${t.status} : ${t.statusText}`);
      return t.arrayBuffer();
    }).then((t) => (this.workingPath === "" && (this.workingPath = ui(e)), this.parse(t)));
  }
  resolveExternalURL(e) {
    return new URL(e, this.workingPath).href;
  }
  parse(e) {
    throw new Error("LoaderBase: Parse not implemented.");
  }
};
function Hi(a) {
  if (!a)
    return null;
  let e = a.length;
  const t = a.indexOf("?"), s = a.indexOf("#");
  t !== -1 && (e = Math.min(e, t)), s !== -1 && (e = Math.min(e, s));
  const i = a.lastIndexOf(".", e), n = a.lastIndexOf("/", e), o = a.indexOf("://");
  return o !== -1 && o + 2 === n || i === -1 || i < n ? null : a.substring(i + 1, e) || null;
}
const Tt = {
  inView: !1,
  error: 1 / 0,
  distanceFromCamera: 1 / 0
};
function Wt(a) {
  return a === ae || a === _e;
}
function Qe(a, e) {
  return yo(a) && a.traversal.lastFrameVisited === e && a.traversal.used;
}
function yo(a) {
  return !!a.traversal;
}
function Bt(a) {
  const e = a.children.length === 0 || !!a.children[0].internal, t = !a.internal.hasUnrenderableContent || Wt(a.internal.loadingState);
  return e && t;
}
function et(a) {
  return a.internal.hasUnrenderableContent || a.parent && a.parent.geometricError < a.geometricError;
}
function As(a, e) {
  e.ensureChildrenArePreprocessed(a), a.traversal.lastFrameVisited !== e.frameCount && (a.traversal.lastFrameVisited = e.frameCount, a.traversal.used = !1, a.traversal.inFrustum = !1, a.traversal.isLeaf = !1, a.traversal.visible = !1, a.traversal.active = !1, a.traversal.error = 1 / 0, a.traversal.distanceFromCamera = 1 / 0, a.traversal.allChildrenReady = !1, a.traversal.kicked = !1, a.traversal.allUsedChildrenProcessed = !1, e.calculateTileViewErrorWithPlugin(a, Tt), a.traversal.inFrustum = Tt.inView, a.traversal.error = Tt.error, a.traversal.distanceFromCamera = Tt.distanceFromCamera);
}
function ti(a, e, t = !1) {
  if (As(a, e), t ? e.markTileUsed(a) : Xt(a), et(a) && Bt(a)) {
    const s = a.children;
    for (let i = 0, n = s.length; i < n; i++)
      ti(s[i], e, t);
  }
}
function Io(a, e) {
  if (As(a, e), a.traversal.usedLastFrame && (Xt(a), a.traversal.wasSetActive && (a.traversal.active = !0), (!a.traversal.active || et(a)) && Bt(a))) {
    const t = a.children;
    for (let s = 0, i = t.length; s < i; s++)
      Io(t[s], e);
  }
}
function Xt(a) {
  a.traversal.used = !0;
}
function Ql(a, e) {
  return !(a.traversal.error <= e.errorTarget && !et(a) || e.maxDepth > 0 && a.internal.depth + 1 >= e.maxDepth || !Bt(a));
}
function Bo(a, e) {
  const { frameCount: t } = e, { children: s } = a;
  for (let i = 0, n = s.length; i < n; i++) {
    const o = s[i];
    Qe(o, t) && (o.traversal.active && (o.traversal.kicked = !0, o.traversal.active = !1), Bo(o, e));
  }
}
function qi(a) {
  return !et(a) && (!a.internal.hasContent || Wt(a.internal.loadingState));
}
function wo(a, e) {
  if (As(a, e), !a.traversal.inFrustum)
    return;
  if (!Ql(a, e)) {
    Xt(a);
    return;
  }
  let t = !1, s = !1;
  const i = a.children;
  for (let n = 0, o = i.length; n < o; n++) {
    const r = i[n];
    wo(r, e), t = t || Qe(r, e.frameCount), s = s || r.traversal.inFrustum;
  }
  if (a.refine === "REPLACE" && !s && i.length !== 0) {
    a.traversal.inFrustum = !1, e.markTileUsed(a);
    for (let n = 0, o = i.length; n < o; n++)
      ti(i[n], e, !0);
    return;
  }
  if (Xt(a), a.refine === "REPLACE" && t && e.loadSiblings)
    for (let n = 0, o = i.length; n < o; n++)
      ti(i[n], e);
}
function So(a, e) {
  const t = e.frameCount;
  if (!Qe(a, t))
    return;
  const s = a.children;
  let i = !1;
  for (let o = 0, r = s.length; o < r; o++) {
    const l = s[o];
    i = i || Qe(l, t);
  }
  if (!i)
    a.traversal.isLeaf = !0;
  else
    for (let o = 0, r = s.length; o < r; o++)
      So(s[o], e);
  let n = !0;
  for (let o = 0, r = s.length; o < r; o++) {
    const l = s[o];
    Qe(l, e.frameCount) && !l.traversal.allUsedChildrenProcessed && (n = !1);
  }
  a.traversal.allUsedChildrenProcessed = n && Bt(a);
}
function vo(a, e) {
  if (!Qe(a, e.frameCount))
    return;
  const t = a.internal.hasContent, s = Wt(a.internal.loadingState) && t, i = a.children;
  if (a.traversal.isLeaf) {
    if (!et(a) && (a.traversal.active = !0, Bt(a) && (!a.internal.hasContent || !Wt(a.internal.loadingState))))
      for (let r = 0, l = i.length; r < l; r++)
        Io(i[r], e);
    return;
  }
  let n = i.length > 0;
  for (let r = 0, l = i.length; r < l; r++) {
    const c = i[r];
    vo(c, e), Qe(c, e.frameCount) && !(c.traversal.active && qi(c)) && !c.traversal.allChildrenReady && (n = !1);
  }
  a.traversal.allChildrenReady = n;
  const o = a.traversal.active && qi(a);
  !et(a) && !n && !o && a.traversal.wasSetActive && (s || !a.internal.hasContent) && (a.traversal.active = !0, Bo(a, e));
}
function Mo(a, e) {
  var t;
  const s = Qe(a, e.frameCount);
  if (s && ((a.internal.hasUnrenderableContent || a.internal.hasRenderableContent && a.refine === "ADD") && (a.traversal.active = !0), (a.traversal.active || a.traversal.kicked) && a.internal.hasContent ? (e.markTileUsed(a), (a.internal.hasUnrenderableContent || a.traversal.allUsedChildrenProcessed) && e.queueTileForDownload(a), a.internal.loadingState !== ae && (a.traversal.active = !1)) : a.traversal.active = !1, a.traversal.visible = a.internal.hasRenderableContent && a.traversal.active && a.traversal.inFrustum && a.internal.loadingState === ae, e.stats.used++, a.traversal.inFrustum && e.stats.inFrustum++), s || yo(a) && (t = a.traversal) != null && t.usedLastFrame) {
    let i = !1, n = !1;
    s ? (i = a.traversal.active, e.displayActiveTiles ? n = a.traversal.active || a.traversal.visible : n = a.traversal.visible) : As(a, e), a.internal.hasRenderableContent && a.internal.loadingState === ae && (a.traversal.wasSetActive !== i && (e.stats.active += i ? 1 : -1, e.invokeOnePlugin((r) => r.setTileActive && r.setTileActive(a, i))), a.traversal.wasSetVisible !== n && (e.stats.visible += n ? 1 : -1, e.invokeOnePlugin((r) => r.setTileVisible && r.setTileVisible(a, n)))), a.traversal.wasSetActive = i, a.traversal.wasSetVisible = n, a.traversal.usedLastFrame = s;
    const o = a.children;
    for (let r = 0, l = o.length; r < l; r++) {
      const c = o[r];
      Mo(c, e);
    }
  }
}
function Tl(a, e) {
  wo(a, e), So(a, e), vo(a, e), Mo(a, e);
}
const Rt = {
  inView: !1,
  error: 1 / 0,
  distanceFromCamera: 1 / 0
}, xo = !0;
function Qo(a) {
  return a === ae || a === _e;
}
function Te(a, e) {
  return To(a) && a.traversal.lastFrameVisited === e && a.traversal.used;
}
function To(a) {
  return !!a.traversal;
}
function gi(a) {
  return a.children.length === 0 || !!a.children[0].internal;
}
function pi(a) {
  return a.internal.hasUnrenderableContent || a.parent && a.parent.geometricError < a.geometricError;
}
function fi(a, e) {
  a.traversal.lastFrameVisited !== e.frameCount && (a.traversal.lastFrameVisited = e.frameCount, a.traversal.used = !1, a.traversal.inFrustum = !1, a.traversal.isLeaf = !1, a.traversal.visible = !1, a.traversal.active = !1, a.traversal.error = 1 / 0, a.traversal.distanceFromCamera = 1 / 0, a.traversal.allChildrenReady = !1, e.calculateTileViewErrorWithPlugin(a, Rt), a.traversal.inFrustum = Rt.inView, a.traversal.error = Rt.error, a.traversal.distanceFromCamera = Rt.distanceFromCamera);
}
function si(a, e, t = !1) {
  if (e.ensureChildrenArePreprocessed(a), fi(a, e), ii(a, e, t), pi(a) && gi(a)) {
    const s = a.children;
    for (let i = 0, n = s.length; i < n; i++)
      si(s[i], e, t);
  }
}
function Ro(a, e) {
  if (e.ensureChildrenArePreprocessed(a), Te(a, e.frameCount) && (a.internal.hasContent && e.queueTileForDownload(a), gi(a))) {
    const t = a.children;
    for (let s = 0, i = t.length; s < i; s++)
      Ro(t[s], e);
  }
}
function ii(a, e, t = !1) {
  a.traversal.used || (t || (a.traversal.used = !0, e.stats.used++), e.markTileUsed(a), a.traversal.inFrustum === !0 && e.stats.inFrustum++);
}
function Rl(a, e) {
  return !(a.traversal.error <= e.errorTarget && !pi(a) || e.maxDepth > 0 && a.internal.depth + 1 >= e.maxDepth || !gi(a));
}
function Do(a, e) {
  if (e.ensureChildrenArePreprocessed(a), fi(a, e), !a.traversal.inFrustum)
    return;
  if (!Rl(a, e)) {
    ii(a, e);
    return;
  }
  let t = !1, s = !1;
  const i = a.children;
  for (let n = 0, o = i.length; n < o; n++) {
    const r = i[n];
    Do(r, e), t = t || Te(r, e.frameCount), s = s || r.traversal.inFrustum;
  }
  if (a.refine === "REPLACE" && !s && i.length !== 0) {
    a.traversal.inFrustum = !1;
    for (let n = 0, o = i.length; n < o; n++)
      si(i[n], e, !0);
    return;
  }
  if (ii(a, e), a.refine === "REPLACE" && (t && a.internal.depth !== 0 || xo))
    for (let n = 0, o = i.length; n < o; n++)
      si(i[n], e);
}
function Lo(a, e) {
  const t = e.frameCount;
  if (!Te(a, t))
    return;
  const s = a.children;
  let i = !1;
  for (let n = 0, o = s.length; n < o; n++) {
    const r = s[n];
    i = i || Te(r, t);
  }
  if (!i)
    a.traversal.isLeaf = !0;
  else {
    let n = !0;
    for (let o = 0, r = s.length; o < r; o++) {
      const l = s[o];
      if (Lo(l, e), Te(l, t)) {
        const c = !pi(l);
        let A = !l.internal.hasContent || l.internal.hasRenderableContent && Qo(l.internal.loadingState) || l.internal.hasUnrenderableContent && l.internal.loadingState === _e;
        A = c && A || l.traversal.allChildrenReady, n = n && A;
      }
    }
    a.traversal.allChildrenReady = n;
  }
}
function Fo(a, e) {
  const t = e.stats;
  if (!Te(a, e.frameCount))
    return;
  if (a.traversal.isLeaf) {
    a.internal.loadingState === ae ? (a.traversal.inFrustum && (a.traversal.visible = !0, t.visible++), a.traversal.active = !0, t.active++) : a.internal.hasContent && e.queueTileForDownload(a);
    return;
  }
  const s = a.children, i = a.internal.hasContent, n = Qo(a.internal.loadingState) && i, o = (e.errorTarget + 1) * e.errorThreshold, r = a.traversal.error <= o, l = a.refine === "ADD", c = a.traversal.allChildrenReady || a.internal.depth === 0 && !xo;
  if (i && (r || l) && e.queueTileForDownload(a), (r && n && !c || n && l) && (a.traversal.inFrustum && (a.traversal.visible = !0, t.visible++), a.traversal.active = !0, t.active++), !l && r && !c)
    for (let A = 0, h = s.length; A < h; A++) {
      const d = s[A];
      Te(d, e.frameCount) && Ro(d, e);
    }
  else
    for (let A = 0, h = s.length; A < h; A++)
      Fo(s[A], e);
}
function ko(a, e) {
  const t = Te(a, e.frameCount);
  if (t || To(a) && a.traversal.usedLastFrame) {
    let s = !1, i = !1;
    t ? (s = a.traversal.active, e.displayActiveTiles ? i = a.traversal.active || a.traversal.visible : i = a.traversal.visible) : fi(a, e), a.internal.hasRenderableContent && a.internal.loadingState === ae && (a.traversal.wasSetActive !== s && e.invokeOnePlugin((o) => o.setTileActive && o.setTileActive(a, s)), a.traversal.wasSetVisible !== i && e.invokeOnePlugin((o) => o.setTileVisible && o.setTileVisible(a, i))), a.traversal.wasSetActive = s, a.traversal.wasSetVisible = i, a.traversal.usedLastFrame = t;
    const n = a.children;
    for (let o = 0, r = n.length; o < r; o++) {
      const l = n[o];
      ko(l, e);
    }
  }
}
function Dl(a, e) {
  Do(a, e), Lo(a, e), Fo(a, e), ko(a, e);
}
function Ll(a) {
  let e = null;
  return () => {
    e === null && (e = requestAnimationFrame(() => {
      e = null, a();
    }));
  };
}
const zi = Symbol("PLUGIN_REGISTERED"), we = {
  inView: !0,
  error: 0,
  distance: 1 / 0
}, Ts = (a, e) => {
  const t = a.priority || 0, s = e.priority || 0;
  return t !== s ? t > s ? 1 : -1 : !a.traversal || !e.traversal ? 0 : a.traversal.used !== e.traversal.used ? a.traversal.used ? 1 : -1 : a.traversal.error !== e.traversal.error ? a.traversal.error > e.traversal.error ? 1 : -1 : a.traversal.distanceFromCamera !== e.traversal.distanceFromCamera ? a.traversal.distanceFromCamera > e.traversal.distanceFromCamera ? -1 : 1 : a.internal.depthFromRenderedParent !== e.internal.depthFromRenderedParent ? a.internal.depthFromRenderedParent > e.internal.depthFromRenderedParent ? -1 : 1 : 0;
}, Fl = (a, e) => {
  const t = a.priority || 0, s = e.priority || 0;
  return t !== s ? t > s ? 1 : -1 : !a.traversal || !e.traversal ? 0 : a.traversal.used !== e.traversal.used ? a.traversal.used ? 1 : -1 : a.traversal.inFrustum !== e.traversal.inFrustum ? a.traversal.inFrustum ? 1 : -1 : a.internal.hasUnrenderableContent !== e.internal.hasUnrenderableContent ? a.internal.hasUnrenderableContent ? 1 : -1 : a.traversal.distanceFromCamera !== e.traversal.distanceFromCamera ? a.traversal.distanceFromCamera > e.traversal.distanceFromCamera ? -1 : 1 : 0;
}, kl = (a, e) => {
  const t = a.priority || 0, s = e.priority || 0;
  return t !== s ? t > s ? 1 : -1 : !a.traversal || !e.traversal ? 0 : a.traversal.lastFrameVisited !== e.traversal.lastFrameVisited ? a.traversal.lastFrameVisited > e.traversal.lastFrameVisited ? -1 : 1 : a.internal.depthFromRenderedParent !== e.internal.depthFromRenderedParent ? a.internal.depthFromRenderedParent > e.internal.depthFromRenderedParent ? 1 : -1 : a.internal.loadingState !== e.internal.loadingState ? a.internal.loadingState > e.internal.loadingState ? -1 : 1 : a.internal.hasUnrenderableContent !== e.internal.hasUnrenderableContent ? a.internal.hasUnrenderableContent ? -1 : 1 : a.traversal.error !== e.traversal.error ? a.traversal.error > e.traversal.error ? -1 : 1 : 0;
};
class _l {
  get root() {
    const e = this.rootTileset;
    return e ? e.root : null;
  }
  get rootTileSet() {
    return console.warn('TilesRenderer: "rootTileSet" has been deprecated. Use "rootTileset" instead.'), this.rootTileset;
  }
  get loadProgress() {
    const { stats: e, isLoading: t } = this, s = e.queued + e.downloading + e.parsing, i = e.inCacheSinceLoad + (t ? 1 : 0);
    return i === 0 ? 1 : 1 - s / i;
  }
  get errorThreshold() {
    return this._errorThreshold;
  }
  set errorThreshold(e) {
    console.warn('TilesRenderer: The "errorThreshold" option has been deprecated.'), this._errorThreshold = e;
  }
  constructor(e = null) {
    this.rootLoadingState = Be, this.rootTileset = null, this.rootURL = e, this.fetchOptions = {}, this.plugins = [], this.queuedTiles = [], this.cachedSinceLoadComplete = /* @__PURE__ */ new Set(), this.isLoading = !1;
    const t = new Sl();
    t.unloadPriorityCallback = kl;
    const s = new xs();
    s.maxJobs = 25, s.priorityCallback = Ts;
    const i = new xs();
    i.maxJobs = 5, i.priorityCallback = Ts;
    const n = new xs();
    n.maxJobs = 25, n.priorityCallback = (o, r) => {
      const l = o.parent, c = r.parent;
      return l === c ? 0 : l ? c ? s.priorityCallback(l, c) : -1 : 1;
    }, this.processedTiles = /* @__PURE__ */ new WeakSet(), this.visibleTiles = /* @__PURE__ */ new Set(), this.activeTiles = /* @__PURE__ */ new Set(), this.usedSet = /* @__PURE__ */ new Set(), this.loadingTiles = /* @__PURE__ */ new Set(), this.lruCache = t, this.downloadQueue = s, this.parseQueue = i, this.processNodeQueue = n, this.stats = {
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
    }, this.frameCount = 0, this._dispatchNeedsUpdateEvent = Ll(() => {
      this.dispatchEvent({ type: "needs-update" });
    }), this.errorTarget = 16, this._errorThreshold = 1 / 0, this.displayActiveTiles = !1, this.maxDepth = 1 / 0, this.optimizedLoadStrategy = !1, this.loadSiblings = !0, this.maxTilesProcessed = 250;
  }
  // Plugins
  registerPlugin(e) {
    if (e[zi] === !0)
      throw new Error("TilesRendererBase: A plugin can only be registered to a single tileset");
    e.loadRootTileSet && !e.loadRootTileset && (console.warn('TilesRendererBase: Plugin implements deprecated "loadRootTileSet" method. Please rename to "loadRootTileset".'), e.loadRootTileset = e.loadRootTileSet), e.preprocessTileSet && !e.preprocessTileset && (console.warn('TilesRendererBase: Plugin implements deprecated "preprocessTileSet" method. Please rename to "preprocessTileset".'), e.preprocessTileset = e.preprocessTileSet);
    const t = this.plugins, s = e.priority || 0;
    let i = t.length;
    for (let n = 0; n < t.length; n++)
      if ((t[n].priority || 0) > s) {
        i = n;
        break;
      }
    t.splice(i, 0, e), e[zi] = !0, e.init && e.init(this);
  }
  unregisterPlugin(e) {
    const t = this.plugins;
    if (typeof e == "string" && (e = this.getPluginByName(e)), t.includes(e)) {
      const s = t.indexOf(e);
      return t.splice(s, 1), e.dispose && e.dispose(), !0;
    }
    return !1;
  }
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
      const n = e(t[i]);
      n && s.push(n);
    }
    return s.length === 0 ? null : Promise.all(s);
  }
  // Public API
  traverse(e, t, s = !0) {
    this.root && Ml(this.root, (i, ...n) => (s && this.ensureChildrenArePreprocessed(i, !0), e ? e(i, ...n) : !1), t);
  }
  getAttributions(e = []) {
    return this.invokeAllPlugins((t) => t !== this && t.getAttributions && t.getAttributions(e)), e;
  }
  update() {
    const { lruCache: e, usedSet: t, stats: s, root: i, downloadQueue: n, parseQueue: o, processNodeQueue: r, optimizedLoadStrategy: l } = this;
    if (this.rootLoadingState === Be && (this.rootLoadingState = Qt, this.invokeOnePlugin((d) => d.loadRootTileset && d.loadRootTileset()).then((d) => {
      let u = this.rootURL;
      u !== null && this.invokeAllPlugins((g) => u = g.preprocessURL ? g.preprocessURL(u, null) : u), this.rootLoadingState = ae, this.rootTileset = d, this.dispatchEvent({ type: "needs-update" }), this.dispatchEvent({ type: "load-content" }), this.dispatchEvent({
        type: "load-tileset",
        tileset: d,
        url: u
      }), this.dispatchEvent({
        type: "load-root-tileset",
        tileset: d,
        url: u
      });
    }).catch((d) => {
      this.rootLoadingState = _e, console.error(d), this.rootTileset = null, this.dispatchEvent({
        type: "load-error",
        tile: null,
        error: d,
        url: this.rootURL
      });
    })), !i)
      return;
    let c = null;
    if (this.invokeAllPlugins((d) => {
      if (d.doTilesNeedUpdate) {
        const u = d.doTilesNeedUpdate();
        c === null ? c = u : c = !!(c || u);
      }
    }), c === !1) {
      this.dispatchEvent({ type: "update-before" }), this.dispatchEvent({ type: "update-after" });
      return;
    }
    this.dispatchEvent({ type: "update-before" }), s.inFrustum = 0, s.used = 0, s.active = 0, s.visible = 0, s.tilesProcessed = 0, this.frameCount++, t.forEach((d) => e.markUnused(d)), t.clear();
    const A = l ? Fl : Ts;
    n.priorityCallback = A, o.priorityCallback = A, this.prepareForTraversal(), l ? Tl(i, this) : Dl(i, this), this.removeUnusedPendingTiles();
    const h = this.queuedTiles;
    h.sort(e.unloadPriorityCallback);
    for (let d = 0, u = h.length; d < u && !e.isFull(); d++)
      this.requestTileContents(h[d]);
    h.length = 0, e.scheduleUnload(), (n.running || o.running || r.running) === !1 && this.isLoading === !0 && (this.cachedSinceLoadComplete.clear(), s.inCacheSinceLoad = 0, this.dispatchEvent({ type: "tiles-load-end" }), this.isLoading = !1), this.dispatchEvent({ type: "update-after" });
  }
  resetFailedTiles() {
    this.rootLoadingState === _e && (this.rootLoadingState = Be);
    const e = this.stats;
    e.failed !== 0 && (this.traverse((t) => {
      t.internal.loadingState === _e && (t.internal.loadingState = Be);
    }, null, !1), e.failed = 0);
  }
  calculateTileViewErrorWithPlugin(e, t) {
    this.calculateTileViewError(e, t);
    let s = null, i = 0, n = 1 / 0;
    this.invokeAllPlugins((o) => {
      o !== this && o.calculateTileViewError && (we.inView = !0, we.error = 0, we.distance = 1 / 0, o.calculateTileViewError(e, we) && (s === null && (s = !0), s = s && we.inView, we.inView && (n = Math.min(n, we.distance), i = Math.max(i, we.error))));
    }), t.inView && s !== !1 ? (t.error = Math.max(t.error, i), t.distanceFromCamera = Math.min(t.distanceFromCamera, n)) : s ? (t.inView = !0, t.error = i, t.distanceFromCamera = n) : t.inView = !1;
  }
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
  dispatchEvent(e) {
  }
  addEventListener(e, t) {
  }
  removeEventListener(e, t) {
  }
  parseTile(e, t, s) {
    return null;
  }
  prepareForTraversal() {
  }
  disposeTile(e) {
    e.traversal.visible && (this.invokeOnePlugin((s) => s.setTileVisible && s.setTileVisible(e, !1)), e.traversal.visible = !1), e.traversal.active && (this.invokeOnePlugin((s) => s.setTileActive && s.setTileActive(e, !1)), e.traversal.active = !1);
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
      loadingState: Be,
      basePath: t,
      depth: -1,
      depthFromRenderedParent: -1
    }, (i = e.content) != null && i.uri) {
      const n = Hi(e.content.uri), o = !!(n && /json$/.test(n));
      e.internal.hasContent = !0, e.internal.hasUnrenderableContent = o, e.internal.hasRenderableContent = !o;
    } else
      e.internal.hasContent = !1, e.internal.hasUnrenderableContent = !1, e.internal.hasRenderableContent = !1;
    s ? (e.internal.depth = s.internal.depth + 1, e.internal.depthFromRenderedParent = s.internal.depthFromRenderedParent + (e.internal.hasRenderableContent ? 1 : 0)) : (e.internal.depth = 0, e.internal.depthFromRenderedParent = e.internal.hasRenderableContent ? 1 : 0), e.traversal = {
      distanceFromCamera: 1 / 0,
      error: 1 / 0,
      inFrustum: !1,
      isLeaf: !1,
      used: !1,
      usedLastFrame: !1,
      visible: !1,
      wasSetVisible: !1,
      active: !1,
      wasSetActive: !1,
      allChildrenReady: !1,
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
    }), this.invokeAllPlugins((n) => {
      n !== this && n.preprocessNode && n.preprocessNode(e, t, s);
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
      !e.isUsed(i) && i.internal.loadingState === xt && s.push(i);
    for (let i = 0; i < s.length; i++)
      e.remove(s[i]);
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
    const s = e.children;
    if (s.length === 0 || s[0].internal)
      return;
    const i = (n) => {
      for (let o = 0, r = n.length; o < r; o++)
        this.preprocessNode(n[o], e.internal.basePath, e);
    };
    t ? (this.processNodeQueue.remove(e), i(s)) : this.processNodeQueue.has(e) || this.processNodeQueue.add(e, (n) => {
      i(n.children), this._dispatchNeedsUpdateEvent();
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
    const i = Object.getPrototypeOf(this);
    Object.hasOwn(i, "preprocessTileSet") && console.warn(`${i.constructor.name}: Class overrides deprecated "preprocessTileSet" method. Please rename to "preprocessTileset".`);
    const n = e.asset.version, [o, r] = n.split(".").map((c) => parseInt(c));
    console.assert(
      o <= 1,
      "TilesRenderer: asset.version is expected to be a 1.x or a compatible version."
    ), o === 1 && r > 0 && console.warn("TilesRenderer: tiles versions at 1.1 or higher have limited support. Some new extensions and features may not be supported.");
    let l = t.replace(/\/[^/]*$/, "");
    l = new URL(l, window.location.href).toString(), this.preprocessNode(e.root, l, s);
  }
  preprocessTileSet(...e) {
    return console.warn('TilesRenderer: "preprocessTileSet" has been deprecated. Use "preprocessTileset" instead.'), this.preprocessTileset(...e);
  }
  loadRootTileset() {
    const e = Object.getPrototypeOf(this);
    Object.hasOwn(e, "loadRootTileSet") && console.warn(`${e.constructor.name}: Class overrides deprecated "loadRootTileSet" method. Please rename to "loadRootTileset".`);
    let t = this.rootURL;
    return this.invokeAllPlugins((s) => t = s.preprocessURL ? s.preprocessURL(t, null) : t), this.invokeOnePlugin((s) => s.fetchData && s.fetchData(t, this.fetchOptions)).then((s) => {
      if (s instanceof Response) {
        if (s.ok)
          return s.json();
        throw new Error(`TilesRenderer: Failed to load tileset "${t}" with status ${s.status} : ${s.statusText}`);
      } else return s;
    }).then((s) => (this.preprocessTileset(s, t), s));
  }
  loadRootTileSet(...e) {
    return console.warn('TilesRenderer: "loadRootTileSet" has been deprecated. Use "loadRootTileset" instead.'), this.loadRootTileSet(...e);
  }
  requestTileContents(e) {
    if (e.internal.loadingState !== Be)
      return;
    let t = !1, s = null, i = new URL(e.content.uri, e.internal.basePath + "/").toString();
    this.invokeAllPlugins((u) => i = u.preprocessURL ? u.preprocessURL(i, e) : i);
    const n = this.stats, o = this.lruCache, r = this.downloadQueue, l = this.parseQueue, c = this.loadingTiles, A = Hi(i), h = new AbortController(), d = h.signal;
    if (o.add(e, (u) => {
      h.abort(), t ? u.children.length = 0 : this.invokeAllPlugins((g) => {
        g.disposeTile && g.disposeTile(u);
      }), n.inCache--, this.cachedSinceLoadComplete.has(e) && (this.cachedSinceLoadComplete.delete(e), n.inCacheSinceLoad--), u.internal.loadingState === xt ? n.queued-- : u.internal.loadingState === Qt ? n.downloading-- : u.internal.loadingState === Qs ? n.parsing-- : u.internal.loadingState === ae && n.loaded--, u.internal.loadingState = Be, l.remove(u), r.remove(u), c.delete(u);
    }))
      return this.isLoading || (this.isLoading = !0, this.dispatchEvent({ type: "tiles-load-start" })), o.setMemoryUsage(e, this.getBytesUsed(e)), this.cachedSinceLoadComplete.add(e), n.inCacheSinceLoad++, n.inCache++, n.queued++, e.internal.loadingState = xt, c.add(e), r.add(e, (u) => {
        if (d.aborted)
          return Promise.resolve();
        e.internal.loadingState = Qt, n.downloading++, n.queued--;
        const g = this.invokeOnePlugin((p) => p.fetchData && p.fetchData(i, { ...this.fetchOptions, signal: d }));
        return this.dispatchEvent({ type: "tile-download-start", tile: e, uri: i }), g;
      }).then((u) => {
        if (!d.aborted)
          if (u instanceof Response) {
            if (u.ok)
              return A === "json" ? u.json() : u.arrayBuffer();
            throw new Error(`Failed to load model with error code ${u.status}`);
          } else return u;
      }).then((u) => {
        if (!d.aborted)
          return n.downloading--, n.parsing++, e.internal.loadingState = Qs, l.add(e, (g) => d.aborted ? Promise.resolve() : A === "json" && u.root ? (this.preprocessTileset(u, i, e), e.children.push(u.root), s = u, t = !0, Promise.resolve()) : this.invokeOnePlugin((p) => p.parseTile && p.parseTile(u, g, A, i, d)));
      }).then(() => {
        if (d.aborted)
          return;
        n.parsing--, n.loaded++, e.internal.loadingState = ae, c.delete(e), o.setLoaded(e, !0);
        const u = this.getBytesUsed(e);
        if (o.getMemoryUsage(e) === 0 && u > 0 && o.isFull()) {
          o.remove(e);
          return;
        }
        o.setMemoryUsage(e, u), this.dispatchEvent({ type: "needs-update" }), this.dispatchEvent({ type: "load-content" }), t && this.dispatchEvent({
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
        d.aborted || (u.name !== "AbortError" ? (l.remove(e), r.remove(e), e.internal.loadingState === xt ? n.queued-- : e.internal.loadingState === Qt ? n.downloading-- : e.internal.loadingState === Qs ? n.parsing-- : e.internal.loadingState === ae && n.loaded--, n.failed++, console.error(`TilesRenderer : Failed to load tile at url "${e.content.uri}".`), console.error(u), e.internal.loadingState = _e, c.delete(e), o.setLoaded(e, !0), this.dispatchEvent({
          type: "load-error",
          tile: e,
          error: u,
          url: i
        })) : o.remove(e));
      });
  }
}
function _o(a, e, t, s, i, n) {
  let o;
  switch (s) {
    case "SCALAR":
      o = 1;
      break;
    case "VEC2":
      o = 2;
      break;
    case "VEC3":
      o = 3;
      break;
    case "VEC4":
      o = 4;
      break;
    default:
      throw new Error(`FeatureTable : Feature type not provided for "${n}".`);
  }
  let r;
  const l = t * o;
  switch (i) {
    case "BYTE":
      r = new Int8Array(a, e, l);
      break;
    case "UNSIGNED_BYTE":
      r = new Uint8Array(a, e, l);
      break;
    case "SHORT":
      r = new Int16Array(a, e, l);
      break;
    case "UNSIGNED_SHORT":
      r = new Uint16Array(a, e, l);
      break;
    case "INT":
      r = new Int32Array(a, e, l);
      break;
    case "UNSIGNED_INT":
      r = new Uint32Array(a, e, l);
      break;
    case "FLOAT":
      r = new Float32Array(a, e, l);
      break;
    case "DOUBLE":
      r = new Float64Array(a, e, l);
      break;
    default:
      throw new Error(`FeatureTable : Feature component type not provided for "${n}".`);
  }
  return r;
}
let hs = class {
  constructor(e, t, s, i) {
    this.buffer = e, this.binOffset = t + s, this.binLength = i;
    let n = null;
    if (s !== 0) {
      const o = new Uint8Array(e, t, s);
      n = JSON.parse(di(o));
    } else
      n = {};
    this.header = n;
  }
  getKeys() {
    return Object.keys(this.header).filter((e) => e !== "extensions");
  }
  getData(e, t, s = null, i = null) {
    const n = this.header;
    if (!(e in n))
      return null;
    const o = n[e];
    if (o instanceof Object) {
      if (Array.isArray(o))
        return o;
      {
        const { buffer: r, binOffset: l, binLength: c } = this, A = o.byteOffset || 0, h = o.type || i, d = o.componentType || s;
        if ("type" in o && i && o.type !== i)
          throw new Error("FeatureTable: Specified type does not match expected type.");
        const u = l + A, g = _o(r, u, t, h, d, e);
        if (u + g.byteLength > l + c)
          throw new Error("FeatureTable: Feature data read outside binary body length.");
        return g;
      }
    } else return o;
  }
  getBuffer(e, t) {
    const { buffer: s, binOffset: i } = this;
    return s.slice(i + e, i + e + t);
  }
};
class Pl {
  constructor(e) {
    this.batchTable = e;
    const t = e.header.extensions["3DTILES_batch_table_hierarchy"];
    this.classes = t.classes;
    for (const i of this.classes) {
      const n = i.instances;
      for (const o in n)
        i.instances[o] = this._parseProperty(n[o], i.length, o);
    }
    if (this.instancesLength = t.instancesLength, this.classIds = this._parseProperty(t.classIds, this.instancesLength, "classIds"), t.parentCounts ? this.parentCounts = this._parseProperty(t.parentCounts, this.instancesLength, "parentCounts") : this.parentCounts = new Array(this.instancesLength).fill(1), t.parentIds) {
      const i = this.parentCounts.reduce((n, o) => n + o, 0);
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
      const { buffer: i, binOffset: n } = this.batchTable, o = e.byteOffset, r = e.componentType || "UNSIGNED_SHORT", l = n + o;
      return _o(i, l, t, "SCALAR", r, s);
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
    const i = this.classIds[e], n = this.classes[i].instances, o = this.classes[i].name, r = this.instancesIds[e];
    for (const l in n)
      t[o] = t[o] || {}, t[o][l] = n[l][r];
    return t;
  }
}
class mi extends hs {
  get batchSize() {
    return console.warn("BatchTable.batchSize has been deprecated and replaced with BatchTable.count."), this.count;
  }
  constructor(e, t, s, i, n) {
    super(e, s, i, n), this.count = t, this.extensions = {};
    const o = this.header.extensions;
    o && o["3DTILES_batch_table_hierarchy"] && (this.extensions["3DTILES_batch_table_hierarchy"] = new Pl(this));
  }
  getData(e, t = null, s = null) {
    return console.warn("BatchTable: BatchTable.getData is deprecated. Use BatchTable.getDataFromId to get allproperties for an id or BatchTable.getPropertyArray for getting an array of value for a property."), super.getData(e, this.count, t, s);
  }
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
  getPropertyArray(e) {
    return super.getData(e, this.count);
  }
}
let Gl = class extends It {
  parse(e) {
    const t = new DataView(e), s = Ue(t);
    console.assert(s === "b3dm");
    const i = t.getUint32(4, !0);
    console.assert(i === 1);
    const n = t.getUint32(8, !0);
    console.assert(n === e.byteLength);
    const o = t.getUint32(12, !0), r = t.getUint32(16, !0), l = t.getUint32(20, !0), c = t.getUint32(24, !0), A = 28, h = e.slice(
      A,
      A + o + r
    ), d = new hs(
      h,
      0,
      o,
      r
    ), u = A + o + r, g = e.slice(
      u,
      u + l + c
    ), p = new mi(
      g,
      d.getData("BATCH_LENGTH"),
      0,
      l,
      c
    ), b = u + l + c, E = new Uint8Array(e, b, n - b);
    return {
      version: i,
      featureTable: d,
      batchTable: p,
      glbBytes: E
    };
  }
}, Ul = class extends It {
  parse(e) {
    const t = new DataView(e), s = Ue(t);
    console.assert(s === "i3dm");
    const i = t.getUint32(4, !0);
    console.assert(i === 1);
    const n = t.getUint32(8, !0);
    console.assert(n === e.byteLength);
    const o = t.getUint32(12, !0), r = t.getUint32(16, !0), l = t.getUint32(20, !0), c = t.getUint32(24, !0), A = t.getUint32(28, !0), h = 32, d = e.slice(
      h,
      h + o + r
    ), u = new hs(
      d,
      0,
      o,
      r
    ), g = h + o + r, p = e.slice(
      g,
      g + l + c
    ), b = new mi(
      p,
      u.getData("INSTANCES_LENGTH"),
      0,
      l,
      c
    ), E = g + l + c, C = new Uint8Array(e, E, n - E);
    let y = null, f = null, I = null;
    if (A)
      y = C, f = Promise.resolve();
    else {
      const w = this.resolveExternalURL(di(C));
      I = ui(w), f = fetch(w, this.fetchOptions).then((B) => {
        if (!B.ok)
          throw new Error(`I3DMLoaderBase : Failed to load file "${w}" with status ${B.status} : ${B.statusText}`);
        return B.arrayBuffer();
      }).then((B) => {
        y = new Uint8Array(B);
      });
    }
    return f.then(() => ({
      version: i,
      featureTable: u,
      batchTable: b,
      glbBytes: y,
      gltfWorkingPath: I
    }));
  }
}, Nl = class extends It {
  parse(e) {
    const t = new DataView(e), s = Ue(t);
    console.assert(s === "pnts");
    const i = t.getUint32(4, !0);
    console.assert(i === 1);
    const n = t.getUint32(8, !0);
    console.assert(n === e.byteLength);
    const o = t.getUint32(12, !0), r = t.getUint32(16, !0), l = t.getUint32(20, !0), c = t.getUint32(24, !0), A = 28, h = e.slice(
      A,
      A + o + r
    ), d = new hs(
      h,
      0,
      o,
      r
    ), u = A + o + r, g = e.slice(
      u,
      u + l + c
    ), p = new mi(
      g,
      d.getData("BATCH_LENGTH") || d.getData("POINTS_LENGTH"),
      0,
      l,
      c
    );
    return Promise.resolve({
      version: i,
      featureTable: d,
      batchTable: p
    });
  }
}, Vl = class extends It {
  parse(e) {
    const t = new DataView(e), s = Ue(t);
    console.assert(s === "cmpt", 'CMPTLoader: The magic bytes equal "cmpt".');
    const i = t.getUint32(4, !0);
    console.assert(i === 1, 'CMPTLoader: The version listed in the header is "1".');
    const n = t.getUint32(8, !0);
    console.assert(n === e.byteLength, "CMPTLoader: The contents buffer length listed in the header matches the file.");
    const o = t.getUint32(12, !0), r = [];
    let l = 16;
    for (let c = 0; c < o; c++) {
      const A = new DataView(e, l, 12), h = Ue(A), d = A.getUint32(4, !0), u = A.getUint32(8, !0), g = new Uint8Array(e, l, u);
      r.push({
        type: h,
        buffer: g,
        version: d
      }), l += u;
    }
    return {
      version: i,
      tiles: r
    };
  }
};
function Ol(a) {
  const { x: e, y: t, z: s } = a;
  a.x = s, a.y = e, a.z = t;
}
function Hl(a) {
  return -a + Math.PI / 2;
}
const ji = /* @__PURE__ */ new qs(), Se = /* @__PURE__ */ new v(), W = /* @__PURE__ */ new v(), Rs = /* @__PURE__ */ new v(), se = /* @__PURE__ */ new P(), ce = /* @__PURE__ */ new P(), Ki = /* @__PURE__ */ new P(), Ds = /* @__PURE__ */ new Et(), X = /* @__PURE__ */ new Yn(), Yi = /* @__PURE__ */ new v(), Ji = /* @__PURE__ */ new v(), Wi = /* @__PURE__ */ new v(), De = /* @__PURE__ */ new v(), Dt = /* @__PURE__ */ new is(), ql = 1e-12, zl = 0.1, Lt = 0, Xi = 1, Ft = 2;
let Po = class {
  constructor(e = 1, t = 1, s = 1) {
    this.name = "", this.radius = new v(e, t, s);
  }
  intersectRay(e, t) {
    return se.makeScale(...this.radius).invert(), Ds.center.set(0, 0, 0), Ds.radius = 1, Dt.copy(e).applyMatrix4(se), Dt.intersectSphere(Ds, t) ? (se.makeScale(...this.radius), t.applyMatrix4(se), t) : null;
  }
  // returns a frame with Z indicating altitude, Y pointing north, X pointing east
  getEastNorthUpFrame(e, t, s, i) {
    return s.isMatrix4 && (i = s, s = 0, console.warn('Ellipsoid: The signature for "getEastNorthUpFrame" has changed.')), this.getEastNorthUpAxes(e, t, Yi, Ji, Wi), this.getCartographicToPosition(e, t, s, De), i.makeBasis(Yi, Ji, Wi).setPosition(De);
  }
  // returns a frame with z indicating altitude and az, el, roll rotation within that frame
  // - azimuth: measured off of true north, increasing towards "east" (z-axis)
  // - elevation: measured off of the horizon, increasing towards sky (x-axis)
  // - roll: rotation around northern axis (y-axis)
  getOrientedEastNorthUpFrame(e, t, s, i, n, o, r) {
    return this.getObjectFrame(e, t, s, i, n, o, r, Lt);
  }
  // returns a frame similar to the ENU frame but rotated to match three.js object and camera conventions
  // OBJECT_FRAME: oriented such that "+Y" is up and "+Z" is forward.
  // CAMERA_FRAME: oriented such that "+Y" is up and "-Z" is forward.
  getObjectFrame(e, t, s, i, n, o, r, l = Ft) {
    return this.getEastNorthUpFrame(e, t, s, se), X.set(n, o, -i, "ZXY"), r.makeRotationFromEuler(X).premultiply(se), l === Xi ? (X.set(Math.PI / 2, 0, 0, "XYZ"), ce.makeRotationFromEuler(X), r.multiply(ce)) : l === Ft && (X.set(-Math.PI / 2, 0, Math.PI, "XYZ"), ce.makeRotationFromEuler(X), r.multiply(ce)), r;
  }
  getCartographicFromObjectFrame(e, t, s = Ft) {
    return s === Xi ? (X.set(-Math.PI / 2, 0, 0, "XYZ"), ce.makeRotationFromEuler(X).premultiply(e)) : s === Ft ? (X.set(-Math.PI / 2, 0, Math.PI, "XYZ"), ce.makeRotationFromEuler(X).premultiply(e)) : ce.copy(e), De.setFromMatrixPosition(ce), this.getPositionToCartographic(De, t), this.getEastNorthUpFrame(t.lat, t.lon, 0, se).invert(), ce.premultiply(se), X.setFromRotationMatrix(ce, "ZXY"), t.azimuth = -X.z, t.elevation = X.x, t.roll = X.y, t;
  }
  getEastNorthUpAxes(e, t, s, i, n, o = De) {
    this.getCartographicToPosition(e, t, 0, o), this.getCartographicToNormal(e, t, n), s.set(-o.y, o.x, 0).normalize(), i.crossVectors(n, s).normalize();
  }
  // azimuth: measured off of true north, increasing towards "east"
  // elevation: measured off of the horizon, increasing towards sky
  // roll: rotation around northern axis
  getAzElRollFromRotationMatrix(e, t, s, i, n = Lt) {
    return console.warn('Ellipsoid: "getAzElRollFromRotationMatrix" is deprecated. Use "getCartographicFromObjectFrame", instead.'), this.getCartographicToPosition(e, t, 0, De), Ki.copy(s).setPosition(De), this.getCartographicFromObjectFrame(Ki, i, n), delete i.height, delete i.lat, delete i.lon, i;
  }
  getRotationMatrixFromAzElRoll(e, t, s, i, n, o, r = Lt) {
    return console.warn('Ellipsoid: "getRotationMatrixFromAzElRoll" function has been deprecated. Use "getObjectFrame", instead.'), this.getObjectFrame(e, t, 0, s, i, n, o, r), o.setPosition(0, 0, 0), o;
  }
  getFrame(e, t, s, i, n, o, r, l = Lt) {
    return console.warn('Ellipsoid: "getFrame" function has been deprecated. Use "getObjectFrame", instead.'), this.getObjectFrame(e, t, o, s, i, n, r, l);
  }
  getCartographicToPosition(e, t, s, i) {
    this.getCartographicToNormal(e, t, Se);
    const n = this.radius;
    W.copy(Se), W.x *= n.x ** 2, W.y *= n.y ** 2, W.z *= n.z ** 2;
    const o = Math.sqrt(Se.dot(W));
    return W.divideScalar(o), i.copy(W).addScaledVector(Se, s);
  }
  getPositionToCartographic(e, t) {
    this.getPositionToSurfacePoint(e, W), this.getPositionToNormal(e, Se);
    const s = Rs.subVectors(e, W);
    return t.lon = Math.atan2(Se.y, Se.x), t.lat = Math.asin(Se.z), t.height = Math.sign(s.dot(e)) * s.length(), t;
  }
  getCartographicToNormal(e, t, s) {
    return ji.set(1, Hl(e), t), s.setFromSpherical(ji).normalize(), Ol(s), s;
  }
  getPositionToNormal(e, t) {
    const s = this.radius;
    return t.copy(e), t.x /= s.x ** 2, t.y /= s.y ** 2, t.z /= s.z ** 2, t.normalize(), t;
  }
  getPositionToSurfacePoint(e, t) {
    const s = this.radius, i = 1 / s.x ** 2, n = 1 / s.y ** 2, o = 1 / s.z ** 2, r = e.x * e.x * i, l = e.y * e.y * n, c = e.z * e.z * o, A = r + l + c, h = Math.sqrt(1 / A), d = W.copy(e).multiplyScalar(h);
    if (A < zl)
      return isFinite(h) ? t.copy(d) : null;
    const u = Rs.set(
      d.x * i * 2,
      d.y * n * 2,
      d.z * o * 2
    );
    let g = (1 - h) * e.length() / (0.5 * u.length()), p = 0, b, E, C, y, f, I, w, B, M, S, x;
    do {
      g -= p, C = 1 / (1 + g * i), y = 1 / (1 + g * n), f = 1 / (1 + g * o), I = C * C, w = y * y, B = f * f, M = I * C, S = w * y, x = B * f, b = r * I + l * w + c * B - 1, E = r * M * i + l * S * n + c * x * o;
      const R = -2 * E;
      p = b / R;
    } while (Math.abs(b) > ql);
    return t.set(
      e.x * C,
      e.y * y,
      e.z * f
    );
  }
  calculateHorizonDistance(e, t) {
    const s = this.calculateEffectiveRadius(e);
    return Math.sqrt(2 * s * t + t ** 2);
  }
  calculateEffectiveRadius(e) {
    const t = this.radius.x, s = 1 - this.radius.z ** 2 / t ** 2, i = e * st.DEG2RAD, n = Math.sin(i) ** 2;
    return t / Math.sqrt(1 - s * n);
  }
  getPositionElevation(e) {
    this.getPositionToSurfacePoint(e, W);
    const t = Rs.subVectors(e, W);
    return Math.sign(t.dot(e)) * t.length();
  }
  // Returns an estimate of the closest point on the ellipsoid to the ray. Returns
  // the surface intersection if they collide.
  closestPointToRayEstimate(e, t) {
    return this.intersectRay(e, t) ? t : (se.makeScale(...this.radius).invert(), Dt.copy(e).applyMatrix4(se), W.set(0, 0, 0), Dt.closestPointToPoint(W, t).normalize(), se.makeScale(...this.radius), t.applyMatrix4(se));
  }
  copy(e) {
    return this.radius.copy(e.radius), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
};
const ds = new Po(Oi, Oi, vl);
ds.name = "WGS84 Earth";
const kt = /* @__PURE__ */ new v(), _t = /* @__PURE__ */ new v(), Z = /* @__PURE__ */ new v(), Pt = /* @__PURE__ */ new is();
let Zi = class {
  constructor(e = new it(), t = new P()) {
    this.box = e.clone(), this.transform = t.clone(), this.inverseTransform = new P(), this.points = new Array(8).fill().map(() => new v()), this.planes = new Array(6).fill().map(() => new Pn());
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
    return this.clampPoint(e, Z).distanceTo(e);
  }
  containsPoint(e) {
    return Z.copy(e).applyMatrix4(this.inverseTransform), this.box.containsPoint(Z);
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
    const { min: n, max: o } = i;
    let r = 0;
    for (let l = -1; l <= 1; l += 2)
      for (let c = -1; c <= 1; c += 2)
        for (let A = -1; A <= 1; A += 2)
          e[r].set(
            l < 0 ? n.x : o.x,
            c < 0 ? n.y : o.y,
            A < 0 ? n.z : o.z
          ).applyMatrix4(s), r++;
    this.updatePlanes();
  }
  updatePlanes() {
    kt.copy(this.box.min).applyMatrix4(this.transform), _t.copy(this.box.max).applyMatrix4(this.transform), Z.set(0, 0, 1).transformDirection(this.transform), this.planes[0].setFromNormalAndCoplanarPoint(Z, kt), this.planes[1].setFromNormalAndCoplanarPoint(Z, _t).negate(), Z.set(0, 1, 0).transformDirection(this.transform), this.planes[2].setFromNormalAndCoplanarPoint(Z, kt), this.planes[3].setFromNormalAndCoplanarPoint(Z, _t).negate(), Z.set(1, 0, 0).transformDirection(this.transform), this.planes[4].setFromNormalAndCoplanarPoint(Z, kt), this.planes[5].setFromNormalAndCoplanarPoint(Z, _t).negate();
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, Z), Z.distanceToSquared(e.center) <= e.radius * e.radius;
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
    for (let n = 0; n < 6; n++) {
      const o = e[n];
      let r = -1 / 0;
      for (let l = 0; l < 8; l++) {
        const c = s[l], A = o.distanceToPoint(c);
        r = r < A ? A : r;
      }
      if (r < 0)
        return !1;
    }
    for (let n = 0; n < 6; n++) {
      const o = i[n];
      let r = -1 / 0;
      for (let l = 0; l < 8; l++) {
        const c = t[l], A = o.distanceToPoint(c);
        r = r < A ? A : r;
      }
      if (r < 0)
        return !1;
    }
    return !0;
  }
};
const Ls = 1e-13, ft = Math.PI, Fs = ft / 2, lt = /* @__PURE__ */ new v(), Le = /* @__PURE__ */ new v(), oe = /* @__PURE__ */ new v(), T = /* @__PURE__ */ new v(), Y = /* @__PURE__ */ new P(), jl = /* @__PURE__ */ new it(), $i = /* @__PURE__ */ new P();
function ve(a, e) {
  e.radius = Math.max(e.radius, a.distanceToSquared(e.center));
}
function en(a) {
  return a.x !== a.y;
}
let Kl = class extends Po {
  constructor(e = 1, t = 1, s = 1, i = -Fs, n = Fs, o = 0, r = 2 * ft, l = 0, c = 0) {
    super(e, t, s), this.latStart = i, this.latEnd = n, this.lonStart = o, this.lonEnd = r, this.heightStart = l, this.heightEnd = c;
  }
  getBoundingBox(e, t) {
    en(this.radius) && console.warn("EllipsoidRegion: Triaxial ellipsoids are not supported.");
    const {
      latStart: s,
      latEnd: i,
      lonStart: n,
      lonEnd: o,
      heightStart: r,
      heightEnd: l
    } = this, c = (s + i) * 0.5, A = (n + o) * 0.5, h = s > 0, d = i < 0;
    let u;
    h ? u = s : d ? u = i : u = 0;
    const { min: g, max: p } = e;
    g.setScalar(1 / 0), p.setScalar(-1 / 0), o - n <= ft ? (this.getCartographicToNormal(c, A, oe), Le.set(0, 0, 1), lt.crossVectors(Le, oe).normalize(), Le.crossVectors(oe, lt).normalize(), t.makeBasis(lt, Le, oe), Y.copy(t).invert(), this.getCartographicToPosition(u, n, l, T).applyMatrix4(Y), p.x = Math.abs(T.x), g.x = -p.x, this.getCartographicToPosition(i, n, l, T).applyMatrix4(Y), p.y = T.y, this.getCartographicToPosition(i, A, l, T).applyMatrix4(Y), p.y = Math.max(T.y, p.y), this.getCartographicToPosition(s, n, l, T).applyMatrix4(Y), g.y = T.y, this.getCartographicToPosition(s, A, l, T).applyMatrix4(Y), g.y = Math.min(T.y, g.y), this.getCartographicToPosition(c, A, l, T).applyMatrix4(Y), p.z = T.z, this.getCartographicToPosition(s, n, r, T).applyMatrix4(Y), g.z = T.z, this.getCartographicToPosition(i, n, r, T).applyMatrix4(Y), g.z = Math.min(T.z, g.z)) : (this.getCartographicToPosition(u, A, l, oe), oe.z = 0, oe.length() < 1e-10 ? oe.set(1, 0, 0) : oe.normalize(), Le.set(0, 0, 1), lt.crossVectors(oe, Le).normalize(), t.makeBasis(lt, Le, oe), Y.copy(t).invert(), this.getCartographicToPosition(u, A + Fs, l, T).applyMatrix4(Y), p.x = Math.abs(T.x), g.x = -p.x, this.getCartographicToPosition(i, 0, d ? r : l, T).applyMatrix4(Y), p.y = T.y, this.getCartographicToPosition(s, 0, h ? r : l, T).applyMatrix4(Y), g.y = T.y, this.getCartographicToPosition(u, A, l, T).applyMatrix4(Y), p.z = T.z, this.getCartographicToPosition(u, o, l, T).applyMatrix4(Y), g.z = T.z), e.getCenter(T), e.min.sub(T).multiplyScalar(1 + Ls), e.max.sub(T).multiplyScalar(1 + Ls), T.applyMatrix4(t), t.setPosition(T);
  }
  getBoundingSphere(e) {
    en(this.radius) && console.warn("EllipsoidRegion: Triaxial ellipsoids are not supported."), this.getBoundingBox(jl, $i), e.center.setFromMatrixPosition($i), e.radius = 0;
    const {
      latStart: t,
      latEnd: s,
      lonStart: i,
      lonEnd: n,
      heightStart: o,
      heightEnd: r
    } = this, l = (t + s) * 0.5, c = (i + n) * 0.5, A = t > 0, h = s < 0;
    let d;
    A ? d = t : h ? d = s : d = 0, this.getCartographicToPosition(d, i, r, T), ve(T, e), this.getCartographicToPosition(s, i, r, T), ve(T, e), this.getCartographicToPosition(s, c, r, T), ve(T, e), this.getCartographicToPosition(t, i, r, T), ve(T, e), this.getCartographicToPosition(t, c, r, T), ve(T, e), this.getCartographicToPosition(l, c, r, T), ve(T, e), this.getCartographicToPosition(t, i, o, T), ve(T, e), n - i > ft && (this.getCartographicToPosition(d, c + ft, r, T), ve(T, e)), e.radius = Math.sqrt(e.radius) * (1 + Ls);
  }
};
function Yl(a) {
  if (!a)
    return 0;
  const { format: e, type: t, image: s } = a, { width: i, height: n } = s;
  let o = Gr.getByteLength(i, n, e, t);
  return o *= a.generateMipmaps ? 4 / 3 : 1, o;
}
function Jl(a) {
  const e = /* @__PURE__ */ new Set();
  let t = 0;
  return a.traverse((s) => {
    if (s.geometry && !e.has(s.geometry) && (t += ga(s.geometry), e.add(s.geometry)), s.material) {
      const i = s.material;
      for (const n in i) {
        const o = i[n];
        o && o.isTexture && !e.has(o) && (t += Yl(o), e.add(o));
      }
    }
  }), t;
}
class Go extends Gl {
  constructor(e = ls) {
    super(), this.manager = e, this.adjustmentTransform = new P();
  }
  parse(e) {
    const t = super.parse(e), s = t.glbBytes.slice().buffer;
    return new Promise((i, n) => {
      const o = this.manager, r = this.fetchOptions, l = o.getHandler("path.gltf") || new Ne(o);
      r.credentials === "include" && r.mode === "cors" && l.setCrossOrigin("use-credentials"), "credentials" in r && l.setWithCredentials(r.credentials === "include"), r.headers && l.setRequestHeader(r.headers);
      let c = this.workingPath;
      !/[\\/]$/.test(c) && c.length && (c += "/");
      const A = this.adjustmentTransform;
      l.parse(s, c, (h) => {
        const { batchTable: d, featureTable: u } = t, { scene: g } = h, p = u.getData("RTC_CENTER", 1, "FLOAT", "VEC3");
        p && (g.position.x += p[0], g.position.y += p[1], g.position.z += p[2]), h.scene.updateMatrix(), h.scene.matrix.multiply(A), h.scene.matrix.decompose(h.scene.position, h.scene.quaternion, h.scene.scale), h.batchTable = d, h.featureTable = u, g.batchTable = d, g.featureTable = u, i(h);
      }, n);
    });
  }
}
function Wl(a) {
  const e = a >> 11, t = a >> 5 & 63, s = a & 31, i = Math.round(e / 31 * 255), n = Math.round(t / 63 * 255), o = Math.round(s / 31 * 255);
  return [i, n, o];
}
const ct = /* @__PURE__ */ new k();
function Xl(a, e, t = new v()) {
  ct.set(a, e).divideScalar(256).multiplyScalar(2).subScalar(1), t.set(ct.x, ct.y, 1 - Math.abs(ct.x) - Math.abs(ct.y));
  const s = st.clamp(-t.z, 0, 1);
  return t.x >= 0 ? t.setX(t.x - s) : t.setX(t.x + s), t.y >= 0 ? t.setY(t.y - s) : t.setY(t.y + s), t.normalize(), t;
}
const tn = {
  RGB: "color",
  POSITION: "position"
};
class Uo extends Nl {
  constructor(e = ls) {
    super(), this.manager = e;
  }
  parse(e) {
    return super.parse(e).then(async (t) => {
      const { featureTable: s, batchTable: i } = t, n = new Nn(), o = s.header.extensions, r = new v();
      let l;
      if (o && o["3DTILES_draco_point_compression"]) {
        const { byteOffset: h, byteLength: d, properties: u } = o["3DTILES_draco_point_compression"], g = this.manager.getHandler("draco.drc");
        if (g == null)
          throw new Error("PNTSLoader: dracoLoader not available.");
        const p = {};
        for (const C in u)
          if (C in tn && C in u) {
            const y = tn[C];
            p[y] = u[C];
          }
        const b = {
          attributeIDs: p,
          attributeTypes: {
            position: "Float32Array",
            color: "Uint8Array"
          },
          useUniqueIDs: !0
        }, E = s.getBuffer(h, d);
        l = await g.decodeGeometry(E, b), l.attributes.color && (n.vertexColors = !0);
      } else {
        const h = s.getData("POINTS_LENGTH"), d = s.getData("POSITION", h, "FLOAT", "VEC3"), u = s.getData("NORMAL", h, "FLOAT", "VEC3"), g = s.getData("NORMAL", h, "UNSIGNED_BYTE", "VEC2"), p = s.getData("RGB", h, "UNSIGNED_BYTE", "VEC3"), b = s.getData("RGBA", h, "UNSIGNED_BYTE", "VEC4"), E = s.getData("RGB565", h, "UNSIGNED_SHORT", "SCALAR"), C = s.getData("CONSTANT_RGBA", h, "UNSIGNED_BYTE", "VEC4"), y = s.getData("POSITION_QUANTIZED", h, "UNSIGNED_SHORT", "VEC3"), f = s.getData("QUANTIZED_VOLUME_SCALE", h, "FLOAT", "VEC3"), I = s.getData("QUANTIZED_VOLUME_OFFSET", h, "FLOAT", "VEC3");
        if (l = new rs(), y) {
          const w = new Float32Array(h * 3);
          for (let B = 0; B < h; B++)
            for (let M = 0; M < 3; M++) {
              const S = 3 * B + M;
              w[S] = y[S] / 65535 * f[M];
            }
          r.x = I[0], r.y = I[1], r.z = I[2], l.setAttribute("position", new ne(w, 3, !1));
        } else
          l.setAttribute("position", new ne(d, 3, !1));
        if (u !== null)
          l.setAttribute("normal", new ne(u, 3, !1));
        else if (g !== null) {
          const w = new Float32Array(h * 3), B = new v();
          for (let M = 0; M < h; M++) {
            const S = g[M * 2], x = g[M * 2 + 1], R = Xl(S, x, B);
            w[M * 3] = R.x, w[M * 3 + 1] = R.y, w[M * 3 + 2] = R.z;
          }
          l.setAttribute("normal", new ne(w, 3, !1));
        }
        if (b !== null)
          l.setAttribute("color", new ne(b, 4, !0)), n.vertexColors = !0, n.transparent = !0, n.depthWrite = !1;
        else if (p !== null)
          l.setAttribute("color", new ne(p, 3, !0)), n.vertexColors = !0;
        else if (E !== null) {
          const w = new Uint8Array(h * 3);
          for (let B = 0; B < h; B++) {
            const M = Wl(E[B]);
            for (let S = 0; S < 3; S++) {
              const x = 3 * B + S;
              w[x] = M[S];
            }
          }
          l.setAttribute("color", new ne(w, 3, !0)), n.vertexColors = !0;
        } else if (C !== null) {
          const w = new Ee(C[0], C[1], C[2]);
          n.color = w;
          const B = C[3] / 255;
          B < 1 && (n.opacity = B, n.transparent = !0, n.depthWrite = !1);
        }
      }
      const c = new Vn(l, n);
      c.position.copy(r), t.scene = c, t.scene.featureTable = s, t.scene.batchTable = i;
      const A = s.getData("RTC_CENTER", 1, "FLOAT", "VEC3");
      return A && (t.scene.position.x += A[0], t.scene.position.y += A[1], t.scene.position.z += A[2]), t;
    });
  }
}
const Gt = /* @__PURE__ */ new v(), qe = /* @__PURE__ */ new v(), ze = /* @__PURE__ */ new v(), ks = /* @__PURE__ */ new v(), Ut = /* @__PURE__ */ new $e(), Nt = /* @__PURE__ */ new v(), je = /* @__PURE__ */ new P(), sn = /* @__PURE__ */ new P(), nn = /* @__PURE__ */ new v(), on = /* @__PURE__ */ new P(), _s = /* @__PURE__ */ new $e(), Ps = {};
function rn(a, e, t, s) {
  if (a = a / t * 2 - 1, e = e / t * 2 - 1, s.x = a, s.y = e, s.z = 1 - Math.abs(a) - Math.abs(e), s.z < 0) {
    const i = s.x;
    s.x = (1 - Math.abs(s.y)) * (i >= 0 ? 1 : -1), s.y = (1 - Math.abs(i)) * (s.y >= 0 ? 1 : -1);
  }
  return s.normalize(), s;
}
class No extends Ul {
  constructor(e = ls) {
    super(), this.manager = e, this.adjustmentTransform = new P(), this.ellipsoid = ds.clone();
  }
  resolveExternalURL(e) {
    return this.manager.resolveURL(super.resolveExternalURL(e));
  }
  parse(e) {
    return super.parse(e).then((t) => {
      const { featureTable: s, batchTable: i } = t, n = t.glbBytes.slice().buffer;
      return new Promise((o, r) => {
        const l = this.fetchOptions, c = this.manager, A = c.getHandler("path.gltf") || new Ne(c);
        l.credentials === "include" && l.mode === "cors" && A.setCrossOrigin("use-credentials"), "credentials" in l && A.setWithCredentials(l.credentials === "include"), l.headers && A.setRequestHeader(l.headers);
        let h = t.gltfWorkingPath ?? this.workingPath;
        /[\\/]$/.test(h) || (h += "/");
        const d = this.adjustmentTransform;
        A.parse(n, h, (u) => {
          const g = s.getData("INSTANCES_LENGTH");
          let p = s.getData("POSITION", g, "FLOAT", "VEC3");
          const b = s.getData("POSITION_QUANTIZED", g, "UNSIGNED_SHORT", "VEC3"), E = s.getData("QUANTIZED_VOLUME_OFFSET", 1, "FLOAT", "VEC3"), C = s.getData("QUANTIZED_VOLUME_SCALE", 1, "FLOAT", "VEC3"), y = s.getData("NORMAL_UP", g, "FLOAT", "VEC3"), f = s.getData("NORMAL_RIGHT", g, "FLOAT", "VEC3"), I = s.getData("NORMAL_UP_OCT32P", g, "UNSIGNED_SHORT", "VEC2"), w = s.getData("NORMAL_RIGHT_OCT32P", g, "UNSIGNED_SHORT", "VEC2"), B = s.getData("SCALE_NON_UNIFORM", g, "FLOAT", "VEC3"), M = s.getData("SCALE", g, "FLOAT", "SCALAR"), S = s.getData("RTC_CENTER", 1, "FLOAT", "VEC3"), x = s.getData("EAST_NORTH_UP");
          if (!p && b) {
            p = new Float32Array(g * 3);
            for (let Q = 0; Q < g; Q++)
              p[Q * 3 + 0] = E[0] + b[Q * 3 + 0] / 65535 * C[0], p[Q * 3 + 1] = E[1] + b[Q * 3 + 1] / 65535 * C[1], p[Q * 3 + 2] = E[2] + b[Q * 3 + 2] / 65535 * C[2];
          }
          const R = new v();
          for (let Q = 0; Q < g; Q++)
            R.x += p[Q * 3 + 0] / g, R.y += p[Q * 3 + 1] / g, R.z += p[Q * 3 + 2] / g;
          const L = [], q = [];
          u.scene.updateMatrixWorld(), u.scene.traverse((Q) => {
            if (Q.isMesh) {
              q.push(Q);
              const { geometry: te, material: z } = Q, F = new li(te, z, g);
              F.position.copy(R), S && (F.position.x += S[0], F.position.y += S[1], F.position.z += S[2]), L.push(F);
            }
          });
          for (let Q = 0; Q < g; Q++) {
            ks.set(
              p[Q * 3 + 0] - R.x,
              p[Q * 3 + 1] - R.y,
              p[Q * 3 + 2] - R.z
            ), Ut.identity(), y && f ? (qe.set(
              y[Q * 3 + 0],
              y[Q * 3 + 1],
              y[Q * 3 + 2]
            ), ze.set(
              f[Q * 3 + 0],
              f[Q * 3 + 1],
              f[Q * 3 + 2]
            ), Gt.crossVectors(ze, qe).normalize(), je.makeBasis(
              ze,
              qe,
              Gt
            ), Ut.setFromRotationMatrix(je)) : I && w && (rn(
              I[Q * 2 + 0],
              I[Q * 2 + 1],
              65535,
              qe
            ), rn(
              w[Q * 2 + 0],
              w[Q * 2 + 1],
              65535,
              ze
            ), Gt.crossVectors(ze, qe).normalize(), je.makeBasis(
              ze,
              qe,
              Gt
            ), Ut.setFromRotationMatrix(je)), Nt.set(1, 1, 1), B && Nt.set(
              B[Q * 3 + 0],
              B[Q * 3 + 1],
              B[Q * 3 + 2]
            ), M && Nt.multiplyScalar(M[Q]);
            for (let te = 0, z = L.length; te < z; te++) {
              const F = L[te];
              _s.copy(Ut), x && (F.updateMatrixWorld(), nn.copy(ks).applyMatrix4(F.matrixWorld), this.ellipsoid.getPositionToCartographic(nn, Ps), this.ellipsoid.getEastNorthUpFrame(Ps.lat, Ps.lon, on), _s.setFromRotationMatrix(on)), je.compose(ks, _s, Nt).multiply(d);
              const j = q[te];
              sn.multiplyMatrices(je, j.matrixWorld), F.setMatrixAt(Q, sn);
            }
          }
          u.scene.clear(), u.scene.add(...L), u.batchTable = i, u.featureTable = s, u.scene.batchTable = i, u.scene.featureTable = s, o(u);
        }, r);
      });
    });
  }
}
class Zl extends Vl {
  constructor(e = ls) {
    super(), this.manager = e, this.adjustmentTransform = new P(), this.ellipsoid = ds.clone();
  }
  parse(e) {
    const t = super.parse(e), { manager: s, ellipsoid: i, adjustmentTransform: n } = this, o = [];
    for (const r in t.tiles) {
      const { type: l, buffer: c } = t.tiles[r];
      switch (l) {
        case "b3dm": {
          const A = c.slice(), h = new Go(s);
          h.workingPath = this.workingPath, h.fetchOptions = this.fetchOptions, h.adjustmentTransform.copy(n);
          const d = h.parse(A.buffer);
          o.push(d);
          break;
        }
        case "pnts": {
          const A = c.slice(), h = new Uo(s);
          h.workingPath = this.workingPath, h.fetchOptions = this.fetchOptions;
          const d = h.parse(A.buffer);
          o.push(d);
          break;
        }
        case "i3dm": {
          const A = c.slice(), h = new No(s);
          h.workingPath = this.workingPath, h.fetchOptions = this.fetchOptions, h.ellipsoid.copy(i), h.adjustmentTransform.copy(n);
          const d = h.parse(A.buffer);
          o.push(d);
          break;
        }
      }
    }
    return Promise.all(o).then((r) => {
      const l = new Xe();
      return r.forEach((c) => {
        l.add(c.scene);
      }), {
        tiles: r,
        scene: l
      };
    });
  }
}
const At = /* @__PURE__ */ new P();
class $l extends Xe {
  constructor(e) {
    super(), this.isTilesGroup = !0, this.name = "TilesRenderer.TilesGroup", this.tilesRenderer = e, this.matrixWorldInverse = new P();
  }
  raycast(e, t) {
    return this.tilesRenderer.optimizeRaycast ? (this.tilesRenderer.raycast(e, t), !1) : !0;
  }
  updateMatrixWorld(e) {
    if (this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldNeedsUpdate || e) {
      this.parent === null ? At.copy(this.matrix) : At.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1;
      const t = At.elements, s = this.matrixWorld.elements;
      let i = !1;
      for (let n = 0; n < 16; n++) {
        const o = t[n], r = s[n];
        if (Math.abs(o - r) > Number.EPSILON) {
          i = !0;
          break;
        }
      }
      if (i) {
        this.matrixWorld.copy(At), this.matrixWorldInverse.copy(At).invert();
        const n = this.children;
        for (let o = 0, r = n.length; o < r; o++)
          n[o].updateMatrixWorld();
      }
    }
  }
  updateWorldMatrix(e, t) {
    this.parent && e && this.parent.updateWorldMatrix(e, !1), this.updateMatrixWorld(!0);
  }
}
const Vo = /* @__PURE__ */ new is(), Gs = /* @__PURE__ */ new v(), Vt = [];
function Oo(a, e) {
  return a.distance - e.distance;
}
function Ho(a, e, t, s) {
  const { scene: i } = a.engineData;
  t.invokeOnePlugin((n) => n.raycastTile && n.raycastTile(a, i, e, s)) || e.intersectObject(i, !0, s);
}
function ec(a, e, t) {
  Ho(a, e, t, Vt), Vt.sort(Oo);
  const s = Vt[0] || null;
  return Vt.length = 0, s;
}
function qo(a) {
  return "traversal" in a;
}
function zo(a, e, t, s = null) {
  const { group: i, activeTiles: n } = a;
  s === null && (s = Vo, s.copy(t.ray).applyMatrix4(i.matrixWorldInverse));
  const o = [], r = e.children;
  for (let A = 0, h = r.length; A < h; A++) {
    const d = r[A];
    !qo(d) || !d.traversal.used || d.engineData.boundingVolume.intersectRay(s, Gs) !== null && (Gs.applyMatrix4(i.matrixWorld), o.push({
      distance: Gs.distanceToSquared(t.ray.origin),
      tile: d
    }));
  }
  o.sort(Oo);
  let l = null, c = 1 / 0;
  if (n.has(e)) {
    const A = ec(e, t, a);
    A && (l = A, c = A.distance * A.distance);
  }
  for (let A = 0, h = o.length; A < h; A++) {
    const d = o[A], u = d.distance, g = d.tile;
    if (u > c)
      break;
    const p = zo(a, g, t, s);
    if (p) {
      const b = p.distance * p.distance;
      b < c && (l = p, c = b);
    }
  }
  return l;
}
function jo(a, e, t, s, i = null) {
  if (!qo(e))
    return;
  const { group: n, activeTiles: o } = a, { boundingVolume: r } = e.engineData;
  if (i === null && (i = Vo, i.copy(t.ray).applyMatrix4(n.matrixWorldInverse)), !e.traversal.used || !r.intersectsRay(i))
    return;
  o.has(e) && Ho(e, t, a, s);
  const l = e.children;
  for (let c = 0, A = l.length; c < A; c++)
    jo(a, l[c], t, s, i);
}
const ge = /* @__PURE__ */ new v(), pe = /* @__PURE__ */ new v(), fe = /* @__PURE__ */ new v(), an = /* @__PURE__ */ new v(), ln = /* @__PURE__ */ new v();
class tc {
  constructor() {
    this.sphere = null, this.obb = null, this.region = null, this.regionObb = null;
  }
  intersectsRay(e) {
    const t = this.sphere, s = this.obb || this.regionObb;
    return !(t && !e.intersectsSphere(t) || s && !s.intersectsRay(e));
  }
  intersectRay(e, t = null) {
    const s = this.sphere, i = this.obb || this.regionObb;
    let n = -1 / 0, o = -1 / 0;
    s && e.intersectSphere(s, an) && (n = s.containsPoint(e.origin) ? 0 : e.origin.distanceToSquared(an)), i && i.intersectRay(e, ln) && (o = i.containsPoint(e.origin) ? 0 : e.origin.distanceToSquared(ln));
    const r = Math.max(n, o);
    return r === -1 / 0 ? null : (e.at(Math.sqrt(r), t), t);
  }
  distanceToPoint(e) {
    const t = this.sphere, s = this.obb || this.regionObb;
    let i = -1 / 0, n = -1 / 0;
    return t && (i = Math.max(t.distanceToPoint(e), 0)), s && (n = s.distanceToPoint(e)), i > n ? i : n;
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
    const s = new Zi();
    ge.set(e[3], e[4], e[5]), pe.set(e[6], e[7], e[8]), fe.set(e[9], e[10], e[11]);
    const i = ge.length(), n = pe.length(), o = fe.length();
    ge.normalize(), pe.normalize(), fe.normalize(), i === 0 && ge.crossVectors(pe, fe), n === 0 && pe.crossVectors(ge, fe), o === 0 && fe.crossVectors(ge, pe), s.transform.set(
      ge.x,
      pe.x,
      fe.x,
      e[0],
      ge.y,
      pe.y,
      fe.y,
      e[1],
      ge.z,
      pe.z,
      fe.z,
      e[2],
      0,
      0,
      0,
      1
    ).premultiply(t), s.box.min.set(-i, -n, -o), s.box.max.set(i, n, o), s.update(), this.obb = s;
  }
  setSphereData(e, t, s, i, n) {
    const o = new Et();
    o.center.set(e, t, s), o.radius = i, o.applyMatrix4(n), this.sphere = o;
  }
  setRegionData(e, t, s, i, n, o, r) {
    const l = new Kl(
      ...e.radius,
      s,
      n,
      t,
      i,
      o,
      r
    ), c = new Zi();
    l.getBoundingBox(c.box, c.transform), c.update(), this.region = l, this.regionObb = c;
  }
}
const sc = /* @__PURE__ */ new Jn();
function ic(a, e, t, s) {
  const i = sc.set(
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
class nc extends Nr {
  constructor() {
    super(), this.points = Array(8).fill().map(() => new v());
  }
  setFromProjectionMatrix(e, t) {
    return super.setFromProjectionMatrix(e, t), this.calculateFrustumPoints(), this;
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
      ic(s[0], s[1], s[2], t[i]);
    });
  }
}
const cn = /* @__PURE__ */ new P(), An = /* @__PURE__ */ new Yn(), Ko = Symbol("INITIAL_FRUSTUM_CULLED"), Ot = /* @__PURE__ */ new P(), ht = /* @__PURE__ */ new v(), Us = /* @__PURE__ */ new k(), oc = /* @__PURE__ */ new v(1, 0, 0), rc = /* @__PURE__ */ new v(0, 1, 0);
function hn(a, e) {
  a.traverse((t) => {
    t.frustumCulled = t[Ko] && e;
  });
}
let ac = class extends _l {
  get autoDisableRendererCulling() {
    return this._autoDisableRendererCulling;
  }
  set autoDisableRendererCulling(e) {
    this._autoDisableRendererCulling !== e && (super._autoDisableRendererCulling = e, this.forEachLoadedModel((t) => {
      hn(t, !e);
    }));
  }
  get optimizeRaycast() {
    return this._optimizeRaycast;
  }
  set optimizeRaycast(e) {
    console.warn('TilesRenderer: The "optimizeRaycast" option has been deprecated.'), this._optimizeRaycast = e;
  }
  constructor(...e) {
    super(...e), this.group = new $l(this), this.ellipsoid = ds.clone(), this.cameras = [], this.cameraMap = /* @__PURE__ */ new Map(), this.cameraInfo = [], this._optimizeRaycast = !0, this._upRotationMatrix = new P(), this._bytesUsed = /* @__PURE__ */ new WeakMap(), this._autoDisableRendererCulling = !0, this.manager = new Ur(), this._listeners = {};
  }
  addEventListener(e, t) {
    e === "load-tile-set" && (console.warn('TilesRenderer: "load-tile-set" event has been deprecated. Use "load-tileset" instead.'), e = "load-tileset"), vt.prototype.addEventListener.call(this, e, t);
  }
  hasEventListener(e, t) {
    return e === "load-tile-set" && (console.warn('TilesRenderer: "load-tile-set" event has been deprecated. Use "load-tileset" instead.'), e = "load-tileset"), vt.prototype.hasEventListener.call(this, e, t);
  }
  removeEventListener(e, t) {
    e === "load-tile-set" && (console.warn('TilesRenderer: "load-tile-set" event has been deprecated. Use "load-tileset" instead.'), e = "load-tileset"), vt.prototype.removeEventListener.call(this, e, t);
  }
  dispatchEvent(e) {
    "tileset" in e && Object.defineProperty(e, "tileSet", {
      get() {
        return console.warn('TilesRenderer: "event.tileSet" has been deprecated. Use "event.tileset" instead.'), e.tileset;
      },
      enumerable: !1,
      configurable: !0
    }), vt.prototype.dispatchEvent.call(this, e);
  }
  /* Public API */
  getBoundingBox(e) {
    if (!this.root)
      return !1;
    const t = this.root.engineData.boundingVolume;
    return t ? (t.getAABB(e), !0) : !1;
  }
  getOrientedBoundingBox(e, t) {
    if (!this.root)
      return !1;
    const s = this.root.engineData.boundingVolume;
    return s ? (s.getOBB(e, t), !0) : !1;
  }
  getBoundingSphere(e) {
    if (!this.root)
      return !1;
    const t = this.root.engineData.boundingVolume;
    return t ? (t.getSphere(e), !0) : !1;
  }
  forEachLoadedModel(e) {
    this.traverse((t) => {
      const s = t.engineData && t.engineData.scene;
      s && e(s, t);
    }, null, !1);
  }
  raycast(e, t) {
    if (this.root)
      if (e.firstHitOnly) {
        const s = zo(this, this.root, e);
        s && t.push(s);
      } else
        jo(this, this.root, e, t);
  }
  hasCamera(e) {
    return this.cameraMap.has(e);
  }
  setCamera(e) {
    const t = this.cameras, s = this.cameraMap;
    return s.has(e) ? !1 : (s.set(e, new k()), t.push(e), this.dispatchEvent({ type: "add-camera", camera: e }), !0);
  }
  setResolution(e, t, s) {
    const i = this.cameraMap;
    if (!i.has(e))
      return !1;
    const n = t.isVector2 ? t.x : t, o = t.isVector2 ? t.y : s, r = i.get(e);
    return (r.width !== n || r.height !== o) && (r.set(n, o), this.dispatchEvent({ type: "camera-resolution-change" })), !0;
  }
  setResolutionFromRenderer(e, t) {
    return t.getSize(Us), this.setResolution(e, Us.x, Us.y);
  }
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
          this._upRotationMatrix.makeRotationAxis(rc, -Math.PI / 2);
          break;
        case "y":
          this._upRotationMatrix.makeRotationAxis(oc, Math.PI / 2);
          break;
      }
      if ("3DTILES_ellipsoid" in i) {
        const n = i["3DTILES_ellipsoid"], { ellipsoid: o } = this;
        o.name = n.body, n.radii ? o.radius.set(...n.radii) : o.radius.set(1, 1, 1);
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
        position: new v(),
        invScale: -1,
        pixelSize: 0
        // used if isOrthographic:true
      });
    ht.setFromMatrixScale(e.matrixWorldInverse), Math.abs(Math.max(ht.x - ht.y, ht.x - ht.z)) > 1e-6 && console.warn("ThreeTilesRenderer : Non uniform scale used for tile which may cause issues when calculating screen space error.");
    for (let n = 0, o = i.length; n < o; n++) {
      const r = t[n], l = i[n], c = l.frustum, A = l.position, h = s.get(r);
      (h.width === 0 || h.height === 0) && console.warn("TilesRenderer: resolution for camera error calculation is not set.");
      const d = r.projectionMatrix.elements;
      if (l.isOrthographic = d[15] === 1, l.isOrthographic) {
        const u = 2 / d[0], g = 2 / d[5];
        l.pixelSize = Math.max(g / h.height, u / h.width);
      } else
        l.sseDenominator = 2 / d[5] / h.height;
      Ot.copy(e.matrixWorld), Ot.premultiply(r.matrixWorldInverse), Ot.premultiply(r.projectionMatrix), c.setFromProjectionMatrix(Ot), A.set(0, 0, 0), A.applyMatrix4(r.matrixWorld), A.applyMatrix4(e.matrixWorldInverse);
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
    const i = new P();
    if (e.transform) {
      const r = e.transform;
      for (let l = 0; l < 16; l++)
        i.elements[l] = r[l];
    }
    s && i.premultiply(s.engineData.transform);
    const n = new P().copy(i).invert(), o = new tc();
    "sphere" in e.boundingVolume && o.setSphereData(...e.boundingVolume.sphere, i), "box" in e.boundingVolume && o.setObbData(e.boundingVolume.box, i), "region" in e.boundingVolume && o.setRegionData(this.ellipsoid, ...e.boundingVolume.region), e.engineData.transform = i, e.engineData.transformInverse = n, e.engineData.boundingVolume = o, e.engineData.geometry = null, e.engineData.materials = null, e.engineData.textures = null;
  }
  async parseTile(e, t, s, i, n) {
    const o = t.engineData, r = ui(i), l = this.fetchOptions, c = this.manager;
    let A = null;
    const h = o.transform, d = this._upRotationMatrix, u = (Ue(e) || s).toLowerCase();
    switch (u) {
      case "b3dm": {
        const f = new Go(c);
        f.workingPath = r, f.fetchOptions = l, f.adjustmentTransform.copy(d), A = f.parse(e);
        break;
      }
      case "pnts": {
        const f = new Uo(c);
        f.workingPath = r, f.fetchOptions = l, A = f.parse(e);
        break;
      }
      case "i3dm": {
        const f = new No(c);
        f.workingPath = r, f.fetchOptions = l, f.adjustmentTransform.copy(d), f.ellipsoid.copy(this.ellipsoid), A = f.parse(e);
        break;
      }
      case "cmpt": {
        const f = new Zl(c);
        f.workingPath = r, f.fetchOptions = l, f.adjustmentTransform.copy(d), f.ellipsoid.copy(this.ellipsoid), A = f.parse(e).then((I) => I.scene);
        break;
      }
      // 3DTILES_content_gltf
      case "gltf":
      case "glb": {
        const f = c.getHandler("path.gltf") || c.getHandler("path.glb") || new Ne(c);
        f.setWithCredentials(l.credentials === "include"), f.setRequestHeader(l.headers || {}), l.credentials === "include" && l.mode === "cors" && f.setCrossOrigin("use-credentials");
        let I = f.resourcePath || f.path || r;
        !/[\\/]$/.test(I) && I.length && (I += "/"), A = f.parseAsync(e, I).then((w) => {
          w.scene = w.scene || new Xe();
          const { scene: B } = w;
          return B.updateMatrix(), B.matrix.multiply(d).decompose(B.position, B.quaternion, B.scale), w;
        });
        break;
      }
      default: {
        A = this.invokeOnePlugin((f) => f.parseToMesh && f.parseToMesh(e, t, s, i, n));
        break;
      }
    }
    const g = await A;
    if (g === null)
      throw new Error(`TilesRenderer: Content type "${u}" not supported.`);
    let p, b;
    g.isObject3D ? (p = g, b = null) : (p = g.scene, b = g), p.updateMatrix(), p.matrix.premultiply(h), p.matrix.decompose(p.position, p.quaternion, p.scale), await this.invokeAllPlugins((f) => f.processTileModel && f.processTileModel(p, t)), p.traverse((f) => {
      f[Ko] = f.frustumCulled;
    }), hn(p, !this.autoDisableRendererCulling);
    const E = [], C = [], y = [];
    if (p.traverse((f) => {
      if (f.geometry && C.push(f.geometry), f.material) {
        const I = f.material;
        E.push(f.material);
        for (const w in I) {
          const B = I[w];
          B && B.isTexture && y.push(B);
        }
      }
    }), n.aborted) {
      for (let f = 0, I = y.length; f < I; f++) {
        const w = y[f];
        w.image instanceof ImageBitmap && w.image.close(), w.dispose();
      }
      return;
    }
    o.materials = E, o.geometry = C, o.textures = y, o.scene = p, o.metadata = b;
  }
  disposeTile(e) {
    super.disposeTile(e);
    const t = e.engineData;
    if (t.scene) {
      const s = t.materials, i = t.geometry, n = t.textures, o = t.scene.parent;
      t.scene.traverse((r) => {
        r.userData.meshFeatures && r.userData.meshFeatures.dispose(), r.userData.structuralMetadata && r.userData.structuralMetadata.dispose();
      });
      for (let r = 0, l = i.length; r < l; r++)
        i[r].dispose();
      for (let r = 0, l = s.length; r < l; r++)
        s[r].dispose();
      for (let r = 0, l = n.length; r < l; r++) {
        const c = n[r];
        c.image instanceof ImageBitmap && c.image.close(), c.dispose();
      }
      o && o.remove(t.scene), t.scene = null, t.materials = null, t.textures = null, t.geometry = null, t.metadata = null;
    }
  }
  setTileVisible(e, t) {
    const s = e.engineData.scene, i = this.group;
    t ? s && (i.add(s), s.updateMatrixWorld(!0)) : s && i.remove(s), super.setTileVisible(e, t);
  }
  calculateBytesUsed(e, t) {
    const s = this._bytesUsed;
    return !s.has(e) && t && s.set(e, Jl(t)), s.get(e) ?? null;
  }
  calculateTileViewError(e, t) {
    const s = e.engineData, i = this.cameras, n = this.cameraInfo, o = s.boundingVolume;
    let r = !1, l = 0, c = 1 / 0, A = 0, h = 1 / 0;
    for (let d = 0, u = i.length; d < u; d++) {
      const g = n[d];
      let p, b;
      if (g.isOrthographic) {
        const C = g.pixelSize;
        p = e.geometricError / C, b = 1 / 0;
      } else {
        const C = g.sseDenominator;
        b = o.distanceToPoint(g.position), p = b === 0 ? 1 / 0 : e.geometricError / (b * C);
      }
      const E = n[d].frustum;
      o.intersectsFrustum(E) && (r = !0, l = Math.max(l, p), c = Math.min(c, b)), A = Math.max(A, p), h = Math.min(h, b);
    }
    r ? (t.inView = !0, t.error = l, t.distanceFromCamera = c) : (t.inView = !1, t.error = A, t.distanceFromCamera = h);
  }
  // adjust the rotation of the group such that Y is altitude, X is North, and Z is East
  setLatLonToYUp(e, t) {
    console.warn("TilesRenderer: setLatLonToYUp is deprecated. Use the ReorientationPlugin, instead.");
    const { ellipsoid: s, group: i } = this;
    An.set(Math.PI / 2, Math.PI / 2, 0), cn.makeRotationFromEuler(An), s.getEastNorthUpFrame(e, t, 0, i.matrix).multiply(cn).invert().decompose(
      i.position,
      i.quaternion,
      i.scale
    ), i.updateMatrixWorld(!0);
  }
  dispose() {
    super.dispose(), this.group.removeFromParent();
  }
};
function Zt(a) {
  return a.implicitTilingData.root.implicitTiling.subdivisionScheme === "OCTREE";
}
function Ns(a) {
  return Zt(a) ? 8 : 4;
}
function lc(a, e) {
  if (!a)
    return [0, 0, 0];
  const t = a.implicitTilingData.x, s = a.implicitTilingData.y, i = a.implicitTilingData.z, n = 2 * t + e % 2, o = 2 * s + Math.floor(e / 2) % 2, r = Zt(a) ? 2 * i + Math.floor(e / 4) % 2 : 0;
  return [n, o, r];
}
class dn {
  constructor(e, t) {
    this.parent = e, this.children = [], this.geometricError = 0, this.boundingVolume = null;
    const [s, i, n] = lc(e, t);
    this.implicitTilingData = {
      level: e.implicitTilingData.level + 1,
      root: e.implicitTilingData.root,
      subtreeIdx: t,
      x: s,
      y: i,
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
class cc extends It {
  constructor(e) {
    super(), this.tile = e, this.rootTile = e.implicitTilingData.root, this.workingPath = null;
  }
  /**
   * A helper object for storing the two parts of the subtree binary
   *
   * @typedef {object} Subtree
   * @property {number} version
   * @property {JSON} subtreeJson
   * @property {ArrayBuffer} subtreeByte
   * @private
   */
  /**
   *
   * @param buffer
   * @return {Subtree}
   */
  parseBuffer(e) {
    const t = new DataView(e);
    let s = 0;
    const i = Ue(t);
    console.assert(i === "subt", 'SUBTREELoader: The magic bytes equal "subt".'), s += 4;
    const n = t.getUint32(s, !0);
    console.assert(n === 1, 'SUBTREELoader: The version listed in the header is "1".'), s += 4;
    const o = t.getUint32(s, !0);
    s += 8;
    const r = t.getUint32(s, !0);
    s += 8;
    const l = JSON.parse(di(new Uint8Array(e, s, o)));
    s += o;
    const c = e.slice(s, s + r);
    return {
      version: n,
      subtreeJson: l,
      subtreeByte: c
    };
  }
  async parse(e) {
    const t = this.parseBuffer(e), s = t.subtreeJson;
    s.contentAvailabilityHeaders = [].concat(s.contentAvailability);
    const i = this.preprocessBuffers(s.buffers), n = this.preprocessBufferViews(
      s.bufferViews,
      i
    );
    this.markActiveBufferViews(s, n);
    const o = await this.requestActiveBuffers(
      i,
      t.subtreeByte
    ), r = this.parseActiveBufferViews(n, o);
    this.parseAvailability(t, s, r), this.expandSubtree(this.tile, t);
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
    const n = e.contentAvailabilityHeaders;
    for (let r = 0; r < n.length; r++)
      s = void 0, isNaN(n[r].bitstream) ? isNaN(n[r].bufferView) || (s = t[n[r].bufferView]) : s = t[n[r].bitstream], s && (s.isActive = !0, s.bufferHeader.isActive = !0);
    s = void 0;
    const o = e.childSubtreeAvailability;
    isNaN(o.bitstream) ? isNaN(o.bufferView) || (s = t[o.bufferView]) : s = t[o.bitstream], s && (s.isActive = !0, s.bufferHeader.isActive = !0);
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
   * @returns {object} buffersU8 A dictionary of buffer index to a Uint8Array of its contents.
   * @private
   */
  async requestActiveBuffers(e, t) {
    const s = [];
    for (let o = 0; o < e.length; o++) {
      const r = e[o];
      if (!r.isActive)
        s.push(Promise.resolve());
      else if (r.isExternal) {
        const l = this.parseImplicitURIBuffer(
          this.tile,
          this.rootTile.implicitTiling.subtrees.uri,
          r.uri
        ), c = fetch(l, this.fetchOptions).then((A) => {
          if (!A.ok)
            throw new Error(`SUBTREELoader: Failed to load external buffer from ${r.uri} with error code ${A.status}.`);
          return A.arrayBuffer();
        }).then((A) => new Uint8Array(A));
        s.push(c);
      } else
        s.push(Promise.resolve(new Uint8Array(t)));
    }
    const i = await Promise.all(s), n = {};
    for (let o = 0; o < i.length; o++) {
      const r = i[o];
      r && (n[o] = r);
    }
    return n;
  }
  /**
   * Go through the list of buffer views, and if they are marked as active,
   * extract a subarray from one of the active buffers.
   *
   * @param {BufferViewHeader[]} bufferViewHeaders
   * @param {object} buffersU8 A dictionary of buffer index to a Uint8Array of its contents.
   * @returns {object} A dictionary of buffer view index to a Uint8Array of its contents.
   * @private
   */
  parseActiveBufferViews(e, t) {
    const s = {};
    for (let i = 0; i < e.length; i++) {
      const n = e[i];
      if (!n.isActive)
        continue;
      const o = n.byteOffset, r = o + n.byteLength, l = t[n.buffer];
      s[i] = l.slice(o, r);
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
   * @typedef {object} BufferHeader
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
   * @typedef {object} BufferViewHeader
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
    const i = Ns(this.rootTile), n = this.rootTile.implicitTiling.subtreeLevels, o = (Math.pow(i, n) - 1) / (i - 1), r = Math.pow(i, n);
    e._tileAvailability = this.parseAvailabilityBitstream(
      t.tileAvailability,
      s,
      o
    ), e._contentAvailabilityBitstreams = [];
    for (let l = 0; l < t.contentAvailabilityHeaders.length; l++) {
      const c = this.parseAvailabilityBitstream(
        t.contentAvailabilityHeaders[l],
        s,
        // content availability has the same length as tile availability.
        o
      );
      e._contentAvailabilityBitstreams.push(c);
    }
    e._childSubtreeAvailability = this.parseAvailabilityBitstream(
      t.childSubtreeAvailability,
      s,
      r
    );
  }
  /**
   * Given the JSON describing an availability bitstream, turn it into an
   * in-memory representation using an object. This handles bitstreams from a bufferView.
   *
   * @param {Object} availabilityJson A JSON object representing the availability.
   * @param {Object} bufferViewsU8 A dictionary of buffer view index to its Uint8Array contents.
   * @param {number} lengthBits The length of the availability bitstream in bits.
   * @returns {object}
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
    const s = dn.clone(e);
    for (let o = 0; t && o < t._contentAvailabilityBitstreams.length; o++)
      if (t && this.getBit(t._contentAvailabilityBitstreams[o], 0)) {
        s.content = { uri: this.parseImplicitURI(e, this.rootTile.content.uri) };
        break;
      }
    e.children.push(s);
    const i = this.transcodeSubtreeTiles(
      s,
      t
    ), n = this.listChildSubtrees(t, i);
    for (let o = 0; o < n.length; o++) {
      const r = n[o], l = r.tile, c = this.deriveChildTile(
        null,
        l,
        null,
        r.childMortonIndex
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
    for (let n = 1; n < this.rootTile.implicitTiling.subtreeLevels; n++) {
      const o = Ns(this.rootTile), r = (Math.pow(o, n) - 1) / (o - 1), l = o * s.length;
      for (let c = 0; c < l; c++) {
        const A = r + c, h = c >> Math.log2(o), d = s[h];
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
    const n = new dn(t, i);
    n.boundingVolume = this.getTileBoundingVolume(n), n.geometricError = this.getGeometricError(n);
    for (let o = 0; e && o < e._contentAvailabilityBitstreams.length; o++)
      if (e && this.getBit(e._contentAvailabilityBitstreams[o], s)) {
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
    const s = t >> 3, i = t % 8;
    return (new Uint8Array(e.bitstream)[s] >> i & 1) === 1;
  }
  /**
   * //TODO Adapt for Sphere
   * To maintain numerical stability during this subdivision process,
   * the actual bounding volumes should not be computed progressively by subdividing a non-root tile volume.
   * Instead, the exact bounding volumes are computed directly for a given level.
   * @param {Object | SubtreeTile} tile
   * @return {Object} object containing the bounding volume.
   */
  getTileBoundingVolume(e) {
    const t = {};
    if (this.rootTile.boundingVolume.region) {
      const s = [...this.rootTile.boundingVolume.region], i = s[0], n = s[2], o = s[1], r = s[3], l = (n - i) / Math.pow(2, e.implicitTilingData.level), c = (r - o) / Math.pow(2, e.implicitTilingData.level);
      s[0] = i + l * e.implicitTilingData.x, s[2] = i + l * (e.implicitTilingData.x + 1), s[1] = o + c * e.implicitTilingData.y, s[3] = o + c * (e.implicitTilingData.y + 1);
      for (let A = 0; A < 4; A++) {
        const h = s[A];
        h < -Math.PI ? s[A] += 2 * Math.PI : h > Math.PI && (s[A] -= 2 * Math.PI);
      }
      if (Zt(e)) {
        const A = s[4], h = (s[5] - A) / Math.pow(2, e.implicitTilingData.level);
        s[4] = A + h * e.implicitTilingData.z, s[5] = A + h * (e.implicitTilingData.z + 1);
      }
      t.region = s;
    }
    if (this.rootTile.boundingVolume.box) {
      const s = [...this.rootTile.boundingVolume.box], i = 2 ** e.implicitTilingData.level - 1, n = Math.pow(2, -e.implicitTilingData.level), o = Zt(e) ? 3 : 2;
      for (let r = 0; r < o; r++) {
        s[3 + r * 3 + 0] *= n, s[3 + r * 3 + 1] *= n, s[3 + r * 3 + 2] *= n;
        const l = s[3 + r * 3 + 0], c = s[3 + r * 3 + 1], A = s[3 + r * 3 + 2], h = r === 0 ? e.implicitTilingData.x : r === 1 ? e.implicitTilingData.y : e.implicitTilingData.z;
        s[0] += 2 * l * (-0.5 * i + h), s[1] += 2 * c * (-0.5 * i + h), s[2] += 2 * A * (-0.5 * i + h);
      }
      t.box = s;
    }
    return t;
  }
  /**
   * Each child’s geometricError is half of its parent’s geometricError.
   * @param {Object | SubtreeTile} tile
   * @return {number}
   */
  getGeometricError(e) {
    return this.rootTile.geometricError / Math.pow(2, e.implicitTilingData.level);
  }
  /**
   * Determine what child subtrees exist and return a list of information.
   *
   * @param {Object} subtree The subtree for looking up availability.
   * @param {Array} bottomRow The bottom row of tiles in a transcoded subtree.
   * @returns {[]} A list of identifiers for the child subtrees.
   * @private
   */
  listChildSubtrees(e, t) {
    const s = [], i = Ns(this.rootTile);
    for (let n = 0; n < t.length; n++) {
      const o = t[n];
      if (o !== void 0)
        for (let r = 0; r < i; r++) {
          const l = n * i + r;
          this.getBit(e._childSubtreeAvailability, l) && s.push({
            tile: o,
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
    const i = this.parseImplicitURI(e, t), n = new URL(i, this.workingPath + "/");
    return n.pathname = n.pathname.substring(0, n.pathname.lastIndexOf("/")), new URL(n.pathname + "/" + s, this.workingPath + "/").toString();
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
      const i = new cc(t);
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
const hc = new On(-1, 1, 1, -1, 0, 1);
class dc extends rs {
  constructor() {
    super(), this.setAttribute("position", new Jt([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), this.setAttribute("uv", new Jt([0, 2, 0, 0, 2, 0], 2));
  }
}
const uc = new dc();
class Yo {
  /**
   * Constructs a new full screen quad.
   *
   * @param {?Material} material - The material to render te full screen quad with.
   */
  constructor(e) {
    this._mesh = new as(uc, e);
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
    e.render(this._mesh, hc);
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
function N(a, e, t) {
  return a && e in a ? a[e] : t;
}
function Jo(a) {
  return a !== "BOOLEAN" && a !== "STRING" && a !== "ENUM";
}
function gc(a) {
  return /^FLOAT/.test(a);
}
function wt(a) {
  return /^VEC/.test(a);
}
function St(a) {
  return /^MAT/.test(a);
}
function Wo(a, e, t, s = null) {
  return St(t) || wt(t) ? s.fromArray(a, e) : a[e];
}
function ni(a) {
  const { type: e, componentType: t } = a;
  switch (e) {
    case "SCALAR":
      return t === "INT64" ? 0n : 0;
    case "VEC2":
      return new k();
    case "VEC3":
      return new v();
    case "VEC4":
      return new nt();
    case "MAT2":
      return new jr();
    case "MAT3":
      return new Jn();
    case "MAT4":
      return new P();
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
function un(a, e) {
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
function Ct(a, e = null) {
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
function pc(a, e = null) {
  if (a.array) {
    e = e && Array.isArray(e) ? e : [], e.length = a.count;
    for (let t = 0, s = e.length; t < s; t++)
      e[t] = $t(a, e[t]);
  } else
    e = $t(a, e);
  return e;
}
function $t(a, e = null) {
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
  } else if (St(s))
    e.fromArray(t);
  else if (wt(s))
    e.fromArray(t);
  else
    return t;
}
function fc(a, e) {
  if (a.noData === null)
    return e;
  const t = a.noData, s = a.type;
  if (Array.isArray(e))
    for (let o = 0, r = e.length; o < r; o++)
      e[o] = i(e[o]);
  else
    e = i(e);
  return e;
  function i(o) {
    return n(o) && (o = $t(a, o)), o;
  }
  function n(o) {
    if (St(s)) {
      const r = o.elements;
      for (let l = 0, c = t.length; l < c; l++)
        if (t[l] !== r[l])
          return !1;
      return !0;
    } else if (wt(s)) {
      for (let r = 0, l = t.length; r < l; r++)
        if (t[r] !== o.getComponent(r))
          return !1;
      return !0;
    } else
      return t === o;
  }
}
function mc(a, e) {
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
function bc(a, e) {
  const {
    type: t,
    componentType: s,
    scale: i,
    offset: n,
    normalized: o
  } = a;
  if (Array.isArray(e))
    for (let h = 0, d = e.length; h < d; h++)
      e[h] = r(e[h]);
  else
    e = r(e);
  return e;
  function r(h) {
    return St(t) ? h = c(h) : wt(t) ? h = l(h) : h = A(h), h;
  }
  function l(h) {
    return h.x = A(h.x), h.y = A(h.y), "z" in h && (h.z = A(h.z)), "w" in h && (h.w = A(h.w)), h;
  }
  function c(h) {
    const d = h.elements;
    for (let u = 0, g = d.length; u < g; u++)
      d[u] = A(d[u]);
    return h;
  }
  function A(h) {
    return o && (h = mc(s, h)), (o || gc(s)) && (h = h * i + n), h;
  }
}
function bi(a, e, t = null) {
  if (a.array) {
    Array.isArray(e) || (e = new Array(a.count || 0)), e.length = t !== null ? t : a.count;
    for (let s = 0, i = e.length; s < i; s++)
      un(a.type, e[s]) || (e[s] = ni(a));
  } else
    un(a.type, e) || (e = ni(a));
  return e;
}
function es(a, e) {
  for (const t in e)
    t in a || delete e[t];
  for (const t in a) {
    const s = a[t];
    e[t] = bi(s, e[t]);
  }
}
function Cc(a) {
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
class us {
  constructor(e, t, s = null) {
    this.name = t.name || null, this.description = t.description || null, this.type = t.type, this.componentType = t.componentType || null, this.enumType = t.enumType || null, this.array = t.array || !1, this.count = t.count || 0, this.normalized = t.normalized || !1, this.offset = t.offset || 0, this.scale = N(t, "scale", 1), this.max = N(t, "max", 1 / 0), this.min = N(t, "min", -1 / 0), this.required = t.required || !1, this.noData = N(t, "noData", null), this.default = N(t, "default", null), this.semantic = N(t, "semantic", null), this.enumSet = null, this.accessorProperty = s, s && (this.offset = N(s, "offset", this.offset), this.scale = N(s, "scale", this.scale), this.max = N(s, "max", this.max), this.min = N(s, "min", this.min)), t.type === "ENUM" && (this.enumSet = e[this.enumType], this.componentType === null && (this.componentType = N(this.enumSet, "valueType", "UINT16")));
  }
  // shape the given target to match the data type of the property
  // enums are set to their integer value
  shapeToProperty(e, t = null) {
    return bi(this, e, t);
  }
  // resolve the given object to the default value for the property for a single element
  // enums are set to a default string
  resolveDefaultElement(e) {
    return $t(this, e);
  }
  // resolve the target to the default value for the property for every element if it's an array
  // enums are set to a default string
  resolveDefault(e) {
    return pc(this, e);
  }
  // converts any instances of no data to the default value
  resolveNoData(e) {
    return fc(this, e);
  }
  // converts enums integers in the given target to strings
  resolveEnumsToStrings(e) {
    const t = this.enumSet;
    if (this.type === "ENUM")
      if (Array.isArray(e))
        for (let i = 0, n = e.length; i < n; i++)
          e[i] = s(e[i]);
      else
        e = s(e);
    return e;
    function s(i) {
      const n = t.values.find((o) => o.value === i);
      return n === null ? "" : n.name;
    }
  }
  // apply scales
  adjustValueScaleOffset(e) {
    return Jo(this.type) ? bc(this, e) : e;
  }
}
class Ci {
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
  _initProperties(e = us) {
    const t = {};
    for (const s in this.class.properties)
      t[s] = new e(this.enums, this.class.properties[s], this.definition.properties[s]);
    this.properties = t;
  }
}
class Ec extends us {
  constructor(e, t, s = null) {
    super(e, t, s), this.attribute = s?.attribute ?? null;
  }
}
class yc extends Ci {
  constructor(...e) {
    super(...e), this.isPropertyAttributeAccessor = !0, this._initProperties(Ec);
  }
  getData(e, t, s = {}) {
    const i = this.properties;
    es(i, s);
    for (const n in i)
      s[n] = this.getPropertyValue(n, e, t, s[n]);
    return s;
  }
  getPropertyValue(e, t, s, i = null) {
    if (t >= this.count)
      throw new Error("PropertyAttributeAccessor: Requested index is outside the range of the buffer.");
    const n = this.properties[e], o = n.type;
    if (n) {
      if (!this.definition.properties[e])
        return n.resolveDefault(i);
    } else throw new Error("PropertyAttributeAccessor: Requested class property does not exist.");
    i = n.shapeToProperty(i);
    const r = s.getAttribute(n.attribute.toLowerCase());
    if (St(o)) {
      const l = i.elements;
      for (let c = 0, A = l.length; c < A; c < A)
        l[c] = r.getComponent(t, c);
    } else if (wt(o))
      i.fromBufferAttribute(r, t);
    else if (o === "SCALAR" || o === "ENUM")
      i = r.getX(t);
    else
      throw new Error("StructuredMetadata.PropertyAttributeAccessor: BOOLEAN and STRING types are not supported by property attributes.");
    return i = n.adjustValueScaleOffset(i), i = n.resolveEnumsToStrings(i), i = n.resolveNoData(i), i;
  }
}
class Ic extends us {
  constructor(e, t, s = null) {
    super(e, t, s), this.values = s?.values ?? null, this.valueLength = Cc(this.type), this.arrayOffsets = N(s, "arrayOffsets", null), this.stringOffsets = N(s, "stringOffsets", null), this.arrayOffsetType = N(s, "arrayOffsetType", "UINT32"), this.stringOffsetType = N(s, "stringOffsetType", "UINT32");
  }
  // returns the necessary array length based on the array offsets if present
  getArrayLengthFromId(e, t) {
    let s = this.count;
    if (this.arrayOffsets !== null) {
      const { arrayOffsets: i, arrayOffsetType: n } = this, o = Ct(n), r = new o(e[i]);
      s = r[t + 1] - r[t];
    }
    return s;
  }
  // returns the index offset into the data buffer for the given id based on the
  // the array offsets if present
  getIndexOffsetFromId(e, t) {
    let s = t;
    if (this.arrayOffsets) {
      const { arrayOffsets: i, arrayOffsetType: n } = this, o = Ct(n);
      s = new o(e[i])[s];
    } else this.array && (s *= this.count);
    return s;
  }
}
class Bc extends Ci {
  constructor(...e) {
    super(...e), this.isPropertyTableAccessor = !0, this.count = this.definition.count, this._initProperties(Ic);
  }
  getData(e, t = {}) {
    const s = this.properties;
    es(s, t);
    for (const i in s)
      t[i] = this.getPropertyValue(i, e, t[i]);
    return t;
  }
  // reads an individual element
  _readValueAtIndex(e, t, s, i = null) {
    const n = this.properties[e], { componentType: o, type: r } = n, l = this.data, c = l[n.values], A = Ct(o, r), h = new A(c), d = n.getIndexOffsetFromId(l, t);
    if (Jo(r) || r === "ENUM")
      return Wo(h, (d + s) * n.valueLength, r, i);
    if (r === "STRING") {
      let u = d + s, g = 0;
      if (n.stringOffsets !== null) {
        const { stringOffsets: b, stringOffsetType: E } = n, C = Ct(E), y = new C(l[b]);
        g = y[u + 1] - y[u], u = y[u];
      }
      const p = new Uint8Array(h.buffer, u, g);
      i = new TextDecoder().decode(p);
    } else if (r === "BOOLEAN") {
      const u = d + s, g = Math.floor(u / 8), p = u % 8;
      i = (h[g] >> p & 1) === 1;
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
    const n = i.array, o = this.data, r = i.getArrayLengthFromId(o, t);
    if (s = i.shapeToProperty(s, r), n)
      for (let l = 0, c = s.length; l < c; l++)
        s[l] = this._readValueAtIndex(e, t, l, s[l]);
    else
      s = this._readValueAtIndex(e, t, 0, s);
    return s = i.adjustValueScaleOffset(s), s = i.resolveEnumsToStrings(s), s = i.resolveNoData(s), s;
  }
}
const dt = /* @__PURE__ */ new zr();
class gn {
  constructor() {
    this._renderer = new Vr(), this._target = new Qi(1, 1), this._texTarget = new Qi(), this._quad = new Yo(new Wn({
      blending: qr,
      blendDst: Hr,
      blendSrc: Or,
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
    const { _renderer: i, _target: n } = this;
    dt.min.copy(t), dt.max.copy(t), dt.max.x += 1, dt.max.y += 1, i.initRenderTarget(n), i.copyTextureToTexture(e, n.texture, dt, s, 0);
  }
}
const Me = /* @__PURE__ */ new class {
  constructor() {
    let a = null;
    Object.getOwnPropertyNames(gn.prototype).forEach((e) => {
      e !== "constructor" && (this[e] = (...t) => (a = a || new gn(), a[e](...t)));
    });
  }
}(), pn = /* @__PURE__ */ new k(), fn = /* @__PURE__ */ new k(), mn = /* @__PURE__ */ new k();
function wc(a, e) {
  return e === 0 ? a.getAttribute("uv") : a.getAttribute(`uv${e}`);
}
function Xo(a, e, t = new Array(3)) {
  let s = 3 * e, i = 3 * e + 1, n = 3 * e + 2;
  return a.index && (s = a.index.getX(s), i = a.index.getX(i), n = a.index.getX(n)), t[0] = s, t[1] = i, t[2] = n, t;
}
function Zo(a, e, t, s, i) {
  const [n, o, r] = s, l = wc(a, e);
  pn.fromBufferAttribute(l, n), fn.fromBufferAttribute(l, o), mn.fromBufferAttribute(l, r), i.set(0, 0, 0).addScaledVector(pn, t.x).addScaledVector(fn, t.y).addScaledVector(mn, t.z);
}
function $o(a, e, t, s) {
  const i = a.x - Math.floor(a.x), n = a.y - Math.floor(a.y), o = Math.floor(i * e % e), r = Math.floor(n * t % t);
  return s.set(o, r), s;
}
const bn = /* @__PURE__ */ new k(), Cn = /* @__PURE__ */ new k(), En = /* @__PURE__ */ new k();
class Sc extends us {
  constructor(e, t, s = null) {
    super(e, t, s), this.channels = N(s, "channels", [0]), this.index = N(s, "index", null), this.texCoord = N(s, "texCoord", null), this.valueLength = parseInt(this.type.replace(/[^0-9]/g, "")) || 1;
  }
  // takes the buffer to read from and the value index to read
  readDataFromBuffer(e, t, s = null) {
    const i = this.type;
    if (i === "BOOLEAN" || i === "STRING")
      throw new Error("PropertyTextureAccessor: BOOLEAN and STRING types not supported.");
    return Wo(e, t * this.valueLength, i, s);
  }
}
class vc extends Ci {
  constructor(...e) {
    super(...e), this.isPropertyTextureAccessor = !0, this._asyncRead = !1, this._initProperties(Sc);
  }
  // Reads the full set of property data
  getData(e, t, s, i = {}) {
    const n = this.properties;
    es(n, i);
    const o = Object.keys(n), r = o.map((l) => i[l]);
    return this.getPropertyValuesAtTexel(o, e, t, s, r), o.forEach((l, c) => i[l] = r[c]), i;
  }
  // Reads the full set of property data asynchronously
  async getDataAsync(e, t, s, i = {}) {
    const n = this.properties;
    es(n, i);
    const o = Object.keys(n), r = o.map((l) => i[l]);
    return await this.getPropertyValuesAtTexelAsync(o, e, t, s, r), o.forEach((l, c) => i[l] = r[c]), i;
  }
  // Reads values asynchronously
  getPropertyValuesAtTexelAsync(...e) {
    this._asyncRead = !0;
    const t = this.getPropertyValuesAtTexel(...e);
    return this._asyncRead = !1, t;
  }
  // Reads values from the textures synchronously
  getPropertyValuesAtTexel(e, t, s, i, n = []) {
    for (; n.length < e.length; ) n.push(null);
    n.length = e.length, Me.increaseSizeTo(n.length);
    const o = this.data, r = this.definition.properties, l = this.properties, c = Xo(i, t);
    for (let d = 0, u = e.length; d < u; d++) {
      const g = e[d];
      if (!r[g])
        continue;
      const p = l[g], b = o[p.index];
      Zo(i, p.texCoord, s, c, bn), $o(bn, b.image.width, b.image.height, Cn), En.set(d, 0), Me.renderPixelToTarget(b, Cn, En);
    }
    const A = new Uint8Array(e.length * 4);
    if (this._asyncRead)
      return Me.readDataAsync(A).then(() => (h.call(this), n));
    return Me.readData(A), h.call(this), n;
    function h() {
      for (let d = 0, u = e.length; d < u; d++) {
        const g = e[d], p = l[g], b = p.type;
        if (n[d] = bi(p, n[d]), p) {
          if (!r[g]) {
            n[d] = p.resolveDefault(n);
            continue;
          }
        } else throw new Error("PropertyTextureAccessor: Requested property does not exist.");
        const E = p.valueLength * (p.count || 1), C = p.channels.map((w) => A[4 * d + w]), y = p.componentType, f = Ct(y, b), I = new f(E);
        if (new Uint8Array(I.buffer).set(C), p.array) {
          const w = n[d];
          for (let B = 0, M = w.length; B < M; B++)
            w[B] = p.readDataFromBuffer(I, B, w[B]);
        } else
          n[d] = p.readDataFromBuffer(I, 0, n[d]);
        n[d] = p.adjustValueScaleOffset(n[d]), n[d] = p.resolveEnumsToStrings(n[d]), n[d] = p.resolveNoData(n[d]);
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
class yn {
  constructor(e, t, s, i = null, n = null) {
    const {
      schema: o,
      propertyTables: r = [],
      propertyTextures: l = [],
      propertyAttributes: c = []
    } = e, { enums: A, classes: h } = o, d = r.map((p) => new Bc(p, h, A, s));
    let u = [], g = [];
    i && (i.propertyTextures && (u = i.propertyTextures.map((p) => new vc(l[p], h, A, t))), i.propertyAttributes && (g = i.propertyAttributes.map((p) => new yc(c[p], h, A)))), this.schema = o, this.tableAccessors = d, this.textureAccessors = u, this.attributeAccessors = g, this.object = n, this.textures = t, this.nodeMetadata = i;
  }
  // Property Tables
  getPropertyTableData(e, t, s = null) {
    if (!Array.isArray(e) || !Array.isArray(t))
      s = s || {}, s = this.tableAccessors[e].getData(t, s);
    else {
      s = s || [];
      const i = Math.min(e.length, t.length);
      s.length = i;
      for (let n = 0; n < i; n++) {
        const o = this.tableAccessors[e[n]];
        s[n] = o.getData(t[n], s[n]);
      }
    }
    return s;
  }
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
  getPropertyTextureData(e, t, s = []) {
    const i = this.textureAccessors;
    s.length = i.length;
    for (let n = 0; n < i.length; n++) {
      const o = i[n];
      s[n] = o.getData(e, t, this.object.geometry, s[n]);
    }
    return s;
  }
  async getPropertyTextureDataAsync(e, t, s = []) {
    const i = this.textureAccessors;
    s.length = i.length;
    const n = [];
    for (let o = 0; o < i.length; o++) {
      const r = i[o].getDataAsync(e, t, this.object.geometry, s[o]).then((l) => {
        s[o] = l;
      });
      n.push(r);
    }
    return await Promise.all(n), s;
  }
  getPropertyTextureInfo() {
    return this.textureAccessors;
  }
  // Property Attributes
  getPropertyAttributeData(e, t = []) {
    const s = this.attributeAccessors;
    t.length = s.length;
    for (let i = 0; i < s.length; i++) {
      const n = s[i];
      t[i] = n.getData(e, this.object.geometry, t[i]);
    }
    return t;
  }
  getPropertyAttributeInfo() {
    return this.attributeAccessors.map((e) => ({
      name: e.name,
      className: e.definition.class
    }));
  }
  dispose() {
    this.textureAccessors.forEach((e) => e.dispose()), this.tableAccessors.forEach((e) => e.dispose()), this.attributeAccessors.forEach((e) => e.dispose());
  }
}
const ut = "EXT_structural_metadata";
function Mc(a, e = []) {
  var t;
  const s = ((t = a.json.textures) == null ? void 0 : t.length) || 0, i = new Array(s).fill(null);
  return e.forEach(({ properties: n }) => {
    for (const o in n) {
      const { index: r } = n[o];
      i[r] === null && (i[r] = a.loadTexture(r));
    }
  }), Promise.all(i);
}
function xc(a, e = []) {
  var t;
  const s = ((t = a.json.bufferViews) == null ? void 0 : t.length) || 0, i = new Array(s).fill(null);
  return e.forEach(({ properties: n }) => {
    for (const o in n) {
      const { values: r, arrayOffsets: l, stringOffsets: c } = n[o];
      i[r] === null && (i[r] = a.loadBufferView(r)), i[l] === null && (i[l] = a.loadBufferView(l)), i[c] === null && (i[c] = a.loadBufferView(c));
    }
  }), Promise.all(i);
}
class Qc {
  constructor(e) {
    this.parser = e, this.name = ut;
  }
  async afterRoot({ scene: e, parser: t }) {
    const s = t.json.extensionsUsed;
    if (!s || !s.includes(ut))
      return;
    let i = null, n = t.json.extensions[ut];
    if (n.schemaUri) {
      const { manager: c, path: A, requestHeader: h, crossOrigin: d } = t.options, u = new URL(n.schemaUri, A).toString(), g = new xe(c);
      g.setCrossOrigin(d), g.setResponseType("json"), g.setRequestHeader(h), i = g.loadAsync(u).then((p) => {
        n = { ...n, schema: p };
      });
    }
    const [o, r] = await Promise.all([
      Mc(t, n.propertyTextures),
      xc(t, n.propertyTables),
      i
    ]), l = new yn(n, o, r);
    e.userData.structuralMetadata = l, e.traverse((c) => {
      var A;
      if (t.associations.has(c)) {
        const { meshes: h, primitives: d } = t.associations.get(c), u = (A = t.json.meshes[h]) == null ? void 0 : A.primitives[d];
        if (u && u.extensions && u.extensions[ut]) {
          const g = u.extensions[ut];
          c.userData.structuralMetadata = new yn(n, o, r, g, c);
        } else
          c.userData.structuralMetadata = l;
      }
    });
  }
}
const In = /* @__PURE__ */ new k(), Bn = /* @__PURE__ */ new k(), wn = /* @__PURE__ */ new k();
function Tc(a) {
  return a.x > a.y && a.x > a.z ? 0 : a.y > a.z ? 1 : 2;
}
class Rc {
  constructor(e, t, s) {
    this.geometry = e, this.textures = t, this.data = s, this._asyncRead = !1, this.featureIds = s.featureIds.map((i) => {
      const { texture: n, ...o } = i, r = {
        label: null,
        propertyTable: null,
        nullFeatureId: null,
        ...o
      };
      return n && (r.texture = {
        texCoord: 0,
        channels: [0],
        ...n
      }), r;
    });
  }
  // returns list of textures
  getTextures() {
    return this.textures;
  }
  // returns a set of info for each feature
  getFeatureInfo() {
    return this.featureIds;
  }
  // performs texture data read back asynchronously
  getFeaturesAsync(...e) {
    this._asyncRead = !0;
    const t = this.getFeatures(...e);
    return this._asyncRead = !1, t;
  }
  // returns all features for the given point on the given triangle
  getFeatures(e, t) {
    const { geometry: s, textures: i, featureIds: n } = this, o = new Array(n.length).fill(null), r = n.length;
    Me.increaseSizeTo(r);
    const l = Xo(s, e), c = l[Tc(t)];
    for (let d = 0, u = n.length; d < u; d++) {
      const g = n[d], p = "nullFeatureId" in g ? g.nullFeatureId : null;
      if ("texture" in g) {
        const b = i[g.texture.index];
        Zo(s, g.texture.texCoord, t, l, In), $o(In, b.image.width, b.image.height, Bn), wn.set(d, 0), Me.renderPixelToTarget(i[g.texture.index], Bn, wn);
      } else if ("attribute" in g) {
        const b = s.getAttribute(`_feature_id_${g.attribute}`).getX(c);
        b !== p && (o[d] = b);
      } else {
        const b = c;
        b !== p && (o[d] = b);
      }
    }
    const A = new Uint8Array(r * 4);
    if (this._asyncRead)
      return Me.readDataAsync(A).then(() => (h(), o));
    return Me.readData(A), h(), o;
    function h() {
      const d = new Uint32Array(1);
      for (let u = 0, g = n.length; u < g; u++) {
        const p = n[u], b = "nullFeatureId" in p ? p.nullFeatureId : null;
        if ("texture" in p) {
          const { channels: E } = p.texture, C = E.map((f) => A[4 * u + f]);
          new Uint8Array(d.buffer).set(C);
          const y = d[0];
          y !== b && (o[u] = y);
        }
      }
    }
  }
  // dispose all of the texture data used
  dispose() {
    this.textures.forEach((e) => {
      e && (e.dispose(), e.image instanceof ImageBitmap && e.image.close());
    });
  }
}
const ts = "EXT_mesh_features";
function Sn(a, e, t) {
  a.traverse((s) => {
    var i;
    if (e.associations.has(s)) {
      const { meshes: n, primitives: o } = e.associations.get(s), r = (i = e.json.meshes[n]) == null ? void 0 : i.primitives[o];
      r && r.extensions && r.extensions[ts] && t(s, r.extensions[ts]);
    }
  });
}
class Dc {
  constructor(e) {
    this.parser = e, this.name = ts;
  }
  async afterRoot({ scene: e, parser: t }) {
    var s;
    const i = t.json.extensionsUsed;
    if (!i || !i.includes(ts))
      return;
    const n = ((s = t.json.textures) == null ? void 0 : s.length) || 0, o = new Array(n).fill(null);
    Sn(e, t, (l, { featureIds: c }) => {
      c.forEach((A) => {
        if (A.texture && o[A.texture.index] === null) {
          const h = A.texture.index;
          o[h] = t.loadTexture(h);
        }
      });
    });
    const r = await Promise.all(o);
    Sn(e, t, (l, c) => {
      l.userData.meshFeatures = new Rc(l.geometry, r, c);
    });
  }
}
class Lc {
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
class Fc {
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
    const t = new Ne(e.manager);
    this.dracoLoader && (t.setDRACOLoader(this.dracoLoader), e.manager.addHandler(this._dracoRegex, this.dracoLoader)), this.ktxLoader && t.setKTX2Loader(this.ktxLoader), this.meshoptDecoder && t.setMeshoptDecoder(this.meshoptDecoder), this.rtc && t.register(() => new Lc()), this.metadata && (t.register(() => new Qc()), t.register(() => new Dc())), this.plugins.forEach((s) => t.register(s)), e.manager.addHandler(this._gltfRegex, t), this.tiles = e, this._loader = t;
  }
  dispose() {
    this.tiles.manager.removeHandler(this._gltfRegex), this.tiles.manager.removeHandler(this._dracoRegex), this.autoDispose && (this.ktxLoader.dispose(), this.dracoLoader.dispose());
  }
}
const { clamp: PA } = st;
new Yo(new ke());
const kc = new Kn(new Uint8Array([255, 255, 255, 255]), 1, 1);
kc.needsUpdate = !0;
const _c = "https://unpkg.com/three@0.179.1/examples/jsm/libs/draco/gltf/", Pc = "https://unpkg.com/three@0.179.1/examples/jsm/libs/basis/";
class Gc extends ac {
  preprocessTileset(e, t, s = null) {
    const i = e.asset?.version || "1.0", [n] = i.split(".").map((r) => parseInt(r, 10));
    console.assert(
      n <= 1,
      "TilesRenderer: asset.version is expected to be a 1.x or a compatible version."
    );
    let o = t.replace(/\/[^/]*$/, "");
    o = new URL(o, window.location.href).toString(), this.preprocessNode(e.root, o, s);
  }
}
class Uc {
  constructor(e = null, t = null) {
    this.renderer = e, this.camera = t, this.activeTilesets = /* @__PURE__ */ new Set(), this.tilesetStates = /* @__PURE__ */ new Map(), this.pendingQueueTasks = [], this._resolutionVec2 = new m.Vector2();
  }
  clamp(e, t, s) {
    return Math.min(s, Math.max(t, e));
  }
  setRenderer(e) {
    this.renderer = e, this.updateResolution();
  }
  getResolutionConfig(e) {
    return {
      usePerEyeResolution: e?.usePerEyeResolution !== !1,
      useDrawingBufferResolution: e?.useDrawingBufferResolution !== !1,
      usePerEyeCameras: e?.usePerEyeCameras !== !1
    };
  }
  getDesiredTraversalCameras(e, t = {}) {
    return e ? t?.usePerEyeCameras !== !1 && e.isArrayCamera && Array.isArray(e.cameras) && e.cameras.length > 0 ? e.cameras.filter(Boolean) : [e] : [];
  }
  syncTilesetTraversalCameras(e, t, s = {}) {
    if (!e || !t)
      return [];
    const i = this.getDesiredTraversalCameras(t, s);
    return (Array.isArray(e.cameras) ? [...e.cameras] : []).forEach((o) => {
      i.includes(o) || e.deleteCamera(o);
    }), i.forEach((o) => {
      e.setCamera(o);
    }), i;
  }
  setCamera(e) {
    const t = this.camera;
    this.camera = e, this.activeTilesets.forEach((s) => {
      const i = this.tilesetStates.get(s), n = this.getResolutionConfig(i);
      if (t && t !== this.camera && this.getDesiredTraversalCameras(t, n).forEach((r) => {
        s.deleteCamera(r);
      }), this.camera) {
        const o = this.syncTilesetTraversalCameras(s, this.camera, n);
        this.setResolutionForCamera(s, this.camera, o, n);
      }
    });
  }
  setResolutionForCamera(e, t, s = null, i = {}) {
    if (!e || !t || !this.renderer)
      return;
    const n = i?.usePerEyeResolution !== !1, o = i?.useDrawingBufferResolution !== !1, r = Array.isArray(s) && s.length > 0 ? s : this.getDesiredTraversalCameras(t, i);
    if (r.length !== 0) {
      if (n && t.isArrayCamera) {
        let l = !1;
        if (r.forEach((c) => {
          const A = c?.viewport;
          A && Number.isFinite(A.z) && Number.isFinite(A.w) && A.z > 0 && A.w > 0 && (e.setResolution(c, A.z, A.w), l = !0);
        }), l)
          return;
      }
      if (o && this.renderer.getDrawingBufferSize) {
        this.renderer.getDrawingBufferSize(this._resolutionVec2), r.forEach((l) => {
          e.setResolution(l, this._resolutionVec2.x, this._resolutionVec2.y);
        });
        return;
      }
      r.forEach((l) => {
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
      this.setResolutionForCamera(e, this.camera, i, s);
    });
  }
  runScheduledQueueTasks(e = {}) {
    if (this.pendingQueueTasks.length === 0)
      return;
    const s = Number.isFinite(e?.maxTasks) && e.maxTasks > 0 ? Math.max(1, Math.floor(e.maxTasks)) : 1 / 0, i = Number.isFinite(e?.timeBudgetMs) && e.timeBudgetMs >= 0, n = i ? e.timeBudgetMs : 1 / 0, o = i ? performance.now() : 0;
    let r = 0;
    for (; this.pendingQueueTasks.length > 0 && r < s && !(i && performance.now() - o >= n); ) {
      const l = this.pendingQueueTasks.shift();
      typeof l == "function" && l(), r += 1;
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
    return !Array.isArray(t) || t.length !== 16 ? null : t.every((s) => Number.isFinite(s)) ? t : null;
  }
  getRootTransformUpVector(e) {
    const t = this.getRootTransformArray(e);
    if (!t) return null;
    const s = new m.Vector3(t[8], t[9], t[10]);
    return s.lengthSq() <= 1e-12 ? null : s.normalize();
  }
  isLikelyGeospatialTileset(e) {
    const t = e?.rootTileset;
    if (!t) return !1;
    const s = t.properties;
    if (s && typeof s == "object") {
      const n = Object.keys(s).map((o) => o.toLowerCase());
      if (n.includes("latitude") && n.includes("longitude"))
        return !0;
    }
    const i = this.getRootTransformArray(e);
    if (i) {
      const n = i[12], o = i[13], r = i[14];
      if (Number.isFinite(n) && Number.isFinite(o) && Number.isFinite(r) && Math.hypot(n, o, r) > 1e6)
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
    const n = i.clone().applyQuaternion(e.upGroup.quaternion);
    if (n.lengthSq() <= 1e-12)
      return !1;
    n.normalize();
    const o = new m.Vector3(0, 1, 0), r = new m.Quaternion().setFromUnitVectors(n, o);
    return e.geoGroup.quaternion.copy(r), e.geoGroup.updateMatrixWorld(!0), e.hasGeospatialReoriented = !0, !0;
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
    const s = new so();
    s.setDecoderPath(t.dracoDecoderPath || _c);
    const i = new ee();
    i.setTranscoderPath(t.ktx2TranscoderPath || Pc), this.renderer && i.detectSupport(this.renderer);
    const n = new Fc({
      rtc: !0,
      dracoLoader: s,
      ktxLoader: i
    });
    return e.registerPlugin(n), { dracoLoader: s, ktxLoader: i, gltfExtensionsPlugin: n };
  }
  convertBasicMaterial(e) {
    if (!e?.isMeshBasicMaterial)
      return e;
    const t = new m.MeshStandardMaterial({
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
    });
    return t.name = e.name || t.name, t.roughness = 0.92, t.metalness = 0.03, t.toneMapped = e.toneMapped, t.visible = e.visible, t.needsUpdate = !0, t;
  }
  normalizeTileModel(e) {
    if (!e?.traverse) return;
    const t = /* @__PURE__ */ new WeakMap();
    e.traverse((s) => {
      if (!s?.isMesh) return;
      if (s.geometry?.isBufferGeometry && !s.geometry.getAttribute("normal") && s.geometry.getAttribute("position"))
        try {
          s.geometry.computeVertexNormals();
        } catch {
        }
      s.castShadow = !0, s.receiveShadow = !0;
      const i = (n, o = -1) => {
        if (!n) return;
        let r = n;
        n.isMeshBasicMaterial && (t.has(n) ? r = t.get(n) : (r = this.convertBasicMaterial(n), t.set(n, r))), r.map && (r.map.colorSpace = m.SRGBColorSpace, r.map.needsUpdate = !0), r.needsUpdate = !0, o >= 0 && Array.isArray(s.material) ? s.material[o] = r : s.material = r;
      };
      Array.isArray(s.material) ? s.material.forEach((n, o) => i(n, o)) : i(s.material);
    });
  }
  updateBoundsAndCenter(e) {
    if (!e) return !1;
    const { tileset: t, tilesGroup: s, upGroup: i, geoGroup: n, modelGroup: o, autoCenter: r } = e, l = new m.Box3(), c = t.getBoundingBox(l) && this.isValidBox3(l);
    if (r && c && !e.hasAutoCentered) {
      const h = l.getCenter(new m.Vector3());
      s.position.set(-h.x, -h.y, -h.z), s.updateMatrixWorld(!0), e.hasAutoCentered = !0;
    }
    o.updateMatrixWorld(!0);
    const A = new m.Box3().setFromObject(o);
    if (this.isValidBox3(A))
      return o.userData.boundingBox = A, !0;
    if (c) {
      const h = l.clone(), d = new m.Matrix4().multiplyMatrices(n.matrix, i.matrix).multiply(s.matrix);
      if (h.applyMatrix4(d), this.isValidBox3(h))
        return o.userData.boundingBox = h, !0;
    }
    return !1;
  }
  applyTriangleBudget(e) {
    if (!e?.maxTriangles || !this.renderer?.info?.render)
      return;
    const t = this.renderer.info.render.triangles;
    if (!Number.isFinite(t) || t <= 0)
      return;
    const { tileset: s, maxTriangles: i, minErrorTarget: n, maxErrorTarget: o } = e, r = i * 1.08, l = i * 0.75;
    let c = s.errorTarget;
    t > r ? c = Math.min(o, c * 1.2 + 0.5) : t < l && (c = Math.max(n, c * 0.9)), Math.abs(c - s.errorTarget) > 0.05 && (s.errorTarget = c);
  }
  createAdaptiveState(e, t, s, i) {
    if (t.adaptiveQuality === !1)
      return null;
    const n = typeof t.errorTarget == "number" && t.errorTarget > 0 ? t.errorTarget : typeof e.errorTarget == "number" && e.errorTarget > 0 ? e.errorTarget : 12, o = this.clamp(
      typeof t.adaptiveMovingErrorTarget == "number" ? t.adaptiveMovingErrorTarget : Math.max(n * 2, n + 7),
      s,
      i
    ), r = this.clamp(
      typeof t.adaptiveStillErrorTarget == "number" ? t.adaptiveStillErrorTarget : Math.max(s, n * 0.75),
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
      typeof t.adaptiveFastMovingErrorTarget == "number" ? t.adaptiveFastMovingErrorTarget : Math.max(o * 1.35, o + 6),
      s,
      i
    ), g = this.clamp(
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
      movingErrorTarget: o,
      fastMovingErrorTarget: u,
      stillErrorTarget: r,
      minTilesProcessed: c,
      maxTilesProcessed: A,
      movingTilesProcessed: h,
      fastMovingTilesProcessed: g,
      stillTilesProcessed: d,
      lastSampleTimeMs: 0,
      lastMovementTimeMs: 0,
      lastPosition: new m.Vector3(),
      lastQuaternion: new m.Quaternion(),
      samplePosition: new m.Vector3(),
      sampleQuaternion: new m.Quaternion(),
      initialized: !1
    };
  }
  applyAdaptiveQuality(e, t) {
    if (!e?.adaptive || !t)
      return;
    const { adaptive: s, tileset: i, minErrorTarget: n, maxErrorTarget: o } = e, r = performance.now();
    if (t.updateMatrixWorld?.(!0), t.getWorldPosition(s.samplePosition), t.getWorldQuaternion(s.sampleQuaternion), !s.initialized) {
      s.lastSampleTimeMs = r, s.lastMovementTimeMs = r, s.lastPosition.copy(s.samplePosition), s.lastQuaternion.copy(s.sampleQuaternion), s.initialized = !0;
      return;
    }
    const l = Math.max((r - s.lastSampleTimeMs) / 1e3, 1e-6), c = s.samplePosition.distanceTo(s.lastPosition), A = this.clamp(Math.abs(s.sampleQuaternion.dot(s.lastQuaternion)), -1, 1), h = 2 * Math.acos(A), d = c / l, u = h / l, g = d > s.linearSpeedThreshold, p = u > s.angularSpeedThreshold, b = d > s.fastLinearSpeedThreshold;
    (g || p) && (s.lastMovementTimeMs = r);
    const C = r - s.lastMovementTimeMs >= s.settleDelayMs;
    let y = s.stillErrorTarget, f = s.stillTilesProcessed;
    if (C || (b ? (y = s.fastMovingErrorTarget, f = s.fastMovingTilesProcessed) : (y = s.movingErrorTarget, f = s.movingTilesProcessed)), e.maxTriangles && this.renderer?.info?.render) {
      const w = this.renderer.info.render.triangles;
      if (Number.isFinite(w) && w > 0) {
        const B = e.maxTriangles * 1.08, M = e.maxTriangles * 0.75;
        w > B ? (y = Math.max(y, y * 1.2 + 0.5), f = Math.max(s.minTilesProcessed, Math.round(f * 0.85))) : w < M && C && (y *= 0.92, f = Math.min(s.maxTilesProcessed, Math.round(f * 1.08)));
      }
    }
    y = this.clamp(y, n, o), f = this.clamp(
      Math.round(f),
      s.minTilesProcessed,
      s.maxTilesProcessed
    );
    const I = i.errorTarget + (y - i.errorTarget) * s.errorLerp;
    Math.abs(I - i.errorTarget) > 0.04 && (i.errorTarget = I), typeof i.maxTilesProcessed == "number" && Math.abs(i.maxTilesProcessed - f) >= 1 && (i.maxTilesProcessed = f), s.lastSampleTimeMs = r, s.lastPosition.copy(s.samplePosition), s.lastQuaternion.copy(s.sampleQuaternion);
  }
  applyOptions(e, t) {
    if (!t)
      return;
    const {
      errorTarget: s,
      maxDepth: i,
      loadSiblings: n,
      optimizedLoadStrategy: o,
      maxTilesProcessed: r,
      fetchOptions: l
    } = t;
    typeof s == "number" ? e.errorTarget = s : e.errorTarget = 12, typeof i == "number" ? e.maxDepth = i : e.maxDepth = 25, typeof n == "boolean" ? e.loadSiblings = n : e.loadSiblings = !0, typeof o == "boolean" ? e.optimizedLoadStrategy = o : e.optimizedLoadStrategy = !1, typeof r == "number" ? e.maxTilesProcessed = r : e.maxTilesProcessed = 224, l && typeof l == "object" && (e.fetchOptions = l);
  }
  load(e, t = {}) {
    return new Promise((s, i) => {
      const n = new Gc(e);
      n.registerPlugin(new Ac()), this.configureScheduling(n), this.applyOptions(n, t), this.configureGltfExtensions(n, t);
      const o = new m.Group(), r = new m.Group(), l = new m.Group();
      o.add(r), r.add(l);
      const c = n.group;
      l.add(c), this.setUpAxis(l, t.up || "+Y");
      const A = {
        tileset: n,
        modelGroup: o,
        geoGroup: r,
        upGroup: l,
        tilesGroup: c,
        autoCenter: t.autoCenter !== !1,
        hasAutoCentered: !1,
        geospatialReorientationMode: this.resolveGeospatialReorientationMode(t.geospatialReorientation),
        hasGeospatialReoriented: !1,
        maxTriangles: Object.prototype.hasOwnProperty.call(t, "maxTriangles") ? typeof t.maxTriangles == "number" && t.maxTriangles > 0 ? t.maxTriangles : null : 1e6,
        minErrorTarget: typeof t.minErrorTarget == "number" && t.minErrorTarget > 0 ? t.minErrorTarget : 2,
        maxErrorTarget: typeof t.maxErrorTarget == "number" && t.maxErrorTarget > 0 ? t.maxErrorTarget : 64,
        usePerEyeResolution: t.usePerEyeResolution !== !1,
        useDrawingBufferResolution: t.useDrawingBufferResolution !== !1,
        usePerEyeCameras: t.usePerEyeCameras !== !1,
        adaptive: null,
        boundsDirty: !0,
        onLoadModel: null
      };
      if (A.adaptive = this.createAdaptiveState(n, t, A.minErrorTarget, A.maxErrorTarget), this.camera) {
        const p = this.getResolutionConfig(A), b = this.syncTilesetTraversalCameras(n, this.camera, p);
        this.setResolutionForCamera(n, this.camera, b, p);
      }
      A.onLoadModel = (p) => {
        p?.scene && this.normalizeTileModel(p.scene), A.boundsDirty = !0;
      }, n.addEventListener("load-model", A.onLoadModel);
      let h = null;
      const d = () => {
        n.removeEventListener("load-tileset", u), n.removeEventListener("load-error", g), h && t.signal && t.signal.removeEventListener("abort", h);
      }, u = () => {
        d(), this.applyGeospatialReorientation(A), this.updateBoundsAndCenter(A), this.activeTilesets.add(n), this.tilesetStates.set(n, A), s({ group: o, tileset: n });
      }, g = (p) => {
        d(), n.removeEventListener("load-model", A.onLoadModel), n.dispose(), i(p?.error || new Error("Tileset failed to load"));
      };
      if (n.addEventListener("load-tileset", u), n.addEventListener("load-error", g), t.signal && (h = () => {
        d(), n.removeEventListener("load-model", A.onLoadModel), n.dispose(), i(new Error("Loading cancelled"));
      }, t.signal.addEventListener("abort", h), t.signal.aborted)) {
        h();
        return;
      }
      n.update();
    });
  }
  update(e = null, t = {}) {
    const s = t?.queueOptions;
    this.runScheduledQueueTasks(s);
    const i = e || this.camera;
    i && i !== this.camera && this.setCamera(i), this.renderer && i && this.activeTilesets.forEach((n) => {
      const o = this.tilesetStates.get(n), r = this.getResolutionConfig(o), l = this.syncTilesetTraversalCameras(n, i, r);
      this.setResolutionForCamera(n, i, l, r);
    }), this.activeTilesets.forEach((n) => {
      const o = this.tilesetStates.get(n);
      o && (o.adaptive ? this.applyAdaptiveQuality(o, i) : this.applyTriangleBudget(o)), n.update(), o && o.boundsDirty && (this.updateBoundsAndCenter(o), o.boundsDirty = !1);
    });
  }
  disposeTileset(e) {
    if (!e)
      return;
    this.activeTilesets.has(e) && this.activeTilesets.delete(e);
    const t = this.tilesetStates.get(e);
    t?.onLoadModel && e.removeEventListener("load-model", t.onLoadModel), this.tilesetStates.delete(e), e.dispose();
  }
  dispose() {
    this.pendingQueueTasks.length = 0, this.activeTilesets.forEach((e) => {
      const t = this.tilesetStates.get(e);
      t?.onLoadModel && e.removeEventListener("load-model", t.onLoadModel), e.dispose();
    }), this.activeTilesets.clear(), this.tilesetStates.clear();
  }
}
class tt {
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
    function n() {
      s.style.display = "", s.style.cursor = "auto", s.style.left = "calc(50% - 75px)", s.style.width = "150px", s.onmouseenter = null, s.onmouseleave = null, s.onclick = null;
    }
    function o() {
      n(), s.textContent = "VR NOT SUPPORTED";
    }
    function r(c) {
      n(), console.warn("Exception when trying to call xr.isSessionSupported", c), s.textContent = "VR NOT ALLOWED";
    }
    function l(c) {
      c.style.position = "absolute", c.style.bottom = "20px", c.style.padding = "12px 6px", c.style.border = "1px solid #fff", c.style.borderRadius = "4px", c.style.background = "rgba(0,0,0,0.1)", c.style.color = "#fff", c.style.font = "normal 13px sans-serif", c.style.textAlign = "center", c.style.opacity = "0.5", c.style.outline = "none", c.style.zIndex = "999";
    }
    if ("xr" in navigator)
      return s.id = "VRButton", s.style.display = "none", l(s), navigator.xr.isSessionSupported("immersive-vr").then(function(c) {
        c ? i() : o(), c && tt.xrSessionIsGranted && s.click();
      }).catch(r), s;
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
        tt.xrSessionIsGranted = !0;
      });
    }
  }
}
tt.xrSessionIsGranted = !1;
tt.registerSessionGrantedListener();
class Nc {
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
        this.vrButton = tt.createButton(this.renderer, e), this.vrButton.innerHTML = '<span class="vr-icon">🥽</span>ENTER VR', this.vrButton.className = "vr-button--glass vr-button-available", this.vrButton.disabled = !1, this.vrButton.style.cssText = `
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
    e === "quest2" && (this.camera.far = 20, this.camera.updateProjectionMatrix());
  }
  async waitForVRCSS() {
    return new Promise((e) => {
      const t = () => {
        const s = document.createElement("div");
        s.className = "vr-mode-active", s.style.display = "none", this.container.appendChild(s);
        const i = window.getComputedStyle(s), n = i.getPropertyValue("--vr-css-loaded") === "true" || i.opacity === "0.999";
        this.container.removeChild(s), n ? e() : setTimeout(t, 50);
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
            const n = i.querySelectorAll ? i.querySelectorAll('button.legacy-vr-button, a[href="#VR"]') : [];
            if (n.length > 0 || i.tagName === "BUTTON" && i.classList.contains("legacy-vr-button")) {
              const o = n.length > 0 ? n[0] : i;
              o.style.display = "none";
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
const G = {
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
async function er(a) {
  const e = await fetch(a);
  if (e.ok)
    return e.json();
  throw new Error(e.statusText);
}
async function Vc(a) {
  if (!a)
    throw new Error("No basePath supplied");
  return await er(`${a}/profilesList.json`);
}
async function Oc(a, e, t = null, s = !0) {
  if (!a)
    throw new Error("No xrInputSource supplied");
  if (!e)
    throw new Error("No basePath supplied");
  const i = await Vc(e);
  let n;
  if (a.profiles.some((l) => {
    const c = i[l];
    return c && (n = {
      profileId: l,
      profilePath: `${e}/${c.path}`,
      deprecated: !!c.deprecated
    }), !!n;
  }), !n) {
    if (!t)
      throw new Error("No matching profile name found");
    const l = i[t];
    if (!l)
      throw new Error(`No matching profile name found and default profile "${t}" missing.`);
    n = {
      profileId: t,
      profilePath: `${e}/${l.path}`,
      deprecated: !!l.deprecated
    };
  }
  const o = await er(n.profilePath);
  let r;
  if (s) {
    let l;
    if (a.handedness === "any" ? l = o.layouts[Object.keys(o.layouts)[0]] : l = o.layouts[a.handedness], !l)
      throw new Error(
        `No matching handedness, ${a.handedness}, in profile ${n.profileId}`
      );
    l.assetPath && (r = n.profilePath.replace("profile.json", l.assetPath));
  }
  return { profile: o, assetPath: r };
}
const Hc = {
  xAxis: 0,
  yAxis: 0,
  button: 0,
  state: G.ComponentState.DEFAULT
};
function qc(a = 0, e = 0) {
  let t = a, s = e;
  if (Math.sqrt(a * a + e * e) > 1) {
    const o = Math.atan2(e, a);
    t = Math.cos(o), s = Math.sin(o);
  }
  return {
    normalizedXAxis: t * 0.5 + 0.5,
    normalizedYAxis: s * 0.5 + 0.5
  };
}
class zc {
  constructor(e) {
    this.componentProperty = e.componentProperty, this.states = e.states, this.valueNodeName = e.valueNodeName, this.valueNodeProperty = e.valueNodeProperty, this.valueNodeProperty === G.VisualResponseProperty.TRANSFORM && (this.minNodeName = e.minNodeName, this.maxNodeName = e.maxNodeName), this.value = 0, this.updateFromComponent(Hc);
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
    const { normalizedXAxis: n, normalizedYAxis: o } = qc(e, t);
    switch (this.componentProperty) {
      case G.ComponentProperty.X_AXIS:
        this.value = this.states.includes(i) ? n : 0.5;
        break;
      case G.ComponentProperty.Y_AXIS:
        this.value = this.states.includes(i) ? o : 0.5;
        break;
      case G.ComponentProperty.BUTTON:
        this.value = this.states.includes(i) ? s : 0;
        break;
      case G.ComponentProperty.STATE:
        this.valueNodeProperty === G.VisualResponseProperty.VISIBILITY ? this.value = this.states.includes(i) : this.value = this.states.includes(i) ? 1 : 0;
        break;
      default:
        throw new Error(`Unexpected visualResponse componentProperty ${this.componentProperty}`);
    }
  }
}
class jc {
  /**
   * @param {Object} componentId - Id of the component
   * @param {Object} componentDescription - Description of the component to be created
   */
  constructor(e, t) {
    if (!e || !t || !t.visualResponses || !t.gamepadIndices || Object.keys(t.gamepadIndices).length === 0)
      throw new Error("Invalid arguments supplied");
    this.id = e, this.type = t.type, this.rootNodeName = t.rootNodeName, this.touchPointNodeName = t.touchPointNodeName, this.visualResponses = {}, Object.keys(t.visualResponses).forEach((s) => {
      const i = new zc(t.visualResponses[s]);
      this.visualResponses[s] = i;
    }), this.gamepadIndices = Object.assign({}, t.gamepadIndices), this.values = {
      state: G.ComponentState.DEFAULT,
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
    if (this.values.state = G.ComponentState.DEFAULT, this.gamepadIndices.button !== void 0 && e.buttons.length > this.gamepadIndices.button) {
      const t = e.buttons[this.gamepadIndices.button];
      this.values.button = t.value, this.values.button = this.values.button < 0 ? 0 : this.values.button, this.values.button = this.values.button > 1 ? 1 : this.values.button, t.pressed || this.values.button === 1 ? this.values.state = G.ComponentState.PRESSED : (t.touched || this.values.button > G.ButtonTouchThreshold) && (this.values.state = G.ComponentState.TOUCHED);
    }
    this.gamepadIndices.xAxis !== void 0 && e.axes.length > this.gamepadIndices.xAxis && (this.values.xAxis = e.axes[this.gamepadIndices.xAxis], this.values.xAxis = this.values.xAxis < -1 ? -1 : this.values.xAxis, this.values.xAxis = this.values.xAxis > 1 ? 1 : this.values.xAxis, this.values.state === G.ComponentState.DEFAULT && Math.abs(this.values.xAxis) > G.AxisTouchThreshold && (this.values.state = G.ComponentState.TOUCHED)), this.gamepadIndices.yAxis !== void 0 && e.axes.length > this.gamepadIndices.yAxis && (this.values.yAxis = e.axes[this.gamepadIndices.yAxis], this.values.yAxis = this.values.yAxis < -1 ? -1 : this.values.yAxis, this.values.yAxis = this.values.yAxis > 1 ? 1 : this.values.yAxis, this.values.state === G.ComponentState.DEFAULT && Math.abs(this.values.yAxis) > G.AxisTouchThreshold && (this.values.state = G.ComponentState.TOUCHED)), Object.values(this.visualResponses).forEach((t) => {
      t.updateFromComponent(this.values);
    });
  }
}
class Kc {
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
      const n = this.layoutDescription.components[i];
      this.components[i] = new jc(i, n);
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
const Yc = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles", Jc = "generic-trigger";
class Wc extends ns {
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
        const { valueNode: i, minNode: n, maxNode: o, value: r, valueNodeProperty: l } = s;
        i && (l === G.VisualResponseProperty.VISIBILITY ? i.visible = r : l === G.VisualResponseProperty.TRANSFORM && (i.quaternion.slerpQuaternions(
          n.quaternion,
          o.quaternion,
          r
        ), i.position.lerpVectors(
          n.position,
          o.position,
          r
        )));
      });
    }));
  }
}
function Xc(a, e) {
  Object.values(a.components).forEach((t) => {
    const { type: s, touchPointNodeName: i, visualResponses: n } = t;
    if (s === G.ComponentType.TOUCHPAD)
      if (t.touchPointNode = e.getObjectByName(i), t.touchPointNode) {
        const o = new Xn(1e-3), r = new ke({ color: 255 }), l = new as(o, r);
        t.touchPointNode.add(l);
      } else
        console.warn(`Could not find touch dot, ${t.touchPointNodeName}, in touchpad component ${t.id}`);
    Object.values(n).forEach((o) => {
      const { valueNodeName: r, minNodeName: l, maxNodeName: c, valueNodeProperty: A } = o;
      if (A === G.VisualResponseProperty.TRANSFORM) {
        if (o.minNode = e.getObjectByName(l), o.maxNode = e.getObjectByName(c), !o.minNode) {
          console.warn(`Could not find ${l} in the model`);
          return;
        }
        if (!o.maxNode) {
          console.warn(`Could not find ${c} in the model`);
          return;
        }
      }
      o.valueNode = e.getObjectByName(r), o.valueNode || console.warn(`Could not find ${r} in the model`);
    });
  });
}
function vn(a, e) {
  Xc(a.motionController, e), a.envMap && e.traverse((t) => {
    t.isMesh && (t.material.envMap = a.envMap, t.material.needsUpdate = !0);
  }), a.add(e);
}
class Zc {
  /**
   * Constructs a new XR controller model factory.
   *
   * @param {?GLTFLoader} [gltfLoader=null] - A glTF loader that is used to load controller models.
   * @param {?Function} [onLoad=null] - A callback that is executed when a controller model has been loaded.
   */
  constructor(e = null, t = null) {
    this.gltfLoader = e, this.path = Yc, this._assetCache = {}, this.onLoad = t, this.gltfLoader || (this.gltfLoader = new Ne());
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
    const t = new Wc();
    let s = null;
    return e.addEventListener("connected", (i) => {
      const n = i.data;
      n.targetRayMode !== "tracked-pointer" || !n.gamepad || n.hand || Oc(n, this.path, Jc).then(({ profile: o, assetPath: r }) => {
        t.motionController = new Kc(
          n,
          o,
          r
        );
        const l = this._assetCache[t.motionController.assetUrl];
        if (l)
          s = l.scene.clone(), vn(t, s), this.onLoad && this.onLoad(s);
        else {
          if (!this.gltfLoader)
            throw new Error("GLTFLoader not set.");
          this.gltfLoader.setPath(""), this.gltfLoader.load(
            t.motionController.assetUrl,
            (c) => {
              this._assetCache[t.motionController.assetUrl] = c, s = c.scene.clone(), vn(t, s), this.onLoad && this.onLoad(s);
            },
            null,
            () => {
              throw new Error(`Asset ${t.motionController.assetUrl} missing or malformed.`);
            }
          );
        }
      }).catch((o) => {
        console.warn(o);
      });
    }), e.addEventListener("disconnected", () => {
      t.motionController = null, t.remove(s), s = null;
    }), t;
  }
}
class $c {
  constructor(e, t) {
    this.renderer = e, this.camera = t, this.controller1 = null, this.controller2 = null, this.controllerGrip1 = null, this.controllerGrip2 = null, this.controllers = [], this.controllerGrips = [], this.buttonStates = /* @__PURE__ */ new Map(), this.inputDeadzone = 0.15, this.turnSmoothingFactor = 0.1, this.lastTurnInput = 0, this.onSelectStart = null, this.onSelectEnd = null, this.onSqueezeStart = null, this.onSqueezeEnd = null, this.onModeToggle = null, this.onMovementStart = null, this.onMovementStop = null, this.handsActive = !1, this.handStates = {
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
    for (const s of e.inputSources)
      s.hand && (t = !0);
    this.handsActive = t;
  }
  updateHandGestures() {
    const e = this.renderer.xr.getSession && this.renderer.xr.getSession();
    if (e) {
      for (const t of e.inputSources)
        if (t.hand && t.handedness) {
          const s = t.handedness, i = t.hand.get("thumb-tip"), n = t.hand.get("index-finger-tip");
          if (!i || !n || !i.transform || !n.transform)
            this.handStates[s].pinch = !1;
          else {
            const l = new m.Vector3().setFromMatrixPosition(new m.Matrix4().fromArray(i.transform.matrix)), c = new m.Vector3().setFromMatrixPosition(new m.Matrix4().fromArray(n.transform.matrix)), A = l.distanceTo(c);
            this.handStates[s].pinch = A < 0.025;
          }
          let o = !0;
          const r = t.hand.get("wrist");
          if (r && r.transform) {
            const l = new m.Vector3().setFromMatrixPosition(new m.Matrix4().fromArray(r.transform.matrix));
            for (const c of ["index-finger-tip", "middle-finger-tip", "ring-finger-tip", "pinky-finger-tip"]) {
              const A = t.hand.get(c);
              if (!A || !A.transform) {
                o = !1;
                continue;
              }
              new m.Vector3().setFromMatrixPosition(new m.Matrix4().fromArray(A.transform.matrix)).distanceTo(l) > 0.045 && (o = !1);
            }
          } else
            o = !1;
          if (this.handStates[s].fist = o, n && r && n.transform && r.transform) {
            const l = new m.Vector3().setFromMatrixPosition(new m.Matrix4().fromArray(r.transform.matrix)), c = new m.Vector3().setFromMatrixPosition(new m.Matrix4().fromArray(n.transform.matrix));
            this.handStates[s].direction = new m.Vector3().subVectors(c, l).normalize();
          }
        }
    }
  }
  initControllers() {
    const e = new Zc();
    for (let t = 0; t < 2; t++) {
      const s = this.renderer.xr.getController(t), i = this.renderer.xr.getControllerGrip(t);
      i.add(e.createControllerModel(i)), this.camera.parent.add(s), this.camera.parent.add(i), this.controllers.push(s), this.controllerGrips.push(i);
    }
    this.setupControllerEvents();
  }
  setupControllerEvents() {
    this.controllers.forEach((e, t) => {
      e.addEventListener("connected", (s) => {
        const { handedness: i, targetRayMode: n, profiles: o } = s.data, r = Array.isArray(o) && o.some((l) => l && l.toLowerCase().includes("hand"));
        n !== "tracked-pointer" || r || (i === "left" ? (this.controller1 = e, this.controllerGrip1 = this.controllerGrips[t]) : i === "right" && (this.controller2 = e, this.controllerGrip2 = this.controllerGrips[t]), e.userData.handedness = i, e.userData.initialised = !0);
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
          const s = t.gamepad, i = t.handedness, n = `debug-${i}`;
          this.buttonStates.get(n) || this.buttonStates.set(n, !0);
          let o = [];
          i === "left" ? o = [4, 5] : i === "right" && (o = [4, 5]), o.forEach((r) => {
            if (s.buttons[r]) {
              const l = s.buttons[r], c = `${i}-${r}`, A = this.buttonStates.get(c) || !1, h = l.pressed;
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
        const n = i.gamepad, o = i.handedness;
        if (n.axes.length >= 4) {
          const r = n.axes[2] || 0, l = n.axes[3] || 0, c = n.axes[0] || 0, A = n.axes[1] || 0, h = Math.abs(r) > this.inputDeadzone ? r : 0, d = Math.abs(l) > this.inputDeadzone ? l : 0, u = Math.abs(c) > this.inputDeadzone ? c : 0, g = Math.abs(A) > this.inputDeadzone ? A : 0;
          o === "left" ? (h !== 0 || d !== 0) && (t = {
            x: h,
            y: d,
            handedness: "left"
          }) : o === "right" && (u !== 0 || g !== 0) && (s = {
            x: u,
            y: g,
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
      const n = this._resolveHandedness(i, s);
      if (!n) {
        s += 1;
        continue;
      }
      t.push({ gamepad: i, handedness: n }), s += 1;
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
class eA {
  constructor(e, t) {
    this.scene = e, this.camera = t, this.style = {
      neutralColor: 14870768,
      accentColor: 9741240,
      floorColor: 6583435
    }, this.teleportController = null, this.teleportMarker = null, this.teleportCurve = null, this.teleportFloor = null, this.validTeleportPosition = null, this.teleportThreshold = 0.7, this.teleportReleaseThreshold = 0.3, this.teleportPressed = !1, this.teleportMaxMagnitude = 0, this.teleportMinDistance = 1.5, this.teleportMaxDistance = 20, this.teleportFloorHeight = null, this.teleportFloorMin = -10, this.teleportFloorMax = 10, this.lastSnapTurnTime = 0, this.onTeleport = null, this.onTeleportStart = null, this.onTeleportEnd = null;
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
    ], t = new m.CatmullRomCurve3(e), s = new m.TubeGeometry(t, 20, 0.03, 8, !1), i = new m.MeshBasicMaterial({
      color: this.style.accentColor,
      transparent: !0,
      opacity: 0.62,
      side: m.DoubleSide
    });
    if (this.teleportCurve = new m.Mesh(s, i), this.teleportCurve.visible = !1, this.scene.add(this.teleportCurve), !this.teleportMarker) {
      const n = new m.RingGeometry(0.34, 0.5, 28), o = new m.MeshBasicMaterial({
        color: this.style.neutralColor,
        transparent: !0,
        opacity: 0.78,
        side: m.DoubleSide
      });
      this.teleportMarker = new m.Mesh(n, o), this.teleportMarker.rotation.x = -Math.PI / 2, this.teleportMarker.visible = !1, this.scene.add(this.teleportMarker);
      const r = new m.RingGeometry(0.46, 0.72, 28), l = new m.MeshBasicMaterial({
        color: this.style.accentColor,
        transparent: !0,
        opacity: 0.18,
        side: m.DoubleSide
      }), c = new m.Mesh(r, l);
      c.rotation.x = -Math.PI / 2, this.teleportMarker.add(c);
    }
    if (!this.teleportFloor) {
      const n = new m.PlaneGeometry(14, 14), o = new m.MeshBasicMaterial({
        color: this.style.floorColor,
        transparent: !0,
        opacity: 0.06,
        side: m.DoubleSide,
        visible: !1
      });
      this.teleportFloor = new m.Mesh(n, o), this.teleportFloor.rotation.x = -Math.PI / 2, this.teleportFloor.visible = !1, this.scene.add(this.teleportFloor);
    }
  }
  executeTeleport() {
    if (!this.validTeleportPosition) return;
    const e = this.validTeleportPosition.clone();
    this.camera.parent.position.copy(e), this.onTeleport && this.onTeleport(e), this.validTeleportPosition = null;
  }
  dashToPosition(e) {
    const t = this.camera.parent.position.clone(), s = t.distanceTo(e), i = Math.min(s * 0.2, 1);
    let n = 0;
    const o = () => {
      n += 1 / 60;
      const r = Math.min(n / i, 1), l = 1 - Math.pow(1 - r, 3);
      this.camera.parent.position.lerpVectors(t, e, l), r < 1 && requestAnimationFrame(o);
    };
    o();
  }
  processSnapTurn(e, t = 30) {
    this.lastSnapTurnTime || (this.lastSnapTurnTime = 0);
    const s = Date.now();
    if (!(s - this.lastSnapTurnTime < 500) && Math.abs(e) > 0.7) {
      const i = t * Math.PI / 180, n = e > 0 ? 1 : -1;
      this.camera.parent.rotation.y -= n * i, this.camera.parent.rotation.y = this.normalizeAngle(this.camera.parent.rotation.y), this.lastSnapTurnTime = s;
    }
  }
  normalizeAngle(e) {
    for (; e > Math.PI; ) e -= 2 * Math.PI;
    for (; e < -Math.PI; ) e += 2 * Math.PI;
    return e;
  }
  processTeleportation(e, t, s) {
    const i = Math.sqrt(t * t + s * s), n = e && e.inputSource && e.inputSource.handedness === "right", o = s;
    if (i > this.teleportThreshold && !this.teleportPressed)
      this.teleportPressed = !0, this.teleportMaxMagnitude = i, this.teleportController = e, this.teleportFloorHeight = this.camera.parent.position.y, this.showTeleportArc(), this.onTeleportStart && this.onTeleportStart();
    else if (this.teleportPressed) {
      if (this.teleportMaxMagnitude = Math.max(this.teleportMaxMagnitude, i), n && Math.abs(o) > 0.1) {
        const r = 0.06666666666666667;
        this.teleportFloorHeight += o * r, this.teleportFloorHeight = Math.max(this.teleportFloorMin, Math.min(this.teleportFloorMax, this.teleportFloorHeight)), this.updateTeleportFloor();
      }
      this.updateTeleportArc(), i < this.teleportReleaseThreshold && (this.calculateAndExecuteTeleport(), this.hideTeleportArc(), this.teleportPressed = !1, this.teleportMaxMagnitude = 0, this.teleportController = null, this.onTeleportEnd && this.onTeleportEnd());
    }
  }
  showTeleportArc() {
    this.teleportCurve || this.createTeleportArc(), this.teleportCurve.visible = !0, this.teleportMarker && (this.teleportMarker.visible = !0, this.teleportMarker.children && this.teleportMarker.children.length > 0 && this.teleportMarker.children.forEach((e) => e.visible = !0)), this.updateTeleportFloor();
  }
  hideTeleportArc() {
    this.teleportCurve && (this.teleportCurve.visible = !1), this.teleportMarker && (this.teleportMarker.visible = !1, this.teleportMarker.children && this.teleportMarker.children.length > 0 && this.teleportMarker.children.forEach((e) => e.visible = !1)), this.teleportFloor && (this.teleportFloor.visible = !1);
  }
  updateTeleportArc() {
    if (!this.teleportController || !this.teleportCurve) return;
    const e = new m.Vector3();
    this.teleportController.getWorldPosition(e);
    const t = new m.Quaternion();
    this.teleportController.getWorldQuaternion(t);
    const s = new m.Vector3(0, 0, -1);
    s.applyQuaternion(t);
    const i = this.teleportMinDistance, n = this.teleportMaxDistance, o = Math.min(this.teleportMaxMagnitude / this.teleportThreshold, 1), r = n - i, l = Math.pow(o, 0.78), c = i + r * l, A = [], h = 32, d = -9.8;
    let u = Math.sqrt(c * Math.abs(d) / 2);
    if (s.y > 0.3 ? u *= 1 - s.y * 0.5 : s.y < -0.5 && (u *= 1 + Math.abs(s.y) * 0.3), Math.sqrt(s.x * s.x + s.z * s.z) > 0.1) {
      const x = Math.min(1, c / (u * 2));
      u *= x;
    }
    const p = s.x * u, b = Math.max(s.y * u, u * 0.3), E = s.z * u, C = b / Math.abs(d), y = Math.max(C * 2.2, 1.5), f = this.teleportFloorHeight;
    let I = null, w = !1, B = e.y, M = 0;
    const S = 8;
    for (let x = 0; x <= h; x++) {
      const R = x / h * y, L = new m.Vector3(
        e.x + p * R,
        e.y + b * R + 0.5 * d * R * R,
        e.z + E * R
      );
      Math.abs(L.y - e.y) > S && (L.y = e.y + Math.sign(L.y - e.y) * S), !w && L.y < B && (w = !0, M = R), A.push(L);
      const q = w ? R - M : 0, Q = w && q > 0.1;
      if (!I && Q && L.y <= f) {
        if (x > 0) {
          const z = A[x - 1], F = (f - z.y) / (L.y - z.y);
          I = new m.Vector3().lerpVectors(z, L, F), I.y = f;
        } else
          I = L.clone(), I.y = f;
        A[x] = I, A.length = x + 1;
        break;
      }
      if (B = L.y, Math.sqrt(
        Math.pow(L.x - e.x, 2) + Math.pow(L.z - e.z, 2)
      ) > n) {
        Q && (I = new m.Vector3(L.x, f, L.z), A[x] = I, A.length = x + 1);
        break;
      }
    }
    if (!I && A.length > 0) {
      let x = A[0], R = 0;
      for (let L = 1; L < A.length; L++)
        A[L].y < x.y && (x = A[L], R = L);
      R > A.length / 3 && (I = new m.Vector3(x.x, f, x.z), A.length = R + 1, A[R] = I);
    }
    if (A.length > 1) {
      const x = new m.CatmullRomCurve3(A), R = new m.TubeGeometry(x, 20, 0.022, 6, !1);
      this.teleportCurve.geometry && this.teleportCurve.geometry.dispose(), this.teleportCurve.geometry = R;
    }
    this.teleportMarker && I && (this.teleportMarker.position.copy(I), this.teleportMarker.visible = !0, this.teleportMarker.material.color.setHex(this.style.neutralColor));
  }
  updateTeleportFloor() {
    this.teleportFloor && this.teleportFloorHeight !== null && (this.teleportFloor.position.y = this.teleportFloorHeight, this.teleportFloor.visible = !0, this.teleportFloor.material.visible = !0, this.teleportFloor.material.opacity = 0.06, this.teleportFloor.material.color.setHex(this.style.floorColor), this.updateTeleportArc());
  }
  updateTeleportArcHeight() {
    this.updateTeleportFloor();
  }
  calculateAndExecuteTeleport() {
    if (!(!this.teleportController || this.teleportMaxMagnitude < this.teleportThreshold) && this.teleportMarker && this.teleportMarker.visible) {
      const e = this.teleportMarker.position.clone(), t = this.camera.parent.position, s = Math.sqrt(
        Math.pow(e.x - t.x, 2) + Math.pow(e.z - t.z, 2)
      );
      if (s >= this.teleportMinDistance && s <= this.teleportMaxDistance) {
        const i = new m.Vector3(e.x, this.teleportFloorHeight, e.z);
        this.validTeleportPosition = i, this.executeTeleport(), this.teleportFloorHeight = null;
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
    this.teleportCurve && (this.teleportCurve.geometry && this.teleportCurve.geometry.dispose(), this.teleportCurve.material && this.teleportCurve.material.dispose(), this.scene.remove(this.teleportCurve)), this.teleportMarker && (this.teleportMarker.geometry && this.teleportMarker.geometry.dispose(), this.teleportMarker.material && this.teleportMarker.material.dispose(), this.scene.remove(this.teleportMarker)), this.teleportFloor && (this.teleportFloor.geometry && this.teleportFloor.geometry.dispose(), this.teleportFloor.material && this.teleportFloor.material.dispose(), this.scene.remove(this.teleportFloor)), this.resetTeleportState();
  }
  resetSnapTurnState() {
    this.lastSnapTurnTime = 0;
  }
}
class tA {
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
    const s = this.renderer.xr.getSession && this.renderer.xr.getSession();
    if (s && s.visibilityState !== "visible")
      return;
    const i = t?.inputSources || (s ? Array.from(s.inputSources || []) : []);
    if (!i || i.length === 0)
      return;
    if (s && t.updateHandGestures && t.handsActive) {
      t.updateHandGestures();
      let u = null;
      const g = new m.Vector3();
      let p = !1;
      for (const b of ["left", "right"])
        if (t.handStates[b].pinch) {
          u = b, g.copy(t.handStates[b].direction), p = t.handStates[b].fist;
          break;
        }
      if (u) {
        this.handMoveActive = !0, this.handMoveBoost = p, this.handMoveDirection.copy(g);
        const b = this.camera.parent || this.camera, E = this.MOVE_SPEED * (p ? 3 : 1) * e;
        b.position.addScaledVector(g, E), this.isMoving = !0, this.onMovementStart && !this._wasMoving && this.onMovementStart(), this.onMovementUpdate && this.onMovementUpdate({
          isMoving: !0,
          currentSpeed: this.MOVE_SPEED,
          isBoosted: p,
          currentBoostLevel: p ? 1 : 0
        }), this._wasMoving = !0;
        return;
      } else
        this.handMoveActive && this.onMovementStop && this.onMovementStop(), this.handMoveActive = !1, this.isMoving = !1, this._wasMoving = !1;
    }
    const n = this.camera.parent || this.camera;
    let o = !1, r = !1;
    for (let u = 0; u < i.length; u++) {
      const g = i[u];
      if (!g || !g.gamepad || !g.gamepad.buttons || !g.gamepad.axes || g.gamepad.axes.length < 4)
        continue;
      const p = g.gamepad, E = g.handedness === "left" ? t.controller1 : t.controller2;
      if (!E) continue;
      const C = p.axes[2] || 0, y = p.axes[3] || 0;
      if (g.handedness === "left") {
        const f = p.buttons[1], I = f && f.pressed ? 3 : 1, w = this.comfortSettings.reducedMotion ? this.comfortSettings.comfortSpeed : 1;
        if (f && f.pressed && (r = !0), this.comfortSettings.locomotionMode === "teleport" && this.teleportSystem && E) {
          this.teleportSystem.processTeleportation(E, C, y);
          continue;
        } else {
          const M = new m.Vector3();
          this.camera.getWorldDirection(M), M.y = 0, M.normalize();
          const S = new m.Vector3().crossVectors(M, this.camera.up).normalize();
          if (Math.abs(y) > 0.1) {
            const x = this.MOVE_SPEED * I * w * this.currentSpeed * e;
            n.position.addScaledVector(M, -y * x), o = !0;
          }
          if (Math.abs(C) > 0.1) {
            const x = this.MOVE_SPEED * I * w * this.currentSpeed * e;
            n.position.addScaledVector(S, C * x), o = !0;
          }
        }
      }
      if (g.handedness === "right") {
        const f = p.buttons[1], I = f && f.pressed ? 3 : 1, w = this.comfortSettings.reducedMotion ? this.comfortSettings.comfortSpeed : 1;
        if (f && f.pressed && Math.abs(y) > 0.1 && (r = !0), this.teleportSystem && this.teleportSystem.teleportPressed && this.teleportSystem.teleportCurve && this.teleportSystem.teleportCurve.visible) {
          if (Math.abs(y) > 0.1) {
            const B = 4 * e;
            this.teleportSystem.adjustFloorHeight(y * B);
          }
        } else {
          if (this.comfortSettings.turningMode === "snap" && this.teleportSystem)
            this.teleportSystem.processSnapTurn(C, this.comfortSettings.snapTurnAngle);
          else if (Math.abs(C) > this.inputDeadzone) {
            const B = this.lastTurnInput * this.turnSmoothingFactor + C * (1 - this.turnSmoothingFactor);
            if (this.lastTurnInput = B, Math.abs(B) > this.inputDeadzone) {
              const M = this.comfortSettings.reducedMotion ? this.TURN_SPEED * 0.5 : this.TURN_SPEED, S = B * M * Math.min(e, 1 / 30);
              n.rotation.y -= S, n.rotation.y = this.normalizeAngle(n.rotation.y);
            }
          } else
            this.lastTurnInput *= 0.9;
          if (Math.abs(y) > 0.1) {
            const B = this.FLY_SPEED * I * w * this.currentSpeed * e;
            n.position.y -= y * B, o = !0;
          }
        }
      }
    }
    const l = this.isMoving;
    this.isMoving = o;
    const A = (this.isMoving ? this.MOVE_SPEED : 0) - this.currentSpeed;
    this.currentSpeed += A * this.SPEED_RAMP_RATE * e, this.currentSpeed = Math.max(0, this.currentSpeed);
    const d = (r ? 1 : 0) - this.currentBoostLevel;
    this.currentBoostLevel += d * this.BOOST_RAMP_RATE * e, this.currentBoostLevel = Math.max(0, Math.min(1, this.currentBoostLevel)), !l && this.isMoving && this.onMovementStart && this.onMovementStart(), l && !this.isMoving && this.onMovementStop && this.onMovementStop(), this.onMovementUpdate && this.onMovementUpdate({
      isMoving: this.isMoving,
      currentSpeed: this.currentSpeed,
      isBoosted: r,
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
class sA {
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
class iA {
  /**
   * Creates a new VRManager instance
   * 
   * @param {THREE.WebGLRenderer} renderer - Three.js WebGL renderer with XR enabled
   * @param {THREE.PerspectiveCamera} camera - Three.js camera for VR dolly system
   * @param {THREE.Scene} scene - Three.js scene for VR objects
   * @param {string} [audioPath='./sound/'] - Path to VR audio files
  * @param {boolean} [enableAudio=false] - Enable VR audio system
   */
  constructor(e, t, s, i = "./sound/", n = !1, o = null) {
    this.renderer = e, this.camera = t, this.scene = s, this.audioPath = i, this.enableAudio = n, this.container = o, this.vrCore = new Nc(e, t, s, o), this.vrControllers = new $c(e, t), this.vrTeleport = new eA(s, t), this.vrLocomotion = new tA(t, e), this.vrAudio = this.enableAudio ? new sA() : null, this.isVRSupported = !1, this.isVRPresenting = !1, this.controller1 = null, this.controller2 = null, this.controllerGrip1 = null, this.controllerGrip2 = null, this.controllers = [], this.controllerGrips = [], this._preVRCameraState = {
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
class nA {
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
        const g = document.createElementNS("http://www.w3.org/2000/svg", "path");
        g.setAttribute("d", "M 12,12 L 28,28 M 28,12 12,28"), g.setAttribute("stroke", "#fff"), g.setAttribute("stroke-width", 2), u.appendChild(g), t.optionalFeatures === void 0 && (t.optionalFeatures = []), t.optionalFeatures.push("dom-overlay"), t.domOverlay = { root: d };
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
    function n() {
      s.style.display = "", s.style.cursor = "auto", s.style.left = "calc(50% - 75px)", s.style.width = "150px", s.onmouseenter = null, s.onmouseleave = null, s.onclick = null;
    }
    function o() {
      n(), s.textContent = "AR NOT SUPPORTED";
    }
    function r(c) {
      n(), console.warn("Exception when trying to call xr.isSessionSupported", c), s.textContent = "AR NOT ALLOWED";
    }
    function l(c) {
      c.style.position = "absolute", c.style.bottom = "20px", c.style.padding = "12px 6px", c.style.border = "1px solid #fff", c.style.borderRadius = "4px", c.style.background = "rgba(0,0,0,0.1)", c.style.color = "#fff", c.style.font = "normal 13px sans-serif", c.style.textAlign = "center", c.style.opacity = "0.5", c.style.outline = "none", c.style.zIndex = "999";
    }
    if ("xr" in navigator)
      return s.id = "ARButton", s.style.display = "none", l(s), navigator.xr.isSessionSupported("immersive-ar").then(function(c) {
        c ? i() : o();
      }).catch(r), s;
    {
      const c = document.createElement("a");
      return window.isSecureContext === !1 ? (c.href = document.location.href.replace(/^http:/, "https:"), c.innerHTML = "WEBXR NEEDS HTTPS") : (c.href = "https://immersiveweb.dev/", c.innerHTML = "WEBXR NOT AVAILABLE"), c.style.left = "calc(50% - 90px)", c.style.width = "180px", c.style.textDecoration = "none", l(c), c;
    }
  }
}
class oA {
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
      this.arButton = nA.createButton(this.renderer, e), this.arButton.innerHTML = '<span class="ar-icon">👁️</span>ENTER AR', this.arButton.className = "ar-button--glass ar-button-available", this.arButton.disabled = !1, this.arButton.style.cssText = `
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
        const i = window.getComputedStyle(s), n = i.getPropertyValue("--ar-css-loaded") === "true" || i.opacity === "0.998";
        this.container.removeChild(s), n ? e() : setTimeout(t, 50);
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
              const n = i.length > 0 ? i[0] : s;
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
    this.buttonObserver && (this.buttonObserver.disconnect(), this.buttonObserver = null), this.arButton && this.arButton.parentNode && this.arButton.parentNode.removeChild(this.arButton), this.isQuest2 = !1, this.isQuest3 = !1, this.isARSupported = !1, this.isARPresenting = !1;
  }
}
const Mn = new P(), xn = new v();
class Qn {
  /**
   * Constructs a new XR hand primitive model.
   *
   * @param {XRHandModel} handModel - The hand model.
   * @param {Group} controller - The WebXR controller.
   * @param {string} path - The model path.
   * @param {XRHandedness} handedness - The handedness of the XR input source.
   * @param {XRHandPrimitiveModel~Options} options - The model options.
   */
  constructor(e, t, s, i, n) {
    this.controller = t, this.handModel = e, this.envMap = null;
    let o;
    !n || !n.primitive || n.primitive === "sphere" ? o = new Xn(1, 10, 10) : n.primitive === "box" && (o = new Kr(1, 1, 1));
    const r = new ci();
    this.handMesh = new li(o, r, 30), this.handMesh.frustumCulled = !1, this.handMesh.instanceMatrix.setUsage(Yr), this.handMesh.castShadow = !0, this.handMesh.receiveShadow = !0, this.handModel.add(this.handMesh), this.joints = [
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
      const n = t[this.joints[i]];
      n.visible && (xn.setScalar(n.jointRadius || 8e-3), Mn.compose(n.position, n.quaternion, xn), this.handMesh.setMatrixAt(i, Mn), s++);
    }
    this.handMesh.count = s, this.handMesh.instanceMatrix.needsUpdate = !0;
  }
}
const rA = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles/generic-hand/";
class aA {
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
  constructor(e, t, s, i, n = null, o = null) {
    this.controller = t, this.handModel = e, this.bones = [], n === null && (n = new Ne(), n.setPath(s || rA)), n.load(`${i}.glb`, (r) => {
      const l = r.scene.children[0];
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
      }), o && o(l);
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
          const n = i.position;
          s.position.copy(n), s.quaternion.copy(i.quaternion);
        }
      }
    }
  }
}
class lA extends ns {
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
class cA {
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
    const s = new lA(e);
    return e.addEventListener("connected", (i) => {
      const n = i.data;
      n.hand && !s.motionController && (s.xrInputSource = n, t === void 0 || t === "spheres" ? s.motionController = new Qn(s, e, this.path, n.handedness, { primitive: "sphere" }) : t === "boxes" ? s.motionController = new Qn(s, e, this.path, n.handedness, { primitive: "box" }) : t === "mesh" && (s.motionController = new aA(s, e, this.path, n.handedness, this.gltfLoader, this.onLoad))), e.visible = !0;
    }), e.addEventListener("disconnected", () => {
      e.visible = !1;
    }), s;
  }
}
class AA {
  constructor(e) {
    this.renderer = e, this.handModelFactory = new cA(), this.hand1 = null, this.hand2 = null, this.interactionEnabled = !0, this.dragging = !1, this.scaling = !1, this.rotating = !1, this.dragStartPos = new m.Vector3(), this.scaleStartDistance = 0, this.rotateStartAngle = 0, this.pinchIntent = {
      hand1Start: 0,
      hand2Start: 0,
      delay: 100
    }, this.inertiaActive = !1, this.posVelocity = new m.Vector3(), this.rotVelocity = 0, this.scaleVelocity = 0, this.POSITION_DAMPING = 100, this.ROTATION_DAMPING = 8, this.SCALE_DAMPING = 8, this.MAX_ROT_VELOCITY = Math.PI, this.MAX_SCALE_VELOCITY = 0.5, this.MIN_SCALE = 0.01, this.MAX_SCALE = 1, this.VELOCITY_DEAD_ZONE = 1e-3, this.DISTANCE_GAIN_THRESHOLD = 5, this.MAX_DISTANCE_GAIN = 3, this.MAX_DELTA_PER_FRAME = 0.5, this.VELOCITY_SMOOTHING = 0.3, this.tempVec1 = new m.Vector3(), this.tempVec2 = new m.Vector3(), this.onGestureStart = null, this.onGestureEnd = null;
  }
  init(e) {
    this.hand1 = this.setupHand(e, 0, "hand1Start"), this.hand2 = this.setupHand(e, 1, "hand2Start");
  }
  setupHand(e, t, s) {
    const i = this.renderer.xr.getHand(t);
    i.userData.pinch = !1, i.addEventListener("pinchstart", () => {
      i.userData.pinch = !0, this.pinchIntent[s] = performance.now();
    }), i.addEventListener("pinchend", () => {
      i.userData.pinch = !1, this.onPinchEnd();
    });
    const n = this.handModelFactory.createHandModel(i, "mesh");
    return i.add(n), e.add(i), n.addEventListener("connected", () => {
      this.styleHandModel(n, 16777215, 0.5);
    }), i;
  }
  styleHandModel(e, t, s) {
    e.traverse((i) => {
      i.isMesh && (i.material = new m.MeshStandardMaterial({
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
    const i = this.hand1.joints?.["index-finger-tip"], n = this.hand2.joints?.["index-finger-tip"];
    if (!i || !n) {
      (this.dragging || this.scaling || this.rotating) && this.onPinchEnd();
      return;
    }
    const o = performance.now(), r = this.hand1.userData.pinch && o - this.pinchIntent.hand1Start >= this.pinchIntent.delay, l = this.hand2.userData.pinch && o - this.pinchIntent.hand2Start >= this.pinchIntent.delay;
    if (r && !this.hand2.userData.pinch || l && !this.hand1.userData.pinch) {
      const A = (r ? this.hand1 : this.hand2).joints["index-finger-tip"];
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
    } else if (r && l)
      if (i.getWorldPosition(this.tempVec1), n.getWorldPosition(this.tempVec2), !this.scaling && !this.rotating) {
        this.dragging = !1, this.scaling = !0, this.rotating = !0, this.scaleStartDistance = this.tempVec1.distanceTo(this.tempVec2);
        const c = this.tempVec2.x - this.tempVec1.x, A = this.tempVec2.z - this.tempVec1.z;
        this.rotateStartAngle = Math.atan2(A, c), this.onGestureStart && this.onGestureStart("two-hand");
      } else {
        const c = this.tempVec1.distanceTo(this.tempVec2), A = c / this.scaleStartDistance, h = Math.log(t.scale.x), d = Math.log(A), u = h + d, g = Math.max(this.MIN_SCALE, Math.min(this.MAX_SCALE, Math.exp(u)));
        if (t.scale.setScalar(g), e > 0) {
          const y = d / e, f = Math.max(-this.MAX_SCALE_VELOCITY, Math.min(this.MAX_SCALE_VELOCITY, y));
          this.scaleVelocity = this.scaleVelocity * (1 - this.VELOCITY_SMOOTHING) + f * this.VELOCITY_SMOOTHING;
        }
        this.scaleStartDistance = c;
        const p = this.tempVec2.x - this.tempVec1.x, b = this.tempVec2.z - this.tempVec1.z, E = Math.atan2(b, p);
        let C = E - this.rotateStartAngle;
        if (C > Math.PI && (C -= 2 * Math.PI), C < -Math.PI && (C += 2 * Math.PI), t.rotation.y -= C, e > 0) {
          const y = -C / e, f = Math.max(-this.MAX_ROT_VELOCITY, Math.min(this.MAX_ROT_VELOCITY, y));
          this.rotVelocity = this.rotVelocity * (1 - this.VELOCITY_SMOOTHING) + f * this.VELOCITY_SMOOTHING;
        }
        this.rotateStartAngle = E;
      }
  }
  onPinchEnd() {
    if (!this.hand1.userData.pinch && !this.hand2.userData.pinch) {
      const e = this.dragging || this.scaling || this.rotating;
      this.dragging = !1, this.scaling = !1, this.rotating = !1, e && (this.onGestureEnd && this.onGestureEnd(), this.posVelocity.lengthSq() < this.VELOCITY_DEAD_ZONE && this.posVelocity.set(0, 0, 0), Math.abs(this.rotVelocity) < this.VELOCITY_DEAD_ZONE && (this.rotVelocity = 0), Math.abs(this.scaleVelocity) < this.VELOCITY_DEAD_ZONE && (this.scaleVelocity = 0), (this.posVelocity.lengthSq() > 0 || Math.abs(this.rotVelocity) > 0 || Math.abs(this.scaleVelocity) > 0) && (this.inertiaActive = !0));
    } else (!this.hand1.userData.pinch || !this.hand2.userData.pinch) && (this.scaling = !1, this.rotating = !1, this.rotVelocity = 0, this.scaleVelocity = 0);
  }
  applyInertia(e, t) {
    const s = Math.exp(-this.POSITION_DAMPING * e), i = Math.exp(-this.ROTATION_DAMPING * e), n = Math.exp(-this.SCALE_DAMPING * e);
    this.posVelocity.multiplyScalar(s), this.rotVelocity *= i, this.scaleVelocity *= n, t.position.addScaledVector(this.posVelocity, e), t.rotation.y += this.rotVelocity * e;
    const r = Math.log(t.scale.x) + this.scaleVelocity * e, l = Math.max(this.MIN_SCALE, Math.min(this.MAX_SCALE, Math.exp(r)));
    t.scale.setScalar(l), this.posVelocity.lengthSq() < this.VELOCITY_DEAD_ZONE && this.posVelocity.set(0, 0, 0), Math.abs(this.rotVelocity) < this.VELOCITY_DEAD_ZONE && (this.rotVelocity = 0), Math.abs(this.scaleVelocity) < this.VELOCITY_DEAD_ZONE && (this.scaleVelocity = 0), this.posVelocity.lengthSq() === 0 && this.rotVelocity === 0 && this.scaleVelocity === 0 && (this.inertiaActive = !1);
  }
  stop() {
    this.dragging = !1, this.scaling = !1, this.rotating = !1, this.inertiaActive = !1, this.posVelocity.set(0, 0, 0), this.rotVelocity = 0, this.scaleVelocity = 0;
  }
  /**
   * Enable or disable hand gesture interactions.
   * When disabled, all gestures are silently ignored (useful for remote scenarios).
   * @param {boolean} enabled - true to allow interactions, false to block them
   */
  setInteractionEnabled(e) {
    this.interactionEnabled = e, e || this.stop();
  }
  dispose() {
    this.hand1 && this.hand1.clear(), this.hand2 && this.hand2.clear(), this.stop();
  }
}
class hA extends yt {
  constructor(e, t, s, i = {}, n = null) {
    super(), this.renderer = e, this.camera = t, this.scene = s, this.config = {
      enableHandTracking: !0,
      enableWorldCube: !0,
      defaultScale: 0.05,
      worldCubeSize: 1e3,
      worldCubeOpacity: 0.1,
      ...i
    }, this.container = n, this.arCore = new oA(e, t, s, n), this.handTracking = this.config.enableHandTracking ? new AA(e) : null, this.modelGroup = new m.Group(), this.modelGroup.name = "AR Model Group", this.scene.add(this.modelGroup), this.currentModel = null, this.pendingModel = null, this.pendingModelConfig = null, this.currentModelScale = this.config.defaultScale, this.worldCube = null, this.config.enableWorldCube && this.createWorldCube(), this.isARPresenting = !1, this.previousGestureType = null, this.init();
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
    const e = this.config.worldCubeSize, t = new m.BoxGeometry(e, e, e), s = new m.MeshBasicMaterial({
      color: 0,
      transparent: !0,
      opacity: this.config.worldCubeOpacity,
      side: m.BackSide,
      depthWrite: !1
    });
    this.worldCube = new m.Mesh(t, s), this.worldCube.name = "AR World Cube", this.worldCube.visible = !1, this.scene.add(this.worldCube);
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
class Tn {
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
      }, n = {
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
      return console.log("🎥 Current camera positions:"), console.log("📋 Copy this for initialPositions config:"), console.log(JSON.stringify(n, null, 2)), n;
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
    }, window.vertices = () => {
      if (!e.sceneManager?.scene)
        return console.warn("Scene not initialized"), null;
      const t = e.sceneManager.scene;
      let s = 0, i = 0, n = 0, o = 0;
      t.traverse((l) => {
        const c = l.geometry?.getAttribute?.("position");
        if (!c) return;
        s += 1;
        const A = l.isInstancedMesh ? c.count * l.count : c.count;
        n += A, l.visible && (i += 1, o += A);
      });
      const r = {
        meshes: s,
        visibleMeshes: i,
        vertices: n,
        visibleVertices: o
      };
      return console.log("🔢 Scene vertex counts:"), console.table(r), r;
    }, window.models = () => {
      const t = e.getLoadedModels();
      if (t.length === 0)
        return console.log("📦 No models loaded"), [];
      const s = t.map((i, n) => {
        const o = i.model, r = o.userData.boundingBox;
        return {
          index: n,
          url: i.url,
          ame: o.name || "Unnamed",
          position: {
            x: parseFloat(o.position.x.toFixed(3)),
            y: parseFloat(o.position.y.toFixed(3)),
            z: parseFloat(o.position.z.toFixed(3))
          },
          rotation: {
            x: parseFloat(o.rotation.x.toFixed(3)),
            y: parseFloat(o.rotation.y.toFixed(3)),
            z: parseFloat(o.rotation.z.toFixed(3))
          },
          scale: {
            x: parseFloat(o.scale.x.toFixed(3)),
            y: parseFloat(o.scale.y.toFixed(3)),
            z: parseFloat(o.scale.z.toFixed(3))
          },
          boundingBox: r ? {
            min: {
              x: parseFloat(r.min.x.toFixed(3)),
              y: parseFloat(r.min.y.toFixed(3)),
              z: parseFloat(r.min.z.toFixed(3))
            },
            max: {
              x: parseFloat(r.max.x.toFixed(3)),
              y: parseFloat(r.max.y.toFixed(3)),
              z: parseFloat(r.max.z.toFixed(3))
            }
          } : null,
          visible: o.visible,
          children: o.children.length
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
    }, window.stereo = (t, s) => {
      if (t === void 0) {
        const i = {
          enabled: e.stereoEnabled || !1,
          mode: e.stereoMode || "sbs",
          eyeSeparation: e.stereoEyeSeparation || 0.064
        };
        return console.log("👓 Stereo information:"), console.table(i), console.log(""), console.log("Usage:"), console.log("  stereo(true)           - Enable stereo mode"), console.log("  stereo(false)          - Disable stereo mode"), console.log("  stereo(true, 0.065)    - Enable with custom eye separation"), i;
      }
      return e.setStereoEnabled(t), s !== void 0 && e.setStereoEyeSeparation(s), console.log(`👓 Stereo ${t ? "enabled" : "disabled"}`), s !== void 0 && console.log(`👓 Eye separation: ${s}m`), { enabled: t, eyeSeparation: e.stereoEyeSeparation };
    }, window.debugHelp = () => {
      console.log("🔧 BelowJS Debug Commands:"), console.log("  camera()    - Get current camera position data"), console.log("  scene()     - Get scene information and object counts"), console.log("  vertices()  - Get scene vertex counts"), console.log("  models()    - Get loaded models information"), console.log("  particles() - Get particle system information"), console.log("  vr()        - Get VR state and settings"), console.log("  stereo()    - Get/set stereo mode and eye separation"), console.log("  debugHelp() - Show this help message"), console.log(""), console.log("Global objects:"), console.log("  belowViewer - Direct access to BelowViewer instance");
    });
  }
  /**
   * Clean up debug commands when viewer is disposed
   */
  static cleanup() {
    typeof window > "u" || (delete window.camera, delete window.scene, delete window.vertices, delete window.models, delete window.particles, delete window.vr, delete window.stereo, delete window.debugHelp, delete window.belowViewer);
  }
}
class dA extends yt {
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
            maxDistance: 100,
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
          logarithmicDepthBuffer: !1
        },
        schema: {
          antialias: { type: "boolean", default: !0 },
          alpha: { type: "boolean", default: !1 },
          powerPreference: { type: "string", default: "high-performance" },
          logarithmicDepthBuffer: { type: "boolean", default: !1 }
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
          enabled: { type: "boolean", default: !0 }
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
      enableVRAudio: { type: "boolean", default: !1 }
    };
    this.config = new cs(s).validate(t), this.renderer = null, this.sceneManager = null, this.cameraManager = null, this.modelLoader = null, this.tilesetLoader = null, this.vrManager = null, this.arManager = null, this.stereoCamera = null, this.isVREnabled = this.config.vr?.enabled !== !1, this.isAREnabled = this.config.ar?.enabled === !0, this.stereoEnabled = this.config.stereo?.enabled === !0, this.stereoMode = this.config.stereo?.mode || "sbs";
    const i = this.config.stereo?.eyeSeparation ?? 0.064;
    this.stereoEyeSeparation = Math.max(0.05, Math.min(0.07, i)), this.stereoEyeSeparation !== i && console.warn(`[BelowJS] Initial eye separation ${i}m clamped to ${this.stereoEyeSeparation}m (comfortable range for screens: 0.050-0.070m)`), this.dolly = null, this.isInitialized = !1, this.loadedModels = [], this.currentAbortController = null, this.skipRenderDuringLoad = !1, this.pixelRatioBeforeThrottle = 1, this.originalPixelRatio = 1, this.isConstrainedSafari = !1, this.init();
  }
  init() {
    try {
      this.initRenderer(), this.sceneManager = new Zr(this.config.scene), this.cameraManager = new ua(this.config.camera), this.modelLoader = new $(this.renderer), this.tilesetLoader = new Uc(this.renderer, this.cameraManager.camera), this.isConstrainedSafari = this.modelLoader?.isIOSWebKit || !1, this.initStereo(), this.renderer?.getPixelRatio ? this.originalPixelRatio = this.renderer.getPixelRatio() : typeof window < "u" && (this.originalPixelRatio = window.devicePixelRatio || 1), this.pixelRatioBeforeThrottle = this.originalPixelRatio, this.isVREnabled && this.initVR(), this.isAREnabled && this.initAR(), this.cameraManager.initControls(this.renderer.domElement), this.setupEventListeners(), this.startRenderLoop(), this.isInitialized = !0, typeof window < "u" && Tn.init(this), this.emit("initialized");
    } catch (e) {
      console.error("Failed to initialize BelowViewer:", e), this.emit("error", e);
    }
  }
  initRenderer() {
    this.renderer = new m.WebGLRenderer({
      antialias: this.config.renderer.antialias,
      alpha: this.config.renderer.alpha,
      powerPreference: this.config.renderer.powerPreference,
      logarithmicDepthBuffer: this.config.renderer.logarithmicDepthBuffer,
      preserveDrawingBuffer: !0
    }), this.renderer.setSize(this.container.clientWidth, this.container.clientHeight), this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = m.PCFSoftShadowMap, this.renderer.outputColorSpace = m.SRGBColorSpace;
    const e = {
      none: m.NoToneMapping,
      linear: m.LinearToneMapping,
      reinhard: m.ReinhardToneMapping,
      cineon: m.CineonToneMapping,
      "aces-filmic": m.ACESFilmicToneMapping
    };
    this.config.renderer.toneMapping && e[this.config.renderer.toneMapping] && (this.renderer.toneMapping = e[this.config.renderer.toneMapping]), this.renderer.toneMappingExposure = this.config.renderer.toneMappingExposure, this.container.appendChild(this.renderer.domElement);
  }
  initStereo() {
    this.stereoCamera || (this.stereoCamera = new m.StereoCamera()), this.stereoCamera.eyeSep = this.stereoEyeSeparation;
  }
  initVR() {
    this.dolly = new m.Group(), this.dolly.add(this.cameraManager.camera), this.sceneManager.scene.add(this.dolly);
    const e = this.config.audioPath || "./sound/", t = this.config.enableVRAudio === !0;
    this.vrManager = new iA(this.renderer, this.cameraManager.camera, this.sceneManager.scene, e, t, this.container), this.vrManager.setControls(this.cameraManager.controls), this.config.initialPositions && this.vrManager.setInitialPositions(this.config.initialPositions), this.vrManager.onModeToggle = () => {
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
      this.cameraManager.controls && (this.cameraManager.controls.enabled = !1), this.emit("vr-session-start");
    }, this.vrManager.onSessionEnd = () => {
      this.cameraManager.controls && (this.cameraManager.controls.enabled = !0), this.dolly.position.set(0, 0, 0), this.dolly.rotation.set(0, 0, 0), this.emit("vr-session-end");
    };
  }
  initAR() {
    const e = this.config.ar?.settings || {};
    this.arManager = new hA(
      this.renderer,
      this.cameraManager.camera,
      this.sceneManager.scene,
      e,
      this.container
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
   * @param {boolean} [options.optimizedLoadStrategy] - Prioritize closer tiles over SSE error
   * @param {number} [options.maxTilesProcessed] - Tiles processed per frame for streaming tilesets
   * @param {Object} [options.fetchOptions] - Fetch options for tileset network requests
   * @param {string} [options.up='+Y'] - Up-axis hint for tilesets ('+Y', '+Z', '-Z', '+X', '-X', '-Y')
   * @param {boolean|string} [options.geospatialReorientation='auto'] - Auto-level geospatial tilesets ('auto' | 'force' | false)
   * @param {boolean} [options.autoCenter=true] - Recenter streamed tilesets around origin as bounds become available
   * @param {number} [options.maxTriangles] - Approximate triangle budget for adaptive LOD (best-effort)
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
      const n = (A) => {
        s.aborted || this.emit("model-load-progress", { url: e, progress: A });
      }, o = (A) => {
        s.aborted || this.emit("model-load-stage", { url: e, stage: A });
      };
      let r, l = null;
      if (t.type === "tileset") {
        o && o("downloading");
        const A = await this.tilesetLoader.load(e, {
          signal: s,
          errorTarget: t.errorTarget,
          maxDepth: t.maxDepth,
          loadSiblings: t.loadSiblings,
          optimizedLoadStrategy: t.optimizedLoadStrategy,
          maxTilesProcessed: t.maxTilesProcessed,
          fetchOptions: t.fetchOptions,
          up: t.up,
          autoCenter: t.autoCenter,
          maxTriangles: t.maxTriangles,
          minErrorTarget: t.minErrorTarget,
          maxErrorTarget: t.maxErrorTarget,
          enableGltfExtensions: t.enableGltfExtensions,
          dracoDecoderPath: t.dracoDecoderPath,
          ktx2TranscoderPath: t.ktx2TranscoderPath
        });
        r = A.group, l = A.tileset, o && o("processing");
      } else
        r = await this.modelLoader.load(e, n, s, o);
      if (s.aborted)
        return null;
      t.position && r.position.fromArray(t.position), t.rotation && r.rotation.fromArray(t.rotation), t.scale && (typeof t.scale == "number" ? r.scale.setScalar(t.scale) : r.scale.fromArray(t.scale));
      const c = this.centerModelAndRecalculateBounds(r);
      return this.sceneManager.add(r), this.loadedModels.push({ model: r, url: e, options: t, originalCenter: c, tileset: l }), this.loadedModels.length === 1 && t.autoFrame !== !1 && this.frameModel(r), this.currentAbortController && this.currentAbortController.signal === s && (this.currentAbortController = null), o && o("completed"), this.emit("model-loaded", { model: r, url: e }), r;
    } catch (n) {
      if (this.currentAbortController && this.currentAbortController.signal === s && (this.currentAbortController = null), !s.aborted && n.message !== "Loading cancelled")
        throw console.error("Failed to load model:", n), this.emit("model-load-error", { url: e, error: n }), n;
      if (s.aborted || n.message === "Loading cancelled")
        return this.emit("model-load-cancelled", { url: e }), null;
      throw n;
    } finally {
      i && this.applyLoadRenderingConstraints(!1);
    }
  }
  frameModel(e) {
    const t = this.getValidModelBoundingBox(e);
    if (!t)
      return;
    const s = t.getSize(new m.Vector3()), i = t.getCenter(new m.Vector3());
    this.cameraManager.frameObject(i, s);
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
    const s = t.getCenter(new m.Vector3());
    e.position.sub(s);
    const i = new m.Box3().setFromObject(e);
    return this.isValidBox3(i) ? e.userData.boundingBox = i : e.userData.boundingBox = t.clone().translate(s.clone().multiplyScalar(-1)), s;
  }
  startRenderLoop() {
    let e = 0, t = 0;
    const s = (i) => {
      const n = Math.min((i - e) / 1e3, 0.1);
      e = i, this.vrManager && this.vrManager.update(n), this.arManager && this.arManager.update(n * 1e3), this.cameraManager && this.cameraManager.update(), this.emit("before-render", n);
      const o = this.renderer?.xr?.isPresenting;
      if (this.renderer && this.sceneManager && this.cameraManager) {
        const r = () => {
          (!this.skipRenderDuringLoad || o) && (this.stereoEnabled && !o && this.stereoMode === "sbs" ? this.renderSbsStereo() : this.renderer.render(this.sceneManager.scene, this.cameraManager.camera));
        };
        if (o) {
          if (r(), this.tilesetLoader) {
            const c = this.vrManager?.getVRStatus?.().movement?.isMoving === !0, A = typeof performance < "u" && typeof performance.now == "function" ? performance.now() : i, h = c ? 28 : 14;
            if (A - t >= h) {
              const u = this.renderer.xr.getCamera(this.cameraManager.camera);
              this.tilesetLoader.update(u, {
                queueOptions: {
                  maxTasks: c ? 1 : 2,
                  timeBudgetMs: c ? 0.7 : 1.5
                }
              }), t = A;
            }
          }
        } else {
          if (this.tilesetLoader) {
            const l = this.cameraManager.camera;
            this.tilesetLoader.update(l);
          }
          r();
        }
      }
    };
    this.renderer.setAnimationLoop(s);
  }
  renderSbsStereo() {
    if (!this.stereoCamera || !this.renderer || !this.sceneManager || !this.cameraManager)
      return;
    const e = this.renderer.getSize(new m.Vector2()), t = e.width, s = e.height, i = Math.floor(t / 2), n = t - i;
    this.stereoCamera.aspect = s > 0 ? i / s : 1, this.stereoCamera.update(this.cameraManager.camera), this.renderer.setScissorTest(!0), this.renderer.setViewport(0, 0, i, s), this.renderer.setScissor(0, 0, i, s), this.renderer.render(this.sceneManager.scene, this.stereoCamera.cameraL), this.renderer.setViewport(i, 0, n, s), this.renderer.setScissor(i, 0, n, s), this.renderer.render(this.sceneManager.scene, this.stereoCamera.cameraR), this.renderer.setScissorTest(!1), this.renderer.setViewport(0, 0, t, s);
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
      this.sceneManager.remove(e), i && this.tilesetLoader && this.tilesetLoader.disposeTileset(i), Ms(e), this.loadedModels.splice(t, 1), this.emit("model-removed", { model: e }), !this.loadedModels.some((o) => o.url === s) && this.modelLoader && this.modelLoader.releaseFromCache(s);
    }
  }
  clearModels() {
    this.arManager && this.arManager.setTargetModel(null);
    const e = new Set(this.loadedModels.map(({ url: t }) => t));
    this.loadedModels.forEach(({ model: t, tileset: s }) => {
      s && this.tilesetLoader && this.tilesetLoader.disposeTileset(s), Ms(t), this.sceneManager.remove(t);
    }), this.loadedModels.length = 0, e.forEach((t) => {
      this.modelLoader && this.modelLoader.releaseFromCache(t);
    }), this.emit("models-cleared");
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
    this.currentAbortController && this.currentAbortController.abort(), typeof window < "u" && Tn.cleanup(), this.vrManager && (this.vrManager.dispose(), this.vrManager = null), this.arManager && (this.arManager.dispose(), this.arManager = null), this.renderer && this.renderer.setAnimationLoop(null), this.loadedModels.forEach(({ model: e, tileset: t }) => {
      e.parent && e.parent.remove(e), t && this.tilesetLoader && this.tilesetLoader.disposeTileset(t), Ms(e);
    }), this.loadedModels = [], this.cameraManager && (this.cameraManager.dispose(), this.cameraManager = null), this.renderer && (this.renderer.dispose(), this.renderer.domElement && this.renderer.domElement.parentNode && this.renderer.domElement.parentNode.removeChild(this.renderer.domElement), this.renderer = null), this.modelLoader && (this.modelLoader.dispose(), this.modelLoader = null), this.tilesetLoader && (this.tilesetLoader.dispose(), this.tilesetLoader = null), window.removeEventListener("resize", this.onWindowResize.bind(this)), this.removeAllListeners(), this.isInitialized = !1;
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
const Rn = new it(), Ht = new v();
class tr extends Jr {
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
    const s = new Xs(t, 6, 1);
    return this.setAttribute("instanceStart", new Fe(s, 3, 0)), this.setAttribute("instanceEnd", new Fe(s, 3, 3)), this.instanceCount = this.attributes.instanceStart.count, this.computeBoundingBox(), this.computeBoundingSphere(), this;
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
    const s = new Xs(t, 6, 1);
    return this.setAttribute("instanceColorStart", new Fe(s, 3, 0)), this.setAttribute("instanceColorEnd", new Fe(s, 3, 3)), this;
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
    return this.fromWireframeGeometry(new Wr(e.geometry)), this;
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
    this.boundingBox === null && (this.boundingBox = new it());
    const e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
    e !== void 0 && t !== void 0 && (this.boundingBox.setFromBufferAttribute(e), Rn.setFromBufferAttribute(t), this.boundingBox.union(Rn));
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Et()), this.boundingBox === null && this.computeBoundingBox();
    const e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
    if (e !== void 0 && t !== void 0) {
      const s = this.boundingSphere.center;
      this.boundingBox.getCenter(s);
      let i = 0;
      for (let n = 0, o = e.count; n < o; n++)
        Ht.fromBufferAttribute(e, n), i = Math.max(i, s.distanceToSquared(Ht)), Ht.fromBufferAttribute(t, n), i = Math.max(i, s.distanceToSquared(Ht));
      this.boundingSphere.radius = Math.sqrt(i), isNaN(this.boundingSphere.radius) && console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.", this);
    }
  }
  toJSON() {
  }
}
Yt.line = {
  worldUnits: { value: 1 },
  linewidth: { value: 1 },
  resolution: { value: new k(1, 1) },
  dashOffset: { value: 0 },
  dashScale: { value: 1 },
  dashSize: { value: 1 },
  gapSize: { value: 1 }
  // todo FIX - maybe change to totalSize
};
Kt.line = {
  uniforms: Zn.merge([
    Yt.common,
    Yt.fog,
    Yt.line
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
class ss extends Wn {
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
      uniforms: Zn.clone(Kt.line.uniforms),
      vertexShader: Kt.line.vertexShader,
      fragmentShader: Kt.line.fragmentShader,
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
const Vs = new nt(), Dn = new v(), Ln = new v(), V = new nt(), O = new nt(), Ae = new nt(), Os = new v(), Hs = new P(), H = new Xr(), Fn = new v(), qt = new it(), zt = new Et(), he = new nt();
let de, Pe;
function kn(a, e, t) {
  return he.set(0, 0, -e, 1).applyMatrix4(a.projectionMatrix), he.multiplyScalar(1 / he.w), he.x = Pe / t.width, he.y = Pe / t.height, he.applyMatrix4(a.projectionMatrixInverse), he.multiplyScalar(1 / he.w), Math.abs(Math.max(he.x, he.y));
}
function uA(a, e) {
  const t = a.matrixWorld, s = a.geometry, i = s.attributes.instanceStart, n = s.attributes.instanceEnd, o = Math.min(s.instanceCount, i.count);
  for (let r = 0, l = o; r < l; r++) {
    H.start.fromBufferAttribute(i, r), H.end.fromBufferAttribute(n, r), H.applyMatrix4(t);
    const c = new v(), A = new v();
    de.distanceSqToSegment(H.start, H.end, A, c), A.distanceTo(c) < Pe * 0.5 && e.push({
      point: A,
      pointOnLine: c,
      distance: de.origin.distanceTo(A),
      object: a,
      face: null,
      faceIndex: r,
      uv: null,
      uv1: null
    });
  }
}
function gA(a, e, t) {
  const s = e.projectionMatrix, n = a.material.resolution, o = a.matrixWorld, r = a.geometry, l = r.attributes.instanceStart, c = r.attributes.instanceEnd, A = Math.min(r.instanceCount, l.count), h = -e.near;
  de.at(1, Ae), Ae.w = 1, Ae.applyMatrix4(e.matrixWorldInverse), Ae.applyMatrix4(s), Ae.multiplyScalar(1 / Ae.w), Ae.x *= n.x / 2, Ae.y *= n.y / 2, Ae.z = 0, Os.copy(Ae), Hs.multiplyMatrices(e.matrixWorldInverse, o);
  for (let d = 0, u = A; d < u; d++) {
    if (V.fromBufferAttribute(l, d), O.fromBufferAttribute(c, d), V.w = 1, O.w = 1, V.applyMatrix4(Hs), O.applyMatrix4(Hs), V.z > h && O.z > h)
      continue;
    if (V.z > h) {
      const y = V.z - O.z, f = (V.z - h) / y;
      V.lerp(O, f);
    } else if (O.z > h) {
      const y = O.z - V.z, f = (O.z - h) / y;
      O.lerp(V, f);
    }
    V.applyMatrix4(s), O.applyMatrix4(s), V.multiplyScalar(1 / V.w), O.multiplyScalar(1 / O.w), V.x *= n.x / 2, V.y *= n.y / 2, O.x *= n.x / 2, O.y *= n.y / 2, H.start.copy(V), H.start.z = 0, H.end.copy(O), H.end.z = 0;
    const p = H.closestPointToPointParameter(Os, !0);
    H.at(p, Fn);
    const b = st.lerp(V.z, O.z, p), E = b >= -1 && b <= 1, C = Os.distanceTo(Fn) < Pe * 0.5;
    if (E && C) {
      H.start.fromBufferAttribute(l, d), H.end.fromBufferAttribute(c, d), H.start.applyMatrix4(o), H.end.applyMatrix4(o);
      const y = new v(), f = new v();
      de.distanceSqToSegment(H.start, H.end, f, y), t.push({
        point: f,
        pointOnLine: y,
        distance: de.origin.distanceTo(f),
        object: a,
        face: null,
        faceIndex: d,
        uv: null,
        uv1: null
      });
    }
  }
}
class pA extends as {
  /**
   * Constructs a new wide line.
   *
   * @param {LineSegmentsGeometry} [geometry] - The line geometry.
   * @param {LineMaterial} [material] - The line material.
   */
  constructor(e = new tr(), t = new ss({ color: Math.random() * 16777215 })) {
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
    for (let o = 0, r = 0, l = t.count; o < l; o++, r += 2)
      Dn.fromBufferAttribute(t, o), Ln.fromBufferAttribute(s, o), i[r] = r === 0 ? 0 : i[r - 1], i[r + 1] = i[r] + Dn.distanceTo(Ln);
    const n = new Xs(i, 2, 1);
    return e.setAttribute("instanceDistanceStart", new Fe(n, 1, 0)), e.setAttribute("instanceDistanceEnd", new Fe(n, 1, 1)), this;
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
    const n = e.params.Line2 !== void 0 && e.params.Line2.threshold || 0;
    de = e.ray;
    const o = this.matrixWorld, r = this.geometry, l = this.material;
    Pe = l.linewidth + n, r.boundingSphere === null && r.computeBoundingSphere(), zt.copy(r.boundingSphere).applyMatrix4(o);
    let c;
    if (s)
      c = Pe * 0.5;
    else {
      const h = Math.max(i.near, zt.distanceToPoint(de.origin));
      c = kn(i, h, l.resolution);
    }
    if (zt.radius += c, de.intersectsSphere(zt) === !1)
      return;
    r.boundingBox === null && r.computeBoundingBox(), qt.copy(r.boundingBox).applyMatrix4(o);
    let A;
    if (s)
      A = Pe * 0.5;
    else {
      const h = Math.max(i.near, qt.distanceToPoint(de.origin));
      A = kn(i, h, l.resolution);
    }
    qt.expandByScalar(A), de.intersectsBox(qt) !== !1 && (s ? uA(this, t) : gA(this, i, t));
  }
  onBeforeRender(e) {
    const t = this.material.uniforms;
    t && t.resolution && (e.getViewport(Vs), this.material.uniforms.resolution.value.set(Vs.z, Vs.w));
  }
}
class oi extends tr {
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
class _n extends pA {
  /**
   * Constructs a new wide line.
   *
   * @param {LineGeometry} [geometry] - The line geometry.
   * @param {LineMaterial} [material] - The line material.
   */
  constructor(e = new oi(), t = new ss({ color: Math.random() * 16777215 })) {
    super(e, t), this.isLine2 = !0, this.type = "Line2";
  }
}
class fA {
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
    return !s || s.length === 0 ? [] : e.intersectObjects(s, !0).filter((n) => {
      const o = this.unifiedMeasurementPoints.some((c) => c.sphere === n.object), r = n.object === this.unifiedMeasurementLine, l = this.isMeasurementHelper(n.object);
      return !o && !r && !l;
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
  /**
   * Creates a new MeasurementSystem instance
   * 
   * @param {MeasurementSystemConfig} config - Configuration object
   */
  constructor({ scene: e, camera: t, renderer: s, controls: i, dolly: n, uiParent: o, getRaycastInfo: r, config: l = {}, theme: c = "dark", showMeasurementLabels: A = !1 }) {
    this.ghostSpheres = {
      left: null,
      right: null
    }, this.MAX_SPHERES = 2, this.measurementSpheres = [], this.measurementLine = null, this.measurementLabel = null, this.previousTriggerState = {}, this.unifiedMeasurementPoints = [], this.unifiedMeasurementLine = null, this.desktopMeasurementPoints = [], this.desktopMeasurementLine = null, typeof window < "u" && (window.measurementSystem = this), this.scene = e, this.camera = t, this.renderer = s, this.uiParent = o || null, this.getRaycastInfo = typeof r == "function" ? r : null, this.controls = i, this.dolly = n, this.config = l, this.theme = c, this.showMeasurementLabels = A, this._raycastTargets = e && e.children ? e.children : [], this.enabled = !0, this.isVR = !1, this.measurementPanel = null, this.desktopMeasurementMode = !1, this.measurementSystemEnabled = !0, this.measurementAvailable = !0, this.desktopMeasurementPoints = [], this.connectionLine = null, this.desktopMeasurementLine = null, this.measurementSprite = null, this.measurementCanvas = null, this.measurementTexture = null, this.lastClickTime = 0, this.lastTriggerTime = 0, this._wasInVR = !1, this.focusAnimation = null, this._cancelFocusOnUserInput = null, this.mouse = new m.Vector2(), this.raycaster = new m.Raycaster();
    const h = () => {
      let d = null, u = null;
      const g = null, p = null;
      if (e && e.children && e.children.forEach((b) => {
        b && b.inputSource && b.inputSource.handedness && (b.inputSource.handedness === "left" && (d = b), b.inputSource.handedness === "right" && (u = b));
      }), (!d || !u) && s && s.xr && s.xr.getController)
        try {
          d = d || s.xr.getController(0), u = u || s.xr.getController(1);
        } catch {
        }
      d && u ? (this.attachVR({ controller1: d, controller2: u, controllerGrip1: g, controllerGrip2: p }), this.ghostSpheres && this.ghostSpheres.left && this.ghostSpheres.right && (this.ghostSpheres.left.visible = !0, this.ghostSpheres.right.visible = !0)) : (this._ghostSphereAttachRetries || (this._ghostSphereAttachRetries = 0), this._ghostSphereAttachRetries < 40 ? (this._ghostSphereAttachRetries++, setTimeout(h, 250)) : typeof window < "u" && window.console && console.warn("[MeasurementSystem] Could not find VR controllers to attach ghost spheres after multiple attempts."));
    };
    if (h(), s && s.xr && s.xr.addEventListener && s.xr.addEventListener("sessionstart", h), this.sphereGeometry = new m.SphereGeometry(0.02, 8, 6), this.placedMaterial = new m.MeshBasicMaterial({ color: 16777215 }), this.vrLineMaterial = new ss({
      color: 16777215,
      linewidth: 3,
      transparent: !0,
      opacity: 0.8,
      depthTest: !1,
      vertexColors: !1,
      dashed: !1
    }), this.desktopLineMaterial = new ss({
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
          const u = s.xr.getController(0), g = s.xr.getController(1), p = s.xr.getControllerGrip ? s.xr.getControllerGrip(0) : void 0, b = s.xr.getControllerGrip ? s.xr.getControllerGrip(1) : void 0;
          this.attachVR({ controller1: u, controller2: g, controllerGrip1: p, controllerGrip2: b });
        }
      };
      if (s.xr.addEventListener && s.xr.addEventListener("sessionstart", d), s.xr.isPresenting && d(), s.xr && typeof s.xr.requestSession == "function" && !s.xr._measurementSystemPatched) {
        const u = s.xr.requestSession.bind(s.xr);
        s.xr.requestSession = async (...g) => {
          const p = await u(...g);
          return setTimeout(() => {
            d();
          }, 100), p;
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
        let s = t;
        if (this._raycastTargets && this._raycastTargets.length > 0 && this.camera) {
          const n = t.clone().sub(this.camera.position).normalize(), o = new m.Raycaster(this.camera.position, n), r = this.getValidIntersections(o);
          r.length > 0 && (s = r[0].point);
        }
        const i = new m.Mesh(this.sphereGeometry, this.placedMaterial);
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
        ]), this.desktopMeasurementLine = new _n(e, this.desktopLineMaterial), this.desktopMeasurementLine.computeLineDistances(), this.scene.add(this.desktopMeasurementLine);
        const t = this.desktopMeasurementPoints[0].position.distanceTo(this.desktopMeasurementPoints[1].position);
        if (this.createMeasurementDisplay(t), this.measurementSprite) {
          const s = new m.Vector3();
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
    const t = (window.devicePixelRatio || 1) * 4, s = 256, i = 64, n = s * t, o = i * t;
    this.measurementCanvas || (this.measurementCanvas = document.createElement("canvas")), (this.measurementCanvas.width !== n || this.measurementCanvas.height !== o) && (this.measurementCanvas.width = n, this.measurementCanvas.height = o);
    const r = this.measurementCanvas.getContext("2d");
    r.setTransform(1, 0, 0, 1, 0, 0), r.clearRect(0, 0, n, o), r.save(), r.scale(t, t);
    const l = 24;
    let c;
    e <= 2 ? c = 0.4 + e / 2 * 0.3 : e <= 4 ? c = 0.7 + (e - 2) / 2 * 0.2 : c = 0.9 + Math.min((e - 4) / 16, 1) * 0.5;
    const A = Math.round(l * c);
    r.font = `600 ${A}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`;
    const h = this.formatDistance(e), u = r.measureText(h).width, g = A, p = Math.max(6, A * 0.3), b = u + p * 2, E = g + p * 2, C = (s - b) / 2, y = (i - E) / 2;
    if (r.fillStyle = "rgba(0, 0, 0, 0.8)", r.beginPath(), r.roundRect(C, y, b, E, Math.max(4, A * 0.2)), r.fill(), r.fillStyle = "white", r.textAlign = "center", r.textBaseline = "middle", r.fillText(h, s / 2, i / 2), r.restore(), this.measurementTexture ? this.measurementTexture.needsUpdate = !0 : (this.measurementTexture = new m.CanvasTexture(this.measurementCanvas), this.measurementTexture.minFilter = m.LinearFilter, this.measurementTexture.magFilter = m.LinearFilter), !this.measurementSprite) {
      const B = new m.SpriteMaterial({
        map: this.measurementTexture,
        depthTest: !1,
        depthWrite: !1
      });
      this.measurementSprite = new m.Sprite(B);
    }
    const I = 0.3 * c, w = s / i;
    return this.measurementSprite.scale.set(I * w, I, 1), this.measurementSprite;
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
    }, this._onVRTriggerDown = this._onVRTriggerDown.bind(this), this._onVRTriggerUp = this._onVRTriggerUp.bind(this), this._onVRYButtonDown = this._onVRYButtonDown.bind(this), this._onVRYButtonUp = this._onVRYButtonUp.bind(this), this.controller1 && this.controller2 && (this.controller1.addEventListener("selectstart", this._onVRTriggerDown), this.controller1.addEventListener("selectend", this._onVRTriggerUp), this.controller2.addEventListener("selectstart", this._onVRTriggerDown), this.controller2.addEventListener("selectend", this._onVRTriggerUp), this.controller1.addEventListener("ybuttondown", this._onVRYButtonDown), this.controller1.addEventListener("ybuttonup", this._onVRYButtonUp), this.controller2.addEventListener("ybuttondown", this._onVRYButtonDown), this.controller2.addEventListener("ybuttonup", this._onVRYButtonUp)), this.isVR = !0, this.refreshMeasurementDisplayForVR();
  }
  _onVRTriggerDown() {
  }
  _onVRTriggerUp(e) {
    if (!this.measurementAvailable) return;
    const t = e.target, s = performance.now();
    if (!(this.lastTriggerTime && s - this.lastTriggerTime < 200) && (this.lastTriggerTime = s, this.measurementSystemEnabled)) {
      const i = new m.Vector3();
      let n = null;
      if (t === this.controller1 && this.ghostSpheres.left ? n = this.ghostSpheres.left : t === this.controller2 && this.ghostSpheres.right && (n = this.ghostSpheres.right), n)
        n.getWorldPosition(i);
      else {
        t.getWorldPosition(i);
        const o = new m.Vector3(0, 0, -0.05);
        o.applyQuaternion(t.quaternion), i.add(o);
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
    const t = new m.Matrix4();
    t.identity().extractRotation(e.matrixWorld);
    const s = new m.Vector3(), i = new m.Vector3(0, 0, -1).applyMatrix4(t);
    e.getWorldPosition(s);
    const n = new m.Raycaster(s, i.normalize()), o = this.scene && this.scene.children ? this.scene.children : [], r = this.getValidIntersections(n, o);
    return r.length > 0 ? r[0] : null;
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
    const s = new m.Mesh(this.sphereGeometry, this.placedMaterial);
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
      ]), this.unifiedMeasurementLine = new _n(s, this.desktopLineMaterial), this.unifiedMeasurementLine.computeLineDistances(), this.unifiedMeasurementLine.userData.isMeasurementLine = !0, this.scene.add(this.unifiedMeasurementLine);
      const i = e.distanceTo(t);
      this.createMeasurementDisplay(i);
      const n = i * 100 <= 20 ? 0.125 : 0.5;
      if (this.unifiedMeasurementPoints.forEach((o) => {
        o.sphere && o.sphere.scale.setScalar(n);
      }), this.measurementSprite) {
        const o = new m.Vector3();
        o.addVectors(e, t), o.multiplyScalar(0.5);
        const r = Math.max(0.05, Math.min(0.2, i * 0.03));
        o.y += r, this.measurementSprite.position.copy(o), this.scene.children.includes(this.measurementSprite) || this.scene.add(this.measurementSprite);
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
    this.isVR && this.ghostSpheres && (this.ghostSpheres.left && this.controller1 && this.ghostSpheres.left.parent === this.controller1 && (this.ghostSpheres.left.position.set(0, 0, -0.07), this.ghostSpheres.left.rotation.set(0, 0, 0), this.ghostSpheres.left.scale.set(1, 1, 1)), this.ghostSpheres.right && this.controller2 && this.ghostSpheres.right.parent === this.controller2 && (this.ghostSpheres.right.position.set(0, 0, -0.07), this.ghostSpheres.right.rotation.set(0, 0, 0), this.ghostSpheres.right.scale.set(1, 1, 1)));
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
    const t = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting, s = this.unifiedMeasurementPoints ? this.unifiedMeasurementPoints.length : 0, i = s === 2, n = t ? this.measurementSystemEnabled : this.desktopMeasurementMode;
    let o;
    if (i && (o = this.unifiedMeasurementPoints[0].position.distanceTo(this.unifiedMeasurementPoints[1].position)), e.classList.remove("disabled", "active", "measured", "unavailable"), e.style.opacity = "", e.style.cursor = "pointer", e.setAttribute("aria-disabled", "false"), e.removeAttribute("title"), !this.measurementAvailable) {
      e.classList.add("disabled", "unavailable"), e.style.opacity = "0.55", e.style.cursor = "not-allowed", e.setAttribute("aria-disabled", "true"), e.title = "This model is marked as not measurable", e.innerHTML = `
        <div>MEASURE</div>
        <div style="font-size: 12px; margin-top: 4px;">Not available</div>
      `;
      return;
    }
    if (!n)
      e.classList.add("disabled"), e.innerHTML = `
        <div>MEASURE</div>
        <div style="font-size: 12px; margin-top: 4px;">Click to enable</div>
      `;
    else if (i)
      e.classList.add("measured"), e.innerHTML = `
        <div>${this.formatDistance(o)}</div>
        <div style="font-size: 12px; margin-top: 4px;">Click to disable</div>
      `;
    else {
      e.classList.add("active");
      const r = t ? "Use triggers" : "Click points";
      e.innerHTML = `
        <div>MEASURE: ON</div>
        <div style="font-size: 12px; margin-top: 4px;">${r} (${s}/2)</div>
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
    let i = this.camera, n = !1;
    if (this.getRaycastInfo) {
      const r = this.getRaycastInfo(e);
      r && r.mouse && Number.isFinite(r.mouse.x) && Number.isFinite(r.mouse.y) && (r.mouse.isVector2 ? this.mouse.copy(r.mouse) : (this.mouse.x = r.mouse.x, this.mouse.y = r.mouse.y), r.camera && (i = r.camera), n = !0);
    }
    if (!n) {
      const r = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = (e.clientX - r.left) / r.width * 2 - 1, this.mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    }
    if (this.renderer && this.renderer.xr && this.renderer.xr.isPresenting) {
      const r = this.renderer.xr.getCamera();
      r && (i = r);
    }
    if ((!i || !i.isPerspectiveCamera && !i.isOrthographicCamera) && this.scene && this.scene.children) {
      for (const r of this.scene.children)
        if (r.isCamera) {
          i = r;
          break;
        }
    }
    if ((!i || !i.isPerspectiveCamera && !i.isOrthographicCamera) && typeof window < "u" && window.camera && (window.camera.isPerspectiveCamera || window.camera.isOrthographicCamera) && (i = window.camera), !i || !i.isPerspectiveCamera && !i.isOrthographicCamera && i.type !== "ArrayCamera")
      return;
    this.raycaster.setFromCamera(this.mouse, i);
    const o = this.getValidIntersections(this.raycaster);
    if (o.length > 0)
      if (s)
        this.focusOnPoint(o[0].point);
      else {
        const r = o[0].point;
        this.placeUnifiedMeasurementPoint(r, "desktop");
      }
  }
  focusOnPoint(e) {
    if (!e || !this.controls || !this.camera)
      return;
    this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null), this._cancelFocusOnUserInput && (this.controls.removeEventListener("start", this._cancelFocusOnUserInput), this._cancelFocusOnUserInput = null);
    const t = this.controls.target.clone(), s = this.camera.position.clone(), i = s.clone().sub(t), n = e.clone().add(i), o = 1e3, r = performance.now(), l = () => {
      this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null), this._cancelFocusOnUserInput && (this.controls.removeEventListener("start", this._cancelFocusOnUserInput), this._cancelFocusOnUserInput = null);
    };
    this._cancelFocusOnUserInput = l, this.controls.addEventListener("start", l, { once: !0 });
    const c = () => {
      const A = performance.now() - r, h = Math.min(A / o, 1), d = 1 - Math.pow(1 - h, 3);
      this.controls.target.lerpVectors(t, e, d), this.camera.position.lerpVectors(s, n, d), h < 1 ? this.focusAnimation = requestAnimationFrame(c) : (this.focusAnimation = null, this._cancelFocusOnUserInput && (this.controls.removeEventListener("start", this._cancelFocusOnUserInput), this._cancelFocusOnUserInput = null));
    };
    this.focusAnimation = requestAnimationFrame(c);
  }
  _focusOnPoint(e) {
    if (this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null), !this.controls || !this.camera) {
      console.warn("[MeasurementSystem] No controls or camera available for focusing");
      return;
    }
    const t = this.controls.target.clone(), s = this.camera.position.clone(), i = s.clone().sub(t), n = e.clone().add(i), o = 1e3, r = performance.now(), l = () => {
      const c = performance.now() - r, A = Math.min(c / o, 1), h = 1 - Math.pow(1 - A, 3);
      this.controls.target.lerpVectors(t, e, h), this.camera.position.lerpVectors(s, n, h), this.controls.update(), A < 1 ? this.focusAnimation = requestAnimationFrame(l) : this.focusAnimation = null;
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
        const i = new m.Vector3();
        i.addVectors(e, t), i.multiplyScalar(0.5);
        const n = Math.max(0.05, Math.min(0.2, s * 0.03));
        i.y += n, this.measurementSprite.position.copy(i), this.scene.children.includes(this.measurementSprite) || this.scene.add(this.measurementSprite);
        const o = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting;
        this.measurementSprite.visible = o || this.showMeasurementLabels;
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
class mA {
  constructor(e) {
    this.scene = e, this.particleBounds = {
      min: new m.Vector3(-50, -25, -50),
      max: new m.Vector3(50, 25, 50)
    }, this.particleCount = 1750, this.densityMultiplier = 1, this.createParticleSystem();
  }
  calculateParticleCount(e) {
    const t = new m.Vector3();
    e.getSize(t);
    const i = t.clone().multiplyScalar(2.5), n = i.x * i.y * i.z, o = Math.round(n * 0.01 * this.densityMultiplier);
    return Math.max(100, Math.min(16e3, o));
  }
  /**
   * Set particle density multiplier and recreate system
   */
  setDensity(e) {
    if (this.densityMultiplier = Math.max(0, Math.min(2, e)), this.densityMultiplier === 0) {
      this.disable();
      return;
    }
    const t = new m.Box3(this.particleBounds.min, this.particleBounds.max), s = this.calculateParticleCount(t);
    this.particles && (this.scene.remove(this.particles), this.particles.geometry && this.particles.geometry.dispose(), this.particles.material && this.particles.material.dispose(), this.particles = null), this.particleCount = s, this.createParticleSystem(), this.enable();
  }
  createParticleSystem() {
    const e = new Float32Array(this.particleCount * 3), t = new Float32Array(this.particleCount * 3), s = new Float32Array(this.particleCount);
    this.initializeParticleData(e, t, s);
    const i = new m.BufferGeometry(), n = new Float32Array(this.particleCount);
    for (let o = 0; o < this.particleCount; o++)
      n[o] = o;
    i.setAttribute("position", new m.BufferAttribute(e, 3)), i.setAttribute("originalSize", new m.BufferAttribute(s, 1)), i.setAttribute("velocity", new m.BufferAttribute(t, 3)), i.setAttribute("particleIndex", new m.BufferAttribute(n, 1)), this.originalMaterial = this.createParticleMaterial(), this.particles = new m.Points(i, this.originalMaterial), this.particles.visible = !1, this.scene.add(this.particles);
  }
  /**
   * Initialize particle data arrays
   */
  initializeParticleData(e, t, s) {
    for (let i = 0; i < this.particleCount; i++) {
      const n = i * 3;
      e[n] = this.particleBounds.min.x + Math.random() * (this.particleBounds.max.x - this.particleBounds.min.x), e[n + 1] = this.particleBounds.min.y + Math.random() * (this.particleBounds.max.y - this.particleBounds.min.y), e[n + 2] = this.particleBounds.min.z + Math.random() * (this.particleBounds.max.z - this.particleBounds.min.z);
      const o = 1e-5, r = -5e-6, l = 5e-6;
      t[n] = o + (Math.random() - 0.5) * 2e-5, t[n + 1] = r + (-Math.random() * 1e-5 - 5e-6), t[n + 2] = l + (Math.random() - 0.5) * 2e-5;
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
    const i = new m.CanvasTexture(e);
    return i.needsUpdate = !0, new m.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointTexture: { value: i },
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
    const t = new m.Box3().setFromObject(e), s = t.getSize(new m.Vector3()), i = t.getCenter(new m.Vector3()), o = s.clone().multiplyScalar(2.5 * 0.5);
    this.particleBounds.min.copy(i).sub(o), this.particleBounds.max.copy(i).add(o);
    const r = this.calculateParticleCount(new m.Box3(this.particleBounds.min, this.particleBounds.max));
    Math.abs(r - this.particleCount) > this.particleCount * 0.2 ? (this.particles && (this.scene.remove(this.particles), this.particles.geometry && this.particles.geometry.dispose(), this.particles.material && this.particles.material.dispose(), this.particles = null), this.particleCount = r, this.createParticleSystem()) : this.redistributeParticles();
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
class bA {
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
    this.controllerSpotlight = new m.SpotLight(
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
    this.controllerSpotlight.shadow.mapSize.width = i, this.controllerSpotlight.shadow.mapSize.height = i, this.controllerSpotlight.shadow.camera.near = 0.1, this.controllerSpotlight.shadow.camera.far = s, this.controllerSpotlight.shadow.camera.fov = e, this.controllerSpotlight.shadow.bias = -5e-4, this.controllerSpotlight.shadow.normalBias = 0.02, this.controllerSpotlight.shadow.radius = 4, this.controllerSpotlight.shadow.blurSamples = 10, this.scene.add(this.controllerSpotlight), this.spotlightTarget = new m.Object3D(), this.scene.add(this.spotlightTarget), this.controllerSpotlight.target = this.spotlightTarget;
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
    const t = new m.Vector3(), s = new m.Quaternion();
    e.getWorldPosition(t), e.getWorldQuaternion(s), this.controllerSpotlight.position.copy(t);
    const i = new m.Vector3(0, 0, -1);
    i.applyQuaternion(s);
    const n = t.clone().add(i.multiplyScalar(2));
    this.spotlightTarget.position.copy(n);
  }
  updateCameraPosition(e) {
    if (!this.controllerSpotlight || !this.spotlightTarget) return;
    this.controllerSpotlight.position.copy(e.position);
    const t = new m.Vector3(0, 0, -1);
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
class CA {
  constructor(e) {
    this.scene = e, this.overheadLight = null, this.clearModeDirectionalLight = null, this.clearModeHemisphereLight = null, this.isTransitioning = !1, this.currentMode = "survey", this.pendingAnimations = /* @__PURE__ */ new Set(), this.isDisposed = !1, this.initializeLighting();
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
        this.clearModeDirectionalLight || (this.clearModeDirectionalLight = new m.DirectionalLight(16777215, 1.32), this.clearModeDirectionalLight.position.set(50, 100, 50), this.clearModeDirectionalLight.castShadow = !0, this.clearModeDirectionalLight.shadow.mapSize.width = 2048, this.clearModeDirectionalLight.shadow.mapSize.height = 2048, this.clearModeDirectionalLight.shadow.camera.near = 0.5, this.clearModeDirectionalLight.shadow.camera.far = 500, this.clearModeDirectionalLight.shadow.camera.left = -150, this.clearModeDirectionalLight.shadow.camera.right = 150, this.clearModeDirectionalLight.shadow.camera.top = 150, this.clearModeDirectionalLight.shadow.camera.bottom = -150, this.scene.add(this.clearModeDirectionalLight)), this.clearModeHemisphereLight || (this.clearModeHemisphereLight = new m.HemisphereLight(16777215, 4473924, 0.77), this.scene.add(this.clearModeHemisphereLight)), this.fillLight || (this.fillLight = new m.DirectionalLight(16777215, 0.88), this.fillLight.position.set(-10, 10, -10), this.scene.add(this.fillLight)), this.bottomLight || (this.bottomLight = new m.DirectionalLight(16777215, 0.33), this.bottomLight.position.set(0, -10, 0), this.scene.add(this.bottomLight));
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
  setVRDiveMode() {
    this.overheadLight && this.scene.children.includes(this.overheadLight) && this.scene.remove(this.overheadLight);
  }
  setDesktopDiveMode() {
    this.overheadLight && this.scene.children.includes(this.overheadLight) && this.scene.remove(this.overheadLight);
  }
  fadeLighting({ target: e, fromIntensity: t, toIntensity: s, fromColor: i, toColor: n, duration: o = 500, onComplete: r }) {
    if (this.isDisposed || !e) {
      r && r();
      return;
    }
    const l = Symbol("fade-animation");
    this.pendingAnimations.add(l);
    const c = performance.now(), A = s - t;
    let h, d;
    i !== void 0 && n !== void 0 && (h = new m.Color(i), d = new m.Color(n));
    const u = (g) => {
      if (!this.pendingAnimations.has(l) || this.isDisposed) {
        r && r();
        return;
      }
      try {
        const p = g - c, b = Math.min(p / o, 1), E = 1 - Math.pow(1 - b, 3);
        if (!e || this.scene && !this.scene.children.includes(e)) {
          this.pendingAnimations.delete(l), r && r();
          return;
        }
        e.intensity = t + A * E, h && d && e.color && e.color.lerpColors(h, d, E), b < 1 ? requestAnimationFrame(u) : (this.pendingAnimations.delete(l), r && r());
      } catch (p) {
        console.error("Error in lighting animation:", p), this.pendingAnimations.delete(l), r && r();
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
class EA {
  constructor(e, t, s) {
    this.scene = e, this.renderer = t, this.camera = s, this.isDiveModeEnabled = !1, this.currentVRMode = null, this.lighting = new CA(e), this.particles = new mA(e), this.torch = new bA(e), this.isQuest2 = !1, this.isQuest3 = !1, this._fallbackHandedness = /* @__PURE__ */ new Map(), this.detectQuestDevice(), this.applyModeSettings();
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
    this.isQuest2 ? (this.camera.far = 20, this.camera.updateProjectionMatrix(), this.isDiveModeEnabled && (this.scene.fog = new m.FogExp2(268073, 0.084))) : (this.camera.far = 2e3, this.camera.updateProjectionMatrix(), this.isDiveModeEnabled && (this.scene.fog = new m.FogExp2(268073, 0.056)));
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
        const i = s.classList.contains("right"), n = e ? e.checked : !1;
        (i && !n || !i && n) && this.toggleDiveMode();
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
          const n = i.gamepad, o = i.handedness;
          [4, 5].forEach((l) => {
            if (n.buttons[l]) {
              const c = n.buttons[l], A = `${o}-${l}`;
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
      const n = this._resolveHandedness(i, s);
      if (!n) {
        s += 1;
        continue;
      }
      t.push({ gamepad: i, handedness: n }), s += 1;
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
class yA extends yt {
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
   * @param {boolean} [options.clickToExit=true] - Exit fly mode on click
   */
  constructor(e = {}) {
    super(), this.domElement = e.domElement || null, this.camera = e.camera || null, this.controls = e.controls || null, this.renderer = e.renderer || null, this.enabled = e.enabled ?? !0, this.baseSpeed = e.baseSpeed ?? 6, this.boostSpeed = e.boostSpeed ?? 20, this.speedScale = e.speedScale ?? 100, this.mouseSensitivity = e.mouseSensitivity ?? 2e-3, this.clickToExit = e.clickToExit ?? !0, this.pointerLocked = !1, this.modelSize = this.speedScale, this.cameraYaw = 0, this.cameraPitch = 0, this.keys = {
      w: !1,
      a: !1,
      s: !1,
      d: !1,
      q: !1,
      e: !1,
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
    const s = t.getSize(new m.Vector3()), i = Math.max(s.x, s.y, s.z);
    i > 0 && Number.isFinite(i) && (this.modelSize = Math.max(1, Math.min(1e4, i)));
  }
  update(e) {
    if (!this.enabled || !this.pointerLocked) return;
    if (this.renderer?.xr?.isPresenting) {
      this.exitFlyMode();
      return;
    }
    if (!this.camera) return;
    const t = this.modelSize / this.speedScale, i = (this.keys.shift ? this.boostSpeed : this.baseSpeed) * t, n = new m.Vector3();
    this.keys.w && (n.z -= 1), this.keys.s && (n.z += 1), this.keys.a && (n.x -= 1), this.keys.d && (n.x += 1), this.keys.q && (n.y -= 1), this.keys.e && (n.y += 1), n.lengthSq() > 0 && (n.normalize(), n.applyQuaternion(this.camera.quaternion), this.camera.position.addScaledVector(n, i * e), this._syncControlsTarget());
  }
  _syncControlsTarget() {
    if (!this.controls || !this.camera) return;
    const e = new m.Vector3(0, 0, -5).applyQuaternion(this.camera.quaternion);
    this.controls.target.copy(this.camera.position).add(e);
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
    if (s in this.keys && (this.keys[s] = !0), e.shiftKey && (this.keys.shift = !0), e.shiftKey && (e.key === "`" || e.key === "~" || e.code === "Backquote")) {
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
    this.cameraYaw -= e.movementX * this.mouseSensitivity, this.cameraPitch -= e.movementY * this.mouseSensitivity, this.cameraPitch = Math.max(
      -Math.PI / 2 + 0.01,
      Math.min(Math.PI / 2 - 0.01, this.cameraPitch)
    );
    const t = new m.Euler(this.cameraPitch, this.cameraYaw, 0, "YXZ");
    this.camera.quaternion.setFromEuler(t), this._syncControlsTarget();
  }
  _onPointerLockChange() {
    const e = this.pointerLocked;
    if (this.pointerLocked = document.pointerLockElement === this.domElement, this.pointerLocked && !e && this.camera) {
      const t = new m.Euler().setFromQuaternion(this.camera.quaternion, "YXZ");
      this.cameraYaw = t.y, this.cameraPitch = t.x;
    }
    this.controls && (this.pointerLocked ? (this._controlsEnabledBefore = this.controls.enabled, this.controls.enabled = !1) : this.controls.enabled = this._controlsEnabledBefore), this.emit("fly-mode-change", { active: this.pointerLocked });
  }
  _onClick() {
    this.pointerLocked && this.exitFlyMode();
  }
}
class ri extends yt {
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
    this.config = new cs(s).validate(t), this.options = this.config, this.currentModelKey = null, this.belowViewer = null, this.ui = {}, this.uiRoot = null, this.stereoUiMirror = null, this.stereoUiObserver = null, this.stereoUiSyncQueued = !1, this.stereoUiActive = !1, this.measurementSystem = null, this.comfortGlyph = null, this.diveSystem = null, this.fullscreenButton = null, this.screenshotButton = null, this.flyControls = null, this.lastComfortMode = null, this._vrButtonWasVisible = !1, this.isLoading = !1, this.loadingMessage = "", this.loadingModelName = "", this.loadingPercentage = 0, this.lastManualLoadingMessage = "", this.stageOverrideActive = !1, this.vrUpdateLoop = null, this.lastRequestedModelKey = null, this.recoveryHandlers = null, this.recoveryTimer = null, this.recoveryCooldownMs = 1200, this.lastRecoveryAttemptAt = 0, this.recoveryAttempts = 0, this.maxRecoveryAttempts = 3, this.hadContextLoss = !1, this.isDisposed = !1, typeof window < "u" && (window.modelViewer = this), this.init();
  }
  init() {
    const e = {
      ...this.config.viewerConfig,
      // Enable VR only if AR is not enabled
      ...this.config.enableVR && !this.config.enableAR && { vr: { enabled: !0 } },
      // Enable AR if requested
      ...this.config.enableAR && { ar: { enabled: !0, ...this.config.viewerConfig?.ar || {} } },
      // Explicitly disable VR when AR is enabled
      ...this.config.enableAR && { vr: { enabled: !1 } },
      ...this.config.audioPath && { audioPath: this.config.audioPath },
      ...typeof this.config.enableVRAudio < "u" && { enableVRAudio: this.config.enableVRAudio }
    };
    if (this.belowViewer = new dA(this.container, e), this.setupEventForwarding(), this.setupRecoveryHandlers(), this.belowViewer.on("initialized", () => {
      this.setupRecoveryHandlers(), this.setupFocusInteraction(), this._maybeAttachMeasurementSystem(), this._maybeAttachVRComfortGlyph(), this._maybeAttachDiveSystem(), this._maybeAttachScreenshotButton(), this._maybeAttachFullscreenButton(), this._maybeAttachFlyControls();
    }), this.belowViewer.isInitialized && (this.setupRecoveryHandlers(), this.setupFocusInteraction(), this._maybeAttachMeasurementSystem(), this._maybeAttachVRComfortGlyph(), this._maybeAttachDiveSystem(), this._maybeAttachScreenshotButton(), this._maybeAttachFullscreenButton(), this._maybeAttachFlyControls()), Object.keys(this.config.models).length > 0 && (this.createUI(), this.populateDropdown(), this.config.autoLoadFirst)) {
      const t = Object.keys(this.config.models)[0];
      setTimeout(() => this.loadModel(t), 100);
    }
  }
  _maybeAttachMeasurementSystem() {
    if (!this.config.enableMeasurement || this.measurementSystem) return;
    this.measurementSystem = new fA({
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
      this.belowViewer.vrManager.onComfortModeChange = (n) => {
        i && i(n);
        const o = n && typeof n.enabled == "boolean" ? n.enabled : this.belowViewer.vrManager.isComfortModeEnabled();
        this.lastComfortMode = o, this.comfortGlyph && this.comfortGlyph.setComfortMode(o, {
          emitEvent: !1,
          applyToManager: !1
        }), this.emit("comfort-mode-change", {
          enabled: o,
          inVR: this.belowViewer.vrManager.isVRPresenting,
          preset: o ? "comfort" : "free"
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
      ri._isEditableTarget(i.target) || i.code === "KeyC" && (i.ctrlKey || i.metaKey) && (i.preventDefault(), this.comfortGlyph && this.comfortGlyph.toggle());
    }), window.addEventListener("beforeunload", () => this.comfortGlyph && this.comfortGlyph.dispose());
  }
  _maybeAttachDiveSystem() {
    if (!this.config.enableDiveSystem || this.diveSystem) return;
    this.diveSystem = new EA(
      this.belowViewer.sceneManager.scene,
      this.belowViewer.renderer,
      this.belowViewer.cameraManager.camera
    ), setTimeout(() => {
      this.diveSystem.initializeToggleSwitch();
    }, 100), document.addEventListener("keydown", (t) => {
      if (!ri._isEditableTarget(t.target)) {
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
    this.flyControls = new yA({
      domElement: this.belowViewer.renderer.domElement,
      camera: this.belowViewer.cameraManager.camera,
      controls: this.belowViewer.cameraManager.controls,
      renderer: this.belowViewer.renderer,
      ...this.config.flyControls
    }), this._ensureFlyModeIndicator(), this.flyControls.on("fly-mode-change", (t) => {
      this.emit("fly-mode-change", t), this.ui.flyIndicator && this.ui.flyIndicator.classList.toggle("visible", t.active), this._handleVRButtonVisibility(t.active);
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
    }, i = (o) => {
      o && typeof o.preventDefault == "function" && o.preventDefault(), this.hadContextLoss = !0;
    }, n = () => {
      this.queueRecovery("context-restored", { forceReload: !0, delayMs: 120 });
    };
    document.addEventListener("visibilitychange", t), window.addEventListener("focus", s), e.addEventListener("webglcontextlost", i, !1), e.addEventListener("webglcontextrestored", n, !1), this.recoveryHandlers = {
      canvas: e,
      onVisibilityChange: t,
      onWindowFocus: s,
      onContextLost: i,
      onContextRestored: n
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
    const o = Object.keys(this.config.models)[0], r = this.currentModelKey || this.lastRequestedModelKey || o;
    if (!r || !this.config.models[r]) {
      this.forceRefreshFrame();
      return;
    }
    if (this.recoveryAttempts += 1, this.updateStatus("Recovering viewer..."), await this.loadModel(r), (this.belowViewer?.getLoadedModels?.()?.length || 0) > 0) {
      this.hadContextLoss = !1, this.recoveryAttempts = 0, this.forceRefreshFrame(), this.emit("viewer-recovered", { reason: e, modelKey: r });
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
  /**
   * Captures a screenshot of the current 3D scene without UI overlays
   * 
   * The method forces a render to ensure the canvas is up-to-date, validates
   * the resulting image data, and automatically downloads the screenshot as a PNG
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
      const e = this.belowViewer?.renderer?.domElement;
      if (!e) {
        console.error("[ModelViewer] No canvas available for screenshot");
        return;
      }
      this.belowViewer.renderer && this.belowViewer.sceneManager && this.belowViewer.cameraManager && this.belowViewer.renderer.render(this.belowViewer.sceneManager.scene, this.belowViewer.cameraManager.camera);
      const t = e.toDataURL("image/png");
      if (t === "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==") {
        console.error("[ModelViewer] Screenshot captured empty canvas");
        return;
      }
      const s = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "").slice(0, -5), n = `${this.currentModelKey ? this.config.models[this.currentModelKey]?.name?.replace(/[^a-zA-Z0-9\-_]/g, "-") || this.currentModelKey.replace(/[^a-zA-Z0-9\-_]/g, "-") : "unknown"}-belowjs-${s}.png`, o = document.createElement("a");
      o.href = t, o.download = n, document.body.appendChild(o), o.click(), document.body.removeChild(o), console.log(`[ModelViewer] Screenshot saved as ${n}`);
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
    if (this.flyControls && this.flyControls.exitFlyMode(), this.ui.info && (this.ui.info.style.display = "none"), this.ui.selector && (this.ui.selector.style.pointerEvents = "none", this.ui.selector.style.opacity = "0.5"), this.isLoading && this.updateVRLoadingIndicator(), !this.vrUpdateLoop) {
      let e = 0;
      const t = (s) => {
        this.belowViewer && this.belowViewer.renderer && this.belowViewer.renderer.xr && this.belowViewer.renderer.xr.isPresenting ? (s - e > 100 && (this.vrLoadingSprite && this.belowViewer.sceneManager.scene.children.includes(this.vrLoadingSprite) && this.isLoading && this.positionVRLoadingSprite(), e = s), this.vrUpdateLoop = requestAnimationFrame(t)) : this.vrUpdateLoop = null;
      };
      this.vrUpdateLoop = requestAnimationFrame(t);
    }
    this.measurementSystem && typeof this.measurementSystem.attachVR == "function" && setTimeout(() => {
      const e = this.belowViewer?.renderer;
      if (e && e.xr && typeof e.xr.getController == "function") {
        const t = e.xr.getController(0), s = e.xr.getController(1), i = e.xr.getControllerGrip ? e.xr.getControllerGrip(0) : void 0, n = e.xr.getControllerGrip ? e.xr.getControllerGrip(1) : void 0;
        this.measurementSystem.attachVR({ controller1: t, controller2: s, controllerGrip1: i, controllerGrip2: n }), this.measurementSystem.resetGhostSpherePositions();
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
    const n = { x: 0, y: 0 }, o = 5, r = (h) => {
      i = !1, n.x = h.clientX, n.y = h.clientY;
    }, l = (h) => {
      if (!i) {
        const d = Math.abs(h.clientX - n.x), u = Math.abs(h.clientY - n.y);
        (d > o || u > o) && (i = !0);
      }
    }, c = () => {
      setTimeout(() => {
        i = !1;
      }, 10);
    }, A = (h) => {
      const d = Date.now(), u = d - s < t;
      s = d, !(this.belowViewer.renderer.xr?.isPresenting || i) && (this.measurementSystem && this.measurementSystem.desktopMeasurementMode || u && this.focusOnPoint(h));
    };
    e.addEventListener("mousedown", r), e.addEventListener("mousemove", l), e.addEventListener("mouseup", c), e.addEventListener("click", A), this.focusEventHandlers = {
      onMouseDown: r,
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
    const i = e.clientX - s.left, n = e.clientY - s.top;
    if (!Number.isFinite(i) || !Number.isFinite(n))
      return null;
    const o = this.belowViewer.cameraManager.getCamera();
    let r = o, l = i / s.width * 2 - 1;
    const c = -(n / s.height * 2 - 1), A = this.belowViewer.getStereoSettings?.();
    if (A?.enabled === !0 && A?.mode === "sbs" && this.belowViewer.stereoCamera) {
      const h = this.belowViewer.stereoCamera, d = s.width / 2, u = i <= d, g = u ? d : s.width - d, p = u ? i : i - d;
      g > 0 && (l = p / g * 2 - 1), h.aspect = s.height > 0 ? d / s.height : 1, h.update(o), r = u ? h.cameraL : h.cameraR;
    }
    return {
      mouse: { x: l, y: c },
      camera: r
    };
  }
  focusOnPoint(e) {
    const t = this.getPointerRaycastInfo(e), s = t?.mouse, i = t?.camera;
    if (!s || !i)
      return;
    const n = new m.Raycaster();
    n.setFromCamera(s, i);
    let o = [];
    if (this.measurementSystem && this.measurementSystem._raycastTargets && this.measurementSystem._raycastTargets.length > 0)
      o = this.measurementSystem._raycastTargets;
    else {
      const l = this.belowViewer.sceneManager.getScene();
      o = [], l.traverse((c) => {
        c.isMesh && c.geometry && !this.isMeasurementHelper(c) && o.push(c);
      });
    }
    if (o.length === 0)
      return;
    const r = n.intersectObjects(o, !0);
    if (r.length > 0) {
      const l = r[0].point;
      this.belowViewer.cameraManager.focusOn(l), this.emit("focus", { point: l, intersect: r[0] });
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
      t.target.value && this.loadModel(t.target.value);
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
      const n = document.createElement("div");
      n.id = "modeToggleContainer";
      const o = document.createElement("div");
      o.className = "semantic-toggle";
      const r = document.createElement("input");
      r.type = "checkbox", r.id = "modeToggleSwitch", r.className = "mode-toggle__switch", o.appendChild(r);
      const l = document.createElement("div");
      l.className = "toggle-slider-bg", o.appendChild(l);
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
      const g = document.createElement("div");
      g.className = "toggle-text", g.textContent = "Dive", d.appendChild(u), d.appendChild(g), o.appendChild(c), o.appendChild(d), n.appendChild(o), s.appendChild(n);
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
    const n = document.createElement("div");
    n.className = "toggle-option left";
    const o = document.createElement("div");
    o.className = "toggle-icon", o.textContent = "📋";
    const r = document.createElement("div");
    r.className = "toggle-text", r.textContent = "Survey", n.appendChild(o), n.appendChild(r);
    const l = document.createElement("div");
    l.className = "toggle-option right";
    const c = document.createElement("div");
    c.className = "toggle-icon", c.textContent = "🌊";
    const A = document.createElement("div");
    A.className = "toggle-text", A.textContent = "Dive", l.appendChild(c), l.appendChild(A), t.appendChild(n), t.appendChild(l), e.appendChild(t), this.getUiContainer().appendChild(e), this.ui.diveToggle = e;
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
    const i = (window.devicePixelRatio || 1) * 2, n = 512, o = 256, r = n * i, l = o * i;
    this.vrLoadingCanvas || (this.vrLoadingCanvas = document.createElement("canvas")), (this.vrLoadingCanvas.width !== r || this.vrLoadingCanvas.height !== l) && (this.vrLoadingCanvas.width = r, this.vrLoadingCanvas.height = l);
    const c = this.vrLoadingCanvas.getContext("2d");
    c.setTransform(1, 0, 0, 1, 0, 0), c.clearRect(0, 0, r, l), c.save(), c.scale(i, i);
    const A = n / 2, h = o / 2, d = 25, u = h - 40;
    if (c.shadowColor = "rgba(0, 0, 0, 0.8)", c.shadowBlur = 3, c.strokeStyle = "rgba(255, 255, 255, 0.3)", c.lineWidth = 3, c.beginPath(), c.arc(A, u, d, 0, Math.PI * 2), c.stroke(), c.shadowColor = "transparent", c.shadowBlur = 0, s > 0) {
      const g = s / 100 * Math.PI * 2;
      c.strokeStyle = "#ffffff", c.lineWidth = 3, c.beginPath(), c.arc(A, u, d, -Math.PI / 2, -Math.PI / 2 + g), c.stroke();
    }
    if (c.fillStyle = "white", c.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', c.textAlign = "center", c.textBaseline = "middle", c.shadowColor = "rgba(0, 0, 0, 0.8)", c.shadowBlur = 2, c.shadowOffsetX = 1, c.shadowOffsetY = 1, c.fillText(`${Math.round(s)}%`, A, u), t && (c.fillStyle = "white", c.font = '600 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', c.textAlign = "center", c.textBaseline = "middle", c.shadowColor = "rgba(0, 0, 0, 0.8)", c.shadowBlur = 4, c.shadowOffsetX = 1, c.shadowOffsetY = 1, c.fillText(t, A, h + 20)), c.fillStyle = "rgba(255, 255, 255, 0.9)", c.font = '400 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', c.shadowColor = "rgba(0, 0, 0, 0.8)", c.shadowBlur = 3, c.shadowOffsetX = 1, c.shadowOffsetY = 1, c.fillText(e, A, h + 50), c.restore(), this.vrLoadingTexture ? this.vrLoadingTexture.needsUpdate = !0 : (this.vrLoadingTexture = new m.CanvasTexture(this.vrLoadingCanvas), this.vrLoadingTexture.minFilter = m.LinearFilter, this.vrLoadingTexture.magFilter = m.LinearFilter), !this.vrLoadingSprite) {
      const g = new m.SpriteMaterial({
        map: this.vrLoadingTexture,
        depthTest: !1,
        depthWrite: !1,
        transparent: !0
      });
      this.vrLoadingSprite = new m.Sprite(g);
      const p = 0.7, b = n / o;
      this.vrLoadingSprite.scale.set(p * b, p, 1);
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
      this.measurementSystem && (this.measurementSystem.clearUnifiedMeasurement(), this.measurementSystem.clearLegacyVRMeasurement(), this.measurementSystem.clearLegacyDesktopMeasurement()), this.belowViewer.clearModels(), this.belowViewer.vrManager && (this.belowViewer.vrManager.stopMovement(), this.belowViewer.vrManager.resetTeleportState()), await new Promise((o) => setTimeout(o, 50));
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
        optimizedLoadStrategy: t.optimizedLoadStrategy,
        maxTilesProcessed: t.maxTilesProcessed,
        fetchOptions: t.fetchOptions,
        up: t.up,
        geospatialReorientation: t.geospatialReorientation,
        autoCenter: t.autoCenter,
        maxTriangles: t.maxTriangles,
        minErrorTarget: t.minErrorTarget,
        maxErrorTarget: t.maxErrorTarget,
        enableGltfExtensions: t.enableGltfExtensions,
        dracoDecoderPath: t.dracoDecoderPath,
        ktx2TranscoderPath: t.ktx2TranscoderPath
      });
      if (n) {
        const o = !!t.initialPositions?.desktop;
        this.applyInitialPositions(t, n), t.type === "tileset" && !o && !this.belowViewer.isVRPresenting() && this.belowViewer.frameModel(n), this.hideLoading(), this.updateStatus(`Loaded: ${t.name || e}`), this.applyModelMeasurementConfig(t, n), this.modelReady = !0, this.recoveryAttempts = 0, this.emit("model-switched", { modelKey: e, model: n, config: t }), this.emit("modelLoaded", { modelKey: e, model: n, config: t });
      } else this.currentModelKey === e && this.queueRecovery("empty-load-result", { forceReload: !0, delayMs: 350 });
    } catch (n) {
      n.message !== "Loading cancelled" && (console.error("Failed to load model:", n), this.hideLoading(), this.updateStatus(`Error loading ${t.name || e}`), this.applyModelMeasurementConfig(t, null), this.currentModelKey === e && (typeof document > "u" || !document.hidden) && this.queueRecovery("model-load-error", { forceReload: !0, delayMs: 500 }));
    }
  }
  applyInitialPositions(e, t) {
    const s = e.initialPositions;
    if (!s) return;
    const i = this.belowViewer.getVRManager();
    i && i.setInitialPositions(s);
    const n = this.belowViewer.isVRPresenting();
    if (n && s.vr) {
      const o = this.belowViewer.getCamera().parent;
      o && (o.position.set(
        s.vr.dolly.x,
        s.vr.dolly.y,
        s.vr.dolly.z
      ), o.rotation.set(
        s.vr.rotation.x,
        s.vr.rotation.y,
        s.vr.rotation.z
      ));
    } else if (!n && s.desktop) {
      const o = this.belowViewer.getCamera(), r = this.belowViewer.cameraManager.controls;
      o && r && (o.position.set(
        s.desktop.camera.x,
        s.desktop.camera.y,
        s.desktop.camera.z
      ), r.target.set(
        s.desktop.target.x,
        s.desktop.target.y,
        s.desktop.target.z
      ), r.update());
    }
  }
  showLoading(e = "Loading...", t = null) {
    if (this.isLoading = !0, this.loadingModelName = t || "", this.loadingPercentage = 0, this.setManualLoadingMessage(e), this.lastManualLoadingMessage = e || "", this.ui.loading) {
      const s = this.ui.loading.querySelector(".loading-status"), i = this.ui.loading.querySelector(".loading-model-name"), n = this.ui.loading.querySelector(".spinner-percentage");
      s && (s.textContent = e), i && t && (i.textContent = t), n && (n.textContent = "0%"), this.ui.loading.style.display = "flex";
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
    const e = this.belowViewer.cameraManager.camera, t = 2, s = new m.Vector3();
    e.getWorldDirection(s);
    const i = new m.Vector3();
    e.getWorldPosition(i);
    const n = new m.Vector3();
    n.copy(i), n.add(s.multiplyScalar(t)), this.vrLoadingSprite.position.copy(n), this.vrLoadingSprite.lookAt(i);
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
          const n = 2 * Math.PI * 20, o = n - t / 100 * n;
          i.style.strokeDashoffset = o;
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
      const { canvas: e, onVisibilityChange: t, onWindowFocus: s, onContextLost: i, onContextRestored: n } = this.recoveryHandlers;
      typeof document < "u" && t && document.removeEventListener("visibilitychange", t), typeof window < "u" && s && window.removeEventListener("focus", s), e && i && e.removeEventListener("webglcontextlost", i, !1), e && n && e.removeEventListener("webglcontextrestored", n, !1), this.recoveryHandlers = null;
    }
    if (typeof window < "u" && window.modelViewer === this && (window.modelViewer = null), this.focusEventHandlers && this.belowViewer?.renderer?.domElement) {
      const e = this.belowViewer.renderer.domElement;
      e.removeEventListener("mousedown", this.focusEventHandlers.onMouseDown), e.removeEventListener("mousemove", this.focusEventHandlers.onMouseMove), e.removeEventListener("mouseup", this.focusEventHandlers.onMouseUp), e.removeEventListener("click", this.focusEventHandlers.onMouseClick), this.focusEventHandlers = null;
    }
    this.measurementSystem && (this.measurementSystem.dispose(), this.measurementSystem = null), this.comfortGlyph && (this.comfortGlyph.dispose(), this.comfortGlyph = null), this.diveSystem && (this.diveSystem.dispose(), this.diveSystem = null, typeof window < "u" && window.diveSystem === this.diveSystem && (window.diveSystem = null)), this.fullscreenButton && (this.fullscreenButton.remove(), this.fullscreenButton = null, document.removeEventListener("fullscreenchange", this._onFullscreenChange)), this.screenshotButton && (this.screenshotButton.remove(), this.screenshotButton = null), this.stereoUiObserver && (this.stereoUiObserver.disconnect(), this.stereoUiObserver = null), this.stereoUiMirror && (this.stereoUiMirror.remove(), this.stereoUiMirror = null), this.belowViewer && this.belowViewer.dispose(), this.removeAllListeners();
  }
}
export {
  dA as BelowViewer,
  ua as Camera,
  cs as ConfigValidator,
  yt as EventSystem,
  yA as FlyControls,
  _n as Line2,
  oi as LineGeometry,
  ss as LineMaterial,
  $ as ModelLoader,
  ri as ModelViewer,
  Zr as Scene,
  iA as VRManager
};
