# STITCH GAP ANALYSIS

Gap analysis comparing the current Stitch export against the needs of a production-grade NaijaDeals super ecosystem. This section documents missing capability, not implementation details.

## Summary Observations

- Total audited Stitch pages: **999**
- Duplicate-family candidates: **161**
- Modules with strongest screen coverage: wallet (183), naijadrive (142), ai (121), admin (119), naijashop (76), shared (56), naijastay (47), future (46)
- Modules with weakest explicit mobile coverage: None; every classified module has at least one mobile-labeled concept screen.

## Missing Screens

- **Unified authentication suite:** missing consistent login, registration, password reset, session management, device trust, and delegated-access screens across all roles. Needed to onboard and secure all actor types consistently.
- **Complete checkout failure / recovery screens:** missing payment failure, retry, fallback instrument, tax review, shipping review, and refund initiation screens. Needed to prevent revenue leakage and support recovery.
- **Wallet transaction drill-down screens:** missing ledger-level histories, reversal detail, reconciliation, funding-source management, and compliance review screens. Needed for finance operations and user trust.
- **Escrow lifecycle screens:** missing milestone editing, evidence upload, release approval, dispute intake, arbitrator workspace, and settlement reconciliation. Needed because escrow is a shared trust primitive across modules.
- **Notifications preferences screens:** missing channel, frequency, quiet-hours, and escalation settings. Needed to prevent alert fatigue and support role-based communication.
- **Messaging management screens:** missing thread assignment, canned responses, attachments, moderation queues, and escalation handoff. Needed for trust, support, and marketplace dispute resolution.

## Missing Dashboards

- **Customer 360 dashboard:** no single cross-ecosystem dashboard consolidates orders, bookings, gigs, rides, wallet, trust, and rewards. Needed to make the super-app feel unified.
- **Merchant operating dashboard:** analytics exist, but consolidated catalog / orders / payout / dispute / support visibility is fragmented. Needed for merchant retention and operational control.
- **Finance control tower:** reserve, settlement, payout, escrow, fraud, tax, and reconciliation are spread across isolated screens. Needed for treasury-grade monitoring.
- **Trust and safety command center:** there are oversight fragments, but no complete end-to-end case dashboard spanning fraud, moderation, disputes, and appeals. Needed for platform integrity.
- **Super-admin release dashboard:** missing a consolidated release, feature-flag, audit, and incident command interface. Needed for enterprise change governance.

## Missing Components

- **Normalized global navigation shell:** shared nav patterns exist visually but are duplicated inline rather than documented as canonical shells. Needed for maintainability.
- **Permission-aware action states:** missing disabled/locked/approval-required component states. Needed to communicate RBAC and workflow checkpoints clearly.
- **Reusable audit timeline / activity log component:** needed for trust, escrow, finance, and compliance visibility.
- **Attachment / evidence uploader component:** needed for disputes, KYC, delivery proof, host verification, and support operations.
- **Consistent empty / loading / error states:** needed so future implementation covers operational failure modes rather than only happy paths.

## Missing APIs (future design requirement, not implementation)

- **Identity / session APIs:** required for login, MFA, KYC, and delegated role switching.
- **Wallet / ledger APIs:** required for balances, holds, settlements, reserves, reversals, and statements.
- **Order / booking / gig / ride orchestration APIs:** required to unify transaction lifecycles across modules.
- **Search APIs:** required for universal indexing, autocomplete, filters, and ranking control.
- **Notification delivery APIs:** required for email, SMS, push, in-app, and workflow-triggered communication.
- **Messaging / conversation APIs:** required for customer-support and user-to-user threads with attachments and moderation.
- **AI governance APIs:** required for inference history, approvals, feedback, and model safety controls.

## Missing Database Entities (future design requirement, not implementation)

