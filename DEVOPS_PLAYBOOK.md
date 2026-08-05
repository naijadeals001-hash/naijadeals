# NaijaDeals DevOps Playbook

> This document defines how the NaijaDeals platform is built, deployed, operated, monitored, and recovered. It is the operational backbone of the engineering practice.
>
> For high-level deployment strategy, see `DEPLOYMENT.md`. For environment variables, see `ENVIRONMENT_VARIABLES.md`. For release process, see `RELEASE_PLAYBOOK.md`. For incident response, see `docs/INCIDENT_RESPONSE.md` and `docs/OBSERVABILITY_MONITORING.md`.

---

## 1. DevOps Philosophy

- **Infrastructure as code.** Every environment, service, and pipeline is described in version-controlled configuration.
- **Parity across environments.** Local, development, staging, and production should be as identical as practical.
- **Automate everything repeatable.** Builds, tests, deployments, scaling, backups, and recovery are automated.
- **Security by default.** Secrets are never in code. Least privilege is enforced. Access is audited.
- **Observable systems.** Metrics, logs, traces, and alerts are built in, not bolted on.
- **Recoverable systems.** Backups, rollback, and disaster recovery are tested and documented.

---

## 2. Technology Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Containerization | Docker | Runtime parity and packaging |
| Orchestration | Docker Compose (local) / Kubernetes or cloud orchestration (production) | Service scheduling and scaling |
| CI/CD | GitHub Actions | Lint, typecheck, test, build, security scan, deploy |
| Source control | Git / GitHub | Code, configuration, and documentation |
| Secrets | GitHub Secrets / secret manager / Vault | Secret storage and rotation |
| Database | PostgreSQL (primary) / Redis (cache, queues) | Data and transient state |
| Object storage | Cloud provider S3-compatible | Files and assets |
| CDN / WAF / DNS | Cloudflare | Edge caching, security, SSL, DNS |
| Monitoring | Sentry, Prometheus/Grafana, or cloud provider monitoring | Errors, metrics, logs, traces |
| Alerting | PagerDuty / Opsgenie / cloud provider alerts | Incident notification |

---

## 3. Docker

- **Containerize every runtime service.** web, admin, api, worker, scheduler, ingestion, search, analytics.
- **Immutable images:** Build once, promote the same image across environments.
- **Multi-stage builds:** Separate build and runtime stages to minimize image size and attack surface.
- **Base images:** Use minimal, patched, approved base images (e.g., Node.js LTS Alpine or Distroless).
- **No secrets in images.** Secrets are injected at runtime via environment variables or secret mounts.
- **Health checks:** Every container exposes a `/health` endpoint and a readiness check.
- **Local compose:** `docker-compose.yml` defines PostgreSQL, Redis, and runtime services for local development.
- **Non-root user:** Containers run as a non-root user.

---

## 4. CI/CD

### Continuous Integration (CI)

Every pull request and merge to the active branch triggers:

1. **Dependency install** — deterministic install via `package-lock.json`.
2. **Lint** — ESLint and Prettier checks.
3. **Typecheck** — TypeScript type checking.
4. **Unit tests** — Vitest test suite.
5. **Integration tests** — Database-backed tests where applicable.
6. **Security scan** — Dependency audit, secret scan, and static analysis.
7. **Build** — Build all packages and applications.
8. **Artifact provenance** — Tag image/build with commit hash and branch.

### Continuous Deployment (CD)

- **Controlled promotion:** Build artifact → shared development → staging → production.
- **Approval gates:** Staging and production deployments require explicit approval.
- **Deployment strategy:** Rolling or blue/green for stateless services. Database migrations run before code promotion.
- **Canary releases:** High-risk services use canary rollout or feature flag gating.
- **Rollback:** One-click rollback to the last known good artifact.
- **No direct production deployments from unreviewed branches.**

---

## 5. Secrets

- **No secrets in source code.** Ever.
- **Local secrets:** `.env` or `.env.local` files, never committed. Use `.env.example` as a template.
- **CI secrets:** GitHub Secrets or equivalent secret store.
- **Runtime secrets:** Injected by orchestration layer or secret manager.
- **Rotation:** Rotate database credentials, API keys, JWT signing keys, and provider secrets on a defined schedule.
- **Least privilege:** Each service receives only the secrets it requires.
- **Encryption:** Secrets at rest are encrypted by the secret manager. Secrets in transit use TLS.
- **Audit:** Log secret access and rotation events.

See `ENVIRONMENT_VARIABLES.md` for the full variable catalog.

---

## 6. Environments

| Environment | Purpose | Data | Access |
| --- | --- | --- | --- |
| local | Developer workstation | Ephemeral, seeded | Developer only |
| shared development | Shared integration testing | Synthetic, controlled | Engineering team |
| staging | Pre-release validation | Production-like anonymized | Engineering + QA + stakeholders |
| production | Live platform | Real user data | Restricted, audited |

Environment rules:
- Distinct secrets per environment.
- Distinct databases and storage where appropriate.
- No production secrets in non-production environments.
- Controlled seed data; no production data in development or staging without anonymization.
- Environment configuration is explicit and validated at startup.

---

## 7. Logging

