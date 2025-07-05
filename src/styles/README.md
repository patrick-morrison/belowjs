# BelowJS Styling

BelowJS provides optional CSS files for beautiful, professional styling out-of-the-box.

## Quick Start

Include the complete theme for instant beautiful styling:

```html
<link rel="stylesheet" href="path/to/belowjs/src/styles/theme.css">
```

## Modular Approach

Or import individual components for custom styling:

```html
<!-- Base styles (required for proper layout) -->
<link rel="stylesheet" href="path/to/belowjs/src/styles/base.css">

<!-- UI components (dropdowns, buttons, loading indicators) -->
<link rel="stylesheet" href="path/to/belowjs/src/styles/components.css">

<!-- Info panels and branding -->
<link rel="stylesheet" href="path/to/belowjs/src/styles/info.css">
```

## Files

- **`theme.css`** - Complete theme importing all modules
- **`base.css`** - Core layout and glassmorphism panel styles
- **`components.css`** - Interactive UI elements (dropdowns, loading, status)
- **`info.css`** - Information displays and branding

## Customization

The CSS uses CSS custom properties (variables) where possible, making it easy to customize colors and effects:

```css
:root {
  --below-bg-color: #0a0a0a;
  --below-text-color: #e8e8e8;
  --below-accent-color: #64B5F6;
  --below-panel-bg: rgba(255, 255, 255, 0.08);
  --below-panel-border: rgba(255, 255, 255, 0.12);
}
```

## No Styling

BelowJS works perfectly without any CSS - the library will create functional UI elements with browser defaults. The styling is purely optional for enhanced visual appeal.
