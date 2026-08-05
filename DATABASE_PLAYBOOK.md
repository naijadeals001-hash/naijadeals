# NaijaDeals Database Playbook

> This document defines the database philosophy, conventions, and operational discipline for the NaijaDeals platform. It is not the schema; the schema lives in `prisma/schema.prisma` and is documented in `MASTER_DATABASE_MAP.md`.
>
> For detailed naming, indexing, and migration rules, see `DATABASE_STANDARDS.md`. For data governance and privacy, see `docs/DATA_GOVERNANCE.md`.

---

## 1. Database Philosophy

- **Single source of truth per domain.** Each domain owns its data. No duplicated authoritative state.
- **Schema is code.** Every schema change is versioned, reviewed, tested, and deployed through migrations.
- **PostgreSQL for relational data.** PostgreSQL is the primary transactional database.
- **Redis for transient state.** Redis handles sessions, caching, rate limiting, queues, and transient locks.
- **Audit and history are first-class.** Important entities retain history through audit logs, temporal tables, or append-only event records.
- **Performance is designed in.** Indexes, query patterns, and access paths are planned before feature implementation, not after.
- **Scale is prepared, not premature.** Partitioning, read replicas, and archiving are designed as migration paths, not last-minute fixes.

---

## 2. Technology Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Primary database | PostgreSQL 15+ | Relational transactions, ACID compliance |
| ORM | Prisma | Schema definition, migrations, type-safe queries |
| Cache / session store | Redis | Hot data, sessions, queues, rate limits |
| Search index | Meilisearch or Elasticsearch (via adapter) | Full-text and faceted search |
| Object storage | Cloud provider object storage (via adapter) | Files, images, attachments |
| Event outbox | PostgreSQL table | Durable event publishing |
| Migration runner | Prisma Migrate | Versioned, reviewable schema changes |

---

## 3. Naming Conventions

- **Tables:** plural, `snake_case`. Example: `users`, `wallet_transactions`, `listing_images`.
- **Columns:** `snake_case`. Example: `created_at`, `phone_number`, `wallet_id`.
- **Primary keys:** `id` of type `UUID` or `BIGSERIAL` depending on domain. Public-facing identifiers prefer UUID.
- **Foreign keys:** `<referenced_table_singular>_id`. Example: `user_id`, `order_id`.
- **Indexes:** `idx_<table>_<column>`. Composite indexes: `idx_<table>_<col1>_<col2>`.
- **Unique constraints:** `uq_<table>_<column>`.
- **Check constraints:** `chk_<table>_<rule>`.
- **Enums:** Prefer database enums for closed value sets when the ORM supports them; otherwise use check constraints or application-level enums with validation.
- **Prisma models:** `PascalCase`, singular, matching the plural table name. Example: `model User { @@map("users") }`.

---

## 4. Relationships

- **Foreign keys are enforced.** Use explicit `REFERENCES` constraints unless a deliberate exception is approved.
- **On delete behavior:** default to `RESTRICT` or `SET NULL`. `CASCADE` deletes require explicit approval and documentation.
- **Many-to-many:** Always use explicit join tables with their own primary key and timestamps.
- **Self-referential relationships:** Document the hierarchy and use recursive queries or closure tables when depth is significant.
- **Cross-domain references:** Avoid direct foreign keys across bounded contexts. Use stable public identifiers (e.g., UUID) and event-driven synchronization where appropriate.

---

## 5. Constraints

- **NOT NULL:** Apply to mandatory fields. Use default values for optional-but-common cases.
- **UNIQUE:** Enforce business uniqueness at the database level, not just the application.
- **CHECK:** Enforce value rules (e.g., `amount >= 0`, `status IN (...)`).
- **Foreign key constraints:** Protect referential integrity and prevent orphaned records.
- **Default values:** Prefer database defaults for `created_at` and `updated_at` timestamps using `CURRENT_TIMESTAMP`.
- **No business logic in CHECK constraints** beyond simple value validation. Complex rules belong in the application layer.

---

## 6. Indexing

- **Every query path must have an appropriate index.** Before adding a query, add or verify the index.
- **Default indexes:** Primary keys, foreign keys, and unique constraints.
- **Composite indexes:** Order columns by selectivity and equality-first. Document the intended query pattern.
- **Partial indexes:** Use where query patterns repeatedly filter on a subset of rows.
- **Expression indexes:** Use for lower-cased email searches, JSON path queries, etc.
- **Full-text indexes:** For search-driven text columns, use GIN indexes where appropriate.
- **Index review:** Add a migration review checklist item for new indexes.
- **No unused indexes.** Monitor query plans and remove indexes that do not improve query performance.

---

## 7. Migrations

- **Every schema change is a migration.** No manual schema edits in production or local environments.
- **Migration files:** Stored in `prisma/migrations/` with a timestamp prefix and descriptive name.
- **Migration workflow:**
  1. Update `prisma/schema.prisma`.
  2. Run `npx prisma migrate dev --name <descriptive_name>` in local development.
  3. Review the generated SQL before applying.
  4. Test migrations against a fresh local database and against a copy of production-like data in staging.
  5. Apply in production with `npx prisma migrate deploy`.
