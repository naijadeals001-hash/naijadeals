# NaijaDeals Backend Playbook

> This document defines how every NaijaDeals backend module, service, and worker is organized. It governs the structure of repositories, services, events, validation, caching, transactions, and logging.
>
> For shared services, see `SHARED_SERVICES_PLAYBOOK.md`. For API rules, see `API_PLAYBOOK.md`. For database rules, see `DATABASE_PLAYBOOK.md`. For AI-specific rules, see `AI_PLAYBOOK.md`.

---

## 1. Backend Philosophy

- **Architecture before code.** Every backend module follows Clean Architecture, Hexagonal Architecture, Domain-Driven Design, and the Repository Pattern.
- **Services before modules.** Extract shared capability into a shared service before duplicating it in a vertical.
- **Events as contracts.** Domains communicate via events, not direct database access or hidden coupling.
- **Type safety everywhere.** TypeScript with strict mode; Prisma generates type-safe database access.
- **Security by default.** Every action is authenticated, authorized, and audited.
- **Observability built in.** Structured logging, tracing, and metrics are mandatory.

---

## 2. Module Organization

Each backend module is a bounded context. A module may live as a package in the monorepo or, when approved, as a dedicated service.

```text
modules/<module-name>/
├── domain/                  # Entities, value objects, domain events, invariants
│   ├── entities/
│   ├── value-objects/
│   └── events/
├── application/             # Use cases, commands, queries, DTOs, services
│   ├── commands/
│   ├── queries/
│   ├── services/
│   └── dto/
├── infrastructure/          # Repository implementations, adapters, ORM, clients
│   ├── repositories/
│   ├── persistence/
│   └── adapters/
├── interfaces/              # API routes, event handlers, consumers
│   ├── http/
│   ├── event-handlers/
│   └── workers/
├── tests/                   # Unit, integration, and contract tests
├── README.md                # Module-local documentation
└── package.json             # Module dependencies
```

For monorepo layout, modules may be grouped under `packages/modules` or `apps/api/src/modules` depending on the ADR decision.

---

## 3. Repositories

- **Repository Pattern:** Domain logic depends on repository interfaces, not concrete implementations.
- **Interface location:** `domain/repositories/`.
- **Implementation location:** `infrastructure/repositories/`.
- **Prisma repositories:** One repository per aggregate root. Use Prisma for persistence, but expose only domain-friendly methods.
- **Transactions:** Repositories expose transaction-aware methods or accept a transaction context.
- **Queries:** Read paths may use specialized query repositories or DTO projections.
- **No domain logic in repositories.** Repositories persist and retrieve; they do not enforce business rules.

---

## 4. Services

- **Application services** orchestrate use cases. They coordinate repositories, domain events, external services, and transactions.
- **Domain services** contain logic that does not belong to a single entity or value object.
- **Shared services** are platform-wide. See `SHARED_SERVICES_PLAYBOOK.md`.
- **Service boundaries:** A service does not directly access another module’s database. It calls the other module’s API or consumes its events.
- **Idempotency:** Services must support idempotency keys for mutating operations.

---

## 5. Commands and Queries

- **CQRS light:** Separate command (write) and query (read) handlers for complex modules.
- **Command handlers:** Validate input, enforce invariants, mutate state, emit events, return result.
- **Query handlers:** Read optimized projections, return DTOs, support pagination and filtering.
- **DTOs:** Use explicit DTOs for input and output. Do not expose domain entities directly.
- **Validation:** Input validation at the edge (Zod) and business validation in the service.

---

## 6. Events

- **Domain events:** Emitted when business state changes. Stored in an outbox table before publication.
- **Event naming:** `<domain>.<entity>.<action>` (e.g., `identity.user.created`).
- **Event payload:** Includes `eventId`, `eventType`, `eventVersion`, `timestamp`, `actorId`, `correlationId`, `causationId`, and schema-validated `payload`.
- **Event bus:** Producers write to outbox; a relay publishes to the bus. Consumers subscribe and process idempotently.
- **DLQ:** Failed events after retry exhaustion move to a dead-letter queue and trigger alerts.
- **Replay:** Events are replayable for recovery, projection rebuild, or audit.
- **Compensation:** Long-running workflows define compensating actions for failure paths.

See `ARCHITECTURE.md` for event families, retry rules, and idempotency rules.

---

## 7. Validation

- **Input validation:** Zod schemas at route boundaries and command handlers.
- **Business validation:** In application services and domain entities.
- **Authorization validation:** In middleware or service entry points using RBAC.
- **Idempotency validation:** Check idempotency key before processing mutation.
- **Error messages:** Clear, user-safe, field-level where applicable. Log full details server-side.

