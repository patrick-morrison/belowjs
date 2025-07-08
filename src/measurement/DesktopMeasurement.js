import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { EventSystem } from '../utils/EventSystem.js';

/**
 * DesktopMeasurement - handle desktop-only measurement logic.
 * This module does not share state with the VR measurement system.
 */
export class DesktopMeasurement extends EventSystem {
  constructor(scene, camera, renderer, options = {}) {
    super();
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.options = Object.assign({
      sphereSize: 0.04,
      maxPoints: 2,
      color: 0xffffff,
    }, options);

    this.points = [];
    this.line = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.enabled = false;
  }

  /** Enable desktop measurement mode */
  enable() {
    this.enabled = true;
  }

  /** Disable desktop measurement mode and clear points */
  disable() {
    this.enabled = false;
    this.clear();
  }

  /** Handle mouse click event */
  handleClick(event) {
    if (!this.enabled) return;
    // compute mouse position
    this.mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    const hit = intersects.find(i => !this.isMeasurementObject(i.object));
    if (!hit) return;

    this.addPoint(hit.point.clone());
  }

  /** Add a measurement point */
  addPoint(position) {
    const geometry = new THREE.SphereGeometry(this.options.sphereSize, 12, 8);
    const material = new THREE.MeshBasicMaterial({ color: this.options.color });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.copy(position);
    sphere.userData.isMeasurement = true;
    this.scene.add(sphere);
    this.points.push(sphere);

    if (this.points.length > this.options.maxPoints) {
      const old = this.points.shift();
      this.scene.remove(old);
    }

    this.updateLine();

    if (this.points.length === 2) {
      const dist = this.points[0].position.distanceTo(this.points[1].position);
      this.emit('measured', dist);
    }
  }

  /** Update measurement line */
  updateLine() {
    if (this.line) {
      this.scene.remove(this.line);
      this.line.geometry.dispose();
    }

    if (this.points.length === 2) {
      const geom = new LineGeometry();
      const positions = [
        this.points[0].position.x, this.points[0].position.y, this.points[0].position.z,
        this.points[1].position.x, this.points[1].position.y, this.points[1].position.z
      ];
      geom.setPositions(positions);
      const mat = new LineMaterial({ color: this.options.color, linewidth: 3, depthTest: false });
      mat.resolution.set(this.renderer.domElement.width, this.renderer.domElement.height);
      this.line = new Line2(geom, mat);
      this.line.computeLineDistances();
      this.line.userData.isMeasurement = true;
      this.scene.add(this.line);
    } else {
      this.line = null;
    }
  }

  /** Clear all measurement visuals */
  clear() {
    this.points.forEach(p => this.scene.remove(p));
    this.points = [];
    if (this.line) {
      this.scene.remove(this.line);
      this.line.geometry.dispose();
      this.line = null;
    }
  }

  isMeasurementObject(obj) {
    return obj.userData.isMeasurement === true;
  }
}
