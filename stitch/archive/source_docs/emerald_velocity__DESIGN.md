---
name: Emerald Velocity
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1b1b1b'
  on-surface-variant: '#404944'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#006e14'
  on-secondary: '#ffffff'
  secondary-container: '#4cfc55'
  on-secondary-container: '#007115'
  tertiary: '#4f1f19'
  on-tertiary: '#ffffff'
  tertiary-container: '#6b342d'
  on-tertiary-container: '#ea9e93'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#73ff6f'
  secondary-fixed-dim: '#2ae540'
  on-secondary-fixed: '#002202'
  on-secondary-fixed-variant: '#00530d'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#ffb4a9'
  on-tertiary-fixed: '#380d08'
  on-tertiary-fixed-variant: '#6e372f'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
  surface-white: '#ffffff'
  gray-muted: '#f4f4f4'
  success-emerald: '#065f46'
  status-warning: '#fbbf24'
  status-error: '#ef4444'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  mono-data:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  margin-mobile: 20px
  margin-desktop: 48px
  gutter-grid: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 40px
---

## Brand & Style

The design system is engineered for the fast-paced African fintech landscape, prioritizing speed, extreme legibility, and high-trust aesthetics. It bridges the gap between a lean utility and a comprehensive financial super-app.

The visual style is **Corporate Modern with Tactile Accents**, blending the high-utility structure of global fintech with localized accessibility needs. The interface relies on expansive white space to reduce cognitive load, punctuated by high-authority emerald green accents that signify stability and growth. Interaction patterns are oversized and "thumb-friendly" for mobile-first users, while the desktop environment shifts toward a data-dense, technical "Command Center" aesthetic for complex financial management.

## Colors

This design system utilizes a high-contrast palette to ensure accessibility under varying lighting conditions, common in mobile-first markets.

- **Primary Emerald (#064e3b):** Reserved for high-authority elements, primary headers, and the "Command Center" navigation.
- **Secondary Action Green (#00d632):** A vibrant, high-energy green used exclusively for successful transaction states and positive financial growth indicators.
- **Neutral Black (#000000):** Used for maximum legibility in typography and primary iconography.
- **Surface White (#FFFFFF):** The foundation for all mobile screens to maintain a "clean" and "fast" perception.

## Typography

Typography is the primary driver of hierarchy in the design system. **Plus Jakarta Sans** is used across all levels for its modern, geometric clarity and excellent readability at small sizes.

For financial figures and currency display, use `display-lg` with tight letter-spacing to create a sense of significance. In the desktop Command Center, use the `mono-data` setting (tightened tracking and medium weight) for tabular data to ensure alignment and rapid scanning of real-time figures.

## Layout & Spacing

The design system employs a **Fluid-Fixed Hybrid** model.

- **Mobile:** A single-column fluid layout with 20px side margins. Key actions (Send/Pay) are anchored to the bottom "Safe Area" for ergonomic access.
- **Desktop (Command Center):** A 12-column grid with a fixed left-hand navigation. Dashboard widgets utilize a "bento-box" arrangement, snapping to the grid to handle data-dense sparklines and crypto charts.
- **Spacing Rhythm:** All spacing must be a multiple of 8px. Use `stack-lg` to separate major content sections (e.g., separating the Balance card from the Transaction list).

## Elevation & Depth

Visual hierarchy is achieved through a combination of **Tonal Layering** and **Subtle Glassmorphism**.

1.  **Base Layer:** Solid `#FFFFFF` or `#F4F4F4`.
2.  **Surface Layer:** Elevated cards use a 1px soft border (#E5E7EB) and a very large, low-opacity shadow (0px 20px 40px rgba(0,0,0,0.04)).
3.  **Glassmorphism:** Overlays, such as the Aura AI chat bubble or modal bottom sheets, utilize a backdrop blur (20px) with a semi-transparent white fill (70% opacity) to maintain context of the underlying screen.
4.  **Aura AI:** Features a subtle radial glow effect (using the Primary Emerald) to distinguish it as an intelligent, active element.

## Shapes

The shape language is "Friendly-Professional." 

- **Primary Buttons & Cards:** Use `rounded-xl` (24px) to create a soft, approachable feel that mimics physical payment cards.
- **Input Fields & Small Chips:** Use `rounded-lg` (16px) for a more structured look within forms.
- **Icons:** Set within circular containers for quick-action grids to maximize target area and visual consistency.

## Components

### Buttons
- **Primary Action:** Extra-large (min-height 64px), Black background with White text, `rounded-xl`. 
- **Secondary Action:** Primary Emerald background with White text.
- **Quick Action Grid:** Square containers with 24px rounded corners, featuring a large central icon and a label below.

### Cards & Lists
- **Financial Cards:** Use the Glassmorphic style for the current balance display. Include a subtle "shimmer" effect on crypto sparklines.
- **Transaction List:** High-contrast text for amounts. Merchant logos must be housed in 40px circular avatars with a light gray border.

### Inputs
- **Amount Entry:** No borders. Large-scale typography centered on the screen with an auto-scaling font size as the user types.
- **Aura AI:** A persistent floating action button in the bottom right, using a gradient-tinted blur and a distinctive "spark" icon.

### Command Center (Desktop)
- **Data Grids:** Condensed row heights with zebra-striping for readability.
- **Sparklines:** Use the Secondary Action Green for positive trends and Status Error Red for negative trends, rendered with a 2px stroke width.