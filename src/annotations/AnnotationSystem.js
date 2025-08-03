/**
 * BelowJS Annotation System
 * Core plugin for 3D annotation markers, tours, and interaction
 */

import * as THREE from 'three';
import { EventSystem } from '../utils/EventSystem.js';

export class AnnotationSystem extends EventSystem {
    constructor(config = {}) {
        super(); // Initialize EventSystem
        
        // Extract components from config object (like measurement system)
        this.viewer = config.viewer;
        this.scene = config.scene;
        this.camera = config.camera;
        this.renderer = config.renderer;
        this.controls = config.controls;
        this.canvas = config.canvas;
        this.container = config.container || document.body;
        
        this.options = {
            markerColor: '#FFFFFF',
            markerBorderColor: '#2D3748', 
            markerTextColor: '#2D3748',
            markerSize: 0.6,
            maxMarkers: 99,
            autoSave: true,
            occludedOpacity: 0.3,
            ...config
        };
        
        this.annotations = [];
        this.markers = new Map();
        this.activePanel = null;
        this.activeCard = null;
        this.activeAnnotation = null;
        this.editMode = false;
        this.nextIndex = 1;
        this.currentAnimation = null; // Track camera animations
        this.cardClickOutsideHandler = null; // Track click outside handler
        this.renderLoopId = null; // Track render loop for marker scaling
        this.cardPositionUpdateId = null; // Track card position updates
        
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this._raycastTargets = []; // Model geometry for raycasting (like measurement system)
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnnotationSyncing();
        // Temporarily disable render loop to debug edit mode
        // this.startRenderLoop();
    }

    setupAnnotationSyncing() {
        // Listen for updates from manager to sync with active card
        this.on('annotationUpdated', (data) => {
            if (data.source === 'manager' && this.activeCard && this.activeAnnotation && this.activeAnnotation.id === data.annotation.id) {
                // Update the active card's content
                this.updateActiveCard(data.updates);
            }
        });
    }

    updateActiveCard(updates) {
        if (!this.activeCard) return;

        Object.keys(updates).forEach(field => {
            const element = this.activeCard.querySelector(`[data-field="${field}"]`);
            if (element) {
                element.textContent = updates[field];
            }
        });
    }

    /**
     * Start render loop for marker scaling
     */
    startRenderLoop() {
        const updateMarkers = () => {
            if (this.markers.size > 0) {
                this.updateAllMarkerScales();
            }
            this.renderLoopId = requestAnimationFrame(updateMarkers);
        };
        this.renderLoopId = requestAnimationFrame(updateMarkers);
    }

    /**
     * Stop render loop
     */
    stopRenderLoop() {
        if (this.renderLoopId) {
            cancelAnimationFrame(this.renderLoopId);
            this.renderLoopId = null;
        }
    }

    /**
     * Called when model is loaded and raycast targets are set
     * This is when we should load annotations from storage
     */
    onModelLoaded() {
        this.loadAnnotationsFromStorage();
    }

    /**
     * Set raycast targets (model geometry) for annotation placement
     * @param {THREE.Object3D|THREE.Object3D[]} targets - Model objects to raycast against
     */
    setRaycastTargets(targets) {
        if (!targets) {
            this._raycastTargets = [];
            return;
        }
        
        // Convert single target to array
        const targetArray = Array.isArray(targets) ? targets : [targets];
        
        // Collect all mesh objects from targets
        const meshTargets = [];
        targetArray.forEach(target => {
            if (target && target.type === 'Mesh') {
                meshTargets.push(target);
            } else if (target && target.children) {
                target.traverse(child => {
                    if (child.type === 'Mesh') {
                        meshTargets.push(child);
                    }
                });
            }
        });
        
        this._raycastTargets = meshTargets;
    }

