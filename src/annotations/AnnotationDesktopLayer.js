/* eslint-disable indent, comma-dangle */
/**
 * BelowJS Annotations
 *
 * Shared annotation layer for wreck models. Desktop-first: numbered markers
 * rendered as a DOM overlay projected from 3D world positions.
 *
 * Interactions:
 *  - Right-click the model -> context menu ("Add annotation here") with a
 *    ghost ping at the clicked point, broadcast to everyone in the room.
 *  - Right-click a marker -> View / Edit / Move / Delete.
 *  - Move mode does NOT track the mouse: the marker enters a moveable state
 *    (camera controls keep working) where you either drag the marker itself
 *    or click a spot on the model to place it. Esc or clicking the marker
 *    finishes the move.
 *  - Shift-click two markers to measure between them; right-click the
 *    distance label to keep it as a persistent scale bar.
 *
 * Presentation:
 *  - Markers fade smoothly to ~10% when occluded by the model (raycast
 *    visibility test - no z-fighting, markers are DOM).
 *  - In dive mode markers sit dim until the torch beam reaches them.
 *
 * The system is transport-agnostic: in collaborative rooms it is driven by
 * the BelowVR WebSocket (through its transport adapter),
 * but it can equally consume a static `belowjs-annotations` JSON document
 * via loadStaticData() for plain belowjs sites.
 *
 * Annotation positions are model-local coordinates. DOM and XR presentation
 * convert them to world space only while rendering and hit testing.
 */

import * as THREE from 'three';
import { EventSystem } from '../utils/EventSystem.js';
import { Line2, LineMaterial, LineGeometry } from '../measurement/ThickLine.js';
import {
    normalizeAnnotationDocument,
    normalizePosition,
    serializeAnnotationDocument,
} from './AnnotationCodec.js';
import { AnnotationStore } from './AnnotationStore.js';
import { AnnotationXRLayer } from './AnnotationXRLayer.js';

const TITLE_MAX_LENGTH = 120;
const NOTES_MAX_LENGTH = 4000;
const MOVE_PREVIEW_INTERVAL_MS = 66;     // ~15Hz live drag previews
const RIGHT_CLICK_DRAG_TOLERANCE_PX = 6;
const CLICK_PLACE_TOLERANCE_PX = 5;
const REMOTE_PING_TTL_MS = 4000;
const REMOTE_FOCUS_TTL_MS = 8000;        // keepalives arrive every 2.5s
const LONG_PRESS_MS = 550;               // touch long-press = right-click
const OCCLUDED_OPACITY = 0.1;
const DIVE_UNLIT_OPACITY = 0.22;

export class AnnotationDesktopLayer extends EventSystem {
    constructor(viewer, options = {}) {
        super();
        this.viewer = viewer;
        this.mode = options.mode === 'author' || options.readOnly === false ? 'author' : 'view';
        this.readOnly = this.mode !== 'author';
        this.send = options.send || null; // (payload) => boolean, provided by collaboration
        this.container = options.container || null;
        this.adapter = null;
        this._adapterUnsubscribe = null;
        this._loadGeneration = 0;
        this._loadController = null;
        this._pendingSource = null;
        this._activeModelKey = null;
        this._activeModel = null;
        this._modelReady = false;
        this.store = new AnnotationStore();
        this.xrLayer = new AnnotationXRLayer(this, options.xr || {});

        // Behavior toggles (kept in code for now; all default on).
        this.options = {
            rightClickPing: options.rightClickPing !== false,  // ghost ping at right-click point, shared with the room
            occlusionFade: options.occlusionFade !== false,    // fade markers hidden behind the model
            diveLighting: options.diveLighting !== false,      // dim markers in dive mode until torch-lit
            initialHidden: options.initialHidden === true,      // allow callers to reveal only after viewer/model UI settles
            showToggle: options.showToggle !== false,
            showExport: options.showExport === true,
        };

        this.layer = null;
        this.annotations = this.store.annotations; // id -> annotation payload (position = sync target)
        this.markers = new Map();        // id -> marker root element
        this.displayPositions = new Map(); // id -> {x,y,z} smoothed render position
        this.lerping = new Set();        // annotation ids currently easing toward position
        this.pendingCreates = new Map(); // client_id -> temp annotation id
        this.pendingOperations = new Map(); // client_id -> optimistic rollback record
        this.tempIdCounter = -1;

        this.scaleBars = new Map();      // id -> {data, line, labelEl}
        this.selection = [];             // selected annotation ids (shift-click or touch multi-select)
        this.scalePair = null;           // [a,b] endpoint pair for the current scale preview/create action
        this.previewBar = null;          // {line, labelEl} between scalePair endpoints
        this.remotePreviewBars = new Map(); // user pair key -> remote temporary scale bar
        this._touchPairingAnchor = null; // marker long-pressed on touch; next marker tap completes the pair
        this._touchMultiSelectActive = false; // after touch pairing, later taps add visibility selections

        this.moveTarget = null;          // annotation id in moveable state
        this.dragState = null;           // active marker drag {id, moved, originalPosition, lastSentAt, pointerId}
        this.pings = new Map();          // key -> {el, position, expiresAt|null}
        this.userPings = new Map();      // participant_id -> ping key (one live ping per device)
        this.localPingKey = null;        // ping held open while the create menu/editor shows
        this.pingCounter = 0;
        this._rightDrag = null;          // right-button gesture tracking (menu only on a clean click)

        // Remote focus presence: what other users have selected / are editing.
        this.remoteFocus = new Map();    // participant_id -> {editing, selected, selectedBars, openPanel, panelMode, title, notes, username, color, expiresAt}
        this._focusInterval = null;      // keepalive while we're editing or have a selection
        this._editDraftTitle = '';       // live draft title while our edit panel is open
        this._editDraftNotes = '';       // live draft notes while our edit panel is open
        this._editingId = null;          // annotation id our edit panel is open for

        this.occlusionFactors = new Map(); // id -> smoothed visibility factor (OCCLUDED_OPACITY..1)
        this.occlusionTargets = new Map(); // id -> target factor
        this._grid = null;                 // voxel grid (early/fallback path)
        this._gridBuild = null;
        this._triGrids = null;             // triangle-bucket grids: exact raycasts in microseconds
        this._triBuild = null;

        this.annotationsVisible = true;  // master toggle (the pin button)
        this._visBtn = null;
        this._exportBtn = null;

        this.openPanelFor = null;
        this._mirroredFocusUserId = null;
        this.overlayEl = null;
        this.panelEl = null;             // popup/editor panel
        this.menuEl = null;              // context menu
        this.toastEl = null;
        this.canvasEl = null;
        this._detachLongPress = null;
        this.toastTimer = null;
        this.rafHandle = null;
        this._lastFrameTs = 0;
        this.destroyed = false;

        this._boundOnContextMenu = (e) => this.onCanvasContextMenu(e);
        this._boundOnCanvasPointerDown = (e) => this.onCanvasPointerDown(e);
        this._boundOnCanvasPointerUp = (e) => this.onCanvasPointerUp(e);
        this._boundOnDocPointerDown = (e) => this.onDocumentPointerDown(e);
        this._boundOnKeyDown = (e) => this.onKeyDown(e);
        this._boundOnScreenshotClick = (e) => this.onScreenshotClick(e);

        this.init();
        if (options.adapter) this.setAdapter(options.adapter);
    }

    get THREE() {
        return THREE;
    }

    setMode(mode) {
        this.mode = mode === 'author' ? 'author' : 'view';
        this.readOnly = this.mode !== 'author';
        if (this.readOnly) this.dismissTransientUi();
        this.updateControlButtons();
        return this.mode;
    }

    getMode() {
        return this.mode;
    }

    setAdapter(adapter) {
        this._adapterUnsubscribe?.();
        this._adapterUnsubscribe = null;
        this.adapter?.dispose?.();
        this.adapter = adapter || null;
        this.updateControlButtons();
        if (this.adapter?.subscribe) {
            this._adapterUnsubscribe = this.adapter.subscribe((event) => this.handleAdapterEvent(event));
        }
        if (this.adapter && this._activeModelKey) {
            this.adapter.setContext?.({
                modelKey: this._activeModelKey,
                modelConfig: this.viewer?.config?.models?.[this._activeModelKey] || null,
            });
            if (this._modelReady) this.adapter.requestSnapshot?.();
        }
        return this;
    }

    handleAdapterEvent(event) {
        if (!event) return;
        if (!this._modelReady && event.type !== 'error') return;
        if (event.message) {
            this.handleSyncMessage(event.message);
            return;
        }
        if (event.type === 'snapshot') {
            this.applyState(event.snapshot || event.data || {});
        } else if (event.type === 'operation' || event.type === 'preview' || event.type === 'presence') {
            this.applyUpdate(event.operation || event.data || event);
        } else if (event.type === 'error') {
            this.onServerError(event);
        }
    }

    async load(source, options = {}) {
        const generation = ++this._loadGeneration;
        this._loadController?.abort();
        this._loadController = typeof AbortController === 'undefined' ? null : new AbortController();
        const signal = options.signal || this._loadController?.signal;
        try {
            let input = source;
            if (typeof source === 'string') {
                const response = await fetch(source, { signal });
                if (!response.ok) throw new Error(`Could not load annotations (${response.status})`);
                input = await response.json();
            }
            if (generation !== this._loadGeneration) return null;
            const result = this.loadStaticData(this.convertDocumentToModelSpace(input));
            this.emit('annotations-loaded', {
                modelKey: options.modelKey ?? this._activeModelKey,
                document: this.getDocument(),
                warnings: result?.warnings || [],
            });
            return result;
        } catch (error) {
            if (error?.name === 'AbortError' || generation !== this._loadGeneration) return null;
            this.clear();
            this.emit('annotation-error', { error, modelKey: options.modelKey ?? this._activeModelKey });
            throw error;
        }
    }

    getActiveModelRoot() {
        if (this._activeModel) return this._activeModel;
        const current = this.viewer?.belowViewer?.getCurrentModel?.();
        return current?.model || current || null;
    }

    convertDocumentToModelSpace(input, model = this.getActiveModelRoot()) {
        if (!input || input.layer?.coordinate_space !== 'world') return input;
        if (!model?.worldToLocal || !model?.position?.clone) {
            throw new Error('World-space annotations require an active model before loading.');
        }
        model.updateWorldMatrix?.(true, false);
        return {
            ...input,
            layer: { ...input.layer, coordinate_space: 'model' },
            annotations: Array.isArray(input.annotations)
                ? input.annotations.map((annotation) => {
                    const position = normalizePosition(annotation?.position);
                    if (!position) return annotation;
                    const local = model.worldToLocal(
                        model.position.clone().set(position.x, position.y, position.z)
                    );
                    return {
                        ...annotation,
                        position: { x: local.x, y: local.y, z: local.z },
                    };
                })
                : input.annotations,
        };
    }

    prepareModel(modelKey, modelConfig = {}) {
        const generation = ++this._loadGeneration;
        // Per-model fetches can be left to settle: generation checks below make
        // them inert. Aborting an unawaited fetch here produced an unhandled
        // AbortError in Chromium during immediate A -> B model reversals.
        this._activeModelKey = modelKey;
        this._activeModel = null;
        this._modelReady = false;
        if (this.overlayEl) this.overlayEl.style.visibility = 'hidden';
        this.adapter?.setContext?.({ modelKey, modelConfig });
        const source = modelConfig?.annotations;
        if (this.adapter || !source) {
            this._pendingSource = Promise.resolve({ generation, source: null });
            return;
        }
        this._pendingSource = Promise.resolve(typeof source === 'string'
            ? fetch(source).then((response) => {
                if (!response.ok) throw new Error(`Could not load annotations (${response.status})`);
                return response.json();
            })
            : source)
            .then((document) => ({ generation, source: document }))
            .catch((error) => {
                if (error?.name === 'AbortError' || generation !== this._loadGeneration) {
                    return { generation, source: null, stale: true };
                }
                throw error;
            });
    }

    async activateModel(modelKey, model, modelConfig = {}) {
        if (modelKey !== this._activeModelKey) return;
        this._activeModel = model || null;
        this._modelReady = true;
        this.xrLayer.attach(this._activeModel);
        try {
            const pending = await this._pendingSource;
            if (this.adapter) {
                this.adapter.requestSnapshot?.();
            } else if (pending && pending.generation === this._loadGeneration && pending.source) {
                const normalized = this.loadStaticData(
                    this.convertDocumentToModelSpace(pending.source, this._activeModel)
                );
                this.setAnnotationsVisible(modelConfig.annotationsVisible !== false);
                this.emit('annotations-loaded', {
                    modelKey,
                    document: this.getDocument(),
                    warnings: normalized.warnings,
                });
            } else {
                this.clear();
            }
        } catch (error) {
            if (modelKey === this._activeModelKey) {
                this.clear();
                this.emit('annotation-error', { error, modelKey });
            }
        } finally {
            if (modelKey === this._activeModelKey && this.overlayEl) {
                requestAnimationFrame(() => {
                    if (this.overlayEl) this.overlayEl.style.visibility = '';
                });
            }
        }
    }

    clear() {
        this.applyState({ layer: null, annotations: [], scale_bars: [] });
        this.emit('annotations-cleared', { modelKey: this._activeModelKey });
    }

    getDocument() {
        return serializeAnnotationDocument({
            layer: this.layer,
            annotations: this.sortedAnnotations(),
            scaleBars: Array.from(this.scaleBars.values(), (bar) => bar.data),
        });
    }

    list() {
        return this.sortedAnnotations().map((annotation) => {
            const marker = this.markers.get(annotation.id);
            const dot = marker?.querySelector('.bv-annotation-marker__dot');
            const rect = dot?.getBoundingClientRect();
            return {
                ...annotation,
                position: { ...annotation.position },
                number: dot?.textContent?.trim() || '',
                selected: this.selection.includes(annotation.id),
                screen: rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : null,
                opacity: marker ? Number(window.getComputedStyle(marker).opacity) : null,
            };
        });
    }

    listScaleBars() {
        return Array.from(this.scaleBars.values(), (bar) => ({
            ...bar.data,
            label: bar.labelEl?.textContent?.trim() || '',
            selected: !!bar.sticky,
            opacity: bar.labelEl ? Number(window.getComputedStyle(bar.labelEl).opacity) : null,
        }));
    }

    hitTest(clientX, clientY) {
        const world = this.raycastModelFromClient(Number(clientX), Number(clientY));
        return world ? this.worldPositionToModel(world) : null;
    }

    project(position) {
        const modelPosition = normalizePosition(position);
        const camera = this.getCamera();
        const canvas = this.getCanvas();
        if (!modelPosition || !camera || !canvas || !this.container) return null;
        const rect = canvas.getBoundingClientRect();
        const hostRect = this.container.getBoundingClientRect();
        const screen = this.projectToOverlay(
            this.modelPositionToWorld(modelPosition), camera, rect, hostRect, true
        );
        if (!screen) return null;
        return {
            x: Math.round((screen.x + hostRect.left) * 10) / 10,
            y: Math.round((screen.y + hostRect.top) * 10) / 10,
            overlayX: screen.x,
            overlayY: screen.y,
            z: screen.z,
        };
    }

    download(filename = null) {
        const documentValue = this.getDocument();
        const blob = new window.Blob([`${JSON.stringify(documentValue, null, 2)}\n`], { type: 'application/json' });
        const safeLayer = String(documentValue.layer?.name || 'annotations').replace(/[^A-Za-z0-9_-]+/g, '-');
        this.downloadBlob(blob, filename || `${safeLayer || 'annotations'}.annotations.json`);
        this.emit('annotations-exported', { document: documentValue });
        return documentValue;
    }

    create(input) {
        if (this.readOnly) return null;
        return this.createAnnotation(input.title, input.notes || '', input.position);
    }

    update(annotationId, patch = {}) {
        if (this.readOnly || !this.annotations.has(annotationId)) return null;
        const current = this.annotations.get(annotationId);
        if (patch.position) return this.move(annotationId, patch.position);
        const annotation = { ...current, ...patch };
        this.upsertAnnotation(annotation);
        const clientId = this.createClientId();
        this.pendingOperations.set(clientId, { annotation: current });
        const collapseOnly = Object.hasOwn(patch, 'collapsed') &&
            !Object.hasOwn(patch, 'title') && !Object.hasOwn(patch, 'notes');
        const operationAction = collapseOnly ? 'collapse' : 'edit';
        const sent = this.sendMessage(collapseOnly ? {
            type: 'annotation_update', action: 'collapse', id: annotationId,
            client_id: clientId, collapsed: !!annotation.collapsed,
        } : {
            type: 'annotation_update', action: 'edit', id: annotationId,
            client_id: clientId, title: annotation.title, notes: annotation.notes || '',
        }, { quiet: !this.adapter && !this.send });
        if (!sent) this.rollbackOptimisticOperation(clientId);
        else if (!this.adapter && !this.send) this.pendingOperations.delete(clientId);
        this.emit('annotation-changed', { action: operationAction, annotation });
        return annotation;
    }

    move(annotationId, position) {
        if (this.readOnly || !this.annotations.has(annotationId)) return null;
        const normalized = normalizePosition(position);
        if (!normalized) return null;
        const annotation = { ...this.annotations.get(annotationId), position: normalized };
        const previous = this.annotations.get(annotationId);
        this.upsertAnnotation(annotation);
        const clientId = this.createClientId();
        this.pendingOperations.set(clientId, { annotation: previous });
        const sent = this.sendMessage({
            type: 'annotation_update', action: 'move', id: annotationId,
            client_id: clientId, position: normalized,
        });
        if (!sent) this.rollbackOptimisticOperation(clientId);
        else if (!this.adapter && !this.send) this.pendingOperations.delete(clientId);
        this.emit('annotation-changed', { action: 'move', annotation });
        return annotation;
    }

    remove(annotationId) {
        if (this.readOnly || !this.annotations.has(annotationId)) return false;
        this.sendMessage({ type: 'annotation_update', action: 'delete', id: annotationId });
        if (!this.adapter && !this.send) this.removeAnnotationLocal(annotationId);
        this.emit('annotation-changed', { action: 'delete', annotationId });
        return true;
    }

    createScaleBar(a, b) {
        if (this.readOnly) return null;
        const existing = this.scaleBarForPair(a, b);
        if (existing) return existing.data;
        if (this.adapter || this.send) {
            this.sendMessage({ type: 'annotation_update', action: 'scalebar_create', a, b });
            return { a, b };
        }
        const data = this.store.createScaleBar(a, b);
        if (data) this.addScaleBar(data);
        return data;
    }

    removeScaleBar(scaleBarId) {
        if (this.readOnly || !this.scaleBars.has(scaleBarId)) return false;
        this.sendMessage({ type: 'annotation_update', action: 'scalebar_delete', id: scaleBarId });
        return true;
    }

    setVisible(visible) {
        this.setAnnotationsVisible(visible);
        return this.annotationsVisible;
    }

    isVisible() {
        return this.annotationsVisible;
    }

    select(annotationIds) {
        this.selection = this.store.select(annotationIds);
        this.updateSelectionVisuals();
        this.sendFocus();
        this.emit('annotation-selection-changed', { selection: [...this.selection] });
        return [...this.selection];
    }

    requestSnapshot() {
        this.requestSync();
    }

