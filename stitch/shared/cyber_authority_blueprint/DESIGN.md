---
name: Cyber-Authority Blueprint
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
  on-surface-variant: '#b9ccb2'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#84967e'
  outline-variant: '#3b4b37'
  surface-tint: '#00e639'
  primary: '#ebffe2'
  on-primary: '#003907'
  primary-container: '#00ff41'
  on-primary-container: '#007117'
  inverse-primary: '#006e16'
  secondary: '#b8c3ff'
  on-secondary: '#002388'
  secondary-container: '#0043eb'
  on-secondary-container: '#c6ceff'
  tertiary: '#fff6ff'
  on-tertiary: '#490080'
  tertiary-container: '#ecd3ff'
  on-tertiary-container: '#862ed4'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#72ff70'
  primary-fixed-dim: '#00e639'
  on-primary-fixed: '#002203'
  on-primary-fixed-variant: '#00530e'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b8c3ff'
  on-secondary-fixed: '#001356'
  on-secondary-fixed-variant: '#0035be'
  tertiary-fixed: '#f0dbff'
  tertiary-fixed-dim: '#ddb7ff'
  on-tertiary-fixed: '#2c0051'
  on-tertiary-fixed-variant: '#6900b3'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: -0.02em
  code-xs:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 14px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.05em
spacing:
  grid-unit: 8px
  node-gutter: 24px
  lane-margin: 32px
  stack-gap: 4px
---

## Brand & Style

This design system is engineered for high-density enterprise workflow visualization. It adopts a "Technical Process Map" aesthetic, prioritizing information density and technical precision over decorative elements. The system targets developers, systems architects, and technical operators who require an immediate, "at-a-glance" understanding of complex logic flows.

The design language draws from **Brutalism** and **Modern Corporate** styles, utilizing a rigid grid-based structure, monospaced data readouts, and engineering-grade clarity. Every element serves a functional purpose, evoking a sense of "Cyber-Authority"—a professional, authoritative, and non-decorative environment where logic is the primary visual driver.

## Colors

The palette is anchored in a deep black foundation (`#050505`), providing maximum contrast for functional semantic colors. Color is used exclusively for categorization and status:

- **Primary Path (Terminal Green):** Success states and the happy-path execution flow.
- **Decision Points (Electric Blue):** Logical branching, gateway triggers, and conditional routing.
- **AI Actions (Purple Aura):** Heuristic processing, LLM-driven nodes, and automated reasoning steps.
- **Financial/Escrow (Gold):** Transactional milestones, value transfers, and ledger entries.
- **Errors/Rejections (Warning Red):** Exceptions, failure nodes, and timeout alerts.
- **Actors (Slate/Gray):** Used for swimlane headers and neutral metadata.

## Typography

This design system utilizes a dual-font strategy. **Plus Jakarta Sans** is used for interface-level headings and primary descriptions to ensure high-speed legibility. **JetBrains Mono** is utilized for all technical identifiers, logic statements, variable names, and micro-telemetry data.

- Use `label-caps` (all caps) for node categories (e.g., "TRIGGER", "TRANSFORM").
- Use `code-sm` for node titles and technical IDs.
- Use `code-xs` for audit log stubs and secondary metadata.
- Headlines are reserved for workflow titles and swimlane identifiers.

## Layout & Spacing

The layout is strictly governed by an underlying 8px grid. Backgrounds must feature a subtle dot-grid or line-grid at 24px intervals to assist in node alignment.

- **Swimlanes:** Vertical or horizontal bands that separate actors (e.g., Customer, AI, Admin). These use fixed headers with a `border-right` or `border-bottom` in Slate/Gray.
- **Flow Direction:** Left-to-right (horizontal) or top-to-bottom (vertical). 
- **Connectors:** 90-degree orthogonal polyline arrows. Avoid diagonal lines. Connectors should snap to the centers or edges of node shapes.
- **High Density:** Padding inside nodes is minimized to `8px` or `12px` to maximize the number of visible nodes in the viewport.

## Elevation & Depth

To maintain a "blueprint" feel, shadows are avoided. Depth is communicated through **tonal layers** and **low-contrast outlines**:

- **Level 0 (Base):** Deep black (`#050505`) with a subtle grid overlay.
- **Level 1 (Swimlanes):** Slightly elevated gray surface or stroke to define boundaries.
- **Level 2 (Nodes):** Solid dark fill (`#0F0F0F`) with a 1px colored border matching the functional role (Green, Blue, etc.).
- **Overlays (Modals):** Heavy backdrop blur (glassmorphism) is used sparingly for node configuration drawers, ensuring the context of the workflow remains visible.

## Shapes

The design system uses a strict **sharp-corner** policy (`0px` roundedness) to reinforce the engineering and technical nature of the workflow. Shapes conform to standard BPMN/Flowchart conventions:

- **Tasks/Nodes:** Rectangles with a 1px solid border.
- **Decisions/Gateways:** Diamonds.
- **Start/End Events:** Circles (the only rounded element allowed).
- **Data/Storage:** Cylinders or "folded corner" page icons.
- **Triggers:** Standard n8n-style hexagonal or square icons integrated into the top-left of the node.

## Components

### Workflow Nodes
Nodes consist of a header with a `label-caps` identifier and a main body for the `code-sm` title. A small "audit stub" (a `4px` dot or tiny line) sits at the output port to indicate log connectivity.

### Flow Connectors
Orthogonal paths with a solid arrowhead. For "Error" paths, the line should be dashed and colored in Warning Red. For "Primary" paths, use a 2px thickness in Terminal Green.

### Swimlane Headers
Fixed-position labels using `headline-md` at the start of each row/column. Headers should include a small "Actor Icon" (e.g., a simple user glyph or a bot glyph).

### Micro-Telemetry Data Points
Small clusters of `code-xs` text placed near nodes or connectors to display real-time metrics (e.g., "Latency: 45ms", "Exec Count: 12.4k").

### Audit Log Stubs
Condensed list items appearing in a slide-out panel or as tooltips, using Monospaced type for timestamp and event-type clarity.

### Control Inputs
Input fields within node editors must be border-only with no fill, utilizing the same sharp-corner aesthetic and Terminal Green focus states.