import assert from 'node:assert/strict';
import test from 'node:test';
import * as THREE from 'three';

import {
  normalizeAnnotationDocument,
  serializeAnnotationDocument
} from '../src/annotations/AnnotationCodec.js';
import { AnnotationStore } from '../src/annotations/AnnotationStore.js';
import { AnnotationSystem } from '../src/annotations/AnnotationSystem.js';
import { AnnotationDesktopLayer } from '../src/annotations/AnnotationDesktopLayer.js';
import { AnnotationXRLayer } from '../src/annotations/AnnotationXRLayer.js';
import { MeasurementSystem } from '../src/measurement/MeasurementSystem.js';

const fixture = {
  format: 'belowjs-annotations',
  version: 1,
  layer: { name: 'Survey', coordinate_space: 'model' },
  annotations: [
    { title: 'Bow', notes: 'Stem post', position: { x: 1, y: 2, z: 3 } },
    { title: 'Stern', notes: '', position: { x: 4, y: 5, z: 6 }, collapsed: true }
  ],
  scale_bars: [{ a: 0, b: 1 }]
};

test('public annotation facade exposes commands without renderer internals', () => {
  const required = [
    'load', 'clear', 'getDocument', 'download', 'setMode', 'setVisible', 'setAdapter',
    'create', 'update', 'move', 'remove', 'createScaleBar', 'removeScaleBar', 'select',
    'setFollowedParticipant', 'dismissTransientUi', 'list', 'listScaleBars',
    'hitTest', 'project', 'captureScreenshot'
  ];
  for (const method of required) assert.equal(typeof AnnotationSystem.prototype[method], 'function', method);
  for (const internal of ['markers', 'panelEl', 'remoteFocus', 'scaleBars']) {
    assert.equal(Object.hasOwn(AnnotationSystem.prototype, internal), false, internal);
  }
});

test('version 1 annotation documents normalize and round-trip scale bars', () => {
  const { document, warnings } = normalizeAnnotationDocument(fixture);
  assert.deepEqual(warnings, []);
  assert.equal(document.annotations.length, 2);
  assert.deepEqual(document.scale_bars, [{ id: 1, a: 1, b: 2 }]);

  const output = serializeAnnotationDocument({
    layer: document.layer,
    annotations: document.annotations,
    scaleBars: document.scale_bars
  });
  assert.equal(output.format, 'belowjs-annotations');
  assert.equal(output.version, 1);
  assert.equal(output.layer.coordinate_space, 'model');
  assert.deepEqual(output.scale_bars, [{ a: 0, b: 1 }]);
});

test('legacy version 1 documents without metadata normalize as world space', () => {
  const legacy = structuredClone(fixture);
  delete legacy.layer.coordinate_space;
  assert.equal(normalizeAnnotationDocument(legacy).document.layer.coordinate_space, 'world');
});

test('malformed annotations are skipped without corrupting valid scale bars', () => {
  const { document, warnings } = normalizeAnnotationDocument({
    ...fixture,
    annotations: [fixture.annotations[0], { title: '', position: null }, fixture.annotations[1]],
    scale_bars: [{ a: 0, b: 2 }, { a: 0, b: 1 }]
  });
  assert.equal(document.annotations.length, 2);
  assert.deepEqual(document.scale_bars, [{ id: 1, a: 1, b: 2 }]);
  assert.equal(warnings.length, 2);
});

test('mixed and duplicate annotation ids receive stable unique ids', () => {
  const { document } = normalizeAnnotationDocument({
    ...fixture,
    annotations: [
      { ...fixture.annotations[0], id: 8 },
      { ...fixture.annotations[1], id: 8 },
      { ...fixture.annotations[0], title: 'Third' }
    ],
    scale_bars: [{ a: 0, b: 1 }, { a: 1, b: 2 }]
  });
  assert.equal(new Set(document.annotations.map(({ id }) => id)).size, 3);
  assert.equal(document.scale_bars.length, 2);
});

