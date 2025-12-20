/**
 * ARHandTracking - Hand tracking, gestures, and inertia
 */

import * as THREE from 'three';
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory.js';

export class ARHandTracking {
  constructor(renderer) {
    this.renderer = renderer;
    this.handModelFactory = new XRHandModelFactory();

    // Hands
    this.hand1 = null;
    this.hand2 = null;

    // Gesture state
    this.dragging = false;
    this.scaling = false;
    this.rotating = false;
    this.dragStartPos = new THREE.Vector3();
    this.scaleStartDistance = 0;
    this.rotateStartAngle = 0;

    // Pinch intent delay
    this.pinchIntent = {
      hand1Start: 0,
      hand2Start: 0,
      delay: 100
    };

    // Inertia
    this.inertiaActive = false;
    this.posVelocity = new THREE.Vector3();
    this.rotVelocity = 0;
    this.scaleVelocity = 0;

    // Damping: high position damping (100) = no inertia, medium rotation/scale (8) = smooth
    this.POSITION_DAMPING = 100;
    this.ROTATION_DAMPING = 8;
    this.SCALE_DAMPING = 8;
    this.MAX_ROT_VELOCITY = Math.PI;
    this.MAX_SCALE_VELOCITY = 0.5;
    this.MIN_SCALE = 0.01;
    this.MAX_SCALE = 1.0;
    this.VELOCITY_DEAD_ZONE = 0.001;

    // Distance-based translation gain (amplify hand movement for far objects)
    this.DISTANCE_GAIN_THRESHOLD = 5.0;
    this.MAX_DISTANCE_GAIN = 3.0;
    this.MAX_DELTA_PER_FRAME = 0.5;

    this.VELOCITY_SMOOTHING = 0.3;

    this.tempVec1 = new THREE.Vector3();
    this.tempVec2 = new THREE.Vector3();

    this.onGestureStart = null;
    this.onGestureEnd = null;
  }

  init(scene) {
    this.hand1 = this.renderer.xr.getHand(0);
    this.hand1.userData.pinch = false;
    this.hand1.addEventListener('pinchstart', () => {
      this.hand1.userData.pinch = true;
      this.pinchIntent.hand1Start = performance.now();
    });
    this.hand1.addEventListener('pinchend', () => {
      this.hand1.userData.pinch = false;
      this.onPinchEnd();
    });

    const handModel1 = this.handModelFactory.createHandModel(this.hand1, 'mesh');
    this.hand1.add(handModel1);
    scene.add(this.hand1);

    handModel1.addEventListener('connected', () => {
      this.styleHandModel(handModel1, 0xffffff, 0.5);
    });

    this.hand2 = this.renderer.xr.getHand(1);
    this.hand2.userData.pinch = false;
    this.hand2.addEventListener('pinchstart', () => {
      this.hand2.userData.pinch = true;
      this.pinchIntent.hand2Start = performance.now();
    });
    this.hand2.addEventListener('pinchend', () => {
      this.hand2.userData.pinch = false;
      this.onPinchEnd();
    });

    const handModel2 = this.handModelFactory.createHandModel(this.hand2, 'mesh');
    this.hand2.add(handModel2);
    scene.add(this.hand2);

    handModel2.addEventListener('connected', () => {
      this.styleHandModel(handModel2, 0xffffff, 0.5);
    });
  }

