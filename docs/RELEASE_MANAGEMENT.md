# RELEASE MANAGEMENT

- **Documentation Baseline:** NaijaDeals Enterprise Documentation Baseline v1.0
- **Document Version:** v1.0
- **Status:** Governance baseline for implementation readiness

This document defines the enterprise release model for NaijaDeals. Releases must be deliberate, reversible, observable, and governed.

## 1. Release Principles

- small, reviewable, reversible changes beat heroic mega-releases
- feature exposure should be decoupled from deployment through feature flags where appropriate
- production change without rollback thinking is amateur hour in formal clothes
- release approval depends on quality, security, observability, and business risk

## 2. Git Workflow and Branch Strategy

| Branch Type | Purpose |
| --- | --- |
| main | protected baseline / production-intent branch; direct pushes prohibited once governance is active |
| develop or integration branch | optional integration branch if team scale requires it |
| feature/* | scoped work branches for new changes |
| release/* | release preparation branches for controlled stabilization |
| hotfix/* | urgent production remediation branches |

## 3. Pull Requests

Pull requests must include:
- scope summary
- linked governing documents
- risk statement
- testing evidence
- rollout / rollback plan
- observability or monitoring impact

## 4. Code Review Expectations

Future implementation reviews must validate:
- architecture compliance
- shared-service compliance
- Integration Gateway compliance
- security and permission correctness
- test completeness
- migration and deployment safety

## 5. CI/CD

Pipelines should include:
- linting and formatting
- type checks
- unit / integration / selected E2E tests
- security scans
- build artifact validation
- environment-specific deployment approvals

## 6. Build and Deployment Pipeline

Required stages:
- build
- validate
- package
- deploy to non-production
- run smoke checks
- approval gate
- production deployment
- post-deploy validation

## 7. Versioning

- use semantic versioning for releaseable artifacts where appropriate
- align release metadata with environment and change scope
- API versioning remains governed by `API_STANDARDS.md`

## 8. Release Approval

Approval authority varies by risk:
- low-risk release: service/module owner + reviewer
- medium-risk release: owner + QA/release reviewer + platform reviewer
- high-risk release: super admin / platform owner / finance or compliance reviewer as applicable

## 9. Rollback Strategy

Every production-intent release must define:
- rollback trigger
- rollback owner
- rollback path (code, config, flag, deployment, data mitigation)
- post-rollback smoke validation

## 10. Hotfix Process

Hotfixes require:
- explicit incident or severity justification
- limited scope
- accelerated but not absent review
- retrospective follow-up and back-merge discipline

## 11. Feature Flags

Feature flags should support:
- staged rollout
- canary exposure
- emergency kill switch
- operator-only or internal-only enablement
- experiment governance

## 12. Blue-Green and Canary Release Guidance

- Blue-green is preferred for higher-risk stateless service transitions where environment cost allows
- Canary is preferred when gradual exposure lowers user or financial risk
- Not every change needs theatrics, but every risky change needs a credible safety pattern

## 13. Production Deployment Rules

- avoid high-risk deployments without staffed monitoring windows
- no undocumented production changes
- no direct emergency patching outside release/hotfix process except under governed incident command

## 14. Staging Rules

- staging should approximate shared-service behavior and key integrations as closely as practical
- staging sign-off is necessary but not sufficient; production smoke still required

## 15. Release Checklist

| Checklist Area | Required Evidence |
| --- | --- |
| Architecture and standards alignment | Change references governing docs and does not violate shared-service or gateway rules |
| Quality gate | Tests, scans, and checks passed to required level |
| Security gate | Secrets, auth, authz, and high-risk implications reviewed |
| Release safety | Rollback, feature flag, and smoke strategy defined |
| Observability readiness | Metrics/logging/alerts updated where needed |
| Communication readiness | Stakeholders and support informed for impactful changes |

## 16. Governance Rule

Release execution must align with `PROJECT_RULES.md`, `DEPLOYMENT.md`, `docs/INCIDENT_RESPONSE.md`, `docs/OBSERVABILITY_MONITORING.md`, `docs/QA_TESTING_ATLAS.md`, and `docs/CHANGE_CONTROL.md`.