---

## 8. Caching

- **Cache layer:** Redis for hot data, sessions, rate limits, and transient locks.
- **Cache rules:**
  - Cache reads, not writes.
  - Never use cache as the source of truth for financial or transactional data.
  - Invalidate cache on events or explicit invalidation.
  - Define TTL per key pattern.
- **Common cache keys:**
  - `user:session:{id}` — session data
  - `rate:{userId}:{action}` — rate-limit counters
  - `feature:{flag}` — feature flag state
  - `provider:{provider}:status` — integration provider health

---

## 9. Transactions

- **Database transactions:** Use Prisma `$transaction` for atomic operations within a single domain.
- **Saga pattern:** For cross-domain transactions, use event-driven sagas with compensation.
- **Transaction boundaries:** Keep transactions short. Do not perform I/O, HTTP calls, or event publishing inside a transaction unless it is a local outbox write.
- **Outbox pattern:** Write events to an outbox table inside the same transaction as state changes. The relay publishes them asynchronously.

---

## 10. Logging

- **Structured JSON logs:** Every log entry contains `timestamp`, `level`, `service`, `correlationId`, `actorId`, `action`, `result`, and `error`.
- **Log levels:** `debug`, `info`, `warn`, `error`, `fatal`.
- **No sensitive data:** Never log tokens, passwords, full payment details, or unredacted PII.
- **Request logging:** Log method, path, status, duration, and request ID for every API request.
- **Event logging:** Log event publication, processing, success, failure, and DLQ placement.
- **Error logging:** Include stack trace and context, but keep production responses safe.

---

## 11. Workers and Background Jobs

- **Responsibilities:** Email dispatch, notification delivery, search indexing, analytics ingestion, report generation, payout scheduling, import/export, and long-running workflows.
- **Queue:** Redis-backed queue (e.g., BullMQ).
- **Job definitions:** Each job has a name, schema-validated payload, retry policy, and handler.
- **Idempotency:** Jobs must be idempotent or guarded by idempotency keys.
- **Error handling:** Failed jobs retry with backoff, then move to a dead-letter queue.
- **Observability:** Log job start, success, failure, and duration with correlation IDs.
- **No business logic in queue definitions.** Queue files wire handlers; handlers delegate to services.

---

## 12. Integration Gateway

- **Rule:** No direct provider SDK calls from application code.
- **Flow:** Application → Integration Gateway → Adapter → Provider.
- **Adapters:** Live in `packages/integrations` or `modules/<module>/infrastructure/adapters`. Each adapter normalizes the provider contract to a gateway contract.
- **Providers:** Payment, SMS, email, AI, maps, KYC, storage, analytics, weather, government, notifications, search.
- **Fallback:** Gateway supports primary/secondary provider switching and circuit breaking.
- **Testing:** Mock adapters in unit tests. Use sandbox credentials in integration tests.

See `INTEGRATION_GATEWAY.md` for the adapter matrix.

---

## 13. Middleware and Cross-Cutting Concerns

- **Authentication middleware:** Verify JWT and attach user context.
- **Authorization middleware:** Check RBAC permissions before route handler.
- **Rate limiting middleware:** Enforce per-route and per-user limits.
- **Correlation ID middleware:** Generate or propagate `X-Request-Id` / `correlation-id`.
- **Request validation middleware:** Validate and coerce input using Zod.
- **Audit middleware:** Capture privileged actions for the audit log.
- **Error handling middleware:** Convert exceptions to standard error responses and log them.
- **Logging middleware:** Log request/response metadata.

---

## 14. Definition of Done for Backend Work

A backend feature is not done until:

- Domain, application, and infrastructure layers are separated correctly.
- Repositories and services are tested with unit and integration tests.
- API endpoints follow `API_PLAYBOOK.md` and are documented in OpenAPI.
- Events are defined, versioned, and emitted through the outbox pattern.
- Validation is enforced at the edge and service layer.
- Authorization and audit logging are in place.
- Idempotency is handled for mutating operations.
- Cache invalidation is defined where caching is used.
- Quality gates pass.
- Module README is updated.

---

## 15. Cross-References

- `SHARED_SERVICES_PLAYBOOK.md` — platform-wide services
- `API_PLAYBOOK.md` — HTTP interface rules
- `DATABASE_PLAYBOOK.md` — schema and persistence rules
- `AI_PLAYBOOK.md` — AI service implementation
- `INTEGRATION_GATEWAY.md` — adapter and provider rules
- `SECURITY.md` — authentication, authorization, privileged actions
- `ARCHITECTURE.md` — event-driven architecture and module topology
- `PROJECT_RULES.md` — mandatory engineering rules
