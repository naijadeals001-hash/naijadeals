# NaijaDeals Product Roadmap

> The living roadmap for the NaijaDeals Super Ecosystem. It describes versions, milestones, phases, features, dependencies, and release targets.
>
> This document is a first-tier engineering asset. It is subordinate to `ARCHITECTURE.md`, `PROJECT_RULES.md`, and `AI_ENGINEERING_CONSTITUTION.md`. Scope changes must go through `docs/CHANGE_CONTROL.md`.

---

## 1. Roadmap Philosophy

Releases are milestone-bound, not calendar-driven. Each version delivers a coherent, tested, governable slice of the platform. Future modules remain reference-only until explicitly reclassified through change control.

---

## 2. Version Summary

| Version | Goal | Scope |
| --- | --- | --- |
| **1.0** | Platform foundation and core trust | Identity, RBAC, wallet, notifications, admin, two vertical pilots (naijashop, naijawholesale) |
| **2.0** | Super-ecosystem expansion | Logistics, agro, accommodation, talent, media verticals; advanced AI, search, and analytics |
| **3.0** | Platform scale and autonomy | Financial services, insurance, government integrations, marketplace network effects, autonomous operations |

---

## 3. Version 1.0 — Platform Foundation

### Milestone 1: Trust, Identity, and Core Shared Services

**Goal:** Build the shared services backbone, the admin control plane, and enough vertical surface to validate the platform architecture with real transactions.

#### Phase 1.0 — Repository and Tooling Baseline

| Feature | Description | Dependencies | Status |
| --- | --- | --- | --- |
| Monorepo structure | `apps/`, `packages/`, `prisma/`, `stitch/`, `docs/` | Node.js, pnpm/npm, Turbo, Docker | Done |
| Quality gates | Build, lint, typecheck, test, format scripts | GitHub Actions, ESLint, Prettier, Vitest | Done |
| CI/CD skeleton | GitHub Actions workflows for PR and release | GitHub, Docker | Done |
| Local dev stack | PostgreSQL, Redis, Docker Compose | Docker | Done |
| Architecture documentation | `ARCHITECTURE.md`, `PROJECT_RULES.md`, standards | Governance approval | Done |

#### Phase 1.1 — Identity & Authentication Foundation

| Feature | Description | Dependencies | Status |
| --- | --- | --- | --- |
| User identity model | User, email, phone, password, MFA preferences | Prisma, PostgreSQL | In Progress |
| Sign-up / sign-in | Email/phone + password, OTP verification | Identity model, notification service | In Progress |
| MFA | TOTP / SMS second factor | Identity, Integration Gateway (SMS) | Planned |
| Session management | JWT access + refresh tokens, session revocation | Redis, identity | Planned |
| Password recovery | Secure token-based reset flow | Email/SMS gateway, identity | Planned |
| Social login adapters | Google, Apple, future providers | Integration Gateway | Future |
| Admin impersonation audit | Privileged session with full audit trail | Audit service | Future |

#### Phase 1.2 — RBAC & Authorization

| Feature | Description | Dependencies | Status |
| --- | --- | --- | --- |
| Role model | User roles, scoped permissions, resource-level grants | Identity, Prisma | Planned |
| Permission matrix | `docs/MASTER_PERMISSION_MATRIX.md` enforced in code | RBAC model | Planned |
| Approval hooks | Maker-checker for privileged actions | RBAC, Audit | Planned |
| Admin control plane | Role and permission management UI | Admin app, RBAC | Planned |
| Emergency access | Time-bound, attributable super-admin override | RBAC, Audit, Notifications | Planned |

#### Phase 1.3 — Wallet & Escrow Foundation

| Feature | Description | Dependencies | Status |
| --- | --- | --- | --- |
| Wallet ledger | Balances, credits, debits, reserves | Identity, PostgreSQL | Planned |
| Transaction history | Immutable ledger entries | Wallet ledger | Planned |
| Escrow holds | Hold, release, dispute state | Wallet, product verticals | Planned |
| Payout initiation | Provider-mediated payout requests | Integration Gateway (payment) | Planned |
| Settlement reporting | Admin settlement and reconciliation views | Wallet, Admin | Planned |

#### Phase 1.4 — Notifications & Messaging Platform

| Feature | Description | Dependencies | Status |
| --- | --- | --- | --- |
| Notification engine | Trigger evaluation, preference resolution, dispatch | Integration Gateway (SMS/email/push) | Planned |
| Notification inbox | In-app notification list, read state, preferences | Notifications | Planned |
| Messaging platform | Conversations, support threads, attachments | Identity, notifications | Planned |
| Template localization | Multi-language templates by channel | Notifications | Future |
| Quiet hours / suppression | User-controlled delivery rules | Notifications | Future |

#### Phase 1.5 — Vertical Pilots: naijashop and naijawholesale

