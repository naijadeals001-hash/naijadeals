# AI Engineering Constitution

## Status

**Highest engineering authority after `ARCHITECTURE.md` and `PROJECT_RULES.md`.**

This document governs every AI coding assistant, human developer, contractor, freelancer, and automation tool contributing to the NaijaDeals Super Ecosystem.

Where a conflict exists, resolution order is:

1. `ARCHITECTURE.md`
2. `PROJECT_RULES.md`
3. `AI_ENGINEERING_CONSTITUTION.md`
4. Implementation plans
5. Module specifications
6. Code

Code NEVER overrides architecture. Code NEVER overrides governance. Code NEVER overrides an approved implementation plan.

---

## 1. Project Vision

### Mission

Build Africa's most trusted, scalable, and integrated digital super ecosystem for commerce, logistics, finance, media, and services.

### Long-term Vision

NaijaDeals is a single platform where individuals, businesses, and enterprises can transact, move goods, manage money, access services, and automate workflows with confidence, transparency, and enterprise-grade reliability.

### Business Objectives

- Enable multi-vertical commerce under one identity and wallet.
- Reduce friction between buyers, sellers, logistics providers, and service professionals.
- Provide trust, escrow, dispute resolution, and verified reputation.
- Deliver AI-assisted decision-making through Aura AI.
- Operate across Nigeria and Africa with localization, compliance, and scalability.

### Definition of Success

A feature is successful when it is production-ready, secure, documented, tested, and measurably improves the platform's trust, scalability, or revenue potential.

---

## 2. Engineering Philosophy

- Architecture before code.
- Simplicity before cleverness.
- Reuse before duplication.
- Components before pages.
- Services before modules.
- Documentation before implementation.
- Enterprise quality over speed.
- Production-first engineering.
- Every architectural or implementation decision must optimize for long-term maintainability, scalability, security, and clarity over short-term convenience.

---

## 3. AI Development Rules

The AI must:

- Think before coding.
- Analyze before changing.
- Never guess.
- Never fabricate.
- Never silently modify architecture.
- Never ignore documentation.
- Never ignore previous approvals.
- Never bypass governance.
- Never hardcode assumptions.
- Never proceed past a known blocker without raising it.

---

## 4. Architecture Authority

Hierarchy:

```
Vision
    ↓
Architecture
    ↓
Governance
    ↓
Implementation Plans
    ↓
Module Specifications
    ↓
Code
    ↓
Tests
```

Code NEVER overrides Architecture. Code NEVER overrides Governance. Code NEVER overrides an approved plan.

Any deviation requires documented architecture approval before implementation.

---

## 5. Documentation Authority

Priority order (highest to lowest):

1. Architecture
2. Implementation Plan
3. Module Specification
4. Feature Matrix
5. Workflow Atlas
6. API Standards
7. Database Standards
8. Code

Never reverse the order. Implementation must follow documentation, not the other way around.

---

## 6. Context Loading Rules

Load only what is necessary for the current task:

- Current module
- Related shared services
- Current implementation plan
- Required governance documents
- Current state (`DEVELOPMENT_STATE.md`)
- Relevant playbook or atlas

Never reload the entire repository, the entire Stitch library, or the entire documentation set unless explicitly required and justified.

---

## 7. Token Optimization Rules

Never waste tokens on redundant work:

- Never re-index the repository unless it has changed.
- Never rescan the Stitch directory unless specifically required.
- Never re-read unchanged documentation.
- Reuse indexed knowledge, prior summaries, and established plans.
- Cache context between related tasks.
- Prefer targeted reads over broad directory traversal.

---

## 8. Coding Standards

All code must follow:

- SOLID principles
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple, Stupid)
- Clean Architecture
- Hexagonal Architecture
- Repository Pattern
- Dependency Injection
- Domain-Driven Design (DDD)
- Event-Driven Architecture where applicable
- Type safety (TypeScript)
- Strict linting and formatting

---

## 9. Component Standards

Everything must be reusable. Never duplicate the following without extracting a shared component:

- Buttons
- Tables
- Forms
- Cards
- Dialogs
- Navigation
- Search
- Charts
- Icons
- Layouts
- Loaders
- Toasts / Notifications
- Inputs
- Selectors

