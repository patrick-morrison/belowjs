import * as f from "three";
import { Controls as hr, Vector3 as v, MOUSE as We, TOUCH as Ke, Quaternion as et, Spherical as Ji, Vector2 as F, Ray as ri, Plane as qn, MathUtils as st, TrianglesDrawMode as Ar, TriangleFanDrawMode as Wi, TriangleStripDrawMode as zn, Loader as ds, LoaderUtils as Ct, FileLoader as xe, MeshPhysicalMaterial as ue, Color as ye, LinearSRGBColorSpace as le, SRGBColorSpace as Ce, SpotLight as dr, PointLight as ur, DirectionalLight as pr, Matrix4 as P, InstancedMesh as us, InstancedBufferAttribute as gr, Object3D as ai, TextureLoader as fr, ImageBitmapLoader as mr, BufferAttribute as ne, InterleavedBuffer as br, InterleavedBufferAttribute as ke, LinearMipmapLinearFilter as li, NearestMipmapLinearFilter as Cr, LinearMipmapNearestFilter as yr, NearestMipmapNearestFilter as Er, LinearFilter as Ne, NearestFilter as jn, RepeatWrapping as Xi, MirroredRepeatWrapping as Ir, ClampToEdgeWrapping as wr, PointsMaterial as Kn, Material as mi, LineBasicMaterial as Br, MeshStandardMaterial as ps, DoubleSide as Sr, MeshBasicMaterial as Fe, PropertyBinding as vr, BufferGeometry as ci, SkinnedMesh as Mr, Mesh as hi, LineSegments as xr, Line as Tr, LineLoop as Qr, Points as Yn, Group as Xe, PerspectiveCamera as Rr, OrthographicCamera as Jn, Skeleton as Dr, AnimationClip as Lr, Bone as kr, InterpolateDiscrete as Fr, InterpolateLinear as Wn, Texture as vs, VectorKeyframeTrack as Ms, NumberKeyframeTrack as xs, QuaternionKeyframeTrack as Ts, ColorManagement as $i, FrontSide as _r, Interpolant as Pr, Box3 as nt, Sphere as It, CompressedCubeTexture as Nr, CompressedArrayTexture as Gr, CompressedTexture as Xn, NoColorSpace as Qs, RGBA_BPTC_Format as Zi, RGBA_S3TC_DXT5_Format as es, RGBA_S3TC_DXT3_Format as Rs, RGB_S3TC_DXT1_Format as Ds, RGBA_S3TC_DXT1_Format as ts, RGBA_ASTC_6x6_Format as Ls, RGBA_ASTC_4x4_Format as Yt, RGBA_ETC2_EAC_Format as $n, RGB_ETC2_Format as Zn, RedFormat as ft, RGFormat as mt, RGBAFormat as Ye, UnsignedByteType as re, HalfFloatType as Je, FloatType as yt, DataTexture as eo, Data3DTexture as Ur, RGB_PVRTC_4BPPV1_Format as Vr, RGB_ETC1_Format as Or, RGBA_PVRTC_4BPPV1_Format as Hr, RGB_BPTC_UNSIGNED_Format as qr, Euler as to, TextureUtils as zr, LoadingManager as jr, EventDispatcher as xt, Frustum as Kr, DefaultLoadingManager as Ai, Matrix3 as io, Float32BufferAttribute as Xt, WebGLRenderer as Yr, WebGLRenderTarget as ks, ShaderMaterial as so, OneFactor as Jr, ZeroFactor as Wr, CustomBlending as Xr, Box2 as $r, Matrix2 as Zr, Vector4 as ot, SphereGeometry as no, BoxGeometry as ea, DynamicDrawUsage as ta, InstancedBufferGeometry as ia, InstancedInterleavedBuffer as is, WireframeGeometry as sa, ShaderLib as Jt, UniformsUtils as oo, UniformsLib as Wt, Line3 as na } from "three";
class wt {
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
class di {
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
      const n = this.schema[s], o = i[s];
      if (n.type === "object" && n.schema) {
        const r = o ?? n.default;
        t[s] = new di(n.schema).validate(r || {});
      } else if (o == null)
        t[s] = n.default;
      else if (this.isTypeValid(o, n.type))
        t[s] = o;
      else {
        const r = Array.isArray(n.type) ? n.type.join(" or ") : n.type;
        console.warn(
          `ConfigValidator: Invalid type for option '${s}'. Expected '${r}', but received '${typeof o}'. Using default value: ${JSON.stringify(n.default)}.`
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
class oa {
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
const Fs = { type: "change" }, gs = { type: "start" }, ro = { type: "end" }, Tt = new ri(), _s = new qn(), ra = Math.cos(70 * st.DEG2RAD), G = new v(), J = 2 * Math.PI, _ = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, bi = 1e-6;
class aa extends hr {
  /**
   * Constructs a new controls instance.
   *
   * @param {Object3D} object - The object that is managed by the controls.
   * @param {?HTMLDOMElement} domElement - The HTML element used for event listeners.
   */
  constructor(e, t = null) {
    super(e, t), this.state = _.NONE, this.target = new v(), this.cursor = new v(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: We.ROTATE, MIDDLE: We.DOLLY, RIGHT: We.PAN }, this.touches = { ONE: Ke.ROTATE, TWO: Ke.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new v(), this._lastQuaternion = new et(), this._lastTargetPosition = new v(), this._quat = new et().setFromUnitVectors(e.up, new v(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Ji(), this._sphericalDelta = new Ji(), this._scale = 1, this._panOffset = new v(), this._rotateStart = new F(), this._rotateEnd = new F(), this._rotateDelta = new F(), this._panStart = new F(), this._panEnd = new F(), this._panDelta = new F(), this._dollyStart = new F(), this._dollyEnd = new F(), this._dollyDelta = new F(), this._dollyDirection = new v(), this._mouse = new F(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = ca.bind(this), this._onPointerDown = la.bind(this), this._onPointerUp = ha.bind(this), this._onContextMenu = ma.bind(this), this._onMouseWheel = ua.bind(this), this._onKeyDown = pa.bind(this), this._onTouchStart = ga.bind(this), this._onTouchMove = fa.bind(this), this._onMouseDown = Aa.bind(this), this._onMouseMove = da.bind(this), this._interceptControlDown = ba.bind(this), this._interceptControlUp = Ca.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Fs), this.update(), this.state = _.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    G.copy(t).sub(this.target), G.applyQuaternion(this._quat), this._spherical.setFromVector3(G), this.autoRotate && this.state === _.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let i = this.minAzimuthAngle, s = this.maxAzimuthAngle;
    isFinite(i) && isFinite(s) && (i < -Math.PI ? i += J : i > Math.PI && (i -= J), s < -Math.PI ? s += J : s > Math.PI && (s -= J), i <= s ? this._spherical.theta = Math.max(i, Math.min(s, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (i + s) / 2 ? Math.max(i, this._spherical.theta) : Math.min(s, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let n = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const o = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), n = o != this._spherical.radius;
    }
    if (G.setFromSpherical(this._spherical), G.applyQuaternion(this._quatInverse), t.copy(this.target).add(G), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let o = null;
      if (this.object.isPerspectiveCamera) {
        const r = G.length();
        o = this._clampDistance(r * this._scale);
        const l = r - o;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), n = !!l;
      } else if (this.object.isOrthographicCamera) {
        const r = new v(this._mouse.x, this._mouse.y, 0);
        r.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), n = l !== this.object.zoom;
        const c = new v(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object), this.object.position.sub(c).add(r), this.object.updateMatrixWorld(), o = G.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      o !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position) : (Tt.origin.copy(this.object.position), Tt.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Tt.direction)) < ra ? this.object.lookAt(this.target) : (_s.setFromNormalAndCoplanarPoint(this.object.up, this.target), Tt.intersectPlane(_s, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const o = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), o !== this.object.zoom && (this.object.updateProjectionMatrix(), n = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, n || this._lastPosition.distanceToSquared(this.object.position) > bi || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > bi || this._lastTargetPosition.distanceToSquared(this.target) > bi ? (this.dispatchEvent(Fs), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
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
    G.setFromMatrixColumn(t, 0), G.multiplyScalar(-e), this._panOffset.add(G);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? G.setFromMatrixColumn(t, 1) : (G.setFromMatrixColumn(t, 0), G.crossVectors(this.object.up, G)), G.multiplyScalar(e), this._panOffset.add(G);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, t) {
    const i = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const s = this.object.position;
      G.copy(s).sub(this.target);
      let n = G.length();
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
    const i = this.domElement.getBoundingClientRect(), s = e - i.left, n = t - i.top, o = i.width, r = i.height;
    this._mouse.x = s / o * 2 - 1, this._mouse.y = -(n / r) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
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
    this._rotateLeft(J * this._rotateDelta.x / t.clientHeight), this._rotateUp(J * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
    t === void 0 && (t = new F(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
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
function la(a) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(a.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(a) && (this._addPointer(a), a.pointerType === "touch" ? this._onTouchStart(a) : this._onMouseDown(a)));
}
function ca(a) {
  this.enabled !== !1 && (a.pointerType === "touch" ? this._onTouchMove(a) : this._onMouseMove(a));
}
function ha(a) {
  switch (this._removePointer(a), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(a.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(ro), this.state = _.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function Aa(a) {
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
  this.state !== _.NONE && this.dispatchEvent(gs);
}
function da(a) {
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
function ua(a) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== _.NONE || (a.preventDefault(), this.dispatchEvent(gs), this._handleMouseWheel(this._customWheelEvent(a)), this.dispatchEvent(ro));
}
function pa(a) {
  this.enabled !== !1 && this._handleKeyDown(a);
}
function ga(a) {
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
  this.state !== _.NONE && this.dispatchEvent(gs);
}
function fa(a) {
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
function ma(a) {
  this.enabled !== !1 && a.preventDefault();
}
function ba(a) {
  a.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function Ca(a) {
  a.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
class ya extends wt {
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
      this.controls = new aa(this.camera, e);
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
    const i = t && t.isVector3 ? t.clone() : new f.Vector3(t || 1, t || 1, t || 1), s = Math.max(i.x, 1e-3), n = Math.max(i.y, 1e-3), o = Math.max(i.z, 1e-3), r = f.MathUtils.degToRad(this.camera.fov), l = 2 * Math.atan(Math.tan(r / 2) * this.camera.aspect), c = n * 0.5 / Math.tan(r / 2), h = s * 0.5 / Math.tan(l / 2), d = Math.max(c, h) * 1.2 + o * 0.5, u = new f.Vector3(0.7, 0.5, 0.7).normalize(), p = e.clone().add(u.multiplyScalar(d));
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
    const i = this.controls.target.clone(), s = this.camera.position.clone(), n = s.clone().sub(i), o = e.clone().add(n), r = 1e3, l = performance.now(), c = () => {
      this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null, this.controls.removeEventListener("start", c));
    };
    this.controls.addEventListener("start", c, { once: !0 });
    const h = () => {
      const A = performance.now() - l, d = Math.min(A / r, 1), u = 1 - Math.pow(1 - d, 3);
      this.controls.target.lerpVectors(i, e, u), this.camera.position.lerpVectors(s, o, u), d < 1 ? this.focusAnimation = requestAnimationFrame(h) : (this.focusAnimation = null, this.controls.removeEventListener("start", c), this.emit("focus-complete", { target: e, position: o }));
    };
    this.focusAnimation = requestAnimationFrame(h), this.emit("focus-start", { target: e, startPosition: s, newPosition: o });
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
function Ea(a) {
  let e = 0;
  for (const i in a.attributes) {
    const s = a.getAttribute(i);
    e += s.count * s.itemSize * s.array.BYTES_PER_ELEMENT;
  }
  const t = a.getIndex();
  return e += t ? t.count * t.itemSize * t.array.BYTES_PER_ELEMENT : 0, e;
}
function Ps(a, e) {
  if (e === Ar)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), a;
  if (e === Wi || e === zn) {
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
    const i = t.count - 2, s = [];
    if (e === Wi)
      for (let o = 1; o <= i; o++)
        s.push(t.getX(0)), s.push(t.getX(o)), s.push(t.getX(o + 1));
    else
      for (let o = 0; o < i; o++)
        o % 2 === 0 ? (s.push(t.getX(o)), s.push(t.getX(o + 1)), s.push(t.getX(o + 2))) : (s.push(t.getX(o + 2)), s.push(t.getX(o + 1)), s.push(t.getX(o)));
    s.length / 3 !== i && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const n = a.clone();
    return n.setIndex(s), n.clearGroups(), n;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), a;
}
class Ue extends ds {
  /**
   * Constructs a new glTF loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new va(t);
    }), this.register(function(t) {
      return new Ma(t);
    }), this.register(function(t) {
      return new _a(t);
    }), this.register(function(t) {
      return new Pa(t);
    }), this.register(function(t) {
      return new Na(t);
    }), this.register(function(t) {
      return new Ta(t);
    }), this.register(function(t) {
      return new Qa(t);
    }), this.register(function(t) {
      return new Ra(t);
    }), this.register(function(t) {
      return new Da(t);
    }), this.register(function(t) {
      return new Sa(t);
    }), this.register(function(t) {
      return new La(t);
    }), this.register(function(t) {
      return new xa(t);
    }), this.register(function(t) {
      return new Fa(t);
    }), this.register(function(t) {
      return new ka(t);
    }), this.register(function(t) {
      return new wa(t);
    }), this.register(function(t) {
      return new Ga(t);
    }), this.register(function(t) {
      return new Ua(t);
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
    let o;
    if (this.resourcePath !== "")
      o = this.resourcePath;
    else if (this.path !== "") {
      const c = Ct.extractUrlBase(e);
      o = Ct.resolveURL(c, this.path);
    } else
      o = Ct.extractUrlBase(e);
    this.manager.itemStart(e);
    const r = function(c) {
      s ? s(c) : console.error(c), n.manager.itemError(e), n.manager.itemEnd(e);
    }, l = new xe(this.manager);
    l.setPath(this.path), l.setResponseType("arraybuffer"), l.setRequestHeader(this.requestHeader), l.setWithCredentials(this.withCredentials), l.load(e, function(c) {
      try {
        n.parse(c, o, function(h) {
          t(h), n.manager.itemEnd(e);
        }, r);
      } catch (h) {
        r(h);
      }
    }, i, r);
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
    const o = {}, r = {}, l = new TextDecoder();
    if (typeof e == "string")
      n = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (l.decode(new Uint8Array(e, 0, 4)) === ao) {
        try {
          o[D.KHR_BINARY_GLTF] = new Va(e);
        } catch (A) {
          s && s(A);
          return;
        }
        n = JSON.parse(o[D.KHR_BINARY_GLTF].content);
      } else
        n = JSON.parse(l.decode(e));
    else
      n = e;
    if (n.asset === void 0 || n.asset.version[0] < 2) {
      s && s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const c = new el(n, {
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
      A.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), r[A.name] = A, o[A.name] = !0;
    }
    if (n.extensionsUsed)
      for (let h = 0; h < n.extensionsUsed.length; ++h) {
        const A = n.extensionsUsed[h], d = n.extensionsRequired || [];
        switch (A) {
          case D.KHR_MATERIALS_UNLIT:
            o[A] = new Ba();
            break;
          case D.KHR_DRACO_MESH_COMPRESSION:
            o[A] = new Oa(n, this.dracoLoader);
            break;
          case D.KHR_TEXTURE_TRANSFORM:
            o[A] = new Ha();
            break;
          case D.KHR_MESH_QUANTIZATION:
            o[A] = new qa();
            break;
          default:
            d.indexOf(A) >= 0 && r[A] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + A + '".');
        }
      }
    c.setExtensions(o), c.setPlugins(r), c.parse(i, s);
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
function Ia() {
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
class wa {
  constructor(e) {
    this.parser = e, this.name = D.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
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
    const n = t.json, l = ((n.extensions && n.extensions[this.name] || {}).lights || [])[e];
    let c;
    const h = new ye(16777215);
    l.color !== void 0 && h.setRGB(l.color[0], l.color[1], l.color[2], le);
    const A = l.range !== void 0 ? l.range : 0;
    switch (l.type) {
      case "directional":
        c = new pr(h), c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      case "point":
        c = new ur(h), c.distance = A;
        break;
      case "spot":
        c = new dr(h), c.distance = A, l.spot = l.spot || {}, l.spot.innerConeAngle = l.spot.innerConeAngle !== void 0 ? l.spot.innerConeAngle : 0, l.spot.outerConeAngle = l.spot.outerConeAngle !== void 0 ? l.spot.outerConeAngle : Math.PI / 4, c.angle = l.spot.outerConeAngle, c.penumbra = 1 - l.spot.innerConeAngle / l.spot.outerConeAngle, c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + l.type);
    }
    return c.position.set(0, 0, 0), be(c, l), l.intensity !== void 0 && (c.intensity = l.intensity), c.name = t.createUniqueName(l.name || "light_" + e), s = Promise.resolve(c), t.cache.add(i, s), s;
  }
  getDependency(e, t) {
    if (e === "light")
      return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this, i = this.parser, n = i.json.nodes[e], r = (n.extensions && n.extensions[this.name] || {}).light;
    return r === void 0 ? null : this._loadLight(r).then(function(l) {
      return i._getNodeRef(t.cache, r, l);
    });
  }
}
class Ba {
  constructor() {
    this.name = D.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return Fe;
  }
  extendParams(e, t, i) {
    const s = [];
    e.color = new ye(1, 1, 1), e.opacity = 1;
    const n = t.pbrMetallicRoughness;
    if (n) {
      if (Array.isArray(n.baseColorFactor)) {
        const o = n.baseColorFactor;
        e.color.setRGB(o[0], o[1], o[2], le), e.opacity = o[3];
      }
      n.baseColorTexture !== void 0 && s.push(i.assignTexture(e, "map", n.baseColorTexture, Ce));
    }
    return Promise.all(s);
  }
}
class Sa {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = s.extensions[this.name].emissiveStrength;
    return n !== void 0 && (t.emissiveIntensity = n), Promise.resolve();
  }
}
class va {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = [], o = s.extensions[this.name];
    if (o.clearcoatFactor !== void 0 && (t.clearcoat = o.clearcoatFactor), o.clearcoatTexture !== void 0 && n.push(i.assignTexture(t, "clearcoatMap", o.clearcoatTexture)), o.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = o.clearcoatRoughnessFactor), o.clearcoatRoughnessTexture !== void 0 && n.push(i.assignTexture(t, "clearcoatRoughnessMap", o.clearcoatRoughnessTexture)), o.clearcoatNormalTexture !== void 0 && (n.push(i.assignTexture(t, "clearcoatNormalMap", o.clearcoatNormalTexture)), o.clearcoatNormalTexture.scale !== void 0)) {
      const r = o.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new F(r, r);
    }
    return Promise.all(n);
  }
}
class Ma {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = s.extensions[this.name];
    return t.dispersion = n.dispersion !== void 0 ? n.dispersion : 0, Promise.resolve();
  }
}
class xa {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = [], o = s.extensions[this.name];
    return o.iridescenceFactor !== void 0 && (t.iridescence = o.iridescenceFactor), o.iridescenceTexture !== void 0 && n.push(i.assignTexture(t, "iridescenceMap", o.iridescenceTexture)), o.iridescenceIor !== void 0 && (t.iridescenceIOR = o.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), o.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = o.iridescenceThicknessMinimum), o.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = o.iridescenceThicknessMaximum), o.iridescenceThicknessTexture !== void 0 && n.push(i.assignTexture(t, "iridescenceThicknessMap", o.iridescenceThicknessTexture)), Promise.all(n);
  }
}
class Ta {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = [];
    t.sheenColor = new ye(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const o = s.extensions[this.name];
    if (o.sheenColorFactor !== void 0) {
      const r = o.sheenColorFactor;
      t.sheenColor.setRGB(r[0], r[1], r[2], le);
    }
    return o.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = o.sheenRoughnessFactor), o.sheenColorTexture !== void 0 && n.push(i.assignTexture(t, "sheenColorMap", o.sheenColorTexture, Ce)), o.sheenRoughnessTexture !== void 0 && n.push(i.assignTexture(t, "sheenRoughnessMap", o.sheenRoughnessTexture)), Promise.all(n);
  }
}
class Qa {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = [], o = s.extensions[this.name];
    return o.transmissionFactor !== void 0 && (t.transmission = o.transmissionFactor), o.transmissionTexture !== void 0 && n.push(i.assignTexture(t, "transmissionMap", o.transmissionTexture)), Promise.all(n);
  }
}
class Ra {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = [], o = s.extensions[this.name];
    t.thickness = o.thicknessFactor !== void 0 ? o.thicknessFactor : 0, o.thicknessTexture !== void 0 && n.push(i.assignTexture(t, "thicknessMap", o.thicknessTexture)), t.attenuationDistance = o.attenuationDistance || 1 / 0;
    const r = o.attenuationColor || [1, 1, 1];
    return t.attenuationColor = new ye().setRGB(r[0], r[1], r[2], le), Promise.all(n);
  }
}
class Da {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = s.extensions[this.name];
    return t.ior = n.ior !== void 0 ? n.ior : 1.5, Promise.resolve();
  }
}
class La {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = [], o = s.extensions[this.name];
    t.specularIntensity = o.specularFactor !== void 0 ? o.specularFactor : 1, o.specularTexture !== void 0 && n.push(i.assignTexture(t, "specularIntensityMap", o.specularTexture));
    const r = o.specularColorFactor || [1, 1, 1];
    return t.specularColor = new ye().setRGB(r[0], r[1], r[2], le), o.specularColorTexture !== void 0 && n.push(i.assignTexture(t, "specularColorMap", o.specularColorTexture, Ce)), Promise.all(n);
  }
}
class ka {
  constructor(e) {
    this.parser = e, this.name = D.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = [], o = s.extensions[this.name];
    return t.bumpScale = o.bumpFactor !== void 0 ? o.bumpFactor : 1, o.bumpTexture !== void 0 && n.push(i.assignTexture(t, "bumpMap", o.bumpTexture)), Promise.all(n);
  }
}
class Fa {
  constructor(e) {
    this.parser = e, this.name = D.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : ue;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, s = i.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const n = [], o = s.extensions[this.name];
    return o.anisotropyStrength !== void 0 && (t.anisotropy = o.anisotropyStrength), o.anisotropyRotation !== void 0 && (t.anisotropyRotation = o.anisotropyRotation), o.anisotropyTexture !== void 0 && n.push(i.assignTexture(t, "anisotropyMap", o.anisotropyTexture)), Promise.all(n);
  }
}
class _a {
  constructor(e) {
    this.parser = e, this.name = D.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser, i = t.json, s = i.textures[e];
    if (!s.extensions || !s.extensions[this.name])
      return null;
    const n = s.extensions[this.name], o = t.options.ktx2Loader;
    if (!o) {
      if (i.extensionsRequired && i.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, n.source, o);
  }
}
class Pa {
  constructor(e) {
    this.parser = e, this.name = D.EXT_TEXTURE_WEBP;
  }
  loadTexture(e) {
    const t = this.name, i = this.parser, s = i.json, n = s.textures[e];
    if (!n.extensions || !n.extensions[t])
      return null;
    const o = n.extensions[t], r = s.images[o.source];
    let l = i.textureLoader;
    if (r.uri) {
      const c = i.options.manager.getHandler(r.uri);
      c !== null && (l = c);
    }
    return i.loadTextureImage(e, o.source, l);
  }
}
class Na {
  constructor(e) {
    this.parser = e, this.name = D.EXT_TEXTURE_AVIF;
  }
  loadTexture(e) {
    const t = this.name, i = this.parser, s = i.json, n = s.textures[e];
    if (!n.extensions || !n.extensions[t])
      return null;
    const o = n.extensions[t], r = s.images[o.source];
    let l = i.textureLoader;
    if (r.uri) {
      const c = i.options.manager.getHandler(r.uri);
      c !== null && (l = c);
    }
    return i.loadTextureImage(e, o.source, l);
  }
}
class Ga {
  constructor(e) {
    this.name = D.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const t = this.parser.json, i = t.bufferViews[e];
    if (i.extensions && i.extensions[this.name]) {
      const s = i.extensions[this.name], n = this.parser.getDependency("buffer", s.buffer), o = this.parser.options.meshoptDecoder;
      if (!o || !o.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return n.then(function(r) {
        const l = s.byteOffset || 0, c = s.byteLength || 0, h = s.count, A = s.byteStride, d = new Uint8Array(r, l, c);
        return o.decodeGltfBufferAsync ? o.decodeGltfBufferAsync(h, A, d, s.mode, s.filter).then(function(u) {
          return u.buffer;
        }) : o.ready.then(function() {
          const u = new ArrayBuffer(h * A);
          return o.decodeGltfBuffer(new Uint8Array(u), h, A, d, s.mode, s.filter), u;
        });
      });
    } else
      return null;
  }
}
class Ua {
  constructor(e) {
    this.name = D.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, i = t.nodes[e];
    if (!i.extensions || !i.extensions[this.name] || i.mesh === void 0)
      return null;
    const s = t.meshes[i.mesh];
    for (const c of s.primitives)
      if (c.mode !== se.TRIANGLES && c.mode !== se.TRIANGLE_STRIP && c.mode !== se.TRIANGLE_FAN && c.mode !== void 0)
        return null;
    const o = i.extensions[this.name].attributes, r = [], l = {};
    for (const c in o)
      r.push(this.parser.getDependency("accessor", o[c]).then((h) => (l[c] = h, l[c])));
    return r.length < 1 ? null : (r.push(this.parser.createNodeMesh(e)), Promise.all(r).then((c) => {
      const h = c.pop(), A = h.isGroup ? h.children : [h], d = c[0].count, u = [];
      for (const p of A) {
        const g = new P(), b = new v(), y = new et(), C = new v(1, 1, 1), E = new us(p.geometry, p.material, d);
        for (let m = 0; m < d; m++)
          l.TRANSLATION && b.fromBufferAttribute(l.TRANSLATION, m), l.ROTATION && y.fromBufferAttribute(l.ROTATION, m), l.SCALE && C.fromBufferAttribute(l.SCALE, m), E.setMatrixAt(m, g.compose(b, y, C));
        for (const m in l)
          if (m === "_COLOR_0") {
            const I = l[m];
            E.instanceColor = new gr(I.array, I.itemSize, I.normalized);
          } else m !== "TRANSLATION" && m !== "ROTATION" && m !== "SCALE" && p.geometry.setAttribute(m, l[m]);
        ai.prototype.copy.call(E, p), this.parser.assignFinalMaterial(E), u.push(E);
      }
      return h.isGroup ? (h.clear(), h.add(...u), h) : u[0];
    }));
  }
}
const ao = "glTF", at = 12, Ns = { JSON: 1313821514, BIN: 5130562 };
class Va {
  constructor(e) {
    this.name = D.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, at), i = new TextDecoder();
    if (this.header = {
      magic: i.decode(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== ao)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const s = this.header.length - at, n = new DataView(e, at);
    let o = 0;
    for (; o < s; ) {
      const r = n.getUint32(o, !0);
      o += 4;
      const l = n.getUint32(o, !0);
      if (o += 4, l === Ns.JSON) {
        const c = new Uint8Array(e, at + o, r);
        this.content = i.decode(c);
      } else if (l === Ns.BIN) {
        const c = at + o;
        this.body = e.slice(c, c + r);
      }
      o += r;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Oa {
  constructor(e, t) {
    if (!t)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = D.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const i = this.json, s = this.dracoLoader, n = e.extensions[this.name].bufferView, o = e.extensions[this.name].attributes, r = {}, l = {}, c = {};
    for (const h in o) {
      const A = ss[h] || h.toLowerCase();
      r[A] = o[h];
    }
    for (const h in e.attributes) {
      const A = ss[h] || h.toLowerCase();
      if (o[h] !== void 0) {
        const d = i.accessors[e.attributes[h]], u = $e[d.componentType];
        c[A] = u.name, l[A] = d.normalized === !0;
      }
    }
    return t.getDependency("bufferView", n).then(function(h) {
      return new Promise(function(A, d) {
        s.decodeDracoFile(h, function(u) {
          for (const p in u.attributes) {
            const g = u.attributes[p], b = l[p];
            b !== void 0 && (g.normalized = b);
          }
          A(u);
        }, r, c, le, d);
      });
    });
  }
}
class Ha {
  constructor() {
    this.name = D.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}
class qa {
  constructor() {
    this.name = D.KHR_MESH_QUANTIZATION;
  }
}
class lo extends Pr {
  constructor(e, t, i, s) {
    super(e, t, i, s);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, i = this.sampleValues, s = this.valueSize, n = e * s * 3 + s;
    for (let o = 0; o !== s; o++)
      t[o] = i[n + o];
    return t;
  }
  interpolate_(e, t, i, s) {
    const n = this.resultBuffer, o = this.sampleValues, r = this.valueSize, l = r * 2, c = r * 3, h = s - t, A = (i - t) / h, d = A * A, u = d * A, p = e * c, g = p - c, b = -2 * u + 3 * d, y = u - d, C = 1 - b, E = y - d + A;
    for (let m = 0; m !== r; m++) {
      const I = o[g + m + r], B = o[g + m + l] * h, w = o[p + m + r], M = o[p + m] * h;
      n[m] = C * I + E * B + b * w + y * M;
    }
    return n;
  }
}
const za = new et();
class ja extends lo {
  interpolate_(e, t, i, s) {
    const n = super.interpolate_(e, t, i, s);
    return za.fromArray(n).normalize().toArray(n), n;
  }
}
const se = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
}, $e = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, Gs = {
  9728: jn,
  9729: Ne,
  9984: Er,
  9985: yr,
  9986: Cr,
  9987: li
}, Us = {
  33071: wr,
  33648: Ir,
  10497: Xi
}, Ci = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, ss = {
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
}, Ka = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: Wn,
  STEP: Fr
}, yi = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Ya(a) {
  return a.DefaultMaterial === void 0 && (a.DefaultMaterial = new ps({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: _r
  })), a.DefaultMaterial;
}
function Re(a, e, t) {
  for (const i in t.extensions)
    a[i] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[i] = t.extensions[i]);
}
function be(a, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(a.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function Ja(a, e, t) {
  let i = !1, s = !1, n = !1;
  for (let c = 0, h = e.length; c < h; c++) {
    const A = e[c];
    if (A.POSITION !== void 0 && (i = !0), A.NORMAL !== void 0 && (s = !0), A.COLOR_0 !== void 0 && (n = !0), i && s && n) break;
  }
  if (!i && !s && !n) return Promise.resolve(a);
  const o = [], r = [], l = [];
  for (let c = 0, h = e.length; c < h; c++) {
    const A = e[c];
    if (i) {
      const d = A.POSITION !== void 0 ? t.getDependency("accessor", A.POSITION) : a.attributes.position;
      o.push(d);
    }
    if (s) {
      const d = A.NORMAL !== void 0 ? t.getDependency("accessor", A.NORMAL) : a.attributes.normal;
      r.push(d);
    }
    if (n) {
      const d = A.COLOR_0 !== void 0 ? t.getDependency("accessor", A.COLOR_0) : a.attributes.color;
      l.push(d);
    }
  }
  return Promise.all([
    Promise.all(o),
    Promise.all(r),
    Promise.all(l)
  ]).then(function(c) {
    const h = c[0], A = c[1], d = c[2];
    return i && (a.morphAttributes.position = h), s && (a.morphAttributes.normal = A), n && (a.morphAttributes.color = d), a.morphTargetsRelative = !0, a;
  });
}
function Wa(a, e) {
  if (a.updateMorphTargets(), e.weights !== void 0)
    for (let t = 0, i = e.weights.length; t < i; t++)
      a.morphTargetInfluences[t] = e.weights[t];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const t = e.extras.targetNames;
    if (a.morphTargetInfluences.length === t.length) {
      a.morphTargetDictionary = {};
      for (let i = 0, s = t.length; i < s; i++)
        a.morphTargetDictionary[t[i]] = i;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function Xa(a) {
  let e;
  const t = a.extensions && a.extensions[D.KHR_DRACO_MESH_COMPRESSION];
  if (t ? e = "draco:" + t.bufferView + ":" + t.indices + ":" + Ei(t.attributes) : e = a.indices + ":" + Ei(a.attributes) + ":" + a.mode, a.targets !== void 0)
    for (let i = 0, s = a.targets.length; i < s; i++)
      e += ":" + Ei(a.targets[i]);
  return e;
}
function Ei(a) {
  let e = "";
  const t = Object.keys(a).sort();
  for (let i = 0, s = t.length; i < s; i++)
    e += t[i] + ":" + a[t[i]] + ";";
  return e;
}
function ns(a) {
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
function $a(a) {
  return a.search(/\.jpe?g($|\?)/i) > 0 || a.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : a.search(/\.webp($|\?)/i) > 0 || a.search(/^data\:image\/webp/) === 0 ? "image/webp" : a.search(/\.ktx2($|\?)/i) > 0 || a.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png";
}
const Za = new P();
class el {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new Ia(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let i = !1, s = -1, n = !1, o = -1;
    if (typeof navigator < "u") {
      const r = navigator.userAgent;
      i = /^((?!chrome|android).)*safari/i.test(r) === !0;
      const l = r.match(/Version\/(\d+)/);
      s = i && l ? parseInt(l[1], 10) : -1, n = r.indexOf("Firefox") > -1, o = n ? r.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || i && s < 17 || n && o < 98 ? this.textureLoader = new fr(this.options.manager) : this.textureLoader = new mr(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new xe(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    const i = this, s = this.json, n = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(o) {
      return o._markDefs && o._markDefs();
    }), Promise.all(this._invokeAll(function(o) {
      return o.beforeRoot && o.beforeRoot();
    })).then(function() {
      return Promise.all([
        i.getDependencies("scene"),
        i.getDependencies("animation"),
        i.getDependencies("camera")
      ]);
    }).then(function(o) {
      const r = {
        scene: o[0][s.scene || 0],
        scenes: o[0],
        animations: o[1],
        cameras: o[2],
        asset: s.asset,
        parser: i,
        userData: {}
      };
      return Re(n, r, s), be(r, s), Promise.all(i._invokeAll(function(l) {
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
    const e = this.json.nodes || [], t = this.json.skins || [], i = this.json.meshes || [];
    for (let s = 0, n = t.length; s < n; s++) {
      const o = t[s].joints;
      for (let r = 0, l = o.length; r < l; r++)
        e[o[r]].isBone = !0;
    }
    for (let s = 0, n = e.length; s < n; s++) {
      const o = e[s];
      o.mesh !== void 0 && (this._addNodeRef(this.meshCache, o.mesh), o.skin !== void 0 && (i[o.mesh].isSkinnedMesh = !0)), o.camera !== void 0 && this._addNodeRef(this.cameraCache, o.camera);
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
    const s = i.clone(), n = (o, r) => {
      const l = this.associations.get(o);
      l != null && this.associations.set(r, l);
      for (const [c, h] of o.children.entries())
        n(h, r.children[c]);
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
      t = Promise.all(s.map(function(n, o) {
        return i.getDependency(e, o);
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
      return Promise.resolve(this.extensions[D.KHR_BINARY_GLTF].body);
    const s = this.options;
    return new Promise(function(n, o) {
      i.load(Ct.resolveURL(t.uri, s.path), n, void 0, function() {
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
      const o = Ci[s.type], r = $e[s.componentType], l = s.normalized === !0, c = new r(s.count * o);
      return Promise.resolve(new ne(c, o, l));
    }
    const n = [];
    return s.bufferView !== void 0 ? n.push(this.getDependency("bufferView", s.bufferView)) : n.push(null), s.sparse !== void 0 && (n.push(this.getDependency("bufferView", s.sparse.indices.bufferView)), n.push(this.getDependency("bufferView", s.sparse.values.bufferView))), Promise.all(n).then(function(o) {
      const r = o[0], l = Ci[s.type], c = $e[s.componentType], h = c.BYTES_PER_ELEMENT, A = h * l, d = s.byteOffset || 0, u = s.bufferView !== void 0 ? i.bufferViews[s.bufferView].byteStride : void 0, p = s.normalized === !0;
      let g, b;
      if (u && u !== A) {
        const y = Math.floor(d / u), C = "InterleavedBuffer:" + s.bufferView + ":" + s.componentType + ":" + y + ":" + s.count;
        let E = t.cache.get(C);
        E || (g = new c(r, y * u, s.count * u / h), E = new br(g, u / h), t.cache.add(C, E)), b = new ke(E, l, d % u / h, p);
      } else
        r === null ? g = new c(s.count * l) : g = new c(r, d, s.count * l), b = new ne(g, l, p);
      if (s.sparse !== void 0) {
        const y = Ci.SCALAR, C = $e[s.sparse.indices.componentType], E = s.sparse.indices.byteOffset || 0, m = s.sparse.values.byteOffset || 0, I = new C(o[1], E, s.sparse.count * y), B = new c(o[2], m, s.sparse.count * l);
        r !== null && (b = new ne(b.array.slice(), b.itemSize, b.normalized)), b.normalized = !1;
        for (let w = 0, M = I.length; w < M; w++) {
          const S = I[w];
          if (b.setX(S, B[w * l]), l >= 2 && b.setY(S, B[w * l + 1]), l >= 3 && b.setZ(S, B[w * l + 2]), l >= 4 && b.setW(S, B[w * l + 3]), l >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
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
    const t = this.json, i = this.options, n = t.textures[e].source, o = t.images[n];
    let r = this.textureLoader;
    if (o.uri) {
      const l = i.manager.getHandler(o.uri);
      l !== null && (r = l);
    }
    return this.loadTextureImage(e, n, r);
  }
  loadTextureImage(e, t, i) {
    const s = this, n = this.json, o = n.textures[e], r = n.images[t], l = (r.uri || r.bufferView) + ":" + o.sampler;
    if (this.textureCache[l])
      return this.textureCache[l];
    const c = this.loadImageSource(t, i).then(function(h) {
      h.flipY = !1, h.name = o.name || r.name || "", h.name === "" && typeof r.uri == "string" && r.uri.startsWith("data:image/") === !1 && (h.name = r.uri);
      const d = (n.samplers || {})[o.sampler] || {};
      return h.magFilter = Gs[d.magFilter] || Ne, h.minFilter = Gs[d.minFilter] || li, h.wrapS = Us[d.wrapS] || Xi, h.wrapT = Us[d.wrapT] || Xi, h.generateMipmaps = !h.isCompressedTexture && h.minFilter !== jn && h.minFilter !== Ne, s.associations.set(h, { textures: e }), h;
    }).catch(function() {
      return null;
    });
    return this.textureCache[l] = c, c;
  }
  loadImageSource(e, t) {
    const i = this, s = this.json, n = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((A) => A.clone());
    const o = s.images[e], r = self.URL || self.webkitURL;
    let l = o.uri || "", c = !1;
    if (o.bufferView !== void 0)
      l = i.getDependency("bufferView", o.bufferView).then(function(A) {
        c = !0;
        const d = new Blob([A], { type: o.mimeType });
        return l = r.createObjectURL(d), l;
      });
    else if (o.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const h = Promise.resolve(l).then(function(A) {
      return new Promise(function(d, u) {
        let p = d;
        t.isImageBitmapLoader === !0 && (p = function(g) {
          const b = new vs(g);
          b.needsUpdate = !0, d(b);
        }), t.load(Ct.resolveURL(A, n.path), p, void 0, u);
      });
    }).then(function(A) {
      return c === !0 && r.revokeObjectURL(l), be(A, o), A.userData.mimeType = o.mimeType || $a(o.uri), A;
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
  assignTexture(e, t, i, s) {
    const n = this;
    return this.getDependency("texture", i.index).then(function(o) {
      if (!o) return null;
      if (i.texCoord !== void 0 && i.texCoord > 0 && (o = o.clone(), o.channel = i.texCoord), n.extensions[D.KHR_TEXTURE_TRANSFORM]) {
        const r = i.extensions !== void 0 ? i.extensions[D.KHR_TEXTURE_TRANSFORM] : void 0;
        if (r) {
          const l = n.associations.get(o);
          o = n.extensions[D.KHR_TEXTURE_TRANSFORM].extendTexture(o, r), n.associations.set(o, l);
        }
      }
      return s !== void 0 && (o.colorSpace = s), e[t] = o, o;
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
    const s = t.attributes.tangent === void 0, n = t.attributes.color !== void 0, o = t.attributes.normal === void 0;
    if (e.isPoints) {
      const r = "PointsMaterial:" + i.uuid;
      let l = this.cache.get(r);
      l || (l = new Kn(), mi.prototype.copy.call(l, i), l.color.copy(i.color), l.map = i.map, l.sizeAttenuation = !1, this.cache.add(r, l)), i = l;
    } else if (e.isLine) {
      const r = "LineBasicMaterial:" + i.uuid;
      let l = this.cache.get(r);
      l || (l = new Br(), mi.prototype.copy.call(l, i), l.color.copy(i.color), l.map = i.map, this.cache.add(r, l)), i = l;
    }
    if (s || n || o) {
      let r = "ClonedMaterial:" + i.uuid + ":";
      s && (r += "derivative-tangents:"), n && (r += "vertex-colors:"), o && (r += "flat-shading:");
      let l = this.cache.get(r);
      l || (l = i.clone(), n && (l.vertexColors = !0), o && (l.flatShading = !0), s && (l.normalScale && (l.normalScale.y *= -1), l.clearcoatNormalScale && (l.clearcoatNormalScale.y *= -1)), this.cache.add(r, l), this.associations.set(l, this.associations.get(i))), i = l;
    }
    e.material = i;
  }
  getMaterialType() {
    return ps;
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
    let o;
    const r = {}, l = n.extensions || {}, c = [];
    if (l[D.KHR_MATERIALS_UNLIT]) {
      const A = s[D.KHR_MATERIALS_UNLIT];
      o = A.getMaterialType(), c.push(A.extendParams(r, n, t));
    } else {
      const A = n.pbrMetallicRoughness || {};
      if (r.color = new ye(1, 1, 1), r.opacity = 1, Array.isArray(A.baseColorFactor)) {
        const d = A.baseColorFactor;
        r.color.setRGB(d[0], d[1], d[2], le), r.opacity = d[3];
      }
      A.baseColorTexture !== void 0 && c.push(t.assignTexture(r, "map", A.baseColorTexture, Ce)), r.metalness = A.metallicFactor !== void 0 ? A.metallicFactor : 1, r.roughness = A.roughnessFactor !== void 0 ? A.roughnessFactor : 1, A.metallicRoughnessTexture !== void 0 && (c.push(t.assignTexture(r, "metalnessMap", A.metallicRoughnessTexture)), c.push(t.assignTexture(r, "roughnessMap", A.metallicRoughnessTexture))), o = this._invokeOne(function(d) {
        return d.getMaterialType && d.getMaterialType(e);
      }), c.push(Promise.all(this._invokeAll(function(d) {
        return d.extendMaterialParams && d.extendMaterialParams(e, r);
      })));
    }
    n.doubleSided === !0 && (r.side = Sr);
    const h = n.alphaMode || yi.OPAQUE;
    if (h === yi.BLEND ? (r.transparent = !0, r.depthWrite = !1) : (r.transparent = !1, h === yi.MASK && (r.alphaTest = n.alphaCutoff !== void 0 ? n.alphaCutoff : 0.5)), n.normalTexture !== void 0 && o !== Fe && (c.push(t.assignTexture(r, "normalMap", n.normalTexture)), r.normalScale = new F(1, 1), n.normalTexture.scale !== void 0)) {
      const A = n.normalTexture.scale;
      r.normalScale.set(A, A);
    }
    if (n.occlusionTexture !== void 0 && o !== Fe && (c.push(t.assignTexture(r, "aoMap", n.occlusionTexture)), n.occlusionTexture.strength !== void 0 && (r.aoMapIntensity = n.occlusionTexture.strength)), n.emissiveFactor !== void 0 && o !== Fe) {
      const A = n.emissiveFactor;
      r.emissive = new ye().setRGB(A[0], A[1], A[2], le);
    }
    return n.emissiveTexture !== void 0 && o !== Fe && c.push(t.assignTexture(r, "emissiveMap", n.emissiveTexture, Ce)), Promise.all(c).then(function() {
      const A = new o(r);
      return n.name && (A.name = n.name), be(A, n), t.associations.set(A, { materials: e }), n.extensions && Re(s, A, n), A;
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
    const t = vr.sanitizeNodeName(e || "");
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
    function n(r) {
      return i[D.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(r, t).then(function(l) {
        return Vs(l, r, t);
      });
    }
    const o = [];
    for (let r = 0, l = e.length; r < l; r++) {
      const c = e[r], h = Xa(c), A = s[h];
      if (A)
        o.push(A.promise);
      else {
        let d;
        c.extensions && c.extensions[D.KHR_DRACO_MESH_COMPRESSION] ? d = n(c) : d = Vs(new ci(), c, t), s[h] = { primitive: c, promise: d }, o.push(d);
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
    const t = this, i = this.json, s = this.extensions, n = i.meshes[e], o = n.primitives, r = [];
    for (let l = 0, c = o.length; l < c; l++) {
      const h = o[l].material === void 0 ? Ya(this.cache) : this.getDependency("material", o[l].material);
      r.push(h);
    }
    return r.push(t.loadGeometries(o)), Promise.all(r).then(function(l) {
      const c = l.slice(0, l.length - 1), h = l[l.length - 1], A = [];
      for (let u = 0, p = h.length; u < p; u++) {
        const g = h[u], b = o[u];
        let y;
        const C = c[u];
        if (b.mode === se.TRIANGLES || b.mode === se.TRIANGLE_STRIP || b.mode === se.TRIANGLE_FAN || b.mode === void 0)
          y = n.isSkinnedMesh === !0 ? new Mr(g, C) : new hi(g, C), y.isSkinnedMesh === !0 && y.normalizeSkinWeights(), b.mode === se.TRIANGLE_STRIP ? y.geometry = Ps(y.geometry, zn) : b.mode === se.TRIANGLE_FAN && (y.geometry = Ps(y.geometry, Wi));
        else if (b.mode === se.LINES)
          y = new xr(g, C);
        else if (b.mode === se.LINE_STRIP)
          y = new Tr(g, C);
        else if (b.mode === se.LINE_LOOP)
          y = new Qr(g, C);
        else if (b.mode === se.POINTS)
          y = new Yn(g, C);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + b.mode);
        Object.keys(y.geometry.morphAttributes).length > 0 && Wa(y, n), y.name = t.createUniqueName(n.name || "mesh_" + e), be(y, n), b.extensions && Re(s, y, b), t.assignFinalMaterial(y), A.push(y);
      }
      for (let u = 0, p = A.length; u < p; u++)
        t.associations.set(A[u], {
          meshes: e,
          primitives: u
        });
      if (A.length === 1)
        return n.extensions && Re(s, A[0], n), A[0];
      const d = new Xe();
      n.extensions && Re(s, d, n), t.associations.set(d, { meshes: e });
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
    const i = this.json.cameras[e], s = i[i.type];
    if (!s) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return i.type === "perspective" ? t = new Rr(st.radToDeg(s.yfov), s.aspectRatio || 1, s.znear || 1, s.zfar || 2e6) : i.type === "orthographic" && (t = new Jn(-s.xmag, s.xmag, s.ymag, -s.ymag, s.znear, s.zfar)), i.name && (t.name = this.createUniqueName(i.name)), be(t, i), Promise.resolve(t);
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
      const n = s.pop(), o = s, r = [], l = [];
      for (let c = 0, h = o.length; c < h; c++) {
        const A = o[c];
        if (A) {
          r.push(A);
          const d = new P();
          n !== null && d.fromArray(n.array, c * 16), l.push(d);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[c]);
      }
      return new Dr(r, l);
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
    const t = this.json, i = this, s = t.animations[e], n = s.name ? s.name : "animation_" + e, o = [], r = [], l = [], c = [], h = [];
    for (let A = 0, d = s.channels.length; A < d; A++) {
      const u = s.channels[A], p = s.samplers[u.sampler], g = u.target, b = g.node, y = s.parameters !== void 0 ? s.parameters[p.input] : p.input, C = s.parameters !== void 0 ? s.parameters[p.output] : p.output;
      g.node !== void 0 && (o.push(this.getDependency("node", b)), r.push(this.getDependency("accessor", y)), l.push(this.getDependency("accessor", C)), c.push(p), h.push(g));
    }
    return Promise.all([
      Promise.all(o),
      Promise.all(r),
      Promise.all(l),
      Promise.all(c),
      Promise.all(h)
    ]).then(function(A) {
      const d = A[0], u = A[1], p = A[2], g = A[3], b = A[4], y = [];
      for (let C = 0, E = d.length; C < E; C++) {
        const m = d[C], I = u[C], B = p[C], w = g[C], M = b[C];
        if (m === void 0) continue;
        m.updateMatrix && m.updateMatrix();
        const S = i._createAnimationTracks(m, I, B, w, M);
        if (S)
          for (let x = 0; x < S.length; x++)
            y.push(S[x]);
      }
      return new Lr(n, void 0, y);
    });
  }
  createNodeMesh(e) {
    const t = this.json, i = this, s = t.nodes[e];
    return s.mesh === void 0 ? null : i.getDependency("mesh", s.mesh).then(function(n) {
      const o = i._getNodeRef(i.meshCache, s.mesh, n);
      return s.weights !== void 0 && o.traverse(function(r) {
        if (r.isMesh)
          for (let l = 0, c = s.weights.length; l < c; l++)
            r.morphTargetInfluences[l] = s.weights[l];
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
    const t = this.json, i = this, s = t.nodes[e], n = i._loadNodeShallow(e), o = [], r = s.children || [];
    for (let c = 0, h = r.length; c < h; c++)
      o.push(i.getDependency("node", r[c]));
    const l = s.skin === void 0 ? Promise.resolve(null) : i.getDependency("skin", s.skin);
    return Promise.all([
      n,
      Promise.all(o),
      l
    ]).then(function(c) {
      const h = c[0], A = c[1], d = c[2];
      d !== null && h.traverse(function(u) {
        u.isSkinnedMesh && u.bind(d, Za);
      });
      for (let u = 0, p = A.length; u < p; u++)
        h.add(A[u]);
      return h;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(e) {
    const t = this.json, i = this.extensions, s = this;
    if (this.nodeCache[e] !== void 0)
      return this.nodeCache[e];
    const n = t.nodes[e], o = n.name ? s.createUniqueName(n.name) : "", r = [], l = s._invokeOne(function(c) {
      return c.createNodeMesh && c.createNodeMesh(e);
    });
    return l && r.push(l), n.camera !== void 0 && r.push(s.getDependency("camera", n.camera).then(function(c) {
      return s._getNodeRef(s.cameraCache, n.camera, c);
    })), s._invokeAll(function(c) {
      return c.createNodeAttachment && c.createNodeAttachment(e);
    }).forEach(function(c) {
      r.push(c);
    }), this.nodeCache[e] = Promise.all(r).then(function(c) {
      let h;
      if (n.isBone === !0 ? h = new kr() : c.length > 1 ? h = new Xe() : c.length === 1 ? h = c[0] : h = new ai(), h !== c[0])
        for (let A = 0, d = c.length; A < d; A++)
          h.add(c[A]);
      if (n.name && (h.userData.name = n.name, h.name = o), be(h, n), n.extensions && Re(i, h, n), n.matrix !== void 0) {
        const A = new P();
        A.fromArray(n.matrix), h.applyMatrix4(A);
      } else
        n.translation !== void 0 && h.position.fromArray(n.translation), n.rotation !== void 0 && h.quaternion.fromArray(n.rotation), n.scale !== void 0 && h.scale.fromArray(n.scale);
      if (!s.associations.has(h))
        s.associations.set(h, {});
      else if (n.mesh !== void 0 && s.meshCache.refs[n.mesh] > 1) {
        const A = s.associations.get(h);
        s.associations.set(h, { ...A });
      }
      return s.associations.get(h).nodes = e, h;
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
    const t = this.extensions, i = this.json.scenes[e], s = this, n = new Xe();
    i.name && (n.name = s.createUniqueName(i.name)), be(n, i), i.extensions && Re(t, n, i);
    const o = i.nodes || [], r = [];
    for (let l = 0, c = o.length; l < c; l++)
      r.push(s.getDependency("node", o[l]));
    return Promise.all(r).then(function(l) {
      for (let h = 0, A = l.length; h < A; h++)
        n.add(l[h]);
      const c = (h) => {
        const A = /* @__PURE__ */ new Map();
        for (const [d, u] of s.associations)
          (d instanceof mi || d instanceof vs) && A.set(d, u);
        return h.traverse((d) => {
          const u = s.associations.get(d);
          u != null && A.set(d, u);
        }), A;
      };
      return s.associations = c(n), n;
    });
  }
  _createAnimationTracks(e, t, i, s, n) {
    const o = [], r = e.name ? e.name : e.uuid, l = [];
    Ie[n.path] === Ie.weights ? e.traverse(function(d) {
      d.morphTargetInfluences && l.push(d.name ? d.name : d.uuid);
    }) : l.push(r);
    let c;
    switch (Ie[n.path]) {
      case Ie.weights:
        c = xs;
        break;
      case Ie.rotation:
        c = Ts;
        break;
      case Ie.translation:
      case Ie.scale:
        c = Ms;
        break;
      default:
        switch (i.itemSize) {
          case 1:
            c = xs;
            break;
          case 2:
          case 3:
          default:
            c = Ms;
            break;
        }
        break;
    }
    const h = s.interpolation !== void 0 ? Ka[s.interpolation] : Wn, A = this._getArrayFromAccessor(i);
    for (let d = 0, u = l.length; d < u; d++) {
      const p = new c(
        l[d] + "." + Ie[n.path],
        t.array,
        A,
        h
      );
      s.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(p), o.push(p);
    }
    return o;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const i = ns(t.constructor), s = new Float32Array(t.length);
      for (let n = 0, o = t.length; n < o; n++)
        s[n] = t[n] * i;
      t = s;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(i) {
      const s = this instanceof Ts ? ja : lo;
      return new s(this.times, this.values, this.getValueSize() / 3, i);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function tl(a, e, t) {
  const i = e.attributes, s = new nt();
  if (i.POSITION !== void 0) {
    const r = t.json.accessors[i.POSITION], l = r.min, c = r.max;
    if (l !== void 0 && c !== void 0) {
      if (s.set(
        new v(l[0], l[1], l[2]),
        new v(c[0], c[1], c[2])
      ), r.normalized) {
        const h = ns($e[r.componentType]);
        s.min.multiplyScalar(h), s.max.multiplyScalar(h);
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
    for (let c = 0, h = n.length; c < h; c++) {
      const A = n[c];
      if (A.POSITION !== void 0) {
        const d = t.json.accessors[A.POSITION], u = d.min, p = d.max;
        if (u !== void 0 && p !== void 0) {
          if (l.setX(Math.max(Math.abs(u[0]), Math.abs(p[0]))), l.setY(Math.max(Math.abs(u[1]), Math.abs(p[1]))), l.setZ(Math.max(Math.abs(u[2]), Math.abs(p[2]))), d.normalized) {
            const g = ns($e[d.componentType]);
            l.multiplyScalar(g);
          }
          r.max(l);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    s.expandByVector(r);
  }
  a.boundingBox = s;
  const o = new It();
  s.getCenter(o.center), o.radius = s.min.distanceTo(s.max) / 2, a.boundingSphere = o;
}
function Vs(a, e, t) {
  const i = e.attributes, s = [];
  function n(o, r) {
    return t.getDependency("accessor", o).then(function(l) {
      a.setAttribute(r, l);
    });
  }
  for (const o in i) {
    const r = ss[o] || o.toLowerCase();
    r in a.attributes || s.push(n(i[o], r));
  }
  if (e.indices !== void 0 && !a.index) {
    const o = t.getDependency("accessor", e.indices).then(function(r) {
      a.setIndex(r);
    });
    s.push(o);
  }
  return $i.workingColorSpace !== le && "COLOR_0" in i && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${$i.workingColorSpace}" not supported.`), be(a, e), tl(a, e, t), Promise.all(s).then(function() {
    return e.targets !== void 0 ? Ja(a, e.targets, t) : a;
  });
}
const Ii = /* @__PURE__ */ new WeakMap();
class co extends ds {
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
    const n = new xe(this.manager);
    n.setPath(this.path), n.setResponseType("arraybuffer"), n.setRequestHeader(this.requestHeader), n.setWithCredentials(this.withCredentials), n.load(e, (o) => {
      this.parse(o, t, s);
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
    this.decodeDracoFile(e, t, null, null, Ce, i).catch(i);
  }
  //
  decodeDracoFile(e, t, i, s, n = le, o = () => {
  }) {
    const r = {
      attributeIDs: i || this.defaultAttributeIDs,
      attributeTypes: s || this.defaultAttributeTypes,
      useUniqueIDs: !!i,
      vertexColorSpace: n
    };
    return this.decodeGeometry(e, r).then(t).catch(o);
  }
  decodeGeometry(e, t) {
    const i = JSON.stringify(t);
    if (Ii.has(e)) {
      const l = Ii.get(e);
      if (l.key === i)
        return l.promise;
      if (e.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let s;
    const n = this.workerNextTaskID++, o = e.byteLength, r = this._getWorker(n, o).then((l) => (s = l, new Promise((c, h) => {
      s._callbacks[n] = { resolve: c, reject: h }, s.postMessage({ type: "decode", id: n, taskConfig: t, buffer: e }, [e]);
    }))).then((l) => this._createGeometry(l.geometry));
    return r.catch(() => !0).then(() => {
      s && n && this._releaseTask(s, n);
    }), Ii.set(e, {
      key: i,
      promise: r
    }), r;
  }
  _createGeometry(e) {
    const t = new ci();
    e.index && t.setIndex(new ne(e.index.array, 1));
    for (let i = 0; i < e.attributes.length; i++) {
      const s = e.attributes[i], n = s.name, o = s.array, r = s.itemSize, l = new ne(o, r);
      n === "color" && (this._assignVertexColorSpace(l, s.vertexColorSpace), l.normalized = !(o instanceof Float32Array)), t.setAttribute(n, l);
    }
    return t;
  }
  _assignVertexColorSpace(e, t) {
    if (t !== Ce) return;
    const i = new ye();
    for (let s = 0, n = e.count; s < n; s++)
      i.fromBufferAttribute(e, s), $i.colorSpaceToWorking(i, Ce), e.setXYZ(s, i.r, i.g, i.b);
  }
  _loadLibrary(e, t) {
    const i = new xe(this.manager);
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
      const n = il.toString(), o = [
        "/* draco decoder */",
        s,
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
        const s = new Worker(this.workerSourceURL);
        s._callbacks = {}, s._taskCosts = {}, s._taskLoad = 0, s.postMessage({ type: "init", decoderConfig: this.decoderConfig }), s.onmessage = function(n) {
          const o = n.data;
          switch (o.type) {
            case "decode":
              s._callbacks[o.id].resolve(o);
              break;
            case "error":
              s._callbacks[o.id].reject(o);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + o.type + '"');
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
function il() {
  let a, e;
  onmessage = function(o) {
    const r = o.data;
    switch (r.type) {
      case "init":
        a = r.decoderConfig, e = new Promise(function(h) {
          a.onModuleLoaded = function(A) {
            h({ draco: A });
          }, DracoDecoderModule(a);
        });
        break;
      case "decode":
        const l = r.buffer, c = r.taskConfig;
        e.then((h) => {
          const A = h.draco, d = new A.Decoder();
          try {
            const u = t(A, d, new Int8Array(l), c), p = u.attributes.map((g) => g.array.buffer);
            u.index && p.push(u.index.array.buffer), self.postMessage({ type: "decode", id: r.id, geometry: u }, p);
          } catch (u) {
            console.error(u), self.postMessage({ type: "error", id: r.id, error: u.message });
          } finally {
            A.destroy(d);
          }
        });
        break;
    }
  };
  function t(o, r, l, c) {
    const h = c.attributeIDs, A = c.attributeTypes;
    let d, u;
    const p = r.GetEncodedGeometryType(l);
    if (p === o.TRIANGULAR_MESH)
      d = new o.Mesh(), u = r.DecodeArrayToMesh(l, l.byteLength, d);
    else if (p === o.POINT_CLOUD)
      d = new o.PointCloud(), u = r.DecodeArrayToPointCloud(l, l.byteLength, d);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!u.ok() || d.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + u.error_msg());
    const g = { index: null, attributes: [] };
    for (const b in h) {
      const y = self[A[b]];
      let C, E;
      if (c.useUniqueIDs)
        E = h[b], C = r.GetAttributeByUniqueId(d, E);
      else {
        if (E = r.GetAttributeId(d, o[h[b]]), E === -1) continue;
        C = r.GetAttribute(d, E);
      }
      const m = s(o, r, d, b, y, C);
      b === "color" && (m.vertexColorSpace = c.vertexColorSpace), g.attributes.push(m);
    }
    return p === o.TRIANGULAR_MESH && (g.index = i(o, r, d)), o.destroy(d), g;
  }
  function i(o, r, l) {
    const h = l.num_faces() * 3, A = h * 4, d = o._malloc(A);
    r.GetTrianglesUInt32Array(l, A, d);
    const u = new Uint32Array(o.HEAPF32.buffer, d, h).slice();
    return o._free(d), { array: u, itemSize: 1 };
  }
  function s(o, r, l, c, h, A) {
    const d = A.num_components(), p = l.num_points() * d, g = p * h.BYTES_PER_ELEMENT, b = n(o, h), y = o._malloc(g);
    r.GetAttributeDataArrayForAllPoints(l, A, b, g, y);
    const C = new h(o.HEAPF32.buffer, y, p).slice();
    return o._free(y), {
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
class sl {
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
      const { resolve: s, msg: n, transfer: o } = this.queue.shift();
      this.workersResolve[e] = s, this.workers[e].postMessage(n, o);
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
const nl = 0, Os = 2, ol = 1, Hs = 2, rl = 0, al = 1, ll = 10, cl = 0, ho = 9, Ao = 15, uo = 16, po = 22, go = 37, fo = 43, mo = 76, bo = 83, Co = 97, yo = 100, Eo = 103, Io = 109, hl = 131, Al = 132, dl = 133, ul = 134, pl = 137, gl = 138, fl = 141, ml = 142, bl = 145, Cl = 146, wo = 148, Bo = 152, yl = 157, El = 158, So = 165, vo = 166, fs = 1000066e3;
class Il {
  constructor() {
    this.vkFormat = 0, this.typeSize = 1, this.pixelWidth = 0, this.pixelHeight = 0, this.pixelDepth = 0, this.layerCount = 0, this.faceCount = 1, this.supercompressionScheme = 0, this.levels = [], this.dataFormatDescriptor = [{ vendorId: 0, descriptorType: 0, descriptorBlockSize: 0, versionNumber: 2, colorModel: 0, colorPrimaries: 1, transferFunction: 2, flags: 0, texelBlockDimension: [0, 0, 0, 0], bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0], samples: [] }], this.keyValue = {}, this.globalData = null;
  }
}
class lt {
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
const K = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function qs(a) {
  return new TextDecoder().decode(a);
}
function wl(a) {
  const e = new Uint8Array(a.buffer, a.byteOffset, K.length);
  if (e[0] !== K[0] || e[1] !== K[1] || e[2] !== K[2] || e[3] !== K[3] || e[4] !== K[4] || e[5] !== K[5] || e[6] !== K[6] || e[7] !== K[7] || e[8] !== K[8] || e[9] !== K[9] || e[10] !== K[10] || e[11] !== K[11]) throw new Error("Missing KTX 2.0 identifier.");
  const t = new Il(), i = 17 * Uint32Array.BYTES_PER_ELEMENT, s = new lt(a, K.length, i, !0);
  t.vkFormat = s._nextUint32(), t.typeSize = s._nextUint32(), t.pixelWidth = s._nextUint32(), t.pixelHeight = s._nextUint32(), t.pixelDepth = s._nextUint32(), t.layerCount = s._nextUint32(), t.faceCount = s._nextUint32();
  const n = s._nextUint32();
  t.supercompressionScheme = s._nextUint32();
  const o = s._nextUint32(), r = s._nextUint32(), l = s._nextUint32(), c = s._nextUint32(), h = s._nextUint64(), A = s._nextUint64(), d = new lt(a, K.length + i, 3 * n * 8, !0);
  for (let k = 0; k < n; k++) t.levels.push({ levelData: new Uint8Array(a.buffer, a.byteOffset + d._nextUint64(), d._nextUint64()), uncompressedByteLength: d._nextUint64() });
  const u = new lt(a, o, r, !0), p = { vendorId: u._skip(4)._nextUint16(), descriptorType: u._nextUint16(), versionNumber: u._nextUint16(), descriptorBlockSize: u._nextUint16(), colorModel: u._nextUint8(), colorPrimaries: u._nextUint8(), transferFunction: u._nextUint8(), flags: u._nextUint8(), texelBlockDimension: [u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8()], bytesPlane: [u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8()], samples: [] }, g = (p.descriptorBlockSize / 4 - 6) / 4;
  for (let k = 0; k < g; k++) {
    const j = { bitOffset: u._nextUint16(), bitLength: u._nextUint8(), channelType: u._nextUint8(), samplePosition: [u._nextUint8(), u._nextUint8(), u._nextUint8(), u._nextUint8()], sampleLower: -1 / 0, sampleUpper: 1 / 0 };
    64 & j.channelType ? (j.sampleLower = u._nextInt32(), j.sampleUpper = u._nextInt32()) : (j.sampleLower = u._nextUint32(), j.sampleUpper = u._nextUint32()), p.samples[k] = j;
  }
  t.dataFormatDescriptor.length = 0, t.dataFormatDescriptor.push(p);
  const b = new lt(a, l, c, !0);
  for (; b._offset < c; ) {
    const k = b._nextUint32(), j = b._scan(k), Ee = qs(j);
    if (t.keyValue[Ee] = b._nextUint8Array(k - j.byteLength - 1), Ee.match(/^ktx/i)) {
      const rt = qs(t.keyValue[Ee]);
      t.keyValue[Ee] = rt.substring(0, rt.lastIndexOf("\0"));
    }
    b._skip(k % 4 ? 4 - k % 4 : 0);
  }
  if (A <= 0) return t;
  const y = new lt(a, h, A, !0), C = y._nextUint16(), E = y._nextUint16(), m = y._nextUint32(), I = y._nextUint32(), B = y._nextUint32(), w = y._nextUint32(), M = [];
  for (let k = 0; k < n; k++) M.push({ imageFlags: y._nextUint32(), rgbSliceByteOffset: y._nextUint32(), rgbSliceByteLength: y._nextUint32(), alphaSliceByteOffset: y._nextUint32(), alphaSliceByteLength: y._nextUint32() });
  const S = h + y._offset, x = S + m, R = x + I, L = R + B, q = new Uint8Array(a.buffer, a.byteOffset + S, m), T = new Uint8Array(a.buffer, a.byteOffset + x, I), te = new Uint8Array(a.buffer, a.byteOffset + R, B), z = new Uint8Array(a.buffer, a.byteOffset + L, w);
  return t.globalData = { endpointCount: C, selectorCount: E, imageDescs: M, endpointsData: q, selectorsData: T, tablesData: te, extendedData: z }, t;
}
let wi, me, os;
const Bi = { env: { emscripten_notify_memory_growth: function(a) {
  os = new Uint8Array(me.exports.memory.buffer);
} } };
let Bl = class {
  init() {
    return wi || (wi = typeof fetch < "u" ? fetch("data:application/wasm;base64," + zs).then((e) => e.arrayBuffer()).then((e) => WebAssembly.instantiate(e, Bi)).then(this._init) : WebAssembly.instantiate(Buffer.from(zs, "base64"), Bi).then(this._init), wi);
  }
  _init(e) {
    me = e.instance, Bi.env.emscripten_notify_memory_growth(0);
  }
  decode(e, t = 0) {
    if (!me) throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const i = e.byteLength, s = me.exports.malloc(i);
    os.set(e, s), t = t || Number(me.exports.ZSTD_findDecompressedSize(s, i));
    const n = me.exports.malloc(t), o = me.exports.ZSTD_decompress(n, t, s, i), r = os.slice(n, n + o);
    return me.exports.free(s), me.exports.free(n), r;
  }
};
const zs = "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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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", Sl = "display-p3", vl = "display-p3-linear", Si = /* @__PURE__ */ new WeakMap();
let vi = 0, Mi;
class ee extends ds {
  /**
   * Constructs a new KTX2 loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e), this.transcoderPath = "", this.transcoderBinary = null, this.transcoderPending = null, this.workerPool = new sl(), this.workerSourceURL = "", this.workerConfig = null, typeof MSC_TRANSCODER < "u" && console.warn(
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
      const t = e.loadAsync("basis_transcoder.js"), i = new xe(this.manager);
      i.setPath(this.transcoderPath), i.setResponseType("arraybuffer"), i.setWithCredentials(this.withCredentials);
      const s = i.loadAsync("basis_transcoder.wasm");
      this.transcoderPending = Promise.all([t, s]).then(([n, o]) => {
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
          const c = new Worker(this.workerSourceURL), h = this.transcoderBinary.slice(0);
          return c.postMessage({ type: "init", config: this.workerConfig, transcoderBinary: h }, [h]), c;
        });
      }), vi > 0 && console.warn(
        "THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."
      ), vi++;
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
    const n = new xe(this.manager);
    n.setPath(this.path), n.setCrossOrigin(this.crossOrigin), n.setWithCredentials(this.withCredentials), n.setResponseType("arraybuffer"), n.load(e, (o) => {
      this.parse(o, t, s);
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
    if (Si.has(e))
      return Si.get(e).promise.then(t).catch(i);
    this._createTexture(e).then((s) => t ? t(s) : null).catch(i);
  }
  _createTextureFrom(e, t) {
    const { type: i, error: s, data: { faces: n, width: o, height: r, format: l, type: c, dfdFlags: h } } = e;
    if (i === "error") return Promise.reject(s);
    let A;
    if (t.faceCount === 6)
      A = new Nr(n, l, c);
    else {
      const d = n[0].mipmaps;
      A = t.layerCount > 1 ? new Gr(d, o, r, t.layerCount, l, c) : new Xn(d, o, r, l, c);
    }
    return A.minFilter = n[0].mipmaps.length === 1 ? Ne : li, A.magFilter = Ne, A.generateMipmaps = !1, A.needsUpdate = !0, A.colorSpace = Mo(t), A.premultiplyAlpha = !!(h & ol), A;
  }
  /**
   * @private
   * @param {ArrayBuffer} buffer
   * @param {?Object} config
   * @return {Promise<CompressedTexture|CompressedArrayTexture|DataTexture|Data3DTexture>}
   */
  async _createTexture(e, t = {}) {
    const i = wl(new Uint8Array(e)), s = i.vkFormat === fs && i.dataFormatDescriptor[0].colorModel === 167;
    if (!(i.vkFormat === cl || s && !this.workerConfig.astcHDRSupported))
      return xl(i);
    const o = t, r = this.init().then(() => this.workerPool.postMessage({ type: "transcode", buffer: e, taskConfig: o }, [e])).then((l) => this._createTextureFrom(l.data, i));
    return Si.set(e, { promise: r }), r;
  }
  /**
   * Frees internal resources. This method should be called
   * when the loader is no longer required.
   */
  dispose() {
    this.workerPool.dispose(), this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL), vi--;
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
  RGBA_ASTC_4x4_Format: Yt,
  RGB_BPTC_UNSIGNED_Format: qr,
  RGBA_BPTC_Format: Zi,
  RGBA_ETC2_EAC_Format: $n,
  RGBA_PVRTC_4BPPV1_Format: Hr,
  RGBA_S3TC_DXT5_Format: es,
  RGB_ETC1_Format: Or,
  RGB_ETC2_Format: Zn,
  RGB_PVRTC_4BPPV1_Format: Vr,
  RGBA_S3TC_DXT1_Format: ts
};
ee.EngineType = {
  UnsignedByteType: re,
  HalfFloatType: Je,
  FloatType: yt
};
ee.BasisWorker = function() {
  let a, e, t;
  const i = _EngineFormat, s = _EngineType, n = _TranscoderFormat, o = _BasisFormat;
  self.addEventListener("message", function(p) {
    const g = p.data;
    switch (g.type) {
      case "init":
        a = g.config, r(g.transcoderBinary);
        break;
      case "transcode":
        e.then(() => {
          try {
            const { faces: b, buffers: y, width: C, height: E, hasAlpha: m, format: I, type: B, dfdFlags: w } = l(g.buffer);
            self.postMessage({ type: "transcode", id: g.id, data: { faces: b, width: C, height: E, hasAlpha: m, format: I, type: B, dfdFlags: w } }, y);
          } catch (b) {
            console.error(b), self.postMessage({ type: "error", id: g.id, error: b.message });
          }
        });
        break;
    }
  });
  function r(p) {
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
    let y;
    if (g.isUASTC())
      y = o.UASTC;
    else if (g.isETC1S())
      y = o.ETC1S;
    else if (g.isHDR())
      y = o.UASTC_HDR;
    else
      throw new Error("THREE.KTX2Loader: Unknown Basis encoding");
    const C = g.getWidth(), E = g.getHeight(), m = g.getLayers() || 1, I = g.getLevels(), B = g.getFaces(), w = g.getHasAlpha(), M = g.getDFDFlags(), { transcoderFormat: S, engineFormat: x, engineType: R } = A(y, C, E, w);
    if (!C || !E || !I)
      throw b(), new Error("THREE.KTX2Loader:	Invalid texture");
    if (!g.startTranscoding())
      throw b(), new Error("THREE.KTX2Loader: .startTranscoding failed");
    const L = [], q = [];
    for (let T = 0; T < B; T++) {
      const te = [];
      for (let z = 0; z < I; z++) {
        const k = [];
        let j, Ee;
        for (let Ve = 0; Ve < m; Ve++) {
          const Oe = g.getImageLevelInfo(z, Ve, T);
          T === 0 && z === 0 && Ve === 0 && (Oe.origWidth % 4 !== 0 || Oe.origHeight % 4 !== 0) && console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."), I > 1 ? (j = Oe.origWidth, Ee = Oe.origHeight) : (j = Oe.width, Ee = Oe.height);
          let He = new Uint8Array(g.getImageTranscodedSizeInBytes(z, Ve, 0, S));
          const cr = g.transcodeImage(He, z, Ve, T, S, 0, -1, -1);
          if (R === s.HalfFloatType && (He = new Uint16Array(He.buffer, He.byteOffset, He.byteLength / Uint16Array.BYTES_PER_ELEMENT)), !cr)
            throw b(), new Error("THREE.KTX2Loader: .transcodeImage failed.");
          k.push(He);
        }
        const rt = u(k);
        te.push({ data: rt, width: j, height: Ee }), q.push(rt.buffer);
      }
      L.push({ mipmaps: te, width: C, height: E, format: x, type: R });
    }
    return b(), { faces: L, buffers: q, width: C, height: E, hasAlpha: w, dfdFlags: M, format: x, type: R };
  }
  const c = [
    {
      if: "astcSupported",
      basisFormat: [o.UASTC],
      transcoderFormat: [n.ASTC_4x4, n.ASTC_4x4],
      engineFormat: [i.RGBA_ASTC_4x4_Format, i.RGBA_ASTC_4x4_Format],
      engineType: [s.UnsignedByteType],
      priorityETC1S: 1 / 0,
      priorityUASTC: 1,
      needsPowerOfTwo: !1
    },
    {
      if: "bptcSupported",
      basisFormat: [o.ETC1S, o.UASTC],
      transcoderFormat: [n.BC7_M5, n.BC7_M5],
      engineFormat: [i.RGBA_BPTC_Format, i.RGBA_BPTC_Format],
      engineType: [s.UnsignedByteType],
      priorityETC1S: 3,
      priorityUASTC: 2,
      needsPowerOfTwo: !1
    },
    {
      if: "dxtSupported",
      basisFormat: [o.ETC1S, o.UASTC],
      transcoderFormat: [n.BC1, n.BC3],
      engineFormat: [i.RGBA_S3TC_DXT1_Format, i.RGBA_S3TC_DXT5_Format],
      engineType: [s.UnsignedByteType],
      priorityETC1S: 4,
      priorityUASTC: 5,
      needsPowerOfTwo: !1
    },
    {
      if: "etc2Supported",
      basisFormat: [o.ETC1S, o.UASTC],
      transcoderFormat: [n.ETC1, n.ETC2],
      engineFormat: [i.RGB_ETC2_Format, i.RGBA_ETC2_EAC_Format],
      engineType: [s.UnsignedByteType],
      priorityETC1S: 1,
      priorityUASTC: 3,
      needsPowerOfTwo: !1
    },
    {
      if: "etc1Supported",
      basisFormat: [o.ETC1S, o.UASTC],
      transcoderFormat: [n.ETC1],
      engineFormat: [i.RGB_ETC1_Format],
      engineType: [s.UnsignedByteType],
      priorityETC1S: 2,
      priorityUASTC: 4,
      needsPowerOfTwo: !1
    },
    {
      if: "pvrtcSupported",
      basisFormat: [o.ETC1S, o.UASTC],
      transcoderFormat: [n.PVRTC1_4_RGB, n.PVRTC1_4_RGBA],
      engineFormat: [i.RGB_PVRTC_4BPPV1_Format, i.RGBA_PVRTC_4BPPV1_Format],
      engineType: [s.UnsignedByteType],
      priorityETC1S: 5,
      priorityUASTC: 6,
      needsPowerOfTwo: !0
    },
    {
      if: "bptcSupported",
      basisFormat: [o.UASTC_HDR],
      transcoderFormat: [n.BC6H],
      engineFormat: [i.RGB_BPTC_UNSIGNED_Format],
      engineType: [s.HalfFloatType],
      priorityHDR: 1,
      needsPowerOfTwo: !1
    },
    // Uncompressed fallbacks.
    {
      basisFormat: [o.ETC1S, o.UASTC],
      transcoderFormat: [n.RGBA32, n.RGBA32],
      engineFormat: [i.RGBAFormat, i.RGBAFormat],
      engineType: [s.UnsignedByteType, s.UnsignedByteType],
      priorityETC1S: 100,
      priorityUASTC: 100,
      needsPowerOfTwo: !1
    },
    {
      basisFormat: [o.UASTC_HDR],
      transcoderFormat: [n.RGBA_HALF],
      engineFormat: [i.RGBAFormat],
      engineType: [s.HalfFloatType],
      priorityHDR: 100,
      needsPowerOfTwo: !1
    }
  ], h = {
    // TODO: For ETC1S we intentionally sort by _UASTC_ priority, preserving
    // a historical accident shown to avoid performance pitfalls for Linux with
    // Firefox & AMD GPU (RadeonSI). Further work needed.
    // See https://github.com/mrdoob/three.js/pull/29730.
    [o.ETC1S]: c.filter((p) => p.basisFormat.includes(o.ETC1S)).sort((p, g) => p.priorityUASTC - g.priorityUASTC),
    [o.UASTC]: c.filter((p) => p.basisFormat.includes(o.UASTC)).sort((p, g) => p.priorityUASTC - g.priorityUASTC),
    [o.UASTC_HDR]: c.filter((p) => p.basisFormat.includes(o.UASTC_HDR)).sort((p, g) => p.priorityHDR - g.priorityHDR)
  };
  function A(p, g, b, y) {
    const C = h[p];
    for (let E = 0; E < C.length; E++) {
      const m = C[E];
      if (m.if && !a[m.if] || !m.basisFormat.includes(p) || y && m.transcoderFormat.length < 2 || m.needsPowerOfTwo && !(d(g) && d(b))) continue;
      const I = m.transcoderFormat[y ? 1 : 0], B = m.engineFormat[y ? 1 : 0], w = m.engineType[0];
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
    for (let C = 0; C < p.length; C++) {
      const E = p[C];
      g += E.byteLength;
    }
    const b = new Uint8Array(g);
    let y = 0;
    for (let C = 0; C < p.length; C++) {
      const E = p[C];
      b.set(E, y), y += E.byteLength;
    }
    return b;
  }
};
const Ml = /* @__PURE__ */ new Set([Ye, mt, ft]), xi = {
  [Io]: Ye,
  [Co]: Ye,
  [go]: Ye,
  [fo]: Ye,
  [Eo]: mt,
  [bo]: mt,
  [uo]: mt,
  [po]: mt,
  [yo]: ft,
  [mo]: ft,
  [Ao]: ft,
  [ho]: ft,
  [wo]: Zn,
  [Bo]: $n,
  [fs]: Yt,
  [El]: Yt,
  [yl]: Yt,
  [vo]: Ls,
  [So]: Ls,
  [dl]: ts,
  [ul]: ts,
  [hl]: Ds,
  [Al]: Ds,
  [gl]: Rs,
  [pl]: Rs,
  [ml]: es,
  [fl]: es,
  [Cl]: Zi,
  [bl]: Zi
}, Ti = {
  [Io]: yt,
  [Co]: Je,
  [go]: re,
  [fo]: re,
  [Eo]: yt,
  [bo]: Je,
  [uo]: re,
  [po]: re,
  [yo]: yt,
  [mo]: Je,
  [Ao]: re,
  [ho]: re,
  [wo]: re,
  [Bo]: re,
  [fs]: Je,
  [vo]: re,
  [So]: re
};
async function xl(a) {
  const { vkFormat: e } = a;
  if (xi[e] === void 0)
    throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");
  let t;
  a.supercompressionScheme === Os && (Mi || (Mi = new Promise(async (n) => {
    const o = new Bl();
    await o.init(), n(o);
  })), t = await Mi);
  const i = [];
  for (let n = 0; n < a.levels.length; n++) {
    const o = Math.max(1, a.pixelWidth >> n), r = Math.max(1, a.pixelHeight >> n), l = a.pixelDepth ? Math.max(1, a.pixelDepth >> n) : 0, c = a.levels[n];
    let h;
    if (a.supercompressionScheme === nl)
      h = c.levelData;
    else if (a.supercompressionScheme === Os)
      h = t.decode(c.levelData, c.uncompressedByteLength);
    else
      throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");
    let A;
    Ti[e] === yt ? A = new Float32Array(
      h.buffer,
      h.byteOffset,
      h.byteLength / Float32Array.BYTES_PER_ELEMENT
    ) : Ti[e] === Je ? A = new Uint16Array(
      h.buffer,
      h.byteOffset,
      h.byteLength / Uint16Array.BYTES_PER_ELEMENT
    ) : A = h, i.push({
      data: A,
      width: o,
      height: r,
      depth: l
    });
  }
  let s;
  if (Ml.has(xi[e]))
    s = a.pixelDepth === 0 ? new eo(i[0].data, a.pixelWidth, a.pixelHeight) : new Ur(i[0].data, a.pixelWidth, a.pixelHeight, a.pixelDepth);
  else {
    if (a.pixelDepth > 0) throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");
    s = new Xn(i, a.pixelWidth, a.pixelHeight), s.minFilter = i.length === 1 ? Ne : li, s.magFilter = Ne;
  }
  return s.mipmaps = i, s.type = Ti[e], s.format = xi[e], s.colorSpace = Mo(a), s.needsUpdate = !0, Promise.resolve(s);
}
function Mo(a) {
  const e = a.dataFormatDescriptor[0];
  return e.colorPrimaries === al ? e.transferFunction === Hs ? Ce : le : e.colorPrimaries === ll ? e.transferFunction === Hs ? Sl : vl : e.colorPrimaries === rl ? Qs : (console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${e.colorPrimaries}"`), Qs);
}
var Tl = function() {
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
  var s = WebAssembly.validate(t) ? r(e) : r(a), n, o = WebAssembly.instantiate(s, {}).then(function(y) {
    n = y.instance, n.exports.__wasm_call_ctors();
  });
  function r(y) {
    for (var C = new Uint8Array(y.length), E = 0; E < y.length; ++E) {
      var m = y.charCodeAt(E);
      C[E] = m > 96 ? m - 97 : m > 64 ? m - 39 : m + 4;
    }
    for (var I = 0, E = 0; E < y.length; ++E)
      C[I++] = C[E] < 60 ? i[C[E]] : (C[E] - 60) * 64 + C[++E];
    return C.buffer.slice(0, I);
  }
  function l(y, C, E, m, I, B, w) {
    var M = y.exports.sbrk, S = m + 3 & -4, x = M(S * I), R = M(B.length), L = new Uint8Array(y.exports.memory.buffer);
    L.set(B, R);
    var q = C(x, m, I, R, B.length);
    if (q == 0 && w && w(x, S, I), E.set(L.subarray(x, x + m * I)), M(x - M(0)), q != 0)
      throw new Error("Malformed buffer data: " + q);
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
      var m = E.data;
      C.pending -= m.count, C.requests[m.id][m.action](m.value), delete C.requests[m.id];
    }, C;
  }
  function p(y) {
    for (var C = "self.ready = WebAssembly.instantiate(new Uint8Array([" + new Uint8Array(s) + "]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = " + b.name + ";" + l.toString() + b.toString(), E = new Blob([C], { type: "text/javascript" }), m = URL.createObjectURL(E), I = A.length; I < y; ++I)
      A[I] = u(m);
    for (var I = y; I < A.length; ++I)
      A[I].object.postMessage({});
    A.length = y, URL.revokeObjectURL(m);
  }
  function g(y, C, E, m, I) {
    for (var B = A[0], w = 1; w < A.length; ++w)
      A[w].pending < B.pending && (B = A[w]);
    return new Promise(function(M, S) {
      var x = new Uint8Array(E), R = ++d;
      B.pending += y, B.requests[R] = { resolve: M, reject: S }, B.object.postMessage({ id: R, count: y, size: C, source: x, mode: m, filter: I }, [x.buffer]);
    });
  }
  function b(y) {
    var C = y.data;
    if (!C.id)
      return self.close();
    self.ready.then(function(E) {
      try {
        var m = new Uint8Array(C.count * C.size);
        l(E, E.exports[C.mode], m, C.count, C.size, C.source, E.exports[C.filter]), self.postMessage({ id: C.id, count: C.count, action: "resolve", value: m }, [m.buffer]);
      } catch (I) {
        self.postMessage({ id: C.id, count: C.count, action: "reject", value: I });
      }
    });
  }
  return {
    ready: o,
    supported: !0,
    useWorkers: function(y) {
      p(y);
    },
    decodeVertexBuffer: function(y, C, E, m, I) {
      l(n, n.exports.meshopt_decodeVertexBuffer, y, C, E, m, n.exports[c[I]]);
    },
    decodeIndexBuffer: function(y, C, E, m) {
      l(n, n.exports.meshopt_decodeIndexBuffer, y, C, E, m);
    },
    decodeIndexSequence: function(y, C, E, m) {
      l(n, n.exports.meshopt_decodeIndexSequence, y, C, E, m);
    },
    decodeGltfBuffer: function(y, C, E, m, I, B) {
      l(n, n.exports[h[I]], y, C, E, m, n.exports[c[B]]);
    },
    decodeGltfBufferAsync: function(y, C, E, m, I) {
      return A.length > 0 ? g(y, C, E, h[m], c[I]) : o.then(function() {
        var B = new Uint8Array(y * C);
        return l(n, n.exports[h[m]], B, y, C, E, n.exports[c[I]]), B;
      });
    }
  };
}();
function Ql(a) {
  if (!a) return;
  (Array.isArray(a) ? a : [a]).forEach((t) => {
    t && (Object.keys(t).forEach((i) => {
      const s = t[i];
      s && s.isTexture && s.dispose();
    }), typeof t.dispose == "function" && t.dispose());
  });
}
function Qi(a) {
  !a || !a.traverse || a.traverse((e) => {
    e.geometry && e.geometry.dispose(), e.material && Ql(e.material);
  });
}
function Rl() {
  f.Cache && typeof f.Cache.clear == "function" && f.Cache.clear();
}
class Z {
  constructor(e = null) {
    this.renderer = e, this.isIOSWebKit = Z.isIOSWebKit(), this.platformKey = Z.getPlatformKey(), this.loader = new Ue(), this.dracoLoader = new co(), this.ktx2Loader = null, this.loadQueue = Promise.resolve(), this.activeIOSLoad = !1, this.dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"), this.isIOSWebKit && typeof this.dracoLoader.setWorkerLimit == "function" && this.dracoLoader.setWorkerLimit(1), this.loader.setDRACOLoader(this.dracoLoader), this.loader.setMeshoptDecoder(Tl), this.loader.register((t) => ({
      name: "KHR_materials_pbrSpecularGlossiness",
      extendMaterialParams: async (i, s) => {
        const n = t.json.materials[i];
        if (!n.extensions || !n.extensions.KHR_materials_pbrSpecularGlossiness)
          return Promise.resolve();
        const o = n.extensions.KHR_materials_pbrSpecularGlossiness;
        return o.diffuseTexture !== void 0 && (s.map = await t.getDependency("texture", o.diffuseTexture.index)), o.diffuseFactor !== void 0 && (s.color = new f.Color().fromArray(o.diffuseFactor)), o.glossinessFactor !== void 0 && (s.roughness = 1 - o.glossinessFactor), s.metalness = 0, Promise.resolve();
      }
    })), this.cache = /* @__PURE__ */ new Map(), this.ktx2SetupComplete = !1, this.setupKTX2Loader();
  }
  setupKTX2Loader() {
    const e = this.platformKey;
    try {
      if (!Z.sharedKTX2Loaders.has(e)) {
        const t = new ee();
        t.setTranscoderPath("https://cdn.jsdelivr.net/npm/three@0.177.0/examples/jsm/libs/basis/"), this.isIOSWebKit && typeof t.setWorkerLimit == "function" && t.setWorkerLimit(1), Z.sharedKTX2Loaders.set(e, t), Z.sharedKTX2SetupComplete.set(e, !1);
      }
      this.ktx2Loader = Z.sharedKTX2Loaders.get(e), this.loader.setKTX2Loader(this.ktx2Loader), this.ktx2SetupComplete = Z.sharedKTX2SetupComplete.get(e) || !1, this.renderer && !this.ktx2SetupComplete && this.ensureKTX2Support();
    } catch (t) {
      console.warn("KTX2 loader setup failed, falling back to standard textures:", t), this.ktx2Loader = null;
    }
  }
  ensureKTX2Support() {
    if (!this.ktx2Loader || !this.renderer)
      return;
    const e = this.platformKey;
    if (Z.sharedKTX2SetupComplete.get(e)) {
      this.ktx2SetupComplete = !0;
      return;
    }
    try {
      this.ktx2Loader.detectSupport(this.renderer), Z.sharedKTX2SetupComplete.set(e, !0), this.ktx2SetupComplete = !0;
    } catch (t) {
      console.warn("Failed to set up KTX2 loader with renderer:", t);
    }
  }
  setRenderer(e) {
    this.renderer = e, e && (this.ktx2Loader ? this.ensureKTX2Support() : this.setupKTX2Loader());
  }
  async load(e, t = null, i = null, s = null) {
    if (this.cache.has(e)) {
      s && s("cloning");
      const l = this.cache.get(e).scene.clone(!0);
      return this.processModel({ scene: l });
    }
    const n = () => this.performLoad(e, t, i, s);
    if (!this.isIOSWebKit)
      return n();
    const o = this.loadQueue.then(() => (this.activeIOSLoad && typeof s == "function" && s("freeing-resources"), n()));
    return this.loadQueue = o.catch(() => {
    }), o;
  }
  performLoad(e, t = null, i = null, s = null) {
    return new Promise((n, o) => {
      let r = null;
      const l = () => {
        i && r && (i.removeEventListener("abort", r), r = null);
      }, c = () => {
        l(), this.isIOSWebKit && (this.activeIOSLoad = !1), o(new Error("Loading cancelled"));
      };
      if (i && (r = c, i.addEventListener("abort", r), i.aborted)) {
        c();
        return;
      }
      s && s("downloading"), this.isIOSWebKit && (this.activeIOSLoad = !0), this.loader.load(
        e,
        (h) => {
          if (s && s("processing"), i && i.aborted) {
            l();
            return;
          }
          this.cache.set(e, h);
          const A = this.processModel(h);
          s && s("finalizing"), this.releaseParserCaches(h), l(), this.isIOSWebKit && (this.activeIOSLoad = !1), n(A);
        },
        (h) => {
          i && i.aborted || t && t(h);
        },
        (h) => {
          l(), this.isIOSWebKit && (this.activeIOSLoad = !1), o(h);
        }
      );
    });
  }
  processModel(e) {
    const t = e.scene, i = this.getMaxAnisotropy();
    t.traverse((n) => {
      if (n.isLight && (n.visible = !1), n.isMesh && n.material) {
        n.castShadow = !0, n.receiveShadow = !0;
        const o = Array.isArray(n.material) ? n.material : [n.material];
        o.forEach((r, l) => {
          if (r.emissive && r.emissive.setHex(0), r.emissiveIntensity !== void 0 && (r.emissiveIntensity = 0), r.emissiveMap && (r.emissiveMap = null), r.lightMap && (r.lightMap = null), r.lightMapIntensity !== void 0 && (r.lightMapIntensity = 0), r.type === "MeshBasicMaterial" || r.type === "MeshPhongMaterial") {
            const h = new f.MeshStandardMaterial({
              // Only include common, safe params; set specialized textures conditionally below
              color: r.color || new f.Color(16777215),
              side: r.side !== void 0 ? r.side : f.FrontSide,
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
            r.map && (h.map = r.map), r.alphaMap && (h.alphaMap = r.alphaMap), r.aoMap && (h.aoMap = r.aoMap), typeof r.aoMapIntensity == "number" && (h.aoMapIntensity = r.aoMapIntensity), r.envMap && (h.envMap = r.envMap), r.roughnessMap && (h.roughnessMap = r.roughnessMap), r.metalnessMap && (h.metalnessMap = r.metalnessMap), r.transparent !== void 0 && (h.transparent = r.transparent), typeof r.opacity == "number" && (h.opacity = r.opacity), r.normalMap && (h.normalMap = r.normalMap, h.normalScale = r.normalScale || new f.Vector2(1, 1)), i !== null && ["map", "normalMap", "roughnessMap", "metalnessMap", "aoMap"].forEach((d) => {
              h[d] && (h[d].anisotropy = i, h[d].needsUpdate = !0);
            }), h.needsUpdate = !0, Array.isArray(n.material) ? n.material[l] = h : n.material = h, r !== h && typeof r?.dispose == "function" && r.dispose();
          } else (r.type === "MeshStandardMaterial" || r.type === "MeshPhysicalMaterial") && (i !== null && ["map", "normalMap", "roughnessMap", "metalnessMap", "aoMap", "emissiveMap"].forEach((A) => {
            r[A] && (r[A].anisotropy = i, r[A].needsUpdate = !0);
          }), r.needsUpdate = !0);
          const c = Array.isArray(n.material) ? n.material[l] : n.material;
          c && c.needsUpdate !== void 0 && (c.needsUpdate = !0);
        }), n.geometry && (n.geometry.computeVertexNormals(), n.geometry.normalizeNormals(), o.some((l) => l.normalMap) && n.geometry.computeTangents());
      }
    });
    const s = new f.Box3().setFromObject(t);
    return t.userData.boundingBox = s, t;
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
        const o = s[n];
        o && typeof o.dispose == "function" && o.dispose(), o && o.source && typeof o.source.dispose == "function" && o.source.dispose(), o && o.image && typeof o.image.close == "function" && o.image.close(), o && (s[n] = null);
      }), typeof s.dispose == "function" && s.dispose());
    });
  }
  releaseParserCaches(e) {
    const t = e?.parser;
    t && (t.cache && typeof t.cache.removeAll == "function" && t.cache.removeAll(), t.associations && typeof t.associations.clear == "function" && t.associations.clear(), t.primitiveCache = {}, t.nodeCache = {}, t.meshCache = { refs: {}, uses: {} }, t.cameraCache = { refs: {}, uses: {} }, t.lightCache = { refs: {}, uses: {} }, t.sourceCache = {}, t.textureCache = {}, t.nodeNamesUsed = {}, t.json = null, t.extensions = null, t.plugins = null, t.options = null, t.textureLoader = null, e.parser = null, Rl());
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
    return Z.isIOSWebKit() ? "ios" : "default";
  }
}
Z.sharedKTX2Loaders = /* @__PURE__ */ new Map();
Z.sharedKTX2SetupComplete = /* @__PURE__ */ new Map();
let Dl = class {
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
    const { bytesMap: i, itemSet: s } = this;
    s.has(e) && (this.cachedBytes -= i.get(e) || 0, i.set(e, t), this.cachedBytes += t);
  }
  add(e, t) {
    const i = this.itemSet;
    if (i.has(e) || this.isFull())
      return !1;
    const s = this.usedSet, n = this.itemList, o = this.callbacks;
    return n.push(e), s.add(e), i.set(e, Date.now()), o.set(e, t), !0;
  }
  has(e) {
    return this.itemSet.has(e);
  }
  remove(e) {
    const t = this.usedSet, i = this.itemSet, s = this.itemList, n = this.bytesMap, o = this.callbacks, r = this.loadedSet;
    if (i.has(e)) {
      this.cachedBytes -= n.get(e) || 0, n.delete(e), o.get(e)(e);
      const l = s.indexOf(e);
      return s.splice(l, 1), t.delete(e), i.delete(e), o.delete(e), r.delete(e), !0;
    }
    return !1;
  }
  // Marks whether tiles in the cache have been completely loaded or not. Tiles that have not been completely
  // loaded are subject to being disposed early if the cache is full above its max size limits, even if they
  // are marked as used.
  setLoaded(e, t) {
    const { itemSet: i, loadedSet: s } = this;
    i.has(e) && (t === !0 ? s.add(e) : s.delete(e));
  }
  markUsed(e) {
    const t = this.itemSet, i = this.usedSet;
    t.has(e) && !i.has(e) && (t.set(e, Date.now()), i.add(e));
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
      maxSize: i,
      itemList: s,
      itemSet: n,
      usedSet: o,
      loadedSet: r,
      callbacks: l,
      bytesMap: c,
      minBytesSize: h,
      maxBytesSize: A
    } = this, d = s.length - o.size, u = s.length - r.size, p = Math.max(Math.min(s.length - t, d), 0), g = this.cachedBytes - h, b = this.unloadPriorityCallback || this.defaultPriorityCallback;
    let y = !1;
    const C = p > 0 && d > 0 || u && s.length > i;
    if (d && this.cachedBytes > h || u && this.cachedBytes > A || C) {
      s.sort((S, x) => {
        const R = o.has(S), L = o.has(x);
        if (R === L) {
          const q = r.has(S), T = r.has(x);
          return q === T ? -b(S, x) : q ? 1 : -1;
        } else
          return R ? 1 : -1;
      });
      const E = Math.max(t * e, p * e), m = Math.ceil(Math.min(E, d, p)), I = Math.max(e * g, e * h), B = Math.min(I, g);
      let w = 0, M = 0;
      for (; this.cachedBytes - M > A || s.length - w > i; ) {
        const S = s[w], x = c.get(S) || 0;
        if (o.has(S) && r.has(S) || this.cachedBytes - M - x < A && s.length - w <= i)
          break;
        M += x, w++;
      }
      for (; M < B || w < m; ) {
        const S = s[w], x = c.get(S) || 0;
        if (o.has(S) || this.cachedBytes - M - x < h && w >= m)
          break;
        M += x, w++;
      }
      s.splice(0, w).forEach((S) => {
        this.cachedBytes -= c.get(S) || 0, l.get(S)(S), c.delete(S), n.delete(S), l.delete(S), r.delete(S), o.delete(S);
      }), y = w < p || M < g && w < d, y = y && w > 0;
    }
    y && (this.unloadingHandle = requestAnimationFrame(() => this.scheduleUnload()));
  }
  scheduleUnload() {
    cancelAnimationFrame(this.unloadingHandle), this.scheduled || (this.scheduled = !0, queueMicrotask(() => {
      this.scheduled = !1, this.unloadUnusedContent();
    }));
  }
}, js = class extends Error {
  constructor() {
    super("PriorityQueue: Item removed"), this.name = "PriorityQueueItemRemovedError";
  }
}, Ri = class {
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
    const i = {
      callback: t,
      reject: null,
      resolve: null,
      promise: null
    };
    return i.promise = new Promise((s, n) => {
      const o = this.items, r = this.callbacks;
      i.resolve = s, i.reject = n, o.unshift(e), r.set(e, i), this.autoUpdate && this.scheduleJobRun();
    }), i.promise;
  }
  remove(e) {
    const t = this.items, i = this.callbacks, s = t.indexOf(e);
    if (s !== -1) {
      const n = i.get(e);
      n.promise.catch((o) => {
        if (!(o instanceof js))
          throw o;
      }), n.reject(new js()), t.splice(s, 1), i.delete(e);
    }
  }
  removeByFilter(e) {
    const { items: t } = this;
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      e(s) && (this.remove(s), i--);
    }
  }
  tryRunJobs() {
    this.sort();
    const e = this.items, t = this.callbacks, i = this.maxJobs;
    let s = 0;
    const n = () => {
      this.currJobs--, this.autoUpdate && this.scheduleJobRun();
    };
    for (; i > this.currJobs && e.length > 0 && s < i; ) {
      this.currJobs++, s++;
      const o = e.pop(), { callback: r, resolve: l, reject: c } = t.get(o);
      t.delete(o);
      let h;
      try {
        h = r(o);
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
const _e = -1, we = 0, Qt = 1, Rt = 2, Di = 3, ae = 4, Ks = 6378137, Ll = 6356752314245179e-9;
function kl(a, e = null, t = null) {
  const i = [];
  for (i.push(a), i.push(null), i.push(0); i.length > 0; ) {
    const s = i.pop(), n = i.pop(), o = i.pop();
    if (e && e(o, n, s)) {
      t && t(o, n, s);
      return;
    }
    const r = o.children;
    if (r)
      for (let l = r.length - 1; l >= 0; l--)
        i.push(r[l]), i.push(o), i.push(s + 1);
    t && t(o, n, s);
  }
}
function Ge(a) {
  if (a === null || a.byteLength < 4)
    return "";
  let e;
  if (a instanceof DataView ? e = a : e = new DataView(a), String.fromCharCode(e.getUint8(0)) === "{")
    return null;
  let t = "";
  for (let i = 0; i < 4; i++)
    t += String.fromCharCode(e.getUint8(i));
  return t;
}
const Fl = new TextDecoder();
function ms(a) {
  return Fl.decode(a);
}
function bs(a) {
  return a.replace(/[\\/][^\\/]+$/, "") + "/";
}
let Bt = class {
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
    }).then((t) => (this.workingPath === "" && (this.workingPath = bs(e)), this.parse(t)));
  }
  resolveExternalURL(e) {
    return new URL(e, this.workingPath).href;
  }
  parse(e) {
    throw new Error("LoaderBase: Parse not implemented.");
  }
};
function Ys(a) {
  if (!a)
    return null;
  let e = a.length;
  const t = a.indexOf("?"), i = a.indexOf("#");
  t !== -1 && (e = Math.min(e, t)), i !== -1 && (e = Math.min(e, i));
  const s = a.lastIndexOf(".", e), n = a.lastIndexOf("/", e), o = a.indexOf("://");
  return o !== -1 && o + 2 === n || s === -1 || s < n ? null : a.substring(s + 1, e) || null;
}
const Dt = {
  inView: !1,
  error: 1 / 0,
  distanceFromCamera: 1 / 0
};
function $t(a) {
  return a === ae || a === _e;
}
function Te(a, e) {
  return xo(a) && a.traversal.lastFrameVisited === e && a.traversal.used;
}
function xo(a) {
  return !!a.traversal;
}
function St(a) {
  const e = a.children.length === 0 || !!a.children[0].internal, t = !a.internal.hasUnrenderableContent || $t(a.internal.loadingState);
  return e && t;
}
function tt(a) {
  return a.internal.hasUnrenderableContent || a.parent && a.parent.geometricError < a.geometricError;
}
function ui(a, e) {
  e.ensureChildrenArePreprocessed(a), a.traversal.lastFrameVisited !== e.frameCount && (a.traversal.lastFrameVisited = e.frameCount, a.traversal.used = !1, a.traversal.inFrustum = !1, a.traversal.isLeaf = !1, a.traversal.visible = !1, a.traversal.active = !1, a.traversal.error = 1 / 0, a.traversal.distanceFromCamera = 1 / 0, a.traversal.allChildrenReady = !1, a.traversal.kicked = !1, a.traversal.allUsedChildrenProcessed = !1, e.calculateTileViewErrorWithPlugin(a, Dt), a.traversal.inFrustum = Dt.inView, a.traversal.error = Dt.error, a.traversal.distanceFromCamera = Dt.distanceFromCamera);
}
function rs(a, e, t = !1) {
  if (ui(a, e), t ? e.markTileUsed(a) : Zt(a), tt(a) && St(a)) {
    const i = a.children;
    for (let s = 0, n = i.length; s < n; s++)
      rs(i[s], e, t);
  }
}
function To(a, e) {
  if (ui(a, e), a.traversal.usedLastFrame && (Zt(a), a.traversal.wasSetActive && (a.traversal.active = !0), (!a.traversal.active || tt(a)) && St(a))) {
    const t = a.children;
    for (let i = 0, s = t.length; i < s; i++)
      To(t[i], e);
  }
}
function Zt(a) {
  a.traversal.used = !0;
}
function _l(a, e) {
  return !(a.traversal.error <= e.errorTarget && !tt(a) || e.maxDepth > 0 && a.internal.depth + 1 >= e.maxDepth || !St(a));
}
function Qo(a, e) {
  const { frameCount: t } = e, { children: i } = a;
  for (let s = 0, n = i.length; s < n; s++) {
    const o = i[s];
    Te(o, t) && (o.traversal.active && (o.traversal.kicked = !0, o.traversal.active = !1), Qo(o, e));
  }
}
function Js(a) {
  return !tt(a) && (!a.internal.hasContent || $t(a.internal.loadingState));
}
function Ro(a, e) {
  if (ui(a, e), !a.traversal.inFrustum)
    return;
  if (!_l(a, e)) {
    Zt(a);
    return;
  }
  let t = !1, i = !1;
  const s = a.children;
  for (let n = 0, o = s.length; n < o; n++) {
    const r = s[n];
    Ro(r, e), t = t || Te(r, e.frameCount), i = i || r.traversal.inFrustum;
  }
  if (a.refine === "REPLACE" && !i && s.length !== 0) {
    a.traversal.inFrustum = !1, e.markTileUsed(a);
    for (let n = 0, o = s.length; n < o; n++)
      rs(s[n], e, !0);
    return;
  }
  if (Zt(a), a.refine === "REPLACE" && t && e.loadSiblings)
    for (let n = 0, o = s.length; n < o; n++)
      rs(s[n], e);
}
function Do(a, e) {
  const t = e.frameCount;
  if (!Te(a, t))
    return;
  const i = a.children;
  let s = !1;
  for (let o = 0, r = i.length; o < r; o++) {
    const l = i[o];
    s = s || Te(l, t);
  }
  if (!s)
    a.traversal.isLeaf = !0;
  else
    for (let o = 0, r = i.length; o < r; o++)
      Do(i[o], e);
  let n = !0;
  for (let o = 0, r = i.length; o < r; o++) {
    const l = i[o];
    Te(l, e.frameCount) && !l.traversal.allUsedChildrenProcessed && (n = !1);
  }
  a.traversal.allUsedChildrenProcessed = n && St(a);
}
function Lo(a, e) {
  if (!Te(a, e.frameCount))
    return;
  const t = a.internal.hasContent, i = $t(a.internal.loadingState) && t, s = a.children;
  if (a.traversal.isLeaf) {
    if (!tt(a) && (a.traversal.active = !0, St(a) && (!a.internal.hasContent || !$t(a.internal.loadingState))))
      for (let r = 0, l = s.length; r < l; r++)
        To(s[r], e);
    return;
  }
  let n = s.length > 0;
  for (let r = 0, l = s.length; r < l; r++) {
    const c = s[r];
    Lo(c, e), Te(c, e.frameCount) && !(c.traversal.active && Js(c)) && !c.traversal.allChildrenReady && (n = !1);
  }
  a.traversal.allChildrenReady = n;
  const o = a.traversal.active && Js(a);
  !tt(a) && !n && !o && a.traversal.wasSetActive && (i || !a.internal.hasContent) && (a.traversal.active = !0, Qo(a, e));
}
function ko(a, e) {
  var t;
  const i = Te(a, e.frameCount);
  if (i && ((a.internal.hasUnrenderableContent || a.internal.hasRenderableContent && a.refine === "ADD") && (a.traversal.active = !0), (a.traversal.active || a.traversal.kicked) && a.internal.hasContent ? (e.markTileUsed(a), (a.internal.hasUnrenderableContent || a.traversal.allUsedChildrenProcessed) && e.queueTileForDownload(a), a.internal.loadingState !== ae && (a.traversal.active = !1)) : a.traversal.active = !1, a.traversal.visible = a.internal.hasRenderableContent && a.traversal.active && a.traversal.inFrustum && a.internal.loadingState === ae, e.stats.used++, a.traversal.inFrustum && e.stats.inFrustum++), i || xo(a) && (t = a.traversal) != null && t.usedLastFrame) {
    let s = !1, n = !1;
    i ? (s = a.traversal.active, e.displayActiveTiles ? n = a.traversal.active || a.traversal.visible : n = a.traversal.visible) : ui(a, e), a.internal.hasRenderableContent && a.internal.loadingState === ae && (a.traversal.wasSetActive !== s && (e.stats.active += s ? 1 : -1, e.invokeOnePlugin((r) => r.setTileActive && r.setTileActive(a, s))), a.traversal.wasSetVisible !== n && (e.stats.visible += n ? 1 : -1, e.invokeOnePlugin((r) => r.setTileVisible && r.setTileVisible(a, n)))), a.traversal.wasSetActive = s, a.traversal.wasSetVisible = n, a.traversal.usedLastFrame = i;
    const o = a.children;
    for (let r = 0, l = o.length; r < l; r++) {
      const c = o[r];
      ko(c, e);
    }
  }
}
function Pl(a, e) {
  Ro(a, e), Do(a, e), Lo(a, e), ko(a, e);
}
const Lt = {
  inView: !1,
  error: 1 / 0,
  distanceFromCamera: 1 / 0
}, Fo = !0;
function _o(a) {
  return a === ae || a === _e;
}
function Qe(a, e) {
  return Po(a) && a.traversal.lastFrameVisited === e && a.traversal.used;
}
function Po(a) {
  return !!a.traversal;
}
function Cs(a) {
  return a.children.length === 0 || !!a.children[0].internal;
}
function ys(a) {
  return a.internal.hasUnrenderableContent || a.parent && a.parent.geometricError < a.geometricError;
}
function Es(a, e) {
  a.traversal.lastFrameVisited !== e.frameCount && (a.traversal.lastFrameVisited = e.frameCount, a.traversal.used = !1, a.traversal.inFrustum = !1, a.traversal.isLeaf = !1, a.traversal.visible = !1, a.traversal.active = !1, a.traversal.error = 1 / 0, a.traversal.distanceFromCamera = 1 / 0, a.traversal.allChildrenReady = !1, e.calculateTileViewErrorWithPlugin(a, Lt), a.traversal.inFrustum = Lt.inView, a.traversal.error = Lt.error, a.traversal.distanceFromCamera = Lt.distanceFromCamera);
}
function as(a, e, t = !1) {
  if (e.ensureChildrenArePreprocessed(a), Es(a, e), ls(a, e, t), ys(a) && Cs(a)) {
    const i = a.children;
    for (let s = 0, n = i.length; s < n; s++)
      as(i[s], e, t);
  }
}
function No(a, e) {
  if (e.ensureChildrenArePreprocessed(a), Qe(a, e.frameCount) && (a.internal.hasContent && e.queueTileForDownload(a), Cs(a))) {
    const t = a.children;
    for (let i = 0, s = t.length; i < s; i++)
      No(t[i], e);
  }
}
function ls(a, e, t = !1) {
  a.traversal.used || (t || (a.traversal.used = !0, e.stats.used++), e.markTileUsed(a), a.traversal.inFrustum === !0 && e.stats.inFrustum++);
}
function Nl(a, e) {
  return !(a.traversal.error <= e.errorTarget && !ys(a) || e.maxDepth > 0 && a.internal.depth + 1 >= e.maxDepth || !Cs(a));
}
function Go(a, e) {
  if (e.ensureChildrenArePreprocessed(a), Es(a, e), !a.traversal.inFrustum)
    return;
  if (!Nl(a, e)) {
    ls(a, e);
    return;
  }
  let t = !1, i = !1;
  const s = a.children;
  for (let n = 0, o = s.length; n < o; n++) {
    const r = s[n];
    Go(r, e), t = t || Qe(r, e.frameCount), i = i || r.traversal.inFrustum;
  }
  if (a.refine === "REPLACE" && !i && s.length !== 0) {
    a.traversal.inFrustum = !1;
    for (let n = 0, o = s.length; n < o; n++)
      as(s[n], e, !0);
    return;
  }
  if (ls(a, e), a.refine === "REPLACE" && (t && a.internal.depth !== 0 || Fo))
    for (let n = 0, o = s.length; n < o; n++)
      as(s[n], e);
}
function Uo(a, e) {
  const t = e.frameCount;
  if (!Qe(a, t))
    return;
  const i = a.children;
  let s = !1;
  for (let n = 0, o = i.length; n < o; n++) {
    const r = i[n];
    s = s || Qe(r, t);
  }
  if (!s)
    a.traversal.isLeaf = !0;
  else {
    let n = !0;
    for (let o = 0, r = i.length; o < r; o++) {
      const l = i[o];
      if (Uo(l, e), Qe(l, t)) {
        const c = !ys(l);
        let h = !l.internal.hasContent || l.internal.hasRenderableContent && _o(l.internal.loadingState) || l.internal.hasUnrenderableContent && l.internal.loadingState === _e;
        h = c && h || l.traversal.allChildrenReady, n = n && h;
      }
    }
    a.traversal.allChildrenReady = n;
  }
}
function Vo(a, e) {
  const t = e.stats;
  if (!Qe(a, e.frameCount))
    return;
  if (a.traversal.isLeaf) {
    a.internal.loadingState === ae ? (a.traversal.inFrustum && (a.traversal.visible = !0, t.visible++), a.traversal.active = !0, t.active++) : a.internal.hasContent && e.queueTileForDownload(a);
    return;
  }
  const i = a.children, s = a.internal.hasContent, n = _o(a.internal.loadingState) && s, o = (e.errorTarget + 1) * e.errorThreshold, r = a.traversal.error <= o, l = a.refine === "ADD", c = a.traversal.allChildrenReady || a.internal.depth === 0 && !Fo;
  if (s && (r || l) && e.queueTileForDownload(a), (r && n && !c || n && l) && (a.traversal.inFrustum && (a.traversal.visible = !0, t.visible++), a.traversal.active = !0, t.active++), !l && r && !c)
    for (let h = 0, A = i.length; h < A; h++) {
      const d = i[h];
      Qe(d, e.frameCount) && No(d, e);
    }
  else
    for (let h = 0, A = i.length; h < A; h++)
      Vo(i[h], e);
}
function Oo(a, e) {
  const t = Qe(a, e.frameCount);
  if (t || Po(a) && a.traversal.usedLastFrame) {
    let i = !1, s = !1;
    t ? (i = a.traversal.active, e.displayActiveTiles ? s = a.traversal.active || a.traversal.visible : s = a.traversal.visible) : Es(a, e), a.internal.hasRenderableContent && a.internal.loadingState === ae && (a.traversal.wasSetActive !== i && e.invokeOnePlugin((o) => o.setTileActive && o.setTileActive(a, i)), a.traversal.wasSetVisible !== s && e.invokeOnePlugin((o) => o.setTileVisible && o.setTileVisible(a, s))), a.traversal.wasSetActive = i, a.traversal.wasSetVisible = s, a.traversal.usedLastFrame = t;
    const n = a.children;
    for (let o = 0, r = n.length; o < r; o++) {
      const l = n[o];
      Oo(l, e);
    }
  }
}
function Gl(a, e) {
  Go(a, e), Uo(a, e), Vo(a, e), Oo(a, e);
}
function Ul(a) {
  let e = null;
  return () => {
    e === null && (e = requestAnimationFrame(() => {
      e = null, a();
    }));
  };
}
const Ws = Symbol("PLUGIN_REGISTERED"), Be = {
  inView: !0,
  error: 0,
  distance: 1 / 0
}, Li = (a, e) => {
  const t = a.priority || 0, i = e.priority || 0;
  return t !== i ? t > i ? 1 : -1 : !a.traversal || !e.traversal ? 0 : a.traversal.used !== e.traversal.used ? a.traversal.used ? 1 : -1 : a.traversal.error !== e.traversal.error ? a.traversal.error > e.traversal.error ? 1 : -1 : a.traversal.distanceFromCamera !== e.traversal.distanceFromCamera ? a.traversal.distanceFromCamera > e.traversal.distanceFromCamera ? -1 : 1 : a.internal.depthFromRenderedParent !== e.internal.depthFromRenderedParent ? a.internal.depthFromRenderedParent > e.internal.depthFromRenderedParent ? -1 : 1 : 0;
}, Vl = (a, e) => {
  const t = a.priority || 0, i = e.priority || 0;
  return t !== i ? t > i ? 1 : -1 : !a.traversal || !e.traversal ? 0 : a.traversal.used !== e.traversal.used ? a.traversal.used ? 1 : -1 : a.traversal.inFrustum !== e.traversal.inFrustum ? a.traversal.inFrustum ? 1 : -1 : a.internal.hasUnrenderableContent !== e.internal.hasUnrenderableContent ? a.internal.hasUnrenderableContent ? 1 : -1 : a.traversal.distanceFromCamera !== e.traversal.distanceFromCamera ? a.traversal.distanceFromCamera > e.traversal.distanceFromCamera ? -1 : 1 : 0;
}, Ol = (a, e) => {
  const t = a.priority || 0, i = e.priority || 0;
  return t !== i ? t > i ? 1 : -1 : !a.traversal || !e.traversal ? 0 : a.traversal.lastFrameVisited !== e.traversal.lastFrameVisited ? a.traversal.lastFrameVisited > e.traversal.lastFrameVisited ? -1 : 1 : a.internal.depthFromRenderedParent !== e.internal.depthFromRenderedParent ? a.internal.depthFromRenderedParent > e.internal.depthFromRenderedParent ? 1 : -1 : a.internal.loadingState !== e.internal.loadingState ? a.internal.loadingState > e.internal.loadingState ? -1 : 1 : a.internal.hasUnrenderableContent !== e.internal.hasUnrenderableContent ? a.internal.hasUnrenderableContent ? -1 : 1 : a.traversal.error !== e.traversal.error ? a.traversal.error > e.traversal.error ? -1 : 1 : 0;
};
class Hl {
  get root() {
    const e = this.rootTileset;
    return e ? e.root : null;
  }
  get rootTileSet() {
    return console.warn('TilesRenderer: "rootTileSet" has been deprecated. Use "rootTileset" instead.'), this.rootTileset;
  }
  get loadProgress() {
    const { stats: e, isLoading: t } = this, i = e.queued + e.downloading + e.parsing, s = e.inCacheSinceLoad + (t ? 1 : 0);
    return s === 0 ? 1 : 1 - i / s;
  }
  get errorThreshold() {
    return this._errorThreshold;
  }
  set errorThreshold(e) {
    console.warn('TilesRenderer: The "errorThreshold" option has been deprecated.'), this._errorThreshold = e;
  }
  constructor(e = null) {
    this.rootLoadingState = we, this.rootTileset = null, this.rootURL = e, this.fetchOptions = {}, this.plugins = [], this.queuedTiles = [], this.cachedSinceLoadComplete = /* @__PURE__ */ new Set(), this.isLoading = !1;
    const t = new Dl();
    t.unloadPriorityCallback = Ol;
    const i = new Ri();
    i.maxJobs = 25, i.priorityCallback = Li;
    const s = new Ri();
    s.maxJobs = 5, s.priorityCallback = Li;
    const n = new Ri();
    n.maxJobs = 25, n.priorityCallback = (o, r) => {
      const l = o.parent, c = r.parent;
      return l === c ? 0 : l ? c ? i.priorityCallback(l, c) : -1 : 1;
    }, this.processedTiles = /* @__PURE__ */ new WeakSet(), this.visibleTiles = /* @__PURE__ */ new Set(), this.activeTiles = /* @__PURE__ */ new Set(), this.usedSet = /* @__PURE__ */ new Set(), this.loadingTiles = /* @__PURE__ */ new Set(), this.lruCache = t, this.downloadQueue = i, this.parseQueue = s, this.processNodeQueue = n, this.stats = {
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
    }, this.frameCount = 0, this._dispatchNeedsUpdateEvent = Ul(() => {
      this.dispatchEvent({ type: "needs-update" });
    }), this.errorTarget = 16, this._errorThreshold = 1 / 0, this.displayActiveTiles = !1, this.maxDepth = 1 / 0, this.optimizedLoadStrategy = !1, this.loadSiblings = !0, this.maxTilesProcessed = 250;
  }
  // Plugins
  registerPlugin(e) {
    if (e[Ws] === !0)
      throw new Error("TilesRendererBase: A plugin can only be registered to a single tileset");
    e.loadRootTileSet && !e.loadRootTileset && (console.warn('TilesRendererBase: Plugin implements deprecated "loadRootTileSet" method. Please rename to "loadRootTileset".'), e.loadRootTileset = e.loadRootTileSet), e.preprocessTileSet && !e.preprocessTileset && (console.warn('TilesRendererBase: Plugin implements deprecated "preprocessTileSet" method. Please rename to "preprocessTileset".'), e.preprocessTileset = e.preprocessTileSet);
    const t = this.plugins, i = e.priority || 0;
    let s = t.length;
    for (let n = 0; n < t.length; n++)
      if ((t[n].priority || 0) > i) {
        s = n;
        break;
      }
    t.splice(s, 0, e), e[Ws] = !0, e.init && e.init(this);
  }
  unregisterPlugin(e) {
    const t = this.plugins;
    if (typeof e == "string" && (e = this.getPluginByName(e)), t.includes(e)) {
      const i = t.indexOf(e);
      return t.splice(i, 1), e.dispose && e.dispose(), !0;
    }
    return !1;
  }
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
  traverse(e, t, i = !0) {
    this.root && kl(this.root, (s, ...n) => (i && this.ensureChildrenArePreprocessed(s, !0), e ? e(s, ...n) : !1), t);
  }
  getAttributions(e = []) {
    return this.invokeAllPlugins((t) => t !== this && t.getAttributions && t.getAttributions(e)), e;
  }
  update() {
    const { lruCache: e, usedSet: t, stats: i, root: s, downloadQueue: n, parseQueue: o, processNodeQueue: r, optimizedLoadStrategy: l } = this;
    if (this.rootLoadingState === we && (this.rootLoadingState = Rt, this.invokeOnePlugin((d) => d.loadRootTileset && d.loadRootTileset()).then((d) => {
      let u = this.rootURL;
      u !== null && this.invokeAllPlugins((p) => u = p.preprocessURL ? p.preprocessURL(u, null) : u), this.rootLoadingState = ae, this.rootTileset = d, this.dispatchEvent({ type: "needs-update" }), this.dispatchEvent({ type: "load-content" }), this.dispatchEvent({
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
    })), !s)
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
    this.dispatchEvent({ type: "update-before" }), i.inFrustum = 0, i.used = 0, i.active = 0, i.visible = 0, i.tilesProcessed = 0, this.frameCount++, t.forEach((d) => e.markUnused(d)), t.clear();
    const h = l ? Vl : Li;
    n.priorityCallback = h, o.priorityCallback = h, this.prepareForTraversal(), l ? Pl(s, this) : Gl(s, this), this.removeUnusedPendingTiles();
    const A = this.queuedTiles;
    A.sort(e.unloadPriorityCallback);
    for (let d = 0, u = A.length; d < u && !e.isFull(); d++)
      this.requestTileContents(A[d]);
    A.length = 0, e.scheduleUnload(), (n.running || o.running || r.running) === !1 && this.isLoading === !0 && (this.cachedSinceLoadComplete.clear(), i.inCacheSinceLoad = 0, this.dispatchEvent({ type: "tiles-load-end" }), this.isLoading = !1), this.dispatchEvent({ type: "update-after" });
  }
  resetFailedTiles() {
    this.rootLoadingState === _e && (this.rootLoadingState = we);
    const e = this.stats;
    e.failed !== 0 && (this.traverse((t) => {
      t.internal.loadingState === _e && (t.internal.loadingState = we);
    }, null, !1), e.failed = 0);
  }
  calculateTileViewErrorWithPlugin(e, t) {
    this.calculateTileViewError(e, t);
    let i = null, s = 0, n = 1 / 0;
    this.invokeAllPlugins((o) => {
      o !== this && o.calculateTileViewError && (Be.inView = !0, Be.error = 0, Be.distance = 1 / 0, o.calculateTileViewError(e, Be) && (i === null && (i = !0), i = i && Be.inView, Be.inView && (n = Math.min(n, Be.distance), s = Math.max(s, Be.error))));
    }), t.inView && i !== !1 ? (t.error = Math.max(t.error, s), t.distanceFromCamera = Math.min(t.distanceFromCamera, n)) : i ? (t.inView = !0, t.error = s, t.distanceFromCamera = n) : t.inView = !1;
  }
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
  dispatchEvent(e) {
  }
  addEventListener(e, t) {
  }
  removeEventListener(e, t) {
  }
  parseTile(e, t, i) {
    return null;
  }
  prepareForTraversal() {
  }
  disposeTile(e) {
    e.traversal.visible && (this.invokeOnePlugin((i) => i.setTileVisible && i.setTileVisible(e, !1)), e.traversal.visible = !1), e.traversal.active && (this.invokeOnePlugin((i) => i.setTileActive && i.setTileActive(e, !1)), e.traversal.active = !1);
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
      loadingState: we,
      basePath: t,
      depth: -1,
      depthFromRenderedParent: -1
    }, (s = e.content) != null && s.uri) {
      const n = Ys(e.content.uri), o = !!(n && /json$/.test(n));
      e.internal.hasContent = !0, e.internal.hasUnrenderableContent = o, e.internal.hasRenderableContent = !o;
    } else
      e.internal.hasContent = !1, e.internal.hasUnrenderableContent = !1, e.internal.hasRenderableContent = !1;
    i ? (e.internal.depth = i.internal.depth + 1, e.internal.depthFromRenderedParent = i.internal.depthFromRenderedParent + (e.internal.hasRenderableContent ? 1 : 0)) : (e.internal.depth = 0, e.internal.depthFromRenderedParent = e.internal.hasRenderableContent ? 1 : 0), e.traversal = {
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
      !e.isUsed(s) && s.internal.loadingState === Qt && i.push(s);
    for (let s = 0; s < i.length; s++)
      e.remove(i[s]);
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
    const i = e.children;
    if (i.length === 0 || i[0].internal)
      return;
    const s = (n) => {
      for (let o = 0, r = n.length; o < r; o++)
        this.preprocessNode(n[o], e.internal.basePath, e);
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
    const s = Object.getPrototypeOf(this);
    Object.hasOwn(s, "preprocessTileSet") && console.warn(`${s.constructor.name}: Class overrides deprecated "preprocessTileSet" method. Please rename to "preprocessTileset".`);
    const n = e.asset.version, [o, r] = n.split(".").map((c) => parseInt(c));
    console.assert(
      o <= 1,
      "TilesRenderer: asset.version is expected to be a 1.x or a compatible version."
    ), o === 1 && r > 0 && console.warn("TilesRenderer: tiles versions at 1.1 or higher have limited support. Some new extensions and features may not be supported.");
    let l = t.replace(/\/[^/]*$/, "");
    l = new URL(l, window.location.href).toString(), this.preprocessNode(e.root, l, i);
  }
  preprocessTileSet(...e) {
    return console.warn('TilesRenderer: "preprocessTileSet" has been deprecated. Use "preprocessTileset" instead.'), this.preprocessTileset(...e);
  }
  loadRootTileset() {
    const e = Object.getPrototypeOf(this);
    Object.hasOwn(e, "loadRootTileSet") && console.warn(`${e.constructor.name}: Class overrides deprecated "loadRootTileSet" method. Please rename to "loadRootTileset".`);
    let t = this.rootURL;
    return this.invokeAllPlugins((i) => t = i.preprocessURL ? i.preprocessURL(t, null) : t), this.invokeOnePlugin((i) => i.fetchData && i.fetchData(t, this.fetchOptions)).then((i) => {
      if (i instanceof Response) {
        if (i.ok)
          return i.json();
        throw new Error(`TilesRenderer: Failed to load tileset "${t}" with status ${i.status} : ${i.statusText}`);
      } else return i;
    }).then((i) => (this.preprocessTileset(i, t), i));
  }
  loadRootTileSet(...e) {
    return console.warn('TilesRenderer: "loadRootTileSet" has been deprecated. Use "loadRootTileset" instead.'), this.loadRootTileSet(...e);
  }
  requestTileContents(e) {
    if (e.internal.loadingState !== we)
      return;
    let t = !1, i = null, s = new URL(e.content.uri, e.internal.basePath + "/").toString();
    this.invokeAllPlugins((u) => s = u.preprocessURL ? u.preprocessURL(s, e) : s);
    const n = this.stats, o = this.lruCache, r = this.downloadQueue, l = this.parseQueue, c = this.loadingTiles, h = Ys(s), A = new AbortController(), d = A.signal;
    if (o.add(e, (u) => {
      A.abort(), t ? u.children.length = 0 : this.invokeAllPlugins((p) => {
        p.disposeTile && p.disposeTile(u);
      }), n.inCache--, this.cachedSinceLoadComplete.has(e) && (this.cachedSinceLoadComplete.delete(e), n.inCacheSinceLoad--), u.internal.loadingState === Qt ? n.queued-- : u.internal.loadingState === Rt ? n.downloading-- : u.internal.loadingState === Di ? n.parsing-- : u.internal.loadingState === ae && n.loaded--, u.internal.loadingState = we, l.remove(u), r.remove(u), c.delete(u);
    }))
      return this.isLoading || (this.isLoading = !0, this.dispatchEvent({ type: "tiles-load-start" })), o.setMemoryUsage(e, this.getBytesUsed(e)), this.cachedSinceLoadComplete.add(e), n.inCacheSinceLoad++, n.inCache++, n.queued++, e.internal.loadingState = Qt, c.add(e), r.add(e, (u) => {
        if (d.aborted)
          return Promise.resolve();
        e.internal.loadingState = Rt, n.downloading++, n.queued--;
        const p = this.invokeOnePlugin((g) => g.fetchData && g.fetchData(s, { ...this.fetchOptions, signal: d }));
        return this.dispatchEvent({ type: "tile-download-start", tile: e, uri: s }), p;
      }).then((u) => {
        if (!d.aborted)
          if (u instanceof Response) {
            if (u.ok)
              return h === "json" ? u.json() : u.arrayBuffer();
            throw new Error(`Failed to load model with error code ${u.status}`);
          } else return u;
      }).then((u) => {
        if (!d.aborted)
          return n.downloading--, n.parsing++, e.internal.loadingState = Di, l.add(e, (p) => d.aborted ? Promise.resolve() : h === "json" && u.root ? (this.preprocessTileset(u, s, e), e.children.push(u.root), i = u, t = !0, Promise.resolve()) : this.invokeOnePlugin((g) => g.parseTile && g.parseTile(u, p, h, s, d)));
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
          tileset: i,
          url: s
        }), e.engineData.scene && this.dispatchEvent({
          type: "load-model",
          scene: e.engineData.scene,
          tile: e,
          url: s
        });
      }).catch((u) => {
        d.aborted || (u.name !== "AbortError" ? (l.remove(e), r.remove(e), e.internal.loadingState === Qt ? n.queued-- : e.internal.loadingState === Rt ? n.downloading-- : e.internal.loadingState === Di ? n.parsing-- : e.internal.loadingState === ae && n.loaded--, n.failed++, console.error(`TilesRenderer : Failed to load tile at url "${e.content.uri}".`), console.error(u), e.internal.loadingState = _e, c.delete(e), o.setLoaded(e, !0), this.dispatchEvent({
          type: "load-error",
          tile: e,
          error: u,
          url: s
        })) : o.remove(e));
      });
  }
}
function Ho(a, e, t, i, s, n) {
  let o;
  switch (i) {
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
  switch (s) {
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
let pi = class {
  constructor(e, t, i, s) {
    this.buffer = e, this.binOffset = t + i, this.binLength = s;
    let n = null;
    if (i !== 0) {
      const o = new Uint8Array(e, t, i);
      n = JSON.parse(ms(o));
    } else
      n = {};
    this.header = n;
  }
  getKeys() {
    return Object.keys(this.header).filter((e) => e !== "extensions");
  }
  getData(e, t, i = null, s = null) {
    const n = this.header;
    if (!(e in n))
      return null;
    const o = n[e];
    if (o instanceof Object) {
      if (Array.isArray(o))
        return o;
      {
        const { buffer: r, binOffset: l, binLength: c } = this, h = o.byteOffset || 0, A = o.type || s, d = o.componentType || i;
        if ("type" in o && s && o.type !== s)
          throw new Error("FeatureTable: Specified type does not match expected type.");
        const u = l + h, p = Ho(r, u, t, A, d, e);
        if (u + p.byteLength > l + c)
          throw new Error("FeatureTable: Feature data read outside binary body length.");
        return p;
      }
    } else return o;
  }
  getBuffer(e, t) {
    const { buffer: i, binOffset: s } = this;
    return i.slice(s + e, s + e + t);
  }
};
class ql {
  constructor(e) {
    this.batchTable = e;
    const t = e.header.extensions["3DTILES_batch_table_hierarchy"];
    this.classes = t.classes;
    for (const s of this.classes) {
      const n = s.instances;
      for (const o in n)
        s.instances[o] = this._parseProperty(n[o], s.length, o);
    }
    if (this.instancesLength = t.instancesLength, this.classIds = this._parseProperty(t.classIds, this.instancesLength, "classIds"), t.parentCounts ? this.parentCounts = this._parseProperty(t.parentCounts, this.instancesLength, "parentCounts") : this.parentCounts = new Array(this.instancesLength).fill(1), t.parentIds) {
      const s = this.parentCounts.reduce((n, o) => n + o, 0);
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
      const { buffer: s, binOffset: n } = this.batchTable, o = e.byteOffset, r = e.componentType || "UNSIGNED_SHORT", l = n + o;
      return Ho(s, l, t, "SCALAR", r, i);
    }
  }
  getDataFromId(e, t = {}) {
    const i = this.parentCounts[e];
    if (this.parentIds && i > 0) {
      let l = 0;
      for (let c = 0; c < e; c++)
        l += this.parentCounts[c];
      for (let c = 0; c < i; c++) {
        const h = this.parentIds[l + c];
        h !== e && this.getDataFromId(h, t);
      }
    }
    const s = this.classIds[e], n = this.classes[s].instances, o = this.classes[s].name, r = this.instancesIds[e];
    for (const l in n)
      t[o] = t[o] || {}, t[o][l] = n[l][r];
    return t;
  }
}
class Is extends pi {
  get batchSize() {
    return console.warn("BatchTable.batchSize has been deprecated and replaced with BatchTable.count."), this.count;
  }
  constructor(e, t, i, s, n) {
    super(e, i, s, n), this.count = t, this.extensions = {};
    const o = this.header.extensions;
    o && o["3DTILES_batch_table_hierarchy"] && (this.extensions["3DTILES_batch_table_hierarchy"] = new ql(this));
  }
  getData(e, t = null, i = null) {
    return console.warn("BatchTable: BatchTable.getData is deprecated. Use BatchTable.getDataFromId to get allproperties for an id or BatchTable.getPropertyArray for getting an array of value for a property."), super.getData(e, this.count, t, i);
  }
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
  getPropertyArray(e) {
    return super.getData(e, this.count);
  }
}
let zl = class extends Bt {
  parse(e) {
    const t = new DataView(e), i = Ge(t);
    console.assert(i === "b3dm");
    const s = t.getUint32(4, !0);
    console.assert(s === 1);
    const n = t.getUint32(8, !0);
    console.assert(n === e.byteLength);
    const o = t.getUint32(12, !0), r = t.getUint32(16, !0), l = t.getUint32(20, !0), c = t.getUint32(24, !0), h = 28, A = e.slice(
      h,
      h + o + r
    ), d = new pi(
      A,
      0,
      o,
      r
    ), u = h + o + r, p = e.slice(
      u,
      u + l + c
    ), g = new Is(
      p,
      d.getData("BATCH_LENGTH"),
      0,
      l,
      c
    ), b = u + l + c, y = new Uint8Array(e, b, n - b);
    return {
      version: s,
      featureTable: d,
      batchTable: g,
      glbBytes: y
    };
  }
}, jl = class extends Bt {
  parse(e) {
    const t = new DataView(e), i = Ge(t);
    console.assert(i === "i3dm");
    const s = t.getUint32(4, !0);
    console.assert(s === 1);
    const n = t.getUint32(8, !0);
    console.assert(n === e.byteLength);
    const o = t.getUint32(12, !0), r = t.getUint32(16, !0), l = t.getUint32(20, !0), c = t.getUint32(24, !0), h = t.getUint32(28, !0), A = 32, d = e.slice(
      A,
      A + o + r
    ), u = new pi(
      d,
      0,
      o,
      r
    ), p = A + o + r, g = e.slice(
      p,
      p + l + c
    ), b = new Is(
      g,
      u.getData("INSTANCES_LENGTH"),
      0,
      l,
      c
    ), y = p + l + c, C = new Uint8Array(e, y, n - y);
    let E = null, m = null, I = null;
    if (h)
      E = C, m = Promise.resolve();
    else {
      const B = this.resolveExternalURL(ms(C));
      I = bs(B), m = fetch(B, this.fetchOptions).then((w) => {
        if (!w.ok)
          throw new Error(`I3DMLoaderBase : Failed to load file "${B}" with status ${w.status} : ${w.statusText}`);
        return w.arrayBuffer();
      }).then((w) => {
        E = new Uint8Array(w);
      });
    }
    return m.then(() => ({
      version: s,
      featureTable: u,
      batchTable: b,
      glbBytes: E,
      gltfWorkingPath: I
    }));
  }
}, Kl = class extends Bt {
  parse(e) {
    const t = new DataView(e), i = Ge(t);
    console.assert(i === "pnts");
    const s = t.getUint32(4, !0);
    console.assert(s === 1);
    const n = t.getUint32(8, !0);
    console.assert(n === e.byteLength);
    const o = t.getUint32(12, !0), r = t.getUint32(16, !0), l = t.getUint32(20, !0), c = t.getUint32(24, !0), h = 28, A = e.slice(
      h,
      h + o + r
    ), d = new pi(
      A,
      0,
      o,
      r
    ), u = h + o + r, p = e.slice(
      u,
      u + l + c
    ), g = new Is(
      p,
      d.getData("BATCH_LENGTH") || d.getData("POINTS_LENGTH"),
      0,
      l,
      c
    );
    return Promise.resolve({
      version: s,
      featureTable: d,
      batchTable: g
    });
  }
}, Yl = class extends Bt {
  parse(e) {
    const t = new DataView(e), i = Ge(t);
    console.assert(i === "cmpt", 'CMPTLoader: The magic bytes equal "cmpt".');
    const s = t.getUint32(4, !0);
    console.assert(s === 1, 'CMPTLoader: The version listed in the header is "1".');
    const n = t.getUint32(8, !0);
    console.assert(n === e.byteLength, "CMPTLoader: The contents buffer length listed in the header matches the file.");
    const o = t.getUint32(12, !0), r = [];
    let l = 16;
    for (let c = 0; c < o; c++) {
      const h = new DataView(e, l, 12), A = Ge(h), d = h.getUint32(4, !0), u = h.getUint32(8, !0), p = new Uint8Array(e, l, u);
      r.push({
        type: A,
        buffer: p,
        version: d
      }), l += u;
    }
    return {
      version: s,
      tiles: r
    };
  }
};
function Jl(a) {
  const { x: e, y: t, z: i } = a;
  a.x = i, a.y = e, a.z = t;
}
function Wl(a) {
  return -a + Math.PI / 2;
}
const Xs = /* @__PURE__ */ new Ji(), Se = /* @__PURE__ */ new v(), W = /* @__PURE__ */ new v(), ki = /* @__PURE__ */ new v(), ie = /* @__PURE__ */ new P(), ce = /* @__PURE__ */ new P(), $s = /* @__PURE__ */ new P(), Fi = /* @__PURE__ */ new It(), X = /* @__PURE__ */ new to(), Zs = /* @__PURE__ */ new v(), en = /* @__PURE__ */ new v(), tn = /* @__PURE__ */ new v(), De = /* @__PURE__ */ new v(), kt = /* @__PURE__ */ new ri(), Xl = 1e-12, $l = 0.1, Ft = 0, sn = 1, _t = 2;
let qo = class {
  constructor(e = 1, t = 1, i = 1) {
    this.name = "", this.radius = new v(e, t, i);
  }
  intersectRay(e, t) {
    return ie.makeScale(...this.radius).invert(), Fi.center.set(0, 0, 0), Fi.radius = 1, kt.copy(e).applyMatrix4(ie), kt.intersectSphere(Fi, t) ? (ie.makeScale(...this.radius), t.applyMatrix4(ie), t) : null;
  }
  // returns a frame with Z indicating altitude, Y pointing north, X pointing east
  getEastNorthUpFrame(e, t, i, s) {
    return i.isMatrix4 && (s = i, i = 0, console.warn('Ellipsoid: The signature for "getEastNorthUpFrame" has changed.')), this.getEastNorthUpAxes(e, t, Zs, en, tn), this.getCartographicToPosition(e, t, i, De), s.makeBasis(Zs, en, tn).setPosition(De);
  }
  // returns a frame with z indicating altitude and az, el, roll rotation within that frame
  // - azimuth: measured off of true north, increasing towards "east" (z-axis)
  // - elevation: measured off of the horizon, increasing towards sky (x-axis)
  // - roll: rotation around northern axis (y-axis)
  getOrientedEastNorthUpFrame(e, t, i, s, n, o, r) {
    return this.getObjectFrame(e, t, i, s, n, o, r, Ft);
  }
  // returns a frame similar to the ENU frame but rotated to match three.js object and camera conventions
  // OBJECT_FRAME: oriented such that "+Y" is up and "+Z" is forward.
  // CAMERA_FRAME: oriented such that "+Y" is up and "-Z" is forward.
  getObjectFrame(e, t, i, s, n, o, r, l = _t) {
    return this.getEastNorthUpFrame(e, t, i, ie), X.set(n, o, -s, "ZXY"), r.makeRotationFromEuler(X).premultiply(ie), l === sn ? (X.set(Math.PI / 2, 0, 0, "XYZ"), ce.makeRotationFromEuler(X), r.multiply(ce)) : l === _t && (X.set(-Math.PI / 2, 0, Math.PI, "XYZ"), ce.makeRotationFromEuler(X), r.multiply(ce)), r;
  }
  getCartographicFromObjectFrame(e, t, i = _t) {
    return i === sn ? (X.set(-Math.PI / 2, 0, 0, "XYZ"), ce.makeRotationFromEuler(X).premultiply(e)) : i === _t ? (X.set(-Math.PI / 2, 0, Math.PI, "XYZ"), ce.makeRotationFromEuler(X).premultiply(e)) : ce.copy(e), De.setFromMatrixPosition(ce), this.getPositionToCartographic(De, t), this.getEastNorthUpFrame(t.lat, t.lon, 0, ie).invert(), ce.premultiply(ie), X.setFromRotationMatrix(ce, "ZXY"), t.azimuth = -X.z, t.elevation = X.x, t.roll = X.y, t;
  }
  getEastNorthUpAxes(e, t, i, s, n, o = De) {
    this.getCartographicToPosition(e, t, 0, o), this.getCartographicToNormal(e, t, n), i.set(-o.y, o.x, 0).normalize(), s.crossVectors(n, i).normalize();
  }
  // azimuth: measured off of true north, increasing towards "east"
  // elevation: measured off of the horizon, increasing towards sky
  // roll: rotation around northern axis
  getAzElRollFromRotationMatrix(e, t, i, s, n = Ft) {
    return console.warn('Ellipsoid: "getAzElRollFromRotationMatrix" is deprecated. Use "getCartographicFromObjectFrame", instead.'), this.getCartographicToPosition(e, t, 0, De), $s.copy(i).setPosition(De), this.getCartographicFromObjectFrame($s, s, n), delete s.height, delete s.lat, delete s.lon, s;
  }
  getRotationMatrixFromAzElRoll(e, t, i, s, n, o, r = Ft) {
    return console.warn('Ellipsoid: "getRotationMatrixFromAzElRoll" function has been deprecated. Use "getObjectFrame", instead.'), this.getObjectFrame(e, t, 0, i, s, n, o, r), o.setPosition(0, 0, 0), o;
  }
  getFrame(e, t, i, s, n, o, r, l = Ft) {
    return console.warn('Ellipsoid: "getFrame" function has been deprecated. Use "getObjectFrame", instead.'), this.getObjectFrame(e, t, o, i, s, n, r, l);
  }
  getCartographicToPosition(e, t, i, s) {
    this.getCartographicToNormal(e, t, Se);
    const n = this.radius;
    W.copy(Se), W.x *= n.x ** 2, W.y *= n.y ** 2, W.z *= n.z ** 2;
    const o = Math.sqrt(Se.dot(W));
    return W.divideScalar(o), s.copy(W).addScaledVector(Se, i);
  }
  getPositionToCartographic(e, t) {
    this.getPositionToSurfacePoint(e, W), this.getPositionToNormal(e, Se);
    const i = ki.subVectors(e, W);
    return t.lon = Math.atan2(Se.y, Se.x), t.lat = Math.asin(Se.z), t.height = Math.sign(i.dot(e)) * i.length(), t;
  }
  getCartographicToNormal(e, t, i) {
    return Xs.set(1, Wl(e), t), i.setFromSpherical(Xs).normalize(), Jl(i), i;
  }
  getPositionToNormal(e, t) {
    const i = this.radius;
    return t.copy(e), t.x /= i.x ** 2, t.y /= i.y ** 2, t.z /= i.z ** 2, t.normalize(), t;
  }
  getPositionToSurfacePoint(e, t) {
    const i = this.radius, s = 1 / i.x ** 2, n = 1 / i.y ** 2, o = 1 / i.z ** 2, r = e.x * e.x * s, l = e.y * e.y * n, c = e.z * e.z * o, h = r + l + c, A = Math.sqrt(1 / h), d = W.copy(e).multiplyScalar(A);
    if (h < $l)
      return isFinite(A) ? t.copy(d) : null;
    const u = ki.set(
      d.x * s * 2,
      d.y * n * 2,
      d.z * o * 2
    );
    let p = (1 - A) * e.length() / (0.5 * u.length()), g = 0, b, y, C, E, m, I, B, w, M, S, x;
    do {
      p -= g, C = 1 / (1 + p * s), E = 1 / (1 + p * n), m = 1 / (1 + p * o), I = C * C, B = E * E, w = m * m, M = I * C, S = B * E, x = w * m, b = r * I + l * B + c * w - 1, y = r * M * s + l * S * n + c * x * o;
      const R = -2 * y;
      g = b / R;
    } while (Math.abs(b) > Xl);
    return t.set(
      e.x * C,
      e.y * E,
      e.z * m
    );
  }
  calculateHorizonDistance(e, t) {
    const i = this.calculateEffectiveRadius(e);
    return Math.sqrt(2 * i * t + t ** 2);
  }
  calculateEffectiveRadius(e) {
    const t = this.radius.x, i = 1 - this.radius.z ** 2 / t ** 2, s = e * st.DEG2RAD, n = Math.sin(s) ** 2;
    return t / Math.sqrt(1 - i * n);
  }
  getPositionElevation(e) {
    this.getPositionToSurfacePoint(e, W);
    const t = ki.subVectors(e, W);
    return Math.sign(t.dot(e)) * t.length();
  }
  // Returns an estimate of the closest point on the ellipsoid to the ray. Returns
  // the surface intersection if they collide.
  closestPointToRayEstimate(e, t) {
    return this.intersectRay(e, t) ? t : (ie.makeScale(...this.radius).invert(), kt.copy(e).applyMatrix4(ie), W.set(0, 0, 0), kt.closestPointToPoint(W, t).normalize(), ie.makeScale(...this.radius), t.applyMatrix4(ie));
  }
  copy(e) {
    return this.radius.copy(e.radius), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
};
const gi = new qo(Ks, Ks, Ll);
gi.name = "WGS84 Earth";
const Pt = /* @__PURE__ */ new v(), Nt = /* @__PURE__ */ new v(), $ = /* @__PURE__ */ new v(), Gt = /* @__PURE__ */ new ri();
let nn = class {
  constructor(e = new nt(), t = new P()) {
    this.box = e.clone(), this.transform = t.clone(), this.inverseTransform = new P(), this.points = new Array(8).fill().map(() => new v()), this.planes = new Array(6).fill().map(() => new qn());
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
    return Gt.copy(e).applyMatrix4(this.inverseTransform), Gt.intersectsBox(this.box);
  }
  // Sets "target" equal to the intersection point.
  // Returns "null" if no intersection found.
  intersectRay(e, t) {
    return Gt.copy(e).applyMatrix4(this.inverseTransform), Gt.intersectBox(this.box, t) ? (t.applyMatrix4(this.transform), t) : null;
  }
  update() {
    const { points: e, inverseTransform: t, transform: i, box: s } = this;
    t.copy(i).invert();
    const { min: n, max: o } = s;
    let r = 0;
    for (let l = -1; l <= 1; l += 2)
      for (let c = -1; c <= 1; c += 2)
        for (let h = -1; h <= 1; h += 2)
          e[r].set(
            l < 0 ? n.x : o.x,
            c < 0 ? n.y : o.y,
            h < 0 ? n.z : o.z
          ).applyMatrix4(i), r++;
    this.updatePlanes();
  }
  updatePlanes() {
    Pt.copy(this.box.min).applyMatrix4(this.transform), Nt.copy(this.box.max).applyMatrix4(this.transform), $.set(0, 0, 1).transformDirection(this.transform), this.planes[0].setFromNormalAndCoplanarPoint($, Pt), this.planes[1].setFromNormalAndCoplanarPoint($, Nt).negate(), $.set(0, 1, 0).transformDirection(this.transform), this.planes[2].setFromNormalAndCoplanarPoint($, Pt), this.planes[3].setFromNormalAndCoplanarPoint($, Nt).negate(), $.set(1, 0, 0).transformDirection(this.transform), this.planes[4].setFromNormalAndCoplanarPoint($, Pt), this.planes[5].setFromNormalAndCoplanarPoint($, Nt).negate();
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
    const i = this.points, s = this.planes;
    for (let n = 0; n < 6; n++) {
      const o = e[n];
      let r = -1 / 0;
      for (let l = 0; l < 8; l++) {
        const c = i[l], h = o.distanceToPoint(c);
        r = r < h ? h : r;
      }
      if (r < 0)
        return !1;
    }
    for (let n = 0; n < 6; n++) {
      const o = s[n];
      let r = -1 / 0;
      for (let l = 0; l < 8; l++) {
        const c = t[l], h = o.distanceToPoint(c);
        r = r < h ? h : r;
      }
      if (r < 0)
        return !1;
    }
    return !0;
  }
};
const _i = 1e-13, bt = Math.PI, Pi = bt / 2, ct = /* @__PURE__ */ new v(), Le = /* @__PURE__ */ new v(), oe = /* @__PURE__ */ new v(), Q = /* @__PURE__ */ new v(), Y = /* @__PURE__ */ new P(), Zl = /* @__PURE__ */ new nt(), on = /* @__PURE__ */ new P();
function ve(a, e) {
  e.radius = Math.max(e.radius, a.distanceToSquared(e.center));
}
function rn(a) {
  return a.x !== a.y;
}
let ec = class extends qo {
  constructor(e = 1, t = 1, i = 1, s = -Pi, n = Pi, o = 0, r = 2 * bt, l = 0, c = 0) {
    super(e, t, i), this.latStart = s, this.latEnd = n, this.lonStart = o, this.lonEnd = r, this.heightStart = l, this.heightEnd = c;
  }
  getBoundingBox(e, t) {
    rn(this.radius) && console.warn("EllipsoidRegion: Triaxial ellipsoids are not supported.");
    const {
      latStart: i,
      latEnd: s,
      lonStart: n,
      lonEnd: o,
      heightStart: r,
      heightEnd: l
    } = this, c = (i + s) * 0.5, h = (n + o) * 0.5, A = i > 0, d = s < 0;
    let u;
    A ? u = i : d ? u = s : u = 0;
    const { min: p, max: g } = e;
    p.setScalar(1 / 0), g.setScalar(-1 / 0), o - n <= bt ? (this.getCartographicToNormal(c, h, oe), Le.set(0, 0, 1), ct.crossVectors(Le, oe).normalize(), Le.crossVectors(oe, ct).normalize(), t.makeBasis(ct, Le, oe), Y.copy(t).invert(), this.getCartographicToPosition(u, n, l, Q).applyMatrix4(Y), g.x = Math.abs(Q.x), p.x = -g.x, this.getCartographicToPosition(s, n, l, Q).applyMatrix4(Y), g.y = Q.y, this.getCartographicToPosition(s, h, l, Q).applyMatrix4(Y), g.y = Math.max(Q.y, g.y), this.getCartographicToPosition(i, n, l, Q).applyMatrix4(Y), p.y = Q.y, this.getCartographicToPosition(i, h, l, Q).applyMatrix4(Y), p.y = Math.min(Q.y, p.y), this.getCartographicToPosition(c, h, l, Q).applyMatrix4(Y), g.z = Q.z, this.getCartographicToPosition(i, n, r, Q).applyMatrix4(Y), p.z = Q.z, this.getCartographicToPosition(s, n, r, Q).applyMatrix4(Y), p.z = Math.min(Q.z, p.z)) : (this.getCartographicToPosition(u, h, l, oe), oe.z = 0, oe.length() < 1e-10 ? oe.set(1, 0, 0) : oe.normalize(), Le.set(0, 0, 1), ct.crossVectors(oe, Le).normalize(), t.makeBasis(ct, Le, oe), Y.copy(t).invert(), this.getCartographicToPosition(u, h + Pi, l, Q).applyMatrix4(Y), g.x = Math.abs(Q.x), p.x = -g.x, this.getCartographicToPosition(s, 0, d ? r : l, Q).applyMatrix4(Y), g.y = Q.y, this.getCartographicToPosition(i, 0, A ? r : l, Q).applyMatrix4(Y), p.y = Q.y, this.getCartographicToPosition(u, h, l, Q).applyMatrix4(Y), g.z = Q.z, this.getCartographicToPosition(u, o, l, Q).applyMatrix4(Y), p.z = Q.z), e.getCenter(Q), e.min.sub(Q).multiplyScalar(1 + _i), e.max.sub(Q).multiplyScalar(1 + _i), Q.applyMatrix4(t), t.setPosition(Q);
  }
  getBoundingSphere(e) {
    rn(this.radius) && console.warn("EllipsoidRegion: Triaxial ellipsoids are not supported."), this.getBoundingBox(Zl, on), e.center.setFromMatrixPosition(on), e.radius = 0;
    const {
      latStart: t,
      latEnd: i,
      lonStart: s,
      lonEnd: n,
      heightStart: o,
      heightEnd: r
    } = this, l = (t + i) * 0.5, c = (s + n) * 0.5, h = t > 0, A = i < 0;
    let d;
    h ? d = t : A ? d = i : d = 0, this.getCartographicToPosition(d, s, r, Q), ve(Q, e), this.getCartographicToPosition(i, s, r, Q), ve(Q, e), this.getCartographicToPosition(i, c, r, Q), ve(Q, e), this.getCartographicToPosition(t, s, r, Q), ve(Q, e), this.getCartographicToPosition(t, c, r, Q), ve(Q, e), this.getCartographicToPosition(l, c, r, Q), ve(Q, e), this.getCartographicToPosition(t, s, o, Q), ve(Q, e), n - s > bt && (this.getCartographicToPosition(d, c + bt, r, Q), ve(Q, e)), e.radius = Math.sqrt(e.radius) * (1 + _i);
  }
};
function tc(a) {
  if (!a)
    return 0;
  const { format: e, type: t, image: i } = a, { width: s, height: n } = i;
  let o = zr.getByteLength(s, n, e, t);
  return o *= a.generateMipmaps ? 4 / 3 : 1, o;
}
function ic(a) {
  const e = /* @__PURE__ */ new Set();
  let t = 0;
  return a.traverse((i) => {
    if (i.geometry && !e.has(i.geometry) && (t += Ea(i.geometry), e.add(i.geometry)), i.material) {
      const s = i.material;
      for (const n in s) {
        const o = s[n];
        o && o.isTexture && !e.has(o) && (t += tc(o), e.add(o));
      }
    }
  }), t;
}
class zo extends zl {
  constructor(e = Ai) {
    super(), this.manager = e, this.adjustmentTransform = new P();
  }
  parse(e) {
    const t = super.parse(e), i = t.glbBytes.slice().buffer;
    return new Promise((s, n) => {
      const o = this.manager, r = this.fetchOptions, l = o.getHandler("path.gltf") || new Ue(o);
      r.credentials === "include" && r.mode === "cors" && l.setCrossOrigin("use-credentials"), "credentials" in r && l.setWithCredentials(r.credentials === "include"), r.headers && l.setRequestHeader(r.headers);
      let c = this.workingPath;
      !/[\\/]$/.test(c) && c.length && (c += "/");
      const h = this.adjustmentTransform;
      l.parse(i, c, (A) => {
        const { batchTable: d, featureTable: u } = t, { scene: p } = A, g = u.getData("RTC_CENTER", 1, "FLOAT", "VEC3");
        g && (p.position.x += g[0], p.position.y += g[1], p.position.z += g[2]), A.scene.updateMatrix(), A.scene.matrix.multiply(h), A.scene.matrix.decompose(A.scene.position, A.scene.quaternion, A.scene.scale), A.batchTable = d, A.featureTable = u, p.batchTable = d, p.featureTable = u, s(A);
      }, n);
    });
  }
}
function sc(a) {
  const e = a >> 11, t = a >> 5 & 63, i = a & 31, s = Math.round(e / 31 * 255), n = Math.round(t / 63 * 255), o = Math.round(i / 31 * 255);
  return [s, n, o];
}
const ht = /* @__PURE__ */ new F();
function nc(a, e, t = new v()) {
  ht.set(a, e).divideScalar(256).multiplyScalar(2).subScalar(1), t.set(ht.x, ht.y, 1 - Math.abs(ht.x) - Math.abs(ht.y));
  const i = st.clamp(-t.z, 0, 1);
  return t.x >= 0 ? t.setX(t.x - i) : t.setX(t.x + i), t.y >= 0 ? t.setY(t.y - i) : t.setY(t.y + i), t.normalize(), t;
}
const an = {
  RGB: "color",
  POSITION: "position"
};
class jo extends Kl {
  constructor(e = Ai) {
    super(), this.manager = e;
  }
  parse(e) {
    return super.parse(e).then(async (t) => {
      const { featureTable: i, batchTable: s } = t, n = new Kn(), o = i.header.extensions, r = new v();
      let l;
      if (o && o["3DTILES_draco_point_compression"]) {
        const { byteOffset: A, byteLength: d, properties: u } = o["3DTILES_draco_point_compression"], p = this.manager.getHandler("draco.drc");
        if (p == null)
          throw new Error("PNTSLoader: dracoLoader not available.");
        const g = {};
        for (const C in u)
          if (C in an && C in u) {
            const E = an[C];
            g[E] = u[C];
          }
        const b = {
          attributeIDs: g,
          attributeTypes: {
            position: "Float32Array",
            color: "Uint8Array"
          },
          useUniqueIDs: !0
        }, y = i.getBuffer(A, d);
        l = await p.decodeGeometry(y, b), l.attributes.color && (n.vertexColors = !0);
      } else {
        const A = i.getData("POINTS_LENGTH"), d = i.getData("POSITION", A, "FLOAT", "VEC3"), u = i.getData("NORMAL", A, "FLOAT", "VEC3"), p = i.getData("NORMAL", A, "UNSIGNED_BYTE", "VEC2"), g = i.getData("RGB", A, "UNSIGNED_BYTE", "VEC3"), b = i.getData("RGBA", A, "UNSIGNED_BYTE", "VEC4"), y = i.getData("RGB565", A, "UNSIGNED_SHORT", "SCALAR"), C = i.getData("CONSTANT_RGBA", A, "UNSIGNED_BYTE", "VEC4"), E = i.getData("POSITION_QUANTIZED", A, "UNSIGNED_SHORT", "VEC3"), m = i.getData("QUANTIZED_VOLUME_SCALE", A, "FLOAT", "VEC3"), I = i.getData("QUANTIZED_VOLUME_OFFSET", A, "FLOAT", "VEC3");
        if (l = new ci(), E) {
          const B = new Float32Array(A * 3);
          for (let w = 0; w < A; w++)
            for (let M = 0; M < 3; M++) {
              const S = 3 * w + M;
              B[S] = E[S] / 65535 * m[M];
            }
          r.x = I[0], r.y = I[1], r.z = I[2], l.setAttribute("position", new ne(B, 3, !1));
        } else
          l.setAttribute("position", new ne(d, 3, !1));
        if (u !== null)
          l.setAttribute("normal", new ne(u, 3, !1));
        else if (p !== null) {
          const B = new Float32Array(A * 3), w = new v();
          for (let M = 0; M < A; M++) {
            const S = p[M * 2], x = p[M * 2 + 1], R = nc(S, x, w);
            B[M * 3] = R.x, B[M * 3 + 1] = R.y, B[M * 3 + 2] = R.z;
          }
          l.setAttribute("normal", new ne(B, 3, !1));
        }
        if (b !== null)
          l.setAttribute("color", new ne(b, 4, !0)), n.vertexColors = !0, n.transparent = !0, n.depthWrite = !1;
        else if (g !== null)
          l.setAttribute("color", new ne(g, 3, !0)), n.vertexColors = !0;
        else if (y !== null) {
          const B = new Uint8Array(A * 3);
          for (let w = 0; w < A; w++) {
            const M = sc(y[w]);
            for (let S = 0; S < 3; S++) {
              const x = 3 * w + S;
              B[x] = M[S];
            }
          }
          l.setAttribute("color", new ne(B, 3, !0)), n.vertexColors = !0;
        } else if (C !== null) {
          const B = new ye(C[0], C[1], C[2]);
          n.color = B;
          const w = C[3] / 255;
          w < 1 && (n.opacity = w, n.transparent = !0, n.depthWrite = !1);
        }
      }
      const c = new Yn(l, n);
      c.position.copy(r), t.scene = c, t.scene.featureTable = i, t.scene.batchTable = s;
      const h = i.getData("RTC_CENTER", 1, "FLOAT", "VEC3");
      return h && (t.scene.position.x += h[0], t.scene.position.y += h[1], t.scene.position.z += h[2]), t;
    });
  }
}
const Ut = /* @__PURE__ */ new v(), qe = /* @__PURE__ */ new v(), ze = /* @__PURE__ */ new v(), Ni = /* @__PURE__ */ new v(), Vt = /* @__PURE__ */ new et(), Ot = /* @__PURE__ */ new v(), je = /* @__PURE__ */ new P(), ln = /* @__PURE__ */ new P(), cn = /* @__PURE__ */ new v(), hn = /* @__PURE__ */ new P(), Gi = /* @__PURE__ */ new et(), Ui = {};
function An(a, e, t, i) {
  if (a = a / t * 2 - 1, e = e / t * 2 - 1, i.x = a, i.y = e, i.z = 1 - Math.abs(a) - Math.abs(e), i.z < 0) {
    const s = i.x;
    i.x = (1 - Math.abs(i.y)) * (s >= 0 ? 1 : -1), i.y = (1 - Math.abs(s)) * (i.y >= 0 ? 1 : -1);
  }
  return i.normalize(), i;
}
class Ko extends jl {
  constructor(e = Ai) {
    super(), this.manager = e, this.adjustmentTransform = new P(), this.ellipsoid = gi.clone();
  }
  resolveExternalURL(e) {
    return this.manager.resolveURL(super.resolveExternalURL(e));
  }
  parse(e) {
    return super.parse(e).then((t) => {
      const { featureTable: i, batchTable: s } = t, n = t.glbBytes.slice().buffer;
      return new Promise((o, r) => {
        const l = this.fetchOptions, c = this.manager, h = c.getHandler("path.gltf") || new Ue(c);
        l.credentials === "include" && l.mode === "cors" && h.setCrossOrigin("use-credentials"), "credentials" in l && h.setWithCredentials(l.credentials === "include"), l.headers && h.setRequestHeader(l.headers);
        let A = t.gltfWorkingPath ?? this.workingPath;
        /[\\/]$/.test(A) || (A += "/");
        const d = this.adjustmentTransform;
        h.parse(n, A, (u) => {
          const p = i.getData("INSTANCES_LENGTH");
          let g = i.getData("POSITION", p, "FLOAT", "VEC3");
          const b = i.getData("POSITION_QUANTIZED", p, "UNSIGNED_SHORT", "VEC3"), y = i.getData("QUANTIZED_VOLUME_OFFSET", 1, "FLOAT", "VEC3"), C = i.getData("QUANTIZED_VOLUME_SCALE", 1, "FLOAT", "VEC3"), E = i.getData("NORMAL_UP", p, "FLOAT", "VEC3"), m = i.getData("NORMAL_RIGHT", p, "FLOAT", "VEC3"), I = i.getData("NORMAL_UP_OCT32P", p, "UNSIGNED_SHORT", "VEC2"), B = i.getData("NORMAL_RIGHT_OCT32P", p, "UNSIGNED_SHORT", "VEC2"), w = i.getData("SCALE_NON_UNIFORM", p, "FLOAT", "VEC3"), M = i.getData("SCALE", p, "FLOAT", "SCALAR"), S = i.getData("RTC_CENTER", 1, "FLOAT", "VEC3"), x = i.getData("EAST_NORTH_UP");
          if (!g && b) {
            g = new Float32Array(p * 3);
            for (let T = 0; T < p; T++)
              g[T * 3 + 0] = y[0] + b[T * 3 + 0] / 65535 * C[0], g[T * 3 + 1] = y[1] + b[T * 3 + 1] / 65535 * C[1], g[T * 3 + 2] = y[2] + b[T * 3 + 2] / 65535 * C[2];
          }
          const R = new v();
          for (let T = 0; T < p; T++)
            R.x += g[T * 3 + 0] / p, R.y += g[T * 3 + 1] / p, R.z += g[T * 3 + 2] / p;
          const L = [], q = [];
          u.scene.updateMatrixWorld(), u.scene.traverse((T) => {
            if (T.isMesh) {
              q.push(T);
              const { geometry: te, material: z } = T, k = new us(te, z, p);
              k.position.copy(R), S && (k.position.x += S[0], k.position.y += S[1], k.position.z += S[2]), L.push(k);
            }
          });
          for (let T = 0; T < p; T++) {
            Ni.set(
              g[T * 3 + 0] - R.x,
              g[T * 3 + 1] - R.y,
              g[T * 3 + 2] - R.z
            ), Vt.identity(), E && m ? (qe.set(
              E[T * 3 + 0],
              E[T * 3 + 1],
              E[T * 3 + 2]
            ), ze.set(
              m[T * 3 + 0],
              m[T * 3 + 1],
              m[T * 3 + 2]
            ), Ut.crossVectors(ze, qe).normalize(), je.makeBasis(
              ze,
              qe,
              Ut
            ), Vt.setFromRotationMatrix(je)) : I && B && (An(
              I[T * 2 + 0],
              I[T * 2 + 1],
              65535,
              qe
            ), An(
              B[T * 2 + 0],
              B[T * 2 + 1],
              65535,
              ze
            ), Ut.crossVectors(ze, qe).normalize(), je.makeBasis(
              ze,
              qe,
              Ut
            ), Vt.setFromRotationMatrix(je)), Ot.set(1, 1, 1), w && Ot.set(
              w[T * 3 + 0],
              w[T * 3 + 1],
              w[T * 3 + 2]
            ), M && Ot.multiplyScalar(M[T]);
            for (let te = 0, z = L.length; te < z; te++) {
              const k = L[te];
              Gi.copy(Vt), x && (k.updateMatrixWorld(), cn.copy(Ni).applyMatrix4(k.matrixWorld), this.ellipsoid.getPositionToCartographic(cn, Ui), this.ellipsoid.getEastNorthUpFrame(Ui.lat, Ui.lon, hn), Gi.setFromRotationMatrix(hn)), je.compose(Ni, Gi, Ot).multiply(d);
              const j = q[te];
              ln.multiplyMatrices(je, j.matrixWorld), k.setMatrixAt(T, ln);
            }
          }
          u.scene.clear(), u.scene.add(...L), u.batchTable = s, u.featureTable = i, u.scene.batchTable = s, u.scene.featureTable = i, o(u);
        }, r);
      });
    });
  }
}
class oc extends Yl {
  constructor(e = Ai) {
    super(), this.manager = e, this.adjustmentTransform = new P(), this.ellipsoid = gi.clone();
  }
  parse(e) {
    const t = super.parse(e), { manager: i, ellipsoid: s, adjustmentTransform: n } = this, o = [];
    for (const r in t.tiles) {
      const { type: l, buffer: c } = t.tiles[r];
      switch (l) {
        case "b3dm": {
          const h = c.slice(), A = new zo(i);
          A.workingPath = this.workingPath, A.fetchOptions = this.fetchOptions, A.adjustmentTransform.copy(n);
          const d = A.parse(h.buffer);
          o.push(d);
          break;
        }
        case "pnts": {
          const h = c.slice(), A = new jo(i);
          A.workingPath = this.workingPath, A.fetchOptions = this.fetchOptions;
          const d = A.parse(h.buffer);
          o.push(d);
          break;
        }
        case "i3dm": {
          const h = c.slice(), A = new Ko(i);
          A.workingPath = this.workingPath, A.fetchOptions = this.fetchOptions, A.ellipsoid.copy(s), A.adjustmentTransform.copy(n);
          const d = A.parse(h.buffer);
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
class rc extends Xe {
  constructor(e) {
    super(), this.isTilesGroup = !0, this.name = "TilesRenderer.TilesGroup", this.tilesRenderer = e, this.matrixWorldInverse = new P();
  }
  raycast(e, t) {
    return this.tilesRenderer.optimizeRaycast ? (this.tilesRenderer.raycast(e, t), !1) : !0;
  }
  updateMatrixWorld(e) {
    if (this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldNeedsUpdate || e) {
      this.parent === null ? At.copy(this.matrix) : At.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1;
      const t = At.elements, i = this.matrixWorld.elements;
      let s = !1;
      for (let n = 0; n < 16; n++) {
        const o = t[n], r = i[n];
        if (Math.abs(o - r) > Number.EPSILON) {
          s = !0;
          break;
        }
      }
      if (s) {
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
const Yo = /* @__PURE__ */ new ri(), Vi = /* @__PURE__ */ new v(), Ht = [];
function Jo(a, e) {
  return a.distance - e.distance;
}
function Wo(a, e, t, i) {
  const { scene: s } = a.engineData;
  t.invokeOnePlugin((n) => n.raycastTile && n.raycastTile(a, s, e, i)) || e.intersectObject(s, !0, i);
}
function ac(a, e, t) {
  Wo(a, e, t, Ht), Ht.sort(Jo);
  const i = Ht[0] || null;
  return Ht.length = 0, i;
}
function Xo(a) {
  return "traversal" in a;
}
function $o(a, e, t, i = null) {
  const { group: s, activeTiles: n } = a;
  i === null && (i = Yo, i.copy(t.ray).applyMatrix4(s.matrixWorldInverse));
  const o = [], r = e.children;
  for (let h = 0, A = r.length; h < A; h++) {
    const d = r[h];
    !Xo(d) || !d.traversal.used || d.engineData.boundingVolume.intersectRay(i, Vi) !== null && (Vi.applyMatrix4(s.matrixWorld), o.push({
      distance: Vi.distanceToSquared(t.ray.origin),
      tile: d
    }));
  }
  o.sort(Jo);
  let l = null, c = 1 / 0;
  if (n.has(e)) {
    const h = ac(e, t, a);
    h && (l = h, c = h.distance * h.distance);
  }
  for (let h = 0, A = o.length; h < A; h++) {
    const d = o[h], u = d.distance, p = d.tile;
    if (u > c)
      break;
    const g = $o(a, p, t, i);
    if (g) {
      const b = g.distance * g.distance;
      b < c && (l = g, c = b);
    }
  }
  return l;
}
function Zo(a, e, t, i, s = null) {
  if (!Xo(e))
    return;
  const { group: n, activeTiles: o } = a, { boundingVolume: r } = e.engineData;
  if (s === null && (s = Yo, s.copy(t.ray).applyMatrix4(n.matrixWorldInverse)), !e.traversal.used || !r.intersectsRay(s))
    return;
  o.has(e) && Wo(e, t, a, i);
  const l = e.children;
  for (let c = 0, h = l.length; c < h; c++)
    Zo(a, l[c], t, i, s);
}
const pe = /* @__PURE__ */ new v(), ge = /* @__PURE__ */ new v(), fe = /* @__PURE__ */ new v(), dn = /* @__PURE__ */ new v(), un = /* @__PURE__ */ new v();
class lc {
  constructor() {
    this.sphere = null, this.obb = null, this.region = null, this.regionObb = null;
  }
  intersectsRay(e) {
    const t = this.sphere, i = this.obb || this.regionObb;
    return !(t && !e.intersectsSphere(t) || i && !i.intersectsRay(e));
  }
  intersectRay(e, t = null) {
    const i = this.sphere, s = this.obb || this.regionObb;
    let n = -1 / 0, o = -1 / 0;
    i && e.intersectSphere(i, dn) && (n = i.containsPoint(e.origin) ? 0 : e.origin.distanceToSquared(dn)), s && s.intersectRay(e, un) && (o = s.containsPoint(e.origin) ? 0 : e.origin.distanceToSquared(un));
    const r = Math.max(n, o);
    return r === -1 / 0 ? null : (e.at(Math.sqrt(r), t), t);
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
    const i = new nn();
    pe.set(e[3], e[4], e[5]), ge.set(e[6], e[7], e[8]), fe.set(e[9], e[10], e[11]);
    const s = pe.length(), n = ge.length(), o = fe.length();
    pe.normalize(), ge.normalize(), fe.normalize(), s === 0 && pe.crossVectors(ge, fe), n === 0 && ge.crossVectors(pe, fe), o === 0 && fe.crossVectors(pe, ge), i.transform.set(
      pe.x,
      ge.x,
      fe.x,
      e[0],
      pe.y,
      ge.y,
      fe.y,
      e[1],
      pe.z,
      ge.z,
      fe.z,
      e[2],
      0,
      0,
      0,
      1
    ).premultiply(t), i.box.min.set(-s, -n, -o), i.box.max.set(s, n, o), i.update(), this.obb = i;
  }
  setSphereData(e, t, i, s, n) {
    const o = new It();
    o.center.set(e, t, i), o.radius = s, o.applyMatrix4(n), this.sphere = o;
  }
  setRegionData(e, t, i, s, n, o, r) {
    const l = new ec(
      ...e.radius,
      i,
      n,
      t,
      s,
      o,
      r
    ), c = new nn();
    l.getBoundingBox(c.box, c.transform), c.update(), this.region = l, this.regionObb = c;
  }
}
const cc = /* @__PURE__ */ new io();
function hc(a, e, t, i) {
  const s = cc.set(
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
  return i.set(-a.constant, -e.constant, -t.constant), i.applyMatrix3(s.invert()), i;
}
class Ac extends Kr {
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
    ].forEach((i, s) => {
      hc(i[0], i[1], i[2], t[s]);
    });
  }
}
const pn = /* @__PURE__ */ new P(), gn = /* @__PURE__ */ new to(), er = Symbol("INITIAL_FRUSTUM_CULLED"), qt = /* @__PURE__ */ new P(), dt = /* @__PURE__ */ new v(), Oi = /* @__PURE__ */ new F(), dc = /* @__PURE__ */ new v(1, 0, 0), uc = /* @__PURE__ */ new v(0, 1, 0);
function fn(a, e) {
  a.traverse((t) => {
    t.frustumCulled = t[er] && e;
  });
}
let pc = class extends Hl {
  get autoDisableRendererCulling() {
    return this._autoDisableRendererCulling;
  }
  set autoDisableRendererCulling(e) {
    this._autoDisableRendererCulling !== e && (super._autoDisableRendererCulling = e, this.forEachLoadedModel((t) => {
      fn(t, !e);
    }));
  }
  get optimizeRaycast() {
    return this._optimizeRaycast;
  }
  set optimizeRaycast(e) {
    console.warn('TilesRenderer: The "optimizeRaycast" option has been deprecated.'), this._optimizeRaycast = e;
  }
  constructor(...e) {
    super(...e), this.group = new rc(this), this.ellipsoid = gi.clone(), this.cameras = [], this.cameraMap = /* @__PURE__ */ new Map(), this.cameraInfo = [], this._optimizeRaycast = !0, this._upRotationMatrix = new P(), this._bytesUsed = /* @__PURE__ */ new WeakMap(), this._autoDisableRendererCulling = !0, this.manager = new jr(), this._listeners = {};
  }
  addEventListener(e, t) {
    e === "load-tile-set" && (console.warn('TilesRenderer: "load-tile-set" event has been deprecated. Use "load-tileset" instead.'), e = "load-tileset"), xt.prototype.addEventListener.call(this, e, t);
  }
  hasEventListener(e, t) {
    return e === "load-tile-set" && (console.warn('TilesRenderer: "load-tile-set" event has been deprecated. Use "load-tileset" instead.'), e = "load-tileset"), xt.prototype.hasEventListener.call(this, e, t);
  }
  removeEventListener(e, t) {
    e === "load-tile-set" && (console.warn('TilesRenderer: "load-tile-set" event has been deprecated. Use "load-tileset" instead.'), e = "load-tileset"), xt.prototype.removeEventListener.call(this, e, t);
  }
  dispatchEvent(e) {
    "tileset" in e && Object.defineProperty(e, "tileSet", {
      get() {
        return console.warn('TilesRenderer: "event.tileSet" has been deprecated. Use "event.tileset" instead.'), e.tileset;
      },
      enumerable: !1,
      configurable: !0
    }), xt.prototype.dispatchEvent.call(this, e);
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
    const i = this.root.engineData.boundingVolume;
    return i ? (i.getOBB(e, t), !0) : !1;
  }
  getBoundingSphere(e) {
    if (!this.root)
      return !1;
    const t = this.root.engineData.boundingVolume;
    return t ? (t.getSphere(e), !0) : !1;
  }
  forEachLoadedModel(e) {
    this.traverse((t) => {
      const i = t.engineData && t.engineData.scene;
      i && e(i, t);
    }, null, !1);
  }
  raycast(e, t) {
    if (this.root)
      if (e.firstHitOnly) {
        const i = $o(this, this.root, e);
        i && t.push(i);
      } else
        Zo(this, this.root, e, t);
  }
  hasCamera(e) {
    return this.cameraMap.has(e);
  }
  setCamera(e) {
    const t = this.cameras, i = this.cameraMap;
    return i.has(e) ? !1 : (i.set(e, new F()), t.push(e), this.dispatchEvent({ type: "add-camera", camera: e }), !0);
  }
  setResolution(e, t, i) {
    const s = this.cameraMap;
    if (!s.has(e))
      return !1;
    const n = t.isVector2 ? t.x : t, o = t.isVector2 ? t.y : i, r = s.get(e);
    return (r.width !== n || r.height !== o) && (r.set(n, o), this.dispatchEvent({ type: "camera-resolution-change" })), !0;
  }
  setResolutionFromRenderer(e, t) {
    return t.getSize(Oi), this.setResolution(e, Oi.x, Oi.y);
  }
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
          this._upRotationMatrix.makeRotationAxis(uc, -Math.PI / 2);
          break;
        case "y":
          this._upRotationMatrix.makeRotationAxis(dc, Math.PI / 2);
          break;
      }
      if ("3DTILES_ellipsoid" in s) {
        const n = s["3DTILES_ellipsoid"], { ellipsoid: o } = this;
        o.name = n.body, n.radii ? o.radius.set(...n.radii) : o.radius.set(1, 1, 1);
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
        frustum: new Ac(),
        isOrthographic: !1,
        sseDenominator: -1,
        // used if isOrthographic:false
        position: new v(),
        invScale: -1,
        pixelSize: 0
        // used if isOrthographic:true
      });
    dt.setFromMatrixScale(e.matrixWorldInverse), Math.abs(Math.max(dt.x - dt.y, dt.x - dt.z)) > 1e-6 && console.warn("ThreeTilesRenderer : Non uniform scale used for tile which may cause issues when calculating screen space error.");
    for (let n = 0, o = s.length; n < o; n++) {
      const r = t[n], l = s[n], c = l.frustum, h = l.position, A = i.get(r);
      (A.width === 0 || A.height === 0) && console.warn("TilesRenderer: resolution for camera error calculation is not set.");
      const d = r.projectionMatrix.elements;
      if (l.isOrthographic = d[15] === 1, l.isOrthographic) {
        const u = 2 / d[0], p = 2 / d[5];
        l.pixelSize = Math.max(p / A.height, u / A.width);
      } else
        l.sseDenominator = 2 / d[5] / A.height;
      qt.copy(e.matrixWorld), qt.premultiply(r.matrixWorldInverse), qt.premultiply(r.projectionMatrix), c.setFromProjectionMatrix(qt), h.set(0, 0, 0), h.applyMatrix4(r.matrixWorld), h.applyMatrix4(e.matrixWorldInverse);
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
    const s = new P();
    if (e.transform) {
      const r = e.transform;
      for (let l = 0; l < 16; l++)
        s.elements[l] = r[l];
    }
    i && s.premultiply(i.engineData.transform);
    const n = new P().copy(s).invert(), o = new lc();
    "sphere" in e.boundingVolume && o.setSphereData(...e.boundingVolume.sphere, s), "box" in e.boundingVolume && o.setObbData(e.boundingVolume.box, s), "region" in e.boundingVolume && o.setRegionData(this.ellipsoid, ...e.boundingVolume.region), e.engineData.transform = s, e.engineData.transformInverse = n, e.engineData.boundingVolume = o, e.engineData.geometry = null, e.engineData.materials = null, e.engineData.textures = null;
  }
  async parseTile(e, t, i, s, n) {
    const o = t.engineData, r = bs(s), l = this.fetchOptions, c = this.manager;
    let h = null;
    const A = o.transform, d = this._upRotationMatrix, u = (Ge(e) || i).toLowerCase();
    switch (u) {
      case "b3dm": {
        const m = new zo(c);
        m.workingPath = r, m.fetchOptions = l, m.adjustmentTransform.copy(d), h = m.parse(e);
        break;
      }
      case "pnts": {
        const m = new jo(c);
        m.workingPath = r, m.fetchOptions = l, h = m.parse(e);
        break;
      }
      case "i3dm": {
        const m = new Ko(c);
        m.workingPath = r, m.fetchOptions = l, m.adjustmentTransform.copy(d), m.ellipsoid.copy(this.ellipsoid), h = m.parse(e);
        break;
      }
      case "cmpt": {
        const m = new oc(c);
        m.workingPath = r, m.fetchOptions = l, m.adjustmentTransform.copy(d), m.ellipsoid.copy(this.ellipsoid), h = m.parse(e).then((I) => I.scene);
        break;
      }
      // 3DTILES_content_gltf
      case "gltf":
      case "glb": {
        const m = c.getHandler("path.gltf") || c.getHandler("path.glb") || new Ue(c);
        m.setWithCredentials(l.credentials === "include"), m.setRequestHeader(l.headers || {}), l.credentials === "include" && l.mode === "cors" && m.setCrossOrigin("use-credentials");
        let I = m.resourcePath || m.path || r;
        !/[\\/]$/.test(I) && I.length && (I += "/"), h = m.parseAsync(e, I).then((B) => {
          B.scene = B.scene || new Xe();
          const { scene: w } = B;
          return w.updateMatrix(), w.matrix.multiply(d).decompose(w.position, w.quaternion, w.scale), B;
        });
        break;
      }
      default: {
        h = this.invokeOnePlugin((m) => m.parseToMesh && m.parseToMesh(e, t, i, s, n));
        break;
      }
    }
    const p = await h;
    if (p === null)
      throw new Error(`TilesRenderer: Content type "${u}" not supported.`);
    let g, b;
    p.isObject3D ? (g = p, b = null) : (g = p.scene, b = p), g.updateMatrix(), g.matrix.premultiply(A), g.matrix.decompose(g.position, g.quaternion, g.scale), await this.invokeAllPlugins((m) => m.processTileModel && m.processTileModel(g, t)), g.traverse((m) => {
      m[er] = m.frustumCulled;
    }), fn(g, !this.autoDisableRendererCulling);
    const y = [], C = [], E = [];
    if (g.traverse((m) => {
      if (m.geometry && C.push(m.geometry), m.material) {
        const I = m.material;
        y.push(m.material);
        for (const B in I) {
          const w = I[B];
          w && w.isTexture && E.push(w);
        }
      }
    }), n.aborted) {
      for (let m = 0, I = E.length; m < I; m++) {
        const B = E[m];
        B.image instanceof ImageBitmap && B.image.close(), B.dispose();
      }
      return;
    }
    o.materials = y, o.geometry = C, o.textures = E, o.scene = g, o.metadata = b;
  }
  disposeTile(e) {
    super.disposeTile(e);
    const t = e.engineData;
    if (t.scene) {
      const i = t.materials, s = t.geometry, n = t.textures, o = t.scene.parent;
      t.scene.traverse((r) => {
        r.userData.meshFeatures && r.userData.meshFeatures.dispose(), r.userData.structuralMetadata && r.userData.structuralMetadata.dispose();
      });
      for (let r = 0, l = s.length; r < l; r++)
        s[r].dispose();
      for (let r = 0, l = i.length; r < l; r++)
        i[r].dispose();
      for (let r = 0, l = n.length; r < l; r++) {
        const c = n[r];
        c.image instanceof ImageBitmap && c.image.close(), c.dispose();
      }
      o && o.remove(t.scene), t.scene = null, t.materials = null, t.textures = null, t.geometry = null, t.metadata = null;
    }
  }
  setTileVisible(e, t) {
    const i = e.engineData.scene, s = this.group;
    t ? i && (s.add(i), i.updateMatrixWorld(!0)) : i && s.remove(i), super.setTileVisible(e, t);
  }
  calculateBytesUsed(e, t) {
    const i = this._bytesUsed;
    return !i.has(e) && t && i.set(e, ic(t)), i.get(e) ?? null;
  }
  calculateTileViewError(e, t) {
    const i = e.engineData, s = this.cameras, n = this.cameraInfo, o = i.boundingVolume;
    let r = !1, l = 0, c = 1 / 0, h = 0, A = 1 / 0;
    for (let d = 0, u = s.length; d < u; d++) {
      const p = n[d];
      let g, b;
      if (p.isOrthographic) {
        const C = p.pixelSize;
        g = e.geometricError / C, b = 1 / 0;
      } else {
        const C = p.sseDenominator;
        b = o.distanceToPoint(p.position), g = b === 0 ? 1 / 0 : e.geometricError / (b * C);
      }
      const y = n[d].frustum;
      o.intersectsFrustum(y) && (r = !0, l = Math.max(l, g), c = Math.min(c, b)), h = Math.max(h, g), A = Math.min(A, b);
    }
    r ? (t.inView = !0, t.error = l, t.distanceFromCamera = c) : (t.inView = !1, t.error = h, t.distanceFromCamera = A);
  }
  // adjust the rotation of the group such that Y is altitude, X is North, and Z is East
  setLatLonToYUp(e, t) {
    console.warn("TilesRenderer: setLatLonToYUp is deprecated. Use the ReorientationPlugin, instead.");
    const { ellipsoid: i, group: s } = this;
    gn.set(Math.PI / 2, Math.PI / 2, 0), pn.makeRotationFromEuler(gn), i.getEastNorthUpFrame(e, t, 0, s.matrix).multiply(pn).invert().decompose(
      s.position,
      s.quaternion,
      s.scale
    ), s.updateMatrixWorld(!0);
  }
  dispose() {
    super.dispose(), this.group.removeFromParent();
  }
};
function ei(a) {
  return a.implicitTilingData.root.implicitTiling.subdivisionScheme === "OCTREE";
}
function Hi(a) {
  return ei(a) ? 8 : 4;
}
function gc(a, e) {
  if (!a)
    return [0, 0, 0];
  const t = a.implicitTilingData.x, i = a.implicitTilingData.y, s = a.implicitTilingData.z, n = 2 * t + e % 2, o = 2 * i + Math.floor(e / 2) % 2, r = ei(a) ? 2 * s + Math.floor(e / 4) % 2 : 0;
  return [n, o, r];
}
class mn {
  constructor(e, t) {
    this.parent = e, this.children = [], this.geometricError = 0, this.boundingVolume = null;
    const [i, s, n] = gc(e, t);
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
class fc extends Bt {
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
    let i = 0;
    const s = Ge(t);
    console.assert(s === "subt", 'SUBTREELoader: The magic bytes equal "subt".'), i += 4;
    const n = t.getUint32(i, !0);
    console.assert(n === 1, 'SUBTREELoader: The version listed in the header is "1".'), i += 4;
    const o = t.getUint32(i, !0);
    i += 8;
    const r = t.getUint32(i, !0);
    i += 8;
    const l = JSON.parse(ms(new Uint8Array(e, i, o)));
    i += o;
    const c = e.slice(i, i + r);
    return {
      version: n,
      subtreeJson: l,
      subtreeByte: c
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
    const o = await this.requestActiveBuffers(
      s,
      t.subtreeByte
    ), r = this.parseActiveBufferViews(n, o);
    this.parseAvailability(t, i, r), this.expandSubtree(this.tile, t);
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
    for (let r = 0; r < n.length; r++)
      i = void 0, isNaN(n[r].bitstream) ? isNaN(n[r].bufferView) || (i = t[n[r].bufferView]) : i = t[n[r].bitstream], i && (i.isActive = !0, i.bufferHeader.isActive = !0);
    i = void 0;
    const o = e.childSubtreeAvailability;
    isNaN(o.bitstream) ? isNaN(o.bufferView) || (i = t[o.bufferView]) : i = t[o.bitstream], i && (i.isActive = !0, i.bufferHeader.isActive = !0);
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
    const i = [];
    for (let o = 0; o < e.length; o++) {
      const r = e[o];
      if (!r.isActive)
        i.push(Promise.resolve());
      else if (r.isExternal) {
        const l = this.parseImplicitURIBuffer(
          this.tile,
          this.rootTile.implicitTiling.subtrees.uri,
          r.uri
        ), c = fetch(l, this.fetchOptions).then((h) => {
          if (!h.ok)
            throw new Error(`SUBTREELoader: Failed to load external buffer from ${r.uri} with error code ${h.status}.`);
          return h.arrayBuffer();
        }).then((h) => new Uint8Array(h));
        i.push(c);
      } else
        i.push(Promise.resolve(new Uint8Array(t)));
    }
    const s = await Promise.all(i), n = {};
    for (let o = 0; o < s.length; o++) {
      const r = s[o];
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
    const i = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s];
      if (!n.isActive)
        continue;
      const o = n.byteOffset, r = o + n.byteLength, l = t[n.buffer];
      i[s] = l.slice(o, r);
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
      const i = e[t];
      i.isActive = !1, i.isExternal = !!i.uri;
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
    const s = Hi(this.rootTile), n = this.rootTile.implicitTiling.subtreeLevels, o = (Math.pow(s, n) - 1) / (s - 1), r = Math.pow(s, n);
    e._tileAvailability = this.parseAvailabilityBitstream(
      t.tileAvailability,
      i,
      o
    ), e._contentAvailabilityBitstreams = [];
    for (let l = 0; l < t.contentAvailabilityHeaders.length; l++) {
      const c = this.parseAvailabilityBitstream(
        t.contentAvailabilityHeaders[l],
        i,
        // content availability has the same length as tile availability.
        o
      );
      e._contentAvailabilityBitstreams.push(c);
    }
    e._childSubtreeAvailability = this.parseAvailabilityBitstream(
      t.childSubtreeAvailability,
      i,
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
    const i = mn.clone(e);
    for (let o = 0; t && o < t._contentAvailabilityBitstreams.length; o++)
      if (t && this.getBit(t._contentAvailabilityBitstreams[o], 0)) {
        i.content = { uri: this.parseImplicitURI(e, this.rootTile.content.uri) };
        break;
      }
    e.children.push(i);
    const s = this.transcodeSubtreeTiles(
      i,
      t
    ), n = this.listChildSubtrees(t, s);
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
    let i = [e], s = [];
    for (let n = 1; n < this.rootTile.implicitTiling.subtreeLevels; n++) {
      const o = Hi(this.rootTile), r = (Math.pow(o, n) - 1) / (o - 1), l = o * i.length;
      for (let c = 0; c < l; c++) {
        const h = r + c, A = c >> Math.log2(o), d = i[A];
        if (!this.getBit(t._tileAvailability, h)) {
          s.push(void 0);
          continue;
        }
        const u = this.deriveChildTile(
          t,
          d,
          h,
          c
        );
        d.children.push(u), s.push(u);
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
    const n = new mn(t, s);
    n.boundingVolume = this.getTileBoundingVolume(n), n.geometricError = this.getGeometricError(n);
    for (let o = 0; e && o < e._contentAvailabilityBitstreams.length; o++)
      if (e && this.getBit(e._contentAvailabilityBitstreams[o], i)) {
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
   * @return {Object} object containing the bounding volume.
   */
  getTileBoundingVolume(e) {
    const t = {};
    if (this.rootTile.boundingVolume.region) {
      const i = [...this.rootTile.boundingVolume.region], s = i[0], n = i[2], o = i[1], r = i[3], l = (n - s) / Math.pow(2, e.implicitTilingData.level), c = (r - o) / Math.pow(2, e.implicitTilingData.level);
      i[0] = s + l * e.implicitTilingData.x, i[2] = s + l * (e.implicitTilingData.x + 1), i[1] = o + c * e.implicitTilingData.y, i[3] = o + c * (e.implicitTilingData.y + 1);
      for (let h = 0; h < 4; h++) {
        const A = i[h];
        A < -Math.PI ? i[h] += 2 * Math.PI : A > Math.PI && (i[h] -= 2 * Math.PI);
      }
      if (ei(e)) {
        const h = i[4], A = (i[5] - h) / Math.pow(2, e.implicitTilingData.level);
        i[4] = h + A * e.implicitTilingData.z, i[5] = h + A * (e.implicitTilingData.z + 1);
      }
      t.region = i;
    }
    if (this.rootTile.boundingVolume.box) {
      const i = [...this.rootTile.boundingVolume.box], s = 2 ** e.implicitTilingData.level - 1, n = Math.pow(2, -e.implicitTilingData.level), o = ei(e) ? 3 : 2;
      for (let r = 0; r < o; r++) {
        i[3 + r * 3 + 0] *= n, i[3 + r * 3 + 1] *= n, i[3 + r * 3 + 2] *= n;
        const l = i[3 + r * 3 + 0], c = i[3 + r * 3 + 1], h = i[3 + r * 3 + 2], A = r === 0 ? e.implicitTilingData.x : r === 1 ? e.implicitTilingData.y : e.implicitTilingData.z;
        i[0] += 2 * l * (-0.5 * s + A), i[1] += 2 * c * (-0.5 * s + A), i[2] += 2 * h * (-0.5 * s + A);
      }
      t.box = i;
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
    const i = [], s = Hi(this.rootTile);
    for (let n = 0; n < t.length; n++) {
      const o = t[n];
      if (o !== void 0)
        for (let r = 0; r < s; r++) {
          const l = n * s + r;
          this.getBit(e._childSubtreeAvailability, l) && i.push({
            tile: o,
            childMortonIndex: l
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
class mc {
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
      const s = new fc(t);
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
const bc = new Jn(-1, 1, 1, -1, 0, 1);
class Cc extends ci {
  constructor() {
    super(), this.setAttribute("position", new Xt([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), this.setAttribute("uv", new Xt([0, 2, 0, 0, 2, 0], 2));
  }
}
const yc = new Cc();
class tr {
  /**
   * Constructs a new full screen quad.
   *
   * @param {?Material} material - The material to render te full screen quad with.
   */
  constructor(e) {
    this._mesh = new hi(yc, e);
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
    e.render(this._mesh, bc);
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
function U(a, e, t) {
  return a && e in a ? a[e] : t;
}
function ir(a) {
  return a !== "BOOLEAN" && a !== "STRING" && a !== "ENUM";
}
function Ec(a) {
  return /^FLOAT/.test(a);
}
function vt(a) {
  return /^VEC/.test(a);
}
function Mt(a) {
  return /^MAT/.test(a);
}
function sr(a, e, t, i = null) {
  return Mt(t) || vt(t) ? i.fromArray(a, e) : a[e];
}
function cs(a) {
  const { type: e, componentType: t } = a;
  switch (e) {
    case "SCALAR":
      return t === "INT64" ? 0n : 0;
    case "VEC2":
      return new F();
    case "VEC3":
      return new v();
    case "VEC4":
      return new ot();
    case "MAT2":
      return new Zr();
    case "MAT3":
      return new io();
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
function bn(a, e) {
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
function Et(a, e = null) {
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
function Ic(a, e = null) {
  if (a.array) {
    e = e && Array.isArray(e) ? e : [], e.length = a.count;
    for (let t = 0, i = e.length; t < i; t++)
      e[t] = ti(a, e[t]);
  } else
    e = ti(a, e);
  return e;
}
function ti(a, e = null) {
  const t = a.default, i = a.type;
  if (e = e || cs(a), t === null) {
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
  } else if (Mt(i))
    e.fromArray(t);
  else if (vt(i))
    e.fromArray(t);
  else
    return t;
}
function wc(a, e) {
  if (a.noData === null)
    return e;
  const t = a.noData, i = a.type;
  if (Array.isArray(e))
    for (let o = 0, r = e.length; o < r; o++)
      e[o] = s(e[o]);
  else
    e = s(e);
  return e;
  function s(o) {
    return n(o) && (o = ti(a, o)), o;
  }
  function n(o) {
    if (Mt(i)) {
      const r = o.elements;
      for (let l = 0, c = t.length; l < c; l++)
        if (t[l] !== r[l])
          return !1;
      return !0;
    } else if (vt(i)) {
      for (let r = 0, l = t.length; r < l; r++)
        if (t[r] !== o.getComponent(r))
          return !1;
      return !0;
    } else
      return t === o;
  }
}
function Bc(a, e) {
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
function Sc(a, e) {
  const {
    type: t,
    componentType: i,
    scale: s,
    offset: n,
    normalized: o
  } = a;
  if (Array.isArray(e))
    for (let A = 0, d = e.length; A < d; A++)
      e[A] = r(e[A]);
  else
    e = r(e);
  return e;
  function r(A) {
    return Mt(t) ? A = c(A) : vt(t) ? A = l(A) : A = h(A), A;
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
    return o && (A = Bc(i, A)), (o || Ec(i)) && (A = A * s + n), A;
  }
}
function ws(a, e, t = null) {
  if (a.array) {
    Array.isArray(e) || (e = new Array(a.count || 0)), e.length = t !== null ? t : a.count;
    for (let i = 0, s = e.length; i < s; i++)
      bn(a.type, e[i]) || (e[i] = cs(a));
  } else
    bn(a.type, e) || (e = cs(a));
  return e;
}
function ii(a, e) {
  for (const t in e)
    t in a || delete e[t];
  for (const t in a) {
    const i = a[t];
    e[t] = ws(i, e[t]);
  }
}
function vc(a) {
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
class fi {
  constructor(e, t, i = null) {
    this.name = t.name || null, this.description = t.description || null, this.type = t.type, this.componentType = t.componentType || null, this.enumType = t.enumType || null, this.array = t.array || !1, this.count = t.count || 0, this.normalized = t.normalized || !1, this.offset = t.offset || 0, this.scale = U(t, "scale", 1), this.max = U(t, "max", 1 / 0), this.min = U(t, "min", -1 / 0), this.required = t.required || !1, this.noData = U(t, "noData", null), this.default = U(t, "default", null), this.semantic = U(t, "semantic", null), this.enumSet = null, this.accessorProperty = i, i && (this.offset = U(i, "offset", this.offset), this.scale = U(i, "scale", this.scale), this.max = U(i, "max", this.max), this.min = U(i, "min", this.min)), t.type === "ENUM" && (this.enumSet = e[this.enumType], this.componentType === null && (this.componentType = U(this.enumSet, "valueType", "UINT16")));
  }
  // shape the given target to match the data type of the property
  // enums are set to their integer value
  shapeToProperty(e, t = null) {
    return ws(this, e, t);
  }
  // resolve the given object to the default value for the property for a single element
  // enums are set to a default string
  resolveDefaultElement(e) {
    return ti(this, e);
  }
  // resolve the target to the default value for the property for every element if it's an array
  // enums are set to a default string
  resolveDefault(e) {
    return Ic(this, e);
  }
  // converts any instances of no data to the default value
  resolveNoData(e) {
    return wc(this, e);
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
      const n = t.values.find((o) => o.value === s);
      return n === null ? "" : n.name;
    }
  }
  // apply scales
  adjustValueScaleOffset(e) {
    return ir(this.type) ? Sc(this, e) : e;
  }
}
class Bs {
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
  _initProperties(e = fi) {
    const t = {};
    for (const i in this.class.properties)
      t[i] = new e(this.enums, this.class.properties[i], this.definition.properties[i]);
    this.properties = t;
  }
}
class Mc extends fi {
  constructor(e, t, i = null) {
    super(e, t, i), this.attribute = i?.attribute ?? null;
  }
}
class xc extends Bs {
  constructor(...e) {
    super(...e), this.isPropertyAttributeAccessor = !0, this._initProperties(Mc);
  }
  getData(e, t, i = {}) {
    const s = this.properties;
    ii(s, i);
    for (const n in s)
      i[n] = this.getPropertyValue(n, e, t, i[n]);
    return i;
  }
  getPropertyValue(e, t, i, s = null) {
    if (t >= this.count)
      throw new Error("PropertyAttributeAccessor: Requested index is outside the range of the buffer.");
    const n = this.properties[e], o = n.type;
    if (n) {
      if (!this.definition.properties[e])
        return n.resolveDefault(s);
    } else throw new Error("PropertyAttributeAccessor: Requested class property does not exist.");
    s = n.shapeToProperty(s);
    const r = i.getAttribute(n.attribute.toLowerCase());
    if (Mt(o)) {
      const l = s.elements;
      for (let c = 0, h = l.length; c < h; c < h)
        l[c] = r.getComponent(t, c);
    } else if (vt(o))
      s.fromBufferAttribute(r, t);
    else if (o === "SCALAR" || o === "ENUM")
      s = r.getX(t);
    else
      throw new Error("StructuredMetadata.PropertyAttributeAccessor: BOOLEAN and STRING types are not supported by property attributes.");
    return s = n.adjustValueScaleOffset(s), s = n.resolveEnumsToStrings(s), s = n.resolveNoData(s), s;
  }
}
class Tc extends fi {
  constructor(e, t, i = null) {
    super(e, t, i), this.values = i?.values ?? null, this.valueLength = vc(this.type), this.arrayOffsets = U(i, "arrayOffsets", null), this.stringOffsets = U(i, "stringOffsets", null), this.arrayOffsetType = U(i, "arrayOffsetType", "UINT32"), this.stringOffsetType = U(i, "stringOffsetType", "UINT32");
  }
  // returns the necessary array length based on the array offsets if present
  getArrayLengthFromId(e, t) {
    let i = this.count;
    if (this.arrayOffsets !== null) {
      const { arrayOffsets: s, arrayOffsetType: n } = this, o = Et(n), r = new o(e[s]);
      i = r[t + 1] - r[t];
    }
    return i;
  }
  // returns the index offset into the data buffer for the given id based on the
  // the array offsets if present
  getIndexOffsetFromId(e, t) {
    let i = t;
    if (this.arrayOffsets) {
      const { arrayOffsets: s, arrayOffsetType: n } = this, o = Et(n);
      i = new o(e[s])[i];
    } else this.array && (i *= this.count);
    return i;
  }
}
class Qc extends Bs {
  constructor(...e) {
    super(...e), this.isPropertyTableAccessor = !0, this.count = this.definition.count, this._initProperties(Tc);
  }
  getData(e, t = {}) {
    const i = this.properties;
    ii(i, t);
    for (const s in i)
      t[s] = this.getPropertyValue(s, e, t[s]);
    return t;
  }
  // reads an individual element
  _readValueAtIndex(e, t, i, s = null) {
    const n = this.properties[e], { componentType: o, type: r } = n, l = this.data, c = l[n.values], h = Et(o, r), A = new h(c), d = n.getIndexOffsetFromId(l, t);
    if (ir(r) || r === "ENUM")
      return sr(A, (d + i) * n.valueLength, r, s);
    if (r === "STRING") {
      let u = d + i, p = 0;
      if (n.stringOffsets !== null) {
        const { stringOffsets: b, stringOffsetType: y } = n, C = Et(y), E = new C(l[b]);
        p = E[u + 1] - E[u], u = E[u];
      }
      const g = new Uint8Array(A.buffer, u, p);
      s = new TextDecoder().decode(g);
    } else if (r === "BOOLEAN") {
      const u = d + i, p = Math.floor(u / 8), g = u % 8;
      s = (A[p] >> g & 1) === 1;
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
    const n = s.array, o = this.data, r = s.getArrayLengthFromId(o, t);
    if (i = s.shapeToProperty(i, r), n)
      for (let l = 0, c = i.length; l < c; l++)
        i[l] = this._readValueAtIndex(e, t, l, i[l]);
    else
      i = this._readValueAtIndex(e, t, 0, i);
    return i = s.adjustValueScaleOffset(i), i = s.resolveEnumsToStrings(i), i = s.resolveNoData(i), i;
  }
}
const ut = /* @__PURE__ */ new $r();
class Cn {
  constructor() {
    this._renderer = new Yr(), this._target = new ks(1, 1), this._texTarget = new ks(), this._quad = new tr(new so({
      blending: Xr,
      blendDst: Wr,
      blendSrc: Jr,
      uniforms: {
        map: { value: null },
        pixel: { value: new F() }
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
    ut.min.copy(t), ut.max.copy(t), ut.max.x += 1, ut.max.y += 1, s.initRenderTarget(n), s.copyTextureToTexture(e, n.texture, ut, i, 0);
  }
}
const Me = /* @__PURE__ */ new class {
  constructor() {
    let a = null;
    Object.getOwnPropertyNames(Cn.prototype).forEach((e) => {
      e !== "constructor" && (this[e] = (...t) => (a = a || new Cn(), a[e](...t)));
    });
  }
}(), yn = /* @__PURE__ */ new F(), En = /* @__PURE__ */ new F(), In = /* @__PURE__ */ new F();
function Rc(a, e) {
  return e === 0 ? a.getAttribute("uv") : a.getAttribute(`uv${e}`);
}
function nr(a, e, t = new Array(3)) {
  let i = 3 * e, s = 3 * e + 1, n = 3 * e + 2;
  return a.index && (i = a.index.getX(i), s = a.index.getX(s), n = a.index.getX(n)), t[0] = i, t[1] = s, t[2] = n, t;
}
function or(a, e, t, i, s) {
  const [n, o, r] = i, l = Rc(a, e);
  yn.fromBufferAttribute(l, n), En.fromBufferAttribute(l, o), In.fromBufferAttribute(l, r), s.set(0, 0, 0).addScaledVector(yn, t.x).addScaledVector(En, t.y).addScaledVector(In, t.z);
}
function rr(a, e, t, i) {
  const s = a.x - Math.floor(a.x), n = a.y - Math.floor(a.y), o = Math.floor(s * e % e), r = Math.floor(n * t % t);
  return i.set(o, r), i;
}
const wn = /* @__PURE__ */ new F(), Bn = /* @__PURE__ */ new F(), Sn = /* @__PURE__ */ new F();
class Dc extends fi {
  constructor(e, t, i = null) {
    super(e, t, i), this.channels = U(i, "channels", [0]), this.index = U(i, "index", null), this.texCoord = U(i, "texCoord", null), this.valueLength = parseInt(this.type.replace(/[^0-9]/g, "")) || 1;
  }
  // takes the buffer to read from and the value index to read
  readDataFromBuffer(e, t, i = null) {
    const s = this.type;
    if (s === "BOOLEAN" || s === "STRING")
      throw new Error("PropertyTextureAccessor: BOOLEAN and STRING types not supported.");
    return sr(e, t * this.valueLength, s, i);
  }
}
class Lc extends Bs {
  constructor(...e) {
    super(...e), this.isPropertyTextureAccessor = !0, this._asyncRead = !1, this._initProperties(Dc);
  }
  // Reads the full set of property data
  getData(e, t, i, s = {}) {
    const n = this.properties;
    ii(n, s);
    const o = Object.keys(n), r = o.map((l) => s[l]);
    return this.getPropertyValuesAtTexel(o, e, t, i, r), o.forEach((l, c) => s[l] = r[c]), s;
  }
  // Reads the full set of property data asynchronously
  async getDataAsync(e, t, i, s = {}) {
    const n = this.properties;
    ii(n, s);
    const o = Object.keys(n), r = o.map((l) => s[l]);
    return await this.getPropertyValuesAtTexelAsync(o, e, t, i, r), o.forEach((l, c) => s[l] = r[c]), s;
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
    n.length = e.length, Me.increaseSizeTo(n.length);
    const o = this.data, r = this.definition.properties, l = this.properties, c = nr(s, t);
    for (let d = 0, u = e.length; d < u; d++) {
      const p = e[d];
      if (!r[p])
        continue;
      const g = l[p], b = o[g.index];
      or(s, g.texCoord, i, c, wn), rr(wn, b.image.width, b.image.height, Bn), Sn.set(d, 0), Me.renderPixelToTarget(b, Bn, Sn);
    }
    const h = new Uint8Array(e.length * 4);
    if (this._asyncRead)
      return Me.readDataAsync(h).then(() => (A.call(this), n));
    return Me.readData(h), A.call(this), n;
    function A() {
      for (let d = 0, u = e.length; d < u; d++) {
        const p = e[d], g = l[p], b = g.type;
        if (n[d] = ws(g, n[d]), g) {
          if (!r[p]) {
            n[d] = g.resolveDefault(n);
            continue;
          }
        } else throw new Error("PropertyTextureAccessor: Requested property does not exist.");
        const y = g.valueLength * (g.count || 1), C = g.channels.map((B) => h[4 * d + B]), E = g.componentType, m = Et(E, b), I = new m(y);
        if (new Uint8Array(I.buffer).set(C), g.array) {
          const B = n[d];
          for (let w = 0, M = B.length; w < M; w++)
            B[w] = g.readDataFromBuffer(I, w, B[w]);
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
class vn {
  constructor(e, t, i, s = null, n = null) {
    const {
      schema: o,
      propertyTables: r = [],
      propertyTextures: l = [],
      propertyAttributes: c = []
    } = e, { enums: h, classes: A } = o, d = r.map((g) => new Qc(g, A, h, i));
    let u = [], p = [];
    s && (s.propertyTextures && (u = s.propertyTextures.map((g) => new Lc(l[g], A, h, t))), s.propertyAttributes && (p = s.propertyAttributes.map((g) => new xc(c[g], A, h)))), this.schema = o, this.tableAccessors = d, this.textureAccessors = u, this.attributeAccessors = p, this.object = n, this.textures = t, this.nodeMetadata = s;
  }
  // Property Tables
  getPropertyTableData(e, t, i = null) {
    if (!Array.isArray(e) || !Array.isArray(t))
      i = i || {}, i = this.tableAccessors[e].getData(t, i);
    else {
      i = i || [];
      const s = Math.min(e.length, t.length);
      i.length = s;
      for (let n = 0; n < s; n++) {
        const o = this.tableAccessors[e[n]];
        i[n] = o.getData(t[n], i[n]);
      }
    }
    return i;
  }
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
  getPropertyTextureData(e, t, i = []) {
    const s = this.textureAccessors;
    i.length = s.length;
    for (let n = 0; n < s.length; n++) {
      const o = s[n];
      i[n] = o.getData(e, t, this.object.geometry, i[n]);
    }
    return i;
  }
  async getPropertyTextureDataAsync(e, t, i = []) {
    const s = this.textureAccessors;
    i.length = s.length;
    const n = [];
    for (let o = 0; o < s.length; o++) {
      const r = s[o].getDataAsync(e, t, this.object.geometry, i[o]).then((l) => {
        i[o] = l;
      });
      n.push(r);
    }
    return await Promise.all(n), i;
  }
  getPropertyTextureInfo() {
    return this.textureAccessors;
  }
  // Property Attributes
  getPropertyAttributeData(e, t = []) {
    const i = this.attributeAccessors;
    t.length = i.length;
    for (let s = 0; s < i.length; s++) {
      const n = i[s];
      t[s] = n.getData(e, this.object.geometry, t[s]);
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
const pt = "EXT_structural_metadata";
function kc(a, e = []) {
  var t;
  const i = ((t = a.json.textures) == null ? void 0 : t.length) || 0, s = new Array(i).fill(null);
  return e.forEach(({ properties: n }) => {
    for (const o in n) {
      const { index: r } = n[o];
      s[r] === null && (s[r] = a.loadTexture(r));
    }
  }), Promise.all(s);
}
function Fc(a, e = []) {
  var t;
  const i = ((t = a.json.bufferViews) == null ? void 0 : t.length) || 0, s = new Array(i).fill(null);
  return e.forEach(({ properties: n }) => {
    for (const o in n) {
      const { values: r, arrayOffsets: l, stringOffsets: c } = n[o];
      s[r] === null && (s[r] = a.loadBufferView(r)), s[l] === null && (s[l] = a.loadBufferView(l)), s[c] === null && (s[c] = a.loadBufferView(c));
    }
  }), Promise.all(s);
}
class _c {
  constructor(e) {
    this.parser = e, this.name = pt;
  }
  async afterRoot({ scene: e, parser: t }) {
    const i = t.json.extensionsUsed;
    if (!i || !i.includes(pt))
      return;
    let s = null, n = t.json.extensions[pt];
    if (n.schemaUri) {
      const { manager: c, path: h, requestHeader: A, crossOrigin: d } = t.options, u = new URL(n.schemaUri, h).toString(), p = new xe(c);
      p.setCrossOrigin(d), p.setResponseType("json"), p.setRequestHeader(A), s = p.loadAsync(u).then((g) => {
        n = { ...n, schema: g };
      });
    }
    const [o, r] = await Promise.all([
      kc(t, n.propertyTextures),
      Fc(t, n.propertyTables),
      s
    ]), l = new vn(n, o, r);
    e.userData.structuralMetadata = l, e.traverse((c) => {
      var h;
      if (t.associations.has(c)) {
        const { meshes: A, primitives: d } = t.associations.get(c), u = (h = t.json.meshes[A]) == null ? void 0 : h.primitives[d];
        if (u && u.extensions && u.extensions[pt]) {
          const p = u.extensions[pt];
          c.userData.structuralMetadata = new vn(n, o, r, p, c);
        } else
          c.userData.structuralMetadata = l;
      }
    });
  }
}
const Mn = /* @__PURE__ */ new F(), xn = /* @__PURE__ */ new F(), Tn = /* @__PURE__ */ new F();
function Pc(a) {
  return a.x > a.y && a.x > a.z ? 0 : a.y > a.z ? 1 : 2;
}
class Nc {
  constructor(e, t, i) {
    this.geometry = e, this.textures = t, this.data = i, this._asyncRead = !1, this.featureIds = i.featureIds.map((s) => {
      const { texture: n, ...o } = s, r = {
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
    const { geometry: i, textures: s, featureIds: n } = this, o = new Array(n.length).fill(null), r = n.length;
    Me.increaseSizeTo(r);
    const l = nr(i, e), c = l[Pc(t)];
    for (let d = 0, u = n.length; d < u; d++) {
      const p = n[d], g = "nullFeatureId" in p ? p.nullFeatureId : null;
      if ("texture" in p) {
        const b = s[p.texture.index];
        or(i, p.texture.texCoord, t, l, Mn), rr(Mn, b.image.width, b.image.height, xn), Tn.set(d, 0), Me.renderPixelToTarget(s[p.texture.index], xn, Tn);
      } else if ("attribute" in p) {
        const b = i.getAttribute(`_feature_id_${p.attribute}`).getX(c);
        b !== g && (o[d] = b);
      } else {
        const b = c;
        b !== g && (o[d] = b);
      }
    }
    const h = new Uint8Array(r * 4);
    if (this._asyncRead)
      return Me.readDataAsync(h).then(() => (A(), o));
    return Me.readData(h), A(), o;
    function A() {
      const d = new Uint32Array(1);
      for (let u = 0, p = n.length; u < p; u++) {
        const g = n[u], b = "nullFeatureId" in g ? g.nullFeatureId : null;
        if ("texture" in g) {
          const { channels: y } = g.texture, C = y.map((m) => h[4 * u + m]);
          new Uint8Array(d.buffer).set(C);
          const E = d[0];
          E !== b && (o[u] = E);
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
const si = "EXT_mesh_features";
function Qn(a, e, t) {
  a.traverse((i) => {
    var s;
    if (e.associations.has(i)) {
      const { meshes: n, primitives: o } = e.associations.get(i), r = (s = e.json.meshes[n]) == null ? void 0 : s.primitives[o];
      r && r.extensions && r.extensions[si] && t(i, r.extensions[si]);
    }
  });
}
class Gc {
  constructor(e) {
    this.parser = e, this.name = si;
  }
  async afterRoot({ scene: e, parser: t }) {
    var i;
    const s = t.json.extensionsUsed;
    if (!s || !s.includes(si))
      return;
    const n = ((i = t.json.textures) == null ? void 0 : i.length) || 0, o = new Array(n).fill(null);
    Qn(e, t, (l, { featureIds: c }) => {
      c.forEach((h) => {
        if (h.texture && o[h.texture.index] === null) {
          const A = h.texture.index;
          o[A] = t.loadTexture(A);
        }
      });
    });
    const r = await Promise.all(o);
    Qn(e, t, (l, c) => {
      l.userData.meshFeatures = new Nc(l.geometry, r, c);
    });
  }
}
class Uc {
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
class Vc {
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
    const t = new Ue(e.manager);
    this.dracoLoader && (t.setDRACOLoader(this.dracoLoader), e.manager.addHandler(this._dracoRegex, this.dracoLoader)), this.ktxLoader && t.setKTX2Loader(this.ktxLoader), this.meshoptDecoder && t.setMeshoptDecoder(this.meshoptDecoder), this.rtc && t.register(() => new Uc()), this.metadata && (t.register(() => new _c()), t.register(() => new Gc())), this.plugins.forEach((i) => t.register(i)), e.manager.addHandler(this._gltfRegex, t), this.tiles = e, this._loader = t;
  }
  dispose() {
    this.tiles.manager.removeHandler(this._gltfRegex), this.tiles.manager.removeHandler(this._dracoRegex), this.autoDispose && (this.ktxLoader.dispose(), this.dracoLoader.dispose());
  }
}
const { clamp: Jh } = st;
new tr(new Fe());
const Oc = new eo(new Uint8Array([255, 255, 255, 255]), 1, 1);
Oc.needsUpdate = !0;
const Hc = "https://unpkg.com/three@0.179.1/examples/jsm/libs/draco/gltf/", qc = "https://unpkg.com/three@0.179.1/examples/jsm/libs/basis/";
class zc extends pc {
  preprocessTileset(e, t, i = null) {
    const s = e.asset?.version || "1.0", [n] = s.split(".").map((r) => parseInt(r, 10));
    console.assert(
      n <= 1,
      "TilesRenderer: asset.version is expected to be a 1.x or a compatible version."
    );
    let o = t.replace(/\/[^/]*$/, "");
    o = new URL(o, window.location.href).toString(), this.preprocessNode(e.root, o, i);
  }
}
class jc {
  constructor(e = null, t = null) {
    this.renderer = e, this.camera = t, this.activeTilesets = /* @__PURE__ */ new Set(), this.tilesetStates = /* @__PURE__ */ new Map(), this.pendingQueueTasks = [], this._resolutionVec2 = new f.Vector2();
  }
  clamp(e, t, i) {
    return Math.min(i, Math.max(t, e));
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
  syncTilesetTraversalCameras(e, t, i = {}) {
    if (!e || !t)
      return [];
    const s = this.getDesiredTraversalCameras(t, i);
    return (Array.isArray(e.cameras) ? [...e.cameras] : []).forEach((o) => {
      s.includes(o) || e.deleteCamera(o);
    }), s.forEach((o) => {
      e.setCamera(o);
    }), s;
  }
  setCamera(e) {
    const t = this.camera;
    this.camera = e, this.activeTilesets.forEach((i) => {
      const s = this.tilesetStates.get(i), n = this.getResolutionConfig(s);
      if (t && t !== this.camera && this.getDesiredTraversalCameras(t, n).forEach((r) => {
        i.deleteCamera(r);
      }), this.camera) {
        const o = this.syncTilesetTraversalCameras(i, this.camera, n);
        this.setResolutionForCamera(i, this.camera, o, n);
      }
    });
  }
  setResolutionForCamera(e, t, i = null, s = {}) {
    if (!e || !t || !this.renderer)
      return;
    const n = s?.usePerEyeResolution !== !1, o = s?.useDrawingBufferResolution !== !1, r = Array.isArray(i) && i.length > 0 ? i : this.getDesiredTraversalCameras(t, s);
    if (r.length !== 0) {
      if (n && t.isArrayCamera) {
        let l = !1;
        if (r.forEach((c) => {
          const h = c?.viewport;
          h && Number.isFinite(h.z) && Number.isFinite(h.w) && h.z > 0 && h.w > 0 && (e.setResolution(c, h.z, h.w), l = !0);
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
      const t = this.tilesetStates.get(e), i = this.getResolutionConfig(t), s = this.syncTilesetTraversalCameras(e, this.camera, i);
      this.setResolutionForCamera(e, this.camera, s, i);
    });
  }
  runScheduledQueueTasks(e = {}) {
    if (this.pendingQueueTasks.length === 0)
      return;
    const i = Number.isFinite(e?.maxTasks) && e.maxTasks > 0 ? Math.max(1, Math.floor(e.maxTasks)) : 1 / 0, s = Number.isFinite(e?.timeBudgetMs) && e.timeBudgetMs >= 0, n = s ? e.timeBudgetMs : 1 / 0, o = s ? performance.now() : 0;
    let r = 0;
    for (; this.pendingQueueTasks.length > 0 && r < i && !(s && performance.now() - o >= n); ) {
      const l = this.pendingQueueTasks.shift();
      typeof l == "function" && l(), r += 1;
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
    return !Array.isArray(t) || t.length !== 16 ? null : t.every((i) => Number.isFinite(i)) ? t : null;
  }
  getRootTransformUpVector(e) {
    const t = this.getRootTransformArray(e);
    if (!t) return null;
    const i = new f.Vector3(t[8], t[9], t[10]);
    return i.lengthSq() <= 1e-12 ? null : i.normalize();
  }
  isLikelyGeospatialTileset(e) {
    const t = e?.rootTileset;
    if (!t) return !1;
    const i = t.properties;
    if (i && typeof i == "object") {
      const n = Object.keys(i).map((o) => o.toLowerCase());
      if (n.includes("latitude") && n.includes("longitude"))
        return !0;
    }
    const s = this.getRootTransformArray(e);
    if (s) {
      const n = s[12], o = s[13], r = s[14];
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
    const s = this.getRootTransformUpVector(e.tileset);
    if (!s)
      return !1;
    const n = s.clone().applyQuaternion(e.upGroup.quaternion);
    if (n.lengthSq() <= 1e-12)
      return !1;
    n.normalize();
    const o = new f.Vector3(0, 1, 0), r = new f.Quaternion().setFromUnitVectors(n, o);
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
    const i = new co();
    i.setDecoderPath(t.dracoDecoderPath || Hc);
    const s = new ee();
    s.setTranscoderPath(t.ktx2TranscoderPath || qc), this.renderer && s.detectSupport(this.renderer);
    const n = new Vc({
      rtc: !0,
      dracoLoader: i,
      ktxLoader: s
    });
    return e.registerPlugin(n), { dracoLoader: i, ktxLoader: s, gltfExtensionsPlugin: n };
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
    e.traverse((i) => {
      if (!i?.isMesh) return;
      if (i.geometry?.isBufferGeometry && !i.geometry.getAttribute("normal") && i.geometry.getAttribute("position"))
        try {
          i.geometry.computeVertexNormals();
        } catch {
        }
      i.castShadow = !0, i.receiveShadow = !0;
      const s = (n, o = -1) => {
        if (!n) return;
        let r = n;
        n.isMeshBasicMaterial && (t.has(n) ? r = t.get(n) : (r = this.convertBasicMaterial(n), t.set(n, r))), r.map && (r.map.colorSpace = f.SRGBColorSpace, r.map.needsUpdate = !0), r.needsUpdate = !0, o >= 0 && Array.isArray(i.material) ? i.material[o] = r : i.material = r;
      };
      Array.isArray(i.material) ? i.material.forEach((n, o) => s(n, o)) : s(i.material);
    });
  }
  updateBoundsAndCenter(e) {
    if (!e) return !1;
    const { tileset: t, tilesGroup: i, upGroup: s, geoGroup: n, modelGroup: o, autoCenter: r } = e, l = new f.Box3(), c = t.getBoundingBox(l) && this.isValidBox3(l);
    if (r && c && !e.hasAutoCentered) {
      const A = l.getCenter(new f.Vector3());
      i.position.set(-A.x, -A.y, -A.z), i.updateMatrixWorld(!0), e.hasAutoCentered = !0;
    }
    o.updateMatrixWorld(!0);
    const h = new f.Box3().setFromObject(o);
    if (this.isValidBox3(h))
      return o.userData.boundingBox = h, !0;
    if (c) {
      const A = l.clone(), d = new f.Matrix4().multiplyMatrices(n.matrix, s.matrix).multiply(i.matrix);
      if (A.applyMatrix4(d), this.isValidBox3(A))
        return o.userData.boundingBox = A, !0;
    }
    return !1;
  }
  applyTriangleBudget(e) {
    if (!e?.maxTriangles || !this.renderer?.info?.render)
      return;
    const t = this.renderer.info.render.triangles;
    if (!Number.isFinite(t) || t <= 0)
      return;
    const { tileset: i, maxTriangles: s, minErrorTarget: n, maxErrorTarget: o } = e, r = s * 1.08, l = s * 0.75;
    let c = i.errorTarget;
    t > r ? c = Math.min(o, c * 1.2 + 0.5) : t < l && (c = Math.max(n, c * 0.9)), Math.abs(c - i.errorTarget) > 0.05 && (i.errorTarget = c);
  }
  createAdaptiveState(e, t, i, s) {
    if (t.adaptiveQuality === !1)
      return null;
    const n = typeof t.errorTarget == "number" && t.errorTarget > 0 ? t.errorTarget : typeof e.errorTarget == "number" && e.errorTarget > 0 ? e.errorTarget : 12, o = this.clamp(
      typeof t.adaptiveMovingErrorTarget == "number" ? t.adaptiveMovingErrorTarget : Math.max(n * 2, n + 7),
      i,
      s
    ), r = this.clamp(
      typeof t.adaptiveStillErrorTarget == "number" ? t.adaptiveStillErrorTarget : Math.max(i, n * 0.75),
      i,
      s
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
      typeof t.adaptiveFastMovingErrorTarget == "number" ? t.adaptiveFastMovingErrorTarget : Math.max(o * 1.35, o + 6),
      i,
      s
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
      movingErrorTarget: o,
      fastMovingErrorTarget: u,
      stillErrorTarget: r,
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
  applyAdaptiveQuality(e, t) {
    if (!e?.adaptive || !t)
      return;
    const { adaptive: i, tileset: s, minErrorTarget: n, maxErrorTarget: o } = e, r = performance.now();
    if (t.updateMatrixWorld?.(!0), t.getWorldPosition(i.samplePosition), t.getWorldQuaternion(i.sampleQuaternion), !i.initialized) {
      i.lastSampleTimeMs = r, i.lastMovementTimeMs = r, i.lastPosition.copy(i.samplePosition), i.lastQuaternion.copy(i.sampleQuaternion), i.initialized = !0;
      return;
    }
    const l = Math.max((r - i.lastSampleTimeMs) / 1e3, 1e-6), c = i.samplePosition.distanceTo(i.lastPosition), h = this.clamp(Math.abs(i.sampleQuaternion.dot(i.lastQuaternion)), -1, 1), A = 2 * Math.acos(h), d = c / l, u = A / l, p = d > i.linearSpeedThreshold, g = u > i.angularSpeedThreshold, b = d > i.fastLinearSpeedThreshold;
    (p || g) && (i.lastMovementTimeMs = r);
    const C = r - i.lastMovementTimeMs >= i.settleDelayMs;
    let E = i.stillErrorTarget, m = i.stillTilesProcessed;
    if (C || (b ? (E = i.fastMovingErrorTarget, m = i.fastMovingTilesProcessed) : (E = i.movingErrorTarget, m = i.movingTilesProcessed)), e.maxTriangles && this.renderer?.info?.render) {
      const B = this.renderer.info.render.triangles;
      if (Number.isFinite(B) && B > 0) {
        const w = e.maxTriangles * 1.08, M = e.maxTriangles * 0.75;
        B > w ? (E = Math.max(E, E * 1.2 + 0.5), m = Math.max(i.minTilesProcessed, Math.round(m * 0.85))) : B < M && C && (E *= 0.92, m = Math.min(i.maxTilesProcessed, Math.round(m * 1.08)));
      }
    }
    E = this.clamp(E, n, o), m = this.clamp(
      Math.round(m),
      i.minTilesProcessed,
      i.maxTilesProcessed
    );
    const I = s.errorTarget + (E - s.errorTarget) * i.errorLerp;
    Math.abs(I - s.errorTarget) > 0.04 && (s.errorTarget = I), typeof s.maxTilesProcessed == "number" && Math.abs(s.maxTilesProcessed - m) >= 1 && (s.maxTilesProcessed = m), i.lastSampleTimeMs = r, i.lastPosition.copy(i.samplePosition), i.lastQuaternion.copy(i.sampleQuaternion);
  }
  applyOptions(e, t) {
    if (!t)
      return;
    const {
      errorTarget: i,
      maxDepth: s,
      loadSiblings: n,
      optimizedLoadStrategy: o,
      maxTilesProcessed: r,
      fetchOptions: l
    } = t;
    typeof i == "number" ? e.errorTarget = i : e.errorTarget = 12, typeof s == "number" ? e.maxDepth = s : e.maxDepth = 25, typeof n == "boolean" ? e.loadSiblings = n : e.loadSiblings = !0, typeof o == "boolean" ? e.optimizedLoadStrategy = o : e.optimizedLoadStrategy = !1, typeof r == "number" ? e.maxTilesProcessed = r : e.maxTilesProcessed = 224, l && typeof l == "object" && (e.fetchOptions = l);
  }
  load(e, t = {}) {
    return new Promise((i, s) => {
      const n = new zc(e);
      n.registerPlugin(new mc()), this.configureScheduling(n), this.applyOptions(n, t), this.configureGltfExtensions(n, t);
      const o = new f.Group(), r = new f.Group(), l = new f.Group();
      o.add(r), r.add(l);
      const c = n.group;
      l.add(c), this.setUpAxis(l, t.up || "+Y");
      const h = {
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
      if (h.adaptive = this.createAdaptiveState(n, t, h.minErrorTarget, h.maxErrorTarget), this.camera) {
        const g = this.getResolutionConfig(h), b = this.syncTilesetTraversalCameras(n, this.camera, g);
        this.setResolutionForCamera(n, this.camera, b, g);
      }
      h.onLoadModel = (g) => {
        g?.scene && this.normalizeTileModel(g.scene), h.boundsDirty = !0;
      }, n.addEventListener("load-model", h.onLoadModel);
      let A = null;
      const d = () => {
        n.removeEventListener("load-tileset", u), n.removeEventListener("load-error", p), A && t.signal && t.signal.removeEventListener("abort", A);
      }, u = () => {
        d(), this.applyGeospatialReorientation(h), this.updateBoundsAndCenter(h), this.activeTilesets.add(n), this.tilesetStates.set(n, h), i({ group: o, tileset: n });
      }, p = (g) => {
        d(), n.removeEventListener("load-model", h.onLoadModel), n.dispose(), s(g?.error || new Error("Tileset failed to load"));
      };
      if (n.addEventListener("load-tileset", u), n.addEventListener("load-error", p), t.signal && (A = () => {
        d(), n.removeEventListener("load-model", h.onLoadModel), n.dispose(), s(new Error("Loading cancelled"));
      }, t.signal.addEventListener("abort", A), t.signal.aborted)) {
        A();
        return;
      }
      n.update();
    });
  }
  update(e = null, t = {}) {
    const i = t?.queueOptions;
    this.runScheduledQueueTasks(i);
    const s = e || this.camera;
    s && s !== this.camera && this.setCamera(s), this.renderer && s && this.activeTilesets.forEach((n) => {
      const o = this.tilesetStates.get(n), r = this.getResolutionConfig(o), l = this.syncTilesetTraversalCameras(n, s, r);
      this.setResolutionForCamera(n, s, l, r);
    }), this.activeTilesets.forEach((n) => {
      const o = this.tilesetStates.get(n);
      o && (o.adaptive ? this.applyAdaptiveQuality(o, s) : this.applyTriangleBudget(o)), n.update(), o && o.boundsDirty && (this.updateBoundsAndCenter(o), o.boundsDirty = !1);
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
class it {
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
      let c = null;
      async function h(u) {
        u.addEventListener("end", A), await e.xr.setSession(u), i.textContent = "EXIT VR", c = u;
      }
      function A() {
        c.removeEventListener("end", A), i.textContent = "ENTER VR", c = null;
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
        c === null ? navigator.xr.requestSession("immersive-vr", d).then(h) : (c.end(), navigator.xr.offerSession !== void 0 && navigator.xr.offerSession("immersive-vr", d).then(h).catch((u) => {
          console.warn(u);
        }));
      }, navigator.xr.offerSession !== void 0 && navigator.xr.offerSession("immersive-vr", d).then(h).catch((u) => {
        console.warn(u);
      });
    }
    function n() {
      i.style.display = "", i.style.cursor = "auto", i.style.left = "calc(50% - 75px)", i.style.width = "150px", i.onmouseenter = null, i.onmouseleave = null, i.onclick = null;
    }
    function o() {
      n(), i.textContent = "VR NOT SUPPORTED";
    }
    function r(c) {
      n(), console.warn("Exception when trying to call xr.isSessionSupported", c), i.textContent = "VR NOT ALLOWED";
    }
    function l(c) {
      c.style.position = "absolute", c.style.bottom = "20px", c.style.padding = "12px 6px", c.style.border = "1px solid #fff", c.style.borderRadius = "4px", c.style.background = "rgba(0,0,0,0.1)", c.style.color = "#fff", c.style.font = "normal 13px sans-serif", c.style.textAlign = "center", c.style.opacity = "0.5", c.style.outline = "none", c.style.zIndex = "999";
    }
    if ("xr" in navigator)
      return i.id = "VRButton", i.style.display = "none", l(i), navigator.xr.isSessionSupported("immersive-vr").then(function(c) {
        c ? s() : o(), c && it.xrSessionIsGranted && i.click();
      }).catch(r), i;
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
        it.xrSessionIsGranted = !0;
      });
    }
  }
}
it.xrSessionIsGranted = !1;
it.registerSessionGrantedListener();
class Kc {
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
        this.vrButton = it.createButton(this.renderer, e), this.vrButton.innerHTML = '<span class="vr-icon">🥽</span>ENTER VR', this.vrButton.className = "vr-button--glass vr-button-available", this.vrButton.disabled = !1, this.vrButton.style.cssText = `
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
    e === "quest2" && (this.camera.far = 20, this.camera.updateProjectionMatrix());
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
              const o = n.length > 0 ? n[0] : s;
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
async function ar(a) {
  const e = await fetch(a);
  if (e.ok)
    return e.json();
  throw new Error(e.statusText);
}
async function Yc(a) {
  if (!a)
    throw new Error("No basePath supplied");
  return await ar(`${a}/profilesList.json`);
}
async function Jc(a, e, t = null, i = !0) {
  if (!a)
    throw new Error("No xrInputSource supplied");
  if (!e)
    throw new Error("No basePath supplied");
  const s = await Yc(e);
  let n;
  if (a.profiles.some((l) => {
    const c = s[l];
    return c && (n = {
      profileId: l,
      profilePath: `${e}/${c.path}`,
      deprecated: !!c.deprecated
    }), !!n;
  }), !n) {
    if (!t)
      throw new Error("No matching profile name found");
    const l = s[t];
    if (!l)
      throw new Error(`No matching profile name found and default profile "${t}" missing.`);
    n = {
      profileId: t,
      profilePath: `${e}/${l.path}`,
      deprecated: !!l.deprecated
    };
  }
  const o = await ar(n.profilePath);
  let r;
  if (i) {
    let l;
    if (a.handedness === "any" ? l = o.layouts[Object.keys(o.layouts)[0]] : l = o.layouts[a.handedness], !l)
      throw new Error(
        `No matching handedness, ${a.handedness}, in profile ${n.profileId}`
      );
    l.assetPath && (r = n.profilePath.replace("profile.json", l.assetPath));
  }
  return { profile: o, assetPath: r };
}
const Wc = {
  xAxis: 0,
  yAxis: 0,
  button: 0,
  state: N.ComponentState.DEFAULT
};
function Xc(a = 0, e = 0) {
  let t = a, i = e;
  if (Math.sqrt(a * a + e * e) > 1) {
    const o = Math.atan2(e, a);
    t = Math.cos(o), i = Math.sin(o);
  }
  return {
    normalizedXAxis: t * 0.5 + 0.5,
    normalizedYAxis: i * 0.5 + 0.5
  };
}
class $c {
  constructor(e) {
    this.componentProperty = e.componentProperty, this.states = e.states, this.valueNodeName = e.valueNodeName, this.valueNodeProperty = e.valueNodeProperty, this.valueNodeProperty === N.VisualResponseProperty.TRANSFORM && (this.minNodeName = e.minNodeName, this.maxNodeName = e.maxNodeName), this.value = 0, this.updateFromComponent(Wc);
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
    const { normalizedXAxis: n, normalizedYAxis: o } = Xc(e, t);
    switch (this.componentProperty) {
      case N.ComponentProperty.X_AXIS:
        this.value = this.states.includes(s) ? n : 0.5;
        break;
      case N.ComponentProperty.Y_AXIS:
        this.value = this.states.includes(s) ? o : 0.5;
        break;
      case N.ComponentProperty.BUTTON:
        this.value = this.states.includes(s) ? i : 0;
        break;
      case N.ComponentProperty.STATE:
        this.valueNodeProperty === N.VisualResponseProperty.VISIBILITY ? this.value = this.states.includes(s) : this.value = this.states.includes(s) ? 1 : 0;
        break;
      default:
        throw new Error(`Unexpected visualResponse componentProperty ${this.componentProperty}`);
    }
  }
}
class Zc {
  /**
   * @param {Object} componentId - Id of the component
   * @param {Object} componentDescription - Description of the component to be created
   */
  constructor(e, t) {
    if (!e || !t || !t.visualResponses || !t.gamepadIndices || Object.keys(t.gamepadIndices).length === 0)
      throw new Error("Invalid arguments supplied");
    this.id = e, this.type = t.type, this.rootNodeName = t.rootNodeName, this.touchPointNodeName = t.touchPointNodeName, this.visualResponses = {}, Object.keys(t.visualResponses).forEach((i) => {
      const s = new $c(t.visualResponses[i]);
      this.visualResponses[i] = s;
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
class eh {
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
      this.components[s] = new Zc(s, n);
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
const th = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles", ih = "generic-trigger";
class sh extends ai {
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
        const { valueNode: s, minNode: n, maxNode: o, value: r, valueNodeProperty: l } = i;
        s && (l === N.VisualResponseProperty.VISIBILITY ? s.visible = r : l === N.VisualResponseProperty.TRANSFORM && (s.quaternion.slerpQuaternions(
          n.quaternion,
          o.quaternion,
          r
        ), s.position.lerpVectors(
          n.position,
          o.position,
          r
        )));
      });
    }));
  }
}
function nh(a, e) {
  Object.values(a.components).forEach((t) => {
    const { type: i, touchPointNodeName: s, visualResponses: n } = t;
    if (i === N.ComponentType.TOUCHPAD)
      if (t.touchPointNode = e.getObjectByName(s), t.touchPointNode) {
        const o = new no(1e-3), r = new Fe({ color: 255 }), l = new hi(o, r);
        t.touchPointNode.add(l);
      } else
        console.warn(`Could not find touch dot, ${t.touchPointNodeName}, in touchpad component ${t.id}`);
    Object.values(n).forEach((o) => {
      const { valueNodeName: r, minNodeName: l, maxNodeName: c, valueNodeProperty: h } = o;
      if (h === N.VisualResponseProperty.TRANSFORM) {
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
function Rn(a, e) {
  nh(a.motionController, e), a.envMap && e.traverse((t) => {
    t.isMesh && (t.material.envMap = a.envMap, t.material.needsUpdate = !0);
  }), a.add(e);
}
class oh {
  /**
   * Constructs a new XR controller model factory.
   *
   * @param {?GLTFLoader} [gltfLoader=null] - A glTF loader that is used to load controller models.
   * @param {?Function} [onLoad=null] - A callback that is executed when a controller model has been loaded.
   */
  constructor(e = null, t = null) {
    this.gltfLoader = e, this.path = th, this._assetCache = {}, this.onLoad = t, this.gltfLoader || (this.gltfLoader = new Ue());
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
    const t = new sh();
    let i = null;
    return e.addEventListener("connected", (s) => {
      const n = s.data;
      n.targetRayMode !== "tracked-pointer" || !n.gamepad || n.hand || Jc(n, this.path, ih).then(({ profile: o, assetPath: r }) => {
        t.motionController = new eh(
          n,
          o,
          r
        );
        const l = this._assetCache[t.motionController.assetUrl];
        if (l)
          i = l.scene.clone(), Rn(t, i), this.onLoad && this.onLoad(i);
        else {
          if (!this.gltfLoader)
            throw new Error("GLTFLoader not set.");
          this.gltfLoader.setPath(""), this.gltfLoader.load(
            t.motionController.assetUrl,
            (c) => {
              this._assetCache[t.motionController.assetUrl] = c, i = c.scene.clone(), Rn(t, i), this.onLoad && this.onLoad(i);
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
      t.motionController = null, t.remove(i), i = null;
    }), t;
  }
}
class rh {
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
            const l = new f.Vector3().setFromMatrixPosition(new f.Matrix4().fromArray(s.transform.matrix)), c = new f.Vector3().setFromMatrixPosition(new f.Matrix4().fromArray(n.transform.matrix)), h = l.distanceTo(c);
            this.handStates[i].pinch = h < 0.025;
          }
          let o = !0;
          const r = t.hand.get("wrist");
          if (r && r.transform) {
            const l = new f.Vector3().setFromMatrixPosition(new f.Matrix4().fromArray(r.transform.matrix));
            for (const c of ["index-finger-tip", "middle-finger-tip", "ring-finger-tip", "pinky-finger-tip"]) {
              const h = t.hand.get(c);
              if (!h || !h.transform) {
                o = !1;
                continue;
              }
              new f.Vector3().setFromMatrixPosition(new f.Matrix4().fromArray(h.transform.matrix)).distanceTo(l) > 0.045 && (o = !1);
            }
          } else
            o = !1;
          if (this.handStates[i].fist = o, n && r && n.transform && r.transform) {
            const l = new f.Vector3().setFromMatrixPosition(new f.Matrix4().fromArray(r.transform.matrix)), c = new f.Vector3().setFromMatrixPosition(new f.Matrix4().fromArray(n.transform.matrix));
            this.handStates[i].direction = new f.Vector3().subVectors(c, l).normalize();
          }
        }
    }
  }
  initControllers() {
    const e = new oh();
    for (let t = 0; t < 2; t++) {
      const i = this.renderer.xr.getController(t), s = this.renderer.xr.getControllerGrip(t);
      s.add(e.createControllerModel(s)), this.camera.parent.add(i), this.camera.parent.add(s), this.controllers.push(i), this.controllerGrips.push(s);
    }
    this.setupControllerEvents();
  }
  setupControllerEvents() {
    this.controllers.forEach((e, t) => {
      e.addEventListener("connected", (i) => {
        const { handedness: s, targetRayMode: n, profiles: o } = i.data, r = Array.isArray(o) && o.some((l) => l && l.toLowerCase().includes("hand"));
        n !== "tracked-pointer" || r || (s === "left" ? (this.controller1 = e, this.controllerGrip1 = this.controllerGrips[t]) : s === "right" && (this.controller2 = e, this.controllerGrip2 = this.controllerGrips[t]), e.userData.handedness = s, e.userData.initialised = !0);
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
          let o = [];
          s === "left" ? o = [4, 5] : s === "right" && (o = [4, 5]), o.forEach((r) => {
            if (i.buttons[r]) {
              const l = i.buttons[r], c = `${s}-${r}`, h = this.buttonStates.get(c) || !1, A = l.pressed;
              A && !h && this.onModeToggle && this.onModeToggle(), this.buttonStates.set(c, A);
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
        const n = s.gamepad, o = s.handedness;
        if (n.axes.length >= 4) {
          const r = n.axes[2] || 0, l = n.axes[3] || 0, c = n.axes[0] || 0, h = n.axes[1] || 0, A = Math.abs(r) > this.inputDeadzone ? r : 0, d = Math.abs(l) > this.inputDeadzone ? l : 0, u = Math.abs(c) > this.inputDeadzone ? c : 0, p = Math.abs(h) > this.inputDeadzone ? h : 0;
          o === "left" ? (A !== 0 || d !== 0) && (t = {
            x: A,
            y: d,
            handedness: "left"
          }) : o === "right" && (u !== 0 || p !== 0) && (i = {
            x: u,
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
class ah {
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
      new f.Vector3(0, 0, 0),
      new f.Vector3(0, 1, -5)
    ], t = new f.CatmullRomCurve3(e), i = new f.TubeGeometry(t, 20, 0.03, 8, !1), s = new f.MeshBasicMaterial({
      color: this.style.accentColor,
      transparent: !0,
      opacity: 0.62,
      side: f.DoubleSide
    });
    if (this.teleportCurve = new f.Mesh(i, s), this.teleportCurve.visible = !1, this.scene.add(this.teleportCurve), !this.teleportMarker) {
      const n = new f.RingGeometry(0.34, 0.5, 28), o = new f.MeshBasicMaterial({
        color: this.style.neutralColor,
        transparent: !0,
        opacity: 0.78,
        side: f.DoubleSide
      });
      this.teleportMarker = new f.Mesh(n, o), this.teleportMarker.rotation.x = -Math.PI / 2, this.teleportMarker.visible = !1, this.scene.add(this.teleportMarker);
      const r = new f.RingGeometry(0.46, 0.72, 28), l = new f.MeshBasicMaterial({
        color: this.style.accentColor,
        transparent: !0,
        opacity: 0.18,
        side: f.DoubleSide
      }), c = new f.Mesh(r, l);
      c.rotation.x = -Math.PI / 2, this.teleportMarker.add(c);
    }
    if (!this.teleportFloor) {
      const n = new f.PlaneGeometry(14, 14), o = new f.MeshBasicMaterial({
        color: this.style.floorColor,
        transparent: !0,
        opacity: 0.06,
        side: f.DoubleSide,
        visible: !1
      });
      this.teleportFloor = new f.Mesh(n, o), this.teleportFloor.rotation.x = -Math.PI / 2, this.teleportFloor.visible = !1, this.scene.add(this.teleportFloor);
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
    const o = () => {
      n += 1 / 60;
      const r = Math.min(n / s, 1), l = 1 - Math.pow(1 - r, 3);
      this.camera.parent.position.lerpVectors(t, e, l), r < 1 && requestAnimationFrame(o);
    };
    o();
  }
  processSnapTurn(e, t = 30) {
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
  processTeleportation(e, t, i) {
    const s = Math.sqrt(t * t + i * i), n = e && e.inputSource && e.inputSource.handedness === "right", o = i;
    if (s > this.teleportThreshold && !this.teleportPressed)
      this.teleportPressed = !0, this.teleportMaxMagnitude = s, this.teleportController = e, this.teleportFloorHeight = this.camera.parent.position.y, this.showTeleportArc(), this.onTeleportStart && this.onTeleportStart();
    else if (this.teleportPressed) {
      if (this.teleportMaxMagnitude = Math.max(this.teleportMaxMagnitude, s), n && Math.abs(o) > 0.1) {
        const r = 0.06666666666666667;
        this.teleportFloorHeight += o * r, this.teleportFloorHeight = Math.max(this.teleportFloorMin, Math.min(this.teleportFloorMax, this.teleportFloorHeight)), this.updateTeleportFloor();
      }
      this.updateTeleportArc(), s < this.teleportReleaseThreshold && (this.calculateAndExecuteTeleport(), this.hideTeleportArc(), this.teleportPressed = !1, this.teleportMaxMagnitude = 0, this.teleportController = null, this.onTeleportEnd && this.onTeleportEnd());
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
    const e = new f.Vector3();
    this.teleportController.getWorldPosition(e);
    const t = new f.Quaternion();
    this.teleportController.getWorldQuaternion(t);
    const i = new f.Vector3(0, 0, -1);
    i.applyQuaternion(t);
    const s = this.teleportMinDistance, n = this.teleportMaxDistance, o = Math.min(this.teleportMaxMagnitude / this.teleportThreshold, 1), r = n - s, l = Math.pow(o, 0.78), c = s + r * l, h = [], A = 32, d = -9.8;
    let u = Math.sqrt(c * Math.abs(d) / 2);
    if (i.y > 0.3 ? u *= 1 - i.y * 0.5 : i.y < -0.5 && (u *= 1 + Math.abs(i.y) * 0.3), Math.sqrt(i.x * i.x + i.z * i.z) > 0.1) {
      const x = Math.min(1, c / (u * 2));
      u *= x;
    }
    const g = i.x * u, b = Math.max(i.y * u, u * 0.3), y = i.z * u, C = b / Math.abs(d), E = Math.max(C * 2.2, 1.5), m = this.teleportFloorHeight;
    let I = null, B = !1, w = e.y, M = 0;
    const S = 8;
    for (let x = 0; x <= A; x++) {
      const R = x / A * E, L = new f.Vector3(
        e.x + g * R,
        e.y + b * R + 0.5 * d * R * R,
        e.z + y * R
      );
      Math.abs(L.y - e.y) > S && (L.y = e.y + Math.sign(L.y - e.y) * S), !B && L.y < w && (B = !0, M = R), h.push(L);
      const q = B ? R - M : 0, T = B && q > 0.1;
      if (!I && T && L.y <= m) {
        if (x > 0) {
          const z = h[x - 1], k = (m - z.y) / (L.y - z.y);
          I = new f.Vector3().lerpVectors(z, L, k), I.y = m;
        } else
          I = L.clone(), I.y = m;
        h[x] = I, h.length = x + 1;
        break;
      }
      if (w = L.y, Math.sqrt(
        Math.pow(L.x - e.x, 2) + Math.pow(L.z - e.z, 2)
      ) > n) {
        T && (I = new f.Vector3(L.x, m, L.z), h[x] = I, h.length = x + 1);
        break;
      }
    }
    if (!I && h.length > 0) {
      let x = h[0], R = 0;
      for (let L = 1; L < h.length; L++)
        h[L].y < x.y && (x = h[L], R = L);
      R > h.length / 3 && (I = new f.Vector3(x.x, m, x.z), h.length = R + 1, h[R] = I);
    }
    if (h.length > 1) {
      const x = new f.CatmullRomCurve3(h), R = new f.TubeGeometry(x, 20, 0.022, 6, !1);
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
      const e = this.teleportMarker.position.clone(), t = this.camera.parent.position, i = Math.sqrt(
        Math.pow(e.x - t.x, 2) + Math.pow(e.z - t.z, 2)
      );
      if (i >= this.teleportMinDistance && i <= this.teleportMaxDistance) {
        const s = new f.Vector3(e.x, this.teleportFloorHeight, e.z);
        this.validTeleportPosition = s, this.executeTeleport(), this.teleportFloorHeight = null;
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
class lh {
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
    const i = this.renderer.xr.getSession && this.renderer.xr.getSession();
    if (i && i.visibilityState !== "visible")
      return;
    const s = t?.inputSources || (i ? Array.from(i.inputSources || []) : []);
    if (!s || s.length === 0)
      return;
    if (i && t.updateHandGestures && t.handsActive) {
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
        const b = this.camera.parent || this.camera, y = this.MOVE_SPEED * (g ? 3 : 1) * e;
        b.position.addScaledVector(p, y), this.isMoving = !0, this.onMovementStart && !this._wasMoving && this.onMovementStart(), this.onMovementUpdate && this.onMovementUpdate({
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
    let o = !1, r = !1;
    for (let u = 0; u < s.length; u++) {
      const p = s[u];
      if (!p || !p.gamepad || !p.gamepad.buttons || !p.gamepad.axes || p.gamepad.axes.length < 4)
        continue;
      const g = p.gamepad, y = p.handedness === "left" ? t.controller1 : t.controller2;
      if (!y) continue;
      const C = g.axes[2] || 0, E = g.axes[3] || 0;
      if (p.handedness === "left") {
        const m = g.buttons[1], I = m && m.pressed ? 3 : 1, B = this.comfortSettings.reducedMotion ? this.comfortSettings.comfortSpeed : 1;
        if (m && m.pressed && (r = !0), this.comfortSettings.locomotionMode === "teleport" && this.teleportSystem && y) {
          this.teleportSystem.processTeleportation(y, C, E);
          continue;
        } else {
          const M = new f.Vector3();
          this.camera.getWorldDirection(M), M.y = 0, M.normalize();
          const S = new f.Vector3().crossVectors(M, this.camera.up).normalize();
          if (Math.abs(E) > 0.1) {
            const x = this.MOVE_SPEED * I * B * this.currentSpeed * e;
            n.position.addScaledVector(M, -E * x), o = !0;
          }
          if (Math.abs(C) > 0.1) {
            const x = this.MOVE_SPEED * I * B * this.currentSpeed * e;
            n.position.addScaledVector(S, C * x), o = !0;
          }
        }
      }
      if (p.handedness === "right") {
        const m = g.buttons[1], I = m && m.pressed ? 3 : 1, B = this.comfortSettings.reducedMotion ? this.comfortSettings.comfortSpeed : 1;
        if (m && m.pressed && Math.abs(E) > 0.1 && (r = !0), this.teleportSystem && this.teleportSystem.teleportPressed && this.teleportSystem.teleportCurve && this.teleportSystem.teleportCurve.visible) {
          if (Math.abs(E) > 0.1) {
            const w = 4 * e;
            this.teleportSystem.adjustFloorHeight(E * w);
          }
        } else {
          if (this.comfortSettings.turningMode === "snap" && this.teleportSystem)
            this.teleportSystem.processSnapTurn(C, this.comfortSettings.snapTurnAngle);
          else if (Math.abs(C) > this.inputDeadzone) {
            const w = this.lastTurnInput * this.turnSmoothingFactor + C * (1 - this.turnSmoothingFactor);
            if (this.lastTurnInput = w, Math.abs(w) > this.inputDeadzone) {
              const M = this.comfortSettings.reducedMotion ? this.TURN_SPEED * 0.5 : this.TURN_SPEED, S = w * M * Math.min(e, 1 / 30);
              n.rotation.y -= S, n.rotation.y = this.normalizeAngle(n.rotation.y);
            }
          } else
            this.lastTurnInput *= 0.9;
          if (Math.abs(E) > 0.1) {
            const w = this.FLY_SPEED * I * B * this.currentSpeed * e;
            n.position.y -= E * w, o = !0;
          }
        }
      }
    }
    const l = this.isMoving;
    this.isMoving = o;
    const h = (this.isMoving ? this.MOVE_SPEED : 0) - this.currentSpeed;
    this.currentSpeed += h * this.SPEED_RAMP_RATE * e, this.currentSpeed = Math.max(0, this.currentSpeed);
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
class ch {
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
class hh {
  /**
   * Creates a new VRManager instance
   * 
   * @param {THREE.WebGLRenderer} renderer - Three.js WebGL renderer with XR enabled
   * @param {THREE.PerspectiveCamera} camera - Three.js camera for VR dolly system
   * @param {THREE.Scene} scene - Three.js scene for VR objects
   * @param {string} [audioPath='./sound/'] - Path to VR audio files
  * @param {boolean} [enableAudio=false] - Enable VR audio system
   */
  constructor(e, t, i, s = "./sound/", n = !1, o = null) {
    this.renderer = e, this.camera = t, this.scene = i, this.audioPath = s, this.enableAudio = n, this.container = o, this.vrCore = new Kc(e, t, i, o), this.vrControllers = new rh(e, t), this.vrTeleport = new ah(i, t), this.vrLocomotion = new lh(t, e), this.vrAudio = this.enableAudio ? new ch() : null, this.isVRSupported = !1, this.isVRPresenting = !1, this.controller1 = null, this.controller2 = null, this.controllerGrip1 = null, this.controllerGrip2 = null, this.controllers = [], this.controllerGrips = [], this._preVRCameraState = {
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
class Ah {
  /**
   * Constructs a new AR button.
   *
   * @param {WebGLRenderer|WebGPURenderer} renderer - The renderer.
   * @param {XRSessionInit} [sessionInit] - The a configuration object for the AR session.
   * @return {HTMLElement} The button or an error message if `immersive-ar` isn't supported.
   */
  static createButton(e, t = {}) {
    const i = document.createElement("button");
    function s() {
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
        d.addEventListener("end", A), e.xr.setReferenceSpaceType("local"), await e.xr.setSession(d), i.textContent = "STOP AR", t.domOverlay.root.style.display = "", c = d;
      }
      function A() {
        c.removeEventListener("end", A), i.textContent = "START AR", t.domOverlay.root.style.display = "none", c = null;
      }
      i.style.display = "", i.style.cursor = "pointer", i.style.left = "calc(50% - 50px)", i.style.width = "100px", i.textContent = "START AR", i.onmouseenter = function() {
        i.style.opacity = "1.0";
      }, i.onmouseleave = function() {
        i.style.opacity = "0.5";
      }, i.onclick = function() {
        c === null ? navigator.xr.requestSession("immersive-ar", t).then(h) : (c.end(), navigator.xr.offerSession !== void 0 && navigator.xr.offerSession("immersive-ar", t).then(h).catch((d) => {
          console.warn(d);
        }));
      }, navigator.xr.offerSession !== void 0 && navigator.xr.offerSession("immersive-ar", t).then(h).catch((d) => {
        console.warn(d);
      });
    }
    function n() {
      i.style.display = "", i.style.cursor = "auto", i.style.left = "calc(50% - 75px)", i.style.width = "150px", i.onmouseenter = null, i.onmouseleave = null, i.onclick = null;
    }
    function o() {
      n(), i.textContent = "AR NOT SUPPORTED";
    }
    function r(c) {
      n(), console.warn("Exception when trying to call xr.isSessionSupported", c), i.textContent = "AR NOT ALLOWED";
    }
    function l(c) {
      c.style.position = "absolute", c.style.bottom = "20px", c.style.padding = "12px 6px", c.style.border = "1px solid #fff", c.style.borderRadius = "4px", c.style.background = "rgba(0,0,0,0.1)", c.style.color = "#fff", c.style.font = "normal 13px sans-serif", c.style.textAlign = "center", c.style.opacity = "0.5", c.style.outline = "none", c.style.zIndex = "999";
    }
    if ("xr" in navigator)
      return i.id = "ARButton", i.style.display = "none", l(i), navigator.xr.isSessionSupported("immersive-ar").then(function(c) {
        c ? s() : o();
      }).catch(r), i;
    {
      const c = document.createElement("a");
      return window.isSecureContext === !1 ? (c.href = document.location.href.replace(/^http:/, "https:"), c.innerHTML = "WEBXR NEEDS HTTPS") : (c.href = "https://immersiveweb.dev/", c.innerHTML = "WEBXR NOT AVAILABLE"), c.style.left = "calc(50% - 90px)", c.style.width = "180px", c.style.textDecoration = "none", l(c), c;
    }
  }
}
class dh {
  constructor(e, t, i, s = null) {
    this.renderer = e, this.camera = t, this.scene = i, this.container = s || document.body, this.isARSupported = !1, this.isARPresenting = !1, this.isQuest2 = !1, this.isQuest3 = !1, this.arButton = null, this.buttonObserver = null, this.onSessionStart = null, this.onSessionEnd = null;
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
      this.arButton = Ah.createButton(this.renderer, e), this.arButton.innerHTML = '<span class="ar-icon">👁️</span>ENTER AR', this.arButton.className = "ar-button--glass ar-button-available", this.arButton.disabled = !1, this.arButton.style.cssText = `
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
        const i = document.createElement("div");
        i.className = "ar-mode-active", i.style.display = "none", this.container.appendChild(i);
        const s = window.getComputedStyle(i), n = s.getPropertyValue("--ar-css-loaded") === "true" || s.opacity === "0.998";
        this.container.removeChild(i), n ? e() : setTimeout(t, 50);
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
    this.buttonObserver && (this.buttonObserver.disconnect(), this.buttonObserver = null), this.arButton && this.arButton.parentNode && this.arButton.parentNode.removeChild(this.arButton), this.isQuest2 = !1, this.isQuest3 = !1, this.isARSupported = !1, this.isARPresenting = !1;
  }
}
const Dn = new P(), Ln = new v();
class kn {
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
    let o;
    !n || !n.primitive || n.primitive === "sphere" ? o = new no(1, 10, 10) : n.primitive === "box" && (o = new ea(1, 1, 1));
    const r = new ps();
    this.handMesh = new us(o, r, 30), this.handMesh.frustumCulled = !1, this.handMesh.instanceMatrix.setUsage(ta), this.handMesh.castShadow = !0, this.handMesh.receiveShadow = !0, this.handModel.add(this.handMesh), this.joints = [
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
      n.visible && (Ln.setScalar(n.jointRadius || 8e-3), Dn.compose(n.position, n.quaternion, Ln), this.handMesh.setMatrixAt(s, Dn), i++);
    }
    this.handMesh.count = i, this.handMesh.instanceMatrix.needsUpdate = !0;
  }
}
const uh = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles/generic-hand/";
class ph {
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
  constructor(e, t, i, s, n = null, o = null) {
    this.controller = t, this.handModel = e, this.bones = [], n === null && (n = new Ue(), n.setPath(i || uh)), n.load(`${s}.glb`, (r) => {
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
      ].forEach((A) => {
        const d = l.getObjectByName(A);
        d !== void 0 ? d.jointName = A : console.warn(`Couldn't find ${A} in ${s} hand mesh`), this.bones.push(d);
      }), o && o(l);
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
class gh extends ai {
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
class fh {
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
    const i = new gh(e);
    return e.addEventListener("connected", (s) => {
      const n = s.data;
      n.hand && !i.motionController && (i.xrInputSource = n, t === void 0 || t === "spheres" ? i.motionController = new kn(i, e, this.path, n.handedness, { primitive: "sphere" }) : t === "boxes" ? i.motionController = new kn(i, e, this.path, n.handedness, { primitive: "box" }) : t === "mesh" && (i.motionController = new ph(i, e, this.path, n.handedness, this.gltfLoader, this.onLoad))), e.visible = !0;
    }), e.addEventListener("disconnected", () => {
      e.visible = !1;
    }), i;
  }
}
class mh {
  constructor(e) {
    this.renderer = e, this.handModelFactory = new fh(), this.hand1 = null, this.hand2 = null, this.interactionEnabled = !0, this.dragging = !1, this.scaling = !1, this.rotating = !1, this.dragStartPos = new f.Vector3(), this.scaleStartDistance = 0, this.rotateStartAngle = 0, this.pinchIntent = {
      hand1Start: 0,
      hand2Start: 0,
      delay: 100
    }, this.inertiaActive = !1, this.posVelocity = new f.Vector3(), this.rotVelocity = 0, this.scaleVelocity = 0, this.POSITION_DAMPING = 100, this.ROTATION_DAMPING = 8, this.SCALE_DAMPING = 8, this.MAX_ROT_VELOCITY = Math.PI, this.MAX_SCALE_VELOCITY = 0.5, this.MIN_SCALE = 0.01, this.MAX_SCALE = 1, this.VELOCITY_DEAD_ZONE = 1e-3, this.DISTANCE_GAIN_THRESHOLD = 5, this.MAX_DISTANCE_GAIN = 3, this.MAX_DELTA_PER_FRAME = 0.5, this.VELOCITY_SMOOTHING = 0.3, this.tempVec1 = new f.Vector3(), this.tempVec2 = new f.Vector3(), this.onGestureStart = null, this.onGestureEnd = null;
  }
  init(e) {
    this.hand1 = this.setupHand(e, 0, "hand1Start"), this.hand2 = this.setupHand(e, 1, "hand2Start");
  }
  setupHand(e, t, i) {
    const s = this.renderer.xr.getHand(t);
    s.userData.pinch = !1, s.addEventListener("pinchstart", () => {
      s.userData.pinch = !0, this.pinchIntent[i] = performance.now();
    }), s.addEventListener("pinchend", () => {
      s.userData.pinch = !1, this.onPinchEnd();
    });
    const n = this.handModelFactory.createHandModel(s, "mesh");
    return s.add(n), e.add(s), n.addEventListener("connected", () => {
      this.styleHandModel(n, 16777215, 0.5);
    }), s;
  }
  styleHandModel(e, t, i) {
    e.traverse((s) => {
      s.isMesh && (s.material = new f.MeshStandardMaterial({
        color: t,
        roughness: 0.8,
        metalness: 0.2,
        transparent: !0,
        opacity: i
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
    const o = performance.now(), r = this.hand1.userData.pinch && o - this.pinchIntent.hand1Start >= this.pinchIntent.delay, l = this.hand2.userData.pinch && o - this.pinchIntent.hand2Start >= this.pinchIntent.delay;
    if (r && !this.hand2.userData.pinch || l && !this.hand1.userData.pinch) {
      const h = (r ? this.hand1 : this.hand2).joints["index-finger-tip"];
      if (!this.dragging)
        (this.scaling || this.rotating) && (this.rotVelocity = 0, this.scaleVelocity = 0), this.dragging = !0, this.scaling = !1, this.rotating = !1, h.getWorldPosition(this.dragStartPos), this.onGestureStart && this.onGestureStart("drag");
      else {
        h.getWorldPosition(this.tempVec1);
        const A = this.tempVec1.clone().sub(this.dragStartPos);
        if (A.length() > this.MAX_DELTA_PER_FRAME && A.normalize().multiplyScalar(this.MAX_DELTA_PER_FRAME), i) {
          const d = i.position.distanceTo(t.position);
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
    } else if (r && l)
      if (s.getWorldPosition(this.tempVec1), n.getWorldPosition(this.tempVec2), !this.scaling && !this.rotating) {
        this.dragging = !1, this.scaling = !0, this.rotating = !0, this.scaleStartDistance = this.tempVec1.distanceTo(this.tempVec2);
        const c = this.tempVec2.x - this.tempVec1.x, h = this.tempVec2.z - this.tempVec1.z;
        this.rotateStartAngle = Math.atan2(h, c), this.onGestureStart && this.onGestureStart("two-hand");
      } else {
        const c = this.tempVec1.distanceTo(this.tempVec2), h = c / this.scaleStartDistance, A = Math.log(t.scale.x), d = Math.log(h), u = A + d, p = Math.max(this.MIN_SCALE, Math.min(this.MAX_SCALE, Math.exp(u)));
        if (t.scale.setScalar(p), e > 0) {
          const E = d / e, m = Math.max(-this.MAX_SCALE_VELOCITY, Math.min(this.MAX_SCALE_VELOCITY, E));
          this.scaleVelocity = this.scaleVelocity * (1 - this.VELOCITY_SMOOTHING) + m * this.VELOCITY_SMOOTHING;
        }
        this.scaleStartDistance = c;
        const g = this.tempVec2.x - this.tempVec1.x, b = this.tempVec2.z - this.tempVec1.z, y = Math.atan2(b, g);
        let C = y - this.rotateStartAngle;
        if (C > Math.PI && (C -= 2 * Math.PI), C < -Math.PI && (C += 2 * Math.PI), t.rotation.y -= C, e > 0) {
          const E = -C / e, m = Math.max(-this.MAX_ROT_VELOCITY, Math.min(this.MAX_ROT_VELOCITY, E));
          this.rotVelocity = this.rotVelocity * (1 - this.VELOCITY_SMOOTHING) + m * this.VELOCITY_SMOOTHING;
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
    const i = Math.exp(-this.POSITION_DAMPING * e), s = Math.exp(-this.ROTATION_DAMPING * e), n = Math.exp(-this.SCALE_DAMPING * e);
    this.posVelocity.multiplyScalar(i), this.rotVelocity *= s, this.scaleVelocity *= n, t.position.addScaledVector(this.posVelocity, e), t.rotation.y += this.rotVelocity * e;
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
class bh extends wt {
  constructor(e, t, i, s = {}, n = null) {
    super(), this.renderer = e, this.camera = t, this.scene = i, this.config = {
      enableHandTracking: !0,
      enableWorldCube: !0,
      defaultScale: 0.05,
      worldCubeSize: 1e3,
      worldCubeOpacity: 0.1,
      ...s
    }, this.container = n, this.arCore = new dh(e, t, i, n), this.handTracking = this.config.enableHandTracking ? new mh(e) : null, this.modelGroup = new f.Group(), this.modelGroup.name = "AR Model Group", this.scene.add(this.modelGroup), this.currentModel = null, this.pendingModel = null, this.pendingModelConfig = null, this.currentModelScale = this.config.defaultScale, this.worldCube = null, this.config.enableWorldCube && this.createWorldCube(), this.isARPresenting = !1, this.previousGestureType = null, this.init();
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
      const i = t?.defaultScale || e.userData?.defaultScale || this.config.defaultScale;
      this.currentModelScale = i, this.isARPresenting && this.activateModel();
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
    const e = this.config.worldCubeSize, t = new f.BoxGeometry(e, e, e), i = new f.MeshBasicMaterial({
      color: 0,
      transparent: !0,
      opacity: this.config.worldCubeOpacity,
      side: f.BackSide,
      depthWrite: !1
    });
    this.worldCube = new f.Mesh(t, i), this.worldCube.name = "AR World Cube", this.worldCube.visible = !1, this.scene.add(this.worldCube);
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
class Fn {
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
    }, window.vertices = () => {
      if (!e.sceneManager?.scene)
        return console.warn("Scene not initialized"), null;
      const t = e.sceneManager.scene;
      let i = 0, s = 0, n = 0, o = 0;
      t.traverse((l) => {
        const c = l.geometry?.getAttribute?.("position");
        if (!c) return;
        i += 1;
        const h = l.isInstancedMesh ? c.count * l.count : c.count;
        n += h, l.visible && (s += 1, o += h);
      });
      const r = {
        meshes: i,
        visibleMeshes: s,
        vertices: n,
        visibleVertices: o
      };
      return console.log("🔢 Scene vertex counts:"), console.table(r), r;
    }, window.models = () => {
      const t = e.getLoadedModels();
      if (t.length === 0)
        return console.log("📦 No models loaded"), [];
      const i = t.map((s, n) => {
        const o = s.model, r = o.userData.boundingBox;
        return {
          index: n,
          url: s.url,
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
    }, window.stereo = (t, i) => {
      if (t === void 0) {
        const s = {
          enabled: e.stereoEnabled || !1,
          mode: e.stereoMode || "sbs",
          eyeSeparation: e.stereoEyeSeparation || 0.064
        };
        return console.log("👓 Stereo information:"), console.table(s), console.log(""), console.log("Usage:"), console.log("  stereo(true)           - Enable stereo mode"), console.log("  stereo(false)          - Disable stereo mode"), console.log("  stereo(true, 0.065)    - Enable with custom eye separation"), s;
      }
      return e.setStereoEnabled(t), i !== void 0 && e.setStereoEyeSeparation(i), console.log(`👓 Stereo ${t ? "enabled" : "disabled"}`), i !== void 0 && console.log(`👓 Eye separation: ${i}m`), { enabled: t, eyeSeparation: e.stereoEyeSeparation };
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
class Ch extends wt {
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
    this.config = new di(i).validate(t), this.renderer = null, this.sceneManager = null, this.cameraManager = null, this.modelLoader = null, this.tilesetLoader = null, this.vrManager = null, this.arManager = null, this.stereoCamera = null, this.isVREnabled = this.config.vr?.enabled !== !1, this.isAREnabled = this.config.ar?.enabled === !0, this.stereoEnabled = this.config.stereo?.enabled === !0, this.stereoMode = this.config.stereo?.mode || "sbs";
    const s = this.config.stereo?.eyeSeparation ?? 0.064;
    this.stereoEyeSeparation = Math.max(0.05, Math.min(0.07, s)), this.stereoEyeSeparation !== s && console.warn(`[BelowJS] Initial eye separation ${s}m clamped to ${this.stereoEyeSeparation}m (comfortable range for screens: 0.050-0.070m)`), this.dolly = null, this.isInitialized = !1, this.loadedModels = [], this.currentAbortController = null, this.skipRenderDuringLoad = !1, this.pixelRatioBeforeThrottle = 1, this.originalPixelRatio = 1, this.isConstrainedSafari = !1, this.init();
  }
  init() {
    try {
      this.initRenderer(), this.sceneManager = new oa(this.config.scene), this.cameraManager = new ya(this.config.camera), this.modelLoader = new Z(this.renderer), this.tilesetLoader = new jc(this.renderer, this.cameraManager.camera), this.isConstrainedSafari = this.modelLoader?.isIOSWebKit || !1, this.initStereo(), this.renderer?.getPixelRatio ? this.originalPixelRatio = this.renderer.getPixelRatio() : typeof window < "u" && (this.originalPixelRatio = window.devicePixelRatio || 1), this.pixelRatioBeforeThrottle = this.originalPixelRatio, this.isVREnabled && this.initVR(), this.isAREnabled && this.initAR(), this.cameraManager.initControls(this.renderer.domElement), this.setupEventListeners(), this.startRenderLoop(), this.isInitialized = !0, typeof window < "u" && Fn.init(this), this.emit("initialized");
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
    this.vrManager = new hh(this.renderer, this.cameraManager.camera, this.sceneManager.scene, e, t, this.container), this.vrManager.setControls(this.cameraManager.controls), this.config.initialPositions && this.vrManager.setInitialPositions(this.config.initialPositions), this.vrManager.onModeToggle = () => {
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
      this.cameraManager.controls && (this.cameraManager.controls.enabled = !0), this.dolly.position.set(0, 0, 0), this.dolly.rotation.set(0, 0, 0), this.emit("vr-session-end");
    };
  }
  initAR() {
    const e = this.config.ar?.settings || {};
    this.arManager = new bh(
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
    }), this.on("model-loaded", ({ model: t, options: i }) => {
      this.arManager && this.arManager.setTargetModel(t, i);
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
    const i = this.currentAbortController.signal, s = this.isConstrainedSafari;
    try {
      this.emit("model-load-start", { url: e }), s && this.applyLoadRenderingConstraints(!0);
      const n = (h) => {
        i.aborted || this.emit("model-load-progress", { url: e, progress: h });
      }, o = (h) => {
        i.aborted || this.emit("model-load-stage", { url: e, stage: h });
      };
      let r, l = null;
      if (t.type === "tileset") {
        o && o("downloading");
        const h = await this.tilesetLoader.load(e, {
          signal: i,
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
        r = h.group, l = h.tileset, o && o("processing");
      } else
        r = await this.modelLoader.load(e, n, i, o);
      if (i.aborted)
        return null;
      t.position && r.position.fromArray(t.position), t.rotation && r.rotation.fromArray(t.rotation), t.scale && (typeof t.scale == "number" ? r.scale.setScalar(t.scale) : r.scale.fromArray(t.scale));
      const c = this.centerModelAndRecalculateBounds(r);
      return this.sceneManager.add(r), this.loadedModels.push({ model: r, url: e, options: t, originalCenter: c, tileset: l }), this.loadedModels.length === 1 && t.autoFrame !== !1 && this.frameModel(r), this.currentAbortController && this.currentAbortController.signal === i && (this.currentAbortController = null), o && o("completed"), this.emit("model-loaded", { model: r, url: e }), r;
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
    const i = t.getSize(new f.Vector3()), s = t.getCenter(new f.Vector3());
    this.cameraManager.frameObject(s, i);
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
    const i = t.getCenter(new f.Vector3());
    e.position.sub(i);
    const s = new f.Box3().setFromObject(e);
    return this.isValidBox3(s) ? e.userData.boundingBox = s : e.userData.boundingBox = t.clone().translate(i.clone().multiplyScalar(-1)), i;
  }
  startRenderLoop() {
    let e = 0, t = 0;
    const i = (s) => {
      const n = Math.min((s - e) / 1e3, 0.1);
      e = s, this.vrManager && this.vrManager.update(n), this.arManager && this.arManager.update(n * 1e3), this.cameraManager && this.cameraManager.update(), this.emit("before-render", n);
      const o = this.renderer?.xr?.isPresenting;
      if (this.renderer && this.sceneManager && this.cameraManager) {
        const r = () => {
          (!this.skipRenderDuringLoad || o) && (this.stereoEnabled && !o && this.stereoMode === "sbs" ? this.renderSbsStereo() : this.renderer.render(this.sceneManager.scene, this.cameraManager.camera));
        };
        if (o) {
          if (r(), this.tilesetLoader) {
            const c = this.vrManager?.getVRStatus?.().movement?.isMoving === !0, h = typeof performance < "u" && typeof performance.now == "function" ? performance.now() : s, A = c ? 28 : 14;
            if (h - t >= A) {
              const u = this.renderer.xr.getCamera(this.cameraManager.camera);
              this.tilesetLoader.update(u, {
                queueOptions: {
                  maxTasks: c ? 1 : 2,
                  timeBudgetMs: c ? 0.7 : 1.5
                }
              }), t = h;
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
    this.renderer.setAnimationLoop(i);
  }
  renderSbsStereo() {
    if (!this.stereoCamera || !this.renderer || !this.sceneManager || !this.cameraManager)
      return;
    const e = this.renderer.getSize(new f.Vector2()), t = e.width, i = e.height, s = Math.floor(t / 2), n = t - s;
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
      this.sceneManager.remove(e), s && this.tilesetLoader && this.tilesetLoader.disposeTileset(s), Qi(e), this.loadedModels.splice(t, 1), this.emit("model-removed", { model: e }), !this.loadedModels.some((o) => o.url === i) && this.modelLoader && this.modelLoader.releaseFromCache(i);
    }
  }
  clearModels() {
    this.arManager && this.arManager.setTargetModel(null);
    const e = new Set(this.loadedModels.map(({ url: t }) => t));
    this.loadedModels.forEach(({ model: t, tileset: i }) => {
      i && this.tilesetLoader && this.tilesetLoader.disposeTileset(i), Qi(t), this.sceneManager.remove(t);
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
    this.currentAbortController && this.currentAbortController.abort(), typeof window < "u" && Fn.cleanup(), this.vrManager && (this.vrManager.dispose(), this.vrManager = null), this.arManager && (this.arManager.dispose(), this.arManager = null), this.renderer && this.renderer.setAnimationLoop(null), this.loadedModels.forEach(({ model: e, tileset: t }) => {
      e.parent && e.parent.remove(e), t && this.tilesetLoader && this.tilesetLoader.disposeTileset(t), Qi(e);
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
const _n = new nt(), zt = new v();
class lr extends ia {
  /**
   * Constructs a new line segments geometry.
   */
  constructor() {
    super(), this.isLineSegmentsGeometry = !0, this.type = "LineSegmentsGeometry";
    const e = [-1, 2, 0, 1, 2, 0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0, 0, -1, -1, 0, 1, -1, 0], t = [-1, 2, 1, 2, -1, 1, 1, 1, -1, -1, 1, -1, -1, -2, 1, -2], i = [0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5];
    this.setIndex(i), this.setAttribute("position", new Xt(e, 3)), this.setAttribute("uv", new Xt(t, 2));
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
    const i = new is(t, 6, 1);
    return this.setAttribute("instanceStart", new ke(i, 3, 0)), this.setAttribute("instanceEnd", new ke(i, 3, 3)), this.instanceCount = this.attributes.instanceStart.count, this.computeBoundingBox(), this.computeBoundingSphere(), this;
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
    const i = new is(t, 6, 1);
    return this.setAttribute("instanceColorStart", new ke(i, 3, 0)), this.setAttribute("instanceColorEnd", new ke(i, 3, 3)), this;
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
    return this.fromWireframeGeometry(new sa(e.geometry)), this;
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
    this.boundingBox === null && (this.boundingBox = new nt());
    const e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
    e !== void 0 && t !== void 0 && (this.boundingBox.setFromBufferAttribute(e), _n.setFromBufferAttribute(t), this.boundingBox.union(_n));
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new It()), this.boundingBox === null && this.computeBoundingBox();
    const e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
    if (e !== void 0 && t !== void 0) {
      const i = this.boundingSphere.center;
      this.boundingBox.getCenter(i);
      let s = 0;
      for (let n = 0, o = e.count; n < o; n++)
        zt.fromBufferAttribute(e, n), s = Math.max(s, i.distanceToSquared(zt)), zt.fromBufferAttribute(t, n), s = Math.max(s, i.distanceToSquared(zt));
      this.boundingSphere.radius = Math.sqrt(s), isNaN(this.boundingSphere.radius) && console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.", this);
    }
  }
  toJSON() {
  }
}
Wt.line = {
  worldUnits: { value: 1 },
  linewidth: { value: 1 },
  resolution: { value: new F(1, 1) },
  dashOffset: { value: 0 },
  dashScale: { value: 1 },
  dashSize: { value: 1 },
  gapSize: { value: 1 }
  // todo FIX - maybe change to totalSize
};
Jt.line = {
  uniforms: oo.merge([
    Wt.common,
    Wt.fog,
    Wt.line
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
class ni extends so {
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
      uniforms: oo.clone(Jt.line.uniforms),
      vertexShader: Jt.line.vertexShader,
      fragmentShader: Jt.line.fragmentShader,
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
const qi = new ot(), Pn = new v(), Nn = new v(), V = new ot(), O = new ot(), he = new ot(), zi = new v(), ji = new P(), H = new na(), Gn = new v(), jt = new nt(), Kt = new It(), Ae = new ot();
let de, Pe;
function Un(a, e, t) {
  return Ae.set(0, 0, -e, 1).applyMatrix4(a.projectionMatrix), Ae.multiplyScalar(1 / Ae.w), Ae.x = Pe / t.width, Ae.y = Pe / t.height, Ae.applyMatrix4(a.projectionMatrixInverse), Ae.multiplyScalar(1 / Ae.w), Math.abs(Math.max(Ae.x, Ae.y));
}
function yh(a, e) {
  const t = a.matrixWorld, i = a.geometry, s = i.attributes.instanceStart, n = i.attributes.instanceEnd, o = Math.min(i.instanceCount, s.count);
  for (let r = 0, l = o; r < l; r++) {
    H.start.fromBufferAttribute(s, r), H.end.fromBufferAttribute(n, r), H.applyMatrix4(t);
    const c = new v(), h = new v();
    de.distanceSqToSegment(H.start, H.end, h, c), h.distanceTo(c) < Pe * 0.5 && e.push({
      point: h,
      pointOnLine: c,
      distance: de.origin.distanceTo(h),
      object: a,
      face: null,
      faceIndex: r,
      uv: null,
      uv1: null
    });
  }
}
function Eh(a, e, t) {
  const i = e.projectionMatrix, n = a.material.resolution, o = a.matrixWorld, r = a.geometry, l = r.attributes.instanceStart, c = r.attributes.instanceEnd, h = Math.min(r.instanceCount, l.count), A = -e.near;
  de.at(1, he), he.w = 1, he.applyMatrix4(e.matrixWorldInverse), he.applyMatrix4(i), he.multiplyScalar(1 / he.w), he.x *= n.x / 2, he.y *= n.y / 2, he.z = 0, zi.copy(he), ji.multiplyMatrices(e.matrixWorldInverse, o);
  for (let d = 0, u = h; d < u; d++) {
    if (V.fromBufferAttribute(l, d), O.fromBufferAttribute(c, d), V.w = 1, O.w = 1, V.applyMatrix4(ji), O.applyMatrix4(ji), V.z > A && O.z > A)
      continue;
    if (V.z > A) {
      const E = V.z - O.z, m = (V.z - A) / E;
      V.lerp(O, m);
    } else if (O.z > A) {
      const E = O.z - V.z, m = (O.z - A) / E;
      O.lerp(V, m);
    }
    V.applyMatrix4(i), O.applyMatrix4(i), V.multiplyScalar(1 / V.w), O.multiplyScalar(1 / O.w), V.x *= n.x / 2, V.y *= n.y / 2, O.x *= n.x / 2, O.y *= n.y / 2, H.start.copy(V), H.start.z = 0, H.end.copy(O), H.end.z = 0;
    const g = H.closestPointToPointParameter(zi, !0);
    H.at(g, Gn);
    const b = st.lerp(V.z, O.z, g), y = b >= -1 && b <= 1, C = zi.distanceTo(Gn) < Pe * 0.5;
    if (y && C) {
      H.start.fromBufferAttribute(l, d), H.end.fromBufferAttribute(c, d), H.start.applyMatrix4(o), H.end.applyMatrix4(o);
      const E = new v(), m = new v();
      de.distanceSqToSegment(H.start, H.end, m, E), t.push({
        point: m,
        pointOnLine: E,
        distance: de.origin.distanceTo(m),
        object: a,
        face: null,
        faceIndex: d,
        uv: null,
        uv1: null
      });
    }
  }
}
class Ih extends hi {
  /**
   * Constructs a new wide line.
   *
   * @param {LineSegmentsGeometry} [geometry] - The line geometry.
   * @param {LineMaterial} [material] - The line material.
   */
  constructor(e = new lr(), t = new ni({ color: Math.random() * 16777215 })) {
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
    for (let o = 0, r = 0, l = t.count; o < l; o++, r += 2)
      Pn.fromBufferAttribute(t, o), Nn.fromBufferAttribute(i, o), s[r] = r === 0 ? 0 : s[r - 1], s[r + 1] = s[r] + Pn.distanceTo(Nn);
    const n = new is(s, 2, 1);
    return e.setAttribute("instanceDistanceStart", new ke(n, 1, 0)), e.setAttribute("instanceDistanceEnd", new ke(n, 1, 1)), this;
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
    de = e.ray;
    const o = this.matrixWorld, r = this.geometry, l = this.material;
    Pe = l.linewidth + n, r.boundingSphere === null && r.computeBoundingSphere(), Kt.copy(r.boundingSphere).applyMatrix4(o);
    let c;
    if (i)
      c = Pe * 0.5;
    else {
      const A = Math.max(s.near, Kt.distanceToPoint(de.origin));
      c = Un(s, A, l.resolution);
    }
    if (Kt.radius += c, de.intersectsSphere(Kt) === !1)
      return;
    r.boundingBox === null && r.computeBoundingBox(), jt.copy(r.boundingBox).applyMatrix4(o);
    let h;
    if (i)
      h = Pe * 0.5;
    else {
      const A = Math.max(s.near, jt.distanceToPoint(de.origin));
      h = Un(s, A, l.resolution);
    }
    jt.expandByScalar(h), de.intersectsBox(jt) !== !1 && (i ? yh(this, t) : Eh(this, s, t));
  }
  onBeforeRender(e) {
    const t = this.material.uniforms;
    t && t.resolution && (e.getViewport(qi), this.material.uniforms.resolution.value.set(qi.z, qi.w));
  }
}
class hs extends lr {
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
class Vn extends Ih {
  /**
   * Constructs a new wide line.
   *
   * @param {LineGeometry} [geometry] - The line geometry.
   * @param {LineMaterial} [material] - The line material.
   */
  constructor(e = new hs(), t = new ni({ color: Math.random() * 16777215 })) {
    super(e, t), this.isLine2 = !0, this.type = "Line2";
  }
}
class wh {
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
  constructor({ scene: e, camera: t, renderer: i, controls: s, dolly: n, uiParent: o, getRaycastInfo: r, config: l = {}, theme: c = "dark", showMeasurementLabels: h = !1 }) {
    this.ghostSpheres = {
      left: null,
      right: null
    }, this.MAX_SPHERES = 2, this.measurementSpheres = [], this.measurementLine = null, this.measurementLabel = null, this.previousTriggerState = {}, this.unifiedMeasurementPoints = [], this.unifiedMeasurementLine = null, this.desktopMeasurementPoints = [], this.desktopMeasurementLine = null, typeof window < "u" && (window.measurementSystem = this), this.scene = e, this.camera = t, this.renderer = i, this.uiParent = o || null, this.getRaycastInfo = typeof r == "function" ? r : null, this.controls = s, this.dolly = n, this.config = l, this.theme = c, this.showMeasurementLabels = h, this._raycastTargets = e && e.children ? e.children : [], this.enabled = !0, this.isVR = !1, this.measurementPanel = null, this.desktopMeasurementMode = !1, this.measurementSystemEnabled = !0, this.measurementAvailable = !0, this.desktopMeasurementPoints = [], this.connectionLine = null, this.desktopMeasurementLine = null, this.measurementSprite = null, this.measurementCanvas = null, this.measurementTexture = null, this.lastClickTime = 0, this.lastTriggerTime = 0, this._wasInVR = !1, this.focusAnimation = null, this._cancelFocusOnUserInput = null, this.mouse = new f.Vector2(), this.raycaster = new f.Raycaster();
    const A = () => {
      let d = null, u = null;
      const p = null, g = null;
      if (e && e.children && e.children.forEach((b) => {
        b && b.inputSource && b.inputSource.handedness && (b.inputSource.handedness === "left" && (d = b), b.inputSource.handedness === "right" && (u = b));
      }), (!d || !u) && i && i.xr && i.xr.getController)
        try {
          d = d || i.xr.getController(0), u = u || i.xr.getController(1);
        } catch {
        }
      d && u ? (this.attachVR({ controller1: d, controller2: u, controllerGrip1: p, controllerGrip2: g }), this.ghostSpheres && this.ghostSpheres.left && this.ghostSpheres.right && (this.ghostSpheres.left.visible = !0, this.ghostSpheres.right.visible = !0)) : (this._ghostSphereAttachRetries || (this._ghostSphereAttachRetries = 0), this._ghostSphereAttachRetries < 40 ? (this._ghostSphereAttachRetries++, setTimeout(A, 250)) : typeof window < "u" && window.console && console.warn("[MeasurementSystem] Could not find VR controllers to attach ghost spheres after multiple attempts."));
    };
    if (A(), i && i.xr && i.xr.addEventListener && i.xr.addEventListener("sessionstart", A), this.sphereGeometry = new f.SphereGeometry(0.02, 8, 6), this.placedMaterial = new f.MeshBasicMaterial({ color: 16777215 }), this.vrLineMaterial = new ni({
      color: 16777215,
      linewidth: 3,
      transparent: !0,
      opacity: 0.8,
      depthTest: !1,
      vertexColors: !1,
      dashed: !1
    }), this.desktopLineMaterial = new ni({
      color: 16777215,
      linewidth: 3,
      transparent: !0,
      opacity: 1,
      depthTest: !1,
      vertexColors: !1,
      dashed: !1
    }), this.MAX_DESKTOP_POINTS = 2, this.DRAG_THRESHOLD = 5, this.isDragging = !1, this.dragStartPosition = { x: 0, y: 0 }, this.createMeasurementPanel(), this.updateMeasurementPanel(), this._boundOnMouseClick = this.onMouseClick.bind(this), this._boundOnMouseDown = this.onMouseDown.bind(this), this._boundOnMouseMove = this.onMouseMove.bind(this), this._boundOnMouseUp = this.onMouseUp.bind(this), this.renderer.domElement.addEventListener("click", this._boundOnMouseClick, !1), this.renderer.domElement.addEventListener("mousedown", this._boundOnMouseDown, !1), this.renderer.domElement.addEventListener("mousemove", this._boundOnMouseMove, !1), this.renderer.domElement.addEventListener("mouseup", this._boundOnMouseUp, !1), i && i.xr && typeof i.xr.getController == "function") {
      const d = () => {
        if (i.xr.isPresenting) {
          const u = i.xr.getController(0), p = i.xr.getController(1), g = i.xr.getControllerGrip ? i.xr.getControllerGrip(0) : void 0, b = i.xr.getControllerGrip ? i.xr.getControllerGrip(1) : void 0;
          this.attachVR({ controller1: u, controller2: p, controllerGrip1: g, controllerGrip2: b });
        }
      };
      if (i.xr.addEventListener && i.xr.addEventListener("sessionstart", d), i.xr.isPresenting && d(), i.xr && typeof i.xr.requestSession == "function" && !i.xr._measurementSystemPatched) {
        const u = i.xr.requestSession.bind(i.xr);
        i.xr.requestSession = async (...p) => {
          const g = await u(...p);
          return setTimeout(() => {
            d();
          }, 100), g;
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
        let i = t;
        if (this._raycastTargets && this._raycastTargets.length > 0 && this.camera) {
          const n = t.clone().sub(this.camera.position).normalize(), o = new f.Raycaster(this.camera.position, n), r = this.getValidIntersections(o);
          r.length > 0 && (i = r[0].point);
        }
        const s = new f.Mesh(this.sphereGeometry, this.placedMaterial);
        s.position.copy(i), this.scene.add(s), this.desktopMeasurementPoints.push(s);
      }
      if (this.desktopMeasurementPoints.length === 2) {
        const e = new hs();
        e.setPositions([
          this.desktopMeasurementPoints[0].position.x,
          this.desktopMeasurementPoints[0].position.y,
          this.desktopMeasurementPoints[0].position.z,
          this.desktopMeasurementPoints[1].position.x,
          this.desktopMeasurementPoints[1].position.y,
          this.desktopMeasurementPoints[1].position.z
        ]), this.desktopMeasurementLine = new Vn(e, this.desktopLineMaterial), this.desktopMeasurementLine.computeLineDistances(), this.scene.add(this.desktopMeasurementLine);
        const t = this.desktopMeasurementPoints[0].position.distanceTo(this.desktopMeasurementPoints[1].position);
        if (this.createMeasurementDisplay(t), this.measurementSprite) {
          const i = new f.Vector3();
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
    const t = (window.devicePixelRatio || 1) * 4, i = 256, s = 64, n = i * t, o = s * t;
    this.measurementCanvas || (this.measurementCanvas = document.createElement("canvas")), (this.measurementCanvas.width !== n || this.measurementCanvas.height !== o) && (this.measurementCanvas.width = n, this.measurementCanvas.height = o);
    const r = this.measurementCanvas.getContext("2d");
    r.setTransform(1, 0, 0, 1, 0, 0), r.clearRect(0, 0, n, o), r.save(), r.scale(t, t);
    const l = 24;
    let c;
    e <= 2 ? c = 0.4 + e / 2 * 0.3 : e <= 4 ? c = 0.7 + (e - 2) / 2 * 0.2 : c = 0.9 + Math.min((e - 4) / 16, 1) * 0.5;
    const h = Math.round(l * c);
    r.font = `600 ${h}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`;
    const A = this.formatDistance(e), u = r.measureText(A).width, p = h, g = Math.max(6, h * 0.3), b = u + g * 2, y = p + g * 2, C = (i - b) / 2, E = (s - y) / 2;
    if (r.fillStyle = "rgba(0, 0, 0, 0.8)", r.beginPath(), r.roundRect(C, E, b, y, Math.max(4, h * 0.2)), r.fill(), r.fillStyle = "white", r.textAlign = "center", r.textBaseline = "middle", r.fillText(A, i / 2, s / 2), r.restore(), this.measurementTexture ? this.measurementTexture.needsUpdate = !0 : (this.measurementTexture = new f.CanvasTexture(this.measurementCanvas), this.measurementTexture.minFilter = f.LinearFilter, this.measurementTexture.magFilter = f.LinearFilter), !this.measurementSprite) {
      const w = new f.SpriteMaterial({
        map: this.measurementTexture,
        depthTest: !1,
        depthWrite: !1
      });
      this.measurementSprite = new f.Sprite(w);
    }
    const I = 0.3 * c, B = i / s;
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
  attachVR({ controller1: e, controller2: t, controllerGrip1: i, controllerGrip2: s }) {
    this.controller1 = e, this.controller2 = t, this.controllerGrip1 = i, this.controllerGrip2 = s;
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
    const t = e.target, i = performance.now();
    if (!(this.lastTriggerTime && i - this.lastTriggerTime < 200) && (this.lastTriggerTime = i, this.measurementSystemEnabled)) {
      const s = new f.Vector3();
      let n = null;
      if (t === this.controller1 && this.ghostSpheres.left ? n = this.ghostSpheres.left : t === this.controller2 && this.ghostSpheres.right && (n = this.ghostSpheres.right), n)
        n.getWorldPosition(s);
      else {
        t.getWorldPosition(s);
        const o = new f.Vector3(0, 0, -0.05);
        o.applyQuaternion(t.quaternion), s.add(o);
      }
      this._placeVRMeasurementPoint(s);
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
    const i = new f.Vector3(), s = new f.Vector3(0, 0, -1).applyMatrix4(t);
    e.getWorldPosition(i);
    const n = new f.Raycaster(i, s.normalize()), o = this.scene && this.scene.children ? this.scene.children : [], r = this.getValidIntersections(n, o);
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
      const s = this.unifiedMeasurementPoints.shift();
      s.sphere && this.scene.remove(s.sphere);
    }
    const i = new f.Mesh(this.sphereGeometry, this.placedMaterial);
    i.position.copy(e), i.scale.setScalar(0.5), i.userData.isMeasurementSphere = !0, this.scene.add(i), this.unifiedMeasurementPoints.push({
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
      const e = this.unifiedMeasurementPoints[0].position, t = this.unifiedMeasurementPoints[1].position, i = new hs();
      i.setPositions([
        e.x,
        e.y,
        e.z,
        t.x,
        t.y,
        t.z
      ]), this.unifiedMeasurementLine = new Vn(i, this.desktopLineMaterial), this.unifiedMeasurementLine.computeLineDistances(), this.unifiedMeasurementLine.userData.isMeasurementLine = !0, this.scene.add(this.unifiedMeasurementLine);
      const s = e.distanceTo(t);
      this.createMeasurementDisplay(s);
      const n = s * 100 <= 20 ? 0.125 : 0.5;
      if (this.unifiedMeasurementPoints.forEach((o) => {
        o.sphere && o.sphere.scale.setScalar(n);
      }), this.measurementSprite) {
        const o = new f.Vector3();
        o.addVectors(e, t), o.multiplyScalar(0.5);
        const r = Math.max(0.05, Math.min(0.2, s * 0.03));
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
    const t = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting, i = this.unifiedMeasurementPoints ? this.unifiedMeasurementPoints.length : 0, s = i === 2, n = t ? this.measurementSystemEnabled : this.desktopMeasurementMode;
    let o;
    if (s && (o = this.unifiedMeasurementPoints[0].position.distanceTo(this.unifiedMeasurementPoints[1].position)), e.classList.remove("disabled", "active", "measured", "unavailable"), e.style.opacity = "", e.style.cursor = "pointer", e.setAttribute("aria-disabled", "false"), e.removeAttribute("title"), !this.measurementAvailable) {
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
    else if (s)
      e.classList.add("measured"), e.innerHTML = `
        <div>${this.formatDistance(o)}</div>
        <div style="font-size: 12px; margin-top: 4px;">Click to disable</div>
      `;
    else {
      e.classList.add("active");
      const r = t ? "Use triggers" : "Click points";
      e.innerHTML = `
        <div>MEASURE: ON</div>
        <div style="font-size: 12px; margin-top: 4px;">${r} (${i}/2)</div>
      `;
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
    if (e.defaultPrevented || !this.measurementAvailable)
      return;
    const t = Date.now(), i = t - this.lastClickTime < 300;
    if (this.lastClickTime = t, this.isDragging || !this.desktopMeasurementMode)
      return;
    this.desktopMeasurementMode && (e.stopPropagation(), e.preventDefault());
    let s = this.camera, n = !1;
    if (this.getRaycastInfo) {
      const r = this.getRaycastInfo(e);
      r && r.mouse && Number.isFinite(r.mouse.x) && Number.isFinite(r.mouse.y) && (r.mouse.isVector2 ? this.mouse.copy(r.mouse) : (this.mouse.x = r.mouse.x, this.mouse.y = r.mouse.y), r.camera && (s = r.camera), n = !0);
    }
    if (!n) {
      const r = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = (e.clientX - r.left) / r.width * 2 - 1, this.mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    }
    if (this.renderer && this.renderer.xr && this.renderer.xr.isPresenting) {
      const r = this.renderer.xr.getCamera();
      r && (s = r);
    }
    if ((!s || !s.isPerspectiveCamera && !s.isOrthographicCamera) && this.scene && this.scene.children) {
      for (const r of this.scene.children)
        if (r.isCamera) {
          s = r;
          break;
        }
    }
    if ((!s || !s.isPerspectiveCamera && !s.isOrthographicCamera) && typeof window < "u" && window.camera && (window.camera.isPerspectiveCamera || window.camera.isOrthographicCamera) && (s = window.camera), !s || !s.isPerspectiveCamera && !s.isOrthographicCamera && s.type !== "ArrayCamera")
      return;
    this.raycaster.setFromCamera(this.mouse, s);
    const o = this.getValidIntersections(this.raycaster);
    if (o.length > 0)
      if (i)
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
    const t = this.controls.target.clone(), i = this.camera.position.clone(), s = i.clone().sub(t), n = e.clone().add(s), o = 1e3, r = performance.now(), l = () => {
      this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null), this._cancelFocusOnUserInput && (this.controls.removeEventListener("start", this._cancelFocusOnUserInput), this._cancelFocusOnUserInput = null);
    };
    this._cancelFocusOnUserInput = l, this.controls.addEventListener("start", l, { once: !0 });
    const c = () => {
      const h = performance.now() - r, A = Math.min(h / o, 1), d = 1 - Math.pow(1 - A, 3);
      this.controls.target.lerpVectors(t, e, d), this.camera.position.lerpVectors(i, n, d), A < 1 ? this.focusAnimation = requestAnimationFrame(c) : (this.focusAnimation = null, this._cancelFocusOnUserInput && (this.controls.removeEventListener("start", this._cancelFocusOnUserInput), this._cancelFocusOnUserInput = null));
    };
    this.focusAnimation = requestAnimationFrame(c);
  }
  _focusOnPoint(e) {
    if (this.focusAnimation && (cancelAnimationFrame(this.focusAnimation), this.focusAnimation = null), !this.controls || !this.camera) {
      console.warn("[MeasurementSystem] No controls or camera available for focusing");
      return;
    }
    const t = this.controls.target.clone(), i = this.camera.position.clone(), s = i.clone().sub(t), n = e.clone().add(s), o = 1e3, r = performance.now(), l = () => {
      const c = performance.now() - r, h = Math.min(c / o, 1), A = 1 - Math.pow(1 - h, 3);
      this.controls.target.lerpVectors(t, e, A), this.camera.position.lerpVectors(i, n, A), this.controls.update(), h < 1 ? this.focusAnimation = requestAnimationFrame(l) : this.focusAnimation = null;
    };
    this.focusAnimation = requestAnimationFrame(l);
  }
  /**
   * Refresh measurement display when entering VR
   * Called when VR mode is activated to ensure sprite is visible
   */
  refreshMeasurementDisplayForVR() {
    if (this.unifiedMeasurementPoints && this.unifiedMeasurementPoints.length === 2) {
      const e = this.unifiedMeasurementPoints[0].position, t = this.unifiedMeasurementPoints[1].position, i = e.distanceTo(t);
      if (this.createMeasurementDisplay(i), this.measurementSprite) {
        const s = new f.Vector3();
        s.addVectors(e, t), s.multiplyScalar(0.5);
        const n = Math.max(0.05, Math.min(0.2, i * 0.03));
        s.y += n, this.measurementSprite.position.copy(s), this.scene.children.includes(this.measurementSprite) || this.scene.add(this.measurementSprite);
        const o = this.renderer && this.renderer.xr && this.renderer.xr.isPresenting;
        this.measurementSprite.visible = o || this.showMeasurementLabels;
      }
    }
  }
}
const Bh = 1, gt = "text";
function Ze(a, e = 4) {
  if (!Number.isFinite(a)) return 0;
  const t = Math.pow(10, e);
  return Math.round(a * t) / t;
}
function Ki(a) {
  return {
    x: Ze(a.x),
    y: Ze(a.y),
    z: Ze(a.z)
  };
}
function On(a) {
  if (!a) return null;
  if (a.isVector3) return a.clone();
  const e = Number(a.x), t = Number(a.y), i = Number(a.z);
  return !Number.isFinite(e) || !Number.isFinite(t) || !Number.isFinite(i) ? null : new f.Vector3(e, t, i);
}
function Yi(a) {
  const e = String(a || "annotations").trim().replace(/[^a-zA-Z0-9._-]/g, "-");
  return e.length > 0 ? e : "annotations";
}
function Sh() {
  const a = Math.random().toString(36).slice(2, 8);
  return `ann-${Date.now().toString(36)}-${a}`;
}
function oi(a) {
  return String(a || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function vh(a) {
  let e = oi(a || "");
  return e = e.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>"), e = e.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>"), e = e.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>"), e = e.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), e = e.replace(/\*(.+?)\*/g, "<em>$1</em>"), e = e.replace(/`([^`]+)`/g, "<code>$1</code>"), e = e.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'), e = e.replace(/\n/g, "<br>"), e;
}
function Hn(a) {
  if (typeof window > "u")
    return oi(a);
  const e = window.DOMParser ? new window.DOMParser() : null;
  if (!e)
    return oi(a);
  const t = e.parseFromString(`<div>${a || ""}</div>`, "text/html"), i = t.body.firstElementChild || t.body;
  return i.querySelectorAll("script,style,iframe,object,embed,link,meta").forEach((s) => s.remove()), i.querySelectorAll("*").forEach((s) => {
    Array.from(s.attributes || []).forEach((o) => {
      const r = o.name.toLowerCase();
      (r.startsWith("on") || r === "style") && s.removeAttribute(o.name), r === "href" && String(o.value || "").trim().toLowerCase().startsWith("javascript:") && s.removeAttribute(o.name);
    });
  }), i.innerHTML;
}
function Mh(a) {
  if (typeof document > "u")
    return String(a || "");
  const e = document.createElement("div");
  return e.innerHTML = a || "", (e.textContent || "").replace(/\s+/g, " ").trim();
}
class xh {
  constructor({
    scene: e,
    camera: t,
    renderer: i,
    controls: s,
    uiParent: n,
    getRaycastInfo: o,
    getRaycastTargets: r,
    getCameraSnapshot: l,
    onRequestNavigate: c,
    isHelperObject: h,
    createdBy: A = "",
    theme: d = "dark"
  }) {
    this.scene = e, this.camera = t, this.renderer = i, this.controls = s, this.uiParent = n || null, this.getRaycastInfo = typeof o == "function" ? o : null, this.getRaycastTargets = typeof r == "function" ? r : null, this.getCameraSnapshot = typeof l == "function" ? l : null, this.onRequestNavigate = typeof c == "function" ? c : null, this.isHelperObject = typeof h == "function" ? h : () => !1, this.theme = d, this.defaultCreatedBy = A || "", this.annotations = [], this.activeIndex = -1, this.editMode = !1, this.modelKey = null, this.datasetMetadata = {
      createdBy: A || "",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    }, this._raycastTargets = [], this.markerScaleDesktop = 0.1, this.markerScaleVR = 0.24, this._lastMarkerAttenuationState = null, this.raycaster = new f.Raycaster(), this.mouse = new f.Vector2(), this.raycaster.params.Sprite = { threshold: 0.2 }, this.occludedMarkerOpacity = 0.3, this.controller1 = null, this.controller2 = null, this.controllerGrip1 = null, this.controllerGrip2 = null, this.hand1 = null, this.hand2 = null, this.isDragging = !1, this.dragStartPosition = { x: 0, y: 0 }, this.DRAG_THRESHOLD = 6, this.panel = null, this.panelTitle = null, this.panelBody = null, this.panelMeta = null, this.panelCount = null, this.contextMenu = null, this.editor = null, this.editorTitleInput = null, this.editorContentTypeSelect = null, this.editorContentInput = null, this.editorCreatedByInput = null, this.editorCameraSummary = null, this.editorCaptureButton = null, this.editorOpen = !1, this.editorIndex = -1, this.editorIsNew = !1, this.vrPanelCanvas = null, this.vrPanelTexture = null, this.vrPanelSprite = null, this._boundMouseDown = this._onMouseDown.bind(this), this._boundMouseMove = this._onMouseMove.bind(this), this._boundMouseUp = this._onMouseUp.bind(this), this._boundCanvasClickCapture = this._onCanvasClickCapture.bind(this), this._boundCanvasDoubleClick = this._onCanvasDoubleClick.bind(this), this._boundCanvasContextMenu = this._onCanvasContextMenu.bind(this), this._boundControllerSelectEnd = this._onControllerSelectEnd.bind(this), this._boundHandPinchEnd = this._onHandPinchEnd.bind(this), this._boundKeyDown = this._onWindowKeyDown.bind(this), this._boundWindowPointerDown = this._onWindowPointerDown.bind(this), this._buildDesktopPanel(), this._buildEditorPanel(), this._buildContextMenu(), this._bindDomEvents(), typeof window < "u" && (window.annotationSystem = this);
  }
  _getUiParent() {
    return this.uiParent ? this.uiParent : this.renderer && this.renderer.domElement && this.renderer.domElement.parentElement || document.body;
  }
  _bindDomEvents() {
    if (!this.renderer || !this.renderer.domElement) return;
    const e = this.renderer.domElement;
    e.addEventListener("mousedown", this._boundMouseDown, !1), e.addEventListener("mousemove", this._boundMouseMove, !1), e.addEventListener("mouseup", this._boundMouseUp, !1), e.addEventListener("click", this._boundCanvasClickCapture, !0), e.addEventListener("contextmenu", this._boundCanvasContextMenu, !0), typeof window < "u" && (window.addEventListener("keydown", this._boundKeyDown), window.addEventListener("pointerdown", this._boundWindowPointerDown, !0));
  }
  _onMouseDown(e) {
    this.isDragging = !1, this.dragStartPosition.x = e.clientX, this.dragStartPosition.y = e.clientY;
  }
  _onMouseMove(e) {
    if (this.isDragging) return;
    const t = Math.abs(e.clientX - this.dragStartPosition.x), i = Math.abs(e.clientY - this.dragStartPosition.y);
    (t > this.DRAG_THRESHOLD || i > this.DRAG_THRESHOLD) && (this.isDragging = !0);
  }
  _onMouseUp() {
    setTimeout(() => {
      this.isDragging = !1;
    }, 10);
  }
  _onWindowKeyDown(e) {
    const t = e.target;
    if (!(t instanceof HTMLElement && (t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA" || t.isContentEditable))) {
      if (e.code === "BracketLeft") {
        e.preventDefault(), this.previousAnnotation();
        return;
      }
      if (e.code === "BracketRight") {
        e.preventDefault(), this.nextAnnotation();
        return;
      }
      e.code === "Escape" && (this.hideContextMenu(), this.editorOpen ? this.closeEditor(!1) : this.closeAnnotation());
    }
  }
  _onCanvasClickCapture(e) {
    if (!e || this.isDragging || this._isVRPresenting()) return;
    this.hideContextMenu();
    const t = this._raycastMarkerFromPointer(e);
    if (this.editMode) {
      t && (e.preventDefault(), e.stopImmediatePropagation(), this.openEditor(t.index, !1));
      return;
    }
    t && (e.preventDefault(), e.stopImmediatePropagation(), this.openAnnotation(t.index, { navigate: !0, source: "marker-click" }));
  }
  _onCanvasDoubleClick(e) {
  }
  _isVRPresenting() {
    return !!(this.renderer && this.renderer.xr && this.renderer.xr.isPresenting);
  }
  _buildDesktopPanel() {
    if (typeof document > "u") return;
    const e = document.createElement("section");
    e.className = `annotation-panel below-panel${this.theme === "light" ? " light-theme" : ""}`, e.style.display = "none", e.innerHTML = `
      <header class="annotation-panel__header">
        <h3 class="annotation-panel__title" data-role="title"></h3>
      </header>
      <div class="annotation-panel__content">
        <div class="annotation-panel__body" data-role="body"></div>
      </div>
      <footer class="annotation-panel__footer">
        <div class="annotation-panel__meta" data-role="meta"></div>
        <div class="annotation-panel__actions">
          <div class="annotation-panel__count" data-role="count">0/0</div>
          <button type="button" class="annotation-panel__btn" data-role="prev" aria-label="Previous annotation">&#8592;</button>
          <button type="button" class="annotation-panel__btn" data-role="next" aria-label="Next annotation">&#8594;</button>
          <button type="button" class="annotation-panel__btn" data-role="close" aria-label="Close annotation">&times;</button>
        </div>
      </footer>
    `, this._getUiParent().appendChild(e), e.querySelector('[data-role="prev"]').addEventListener("click", () => this.previousAnnotation()), e.querySelector('[data-role="next"]').addEventListener("click", () => this.nextAnnotation()), e.querySelector('[data-role="close"]').addEventListener("click", () => this.closeAnnotation()), this.panel = e, this.panelTitle = e.querySelector('[data-role="title"]'), this.panelBody = e.querySelector('[data-role="body"]'), this.panelMeta = e.querySelector('[data-role="meta"]'), this.panelCount = e.querySelector('[data-role="count"]');
  }
  _buildEditorPanel() {
    if (typeof document > "u") return;
    const e = document.createElement("section");
    e.className = `annotation-editor below-panel${this.theme === "light" ? " light-theme" : ""}`, e.style.display = "none", e.innerHTML = `
      <div class="annotation-editor__header">
        <strong>Edit Annotation</strong>
        <button type="button" class="annotation-editor__close" data-role="close" aria-label="Close editor">&times;</button>
      </div>
      <div class="annotation-editor__content">
        <label class="annotation-editor__field">
          <span>Title</span>
          <input type="text" data-role="title" placeholder="Annotation title" />
        </label>
        <label class="annotation-editor__field">
          <span>Content Type</span>
          <select data-role="content-type">
            <option value="text">Text</option>
            <option value="markdown">Markdown</option>
            <option value="html">HTML</option>
          </select>
        </label>
        <label class="annotation-editor__field">
          <span>Content</span>
          <textarea data-role="content" rows="7" placeholder="Further information"></textarea>
        </label>
        <label class="annotation-editor__field">
          <span>Created By</span>
          <input type="text" data-role="created-by" placeholder="Your name or team" />
        </label>
      </div>
      <footer class="annotation-editor__footer">
        <div class="annotation-editor__meta">
          <button type="button" class="annotation-editor__capture" data-role="capture">Capture</button>
          <span class="annotation-editor__camera-summary" data-role="camera-summary">No camera capture</span>
        </div>
        <div class="annotation-editor__actions">
          <button type="button" class="annotation-editor__btn annotation-editor__btn--delete" data-role="delete">Delete</button>
          <button type="button" class="annotation-editor__btn" data-role="cancel">Cancel</button>
          <button type="button" class="annotation-editor__btn annotation-editor__btn--primary" data-role="save">Save</button>
        </div>
      </footer>
    `, this._getUiParent().appendChild(e), this.editor = e, this.editorTitleInput = e.querySelector('[data-role="title"]'), this.editorContentTypeSelect = e.querySelector('[data-role="content-type"]'), this.editorContentInput = e.querySelector('[data-role="content"]'), this.editorCreatedByInput = e.querySelector('[data-role="created-by"]'), this.editorCameraSummary = e.querySelector('[data-role="camera-summary"]'), this.editorCaptureButton = e.querySelector('[data-role="capture"]'), e.querySelector('[data-role="close"]').addEventListener("click", () => this.closeEditor(!1)), e.querySelector('[data-role="cancel"]').addEventListener("click", () => this.closeEditor(!1)), e.querySelector('[data-role="save"]').addEventListener("click", () => this._saveEditor()), e.querySelector('[data-role="delete"]').addEventListener("click", () => this._deleteEditorTarget()), this.editorCaptureButton.addEventListener("click", () => {
      const i = this.annotations[this.editorIndex];
      i && (i.camera = this.captureCameraSnapshot(), this._updateEditorCameraSummary(i.camera), i.metadata.updatedAt = (/* @__PURE__ */ new Date()).toISOString());
    });
  }
  _buildContextMenu() {
    if (typeof document > "u") return;
    const e = document.createElement("div");
    e.className = `annotation-context-menu${this.theme === "light" ? " light-theme" : ""}`, e.style.display = "none", e.setAttribute("role", "menu"), document.body.appendChild(e), this.contextMenu = e;
  }
  _onCanvasContextMenu(e) {
    if (!e || this._isVRPresenting() || !this.editMode || e.button !== 2) return;
    if (e.preventDefault(), this.isDragging) {
      this.hideContextMenu();
      return;
    }
    e.stopImmediatePropagation();
    const t = this._raycastMarkerFromPointer(e), i = this._raycastScenePoint(e), s = [];
    if (i && s.push({
      key: "create",
      label: "Create Marker Here",
      payload: { point: i }
    }), t && (s.push({
      key: "edit",
      label: `Edit Marker ${t.index + 1}`,
      payload: { index: t.index }
    }), s.push({
      key: "delete",
      label: `Delete Marker ${t.index + 1}`,
      payload: { index: t.index }
    })), s.length === 0) {
      this.hideContextMenu();
      return;
    }
    this.showContextMenu(e.clientX, e.clientY, s);
  }
  _onWindowPointerDown(e) {
    if (!e || e.button !== void 0 && e.button !== 0) return;
    const t = e.target, i = typeof Node < "u" && t instanceof Node ? t : null;
    if (this.contextMenu && this.contextMenu.style.display !== "none") {
      if (i && this.contextMenu.contains(i))
        return;
      this.hideContextMenu();
    }
    this._isVRPresenting() || this.editorOpen || this.activeIndex < 0 || i && this.panel && this.panel.contains(i) || i && this.editor && this.editor.contains(i) || this._raycastMarkerFromPointer(e) || this.closeAnnotation();
  }
  showContextMenu(e, t, i) {
    if (!this.contextMenu || !Array.isArray(i) || i.length === 0) return;
    this.contextMenu.innerHTML = "", i.forEach((d) => {
      const u = document.createElement("button");
      u.type = "button", u.className = "annotation-context-menu__item", u.textContent = d.label, u.setAttribute("role", "menuitem"), u.addEventListener("click", (p) => {
        p.preventDefault(), p.stopPropagation(), this.handleContextMenuAction(d.key, d.payload || {});
      }), this.contextMenu.appendChild(u);
    });
    const s = 8, n = this.contextMenu;
    n.style.display = "block", n.style.visibility = "hidden", n.style.left = "0px", n.style.top = "0px";
    const o = n.offsetWidth || 180, r = n.offsetHeight || 100, l = window.innerWidth - o - s, c = window.innerHeight - r - s, h = Math.max(s, Math.min(e, l)), A = Math.max(s, Math.min(t, c));
    n.style.left = `${h}px`, n.style.top = `${A}px`, n.style.visibility = "visible";
  }
  hideContextMenu() {
    this.contextMenu && (this.contextMenu.style.display = "none", this.contextMenu.style.visibility = "hidden", this.contextMenu.innerHTML = "");
  }
  handleContextMenuAction(e, t = {}) {
    e === "create" && t.point ? this.createAnnotationAtPoint(t.point, { openEditor: !0 }) : e === "edit" && Number.isInteger(t.index) ? this.openEditor(t.index, !1) : e === "delete" && Number.isInteger(t.index) && this.removeAnnotation(t.index), this.hideContextMenu();
  }
  _resolveContentType(e = {}) {
    const t = String(e.contentType || e.type || "").toLowerCase();
    return t === "markdown" || t === "md" ? "markdown" : t === "html" || e.html !== void 0 ? "html" : e.markdown !== void 0 ? "markdown" : gt;
  }
  _normalizeMetadata(e = {}, t = "") {
    const i = (/* @__PURE__ */ new Date()).toISOString();
    return {
      createdBy: String(e.createdBy || e.author || t || "").trim(),
      createdAt: e.createdAt || i,
      updatedAt: e.updatedAt || e.createdAt || i
    };
  }
  _createUniqueAnnotationId(e = null) {
    const i = String(e || "").trim() || Sh(), s = (r) => this.annotations.some((l) => l?.id === r);
    if (!s(i)) return i;
    let n = 2, o = `${i}-${n}`;
    for (; s(o); )
      n += 1, o = `${i}-${n}`;
    return o;
  }
  _normalizeAnnotation(e = {}, t = 0, i = {}) {
    const s = this._resolveContentType(e), n = On(
      e.position || e.xyz || e.point || e.location
    ) || new f.Vector3();
    let o = "";
    s === "html" && e.html !== void 0 ? o = String(e.html) : s === "markdown" && e.markdown !== void 0 ? o = String(e.markdown) : o = e.content !== void 0 ? String(e.content) : "";
    const r = {
      ...i,
      ...e.metadata || e.meta || {}
    }, l = this._normalizeMetadata(r, this.defaultCreatedBy || this.datasetMetadata.createdBy);
    return {
      id: this._createUniqueAnnotationId(e.id),
      title: String(e.title || `Annotation ${t + 1}`),
      content: o,
      contentType: s,
      position: n,
      camera: e.camera || e.cameraState || null,
      metadata: l,
      marker: null
    };
  }
  _cloneCameraData(e) {
    return !e || typeof e != "object" ? null : JSON.parse(JSON.stringify(e));
  }
  _annotationToSerializable(e) {
    return {
      id: e.id,
      title: e.title,
      content: e.content,
      contentType: e.contentType,
      position: Ki(e.position),
      camera: this._cloneCameraData(e.camera),
      metadata: {
        createdBy: e.metadata.createdBy || "",
        createdAt: e.metadata.createdAt || "",
        updatedAt: e.metadata.updatedAt || ""
      }
    };
  }
  setRaycastTargets(e) {
    const t = [], i = (s) => {
      if (Array.isArray(s)) {
        s.forEach(i);
        return;
      }
      !s || typeof s != "object" || (s.isObject3D || s.isMesh || s.traverse) && (s.updateMatrixWorld(!0), t.push(s));
    };
    i(e), this._raycastTargets = t;
  }
  _resolveRaycastTargets() {
    if (this.getRaycastTargets) {
      const e = this.getRaycastTargets();
      if (Array.isArray(e) && e.length > 0)
        return e;
      if (e && typeof e == "object")
        return [e];
    }
    return this._raycastTargets && this._raycastTargets.length > 0 ? this._raycastTargets : this.scene && this.scene.children ? this.scene.children : [];
  }
  _resolveDatasetInput(e) {
    if (!e)
      return { metadata: {}, annotations: [] };
    if (Array.isArray(e))
      return { metadata: {}, annotations: e };
    if (typeof e == "object") {
      const t = Array.isArray(e.annotations) ? e.annotations : Array.isArray(e.items) ? e.items : [], i = {
        ...e.metadata || e.meta || {}
      };
      return e.createdBy && !i.createdBy && (i.createdBy = e.createdBy), e.createdAt && !i.createdAt && (i.createdAt = e.createdAt), t.length === 0 && (e.position || e.xyz || e.point) ? { metadata: i, annotations: [e] } : { metadata: i, annotations: t };
    }
    return { metadata: {}, annotations: [] };
  }
  setAnnotations(e, { modelKey: t = null, metadata: i = {} } = {}) {
    const s = this._resolveDatasetInput(e);
    return this.clearAnnotations(), this.modelKey = t, this.datasetMetadata = {
      createdBy: i.createdBy || s.metadata.createdBy || this.defaultCreatedBy || "",
      createdAt: i.createdAt || s.metadata.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
      ...s.metadata,
      ...i
    }, s.annotations.forEach((n, o) => {
      const r = this._normalizeAnnotation(n, o, this.datasetMetadata);
      this._addNormalizedAnnotation(r, { open: !1 });
    }), this._updatePanelVisibility(), this.annotations;
  }
  _createMarkerTexture(e, t = !1, i = !1) {
    const n = Math.max(1, window.devicePixelRatio || 1) * 2, o = document.createElement("canvas");
    o.width = 96 * n, o.height = 96 * n;
    const r = o.getContext("2d");
    r.setTransform(1, 0, 0, 1, 0, 0), r.clearRect(0, 0, o.width, o.height), r.save(), r.scale(n, n);
    const l = 96 * 0.5;
    r.fillStyle = "#ffffff", r.textAlign = "center", r.textBaseline = "middle";
    const c = i ? 3.8 : 1.7, A = (i ? 96 * 0.345 : 96 * 0.21125) - c * 0.5, d = i ? e >= 100 ? 19 : 23 : e >= 100 ? 12 : 14;
    r.shadowColor = i ? "rgba(0, 0, 0, 0.36)" : "rgba(0, 0, 0, 0.12)", r.shadowBlur = i ? 6 : 0.7, r.shadowOffsetY = i ? 1.5 : 0.35, r.beginPath(), r.arc(l, l, A, 0, Math.PI * 2), r.fillStyle = t ? i ? "rgba(14, 36, 74, 0.88)" : "rgba(18, 44, 86, 0.62)" : i ? "rgba(10, 10, 10, 0.78)" : "rgba(16, 16, 16, 0.5)", r.fill(), r.shadowColor = "transparent", r.shadowBlur = 0, r.shadowOffsetY = 0, r.beginPath(), r.arc(l, l, A, 0, Math.PI * 2), r.lineWidth = c, r.strokeStyle = i ? "rgba(255, 255, 255, 0.72)" : "rgba(255, 255, 255, 0.52)", r.stroke(), t && (r.beginPath(), r.arc(l, l, A + c * 0.9, 0, Math.PI * 2), r.lineWidth = i ? 2.2 : 1.1, r.strokeStyle = i ? "rgba(255, 255, 255, 0.14)" : "rgba(255, 255, 255, 0.08)", r.stroke()), r.fillStyle = "rgba(255, 255, 255, 0.96)", r.font = `680 ${d}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`, r.fillText(String(e), l, l + (i ? 1 : 0.5)), r.restore();
    const u = new f.CanvasTexture(o);
    return u.minFilter = f.LinearFilter, u.magFilter = f.LinearFilter, u.needsUpdate = !0, u;
  }
  _createMarkerSprite(e, t) {
    const i = this._isVRPresenting(), s = this._createMarkerTexture(e + 1, !1, i), n = new f.SpriteMaterial({
      map: s,
      transparent: !0,
      depthTest: !0,
      depthWrite: !1,
      sizeAttenuation: i
    });
    n.opacity = 1;
    const o = new f.Sprite(n), r = i ? this.markerScaleVR : this.markerScaleDesktop;
    o.scale.set(r, r, 1), o.position.copy(t), o.renderOrder = 131, o.userData.isAnnotationMarker = !0, o.userData.annotationIndex = e;
    const l = this._createMarkerTexture(e + 1, !1, i), c = new f.SpriteMaterial({
      map: l,
      transparent: !0,
      depthTest: !1,
      depthWrite: !1,
      sizeAttenuation: i
    });
    c.opacity = this.occludedMarkerOpacity;
    const h = new f.Sprite(c);
    return h.scale.set(r, r, 1), h.position.copy(t), h.renderOrder = 130, h.userData.isAnnotationMarker = !0, h.userData.annotationIndex = e, this.scene.add(h), this.scene.add(o), { sprite: o, occludedSprite: h };
  }
  _disposeMarker(e) {
    const t = e && e.marker, i = e && e.markerOccluded, s = (n) => {
      n && (n.parent && n.parent.remove(n), n.material && (n.material.map && n.material.map.dispose(), n.material.dispose()));
    };
    s(t), s(i), e && (e.marker = null, e.markerOccluded = null);
  }
  _refreshMarkerVisuals() {
    const e = this._isVRPresenting();
    this.annotations.forEach((t, i) => {
      const s = t.marker, n = t.markerOccluded;
      if (!s || !s.material || !n || !n.material) return;
      s.userData.annotationIndex = i, n.userData.annotationIndex = i;
      const o = s.material.map, r = n.material.map;
      s.material.map = this._createMarkerTexture(i + 1, i === this.activeIndex, e), n.material.map = this._createMarkerTexture(i + 1, i === this.activeIndex, e), s.material.sizeAttenuation = e, n.material.sizeAttenuation = e, s.material.needsUpdate = !0, n.material.needsUpdate = !0, s.material.opacity = 1, n.material.opacity = this.occludedMarkerOpacity;
      const l = e ? this.markerScaleVR : this.markerScaleDesktop;
      s.scale.set(l, l, 1), n.scale.set(l, l, 1), n.position.copy(s.position), o && o.dispose(), r && r.dispose();
    });
  }
  _updateMarkerSizingMode() {
    const e = this._isVRPresenting();
    this._lastMarkerAttenuationState !== e && (this._lastMarkerAttenuationState = e, this._refreshMarkerVisuals());
  }
  _addNormalizedAnnotation(e, { open: t = !0 } = {}) {
    const i = this._createMarkerSprite(this.annotations.length, e.position);
    return e.marker = i.sprite, e.markerOccluded = i.occludedSprite, this.annotations.push(e), t ? this.openAnnotation(this.annotations.length - 1, { navigate: !1, source: "add" }) : this._refreshMarkerVisuals(), e;
  }
  addAnnotation(e, { open: t = !0 } = {}) {
    const i = this._normalizeAnnotation(e, this.annotations.length, this.datasetMetadata);
    return this._addNormalizedAnnotation(i, { open: t });
  }
  getAnnotationIndexById(e) {
    const t = String(e || "").trim();
    return t ? this.annotations.findIndex((i) => i?.id === t) : -1;
  }
  getAnnotationById(e) {
    const t = this.getAnnotationIndexById(e);
    return t < 0 ? null : this._annotationToSerializable(this.annotations[t]);
  }
  createAnnotationAtPoint(e, { openEditor: t = !0 } = {}) {
    const i = On(e);
    if (!i) return null;
    const s = this.addAnnotation({
      position: i,
      title: `Annotation ${this.annotations.length + 1}`,
      content: "",
      contentType: gt,
      camera: this.captureCameraSnapshot(),
      metadata: this._normalizeMetadata({}, this.defaultCreatedBy || this.datasetMetadata?.createdBy)
    }, { open: !1 }), n = this.annotations.indexOf(s);
    return !Number.isInteger(n) || n < 0 ? null : (t ? this.openEditor(n, !0) : this.openAnnotation(n, { navigate: !1, source: "add-point" }), s);
  }
  removeAnnotation(e) {
    if (!Number.isInteger(e) || e < 0 || e >= this.annotations.length)
      return !1;
    const [t] = this.annotations.splice(e, 1);
    return this._disposeMarker(t), this.activeIndex === e ? (this.activeIndex = -1, this.hideDesktopPanel(), this.hideVRPanel()) : this.activeIndex > e && (this.activeIndex -= 1), this._refreshMarkerVisuals(), this._updatePanelVisibility(), !0;
  }
  removeAnnotationById(e) {
    const t = this.getAnnotationIndexById(e);
    return t < 0 ? !1 : this.removeAnnotation(t);
  }
  clearAnnotations() {
    this.annotations.forEach((e) => this._disposeMarker(e)), this.annotations = [], this.activeIndex = -1, this.hideDesktopPanel(), this.hideVRPanel(), this.closeEditor(!1), this.hideContextMenu();
  }
  closeAnnotation() {
    this.activeIndex = -1, this._refreshMarkerVisuals(), this.hideDesktopPanel(), this.hideVRPanel();
  }
  _renderAnnotationHtml(e) {
    const t = e.contentType || gt;
    return t === "html" ? Hn(e.content) : t === "markdown" ? Hn(vh(e.content)) : oi(e.content).replace(/\n/g, "<br>");
  }
  _formatMetadata(e) {
    const t = e.metadata?.createdBy || "Unknown", i = e.metadata?.showCreatedAt === !0 || this.datasetMetadata?.showCreatedAt === !0, s = e.metadata?.createdAt ? new Date(e.metadata.createdAt) : null, n = s && !Number.isNaN(s.getTime()) ? s.toLocaleString() : e.metadata?.createdAt || "";
    return i && n ? `Created by ${t} • ${n}` : `Created by ${t}`;
  }
  showDesktopPanel(e, t) {
    this.panel && (this.panelTitle.textContent = e.title || `Annotation ${t + 1}`, this.panelBody.innerHTML = this._renderAnnotationHtml(e), this.panelMeta.textContent = this._formatMetadata(e), this.panelCount.textContent = `${t + 1}/${this.annotations.length}`, this.panel.style.display = this._isVRPresenting() ? "none" : "block");
  }
  hideDesktopPanel() {
    this.panel && (this.panel.style.display = "none");
  }
  _wrapText(e, t, i) {
    const s = String(t || "").split(/\s+/).filter(Boolean);
    if (s.length === 0) return [""];
    const n = [];
    let o = s[0];
    for (let r = 1; r < s.length; r += 1) {
      const l = `${o} ${s[r]}`;
      e.measureText(l).width <= i ? o = l : (n.push(o), o = s[r]);
    }
    return n.push(o), n;
  }
  _drawVRPanel(e) {
    const t = (window.devicePixelRatio || 1) * 2, i = 760, s = 420;
    this.vrPanelCanvas || (this.vrPanelCanvas = document.createElement("canvas"));
    const n = i * t, o = s * t;
    (this.vrPanelCanvas.width !== n || this.vrPanelCanvas.height !== o) && (this.vrPanelCanvas.width = n, this.vrPanelCanvas.height = o);
    const r = this.vrPanelCanvas.getContext("2d");
    r.setTransform(1, 0, 0, 1, 0, 0), r.clearRect(0, 0, n, o), r.save(), r.scale(t, t), r.fillStyle = "rgba(0, 0, 0, 0.8)", r.strokeStyle = "rgba(255, 255, 255, 0.24)", r.lineWidth = 2, r.beginPath(), typeof r.roundRect == "function" ? r.roundRect(10, 10, i - 20, s - 20, 18) : r.rect(10, 10, i - 20, s - 20), r.fill(), r.stroke();
    const l = `${this.activeIndex + 1}/${this.annotations.length}`;
    r.fillStyle = "#e4b98a", r.font = '600 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', r.fillText(l, 38, 56), r.fillStyle = "#ffffff", r.font = '700 34px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', r.fillText(e.title || "Annotation", 38, 102);
    const c = this._renderAnnotationHtml(e), h = Mh(c);
    r.fillStyle = "rgba(255, 255, 255, 0.92)", r.font = '400 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const A = this._wrapText(r, h, i - 76), d = 9;
    if (A.slice(0, d).forEach((p, g) => {
      r.fillText(p, 38, 148 + g * 30);
    }), A.length > d && (r.fillStyle = "rgba(255, 255, 255, 0.65)", r.fillText("...", 38, 148 + d * 30)), r.fillStyle = "rgba(238, 199, 144, 0.9)", r.font = '500 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', r.fillText(this._formatMetadata(e), 38, s - 40), r.restore(), this.vrPanelTexture || (this.vrPanelTexture = new f.CanvasTexture(this.vrPanelCanvas), this.vrPanelTexture.minFilter = f.LinearFilter, this.vrPanelTexture.magFilter = f.LinearFilter), this.vrPanelTexture.needsUpdate = !0, !this.vrPanelSprite) {
      const p = new f.SpriteMaterial({
        map: this.vrPanelTexture,
        depthTest: !1,
        depthWrite: !1,
        transparent: !0
      });
      this.vrPanelSprite = new f.Sprite(p), this.vrPanelSprite.renderOrder = 140;
      const g = 0.52, b = i / s;
      this.vrPanelSprite.scale.set(g * b, g, 1);
    }
  }
  _positionVRPanel(e) {
    if (!e || !e.position || !this.vrPanelSprite || !this.camera)
      return;
    const t = e.position.clone(), i = new f.Vector3();
    this.camera.getWorldPosition(i);
    const s = i.clone().sub(t).normalize(), n = new f.Vector3(0, 1, 0);
    let o = new f.Vector3().crossVectors(n, s).normalize();
    (!Number.isFinite(o.x) || o.lengthSq() < 1e-4) && (o = new f.Vector3(1, 0, 0));
    const r = t.clone().add(o.multiplyScalar(0.42)).add(n.multiplyScalar(0.18));
    this.vrPanelSprite.position.copy(r);
  }
  showVRPanel(e) {
    !e || !this.scene || !this._isVRPresenting() || (this._drawVRPanel(e), this._positionVRPanel(e), this.scene.children.includes(this.vrPanelSprite) || this.scene.add(this.vrPanelSprite), this.vrPanelSprite.visible = !0);
  }
  hideVRPanel() {
    !this.vrPanelSprite || !this.scene || (this.vrPanelSprite.visible = !1, this.scene.children.includes(this.vrPanelSprite) && this.scene.remove(this.vrPanelSprite));
  }
  openAnnotation(e, { navigate: t = !0, source: i = "api" } = {}) {
    if (!Number.isInteger(e) || e < 0 || e >= this.annotations.length)
      return null;
    const s = this.annotations[e];
    return this.activeIndex = e, this._refreshMarkerVisuals(), this._isVRPresenting() ? (this.hideDesktopPanel(), this.showVRPanel(s)) : (this.hideVRPanel(), this.showDesktopPanel(s, e)), !this._isVRPresenting() && t && this.onRequestNavigate && this.onRequestNavigate(this._annotationToSerializable(s), { source: i }), s;
  }
  openAnnotationById(e, t = {}) {
    const i = this.getAnnotationIndexById(e);
    return i < 0 ? null : this.openAnnotation(i, t);
  }
  nextAnnotation({ navigate: e = !0 } = {}) {
    if (this.annotations.length === 0) return null;
    const t = this.activeIndex < 0 ? 0 : (this.activeIndex + 1) % this.annotations.length;
    return this.openAnnotation(t, { navigate: e, source: "next" });
  }
  previousAnnotation({ navigate: e = !0 } = {}) {
    if (this.annotations.length === 0) return null;
    const t = this.activeIndex < 0 ? this.annotations.length - 1 : (this.activeIndex - 1 + this.annotations.length) % this.annotations.length;
    return this.openAnnotation(t, { navigate: e, source: "previous" });
  }
  _updatePanelVisibility() {
    if (this.activeIndex < 0 || this.activeIndex >= this.annotations.length) {
      this.hideDesktopPanel(), this.hideVRPanel();
      return;
    }
    const e = this.annotations[this.activeIndex];
    this._isVRPresenting() ? (this.hideDesktopPanel(), this.showVRPanel(e)) : (this.hideVRPanel(), this.showDesktopPanel(e, this.activeIndex));
  }
  setEditMode(e) {
    return this.editMode = e === !0, this.editMode ? this.hideDesktopPanel() : this.editorOpen && this.closeEditor(!0), this.editMode || this.hideContextMenu(), this.panel && this.panel.classList.toggle("annotation-panel--editing", this.editMode), this.editor && this.editor.classList.toggle("annotation-editor--active", this.editMode), this.editMode;
  }
  toggleEditMode() {
    return this.setEditMode(!this.editMode);
  }
  isEditModeEnabled() {
    return this.editMode;
  }
  captureCameraSnapshot() {
    return this.getCameraSnapshot ? this._cloneCameraData(this.getCameraSnapshot()) : !this.camera || !this.controls ? null : {
      desktop: {
        camera: Ki(this.camera.position),
        target: Ki(this.controls.target)
      }
    };
  }
  _updateEditorCameraSummary(e) {
    if (!this.editorCameraSummary) return;
    const t = e?.desktop?.camera;
    if (!t) {
      this.editorCameraSummary.textContent = "No camera capture";
      return;
    }
    this.editorCameraSummary.textContent = `Cam ${Ze(t.x, 2)}, ${Ze(t.y, 2)}, ${Ze(t.z, 2)}`;
  }
  openEditor(e, t = !1) {
    if (!this.editor || !Number.isInteger(e) || e < 0 || e >= this.annotations.length)
      return;
    const i = this.annotations[e];
    this.editorOpen = !0, this.editorIndex = e, this.editorIsNew = t === !0, this.editorTitleInput.value = i.title || "", this.editorContentTypeSelect.value = i.contentType || gt, this.editorContentInput.value = i.content || "", this.editorCreatedByInput.value = i.metadata?.createdBy || this.defaultCreatedBy || "", i.camera || (i.camera = this.captureCameraSnapshot()), this._updateEditorCameraSummary(i.camera), this.editor.style.display = "block", this.editorTitleInput.focus(), this.hideContextMenu(), this.openAnnotation(e, { navigate: !1, source: "editor" }), this.hideDesktopPanel();
  }
  closeEditor(e = !0) {
    !this.editor || !this.editorOpen || (!e && this.editorIsNew && this.removeAnnotation(this.editorIndex), this.editorOpen = !1, this.editorIsNew = !1, this.editorIndex = -1, this.editor.style.display = "none", this.hideContextMenu());
  }
  _saveEditor() {
    const e = this.annotations[this.editorIndex];
    if (!e) {
      this.closeEditor(!1);
      return;
    }
    e.title = this.editorTitleInput.value.trim() || `Annotation ${this.editorIndex + 1}`, e.contentType = this.editorContentTypeSelect.value || gt, e.content = this.editorContentInput.value, e.metadata || (e.metadata = this._normalizeMetadata({}, this.defaultCreatedBy));
    const t = this.editorCreatedByInput.value.trim();
    e.metadata.createdBy = t || e.metadata.createdBy || this.defaultCreatedBy, e.metadata.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), e.camera || (e.camera = this.captureCameraSnapshot()), this.openAnnotation(this.editorIndex, { navigate: !1, source: "editor-save" }), this.closeEditor(!0);
  }
  _deleteEditorTarget() {
    const e = this.editorIndex;
    this.closeEditor(!0), this.removeAnnotation(e);
  }
  _pointerToRay(e) {
    if (!e) return null;
    let t = this.camera, i = this.mouse;
    if (this.getRaycastInfo) {
      const s = this.getRaycastInfo(e);
      if (s && s.mouse && Number.isFinite(s.mouse.x) && Number.isFinite(s.mouse.y))
        s.mouse.isVector2 ? i = s.mouse : i = new f.Vector2(s.mouse.x, s.mouse.y), s.camera && (t = s.camera);
      else
        return null;
    } else {
      const s = this.renderer.domElement.getBoundingClientRect();
      if (!s.width || !s.height) return null;
      i = new f.Vector2(
        (e.clientX - s.left) / s.width * 2 - 1,
        -((e.clientY - s.top) / s.height) * 2 + 1
      );
    }
    return t ? (this.raycaster.setFromCamera(i, t), { camera: t, mouse: i }) : null;
  }
  _getRaycastMarkerObjects() {
    const e = [];
    return this.annotations.forEach((t) => {
      t?.marker && e.push(t.marker), t?.markerOccluded && e.push(t.markerOccluded);
    }), e;
  }
  _raycastMarkerFromPointer(e) {
    if (this.annotations.length === 0 || !this._pointerToRay(e)) return null;
    const i = this._getRaycastMarkerObjects();
    if (i.length === 0) return null;
    const s = this.raycaster.intersectObjects(i, !1);
    if (s.length === 0) return null;
    const n = s[0].object, o = Number(n.userData.annotationIndex);
    return Number.isInteger(o) ? {
      index: o,
      object: n,
      intersection: s[0]
    } : null;
  }
  _raycastScenePoint(e) {
    if (!this._pointerToRay(e)) return null;
    const i = this._resolveRaycastTargets();
    if (!i || i.length === 0) return null;
    const n = this.raycaster.intersectObjects(i, !0).find((o) => {
      const r = o.object;
      return !(!r || r.userData?.isAnnotationMarker || this.isHelperObject(r));
    });
    return n ? n.point.clone() : null;
  }
  _raycastMarkerFromController(e) {
    if (!e || this.annotations.length === 0) return null;
    const t = new f.Matrix4().extractRotation(e.matrixWorld), i = new f.Vector3(), s = new f.Vector3(0, 0, -1).applyMatrix4(t).normalize();
    e.getWorldPosition(i), this.raycaster.set(i, s);
    const n = this._getRaycastMarkerObjects(), o = this.raycaster.intersectObjects(n, !1);
    if (o.length === 0) return null;
    const r = Number(o[0].object.userData.annotationIndex);
    return Number.isInteger(r) ? r : null;
  }
  _onControllerSelectEnd(e) {
    if (!e || !e.target) return;
    const t = this._raycastMarkerFromController(e.target);
    Number.isInteger(t) && (this.editMode || this.openAnnotation(t, { navigate: !1, source: "vr-controller" }));
  }
  _raycastMarkerFromHand(e) {
    if (!e || this.annotations.length === 0) return null;
    const t = e.joints?.["index-finger-tip"];
    if (!t) return null;
    const i = e.joints?.["index-finger-phalanx-proximal"] || e.joints?.["index-finger-phalanx-intermediate"] || e.joints?.wrist || null, s = new f.Vector3();
    t.getWorldPosition(s);
    const n = new f.Vector3();
    if (i) {
      const c = new f.Vector3();
      i.getWorldPosition(c), n.copy(s).sub(c).normalize();
    } else
      n.set(0, 0, -1).applyQuaternion(e.quaternion).normalize();
    if (!Number.isFinite(n.x) || n.lengthSq() < 1e-5)
      return null;
    this.raycaster.set(s, n);
    const o = this._getRaycastMarkerObjects(), r = this.raycaster.intersectObjects(o, !1);
    if (r.length === 0) return null;
    const l = Number(r[0].object.userData.annotationIndex);
    return Number.isInteger(l) ? l : null;
  }
  _onHandPinchEnd(e) {
    if (!e || !e.target || this.editMode) return;
    const t = this._raycastMarkerFromHand(e.target);
    Number.isInteger(t) && this.openAnnotation(t, { navigate: !1, source: "xr-hand-pinch" });
  }
  attachVR({ controller1: e, controller2: t, controllerGrip1: i, controllerGrip2: s, hand1: n = null, hand2: o = null }) {
    this.controller1 && this.detachVR(), this.controller1 = e || null, this.controller2 = t || null, this.controllerGrip1 = i || null, this.controllerGrip2 = s || null, this.hand1 = n || null, this.hand2 = o || null, this.controller1 && this.controller1.addEventListener("selectend", this._boundControllerSelectEnd), this.controller2 && this.controller2.addEventListener("selectend", this._boundControllerSelectEnd), this.hand1 && this.hand1.addEventListener("pinchend", this._boundHandPinchEnd), this.hand2 && this.hand2.addEventListener("pinchend", this._boundHandPinchEnd);
  }
  detachVR() {
    this.controller1 && this.controller1.removeEventListener("selectend", this._boundControllerSelectEnd), this.controller2 && this.controller2.removeEventListener("selectend", this._boundControllerSelectEnd), this.hand1 && this.hand1.removeEventListener("pinchend", this._boundHandPinchEnd), this.hand2 && this.hand2.removeEventListener("pinchend", this._boundHandPinchEnd), this.controller1 = null, this.controller2 = null, this.controllerGrip1 = null, this.controllerGrip2 = null, this.hand1 = null, this.hand2 = null, this.hideVRPanel();
  }
  getAnnotations() {
    return this.annotations.map((e) => this._annotationToSerializable(e));
  }
  getExportData(e = {}) {
    const t = (/* @__PURE__ */ new Date()).toISOString();
    return {
      type: "belowjs-annotations",
      version: Bh,
      modelKey: this.modelKey,
      metadata: {
        ...this.datasetMetadata,
        ...e,
        exportedAt: t
      },
      annotations: this.getAnnotations()
    };
  }
  downloadAnnotations(e = "annotations.json", t = {}) {
    const i = this.getExportData(t);
    if (typeof window < "u" && window.Blob && window.URL && typeof document < "u") {
      const s = new window.Blob([JSON.stringify(i, null, 2)], { type: "application/json" }), n = window.URL.createObjectURL(s), o = document.createElement("a");
      o.href = n, o.download = Yi(e).endsWith(".json") ? Yi(e) : `${Yi(e)}.json`, document.body.appendChild(o), o.click(), document.body.removeChild(o), window.URL.revokeObjectURL(n);
    }
    return i;
  }
  update() {
    if (this._updateMarkerSizingMode(), this._updatePanelVisibility(), this._isVRPresenting() && this.activeIndex >= 0 && this.activeIndex < this.annotations.length) {
      const e = this.annotations[this.activeIndex];
      e && this._positionVRPanel(e);
    }
  }
  dispose() {
    if (this.clearAnnotations(), this.panel && this.panel.parentNode && this.panel.parentNode.removeChild(this.panel), this.panel = null, this.editor && this.editor.parentNode && this.editor.parentNode.removeChild(this.editor), this.editor = null, this.vrPanelSprite && (this.vrPanelSprite.parent && this.vrPanelSprite.parent.remove(this.vrPanelSprite), this.vrPanelSprite.material && (this.vrPanelSprite.material.map && this.vrPanelSprite.material.map.dispose(), this.vrPanelSprite.material.dispose()), this.vrPanelSprite = null), this.vrPanelTexture = null, this.vrPanelCanvas = null, this.renderer && this.renderer.domElement) {
      const e = this.renderer.domElement;
      e.removeEventListener("mousedown", this._boundMouseDown, !1), e.removeEventListener("mousemove", this._boundMouseMove, !1), e.removeEventListener("mouseup", this._boundMouseUp, !1), e.removeEventListener("click", this._boundCanvasClickCapture, !0), e.removeEventListener("contextmenu", this._boundCanvasContextMenu, !0);
    }
    typeof window < "u" && (window.removeEventListener("keydown", this._boundKeyDown), window.removeEventListener("pointerdown", this._boundWindowPointerDown, !0), window.annotationSystem === this && (window.annotationSystem = void 0)), this.contextMenu && this.contextMenu.parentNode && this.contextMenu.parentNode.removeChild(this.contextMenu), this.contextMenu = null, this.detachVR();
  }
}
class Ss {
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
    return new Ss(e, t);
  }
}
class Th {
  constructor(e) {
    this.scene = e, this.particleBounds = {
      min: new f.Vector3(-50, -25, -50),
      max: new f.Vector3(50, 25, 50)
    }, this.particleCount = 1750, this.densityMultiplier = 1, this.createParticleSystem();
  }
  calculateParticleCount(e) {
    const t = new f.Vector3();
    e.getSize(t);
    const s = t.clone().multiplyScalar(2.5), n = s.x * s.y * s.z, o = Math.round(n * 0.01 * this.densityMultiplier);
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
    const t = new f.Box3(this.particleBounds.min, this.particleBounds.max), i = this.calculateParticleCount(t);
    this.particles && (this.scene.remove(this.particles), this.particles.geometry && this.particles.geometry.dispose(), this.particles.material && this.particles.material.dispose(), this.particles = null), this.particleCount = i, this.createParticleSystem(), this.enable();
  }
  createParticleSystem() {
    const e = new Float32Array(this.particleCount * 3), t = new Float32Array(this.particleCount * 3), i = new Float32Array(this.particleCount);
    this.initializeParticleData(e, t, i);
    const s = new f.BufferGeometry(), n = new Float32Array(this.particleCount);
    for (let o = 0; o < this.particleCount; o++)
      n[o] = o;
    s.setAttribute("position", new f.BufferAttribute(e, 3)), s.setAttribute("originalSize", new f.BufferAttribute(i, 1)), s.setAttribute("velocity", new f.BufferAttribute(t, 3)), s.setAttribute("particleIndex", new f.BufferAttribute(n, 1)), this.originalMaterial = this.createParticleMaterial(), this.particles = new f.Points(s, this.originalMaterial), this.particles.visible = !1, this.scene.add(this.particles);
  }
  /**
   * Initialize particle data arrays
   */
  initializeParticleData(e, t, i) {
    for (let s = 0; s < this.particleCount; s++) {
      const n = s * 3;
      e[n] = this.particleBounds.min.x + Math.random() * (this.particleBounds.max.x - this.particleBounds.min.x), e[n + 1] = this.particleBounds.min.y + Math.random() * (this.particleBounds.max.y - this.particleBounds.min.y), e[n + 2] = this.particleBounds.min.z + Math.random() * (this.particleBounds.max.z - this.particleBounds.min.z);
      const o = 1e-5, r = -5e-6, l = 5e-6;
      t[n] = o + (Math.random() - 0.5) * 2e-5, t[n + 1] = r + (-Math.random() * 1e-5 - 5e-6), t[n + 2] = l + (Math.random() - 0.5) * 2e-5;
      const c = Math.random();
      c < 0.7 ? i[s] = 75e-4 + Math.random() * 5e-3 : c < 0.9 ? i[s] = 0.0125 + Math.random() * 75e-4 : i[s] = 0.02 + Math.random() * 0.01;
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
    const s = new f.CanvasTexture(e);
    return s.needsUpdate = !0, new f.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointTexture: { value: s },
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
    const t = new f.Box3().setFromObject(e), i = t.getSize(new f.Vector3()), s = t.getCenter(new f.Vector3()), o = i.clone().multiplyScalar(2.5 * 0.5);
    this.particleBounds.min.copy(s).sub(o), this.particleBounds.max.copy(s).add(o);
    const r = this.calculateParticleCount(new f.Box3(this.particleBounds.min, this.particleBounds.max));
    Math.abs(r - this.particleCount) > this.particleCount * 0.2 ? (this.particles && (this.scene.remove(this.particles), this.particles.geometry && this.particles.geometry.dispose(), this.particles.material && this.particles.material.dispose(), this.particles = null), this.particleCount = r, this.createParticleSystem()) : this.redistributeParticles();
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
class Qh {
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
    this.controllerSpotlight = new f.SpotLight(
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
    this.controllerSpotlight.shadow.mapSize.width = s, this.controllerSpotlight.shadow.mapSize.height = s, this.controllerSpotlight.shadow.camera.near = 0.1, this.controllerSpotlight.shadow.camera.far = i, this.controllerSpotlight.shadow.camera.fov = e, this.controllerSpotlight.shadow.bias = -5e-4, this.controllerSpotlight.shadow.normalBias = 0.02, this.controllerSpotlight.shadow.radius = 4, this.controllerSpotlight.shadow.blurSamples = 10, this.scene.add(this.controllerSpotlight), this.spotlightTarget = new f.Object3D(), this.scene.add(this.spotlightTarget), this.controllerSpotlight.target = this.spotlightTarget;
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
    const t = new f.Vector3(), i = new f.Quaternion();
    e.getWorldPosition(t), e.getWorldQuaternion(i), this.controllerSpotlight.position.copy(t);
    const s = new f.Vector3(0, 0, -1);
    s.applyQuaternion(i);
    const n = t.clone().add(s.multiplyScalar(2));
    this.spotlightTarget.position.copy(n);
  }
  updateCameraPosition(e) {
    if (!this.controllerSpotlight || !this.spotlightTarget) return;
    this.controllerSpotlight.position.copy(e.position);
    const t = new f.Vector3(0, 0, -1);
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
class Rh {
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
  fadeLighting({ target: e, fromIntensity: t, toIntensity: i, fromColor: s, toColor: n, duration: o = 500, onComplete: r }) {
    if (this.isDisposed || !e) {
      r && r();
      return;
    }
    const l = Symbol("fade-animation");
    this.pendingAnimations.add(l);
    const c = performance.now(), h = i - t;
    let A, d;
    s !== void 0 && n !== void 0 && (A = new f.Color(s), d = new f.Color(n));
    const u = (p) => {
      if (!this.pendingAnimations.has(l) || this.isDisposed) {
        r && r();
        return;
      }
      try {
        const g = p - c, b = Math.min(g / o, 1), y = 1 - Math.pow(1 - b, 3);
        if (!e || this.scene && !this.scene.children.includes(e)) {
          this.pendingAnimations.delete(l), r && r();
          return;
        }
        e.intensity = t + h * y, A && d && e.color && e.color.lerpColors(A, d, y), b < 1 ? requestAnimationFrame(u) : (this.pendingAnimations.delete(l), r && r());
      } catch (g) {
        console.error("Error in lighting animation:", g), this.pendingAnimations.delete(l), r && r();
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
class Dh {
  constructor(e, t, i) {
    this.scene = e, this.renderer = t, this.camera = i, this.isDiveModeEnabled = !1, this.currentVRMode = null, this.lighting = new Rh(e), this.particles = new Th(e), this.torch = new Qh(e), this.isQuest2 = !1, this.isQuest3 = !1, this._fallbackHandedness = /* @__PURE__ */ new Map(), this.detectQuestDevice(), this.applyModeSettings();
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
          const n = s.gamepad, o = s.handedness;
          [4, 5].forEach((l) => {
            if (n.buttons[l]) {
              const c = n.buttons[l], h = `${o}-${l}`;
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
class Lh extends wt {
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
    const i = t.getSize(new f.Vector3()), s = Math.max(i.x, i.y, i.z);
    s > 0 && Number.isFinite(s) && (this.modelSize = Math.max(1, Math.min(1e4, s)));
  }
  update(e) {
    if (!this.enabled || !this.pointerLocked) return;
    if (this.renderer?.xr?.isPresenting) {
      this.exitFlyMode();
      return;
    }
    if (!this.camera) return;
    const t = this.modelSize / this.speedScale, s = (this.keys.shift ? this.boostSpeed : this.baseSpeed) * t, n = new f.Vector3();
    this.keys.w && (n.z -= 1), this.keys.s && (n.z += 1), this.keys.a && (n.x -= 1), this.keys.d && (n.x += 1), this.keys.q && (n.y -= 1), this.keys.e && (n.y += 1), n.lengthSq() > 0 && (n.normalize(), n.applyQuaternion(this.camera.quaternion), this.camera.position.addScaledVector(n, s * e), this._syncControlsTarget());
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
      const s = t.tagName;
      if (s === "INPUT" || s === "SELECT" || s === "TEXTAREA" || t.isContentEditable)
        return;
    }
    const i = e.key.toLowerCase();
    if (i in this.keys && (this.keys[i] = !0), e.shiftKey && (this.keys.shift = !0), e.shiftKey && (e.key === "`" || e.key === "~" || e.code === "Backquote")) {
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
class As extends wt {
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
      enableAnnotations: { type: "boolean", default: !0 },
      measurementTheme: { type: "string", default: "dark" },
      annotationCreatedBy: { type: "string", default: "" },
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
    this.config = new di(i).validate(t), this.options = this.config, this.currentModelKey = null, this.belowViewer = null, this.ui = {}, this.uiRoot = null, this.stereoUiMirror = null, this.stereoUiObserver = null, this.stereoUiSyncQueued = !1, this.stereoUiActive = !1, this.measurementSystem = null, this.annotationSystem = null, this.comfortGlyph = null, this.diveSystem = null, this.fullscreenButton = null, this.screenshotButton = null, this.flyControls = null, this.lastComfortMode = null, this._vrButtonWasVisible = !1, this.isLoading = !1, this.loadingMessage = "", this.loadingModelName = "", this.loadingPercentage = 0, this.lastManualLoadingMessage = "", this.stageOverrideActive = !1, this.vrUpdateLoop = null, this.lastRequestedModelKey = null, this.recoveryHandlers = null, this.recoveryTimer = null, this.recoveryCooldownMs = 1200, this.lastRecoveryAttemptAt = 0, this.recoveryAttempts = 0, this.maxRecoveryAttempts = 3, this.hadContextLoss = !1, this.isDisposed = !1, this.annotationCameraAnimation = null, this.cancelAnnotationCameraOnInput = null, this._annotationDebugGlobals = [], typeof window < "u" && (window.modelViewer = this, this.setupAnnotationDebugCommands()), this.init();
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
    if (this.belowViewer = new Ch(this.container, e), this.setupEventForwarding(), this.setupRecoveryHandlers(), this.belowViewer.on("initialized", () => {
      this.setupRecoveryHandlers(), this.setupFocusInteraction(), this._maybeAttachMeasurementSystem(), this._maybeAttachAnnotationSystem(), this._maybeAttachVRComfortGlyph(), this._maybeAttachDiveSystem(), this._maybeAttachScreenshotButton(), this._maybeAttachFullscreenButton(), this._maybeAttachFlyControls();
    }), this.belowViewer.isInitialized && (this.setupRecoveryHandlers(), this.setupFocusInteraction(), this._maybeAttachMeasurementSystem(), this._maybeAttachAnnotationSystem(), this._maybeAttachVRComfortGlyph(), this._maybeAttachDiveSystem(), this._maybeAttachScreenshotButton(), this._maybeAttachFullscreenButton(), this._maybeAttachFlyControls()), Object.keys(this.config.models).length > 0 && (this.createUI(), this.populateDropdown(), this.config.autoLoadFirst)) {
      const t = Object.keys(this.config.models)[0];
      setTimeout(() => this.loadModel(t), 100);
    }
  }
  _maybeAttachMeasurementSystem() {
    if (!this.config.enableMeasurement || this.measurementSystem) return;
    this.measurementSystem = new wh({
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
      const t = this.belowViewer.loadedModels[0].model, i = this.currentModelKey ? this.config.models[this.currentModelKey] : null;
      this.applyModelMeasurementConfig(i, t);
    }
  }
  _maybeAttachAnnotationSystem() {
    if (!this.config.enableAnnotations || this.annotationSystem) return;
    this.annotationSystem = new xh({
      scene: this.belowViewer.sceneManager.scene,
      camera: this.belowViewer.cameraManager.camera,
      renderer: this.belowViewer.renderer,
      controls: this.belowViewer.cameraManager.controls,
      uiParent: this.getUiContainer(),
      getRaycastInfo: (t) => this.getPointerRaycastInfo(t),
      getRaycastTargets: () => this.getAnnotationRaycastTargets(),
      getCameraSnapshot: () => this.captureCurrentCameraSnapshot(),
      onRequestNavigate: (t, i) => this.navigateToAnnotation(t, i),
      isHelperObject: (t) => this.isMeasurementHelper(t),
      createdBy: this.config.annotationCreatedBy,
      theme: this.config.measurementTheme
    });
    const e = () => this.annotationSystem && this.annotationSystem.update();
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
      this.measurementSystem.setRaycastTargets(t);
      return;
    }
    this.measurementSystem.setRaycastTargets([]);
  }
  async _maybeAttachVRComfortGlyph() {
    if (!this.config.enableVRComfortGlyph || this.comfortGlyph || !this.belowViewer.vrManager || !this.belowViewer.vrManager.vrCore || (await this.belowViewer.vrManager.vrCore.checkVRSupported(), !this.belowViewer.vrManager.vrCore.isVRSupported)) return;
    this.comfortGlyph = new Ss(this.belowViewer.vrManager, {
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
      As._isEditableTarget(s.target) || s.code === "KeyC" && (s.ctrlKey || s.metaKey) && (s.preventDefault(), this.comfortGlyph && this.comfortGlyph.toggle());
    }), window.addEventListener("beforeunload", () => this.comfortGlyph && this.comfortGlyph.dispose());
  }
  _maybeAttachDiveSystem() {
    if (!this.config.enableDiveSystem || this.diveSystem) return;
    this.diveSystem = new Dh(
      this.belowViewer.sceneManager.scene,
      this.belowViewer.renderer,
      this.belowViewer.cameraManager.camera
    ), setTimeout(() => {
      this.diveSystem.initializeToggleSwitch();
    }, 100), document.addEventListener("keydown", (t) => {
      if (!As._isEditableTarget(t.target)) {
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
    this.flyControls = new Lh({
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
    }, s = (o) => {
      o && typeof o.preventDefault == "function" && o.preventDefault(), this.hadContextLoss = !0;
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
    const e = this.belowViewer?.renderer, t = this.belowViewer?.sceneManager?.scene, i = this.belowViewer?.cameraManager?.camera;
    if (!(!e || !t || !i))
      try {
        const s = e.xr?.isPresenting;
        this.belowViewer?.stereoEnabled && !s && this.belowViewer?.stereoMode === "sbs" && typeof this.belowViewer.renderSbsStereo == "function" ? this.belowViewer.renderSbsStereo() : e.render(t, i);
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
      const i = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "").slice(0, -5), n = `${this.currentModelKey ? this.config.models[this.currentModelKey]?.name?.replace(/[^a-zA-Z0-9\-_]/g, "-") || this.currentModelKey.replace(/[^a-zA-Z0-9\-_]/g, "-") : "unknown"}-belowjs-${i}.png`, o = document.createElement("a");
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
    }), this.belowViewer.on("vr-movement-start", (e) => this.emit("vr-movement-start", e)), this.belowViewer.on("vr-movement-stop", (e) => this.emit("vr-movement-stop", e)), this.belowViewer.on("vr-movement-update", (e) => this.emit("vr-movement-update", e)), this.belowViewer.on("ar-session-start", (e) => {
      this.emit("ar-session-start", e), this.onARSessionStart();
    }), this.belowViewer.on("ar-session-end", (e) => {
      this.emit("ar-session-end", e), this.onARSessionEnd();
    });
  }
  attachXRInputsToAnnotations({ retryCount: e = 0 } = {}) {
    if (!this.annotationSystem || !this.belowViewer?.renderer?.xr) return;
    const t = this.belowViewer.renderer.xr;
    if (typeof t.getController != "function") return;
    const i = t.getController(0), s = t.getController(1), n = t.getControllerGrip ? t.getControllerGrip(0) : void 0, o = t.getControllerGrip ? t.getControllerGrip(1) : void 0, r = t.getHand ? t.getHand(0) : void 0, l = t.getHand ? t.getHand(1) : void 0;
    this.annotationSystem.attachVR({
      controller1: i,
      controller2: s,
      controllerGrip1: n,
      controllerGrip2: o,
      hand1: r,
      hand2: l
    }), e < 8 && (r && r.joints || l && l.joints || i || s || setTimeout(() => this.attachXRInputsToAnnotations({ retryCount: e + 1 }), 180));
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
    }, 100), this.annotationSystem && setTimeout(() => this.attachXRInputsToAnnotations(), 100);
  }
  onVRSessionEnd() {
    this.ui.info && this.config.showInfo && (this.ui.info.style.display = "block"), this.ui.selector && (this.ui.selector.style.pointerEvents = "auto", this.ui.selector.style.opacity = "1"), this.vrUpdateLoop && (cancelAnimationFrame(this.vrUpdateLoop), this.vrUpdateLoop = null), this.updateVRLoadingIndicator(), this.measurementSystem && (this.measurementSystem.controller1 = null, this.measurementSystem.controller2 = null, this.measurementSystem.controllerGrip1 = null, this.measurementSystem.controllerGrip2 = null, this.measurementSystem.isVR = !1, this.measurementSystem.ghostSpheres && (this.measurementSystem.ghostSpheres.left && (this.measurementSystem.ghostSpheres.left.visible = !1), this.measurementSystem.ghostSpheres.right && (this.measurementSystem.ghostSpheres.right.visible = !1))), this.annotationSystem && typeof this.annotationSystem.detachVR == "function" && (this.annotationSystem.detachVR(), this.annotationSystem.update());
  }
  onARSessionStart() {
    this.ui.info && (this.ui.info.style.display = "none"), this.annotationSystem && setTimeout(() => this.attachXRInputsToAnnotations(), 100);
  }
  onARSessionEnd() {
    this.ui.info && this.config.showInfo && (this.ui.info.style.display = "block"), this.annotationSystem && typeof this.annotationSystem.detachVR == "function" && (this.annotationSystem.detachVR(), this.annotationSystem.update());
  }
  onVRModeToggle() {
  }
  setupFocusInteraction() {
    const e = this.belowViewer.renderer.domElement, t = 300;
    let i = 0, s = !1;
    const n = { x: 0, y: 0 }, o = 5, r = (A) => {
      s = !1, n.x = A.clientX, n.y = A.clientY;
    }, l = (A) => {
      if (!s) {
        const d = Math.abs(A.clientX - n.x), u = Math.abs(A.clientY - n.y);
        (d > o || u > o) && (s = !0);
      }
    }, c = () => {
      setTimeout(() => {
        s = !1;
      }, 10);
    }, h = (A) => {
      if (A.defaultPrevented) return;
      const d = Date.now(), u = d - i < t;
      i = d, !(this.belowViewer.renderer.xr?.isPresenting || s) && (this.measurementSystem && this.measurementSystem.desktopMeasurementMode || u && this.focusOnPoint(A));
    };
    e.addEventListener("mousedown", r), e.addEventListener("mousemove", l), e.addEventListener("mouseup", c), e.addEventListener("click", h), this.focusEventHandlers = {
      onMouseDown: r,
      onMouseMove: l,
      onMouseUp: c,
      onMouseClick: h
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
    const o = this.belowViewer.cameraManager.getCamera();
    let r = o, l = s / i.width * 2 - 1;
    const c = -(n / i.height * 2 - 1), h = this.belowViewer.getStereoSettings?.();
    if (h?.enabled === !0 && h?.mode === "sbs" && this.belowViewer.stereoCamera) {
      const A = this.belowViewer.stereoCamera, d = i.width / 2, u = s <= d, p = u ? d : i.width - d, g = u ? s : s - d;
      p > 0 && (l = g / p * 2 - 1), A.aspect = i.height > 0 ? d / i.height : 1, A.update(o), r = u ? A.cameraL : A.cameraR;
    }
    return {
      mouse: { x: l, y: c },
      camera: r
    };
  }
  focusOnPoint(e) {
    if (e && e.defaultPrevented)
      return;
    const t = this.getPointerRaycastInfo(e), i = t?.mouse, s = t?.camera;
    if (!i || !s)
      return;
    const n = new f.Raycaster();
    n.setFromCamera(i, s);
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
    const i = document.createElement("div");
    i.className = "model-selector below-panel", e.appendChild(i);
    const s = document.createElement("select");
    if (s.className = "model-selector__dropdown", i.appendChild(s), this.config.enableDiveSystem) {
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
      const h = document.createElement("div");
      h.className = "toggle-icon", h.textContent = "📋";
      const A = document.createElement("div");
      A.className = "toggle-text", A.textContent = "Survey", c.appendChild(h), c.appendChild(A);
      const d = document.createElement("div");
      d.className = "toggle-option right";
      const u = document.createElement("div");
      u.className = "toggle-icon", u.textContent = "🌊";
      const p = document.createElement("div");
      p.className = "toggle-text", p.textContent = "Dive", d.appendChild(u), d.appendChild(p), o.appendChild(c), o.appendChild(d), n.appendChild(o), i.appendChild(n);
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
    const o = document.createElement("div");
    o.className = "toggle-icon", o.textContent = "📋";
    const r = document.createElement("div");
    r.className = "toggle-text", r.textContent = "Survey", n.appendChild(o), n.appendChild(r);
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
  createVRLoadingIndicator(e = "Loading...", t = "", i = 0) {
    const s = (window.devicePixelRatio || 1) * 2, n = 512, o = 256, r = n * s, l = o * s;
    this.vrLoadingCanvas || (this.vrLoadingCanvas = document.createElement("canvas")), (this.vrLoadingCanvas.width !== r || this.vrLoadingCanvas.height !== l) && (this.vrLoadingCanvas.width = r, this.vrLoadingCanvas.height = l);
    const c = this.vrLoadingCanvas.getContext("2d");
    c.setTransform(1, 0, 0, 1, 0, 0), c.clearRect(0, 0, r, l), c.save(), c.scale(s, s);
    const h = n / 2, A = o / 2, d = 25, u = A - 40;
    if (c.shadowColor = "rgba(0, 0, 0, 0.8)", c.shadowBlur = 3, c.strokeStyle = "rgba(255, 255, 255, 0.3)", c.lineWidth = 3, c.beginPath(), c.arc(h, u, d, 0, Math.PI * 2), c.stroke(), c.shadowColor = "transparent", c.shadowBlur = 0, i > 0) {
      const p = i / 100 * Math.PI * 2;
      c.strokeStyle = "#ffffff", c.lineWidth = 3, c.beginPath(), c.arc(h, u, d, -Math.PI / 2, -Math.PI / 2 + p), c.stroke();
    }
    if (c.fillStyle = "white", c.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', c.textAlign = "center", c.textBaseline = "middle", c.shadowColor = "rgba(0, 0, 0, 0.8)", c.shadowBlur = 2, c.shadowOffsetX = 1, c.shadowOffsetY = 1, c.fillText(`${Math.round(i)}%`, h, u), t && (c.fillStyle = "white", c.font = '600 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', c.textAlign = "center", c.textBaseline = "middle", c.shadowColor = "rgba(0, 0, 0, 0.8)", c.shadowBlur = 4, c.shadowOffsetX = 1, c.shadowOffsetY = 1, c.fillText(t, h, A + 20)), c.fillStyle = "rgba(255, 255, 255, 0.9)", c.font = '400 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', c.shadowColor = "rgba(0, 0, 0, 0.8)", c.shadowBlur = 3, c.shadowOffsetX = 1, c.shadowOffsetY = 1, c.fillText(e, h, A + 50), c.restore(), this.vrLoadingTexture ? this.vrLoadingTexture.needsUpdate = !0 : (this.vrLoadingTexture = new f.CanvasTexture(this.vrLoadingCanvas), this.vrLoadingTexture.minFilter = f.LinearFilter, this.vrLoadingTexture.magFilter = f.LinearFilter), !this.vrLoadingSprite) {
      const p = new f.SpriteMaterial({
        map: this.vrLoadingTexture,
        depthTest: !1,
        depthWrite: !1,
        transparent: !0
      });
      this.vrLoadingSprite = new f.Sprite(p);
      const g = 0.7, b = n / o;
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
    this.lastRequestedModelKey = e, this.currentModelKey = e, this.hadContextLoss = !1, this.recoveryTimer && (clearTimeout(this.recoveryTimer), this.recoveryTimer = null), this.ui.dropdown && (this.ui.dropdown.value = e), this.showLoading("Preparing to load...", t.name || e), this.belowViewer?.getLoadedModels()?.length > 0 && this.setManualLoadingMessage("Cleaning up previous model..."), document.title = `BelowJS – ${t.name || e}`;
    try {
      this.measurementSystem && (this.measurementSystem.clearUnifiedMeasurement(), this.measurementSystem.clearLegacyVRMeasurement(), this.measurementSystem.clearLegacyDesktopMeasurement()), this.annotationSystem && (this.annotationSystem.clearAnnotations(), this.annotationSystem.setRaycastTargets([]), this.cancelAnnotationCameraAnimation()), this.belowViewer.clearModels(), this.belowViewer.vrManager && (this.belowViewer.vrManager.stopMovement(), this.belowViewer.vrManager.resetTeleportState()), await new Promise((o) => setTimeout(o, 50));
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
        this.applyInitialPositions(t, n), t.type === "tileset" && !o && !this.belowViewer.isVRPresenting() && this.belowViewer.frameModel(n), this.hideLoading(), this.updateStatus(`Loaded: ${t.name || e}`), this.applyModelMeasurementConfig(t, n), await this.applyModelAnnotations(t, e, n), this.modelReady = !0, this.recoveryAttempts = 0, this.emit("model-switched", { modelKey: e, model: n, config: t }), this.emit("modelLoaded", { modelKey: e, model: n, config: t });
      } else this.currentModelKey === e && this.queueRecovery("empty-load-result", { forceReload: !0, delayMs: 350 });
    } catch (n) {
      n.message !== "Loading cancelled" && (console.error("Failed to load model:", n), this.hideLoading(), this.updateStatus(`Error loading ${t.name || e}`), this.applyModelMeasurementConfig(t, null), await this.applyModelAnnotations(t, e, null), this.currentModelKey === e && (typeof document > "u" || !document.hidden) && this.queueRecovery("model-load-error", { forceReload: !0, delayMs: 500 }));
    }
  }
  applyInitialPositions(e, t) {
    const i = e.initialPositions;
    if (!i) return;
    const s = this.belowViewer.getVRManager();
    s && s.setInitialPositions(i);
    const n = this.belowViewer.isVRPresenting();
    if (n && i.vr) {
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
    } else if (!n && i.desktop) {
      const o = this.belowViewer.getCamera(), r = this.belowViewer.cameraManager.controls;
      o && r && (o.position.set(
        i.desktop.camera.x,
        i.desktop.camera.y,
        i.desktop.camera.z
      ), r.target.set(
        i.desktop.target.x,
        i.desktop.target.y,
        i.desktop.target.z
      ), r.update());
    }
  }
  getAnnotationRaycastTargets() {
    if (this.measurementSystem && Array.isArray(this.measurementSystem._raycastTargets) && this.measurementSystem._raycastTargets.length > 0)
      return this.measurementSystem._raycastTargets;
    const e = this.belowViewer?.getLoadedModels?.() || [];
    if (e.length > 0 && e[e.length - 1]?.model)
      return [e[e.length - 1].model];
    const t = this.belowViewer?.sceneManager?.scene;
    return t ? t.children : [];
  }
  captureCurrentCameraSnapshot() {
    const e = this.belowViewer?.cameraManager?.camera, t = this.belowViewer?.cameraManager?.controls, i = this.belowViewer?.dolly, s = {};
    return e && t && (s.desktop = {
      camera: {
        x: Number(e.position.x.toFixed(4)),
        y: Number(e.position.y.toFixed(4)),
        z: Number(e.position.z.toFixed(4))
      },
      target: {
        x: Number(t.target.x.toFixed(4)),
        y: Number(t.target.y.toFixed(4)),
        z: Number(t.target.z.toFixed(4))
      }
    }), i && (s.vr = {
      dolly: {
        x: Number(i.position.x.toFixed(4)),
        y: Number(i.position.y.toFixed(4)),
        z: Number(i.position.z.toFixed(4))
      },
      rotation: {
        x: Number(i.rotation.x.toFixed(4)),
        y: Number(i.rotation.y.toFixed(4)),
        z: Number(i.rotation.z.toFixed(4))
      }
    }), s;
  }
  cancelAnnotationCameraAnimation() {
    this.annotationCameraAnimation && (cancelAnimationFrame(this.annotationCameraAnimation), this.annotationCameraAnimation = null), this.cancelAnnotationCameraOnInput && this.belowViewer?.cameraManager?.controls && (this.belowViewer.cameraManager.controls.removeEventListener("start", this.cancelAnnotationCameraOnInput), this.cancelAnnotationCameraOnInput = null);
  }
  animateDesktopCameraTo(e, t, i = 950) {
    const s = this.belowViewer?.cameraManager?.camera, n = this.belowViewer?.cameraManager?.controls;
    if (!s || !n) return;
    const o = (p) => {
      if (!p) return null;
      if (p.isVector3) return p.clone();
      const g = Number(p.x), b = Number(p.y), y = Number(p.z);
      return !Number.isFinite(g) || !Number.isFinite(b) || !Number.isFinite(y) ? null : new f.Vector3(g, b, y);
    }, r = o(e), l = o(t);
    if (!r || !l) return;
    this.cancelAnnotationCameraAnimation();
    const c = n.target.clone(), h = s.position.clone(), A = performance.now(), d = () => this.cancelAnnotationCameraAnimation();
    this.cancelAnnotationCameraOnInput = d, n.addEventListener("start", d, { once: !0 });
    const u = () => {
      const p = performance.now() - A, g = Math.min(p / i, 1), b = 1 - Math.pow(1 - g, 3);
      n.target.lerpVectors(c, l, b), s.position.lerpVectors(h, r, b), n.update(), g < 1 ? this.annotationCameraAnimation = requestAnimationFrame(u) : this.cancelAnnotationCameraAnimation();
    };
    this.annotationCameraAnimation = requestAnimationFrame(u);
  }
  navigateToAnnotation(e, t = {}) {
    if (!e || this.belowViewer?.renderer?.xr?.isPresenting) return;
    const i = e.camera?.desktop?.camera, s = e.camera?.desktop?.target;
    if (i && s) {
      this.animateDesktopCameraTo(i, s, 950);
      return;
    }
    e.position && this.belowViewer?.cameraManager && this.belowViewer.cameraManager.focusOn(e.position);
  }
  async resolveModelAnnotations(e) {
    const t = e?.annotations;
    if (!t) return null;
    if (typeof t == "string") {
      const i = await fetch(t);
      if (!i.ok)
        throw new Error(`Failed to load annotations from ${t}: ${i.status}`);
      return i.json();
    }
    return t;
  }
  async applyModelAnnotations(e, t, i) {
    if (!this.annotationSystem) return;
    i ? this.annotationSystem.setRaycastTargets(i) : this.annotationSystem.setRaycastTargets([]);
    const s = {
      createdBy: this.config.annotationCreatedBy || "",
      modelName: e?.name || t || ""
    };
    try {
      const n = await this.resolveModelAnnotations(e);
      n ? this.annotationSystem.setAnnotations(n, { modelKey: t, metadata: s }) : this.annotationSystem.setAnnotations([], { modelKey: t, metadata: s });
    } catch (n) {
      console.warn("[ModelViewer] Failed to load annotations", n), this.annotationSystem.setAnnotations([], { modelKey: t, metadata: s });
    }
  }
  setAnnotations(e, t = {}) {
    return this.annotationSystem ? this.annotationSystem.setAnnotations(e, {
      modelKey: this.currentModelKey,
      metadata: {
        createdBy: this.config.annotationCreatedBy || "",
        ...t.metadata || {}
      }
    }) : [];
  }
  getAnnotations() {
    return this.annotationSystem ? this.annotationSystem.getAnnotations() : [];
  }
  downloadAnnotations(e = null, t = {}) {
    if (!this.annotationSystem) return null;
    const i = this.currentModelKey || "annotations", s = e || `${i}-annotations.json`;
    return this.annotationSystem.downloadAnnotations(s, {
      createdBy: this.config.annotationCreatedBy || "",
      ...t
    });
  }
  setAnnotationEditMode(e) {
    return this.annotationSystem ? this.annotationSystem.setEditMode(e) : !1;
  }
  toggleAnnotationEditMode() {
    return this.annotationSystem ? this.annotationSystem.toggleEditMode() : !1;
  }
  isAnnotationEditMode() {
    return this.annotationSystem ? this.annotationSystem.isEditModeEnabled() : !1;
  }
  openAnnotation(e, t = {}) {
    return this.annotationSystem ? this.annotationSystem.openAnnotation(e, t) : null;
  }
  openAnnotationById(e, t = {}) {
    return this.annotationSystem ? this.annotationSystem.openAnnotationById(e, t) : null;
  }
  openAnnotationNumber(e, t = {}) {
    const i = Number(e);
    return Number.isFinite(i) ? this.openAnnotation(i - 1, t) : null;
  }
  nextAnnotation(e = {}) {
    return this.annotationSystem ? this.annotationSystem.nextAnnotation(e) : null;
  }
  previousAnnotation(e = {}) {
    return this.annotationSystem ? this.annotationSystem.previousAnnotation(e) : null;
  }
  getAnnotationIndexById(e) {
    return this.annotationSystem ? this.annotationSystem.getAnnotationIndexById(e) : -1;
  }
  getAnnotationById(e) {
    return this.annotationSystem ? this.annotationSystem.getAnnotationById(e) : null;
  }
  addAnnotation(e, t = {}) {
    return this.annotationSystem ? this.annotationSystem.addAnnotation(e, t) : null;
  }
  createAnnotationAtPosition(e, t = {}) {
    return this.annotationSystem ? this.annotationSystem.createAnnotationAtPoint(e, t) : null;
  }
  removeAnnotation(e) {
    return this.annotationSystem ? this.annotationSystem.removeAnnotation(e) : !1;
  }
  removeAnnotationById(e) {
    return this.annotationSystem ? this.annotationSystem.removeAnnotationById(e) : !1;
  }
  removeAnnotationNumber(e) {
    const t = Number(e);
    return Number.isFinite(t) ? this.removeAnnotation(t - 1) : !1;
  }
  setupAnnotationDebugCommands() {
    typeof window > "u" || this._annotationDebugGlobals.length > 0 || (window.annotationEdit = (e) => {
      if (typeof e == "boolean") {
        const i = this.setAnnotationEditMode(e);
        return console.log(`[ModelViewer] Annotation edit mode: ${i ? "ON" : "OFF"}`), i;
      }
      const t = this.toggleAnnotationEditMode();
      return console.log(`[ModelViewer] Annotation edit mode: ${t ? "ON" : "OFF"}`), t;
    }, window.annotationOpen = (e) => this.openAnnotation(Number(e), { navigate: !0 }), window.annotationOpenId = (e) => this.openAnnotationById(e, { navigate: !0 }), window.annotationOpenNumber = (e) => this.openAnnotationNumber(e, { navigate: !0 }), window.annotationNext = () => this.nextAnnotation({ navigate: !0 }), window.annotationPrev = () => this.previousAnnotation({ navigate: !0 }), window.annotationAdd = (e = {}, t = {}) => this.addAnnotation(e, t), window.annotationCreateAt = (e, t = {}) => this.createAnnotationAtPosition(e, t), window.annotationRemove = (e) => this.removeAnnotation(Number(e)), window.annotationRemoveId = (e) => this.removeAnnotationById(e), window.annotationRemoveNumber = (e) => this.removeAnnotationNumber(e), window.annotationExport = (e = null, t = {}) => this.downloadAnnotations(e, t), window.annotationDownload = window.annotationExport, window.annotationById = (e) => this.getAnnotationById(e), window.annotationIndexOf = (e) => this.getAnnotationIndexById(e), window.annotations = () => this.getAnnotations(), window.annotationCamera = () => this.captureCurrentCameraSnapshot(), window.annotationHelp = () => {
      console.log("🧭 Annotation debug commands:"), console.log("  annotationEdit(true|false?)  - Toggle or set edit mode"), console.log("  annotationOpen(index)         - Open annotation by zero-based index"), console.log("  annotationOpenNumber(number)  - Open annotation by one-based marker number"), console.log("  annotationOpenId(id)          - Open annotation by id"), console.log("  annotationNext() / annotationPrev()"), console.log("  annotationAdd(annotation)     - Add annotation from object"), console.log("  annotationCreateAt({x,y,z})   - Add annotation at world position"), console.log("  annotationRemove(index)       - Remove annotation by zero-based index"), console.log("  annotationRemoveNumber(n)     - Remove annotation by one-based marker number"), console.log("  annotationRemoveId(id)        - Remove annotation by id"), console.log("  annotationById(id)            - Get annotation data by id"), console.log("  annotationIndexOf(id)         - Get zero-based index for id"), console.log("  annotationExport(filename?)   - Download annotations JSON"), console.log("  annotationCamera()            - Capture current camera snapshot"), console.log("  annotations()                 - List current annotations"), console.log(""), console.log("Edit mode workflow:"), console.log("  1) annotationEdit(true)"), console.log('  2) Right-click model in edit mode, then choose "Create Marker Here"'), console.log('  3) annotationExport("my-model-annotations.json")');
    }, this._annotationDebugGlobals = [
      "annotationEdit",
      "annotationOpen",
      "annotationOpenId",
      "annotationOpenNumber",
      "annotationNext",
      "annotationPrev",
      "annotationAdd",
      "annotationCreateAt",
      "annotationRemove",
      "annotationRemoveId",
      "annotationRemoveNumber",
      "annotationExport",
      "annotationDownload",
      "annotationById",
      "annotationIndexOf",
      "annotations",
      "annotationCamera",
      "annotationHelp"
    ]);
  }
  cleanupAnnotationDebugCommands() {
    typeof window > "u" || (this._annotationDebugGlobals.forEach((e) => {
      window[e] && delete window[e];
    }), this._annotationDebugGlobals = []);
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
    const e = this.belowViewer.cameraManager.camera, t = 2, i = new f.Vector3();
    e.getWorldDirection(i);
    const s = new f.Vector3();
    e.getWorldPosition(s);
    const n = new f.Vector3();
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
          const n = 2 * Math.PI * 20, o = n - t / 100 * n;
          s.style.strokeDashoffset = o;
        }
      }
      this.updateVRLoadingIndicator();
    }
  }
  onModelLoaded({ model: e }) {
    const t = this.currentModelKey ? this.config.models[this.currentModelKey] : null;
    this.applyModelMeasurementConfig(t, e), this.annotationSystem && e && this.annotationSystem.setRaycastTargets(e), this.flyControls && this.flyControls.setModelSizeFromObject(e);
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
    if (this.isDisposed = !0, this.cancelAnnotationCameraAnimation(), this.recoveryTimer && (clearTimeout(this.recoveryTimer), this.recoveryTimer = null), this.recoveryHandlers) {
      const { canvas: e, onVisibilityChange: t, onWindowFocus: i, onContextLost: s, onContextRestored: n } = this.recoveryHandlers;
      typeof document < "u" && t && document.removeEventListener("visibilitychange", t), typeof window < "u" && i && window.removeEventListener("focus", i), e && s && e.removeEventListener("webglcontextlost", s, !1), e && n && e.removeEventListener("webglcontextrestored", n, !1), this.recoveryHandlers = null;
    }
    if (typeof window < "u" && window.modelViewer === this && (window.modelViewer = null), this.cleanupAnnotationDebugCommands(), this.focusEventHandlers && this.belowViewer?.renderer?.domElement) {
      const e = this.belowViewer.renderer.domElement;
      e.removeEventListener("mousedown", this.focusEventHandlers.onMouseDown), e.removeEventListener("mousemove", this.focusEventHandlers.onMouseMove), e.removeEventListener("mouseup", this.focusEventHandlers.onMouseUp), e.removeEventListener("click", this.focusEventHandlers.onMouseClick), this.focusEventHandlers = null;
    }
    this.measurementSystem && (this.measurementSystem.dispose(), this.measurementSystem = null), this.annotationSystem && (this.annotationSystem.dispose(), this.annotationSystem = null), this.comfortGlyph && (this.comfortGlyph.dispose(), this.comfortGlyph = null), this.diveSystem && (this.diveSystem.dispose(), this.diveSystem = null, typeof window < "u" && window.diveSystem === this.diveSystem && (window.diveSystem = null)), this.fullscreenButton && (this.fullscreenButton.remove(), this.fullscreenButton = null, document.removeEventListener("fullscreenchange", this._onFullscreenChange)), this.screenshotButton && (this.screenshotButton.remove(), this.screenshotButton = null), this.stereoUiObserver && (this.stereoUiObserver.disconnect(), this.stereoUiObserver = null), this.stereoUiMirror && (this.stereoUiMirror.remove(), this.stereoUiMirror = null), this.belowViewer && this.belowViewer.dispose(), this.removeAllListeners();
  }
}
export {
  xh as AnnotationSystem,
  Ch as BelowViewer,
  ya as Camera,
  di as ConfigValidator,
  wt as EventSystem,
  Lh as FlyControls,
  Vn as Line2,
  hs as LineGeometry,
  ni as LineMaterial,
  Z as ModelLoader,
  As as ModelViewer,
  oa as Scene,
  hh as VRManager
};
