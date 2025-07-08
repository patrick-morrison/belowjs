/**
 * VRComfortGlyph - Packaged VR comfort toggle component
 * 
 * A reusable floating comfort mode toggle button that can be easily
 * integrated into any VR application.
 */

export class VRComfortGlyph {
  constructor(vrManager, options = {}) {
    this.vrManager = vrManager;
    this.isComfortMode = false;
    
    // Configuration options
    this.options = {
      containerId: options.containerId || null, // If null, appends to body
      position: options.position || 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
      offsetX: options.offsetX || 20,
      offsetY: options.offsetY || 70, // Above status indicator
      ...options
    };
    
    this.element = null;
    this.init();
  }
  
  init() {
    this.createElement();
    this.attachStyles();
    this.attachEvents();
    this.updateVisualState();
  }
  
  createElement() {
    // Create the glyph element
    this.element = document.createElement('div');
    this.element.id = 'vrComfortGlyph';
    this.element.className = 'vr-comfort-glyph comfort-off';
    this.element.textContent = '🛡️'; // Always show shield
    this.element.title = 'VR Comfort/Safety: OFF (Smooth Movement)';
    this.element.tabIndex = 0;
    this.element.role = 'button';
    this.element.setAttribute('aria-label', 'VR Comfort/Safety Mode is OFF - Click to turn on');
    
    // Add to DOM
    const container = this.options.containerId ? 
      document.getElementById(this.options.containerId) : 
      document.body;
    
    if (container) {
      container.appendChild(this.element);
    } else {
      console.warn('VRComfortGlyph: Container not found, appending to body');
      document.body.appendChild(this.element);
    }
  }
  
  attachStyles() {
    // Check if styles are already injected
    if (document.getElementById('vr-comfort-glyph-styles')) {
      return;
    }
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'vr-comfort-glyph-styles';
    styleSheet.textContent = `
      /* VR Comfort Glyph Styles */
      .vr-comfort-glyph {
        position: fixed;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.6);
        border: 2px solid #666;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 20px;
        z-index: 10000;
        backdrop-filter: blur(10px);
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        touch-action: manipulation;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      .vr-comfort-glyph:hover {
        transform: scale(1.1);
        background: rgba(0, 0, 0, 0.8);
      }
      
      .vr-comfort-glyph:focus {
        outline: 3px solid #4ade80;
        outline-offset: 2px;
      }
      
      .vr-comfort-glyph.comfort-off {
        color: #666;
        border-color: #666;
        background: rgba(0, 0, 0, 0.6);
        box-shadow: none;
      }
      
      .vr-comfort-glyph.comfort-on {
        color: #4ade80;
        border-color: #4ade80;
        background: rgba(74, 222, 128, 0.1);
        box-shadow: 0 0 20px rgba(74, 222, 128, 0.3);
      }
      
      /* VR Mode Optimizations */
      .vr-mode .vr-comfort-glyph {
        background: rgba(0, 0, 0, 0.9) !important;
        border-width: 3px !important;
        backdrop-filter: blur(15px) !important;
        font-size: 22px !important;
        width: 44px !important;
        height: 44px !important;
      }
      
      .vr-mode .vr-comfort-glyph:hover {
        transform: scale(1.15) !important;
        background: rgba(0, 0, 0, 0.95) !important;
      }
      
      /* Position variants */
      .vr-comfort-glyph.position-bottom-right {
        bottom: var(--vr-comfort-offset-y, 70px);
        right: var(--vr-comfort-offset-x, 20px);
      }
      
      .vr-comfort-glyph.position-bottom-left {
        bottom: var(--vr-comfort-offset-y, 70px);
        left: var(--vr-comfort-offset-x, 20px);
      }
      
      .vr-comfort-glyph.position-top-right {
        top: var(--vr-comfort-offset-y, 20px);
        right: var(--vr-comfort-offset-x, 20px);
      }
      
      .vr-comfort-glyph.position-top-left {
        top: var(--vr-comfort-offset-y, 20px);
        left: var(--vr-comfort-offset-x, 20px);
      }
      
      /* Mobile responsive */
      @media (max-width: 768px) {
        .vr-comfort-glyph {
          width: 48px !important;
          height: 48px !important;
          font-size: 24px !important;
        }
        
        .vr-comfort-glyph.position-bottom-right {
          bottom: var(--vr-comfort-offset-y-mobile, 80px);
          right: var(--vr-comfort-offset-x-mobile, 15px);
        }
        
        .vr-comfort-glyph.position-bottom-left {
          bottom: var(--vr-comfort-offset-y-mobile, 80px);
          left: var(--vr-comfort-offset-x-mobile, 15px);
        }
      }
    `;
    
    document.head.appendChild(styleSheet);
    
    // Set CSS custom properties for positioning
    document.documentElement.style.setProperty('--vr-comfort-offset-x', this.options.offsetX + 'px');
    document.documentElement.style.setProperty('--vr-comfort-offset-y', this.options.offsetY + 'px');
    document.documentElement.style.setProperty('--vr-comfort-offset-x-mobile', (this.options.offsetX - 5) + 'px');
    document.documentElement.style.setProperty('--vr-comfort-offset-y-mobile', (this.options.offsetY + 10) + 'px');
  }
  