test('annotation store handles CRUD, selection, and scale-bar cleanup', () => {
  const store = new AnnotationStore();
  store.replace(normalizeAnnotationDocument(fixture).document);
  const created = store.create({ title: 'Mast', notes: '', position: { x: 7, y: 8, z: 9 } });
  assert.equal(store.annotations.size, 3);
  store.update(created.id, { notes: 'Standing structure' });
  assert.equal(store.annotations.get(created.id).notes, 'Standing structure');
  const bar = store.createScaleBar(1, created.id);
  assert.ok(bar);
  assert.deepEqual(store.select([1, created.id, 999]), [1, created.id]);
  store.remove(created.id);
  assert.equal(store.scaleBars.has(bar.id), false);
  assert.deepEqual(store.selection, [1]);
});

test('read limits and unsupported formats fail explicitly', () => {
  assert.throws(() => normalizeAnnotationDocument({ format: 'other', annotations: [] }), /Unsupported annotation format/);
  assert.throws(() => normalizeAnnotationDocument({
    format: 'belowjs-annotations',
    version: 1,
    annotations: Array.from({ length: 501 }, (_, index) => ({
      title: String(index),
      position: { x: index, y: 0, z: 0 }
    }))
  }), /500 annotation limit/);
});

test('read-only facade guards reject annotation mutations', () => {
  const system = Object.create(AnnotationDesktopLayer.prototype);
  system.readOnly = true;
  system.annotations = new Map([[1, fixture.annotations[0]]]);
  system.scaleBars = new Map([[1, { data: { id: 1, a: 1, b: 2 } }]]);
  assert.equal(system.create({ title: 'No', position: { x: 0, y: 0, z: 0 } }), null);
  assert.equal(system.update(1, { title: 'No' }), null);
  assert.equal(system.move(1, { x: 1, y: 1, z: 1 }), null);
  assert.equal(system.remove(1), false);
  assert.equal(system.createScaleBar(1, 2), null);
  assert.equal(system.removeScaleBar(1), false);
});

test('stale annotation URL loads are ignored after a newer document wins', async () => {
  const system = Object.create(AnnotationDesktopLayer.prototype);
  system._loadGeneration = 0;
  system._loadController = null;
  system._activeModelKey = 'wreck';
  system.loadStaticData = (document) => ({ document, warnings: [] });
  system.getDocument = () => fixture;
  system.clear = () => {};
  system.emit = () => {};
  let resolveOld;
  const previousFetch = globalThis.fetch;
  globalThis.fetch = () => new Promise((resolve) => { resolveOld = resolve; });
  try {
    const oldLoad = system.load('/old.annotations.json');
    const newLoad = await system.load(fixture);
    resolveOld({ ok: true, json: async () => ({ ...fixture, layer: { name: 'Old' } }) });
    assert.equal(await oldLoad, null);
    assert.equal(newLoad.document.layer.name, 'Survey');
  } finally {
    globalThis.fetch = previousFetch;
  }
});

test('per-model annotation fetch starts before model activation and stale generations never activate', async () => {
  const system = Object.create(AnnotationDesktopLayer.prototype);
  system._loadGeneration = 0;
  system._loadController = null;
  system.adapter = null;
  system.overlayEl = null;
  system.xrLayer = { attach: () => {} };
  system.setAnnotationsVisible = () => {};
  system.clear = () => {};
  system.emit = () => {};
  const loadedLayers = [];
  system.loadStaticData = (document) => {
    loadedLayers.push(document.layer.name);
    return { document, warnings: [] };
  };
  system.getDocument = () => fixture;
  let resolveFirst;
  let fetchCalls = 0;
  const previousFetch = globalThis.fetch;
  globalThis.fetch = () => {
    fetchCalls += 1;
    return new Promise((resolve) => { resolveFirst = resolve; });
  };
  try {
    system.prepareModel('first', { annotations: '/first.annotations.json' });
    assert.equal(fetchCalls, 1, 'annotation fetch should begin during prepareModel');
    system.prepareModel('second', { annotations: { ...fixture, layer: { name: 'Second' } } });
    await system.activateModel('second', new THREE.Group(), {});
    resolveFirst({ ok: true, json: async () => ({ ...fixture, layer: { name: 'First' } }) });
    await new Promise((resolve) => setTimeout(resolve, 0));
    await system.activateModel('first', new THREE.Group(), {});
    assert.deepEqual(loadedLayers, ['Second']);
  } finally {
    globalThis.fetch = previousFetch;
  }
});

