# WORKFLOW ATLAS

This document defines canonical business workflows for NaijaDeals. Stitch showed interface intent; this atlas defines the governed execution behavior.

## Cross-Cutting Workflow Spine

1. identity and onboarding
2. discovery and search
3. transaction creation
4. payment / wallet / escrow state
5. fulfillment or service delivery
6. notifications and messaging
7. trust / moderation / fraud controls
8. analytics and reporting
9. support, disputes, and audit trails

## Workflow Contract Standard

Every workflow must define:

- entry route and scope status
- initiating actor and permission boundary
- authoritative record of truth
- emitted events and consuming services
- notification trigger behavior
- audit requirements
- failure / retry / recovery behavior
- manual review thresholds where required

## Event-Driven Workflow Governance

### Canonical Workflow Event Rules

- event naming must follow `domain.aggregate.action.v1`
- producers own event truth; consumers own idempotent side effects
- every cross-service workflow must carry correlation IDs
- wallet, escrow, refund, suspension, role-change, AI-sensitive, and notification replay workflows require audit evidence
- event replay must be operator-controlled for privileged or user-affecting flows
- DLQ replay must be attributable to a named authorized operator role

### Core Workflow Producers and Consumers

| Workflow Domain | Primary Producers | Typical Consumers |
| --- | --- | --- |
| Identity / Access | identity-service, rbac-service | notifications, audit, analytics, admin |
| Wallet / Payments | wallet-ledger-service, payment adapter workflows | notifications, finance/admin, analytics, audit |
| Escrow / Disputes | escrow-service | wallet, support, notifications, audit |
| Commerce / Orders | shop/eats/stay/gigs/wholesale/agro/send/drive services | wallet, notifications, messaging, analytics, audit |
| Search | search-service and indexing workers | analytics, admin diagnostics |
| Messaging | messaging-service | notifications, support workflows, audit |
| AI | aura-ai-platform | audit, analytics, admin diagnostics |

### Failure Recovery Rules

- authoritative transactional state is never inferred from a downstream notification or analytics event
- consumers must validate current state before applying irreversible side effects
- financial workflows must be idempotent and replay-safe
- compensation is explicit and auditable; hidden rollback magic is forbidden
- search/index rebuilds are controlled workflows, not ad hoc scripts

## Notification Governance

### Trigger Classes

| Trigger Class | Examples |
| --- | --- |
| Security | OTP, session anomaly, password reset, emergency access notices |
| Financial | payment result, payout result, refund decision, escrow update |
| Operational | assignment created, SLA breach, fulfillment exception |
| Support / Trust | dispute update, moderation notice, verification result |
| Informational | reminders, digests, low-risk insights |

### Delivery Channels

- in-app inbox
- email
- SMS
- push/mobile where enabled
- operator/admin alert channels for privileged operational events

### Channel Selection Rules

- P0/P1 security and financial events require strongest approved channel set for the actor class
- localization follows actor profile and template locale availability
- user preferences apply except where regulatory, security, or transaction-critical notices must override opt-down rules
- retries and fallbacks are controlled by notification priority and channel policy, not by random application code

### Notification Audit Rules

The following must create notification audit evidence:

- OTP/security notifications
- financial confirmations or failures
- suspension/enforcement notices
- privileged-action approvals or overrides
- incident and service-status communications
- replay of previously failed user-facing notifications

## Search Governance Workflows

Search is a workflow participant, not a side ornament.

Required governed workflows:

- index update after authoritative record changes
- failed indexing retry and DLQ handling
- zero-result diagnostics review
- privileged reindex approval and execution
- ranking or synonym configuration review where applicable

## Role Workflow Sets

### Customer
- discovery
- search and filtering
- checkout / booking / order creation
- wallet/payment activity
- tracking and fulfillment visibility
- support and dispute participation

### Merchant / Supplier / Farmer / Restaurant / Host / Freelancer / Creator / Driver
- onboarding and verification
- catalog/listing/content/service/availability management within role scope
- order/job/booking/assignment handling
- payout or settlement visibility
- dispute/trust/support participation

### Support / Finance / Operations / Moderator / Super Admin
- case intake and triage
- settlement / reconciliation / exception review
- dispatch or SLA management
- moderation / fraud / trust review
- policy, permission, feature-flag, and incident control

## Module Workflow Sets

### NaijaShop
browse, search, product detail, cart, checkout, payment, order tracking, returns/refunds, merchant operations

### NaijaWholesale
supplier discovery, quote flow, negotiation, purchase order acceptance, payment/settlement, fulfillment coordination

### NaijaAgro
production listing, price intelligence, demand matching, aggregation logistics, settlement

### NaijaSend
shipment creation, pricing, pickup/dropoff planning, tracking, delivery confirmation, issue resolution

### NaijaDrive
ride/dispatch request, driver assignment, route execution, status updates, proof of completion, fleet operations

### NaijaEats
restaurant discovery, menu selection, checkout, kitchen acceptance, delivery tracking, refund/support

### NaijaStay
property discovery, availability, booking, host coordination, stay lifecycle, incident handling

### NaijaGigs
talent discovery, proposal/acceptance, escrow hold, delivery, review, payout

### NaijaStream
content discovery, playback/live session, moderation, subscription/monetization, creator analytics, rights/dispute handling

## Workflow Standards

- Every workflow must map to current approved scope or future reference only scope.
- Every irreversible or high-risk action must create an audit event.
- Money movement, trust decisions, moderation actions, permission changes, emergency access, and AI-assisted sensitive actions require maker-checker or human review where the permission matrix says so.
- No workflow may depend on future-reference modules for Milestone 1 success.
