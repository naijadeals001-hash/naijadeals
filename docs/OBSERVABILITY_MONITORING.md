# OBSERVABILITY MONITORING

- **Documentation Baseline:** NaijaDeals Enterprise Documentation Baseline v1.0
- **Document Version:** v1.1
- **Status:** Remediated observability governance baseline

Observability is the platform nervous system. If NaijaDeals cannot see health, risk, cost, latency, and failure signals across shared services and modules, it cannot safely scale.

## 1. Observability Principles

- every critical workflow must emit useful signals
- logs, metrics, traces, and audit events complement each other; they are not substitutes
- dashboards must help humans decide, not just decorate a monitor wall
- alerting should prefer signal over noise
- all third-party dependencies must be observable through the Integration Gateway
- recovery is not complete until validation evidence exists

## 2. Required Health Checks

| Check Type | Required For |
| --- | --- |
| Liveness | all runtime services |
| Readiness | all runtime services and workers |
| Dependency health | database, queue/event transport, redis, search, storage, adapter/provider connectivity |
| Auth probe | token validation and session path health |
| Financial safety probe | wallet/escrow mutation guardrails and critical dependency reachability |
| Notification dispatch probe | template access, provider routing, preference engine health |
| Search freshness probe | indexing lag / freshness |
| AI safety probe | provider reachability, policy service health, router health |

## 3. SLI / SLO Governance

| Service Domain | Primary SLIs | Target SLO Guidance | Owner |
| --- | --- | --- | --- |
| Identity / Auth | login success rate, token validation latency, MFA success rate | high availability, low auth error rate, predictable p95 latency | Platform / Identity owner |
| Wallet / Ledger | transaction success rate, reconciliation drift rate, payout completion rate | correctness-first; error budget near zero for integrity failures | Finance + Platform owner |
| Escrow | hold/release success rate, dispute workflow success rate | no silent state corruption; low failure tolerance | Finance/Trust + Platform owner |
| Notifications | delivery success rate by channel, retry exhaustion rate, preference-resolution error rate | high success for transactional/security notifications | Notifications owner |
| Messaging | send success rate, attachment failure rate, escalation lag | reliable user/operator communication | Messaging owner |
| Search | query latency, index freshness, no-result rate, failed indexing rate | fast query behavior and bounded freshness lag | Search owner |
| AI | successful routed requests, fallback rate, policy block rate, cost per capability | bounded latency/cost with safe fallback | AI owner |
| Admin / Privileged Ops | privileged action success rate, approval latency, audit completeness rate | zero unaudited privileged mutations | Admin/Governance owner |

## 4. Alert Threshold and Escalation Model

| Alert Tier | Trigger Pattern | Initial Owner | Escalation Rule |
| --- | --- | --- | --- |
| Critical | outage, financial integrity risk, privilege breach, data-loss risk, auth collapse | on-call owner + incident commander | immediate SEV-1/2 escalation |
| High | sustained error spikes, queue lag threshold breach, payout/escrow failures, failed notification critical-path delivery | service owner | escalate within defined on-call window |
| Medium | indexing degradation, non-critical provider failures, elevated retries, rising bounce/failure rates | service owner | escalate if not restored within service playbook window |
| Low | drift, noise, non-blocking anomalies | owning team | backlog or tune threshold |

## 5. Monitoring Ownership

| Domain | Primary Owner | Secondary Owner |
| --- | --- | --- |
| Identity / Auth | Platform / Identity | Security |
| Wallet / Escrow | Finance Platform | Security / Support |
| Notifications / Messaging | Customer Communications owner | Support / Ops |
| Search | Search owner | Product / Support |
| AI | AI Platform owner | Governance / Security |
| Admin / Privileged Actions | Super Admin / Governance | Security / Platform |
| Integration Gateway | Platform / Integration owner | affected domain owner |

## 6. Recovery Validation

Recovery is incomplete until validation confirms:

- health checks are passing
- key SLIs are back within tolerated thresholds
- queued retries or DLQ backlog are understood and governed
- privileged action/audit streams remain intact
- wallet, escrow, notification, and auth critical workflows are smoke-validated
- post-recovery communication is complete for impacted stakeholders

## 7. Monitoring by Shared Service

### Identity / Authentication
- login success/failure
- MFA errors
- session anomalies
- token validation failure spikes

### Wallet / Payments / Escrow
- ledger error rate
- payout failure rate
- settlement mismatches
- release/dispute anomalies
- privileged finance action audit completeness

### Messaging / Notifications
- delivery rates
- escalation backlog
- template failures
- suppression / preference anomalies
- replay and fallback visibility

### Search
- index lag
- no-result spikes
- query latency
- relevance complaints / feedback trends
- reindex job failures

### AI
- provider latency
- fallback rate
- policy violations
- token cost and cache hit rates
- human-review queue size for sensitive AI operations

## 8. Governance Rule

Observability implementation must align with `SECURITY.md`, `DEPLOYMENT.md`, `docs/INCIDENT_RESPONSE.md`, `docs/ADMIN_ATLAS.md`, `docs/MASTER_PERMISSION_MATRIX.md`, and `docs/QA_TESTING_ATLAS.md`.