- **Structured JSON logs** from every service.
- **Required fields:** `timestamp`, `level`, `service`, `environment`, `correlationId`, `actorId`, `message`, `action`, `result`, `error`.
- **Log aggregation:** Centralized collector (e.g., Datadog, Grafana Loki, CloudWatch Logs).
- **Log retention:** Retain according to compliance and operational needs. Audit logs retained per `AUDIT_LOG_RETENTION_DAYS`.
- **Sensitive data redaction:** Automatically redact tokens, passwords, full PANs, and unredacted PII.
- **Log levels:** `debug`, `info`, `warn`, `error`, `fatal`. Production default is `info`.
- **No debug logs in production** unless explicitly enabled for a short investigation.

---

## 8. Monitoring

- **Health checks:** `/health` and `/ready` endpoints on every service.
- **Metrics:** Request rate, latency, error rate, saturation (RED method), queue depth, worker throughput, database connections, cache hit rate.
- **Dashboards:** Service-level, domain-level, and business-level dashboards.
- **Alerting thresholds:**
  - Error rate spike > defined threshold
  - P95 latency > defined threshold
  - Queue lag > defined threshold
  - Database connection pool exhaustion
  - Payout failure rate spike
  - Search degradation
  - AI budget anomaly
  - Failed login rate spike
- **On-call:** Defined escalation policy and incident command chain.

See `docs/OBSERVABILITY_MONITORING.md` for detailed monitoring rules.

---

## 9. Backups

- **Database backups:** Scheduled, encrypted, tested. Point-in-time recovery where supported.
- **Object storage backups:** Cross-region replication or lifecycle policies for durability.
- **Configuration backups:** Version-controlled infrastructure and configuration state.
- **Secret backups:** Encrypted backups of secret manager state for disaster recovery.
- **Backup frequency:** Defined per environment and data criticality. Production at least daily with transaction logs for point-in-time recovery.
- **Backup testing:** Restore from backup at least quarterly in a non-production environment.
- **RPO / RTO:** Define and document Recovery Point Objective and Recovery Time Objective per domain.

---

## 10. Rollback

- **Application rollback:** Revert to the previous healthy artifact. Stateless services roll back quickly; stateful services require coordination.
- **Database rollback:** Forward-only migration strategy with compensating migrations. Never roll back a deployed migration without an approved plan.
- **Configuration rollback:** Feature flags and environment settings are versioned; revert via configuration change.
- **Integration provider rollback:** Switch to a fallback provider through the Integration Gateway.
- **Rollback decision:** Made by the on-call engineer or incident commander. Documented and reviewed post-incident.

---

## 11. Recovery

- **Incident command chain:** Defined in `docs/INCIDENT_RESPONSE.md`.
- **Disaster recovery plan:** Documented per environment and per critical domain.
- **Fallback providers:** Use the Integration Gateway to switch to secondary providers.
- **Degraded-mode operation:** Plan for reduced functionality during outages (e.g., read-only catalog, queued payouts, cached search).
- **Recovery drills:** Execute tabletop and live recovery exercises quarterly.
- **Post-incident review:** Every significant incident produces a blameless postmortem with action items.

---

## 12. Scaling

- **Horizontal scaling:** Stateless services scale horizontally behind a load balancer.
- **Worker scaling:** Queue consumers scale based on queue depth and processing latency.
- **Database scaling:** Read replicas for read-heavy paths; vertical scaling for write-heavy paths; partitioning and sharding for extreme scale.
- **Cache scaling:** Redis cluster or managed cache service with appropriate eviction policies.
- **Search scaling:** Search cluster grows with index size and query volume.
- **Autoscaling:** Define CPU, memory, and request-based autoscaling policies.
- **Cost optimization:** Right-size instances, use spot/preemptible where appropriate, and monitor cloud spend.

---

## 13. Edge and Perimeter

- **Cloudflare-managed:** DNS, SSL/TLS, caching, WAF, rate limiting, and DDoS protection.
- **API gateway:** Centralized authentication, rate limiting, request routing, and logging at the edge.
- **Origin hardening:** Restrict direct origin access to approved edge IPs and private networks where possible.
- **Bot management:** Protect public endpoints from abuse and automated attacks.
- **Geographic controls:** Enforce data residency and access controls where required by compliance.

---

## 14. Local Development Operations

```bash
# Start infrastructure
docker compose up -d

# Install dependencies
npm install

# Apply migrations and seed
npm run db:migrate
npm run db:seed

# Start development servers
npm run dev

# Run quality gates
npm run lint
npm run typecheck
npm run test
npm run build
```

---

## 15. Definition of Done for DevOps Changes

A DevOps or operational change is not done until:

- Infrastructure or pipeline changes are in version control.
- Changes are tested in a non-production environment.
- Secrets are managed and rotated correctly.
- Monitoring and alerting are updated.
- Runbooks are updated.
- Rollback and recovery procedures are documented.
- Documentation in this playbook is updated.
- Change is reviewed and approved.

---

## 16. Cross-References

- `DEPLOYMENT.md` — deployment model and strategy
- `ENVIRONMENT_VARIABLES.md` — environment variable catalog
- `RELEASE_PLAYBOOK.md` — release process
- `docs/INCIDENT_RESPONSE.md` — incident response process
- `docs/OBSERVABILITY_MONITORING.md` — monitoring and observability
- `SECURITY.md` — security, secrets, and encryption
- `INTEGRATION_GATEWAY.md` — provider fallback and adapter rules
- `SHARED_SERVICES_PLAYBOOK.md` — shared services operations
