# NaijaDeals Frontend Playbook

> This document defines how every NaijaDeals frontend is built. It governs the public web app, the admin app, and any future frontend surface.
>
> For component rules, see `COMPONENT_PLAYBOOK.md`. For visual tokens, see `docs/DESIGN_SYSTEM.md`. For API rules, see `API_PLAYBOOK.md`. For the AI-specific design stance, see `AI_ENGINEERING_CONSTITUTION.md` Section 16.

---

## 1. Design Intent vs. Implementation

**Stitch is reference, not implementation.**

- Stitch provides reference, inspiration, workflow guidance, UX intent, navigation patterns, and business requirements implied by screens.
- Production code may redesign screens, modernize layouts, improve responsiveness, improve accessibility, consolidate duplicate pages, create reusable components, replace outdated interactions, simplify workflows, and optimize UX.
- The production implementation must preserve business intent, not visual duplication.
- If a Stitch screen is ambiguous, inefficient, or outdated, the engineering team is expected to design and build a superior production-ready solution while preserving approved workflows, architecture, and governance.

---

## 2. Technology Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Framework | Next.js 14+ (App Router) | Server and client rendering, routing, API routes |
| Language | TypeScript | Type safety across the frontend |
| Styling | Tailwind CSS | Utility-first, token-driven styling |
| Components | React 18+ | UI library built in `packages/ui` |
| State | Zustand / TanStack Query / React Context | Local, server, and shared state |
| Forms | React Hook Form + Zod | Validation and form handling |
| Icons | Material Symbols / FontAwesome | Consistent iconography |
| Charts | Single approved chart library | Analytics and dashboard charts |
| Testing | Vitest + React Testing Library + Playwright | Unit, component, and E2E tests |
| Build | Vite / Next.js build + Turbo | Production bundles |

---

## 3. Routing

- **App Router:** Use Next.js App Router conventions. Server Components by default; Client Components only when needed.
- **Route structure:** Mirror domain boundaries. Example: `/listings`, `/listings/[id]`, `/dashboard/wallet`, `/admin/users`.
- **Route guards:** Authentication and authorization are enforced in middleware or layout loaders, not sprinkled in pages.
- **Dynamic routes:** Use `[param]` for single segments, `[[...param]]` for optional catch-all where approved.
- **Loading UI:** Use `loading.tsx` and Suspense boundaries for every route with async data.
- **Error UI:** Use `error.tsx` for route-level error boundaries.
- **Not found:** Use `not-found.tsx` for unmatched routes.

---

## 4. Layouts

- **Root layout:** Global providers, theme, fonts, metadata, and analytics.
- **Domain layouts:** Shared navigation, headers, and sidebars for authenticated sections.
- **Shell layout:** Header, collapsible sidebar, main content area, footer. See `COMPONENT_PLAYBOOK.md` Layout section.
- **Minimal layouts:** Auth, onboarding, and error pages use focused layouts without full navigation.
- **Nested layouts:** Prefer composition over prop drilling for layout state.

---

## 5. Components

- **Consume `packages/ui` first.** No local re-implementation of shared components.
- **Component types:**
  - **Server Components:** Default. Fetch data directly, render static markup, pass minimal props.
  - **Client Components:** Use only for interactivity, browser APIs, or state. Mark with `"use client"`.
  - **Compound Components:** Use for complex UI patterns (tabs, tables, dialogs) to keep APIs clean.
- **Props:** Keep interfaces small and explicit. Prefer composition over configuration overload.
- **Hooks:** Colocate related logic in custom hooks. Name hooks clearly (`useWallet`, `useListings`).
- **No prop drilling:** Use context or state stores for deeply shared state.

---

## 6. State Management

- **Server state:** TanStack Query (React Query) for caching, invalidation, pagination, and background refetching.
- **Client state:** Zustand for global UI state and user session context.
- **Form state:** React Hook Form + Zod for local form state and validation.
- **URL state:** Use query parameters for shareable page state (filters, search, pagination).
- **No mixing concerns:** Server state does not live in global client stores.
- **Optimistic updates:** Allowed when the failure path is safe and reversible. Provide rollback on error.

---

## 7. Caching

- **HTTP caching:** Use cache headers and SWR/ TanStack Query defaults.
- **Server-side caching:** Next.js `fetch` caching, ISR, and route-level revalidation where appropriate.
- **Client-side caching:** TanStack Query cache keyed by endpoint and parameters.
- **Cache invalidation:** Invalidate on mutations using mutation keys or explicit invalidation.
- **No stale financial data:** Wallet, transactions, and order data are fetched fresh or revalidated aggressively.
- **Cache-first vs. network-first:** Choose per domain. User profile can be cache-first; wallet balance is network-first.

---

## 8. Data Fetching

- **API client:** Use a single typed API client generated from OpenAPI or typed wrappers around `fetch`.
- **Error handling:** Centralized error handling converts API errors into user-friendly messages and logs to monitoring.
- **Loading states:** Use Suspense fallbacks and skeletons. Never block the entire page for a single slow request.
- **Parallel fetching:** Fetch independent data in parallel. Avoid request waterfalls.
- **Server Components:** Fetch data server-side when possible to reduce client JS and improve performance.
- **Client fetching:** Use TanStack Query for interactive, user-driven data.
- **Polling:** Use only for short-lived, high-value updates (e.g., payment status). Implement backoff and cleanup.

