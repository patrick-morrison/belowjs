/**
 * ARHandTracking - Complete hand tracking, gestures, and inertia system
 * Based on the todolist XR viewer - all in one place for simplicity
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

    // Constants - industry standard: NO inertia for placement, smooth for rotation/scale
    this.POSITION_DAMPING = 100;  // Very high - effectively no inertia (Apple ARKit style)
    this.ROTATION_DAMPING = 8;    // Medium damping for smooth rotation
    this.SCALE_DAMPING = 8;       // Medium damping for smooth scaling
    this.MAX_ROT_VELOCITY = Math.PI * 1.2;
    this.MAX_SCALE_VELOCITY = 0.8;
    this.MIN_SCALE = 0.01;
    this.MAX_SCALE = 1.0;
    this.VELOCITY_DEAD_ZONE = 0.001;  // Threshold to snap to zero

    // Temp vectors
    this.tempVec1 = new THREE.Vector3();
    this.tempVec2 = new THREE.Vector3();

    // Callbacks
    this.onGestureStart = null;
    this.onGestureEnd = null;
  }

  init(scene) {
    // Hand 1
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
      this.styleHandModel(handModel1, 0xff3333, 0.6); // Red, 60% opacity
    });

    // Hand 2
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
      this.styleHandModel(handModel2, 0x33ff33, 0.6); // Green, 60% opacity
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

  update(deltaSeconds, modelGroup) {
    if (!modelGroup) return;

    // Handle gestures
    this.handleGestures(deltaSeconds, modelGroup);

    // Apply inertia when not actively gesturing
    if (this.inertiaActive && !this.dragging && !this.scaling && !this.rotating) {
      this.applyInertia(deltaSeconds, modelGroup);
    }
  }

  handleGestures(deltaSeconds, modelGroup) {
    if (!this.hand1 || !this.hand2) {
      console.log('❌ No hands');
      return;
    }

    const tip1 = this.hand1.joints?.['index-finger-tip'];
    const tip2 = this.hand2.joints?.['index-finger-tip'];
    if (!tip1 || !tip2) {
      console.log('❌ No finger tips - hand1 joints:', Object.keys(this.hand1.joints || {}).length, 'hand2 joints:', Object.keys(this.hand2.joints || {}).length);
      return;
    }

    const now = performance.now();
    const hand1Ready = this.hand1.userData.pinch && (now - this.pinchIntent.hand1Start) >= this.pinchIntent.delay;
    const hand2Ready = this.hand2.userData.pinch && (now - this.pinchIntent.hand2Start) >= this.pinchIntent.delay;

    console.log('✋ Hands - H1:', this.hand1.userData.pinch ? '🤏' : '✋', 'H2:', this.hand2.userData.pinch ? '🤏' : '✋', 'Ready:', hand1Ready, hand2Ready);

    // Single hand drag
    if ((hand1Ready && !this.hand2.userData.pinch) || (hand2Ready && !this.hand1.userData.pinch)) {
      const activeHand = hand1Ready ? this.hand1 : this.hand2;
      const indexTip = activeHand.joints['index-finger-tip'];

      if (!this.dragging) {
        this.dragging = true;
        this.scaling = false;
        this.rotating = false;
        indexTip.getWorldPosition(this.dragStartPos);
        if (this.onGestureStart) this.onGestureStart('drag');
      } else {
        indexTip.getWorldPosition(this.tempVec1);
        const delta = this.tempVec1.clone().sub(this.dragStartPos);
        modelGroup.position.add(delta);

        // Track velocity for minimal inertia (high damping will kill it almost instantly)
        if (deltaSeconds > 0) {
          const velocity = delta.clone().divideScalar(deltaSeconds);
          this.posVelocity.copy(velocity);
        }

        this.dragStartPos.copy(this.tempVec1);
      }
    }
    // Two hand scale + rotate
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
        // Scale - logarithmic scaling for symmetric up/down control
        const currentDistance = this.tempVec1.distanceTo(this.tempVec2);
        const distanceRatio = currentDistance / this.scaleStartDistance;

        // Use log scaling: same hand movement doubles or halves scale at any level
        const currentLogScale = Math.log(modelGroup.scale.x);
        const logScaleDelta = Math.log(distanceRatio);
        const newLogScale = currentLogScale + logScaleDelta;

        // Convert back to linear scale with clamping
        const newScale = Math.max(this.MIN_SCALE, Math.min(this.MAX_SCALE, Math.exp(newLogScale)));
        modelGroup.scale.setScalar(newScale);

        // Update inertia in log space for consistent feel
        if (deltaSeconds > 0) {
          const velocityDelta = logScaleDelta * newScale / deltaSeconds;
          this.scaleVelocity = Math.max(-this.MAX_SCALE_VELOCITY, Math.min(this.MAX_SCALE_VELOCITY, velocityDelta));
        }

        this.scaleStartDistance = currentDistance;

        // Rotate
        const dx = this.tempVec2.x - this.tempVec1.x;
        const dz = this.tempVec2.z - this.tempVec1.z;
        const currentAngle = Math.atan2(dz, dx);

        let angleDelta = currentAngle - this.rotateStartAngle;
        if (angleDelta > Math.PI) angleDelta -= 2 * Math.PI;
        if (angleDelta < -Math.PI) angleDelta += 2 * Math.PI;

        modelGroup.rotation.y -= angleDelta;

        // Update inertia
        if (deltaSeconds > 0) {
          this.rotVelocity = -angleDelta / deltaSeconds;
          this.rotVelocity = Math.max(-this.MAX_ROT_VELOCITY, Math.min(this.MAX_ROT_VELOCITY, this.rotVelocity));
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

        // Apply dead zone - prevents drift from stationary release
        if (this.posVelocity.lengthSq() < this.VELOCITY_DEAD_ZONE) this.posVelocity.set(0, 0, 0);
        if (Math.abs(this.rotVelocity) < this.VELOCITY_DEAD_ZONE) this.rotVelocity = 0;
        if (Math.abs(this.scaleVelocity) < this.VELOCITY_DEAD_ZONE) this.scaleVelocity = 0;

        // Position inertia dies almost instantly (POSITION_DAMPING=100), rotation/scale are smooth
        if (this.posVelocity.lengthSq() > 0 || Math.abs(this.rotVelocity) > 0 || Math.abs(this.scaleVelocity) > 0) {
          this.inertiaActive = true;
        }
      }
    } else if (!this.hand1.userData.pinch || !this.hand2.userData.pinch) {
      this.scaling = false;
      this.rotating = false;
    }
  }

  applyInertia(deltaSeconds, modelGroup) {
    // Separate damping for each transformation type
    const posDecay = Math.exp(-this.POSITION_DAMPING * deltaSeconds);
    const rotDecay = Math.exp(-this.ROTATION_DAMPING * deltaSeconds);
    const scaleDecay = Math.exp(-this.SCALE_DAMPING * deltaSeconds);

    this.posVelocity.multiplyScalar(posDecay);
    this.rotVelocity *= rotDecay;
    this.scaleVelocity *= scaleDecay;

    modelGroup.position.addScaledVector(this.posVelocity, deltaSeconds);
    modelGroup.rotation.y += this.rotVelocity * deltaSeconds;

    const newScale = Math.max(this.MIN_SCALE, Math.min(this.MAX_SCALE, modelGroup.scale.x + this.scaleVelocity * deltaSeconds));
    modelGroup.scale.setScalar(newScale);

    // Dead zone - snap very small velocities to zero for precise placement
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
