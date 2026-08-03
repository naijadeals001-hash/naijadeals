# PROJECT RULES

This document defines mandatory engineering law for the NaijaDeals Super Ecosystem. Future contributors must treat these rules as binding, not optional decoration.

## 1. Delivery Standard

- Build only production-grade systems once implementation begins.
- No fake services, mock-only production paths, placeholder APIs, or pretend integrations in mainline code.
- If a dependency is not ready, isolate the feature behind a feature flag or documented roadmap item instead of shipping fiction.

## 2. Shared Platform First

- Authentication, RBAC, wallet, escrow, trust, messaging, notifications, search, analytics, audit, and Aura AI are platform services, not duplicated module concerns.
- No module may fork or locally redefine shared domain concepts.
- Shared concerns must be implemented once and consumed through governed contracts.

## 3. Integration Gateway Law

- Business logic must never call third-party SDKs or remote APIs directly.
- All provider access must route through the Integration Gateway and adapter layer.
- Adapters must be replaceable, observable, testable, and provider-agnostic from the perspective of domain services.

## 4. Event-Driven Architecture Law

- Cross-service workflow coordination must use governed events and owned authoritative state.
- Producers own event truth; consumers own idempotent handling.
- Financial, privileged, and user-impacting asynchronous workflows must support replay-safe processing, DLQ governance, and audit evidence.
- No team may invent one-off event naming, retry behavior, or replay tooling outside the architecture baseline.

## 5. Documentation Discipline

- Architecture and standards documents are permanent project memory.
- Every material engineering decision must update the relevant governing document before or with the implementation change.
- Never create duplicate standards files for the same concern unless explicitly approved.

## 6. Milestone Discipline

- Phase boundaries are strict.
- No implementation starts because a document exists; implementation starts only after final milestone authorization.
- Future-reference modules remain excluded until scope change approval is recorded.

## 7. Privileged Action Law

- Any privileged action listed in `docs/MASTER_PERMISSION_MATRIX.md` must obey required role, approval, maker-checker, audit, notification, and emergency-override rules.
- No developer or operator may bypass privileged-action governance because “it was urgent.” Urgency is a reason to follow emergency rules, not ignore them.
- Emergency access must be time-bound, attributable, and post-reviewed.

## 8. Security

- Least privilege, defense in depth, zero hardcoded secrets, encrypted sensitive data, and comprehensive audit trails are mandatory.
- Role-based and permission-based access must be enforced at API, service, worker, job, and admin-action level.

## 9. Testing

- Required future layers: unit, integration, contract, end-to-end, security, performance, observability, and regression testing.
- High-risk domains (payments, escrow, trust, moderation, identity, AI actions, privileged actions, notification replay) require extra scenario coverage and replay-safe validation.

## 10. Route and Scope Law

- Every route must belong to Current Approved Scope or Future Reference Only.
- No Future Reference Only module may receive active delivery scope, production route activation, or acceptance criteria unless change control reclassifies it.

## 11. AI Policy

- AI is an assistive, governed platform capability, not an unbounded decision authority.
- Any AI action that changes money, trust, moderation state, permissions, compliance posture, or contractual outcome must support human approval where policy requires it.
- AI memory, prompt versioning, rate limits, cost budgets, fallback, and audit logging are mandatory governed concerns.

## 12. No Duplicate Systems

- One wallet platform, one escrow platform, one notification platform, one messaging platform, one trust engine, one route taxonomy, one canonical component system.
- Variants may exist only as configuration, not architecture forks.

## 13. Enforcement

- Any contribution that violates these rules must be rejected or reworked before merge.
