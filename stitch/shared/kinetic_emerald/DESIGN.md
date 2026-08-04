---
name: Kinetic Emerald
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#3d4a3f'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#6d7b6e'
  outline-variant: '#bccabc'
  surface-tint: '#006d38'
  primary: '#006d38'
  on-primary: '#ffffff'
  primary-container: '#00a859'
  on-primary-container: '#003317'
  inverse-primary: '#59df89'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#52606d'
  on-tertiary: '#ffffff'
  tertiary-container: '#8594a3'
  on-tertiary-container: '#1f2d39'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#77fca3'
  primary-fixed-dim: '#59df89'
  on-primary-fixed: '#00210d'
  on-primary-fixed-variant: '#005228'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#d5e4f4'
  tertiary-fixed-dim: '#b9c8d8'
  on-tertiary-fixed: '#0f1d28'
  on-tertiary-fixed-variant: '#3a4855'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
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
    letterSpacing: -0.01em
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
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  chat-gap: 12px
---

## Brand & Style
The brand personality is **Precise, Empowering, and Transparent**. As a customer support hub for a pan-African digital ecosystem, the UI must feel like a high-performance utility—reliable enough for financial transactions yet approachable enough for daily life.

The design style is **Corporate Modern with Tactile Precision**. It utilizes a "Surface-on-Surface" approach to minimize cognitive load, using generous whitespace to allow complex support data to breathe. The aesthetic avoids unnecessary ornamentation, focusing on high-quality typography and a singular, vibrant green accent that signals growth and resolution.

The emotional response should be one of "Instant Clarity"—the user should immediately distinguish between automated assistance and human empathy, feeling secure in the knowledge that their issue is being tracked with surgical precision.

## Colors
This design system utilizes a high-contrast palette to drive functional hierarchy.

*   **Primary Green (#00A859):** Reserved for successful resolutions, human-agent indicators, and primary "Action" states.
*   **AI Purple (#7C3AED):** A specialized secondary color used exclusively for AI-generated responses and machine-learning processes. This ensures the user is never confused about who they are speaking with.
*   **Security Blue (#0066FF):** Used for "Secure Session" indicators, ID verification badges, and data privacy notifications.
*   **Neutral Layers:** A sophisticated range of cool grays (from #F8F9FA to #1A1A1A) provides the structural foundation for the interface.

## Typography
The typography system balances modern sans-serif efficiency with technical precision.

*   **Headlines (Hanken Grotesk):** Provides a sharp, contemporary "startup" feel that remains highly legible at large scales.
*   **Body (Inter):** The workhorse for the chat interface, chosen for its exceptional readability in dense support threads.
*   **Technical Labels (JetBrains Mono):** Used for AI status tags, ticket numbers, and secure session timestamps. This monospaced choice reinforces the "Operating System" aesthetic and differentiates data from conversation.

## Layout & Spacing
The layout follows a **Rigid Grid System** with a base 8px increment. 

*   **Desktop:** 12-column grid. Support sidebars (ticket history, user info) should occupy a fixed 320px width, while the chat/action area remains fluid.
*   **Mobile:** Single column with 16px margins. Bottom-docked input fields are mandatory for ergonomic support interactions.
*   **Spacing Rhythm:** Use "chat-gap" (12px) for spacing between message bubbles to maintain a cohesive conversational flow without losing individual message distinction.

## Elevation & Depth
This design system uses **Tonal Layering and Low-Contrast Outlines** rather than heavy shadows to denote depth.

*   **Level 0 (Background):** #F8F9FA. The canvas.
*   **Level 1 (Card/Container):** #FFFFFF. Used for the main chat interface and sidebar widgets.
*   **Level 2 (Active Element):** A subtle 1px border (#E2E8F0) with a very soft, 4% opacity black shadow (0px 2px 4px).
*   **Secure State:** When a "Secure Session" is active, the container background shifts to a very faint blue tint (#F0F7FF) to provide a persistent visual cue of safety.

## Shapes
The shape language is **Soft (0.25rem base)**. 

This restrained corner radius maintains a professional, "system-level" feel. 
*   **Message Bubbles:** Use 0.75rem (rounded-xl) to soften the conversation.
*   **Buttons & Inputs:** Use 0.25rem (base) to maintain a crisp, functional appearance.
*   **AI Indicators:** Circular (pill) shapes are used exclusively for status chips to distinguish them from actionable buttons.

## Components
### Chat Interface
*   **AI Message Bubble:** Background #F5F3FF (Pale Purple), Border 1px #DDD6FE. Features a "Sparkle" icon in the top right.
*   **Human Message Bubble:** Background #FFFFFF, Border 1px #E2E8F0.
*   **Agent Hand-off Banner:** A full-width transition element. "AI Assistant is inviting a human agent..." with a pulse animation in Primary Green.

### Status Indicators
*   **AI-Resolved Badge:** A pill with a #7C3AED background and white JetBrains Mono text.
*   **Secure Session Indicator:** A lock icon next to "Encryption Active" in Security Blue, always pinned to the top of the chat viewport.
*   **Verification Badge:** A small green checkmark inside a shield icon, used next to agent names and user profiles once identity is verified.

### Inputs & Actions
*   **Support Input:** A fixed-height textarea that expands up to 4 lines. No shadows; 1px neutral border that turns Primary Green on focus.
*   **Quick Action Chips:** Ghost buttons (border only) used for common queries like "Track My Order" or "Speak to Agent," positioned directly above the input field.