    setupEventListeners() {
        if (!this.canvas) {
            console.warn('No canvas found for annotation system event listeners');
            return;
        }
        
        // Click handler for placing annotations in edit mode
        this.canvas.addEventListener('click', (event) => {
            if (this.editMode) {
                this.handleEditModeClick(event);
            } else {
                this.handleViewModeClick(event);
            }
        });

        // Mouse move handler for hover effects
        this.canvas.addEventListener('mousemove', (event) => {
            this.handleMouseMove(event);
        });

        // Mouse leave handler to clear hover states
        this.canvas.addEventListener('mouseleave', () => {
            this.clearAllHoverStates();
        });

        // Mouse interaction to interrupt camera animations
        this.canvas.addEventListener('mousedown', () => {
            if (this.currentAnimation) {
                this.stopCameraAnimation();
            }
        });

        // Controls change to interrupt camera animations
        if (this.controls) {
            this.controls.addEventListener('start', () => {
                if (this.currentAnimation) {
                    this.stopCameraAnimation();
                }
            });
        }

        // Escape key to close cards and stop animations
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.hideAnnotationCard();
                if (this.currentAnimation) {
                    this.stopCameraAnimation();
                }
            }
        });
    }

    /**
     * Annotation Data Schema Validation
     */
    validateAnnotationData(data) {
        const schema = {
            version: 'string',
            modelId: 'string',
            annotations: 'array',
            tourSettings: 'object'
        };

        if (!data || typeof data !== 'object') {
            throw new Error('Invalid annotation data: must be an object');
        }

        // Validate required fields
        for (const [key, type] of Object.entries(schema)) {
            if (key === 'tourSettings') continue; // Optional
            
            if (!(key in data)) {
                throw new Error(`Missing required field: ${key}`);
            }
            
            // Special handling for array type since typeof array === 'object'
            if (type === 'array') {
                if (!Array.isArray(data[key])) {
                    throw new Error(`Invalid type for ${key}: expected ${type}, got ${typeof data[key]}`);
                }
            } else if (typeof data[key] !== type) {
                throw new Error(`Invalid type for ${key}: expected ${type}, got ${typeof data[key]}`);
            }
        }

        // Validate annotations array
        if (!Array.isArray(data.annotations)) {
            throw new Error('annotations must be an array');
        }

        data.annotations.forEach((annotation, index) => {
            this.validateAnnotation(annotation, index);
        });

        return true;
    }

    validateAnnotation(annotation, index = 0) {
        const required = ['id', 'index', 'position', 'title'];
        const optional = ['normal', 'description', 'htmlContent', 'cameraView', 'autoAdvanceDuration', 'metadata'];

        // Check required fields
        for (const field of required) {
            if (!(field in annotation)) {
                throw new Error(`Annotation ${index}: missing required field '${field}'`);
            }
        }

        // Validate position
        if (!this.isValidVector3(annotation.position)) {
            throw new Error(`Annotation ${index}: invalid position vector`);
        }

        // Validate normal if present
        if (annotation.normal && !this.isValidVector3(annotation.normal)) {
            throw new Error(`Annotation ${index}: invalid normal vector`);
        }

        // Validate camera view if present
        if (annotation.cameraView) {
            if (!this.isValidVector3(annotation.cameraView.position) || 
                !this.isValidVector3(annotation.cameraView.target)) {
                throw new Error(`Annotation ${index}: invalid camera view`);
            }
        }

        return true;
    }

    isValidVector3(vec) {
        return vec && 
               typeof vec === 'object' && 
               typeof vec.x === 'number' && 
               typeof vec.y === 'number' && 
               typeof vec.z === 'number';
    }

    /**
     * Create default annotation data structure
     */
    createAnnotationData() {
        return {
            version: "1.0",
            modelId: this.viewer.currentModel || "default",
            annotations: this.annotations,
            tourSettings: {
                defaultDuration: 8000,
                transitionDuration: 2000,
                vrTeleportEnabled: true
            }
        };
    }

    /**
     * Edit Mode - Place new annotations
     */
    enterEditMode() {
        this.editMode = true;
        if (this.canvas && this.canvas.style) {
            this.canvas.style.cursor = 'crosshair';
        }
        console.log('Entered annotation edit mode');
    }

    exitEditMode() {
        this.editMode = false;
        if (this.canvas && this.canvas.style) {
            this.canvas.style.cursor = 'default';
        }
        console.log('Exited annotation edit mode');
    }

    handleEditModeClick(event) {
        event.preventDefault();
        
        // Only allow annotation placement if we have raycast targets
        if (!this._raycastTargets || this._raycastTargets.length === 0) {
            console.warn('No raycast targets set for annotation placement');
            return;
        }
        
        // Convert mouse coordinates to normalized device coordinates
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Raycast only against model geometry (like measurement system)
        if (!this.camera) {
            console.warn('No camera found for raycasting');
            return;
        }
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this._raycastTargets, true);

        if (intersects.length > 0) {
            const intersection = intersects[0];
            this.createAnnotationAtPoint(intersection.point, intersection.face.normal);
        }
    }

    handleViewModeClick(event) {
        event.preventDefault();
        
        // Convert mouse coordinates for raycasting
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Raycast to check for marker clicks
        if (!this.camera) {
            console.warn('No camera found for raycasting');
            return;
        }
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const markerObjects = Array.from(this.markers.values());
        const intersects = this.raycaster.intersectObjects(markerObjects);

        if (intersects.length > 0) {
            const clickedMarker = intersects[0].object;
            const annotation = this.annotations.find(a => a.id === clickedMarker.userData.annotationId);
            if (annotation) {
                this.selectAnnotation(annotation);
            }
        } else {
            this.hideAnnotationCard();
        }
    }

    createAnnotationAtPoint(point, normal = null) {
        const id = `annotation_${this.nextIndex}`;
        const annotation = {
            id: id,
            index: this.nextIndex,
            position: { x: point.x, y: point.y, z: point.z },
            normal: normal ? { x: normal.x, y: normal.y, z: normal.z } : { x: 0, y: 1, z: 0 },
            title: `Annotation ${this.nextIndex}`,
            description: `Click to edit this annotation description`,
            cameraView: this.getCurrentCameraView(),
            metadata: {
                created: new Date().toISOString()
            }
        };

        this.addAnnotation(annotation);
        
        // Automatically select the new annotation for editing
        this.selectAnnotation(annotation);
    }

    addAnnotation(annotation) {
        this.annotations.push(annotation);
        this.createMarker(annotation);
        this.nextIndex++;
        
        if (this.options.autoSave) {
            this.saveAnnotationsToStorage();
        }

        // Emit event for UI updates
        this.emit('annotationAdded', { annotation });
        this.emit('annotationsChanged', { annotations: this.annotations });
        
        console.log('Added annotation:', annotation);
    }

    createMarker(annotation) {
        // Use the new texture creation method
        const texture = this.createMarkerTexture(annotation, 'normal');
        
        // Use standard SpriteMaterial for reliability (shader was causing visibility issues)
        const material = new THREE.SpriteMaterial({ 
            map: texture,
            transparent: true,
            alphaTest: 0.1,
            depthTest: false, // Always visible on top for now - we can add occlusion later if needed
            depthWrite: false,
            opacity: 0.7 // Lower default opacity so selected state is more obvious
        });
        
        // Store textures for different states
        material.userData = {
            annotation: annotation,
            normalTexture: texture,
            hoverTexture: null,
            selectedTexture: null,
            isHovered: false,
            isSelected: false
        };
        
        const sprite = new THREE.Sprite(material);
        sprite.position.set(annotation.position.x, annotation.position.y, annotation.position.z);
        
        // Store reference and initial scale
        sprite.userData.annotationId = annotation.id;
        sprite.userData.annotationType = 'marker';
        sprite.userData.baseSize = this.options.markerSize;
        
        // Set initial scale (will be updated in render loop)
        this.updateMarkerScale(sprite);

        this.markers.set(annotation.id, sprite);
        if (this.scene) {
            this.scene.add(sprite);
        }

        return sprite;
    }

    createMarkerTexture(annotation, state = 'normal') {
        // Create high-resolution canvas for crisp rendering
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = 256;
        canvas.width = canvas.height = size;
        
        const center = size / 2;
        const radius = 100;
        
        // Enable high-quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // State-specific styling
        let bgColor = this.options.markerColor;
        let borderColor = this.options.markerBorderColor;
        let textColor = this.options.markerTextColor;
        let shadowIntensity = 0.3;
        let addShimmer = false;
        let addGlow = false;

        if (state === 'hover') {
            bgColor = '#FFFFFF';
            borderColor = '#1A202C';
            addShimmer = true;
            shadowIntensity = 0.4;
        } else if (state === 'selected') {
            bgColor = '#64B5F6'; // Blue background for selected
            borderColor = '#1976D2'; // Darker blue border
            textColor = '#FFFFFF'; // White text on blue
            addGlow = true;
            shadowIntensity = 0.6;
        }

        // Draw enhanced drop shadow
        ctx.save();
        ctx.shadowColor = `rgba(0, 0, 0, ${shadowIntensity})`;
        ctx.shadowBlur = state === 'selected' ? 12 : 8;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        // Draw main circle background
        ctx.fillStyle = bgColor;
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Add glow effect for selected state
        if (addGlow) {
            ctx.save();
            // Multiple glow rings for more obvious selection
            ctx.shadowColor = 'rgba(25, 118, 210, 0.8)';
            ctx.shadowBlur = 25;
            ctx.strokeStyle = 'rgba(25, 118, 210, 0.9)';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(center, center, radius + 8, 0, Math.PI * 2);
            ctx.stroke();
            
            // Second outer glow
            ctx.shadowColor = 'rgba(100, 181, 246, 0.6)';
            ctx.shadowBlur = 15;
            ctx.strokeStyle = 'rgba(100, 181, 246, 0.7)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(center, center, radius + 12, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        // Draw border with enhanced contrast
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Add subtle highlight for hover (no shimmer)
        if (addShimmer) {
            ctx.save();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.beginPath();
            ctx.arc(center, center, radius - 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Draw inner subtle ring for depth
        ctx.strokeStyle = state === 'normal' ? 'rgba(45, 55, 72, 0.1)' : 'rgba(45, 55, 72, 0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(center, center, radius - 15, 0, Math.PI * 2);
        ctx.stroke();

        // Draw number with high contrast typography
        ctx.fillStyle = textColor;
        ctx.font = `bold 84px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Enhanced text shadow for maximum contrast
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.fillText(annotation.index.toString(), center, center);
        ctx.restore();
        
        // Add highlight overlay for better contrast
        ctx.save();
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.shadowBlur = 1;
        ctx.fillText(annotation.index.toString(), center, center);
        ctx.restore();

        // Create and return texture
        const texture = new THREE.CanvasTexture(canvas);
        texture.generateMipmaps = false;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        
        return texture;
    }

    handleMouseMove(event) {
        if (!this.raycaster || !this.camera) return;

        // Don't process hover if we're over a floating annotation card
        const elementUnderMouse = document.elementFromPoint(event.clientX, event.clientY);
        if (elementUnderMouse && elementUnderMouse.closest('.belowjs-annotation-card')) {
            // Clear all hover states when over floating cards
            this.clearAllHoverStates();
            return;
        }

        // Calculate mouse position in normalized device coordinates
        const rect = this.canvas.getBoundingClientRect();
        const mouse = new THREE.Vector2(
            ((event.clientX - rect.left) / rect.width) * 2 - 1,
            -((event.clientY - rect.top) / rect.height) * 2 + 1
        );

        // Update raycaster
        this.raycaster.setFromCamera(mouse, this.camera);

        // Check for intersections with markers - use more generous distance threshold
        const markerObjects = Array.from(this.markers.values());
        this.raycaster.near = 0.1;
        this.raycaster.far = 1000;
        const intersects = this.raycaster.intersectObjects(markerObjects);

        // Find currently hovered marker
        let hoveredMarkerId = null;
        if (intersects.length > 0) {
            const hoveredMarker = intersects[0].object;
            hoveredMarkerId = hoveredMarker.userData.annotationId;
        }

        // Clear all hover states first
        this.markers.forEach((marker, markerId) => {
            this.setMarkerHovered(markerId, false);
        });

        // Set hover state only for the currently hovered marker
        if (hoveredMarkerId) {
            this.setMarkerHovered(hoveredMarkerId, true);
        }

        // Update cursor style
        this.canvas.style.cursor = hoveredMarkerId ? 'pointer' : 'default';
    }

    clearAllHoverStates() {
        // Clear all hover states when mouse leaves canvas
        this.markers.forEach((marker, markerId) => {
            this.setMarkerHovered(markerId, false);
        });
        this.canvas.style.cursor = 'default';
    }

    setMarkerHovered(markerId, isHovered) {
        const marker = this.markers.get(markerId);
        if (!marker) return;

        const material = marker.material;
        const userData = material.userData;
        
        if (!userData || userData.isHovered === isHovered) return; // No change needed
        
        userData.isHovered = isHovered;
        
        if (isHovered && !userData.isSelected) {
            // Only show hover if not selected
            if (!userData.hoverTexture) {
                userData.hoverTexture = this.createMarkerTexture(userData.annotation, 'hover');
            }
            material.map = userData.hoverTexture;
            material.opacity = 1.0;
        } else if (!userData.isSelected) {
            // Return to normal state only if not selected
            material.map = userData.normalTexture;
            material.opacity = 0.7;
        }
        // If selected, don't change anything - keep selected appearance
        
        material.needsUpdate = true;
        
        // Update scale for hover expansion effect
        this.updateMarkerScale(marker);
    }

    setMarkerSelected(markerId, isSelected) {
        const marker = this.markers.get(markerId);
        if (!marker) return;

        const material = marker.material;
        const userData = material.userData;
        
        if (userData.isSelected === isSelected) return; // No change needed
        
        userData.isSelected = isSelected;
        
        if (isSelected) {
            // Create selected texture if not cached
            if (!userData.selectedTexture) {
                userData.selectedTexture = this.createMarkerTexture(userData.annotation, 'selected');
            }
            material.map = userData.selectedTexture;
            material.opacity = 1.0; // Full opacity for selected
        } else {
            // Properly transition back to normal or hover state
            if (userData.isHovered) {
                // If still hovered, go to hover state
                if (!userData.hoverTexture) {
                    userData.hoverTexture = this.createMarkerTexture(userData.annotation, 'hover');
                }
                material.map = userData.hoverTexture;
                material.opacity = 1.0;
            } else {
                // Return to normal state
                material.map = userData.normalTexture;
                material.opacity = 0.7;
            }
        }
        
        material.needsUpdate = true;
        
        // Update scale for selection state
        this.updateMarkerScale(marker);
    }

    selectAnnotation(annotation) {
        // Clear previous selection
        if (this.activeAnnotation) {
            this.setMarkerSelected(this.activeAnnotation.id, false);
        }
        
        this.activeAnnotation = annotation;
        
        // Set new selection
        if (annotation) {
            this.setMarkerSelected(annotation.id, true);
        }
        
        // Update opacity for all annotations
        this.updateAnnotationOpacity();
        
        // Show annotation card
        this.showAnnotationCard(annotation);
        
        // In view mode, animate to camera position immediately
        if (!this.editMode && annotation.cameraView) {
            this.animateToAnnotation(annotation);
        }
        
        // Emit selection event
        this.emit('annotationSelected', { annotation });
    }

    /**
     * Update opacity for all annotation markers based on active state
     */
    updateAnnotationOpacity() {
        this.markers.forEach((marker, annotationId) => {
            if (this.activeAnnotation && annotationId === this.activeAnnotation.id) {
                // Active annotation - higher opacity
                marker.material.opacity = 0.8;
            } else {
                // Inactive annotations - lower opacity
                marker.material.opacity = 0.7;
            }
        });
    }

    /**
     * Update marker scale based on distance from camera
     */
    updateMarkerScale(marker) {
        if (!this.camera) return;

        // Fixed screen-based sizing like UI elements
        const baseSize = 0.8; // Base consistent size similar to UI buttons
        
        // Add slight expansion for hover/selected states
        let finalSize = baseSize;
        const userData = marker.material.userData;
        
        if (userData && userData.isHovered && !userData.isSelected) {
            finalSize = baseSize * 1.15; // 15% larger on hover
        }
        // Selected annotations stay same size as base - no size increase
        
        // Apply scale with smooth transition
        marker.scale.set(finalSize, finalSize, 1);
    }

    /**
     * Update all marker scales - called from render loop
     */
    updateAllMarkerScales() {
        if (!this.camera) return;
        
        this.markers.forEach((marker) => {
            this.updateMarkerScale(marker);
        });
    }

    /**
     * Update camera view for an annotation to current position
     * @param {string} annotationId - ID of annotation to update
     */
    updateAnnotationCameraView(annotationId) {
        const annotation = this.annotations.find(a => a.id === annotationId);
        if (!annotation) {
            console.warn('Annotation not found:', annotationId);
            return false;
        }

        // Update camera view to current position
        annotation.cameraView = this.getCurrentCameraView();
        annotation.metadata = annotation.metadata || {};
        annotation.metadata.modified = new Date().toISOString();

        // Save if auto-save enabled
        if (this.options.autoSave) {
            this.saveAnnotationsToStorage();
        }

        // Emit update events
        this.emit('annotationUpdated', { annotation, updates: { cameraView: annotation.cameraView } });
        this.emit('annotationsChanged', { annotations: this.annotations });

        console.log('Updated camera view for annotation:', annotationId);
        return true;
    }

    /**
     * Update an existing annotation
     * @param {string} annotationId - ID of annotation to update
     * @param {Object} updates - Fields to update
     */
    updateAnnotation(annotationId, updates) {
        const annotation = this.annotations.find(a => a.id === annotationId);
        if (!annotation) {
            console.warn('Annotation not found:', annotationId);
            return false;
        }

        // Apply updates
        Object.assign(annotation, updates);
        annotation.metadata = annotation.metadata || {};
        annotation.metadata.modified = new Date().toISOString();

        // Save if auto-save enabled
        if (this.options.autoSave) {
            this.saveAnnotationsToStorage();
        }

        // Emit update events
        this.emit('annotationUpdated', { annotation, updates });
        this.emit('annotationsChanged', { annotations: this.annotations });

        return true;
    }

    /**
     * Remove an annotation
     * @param {string} annotationId - ID of annotation to remove
     */
    removeAnnotation(annotationId) {
        const index = this.annotations.findIndex(a => a.id === annotationId);
        if (index === -1) {
            console.warn('Annotation not found:', annotationId);
            return false;
        }

        const annotation = this.annotations[index];
        
        // Remove marker from scene
        const marker = this.markers.get(annotationId);
        if (marker) {
            if (this.scene) {
                this.scene.remove(marker);
            }
            this.markers.delete(annotationId);
        }

        // Remove from array
        this.annotations.splice(index, 1);

        // Hide card if this annotation was active
        if (this.activeAnnotation && this.activeAnnotation.id === annotationId) {
            this.hideAnnotationCard();
        }

        // Save if auto-save enabled
        if (this.options.autoSave) {
            this.saveAnnotationsToStorage();
        }

        // Emit removal events
        this.emit('annotationRemoved', { annotation });
        this.emit('annotationsChanged', { annotations: this.annotations });

        return true;
    }

    showAnnotationCard(annotation) {
        // Remove any existing card first
        this.hideAnnotationCard();
        
        // Ensure we have the required components
        if (!this.camera || !this.renderer) {
            console.warn('Missing camera or renderer for annotation card positioning');
            return;
        }

        // Get the marker to ensure it exists
        const marker = this.markers.get(annotation.id);
        if (!marker) {
            console.warn('No marker found for annotation:', annotation.id);
            return;
        }
        
        // Check if we're in edit mode
        const isEditMode = this.editMode;
        
        // Create card element using unified card design
        const card = document.createElement('div');
        card.className = 'belowjs-annotation-card belowjs-annotation-card-base';
        card.innerHTML = `
            <div class="belowjs-annotation-card-header">
                <span class="belowjs-annotation-card-index">${annotation.index}.</span>
                <h4 class="belowjs-annotation-card-title" contenteditable="${isEditMode}" data-field="title">${this.escapeHtml(annotation.title)}</h4>
                <div class="belowjs-annotation-card-actions">
                    ${isEditMode ? `
                        <button class="belowjs-annotation-card-action-btn card-camera" title="Update camera view">📷</button>
                        <button class="belowjs-annotation-card-action-btn card-delete" title="Delete annotation">🗑️</button>
                    ` : ''}
                    <button class="belowjs-annotation-card-action-btn card-close" title="Close">×</button>
                </div>
            </div>
            <div class="belowjs-annotation-card-content">
                <div class="belowjs-annotation-card-description" contenteditable="${isEditMode}" data-field="description">${this.escapeHtml(annotation.description || '')}</div>
            </div>
        `;
        
        // Store references before DOM manipulation
        this.activeCard = card;
        this.activePanel = annotation;
        
        // Add event listeners before adding to DOM
        const closeBtn = card.querySelector('.card-close');
        closeBtn.addEventListener('click', () => this.hideAnnotationCard());
        
        // Add camera and delete button handlers for edit mode
        if (isEditMode) {
            const cameraBtn = card.querySelector('.card-camera');
            const deleteBtn = card.querySelector('.card-delete');
            
            if (cameraBtn) {
                cameraBtn.addEventListener('click', () => this.updateAnnotationCameraView(annotation.id));
            }
            
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => {
                    if (confirm('Are you sure you want to delete this annotation?')) {
                        this.removeAnnotation(annotation.id);
                    }
                });
            }
        }
        
        // Add editing functionality if in edit mode
        if (isEditMode) {
            this.setupCardEditing(card, annotation);
        }
        
        // Position card (do this before adding to DOM for better performance)
        this.positionCard(card, annotation);
        
        // Add to DOM
        this.container.appendChild(card);
        
        // Set up click-outside handler with proper cleanup
        this.setupCardClickOutside(card);
        
        // Start continuous position updates
        this.startCardPositionUpdates(annotation);
        
        // Animate in immediately (no RAF needed)
        card.classList.add('active');
        
        console.log('Annotation card shown for:', annotation.title);
    }

    setupCardEditing(card, annotation) {
        const editableElements = card.querySelectorAll('[contenteditable="true"]');
        
        editableElements.forEach(element => {
            // Save on blur
            element.addEventListener('blur', () => {
                const field = element.dataset.field;
                const newValue = element.textContent.trim();
                const currentValue = annotation[field];
                
                if (newValue !== currentValue) {
                    this.updateAnnotation(annotation.id, { [field]: newValue });
                    // Emit event so manager can sync
                    this.emit('annotationUpdated', { annotation, updates: { [field]: newValue }, source: 'card' });
                }
            });

            // Save on Enter key
            element.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    element.blur(); // Trigger save
                }
            });
        });
    }

    setupCardClickOutside(card) {
        // Clean up any existing click outside handler
        if (this.cardClickOutsideHandler) {
            document.removeEventListener('click', this.cardClickOutsideHandler);
        }
        
        // Create new handler
        this.cardClickOutsideHandler = (event) => {
            if (!card.contains(event.target)) {
                this.hideAnnotationCard();
            }
        };
        
        // Add with slight delay to avoid immediate closure
        setTimeout(() => {
            document.addEventListener('click', this.cardClickOutsideHandler);
        }, 100);
    }

    hideAnnotationCard() {
        // Stop card position updates
        this.stopCardPositionUpdates();
        
        // Clean up click outside handler
        if (this.cardClickOutsideHandler) {
            document.removeEventListener('click', this.cardClickOutsideHandler);
            this.cardClickOutsideHandler = null;
        }
        
        // Remove card from DOM
        if (this.activeCard) {
            this.activeCard.remove();
            this.activeCard = null;
        }
        
        // Clear references
        this.activePanel = null;
        this.activeAnnotation = null;
        
        // Reset opacity for all annotations
        this.updateAnnotationOpacity();
        
        // Emit deselection event
        this.emit('annotationDeselected');
    }

    positionCard(card, annotation) {
        // Get 3D position of annotation
        const marker = this.markers.get(annotation.id);
        if (!marker || !this.camera || !this.renderer) {
            // Fallback positioning
            card.style.position = 'fixed';
            card.style.left = '50px';
            card.style.top = '100px';
            card.style.zIndex = '1001';
            return;
        }
        
        try {
            // Project 3D position to screen coordinates
            const vector = marker.position.clone();
            vector.project(this.camera);
            
            const canvas = this.renderer.domElement;
            const rect = canvas.getBoundingClientRect();
            
            const x = (vector.x * 0.5 + 0.5) * rect.width + rect.left;
            const y = (-vector.y * 0.5 + 0.5) * rect.height + rect.top;
            
            // Position card with offset to avoid overlapping marker
            // Always position to the right of the marker with some padding
            const cardWidth = 280; // Card width from CSS
            const offsetX = 40; // Distance from marker
            const offsetY = -20; // Slight upward offset
            
            let finalX = x + offsetX;
            let finalY = y + offsetY;
            
            // Keep card on screen - if it would go off right edge, position to left of marker
            if (finalX + cardWidth > window.innerWidth - 20) {
                finalX = x - cardWidth - offsetX;
            }
            
            // Keep card within screen bounds
            finalX = Math.max(20, Math.min(finalX, window.innerWidth - cardWidth - 20));
            finalY = Math.max(20, Math.min(finalY, window.innerHeight - 200));
            
            card.style.position = 'fixed';
            card.style.left = finalX + 'px';
            card.style.top = finalY + 'px';
            card.style.zIndex = '1001';
        } catch (error) {
            console.warn('Error positioning annotation card:', error);
            // Fallback positioning
            card.style.position = 'fixed';
            card.style.left = '50px';
            card.style.top = '100px';
            card.style.zIndex = '1001';
        }
    }
    
    /**
     * Start continuous position updates for the active card
     */
    startCardPositionUpdates(annotation) {
        if (this.cardPositionUpdateId) {
            this.stopCardPositionUpdates();
        }
        
        const updatePosition = () => {
            if (this.activeCard && this.activeAnnotation && annotation.id === this.activeAnnotation.id) {
                this.positionCard(this.activeCard, annotation);
                this.cardPositionUpdateId = requestAnimationFrame(updatePosition);
            }
        };
        
        this.cardPositionUpdateId = requestAnimationFrame(updatePosition);
    }
    
    /**
     * Stop continuous position updates for cards
     */
    stopCardPositionUpdates() {
        if (this.cardPositionUpdateId) {
            cancelAnimationFrame(this.cardPositionUpdateId);
            this.cardPositionUpdateId = null;
        }
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getCurrentCameraView() {
        return {
            position: {
                x: this.camera?.position?.x || 0,
                y: this.camera?.position?.y || 0,
                z: this.camera?.position?.z || 0
            },
            target: {
                x: this.controls?.target?.x || 0,
                y: this.controls?.target?.y || 0,
                z: this.controls?.target?.z || 0
            },
            fov: this.camera?.fov || 75
        };
    }

    animateToAnnotation(annotation, duration = 2000) {
        if (!annotation.cameraView) return;
        
        if (!this.camera || !this.controls) return;

        // Stop any existing animation
        if (this.currentAnimation) {
            cancelAnimationFrame(this.currentAnimation);
            this.currentAnimation = null;
        }

        const start = {
            position: this.camera.position.clone(),
            target: this.controls.target.clone()
        };

        const end = {
            position: new THREE.Vector3(
                annotation.cameraView.position.x,
                annotation.cameraView.position.y,
                annotation.cameraView.position.z
            ),
            target: new THREE.Vector3(
                annotation.cameraView.target.x,
                annotation.cameraView.target.y,
                annotation.cameraView.target.z
            )
        };

        const startTime = performance.now();
        let animationId;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = this.easeInOutCubic(progress);

            this.camera.position.lerpVectors(start.position, end.position, eased);
            this.controls.target.lerpVectors(start.target, end.target, eased);
            this.controls.update();

            if (progress < 1) {
                animationId = requestAnimationFrame(animate);
                this.currentAnimation = animationId;
            } else {
                this.currentAnimation = null;
                // Emit animation complete event
                this.emit('cameraAnimationComplete', { annotation });
            }
        };

        animationId = requestAnimationFrame(animate);
        this.currentAnimation = animationId;
        
        // Emit animation start event
        this.emit('cameraAnimationStart', { annotation });
    }

    stopCameraAnimation() {
        if (this.currentAnimation) {
            cancelAnimationFrame(this.currentAnimation);
            this.currentAnimation = null;
            this.emit('cameraAnimationInterrupted');
            console.log('Camera animation interrupted');
        }
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    updateAnnotationList() {
        const listElement = document.getElementById('annotationList');
        if (listElement) {
            listElement.innerHTML = '';

            this.annotations.forEach(annotation => {
                const item = document.createElement('div');
                item.className = 'annotation-item';
                item.textContent = `${annotation.index}. ${annotation.title}`;
                item.addEventListener('click', () => this.selectAnnotation(annotation));
                listElement.appendChild(item);
            });
        }
    }

    /**
     * Storage and Export/Import
     */
    saveAnnotationsToStorage() {
        const data = this.createAnnotationData();
        localStorage.setItem('belowjs_annotations', JSON.stringify(data));
    }

    loadAnnotationsFromStorage() {
        const stored = localStorage.getItem('belowjs_annotations');
        if (stored) {
            try {
                const data = JSON.parse(stored);
                this.loadAnnotations(data);
            } catch (error) {
                console.error('Failed to load annotations from storage:', error);
            }
        }
    }

    loadAnnotations(data) {
        try {
            this.validateAnnotationData(data);
            
            // Clear existing annotations
            this.clearAnnotations();
            
            // Load new annotations
            this.annotations = data.annotations;
            this.nextIndex = Math.max(...this.annotations.map(a => a.index), 0) + 1;
            
            // Create markers for all annotations
            this.annotations.forEach(annotation => {
                this.createMarker(annotation);
            });
            
            // Emit events
            this.emit('annotationsLoaded', { data, annotations: this.annotations });
            this.emit('annotationsChanged', { annotations: this.annotations });
            
            console.log(`Loaded ${this.annotations.length} annotations`);
            
        } catch (error) {
            console.error('Failed to load annotations:', error);
            this.emit('annotationError', { error, message: 'Failed to load annotations' });
        }
    }

    clearAnnotations() {
        // Remove all markers from scene
        this.markers.forEach(marker => {
            if (this.scene) {
                this.scene.remove(marker);
            }
        });
        
        this.markers.clear();
        this.annotations = [];
        this.activeAnnotation = null;
        this.hideAnnotationCard();
        
        // Emit events
        this.emit('annotationsCleared');
        this.emit('annotationsChanged', { annotations: this.annotations });
    }

    exportAnnotations() {
        const data = this.createAnnotationData();
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `annotations_${Date.now()}.json`;
        this.container.appendChild(a);
        a.click();
        this.container.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('Exported annotations:', data);
    }

    importAnnotations(file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                this.loadAnnotations(data);
            } catch (error) {
                console.error('Failed to import annotations:', error);
                alert('Failed to import annotations: Invalid JSON file');
            }
        };
        reader.readAsText(file);
    }

    /**
     * Cleanup
     */
    dispose() {
        this.clearAnnotations();
        this.hideAnnotationCard();
        
        // Clean up event listeners
        if (this.cardClickOutsideHandler) {
            document.removeEventListener('click', this.cardClickOutsideHandler);
            this.cardClickOutsideHandler = null;
        }
        
        // Stop any running animations
        if (this.currentAnimation) {
            cancelAnimationFrame(this.currentAnimation);
            this.currentAnimation = null;
        }
        
        // Stop card position updates
        this.stopCardPositionUpdates();
    }
}