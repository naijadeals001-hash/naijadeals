---
name: Institutional High-Density
colors:
  surface: '#f4fcf1'
  surface-dim: '#d5dcd2'
  surface-bright: '#f4fcf1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef6eb'
  surface-container: '#e8f0e6'
  surface-container-high: '#e3eae0'
  surface-container-highest: '#dde5db'
  on-surface: '#161d17'
  on-surface-variant: '#3d4a3f'
  inverse-surface: '#2b322c'
  inverse-on-surface: '#ebf3e9'
  outline: '#6d7b6e'
  outline-variant: '#bccabc'
  surface-tint: '#006d38'
  primary: '#006d38'
  on-primary: '#ffffff'
  primary-container: '#00a859'
  on-primary-container: '#003317'
  inverse-primary: '#59df89'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#a93249'
  on-tertiary: '#ffffff'
  tertiary-container: '#ed657a'
  on-tertiary-container: '#5d001b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#77fca3'
  primary-fixed-dim: '#59df89'
  on-primary-fixed: '#00210d'
  on-primary-fixed-variant: '#005228'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdadc'
  tertiary-fixed-dim: '#ffb2b9'
  on-tertiary-fixed: '#400010'
  on-tertiary-fixed-variant: '#891833'
  background: '#f4fcf1'
  on-background: '#161d17'
  surface-variant: '#dde5db'
typography:
  display-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-uppercase:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  code-data:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  sidebar-width: 64px
  command-bar-width: 280px
---

## Brand & Style
The design system is engineered for high-stakes, 24/7 omnichannel operations within the Pan-African ecosystem. It adopts an **Institutional High-Density** style, prioritizing information density, rapid scanning, and professional authority over decorative white space. 

The aesthetic is inspired by industrial-grade software: structured, reliable, and technically precise. It minimizes visual noise to reduce cognitive load during high-volume support shifts. Key characteristics include crisp borders, high-contrast data visualization, and a "dashboard-first" philosophy that ensures critical KPIs are immediately legible. The emotional response is one of total control, operational readiness, and institutional trust.

## Colors
The palette is rooted in **Sovereign Green**, symbolizing growth, trust, and the "go" state for actions. **Deep Slate** provides the institutional backbone, used for navigation sidebars and primary headers to ground the interface in authority.

- **Primary (Sovereign Green):** Used for primary action buttons, success states, and active ticket indicators.
- **Secondary (Deep Slate):** Used for high-level structural elements and persistent navigation.
- **Surface & Backgrounds:** A tiered system of White (#ffffff) for workspace cards and Light Gray (#f8fafc) for background canvases to maintain high contrast.
- **Functional Accents:** **Warning Amber** is reserved strictly for SLA warnings and at-risk tickets. **Critical Red** is used for breached SLAs, system outages, and high-priority escalations.

## Typography
The system uses **Plus Jakarta Sans** for all UI elements to ensure modern legibility with a professional tone. A secondary monospaced font, **Geist**, is employed for technical data strings, ticket IDs, and timestamps to prevent character jumping and aid in rapid data comparison.

Typography is intentionally compact. The base body size is 14px, scaling down to 13px for dense sidebars. Uppercase labels are used for metadata headers to distinguish them clearly from interactive text.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model designed for widescreen desktop monitors.
- **Vertical Command Bar:** A slim 64px icon-only rail on the far left for global navigation.
- **Contextual Sidebar:** A 280px expandable drawer for queue management and view switching.
- **Multi-Tabbed Workspace:** The central area uses a flexible tab system, allowing agents to toggle between multiple active tickets without losing state.

The spacing rhythm is based on a 4px grid. High-density views (Data Grids) utilize 8px (sm) padding, while workspace cards use 16px (lg) to ensure focus.

## Elevation & Depth
This design system avoids heavy shadows to maximize screen real estate. Depth is achieved through **Low-contrast Outlines** and **Tonal Layering**:
- **Level 0 (Background):** #f1f5f9 (Light bluish-gray) for the application shell.
- **Level 1 (Cards/Workspaces):** Pure White (#ffffff) with a 1px border (#e2e8f0).
- **Level 2 (Popovers/Modals):** Pure White with a subtle 4px blur shadow, 10% opacity black, to distinguish temporary overlays from the workspace.
- **Active State:** Elements in focus or active tabs use a 2px Sovereign Green bottom border or "pill" indicator rather than elevation.

## Shapes
To maintain a professional and institutional feel, the design system uses **Soft (0.25rem)** corners. This provides a modern touch without the "consumer-grade" playfulness of fully rounded or pill-shaped buttons. 
- **Standard UI elements:** 4px radius.
- **Containers/Large Cards:** 8px radius.
- **Data Tags/Status Badges:** 2px radius for a sharper, more technical appearance.

## Components
- **Buttons:** Primary buttons are Sovereign Green with white text. Ghost buttons use Deep Slate outlines for secondary actions. Size variants include a "Compact" mode (28px height) for toolbar integration.
- **Data Grids:** High-density rows (32px height) with zebra-striping. Columns for "SLA Status" use high-contrast color blocks (Amber/Red).
- **Multi-Tabbed Bar:** Tabs feature close buttons on hover and a Sovereign Green top-border to indicate the active ticket.
- **Ticket Timeline:** A vertical thread using Geist (Monospace) for timestamps. Internal notes are differentiated with a light amber background tint.
- **Input Fields:** Inset labels for space efficiency. Focus states use a 1px Sovereign Green glow.
- **Status Chips:** Small, rectangular badges with low-saturation backgrounds and high-saturation text for status indicators (e.g., "Pending," "Open," "Resolved").