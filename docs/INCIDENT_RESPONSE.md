# INCIDENT RESPONSE

- **Documentation Baseline:** NaijaDeals Enterprise Documentation Baseline v1.0
- **Document Version:** v1.1
- **Status:** Remediated incident governance baseline

The incident framework defines how NaijaDeals detects, classifies, escalates, contains, recovers from, and validates incidents without improvising under pressure.

## 1. Incident Management Principles

- protect users, money, data, trust, and business continuity first
- prefer safe degradation over reckless partial recovery
- centralize communication and evidence during major incidents
- preserve auditability while restoring service
- isolate provider failures through the Integration Gateway where possible
- never trade financial correctness for cosmetic uptime

## 2. Severity Levels

| Severity | Definition | Required Response |
| --- | --- | --- |
| SEV-1 | critical platform outage, financial integrity risk, privilege breach, severe business continuity threat | immediate incident command, change freeze, executive escalation |
| SEV-2 | major degradation affecting critical workflows or a major shared service | urgent cross-functional response and monitored recovery |
| SEV-3 | partial degradation or contained provider failure with workaround | respond within service playbook window |
| SEV-4 | minor issue or low-risk anomaly | normal triage |

## 3. Escalation Rules

| Incident Class | Primary Responders | Mandatory Escalation |
| --- | --- | --- |
| Security / Privilege | Security, Super Admin, Platform | Compliance + Governance |
| Payment / Wallet / Escrow | Finance Platform, Wallet/Escrow Admin | Super Admin + Support |
| Notification / Messaging | Notifications owner or Messaging owner | Support + Ops when user-impacting |
| Search | Search owner | Product/Support if discovery impact is material |
| AI | AI Admin / AI Platform | Governance + Security when sensitive workflows affected |
| Data recovery / disaster | Platform Recovery owner | Super Admin + Security + Finance/Compliance as applicable |

## 4. Alert-to-Incident Rule

An alert becomes an incident when any of the following is true:

- SLO breach persists beyond service threshold
- financial correctness is uncertain
- privileged access is abused or unverifiable
- customer-critical notifications fail without approved fallback
- auth, wallet, escrow, or AI safety path becomes unreliable
- recovery requires manual privileged action or emergency access

## 5. Recovery Validation

No incident is considered resolved until the responsible owner records recovery validation covering:

- health checks green
- affected service SLIs back within operating threshold
- backlog, retries, and DLQ items classified and safe
- privileged action and audit streams intact
- user-impacting notifications confirmed or replay plan approved
- if financial/trust/security related, manual validation by the owning authority completed

## 6. Incident Types and Response Patterns

### Security / Privilege
- isolate access, rotate credentials, preserve evidence
- validate scope of exposure
- review emergency access or privileged changes

### Wallet / Escrow / Refund / Payout
- freeze unsafe mutations if integrity is uncertain
- validate idempotency and callback state
- reconcile authoritative records before resuming flow

### Notifications / Messaging
- classify missed/duplicated sends
- stop unsafe sends before replay
- require approval for replay of sensitive user-facing notifications

### Search
- assess index freshness and no-result impact
- use governed reindex path only
- audit privileged reindex execution

### AI
- disable risky capability through policy/feature control if needed
- route to fallback or manual review path
- audit sensitive-operation impact and blocked actions

## 7. Disaster Recovery

- restore identity, control planes, and financial correctness first
- search, analytics, and secondary AI layers may recover after core transactional systems
- validate RTO/RPO targets through drills and evidence, not optimism

## 8. Emergency Access Rule

Emergency access is an incident tool, not a convenience feature.

Requirements:
- authorized incident or recovery purpose
- time-bound scope
- mandatory audit event
- immediate governance/security notification
- post-incident review before closure

## 9. Post-Incident Review

Each SEV-1/2 incident and repeated SEV-3 incident requires:

- timeline of events
- root cause and contributing factors
- detection quality review
- recovery validation evidence
- privileged actions used during incident
- documentation, monitoring, testing, or process gaps

## 10. Governance Rule

No future incident runbook or operational implementation may ignore this document, `SECURITY.md`, `docs/OBSERVABILITY_MONITORING.md`, `docs/ADMIN_ATLAS.md`, `docs/MASTER_PERMISSION_MATRIX.md`, or `docs/QA_TESTING_ATLAS.md`.