    createClientId() {
        return `c${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    }

    rollbackOptimisticOperation(clientId) {
        const rollback = this.pendingOperations?.get(clientId);
        this.pendingOperations?.delete(clientId);
        if (rollback?.annotation) this.upsertAnnotation({ ...rollback.annotation });
    }

    refreshPresence() {
        this.sendFocus();
    }

    setFollowedParticipant(participantId) {
        this._followedParticipantId = participantId === null || participantId === undefined
            ? null : String(participantId);
        this.syncFollowedAnnotationPanel();
    }

    // ------------------------------------------------------------------
    // Setup / teardown
    // ------------------------------------------------------------------

    init() {
        this.injectStyles();

        const canvas = this.getCanvas();
        const host = this.container || canvas?.parentElement || document.body;
        this.container = host;

        this.overlayEl = document.createElement('div');
        this.overlayEl.className = 'bv-annotation-overlay';
        if (this.options.initialHidden) {
            this.overlayEl.style.visibility = 'hidden';
        }
        this.overlayEl.addEventListener('contextmenu', (e) => e.preventDefault());
        host.appendChild(this.overlayEl);

        this.syncCanvasListeners();
        document.addEventListener('pointerdown', this._boundOnDocPointerDown, true);
        document.addEventListener('keydown', this._boundOnKeyDown);
        document.addEventListener('click', this._boundOnScreenshotClick, true);

        this._invalidateRects = () => { this._rects = null; this.positionVisibilityButton(); };
        window.addEventListener('resize', this._invalidateRects);
        document.addEventListener('fullscreenchange', this._invalidateRects);

        if (this.options.showToggle) this.createVisibilityButton();
        if (this.options.showExport) this.createExportButton();

        const tick = (ts) => {
            if (this.destroyed) return;
            const dt = this._lastFrameTs ? Math.min(0.1, (ts - this._lastFrameTs) / 1000) : 0.016;
            this._lastFrameTs = ts;
            try {
                this.updateFrame(dt);
            } catch (err) {
                // One bad frame must never kill the whole annotation layer.
                if (!this._frameErrorLogged) {
                    this._frameErrorLogged = true;
                    console.error('Annotation frame error (loop continues):', err);
                }
            }
            this.rafHandle = requestAnimationFrame(tick);
        };
        this.rafHandle = requestAnimationFrame(tick);

    }

    destroy() {
        this.destroyed = true;
        this._loadController?.abort();
        if (this.rafHandle) cancelAnimationFrame(this.rafHandle);
        this.detachCanvasListeners(this.canvasEl);
        this.canvasEl = null;
        document.removeEventListener('pointerdown', this._boundOnDocPointerDown, true);
        document.removeEventListener('keydown', this._boundOnKeyDown);
        document.removeEventListener('click', this._boundOnScreenshotClick, true);
        if (this._invalidateRects) {
            window.removeEventListener('resize', this._invalidateRects);
            document.removeEventListener('fullscreenchange', this._invalidateRects);
        }
        clearInterval(this._draftInterval);
        clearInterval(this._focusInterval);
        clearInterval(this._visPositionInterval);
        this.closeMenu();
        this.closePanel();
        this.clearPreviewBar();
        this.clearRemotePreviewBars();
        for (const bar of this.scaleBars.values()) this.removeBarVisual(bar);
        this.scaleBars.clear();
        for (const ping of this.pings.values()) ping.el.remove();
        this.pings.clear();
        this._visBtn?.remove();
        this._exportBtn?.remove();
        this.overlayEl?.remove();
        this.toastEl?.remove();
        this._adapterUnsubscribe?.();
        this._adapterUnsubscribe = null;
        this.adapter?.dispose?.();
        this.adapter = null;
        this.xrLayer.dispose();
        this.removeAllListeners();
    }

    injectStyles() {}

    // ------------------------------------------------------------------
    // Viewer access helpers
    // ------------------------------------------------------------------

    getCanvas() {
        const renderer = this.viewer?.getRenderer?.() || this.viewer?.renderer || this.viewer?.belowViewer?.renderer;
        return renderer?.domElement || null;
    }

    getRenderer() {
        return this.viewer?.getRenderer?.() || this.viewer?.renderer || this.viewer?.belowViewer?.renderer || null;
    }

    syncCanvasListeners() {
        const canvas = this.getCanvas();
        if (canvas === this.canvasEl) return;
        this.detachCanvasListeners(this.canvasEl);
        this.canvasEl = canvas;
        if (!canvas) return;

        if (!this._boundOnCanvasPointerMove) {
            this._boundOnCanvasPointerMove = (e) => this.onCanvasPointerMove(e);
        }
        canvas.addEventListener('contextmenu', this._boundOnContextMenu);
        canvas.addEventListener('pointerdown', this._boundOnCanvasPointerDown);
        canvas.addEventListener('pointerup', this._boundOnCanvasPointerUp);
        canvas.addEventListener('pointermove', this._boundOnCanvasPointerMove);
        // Touch has no right-click: a long-press opens the same menu
        // (iOS never fires contextmenu; Android's is suppressed above).
        this._detachLongPress = this.attachLongPress(
            canvas,
            (x, y) => this.handleModelRightClick({ clientX: x, clientY: y })
        );
        this._rects = null;
    }

    detachCanvasListeners(canvas) {
        if (!canvas) return;
        canvas.removeEventListener('contextmenu', this._boundOnContextMenu);
        canvas.removeEventListener('pointerdown', this._boundOnCanvasPointerDown);
        canvas.removeEventListener('pointerup', this._boundOnCanvasPointerUp);
        if (this._boundOnCanvasPointerMove) {
            canvas.removeEventListener('pointermove', this._boundOnCanvasPointerMove);
        }
        if (this._detachLongPress) {
            this._detachLongPress();
            this._detachLongPress = null;
        }
    }

    getCamera() {
        return this.viewer?.getCamera?.() || this.viewer?.camera || null;
    }

    getScene() {
        return this.viewer?.getScene?.() || this.viewer?.scene || this.viewer?.belowViewer?.scene || null;
    }

    rerenderViewer() {
        const renderer = this.getRenderer();
        const scene = this.getScene();
        const camera = this.getCamera();
        if (renderer?.render && scene && camera) {
            renderer.render(scene, camera);
        }
    }

    forceViewerRender() {
        if (typeof this.viewer?.forceRenderCurrentScene === 'function') {
            this.viewer.forceRenderCurrentScene();
            return;
        }
        this.rerenderViewer();
    }

    getModelRoot() {
        const asObject3D = (entry) => {
            if (!entry) return null;
            if (entry.isObject3D) return entry;
            if (entry.model?.isObject3D) return entry.model;
            if (entry.scene?.isObject3D) return entry.scene;
            if (entry.group?.isObject3D) return entry.group;
            return null;
        };

        const current = asObject3D(this.viewer?.getCurrentModel?.());
        if (current) return current;

        const loaded = this.viewer?.getLoadedModels?.() ||
            this.viewer?.belowViewer?.getLoadedModels?.() ||
            this.viewer?.belowViewer?.loadedModels;
        if (Array.isArray(loaded)) {
            for (let i = loaded.length - 1; i >= 0; i--) {
                const root = asObject3D(loaded[i]);
                if (root) return root;
            }
        }

        const measurementTargets = this.viewer?.measurementSystem?._raycastTargets;
        if (Array.isArray(measurementTargets)) {
            for (let i = measurementTargets.length - 1; i >= 0; i--) {
                const root = asObject3D(measurementTargets[i]);
                if (root) return root;
            }
        }
        return null;
    }

    modelPositionToWorld(position, target = new THREE.Vector3()) {
        target.set(position?.x || 0, position?.y || 0, position?.z || 0);
        const root = this._activeModel || this.getModelRoot();
        root?.updateWorldMatrix?.(true, false);
        return root?.localToWorld ? root.localToWorld(target) : target;
    }

    worldPositionToModel(position) {
        const target = position?.isVector3
            ? position.clone()
            : new THREE.Vector3(position?.x || 0, position?.y || 0, position?.z || 0);
        const root = this._activeModel || this.getModelRoot();
        root?.updateWorldMatrix?.(true, false);
        if (root?.worldToLocal) root.worldToLocal(target);
        return { x: target.x, y: target.y, z: target.z };
    }

    isDynamicTilesetRoot(root) {
        if (!root) return false;
        const loaded = this.viewer?.getLoadedModels?.() ||
            this.viewer?.belowViewer?.getLoadedModels?.() ||
            this.viewer?.belowViewer?.loadedModels;
        if (!Array.isArray(loaded)) return false;
        return loaded.some((entry) => {
            const model = entry?.model || entry?.scene || entry?.group || entry;
            return model === root && !!entry?.tileset;
        });
    }

    raycastModelFromClient(clientX, clientY) {
        const THREE = this.THREE;
        const canvas = this.getCanvas();
        const camera = this.getCamera();
        const modelRoot = this.getModelRoot();
        if (!THREE || !canvas || !camera || !modelRoot) return null;

        const rect = canvas.getBoundingClientRect();
        const ndc = new THREE.Vector2(
            ((clientX - rect.left) / rect.width) * 2 - 1,
            -((clientY - rect.top) / rect.height) * 2 + 1
        );
        if (!this._raycaster) this._raycaster = new THREE.Raycaster();
        this._raycaster.setFromCamera(ndc, camera);

        const dynamicTileset = this.isDynamicTilesetRoot(modelRoot);
        // Static GLBs use the cached acceleration structures. A streamed
        // tileset must raycast its live visible hierarchy: its LOD meshes are
        // replaced over time, so a grid built from an earlier frame is stale.
        if (!dynamicTileset && this._triGrids) {
            return this.raycastTriGrids(this._raycaster.ray.origin, this._raycaster.ray.direction);
        }
        // Grid still building (first ~second after model load): the voxel
        // approximation keeps interactions instant rather than freezing the
        // frame for hundreds of ms in three.js's brute-force raycast.
        const approx = dynamicTileset ? null : this.gridRaycastFromClient(clientX, clientY);
        if (approx) return approx;

        const hits = this._raycaster.intersectObject(modelRoot, true);
        for (const hit of hits) {
            if (hit.object?.isMesh && hit.object.visible) {
                return hit.point;
            }
        }
        return null;
    }

    // ------------------------------------------------------------------
    // Sync: messages from the server (or static data)
    // ------------------------------------------------------------------

    handleSyncMessage(data) {
        switch (data.type) {
            case 'annotation_state':
                this.applyState(data);
                break;
            case 'annotation_update':
                this.applyUpdate(data);
                break;
            case 'annotation_error':
                this.onServerError(data);
                break;
            case 'annotation_visibility':
                // Visibility is local UI state. Follow mode mirrors it through
                // annotation focus packets, not this legacy room-wide message.
                break;
        }
    }

    applyState(data) {
        // Authoritative snapshot: rebuild everything (initial sync, reconnect,
        // layer assignment changes from the management pages).
        this.layer = data.layer || null;
        this.exitMoveMode(false);
        this.closeMenu();
        this.closePanel();
        this.clearSelection();
        this.pendingCreates.clear();
        this.pendingOperations.clear();
        this.remoteFocus.clear();
        this.clearRemotePreviewBars();

        for (const marker of this.markers.values()) marker.remove();
        this.markers.clear();
        this.displayPositions.clear();
        this.lerping.clear();
        this.occlusionFactors.clear();
        this.occlusionTargets.clear();

        for (const bar of this.scaleBars.values()) this.removeBarVisual(bar);
        this.scaleBars.clear();

        this.store.replace({
            layer: data.layer || null,
            annotations: data.annotations || [],
            scale_bars: data.scale_bars || [],
        });

        for (const annotation of this.annotations.values()) {
            if (annotation && annotation.id !== null && annotation.id !== undefined) {
                const world = this.modelPositionToWorld(annotation.position);
                this.displayPositions.set(annotation.id, { x: world.x, y: world.y, z: world.z });
                this.createMarkerElement(annotation);
            }
        }
        for (const barData of (data.scale_bars || [])) {
            if (barData && typeof barData.id === 'number') {
                this.addScaleBar(barData);
            }
        }
        this.renumberMarkers();
        this.updateControlButtons();
        // The room's default visibility applies on join only - later state
        // refreshes must not stomp a viewer's own pin-button choice.
        if (!this._visibilityInitialized && typeof data.annotations_visible === 'boolean') {
            this._visibilityInitialized = true;
            if (!data.annotations_visible) this.setAnnotationsVisible(false);
        }
    }

    applyUpdate(data) {
        if (data.client_id) this.pendingOperations.delete(data.client_id);
        const action = data.action;
        const participantId = this.getMessageParticipantId(data);
        const localParticipantId = this.getLocalParticipantId();

        if (action === 'ping') {
            // Someone right-clicked the model (or is typing a draft title):
            // show/update their single transient ghost dot.
            if (data.position && participantId !== null && participantId !== localParticipantId) {
                this.upsertUserPing(participantId, data.position, data.title, data.avatar_color || null);
            }
            return;
        }

        if (action === 'focus') {
            // Presence: what another user has selected / is editing right now.
            if (participantId !== null && participantId !== localParticipantId) {
                this.upsertRemoteFocus(data);
            }
            return;
        }

        if (action === 'move' && data.preview) {
            // Live drag preview from another user - ease toward it. Previews
            // never replace the authoritative position: they ride alongside it
            // and expire, so an abandoned drag snaps back on its own.
            const annotation = this.annotations.get(data.annotation_id);
            if (annotation && data.position) {
                annotation.livePosition = data.position;
                annotation.liveUntil = performance.now() + 4000;
                this.lerping.add(data.annotation_id);
                this.refreshBarsForAnnotation(data.annotation_id);
            }
            return;
        }

        if (data.layer) this.layer = data.layer;

        if (action === 'create' && data.annotation) {
            // Reconcile our optimistic marker if this echo is ours.
            if (data.client_id && this.pendingCreates.has(data.client_id)) {
                const tempId = this.pendingCreates.get(data.client_id);
                this.pendingCreates.delete(data.client_id);
                this.removeAnnotationLocal(tempId);
            }
            this.upsertAnnotation(data.annotation);
            this.flashMarker(data.annotation.id);
        } else if ((action === 'edit' || action === 'move' || action === 'collapse') && data.annotation) {
            // A committed edit ends that user's editing presence.
            if (action === 'edit') {
                const focus = this.remoteFocus.get(participantId);
                if (focus && focus.editing === data.annotation.id) {
                    focus.editing = null;
                    focus.title = '';
                    this.applyRemoteFocusVisuals();
                }
            }
            this.upsertAnnotation(data.annotation);
            if (action === 'move') this.flashMarker(data.annotation.id);
        } else if (action === 'delete') {
            if (this.openPanelFor === data.annotation_id) this.closePanel();
            if (this.moveTarget === data.annotation_id) this.exitMoveMode(false);
            this.removeAnnotationLocal(data.annotation_id);
        } else if (action === 'scalebar_create' && data.scale_bar) {
            this.addScaleBar(data.scale_bar);
            if (participantId !== null && participantId === localParticipantId) {
                this.clearSelection();
            }
        } else if (action === 'scalebar_delete') {
            this.removeScaleBarVisual(data.scale_bar_id);
        }
        this.renumberMarkers();
        this.emit('annotation-changed', {
            action,
            annotation: data.annotation || null,
            annotationId: data.annotation_id ?? null,
            scaleBar: data.scale_bar || null,
            scaleBarId: data.scale_bar_id ?? null,
            remote: true,
        });
    }

    onServerError(data) {
        if (data.client_id && this.pendingCreates.has(data.client_id)) {
            const tempId = this.pendingCreates.get(data.client_id);
            this.pendingCreates.delete(data.client_id);
            this.removeAnnotationLocal(tempId);
            this.renumberMarkers();
        }
        if (data.client_id) this.rollbackOptimisticOperation(data.client_id);
        this.showToast(data.message || 'Annotation action failed');
        this.emit('annotation-error', { error: new Error(data.message || 'Annotation action failed'), data });
    }

    getLocalParticipantId() {
        const collaboration = typeof window !== 'undefined' ? window.collaboration : null;
        const id = this.adapter?.getCurrentParticipantId?.() ??
            collaboration?.getCurrentParticipantId?.() ??
            collaboration?.currentParticipantId ??
            collaboration?.currentUserInfo?.participant_id ??
            collaboration?.currentUserInfo?.id;
        return this.focusUserKey(id);
    }

    // Backwards-compatible alias for callers outside this module.
    getLocalUserId() {
        return this.getLocalParticipantId();
    }

    getMessageParticipantId(data) {
        return this.focusUserKey(data?.participant_id ?? data?.user_id);
    }

    focusUserKey(userId) {
        if (userId === null || userId === undefined) return null;
        return String(userId);
    }

    /**
     * Load annotations from a static `belowjs-annotations` JSON document.
     * Foundation for read-only annotation display on plain belowjs sites.
     */
    loadStaticData(doc) {
        const normalized = normalizeAnnotationDocument(doc);
        const annotations = normalized.document.annotations;
        const scaleBars = normalized.document.scale_bars;
        this.applyState({
            layer: { id: 0, ...normalized.document.layer },
            annotations,
            scale_bars: scaleBars,
        });
        return normalized;
    }

    upsertAnnotation(annotation) {
        const existing = this.annotations.get(annotation.id);
        // Authoritative echo supersedes any in-flight drag preview.
        delete annotation.livePosition;
        delete annotation.liveUntil;
        this.annotations.set(annotation.id, annotation);
        if (!existing) {
            const world = this.modelPositionToWorld(annotation.position);
            this.displayPositions.set(annotation.id, { x: world.x, y: world.y, z: world.z });
            this.createMarkerElement(annotation);
        } else {
            const marker = this.markers.get(annotation.id);
            const titleEl = marker?.querySelector('.bv-annotation-marker__title');
            if (titleEl) titleEl.textContent = annotation.title;
            marker?.classList.toggle('bv-annotation-marker--collapsed', !!annotation.collapsed);
            // Ease toward the new authoritative position unless we're the one dragging it.
            if (this.dragState?.id !== annotation.id) {
                this.lerping.add(annotation.id);
            }
        }
        // Re-layer any in-flight remote draft chip over the fresh title.
        if (this.remoteFocus.size > 0) this.applyRemoteFocusVisuals();
        this.refreshBarsForAnnotation(annotation.id);
        // Refresh an open popup so other users' edits appear live.
        if (this.openPanelFor === annotation.id && this.panelEl?.dataset.mode === 'view') {
            this.openViewPanel(annotation.id);
        }
        if (this.openPanelFor === annotation.id && this._mirroredFocusUserId !== null) {
            this.syncFollowedAnnotationPanel();
        }
        if (this.remoteFocus.size > 0) this.reconcileRemotePreviewBars();
        this.updateControlButtons();
    }

    removeAnnotationLocal(annotationId) {
        this.annotations.delete(annotationId);
        this.displayPositions.delete(annotationId);
        this.lerping.delete(annotationId);
        this.occlusionFactors.delete(annotationId);
        this.occlusionTargets.delete(annotationId);
        const marker = this.markers.get(annotationId);
        if (marker) {
            marker.remove();
            this.markers.delete(annotationId);
        }
        // Server cascades scale bars with the annotation; mirror locally.
        for (const [barId, bar] of [...this.scaleBars]) {
            if (bar.data.a === annotationId || bar.data.b === annotationId) {
                this.removeScaleBarVisual(barId);
            }
        }
        const selIndex = this.selection.indexOf(annotationId);
        if (selIndex !== -1) {
            this.selection.splice(selIndex, 1);
            if (this.scalePair?.includes(annotationId)) this.scalePair = null;
            if (this._touchPairingAnchor === annotationId) this._touchPairingAnchor = null;
            this.updateSelectionVisuals();
        }
        this.updateControlButtons();
    }

    // ------------------------------------------------------------------
    // Markers
    // ------------------------------------------------------------------

    createMarkerElement(annotation) {
        const marker = document.createElement('div');
        marker.className = 'bv-annotation-marker';
        if (annotation.pending) marker.classList.add('bv-annotation-marker--pending');
        if (annotation.collapsed) marker.classList.add('bv-annotation-marker--collapsed');
        marker.dataset.annotationId = String(annotation.id);
        marker.innerHTML = `
            <div class="bv-annotation-marker__dot"></div>
            <div class="bv-annotation-marker__title"></div>
        `;
        marker.querySelector('.bv-annotation-marker__title').textContent = annotation.title;
        marker.style.display = 'none';

        // Interactions live on the dot: the root is a zero-size anchor.
        const dot = marker.querySelector('.bv-annotation-marker__dot');
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            if (e.ctrlKey) {
                e.preventDefault();
                return;
            }
            if (this.dragState) return; // drop handled on pointerup
            if (e.shiftKey) {
                // Shift-click explicitly builds a measured pair. If a card is
                // open, that viewed marker counts as the first endpoint.
                if (this.selection.length === 0 && this.openPanelFor !== null &&
                    this.openPanelFor !== annotation.id && this.annotations.has(this.openPanelFor)) {
                    this.selection.push(this.openPanelFor);
                    this.closePanel();
                }
                this.toggleSelection(annotation.id);
                return;
            }
            if (this.extendSelectionFromCurrentFocus(annotation.id)) return;
            // While moving, plain clicks on the marker keep the drag state
            // armed; click away, Enter or Esc finishes the move.
            if (this.moveTarget !== null) return;
            this.setStickyBar(null); // a click elsewhere releases a selected bar
            this.clearSelection();
            this.openViewPanel(annotation.id);
        });

        dot.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.openMarkerMenu(annotation.id, e.clientX, e.clientY);
        });
        dot.addEventListener('pointerup', (e) => {
            if (!this.isContextClick(e) || e.button !== 0) return;
            e.preventDefault();
            e.stopPropagation();
            this.openMarkerMenu(annotation.id, e.clientX, e.clientY);
        });
        dot.addEventListener('wheel', (e) => {
            this.forwardWheelToCanvas(e);
        }, { passive: false });
        this.attachLongPress(dot, (x, y) => this.openMarkerMenu(annotation.id, x, y, { touchPairing: true }));

        // Hovering a marker lights any scale bar it anchors.
        dot.addEventListener('mouseenter', () => this.setBarsEndpointLit(annotation.id, true));
        dot.addEventListener('mouseleave', () => this.setBarsEndpointLit(annotation.id, false));

        dot.addEventListener('pointerdown', (e) => {
            if (e.button !== 0 || this.moveTarget !== annotation.id || this.readOnly) return;
            e.stopPropagation();
            this.startMarkerDrag(annotation.id, e);
        });

        this.overlayEl.appendChild(marker);
        this.markers.set(annotation.id, marker);
        return marker;
    }

    sortedAnnotations() {
        return Array.from(this.annotations.values()).sort((a, b) => {
            const ta = a.created_at || '';
            const tb = b.created_at || '';
            if (ta !== tb) return ta < tb ? -1 : 1;
            return (a.id || 0) - (b.id || 0);
        });
    }

    /** One-shot pulse on a marker's dot when it settles into place. */
    flashMarker(annotationId) {
        const dot = this.markers.get(annotationId)?.querySelector('.bv-annotation-marker__dot');
        if (!dot) return;
        dot.classList.remove('bv-annotation-marker__dot--settle');
        void dot.offsetWidth; // restart the animation if it's mid-flight
        dot.classList.add('bv-annotation-marker__dot--settle');
    }

    renumberMarkers() {
        // Collapsed markers carry no number - the visible sequence stays
        // dense and stable for everyone.
        let number = 0;
        for (const annotation of this.sortedAnnotations()) {
            const dot = this.markers.get(annotation.id)?.querySelector('.bv-annotation-marker__dot');
            if (!dot) continue;
            dot.textContent = annotation.collapsed ? '' : String(++number);
        }
    }

    // ------------------------------------------------------------------
    // Per-frame update: positions, smoothing, fading, scale bars, pings
    // ------------------------------------------------------------------

    // ------------------------------------------------------------------
    // Visibility toggle - dressed like the screenshot button, lives above it
    // ------------------------------------------------------------------

    createVisibilityButton() {
        const btn = document.createElement('button');
        btn.className = 'bv-annotation-vis-button';
        btn.title = 'Hide annotations';
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
                 stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>`;
        btn.addEventListener('click', () => this.setAnnotationsVisibleShared(!this.annotationsVisible));
        this.container.appendChild(btn);
        this._visBtn = btn;
        this.updateControlButtons();
        // BelowJS places screenshot/fullscreen/comfort controls after init;
        // keep snapping until that stack settles.
        setTimeout(() => this.positionVisibilityButton(), 1200);
        this._visPositionInterval = setInterval(() => this.positionVisibilityButton(), 500);
        setTimeout(() => {
            clearInterval(this._visPositionInterval);
            this._visPositionInterval = null;
            this.positionVisibilityButton();
        }, 8000);
    }

