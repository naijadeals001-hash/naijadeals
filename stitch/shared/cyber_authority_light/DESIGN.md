---
name: Cyber-Authority Light
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
  on-surface-variant: '#3c4a3c'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6c7b6a'
  outline-variant: '#bbcbb8'
  surface-tint: '#006e2a'
  primary: '#006e2a'
  on-primary: '#ffffff'
  primary-container: '#00c853'
  on-primary-container: '#004c1b'
  inverse-primary: '#3ce36a'
  secondary: '#515f72'
  on-secondary: '#ffffff'
  secondary-container: '#d2e1f7'
  on-secondary-container: '#556477'
  tertiary: '#705d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cbab00'
  on-tertiary-container: '#4d4000'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#69ff87'
  primary-fixed-dim: '#3ce36a'
  on-primary-fixed: '#002108'
  on-primary-fixed-variant: '#00531e'
  secondary-fixed: '#d5e4fa'
  secondary-fixed-dim: '#b9c8de'
  on-secondary-fixed: '#0e1c2d'
  on-secondary-fixed-variant: '#3a485a'
  tertiary-fixed: '#ffe16d'
  tertiary-fixed-dim: '#e9c400'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#544600'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: IBM Plex Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: IBM Plex Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: IBM Plex Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
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
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  container-max: 1440px
---

## Brand & Style

This design system translates a high-octane "Cyber-Authority" aesthetic into a high-utility, light-mode environment. It balances the raw, infrastructure-focused precision of a data terminal with the pristine clarity of a modern enterprise dashboard. The target audience includes high-volume traders, logistics coordinators, and business administrators who require long-duration legibility without sacrificing the "techno-optimist" energy of the brand.

The style is **Corporate Modern with Technical Accents**. It utilizes high-contrast typography and structured grid layouts to maintain a sense of authority. The emotional response is one of efficiency, transparency, and institutional trust—mirroring the reliability of national infrastructure while maintaining a cutting-edge digital edge.

## Colors

The palette is anchored by "Naija Green" (#00C853), calibrated specifically for accessibility on white backgrounds. Navy Blue (#051424) serves as the primary ink for headers and navigation, providing a grounded, authoritative contrast.

- **Primary (Naija Green):** Used for primary actions, success states, and brand highlights.
- **Secondary (Navy Blue):** Reserved for high-level navigation, headings, and active states to ground the UI.
- **Tertiary (Gold):** Applied sparingly for premium membership indicators, verified badges, and critical highlights.
- **Neutral Scale:** Uses a cool-toned slate gray to maintain the "technical" feel of the infrastructure.
- **Semantic Colors:** Adjusted for high-contrast ratios against the pure white (#FFFFFF) background to ensure readability in data-heavy workflows.

## Typography

The typographic system utilizes a triple-font approach to reinforce the "Cyber-Authority" narrative:

1.  **IBM Plex Sans (Headings):** Chosen for its engineered, industrial feel. It conveys the "infrastructure" aspect of the brand.
2.  **Inter (Body):** Used for maximum legibility in complex forms and long-form content.
3.  **JetBrains Mono (Data/Labels):** Employed for numerical data, status labels, and secondary metadata to mimic terminal outputs and technical specifications.

**Hierarchy Rules:**
- All H1-H3 headers must use Navy Blue (#051424).
- Data points in dashboards should default to `data-mono` for precise vertical alignment.
- Labels for form inputs use `label-caps` in neutral-600.

## Layout & Spacing

This system utilizes a **12-column Fluid Grid** with a strict 4px baseline rhythm. The "Cyber-Authority" layout favors high density; therefore, internal component padding is tight while external layout margins are generous to prevent visual clutter.

- **Desktop:** 12 columns, 24px gutters, 40px side margins.
- **Tablet:** 8 columns, 16px gutters, 24px side margins.
- **Mobile:** 4 columns, 16px gutters, 16px side margins.

**Spacing Logic:** 
Spacing is applied in multiples of 4px. Use `16px` (4 units) for standard component padding and `24px` (6 units) for section spacing. In data terminals, vertical spacing can be compressed to `8px` (2 units) to maximize information density.

## Elevation & Depth

Elevation is conveyed through a combination of **Tonal Layers** and **Subtle Outlines**. In Light Mode, we avoid heavy shadows to maintain a clean "infrastructure" feel.

- **Level 0 (Base):** Pure White (#FFFFFF).
- **Level 1 (Cards/Surface):** White background with a 1px border of #E2E8F0.
- **Level 2 (Hover/Active):** Very soft ambient shadow (0px 4px 12px rgba(5, 20, 36, 0.05)).
- **Level 3 (Modals/Popovers):** Focused shadow (0px 12px 32px rgba(5, 20, 36, 0.12)) and a 1px border of #E2E8F0.

Sidebars and secondary navigation drawers should use the `Surface Low` (#F8FAFC) background color to create a distinct functional zone from the primary content area.

## Shapes

To maintain the "Cyber-Authority" aesthetic, shapes are kept crisp and disciplined. The system uses a **Soft (0.25rem)** rounding standard across all primary components.

- **Standard (Base):** 4px (0.25rem) — Used for buttons, inputs, and small cards.
- **Large:** 8px (0.5rem) — Used for main containers and dashboard widgets.
- **Extra Large:** 12px (0.75rem) — Used for modals and large surface areas.

Sharp corners are avoided to ensure the UI feels modern, but high-radius "pill" shapes are restricted only to tags/chips to maintain a professional, industrial silhouette.

## Components

### Buttons
- **Primary:** Background #00C853, Text #FFFFFF. 4px border radius. Solid state.
- **Secondary:** Background #051424, Text #FFFFFF. Use for high-authority actions.
- **Outline:** Transparent background, 1px Border #E2E8F0, Text #051424.
- **Ghost:** No background, Text #64748B. Use for utility actions.

### Cards & Containers
- Cards must use a white background with a 1px #E2E8F0 border.
- For dashboard "Infrastructure" widgets, use a #F8FAFC header section with a bottom border to separate controls from content.

### Input Fields
- **Default:** White background, 1px Border #E2E8F0, 4px radius. 
- **Focus:** 1px Border #00C853 with a 2px soft glow of the same color (20% opacity).
- **Placeholder:** Text #94A3B8 using `body-md`.

### Chips & Badges
- **Status Badges:** Use subtle background tints (e.g., Success: #DCFCE7 background with #16A34A text) with `label-caps` typography.
- **Action Chips:** Navy Blue (#051424) outline with JetBrains Mono text for a technical feel.

### Lists & Data Tables
- Header rows should be #F1F5F9 with Navy Blue uppercase labels.
- Alternate row striping is not required; use 1px horizontal borders (#F1F5F9) for separation.
- Ensure all numerical data is right-aligned using `data-mono`.