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
    
    // Teleportation system
    this.teleportController = null;
    this.teleportMarker = null;
    this.teleportCurve = null;
    this.teleportFloor = null;        // Invisible floor mesh for height adjustment
    this.validTeleportPosition = null;
    this.teleportThreshold = 0.7;      // Joystick must be pushed this far to start aiming
    this.teleportReleaseThreshold = 0.3; // Below this threshold counts as "released"
    this.teleportPressed = false;      // Track if joystick is currently "pressed"
    this.teleportMaxMagnitude = 0;     // Track the maximum magnitude reached during this gesture
    this.teleportFloorHeight = -1.6;  // Virtual floor height offset from current user position
    this.teleportFloorMin = -10.0;    // Minimum floor height (10m below current)
    this.teleportFloorMax = 10.0;     // Maximum floor height (10m above current)
    
    // Snap turn state
    this.lastSnapTurnTime = 0;
    
    // Callbacks
    this.onTeleport = null;
    this.onTeleportStart = null;
    this.onTeleportEnd = null;
  }
  
  init() {
    this.setupTeleportation();
  }
  
  // Initialize smooth teleportation system with arc
  setupTeleportation() {
    // Create the smooth teleport arc system
    this.createTeleportArc();
    console.log('🎯 Enhanced teleportation system with smooth arc initialized');
  }
  
  // Create the smooth white teleport arc
  createTeleportArc() {
    // Create a smooth white tube for the arc
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 1, -5)
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 20, 0.03, 8, false);
    
    // White material with slight transparency and glow
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
    
    this.teleportCurve = new THREE.Mesh(geometry, material);
    this.teleportCurve.visible = false;
    this.scene.add(this.teleportCurve);
    
    // Create teleport landing marker - white glowing ring
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
      
      // Add a subtle glow effect
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
    
    // Create invisible virtual floor for height adjustment
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

  // Execute the teleport to the calculated position
  executeTeleport() {
    if (!this.validTeleportPosition) return;
    
    // Use the position directly (Y level already set to maintain user's current height)
    const targetPosition = this.validTeleportPosition.clone();
    
    // Smoothly move the dolly (camera parent) to the target position
    this.camera.parent.position.copy(targetPosition);
    
    // Optional: Add teleport effect/sound here
    console.log(`🚀 Teleported to: ${targetPosition.x.toFixed(2)}, ${targetPosition.y.toFixed(2)}, ${targetPosition.z.toFixed(2)}`);
    
    if (this.onTeleport) {
      this.onTeleport(targetPosition);
    }
    
    // Clear the teleport position
    this.validTeleportPosition = null;
  }

  // Smooth dash movement (comfort alternative to instant teleport)
  dashToPosition(targetPosition) {
    const startPosition = this.camera.parent.position.clone();
    const distance = startPosition.distanceTo(targetPosition);
    const dashDuration = Math.min(distance * 0.2, 1.0); // Max 1 second dash
    
    let dashTime = 0;
    const dashUpdate = () => {
      dashTime += 1/60; // Assume 60fps
      const progress = Math.min(dashTime / dashDuration, 1);
      
      // Ease-out curve for comfortable movement
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      this.camera.parent.position.lerpVectors(startPosition, targetPosition, easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(dashUpdate);
      }
    };
    
    dashUpdate();
  }
  
  // Snap turning implementation (comfort feature)
  processSnapTurn(inputX, snapTurnAngle = 30) {
    if (!this.lastSnapTurnTime) this.lastSnapTurnTime = 0;
    const now = Date.now();
    
    // Prevent rapid snap turning (500ms cooldown)
    if (now - this.lastSnapTurnTime < 500) return;
    
    if (Math.abs(inputX) > 0.7) { // Strong input required for snap turn
      const snapAngle = snapTurnAngle * Math.PI / 180; // Convert to radians
      const turnDirection = inputX > 0 ? 1 : -1;
      
      this.camera.parent.rotation.y -= turnDirection * snapAngle;
      this.camera.parent.rotation.y = this.normalizeAngle(this.camera.parent.rotation.y);
      
      this.lastSnapTurnTime = now;
      console.log(`🔄 Snap turn: ${turnDirection > 0 ? 'right' : 'left'} ${snapTurnAngle}°`);
    }
  }
  
  // Normalize angle to [-PI, PI]
  normalizeAngle(angle) {
    while (angle > Math.PI) angle -= 2 * Math.PI;
    while (angle < -Math.PI) angle += 2 * Math.PI;
    return angle;
  }
  
  // Lightweight teleportation processing
  processTeleportation(controller, x, y) {
    // Calculate joystick magnitude (any direction can trigger teleportation)
    const magnitude = Math.sqrt(x * x + y * y);

    // Use Y direction as-is for floor adjustment: up (negative y) moves floor up, down (positive y) moves floor down
    const flippedY = y;

    // Check if joystick is being "pressed" (above threshold)
    if (magnitude > this.teleportThreshold && !this.teleportPressed) {
      // Start aiming - show arc immediately
      this.teleportPressed = true;
      this.teleportMaxMagnitude = magnitude;
      this.teleportController = controller;
      this.showTeleportArc();

      if (this.onTeleportStart) {
        this.onTeleportStart();
      }
    } else if (this.teleportPressed) {
      // Track max magnitude during gesture for distance calculation
      this.teleportMaxMagnitude = Math.max(this.teleportMaxMagnitude, magnitude);

      // Floor height adjustment (allow up/down to ±10m)
      if (Math.abs(flippedY) > 0.1) {
        // 4 units per second, scaled by joystick direction
        const floorAdjustSpeed = 4.0 / 60.0; // Assume ~60fps
        this.teleportFloorHeight += flippedY * floorAdjustSpeed;
        this.teleportFloorHeight = Math.max(this.teleportFloorMin, Math.min(this.teleportFloorMax, this.teleportFloorHeight));
        this.updateTeleportFloor();
      }

      // Update the arc visualization in real-time
      this.updateTeleportArc();

      // Check if joystick was released (below release threshold)
      if (magnitude < this.teleportReleaseThreshold) {
        // Calculate landing position ONCE and execute teleport
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

  // Show the smooth white teleport arc
  showTeleportArc() {
    if (!this.teleportCurve) {
      this.createTeleportArc();
    }
    this.teleportCurve.visible = true;
    if (this.teleportMarker) {
      this.teleportMarker.visible = true;
      // Also show glow ring if present
      if (this.teleportMarker.children && this.teleportMarker.children.length > 0) {
        this.teleportMarker.children.forEach(child => child.visible = true);
      }
    }
    // Position and show the virtual floor at default height
    this.updateTeleportFloor();
  }

  // Hide the teleport arc
  hideTeleportArc() {
    if (this.teleportCurve) {
      this.teleportCurve.visible = false;
    }
    if (this.teleportMarker) {
      this.teleportMarker.visible = false;
      // Hide glow ring if present
      if (this.teleportMarker.children && this.teleportMarker.children.length > 0) {
        this.teleportMarker.children.forEach(child => child.visible = false);
      }
    }
    if (this.teleportFloor) {
      this.teleportFloor.visible = false;
    }
  }

  // Update arc in real-time while aiming (natural physics arc with floor intersection)
  updateTeleportArc() {
    if (!this.teleportController || !this.teleportCurve) return;
    
    // Get controller position and orientation
    const controllerPos = new THREE.Vector3();
    this.teleportController.getWorldPosition(controllerPos);
    
    const controllerQuat = new THREE.Quaternion();
    this.teleportController.getWorldQuaternion(controllerQuat);
    
    // Get the actual pointing direction from the controller
    const forwardDir = new THREE.Vector3(0, 0, -1);
    forwardDir.applyQuaternion(controllerQuat);
    
    // Enhanced distance control with finer sensitivity for left joystick
    const minDistance = 3;   // Minimum 3m
    const maxDistance = 30;  // Maximum 30m
    
    // More sensitive/fine control - use a more nuanced mapping
    const normalizedMagnitude = Math.min(this.teleportMaxMagnitude / this.teleportThreshold, 1.0);
    const distanceRange = maxDistance - minDistance;
    
    // Use a quadratic curve for finer control at lower distances
    const distanceRatio = Math.pow(normalizedMagnitude, 0.7); // Gentler curve for finer control
    const targetDistance = minDistance + (distanceRange * distanceRatio);
    
    // Physics-based parabolic arc that always bends to ground within 30m
    const arcPoints = [];
    const steps = 40; // More steps for better precision
    const gravity = -9.8; // m/s² downward
    
    // Calculate initial velocity to ensure arc always reaches target distance and bends down
    let baseVelocity = Math.sqrt(targetDistance * Math.abs(gravity) / 2); // Physics-based velocity
    
    // Adjust for controller pointing direction
    if (forwardDir.y > 0.3) {
      // Pointing up too much - reduce velocity to ensure it comes down
      baseVelocity *= (1.0 - forwardDir.y * 0.5);
    } else if (forwardDir.y < -0.5) {
      // Pointing down - increase horizontal component to reach target distance
      baseVelocity *= (1.0 + Math.abs(forwardDir.y) * 0.3);
    }
    
    // Ensure the arc always completes within 30m horizontally
    const horizontalDistance = Math.sqrt(forwardDir.x * forwardDir.x + forwardDir.z * forwardDir.z);
    if (horizontalDistance > 0.1) {
      // Scale velocity to ensure we don't overshoot horizontally
      const velocityScale = Math.min(1.0, targetDistance / (baseVelocity * 2.0));
      baseVelocity *= velocityScale;
    }
    
    // Calculate initial velocity components
    const initialVelX = forwardDir.x * baseVelocity;
    const initialVelY = Math.max(forwardDir.y * baseVelocity, baseVelocity * 0.3); // Minimum upward component
    const initialVelZ = forwardDir.z * baseVelocity;
    
    // Time duration for the arc
    const timeToApex = initialVelY / Math.abs(gravity); // Time to reach peak
    const maxTime = Math.max(timeToApex * 2.2, 1.5); // Ensure arc completes, minimum 1.5 seconds
    
    // Calculate virtual floor height (relative to current user position)
    const currentUserY = this.camera.parent.position.y;
    const virtualFloorY = currentUserY + this.teleportFloorHeight;
    
    // Build the natural physics arc and find intersection with virtual floor
    let intersectionPoint = null;
    let peakReached = false;
    let previousY = controllerPos.y;
    let peakTime = 0;
    
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * maxTime; // Time in seconds
      
      // Physics equations: position = initial_position + initial_velocity * t + 0.5 * acceleration * t²
      const point = new THREE.Vector3(
        controllerPos.x + initialVelX * t,
        controllerPos.y + initialVelY * t + 0.5 * gravity * t * t, // Real physics with gravity
        controllerPos.z + initialVelZ * t
      );
      
      // Check if we've reached the peak (start of downward trajectory)
      if (!peakReached && point.y < previousY) {
        peakReached = true;
        peakTime = t;
      }
      
      arcPoints.push(point);
      
      // Only check for intersection AFTER the peak AND after sufficient downward travel
      const timeAfterPeak = peakReached ? (t - peakTime) : 0;
      const isOnDownwardTrajectory = peakReached && timeAfterPeak > 0.1; // Must be at least 0.1s after peak
      
      if (!intersectionPoint && isOnDownwardTrajectory && point.y <= virtualFloorY) {
        // Linear interpolation to find more precise intersection point
        if (i > 0) {
          const prevPoint = arcPoints[i - 1];
          const ratio = (virtualFloorY - prevPoint.y) / (point.y - prevPoint.y);
          intersectionPoint = new THREE.Vector3().lerpVectors(prevPoint, point, ratio);
          intersectionPoint.y = virtualFloorY; // Snap to exact floor height
        } else {
          intersectionPoint = point.clone();
          intersectionPoint.y = virtualFloorY;
        }
        
        // Truncate arc at intersection point
        arcPoints[i] = intersectionPoint;
        arcPoints.length = i + 1; // Remove points beyond intersection
        break;
      }
      
      previousY = point.y;
      
      // Safety check: if arc goes too far horizontally, force it to end
      const horizontalDist = Math.sqrt(
        Math.pow(point.x - controllerPos.x, 2) + 
        Math.pow(point.z - controllerPos.z, 2)
      );
      if (horizontalDist > maxDistance) {
        // Force end of arc at max distance
        if (isOnDownwardTrajectory) {
          intersectionPoint = new THREE.Vector3(point.x, virtualFloorY, point.z);
          arcPoints[i] = intersectionPoint;
          arcPoints.length = i + 1;
        }
        break;
      }
    }
    
    // If no intersection found, ensure we have a valid endpoint
    if (!intersectionPoint && arcPoints.length > 0) {
      // Find the lowest point in the arc and create intersection there
      let lowestPoint = arcPoints[0];
      let lowestIndex = 0;
      
      for (let i = 1; i < arcPoints.length; i++) {
        if (arcPoints[i].y < lowestPoint.y) {
          lowestPoint = arcPoints[i];
          lowestIndex = i;
        }
      }
      
      // Only create intersection if we're past the peak
      if (lowestIndex > arcPoints.length / 3) { // Must be in latter part of arc
        // Force intersection at virtual floor level at the lowest horizontal position
        intersectionPoint = new THREE.Vector3(lowestPoint.x, virtualFloorY, lowestPoint.z);
        
        // Truncate arc at this point
        arcPoints.length = lowestIndex + 1;
        arcPoints[lowestIndex] = intersectionPoint;
      }
    }
    
    // Update arc geometry with the natural physics curve
    if (arcPoints.length > 1) {
      const curve = new THREE.CatmullRomCurve3(arcPoints);
      const newGeometry = new THREE.TubeGeometry(curve, 20, 0.03, 6, false);
      
      if (this.teleportCurve.geometry) {
        this.teleportCurve.geometry.dispose();
      }
      this.teleportCurve.geometry = newGeometry;
    }
    
    // Position marker at the intersection point (where arc hits virtual floor)
    if (this.teleportMarker && intersectionPoint) {
      this.teleportMarker.position.copy(intersectionPoint);
      this.teleportMarker.visible = true;
      
      // Visual feedback: change marker color based on floor height
      if (this.teleportFloorHeight < -0.5) {
        // Below normal height - blue tint
        this.teleportMarker.material.color.setHex(0x88ccff);
      } else if (this.teleportFloorHeight > 0.5) {
        // Above normal height - yellow tint
        this.teleportMarker.material.color.setHex(0xffff88);
      } else {
        // Normal height range - white
        this.teleportMarker.material.color.setHex(0xffffff);
      }
    }
  }

  // Update virtual floor position and make it slightly visible during adjustment
  updateTeleportFloor() {
    if (!this.teleportFloor) return;
    
    // Position floor at the adjusted height relative to current user position
    const currentUserY = this.camera.parent.position.y;
    const virtualFloorY = currentUserY + this.teleportFloorHeight;
    
    this.teleportFloor.position.y = virtualFloorY;
    
    // Make floor slightly visible when adjusting (subtle grid/plane)
    this.teleportFloor.visible = true;
    this.teleportFloor.material.visible = true;
    this.teleportFloor.material.opacity = 0.15;
    
    // Color-code the floor based on height
    if (this.teleportFloorHeight < -0.5) {
      // Below normal - blue tint
      this.teleportFloor.material.color.setHex(0x4488ff);
    } else if (this.teleportFloorHeight > 0.5) {
      // Above normal - yellow tint  
      this.teleportFloor.material.color.setHex(0xffff44);
    } else {
      // Normal range - green tint
      this.teleportFloor.material.color.setHex(0x44ff88);
    }
    
    // Update the arc to intersect with the new floor position
    this.updateTeleportArc();
  }

  // Update teleport marker height when adjusting with right joystick
  updateTeleportArcHeight() {
    // Floor adjustment is now handled by updateTeleportFloor()
    // This method triggers the floor update which updates the arc intersection
    this.updateTeleportFloor();
  }
  
  // Calculate teleport arc and landing (only lands on downward arc intersection)
  calculateAndExecuteTeleport() {
    if (!this.teleportController || this.teleportMaxMagnitude < this.teleportThreshold) return;
    
    // The intersection point is already calculated in updateTeleportArc
    // Only teleport if marker is visible and represents a valid downward intersection
    if (this.teleportMarker && this.teleportMarker.visible) {
      const intersectionPoint = this.teleportMarker.position.clone();
      
      // Validate that this is a reasonable teleport position
      const currentUserPos = this.camera.parent.position;
      const horizontalDistance = Math.sqrt(
        Math.pow(intersectionPoint.x - currentUserPos.x, 2) + 
        Math.pow(intersectionPoint.z - currentUserPos.z, 2)
      );
      
      // Only allow teleport if within reasonable range and on downward trajectory
      if (horizontalDistance >= 3 && horizontalDistance <= 30) {
        // Keep the user's current Y level for teleportation (not the intersection Y)
        const currentUserY = this.camera.parent.position.y;
        const teleportPosition = new THREE.Vector3(intersectionPoint.x, currentUserY, intersectionPoint.z);
        
        this.validTeleportPosition = teleportPosition;
        this.executeTeleport();
        
        // Reset floor height to default after teleport
        this.teleportFloorHeight = -1.6;
        
        console.log(`🚀 Teleported to floor intersection: ${teleportPosition.x.toFixed(2)}, ${teleportPosition.y.toFixed(2)}, ${teleportPosition.z.toFixed(2)}`);
      } else {
        console.log(`🚫 Invalid teleport distance: ${horizontalDistance.toFixed(2)}m (must be 3-30m)`);
      }
    } else {
      console.log('🚫 Teleport failed - no valid surface found');
    }
  }
  
  // Floor height adjustment methods
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
    // Clean up teleport objects
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
  // Reset snap turn state - useful for mid-session mode changes
  resetSnapTurnState() {
    this.lastSnapTurnTime = 0;
    console.log('🔄 Snap turn state reset (VRTeleport)');
  }
}