test('failed stale per-model fetches settle without surfacing an annotation error', async () => {
  const system = Object.create(AnnotationDesktopLayer.prototype);
  system._loadGeneration = 0;
  system._loadController = null;
  system.adapter = null;
  system.overlayEl = null;
  const previousFetch = globalThis.fetch;
  let rejectFirst;
  globalThis.fetch = () => new Promise((_resolve, reject) => { rejectFirst = reject; });
  try {
    system.prepareModel('first', { annotations: '/slow.annotations.json' });
    const stalePending = system._pendingSource;
    system.prepareModel('second', { annotations: fixture });
    rejectFirst(new Error('late stale failure'));
    assert.deepEqual(await stalePending, { generation: 1, source: null, stale: true });
  } finally {
    globalThis.fetch = previousFetch;
  }
});

test('adapter snapshots wait for the matching model generation', () => {
  const system = Object.create(AnnotationDesktopLayer.prototype);
  const received = [];
  system._modelReady = false;
  system.applyState = (snapshot) => received.push(['snapshot', snapshot]);
  system.applyUpdate = (operation) => received.push(['operation', operation]);
  system.onServerError = (error) => received.push(['error', error]);
  system.handleAdapterEvent({ type: 'snapshot', snapshot: { annotations: [1] } });
  assert.deepEqual(received, []);
  system._modelReady = true;
  system.handleAdapterEvent({ type: 'snapshot', snapshot: { annotations: [2] } });
  system.handleAdapterEvent({ type: 'operation', data: { action: 'delete', annotation_id: 2 } });
  assert.deepEqual(received.map(([type]) => type), ['snapshot', 'operation']);
});

test('optimistic create errors roll back the matching temporary annotation', () => {
  const system = Object.create(AnnotationDesktopLayer.prototype);
  system.pendingCreates = new Map([['client-a', -1]]);
  const removed = [];
  system.removeAnnotationLocal = (id) => removed.push(id);
  system.renumberMarkers = () => {};
  system.showToast = () => {};
  system.emit = () => {};
  system.onServerError({ client_id: 'client-a', message: 'Denied' });
  assert.deepEqual(removed, [-1]);
  assert.equal(system.pendingCreates.has('client-a'), false);
});

test('optimistic edit errors restore the last committed annotation', () => {
  const system = Object.create(AnnotationDesktopLayer.prototype);
  const committed = { id: 1, title: 'Committed', notes: '', position: { x: 0, y: 0, z: 0 } };
  const restored = [];
  system.pendingCreates = new Map();
  system.pendingOperations = new Map([['edit-a', { annotation: committed }]]);
  system.upsertAnnotation = (annotation) => restored.push(annotation);
  system.showToast = () => {};
  system.emit = () => {};
  system.onServerError({ client_id: 'edit-a', action: 'edit', message: 'Denied' });
  assert.deepEqual(restored, [committed]);
  assert.equal(system.pendingOperations.has('edit-a'), false);
});

test('public collapsed updates use the existing collapse protocol action', () => {
  const system = Object.create(AnnotationDesktopLayer.prototype);
  system.readOnly = false;
  system.annotations = new Map([[1, { id: 1, title: 'Bow', notes: '', collapsed: false, position: { x: 0, y: 0, z: 0 } }]]);
  system.pendingOperations = new Map();
  system.adapter = { send: (payload) => { system.sent = payload; return true; } };
  system.send = null;
  system.upsertAnnotation = (annotation) => system.annotations.set(annotation.id, annotation);
  system.emit = () => {};
  const updated = system.update(1, { collapsed: true });
  assert.equal(updated.collapsed, true);
  assert.equal(system.sent.action, 'collapse');
  assert.equal(system.sent.collapsed, true);
});

test('public export preserves version 1 scale-bar index references', () => {
  const system = Object.create(AnnotationDesktopLayer.prototype);
  const normalized = normalizeAnnotationDocument(fixture).document;
  system.layer = normalized.layer;
  system.sortedAnnotations = () => normalized.annotations;
  system.scaleBars = new Map(normalized.scale_bars.map((data) => [data.id, { data }]));
  assert.deepEqual(system.getDocument().scale_bars, [{ a: 0, b: 1 }]);
});

