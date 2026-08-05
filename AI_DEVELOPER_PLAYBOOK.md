# AI Developer Playbook

## Purpose
This document is the permanent operating manual for AI-assisted development in the NaijaDeals repository. It replaces repeated governance prompts and defines the minimum workflow for every development session.

## Canonical Session Entry Documents
Future implementation sessions must begin by reading, in order:
1. `AI_DEVELOPER_PLAYBOOK.md`
2. `DEVELOPMENT_STATE.md`

Load additional documentation only if it is relevant to the authorized task.

## Repository and GitHub Workflow
- GitHub is the permanent source of truth.
- Work only from the approved repository and active branch.
- Do not recreate the project, duplicate repositories, or rebuild from scratch.
- At the start of every session:
  1. fetch all remotes
  2. pull the active branch
  3. verify the working tree is clean
  4. verify the current branch
  5. read `DEVELOPMENT_STATE.md`
- Continue only from the latest approved commit.

## Branch Strategy
- `main` is protected release history.
- Active implementation proceeds on the approved development branch.
- Use feature branches only when explicitly authorized.
- Never rewrite Git history.
- Never force push.

## Context Loading Rules
- Load only the documentation required for the current task.
- Load only the source code required for the current task.
- Do not rescan the whole repository unless one of the following is true:
  - repository structure changed
  - architecture changed
  - governance documents changed
  - new Stitch exports were added
  - explicit instruction was given
- Reuse prior indexed understanding whenever possible.

## Token Optimization Rules
- Prefer targeted file reads over whole-repository scans.
- Use headings, indexes, and referenced documents before deep reading.
- Re-index Stitch only when the asset set materially changes.
- Avoid reloading unchanged governance material in the same session.

## Architecture Authority
Authority order is fixed:
1. `ARCHITECTURE.md`
2. governing standards and atlases
3. approved implementation plan for the active phase
4. code

Architecture never follows implementation.

## Documentation Authority
Primary governance references include:
- `PROJECT_RULES.md`
- `ARCHITECTURE.md`
- `API_STANDARDS.md`
- `DATABASE_STANDARDS.md`
- `SECURITY.md`
- `INTEGRATION_GATEWAY.md`
- `AI_DEVELOPMENT_RULES.md`
- `docs/CHANGE_CONTROL.md`
- `docs/MILESTONE_1_IMPLEMENTATION_CHARTER.md`
- `docs/IMPLEMENTATION_READINESS_CHECKLIST.md`
- `docs/BLOCKER_LOG.md`
- phase-specific implementation plans such as `docs/IDENTITY_IMPLEMENTATION_PLAN.md`

Reference these documents instead of duplicating them.

## Implementation Discipline
Implementation order is mandatory:
Architecture -> Documentation -> Implementation Plan -> Code

Rules:
- work only on the currently authorized task
- implement incrementally
- do not add undocumented features
- do not modify approved work without documenting why
- if requirements are missing, ambiguous, or conflicting: stop and raise a blocker

## Quality Gates
After every logical feature or approved task slice, run:
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

Do not continue if quality gates fail.

## Testing Requirements
- follow `docs/QA_TESTING_ATLAS.md`
- preserve unit, integration, API, and security test expectations from the active implementation plan
- do not treat “builds locally” as proof of correctness
- record executed gates and remaining runtime validation gaps in session reporting

## Commit Policy
Every commit must include:
- clear message
- scope
- task reference

Guidelines:
- commit frequently
- keep changes reviewable
- do not accumulate large unreviewed edits

## Blocker Handling
If implementation conflicts with architecture or approved documentation:
- stop immediately
- create or update the blocker record in `docs/BLOCKER_LOG.md`
- include severity, classification, resolution path, and approval state
- wait for authorization before proceeding

## Stop Conditions
Stop work when any of the following occurs:
- architecture/documentation conflict
- unauthorized scope expansion is required
- quality gates fail
- required approval is missing
- runtime validation is required but unavailable for the current step

## Session Startup Checklist
- sync from GitHub
- verify branch
- verify clean working tree
- read `AI_DEVELOPER_PLAYBOOK.md`
- read `DEVELOPMENT_STATE.md`
- load only task-relevant docs
- load only task-relevant code
- confirm authorized task boundary

## Session Shutdown Checklist
At the end of every session:
1. update `DEVELOPMENT_STATE.md`
2. update `docs/SESSION_LOG.md`
3. update `docs/CHANGE_HISTORY.md` if a high-level milestone or governance change occurred
4. update `docs/BLOCKER_LOG.md` if applicable
5. run quality gates for the completed slice
6. commit changes
7. report completion and stop

## Session Output Format
End every session with:
1. Task Completed
2. Files Created
3. Files Modified
4. Tests Executed
5. Build Status
6. Git Commit Hash
7. `DEVELOPMENT_STATE.md` Updated
8. `docs/BLOCKER_LOG.md` Updated (if applicable)
9. Remaining Tasks
10. Recommended Next Step
