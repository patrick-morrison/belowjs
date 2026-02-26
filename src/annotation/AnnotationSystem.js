import * as THREE from 'three';

const ANNOTATION_SCHEMA_VERSION = 1;
const DEFAULT_CONTENT_TYPE = 'text';

function roundNumber(value, precision = 4) {
  if (!Number.isFinite(value)) return 0;
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}

function toPointObject(vector) {
  return {
    x: roundNumber(vector.x),
    y: roundNumber(vector.y),
    z: roundNumber(vector.z)
  };
}

function asVector3(value) {
  if (!value) return null;
  if (value.isVector3) return value.clone();
  const x = Number(value.x);
  const y = Number(value.y);
  const z = Number(value.z);
  if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) {
    return null;
  }
  return new THREE.Vector3(x, y, z);
}

function sanitizeFilename(name) {
  const safe = String(name || 'annotations')
    .trim()
    .replace(/[^a-zA-Z0-9._-]/g, '-');
  return safe.length > 0 ? safe : 'annotations';
}

function generateAnnotationId() {
  const random = Math.random().toString(36).slice(2, 8);
  return `ann-${Date.now().toString(36)}-${random}`;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function markdownToHtml(markdownText) {
  let html = escapeHtml(markdownText || '');

  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  html = html.replace(/\n/g, '<br>');

  return html;
}

function sanitizeHtml(html) {
  if (typeof window === 'undefined') {
    return escapeHtml(html);
  }

  const domParser = window.DOMParser ? new window.DOMParser() : null;
  if (!domParser) {
    return escapeHtml(html);
  }

  const doc = domParser.parseFromString(`<div>${html || ''}</div>`, 'text/html');
  const root = doc.body.firstElementChild || doc.body;

  root.querySelectorAll('script,style,iframe,object,embed,link,meta').forEach((node) => node.remove());

  root.querySelectorAll('*').forEach((node) => {
    const attributes = Array.from(node.attributes || []);
    attributes.forEach((attr) => {
      const attrName = attr.name.toLowerCase();
      if (attrName.startsWith('on') || attrName === 'style') {
        node.removeAttribute(attr.name);
      }
      if (attrName === 'href') {
        const href = String(attr.value || '').trim().toLowerCase();
        if (href.startsWith(`java${'script:'}`)) {
          node.removeAttribute(attr.name);
        }
      }
    });
  });

  return root.innerHTML;
}

function htmlToPlainText(html) {
  if (typeof document === 'undefined') {
    return String(html || '');
  }
  const node = document.createElement('div');
  node.innerHTML = html || '';
  return (node.textContent || '').replace(/\s+/g, ' ').trim();
}

/**
 * AnnotationSystem - Authored marker + content workflow for desktop and VR.
 */
export class AnnotationSystem {
  constructor({
    scene,
    camera,
    renderer,
    controls,
    uiParent,
    getRaycastInfo,
    getRaycastTargets,
    getCameraSnapshot,
    onRequestNavigate,
    isHelperObject,
    createdBy = '',
    theme = 'dark'
  }) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.controls = controls;
    this.uiParent = uiParent || null;

    this.getRaycastInfo = typeof getRaycastInfo === 'function' ? getRaycastInfo : null;
    this.getRaycastTargets = typeof getRaycastTargets === 'function' ? getRaycastTargets : null;
    this.getCameraSnapshot = typeof getCameraSnapshot === 'function' ? getCameraSnapshot : null;
    this.onRequestNavigate = typeof onRequestNavigate === 'function' ? onRequestNavigate : null;
    this.isHelperObject = typeof isHelperObject === 'function' ? isHelperObject : () => false;

    this.theme = theme;
    this.defaultCreatedBy = createdBy || '';

    this.annotations = [];
    this.activeIndex = -1;
    this.editMode = false;
    this.modelKey = null;
    this.datasetMetadata = {
      createdBy: createdBy || '',
      createdAt: new Date().toISOString()
    };

    this._raycastTargets = [];
    this.markerScaleDesktop = 0.1;
    this.markerScaleVR = 0.24;
    this._lastMarkerAttenuationState = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.raycaster.params.Sprite = { threshold: 0.2 };
    this.occludedMarkerOpacity = 0.3;

    this.controller1 = null;
    this.controller2 = null;
    this.controllerGrip1 = null;
    this.controllerGrip2 = null;
    this.hand1 = null;
    this.hand2 = null;

    this.isDragging = false;
    this.dragStartPosition = { x: 0, y: 0 };
    this.DRAG_THRESHOLD = 6;

    this.panel = null;
    this.panelTitle = null;
    this.panelBody = null;
    this.panelMeta = null;
    this.panelCount = null;
    this.contextMenu = null;

    this.editor = null;
    this.editorTitleInput = null;
    this.editorContentTypeSelect = null;
    this.editorContentInput = null;
    this.editorCreatedByInput = null;
    this.editorCameraSummary = null;
    this.editorCaptureButton = null;

    this.editorOpen = false;
    this.editorIndex = -1;
    this.editorIsNew = false;

    this.vrPanelCanvas = null;
    this.vrPanelTexture = null;
    this.vrPanelSprite = null;

    this._boundMouseDown = this._onMouseDown.bind(this);
    this._boundMouseMove = this._onMouseMove.bind(this);
    this._boundMouseUp = this._onMouseUp.bind(this);
    this._boundCanvasClickCapture = this._onCanvasClickCapture.bind(this);
    this._boundCanvasDoubleClick = this._onCanvasDoubleClick.bind(this);
    this._boundCanvasContextMenu = this._onCanvasContextMenu.bind(this);
    this._boundControllerSelectEnd = this._onControllerSelectEnd.bind(this);
    this._boundHandPinchEnd = this._onHandPinchEnd.bind(this);
    this._boundKeyDown = this._onWindowKeyDown.bind(this);
    this._boundWindowPointerDown = this._onWindowPointerDown.bind(this);

    this._buildDesktopPanel();
    this._buildEditorPanel();
    this._buildContextMenu();
    this._bindDomEvents();

    if (typeof window !== 'undefined') {
      window.annotationSystem = this;
    }
  }

  _getUiParent() {
    if (this.uiParent) return this.uiParent;
    return (this.renderer && this.renderer.domElement && this.renderer.domElement.parentElement) || document.body;
  }

  _bindDomEvents() {
    if (!this.renderer || !this.renderer.domElement) return;

    const dom = this.renderer.domElement;
    dom.addEventListener('mousedown', this._boundMouseDown, false);
    dom.addEventListener('mousemove', this._boundMouseMove, false);
    dom.addEventListener('mouseup', this._boundMouseUp, false);
    dom.addEventListener('click', this._boundCanvasClickCapture, true);
    dom.addEventListener('contextmenu', this._boundCanvasContextMenu, true);

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this._boundKeyDown);
      window.addEventListener('pointerdown', this._boundWindowPointerDown, true);
    }
  }

  _onMouseDown(event) {
    this.isDragging = false;
    this.dragStartPosition.x = event.clientX;
    this.dragStartPosition.y = event.clientY;
  }

  _onMouseMove(event) {
    if (this.isDragging) return;
    const deltaX = Math.abs(event.clientX - this.dragStartPosition.x);
    const deltaY = Math.abs(event.clientY - this.dragStartPosition.y);
    if (deltaX > this.DRAG_THRESHOLD || deltaY > this.DRAG_THRESHOLD) {
      this.isDragging = true;
    }
  }

  _onMouseUp() {
    setTimeout(() => {
      this.isDragging = false;
    }, 10);
  }

  _onWindowKeyDown(event) {
    const target = event.target;
    if (target instanceof HTMLElement && (
      target.tagName === 'INPUT'
      || target.tagName === 'SELECT'
      || target.tagName === 'TEXTAREA'
      || target.isContentEditable
    )) {
      return;
    }

    if (event.code === 'BracketLeft') {
      event.preventDefault();
      this.previousAnnotation();
      return;
    }

    if (event.code === 'BracketRight') {
      event.preventDefault();
      this.nextAnnotation();
      return;
    }

    if (event.code === 'Escape') {
      this.hideContextMenu();
      if (this.editorOpen) {
        this.closeEditor(false);
      } else {
        this.closeAnnotation();
      }
    }
  }

  _onCanvasClickCapture(event) {
    if (!event || this.isDragging) return;
    if (this._isVRPresenting()) return;
    this.hideContextMenu();

    const hit = this._raycastMarkerFromPointer(event);

    if (this.editMode) {
      if (hit) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.openEditor(hit.index, false);
      }
      return;
    }

    if (hit) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.openAnnotation(hit.index, { navigate: true, source: 'marker-click' });
    }
  }

  _onCanvasDoubleClick(event) {
    // Marker placement is handled by edit-mode right-click context menu.
    void event;
  }

  _isVRPresenting() {
    return Boolean(this.renderer && this.renderer.xr && this.renderer.xr.isPresenting);
  }

  _buildDesktopPanel() {
    if (typeof document === 'undefined') return;

    const panel = document.createElement('section');
    panel.className = `annotation-panel below-panel${this.theme === 'light' ? ' light-theme' : ''}`;
    panel.style.display = 'none';

    panel.innerHTML = `
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
    `;

    const parent = this._getUiParent();
    parent.appendChild(panel);

    panel.querySelector('[data-role="prev"]').addEventListener('click', () => this.previousAnnotation());
    panel.querySelector('[data-role="next"]').addEventListener('click', () => this.nextAnnotation());
    panel.querySelector('[data-role="close"]').addEventListener('click', () => this.closeAnnotation());

    this.panel = panel;
    this.panelTitle = panel.querySelector('[data-role="title"]');
    this.panelBody = panel.querySelector('[data-role="body"]');
    this.panelMeta = panel.querySelector('[data-role="meta"]');
    this.panelCount = panel.querySelector('[data-role="count"]');
  }

  _buildEditorPanel() {
    if (typeof document === 'undefined') return;

    const editor = document.createElement('section');
    editor.className = `annotation-editor below-panel${this.theme === 'light' ? ' light-theme' : ''}`;
    editor.style.display = 'none';

    editor.innerHTML = `
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
    `;

    const parent = this._getUiParent();
    parent.appendChild(editor);

    this.editor = editor;
    this.editorTitleInput = editor.querySelector('[data-role="title"]');
    this.editorContentTypeSelect = editor.querySelector('[data-role="content-type"]');
    this.editorContentInput = editor.querySelector('[data-role="content"]');
    this.editorCreatedByInput = editor.querySelector('[data-role="created-by"]');
    this.editorCameraSummary = editor.querySelector('[data-role="camera-summary"]');
    this.editorCaptureButton = editor.querySelector('[data-role="capture"]');

    editor.querySelector('[data-role="close"]').addEventListener('click', () => this.closeEditor(false));
    editor.querySelector('[data-role="cancel"]').addEventListener('click', () => this.closeEditor(false));
    editor.querySelector('[data-role="save"]').addEventListener('click', () => this._saveEditor());
    editor.querySelector('[data-role="delete"]').addEventListener('click', () => this._deleteEditorTarget());

    this.editorCaptureButton.addEventListener('click', () => {
      const annotation = this.annotations[this.editorIndex];
      if (!annotation) return;
      annotation.camera = this.captureCameraSnapshot();
      this._updateEditorCameraSummary(annotation.camera);
      annotation.metadata.updatedAt = new Date().toISOString();
    });
  }

  _buildContextMenu() {
    if (typeof document === 'undefined') return;

    const menu = document.createElement('div');
    menu.className = `annotation-context-menu${this.theme === 'light' ? ' light-theme' : ''}`;
    menu.style.display = 'none';
    menu.setAttribute('role', 'menu');
    document.body.appendChild(menu);
    this.contextMenu = menu;
  }

  _onCanvasContextMenu(event) {
    if (!event || this._isVRPresenting()) return;
    if (!this.editMode) return;
    if (event.button !== 2) return;

    event.preventDefault();
    if (this.isDragging) {
      this.hideContextMenu();
      return;
    }
    event.stopImmediatePropagation();

    const markerHit = this._raycastMarkerFromPointer(event);
    const scenePoint = this._raycastScenePoint(event);

    const actions = [];
    if (scenePoint) {
      actions.push({
        key: 'create',
        label: 'Create Marker Here',
        payload: { point: scenePoint }
      });
    }
    if (markerHit) {
      actions.push({
        key: 'edit',
        label: `Edit Marker ${markerHit.index + 1}`,
        payload: { index: markerHit.index }
      });
      actions.push({
        key: 'delete',
        label: `Delete Marker ${markerHit.index + 1}`,
        payload: { index: markerHit.index }
      });
    }

    if (actions.length === 0) {
      this.hideContextMenu();
      return;
    }

    this.showContextMenu(event.clientX, event.clientY, actions);
  }

  _onWindowPointerDown(event) {
    if (!event) return;
    if (event.button !== undefined && event.button !== 0) return;

    const target = event.target;
    const targetNode = (typeof Node !== 'undefined' && target instanceof Node) ? target : null;

    if (this.contextMenu && this.contextMenu.style.display !== 'none') {
      if (targetNode && this.contextMenu.contains(targetNode)) {
        return;
      }
      this.hideContextMenu();
    }

    if (this._isVRPresenting() || this.editorOpen || this.activeIndex < 0) return;

    if (targetNode && this.panel && this.panel.contains(targetNode)) return;
    if (targetNode && this.editor && this.editor.contains(targetNode)) return;

    if (this._raycastMarkerFromPointer(event)) return;

    this.closeAnnotation();
  }

  showContextMenu(x, y, actions) {
    if (!this.contextMenu || !Array.isArray(actions) || actions.length === 0) return;

    this.contextMenu.innerHTML = '';

    actions.forEach((action) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'annotation-context-menu__item';
      button.textContent = action.label;
      button.setAttribute('role', 'menuitem');
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.handleContextMenuAction(action.key, action.payload || {});
      });
      this.contextMenu.appendChild(button);
    });

    const viewportPadding = 8;
    const menu = this.contextMenu;
    menu.style.display = 'block';
    menu.style.visibility = 'hidden';
    menu.style.left = '0px';
    menu.style.top = '0px';

    const width = menu.offsetWidth || 180;
    const height = menu.offsetHeight || 100;
    const maxX = window.innerWidth - width - viewportPadding;
    const maxY = window.innerHeight - height - viewportPadding;
    const clampedX = Math.max(viewportPadding, Math.min(x, maxX));
    const clampedY = Math.max(viewportPadding, Math.min(y, maxY));

    menu.style.left = `${clampedX}px`;
    menu.style.top = `${clampedY}px`;
    menu.style.visibility = 'visible';
  }

  hideContextMenu() {
    if (!this.contextMenu) return;
    this.contextMenu.style.display = 'none';
    this.contextMenu.style.visibility = 'hidden';
    this.contextMenu.innerHTML = '';
  }

  handleContextMenuAction(action, payload = {}) {
    if (action === 'create' && payload.point) {
      this.createAnnotationAtPoint(payload.point, { openEditor: true });
    } else if (action === 'edit' && Number.isInteger(payload.index)) {
      this.openEditor(payload.index, false);
    } else if (action === 'delete' && Number.isInteger(payload.index)) {
      this.removeAnnotation(payload.index);
    }

    this.hideContextMenu();
  }

  _resolveContentType(annotation = {}) {
    const declared = String(annotation.contentType || annotation.type || '').toLowerCase();
    if (declared === 'markdown' || declared === 'md') return 'markdown';
    if (declared === 'html') return 'html';
    if (annotation.html !== undefined) return 'html';
    if (annotation.markdown !== undefined) return 'markdown';
    return DEFAULT_CONTENT_TYPE;
  }

  _normalizeMetadata(metadata = {}, fallbackCreatedBy = '') {
    const now = new Date().toISOString();
    const normalized = {
      createdBy: String(metadata.createdBy || metadata.author || fallbackCreatedBy || '').trim(),
      createdAt: metadata.createdAt || now,
      updatedAt: metadata.updatedAt || metadata.createdAt || now
    };
    return normalized;
  }

  _createUniqueAnnotationId(preferredId = null) {
    const requested = String(preferredId || '').trim();
    const base = requested || generateAnnotationId();
    const hasId = (candidate) => this.annotations.some((annotation) => annotation?.id === candidate);
    if (!hasId(base)) return base;

    let suffix = 2;
    let candidate = `${base}-${suffix}`;
    while (hasId(candidate)) {
      suffix += 1;
      candidate = `${base}-${suffix}`;
    }
    return candidate;
  }

  _normalizeAnnotation(rawAnnotation = {}, index = 0, inheritedMeta = {}) {
    const contentType = this._resolveContentType(rawAnnotation);

    const position = asVector3(
      rawAnnotation.position
      || rawAnnotation.xyz
      || rawAnnotation.point
      || rawAnnotation.location
    ) || new THREE.Vector3();

    let content = '';
    if (contentType === 'html' && rawAnnotation.html !== undefined) {
      content = String(rawAnnotation.html);
    } else if (contentType === 'markdown' && rawAnnotation.markdown !== undefined) {
      content = String(rawAnnotation.markdown);
    } else {
      content = rawAnnotation.content !== undefined ? String(rawAnnotation.content) : '';
    }

    const mergedMeta = {
      ...inheritedMeta,
      ...(rawAnnotation.metadata || rawAnnotation.meta || {})
    };

    const metadata = this._normalizeMetadata(mergedMeta, this.defaultCreatedBy || this.datasetMetadata.createdBy);

    return {
      id: this._createUniqueAnnotationId(rawAnnotation.id),
      title: String(rawAnnotation.title || `Annotation ${index + 1}`),
      content,
      contentType,
      position,
      camera: rawAnnotation.camera || rawAnnotation.cameraState || null,
      metadata,
      marker: null
    };
  }

  _cloneCameraData(data) {
    if (!data || typeof data !== 'object') return null;
    return JSON.parse(JSON.stringify(data));
  }

  _annotationToSerializable(annotation) {
    return {
      id: annotation.id,
      title: annotation.title,
      content: annotation.content,
      contentType: annotation.contentType,
      position: toPointObject(annotation.position),
      camera: this._cloneCameraData(annotation.camera),
      metadata: {
        createdBy: annotation.metadata.createdBy || '',
        createdAt: annotation.metadata.createdAt || '',
        updatedAt: annotation.metadata.updatedAt || ''
      }
    };
  }

  setRaycastTargets(targets) {
    const normalizedTargets = [];
    const addTarget = (target) => {
      if (Array.isArray(target)) {
        target.forEach(addTarget);
        return;
      }
      if (!target || typeof target !== 'object') return;
      if (target.isObject3D || target.isMesh || target.traverse) {
        target.updateMatrixWorld(true);
        normalizedTargets.push(target);
      }
    };

    addTarget(targets);
    this._raycastTargets = normalizedTargets;
  }

  _resolveRaycastTargets() {
    if (this.getRaycastTargets) {
      const provided = this.getRaycastTargets();
      if (Array.isArray(provided) && provided.length > 0) {
        return provided;
      }
      if (provided && typeof provided === 'object') {
        return [provided];
      }
    }

    if (this._raycastTargets && this._raycastTargets.length > 0) {
      return this._raycastTargets;
    }

    return (this.scene && this.scene.children) ? this.scene.children : [];
  }

  _resolveDatasetInput(source) {
    if (!source) {
      return { metadata: {}, annotations: [] };
    }

    if (Array.isArray(source)) {
      return { metadata: {}, annotations: source };
    }

    if (typeof source === 'object') {
      const annotations = Array.isArray(source.annotations)
        ? source.annotations
        : (Array.isArray(source.items) ? source.items : []);

      const metadata = {
        ...(source.metadata || source.meta || {})
      };

      if (source.createdBy && !metadata.createdBy) metadata.createdBy = source.createdBy;
      if (source.createdAt && !metadata.createdAt) metadata.createdAt = source.createdAt;

      if (annotations.length === 0 && (source.position || source.xyz || source.point)) {
        return { metadata, annotations: [source] };
      }

      return { metadata, annotations };
    }

    return { metadata: {}, annotations: [] };
  }

  setAnnotations(source, { modelKey = null, metadata = {} } = {}) {
    const resolved = this._resolveDatasetInput(source);
    this.clearAnnotations();

    this.modelKey = modelKey;
    this.datasetMetadata = {
      createdBy: metadata.createdBy || resolved.metadata.createdBy || this.defaultCreatedBy || '',
      createdAt: metadata.createdAt || resolved.metadata.createdAt || new Date().toISOString(),
      ...resolved.metadata,
      ...metadata
    };

    resolved.annotations.forEach((raw, index) => {
      const annotation = this._normalizeAnnotation(raw, index, this.datasetMetadata);
      this._addNormalizedAnnotation(annotation, { open: false });
    });

    this._updatePanelVisibility();
    return this.annotations;
  }

  _createMarkerTexture(number, active = false, inVR = false) {
    const logicalSize = 96;
    const dpr = Math.max(1, window.devicePixelRatio || 1) * 2;
    const canvas = document.createElement('canvas');
    canvas.width = logicalSize * dpr;
    canvas.height = logicalSize * dpr;

    const context = canvas.getContext('2d');
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.scale(dpr, dpr);

    const center = logicalSize * 0.5;
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    const lineWidth = inVR ? 3.8 : 1.7;
    const baseOuterRadius = inVR ? logicalSize * 0.345 : logicalSize * 0.21125;
    const radius = baseOuterRadius - (lineWidth * 0.5);
    const textSize = inVR
      ? (number >= 100 ? 19 : 23)
      : (number >= 100 ? 12 : 14);

    // Marker body: dark filled circle with subtle drop shadow.
    context.shadowColor = inVR ? 'rgba(0, 0, 0, 0.36)' : 'rgba(0, 0, 0, 0.12)';
    context.shadowBlur = inVR ? 6 : 0.7;
    context.shadowOffsetY = inVR ? 1.5 : 0.35;
    context.beginPath();
    context.arc(center, center, radius, 0, Math.PI * 2);
    context.fillStyle = active
      ? (inVR ? 'rgba(14, 36, 74, 0.88)' : 'rgba(18, 44, 86, 0.62)')
      : (inVR ? 'rgba(10, 10, 10, 0.78)' : 'rgba(16, 16, 16, 0.5)');
    context.fill();

    // Main white ring.
    context.shadowColor = 'transparent';
    context.shadowBlur = 0;
    context.shadowOffsetY = 0;
    context.beginPath();
    context.arc(center, center, radius, 0, Math.PI * 2);
    context.lineWidth = lineWidth;
    context.strokeStyle = inVR ? 'rgba(255, 255, 255, 0.72)' : 'rgba(255, 255, 255, 0.52)';
    context.stroke();

    // Active marker gets a soft outer halo rather than color shift.
    if (active) {
      context.beginPath();
      context.arc(center, center, radius + lineWidth * 0.9, 0, Math.PI * 2);
      context.lineWidth = inVR ? 2.2 : 1.1;
      context.strokeStyle = inVR ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.08)';
      context.stroke();
    }

    // White number text.
    context.fillStyle = 'rgba(255, 255, 255, 0.96)';
    context.font = `680 ${textSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    context.fillText(String(number), center, center + (inVR ? 1 : 0.5));

    context.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  }

  _createMarkerSprite(index, position) {
    const inVR = this._isVRPresenting();
    const frontTexture = this._createMarkerTexture(index + 1, false, inVR);
    const frontMaterial = new THREE.SpriteMaterial({
      map: frontTexture,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      sizeAttenuation: inVR
    });
    frontMaterial.opacity = 1.0;

    const sprite = new THREE.Sprite(frontMaterial);
    const scale = inVR ? this.markerScaleVR : this.markerScaleDesktop;
    sprite.scale.set(scale, scale, 1);
    sprite.position.copy(position);
    sprite.renderOrder = 131;
    sprite.userData.isAnnotationMarker = true;
    sprite.userData.annotationIndex = index;

    const backTexture = this._createMarkerTexture(index + 1, false, inVR);
    const backMaterial = new THREE.SpriteMaterial({
      map: backTexture,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      sizeAttenuation: inVR
    });
    backMaterial.opacity = this.occludedMarkerOpacity;

    const occludedSprite = new THREE.Sprite(backMaterial);
    occludedSprite.scale.set(scale, scale, 1);
    occludedSprite.position.copy(position);
    occludedSprite.renderOrder = 130;
    occludedSprite.userData.isAnnotationMarker = true;
    occludedSprite.userData.annotationIndex = index;

    this.scene.add(occludedSprite);
    this.scene.add(sprite);
    return { sprite, occludedSprite };
  }

  _disposeMarker(annotation) {
    const marker = annotation && annotation.marker;
    const markerOccluded = annotation && annotation.markerOccluded;

    const removeSprite = (target) => {
      if (!target) return;
      if (target.parent) {
        target.parent.remove(target);
      }
      if (target.material) {
        if (target.material.map) target.material.map.dispose();
        target.material.dispose();
      }
    };

    removeSprite(marker);
    removeSprite(markerOccluded);

    if (annotation) {
      annotation.marker = null;
      annotation.markerOccluded = null;
    }
  }

  _refreshMarkerVisuals() {
    const inVR = this._isVRPresenting();
    this.annotations.forEach((annotation, index) => {
      const marker = annotation.marker;
      const markerOccluded = annotation.markerOccluded;
      if (!marker || !marker.material || !markerOccluded || !markerOccluded.material) return;

      marker.userData.annotationIndex = index;
      markerOccluded.userData.annotationIndex = index;

      const oldFrontTexture = marker.material.map;
      const oldBackTexture = markerOccluded.material.map;
      marker.material.map = this._createMarkerTexture(index + 1, index === this.activeIndex, inVR);
      markerOccluded.material.map = this._createMarkerTexture(index + 1, index === this.activeIndex, inVR);
      marker.material.sizeAttenuation = inVR;
      markerOccluded.material.sizeAttenuation = inVR;
      marker.material.needsUpdate = true;
      markerOccluded.material.needsUpdate = true;
      marker.material.opacity = 1.0;
      markerOccluded.material.opacity = this.occludedMarkerOpacity;
      const scale = inVR ? this.markerScaleVR : this.markerScaleDesktop;
      marker.scale.set(scale, scale, 1);
      markerOccluded.scale.set(scale, scale, 1);
      markerOccluded.position.copy(marker.position);

      if (oldFrontTexture) oldFrontTexture.dispose();
      if (oldBackTexture) oldBackTexture.dispose();
    });
  }

  _updateMarkerSizingMode() {
    const inVR = this._isVRPresenting();
    if (this._lastMarkerAttenuationState === inVR) return;
    this._lastMarkerAttenuationState = inVR;
    this._refreshMarkerVisuals();
  }

  _addNormalizedAnnotation(annotation, { open = true } = {}) {
    const markerPair = this._createMarkerSprite(this.annotations.length, annotation.position);
    annotation.marker = markerPair.sprite;
    annotation.markerOccluded = markerPair.occludedSprite;
    this.annotations.push(annotation);

    if (open) {
      this.openAnnotation(this.annotations.length - 1, { navigate: false, source: 'add' });
    } else {
      this._refreshMarkerVisuals();
    }

    return annotation;
  }

  addAnnotation(annotationInput, { open = true } = {}) {
    const normalized = this._normalizeAnnotation(annotationInput, this.annotations.length, this.datasetMetadata);
    return this._addNormalizedAnnotation(normalized, { open });
  }

  getAnnotationIndexById(id) {
    const targetId = String(id || '').trim();
    if (!targetId) return -1;
    return this.annotations.findIndex((annotation) => annotation?.id === targetId);
  }

  getAnnotationById(id) {
    const index = this.getAnnotationIndexById(id);
    if (index < 0) return null;
    return this._annotationToSerializable(this.annotations[index]);
  }

  createAnnotationAtPoint(point, { openEditor = true } = {}) {
    const position = asVector3(point);
    if (!position) return null;

    const annotation = this.addAnnotation({
      position,
      title: `Annotation ${this.annotations.length + 1}`,
      content: '',
      contentType: DEFAULT_CONTENT_TYPE,
      camera: this.captureCameraSnapshot(),
      metadata: this._normalizeMetadata({}, this.defaultCreatedBy || this.datasetMetadata?.createdBy)
    }, { open: false });

    const index = this.annotations.indexOf(annotation);
    if (!Number.isInteger(index) || index < 0) return null;

    if (openEditor) {
      this.openEditor(index, true);
    } else {
      this.openAnnotation(index, { navigate: false, source: 'add-point' });
    }

    return annotation;
  }

  removeAnnotation(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.annotations.length) {
      return false;
    }

    const [removed] = this.annotations.splice(index, 1);
    this._disposeMarker(removed);

    if (this.activeIndex === index) {
      this.activeIndex = -1;
      this.hideDesktopPanel();
      this.hideVRPanel();
    } else if (this.activeIndex > index) {
      this.activeIndex -= 1;
    }

    this._refreshMarkerVisuals();
    this._updatePanelVisibility();
    return true;
  }

  removeAnnotationById(id) {
    const index = this.getAnnotationIndexById(id);
    if (index < 0) return false;
    return this.removeAnnotation(index);
  }

  clearAnnotations() {
    this.annotations.forEach((annotation) => this._disposeMarker(annotation));
    this.annotations = [];
    this.activeIndex = -1;
    this.hideDesktopPanel();
    this.hideVRPanel();
    this.closeEditor(false);
    this.hideContextMenu();
  }

  closeAnnotation() {
    this.activeIndex = -1;
    this._refreshMarkerVisuals();
    this.hideDesktopPanel();
    this.hideVRPanel();
  }

  _renderAnnotationHtml(annotation) {
    const contentType = annotation.contentType || DEFAULT_CONTENT_TYPE;
    if (contentType === 'html') {
      return sanitizeHtml(annotation.content);
    }
    if (contentType === 'markdown') {
      return sanitizeHtml(markdownToHtml(annotation.content));
    }
    return escapeHtml(annotation.content).replace(/\n/g, '<br>');
  }

  _formatMetadata(annotation) {
    const createdBy = annotation.metadata?.createdBy || 'Unknown';
    const showCreatedAt = annotation.metadata?.showCreatedAt === true || this.datasetMetadata?.showCreatedAt === true;
    const createdAt = annotation.metadata?.createdAt
      ? new Date(annotation.metadata.createdAt)
      : null;
    const createdAtText = createdAt && !Number.isNaN(createdAt.getTime())
      ? createdAt.toLocaleString()
      : annotation.metadata?.createdAt || '';

    return showCreatedAt && createdAtText
      ? `Created by ${createdBy} • ${createdAtText}`
      : `Created by ${createdBy}`;
  }

  showDesktopPanel(annotation, index) {
    if (!this.panel) return;

    this.panelTitle.textContent = annotation.title || `Annotation ${index + 1}`;
    this.panelBody.innerHTML = this._renderAnnotationHtml(annotation);
    this.panelMeta.textContent = this._formatMetadata(annotation);
    this.panelCount.textContent = `${index + 1}/${this.annotations.length}`;
    this.panel.style.display = this._isVRPresenting() ? 'none' : 'block';
  }

  hideDesktopPanel() {
    if (!this.panel) return;
    this.panel.style.display = 'none';
  }

  _wrapText(context, text, maxWidth) {
    const words = String(text || '').split(/\s+/).filter(Boolean);
    if (words.length === 0) return [''];

    const lines = [];
    let current = words[0];

    for (let i = 1; i < words.length; i += 1) {
      const candidate = `${current} ${words[i]}`;
      if (context.measureText(candidate).width <= maxWidth) {
        current = candidate;
      } else {
        lines.push(current);
        current = words[i];
      }
    }

    lines.push(current);
    return lines;
  }

  _drawVRPanel(annotation) {
    const dpr = (window.devicePixelRatio || 1) * 2;
    const logicalWidth = 760;
    const logicalHeight = 420;

    if (!this.vrPanelCanvas) {
      this.vrPanelCanvas = document.createElement('canvas');
    }

    const pixelWidth = logicalWidth * dpr;
    const pixelHeight = logicalHeight * dpr;

    if (this.vrPanelCanvas.width !== pixelWidth || this.vrPanelCanvas.height !== pixelHeight) {
      this.vrPanelCanvas.width = pixelWidth;
      this.vrPanelCanvas.height = pixelHeight;
    }

    const context = this.vrPanelCanvas.getContext('2d');
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, pixelWidth, pixelHeight);
    context.save();
    context.scale(dpr, dpr);

    context.fillStyle = 'rgba(0, 0, 0, 0.8)';
    context.strokeStyle = 'rgba(255, 255, 255, 0.24)';
    context.lineWidth = 2;

    context.beginPath();
    if (typeof context.roundRect === 'function') {
      context.roundRect(10, 10, logicalWidth - 20, logicalHeight - 20, 18);
    } else {
      context.rect(10, 10, logicalWidth - 20, logicalHeight - 20);
    }
    context.fill();
    context.stroke();

    const indexText = `${this.activeIndex + 1}/${this.annotations.length}`;
    context.fillStyle = '#e4b98a';
    context.font = '600 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    context.fillText(indexText, 38, 56);

    context.fillStyle = '#ffffff';
    context.font = '700 34px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    context.fillText(annotation.title || 'Annotation', 38, 102);

    const bodyHtml = this._renderAnnotationHtml(annotation);
    const bodyText = htmlToPlainText(bodyHtml);

    context.fillStyle = 'rgba(255, 255, 255, 0.92)';
    context.font = '400 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

    const lines = this._wrapText(context, bodyText, logicalWidth - 76);
    const maxLines = 9;
    const clippedLines = lines.slice(0, maxLines);

    clippedLines.forEach((line, lineIndex) => {
      context.fillText(line, 38, 148 + lineIndex * 30);
    });

    if (lines.length > maxLines) {
      context.fillStyle = 'rgba(255, 255, 255, 0.65)';
      context.fillText('...', 38, 148 + maxLines * 30);
    }

    context.fillStyle = 'rgba(238, 199, 144, 0.9)';
    context.font = '500 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    context.fillText(this._formatMetadata(annotation), 38, logicalHeight - 40);

    context.restore();

    if (!this.vrPanelTexture) {
      this.vrPanelTexture = new THREE.CanvasTexture(this.vrPanelCanvas);
      this.vrPanelTexture.minFilter = THREE.LinearFilter;
      this.vrPanelTexture.magFilter = THREE.LinearFilter;
    }

    this.vrPanelTexture.needsUpdate = true;

    if (!this.vrPanelSprite) {
      const material = new THREE.SpriteMaterial({
        map: this.vrPanelTexture,
        depthTest: false,
        depthWrite: false,
        transparent: true
      });
      this.vrPanelSprite = new THREE.Sprite(material);
      this.vrPanelSprite.renderOrder = 140;
      const baseHeight = 0.52;
      const aspect = logicalWidth / logicalHeight;
      this.vrPanelSprite.scale.set(baseHeight * aspect, baseHeight, 1);
    }
  }

  _positionVRPanel(annotation) {
    if (!annotation || !annotation.position || !this.vrPanelSprite || !this.camera) {
      return;
    }

    const annotationPos = annotation.position.clone();
    const cameraPos = new THREE.Vector3();
    this.camera.getWorldPosition(cameraPos);

    const toCamera = cameraPos.clone().sub(annotationPos).normalize();
    const worldUp = new THREE.Vector3(0, 1, 0);
    let right = new THREE.Vector3().crossVectors(worldUp, toCamera).normalize();

    if (!Number.isFinite(right.x) || right.lengthSq() < 0.0001) {
      right = new THREE.Vector3(1, 0, 0);
    }

    const panelPosition = annotationPos
      .clone()
      .add(right.multiplyScalar(0.42))
      .add(worldUp.multiplyScalar(0.18));

    this.vrPanelSprite.position.copy(panelPosition);
  }

  showVRPanel(annotation) {
    if (!annotation || !this.scene || !this._isVRPresenting()) return;

    this._drawVRPanel(annotation);
    this._positionVRPanel(annotation);

    if (!this.scene.children.includes(this.vrPanelSprite)) {
      this.scene.add(this.vrPanelSprite);
    }
    this.vrPanelSprite.visible = true;
  }

  hideVRPanel() {
    if (!this.vrPanelSprite || !this.scene) return;
    this.vrPanelSprite.visible = false;
    if (this.scene.children.includes(this.vrPanelSprite)) {
      this.scene.remove(this.vrPanelSprite);
    }
  }

  openAnnotation(index, { navigate = true, source = 'api' } = {}) {
    if (!Number.isInteger(index) || index < 0 || index >= this.annotations.length) {
      return null;
    }

    const annotation = this.annotations[index];
    this.activeIndex = index;

    this._refreshMarkerVisuals();

    if (this._isVRPresenting()) {
      this.hideDesktopPanel();
      this.showVRPanel(annotation);
    } else {
      this.hideVRPanel();
      this.showDesktopPanel(annotation, index);
    }

    if (!this._isVRPresenting() && navigate && this.onRequestNavigate) {
      this.onRequestNavigate(this._annotationToSerializable(annotation), { source });
    }

    return annotation;
  }

  openAnnotationById(id, options = {}) {
    const index = this.getAnnotationIndexById(id);
    if (index < 0) return null;
    return this.openAnnotation(index, options);
  }

  nextAnnotation({ navigate = true } = {}) {
    if (this.annotations.length === 0) return null;
    const nextIndex = this.activeIndex < 0
      ? 0
      : (this.activeIndex + 1) % this.annotations.length;
    return this.openAnnotation(nextIndex, { navigate, source: 'next' });
  }

  previousAnnotation({ navigate = true } = {}) {
    if (this.annotations.length === 0) return null;
    const previousIndex = this.activeIndex < 0
      ? this.annotations.length - 1
      : (this.activeIndex - 1 + this.annotations.length) % this.annotations.length;
    return this.openAnnotation(previousIndex, { navigate, source: 'previous' });
  }

  _updatePanelVisibility() {
    if (this.activeIndex < 0 || this.activeIndex >= this.annotations.length) {
      this.hideDesktopPanel();
      this.hideVRPanel();
      return;
    }

    const annotation = this.annotations[this.activeIndex];
    if (this._isVRPresenting()) {
      this.hideDesktopPanel();
      this.showVRPanel(annotation);
    } else {
      this.hideVRPanel();
      this.showDesktopPanel(annotation, this.activeIndex);
    }
  }

  setEditMode(enabled) {
    this.editMode = enabled === true;
    if (this.editMode) {
      this.hideDesktopPanel();
    } else if (this.editorOpen) {
      this.closeEditor(true);
    }
    if (!this.editMode) {
      this.hideContextMenu();
    }

    if (this.panel) {
      this.panel.classList.toggle('annotation-panel--editing', this.editMode);
    }
    if (this.editor) {
      this.editor.classList.toggle('annotation-editor--active', this.editMode);
    }

    return this.editMode;
  }

  toggleEditMode() {
    return this.setEditMode(!this.editMode);
  }

  isEditModeEnabled() {
    return this.editMode;
  }

  captureCameraSnapshot() {
    if (this.getCameraSnapshot) {
      return this._cloneCameraData(this.getCameraSnapshot());
    }

    if (!this.camera || !this.controls) {
      return null;
    }

    return {
      desktop: {
        camera: toPointObject(this.camera.position),
        target: toPointObject(this.controls.target)
      }
    };
  }

  _updateEditorCameraSummary(cameraData) {
    if (!this.editorCameraSummary) return;

    const desktopCamera = cameraData?.desktop?.camera;
    if (!desktopCamera) {
      this.editorCameraSummary.textContent = 'No camera capture';
      return;
    }

    this.editorCameraSummary.textContent = `Cam ${roundNumber(desktopCamera.x, 2)}, ${roundNumber(desktopCamera.y, 2)}, ${roundNumber(desktopCamera.z, 2)}`;
  }

  openEditor(index, isNew = false) {
    if (!this.editor || !Number.isInteger(index) || index < 0 || index >= this.annotations.length) {
      return;
    }

    const annotation = this.annotations[index];

    this.editorOpen = true;
    this.editorIndex = index;
    this.editorIsNew = isNew === true;

    this.editorTitleInput.value = annotation.title || '';
    this.editorContentTypeSelect.value = annotation.contentType || DEFAULT_CONTENT_TYPE;
    this.editorContentInput.value = annotation.content || '';
    this.editorCreatedByInput.value = annotation.metadata?.createdBy || this.defaultCreatedBy || '';

    if (!annotation.camera) {
      annotation.camera = this.captureCameraSnapshot();
    }
    this._updateEditorCameraSummary(annotation.camera);

    this.editor.style.display = 'block';
    this.editorTitleInput.focus();
    this.hideContextMenu();
    this.openAnnotation(index, { navigate: false, source: 'editor' });
    this.hideDesktopPanel();
  }

  closeEditor(saveChanges = true) {
    if (!this.editor || !this.editorOpen) return;

    if (!saveChanges && this.editorIsNew) {
      this.removeAnnotation(this.editorIndex);
    }

    this.editorOpen = false;
    this.editorIsNew = false;
    this.editorIndex = -1;
    this.editor.style.display = 'none';
    this.hideContextMenu();
  }

  _saveEditor() {
    const annotation = this.annotations[this.editorIndex];
    if (!annotation) {
      this.closeEditor(false);
      return;
    }

    annotation.title = this.editorTitleInput.value.trim() || `Annotation ${this.editorIndex + 1}`;
    annotation.contentType = this.editorContentTypeSelect.value || DEFAULT_CONTENT_TYPE;
    annotation.content = this.editorContentInput.value;

    if (!annotation.metadata) {
      annotation.metadata = this._normalizeMetadata({}, this.defaultCreatedBy);
    }

    const createdBy = this.editorCreatedByInput.value.trim();
    annotation.metadata.createdBy = createdBy || annotation.metadata.createdBy || this.defaultCreatedBy;
    annotation.metadata.updatedAt = new Date().toISOString();

    if (!annotation.camera) {
      annotation.camera = this.captureCameraSnapshot();
    }

    this.openAnnotation(this.editorIndex, { navigate: false, source: 'editor-save' });
    this.closeEditor(true);
  }

  _deleteEditorTarget() {
    const index = this.editorIndex;
    this.closeEditor(true);
    this.removeAnnotation(index);
  }

  _pointerToRay(event) {
    if (!event) return null;

    let camera = this.camera;
    let mouse = this.mouse;

    if (this.getRaycastInfo) {
      const info = this.getRaycastInfo(event);
      if (info && info.mouse && Number.isFinite(info.mouse.x) && Number.isFinite(info.mouse.y)) {
        if (info.mouse.isVector2) {
          mouse = info.mouse;
        } else {
          mouse = new THREE.Vector2(info.mouse.x, info.mouse.y);
        }
        if (info.camera) {
          camera = info.camera;
        }
      } else {
        return null;
      }
    } else {
      const rect = this.renderer.domElement.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
    }

    if (!camera) return null;

    this.raycaster.setFromCamera(mouse, camera);
    return { camera, mouse };
  }

  _getRaycastMarkerObjects() {
    const markerObjects = [];
    this.annotations.forEach((annotation) => {
      if (annotation?.marker) markerObjects.push(annotation.marker);
      if (annotation?.markerOccluded) markerObjects.push(annotation.markerOccluded);
    });
    return markerObjects;
  }

  _raycastMarkerFromPointer(event) {
    if (this.annotations.length === 0) return null;

    const ray = this._pointerToRay(event);
    if (!ray) return null;

    const markerObjects = this._getRaycastMarkerObjects();

    if (markerObjects.length === 0) return null;

    const intersects = this.raycaster.intersectObjects(markerObjects, false);
    if (intersects.length === 0) return null;

    const hit = intersects[0].object;
    const index = Number(hit.userData.annotationIndex);
    if (!Number.isInteger(index)) return null;

    return {
      index,
      object: hit,
      intersection: intersects[0]
    };
  }

  _raycastScenePoint(event) {
    const ray = this._pointerToRay(event);
    if (!ray) return null;

    const targets = this._resolveRaycastTargets();
    if (!targets || targets.length === 0) return null;

    const intersects = this.raycaster.intersectObjects(targets, true);
    const valid = intersects.find((intersect) => {
      const object = intersect.object;
      if (!object) return false;
      if (object.userData?.isAnnotationMarker) return false;
      if (this.isHelperObject(object)) return false;
      return true;
    });

    return valid ? valid.point.clone() : null;
  }

  _raycastMarkerFromController(controller) {
    if (!controller || this.annotations.length === 0) return null;

    const tempMatrix = new THREE.Matrix4().extractRotation(controller.matrixWorld);
    const origin = new THREE.Vector3();
    const direction = new THREE.Vector3(0, 0, -1).applyMatrix4(tempMatrix).normalize();
    controller.getWorldPosition(origin);

    this.raycaster.set(origin, direction);

    const markerObjects = this._getRaycastMarkerObjects();

    const intersects = this.raycaster.intersectObjects(markerObjects, false);
    if (intersects.length === 0) return null;

    const index = Number(intersects[0].object.userData.annotationIndex);
    if (!Number.isInteger(index)) return null;
    return index;
  }

  _onControllerSelectEnd(event) {
    if (!event || !event.target) return;
    const index = this._raycastMarkerFromController(event.target);
    if (!Number.isInteger(index)) return;

    if (this.editMode) {
      return;
    }

    this.openAnnotation(index, { navigate: false, source: 'vr-controller' });
  }

  _raycastMarkerFromHand(hand) {
    if (!hand || this.annotations.length === 0) return null;

    const tip = hand.joints?.['index-finger-tip'];
    if (!tip) return null;

    const knuckle = hand.joints?.['index-finger-phalanx-proximal']
      || hand.joints?.['index-finger-phalanx-intermediate']
      || hand.joints?.wrist
      || null;

    const origin = new THREE.Vector3();
    tip.getWorldPosition(origin);

    const direction = new THREE.Vector3();
    if (knuckle) {
      const knucklePos = new THREE.Vector3();
      knuckle.getWorldPosition(knucklePos);
      direction.copy(origin).sub(knucklePos).normalize();
    } else {
      direction.set(0, 0, -1).applyQuaternion(hand.quaternion).normalize();
    }

    if (!Number.isFinite(direction.x) || direction.lengthSq() < 0.00001) {
      return null;
    }

    this.raycaster.set(origin, direction);

    const markerObjects = this._getRaycastMarkerObjects();

    const intersects = this.raycaster.intersectObjects(markerObjects, false);
    if (intersects.length === 0) return null;

    const index = Number(intersects[0].object.userData.annotationIndex);
    if (!Number.isInteger(index)) return null;
    return index;
  }

  _onHandPinchEnd(event) {
    if (!event || !event.target) return;
    if (this.editMode) return;

    const index = this._raycastMarkerFromHand(event.target);
    if (!Number.isInteger(index)) return;

    this.openAnnotation(index, { navigate: false, source: 'xr-hand-pinch' });
  }

  attachVR({ controller1, controller2, controllerGrip1, controllerGrip2, hand1 = null, hand2 = null }) {
    if (this.controller1) {
      this.detachVR();
    }

    this.controller1 = controller1 || null;
    this.controller2 = controller2 || null;
    this.controllerGrip1 = controllerGrip1 || null;
    this.controllerGrip2 = controllerGrip2 || null;
    this.hand1 = hand1 || null;
    this.hand2 = hand2 || null;

    if (this.controller1) {
      this.controller1.addEventListener('selectend', this._boundControllerSelectEnd);
    }
    if (this.controller2) {
      this.controller2.addEventListener('selectend', this._boundControllerSelectEnd);
    }
    if (this.hand1) {
      this.hand1.addEventListener('pinchend', this._boundHandPinchEnd);
    }
    if (this.hand2) {
      this.hand2.addEventListener('pinchend', this._boundHandPinchEnd);
    }
  }

  detachVR() {
    if (this.controller1) {
      this.controller1.removeEventListener('selectend', this._boundControllerSelectEnd);
    }
    if (this.controller2) {
      this.controller2.removeEventListener('selectend', this._boundControllerSelectEnd);
    }
    if (this.hand1) {
      this.hand1.removeEventListener('pinchend', this._boundHandPinchEnd);
    }
    if (this.hand2) {
      this.hand2.removeEventListener('pinchend', this._boundHandPinchEnd);
    }

    this.controller1 = null;
    this.controller2 = null;
    this.controllerGrip1 = null;
    this.controllerGrip2 = null;
    this.hand1 = null;
    this.hand2 = null;

    this.hideVRPanel();
  }

  getAnnotations() {
    return this.annotations.map((annotation) => this._annotationToSerializable(annotation));
  }

  getExportData(metadataOverrides = {}) {
    const exportedAt = new Date().toISOString();

    return {
      type: 'belowjs-annotations',
      version: ANNOTATION_SCHEMA_VERSION,
      modelKey: this.modelKey,
      metadata: {
        ...this.datasetMetadata,
        ...metadataOverrides,
        exportedAt
      },
      annotations: this.getAnnotations()
    };
  }

  downloadAnnotations(filename = 'annotations.json', metadataOverrides = {}) {
    const payload = this.getExportData(metadataOverrides);

    if (typeof window !== 'undefined' && window.Blob && window.URL && typeof document !== 'undefined') {
      const blob = new window.Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = sanitizeFilename(filename).endsWith('.json')
        ? sanitizeFilename(filename)
        : `${sanitizeFilename(filename)}.json`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    }

    return payload;
  }

  update() {
    this._updateMarkerSizingMode();
    this._updatePanelVisibility();

    if (this._isVRPresenting() && this.activeIndex >= 0 && this.activeIndex < this.annotations.length) {
      const annotation = this.annotations[this.activeIndex];
      if (annotation) {
        this._positionVRPanel(annotation);
      }
    }
  }

  dispose() {
    this.clearAnnotations();

    if (this.panel && this.panel.parentNode) {
      this.panel.parentNode.removeChild(this.panel);
    }
    this.panel = null;

    if (this.editor && this.editor.parentNode) {
      this.editor.parentNode.removeChild(this.editor);
    }
    this.editor = null;

    if (this.vrPanelSprite) {
      if (this.vrPanelSprite.parent) {
        this.vrPanelSprite.parent.remove(this.vrPanelSprite);
      }
      if (this.vrPanelSprite.material) {
        if (this.vrPanelSprite.material.map) {
          this.vrPanelSprite.material.map.dispose();
        }
        this.vrPanelSprite.material.dispose();
      }
      this.vrPanelSprite = null;
    }

    this.vrPanelTexture = null;
    this.vrPanelCanvas = null;

    if (this.renderer && this.renderer.domElement) {
      const dom = this.renderer.domElement;
      dom.removeEventListener('mousedown', this._boundMouseDown, false);
      dom.removeEventListener('mousemove', this._boundMouseMove, false);
      dom.removeEventListener('mouseup', this._boundMouseUp, false);
      dom.removeEventListener('click', this._boundCanvasClickCapture, true);
      dom.removeEventListener('contextmenu', this._boundCanvasContextMenu, true);
    }

    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this._boundKeyDown);
      window.removeEventListener('pointerdown', this._boundWindowPointerDown, true);
      if (window.annotationSystem === this) {
        window.annotationSystem = undefined;
      }
    }

    if (this.contextMenu && this.contextMenu.parentNode) {
      this.contextMenu.parentNode.removeChild(this.contextMenu);
    }
    this.contextMenu = null;

    this.detachVR();
  }
}