test('model-local positions survive non-identity model transforms', () => {
  const system = Object.create(AnnotationDesktopLayer.prototype);
  const model = new THREE.Group();
  model.position.set(8, -3, 4);
  model.rotation.set(0.2, -0.5, 0.1);
  model.scale.setScalar(2.5);
  model.updateMatrixWorld(true);
  system._activeModel = model;
  const local = { x: 1.25, y: -0.75, z: 2.5 };
  const world = system.modelPositionToWorld(local);
  const recovered = system.worldPositionToModel(world);
  assert.ok(Math.abs(recovered.x - local.x) < 1e-9);
  assert.ok(Math.abs(recovered.y - local.y) < 1e-9);
  assert.ok(Math.abs(recovered.z - local.z) < 1e-9);
});

test('world-space static documents convert to model-local positions after model activation', () => {
  const system = Object.create(AnnotationDesktopLayer.prototype);
  const model = new THREE.Group();
  model.position.set(10, -4, 2);
  model.rotation.set(0, Math.PI / 2, 0);
  model.scale.setScalar(2);
  model.updateWorldMatrix(true, false);
  const local = new THREE.Vector3(3, 5, -7);
  const world = model.localToWorld(local.clone());
  const converted = system.convertDocumentToModelSpace({
    ...fixture,
    layer: { name: 'Legacy', coordinate_space: 'world' },
    annotations: [{ title: 'Legacy point', position: world }],
  }, model);
  assert.equal(converted.layer.coordinate_space, 'model');
  assert.ok(new THREE.Vector3(
    converted.annotations[0].position.x,
    converted.annotations[0].position.y,
    converted.annotations[0].position.z,
  ).distanceTo(local) < 1e-9);
});

test('stationary DOM display positions follow later model transforms', () => {
  const system = Object.create(AnnotationDesktopLayer.prototype);
  const model = new THREE.Group();
  const position = { x: 1, y: 2, z: -3 };
  system._activeModel = model;
  system.annotations = new Map([[1, { id: 1, position }]]);
  system.displayPositions = new Map([[1, { x: 1, y: 2, z: -3 }]]);
  system.lerping = new Set();
  system.dragState = null;

  model.position.set(6, -4, 2);
  model.rotation.set(0.1, 0.4, -0.2);
  model.scale.set(1.5, 2, 0.75);
  model.updateMatrixWorld(true);
  system.syncDisplayPositionsToModelTransform();

  const expected = new THREE.Vector3(position.x, position.y, position.z).applyMatrix4(model.matrixWorld);
  const actual = system.displayPositions.get(1);
  assert.ok(Math.abs(actual.x - expected.x) < 1e-9);
  assert.ok(Math.abs(actual.y - expected.y) < 1e-9);
  assert.ok(Math.abs(actual.z - expected.z) < 1e-9);
});

test('XR selected panels stay compact and open just above the point under a rotated model', () => {
  const annotation = { id: 1, title: 'Bow', notes: 'Panel', position: { x: 1, y: 0, z: 0 } };
  const camera = new THREE.PerspectiveCamera();
  camera.position.set(0, 0, 10);
  camera.rotation.set(-0.2, 0.7, 0.1);
  camera.updateMatrixWorld(true);
  const model = new THREE.Group();
  model.rotation.set(0.4, -0.6, 0.2);
  model.updateMatrixWorld(true);
  const system = {
    selection: [1],
    annotations: new Map([[1, annotation]]),
    getCamera: () => camera
  };
  const layer = new AnnotationXRLayer(system);
  model.add(layer.group);
  layer.panel = new THREE.Sprite(new THREE.SpriteMaterial());
  layer.panel.userData = { annotationId: 1, title: 'Bow', notes: 'Panel', offset: 0.45 };
  layer.updatePanel();
  model.updateMatrixWorld(true);
  const panelScale = layer.panel.getWorldScale(new THREE.Vector3());
  const panelWorld = layer.panel.getWorldPosition(new THREE.Vector3());
  const pointWorld = new THREE.Vector3(1, 0, 0).applyMatrix4(model.matrixWorld);
  const cameraUp = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion).normalize();
  assert.ok(panelScale.x <= 0.95 + 1e-9, 'panel should never become headset-filling');
  assert.ok(panelScale.x >= 0.36 - 1e-9, 'panel should remain readable nearby');
  assert.ok(panelWorld.clone().sub(pointWorld).dot(cameraUp) > 0.05, 'panel should open above its point');
});

