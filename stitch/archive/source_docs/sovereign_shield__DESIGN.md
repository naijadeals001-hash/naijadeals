---
name: Sovereign Shield
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
  on-surface-variant: '#bbcabf'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#bec6e0'
  on-secondary: '#283044'
  secondary-container: '#3f465c'
  on-secondary-container: '#adb4ce'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#e29100'
  on-tertiary-container: '#523200'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
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
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
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
The brand personality is institutional, authoritative, and impenetrable. As the "Nervous System" of a pan-African financial ecosystem, the UI must evoke absolute confidence and precision. The design style is **Corporate Modern with a Technical Edge**, leaning into high-density information display and systematic clarity. It prioritizes utility over decoration, utilizing a "Glassmorphism" approach for overlays to maintain spatial awareness of background data, while grounding core elements in a "Brutalist-Lite" structural grid for maximum stability.

The emotional response should be one of "vigilant calm"—an interface that simplifies chaos during high-stress security incidents through rigorous organization and clear visual hierarchy.

## Colors
The palette is optimized for 24/7 Security Operations Center (SOC) environments, utilizing a deep-dark base to reduce eye strain and maximize the "pop" of critical status indicators.

- **Primary (Security Emerald):** Used for "Safe" states, verified paths, and successful encryption confirmations.
- **Secondary (Deep Slate):** The bedrock of the interface, used for background surfaces and deep structural elements.
- **Warning Amber:** Reserved for non-critical anomalies, latency warnings, and suspicious (but not yet confirmed) activity.
- **Critical Red:** High-contrast signal for active breaches, failed authentications, and system outages.
- **Neutral (Cool Gray):** Used for labels, borders, and secondary data to maintain a clean, technical atmosphere.

## Typography
The typography system prioritizes legibility at high densities. **Inter** provides a highly readable, neutral foundation for administrative tasks and reporting. **JetBrains Mono** is utilized strictly for technical data—IP addresses, transaction hashes, logs, and system metrics—to ensure character-level distinction (e.g., distinguishing '0' from 'O').

Upper-case labels with increased tracking are used for section headers and metadata tags to create clear "anchors" for the eye when scanning large tables.

## Layout & Spacing
This design system employs a **Fluid Grid** model with a high-density 8px baseline. The layout is structured as a 12-column grid on desktop, shifting to a single-column view on mobile for critical alerts.

- **Data Density:** Gutters are kept tight (16px) to maximize the "at-a-glance" visibility of threat maps and audit logs.
- **Sidebars:** A dual-sidebar approach is recommended—left for primary navigation, right for contextual "Incident Details" drawers that slide over content without losing context.
- **Mobile Reflow:** In mobile view, complex tables must transform into high-contrast "Incident Cards" that prioritize the status (Primary/Warning/Critical) and a single "Action" button.

## Elevation & Depth
Elevation is communicated through **Tonal Layers** rather than heavy shadows, reflecting a precise, technical aesthetic.

- **Base Level:** Deep Slate (#0F172A) for the application background.
- **Mid Level:** Slightly lighter slate (#1E293B) for container backgrounds and table headers.
- **High Level:** Used for active modals and popovers, featuring a subtle `1px` border in a low-opacity neutral tone and a 16px backdrop blur (Glassmorphism) to maintain the sense of the underlying "Nervous System."
- **Focus States:** High-intensity Security Emerald glows (4px blur, 0.4 opacity) are used to indicate active focus or system health during hover.

## Shapes
The shape language is **Soft-Technical**. A 4px corner radius (Small) is the default for buttons, inputs, and containers. This creates a balanced look that feels modern but retains the "industrial-grade" hardness required of a security tool. Circular shapes are reserved strictly for status pips (e.g., "Live" indicators) and user avatars to provide a clear geometric contrast to the structural UI.

## Components
- **Buttons:** Primary buttons use a solid Security Emerald background with black text for maximum visibility. Secondary buttons are "Ghost" style with 1px slate borders.
- **Incident Cards:** Feature a left-hand "Status Bar" color-coded by severity. Headers must use `label-caps` for the category and `headline-lg` for the incident title.
- **Data Tables:** Must support "Compact" mode. Rows should have a subtle hover state (#1E293B). Technical strings (IPs, Hashes) must be rendered in `data-mono`.
- **Risk Gauges:** Circular or semi-circular SVG components using a stroke-dasharray to show percentage. Use a "Warning Amber" to "Critical Red" gradient for high-risk zones.
- **Immutable Audit Logs:** A specialized list component with alternating row backgrounds and a vertical "Connection Line" on the left to indicate a temporal sequence of events.
- **Live Threat Map:** A darkened vector map with "Pulse" animations (rings expanding from a point) in Critical Red to indicate active attack vectors.