  attachEvents() {
    if (!this.element) return;
    
    const toggleComfort = () => {
      this.toggle();
    };
    
    this.element.addEventListener('click', toggleComfort);
    
    // Keyboard support
    this.element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleComfort();
      }
    });
  }
  
  updatePosition() {
    if (!this.element) return;
    
    // Remove existing position classes
    this.element.classList.remove('position-bottom-right', 'position-bottom-left', 'position-top-right', 'position-top-left');
    
    // Add new position class
    this.element.classList.add(`position-${this.options.position}`);
  }
  
  updateVisualState() {
    if (!this.element) return;
    
    // Update position
    this.updatePosition();
    
    // Always show shield glyph
    this.element.textContent = '🛡️';
    if (this.isComfortMode) {
      // Comfort mode ON (teleport + safety)
      this.element.classList.remove('comfort-off');
      this.element.classList.add('comfort-on');
      this.element.title = 'VR Comfort/Safety: ON (Teleport Movement)';
      this.element.setAttribute('aria-label', 'VR Comfort/Safety Mode is ON - Click to turn off');
    } else {
      // Comfort mode OFF (smooth movement)
      this.element.classList.remove('comfort-on');
      this.element.classList.add('comfort-off');
      this.element.title = 'VR Comfort/Safety: OFF (Smooth Movement)';
      this.element.setAttribute('aria-label', 'VR Comfort/Safety Mode is OFF - Click to turn on');
    }
  }
  
  toggle() {
    this.isComfortMode = !this.isComfortMode;
    
    if (this.vrManager) {
      if (this.isComfortMode) {
        // Enable comfort mode (teleport + snap turn)
        this.vrManager.setComfortPreset('max-comfort');
      } else {
        // Disable comfort mode (smooth movement)
        this.vrManager.setComfortPreset('performance');
      }
    }
    
    this.updateVisualState();
    console.log(`🎮 Comfort mode: ${this.isComfortMode ? 'ON (Safe/Teleport)' : 'OFF (Smooth)'}`);
    
    // Trigger custom event
    const event = new CustomEvent('vrcomfortchange', {
      detail: {
        isComfortMode: this.isComfortMode,
        preset: this.isComfortMode ? 'max-comfort' : 'performance'
      }
    });
    this.element.dispatchEvent(event);
  }
  
  setComfortMode(enabled) {
    if (this.isComfortMode !== enabled) {
      this.toggle();
    }
  }
  
  getComfortMode() {
    return this.isComfortMode;
  }
  
  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    
    // Update CSS custom properties if position offsets changed
    if (newOptions.offsetX !== undefined) {
      document.documentElement.style.setProperty('--vr-comfort-offset-x', this.options.offsetX + 'px');
      document.documentElement.style.setProperty('--vr-comfort-offset-x-mobile', (this.options.offsetX - 5) + 'px');
    }
    
    if (newOptions.offsetY !== undefined) {
      document.documentElement.style.setProperty('--vr-comfort-offset-y', this.options.offsetY + 'px');
      document.documentElement.style.setProperty('--vr-comfort-offset-y-mobile', (this.options.offsetY + 10) + 'px');
    }
    
    if (newOptions.position !== undefined) {
      this.updatePosition();
    }
  }
  
  hide() {
    if (this.element) {
      this.element.style.display = 'none';
    }
  }
  
  show() {
    if (this.element) {
      this.element.style.display = 'flex';
    }
  }
  
  dispose() {
    if (this.element) {
      // Remove event listeners
      this.element.removeEventListener('click', this.toggle);
      this.element.removeEventListener('keydown', this.toggle);
      
      // Remove from DOM
      if (this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
      
      this.element = null;
    }
    
    // Remove styles if no other instances exist
    const existingGlyphs = document.querySelectorAll('.vr-comfort-glyph');
    if (existingGlyphs.length === 0) {
      const styleSheet = document.getElementById('vr-comfort-glyph-styles');
      if (styleSheet) {
        styleSheet.remove();
      }
    }
    
    this.vrManager = null;
    console.log('🧹 VR Comfort Glyph disposed');
  }
  
  // Static method to create and initialize
  static create(vrManager, options = {}) {
    return new VRComfortGlyph(vrManager, options);
  }
}