test('XR marker and halo shaders use a shared comfort-facing world basis with stereo projection', () => {
  const layer = new AnnotationXRLayer({});
  const markerMaterial = layer.createMarkerMaterial(new THREE.Texture(), 1, 1);
  const haloMaterial = layer.createHaloMaterial();
  for (const material of [markerMaterial, haloMaterial]) {
    assert.match(material.vertexShader, /uniform vec3 billboardRight/);
    assert.match(material.vertexShader, /uniform vec3 billboardUp/);
    assert.match(material.vertexShader, /projectionMatrix \* viewMatrix/);
  }
});

test('XR comfort-facing labels ease toward a new headset direction without inheriting head roll', () => {
  const camera = new THREE.PerspectiveCamera();
  camera.updateMatrixWorld(true);
  const layer = new AnnotationXRLayer({ getCamera: () => camera });
  layer.updateFacing(1 / 60);
  const initialRight = layer._billboardRight.clone();

  camera.rotation.set(0, Math.PI / 2, 0.6);
  camera.updateMatrixWorld(true);
  layer.updateFacing(1 / 60);
  const firstStep = layer._billboardRight.clone();
  const targetRight = new THREE.Vector3(0, 0, -1);
  assert.ok(firstStep.distanceTo(initialRight) > 0.01, 'label should begin following the new view');
  assert.ok(firstStep.distanceTo(targetRight) > 0.2, 'label should not snap immediately');

  for (let index = 0; index < 120; index += 1) layer.updateFacing(1 / 60);
  assert.ok(layer._billboardRight.distanceTo(targetRight) < 0.002, 'label should settle toward the viewer');
  assert.ok(Math.abs(layer._billboardUp.y - 1) < 0.002, 'world-up locking should remove headset roll');
});

test('XR controller rays select a marker and trigger it again to close', () => {
  const annotation = { id: 7, title: 'Bow', notes: '', position: { x: 0, y: 0, z: -2 } };
  let pulseCount = 0;
  const system = {
    selection: [],
    annotations: new Map([[annotation.id, annotation]]),
    select(ids) {
      this.selection = [...ids];
      return this.selection;
    }
  };
  const layer = new AnnotationXRLayer(system);
  layer.group.visible = true;
  layer.markerIds = [annotation.id];
  layer.markerMesh = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.15, 8, 6),
    new THREE.MeshBasicMaterial(),
    1
  );
  layer.markerMesh.setMatrixAt(0, new THREE.Matrix4().makeTranslation(0, 0, -2));
  layer.group.add(layer.markerMesh);
  layer.group.updateMatrixWorld(true);
  const controller = new THREE.Object3D();
  controller.updateMatrixWorld(true);
  const event = {
    inputSource: {
      gamepad: {
        hapticActuators: [{ pulse: () => { pulseCount += 1; return Promise.resolve(); } }]
      }
    }
  };

  assert.equal(layer.selectFromController(controller, event), true);
  assert.deepEqual(system.selection, [annotation.id]);
  assert.equal(controller.userData.belowjsAnnotationTrigger, true);
  assert.equal(layer.selectFromController(controller, event), true);
  assert.deepEqual(system.selection, []);
  assert.equal(pulseCount, 2);
});

test('XR annotation triggers do not also commit the measurement orb', () => {
  let measurementPlacements = 0;
  const controller = new THREE.Object3D();
  controller.userData.belowjsAnnotationTrigger = true;
  const measurement = Object.create(MeasurementSystem.prototype);
  measurement._vrDeleteStates = new Map();
  measurement.unifiedMeasurementPoints = [];
  measurement.measurementAvailable = true;
  measurement.measurementSystemEnabled = true;
  measurement._placeVRMeasurementPoint = () => { measurementPlacements += 1; };

  measurement._handleVRTriggerUp({ target: controller });
  assert.equal(measurementPlacements, 0);
  assert.equal(controller.userData.belowjsAnnotationTrigger, false);
});

