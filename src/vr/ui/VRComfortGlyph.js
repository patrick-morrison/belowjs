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
    

    this.options = {
      containerId: options.containerId || 'modelSelector', // Default to model selector
      useInlineLayout: options.useInlineLayout !== false, // Default to true for inline layout
      position: options.position || 'bottom-right', // Fallback for floating mode
      offsetX: options.offsetX || 20,
      offsetY: options.offsetY || 120,
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
    if (this.options.useInlineLayout) {
      this.createInlineElement();
    } else {
      this.createFloatingElement();
    }
  }
  
  createInlineElement() {

    const modeToggleContainer = document.getElementById('modeToggleContainer');
    if (!modeToggleContainer) {
      console.warn('VRComfortGlyph: modeToggleContainer not found, falling back to floating mode');
      this.createFloatingElement();
      return;
    }
    

    this.element = document.createElement('div');
    this.element.id = 'vrComfortGlyph';
    this.element.className = 'vr-comfort-circle comfort-off';
    this.element.textContent = '🛡️';
    this.element.tabIndex = 0;
    this.element.role = 'button';
    this.element.title = 'Comfort Mode: OFF (Smooth Movement)';
    this.element.setAttribute('aria-label', 'Comfort Mode is OFF - Click to enable');
    

    const semanticToggle = modeToggleContainer.querySelector('.semantic-toggle');
    if (semanticToggle) {
      modeToggleContainer.insertBefore(this.element, semanticToggle.nextSibling);
    } else {
      modeToggleContainer.appendChild(this.element);
    }
    
    this.updateInlineVisualState();
  }
  
  createFloatingElement() {

    this.element = document.createElement('div');
    this.element.id = 'vrComfortGlyph';
    this.element.className = 'vr-comfort-glyph comfort-off';
    this.element.textContent = '🛡️'; // Always show shield
    this.element.title = 'Comfort Mode: OFF (Smooth Movement)';
    this.element.tabIndex = 0;
    this.element.role = 'button';
    this.element.setAttribute('aria-label', 'Comfort Mode is OFF - Click to enable comfortable movement');
    

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

    if (document.getElementById('vr-comfort-glyph-styles')) {
      return;
    }
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'vr-comfort-glyph-styles';
    styleSheet.textContent = `
      /* VR Comfort Glyph Styles */
      .vr-comfort-glyph {
        position: absolute;
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
      
      /* Inline Comfort Circle Styles - matches Survey/Dive toggle design */
      .vr-comfort-circle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        font-size: 20px;
        margin-left: 15px;
        position: relative;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        touch-action: manipulation;
        overflow: hidden;
        flex-shrink: 0;
      }
      
      .vr-comfort-circle:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
        transform: scale(1.02);
      }
      
      .vr-comfort-circle:focus {
        outline: 2px solid #4ade80;
        outline-offset: 2px;
      }
      
      .vr-comfort-circle:active {
        transform: scale(0.98);
      }
      
      .vr-comfort-circle.comfort-off {
        color: rgba(255, 255, 255, 0.5) !important;
        background: rgba(255, 255, 255, 0.06) !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
        box-shadow: none !important;
      }
      
      .vr-comfort-circle.comfort-off:hover {
        color: rgba(255, 255, 255, 0.7) !important;
        background: rgba(255, 255, 255, 0.1) !important;
        border-color: rgba(255, 255, 255, 0.2) !important;
        box-shadow: none !important;
      }
      
      .vr-comfort-circle.comfort-on {
        color: #4ade80 !important;
        background: rgba(74, 222, 128, 0.1) !important;
        border-color: rgba(74, 222, 128, 0.3) !important;
        box-shadow: 0 0 20px rgba(74, 222, 128, 0.1) !important;
      }
      
      .vr-comfort-circle.comfort-on:hover {
        background: rgba(74, 222, 128, 0.15) !important;
        border-color: rgba(74, 222, 128, 0.4) !important;
        box-shadow: 0 0 30px rgba(74, 222, 128, 0.15) !important;
      }
      
      /* Update modeToggleContainer to flex layout */
      #modeToggleContainer {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 0 !important;
      }
      
      /* Ensure semantic toggle doesn't take full width */
      .semantic-toggle {
        flex-shrink: 0 !important;
      }
      
      /* Original floating glyph styles */
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
        filter: none;
      }
      
      .vr-comfort-glyph.comfort-on {
        color: #4ade80;
        border-color: #4ade80;
        background: rgba(74, 222, 128, 0.1);
        box-shadow: 0 0 20px rgba(74, 222, 128, 0.3);
        filter: drop-shadow(0 0 8px rgba(74, 222, 128, 0.4));
      }
      
      /* Position variants for floating mode */
      .vr-comfort-glyph.position-bottom-right {
        bottom: var(--vr-comfort-offset-y, 120px);
        right: var(--vr-comfort-offset-x, 20px);
      }
      
      .vr-comfort-glyph.position-bottom-left {
        bottom: var(--vr-comfort-offset-y, 120px);
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
        .vr-comfort-circle {
          width: 50px;
          height: 50px;
          font-size: 18px;
          margin-left: 10px;
        }
        
        #modeToggleContainer {
          flex-wrap: nowrap !important;
          justify-content: center !important;
        }
        
        
        .vr-comfort-glyph {
          width: 48px !important;
          height: 48px !important;
          font-size: 24px !important;
        }
        
        .vr-comfort-glyph.position-bottom-right {
          bottom: var(--vr-comfort-offset-y-mobile, 130px);
          right: var(--vr-comfort-offset-x-mobile, 15px);
        }
        
        .vr-comfort-glyph.position-bottom-left {
          bottom: var(--vr-comfort-offset-y-mobile, 130px);
          left: var(--vr-comfort-offset-x-mobile, 15px);
        }
      }
    `;
    
    document.head.appendChild(styleSheet);
    

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
    

    this.element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleComfort();
      }
    });
  }
  
  updatePosition() {
    if (!this.element) return;
    

    this.element.classList.remove('position-bottom-right', 'position-bottom-left', 'position-top-right', 'position-top-left');
    

    this.element.classList.add(`position-${this.options.position}`);
  }
  
  updateVisualState() {
    if (!this.element) return;
    
    if (this.options.useInlineLayout) {
      this.updateInlineVisualState();
    } else {
      this.updateFloatingVisualState();
    }
  }
  
  updateInlineVisualState() {
    if (!this.element) return;
    

    this.element.classList.remove('comfort-off', 'comfort-on');
    this.element.style.removeProperty('background');
    this.element.style.removeProperty('border-color');
    this.element.style.removeProperty('color');
    this.element.style.removeProperty('box-shadow');
    

    this.element.textContent = '🛡️';
    

    this.element.offsetHeight;
    
    if (this.isComfortMode) {

      this.element.classList.add('comfort-on');
      this.element.title = 'Comfort Mode: ON (Teleport Movement)';
      this.element.setAttribute('aria-label', 'Comfort Mode is ON - Click to disable');
    } else {

      this.element.classList.add('comfort-off');
      this.element.title = 'Comfort Mode: OFF (Smooth Movement)';
      this.element.setAttribute('aria-label', 'Comfort Mode is OFF - Click to enable');
    }
    

    setTimeout(() => {
      if (this.element) {
        this.element.offsetHeight;
      }
    }, 0);
  }
  
  updateFloatingVisualState() {
    if (!this.element) return;
    

    this.updatePosition();
    

    this.element.textContent = '🛡️';
    

    this.element.classList.remove('comfort-off', 'comfort-on');
    
    if (this.isComfortMode) {

      this.element.classList.add('comfort-on');
      this.element.title = 'Comfort Mode: ON (Teleport Movement)';
      this.element.setAttribute('aria-label', 'Comfort Mode is ON - Click to disable');
    } else {

      this.element.classList.add('comfort-off');
      this.element.title = 'Comfort Mode: OFF (Smooth Movement)';
      this.element.setAttribute('aria-label', 'Comfort Mode is OFF - Click to enable comfortable movement');
    }
    

    this.element.style.display = 'none';
    this.element.offsetHeight; // Trigger reflow
    this.element.style.display = 'flex';
  }
  
  toggle() {
    this.isComfortMode = !this.isComfortMode;
    
    if (this.vrManager) {
      if (this.isComfortMode) {

        this.vrManager.setComfortPreset('max-comfort');
      } else {

        this.vrManager.setComfortPreset('performance');
      }
    }
    
    this.updateVisualState();
    

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

      this.element.removeEventListener('click', this.toggle);
      this.element.removeEventListener('keydown', this.toggle);
      

      if (this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
      
      this.element = null;
    }
    

    const existingGlyphs = document.querySelectorAll('.vr-comfort-glyph');
    if (existingGlyphs.length === 0) {
      const styleSheet = document.getElementById('vr-comfort-glyph-styles');
      if (styleSheet) {
        styleSheet.remove();
      }
    }
    
    this.vrManager = null;
  }
  

  static create(vrManager, options = {}) {
    return new VRComfortGlyph(vrManager, options);
  }
}
