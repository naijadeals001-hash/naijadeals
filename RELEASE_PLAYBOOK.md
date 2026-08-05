# NaijaDeals Release Playbook

> The authoritative process for releasing NaijaDeals platform changes to staging and production.
>
> This document is a first-tier engineering asset. It governs how the governed software platform moves forward safely. For broader engineering rules, see `DEVELOPER_PLAYBOOK.md`, `PROJECT_RULES.md`, and `ARCHITECTURE.md`.

---

## 1. Release Philosophy

NaijaDeals releases are deliberate, repeatable, and reversible. No unreviewed code reaches production. No release happens without a rollback plan. Every release is a tagged, documented event with clear ownership.

Releases are not celebrations of completion; they are controlled transitions of a financial, trust, and user-impact platform into the next known-good state.

---

## 2. Release Types

| Type | When | Trigger | Artifact |
| --- | --- | --- | --- |
| **Standard Release** | Approved milestone completion | Release manager cuts an RC from release branch | SemVer tag, release notes, rollback plan |
| **Hotfix Release** | Production defect requiring urgent remediation | Emergency patch branch from production tag | Hotfix tag, incident reference, accelerated QA |
| **Patch Release** | Low-risk bug fix or security hardening | Patch branch from release branch | Patch tag, focused release notes |
| **Rollback** | Release causes critical regression or financial risk | On-call or release manager invokes rollback plan | Restored previous production tag + incident record |

---

## 3. Release Cadence

- **Version 1.0:** milestone-bound, not calendar-bound. Releases happen when Milestone 1 quality gates are met.
- **Version 2.0+:** quarterly release trains once platform stability is proven, with monthly patch windows.
- **Hotfixes:** any time, with incident commander approval and post-release review.
- **No night or weekend deployments** unless pre-authorized and fully staffed for rollback.

---

## 4. Versioning

