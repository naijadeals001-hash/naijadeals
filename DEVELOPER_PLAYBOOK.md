# NaijaDeals Developer Playbook

> The handbook every developer, contributor, and AI assistant reads before touching the NaijaDeals repository.
>
> This document is a first-tier engineering asset. It defines how we work, not why we exist. For governance authority, see `ARCHITECTURE.md`, `PROJECT_RULES.md`, and `AI_ENGINEERING_CONSTITUTION.md`.

---

## 1. Platform Mission Statement

The repository is no longer a collection of files. It is a governed software platform. Every implementation decision must improve maintainability, scalability, security, developer experience, and user experience. Stitch provides design intent, not implementation constraints. When the reference UI is insufficient, the engineering team is expected to design and build a superior production-ready solution while preserving the approved business workflows, architecture, and governance.

---

## 2. Project Overview

NaijaDeals is an enterprise super-ecosystem platform for commerce, logistics, finance, media, and services across Africa. It is built as a modular product-line architecture with a shared services backbone and a web-based frontend layer.

- **Primary stack:** Next.js, React, TypeScript, Tailwind CSS, Node.js, Prisma, PostgreSQL, Redis, Docker.
- **Repository structure:** Monorepo with `apps/`, `packages/`, `prisma/`, `docs/`, and `stitch/`.
- **Stitch policy:** `stitch/` is the official UI reference library. It is not the production frontend.
- **Governance authority:** `ARCHITECTURE.md` → `PROJECT_RULES.md` → `AI_ENGINEERING_CONSTITUTION.md` → playbooks → implementation plans → code → tests.

---

## 3. Repository Structure

| Path | Purpose |
| --- | --- |
| `apps/web` | Public consumer-facing Next.js application |
| `apps/admin` | Internal admin / back-office application |
| `apps/api` | Backend API gateway (if separated from web apps) |
| `apps/worker` | Background job workers and queue consumers |
| `packages/ui` | Shared React component library |
| `packages/shared` | Shared utilities, types, validation, and contracts |
| `packages/integrations` | Integration gateway adapters and clients |
| `packages/events` | Event definitions, schema, and bus helpers |
| `prisma/` | Prisma schema, migrations, and seed files |
| `stitch/` | UI reference library (HTML mockups, screenshots, navigation maps) |
| `docs/` | Architecture, implementation plans, decision logs, and atlases |
| `scripts/` | Local automation, seeding, and maintenance scripts |
| `docker-compose.yml` | Local PostgreSQL, Redis, and runtime services |
| `turbo.json` | Monorepo task pipeline |
| `tsconfig.base.json` | Shared TypeScript configuration |

---

## 4. Coding Standards

- **Language:** TypeScript everywhere. Strict mode enabled.
- **Style:** Follow `.editorconfig`, `prettier.config.mjs`, and `eslint.config.mjs`.
- **Principles:** SOLID, DRY, KISS, Clean Architecture, Hexagonal Architecture, Repository Pattern, Domain-Driven Design, Event-Driven Architecture where applicable.
- **Naming:**
  - `camelCase` for variables, functions, properties, and React hooks.
  - `PascalCase` for components, types, interfaces, classes, and enums.
  - `kebab-case` for file names and route paths.
  - `snake_case` for database tables, columns, and Prisma fields.
  - `SCREAMING_SNAKE_CASE` for environment variables and constants.
- **Comments:** Explain intent, not syntax. Keep comments current.
- **Dead code:** Delete, never comment out. Use Git history for archaeology.
- **Magic values:** Extract to named constants or configuration.
- **Imports:** Use absolute imports via package names or configured path aliases. No deep relative paths like `../../../../utils`.
- **Error handling:** Explicit. Never swallow errors. Use typed errors and standard error codes.

---

## 5. Build Process

The monorepo uses `turbo` with the following standard commands:

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start all development servers concurrently |
| `npm run build` | Build all packages and applications |
| `npm run lint` | Run ESLint across the monorepo |
| `npm run typecheck` | Run TypeScript type checks |
| `npm run test` | Run unit and integration tests with Vitest |
| `npm run format` | Run Prettier formatting |
| `npm run db:migrate` | Apply Prisma migrations locally |
| `npm run db:seed` | Seed local development database |

Build must pass before a commit is considered complete. See `turbo.json` for task dependencies and caching rules.

---

## 6. Testing

Testing is mandatory. Every code change that ships must be accompanied by tests appropriate to its scope.

- **Unit tests:** Business logic, utilities, and pure functions.
- **Integration tests:** API routes, repository methods, and service interactions.
- **End-to-end tests:** Critical user journeys (authentication, checkout, listing creation, payouts).
- **Security tests:** Authorization boundaries, input validation, injection resistance.
- **Accessibility tests:** Keyboard navigation, screen reader labels, color contrast.
- **Performance tests:** Load testing for high-traffic paths.

Do not treat “builds locally” as proof of correctness. Test behavior, not compilation. Follow `docs/QA_TESTING_ATLAS.md` for detailed guidance.

---

## 7. Debugging

