/**
 * EventSystem - Simple event emitter for BelowJS components
 * 
 * Provides event-driven communication between BelowJS components with error
 * handling and a chainable API. Used as a base class for all major BelowJS classes.
 * 
 * @class EventSystem
 * 
 * @example
 * // Extend EventSystem for your own classes
 * class MyViewer extends EventSystem {
 *   constructor() {
 *     super();
 *   }
 *   
 *   loadModel() {
 *     this.emit('loading-start');
 *     // ... loading logic ...
 *     this.emit('model-loaded', { model });
 *   }
 * }
 * 
 * @example
 * // Listen to events
 * viewer.on('model-loaded', (data) => {
 *   console.log('Model loaded:', data.model);
 * });
 * 
 * // Remove specific listener
 * viewer.off('model-loaded', myCallback);
 * 
 * // Remove all listeners for an event
 * viewer.off('model-loaded');
 * 
 * @since 1.0.0
 */
export class EventSystem {
  /**
   * Creates a new EventSystem instance
   */
  constructor() {
    this.events = {};
  }

  /**
   * Add an event listener
   * 
   * @method on
   * @param {string} event - Event name to listen for
   * @param {Function} callback - Callback function to execute
   * @returns {EventSystem} Returns this for chaining
   * 
   * @example
   * // Listen for model loading events
   * viewer.on('model-loaded', (data) => {
   *   console.log('Loaded:', data.model.name);
   * });
   * 
   * // Chain multiple listeners
   * viewer
   *   .on('model-loaded', onLoaded)
   *   .on('model-error', onError);
   * 
   * @since 1.0.0
   */
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    return this;
  }

  /**
   * Remove an event listener
   * 
   * @method off
   * @param {string} event - Event name
   * @param {Function} [callback] - Specific callback to remove (optional)
   * @returns {EventSystem} Returns this for chaining
   * 
   * @example
   * // Remove specific callback
   * viewer.off('model-loaded', myCallback);
   * 
   * // Remove all listeners for an event
   * viewer.off('model-loaded');
   * 
   * @since 1.0.0
   */
  off(event, callback) {
    if (!this.events[event]) return this;
    
    if (callback) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    } else {
      this.events[event] = [];
    }
    return this;
  }

  /**
   * Emit an event to all listeners
   * 
   * @method emit
   * @param {string} event - Event name to emit
   * @param {*} [data] - Data to pass to event listeners
   * @returns {EventSystem} Returns this for chaining
   * 
   * @example
   * // Emit event with data
   * this.emit('model-loaded', { 
   *   model: loadedModel, 
   *   loadTime: Date.now() - startTime 
   * });
   * 
   * // Emit event without data
   * this.emit('rendering-complete');
   * 
   * @since 1.0.0
   */
  emit(event, data) {
    if (!this.events[event]) return this;
    
    this.events[event].forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event callback for '${event}':`, error);
      }
    });
    return this;
  }

  /**
   * Remove all event listeners
   * 
   * @method removeAllListeners
   * @returns {EventSystem} Returns this for chaining
   * 
   * @example
   * // Clean up all listeners
   * viewer.removeAllListeners();
   * 
   * @since 1.0.0
   */
  removeAllListeners() {
    this.events = {};
    return this;
  }
}
