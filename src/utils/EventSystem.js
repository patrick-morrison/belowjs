/**
 * Event system utility for BelowJS
 */
export class EventSystem {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    return this;
  }

  off(event, callback) {
    if (!this.events[event]) return this;
    
    if (callback) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    } else {
      this.events[event] = [];
    }
    return this;
  }

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

  removeAllListeners() {
    this.events = {};
    return this;
  }
}
