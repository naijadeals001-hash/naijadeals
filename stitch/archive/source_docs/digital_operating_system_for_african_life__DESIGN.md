---
name: Digital Operating System for African Life
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f6'
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
  secondary: '#575e70'
  on-secondary: '#ffffff'
  secondary-container: '#d9dff5'
  on-secondary-container: '#5c6274'
  tertiary: '#0053db'
  on-tertiary: '#ffffff'
  tertiary-container: '#638cff'
  on-tertiary-container: '#00256c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#77fca3'
  primary-fixed-dim: '#59df89'
  on-primary-fixed: '#00210d'
  on-primary-fixed-variant: '#005228'
  secondary-fixed: '#dce2f7'
  secondary-fixed-dim: '#c0c6db'
  on-secondary-fixed: '#141b2b'
  on-secondary-fixed-variant: '#404758'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#b4c5ff'
  on-tertiary-fixed: '#00174b'
  on-tertiary-fixed-variant: '#003ea8'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
  trust-amber: '#F59E0B'
  trust-amber-surface: '#FEF3C7'
  security-crimson: '#EF4444'
  security-crimson-surface: '#FEE2E2'
  canvas-pure: '#FFFFFF'
  text-muted: '#4B5563'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-bold:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  price-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '800'
    lineHeight: 24px
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter-mobile: 16px
  margin-mobile: 16px
  touch-target-min: 48px
  touch-target-primary: 52px
---

## Brand & Style

This design system establishes a high-trust, mobile-first ecosystem that blends the utility of a digital operating system with the vibrancy of African commerce. The style is **Modern Corporate with Tactile Affordances**, prioritizing extreme clarity and rapid performance under varying network conditions and environmental lighting.

The visual narrative centers on "The Verified Path"—a design language where high-contrast trust signals (badges, scores, and verification stamps) are woven into a clean, minimalist interface. By utilizing heavy whitespace and a restricted but bold color palette, the system ensures that complex multi-vertical data (Retail, Food, Gigs, Logistics) remains digestible. The identity is distinctly African through its use of localized UX patterns, such as Negotiable Price modes and utility infrastructure scoring, presented with global-standard refinement.

- **Emotional Response:** Empathetically efficient, unshakeably secure, and culturally resonant.
- **Visual Movement:** High-performance Minimalism mixed with Bold Trust Signifiers.

## Colors

The color strategy is functional and hierarchy-driven, designed for maximum legibility in high-sunlight environments.

- **Primary (African Green):** Reserved for "Value Creation" actions—checkout, success states, and growth-related triggers. It represents the vibrant heart of the commerce engine.
- **Secondary (Deep Charcoal):** Used for structural authority. It defines the primary navigation, core headings, and high-impact UI boundaries, providing the "Operating System" feel.
- **Tertiary (Media Indigo):** Dedicated to the creative and logistics sectors (Streaming, Gigs, and Send) to differentiate service types within the super app.
- **Trust & Alert Tiers:** Amber is strictly reserved for "Verified" status and "Legit" vendor tags. Crimson is used only for high-priority security warnings or critical infrastructure deficits (e.g., zero security score).

## Typography

The typography system uses a dual-font approach to balance personality with utility. 

**Plus Jakarta Sans** is the "Voice of the Brand," used for headlines and numbers to provide a modern, optimistic geometric feel. **Inter** is the "Workhorse," used for all body text, metadata, and labels to ensure maximum readability at small sizes and in dense listings.

For local market contexts, Pidgin-friendly labels should use `body-bold` to ensure they carry equal visual weight to their formal English counterparts. Pricing is always rendered in `price-display` (Plus Jakarta Sans) to ensure financial figures are the most prominent data point on any card.

## Layout & Spacing

The layout philosophy follows a **strict 8px baseline grid** optimized for mobile-first consumption.

- **Mobile Grid:** A flexible 2-column or 1-column grid based on the content density of the vertical (e.g., 2-columns for retail products, 1-column for property/gig listings).
- **Safe Margins:** A consistent 16px side margin is maintained across all mobile views to prevent content from hitting device edges.
- **Touch Targets:** A minimum target of 48px is enforced, with primary action buttons (Checkout, Book, Send) standardized at 52px to ensure ease of use for users on the move or in transit.
- **Section Rhythm:** Major ecosystem modules (NaijaEats vs NaijaShop) are separated by 32px of vertical white space or a light `#F9FAFB` surface block to provide visual breathing room.

## Elevation & Depth

Visual hierarchy is conveyed through **Tonal Layering and Soft Outlines** rather than heavy shadows, ensuring the UI remains fast and performant on mid-tier devices.

- **Surface Tiers:** Backgrounds use `canvas-pure`. Section separators and secondary surfaces use `neutral-color-hex`. 
- **Card Depth:** Item cards use a 1px solid border (`#E5E7EB`) with an extremely soft, low-opacity ambient shadow (Blur: 8px, Y: 2px, Opacity: 4%) to lift them slightly from the canvas.
- **Active Elevation:** Interactive elements like the "Local Market Mode" toggle use a slightly higher elevation to suggest they are "above" the standard commerce flow.
- **Backdrop Blurs:** Used sparingly for bottom sheets and navigation overlays to maintain context while focusing user attention.

## Shapes

The shape language is **Rounded and Friendly**, moving away from sharp industrial edges to feel more approachable and modern.

- **Primary Elements:** Buttons and Input fields use a 12px-16px radius.
- **Card Containers:** Standard listing cards use 16px. Large feature cards or ecosystem hub containers use 24px (`rounded-xl`).
- **Capsules:** All status indicators (Verified, Security Scores, Category Chips) use a full pill-shape (`rounded-full`) to clearly distinguish them from interactive buttons.

## Components

### Buttons
- **Primary:** Solid `secondary-color-hex` (Charcoal) or `primary-color-hex` (Green) with white text. 52px height.
- **Negotiate/Chat:** Ghost style with 2px borders using the brand accent, signaling a secondary but high-value interaction.

### Cards (Domain Specific)
- **Retail/Food:** Dual-column, top-aligned image, price at bottom-right in bold.
- **Property (NaijaStay):** Single-column, wide image, featuring a footer row of "Utility Capsules" (GEN, SOLAR, SEC, NET).
- **Gig/Service:** Left-aligned avatar, name and rating, price "from" indicator.

### Trust Indicators
- **Verified Badge:** A gold-filled capsule with a checkmark icon and "100% Legit" text.
- **Security Scores:** High-contrast color-coded labels (A+ Green, B- Amber, C Crimson) placed at the top-right of property and vendor cards.

### Navigation
- **Unified Bottom Bar:** 64px height. 5 icons (Home, Search, Orders, Wallet, Account). Active state uses a Green tint and a 4px indicator dot.

### Specialized Inputs
- **Market Mode Toggle:** A large, tactile sliding switch that transforms the UI from "Fixed Price" to "Bargain/Chat" mode.
- **Pidgin Toggle:** Accessible in account settings or via a quick-action chip to swap primary labels to localized vernacular.