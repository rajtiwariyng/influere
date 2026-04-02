# Admin Design System

This directory contains the global design system for the admin panel, including CSS variables, base styles, and reusable component classes.

## File Structure

- **`variables.css`** - CSS custom properties (color palette, spacing, typography, etc.)
- **`base.css`** - Base HTML element styles and resets
- **`components.css`** - Reusable component classes (buttons, modals, forms, cards, etc.)

## Usage

All design system files are automatically imported in `AdminApp.jsx`. Simply use the classes in your components without importing CSS files repeatedly.

---

## Available Components

### 🔘 Buttons

#### Button Classes
- `.btn-dark` / `.dark-btn` - Dark gray button (primary action)
- `.btn-light` / `.light-btn` - Light gray button (secondary action)
- `.btn-primary` - Brand color button (purple)

#### Button Sizes
- `.btn-sm` - Small button (6px 10px, 12px font)
- `.btn-md` - Medium button (8px 12px, 14px font) - Default
- `.btn-lg` - Large button (12px 20px, 16px font)

#### Button Modifiers
- `.btn-block` - Full width button
- `:disabled` - Disabled state (50% opacity, not-allowed cursor)

**Example:**
```jsx
<button className="btn-dark btn-lg">Proceed</button>
<button className="btn-light">Cancel</button>
<button className="btn-primary btn-block">Submit</button>
```

---

### 🎨 Modals

#### Modal Structure
```jsx
<div className="modal-overlay">
  <div className="modal-container">
    <button className="modal-close">
      <i className="bi bi-x"></i>
    </button>
    <h2 className="modal-title">Modal Title</h2>
    <div className="modal-body">
      {/* Content */}
    </div>
    <div className="modal-footer">
      <button className="btn-dark">Confirm</button>
      <button className="btn-light">Cancel</button>
    </div>
  </div>
</div>
```

#### Modal Classes
- `.modal-overlay` - Full-screen dark overlay with blur
- `.modal-container` - Modal content box (white, rounded, centered)
- `.modal-close` - Close button (X icon, top-right)
- `.modal-title` - Modal title with bottom border
- `.modal-body` - Modal content area
- `.modal-footer` - Modal action buttons area

**Features:**
- Automatic fade-in animation
- Slide-up animation for modal container
- Responsive (95% width on mobile)
- Click outside to close (handle in JS)

---

### 📝 Form Elements

#### Form Classes
- `.form-label` - Form field label
- `.form-input` - Text/number input field
- `.form-input-group` - Input with prefix/suffix
- `.input-prefix` - Icon/text before input (e.g., $)
- `.input-suffix` - Icon/text after input

**Example:**
```jsx
<div>
  <label className="form-label">Enter Amount</label>
  <div className="form-input-group">
    <span className="input-prefix">$</span>
    <input type="number" placeholder="500" />
  </div>
</div>
```

**Features:**
- Auto-hides number input spinner arrows
- Focus state with primary color border
- Consistent padding and styling

---

### 🎴 Selection Cards

Use for radio/checkbox options with icons and details.

#### Card Structure
```jsx
<div className={`selection-card ${selected ? 'selected' : ''}`}>
  <div className="selection-card-left">
    <div className="selection-card-icon">
      <i className="bi bi-bank"></i>
    </div>
    <div className="selection-card-info">
      <p className="selection-card-title">Jon Thomson</p>
      <p className="selection-card-subtitle">7657374xxxxxxxx</p>
    </div>
  </div>
  <div className="selection-card-radio">
    <input type="radio" />
  </div>
</div>
```

#### Card Classes
- `.selection-card` - Card container
- `.selection-card.selected` - Selected state
- `.selection-card-left` - Left side content
- `.selection-card-icon` - Purple circular icon
- `.selection-card-info` - Text content
- `.selection-card-title` - Main text
- `.selection-card-subtitle` - Secondary text (bold)
- `.selection-card-radio` - Radio button container

**Features:**
- Hover effect (purple border)
- Selected state (purple background)
- Purple accent color for radio buttons

---

### 🏷️ Status Badges

#### Badge Classes
- `.badge` - Base badge
- `.badge-success` - Green badge
- `.badge-warning` - Orange badge
- `.badge-error` - Red badge
- `.badge-info` - Blue badge
- `.badge-primary` - Purple badge

**Example:**
```jsx
<span className="badge badge-success">Successful</span>
<span className="badge badge-warning">Pending</span>
<span className="badge badge-error">Failed</span>
```

---

### 🎨 Utility Classes

#### Text Colors
- `.text-primary` - Purple color
- `.text-muted` - Gray color
- `.text-dark` - Dark gray
- `.text-success` - Green
- `.text-warning` - Orange
- `.text-error` - Red

#### Spacing
- `.mb-{0-6}` - Margin bottom (0px to 24px)
- `.mt-{0-6}` - Margin top (0px to 24px)
- `.gap-{1-6}` - Gap spacing (4px to 24px)

#### Display & Flex
- `.d-flex` - Display flex
- `.d-block` - Display block
- `.d-none` - Display none
- `.flex-column` - Flex direction column
- `.align-items-center` - Align items center
- `.justify-content-between` - Space between
- `.justify-content-center` - Center content

#### Responsive
- `.btn-block-mobile` - Full width button on mobile only

---

## CSS Variables

All color, spacing, and typography variables are defined in `variables.css`. See that file for the complete list of available CSS custom properties.

### Common Variables

**Colors:**
- `var(--admin-primary-500)` - Primary purple
- `var(--admin-gray-900)` - Dark gray
- `var(--admin-gray-50)` - Light gray
- `var(--admin-white-50)` - Off white

**Spacing:**
- `var(--admin-space-1)` to `var(--admin-space-24)` - 4px to 96px

**Typography:**
- `var(--admin-font-size-xs)` to `var(--admin-font-size-4xl)`
- `var(--admin-font-weight-normal)` to `var(--admin-font-weight-bold)`

---

## Best Practices

1. **Use global classes first** - Before writing custom CSS, check if a global class exists
2. **Combine classes** - Use multiple classes together (e.g., `btn-dark btn-lg`)
3. **Override sparingly** - Only add page-specific CSS when absolutely necessary
4. **Follow naming conventions** - Use BEM-style naming for page-specific classes
5. **Document new patterns** - If you create a new reusable pattern, add it to `components.css`

## Examples

### Modal with Form
```jsx
<div className="modal-overlay">
  <div className="modal-container">
    <button className="modal-close"><i className="bi bi-x"></i></button>
    <h2 className="modal-title">Add User</h2>
    <div className="modal-body">
      <label className="form-label">Name</label>
      <input className="form-input" type="text" />
    </div>
    <div className="modal-footer">
      <button className="btn-dark">Save</button>
      <button className="btn-light">Cancel</button>
    </div>
  </div>
</div>
```

### Selection Cards with Radio
```jsx
<div className="selection-card selected">
  <div className="selection-card-left">
    <div className="selection-card-icon">
      <i className="bi bi-bank"></i>
    </div>
    <div className="selection-card-info">
      <p className="selection-card-title">Bank Account</p>
      <p className="selection-card-subtitle">****1234</p>
    </div>
  </div>
  <div className="selection-card-radio">
    <input type="radio" checked />
  </div>
</div>
```