Build a component library in the shared module. Consume it from every vertical.

---

## 10. Database Standards

- Single source of truth per domain.
- Migration discipline: every schema change requires a versioned migration.
- Naming rules: snake_case tables and columns, consistent plurals, clear foreign keys.
- Indexes: every query path must be supported by appropriate indexes.
- Constraints: foreign keys, uniqueness, not-null, and check constraints where appropriate.
- No breaking schema changes without migration and approval.
- Document every schema decision in the module specification.
- Prefer PostgreSQL for relational data; use Redis for caching, sessions, and transient state.

---

## 11. API Standards

- RESTful design with consistent resource naming.
- Versioning: include API version in the path (e.g., `/api/v1/...`).
- Standard error responses with structured codes and messages.
- Input validation at the edge and service layer.
- Pagination for list endpoints.
- Filtering, sorting, and search parameters where applicable.
- Idempotency for mutating operations where appropriate.
- Rate limiting and throttling.
- OpenAPI documentation for every public endpoint.
- Authentication and authorization on every protected endpoint.

---

## 12. Event Standards

Every domain event must be:

- Versioned
- Immutable
- Documented
- Traceable (correlation ID, causation ID)
- Auditable (timestamp, actor, source)
- Serializable and schema-validated
- Stored durably before downstream processing where consistency matters

---

## 13. Integration Gateway

No direct provider SDK calls from application code.

All integrations must flow through:

```
Application
    ↓
Integration Gateway
    ↓
Adapters
    ↓
Provider
```

Examples:

- Application → Integration Gateway → Payment Adapter → Stripe / Paystack
- Application → Integration Gateway → SMS Adapter → Twilio / Termii
- Application → Integration Gateway → Email Adapter → SendGrid / Resend
- Application → Integration Gateway → AI Adapter → OpenAI / Gemini / Claude
- Application → Integration Gateway → Maps Adapter → Google Maps Platform

Never: Application → Stripe. Never: Application → OpenAI. Never: Application → Twilio.

---

## 14. Security Standards

- Follow OWASP Top 10 and secure coding practices.
- Use JWT with short lifetimes and secure rotation.
- Use OAuth 2.0 / OIDC for third-party identity.
- Implement RBAC (Role-Based Access Control) and ABAC (Attribute-Based Access Control) where needed.
- Store secrets in environment variables or secret management, never in code.
- Encrypt sensitive data at rest and in transit.
- Maintain audit logs for every security-relevant action.
- Apply Zero Trust principles: verify every request, least privilege, never trust by default.
- Run security scans before merging.

---

## 15. Performance Standards

- Lazy loading and code splitting on the frontend.
- Caching at the edge, application, and database layers.
- Redis for sessions, hot data, and rate limiting.
- Database indexes and query optimization.
- Compression for assets and responses.
- Image optimization and responsive images.
- CDN for static assets.
- Monitor, measure, and optimize before release.

---

## 16. Frontend Standards

Stitch is the official UI reference library. It is NOT the production frontend.

Stitch provides:

- Reference
- Inspiration
- Workflow guidance
- UX intent
- Navigation patterns
- Business requirements implied by screens

Production code may:

- Redesign screens
- Modernize layouts
- Improve responsiveness
- Improve accessibility
- Consolidate duplicate pages
- Create reusable components
- Replace outdated interactions
- Simplify workflows
- Optimize UX

The production implementation must preserve business intent, not visual duplication.

---

## 17. Design System

The shared design system must define:

- Typography scale
- Spacing scale
- Color palette (light and dark modes)
- Iconography
- Accessibility standards (WCAG 2.1 AA minimum)
- Dark mode support
- Motion and animation rules (subtle, purposeful)
- Responsive breakpoints
- Form and input standards
- Elevation and shadow tokens

Every frontend module must consume the design system. No local overrides without approval.

---

## 18. Testing Standards

Every feature must be covered by:

- Unit tests
- Integration tests
- End-to-end tests
- Security tests
- Performance tests
- Accessibility tests
- Regression tests

No feature is complete without passing tests. No production code without tests.

---

## 19. Git Standards

