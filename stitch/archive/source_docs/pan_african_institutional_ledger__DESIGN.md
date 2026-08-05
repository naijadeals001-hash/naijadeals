---
name: Pan-African Institutional Ledger
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
  on-surface-variant: '#3d4a42'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6d7a72'
  outline-variant: '#bccac0'
  surface-tint: '#006c4a'
  primary: '#006948'
  on-primary: '#ffffff'
  primary-container: '#00855d'
  on-primary-container: '#f5fff7'
  inverse-primary: '#68dba9'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#9b3e3b'
  on-tertiary: '#ffffff'
  tertiary-container: '#ba5551'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#85f8c4'
  primary-fixed-dim: '#68dba9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#005137'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ae'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#7f2928'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
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
  mono-label:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  numeric-data:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
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
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  max-width: 1440px
---

## Brand & Style
The design system is engineered for high-stakes financial infrastructure, balancing Pan-African accessibility with institutional-grade precision. It targets fintech operators, treasury managers, and cross-border merchants who require absolute clarity and speed in high-volume payout environments. 

The design style is **Corporate / Modern**, heavily influenced by the "Stripe-standard" of functional elegance. It utilizes a refined **Minimalism** approach—prioritizing whitespace and crisp borders to reduce cognitive load during complex auditing tasks. The emotional response is one of "Technical Trust": the UI should feel like a specialized tool that is both indestructible and lightning-fast. Every pixel serves a functional purpose, eliminating decorative elements in favor of data density and actionable insights.

## Colors
The palette is rooted in a professional "Emerald and Ink" scheme. The primary Emerald Green (#059669) signifies growth and successful settlement, used for primary actions and confirmed states. This is balanced by a deep Ink Navy (#0F172A) for typography and structural elements, providing the gravity required for a financial tool.

Functional status tokens are strictly enforced to guide user intuition:
- **Emerald-600**: Finalized payouts and successful KYC.
- **Amber-500**: Temporary holds or escrow states requiring patience.
- **Rose-600**: Immediate action required or transactional failure.
- **Sky-500**: Active background processes and API handshakes.
- **Indigo-500**: Manual compliance intervention or "AI Sentry" flagging.

Backgrounds utilize subtle cool-greys to separate layers without relying on heavy shadows, maintaining a clean, "Financial Grade" aesthetic.

## Typography
This design system utilizes **Plus Jakarta Sans** across all levels for its modern geometric clarity and excellent legibility at small sizes. 

For high-stakes financial data, we prioritize **Tabular Figures** (`tnum`) for all numeric values, ensuring currency columns and transaction hashes align perfectly for visual scanning. 
- **Headlines**: Use Semi-Bold weights with tight tracking for a confident, institutional feel.
- **Body**: Standardized at 16px for optimal readability in documentation and ledgers.
- **Labels**: Capitalized with 5% letter spacing for metadata headers and table columns.
- **Transaction Hashes**: Should be rendered in `body-sm` using a subtle color contrast to prevent visual noise while remaining accessible for copy-pasting.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to ensure financial dashboards maintain a predictable structure, centered within a 1440px container. On mobile, it transitions to a fluid single-column layout with 16px safe-area margins.

A **4px baseline grid** governs all internal component spacing, ensuring that high-density tables and forms feel mathematically aligned. 
- **Ledger Tables**: Utilize "Compact" vertical padding (8px) to maximize the amount of data visible above the fold.
- **Dashboards**: Use 24px gutters between data widgets to provide sufficient breathing room for AI alerts and status indicators.
- **Sidebars**: Fixed at 280px for navigation, allowing the primary data workspace to expand and contract based on browser width.

## Elevation & Depth
To maintain a precise, "software-as-infrastructure" feel, the system uses **Low-Contrast Outlines** instead of heavy shadows. 

- **Surface Level 0**: Background (#F8FAFC) - the canvas.
- **Surface Level 1**: White cards with a 1px border (#E2E8F0). No shadow. Used for standard ledger entries.
- **Surface Level 2**: White cards with a subtle 2px blur, 4% opacity shadow. Used for interactive elements like Payout Method cards.
- **Modals/Overlays**: High-contrast 1px border (#CBD5E1) with a 12px backdrop blur (Glassmorphism) on the overlay to maintain context of the underlying transaction.

This flat, layered approach ensures that the "AI Sentry" alerts stand out through color and stroke weight rather than artificial depth.

## Shapes
The shape language is **Soft (0.25rem)**. This slight rounding takes the edge off the industrial nature of the data without appearing overly "consumer-friendly" or playful. 

- **Standard Buttons & Inputs**: 4px (0.25rem) radius.
- **Cards & Ledger Containers**: 8px (0.5rem) radius for a more structural definition.
- **Status Badges**: Fully pill-shaped (999px) to distinguish them clearly from interactive buttons.
- **AI Alert Banners**: 0px radius on the left border (to accommodate a 4px status color strip) and 4px radius on the remaining corners.

## Components

### Settlement Timeline
A vertical or horizontal stepper utilizing the status tokens. Each node represents a state: *Escrow* (Amber) → *Clearing* (Sky) → *Bank Payout* (Emerald). Completed nodes show a check icon; the active node features a pulsing "processing" ring.

### Payout Method Cards
High-contrast cards displaying the provider logo (e.g., M-Pesa, Standard Bank), the account fragment, and a "Speed Indicator" label (e.g., "Instant" vs "24h"). The active method is highlighted with an Emerald-600 2px border.

### High-Density Ledger Tables
Optimized for auditability. Features include:
- Sticky headers with 1px bottom borders.
- Hover states using a subtle #F1F5F9 tint.
- Status Badge component: Small text in a low-opacity background tint of the status color (e.g., Emerald-50 background at 10% for "Paid" text).

### AI Sentry Financial Alerts
High-urgency cards for suspicious activity. Use a 4px left-border accent of Indigo-500. Include a "Reasoning" block in `body-sm` explaining why the payout was flagged (e.g., "Velocity Limit Exceeded") and two immediate actions: "Freeze Payout" (Destructive/Ghost) and "Approve Manual" (Secondary).

### Input Fields
Strictly bordered fields with `mono-label` floating headers. Validation states use the status color tokens (Red for error, Emerald for verified IBAN/SWIFT).