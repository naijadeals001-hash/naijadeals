# NaijaDeals Component Playbook

> This document defines every reusable UI component in the NaijaDeals platform. It prevents duplicate UI code, enforces design consistency, and guarantees that accessibility, responsiveness, and dark mode are built in by default, not added later.
>
> For detailed visual tokens, see `docs/DESIGN_SYSTEM.md`. For the canonical UI inventory, see `docs/UI_INVENTORY.md` and `docs/COMPONENT_LIBRARY.md`. For frontend architecture, see `FRONTEND_PLAYBOOK.md`.

---

## 1. Design Philosophy

Stitch is the reference library, not the implementation. Every component in this playbook must preserve the business intent implied by Stitch screens while delivering a modern, accessible, production-ready experience. If a Stitch pattern is inefficient, inaccessible, or outdated, the component implementation should improve it and document the reason.

- **Components before pages.** Build reusable components first. Assemble pages from components, not from screen snapshots.
- **Accessibility first.** Every component must meet WCAG 2.1 AA minimum.
- **Responsive first.** Every component must work from mobile (320px) to desktop (1440px+).
- **Dark mode first.** Every component must render correctly in both light and dark themes.
- **Tested first.** Every component has unit, interaction, and visual regression tests where applicable.

---

## 2. Component Library Location

All reusable components live in `packages/ui` and are published as a shared package consumed by `apps/web` and `apps/admin`.

```text
packages/ui/
├── src/
│   ├── components/
│   │   ├── primitives/        # Buttons, inputs, badges, icons, etc.
│   │   ├── composites/        # Cards, dialogs, tables, forms, navigation
│   │   ├── feedback/          # Loading, empty, error, skeleton states
│   │   ├── data-display/      # Charts, lists, data grids, timelines
│   │   └── layout/            # Shells, grids, responsive containers
│   ├── hooks/                 # Shared UI hooks
│   ├── tokens/                # Typography, spacing, color, shadow tokens
│   └── index.ts               # Public component exports
```

No application may redefine a component that already exists in `packages/ui`. If a component is missing, add it to `packages/ui` first.

---

## 3. Primitives

### Button

- **Variants:** `primary`, `secondary`, `outline`, `ghost`, `danger`, `link`.
- **Sizes:** `xs`, `sm`, `md`, `lg`, `icon`.
- **States:** default, hover, active, focus, disabled, loading.
- **Requirements:**
  - Accessible focus ring.
  - Visible disabled state (do not disable pointer events only).
  - Loading state with `aria-busy="true"` and hidden label.
  - Icon-only buttons require `aria-label`.

### Input

- **Types:** text, email, password, number, tel, search, url, date, datetime-local, textarea.
- **States:** default, focus, error, disabled, readonly.
- **Requirements:**
  - Associated `<label>` or `aria-label`.
  - Error message linked via `aria-describedby`.
  - Password input supports show/hide toggle with `aria-pressed`.
  - Search input supports clear button and keyboard shortcut (`/` to focus).

### Select / Dropdown

- Native `<select>` for simple cases; custom dropdown for multi-select or rich options.
- Custom dropdowns must be fully keyboard accessible (arrow keys, Enter, Escape, Tab).
- Use `role="listbox"`, `aria-expanded`, `aria-selected`.

### Checkbox and Radio

- Use native controls when possible.
- Grouped controls use `<fieldset>` + `<legend>` or `aria-group` equivalents.
- Indeterminate checkbox state supported.

### Badge / Pill

- **Variants:** `neutral`, `info`, `success`, `warning`, `danger`, `primary`.
- **Uses:** status, count, category, verification state.
- Must not be used as the only indicator of state; pair with text or icon where needed.

### Icon

- Use `Material Symbols` or `FontAwesome` consistently per project decision. See `docs/DESIGN_SYSTEM.md`.
- Icons must be decorative unless they convey meaning. If meaningful, use `aria-label` or visually hidden text.
- Icon-only buttons require explicit `aria-label`.

---

## 4. Composites

### Card

- **Types:** default, clickable, horizontal, media-first, stat, dashboard widget.
- **Requirements:**
  - Consistent internal spacing using design tokens.
  - Optional header, body, footer, and action area.
  - Clickable cards are `<button>` or `<a>` with visible focus state.
  - No `box-shadow` proliferation; use elevation tokens.

### Table

- **Features:** sortable headers, pagination, row selection, expandable rows, empty state, loading skeleton.
- **Requirements:**
  - `<caption>` or `aria-label` describing table purpose.
  - Column headers with `scope="col"`.
  - Responsive behavior: horizontal scroll, card-flip, or priority columns on small screens.
  - Row actions accessible via keyboard and screen reader.

### Dialog / Modal

- **Types:** alert, confirmation, form, side panel (drawer), fullscreen.
- **Requirements:**
  - Focus trap inside the dialog.
  - `Escape` closes; `Tab` cycles.
  - `role="dialog"` and `aria-modal="true"`.
  - Return focus to the triggering element on close.
  - Backdrop click closes only if the dialog is non-critical.

### Form

- **Composition:** label, input, helper text, error text, fieldset, submit button.
- **Requirements:**
  - Client-side validation mirrors server-side rules.
  - Errors announced via `aria-live` region.
  - Submit button disabled while submitting; shows loading state.
  - Form-level `novalidate` when using custom validation, or rely on native validation.

### Navigation

- **Types:** top navbar, sidebar, bottom nav, tabs, breadcrumbs, command palette.
- **Requirements:**
  - Current page indicated with `aria-current="page"`.
  - Skip link for keyboard users.
  - Mobile menu uses disclosure pattern (`aria-expanded`).
  - Breadcrumbs use ordered list with `aria-label="Breadcrumb"`.

