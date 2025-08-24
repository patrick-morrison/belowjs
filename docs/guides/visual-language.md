# BelowJS Visual Language Guide

A designer's reference for implementing consistent, accessible interfaces across the BelowJS ecosystem.

## Design Philosophy

**"Underwater Heritage Through Technology"**

BelowJS embodies a design philosophy centered around making underwater archaeological exploration accessible and professional. The visual language reflects three core principles:

1. **Research-Grade Precision**: Clean, professional interfaces that support scientific work
2. **Immersive Experience**: Deep, oceanic aesthetics that evoke underwater environments  
3. **Accessible Technology**: Intuitive interactions that work across desktop and VR

## Color System

### Primary Palette
```css
/* Brand Colors */
--primary-blue: #0d3b66;     /* Deep Ocean Blue - primary brand */
--accent-blue: #64B5F6;      /* Arctic Ice - interactive elements */
--gradient: linear-gradient(135deg, #0d3b66 0%, #1e88e5 100%); /* Hero elements */

/* Documentation Theme */
--doc-bg: #ffffff;           /* Clean background */
--doc-bg-alt: #f8fafc;       /* Section backgrounds */
--text-primary: #2c3e50;     /* Headers, important text */
--text-secondary: #4a5568;   /* Body text */
--text-tertiary: #718096;    /* Subtle text */
--border-color: #e2e8f0;     /* Subtle borders */
```

### Viewer Interface (Dark Theme)
```css
/* Dark Theme Variables */
--below-bg-color: #0a0a0a;
--below-text-color: #e8e8e8;
--below-accent-color: #64B5F6;
--below-panel-bg: rgba(255, 255, 255, 0.08);
--below-panel-border: rgba(255, 255, 255, 0.12);
--below-panel-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2);
```

### Light Theme Override
```css
/* Light Theme Variables */
--below-bg-color: #ffffff;
--below-text-color: #1a1a1a;
--below-accent-color: #000000;
--below-panel-bg: rgba(255, 255, 255, 0.95);
--below-panel-border: rgba(0, 0, 0, 0.15);
```

### Semantic Colors
```css
/* Measurement System */
--measurement-active: #4ade80;    /* Bright green - active measurements */
--measurement-inactive: #60a5fa;  /* Blue - inactive measurements */
--measurement-active-light: #10b981;  /* Dark green for light theme */
--measurement-inactive-light: #3b82f6; /* Dark blue for light theme */

/* Mode States */
--dive-mode: #4CAF50;         /* Green - dive mode active */
--vr-mode: #64B5F6;           /* Blue - VR mode active */
--surface-mode: #ffffff;      /* White - surface mode */
```

## Typography

### Font Stack
```css
--below-font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Scale & Weights

#### Documentation
- **H1**: 2.5rem / 700 weight / #2c3e50
- **H2**: 1.8rem / 600 weight / #2c3e50  
- **H3**: 1.4rem / 600 weight / #2c3e50
- **Body**: 1rem / 400 weight / #4a5568 / 1.7 line-height
- **Code**: Monaco, Menlo, Ubuntu Mono

#### Interface
- **Model Selector**: 23px / 500 weight
- **Loading States**: 18px / 500 weight
- **Status Text**: 14px / 400 weight
- **Buttons**: 300-700 weight (context-dependent)

## Component Patterns

### Glassmorphism Panels
The signature BelowJS component style for floating UI elements:

```css
.below-panel {
  background: var(--below-panel-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--below-panel-border);
  border-radius: 16px;
  box-shadow: var(--below-panel-shadow);
}
```

### Button Hierarchy
```css
/* Primary Action */
.btn-primary {
  background: #0d3b66;
  color: white;
  border: 2px solid #0d3b66;
}

/* Secondary Action */
.btn-secondary {
  background: transparent;
  color: #0d3b66;
  border: 2px solid #0d3b66;
}

/* Hover States */
.btn:hover {
  transform: translateY(-2px);
  box-shadow: enhanced-shadow;
}
```

### Navigation Structure
```css
.nav {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  height: 64px;
  border-bottom: 1px solid #e2e8f0;
}