- **Local logs:** Use structured JSON logs in development. The backend must log `correlationId`, `actor`, `action`, `result`, and `error`.
- **Error boundaries:** React error boundaries catch frontend errors and report to monitoring.
- **API errors:** Return consistent structured error payloads. See `API_STANDARDS.md`.
- **Tracing:** Attach a `correlation-id` to every request and propagate through event bus and downstream calls.
- **Database:** Use `npx prisma studio` to inspect local data during development.
- **Redis:** Use `redis-cli` or a GUI client connected to the local Redis container.
- **Breakpoints:** Use VS Code or the preferred IDE debugger against the Node.js process.
- **Never:** leave `console.log` in production code. Use the approved logging abstraction instead.

---

## 8. Deployment

Deployment is governed by `DEPLOYMENT.md`. At a high level:

- **Environments:** local → shared development → staging → production.
- **Containers:** Every runtime service is containerized.
- **CI/CD:** Lint, typecheck, test, build, security scan, artifact promotion, and controlled deployment approvals.
- **Release-safe migrations:** Database migrations run before dependent code is promoted.
- **Monitoring:** Structured logs, health metrics, distributed tracing, and alerts.

Local development uses Docker Compose for PostgreSQL and Redis. See `docker-compose.yml` for service definitions.

---

## 9. Commits

Use conventional commits:

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation change
- `test:` test change
- `refactor:` code change that neither fixes a bug nor adds a feature
- `chore:` tooling, dependency, or maintenance change
- `security:` security fix or hardening
- `perf:` performance improvement

Commit format:

```text
feat(identity): add password reset token repository

- Implements token repository with expiration
- Adds integration tests for happy path and expiry
- Closes task M1-P1-IDENTITY-004
```

Rules:
- Commit frequently.
- Keep commits reviewable and focused.
- Reference task IDs when available.
- Never commit secrets, `.env` files, or generated build artifacts.

---

## 10. Pull Requests

A pull request must include:

- **Title:** Conventional format, e.g., `feat(identity): password reset token repository`
- **Description:** What changed, why, how to test, and any risks.
- **Linked plan:** Reference the implementation plan or task ID.
- **Screenshots:** For UI changes, include before/after when applicable.
- **Checklist:** Build, lint, typecheck, tests, documentation updates, and security review.

Rules:
- All quality gates must pass before requesting review.
- Code reviews are mandatory.
- Address review feedback in new commits or rebased fixups only after agreement.
- Do not merge your own PR without an approved review.

---

## 11. Review Process

Reviews evaluate:

- Correctness and test coverage
- Architecture and standards compliance
- Security and performance implications
- Maintainability and readability
- Documentation updates
- Scope discipline (no scope creep)

Reviewers may:
- Approve
- Request changes
- Block merge for unresolved risks

A reviewer must understand the linked plan before approving implementation changes.

---

## 12. Release Process

Releases follow `RELEASE_PLAYBOOK.md`. Summary:

1. Feature freeze on the approved release branch.
2. Cut a release candidate (RC) tag.
3. QA and stakeholder validation on staging.
4. Document release notes and rollback plan.
5. Approval to deploy to production.
6. Deploy production tag.
7. Post-release monitoring and verification.

Only tagged, approved releases reach production. No direct deployments from unreviewed feature branches.

---

## 13. Session Workflow for Contributors

1. Pull the latest changes from the active branch.
2. Read `DEVELOPMENT_STATE.md`.
3. Read the relevant playbook and implementation plan for the task.
4. Load only the code and documentation relevant to the task.
5. Implement incrementally.
6. Test locally.
7. Run quality gates.
8. Commit and push.
9. Update `DEVELOPMENT_STATE.md`, `docs/SESSION_LOG.md`, and `docs/CHANGE_HISTORY.md` if required.
10. Report completion and stop at the defined boundary.

---

## 14. Stop Conditions

Stop immediately and raise a blocker if any of the following occurs:

- Architecture or governance conflict.
- Schema change without an approved migration plan.
- New API without specification or OpenAPI documentation.
- Scope expansion beyond the current authorized task.
- Security issue or exposed secret.
- Unknown requirement with no documented resolution.
- Dependency that is missing or unapproved.
- Conflict with a previously approved decision.

See `docs/BLOCKER_LOG.md` for blocker format and escalation rules.

---

## 15. Definition of Done

A task is not done until:

- The code is implemented and tested.
- All quality gates pass: `build`, `lint`, `typecheck`, `test`.
- Documentation is updated if the change affects architecture, API, database, or workflow.
- Code review is approved.
- `DEVELOPMENT_STATE.md` is current.
- `docs/SESSION_LOG.md` records the session.
- Changes are committed and pushed to the active branch.

---

## 16. Cross-References

- `ARCHITECTURE.md` — platform philosophy and topology
- `PROJECT_RULES.md` — mandatory engineering rules
- `AI_ENGINEERING_CONSTITUTION.md` — AI-specific authority and behavior
- `AI_DEVELOPER_PLAYBOOK.md` — AI assistant session workflow
- `API_STANDARDS.md` — REST API conventions
- `DATABASE_STANDARDS.md` — database discipline
- `SECURITY.md` — security, auth, and audit rules
- `INTEGRATION_GATEWAY.md` — adapter and provider rules
- `DEPLOYMENT.md` — deployment model
- `docs/QA_TESTING_ATLAS.md` — testing standards
- `docs/CHANGE_CONTROL.md` — change request process
- `docs/SESSION_LOG.md` — session log
- `docs/BLOCKER_LOG.md` — blocker tracking
