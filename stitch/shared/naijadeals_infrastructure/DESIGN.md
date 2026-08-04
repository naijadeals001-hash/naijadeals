---
name: Cyber-Authority HUD
colors:
  surface: '#131317'
  surface-dim: '#131317'
  surface-bright: '#39393d'
  surface-container-lowest: '#0d0e11'
  surface-container-low: '#1b1b1f'
  surface-container: '#1d1f29'
  surface-container-high: '#292a2d'
  surface-container-highest: '#343438'
  on-surface: '#e4e1e6'
  on-surface-variant: '#c3c5d9'
  inverse-surface: '#e4e1e6'
  inverse-on-surface: '#303034'
  outline: '#90909a'
  outline-variant: '#434656'
  surface-tint: '#b7c4ff'
  primary: '#dde1ff'
  on-primary: '#1f2d5e'
  primary-container: '#b7c4ff'
  on-primary-container: '#435083'
  inverse-primary: '#4f5c90'
  secondary: '#b7c8e1'
  on-secondary: '#213145'
  secondary-container: '#38485d'
  on-secondary-container: '#a6b6cf'
  tertiary: '#ffdbd2'
  on-tertiary: '#512317'
  tertiary-container: '#ffb5a2'
  on-tertiary-container: '#7b4436'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#071749'
  on-primary-fixed-variant: '#374476'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c2f'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbd2'
  tertiary-fixed-dim: '#ffb4a2'
  on-tertiary-fixed: '#360e05'
  on-tertiary-fixed-variant: '#6c382b'
  background: '#11131c'
  on-background: '#e4e1e6'
  surface-variant: '#32343f'
  terminal-green: '#00ff41'
  auth-error: '#ffb4ab'
  glass-bg: rgba(29, 31, 41, 0.8)
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  body-base:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  code-terminal:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  micro-tag:
    fontFamily: Inter
    fontSize: 9px
    fontWeight: '700'
    lineHeight: 12px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  stack-tight: 0.5rem
  stack-default: 1rem
  gutter: 12px
  container-padding: 1.5rem
  sidebar-width: 288px
  header-height: 64px
---

## Brand & Style

This design system embodies a **High-Contrast Tech / Cyberpunk** aesthetic tailored for identity management and system administration. It evokes a sense of "Root Access" and "Global Authority" through a mix of **Glassmorphism** and **Brutalism**. 

The interface relies on deep, obsidian surfaces contrasted with vibrant electric blues and neon accents. The brand personality is precise, authoritative, and sophisticated, targeting technical operators who require dense information displays that maintain visual hierarchy through light, motion, and color-coded status indicators. Use glowing pulse animations for health statuses and linear gradients for data connections to reinforce the "living system" feel.

## Colors

The palette is anchored by a deep midnight background (`#11131c`). The primary interactive color is a soft periwinkle blue (`#b7c4ff`), which acts as the "active" state and system "glow." 

Secondary and tertiary colors (muted slate blue and soft coral) are reserved for distinct data verticals (e.g., Merchant vs. Medical personas). Functional colors are critical: use `outline-variant` for structural containment and `surface-variant` for hover states. Glass surfaces utilize an 80% opaque version of the container color with a 1px solid border to simulate physical hardware layers.

## Typography

The system uses a three-tier font strategy. **Plus Jakarta Sans** provides a modern, geometric feel for high-level displays and headers. **Inter** handles all functional body text and interface labels for maximum legibility. **JetBrains Mono** is utilized for machine-generated data, unique IDs, and the terminal log to emphasize the technical nature of the application.

All metadata labels must be in uppercase with increased letter spacing (`label-caps`) to distinguish them from interactive content. Use the `micro-tag` size for status badges within cards.

## Layout & Spacing

The layout follows a **12-column fluid grid** with a fixed sidebar for desktop. Spacing is tight and efficient, utilizing a 4px base unit. 

- **Desktop**: 72rem (288px) fixed left navigation, 64px fixed header. Content area uses `1.5rem` horizontal padding.
- **Mobile**: Sidebar collapses into a bottom navigation bar.
- **Grid Layout**: Bento-style grids are used for dashboard cards, with a consistent `12px` gutter. 
- **Vertical Rhythm**: Use `stack-default` (16px) for major component separation and `stack-tight` (8px) for internal element grouping.

## Elevation & Depth

Hierarchy is established through **material layering** rather than traditional shadows. 

1.  **Base Layer**: `#11131c` (Solid Background).
2.  **Floating Navigation**: `#1d1f29` with a bottom/right border for separation.
3.  **Glass Cards**: `rgba(29, 31, 41, 0.8)` with `backdrop-filter: blur(8px)`. These represent the primary interactive work surface.
4.  **Active/Hover State**: Subtle inner glows or scale transformations (98%).

Shadows are rarely used, but when present (e.g., mobile nav), they are high-blur, low-opacity blacks. Glowing shadows (`0 0 30px`) are reserved exclusively for the most critical central system nodes.

## Shapes

The shape language is **Soft-Technical**. Main containers and buttons use a base radius of `0.125rem` (Sharp-Soft) to maintain a professional, data-heavy feel. Cards and larger panels use `rounded-lg` (0.25rem) or `rounded-xl` (0.5rem) to slightly soften the technical edge. Decorative icons and avatars within cards should use `0.5rem` to stand out as "human" elements within the machine grid.

## Components

- **Buttons**: Use `bg-surface-variant` for secondary actions and `bg-primary-container` for primary actions. Text should always be `label-caps`. Avoid large corner radii; stick to `0.25rem`.
- **Glass Cards**: Must have a `1px solid #434656` border and a backdrop blur of `8px`. Use color-coded top borders (4px) to denote categories.
- **Chips/Badges**: Small, high-contrast pills with `9px` bold text. Use 10% opacity backgrounds of the status color (e.g., `primary/10`).
- **Terminal Log**: Dark background (`#11131c`), monospaced font, no border-radius at the bottom. Lines should alternate color based on log level (INFO: primary, WARN: tertiary, FAIL: error).
- **Navigation**: Sidebar items use a left-aligned border (`2px`) and background change on active states. Mobile nav uses a centered icon layout with an emphasized central "Action Hub" button.
- **Status Indicators**: Circular pips with a `2s` infinite pulse animation for live system health.