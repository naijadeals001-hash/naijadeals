---
name: Digital Operating System for Logistics
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#3d4a3f'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#6d7b6e'
  outline-variant: '#bccabc'
  surface-tint: '#006d38'
  primary: '#006d38'
  on-primary: '#ffffff'
  primary-container: '#00a859'
  on-primary-container: '#003317'
  inverse-primary: '#59df89'
  secondary: '#5d5e61'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e5'
  on-secondary-container: '#636467'
  tertiary: '#0050e2'
  on-tertiary: '#ffffff'
  tertiary-container: '#678bff'
  on-tertiary-container: '#00236f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#77fca3'
  primary-fixed-dim: '#59df89'
  on-primary-fixed: '#00210d'
  on-primary-fixed-variant: '#005228'
  secondary-fixed: '#e2e2e5'
  secondary-fixed-dim: '#c6c6c9'
  on-secondary-fixed: '#1a1c1e'
  on-secondary-fixed-variant: '#454749'
  tertiary-fixed: '#dce1ff'
  tertiary-fixed-dim: '#b5c4ff'
  on-tertiary-fixed: '#00164e'
  on-tertiary-fixed-variant: '#003cae'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-margin: 24px
  gutter: 16px
  table-cell-padding: 12px
  sidebar-width: 280px
---

## Brand & Style
This design system establishes a high-authority administrative environment designed for the "Digital Operating System for African Life." The aesthetic is **Corporate Modern**, blending high-density utility with an optimistic, accessible professional tone. 

The system prioritizes clarity and rapid decision-making in high-pressure logistics environments. It evokes a sense of "command and control" through a clean, structured interface that handles vast amounts of real-time data without overwhelming the user. The visual language is grounded, resilient, and forward-looking, utilizing generous white space and sharp typography to maintain order across complex fleet management workflows.

## Colors
The palette is led by a vibrant, high-visibility **Primary Green (#00a859)**, representing growth, movement, and the "go" state essential for dispatch operations. 

- **Surface Strategy:** The background uses a crisp, cool neutral (#f8f9fb) to reduce eye strain during long administrative shifts.
- **Semantic Accents:** A secondary deep charcoal (#1a1c1e) provides high-contrast grounding for text and navigation. A tertiary blue is reserved for technical data points and secondary system feedback.
- **Status Indicators:** Use specialized tints of the primary green for "Active," an amber for "Delayed," and a precise red for "Critical/Offline" alerts.

## Typography
The design system exclusively utilizes **Plus Jakarta Sans** to maintain a friendly yet professional atmosphere. The type scale is optimized for data density:
- **Headlines:** Use Bold and Semi-Bold weights to create clear section anchoring within complex dashboards.
- **Body Text:** Set at 14px (md) for primary data tables to maximize information density without sacrificing legibility.
- **Labels:** Utilize uppercase and increased letter-spacing for status badges and table headers to differentiate them from actionable data.
- **Numeric Data:** Ensure "tabular lining" is active for coordinates and timestamps to ensure vertical alignment in columns.

## Layout & Spacing
The layout follows a **Hybrid Grid** model optimized for professional monitors.
- **Main Navigation:** A fixed 280px sidebar provides constant access to primary modules (Fleet, Dispatch, Analytics).
- **The Dashboard:** A 12-column fluid grid for data widgets, with a 24px outer margin.
- **The Map View:** A full-bleed fluid layout that accommodates floating data panels. 
- **Density:** We use an 8px base unit. For the "Admin" context, we prefer "Compact" spacing (12px padding in lists and tables) to ensure supervisors can see as many active units as possible on one screen.

## Elevation & Depth
Depth is used sparingly to maintain the "Operating System" feel. We rely on **Tonal Layering** rather than heavy shadows:
- **Base Level:** Surface (#f8f9fb).
- **Mid Level:** White (#ffffff) cards and containers with a 1px border (#e2e8f0).
- **Floating Level:** Real-time map markers and context menus use an extra-diffused ambient shadow (0px 4px 20px rgba(0, 0, 0, 0.05)) to appear "above" the geographic data.
- **Overlays:** Darkened backdrops for modals are avoided in favor of high-contrast side-drawers to keep the map context visible at all times.

## Shapes
The shape language is **Rounded (Level 2)**, mirroring the approachable nature of the typography. 
- **Standard Elements:** Buttons, inputs, and cards use an 8px (0.5rem) corner radius.
- **Status Badges:** Use a "Soft Pill" (rounded-lg) to distinguish them from actionable buttons.
- **Interactive Map Markers:** Use a distinctive "Pin" shape that combines the 8px radius with a bottom-center point for geographic precision.

## Components
- **Primary Action Buttons:** Solid #00a859 with white text. High-contrast and identifiable as the "final step" in a dispatch workflow.
- **Status Chips:** Subtle background tints of the status color with high-contrast text (e.g., Light Green background with Dark Green text).
- **Data Tables:** Use a "Ghost Border" style—no vertical lines, only 1px horizontal dividers. The header row should be slightly darker (#f1f3f5) to anchor the data.
- **Input Fields:** 8px rounded corners with a subtle grey border that turns Primary Green on focus. Labels should always be visible above the field (no floating labels).
- **Map Overlays:** Glassmorphic side-panels (white with 90% opacity and background blur) allow the user to maintain a sense of geographic context while reviewing specific driver details.
- **Driver Indicators:** Small circular avatars with a status ring around the border (Green for Moving, Amber for Idle, Red for Emergency).