| Feature | Description | Dependencies | Status |
| --- | --- | --- | --- |
| Seller onboarding | KYC-linked seller registration | Identity, Wallet, Integration Gateway | Planned |
| Product catalog | Listings, categories, inventory basics | Database, search index | Planned |
| Order flow | Cart, checkout, order state | Wallet, Escrow, Notifications | Planned |
| Wholesale procurement | Bulk orders, RFQ, negotiated pricing | Catalog, messaging | Planned |
| Admin moderation | Listing review, dispute tools, trust signals | RBAC, Audit, Messaging | Planned |

#### Version 1.0 Release Criteria

- [ ] All Phase 1.1–1.5 quality gates pass.
- [ ] Shared services are exercised by at least two verticals.
- [ ] Wallet and escrow flows are audited and reconciled.
- [ ] Admin control plane supports RBAC, audit, and moderation.
- [ ] Two vertical pilots are deployed to staging with acceptance sign-off.
- [ ] Release notes, rollback plan, and ADRs are current.
- [ ] Tag: `v1.0.0`.

---

## 4. Version 2.0 — Super-Ecosystem Expansion

### Milestone 2: Logistics, Food, Stay, Gigs, Stream

**Goal:** Extend the platform to the remaining approved verticals while maturing AI, search, and analytics.

#### Phase 2.1 — Logistics & Delivery (naijasend, naijadrive)

| Feature | Description | Dependencies | Status |
| --- | --- | --- | --- |
| Shipment lifecycle | Pickup, transit, delivery, proof of delivery | Identity, Wallet, Notifications | Future |
| Driver assignment | Driver matching, route tracking, availability | Identity, Wallet, Search | Future |
| Fleet management | Vehicle registration, driver verification, payouts | Identity, Wallet, Integration Gateway | Future |
| Real-time tracking | Location updates, ETA, maps | Integration Gateway (maps) | Future |

#### Phase 2.2 — Food & Accommodation (naijaeats, naijastay)

| Feature | Description | Dependencies | Status |
| --- | --- | --- | --- |
| Restaurant / vendor menu | Menu management, availability, modifiers | Catalog, Search | Future |
| Booking calendar | Availability, reservations, cancellations | Identity, Wallet, Escrow | Future |
| Order and booking state | Confirmed, preparing, ready, checked-in, etc. | Notifications, Wallet | Future |
| Reviews and ratings | User-generated trust signals | Trust Engine, Audit | Future |

#### Phase 2.3 — Talent & Media (naijagigs, naijastream)

| Feature | Description | Dependencies | Status |
| --- | --- | --- | --- |
| Gig posting & proposals | Project listings, proposals, contracts | Identity, Messaging, Escrow | Future |
| Creator uploads & monetization | Media hosting, subscriptions, payouts | R2/Object Storage, Wallet | Future |
| Content moderation | Automated + human moderation pipeline | Trust Engine, AI, Audit | Future |

#### Phase 2.4 — Aura AI Maturity

| Feature | Description | Dependencies | Status |
| --- | --- | --- | --- |
| Prompt management | Versioned prompts, A/B testing, governance | AI platform, Audit | Future |
| Memory & context | Conversation memory, user preference embeddings | Vector DB, Identity | Future |
| Provider switching | Failover between AI providers by cost/quality | Integration Gateway (AI) | Future |
| AI-assisted support | Ticket triage, response suggestions, escalation | Messaging, AI | Future |
| Cost controls | Budgets, rate limits, usage telemetry | Analytics, AI | Future |

#### Phase 2.5 — Universal Search & Analytics

| Feature | Description | Dependencies | Status |
| --- | --- | --- | --- |
| Cross-vertical search | Unified search index across all live verticals | Search service, all verticals | Future |
| Autocomplete & ranking | Query suggestions, relevance tuning | Search index, Analytics | Future |
| Business dashboards | KPIs, funnel analytics, reporting | Analytics platform | Future |
| Operational diagnostics | Health, queue depth, event flow visibility | Observability, Event Bus | Future |

#### Version 2.0 Release Criteria

- [ ] All approved verticals are live in staging with end-to-end flows.
- [ ] AI platform governs prompts, memory, provider switching, and cost.
- [ ] Search and analytics platforms serve cross-vertical needs.
- [ ] Shared services remain unduplicated across verticals.
- [ ] Tag: `v2.0.0`.

---

## 5. Version 3.0 — Platform Scale & Autonomy

### Milestone 3: Financial Services, Network Effects, and Autonomous Operations

**Goal:** Transform the platform into a self-reinforcing ecosystem with financial and government integrations, advanced AI operations, and multi-country readiness.

#### Phase 3.1 — Financial & Insurance Services

