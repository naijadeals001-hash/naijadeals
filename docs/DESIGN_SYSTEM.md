# DESIGN SYSTEM

Design system observations extracted from the Google Stitch export. This file documents current patterns; it does not redesign them.

## Typography
- `Material+Symbols+Outlined:wght,FILL@100..700,0..1` — 1924 pages
- `Inter:wght@400;600;700` — 459 pages
- `Plus+Jakarta+Sans:wght@400;600;700;800` — 382 pages
- `JetBrains+Mono:wght@500` — 234 pages
- `Plus+Jakarta+Sans:wght@400;500;600;700;800` — 188 pages
- `Plus+Jakarta+Sans:wght@700;800` — 176 pages
- `Plus+Jakarta+Sans:wght@100..900` — 115 pages
- `Inter:wght@400;500;600;700` — 112 pages
- `Inter:wght@400;500;700` — 105 pages
- `Inter:wght@100..900` — 86 pages
- `Plus+Jakarta+Sans:wght@400;600;700` — 80 pages
- `Plus+Jakarta+Sans:wght@400;500;600;700` — 56 pages

## Spacing
- Layouts heavily rely on Tailwind spacing utilities (`p-*`, `px-*`, `py-*`, `gap-*`, `space-*`).
- Common visual rhythm suggests dashboard-first spacing with dense cards and large section padding for hero or search surfaces.
- Mobile screens trend toward stacked card layouts with tighter vertical gaps.

## Grid
- Most pages use Tailwind flex and grid utilities instead of a centralized layout system.
- Desktop dashboards commonly use left navigation + multi-column content grids.
- Mobile pages commonly use full-width stacked sections and bottom navigation metaphors.

## Icons
- Primary icon set: **Material Symbols Outlined** via Google Fonts.
- Some screens rely on icon-only action buttons that will need accessibility labeling in future phases.

## Color Palette
- `#ffffff` — 9552 references
- `#f8f9fb` — 3425 references
- `#006d38` — 2517 references
- `#191c1e` — 2392 references
- `#59df89` — 2342 references
- `#e1e2e4` — 2259 references
- `#ffdad6` — 2010 references
- `#93000a` — 1982 references
- `#ba1a1a` — 1706 references
- `#bccabc` — 1335 references
- `#00a859` — 1259 references
- `#f8f9ff` — 1229 references
- `#b4c5ff` — 1216 references
- `#dbe1ff` — 1214 references
- `#00174b` — 1212 references
- `#003ea8` — 1210 references
- `#6d7b6e` — 1196 references
- `#77fca3` — 1182 references
- `#005228` — 1176 references
- `#3d4a3f` — 1175 references

## Buttons
- Buttons are primarily Tailwind utility-driven with rounded corners, filled primary CTA, and muted secondary actions.
- Icon buttons and segmented toggles appear throughout admin and dashboard pages.

## Cards
- Cards are the dominant layout primitive across customer, merchant, admin, and AI surfaces.
- Common uses: KPIs, listings, trust summaries, status alerts, and analytics snapshots.

## Tables
- Tables are concentrated in admin, finance, compliance, and analytics contexts.
- They will need consistent empty, loading, bulk-action, pagination, and export states in future implementation.

## Forms
- Form styling is largely utility-based and page-local.
- Repeated patterns include onboarding forms, configuration inputs, search bars, filters, and payout/verification fields.

## Inputs
- Search, filter, select, date, and text inputs are widely used but not normalized into a documented component API yet.

## Badges
- Status chips and semantic badges are frequently used for trust, risk, operational status, moderation, and verification cues.

## Status Colors
- Green family is heavily associated with success, trust, primary CTA, and operational health.
- Amber/yellow appears for warnings, trust review, and pending states.
- Red appears for risk, security, fraud, error, or blocking states.
- Blue/purple accents appear in AI, analytics, and tertiary highlight surfaces.

## Dark Mode
- Pages detected with explicit dark root class: **166**
- Pages detected as light/default: **833**
- Dark-mode usage is screen-specific, not yet normalized as a platform-wide design token policy.

## Responsive Rules
- The export suggests desktop-first treatment for admin and analytics screens, and mobile-first treatment for selected consumer flows.
- Responsive behavior is encoded directly in Tailwind utility classes instead of a shared layout system.
- A canonical breakpoint and shell strategy should be approved before implementation.

## Accessibility
- Good: strong visual hierarchy, large-card composition, and semantic status colors are common.
- Risk: many screens depend on color alone, icon-only controls, and dense data presentation without documented accessibility states.
- Recommendation: Phase 2 should define focus states, keyboard patterns, ARIA conventions, contrast rules, and screen-reader naming.

## Shared Dependency Baseline
- `https://cdn.tailwindcss.com?plugins=forms,container-queries` — 999 pages
- `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap` — 991 pages
- `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;600;700&display=swap` — 230 pages
- `https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap` — 112 pages
- `https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Plus+Jakarta+Sans:wght@100..900&display=swap` — 82 pages
- `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap` — 74 pages
- `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@500&display=swap` — 50 pages
- `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=JetBrains+Mono:wght@500&display=swap` — 46 pages
- `https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Plus+Jakarta+Sans:wght@700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap` — 39 pages
- `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap` — 27 pages

## Animations
- Motion is mostly lightweight and embedded inline through page-local CSS or visual emphasis states rather than a centralized motion system.
- Repeated patterns include pulse effects, hover elevation changes, scanner-line effects, progress emphasis, and status transitions.
- Recommendation: later phases should standardize motion tokens for duration, easing, hover states, loading states, and notification emphasis without altering Stitch visual intent.


## Canonical Component System
- One header system
- One sidebar system
- One footer system
- One search system
- One card system
- One button system
- One form system
- One notification system
- One wallet widget family
- One escrow widget family
- One trust component family
- One table system
- One modal system
- One dialog system
- One chart system

Future frontend work must map Stitch variants into these canonical component families instead of carrying forward uncontrolled duplication.
