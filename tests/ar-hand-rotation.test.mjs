import assert from 'node:assert/strict';
import test from 'node:test';
import * as THREE from 'three';

import { ARHandTracking } from '../src/ar/core/ARHandTracking.js';

test('world-y hand rotation keeps its direction across the XYZ Euler branch', () => {
  const tracking = new ARHandTracking({});
  const model = new THREE.Group();
  const up = new THREE.Vector3(0, 1, 0);
  const localForward = new THREE.Vector3(1, 0, 0);
  const initialYaw = THREE.MathUtils.degToRad(120);
  const delta = THREE.MathUtils.degToRad(10);

  model.quaternion.setFromAxisAngle(up, initialYaw);
  const before = localForward.clone().applyQuaternion(model.quaternion);
  const expected = before.clone().applyAxisAngle(up, delta);

  // At 120 degrees the XYZ Euler representation has x/z near PI. Adding to
  // rotation.y here would turn the physical model in the opposite direction.
  assert.ok(Math.abs(Math.abs(model.rotation.x) - Math.PI) < 1e-9);
  assert.ok(Math.abs(Math.abs(model.rotation.z) - Math.PI) < 1e-9);

  tracking.applyWorldYaw(model, delta);
  const actual = localForward.clone().applyQuaternion(model.quaternion);
  assert.ok(actual.distanceTo(expected) < 1e-9);
});

test('world-y hand rotation remains stable over a complete revolution', () => {
  const tracking = new ARHandTracking({});
  const model = new THREE.Group();
  for (let i = 0; i < 72; i++) tracking.applyWorldYaw(model, Math.PI / 36);
  assert.ok(model.quaternion.angleTo(new THREE.Quaternion()) < 1e-7);
});

test('local AR hands retain translucent depth shading', () => {
  const tracking = new ARHandTracking({});
  const handModel = new THREE.Group();
  const originalMaterial = new THREE.MeshStandardMaterial();
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(), originalMaterial);
  handModel.add(mesh);

  tracking.styleHandModel(handModel, 0x88ccff, 0.25);

  assert.equal(mesh.material.isMeshStandardMaterial, true);
  assert.equal(mesh.material.side, THREE.FrontSide);
  assert.equal(mesh.material.transparent, true);
  assert.equal(mesh.material.opacity, 0.25);
  assert.equal(mesh.material.depthWrite, true);
  assert.equal(mesh.material.roughness, 0.8);
  assert.equal(mesh.material.metalness, 0.2);
});

test('an XR slot rebuilds its retained mesh when handedness changes', () => {
  const tracking = new ARHandTracking({});
  const handModel = new THREE.Group();
  const retainedMesh = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial()
  );
  handModel.add(retainedMesh);
  handModel.motionController = {};
  handModel.xrInputSource = { handedness: 'left' };
  handModel.userData.loadedHandedness = 'left';

  tracking.prepareHandModelForHandedness(handModel, 'right');

  assert.equal(handModel.children.length, 0);
  assert.equal(handModel.motionController, null);
  assert.equal(handModel.xrInputSource, null);
  assert.equal(handModel.userData.loadedHandedness, null);
  assert.equal(handModel.userData.expectedHandedness, 'right');
});

test('an XR slot keeps its mesh when the same hand reconnects', () => {
  const tracking = new ARHandTracking({});
  const handModel = new THREE.Group();
  const retainedMesh = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial()
  );
  handModel.add(retainedMesh);
  handModel.motionController = {};
  handModel.xrInputSource = { handedness: 'left' };
  handModel.userData.loadedHandedness = 'left';

  tracking.prepareHandModelForHandedness(handModel, 'left');

  assert.equal(handModel.children.length, 1);
  assert.notEqual(handModel.motionController, null);
  assert.equal(handModel.userData.expectedHandedness, 'left');
});

test('a stale asynchronous hand load cannot attach after a slot swap', () => {
  const tracking = new ARHandTracking({});
  const handModel = new THREE.Group();
  handModel.userData.expectedHandedness = 'right';
  const staleLeftObject = new THREE.Group();
  const staleMesh = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial()
  );
  staleMesh.name = 'l_handMeshNode';
  staleLeftObject.add(staleMesh);
  handModel.add(staleLeftObject);

  tracking.onHandModelLoaded(staleLeftObject);

  assert.equal(handModel.children.length, 0);
  assert.equal(handModel.userData.loadedHandedness, undefined);
});