test('XR annotation rays fade in only while a marker is targeted', () => {
  const annotation = { id: 3, title: 'Stern', notes: '', position: { x: 0, y: 0, z: -2 } };
  const system = { selection: [], annotations: new Map([[annotation.id, annotation]]) };
  const layer = new AnnotationXRLayer(system);
  layer.group.visible = true;
  layer.markerIds = [annotation.id];
  layer.markerMesh = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.15, 8, 6),
    new THREE.MeshBasicMaterial(),
    1
  );
  layer.markerMesh.setMatrixAt(0, new THREE.Matrix4().makeTranslation(0, 0, -2));
  layer.group.add(layer.markerMesh);
  layer.group.updateMatrixWorld(true);
  const controller = new THREE.Object3D();
  controller.updateMatrixWorld(true);
  const ray = layer.createControllerRay();
  layer.controllers = [{ controller, ray, connected: true, rayFade: 0 }];

  layer.updateControllerInteractions();
  assert.equal(ray.visible, true);
  assert.ok(ray.material.opacity > 0);
  assert.equal(ray.material.color.getHex(), 0xf4fbff);
  assert.equal(ray.userData.reticle.visible, true);
  assert.ok(ray.userData.reticle.material.opacity > ray.material.opacity);
  assert.deepEqual([...layer.hoveredIds], [annotation.id]);

  controller.rotation.y = Math.PI;
  controller.updateMatrixWorld(true);
  for (let index = 0; index < 24; index += 1) layer.updateControllerInteractions();
  assert.equal(ray.visible, false);
  assert.deepEqual([...layer.hoveredIds], []);
});

test('XR annotation targeting gives one light haptic tick per acquired marker', () => {
  const annotation = { id: 4, title: 'Frame', notes: '', position: { x: 0, y: 0, z: -2 } };
  let pulseCount = 0;
  const layer = new AnnotationXRLayer({ selection: [], annotations: new Map([[annotation.id, annotation]]) });
  layer.group.visible = true;
  layer.markerIds = [annotation.id];
  layer.markerHitMesh = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.2, 8, 6),
    new THREE.MeshBasicMaterial(),
    1
  );
  layer.markerHitMesh.setMatrixAt(0, new THREE.Matrix4().makeTranslation(0, 0, -2));
  layer.group.add(layer.markerHitMesh);
  layer.group.updateMatrixWorld(true);
  const controller = new THREE.Object3D();
  controller.updateMatrixWorld(true);
  const ray = layer.createControllerRay();
  layer.controllers = [{
    controller,
    ray,
    connected: true,
    hoveredId: undefined,
    rayFade: 0,
    inputSource: {
      gamepad: {
        hapticActuators: [{ pulse: () => { pulseCount += 1; return Promise.resolve(); } }]
      }
    }
  }];

  layer.updateControllerInteractions();
  layer.updateControllerInteractions();
  assert.equal(pulseCount, 1, 'holding on one marker should not buzz repeatedly');

  controller.rotation.y = Math.PI;
  controller.updateMatrixWorld(true);
  layer.updateControllerInteractions();
  controller.rotation.y = 0;
  controller.updateMatrixWorld(true);
  layer.updateControllerInteractions();
  assert.equal(pulseCount, 2, 'reacquiring the marker should give another light tick');
});

test('XR marker size stays readable under non-identity model scale', () => {
  const annotation = { id: 1, title: 'Keel', notes: '', position: { x: 0, y: 0, z: 0 } };
  const camera = new THREE.PerspectiveCamera();
  camera.position.set(0, 0, 10);
  camera.updateMatrixWorld(true);
  const model = new THREE.Group();
  model.scale.set(3, 2, 4);
  const system = {
    selection: [],
    annotations: new Map([[annotation.id, annotation]]),
    getCamera: () => camera
  };
  const layer = new AnnotationXRLayer(system);
  model.add(layer.group);
  model.updateMatrixWorld(true);
  layer.markerMesh = new THREE.InstancedMesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshBasicMaterial(),
    1
  );
  layer.markerHaloMesh = new THREE.InstancedMesh(
    new THREE.RingGeometry(1.08, 1.32, 16),
    new THREE.MeshBasicMaterial(),
    1
  );
  layer.group.add(layer.markerMesh, layer.markerHaloMesh);
  layer.updateMarkerTransforms([annotation]);

  const matrix = new THREE.Matrix4();
  const localScale = new THREE.Vector3();
  layer.markerMesh.getMatrixAt(0, matrix);
  matrix.decompose(new THREE.Vector3(), new THREE.Quaternion(), localScale);
  assert.ok(Math.abs(localScale.x * 3 - 0.12) < 1e-8);
  assert.ok(Math.abs(localScale.y * 2 - 0.12) < 1e-8);
  assert.ok(Math.abs(localScale.z * 4 - 0.12) < 1e-8);
});

