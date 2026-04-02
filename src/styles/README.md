# CSS Architecture & Design System

This directory contains the minimal CSS structure for the Influere application, focusing only on colors and typography since Bootstrap is used for all other styling.

## Directory Structure

```
src/styles/
├── design-system/          # Core design system files
│   ├── variables.css       # CSS custom properties (colors and typography only)
│   └── typography.css      # Typography system and base text styles
└── README.md              # This documentation file
```

## Design System Overview

### Variables (`design-system/variables.css`)
Contains CSS custom properties for design tokens:
- **Colors**: Primary (Blue), secondary (Violet), success (Green), warning (Orange), error (Red), and neutral color palettes
- **Typography**: Font families, sizes, weights, and line heights
- **Semantic Colors**: Background, surface, text, and border color mappings
- **Dark Mode**: Automatic dark mode support using `prefers-color-scheme`

### Typography (`design-system/typography.css`)
Base typography system including:
- Base typography styles for body text and headings
- Heading styles (h1-h6) with proper sizing and weights
- Paragraph, link, list, and code element styles
- Font family integration with Figtree font
- Proper line heights and spacing for readability

## Usage Guidelines

### 1. Design Tokens
Use CSS custom properties from `variables.css` for custom styling:
```css
.my-component {
  background-color: var(--color-primary-500);
  color: var(--color-white);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-lg);
}
```

### 2. Bootstrap Integration
Use Bootstrap classes for layout, spacing, and components:
```html
<div class="container-fluid d-flex align-items-center justify-content-between p-4 bg-white rounded shadow">
  <h2 class="h4 fw-semibold text-dark">Title</h2>
  <button class="btn btn-primary btn-sm">Action</button>
</div>
```

### 3. Custom Styling
Combine Bootstrap with custom CSS variables for brand-specific styling:
```html
<div class="card" style="border-color: var(--color-primary-200);">
  <div class="card-header" style="background-color: var(--color-primary-50);">
    <h5 class="card-title" style="color: var(--color-primary-800);">Header</h5>
  </div>
  <div class="card-body">
    <p class="card-text">Content</p>
  </div>
</div>
```

## Dark Mode Support

The design system includes built-in dark mode support using CSS custom properties and `prefers-color-scheme` media queries. Colors automatically adapt based on the user's system preference.

## Bootstrap Integration

This minimal CSS setup is designed to work seamlessly with Bootstrap:
- **Colors**: Custom color variables that can be used alongside Bootstrap's color system
- **Typography**: Figtree font family with proper sizing and weights
- **No Conflicts**: Minimal CSS ensures no conflicts with Bootstrap's utility classes
- **Custom Styling**: Use CSS variables for brand-specific customizations

## Browser Support

The CSS architecture supports modern browsers with:
- CSS Custom Properties (CSS Variables)
- Modern CSS features
- Bootstrap's comprehensive browser support

## Performance Considerations

- Minimal CSS footprint with only essential styles
- Bootstrap handles all utility classes and components
- Fast loading with reduced CSS bundle size
- Optimized for performance

## Maintenance

When adding new styles:
1. Use existing design tokens from `variables.css`
2. Prefer Bootstrap classes for layout and components
3. Use CSS variables only for brand-specific customizations
4. Keep custom CSS minimal to avoid conflicts with Bootstrap
5. Follow Bootstrap's naming conventions

## Naming Conventions

- **CSS Custom Properties**: `--color-*`, `--font-*`
- **Bootstrap Classes**: Use Bootstrap's standard class names
- **Custom Classes**: Prefix with your project name if needed (e.g., `.influere-*`)
