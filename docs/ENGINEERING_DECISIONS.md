# Engineering Decisions

This document records approved engineering decisions that materially affect implementation.

| Decision ID | Date | Decision | Reason | Alternatives Considered | Impact | Approval Status |
| --- | --- | --- | --- | --- | --- | --- |
| ED-001 | 2026-08-03 | Use case-insensitive email handling via normalized lowercase persistence and database-level lower/email uniqueness enforcement | Prevent duplicate identities caused by email casing differences | Case-sensitive uniqueness; application-only normalization | Affects user identity persistence, uniqueness checks, and registration/login safety | Approved |
| ED-002 | 2026-08-03 | Allow only one OAuth account per provider per user | Keep provider linkage deterministic and avoid account ambiguity | Multiple accounts per provider per user | Affects provider account model, repository logic, and identity governance | Approved |
| ED-003 | 2026-08-04 | GitHub repository is the permanent source of truth | Eliminate drift between chat state, local scratch work, and the official codebase | Local-only continuation; duplicate repositories | All future sessions must begin from the repository and active branch state | Approved |
| ED-004 | 2026-08-03 | Implement work incrementally with mandatory quality gates and frequent commits | Reduce risk, isolate regressions, and preserve traceability | Large batch implementation before validation | Affects daily execution workflow and reviewability | Approved |
| ED-005 | 2026-08-03 | Architecture and documentation must precede implementation | Prevent unauthorized redesign and costly rework | Code-first interpretation | Affects scope control, blocker handling, and design authority | Approved |
| ED-006 | 2026-08-04 | Future AI-assisted sessions must start by reading `AI_DEVELOPER_PLAYBOOK.md` and `DEVELOPMENT_STATE.md` before loading any other context | Replace long governance prompts with repository-native operating guidance | Repeating governance in chat; broad repository rescans each session | Standardizes startup workflow and reduces token waste | Approved |
