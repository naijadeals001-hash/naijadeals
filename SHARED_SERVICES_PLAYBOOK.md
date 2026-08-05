# NaijaDeals Shared Services Playbook

> This document defines every shared service in the NaijaDeals platform. Shared services are the backbone of the super-ecosystem: they are implemented once, governed centrally, and consumed by every vertical. No vertical may recreate a shared service without explicit architecture approval.
>
> For the canonical shared services table, see `ARCHITECTURE.md`. For integration gateway rules, see `INTEGRATION_GATEWAY.md`. For security and privileged action rules, see `SECURITY.md`.

---

## 1. Shared Services Doctrine

- **Build once, consume everywhere.** Every shared service is a platform-level capability consumed by `apps/web`, `apps/admin`, and any future vertical.
- **No duplication.** Verticals may not implement their own identity, wallet, notification, messaging, audit, RBAC, search, analytics, AI, or gateway logic.
- **Adapter-mediated integrations.** Every external provider is accessed through the Integration Gateway → Adapter → Provider pattern. No direct SDK calls from application code.
- **Event-driven.** Shared services emit and consume domain events through the event bus. Events are versioned, immutable, traceable, and auditable.
- **Security-hardened.** Shared services enforce authentication, authorization, audit logging, rate limiting, and data protection.

---

## 2. Shared Services Catalog

### 2.1 Identity

**Purpose:** User and account identity, authentication, session management, and verification.

**Responsibilities:**
- Registration, login, logout, password management, and password reset
- JWT access and refresh token lifecycle
- OAuth 2.0 / OIDC integration for third-party identity providers (Google, etc.)
- Multi-factor authentication (TOTP, SMS, email OTP)
- Email and phone verification
- Account linking, account recovery, and device/session management
- User profile and identity attributes

**Rules:**
- All auth tokens are signed and rotated with short lifetimes.
- Passwords are hashed with bcrypt/argon2; never stored plaintext.
- Identity events are emitted: `identity.user.created`, `identity.user.authenticated`, `identity.session.revoked`.
- Changes to identity state require audit logging.

### 2.2 Wallet

**Purpose:** Financial accounts, balances, transactions, escrow, payouts, and ledgers.

**Responsibilities:**
- Wallet creation per user and per business entity
- Balance tracking, transaction history, and ledger entries
- Escrow creation, funding, release, and dispute hold
- Payout scheduling and execution
- Payment method linking and tokenization
- Fee calculation and revenue recognition hooks

**Rules:**
- Every financial mutation is recorded as an immutable ledger entry.
- Wallet operations are idempotent and guarded by idempotency keys.
- Wallet events: `wallet.funded`, `wallet.debited`, `wallet.escrow.released`, `wallet.payout.completed`.
- Payout and escrow actions require privileged action authorization.

### 2.3 Notifications

**Purpose:** Multi-channel notification orchestration and user preferences.

**Responsibilities:**
- Push (FCM), email, SMS, and in-app notification dispatch
- Notification templates, localization, and scheduling
- User preference and opt-out management
- Delivery tracking and failure handling

**Rules:**
- Notifications are sent via the Integration Gateway adapters, never directly.
- Failed notifications are retried with exponential backoff and routed to DLQ after threshold.
- Notification events: `notification.sent`, `notification.delivered`, `notification.failed`.
- Marketing notifications require explicit opt-in.

### 2.4 Messaging

**Purpose:** Conversations, chat, and threaded communication between platform users.

**Responsibilities:**
- Direct messages, group conversations, and support tickets
- Message status: sent, delivered, read
- Attachment handling (via object storage)
- Moderation and spam detection hooks

**Rules:**
- Messages are encrypted at rest where content is sensitive.
- Access control enforced by conversation membership and role.
- Messaging events: `message.sent`, `message.read`, `conversation.created`.

### 2.5 Analytics

**Purpose:** Event collection, aggregation, dashboards, and business intelligence.

**Responsibilities:**
- Event ingestion, validation, and storage
- Aggregated metrics and KPIs
- Dashboards for admin and business users
- Data export and scheduled reports

**Rules:**
- Analytics events are asynchronous and must not block user-facing operations.
- PII is redacted or hashed before ingestion where possible.
- Use approved analytics providers through the Integration Gateway.

### 2.6 Search

**Purpose:** Full-text and faceted search across listings, users, businesses, jobs, content, and other entities.

**Responsibilities:**
- Index management, document ingestion, and search queries
- Faceting, filtering, sorting, and autocomplete
- Search analytics and relevance tuning
- Index rebuilds and versioning

**Rules:**
- Search index updates are event-driven.
- Search queries must be rate-limited and sanitized.
- Provider switching (e.g., Meilisearch, Elasticsearch) happens through the adapter layer.

### 2.7 AI (Aura AI)

**Purpose:** AI-assisted decision-making, classification, summarization, generation, and personalization.

**Responsibilities:**
- Prompt management, versioning, and governance
- Provider abstraction and fallback handling
- Vector memory and embeddings (see `AI_PLAYBOOK.md`)
- Cost and rate governance
- Safety, moderation, and human-in-the-loop review

**Rules:**
- AI providers are accessed through the AI Adapter.
- AI may not make irreversible financial, compliance, moderation, permission, recovery, or contractual decisions without human review.
- AI events are logged with prompt version, model, token usage, latency, and outcome.
- See `AI_DEVELOPMENT_RULES.md` and `AI_PLAYBOOK.md` for full rules.

### 2.8 Audit

**Purpose:** Immutable record of security, compliance, and business-relevant actions.

