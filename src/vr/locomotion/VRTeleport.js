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
    

    this.teleportController = null;
    this.teleportMarker = null;
    this.teleportCurve = null;
    this.teleportFloor = null;        // Invisible floor mesh for height adjustment
    this.validTeleportPosition = null;
    this.teleportThreshold = 0.7;      // Joystick must be pushed this far to start aiming
    this.teleportReleaseThreshold = 0.3; // Below this threshold counts as "released"
    this.teleportPressed = false;      // Track if joystick is currently "pressed"
    this.teleportMaxMagnitude = 0;     // Track the maximum magnitude reached during this gesture
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
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
    
    this.teleportCurve = new THREE.Mesh(geometry, material);
    this.teleportCurve.visible = false;
    this.scene.add(this.teleportCurve);
    

    if (!this.teleportMarker) {
      const markerGeometry = new THREE.RingGeometry(0.4, 0.6, 20);
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
      });
      
      this.teleportMarker = new THREE.Mesh(markerGeometry, markerMaterial);
      this.teleportMarker.rotation.x = -Math.PI / 2; // Lay flat on ground
      this.teleportMarker.visible = false;
      this.scene.add(this.teleportMarker);
      

      const glowGeometry = new THREE.RingGeometry(0.3, 0.7, 20);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.rotation.x = -Math.PI / 2;
      this.teleportMarker.add(glow);
    }
    

    if (!this.teleportFloor) {
      const floorGeometry = new THREE.PlaneGeometry(100, 100); // Large invisible plane
      const floorMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.1, // Very subtle when visible
        side: THREE.DoubleSide,
        visible: false // Invisible by default
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
  

  processTeleportation(controller, x, y) {

    const magnitude = Math.sqrt(x * x + y * y);
    const isRightHand = controller && controller.inputSource && controller.inputSource.handedness === 'right';
    const flippedY = y;


    if (magnitude > this.teleportThreshold && !this.teleportPressed) {
      this.teleportPressed = true;
      this.teleportMaxMagnitude = magnitude;
      this.teleportController = controller;

      this.teleportFloorHeight = this.camera.parent.position.y;
      this.showTeleportArc();
      if (this.onTeleportStart) {
        this.onTeleportStart();
      }
    } else if (this.teleportPressed) {
      this.teleportMaxMagnitude = Math.max(this.teleportMaxMagnitude, magnitude);

      if (isRightHand && Math.abs(flippedY) > 0.1) {
        const floorAdjustSpeed = 4.0 / 60.0;
        this.teleportFloorHeight += flippedY * floorAdjustSpeed;
        this.teleportFloorHeight = Math.max(this.teleportFloorMin, Math.min(this.teleportFloorMax, this.teleportFloorHeight));
        this.updateTeleportFloor();
      }
      this.updateTeleportArc();
      if (magnitude < this.teleportReleaseThreshold) {
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
      this.teleportMarker.visible = true;

      if (this.teleportMarker.children && this.teleportMarker.children.length > 0) {
        this.teleportMarker.children.forEach(child => child.visible = true);
      }
    }

    this.updateTeleportFloor();
  }


  hideTeleportArc() {
    if (this.teleportCurve) {
      this.teleportCurve.visible = false;
    }
    if (this.teleportMarker) {
      this.teleportMarker.visible = false;

      if (this.teleportMarker.children && this.teleportMarker.children.length > 0) {
        this.teleportMarker.children.forEach(child => child.visible = false);
      }
    }
    if (this.teleportFloor) {
      this.teleportFloor.visible = false;
    }
  }


  updateTeleportArc() {
    if (!this.teleportController || !this.teleportCurve) return;
    

    const controllerPos = new THREE.Vector3();
    this.teleportController.getWorldPosition(controllerPos);
    
    const controllerQuat = new THREE.Quaternion();
    this.teleportController.getWorldQuaternion(controllerQuat);
    

    const forwardDir = new THREE.Vector3(0, 0, -1);
    forwardDir.applyQuaternion(controllerQuat);
    

    const minDistance = 3;   // Minimum 3m
    const maxDistance = 30;  // Maximum 30m
    

    const normalizedMagnitude = Math.min(this.teleportMaxMagnitude / this.teleportThreshold, 1.0);
    const distanceRange = maxDistance - minDistance;
    

    const distanceRatio = Math.pow(normalizedMagnitude, 0.7); // Gentler curve for finer control
    const targetDistance = minDistance + (distanceRange * distanceRatio);
    

    const arcPoints = [];
    const steps = 40; // More steps for better precision
    const gravity = -9.8; // m/s² downward
    

    let baseVelocity = Math.sqrt(targetDistance * Math.abs(gravity) / 2); // Physics-based velocity
    

    if (forwardDir.y > 0.3) {

      baseVelocity *= (1.0 - forwardDir.y * 0.5);
    } else if (forwardDir.y < -0.5) {

      baseVelocity *= (1.0 + Math.abs(forwardDir.y) * 0.3);
    }
    

    const horizontalDistance = Math.sqrt(forwardDir.x * forwardDir.x + forwardDir.z * forwardDir.z);
    if (horizontalDistance > 0.1) {

      const velocityScale = Math.min(1.0, targetDistance / (baseVelocity * 2.0));
      baseVelocity *= velocityScale;
    }
    

    const initialVelX = forwardDir.x * baseVelocity;
    const initialVelY = Math.max(forwardDir.y * baseVelocity, baseVelocity * 0.3); // Minimum upward component
    const initialVelZ = forwardDir.z * baseVelocity;
    

    const timeToApex = initialVelY / Math.abs(gravity); // Time to reach peak
    const maxTime = Math.max(timeToApex * 2.2, 1.5); // Ensure arc completes, minimum 1.5 seconds
    

    const virtualFloorY = this.teleportFloorHeight;
    

    let intersectionPoint = null;
    let peakReached = false;
    let previousY = controllerPos.y;
    let peakTime = 0;
    
    let arcBendLimit = 8.0; // Max vertical difference allowed for arc (prevents weird bends)
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
      if (horizontalDist > maxDistance) {

        if (isOnDownwardTrajectory) {
          intersectionPoint = new THREE.Vector3(point.x, virtualFloorY, point.z);
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
      const curve = new THREE.CatmullRomCurve3(arcPoints);
      const newGeometry = new THREE.TubeGeometry(curve, 20, 0.03, 6, false);
      
      if (this.teleportCurve.geometry) {
        this.teleportCurve.geometry.dispose();
      }
      this.teleportCurve.geometry = newGeometry;
    }
    

    if (this.teleportMarker && intersectionPoint) {
      this.teleportMarker.position.copy(intersectionPoint);
      this.teleportMarker.visible = true;
      

      if (this.teleportFloorHeight < -0.5) {

        this.teleportMarker.material.color.setHex(0x88ccff);
      } else if (this.teleportFloorHeight > 0.5) {

        this.teleportMarker.material.color.setHex(0xffff88);
      } else {

        this.teleportMarker.material.color.setHex(0xffffff);
      }
    }
  }


  updateTeleportFloor() {
    if (!this.teleportFloor) return;
    

    if (this.teleportFloorHeight === null) return;
    this.teleportFloor.position.y = this.teleportFloorHeight;
    

    this.teleportFloor.visible = true;
    this.teleportFloor.material.visible = true;
    this.teleportFloor.material.opacity = 0.15;
    

    if (this.teleportFloorHeight < -0.5) {

      this.teleportFloor.material.color.setHex(0x4488ff);
    } else if (this.teleportFloorHeight > 0.5) {

      this.teleportFloor.material.color.setHex(0xffff44);
    } else {

      this.teleportFloor.material.color.setHex(0x44ff88);
    }
    

    this.updateTeleportArc();
  }


  updateTeleportArcHeight() {


    this.updateTeleportFloor();
  }
  

  calculateAndExecuteTeleport() {
    if (!this.teleportController || this.teleportMaxMagnitude < this.teleportThreshold) return;
    


    if (this.teleportMarker && this.teleportMarker.visible) {
      const intersectionPoint = this.teleportMarker.position.clone();
      

      const currentUserPos = this.camera.parent.position;
      const horizontalDistance = Math.sqrt(
        Math.pow(intersectionPoint.x - currentUserPos.x, 2) + 
        Math.pow(intersectionPoint.z - currentUserPos.z, 2)
      );
      

      if (horizontalDistance >= 3 && horizontalDistance <= 30) {

        const teleportPosition = new THREE.Vector3(intersectionPoint.x, this.teleportFloorHeight, intersectionPoint.z);
        this.validTeleportPosition = teleportPosition;
        this.executeTeleport();

        this.teleportFloorHeight = null;
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