Use [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`):

| Segment | Meaning for NaijaDeals |
| --- | --- |
| **MAJOR** | Breaking API or data-model changes; product-line rearchitecture; requires migration or user action |
| **MINOR** | New features, modules, or significant capabilities; backward compatible within major line |
| **PATCH** | Bug fixes, security patches, performance improvements, documentation corrections |

Pre-release tags:

- `v1.2.0-rc.1` — first release candidate
- `v1.2.0-rc.2` — second release candidate after fixes
- `v1.2.0` — approved production release
- `v1.2.1-hotfix.1` — emergency hotfix on v1.2.1

All tags are signed where possible and pushed to the canonical GitHub repository.

---

## 5. Release Branch Model

- `main` — always deployable; represents production truth.
- `release/vX.Y.Z` — release branch cut from `main` at feature freeze.
- `hotfix/vX.Y.Z-h` — hotfix branch cut from the current production tag.
- `feature/*` — individual feature branches; never deployed directly to production.

---

## 6. Release Lifecycle

### 6.1 Feature Freeze

1. Release manager announces feature freeze for the target release.
2. No new feature work enters the release branch after freeze except release-blocking fixes.
3. All incomplete features are removed from the release branch or behind feature flags and documented as excluded.
4. The release branch is cut: `release/vX.Y.Z` from `main`.
5. `DEVELOPMENT_STATE.md` is updated to reflect the release branch and freeze status.

### 6.2 Release Candidate (RC)

1. Release manager creates an RC tag from the release branch: `git tag -s vX.Y.Z-rc.1`.
2. CI runs the full quality gate suite on the RC.
3. QA executes the release test plan against the RC in the staging environment.
4. Security and compliance review any changes touching authentication, wallet, escrow, audit, RBAC, or AI.
5. Stakeholders validate user-facing changes against business acceptance criteria.
6. If issues are found, fixes are cherry-picked into the release branch and a new RC is cut.

### 6.3 QA and Validation Gates

The RC must pass all of the following before production approval:

- [ ] Build passes (`npm run build`)
- [ ] Lint passes (`npm run lint`)
- [ ] Typecheck passes (`npm run typecheck`)
- [ ] Tests pass (`npm run test`)
- [ ] Security scan passes (secrets, dependencies, known vulnerabilities)
- [ ] Database migration dry-run succeeds in staging
- [ ] API contract tests pass against RC
- [ ] End-to-end smoke tests pass for critical user journeys
- [ ] Rollback procedure tested or documented as executable
- [ ] Release notes reviewed and approved
- [ ] Rollback plan reviewed and approved
- [ ] Monitoring and alerting verified for new/changed components

### 6.4 Approval

The release requires sign-off from:

- Release manager
- Engineering lead or delegate
- QA lead or delegate
- Security or compliance reviewer (for high-risk changes)
- Product owner (for user-facing changes)

Approval is recorded in the release notes and in the release tracking issue.

### 6.5 Deployment

1. Confirm the target production tag: `vX.Y.Z`.
2. Apply database migrations in a maintenance window if needed, with rollback scripts ready.
3. Deploy the tagged artifact through the approved CI/CD pipeline.
4. Verify health checks, smoke tests, and critical business flows in production.
5. Monitor error rates, latency, queue depths, and wallet/escrow event flows for at least 30 minutes.
6. Announce release completion to stakeholders.

### 6.6 Post-Release

1. Merge the release branch back into `main` if not already fast-forwarded.
2. Tag `main` with the release version: `git tag -s vX.Y.Z`.
3. Update `DEVELOPMENT_STATE.md`, `CHANGELOG.md`, and `ROADMAP.md`.
4. Close the release tracking issue and record any follow-up items.
5. Schedule a post-release review if any incident or significant issue occurred.

---

## 7. Rollback Plan

Every release must have an explicit rollback plan before deployment.

### 7.1 Rollback Triggers

Rollback may be invoked when any of the following is observed after deployment:

- Critical error rate increase that cannot be resolved quickly.
- Financial transaction integrity issue (wallet, escrow, payouts).
- Authentication or authorization failure at scale.
- Data corruption or loss.
- Security incident linked to the release.
- Regulatory or compliance violation.
- User experience degradation exceeding defined SLO thresholds.

### 7.2 Rollback Procedure

1. **Stop the release.** Mark the release as bad in release tracking.
2. **Notify stakeholders.** Alert on-call, engineering lead, product owner, and incident commander if active.
3. **Evaluate rollback vs. forward fix.** Choose rollback when a fix cannot be safely deployed faster than restoring the previous known-good state.
4. **Execute database rollback or forward migration if safe.** Roll back schema only if a tested rollback script exists. Otherwise, forward-fix schema and disable offending code paths.
5. **Deploy the previous production tag.** Use CI/CD or documented manual procedure to restore the last approved tag.
6. **Verify health.** Run smoke tests and monitor critical flows.
7. **Document the incident.** Update `docs/INCIDENT_LOG.md` and `docs/SESSION_LOG.md` if applicable.
8. **Post-mortem.** Schedule a review within 48 hours for any rollback triggered by a production defect.

### 7.3 Rollback Time Targets

| Environment | Target Rollback Time |
| --- | --- |
| Staging | 10 minutes |
| Production | 30 minutes |

---

## 8. Hotfix Process

Hotfixes bypass the normal release train to address production-critical issues.

1. Cut `hotfix/vX.Y.Z-h` from the current production tag.
2. Apply the minimal fix and any required tests.
3. Run full quality gates on the hotfix branch.
4. Review by at least two engineers; one must be senior or staff level.
5. Deploy through the accelerated hotfix pipeline to staging first.
6. Validate in staging against the production-like defect scenario.
7. Deploy to production with incident commander approval.
8. Merge the hotfix branch back into `main` and the current release branch.
9. Tag the release and document the hotfix in release notes.

Hotfixes are not an excuse to skip review. They are a compressed review path for verified, minimal fixes.

---

## 9. Release Notes

Release notes are mandatory and must include:

- Version and date
- Summary of the release
- New features
- Improvements
- Bug fixes
- Security changes
- Breaking changes (with migration notes)
- Known issues and limitations
- Rollback summary
- Contributors and reviewers
- Link to the release tag and tracking issue

Release notes live in `CHANGELOG.md` and in the GitHub release description.

---

## 10. Release Communication

| Audience | Communication |
| --- | --- |
| Engineering | Release branch cut, RC availability, deployment window |
| QA | RC test plan, staging validation window, sign-off deadline |
| Product / Business | Feature availability, user-facing changes, acceptance window |
| Operations | Deployment window, monitoring focus, rollback plan |
| Security/Compliance | High-risk changes, review requirements, sign-off status |
| Users | In-app notices, status page updates, or release announcements as appropriate |

---

## 11. Release Environments

| Environment | Purpose | Data |
| --- | --- | --- |
| Local | Developer iteration | Synthetic / seeded |
| Shared Development | Integration testing | Synthetic |
| Staging | Pre-release validation | Anonymized production-like |
| Production | Live user traffic | Real user data |

Releases progress through environments in order. No environment may be skipped except under documented emergency procedure.

---

## 12. Definition of Release Readiness

A release is ready for production only when:

- The release branch is frozen and stable.
- An RC has passed all QA and validation gates.
- Release notes are complete and approved.
- A rollback plan exists and has been reviewed.
- Required approvals are recorded.
- Monitoring and alerting are in place for changed components.
- Database migrations are tested and reversible or forward-fixable.
- The deployment pipeline is green and artifact is promoted.

---

## 13. Roles and Responsibilities

| Role | Responsibility |
| --- | --- |
| **Release Manager** | Owns the release schedule, branch, RC, release notes, and go/no-go decision |
| **Engineering Lead** | Approves technical readiness and rollback plan |
| **QA Lead** | Owns test plan and validation sign-off |
| **Security / Compliance** | Reviews high-risk changes and signs off where required |
| **Product Owner** | Validates business acceptance and user-facing changes |
| **On-Call Engineer** | Executes rollback if needed and monitors post-release health |

---

## 14. Cross-References

- `DEVELOPER_PLAYBOOK.md` — commits, PRs, review process, quality gates
- `DEVOPS_PLAYBOOK.md` — CI/CD, Docker, environments, monitoring, rollback infrastructure
- `DEPLOYMENT.md` — deployment model and infrastructure topology
- `PROJECT_RULES.md` — mandatory engineering rules, including no production fiction
- `ARCHITECTURE.md` — platform topology and event-driven governance
- `docs/CHANGE_CONTROL.md` — change request and scope approval process
- `docs/INCIDENT_LOG.md` — incident and rollback record
- `docs/QA_TESTING_ATLAS.md` — testing standards and release test plans
