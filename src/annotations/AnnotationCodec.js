export const ANNOTATION_DOCUMENT_FORMAT = 'belowjs-annotations';
export const ANNOTATION_DOCUMENT_VERSION = 1;
export const ANNOTATION_TITLE_MAX_LENGTH = 120;
export const ANNOTATION_NOTES_MAX_LENGTH = 4000;
export const ANNOTATION_MAX_COUNT = 500;

function finiteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export function normalizePosition(value) {
  if (!value || typeof value !== 'object') return null;
  const x = finiteNumber(value.x);
  const y = finiteNumber(value.y);
  const z = finiteNumber(value.z);
  if (x === null || y === null || z === null) return null;
  return { x, y, z };
}

export function normalizeAnnotationDocument(input, options = {}) {
  const warnings = [];
  if (!input || typeof input !== 'object') {
    throw new TypeError('Annotation document must be an object.');
  }
  if (input.format !== ANNOTATION_DOCUMENT_FORMAT) {
    throw new TypeError(`Unsupported annotation format: ${String(input.format || 'missing')}`);
  }
  if (input.version !== undefined && input.version !== ANNOTATION_DOCUMENT_VERSION) {
    throw new TypeError(`Unsupported annotation document version: ${String(input.version)}`);
  }

  const entries = Array.isArray(input.annotations) ? input.annotations : [];
  if (entries.length > (options.maxAnnotations ?? ANNOTATION_MAX_COUNT)) {
    throw new RangeError(`Annotation document exceeds the ${options.maxAnnotations ?? ANNOTATION_MAX_COUNT} annotation limit.`);
  }

  const annotations = [];
  const sourceIndexToId = new Map();
  const usedIds = new Set();
  let nextId = 1;
  entries.forEach((entry, sourceIndex) => {
    if (!entry || typeof entry !== 'object') {
      warnings.push({ path: `annotations[${sourceIndex}]`, message: 'Entry is not an object.' });
      return;
    }
    const title = String(entry.title || '').trim().slice(0, ANNOTATION_TITLE_MAX_LENGTH);
    const position = normalizePosition(entry.position);
    if (!title || !position) {
      warnings.push({ path: `annotations[${sourceIndex}]`, message: 'Entry requires a title and finite position.' });
      return;
    }
    let id = entry.id;
    if (id === null || id === undefined || usedIds.has(id)) {
      while (usedIds.has(nextId)) nextId += 1;
      id = nextId;
      nextId += 1;
    } else if (typeof id === 'number' && Number.isFinite(id)) {
      nextId = Math.max(nextId, Math.floor(id) + 1);
    }
    usedIds.add(id);
    sourceIndexToId.set(sourceIndex, id);
    annotations.push({
      id,
      title,
      notes: String(entry.notes || '').slice(0, ANNOTATION_NOTES_MAX_LENGTH),
      position,
      collapsed: !!entry.collapsed,
      created_by: entry.created_by ?? null,
      created_at: entry.created_at ?? null,
      updated_at: entry.updated_at ?? null
    });
  });

  const scaleBars = [];
  const seenPairs = new Set();
  const barEntries = Array.isArray(input.scale_bars) ? input.scale_bars : [];
  barEntries.forEach((entry, sourceIndex) => {
    const sourceA = entry?.a;
    const sourceB = entry?.b;
    const a = sourceIndexToId.get(sourceA);
    const b = sourceIndexToId.get(sourceB);
    if (!Number.isInteger(sourceA) || !Number.isInteger(sourceB) || a === undefined || b === undefined || a === b) {
      warnings.push({ path: `scale_bars[${sourceIndex}]`, message: 'Scale bar endpoints are invalid.' });
      return;
    }
    const pairKey = [String(a), String(b)].sort().join(':');
    if (seenPairs.has(pairKey)) return;
    seenPairs.add(pairKey);
    scaleBars.push({ id: entry.id ?? sourceIndex + 1, a, b });
  });

  const declaredCoordinateSpace = input.layer?.coordinate_space;
  const coordinateSpace = declaredCoordinateSpace === 'model' || declaredCoordinateSpace === 'world'
    ? declaredCoordinateSpace
    : declaredCoordinateSpace
      ? 'model'
      : 'world';
  if (declaredCoordinateSpace && coordinateSpace !== declaredCoordinateSpace) {
    warnings.push({ path: 'layer.coordinate_space', message: 'Coordinate space must be "model" or "world".' });
  }

  return {
    document: {
      format: ANNOTATION_DOCUMENT_FORMAT,
      version: ANNOTATION_DOCUMENT_VERSION,
      layer: {
        ...(input.layer && typeof input.layer === 'object' ? input.layer : {}),
        name: String(input.layer?.name || 'Annotations'),
        // Version 1 documents created by the original BelowVR annotation
        // runtime stored world-space ray hits and had no metadata. New BelowJS
        // exports always declare model space explicitly.
        coordinate_space: coordinateSpace
      },
      annotations,
      scale_bars: scaleBars
    },
    warnings
  };
}

export function serializeAnnotationDocument({ layer, annotations, scaleBars }) {
  const entries = Array.from(annotations || []);
  const indexById = new Map(entries.map((annotation, index) => [annotation.id, index]));
  const serializedBars = [];
  for (const bar of Array.from(scaleBars || [])) {
    const a = indexById.get(bar.a);
    const b = indexById.get(bar.b);
    if (a === undefined || b === undefined || a === b) continue;
    serializedBars.push({ a, b });
  }
  return {
    format: ANNOTATION_DOCUMENT_FORMAT,
    version: ANNOTATION_DOCUMENT_VERSION,
    layer: {
      ...(layer || {}),
      name: String(layer?.name || 'Annotations'),
      coordinate_space: 'model'
    },
    annotations: entries.map((annotation) => ({
      title: String(annotation.title || '').slice(0, ANNOTATION_TITLE_MAX_LENGTH),
      notes: String(annotation.notes || '').slice(0, ANNOTATION_NOTES_MAX_LENGTH),
      position: normalizePosition(annotation.position) || { x: 0, y: 0, z: 0 },
      collapsed: !!annotation.collapsed,
      created_by: annotation.created_by ?? null,
      created_at: annotation.created_at ?? null,
      updated_at: annotation.updated_at ?? null
    })),
    scale_bars: serializedBars
  };
}
