---
name: Institutional High-Density
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
  on-surface-variant: '#3f4941'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
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
  tertiary: '#850010'
  on-tertiary: '#ffffff'
  tertiary-container: '#ae0e1d'
  on-tertiary-container: '#ffbcb6'
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
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  data-lg:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.02em
  data-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  data-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-caps:
    fontFamily: Plus Jakarta Sans
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
  container-padding: 24px
  gutter: 16px
  component-gap-xs: 4px
  component-gap-sm: 8px
  component-gap-md: 16px
---

## Brand & Style
The design system is engineered for high-stakes financial oversight and monetization management. It adopts an **Institutional High-Density** style, merging the rigorous clarity of a central bank terminal with the fluid responsiveness of modern fintech. 

The brand personality is **authoritative, precise, and secure**. It prioritizes information density over white space, ensuring that revenue managers can monitor complex cross-border settlements and growth metrics without excessive scrolling. The emotional response is one of absolute control and stability, achieved through a structured grid, meticulous alignment, and a "Digital Operating System" aesthetic that emphasizes functional utility over decorative flair.

## Colors
The palette is anchored by **Deep Emerald Green (#006437)**, representing institutional growth and financial stability. 

- **Primary**: Deep Emerald is used for key actions, active navigation states, and primary brand touchpoints.
- **Semantic Green**: "Currency Green" (#10B981) is reserved exclusively for positive financial growth, successful settlements, and upward trends.
- **Semantic Red**: "Risk Crimson" (#EF4444) signals negative anomalies, failed transactions, or high-risk thresholds.
- **Surfaces**: We utilize a tiered white system. **Canvas Pure (#FFFFFF)** is the base for data containers and cards to ensure maximum contrast, while **Surface Low (#F8F9FB)** provides a soft background to reduce eye strain during prolonged sessions.
- **Borders**: High-definition borders in `#E2E8F0` are used to define the dense grid without adding visual weight.

## Typography
The typographic strategy balances modern tech aesthetics with mathematical precision. 

- **Headlines & UI**: **Plus Jakarta Sans** provides a contemporary, friendly yet professional feel for titles, navigation, and general interface labels.
- **Financial Data**: **JetBrains Mono** is mandated for all numerical figures, currency codes (NGN, USD), transaction IDs, and percentages. The monospaced nature ensures that columns of numbers align perfectly in tables, facilitating quick vertical scanning and auditing.
- **Hierarchy**: Use `label-caps` for table headers and section overviews to provide clear structural anchors.
- **Density**: Font sizes are intentionally kept compact (starting at 13px for body text) to accommodate high-density data visualizations.

## Layout & Spacing
This design system utilizes a **Fixed Grid** philosophy within a fluid container to maintain rigorous alignment.

- **The Grid**: A 12-column system is used for desktop, with a tight 16px gutter to maximize horizontal screen real estate.
- **Rhythm**: All spacing is based on a **4px baseline grid**. Components should use 4px, 8px, or 16px increments for internal padding.
- **Monetization Rail**: A fixed vertical navigation bar (64px width) persists on the left, providing immediate access to primary modules (Forecasting, Settlements, Risk, Assets).
- **Responsive Behavior**: On tablets, the grid shifts to 8 columns. On mobile, it collapses to a single column, though most complex table views will require horizontal scrolling or a simplified "card-summary" view to maintain data integrity.

## Elevation & Depth
To maintain an institutional and flat aesthetic, depth is communicated through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows.

- **Layer 0 (Canvas)**: Background in `Surface Low`.
- **Layer 1 (Cards/Tables)**: Main content areas in `Canvas Pure` with a 1px border (#E2E8F0).
- **Layer 2 (Overlays)**: Modals and dropdowns use a very subtle ambient shadow (0px 4px 12px, 5% opacity black) to distinguish them from the data grid.
- **Interaction**: Elements do not "lift" on hover; instead, they utilize subtle background color shifts (e.g., `#F1F5F9`) to indicate interactivity.

## Shapes
The shape language is **Soft (0.25rem)**, leaning toward the geometric. 

- **Standard Elements**: Buttons, input fields, and chips use a 4px radius. This keeps the UI feeling precise and serious.
- **Large Containers**: Dashboard cards use an 8px (0.5rem) radius to provide a slight visual distinction from smaller UI components.
- **Currency Elements**: Use sharp corners for data cells within tables to emphasize the rigid, spreadsheet-like utility of the platform.

## Components
- **High-Density Tables**: Rows should be 40px in height. Column headers use `label-caps` typography. Every numeric cell must use `JetBrains Mono`. Alternate row striping is recommended for tables exceeding 10 rows.
- **Monetization Rail**: A dark-themed vertical sidebar using the Primary Green (#006437). Icons should be 20px, stroke-based, and highly legible.
- **Revenue Charts**: Multi-axis charts should use Primary Green for main revenue, Currency Green for growth, and Risk Crimson for churn/loss. Use dashed lines for "Forecasting" data.
- **Simulation Controls**: Sliders should have numeric input fields attached to them. Use the Primary Green for the slider track.
- **Status Chips**: Use "pill" shapes with 10% opacity backgrounds of the semantic color (e.g., light green background with dark green text for 'Settled').
- **Input Fields**: Crisp, 1px bordered boxes with 14px text. Active states use a 1px Primary Green border with a 2px soft outer glow.