  styleHandModel(handModel, color, opacity) {
    handModel.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: color,
          roughness: 0.8,
          metalness: 0.2,
          transparent: true,
          opacity: opacity
        });
      }
    });
  }

  update(deltaSeconds, modelGroup, camera) {
    if (!modelGroup) return;

    this.handleGestures(deltaSeconds, modelGroup, camera);

    if (this.inertiaActive && !this.dragging && !this.scaling && !this.rotating) {
      this.applyInertia(deltaSeconds, modelGroup);
    }
  }

  handleGestures(deltaSeconds, modelGroup, camera) {
    if (!this.hand1 || !this.hand2) return;

    const tip1 = this.hand1.joints?.['index-finger-tip'];
    const tip2 = this.hand2.joints?.['index-finger-tip'];

    if (!tip1 || !tip2) {
      if (this.dragging || this.scaling || this.rotating) {
        this.onPinchEnd();
      }
      return;
    }

    const now = performance.now();
    const hand1Ready = this.hand1.userData.pinch && (now - this.pinchIntent.hand1Start) >= this.pinchIntent.delay;
    const hand2Ready = this.hand2.userData.pinch && (now - this.pinchIntent.hand2Start) >= this.pinchIntent.delay;

    if ((hand1Ready && !this.hand2.userData.pinch) || (hand2Ready && !this.hand1.userData.pinch)) {
      const activeHand = hand1Ready ? this.hand1 : this.hand2;
      const indexTip = activeHand.joints['index-finger-tip'];

      if (!this.dragging) {
        // Clear velocities when transitioning from two-hand gesture
        if (this.scaling || this.rotating) {
          this.rotVelocity = 0;
          this.scaleVelocity = 0;
        }
        this.dragging = true;
        this.scaling = false;
        this.rotating = false;
        indexTip.getWorldPosition(this.dragStartPos);
        if (this.onGestureStart) this.onGestureStart('drag');
      } else {
        indexTip.getWorldPosition(this.tempVec1);
        let delta = this.tempVec1.clone().sub(this.dragStartPos);

        if (delta.length() > this.MAX_DELTA_PER_FRAME) {
          delta.normalize().multiplyScalar(this.MAX_DELTA_PER_FRAME);
        }

        // Distance-based translation gain
        if (camera) {
          const distance = camera.position.distanceTo(modelGroup.position);
          if (distance > this.DISTANCE_GAIN_THRESHOLD) {
            const gainFactor = Math.min(
              this.MAX_DISTANCE_GAIN,
              1.0 + (distance - this.DISTANCE_GAIN_THRESHOLD) / 7.5
            );
            delta.multiplyScalar(gainFactor);
          }
        }

        modelGroup.position.add(delta);

        if (deltaSeconds > 0) {
          const instantVelocity = delta.clone().divideScalar(deltaSeconds);
          this.posVelocity.lerp(instantVelocity, this.VELOCITY_SMOOTHING);
        }

        this.dragStartPos.copy(this.tempVec1);
      }
    }
    else if (hand1Ready && hand2Ready) {
      tip1.getWorldPosition(this.tempVec1);
      tip2.getWorldPosition(this.tempVec2);

      if (!this.scaling && !this.rotating) {
        this.dragging = false;
        this.scaling = true;
        this.rotating = true;

        this.scaleStartDistance = this.tempVec1.distanceTo(this.tempVec2);

        const dx = this.tempVec2.x - this.tempVec1.x;
        const dz = this.tempVec2.z - this.tempVec1.z;
        this.rotateStartAngle = Math.atan2(dz, dx);

        if (this.onGestureStart) this.onGestureStart('two-hand');
      } else {
        // Logarithmic scaling: same hand movement doubles or halves scale at any level
        const currentDistance = this.tempVec1.distanceTo(this.tempVec2);
        const distanceRatio = currentDistance / this.scaleStartDistance;

        const currentLogScale = Math.log(modelGroup.scale.x);
        const logScaleDelta = Math.log(distanceRatio);
        const newLogScale = currentLogScale + logScaleDelta;

        const newScale = Math.max(this.MIN_SCALE, Math.min(this.MAX_SCALE, Math.exp(newLogScale)));
        modelGroup.scale.setScalar(newScale);

        if (deltaSeconds > 0) {
          const instantLogVelocity = logScaleDelta / deltaSeconds;
          const targetVelocity = Math.max(-this.MAX_SCALE_VELOCITY, Math.min(this.MAX_SCALE_VELOCITY, instantLogVelocity));
          this.scaleVelocity = this.scaleVelocity * (1 - this.VELOCITY_SMOOTHING) + targetVelocity * this.VELOCITY_SMOOTHING;
        }

        this.scaleStartDistance = currentDistance;

        const dx = this.tempVec2.x - this.tempVec1.x;
        const dz = this.tempVec2.z - this.tempVec1.z;
        const currentAngle = Math.atan2(dz, dx);

        let angleDelta = currentAngle - this.rotateStartAngle;
        if (angleDelta > Math.PI) angleDelta -= 2 * Math.PI;
        if (angleDelta < -Math.PI) angleDelta += 2 * Math.PI;

        modelGroup.rotation.y -= angleDelta;

        if (deltaSeconds > 0) {
          const instantRotVelocity = -angleDelta / deltaSeconds;
          const targetVelocity = Math.max(-this.MAX_ROT_VELOCITY, Math.min(this.MAX_ROT_VELOCITY, instantRotVelocity));
          this.rotVelocity = this.rotVelocity * (1 - this.VELOCITY_SMOOTHING) + targetVelocity * this.VELOCITY_SMOOTHING;
        }

        this.rotateStartAngle = currentAngle;
      }
    }
  }

  onPinchEnd() {
    if (!this.hand1.userData.pinch && !this.hand2.userData.pinch) {
      const wasGesturing = this.dragging || this.scaling || this.rotating;

      this.dragging = false;
      this.scaling = false;
      this.rotating = false;

      if (wasGesturing) {
        if (this.onGestureEnd) this.onGestureEnd();

        // Dead zone prevents drift from stationary release
        if (this.posVelocity.lengthSq() < this.VELOCITY_DEAD_ZONE) this.posVelocity.set(0, 0, 0);
        if (Math.abs(this.rotVelocity) < this.VELOCITY_DEAD_ZONE) this.rotVelocity = 0;
        if (Math.abs(this.scaleVelocity) < this.VELOCITY_DEAD_ZONE) this.scaleVelocity = 0;

        if (this.posVelocity.lengthSq() > 0 || Math.abs(this.rotVelocity) > 0 || Math.abs(this.scaleVelocity) > 0) {
          this.inertiaActive = true;
        }
      }
    } else if (!this.hand1.userData.pinch || !this.hand2.userData.pinch) {
      this.scaling = false;
      this.rotating = false;
      this.rotVelocity = 0;
      this.scaleVelocity = 0;
    }
  }

  applyInertia(deltaSeconds, modelGroup) {
    const posDecay = Math.exp(-this.POSITION_DAMPING * deltaSeconds);
    const rotDecay = Math.exp(-this.ROTATION_DAMPING * deltaSeconds);
    const scaleDecay = Math.exp(-this.SCALE_DAMPING * deltaSeconds);

    this.posVelocity.multiplyScalar(posDecay);
    this.rotVelocity *= rotDecay;
    this.scaleVelocity *= scaleDecay;

    modelGroup.position.addScaledVector(this.posVelocity, deltaSeconds);
    modelGroup.rotation.y += this.rotVelocity * deltaSeconds;

    // Apply scale velocity in log-space
    const currentLogScale = Math.log(modelGroup.scale.x);
    const newLogScale = currentLogScale + this.scaleVelocity * deltaSeconds;
    const newScale = Math.max(this.MIN_SCALE, Math.min(this.MAX_SCALE, Math.exp(newLogScale)));
    modelGroup.scale.setScalar(newScale);

    if (this.posVelocity.lengthSq() < this.VELOCITY_DEAD_ZONE) this.posVelocity.set(0, 0, 0);
    if (Math.abs(this.rotVelocity) < this.VELOCITY_DEAD_ZONE) this.rotVelocity = 0;
    if (Math.abs(this.scaleVelocity) < this.VELOCITY_DEAD_ZONE) this.scaleVelocity = 0;

    if (this.posVelocity.lengthSq() === 0 && this.rotVelocity === 0 && this.scaleVelocity === 0) {
      this.inertiaActive = false;
    }
  }

  stop() {
    this.dragging = false;
    this.scaling = false;
    this.rotating = false;
    this.inertiaActive = false;
    this.posVelocity.set(0, 0, 0);
    this.rotVelocity = 0;
    this.scaleVelocity = 0;
  }

  dispose() {
    if (this.hand1) {
      this.hand1.clear();
    }
    if (this.hand2) {
      this.hand2.clear();
    }

    this.stop();
  }
}