**Responsibilities:**
- Capture actor, action, resource, before/after state, timestamp, and correlation ID
- Tamper-resistant storage and retention policy enforcement
- Audit querying and export for compliance and incident response

**Rules:**
- Every privileged action is logged.
- Audit logs are append-only. No modification or deletion except by defined retention policy.
- Retention period is controlled by `AUDIT_LOG_RETENTION_DAYS`.
- See `SECURITY.md` for privileged action definition.

### 2.9 RBAC (Role-Based Access Control)

**Purpose:** Permission and role management across the platform.

**Responsibilities:**
- Roles, permissions, and resource scoping
- Role assignment and revocation
- Permission checks for API routes and UI features
- Integration with Identity for user and session context

**Rules:**
- Roles are domain-specific and scoped to tenant/organization where applicable.
- No hardcoded role checks in business logic; use the RBAC service.
- Permission changes are audited.
- See `docs/MASTER_PERMISSION_MATRIX.md` and `docs/ROLE_MATRIX.md`.

### 2.10 Logging

**Purpose:** Centralized, structured logging for observability and debugging.

**Responsibilities:**
- Structured JSON logs with severity, service, correlation ID, and trace context
- Log collection, retention, and alerting
- Sensitive data redaction in logs

**Rules:**
- Never log secrets, tokens, passwords, or unredacted PII.
- Use consistent log levels: `debug`, `info`, `warn`, `error`, `fatal`.
- Every request includes a `correlation-id`.

### 2.11 Configuration

**Purpose:** Environment-aware, versioned configuration management.

**Responsibilities:**
- Feature flags, toggles, and kill switches
- Tenant and environment-specific settings
- Configuration validation at startup

**Rules:**
- Feature flags default to safe states.
- Configuration changes are audited and versioned where they affect runtime behavior.
- Secrets are never part of the configuration store; use a secret manager.

### 2.12 Cache

**Purpose:** High-performance caching for sessions, hot data, and transient state.

**Responsibilities:**
- Redis-backed caching layer
- TTL and invalidation strategies
- Cache warming and eviction policies
- Rate-limit storage

**Rules:**
- Cache must never be the source of truth for financial or transactional data.
- Cache invalidation is event-driven or explicit.
- Rate-limit counters use isolated Redis namespaces.

### 2.13 Event Bus

**Purpose:** Asynchronous, durable, and traceable communication between domains and shared services.

**Responsibilities:**
- Event publishing, subscription, and routing
- Schema validation and versioning
- Outbox pattern, retry with backoff, DLQ, and replay
- Correlation and causation ID propagation

**Rules:**
- Every event is versioned, immutable, and documented.
- Producers write to an outbox table; the relay publishes to the bus.
- Consumers must be idempotent.
- Failed events move to DLQ after retry exhaustion and are alertable.
- See `ARCHITECTURE.md` for event families and retry rules.

### 2.14 Integration Gateway

**Purpose:** Centralized, provider-agnostic access to all external services.

**Responsibilities:**
- Provider selection, adapter loading, and fallback orchestration
- Circuit breaking, retries, and rate limiting
- Request/response transformation and logging
- Provider credential management through environment variables

**Rules:**
- No direct provider SDK calls from application code.
- Every provider has an adapter in `packages/integrations`.
- Provider switching does not require application code changes.
- All adapter responses are normalized to a gateway contract.
- See `INTEGRATION_GATEWAY.md` for adapter matrix and rules.

---

## 3. Shared Service Implementation Pattern

Each shared service follows this internal structure:

```text
services/<service-name>/
├── domain/              # Entities, value objects, domain events
├── application/         # Commands, queries, use cases, DTOs
├── infrastructure/      # Repository implementations, adapters, clients
├── interfaces/          # API routes, event handlers, consumers
├── events/              # Event definitions and schemas
├── tests/               # Unit, integration, and contract tests
└── README.md            # Service-local documentation
```

For monorepo organization, shared services may be grouped under `packages/services` or `services/` depending on the module boundary decision recorded in `docs/ADR/`.

---

## 4. Event Contract for Shared Services

Every shared service emits and consumes documented events. Event names follow the convention:

```text
<domain>.<entity>.<action>
```

Examples:
- `identity.user.created`
- `wallet.transaction.completed`
- `notification.email.sent`
- `search.index.updated`

Event payload requirements:
- `eventId` (UUID)
- `eventType` (domain-qualified name)
- `eventVersion` (semantic version)
- `timestamp` (ISO 8601)
- `actorId` (who triggered the action)
- `correlationId` (request trace)
- `causationId` (prior event ID if triggered by event)
- `payload` (schema-validated event data)

---

## 5. Quality Gates for Shared Services

Before any shared service change is merged:

- Unit and integration tests pass.
- API contract tests pass for any exposed interface.
- Event schema tests pass for any new or changed event.
- Security review for auth, authz, audit, and secret handling.
- Performance review for high-throughput paths.
- Documentation updated in this playbook and in the service README.

---

## 6. Cross-References

- `ARCHITECTURE.md` — shared services topology and event-driven rules
- `PROJECT_RULES.md` — shared platform first, integration gateway law, event-driven law
- `INTEGRATION_GATEWAY.md` — adapter matrix and provider rules
- `SECURITY.md` — auth, authz, privileged actions, audit, encryption
- `AI_PLAYBOOK.md` — Aura AI implementation details
- `docs/MASTER_PERMISSION_MATRIX.md` — RBAC permissions
- `docs/ROLE_MATRIX.md` — role definitions
- `docs/AI_ATLAS.md` — AI capabilities map
