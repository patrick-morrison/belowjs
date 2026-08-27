import { EventSystem } from '../utils/EventSystem.js';
import { normalizePosition } from './AnnotationCodec.js';

export class AnnotationStore extends EventSystem {
  constructor() {
    super();
    this.layer = null;
    this.annotations = new Map();
    this.scaleBars = new Map();
    this.selection = [];
    this.nextLocalId = 1;
    this.nextLocalScaleBarId = 1;
  }

  replace({ layer = null, annotations = [], scale_bars: scaleBars = [] } = {}) {
    this.layer = layer;
    this.annotations.clear();
    this.scaleBars.clear();
    this.nextLocalId = 1;
    this.nextLocalScaleBarId = 1;
    for (const annotation of annotations) {
      this.annotations.set(annotation.id, { ...annotation, position: { ...annotation.position } });
      if (typeof annotation.id === 'number') this.nextLocalId = Math.max(this.nextLocalId, annotation.id + 1);
    }
    for (const bar of scaleBars) {
      this.scaleBars.set(bar.id, { ...bar });
      if (typeof bar.id === 'number') this.nextLocalScaleBarId = Math.max(this.nextLocalScaleBarId, bar.id + 1);
    }
    this.selection = [];
    this.emit('change', { action: 'replace' });
  }

  clear() {
    this.replace({ layer: null, annotations: [], scale_bars: [] });
  }

  create(input) {
    const id = input.id ?? this.nextLocalId++;
    const annotation = { ...input, id, position: normalizePosition(input.position) };
    if (!annotation.position) throw new TypeError('Annotation position must be finite.');
    this.annotations.set(id, annotation);
    this.emit('change', { action: 'create', annotation });
    return annotation;
  }

  update(id, patch) {
    const current = this.annotations.get(id);
    if (!current) return null;
    const next = { ...current, ...patch };
    if (patch.position) {
      next.position = normalizePosition(patch.position);
      if (!next.position) throw new TypeError('Annotation position must be finite.');
    }
    this.annotations.set(id, next);
    this.emit('change', { action: 'update', annotation: next });
    return next;
  }

  remove(id) {
    const annotation = this.annotations.get(id);
    if (!annotation) return null;
    this.annotations.delete(id);
    for (const [barId, bar] of this.scaleBars) {
      if (bar.a === id || bar.b === id) this.scaleBars.delete(barId);
    }
    this.selection = this.selection.filter((selectedId) => selectedId !== id);
    this.emit('change', { action: 'delete', annotation });
    return annotation;
  }

  createScaleBar(a, b, id = this.nextLocalScaleBarId++) {
    if (a === b || !this.annotations.has(a) || !this.annotations.has(b)) return null;
    const existing = Array.from(this.scaleBars.values()).find((bar) =>
      (bar.a === a && bar.b === b) || (bar.a === b && bar.b === a));
    if (existing) return existing;
    const bar = { id, a, b };
    this.scaleBars.set(id, bar);
    this.emit('change', { action: 'scalebar_create', scaleBar: bar });
    return bar;
  }

  removeScaleBar(id) {
    const bar = this.scaleBars.get(id);
    if (!bar) return null;
    this.scaleBars.delete(id);
    this.emit('change', { action: 'scalebar_delete', scaleBar: bar });
    return bar;
  }

  select(ids) {
    this.selection = Array.from(new Set(ids || [])).filter((id) => this.annotations.has(id));
    this.emit('selection-change', { selection: [...this.selection] });
    return [...this.selection];
  }
}
