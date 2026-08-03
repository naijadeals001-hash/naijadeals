# MASTER DATABASE MAP

Conceptual data relationship map only. No SQL is defined in this phase.

## Domain Responsibility Map

| Domain | Conceptual Entities | Primary Relationships |
| --- | --- | --- |
| Identity | users, profiles, sessions, devices, verification records | wallet accounts, permissions, messages, transactions, audit events |
| Access Control | roles, permissions, grants, scopes, approval rules, elevation requests | users, admin actions, workflow steps |
| Wallet / Ledger | wallets, ledger entries, balances, reserves, settlements, payouts, idempotency keys | users, orders, bookings, gigs, rides, disputes |
| Escrow | escrows, milestones, holds, releases, disputes, evidence links, approval records | orders, gigs, bookings, wallet |
| Commerce | products, merchants, carts, orders, order_items | wallet, notifications, delivery, ratings |
| Wholesale | suppliers, quotes, procurement requests, purchase_orders | wallet, logistics, documents |
| Agro | farmers, harvest lots, demand requests, aggregation batches | pricing insights, logistics, settlements |
| Logistics / Drive / Send | shipments, routes, assignments, vehicles, proofs, incidents | orders, users, payouts, notifications |
| Eats | restaurants, menus, orders, kitchen tickets | delivery, wallet, refunds |
| Stay | properties, availability, bookings, incidents | wallet, messaging, ratings |
| Gigs | talent profiles, services, proposals, contracts, deliveries | escrow, ratings, messaging |
| Stream | content, creators, streams, subscriptions, moderation cases, rights cases | wallet, analytics, trust |
| Messaging | conversations, participants, messages, attachments, escalation links | users, support cases, disputes |
| Notifications | templates, locales, preferences, deliveries, trigger history, suppression rules, replay records | users, workflows, audit |
| Trust / Moderation | verification scores, fraud flags, reviews, moderation cases, appeals | users, content, transactions |
| Search | index documents, indexing jobs, reindex requests, ranking config, diagnostics | source domains, analytics, admin approvals |
| Audit / Approvals | audit events, approval chains, maker-checker records, override records, replay records | all privileged/shared-service domains |
| Event Transport | outbox records, event receipts, DLQ records, replay requests, compensation records | all event-producing/consuming domains |
| AI | prompt templates, prompt versions, inference logs, feedback, policy decisions, cache metadata, memory references | all domains through controlled references |
| Data Governance | consent records, retention classes, export jobs, deletion jobs, legal-hold markers | identity, messaging, audit, AI, support |
| Media / Evidence | documents, uploads, evidence packages, export artifacts, quarantine state | disputes, moderation, KYC, support, stream rights |

## Event-Driven Persistence Rules

- authoritative domain state and emitted events must be linked through an outbox-compatible persistence pattern
- consumer idempotency records must exist for replay-sensitive side effects
- DLQ records must preserve payload reference, reason code, retry count, and operator replay history
- privileged replay and compensation actions must create approval and audit records

## Search Governance Data Rule

Search documents are derived views, not source-of-truth records. Reindex operations, ranking configuration changes, and privileged search admin actions must be auditable and reversible by governance process.

## Governing Rules

- Shared entities remain shared.
- Financial and audit records must preserve historical integrity.
- AI-related logging must not contaminate transactional correctness paths.
- Cross-domain joins should be minimized operationally; domain contracts and read models may be used where appropriate.
- Future-reference modules may not introduce active data domains in Milestone 1 without change control.
