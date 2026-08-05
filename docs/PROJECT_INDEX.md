# PROJECT INDEX

Permanent Phase 0 index for repository understanding, UI memory, and future low-token continuation.

## Repository State

- Audited Stitch pages: **999**
- Top-level module folders under `stitch/`: **19**
- Existing Phase 0 documentation files: **15**
- Exact duplicate HTML groups: **3**
- Duplicate-family groups: **71**

## Primary Documentation

- [`AI_ATLAS.md`](./AI_ATLAS.md)
- [`COMPONENT_INDEX.md`](./COMPONENT_INDEX.md)
- [`COMPONENT_LIBRARY.md`](./COMPONENT_LIBRARY.md)
- [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)
- [`EXTERNAL_SERVICES.md`](./EXTERNAL_SERVICES.md)
- [`INTEGRATION_GATEWAY.md`](./INTEGRATION_GATEWAY.md)
- [`MODULE_INDEX.md`](./MODULE_INDEX.md)
- [`NAVIGATION_MAP.md`](./NAVIGATION_MAP.md)
- [`PROJECT_INDEX.md`](./PROJECT_INDEX.md)
- [`REPOSITORY_AUDIT.md`](./REPOSITORY_AUDIT.md)
- [`ROLE_MATRIX.md`](./ROLE_MATRIX.md)
- [`STITCH_GAP_ANALYSIS.md`](./STITCH_GAP_ANALYSIS.md)
- [`UI_INDEX.md`](./UI_INDEX.md)
- [`UI_INVENTORY.md`](./UI_INVENTORY.md)
- [`UI_WORKFLOW_DISCOVERY.md`](./UI_WORKFLOW_DISCOVERY.md)

## Phase 0 Boundaries

- Documentation, organization, and audit only.
- No production application code, backend, APIs, database schema, or business logic.
- Google Stitch remains the visual source of truth until later approved architecture phases.

## Integration Gateway Policy

- All future third-party integrations must route through an Integration Gateway.
- No module may directly call third-party providers.
- Every provider must be wrapped by an adapter contract.
- Reference details: [`INTEGRATION_GATEWAY.md`](./INTEGRATION_GATEWAY.md) and [`EXTERNAL_SERVICES.md`](./EXTERNAL_SERVICES.md).

## Module Distribution

- **shared**: 56 pages
- **authentication**: 11 pages
- **wallet**: 183 pages
- **notifications**: 4 pages
- **messaging**: 21 pages
- **search**: 10 pages
- **ai**: 121 pages
- **admin**: 119 pages
- **naijashop**: 76 pages
- **naijawholesale**: 13 pages
- **naijaagro**: 27 pages
- **naijasend**: 4 pages
- **naijadrive**: 142 pages
- **naijaeats**: 32 pages
- **naijastay**: 47 pages
- **naijagigs**: 46 pages
- **naijastream**: 41 pages
- **future**: 46 pages

## Role Coverage Snapshot

- **Guest**: 196 inferred screens
- **Customer**: 552 inferred screens
- **Merchant**: 138 inferred screens
- **Supplier**: 42 inferred screens
- **Farmer**: 33 inferred screens
- **Restaurant**: 33 inferred screens
- **Driver**: 158 inferred screens
- **Host**: 54 inferred screens
- **Freelancer**: 48 inferred screens
- **Creator**: 47 inferred screens
- **Support**: 493 inferred screens
- **Finance**: 303 inferred screens
- **Operations**: 441 inferred screens
- **Moderator**: 10 inferred screens
- **Super Admin**: 391 inferred screens

## Common External UI Dependencies

- `https://cdn.tailwindcss.com?plugins=forms,container-queries` — 999 pages
- `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap` — 991 pages
- `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;600;700&display=swap` — 230 pages
- `https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap` — 112 pages
- `https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Plus+Jakarta+Sans:wght@100..900&display=swap` — 82 pages
- `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap` — 74 pages
- `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@500&display=swap` — 50 pages
- `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=JetBrains+Mono:wght@500&display=swap` — 46 pages
- `https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Plus+Jakarta+Sans:wght@700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap` — 39 pages
- `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap` — 27 pages
- `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..900&family=Plus+Jakarta+Sans:wght@100..900&display=swap` — 23 pages
- `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap` — 22 pages