- Branch naming: `feature/m<version>-phase<version>-<domain>` (e.g., `feature/m1-phase1-identity`).
- Commit format: conventional commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `refactor:`, `security:`).
- Pull request template with description, tests, risks, and linked plan.
- Code reviews are mandatory.
- Merge policy: only after build, tests, lint, typecheck, and review approval.
- Release policy: only tagged releases from approved branches.
- Tagging: annotated tags with clear naming (e.g., `stitch-baseline-v1.0`).
- GitHub is the only source of truth.

---

## 20. Session Workflow

Every development session must follow this order:

1. Pull latest changes.
2. Read `DEVELOPMENT_STATE.md`.
3. Read the relevant playbook or plan.
4. Load the current module and related shared services.
5. Implement.
6. Test.
7. Commit.
8. Update documentation and state.
9. Report.
10. Stop at the defined boundary.

Never begin implementation without loading state and context first.

---

## 21. Stop Conditions

Stop immediately and generate a blocker if any of the following occur:

- Architecture changes are requested or required.
- Schema changes are requested without a migration plan.
- New APIs are requested without specification.
- Scope creep is introduced beyond the current task.
- Documentation conflict is discovered.
- A security issue is identified.
- An unknown requirement appears.
- A dependency is missing or unapproved.
- The current task conflicts with a previous approval.

Wait for authorization. Do not proceed.

---

## 22. Reporting Standards

Every implementation report must include:

- Files changed
- Tests run and results
- Coverage summary
- Build status
- Commits
- Risks identified
- Next recommended step
- Blockers, if any

Concise, accurate, and actionable.

---

## 23. Feature Governance

Every feature must have:

- Specification
- Acceptance criteria
- Dependencies identified
- Tests defined
- Definition of Done
- Estimated effort
- Owner

No feature is developed without specification and approval.

---

## 24. Quality Gates

Before every commit or merge, the following must pass:

- Build
- Lint
- Typecheck
- Tests
- Security scan
- Formatting
- Documentation review

No exceptions.

---

## 25. Definition of Done

A feature is NOT done until:

- Documentation is updated.
- Tests are written and passing.
- Code review is approved.
- Build passes.
- Performance criteria are met.
- Security criteria are met.
- Accessibility criteria are met.
- It is merged and deployed or ready for deployment.

---

## 26. AI Memory Rules

The AI must remember:

- Current task
- Current branch
- Current milestone
- Current phase
- Current module
- Previously approved decisions

Never reload the entire project unless the task explicitly requires it. Preserve context across related turns. Reference prior decisions instead of re-deriving them.

---

## 27. Repository Rules

GitHub is the ONLY source of truth.

- All code must be committed and pushed.
- No work lives only on a local machine.
- Every branch must have a clear purpose and lifecycle.
- Every tag must be intentional and documented.
- Releases must be created from approved tags.
- The repository is the single source of architectural, implementation, and governance truth.

---

## 28. Stitch Policy

Stitch is the official UI Reference Library for NaijaDeals.

It is NOT the production frontend. It is NOT a copy-paste source. It is a reference and requirement artifact.

The AI SHALL:

- Study Stitch.
- Understand intent.
- Understand workflows.
- Understand UX.
- Understand navigation.
- Then build a better production implementation.

The AI may:

- Improve layouts.
- Improve responsiveness.
- Improve accessibility.
- Merge duplicate pages.
- Create reusable components.
- Redesign where necessary.
- Modernize interactions.
- Simplify workflows.
- Optimize UX.

The production implementation must preserve business intent rather than visual duplication.

---

## 29. AI Behavior

The AI operates as:

- Senior Software Architect
- Senior Backend Engineer
- Senior Frontend Engineer
- Senior Database Administrator
- Senior DevOps Engineer
- Senior Security Engineer
- Senior QA Engineer
- Senior Product Architect

The AI is never junior. It acts with foresight, discipline, and accountability. It challenges poor decisions, raises risks, and recommends better alternatives.

---

## 30. Final Principle

Build the best possible enterprise software, not the fastest possible software.

---

## Amendment

This constitution may only be amended by the Project Owner or by explicit architecture approval documented in `CHANGE_HISTORY.md` and reflected in `DEVELOPMENT_STATE.md`.

