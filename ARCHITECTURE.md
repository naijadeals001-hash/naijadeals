# ARCHITECTURE

## Platform Philosophy

NaijaDeals is a modular enterprise platform with shared platform services, product-line domains, and strict integration governance. Stitch is the approved UI reference. This document defines the implementation architecture law.

Principles:

- Shared services before module duplication.
- Event-driven orchestration for cross-domain workflows.
- APIs and workers behind clear domain boundaries.
- Adapter-mediated external integrations.
- Full auditability for identity, finance, trust, moderation, AI, and operational actions.
- Multi-role governance from day one.
- Explicit distinction between current approved scope and future reference only scope.

## Platform Topology

1. **Experience Layer** — public surfaces, authenticated shell, role dashboards, admin consoles, future native clients.
2. **Gateway Layer** — auth edge, API ingress, rate limiting, request identity, correlation propagation.
3. **Domain Service Layer** — shared services plus approved product/module services.
4. **Workflow & Event Layer** — outbox, event bus/queue, workers, retry handling, DLQ handling, replay control, compensation workflows.
5. **Data Layer** — transactional data, idempotency records, audit store, search index, object storage, analytics/reporting stores.
6. **Integration Gateway** — all external provider access through adapters only.
7. **Observability & Governance Layer** — logs, metrics, traces, SLOs, audit events, AI telemetry, security controls.

## Shared Services

| Shared Service | Primary Responsibility | Must Never Be Duplicated By |
| --- | --- | --- |
| Identity & Authentication | sign-in, signup, MFA, sessions, verification, recovery | product modules |
| RBAC / Permissions | role grants, scoped permissions, policy checks, approval hooks | product modules |
| Wallet Platform | balances, ledger, reserves, payouts, settlement, reconciliations | product modules |
| Escrow Platform | holds, releases, dispute state, milestone state, evidence links | product modules |
| Trust Engine | verification, fraud signals, reputation, moderation inputs | product modules |
| Messaging Platform | conversations, support threads, attachments, escalation context | product modules |
| Notification Platform | trigger evaluation, preference resolution, localization, dispatch, retry, audit | product modules |
| Universal Search | indexing, ranking inputs, autocomplete, diagnostics, reindex operations | product modules |
| Analytics Platform | KPI snapshots, reporting, product metrics, business telemetry | product modules |
| Audit Platform | immutable audit events, approval history, privileged-action evidence | product modules |
| Aura AI Platform | prompt management, routing, model policy, memory governance, telemetry | product modules |
| Integration Gateway | provider abstraction, retries, failover, credentials, diagnostics | all services |

## Approved Module Footprint

| Module | Scope Status | Responsibility |
| --- | --- | --- |
| shared | Current Approved Scope | shared UX shell and cross-module surfaces |
| authentication | Current Approved Scope | identity entry and recovery surfaces |
| wallet | Current Approved Scope | wallet, payments, finance-facing controls |
| notifications | Current Approved Scope | notification preferences, inbox, alert surfaces |
| messaging | Current Approved Scope | user/support communications |
| search | Current Approved Scope | search and discovery surfaces |
| ai | Current Approved Scope | Aura AI governed surfaces |
| admin | Current Approved Scope | platform governance and operator control planes |
| naijashop | Current Approved Scope | retail marketplace |
| naijawholesale | Current Approved Scope | wholesale / procurement |
| naijaagro | Current Approved Scope | agriculture workflows |
| naijasend | Current Approved Scope | shipment and parcel workflows |
| naijadrive | Current Approved Scope | dispatch / fleet / ride workflows |
| naijaeats | Current Approved Scope | food ordering |
| naijastay | Current Approved Scope | accommodation |
| naijagigs | Current Approved Scope | talent marketplace |
| naijastream | Current Approved Scope | media / creator workflows |
| future | Future Reference Only | preserved concepts outside Milestone 1 |

## Domain Service Architecture

Recommended implementation clusters for later execution:

- `identity-service`
- `rbac-service`
- `wallet-ledger-service`
- `escrow-service`
- `trust-risk-service`
- `messaging-service`
- `notification-service`
- `search-service`
- `analytics-service`
- `audit-service`
- `aura-ai-platform`
- `integration-gateway`
- vertical services: `shop-service`, `wholesale-service`, `agro-service`, `send-service`, `drive-service`, `eats-service`, `stay-service`, `gigs-service`, `stream-service`

This does **not** force premature microservice sprawl. Early implementation may begin as a modular monolith with hard domain boundaries, then split selectively.

## Event-Driven Architecture

Use events for cross-service workflows where synchronous coupling would create fragility, latency risk, or failure amplification.

### Event Contract Rules

| Rule | Requirement |
| --- | --- |
| Naming | `domain.aggregate.action.v1` or `domain.workflow.action.v1` |
| Producer ownership | exactly one domain owns emission of the authoritative event |
| Consumer ownership | each consumer owns its own idempotent handling and local side effects |
| Correlation | every event carries `event_id`, `correlation_id`, `causation_id`, `actor_id`, `role_scope`, `occurred_at`, `source_service`, `schema_version` |
| Delivery model | at-least-once delivery assumed; consumers must be replay-safe |
| Idempotency | consumers must persist event receipt or deterministic dedupe keys before mutating state |
| Ordering | ordering is guaranteed only per aggregate key where infrastructure supports it; cross-aggregate global ordering is forbidden as an assumption |
| Retry | bounded exponential retry with backoff and jitter by event family |
| DLQ | poison or exhausted events go to DLQ with reason code, retry history, and operator replay control |
| Audit | privileged, financial, trust, AI-sensitive, and notification replay events must emit audit evidence |
| Recovery | recovery paths must define replay rules, manual intervention thresholds, and compensation triggers |

