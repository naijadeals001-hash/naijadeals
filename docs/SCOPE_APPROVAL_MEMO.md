# SCOPE APPROVAL MEMO

- **Documentation Baseline:** NaijaDeals Enterprise Documentation Baseline v1.0
- **Document Version:** v1.1
- **Status:** Remediated scope-control memo
- **Effective Date:** 2026-08-03

## Purpose

This memo defines the implementation boundary for NaijaDeals Version 1.0 and Milestone 1. It exists to prevent future-reference material, exploratory Stitch concepts, and adjacent ecosystem ideas from sneaking into active delivery wearing a fake mustache.

## Governance Statement

Version 1.0 implementation shall proceed only within the boundaries defined in this memo and the governing baseline documents. Any attempt to include excluded modules, unapproved workflows, or undocumented shared services shall be treated as a scope change and must follow `docs/CHANGE_CONTROL.md`.

## Approval State Model

This memo distinguishes boundary definition from implementation permission:

- **Documentation Complete** means the scope is documented.
- **Architecture Approved** means the architecture team accepts the scope boundary’s technical coherence.
- **Governance Approved** means the boundary aligns with control, risk, and operating expectations.
- **Technical Approval Required** means engineering/platform approval is still required before implementation start.
- **Business Approval Required** means product/program/business approval is still required before implementation start.
- **Final Milestone Authorization** is separate and is not granted by this memo alone.

## Approved Version 1.0 Modules

The following modules are approved for Version 1.0 implementation planning and Milestone 1 execution once final authorization is granted:

- NaijaShop
- NaijaWholesale
- NaijaAgro
- NaijaSend
- NaijaDrive
- NaijaEats
- NaijaStay
- NaijaGigs
- NaijaStream

## Shared Platform Scope Approved for Version 1.0

The following shared platform capabilities are approved because the product modules depend on them directly:

- Authentication
- Identity and session management
- RBAC / permissions
- Wallet platform
- Escrow platform
- Trust engine
- Messaging platform
- Notifications platform
- Universal search
- Analytics foundation
- Audit logging
- Aura AI governance-enabled capabilities
- Integration Gateway
- Super Admin and governed administrative control planes

## Future-Reference Modules Excluded from Milestone 1

The following modules are documented as reference-only and are explicitly excluded from Milestone 1 implementation:

- NaijaHealth
- NaijaInsurance
- NaijaLearn
- NaijaJobs

These modules may remain in the repository as governed design and architecture reference material, but they are not authorized for active implementation, delivery commitment, route activation, API activation, or milestone acceptance criteria unless re-approved through change control.

## Route Boundary Rule

Every route must be classified as one of the following:

- **Current Approved Scope**
- **Shared Platform Scope**
- **Future Reference Only**

No future-reference module route may be treated as active implementation scope. Reserved namespaces are allowed for governance purposes only.

## Milestone Boundaries

### Milestone 1 Boundary

Milestone 1 is limited to establishing the production-grade engineering foundation and current-scope Version 1.0 execution path for approved modules and shared services.

Milestone 1 may include:

- implementation-ready shared architecture aligned with governing docs
- current-scope route, service, and domain foundations
- shared platform service implementation planning and execution for approved scope
- module implementation only for approved Version 1.0 modules
- governed AI capability only where explicitly required by approved scope
- security, QA, observability, release, and admin foundations necessary for approved scope

### Not Included in Milestone 1

- implementation of future-reference modules
- speculative module expansion
- side-platform experiments not defined in the approved baseline
- provider-specific shortcuts that bypass the Integration Gateway
- undocumented workflow additions
- ungoverned AI feature sprawl

## Excluded Functionality

The following categories are excluded unless separately approved:

- NaijaHealth-specific clinical, patient, or healthcare operations
- insurance workflows, underwriting logic, or claims systems
- learning-management or education workflows
- jobs platform expansion beyond currently approved NaijaGigs scope
- unapproved international expansion logic beyond Nigeria-first baseline assumptions
- non-governed custom admin systems outside the approved admin model
- ad hoc third-party integrations not listed or justified in the baseline

## Approval Gates for Scope Activation

| Gate | Meaning | Required Authority |
| --- | --- | --- |
| Documentation Complete | Scope memo exists and aligns to route / module / feature docs | Architecture owner |
| Architecture Approved | Scope boundary aligns to current route, API, data, and shared-service model | Enterprise Architecture Authority |
| Governance Approved | Exclusions and privileged boundaries align to admin, security, and change-control governance | Governance / Security Authority |
| Technical Approval Required | Engineering confirms the scope can be delivered without hidden dependency on excluded modules | Platform / Engineering Authority |
| Business Approval Required | Product / program leadership authorizes the exact module boundary | Program / Product Authority |
| Final Milestone Authorization | Milestone 1 may start within this boundary | Program Authority + Business Authority |

## Scope Control Rule

Any of the following requires formal change control:

- adding a future-reference module into active delivery scope
- expanding Milestone 1 beyond approved modules
- adding new shared platform services not already governed
- introducing new third-party dependencies with material architecture impact
- changing the Nigeria-first Version 1.0 boundary materially
- reclassifying a route from Future Reference Only to Current Approved Scope

## Implementation Interpretation Rule

If a workflow, screen, feature, admin control, AI behavior, or integration appears in repository reference materials but is not aligned to the approved Version 1.0 scope above, it must be treated as out-of-scope until explicitly approved.

## Conclusion

This memo defines the scope boundary. It does **not** by itself authorize Milestone 1 start. Final milestone authorization remains a separate gate.
