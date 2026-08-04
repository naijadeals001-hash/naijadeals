---
name: Continental Oversight
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3f4941'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6f7a70'
  outline-variant: '#bfc9be'
  surface-tint: '#126c3e'
  primary: '#004a27'
  on-primary: '#ffffff'
  primary-container: '#006437'
  on-primary-container: '#8bdea5'
  inverse-primary: '#85d8a0'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#373f54'
  on-tertiary: '#ffffff'
  tertiary-container: '#4e566c'
  on-tertiary-container: '#c4cbe6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a1f5ba'
  primary-fixed-dim: '#85d8a0'
  on-primary-fixed: '#00210e'
  on-primary-fixed-variant: '#00522c'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
---

## Brand & Style
The design system is engineered for high-stakes operational management and institutional trust. It serves as the authoritative interface for a Pan-African super-app, prioritizing clarity, security, and large-scale logistical coordination.

The aesthetic follows a **Corporate / Modern** direction with a focus on data density. It evokes a sense of stability and pan-regional unity through a sophisticated palette and precise layout. The interface avoids unnecessary decoration, opting instead for functional elegance that signals reliability to government officials, logistics partners, and enterprise administrators.

## Colors
The color strategy centers on "Deep Forest Green" (#006437), a color associated with growth, wealth, and continental prestige. This primary hue is used for high-level navigational elements and primary actions to anchor the user's focus.

*   **Primary:** Deep Forest Green (#006437) for brand presence and key CTAs.
*   **Secondary:** Emerald Accent (#10B981) for success states and growth indicators.
*   **Tertiary:** Slate Navy (#0F172A) for high-contrast text and structural borders.
*   **Neutral:** A range of cool grays starting from "Cloud White" (#F8FAFC) for backgrounds to "Steel" (#64748B) for secondary information.

Status indicators must be sophisticated: use desaturated tones for background washes and high-chroma versions for text and icons to ensure legibility without visual fatigue in data-heavy views.

## Typography
This design system utilizes **Hanken Grotesk** across all levels to maintain a precise, engineered feel. The typeface’s clean geometry ensures maximum legibility in complex dashboards and dense tables.

For data-heavy interfaces, use `body-md` as the standard for table cells and `label-sm` (all-caps) for column headers to create clear structural distinction. Headlines use slightly tighter letter spacing to maintain a commanding, institutional presence.

## Layout & Spacing
The layout follows a **Fixed Grid** model on desktop to ensure that complex data visualizations remain consistent and readable. 

*   **Desktop:** 12-column grid with a max-width of 1440px. 24px gutters provide breathing room between dense data modules.
*   **Tablet:** 8-column fluid grid.
*   **Mobile:** 4-column fluid grid with 16px side margins.

Spacing is based on a 4px baseline shift. In admin views, "Compact" spacing (8px-12px) should be used for lists and tables, while "Standard" spacing (24px-32px) is reserved for separating major functional modules.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and **Ambient Shadows**. Surfaces are tiered to represent information priority:

1.  **Background (Level 0):** #F8FAFC (Neutral base).
2.  **Surface (Level 1):** Pure White (#FFFFFF) with a 1px border (#E2E8F0) for cards and main modules.
3.  **Raised (Level 2):** Subtle, extra-diffused shadows (0px 4px 12px rgba(0, 0, 0, 0.03)) for interactive elements like buttons and dropdowns.
4.  **Overlay (Level 3):** Modals and flyouts use a more pronounced shadow (0px 12px 32px rgba(0, 0, 0, 0.08)) to focus attention during critical administrative tasks.

Avoid heavy gradients; rely on clean border lines and slight shifts in grayscale to define the hierarchy.

## Shapes
The shape language is **Soft (0.25rem)**, reflecting a professional and institutional character. 

*   **Standard Elements:** Inputs, buttons, and checkboxes use a 4px radius.
*   **Large Containers:** Cards and dashboards modules use `rounded-lg` (8px).
*   **Indicators:** Status badges and tags use a slightly higher `rounded-xl` (12px) to differentiate them from functional buttons.

This subtle rounding strikes a balance between the precision of sharp corners and the modern approachability of rounded UI.

## Components
Consistent styling across administrative tools is vital for operational efficiency:

*   **Buttons:** Primary buttons use #006437 with white text. Secondary buttons use a white fill with a Slate Navy border.
*   **Data Tables:** Use alternating row stripes (Zebra striping) in #F8FAFC. Headers should be sticky with a subtle bottom border.
*   **Input Fields:** Ghost-style borders (#E2E8F0) that thicken and darken to #006437 on focus. Error states use a high-visibility crimson (#DC2626).
*   **Status Indicators:** Use "Pill" shapes. Logistics status (e.g., "In Transit") uses Primary Green; Security status (e.g., "Verified") uses Secondary Emerald.
*   **Logistics Cards:** Feature a left-hand accent bar in Primary Green to visually group related shipment or operational data.
*   **Audit Trails:** Monospaced numbers for timestamps to ensure vertical alignment in lists.