### Search

- Input with debounced query, clear button, loading spinner, and results list.
- Results list uses `role="listbox"` if selectable.
- Empty state and recent searches supported.

### Charts

- Use a single chart library across the platform (decision recorded in ADR).
- Wrap charts in accessible containers with summary text or data tables for screen readers.
- Responsive sizing and color-blind-safe palettes.

---

## 5. Feedback Components

### Loading States

- **Spinner:** small, medium, large. Use for inline loading.
- **Button loading:** spinner replaces label or icon.
- **Page loading:** skeleton screens preferred over spinners for perceived performance.
- **Suspense boundaries:** every lazy-loaded route and async component must define a fallback.

### Empty States

- Must include:
  - Icon or illustration.
  - Clear headline.
  - Optional description.
  - Primary action when applicable (e.g., “Create first listing”).
- Avoid generic “No data” messages. Explain what is empty and why.

### Error States

- **Inline error:** under input or in form summary.
- **Component error:** localized error boundary with retry action.
- **Page error:** full-page error view with actionable next steps and support link.
- **Toast / notification:** transient feedback for background actions. Use sparingly.

### Skeletons

- Use for initial loading where content shape is known.
- Match the layout and dimensions of the final content.
- Animate with a subtle pulse or shimmer. Respect `prefers-reduced-motion`.

---

## 6. Layout Components

### Container

- Max-width wrappers: `sm`, `md`, `lg`, `xl`, `full`.
- Consistent horizontal padding using spacing tokens.
- Centered by default; left-aligned variants for dashboard layouts.

### Grid

- Responsive CSS Grid helpers based on breakpoints.
- Support equal columns, auto-fit, and explicit column spans.
- Gap values derived from spacing tokens.

### Stack

- Vertical and horizontal flex helpers.
- Spacing variants: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`.
- Alignment and justification props.

### Shell / App Layout

- Header, sidebar, main content area, footer.
- Collapsible sidebar on desktop, overlay drawer on mobile.
- Sticky header with z-index management.
- Skip-to-content link.

---

## 7. Responsive Rules

Breakpoints (from `docs/DESIGN_SYSTEM.md`):

| Name | Min width | Usage |
| --- | --- | --- |
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

- Mobile-first: default styles target small screens; use `min-width` media queries.
- Touch targets: minimum 44x44 CSS pixels for interactive elements.
- Typography: fluid type scale that does not break layouts at any width.
- Tables: choose responsive strategy (horizontal scroll, reflow, or card stack) per view.

---

## 8. Accessibility Rules

- WCAG 2.1 AA minimum for all components.
- Keyboard operability: all interactive elements reachable and actionable without a mouse.
- Focus management: visible focus rings, logical tab order, no focus traps outside modals.
- Screen reader support: semantic HTML, ARIA labels, live regions for dynamic updates.
- Color contrast: minimum 4.5:1 for normal text, 3:1 for large text and UI components.
- Motion: respect `prefers-reduced-motion` for animations and transitions.
- Forms: every input has a label, error messages are programmatically associated.
- Images: meaningful alt text; decorative images use empty alt or `aria-hidden`.

---

## 9. Dark Mode

- Dark mode is supported via Tailwind `dark:` variants and CSS variables.
- Tokens must define both light and dark values. No hardcoded hex values in component styles.
- Test every component in dark mode during development.
- System preference is honored; manual toggle overrides and persists in user settings.

---

## 10. Theme and Tokens

Components consume design tokens from `packages/ui/tokens`. Do not use arbitrary values in Tailwind classes unless the token is missing — in which case, add the token first.

Token categories:

- **Colors:** brand, neutral, semantic (success, warning, danger, info), background, text, border.
- **Typography:** font family, font size, font weight, line height, letter spacing.
- **Spacing:** scale from `0` to `96` and beyond.
- **Shadows:** elevation levels `0` through `5`.
- **Radii:** none, sm, md, lg, xl, full.
- **Motion:** durations and easing curves.
- **Z-index:** constrained scale (base, dropdown, sticky, modal, tooltip, toast).

---

## 11. Component Definition of Done

A component is not ready for use until:

- It exists in `packages/ui` with a named export.
- It has a Storybook story or equivalent documentation example.
- It has typed props and prop documentation.
- It supports light and dark modes.
- It is responsive across breakpoints.
- It has keyboard and screen reader support.
- It has unit tests and visual regression tests where applicable.
- It is used in at least one production page or is documented as a new primitive.

---

## 12. Do Not Duplicate

The following must never be re-implemented locally in an app:

- Button, icon button, link button
- Input, textarea, select, checkbox, radio, switch
- Card, list card, stat card
- Table, data table, sortable table
- Dialog, drawer, confirmation modal
- Toast, notification, banner
- Loading spinner, skeleton
- Badge, pill, tag
- Avatar, avatar group
- Breadcrumb, tab group, pagination
- Empty state, error state
- Chart wrappers
- Layout shell, page container, grid, stack

If a component does not meet a new requirement, extend the shared library; do not fork it.

---

## 13. Cross-References

- `docs/DESIGN_SYSTEM.md` — visual tokens, typography, color palette, spacing
- `docs/UI_INVENTORY.md` — full UI inventory from Stitch
- `docs/COMPONENT_LIBRARY.md` — canonical component catalog
- `FRONTEND_PLAYBOOK.md` — routing, state, data fetching, animation
- `AI_ENGINEERING_CONSTITUTION.md` — Section 9 (Component Standards), Section 16 (Frontend Standards), Section 17 (Design System)
