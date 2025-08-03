/**
 * BelowJS Annotation Manager UI
 * Provides a complete UI for managing annotations: create, edit, delete, import, export
 */

export class AnnotationManager {
    constructor(annotationSystem, options = {}) {
        this.annotationSystem = annotationSystem;
        this.options = {
            theme: 'light', // 'light' or 'dark'
            position: 'right', // 'left' or 'right'
            collapsed: false,
            showFileControls: true,
            container: null, // Will use annotationSystem.container if not provided
            ...options
        };
        
        this.element = null;
        this.isCollapsed = this.options.collapsed || false; // Default to expanded
        
        this.init();
    }

    init() {
        this.createElement();
        this.attachEventListeners();
        this.updateAnnotationList();
        
        // Listen for annotation system changes
        if (this.annotationSystem) {
            // Update list when annotations change
            this.annotationSystem.on('annotationAdded', () => this.updateAnnotationList());
            this.annotationSystem.on('annotationRemoved', () => this.updateAnnotationList());
            this.annotationSystem.on('annotationsLoaded', () => this.updateAnnotationList());
            this.annotationSystem.on('annotationsChanged', () => this.updateAnnotationList());
            this.annotationSystem.on('annotationUpdated', (data) => {
                // Refresh list when annotation is updated from card or manager
                if (data.source === 'card') {
                    this.updateAnnotationList();
                }
            });
            this.annotationSystem.on('annotationSelected', (data) => this.onAnnotationSelected(data.annotation));
            this.annotationSystem.on('annotationDeselected', () => this.onAnnotationDeselected());
        }
    }

    createElement() {
        // Remove any existing annotation manager first
        const existingManager = document.querySelector('.belowjs-annotation-manager');
        if (existingManager) {
            existingManager.remove();
            console.log('Removed existing annotation manager');
        }
        
        this.element = document.createElement('div');
        this.element.className = `belowjs-annotation-manager ${this.options.theme}-theme ${this.isCollapsed ? 'collapsed' : ''}`;
        
        // Left side is now default, right side needs adjustment
        if (this.options.position === 'right') {
            this.element.style.left = 'auto';
            this.element.style.right = '0';
        }
        
        this.element.innerHTML = `
            <div class="manager-panel">
                <div class="manager-header">
                    <h3 class="manager-title">Annotations</h3>
                    <button class="manager-minimize" title="Collapse panel">‹</button>
                </div>
                <div class="manager-content">
                    <div class="manager-controls">
                        <button class="control-btn" id="editModeBtn">Edit Mode</button>
                        <button class="control-btn" id="clearAllBtn">Clear All</button>
                    </div>
                    
                    <div class="manager-list-container">
                        <div class="manager-list" id="annotationList">
                            <!-- Annotation items will be populated here -->
                        </div>
                    </div>
                    
                    ${this.options.showFileControls ? `
                    <div class="manager-shelf">
                        <div class="shelf-divider"></div>
                        <div class="shelf-controls">
                            <button class="shelf-btn" id="exportBtn">Export JSON</button>
                            <button class="shelf-btn" id="importBtn">Import JSON</button>
                            <input type="file" class="file-input" id="importFile" accept=".json">
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Use provided container or fall back to annotationSystem container
        const container = this.options.container || (this.annotationSystem && this.annotationSystem.container) || document.body;
        container.appendChild(this.element);
        
        // Create tab separately so it doesn't move with panel transform
        this.createTab();
    }
    
    createTab() {
        // Remove any existing tab first
        const existingTab = document.querySelector('.belowjs-annotation-tab');
        if (existingTab) {
            existingTab.remove();
        }
        
        this.tabElement = document.createElement('div');
        this.tabElement.className = `belowjs-annotation-tab ${this.isCollapsed ? 'collapsed' : ''}`;
        this.tabElement.id = 'managerTab';
        this.tabElement.innerHTML = `
            <span class="tab-label">Annotations</span>
        `;
        
        // Use same container as the main element
        const container = this.options.container || (this.annotationSystem && this.annotationSystem.container) || document.body;
        container.appendChild(this.tabElement);
    }

