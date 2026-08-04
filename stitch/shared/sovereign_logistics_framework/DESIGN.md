---
name: Sovereign Logistics Framework
colors:
  surface: '#f9f9fc'
  surface-dim: '#dadadc'
  surface-bright: '#f9f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f6'
  surface-container: '#eeeef0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e2e2e5'
  on-surface: '#1a1c1e'
  on-surface-variant: '#3d4a3f'
  inverse-surface: '#2f3133'
  inverse-on-surface: '#f0f0f3'
  outline: '#6d7b6e'
  outline-variant: '#bccabc'
  surface-tint: '#006d38'
  primary: '#006d38'
  on-primary: '#ffffff'
  primary-container: '#00a859'
  on-primary-container: '#003317'
  inverse-primary: '#59df89'
  secondary: '#8b5000'
  on-secondary: '#ffffff'
  secondary-container: '#ff9800'
  on-secondary-container: '#653900'
  tertiary: '#ba1a20'
  on-tertiary: '#ffffff'
  tertiary-container: '#ff5750'
  on-tertiary-container: '#5e0006'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#77fca3'
  primary-fixed-dim: '#59df89'
  on-primary-fixed: '#00210d'
  on-primary-fixed-variant: '#005228'
  secondary-fixed: '#ffdcbe'
  secondary-fixed-dim: '#ffb870'
  on-secondary-fixed: '#2c1600'
  on-secondary-fixed-variant: '#693c00'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb3ac'
  on-tertiary-fixed: '#410003'
  on-tertiary-fixed-variant: '#930010'
  background: '#f9f9fc'
  on-background: '#1a1c1e'
  surface-variant: '#e2e2e5'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '800'
    lineHeight: 16px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  max-width: 1440px
---

## Brand & Style

The design system is engineered for the high-stakes environment of reverse logistics and returns management within the African trade ecosystem. The brand personality is **Industrial, Authoritative, and High-Precision**, evoking the feeling of a well-oiled digital machine that manages physical complexity with absolute clarity.

The aesthetic blends **Modern Corporate** efficiency with **Industrial Brutalism**—utilizing heavy borders, high-density data displays, and a rigid structural grid to communicate reliability and professional rigor. It is designed to facilitate rapid decision-making in warehouses, logistics hubs, and administrative offices. The UI avoids unnecessary decoration, focusing instead on status visibility, verification certainty, and the seamless movement of assets across the ecosystem.

## Colors

The palette is rooted in functional signaling. **Sovereign Green** represents the successful flow of goods and the core brand authority. **Warning Amber** and **Alert Orange** are reserved strictly for logistics friction: disputes, damages, and pending verifications.

- **Primary (Sovereign Green):** Used for primary actions, verified statuses, and warehouse arrivals.
- **Secondary (Alert Orange):** Used for logistics exceptions, driver delays, and "Return Requested" states.
- **Tertiary (Warning Red):** Used for damage flags, rejected returns, and system errors.
- **Surface & Stroke:** The system relies on a high-contrast foundation of pure white surfaces, light grey backgrounds (`#F1F3F4`), and deep charcoal borders (`#1A1C1E`) to create clear containment for dense logistics data.

## Typography

This design system utilizes **Plus Jakarta Sans** for its global commerce appeal and legibility in dense interfaces. To support the logistics nature of the product, **JetBrains Mono** is integrated for all alphanumeric data points including tracking numbers, SKU codes, and warehouse shelf locations.

- **Headlines:** Bold and tight-leading to maintain a professional, news-like authority.
- **Data Display:** All technical strings (e.g., `NR-992-XPA`) must use the `mono-data` token to prevent character confusion (e.g., 0 vs O).
- **Labels:** Small-cap labels are used for metadata headers within tables and card components to maximize vertical space.

## Layout & Spacing

The system employs a **Fixed Grid** philosophy for administrative stability, ensuring that data tables and dashboards remain consistent across large displays. A 12-column grid is used for desktop layouts, while a 4-column fluid grid is used for mobile warehouse apps.

- **Density:** The design system prioritizes high-density layouts. Vertical spacing between table rows and list items is compressed to 8px or 12px to maximize the visibility of multiple log entries on a single screen.
- **Breakpoints:** 
  - Mobile: < 600px (Single column, full-width cards).
  - Tablet: 600px - 1024px (2-column grids for forms).
  - Desktop: > 1024px (Multi-pane layouts with persistent side navigation).

## Elevation & Depth

This design system rejects soft shadows in favor of **Structural Outlines**. Depth is communicated through stacking and border-weight variance rather than light-source simulation.

- **Primary Layering:** Surfaces are separated by 1px solid borders using `#D1D5DB`.
- **Active Focus:** Elements currently being interacted with (active input, selected card) receive a 2px "Sovereign Green" border.
- **Status Overlay:** Modals and flyouts use a heavy black stroke (2px) and a hard 4px offset shadow (non-blurred) to create a "Brutalist" stack effect, ensuring the operator knows they are in a temporary state.

## Shapes

The shape language is **Soft (0.25rem)**, leaning toward a functional, utilitarian aesthetic. This slight rounding prevents the UI from feeling aggressive while maintaining the professional structure of an industrial tool.

- **Interactive Elements:** Buttons and Input fields use the standard 0.25rem radius.
- **Status Badges:** Use a more aggressive rounding (1rem) to distinguish them from functional buttons.
- **Media/Containers:** Shipping label previews and ID photos use sharp 0px corners to represent the physical nature of the documents.

## Components

The components in the design system are built for high-frequency use and verification accuracy.

- **Primary Buttons:** Solid "Sovereign Green" background with white text. For destructive logistics actions (e.g., "Flag as Damaged"), use a solid red background.
- **Status Indicators:** Encapsulated pills using a high-contrast background and border. "Driver Assigned" (Amber), "Warehouse Received" (Green), "Return Requested" (Gray).
- **Data Tables:** Zebra-striped for legibility. Headers use the `label-caps` typography token with a solid bottom border. 
- **The Verification Stepper:** A prominent vertical or horizontal rail showing the lifecycle of a return. Completed steps are indicated with a heavy green checkmark; active steps are circled in a 2px black stroke.
- **Logistics Cards:** Used for individual return items, featuring a JetBrains Mono tracking number in the top-right corner and a clear status badge in the bottom-left.
- **Inputs:** High-contrast borders (1px solid) with 12px padding. Focus states must clearly use the Primary Green color for the border and a 2px outer glow.