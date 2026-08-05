# MASTER API MAP

This document defines canonical API responsibility and asynchronous contract boundaries. It does not generate endpoints or code.

## API Responsibility Map

| API Domain | Responsibilities | Emits / Owns Events | Consumes Events |
| --- | --- | --- | --- |
| Identity APIs | auth, sessions, MFA, verification, account recovery, delegated role switching | `identity.*` | `notification.*`, `audit.*` as downstream dependencies only |
| RBAC APIs | roles, permissions, grants, scope resolution, approval policies | `rbac.*` | identity, audit |
| Wallet APIs | balance, transactions, funding, payout, reserve, settlement, statements | `wallet.*` | payment callbacks, escrow outcomes |
| Escrow APIs | holds, milestones, release, disputes, evidence, arbitration support | `escrow.*` | wallet outcomes, order/job state changes |
| Trust APIs | ratings, verification, fraud signals, reputation, appeals | `trust.*`, `moderation.*` | identity, order/job/content signals |
| Messaging APIs | conversations, messages, attachments, support threads, templates | `messaging.*` | identity, support case state |
| Notification APIs | preferences, dispatch, inbox, read state, templates, localization policy | `notification.*` | identity, wallet, escrow, trust, ops, AI, incident signals |
| Search APIs | query, autocomplete, filters, result sets, ranking diagnostics, reindex control | `search.*` | authoritative domain change events |
| Analytics APIs | dashboards, metrics, report export triggers, KPI summaries | `analytics.*` | all governed domain events |
| Audit APIs | event retrieval, privileged-action history, compliance exports | `audit.*` | all privileged/shared-service events |
| Aura AI APIs | assistive requests, recommendation requests, summarization, governance, telemetry | `ai.*` | identity, search, trust, analytics, admin policy updates |
| NaijaShop APIs | catalog, cart, checkout, orders, merchant operations | `order.*` | wallet, trust, notification, search |
| NaijaWholesale APIs | suppliers, quotes, procurement, purchase orders | `procurement.*` | wallet, notifications, search |
| NaijaAgro APIs | production, lots, demand matching, aggregation, logistics linkage | `agro.*` | logistics, search, analytics |
| NaijaSend APIs | shipments, tracking, pricing, exception handling | `shipment.*` | wallet, notifications, ops |
| NaijaDrive APIs | rides, routes, assignments, fleet, proofs, payout hooks | `assignment.*`, `route.*` | wallet, notifications, trust |
| NaijaEats APIs | menus, restaurant ops, orders, kitchen workflow, refunds | `order.*`, `kitchen.*` | wallet, notifications, ops |
| NaijaStay APIs | properties, availability, bookings, host operations, incidents | `booking.*`, `stay.*` | wallet, messaging, trust |
| NaijaGigs APIs | profiles, services, proposals, contracts, deliveries | `gig.*` | escrow, notifications, trust |
| NaijaStream APIs | content, live sessions, moderation, subscriptions, creator analytics | `stream.*`, `subscription.*` | wallet, trust, notifications |
| Integration Gateway APIs | adapter-normalized provider operations, diagnostics, callback verification, provider health | integration/internal events only | domain-issued integration requests |

## Event and Callback Governance

- No external provider callback becomes canonical platform truth until verified and normalized by the Integration Gateway or the owning domain.
- Callback/webhook handling must enforce signature verification, replay detection, idempotency keys, correlation IDs, and audit logging.
- Synchronous APIs may initiate asynchronous workflows, but resulting completion state must be communicated through owned domain events.
- APIs that trigger privileged or irreversible workflows must return a traceable reference, not a vague "trust me bro" response.

## Ordering and Recovery Rules

- APIs must not assume downstream consumer success at request-return time unless the workflow is truly synchronous and authoritative.
- Financial and privileged APIs must persist idempotency and audit evidence before side effects are considered accepted.
- Replay, compensation, and DLQ handling remain part of domain workflow governance, not one-off controller behavior.

## Rules

- Public APIs must conform to `API_STANDARDS.md`.
- External providers are never exposed as first-class domain API names.
- AI, wallet, moderation, notification replay, and admin APIs require elevated governance, auditability, and rate control.
