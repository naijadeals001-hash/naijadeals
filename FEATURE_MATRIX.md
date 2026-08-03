# FEATURE MATRIX

## Module Feature Matrix

| Module | Scope Status | Route Namespace | Core Feature Families | Primary Actors | Shared Dependencies |
| --- | --- | --- | --- | --- | --- |
| NaijaShop | Current Approved Scope | `/shop/*` | catalog, product detail, cart, checkout, merchant ops, promotions, reviews | customer, merchant, support | wallet, notifications, search, trust, analytics, AI |
| NaijaWholesale | Current Approved Scope | `/wholesale/*` | supplier discovery, quote flow, procurement, bulk orders, settlement review | supplier, merchant, finance | wallet, documents, search, analytics, AI |
| NaijaAgro | Current Approved Scope | `/agro/*` | production listing, price intelligence, aggregation, logistics coordination | farmer, supplier, operations | wallet, logistics, weather, analytics, AI |
| NaijaSend | Current Approved Scope | `/send/*` | shipment creation, pricing, tracking, issue handling | customer, operations | mapping, notifications, wallet, analytics |
| NaijaDrive | Current Approved Scope | `/drive/*` | assignment, route tracking, fleet ops, delivery proof, driver payout | driver, operations, finance | mapping, notifications, payouts, analytics, AI |
| NaijaEats | Current Approved Scope | `/eats/*` | menu, ordering, kitchen ops, delivery, refunds | customer, restaurant, support | wallet, dispatch, notifications, analytics, AI |
| NaijaStay | Current Approved Scope | `/stay/*` | search, booking, host ops, trust, incident support | customer, host, support | wallet, trust, messaging, analytics, AI |
| NaijaGigs | Current Approved Scope | `/gigs/*` | talent marketplace, proposal flow, escrow, delivery, review | customer, freelancer, support | escrow, trust, notifications, analytics, AI |
| NaijaStream | Current Approved Scope | `/stream/*` | discovery, playback, moderation, subscriptions, creator analytics | customer, creator, moderator | media, wallet, moderation, analytics, AI |
| NaijaHealth | Future Reference Only | `/health/*` | preserved reference only | n/a | not active in Milestone 1 |
| NaijaInsurance | Future Reference Only | `/insurance/*` | preserved reference only | n/a | not active in Milestone 1 |
| NaijaLearn | Future Reference Only | `/learn/*` | preserved reference only | n/a | not active in Milestone 1 |
| NaijaJobs | Future Reference Only | `/jobs/*` | preserved reference only | n/a | not active in Milestone 1 |

## Shared Service Matrix

| Shared Service | Feature Families | Consumers |
| --- | --- | --- |
| Identity & RBAC | auth, MFA, session control, role grants, delegated access | all current-scope modules |
| Wallet & Escrow | balances, settlements, reserves, holds, releases, disputes | shop, wholesale, agro, send, drive, eats, stay, gigs, stream, finance, admin |
| Trust Engine | verification, ratings, fraud signals, moderation inputs, dispute evidence | all current-scope modules |
| Messaging | user conversations, support, escalation | shop, stay, gigs, eats, support |
| Notifications | email, sms, push, in-app, preference center | all current-scope modules |
| Universal Search | cross-module discovery and ranking | all discovery surfaces |
| Analytics & Reports | product, ops, finance, AI, trust, executive reporting | all current-scope modules + admin |
| Aura AI | search assist, recommendation, support assist, risk signals, insights | all current-scope modules + admin |

## Permission Matrix

| Permission Domain | Required Capability |
| --- | --- |
| Public access | browse public discovery, landing pages, public content where allowed |
| Authenticated access | create transactions, save state, message, rate, manage own account |
| Operator access | manage own role-scoped records, orders, bookings, content, or fulfillment |
| Support access | assist customers, view support-safe records, escalate cases |
| Operations access | manage assignment, queues, incidents, fulfillment, SLA exceptions |
| Finance access | settlements, reserves, refunds, reconciliation, payout review |
| Moderator access | moderation queues, abuse review, appeal handling |
| Super Admin access | platform policy, RBAC, feature flags, privileged admin actions, full audit visibility |

## Notification Governance Matrix

| Notification Class | Priority | Typical Channels | Audit Required |
| --- | --- | --- | --- |
| Security / OTP | P0/P1 | SMS, email, in-app where applicable | Yes |
| Financial | P1 | in-app, email, SMS when required | Yes |
| Operational | P1/P2 | in-app, push, email | Yes for privileged/exception cases |
| Support / Trust | P1/P2 | in-app, email | Yes |
| Informational | P3 | in-app, email, push | No unless tied to privileged action |

## Scope Rule

Future Reference Only modules remain visible in governance tables only. They are not active implementation routes, active delivery scope, or Milestone 1 build targets.