.nav-title {
  font-size: 1.3em;
  font-weight: 600;
  color: #0d3b66;
}
```

## Layout System

### Containers & Spacing
```css
/* Documentation */
.docs-container { max-width: 1024px; }
.page-container { max-width: 1200px; }

/* Spacing Scale */
--space-xs: 0.5rem;
--space-sm: 1rem;
--space-md: 1.5rem;
--space-lg: 2rem;
--space-xl: 3rem;
--space-xxl: 4rem;
```

### Grid Patterns
- **Landing Page**: 2-column grid (content + demo)
- **Features**: 2x2 grid desktop, single column mobile
- **Documentation**: Single column with max-width
- **Stats**: Flexible grid with consistent aspect ratios

## Naming Conventions

### CSS Architecture
```css
/* Namespace Prefixes */
.below-*          /* Core viewer components */
.model-*          /* Model-related UI */
.vr-*             /* VR-specific interfaces */
.dive-*           /* Dive mode components */
.measurement-*    /* Measurement tools */

/* BEM Methodology */
.component__element--modifier

/* State Classes */
.active, .disabled, .loading
.light-theme, .dark-theme
```

### Component Naming
- **Containers**: `*-container`, `*-wrapper`
- **Interactive**: `*-button`, `*-dropdown`, `*-selector`
- **Status**: `*-indicator`, `*-status`, `*-progress`
- **Layout**: `*-section`, `*-content`, `*-header`

## Responsive Design

### Breakpoints
```css
/* Mobile First */
@media (max-width: 480px)  { /* Small mobile */ }
@media (max-width: 768px)  { /* Mobile */ }
@media (max-width: 960px)  { /* Tablet */ }
@media (max-width: 1200px) { /* Small desktop */ }
```

### Mobile Adaptations
- **Navigation**: Hamburger → overlay menu
- **Hero**: 2-column → single column stack
- **Cards**: Grid → single column
- **Typography**: Scale down headings 15-25%
- **Touch**: Minimum 44px target size

## Interaction Patterns

### Hover Effects
```css
/* Standard Lift */
.interactive:hover {
  transform: translateY(-2px);
  box-shadow: enhanced;
}

/* Panel Enhancement */
.panel:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}
```

### Focus States
```css
/* Accessibility Focus */
.focusable:focus {
  outline: 2px solid var(--below-accent-color);
  outline-offset: 2px;
}

/* VR Button Focus */
.vr-button:focus {
  box-shadow: 0 0 0 3px rgba(100, 181, 246, 0.3);
}
```

### Loading States
- **Spinner**: Circular progress with percentage
- **Shimmer**: Placeholder content animation
- **Progressive**: Step-by-step loading feedback

## Accessibility Standards

### Color Contrast
- **AA Compliance**: Minimum 4.5:1 for normal text
- **AAA Target**: 7:1 for enhanced readability
- **Focus Indicators**: High contrast, 2px minimum

### Typography Accessibility
- **Line Height**: 1.5+ for body text
- **Font Size**: 16px minimum on mobile
- **Text Shadows**: Ensure readability over images

### Interaction Accessibility
- **Touch Targets**: 44px minimum
- **Keyboard Navigation**: Full tabindex support  
- **Screen Readers**: Semantic HTML + ARIA labels

## Implementation Notes

### Performance Considerations
- **Backdrop Filter**: Progressive enhancement
- **Shadows**: Optimize for mobile rendering
- **Animations**: Respect `prefers-reduced-motion`

### Browser Support
- **Glassmorphism**: Fallback backgrounds for older browsers
- **CSS Grid**: Flexbox fallbacks where needed
- **Custom Properties**: PostCSS fallbacks for IE11

### VR-Specific Design
- **Larger Touch Targets**: 60px+ for VR controllers
- **High Contrast**: Enhanced visibility in headsets
- **Simplified UI**: Reduce cognitive load in 3D space

This visual language ensures consistency across all BelowJS interfaces while maintaining the professional, immersive aesthetic that supports underwater archaeological research.