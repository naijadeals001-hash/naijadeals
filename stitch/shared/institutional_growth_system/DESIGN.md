---
name: Institutional Growth System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3d4a3f'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6d7b6e'
  outline-variant: '#bccabc'
  surface-tint: '#006d38'
  primary: '#006d38'
  on-primary: '#ffffff'
  primary-container: '#00a859'
  on-primary-container: '#003317'
  inverse-primary: '#59df89'
  secondary: '#0040e0'
  on-secondary: '#ffffff'
  secondary-container: '#2e5bff'
  on-secondary-container: '#efefff'
  tertiary: '#7131e3'
  on-tertiary: '#ffffff'
  tertiary-container: '#a379ff'
  on-tertiary-container: '#370081'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#77fca3'
  primary-fixed-dim: '#59df89'
  on-primary-fixed: '#00210d'
  on-primary-fixed-variant: '#005228'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b8c3ff'
  on-secondary-fixed: '#001356'
  on-secondary-fixed-variant: '#0035be'
  tertiary-fixed: '#eaddff'
  tertiary-fixed-dim: '#d1bcff'
  on-tertiary-fixed: '#24005b'
  on-tertiary-fixed-variant: '#5800c8'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
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
    letterSpacing: -0.01em
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
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-padding-desktop: 24px
  container-padding-mobile: 16px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is built for high-stakes marketing operations and CRM management, specifically tailored for the burgeoning African digital economy. The brand personality is **Confident, Authoritative, and Expansive**. It moves away from the "playful" SaaS tropes of the West, instead embracing an **Institutional High-Density** aesthetic that signals reliability and scale.

The design style is **Corporate / Modern** with a focus on data density. It prioritizes information architecture over decorative white space, ensuring that marketing managers can view complex multi-channel journeys without excessive scrolling. The UI draws inspiration from the precision of financial terminals while maintaining the accessibility of modern marketing tools.

- **Data-Driven:** Visualizations and metrics are integrated into the core layout, not treated as secondary elements.
- **African Commerce Centric:** Uses vibrant Emerald tones to symbolize growth and prosperity, balanced by structured, institutional grays.
- **Scalable:** The system is built to handle thousands of customer records and complex automation nodes with visual clarity.

## Colors

The color palette is anchored by **Emerald Green (#00a859)**, representing the vitality of African commerce. This is the primary action color, used for CTA buttons, primary status indicators, and growth metrics.

- **Primary (Emerald):** Used for "Create," "Send," and "Save" actions.
- **Secondary (Blue/Purple):** These function as channel-specific identifiers. SMS and WhatsApp interactions utilize the Secondary Blue, while Email and automated workflows utilize the Tertiary Purple to provide immediate visual context in multi-channel views.
- **Surfaces:** The system uses a "Paper & Stone" approach—pure white (#ffffff) for active work areas and cards, set against a very light gray (#f8fafc) background to provide subtle depth without the weight of heavy shadows.
- **Status:** Standard semantic colors apply, but use a high-saturation profile to ensure they remain legible within high-density tables.

## Typography

**Plus Jakarta Sans** is used across all levels to maintain a crisp, modern, and tech-forward feel. The typography system is optimized for high-density layouts:

- **Hierarchy:** Use `label-md` and `label-sm` frequently for table headers and section titles to maximize vertical space.
- **Readability:** `body-md` (14px) is the workhorse size for all CRM data and input fields, providing the best balance of legibility and density.
- **Metrics:** For AI-Insight cards and dashboard totals, use `headline-lg` with a "SemiBold" or "Bold" weight to make data points authoritative.
- **Mobile:** Scale `display-lg` down to `headline-lg` (24px) for mobile dashboard views to prevent text wrapping on small screens.

## Layout & Spacing

The system uses a **4px baseline grid** to achieve institutional density. 

- **Layout Model:** A 12-column fluid grid for the main content area, with a fixed 240px left-hand navigation sidebar. 
- **Density:** Gaps between elements are minimized (typically 8px or 16px) to keep related data points grouped tightly. 
- **Side Panels:** Use contextual "Drawers" for editing CRM records or campaign details, allowing the user to maintain the context of the main data table or journey map underneath.
- **Breakpoints:**
  - **Desktop (1280px+):** Full 12-column grid, persistent sidebar.
  - **Tablet (768px - 1279px):** Collapsed sidebar (icon only), 8-column grid.
  - **Mobile (<767px):** Single column, 16px horizontal margins, bottom-sheet navigation for primary actions.

## Elevation & Depth

To maintain a professional, "flat" institutional feel, this system uses **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows.

- **Base Level:** The background is #f8fafc.
- **Surface Level:** Cards and data containers use #ffffff with a 1px border of #e2e8f0.
- **Active Elevation:** Only use shadows for "floating" elements like dropdown menus, modals, or dragged items in the visual journey mapper. These shadows should be extremely soft: `0px 4px 20px rgba(0, 0, 0, 0.05)`.
- **Interactive States:** Hovering over a table row should trigger a subtle background change to #f1f5f9 rather than a lift effect. This maintains the "grid" feel of the professional CRM.

## Shapes

The shape language is **Soft (0.25rem)**. This provides a clean, disciplined appearance that feels precise and engineered.

- **Components:** Buttons, input fields, and chips use a 4px (0.25rem) radius.
- **Containers:** Large cards or dashboard sections use 8px (0.5rem) to slightly soften the layout.
- **Status Indicators:** Use "Pill" shapes (full rounding) only for badges (e.g., "Active," "Pending") to differentiate them from interactive buttons.
- **Visual Journey Nodes:** Steps in the automation builder use 8px rounded corners to differentiate them from standard UI buttons, making the "map" feel like a distinct canvas.

## Components

- **High-Density Data Tables:** The core of the platform. Row height should be 40px for "Standard" and 32px for "Condensed." Use sticky headers and a "Bulk Action" bar that appears at the top when rows are selected.
- **Sophisticated Campaign Builders:** Use a "Stepper" navigation at the top. Inputs should use a "Floating Label" or "Top-Aligned Label" to save horizontal space.
- **Visual Journey Mappers:** A node-based canvas. Use the Primary Emerald for "Start" nodes, Secondary Blue for "Action" nodes (SMS/WhatsApp), and Tertiary Purple for "Logic/Trigger" nodes. Connections should be crisp, 2px lines with directional arrows.
- **AI-Insight Cards:** These should have a subtle #f0fdf4 (Emerald tint) background to indicate they are "Smart" or "System-Generated." Use a small Sparkline to show trend data immediately.
- **Buttons:**
  - **Primary:** Solid Emerald Green with white text.
  - **Secondary:** White background with 1px gray border and emerald text.
  - **Tertiary:** Ghost style, no border, gray text that turns emerald on hover.
- **Chips:** Small, 11px uppercase text. Use background tints for channels: Light Blue for SMS, Light Purple for Email, Light Green for WhatsApp.