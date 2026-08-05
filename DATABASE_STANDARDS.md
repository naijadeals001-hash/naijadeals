# DATABASE STANDARDS

## Scope

These rules govern future persistence design. This document does not create schema or SQL.

## Naming

- Tables: snake_case plural nouns.
- Columns: snake_case.
- Primary keys: `id` using a platform-approved globally unique identifier strategy.
- Foreign keys: `<related_entity>_id`.
- Timestamps: `created_at`, `updated_at`, `deleted_at` where soft delete applies.

## Relationships

- Use explicit foreign keys and relationship constraints wherever operationally safe.
- Junction tables are required for many-to-many relationships.
- Shared identity entities must never be duplicated into each module as separate user tables.

## Constraints

- Enforce uniqueness at the database level for true business invariants.
- Use check constraints where rules are stable and safety-critical.
- Avoid relying solely on application code for integrity.

## Indexing

- Index foreign keys, hot lookup keys, and high-cardinality search filters.
- Compound indexes must reflect real query patterns, not wishful thinking.
- Review index cost for write-heavy tables such as logs, messages, transactions, events, and notifications.

## Soft Deletes

- Use soft deletes for user-facing records where historical or compliance recovery matters.
- Never soft delete financial ledger entries or audit logs in a way that breaks traceability.
- Archived and hidden states should be domain-specific, not abused as deletion substitutes.

## Audit and History

- High-risk domains require immutable history or append-only event support: wallet, escrow, moderation, KYC, permissions, settlements, AI decisions.
- Changes to sensitive records should preserve before/after state, actor, reason, timestamp, and correlation ID.

## Performance

- Optimize for read/write hotspots intentionally.
- Partition or archive large operational history tables when needed.
- Do not over-normalize high-throughput event tables if it harms operational performance without governance value.

## Migration Rules

- Every migration must be reversible where feasible, reviewed, and tested against realistic data volumes.
- Avoid destructive migrations without backup, rollback, and runbook planning.
- Schema change order must respect multi-service rollout safety.

## Multi-Environment Safety

- Development fixtures must never contaminate production.
- Production data access must be strictly limited and audited.
- PII and financial data must be masked or anonymized for non-production uses.
