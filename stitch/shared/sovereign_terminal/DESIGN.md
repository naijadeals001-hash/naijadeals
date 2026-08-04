---
name: Sovereign Terminal
colors:
  surface: '#031427'
  surface-dim: '#031427'
  surface-bright: '#2a3a4f'
  surface-container-lowest: '#000f21'
  surface-container-low: '#0b1c30'
  surface-container: '#102034'
  surface-container-high: '#1b2b3f'
  surface-container-highest: '#26364a'
  on-surface: '#d3e4fe'
  on-surface-variant: '#bbcbbb'
  inverse-surface: '#d3e4fe'
  inverse-on-surface: '#213145'
  outline: '#869486'
  outline-variant: '#3d4a3e'
  surface-tint: '#4ae183'
  primary: '#54e98a'
  on-primary: '#003919'
  primary-container: '#2ecc71'
  on-primary-container: '#005027'
  inverse-primary: '#006d37'
  secondary: '#bcc7de'
  on-secondary: '#263143'
  secondary-container: '#3e495d'
  on-secondary-container: '#aeb9d0'
  tertiary: '#cccfd1'
  on-tertiary: '#2d3133'
  tertiary-container: '#b0b3b5'
  on-tertiary-container: '#424547'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6bfe9c'
  primary-fixed-dim: '#4ae183'
  on-primary-fixed: '#00210c'
  on-primary-fixed-variant: '#005228'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#031427'
  on-background: '#d3e4fe'
  surface-variant: '#26364a'
typography:
  headline-xl:
    fontFamily: IBM Plex Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: IBM Plex Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: IBM Plex Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-display:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
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
  margin-desktop: 32px
  margin-mobile: 16px
  panel-padding: 20px
---

## Brand & Style
The design system is engineered for high-stakes governance and national-scale infrastructure deployment. It evokes an emotional response of **absolute stability, technical authority, and institutional precision**. The target audience comprises policy makers, regional administrators, and systems engineers overseeing a digital operating system for African life.

The visual style is a hybrid of **Modern Corporate** and **Technical Minimalism**. It prioritizes high-density information display and functional clarity over decorative elements. The UI should feel like a "Sovereign Command Center"—robust, permanent, and transparent, inspired by global cloud infrastructure consoles and international policy frameworks.

## Colors
The palette is anchored by **Sovereign Green** (#2ECC71) to represent vitality and successful deployment, and **Deep Slate** (#1E293B) to provide a foundation of administrative power. 

- **Primary (Sovereign Green):** Used for "Active" states, readiness indicators reaching 100, and primary action calls.
- **Secondary (Deep Slate):** The core background and container color, providing the "Dark Mode" institutional feel.
- **Surface Accents:** Utilizes subtle variations of slate to differentiate terminal panels.
- **Functional Semantics:** Specific tokens are assigned to Launch Statuses: 
    - **Active:** Sovereign Green.
    - **Beta:** Technical Blue (#3B82F6).
    - **Dormant:** Neutral Grey (#94A3B8).
    - **Rollback:** Critical Red (#EF4444).

## Typography
The system utilizes **IBM Plex Sans** for its systematic, corporate reliability, paired with **JetBrains Mono** for technical data points and status labels. This combination balances human readability with machine-like precision.

- **Headlines:** Use IBM Plex Sans with tighter tracking for an authoritative, "locked-in" appearance.
- **Technical Labels:** All status markers (Active, Beta, etc.) and Readiness Level numbers must use JetBrains Mono to signify they are live system outputs.
- **Hierarchy:** Use all-caps for technical labels to distinguish them from standard UI copy.

## Layout & Spacing
The layout uses a **Fluid Grid** model with high-density spacing. The 4px base unit ensures tight alignment required for terminal-style interfaces where information density is critical.

- **Grid:** 12-column grid on desktop, 4-column on mobile.
- **Regional Density Markers:** Displayed as a sub-grid or heat-map overlay within data panels, using the 4px unit for granular spacing between nodes.
- **Breakpoints:** 
    - Mobile: < 600px (single column stack).
    - Tablet: 600px - 1024px (compact side-bars).
    - Desktop: > 1024px (multi-pane terminal view).

## Elevation & Depth
In this design system, depth is communicated through **Tonal Layers** rather than shadows, maintaining a flat, technical aesthetic.

- **Base Layer:** Deep Slate (#0F172A) for the primary background.
- **Mid Layer:** Elevated containers use a slightly lighter Slate (#1E293B) with a **1px Low-contrast outline** (#334155).
- **Interactive Layer:** Active panels or hovered elements use a subtle inner glow or a Sovereign Green border stroke.
- **Separators:** 1px solid lines using Slate-700 to divide data rows without adding visual bulk.

## Shapes
The shape language is **Soft (0.25rem)**. This slight rounding prevents the UI from feeling overly hostile or aggressive while maintaining a sharp, efficient, and professional profile. 

- **Status Badges:** Use the standard 0.25rem radius.
- **Readiness Bars:** Rectangular with 0.25rem radius on the container; the inner progress fill should have sharp corners on the leading edge to suggest ongoing movement.

## Components
Consistent implementation of these components ensures the system feels like a singular deployment terminal.

- **Status Chips:** High-contrast background with JetBrains Mono text. Example: `[ ACTIVE ]` in Sovereign Green.
- **Readiness Meters:** A segmented progress bar (0-100) where segments light up based on the current level. Use Sovereign Green for levels >80, Amber for 40-79, and Slate for <39.
- **Deployment Cards:** Flat containers with a header row containing the "Regional Density Marker" (a small dot-matrix icon or numeric density code).
- **Action Buttons:** Ghost-style buttons with 1px borders for secondary actions; solid Sovereign Green for the "Execute Deployment" or "Commit Changes" primary actions.
- **Input Fields:** Inset style with Deep Slate background and monospaced text entry. Focus state should be a 1px Sovereign Green outline.
- **Lists:** Data-heavy tables with alternating row tints and "Read-Only" monospaced labels for system parameters.