### Canonical Event Families

| Event Family | Typical Producers | Typical Consumers |
| --- | --- | --- |
| identity.* | identity-service | notification-service, audit-service, analytics-service, trust-risk-service |
| rbac.* | rbac-service, super-admin control plane | audit-service, admin surfaces, analytics-service |
| wallet.* | wallet-ledger-service | notification-service, analytics-service, finance/admin surfaces, audit-service |
| escrow.* | escrow-service | wallet-ledger-service, notification-service, analytics-service, audit-service, support workflows |
| order.* / booking.* / shipment.* / assignment.* | product/ops services | wallet, notifications, messaging, analytics, audit |
| notification.* | notification-service | audit-service, analytics-service, admin diagnostics |
| messaging.* | messaging-service | notifications, audit, analytics, support workflows |
| trust.* / moderation.* | trust-risk-service, moderation/admin surfaces | notification-service, analytics-service, audit-service |
| search.* | search-service, indexing workers | analytics-service, admin diagnostics |
| ai.* | aura-ai-platform | audit-service, analytics-service, admin diagnostics |
| audit.* | all privileged/shared services through audit contract | compliance exports, admin diagnostics |

### Producer and Consumer Responsibilities

**Producers must:**
- emit only after authoritative state change is committed or captured through an outbox pattern
- own schema evolution for their event family
- publish enough context for downstream consumers to act without scraping producer internals
- never emit provider-specific payload shapes as canonical platform events

**Consumers must:**
- be idempotent
- be replay-safe
- validate schema version and reject incompatible payloads to DLQ
- emit their own audit event when handling creates privileged or irreversible side effects
- avoid synchronous call chains that recreate tight coupling through the back door

### Retry, Idempotency, and DLQ Strategy

| Event Class | Retry Strategy | Idempotency Requirement | DLQ Handling |
| --- | --- | --- | --- |
| Financial (`wallet.*`, `escrow.*`) | bounded retries; immediate operator visibility after threshold | strict dedupe by aggregate + external/reference key | finance/admin review before replay |
| Notifications | channel-aware retries with fallback by priority | dedupe by audience + template + reference event | operator review for replay if user-affecting |
| Search indexing | retry and reindex-safe | dedupe by document/index key + version | reindex queue with diagnostics |
| AI telemetry / feedback | retry if non-transactional; do not block core transaction | dedupe by inference/request ID | replay allowed if privacy policy permits |
| Trust / moderation | bounded retries with human review threshold | dedupe by case/action key | moderator/admin review required |

### Event Ordering Rules

- Ordering may be assumed only for events tied to the same aggregate key where the transport supports partitioning by that key.
- Consumers must not assume global ordering across users, orders, wallets, or workflows.
- Financial workflows must validate current authoritative state before acting, even if event order appears correct.
- Notification delivery must key ordering by user + reference workflow where user experience requires sequence-aware delivery.

### Failure Recovery and Compensation

- If a downstream side effect fails after authoritative state change, recovery happens through replay or explicit compensation, not silent mutation rollback theater.
- Compensation must be domain-specific and auditable.
- Wallet, escrow, refund, suspension, and privileged admin workflows require manual review thresholds before automated compensation.
- DLQ replay must record who replayed, why, when, and against which release/config state.

## Notification Platform Governance

The Notification Platform is a shared service, not a convenience helper. It owns:

- trigger evaluation
- audience resolution
- preference resolution
- channel selection
- localization template selection
- retry policy by channel and priority
- suppression / quiet-hour rules where applicable
- dispatch audit evidence
- replay governance

### Notification Priority Levels

| Priority | Typical Use |
| --- | --- |
| P0 Critical | security, emergency access, incident communication, financial integrity risk |
| P1 High | OTP, transaction confirmation, escrow state, payout outcome, suspension notice |
| P2 Standard | order/booking/assignment updates, support escalations, reminders |
| P3 Informational | digest, recommendations, low-risk insights |

## Search Lifecycle Governance

The Search service owns indexing lifecycle for approved current-scope modules.

Required governance:

- source-of-truth ownership per indexed entity
- index freshness monitoring
- reindex authority restricted to approved admin roles
- schema/version awareness for search documents
- no-result diagnostics and relevance feedback loops
- audit evidence for privileged reindex or ranking-configuration changes
- future-reference modules may not activate live search indexes until scope approval changes

## Infrastructure Model

- containerized services
- API ingress behind Cloudflare and gateway protections
- PostgreSQL for transactional system of record
- Redis for cache, queues, locks, rate limiting, and ephemeral coordination
- durable queue/event infrastructure appropriate for high-value asynchronous workflows
- object storage for media, documents, exports, and evidence
- search engine for universal discovery
- analytics/reporting stores for long-lived telemetry and aggregated reporting

## Canonical Component System

Future frontend architecture must consolidate Stitch variants into canonical components without redesigning approved UI intent.

## Governance Rule

Any future implementation must align with `WORKFLOW_ATLAS.md`, `MASTER_API_MAP.md`, `MASTER_DATABASE_MAP.md`, `MASTER_ROUTE_MAP.md`, `SECURITY.md`, `docs/OBSERVABILITY_MONITORING.md`, `docs/MASTER_PERMISSION_MATRIX.md`, `docs/AI_ATLAS.md`, and `docs/SCOPE_APPROVAL_MEMO.md`.
