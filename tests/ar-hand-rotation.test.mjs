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
