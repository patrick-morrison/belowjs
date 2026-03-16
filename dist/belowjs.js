import * as f from "three";
import { Controls as oa, Vector3 as Q, MOUSE as ct, TOUCH as ot, Quaternion as dt, Spherical as pi, Vector2 as U, Ray as Es, Plane as vr, MathUtils as gt, TrianglesDrawMode as aa, TriangleFanDrawMode as gi, TriangleStripDrawMode as Mr, Loader as Pi, LoaderUtils as Rt, FileLoader as Oe, MeshPhysicalMaterial as ve, Color as se, LinearSRGBColorSpace as Ee, SRGBColorSpace as De, SpotLight as la, PointLight as ca, DirectionalLight as ha, Matrix4 as V, InstancedMesh as _i, InstancedBufferAttribute as Aa, Object3D as Is, TextureLoader as da, ImageBitmapLoader as ua, BufferAttribute as me, InterleavedBuffer as pa, InterleavedBufferAttribute as Ye, LinearMipmapLinearFilter as ws, NearestMipmapLinearFilter as ga, LinearMipmapNearestFilter as fa, NearestMipmapNearestFilter as ma, LinearFilter as $e, NearestFilter as xr, RepeatWrapping as fi, MirroredRepeatWrapping as ba, ClampToEdgeWrapping as Ca, PointsMaterial as Tr, Material as Ps, LineBasicMaterial as ya, MeshStandardMaterial as Ui, DoubleSide as Qr, MeshBasicMaterial as Je, PropertyBinding as Ea, BufferGeometry as Bs, SkinnedMesh as Ia, Mesh as Ss, LineSegments as wa, Line as Ba, LineLoop as Sa, Points as Rr, Group as ht, PerspectiveCamera as va, OrthographicCamera as Lr, Skeleton as Ma, AnimationClip as xa, Bone as Ta, InterpolateDiscrete as Qa, InterpolateLinear as kr, Texture as nn, VectorKeyframeTrack as rn, NumberKeyframeTrack as on, QuaternionKeyframeTrack as an, ColorManagement as mi, FrontSide as Ra, Interpolant as La, Box3 as ft, Sphere as Ft, CompressedCubeTexture as ka, CompressedArrayTexture as Da, CompressedTexture as Dr, NoColorSpace as bi, RGBA_BPTC_Format as Ci, RGBA_S3TC_DXT5_Format as yi, RGBA_S3TC_DXT3_Format as ln, RGB_S3TC_DXT1_Format as cn, RGBA_S3TC_DXT1_Format as Ei, RGBA_ASTC_6x6_Format as hn, RGBA_ASTC_4x4_Format as ls, RGBA_ETC2_EAC_Format as Fr, RGB_ETC2_Format as Pr, RedFormat as xt, RGFormat as Tt, RGBAFormat as at, UnsignedByteType as Ce, HalfFloatType as lt, FloatType as Lt, DataTexture as _r, Data3DTexture as Fa, RGB_PVRTC_4BPPV1_Format as Pa, RGB_ETC1_Format as _a, RGBA_PVRTC_4BPPV1_Format as Ua, RGB_BPTC_UNSIGNED_Format as Ga, Euler as Ur, TextureUtils as Na, LoadingManager as Va, EventDispatcher as Vt, Frustum as Oa, DefaultLoadingManager as vs, Matrix3 as Gr, Float32BufferAttribute as As, WebGLRenderer as Ha, WebGLRenderTarget as An, ShaderMaterial as Nr, OneFactor as qa, ZeroFactor as za, CustomBlending as ja, Box2 as Ka, Matrix2 as Ya, Vector4 as mt, SphereGeometry as Vr, BoxGeometry as Ja, DynamicDrawUsage as Wa, InstancedBufferGeometry as Xa, InstancedInterleavedBuffer as Ii, WireframeGeometry as $a, ShaderLib as cs, UniformsUtils as Or, UniformsLib as hs, Line3 as Za } from "three";
class Pt {
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
class Ms {
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
      const n = this.schema[i], r = s[i];
      if (n.type === "object" && n.schema) {
        const a = r ?? n.default;
        t[i] = new Ms(n.schema).validate(a || {});
      } else if (r == null)
        t[i] = n.default;
      else if (this.isTypeValid(r, n.type))
        t[i] = r;
      else {
        const a = Array.isArray(n.type) ? n.type.join(" or ") : n.type;
        console.warn(
          `ConfigValidator: Invalid type for option '${i}'. Expected '${a}', but received '${typeof r}'. Using default value: ${JSON.stringify(n.default)}.`
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
class el {
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
const dn = { type: "change" }, Gi = { type: "start" }, Hr = { type: "end" }, Ot = new Es(), un = new vr(), tl = Math.cos(70 * gt.DEG2RAD), q = new Q(), ie = 2 * Math.PI, G = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, _s = 1e-6;
class sl extends oa {
  /**
   * Constructs a new controls instance.
   *
   * @param {Object3D} object - The object that is managed by the controls.
   * @param {?HTMLDOMElement} domElement - The HTML element used for event listeners.
   */
  constructor(e, t = null) {
    super(e, t), this.state = G.NONE, this.target = new Q(), this.cursor = new Q(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: ct.ROTATE, MIDDLE: ct.DOLLY, RIGHT: ct.PAN }, this.touches = { ONE: ot.ROTATE, TWO: ot.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new Q(), this._lastQuaternion = new dt(), this._lastTargetPosition = new Q(), this._quat = new dt().setFromUnitVectors(e.up, new Q(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new pi(), this._sphericalDelta = new pi(), this._scale = 1, this._panOffset = new Q(), this._rotateStart = new U(), this._rotateEnd = new U(), this._rotateDelta = new U(), this._panStart = new U(), this._panEnd = new U(), this._panDelta = new U(), this._dollyStart = new U(), this._dollyEnd = new U(), this._dollyDelta = new U(), this._dollyDirection = new Q(), this._mouse = new U(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = nl.bind(this), this._onPointerDown = il.bind(this), this._onPointerUp = rl.bind(this), this._onContextMenu = dl.bind(this), this._onMouseWheel = ll.bind(this), this._onKeyDown = cl.bind(this), this._onTouchStart = hl.bind(this), this._onTouchMove = Al.bind(this), this._onMouseDown = ol.bind(this), this._onMouseMove = al.bind(this), this._interceptControlDown = ul.bind(this), this._interceptControlUp = pl.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(dn), this.update(), this.state = G.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    q.copy(t).sub(this.target), q.applyQuaternion(this._quat), this._spherical.setFromVector3(q), this.autoRotate && this.state === G.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let s = this.minAzimuthAngle, i = this.maxAzimuthAngle;
    isFinite(s) && isFinite(i) && (s < -Math.PI ? s += ie : s > Math.PI && (s -= ie), i < -Math.PI ? i += ie : i > Math.PI && (i -= ie), s <= i ? this._spherical.theta = Math.max(s, Math.min(i, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (s + i) / 2 ? Math.max(s, this._spherical.theta) : Math.min(i, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let n = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const r = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), n = r != this._spherical.radius;
    }
    if (q.setFromSpherical(this._spherical), q.applyQuaternion(this._quatInverse), t.copy(this.target).add(q), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let r = null;
      if (this.object.isPerspectiveCamera) {
        const a = q.length();
        r = this._clampDistance(a * this._scale);
        const l = a - r;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), n = !!l;
      } else if (this.object.isOrthographicCamera) {
        const a = new Q(this._mouse.x, this._mouse.y, 0);
        a.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), n = l !== this.object.zoom;
        const c = new Q(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object), this.object.position.sub(c).add(a), this.object.updateMatrixWorld(), r = q.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      r !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position) : (Ot.origin.copy(this.object.position), Ot.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Ot.direction)) < tl ? this.object.lookAt(this.target) : (un.setFromNormalAndCoplanarPoint(this.object.up, this.target), Ot.intersectPlane(un, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const r = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), r !== this.object.zoom && (this.object.updateProjectionMatrix(), n = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, n || this._lastPosition.distanceToSquared(this.object.position) > _s || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > _s || this._lastTargetPosition.distanceToSquared(this.target) > _s ? (this.dispatchEvent(dn), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? ie / 60 * this.autoRotateSpeed * e : ie / 60 / 60 * this.autoRotateSpeed;
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
    q.setFromMatrixColumn(t, 0), q.multiplyScalar(-e), this._panOffset.add(q);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? q.setFromMatrixColumn(t, 1) : (q.setFromMatrixColumn(t, 0), q.crossVectors(this.object.up, q)), q.multiplyScalar(e), this._panOffset.add(q);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, t) {
    const s = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const i = this.object.position;
      q.copy(i).sub(this.target);
      let n = q.length();
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
    const s = this.domElement.getBoundingClientRect(), i = e - s.left, n = t - s.top, r = s.width, a = s.height;
    this._mouse.x = i / r * 2 - 1, this._mouse.y = -(n / a) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
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
    this._rotateLeft(ie * this._rotateDelta.x / t.clientHeight), this._rotateUp(ie * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(ie * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-ie * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(ie * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-ie * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
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
    this._rotateLeft(ie * this._rotateDelta.x / t.clientHeight), this._rotateUp(ie * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
    const r = (e.pageX + t.x) * 0.5, a = (e.pageY + t.y) * 0.5;
    this._updateZoomParameters(r, a);
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
    t === void 0 && (t = new U(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
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
function il(o) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(o.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(o) && (this._addPointer(o), o.pointerType === "touch" ? this._onTouchStart(o) : this._onMouseDown(o)));
}
function nl(o) {
  this.enabled !== !1 && (o.pointerType === "touch" ? this._onTouchMove(o) : this._onMouseMove(o));
}
function rl(o) {
  switch (this._removePointer(o), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(o.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Hr), this.state = G.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function ol(o) {
  let e;
  switch (o.button) {
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
    case ct.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(o), this.state = G.DOLLY;
      break;
    case ct.ROTATE:
      if (o.ctrlKey || o.metaKey || o.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(o), this.state = G.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(o), this.state = G.ROTATE;
      }
      break;
    case ct.PAN:
      if (o.ctrlKey || o.metaKey || o.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(o), this.state = G.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(o), this.state = G.PAN;
      }
      break;
    default:
      this.state = G.NONE;
  }
  this.state !== G.NONE && this.dispatchEvent(Gi);
}
function al(o) {
  switch (this.state) {
    case G.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(o);
      break;
    case G.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(o);
      break;
    case G.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(o);
      break;
  }
}
function ll(o) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== G.NONE || (o.preventDefault(), this.dispatchEvent(Gi), this._handleMouseWheel(this._customWheelEvent(o)), this.dispatchEvent(Hr));
}
function cl(o) {
  this.enabled !== !1 && this._handleKeyDown(o);
}
function hl(o) {
  switch (this._trackPointer(o), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case ot.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(o), this.state = G.TOUCH_ROTATE;
          break;
        case ot.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(o), this.state = G.TOUCH_PAN;
          break;
        default:
          this.state = G.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case ot.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(o), this.state = G.TOUCH_DOLLY_PAN;
          break;
        case ot.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(o), this.state = G.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = G.NONE;
      }
      break;
    default:
      this.state = G.NONE;
  }
  this.state !== G.NONE && this.dispatchEvent(Gi);
}
function Al(o) {
  switch (this._trackPointer(o), this.state) {
    case G.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(o), this.update();
      break;
    case G.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(o), this.update();
      break;
    case G.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(o), this.update();
      break;
    case G.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(o), this.update();
      break;
    default:
      this.state = G.NONE;
  }
}
function dl(o) {
  this.enabled !== !1 && o.preventDefault();
}
function ul(o) {
  o.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function pl(o) {
  o.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
class gl extends Pt {
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
      this.controls = new sl(this.camera, e);
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
    const s = t && t.isVector3 ? t.clone() : new f.Vector3(t || 1, t || 1, t || 1), i = Math.max(s.x, 1e-3), n = Math.max(s.y, 1e-3), r = Math.max(s.z, 1e-3), a = f.MathUtils.degToRad(this.camera.fov), l = 2 * Math.atan(Math.tan(a / 2) * this.camera.aspect), c = n * 0.5 / Math.tan(a / 2), h = i * 0.5 / Math.tan(l / 2), d = Math.max(c, h) * 1.2 + r * 0.5, u = new f.Vector3(0.7, 0.5, 0.7).normalize(), p = e.clone().add(u.multiplyScalar(d));
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
    const s = this.controls.target.clone(), i = this.camera.position.clone(), n = i.clone().sub(s), r = e.clone().add(n), a = 1e3, l = performance.now(), c = () => {
      this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null, this.controls.removeEventListener("start", c));
    };
    this.controls.addEventListener("start", c, { once: !0 });
    const h = () => {
      const A = performance.now() - l, d = Math.min(A / a, 1), u = 1 - Math.pow(1 - d, 3);
      this.controls.target.lerpVectors(s, e, u), this.camera.position.lerpVectors(i, r, u), d < 1 ? this.focusAnimation = requestAnimationFrame(h) : (this.focusAnimation = null, this.controls.removeEventListener("start", c), this.emit("focus-complete", { target: e, position: r }));
    };
    this.focusAnimation = requestAnimationFrame(h), this.emit("focus-start", { target: e, startPosition: i, newPosition: r });
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
function fl(o) {
  let e = 0;
  for (const s in o.attributes) {
    const i = o.getAttribute(s);
    e += i.count * i.itemSize * i.array.BYTES_PER_ELEMENT;
  }
  const t = o.getIndex();
  return e += t ? t.count * t.itemSize * t.array.BYTES_PER_ELEMENT : 0, e;
}
function pn(o, e) {
  if (e === aa)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), o;
  if (e === gi || e === Mr) {
    let t = o.getIndex();
    if (t === null) {
      const r = [], a = o.getAttribute("position");
      if (a !== void 0) {
        for (let l = 0; l < a.count; l++)
          r.push(l);
        o.setIndex(r), t = o.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), o;
    }
    const s = t.count - 2, i = [];
    if (e === gi)
      for (let r = 1; r <= s; r++)
        i.push(t.getX(0)), i.push(t.getX(r)), i.push(t.getX(r + 1));
    else
      for (let r = 0; r < s; r++)
        r % 2 === 0 ? (i.push(t.getX(r)), i.push(t.getX(r + 1)), i.push(t.getX(r + 2))) : (i.push(t.getX(r + 2)), i.push(t.getX(r + 1)), i.push(t.getX(r)));
    i.length / 3 !== s && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const n = o.clone();
    return n.setIndex(i), n.clearGroups(), n;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), o;
}
class tt extends Pi {
  /**
   * Constructs a new glTF loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new El(t);
    }), this.register(function(t) {
      return new Il(t);
    }), this.register(function(t) {
      return new Rl(t);
    }), this.register(function(t) {
      return new Ll(t);
    }), this.register(function(t) {
      return new kl(t);
    }), this.register(function(t) {
      return new Bl(t);
    }), this.register(function(t) {
      return new Sl(t);
    }), this.register(function(t) {
      return new vl(t);
    }), this.register(function(t) {
      return new Ml(t);
    }), this.register(function(t) {
      return new yl(t);
    }), this.register(function(t) {
      return new xl(t);
    }), this.register(function(t) {
      return new wl(t);
    }), this.register(function(t) {
      return new Ql(t);
    }), this.register(function(t) {
      return new Tl(t);
    }), this.register(function(t) {
      return new bl(t);
    }), this.register(function(t) {
      return new Dl(t);
    }), this.register(function(t) {
      return new Fl(t);
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
    let r;
    if (this.resourcePath !== "")
      r = this.resourcePath;
    else if (this.path !== "") {
      const c = Rt.extractUrlBase(e);
      r = Rt.resolveURL(c, this.path);
    } else
      r = Rt.extractUrlBase(e);
    this.manager.itemStart(e);
    const a = function(c) {
      i ? i(c) : console.error(c), n.manager.itemError(e), n.manager.itemEnd(e);
    }, l = new Oe(this.manager);
    l.setPath(this.path), l.setResponseType("arraybuffer"), l.setRequestHeader(this.requestHeader), l.setWithCredentials(this.withCredentials), l.load(e, function(c) {
      try {
        n.parse(c, r, function(h) {
          t(h), n.manager.itemEnd(e);
        }, a);
      } catch (h) {
        a(h);
      }
    }, s, a);
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
    const r = {}, a = {}, l = new TextDecoder();
    if (typeof e == "string")
      n = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (l.decode(new Uint8Array(e, 0, 4)) === qr) {
        try {
          r[D.KHR_BINARY_GLTF] = new Pl(e);
        } catch (A) {
          i && i(A);
          return;
        }
        n = JSON.parse(r[D.KHR_BINARY_GLTF].content);
      } else
        n = JSON.parse(l.decode(e));
    else
      n = e;
    if (n.asset === void 0 || n.asset.version[0] < 2) {
      i && i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const c = new Jl(n, {
      path: t || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    c.fileLoader.setRequestHeader(this.requestHeader);
    for (let h = 0; h < this.pluginCallbacks.length; h++) {
      const A = this.pluginCallbacks[h](c);
      A.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), a[A.name] = A, r[A.name] = !0;
    }
    if (n.extensionsUsed)
      for (let h = 0; h < n.extensionsUsed.length; ++h) {
        const A = n.extensionsUsed[h], d = n.extensionsRequired || [];
        switch (A) {
          case D.KHR_MATERIALS_UNLIT:
            r[A] = new Cl();
            break;
          case D.KHR_DRACO_MESH_COMPRESSION:
            r[A] = new _l(n, this.dracoLoader);
            break;
          case D.KHR_TEXTURE_TRANSFORM:
            r[A] = new Ul();
            break;
          case D.KHR_MESH_QUANTIZATION:
            r[A] = new Gl();
            break;
          default:
            d.indexOf(A) >= 0 && a[A] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + A + '".');
        }
      }
    c.setExtensions(r), c.setPlugins(a), c.parse(s, i);
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
function ml() {
  let o = {};
  return {
    get: function(e) {
      return o[e];
    },
    add: function(e, t) {
      o[e] = t;
    },
    remove: function(e) {
      delete o[e];
    },
    removeAll: function() {
      o = {};
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
class bl {
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
    const h = new se(16777215);
    l.color !== void 0 && h.setRGB(l.color[0], l.color[1], l.color[2], Ee);
    const A = l.range !== void 0 ? l.range : 0;
    switch (l.type) {
      case "directional":
        c = new ha(h), c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      case "point":
        c = new ca(h), c.distance = A;
        break;
      case "spot":
        c = new la(h), c.distance = A, l.spot = l.spot || {}, l.spot.innerConeAngle = l.spot.innerConeAngle !== void 0 ? l.spot.innerConeAngle : 0, l.spot.outerConeAngle = l.spot.outerConeAngle !== void 0 ? l.spot.outerConeAngle : Math.PI / 4, c.angle = l.spot.outerConeAngle, c.penumbra = 1 - l.spot.innerConeAngle / l.spot.outerConeAngle, c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + l.type);
    }
    return c.position.set(0, 0, 0), ke(c, l), l.intensity !== void 0 && (c.intensity = l.intensity), c.name = t.createUniqueName(l.name || "light_" + e), i = Promise.resolve(c), t.cache.add(s, i), i;
  }
  getDependency(e, t) {
    if (e === "light")
      return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this, s = this.parser, n = s.json.nodes[e], a = (n.extensions && n.extensions[this.name] || {}).light;
    return a === void 0 ? null : this._loadLight(a).then(function(l) {
      return s._getNodeRef(t.cache, a, l);
    });
  }
}
class Cl {
  constructor() {
    this.name = D.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return Je;
  }
  extendParams(e, t, s) {
    const i = [];
    e.color = new se(1, 1, 1), e.opacity = 1;
    const n = t.pbrMetallicRoughness;
    if (n) {
      if (Array.isArray(n.baseColorFactor)) {
        const r = n.baseColorFactor;
        e.color.setRGB(r[0], r[1], r[2], Ee), e.opacity = r[3];
      }
      n.baseColorTexture !== void 0 && i.push(s.assignTexture(e, "map", n.baseColorTexture, De));
    }
    return Promise.all(i);
  }
}
class yl {
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
class El {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ve;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = [], r = i.extensions[this.name];
    if (r.clearcoatFactor !== void 0 && (t.clearcoat = r.clearcoatFactor), r.clearcoatTexture !== void 0 && n.push(s.assignTexture(t, "clearcoatMap", r.clearcoatTexture)), r.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = r.clearcoatRoughnessFactor), r.clearcoatRoughnessTexture !== void 0 && n.push(s.assignTexture(t, "clearcoatRoughnessMap", r.clearcoatRoughnessTexture)), r.clearcoatNormalTexture !== void 0 && (n.push(s.assignTexture(t, "clearcoatNormalMap", r.clearcoatNormalTexture)), r.clearcoatNormalTexture.scale !== void 0)) {
      const a = r.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new U(a, a);
    }
    return Promise.all(n);
  }
}
class Il {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ve;
  }
  extendMaterialParams(e, t) {
    const i = this.parser.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = i.extensions[this.name];
    return t.dispersion = n.dispersion !== void 0 ? n.dispersion : 0, Promise.resolve();
  }
}
class wl {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ve;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = [], r = i.extensions[this.name];
    return r.iridescenceFactor !== void 0 && (t.iridescence = r.iridescenceFactor), r.iridescenceTexture !== void 0 && n.push(s.assignTexture(t, "iridescenceMap", r.iridescenceTexture)), r.iridescenceIor !== void 0 && (t.iridescenceIOR = r.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), r.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = r.iridescenceThicknessMinimum), r.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = r.iridescenceThicknessMaximum), r.iridescenceThicknessTexture !== void 0 && n.push(s.assignTexture(t, "iridescenceThicknessMap", r.iridescenceThicknessTexture)), Promise.all(n);
  }
}
class Bl {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ve;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = [];
    t.sheenColor = new se(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const r = i.extensions[this.name];
    if (r.sheenColorFactor !== void 0) {
      const a = r.sheenColorFactor;
      t.sheenColor.setRGB(a[0], a[1], a[2], Ee);
    }
    return r.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = r.sheenRoughnessFactor), r.sheenColorTexture !== void 0 && n.push(s.assignTexture(t, "sheenColorMap", r.sheenColorTexture, De)), r.sheenRoughnessTexture !== void 0 && n.push(s.assignTexture(t, "sheenRoughnessMap", r.sheenRoughnessTexture)), Promise.all(n);
  }
}
class Sl {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ve;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = [], r = i.extensions[this.name];
    return r.transmissionFactor !== void 0 && (t.transmission = r.transmissionFactor), r.transmissionTexture !== void 0 && n.push(s.assignTexture(t, "transmissionMap", r.transmissionTexture)), Promise.all(n);
  }
}
class vl {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ve;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = [], r = i.extensions[this.name];
    t.thickness = r.thicknessFactor !== void 0 ? r.thicknessFactor : 0, r.thicknessTexture !== void 0 && n.push(s.assignTexture(t, "thicknessMap", r.thicknessTexture)), t.attenuationDistance = r.attenuationDistance || 1 / 0;
    const a = r.attenuationColor || [1, 1, 1];
    return t.attenuationColor = new se().setRGB(a[0], a[1], a[2], Ee), Promise.all(n);
  }
}
class Ml {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ve;
  }
  extendMaterialParams(e, t) {
    const i = this.parser.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = i.extensions[this.name];
    return t.ior = n.ior !== void 0 ? n.ior : 1.5, Promise.resolve();
  }
}
class xl {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ve;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = [], r = i.extensions[this.name];
    t.specularIntensity = r.specularFactor !== void 0 ? r.specularFactor : 1, r.specularTexture !== void 0 && n.push(s.assignTexture(t, "specularIntensityMap", r.specularTexture));
    const a = r.specularColorFactor || [1, 1, 1];
    return t.specularColor = new se().setRGB(a[0], a[1], a[2], Ee), r.specularColorTexture !== void 0 && n.push(s.assignTexture(t, "specularColorMap", r.specularColorTexture, De)), Promise.all(n);
  }
}
class Tl {
  constructor(e) {
    this.parser = e, this.name = D.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ve;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = [], r = i.extensions[this.name];
    return t.bumpScale = r.bumpFactor !== void 0 ? r.bumpFactor : 1, r.bumpTexture !== void 0 && n.push(s.assignTexture(t, "bumpMap", r.bumpTexture)), Promise.all(n);
  }
}
class Ql {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    const s = this.parser.json.materials[e];
    return !s.extensions || !s.extensions[this.name] ? null : ve;
  }
  extendMaterialParams(e, t) {
    const s = this.parser, i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const n = [], r = i.extensions[this.name];
    return r.anisotropyStrength !== void 0 && (t.anisotropy = r.anisotropyStrength), r.anisotropyRotation !== void 0 && (t.anisotropyRotation = r.anisotropyRotation), r.anisotropyTexture !== void 0 && n.push(s.assignTexture(t, "anisotropyMap", r.anisotropyTexture)), Promise.all(n);
  }
}
class Rl {
  constructor(e) {
    this.parser = e, this.name = D.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser, s = t.json, i = s.textures[e];
    if (!i.extensions || !i.extensions[this.name])
      return null;
    const n = i.extensions[this.name], r = t.options.ktx2Loader;
    if (!r) {
      if (s.extensionsRequired && s.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, n.source, r);
  }
}
class Ll {
  constructor(e) {
    this.parser = e, this.name = D.EXT_TEXTURE_WEBP;
  }
  loadTexture(e) {
    const t = this.name, s = this.parser, i = s.json, n = i.textures[e];
    if (!n.extensions || !n.extensions[t])
      return null;
    const r = n.extensions[t], a = i.images[r.source];
    let l = s.textureLoader;
    if (a.uri) {
      const c = s.options.manager.getHandler(a.uri);
      c !== null && (l = c);
    }
    return s.loadTextureImage(e, r.source, l);
  }
}
class kl {
  constructor(e) {
    this.parser = e, this.name = D.EXT_TEXTURE_AVIF;
  }
  loadTexture(e) {
    const t = this.name, s = this.parser, i = s.json, n = i.textures[e];
    if (!n.extensions || !n.extensions[t])
      return null;
    const r = n.extensions[t], a = i.images[r.source];
    let l = s.textureLoader;
    if (a.uri) {
      const c = s.options.manager.getHandler(a.uri);
      c !== null && (l = c);
    }
    return s.loadTextureImage(e, r.source, l);
  }
}
class Dl {
  constructor(e) {
    this.name = D.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const t = this.parser.json, s = t.bufferViews[e];
    if (s.extensions && s.extensions[this.name]) {
      const i = s.extensions[this.name], n = this.parser.getDependency("buffer", i.buffer), r = this.parser.options.meshoptDecoder;
      if (!r || !r.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return n.then(function(a) {
        const l = i.byteOffset || 0, c = i.byteLength || 0, h = i.count, A = i.byteStride, d = new Uint8Array(a, l, c);
        return r.decodeGltfBufferAsync ? r.decodeGltfBufferAsync(h, A, d, i.mode, i.filter).then(function(u) {
          return u.buffer;
        }) : r.ready.then(function() {
          const u = new ArrayBuffer(h * A);
          return r.decodeGltfBuffer(new Uint8Array(u), h, A, d, i.mode, i.filter), u;
        });
      });
    } else
      return null;
  }
}
class Fl {
  constructor(e) {
    this.name = D.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, s = t.nodes[e];
    if (!s.extensions || !s.extensions[this.name] || s.mesh === void 0)
      return null;
    const i = t.meshes[s.mesh];
    for (const c of i.primitives)
      if (c.mode !== fe.TRIANGLES && c.mode !== fe.TRIANGLE_STRIP && c.mode !== fe.TRIANGLE_FAN && c.mode !== void 0)
        return null;
    const r = s.extensions[this.name].attributes, a = [], l = {};
    for (const c in r)
      a.push(this.parser.getDependency("accessor", r[c]).then((h) => (l[c] = h, l[c])));
    return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(e)), Promise.all(a).then((c) => {
      const h = c.pop(), A = h.isGroup ? h.children : [h], d = c[0].count, u = [];
      for (const p of A) {
        const g = new V(), m = new Q(), y = new dt(), C = new Q(1, 1, 1), E = new _i(p.geometry, p.material, d);
        for (let b = 0; b < d; b++)
          l.TRANSLATION && m.fromBufferAttribute(l.TRANSLATION, b), l.ROTATION && y.fromBufferAttribute(l.ROTATION, b), l.SCALE && C.fromBufferAttribute(l.SCALE, b), E.setMatrixAt(b, g.compose(m, y, C));
        for (const b in l)
          if (b === "_COLOR_0") {
            const I = l[b];
            E.instanceColor = new Aa(I.array, I.itemSize, I.normalized);
          } else b !== "TRANSLATION" && b !== "ROTATION" && b !== "SCALE" && p.geometry.setAttribute(b, l[b]);
        Is.prototype.copy.call(E, p), this.parser.assignFinalMaterial(E), u.push(E);
      }
      return h.isGroup ? (h.clear(), h.add(...u), h) : u[0];
    }));
  }
}
const qr = "glTF", bt = 12, gn = { JSON: 1313821514, BIN: 5130562 };
class Pl {
  constructor(e) {
    this.name = D.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, bt), s = new TextDecoder();
    if (this.header = {
      magic: s.decode(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== qr)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const i = this.header.length - bt, n = new DataView(e, bt);
    let r = 0;
    for (; r < i; ) {
      const a = n.getUint32(r, !0);
      r += 4;
      const l = n.getUint32(r, !0);
      if (r += 4, l === gn.JSON) {
        const c = new Uint8Array(e, bt + r, a);
        this.content = s.decode(c);
      } else if (l === gn.BIN) {
        const c = bt + r;
        this.body = e.slice(c, c + a);
      }
      r += a;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class _l {
  constructor(e, t) {
    if (!t)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = D.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const s = this.json, i = this.dracoLoader, n = e.extensions[this.name].bufferView, r = e.extensions[this.name].attributes, a = {}, l = {}, c = {};
    for (const h in r) {
      const A = wi[h] || h.toLowerCase();
      a[A] = r[h];
    }
    for (const h in e.attributes) {
      const A = wi[h] || h.toLowerCase();
      if (r[h] !== void 0) {
        const d = s.accessors[e.attributes[h]], u = At[d.componentType];
        c[A] = u.name, l[A] = d.normalized === !0;
      }
    }
    return t.getDependency("bufferView", n).then(function(h) {
      return new Promise(function(A, d) {
        i.decodeDracoFile(h, function(u) {
          for (const p in u.attributes) {
            const g = u.attributes[p], m = l[p];
            m !== void 0 && (g.normalized = m);
          }
          A(u);
        }, a, c, Ee, d);
      });
    });
  }
}
class Ul {
  constructor() {
    this.name = D.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}
class Gl {
  constructor() {
    this.name = D.KHR_MESH_QUANTIZATION;
  }
}
class zr extends La {
  constructor(e, t, s, i) {
    super(e, t, s, i);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, s = this.sampleValues, i = this.valueSize, n = e * i * 3 + i;
    for (let r = 0; r !== i; r++)
      t[r] = s[n + r];
    return t;
  }
  interpolate_(e, t, s, i) {
    const n = this.resultBuffer, r = this.sampleValues, a = this.valueSize, l = a * 2, c = a * 3, h = i - t, A = (s - t) / h, d = A * A, u = d * A, p = e * c, g = p - c, m = -2 * u + 3 * d, y = u - d, C = 1 - m, E = y - d + A;
    for (let b = 0; b !== a; b++) {
      const I = r[g + b + a], S = r[g + b + l] * h, w = r[p + b + a], v = r[p + b] * h;
      n[b] = C * I + E * S + m * w + y * v;
    }
    return n;
  }
}
const Nl = new dt();
class Vl extends zr {
  interpolate_(e, t, s, i) {
    const n = super.interpolate_(e, t, s, i);
    return Nl.fromArray(n).normalize().toArray(n), n;
  }
}
const fe = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
}, At = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, fn = {
  9728: xr,
  9729: $e,
  9984: ma,
  9985: fa,
  9986: ga,
  9987: ws
}, mn = {
  33071: Ca,
  33648: ba,
  10497: fi
}, Us = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, wi = {
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
}, Fe = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, Ol = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: kr,
  STEP: Qa
}, Gs = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Hl(o) {
  return o.DefaultMaterial === void 0 && (o.DefaultMaterial = new Ui({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: Ra
  })), o.DefaultMaterial;
}
function ze(o, e, t) {
  for (const s in t.extensions)
    o[s] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[s] = t.extensions[s]);
}
function ke(o, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(o.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function ql(o, e, t) {
  let s = !1, i = !1, n = !1;
  for (let c = 0, h = e.length; c < h; c++) {
    const A = e[c];
    if (A.POSITION !== void 0 && (s = !0), A.NORMAL !== void 0 && (i = !0), A.COLOR_0 !== void 0 && (n = !0), s && i && n) break;
  }
  if (!s && !i && !n) return Promise.resolve(o);
  const r = [], a = [], l = [];
  for (let c = 0, h = e.length; c < h; c++) {
    const A = e[c];
    if (s) {
      const d = A.POSITION !== void 0 ? t.getDependency("accessor", A.POSITION) : o.attributes.position;
      r.push(d);
    }
    if (i) {
      const d = A.NORMAL !== void 0 ? t.getDependency("accessor", A.NORMAL) : o.attributes.normal;
      a.push(d);
    }
    if (n) {
      const d = A.COLOR_0 !== void 0 ? t.getDependency("accessor", A.COLOR_0) : o.attributes.color;
      l.push(d);
    }
  }
  return Promise.all([
    Promise.all(r),
    Promise.all(a),
    Promise.all(l)
  ]).then(function(c) {
    const h = c[0], A = c[1], d = c[2];
    return s && (o.morphAttributes.position = h), i && (o.morphAttributes.normal = A), n && (o.morphAttributes.color = d), o.morphTargetsRelative = !0, o;
  });
}
function zl(o, e) {
  if (o.updateMorphTargets(), e.weights !== void 0)
    for (let t = 0, s = e.weights.length; t < s; t++)
      o.morphTargetInfluences[t] = e.weights[t];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const t = e.extras.targetNames;
    if (o.morphTargetInfluences.length === t.length) {
      o.morphTargetDictionary = {};
      for (let s = 0, i = t.length; s < i; s++)
        o.morphTargetDictionary[t[s]] = s;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function jl(o) {
  let e;
  const t = o.extensions && o.extensions[D.KHR_DRACO_MESH_COMPRESSION];
  if (t ? e = "draco:" + t.bufferView + ":" + t.indices + ":" + Ns(t.attributes) : e = o.indices + ":" + Ns(o.attributes) + ":" + o.mode, o.targets !== void 0)
    for (let s = 0, i = o.targets.length; s < i; s++)
      e += ":" + Ns(o.targets[s]);
  return e;
}
function Ns(o) {
  let e = "";
  const t = Object.keys(o).sort();
  for (let s = 0, i = t.length; s < i; s++)
    e += t[s] + ":" + o[t[s]] + ";";
  return e;
}
function Bi(o) {
  switch (o) {
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
function Kl(o) {
  return o.search(/\.jpe?g($|\?)/i) > 0 || o.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : o.search(/\.webp($|\?)/i) > 0 || o.search(/^data\:image\/webp/) === 0 ? "image/webp" : o.search(/\.ktx2($|\?)/i) > 0 || o.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png";
}
const Yl = new V();
class Jl {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new ml(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let s = !1, i = -1, n = !1, r = -1;
    if (typeof navigator < "u") {
      const a = navigator.userAgent;
      s = /^((?!chrome|android).)*safari/i.test(a) === !0;
      const l = a.match(/Version\/(\d+)/);
      i = s && l ? parseInt(l[1], 10) : -1, n = a.indexOf("Firefox") > -1, r = n ? a.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || s && i < 17 || n && r < 98 ? this.textureLoader = new da(this.options.manager) : this.textureLoader = new ua(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new Oe(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    const s = this, i = this.json, n = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(r) {
      return r._markDefs && r._markDefs();
    }), Promise.all(this._invokeAll(function(r) {
      return r.beforeRoot && r.beforeRoot();
    })).then(function() {
      return Promise.all([
        s.getDependencies("scene"),
        s.getDependencies("animation"),
        s.getDependencies("camera")
      ]);
    }).then(function(r) {
      const a = {
        scene: r[0][i.scene || 0],
        scenes: r[0],
        animations: r[1],
        cameras: r[2],
        asset: i.asset,
        parser: s,
        userData: {}
      };
      return ze(n, a, i), ke(a, i), Promise.all(s._invokeAll(function(l) {
        return l.afterRoot && l.afterRoot(a);
      })).then(function() {
        for (const l of a.scenes)
          l.updateMatrixWorld();
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
    const e = this.json.nodes || [], t = this.json.skins || [], s = this.json.meshes || [];
    for (let i = 0, n = t.length; i < n; i++) {
      const r = t[i].joints;
      for (let a = 0, l = r.length; a < l; a++)
        e[r[a]].isBone = !0;
    }
    for (let i = 0, n = e.length; i < n; i++) {
      const r = e[i];
      r.mesh !== void 0 && (this._addNodeRef(this.meshCache, r.mesh), r.skin !== void 0 && (s[r.mesh].isSkinnedMesh = !0)), r.camera !== void 0 && this._addNodeRef(this.cameraCache, r.camera);
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
    const i = s.clone(), n = (r, a) => {
      const l = this.associations.get(r);
      l != null && this.associations.set(a, l);
      for (const [c, h] of r.children.entries())
        n(h, a.children[c]);
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
      t = Promise.all(i.map(function(n, r) {
        return s.getDependency(e, r);
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
    return new Promise(function(n, r) {
      s.load(Rt.resolveURL(t.uri, i.path), n, void 0, function() {
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
      const r = Us[i.type], a = At[i.componentType], l = i.normalized === !0, c = new a(i.count * r);
      return Promise.resolve(new me(c, r, l));
    }
    const n = [];
    return i.bufferView !== void 0 ? n.push(this.getDependency("bufferView", i.bufferView)) : n.push(null), i.sparse !== void 0 && (n.push(this.getDependency("bufferView", i.sparse.indices.bufferView)), n.push(this.getDependency("bufferView", i.sparse.values.bufferView))), Promise.all(n).then(function(r) {
      const a = r[0], l = Us[i.type], c = At[i.componentType], h = c.BYTES_PER_ELEMENT, A = h * l, d = i.byteOffset || 0, u = i.bufferView !== void 0 ? s.bufferViews[i.bufferView].byteStride : void 0, p = i.normalized === !0;
      let g, m;
      if (u && u !== A) {
        const y = Math.floor(d / u), C = "InterleavedBuffer:" + i.bufferView + ":" + i.componentType + ":" + y + ":" + i.count;
        let E = t.cache.get(C);
        E || (g = new c(a, y * u, i.count * u / h), E = new pa(g, u / h), t.cache.add(C, E)), m = new Ye(E, l, d % u / h, p);
      } else
        a === null ? g = new c(i.count * l) : g = new c(a, d, i.count * l), m = new me(g, l, p);
      if (i.sparse !== void 0) {
        const y = Us.SCALAR, C = At[i.sparse.indices.componentType], E = i.sparse.indices.byteOffset || 0, b = i.sparse.values.byteOffset || 0, I = new C(r[1], E, i.sparse.count * y), S = new c(r[2], b, i.sparse.count * l);
        a !== null && (m = new me(m.array.slice(), m.itemSize, m.normalized)), m.normalized = !1;
        for (let w = 0, v = I.length; w < v; w++) {
          const B = I[w];
          if (m.setX(B, S[w * l]), l >= 2 && m.setY(B, S[w * l + 1]), l >= 3 && m.setZ(B, S[w * l + 2]), l >= 4 && m.setW(B, S[w * l + 3]), l >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        m.normalized = p;
      }
      return m;
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
    const t = this.json, s = this.options, n = t.textures[e].source, r = t.images[n];
    let a = this.textureLoader;
    if (r.uri) {
      const l = s.manager.getHandler(r.uri);
      l !== null && (a = l);
    }
    return this.loadTextureImage(e, n, a);
  }
  loadTextureImage(e, t, s) {
    const i = this, n = this.json, r = n.textures[e], a = n.images[t], l = (a.uri || a.bufferView) + ":" + r.sampler;
    if (this.textureCache[l])
      return this.textureCache[l];
    const c = this.loadImageSource(t, s).then(function(h) {
      h.flipY = !1, h.name = r.name || a.name || "", h.name === "" && typeof a.uri == "string" && a.uri.startsWith("data:image/") === !1 && (h.name = a.uri);
      const d = (n.samplers || {})[r.sampler] || {};
      return h.magFilter = fn[d.magFilter] || $e, h.minFilter = fn[d.minFilter] || ws, h.wrapS = mn[d.wrapS] || fi, h.wrapT = mn[d.wrapT] || fi, h.generateMipmaps = !h.isCompressedTexture && h.minFilter !== xr && h.minFilter !== $e, i.associations.set(h, { textures: e }), h;
    }).catch(function() {
      return null;
    });
    return this.textureCache[l] = c, c;
  }
  loadImageSource(e, t) {
    const s = this, i = this.json, n = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((A) => A.clone());
    const r = i.images[e], a = self.URL || self.webkitURL;
    let l = r.uri || "", c = !1;
    if (r.bufferView !== void 0)
      l = s.getDependency("bufferView", r.bufferView).then(function(A) {
        c = !0;
        const d = new Blob([A], { type: r.mimeType });
        return l = a.createObjectURL(d), l;
      });
    else if (r.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const h = Promise.resolve(l).then(function(A) {
      return new Promise(function(d, u) {
        let p = d;
        t.isImageBitmapLoader === !0 && (p = function(g) {
          const m = new nn(g);
          m.needsUpdate = !0, d(m);
        }), t.load(Rt.resolveURL(A, n.path), p, void 0, u);
      });
    }).then(function(A) {
      return c === !0 && a.revokeObjectURL(l), ke(A, r), A.userData.mimeType = r.mimeType || Kl(r.uri), A;
    }).catch(function(A) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", l), A;
    });
    return this.sourceCache[e] = h, h;
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
    return this.getDependency("texture", s.index).then(function(r) {
      if (!r) return null;
      if (s.texCoord !== void 0 && s.texCoord > 0 && (r = r.clone(), r.channel = s.texCoord), n.extensions[D.KHR_TEXTURE_TRANSFORM]) {
        const a = s.extensions !== void 0 ? s.extensions[D.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const l = n.associations.get(r);
          r = n.extensions[D.KHR_TEXTURE_TRANSFORM].extendTexture(r, a), n.associations.set(r, l);
        }
      }
      return i !== void 0 && (r.colorSpace = i), e[t] = r, r;
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
    const i = t.attributes.tangent === void 0, n = t.attributes.color !== void 0, r = t.attributes.normal === void 0;
    if (e.isPoints) {
      const a = "PointsMaterial:" + s.uuid;
      let l = this.cache.get(a);
      l || (l = new Tr(), Ps.prototype.copy.call(l, s), l.color.copy(s.color), l.map = s.map, l.sizeAttenuation = !1, this.cache.add(a, l)), s = l;
    } else if (e.isLine) {
      const a = "LineBasicMaterial:" + s.uuid;
      let l = this.cache.get(a);
      l || (l = new ya(), Ps.prototype.copy.call(l, s), l.color.copy(s.color), l.map = s.map, this.cache.add(a, l)), s = l;
    }
    if (i || n || r) {
      let a = "ClonedMaterial:" + s.uuid + ":";
      i && (a += "derivative-tangents:"), n && (a += "vertex-colors:"), r && (a += "flat-shading:");
      let l = this.cache.get(a);
      l || (l = s.clone(), n && (l.vertexColors = !0), r && (l.flatShading = !0), i && (l.normalScale && (l.normalScale.y *= -1), l.clearcoatNormalScale && (l.clearcoatNormalScale.y *= -1)), this.cache.add(a, l), this.associations.set(l, this.associations.get(s))), s = l;
    }
    e.material = s;
  }
  getMaterialType() {
    return Ui;
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
    let r;
    const a = {}, l = n.extensions || {}, c = [];
    if (l[D.KHR_MATERIALS_UNLIT]) {
      const A = i[D.KHR_MATERIALS_UNLIT];
      r = A.getMaterialType(), c.push(A.extendParams(a, n, t));
    } else {
      const A = n.pbrMetallicRoughness || {};
      if (a.color = new se(1, 1, 1), a.opacity = 1, Array.isArray(A.baseColorFactor)) {
        const d = A.baseColorFactor;
        a.color.setRGB(d[0], d[1], d[2], Ee), a.opacity = d[3];
      }
      A.baseColorTexture !== void 0 && c.push(t.assignTexture(a, "map", A.baseColorTexture, De)), a.metalness = A.metallicFactor !== void 0 ? A.metallicFactor : 1, a.roughness = A.roughnessFactor !== void 0 ? A.roughnessFactor : 1, A.metallicRoughnessTexture !== void 0 && (c.push(t.assignTexture(a, "metalnessMap", A.metallicRoughnessTexture)), c.push(t.assignTexture(a, "roughnessMap", A.metallicRoughnessTexture))), r = this._invokeOne(function(d) {
        return d.getMaterialType && d.getMaterialType(e);
      }), c.push(Promise.all(this._invokeAll(function(d) {
        return d.extendMaterialParams && d.extendMaterialParams(e, a);
      })));
    }
    n.doubleSided === !0 && (a.side = Qr);
    const h = n.alphaMode || Gs.OPAQUE;
    if (h === Gs.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, h === Gs.MASK && (a.alphaTest = n.alphaCutoff !== void 0 ? n.alphaCutoff : 0.5)), n.normalTexture !== void 0 && r !== Je && (c.push(t.assignTexture(a, "normalMap", n.normalTexture)), a.normalScale = new U(1, 1), n.normalTexture.scale !== void 0)) {
      const A = n.normalTexture.scale;
      a.normalScale.set(A, A);
    }
    if (n.occlusionTexture !== void 0 && r !== Je && (c.push(t.assignTexture(a, "aoMap", n.occlusionTexture)), n.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = n.occlusionTexture.strength)), n.emissiveFactor !== void 0 && r !== Je) {
      const A = n.emissiveFactor;
      a.emissive = new se().setRGB(A[0], A[1], A[2], Ee);
    }
    return n.emissiveTexture !== void 0 && r !== Je && c.push(t.assignTexture(a, "emissiveMap", n.emissiveTexture, De)), Promise.all(c).then(function() {
      const A = new r(a);
      return n.name && (A.name = n.name), ke(A, n), t.associations.set(A, { materials: e }), n.extensions && ze(i, A, n), A;
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
    const t = Ea.sanitizeNodeName(e || "");
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
    function n(a) {
      return s[D.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, t).then(function(l) {
        return bn(l, a, t);
      });
    }
    const r = [];
    for (let a = 0, l = e.length; a < l; a++) {
      const c = e[a], h = jl(c), A = i[h];
      if (A)
        r.push(A.promise);
      else {
        let d;
        c.extensions && c.extensions[D.KHR_DRACO_MESH_COMPRESSION] ? d = n(c) : d = bn(new Bs(), c, t), i[h] = { primitive: c, promise: d }, r.push(d);
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
    const t = this, s = this.json, i = this.extensions, n = s.meshes[e], r = n.primitives, a = [];
    for (let l = 0, c = r.length; l < c; l++) {
      const h = r[l].material === void 0 ? Hl(this.cache) : this.getDependency("material", r[l].material);
      a.push(h);
    }
    return a.push(t.loadGeometries(r)), Promise.all(a).then(function(l) {
      const c = l.slice(0, l.length - 1), h = l[l.length - 1], A = [];
      for (let u = 0, p = h.length; u < p; u++) {
        const g = h[u], m = r[u];
        let y;
        const C = c[u];
        if (m.mode === fe.TRIANGLES || m.mode === fe.TRIANGLE_STRIP || m.mode === fe.TRIANGLE_FAN || m.mode === void 0)
          y = n.isSkinnedMesh === !0 ? new Ia(g, C) : new Ss(g, C), y.isSkinnedMesh === !0 && y.normalizeSkinWeights(), m.mode === fe.TRIANGLE_STRIP ? y.geometry = pn(y.geometry, Mr) : m.mode === fe.TRIANGLE_FAN && (y.geometry = pn(y.geometry, gi));
        else if (m.mode === fe.LINES)
          y = new wa(g, C);
        else if (m.mode === fe.LINE_STRIP)
          y = new Ba(g, C);
        else if (m.mode === fe.LINE_LOOP)
          y = new Sa(g, C);
        else if (m.mode === fe.POINTS)
          y = new Rr(g, C);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + m.mode);
        Object.keys(y.geometry.morphAttributes).length > 0 && zl(y, n), y.name = t.createUniqueName(n.name || "mesh_" + e), ke(y, n), m.extensions && ze(i, y, m), t.assignFinalMaterial(y), A.push(y);
      }
      for (let u = 0, p = A.length; u < p; u++)
        t.associations.set(A[u], {
          meshes: e,
          primitives: u
        });
      if (A.length === 1)
        return n.extensions && ze(i, A[0], n), A[0];
      const d = new ht();
      n.extensions && ze(i, d, n), t.associations.set(d, { meshes: e });
      for (let u = 0, p = A.length; u < p; u++)
        d.add(A[u]);
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
    return s.type === "perspective" ? t = new va(gt.radToDeg(i.yfov), i.aspectRatio || 1, i.znear || 1, i.zfar || 2e6) : s.type === "orthographic" && (t = new Lr(-i.xmag, i.xmag, i.ymag, -i.ymag, i.znear, i.zfar)), s.name && (t.name = this.createUniqueName(s.name)), ke(t, s), Promise.resolve(t);
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
      const n = i.pop(), r = i, a = [], l = [];
      for (let c = 0, h = r.length; c < h; c++) {
        const A = r[c];
        if (A) {
          a.push(A);
          const d = new V();
          n !== null && d.fromArray(n.array, c * 16), l.push(d);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[c]);
      }
      return new Ma(a, l);
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
    const t = this.json, s = this, i = t.animations[e], n = i.name ? i.name : "animation_" + e, r = [], a = [], l = [], c = [], h = [];
    for (let A = 0, d = i.channels.length; A < d; A++) {
      const u = i.channels[A], p = i.samplers[u.sampler], g = u.target, m = g.node, y = i.parameters !== void 0 ? i.parameters[p.input] : p.input, C = i.parameters !== void 0 ? i.parameters[p.output] : p.output;
      g.node !== void 0 && (r.push(this.getDependency("node", m)), a.push(this.getDependency("accessor", y)), l.push(this.getDependency("accessor", C)), c.push(p), h.push(g));
    }
    return Promise.all([
      Promise.all(r),
      Promise.all(a),
      Promise.all(l),
      Promise.all(c),
      Promise.all(h)
    ]).then(function(A) {
      const d = A[0], u = A[1], p = A[2], g = A[3], m = A[4], y = [];
      for (let C = 0, E = d.length; C < E; C++) {
        const b = d[C], I = u[C], S = p[C], w = g[C], v = m[C];
        if (b === void 0) continue;
        b.updateMatrix && b.updateMatrix();
        const B = s._createAnimationTracks(b, I, S, w, v);
        if (B)
          for (let M = 0; M < B.length; M++)
            y.push(B[M]);
      }
      return new xa(n, void 0, y);
    });
  }
  createNodeMesh(e) {
    const t = this.json, s = this, i = t.nodes[e];
    return i.mesh === void 0 ? null : s.getDependency("mesh", i.mesh).then(function(n) {
      const r = s._getNodeRef(s.meshCache, i.mesh, n);
      return i.weights !== void 0 && r.traverse(function(a) {
        if (a.isMesh)
          for (let l = 0, c = i.weights.length; l < c; l++)
            a.morphTargetInfluences[l] = i.weights[l];
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
    const t = this.json, s = this, i = t.nodes[e], n = s._loadNodeShallow(e), r = [], a = i.children || [];
    for (let c = 0, h = a.length; c < h; c++)
      r.push(s.getDependency("node", a[c]));
    const l = i.skin === void 0 ? Promise.resolve(null) : s.getDependency("skin", i.skin);
    return Promise.all([
      n,
      Promise.all(r),
      l
    ]).then(function(c) {
      const h = c[0], A = c[1], d = c[2];
      d !== null && h.traverse(function(u) {
        u.isSkinnedMesh && u.bind(d, Yl);
      });
      for (let u = 0, p = A.length; u < p; u++)
        h.add(A[u]);
      return h;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(e) {
    const t = this.json, s = this.extensions, i = this;
    if (this.nodeCache[e] !== void 0)
      return this.nodeCache[e];
    const n = t.nodes[e], r = n.name ? i.createUniqueName(n.name) : "", a = [], l = i._invokeOne(function(c) {
      return c.createNodeMesh && c.createNodeMesh(e);
    });
    return l && a.push(l), n.camera !== void 0 && a.push(i.getDependency("camera", n.camera).then(function(c) {
      return i._getNodeRef(i.cameraCache, n.camera, c);
    })), i._invokeAll(function(c) {
      return c.createNodeAttachment && c.createNodeAttachment(e);
    }).forEach(function(c) {
      a.push(c);
    }), this.nodeCache[e] = Promise.all(a).then(function(c) {
      let h;
      if (n.isBone === !0 ? h = new Ta() : c.length > 1 ? h = new ht() : c.length === 1 ? h = c[0] : h = new Is(), h !== c[0])
        for (let A = 0, d = c.length; A < d; A++)
          h.add(c[A]);
      if (n.name && (h.userData.name = n.name, h.name = r), ke(h, n), n.extensions && ze(s, h, n), n.matrix !== void 0) {
        const A = new V();
        A.fromArray(n.matrix), h.applyMatrix4(A);
      } else
        n.translation !== void 0 && h.position.fromArray(n.translation), n.rotation !== void 0 && h.quaternion.fromArray(n.rotation), n.scale !== void 0 && h.scale.fromArray(n.scale);
      if (!i.associations.has(h))
        i.associations.set(h, {});
      else if (n.mesh !== void 0 && i.meshCache.refs[n.mesh] > 1) {
        const A = i.associations.get(h);
        i.associations.set(h, { ...A });
      }
      return i.associations.get(h).nodes = e, h;
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
    const t = this.extensions, s = this.json.scenes[e], i = this, n = new ht();
    s.name && (n.name = i.createUniqueName(s.name)), ke(n, s), s.extensions && ze(t, n, s);
    const r = s.nodes || [], a = [];
    for (let l = 0, c = r.length; l < c; l++)
      a.push(i.getDependency("node", r[l]));
    return Promise.all(a).then(function(l) {
      for (let h = 0, A = l.length; h < A; h++)
        n.add(l[h]);
      const c = (h) => {
        const A = /* @__PURE__ */ new Map();
        for (const [d, u] of i.associations)
          (d instanceof Ps || d instanceof nn) && A.set(d, u);
        return h.traverse((d) => {
          const u = i.associations.get(d);
          u != null && A.set(d, u);
        }), A;
      };
      return i.associations = c(n), n;
    });
  }
  _createAnimationTracks(e, t, s, i, n) {
    const r = [], a = e.name ? e.name : e.uuid, l = [];
    Fe[n.path] === Fe.weights ? e.traverse(function(d) {
      d.morphTargetInfluences && l.push(d.name ? d.name : d.uuid);
    }) : l.push(a);
    let c;
    switch (Fe[n.path]) {
      case Fe.weights:
        c = on;
        break;
      case Fe.rotation:
        c = an;
        break;
      case Fe.translation:
      case Fe.scale:
        c = rn;
        break;
      default:
        switch (s.itemSize) {
          case 1:
            c = on;
            break;
          case 2:
          case 3:
          default:
            c = rn;
            break;
        }
        break;
    }
    const h = i.interpolation !== void 0 ? Ol[i.interpolation] : kr, A = this._getArrayFromAccessor(s);
    for (let d = 0, u = l.length; d < u; d++) {
      const p = new c(
        l[d] + "." + Fe[n.path],
        t.array,
        A,
        h
      );
      i.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(p), r.push(p);
    }
    return r;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const s = Bi(t.constructor), i = new Float32Array(t.length);
      for (let n = 0, r = t.length; n < r; n++)
        i[n] = t[n] * s;
      t = i;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(s) {
      const i = this instanceof an ? Vl : zr;
      return new i(this.times, this.values, this.getValueSize() / 3, s);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function Wl(o, e, t) {
  const s = e.attributes, i = new ft();
  if (s.POSITION !== void 0) {
    const a = t.json.accessors[s.POSITION], l = a.min, c = a.max;
    if (l !== void 0 && c !== void 0) {
      if (i.set(
        new Q(l[0], l[1], l[2]),
        new Q(c[0], c[1], c[2])
      ), a.normalized) {
        const h = Bi(At[a.componentType]);
        i.min.multiplyScalar(h), i.max.multiplyScalar(h);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const n = e.targets;
  if (n !== void 0) {
    const a = new Q(), l = new Q();
    for (let c = 0, h = n.length; c < h; c++) {
      const A = n[c];
      if (A.POSITION !== void 0) {
        const d = t.json.accessors[A.POSITION], u = d.min, p = d.max;
        if (u !== void 0 && p !== void 0) {
          if (l.setX(Math.max(Math.abs(u[0]), Math.abs(p[0]))), l.setY(Math.max(Math.abs(u[1]), Math.abs(p[1]))), l.setZ(Math.max(Math.abs(u[2]), Math.abs(p[2]))), d.normalized) {
            const g = Bi(At[d.componentType]);
            l.multiplyScalar(g);
          }
          a.max(l);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    i.expandByVector(a);
  }
  o.boundingBox = i;
  const r = new Ft();
  i.getCenter(r.center), r.radius = i.min.distanceTo(i.max) / 2, o.boundingSphere = r;
}
function bn(o, e, t) {
  const s = e.attributes, i = [];
  function n(r, a) {
    return t.getDependency("accessor", r).then(function(l) {
      o.setAttribute(a, l);
    });
  }
  for (const r in s) {
    const a = wi[r] || r.toLowerCase();
    a in o.attributes || i.push(n(s[r], a));
  }
  if (e.indices !== void 0 && !o.index) {
    const r = t.getDependency("accessor", e.indices).then(function(a) {
      o.setIndex(a);
    });
    i.push(r);
  }
  return mi.workingColorSpace !== Ee && "COLOR_0" in s && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${mi.workingColorSpace}" not supported.`), ke(o, e), Wl(o, e, t), Promise.all(i).then(function() {
    return e.targets !== void 0 ? ql(o, e.targets, t) : o;
  });
}
const Vs = /* @__PURE__ */ new WeakMap();
class jr extends Pi {
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
    const n = new Oe(this.manager);
    n.setPath(this.path), n.setResponseType("arraybuffer"), n.setRequestHeader(this.requestHeader), n.setWithCredentials(this.withCredentials), n.load(e, (r) => {
      this.parse(r, t, i);
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
    this.decodeDracoFile(e, t, null, null, De, s).catch(s);
  }
  //
  decodeDracoFile(e, t, s, i, n = Ee, r = () => {
  }) {
    const a = {
      attributeIDs: s || this.defaultAttributeIDs,
      attributeTypes: i || this.defaultAttributeTypes,
      useUniqueIDs: !!s,
      vertexColorSpace: n
    };
    return this.decodeGeometry(e, a).then(t).catch(r);
  }
  decodeGeometry(e, t) {
    const s = JSON.stringify(t);
    if (Vs.has(e)) {
      const l = Vs.get(e);
      if (l.key === s)
        return l.promise;
      if (e.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let i;
    const n = this.workerNextTaskID++, r = e.byteLength, a = this._getWorker(n, r).then((l) => (i = l, new Promise((c, h) => {
      i._callbacks[n] = { resolve: c, reject: h }, i.postMessage({ type: "decode", id: n, taskConfig: t, buffer: e }, [e]);
    }))).then((l) => this._createGeometry(l.geometry));
    return a.catch(() => !0).then(() => {
      i && n && this._releaseTask(i, n);
    }), Vs.set(e, {
      key: s,
      promise: a
    }), a;
  }
  _createGeometry(e) {
    const t = new Bs();
    e.index && t.setIndex(new me(e.index.array, 1));
    for (let s = 0; s < e.attributes.length; s++) {
      const i = e.attributes[s], n = i.name, r = i.array, a = i.itemSize, l = new me(r, a);
      n === "color" && (this._assignVertexColorSpace(l, i.vertexColorSpace), l.normalized = !(r instanceof Float32Array)), t.setAttribute(n, l);
    }
    return t;
  }
  _assignVertexColorSpace(e, t) {
    if (t !== De) return;
    const s = new se();
    for (let i = 0, n = e.count; i < n; i++)
      s.fromBufferAttribute(e, i), mi.colorSpaceToWorking(s, De), e.setXYZ(i, s.r, s.g, s.b);
  }
  _loadLibrary(e, t) {
    const s = new Oe(this.manager);
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
      const n = Xl.toString(), r = [
        "/* draco decoder */",
        i,
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
        const i = new Worker(this.workerSourceURL);
        i._callbacks = {}, i._taskCosts = {}, i._taskLoad = 0, i.postMessage({ type: "init", decoderConfig: this.decoderConfig }), i.onmessage = function(n) {
          const r = n.data;
          switch (r.type) {
            case "decode":
              i._callbacks[r.id].resolve(r);
              break;
            case "error":
              i._callbacks[r.id].reject(r);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + r.type + '"');
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
function Xl() {
  let o, e;
  onmessage = function(r) {
    const a = r.data;
    switch (a.type) {
      case "init":
        o = a.decoderConfig, e = new Promise(function(h) {
          o.onModuleLoaded = function(A) {
            h({ draco: A });
          }, DracoDecoderModule(o);
        });
        break;
      case "decode":
        const l = a.buffer, c = a.taskConfig;
        e.then((h) => {
          const A = h.draco, d = new A.Decoder();
          try {
            const u = t(A, d, new Int8Array(l), c), p = u.attributes.map((g) => g.array.buffer);
            u.index && p.push(u.index.array.buffer), self.postMessage({ type: "decode", id: a.id, geometry: u }, p);
          } catch (u) {
            console.error(u), self.postMessage({ type: "error", id: a.id, error: u.message });
          } finally {
            A.destroy(d);
          }
        });
        break;
    }
  };
  function t(r, a, l, c) {
    const h = c.attributeIDs, A = c.attributeTypes;
    let d, u;
    const p = a.GetEncodedGeometryType(l);
    if (p === r.TRIANGULAR_MESH)
      d = new r.Mesh(), u = a.DecodeArrayToMesh(l, l.byteLength, d);
    else if (p === r.POINT_CLOUD)
      d = new r.PointCloud(), u = a.DecodeArrayToPointCloud(l, l.byteLength, d);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!u.ok() || d.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + u.error_msg());
    const g = { index: null, attributes: [] };
    for (const m in h) {
      const y = self[A[m]];
      let C, E;
      if (c.useUniqueIDs)
        E = h[m], C = a.GetAttributeByUniqueId(d, E);
      else {
        if (E = a.GetAttributeId(d, r[h[m]]), E === -1) continue;
        C = a.GetAttribute(d, E);
      }
      const b = i(r, a, d, m, y, C);
      m === "color" && (b.vertexColorSpace = c.vertexColorSpace), g.attributes.push(b);
    }
    return p === r.TRIANGULAR_MESH && (g.index = s(r, a, d)), r.destroy(d), g;
  }
  function s(r, a, l) {
    const h = l.num_faces() * 3, A = h * 4, d = r._malloc(A);
    a.GetTrianglesUInt32Array(l, A, d);
    const u = new Uint32Array(r.HEAPF32.buffer, d, h).slice();
    return r._free(d), { array: u, itemSize: 1 };
  }
  function i(r, a, l, c, h, A) {
    const d = A.num_components(), p = l.num_points() * d, g = p * h.BYTES_PER_ELEMENT, m = n(r, h), y = r._malloc(g);
    a.GetAttributeDataArrayForAllPoints(l, A, m, g, y);
    const C = new h(r.HEAPF32.buffer, y, p).slice();
    return r._free(y), {
      name: c,
      array: C,
      itemSize: d
    };
  }
  function n(r, a) {
    switch (a) {
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
class $l {
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
      const { resolve: i, msg: n, transfer: r } = this.queue.shift();
      this.workersResolve[e] = i, this.workers[e].postMessage(n, r);
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
const Zl = 0, Cn = 2, ec = 1, yn = 2, tc = 0, sc = 1, ic = 10, nc = 0, Kr = 9, Yr = 15, Jr = 16, Wr = 22, Xr = 37, $r = 43, Zr = 76, eo = 83, to = 97, so = 100, io = 103, no = 109, rc = 131, oc = 132, ac = 133, lc = 134, cc = 137, hc = 138, Ac = 141, dc = 142, uc = 145, pc = 146, ro = 148, oo = 152, gc = 157, fc = 158, ao = 165, lo = 166, Ni = 1000066e3;
class mc {
  constructor() {
    this.vkFormat = 0, this.typeSize = 1, this.pixelWidth = 0, this.pixelHeight = 0, this.pixelDepth = 0, this.layerCount = 0, this.faceCount = 1, this.supercompressionScheme = 0, this.levels = [], this.dataFormatDescriptor = [{ vendorId: 0, descriptorType: 0, descriptorBlockSize: 0, versionNumber: 2, colorModel: 0, colorPrimaries: 1, transferFunction: 2, flags: 0, texelBlockDimension: [0, 0, 0, 0], bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0], samples: [] }], this.keyValue = {}, this.globalData = null;
  }
}
class Ct {
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
const ee = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function En(o) {
  return new TextDecoder().decode(o);
}
function bc(o) {
  const e = new Uint8Array(o.buffer, o.byteOffset, ee.length);
  if (e[0] !== ee[0] || e[1] !== ee[1] || e[2] !== ee[2] || e[3] !== ee[3] || e[4] !== ee[4] || e[5] !== ee[5] || e[6] !== ee[6] || e[7] !== ee[7] || e[8] !== ee[8] || e[9] !== ee[9] || e[10] !== ee[10] || e[11] !== ee[11]) throw new Error("Missing KTX 2.0 identifier.");
  const t = new mc(), s = 17 * Uint32Array.BYTES_PER_ELEMENT, i = new Ct(o, ee.length, s, !0);
  t.vkFormat = i._nextUint32(), t.typeSize = i._nextUint32(), t.pixelWidth = i._nextUint32(), t.pixelHeight = i._nextUint32(), t.pixelDepth = i._nextUint32(), t.layerCount = i._nextUint32(), t.faceCount = i._nextUint32();
  const n = i._nextUint32();
  t.supercompressionScheme = i._nextUint32();
  const r = i._nextUint32(), a = i._nextUint32(), l = i._nextUint32(), c = i._nextUint32(), h = i._nextUint64(), A = i._nextUint64(), d = new Ct(o, ee.length + s, 3 * n * 8, !0);
  for (let L = 0; L < n; L++) t.levels.push({ levelData: new Uint8Array(o.buffer, o.byteOffset + d._nextUint64(), d._nextUint64()), uncompressedByteLength: d._nextUint64() });
  const u = new Ct(o, r, a, !0), p = { vendorId: u._skip(4)._nextUint16(), descriptorType: u._nextUint16(), versionNumber: u._nextUint16(), descriptorBlockSize: u._nextUint16(), colorModel: u._nextUint8(), colorPrimaries: u._nextUint8(), transferFunction: u._nextUint8(), flags: u._nextUint8(), texelBlockDimension: [u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8()], bytesPlane: [u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8()], samples: [] }, g = (p.descriptorBlockSize / 4 - 6) / 4;
  for (let L = 0; L < g; L++) {
    const _ = { bitOffset: u._nextUint16(), bitLength: u._nextUint8(), channelType: u._nextUint8(), samplePosition: [u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8()], sampleLower: -1 / 0, sampleUpper: 1 / 0 };
    64 & _.channelType ? (_.sampleLower = u._nextInt32(), _.sampleUpper = u._nextInt32()) : (_.sampleLower = u._nextUint32(), _.sampleUpper = u._nextUint32()), p.samples[L] = _;
  }
  t.dataFormatDescriptor.length = 0, t.dataFormatDescriptor.push(p);
  const m = new Ct(o, l, c, !0);
  for (; m._offset < c; ) {
    const L = m._nextUint32(), _ = m._scan(L), j = En(_);
    if (t.keyValue[j] = m._nextUint8Array(L - _.byteLength - 1), j.match(/^ktx/i)) {
      const Me = En(t.keyValue[j]);
      t.keyValue[j] = Me.substring(0, Me.lastIndexOf("\0"));
    }
    m._skip(L % 4 ? 4 - L % 4 : 0);
  }
  if (A <= 0) return t;
  const y = new Ct(o, h, A, !0), C = y._nextUint16(), E = y._nextUint16(), b = y._nextUint32(), I = y._nextUint32(), S = y._nextUint32(), w = y._nextUint32(), v = [];
  for (let L = 0; L < n; L++) v.push({ imageFlags: y._nextUint32(), rgbSliceByteOffset: y._nextUint32(), rgbSliceByteLength: y._nextUint32(), alphaSliceByteOffset: y._nextUint32(), alphaSliceByteLength: y._nextUint32() });
  const B = h + y._offset, M = B + b, x = M + I, R = x + S, P = new Uint8Array(o.buffer, o.byteOffset + B, b), T = new Uint8Array(o.buffer, o.byteOffset + M, I), N = new Uint8Array(o.buffer, o.byteOffset + x, S), F = new Uint8Array(o.buffer, o.byteOffset + R, w);
  return t.globalData = { endpointCount: C, selectorCount: E, imageDescs: v, endpointsData: P, selectorsData: T, tablesData: N, extendedData: F }, t;
}
let Os, Le, Si;
const Hs = { env: { emscripten_notify_memory_growth: function(o) {
  Si = new Uint8Array(Le.exports.memory.buffer);
} } };
let Cc = class {
  init() {
    return Os || (Os = typeof fetch < "u" ? fetch("data:application/wasm;base64," + In).then((e) => e.arrayBuffer()).then((e) => WebAssembly.instantiate(e, Hs)).then(this._init) : WebAssembly.instantiate(Buffer.from(In, "base64"), Hs).then(this._init), Os);
  }
  _init(e) {
    Le = e.instance, Hs.env.emscripten_notify_memory_growth(0);
  }
  decode(e, t = 0) {
    if (!Le) throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const s = e.byteLength, i = Le.exports.malloc(s);
    Si.set(e, i), t = t || Number(Le.exports.ZSTD_findDecompressedSize(i, s));
    const n = Le.exports.malloc(t), r = Le.exports.ZSTD_decompress(n, t, i, s), a = Si.slice(n, n + r);
    return Le.exports.free(i), Le.exports.free(n), a;
  }
};
const In = "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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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", yc = "display-p3", Ec = "display-p3-linear", qs = /* @__PURE__ */ new WeakMap();
let zs = 0, js;
class he extends Pi {
  /**
   * Constructs a new KTX2 loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e), this.transcoderPath = "", this.transcoderBinary = null, this.transcoderPending = null, this.workerPool = new $l(), this.workerSourceURL = "", this.workerConfig = null, typeof MSC_TRANSCODER < "u" && console.warn(
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
      const e = new Oe(this.manager);
      e.setPath(this.transcoderPath), e.setWithCredentials(this.withCredentials);
      const t = e.loadAsync("basis_transcoder.js"), s = new Oe(this.manager);
      s.setPath(this.transcoderPath), s.setResponseType("arraybuffer"), s.setWithCredentials(this.withCredentials);
      const i = s.loadAsync("basis_transcoder.wasm");
      this.transcoderPending = Promise.all([t, i]).then(([n, r]) => {
        const a = he.BasisWorker.toString(), l = [
          "/* constants */",
          "let _EngineFormat = " + JSON.stringify(he.EngineFormat),
          "let _EngineType = " + JSON.stringify(he.EngineType),
          "let _TranscoderFormat = " + JSON.stringify(he.TranscoderFormat),
          "let _BasisFormat = " + JSON.stringify(he.BasisFormat),
          "/* basis_transcoder.js */",
          n,
          "/* worker */",
          a.substring(a.indexOf("{") + 1, a.lastIndexOf("}"))
        ].join(`
`);
        this.workerSourceURL = URL.createObjectURL(new Blob([l])), this.transcoderBinary = r, this.workerPool.setWorkerCreator(() => {
          const c = new Worker(this.workerSourceURL), h = this.transcoderBinary.slice(0);
          return c.postMessage({ type: "init", config: this.workerConfig, transcoderBinary: h }, [h]), c;
        });
      }), zs > 0 && console.warn(
        "THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."
      ), zs++;
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
    const n = new Oe(this.manager);
    n.setPath(this.path), n.setCrossOrigin(this.crossOrigin), n.setWithCredentials(this.withCredentials), n.setResponseType("arraybuffer"), n.load(e, (r) => {
      this.parse(r, t, i);
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
    if (qs.has(e))
      return qs.get(e).promise.then(t).catch(s);
    this._createTexture(e).then((i) => t ? t(i) : null).catch(s);
  }
  _createTextureFrom(e, t) {
    const { type: s, error: i, data: { faces: n, width: r, height: a, format: l, type: c, dfdFlags: h } } = e;
    if (s === "error") return Promise.reject(i);
    let A;
    if (t.faceCount === 6)
      A = new ka(n, l, c);
    else {
      const d = n[0].mipmaps;
      A = t.layerCount > 1 ? new Da(d, r, a, t.layerCount, l, c) : new Dr(d, r, a, l, c);
    }
    return A.minFilter = n[0].mipmaps.length === 1 ? $e : ws, A.magFilter = $e, A.generateMipmaps = !1, A.needsUpdate = !0, A.colorSpace = co(t), A.premultiplyAlpha = !!(h & ec), A;
  }
  /**
   * @private
   * @param {ArrayBuffer} buffer
   * @param {?Object} config
   * @return {Promise<CompressedTexture|CompressedArrayTexture|DataTexture|Data3DTexture>}
   */
  async _createTexture(e, t = {}) {
    const s = bc(new Uint8Array(e)), i = s.vkFormat === Ni && s.dataFormatDescriptor[0].colorModel === 167;
    if (!(s.vkFormat === nc || i && !this.workerConfig.astcHDRSupported))
      return wc(s);
    const r = t, a = this.init().then(() => this.workerPool.postMessage({ type: "transcode", buffer: e, taskConfig: r }, [e])).then((l) => this._createTextureFrom(l.data, s));
    return qs.set(e, { promise: a }), a;
  }
  /**
   * Frees internal resources. This method should be called
   * when the loader is no longer required.
   */
  dispose() {
    this.workerPool.dispose(), this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL), zs--;
  }
}
he.BasisFormat = {
  ETC1S: 0,
  UASTC: 1,
  UASTC_HDR: 2
};
he.TranscoderFormat = {
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
he.EngineFormat = {
  RGBAFormat: at,
  RGBA_ASTC_4x4_Format: ls,
  RGB_BPTC_UNSIGNED_Format: Ga,
  RGBA_BPTC_Format: Ci,
  RGBA_ETC2_EAC_Format: Fr,
  RGBA_PVRTC_4BPPV1_Format: Ua,
  RGBA_S3TC_DXT5_Format: yi,
  RGB_ETC1_Format: _a,
  RGB_ETC2_Format: Pr,
  RGB_PVRTC_4BPPV1_Format: Pa,
  RGBA_S3TC_DXT1_Format: Ei
};
he.EngineType = {
  UnsignedByteType: Ce,
  HalfFloatType: lt,
  FloatType: Lt
};
he.BasisWorker = function() {
  let o, e, t;
  const s = _EngineFormat, i = _EngineType, n = _TranscoderFormat, r = _BasisFormat;
  self.addEventListener("message", function(p) {
    const g = p.data;
    switch (g.type) {
      case "init":
        o = g.config, a(g.transcoderBinary);
        break;
      case "transcode":
        e.then(() => {
          try {
            const { faces: m, buffers: y, width: C, height: E, hasAlpha: b, format: I, type: S, dfdFlags: w } = l(g.buffer);
            self.postMessage({ type: "transcode", id: g.id, data: { faces: m, width: C, height: E, hasAlpha: b, format: I, type: S, dfdFlags: w } }, y);
          } catch (m) {
            console.error(m), self.postMessage({ type: "error", id: g.id, error: m.message });
          }
        });
        break;
    }
  });
  function a(p) {
    e = new Promise((g) => {
      t = { wasmBinary: p, onRuntimeInitialized: g }, BASIS(t);
    }).then(() => {
      t.initializeBasis(), t.KTX2File === void 0 && console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.");
    });
  }
  function l(p) {
    const g = new t.KTX2File(new Uint8Array(p));
    function m() {
      g.close(), g.delete();
    }
    if (!g.isValid())
      throw m(), new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");
    let y;
    if (g.isUASTC())
      y = r.UASTC;
    else if (g.isETC1S())
      y = r.ETC1S;
    else if (g.isHDR())
      y = r.UASTC_HDR;
    else
      throw new Error("THREE.KTX2Loader: Unknown Basis encoding");
    const C = g.getWidth(), E = g.getHeight(), b = g.getLayers() || 1, I = g.getLevels(), S = g.getFaces(), w = g.getHasAlpha(), v = g.getDFDFlags(), { transcoderFormat: B, engineFormat: M, engineType: x } = A(y, C, E, w);
    if (!C || !E || !I)
      throw m(), new Error("THREE.KTX2Loader:	Invalid texture");
    if (!g.startTranscoding())
      throw m(), new Error("THREE.KTX2Loader: .startTranscoding failed");
    const R = [], P = [];
    for (let T = 0; T < S; T++) {
      const N = [];
      for (let F = 0; F < I; F++) {
        const L = [];
        let _, j;
        for (let K = 0; K < b; K++) {
          const ue = g.getImageLevelInfo(F, K, T);
          T === 0 && F === 0 && K === 0 && (ue.origWidth % 4 !== 0 || ue.origHeight % 4 !== 0) && console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."), I > 1 ? (_ = ue.origWidth, j = ue.origHeight) : (_ = ue.width, j = ue.height);
          let ce = new Uint8Array(g.getImageTranscodedSizeInBytes(F, K, 0, B));
          const pe = g.transcodeImage(ce, F, K, T, B, 0, -1, -1);
          if (x === i.HalfFloatType && (ce = new Uint16Array(ce.buffer, ce.byteOffset, ce.byteLength / Uint16Array.BYTES_PER_ELEMENT)), !pe)
            throw m(), new Error("THREE.KTX2Loader: .transcodeImage failed.");
          L.push(ce);
        }
        const Me = u(L);
        N.push({ data: Me, width: _, height: j }), P.push(Me.buffer);
      }
      R.push({ mipmaps: N, width: C, height: E, format: M, type: x });
    }
    return m(), { faces: R, buffers: P, width: C, height: E, hasAlpha: w, dfdFlags: v, format: M, type: x };
  }
  const c = [
    {
      if: "astcSupported",
      basisFormat: [r.UASTC],
      transcoderFormat: [n.ASTC_4x4, n.ASTC_4x4],
      engineFormat: [s.RGBA_ASTC_4x4_Format, s.RGBA_ASTC_4x4_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 1 / 0,
      priorityUASTC: 1,
      needsPowerOfTwo: !1
    },
    {
      if: "bptcSupported",
      basisFormat: [r.ETC1S, r.UASTC],
      transcoderFormat: [n.BC7_M5, n.BC7_M5],
      engineFormat: [s.RGBA_BPTC_Format, s.RGBA_BPTC_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 3,
      priorityUASTC: 2,
      needsPowerOfTwo: !1
    },
    {
      if: "dxtSupported",
      basisFormat: [r.ETC1S, r.UASTC],
      transcoderFormat: [n.BC1, n.BC3],
      engineFormat: [s.RGBA_S3TC_DXT1_Format, s.RGBA_S3TC_DXT5_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 4,
      priorityUASTC: 5,
      needsPowerOfTwo: !1
    },
    {
      if: "etc2Supported",
      basisFormat: [r.ETC1S, r.UASTC],
      transcoderFormat: [n.ETC1, n.ETC2],
      engineFormat: [s.RGB_ETC2_Format, s.RGBA_ETC2_EAC_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 1,
      priorityUASTC: 3,
      needsPowerOfTwo: !1
    },
    {
      if: "etc1Supported",
      basisFormat: [r.ETC1S, r.UASTC],
      transcoderFormat: [n.ETC1],
      engineFormat: [s.RGB_ETC1_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 2,
      priorityUASTC: 4,
      needsPowerOfTwo: !1
    },
    {
      if: "pvrtcSupported",
      basisFormat: [r.ETC1S, r.UASTC],
      transcoderFormat: [n.PVRTC1_4_RGB, n.PVRTC1_4_RGBA],
      engineFormat: [s.RGB_PVRTC_4BPPV1_Format, s.RGBA_PVRTC_4BPPV1_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 5,
      priorityUASTC: 6,
      needsPowerOfTwo: !0
    },
    {
      if: "bptcSupported",
      basisFormat: [r.UASTC_HDR],
      transcoderFormat: [n.BC6H],
      engineFormat: [s.RGB_BPTC_UNSIGNED_Format],
      engineType: [i.HalfFloatType],
      priorityHDR: 1,
      needsPowerOfTwo: !1
    },
    // Uncompressed fallbacks.
    {
      basisFormat: [r.ETC1S, r.UASTC],
      transcoderFormat: [n.RGBA32, n.RGBA32],
      engineFormat: [s.RGBAFormat, s.RGBAFormat],
      engineType: [i.UnsignedByteType, i.UnsignedByteType],
      priorityETC1S: 100,
      priorityUASTC: 100,
      needsPowerOfTwo: !1
    },
    {
      basisFormat: [r.UASTC_HDR],
      transcoderFormat: [n.RGBA_HALF],
      engineFormat: [s.RGBAFormat],
      engineType: [i.HalfFloatType],
      priorityHDR: 100,
      needsPowerOfTwo: !1
    }
  ], h = {
    // TODO: For ETC1S we intentionally sort by _UASTC_ priority, preserving
    // a historical accident shown to avoid performance pitfalls for Linux with
    // Firefox & AMD GPU (RadeonSI). Further work needed.
    // See https://github.com/mrdoob/three.js/pull/29730.
    [r.ETC1S]: c.filter((p) => p.basisFormat.includes(r.ETC1S)).sort((p, g) => p.priorityUASTC - g.priorityUASTC),
    [r.UASTC]: c.filter((p) => p.basisFormat.includes(r.UASTC)).sort((p, g) => p.priorityUASTC - g.priorityUASTC),
    [r.UASTC_HDR]: c.filter((p) => p.basisFormat.includes(r.UASTC_HDR)).sort((p, g) => p.priorityHDR - g.priorityHDR)
  };
  function A(p, g, m, y) {
    const C = h[p];
    for (let E = 0; E < C.length; E++) {
      const b = C[E];
      if (b.if && !o[b.if] || !b.basisFormat.includes(p) || y && b.transcoderFormat.length < 2 || b.needsPowerOfTwo && !(d(g) && d(m))) continue;
      const I = b.transcoderFormat[y ? 1 : 0], S = b.engineFormat[y ? 1 : 0], w = b.engineType[0];
      return { transcoderFormat: I, engineFormat: S, engineType: w };
    }
    throw new Error("THREE.KTX2Loader: Failed to identify transcoding target.");
  }
  function d(p) {
    return p <= 2 ? !0 : (p & p - 1) === 0 && p !== 0;
  }
  function u(p) {
    if (p.length === 1) return p[0];
    let g = 0;
    for (let C = 0; C < p.length; C++) {
      const E = p[C];
      g += E.byteLength;
    }
    const m = new Uint8Array(g);
    let y = 0;
    for (let C = 0; C < p.length; C++) {
      const E = p[C];
      m.set(E, y), y += E.byteLength;
    }
    return m;
  }
};
const Ic = /* @__PURE__ */ new Set([at, Tt, xt]), Ks = {
  [no]: at,
  [to]: at,
  [Xr]: at,
  [$r]: at,
  [io]: Tt,
  [eo]: Tt,
  [Jr]: Tt,
  [Wr]: Tt,
  [so]: xt,
  [Zr]: xt,
  [Yr]: xt,
  [Kr]: xt,
  [ro]: Pr,
  [oo]: Fr,
  [Ni]: ls,
  [fc]: ls,
  [gc]: ls,
  [lo]: hn,
  [ao]: hn,
  [ac]: Ei,
  [lc]: Ei,
  [rc]: cn,
  [oc]: cn,
  [hc]: ln,
  [cc]: ln,
  [dc]: yi,
  [Ac]: yi,
  [pc]: Ci,
  [uc]: Ci
}, Ys = {
  [no]: Lt,
  [to]: lt,
  [Xr]: Ce,
  [$r]: Ce,
  [io]: Lt,
  [eo]: lt,
  [Jr]: Ce,
  [Wr]: Ce,
  [so]: Lt,
  [Zr]: lt,
  [Yr]: Ce,
  [Kr]: Ce,
  [ro]: Ce,
  [oo]: Ce,
  [Ni]: lt,
  [lo]: Ce,
  [ao]: Ce
};
async function wc(o) {
  const { vkFormat: e } = o;
  if (Ks[e] === void 0)
    throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");
  let t;
  o.supercompressionScheme === Cn && (js || (js = new Promise(async (n) => {
    const r = new Cc();
    await r.init(), n(r);
  })), t = await js);
  const s = [];
  for (let n = 0; n < o.levels.length; n++) {
    const r = Math.max(1, o.pixelWidth >> n), a = Math.max(1, o.pixelHeight >> n), l = o.pixelDepth ? Math.max(1, o.pixelDepth >> n) : 0, c = o.levels[n];
    let h;
    if (o.supercompressionScheme === Zl)
      h = c.levelData;
    else if (o.supercompressionScheme === Cn)
      h = t.decode(c.levelData, c.uncompressedByteLength);
    else
      throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");
    let A;
    Ys[e] === Lt ? A = new Float32Array(
      h.buffer,
      h.byteOffset,
      h.byteLength / Float32Array.BYTES_PER_ELEMENT
    ) : Ys[e] === lt ? A = new Uint16Array(
      h.buffer,
      h.byteOffset,
      h.byteLength / Uint16Array.BYTES_PER_ELEMENT
    ) : A = h, s.push({
      data: A,
      width: r,
      height: a,
      depth: l
    });
  }
  let i;
  if (Ic.has(Ks[e]))
    i = o.pixelDepth === 0 ? new _r(s[0].data, o.pixelWidth, o.pixelHeight) : new Fa(s[0].data, o.pixelWidth, o.pixelHeight, o.pixelDepth);
  else {
    if (o.pixelDepth > 0) throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");
    i = new Dr(s, o.pixelWidth, o.pixelHeight), i.minFilter = s.length === 1 ? $e : ws, i.magFilter = $e;
  }
  return i.mipmaps = s, i.type = Ys[e], i.format = Ks[e], i.colorSpace = co(o), i.needsUpdate = !0, Promise.resolve(i);
}
function co(o) {
  const e = o.dataFormatDescriptor[0];
  return e.colorPrimaries === sc ? e.transferFunction === yn ? De : Ee : e.colorPrimaries === ic ? e.transferFunction === yn ? yc : Ec : e.colorPrimaries === tc ? bi : (console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${e.colorPrimaries}"`), bi);
}
var Bc = function() {
  var o = "b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q:Odkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq;w8Wqdbk;esezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9Uc;WFbGgocjdaocjd6EhDaicefhocbhqdnindndndnaeaq9nmbaDaeaq9RaqaDfae6Egkcsfglcl4cifcd4hxalc9WGgmTmecbhPawcjdfhsaohzinaraz9Rax6mvarazaxfgo9RcK6mvczhlcbhHinalgic9WfgOawcj;cbffhldndndndndnazaOco4fRbbaHcoG4ciGPlbedibkal9cb83ibalcwf9cb83ibxikalaoRblaoRbbgOco4gAaAciSgAE86bbawcj;cbfaifglcGfaoclfaAfgARbbaOcl4ciGgCaCciSgCE86bbalcVfaAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc7faAaCfgARbbaOciGgOaOciSgOE86bbalctfaAaOfgARbbaoRbegOco4gCaCciSgCE86bbalc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc93faAaCfgARbbaOciGgOaOciSgOE86bbalc94faAaOfgARbbaoRbdgOco4gCaCciSgCE86bbalc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc97faAaCfgARbbaOciGgOaOciSgOE86bbalc98faAaOfgORbbaoRbigoco4gAaAciSgAE86bbalc99faOaAfgORbbaocl4ciGgAaAciSgAE86bbalc9:faOaAfgORbbaocd4ciGgAaAciSgAE86bbalcufaOaAfglRbbaociGgoaociSgoE86bbalaofhoxdkalaoRbwaoRbbgOcl4gAaAcsSgAE86bbawcj;cbfaifglcGfaocwfaAfgARbbaOcsGgOaOcsSgOE86bbalcVfaAaOfgORbbaoRbegAcl4gCaCcsSgCE86bbalc7faOaCfgORbbaAcsGgAaAcsSgAE86bbalctfaOaAfgORbbaoRbdgAcl4gCaCcsSgCE86bbalc91faOaCfgORbbaAcsGgAaAcsSgAE86bbalc4faOaAfgORbbaoRbigAcl4gCaCcsSgCE86bbalc93faOaCfgORbbaAcsGgAaAcsSgAE86bbalc94faOaAfgORbbaoRblgAcl4gCaCcsSgCE86bbalc95faOaCfgORbbaAcsGgAaAcsSgAE86bbalc96faOaAfgORbbaoRbvgAcl4gCaCcsSgCE86bbalc97faOaCfgORbbaAcsGgAaAcsSgAE86bbalc98faOaAfgORbbaoRbogAcl4gCaCcsSgCE86bbalc99faOaCfgORbbaAcsGgAaAcsSgAE86bbalc9:faOaAfgORbbaoRbrgocl4gAaAcsSgAE86bbalcufaOaAfglRbbaocsGgoaocsSgoE86bbalaofhoxekalao8Pbb83bbalcwfaocwf8Pbb83bbaoczfhokdnaiam9pmbaHcdfhHaiczfhlarao9RcL0mekkaiam6mvaoTmvdnakTmbawaPfRbbhHawcj;cbfhlashiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkkascefhsaohzaPcefgPad9hmbxikkcbc99arao9Radcaadca0ESEhoxlkaoaxad2fhCdnakmbadhlinaoTmlarao9Rax6mlaoaxfhoalcufglmbkaChoxekcbhmawcjdfhAinarao9Rax6miawamfRbbhHawcj;cbfhlaAhiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkaAcefhAaoaxfhoamcefgmad9hmbkaChokabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqaombkc9:hoxekc9:hokavcj;ebf8Kjjjjbaok;cseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;oiliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabaiavcefciGfcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavciGfgkcd7cetfaD87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavcufciGfcetfaD87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohvxekcjjjj94hvkabakcetfav87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklzNbb", e = "b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q:6dkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq:p9sqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk:N8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhlaicefhodnaeTmbadTmbalc;WFbGglcjdalcjd6EhwcbhDinawaeaD9RaDawfae6Egqcsfglc9WGgkci2hxakcethmalcl4cifcd4hPabaDad2fhsakc;ab6hzcbhHincbhOaohAdndninaraA9RaP6meavcj;cbfaOak2fhCaAaPfhocbhidnazmbarao9Rc;Gb6mbcbhlinaCalfhidndndndndnaAalco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklbaoczfhokdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklzaoczfhokdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklaaoczfhokdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaoclfaYpQbfaXc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaocwfaYpQbfaXc:q:yjjbfRbbfhoxekaiaopbbbpkl8Waoczfhokalc;abfhialcjefak0meaihlarao9Rc;Fb0mbkkdnaiak9pmbaici4hlinarao9RcK6miaCaifhXdndndndndnaAaico4fRbbalcoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpkbbxikaXaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaXaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaXaopbbbpkbbaoczfhokalcdfhlaiczfgiak6mbkkaoTmeaohAaOcefgOclSmdxbkkc9:hoxlkdnakTmbavcjdfaHfhiavaHfpbdbhYcbhXinaiavcj;cbfaXfglpblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLalakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEalamfpblbg3cep9Ta3aQp9op9Hp9rg3alaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfhiaXczfgXak6mbkkaHclfgHad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfgDae6mbkkcbc99arao9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk::seHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:wPliuo97eue978Jjjjjbca9Rhiaec98Ghldndnadcl9hmbdnalTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalaeSmeaipxbbbbbbbbbbbbbbbbgqpklbaiabalcdtfgdaeciGglcdtgv;8qbbdnalTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDaqp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkadaiav;8qbbskdnalTmbcbhvabhdinadczfgxaxpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oaoarpmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgval6mbkkalaeSmbaiaeciGgvcitgdfcbcaad9R;8kbaiabalcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oaoarpmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalaeSmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbheabhdinadadpbbbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbadczfhdaeclfgeav6mbkkdnavalSmbaialciGgecdtgdVcbc;abad9R;8kbaiabavcdtfgvad;8qbbdnaeTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepklbkavaiad;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz:Dbb", t = new Uint8Array([
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
  var i = WebAssembly.validate(t) ? a(e) : a(o), n, r = WebAssembly.instantiate(i, {}).then(function(y) {
    n = y.instance, n.exports.__wasm_call_ctors();
  });
  function a(y) {
    for (var C = new Uint8Array(y.length), E = 0; E < y.length; ++E) {
      var b = y.charCodeAt(E);
      C[E] = b > 96 ? b - 97 : b > 64 ? b - 39 : b + 4;
    }
    for (var I = 0, E = 0; E < y.length; ++E)
      C[I++] = C[E] < 60 ? s[C[E]] : (C[E] - 60) * 64 + C[++E];
    return C.buffer.slice(0, I);
  }
  function l(y, C, E, b, I, S, w) {
    var v = y.exports.sbrk, B = b + 3 & -4, M = v(B * I), x = v(S.length), R = new Uint8Array(y.exports.memory.buffer);
    R.set(S, x);
    var P = C(M, b, I, x, S.length);
    if (P == 0 && w && w(M, B, I), E.set(R.subarray(M, M + b * I)), v(M - v(0)), P != 0)
      throw new Error("Malformed buffer data: " + P);
  }
  var c = {
    NONE: "",
    OCTAHEDRAL: "meshopt_decodeFilterOct",
    QUATERNION: "meshopt_decodeFilterQuat",
    EXPONENTIAL: "meshopt_decodeFilterExp"
  }, h = {
    ATTRIBUTES: "meshopt_decodeVertexBuffer",
    TRIANGLES: "meshopt_decodeIndexBuffer",
    INDICES: "meshopt_decodeIndexSequence"
  }, A = [], d = 0;
  function u(y) {
    var C = {
      object: new Worker(y),
      pending: 0,
      requests: {}
    };
    return C.object.onmessage = function(E) {
      var b = E.data;
      C.pending -= b.count, C.requests[b.id][b.action](b.value), delete C.requests[b.id];
    }, C;
  }
  function p(y) {
    for (var C = "self.ready = WebAssembly.instantiate(new Uint8Array([" + new Uint8Array(i) + "]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = " + m.name + ";" + l.toString() + m.toString(), E = new Blob([C], { type: "text/javascript" }), b = URL.createObjectURL(E), I = A.length; I < y; ++I)
      A[I] = u(b);
    for (var I = y; I < A.length; ++I)
      A[I].object.postMessage({});
    A.length = y, URL.revokeObjectURL(b);
  }
  function g(y, C, E, b, I) {
    for (var S = A[0], w = 1; w < A.length; ++w)
      A[w].pending < S.pending && (S = A[w]);
    return new Promise(function(v, B) {
      var M = new Uint8Array(E), x = ++d;
      S.pending += y, S.requests[x] = { resolve: v, reject: B }, S.object.postMessage({ id: x, count: y, size: C, source: M, mode: b, filter: I }, [M.buffer]);
    });
  }
  function m(y) {
    var C = y.data;
    if (!C.id)
      return self.close();
    self.ready.then(function(E) {
      try {
        var b = new Uint8Array(C.count * C.size);
        l(E, E.exports[C.mode], b, C.count, C.size, C.source, E.exports[C.filter]), self.postMessage({ id: C.id, count: C.count, action: "resolve", value: b }, [b.buffer]);
      } catch (I) {
        self.postMessage({ id: C.id, count: C.count, action: "reject", value: I });
      }
    });
  }
  return {
    ready: r,
    supported: !0,
    useWorkers: function(y) {
      p(y);
    },
    decodeVertexBuffer: function(y, C, E, b, I) {
      l(n, n.exports.meshopt_decodeVertexBuffer, y, C, E, b, n.exports[c[I]]);
    },
    decodeIndexBuffer: function(y, C, E, b) {
      l(n, n.exports.meshopt_decodeIndexBuffer, y, C, E, b);
    },
    decodeIndexSequence: function(y, C, E, b) {
      l(n, n.exports.meshopt_decodeIndexSequence, y, C, E, b);
    },
    decodeGltfBuffer: function(y, C, E, b, I, S) {
      l(n, n.exports[h[I]], y, C, E, b, n.exports[c[S]]);
    },
    decodeGltfBufferAsync: function(y, C, E, b, I) {
      return A.length > 0 ? g(y, C, E, h[b], c[I]) : r.then(function() {
        var S = new Uint8Array(y * C);
        return l(n, n.exports[h[b]], S, y, C, E, n.exports[c[I]]), S;
      });
    }
  };
}();
function Sc(o) {
  if (!o) return;
  (Array.isArray(o) ? o : [o]).forEach((t) => {
    t && (Object.keys(t).forEach((s) => {
      const i = t[s];
      i && i.isTexture && i.dispose();
    }), typeof t.dispose == "function" && t.dispose());
  });
}
function Js(o) {
  !o || !o.traverse || o.traverse((e) => {
    e.geometry && e.geometry.dispose(), e.material && Sc(e.material);
  });
}
function vc() {
  f.Cache && typeof f.Cache.clear == "function" && f.Cache.clear();
}
class ae {
  constructor(e = null) {
    this.renderer = e, this.isIOSWebKit = ae.isIOSWebKit(), this.platformKey = ae.getPlatformKey(), this.loader = new tt(), this.dracoLoader = new jr(), this.ktx2Loader = null, this.loadQueue = Promise.resolve(), this.activeIOSLoad = !1, this.dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"), this.isIOSWebKit && typeof this.dracoLoader.setWorkerLimit == "function" && this.dracoLoader.setWorkerLimit(1), this.loader.setDRACOLoader(this.dracoLoader), this.loader.setMeshoptDecoder(Bc), this.loader.register((t) => ({
      name: "KHR_materials_pbrSpecularGlossiness",
      extendMaterialParams: async (s, i) => {
        const n = t.json.materials[s];
        if (!n.extensions || !n.extensions.KHR_materials_pbrSpecularGlossiness)
          return Promise.resolve();
        const r = n.extensions.KHR_materials_pbrSpecularGlossiness;
        return r.diffuseTexture !== void 0 && (i.map = await t.getDependency("texture", r.diffuseTexture.index)), r.diffuseFactor !== void 0 && (i.color = new f.Color().fromArray(r.diffuseFactor)), r.glossinessFactor !== void 0 && (i.roughness = 1 - r.glossinessFactor), i.metalness = 0, Promise.resolve();
      }
    })), this.cache = /* @__PURE__ */ new Map(), this.ktx2SetupComplete = !1, this.setupKTX2Loader();
  }
  setupKTX2Loader() {
    const e = this.platformKey;
    try {
      if (!ae.sharedKTX2Loaders.has(e)) {
        const t = new he();
        t.setTranscoderPath("https://cdn.jsdelivr.net/npm/three@0.177.0/examples/jsm/libs/basis/"), this.isIOSWebKit && typeof t.setWorkerLimit == "function" && t.setWorkerLimit(1), ae.sharedKTX2Loaders.set(e, t), ae.sharedKTX2SetupComplete.set(e, !1);
      }
      this.ktx2Loader = ae.sharedKTX2Loaders.get(e), this.loader.setKTX2Loader(this.ktx2Loader), this.ktx2SetupComplete = ae.sharedKTX2SetupComplete.get(e) || !1, this.renderer && !this.ktx2SetupComplete && this.ensureKTX2Support();
    } catch (t) {
      console.warn("KTX2 loader setup failed, falling back to standard textures:", t), this.ktx2Loader = null;
    }
  }
  ensureKTX2Support() {
    if (!this.ktx2Loader || !this.renderer)
      return;
    const e = this.platformKey;
    if (ae.sharedKTX2SetupComplete.get(e)) {
      this.ktx2SetupComplete = !0;
      return;
    }
    try {
      this.ktx2Loader.detectSupport(this.renderer), ae.sharedKTX2SetupComplete.set(e, !0), this.ktx2SetupComplete = !0;
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
    const r = this.loadQueue.then(() => (this.activeIOSLoad && typeof i == "function" && i("freeing-resources"), n()));
    return this.loadQueue = r.catch(() => {
    }), r;
  }
  performLoad(e, t = null, s = null, i = null) {
    return new Promise((n, r) => {
      let a = null;
      const l = () => {
        s && a && (s.removeEventListener("abort", a), a = null);
      }, c = () => {
        l(), this.isIOSWebKit && (this.activeIOSLoad = !1), r(new Error("Loading cancelled"));
      };
      if (s && (a = c, s.addEventListener("abort", a), s.aborted)) {
        c();
        return;
      }
      i && i("downloading"), this.isIOSWebKit && (this.activeIOSLoad = !0), this.loader.load(
        e,
        (h) => {
          if (i && i("processing"), s && s.aborted) {
            l();
            return;
          }
          this.cache.set(e, h);
          const A = this.processModel(h);
          i && i("finalizing"), this.releaseParserCaches(h), l(), this.isIOSWebKit && (this.activeIOSLoad = !1), n(A);
        },
        (h) => {
          s && s.aborted || t && t(h);
        },
        (h) => {
          l(), this.isIOSWebKit && (this.activeIOSLoad = !1), r(h);
        }
      );
    });
  }
  processModel(e) {
    const t = e.scene, s = this.getMaxAnisotropy();
    t.traverse((n) => {
      if (n.isLight && (n.visible = !1), n.isMesh && n.material) {
        n.castShadow = !0, n.receiveShadow = !0;
        const r = Array.isArray(n.material) ? n.material : [n.material];
        r.forEach((a, l) => {
          if (a.emissive && a.emissive.setHex(0), a.emissiveIntensity !== void 0 && (a.emissiveIntensity = 0), a.emissiveMap && (a.emissiveMap = null), a.lightMap && (a.lightMap = null), a.lightMapIntensity !== void 0 && (a.lightMapIntensity = 0), a.type === "MeshBasicMaterial" || a.type === "MeshPhongMaterial") {
            const h = new f.MeshStandardMaterial({
              // Only include common, safe params; set specialized textures conditionally below
              color: a.color || new f.Color(16777215),
              side: a.side !== void 0 ? a.side : f.FrontSide,
              wireframe: a.wireframe || !1,
              vertexColors: a.vertexColors || !1,
              fog: a.fog !== void 0 ? a.fog : !0,
              flatShading: !1,
              // Realistic shipwreck appearance
              roughness: 0.8,
              // Weathered, corroded metal/wood
              metalness: 0.3
              // Mix of metal and non-metal
            });
            a.map && (h.map = a.map), a.alphaMap && (h.alphaMap = a.alphaMap), a.aoMap && (h.aoMap = a.aoMap), typeof a.aoMapIntensity == "number" && (h.aoMapIntensity = a.aoMapIntensity), a.envMap && (h.envMap = a.envMap), a.roughnessMap && (h.roughnessMap = a.roughnessMap), a.metalnessMap && (h.metalnessMap = a.metalnessMap), a.transparent !== void 0 && (h.transparent = a.transparent), typeof a.opacity == "number" && (h.opacity = a.opacity), a.normalMap && (h.normalMap = a.normalMap, h.normalScale = a.normalScale || new f.Vector2(1, 1)), s !== null && ["map", "normalMap", "roughnessMap", "metalnessMap", "aoMap"].forEach((d) => {
              h[d] && (h[d].anisotropy = s, h[d].needsUpdate = !0);
            }), h.needsUpdate = !0, Array.isArray(n.material) ? n.material[l] = h : n.material = h, a !== h && typeof a?.dispose == "function" && a.dispose();
          } else (a.type === "MeshStandardMaterial" || a.type === "MeshPhysicalMaterial") && (s !== null && ["map", "normalMap", "roughnessMap", "metalnessMap", "aoMap", "emissiveMap"].forEach((A) => {
            a[A] && (a[A].anisotropy = s, a[A].needsUpdate = !0);
          }), a.needsUpdate = !0);
          const c = Array.isArray(n.material) ? n.material[l] : n.material;
          c && c.needsUpdate !== void 0 && (c.needsUpdate = !0);
        }), n.geometry && (n.geometry.computeVertexNormals(), n.geometry.normalizeNormals(), r.some((l) => l.normalMap) && n.geometry.computeTangents());
      }
    });
    const i = new f.Box3().setFromObject(t);
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
        const r = i[n];
        r && typeof r.dispose == "function" && r.dispose(), r && r.source && typeof r.source.dispose == "function" && r.source.dispose(), r && r.image && typeof r.image.close == "function" && r.image.close(), r && (i[n] = null);
      }), typeof i.dispose == "function" && i.dispose());
    });
  }
  releaseParserCaches(e) {
    const t = e?.parser;
    t && (t.cache && typeof t.cache.removeAll == "function" && t.cache.removeAll(), t.associations && typeof t.associations.clear == "function" && t.associations.clear(), t.primitiveCache = {}, t.nodeCache = {}, t.meshCache = { refs: {}, uses: {} }, t.cameraCache = { refs: {}, uses: {} }, t.lightCache = { refs: {}, uses: {} }, t.sourceCache = {}, t.textureCache = {}, t.nodeNamesUsed = {}, t.json = null, t.extensions = null, t.plugins = null, t.options = null, t.textureLoader = null, e.parser = null, vc());
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
    return ae.isIOSWebKit() ? "ios" : "default";
  }
}
ae.sharedKTX2Loaders = /* @__PURE__ */ new Map();
ae.sharedKTX2SetupComplete = /* @__PURE__ */ new Map();
let Mc = class {
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
    const i = this.usedSet, n = this.itemList, r = this.callbacks;
    return n.push(e), i.add(e), s.set(e, Date.now()), r.set(e, t), !0;
  }
  has(e) {
    return this.itemSet.has(e);
  }
  remove(e) {
    const t = this.usedSet, s = this.itemSet, i = this.itemList, n = this.bytesMap, r = this.callbacks, a = this.loadedSet;
    if (s.has(e)) {
      this.cachedBytes -= n.get(e) || 0, n.delete(e), r.get(e)(e);
      const l = i.indexOf(e);
      return i.splice(l, 1), t.delete(e), s.delete(e), r.delete(e), a.delete(e), !0;
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
      usedSet: r,
      loadedSet: a,
      callbacks: l,
      bytesMap: c,
      minBytesSize: h,
      maxBytesSize: A
    } = this, d = i.length - r.size, u = i.length - a.size, p = Math.max(Math.min(i.length - t, d), 0), g = this.cachedBytes - h, m = this.unloadPriorityCallback || this.defaultPriorityCallback;
    let y = !1;
    const C = p > 0 && d > 0 || u && i.length > s;
    if (d && this.cachedBytes > h || u && this.cachedBytes > A || C) {
      i.sort((B, M) => {
        const x = r.has(B), R = r.has(M);
        if (x === R) {
          const P = a.has(B), T = a.has(M);
          return P === T ? -m(B, M) : P ? 1 : -1;
        } else
          return x ? 1 : -1;
      });
      const E = Math.max(t * e, p * e), b = Math.ceil(Math.min(E, d, p)), I = Math.max(e * g, e * h), S = Math.min(I, g);
      let w = 0, v = 0;
      for (; this.cachedBytes - v > A || i.length - w > s; ) {
        const B = i[w], M = c.get(B) || 0;
        if (r.has(B) && a.has(B) || this.cachedBytes - v - M < A && i.length - w <= s)
          break;
        v += M, w++;
      }
      for (; v < S || w < b; ) {
        const B = i[w], M = c.get(B) || 0;
        if (r.has(B) || this.cachedBytes - v - M < h && w >= b)
          break;
        v += M, w++;
      }
      i.splice(0, w).forEach((B) => {
        this.cachedBytes -= c.get(B) || 0, l.get(B)(B), c.delete(B), n.delete(B), l.delete(B), a.delete(B), r.delete(B);
      }), y = w < p || v < g && w < d, y = y && w > 0;
    }
    y && (this.unloadingHandle = requestAnimationFrame(() => this.scheduleUnload()));
  }
  scheduleUnload() {
    cancelAnimationFrame(this.unloadingHandle), this.scheduled || (this.scheduled = !0, queueMicrotask(() => {
      this.scheduled = !1, this.unloadUnusedContent();
    }));
  }
}, wn = class extends Error {
  constructor() {
    super("PriorityQueue: Item removed"), this.name = "PriorityQueueItemRemovedError";
  }
}, Ws = class {
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
      const r = this.items, a = this.callbacks;
      s.resolve = i, s.reject = n, r.unshift(e), a.set(e, s), this.autoUpdate && this.scheduleJobRun();
    }), s.promise;
  }
  remove(e) {
    const t = this.items, s = this.callbacks, i = t.indexOf(e);
    if (i !== -1) {
      const n = s.get(e);
      n.promise.catch((r) => {
        if (!(r instanceof wn))
          throw r;
      }), n.reject(new wn()), t.splice(i, 1), s.delete(e);
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
      const r = e.pop(), { callback: a, resolve: l, reject: c } = t.get(r);
      t.delete(r);
      let h;
      try {
        h = a(r);
      } catch (A) {
        c(A), n();
      }
      h instanceof Promise ? h.then(l).catch(c).finally(n) : (l(h), n());
    }
  }
  scheduleJobRun() {
    this.scheduled || (this.schedulingCallback(this._runjobs), this.scheduled = !0);
  }
};
const We = -1, Pe = 0, Ht = 1, qt = 2, Xs = 3, ye = 4, Bn = 6378137, xc = 6356752314245179e-9;
function Tc(o, e = null, t = null) {
  const s = [];
  for (s.push(o), s.push(null), s.push(0); s.length > 0; ) {
    const i = s.pop(), n = s.pop(), r = s.pop();
    if (e && e(r, n, i)) {
      t && t(r, n, i);
      return;
    }
    const a = r.children;
    if (a)
      for (let l = a.length - 1; l >= 0; l--)
        s.push(a[l]), s.push(r), s.push(i + 1);
    t && t(r, n, i);
  }
}
function Ze(o) {
  if (o === null || o.byteLength < 4)
    return "";
  let e;
  if (o instanceof DataView ? e = o : e = new DataView(o), String.fromCharCode(e.getUint8(0)) === "{")
    return null;
  let t = "";
  for (let s = 0; s < 4; s++)
    t += String.fromCharCode(e.getUint8(s));
  return t;
}
const Qc = new TextDecoder();
function Vi(o) {
  return Qc.decode(o);
}
function Oi(o) {
  return o.replace(/[\\/][^\\/]+$/, "") + "/";
}
let _t = class {
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
    }).then((t) => (this.workingPath === "" && (this.workingPath = Oi(e)), this.parse(t)));
  }
  resolveExternalURL(e) {
    return new URL(e, this.workingPath).href;
  }
  parse(e) {
    throw new Error("LoaderBase: Parse not implemented.");
  }
};
function Sn(o) {
  if (!o)
    return null;
  let e = o.length;
  const t = o.indexOf("?"), s = o.indexOf("#");
  t !== -1 && (e = Math.min(e, t)), s !== -1 && (e = Math.min(e, s));
  const i = o.lastIndexOf(".", e), n = o.lastIndexOf("/", e), r = o.indexOf("://");
  return r !== -1 && r + 2 === n || i === -1 || i < n ? null : o.substring(i + 1, e) || null;
}
const zt = {
  inView: !1,
  error: 1 / 0,
  distanceFromCamera: 1 / 0
};
function ds(o) {
  return o === ye || o === We;
}
function He(o, e) {
  return ho(o) && o.traversal.lastFrameVisited === e && o.traversal.used;
}
function ho(o) {
  return !!o.traversal;
}
function Ut(o) {
  const e = o.children.length === 0 || !!o.children[0].internal, t = !o.internal.hasUnrenderableContent || ds(o.internal.loadingState);
  return e && t;
}
function ut(o) {
  return o.internal.hasUnrenderableContent || o.parent && o.parent.geometricError < o.geometricError;
}
function xs(o, e) {
  e.ensureChildrenArePreprocessed(o), o.traversal.lastFrameVisited !== e.frameCount && (o.traversal.lastFrameVisited = e.frameCount, o.traversal.used = !1, o.traversal.inFrustum = !1, o.traversal.isLeaf = !1, o.traversal.visible = !1, o.traversal.active = !1, o.traversal.error = 1 / 0, o.traversal.distanceFromCamera = 1 / 0, o.traversal.allChildrenReady = !1, o.traversal.kicked = !1, o.traversal.allUsedChildrenProcessed = !1, e.calculateTileViewErrorWithPlugin(o, zt), o.traversal.inFrustum = zt.inView, o.traversal.error = zt.error, o.traversal.distanceFromCamera = zt.distanceFromCamera);
}
function vi(o, e, t = !1) {
  if (xs(o, e), t ? e.markTileUsed(o) : us(o), ut(o) && Ut(o)) {
    const s = o.children;
    for (let i = 0, n = s.length; i < n; i++)
      vi(s[i], e, t);
  }
}
function Ao(o, e) {
  if (xs(o, e), o.traversal.usedLastFrame && (us(o), o.traversal.wasSetActive && (o.traversal.active = !0), (!o.traversal.active || ut(o)) && Ut(o))) {
    const t = o.children;
    for (let s = 0, i = t.length; s < i; s++)
      Ao(t[s], e);
  }
}
function us(o) {
  o.traversal.used = !0;
}
function Rc(o, e) {
  return !(o.traversal.error <= e.errorTarget && !ut(o) || e.maxDepth > 0 && o.internal.depth + 1 >= e.maxDepth || !Ut(o));
}
function uo(o, e) {
  const { frameCount: t } = e, { children: s } = o;
  for (let i = 0, n = s.length; i < n; i++) {
    const r = s[i];
    He(r, t) && (r.traversal.active && (r.traversal.kicked = !0, r.traversal.active = !1), uo(r, e));
  }
}
function vn(o) {
  return !ut(o) && (!o.internal.hasContent || ds(o.internal.loadingState));
}
function po(o, e) {
  if (xs(o, e), !o.traversal.inFrustum)
    return;
  if (!Rc(o, e)) {
    us(o);
    return;
  }
  let t = !1, s = !1;
  const i = o.children;
  for (let n = 0, r = i.length; n < r; n++) {
    const a = i[n];
    po(a, e), t = t || He(a, e.frameCount), s = s || a.traversal.inFrustum;
  }
  if (o.refine === "REPLACE" && !s && i.length !== 0) {
    o.traversal.inFrustum = !1, e.markTileUsed(o);
    for (let n = 0, r = i.length; n < r; n++)
      vi(i[n], e, !0);
    return;
  }
  if (us(o), o.refine === "REPLACE" && t && e.loadSiblings)
    for (let n = 0, r = i.length; n < r; n++)
      vi(i[n], e);
}
function go(o, e) {
  const t = e.frameCount;
  if (!He(o, t))
    return;
  const s = o.children;
  let i = !1;
  for (let r = 0, a = s.length; r < a; r++) {
    const l = s[r];
    i = i || He(l, t);
  }
  if (!i)
    o.traversal.isLeaf = !0;
  else
    for (let r = 0, a = s.length; r < a; r++)
      go(s[r], e);
  let n = !0;
  for (let r = 0, a = s.length; r < a; r++) {
    const l = s[r];
    He(l, e.frameCount) && !l.traversal.allUsedChildrenProcessed && (n = !1);
  }
  o.traversal.allUsedChildrenProcessed = n && Ut(o);
}
function fo(o, e) {
  if (!He(o, e.frameCount))
    return;
  const t = o.internal.hasContent, s = ds(o.internal.loadingState) && t, i = o.children;
  if (o.traversal.isLeaf) {
    if (!ut(o) && (o.traversal.active = !0, Ut(o) && (!o.internal.hasContent || !ds(o.internal.loadingState))))
      for (let a = 0, l = i.length; a < l; a++)
        Ao(i[a], e);
    return;
  }
  let n = i.length > 0;
  for (let a = 0, l = i.length; a < l; a++) {
    const c = i[a];
    fo(c, e), He(c, e.frameCount) && !(c.traversal.active && vn(c)) && !c.traversal.allChildrenReady && (n = !1);
  }
  o.traversal.allChildrenReady = n;
  const r = o.traversal.active && vn(o);
  !ut(o) && !n && !r && o.traversal.wasSetActive && (s || !o.internal.hasContent) && (o.traversal.active = !0, uo(o, e));
}
function mo(o, e) {
  var t;
  const s = He(o, e.frameCount);
  if (s && ((o.internal.hasUnrenderableContent || o.internal.hasRenderableContent && o.refine === "ADD") && (o.traversal.active = !0), (o.traversal.active || o.traversal.kicked) && o.internal.hasContent ? (e.markTileUsed(o), (o.internal.hasUnrenderableContent || o.traversal.allUsedChildrenProcessed) && e.queueTileForDownload(o), o.internal.loadingState !== ye && (o.traversal.active = !1)) : o.traversal.active = !1, o.traversal.visible = o.internal.hasRenderableContent && o.traversal.active && o.traversal.inFrustum && o.internal.loadingState === ye, e.stats.used++, o.traversal.inFrustum && e.stats.inFrustum++), s || ho(o) && (t = o.traversal) != null && t.usedLastFrame) {
    let i = !1, n = !1;
    s ? (i = o.traversal.active, e.displayActiveTiles ? n = o.traversal.active || o.traversal.visible : n = o.traversal.visible) : xs(o, e), o.internal.hasRenderableContent && o.internal.loadingState === ye && (o.traversal.wasSetActive !== i && (e.stats.active += i ? 1 : -1, e.invokeOnePlugin((a) => a.setTileActive && a.setTileActive(o, i))), o.traversal.wasSetVisible !== n && (e.stats.visible += n ? 1 : -1, e.invokeOnePlugin((a) => a.setTileVisible && a.setTileVisible(o, n)))), o.traversal.wasSetActive = i, o.traversal.wasSetVisible = n, o.traversal.usedLastFrame = s;
    const r = o.children;
    for (let a = 0, l = r.length; a < l; a++) {
      const c = r[a];
      mo(c, e);
    }
  }
}
function Lc(o, e) {
  po(o, e), go(o, e), fo(o, e), mo(o, e);
}
const jt = {
  inView: !1,
  error: 1 / 0,
  distanceFromCamera: 1 / 0
}, bo = !0;
function Co(o) {
  return o === ye || o === We;
}
function qe(o, e) {
  return yo(o) && o.traversal.lastFrameVisited === e && o.traversal.used;
}
function yo(o) {
  return !!o.traversal;
}
function Hi(o) {
  return o.children.length === 0 || !!o.children[0].internal;
}
function qi(o) {
  return o.internal.hasUnrenderableContent || o.parent && o.parent.geometricError < o.geometricError;
}
function zi(o, e) {
  o.traversal.lastFrameVisited !== e.frameCount && (o.traversal.lastFrameVisited = e.frameCount, o.traversal.used = !1, o.traversal.inFrustum = !1, o.traversal.isLeaf = !1, o.traversal.visible = !1, o.traversal.active = !1, o.traversal.error = 1 / 0, o.traversal.distanceFromCamera = 1 / 0, o.traversal.allChildrenReady = !1, e.calculateTileViewErrorWithPlugin(o, jt), o.traversal.inFrustum = jt.inView, o.traversal.error = jt.error, o.traversal.distanceFromCamera = jt.distanceFromCamera);
}
function Mi(o, e, t = !1) {
  if (e.ensureChildrenArePreprocessed(o), zi(o, e), xi(o, e, t), qi(o) && Hi(o)) {
    const s = o.children;
    for (let i = 0, n = s.length; i < n; i++)
      Mi(s[i], e, t);
  }
}
function Eo(o, e) {
  if (e.ensureChildrenArePreprocessed(o), qe(o, e.frameCount) && (o.internal.hasContent && e.queueTileForDownload(o), Hi(o))) {
    const t = o.children;
    for (let s = 0, i = t.length; s < i; s++)
      Eo(t[s], e);
  }
}
function xi(o, e, t = !1) {
  o.traversal.used || (t || (o.traversal.used = !0, e.stats.used++), e.markTileUsed(o), o.traversal.inFrustum === !0 && e.stats.inFrustum++);
}
function kc(o, e) {
  return !(o.traversal.error <= e.errorTarget && !qi(o) || e.maxDepth > 0 && o.internal.depth + 1 >= e.maxDepth || !Hi(o));
}
function Io(o, e) {
  if (e.ensureChildrenArePreprocessed(o), zi(o, e), !o.traversal.inFrustum)
    return;
  if (!kc(o, e)) {
    xi(o, e);
    return;
  }
  let t = !1, s = !1;
  const i = o.children;
  for (let n = 0, r = i.length; n < r; n++) {
    const a = i[n];
    Io(a, e), t = t || qe(a, e.frameCount), s = s || a.traversal.inFrustum;
  }
  if (o.refine === "REPLACE" && !s && i.length !== 0) {
    o.traversal.inFrustum = !1;
    for (let n = 0, r = i.length; n < r; n++)
      Mi(i[n], e, !0);
    return;
  }
  if (xi(o, e), o.refine === "REPLACE" && (t && o.internal.depth !== 0 || bo))
    for (let n = 0, r = i.length; n < r; n++)
      Mi(i[n], e);
}
function wo(o, e) {
  const t = e.frameCount;
  if (!qe(o, t))
    return;
  const s = o.children;
  let i = !1;
  for (let n = 0, r = s.length; n < r; n++) {
    const a = s[n];
    i = i || qe(a, t);
  }
  if (!i)
    o.traversal.isLeaf = !0;
  else {
    let n = !0;
    for (let r = 0, a = s.length; r < a; r++) {
      const l = s[r];
      if (wo(l, e), qe(l, t)) {
        const c = !qi(l);
        let h = !l.internal.hasContent || l.internal.hasRenderableContent && Co(l.internal.loadingState) || l.internal.hasUnrenderableContent && l.internal.loadingState === We;
        h = c && h || l.traversal.allChildrenReady, n = n && h;
      }
    }
    o.traversal.allChildrenReady = n;
  }
}
function Bo(o, e) {
  const t = e.stats;
  if (!qe(o, e.frameCount))
    return;
  if (o.traversal.isLeaf) {
    o.internal.loadingState === ye ? (o.traversal.inFrustum && (o.traversal.visible = !0, t.visible++), o.traversal.active = !0, t.active++) : o.internal.hasContent && e.queueTileForDownload(o);
    return;
  }
  const s = o.children, i = o.internal.hasContent, n = Co(o.internal.loadingState) && i, r = (e.errorTarget + 1) * e.errorThreshold, a = o.traversal.error <= r, l = o.refine === "ADD", c = o.traversal.allChildrenReady || o.internal.depth === 0 && !bo;
  if (i && (a || l) && e.queueTileForDownload(o), (a && n && !c || n && l) && (o.traversal.inFrustum && (o.traversal.visible = !0, t.visible++), o.traversal.active = !0, t.active++), !l && a && !c)
    for (let h = 0, A = s.length; h < A; h++) {
      const d = s[h];
      qe(d, e.frameCount) && Eo(d, e);
    }
  else
    for (let h = 0, A = s.length; h < A; h++)
      Bo(s[h], e);
}
function So(o, e) {
  const t = qe(o, e.frameCount);
  if (t || yo(o) && o.traversal.usedLastFrame) {
    let s = !1, i = !1;
    t ? (s = o.traversal.active, e.displayActiveTiles ? i = o.traversal.active || o.traversal.visible : i = o.traversal.visible) : zi(o, e), o.internal.hasRenderableContent && o.internal.loadingState === ye && (o.traversal.wasSetActive !== s && e.invokeOnePlugin((r) => r.setTileActive && r.setTileActive(o, s)), o.traversal.wasSetVisible !== i && e.invokeOnePlugin((r) => r.setTileVisible && r.setTileVisible(o, i))), o.traversal.wasSetActive = s, o.traversal.wasSetVisible = i, o.traversal.usedLastFrame = t;
    const n = o.children;
    for (let r = 0, a = n.length; r < a; r++) {
      const l = n[r];
      So(l, e);
    }
  }
}
function Dc(o, e) {
  Io(o, e), wo(o, e), Bo(o, e), So(o, e);
}
function Fc(o) {
  let e = null;
  return () => {
    e === null && (e = requestAnimationFrame(() => {
      e = null, o();
    }));
  };
}
const Mn = Symbol("PLUGIN_REGISTERED"), _e = {
  inView: !0,
  error: 0,
  distance: 1 / 0
}, $s = (o, e) => {
  const t = o.priority || 0, s = e.priority || 0;
  return t !== s ? t > s ? 1 : -1 : !o.traversal || !e.traversal ? 0 : o.traversal.used !== e.traversal.used ? o.traversal.used ? 1 : -1 : o.traversal.error !== e.traversal.error ? o.traversal.error > e.traversal.error ? 1 : -1 : o.traversal.distanceFromCamera !== e.traversal.distanceFromCamera ? o.traversal.distanceFromCamera > e.traversal.distanceFromCamera ? -1 : 1 : o.internal.depthFromRenderedParent !== e.internal.depthFromRenderedParent ? o.internal.depthFromRenderedParent > e.internal.depthFromRenderedParent ? -1 : 1 : 0;
}, Pc = (o, e) => {
  const t = o.priority || 0, s = e.priority || 0;
  return t !== s ? t > s ? 1 : -1 : !o.traversal || !e.traversal ? 0 : o.traversal.used !== e.traversal.used ? o.traversal.used ? 1 : -1 : o.traversal.inFrustum !== e.traversal.inFrustum ? o.traversal.inFrustum ? 1 : -1 : o.internal.hasUnrenderableContent !== e.internal.hasUnrenderableContent ? o.internal.hasUnrenderableContent ? 1 : -1 : o.traversal.distanceFromCamera !== e.traversal.distanceFromCamera ? o.traversal.distanceFromCamera > e.traversal.distanceFromCamera ? -1 : 1 : 0;
}, _c = (o, e) => {
  const t = o.priority || 0, s = e.priority || 0;
  return t !== s ? t > s ? 1 : -1 : !o.traversal || !e.traversal ? 0 : o.traversal.lastFrameVisited !== e.traversal.lastFrameVisited ? o.traversal.lastFrameVisited > e.traversal.lastFrameVisited ? -1 : 1 : o.internal.depthFromRenderedParent !== e.internal.depthFromRenderedParent ? o.internal.depthFromRenderedParent > e.internal.depthFromRenderedParent ? 1 : -1 : o.internal.loadingState !== e.internal.loadingState ? o.internal.loadingState > e.internal.loadingState ? -1 : 1 : o.internal.hasUnrenderableContent !== e.internal.hasUnrenderableContent ? o.internal.hasUnrenderableContent ? -1 : 1 : o.traversal.error !== e.traversal.error ? o.traversal.error > e.traversal.error ? -1 : 1 : 0;
};
class Uc {
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
    this.rootLoadingState = Pe, this.rootTileset = null, this.rootURL = e, this.fetchOptions = {}, this.plugins = [], this.queuedTiles = [], this.cachedSinceLoadComplete = /* @__PURE__ */ new Set(), this.isLoading = !1;
    const t = new Mc();
    t.unloadPriorityCallback = _c;
    const s = new Ws();
    s.maxJobs = 25, s.priorityCallback = $s;
    const i = new Ws();
    i.maxJobs = 5, i.priorityCallback = $s;
    const n = new Ws();
    n.maxJobs = 25, n.priorityCallback = (r, a) => {
      const l = r.parent, c = a.parent;
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
    }, this.frameCount = 0, this._dispatchNeedsUpdateEvent = Fc(() => {
      this.dispatchEvent({ type: "needs-update" });
    }), this.errorTarget = 16, this._errorThreshold = 1 / 0, this.displayActiveTiles = !1, this.maxDepth = 1 / 0, this.optimizedLoadStrategy = !1, this.loadSiblings = !0, this.maxTilesProcessed = 250;
  }
  // Plugins
  registerPlugin(e) {
    if (e[Mn] === !0)
      throw new Error("TilesRendererBase: A plugin can only be registered to a single tileset");
    e.loadRootTileSet && !e.loadRootTileset && (console.warn('TilesRendererBase: Plugin implements deprecated "loadRootTileSet" method. Please rename to "loadRootTileset".'), e.loadRootTileset = e.loadRootTileSet), e.preprocessTileSet && !e.preprocessTileset && (console.warn('TilesRendererBase: Plugin implements deprecated "preprocessTileSet" method. Please rename to "preprocessTileset".'), e.preprocessTileset = e.preprocessTileSet);
    const t = this.plugins, s = e.priority || 0;
    let i = t.length;
    for (let n = 0; n < t.length; n++)
      if ((t[n].priority || 0) > s) {
        i = n;
        break;
      }
    t.splice(i, 0, e), e[Mn] = !0, e.init && e.init(this);
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
    this.root && Tc(this.root, (i, ...n) => (s && this.ensureChildrenArePreprocessed(i, !0), e ? e(i, ...n) : !1), t);
  }
  getAttributions(e = []) {
    return this.invokeAllPlugins((t) => t !== this && t.getAttributions && t.getAttributions(e)), e;
  }
  update() {
    const { lruCache: e, usedSet: t, stats: s, root: i, downloadQueue: n, parseQueue: r, processNodeQueue: a, optimizedLoadStrategy: l } = this;
    if (this.rootLoadingState === Pe && (this.rootLoadingState = qt, this.invokeOnePlugin((d) => d.loadRootTileset && d.loadRootTileset()).then((d) => {
      let u = this.rootURL;
      u !== null && this.invokeAllPlugins((p) => u = p.preprocessURL ? p.preprocessURL(u, null) : u), this.rootLoadingState = ye, this.rootTileset = d, this.dispatchEvent({ type: "needs-update" }), this.dispatchEvent({ type: "load-content" }), this.dispatchEvent({
        type: "load-tileset",
        tileset: d,
        url: u
      }), this.dispatchEvent({
        type: "load-root-tileset",
        tileset: d,
        url: u
      });
    }).catch((d) => {
      this.rootLoadingState = We, console.error(d), this.rootTileset = null, this.dispatchEvent({
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
    const h = l ? Pc : $s;
    n.priorityCallback = h, r.priorityCallback = h, this.prepareForTraversal(), l ? Lc(i, this) : Dc(i, this), this.removeUnusedPendingTiles();
    const A = this.queuedTiles;
    A.sort(e.unloadPriorityCallback);
    for (let d = 0, u = A.length; d < u && !e.isFull(); d++)
      this.requestTileContents(A[d]);
    A.length = 0, e.scheduleUnload(), (n.running || r.running || a.running) === !1 && this.isLoading === !0 && (this.cachedSinceLoadComplete.clear(), s.inCacheSinceLoad = 0, this.dispatchEvent({ type: "tiles-load-end" }), this.isLoading = !1), this.dispatchEvent({ type: "update-after" });
  }
  resetFailedTiles() {
    this.rootLoadingState === We && (this.rootLoadingState = Pe);
    const e = this.stats;
    e.failed !== 0 && (this.traverse((t) => {
      t.internal.loadingState === We && (t.internal.loadingState = Pe);
    }, null, !1), e.failed = 0);
  }
  calculateTileViewErrorWithPlugin(e, t) {
    this.calculateTileViewError(e, t);
    let s = null, i = 0, n = 1 / 0;
    this.invokeAllPlugins((r) => {
      r !== this && r.calculateTileViewError && (_e.inView = !0, _e.error = 0, _e.distance = 1 / 0, r.calculateTileViewError(e, _e) && (s === null && (s = !0), s = s && _e.inView, _e.inView && (n = Math.min(n, _e.distance), i = Math.max(i, _e.error))));
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
      loadingState: Pe,
      basePath: t,
      depth: -1,
      depthFromRenderedParent: -1
    }, (i = e.content) != null && i.uri) {
      const n = Sn(e.content.uri), r = !!(n && /json$/.test(n));
      e.internal.hasContent = !0, e.internal.hasUnrenderableContent = r, e.internal.hasRenderableContent = !r;
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
      !e.isUsed(i) && i.internal.loadingState === Ht && s.push(i);
    for (let i = 0; i < s.length; i++)
      e.remove(s[i]);
  }
  // Private Functions
  queueTileForDownload(e) {
    e.internal.loadingState !== Pe || this.lruCache.isFull() || this.queuedTiles.push(e);
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
      for (let r = 0, a = n.length; r < a; r++)
        this.preprocessNode(n[r], e.internal.basePath, e);
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
    const n = e.asset.version, [r, a] = n.split(".").map((c) => parseInt(c));
    console.assert(
      r <= 1,
      "TilesRenderer: asset.version is expected to be a 1.x or a compatible version."
    ), r === 1 && a > 0 && console.warn("TilesRenderer: tiles versions at 1.1 or higher have limited support. Some new extensions and features may not be supported.");
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
    if (e.internal.loadingState !== Pe)
      return;
    let t = !1, s = null, i = new URL(e.content.uri, e.internal.basePath + "/").toString();
    this.invokeAllPlugins((u) => i = u.preprocessURL ? u.preprocessURL(i, e) : i);
    const n = this.stats, r = this.lruCache, a = this.downloadQueue, l = this.parseQueue, c = this.loadingTiles, h = Sn(i), A = new AbortController(), d = A.signal;
    if (r.add(e, (u) => {
      A.abort(), t ? u.children.length = 0 : this.invokeAllPlugins((p) => {
        p.disposeTile && p.disposeTile(u);
      }), n.inCache--, this.cachedSinceLoadComplete.has(e) && (this.cachedSinceLoadComplete.delete(e), n.inCacheSinceLoad--), u.internal.loadingState === Ht ? n.queued-- : u.internal.loadingState === qt ? n.downloading-- : u.internal.loadingState === Xs ? n.parsing-- : u.internal.loadingState === ye && n.loaded--, u.internal.loadingState = Pe, l.remove(u), a.remove(u), c.delete(u);
    }))
      return this.isLoading || (this.isLoading = !0, this.dispatchEvent({ type: "tiles-load-start" })), r.setMemoryUsage(e, this.getBytesUsed(e)), this.cachedSinceLoadComplete.add(e), n.inCacheSinceLoad++, n.inCache++, n.queued++, e.internal.loadingState = Ht, c.add(e), a.add(e, (u) => {
        if (d.aborted)
          return Promise.resolve();
        e.internal.loadingState = qt, n.downloading++, n.queued--;
        const p = this.invokeOnePlugin((g) => g.fetchData && g.fetchData(i, { ...this.fetchOptions, signal: d }));
        return this.dispatchEvent({ type: "tile-download-start", tile: e, uri: i }), p;
      }).then((u) => {
        if (!d.aborted)
          if (u instanceof Response) {
            if (u.ok)
              return h === "json" ? u.json() : u.arrayBuffer();
            throw new Error(`Failed to load model with error code ${u.status}`);
          } else return u;
      }).then((u) => {
        if (!d.aborted)
          return n.downloading--, n.parsing++, e.internal.loadingState = Xs, l.add(e, (p) => d.aborted ? Promise.resolve() : h === "json" && u.root ? (this.preprocessTileset(u, i, e), e.children.push(u.root), s = u, t = !0, Promise.resolve()) : this.invokeOnePlugin((g) => g.parseTile && g.parseTile(u, p, h, i, d)));
      }).then(() => {
        if (d.aborted)
          return;
        n.parsing--, n.loaded++, e.internal.loadingState = ye, c.delete(e), r.setLoaded(e, !0);
        const u = this.getBytesUsed(e);
        if (r.getMemoryUsage(e) === 0 && u > 0 && r.isFull()) {
          r.remove(e);
          return;
        }
        r.setMemoryUsage(e, u), this.dispatchEvent({ type: "needs-update" }), this.dispatchEvent({ type: "load-content" }), t && this.dispatchEvent({
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
        d.aborted || (u.name !== "AbortError" ? (l.remove(e), a.remove(e), e.internal.loadingState === Ht ? n.queued-- : e.internal.loadingState === qt ? n.downloading-- : e.internal.loadingState === Xs ? n.parsing-- : e.internal.loadingState === ye && n.loaded--, n.failed++, console.error(`TilesRenderer : Failed to load tile at url "${e.content.uri}".`), console.error(u), e.internal.loadingState = We, c.delete(e), r.setLoaded(e, !0), this.dispatchEvent({
          type: "load-error",
          tile: e,
          error: u,
          url: i
        })) : r.remove(e));
      });
  }
}
function vo(o, e, t, s, i, n) {
  let r;
  switch (s) {
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
  let a;
  const l = t * r;
  switch (i) {
    case "BYTE":
      a = new Int8Array(o, e, l);
      break;
    case "UNSIGNED_BYTE":
      a = new Uint8Array(o, e, l);
      break;
    case "SHORT":
      a = new Int16Array(o, e, l);
      break;
    case "UNSIGNED_SHORT":
      a = new Uint16Array(o, e, l);
      break;
    case "INT":
      a = new Int32Array(o, e, l);
      break;
    case "UNSIGNED_INT":
      a = new Uint32Array(o, e, l);
      break;
    case "FLOAT":
      a = new Float32Array(o, e, l);
      break;
    case "DOUBLE":
      a = new Float64Array(o, e, l);
      break;
    default:
      throw new Error(`FeatureTable : Feature component type not provided for "${n}".`);
  }
  return a;
}
let Ts = class {
  constructor(e, t, s, i) {
    this.buffer = e, this.binOffset = t + s, this.binLength = i;
    let n = null;
    if (s !== 0) {
      const r = new Uint8Array(e, t, s);
      n = JSON.parse(Vi(r));
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
    const r = n[e];
    if (r instanceof Object) {
      if (Array.isArray(r))
        return r;
      {
        const { buffer: a, binOffset: l, binLength: c } = this, h = r.byteOffset || 0, A = r.type || i, d = r.componentType || s;
        if ("type" in r && i && r.type !== i)
          throw new Error("FeatureTable: Specified type does not match expected type.");
        const u = l + h, p = vo(a, u, t, A, d, e);
        if (u + p.byteLength > l + c)
          throw new Error("FeatureTable: Feature data read outside binary body length.");
        return p;
      }
    } else return r;
  }
  getBuffer(e, t) {
    const { buffer: s, binOffset: i } = this;
    return s.slice(i + e, i + e + t);
  }
};
class Gc {
  constructor(e) {
    this.batchTable = e;
    const t = e.header.extensions["3DTILES_batch_table_hierarchy"];
    this.classes = t.classes;
    for (const i of this.classes) {
      const n = i.instances;
      for (const r in n)
        i.instances[r] = this._parseProperty(n[r], i.length, r);
    }
    if (this.instancesLength = t.instancesLength, this.classIds = this._parseProperty(t.classIds, this.instancesLength, "classIds"), t.parentCounts ? this.parentCounts = this._parseProperty(t.parentCounts, this.instancesLength, "parentCounts") : this.parentCounts = new Array(this.instancesLength).fill(1), t.parentIds) {
      const i = this.parentCounts.reduce((n, r) => n + r, 0);
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
      const { buffer: i, binOffset: n } = this.batchTable, r = e.byteOffset, a = e.componentType || "UNSIGNED_SHORT", l = n + r;
      return vo(i, l, t, "SCALAR", a, s);
    }
  }
  getDataFromId(e, t = {}) {
    const s = this.parentCounts[e];
    if (this.parentIds && s > 0) {
      let l = 0;
      for (let c = 0; c < e; c++)
        l += this.parentCounts[c];
      for (let c = 0; c < s; c++) {
        const h = this.parentIds[l + c];
        h !== e && this.getDataFromId(h, t);
      }
    }
    const i = this.classIds[e], n = this.classes[i].instances, r = this.classes[i].name, a = this.instancesIds[e];
    for (const l in n)
      t[r] = t[r] || {}, t[r][l] = n[l][a];
    return t;
  }
}
class ji extends Ts {
  get batchSize() {
    return console.warn("BatchTable.batchSize has been deprecated and replaced with BatchTable.count."), this.count;
  }
  constructor(e, t, s, i, n) {
    super(e, s, i, n), this.count = t, this.extensions = {};
    const r = this.header.extensions;
    r && r["3DTILES_batch_table_hierarchy"] && (this.extensions["3DTILES_batch_table_hierarchy"] = new Gc(this));
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
let Nc = class extends _t {
  parse(e) {
    const t = new DataView(e), s = Ze(t);
    console.assert(s === "b3dm");
    const i = t.getUint32(4, !0);
    console.assert(i === 1);
    const n = t.getUint32(8, !0);
    console.assert(n === e.byteLength);
    const r = t.getUint32(12, !0), a = t.getUint32(16, !0), l = t.getUint32(20, !0), c = t.getUint32(24, !0), h = 28, A = e.slice(
      h,
      h + r + a
    ), d = new Ts(
      A,
      0,
      r,
      a
    ), u = h + r + a, p = e.slice(
      u,
      u + l + c
    ), g = new ji(
      p,
      d.getData("BATCH_LENGTH"),
      0,
      l,
      c
    ), m = u + l + c, y = new Uint8Array(e, m, n - m);
    return {
      version: i,
      featureTable: d,
      batchTable: g,
      glbBytes: y
    };
  }
}, Vc = class extends _t {
  parse(e) {
    const t = new DataView(e), s = Ze(t);
    console.assert(s === "i3dm");
    const i = t.getUint32(4, !0);
    console.assert(i === 1);
    const n = t.getUint32(8, !0);
    console.assert(n === e.byteLength);
    const r = t.getUint32(12, !0), a = t.getUint32(16, !0), l = t.getUint32(20, !0), c = t.getUint32(24, !0), h = t.getUint32(28, !0), A = 32, d = e.slice(
      A,
      A + r + a
    ), u = new Ts(
      d,
      0,
      r,
      a
    ), p = A + r + a, g = e.slice(
      p,
      p + l + c
    ), m = new ji(
      g,
      u.getData("INSTANCES_LENGTH"),
      0,
      l,
      c
    ), y = p + l + c, C = new Uint8Array(e, y, n - y);
    let E = null, b = null, I = null;
    if (h)
      E = C, b = Promise.resolve();
    else {
      const S = this.resolveExternalURL(Vi(C));
      I = Oi(S), b = fetch(S, this.fetchOptions).then((w) => {
        if (!w.ok)
          throw new Error(`I3DMLoaderBase : Failed to load file "${S}" with status ${w.status} : ${w.statusText}`);
        return w.arrayBuffer();
      }).then((w) => {
        E = new Uint8Array(w);
      });
    }
    return b.then(() => ({
      version: i,
      featureTable: u,
      batchTable: m,
      glbBytes: E,
      gltfWorkingPath: I
    }));
  }
}, Oc = class extends _t {
  parse(e) {
    const t = new DataView(e), s = Ze(t);
    console.assert(s === "pnts");
    const i = t.getUint32(4, !0);
    console.assert(i === 1);
    const n = t.getUint32(8, !0);
    console.assert(n === e.byteLength);
    const r = t.getUint32(12, !0), a = t.getUint32(16, !0), l = t.getUint32(20, !0), c = t.getUint32(24, !0), h = 28, A = e.slice(
      h,
      h + r + a
    ), d = new Ts(
      A,
      0,
      r,
      a
    ), u = h + r + a, p = e.slice(
      u,
      u + l + c
    ), g = new ji(
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
}, Hc = class extends _t {
  parse(e) {
    const t = new DataView(e), s = Ze(t);
    console.assert(s === "cmpt", 'CMPTLoader: The magic bytes equal "cmpt".');
    const i = t.getUint32(4, !0);
    console.assert(i === 1, 'CMPTLoader: The version listed in the header is "1".');
    const n = t.getUint32(8, !0);
    console.assert(n === e.byteLength, "CMPTLoader: The contents buffer length listed in the header matches the file.");
    const r = t.getUint32(12, !0), a = [];
    let l = 16;
    for (let c = 0; c < r; c++) {
      const h = new DataView(e, l, 12), A = Ze(h), d = h.getUint32(4, !0), u = h.getUint32(8, !0), p = new Uint8Array(e, l, u);
      a.push({
        type: A,
        buffer: p,
        version: d
      }), l += u;
    }
    return {
      version: i,
      tiles: a
    };
  }
};
function qc(o) {
  const { x: e, y: t, z: s } = o;
  o.x = s, o.y = e, o.z = t;
}
function zc(o) {
  return -o + Math.PI / 2;
}
const xn = /* @__PURE__ */ new pi(), Ue = /* @__PURE__ */ new Q(), ne = /* @__PURE__ */ new Q(), Zs = /* @__PURE__ */ new Q(), ge = /* @__PURE__ */ new V(), Ie = /* @__PURE__ */ new V(), Tn = /* @__PURE__ */ new V(), ei = /* @__PURE__ */ new Ft(), re = /* @__PURE__ */ new Ur(), Qn = /* @__PURE__ */ new Q(), Rn = /* @__PURE__ */ new Q(), Ln = /* @__PURE__ */ new Q(), je = /* @__PURE__ */ new Q(), Kt = /* @__PURE__ */ new Es(), jc = 1e-12, Kc = 0.1, Yt = 0, kn = 1, Jt = 2;
let Mo = class {
  constructor(e = 1, t = 1, s = 1) {
    this.name = "", this.radius = new Q(e, t, s);
  }
  intersectRay(e, t) {
    return ge.makeScale(...this.radius).invert(), ei.center.set(0, 0, 0), ei.radius = 1, Kt.copy(e).applyMatrix4(ge), Kt.intersectSphere(ei, t) ? (ge.makeScale(...this.radius), t.applyMatrix4(ge), t) : null;
  }
  // returns a frame with Z indicating altitude, Y pointing north, X pointing east
  getEastNorthUpFrame(e, t, s, i) {
    return s.isMatrix4 && (i = s, s = 0, console.warn('Ellipsoid: The signature for "getEastNorthUpFrame" has changed.')), this.getEastNorthUpAxes(e, t, Qn, Rn, Ln), this.getCartographicToPosition(e, t, s, je), i.makeBasis(Qn, Rn, Ln).setPosition(je);
  }
  // returns a frame with z indicating altitude and az, el, roll rotation within that frame
  // - azimuth: measured off of true north, increasing towards "east" (z-axis)
  // - elevation: measured off of the horizon, increasing towards sky (x-axis)
  // - roll: rotation around northern axis (y-axis)
  getOrientedEastNorthUpFrame(e, t, s, i, n, r, a) {
    return this.getObjectFrame(e, t, s, i, n, r, a, Yt);
  }
  // returns a frame similar to the ENU frame but rotated to match three.js object and camera conventions
  // OBJECT_FRAME: oriented such that "+Y" is up and "+Z" is forward.
  // CAMERA_FRAME: oriented such that "+Y" is up and "-Z" is forward.
  getObjectFrame(e, t, s, i, n, r, a, l = Jt) {
    return this.getEastNorthUpFrame(e, t, s, ge), re.set(n, r, -i, "ZXY"), a.makeRotationFromEuler(re).premultiply(ge), l === kn ? (re.set(Math.PI / 2, 0, 0, "XYZ"), Ie.makeRotationFromEuler(re), a.multiply(Ie)) : l === Jt && (re.set(-Math.PI / 2, 0, Math.PI, "XYZ"), Ie.makeRotationFromEuler(re), a.multiply(Ie)), a;
  }
  getCartographicFromObjectFrame(e, t, s = Jt) {
    return s === kn ? (re.set(-Math.PI / 2, 0, 0, "XYZ"), Ie.makeRotationFromEuler(re).premultiply(e)) : s === Jt ? (re.set(-Math.PI / 2, 0, Math.PI, "XYZ"), Ie.makeRotationFromEuler(re).premultiply(e)) : Ie.copy(e), je.setFromMatrixPosition(Ie), this.getPositionToCartographic(je, t), this.getEastNorthUpFrame(t.lat, t.lon, 0, ge).invert(), Ie.premultiply(ge), re.setFromRotationMatrix(Ie, "ZXY"), t.azimuth = -re.z, t.elevation = re.x, t.roll = re.y, t;
  }
  getEastNorthUpAxes(e, t, s, i, n, r = je) {
    this.getCartographicToPosition(e, t, 0, r), this.getCartographicToNormal(e, t, n), s.set(-r.y, r.x, 0).normalize(), i.crossVectors(n, s).normalize();
  }
  // azimuth: measured off of true north, increasing towards "east"
  // elevation: measured off of the horizon, increasing towards sky
  // roll: rotation around northern axis
  getAzElRollFromRotationMatrix(e, t, s, i, n = Yt) {
    return console.warn('Ellipsoid: "getAzElRollFromRotationMatrix" is deprecated. Use "getCartographicFromObjectFrame", instead.'), this.getCartographicToPosition(e, t, 0, je), Tn.copy(s).setPosition(je), this.getCartographicFromObjectFrame(Tn, i, n), delete i.height, delete i.lat, delete i.lon, i;
  }
  getRotationMatrixFromAzElRoll(e, t, s, i, n, r, a = Yt) {
    return console.warn('Ellipsoid: "getRotationMatrixFromAzElRoll" function has been deprecated. Use "getObjectFrame", instead.'), this.getObjectFrame(e, t, 0, s, i, n, r, a), r.setPosition(0, 0, 0), r;
  }
  getFrame(e, t, s, i, n, r, a, l = Yt) {
    return console.warn('Ellipsoid: "getFrame" function has been deprecated. Use "getObjectFrame", instead.'), this.getObjectFrame(e, t, r, s, i, n, a, l);
  }
  getCartographicToPosition(e, t, s, i) {
    this.getCartographicToNormal(e, t, Ue);
    const n = this.radius;
    ne.copy(Ue), ne.x *= n.x ** 2, ne.y *= n.y ** 2, ne.z *= n.z ** 2;
    const r = Math.sqrt(Ue.dot(ne));
    return ne.divideScalar(r), i.copy(ne).addScaledVector(Ue, s);
  }
  getPositionToCartographic(e, t) {
    this.getPositionToSurfacePoint(e, ne), this.getPositionToNormal(e, Ue);
    const s = Zs.subVectors(e, ne);
    return t.lon = Math.atan2(Ue.y, Ue.x), t.lat = Math.asin(Ue.z), t.height = Math.sign(s.dot(e)) * s.length(), t;
  }
  getCartographicToNormal(e, t, s) {
    return xn.set(1, zc(e), t), s.setFromSpherical(xn).normalize(), qc(s), s;
  }
  getPositionToNormal(e, t) {
    const s = this.radius;
    return t.copy(e), t.x /= s.x ** 2, t.y /= s.y ** 2, t.z /= s.z ** 2, t.normalize(), t;
  }
  getPositionToSurfacePoint(e, t) {
    const s = this.radius, i = 1 / s.x ** 2, n = 1 / s.y ** 2, r = 1 / s.z ** 2, a = e.x * e.x * i, l = e.y * e.y * n, c = e.z * e.z * r, h = a + l + c, A = Math.sqrt(1 / h), d = ne.copy(e).multiplyScalar(A);
    if (h < Kc)
      return isFinite(A) ? t.copy(d) : null;
    const u = Zs.set(
      d.x * i * 2,
      d.y * n * 2,
      d.z * r * 2
    );
    let p = (1 - A) * e.length() / (0.5 * u.length()), g = 0, m, y, C, E, b, I, S, w, v, B, M;
    do {
      p -= g, C = 1 / (1 + p * i), E = 1 / (1 + p * n), b = 1 / (1 + p * r), I = C * C, S = E * E, w = b * b, v = I * C, B = S * E, M = w * b, m = a * I + l * S + c * w - 1, y = a * v * i + l * B * n + c * M * r;
      const x = -2 * y;
      g = m / x;
    } while (Math.abs(m) > jc);
    return t.set(
      e.x * C,
      e.y * E,
      e.z * b
    );
  }
  calculateHorizonDistance(e, t) {
    const s = this.calculateEffectiveRadius(e);
    return Math.sqrt(2 * s * t + t ** 2);
  }
  calculateEffectiveRadius(e) {
    const t = this.radius.x, s = 1 - this.radius.z ** 2 / t ** 2, i = e * gt.DEG2RAD, n = Math.sin(i) ** 2;
    return t / Math.sqrt(1 - s * n);
  }
  getPositionElevation(e) {
    this.getPositionToSurfacePoint(e, ne);
    const t = Zs.subVectors(e, ne);
    return Math.sign(t.dot(e)) * t.length();
  }
  // Returns an estimate of the closest point on the ellipsoid to the ray. Returns
  // the surface intersection if they collide.
  closestPointToRayEstimate(e, t) {
    return this.intersectRay(e, t) ? t : (ge.makeScale(...this.radius).invert(), Kt.copy(e).applyMatrix4(ge), ne.set(0, 0, 0), Kt.closestPointToPoint(ne, t).normalize(), ge.makeScale(...this.radius), t.applyMatrix4(ge));
  }
  copy(e) {
    return this.radius.copy(e.radius), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
};
const Qs = new Mo(Bn, Bn, xc);
Qs.name = "WGS84 Earth";
const Wt = /* @__PURE__ */ new Q(), Xt = /* @__PURE__ */ new Q(), oe = /* @__PURE__ */ new Q(), $t = /* @__PURE__ */ new Es();
let Dn = class {
  constructor(e = new ft(), t = new V()) {
    this.box = e.clone(), this.transform = t.clone(), this.inverseTransform = new V(), this.points = new Array(8).fill().map(() => new Q()), this.planes = new Array(6).fill().map(() => new vr());
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
    return this.clampPoint(e, oe).distanceTo(e);
  }
  containsPoint(e) {
    return oe.copy(e).applyMatrix4(this.inverseTransform), this.box.containsPoint(oe);
  }
  // returns boolean indicating whether the ray has intersected the obb
  intersectsRay(e) {
    return $t.copy(e).applyMatrix4(this.inverseTransform), $t.intersectsBox(this.box);
  }
  // Sets "target" equal to the intersection point.
  // Returns "null" if no intersection found.
  intersectRay(e, t) {
    return $t.copy(e).applyMatrix4(this.inverseTransform), $t.intersectBox(this.box, t) ? (t.applyMatrix4(this.transform), t) : null;
  }
  update() {
    const { points: e, inverseTransform: t, transform: s, box: i } = this;
    t.copy(s).invert();
    const { min: n, max: r } = i;
    let a = 0;
    for (let l = -1; l <= 1; l += 2)
      for (let c = -1; c <= 1; c += 2)
        for (let h = -1; h <= 1; h += 2)
          e[a].set(
            l < 0 ? n.x : r.x,
            c < 0 ? n.y : r.y,
            h < 0 ? n.z : r.z
          ).applyMatrix4(s), a++;
    this.updatePlanes();
  }
  updatePlanes() {
    Wt.copy(this.box.min).applyMatrix4(this.transform), Xt.copy(this.box.max).applyMatrix4(this.transform), oe.set(0, 0, 1).transformDirection(this.transform), this.planes[0].setFromNormalAndCoplanarPoint(oe, Wt), this.planes[1].setFromNormalAndCoplanarPoint(oe, Xt).negate(), oe.set(0, 1, 0).transformDirection(this.transform), this.planes[2].setFromNormalAndCoplanarPoint(oe, Wt), this.planes[3].setFromNormalAndCoplanarPoint(oe, Xt).negate(), oe.set(1, 0, 0).transformDirection(this.transform), this.planes[4].setFromNormalAndCoplanarPoint(oe, Wt), this.planes[5].setFromNormalAndCoplanarPoint(oe, Xt).negate();
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, oe), oe.distanceToSquared(e.center) <= e.radius * e.radius;
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
      const r = e[n];
      let a = -1 / 0;
      for (let l = 0; l < 8; l++) {
        const c = s[l], h = r.distanceToPoint(c);
        a = a < h ? h : a;
      }
      if (a < 0)
        return !1;
    }
    for (let n = 0; n < 6; n++) {
      const r = i[n];
      let a = -1 / 0;
      for (let l = 0; l < 8; l++) {
        const c = t[l], h = r.distanceToPoint(c);
        a = a < h ? h : a;
      }
      if (a < 0)
        return !1;
    }
    return !0;
  }
};
const ti = 1e-13, Qt = Math.PI, si = Qt / 2, yt = /* @__PURE__ */ new Q(), Ke = /* @__PURE__ */ new Q(), be = /* @__PURE__ */ new Q(), k = /* @__PURE__ */ new Q(), te = /* @__PURE__ */ new V(), Yc = /* @__PURE__ */ new ft(), Fn = /* @__PURE__ */ new V();
function Ge(o, e) {
  e.radius = Math.max(e.radius, o.distanceToSquared(e.center));
}
function Pn(o) {
  return o.x !== o.y;
}
let Jc = class extends Mo {
  constructor(e = 1, t = 1, s = 1, i = -si, n = si, r = 0, a = 2 * Qt, l = 0, c = 0) {
    super(e, t, s), this.latStart = i, this.latEnd = n, this.lonStart = r, this.lonEnd = a, this.heightStart = l, this.heightEnd = c;
  }
  getBoundingBox(e, t) {
    Pn(this.radius) && console.warn("EllipsoidRegion: Triaxial ellipsoids are not supported.");
    const {
      latStart: s,
      latEnd: i,
      lonStart: n,
      lonEnd: r,
      heightStart: a,
      heightEnd: l
    } = this, c = (s + i) * 0.5, h = (n + r) * 0.5, A = s > 0, d = i < 0;
    let u;
    A ? u = s : d ? u = i : u = 0;
    const { min: p, max: g } = e;
    p.setScalar(1 / 0), g.setScalar(-1 / 0), r - n <= Qt ? (this.getCartographicToNormal(c, h, be), Ke.set(0, 0, 1), yt.crossVectors(Ke, be).normalize(), Ke.crossVectors(be, yt).normalize(), t.makeBasis(yt, Ke, be), te.copy(t).invert(), this.getCartographicToPosition(u, n, l, k).applyMatrix4(te), g.x = Math.abs(k.x), p.x = -g.x, this.getCartographicToPosition(i, n, l, k).applyMatrix4(te), g.y = k.y, this.getCartographicToPosition(i, h, l, k).applyMatrix4(te), g.y = Math.max(k.y, g.y), this.getCartographicToPosition(s, n, l, k).applyMatrix4(te), p.y = k.y, this.getCartographicToPosition(s, h, l, k).applyMatrix4(te), p.y = Math.min(k.y, p.y), this.getCartographicToPosition(c, h, l, k).applyMatrix4(te), g.z = k.z, this.getCartographicToPosition(s, n, a, k).applyMatrix4(te), p.z = k.z, this.getCartographicToPosition(i, n, a, k).applyMatrix4(te), p.z = Math.min(k.z, p.z)) : (this.getCartographicToPosition(u, h, l, be), be.z = 0, be.length() < 1e-10 ? be.set(1, 0, 0) : be.normalize(), Ke.set(0, 0, 1), yt.crossVectors(be, Ke).normalize(), t.makeBasis(yt, Ke, be), te.copy(t).invert(), this.getCartographicToPosition(u, h + si, l, k).applyMatrix4(te), g.x = Math.abs(k.x), p.x = -g.x, this.getCartographicToPosition(i, 0, d ? a : l, k).applyMatrix4(te), g.y = k.y, this.getCartographicToPosition(s, 0, A ? a : l, k).applyMatrix4(te), p.y = k.y, this.getCartographicToPosition(u, h, l, k).applyMatrix4(te), g.z = k.z, this.getCartographicToPosition(u, r, l, k).applyMatrix4(te), p.z = k.z), e.getCenter(k), e.min.sub(k).multiplyScalar(1 + ti), e.max.sub(k).multiplyScalar(1 + ti), k.applyMatrix4(t), t.setPosition(k);
  }
  getBoundingSphere(e) {
    Pn(this.radius) && console.warn("EllipsoidRegion: Triaxial ellipsoids are not supported."), this.getBoundingBox(Yc, Fn), e.center.setFromMatrixPosition(Fn), e.radius = 0;
    const {
      latStart: t,
      latEnd: s,
      lonStart: i,
      lonEnd: n,
      heightStart: r,
      heightEnd: a
    } = this, l = (t + s) * 0.5, c = (i + n) * 0.5, h = t > 0, A = s < 0;
    let d;
    h ? d = t : A ? d = s : d = 0, this.getCartographicToPosition(d, i, a, k), Ge(k, e), this.getCartographicToPosition(s, i, a, k), Ge(k, e), this.getCartographicToPosition(s, c, a, k), Ge(k, e), this.getCartographicToPosition(t, i, a, k), Ge(k, e), this.getCartographicToPosition(t, c, a, k), Ge(k, e), this.getCartographicToPosition(l, c, a, k), Ge(k, e), this.getCartographicToPosition(t, i, r, k), Ge(k, e), n - i > Qt && (this.getCartographicToPosition(d, c + Qt, a, k), Ge(k, e)), e.radius = Math.sqrt(e.radius) * (1 + ti);
  }
};
function Wc(o) {
  if (!o)
    return 0;
  const { format: e, type: t, image: s } = o, { width: i, height: n } = s;
  let r = Na.getByteLength(i, n, e, t);
  return r *= o.generateMipmaps ? 4 / 3 : 1, r;
}
function Xc(o) {
  const e = /* @__PURE__ */ new Set();
  let t = 0;
  return o.traverse((s) => {
    if (s.geometry && !e.has(s.geometry) && (t += fl(s.geometry), e.add(s.geometry)), s.material) {
      const i = s.material;
      for (const n in i) {
        const r = i[n];
        r && r.isTexture && !e.has(r) && (t += Wc(r), e.add(r));
      }
    }
  }), t;
}
class xo extends Nc {
  constructor(e = vs) {
    super(), this.manager = e, this.adjustmentTransform = new V();
  }
  parse(e) {
    const t = super.parse(e), s = t.glbBytes.slice().buffer;
    return new Promise((i, n) => {
      const r = this.manager, a = this.fetchOptions, l = r.getHandler("path.gltf") || new tt(r);
      a.credentials === "include" && a.mode === "cors" && l.setCrossOrigin("use-credentials"), "credentials" in a && l.setWithCredentials(a.credentials === "include"), a.headers && l.setRequestHeader(a.headers);
      let c = this.workingPath;
      !/[\\/]$/.test(c) && c.length && (c += "/");
      const h = this.adjustmentTransform;
      l.parse(s, c, (A) => {
        const { batchTable: d, featureTable: u } = t, { scene: p } = A, g = u.getData("RTC_CENTER", 1, "FLOAT", "VEC3");
        g && (p.position.x += g[0], p.position.y += g[1], p.position.z += g[2]), A.scene.updateMatrix(), A.scene.matrix.multiply(h), A.scene.matrix.decompose(A.scene.position, A.scene.quaternion, A.scene.scale), A.batchTable = d, A.featureTable = u, p.batchTable = d, p.featureTable = u, i(A);
      }, n);
    });
  }
}
function $c(o) {
  const e = o >> 11, t = o >> 5 & 63, s = o & 31, i = Math.round(e / 31 * 255), n = Math.round(t / 63 * 255), r = Math.round(s / 31 * 255);
  return [i, n, r];
}
const Et = /* @__PURE__ */ new U();
function Zc(o, e, t = new Q()) {
  Et.set(o, e).divideScalar(256).multiplyScalar(2).subScalar(1), t.set(Et.x, Et.y, 1 - Math.abs(Et.x) - Math.abs(Et.y));
  const s = gt.clamp(-t.z, 0, 1);
  return t.x >= 0 ? t.setX(t.x - s) : t.setX(t.x + s), t.y >= 0 ? t.setY(t.y - s) : t.setY(t.y + s), t.normalize(), t;
}
const _n = {
  RGB: "color",
  POSITION: "position"
};
class To extends Oc {
  constructor(e = vs) {
    super(), this.manager = e;
  }
  parse(e) {
    return super.parse(e).then(async (t) => {
      const { featureTable: s, batchTable: i } = t, n = new Tr(), r = s.header.extensions, a = new Q();
      let l;
      if (r && r["3DTILES_draco_point_compression"]) {
        const { byteOffset: A, byteLength: d, properties: u } = r["3DTILES_draco_point_compression"], p = this.manager.getHandler("draco.drc");
        if (p == null)
          throw new Error("PNTSLoader: dracoLoader not available.");
        const g = {};
        for (const C in u)
          if (C in _n && C in u) {
            const E = _n[C];
            g[E] = u[C];
          }
        const m = {
          attributeIDs: g,
          attributeTypes: {
            position: "Float32Array",
            color: "Uint8Array"
          },
          useUniqueIDs: !0
        }, y = s.getBuffer(A, d);
        l = await p.decodeGeometry(y, m), l.attributes.color && (n.vertexColors = !0);
      } else {
        const A = s.getData("POINTS_LENGTH"), d = s.getData("POSITION", A, "FLOAT", "VEC3"), u = s.getData("NORMAL", A, "FLOAT", "VEC3"), p = s.getData("NORMAL", A, "UNSIGNED_BYTE", "VEC2"), g = s.getData("RGB", A, "UNSIGNED_BYTE", "VEC3"), m = s.getData("RGBA", A, "UNSIGNED_BYTE", "VEC4"), y = s.getData("RGB565", A, "UNSIGNED_SHORT", "SCALAR"), C = s.getData("CONSTANT_RGBA", A, "UNSIGNED_BYTE", "VEC4"), E = s.getData("POSITION_QUANTIZED", A, "UNSIGNED_SHORT", "VEC3"), b = s.getData("QUANTIZED_VOLUME_SCALE", A, "FLOAT", "VEC3"), I = s.getData("QUANTIZED_VOLUME_OFFSET", A, "FLOAT", "VEC3");
        if (l = new Bs(), E) {
          const S = new Float32Array(A * 3);
          for (let w = 0; w < A; w++)
            for (let v = 0; v < 3; v++) {
              const B = 3 * w + v;
              S[B] = E[B] / 65535 * b[v];
            }
          a.x = I[0], a.y = I[1], a.z = I[2], l.setAttribute("position", new me(S, 3, !1));
        } else
          l.setAttribute("position", new me(d, 3, !1));
        if (u !== null)
          l.setAttribute("normal", new me(u, 3, !1));
        else if (p !== null) {
          const S = new Float32Array(A * 3), w = new Q();
          for (let v = 0; v < A; v++) {
            const B = p[v * 2], M = p[v * 2 + 1], x = Zc(B, M, w);
            S[v * 3] = x.x, S[v * 3 + 1] = x.y, S[v * 3 + 2] = x.z;
          }
          l.setAttribute("normal", new me(S, 3, !1));
        }
        if (m !== null)
          l.setAttribute("color", new me(m, 4, !0)), n.vertexColors = !0, n.transparent = !0, n.depthWrite = !1;
        else if (g !== null)
          l.setAttribute("color", new me(g, 3, !0)), n.vertexColors = !0;
        else if (y !== null) {
          const S = new Uint8Array(A * 3);
          for (let w = 0; w < A; w++) {
            const v = $c(y[w]);
            for (let B = 0; B < 3; B++) {
              const M = 3 * w + B;
              S[M] = v[B];
            }
          }
          l.setAttribute("color", new me(S, 3, !0)), n.vertexColors = !0;
        } else if (C !== null) {
          const S = new se(C[0], C[1], C[2]);
          n.color = S;
          const w = C[3] / 255;
          w < 1 && (n.opacity = w, n.transparent = !0, n.depthWrite = !1);
        }
      }
      const c = new Rr(l, n);
      c.position.copy(a), t.scene = c, t.scene.featureTable = s, t.scene.batchTable = i;
      const h = s.getData("RTC_CENTER", 1, "FLOAT", "VEC3");
      return h && (t.scene.position.x += h[0], t.scene.position.y += h[1], t.scene.position.z += h[2]), t;
    });
  }
}
const Zt = /* @__PURE__ */ new Q(), it = /* @__PURE__ */ new Q(), nt = /* @__PURE__ */ new Q(), ii = /* @__PURE__ */ new Q(), es = /* @__PURE__ */ new dt(), ts = /* @__PURE__ */ new Q(), rt = /* @__PURE__ */ new V(), Un = /* @__PURE__ */ new V(), Gn = /* @__PURE__ */ new Q(), Nn = /* @__PURE__ */ new V(), ni = /* @__PURE__ */ new dt(), ri = {};
function Vn(o, e, t, s) {
  if (o = o / t * 2 - 1, e = e / t * 2 - 1, s.x = o, s.y = e, s.z = 1 - Math.abs(o) - Math.abs(e), s.z < 0) {
    const i = s.x;
    s.x = (1 - Math.abs(s.y)) * (i >= 0 ? 1 : -1), s.y = (1 - Math.abs(i)) * (s.y >= 0 ? 1 : -1);
  }
  return s.normalize(), s;
}
class Qo extends Vc {
  constructor(e = vs) {
    super(), this.manager = e, this.adjustmentTransform = new V(), this.ellipsoid = Qs.clone();
  }
  resolveExternalURL(e) {
    return this.manager.resolveURL(super.resolveExternalURL(e));
  }
  parse(e) {
    return super.parse(e).then((t) => {
      const { featureTable: s, batchTable: i } = t, n = t.glbBytes.slice().buffer;
      return new Promise((r, a) => {
        const l = this.fetchOptions, c = this.manager, h = c.getHandler("path.gltf") || new tt(c);
        l.credentials === "include" && l.mode === "cors" && h.setCrossOrigin("use-credentials"), "credentials" in l && h.setWithCredentials(l.credentials === "include"), l.headers && h.setRequestHeader(l.headers);
        let A = t.gltfWorkingPath ?? this.workingPath;
        /[\\/]$/.test(A) || (A += "/");
        const d = this.adjustmentTransform;
        h.parse(n, A, (u) => {
          const p = s.getData("INSTANCES_LENGTH");
          let g = s.getData("POSITION", p, "FLOAT", "VEC3");
          const m = s.getData("POSITION_QUANTIZED", p, "UNSIGNED_SHORT", "VEC3"), y = s.getData("QUANTIZED_VOLUME_OFFSET", 1, "FLOAT", "VEC3"), C = s.getData("QUANTIZED_VOLUME_SCALE", 1, "FLOAT", "VEC3"), E = s.getData("NORMAL_UP", p, "FLOAT", "VEC3"), b = s.getData("NORMAL_RIGHT", p, "FLOAT", "VEC3"), I = s.getData("NORMAL_UP_OCT32P", p, "UNSIGNED_SHORT", "VEC2"), S = s.getData("NORMAL_RIGHT_OCT32P", p, "UNSIGNED_SHORT", "VEC2"), w = s.getData("SCALE_NON_UNIFORM", p, "FLOAT", "VEC3"), v = s.getData("SCALE", p, "FLOAT", "SCALAR"), B = s.getData("RTC_CENTER", 1, "FLOAT", "VEC3"), M = s.getData("EAST_NORTH_UP");
          if (!g && m) {
            g = new Float32Array(p * 3);
            for (let T = 0; T < p; T++)
              g[T * 3 + 0] = y[0] + m[T * 3 + 0] / 65535 * C[0], g[T * 3 + 1] = y[1] + m[T * 3 + 1] / 65535 * C[1], g[T * 3 + 2] = y[2] + m[T * 3 + 2] / 65535 * C[2];
          }
          const x = new Q();
          for (let T = 0; T < p; T++)
            x.x += g[T * 3 + 0] / p, x.y += g[T * 3 + 1] / p, x.z += g[T * 3 + 2] / p;
          const R = [], P = [];
          u.scene.updateMatrixWorld(), u.scene.traverse((T) => {
            if (T.isMesh) {
              P.push(T);
              const { geometry: N, material: F } = T, L = new _i(N, F, p);
              L.position.copy(x), B && (L.position.x += B[0], L.position.y += B[1], L.position.z += B[2]), R.push(L);
            }
          });
          for (let T = 0; T < p; T++) {
            ii.set(
              g[T * 3 + 0] - x.x,
              g[T * 3 + 1] - x.y,
              g[T * 3 + 2] - x.z
            ), es.identity(), E && b ? (it.set(
              E[T * 3 + 0],
              E[T * 3 + 1],
              E[T * 3 + 2]
            ), nt.set(
              b[T * 3 + 0],
              b[T * 3 + 1],
              b[T * 3 + 2]
            ), Zt.crossVectors(nt, it).normalize(), rt.makeBasis(
              nt,
              it,
              Zt
            ), es.setFromRotationMatrix(rt)) : I && S && (Vn(
              I[T * 2 + 0],
              I[T * 2 + 1],
              65535,
              it
            ), Vn(
              S[T * 2 + 0],
              S[T * 2 + 1],
              65535,
              nt
            ), Zt.crossVectors(nt, it).normalize(), rt.makeBasis(
              nt,
              it,
              Zt
            ), es.setFromRotationMatrix(rt)), ts.set(1, 1, 1), w && ts.set(
              w[T * 3 + 0],
              w[T * 3 + 1],
              w[T * 3 + 2]
            ), v && ts.multiplyScalar(v[T]);
            for (let N = 0, F = R.length; N < F; N++) {
              const L = R[N];
              ni.copy(es), M && (L.updateMatrixWorld(), Gn.copy(ii).applyMatrix4(L.matrixWorld), this.ellipsoid.getPositionToCartographic(Gn, ri), this.ellipsoid.getEastNorthUpFrame(ri.lat, ri.lon, Nn), ni.setFromRotationMatrix(Nn)), rt.compose(ii, ni, ts).multiply(d);
              const _ = P[N];
              Un.multiplyMatrices(rt, _.matrixWorld), L.setMatrixAt(T, Un);
            }
          }
          u.scene.clear(), u.scene.add(...R), u.batchTable = i, u.featureTable = s, u.scene.batchTable = i, u.scene.featureTable = s, r(u);
        }, a);
      });
    });
  }
}
class eh extends Hc {
  constructor(e = vs) {
    super(), this.manager = e, this.adjustmentTransform = new V(), this.ellipsoid = Qs.clone();
  }
  parse(e) {
    const t = super.parse(e), { manager: s, ellipsoid: i, adjustmentTransform: n } = this, r = [];
    for (const a in t.tiles) {
      const { type: l, buffer: c } = t.tiles[a];
      switch (l) {
        case "b3dm": {
          const h = c.slice(), A = new xo(s);
          A.workingPath = this.workingPath, A.fetchOptions = this.fetchOptions, A.adjustmentTransform.copy(n);
          const d = A.parse(h.buffer);
          r.push(d);
          break;
        }
        case "pnts": {
          const h = c.slice(), A = new To(s);
          A.workingPath = this.workingPath, A.fetchOptions = this.fetchOptions;
          const d = A.parse(h.buffer);
          r.push(d);
          break;
        }
        case "i3dm": {
          const h = c.slice(), A = new Qo(s);
          A.workingPath = this.workingPath, A.fetchOptions = this.fetchOptions, A.ellipsoid.copy(i), A.adjustmentTransform.copy(n);
          const d = A.parse(h.buffer);
          r.push(d);
          break;
        }
      }
    }
    return Promise.all(r).then((a) => {
      const l = new ht();
      return a.forEach((c) => {
        l.add(c.scene);
      }), {
        tiles: a,
        scene: l
      };
    });
  }
}
const It = /* @__PURE__ */ new V();
class th extends ht {
  constructor(e) {
    super(), this.isTilesGroup = !0, this.name = "TilesRenderer.TilesGroup", this.tilesRenderer = e, this.matrixWorldInverse = new V();
  }
  raycast(e, t) {
    return this.tilesRenderer.optimizeRaycast ? (this.tilesRenderer.raycast(e, t), !1) : !0;
  }
  updateMatrixWorld(e) {
    if (this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldNeedsUpdate || e) {
      this.parent === null ? It.copy(this.matrix) : It.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1;
      const t = It.elements, s = this.matrixWorld.elements;
      let i = !1;
      for (let n = 0; n < 16; n++) {
        const r = t[n], a = s[n];
        if (Math.abs(r - a) > Number.EPSILON) {
          i = !0;
          break;
        }
      }
      if (i) {
        this.matrixWorld.copy(It), this.matrixWorldInverse.copy(It).invert();
        const n = this.children;
        for (let r = 0, a = n.length; r < a; r++)
          n[r].updateMatrixWorld();
      }
    }
  }
  updateWorldMatrix(e, t) {
    this.parent && e && this.parent.updateWorldMatrix(e, !1), this.updateMatrixWorld(!0);
  }
}
const Ro = /* @__PURE__ */ new Es(), oi = /* @__PURE__ */ new Q(), ss = [];
function Lo(o, e) {
  return o.distance - e.distance;
}
function ko(o, e, t, s) {
  const { scene: i } = o.engineData;
  t.invokeOnePlugin((n) => n.raycastTile && n.raycastTile(o, i, e, s)) || e.intersectObject(i, !0, s);
}
function sh(o, e, t) {
  ko(o, e, t, ss), ss.sort(Lo);
  const s = ss[0] || null;
  return ss.length = 0, s;
}
function Do(o) {
  return "traversal" in o;
}
function Fo(o, e, t, s = null) {
  const { group: i, activeTiles: n } = o;
  s === null && (s = Ro, s.copy(t.ray).applyMatrix4(i.matrixWorldInverse));
  const r = [], a = e.children;
  for (let h = 0, A = a.length; h < A; h++) {
    const d = a[h];
    !Do(d) || !d.traversal.used || d.engineData.boundingVolume.intersectRay(s, oi) !== null && (oi.applyMatrix4(i.matrixWorld), r.push({
      distance: oi.distanceToSquared(t.ray.origin),
      tile: d
    }));
  }
  r.sort(Lo);
  let l = null, c = 1 / 0;
  if (n.has(e)) {
    const h = sh(e, t, o);
    h && (l = h, c = h.distance * h.distance);
  }
  for (let h = 0, A = r.length; h < A; h++) {
    const d = r[h], u = d.distance, p = d.tile;
    if (u > c)
      break;
    const g = Fo(o, p, t, s);
    if (g) {
      const m = g.distance * g.distance;
      m < c && (l = g, c = m);
    }
  }
  return l;
}
function Po(o, e, t, s, i = null) {
  if (!Do(e))
    return;
  const { group: n, activeTiles: r } = o, { boundingVolume: a } = e.engineData;
  if (i === null && (i = Ro, i.copy(t.ray).applyMatrix4(n.matrixWorldInverse)), !e.traversal.used || !a.intersectsRay(i))
    return;
  r.has(e) && ko(e, t, o, s);
  const l = e.children;
  for (let c = 0, h = l.length; c < h; c++)
    Po(o, l[c], t, s, i);
}
const xe = /* @__PURE__ */ new Q(), Te = /* @__PURE__ */ new Q(), Qe = /* @__PURE__ */ new Q(), On = /* @__PURE__ */ new Q(), Hn = /* @__PURE__ */ new Q();
class ih {
  constructor() {
    this.sphere = null, this.obb = null, this.region = null, this.regionObb = null;
  }
  intersectsRay(e) {
    const t = this.sphere, s = this.obb || this.regionObb;
    return !(t && !e.intersectsSphere(t) || s && !s.intersectsRay(e));
  }
  intersectRay(e, t = null) {
    const s = this.sphere, i = this.obb || this.regionObb;
    let n = -1 / 0, r = -1 / 0;
    s && e.intersectSphere(s, On) && (n = s.containsPoint(e.origin) ? 0 : e.origin.distanceToSquared(On)), i && i.intersectRay(e, Hn) && (r = i.containsPoint(e.origin) ? 0 : e.origin.distanceToSquared(Hn));
    const a = Math.max(n, r);
    return a === -1 / 0 ? null : (e.at(Math.sqrt(a), t), t);
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
    const s = new Dn();
    xe.set(e[3], e[4], e[5]), Te.set(e[6], e[7], e[8]), Qe.set(e[9], e[10], e[11]);
    const i = xe.length(), n = Te.length(), r = Qe.length();
    xe.normalize(), Te.normalize(), Qe.normalize(), i === 0 && xe.crossVectors(Te, Qe), n === 0 && Te.crossVectors(xe, Qe), r === 0 && Qe.crossVectors(xe, Te), s.transform.set(
      xe.x,
      Te.x,
      Qe.x,
      e[0],
      xe.y,
      Te.y,
      Qe.y,
      e[1],
      xe.z,
      Te.z,
      Qe.z,
      e[2],
      0,
      0,
      0,
      1
    ).premultiply(t), s.box.min.set(-i, -n, -r), s.box.max.set(i, n, r), s.update(), this.obb = s;
  }
  setSphereData(e, t, s, i, n) {
    const r = new Ft();
    r.center.set(e, t, s), r.radius = i, r.applyMatrix4(n), this.sphere = r;
  }
  setRegionData(e, t, s, i, n, r, a) {
    const l = new Jc(
      ...e.radius,
      s,
      n,
      t,
      i,
      r,
      a
    ), c = new Dn();
    l.getBoundingBox(c.box, c.transform), c.update(), this.region = l, this.regionObb = c;
  }
}
const nh = /* @__PURE__ */ new Gr();
function rh(o, e, t, s) {
  const i = nh.set(
    o.normal.x,
    o.normal.y,
    o.normal.z,
    e.normal.x,
    e.normal.y,
    e.normal.z,
    t.normal.x,
    t.normal.y,
    t.normal.z
  );
  return s.set(-o.constant, -e.constant, -t.constant), s.applyMatrix3(i.invert()), s;
}
class oh extends Oa {
  constructor() {
    super(), this.points = Array(8).fill().map(() => new Q());
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
      rh(s[0], s[1], s[2], t[i]);
    });
  }
}
const qn = /* @__PURE__ */ new V(), zn = /* @__PURE__ */ new Ur(), _o = Symbol("INITIAL_FRUSTUM_CULLED"), is = /* @__PURE__ */ new V(), wt = /* @__PURE__ */ new Q(), ai = /* @__PURE__ */ new U(), ah = /* @__PURE__ */ new Q(1, 0, 0), lh = /* @__PURE__ */ new Q(0, 1, 0);
function jn(o, e) {
  o.traverse((t) => {
    t.frustumCulled = t[_o] && e;
  });
}
let ch = class extends Uc {
  get autoDisableRendererCulling() {
    return this._autoDisableRendererCulling;
  }
  set autoDisableRendererCulling(e) {
    this._autoDisableRendererCulling !== e && (super._autoDisableRendererCulling = e, this.forEachLoadedModel((t) => {
      jn(t, !e);
    }));
  }
  get optimizeRaycast() {
    return this._optimizeRaycast;
  }
  set optimizeRaycast(e) {
    console.warn('TilesRenderer: The "optimizeRaycast" option has been deprecated.'), this._optimizeRaycast = e;
  }
  constructor(...e) {
    super(...e), this.group = new th(this), this.ellipsoid = Qs.clone(), this.cameras = [], this.cameraMap = /* @__PURE__ */ new Map(), this.cameraInfo = [], this._optimizeRaycast = !0, this._upRotationMatrix = new V(), this._bytesUsed = /* @__PURE__ */ new WeakMap(), this._autoDisableRendererCulling = !0, this.manager = new Va(), this._listeners = {};
  }
  addEventListener(e, t) {
    e === "load-tile-set" && (console.warn('TilesRenderer: "load-tile-set" event has been deprecated. Use "load-tileset" instead.'), e = "load-tileset"), Vt.prototype.addEventListener.call(this, e, t);
  }
  hasEventListener(e, t) {
    return e === "load-tile-set" && (console.warn('TilesRenderer: "load-tile-set" event has been deprecated. Use "load-tileset" instead.'), e = "load-tileset"), Vt.prototype.hasEventListener.call(this, e, t);
  }
  removeEventListener(e, t) {
    e === "load-tile-set" && (console.warn('TilesRenderer: "load-tile-set" event has been deprecated. Use "load-tileset" instead.'), e = "load-tileset"), Vt.prototype.removeEventListener.call(this, e, t);
  }
  dispatchEvent(e) {
    "tileset" in e && Object.defineProperty(e, "tileSet", {
      get() {
        return console.warn('TilesRenderer: "event.tileSet" has been deprecated. Use "event.tileset" instead.'), e.tileset;
      },
      enumerable: !1,
      configurable: !0
    }), Vt.prototype.dispatchEvent.call(this, e);
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
        const s = Fo(this, this.root, e);
        s && t.push(s);
      } else
        Po(this, this.root, e, t);
  }
  hasCamera(e) {
    return this.cameraMap.has(e);
  }
  setCamera(e) {
    const t = this.cameras, s = this.cameraMap;
    return s.has(e) ? !1 : (s.set(e, new U()), t.push(e), this.dispatchEvent({ type: "add-camera", camera: e }), !0);
  }
  setResolution(e, t, s) {
    const i = this.cameraMap;
    if (!i.has(e))
      return !1;
    const n = t.isVector2 ? t.x : t, r = t.isVector2 ? t.y : s, a = i.get(e);
    return (a.width !== n || a.height !== r) && (a.set(n, r), this.dispatchEvent({ type: "camera-resolution-change" })), !0;
  }
  setResolutionFromRenderer(e, t) {
    return t.getSize(ai), this.setResolution(e, ai.x, ai.y);
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
          this._upRotationMatrix.makeRotationAxis(lh, -Math.PI / 2);
          break;
        case "y":
          this._upRotationMatrix.makeRotationAxis(ah, Math.PI / 2);
          break;
      }
      if ("3DTILES_ellipsoid" in i) {
        const n = i["3DTILES_ellipsoid"], { ellipsoid: r } = this;
        r.name = n.body, n.radii ? r.radius.set(...n.radii) : r.radius.set(1, 1, 1);
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
        frustum: new oh(),
        isOrthographic: !1,
        sseDenominator: -1,
        // used if isOrthographic:false
        position: new Q(),
        invScale: -1,
        pixelSize: 0
        // used if isOrthographic:true
      });
    wt.setFromMatrixScale(e.matrixWorldInverse), Math.abs(Math.max(wt.x - wt.y, wt.x - wt.z)) > 1e-6 && console.warn("ThreeTilesRenderer : Non uniform scale used for tile which may cause issues when calculating screen space error.");
    for (let n = 0, r = i.length; n < r; n++) {
      const a = t[n], l = i[n], c = l.frustum, h = l.position, A = s.get(a);
      (A.width === 0 || A.height === 0) && console.warn("TilesRenderer: resolution for camera error calculation is not set.");
      const d = a.projectionMatrix.elements;
      if (l.isOrthographic = d[15] === 1, l.isOrthographic) {
        const u = 2 / d[0], p = 2 / d[5];
        l.pixelSize = Math.max(p / A.height, u / A.width);
      } else
        l.sseDenominator = 2 / d[5] / A.height;
      is.copy(e.matrixWorld), is.premultiply(a.matrixWorldInverse), is.premultiply(a.projectionMatrix), c.setFromProjectionMatrix(is), h.set(0, 0, 0), h.applyMatrix4(a.matrixWorld), h.applyMatrix4(e.matrixWorldInverse);
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
    const i = new V();
    if (e.transform) {
      const a = e.transform;
      for (let l = 0; l < 16; l++)
        i.elements[l] = a[l];
    }
    s && i.premultiply(s.engineData.transform);
    const n = new V().copy(i).invert(), r = new ih();
    "sphere" in e.boundingVolume && r.setSphereData(...e.boundingVolume.sphere, i), "box" in e.boundingVolume && r.setObbData(e.boundingVolume.box, i), "region" in e.boundingVolume && r.setRegionData(this.ellipsoid, ...e.boundingVolume.region), e.engineData.transform = i, e.engineData.transformInverse = n, e.engineData.boundingVolume = r, e.engineData.geometry = null, e.engineData.materials = null, e.engineData.textures = null;
  }
  async parseTile(e, t, s, i, n) {
    const r = t.engineData, a = Oi(i), l = this.fetchOptions, c = this.manager;
    let h = null;
    const A = r.transform, d = this._upRotationMatrix, u = (Ze(e) || s).toLowerCase();
    switch (u) {
      case "b3dm": {
        const b = new xo(c);
        b.workingPath = a, b.fetchOptions = l, b.adjustmentTransform.copy(d), h = b.parse(e);
        break;
      }
      case "pnts": {
        const b = new To(c);
        b.workingPath = a, b.fetchOptions = l, h = b.parse(e);
        break;
      }
      case "i3dm": {
        const b = new Qo(c);
        b.workingPath = a, b.fetchOptions = l, b.adjustmentTransform.copy(d), b.ellipsoid.copy(this.ellipsoid), h = b.parse(e);
        break;
      }
      case "cmpt": {
        const b = new eh(c);
        b.workingPath = a, b.fetchOptions = l, b.adjustmentTransform.copy(d), b.ellipsoid.copy(this.ellipsoid), h = b.parse(e).then((I) => I.scene);
        break;
      }
      // 3DTILES_content_gltf
      case "gltf":
      case "glb": {
        const b = c.getHandler("path.gltf") || c.getHandler("path.glb") || new tt(c);
        b.setWithCredentials(l.credentials === "include"), b.setRequestHeader(l.headers || {}), l.credentials === "include" && l.mode === "cors" && b.setCrossOrigin("use-credentials");
        let I = b.resourcePath || b.path || a;
        !/[\\/]$/.test(I) && I.length && (I += "/"), h = b.parseAsync(e, I).then((S) => {
          S.scene = S.scene || new ht();
          const { scene: w } = S;
          return w.updateMatrix(), w.matrix.multiply(d).decompose(w.position, w.quaternion, w.scale), S;
        });
        break;
      }
      default: {
        h = this.invokeOnePlugin((b) => b.parseToMesh && b.parseToMesh(e, t, s, i, n));
        break;
      }
    }
    const p = await h;
    if (p === null)
      throw new Error(`TilesRenderer: Content type "${u}" not supported.`);
    let g, m;
    p.isObject3D ? (g = p, m = null) : (g = p.scene, m = p), g.updateMatrix(), g.matrix.premultiply(A), g.matrix.decompose(g.position, g.quaternion, g.scale), await this.invokeAllPlugins((b) => b.processTileModel && b.processTileModel(g, t)), g.traverse((b) => {
      b[_o] = b.frustumCulled;
    }), jn(g, !this.autoDisableRendererCulling);
    const y = [], C = [], E = [];
    if (g.traverse((b) => {
      if (b.geometry && C.push(b.geometry), b.material) {
        const I = b.material;
        y.push(b.material);
        for (const S in I) {
          const w = I[S];
          w && w.isTexture && E.push(w);
        }
      }
    }), n.aborted) {
      for (let b = 0, I = E.length; b < I; b++) {
        const S = E[b];
        S.image instanceof ImageBitmap && S.image.close(), S.dispose();
      }
      return;
    }
    r.materials = y, r.geometry = C, r.textures = E, r.scene = g, r.metadata = m;
  }
  disposeTile(e) {
    super.disposeTile(e);
    const t = e.engineData;
    if (t.scene) {
      const s = t.materials, i = t.geometry, n = t.textures, r = t.scene.parent;
      t.scene.traverse((a) => {
        a.userData.meshFeatures && a.userData.meshFeatures.dispose(), a.userData.structuralMetadata && a.userData.structuralMetadata.dispose();
      });
      for (let a = 0, l = i.length; a < l; a++)
        i[a].dispose();
      for (let a = 0, l = s.length; a < l; a++)
        s[a].dispose();
      for (let a = 0, l = n.length; a < l; a++) {
        const c = n[a];
        c.image instanceof ImageBitmap && c.image.close(), c.dispose();
      }
      r && r.remove(t.scene), t.scene = null, t.materials = null, t.textures = null, t.geometry = null, t.metadata = null;
    }
  }
  setTileVisible(e, t) {
    const s = e.engineData.scene, i = this.group;
    t ? s && (i.add(s), s.updateMatrixWorld(!0)) : s && i.remove(s), super.setTileVisible(e, t);
  }
  calculateBytesUsed(e, t) {
    const s = this._bytesUsed;
    return !s.has(e) && t && s.set(e, Xc(t)), s.get(e) ?? null;
  }
  calculateTileViewError(e, t) {
    const s = e.engineData, i = this.cameras, n = this.cameraInfo, r = s.boundingVolume;
    let a = !1, l = 0, c = 1 / 0, h = 0, A = 1 / 0;
    for (let d = 0, u = i.length; d < u; d++) {
      const p = n[d];
      let g, m;
      if (p.isOrthographic) {
        const C = p.pixelSize;
        g = e.geometricError / C, m = 1 / 0;
      } else {
        const C = p.sseDenominator;
        m = r.distanceToPoint(p.position), g = m === 0 ? 1 / 0 : e.geometricError / (m * C);
      }
      const y = n[d].frustum;
      r.intersectsFrustum(y) && (a = !0, l = Math.max(l, g), c = Math.min(c, m)), h = Math.max(h, g), A = Math.min(A, m);
    }
    a ? (t.inView = !0, t.error = l, t.distanceFromCamera = c) : (t.inView = !1, t.error = h, t.distanceFromCamera = A);
  }
  // adjust the rotation of the group such that Y is altitude, X is North, and Z is East
  setLatLonToYUp(e, t) {
    console.warn("TilesRenderer: setLatLonToYUp is deprecated. Use the ReorientationPlugin, instead.");
    const { ellipsoid: s, group: i } = this;
    zn.set(Math.PI / 2, Math.PI / 2, 0), qn.makeRotationFromEuler(zn), s.getEastNorthUpFrame(e, t, 0, i.matrix).multiply(qn).invert().decompose(
      i.position,
      i.quaternion,
      i.scale
    ), i.updateMatrixWorld(!0);
  }
  dispose() {
    super.dispose(), this.group.removeFromParent();
  }
};
function ps(o) {
  return o.implicitTilingData.root.implicitTiling.subdivisionScheme === "OCTREE";
}
function li(o) {
  return ps(o) ? 8 : 4;
}
function hh(o, e) {
  if (!o)
    return [0, 0, 0];
  const t = o.implicitTilingData.x, s = o.implicitTilingData.y, i = o.implicitTilingData.z, n = 2 * t + e % 2, r = 2 * s + Math.floor(e / 2) % 2, a = ps(o) ? 2 * i + Math.floor(e / 4) % 2 : 0;
  return [n, r, a];
}
class Kn {
  constructor(e, t) {
    this.parent = e, this.children = [], this.geometricError = 0, this.boundingVolume = null;
    const [s, i, n] = hh(e, t);
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
class Ah extends _t {
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
    const i = Ze(t);
    console.assert(i === "subt", 'SUBTREELoader: The magic bytes equal "subt".'), s += 4;
    const n = t.getUint32(s, !0);
    console.assert(n === 1, 'SUBTREELoader: The version listed in the header is "1".'), s += 4;
    const r = t.getUint32(s, !0);
    s += 8;
    const a = t.getUint32(s, !0);
    s += 8;
    const l = JSON.parse(Vi(new Uint8Array(e, s, r)));
    s += r;
    const c = e.slice(s, s + a);
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
    const r = await this.requestActiveBuffers(
      i,
      t.subtreeByte
    ), a = this.parseActiveBufferViews(n, r);
    this.parseAvailability(t, s, a), this.expandSubtree(this.tile, t);
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
    for (let a = 0; a < n.length; a++)
      s = void 0, isNaN(n[a].bitstream) ? isNaN(n[a].bufferView) || (s = t[n[a].bufferView]) : s = t[n[a].bitstream], s && (s.isActive = !0, s.bufferHeader.isActive = !0);
    s = void 0;
    const r = e.childSubtreeAvailability;
    isNaN(r.bitstream) ? isNaN(r.bufferView) || (s = t[r.bufferView]) : s = t[r.bitstream], s && (s.isActive = !0, s.bufferHeader.isActive = !0);
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
    for (let r = 0; r < e.length; r++) {
      const a = e[r];
      if (!a.isActive)
        s.push(Promise.resolve());
      else if (a.isExternal) {
        const l = this.parseImplicitURIBuffer(
          this.tile,
          this.rootTile.implicitTiling.subtrees.uri,
          a.uri
        ), c = fetch(l, this.fetchOptions).then((h) => {
          if (!h.ok)
            throw new Error(`SUBTREELoader: Failed to load external buffer from ${a.uri} with error code ${h.status}.`);
          return h.arrayBuffer();
        }).then((h) => new Uint8Array(h));
        s.push(c);
      } else
        s.push(Promise.resolve(new Uint8Array(t)));
    }
    const i = await Promise.all(s), n = {};
    for (let r = 0; r < i.length; r++) {
      const a = i[r];
      a && (n[r] = a);
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
      const r = n.byteOffset, a = r + n.byteLength, l = t[n.buffer];
      s[i] = l.slice(r, a);
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
    const i = li(this.rootTile), n = this.rootTile.implicitTiling.subtreeLevels, r = (Math.pow(i, n) - 1) / (i - 1), a = Math.pow(i, n);
    e._tileAvailability = this.parseAvailabilityBitstream(
      t.tileAvailability,
      s,
      r
    ), e._contentAvailabilityBitstreams = [];
    for (let l = 0; l < t.contentAvailabilityHeaders.length; l++) {
      const c = this.parseAvailabilityBitstream(
        t.contentAvailabilityHeaders[l],
        s,
        // content availability has the same length as tile availability.
        r
      );
      e._contentAvailabilityBitstreams.push(c);
    }
    e._childSubtreeAvailability = this.parseAvailabilityBitstream(
      t.childSubtreeAvailability,
      s,
      a
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
    const s = Kn.clone(e);
    for (let r = 0; t && r < t._contentAvailabilityBitstreams.length; r++)
      if (t && this.getBit(t._contentAvailabilityBitstreams[r], 0)) {
        s.content = { uri: this.parseImplicitURI(e, this.rootTile.content.uri) };
        break;
      }
    e.children.push(s);
    const i = this.transcodeSubtreeTiles(
      s,
      t
    ), n = this.listChildSubtrees(t, i);
    for (let r = 0; r < n.length; r++) {
      const a = n[r], l = a.tile, c = this.deriveChildTile(
        null,
        l,
        null,
        a.childMortonIndex
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
      const r = li(this.rootTile), a = (Math.pow(r, n) - 1) / (r - 1), l = r * s.length;
      for (let c = 0; c < l; c++) {
        const h = a + c, A = c >> Math.log2(r), d = s[A];
        if (!this.getBit(t._tileAvailability, h)) {
          i.push(void 0);
          continue;
        }
        const u = this.deriveChildTile(
          t,
          d,
          h,
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
    const n = new Kn(t, i);
    n.boundingVolume = this.getTileBoundingVolume(n), n.geometricError = this.getGeometricError(n);
    for (let r = 0; e && r < e._contentAvailabilityBitstreams.length; r++)
      if (e && this.getBit(e._contentAvailabilityBitstreams[r], s)) {
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
      const s = [...this.rootTile.boundingVolume.region], i = s[0], n = s[2], r = s[1], a = s[3], l = (n - i) / Math.pow(2, e.implicitTilingData.level), c = (a - r) / Math.pow(2, e.implicitTilingData.level);
      s[0] = i + l * e.implicitTilingData.x, s[2] = i + l * (e.implicitTilingData.x + 1), s[1] = r + c * e.implicitTilingData.y, s[3] = r + c * (e.implicitTilingData.y + 1);
      for (let h = 0; h < 4; h++) {
        const A = s[h];
        A < -Math.PI ? s[h] += 2 * Math.PI : A > Math.PI && (s[h] -= 2 * Math.PI);
      }
      if (ps(e)) {
        const h = s[4], A = (s[5] - h) / Math.pow(2, e.implicitTilingData.level);
        s[4] = h + A * e.implicitTilingData.z, s[5] = h + A * (e.implicitTilingData.z + 1);
      }
      t.region = s;
    }
    if (this.rootTile.boundingVolume.box) {
      const s = [...this.rootTile.boundingVolume.box], i = 2 ** e.implicitTilingData.level - 1, n = Math.pow(2, -e.implicitTilingData.level), r = ps(e) ? 3 : 2;
      for (let a = 0; a < r; a++) {
        s[3 + a * 3 + 0] *= n, s[3 + a * 3 + 1] *= n, s[3 + a * 3 + 2] *= n;
        const l = s[3 + a * 3 + 0], c = s[3 + a * 3 + 1], h = s[3 + a * 3 + 2], A = a === 0 ? e.implicitTilingData.x : a === 1 ? e.implicitTilingData.y : e.implicitTilingData.z;
        s[0] += 2 * l * (-0.5 * i + A), s[1] += 2 * c * (-0.5 * i + A), s[2] += 2 * h * (-0.5 * i + A);
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
    const s = [], i = li(this.rootTile);
    for (let n = 0; n < t.length; n++) {
      const r = t[n];
      if (r !== void 0)
        for (let a = 0; a < i; a++) {
          const l = n * i + a;
          this.getBit(e._childSubtreeAvailability, l) && s.push({
            tile: r,
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
class dh {
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
      const i = new Ah(t);
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
const uh = new Lr(-1, 1, 1, -1, 0, 1);
class ph extends Bs {
  constructor() {
    super(), this.setAttribute("position", new As([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), this.setAttribute("uv", new As([0, 2, 0, 0, 2, 0], 2));
  }
}
const gh = new ph();
class Uo {
  /**
   * Constructs a new full screen quad.
   *
   * @param {?Material} material - The material to render te full screen quad with.
   */
  constructor(e) {
    this._mesh = new Ss(gh, e);
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
    e.render(this._mesh, uh);
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
function z(o, e, t) {
  return o && e in o ? o[e] : t;
}
function Go(o) {
  return o !== "BOOLEAN" && o !== "STRING" && o !== "ENUM";
}
function fh(o) {
  return /^FLOAT/.test(o);
}
function Gt(o) {
  return /^VEC/.test(o);
}
function Nt(o) {
  return /^MAT/.test(o);
}
function No(o, e, t, s = null) {
  return Nt(t) || Gt(t) ? s.fromArray(o, e) : o[e];
}
function Ti(o) {
  const { type: e, componentType: t } = o;
  switch (e) {
    case "SCALAR":
      return t === "INT64" ? 0n : 0;
    case "VEC2":
      return new U();
    case "VEC3":
      return new Q();
    case "VEC4":
      return new mt();
    case "MAT2":
      return new Ya();
    case "MAT3":
      return new Gr();
    case "MAT4":
      return new V();
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
function Yn(o, e) {
  if (e == null)
    return !1;
  switch (o) {
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
function Dt(o, e = null) {
  switch (o) {
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
function mh(o, e = null) {
  if (o.array) {
    e = e && Array.isArray(e) ? e : [], e.length = o.count;
    for (let t = 0, s = e.length; t < s; t++)
      e[t] = gs(o, e[t]);
  } else
    e = gs(o, e);
  return e;
}
function gs(o, e = null) {
  const t = o.default, s = o.type;
  if (e = e || Ti(o), t === null) {
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
  } else if (Nt(s))
    e.fromArray(t);
  else if (Gt(s))
    e.fromArray(t);
  else
    return t;
}
function bh(o, e) {
  if (o.noData === null)
    return e;
  const t = o.noData, s = o.type;
  if (Array.isArray(e))
    for (let r = 0, a = e.length; r < a; r++)
      e[r] = i(e[r]);
  else
    e = i(e);
  return e;
  function i(r) {
    return n(r) && (r = gs(o, r)), r;
  }
  function n(r) {
    if (Nt(s)) {
      const a = r.elements;
      for (let l = 0, c = t.length; l < c; l++)
        if (t[l] !== a[l])
          return !1;
      return !0;
    } else if (Gt(s)) {
      for (let a = 0, l = t.length; a < l; a++)
        if (t[a] !== r.getComponent(a))
          return !1;
      return !0;
    } else
      return t === r;
  }
}
function Ch(o, e) {
  switch (o) {
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
function yh(o, e) {
  const {
    type: t,
    componentType: s,
    scale: i,
    offset: n,
    normalized: r
  } = o;
  if (Array.isArray(e))
    for (let A = 0, d = e.length; A < d; A++)
      e[A] = a(e[A]);
  else
    e = a(e);
  return e;
  function a(A) {
    return Nt(t) ? A = c(A) : Gt(t) ? A = l(A) : A = h(A), A;
  }
  function l(A) {
    return A.x = h(A.x), A.y = h(A.y), "z" in A && (A.z = h(A.z)), "w" in A && (A.w = h(A.w)), A;
  }
  function c(A) {
    const d = A.elements;
    for (let u = 0, p = d.length; u < p; u++)
      d[u] = h(d[u]);
    return A;
  }
  function h(A) {
    return r && (A = Ch(s, A)), (r || fh(s)) && (A = A * i + n), A;
  }
}
function Ki(o, e, t = null) {
  if (o.array) {
    Array.isArray(e) || (e = new Array(o.count || 0)), e.length = t !== null ? t : o.count;
    for (let s = 0, i = e.length; s < i; s++)
      Yn(o.type, e[s]) || (e[s] = Ti(o));
  } else
    Yn(o.type, e) || (e = Ti(o));
  return e;
}
function fs(o, e) {
  for (const t in e)
    t in o || delete e[t];
  for (const t in o) {
    const s = o[t];
    e[t] = Ki(s, e[t]);
  }
}
function Eh(o) {
  switch (o) {
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
class Rs {
  constructor(e, t, s = null) {
    this.name = t.name || null, this.description = t.description || null, this.type = t.type, this.componentType = t.componentType || null, this.enumType = t.enumType || null, this.array = t.array || !1, this.count = t.count || 0, this.normalized = t.normalized || !1, this.offset = t.offset || 0, this.scale = z(t, "scale", 1), this.max = z(t, "max", 1 / 0), this.min = z(t, "min", -1 / 0), this.required = t.required || !1, this.noData = z(t, "noData", null), this.default = z(t, "default", null), this.semantic = z(t, "semantic", null), this.enumSet = null, this.accessorProperty = s, s && (this.offset = z(s, "offset", this.offset), this.scale = z(s, "scale", this.scale), this.max = z(s, "max", this.max), this.min = z(s, "min", this.min)), t.type === "ENUM" && (this.enumSet = e[this.enumType], this.componentType === null && (this.componentType = z(this.enumSet, "valueType", "UINT16")));
  }
  // shape the given target to match the data type of the property
  // enums are set to their integer value
  shapeToProperty(e, t = null) {
    return Ki(this, e, t);
  }
  // resolve the given object to the default value for the property for a single element
  // enums are set to a default string
  resolveDefaultElement(e) {
    return gs(this, e);
  }
  // resolve the target to the default value for the property for every element if it's an array
  // enums are set to a default string
  resolveDefault(e) {
    return mh(this, e);
  }
  // converts any instances of no data to the default value
  resolveNoData(e) {
    return bh(this, e);
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
      const n = t.values.find((r) => r.value === i);
      return n === null ? "" : n.name;
    }
  }
  // apply scales
  adjustValueScaleOffset(e) {
    return Go(this.type) ? yh(this, e) : e;
  }
}
class Yi {
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
  _initProperties(e = Rs) {
    const t = {};
    for (const s in this.class.properties)
      t[s] = new e(this.enums, this.class.properties[s], this.definition.properties[s]);
    this.properties = t;
  }
}
class Ih extends Rs {
  constructor(e, t, s = null) {
    super(e, t, s), this.attribute = s?.attribute ?? null;
  }
}
class wh extends Yi {
  constructor(...e) {
    super(...e), this.isPropertyAttributeAccessor = !0, this._initProperties(Ih);
  }
  getData(e, t, s = {}) {
    const i = this.properties;
    fs(i, s);
    for (const n in i)
      s[n] = this.getPropertyValue(n, e, t, s[n]);
    return s;
  }
  getPropertyValue(e, t, s, i = null) {
    if (t >= this.count)
      throw new Error("PropertyAttributeAccessor: Requested index is outside the range of the buffer.");
    const n = this.properties[e], r = n.type;
    if (n) {
      if (!this.definition.properties[e])
        return n.resolveDefault(i);
    } else throw new Error("PropertyAttributeAccessor: Requested class property does not exist.");
    i = n.shapeToProperty(i);
    const a = s.getAttribute(n.attribute.toLowerCase());
    if (Nt(r)) {
      const l = i.elements;
      for (let c = 0, h = l.length; c < h; c < h)
        l[c] = a.getComponent(t, c);
    } else if (Gt(r))
      i.fromBufferAttribute(a, t);
    else if (r === "SCALAR" || r === "ENUM")
      i = a.getX(t);
    else
      throw new Error("StructuredMetadata.PropertyAttributeAccessor: BOOLEAN and STRING types are not supported by property attributes.");
    return i = n.adjustValueScaleOffset(i), i = n.resolveEnumsToStrings(i), i = n.resolveNoData(i), i;
  }
}
class Bh extends Rs {
  constructor(e, t, s = null) {
    super(e, t, s), this.values = s?.values ?? null, this.valueLength = Eh(this.type), this.arrayOffsets = z(s, "arrayOffsets", null), this.stringOffsets = z(s, "stringOffsets", null), this.arrayOffsetType = z(s, "arrayOffsetType", "UINT32"), this.stringOffsetType = z(s, "stringOffsetType", "UINT32");
  }
  // returns the necessary array length based on the array offsets if present
  getArrayLengthFromId(e, t) {
    let s = this.count;
    if (this.arrayOffsets !== null) {
      const { arrayOffsets: i, arrayOffsetType: n } = this, r = Dt(n), a = new r(e[i]);
      s = a[t + 1] - a[t];
    }
    return s;
  }
  // returns the index offset into the data buffer for the given id based on the
  // the array offsets if present
  getIndexOffsetFromId(e, t) {
    let s = t;
    if (this.arrayOffsets) {
      const { arrayOffsets: i, arrayOffsetType: n } = this, r = Dt(n);
      s = new r(e[i])[s];
    } else this.array && (s *= this.count);
    return s;
  }
}
class Sh extends Yi {
  constructor(...e) {
    super(...e), this.isPropertyTableAccessor = !0, this.count = this.definition.count, this._initProperties(Bh);
  }
  getData(e, t = {}) {
    const s = this.properties;
    fs(s, t);
    for (const i in s)
      t[i] = this.getPropertyValue(i, e, t[i]);
    return t;
  }
  // reads an individual element
  _readValueAtIndex(e, t, s, i = null) {
    const n = this.properties[e], { componentType: r, type: a } = n, l = this.data, c = l[n.values], h = Dt(r, a), A = new h(c), d = n.getIndexOffsetFromId(l, t);
    if (Go(a) || a === "ENUM")
      return No(A, (d + s) * n.valueLength, a, i);
    if (a === "STRING") {
      let u = d + s, p = 0;
      if (n.stringOffsets !== null) {
        const { stringOffsets: m, stringOffsetType: y } = n, C = Dt(y), E = new C(l[m]);
        p = E[u + 1] - E[u], u = E[u];
      }
      const g = new Uint8Array(A.buffer, u, p);
      i = new TextDecoder().decode(g);
    } else if (a === "BOOLEAN") {
      const u = d + s, p = Math.floor(u / 8), g = u % 8;
      i = (A[p] >> g & 1) === 1;
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
    const n = i.array, r = this.data, a = i.getArrayLengthFromId(r, t);
    if (s = i.shapeToProperty(s, a), n)
      for (let l = 0, c = s.length; l < c; l++)
        s[l] = this._readValueAtIndex(e, t, l, s[l]);
    else
      s = this._readValueAtIndex(e, t, 0, s);
    return s = i.adjustValueScaleOffset(s), s = i.resolveEnumsToStrings(s), s = i.resolveNoData(s), s;
  }
}
const Bt = /* @__PURE__ */ new Ka();
class Jn {
  constructor() {
    this._renderer = new Ha(), this._target = new An(1, 1), this._texTarget = new An(), this._quad = new Uo(new Nr({
      blending: ja,
      blendDst: za,
      blendSrc: qa,
      uniforms: {
        map: { value: null },
        pixel: { value: new U() }
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
    Bt.min.copy(t), Bt.max.copy(t), Bt.max.x += 1, Bt.max.y += 1, i.initRenderTarget(n), i.copyTextureToTexture(e, n.texture, Bt, s, 0);
  }
}
const Ve = /* @__PURE__ */ new class {
  constructor() {
    let o = null;
    Object.getOwnPropertyNames(Jn.prototype).forEach((e) => {
      e !== "constructor" && (this[e] = (...t) => (o = o || new Jn(), o[e](...t)));
    });
  }
}(), Wn = /* @__PURE__ */ new U(), Xn = /* @__PURE__ */ new U(), $n = /* @__PURE__ */ new U();
function vh(o, e) {
  return e === 0 ? o.getAttribute("uv") : o.getAttribute(`uv${e}`);
}
function Vo(o, e, t = new Array(3)) {
  let s = 3 * e, i = 3 * e + 1, n = 3 * e + 2;
  return o.index && (s = o.index.getX(s), i = o.index.getX(i), n = o.index.getX(n)), t[0] = s, t[1] = i, t[2] = n, t;
}
function Oo(o, e, t, s, i) {
  const [n, r, a] = s, l = vh(o, e);
  Wn.fromBufferAttribute(l, n), Xn.fromBufferAttribute(l, r), $n.fromBufferAttribute(l, a), i.set(0, 0, 0).addScaledVector(Wn, t.x).addScaledVector(Xn, t.y).addScaledVector($n, t.z);
}
function Ho(o, e, t, s) {
  const i = o.x - Math.floor(o.x), n = o.y - Math.floor(o.y), r = Math.floor(i * e % e), a = Math.floor(n * t % t);
  return s.set(r, a), s;
}
const Zn = /* @__PURE__ */ new U(), er = /* @__PURE__ */ new U(), tr = /* @__PURE__ */ new U();
class Mh extends Rs {
  constructor(e, t, s = null) {
    super(e, t, s), this.channels = z(s, "channels", [0]), this.index = z(s, "index", null), this.texCoord = z(s, "texCoord", null), this.valueLength = parseInt(this.type.replace(/[^0-9]/g, "")) || 1;
  }
  // takes the buffer to read from and the value index to read
  readDataFromBuffer(e, t, s = null) {
    const i = this.type;
    if (i === "BOOLEAN" || i === "STRING")
      throw new Error("PropertyTextureAccessor: BOOLEAN and STRING types not supported.");
    return No(e, t * this.valueLength, i, s);
  }
}
class xh extends Yi {
  constructor(...e) {
    super(...e), this.isPropertyTextureAccessor = !0, this._asyncRead = !1, this._initProperties(Mh);
  }
  // Reads the full set of property data
  getData(e, t, s, i = {}) {
    const n = this.properties;
    fs(n, i);
    const r = Object.keys(n), a = r.map((l) => i[l]);
    return this.getPropertyValuesAtTexel(r, e, t, s, a), r.forEach((l, c) => i[l] = a[c]), i;
  }
  // Reads the full set of property data asynchronously
  async getDataAsync(e, t, s, i = {}) {
    const n = this.properties;
    fs(n, i);
    const r = Object.keys(n), a = r.map((l) => i[l]);
    return await this.getPropertyValuesAtTexelAsync(r, e, t, s, a), r.forEach((l, c) => i[l] = a[c]), i;
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
    n.length = e.length, Ve.increaseSizeTo(n.length);
    const r = this.data, a = this.definition.properties, l = this.properties, c = Vo(i, t);
    for (let d = 0, u = e.length; d < u; d++) {
      const p = e[d];
      if (!a[p])
        continue;
      const g = l[p], m = r[g.index];
      Oo(i, g.texCoord, s, c, Zn), Ho(Zn, m.image.width, m.image.height, er), tr.set(d, 0), Ve.renderPixelToTarget(m, er, tr);
    }
    const h = new Uint8Array(e.length * 4);
    if (this._asyncRead)
      return Ve.readDataAsync(h).then(() => (A.call(this), n));
    return Ve.readData(h), A.call(this), n;
    function A() {
      for (let d = 0, u = e.length; d < u; d++) {
        const p = e[d], g = l[p], m = g.type;
        if (n[d] = Ki(g, n[d]), g) {
          if (!a[p]) {
            n[d] = g.resolveDefault(n);
            continue;
          }
        } else throw new Error("PropertyTextureAccessor: Requested property does not exist.");
        const y = g.valueLength * (g.count || 1), C = g.channels.map((S) => h[4 * d + S]), E = g.componentType, b = Dt(E, m), I = new b(y);
        if (new Uint8Array(I.buffer).set(C), g.array) {
          const S = n[d];
          for (let w = 0, v = S.length; w < v; w++)
            S[w] = g.readDataFromBuffer(I, w, S[w]);
        } else
          n[d] = g.readDataFromBuffer(I, 0, n[d]);
        n[d] = g.adjustValueScaleOffset(n[d]), n[d] = g.resolveEnumsToStrings(n[d]), n[d] = g.resolveNoData(n[d]);
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
class sr {
  constructor(e, t, s, i = null, n = null) {
    const {
      schema: r,
      propertyTables: a = [],
      propertyTextures: l = [],
      propertyAttributes: c = []
    } = e, { enums: h, classes: A } = r, d = a.map((g) => new Sh(g, A, h, s));
    let u = [], p = [];
    i && (i.propertyTextures && (u = i.propertyTextures.map((g) => new xh(l[g], A, h, t))), i.propertyAttributes && (p = i.propertyAttributes.map((g) => new wh(c[g], A, h)))), this.schema = r, this.tableAccessors = d, this.textureAccessors = u, this.attributeAccessors = p, this.object = n, this.textures = t, this.nodeMetadata = i;
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
        const r = this.tableAccessors[e[n]];
        s[n] = r.getData(t[n], s[n]);
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
      const r = i[n];
      s[n] = r.getData(e, t, this.object.geometry, s[n]);
    }
    return s;
  }
  async getPropertyTextureDataAsync(e, t, s = []) {
    const i = this.textureAccessors;
    s.length = i.length;
    const n = [];
    for (let r = 0; r < i.length; r++) {
      const a = i[r].getDataAsync(e, t, this.object.geometry, s[r]).then((l) => {
        s[r] = l;
      });
      n.push(a);
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
const St = "EXT_structural_metadata";
function Th(o, e = []) {
  var t;
  const s = ((t = o.json.textures) == null ? void 0 : t.length) || 0, i = new Array(s).fill(null);
  return e.forEach(({ properties: n }) => {
    for (const r in n) {
      const { index: a } = n[r];
      i[a] === null && (i[a] = o.loadTexture(a));
    }
  }), Promise.all(i);
}
function Qh(o, e = []) {
  var t;
  const s = ((t = o.json.bufferViews) == null ? void 0 : t.length) || 0, i = new Array(s).fill(null);
  return e.forEach(({ properties: n }) => {
    for (const r in n) {
      const { values: a, arrayOffsets: l, stringOffsets: c } = n[r];
      i[a] === null && (i[a] = o.loadBufferView(a)), i[l] === null && (i[l] = o.loadBufferView(l)), i[c] === null && (i[c] = o.loadBufferView(c));
    }
  }), Promise.all(i);
}
class Rh {
  constructor(e) {
    this.parser = e, this.name = St;
  }
  async afterRoot({ scene: e, parser: t }) {
    const s = t.json.extensionsUsed;
    if (!s || !s.includes(St))
      return;
    let i = null, n = t.json.extensions[St];
    if (n.schemaUri) {
      const { manager: c, path: h, requestHeader: A, crossOrigin: d } = t.options, u = new URL(n.schemaUri, h).toString(), p = new Oe(c);
      p.setCrossOrigin(d), p.setResponseType("json"), p.setRequestHeader(A), i = p.loadAsync(u).then((g) => {
        n = { ...n, schema: g };
      });
    }
    const [r, a] = await Promise.all([
      Th(t, n.propertyTextures),
      Qh(t, n.propertyTables),
      i
    ]), l = new sr(n, r, a);
    e.userData.structuralMetadata = l, e.traverse((c) => {
      var h;
      if (t.associations.has(c)) {
        const { meshes: A, primitives: d } = t.associations.get(c), u = (h = t.json.meshes[A]) == null ? void 0 : h.primitives[d];
        if (u && u.extensions && u.extensions[St]) {
          const p = u.extensions[St];
          c.userData.structuralMetadata = new sr(n, r, a, p, c);
        } else
          c.userData.structuralMetadata = l;
      }
    });
  }
}
const ir = /* @__PURE__ */ new U(), nr = /* @__PURE__ */ new U(), rr = /* @__PURE__ */ new U();
function Lh(o) {
  return o.x > o.y && o.x > o.z ? 0 : o.y > o.z ? 1 : 2;
}
class kh {
  constructor(e, t, s) {
    this.geometry = e, this.textures = t, this.data = s, this._asyncRead = !1, this.featureIds = s.featureIds.map((i) => {
      const { texture: n, ...r } = i, a = {
        label: null,
        propertyTable: null,
        nullFeatureId: null,
        ...r
      };
      return n && (a.texture = {
        texCoord: 0,
        channels: [0],
        ...n
      }), a;
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
    const { geometry: s, textures: i, featureIds: n } = this, r = new Array(n.length).fill(null), a = n.length;
    Ve.increaseSizeTo(a);
    const l = Vo(s, e), c = l[Lh(t)];
    for (let d = 0, u = n.length; d < u; d++) {
      const p = n[d], g = "nullFeatureId" in p ? p.nullFeatureId : null;
      if ("texture" in p) {
        const m = i[p.texture.index];
        Oo(s, p.texture.texCoord, t, l, ir), Ho(ir, m.image.width, m.image.height, nr), rr.set(d, 0), Ve.renderPixelToTarget(i[p.texture.index], nr, rr);
      } else if ("attribute" in p) {
        const m = s.getAttribute(`_feature_id_${p.attribute}`).getX(c);
        m !== g && (r[d] = m);
      } else {
        const m = c;
        m !== g && (r[d] = m);
      }
    }
    const h = new Uint8Array(a * 4);
    if (this._asyncRead)
      return Ve.readDataAsync(h).then(() => (A(), r));
    return Ve.readData(h), A(), r;
    function A() {
      const d = new Uint32Array(1);
      for (let u = 0, p = n.length; u < p; u++) {
        const g = n[u], m = "nullFeatureId" in g ? g.nullFeatureId : null;
        if ("texture" in g) {
          const { channels: y } = g.texture, C = y.map((b) => h[4 * u + b]);
          new Uint8Array(d.buffer).set(C);
          const E = d[0];
          E !== m && (r[u] = E);
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
const ms = "EXT_mesh_features";
function or(o, e, t) {
  o.traverse((s) => {
    var i;
    if (e.associations.has(s)) {
      const { meshes: n, primitives: r } = e.associations.get(s), a = (i = e.json.meshes[n]) == null ? void 0 : i.primitives[r];
      a && a.extensions && a.extensions[ms] && t(s, a.extensions[ms]);
    }
  });
}
class Dh {
  constructor(e) {
    this.parser = e, this.name = ms;
  }
  async afterRoot({ scene: e, parser: t }) {
    var s;
    const i = t.json.extensionsUsed;
    if (!i || !i.includes(ms))
      return;
    const n = ((s = t.json.textures) == null ? void 0 : s.length) || 0, r = new Array(n).fill(null);
    or(e, t, (l, { featureIds: c }) => {
      c.forEach((h) => {
        if (h.texture && r[h.texture.index] === null) {
          const A = h.texture.index;
          r[A] = t.loadTexture(A);
        }
      });
    });
    const a = await Promise.all(r);
    or(e, t, (l, c) => {
      l.userData.meshFeatures = new kh(l.geometry, a, c);
    });
  }
}
class Fh {
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
class Ph {
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
    const t = new tt(e.manager);
    this.dracoLoader && (t.setDRACOLoader(this.dracoLoader), e.manager.addHandler(this._dracoRegex, this.dracoLoader)), this.ktxLoader && t.setKTX2Loader(this.ktxLoader), this.meshoptDecoder && t.setMeshoptDecoder(this.meshoptDecoder), this.rtc && t.register(() => new Fh()), this.metadata && (t.register(() => new Rh()), t.register(() => new Dh())), this.plugins.forEach((s) => t.register(s)), e.manager.addHandler(this._gltfRegex, t), this.tiles = e, this._loader = t;
  }
  dispose() {
    this.tiles.manager.removeHandler(this._gltfRegex), this.tiles.manager.removeHandler(this._dracoRegex), this.autoDispose && (this.ktxLoader.dispose(), this.dracoLoader.dispose());
  }
}
const { clamp: dd } = gt;
new Uo(new Je());
const _h = new _r(new Uint8Array([255, 255, 255, 255]), 1, 1);
_h.needsUpdate = !0;
const Uh = "https://unpkg.com/three@0.179.1/examples/jsm/libs/draco/gltf/", Gh = "https://unpkg.com/three@0.179.1/examples/jsm/libs/basis/";
class Nh extends ch {
  preprocessTileset(e, t, s = null) {
    const i = e.asset?.version || "1.0", [n] = i.split(".").map((a) => parseInt(a, 10));
    console.assert(
      n <= 1,
      "TilesRenderer: asset.version is expected to be a 1.x or a compatible version."
    );
    let r = t.replace(/\/[^/]*$/, "");
    r = new URL(r, window.location.href).toString(), this.preprocessNode(e.root, r, s);
  }
}
class Vh {
  constructor(e = null, t = null) {
    this.renderer = e, this.camera = t, this.activeTilesets = /* @__PURE__ */ new Set(), this.tilesetStates = /* @__PURE__ */ new Map(), this.pendingQueueTasks = [], this._resolutionVec2 = new f.Vector2();
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
    return (Array.isArray(e.cameras) ? [...e.cameras] : []).forEach((r) => {
      i.includes(r) || e.deleteCamera(r);
    }), i.forEach((r) => {
      e.setCamera(r);
    }), i;
  }
  setCamera(e) {
    const t = this.camera;
    this.camera = e, this.activeTilesets.forEach((s) => {
      const i = this.tilesetStates.get(s), n = this.getResolutionConfig(i);
      if (t && t !== this.camera && this.getDesiredTraversalCameras(t, n).forEach((a) => {
        s.deleteCamera(a);
      }), this.camera) {
        const r = this.syncTilesetTraversalCameras(s, this.camera, n);
        this.setResolutionForCamera(s, this.camera, r, n);
      }
    });
  }
  setResolutionForCamera(e, t, s = null, i = {}) {
    if (!e || !t || !this.renderer)
      return;
    const n = i?.usePerEyeResolution !== !1, r = i?.useDrawingBufferResolution !== !1, a = Array.isArray(s) && s.length > 0 ? s : this.getDesiredTraversalCameras(t, i);
    if (a.length !== 0) {
      if (n && t.isArrayCamera) {
        let l = !1;
        if (a.forEach((c) => {
          const h = c?.viewport;
          h && Number.isFinite(h.z) && Number.isFinite(h.w) && h.z > 0 && h.w > 0 && (e.setResolution(c, h.z, h.w), l = !0);
        }), l)
          return;
      }
      if (r && this.renderer.getDrawingBufferSize) {
        this.renderer.getDrawingBufferSize(this._resolutionVec2), a.forEach((l) => {
          e.setResolution(l, this._resolutionVec2.x, this._resolutionVec2.y);
        });
        return;
      }
      a.forEach((l) => {
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
    const s = Number.isFinite(e?.maxTasks) && e.maxTasks > 0 ? Math.max(1, Math.floor(e.maxTasks)) : 1 / 0, i = Number.isFinite(e?.timeBudgetMs) && e.timeBudgetMs >= 0, n = i ? e.timeBudgetMs : 1 / 0, r = i ? performance.now() : 0;
    let a = 0;
    for (; this.pendingQueueTasks.length > 0 && a < s && !(i && performance.now() - r >= n); ) {
      const l = this.pendingQueueTasks.shift();
      typeof l == "function" && l(), a += 1;
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
      const n = Object.keys(s).map((r) => r.toLowerCase());
      if (n.includes("latitude") && n.includes("longitude"))
        return !0;
    }
    const i = this.getRootTransformArray(e);
    if (i) {
      const n = i[12], r = i[13], a = i[14];
      if (Number.isFinite(n) && Number.isFinite(r) && Number.isFinite(a) && Math.hypot(n, r, a) > 1e6)
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
    const r = new f.Vector3(0, 1, 0), a = new f.Quaternion().setFromUnitVectors(n, r);
    return e.geoGroup.quaternion.copy(a), e.geoGroup.updateMatrixWorld(!0), e.hasGeospatialReoriented = !0, !0;
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
    const s = new jr();
    s.setDecoderPath(t.dracoDecoderPath || Uh);
    const i = new he();
    i.setTranscoderPath(t.ktx2TranscoderPath || Gh), this.renderer && i.detectSupport(this.renderer);
    const n = new Ph({
      rtc: !0,
      dracoLoader: s,
      ktxLoader: i
    });
    return e.registerPlugin(n), { dracoLoader: s, ktxLoader: i, gltfExtensionsPlugin: n };
  }
  convertBasicMaterial(e) {
    if (!e?.isMeshBasicMaterial)
      return e;
    const t = new f.MeshStandardMaterial({
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
      const i = (n, r = -1) => {
        if (!n) return;
        let a = n;
        n.isMeshBasicMaterial && (t.has(n) ? a = t.get(n) : (a = this.convertBasicMaterial(n), t.set(n, a))), a.map && (a.map.colorSpace = f.SRGBColorSpace, a.map.needsUpdate = !0), a.needsUpdate = !0, r >= 0 && Array.isArray(s.material) ? s.material[r] = a : s.material = a;
      };
      Array.isArray(s.material) ? s.material.forEach((n, r) => i(n, r)) : i(s.material);
    });
  }
  updateBoundsAndCenter(e) {
    if (!e) return !1;
    const { tileset: t, tilesGroup: s, upGroup: i, geoGroup: n, modelGroup: r, autoCenter: a } = e, l = new f.Box3(), c = t.getBoundingBox(l) && this.isValidBox3(l);
    if (a && c && !e.hasAutoCentered) {
      const A = l.getCenter(new f.Vector3());
      s.position.set(-A.x, -A.y, -A.z), s.updateMatrixWorld(!0), e.hasAutoCentered = !0;
    }
    r.updateMatrixWorld(!0);
    const h = new f.Box3().setFromObject(r);
    if (this.isValidBox3(h))
      return r.userData.boundingBox = h, !0;
    if (c) {
      const A = l.clone(), d = new f.Matrix4().multiplyMatrices(n.matrix, i.matrix).multiply(s.matrix);
      if (A.applyMatrix4(d), this.isValidBox3(A))
        return r.userData.boundingBox = A, !0;
    }
    return !1;
  }
  applyTriangleBudget(e) {
    if (!e?.maxTriangles || !this.renderer?.info?.render)
      return;
    const t = this.renderer.info.render.triangles;
    if (!Number.isFinite(t) || t <= 0)
      return;
    const { tileset: s, maxTriangles: i, minErrorTarget: n, maxErrorTarget: r } = e, a = i * 1.08, l = i * 0.75;
    let c = s.errorTarget;
    t > a ? c = Math.min(r, c * 1.2 + 0.5) : t < l && (c = Math.max(n, c * 0.9)), Math.abs(c - s.errorTarget) > 0.05 && (s.errorTarget = c);
  }
  createAdaptiveState(e, t, s, i) {
    if (t.adaptiveQuality === !1)
      return null;
    const n = typeof t.errorTarget == "number" && t.errorTarget > 0 ? t.errorTarget : typeof e.errorTarget == "number" && e.errorTarget > 0 ? e.errorTarget : 12, r = this.clamp(
      typeof t.adaptiveMovingErrorTarget == "number" ? t.adaptiveMovingErrorTarget : Math.max(n * 2, n + 7),
      s,
      i
    ), a = this.clamp(
      typeof t.adaptiveStillErrorTarget == "number" ? t.adaptiveStillErrorTarget : Math.max(s, n * 0.75),
      s,
      i
    ), l = typeof t.maxTilesProcessed == "number" && t.maxTilesProcessed > 0 ? t.maxTilesProcessed : typeof e.maxTilesProcessed == "number" && e.maxTilesProcessed > 0 ? e.maxTilesProcessed : 224, c = Math.max(8, Math.round(
      typeof t.adaptiveMinTilesProcessed == "number" ? t.adaptiveMinTilesProcessed : 24
    )), h = Math.max(c, Math.round(
      typeof t.adaptiveMaxTilesProcessed == "number" ? t.adaptiveMaxTilesProcessed : Math.max(l, 512)
    )), A = this.clamp(
      Math.round(
        typeof t.adaptiveMovingMaxTilesProcessed == "number" ? t.adaptiveMovingMaxTilesProcessed : l * 0.25
      ),
      c,
      h
    ), d = this.clamp(
      Math.round(
        typeof t.adaptiveStillMaxTilesProcessed == "number" ? t.adaptiveStillMaxTilesProcessed : l
      ),
      c,
      h
    ), u = this.clamp(
      typeof t.adaptiveFastMovingErrorTarget == "number" ? t.adaptiveFastMovingErrorTarget : Math.max(r * 1.35, r + 6),
      s,
      i
    ), p = this.clamp(
      Math.round(
        typeof t.adaptiveFastMovingMaxTilesProcessed == "number" ? t.adaptiveFastMovingMaxTilesProcessed : A * 0.4
      ),
      c,
      h
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
      fastMovingErrorTarget: u,
      stillErrorTarget: a,
      minTilesProcessed: c,
      maxTilesProcessed: h,
      movingTilesProcessed: A,
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
  applyAdaptiveQuality(e, t, s = void 0) {
    if (!e?.adaptive || !t)
      return;
    const { adaptive: i, tileset: n, minErrorTarget: r, maxErrorTarget: a } = e, l = performance.now();
    if (t.updateMatrixWorld?.(!0), t.getWorldPosition(i.samplePosition), t.getWorldQuaternion(i.sampleQuaternion), !i.initialized) {
      i.lastSampleTimeMs = l, i.lastMovementTimeMs = l, i.lastPosition.copy(i.samplePosition), i.lastQuaternion.copy(i.sampleQuaternion), i.initialized = !0;
      return;
    }
    const c = Math.max((l - i.lastSampleTimeMs) / 1e3, 1e-6), h = i.samplePosition.distanceTo(i.lastPosition), A = this.clamp(Math.abs(i.sampleQuaternion.dot(i.lastQuaternion)), -1, 1), d = 2 * Math.acos(A), u = h / c, p = d / c, g = u > i.linearSpeedThreshold, m = p > i.angularSpeedThreshold, y = u > i.fastLinearSpeedThreshold;
    (g || m) && (i.lastMovementTimeMs = l);
    const E = l - i.lastMovementTimeMs >= i.settleDelayMs;
    let b = i.stillErrorTarget, I = i.stillTilesProcessed;
    if (E || (y ? (b = i.fastMovingErrorTarget, I = i.fastMovingTilesProcessed) : (b = i.movingErrorTarget, I = i.movingTilesProcessed)), e.maxTriangles && this.renderer?.info?.render) {
      const B = this.renderer.info.render.triangles;
      if (Number.isFinite(B) && B > 0) {
        const M = e.maxTriangles * 1.08, x = e.maxTriangles * 0.75;
        B > M ? (b = Math.max(b, b * 1.2 + 0.5), I = Math.max(i.minTilesProcessed, Math.round(I * 0.85))) : B < x && E && (b *= 0.92, I = Math.min(i.maxTilesProcessed, Math.round(I * 1.08)));
      }
    }
    const S = Number.isFinite(s) && s > 14;
    if (S) {
      const B = s > 20 ? 16 : 13.9, M = s / B, x = b * Math.min(M, 2.5);
      b = Math.max(b, x), I = Math.max(
        i.minTilesProcessed,
        Math.round(I * Math.max(0.3, 1 / M))
      );
    }
    b = this.clamp(b, r, a), I = this.clamp(
      Math.round(I),
      i.minTilesProcessed,
      i.maxTilesProcessed
    );
    const w = S ? Math.min(0.5, i.errorLerp * 3) : i.errorLerp, v = n.errorTarget + (b - n.errorTarget) * w;
    Math.abs(v - n.errorTarget) > 0.04 && (n.errorTarget = v), typeof n.maxTilesProcessed == "number" && Math.abs(n.maxTilesProcessed - I) >= 1 && (n.maxTilesProcessed = I), i.lastSampleTimeMs = l, i.lastPosition.copy(i.samplePosition), i.lastQuaternion.copy(i.sampleQuaternion);
  }
  applyOptions(e, t) {
    if (!t)
      return;
    const {
      errorTarget: s,
      maxDepth: i,
      loadSiblings: n,
      optimizedLoadStrategy: r,
      maxTilesProcessed: a,
      fetchOptions: l
    } = t;
    typeof s == "number" ? e.errorTarget = s : e.errorTarget = 12, typeof i == "number" ? e.maxDepth = i : e.maxDepth = 25, typeof n == "boolean" ? e.loadSiblings = n : e.loadSiblings = !0, typeof r == "boolean" ? e.optimizedLoadStrategy = r : e.optimizedLoadStrategy = !1, typeof a == "number" ? e.maxTilesProcessed = a : e.maxTilesProcessed = 224, l && typeof l == "object" && (e.fetchOptions = l);
  }
  load(e, t = {}) {
    return new Promise((s, i) => {
      const n = new Nh(e);
      n.registerPlugin(new dh()), this.configureScheduling(n), this.applyOptions(n, t), this.configureGltfExtensions(n, t);
      const r = new f.Group(), a = new f.Group(), l = new f.Group();
      r.add(a), a.add(l);
      const c = n.group;
      l.add(c), this.setUpAxis(l, t.up || "+Y");
      const h = {
        tileset: n,
        modelGroup: r,
        geoGroup: a,
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
      if (h.adaptive = this.createAdaptiveState(n, t, h.minErrorTarget, h.maxErrorTarget), this.camera) {
        const g = this.getResolutionConfig(h), m = this.syncTilesetTraversalCameras(n, this.camera, g);
        this.setResolutionForCamera(n, this.camera, m, g);
      }
      h.onLoadModel = (g) => {
        g?.scene && this.normalizeTileModel(g.scene), h.boundsDirty = !0;
      }, n.addEventListener("load-model", h.onLoadModel);
      let A = null;
      const d = () => {
        n.removeEventListener("load-tileset", u), n.removeEventListener("load-error", p), A && t.signal && t.signal.removeEventListener("abort", A);
      }, u = () => {
        d(), this.applyGeospatialReorientation(h), this.updateBoundsAndCenter(h), this.activeTilesets.add(n), this.tilesetStates.set(n, h), s({ group: r, tileset: n });
      }, p = (g) => {
        d(), n.removeEventListener("load-model", h.onLoadModel), n.dispose(), i(g?.error || new Error("Tileset failed to load"));
      };
      if (n.addEventListener("load-tileset", u), n.addEventListener("load-error", p), t.signal && (A = () => {
        d(), n.removeEventListener("load-model", h.onLoadModel), n.dispose(), i(new Error("Loading cancelled"));
      }, t.signal.addEventListener("abort", A), t.signal.aborted)) {
        A();
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
      const r = this.tilesetStates.get(n), a = this.getResolutionConfig(r), l = this.syncTilesetTraversalCameras(n, i, a);
      this.setResolutionForCamera(n, i, l, a);
    }), this.activeTilesets.forEach((n) => {
      const r = this.tilesetStates.get(n);
      r && (r.adaptive ? this.applyAdaptiveQuality(r, i, t?.smoothedFrameTimeMs) : this.applyTriangleBudget(r)), n.update(), r && r.boundsDirty && (this.updateBoundsAndCenter(r), r.boundsDirty = !1);
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
class pt {
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
      async function h(u) {
        u.addEventListener("end", A), await e.xr.setSession(u), s.textContent = "EXIT VR", c = u;
      }
      function A() {
        c.removeEventListener("end", A), s.textContent = "ENTER VR", c = null;
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
        c === null ? navigator.xr.requestSession("immersive-vr", d).then(h) : (c.end(), navigator.xr.offerSession !== void 0 && navigator.xr.offerSession("immersive-vr", d).then(h).catch((u) => {
          console.warn(u);
        }));
      }, navigator.xr.offerSession !== void 0 && navigator.xr.offerSession("immersive-vr", d).then(h).catch((u) => {
        console.warn(u);
      });
    }
    function n() {
      s.style.display = "", s.style.cursor = "auto", s.style.left = "calc(50% - 75px)", s.style.width = "150px", s.onmouseenter = null, s.onmouseleave = null, s.onclick = null;
    }
    function r() {
      n(), s.textContent = "VR NOT SUPPORTED";
    }
    function a(c) {
      n(), console.warn("Exception when trying to call xr.isSessionSupported", c), s.textContent = "VR NOT ALLOWED";
    }
    function l(c) {
      c.style.position = "absolute", c.style.bottom = "20px", c.style.padding = "12px 6px", c.style.border = "1px solid #fff", c.style.borderRadius = "4px", c.style.background = "rgba(0,0,0,0.1)", c.style.color = "#fff", c.style.font = "normal 13px sans-serif", c.style.textAlign = "center", c.style.opacity = "0.5", c.style.outline = "none", c.style.zIndex = "999";
    }
    if ("xr" in navigator)
      return s.id = "VRButton", s.style.display = "none", l(s), navigator.xr.isSessionSupported("immersive-vr").then(function(c) {
        c ? i() : r(), c && pt.xrSessionIsGranted && s.click();
      }).catch(a), s;
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
        pt.xrSessionIsGranted = !0;
      });
    }
  }
}
pt.xrSessionIsGranted = !1;
pt.registerSessionGrantedListener();
class Oh {
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
        this.vrButton = pt.createButton(this.renderer, e), this.vrButton.innerHTML = '<span class="vr-icon">🥽</span>ENTER VR', this.vrButton.className = "vr-button--glass vr-button-available", this.vrButton.disabled = !1, this.vrButton.style.cssText = `
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
              const r = n.length > 0 ? n[0] : i;
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
async function qo(o) {
  const e = await fetch(o);
  if (e.ok)
    return e.json();
  throw new Error(e.statusText);
}
async function Hh(o) {
  if (!o)
    throw new Error("No basePath supplied");
  return await qo(`${o}/profilesList.json`);
}
async function qh(o, e, t = null, s = !0) {
  if (!o)
    throw new Error("No xrInputSource supplied");
  if (!e)
    throw new Error("No basePath supplied");
  const i = await Hh(e);
  let n;
  if (o.profiles.some((l) => {
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
  const r = await qo(n.profilePath);
  let a;
  if (s) {
    let l;
    if (o.handedness === "any" ? l = r.layouts[Object.keys(r.layouts)[0]] : l = r.layouts[o.handedness], !l)
      throw new Error(
        `No matching handedness, ${o.handedness}, in profile ${n.profileId}`
      );
    l.assetPath && (a = n.profilePath.replace("profile.json", l.assetPath));
  }
  return { profile: r, assetPath: a };
}
const zh = {
  xAxis: 0,
  yAxis: 0,
  button: 0,
  state: H.ComponentState.DEFAULT
};
function jh(o = 0, e = 0) {
  let t = o, s = e;
  if (Math.sqrt(o * o + e * e) > 1) {
    const r = Math.atan2(e, o);
    t = Math.cos(r), s = Math.sin(r);
  }
  return {
    normalizedXAxis: t * 0.5 + 0.5,
    normalizedYAxis: s * 0.5 + 0.5
  };
}
class Kh {
  constructor(e) {
    this.componentProperty = e.componentProperty, this.states = e.states, this.valueNodeName = e.valueNodeName, this.valueNodeProperty = e.valueNodeProperty, this.valueNodeProperty === H.VisualResponseProperty.TRANSFORM && (this.minNodeName = e.minNodeName, this.maxNodeName = e.maxNodeName), this.value = 0, this.updateFromComponent(zh);
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
    const { normalizedXAxis: n, normalizedYAxis: r } = jh(e, t);
    switch (this.componentProperty) {
      case H.ComponentProperty.X_AXIS:
        this.value = this.states.includes(i) ? n : 0.5;
        break;
      case H.ComponentProperty.Y_AXIS:
        this.value = this.states.includes(i) ? r : 0.5;
        break;
      case H.ComponentProperty.BUTTON:
        this.value = this.states.includes(i) ? s : 0;
        break;
      case H.ComponentProperty.STATE:
        this.valueNodeProperty === H.VisualResponseProperty.VISIBILITY ? this.value = this.states.includes(i) : this.value = this.states.includes(i) ? 1 : 0;
        break;
      default:
        throw new Error(`Unexpected visualResponse componentProperty ${this.componentProperty}`);
    }
  }
}
class Yh {
  /**
   * @param {Object} componentId - Id of the component
   * @param {Object} componentDescription - Description of the component to be created
   */
  constructor(e, t) {
    if (!e || !t || !t.visualResponses || !t.gamepadIndices || Object.keys(t.gamepadIndices).length === 0)
      throw new Error("Invalid arguments supplied");
    this.id = e, this.type = t.type, this.rootNodeName = t.rootNodeName, this.touchPointNodeName = t.touchPointNodeName, this.visualResponses = {}, Object.keys(t.visualResponses).forEach((s) => {
      const i = new Kh(t.visualResponses[s]);
      this.visualResponses[s] = i;
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
class Jh {
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
      this.components[i] = new Yh(i, n);
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
const Wh = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles", Xh = "generic-trigger";
class $h extends Is {
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
        const { valueNode: i, minNode: n, maxNode: r, value: a, valueNodeProperty: l } = s;
        i && (l === H.VisualResponseProperty.VISIBILITY ? i.visible = a : l === H.VisualResponseProperty.TRANSFORM && (i.quaternion.slerpQuaternions(
          n.quaternion,
          r.quaternion,
          a
        ), i.position.lerpVectors(
          n.position,
          r.position,
          a
        )));
      });
    }));
  }
}
function Zh(o, e) {
  Object.values(o.components).forEach((t) => {
    const { type: s, touchPointNodeName: i, visualResponses: n } = t;
    if (s === H.ComponentType.TOUCHPAD)
      if (t.touchPointNode = e.getObjectByName(i), t.touchPointNode) {
        const r = new Vr(1e-3), a = new Je({ color: 255 }), l = new Ss(r, a);
        t.touchPointNode.add(l);
      } else
        console.warn(`Could not find touch dot, ${t.touchPointNodeName}, in touchpad component ${t.id}`);
    Object.values(n).forEach((r) => {
      const { valueNodeName: a, minNodeName: l, maxNodeName: c, valueNodeProperty: h } = r;
      if (h === H.VisualResponseProperty.TRANSFORM) {
        if (r.minNode = e.getObjectByName(l), r.maxNode = e.getObjectByName(c), !r.minNode) {
          console.warn(`Could not find ${l} in the model`);
          return;
        }
        if (!r.maxNode) {
          console.warn(`Could not find ${c} in the model`);
          return;
        }
      }
      r.valueNode = e.getObjectByName(a), r.valueNode || console.warn(`Could not find ${a} in the model`);
    });
  });
}
function ar(o, e) {
  Zh(o.motionController, e), o.envMap && e.traverse((t) => {
    t.isMesh && (t.material.envMap = o.envMap, t.material.needsUpdate = !0);
  }), o.add(e);
}
class eA {
  /**
   * Constructs a new XR controller model factory.
   *
   * @param {?GLTFLoader} [gltfLoader=null] - A glTF loader that is used to load controller models.
   * @param {?Function} [onLoad=null] - A callback that is executed when a controller model has been loaded.
   */
  constructor(e = null, t = null) {
    this.gltfLoader = e, this.path = Wh, this._assetCache = {}, this.onLoad = t, this.gltfLoader || (this.gltfLoader = new tt());
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
    const t = new $h();
    let s = null;
    return e.addEventListener("connected", (i) => {
      const n = i.data;
      n.targetRayMode !== "tracked-pointer" || !n.gamepad || n.hand || qh(n, this.path, Xh).then(({ profile: r, assetPath: a }) => {
        t.motionController = new Jh(
          n,
          r,
          a
        );
        const l = this._assetCache[t.motionController.assetUrl];
        if (l)
          s = l.scene.clone(), ar(t, s), this.onLoad && this.onLoad(s);
        else {
          if (!this.gltfLoader)
            throw new Error("GLTFLoader not set.");
          this.gltfLoader.setPath(""), this.gltfLoader.load(
            t.motionController.assetUrl,
            (c) => {
              this._assetCache[t.motionController.assetUrl] = c, s = c.scene.clone(), ar(t, s), this.onLoad && this.onLoad(s);
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
      t.motionController = null, t.remove(s), s = null;
    }), t;
  }
}
class tA {
  constructor(e, t) {
    this.renderer = e, this.camera = t, this.controller1 = null, this.controller2 = null, this.controllerGrip1 = null, this.controllerGrip2 = null, this.controllers = [], this.controllerGrips = [], this.buttonStates = /* @__PURE__ */ new Map(), this.inputDeadzone = 0.15, this.turnSmoothingFactor = 0.1, this.lastTurnInput = 0, this.onSelectStart = null, this.onSelectEnd = null, this.onSqueezeStart = null, this.onSqueezeEnd = null, this.onModeToggle = null, this.onMovementStart = null, this.onMovementStop = null, this.handsActive = !1, this.handStates = {
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
          const s = t.handedness, i = t.hand.get("thumb-tip"), n = t.hand.get("index-finger-tip");
          if (!i || !n || !i.transform || !n.transform)
            this.handStates[s].pinch = !1;
          else {
            const l = new f.Vector3().setFromMatrixPosition(new f.Matrix4().fromArray(i.transform.matrix)), c = new f.Vector3().setFromMatrixPosition(new f.Matrix4().fromArray(n.transform.matrix)), h = l.distanceTo(c);
            this.handStates[s].pinch = h < 0.025;
          }
          let r = !0;
          const a = t.hand.get("wrist");
          if (a && a.transform) {
            const l = new f.Vector3().setFromMatrixPosition(new f.Matrix4().fromArray(a.transform.matrix));
            for (const c of ["index-finger-tip", "middle-finger-tip", "ring-finger-tip", "pinky-finger-tip"]) {
              const h = t.hand.get(c);
              if (!h || !h.transform) {
                r = !1;
                continue;
              }
              new f.Vector3().setFromMatrixPosition(new f.Matrix4().fromArray(h.transform.matrix)).distanceTo(l) > 0.045 && (r = !1);
            }
          } else
            r = !1;
          if (this.handStates[s].fist = r, n && a && n.transform && a.transform) {
            const l = new f.Vector3().setFromMatrixPosition(new f.Matrix4().fromArray(a.transform.matrix)), c = new f.Vector3().setFromMatrixPosition(new f.Matrix4().fromArray(n.transform.matrix));
            this.handStates[s].direction = new f.Vector3().subVectors(c, l).normalize();
          }
        }
    }
  }
  initControllers() {
    const e = new eA();
    for (let t = 0; t < 2; t++) {
      const s = this.renderer.xr.getController(t), i = this.renderer.xr.getControllerGrip(t);
      i.add(e.createControllerModel(i)), this.camera.parent.add(s), this.camera.parent.add(i), this.controllers.push(s), this.controllerGrips.push(i);
    }
    this.setupControllerEvents();
  }
  setupControllerEvents() {
    this.controllers.forEach((e, t) => {
      e.addEventListener("connected", (s) => {
        const { handedness: i, targetRayMode: n, profiles: r } = s.data, a = Array.isArray(r) && r.some((l) => l && l.toLowerCase().includes("hand"));
        n !== "tracked-pointer" || a || (i === "left" ? (this.controller1 = e, this.controllerGrip1 = this.controllerGrips[t]) : i === "right" && (this.controller2 = e, this.controllerGrip2 = this.controllerGrips[t]), e.userData.handedness = i, e.userData.initialised = !0);
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
          let r = [];
          i === "left" ? r = [4, 5] : i === "right" && (r = [4, 5]), r.forEach((a) => {
            if (s.buttons[a]) {
              const l = s.buttons[a], c = `${i}-${a}`, h = this.buttonStates.get(c) || !1, A = l.pressed;
              A && !h && this.onModeToggle && this.onModeToggle(), this.buttonStates.set(c, A);
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
        const n = i.gamepad, r = i.handedness;
        if (n.axes.length >= 4) {
          const a = n.axes[2] || 0, l = n.axes[3] || 0, c = n.axes[0] || 0, h = n.axes[1] || 0, A = Math.abs(a) > this.inputDeadzone ? a : 0, d = Math.abs(l) > this.inputDeadzone ? l : 0, u = Math.abs(c) > this.inputDeadzone ? c : 0, p = Math.abs(h) > this.inputDeadzone ? h : 0;
          r === "left" ? (A !== 0 || d !== 0) && (t = {
            x: A,
            y: d,
            handedness: "left"
          }) : r === "right" && (u !== 0 || p !== 0) && (s = {
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
class sA {
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
      const n = new f.RingGeometry(0.34, 0.5, 28), r = new f.MeshBasicMaterial({
        color: this.style.neutralColor,
        transparent: !0,
        opacity: 0.78,
        side: f.DoubleSide
      });
      this.teleportMarker = new f.Mesh(n, r), this.teleportMarker.rotation.x = -Math.PI / 2, this.teleportMarker.visible = !1, this.scene.add(this.teleportMarker);
    }
    if (!this.teleportArch) {
      const a = 0.07999999999999999, l = 0.34 + a, c = [];
      for (let u = 0; u <= 24; u++) {
        const p = u / 24 * Math.PI;
        c.push(new f.Vector3(
          Math.cos(p) * l,
          Math.sin(p) * l,
          0
        ));
      }
      const h = new f.CatmullRomCurve3(c), A = new f.TubeGeometry(h, 24, a, 8, !1), d = new f.MeshBasicMaterial({
        color: this.style.accentColor,
        transparent: !0,
        opacity: 0.24,
        side: f.DoubleSide,
        depthWrite: !1
      });
      this.teleportArch = new f.Mesh(A, d), this.teleportArch.visible = !1, this.scene.add(this.teleportArch);
    }
    if (!this.teleportFloor) {
      const n = new f.PlaneGeometry(14, 14), r = new f.MeshBasicMaterial({
        color: this.style.floorColor,
        transparent: !0,
        opacity: 0.06,
        side: f.DoubleSide,
        visible: !1
      });
      this.teleportFloor = new f.Mesh(n, r), this.teleportFloor.rotation.x = -Math.PI / 2, this.teleportFloor.visible = !1, this.scene.add(this.teleportFloor);
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
    const r = () => {
      n += 1 / 60;
      const a = Math.min(n / i, 1), l = 1 - Math.pow(1 - a, 3);
      this.camera.parent.position.lerpVectors(t, e, l), a < 1 && requestAnimationFrame(r);
    };
    r();
  }
  processSnapTurn(e, t = 30) {
    if (this.teleportPressed) return;
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
      const M = new f.Vector3();
      if (this.camera.getWorldDirection(M), M.y = 0, M.lengthSq() > 0) {
        M.normalize();
        const x = 0.12 - i;
        t.x += M.x * x, t.z += M.z * x, t.normalize();
      }
    }
    const n = this.teleportMaxDistance, r = Math.min(this.teleportMaxMagnitude / this.teleportThreshold, 1), a = Math.pow(r, 0.78), l = n * a, c = [], h = 32, A = -9.8, d = this.teleportFloorHeight, u = d - s.y;
    let p = Math.sqrt(l * Math.abs(A) / 2);
    t.y < 0 && (p *= Math.max(0.25, 1 - Math.abs(t.y) * 0.75));
    const g = t.x * p, m = t.z * p;
    let y = (t.y + 0.15) * p;
    if (u > 0.5) {
      const M = Math.sqrt(2 * Math.abs(A) * u) * 1.2;
      y = Math.max(y, M);
    }
    const C = y / Math.abs(A), E = 0.4 + (1 - Math.max(0, -t.y)) * 1.1, b = Math.max(C * 2.2, E);
    let I = null, S = !1, w = s.y, v = 0;
    const B = Math.max(8, Math.abs(u) * 1.5 + 2);
    for (let M = 0; M <= h; M++) {
      const x = M / h * b, R = new f.Vector3(
        s.x + g * x,
        s.y + y * x + 0.5 * A * x * x,
        s.z + m * x
      );
      Math.abs(R.y - s.y) > B && (R.y = s.y + Math.sign(R.y - s.y) * B), !S && R.y < w && (S = !0, v = x), c.push(R);
      const P = S ? x - v : 0, T = S && P > 0.1;
      if (!I && T && R.y <= d) {
        if (M > 0) {
          const F = c[M - 1], L = (d - F.y) / (R.y - F.y);
          I = new f.Vector3().lerpVectors(F, R, L), I.y = d;
        } else
          I = R.clone(), I.y = d;
        c[M] = I, c.length = M + 1;
        break;
      }
      w = R.y;
      const N = Math.sqrt(
        Math.pow(R.x - s.x, 2) + Math.pow(R.z - s.z, 2)
      );
      if (T && N > n) {
        if (M > 0) {
          const F = c[M - 1], L = Math.sqrt(
            Math.pow(F.x - s.x, 2) + Math.pow(F.z - s.z, 2)
          ), _ = N > L ? (n - L) / (N - L) : 0.5;
          I = new f.Vector3(
            F.x + (R.x - F.x) * _,
            d,
            F.z + (R.z - F.z) * _
          ), c[M] = I, c.length = M + 1;
        }
        break;
      }
    }
    if (!I && c.length > 0) {
      let M = c[0], x = 0;
      for (let R = 1; R < c.length; R++)
        c[R].y < M.y && (M = c[R], x = R);
      x > c.length / 3 && (I = new f.Vector3(M.x, d, M.z), c.length = x + 1, c[x] = I);
    }
    if (c.length > 1) {
      const M = new f.CatmullRomCurve3(c, !1, "centripetal"), x = new f.TubeGeometry(M, 20, 0.012, 6, !1);
      this.teleportCurve.geometry && this.teleportCurve.geometry.dispose(), this.teleportCurve.geometry = x;
    }
    if (this.currentTeleportTarget = I ? I.clone() : null, this.teleportMarker && (I ? (this.teleportMarker.position.copy(I), this.teleportMarker.rotation.set(-Math.PI / 2, 0, 0), this.teleportMarker.material.opacity = 0.78, this.teleportMarker.material.color.setHex(this.style.neutralColor), this.teleportMarker.visible = !0) : this.teleportMarker.visible = !1), this.teleportArch)
      if (I) {
        this.teleportArch.position.copy(I);
        const M = new f.Vector3();
        this.camera.getWorldPosition(M);
        const x = new f.Vector3(
          M.x,
          I.y,
          M.z
        );
        this.teleportArch.lookAt(x);
        const R = M.distanceTo(I), P = f.MathUtils.clamp((R - 2.5) / 7.5, 0, 1);
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
class iA {
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
      for (const m of ["left", "right"])
        if (t.handStates[m].pinch) {
          u = m, p.copy(t.handStates[m].direction), g = t.handStates[m].fist;
          break;
        }
      if (u) {
        this.handMoveActive = !0, this.handMoveBoost = g, this.handMoveDirection.copy(p);
        const m = this.camera.parent || this.camera, y = this.MOVE_SPEED * (g ? 3 : 1) * e;
        m.position.addScaledVector(p, y), this.isMoving = !0, this.onMovementStart && !this._wasMoving && this.onMovementStart(), this.onMovementUpdate && this.onMovementUpdate({
          isMoving: !0,
          currentSpeed: this.MOVE_SPEED,
          isBoosted: g,
          currentBoostLevel: g ? 1 : 0
        }), this._wasMoving = !0;
        return;
      } else
        this.handMoveActive && this.onMovementStop && this.onMovementStop(), this.handMoveActive = !1, this.isMoving = !1, this._wasMoving = !1;
    }
    const n = this.camera.parent || this.camera;
    let r = !1, a = !1;
    for (let u = 0; u < i.length; u++) {
      const p = i[u];
      if (!p || !p.gamepad || !p.gamepad.buttons || !p.gamepad.axes || p.gamepad.axes.length < 4)
        continue;
      const g = p.gamepad, y = p.handedness === "left" ? t.controller1 : t.controller2;
      if (!y) continue;
      const C = g.axes[2] || 0, E = g.axes[3] || 0, b = this.comfortSettings.locomotionMode === "teleport" && this.teleportSystem && y, I = this.teleportSystem && this.teleportSystem.teleportPressed, S = I && this.teleportSystem.teleportController === y, w = I && !S;
      if (p.handedness === "left") {
        const v = g.buttons[1], B = v && v.pressed ? 3 : 1, M = this.comfortSettings.reducedMotion ? this.comfortSettings.comfortSpeed : 1;
        if (v && v.pressed && (a = !0), b && (S || !I)) {
          this.teleportSystem.processTeleportation(y, E), this.comfortSettings.turningMode === "snap" && this.teleportSystem.processSnapTurn(C, this.comfortSettings.snapTurnAngle);
          continue;
        } else if (w)
          Math.abs(E) > 0.1 && this.teleportSystem.adjustFloorHeight(-E * (4 * e));
        else {
          const x = new f.Vector3();
          this.camera.getWorldDirection(x), x.y = 0, x.normalize();
          const R = new f.Vector3().crossVectors(x, this.camera.up).normalize();
          if (Math.abs(E) > 0.1) {
            const P = this.MOVE_SPEED * B * M * this.currentSpeed * e;
            n.position.addScaledVector(x, -E * P), r = !0;
          }
          if (Math.abs(C) > 0.1) {
            const P = this.MOVE_SPEED * B * M * this.currentSpeed * e;
            n.position.addScaledVector(R, C * P), r = !0;
          }
        }
      }
      if (p.handedness === "right") {
        const v = g.buttons[1], B = v && v.pressed ? 3 : 1, M = this.comfortSettings.reducedMotion ? this.comfortSettings.comfortSpeed : 1;
        if (v && v.pressed && Math.abs(E) > 0.1 && (a = !0), b && (S || !I)) {
          this.teleportSystem.processTeleportation(y, E), this.comfortSettings.turningMode === "snap" && this.teleportSystem.processSnapTurn(C, this.comfortSettings.snapTurnAngle);
          continue;
        } else if (w)
          Math.abs(E) > 0.1 && this.teleportSystem.adjustFloorHeight(-E * (4 * e));
        else {
          if (this.comfortSettings.turningMode === "snap" && this.teleportSystem)
            this.teleportSystem.processSnapTurn(C, this.comfortSettings.snapTurnAngle);
          else if (Math.abs(C) > this.inputDeadzone) {
            const x = this.lastTurnInput * this.turnSmoothingFactor + C * (1 - this.turnSmoothingFactor);
            if (this.lastTurnInput = x, Math.abs(x) > this.inputDeadzone) {
              const R = this.comfortSettings.reducedMotion ? this.TURN_SPEED * 0.5 : this.TURN_SPEED, P = x * R * Math.min(e, 1 / 30);
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
    const l = this.isMoving;
    this.isMoving = r;
    const h = (this.isMoving ? this.MOVE_SPEED : 0) - this.currentSpeed;
    this.currentSpeed += h * this.SPEED_RAMP_RATE * e, this.currentSpeed = Math.max(0, this.currentSpeed);
    const d = (a ? 1 : 0) - this.currentBoostLevel;
    this.currentBoostLevel += d * this.BOOST_RAMP_RATE * e, this.currentBoostLevel = Math.max(0, Math.min(1, this.currentBoostLevel)), !l && this.isMoving && this.onMovementStart && this.onMovementStart(), l && !this.isMoving && this.onMovementStop && this.onMovementStop(), this.onMovementUpdate && this.onMovementUpdate({
      isMoving: this.isMoving,
      currentSpeed: this.currentSpeed,
      isBoosted: a,
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
class nA {
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
class rA {
  /**
   * Creates a new VRManager instance
   * 
   * @param {THREE.WebGLRenderer} renderer - Three.js WebGL renderer with XR enabled
   * @param {THREE.PerspectiveCamera} camera - Three.js camera for VR dolly system
   * @param {THREE.Scene} scene - Three.js scene for VR objects
   * @param {string} [audioPath='./sound/'] - Path to VR audio files
  * @param {boolean} [enableAudio=false] - Enable VR audio system
   */
  constructor(e, t, s, i = "./sound/", n = !1, r = null) {
    this.renderer = e, this.camera = t, this.scene = s, this.audioPath = i, this.enableAudio = n, this.container = r, this.vrCore = new Oh(e, t, s, r), this.vrControllers = new tA(e, t), this.vrTeleport = new sA(s, t), this.vrLocomotion = new iA(t, e), this.vrAudio = this.enableAudio ? new nA() : null, this.isVRSupported = !1, this.isVRPresenting = !1, this.controller1 = null, this.controller2 = null, this.controllerGrip1 = null, this.controllerGrip2 = null, this.controllers = [], this.controllerGrips = [], this._preVRCameraState = {
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
class oA {
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
      async function h(d) {
        d.addEventListener("end", A), e.xr.setReferenceSpaceType("local"), await e.xr.setSession(d), s.textContent = "STOP AR", t.domOverlay.root.style.display = "", c = d;
      }
      function A() {
        c.removeEventListener("end", A), s.textContent = "START AR", t.domOverlay.root.style.display = "none", c = null;
      }
      s.style.display = "", s.style.cursor = "pointer", s.style.left = "calc(50% - 50px)", s.style.width = "100px", s.textContent = "START AR", s.onmouseenter = function() {
        s.style.opacity = "1.0";
      }, s.onmouseleave = function() {
        s.style.opacity = "0.5";
      }, s.onclick = function() {
        c === null ? navigator.xr.requestSession("immersive-ar", t).then(h) : (c.end(), navigator.xr.offerSession !== void 0 && navigator.xr.offerSession("immersive-ar", t).then(h).catch((d) => {
          console.warn(d);
        }));
      }, navigator.xr.offerSession !== void 0 && navigator.xr.offerSession("immersive-ar", t).then(h).catch((d) => {
        console.warn(d);
      });
    }
    function n() {
      s.style.display = "", s.style.cursor = "auto", s.style.left = "calc(50% - 75px)", s.style.width = "150px", s.onmouseenter = null, s.onmouseleave = null, s.onclick = null;
    }
    function r() {
      n(), s.textContent = "AR NOT SUPPORTED";
    }
    function a(c) {
      n(), console.warn("Exception when trying to call xr.isSessionSupported", c), s.textContent = "AR NOT ALLOWED";
    }
    function l(c) {
      c.style.position = "absolute", c.style.bottom = "20px", c.style.padding = "12px 6px", c.style.border = "1px solid #fff", c.style.borderRadius = "4px", c.style.background = "rgba(0,0,0,0.1)", c.style.color = "#fff", c.style.font = "normal 13px sans-serif", c.style.textAlign = "center", c.style.opacity = "0.5", c.style.outline = "none", c.style.zIndex = "999";
    }
    if ("xr" in navigator)
      return s.id = "ARButton", s.style.display = "none", l(s), navigator.xr.isSessionSupported("immersive-ar").then(function(c) {
        c ? i() : r();
      }).catch(a), s;
    {
      const c = document.createElement("a");
      return window.isSecureContext === !1 ? (c.href = document.location.href.replace(/^http:/, "https:"), c.innerHTML = "WEBXR NEEDS HTTPS") : (c.href = "https://immersiveweb.dev/", c.innerHTML = "WEBXR NOT AVAILABLE"), c.style.left = "calc(50% - 90px)", c.style.width = "180px", c.style.textDecoration = "none", l(c), c;
    }
  }
}
/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/
var Z = Uint8Array, de = Uint16Array, Ji = Int32Array, Wi = new Z([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]), Xi = new Z([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]), lr = new Z([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), zo = function(o, e) {
  for (var t = new de(31), s = 0; s < 31; ++s)
    t[s] = e += 1 << o[s - 1];
  for (var i = new Ji(t[30]), s = 1; s < 30; ++s)
    for (var n = t[s]; n < t[s + 1]; ++n)
      i[n] = n - t[s] << 5 | s;
  return { b: t, r: i };
}, jo = zo(Wi, 2), aA = jo.b, Qi = jo.r;
aA[28] = 258, Qi[258] = 28;
var lA = zo(Xi, 0), cr = lA.r, Ri = new de(32768);
for (var O = 0; O < 32768; ++O) {
  var Ne = (O & 43690) >> 1 | (O & 21845) << 1;
  Ne = (Ne & 52428) >> 2 | (Ne & 13107) << 2, Ne = (Ne & 61680) >> 4 | (Ne & 3855) << 4, Ri[O] = ((Ne & 65280) >> 8 | (Ne & 255) << 8) >> 1;
}
var kt = function(o, e, t) {
  for (var s = o.length, i = 0, n = new de(e); i < s; ++i)
    o[i] && ++n[o[i] - 1];
  var r = new de(e);
  for (i = 1; i < e; ++i)
    r[i] = r[i - 1] + n[i - 1] << 1;
  var a;
  if (t) {
    a = new de(1 << e);
    var l = 15 - e;
    for (i = 0; i < s; ++i)
      if (o[i])
        for (var c = i << 4 | o[i], h = e - o[i], A = r[o[i] - 1]++ << h, d = A | (1 << h) - 1; A <= d; ++A)
          a[Ri[A] >> l] = c;
  } else
    for (a = new de(s), i = 0; i < s; ++i)
      o[i] && (a[i] = Ri[r[o[i] - 1]++] >> 15 - o[i]);
  return a;
}, et = new Z(288);
for (var O = 0; O < 144; ++O)
  et[O] = 8;
for (var O = 144; O < 256; ++O)
  et[O] = 9;
for (var O = 256; O < 280; ++O)
  et[O] = 7;
for (var O = 280; O < 288; ++O)
  et[O] = 8;
var bs = new Z(32);
for (var O = 0; O < 32; ++O)
  bs[O] = 5;
var cA = /* @__PURE__ */ kt(et, 9, 0), hA = /* @__PURE__ */ kt(bs, 5, 0), Ko = function(o) {
  return (o + 7) / 8 | 0;
}, Yo = function(o, e, t) {
  return (t == null || t > o.length) && (t = o.length), new Z(o.subarray(e, t));
}, AA = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
], Ls = function(o, e, t) {
  var s = new Error(e || AA[o]);
  if (s.code = o, Error.captureStackTrace && Error.captureStackTrace(s, Ls), !t)
    throw s;
  return s;
}, Re = function(o, e, t) {
  t <<= e & 7;
  var s = e / 8 | 0;
  o[s] |= t, o[s + 1] |= t >> 8;
}, vt = function(o, e, t) {
  t <<= e & 7;
  var s = e / 8 | 0;
  o[s] |= t, o[s + 1] |= t >> 8, o[s + 2] |= t >> 16;
}, ci = function(o, e) {
  for (var t = [], s = 0; s < o.length; ++s)
    o[s] && t.push({ s, f: o[s] });
  var i = t.length, n = t.slice();
  if (!i)
    return { t: Wo, l: 0 };
  if (i == 1) {
    var r = new Z(t[0].s + 1);
    return r[t[0].s] = 1, { t: r, l: 1 };
  }
  t.sort(function(I, S) {
    return I.f - S.f;
  }), t.push({ s: -1, f: 25001 });
  var a = t[0], l = t[1], c = 0, h = 1, A = 2;
  for (t[0] = { s: -1, f: a.f + l.f, l: a, r: l }; h != i - 1; )
    a = t[t[c].f < t[A].f ? c++ : A++], l = t[c != h && t[c].f < t[A].f ? c++ : A++], t[h++] = { s: -1, f: a.f + l.f, l: a, r: l };
  for (var d = n[0].s, s = 1; s < i; ++s)
    n[s].s > d && (d = n[s].s);
  var u = new de(d + 1), p = Li(t[h - 1], u, 0);
  if (p > e) {
    var s = 0, g = 0, m = p - e, y = 1 << m;
    for (n.sort(function(S, w) {
      return u[w.s] - u[S.s] || S.f - w.f;
    }); s < i; ++s) {
      var C = n[s].s;
      if (u[C] > e)
        g += y - (1 << p - u[C]), u[C] = e;
      else
        break;
    }
    for (g >>= m; g > 0; ) {
      var E = n[s].s;
      u[E] < e ? g -= 1 << e - u[E]++ - 1 : ++s;
    }
    for (; s >= 0 && g; --s) {
      var b = n[s].s;
      u[b] == e && (--u[b], ++g);
    }
    p = e;
  }
  return { t: new Z(u), l: p };
}, Li = function(o, e, t) {
  return o.s == -1 ? Math.max(Li(o.l, e, t + 1), Li(o.r, e, t + 1)) : e[o.s] = t;
}, hr = function(o) {
  for (var e = o.length; e && !o[--e]; )
    ;
  for (var t = new de(++e), s = 0, i = o[0], n = 1, r = function(l) {
    t[s++] = l;
  }, a = 1; a <= e; ++a)
    if (o[a] == i && a != e)
      ++n;
    else {
      if (!i && n > 2) {
        for (; n > 138; n -= 138)
          r(32754);
        n > 2 && (r(n > 10 ? n - 11 << 5 | 28690 : n - 3 << 5 | 12305), n = 0);
      } else if (n > 3) {
        for (r(i), --n; n > 6; n -= 6)
          r(8304);
        n > 2 && (r(n - 3 << 5 | 8208), n = 0);
      }
      for (; n--; )
        r(i);
      n = 1, i = o[a];
    }
  return { c: t.subarray(0, s), n: e };
}, Mt = function(o, e) {
  for (var t = 0, s = 0; s < e.length; ++s)
    t += o[s] * e[s];
  return t;
}, Jo = function(o, e, t) {
  var s = t.length, i = Ko(e + 2);
  o[i] = s & 255, o[i + 1] = s >> 8, o[i + 2] = o[i] ^ 255, o[i + 3] = o[i + 1] ^ 255;
  for (var n = 0; n < s; ++n)
    o[i + n + 4] = t[n];
  return (i + 4 + s) * 8;
}, Ar = function(o, e, t, s, i, n, r, a, l, c, h) {
  Re(e, h++, t), ++i[256];
  for (var A = ci(i, 15), d = A.t, u = A.l, p = ci(n, 15), g = p.t, m = p.l, y = hr(d), C = y.c, E = y.n, b = hr(g), I = b.c, S = b.n, w = new de(19), v = 0; v < C.length; ++v)
    ++w[C[v] & 31];
  for (var v = 0; v < I.length; ++v)
    ++w[I[v] & 31];
  for (var B = ci(w, 7), M = B.t, x = B.l, R = 19; R > 4 && !M[lr[R - 1]]; --R)
    ;
  var P = c + 5 << 3, T = Mt(i, et) + Mt(n, bs) + r, N = Mt(i, d) + Mt(n, g) + r + 14 + 3 * R + Mt(w, M) + 2 * w[16] + 3 * w[17] + 7 * w[18];
  if (l >= 0 && P <= T && P <= N)
    return Jo(e, h, o.subarray(l, l + c));
  var F, L, _, j;
  if (Re(e, h, 1 + (N < T)), h += 2, N < T) {
    F = kt(d, u, 0), L = d, _ = kt(g, m, 0), j = g;
    var Me = kt(M, x, 0);
    Re(e, h, E - 257), Re(e, h + 5, S - 1), Re(e, h + 10, R - 4), h += 14;
    for (var v = 0; v < R; ++v)
      Re(e, h + 3 * v, M[lr[v]]);
    h += 3 * R;
    for (var K = [C, I], ue = 0; ue < 2; ++ue)
      for (var ce = K[ue], v = 0; v < ce.length; ++v) {
        var pe = ce[v] & 31;
        Re(e, h, Me[pe]), h += M[pe], pe > 15 && (Re(e, h, ce[v] >> 5 & 127), h += ce[v] >> 12);
      }
  } else
    F = cA, L = et, _ = hA, j = bs;
  for (var v = 0; v < a; ++v) {
    var $ = s[v];
    if ($ > 255) {
      var pe = $ >> 18 & 31;
      vt(e, h, F[pe + 257]), h += L[pe + 257], pe > 7 && (Re(e, h, $ >> 23 & 31), h += Wi[pe]);
      var st = $ & 31;
      vt(e, h, _[st]), h += j[st], st > 3 && (vt(e, h, $ >> 5 & 8191), h += Xi[st]);
    } else
      vt(e, h, F[$]), h += L[$];
  }
  return vt(e, h, F[256]), h + L[256];
}, dA = /* @__PURE__ */ new Ji([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), Wo = /* @__PURE__ */ new Z(0), uA = function(o, e, t, s, i, n) {
  var r = n.z || o.length, a = new Z(s + r + 5 * (1 + Math.ceil(r / 7e3)) + i), l = a.subarray(s, a.length - i), c = n.l, h = (n.r || 0) & 7;
  if (e) {
    h && (l[0] = n.r >> 3);
    for (var A = dA[e - 1], d = A >> 13, u = A & 8191, p = (1 << t) - 1, g = n.p || new de(32768), m = n.h || new de(p + 1), y = Math.ceil(t / 3), C = 2 * y, E = function(Fs) {
      return (o[Fs] ^ o[Fs + 1] << y ^ o[Fs + 2] << C) & p;
    }, b = new Ji(25e3), I = new de(288), S = new de(32), w = 0, v = 0, B = n.i || 0, M = 0, x = n.w || 0, R = 0; B + 2 < r; ++B) {
      var P = E(B), T = B & 32767, N = m[P];
      if (g[T] = N, m[P] = T, x <= B) {
        var F = r - B;
        if ((w > 7e3 || M > 24576) && (F > 423 || !c)) {
          h = Ar(o, l, 0, b, I, S, v, M, R, B - R, h), M = w = v = 0, R = B;
          for (var L = 0; L < 286; ++L)
            I[L] = 0;
          for (var L = 0; L < 30; ++L)
            S[L] = 0;
        }
        var _ = 2, j = 0, Me = u, K = T - N & 32767;
        if (F > 2 && P == E(B - K))
          for (var ue = Math.min(d, F) - 1, ce = Math.min(32767, B), pe = Math.min(258, F); K <= ce && --Me && T != N; ) {
            if (o[B + _] == o[B + _ - K]) {
              for (var $ = 0; $ < pe && o[B + $] == o[B + $ - K]; ++$)
                ;
              if ($ > _) {
                if (_ = $, j = K, $ > ue)
                  break;
                for (var st = Math.min(K, $ - 2), Zi = 0, L = 0; L < st; ++L) {
                  var ks = B - K + L & 32767, ra = g[ks], en = ks - ra & 32767;
                  en > Zi && (Zi = en, N = ks);
                }
              }
            }
            T = N, N = g[T], K += T - N & 32767;
          }
        if (j) {
          b[M++] = 268435456 | Qi[_] << 18 | cr[j];
          var tn = Qi[_] & 31, sn = cr[j] & 31;
          v += Wi[tn] + Xi[sn], ++I[257 + tn], ++S[sn], x = B + _, ++w;
        } else
          b[M++] = o[B], ++I[o[B]];
      }
    }
    for (B = Math.max(B, x); B < r; ++B)
      b[M++] = o[B], ++I[o[B]];
    h = Ar(o, l, c, b, I, S, v, M, R, B - R, h), c || (n.r = h & 7 | l[h / 8 | 0] << 3, h -= 7, n.h = m, n.p = g, n.i = B, n.w = x);
  } else {
    for (var B = n.w || 0; B < r + c; B += 65535) {
      var Ds = B + 65535;
      Ds >= r && (l[h / 8 | 0] = c, Ds = r), h = Jo(l, h + 1, o.subarray(B, Ds));
    }
    n.i = r;
  }
  return Yo(a, 0, s + Ko(h) + i);
}, pA = /* @__PURE__ */ function() {
  for (var o = new Int32Array(256), e = 0; e < 256; ++e) {
    for (var t = e, s = 9; --s; )
      t = (t & 1 && -306674912) ^ t >>> 1;
    o[e] = t;
  }
  return o;
}(), gA = function() {
  var o = -1;
  return {
    p: function(e) {
      for (var t = o, s = 0; s < e.length; ++s)
        t = pA[t & 255 ^ e[s]] ^ t >>> 8;
      o = t;
    },
    d: function() {
      return ~o;
    }
  };
}, fA = function(o, e, t, s, i) {
  if (!i && (i = { l: 1 }, e.dictionary)) {
    var n = e.dictionary.subarray(-32768), r = new Z(n.length + o.length);
    r.set(n), r.set(o, n.length), o = r, i.w = n.length;
  }
  return uA(o, e.level == null ? 6 : e.level, e.mem == null ? i.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(o.length))) * 1.5) : 20 : 12 + e.mem, t, s, i);
}, Xo = function(o, e) {
  var t = {};
  for (var s in o)
    t[s] = o[s];
  for (var s in e)
    t[s] = e[s];
  return t;
}, W = function(o, e, t) {
  for (; t; ++e)
    o[e] = t, t >>>= 8;
};
function mA(o, e) {
  return fA(o, e || {}, 0, 0);
}
var $o = function(o, e, t, s) {
  for (var i in o) {
    var n = o[i], r = e + i, a = s;
    Array.isArray(n) && (a = Xo(s, n[1]), n = n[0]), n instanceof Z ? t[r] = [n, a] : (t[r += "/"] = [new Z(0), a], $o(n, r, t, s));
  }
}, dr = typeof TextEncoder < "u" && /* @__PURE__ */ new TextEncoder(), bA = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), CA = 0;
try {
  bA.decode(Wo, { stream: !0 }), CA = 1;
} catch {
}
function Cs(o, e) {
  var t;
  if (dr)
    return dr.encode(o);
  for (var s = o.length, i = new Z(o.length + (o.length >> 1)), n = 0, r = function(c) {
    i[n++] = c;
  }, t = 0; t < s; ++t) {
    if (n + 5 > i.length) {
      var a = new Z(n + 8 + (s - t << 1));
      a.set(i), i = a;
    }
    var l = o.charCodeAt(t);
    l < 128 || e ? r(l) : l < 2048 ? (r(192 | l >> 6), r(128 | l & 63)) : l > 55295 && l < 57344 ? (l = 65536 + (l & 1047552) | o.charCodeAt(++t) & 1023, r(240 | l >> 18), r(128 | l >> 12 & 63), r(128 | l >> 6 & 63), r(128 | l & 63)) : (r(224 | l >> 12), r(128 | l >> 6 & 63), r(128 | l & 63));
  }
  return Yo(i, 0, n);
}
var ki = function(o) {
  var e = 0;
  if (o)
    for (var t in o) {
      var s = o[t].length;
      s > 65535 && Ls(9), e += s + 4;
    }
  return e;
}, ur = function(o, e, t, s, i, n, r, a) {
  var l = s.length, c = t.extra, h = a && a.length, A = ki(c);
  W(o, e, r != null ? 33639248 : 67324752), e += 4, r != null && (o[e++] = 20, o[e++] = t.os), o[e] = 20, e += 2, o[e++] = t.flag << 1 | (n < 0 && 8), o[e++] = i && 8, o[e++] = t.compression & 255, o[e++] = t.compression >> 8;
  var d = new Date(t.mtime == null ? Date.now() : t.mtime), u = d.getFullYear() - 1980;
  if ((u < 0 || u > 119) && Ls(10), W(o, e, u << 25 | d.getMonth() + 1 << 21 | d.getDate() << 16 | d.getHours() << 11 | d.getMinutes() << 5 | d.getSeconds() >> 1), e += 4, n != -1 && (W(o, e, t.crc), W(o, e + 4, n < 0 ? -n - 2 : n), W(o, e + 8, t.size)), W(o, e + 12, l), W(o, e + 14, A), e += 16, r != null && (W(o, e, h), W(o, e + 6, t.attrs), W(o, e + 10, r), e += 14), o.set(s, e), e += l, A)
    for (var p in c) {
      var g = c[p], m = g.length;
      W(o, e, +p), W(o, e + 2, m), o.set(g, e + 4), e += 4 + m;
    }
  return h && (o.set(a, e), e += h), e;
}, yA = function(o, e, t, s, i) {
  W(o, e, 101010256), W(o, e + 8, t), W(o, e + 10, t), W(o, e + 12, s), W(o, e + 16, i);
};
function EA(o, e) {
  e || (e = {});
  var t = {}, s = [];
  $o(o, "", t, e);
  var i = 0, n = 0;
  for (var r in t) {
    var a = t[r], l = a[0], c = a[1], h = c.level == 0 ? 0 : 8, A = Cs(r), d = A.length, u = c.comment, p = u && Cs(u), g = p && p.length, m = ki(c.extra);
    d > 65535 && Ls(11);
    var y = h ? mA(l, c) : l, C = y.length, E = gA();
    E.p(l), s.push(Xo(c, {
      size: l.length,
      crc: E.d(),
      c: y,
      f: A,
      m: p,
      u: d != r.length || p && u.length != g,
      o: i,
      compression: h
    })), i += 30 + d + m + C, n += 76 + 2 * (d + m) + (g || 0) + C;
  }
  for (var b = new Z(n + 22), I = i, S = n - i, w = 0; w < s.length; ++w) {
    var A = s[w];
    ur(b, A.o, A, A.f, A.u, A.c.length);
    var v = 30 + A.f.length + ki(A.extra);
    b.set(A.c, A.o + v), ur(b, i, A, A.f, A.u, A.c.length, A.o, A.m), i += 16 + v + (A.m ? A.m.length : 0);
  }
  return yA(b, i, s.length, S, I), b;
}
class Ae {
  constructor(e, t = "", s = [], i = []) {
    this.name = e, this.type = t, this.metadata = s, this.properties = i, this.children = [];
  }
  addMetadata(e, t) {
    this.metadata.push({ key: e, value: t });
  }
  addProperty(e, t = []) {
    this.properties.push({ property: e, metadata: t });
  }
  addChild(e) {
    this.children.push(e);
  }
  toString(e = 0) {
    const t = "	".repeat(e), s = this.metadata.map((h) => {
      const A = h.key, d = h.value;
      if (Array.isArray(d)) {
        const u = [];
        return u.push(`${A} = {`), d.forEach((p) => {
          u.push(`${t}		${p}`);
        }), u.push(`${t}	}`), u.join(`
`);
      } else
        return `${A} = ${d}`;
    }), i = s.length ? ` (
${s.map((h) => `${t}	${h}`).join(`
`)}
${t})` : "", n = this.properties.map((h) => {
      const A = h.property, d = h.metadata.length ? ` (
${h.metadata.map((u) => `${t}		${u}`).join(`
`)}
${t}	)` : "";
      return `${t}	${A}${d}`;
    }), r = this.children.map((h) => h.toString(e + 1)), a = [];
    if (n.length > 0 && a.push(...n), r.length > 0) {
      n.length > 0 && a.push("");
      for (let h = 0; h < r.length; h++)
        a.push(r[h]), h < r.length - 1 && a.push("");
    }
    const l = a.join(`
`), c = this.type ? this.type + " " : "";
    return `${t}def ${c}"${this.name}"${i}
${t}{
${l}
${t}}`;
  }
}
class IA {
  /**
   * Constructs a new USDZ exporter.
   */
  constructor() {
    this.textureUtils = null;
  }
  /**
   * Sets the texture utils for this exporter. Only relevant when compressed textures have to be exported.
   *
   * Depending on whether you use {@link WebGLRenderer} or {@link WebGPURenderer}, you must inject the
   * corresponding texture utils {@link WebGLTextureUtils} or {@link WebGPUTextureUtils}.
   *
   * @param {WebGLTextureUtils|WebGPUTextureUtils} utils - The texture utils.
   */
  setTextureUtils(e) {
    this.textureUtils = e;
  }
  /**
   * Parse the given 3D object and generates the USDZ output.
   *
   * @param {Object3D} scene - The 3D object to export.
   * @param {USDZExporter~OnDone} onDone - A callback function that is executed when the export has finished.
   * @param {USDZExporter~OnError} onError - A callback function that is executed when an error happens.
   * @param {USDZExporter~Options} options - The export options.
   */
  parse(e, t, s, i) {
    this.parseAsync(e, i).then(t).catch(s);
  }
  /**
   * Async version of {@link USDZExporter#parse}.
   *
   * @async
   * @param {Object3D} scene - The 3D object to export.
   * @param {USDZExporter~Options} options - The export options.
   * @return {Promise<ArrayBuffer>} A Promise that resolved with the exported USDZ data.
   */
  async parseAsync(e, t = {}) {
    t = Object.assign(
      {
        ar: {
          anchoring: { type: "plane" },
          planeAnchoring: { alignment: "horizontal" }
        },
        includeAnchoringProperties: !0,
        onlyVisible: !0,
        quickLookCompatible: !1,
        maxTextureSize: 1024
      },
      t
    );
    const s = /* @__PURE__ */ new Set(), i = {}, n = "model.usda";
    i[n] = null;
    const r = new Ae("Root", "Xform"), a = new Ae("Scenes", "Scope");
    a.addMetadata("kind", '"sceneLibrary"'), r.addChild(a);
    const l = "Scene", c = new Ae(l, "Xform");
    c.addMetadata("customData", [
      "bool preliminary_collidesWithEnvironment = 0",
      `string sceneName = "${l}"`
    ]), c.addMetadata("sceneName", `"${l}"`), t.includeAnchoringProperties && (c.addProperty(
      `token preliminary:anchoring:type = "${t.ar.anchoring.type}"`
    ), c.addProperty(
      `token preliminary:planeAnchoring:alignment = "${t.ar.planeAnchoring.alignment}"`
    )), a.addChild(c);
    let h;
    const A = {}, d = {};
    ta(e, c, A, s, i, t);
    const u = QA(
      A,
      d,
      t.quickLookCompatible
    );
    h = ea() + `
` + r.toString() + `

` + u.toString(), i[n] = Cs(h), h = null;
    for (const g in d) {
      let m = d[g];
      if (m.isCompressedTexture === !0) {
        if (this.textureUtils === null)
          throw new Error(
            "THREE.USDZExporter: setTextureUtils() must be called to process compressed textures."
          );
        m = await this.textureUtils.decompress(m);
      }
      const y = wA(
        m.image,
        m.flipY,
        t.maxTextureSize
      ), C = await new Promise(
        (E) => y.toBlob(E, "image/png", 1)
      );
      i[`textures/Texture_${g}.png`] = new Uint8Array(
        await C.arrayBuffer()
      );
    }
    let p = 0;
    for (const g in i) {
      const m = i[g], y = 34 + g.length;
      p += y;
      const C = p & 63;
      if (C !== 4) {
        const E = 64 - C, b = new Uint8Array(E);
        i[g] = [m, { extra: { 12345: b } }];
      }
      p = m.length;
    }
    return EA(i, { level: 0 });
  }
}
function Zo(o, e) {
  let t = o.name;
  return t = t.replace(/[^A-Za-z0-9_]/g, ""), /^[0-9]/.test(t) && (t = "_" + t), t === "" && (o.isCamera ? t = "Camera" : t = "Object"), e.has(t) && (t = t + "_" + o.id), e.add(t), t;
}
function wA(o, e, t) {
  if (typeof HTMLImageElement < "u" && o instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && o instanceof HTMLCanvasElement || typeof OffscreenCanvas < "u" && o instanceof OffscreenCanvas || typeof ImageBitmap < "u" && o instanceof ImageBitmap) {
    const s = t / Math.max(o.width, o.height), i = document.createElement("canvas");
    i.width = o.width * Math.min(1, s), i.height = o.height * Math.min(1, s);
    const n = i.getContext("2d");
    return e === !0 && (n.translate(0, i.height), n.scale(1, -1)), n.drawImage(o, 0, 0, i.width, i.height), i;
  } else
    throw new Error(
      "THREE.USDZExporter: No valid image data found. Unable to process texture."
    );
}
const le = 7;
function ea() {
  return `#usda 1.0
(
	customLayerData = {
		string creator = "Three.js USDZExporter"
	}
	defaultPrim = "Root"
	metersPerUnit = 1
	upAxis = "Y"
)
`;
}
function ta(o, e, t, s, i, n) {
  for (let r = 0, a = o.children.length; r < a; r++) {
    const l = o.children[r];
    if (l.visible === !1 && n.onlyVisible === !0) continue;
    let c;
    if (l.isMesh) {
      const h = l.geometry, A = l.material;
      if (A.isMeshStandardMaterial) {
        const d = "geometries/Geometry_" + h.id + ".usda";
        if (!(d in i)) {
          const u = SA(h);
          i[d] = Cs(
            ea() + `
` + u.toString()
          );
        }
        A.uuid in t || (t[A.uuid] = A), c = BA(
          l,
          h,
          t[A.uuid],
          s
        );
      } else
        console.warn(
          "THREE.USDZExporter: Unsupported material type (USDZ only supports MeshStandardMaterial)",
          l
        );
    } else l.isCamera ? c = kA(l, s) : c = sa(l, s);
    c && (e.addChild(c), ta(l, c, t, s, i, n));
  }
}
function sa(o, e) {
  const t = Zo(o, e), s = ia(o.matrix);
  o.matrix.determinant() < 0 && console.warn(
    "THREE.USDZExporter: USDZ does not support negative scales",
    o
  );
  const i = new Ae(t, "Xform");
  return i.addProperty(`matrix4d xformOp:transform = ${s}`), i.addProperty('uniform token[] xformOpOrder = ["xformOp:transform"]'), i;
}
function BA(o, e, t, s) {
  const i = sa(o, s);
  return i.addMetadata(
    "prepend references",
    `@./geometries/Geometry_${e.id}.usda@</Geometry>`
  ), i.addMetadata("prepend apiSchemas", '["MaterialBindingAPI"]'), i.addProperty(
    `rel material:binding = </Materials/Material_${t.id}>`
  ), i;
}
function ia(o) {
  const e = o.elements;
  return `( ${ns(e, 0)}, ${ns(
    e,
    4
  )}, ${ns(e, 8)}, ${ns(e, 12)} )`;
}
function ns(o, e) {
  return `(${o[e + 0]}, ${o[e + 1]}, ${o[e + 2]}, ${o[e + 3]})`;
}
function SA(o) {
  const e = new Ae("Geometry"), t = vA(o);
  return e.addChild(t), e;
}
function vA(o) {
  const e = "Geometry", t = o.attributes, s = t.position.count, i = new Ae(e, "Mesh");
  i.addProperty(
    `int[] faceVertexCounts = [${MA(o)}]`
  ), i.addProperty(
    `int[] faceVertexIndices = [${xA(o)}]`
  ), i.addProperty(
    `normal3f[] normals = [${hi(t.normal, s)}]`,
    ['interpolation = "vertex"']
  ), i.addProperty(
    `point3f[] points = [${hi(t.position, s)}]`
  );
  for (let r = 0; r < 4; r++) {
    const a = r > 0 ? r : "", l = t["uv" + a];
    l !== void 0 && i.addProperty(
      `texCoord2f[] primvars:st${a} = [${TA(l)}]`,
      ['interpolation = "vertex"']
    );
  }
  const n = t.color;
  return n !== void 0 && i.addProperty(
    `color3f[] primvars:displayColor = [${hi(
      n,
      s
    )}]`,
    ['interpolation = "vertex"']
  ), i.addProperty('uniform token subdivisionScheme = "none"'), i;
}
function MA(o) {
  const e = o.index !== null ? o.index.count : o.attributes.position.count;
  return Array(e / 3).fill(3).join(", ");
}
function xA(o) {
  const e = o.index, t = [];
  if (e !== null)
    for (let s = 0; s < e.count; s++)
      t.push(e.getX(s));
  else {
    const s = o.attributes.position.count;
    for (let i = 0; i < s; i++)
      t.push(i);
  }
  return t.join(", ");
}
function hi(o, e) {
  if (o === void 0)
    return console.warn("USDZExporter: Normals missing."), Array(e).fill("(0, 0, 0)").join(", ");
  const t = [];
  for (let s = 0; s < o.count; s++) {
    const i = o.getX(s), n = o.getY(s), r = o.getZ(s);
    t.push(
      `(${i.toPrecision(le)}, ${n.toPrecision(
        le
      )}, ${r.toPrecision(le)})`
    );
  }
  return t.join(", ");
}
function TA(o) {
  const e = [];
  for (let t = 0; t < o.count; t++) {
    const s = o.getX(t), i = o.getY(t);
    e.push(
      `(${s.toPrecision(le)}, ${1 - i.toPrecision(le)})`
    );
  }
  return e.join(", ");
}
function QA(o, e, t = !1) {
  const s = new Ae("Materials");
  for (const i in o) {
    const n = o[i];
    s.addChild(
      RA(n, e, t)
    );
  }
  return s;
}
function RA(o, e, t = !1) {
  const s = new Ae(`Material_${o.id}`, "Material");
  function i(r, a, l) {
    const c = r.source.id + "_" + r.flipY;
    e[c] = r;
    const h = r.channel > 0 ? "st" + r.channel : "st", A = {
      1e3: "repeat",
      // RepeatWrapping
      1001: "clamp",
      // ClampToEdgeWrapping
      1002: "mirror"
      // MirroredRepeatWrapping
    }, d = r.repeat.clone(), u = r.offset.clone(), p = r.rotation, g = Math.sin(p), m = Math.cos(p);
    u.y = 1 - u.y - d.y, t ? (u.x = u.x / d.x, u.y = u.y / d.y, u.x += g / d.x, u.y += m - 1) : (u.x += g * d.x, u.y += (1 - m) * d.y);
    const y = new Ae(`PrimvarReader_${a}`, "Shader");
    y.addProperty(
      'uniform token info:id = "UsdPrimvarReader_float2"'
    ), y.addProperty("float2 inputs:fallback = (0.0, 0.0)"), y.addProperty(`token inputs:varname = "${h}"`), y.addProperty("float2 outputs:result");
    const C = new Ae(`Transform2d_${a}`, "Shader");
    C.addProperty('uniform token info:id = "UsdTransform2d"'), C.addProperty(
      `token inputs:in.connect = </Materials/Material_${o.id}/PrimvarReader_${a}.outputs:result>`
    ), C.addProperty(
      `float inputs:rotation = ${(p * (180 / Math.PI)).toFixed(
        le
      )}`
    ), C.addProperty(
      `float2 inputs:scale = ${gr(d)}`
    ), C.addProperty(
      `float2 inputs:translation = ${gr(u)}`
    ), C.addProperty("float2 outputs:result");
    const E = new Ae(
      `Texture_${r.id}_${a}`,
      "Shader"
    );
    return E.addProperty('uniform token info:id = "UsdUVTexture"'), E.addProperty(`asset inputs:file = @textures/Texture_${c}.png@`), E.addProperty(
      `float2 inputs:st.connect = </Materials/Material_${o.id}/Transform2d_${a}.outputs:result>`
    ), l !== void 0 && E.addProperty(`float4 inputs:scale = ${LA(l)}`), E.addProperty(
      `token inputs:sourceColorSpace = "${r.colorSpace === bi ? "raw" : "sRGB"}"`
    ), E.addProperty(
      `token inputs:wrapS = "${A[r.wrapS]}"`
    ), E.addProperty(
      `token inputs:wrapT = "${A[r.wrapT]}"`
    ), E.addProperty("float outputs:r"), E.addProperty("float outputs:g"), E.addProperty("float outputs:b"), E.addProperty("float3 outputs:rgb"), (o.transparent || o.alphaTest > 0) && E.addProperty("float outputs:a"), [y, C, E];
  }
  o.side === Qr && console.warn(
    "THREE.USDZExporter: USDZ does not support double sided materials",
    o
  );
  const n = new Ae("PreviewSurface", "Shader");
  if (n.addProperty('uniform token info:id = "UsdPreviewSurface"'), o.map !== null ? (n.addProperty(
    `color3f inputs:diffuseColor.connect = </Materials/Material_${o.id}/Texture_${o.map.id}_diffuse.outputs:rgb>`
  ), o.transparent ? n.addProperty(
    `float inputs:opacity.connect = </Materials/Material_${o.id}/Texture_${o.map.id}_diffuse.outputs:a>`
  ) : o.alphaTest > 0 && (n.addProperty(
    `float inputs:opacity.connect = </Materials/Material_${o.id}/Texture_${o.map.id}_diffuse.outputs:a>`
  ), n.addProperty(
    `float inputs:opacityThreshold = ${o.alphaTest}`
  )), i(
    o.map,
    "diffuse",
    o.color
  ).forEach((a) => s.addChild(a))) : n.addProperty(
    `color3f inputs:diffuseColor = ${pr(o.color)}`
  ), o.emissiveMap !== null) {
    n.addProperty(
      `color3f inputs:emissiveColor.connect = </Materials/Material_${o.id}/Texture_${o.emissiveMap.id}_emissive.outputs:rgb>`
    );
    const r = new se(
      o.emissive.r * o.emissiveIntensity,
      o.emissive.g * o.emissiveIntensity,
      o.emissive.b * o.emissiveIntensity
    );
    i(
      o.emissiveMap,
      "emissive",
      r
    ).forEach((l) => s.addChild(l));
  } else o.emissive.getHex() > 0 && n.addProperty(
    `color3f inputs:emissiveColor = ${pr(o.emissive)}`
  );
  if (o.normalMap !== null && (n.addProperty(
    `normal3f inputs:normal.connect = </Materials/Material_${o.id}/Texture_${o.normalMap.id}_normal.outputs:rgb>`
  ), i(o.normalMap, "normal").forEach((a) => s.addChild(a))), o.aoMap !== null) {
    n.addProperty(
      `float inputs:occlusion.connect = </Materials/Material_${o.id}/Texture_${o.aoMap.id}_occlusion.outputs:r>`
    );
    const r = new se(
      o.aoMapIntensity,
      o.aoMapIntensity,
      o.aoMapIntensity
    );
    i(
      o.aoMap,
      "occlusion",
      r
    ).forEach((l) => s.addChild(l));
  }
  if (o.roughnessMap !== null) {
    n.addProperty(
      `float inputs:roughness.connect = </Materials/Material_${o.id}/Texture_${o.roughnessMap.id}_roughness.outputs:g>`
    );
    const r = new se(
      o.roughness,
      o.roughness,
      o.roughness
    );
    i(
      o.roughnessMap,
      "roughness",
      r
    ).forEach((l) => s.addChild(l));
  } else
    n.addProperty(
      `float inputs:roughness = ${o.roughness}`
    );
  if (o.metalnessMap !== null) {
    n.addProperty(
      `float inputs:metallic.connect = </Materials/Material_${o.id}/Texture_${o.metalnessMap.id}_metallic.outputs:b>`
    );
    const r = new se(
      o.metalness,
      o.metalness,
      o.metalness
    );
    i(
      o.metalnessMap,
      "metallic",
      r
    ).forEach((l) => s.addChild(l));
  } else
    n.addProperty(
      `float inputs:metallic = ${o.metalness}`
    );
  if (o.alphaMap !== null ? (n.addProperty(
    `float inputs:opacity.connect = </Materials/Material_${o.id}/Texture_${o.alphaMap.id}_opacity.outputs:r>`
  ), n.addProperty("float inputs:opacityThreshold = 0.0001"), i(o.alphaMap, "opacity").forEach((a) => s.addChild(a))) : n.addProperty(
    `float inputs:opacity = ${o.opacity}`
  ), o.isMeshPhysicalMaterial) {
    if (o.clearcoatMap !== null) {
      n.addProperty(
        `float inputs:clearcoat.connect = </Materials/Material_${o.id}/Texture_${o.clearcoatMap.id}_clearcoat.outputs:r>`
      );
      const r = new se(
        o.clearcoat,
        o.clearcoat,
        o.clearcoat
      );
      i(
        o.clearcoatMap,
        "clearcoat",
        r
      ).forEach((l) => s.addChild(l));
    } else
      n.addProperty(
        `float inputs:clearcoat = ${o.clearcoat}`
      );
    if (o.clearcoatRoughnessMap !== null) {
      n.addProperty(
        `float inputs:clearcoatRoughness.connect = </Materials/Material_${o.id}/Texture_${o.clearcoatRoughnessMap.id}_clearcoatRoughness.outputs:g>`
      );
      const r = new se(
        o.clearcoatRoughness,
        o.clearcoatRoughness,
        o.clearcoatRoughness
      );
      i(
        o.clearcoatRoughnessMap,
        "clearcoatRoughness",
        r
      ).forEach((l) => s.addChild(l));
    } else
      n.addProperty(
        `float inputs:clearcoatRoughness = ${o.clearcoatRoughness}`
      );
    n.addProperty(`float inputs:ior = ${o.ior}`);
  }
  return n.addProperty("int inputs:useSpecularWorkflow = 0"), n.addProperty("token outputs:surface"), s.addChild(n), s.addProperty(
    `token outputs:surface.connect = </Materials/Material_${o.id}/PreviewSurface.outputs:surface>`
  ), s;
}
function pr(o) {
  return `(${o.r}, ${o.g}, ${o.b})`;
}
function LA(o) {
  return `(${o.r}, ${o.g}, ${o.b}, 1.0)`;
}
function gr(o) {
  return `(${o.x}, ${o.y})`;
}
function kA(o, e) {
  const t = Zo(o, e), s = ia(o.matrix);
  o.matrix.determinant() < 0 && console.warn(
    "THREE.USDZExporter: USDZ does not support negative scales",
    o
  );
  const i = new Ae(t, "Camera");
  i.addProperty(`matrix4d xformOp:transform = ${s}`), i.addProperty('uniform token[] xformOpOrder = ["xformOp:transform"]');
  const n = o.isOrthographicCamera ? "orthographic" : "perspective";
  i.addProperty(`token projection = "${n}"`);
  const r = `(${o.near.toPrecision(
    le
  )}, ${o.far.toPrecision(le)})`;
  i.addProperty(`float2 clippingRange = ${r}`);
  let a;
  o.isOrthographicCamera ? a = ((Math.abs(o.left) + Math.abs(o.right)) * 10).toPrecision(le) : a = o.getFilmWidth().toPrecision(le), i.addProperty(`float horizontalAperture = ${a}`);
  let l;
  if (o.isOrthographicCamera ? l = ((Math.abs(o.top) + Math.abs(o.bottom)) * 10).toPrecision(le) : l = o.getFilmHeight().toPrecision(le), i.addProperty(`float verticalAperture = ${l}`), o.isPerspectiveCamera) {
    const c = o.getFocalLength().toPrecision(le);
    i.addProperty(`float focalLength = ${c}`);
    const h = o.focus.toPrecision(le);
    i.addProperty(`float focusDistance = ${h}`);
  }
  return i;
}
class DA {
  constructor(e, t, s, i = null) {
    this.renderer = e, this.camera = t, this.scene = s, this.container = i || document.body, this.isARSupported = !1, this.isARPresenting = !1, this.isQuest2 = !1, this.isQuest3 = !1, this.arButton = null, this.quickLookButton = null, this.quickLookImage = null, this.buttonObserver = null, this.onSessionStart = null, this.onSessionEnd = null, this.quickLookModel = null, this.quickLookExporter = null, this.quickLookBlobUrl = null, this.quickLookPreparePromise = null, this.quickLookExportToken = 0, this.quickLookInitialized = !1, this.quickLookPendingOpen = !1, this.arSupportCheck = null, this.quickLookBlitGeometry = null, this.quickLookBlitMaterial = null, this.quickLookBlitMesh = null, this.quickLookBlitScene = null, this.quickLookBlitCamera = null, this.quickLookTransientTextures = /* @__PURE__ */ new Set(), this.renderControl = {
      pause: () => {
      },
      resume: () => {
      },
      restore: () => {
      }
    };
  }
  getARButtonMarkup() {
    return `<span class="ar-icon">👁️</span>${this.isHandheldDevice() ? "AR MODE" : "ENTER AR"}`;
  }
  isHandheldDevice() {
    try {
      const e = navigator.userAgent || "", t = navigator.maxTouchPoints > 0;
      return /android|iphone|ipad|ipod|mobile/i.test(e) || t;
    } catch {
      return !1;
    }
  }
  init() {
    this.renderer.xr.enabled = !0, this.removeExistingARButtons(), this.arSupportCheck = this.checkARSupported().then(() => {
      this.isARSupported ? document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
        this.createARButton();
      }) : this.createARButton() : this.isIOSQuickLookDevice() && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
        this.mountQuickLookButton();
      }) : this.mountQuickLookButton());
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
  isIOSQuickLookDevice() {
    try {
      const e = navigator.userAgent || "";
      return /iPad|iPhone|iPod/.test(e) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    } catch {
      return !1;
    }
  }
  getQuickLookMarkup(e = "Open in AR") {
    return `
      <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" alt="" aria-hidden="true">
      <span class="quick-look-button__label">${e}</span>
    `;
  }
  setQuickLookButtonState(e, t, s = "#") {
    if (!this.quickLookButton) return;
    this.quickLookButton.classList.add("is-visible"), this.quickLookButton.classList.toggle("is-loading", e === "loading"), this.quickLookButton.classList.toggle("is-disabled", e === "disabled"), this.quickLookButton.href = s;
    const i = this.quickLookButton.querySelector(".quick-look-button__label");
    i && (i.textContent = t), this.quickLookButton.setAttribute("aria-disabled", e === "disabled" ? "true" : "false");
  }
  revokeQuickLookUrl() {
    this.quickLookBlobUrl && (URL.revokeObjectURL(this.quickLookBlobUrl), this.quickLookBlobUrl = null);
  }
  setRenderControl(e = {}) {
    this.renderControl = {
      pause: typeof e.pause == "function" ? e.pause : () => {
      },
      resume: typeof e.resume == "function" ? e.resume : () => {
      },
      restore: typeof e.restore == "function" ? e.restore : () => {
      }
    };
  }
  getQuickLookTextureTargetSize(e) {
    const t = e?.image?.width || 1, s = e?.image?.height || 1, i = this.renderer?.capabilities?.maxTextureSize || 1 / 0, n = Math.min(i, this.isIOSQuickLookDevice() ? 4096 : 8192), r = this.isIOSQuickLookDevice() ? 16777216 : 67108864, a = Math.max(1, t * s), l = Math.min(1, n / Math.max(t, s)), c = Math.min(1, Math.sqrt(r / a)), h = Math.min(l, c);
    return {
      width: Math.max(1, Math.floor(t * h)),
      height: Math.max(1, Math.floor(s * h))
    };
  }
  ensureQuickLookBlitResources(e) {
    this.quickLookBlitGeometry || (this.quickLookBlitGeometry = new f.PlaneGeometry(2, 2, 1, 1)), this.quickLookBlitMaterial || (this.quickLookBlitMaterial = new f.ShaderMaterial({
      uniforms: {
        blitTexture: new f.Uniform(e)
      },
      vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 0.999999);
          }
        `,
      fragmentShader: `
          uniform sampler2D blitTexture;
          varying vec2 vUv;

          void main() {
            #ifdef IS_SRGB
              gl_FragColor = sRGBTransferOETF(texture2D(blitTexture, vUv));
            #else
              gl_FragColor = texture2D(blitTexture, vUv);
            #endif
          }
        `
    })), this.quickLookBlitMaterial.uniforms.blitTexture.value = e, this.quickLookBlitMaterial.defines = this.quickLookBlitMaterial.defines || {}, e.colorSpace === f.SRGBColorSpace ? this.quickLookBlitMaterial.defines.IS_SRGB = "" : delete this.quickLookBlitMaterial.defines.IS_SRGB, this.quickLookBlitMaterial.needsUpdate = !0, this.quickLookBlitMesh || (this.quickLookBlitMesh = new f.Mesh(this.quickLookBlitGeometry, this.quickLookBlitMaterial), this.quickLookBlitMesh.frustumCulled = !1), this.quickLookBlitScene || (this.quickLookBlitScene = new f.Scene(), this.quickLookBlitScene.add(this.quickLookBlitMesh)), this.quickLookBlitCamera || (this.quickLookBlitCamera = new f.OrthographicCamera(-1, 1, 1, -1, 0, 1));
  }
  async yieldQuickLookWork() {
    await new Promise((e) => requestAnimationFrame(() => e())), await new Promise((e) => setTimeout(e, 0));
  }
  cleanupQuickLookTransientTextures() {
    this.quickLookTransientTextures.forEach((e) => {
      const t = e?.image;
      e.dispose?.(), t && typeof t == "object" && "width" in t && "height" in t && (t.width = 0, t.height = 0);
    }), this.quickLookTransientTextures.clear();
  }
  textureUsesExactQuickLookTransform(e) {
    if (!e)
      return !1;
    const t = e.repeat && (e.repeat.x !== 1 || e.repeat.y !== 1), s = e.offset && (e.offset.x !== 0 || e.offset.y !== 0), i = e.rotation !== 0, n = e.center && (e.center.x !== 0 || e.center.y !== 0), r = e.channel > 0, a = e.matrixAutoUpdate === !1 && e.matrix && e.matrix.elements && (e.matrix.elements[0] !== 1 || e.matrix.elements[1] !== 0 || e.matrix.elements[2] !== 0 || e.matrix.elements[3] !== 0 || e.matrix.elements[4] !== 0 || e.matrix.elements[5] !== 1 || e.matrix.elements[6] !== 0 || e.matrix.elements[7] !== 0 || e.matrix.elements[8] !== 0 || e.matrix.elements[9] !== 0 || e.matrix.elements[10] !== 1 || e.matrix.elements[11] !== 0 || e.matrix.elements[12] !== 0 || e.matrix.elements[13] !== 0 || e.matrix.elements[14] !== 0 || e.matrix.elements[15] !== 1);
    return t || s || i || n || r || a;
  }
  shouldUseQuickLookCompatibilityWorkaround(e) {
    let t = !0;
    return e?.traverse?.((s) => {
      if (!t)
        return;
      (Array.isArray(s.material) ? s.material : [s.material]).filter(Boolean).forEach((n) => {
        t && Object.values(n).forEach((r) => {
          r?.isTexture && this.textureUsesExactQuickLookTransform(r) && (t = !1);
        });
      });
    }), t;
  }
  async decompressTextureForQuickLook(e) {
    if (!this.renderer)
      throw new Error("Quick Look export requires an active renderer.");
    this.ensureQuickLookBlitResources(e);
    const { width: t, height: s } = this.getQuickLookTextureTargetSize(e), i = this.renderer.getRenderTarget(), n = this.renderer.autoClear, r = new f.Vector4(), a = new f.Vector4(), l = this.renderer.getScissorTest();
    this.renderer.getViewport(r), this.renderer.getScissor(a);
    const c = new f.WebGLRenderTarget(t, s, {
      depthBuffer: !1,
      stencilBuffer: !1,
      generateMipmaps: !1
    });
    try {
      await this.yieldQuickLookWork(), this.renderer.autoClear = !0, this.renderer.setRenderTarget(c), this.renderer.setViewport(0, 0, t, s), this.renderer.setScissor(0, 0, t, s), this.renderer.setScissorTest(!1), this.renderer.clear(), this.renderer.render(this.quickLookBlitScene, this.quickLookBlitCamera);
      const h = new Uint8Array(t * s * 4);
      this.renderer.readRenderTargetPixels(c, 0, 0, t, s, h), await this.yieldQuickLookWork();
      const A = document.createElement("canvas");
      A.width = t, A.height = s;
      const d = A.getContext("2d");
      if (!d)
        throw new Error("Quick Look export could not create a 2D canvas context.");
      const u = new Uint8ClampedArray(h.length), p = t * 4;
      for (let y = 0; y < s; y += 1) {
        const C = y * p, E = (s - y - 1) * p;
        u.set(h.subarray(C, C + p), E);
      }
      const g = d.createImageData(t, s);
      g.data.set(u), d.putImageData(g, 0, 0);
      const m = new f.CanvasTexture(A);
      return m.flipY = !1, m.minFilter = e.minFilter, m.magFilter = e.magFilter, m.wrapS = e.wrapS, m.wrapT = e.wrapT, m.colorSpace = e.colorSpace, m.name = e.name, m.needsUpdate = !0, this.quickLookTransientTextures.add(m), m;
    } finally {
      c.dispose(), this.renderer.setRenderTarget(i), this.renderer.setViewport(r), this.renderer.setScissor(a), this.renderer.setScissorTest(l), this.renderer.autoClear = n;
    }
  }
  ensureQuickLookExporter() {
    return this.quickLookExporter ? this.quickLookExporter : (this.quickLookExporter = new IA(), this.quickLookExporter.setTextureUtils({
      decompress: (e) => this.decompressTextureForQuickLook(e)
    }), this.quickLookExporter);
  }
  createQuickLookButton() {
    if (this.quickLookButton)
      return this.quickLookButton;
    const e = document.createElement("a");
    return e.className = "quick-look-button", e.rel = "ar", e.href = "#", e.innerHTML = this.getQuickLookMarkup(), e.addEventListener("click", async (t) => {
      if (e.classList.contains("is-disabled") || e.classList.contains("is-loading")) {
        t.preventDefault();
        return;
      }
      if (!this.quickLookModel) {
        t.preventDefault(), this.quickLookPendingOpen = !0, this.setQuickLookButtonState("loading", "Loading model...");
        return;
      }
      if (this.quickLookBlobUrl)
        return;
      t.preventDefault(), await this.prepareQuickLookModel() && requestAnimationFrame(() => e.click());
    }), this.container.appendChild(e), this.quickLookButton = e, e;
  }
  mountQuickLookButton() {
    this.waitForARCSS().then(() => {
      this.createQuickLookButton(), this.quickLookPendingOpen && !this.quickLookModel ? this.setQuickLookButtonState("loading", "Loading model...") : this.setQuickLookButtonState("idle", "Open in AR");
    });
  }
  async initializeQuickLookIfNeeded() {
    this.quickLookInitialized || (this.arSupportCheck && await this.arSupportCheck, this.quickLookInitialized = !0, !(this.isARSupported || !this.isIOSQuickLookDevice()) && this.mountQuickLookButton());
  }
  setQuickLookModel(e) {
    if (this.quickLookModel = e, this.quickLookExportToken += 1, this.quickLookPreparePromise = null, this.revokeQuickLookUrl(), !e) {
      this.quickLookButton && !this.quickLookPendingOpen && this.setQuickLookButtonState("idle", "Open in AR");
      return;
    }
    this.initializeQuickLookIfNeeded().then(() => {
      this.quickLookButton && !this.isARSupported && this.isIOSQuickLookDevice() && (this.quickLookPendingOpen ? this.prepareQuickLookModel().then((t) => {
        t && this.quickLookButton && (this.quickLookPendingOpen = !1, requestAnimationFrame(() => this.quickLookButton.click()));
      }) : this.setQuickLookButtonState("idle", "Open in AR"));
    });
  }
  async prepareQuickLookModel() {
    if (!this.quickLookModel)
      return null;
    if (this.quickLookBlobUrl)
      return this.quickLookBlobUrl;
    if (this.quickLookPreparePromise)
      return this.quickLookPreparePromise;
    const e = ++this.quickLookExportToken;
    return this.revokeQuickLookUrl(), this.setQuickLookButtonState("loading", "Preparing AR..."), this.quickLookPreparePromise = (async () => {
      let t = null, s = null, i = !1, n = null;
      try {
        const r = this.ensureQuickLookExporter();
        this.renderControl.pause(), t = this.quickLookModel.parent, s = new f.Group();
        const a = this.shouldUseQuickLookCompatibilityWorkaround(this.quickLookModel);
        let l;
        if (t ? (i = !0, t.remove(this.quickLookModel), s.scale.setScalar(0.1), s.add(this.quickLookModel), s.updateMatrixWorld(!0), l = await r.parseAsync(s, {
          maxTextureSize: 1 / 0,
          quickLookCompatible: a
        })) : (n = this.quickLookModel.scale.clone(), this.quickLookModel.scale.multiplyScalar(0.1), this.quickLookModel.updateMatrixWorld(!0), l = await r.parseAsync(this.quickLookModel, {
          maxTextureSize: 1 / 0,
          quickLookCompatible: a
        })), e !== this.quickLookExportToken)
          return null;
        const c = new globalThis.Blob([l], { type: "model/vnd.usdz+zip" });
        return this.quickLookBlobUrl = URL.createObjectURL(c), this.quickLookPendingOpen = !1, this.setQuickLookButtonState("ready", "Open in AR", this.quickLookBlobUrl), this.quickLookBlobUrl;
      } catch (r) {
        return e !== this.quickLookExportToken || (console.error("Failed to prepare Quick Look model:", r), this.quickLookPendingOpen = !1, this.setQuickLookButtonState("idle", "Try AR Again")), null;
      } finally {
        this.cleanupQuickLookTransientTextures(), i && s && t && this.quickLookModel.parent === s ? (s.remove(this.quickLookModel), t.add(this.quickLookModel), this.quickLookModel.updateMatrixWorld(!0)) : !i && n && (this.quickLookModel.scale.copy(n), this.quickLookModel.updateMatrixWorld(!0)), this.renderControl.restore(), this.renderControl.resume(), e === this.quickLookExportToken && (this.quickLookPreparePromise = null);
      }
    })(), this.quickLookPreparePromise;
  }
  createARButton() {
    this.waitForARCSS().then(() => {
      const e = {
        requiredFeatures: ["local"],
        optionalFeatures: this.getOptionalFeatures()
      };
      this.arButton = oA.createButton(this.renderer, e), this.arButton.innerHTML = this.getARButtonMarkup(), this.arButton.className = "ar-button--glass ar-button-available", this.arButton.disabled = !1, this.arButton.style.cssText = `
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
      return t ? (t.style.display = "flex", t.style.visibility = "visible", t.style.opacity = "1", t.innerHTML = this.getARButtonMarkup(), t.classList.contains("ar-button--glass") || t.classList.add("ar-button--glass"), t.disabled = !1, t.classList.remove("ar-generic-disabled"), !0) : !1;
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
    this.buttonObserver && (this.buttonObserver.disconnect(), this.buttonObserver = null), this.arButton && this.arButton.parentNode && this.arButton.parentNode.removeChild(this.arButton), this.quickLookButton && this.quickLookButton.parentNode && this.quickLookButton.parentNode.removeChild(this.quickLookButton), this.revokeQuickLookUrl(), this.cleanupQuickLookTransientTextures(), this.isQuest2 = !1, this.isQuest3 = !1, this.isARSupported = !1, this.isARPresenting = !1;
  }
}
const fr = new V(), mr = new Q();
class br {
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
    let r;
    !n || !n.primitive || n.primitive === "sphere" ? r = new Vr(1, 10, 10) : n.primitive === "box" && (r = new Ja(1, 1, 1));
    const a = new Ui();
    this.handMesh = new _i(r, a, 30), this.handMesh.frustumCulled = !1, this.handMesh.instanceMatrix.setUsage(Wa), this.handMesh.castShadow = !0, this.handMesh.receiveShadow = !0, this.handModel.add(this.handMesh), this.joints = [
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
      n.visible && (mr.setScalar(n.jointRadius || 8e-3), fr.compose(n.position, n.quaternion, mr), this.handMesh.setMatrixAt(i, fr), s++);
    }
    this.handMesh.count = s, this.handMesh.instanceMatrix.needsUpdate = !0;
  }
}
const FA = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles/generic-hand/";
class PA {
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
  constructor(e, t, s, i, n = null, r = null) {
    this.controller = t, this.handModel = e, this.bones = [], n === null && (n = new tt(), n.setPath(s || FA)), n.load(`${i}.glb`, (a) => {
      const l = a.scene.children[0];
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
      ].forEach((A) => {
        const d = l.getObjectByName(A);
        d !== void 0 ? d.jointName = A : console.warn(`Couldn't find ${A} in ${i} hand mesh`), this.bones.push(d);
      }), r && r(l);
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
class _A extends Is {
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
class UA {
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
    const s = new _A(e);
    return e.addEventListener("connected", (i) => {
      const n = i.data;
      n.hand && !s.motionController && (s.xrInputSource = n, t === void 0 || t === "spheres" ? s.motionController = new br(s, e, this.path, n.handedness, { primitive: "sphere" }) : t === "boxes" ? s.motionController = new br(s, e, this.path, n.handedness, { primitive: "box" }) : t === "mesh" && (s.motionController = new PA(s, e, this.path, n.handedness, this.gltfLoader, this.onLoad))), e.visible = !0;
    }), e.addEventListener("disconnected", () => {
      e.visible = !1;
    }), s;
  }
}
class GA {
  constructor(e) {
    this.renderer = e, this.handModelFactory = new UA(), this.hand1 = null, this.hand2 = null, this.interactionEnabled = !0, this.dragging = !1, this.scaling = !1, this.rotating = !1, this.dragStartPos = new f.Vector3(), this.scaleStartDistance = 0, this.rotateStartAngle = 0, this.pinchIntent = {
      hand1Start: 0,
      hand2Start: 0,
      delay: 100
    }, this.inertiaActive = !1, this.posVelocity = new f.Vector3(), this.rotVelocity = 0, this.scaleVelocity = 0, this.POSITION_DAMPING = 100, this.ROTATION_DAMPING = 8, this.SCALE_DAMPING = 8, this.MAX_ROT_VELOCITY = Math.PI, this.MAX_SCALE_VELOCITY = 0.5, this.MIN_SCALE = 0.01, this.MAX_SCALE = 1, this.VELOCITY_DEAD_ZONE = 1e-3, this.DISTANCE_GAIN_THRESHOLD = 5, this.MAX_DISTANCE_GAIN = 3, this.MAX_DELTA_PER_FRAME = 0.5, this.VELOCITY_SMOOTHING = 0.3, this.tempVec1 = new f.Vector3(), this.tempVec2 = new f.Vector3(), this.onGestureStart = null, this.onGestureEnd = null;
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
    const i = this.hand1.joints?.["index-finger-tip"], n = this.hand2.joints?.["index-finger-tip"];
    if (!i || !n) {
      (this.dragging || this.scaling || this.rotating) && this.onPinchEnd();
      return;
    }
    const r = performance.now(), a = this.hand1.userData.pinch && r - this.pinchIntent.hand1Start >= this.pinchIntent.delay, l = this.hand2.userData.pinch && r - this.pinchIntent.hand2Start >= this.pinchIntent.delay;
    if (a && !this.hand2.userData.pinch || l && !this.hand1.userData.pinch) {
      const h = (a ? this.hand1 : this.hand2).joints["index-finger-tip"];
      if (!this.dragging)
        (this.scaling || this.rotating) && (this.rotVelocity = 0, this.scaleVelocity = 0), this.dragging = !0, this.scaling = !1, this.rotating = !1, h.getWorldPosition(this.dragStartPos), this.onGestureStart && this.onGestureStart("drag");
      else {
        h.getWorldPosition(this.tempVec1);
        const A = this.tempVec1.clone().sub(this.dragStartPos);
        if (A.length() > this.MAX_DELTA_PER_FRAME && A.normalize().multiplyScalar(this.MAX_DELTA_PER_FRAME), s) {
          const d = s.position.distanceTo(t.position);
          if (d > this.DISTANCE_GAIN_THRESHOLD) {
            const u = Math.min(
              this.MAX_DISTANCE_GAIN,
              1 + (d - this.DISTANCE_GAIN_THRESHOLD) / 7.5
            );
            A.multiplyScalar(u);
          }
        }
        if (t.position.add(A), e > 0) {
          const d = A.clone().divideScalar(e);
          this.posVelocity.lerp(d, this.VELOCITY_SMOOTHING);
        }
        this.dragStartPos.copy(this.tempVec1);
      }
    } else if (a && l)
      if (i.getWorldPosition(this.tempVec1), n.getWorldPosition(this.tempVec2), !this.scaling && !this.rotating) {
        this.dragging = !1, this.scaling = !0, this.rotating = !0, this.scaleStartDistance = this.tempVec1.distanceTo(this.tempVec2);
        const c = this.tempVec2.x - this.tempVec1.x, h = this.tempVec2.z - this.tempVec1.z;
        this.rotateStartAngle = Math.atan2(h, c), this.onGestureStart && this.onGestureStart("two-hand");
      } else {
        const c = this.tempVec1.distanceTo(this.tempVec2), h = c / this.scaleStartDistance, A = Math.log(t.scale.x), d = Math.log(h), u = A + d, p = Math.max(this.MIN_SCALE, Math.min(this.MAX_SCALE, Math.exp(u)));
        if (t.scale.setScalar(p), e > 0) {
          const E = d / e, b = Math.max(-this.MAX_SCALE_VELOCITY, Math.min(this.MAX_SCALE_VELOCITY, E));
          this.scaleVelocity = this.scaleVelocity * (1 - this.VELOCITY_SMOOTHING) + b * this.VELOCITY_SMOOTHING;
        }
        this.scaleStartDistance = c;
        const g = this.tempVec2.x - this.tempVec1.x, m = this.tempVec2.z - this.tempVec1.z, y = Math.atan2(m, g);
        let C = y - this.rotateStartAngle;
        if (C > Math.PI && (C -= 2 * Math.PI), C < -Math.PI && (C += 2 * Math.PI), t.rotation.y -= C, e > 0) {
          const E = -C / e, b = Math.max(-this.MAX_ROT_VELOCITY, Math.min(this.MAX_ROT_VELOCITY, E));
          this.rotVelocity = this.rotVelocity * (1 - this.VELOCITY_SMOOTHING) + b * this.VELOCITY_SMOOTHING;
        }
        this.rotateStartAngle = y;
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
    const a = Math.log(t.scale.x) + this.scaleVelocity * e, l = Math.max(this.MIN_SCALE, Math.min(this.MAX_SCALE, Math.exp(a)));
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
class NA extends Pt {
  constructor(e, t, s, i = {}, n = null) {
    super(), this.renderer = e, this.camera = t, this.scene = s, this.config = {
      enableHandTracking: !0,
      enableWorldCube: !0,
      defaultScale: 0.05,
      worldCubeSize: 1e3,
      worldCubeOpacity: 0.1,
      ...i
    }, this.container = n, this.arCore = new DA(e, t, s, n), this.handTracking = this.config.enableHandTracking ? new GA(e) : null, this.modelGroup = new f.Group(), this.modelGroup.name = "AR Model Group", this.scene.add(this.modelGroup), this.currentModel = null, this.pendingModel = null, this.pendingModelConfig = null, this.currentModelScale = this.config.defaultScale, this.worldCube = null, this.config.enableWorldCube && this.createWorldCube(), this.isARPresenting = !1, this.previousGestureType = null, this.init();
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
    this.prepareModel(e, t), this.arCore && this.arCore.setQuickLookModel(e);
  }
  setRenderControl(e) {
    this.arCore && this.arCore.setRenderControl(e);
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
class Cr {
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
      let s = 0, i = 0, n = 0, r = 0;
      t.traverse((l) => {
        const c = l.geometry?.getAttribute?.("position");
        if (!c) return;
        s += 1;
        const h = l.isInstancedMesh ? c.count * l.count : c.count;
        n += h, l.visible && (i += 1, r += h);
      });
      const a = {
        meshes: s,
        visibleMeshes: i,
        vertices: n,
        visibleVertices: r
      };
      return console.log("🔢 Scene vertex counts:"), console.table(a), a;
    }, window.models = () => {
      const t = e.getLoadedModels();
      if (t.length === 0)
        return console.log("📦 No models loaded"), [];
      const s = t.map((i, n) => {
        const r = i.model, a = r.userData.boundingBox;
        return {
          index: n,
          url: i.url,
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
          visible: r.visible,
          children: r.children.length
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
    }, window.tiles = (t) => {
      const s = e.tilesetLoader, n = e.renderer?.info;
      if (!s)
        return console.log("No tileset loader active"), null;
      const r = e._smoothedFrameTimeMs > 0 ? Math.round(1e3 / e._smoothedFrameTimeMs) : "?", a = e._smoothedFrameTimeMs?.toFixed(1) || "?", l = n?.render?.triangles || 0, c = n?.render?.calls || 0, h = [];
      s.activeTilesets.forEach((d) => {
        const u = s.tilesetStates.get(d);
        h.push({
          errorTarget: d.errorTarget?.toFixed(2),
          maxTilesProcessed: d.maxTilesProcessed,
          pendingQueue: s.pendingQueueTasks.length,
          maxTriangles: u?.maxTriangles || "none"
        });
      });
      const A = {
        fps: r,
        frameTimeMs: a,
        triangles: l,
        drawCalls: c,
        tilesets: h
      };
      return console.log("🧱 Tile streaming stats:"), console.log(`  FPS: ${r} (${a}ms)`), console.log(`  Triangles: ${(l / 1e6).toFixed(2)}M`), console.log(`  Draw calls: ${c}`), h.forEach((d, u) => {
        console.log(`  Tileset ${u}: errorTarget=${d.errorTarget}, maxTilesProcessed=${d.maxTilesProcessed}, pending=${d.pendingQueue}`);
      }), t !== void 0 && (e._vrStatsEnabled = !!t, console.log(`  VR stats panel: ${t ? "enabled" : "disabled"}`)), A;
    }, window.debugHelp = () => {
      console.log("🔧 BelowJS Debug Commands:"), console.log("  camera()    - Get current camera position data"), console.log("  scene()     - Get scene information and object counts"), console.log("  vertices()  - Get scene vertex counts"), console.log("  models()    - Get loaded models information"), console.log("  particles() - Get particle system information"), console.log("  vr()        - Get VR state and settings"), console.log("  stereo()    - Get/set stereo mode and eye separation"), console.log("  tiles()     - Get tile streaming stats; tiles(true/false) toggles VR panel"), console.log("  debugHelp() - Show this help message"), console.log(""), console.log("Global objects:"), console.log("  belowViewer - Direct access to BelowViewer instance");
    });
  }
  /**
   * Clean up debug commands when viewer is disposed
   */
  static cleanup() {
    typeof window > "u" || (delete window.camera, delete window.scene, delete window.vertices, delete window.models, delete window.particles, delete window.vr, delete window.stereo, delete window.tiles, delete window.debugHelp, delete window.belowViewer);
  }
}
class VA extends Pt {
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
    this.config = new Ms(s).validate(t), this.renderer = null, this.sceneManager = null, this.cameraManager = null, this.modelLoader = null, this.tilesetLoader = null, this.vrManager = null, this.arManager = null, this.stereoCamera = null, this.isVREnabled = this.config.vr?.enabled !== !1, this.isAREnabled = this.config.ar?.enabled === !0, this.stereoEnabled = this.config.stereo?.enabled === !0, this.stereoMode = this.config.stereo?.mode || "sbs";
    const i = this.config.stereo?.eyeSeparation ?? 0.064;
    this.stereoEyeSeparation = Math.max(0.05, Math.min(0.07, i)), this.stereoEyeSeparation !== i && console.warn(`[BelowJS] Initial eye separation ${i}m clamped to ${this.stereoEyeSeparation}m (comfortable range for screens: 0.050-0.070m)`), this.dolly = null, this.isInitialized = !1, this.loadedModels = [], this.currentAbortController = null, this.skipRenderDuringLoad = !1, this.pixelRatioBeforeThrottle = 1, this.originalPixelRatio = 1, this.isConstrainedSafari = !1, this.renderPauseDepth = 0, this.init();
  }
  init() {
    try {
      this.initRenderer(), this.sceneManager = new el(this.config.scene), this.cameraManager = new gl(this.config.camera), this.modelLoader = new ae(this.renderer), this.tilesetLoader = new Vh(this.renderer, this.cameraManager.camera), this.isConstrainedSafari = this.modelLoader?.isIOSWebKit || !1, this.initStereo(), this.renderer?.getPixelRatio ? this.originalPixelRatio = this.renderer.getPixelRatio() : typeof window < "u" && (this.originalPixelRatio = window.devicePixelRatio || 1), this.pixelRatioBeforeThrottle = this.originalPixelRatio, this.isVREnabled && this.initVR(), this.isAREnabled && this.initAR(), this.cameraManager.initControls(this.renderer.domElement), this.setupEventListeners(), this.startRenderLoop(), this.isInitialized = !0, typeof window < "u" && Cr.init(this), this.emit("initialized");
    } catch (e) {
      console.error("Failed to initialize BelowViewer:", e), this.emit("error", e);
    }
  }
  initRenderer() {
    this.renderer = new f.WebGLRenderer({
      antialias: this.config.renderer.antialias,
      alpha: this.config.renderer.alpha,
      powerPreference: this.config.renderer.powerPreference,
      logarithmicDepthBuffer: this.config.renderer.logarithmicDepthBuffer,
      preserveDrawingBuffer: !0
    }), this.renderer.setSize(this.container.clientWidth, this.container.clientHeight), this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = f.PCFSoftShadowMap, this.renderer.outputColorSpace = f.SRGBColorSpace;
    const e = {
      none: f.NoToneMapping,
      linear: f.LinearToneMapping,
      reinhard: f.ReinhardToneMapping,
      cineon: f.CineonToneMapping,
      "aces-filmic": f.ACESFilmicToneMapping
    };
    this.config.renderer.toneMapping && e[this.config.renderer.toneMapping] && (this.renderer.toneMapping = e[this.config.renderer.toneMapping]), this.renderer.toneMappingExposure = this.config.renderer.toneMappingExposure, this.container.appendChild(this.renderer.domElement);
  }
  initStereo() {
    this.stereoCamera || (this.stereoCamera = new f.StereoCamera()), this.stereoCamera.eyeSep = this.stereoEyeSeparation;
  }
  initVR() {
    this.dolly = new f.Group(), this.dolly.add(this.cameraManager.camera), this.sceneManager.scene.add(this.dolly);
    const e = this.config.audioPath || "./sound/", t = this.config.enableVRAudio === !0;
    this.vrManager = new rA(this.renderer, this.cameraManager.camera, this.sceneManager.scene, e, t, this.container), this.vrManager.setControls(this.cameraManager.controls), this.config.initialPositions && this.vrManager.setInitialPositions(this.config.initialPositions), this.vrManager.onModeToggle = () => {
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
    this.arManager = new NA(
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
    }), this.arManager.setRenderControl({
      pause: () => this.pauseRendering(),
      resume: () => this.resumeRendering(),
      restore: () => this.restoreRendererSurface()
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
  pauseRendering() {
    this.renderPauseDepth += 1;
  }
  resumeRendering() {
    this.renderPauseDepth = Math.max(0, this.renderPauseDepth - 1);
  }
  restoreRendererSurface() {
    if (!this.isInitialized || !this.renderer || !this.cameraManager)
      return;
    const e = this.container.clientWidth, t = this.container.clientHeight;
    this.cameraManager.setSize(e, t), this.renderer.setSize(e, t), this.tilesetLoader && this.tilesetLoader.updateResolution();
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
      const n = (h) => {
        s.aborted || this.emit("model-load-progress", { url: e, progress: h });
      }, r = (h) => {
        s.aborted || this.emit("model-load-stage", { url: e, stage: h });
      };
      let a, l = null;
      if (t.type === "tileset") {
        r && r("downloading");
        const h = await this.tilesetLoader.load(e, {
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
        a = h.group, l = h.tileset, r && r("processing");
      } else
        a = await this.modelLoader.load(e, n, s, r);
      if (s.aborted)
        return null;
      t.position && a.position.fromArray(t.position), t.rotation && a.rotation.fromArray(t.rotation), t.scale && (typeof t.scale == "number" ? a.scale.setScalar(t.scale) : a.scale.fromArray(t.scale));
      const c = this.centerModelAndRecalculateBounds(a);
      return this.sceneManager.add(a), this.loadedModels.push({ model: a, url: e, options: t, originalCenter: c, tileset: l }), this.loadedModels.length === 1 && t.autoFrame !== !1 && this.frameModel(a), this.currentAbortController && this.currentAbortController.signal === s && (this.currentAbortController = null), r && r("completed"), this.emit("model-loaded", { model: a, url: e }), a;
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
    const s = t.getSize(new f.Vector3()), i = t.getCenter(new f.Vector3());
    this.cameraManager.frameObject(i, s);
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
    let e = 0, t = 0, s = 16;
    const i = new f.Quaternion();
    let n = !1;
    this._smoothedFrameTimeMs = 16;
    const r = (a) => {
      if (this.renderPauseDepth > 0)
        return;
      const l = Math.min((a - e) / 1e3, 0.1);
      e = a;
      const c = l * 1e3;
      c > 0 && c < 200 && (s = s * 0.75 + c * 0.25, this._smoothedFrameTimeMs = s), this.vrManager && this.vrManager.update(l), this.arManager && this.arManager.update(l * 1e3), this.cameraManager && this.cameraManager.update(), this.emit("before-render", l);
      const h = this.renderer?.xr?.isPresenting;
      if (this.renderer && this.sceneManager && this.cameraManager) {
        const A = () => {
          (!this.skipRenderDuringLoad || h) && (this.stereoEnabled && !h && this.stereoMode === "sbs" ? this.renderSbsStereo() : this.renderer.render(this.sceneManager.scene, this.cameraManager.camera));
        };
        if (h) {
          if (A(), this.tilesetLoader) {
            let u = this.vrManager?.getVRStatus?.().movement?.isMoving === !0;
            const p = this.renderer.xr.getCamera(this.cameraManager.camera);
            if (p) {
              const C = p.quaternion;
              n && i.angleTo(C) > 0.01 && (u = !0), i.copy(C), n = !0;
            }
            const g = typeof performance < "u" && typeof performance.now == "function" ? performance.now() : a, m = u ? 28 : 14;
            g - t >= m && (this.tilesetLoader.update(p, {
              queueOptions: {
                maxTasks: u ? 1 : 2,
                timeBudgetMs: u ? 0.7 : 1.5
              },
              smoothedFrameTimeMs: s
            }), t = g);
          }
          if (this._vrStatsEnabled) {
            const d = this.renderer.xr.getCamera(this.cameraManager.camera);
            this.updateVRStatsPanel(d);
          }
        } else {
          if (this.tilesetLoader) {
            const d = this.cameraManager.camera;
            this.tilesetLoader.update(d, {
              queueOptions: {
                maxTasks: 16,
                timeBudgetMs: 6
              },
              smoothedFrameTimeMs: s
            });
          }
          A();
        }
      }
    };
    this.renderer.setAnimationLoop(r);
  }
  updateVRStatsPanel(e) {
    if (!this._vrStatsEnabled || !this.dolly) {
      this._vrStatsSprite && this._vrStatsSprite.parent && this._vrStatsSprite.parent.remove(this._vrStatsSprite);
      return;
    }
    const t = performance.now();
    if (this._vrStatsLastUpdate && t - this._vrStatsLastUpdate < 250)
      return;
    this._vrStatsLastUpdate = t;
    const s = this._smoothedFrameTimeMs > 0 ? Math.round(1e3 / this._smoothedFrameTimeMs) : 0, n = this.renderer?.info?.render?.triangles || 0;
    let r = "?";
    this.tilesetLoader && this.tilesetLoader.activeTilesets.forEach((l) => {
      r = l.errorTarget?.toFixed(1) || "?";
    }), this._vrStatsCanvas || (this._vrStatsCanvas = document.createElement("canvas"), this._vrStatsCanvas.width = 256, this._vrStatsCanvas.height = 128);
    const a = this._vrStatsCanvas.getContext("2d");
    if (a.clearRect(0, 0, 256, 128), a.fillStyle = "rgba(0, 0, 0, 0.7)", a.beginPath(), a.roundRect(4, 4, 248, 120, 8), a.fill(), a.font = "bold 28px monospace", a.fillStyle = s >= 65 ? "#00ff00" : s >= 45 ? "#ffff00" : "#ff4444", a.fillText(`${s} FPS`, 16, 40), a.font = "18px monospace", a.fillStyle = "#cccccc", a.fillText(`Tris: ${(n / 1e6).toFixed(2)}M`, 16, 70), a.fillText(`Error: ${r}`, 16, 95), this._vrStatsTexture ? this._vrStatsTexture.needsUpdate = !0 : (this._vrStatsTexture = new f.CanvasTexture(this._vrStatsCanvas), this._vrStatsTexture.minFilter = f.LinearFilter, this._vrStatsTexture.magFilter = f.LinearFilter), !this._vrStatsSprite) {
      const l = new f.SpriteMaterial({
        map: this._vrStatsTexture,
        depthTest: !1,
        depthWrite: !1,
        transparent: !0
      });
      this._vrStatsSprite = new f.Sprite(l), this._vrStatsSprite.scale.set(0.3, 0.15, 1), this._vrStatsSprite.renderOrder = 9999;
    }
    if (this._vrStatsSprite.parent || this.dolly.add(this._vrStatsSprite), e) {
      const l = new f.Vector3(0, 0, -1).applyQuaternion(e.quaternion), c = new f.Vector3(1, 0, 0).applyQuaternion(e.quaternion), h = new f.Vector3(0, 1, 0).applyQuaternion(e.quaternion), A = e.position.clone().add(l.multiplyScalar(0.5)).add(c.multiplyScalar(-0.2)).add(h.multiplyScalar(-0.15));
      this._vrStatsSprite.position.copy(A), this._vrStatsSprite.quaternion.copy(e.quaternion);
    }
  }
  renderSbsStereo() {
    if (!this.stereoCamera || !this.renderer || !this.sceneManager || !this.cameraManager)
      return;
    const e = this.renderer.getSize(new f.Vector2()), t = e.width, s = e.height, i = Math.floor(t / 2), n = t - i;
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
      this.sceneManager.remove(e), i && this.tilesetLoader && this.tilesetLoader.disposeTileset(i), Js(e), this.loadedModels.splice(t, 1), this.emit("model-removed", { model: e }), !this.loadedModels.some((r) => r.url === s) && this.modelLoader && this.modelLoader.releaseFromCache(s);
    }
  }
  clearModels() {
    this.arManager && this.arManager.setTargetModel(null);
    const e = new Set(this.loadedModels.map(({ url: t }) => t));
    this.loadedModels.forEach(({ model: t, tileset: s }) => {
      s && this.tilesetLoader && this.tilesetLoader.disposeTileset(s), Js(t), this.sceneManager.remove(t);
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
    this.currentAbortController && this.currentAbortController.abort(), typeof window < "u" && Cr.cleanup(), this.vrManager && (this.vrManager.dispose(), this.vrManager = null), this.arManager && (this.arManager.dispose(), this.arManager = null), this.renderer && this.renderer.setAnimationLoop(null), this.loadedModels.forEach(({ model: e, tileset: t }) => {
      e.parent && e.parent.remove(e), t && this.tilesetLoader && this.tilesetLoader.disposeTileset(t), Js(e);
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
const yr = new ft(), rs = new Q();
class na extends Xa {
  /**
   * Constructs a new line segments geometry.
   */
  constructor() {
    super(), this.isLineSegmentsGeometry = !0, this.type = "LineSegmentsGeometry";
    const e = [-1, 2, 0, 1, 2, 0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0, 0, -1, -1, 0, 1, -1, 0], t = [-1, 2, 1, 2, -1, 1, 1, 1, -1, -1, 1, -1, -1, -2, 1, -2], s = [0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5];
    this.setIndex(s), this.setAttribute("position", new As(e, 3)), this.setAttribute("uv", new As(t, 2));
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
    const s = new Ii(t, 6, 1);
    return this.setAttribute("instanceStart", new Ye(s, 3, 0)), this.setAttribute("instanceEnd", new Ye(s, 3, 3)), this.instanceCount = this.attributes.instanceStart.count, this.computeBoundingBox(), this.computeBoundingSphere(), this;
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
    const s = new Ii(t, 6, 1);
    return this.setAttribute("instanceColorStart", new Ye(s, 3, 0)), this.setAttribute("instanceColorEnd", new Ye(s, 3, 3)), this;
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
    return this.fromWireframeGeometry(new $a(e.geometry)), this;
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
    this.boundingBox === null && (this.boundingBox = new ft());
    const e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
    e !== void 0 && t !== void 0 && (this.boundingBox.setFromBufferAttribute(e), yr.setFromBufferAttribute(t), this.boundingBox.union(yr));
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Ft()), this.boundingBox === null && this.computeBoundingBox();
    const e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
    if (e !== void 0 && t !== void 0) {
      const s = this.boundingSphere.center;
      this.boundingBox.getCenter(s);
      let i = 0;
      for (let n = 0, r = e.count; n < r; n++)
        rs.fromBufferAttribute(e, n), i = Math.max(i, s.distanceToSquared(rs)), rs.fromBufferAttribute(t, n), i = Math.max(i, s.distanceToSquared(rs));
      this.boundingSphere.radius = Math.sqrt(i), isNaN(this.boundingSphere.radius) && console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.", this);
    }
  }
  toJSON() {
  }
}
hs.line = {
  worldUnits: { value: 1 },
  linewidth: { value: 1 },
  resolution: { value: new U(1, 1) },
  dashOffset: { value: 0 },
  dashScale: { value: 1 },
  dashSize: { value: 1 },
  gapSize: { value: 1 }
  // todo FIX - maybe change to totalSize
};
cs.line = {
  uniforms: Or.merge([
    hs.common,
    hs.fog,
    hs.line
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
class ys extends Nr {
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
      uniforms: Or.clone(cs.line.uniforms),
      vertexShader: cs.line.vertexShader,
      fragmentShader: cs.line.fragmentShader,
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
const Ai = new mt(), Er = new Q(), Ir = new Q(), Y = new mt(), J = new mt(), we = new mt(), di = new Q(), ui = new V(), X = new Za(), wr = new Q(), os = new ft(), as = new Ft(), Be = new mt();
let Se, Xe;
function Br(o, e, t) {
  return Be.set(0, 0, -e, 1).applyMatrix4(o.projectionMatrix), Be.multiplyScalar(1 / Be.w), Be.x = Xe / t.width, Be.y = Xe / t.height, Be.applyMatrix4(o.projectionMatrixInverse), Be.multiplyScalar(1 / Be.w), Math.abs(Math.max(Be.x, Be.y));
}
function OA(o, e) {
  const t = o.matrixWorld, s = o.geometry, i = s.attributes.instanceStart, n = s.attributes.instanceEnd, r = Math.min(s.instanceCount, i.count);
  for (let a = 0, l = r; a < l; a++) {
    X.start.fromBufferAttribute(i, a), X.end.fromBufferAttribute(n, a), X.applyMatrix4(t);
    const c = new Q(), h = new Q();
    Se.distanceSqToSegment(X.start, X.end, h, c), h.distanceTo(c) < Xe * 0.5 && e.push({
      point: h,
      pointOnLine: c,
      distance: Se.origin.distanceTo(h),
      object: o,
      face: null,
      faceIndex: a,
      uv: null,
      uv1: null
    });
  }
}
function HA(o, e, t) {
  const s = e.projectionMatrix, n = o.material.resolution, r = o.matrixWorld, a = o.geometry, l = a.attributes.instanceStart, c = a.attributes.instanceEnd, h = Math.min(a.instanceCount, l.count), A = -e.near;
  Se.at(1, we), we.w = 1, we.applyMatrix4(e.matrixWorldInverse), we.applyMatrix4(s), we.multiplyScalar(1 / we.w), we.x *= n.x / 2, we.y *= n.y / 2, we.z = 0, di.copy(we), ui.multiplyMatrices(e.matrixWorldInverse, r);
  for (let d = 0, u = h; d < u; d++) {
    if (Y.fromBufferAttribute(l, d), J.fromBufferAttribute(c, d), Y.w = 1, J.w = 1, Y.applyMatrix4(ui), J.applyMatrix4(ui), Y.z > A && J.z > A)
      continue;
    if (Y.z > A) {
      const E = Y.z - J.z, b = (Y.z - A) / E;
      Y.lerp(J, b);
    } else if (J.z > A) {
      const E = J.z - Y.z, b = (J.z - A) / E;
      J.lerp(Y, b);
    }
    Y.applyMatrix4(s), J.applyMatrix4(s), Y.multiplyScalar(1 / Y.w), J.multiplyScalar(1 / J.w), Y.x *= n.x / 2, Y.y *= n.y / 2, J.x *= n.x / 2, J.y *= n.y / 2, X.start.copy(Y), X.start.z = 0, X.end.copy(J), X.end.z = 0;
    const g = X.closestPointToPointParameter(di, !0);
    X.at(g, wr);
    const m = gt.lerp(Y.z, J.z, g), y = m >= -1 && m <= 1, C = di.distanceTo(wr) < Xe * 0.5;
    if (y && C) {
      X.start.fromBufferAttribute(l, d), X.end.fromBufferAttribute(c, d), X.start.applyMatrix4(r), X.end.applyMatrix4(r);
      const E = new Q(), b = new Q();
      Se.distanceSqToSegment(X.start, X.end, b, E), t.push({
        point: b,
        pointOnLine: E,
        distance: Se.origin.distanceTo(b),
        object: o,
        face: null,
        faceIndex: d,
        uv: null,
        uv1: null
      });
    }
  }
}
class qA extends Ss {
  /**
   * Constructs a new wide line.
   *
   * @param {LineSegmentsGeometry} [geometry] - The line geometry.
   * @param {LineMaterial} [material] - The line material.
   */
  constructor(e = new na(), t = new ys({ color: Math.random() * 16777215 })) {
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
    for (let r = 0, a = 0, l = t.count; r < l; r++, a += 2)
      Er.fromBufferAttribute(t, r), Ir.fromBufferAttribute(s, r), i[a] = a === 0 ? 0 : i[a - 1], i[a + 1] = i[a] + Er.distanceTo(Ir);
    const n = new Ii(i, 2, 1);
    return e.setAttribute("instanceDistanceStart", new Ye(n, 1, 0)), e.setAttribute("instanceDistanceEnd", new Ye(n, 1, 1)), this;
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
    Se = e.ray;
    const r = this.matrixWorld, a = this.geometry, l = this.material;
    Xe = l.linewidth + n, a.boundingSphere === null && a.computeBoundingSphere(), as.copy(a.boundingSphere).applyMatrix4(r);
    let c;
    if (s)
      c = Xe * 0.5;
    else {
      const A = Math.max(i.near, as.distanceToPoint(Se.origin));
      c = Br(i, A, l.resolution);
    }
    if (as.radius += c, Se.intersectsSphere(as) === !1)
      return;
    a.boundingBox === null && a.computeBoundingBox(), os.copy(a.boundingBox).applyMatrix4(r);
    let h;
    if (s)
      h = Xe * 0.5;
    else {
      const A = Math.max(i.near, os.distanceToPoint(Se.origin));
      h = Br(i, A, l.resolution);
    }
    os.expandByScalar(h), Se.intersectsBox(os) !== !1 && (s ? OA(this, t) : HA(this, i, t));
  }
  onBeforeRender(e) {
    const t = this.material.uniforms;
    t && t.resolution && (e.getViewport(Ai), this.material.uniforms.resolution.value.set(Ai.z, Ai.w));
  }
}
class Di extends na {
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
class Sr extends qA {
  /**
   * Constructs a new wide line.
   *
   * @param {LineGeometry} [geometry] - The line geometry.
   * @param {LineMaterial} [material] - The line material.
   */
  constructor(e = new Di(), t = new ys({ color: Math.random() * 16777215 })) {
    super(e, t), this.isLine2 = !0, this.type = "Line2";
  }
}
class zA {
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
      const r = this.unifiedMeasurementPoints.some((c) => c.sphere === n.object), a = n.object === this.unifiedMeasurementLine, l = this.isMeasurementHelper(n.object);
      return !r && !a && !l;
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
  constructor({ scene: e, camera: t, renderer: s, controls: i, dolly: n, uiParent: r, getRaycastInfo: a, config: l = {}, theme: c = "dark", showMeasurementLabels: h = !1 }) {
    this.ghostSpheres = {
      left: null,
      right: null
    }, this.MAX_SPHERES = 2, this.measurementSpheres = [], this.measurementLine = null, this.measurementLabel = null, this.previousTriggerState = {}, this.unifiedMeasurementPoints = [], this.unifiedMeasurementLine = null, this.desktopMeasurementPoints = [], this.desktopMeasurementLine = null, typeof window < "u" && (window.measurementSystem = this), this.scene = e, this.camera = t, this.renderer = s, this.uiParent = r || null, this.getRaycastInfo = typeof a == "function" ? a : null, this.controls = i, this.dolly = n, this.config = l, this.theme = c, this.showMeasurementLabels = h, this._raycastTargets = e && e.children ? e.children : [], this.enabled = !0, this.isVR = !1, this.measurementPanel = null, this.desktopMeasurementMode = !1, this.measurementSystemEnabled = !0, this.measurementAvailable = !0, this.desktopMeasurementPoints = [], this.connectionLine = null, this.desktopMeasurementLine = null, this.measurementSprite = null, this.measurementCanvas = null, this.measurementTexture = null, this.lastClickTime = 0, this.lastTriggerTime = 0, this._wasInVR = !1, this.focusAnimation = null, this._cancelFocusOnUserInput = null, this.mouse = new f.Vector2(), this.raycaster = new f.Raycaster();
    const A = () => {
      let d = null, u = null;
      const p = null, g = null;
      if (e && e.children && e.children.forEach((m) => {
        m && m.inputSource && m.inputSource.handedness && (m.inputSource.handedness === "left" && (d = m), m.inputSource.handedness === "right" && (u = m));
      }), (!d || !u) && s && s.xr && s.xr.getController)
        try {
          d = d || s.xr.getController(0), u = u || s.xr.getController(1);
        } catch {
        }
      d && u ? (this.attachVR({ controller1: d, controller2: u, controllerGrip1: p, controllerGrip2: g }), this.ghostSpheres && this.ghostSpheres.left && this.ghostSpheres.right && (this.ghostSpheres.left.visible = !0, this.ghostSpheres.right.visible = !0)) : (this._ghostSphereAttachRetries || (this._ghostSphereAttachRetries = 0), this._ghostSphereAttachRetries < 40 ? (this._ghostSphereAttachRetries++, setTimeout(A, 250)) : typeof window < "u" && window.console && console.warn("[MeasurementSystem] Could not find VR controllers to attach ghost spheres after multiple attempts."));
    };
    if (A(), s && s.xr && s.xr.addEventListener && s.xr.addEventListener("sessionstart", A), this.sphereGeometry = new f.SphereGeometry(0.02, 8, 6), this.placedMaterial = new f.MeshBasicMaterial({ color: 16777215 }), this.vrLineMaterial = new ys({
      color: 16777215,
      linewidth: 3,
      transparent: !0,
      opacity: 0.8,
      depthTest: !1,
      vertexColors: !1,
      dashed: !1
    }), this.desktopLineMaterial = new ys({
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
          const u = s.xr.getController(0), p = s.xr.getController(1), g = s.xr.getControllerGrip ? s.xr.getControllerGrip(0) : void 0, m = s.xr.getControllerGrip ? s.xr.getControllerGrip(1) : void 0;
          this.attachVR({ controller1: u, controller2: p, controllerGrip1: g, controllerGrip2: m });
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
          const n = t.clone().sub(this.camera.position).normalize(), r = new f.Raycaster(this.camera.position, n), a = this.getValidIntersections(r);
          a.length > 0 && (s = a[0].point);
        }
        const i = new f.Mesh(this.sphereGeometry, this.placedMaterial);
        i.position.copy(s), this.scene.add(i), this.desktopMeasurementPoints.push(i);
      }
      if (this.desktopMeasurementPoints.length === 2) {
        const e = new Di();
        e.setPositions([
          this.desktopMeasurementPoints[0].position.x,
          this.desktopMeasurementPoints[0].position.y,
          this.desktopMeasurementPoints[0].position.z,
          this.desktopMeasurementPoints[1].position.x,
          this.desktopMeasurementPoints[1].position.y,
          this.desktopMeasurementPoints[1].position.z
        ]), this.desktopMeasurementLine = new Sr(e, this.desktopLineMaterial), this.desktopMeasurementLine.computeLineDistances(), this.scene.add(this.desktopMeasurementLine);
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
    const t = (window.devicePixelRatio || 1) * 4, s = 256, i = 64, n = s * t, r = i * t;
    this.measurementCanvas || (this.measurementCanvas = document.createElement("canvas")), (this.measurementCanvas.width !== n || this.measurementCanvas.height !== r) && (this.measurementCanvas.width = n, this.measurementCanvas.height = r);
    const a = this.measurementCanvas.getContext("2d");
    a.setTransform(1, 0, 0, 1, 0, 0), a.clearRect(0, 0, n, r), a.save(), a.scale(t, t);
    const l = 24;
    let c;
    e <= 2 ? c = 0.4 + e / 2 * 0.3 : e <= 4 ? c = 0.7 + (e - 2) / 2 * 0.2 : c = 0.9 + Math.min((e - 4) / 16, 1) * 0.5;
    const h = Math.round(l * c);
    a.font = `600 ${h}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`;
    const A = this.formatDistance(e), u = a.measureText(A).width, p = h, g = Math.max(6, h * 0.3), m = u + g * 2, y = p + g * 2, C = (s - m) / 2, E = (i - y) / 2;
    if (a.fillStyle = "rgba(0, 0, 0, 0.8)", a.beginPath(), a.roundRect(C, E, m, y, Math.max(4, h * 0.2)), a.fill(), a.fillStyle = "white", a.textAlign = "center", a.textBaseline = "middle", a.fillText(A, s / 2, i / 2), a.restore(), this.measurementTexture ? this.measurementTexture.needsUpdate = !0 : (this.measurementTexture = new f.CanvasTexture(this.measurementCanvas), this.measurementTexture.minFilter = f.LinearFilter, this.measurementTexture.magFilter = f.LinearFilter), !this.measurementSprite) {
      const w = new f.SpriteMaterial({
        map: this.measurementTexture,
        depthTest: !1,
        depthWrite: !1
      });
      this.measurementSprite = new f.Sprite(w);
    }
    const I = 0.3 * c, S = s / i;
    return this.measurementSprite.scale.set(I * S, I, 1), this.measurementSprite;
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
    const n = new f.MeshBasicMaterial({
      color: 8947848,
      // ghostly grey
      transparent: !0,
      opacity: 0.25,
      depthTest: !1,
      depthWrite: !1
    });
    this.ghostSpheres.left && this.ghostSpheres.left.parent && this.ghostSpheres.left.parent.remove(this.ghostSpheres.left), this.ghostSpheres.right && this.ghostSpheres.right.parent && this.ghostSpheres.right.parent.remove(this.ghostSpheres.right), this.ghostSpheres.left = new f.Mesh(this.sphereGeometry, n.clone()), this.ghostSpheres.right = new f.Mesh(this.sphereGeometry, n.clone()), this.ghostSpheres.left.scale.set(0.5, 0.5, 0.5), this.ghostSpheres.right.scale.set(0.5, 0.5, 0.5), this.ghostSpheres.left.position.set(0, 0, -0.07), this.ghostSpheres.right.position.set(0, 0, -0.07), this.ghostSpheres.left.visible = !0, this.ghostSpheres.right.visible = !0, this.controller1 && this.controller1.add(this.ghostSpheres.left), this.controller2 && this.controller2.add(this.ghostSpheres.right), this.yButtonPressed = !1, this.MAX_SPHERES = 2, this.triggerState = {
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
      let n = null;
      if (t === this.controller1 && this.ghostSpheres.left ? n = this.ghostSpheres.left : t === this.controller2 && this.ghostSpheres.right && (n = this.ghostSpheres.right), n)
        n.getWorldPosition(i);
      else {
        t.getWorldPosition(i);
        const r = new f.Vector3(0, 0, -0.05);
        r.applyQuaternion(t.quaternion), i.add(r);
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
    const n = new f.Raycaster(s, i.normalize()), r = this.scene && this.scene.children ? this.scene.children : [], a = this.getValidIntersections(n, r);
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
      const e = this.unifiedMeasurementPoints[0].position, t = this.unifiedMeasurementPoints[1].position, s = new Di();
      s.setPositions([
        e.x,
        e.y,
        e.z,
        t.x,
        t.y,
        t.z
      ]), this.unifiedMeasurementLine = new Sr(s, this.desktopLineMaterial), this.unifiedMeasurementLine.computeLineDistances(), this.unifiedMeasurementLine.userData.isMeasurementLine = !0, this.scene.add(this.unifiedMeasurementLine);
      const i = e.distanceTo(t);
      this.createMeasurementDisplay(i);
      const n = i * 100 <= 20 ? 0.125 : 0.5;
      if (this.unifiedMeasurementPoints.forEach((r) => {
        r.sphere && r.sphere.scale.setScalar(n);
      }), this.measurementSprite) {
        const r = new f.Vector3();
        r.addVectors(e, t), r.multiplyScalar(0.5);
        const a = Math.max(0.05, Math.min(0.2, i * 0.03));
        r.y += a, this.measurementSprite.position.copy(r), this.scene.children.includes(this.measurementSprite) || this.scene.add(this.measurementSprite);
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
    const t = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting, s = this.unifiedMeasurementPoints ? this.unifiedMeasurementPoints.length : 0, i = s === 2, n = t ? this.measurementSystemEnabled : this.desktopMeasurementMode;
    let r;
    if (i && (r = this.unifiedMeasurementPoints[0].position.distanceTo(this.unifiedMeasurementPoints[1].position)), e.classList.remove("disabled", "active", "measured", "unavailable"), e.style.opacity = "", e.style.cursor = "pointer", e.setAttribute("aria-disabled", "false"), e.removeAttribute("title"), !this.measurementAvailable) {
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
        <div>${this.formatDistance(r)}</div>
        <div style="font-size: 12px; margin-top: 4px;">Click to disable</div>
      `;
    else {
      e.classList.add("active");
      const a = t ? "Use triggers" : "Click points";
      e.innerHTML = `
        <div>MEASURE: ON</div>
        <div style="font-size: 12px; margin-top: 4px;">${a} (${s}/2)</div>
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
      const a = this.getRaycastInfo(e);
      a && a.mouse && Number.isFinite(a.mouse.x) && Number.isFinite(a.mouse.y) && (a.mouse.isVector2 ? this.mouse.copy(a.mouse) : (this.mouse.x = a.mouse.x, this.mouse.y = a.mouse.y), a.camera && (i = a.camera), n = !0);
    }
    if (!n) {
      const a = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = (e.clientX - a.left) / a.width * 2 - 1, this.mouse.y = -((e.clientY - a.top) / a.height) * 2 + 1;
    }
    if (this.renderer && this.renderer.xr && this.renderer.xr.isPresenting) {
      const a = this.renderer.xr.getCamera();
      a && (i = a);
    }
    if ((!i || !i.isPerspectiveCamera && !i.isOrthographicCamera) && this.scene && this.scene.children) {
      for (const a of this.scene.children)
        if (a.isCamera) {
          i = a;
          break;
        }
    }
    if ((!i || !i.isPerspectiveCamera && !i.isOrthographicCamera) && typeof window < "u" && window.camera && (window.camera.isPerspectiveCamera || window.camera.isOrthographicCamera) && (i = window.camera), !i || !i.isPerspectiveCamera && !i.isOrthographicCamera && i.type !== "ArrayCamera")
      return;
    this.raycaster.setFromCamera(this.mouse, i);
    const r = this.getValidIntersections(this.raycaster);
    if (r.length > 0)
      if (s)
        this.focusOnPoint(r[0].point);
      else {
        const a = r[0].point;
        this.placeUnifiedMeasurementPoint(a, "desktop");
      }
  }
  focusOnPoint(e) {
    if (!e || !this.controls || !this.camera)
      return;
    this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null), this._cancelFocusOnUserInput && (this.controls.removeEventListener("start", this._cancelFocusOnUserInput), this._cancelFocusOnUserInput = null);
    const t = this.controls.target.clone(), s = this.camera.position.clone(), i = s.clone().sub(t), n = e.clone().add(i), r = 1e3, a = performance.now(), l = () => {
      this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null), this._cancelFocusOnUserInput && (this.controls.removeEventListener("start", this._cancelFocusOnUserInput), this._cancelFocusOnUserInput = null);
    };
    this._cancelFocusOnUserInput = l, this.controls.addEventListener("start", l, { once: !0 });
    const c = () => {
      const h = performance.now() - a, A = Math.min(h / r, 1), d = 1 - Math.pow(1 - A, 3);
      this.controls.target.lerpVectors(t, e, d), this.camera.position.lerpVectors(s, n, d), A < 1 ? this.focusAnimation = requestAnimationFrame(c) : (this.focusAnimation = null, this._cancelFocusOnUserInput && (this.controls.removeEventListener("start", this._cancelFocusOnUserInput), this._cancelFocusOnUserInput = null));
    };
    this.focusAnimation = requestAnimationFrame(c);
  }
  _focusOnPoint(e) {
    if (this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null), !this.controls || !this.camera) {
      console.warn("[MeasurementSystem] No controls or camera available for focusing");
      return;
    }
    const t = this.controls.target.clone(), s = this.camera.position.clone(), i = s.clone().sub(t), n = e.clone().add(i), r = 1e3, a = performance.now(), l = () => {
      const c = performance.now() - a, h = Math.min(c / r, 1), A = 1 - Math.pow(1 - h, 3);
      this.controls.target.lerpVectors(t, e, A), this.camera.position.lerpVectors(s, n, A), this.controls.update(), h < 1 ? this.focusAnimation = requestAnimationFrame(l) : this.focusAnimation = null;
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
        const n = Math.max(0.05, Math.min(0.2, s * 0.03));
        i.y += n, this.measurementSprite.position.copy(i), this.scene.children.includes(this.measurementSprite) || this.scene.add(this.measurementSprite);
        const r = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting;
        this.measurementSprite.visible = r || this.showMeasurementLabels;
      }
    }
  }
}
class $i {
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
    return new $i(e, t);
  }
}
class jA {
  constructor(e) {
    this.scene = e, this.particleBounds = {
      min: new f.Vector3(-50, -25, -50),
      max: new f.Vector3(50, 25, 50)
    }, this.particleCount = 1750, this.densityMultiplier = 1, this.createParticleSystem();
  }
  calculateParticleCount(e) {
    const t = new f.Vector3();
    e.getSize(t);
    const i = t.clone().multiplyScalar(2.5), n = i.x * i.y * i.z, r = Math.round(n * 0.01 * this.densityMultiplier);
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
    const t = new f.Box3(this.particleBounds.min, this.particleBounds.max), s = this.calculateParticleCount(t);
    this.particles && (this.scene.remove(this.particles), this.particles.geometry && this.particles.geometry.dispose(), this.particles.material && this.particles.material.dispose(), this.particles = null), this.particleCount = s, this.createParticleSystem(), this.enable();
  }
  createParticleSystem() {
    const e = new Float32Array(this.particleCount * 3), t = new Float32Array(this.particleCount * 3), s = new Float32Array(this.particleCount);
    this.initializeParticleData(e, t, s);
    const i = new f.BufferGeometry(), n = new Float32Array(this.particleCount);
    for (let r = 0; r < this.particleCount; r++)
      n[r] = r;
    i.setAttribute("position", new f.BufferAttribute(e, 3)), i.setAttribute("originalSize", new f.BufferAttribute(s, 1)), i.setAttribute("velocity", new f.BufferAttribute(t, 3)), i.setAttribute("particleIndex", new f.BufferAttribute(n, 1)), this.originalMaterial = this.createParticleMaterial(), this.particles = new f.Points(i, this.originalMaterial), this.particles.visible = !1, this.scene.add(this.particles);
  }
  /**
   * Initialize particle data arrays
   */
  initializeParticleData(e, t, s) {
    for (let i = 0; i < this.particleCount; i++) {
      const n = i * 3;
      e[n] = this.particleBounds.min.x + Math.random() * (this.particleBounds.max.x - this.particleBounds.min.x), e[n + 1] = this.particleBounds.min.y + Math.random() * (this.particleBounds.max.y - this.particleBounds.min.y), e[n + 2] = this.particleBounds.min.z + Math.random() * (this.particleBounds.max.z - this.particleBounds.min.z);
      const r = 1e-5, a = -5e-6, l = 5e-6;
      t[n] = r + (Math.random() - 0.5) * 2e-5, t[n + 1] = a + (-Math.random() * 1e-5 - 5e-6), t[n + 2] = l + (Math.random() - 0.5) * 2e-5;
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
    const t = new f.Box3().setFromObject(e), s = t.getSize(new f.Vector3()), i = t.getCenter(new f.Vector3()), r = s.clone().multiplyScalar(2.5 * 0.5);
    this.particleBounds.min.copy(i).sub(r), this.particleBounds.max.copy(i).add(r);
    const a = this.calculateParticleCount(new f.Box3(this.particleBounds.min, this.particleBounds.max));
    Math.abs(a - this.particleCount) > this.particleCount * 0.2 ? (this.particles && (this.scene.remove(this.particles), this.particles.geometry && this.particles.geometry.dispose(), this.particles.material && this.particles.material.dispose(), this.particles = null), this.particleCount = a, this.createParticleSystem()) : this.redistributeParticles();
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
class KA {
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
    const n = t.clone().add(i.multiplyScalar(2));
    this.spotlightTarget.position.copy(n);
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
class YA {
  constructor(e) {
    this.scene = e, this.overheadLight = null, this.clearModeDirectionalLight = null, this.clearModeHemisphereLight = null, this.isTransitioning = !1, this.currentMode = "survey", this.pendingAnimations = /* @__PURE__ */ new Set(), this.isDisposed = !1, this.initializeLighting();
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
        this.clearModeDirectionalLight || (this.clearModeDirectionalLight = new f.DirectionalLight(16777215, 1.32), this.clearModeDirectionalLight.position.set(50, 100, 50), this.clearModeDirectionalLight.castShadow = !0, this.clearModeDirectionalLight.shadow.mapSize.width = 2048, this.clearModeDirectionalLight.shadow.mapSize.height = 2048, this.clearModeDirectionalLight.shadow.camera.near = 0.5, this.clearModeDirectionalLight.shadow.camera.far = 500, this.clearModeDirectionalLight.shadow.camera.left = -150, this.clearModeDirectionalLight.shadow.camera.right = 150, this.clearModeDirectionalLight.shadow.camera.top = 150, this.clearModeDirectionalLight.shadow.camera.bottom = -150, this.scene.add(this.clearModeDirectionalLight)), this.clearModeHemisphereLight || (this.clearModeHemisphereLight = new f.HemisphereLight(16777215, 4473924, 0.77), this.scene.add(this.clearModeHemisphereLight)), this.fillLight || (this.fillLight = new f.DirectionalLight(16777215, 0.88), this.fillLight.position.set(-10, 10, -10), this.scene.add(this.fillLight)), this.bottomLight || (this.bottomLight = new f.DirectionalLight(16777215, 0.33), this.bottomLight.position.set(0, -10, 0), this.scene.add(this.bottomLight));
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
  fadeLighting({ target: e, fromIntensity: t, toIntensity: s, fromColor: i, toColor: n, duration: r = 500, onComplete: a }) {
    if (this.isDisposed || !e) {
      a && a();
      return;
    }
    const l = Symbol("fade-animation");
    this.pendingAnimations.add(l);
    const c = performance.now(), h = s - t;
    let A, d;
    i !== void 0 && n !== void 0 && (A = new f.Color(i), d = new f.Color(n));
    const u = (p) => {
      if (!this.pendingAnimations.has(l) || this.isDisposed) {
        a && a();
        return;
      }
      try {
        const g = p - c, m = Math.min(g / r, 1), y = 1 - Math.pow(1 - m, 3);
        if (!e || this.scene && !this.scene.children.includes(e)) {
          this.pendingAnimations.delete(l), a && a();
          return;
        }
        e.intensity = t + h * y, A && d && e.color && e.color.lerpColors(A, d, y), m < 1 ? requestAnimationFrame(u) : (this.pendingAnimations.delete(l), a && a());
      } catch (g) {
        console.error("Error in lighting animation:", g), this.pendingAnimations.delete(l), a && a();
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
class JA {
  constructor(e, t, s) {
    this.scene = e, this.renderer = t, this.camera = s, this.isDiveModeEnabled = !1, this.currentVRMode = null, this.lighting = new YA(e), this.particles = new jA(e), this.torch = new KA(e), this.isQuest2 = !1, this.isQuest3 = !1, this._fallbackHandedness = /* @__PURE__ */ new Map(), this.detectQuestDevice(), this.applyModeSettings();
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
    this.isQuest2 ? (this.camera.far = 20, this.camera.updateProjectionMatrix(), this.isDiveModeEnabled && (this.scene.fog = new f.FogExp2(268073, 0.084))) : (this.camera.far = 2e3, this.camera.updateProjectionMatrix(), this.isDiveModeEnabled && (this.scene.fog = new f.FogExp2(268073, 0.056)));
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
          const n = i.gamepad, r = i.handedness;
          [4, 5].forEach((l) => {
            if (n.buttons[l]) {
              const c = n.buttons[l], h = `${r}-${l}`;
              this.buttonStates || (this.buttonStates = /* @__PURE__ */ new Map());
              const A = this.buttonStates.get(h) || !1, d = c.pressed;
              d && !A && this.toggleDiveMode(), this.buttonStates.set(h, d);
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
class WA extends Pt {
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
    const t = this.modelSize / this.speedScale, i = (this.keys.shift ? this.boostSpeed : this.baseSpeed) * t, n = new f.Vector3();
    this.keys.w && (n.z -= 1), this.keys.s && (n.z += 1), this.keys.a && (n.x -= 1), this.keys.d && (n.x += 1), this.keys.q && (n.y -= 1), this.keys.e && (n.y += 1), n.lengthSq() > 0 && (n.normalize(), n.applyQuaternion(this.camera.quaternion), this.camera.position.addScaledVector(n, i * e), this._syncControlsTarget());
  }
  _syncControlsTarget() {
    if (!this.controls || !this.camera) return;
    const e = new f.Vector3(0, 0, -5).applyQuaternion(this.camera.quaternion);
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
    const t = new f.Euler(this.cameraPitch, this.cameraYaw, 0, "YXZ");
    this.camera.quaternion.setFromEuler(t), this._syncControlsTarget();
  }
  _onPointerLockChange() {
    const e = this.pointerLocked;
    if (this.pointerLocked = document.pointerLockElement === this.domElement, this.pointerLocked && !e && this.camera) {
      const t = new f.Euler().setFromQuaternion(this.camera.quaternion, "YXZ");
      this.cameraYaw = t.y, this.cameraPitch = t.x;
    }
    this.controls && (this.pointerLocked ? (this._controlsEnabledBefore = this.controls.enabled, this.controls.enabled = !1) : this.controls.enabled = this._controlsEnabledBefore), this.emit("fly-mode-change", { active: this.pointerLocked });
  }
  _onClick() {
    this.pointerLocked && this.exitFlyMode();
  }
}
class Fi extends Pt {
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
    this.config = new Ms(s).validate(t), this.options = this.config, this.currentModelKey = null, this.belowViewer = null, this.ui = {}, this.uiRoot = null, this.stereoUiMirror = null, this.stereoUiObserver = null, this.stereoUiSyncQueued = !1, this.stereoUiActive = !1, this.measurementSystem = null, this.comfortGlyph = null, this.diveSystem = null, this.fullscreenButton = null, this.screenshotButton = null, this.flyControls = null, this.lastComfortMode = null, this._vrButtonWasVisible = !1, this.isLoading = !1, this.loadingMessage = "", this.loadingModelName = "", this.loadingPercentage = 0, this.lastManualLoadingMessage = "", this.stageOverrideActive = !1, this.vrUpdateLoop = null, this.lastRequestedModelKey = null, this.recoveryHandlers = null, this.recoveryTimer = null, this.recoveryCooldownMs = 1200, this.lastRecoveryAttemptAt = 0, this.recoveryAttempts = 0, this.maxRecoveryAttempts = 3, this.hadContextLoss = !1, this.isDisposed = !1, typeof window < "u" && (window.modelViewer = this), this.init();
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
    if (this.belowViewer = new VA(this.container, e), this.setupEventForwarding(), this.setupRecoveryHandlers(), this.belowViewer.on("initialized", () => {
      this.setupRecoveryHandlers(), this.setupFocusInteraction(), this._maybeAttachMeasurementSystem(), this._maybeAttachVRComfortGlyph(), this._maybeAttachDiveSystem(), this._maybeAttachScreenshotButton(), this._maybeAttachFullscreenButton(), this._maybeAttachFlyControls();
    }), this.belowViewer.isInitialized && (this.setupRecoveryHandlers(), this.setupFocusInteraction(), this._maybeAttachMeasurementSystem(), this._maybeAttachVRComfortGlyph(), this._maybeAttachDiveSystem(), this._maybeAttachScreenshotButton(), this._maybeAttachFullscreenButton(), this._maybeAttachFlyControls()), Object.keys(this.config.models).length > 0 && (this.createUI(), this.populateDropdown(), this.config.autoLoadFirst)) {
      const t = Object.keys(this.config.models)[0];
      setTimeout(() => this.loadModel(t), 100);
    }
  }
  _maybeAttachMeasurementSystem() {
    if (!this.config.enableMeasurement || this.measurementSystem) return;
    this.measurementSystem = new zA({
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
    this.comfortGlyph = new $i(this.belowViewer.vrManager, {
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
      Fi._isEditableTarget(i.target) || i.code === "KeyC" && (i.ctrlKey || i.metaKey) && (i.preventDefault(), this.comfortGlyph && this.comfortGlyph.toggle());
    }), window.addEventListener("beforeunload", () => this.comfortGlyph && this.comfortGlyph.dispose());
  }
  _maybeAttachDiveSystem() {
    if (!this.config.enableDiveSystem || this.diveSystem) return;
    this.diveSystem = new JA(
      this.belowViewer.sceneManager.scene,
      this.belowViewer.renderer,
      this.belowViewer.cameraManager.camera
    ), setTimeout(() => {
      this.diveSystem.initializeToggleSwitch();
    }, 100), document.addEventListener("keydown", (t) => {
      if (!Fi._isEditableTarget(t.target)) {
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
    this.flyControls = new WA({
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
    }, i = (r) => {
      r && typeof r.preventDefault == "function" && r.preventDefault(), this.hadContextLoss = !0;
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
    const r = Object.keys(this.config.models)[0], a = this.currentModelKey || this.lastRequestedModelKey || r;
    if (!a || !this.config.models[a]) {
      this.forceRefreshFrame();
      return;
    }
    if (this.recoveryAttempts += 1, this.updateStatus("Recovering viewer..."), await this.loadModel(a), (this.belowViewer?.getLoadedModels?.()?.length || 0) > 0) {
      this.hadContextLoss = !1, this.recoveryAttempts = 0, this.forceRefreshFrame(), this.emit("viewer-recovered", { reason: e, modelKey: a });
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
      const s = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "").slice(0, -5), n = `${this.currentModelKey ? this.config.models[this.currentModelKey]?.name?.replace(/[^a-zA-Z0-9\-_]/g, "-") || this.currentModelKey.replace(/[^a-zA-Z0-9\-_]/g, "-") : "unknown"}-belowjs-${s}.png`, r = document.createElement("a");
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
    const n = { x: 0, y: 0 }, r = 5, a = (A) => {
      i = !1, n.x = A.clientX, n.y = A.clientY;
    }, l = (A) => {
      if (!i) {
        const d = Math.abs(A.clientX - n.x), u = Math.abs(A.clientY - n.y);
        (d > r || u > r) && (i = !0);
      }
    }, c = () => {
      setTimeout(() => {
        i = !1;
      }, 10);
    }, h = (A) => {
      const d = Date.now(), u = d - s < t;
      s = d, !(this.belowViewer.renderer.xr?.isPresenting || i) && (this.measurementSystem && this.measurementSystem.desktopMeasurementMode || u && this.focusOnPoint(A));
    };
    e.addEventListener("mousedown", a), e.addEventListener("mousemove", l), e.addEventListener("mouseup", c), e.addEventListener("click", h), this.focusEventHandlers = {
      onMouseDown: a,
      onMouseMove: l,
      onMouseUp: c,
      onMouseClick: h
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
    const r = this.belowViewer.cameraManager.getCamera();
    let a = r, l = i / s.width * 2 - 1;
    const c = -(n / s.height * 2 - 1), h = this.belowViewer.getStereoSettings?.();
    if (h?.enabled === !0 && h?.mode === "sbs" && this.belowViewer.stereoCamera) {
      const A = this.belowViewer.stereoCamera, d = s.width / 2, u = i <= d, p = u ? d : s.width - d, g = u ? i : i - d;
      p > 0 && (l = g / p * 2 - 1), A.aspect = s.height > 0 ? d / s.height : 1, A.update(r), a = u ? A.cameraL : A.cameraR;
    }
    return {
      mouse: { x: l, y: c },
      camera: a
    };
  }
  focusOnPoint(e) {
    const t = this.getPointerRaycastInfo(e), s = t?.mouse, i = t?.camera;
    if (!s || !i)
      return;
    const n = new f.Raycaster();
    n.setFromCamera(s, i);
    let r = [];
    if (this.measurementSystem && this.measurementSystem._raycastTargets && this.measurementSystem._raycastTargets.length > 0)
      r = this.measurementSystem._raycastTargets;
    else {
      const l = this.belowViewer.sceneManager.getScene();
      r = [], l.traverse((c) => {
        c.isMesh && c.geometry && !this.isMeasurementHelper(c) && r.push(c);
      });
    }
    if (r.length === 0)
      return;
    const a = n.intersectObjects(r, !0);
    if (a.length > 0) {
      const l = a[0].point;
      this.belowViewer.cameraManager.focusOn(l), this.emit("focus", { point: l, intersect: a[0] });
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
      const r = document.createElement("div");
      r.className = "semantic-toggle";
      const a = document.createElement("input");
      a.type = "checkbox", a.id = "modeToggleSwitch", a.className = "mode-toggle__switch", r.appendChild(a);
      const l = document.createElement("div");
      l.className = "toggle-slider-bg", r.appendChild(l);
      const c = document.createElement("div");
      c.className = "toggle-option left";
      const h = document.createElement("div");
      h.className = "toggle-icon", h.textContent = "📋";
      const A = document.createElement("div");
      A.className = "toggle-text", A.textContent = "Survey", c.appendChild(h), c.appendChild(A);
      const d = document.createElement("div");
      d.className = "toggle-option right";
      const u = document.createElement("div");
      u.className = "toggle-icon", u.textContent = "🌊";
      const p = document.createElement("div");
      p.className = "toggle-text", p.textContent = "Dive", d.appendChild(u), d.appendChild(p), r.appendChild(c), r.appendChild(d), n.appendChild(r), s.appendChild(n);
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
    const r = document.createElement("div");
    r.className = "toggle-icon", r.textContent = "📋";
    const a = document.createElement("div");
    a.className = "toggle-text", a.textContent = "Survey", n.appendChild(r), n.appendChild(a);
    const l = document.createElement("div");
    l.className = "toggle-option right";
    const c = document.createElement("div");
    c.className = "toggle-icon", c.textContent = "🌊";
    const h = document.createElement("div");
    h.className = "toggle-text", h.textContent = "Dive", l.appendChild(c), l.appendChild(h), t.appendChild(n), t.appendChild(l), e.appendChild(t), this.getUiContainer().appendChild(e), this.ui.diveToggle = e;
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
    const i = (window.devicePixelRatio || 1) * 2, n = 512, r = 256, a = n * i, l = r * i;
    this.vrLoadingCanvas || (this.vrLoadingCanvas = document.createElement("canvas")), (this.vrLoadingCanvas.width !== a || this.vrLoadingCanvas.height !== l) && (this.vrLoadingCanvas.width = a, this.vrLoadingCanvas.height = l);
    const c = this.vrLoadingCanvas.getContext("2d");
    c.setTransform(1, 0, 0, 1, 0, 0), c.clearRect(0, 0, a, l), c.save(), c.scale(i, i);
    const h = n / 2, A = r / 2, d = 25, u = A - 40;
    if (c.shadowColor = "rgba(0, 0, 0, 0.8)", c.shadowBlur = 3, c.strokeStyle = "rgba(255, 255, 255, 0.3)", c.lineWidth = 3, c.beginPath(), c.arc(h, u, d, 0, Math.PI * 2), c.stroke(), c.shadowColor = "transparent", c.shadowBlur = 0, s > 0) {
      const p = s / 100 * Math.PI * 2;
      c.strokeStyle = "#ffffff", c.lineWidth = 3, c.beginPath(), c.arc(h, u, d, -Math.PI / 2, -Math.PI / 2 + p), c.stroke();
    }
    if (c.fillStyle = "white", c.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', c.textAlign = "center", c.textBaseline = "middle", c.shadowColor = "rgba(0, 0, 0, 0.8)", c.shadowBlur = 2, c.shadowOffsetX = 1, c.shadowOffsetY = 1, c.fillText(`${Math.round(s)}%`, h, u), t && (c.fillStyle = "white", c.font = '600 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', c.textAlign = "center", c.textBaseline = "middle", c.shadowColor = "rgba(0, 0, 0, 0.8)", c.shadowBlur = 4, c.shadowOffsetX = 1, c.shadowOffsetY = 1, c.fillText(t, h, A + 20)), c.fillStyle = "rgba(255, 255, 255, 0.9)", c.font = '400 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', c.shadowColor = "rgba(0, 0, 0, 0.8)", c.shadowBlur = 3, c.shadowOffsetX = 1, c.shadowOffsetY = 1, c.fillText(e, h, A + 50), c.restore(), this.vrLoadingTexture ? this.vrLoadingTexture.needsUpdate = !0 : (this.vrLoadingTexture = new f.CanvasTexture(this.vrLoadingCanvas), this.vrLoadingTexture.minFilter = f.LinearFilter, this.vrLoadingTexture.magFilter = f.LinearFilter), !this.vrLoadingSprite) {
      const p = new f.SpriteMaterial({
        map: this.vrLoadingTexture,
        depthTest: !1,
        depthWrite: !1,
        transparent: !0
      });
      this.vrLoadingSprite = new f.Sprite(p);
      const g = 0.7, m = n / r;
      this.vrLoadingSprite.scale.set(g * m, g, 1);
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
      this.measurementSystem && (this.measurementSystem.clearUnifiedMeasurement(), this.measurementSystem.clearLegacyVRMeasurement(), this.measurementSystem.clearLegacyDesktopMeasurement()), this.belowViewer.clearModels(), this.belowViewer.vrManager && (this.belowViewer.vrManager.stopMovement(), this.belowViewer.vrManager.resetTeleportState()), await new Promise((r) => setTimeout(r, 50));
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
        const r = !!t.initialPositions?.desktop;
        this.applyInitialPositions(t, n), t.type === "tileset" && !r && !this.belowViewer.isVRPresenting() && this.belowViewer.frameModel(n), this.hideLoading(), this.updateStatus(`Loaded: ${t.name || e}`), this.applyModelMeasurementConfig(t, n), this.modelReady = !0, this.recoveryAttempts = 0, this.emit("model-switched", { modelKey: e, model: n, config: t }), this.emit("modelLoaded", { modelKey: e, model: n, config: t });
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
      const r = this.belowViewer.getCamera().parent;
      r && (r.position.set(
        s.vr.dolly.x,
        s.vr.dolly.y,
        s.vr.dolly.z
      ), r.rotation.set(
        s.vr.rotation.x,
        s.vr.rotation.y,
        s.vr.rotation.z
      ));
    } else if (!n && s.desktop) {
      const r = this.belowViewer.getCamera(), a = this.belowViewer.cameraManager.controls;
      r && a && (r.position.set(
        s.desktop.camera.x,
        s.desktop.camera.y,
        s.desktop.camera.z
      ), a.target.set(
        s.desktop.target.x,
        s.desktop.target.y,
        s.desktop.target.z
      ), a.update());
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
    const e = this.belowViewer.cameraManager.camera, t = 2, s = new f.Vector3();
    e.getWorldDirection(s);
    const i = new f.Vector3();
    e.getWorldPosition(i);
    const n = new f.Vector3();
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
          const n = 2 * Math.PI * 20, r = n - t / 100 * n;
          i.style.strokeDashoffset = r;
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
  VA as BelowViewer,
  gl as Camera,
  Ms as ConfigValidator,
  Pt as EventSystem,
  WA as FlyControls,
  Sr as Line2,
  Di as LineGeometry,
  ys as LineMaterial,
  ae as ModelLoader,
  Fi as ModelViewer,
  el as Scene,
  rA as VRManager
};
