---
name: NaijaJobs Infrastructure
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c4c5d9'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#8e90a2'
  outline-variant: '#434656'
  surface-tint: '#b8c3ff'
  primary: '#b8c3ff'
  on-primary: '#002388'
  primary-container: '#2e5bff'
  on-primary-container: '#efefff'
  inverse-primary: '#124af0'
  secondary: '#bec6e0'
  on-secondary: '#283044'
  secondary-container: '#3f465c'
  on-secondary-container: '#adb4ce'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#007d55'
  on-tertiary-container: '#bdffdb'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c3ff'
  on-primary-fixed: '#001356'
  on-primary-fixed-variant: '#0035be'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
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
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1440px
  gutter: 20px
---

## Brand & Style

The design system is engineered for a high-stakes employment ecosystem, balancing the rigorous demands of institutional recruitment with the accessibility required for a national workforce. It functions as a professional extension of the core infrastructure, prioritizing "Operational Trust"—the feeling that the platform is secure, authoritative, and efficient.

The aesthetic is **Modern Corporate with a Dark Mode foundation**. It utilizes a sophisticated interplay of deep charcoal surfaces and precise, vibrant accents to denote status and intelligence. The visual language avoids decorative fluff in favor of high-density data clarity, making it suitable for both high-volume administrative consoles and streamlined candidate interfaces. The emotional response is one of reliability, technical superiority (via Aura AI), and official validation.

## Colors

The palette is anchored by **Recruitment Navy** (#0F172A) and **Industrial Charcoal** (#020617) to maintain continuity with the broader infrastructure ecosystem. 

- **Workforce Blue (Primary):** A high-visibility, professional blue used for primary actions and key navigation elements.
- **Aura AI (Accent):** A deep violet reserved exclusively for AI-driven matching indicators and smart suggestions.
- **Verification Gold:** A prestigious amber used for trust badges and verified institutional status.
- **Functional States:** Success is rendered in a cool emerald, while errors use a high-contrast crimson to ensure immediate visibility against dark surfaces.

## Typography

This design system utilizes **Plus Jakarta Sans** for its clean, geometric, yet approachable character. It provides the "authoritative" tone required for government and institutional recruitment while remaining legible at small sizes for data-heavy dashboards.

For administrative consoles where technical precision is required (such as candidate IDs or API strings), **JetBrains Mono** is introduced as a secondary functional font. Line heights are kept tight in administrative views to maximize vertical density, but expanded in candidate-facing views to improve reading comfort.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

- **Administrative Layouts:** Use a "Compact" spacing model (8px/16px increments) to allow for high-density information display. Margins are minimized to maximize workspace.
- **Candidate Layouts:** Use a "Spacious" spacing model (24px/32px increments) to reduce cognitive load during the application process.
- **Breakpoints:**
  - Mobile: < 600px
  - Tablet: 600px - 1024px
  - Desktop: > 1024px

## Elevation & Depth

This design system uses **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows to maintain a sleek, technical feel.

1.  **Level 0 (Base):** #020617 (The deep background).
2.  **Level 1 (Surface):** #0F172A (Cards, sidebar, secondary navigation).
3.  **Level 2 (Overlay):** #1E293B (Modals, dropdowns, hovered states).

Depth is communicated through 1px solid borders in #334155 (Slate 700). High-priority elements, like Aura AI insights, utilize a subtle **Outer Glow** using the Aura AI accent color to signify importance without breaking the flat aesthetic.

## Shapes

The shape language is **Soft (0.25rem)**. This provides a professional, "standardized" appearance that feels engineered. 

- **Buttons & Inputs:** 4px (rounded-sm) for a crisp, technical look.
- **Dashboard Cards:** 8px (rounded-lg) to provide a clear container hierarchy.
- **Verification Badges:** Circular or fully pill-shaped to distinguish them from interactive UI elements.

## Components

### Buttons
- **Primary:** Solid Workforce Blue with white text. High-contrast.
- **Secondary:** Transparent background with a 1px Slate border.
- **Aura Action:** Gradient background (Workforce Blue to Aura AI Violet) used exclusively for AI-generated recommendations.

### Trust & Verification
- **Trust Badges:** Small, gold-tinted badges with a "Seal" icon for verified employers.
- **Verification Status:** Inline labels using `label-caps`. "Verified" uses a green check; "Pending" uses a muted slate circle.

### Aura AI Matching Indicators
- **Match Score:** A circular progress ring using the Aura AI violet.
- **Intelligence Tags:** Chips with a subtle violet background and 10% opacity, used to highlight why a candidate was matched (e.g., "Skill Match", "Location Fit").

### Data Density
- **Lists:** High-density rows with 8px vertical padding. Use `data-mono` for ID numbers and timestamps.
- **Inputs:** Darker background than the surface they sit on (#020617 on a #0F172A surface) with a 1px border that illuminates in Workforce Blue on focus.