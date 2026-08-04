---
name: Ubiquity OS
colors:
  surface: '#f9f9fd'
  surface-dim: '#d9dade'
  surface-bright: '#f9f9fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f7'
  surface-container: '#eeedf2'
  surface-container-high: '#e8e8ec'
  surface-container-highest: '#e2e2e6'
  on-surface: '#1a1c1f'
  on-surface-variant: '#444654'
  inverse-surface: '#2f3034'
  inverse-on-surface: '#f0f0f4'
  outline: '#757686'
  outline-variant: '#c5c5d7'
  surface-tint: '#3350d5'
  primary: '#001e81'
  on-primary: '#ffffff'
  primary-container: '#002eb8'
  on-primary-container: '#99a9ff'
  inverse-primary: '#b9c3ff'
  secondary: '#585f6c'
  on-secondary: '#ffffff'
  secondary-container: '#d9e0ef'
  on-secondary-container: '#5c6370'
  tertiary: '#5b0c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#831600'
  on-tertiary-container: '#ff8f77'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dee1ff'
  primary-fixed-dim: '#b9c3ff'
  on-primary-fixed: '#001159'
  on-primary-fixed-variant: '#0e34bd'
  secondary-fixed: '#dce3f2'
  secondary-fixed-dim: '#c0c7d6'
  on-secondary-fixed: '#151c27'
  on-secondary-fixed-variant: '#404753'
  tertiary-fixed: '#ffdad3'
  tertiary-fixed-dim: '#ffb4a4'
  on-tertiary-fixed: '#3d0600'
  on-tertiary-fixed-variant: '#8a1c03'
  background: '#f9f9fd'
  on-background: '#1a1c1f'
  surface-variant: '#e2e2e6'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Hanken Grotesk
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
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  headline-sm-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
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
  container-max: 1440px
---

## Brand & Style
The design system is engineered as a high-utility, high-authority digital infrastructure for African logistics and commerce. The brand personality is **Systematic, Resilient, and Absolute**. It aims to evoke a sense of unshakable reliability and institutional trust, moving away from "startup" aesthetics toward an "infrastructure" feel.

The design style is **Corporate Modern with a Functional Grid**. It prioritizes extreme legibility, high information density, and a structured hierarchy. While the interface is clean and professional, it incorporates subtle high-contrast accents to ensure visibility in high-glare outdoor environments common in field logistics. The aesthetic is defined by its precision—using sharp alignments and a systematic approach to state management.

## Colors
The palette is anchored by a "Deep Infrastructure Blue" (Primary), conveying authority and stability. The neutral scale is optimized for data-heavy administrative views, using cool grays to prevent visual fatigue.

**Functional Status Palette:**
- **Order Created:** Neutral slate, indicating a pending/dormant state.
- **Ready for Pickup:** High-visibility Amber, signaling an actionable transition.
- **Picked Up:** Active Blue, representing the movement phase.
- **Delivered:** Success Green, confirming completion.
- **Failed Delivery:** Critical Red, requiring immediate intervention.
- **Disputed:** Warning Orange, indicating a conflict state.

The background is a crisp white (#FFFFFF) with subtle off-white (#F8FAFC) surface tiers to delineate different functional zones in the administrative dashboard.

## Typography
The typography system uses a tri-font strategy to balance character, readability, and technical precision.

1.  **Hanken Grotesk (Headlines):** A sharp, contemporary grotesque that provides a professional and forward-thinking tone for high-level navigation and section headers.
2.  **Inter (Body):** The workhorse for all data entry, descriptions, and primary interface text, chosen for its exceptional legibility on mobile screens.
3.  **JetBrains Mono (Labels/IDs):** Used exclusively for technical data—Order IDs, Barcode strings, GPS coordinates, and Status labels. The monospaced nature ensures that alphanumeric tracking codes are easy to parse and compare.

## Layout & Spacing
The layout follows a **Strict Grid Model** to support administrative efficiency. 

- **Desktop:** A 12-column grid with a 1440px max-width. Sidebars for navigation and filtering are fixed, while the central data area is fluid.
- **Mobile:** A single-column fluid layout with 16px side margins. 
- **Spacing Rhythm:** Based on a 4px baseline unit. All padding and margins must be multiples of 4px (e.g., 8, 16, 24, 32). This ensures a rhythmic consistency that makes complex data tables easier to scan.

Horizontal lines should be used sparingly but firmly to separate "Order" entities, while vertical dividers are used in the dashboard to separate "Live Metrics" from "Historical Logs."

## Elevation & Depth
This design system avoids heavy shadows to maintain a "flat infrastructure" feel. 

- **Surface Tiers:** Depth is primarily communicated through tonal layering. Backgrounds use `#F8FAFC`, while active cards and containers use `#FFFFFF`.
- **Low-Contrast Outlines:** Instead of shadows, use 1px solid borders in `#E2E8F0` for cards and `#CBD5E1` for interactive inputs.
- **Active State Elevation:** Only when an item is being "dragged" or "prioritized" in the logistics queue should a subtle, 4px blur, 10% opacity black shadow be applied to indicate lift.

## Shapes
The shape language is **Soft (0.25rem)**. This provides a professional, "software-tool" aesthetic that feels more modern than sharp corners but remains more serious than highly rounded "consumer" apps. 

- **Buttons & Inputs:** 4px (0.25rem) corner radius.
- **Large Cards/Containers:** 8px (0.5rem) corner radius.
- **Status Badges:** 4px (0.25rem) corner radius to match the systematic grid.

## Components
Consistent component behavior is vital for high-speed logistics operations.

### Logistics Status Badges
Status tokens from Section 2 are applied to a "pill" badge with a 10% opacity background of the same color and a 100% opacity text label in **label-sm (JetBrains Mono)**.

### Specialized Logistics Elements
- **QR Scanning:** A dedicated floating action button (FAB) or prominent input icon using a "square-scan" glyph.
- **Barcode IDs:** Displayed in **label-md** with a barcode icon prefix.
- **GPS Trailing:** On maps, use a 2px primary blue line with "breadcrumb" dots at 5-minute intervals. The current location is a pulsing blue dot with a directional arrow.
- **Photo Proof-of-Delivery:** A thumbnail component with a 4px radius, showing a "camera" overlay when empty and a "view full size" expander when populated.

### Buttons & Inputs
- **Primary Button:** Solid #002EB8 with White text.
- **Input Fields:** 1px border with JetBrains Mono for placeholder text to signal "data entry" mode.
- **Data Tables:** High-density rows (40px height) with zebra-striping for horizontal scanning accuracy in administrative views.