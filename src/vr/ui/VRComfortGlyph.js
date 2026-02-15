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
    this._iconRendered = false;
    this.lastToggleAt = 0;
    

    this.options = {
      containerId: options.containerId || 'modelSelector',
      useInlineLayout: options.useInlineLayout !== false,
      position: options.position || 'bottom-right',
      offsetX: options.offsetX || 20,
      offsetY: options.offsetY || 120,
      toggleCooldownMs: options.toggleCooldownMs || 180,
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
    this.renderIcon();
    this.element.tabIndex = 0;
    this.element.role = 'button';
    this.element.title = 'Comfort Mode Off';
    this.element.setAttribute('aria-label', 'Comfort mode off. Click to enable.');
    

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
    this.renderIcon();
    this.element.title = 'Comfort Mode Off';
    this.element.tabIndex = 0;
    this.element.role = 'button';
    this.element.setAttribute('aria-label', 'Comfort mode off. Click to enable.');
    

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
    this.renderIcon();
    if (document.getElementById('vr-comfort-glyph-styles')) {
      return;
    }
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'vr-comfort-glyph-styles';
    styleSheet.textContent = `
      .vr-comfort-glyph {
        position: absolute;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: rgba(15, 23, 42, 0.58);
        border: 1px solid rgba(255, 255, 255, 0.22);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 120ms ease, border-color 120ms ease, box-shadow 140ms ease, color 120ms ease;
        font-size: 16px;
        z-index: 10000;
        backdrop-filter: blur(8px);
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
  -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      .vr-comfort-circle {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 120ms ease, border-color 120ms ease, box-shadow 140ms ease, color 120ms ease;
        font-size: 16px;
        margin-left: 10px;
        position: relative;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
  -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        overflow: hidden;
        flex-shrink: 0;
      }
      
      .vr-comfort-circle:hover {
        background: rgba(255, 255, 255, 0.09);
        border-color: rgba(255, 255, 255, 0.18);
      }
      
  .vr-comfort-circle:focus-visible {
        outline: 2px solid transparent;
        outline-offset: 2px;
      }
  .vr-comfort-circle.comfort-on:focus-visible { outline-color: #4ade80; }
  .vr-comfort-circle.comfort-off:focus-visible { outline-color: rgba(255,255,255,0.4); }
      
      .vr-comfort-circle:active {
      }
      
      .vr-comfort-circle.comfort-off {
        color: rgba(255, 255, 255, 0.5) !important;
        background: rgba(255, 255, 255, 0.06) !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
        box-shadow: none !important;
      }
      
      .vr-comfort-circle.comfort-off:hover {
        color: rgba(255, 255, 255, 0.68) !important;
        background: rgba(255, 255, 255, 0.09) !important;
        border-color: rgba(255, 255, 255, 0.18) !important;
        box-shadow: none !important;
      }
      
      .vr-comfort-circle.comfort-on {
        color: rgba(236, 253, 245, 0.98) !important;
        background: rgba(74, 222, 128, 0.14) !important;
        border-color: rgba(74, 222, 128, 0.8) !important;
        box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.86), 0 6px 18px rgba(2, 6, 23, 0.24) !important;
      }
      
      .vr-comfort-circle.comfort-on:hover {
        background: rgba(74, 222, 128, 0.2) !important;
        border-color: rgba(74, 222, 128, 0.9) !important;
        box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.92), 0 8px 22px rgba(2, 6, 23, 0.3) !important;
      }
      
      #modeToggleContainer {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 0 !important;
      }
      
      .semantic-toggle {
        flex-shrink: 0 !important;
      }
      
      .vr-comfort-glyph:hover {
        background: rgba(15, 23, 42, 0.7);
      }
      
  .vr-comfort-glyph:focus-visible {
        outline: 3px solid transparent;
        outline-offset: 2px;
      }
  .vr-comfort-glyph.comfort-on:focus-visible { outline-color: #4ade80; }
  .vr-comfort-glyph.comfort-off:focus-visible { outline-color: rgba(255,255,255,0.35); }
      
      .vr-comfort-glyph.comfort-off {
        color: rgba(226, 232, 240, 0.55);
        border-color: rgba(255, 255, 255, 0.22);
        background: rgba(15, 23, 42, 0.58);
        box-shadow: none;
      }
      
      .vr-comfort-glyph.comfort-on {
        color: rgba(236, 253, 245, 0.98);
        border-color: rgba(74, 222, 128, 0.8);
        background: rgba(74, 222, 128, 0.15);
        box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.86), 0 6px 20px rgba(2, 6, 23, 0.25);
      }

      
      .vr-comfort-emoji {
        display: block;
        font-size: 16px;
        line-height: 1;
        transform: translateY(0.5px);
        transition: transform 90ms ease;
      }
      .vr-comfort-circle:active .vr-comfort-emoji,
      .vr-comfort-glyph:active .vr-comfort-emoji {
        transform: translateY(0.5px) scale(0.98);
      }
      
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
      
      @media (max-width: 768px) {
        .vr-comfort-circle {
          width: 48px;
          height: 48px;
          font-size: 16px;
          margin-left: 8px;
        }
        
        #modeToggleContainer {
          flex-wrap: nowrap !important;
          justify-content: center !important;
        }
        
        
        .vr-comfort-glyph {
          width: 42px !important;
          height: 42px !important;
          font-size: 20px !important;
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
    this._onClick = (e) => {
      this.toggle();
      if (this.element && !(e instanceof KeyboardEvent)) {
        this.element.blur();
      }
    };
    this._onKeydown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.toggle();
      }
    };
    this._onPointerDown = () => {
      if (this.element) this.element.blur();
    };

    this.element.addEventListener('click', this._onClick);
    this.element.addEventListener('keydown', this._onKeydown);
    this.element.addEventListener('pointerdown', this._onPointerDown);
  }

  renderIcon() {
    if (!this.element) return;
    if (!this._iconRendered) {
      const emoji = '🛋️';
      this.element.innerHTML = `<span class="vr-comfort-emoji" aria-hidden="true">${emoji}</span>`;
      this._iconRendered = true;
    }
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
    
    
    if (this.isComfortMode) {

      this.element.classList.add('comfort-on');
      this.element.title = 'Comfort Mode On';
      this.element.setAttribute('aria-label', 'Comfort mode on. Click to disable.');
    } else {

      this.element.classList.add('comfort-off');
      this.element.title = 'Comfort Mode Off';
      this.element.setAttribute('aria-label', 'Comfort mode off. Click to enable.');
    }
    
  }
  
  updateFloatingVisualState() {
    if (!this.element) return;
    

    this.updatePosition();
    

    this.element.classList.remove('comfort-off', 'comfort-on');
    
    if (this.isComfortMode) {

      this.element.classList.add('comfort-on');
      this.element.title = 'Comfort Mode On';
      this.element.setAttribute('aria-label', 'Comfort mode on. Click to disable.');
    } else {

      this.element.classList.add('comfort-off');
      this.element.title = 'Comfort Mode Off';
      this.element.setAttribute('aria-label', 'Comfort mode off. Click to enable.');
    }
    this.renderIcon();
    
  }

  applyComfortMode(enabled, { emitEvent = true, applyToManager = true } = {}) {
    this.isComfortMode = enabled === true;

    if (applyToManager && this.vrManager) {
      this.vrManager.setComfortPreset(this.isComfortMode ? 'comfort' : 'free');
    }

    this.updateVisualState();

    if (emitEvent && this.element) {
      const event = new CustomEvent('vrcomfortchange', {
        detail: {
          isComfortMode: this.isComfortMode,
          preset: this.isComfortMode ? 'comfort' : 'free'
        }
      });
      this.element.dispatchEvent(event);
    }
  }
  
  toggle() {
    const now = Date.now();
    if (now - this.lastToggleAt < this.options.toggleCooldownMs) {
      return;
    }
    this.lastToggleAt = now;
    this.applyComfortMode(!this.isComfortMode, { emitEvent: true, applyToManager: true });
  }
  
  setComfortMode(enabled, { emitEvent = true, applyToManager = true } = {}) {
    const target = enabled === true;
    if (this.isComfortMode !== target) {
      this.applyComfortMode(target, { emitEvent, applyToManager });
    } else {
      this.updateVisualState();
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
      if (this._onClick) this.element.removeEventListener('click', this._onClick);
      if (this._onKeydown) this.element.removeEventListener('keydown', this._onKeydown);
      if (this._onPointerDown) this.element.removeEventListener('pointerdown', this._onPointerDown);
      

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