    attachEventListeners() {
        const minimizeBtn = this.element.querySelector('.manager-minimize');
        const editModeBtn = this.element.querySelector('#editModeBtn');
        const clearAllBtn = this.element.querySelector('#clearAllBtn');
        const exportBtn = this.element.querySelector('#exportBtn');
        const importBtn = this.element.querySelector('#importBtn');
        const importFile = this.element.querySelector('#importFile');
        const managerTab = this.tabElement || document.querySelector('#managerTab');

        // Minimize panel
        minimizeBtn?.addEventListener('click', () => this.toggleMinimize());

        // Edit mode toggle
        editModeBtn?.addEventListener('click', () => this.toggleEditMode());

        // Clear all annotations
        clearAllBtn?.addEventListener('click', () => this.clearAllAnnotations());

        // Export annotations
        exportBtn?.addEventListener('click', () => this.exportAnnotations());

        // Import annotations
        importBtn?.addEventListener('click', () => importFile?.click());
        importFile?.addEventListener('change', (event) => this.importAnnotations(event));

        // Toggle manager panel
        managerTab?.addEventListener('click', () => this.toggleMinimize());

        // ESC key to exit edit mode
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.annotationSystem?.editMode) {
                this.toggleEditMode();
            }
        });
    }

    toggleMinimize() {
        this.isCollapsed = !this.isCollapsed;
        const minimizeBtn = this.element.querySelector('.manager-minimize');
        const tabArrow = this.tabElement?.querySelector('.tab-arrow');
        
        console.log('Toggling collapse state. Current:', this.isCollapsed);
        
        if (this.isCollapsed) {
            this.element.classList.add('collapsed');
            if (this.tabElement) {
                this.tabElement.classList.add('collapsed');
            }
            if (minimizeBtn) {
                minimizeBtn.textContent = '›';
                minimizeBtn.title = 'Expand panel';
            }
        } else {
            this.element.classList.remove('collapsed');
            if (this.tabElement) {
                this.tabElement.classList.remove('collapsed');
            }
            if (minimizeBtn) {
                minimizeBtn.textContent = '‹';
                minimizeBtn.title = 'Collapse panel';
            }
        }
        
        console.log('Collapse state after toggle:', this.isCollapsed, 'Panel classes:', this.element.className, 'Tab classes:', this.tabElement?.className);
    }

    toggleEditMode() {
        if (!this.annotationSystem) {
            console.warn('No annotation system available for edit mode toggle');
            return;
        }
        
        const editBtn = this.element.querySelector('#editModeBtn');
        
        console.log('Toggling edit mode. Current state:', this.annotationSystem.editMode);
        
        if (this.annotationSystem.editMode) {
            this.annotationSystem.exitEditMode();
            if (editBtn) {
                editBtn.textContent = 'Edit Mode';
                editBtn.classList.remove('active');
            }
            // Remove edit-mode class from manager
            this.element.classList.remove('edit-mode');
        } else {
            this.annotationSystem.enterEditMode();
            if (editBtn) {
                editBtn.textContent = 'Exit Edit';
                editBtn.classList.add('active');
            }
            // Add edit-mode class to manager
            this.element.classList.add('edit-mode');
        }
        
        console.log('Edit mode after toggle:', this.annotationSystem.editMode);
        
        // Refresh the list to update visibility
        this.updateAnnotationList();
    }

    syncEditModeState() {
        if (!this.annotationSystem || !this.element) return;

        const isEditMode = this.annotationSystem.editMode;
        const editBtn = this.element.querySelector('#editModeBtn');

        // Update manager class
        if (isEditMode) {
            this.element.classList.add('edit-mode');
        } else {
            this.element.classList.remove('edit-mode');
        }

        // Update button state
        if (editBtn) {
            if (isEditMode) {
                editBtn.textContent = 'Exit Edit';
                editBtn.classList.add('active');
            } else {
                editBtn.textContent = 'Edit Mode';
                editBtn.classList.remove('active');
            }
        }
    }

    clearAllAnnotations() {
        if (!this.annotationSystem) return;
        
        if (confirm('Are you sure you want to clear all annotations? This cannot be undone.')) {
            this.annotationSystem.clearAnnotations();
            this.updateAnnotationList();
        }
    }

    exportAnnotations() {
        if (!this.annotationSystem) return;
        this.annotationSystem.exportAnnotations();
    }

    importAnnotations(event) {
        if (!this.annotationSystem) return;
        
        const file = event.target.files[0];
        if (file) {
            this.annotationSystem.importAnnotations(file);
        }
    }

    updateAnnotationList() {
        const listElement = this.element?.querySelector('#annotationList');
        if (!listElement || !this.annotationSystem) return;

        // Sync edit mode visual state
        this.syncEditModeState();

        const annotations = this.annotationSystem.annotations || [];
        
        if (annotations.length === 0) {
            listElement.innerHTML = `
                <div style="text-align: center; color: #666; font-size: 13px; padding: 20px;">
                    No annotations yet.<br>
                    ${this.annotationSystem.editMode ? 'Click on the 3D model to add annotations.' : 'Enter edit mode to start adding annotations.'}
                </div>
            `;
            return;
        }

        const isEditMode = this.annotationSystem?.editMode || false;
        
        listElement.innerHTML = annotations.map((annotation, displayIndex) => `
            <div class="annotation-list-item belowjs-annotation-card-base" data-annotation-id="${annotation.id}" draggable="${isEditMode}">
                <div class="belowjs-annotation-card-header">
                    <span class="drag-handle">⋮⋮</span>
                    <span class="belowjs-annotation-card-index">${displayIndex + 1}.</span>
                    <span class="belowjs-annotation-card-title" contenteditable="${isEditMode}" data-field="title">${this.escapeHtml(annotation.title)}</span>
                    <div class="belowjs-annotation-card-actions">
                        <button class="belowjs-annotation-card-action-btn item-camera-btn" title="Update camera view" data-annotation-id="${annotation.id}">📷</button>
                        <button class="belowjs-annotation-card-action-btn item-delete" title="Delete annotation">🗑️</button>
                    </div>
                </div>
                <div class="belowjs-annotation-card-content">
                    <div class="belowjs-annotation-card-description" contenteditable="${isEditMode}" data-field="description">${this.escapeHtml(annotation.description || '')}</div>
                </div>
            </div>
        `).join('');

        // Add event handlers for annotation items
        listElement.querySelectorAll('.annotation-list-item').forEach(item => {
            const annotationId = item.dataset.annotationId;
            const annotation = annotations.find(a => a.id === annotationId);
            
            // Click to select annotation (but not on editable fields)
            item.addEventListener('click', (event) => {
                // Don't select if clicking on editable content or action buttons
                if (event.target.contentEditable === 'true' || 
                    event.target.classList.contains('belowjs-annotation-card-action-btn') ||
                    event.target.classList.contains('item-delete')) {
                    return;
                }
                
                if (annotation) {
                    this.selectAnnotation(annotation);
                }
            });

            // Handle inline editing for title and description (only in edit mode)
            if (isEditMode) {
                const editableElements = item.querySelectorAll('[contenteditable="true"]');
                editableElements.forEach(element => {
                    // Save on blur
                    element.addEventListener('blur', () => {
                        const field = element.dataset.field;
                        const newValue = element.textContent.trim();
                        const currentValue = annotation[field];
                        
                        if (newValue !== currentValue) {
                            this.updateAnnotationField(annotationId, field, newValue);
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

            // Handle delete button
            const deleteBtn = item.querySelector('.item-delete');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (event) => {
                    event.stopPropagation();
                    this.deleteAnnotation(annotationId);
                });
            }

            // Handle camera update button
            const cameraBtn = item.querySelector('.item-camera-btn');
            if (cameraBtn) {
                cameraBtn.addEventListener('click', (event) => {
                    event.stopPropagation();
                    this.updateAnnotationCamera(annotationId);
                });
            }

            // Add drag and drop event listeners only in edit mode
            if (isEditMode) {
                this.setupDragAndDrop(item, annotationId);
            }
        });
    }

    selectAnnotation(annotation) {
        if (!this.annotationSystem) return;
        
        // Trigger annotation selection in system
        this.annotationSystem.selectAnnotation(annotation);
    }

    onAnnotationSelected(annotation) {
        // Update active state in list
        this.element.querySelectorAll('.annotation-list-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeItem = this.element.querySelector(`[data-annotation-id="${annotation.id}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
        
        // Update camera button state
        this.updateCameraButtonState();
    }

    onAnnotationDeselected() {
        // Remove active state from all items
        this.element.querySelectorAll('.annotation-list-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Update camera button state
        this.updateCameraButtonState();
    }

    updateAnnotationField(annotationId, field, value) {
        if (!this.annotationSystem) return;
        
        const updates = {};
        updates[field] = value;
        
        this.annotationSystem.updateAnnotation(annotationId, updates);
        
        // Find the annotation and emit update event for card syncing
        const annotation = this.annotationSystem.annotations.find(a => a.id === annotationId);
        if (annotation) {
            this.annotationSystem.emit('annotationUpdated', { annotation, updates, source: 'manager' });
        }
        
        console.log(`Updated annotation ${annotationId} ${field}:`, value);
    }

    deleteAnnotation(annotationId) {
        if (!this.annotationSystem) return;
        
        if (confirm('Are you sure you want to delete this annotation?')) {
            this.annotationSystem.removeAnnotation(annotationId);
        }
    }

    setTheme(theme) {
        this.options.theme = theme;
        this.element.className = `belowjs-annotation-manager ${theme}-theme`;
    }

    show() {
        if (this.element) {
            this.element.classList.remove('hidden');
        }
    }

    hide() {
        if (this.element) {
            this.element.classList.add('hidden');
        }
    }

    updateSelectedCamera() {
        if (!this.annotationSystem || !this.annotationSystem.activeAnnotation) {
            console.warn('No annotation selected');
            return;
        }
        
        const annotationId = this.annotationSystem.activeAnnotation.id;
        if (this.annotationSystem.updateAnnotationCameraView(annotationId)) {
            // Update the display
            this.updateAnnotationList();
            console.log('Camera position updated for annotation:', annotationId);
        }
    }

    updateCameraButtonState() {
        // Visibility is now handled inline in the template
        // This method can be removed or used for other button state updates
    }


    updateAnnotationCamera(annotationId) {
        if (!this.annotationSystem) return;
        
        if (this.annotationSystem.updateAnnotationCameraView(annotationId)) {
            console.log('Camera position updated for annotation:', annotationId);
        }
    }

    setupDragAndDrop(item, annotationId) {
        let draggedElement = null;

        item.addEventListener('dragstart', (e) => {
            console.log('Drag started for:', annotationId);
            draggedElement = item;
            item.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', item.outerHTML);
        });

        item.addEventListener('dragend', () => {
            console.log('Drag ended for:', annotationId);
            item.classList.remove('dragging');
            draggedElement = null;
            // Clean up any drag-over classes
            document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            
            if (draggedElement && draggedElement !== item) {
                item.classList.add('drag-over');
            }
        });

        item.addEventListener('dragleave', () => {
            item.classList.remove('drag-over');
        });

        item.addEventListener('drop', (e) => {
            e.preventDefault();
            item.classList.remove('drag-over');
            
            if (draggedElement && draggedElement !== item) {
                console.log('Dropping:', draggedElement.dataset.annotationId, 'on:', item.dataset.annotationId);
                this.reorderAnnotations(draggedElement.dataset.annotationId, item.dataset.annotationId);
            }
        });
    }

    reorderAnnotations(draggedId, targetId) {
        if (!this.annotationSystem) return;

        console.log('Reordering annotations:', draggedId, '->', targetId);
        
        const annotations = this.annotationSystem.annotations;
        const draggedIndex = annotations.findIndex(a => a.id === draggedId);
        const targetIndex = annotations.findIndex(a => a.id === targetId);

        console.log('Found indexes:', draggedIndex, '->', targetIndex);

        if (draggedIndex === -1 || targetIndex === -1) {
            console.warn('Could not find annotation indexes');
            return;
        }

        // Remove dragged item and insert at target position
        const [draggedAnnotation] = annotations.splice(draggedIndex, 1);
        annotations.splice(targetIndex, 0, draggedAnnotation);

        console.log('Reordered array, updating indexes...');

        // Update display indexes and markers
        this.updateAnnotationIndexes();
        
        // Save and refresh
        if (this.annotationSystem.options.autoSave) {
            this.annotationSystem.saveAnnotationsToStorage();
        }
        
        console.log('Refreshing annotation list...');
        this.updateAnnotationList();
        this.annotationSystem.emit('annotationsReordered', { annotations: annotations });
    }

    updateAnnotationIndexes() {
        if (!this.annotationSystem) return;

        console.log('Updating annotation indexes...');

        // Update display indexes (1-based) and marker numbers
        this.annotationSystem.annotations.forEach((annotation, index) => {
            const newIndex = index + 1;
            const oldIndex = annotation.index;
            annotation.index = newIndex;
            
            console.log(`Updating annotation ${annotation.id}: ${oldIndex} -> ${newIndex}`);

            // Update the marker if it exists
            const marker = this.annotationSystem.markers.get(annotation.id);
            if (marker) {
                console.log(`Recreating marker for annotation ${annotation.id} with new index ${newIndex}`);
                // Remove old marker
                this.annotationSystem.markers.delete(annotation.id);
                if (this.annotationSystem.scene) {
                    this.annotationSystem.scene.remove(marker);
                }
                // Create new marker with updated index
                this.annotationSystem.createMarker(annotation);
            } else {
                console.warn(`No marker found for annotation ${annotation.id}`);
            }
        });

        // Update nextIndex for new annotations
        this.annotationSystem.nextIndex = this.annotationSystem.annotations.length + 1;
        console.log('Updated nextIndex to:', this.annotationSystem.nextIndex);
        
        // Update opacity for all markers after recreation
        this.annotationSystem.updateAnnotationOpacity();
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    dispose() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
        if (this.tabElement) {
            this.tabElement.remove();
            this.tabElement = null;
        }
    }
}