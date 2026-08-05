# MASTER ROUTE MAP

This document defines the canonical route taxonomy for NaijaDeals and classifies every namespace as either current approved scope or future reference only.

## Shared and Role Route Taxonomy

| Route Domain | Namespace Pattern | Scope Status | Responsibility |
| --- | --- | --- | --- |
| Public | `/`, `/search`, `/auth/*` | Current Approved Scope | public discovery and platform entry |
| Authenticated user | `/app`, `/account`, `/wallet`, `/notifications`, `/messages` | Current Approved Scope | shared authenticated shell |
| Merchant | `/merchant/*` | Current Approved Scope | merchant dashboard, catalog, orders, payouts, trust |
| Supplier | `/supplier/*` | Current Approved Scope | wholesale / procurement operations |
| Farmer | `/farmer/*` | Current Approved Scope | agro production, logistics, pricing, settlement |
| Restaurant | `/restaurant/*` | Current Approved Scope | menu, kitchen, order handling, settlement |
| Driver | `/driver/*` | Current Approved Scope | assignment, route, proof, payout, safety |
| Host | `/host/*` | Current Approved Scope | property, availability, bookings, incident management |
| Freelancer | `/freelancer/*` | Current Approved Scope | profile, services, proposals, escrow, delivery |
| Creator | `/creator/*` | Current Approved Scope | content, monetization, moderation status, analytics |
| Support | `/support/*` | Current Approved Scope | case inbox, conversations, escalation, refunds |
| Finance | `/finance/*` | Current Approved Scope | settlement, reserve, payout, reconciliation, exposure |
| Operations | `/ops/*` | Current Approved Scope | dispatch, queue control, SLA, issue management |
| Moderator | `/moderation/*` | Current Approved Scope | abuse review, trust review, appeals, enforcement |
| Admin | `/admin/*` | Current Approved Scope | governance, configuration, audit, feature flags |
| Super Admin | `/super-admin/*` | Current Approved Scope | platform-wide policy, access, observability, emergency controls |
| API | `/api/v1/*` | Current Approved Scope | versioned service endpoints |

## Product Namespace Taxonomy

| Module | Namespace Pattern | Scope Status |
| --- | --- | --- |
| NaijaShop | `/shop/*` | Current Approved Scope |
| NaijaWholesale | `/wholesale/*` | Current Approved Scope |
| NaijaAgro | `/agro/*` | Current Approved Scope |
| NaijaSend | `/send/*` | Current Approved Scope |
| NaijaDrive | `/drive/*` | Current Approved Scope |
| NaijaEats | `/eats/*` | Current Approved Scope |
| NaijaStay | `/stay/*` | Current Approved Scope |
| NaijaGigs | `/gigs/*` | Current Approved Scope |
| NaijaStream | `/stream/*` | Current Approved Scope |

## Future Reference Only Reserved Namespaces

| Future Module | Reserved Namespace Pattern | Scope Status |
| --- | --- | --- |
| NaijaHealth | `/health/*` | Future Reference Only |
| NaijaInsurance | `/insurance/*` | Future Reference Only |
| NaijaLearn | `/learn/*` | Future Reference Only |
| NaijaJobs | `/jobs/*` | Future Reference Only |

## Route Governance Rules

- No Future Reference Only namespace may appear in active implementation scope, release scope, or Milestone 1 acceptance criteria.
- Public discovery routes remain separate from privileged operator routes.
- Role namespaces are canonical entry points; they may render shared shell components internally.
- Admin and super-admin surfaces must never share unrestricted access patterns with end-user modules.
- API namespaces remain decoupled from frontend route naming.
- Any route reclassification from Future Reference Only to Current Approved Scope requires change control and updated scope approval.
