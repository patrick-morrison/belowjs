import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { EventSystem } from '../utils/EventSystem.js';

/**
 * VRMeasurement - handle VR-only measurement logic.
 * This module maintains its own state separate from the desktop measurement.
 */
export class VRMeasurement extends EventSystem {
  constructor(scene, renderer, options = {}) {
    super();
    this.scene = scene;
    this.renderer = renderer;

    this.options = Object.assign({
      sphereSize: 0.02,
      maxPoints: 2,
      color: 0xffffff,
    }, options);

    this.points = [];
    this.line = null;
    this.ghosts = { left: null, right: null };
    this.enabled = true;

    this.initGhosts();
  }

  /** Set up ghost spheres for controllers */
  initGhosts() {
    const geometry = new THREE.SphereGeometry(this.options.sphereSize, 8, 6);
    const material = new THREE.MeshBasicMaterial({ color: this.options.color, transparent: true, opacity: 0.2 });
    this.ghosts.left = new THREE.Mesh(geometry, material);
    this.ghosts.right = new THREE.Mesh(geometry, material);
    this.ghosts.left.visible = false;
    this.ghosts.right.visible = false;
    this.scene.add(this.ghosts.left);
    this.scene.add(this.ghosts.right);
  }

  /** Update ghost positions from controllers */
  updateGhosts(controller1, controller2) {
    if (!this.enabled) {
      this.ghosts.left.visible = false;
      this.ghosts.right.visible = false;
      return;
    }
    if (controller1) {
      controller1.getWorldPosition(this.ghosts.left.position);
      this.ghosts.left.visible = true;
    }
    if (controller2) {
      controller2.getWorldPosition(this.ghosts.right.position);
      this.ghosts.right.visible = true;
    }
  }

  /** Handle trigger release to place point */
  placeFromController(hand) {
    const ghost = this.ghosts[hand];
    if (!ghost || !ghost.visible) return;
    this.addPoint(ghost.position.clone());
  }

  /** Add a point */
  addPoint(position) {
    const geometry = new THREE.SphereGeometry(this.options.sphereSize, 8, 6);
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

  /** Update the line between points */
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

  /** Clear measurement visuals */
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