## Baseline Version

- **Documentation Baseline:** NaijaDeals Enterprise Documentation Baseline v1.0
- **Version Status:** Frozen governance baseline candidate for Milestone 1 readiness review

## Engineering Blueprint Documents

- [`README.md`](../README.md)
- [`PROJECT_RULES.md`](../PROJECT_RULES.md)
- [`ARCHITECTURE.md`](../ARCHITECTURE.md)
- [`WORKFLOW_ATLAS.md`](../WORKFLOW_ATLAS.md)
- [`API_STANDARDS.md`](../API_STANDARDS.md)
- [`DATABASE_STANDARDS.md`](../DATABASE_STANDARDS.md)
- [`SECURITY.md`](../SECURITY.md)
- [`DEPLOYMENT.md`](../DEPLOYMENT.md)
- [`AI_DEVELOPMENT_RULES.md`](../AI_DEVELOPMENT_RULES.md)
- [`INTEGRATION_GATEWAY.md`](../INTEGRATION_GATEWAY.md)
- [`API_INVENTORY.md`](../API_INVENTORY.md)
- [`ENVIRONMENT_VARIABLES.md`](../ENVIRONMENT_VARIABLES.md)
- [`MODULE_SPECIFICATIONS.md`](../MODULE_SPECIFICATIONS.md)
- [`FEATURE_MATRIX.md`](../FEATURE_MATRIX.md)
- [`MASTER_ROUTE_MAP.md`](../MASTER_ROUTE_MAP.md)
- [`MASTER_DATABASE_MAP.md`](../MASTER_DATABASE_MAP.md)
- [`MASTER_API_MAP.md`](../MASTER_API_MAP.md)
- [`AI_ATLAS.md`](./AI_ATLAS.md)
- [`ADMIN_ATLAS.md`](./ADMIN_ATLAS.md)
- [`QA_TESTING_ATLAS.md`](./QA_TESTING_ATLAS.md)
- [`INCIDENT_RESPONSE.md`](./INCIDENT_RESPONSE.md)
- [`OBSERVABILITY_MONITORING.md`](./OBSERVABILITY_MONITORING.md)
- [`RELEASE_MANAGEMENT.md`](./RELEASE_MANAGEMENT.md)
- [`DATA_GOVERNANCE.md`](./DATA_GOVERNANCE.md)
- [`CHANGE_CONTROL.md`](./CHANGE_CONTROL.md)
- [`IMPLEMENTATION_READINESS_CHECKLIST.md`](./IMPLEMENTATION_READINESS_CHECKLIST.md)
- [`ARCHITECTURE_VALIDATION_REPORT.md`](./ARCHITECTURE_VALIDATION_REPORT.md)
- [`SCOPE_APPROVAL_MEMO.md`](./SCOPE_APPROVAL_MEMO.md)
- [`MILESTONE_1_IMPLEMENTATION_CHARTER.md`](./MILESTONE_1_IMPLEMENTATION_CHARTER.md)

## Engineering Law

- No implementation work should begin without referencing the governing architecture and standards documents in this baseline.
- The current labeled documentation baseline is **NaijaDeals Enterprise Documentation Baseline v1.0**.
- Change after this point must follow [`CHANGE_CONTROL.md`](./CHANGE_CONTROL.md).
- Current implementation scope is formally defined by [`SCOPE_APPROVAL_MEMO.md`](./SCOPE_APPROVAL_MEMO.md).
- Milestone 1 execution must follow [`MILESTONE_1_IMPLEMENTATION_CHARTER.md`](./MILESTONE_1_IMPLEMENTATION_CHARTER.md).
