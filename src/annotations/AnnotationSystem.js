import { EventSystem } from '../utils/EventSystem.js';
import { AnnotationDesktopLayer } from './AnnotationDesktopLayer.js';

const PUBLIC_EVENTS = [
  'annotations-loaded',
  'annotations-cleared',
  'annotation-changed',
  'annotation-selection-changed',
  'annotation-visibility-changed',
  'annotation-error'
];

/**
 * Stable annotations facade for ModelViewer and low-level BelowViewer hosts.
 *
 * Document/state lifecycle, transport coordination, desktop/touch presentation,
 * and XR presentation stay behind this boundary so integrations do not depend
 * on marker elements, panels, scale-bar objects, or presence maps.
 */
export class AnnotationSystem extends EventSystem {
  constructor(viewer, options = {}) {
    super();
    this.runtime = new AnnotationDesktopLayer(viewer, options);
    this._runtimeListeners = PUBLIC_EVENTS.map((eventName) => {
      const listener = (data) => this.emit(eventName, data);
      this.runtime.on(eventName, listener);
      return { eventName, listener };
    });
  }

  load(source, options) { return this.runtime.load(source, options); }
  clear() { return this.runtime.clear(); }
  getDocument() { return this.runtime.getDocument(); }
  download(filename) { return this.runtime.download(filename); }

  setMode(mode) { return this.runtime.setMode(mode); }
  getMode() { return this.runtime.getMode(); }
  setVisible(visible) { return this.runtime.setVisible(visible); }
  isVisible() { return this.runtime.isVisible(); }
  setAdapter(adapter) {
    this.runtime.setAdapter(adapter);
    return this;
  }

  create(input) { return this.runtime.create(input); }
  update(annotationId, patch) { return this.runtime.update(annotationId, patch); }
  move(annotationId, position) { return this.runtime.move(annotationId, position); }
  remove(annotationId) { return this.runtime.remove(annotationId); }
  createScaleBar(a, b) { return this.runtime.createScaleBar(a, b); }
  removeScaleBar(scaleBarId) { return this.runtime.removeScaleBar(scaleBarId); }
  select(annotationIds) { return this.runtime.select(annotationIds); }

  setFollowedParticipant(participantId) {
    return this.runtime.setFollowedParticipant(participantId);
  }
  dismissTransientUi() { return this.runtime.dismissTransientUi(); }
  requestSnapshot() { return this.runtime.requestSnapshot(); }
  refreshPresence() { return this.runtime.refreshPresence(); }

  list() { return this.runtime.list(); }
  listScaleBars() { return this.runtime.listScaleBars(); }
  hitTest(clientX, clientY) { return this.runtime.hitTest(clientX, clientY); }
  project(position) { return this.runtime.project(position); }
  captureScreenshot(options) { return this.runtime.captureScreenshot(options); }

  // ModelViewer lifecycle hooks. They are intentionally not transport-specific.
  prepareModel(modelKey, modelConfig) {
    return this.runtime.prepareModel(modelKey, modelConfig);
  }
  activateModel(modelKey, model, modelConfig) {
    return this.runtime.activateModel(modelKey, model, modelConfig);
  }

  destroy() {
    for (const { eventName, listener } of this._runtimeListeners) {
      this.runtime.off?.(eventName, listener);
    }
    this._runtimeListeners = [];
    this.runtime.destroy();
    this.removeAllListeners();
  }
}