test('XR marker transforms use the live headset camera and lift targets off the model surface', () => {
  const annotation = { id: 1, title: 'Frame', notes: '', position: { x: 0, y: 0, z: 0 } };
  const baseCamera = new THREE.PerspectiveCamera();
  baseCamera.position.set(0, 0, -10);
  baseCamera.updateMatrixWorld(true);
  const headsetCamera = new THREE.PerspectiveCamera();
  headsetCamera.position.set(0, 0, 10);
  headsetCamera.rotation.set(0.15, -0.25, 0.05);
  headsetCamera.updateMatrixWorld(true);
  const system = {
    selection: [],
    annotations: new Map([[annotation.id, annotation]]),
    getCamera: () => baseCamera,
    getRenderer: () => ({
      xr: { isPresenting: true, getCamera: () => headsetCamera }
    })
  };
  const layer = new AnnotationXRLayer(system);
  const model = new THREE.Group();
  model.add(layer.group);
  layer.markerMesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial(), 1);
  layer.markerHaloMesh = new THREE.InstancedMesh(new THREE.RingGeometry(1, 1.2, 12), new THREE.MeshBasicMaterial(), 1);
  layer.markerHitMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 8, 6), new THREE.MeshBasicMaterial(), 1);
  layer.group.add(layer.markerMesh, layer.markerHaloMesh, layer.markerHitMesh);
  model.updateMatrixWorld(true);

  layer.updateMarkerTransforms([annotation]);

  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  layer.markerMesh.getMatrixAt(0, matrix);
  matrix.decompose(position, quaternion, new THREE.Vector3());
  assert.ok(position.z > 0.05, 'marker should lift toward the live headset camera');
  assert.ok(1 - Math.abs(quaternion.dot(new THREE.Quaternion())) < 1e-9, 'shader owns per-eye billboard rotation');
  layer.markerHitMesh.getMatrixAt(0, matrix);
  matrix.decompose(position, quaternion, new THREE.Vector3());
  assert.ok(position.z > 0.05, 'controller target should follow the lifted marker');
});

test('XR marker sync refreshes transforms before controller hit-testing', () => {
  const system = {
    annotationsVisible: true,
    annotations: new Map(),
    sortedAnnotations: () => [],
    getRenderer: () => ({ xr: { isPresenting: true } }),
    getModelRoot: () => model
  };
  const model = new THREE.Group();
  const layer = new AnnotationXRLayer(system);
  layer.attach = () => { layer.group.parent = model; };
  layer.group.parent = model;
  const calls = [];
  layer.updateMarkerTransforms = () => calls.push('transforms');
  layer.updateControllerInteractions = () => calls.push('interactions');
  layer.updatePanel = () => calls.push('panel');
  layer.sync();
  assert.deepEqual(calls, ['transforms', 'interactions', 'panel']);
});

test('XR controller interaction remains active when it bound after the controller connected', () => {
  const annotation = { id: 9, title: 'Late controller', notes: '', position: { x: 0, y: 0, z: -2 } };
  const layer = new AnnotationXRLayer({ selection: [], annotations: new Map([[annotation.id, annotation]]) });
  layer.group.visible = true;
  layer.markerIds = [annotation.id];
  layer.markerHitMesh = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.22, 8, 6),
    new THREE.MeshBasicMaterial(),
    1
  );
  layer.markerHitMesh.setMatrixAt(0, new THREE.Matrix4().makeTranslation(0, 0, -2));
  layer.group.add(layer.markerHitMesh);
  layer.group.updateMatrixWorld(true);
  const controller = new THREE.Object3D();
  controller.visible = true;
  controller.updateMatrixWorld(true);
  const ray = layer.createControllerRay();
  layer.controllers = [{ controller, ray, connected: false, rayFade: 0 }];

  layer.updateControllerInteractions();

  assert.equal(ray.visible, true);
  assert.deepEqual([...layer.hoveredIds], [annotation.id]);
});