| Feature | Description | Dependencies | Status |
| --- | --- | --- | --- |
| Lending / credit scoring | Transaction-based credit, BNPL | Wallet, Trust Engine, Analytics | Future |
| Insurance products | Goods-in-transit, seller protection | Integration Gateway (insurance) | Future |
| Savings / investment accounts | Wallet extensions, interest, payouts | Wallet, regulatory compliance | Future |
| Multi-currency support | NGN, USD, regional currencies | Wallet, Integration Gateway | Future |

#### Phase 3.2 — Government & Compliance Integrations

| Feature | Description | Dependencies | Status |
| --- | --- | --- | --- | --- | --- |
| Tax reporting | Automated tax documentation | Wallet, Analytics, Audit | Future |
| Business registration | Government API-linked business validation | Integration Gateway (government) | Future |
| Compliance exports | Audit-ready reports for regulators | Audit, Analytics | Future |
| KYC/AML pipelines | Enhanced identity verification | Identity, Trust Engine, Integration Gateway | Future |

#### Phase 3.3 — Marketplace Network Effects

| Feature | Description | Dependencies | Status |
| --- | --- | --- | --- |
| Cross-vertical rewards | Loyalty points, discounts, referrals | Wallet, Analytics | Future |
| B2B procurement networks | Multi-buyer, multi-seller contracts | Wholesale, Messaging, Escrow | Future |
| Supply chain integrations | Supplier inventory, demand forecasting | Analytics, Agro, Wholesale | Future |
| Franchise / white-label | Operator-branded sub-marketplaces | Admin, RBAC, all verticals | Future |

#### Phase 3.4 — Autonomous Operations

| Feature | Description | Dependencies | Status |
| --- | --- | --- | --- |
| AI-driven moderation | Automated trust and safety decisions with human override | AI, Trust Engine | Future |
| Self-healing alerts | Automated rollback, scaling, incident response | Observability, DevOps | Future |
| Intelligent routing | AI-optimized dispatch, pricing, and search ranking | AI, Analytics, Search | Future |
| Predictive support | Proactive issue detection and outreach | AI, Messaging, Analytics | Future |

#### Version 3.0 Release Criteria

- [ ] Financial and insurance products are regulated and deployed where approved.
- [ ] Government integrations are live in at least one operating region.
- [ ] AI operates with measurable autonomy under human governance.
- [ ] Platform metrics demonstrate cross-vertical network effects.
- [ ] Tag: `v3.0.0`.

---

## 6. Dependencies and Enablers

| Dependency | Why It Matters | Target Phase |
| --- | --- | --- |
| PostgreSQL + Prisma | Transactional system of record | 1.0 |
| Redis | Cache, sessions, queues, locks, rate limits | 1.0 |
| Docker + CI/CD | Reproducible builds and deployments | 1.0 |
| Integration Gateway | All external providers abstracted | 1.0 |
| Event Bus / Outbox | Cross-domain workflows | 1.1–1.2 |
| Audit Platform | Compliance and privileged action evidence | 1.2 |
| Search Engine | Universal discovery | 2.0 |
| Object Storage | Media, evidence, exports | 2.0 |
| Vector DB | AI memory and embeddings | 2.0 |
| Analytics / Reporting Stores | Long-lived telemetry and dashboards | 2.0 |
| Government / KYC APIs | Compliance and identity depth | 3.0 |
| Multi-region infrastructure | Latency, resilience, data residency | 3.0 |

---

## 7. Releases and Tags

| Version | Target Tag | Associated Milestone | Current Status |
| --- | --- | --- | --- |
| Stitch Baseline | `stitch-baseline-v1.0` | Pre-implementation reference | Released |
| 1.0.0 | `v1.0.0` | Milestone 1: Foundation | In Progress |
| 2.0.0 | `v2.0.0` | Milestone 2: Expansion | Future |
| 3.0.0 | `v3.0.0` | Milestone 3: Scale & Autonomy | Future |

---

## 8. Governance and Change Control

- This roadmap is updated by the principal architect or authorized product/engineering lead.
- Any change to version scope, milestone order, or phase contents must be recorded in `docs/CHANGE_CONTROL.md`.
- Future-reference modules (`stitch/future/`) may not be promoted to current scope without an approved scope change.
- New ADRs must be added for any architecture or technology decision that changes the roadmap assumptions.

---

## 9. Cross-References

- `ARCHITECTURE.md` — Platform topology, approved module footprint, shared services
- `PROJECT_RULES.md` — Mandatory rules including milestone and scope discipline
- `AI_ENGINEERING_CONSTITUTION.md` — AI authority and behavior rules
- `DEVELOPER_PLAYBOOK.md` — Engineering workflow and definition of done
- `RELEASE_PLAYBOOK.md` — Release process, versioning, and rollback
- `docs/CHANGE_CONTROL.md` — Scope change procedure
- `docs/SESSION_LOG.md` — Session records
- `DEVELOPMENT_STATE.md` — Current project snapshot
