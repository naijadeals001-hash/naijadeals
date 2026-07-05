---
name: NaijaHealth Ecosystem
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#3d4947'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#595c5e'
  on-tertiary: '#ffffff'
  tertiary-container: '#727577'
  on-tertiary-container: '#fbfdff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
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
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
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
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding-mobile: 16px
  container-padding-desktop: 32px
  gutter: 16px
  stack-sm: 4px
  stack-md: 12px
  stack-lg: 24px
---

## Brand & Style
The design system for this digital healthcare platform is anchored in **Professionalism, Trust, and Accessibility**. It bridges the gap between a high-scale marketplace and a premium clinical environment. The aesthetic is a refined blend of **Corporate Modern** and **Minimalism**, prioritizing clarity of information to reduce patient anxiety and streamline provider workflows.

The visual narrative focuses on "Ecosystem Activation"—moving the user through a journey of health and trust. Every interface element must evoke a sense of reliability and cleanliness, characteristic of top-tier medical institutions, while maintaining the approachability required for a mass-market African super-app. Whitespace is used strategically to create an "airy" feel, ensuring that dense medical data remains legible and non-threatening.

## Colors
The palette is centered on "Healing Teal" and "Trust Blue," colors scientifically associated with health, hygiene, and stability.

- **Primary (Healing Teal):** Used for primary actions, ecosystem activation states, and health-specific branding.
- **Secondary (Trust Blue):** Used for verification badges, secure payment flows, and professional certification indicators.
- **Neutral Scale:** A range of cool grays (from #F8FAFC to #1E293B) provides the structural foundation. Backgrounds should primarily use "Clean White" to maintain a clinical, sanitary feel.
- **Functional Colors:** High-contrast semantic colors are used for status indicators (e.g., "Doctor Available," "Urgent Lab Result"). These must pass WCAG AA accessibility standards against white backgrounds.

## Typography
The typography strategy employs a dual-sans system. **Plus Jakarta Sans** is used for headlines to provide a friendly, modern, and slightly rounded personality that feels welcoming. **Inter** is utilized for body text and UI labels due to its exceptional legibility in data-heavy medical contexts and small screen sizes.

Hierarchy is strictly enforced to help users distinguish between clinical instructions, provider names, and marketplace pricing. Large headings on mobile are capped at 24px to ensure readability without excessive scrolling.

## Layout & Spacing
This design system utilizes a **Fluid Grid** with a logic based on an 8px root unit. 

- **Mobile:** 4-column layout with 16px side margins and 16px gutters.
- **Tablet:** 8-column layout with 24px margins.
- **Desktop:** 12-column layout with a maximum container width of 1280px to prevent excessive line lengths in medical articles or patient records.

Spacing should be generous ("Airy"). Use `stack-lg` (24px) between distinct content sections (e.g., separating "Doctor Bio" from "Patient Reviews") to maintain visual breathing room.

## Elevation & Depth
Elevation is used sparingly to maintain a "flat but layered" medical aesthetic. 

- **Surface 0:** The main background (#FFFFFF).
- **Surface 1:** Subtle containers using a 1px border (#E2E8F0) or a very soft, ambient shadow (Y: 2px, B: 8px, Opacity: 4%, Color: #1E293B). This is the default for medical cards.
- **Surface 2:** Active or hovered states. Increase shadow diffusion (Y: 4px, B: 12px, Opacity: 8%) to suggest interactivity.
- **Overlays:** Modals and dropdowns use a prominent backdrop blur (12px) and a deeper shadow to focus the user's attention on critical health tasks.

## Shapes
A **Rounded** shape language is applied across the system. Standard UI elements (buttons, inputs) utilize a **0.5rem (8px)** radius. 

Larger containers, such as doctor profile cards or ecosystem status modules, utilize **1rem (16px)** roundedness to appear "friendly" and modern. Highly interactive elements like chips and status tags use a full pill-shape (999px) to distinguish them from structural components.

## Components
- **Buttons:** Primary buttons use a solid "Healing Teal" fill with white text. Secondary buttons use a "Trust Blue" outline with 1px weight.
- **Ecosystem Activation Module:** Uses a stepper-style component with Teal progress rings. Unactivated states are shown in low-opacity gray; active states glow with a subtle Teal drop shadow.
- **Verification Badges:** Small, circular icons with a "Trust Blue" checkmark and a light blue background (#EFF6FF), placed adjacent to provider names.
- **Cards:** White backgrounds with 1px light gray borders. Include a "Trust Score" badge in the top right corner using a star icon and bold numerical value.
- **Input Fields:** Clean, 1px bordered boxes that turn "Trust Blue" on focus. Labels are always visible above the field (Inter, label-sm).
- **Medical Iconography:** Two-tone icons using Healing Teal for primary shapes and Trust Blue for accent details. Lines are consistent 2px weight with rounded caps.
- **Status Indicators:** "Live" indicators (e.g., "Doctor is Online") feature a pulsing green dot next to the label.