- **Breaking changes:** Require approval, backward compatibility strategy, and a coordinated deployment plan.
- **No data loss:** Migrations that delete data require explicit data retention or archival step.
- **Idempotency:** Production migrations must be safe to run once and only once.
- **Multi-environment safety:** Never run production migrations from a local developer machine. Use CI/CD or an approved migration runner.

---

## 8. Normalization

- **Default to 3NF.** Avoid update anomalies, duplication, and data inconsistency.
- **Denormalization is allowed only when justified.** Document the reason, the performance gain, and the consistency mechanism (event-driven sync, materialized view, or cache invalidation).
- **Computed fields:** Prefer application-level or database-view computation over duplicated stored values.
- **JSON/JSONB columns:** Use only for semi-structured, schema-evolving data. Validate shape at the application layer. Do not store relational data as JSON.

---

## 9. Soft Deletes

- **Default to soft deletes for user-facing entities.** Add `deleted_at` timestamp column.
- **Hard deletes:** Only for transient, non-auditable data (e.g., cache rows, temporary tokens). Document approval.
- **Unique constraints with soft deletes:** Account for `deleted_at` to allow re-creation of deleted records. Use partial unique indexes where needed.
- **Querying:** Application queries must filter `deleted_at IS NULL` unless explicitly querying deleted data.

---

## 10. Audit and History

- **Audit fields:** `created_at`, `updated_at`, `created_by`, `updated_by` on all transactional tables.
- **Audit log table:** Append-only record of privileged actions, security events, and business-critical state changes. See `SECURITY.md` and `SHARED_SERVICES_PLAYBOOK.md` (Audit).
- **History tables:** For entities that require full temporal history (e.g., wallet balance, KYC status), maintain history tables or use database temporal features if supported.
- **Event sourcing:** Critical domains may use event-sourced history as the source of truth; projections are rebuildable.
- **PII:** Minimize audit log PII; hash or redact where possible. See `docs/DATA_GOVERNANCE.md`.

---

## 11. Performance

- **Query review:** Review query plans (`EXPLAIN ANALYZE`) for new or changed queries that touch large tables.
- **N+1 prevention:** Use Prisma `include`, `select`, or batched queries. Avoid nested unbounded loops.
- **Pagination:** Cursor pagination for high-volume lists; offset pagination only for small, admin-oriented lists.
- **Connection pooling:** Use PgBouncer or equivalent in transaction mode for serverless and worker environments.
- **Read replicas:** Route read-heavy, eventually consistent queries to read replicas.
- **Batching:** Batch inserts and updates where possible. Avoid large single transactions.
- **Monitoring:** Track slow query logs, lock waits, and transaction duration in production.

---

## 12. Partitioning

- **When to partition:** Tables expected to exceed tens of millions of rows or with clear time-based access patterns (e.g., audit logs, events, transactions).
- **Partition keys:** Time (range) or tenant (list) are the most common. Hash partitioning is a last resort.
- **Migration path:** Partitioning is applied through a planned migration, not a hotfix.
- **Query awareness:** Application queries must include partition key filters where possible.

---

## 13. Archiving

- **Policy:** Define retention and archiving rules per domain. Older-than thresholds move data to cold storage or archive tables.
- **Automation:** Use scheduled jobs or event-driven triggers to move data.
- **Restoration:** Document and test the restore path for archived data.
- **Compliance:** Ensure archiving does not violate legal or audit retention requirements.

---

## 14. Future Scaling

- **Read scaling:** Read replicas with query routing.
- **Write scaling:** Domain split, event sourcing, and selective microservice extraction for write-heavy domains.
- **Global deployment:** Regional read replicas and localized caching where latency matters.
- **Sharding:** Reserved for extreme scale and approved by architecture. Avoid premature sharding.
- **Provider portability:** Keep schema provider-agnostic where possible. Cloud-specific features are wrapped in adapter layers.

---

## 15. Local Development Workflow

1. Start PostgreSQL and Redis: `docker compose up -d`.
2. Apply migrations: `npm run db:migrate`.
3. Seed the database: `npm run db:seed`.
4. Inspect data: `npx prisma studio`.
5. Reset when needed: `npm run db:reset` (destroys local data).

---

## 16. Definition of Done for Schema Changes

A schema change is not done until:

- `prisma/schema.prisma` is updated.
- A migration is generated and reviewed.
- The migration runs cleanly against a fresh local database.
- Application code is updated to use the new schema.
- Indexes are added or justified absent.
- Tests are updated and passing.
- Documentation is updated (`MASTER_DATABASE_MAP.md`, module spec, API docs if exposed).
- Data governance impact is assessed.

---

## 17. Cross-References

- `DATABASE_STANDARDS.md` — detailed naming, indexing, migration, and performance rules
- `MASTER_DATABASE_MAP.md` — canonical database schema map
- `docs/DATA_GOVERNANCE.md` — data privacy, retention, and classification
- `SECURITY.md` — audit, encryption, and privileged action rules
- `ARCHITECTURE.md` — data topology and event-driven rules
- `SHARED_SERVICES_PLAYBOOK.md` — shared services data responsibilities
