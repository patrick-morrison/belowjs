/**
 * VRTeleport - Physics-based teleportation system
 * 
 * Handles parabolic arc teleportation with virtual floor control
 * and physics-based trajectory calculations.
 */

import * as THREE from 'three';

export class VRTeleport {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.style = {
      neutralColor: 0xe2e8f0,
      accentColor: 0x94a3b8,
      floorColor: 0x64748b
    };
    

    this.teleportController = null;
    this.teleportMarker = null;
    this.teleportArch = null;
    this.teleportCurve = null;
    this.teleportFloor = null;        // Invisible floor mesh for height adjustment
    this.validTeleportPosition = null;
    this.currentTeleportTarget = null;
    this.teleportThreshold = 0.7;      // Joystick must be pushed this far to start aiming
    this.teleportReleaseThreshold = 0.3; // Below this threshold counts as "released"
    this.teleportPressed = false;      // Track if joystick is currently "pressed"
    this.teleportMaxMagnitude = 0;     // Track the maximum magnitude reached during this gesture
    this.teleportMaxDistance = 20;
    this.teleportFloorHeight = null;  // Will be set to user's current Y on first teleport aim
    this.teleportFloorMin = -10.0;    // Minimum floor height (10m below current)
    this.teleportFloorMax = 10.0;     // Maximum floor height (10m above current)
    

    this.lastSnapTurnTime = 0;
    

