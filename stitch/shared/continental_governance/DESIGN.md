---
name: Continental Governance
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
  on-surface-variant: '#404944'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fd'
  on-secondary-container: '#57657b'
  tertiary: '#003623'
  on-tertiary: '#ffffff'
  tertiary-container: '#004f35'
  on-tertiary-container: '#51c695'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#d5e3fd'
  secondary-fixed-dim: '#b9c7e0'
  on-secondary-fixed: '#0d1c2f'
  on-secondary-fixed-variant: '#3a485c'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
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
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
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
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
  unit: 4px
---

## Brand & Style

The design system is engineered as a "Digital Operating System for African Life," prioritizing high-authority governance and institutional trust. It serves as the backbone for the Pan-African Super App’s administrative core, balancing continental scale with surgical precision.

The aesthetic follows a **Modern Corporate** approach—leaning heavily into structural clarity, ample but purposeful whitespace, and a high-density information architecture. It avoids decorative trends in favor of functional permanence. Every UI element is designed to feel secure, audited, and definitive, evoking the reliability of a central bank combined with the efficiency of a high-tech infrastructure platform.

## Colors

The palette is anchored in **Deep Emerald Green**, a color signifying Pan-African commerce, growth, and vitality. This is supported by **Sophisticated Slates** to provide an institutional weight and stability.

- **Primary (Emerald 900):** Used for primary actions, branding, and high-level navigation. It represents the "Authority" of the system.
- **Secondary (Slate 700):** Used for secondary actions, iconography, and structural UI elements like sidebar headers.
- **Accent (Emerald 600):** Reserved for verification success states and active indicators.
- **Neutral (Slate 500):** Used for metadata, borders, and secondary text.
- **Background:** Crisp, high-contrast whites and ultra-light grays (#F8FAFC) to ensure maximum readability for dense data sets.

## Typography

The design system utilizes **Plus Jakarta Sans** for all primary interfaces. Its modern, geometric construction provides the clarity required for complex administrative tasks. For technical data—such as transaction IDs, verification codes, and audit logs—**JetBrains Mono** is introduced to provide a distinct "data" feel that is easy to parse in dense tables.

Typography scales are optimized for a "Compact" density, prioritizing information per square inch without sacrificing legibility. Headings use tighter letter-spacing to maintain a grounded, authoritative presence.

## Layout & Spacing

The design system employs a **Fixed 12-Column Grid** for desktop views, ensuring that large-scale dashboards remain consistent and predictable.

- **Systematic Rhythm:** A 4px base unit governs all spacing.
- **Density:** The layout is high-density. Standard padding for table cells and list items is set to 12px (3 units) to allow for more rows of data per screen.
- **Breakpoints:**
  - **Desktop (1200px+):** 12 columns, 40px margins.
  - **Tablet (768px - 1199px):** 8 columns, 24px margins.
  - **Mobile (Under 768px):** 4 columns, 16px margins.

## Elevation & Depth

To maintain an institutional and secure feel, the design system minimizes the use of heavy shadows. Depth is instead conveyed through **Tonal Layers** and **Low-Contrast Outlines**.

- **Surface Levels:** The primary background is the lowest level. Content cards and data tables sit on "Level 1" surfaces with a subtle 1px border (#E2E8F0).
- **Security Elevation:** Modals and high-priority verification prompts use a very soft, diffused shadow (15% opacity Slate) to indicate temporary focus without breaking the flat, professional aesthetic.
- **Interaction:** Hover states utilize subtle background shifts (Emerald 50) rather than raising the element, maintaining the "Operating System" rigidity.

## Shapes

The shape language is **Professional and Controlled**. 

A "Soft" roundedness (4px) is applied to buttons, input fields, and containers. This slight softening prevents the UI from feeling aggressive while remaining significantly more formal than the rounded "consumer" side of the Super App. 

**Verification Badges** and **Authority Status** indicators use a slightly higher radius (8px) to distinguish them as distinct system entities, while "Pill" shapes are reserved strictly for status tags (e.g., "Active", "Pending").

## Components

### Dense Data Tables
The centerpiece of the portal. Rows are 40px high with horizontal dividers only. Column headers use uppercase `label-sm` JetBrains Mono for a technical, auditable look.

### Authority Level Headers
A unique header component found at the top of every administrative module. It features the user’s clearance level, a "Last Audited" timestamp, and a secure breadcrumb trail. It uses a Slate 900 background with white text to denote high-privilege areas.

### Verification Badges
Used for user profiles and business entities. These feature a "double-shield" icon and use the Primary Emerald color. They include a "Click to Validate" interaction that opens a cryptographic proof log.

### Multi-Step Progress Indicators
Vertical or horizontal steppers that use solid Emerald for "Complete," Slate for "Current," and light gray for "Upcoming." Each step includes a timestamp and the ID of the officer who authorized the transition.

### Input Fields
Strict, rectangular fields with 1px Slate-300 borders. Focus states transition the border to Emerald-900 with a subtle 2px outer glow. Labels are always persistent; floating labels are avoided to ensure clarity during fast data entry.

### Buttons
- **Primary:** Solid Emerald-900. High-contrast white text.
- **Secondary:** Transparent with Emerald-900 border.
- **Destructive:** Solid Maroon/Red-800, reserved for "Revoke Authority" or "Delete Records" actions.