---

## 9. Animations and Motion

- **Philosophy:** Subtle, purposeful motion. Motion should guide, not distract.
- **Library:** Use a single approved animation library (e.g., Framer Motion) consistently.
- **Common patterns:**
  - Page transitions: fade or slide (150–300ms).
  - Loading skeletons: subtle pulse.
  - Modal/dialog entrances: scale + fade.
  - Toast/notification: slide-in, auto-dismiss.
- **Accessibility:** Respect `prefers-reduced-motion`. Provide instant alternatives for users who disable motion.
- **Performance:** Prefer `transform` and `opacity` for animations. Avoid animating layout properties.

---

## 10. Responsive Behavior

- **Mobile-first:** Base styles target mobile; use `sm:`, `md:`, `lg:`, `xl:`, `2xl:` Tailwind breakpoints for larger screens.
- **Breakpoints:** `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`, `2xl:1536px`.
- **Touch targets:** Minimum 44x44 CSS pixels for buttons and links.
- **Navigation:** Bottom nav or hamburger on mobile; persistent sidebar on desktop where appropriate.
- **Tables:** Horizontal scroll, card flip, or priority columns depending on data density.
- **Typography:** Fluid scale that remains readable at every width.
- **Testing:** Every feature is tested at 320px, 768px, 1024px, and 1440px.

---

## 11. Accessibility

- **Target:** WCAG 2.1 AA minimum.
- **Semantic HTML:** Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<button>`, `<a>` appropriately. Avoid generic `<div>` soup.
- **Keyboard navigation:** All interactive elements operable via keyboard. Visible focus indicators.
- **Screen reader support:** Labels, descriptions, live regions, and landmarks.
- **Color contrast:** 4.5:1 for normal text, 3:1 for large text and UI components.
- **Motion:** Respect `prefers-reduced-motion`.
- **Testing:** Include automated accessibility tests (axe-core) and manual screen reader checks.
- **Forms:** Every input has a label, error messages are programmatically associated.

---

## 12. Dark Mode

- **Implementation:** Tailwind `dark:` variants and CSS variables.
- **Tokens:** All color tokens define light and dark values. No hardcoded colors in component code.
- **Default:** Respect system preference. Allow manual toggle. Persist preference in user settings.
- **Testing:** Every component is visually tested in dark mode.
- **Images:** Use dark-mode-friendly illustrations or allow theme-aware image variants.

---

## 13. Theme and Tokens

All styling derives from the shared design token system. Do not use arbitrary Tailwind values without adding a token.

Token categories:

- **Colors:** brand, neutral, success, warning, danger, info, background, surface, text, border.
- **Typography:** font family, sizes, weights, line heights, letter spacing.
- **Spacing:** 4px base scale.
- **Shadows:** elevation tokens `0` through `5`.
- **Radii:** none, sm, md, lg, xl, full.
- **Breakpoints:** Tailwind defaults unless overridden by design system.
- **Motion:** durations and easing curves.
- **Z-index:** constrained scale.

See `docs/DESIGN_SYSTEM.md` for the full token catalog.

---

## 14. Error Handling

- **Error boundaries:** Catch errors in React trees and display fallback UI. Log to monitoring.
- **API errors:** Convert to user-friendly messages. Do not expose raw error codes or stack traces.
- **Network errors:** Retry idempotent requests with backoff. Inform user after final failure.
- **404/403 pages:** Branded, helpful, with navigation back to safe ground.
- **Form errors:** Inline field errors + summary. Announce via `aria-live`.

---

## 15. Performance

- **Code splitting:** Lazy-load routes and heavy components.
- **Image optimization:** Use Next.js `<Image>` with proper sizing, responsive srcset, and WebP/AVIF where supported.
- **Font optimization:** Use `next/font` or font-display swap to avoid invisible text.
- **Bundle size:** Monitor and budget bundle sizes. Avoid importing entire libraries for one function.
- **Third-party scripts:** Load analytics and support scripts asynchronously; respect consent.
- **Core Web Vitals:** Target LCP < 2.5s, INP < 200ms, CLS < 0.1.

---

## 16. Definition of Done for Frontend Work

A frontend feature is not done until:

- It uses `packages/ui` components where applicable.
- It works across breakpoints from mobile to desktop.
- It supports light and dark modes.
- It is keyboard and screen reader accessible.
- It handles loading, empty, error, and success states.
- It is typed with TypeScript and passes lint and typecheck.
- It has unit/component tests and E2E coverage for critical paths.
- It passes visual review against business intent.
- It does not duplicate existing components or pages.

---

## 17. Cross-References

- `COMPONENT_PLAYBOOK.md` — reusable component catalog and rules
- `docs/DESIGN_SYSTEM.md` — typography, color, spacing, motion tokens
- `API_PLAYBOOK.md` — data fetching, error shapes, pagination
- `AI_ENGINEERING_CONSTITUTION.md` — Section 16 (Frontend Standards), Section 17 (Design System), Section 28 (Stitch Policy)
- `docs/UI_INVENTORY.md` — Stitch-derived UI inventory
- `docs/COMPONENT_LIBRARY.md` — canonical component library