    this.onTeleport = null;
    this.onTeleportStart = null;
    this.onTeleportEnd = null;
  }
  
  init() {
    this.setupTeleportation();
  }
  

  setupTeleportation() {

    this.createTeleportArc();
  }
  

  createTeleportArc() {

    const points = [

      new THREE.Vector3(0, 0, 0),

      new THREE.Vector3(0, 1, -5)
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 20, 0.03, 8, false);
    

    const material = new THREE.MeshBasicMaterial({
      color: this.style.accentColor,
      transparent: true,
      opacity: 0.62,
      side: THREE.DoubleSide
    });
    
    this.teleportCurve = new THREE.Mesh(geometry, material);
    this.teleportCurve.visible = false;
    this.scene.add(this.teleportCurve);
    

    if (!this.teleportMarker) {
      const markerGeometry = new THREE.RingGeometry(0.34, 0.5, 28);
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: this.style.neutralColor,
        transparent: true,
        opacity: 0.78,
        side: THREE.DoubleSide
      });
      
      this.teleportMarker = new THREE.Mesh(markerGeometry, markerMaterial);
      this.teleportMarker.rotation.x = -Math.PI / 2; // Flat on floor
      this.teleportMarker.visible = false;
      this.scene.add(this.teleportMarker);
    }

    if (!this.teleportArch) {
      const markerInnerRadius = 0.34;
      const markerOuterRadius = 0.5;
      const archTubeRadius = (markerOuterRadius - markerInnerRadius) / 2;
      const archRadius = markerInnerRadius + archTubeRadius;
      const archPoints = [];
      for (let i = 0; i <= 24; i++) {
        const angle = (i / 24) * Math.PI;
        archPoints.push(new THREE.Vector3(
          Math.cos(angle) * archRadius,
          Math.sin(angle) * archRadius,
          0
        ));
      }

      const archCurve = new THREE.CatmullRomCurve3(archPoints);
      const archGeometry = new THREE.TubeGeometry(archCurve, 24, archTubeRadius, 8, false);
      const archMaterial = new THREE.MeshBasicMaterial({
        color: this.style.accentColor,
        transparent: true,
        opacity: 0.24,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      this.teleportArch = new THREE.Mesh(archGeometry, archMaterial);
      this.teleportArch.visible = false;
      this.scene.add(this.teleportArch);
    }
    

    if (!this.teleportFloor) {
      const floorGeometry = new THREE.PlaneGeometry(14, 14);
      const floorMaterial = new THREE.MeshBasicMaterial({
        color: this.style.floorColor,
        transparent: true,
        opacity: 0.06,
        side: THREE.DoubleSide,
        visible: false
      });
      
      this.teleportFloor = new THREE.Mesh(floorGeometry, floorMaterial);
      this.teleportFloor.rotation.x = -Math.PI / 2; // Lay flat like ground
      this.teleportFloor.visible = false;
      this.scene.add(this.teleportFloor);
    }
  }


  executeTeleport() {
    if (!this.validTeleportPosition) return;
    

    const targetPosition = this.validTeleportPosition.clone();
    

    this.camera.parent.position.copy(targetPosition);
    

    
    if (this.onTeleport) {
      this.onTeleport(targetPosition);
    }
    

    this.validTeleportPosition = null;
  }


  dashToPosition(targetPosition) {
    const startPosition = this.camera.parent.position.clone();
    const distance = startPosition.distanceTo(targetPosition);
    const dashDuration = Math.min(distance * 0.2, 1.0); // Max 1 second dash
    
    let dashTime = 0;
    const dashUpdate = () => {
      dashTime += 1/60; // Assume 60fps
      const progress = Math.min(dashTime / dashDuration, 1);
      

      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      this.camera.parent.position.lerpVectors(startPosition, targetPosition, easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(dashUpdate);
      }
    };
    
    dashUpdate();
  }
  

  processSnapTurn(inputX, snapTurnAngle = 30) {
    if (this.teleportPressed) return;
    if (!this.lastSnapTurnTime) this.lastSnapTurnTime = 0;
    const now = Date.now();
    

    if (now - this.lastSnapTurnTime < 500) return;
    
    if (Math.abs(inputX) > 0.7) { // Strong input required for snap turn
      const snapAngle = snapTurnAngle * Math.PI / 180; // Convert to radians
      const turnDirection = inputX > 0 ? 1 : -1;
      
      this.camera.parent.rotation.y -= turnDirection * snapAngle;
      this.camera.parent.rotation.y = this.normalizeAngle(this.camera.parent.rotation.y);
      
      this.lastSnapTurnTime = now;
    }
  }
  


  normalizeAngle(angle) {
    while (angle > Math.PI) angle -= 2 * Math.PI;
    while (angle < -Math.PI) angle += 2 * Math.PI;
    return angle;
  }
  

  processTeleportation(controller, y) {
    // Only the Y axis (forward push) triggers/controls the arc.
    // X axis is handled separately in VRLocomotion for snap turn.
    const forwardMag = Math.abs(y);

    if (forwardMag > this.teleportThreshold && !this.teleportPressed) {
      this.teleportPressed = true;
      this.teleportMaxMagnitude = forwardMag;
      this.teleportController = controller;

      const startY = this.camera.parent.position.y;
      this.teleportFloorHeight = startY;
      this.teleportFloorMin = startY - 10.0;
      this.teleportFloorMax = startY + 10.0;
      this.showTeleportArc();
      if (this.onTeleportStart) {
        this.onTeleportStart();
      }
    } else if (this.teleportPressed) {
      this.teleportMaxMagnitude = Math.max(this.teleportMaxMagnitude, forwardMag);

      this.updateTeleportArc();
      if (forwardMag < this.teleportReleaseThreshold) {
        this.calculateAndExecuteTeleport();
        this.hideTeleportArc();
        this.teleportPressed = false;
        this.teleportMaxMagnitude = 0;
        this.teleportController = null;
        if (this.onTeleportEnd) {
          this.onTeleportEnd();
        }
      }
    }
  }


  showTeleportArc() {
    if (!this.teleportCurve) {
      this.createTeleportArc();
    }
    this.teleportCurve.visible = true;
    if (this.teleportMarker) {
      this.teleportMarker.visible = false;
    }
    if (this.teleportArch) {
      this.teleportArch.visible = false;
    }

    this.updateTeleportFloor();
  }


  hideTeleportArc() {
    if (this.teleportCurve) {
      this.teleportCurve.visible = false;
    }
    if (this.teleportMarker) {
      this.teleportMarker.visible = false;
    }
    if (this.teleportArch) {
      this.teleportArch.visible = false;
    }
    if (this.teleportFloor) {
      this.teleportFloor.visible = false;
    }
    this.currentTeleportTarget = null;
  }


  updateTeleportArc() {
    if (!this.teleportController || !this.teleportCurve) return;
    

    const controllerQuat = new THREE.Quaternion();
    this.teleportController.getWorldQuaternion(controllerQuat);

    const forwardDir = new THREE.Vector3(0, 0, -1);
    forwardDir.applyQuaternion(controllerQuat);

    // Start arc from the ghost sphere tip (7cm forward from controller origin)
    const controllerPos = new THREE.Vector3();
    this.teleportController.getWorldPosition(controllerPos);
    controllerPos.addScaledVector(forwardDir, 0.07);

    // When pointing upward near-vertical, blend in camera forward to prevent arc doubling back.
    // Only apply when pointing UP — downward near-vertical should arc straight down naturally.
    const hMag = Math.sqrt(forwardDir.x * forwardDir.x + forwardDir.z * forwardDir.z);
    if (hMag < 0.12 && forwardDir.y > 0) {
      const camForward = new THREE.Vector3();
      this.camera.getWorldDirection(camForward);
      camForward.y = 0;
      if (camForward.lengthSq() > 0) {
        camForward.normalize();
        const blend = 0.12 - hMag;
        forwardDir.x += camForward.x * blend;
        forwardDir.z += camForward.z * blend;
        forwardDir.normalize();
      }
    }

    const maxDistance = this.teleportMaxDistance;
    

    const normalizedMagnitude = Math.min(this.teleportMaxMagnitude / this.teleportThreshold, 1.0);
    const distanceRatio = Math.pow(normalizedMagnitude, 0.78);
    const targetDistance = maxDistance * distanceRatio;
    

    const arcPoints = [];
    const steps = 32;
    const gravity = -9.8; // m/s² downward

    // Know the floor height up front so we can throw hard enough to reach it
    const virtualFloorY = this.teleportFloorHeight;
    const heightToFloor = virtualFloorY - controllerPos.y; // positive = floor is above us


    let baseVelocity = Math.sqrt(targetDistance * Math.abs(gravity) / 2); // Physics-based velocity


    // Only reduce velocity when pointing downward — upward throws are not penalised
    if (forwardDir.y < 0) {
      // Smoothly reduce velocity as controller pitches down — no threshold jump
      // At level (y=0): factor=1.0, at straight down (y=-1): factor=0.25
      baseVelocity *= Math.max(0.25, 1.0 - Math.abs(forwardDir.y) * 0.75);
    }


    const initialVelX = forwardDir.x * baseVelocity;
    const initialVelZ = forwardDir.z * baseVelocity;

    // Fixed loft offset: horizontal gets small upward component, upward angle adds on top.
    // No max() kink — range increases smoothly and continuously at all angles.
    let initialVelY = (forwardDir.y + 0.15) * baseVelocity;

    // When the floor is above us, throw harder so the arc naturally reaches that height
    if (heightToFloor > 0.5) {
      const minVelToReach = Math.sqrt(2 * Math.abs(gravity) * heightToFloor) * 1.2; // 20% margin for graceful arc
      initialVelY = Math.max(initialVelY, minVelToReach);
    }


    const timeToApex = initialVelY / Math.abs(gravity); // Time to reach peak
    // Scale minimum time with arc size — short arcs (pointing down) don't need 1.5s
    const minTime = 0.4 + (1.0 - Math.max(0, -forwardDir.y)) * 1.1; // 0.4s steep down → 1.5s level
    const maxTime = Math.max(timeToApex * 2.2, minTime);


    let intersectionPoint = null;
    let peakReached = false;
    let previousY = controllerPos.y;
    let peakTime = 0;

    // Allow more vertical travel when floor is above or below — dynamic clamp
    const arcBendLimit = Math.max(8.0, Math.abs(heightToFloor) * 1.5 + 2.0);
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * maxTime; // Time in seconds

      const point = new THREE.Vector3(
        controllerPos.x + initialVelX * t,
        controllerPos.y + initialVelY * t + 0.5 * gravity * t * t,
        controllerPos.z + initialVelZ * t
      );

      if (Math.abs(point.y - controllerPos.y) > arcBendLimit) {
        point.y = controllerPos.y + Math.sign(point.y - controllerPos.y) * arcBendLimit;
      }

      if (!peakReached && point.y < previousY) {
        peakReached = true;
        peakTime = t;
      }
      arcPoints.push(point);

      const timeAfterPeak = peakReached ? (t - peakTime) : 0;
      const isOnDownwardTrajectory = peakReached && timeAfterPeak > 0.1;
      if (!intersectionPoint && isOnDownwardTrajectory && point.y <= virtualFloorY) {

        if (i > 0) {
          const prevPoint = arcPoints[i - 1];
          const ratio = (virtualFloorY - prevPoint.y) / (point.y - prevPoint.y);
          intersectionPoint = new THREE.Vector3().lerpVectors(prevPoint, point, ratio);
          intersectionPoint.y = virtualFloorY;
        } else {
          intersectionPoint = point.clone();
          intersectionPoint.y = virtualFloorY;
        }
        arcPoints[i] = intersectionPoint;
        arcPoints.length = i + 1;
        break;
      }
      previousY = point.y;

      const horizontalDist = Math.sqrt(
        Math.pow(point.x - controllerPos.x, 2) +
        Math.pow(point.z - controllerPos.z, 2)
      );
      // On the downward arc only: clamp to maxDistance boundary and land there.
      // While going up, let the arc fly freely — no marker shows during upward phase anyway.
      if (isOnDownwardTrajectory && horizontalDist > maxDistance) {
        if (i > 0) {
          const prevPoint = arcPoints[i - 1];
          const prevHDist = Math.sqrt(
            Math.pow(prevPoint.x - controllerPos.x, 2) +
            Math.pow(prevPoint.z - controllerPos.z, 2)
          );
          // Interpolate precisely to the boundary circle — no X,Z jump
          const ratio = (horizontalDist > prevHDist)
            ? (maxDistance - prevHDist) / (horizontalDist - prevHDist)
            : 0.5;
          intersectionPoint = new THREE.Vector3(
            prevPoint.x + (point.x - prevPoint.x) * ratio,
            virtualFloorY,
            prevPoint.z + (point.z - prevPoint.z) * ratio
          );
          arcPoints[i] = intersectionPoint;
          arcPoints.length = i + 1;
        }
        break;
      }
    }
    

    if (!intersectionPoint && arcPoints.length > 0) {

      let lowestPoint = arcPoints[0];
      let lowestIndex = 0;
      
      for (let i = 1; i < arcPoints.length; i++) {
        if (arcPoints[i].y < lowestPoint.y) {
          lowestPoint = arcPoints[i];
          lowestIndex = i;
        }
      }
      

      if (lowestIndex > arcPoints.length / 3) { // Must be in latter part of arc

        intersectionPoint = new THREE.Vector3(lowestPoint.x, virtualFloorY, lowestPoint.z);
        

        arcPoints.length = lowestIndex + 1;
        arcPoints[lowestIndex] = intersectionPoint;
      }
    }
    

    if (arcPoints.length > 1) {
      // Centripetal parameterisation prevents cusps and self-intersections
      const curve = new THREE.CatmullRomCurve3(arcPoints, false, 'centripetal');
      const newGeometry = new THREE.TubeGeometry(curve, 20, 0.012, 6, false);
      
      if (this.teleportCurve.geometry) {
        this.teleportCurve.geometry.dispose();
      }
      this.teleportCurve.geometry = newGeometry;
    }
    

    this.currentTeleportTarget = intersectionPoint ? intersectionPoint.clone() : null;

    if (this.teleportMarker) {
      if (intersectionPoint) {
        this.teleportMarker.position.copy(intersectionPoint);
        this.teleportMarker.rotation.set(-Math.PI / 2, 0, 0);
        this.teleportMarker.material.opacity = 0.78;
        this.teleportMarker.material.color.setHex(this.style.neutralColor);
        this.teleportMarker.visible = true;
      } else {
        this.teleportMarker.visible = false;
      }
    }

    if (this.teleportArch) {
      if (intersectionPoint) {
        this.teleportArch.position.copy(intersectionPoint);

        const cameraWorldPos = new THREE.Vector3();
        this.camera.getWorldPosition(cameraWorldPos);
        const lookTarget = new THREE.Vector3(
          cameraWorldPos.x,
          intersectionPoint.y,
          cameraWorldPos.z
        );
        this.teleportArch.lookAt(lookTarget);

        const dist = cameraWorldPos.distanceTo(intersectionPoint);
        const opacity = THREE.MathUtils.clamp((dist - 2.5) / 7.5, 0, 1);
        this.teleportArch.material.opacity = 0.24 * opacity;
        this.teleportArch.visible = opacity > 0.01;
      } else {
        this.teleportArch.visible = false;
      }
    }
  }


  updateTeleportFloor() {
    if (this.teleportFloorHeight === null) return;
    // Keep floor mesh position updated for arc logic, but never show it
    if (this.teleportFloor) {
      this.teleportFloor.position.y = this.teleportFloorHeight;
    }
    this.updateTeleportArc();
  }


  updateTeleportArcHeight() {


    this.updateTeleportFloor();
  }
  

  calculateAndExecuteTeleport() {
    if (!this.teleportController || this.teleportMaxMagnitude < this.teleportThreshold) return;
    if (this.currentTeleportTarget) {
      const intersectionPoint = this.currentTeleportTarget.clone();

      const currentUserPos = this.camera.parent.position;
      const horizontalDistance = Math.sqrt(
        Math.pow(intersectionPoint.x - currentUserPos.x, 2) + 
        Math.pow(intersectionPoint.z - currentUserPos.z, 2)
      );
      

      if (horizontalDistance <= this.teleportMaxDistance) {

        const teleportPosition = new THREE.Vector3(intersectionPoint.x, this.teleportFloorHeight, intersectionPoint.z);
        this.validTeleportPosition = teleportPosition;
        this.executeTeleport();

        this.teleportFloorHeight = null;
        this.currentTeleportTarget = null;
      }
    }
  }
  

  adjustFloorHeight(delta) {
    this.teleportFloorHeight = Math.max(
      this.teleportFloorMin,
      Math.min(this.teleportFloorMax, this.teleportFloorHeight + delta)
    );
    this.updateTeleportFloor();
  }
  
  setFloorHeight(height) {
    this.teleportFloorHeight = Math.max(
      this.teleportFloorMin,
      Math.min(this.teleportFloorMax, height)
    );
    this.updateTeleportFloor();
  }
  
  resetTeleportState() {
    this.teleportPressed = false;
    this.teleportMaxMagnitude = 0;
    this.teleportController = null;
    this.validTeleportPosition = null;
    this.hideTeleportArc();
  }
  
  dispose() {

    if (this.teleportCurve) {
      if (this.teleportCurve.geometry) {
        this.teleportCurve.geometry.dispose();
      }
      if (this.teleportCurve.material) {
        this.teleportCurve.material.dispose();
      }
      this.scene.remove(this.teleportCurve);
    }
    
    if (this.teleportMarker) {
      if (this.teleportMarker.geometry) {
        this.teleportMarker.geometry.dispose();
      }
      if (this.teleportMarker.material) {
        this.teleportMarker.material.dispose();
      }
      this.scene.remove(this.teleportMarker);
    }

    if (this.teleportArch) {
      if (this.teleportArch.geometry) {
        this.teleportArch.geometry.dispose();
      }
      if (this.teleportArch.material) {
        this.teleportArch.material.dispose();
      }
      this.scene.remove(this.teleportArch);
    }
    
    if (this.teleportFloor) {
      if (this.teleportFloor.geometry) {
        this.teleportFloor.geometry.dispose();
      }
      if (this.teleportFloor.material) {
        this.teleportFloor.material.dispose();
      }
      this.scene.remove(this.teleportFloor);
    }
    
    this.resetTeleportState();
  }

  resetSnapTurnState() {
    this.lastSnapTurnTime = 0;
  }
}