- **User / identity / device / session / role assignment** entities are needed for RBAC and secure multi-role access.
- **Wallet / ledger / transaction / reserve / settlement / payout / escrow / dispute** entities are needed for finance-grade state management.
- **Order / booking / shipment / route / delivery proof / claim** entities are needed for commercial and logistics workflows.
- **Listing / inventory / menu / property / service package / media asset** entities are needed across commerce modules.
- **Notification preference / delivery log / conversation / message / attachment** entities are needed for communication systems.
- **Audit event / approval / feature flag / policy / rule evaluation** entities are needed for governance.

## Missing AI Features

- **Operator approval loop for AI actions:** AI dashboards exist, but approval workflows are not consistently surfaced. Needed for safe automation.
- **Prompt / recommendation history:** needed for auditability and continuous improvement.
- **Trust / fraud explainability panels:** needed so operators can understand why AI scored or flagged something.
- **Cross-module AI copilots:** many AI screens are siloed; shared AI assistance should span customer support, operations, finance, and discovery.

## Missing Admin Features

- **Granular RBAC management:** role registry appears conceptually, but permission bundle editing, role inheritance, and scoped impersonation are incomplete.
- **Case management:** moderation, disputes, fraud, support, and appeals need a shared ticket/case lifecycle.
- **Operational runbooks and incident controls:** needed for outages, fraud spikes, payment issues, and delivery incidents.
- **Audit export / reporting controls:** needed for regulator, investor, and internal governance reporting.

## Missing Permissions

- **Cross-role switching permissions:** required because many actors can be both customer and operator/merchant.
- **Approval permissions:** needed for payouts, refunds, escrow releases, moderation actions, and high-risk overrides.
- **Geographic / business-unit scoping:** needed for regional, franchise, and corridor-specific operations.
- **Read vs write vs approve separation:** needed for finance and compliance segregation of duties.

## Missing Notifications

- **Event-specific templates for order, ride, booking, payout, dispute, moderation, and compliance events.**
- **Notification preference center and channel governance.**
- **Escalation ladders for internal ops and support teams.**

## Missing Wallet Screens

- Funding instrument management
- Cash-in / cash-out confirmation
- Transaction detail & downloadable statements
- Reversal / chargeback handling
- AML/KYC review and threshold alerts

## Missing Escrow Screens

- Escrow creation wizard
- Milestone management
- Evidence upload
- Release / hold / reject actions
- Arbitration workspace

## Missing Mobile Screens

- Several admin and finance-heavy modules have no credible mobile counterpart, which is correct for internal ops but leaves customer and merchant mobile continuity incomplete.
- Core gaps: merchant mobile ops, wallet support, dispute intake, support chat, saved search, booking management, creator earnings, and driver exception handling.

## Missing Analytics

- Cohort and retention analytics
- Funnel analytics for onboarding and checkout
- Finance reconciliation analytics
- Trust and safety outcome analytics
- Multi-module LTV / rewards / subscription analytics

## Missing Reports

- Scheduled executive reports
- Merchant payout and tax reports
- Settlement and reserve reports
- Incident and compliance reports
- Regional operations SLA reports

## Missing Workflows

- Refund / reversal workflow
- Dispute / appeal workflow
- Identity recovery workflow
- Merchant catalog ingestion workflow
- Host incident response workflow
- Driver maintenance / claims workflow
- Creator rights / payout dispute workflow

## Recommendations

- Lock this export as the visual baseline and stop adding new ad-hoc Stitch variants until duplicate families are rationalized.
- Approve the organized module structure before any frontend coding begins.
- Convert the largest shared UI patterns into a canonical design system in Phase 2, but only after product owners sign off on role coverage and gap priorities.
- Prioritize missing cross-cutting workflows—authentication, wallet, escrow, notifications, messaging, trust, and RBAC—before expanding more vertical dashboards.
- Treat future-brand screens (health, travel, utilities, aviation, public-sector concepts) as incubator scope under `future/` until business priority is confirmed.
