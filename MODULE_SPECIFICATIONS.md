# MODULE SPECIFICATIONS

This document defines the intended enterprise responsibility of each platform module and shared service. It extends the Phase 0 UI inventory into implementation-governing scope and route guidance.

## Shared Service Specifications

| Domain | Scope Status | Route Namespace | Purpose |
| --- | --- | --- | --- |
| shared | Current Approved Scope | `/app`, shared public and role shells | cross-ecosystem shared UX and platform surfaces |
| authentication | Current Approved Scope | `/auth/*` | identity access, onboarding, verification, recovery |
| wallet | Current Approved Scope | `/wallet`, `/finance/*` | wallet, payments, reserves, settlement, payout, finance controls |
| notifications | Current Approved Scope | `/notifications` | inbox, preferences, delivery state |
| messaging | Current Approved Scope | `/messages` | conversations, support threads, escalation context |
| search | Current Approved Scope | `/search` | universal search, filters, ranking diagnostics |
| ai | Current Approved Scope | governed surfaces under current module namespaces and admin/ops shells | Aura AI capability |
| admin | Current Approved Scope | `/admin/*`, `/super-admin/*`, `/ops/*`, `/support/*`, `/moderation/*` | governance and operator control planes |

## Product Module Specifications

| Module | Scope Status | Route Namespace | Purpose | Shared Dependencies |
| --- | --- | --- | --- | --- |
| NaijaShop | Current Approved Scope | `/shop/*` | B2C retail marketplace | identity, wallet, trust, notifications, messaging, search, analytics, audit, AI |
| NaijaWholesale | Current Approved Scope | `/wholesale/*` | B2B procurement and supplier workflows | identity, wallet, notifications, search, analytics, audit, AI |
| NaijaAgro | Current Approved Scope | `/agro/*` | agriculture production, aggregation, logistics | identity, wallet, notifications, search, analytics, audit, AI |
| NaijaSend | Current Approved Scope | `/send/*` | parcel and shipping workflows | identity, wallet, notifications, search, analytics, audit |
| NaijaDrive | Current Approved Scope | `/drive/*` | dispatch, fleet, logistics, route intelligence | identity, wallet, notifications, search, analytics, audit, AI |
| NaijaEats | Current Approved Scope | `/eats/*` | food ordering and restaurant operations | identity, wallet, notifications, messaging, analytics, audit, AI |
| NaijaStay | Current Approved Scope | `/stay/*` | accommodation and booking workflows | identity, wallet, trust, messaging, notifications, analytics, audit, AI |
| NaijaGigs | Current Approved Scope | `/gigs/*` | talent marketplace and escrow-backed delivery | identity, escrow, trust, notifications, messaging, analytics, audit, AI |
| NaijaStream | Current Approved Scope | `/stream/*` | media, subscriptions, moderation, creator analytics | identity, wallet, trust, notifications, analytics, audit, AI |

## Future Reference Only Specifications

| Module | Scope Status | Reserved Namespace | Rule |
| --- | --- | --- | --- |
| NaijaHealth | Future Reference Only | `/health/*` | preserved as reference; excluded from Milestone 1 |
| NaijaInsurance | Future Reference Only | `/insurance/*` | preserved as reference; excluded from Milestone 1 |
| NaijaLearn | Future Reference Only | `/learn/*` | preserved as reference; excluded from Milestone 1 |
| NaijaJobs | Future Reference Only | `/jobs/*` | preserved as reference; excluded from Milestone 1 |
| future | Future Reference Only | non-active reference content only | not an active implementation module |

## Search Governance Rule

All current-scope modules may publish search documents only through governed search indexing workflows. Future Reference Only modules may not activate live indexing or live user routes in Milestone 1.

## Event and Notification Rule

Every current-scope module must:

- emit authoritative workflow events through owned domains
- consume shared notifications through the Notification Platform only
- create audit evidence for privileged, financial, trust, moderation, or AI-sensitive actions
- avoid custom local implementations of wallet, escrow, notifications, search, audit, or AI governance