    createExportButton() {
        const btn = document.createElement('button');
        btn.className = 'bv-annotation-vis-button bv-annotation-export-button';
        btn.title = 'Download annotations JSON';
        btn.setAttribute('aria-label', 'Download annotations JSON');
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
                 stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path>
            </svg>`;
        btn.addEventListener('click', () => this.download());
        this.container.appendChild(btn);
        this._exportBtn = btn;
        this.updateControlButtons();
        this.positionVisibilityButton();
    }

    updateControlButtons() {
        const hasAnnotations = this.annotations.size > 0;
        if (this._visBtn) {
            const visible = this.options.showToggle && hasAnnotations;
            this._visBtn.style.display = visible ? 'flex' : 'none';
        }
        if (this._exportBtn) {
            const visible = this.options.showExport && this.mode === 'author' && !this.adapter && hasAnnotations;
            this._exportBtn.style.display = visible ? 'flex' : 'none';
        }
        if (hasAnnotations) this.positionVisibilityButton();
    }

    positionVisibilityButton() {
        const btn = this._visBtn;
        if (!btn) return;
        const hostRect = this.container.getBoundingClientRect();
        const selectors = [
            '.screenshot-button',
            '.fullscreen-button',
            '#vrComfortGlyph',
            '.vr-comfort-glyph',
            '.vr-comfort-button',
            '.comfort-glyph',
        ];
        const controls = selectors.flatMap((selector) =>
            Array.from(this.container.querySelectorAll(selector))
                .concat(Array.from(document.querySelectorAll(selector)))
        ).filter((el, index, arr) => {
            if (!el || el === btn || arr.indexOf(el) !== index) return false;
            if (el.closest?.('.below-ui-root--stereo-right')) return false;
            const style = window.getComputedStyle(el);
            if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.height > 0 && r.right > hostRect.left && r.left < hostRect.right &&
                r.bottom > hostRect.top && r.top < hostRect.bottom;
        });
        if (!controls.length) return;
        const topControl = controls.reduce((top, el) =>
            el.getBoundingClientRect().top < top.getBoundingClientRect().top ? el : top
        );
        const rightControl = controls.reduce((right, el) =>
            el.getBoundingClientRect().right > right.getBoundingClientRect().right ? el : right
        );
        const topRect = topControl.getBoundingClientRect();
        const rightRect = rightControl.getBoundingClientRect();
        const c = this.container.getBoundingClientRect();
        const gap = 14;
        const bottom = Math.max(12, Math.round(c.bottom - topRect.top + gap));
        const right = Math.max(8, Math.round(c.right - rightRect.right));
        btn.style.bottom = `${bottom}px`;
        btn.style.right = `${right}px`;
        if (this._exportBtn) {
            this._exportBtn.style.bottom = `${bottom + btn.offsetHeight + 10}px`;
            this._exportBtn.style.right = `${right}px`;
        }
    }

    onScreenshotClick(e) {
        const button = e.target?.closest?.('.screenshot-button');
        if (!button || !this.overlayEl) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation?.();
        this.captureAnnotatedScreenshot().catch((err) => {
            console.error('Annotated screenshot failed:', err);
            this.showToast(err?.message || 'Could not save screenshot');
        });
    }

    getScreenshotPixelRatio(source, sourceRect) {
        const currentRatio = sourceRect.width > 0 ? source.width / sourceRect.width : 1;
        const dpr = window.devicePixelRatio || 1;
        const targetRatio = Math.max(2, dpr, currentRatio || 1);
        const maxDimension = 8192;
        const maxRatio = Math.min(
            maxDimension / Math.max(1, sourceRect.width),
            maxDimension / Math.max(1, sourceRect.height)
        );
        return Math.max(1, Math.min(targetRatio, maxRatio));
    }

    withScreenshotResolution(source, sourceRect, callback) {
        const renderer = this.getRenderer();
        if (!renderer?.setPixelRatio || !renderer?.setSize) {
            return callback();
        }

        const previousRatio = renderer.getPixelRatio?.() || (sourceRect.width > 0 ? source.width / sourceRect.width : 1);
        const targetRatio = this.getScreenshotPixelRatio(source, sourceRect);
        const width = Math.max(1, Math.round(sourceRect.width));
        const height = Math.max(1, Math.round(sourceRect.height));
        const shouldResize = Math.abs(targetRatio - previousRatio) > 0.01;

        if (!shouldResize) {
            this.forceViewerRender();
            return callback();
        }

        renderer.setPixelRatio(targetRatio);
        renderer.setSize(width, height, false);
        this.forceViewerRender();

        try {
            return callback();
        } finally {
            renderer.setPixelRatio(previousRatio);
            renderer.setSize(width, height, false);
            this.forceViewerRender();
        }
    }

    async captureAnnotatedScreenshot({
        download = true,
        filename = null,
        includeAnnotations = this.annotationsVisible,
    } = {}) {
        const source = this.getCanvas();
        if (!source || !source.width || !source.height) {
            throw new Error('No viewer canvas available');
        }
        const sourceRect = source.getBoundingClientRect();
        if (!sourceRect.width || !sourceRect.height) {
            throw new Error('Viewer canvas is not visible');
        }

        const hiddenPreviewLines = [];
        const hidePreview = (bar) => {
            if (!bar?.line) return;
            hiddenPreviewLines.push([bar.line, bar.line.visible]);
            bar.line.visible = false;
        };
        hidePreview(this.previewBar);
        for (const bar of this.remotePreviewBars.values()) hidePreview(bar);
        if (hiddenPreviewLines.length > 0) this.forceViewerRender();

        let output;
        let captureRect = sourceRect;
        let scaleX;
        let scaleY;
        try {
            const captured = typeof this.viewer?.captureScreenshotCanvas === 'function'
                ? this.viewer.captureScreenshotCanvas()
                : null;
            if (captured?.canvas) {
                output = captured.canvas;
                captureRect = captured.sourceRect || sourceRect;
                scaleX = captured.scaleX;
                scaleY = captured.scaleY;
            } else {
                output = this.withScreenshotResolution(source, sourceRect, () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = source.width;
                    canvas.height = source.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
                    return canvas;
                });
            }
        } finally {
            for (const [line, visible] of hiddenPreviewLines) line.visible = visible;
            if (hiddenPreviewLines.length > 0) this.forceViewerRender();
        }

        const ctx = output.getContext('2d');
        scaleX = scaleX || output.width / captureRect.width;
        scaleY = scaleY || output.height / captureRect.height;
        if (includeAnnotations) {
            this.drawAnnotationsForScreenshot(ctx, captureRect, scaleX, scaleY);
        }

        if (download) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const suffix = includeAnnotations ? 'annotations' : 'screenshot';
            const blob = await this.canvasToPngBlob(output);
            this.downloadBlob(blob, filename || `belowjs-${suffix}-${timestamp}.png`);
            this.showToast(includeAnnotations ? 'Screenshot saved with annotations' : 'Screenshot saved');
        }
        return output;
    }

    captureScreenshot(options = {}) {
        return this.captureAnnotatedScreenshot(options);
    }

    drawAnnotationsForScreenshot(ctx, canvasRect, scaleX, scaleY) {
        if (!this.annotationsVisible || !this.overlayEl) return;
        for (const [id, marker] of this.markers) {
            try {
                this.drawMarkerForScreenshot(ctx, id, marker, canvasRect, scaleX, scaleY);
            } catch (err) {
                console.warn('Skipping annotation marker in screenshot:', id, err);
            }
        }
        for (const bar of this.scaleBars.values()) {
            if (!bar.preview && bar.labelEl) {
                try {
                    this.drawScaleLabelForScreenshot(ctx, bar.labelEl, canvasRect, scaleX, scaleY);
                } catch (err) {
                    console.warn('Skipping scale label in screenshot:', err);
                }
            }
        }
    }

    drawMarkerForScreenshot(ctx, id, marker, canvasRect, scaleX, scaleY) {
        if (!Number.isFinite(scaleX) || !Number.isFinite(scaleY) || scaleX <= 0 || scaleY <= 0) return;
        if (!marker || marker._bvVisible === false || marker.style.display === 'none') return;
        const markerStyle = window.getComputedStyle(marker);
        const markerOpacity = Number(markerStyle.opacity);
        if (markerStyle.display === 'none' || markerStyle.visibility === 'hidden' || markerOpacity <= 0) return;

        const dot = marker.querySelector('.bv-annotation-marker__dot');
        if (!dot) return;
        const dotStyle = window.getComputedStyle(dot);
        const dotRect = dot.getBoundingClientRect();
        if (!dotRect.width || !dotRect.height || dotStyle.visibility === 'hidden') return;

        const opacity = Math.max(0, Math.min(1, markerOpacity * Number(dotStyle.opacity || 1)));
        const x = (dotRect.left + dotRect.width / 2 - canvasRect.left) * scaleX;
        const y = (dotRect.top + dotRect.height / 2 - canvasRect.top) * scaleY;
        const radius = Math.max(dotRect.width * scaleX, dotRect.height * scaleY) / 2;
        if (![x, y, radius].every(Number.isFinite) || radius <= 0) return;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = dotStyle.backgroundColor || 'rgba(13, 18, 26, 0.78)';
        const selectedForScreenshot = marker.classList.contains('bv-annotation-marker--selected');
        const remoteSelectedForScreenshot = marker.classList.contains('bv-annotation-marker--remote-selected');
        ctx.strokeStyle = selectedForScreenshot
            ? 'rgba(100, 181, 246, 0.55)'
            : (remoteSelectedForScreenshot
                ? 'rgba(255, 255, 255, 0.55)'
                : (dotStyle.borderColor || 'rgba(255, 255, 255, 0.85)'));
        ctx.lineWidth = Math.max(1, parseFloat(dotStyle.borderWidth || '1.5') * Math.max(scaleX, scaleY));
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        const label = dot.textContent?.trim() || String(id);
        if (label && parseFloat(dotStyle.fontSize || '0') > 0) {
            ctx.fillStyle = dotStyle.color || 'white';
            ctx.font = this.canvasFontFromStyle(dotStyle, scaleY);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, x, y + 0.5 * scaleY);
        }
        ctx.restore();

        const title = marker.querySelector('.bv-annotation-marker__title');
        if (title) this.drawTitleChipForScreenshot(ctx, title, markerOpacity, canvasRect, scaleX, scaleY);
    }

    drawTitleChipForScreenshot(ctx, titleEl, parentOpacity, canvasRect, scaleX, scaleY) {
        if (!Number.isFinite(scaleX) || !Number.isFinite(scaleY) || scaleX <= 0 || scaleY <= 0) return;
        const style = window.getComputedStyle(titleEl);
        const opacity = Math.max(0, Math.min(1, parentOpacity * Number(style.opacity || 0)));
        if (opacity <= 0.01 || style.visibility === 'hidden' || style.display === 'none') return;
        const rect = titleEl.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = (rect.left - canvasRect.left) * scaleX;
        const y = (rect.top - canvasRect.top) * scaleY;
        const w = rect.width * scaleX;
        const h = rect.height * scaleY;
        if (![x, y, w, h].every(Number.isFinite) || w <= 0 || h <= 0) return;

        ctx.save();
        ctx.globalAlpha = opacity;
        this.drawRoundedRect(ctx, x, y, w, h, parseFloat(style.borderRadius || '8') * Math.max(scaleX, scaleY));
        ctx.fillStyle = style.backgroundColor || 'rgba(13, 18, 26, 0.82)';
        ctx.fill();
        ctx.strokeStyle = style.borderColor || 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = Math.max(1, parseFloat(style.borderWidth || '1') * Math.max(scaleX, scaleY));
        ctx.stroke();
        ctx.fillStyle = style.color || 'white';
        ctx.font = this.canvasFontFromStyle(style, scaleY);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.beginPath();
        ctx.rect(x + 6 * scaleX, y, Math.max(0, w - 12 * scaleX), h);
        ctx.clip();
        ctx.fillText(titleEl.textContent || '', x + 9 * scaleX, y + h / 2);
        ctx.restore();
    }

    drawScaleLabelForScreenshot(ctx, labelEl, canvasRect, scaleX, scaleY) {
        if (!Number.isFinite(scaleX) || !Number.isFinite(scaleY) || scaleX <= 0 || scaleY <= 0) return;
        const style = window.getComputedStyle(labelEl);
        const opacity = Number(style.opacity || 1);
        if (style.display === 'none' || style.visibility === 'hidden' || opacity <= 0.01) return;
        const rect = labelEl.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = (rect.left - canvasRect.left) * scaleX;
        const y = (rect.top - canvasRect.top) * scaleY;
        const w = rect.width * scaleX;
        const h = rect.height * scaleY;
        if (![x, y, w, h].every(Number.isFinite) || w <= 0 || h <= 0) return;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
        this.drawRoundedRect(ctx, x, y, w, h, parseFloat(style.borderRadius || '10') * Math.max(scaleX, scaleY));
        ctx.fillStyle = style.backgroundColor || 'rgba(13, 18, 26, 0.78)';
        ctx.fill();
        ctx.strokeStyle = style.borderColor || 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = Math.max(1, parseFloat(style.borderWidth || '1') * Math.max(scaleX, scaleY));
        ctx.stroke();
        ctx.fillStyle = style.color || 'white';
        ctx.font = this.canvasFontFromStyle(style, scaleY);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labelEl.textContent || '', x + w / 2, y + h / 2);
        ctx.restore();
    }

    drawRoundedRect(ctx, x, y, w, h, r) {
        const radius = Math.min(Math.max(0, r), w / 2, h / 2);
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + w - radius, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
        ctx.lineTo(x + w, y + h - radius);
        ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
        ctx.lineTo(x + radius, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }

    canvasFontFromStyle(style, scaleY) {
        const size = Math.max(1, parseFloat(style.fontSize || '12') * scaleY);
        const weight = style.fontWeight || '400';
        const family = style.fontFamily || 'sans-serif';
        return `${weight} ${size}px ${family}`;
    }

    canvasToPngBlob(canvas) {
        if (!canvas || !canvas.width || !canvas.height) {
            return Promise.reject(new Error('Screenshot canvas is empty'));
        }
        return new Promise((resolve, reject) => {
            canvas.toBlob((result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(new Error('PNG export failed'));
                }
            }, 'image/png');
        });
    }

    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    setAnnotationsVisible(visible) {
        this.annotationsVisible = !!visible;
        this.overlayEl.style.display = visible ? '' : 'none';
        for (const bar of this.scaleBars.values()) bar.line.visible = visible;
        if (this.previewBar) this.previewBar.line.visible = visible;
        if (!visible) {
            this.closeMenu();
            this.closePanel();
            this.exitMoveMode(false);
        }
        this._visBtn?.classList.toggle('bv-annotation-vis-button--off', !visible);
        if (this._visBtn) this._visBtn.title = visible ? 'Hide annotations' : 'Show annotations';
        this.emit('annotation-visibility-changed', { visible: this.annotationsVisible });
        this.syncFollowedAnnotationPanel();
    }

    setAnnotationsVisibleShared(visible) {
        this.setAnnotationsVisible(visible);
        this.sendFocus();
    }

    getRects() {
        // getBoundingClientRect forces layout - cache it. Resize and
        // fullscreen changes invalidate immediately; a 1s TTL catches the rest.
        const now = performance.now();
        if (!this._rects || now - this._rectsAt > 1000) {
            const canvas = this.getCanvas();
            if (!canvas) return null;
            this._rects = {
                rect: canvas.getBoundingClientRect(),
                hostRect: this.overlayEl.getBoundingClientRect(),
            };
            this._rectsAt = now;
        }
        return this._rects;
    }

    syncDisplayPositionsToModelTransform() {
        const root = this._activeModel || this.getModelRoot();
        if (!root?.matrixWorld) return;
        root.updateWorldMatrix?.(true, false);
        if (!this._modelTransformPoint) this._modelTransformPoint = new THREE.Vector3();
        for (const [id, annotation] of this.annotations) {
            // Active drags own their exact screen/world position. Remote move
            // previews and committed moves are eased in the next frame phase.
            if (this.dragState?.id === id || this.lerping.has(id)) continue;
            const display = this.displayPositions.get(id);
            if (!display || !annotation?.position) continue;
            this._modelTransformPoint
                .set(annotation.position.x, annotation.position.y, annotation.position.z)
                .applyMatrix4(root.matrixWorld);
            display.x = this._modelTransformPoint.x;
            display.y = this._modelTransformPoint.y;
            display.z = this._modelTransformPoint.z;
        }
    }

    updateFrame(dt) {
        this.syncCanvasListeners();
        this.xrLayer.sync();

        const THREE = this.THREE;
        const camera = this.getCamera();
        if (!THREE || !camera) return;

        if (!this._projVector) this._projVector = new THREE.Vector3();
        if (!this._tmpVecA) this._tmpVecA = new THREE.Vector3();
        if (!this._tmpVecB) this._tmpVecB = new THREE.Vector3();

        const rects = this.getRects();
        if (!rects) return;
        const { rect, hostRect } = rects;

        this._probeTick = (this._probeTick || 0) + 1;
        camera.updateMatrixWorld();

        // Model-local annotations must follow later scene transforms exactly:
        // AR anchoring, XR scaling, model rotation, and dynamic room transforms
        // can all change after the document has loaded.
        this.syncDisplayPositionsToModelTransform();

        // 1. Ease display positions toward sync targets (remote moves).
        if (this.lerping.size > 0) {
            const t = 1 - Math.exp(-12 * dt);
            const nowTs = performance.now();
            // Deleting the current entry during Set iteration is safe in JS.
            for (const id of this.lerping) {
                const annotation = this.annotations.get(id);
                const display = this.displayPositions.get(id);
                if (!annotation || !display) {
                    this.lerping.delete(id);
                    continue;
                }
                // A live drag preview overrides the authoritative position
                // until it expires or a commit clears it.
                if (annotation.livePosition && nowTs > (annotation.liveUntil || 0)) {
                    delete annotation.livePosition;
                    delete annotation.liveUntil;
                }
                const localTarget = annotation.livePosition || annotation.position;
                const worldTarget = this.modelPositionToWorld(localTarget, this._annotationWorldTarget || (this._annotationWorldTarget = new THREE.Vector3()));
                const target = worldTarget;
                const dx = target.x - display.x;
                const dy = target.y - display.y;
                const dz = target.z - display.z;
                const distSq = dx * dx + dy * dy + dz * dz;
                if (distSq > 25) {
                    // True teleport: snap.
                    display.x = target.x; display.y = target.y; display.z = target.z;
                    if (!annotation.livePosition) this.lerping.delete(id);
                } else if (distSq < 1e-6) {
                    display.x = target.x; display.y = target.y; display.z = target.z;
                    // Keep watching while a preview is active so its expiry
                    // eases the marker back to the authoritative position.
                    if (!annotation.livePosition) this.lerping.delete(id);
                } else {
                    display.x += dx * t;
                    display.y += dy * t;
                    display.z += dz * t;
                }
                this.refreshBarsForAnnotation(id, true);
            }
        }

        // 2. Keep the spatial structures warm (both no-op once built): the
        //    voxel grid backs occlusion + early interactions, the triangle
        //    buckets make every precise raycast instant.
        this.stepOcclusionGridBuild();
        this.stepTriGridBuild();

        // Hidden via the pin button: structures stay warm, nothing renders.
        if (!this.annotationsVisible) return;

        //    Occlusion: exact triangle-grid rays (every 3rd frame is plenty),
        //    voxel-grid ray-march while the buckets are still building.
        if (this.options.occlusionFade && this._probeTick % 3 === 0) {
            const root = this.getModelRoot();
            if (this.isDynamicTilesetRoot(root)) {
                this.runTilesetOcclusionTests(camera, root);
            } else if (this._triGrids) {
                this.runOcclusionTestsTri(camera, rect);
            } else {
                this.runOcclusionTests(camera);
            }
        }

        // 3. Dive-mode torch lighting state, computed once per frame.
        const lightState = this.options.diveLighting ? this.getDiveLightState() : null;

        // 4. Project markers and apply combined opacity. Style writes are
        //    skipped when values haven't changed to avoid needless paints.
        const occlusionEase = 1 - Math.exp(-8 * dt);
        for (const [id, marker] of this.markers) {
            const display = this.displayPositions.get(id);
            const screen = display ? this.projectToOverlay(display, camera, rect, hostRect) : null;
            if (!screen) {
                if (marker._bvVisible !== false) {
                    marker.style.display = 'none';
                    marker._bvVisible = false;
                }
                continue;
            }
            if (marker._bvVisible !== true) {
                marker.style.display = 'block';
                marker._bvVisible = true;
            }
            // While this marker is being screen-dragged it tracks the cursor
            // directly; the projection would lag a throttled raycast behind.
            if (this.dragState?.id === id && this.dragState.screenDrag) {
                // transform set by the drag handler
            } else {
                const rx = Math.round(screen.x * 10) / 10;
                const ry = Math.round(screen.y * 10) / 10;
                if (marker._bvX !== rx || marker._bvY !== ry) {
                    marker.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
                    marker._bvX = rx;
                    marker._bvY = ry;
                }
            }

            // Smooth occlusion factor toward its target.
            let factor = this.occlusionFactors.get(id) ?? 1;
            const target = this.occlusionTargets.get(id) ?? 1;
            factor += (target - factor) * occlusionEase;
            this.occlusionFactors.set(id, factor);

            let opacity = factor;
            if (lightState) {
                opacity *= this.computeLightFactor(display, lightState);
            }
            if (this.markerShouldStayOpaque(id)) {
                opacity = 1;
            }
            const rounded = Math.round(opacity * 200) / 200;
            if (marker._bvOpacity !== rounded) {
                marker.style.opacity = String(rounded);
                marker._bvOpacity = rounded;
            }
        }

        // 5. Scale bar lines + labels (persistent and selection preview).
        for (const bar of this.scaleBars.values()) {
            this.updateBarVisual(bar, camera, rect, hostRect, lightState);
        }
        for (const bar of this.remotePreviewBars.values()) {
            this.updateBarVisual(bar, camera, rect, hostRect, lightState);
        }
        this.syncLocalPreviewBar();
        if (this.previewBar) this.updateBarVisual(this.previewBar, camera, rect, hostRect, lightState);

        // 6. Pings: expiry starts a fade-and-shrink exit, then removal.
        const now = performance.now();
        // Remote focus entries expire if their keepalive stops (cheap check,
        // every ~30 frames).
        if (this.remoteFocus.size > 0 && this._probeTick % 30 === 0) {
            this.sweepRemoteFocus(now);
        }
        for (const [key, ping] of this.pings) {
            if (ping.leaving) {
                if (now > ping.removeAt) {
                    ping.el.remove();
                    this.pings.delete(key);
                    continue;
                }
            } else if (ping.expiresAt !== null && now > ping.expiresAt) {
                this.dismissPing(key);
            }
            const pingWorld = this.modelPositionToWorld(
                ping.position,
                this._pingWorldPosition || (this._pingWorldPosition = new THREE.Vector3())
            );
            const screen = this.projectToOverlay(pingWorld, camera, rect, hostRect);
            if (!screen) {
                ping.el.style.display = 'none';
            } else {
                ping.el.style.display = 'block';
                ping.el.style.transform = `translate3d(${screen.x}px, ${screen.y}px, 0)`;
            }
        }
    }

    projectToOverlay(position, camera, rect, hostRect, allowOffscreen) {
        // Returns a shared scratch object - consume immediately, never store.
        const v = this._projVector;
        v.set(position.x, position.y, position.z).project(camera);
        if (v.z > 1 || v.z < -1) return null;
        const x = (v.x * 0.5 + 0.5) * rect.width + (rect.left - hostRect.left);
        const y = (-v.y * 0.5 + 0.5) * rect.height + (rect.top - hostRect.top);
        if (!allowOffscreen &&
            (x < -60 || y < -60 || x > hostRect.width + 60 || y > hostRect.height + 60)) return null;
        if (!this._screenOut) this._screenOut = { x: 0, y: 0 };
        this._screenOut.x = x;
        this._screenOut.y = y;
        return this._screenOut;
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

    runOcclusionTestsTri(camera, rect) {
        const THREE = this.THREE;
        if (!this._occScratch) {
            this._occScratch = {
                right: new THREE.Vector3(),
                up: new THREE.Vector3(),
                point: new THREE.Vector3(),
                cam: new THREE.Vector3(),
            };
        }
        const s = this._occScratch;
        s.cam.setFromMatrixPosition(camera.matrixWorld);
        s.right.setFromMatrixColumn(camera.matrixWorld, 0);
        s.up.setFromMatrixColumn(camera.matrixWorld, 1);
        const fovScale = 2 * Math.tan(((camera.fov || 60) * Math.PI) / 360);

        for (const [id, marker] of this.markers) {
            if (marker._bvVisible === false) continue;
            const display = this.displayPositions.get(id);
            if (!display) continue;
            const dx = display.x - s.cam.x;
            const dy = display.y - s.cam.y;
            const dz = display.z - s.cam.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            // Sample offsets matching the dot's on-screen radius (~9px).
            const r = Math.max(0.001, dist * fovScale * (9 / Math.max(1, rect.height)));
            let visible = 0;
            for (let i = 0; i < 5; i++) {
                const ox = i === 1 ? r : i === 2 ? -r : 0;
                const oy = i === 3 ? r : i === 4 ? -r : 0;
                s.point.set(
                    display.x + s.right.x * ox + s.up.x * oy,
                    display.y + s.right.y * ox + s.up.y * oy,
                    display.z + s.right.z * ox + s.up.z * oy
                );
                if (!this.triRayBlocked(s.point, s.cam, dist)) visible++;
            }
            const fraction = visible / 5;
            this.occlusionTargets.set(id, OCCLUDED_OPACITY + (1 - OCCLUDED_OPACITY) * fraction);
        }
    }

    /**
     * Is the segment point->camera blocked by the model? Clearance at both
     * ends so surface-mounted markers never self-occlude.
     */
    triRayBlocked(pointWorld, camWorld, distWorld) {
        const THREE = this.THREE;
        const grids = this._triGrids?.grids;
        if (!grids) return false;
        if (!this._blockScratch) {
            this._blockScratch = { inv: new THREE.Matrix4(), p: new THREE.Vector3(), c: new THREE.Vector3() };
        }
        const s = this._blockScratch;
        // Fractional clearances: ~0.35m off the surface, ~0.2m at the camera.
        const startClear = Math.min(0.45, 0.35 / Math.max(0.001, distWorld));
        const endClear = Math.min(0.45, 0.2 / Math.max(0.001, distWorld));
        for (const g of grids) {
            s.inv.copy(g.mesh.matrixWorld).invert();
            s.p.copy(pointWorld).applyMatrix4(s.inv);
            s.c.copy(camWorld).applyMatrix4(s.inv);
            // Unnormalized direction: t runs 0 (point) to 1 (camera).
            const dx = s.c.x - s.p.x, dy = s.c.y - s.p.y, dz = s.c.z - s.p.z;
            const ox = s.p.x + dx * startClear;
            const oy = s.p.y + dy * startClear;
            const oz = s.p.z + dz * startClear;
            const t = this.raycastTriGridLocal(g, ox, oy, oz, dx, dy, dz);
            if (t >= 0 && t < 1 - startClear - endClear) return true;
        }
        return false;
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

    stepOcclusionGridBuild(budgetMs = 2.5) {
        const root = this.getModelRoot();
        if (!root) {
            this._grid = null;
            this._gridBuild = null;
            return;
        }
        if (this.isDynamicTilesetRoot(root)) {
            this._grid = null;
            this._gridBuild = null;
            return;
        }
        if (this._grid && this._grid.rootUuid === root.uuid) return;
        // Model changed: drop the stale grid and any stale build.
        if (this._grid && this._grid.rootUuid !== root.uuid) this._grid = null;
        if (this._gridBuild && this._gridBuild.rootUuid !== root.uuid) this._gridBuild = null;

        const THREE = this.THREE;
        if (!this._gridBuild) {
            const box = new THREE.Box3().setFromObject(root);
            if (box.isEmpty()) return;
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z, 0.001);
            const cell = maxDim / 96;
            const nx = Math.min(160, Math.max(2, Math.ceil(size.x / cell) + 2));
            const ny = Math.min(160, Math.max(2, Math.ceil(size.y / cell) + 2));
            const nz = Math.min(160, Math.max(2, Math.ceil(size.z / cell) + 2));
            const jobs = [];
            root.updateWorldMatrix(true, true);
            root.traverse((obj) => {
                if (obj.isMesh && obj.visible && obj.geometry?.attributes?.position) {
                    jobs.push(obj);
                }
            });
            this._gridBuild = {
                rootUuid: root.uuid,
                minX: box.min.x - cell, minY: box.min.y - cell, minZ: box.min.z - cell,
                cell, nx, ny, nz,
                data: new Uint8Array(nx * ny * nz),
                jobs,
                jobIndex: 0,
                vertIndex: 0,
            };
        }

        const build = this._gridBuild;
        const deadline = performance.now() + budgetMs;
        const v = this._tmpVecA;
        let sinceCheck = 0;
        while (build.jobIndex < build.jobs.length) {
            const mesh = build.jobs[build.jobIndex];
            const attr = mesh.geometry.attributes.position;
            const count = attr.count;
            const stride = Math.max(1, Math.floor(count / 200000));
            let i = build.vertIndex;
            while (i < count) {
                v.fromBufferAttribute(attr, i).applyMatrix4(mesh.matrixWorld);
                const gx = ((v.x - build.minX) / build.cell) | 0;
                const gy = ((v.y - build.minY) / build.cell) | 0;
                const gz = ((v.z - build.minZ) / build.cell) | 0;
                if (gx >= 0 && gy >= 0 && gz >= 0 && gx < build.nx && gy < build.ny && gz < build.nz) {
                    build.data[(gz * build.ny + gy) * build.nx + gx] = 1;
                }
                i += stride;
                if (++sinceCheck >= 2000) {
                    sinceCheck = 0;
                    if (performance.now() > deadline) {
                        build.vertIndex = i;
                        return;
                    }
                }
            }
            build.jobIndex++;
            build.vertIndex = 0;
        }
        this._grid = build;
        this._gridBuild = null;
    }

    gridRayOccluded(grid, from, toX, toY, toZ) {
        const dx = toX - from.x;
        const dy = toY - from.y;
        const dz = toZ - from.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < grid.cell * 3.5) return false;
        const inv = 1 / dist;
        const ux = dx * inv, uy = dy * inv, uz = dz * inv;
        // Clearance: skip the surface the marker sits on and the camera's
        // immediate surroundings, so on-surface markers never self-occlude.
        const startT = grid.cell * 1.8;
        const endT = dist - grid.cell * 1.2;
        const step = grid.cell * 0.6;
        let consecutive = 0;
        for (let t = startT; t < endT; t += step) {
            const gx = ((from.x + ux * t - grid.minX) / grid.cell) | 0;
            const gy = ((from.y + uy * t - grid.minY) / grid.cell) | 0;
            const gz = ((from.z + uz * t - grid.minZ) / grid.cell) | 0;
            if (gx < 0 || gy < 0 || gz < 0 || gx >= grid.nx || gy >= grid.ny || gz >= grid.nz) {
                consecutive = 0;
                continue;
            }
            if (grid.data[(gz * grid.ny + gy) * grid.nx + gx]) {
                if (++consecutive >= 2) return true;
            } else {
                consecutive = 0;
            }
        }
        return false;
    }

    gridRaycastFromClient(clientX, clientY) {
        // Approximate surface point under the cursor via the voxel grid -
        // microseconds instead of a full mesh raycast. Used for live drag
        // previews only; commits always use one precise mesh raycast.
        const grid = this._grid;
        const THREE = this.THREE;
        const camera = this.getCamera();
        const rects = this.getRects();
        if (!grid || !THREE || !camera || !rects) return null;

        const ndcX = ((clientX - rects.rect.left) / rects.rect.width) * 2 - 1;
        const ndcY = -((clientY - rects.rect.top) / rects.rect.height) * 2 + 1;
        if (!this._gridRaycaster) this._gridRaycaster = new THREE.Raycaster();
        this._gridRaycaster.setFromCamera({ x: ndcX, y: ndcY }, camera);
        const origin = this._gridRaycaster.ray.origin;
        const dir = this._gridRaycaster.ray.direction;

        // Clip the march to the grid bounds (slab test).
        const maxX = grid.minX + grid.nx * grid.cell;
        const maxY = grid.minY + grid.ny * grid.cell;
        const maxZ = grid.minZ + grid.nz * grid.cell;
        let tMin = 0;
        let tMax = Infinity;
        const axes = [
            [origin.x, dir.x, grid.minX, maxX],
            [origin.y, dir.y, grid.minY, maxY],
            [origin.z, dir.z, grid.minZ, maxZ],
        ];
        for (const [o, d, lo, hi] of axes) {
            if (Math.abs(d) < 1e-9) {
                if (o < lo || o > hi) return null;
                continue;
            }
            const t1 = (lo - o) / d;
            const t2 = (hi - o) / d;
            tMin = Math.max(tMin, Math.min(t1, t2));
            tMax = Math.min(tMax, Math.max(t1, t2));
        }
        if (tMax < tMin) return null;

        const step = grid.cell * 0.5;
        for (let t = Math.max(tMin, step); t < tMax; t += step) {
            const px = origin.x + dir.x * t;
            const py = origin.y + dir.y * t;
            const pz = origin.z + dir.z * t;
            const gx = ((px - grid.minX) / grid.cell) | 0;
            const gy = ((py - grid.minY) / grid.cell) | 0;
            const gz = ((pz - grid.minZ) / grid.cell) | 0;
            if (gx < 0 || gy < 0 || gz < 0 || gx >= grid.nx || gy >= grid.ny || gz >= grid.nz) continue;
            if (grid.data[(gz * grid.ny + gy) * grid.nx + gx]) {
                return { x: px, y: py, z: pz };
            }
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

    stepTriGridBuild(budgetMs = 3) {
        const root = this.getModelRoot();
        if (!root) {
            this._triGrids = null;
            this._triBuild = null;
            return;
        }
        if (this.isDynamicTilesetRoot(root)) {
            this._triGrids = null;
            this._triBuild = null;
            return;
        }
        if (this._triGrids && this._triGrids.rootUuid === root.uuid) return;
        if (this._triGrids && this._triGrids.rootUuid !== root.uuid) this._triGrids = null;
        if (this._triBuild && this._triBuild.rootUuid !== root.uuid) this._triBuild = null;

        if (!this._triBuild) {
            root.updateMatrixWorld(true);
            const meshes = [];
            root.traverse((o) => {
                if (o.isMesh && o.visible && o.geometry?.attributes?.position) meshes.push(o);
            });
            if (!meshes.length) return;
            this._triBuild = { rootUuid: root.uuid, meshes, meshIdx: 0, entry: null, grids: [] };
        }

        const build = this._triBuild;
        const deadline = performance.now() + budgetMs;
        while (performance.now() < deadline) {
            if (build.meshIdx >= build.meshes.length) {
                this._triGrids = { rootUuid: build.rootUuid, grids: build.grids };
                this._triBuild = null;
                return;
            }
            const mesh = build.meshes[build.meshIdx];
            if (!build.entry) {
                const geometry = mesh.geometry;
                if (!geometry.boundingBox) geometry.computeBoundingBox();
                const bb = geometry.boundingBox;
                const posAttr = geometry.attributes.position;
                const index = geometry.index ? geometry.index.array : null;
                const triCount = ((index ? index.length : posAttr.count) / 3) | 0;
                const sizeX = Math.max(1e-6, bb.max.x - bb.min.x);
                const sizeY = Math.max(1e-6, bb.max.y - bb.min.y);
                const sizeZ = Math.max(1e-6, bb.max.z - bb.min.z);
                // Cell size from the longest axis; per-axis counts so long
                // thin wrecks don't waste a cubic grid.
                const targetCell = Math.max(sizeX, sizeY, sizeZ) / 128;
                const nx = Math.max(1, Math.min(256, Math.ceil(sizeX / targetCell)));
                const ny = Math.max(1, Math.min(256, Math.ceil(sizeY / targetCell)));
                const nz = Math.max(1, Math.min(256, Math.ceil(sizeZ / targetCell)));
                build.entry = {
                    mesh, posAttr, index, triCount,
                    minX: bb.min.x, minY: bb.min.y, minZ: bb.min.z,
                    cellX: sizeX / nx, cellY: sizeY / ny, cellZ: sizeZ / nz,
                    nx, ny, nz,
                    counts: new Uint32Array(nx * ny * nz + 1),
                    offsets: null, buckets: null, cursor: 0, phase: 0,
                };
            }
            const e = build.entry;
            if (e.phase === 0 || e.phase === 2) {
                // Counting pass / fill pass share the triangle->cells mapping.
                const CHUNK = 8000;
                const end = Math.min(e.triCount, e.cursor + CHUNK);
                this.bucketTriangles(e, e.cursor, end, e.phase === 2);
                e.cursor = end;
                if (e.cursor >= e.triCount) {
                    if (e.phase === 0) {
                        // Cell c's count sits at counts[c+1]; a running sum
                        // turns counts[c] into cell c's bucket offset.
                        const counts = e.counts;
                        for (let i = 1; i < counts.length; i++) counts[i] += counts[i - 1];
                        e.offsets = counts;
                        e.buckets = new Uint32Array(counts[counts.length - 1]);
                        e.fillCursor = new Uint32Array(counts.length - 1);
                        e.phase = 2;
                        e.cursor = 0;
                    } else {
                        build.grids.push({
                            mesh: e.mesh, posAttr: e.posAttr, index: e.index,
                            minX: e.minX, minY: e.minY, minZ: e.minZ,
                            cellX: e.cellX, cellY: e.cellY, cellZ: e.cellZ,
                            nx: e.nx, ny: e.ny, nz: e.nz,
                            offsets: e.offsets, buckets: e.buckets,
                        });
                        build.meshIdx++;
                        build.entry = null;
                    }
                }
            }
        }
    }

    /** Map triangles [from, to) to overlapped cells: count them or write them. */
    bucketTriangles(e, from, to, write) {
        const { posAttr, index, nx, ny, nz, minX, minY, minZ, cellX, cellY, cellZ } = e;
        for (let t = from; t < to; t++) {
            const i0 = index ? index[t * 3] : t * 3;
            const i1 = index ? index[t * 3 + 1] : t * 3 + 1;
            const i2 = index ? index[t * 3 + 2] : t * 3 + 2;
            const ax = posAttr.getX(i0), ay = posAttr.getY(i0), az = posAttr.getZ(i0);
            const bx = posAttr.getX(i1), by = posAttr.getY(i1), bz = posAttr.getZ(i1);
            const cx = posAttr.getX(i2), cy = posAttr.getY(i2), cz = posAttr.getZ(i2);
            let gx0 = ((Math.min(ax, bx, cx) - minX) / cellX) | 0;
            let gx1 = ((Math.max(ax, bx, cx) - minX) / cellX) | 0;
            let gy0 = ((Math.min(ay, by, cy) - minY) / cellY) | 0;
            let gy1 = ((Math.max(ay, by, cy) - minY) / cellY) | 0;
            let gz0 = ((Math.min(az, bz, cz) - minZ) / cellZ) | 0;
            let gz1 = ((Math.max(az, bz, cz) - minZ) / cellZ) | 0;
            if (gx0 < 0) gx0 = 0; if (gy0 < 0) gy0 = 0; if (gz0 < 0) gz0 = 0;
            if (gx1 >= nx) gx1 = nx - 1; if (gy1 >= ny) gy1 = ny - 1; if (gz1 >= nz) gz1 = nz - 1;
            for (let gz = gz0; gz <= gz1; gz++) {
                for (let gy = gy0; gy <= gy1; gy++) {
                    const rowBase = (gz * ny + gy) * nx;
                    for (let gx = gx0; gx <= gx1; gx++) {
                        const cell = rowBase + gx;
                        if (write) {
                            e.buckets[e.offsets[cell] + e.fillCursor[cell]++] = t;
                        } else {
                            e.counts[cell + 1]++;
                        }
                    }
                }
            }
        }
    }

    /**
     * Exact nearest ray-mesh hit via the bucket grid (local space DDA +
     * Moller-Trumbore). Returns the world-space hit point or null.
     */
    raycastTriGrids(originWorld, dirWorld) {
        const THREE = this.THREE;
        const grids = this._triGrids?.grids;
        if (!grids || !THREE) return null;
        if (!this._triScratch) {
            this._triScratch = {
                inv: new THREE.Matrix4(),
                o: new THREE.Vector3(),
                d: new THREE.Vector3(),
                hit: new THREE.Vector3(),
                best: new THREE.Vector3(),
            };
        }
        const s = this._triScratch;
        let bestDistSq = Infinity;
        let found = false;
        for (const g of grids) {
            s.inv.copy(g.mesh.matrixWorld).invert();
            s.o.copy(originWorld).applyMatrix4(s.inv);
            // Direction into local space (normalized; t stays grid-internal,
            // the cross-mesh comparison uses world distances below).
            s.d.copy(dirWorld).transformDirection(s.inv);
            const t = this.raycastTriGridLocal(g, s.o.x, s.o.y, s.o.z, s.d.x, s.d.y, s.d.z);
            if (t >= 0) {
                s.hit.set(s.o.x + s.d.x * t, s.o.y + s.d.y * t, s.o.z + s.d.z * t)
                    .applyMatrix4(g.mesh.matrixWorld);
                const distSq = s.hit.distanceToSquared(originWorld);
                if (distSq < bestDistSq) {
                    bestDistSq = distSq;
                    s.best.copy(s.hit);
                    found = true;
                }
            }
        }
        return found ? { x: s.best.x, y: s.best.y, z: s.best.z } : null;
    }

    /** DDA walk through one grid; returns nearest hit t in local units, or -1. */
    raycastTriGridLocal(g, ox, oy, oz, dx, dy, dz) {
        const maxX = g.minX + g.nx * g.cellX;
        const maxY = g.minY + g.ny * g.cellY;
        const maxZ = g.minZ + g.nz * g.cellZ;
        // Slab-clip the ray to the grid bounds.
        let tMin = 0, tMax = Infinity;
        const axes = [
            [ox, dx, g.minX, maxX], [oy, dy, g.minY, maxY], [oz, dz, g.minZ, maxZ],
        ];
        for (let i = 0; i < 3; i++) {
            const [o, d, lo, hi] = axes[i];
            if (Math.abs(d) < 1e-12) {
                if (o < lo || o > hi) return -1;
                continue;
            }
            const t1 = (lo - o) / d, t2 = (hi - o) / d;
            tMin = Math.max(tMin, Math.min(t1, t2));
            tMax = Math.min(tMax, Math.max(t1, t2));
        }
        if (tMax < tMin) return -1;

        // Enter the grid just inside the boundary.
        const eps = 1e-7;
        const px = ox + dx * (tMin + eps), py = oy + dy * (tMin + eps), pz = oz + dz * (tMin + eps);
        let gx = Math.min(g.nx - 1, Math.max(0, ((px - g.minX) / g.cellX) | 0));
        let gy = Math.min(g.ny - 1, Math.max(0, ((py - g.minY) / g.cellY) | 0));
        let gz = Math.min(g.nz - 1, Math.max(0, ((pz - g.minZ) / g.cellZ) | 0));
        const stepX = dx > 0 ? 1 : -1, stepY = dy > 0 ? 1 : -1, stepZ = dz > 0 ? 1 : -1;
        const tDeltaX = Math.abs(g.cellX / (dx || 1e-30));
        const tDeltaY = Math.abs(g.cellY / (dy || 1e-30));
        const tDeltaZ = Math.abs(g.cellZ / (dz || 1e-30));
        const nextBoundary = (gpos, gmin, cell, gidx, step) =>
            gmin + (gidx + (step > 0 ? 1 : 0)) * cell;
        let tMaxX = dx !== 0 ? tMin + (nextBoundary(px, g.minX, g.cellX, gx, stepX) - px) / dx : Infinity;
        let tMaxY = dy !== 0 ? tMin + (nextBoundary(py, g.minY, g.cellY, gy, stepY) - py) / dy : Infinity;
        let tMaxZ = dz !== 0 ? tMin + (nextBoundary(pz, g.minZ, g.cellZ, gz, stepZ) - pz) / dz : Infinity;

        let bestT = Infinity;
        for (let iter = 0; iter < 1024; iter++) {
            const cell = (gz * g.ny + gy) * g.nx + gx;
            const start = g.offsets[cell], end = g.offsets[cell + 1];
            for (let b = start; b < end; b++) {
                const t = this.rayTriangle(g, g.buckets[b], ox, oy, oz, dx, dy, dz);
                if (t >= tMin - 1e-6 && t < bestT) bestT = t;
            }
            const tExit = Math.min(tMaxX, tMaxY, tMaxZ);
            // Hit inside the cells walked so far: nothing nearer can follow.
            if (bestT <= tExit) return bestT;
            if (tExit > tMax) break;
            if (tMaxX <= tMaxY && tMaxX <= tMaxZ) { gx += stepX; tMaxX += tDeltaX; if (gx < 0 || gx >= g.nx) break; }
            else if (tMaxY <= tMaxZ) { gy += stepY; tMaxY += tDeltaY; if (gy < 0 || gy >= g.ny) break; }
            else { gz += stepZ; tMaxZ += tDeltaZ; if (gz < 0 || gz >= g.nz) break; }
        }
        return bestT < Infinity ? bestT : -1;
    }

    /** Moller-Trumbore ray-triangle intersection; returns t or -1. */
    rayTriangle(g, tri, ox, oy, oz, dx, dy, dz) {
        const { posAttr, index } = g;
        const i0 = index ? index[tri * 3] : tri * 3;
        const i1 = index ? index[tri * 3 + 1] : tri * 3 + 1;
        const i2 = index ? index[tri * 3 + 2] : tri * 3 + 2;
        const ax = posAttr.getX(i0), ay = posAttr.getY(i0), az = posAttr.getZ(i0);
        const bx = posAttr.getX(i1), by = posAttr.getY(i1), bz = posAttr.getZ(i1);
        const cx = posAttr.getX(i2), cy = posAttr.getY(i2), cz = posAttr.getZ(i2);
        const e1x = bx - ax, e1y = by - ay, e1z = bz - az;
        const e2x = cx - ax, e2y = cy - ay, e2z = cz - az;
        const px = dy * e2z - dz * e2y;
        const py = dz * e2x - dx * e2z;
        const pz = dx * e2y - dy * e2x;
        const det = e1x * px + e1y * py + e1z * pz;
        if (det > -1e-12 && det < 1e-12) return -1;
        const invDet = 1 / det;
        const tx = ox - ax, ty = oy - ay, tz = oz - az;
        const u = (tx * px + ty * py + tz * pz) * invDet;
        if (u < -1e-6 || u > 1 + 1e-6) return -1;
        const qx = ty * e1z - tz * e1y;
        const qy = tz * e1x - tx * e1z;
        const qz = tx * e1y - ty * e1x;
        const v = (dx * qx + dy * qy + dz * qz) * invDet;
        if (v < -1e-6 || u + v > 1 + 1e-6) return -1;
        const t = (e2x * qx + e2y * qy + e2z * qz) * invDet;
        return t > 1e-6 ? t : -1;
    }

    runOcclusionTests(camera) {
        const grid = this._grid;
        if (!grid) return; // grid still building: keep current targets
        const origin = this._tmpVecB.setFromMatrixPosition(camera.matrixWorld);
        for (const [id, marker] of this.markers) {
            if (marker._bvVisible === false) continue;
            const display = this.displayPositions.get(id);
            if (!display) continue;
            const occluded = this.gridRayOccluded(grid, display, origin.x, origin.y, origin.z);
            this.occlusionTargets.set(id, occluded ? OCCLUDED_OPACITY : 1);
        }
    }

    runTilesetOcclusionTests(camera, root) {
        const THREE = this.THREE;
        if (!THREE || !root) return;
        if (!this._tilesetOcclusion) {
            this._tilesetOcclusion = {
                raycaster: new THREE.Raycaster(),
                camera: new THREE.Vector3(),
                direction: new THREE.Vector3(),
                offset: new THREE.Vector3(),
                box: new THREE.Box3(),
                size: new THREE.Vector3(),
                cursor: 0,
                tolerance: 0.35,
                rootUuid: null,
                refreshAt: 0,
                nextAt: 0,
            };
        }
        const s = this._tilesetOcclusion;
        const now = performance.now();
        if (now < s.nextAt) return;
        // Dynamic tile hierarchies make recursive raycasts materially more
        // expensive than ordinary GLBs. Four checks per second is responsive
        // enough for LOD swaps without competing with streaming/rendering.
        s.nextAt = now + 250;
        if (s.rootUuid !== root.uuid || now >= s.refreshAt) {
            s.box.setFromObject(root).getSize(s.size);
            const maxDim = Math.max(s.size.x, s.size.y, s.size.z, 1);
            s.tolerance = Math.max(0.15, Math.min(1.5, maxDim * 0.008));
            s.rootUuid = root.uuid;
            s.refreshAt = now + 1200;
        }

        const entries = Array.from(this.markers.entries());
        if (!entries.length) return;
        s.camera.setFromMatrixPosition(camera.matrixWorld);
        const checks = Math.min(1, entries.length);
        for (let checked = 0; checked < checks; checked++) {
            const [id, marker] = entries[s.cursor++ % entries.length];
            if (marker._bvVisible === false) continue;
            const display = this.displayPositions.get(id);
            if (!display) continue;

            s.direction.set(display.x, display.y, display.z).sub(s.camera);
            const markerDistance = s.direction.length();
            if (markerDistance < 0.001) continue;
            s.direction.multiplyScalar(1 / markerDistance);
            s.raycaster.set(s.camera, s.direction);
            s.raycaster.near = 0;
            s.raycaster.far = markerDistance + s.tolerance;
            const hit = s.raycaster.intersectObject(root, true)
                .find((candidate) => candidate.object?.isMesh && candidate.object.visible);
            if (!hit) {
                // The tile supporting this marker is not resident yet. Keep it
                // quiet until the same live surface used by Measure exists.
                this.occlusionTargets.set(id, OCCLUDED_OPACITY);
                continue;
            }

            const surfaceDelta = hit.point.distanceTo(display);
            const blocked = hit.distance < markerDistance - 0.12;
            if (surfaceDelta <= s.tolerance) {
                // An LOD replacement moved the surface slightly. Re-anchor the
                // display point to the current measurement surface and lift it
                // three centimetres toward the camera to avoid self-clipping.
                s.offset.copy(s.camera).sub(hit.point).normalize().multiplyScalar(0.03);
                display.x = hit.point.x + s.offset.x;
                display.y = hit.point.y + s.offset.y;
                display.z = hit.point.z + s.offset.z;
                this.occlusionTargets.set(id, 1);
            } else {
                this.occlusionTargets.set(id, blocked ? OCCLUDED_OPACITY : 1);
            }
        }
    }

    // ------------------------------------------------------------------
    // Dive-mode torch lighting
    // ------------------------------------------------------------------

    getDiveLightState() {
        const viewer = window.BelowJSViewer || this.viewer;
        const diveSystem = viewer?.diveSystem;
        if (!diveSystem?.isDiveModeEnabled) return null;

        const torch = diveSystem.torch;
        const torchOn = !!torch?.isVisible?.();
        if (!torchOn || !torch.controllerSpotlight || !torch.spotlightTarget) {
            return { uniformDim: true };
        }
        const light = torch.controllerSpotlight;
        const target = torch.spotlightTarget;
        const dir = this._tmpVecB.set(
            target.position.x - light.position.x,
            target.position.y - light.position.y,
            target.position.z - light.position.z
        );
        if (dir.lengthSq() < 1e-8) return { uniformDim: true };
        dir.normalize();
        return {
            uniformDim: false,
            position: light.position,
            direction: { x: dir.x, y: dir.y, z: dir.z },
            cosInner: Math.cos((light.angle || 0.5) * 0.75),
            cosOuter: Math.cos((light.angle || 0.5) * 1.35),
            maxDistance: light.distance && light.distance > 0 ? light.distance : 30,
        };
    }

    computeLightFactor(display, lightState) {
        if (lightState.uniformDim) return DIVE_UNLIT_OPACITY;

        const dx = display.x - lightState.position.x;
        const dy = display.y - lightState.position.y;
        const dz = display.z - lightState.position.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (distance < 0.25) return 1;
        if (distance > lightState.maxDistance) return DIVE_UNLIT_OPACITY;

        const cosAngle = (dx * lightState.direction.x + dy * lightState.direction.y + dz * lightState.direction.z) / distance;
        let cone;
        if (cosAngle >= lightState.cosInner) {
            cone = 1;
        } else if (cosAngle <= lightState.cosOuter) {
            cone = 0;
        } else {
            cone = (cosAngle - lightState.cosOuter) / (lightState.cosInner - lightState.cosOuter);
        }
        // Gentle distance falloff inside the beam.
        const falloff = 1 - Math.min(1, distance / lightState.maxDistance) * 0.35;
        return DIVE_UNLIT_OPACITY + (1 - DIVE_UNLIT_OPACITY) * cone * falloff;
    }

    // ------------------------------------------------------------------
    // Right-click: pings + context menus
    // ------------------------------------------------------------------

    onCanvasContextMenu(event) {
        // Suppress the browser menu always. The annotation menu opens from
        // right-button-UP after a clean (non-drag) gesture instead - on macOS
        // contextmenu fires on button-down, before a pan drag even starts, so
        // this event can't be trusted for drag detection on any platform.
        event.preventDefault();
    }

    handleModelRightClick(event) {
        if (this.readOnly) return;
        // Hidden annotations are untouchable - no invisible markers
        // appearing - but never silently: say why nothing happened.
        if (!this.annotationsVisible) {
            this.showToast('Annotations are hidden · use the pin button to show them');
            return;
        }
        if (this.moveTarget !== null) {
            this.finishMoveMode(true);
            return;
        }

        // Right-click on a scale bar line opens the bar's menu.
        for (const [barId, bar] of this.scaleBars) {
            if (bar.lineHovered) {
                this.openBarMenu(barId, event.clientX, event.clientY);
                return;
            }
        }

        // Mesh-exact and instant via the triangle buckets (voxel-approx for
        // the first moments after a model loads, while they build).
        const point = this.raycastModelFromClient(event.clientX, event.clientY);
        if (!point) return;

        const position = this.worldPositionToModel(point);
        const clickX = event.clientX;
        const clickY = event.clientY;

        // Ghost indicator where they clicked - locally and for everyone else.
        if (this.options.rightClickPing) {
            this.removeLocalPing();
            this.localPingKey = this.showPing(position, { ttlMs: null });
            this.sendMessage({ type: 'annotation_update', action: 'ping', position }, { quiet: true });
        }

        this.openMenu([
            {
                label: 'Add annotation here',
                onSelect: () => this.openCreatePanel(position, clickX, clickY),
            },
        ], clickX, clickY, () => {
            // Menu dismissed without choosing: let the ghost fade shortly after.
            this.expireLocalPing(900);
        });
    }

    openMarkerMenu(annotationId, clientX, clientY, { touchPairing = false } = {}) {
        if (this.moveTarget !== null) {
            this.finishMoveMode(true);
            return;
        }
        const annotation = this.annotations.get(annotationId);
        if (!annotation) return;
        this.focusAnnotationForPairing(annotationId, { touchPairing });

        const items = [
            { label: 'View', onSelect: () => this.openViewPanel(annotationId) },
        ];
        if (!this.readOnly) {
            const editor = this.remoteEditorOf(annotationId);
            items.push(
                {
                    label: 'Edit',
                    disabled: !!editor,
                    hint: editor ? `${editor} is editing` : null,
                    onSelect: () => this.openEditPanel(annotationId),
                },
                { label: 'Move', onSelect: () => this.enterMoveMode(annotationId) },
                {
                    label: annotation.collapsed ? 'Expand' : 'Collapse',
                    onSelect: () => this.sendMessage({
                        type: 'annotation_update',
                        action: 'collapse',
                        id: annotationId,
                        collapsed: !annotation.collapsed,
                    }),
                },
            );
            // A stored endpoint pair can create a scale bar even while extra
            // selected markers stay lit for screenshots.
            const pair = this.currentScalePair();
            if (pair && pair.includes(annotationId) && !this.scaleBarForPair(pair[0], pair[1])) {
                items.push({ label: 'Create scale bar', onSelect: () => this.createScaleBarFromSelection() });
            } else if (this.selection.length > 2 && this.selection.includes(annotationId)) {
                const n = this.selection.length;
                const ids = this.selection.slice();
                const allCollapsed = ids.every((id) => this.annotations.get(id)?.collapsed);
                items.push(
                    {
                        label: allCollapsed ? `Expand ${n} markers` : `Collapse ${n} markers`,
                        onSelect: () => {
                            for (const id of ids) {
                                this.sendMessage({
                                    type: 'annotation_update', action: 'collapse', id, collapsed: !allCollapsed,
                                });
                            }
                        },
                    },
                    {
                        label: `Delete ${n} markers`,
                        danger: true,
                        onSelect: () => {
                            for (const id of ids) {
                                this.remove(id);
                            }
                            this.clearSelection();
                        },
                    },
                );
            }
            items.push({
                label: 'Delete',
                danger: true,
                onSelect: () => this.remove(annotationId),
            });
        }
        this.openMenu(items, clientX, clientY);
    }

    openMenu(items, clientX, clientY, onDismiss = null) {
        this.closeMenu();
        const menu = document.createElement('div');
        menu.className = 'bv-annotation-menu';
        for (const item of items) {
            const button = document.createElement('button');
            button.className = 'bv-annotation-menu__item' + (item.danger ? ' bv-annotation-menu__item--danger' : '');
            button.textContent = item.label;
            if (item.disabled) {
                button.disabled = true;
                if (item.hint) {
                    const hint = document.createElement('span');
                    hint.className = 'bv-annotation-menu__hint';
                    hint.textContent = item.hint;
                    button.appendChild(hint);
                }
            } else {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this._menuChosen = true;
                    this.closeMenu();
                    item.onSelect();
                });
            }
            menu.appendChild(button);
        }
        this.container.appendChild(menu);
        this.menuEl = menu;
        this._menuChosen = false;
        this._menuOnDismiss = onDismiss;
        this.positionFloating(menu, clientX, clientY);
    }

    closeMenu() {
        if (!this.menuEl) return;
        const dismissed = !this._menuChosen;
        this.menuEl.remove();
        this.menuEl = null;
        if (dismissed && this._menuOnDismiss) {
            const cb = this._menuOnDismiss;
            this._menuOnDismiss = null;
            cb();
        } else {
            this._menuOnDismiss = null;
        }
    }

    showPing(position, { color = null, ttlMs = REMOTE_PING_TTL_MS, remote = false } = {}) {
        const key = `ping_${++this.pingCounter}`;
        const el = document.createElement('div');
        el.className = 'bv-annotation-ping' + (remote ? ' bv-annotation-ping--remote' : '');
        const core = document.createElement('div');
        core.className = 'bv-annotation-ping__core';
        if (color) core.style.background = color;
        const titleEl = document.createElement('div');
        titleEl.className = 'bv-annotation-ping__title';
        el.appendChild(core);
        el.appendChild(titleEl);
        el.style.display = 'none';
        this.overlayEl.appendChild(el);
        this.pings.set(key, {
            el,
            titleEl,
            position: { ...position },
            expiresAt: ttlMs === null ? null : performance.now() + ttlMs,
            leaving: false,
            removeAt: 0,
        });
        return key;
    }

    /** One live ping per remote user: update it in place, refresh its TTL. */
    upsertUserPing(userId, position, title, color) {
        const participantId = this.focusUserKey(userId);
        if (participantId === null) return;
        const existingKey = this.userPings.get(participantId);
        let ping = existingKey ? this.pings.get(existingKey) : null;
        if (!ping || ping.leaving) {
            const key = this.showPing(position, { color, remote: true });
            this.userPings.set(participantId, key);
            ping = this.pings.get(key);
        } else {
            ping.position = { ...position };
            ping.expiresAt = performance.now() + REMOTE_PING_TTL_MS;
        }
        if (title) {
            ping.titleEl.textContent = title;
            ping.titleEl.style.display = 'block';
        } else {
            ping.titleEl.style.display = 'none';
        }
    }

    /** Begin a ping's graceful fade-and-shrink exit. */
    dismissPing(key) {
        const ping = this.pings.get(key);
        if (!ping || ping.leaving) return;
        ping.leaving = true;
        ping.el.classList.add('bv-annotation-ping--leaving');
        ping.removeAt = performance.now() + 380;
    }

    removeLocalPing() {
        if (!this.localPingKey) return;
        this.dismissPing(this.localPingKey);
        this.localPingKey = null;
    }

    expireLocalPing(delayMs) {
        if (!this.localPingKey) return;
        const ping = this.pings.get(this.localPingKey);
        if (ping && !ping.leaving) ping.expiresAt = performance.now() + delayMs;
        this.localPingKey = null;
    }

    // ------------------------------------------------------------------
    // Focus presence: selections and live edits from other users
    // ------------------------------------------------------------------

    markerShouldStayOpaque(annotationId) {
        if (this.selection.includes(annotationId) ||
            this.openPanelFor === annotationId ||
            this.moveTarget === annotationId ||
            this.dragState?.id === annotationId ||
            this._editingId === annotationId) {
            return true;
        }
        for (const focus of this.remoteFocus.values()) {
            if (focus.editing === annotationId || focus.selected?.includes(annotationId)) {
                return true;
            }
        }
        return false;
    }

    /** Broadcast what we have selected / open / are editing (broadcast-only, like pings). */
    sendFocus() {
        if (this.readOnly) return;
        if (this._mirroredFocusUserId !== null) return;
        // The annotation whose card we have open counts as selected too -
        // others see the same ring whether it's shift-selected or viewed.
        const selected = this.selection.slice(0, 31);
        if (this.openPanelFor !== null && !selected.includes(this.openPanelFor)) {
            selected.push(this.openPanelFor);
        }
        const selectedBars = this.stickyBarIds().slice(0, 31);
        const selectedPair = this.currentScalePair();
        const panelMode = (this.openPanelFor !== null && this.panelEl?.dataset.mode)
            ? (this.panelEl.dataset.mode === 'edit' ? 'edit' : 'view')
            : null;
        this.sendMessage({
            type: 'annotation_update',
            action: 'focus',
            annotations_visible: this.annotationsVisible,
            editing: this._editingId,
            open_panel: this.openPanelFor,
            panel_mode: panelMode,
            selected,
            selected_pair: selectedPair,
            selected_bars: selectedBars,
            title: this._editDraftTitle,
            notes: this._editDraftNotes,
        }, { quiet: true });
        // Keepalive runs while there's anything to keep alive.
        const active = this._editingId !== null || this.selection.length > 0 ||
            this.hasLocalFollowAudience() ||
            selectedBars.length > 0 || this.openPanelFor !== null;
        if (active && !this._focusInterval) {
            this._focusInterval = setInterval(() => this.sendFocus(), 2500);
        } else if (!active && this._focusInterval) {
            clearInterval(this._focusInterval);
            this._focusInterval = null;
        }
    }

    upsertRemoteFocus(data) {
        const userId = this.getMessageParticipantId(data);
        if (userId === null) return;
        const hasVisibilityState = typeof data.annotations_visible === 'boolean';
        const annotationsVisible = hasVisibilityState ? !!data.annotations_visible : true;
        const editing = typeof data.editing === 'number' ? data.editing : null;
        const openPanel = typeof data.open_panel === 'number' ? data.open_panel : null;
        const panelMode = data.panel_mode === 'edit' ? 'edit' : (data.panel_mode === 'view' ? 'view' : null);
        const selected = Array.isArray(data.selected) ? data.selected.filter((i) => typeof i === 'number') : [];
        const selectedPair = Array.isArray(data.selected_pair) ?
            data.selected_pair.filter((i) => typeof i === 'number').slice(0, 2) : null;
        const selectedBars = Array.isArray(data.selected_bars) ?
            data.selected_bars.filter((i) => typeof i === 'number') : [];
        if (!hasVisibilityState && editing === null && openPanel === null && selected.length === 0 && !selectedPair?.length && selectedBars.length === 0) {
            this.remoteFocus.delete(userId);
        } else {
            this.remoteFocus.set(userId, {
                annotationsVisible,
                editing,
                openPanel,
                panelMode: openPanel !== null ? (panelMode || (editing === openPanel ? 'edit' : 'view')) : null,
                selected,
                selectedPair: selectedPair?.length === 2 ? selectedPair : null,
                selectedBars,
                title: String(data.title || ''),
                notes: String(data.notes || ''),
                username: data.username || '',
                color: data.avatar_color || null,
                expiresAt: performance.now() + REMOTE_FOCUS_TTL_MS,
            });
        }
        this.applyRemoteFocusVisuals();
        this.syncFollowedAnnotationPanel();
    }

    /** Who (if anyone) is editing this annotation right now. */
    remoteEditorOf(annotationId) {
        for (const focus of this.remoteFocus.values()) {
            if (focus.editing === annotationId) return focus.username || 'Someone';
        }
        return null;
    }

    applyRemoteFocusVisuals() {
        // Build the current picture, then reconcile every marker against it.
        const selectedBy = new Map();   // annotation id -> color
        const selectedBarsBy = new Map(); // scale bar id -> color
        const editingBy = new Map();    // annotation id -> focus entry
        for (const focus of this.remoteFocus.values()) {
            for (const id of focus.selected) {
                if (!selectedBy.has(id)) selectedBy.set(id, focus.color);
            }
            for (const id of focus.selectedBars || []) {
                if (!selectedBarsBy.has(id)) selectedBarsBy.set(id, focus.color);
            }
            if (focus.editing !== null) editingBy.set(focus.editing, focus);
        }
        for (const [id, marker] of this.markers) {
            const selColor = selectedBy.get(id);
            marker.classList.toggle('bv-annotation-marker--remote-selected', selectedBy.has(id));
            if (selColor) marker.style.setProperty('--bv-remote-ring', this.colorWithAlpha(selColor, 0.4));
            else marker.style.removeProperty('--bv-remote-ring');

            const focus = editingBy.get(id);
            marker.classList.toggle('bv-annotation-marker--remote-editing', !!focus);
            const titleEl = marker.querySelector('.bv-annotation-marker__title');
            if (titleEl) {
                if (focus) {
                    // Their draft streams into the same chip the hover shows.
                    titleEl.textContent = focus.title || this.annotations.get(id)?.title || '';
                    const caret = document.createElement('span');
                    caret.className = 'bv-annotation-caret';
                    titleEl.appendChild(caret);
                    if (focus.color) marker.style.setProperty('--bv-remote-color', focus.color);
                } else {
                    titleEl.textContent = this.annotations.get(id)?.title || '';
                    marker.style.removeProperty('--bv-remote-color');
                }
            }
        }
        for (const [id, bar] of this.scaleBars) {
            const color = selectedBarsBy.get(id) || null;
            bar.remoteSelected = selectedBarsBy.has(id);
            bar.remoteColor = color;
            if (bar.labelEl) {
                bar.labelEl.classList.toggle('bv-annotation-scale-label--remote-selected', bar.remoteSelected);
                if (color) {
                    bar.labelEl.style.setProperty('--bv-remote-scale-color', color);
                    bar.labelEl.style.setProperty('--bv-remote-scale-ring', this.colorWithAlpha(color, 0.35));
                } else {
                    bar.labelEl.style.removeProperty('--bv-remote-scale-color');
                    bar.labelEl.style.removeProperty('--bv-remote-scale-ring');
                }
            }
            this.setBarHoverState(bar);
        }
        this.reconcileRemotePreviewBars();
        // Soft edit lock: grey the Edit button on an open view panel live.
        if (this.panelEl?.dataset.mode === 'view' && this.openPanelFor !== null) {
            const editBtn = this.panelEl.querySelector('.bv-annotation-edit');
            if (editBtn) {
                const editor = this.remoteEditorOf(this.openPanelFor);
                editBtn.disabled = !!editor;
                editBtn.title = editor ? `${editor} is editing` : '';
            }
        }
    }

    /** Drop remote focus entries whose keepalive stopped (left, disconnected). */
    sweepRemoteFocus(now) {
        let changed = false;
        for (const [userId, focus] of this.remoteFocus) {
            if (now > focus.expiresAt) {
                this.remoteFocus.delete(userId);
                changed = true;
            }
        }
        if (changed) {
            this.applyRemoteFocusVisuals();
            this.syncFollowedAnnotationPanel();
        }
    }

    followedUserId() {
        if (this._followedParticipantId !== undefined) return this._followedParticipantId;
        const collaboration = typeof window !== 'undefined' ? window.collaboration : null;
        if (!collaboration?.isFollowing || collaboration.followingUser === null || collaboration.followingUser === undefined) {
            return null;
        }
        return String(collaboration.followingUser);
    }

    hasLocalFollowAudience() {
        if (typeof this.adapter?.hasLocalFollowAudience === 'function') {
            return !!this.adapter.hasLocalFollowAudience();
        }
        const collaboration = typeof window !== 'undefined' ? window.collaboration : null;
        const currentUserId = collaboration?.getCurrentParticipantId?.() ?? this.getLocalParticipantId();
        if (currentUserId === null || currentUserId === undefined || !collaboration?.followingRelationships) return false;
        const localId = String(currentUserId);
        for (const rel of collaboration.followingRelationships.values()) {
            if (String(rel?.following) === localId) return true;
        }
        return false;
    }

    syncFollowedAnnotationPanel() {
        const followedId = this.followedUserId();
        const focus = followedId ? this.remoteFocus.get(followedId) : null;
        if (focus && typeof focus.annotationsVisible === 'boolean' && this.annotationsVisible !== focus.annotationsVisible) {
            this.setAnnotationsVisible(focus.annotationsVisible);
        }
        const annotationId = focus?.openPanel ?? null;
        if (!this.annotationsVisible || annotationId === null || !this.annotations.has(annotationId)) {
            if (this._mirroredFocusUserId !== null) this.closePanel({ broadcast: false });
            return;
        }

        const panelMode = focus.panelMode === 'edit' ? 'edit' : 'view';
        if (this._mirroredFocusUserId === followedId &&
            this.openPanelFor === annotationId &&
            this.panelEl?.dataset.mode === `follow-${panelMode}`) {
            this.refreshMirroredPanelContent(annotationId, panelMode, focus);
            return;
        }

        this.openMirroredFocusPanel(followedId, annotationId, panelMode, focus);
    }

    openMirroredFocusPanel(userId, annotationId, panelMode, focus) {
        const annotation = this.annotations.get(annotationId);
        const marker = this.markers.get(annotationId);
        if (!annotation || !marker) return;

        const panel = this.buildPanel(`follow-${panelMode}`, { broadcastClose: false });
        this._mirroredFocusUserId = String(userId);
        this.openPanelFor = annotationId;
        marker.classList.add('bv-annotation-marker--active');
        this.refreshMirroredPanelContent(annotationId, panelMode, focus);

        const markerRect = marker.getBoundingClientRect();
        this.positionFloating(panel, markerRect.right, markerRect.top);
    }

    refreshMirroredPanelContent(annotationId, panelMode, focus) {
        const annotation = this.annotations.get(annotationId);
        if (!annotation || !this.panelEl) return;

        const title = panelMode === 'edit' && focus?.title ? focus.title : annotation.title;
        const notes = panelMode === 'edit' && focus?.notes ? focus.notes : (annotation.notes || '');
        const meta = [];
        if (annotation.created_by) meta.push(annotation.created_by);
        if (annotation.created_at) {
            const date = new Date(annotation.created_at);
            if (!isNaN(date)) meta.push(date.toLocaleDateString());
        }

        if (panelMode === 'edit') {
            this.panelEl.innerHTML = `
                <input type="text" class="bv-annotation-input-title" maxlength="${TITLE_MAX_LENGTH}" readonly>
                <textarea class="bv-annotation-input-notes" maxlength="${NOTES_MAX_LENGTH}" readonly></textarea>
                <div class="bv-annotation-panel__meta"></div>
            `;
            this.panelEl.querySelector('.bv-annotation-input-title').value = title;
            this.panelEl.querySelector('.bv-annotation-input-notes').value = notes;
            this.panelEl.querySelector('.bv-annotation-panel__meta').textContent =
                focus?.username ? `${focus.username} is editing` : 'Editing';
            return;
        }

        this.panelEl.innerHTML = `
            <div class="bv-annotation-panel__title"></div>
            ${notes ? '<div class="bv-annotation-panel__notes"></div>' : ''}
            ${meta.length ? `<div class="bv-annotation-panel__meta">${meta.map(m => this.escapeHtml(m)).join(' · ')}</div>` : ''}
        `;
        this.panelEl.querySelector('.bv-annotation-panel__title').textContent = title;
        if (notes) {
            this.panelEl.querySelector('.bv-annotation-panel__notes').textContent = notes;
        }
    }

    colorWithAlpha(color, alpha) {
        const hex = /^#([0-9a-f]{6})$/i.exec(String(color || ''));
        if (!hex) return `rgba(255, 255, 255, ${alpha})`;
        const n = parseInt(hex[1], 16);
        return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
    }

    // ------------------------------------------------------------------
    // Pointer handling: drag detection + selection cleanup
    // ------------------------------------------------------------------

    onCanvasPointerDown(event) {
        if (event.pointerType === 'touch') {
            this.clearScaleBarLineHover();
        }
        if (this.isContextClick(event)) {
            event.preventDefault();
            this._rightDrag = { x: event.clientX, y: event.clientY, moved: false };
        } else if (event.button === 0) {
            this._leftDown = { x: event.clientX, y: event.clientY };
        }
    }

    onCanvasPointerMove(event) {
        // Right-drag pan tracking: any real movement cancels the menu-on-up.
        if (this._rightDrag && !this._rightDrag.moved) {
            const dx = event.clientX - this._rightDrag.x;
            const dy = event.clientY - this._rightDrag.y;
            if ((dx * dx + dy * dy) > RIGHT_CLICK_DRAG_TOLERANCE_PX * RIGHT_CLICK_DRAG_TOLERANCE_PX) {
                this._rightDrag.moved = true;
            }
        }
        if (this.shouldSuppressBarHover(event)) {
            this.clearScaleBarLineHover();
            return;
        }
        this.updateBarHover(event.clientX, event.clientY);
    }

    onCanvasPointerUp(event) {
        if (this.isContextClick(event)) {
            event.preventDefault();
            const gesture = this._rightDrag;
            this._rightDrag = null;
            // Menu only on a clean right-click; right-drag pans the camera.
            if (gesture && !gesture.moved) {
                this.handleModelRightClick(event);
            }
            return;
        }
        if (event.button !== 0) return;
        const leftDown = this._leftDown;
        this._leftDown = null;
        // The lift-off after a touch long-press is not a click.
        if (this._longPressFired && performance.now() - this._longPressFired < 700) {
            return;
        }

        if (this.moveTarget !== null && leftDown) {
            const dx = event.clientX - leftDown.x;
            const dy = event.clientY - leftDown.y;
            const cleanClick = (dx * dx + dy * dy) <= CLICK_PLACE_TOLERANCE_PX * CLICK_PLACE_TOLERANCE_PX;
            const onMarker = !!event.target.closest?.('.bv-annotation-marker');
            if (cleanClick && !onMarker) this.finishMoveMode(true);
            return;
        }

        // Clean click on a scale bar line selects it; shift-click builds a
        // set. A clean click on empty space clears bar and marker selections.
        if (leftDown) {
            const dx = event.clientX - leftDown.x;
            const dy = event.clientY - leftDown.y;
            if ((dx * dx + dy * dy) <= CLICK_PLACE_TOLERANCE_PX * CLICK_PLACE_TOLERANCE_PX) {
                let hoveredBar = null;
                for (const [id, bar] of this.scaleBars) {
                    if (bar.lineHovered) { hoveredBar = id; break; }
                }
                if (event.shiftKey) {
                    if (hoveredBar !== null) this.toggleStickyBar(hoveredBar);
                    // shift-click on empty space leaves selections alone
                } else if (hoveredBar !== null) {
                    this.setStickyBar(hoveredBar);
                } else {
                    this.setStickyBar(null);
                    this.clearSelection();
                }
            }
        }
    }

    isContextClick(event) {
        return event.button === 2 || (event.button === 0 && event.ctrlKey && event.pointerType !== 'touch');
    }

    onDocumentPointerDown(event) {
        if (this.menuEl && !this.menuEl.contains(event.target)) {
            this.closeMenu();
        }
        if (this.panelEl && !this.panelEl.contains(event.target) &&
            !event.target.closest?.('.bv-annotation-marker') &&
            this.panelEl.dataset.mode === 'view') {
            this.closePanel();
        }
    }

    onKeyDown(event) {
        if (event.key !== 'Escape' && event.key !== 'Enter') return;
        if (this.dragState) {
            this.finishMoveMode(true);
            event.stopPropagation();
        } else if (this.moveTarget !== null) {
            this.finishMoveMode(true);
            event.stopPropagation();
        } else if (event.key === 'Enter') {
            return;
        } else if (this.menuEl) {
            this.closeMenu();
            event.stopPropagation();
        } else if (this.panelEl) {
            this.closePanel();
            event.stopPropagation();
        }
    }

    // ------------------------------------------------------------------
    // Move mode: a moveable state, not mouse tracking
    // ------------------------------------------------------------------

    enterMoveMode(annotationId) {
        if (this.readOnly || !this.annotations.has(annotationId)) return;
        this.exitMoveMode(false);
        this.closePanel();
        this.moveTarget = annotationId;
        this.markers.get(annotationId)?.classList.add('bv-annotation-marker--moving');
        this.showToast('Drag the marker · click away, Enter, or Esc to finish', 6000);
    }

    exitMoveMode(announce) {
        if (this.dragState) this.cancelMarkerDrag();
        if (this.moveTarget !== null) {
            this.markers.get(this.moveTarget)?.classList.remove('bv-annotation-marker--moving');
            this.moveTarget = null;
            if (announce) this.showToast('Move finished', 1200);
        }
    }

    finishMoveMode(announce) {
        const id = this.moveTarget;
        if (id === null) return;
        if (this.dragState) {
            const { id: dragId, cleanup, lastValidPoint } = this.dragState;
            cleanup?.();
            this.dragState = null;
            if (dragId === id && lastValidPoint) {
                this.applyMoveDraftPosition(id, lastValidPoint);
            }
        }
        const annotation = this.annotations.get(id);
        if (annotation) this.commitMoveTo(annotation.position);
        this.exitMoveMode(announce);
    }

    applyMoveDraftPosition(annotationId, position) {
        const annotation = this.annotations.get(annotationId);
        if (!annotation || !position) return;
        annotation.position = this.worldPositionToModel(position);
        const display = this.displayPositions.get(annotationId);
        if (display) {
            display.x = position.x; display.y = position.y; display.z = position.z;
        }
        this.lerping.delete(annotationId);
        this.refreshBarsForAnnotation(annotationId);
    }

    commitMoveTo(position) {
        const id = this.moveTarget;
        const annotation = this.annotations.get(id);
        if (!annotation) return;
        annotation.position = { ...position };
        // Ease any residual fraction in (the drag already rode the exact
        // surface, so this is normally a no-op).
        this.lerping.add(id);
        this.refreshBarsForAnnotation(id);
        this.sendMessage({
            type: 'annotation_update',
            action: 'move',
            commit: true,
            id,
            position: annotation.position,
        });
    }

    startMarkerDrag(annotationId, event) {
        const markerRoot = this.markers.get(annotationId);
        const annotation = this.annotations.get(annotationId);
        if (!markerRoot || !annotation) return;
        // Capture on the dot - the root anchor is pointer-events: none.
        const marker = markerRoot.querySelector('.bv-annotation-marker__dot') || markerRoot;

        this.dragState = {
            id: annotationId,
            pointerId: event.pointerId,
            moved: false,
            startX: event.clientX,
            startY: event.clientY,
            originalPosition: { ...annotation.position },
            lastSentAt: 0,
        };
        try {
            marker.setPointerCapture(event.pointerId);
        } catch {
            // Pointer may already be released; drag still works via marker listeners.
        }

        const onMove = (e) => {
            if (!this.dragState || e.pointerId !== this.dragState.pointerId) return;
            e.preventDefault();
            e.stopPropagation();
            const dx = e.clientX - this.dragState.startX;
            const dy = e.clientY - this.dragState.startY;
            if (!this.dragState.moved && (dx * dx + dy * dy) < 9) return;
            this.dragState.moved = true;
            this.dragState.screenDrag = true;

            // The dot rides exactly under the cursor in screen space - no
            // raycasts on the move path, so the drag is perfectly smooth.
            const rects = this.getRects();
            if (rects) {
                const x = Math.round((e.clientX - rects.hostRect.left) * 10) / 10;
                const y = Math.round((e.clientY - rects.hostRect.top) * 10) / 10;
                markerRoot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                markerRoot._bvX = x;
                markerRoot._bvY = y;
            }

            // Mesh-exact surface point on every move (triangle buckets make
            // this microseconds): the marker, its depth and any attached
            // scale bars all ride the true surface, so the drop commits to
            // exactly what was on screen - nothing jumps on release. Only
            // the network preview is throttled.
            const approx = this.raycastModelFromClient(e.clientX, e.clientY);
            if (approx) {
                this.dragState.lastValidPoint = approx;
                this.applyMoveDraftPosition(annotationId, approx);

                const now = performance.now();
                if (now - this.dragState.lastSentAt >= MOVE_PREVIEW_INTERVAL_MS) {
                    this.dragState.lastSentAt = now;
                    this.sendMessage({
                        type: 'annotation_update',
                        action: 'move',
                        commit: false,
                        id: annotationId,
                        position: annotation.position,
                    }, { quiet: true });
                }
            }
        };
        const onUp = (e) => {
            if (!this.dragState || e.pointerId !== this.dragState.pointerId) return;
            e.preventDefault();
            e.stopPropagation();
            document.removeEventListener('pointermove', onMove, true);
            document.removeEventListener('pointerup', onUp, true);
            document.removeEventListener('pointercancel', onCancel, true);
            const { moved, originalPosition, lastValidPoint } = this.dragState;
            this.dragState = null;
            if (!moved) {
                // A plain click on the moving marker keeps move mode armed;
                // click away, Enter or Esc finishes it.
                return;
            }
            // Drop updates the draft position only. A click away, Enter, or
            // Esc commits it and dismisses move mode.
            const point = this.raycastModelFromClient(e.clientX, e.clientY);
            if (point) {
                const position = { x: point.x, y: point.y, z: point.z };
                this.applyMoveDraftPosition(annotationId, position);
                this.sendMessage({
                    type: 'annotation_update',
                    action: 'move',
                    commit: false,
                    id: annotationId,
                    position: annotation.position,
                }, { quiet: true });
            } else if (lastValidPoint) {
                // Dropped off-model: settle the draft on the last on-model point.
                this.applyMoveDraftPosition(annotationId, lastValidPoint);
                this.sendMessage({
                    type: 'annotation_update',
                    action: 'move',
                    commit: false,
                    id: annotationId,
                    position: annotation.position,
                }, { quiet: true });
            } else {
                annotation.position = { ...originalPosition };
                const display = this.displayPositions.get(annotationId);
                if (display) {
                    const world = this.modelPositionToWorld(originalPosition);
                    display.x = world.x; display.y = world.y; display.z = world.z;
                }
                this.refreshBarsForAnnotation(annotationId);
            }
        };
        const onCancel = () => this.cancelMarkerDrag();

        document.addEventListener('pointermove', onMove, true);
        document.addEventListener('pointerup', onUp, true);
        document.addEventListener('pointercancel', onCancel, true);
        this.dragState.cleanup = () => {
            document.removeEventListener('pointermove', onMove, true);
            document.removeEventListener('pointerup', onUp, true);
            document.removeEventListener('pointercancel', onCancel, true);
        };
    }

    cancelMarkerDrag() {
        if (!this.dragState) return;
        const { id, originalPosition, cleanup } = this.dragState;
        cleanup?.();
        this.dragState = null;
        const annotation = this.annotations.get(id);
        if (annotation && originalPosition) {
            annotation.position = { ...originalPosition };
            const display = this.displayPositions.get(id);
            if (display) {
                display.x = originalPosition.x; display.y = originalPosition.y; display.z = originalPosition.z;
            }
            this.refreshBarsForAnnotation(id);
            // Snap watchers back to the real position after an aborted drag.
            this.sendMessage({
                type: 'annotation_update',
                action: 'move',
                commit: false,
                id,
                position: originalPosition,
            }, { quiet: true });
        }
    }

    // ------------------------------------------------------------------
    // Selection + scale bars
    // ------------------------------------------------------------------

    toggleSelection(annotationId) {
        this._touchPairingAnchor = null;
        this._touchMultiSelectActive = false;
        const index = this.selection.indexOf(annotationId);
        if (index !== -1) {
            this.selection.splice(index, 1);
        } else {
            this.selection.push(annotationId);
        }
        this.scalePair = this.selection.length === 2 ? this.selection.slice(0, 2) : null;
        this.updateSelectionVisuals();
        if (this.selection.length === 1) {
            this.showToast('Shift-click another marker to measure between them', 3200);
        } else if (this.selection.length === 3) {
            this.showToast('Multi-select: right-click a selected marker for bulk actions', 3200);
        }
        this.sendFocus();
    }

    focusAnnotationForPairing(annotationId, { touchPairing = false } = {}) {
        if (this.readOnly || !this.annotations.has(annotationId)) return;
        if (this.selection.length !== 1 || this.selection[0] !== annotationId) {
            this.selection = [annotationId];
            this.scalePair = null;
            this.updateSelectionVisuals();
        }
        this._touchPairingAnchor = touchPairing ? annotationId : null;
        this._touchMultiSelectActive = !!touchPairing;
        this.sendFocus();
    }

    extendSelectionFromCurrentFocus(annotationId) {
        if (this.readOnly || !this.annotations.has(annotationId)) return false;
        if (this.moveTarget !== null) return false;

        if (this._touchMultiSelectActive && this.selection.length >= 2) {
            this.closeMenu();
            this.closePanel();
            if (!this.selection.includes(annotationId)) {
                this.selection.push(annotationId);
                this.updateSelectionVisuals();
                this.sendFocus();
            }
            return true;
        }

        let anchorId = null;
        if (this._touchPairingAnchor !== null && this._touchPairingAnchor !== annotationId &&
            this.annotations.has(this._touchPairingAnchor)) {
            anchorId = this._touchPairingAnchor;
        }
        if (anchorId === null) return false;

        this.closeMenu();
        this.closePanel();
        this.selection = [anchorId, annotationId];
        this.scalePair = [anchorId, annotationId];
        this._touchPairingAnchor = anchorId;
        this._touchMultiSelectActive = true;
        this.updateSelectionVisuals();
        if (!this.scaleBarForPair(anchorId, annotationId)) {
            this.syncLocalPreviewBar();
            this.showToast('Tap the distance label to create a scale bar', 3200);
        }
        this.sendFocus();
        return true;
    }

    clearSelection() {
        const hadSelection = this.selection.length > 0;
        this.selection = [];
        this.scalePair = null;
        this._touchPairingAnchor = null;
        this._touchMultiSelectActive = false;
        this.updateSelectionVisuals();
        if (hadSelection) this.sendFocus();
    }

    updateSelectionVisuals() {
        for (const [id, marker] of this.markers) {
            marker.classList.toggle('bv-annotation-marker--selected', this.selection.includes(id));
        }
        this.syncLocalPreviewBar();
        // Bars touching selected markers brighten with them.
        for (const bar of this.scaleBars.values()) this.setBarHoverState(bar);
        if (this.remoteFocus.size > 0) this.reconcileRemotePreviewBars();
    }

    /** A bar is at full strength when hovered, click-selected, or touched by
     *  a hovered/selected endpoint marker. */
    barLit(bar) {
        if (bar.preview || !bar.data) return false;
        return !!(bar.hovered || bar.sticky || bar.endpointLit ||
            bar.remoteSelected ||
            this.selection.includes(bar.data.a) || this.selection.includes(bar.data.b));
    }

    /** Hovering a marker lights every bar it anchors. */
    setBarsEndpointLit(annotationId, lit) {
        for (const bar of this.scaleBars.values()) {
            if (bar.data.a === annotationId || bar.data.b === annotationId) {
                if (bar.endpointLit !== lit) {
                    bar.endpointLit = lit;
                    this.setBarHoverState(bar);
                }
            }
        }
    }

    makeBarLine(preview) {
        // Same family as the measurement tool's line (Line2, white, on top of
        // everything) but half the width and quiet until hovered, so it reads
        // as a permanent annotation rather than an active measurement.
        const geometry = new LineGeometry();
        geometry.setPositions([0, 0, 0, 0, 0, 0]);
        const material = new LineMaterial({
            color: 0xffffff,
            linewidth: 1.5,
            transparent: true,
            opacity: preview ? 0.35 : 0.4,
            depthTest: false,
            depthWrite: false,
            vertexColors: false,
            dashed: preview,
            dashSize: 0.08,
            gapSize: 0.04,
        });
        const line = new Line2(geometry, material);
        line.frustumCulled = false;
        line.renderOrder = 999;
        line.material.depthTest = false;
        line.material.depthWrite = false;
        line.material.needsUpdate = true;
        return line;
    }

    makeBarLabel(preview) {
        const label = document.createElement('div');
        label.className = 'bv-annotation-scale-label' + (preview ? ' bv-annotation-scale-label--preview' : '');
        label.style.display = 'none';
        label.addEventListener('wheel', (e) => this.forwardWheelToCanvas(e), { passive: false });
        this.overlayEl.appendChild(label);
        return label;
    }

    forwardWheelToCanvas(e) {
        const canvas = this.getCanvas();
        if (!canvas) return;
        e.preventDefault();
        e.stopPropagation();
        canvas.dispatchEvent(new window.WheelEvent('wheel', {
            bubbles: true,
            cancelable: true,
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
            metaKey: e.metaKey,
        }));
    }

    currentScalePair() {
        const pair = this.scalePair;
        if (!Array.isArray(pair) || pair.length !== 2) return null;
        const [a, b] = pair;
        if (a === b || !this.annotations.has(a) || !this.annotations.has(b)) return null;
        return [a, b];
    }

    createScaleBarFromSelection() {
        const pair = this.currentScalePair();
        if (this.readOnly || !pair) return;
        const [a, b] = pair;
        const existing = this.scaleBarForPair(a, b);
        if (existing) {
            this.setStickyBar(existing.id);
            this.clearPreviewBar();
            return;
        }
        this.sendMessage({ type: 'annotation_update', action: 'scalebar_create', a, b });
    }

    ensurePreviewBar() {
        const pair = this.currentScalePair();
        if (this.previewBar || !pair) return;
        if (this.scaleBarForPair(pair[0], pair[1])) return;
        const scene = this.getScene();
        if (!scene) return;
        const line = this.makeBarLine(true);
        scene.add(line);
        const labelEl = this.makeBarLabel(true);
        // One plain click on the label keeps it - the least fiddly path.
        labelEl.addEventListener('click', (e) => {
            e.stopPropagation();
            this.createScaleBarFromSelection();
        });
        labelEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (this.readOnly) return;
            const items = [{ label: 'Clear selection', onSelect: () => this.clearSelection() }];
            const currentPair = this.currentScalePair();
            if (currentPair && !this.scaleBarForPair(currentPair[0], currentPair[1])) {
                items.unshift({ label: 'Create scale bar', onSelect: () => this.createScaleBarFromSelection() });
            }
            this.openMenu(items, e.clientX, e.clientY);
        });
        this.previewBar = {
            data: null, // endpoints come from this.selection
            line,
            labelEl,
            preview: true,
            dirty: true,
        };
    }

    syncLocalPreviewBar() {
        const pair = this.currentScalePair();
        if (!pair || this.scaleBarForPair(pair[0], pair[1])) {
            this.clearPreviewBar();
            return;
        }
        this.ensurePreviewBar();
    }

    clearPreviewBar() {
        if (!this.previewBar) return;
        this.removeBarVisual(this.previewBar);
        this.previewBar = null;
    }

    updateBarHover(clientX, clientY) {
        if (this.scaleBars.size === 0) return;
        const rects = this._rects;
        if (!rects) return;
        const px = clientX - rects.hostRect.left;
        const py = clientY - rects.hostRect.top;
        for (const bar of this.scaleBars.values()) {
            let hovered = false;
            if (bar._ax !== null && bar._ax !== undefined && bar._bx !== null && bar._bx !== undefined) {
                // Distance from pointer to the line's screen segment, with a
                // forgiving 12px hitbox.
                const vx = bar._bx - bar._ax, vy = bar._by - bar._ay;
                const lenSq = vx * vx + vy * vy;
                let t = lenSq > 0 ? ((px - bar._ax) * vx + (py - bar._ay) * vy) / lenSq : 0;
                t = Math.max(0, Math.min(1, t));
                const dx = px - (bar._ax + vx * t);
                const dy = py - (bar._ay + vy * t);
                hovered = (dx * dx + dy * dy) <= 144;
            }
            if (hovered !== bar.lineHovered) {
                bar.lineHovered = hovered;
                this.setBarHoverState(bar);
            }
        }
    }

    shouldSuppressBarHover(event) {
        return !!(event?.pointerType === 'touch' ||
            event?.buttons ||
            this.dragState ||
            this._rightDrag);
    }

    clearScaleBarLineHover() {
        for (const bar of this.scaleBars.values()) {
            if (bar.lineHovered) {
                bar.lineHovered = false;
                this.setBarHoverState(bar);
            }
        }
    }

    setBarHoverState(bar) {
        // The line, its label, and both endpoint markers brighten together.
        bar.hovered = !!(bar.lineHovered || bar.labelHovered);
        const lit = this.barLit(bar);
        this.markers.get(bar.data.a)?.classList.toggle('bv-annotation-marker--bar-hover', lit);
        this.markers.get(bar.data.b)?.classList.toggle('bv-annotation-marker--bar-hover', lit);
    }

    /** Click-select one bar (exclusive); null clears all. */
    setStickyBar(barId) {
        let changed = false;
        for (const [id, bar] of this.scaleBars) {
            const sticky = id === barId;
            if (bar.sticky !== sticky) {
                bar.sticky = sticky;
                changed = true;
                this.setBarHoverState(bar);
            }
        }
        if (changed) this.sendFocus();
    }

    /** Shift-click adds/removes a bar from the selected set. */
    toggleStickyBar(barId) {
        const bar = this.scaleBars.get(barId);
        if (!bar) return;
        bar.sticky = !bar.sticky;
        this.setBarHoverState(bar);
        this.sendFocus();
    }

    stickyBarIds() {
        const ids = [];
        for (const [id, bar] of this.scaleBars) if (bar.sticky) ids.push(id);
        return ids;
    }

    scaleBarForPair(a, b) {
        if (a === b || a === null || a === undefined || b === null || b === undefined) return null;
        for (const [id, bar] of this.scaleBars) {
            if (!bar.data) continue;
            if ((bar.data.a === a && bar.data.b === b) || (bar.data.a === b && bar.data.b === a)) {
                return { id, bar };
            }
        }
        return null;
    }

    remotePreviewKey(userId, a, b) {
        return `${userId}:${Math.min(a, b)}:${Math.max(a, b)}`;
    }

    reconcileRemotePreviewBars() {
        const scene = this.getScene();
        const desired = new Map();
        if (scene) {
            for (const [userId, focus] of this.remoteFocus) {
                const pairSource = (focus.selectedPair?.length === 2) ? focus.selectedPair : focus.selected;
                const selected = (pairSource || []).filter((id) => this.annotations.has(id));
                if (selected.length !== 2) continue;
                const [a, b] = selected;
                if (a === b || this.scaleBarForPair(a, b)) continue;
                desired.set(this.remotePreviewKey(userId, a, b), { a, b, focus });
            }
        }

        for (const [key, bar] of this.remotePreviewBars) {
            if (!desired.has(key)) {
                this.removeBarVisual(bar);
                this.remotePreviewBars.delete(key);
            }
        }
        if (!scene) return;

        for (const [key, entry] of desired) {
            let bar = this.remotePreviewBars.get(key);
            if (!bar) {
                const line = this.makeBarLine(true);
                scene.add(line);
                const labelEl = this.makeBarLabel(true);
                labelEl.classList.add('bv-annotation-scale-label--remote-selected');
                labelEl.style.pointerEvents = 'none';
                bar = {
                    data: { a: entry.a, b: entry.b },
                    line,
                    labelEl,
                    preview: true,
                    remotePreview: true,
                    dirty: true,
                };
                this.remotePreviewBars.set(key, bar);
            }
            bar.data.a = entry.a;
            bar.data.b = entry.b;
            bar.remoteColor = entry.focus.color || null;
            if (bar.remoteColor) {
                bar.labelEl.style.setProperty('--bv-remote-scale-color', bar.remoteColor);
                bar.labelEl.style.setProperty('--bv-remote-scale-ring', this.colorWithAlpha(bar.remoteColor, 0.22));
                bar.line.material.color?.set?.(bar.remoteColor);
            } else {
                bar.labelEl.style.removeProperty('--bv-remote-scale-color');
                bar.labelEl.style.removeProperty('--bv-remote-scale-ring');
                bar.line.material.color?.set?.(0xffffff);
            }
        }
    }

    clearRemotePreviewBars() {
        for (const bar of this.remotePreviewBars.values()) this.removeBarVisual(bar);
        this.remotePreviewBars.clear();
    }

    addScaleBar(barData) {
        if (this.scaleBars.has(barData.id)) return;
        this.store.scaleBars.set(barData.id, { ...barData });
        const scene = this.getScene();
        if (!scene) return;
        const line = this.makeBarLine(false);
        scene.add(line);
        const labelEl = this.makeBarLabel(false);
        const bar = {
            data: barData, line, labelEl, preview: false, dirty: true,
            hovered: false, lineHovered: false, labelHovered: false,
            sticky: false, endpointLit: false, remoteSelected: false, remoteColor: null,
        };
        // Hovering the label or the line lifts the bar out of its resting subtlety.
        labelEl.addEventListener('pointerenter', (e) => {
            if (this.shouldSuppressBarHover(e)) return;
            bar.labelHovered = true;
            this.setBarHoverState(bar);
        });
        labelEl.addEventListener('pointerleave', () => { bar.labelHovered = false; this.setBarHoverState(bar); });
        // Click selects the bar at full strength; shift-click builds a set.
        labelEl.addEventListener('click', (e) => {
            e.stopPropagation();
            if (e.shiftKey) this.toggleStickyBar(barData.id);
            else this.setStickyBar(barData.id);
        });
        labelEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (this.readOnly) return;
            this.openBarMenu(barData.id, e.clientX, e.clientY);
        });
        this.attachLongPress(labelEl, (x, y) => {
            if (!this.readOnly) this.openBarMenu(barData.id, x, y);
        });
        this.scaleBars.set(barData.id, bar);
        const pair = this.currentScalePair();
        if (pair && this.scaleBarForPair(pair[0], pair[1])) {
            this.clearPreviewBar();
        }
        if (this.remoteFocus.size > 0) this.applyRemoteFocusVisuals();
    }

    openBarMenu(barId, clientX, clientY) {
        const bar = this.scaleBars.get(barId);
        if (!bar) return;
        const items = [];
        // Both endpoints collapse/expand together from here - the usual
        // reason to collapse is to quieten a scale bar's stray numbers.
        const endpointIds = [bar.data.a, bar.data.b].filter((id) => this.annotations.has(id));
        const allCollapsed = endpointIds.length > 0 &&
            endpointIds.every((id) => this.annotations.get(id).collapsed);
        items.push({
            label: allCollapsed ? 'Expand endpoint markers' : 'Collapse endpoint markers',
            onSelect: () => {
                for (const id of endpointIds) {
                    this.sendMessage({
                        type: 'annotation_update', action: 'collapse', id, collapsed: !allCollapsed,
                    });
                }
            },
        });
        const sticky = this.stickyBarIds();
        if (sticky.length > 1 && sticky.includes(barId)) {
            items.push({
                label: `Remove ${sticky.length} scale bars`,
                danger: true,
                onSelect: () => {
                    for (const id of sticky) {
                        this.sendMessage({ type: 'annotation_update', action: 'scalebar_delete', id });
                    }
                },
            });
        }
        items.push({
            label: 'Remove scale bar',
            danger: true,
            onSelect: () => this.sendMessage({ type: 'annotation_update', action: 'scalebar_delete', id: barId }),
        });
        this.openMenu(items, clientX, clientY);
    }

    removeScaleBarVisual(barId) {
        const bar = this.scaleBars.get(barId);
        if (!bar) return;
        this.cleanupSelectionForRemovedScaleBar(bar);
        this.removeBarVisual(bar);
        this.scaleBars.delete(barId);
        this.store.scaleBars.delete(barId);
        if (this.remoteFocus.size > 0) this.reconcileRemotePreviewBars();
    }

    cleanupSelectionForRemovedScaleBar(bar) {
        const endpoints = [bar.data?.a, bar.data?.b].filter((id) => typeof id === 'number');
        if (endpoints.length !== 2) return;
        const [a, b] = endpoints;
        let changed = false;
        if (this.scalePair && this.scaleBarForPair(a, b)?.id === bar.data.id) {
            this.scalePair = null;
            changed = true;
        }
        const nextSelection = this.selection.filter((id) => id !== a && id !== b);
        if (nextSelection.length !== this.selection.length) {
            this.selection = nextSelection;
            changed = true;
        }
        if (this._touchPairingAnchor === a || this._touchPairingAnchor === b) {
            this._touchPairingAnchor = null;
            this._touchMultiSelectActive = false;
            changed = true;
        }
        if (!changed) return;
        this.clearPreviewBar();
        this.updateSelectionVisuals();
        this.sendFocus();
    }

    removeBarVisual(bar) {
        if (bar.line) {
            bar.line.parent?.remove(bar.line);
            bar.line.geometry?.dispose();
            bar.line.material?.dispose();
        }
        bar.labelEl?.remove();
    }

    barEndpoints(bar) {
        const [idA, idB] = (bar.preview && !bar.remotePreview) ? (this.currentScalePair() || []) : [bar.data.a, bar.data.b];
        const a = this.displayPositions.get(idA);
        const b = this.displayPositions.get(idB);
        return (a && b) ? [a, b] : null;
    }

    refreshBarsForAnnotation(annotationId, _fromLerp = false) {
        for (const bar of this.scaleBars.values()) {
            if (bar.data.a === annotationId || bar.data.b === annotationId) bar.dirty = true;
        }
        if (this.previewBar && this.selection.includes(annotationId)) {
            this.previewBar.dirty = true;
        }
        if (this.previewBar && this.scalePair?.includes(annotationId)) this.previewBar.dirty = true;
        for (const bar of this.remotePreviewBars.values()) {
            if (bar.data.a === annotationId || bar.data.b === annotationId) bar.dirty = true;
        }
    }

    updateBarVisual(bar, camera, rect, hostRect, lightState) {
        if (!bar) return;
        const endpoints = this.barEndpoints(bar);
        if (!endpoints) {
            bar.line.visible = false;
            bar.labelEl.style.display = 'none';
            return;
        }
        const [a, b] = endpoints;
        const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (bar.dirty !== false) {
            bar.line.geometry.setPositions([a.x, a.y, a.z, b.x, b.y, b.z]);
            if (bar.line.computeLineDistances) bar.line.computeLineDistances();
            bar.dirty = false;
        }
        if (bar.preview) {
            const gap = Math.min(0.08, Math.max(0.01, distance / 96));
            const dash = Math.min(0.16, Math.max(0.02, distance / 48));
            if (bar.line.material.gapSize !== gap || bar.line.material.dashSize !== dash) {
                bar.line.material.gapSize = gap;
                bar.line.material.dashSize = dash;
                bar.line.material.needsUpdate = true;
            }
        }
        bar.line.visible = true;

        // Screen-space endpoints for the line's hover hitbox (consume the
        // shared projection scratch immediately each time). Off-screen
        // endpoints still anchor the hitbox - only behind-camera points are
        // unusable - so a half-visible bar stays hoverable.
        const sa = this.projectToOverlay(a, camera, rect, hostRect, true);
        bar._ax = sa ? sa.x : null;
        bar._ay = sa ? sa.y : null;
        const sb = this.projectToOverlay(b, camera, rect, hostRect, true);
        bar._bx = sb ? sb.x : null;
        bar._by = sb ? sb.y : null;

        if (!this._barMid) this._barMid = { x: 0, y: 0, z: 0 };
        const mid = this._barMid;
        mid.x = (a.x + b.x) / 2;
        mid.y = (a.y + b.y) / 2;
        mid.z = (a.z + b.z) / 2;
        const screen = this.projectToOverlay(mid, camera, rect, hostRect);
        if (!screen) {
            bar.labelEl.style.display = 'none';
            return;
        }
        const text = `${distance.toFixed(2)} m`;
        if (bar.labelEl.dataset.text !== text) {
            bar.labelEl.dataset.text = text;
            if (bar.preview && !bar.remotePreview && !this.readOnly) {
                bar.labelEl.innerHTML = '';
                bar.labelEl.appendChild(document.createTextNode(text));
                const create = document.createElement('span');
                create.className = 'bv-annotation-scale-label__create';
                create.textContent = 'Create';
                bar.labelEl.appendChild(create);
            } else {
                bar.labelEl.textContent = text;
            }
        }
        bar.labelEl.style.display = 'block';
        const lx = Math.round(screen.x * 10) / 10;
        const ly = Math.round(screen.y * 10) / 10;
        if (bar.labelEl._bvX !== lx || bar.labelEl._bvY !== ly) {
            bar.labelEl.style.transform = `translate(${lx}px, ${ly}px) translate(-50%, -50%)`;
            bar.labelEl._bvX = lx;
            bar.labelEl._bvY = ly;
        }
        // Resting bars are barely-there; hovering or selecting the bar - or
        // either of its endpoint markers - brings them to full strength.
        const lit = this.barLit(bar);
        const lineBase = bar.preview ? 0.35 : (lit ? 0.95 : 0.1);
        const labelBase = bar.preview ? 0.95 : (lit ? 1 : 0.12);
        const lightFactor = lightState ? this.computeLightFactor(mid, lightState) : 1;
        const minSelectedOpacity = bar.sticky ? 0.5 : (bar.remoteSelected ? 0.35 : 0);
        bar.line.material.opacity = Math.max(minSelectedOpacity, lineBase * lightFactor);
        const labelOpacity = Math.round(Math.max(minSelectedOpacity, labelBase * lightFactor) * 200) / 200;
        if (bar.labelEl._bvOpacity !== labelOpacity) {
            bar.labelEl.style.opacity = String(labelOpacity);
            bar.labelEl._bvOpacity = labelOpacity;
        }
        const zIndex = lit ? '85' : '2';
        if (bar.labelEl.style.zIndex !== zIndex) {
            bar.labelEl.style.zIndex = zIndex;
        }
    }

    // ------------------------------------------------------------------
    // Panels (view popup + create/edit form)
    // ------------------------------------------------------------------

    buildPanel(mode, { broadcastClose = true } = {}) {
        this.closePanel({ broadcast: broadcastClose });
        const panel = document.createElement('div');
        panel.className = 'bv-annotation-panel below-panel';
        panel.dataset.mode = mode;
        panel.addEventListener('contextmenu', (e) => e.stopPropagation());
        this.container.appendChild(panel);
        this.panelEl = panel;
        return panel;
    }

    positionFloating(el, clientX, clientY) {
        const hostRect = this.container.getBoundingClientRect();
        let x = clientX - hostRect.left + 14;
        let y = clientY - hostRect.top + 10;
        const elRect = el.getBoundingClientRect();
        if (x + elRect.width > hostRect.width - 12) {
            x = Math.max(12, clientX - hostRect.left - elRect.width - 14);
        }
        if (y + elRect.height > hostRect.height - 12) {
            y = Math.max(12, hostRect.height - elRect.height - 12);
        }
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
    }

    closePanel({ broadcast = true } = {}) {
        const hadFocus = this.openPanelFor !== null || this._editingId !== null;
        const wasMirrored = this._mirroredFocusUserId !== null;
        if (this.openPanelFor !== null) {
            this.markers.get(this.openPanelFor)?.classList.remove('bv-annotation-marker--active');
        }
        if (this.panelEl?.dataset.mode === 'create') {
            this.expireLocalPing(400);
            clearInterval(this._draftInterval);
            this._draftInterval = null;
        }
        this._editingId = null;
        this._editDraftTitle = '';
        this._editDraftNotes = '';
        this._mirroredFocusUserId = null;
        this.openPanelFor = null;
        this.panelEl?.remove();
        this.panelEl = null;
        // Release the viewed/edit claim so remote rings clear promptly.
        if (hadFocus && broadcast && !wasMirrored) this.sendFocus();
    }

    dismissForFlyMode() {
        this.closeMenu();
        this.closePanel();
        this.exitMoveMode(false);
    }

    dismissTransientUi() {
        this.dismissForFlyMode();
    }

    openCreatePanel(position, clientX, clientY) {
        const panel = this.buildPanel('create');
        panel.innerHTML = `
            <input type="text" class="bv-annotation-input-title" placeholder="Title" maxlength="${TITLE_MAX_LENGTH}">
            <textarea class="bv-annotation-input-notes" placeholder="Notes (optional)" maxlength="${NOTES_MAX_LENGTH}"></textarea>
            <div class="bv-annotation-panel__actions">
                <button class="bv-annotation-btn bv-annotation-cancel">Cancel</button>
                <button class="bv-annotation-btn bv-annotation-btn--primary bv-annotation-save">Add</button>
            </div>
        `;
        this.positionFloating(panel, clientX, clientY);

        const titleInput = panel.querySelector('.bv-annotation-input-title');
        const notesInput = panel.querySelector('.bv-annotation-input-notes');

        // Stream the draft title to the room while typing, so others see the
        // ghost ping grow a name before the marker lands. The interval doubles
        // as a keepalive so their ghost doesn't expire mid-composition.
        const sendDraft = () => {
            if (this.panelEl?.dataset.mode !== 'create') return; // panel closed mid-throttle
            this.sendMessage({
                type: 'annotation_update',
                action: 'ping',
                position,
                title: titleInput.value.trim().slice(0, TITLE_MAX_LENGTH),
            }, { quiet: true });
        };
        titleInput.addEventListener('input', this.makeDraftStreamer(sendDraft));
        clearInterval(this._draftInterval);
        this._draftInterval = setInterval(sendDraft, 2500);

        const save = () => {
            const title = titleInput.value.trim();
            if (!title) {
                titleInput.focus();
                return;
            }
            this.removeLocalPing();
            this.createAnnotation(title, notesInput.value, position);
            this.closePanel();
        };
        panel.querySelector('.bv-annotation-save').addEventListener('click', save);
        panel.querySelector('.bv-annotation-cancel').addEventListener('click', () => this.closePanel());
        titleInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); save(); }
        });
        notesInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); save(); }
        });
        titleInput.focus();
    }

    openViewPanel(annotationId) {
        const annotation = this.annotations.get(annotationId);
        const marker = this.markers.get(annotationId);
        if (!annotation || !marker) return;

        const panel = this.buildPanel('view');
        this.openPanelFor = annotationId;
        marker.classList.add('bv-annotation-marker--active');
        this.sendFocus(); // others see the ring while we have the card open

        const meta = [];
        if (annotation.created_by) meta.push(annotation.created_by);
        if (annotation.created_at) {
            const date = new Date(annotation.created_at);
            if (!isNaN(date)) meta.push(date.toLocaleDateString());
        }

        panel.innerHTML = `
            <div class="bv-annotation-panel__title"></div>
            ${annotation.notes ? '<div class="bv-annotation-panel__notes"></div>' : ''}
            ${meta.length ? `<div class="bv-annotation-panel__meta">${meta.map(m => this.escapeHtml(m)).join(' · ')}</div>` : ''}
            ${this.readOnly ? '' : `
            <div class="bv-annotation-panel__actions bv-annotation-panel__actions--spread">
                <button class="bv-annotation-btn bv-annotation-btn--danger bv-annotation-delete">Delete</button>
                <div class="bv-annotation-panel__actions-group">
                    <button class="bv-annotation-btn bv-annotation-move">Move</button>
                    <button class="bv-annotation-btn bv-annotation-btn--primary bv-annotation-edit">Edit</button>
                </div>
            </div>`}
        `;
        panel.querySelector('.bv-annotation-panel__title').textContent = annotation.title;
        if (annotation.notes) {
            panel.querySelector('.bv-annotation-panel__notes').textContent = annotation.notes;
        }

        if (!this.readOnly) {
            const deleteBtn = panel.querySelector('.bv-annotation-delete');
            deleteBtn.addEventListener('click', () => {
                if (deleteBtn.dataset.confirming) {
                    this.remove(annotationId);
                    this.closePanel();
                } else {
                    deleteBtn.dataset.confirming = '1';
                    deleteBtn.textContent = 'Confirm?';
                }
            });
            const editBtn = panel.querySelector('.bv-annotation-edit');
            const editor = this.remoteEditorOf(annotationId);
            if (editor) {
                editBtn.disabled = true;
                editBtn.title = `${editor} is editing`;
            }
            editBtn.addEventListener('click', () => {
                if (editBtn.disabled) return;
                this.openEditPanel(annotationId);
            });
            panel.querySelector('.bv-annotation-move').addEventListener('click', () => {
                this.closePanel();
                this.enterMoveMode(annotationId);
            });
        }

        const markerRect = marker.getBoundingClientRect();
        this.positionFloating(panel, markerRect.right, markerRect.top);
    }

    openEditPanel(annotationId) {
        const annotation = this.annotations.get(annotationId);
        const marker = this.markers.get(annotationId);
        if (!annotation || !marker) return;
        const editor = this.remoteEditorOf(annotationId);
        if (editor) {
            this.showToast(`${editor} is editing this annotation`);
            return;
        }

        const panel = this.buildPanel('edit');
        this.openPanelFor = annotationId;
        marker.classList.add('bv-annotation-marker--active');

        // Claim the edit for everyone to see: their Edit buttons grey out and
        // our draft title streams onto the marker's chip as we type.
        this._editingId = annotationId;
        this._editDraftTitle = annotation.title;
        this._editDraftNotes = annotation.notes || '';
        this.sendFocus();

        panel.innerHTML = `
            <input type="text" class="bv-annotation-input-title" placeholder="Title" maxlength="${TITLE_MAX_LENGTH}">
            <textarea class="bv-annotation-input-notes" placeholder="Notes (optional)" maxlength="${NOTES_MAX_LENGTH}"></textarea>
            <div class="bv-annotation-panel__actions">
                <button class="bv-annotation-btn bv-annotation-cancel">Cancel</button>
                <button class="bv-annotation-btn bv-annotation-btn--primary bv-annotation-save">Save</button>
            </div>
        `;
        const titleInput = panel.querySelector('.bv-annotation-input-title');
        const notesInput = panel.querySelector('.bv-annotation-input-notes');
        titleInput.value = annotation.title;
        notesInput.value = annotation.notes || '';

        const streamFocus = this.makeDraftStreamer(() => this.sendFocus());
        titleInput.addEventListener('input', () => {
            this._editDraftTitle = titleInput.value.trim().slice(0, TITLE_MAX_LENGTH);
            streamFocus();
        });
        notesInput.addEventListener('input', () => {
            this._editDraftNotes = notesInput.value.slice(0, NOTES_MAX_LENGTH);
            streamFocus();
        });

        const save = () => {
            const title = titleInput.value.trim();
            if (!title) {
                titleInput.focus();
                return;
            }
            // Optimistic local update; the authoritative echo confirms it.
            annotation.title = title;
            annotation.notes = notesInput.value;
            this.upsertAnnotation(annotation);
            this.sendMessage({
                type: 'annotation_update',
                action: 'edit',
                id: annotationId,
                title,
                notes: notesInput.value,
            });
            this.closePanel();
        };
        panel.querySelector('.bv-annotation-save').addEventListener('click', save);
        panel.querySelector('.bv-annotation-cancel').addEventListener('click', () => this.closePanel());
        titleInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); save(); }
        });
        notesInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); save(); }
        });

        const markerRect = marker.getBoundingClientRect();
        this.positionFloating(panel, markerRect.right, markerRect.top);
        titleInput.focus();
        titleInput.select();
    }

    // ------------------------------------------------------------------
    // Actions
    // ------------------------------------------------------------------

    createAnnotation(title, notes, position) {
        if (this.readOnly) return null;
        const normalizedPosition = normalizePosition(position);
        const normalizedTitle = String(title || '').trim().slice(0, TITLE_MAX_LENGTH);
        const normalizedNotes = String(notes || '').slice(0, NOTES_MAX_LENGTH);
        if (!normalizedPosition || !normalizedTitle || this.annotations.size >= 500) return null;
        if (!this.adapter && !this.send) {
            const annotation = this.store.create({
                title: normalizedTitle,
                notes: normalizedNotes,
                position: normalizedPosition,
                collapsed: false,
                created_by: null,
                created_at: new Date().toISOString(),
                updated_at: null,
            });
            const world = this.modelPositionToWorld(annotation.position);
            this.displayPositions.set(annotation.id, { x: world.x, y: world.y, z: world.z });
            this.createMarkerElement(annotation);
            this.renumberMarkers();
            this.updateControlButtons();
            this.emit('annotation-changed', { action: 'create', annotation });
            return annotation;
        }
        const clientId = this.createClientId();
        const tempId = this.tempIdCounter--;
        const optimistic = {
            id: tempId,
            title: normalizedTitle,
            notes: normalizedNotes,
            position: { ...normalizedPosition },
            created_at: new Date().toISOString(),
            pending: true,
        };
        this.pendingCreates.set(clientId, tempId);
        this.annotations.set(tempId, optimistic);
        const world = this.modelPositionToWorld(normalizedPosition);
        this.displayPositions.set(tempId, { x: world.x, y: world.y, z: world.z });
        this.createMarkerElement(optimistic);
        this.renumberMarkers();
        this.updateControlButtons();

        const sent = this.sendMessage({
            type: 'annotation_update',
            action: 'create',
            client_id: clientId,
            title: normalizedTitle,
            notes: normalizedNotes,
            position: optimistic.position,
        });
        if (!sent) {
            this.pendingCreates.delete(clientId);
            this.removeAnnotationLocal(tempId);
            this.renumberMarkers();
        }
        return optimistic;
    }

    requestSync() {
        if (this.adapter?.requestSnapshot) {
            this.adapter.requestSnapshot();
            return;
        }
        this.sendMessage({ type: 'annotation_sync_request' }, { quiet: true });
    }

    sendMessage(payload, { quiet = false } = {}) {
        if (this.adapter?.send) {
            const result = this.adapter.send(payload);
            return result !== false;
        }
        if (!this.send) {
            if (!this.readOnly && payload?.type === 'annotation_update') {
                if (payload.action === 'delete') this.removeAnnotationLocal(payload.id);
                else if (payload.action === 'scalebar_delete') this.removeScaleBarVisual(payload.id);
                else if (payload.action === 'scalebar_create') {
                    const bar = this.store.createScaleBar(payload.a, payload.b);
                    if (bar) this.addScaleBar(bar);
                } else if (payload.action === 'collapse') {
                    const annotation = this.annotations.get(payload.id);
                    if (annotation) this.upsertAnnotation({ ...annotation, collapsed: !!payload.collapsed });
                }
                return true;
            }
            return false;
        }
        const ok = this.send(payload);
        if (!ok && !quiet) this.showToast('Not connected - annotation not saved');
        return ok;
    }

    /**
     * Touch long-press helper: fires the handler after a steady 550ms hold.
     * Movement, lift-off or a second touch cancels it.
     */
    attachLongPress(el, handler) {
        let timer = null;
        let startX = 0, startY = 0, pointerId = null;
        const cancel = () => {
            clearTimeout(timer);
            timer = null;
            pointerId = null;
        };
        const onPointerDown = (e) => {
            if (e.pointerType !== 'touch' || !e.isPrimary) return;
            startX = e.clientX;
            startY = e.clientY;
            pointerId = e.pointerId;
            clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                this._longPressFired = performance.now();
                navigator.vibrate?.(15);
                handler(startX, startY);
            }, LONG_PRESS_MS);
        };
        const onPointerMove = (e) => {
            if (!timer || e.pointerId !== pointerId) return;
            const dx = e.clientX - startX, dy = e.clientY - startY;
            if (dx * dx + dy * dy > 64) cancel();
        };
        el.addEventListener('pointerdown', onPointerDown);
        el.addEventListener('pointermove', onPointerMove);
        el.addEventListener('pointerup', cancel);
        el.addEventListener('pointercancel', cancel);
        return () => {
            clearTimeout(timer);
            el.removeEventListener('pointerdown', onPointerDown);
            el.removeEventListener('pointermove', onPointerMove);
            el.removeEventListener('pointerup', cancel);
            el.removeEventListener('pointercancel', cancel);
        };
    }

    /**
     * Leading + trailing throttle for draft streaming. The trailing send is
     * what makes the LAST keystroke land within ~300ms - a plain throttle
     * silently dropped it until the 2.5s keepalive caught up.
     */
    makeDraftStreamer(send, intervalMs = 300) {
        let lastSentAt = 0;
        let trailing = null;
        return () => {
            const now = performance.now();
            const since = now - lastSentAt;
            if (since >= intervalMs) {
                lastSentAt = now;
                send();
            } else {
                clearTimeout(trailing);
                trailing = setTimeout(() => {
                    lastSentAt = performance.now();
                    send();
                }, intervalMs - since);
            }
        };
    }

    // ------------------------------------------------------------------
    // Misc
    // ------------------------------------------------------------------

    showToast(message, durationMs = 2800) {
        if (!this.toastEl) {
            this.toastEl = document.createElement('div');
            this.toastEl.className = 'bv-annotation-toast';
            document.body.appendChild(this.toastEl);
        }
        this.toastEl.textContent = message;
        this.toastEl.classList.add('bv-annotation-toast--visible');
        clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
            this.toastEl?.classList.remove('bv-annotation-toast--visible');
        }, durationMs);
    }

    escapeHtml(value) {
        const div = document.createElement('div');
        div.textContent = String(value);
        return div.innerHTML;
    }
}
