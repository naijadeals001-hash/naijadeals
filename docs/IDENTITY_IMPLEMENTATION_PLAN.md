# NAIJADEALS SUPER ECOSYSTEM
# PHASE 1.1 — IDENTITY IMPLEMENTATION PLAN

**Document Status:** Final pre-implementation plan  
**Phase:** Milestone 1 / Phase 1.1 — Identity & Authentication Foundation  
**Plan Date:** 2026-08-03  
**Implementation Status:** Planning only — no code in this document  
**Boundary Rule:** This document defines implementation intent only. It does not authorize expansion into future milestones.

---

## Objectives

1. Establish the first production-grade **Identity & Authentication Foundation** on top of the approved Milestone 1.0 Platform Foundation.
2. Introduce a **centralized canonical Identity domain** for users, authentication, sessions, and RBAC.
3. Implement support for **email/password authentication**, **Google OAuth**, **JWT access control**, and **refresh session lifecycle management**.
4. Define a durable **user, session, role, permission, and audit model** that future modules can consume without re-implementing identity concerns.
5. Ensure all sensitive identity operations are **observable, auditable, rate-limited, and event-publishing**.
6. Publish identity events in a way that remains compatible with future integrations such as Notification, Wallet, Escrow, Admin, and Aura AI.
7. Preserve strict milestone discipline by implementing only what belongs inside Phase 1.1.

---

## Scope

Phase 1.1 includes planning and later implementation of the following:

- canonical `User` identity model
- local email/password registration and login
- Google OAuth login through the Integration Gateway abstraction boundary
- JWT access tokens
- refresh token / session rotation and revocation
- email verification token issuance and confirmation
- password reset token issuance and confirmation
- RBAC role and permission foundation
- protected current-user and session-management endpoints
- Prisma/PostgreSQL schema additions for identity
- Redis-backed transient auth support for:
  - rate limiting
  - OAuth state / nonce protection
  - login throttle state
- outbox-based event publication for identity domain events
- audit classification rules for identity operations
- web authentication screens for registration, login, verification, password reset, and Google callback handling
- test strategy for identity domain behavior, API validation, security, and regression protection

---

## Out of Scope

The following remain explicitly out of scope for Phase 1.1:

- Notification delivery implementation
- SMS delivery implementation
- email delivery infrastructure
- Wallet creation or wallet onboarding
- Escrow integration
- Aura AI scoring, moderation, or automation
- Admin dashboards, admin UI, or privileged management workflows
- commerce modules
- messaging modules
- search modules
- analytics dashboards
- organization / tenant business workflows
- device registration workflows
- MFA / 2FA
- KYC
- profile enrichment beyond core identity fields
- non-Google OAuth providers
- role-management UI
- permission-administration APIs
- business onboarding logic for merchants, suppliers, drivers, creators, or any ecosystem role-specific flow

---

## Repository Changes

### Repository Change Principles

- No new top-level platform package should be invented unless absolutely required by governance. Phase 1.1 should implement the approved Milestone 1.0 boundaries rather than multiplying primitives.
- All changes must stay inside the approved monorepo structure.
- No future milestone implementation may be smuggled in under “foundation.” That trick gets expensive later.

### Folders to Be Created

#### Backend
- `apps/platform-api/src/modules/identity/`
- `apps/platform-api/src/modules/identity/routes/`
- `apps/platform-api/src/modules/identity/services/`
- `apps/platform-api/src/modules/identity/repositories/`
- `apps/platform-api/src/modules/identity/schemas/`
- `apps/platform-api/src/modules/identity/mappers/`
- `apps/platform-api/src/modules/identity/policies/`
- `apps/platform-api/src/lib/auth/`
- `apps/platform-api/tests/identity/`

#### Frontend
- `apps/web/src/app/(auth)/`
- `apps/web/src/app/(auth)/login/`
- `apps/web/src/app/(auth)/register/`
- `apps/web/src/app/(auth)/verify-email/`
- `apps/web/src/app/(auth)/forgot-password/`
- `apps/web/src/app/(auth)/reset-password/`
- `apps/web/src/app/(auth)/google/callback/`
- `apps/web/src/components/auth/`
- `apps/web/src/lib/auth/`

#### Prisma
- `prisma/migrations/<timestamp>_phase_1_1_identity_foundation/`
- `prisma/seed/`

### Files to Be Created

#### Backend — Identity module
- `apps/platform-api/src/modules/identity/index.ts`
- `apps/platform-api/src/modules/identity/routes/register-route.ts`
- `apps/platform-api/src/modules/identity/routes/login-password-route.ts`
- `apps/platform-api/src/modules/identity/routes/google-start-route.ts`
- `apps/platform-api/src/modules/identity/routes/google-callback-route.ts`
- `apps/platform-api/src/modules/identity/routes/refresh-route.ts`
- `apps/platform-api/src/modules/identity/routes/logout-route.ts`
- `apps/platform-api/src/modules/identity/routes/me-route.ts`
- `apps/platform-api/src/modules/identity/routes/list-sessions-route.ts`
- `apps/platform-api/src/modules/identity/routes/revoke-session-route.ts`
- `apps/platform-api/src/modules/identity/routes/request-email-verification-route.ts`
- `apps/platform-api/src/modules/identity/routes/confirm-email-verification-route.ts`
- `apps/platform-api/src/modules/identity/routes/request-password-reset-route.ts`
- `apps/platform-api/src/modules/identity/routes/reset-password-route.ts`

#### Backend — Services
- `apps/platform-api/src/modules/identity/services/register-user.ts`
- `apps/platform-api/src/modules/identity/services/authenticate-password.ts`
- `apps/platform-api/src/modules/identity/services/authenticate-google.ts`
- `apps/platform-api/src/modules/identity/services/refresh-auth-session.ts`
- `apps/platform-api/src/modules/identity/services/logout-auth-session.ts`
- `apps/platform-api/src/modules/identity/services/get-current-user.ts`
- `apps/platform-api/src/modules/identity/services/list-user-sessions.ts`
- `apps/platform-api/src/modules/identity/services/revoke-user-session.ts`
- `apps/platform-api/src/modules/identity/services/request-email-verification.ts`
- `apps/platform-api/src/modules/identity/services/confirm-email-verification.ts`
- `apps/platform-api/src/modules/identity/services/request-password-reset.ts`
- `apps/platform-api/src/modules/identity/services/reset-password.ts`

#### Backend — Repositories
- `apps/platform-api/src/modules/identity/repositories/prisma-user-repository.ts`
- `apps/platform-api/src/modules/identity/repositories/prisma-password-credential-repository.ts`
- `apps/platform-api/src/modules/identity/repositories/prisma-provider-account-repository.ts`
- `apps/platform-api/src/modules/identity/repositories/prisma-auth-session-repository.ts`
- `apps/platform-api/src/modules/identity/repositories/prisma-email-verification-token-repository.ts`
- `apps/platform-api/src/modules/identity/repositories/prisma-password-reset-token-repository.ts`
- `apps/platform-api/src/modules/identity/repositories/prisma-role-repository.ts`

#### Backend — Schemas / Policies / Plugins / Libraries
- `apps/platform-api/src/modules/identity/schemas/register-schema.ts`
- `apps/platform-api/src/modules/identity/schemas/login-password-schema.ts`
- `apps/platform-api/src/modules/identity/schemas/google-callback-schema.ts`
- `apps/platform-api/src/modules/identity/schemas/request-email-verification-schema.ts`
- `apps/platform-api/src/modules/identity/schemas/confirm-email-verification-schema.ts`
- `apps/platform-api/src/modules/identity/schemas/request-password-reset-schema.ts`
- `apps/platform-api/src/modules/identity/schemas/reset-password-schema.ts`
- `apps/platform-api/src/modules/identity/schemas/revoke-session-schema.ts`
- `apps/platform-api/src/modules/identity/policies/identity-permission-policy.ts`
- `apps/platform-api/src/lib/auth/password-hasher.ts`
- `apps/platform-api/src/lib/auth/jwt-service.ts`
- `apps/platform-api/src/lib/auth/refresh-token-service.ts`
- `apps/platform-api/src/lib/auth/oauth-state-store.ts`
- `apps/platform-api/src/lib/auth/role-permission-resolver.ts`
- `apps/platform-api/src/plugins/authenticate-access-token.ts`
- `apps/platform-api/src/plugins/authorize-permission.ts`
- `apps/platform-api/src/plugins/security-rate-limit.ts`

#### Backend — Tests
- `apps/platform-api/tests/identity/register.test.ts`
- `apps/platform-api/tests/identity/login-password.test.ts`
- `apps/platform-api/tests/identity/google-oauth.test.ts`
- `apps/platform-api/tests/identity/refresh.test.ts`
- `apps/platform-api/tests/identity/logout.test.ts`
- `apps/platform-api/tests/identity/email-verification.test.ts`
- `apps/platform-api/tests/identity/password-reset.test.ts`
- `apps/platform-api/tests/identity/sessions.test.ts`
- `apps/platform-api/tests/identity/rbac.test.ts`
- `apps/platform-api/tests/identity/security.test.ts`

#### Frontend
- `apps/web/src/app/(auth)/login/page.tsx`
- `apps/web/src/app/(auth)/register/page.tsx`
- `apps/web/src/app/(auth)/verify-email/page.tsx`
- `apps/web/src/app/(auth)/forgot-password/page.tsx`
- `apps/web/src/app/(auth)/reset-password/page.tsx`
- `apps/web/src/app/(auth)/google/callback/page.tsx`
- `apps/web/src/components/auth/auth-form-shell.tsx`
- `apps/web/src/components/auth/auth-status-banner.tsx`
- `apps/web/src/lib/auth/auth-client.ts`
- `apps/web/src/lib/auth/session-client.ts`

#### Shared packages
- `packages/auth-contracts/src/requests.ts`
- `packages/auth-contracts/src/responses.ts`
- `packages/auth-contracts/src/tokens.ts`
- `packages/types/src/identity.ts`
- `packages/types/src/rbac.ts`
- `packages/types/src/session.ts`
- `packages/events/src/identity-events.ts`
- `packages/repository/src/identity.ts`
- `packages/config/src/auth.ts`
- `packages/errors/src/auth-errors.ts`
- `packages/integration-gateway/src/google-oauth.ts`

#### Prisma
- `prisma/migrations/<timestamp>_phase_1_1_identity_foundation/migration.sql`
- `prisma/seed/roles-and-permissions.ts`

### Files to Be Modified

- `apps/platform-api/src/app.ts`
- `apps/platform-api/src/index.ts`
- `apps/platform-api/package.json`
- `apps/web/package.json`
- `.env.example`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `packages/auth-contracts/src/index.ts`
- `packages/types/src/index.ts`
- `packages/events/src/index.ts`
- `packages/repository/src/index.ts`
- `packages/config/src/index.ts`
- `packages/errors/src/index.ts`
- `packages/integration-gateway/src/index.ts`
- `README.md`

### Packages to Be Reused Unchanged

- `packages/logger`
- `packages/di`
- `packages/notification-contracts`
- `packages/ai-contracts`

### Existing Files to Be Reused

- `apps/platform-api/src/lib/health.ts`
- `apps/platform-api/src/plugins/request-context.ts`
- `apps/platform-api/src/plugins/error-handler.ts`
- `apps/platform-api/src/routes/health.ts`
- `docker-compose.yml`
- `.github/workflows/ci.yml`
- `scripts/bootstrap.sh`
- `scripts/check-foundation.sh`
- `packages/logger/src/index.ts`
- `packages/di/src/index.ts`
- `packages/notification-contracts/src/index.ts`
- `packages/ai-contracts/src/index.ts`

---

## Database Design

### Existing Foundation Models to Be Reused

- `AuditLog`
- `OutboxEvent`

### Prisma Models to Be Introduced in Phase 1.1

1. `User`
2. `PasswordCredential`
3. `ProviderAccount`
4. `AuthSession`
5. `EmailVerificationToken`
6. `PasswordResetToken`
7. `Role`
8. `Permission`
9. `UserRole`
10. `RolePermission`

### Future-Ready Architectural Placeholders — Not Implemented in Phase 1.1

These structures are documented now so the identity schema stays future-compatible, but **they are not created or implemented in Phase 1.1**.

11. `Organization` *(future placeholder only)*
12. `OrganizationMember` *(future placeholder only)*
13. `OrganizationRole` *(future placeholder only)*
14. `Device` *(future placeholder only)*

The purpose is architectural reservation, not scope expansion.

### Canonical Enumerations

#### UserStatus
- `PENDING`
- `EMAIL_UNVERIFIED`
- `ACTIVE`
- `LOCKED`
- `SUSPENDED`
- `BANNED`
- `ARCHIVED`

#### OAuthProvider
- `GOOGLE`
- `APPLE`
- `FACEBOOK`
- `MICROSOFT`

Only `GOOGLE` is implemented in Phase 1.1.

### Model Definitions

#### `User`
Canonical identity record.

**Implemented Fields**
- `id`
- `email`
- `displayName`
- `status`
- `emailVerifiedAt`
- `lastLoginAt`
- `createdAt`
- `updatedAt`

**Future-Ready Profile Fields — Not Implemented in Phase 1.1**
- `firstName`
- `lastName`
- `avatar`
- `phone`
- `country`
- `language`
- `timezone`
- `currency`

**Design Notes**
- `email` stored normalized lowercase
- no soft delete in Phase 1.1
- lifecycle managed by canonical status values
- future profile expansion must extend the user domain without breaking core auth flows

#### `PasswordCredential`
Local password authentication secret store.

**Fields**
- `id`
- `userId`
- `passwordHash`
- `passwordVersion`
- `createdAt`
- `updatedAt`

**Design Notes**
- one-to-one with `User`
- stores hash only
- password rotation increments `passwordVersion`

#### `ProviderAccount`
External identity provider link.

**Fields**
- `id`
- `userId`
- `provider`
- `providerUserId`
- `providerEmail`
- `linkedAt`
- `lastLoginAt`
- `metadata`
- `createdAt`
- `updatedAt`

**Design Notes**
- one user may have multiple provider accounts in future
- Phase 1.1 only implements `GOOGLE`
- provider interaction must pass through Integration Gateway

#### `AuthSession`
Refresh-token backed session record.

**Fields**
- `id`
- `userId`
- `refreshTokenHash`
- `deviceId` *(nullable in Phase 1.1; future compatibility field)*
- `deviceNameSnapshot` *(optional future-compatible metadata if needed)*
- `userAgent`
- `ipAddress`
- `lastUsedAt`
- `expiresAt`
- `revokedAt`
- `createdAt`

**Design Notes**
- access token remains stateless JWT
- refresh token stored hashed only
- refresh token rotates on refresh
- session design must remain compatible with future trusted-device features

#### `EmailVerificationToken`
Email verification confirmation token.

**Fields**
- `id`
- `userId`
- `tokenHash`
- `expiresAt`
- `usedAt`
- `createdAt`

#### `PasswordResetToken`
Password reset confirmation token.

**Fields**
- `id`
- `userId`
- `tokenHash`
- `expiresAt`
- `usedAt`
- `createdAt`

#### `Role`
Canonical RBAC role catalog.

**Seed Examples**
- `guest`
- `customer`
- `merchant`
- `supplier`
- `farmer`
- `restaurant`
- `driver`
- `host`
- `freelancer`
- `creator`
- `support_agent`
- `support_manager`
- `operations_admin`
- `finance_admin`
- `moderator`
- `platform_admin`
- `super_admin`

**Fields**
- `id`
- `slug`
- `name`
- `description`
- `isSystem`
- `createdAt`
- `updatedAt`

#### `Permission`
Canonical permission catalog.

**Fields**
- `id`
- `code`
- `resource`
- `action`
- `description`
- `createdAt`
- `updatedAt`

#### `UserRole`
User-to-role assignment join model.

**Fields**
- `userId`
- `roleId`
- `assignedByUserId`
- `assignedReason`
- `assignedAt`
- `expiresAt`

#### `RolePermission`
Role-to-permission join model.

**Fields**
- `roleId`
- `permissionId`
- `createdAt`

### Future Placeholder Models — Not Implemented in Phase 1.1

#### `Organization` *(future placeholder only)*
Purpose: reserve future multi-tenant architecture.

**Future Fields**
- `id`
- `name`
- `slug`
- `status`
- `createdAt`
- `updatedAt`

#### `OrganizationMember` *(future placeholder only)*
Purpose: future user-to-organization membership mapping.

**Future Fields**
- `organizationId`
- `userId`
- `memberStatus`
- `joinedAt`
- `leftAt`

#### `OrganizationRole` *(future placeholder only)*
Purpose: future tenant-scoped role resolution distinct from global platform RBAC.

**Future Fields**
- `id`
- `organizationId`
- `slug`
- `name`
- `description`
- `createdAt`
- `updatedAt`

#### `Device` *(future placeholder only)*
Purpose: future device awareness and trusted-device governance.

**Future Fields**
- `deviceId`
- `deviceName`
- `platform`
- `browser`
- `operatingSystem`
- `lastSeen`
- `trusted`
- `pushToken` *(future only)*
- `createdAt`
- `updatedAt`

**Compatibility Rule**
Phase 1.1 does not register devices, but session architecture must not block later attachment of sessions to devices.

### Relationships

#### Implemented in Phase 1.1
- `User` 1:1 `PasswordCredential`
- `User` 1:N `ProviderAccount`
- `User` 1:N `AuthSession`
- `User` 1:N `EmailVerificationToken`
- `User` 1:N `PasswordResetToken`
- `User` M:N `Role` through `UserRole`
- `Role` M:N `Permission` through `RolePermission`
- `UserRole.assignedByUserId` → optional self-reference to `User`

#### Reserved for Future Milestones Only
- `Organization` 1:N `OrganizationMember`
- `Organization` 1:N `OrganizationRole`
- `User` M:N `Organization` through `OrganizationMember`
- `User` 1:N `Device`
- `Device` 1:N `AuthSession`

### Indexes

| Model | Index |
|---|---|
| `User` | unique on `email` |
| `User` | index on `status` |
| `User` | index on `emailVerifiedAt` |
| `PasswordCredential` | unique on `userId` |
| `ProviderAccount` | unique on `(provider, providerUserId)` |
| `ProviderAccount` | index on `userId` |
| `AuthSession` | unique on `refreshTokenHash` |
| `AuthSession` | index on `(userId, revokedAt)` |
| `AuthSession` | index on `expiresAt` |
| `AuthSession` | index on `deviceId` if field retained for future compatibility |
| `EmailVerificationToken` | unique on `tokenHash` |
| `EmailVerificationToken` | index on `(userId, usedAt)` |
| `EmailVerificationToken` | index on `expiresAt` |
| `PasswordResetToken` | unique on `tokenHash` |
| `PasswordResetToken` | index on `(userId, usedAt)` |
| `PasswordResetToken` | index on `expiresAt` |
| `Role` | unique on `slug` |
| `Permission` | unique on `code` |
| `Permission` | unique on `(resource, action)` |
| `UserRole` | unique on `(userId, roleId)` |
| `UserRole` | index on `roleId` |
| `UserRole` | index on `expiresAt` |
| `RolePermission` | unique on `(roleId, permissionId)` |
| `RolePermission` | index on `permissionId` |

### Constraints

- one `User` may have zero or one `PasswordCredential`
- one external provider identity may link to one user only
- refresh tokens must be stored hashed only
- used verification/reset tokens must never be reusable
- revoked sessions must never refresh new access tokens
- `User.email` must be normalized before persistence
- RBAC seed data must be deterministic and idempotent
- role and permission administration endpoints are not part of Phase 1.1
- all sensitive operations requiring events must persist `OutboxEvent` within the same transaction boundary where applicable
- all sensitive operations must produce auditable records aligned to canonical audit categories

### User Status Lifecycle

Canonical lifecycle states:

- `PENDING` — transient bootstrap state only if user creation and downstream verification preparation are separated inside a transaction boundary
- `EMAIL_UNVERIFIED` — user exists, may authenticate only according to policy, but email has not yet been confirmed
- `ACTIVE` — user is fully usable within allowed permissions
- `LOCKED` — temporary security control due to repeated failures or automated protection
- `SUSPENDED` — administrative or compliance restriction pending review
- `BANNED` — long-term or permanent prohibition
- `ARCHIVED` — retained historical identity record not available for active login

Recommended lifecycle transitions:

- `PENDING` → `EMAIL_UNVERIFIED`
- `EMAIL_UNVERIFIED` → `ACTIVE`
- `ACTIVE` → `LOCKED`
- `LOCKED` → `ACTIVE`
- `ACTIVE` → `SUSPENDED`
- `SUSPENDED` → `ACTIVE`
- `ACTIVE` → `BANNED`
- `SUSPENDED` → `BANNED`
- `BANNED` → `ARCHIVED` *(future governed lifecycle decision)*
- `ACTIVE` → `ARCHIVED` *(rare, governed retention case only)*

### User Lifecycle and Data Retention Strategy

Phase 1.1 should not use soft delete as the primary lifecycle control. The recommended long-term pattern is:

- active identities remain `ACTIVE`
- restricted identities transition to `LOCKED`, `SUSPENDED`, or `BANNED`
- historical identities that must be retained without operational use transition to `ARCHIVED`

Retention guidance:

- identity records should remain durable for security, audit, and legal traceability
- session and token data should follow security retention policy and expiry cleanup routines
- archived users should not authenticate
- deletion, anonymization, and legal-hold policy remain governed by future data governance implementation, not Phase 1.1

This approach avoids brittle pseudo-deletes while keeping audit and compliance options intact.

---

## APIs

### API Conventions

- base path: `/api/v1`
- success envelope: `ApiSuccess<T>`
- error envelope: `ApiError`
- access token: JWT bearer token
- refresh token: secure HTTP-only cookie
- public endpoints: rate limited
- all sensitive writes: request ID required
- registration requires idempotency protection
- request / response contracts must remain package-driven through `packages/auth-contracts`

### API Versioning Policy

#### Versioning Strategy
- Identity APIs are versioned at the URI layer using `/api/v1`.
- Phase 1.1 introduces version `v1` only.
- additive, backward-compatible response enhancements may occur within `v1` only if they do not break contract consumers.

#### Backward Compatibility Policy
- existing request fields must not change meaning inside the same major version
- required request fields must not be removed or renamed in `v1`
- existing response fields must not be removed or repurposed in `v1`
- new optional response fields may be added if they do not break typed consumers
- authorization semantics must not become less strict within the same version

#### Deprecation Policy
- deprecations must be documented before replacement behavior becomes mandatory
- deprecated fields or endpoints must remain operational through a defined deprecation window
- deprecation notices should be surfaced in engineering documentation and release notes

#### Endpoint Sunset Policy
- breaking API changes require a new major version or replacement endpoint path
- an endpoint may be sunset only after:
  1. replacement exists,
  2. consumers have migration guidance,
  3. deprecation window is completed,
  4. governance approval is recorded

No new endpoints are introduced by this refinement.

### Endpoint Inventory

#### Public Endpoints

| Method | Path | Request Model | Response Model | Validation | Authentication | Authorization |
|---|---|---|---|---|---|---|
| `POST` | `/api/v1/auth/register` | `RegisterRequest` | `RegisterResponse` | normalized email, password policy, display name bounds, idempotency key required | none | public |
| `POST` | `/api/v1/auth/login/password` | `PasswordLoginRequest` | `AuthSessionResponse` | email required, password required | none | public |
| `GET` | `/api/v1/auth/login/google/start` | query `redirect_uri?` | `GoogleOAuthStartResponse` | redirect allow-list validation | none | public |
| `GET` | `/api/v1/auth/login/google/callback` | query `code`, `state` | `AuthSessionResponse` | state required, code required, replay-safe state validation | none | public |
| `POST` | `/api/v1/auth/token/refresh` | cookie-based | `AuthSessionRefreshResponse` | valid refresh cookie, active session, token rotation | refresh cookie | session-bound public |
| `POST` | `/api/v1/auth/email/verify/request` | `RequestEmailVerificationRequest` | `AcceptedResponse` | email required, generic response only | none | public |
| `POST` | `/api/v1/auth/email/verify/confirm` | `ConfirmEmailVerificationRequest` | `ConfirmEmailVerificationResponse` | token required, unused, unexpired | none | public |
| `POST` | `/api/v1/auth/password/forgot` | `RequestPasswordResetRequest` | `AcceptedResponse` | email required, generic response only | none | public |
| `POST` | `/api/v1/auth/password/reset` | `ResetPasswordRequest` | `ResetPasswordResponse` | token required, password policy enforced, token unused / unexpired | none | public |

#### Authenticated Endpoints

| Method | Path | Request Model | Response Model | Validation | Authentication | Authorization |
|---|---|---|---|---|---|---|
| `POST` | `/api/v1/auth/logout` | `LogoutRequest` | `AcceptedResponse` | active session required | bearer token or active session cookie | authenticated user |
| `GET` | `/api/v1/auth/me` | none | `CurrentUserResponse` | none | bearer token | authenticated user |
| `GET` | `/api/v1/auth/sessions` | none | `ListSessionsResponse` | none | bearer token | authenticated user |
| `DELETE` | `/api/v1/auth/sessions/:sessionId` | route param `sessionId` | `AcceptedResponse` | valid `sessionId`, must belong to caller | bearer token | `identity:sessions:revoke:self` |

### Request Models

- `RegisterRequest`
  - `email`
  - `password`
  - `displayName`

- `PasswordLoginRequest`
  - `email`
  - `password`

- `RequestEmailVerificationRequest`
  - `email`

- `ConfirmEmailVerificationRequest`
  - `token`

- `RequestPasswordResetRequest`
  - `email`

- `ResetPasswordRequest`
  - `token`
  - `newPassword`

- `LogoutRequest`
  - current session only in Phase 1.1

### Response Models

- `RegisterResponse`
  - `userId`
  - `email`
  - `status`
  - `nextAction`

- `AuthSessionResponse`
  - `accessToken`
  - `expiresIn`
  - `sessionId`
  - `user`

- `AuthSessionRefreshResponse`
  - `accessToken`
  - `expiresIn`
  - `sessionId`

- `CurrentUserResponse`
  - `userId`
  - `email`
  - `displayName`
  - `status`
  - `emailVerified`
  - `roles`
  - `permissions`

- `ListSessionsResponse`
  - `sessions[]`
  - `currentSessionId`

- `AcceptedResponse`
  - `accepted`
  - `message`

- `ResetPasswordResponse`
  - `reset`
  - `message`

### Validation Standards

- email must be trimmed, lowercased, normalized, and format-validated
- passwords must comply with defined password policy
- tokens must be opaque, random, bounded by expiry, and one-time use where applicable
- `state` in OAuth callback must be replay-safe
- protected route parameters must be ownership-checked when self-service actions are involved

### Authentication

- access token: short-lived JWT bearer token
- refresh token: HTTP-only secure cookie stored hashed in `AuthSession`
- refresh token rotation required on refresh
- Google OAuth implemented only through Integration Gateway abstraction

### Authorization

- public users may register, authenticate, request verification, confirm verification, request reset, confirm reset
- authenticated users may call `/me`, list sessions, revoke own sessions, and logout
- no role-management endpoints in Phase 1.1
- no admin identity APIs in Phase 1.1

### Idempotency Policy

The following operations require explicit idempotency protection:

1. **Registration**
   - Reason: protects against duplicate account creation from retries, double-submit behavior, network retries, and gateway replay.
   - Policy: require idempotency key and enforce uniqueness for a bounded replay window.

2. **Email Verification Request**
   - Reason: prevents token storms, duplicate downstream notification requests, and noisy audit/event amplification.
   - Policy: treat repeated requests in a short interval as the same effective intent; rotate or reuse token according to implementation policy, but do not create uncontrolled duplicates.

3. **Password Reset Request**
   - Reason: same replay risks as verification plus account enumeration pressure and notification spam risk.
   - Policy: enforce bounded deduplication and generic response behavior.

4. **Session Refresh**
   - Reason: browser retries, client race conditions, and network duplication can otherwise create inconsistent token rotation or accidental double-revocation scenarios.
   - Policy: refresh rotation logic must remain replay-safe and deterministic.

Operations such as password login do not require classic idempotency keys, but they do require replay-aware security controls and rate limiting.

### Rate Limiting Policy

These are engineering standards for implementation. They are not implementation in this document.

| Endpoint / Operation | Recommended Limit | Window | Notes |
|---|---|---|---|
| Registration | 5 attempts per IP | 15 minutes | plus duplicate-email protections |
| Password Login | 10 attempts per IP and 5 attempts per account identifier | 15 minutes | progressive lockout logic applies |
| Password Reset Request | 5 attempts per email and 10 per IP | 30 minutes | always generic response |
| Email Verification Request | 5 attempts per email and 10 per IP | 30 minutes | avoid token storms |
| Google OAuth Callback | 20 requests per IP | 15 minutes | state validation still mandatory |
| Session Refresh | 30 requests per session | 15 minutes | replay-safe rotation still mandatory |

Recommended enforcement characteristics:
- Redis-backed counters
- actor-aware throttling where possible
- IP + account identifier hybrid controls for high-risk endpoints
- distinct security alerts for anomalous spike patterns

---

## Events

### Event Rules

Phase 1.1 Identity publishes domain events only. It does not consume future events from other milestones.

### Event Versioning Rules

- events are immutable once published as a versioned contract
- existing event payloads must never be modified in a breaking way
- breaking changes require a new versioned event name or version suffix
- previous event versions remain supported until formally deprecated
- additive non-breaking fields must be evaluated carefully and documented before release
- consumers must not assume unpublished fields or undocumented semantics

### Events to Be Published

| Event | Trigger | Future Consumers | Example Future Chain |
|---|---|---|---|
| `identity.user.registered.v1` | new user created | Notification, Audit, Analytics, Welcome workflow, Wallet | `NotificationRequested` → `AuditLogCreated` → `AnalyticsEventCreated` → `WelcomeWorkflowRequested` |
| `identity.user.email_verification_requested.v1` | verification token issued | Notification, Audit | `NotificationRequested` → `AuditLogCreated` |
| `identity.user.email_verified.v1` | verification completed | Audit, Analytics, Wallet, Escrow, Admin | `AuditLogCreated` → `AnalyticsEventCreated` → `WalletOnboardingRequested` |
| `identity.user.password_login_succeeded.v1` | password login succeeds | Audit, Analytics, Aura AI | `AuditLogCreated` → `AnalyticsEventCreated` |
| `identity.user.password_login_failed.v1` | password login fails | Audit, Analytics, Aura AI, Admin | `AuditLogCreated` → `AnalyticsEventCreated` |
| `identity.user.google_login_succeeded.v1` | Google OAuth succeeds | Audit, Analytics, Aura AI | `AuditLogCreated` → `AnalyticsEventCreated` |
| `identity.user.password_reset_requested.v1` | reset token issued | Notification, Audit | `NotificationRequested` → `AuditLogCreated` |
| `identity.user.password_reset_completed.v1` | password reset completed | Audit, Analytics, Aura AI | `AuditLogCreated` → `AnalyticsEventCreated` |
| `identity.session.refreshed.v1` | refresh rotation succeeds | Audit, Analytics | `AuditLogCreated` → `AnalyticsEventCreated` |
| `identity.session.revoked.v1` | session revoked or logout succeeds | Audit, Analytics, Admin | `AuditLogCreated` → `AnalyticsEventCreated` |

### Example Future Event Chain

`identity.user.registered.v1`  
↓  
future Notification consumer may publish `NotificationRequested`  
↓  
future Audit consumer may publish `AuditLogCreated`  
↓  
future Analytics consumer may publish `AnalyticsEventCreated`  
↓  
future workflow consumer may publish `WelcomeWorkflowRequested`

Identity Phase 1.1 publishes the first event only.

---

## Shared Contracts

### Existing Milestone 1.0 Contracts to Be Implemented in Phase 1.1

| Contract | Phase 1.1 Use |
|---|---|
| `packages/auth-contracts` | request / response DTOs, token DTOs, session DTOs |
| `packages/types` | user, role, permission, session, auth claims, API envelope types |
| `packages/events` | identity event definitions and publisher payload contracts |
| `packages/repository` | repository interfaces for users, credentials, sessions, tokens, roles |
| `packages/config` | auth, security, TTL, rate-limit, and environment contracts |
| `packages/errors` | auth-specific error taxonomy and API-safe mapping |
| `packages/integration-gateway` | Google OAuth provider abstraction boundary |
| `packages/logger` | request-correlated security and auth logging |
| `packages/di` | dependency graph registration |

### Existing Contracts Reused but Not Implemented as Future Services

| Contract | Status in Phase 1.1 |
|---|---|
| `packages/notification-contracts` | reference-only for future downstream integration |
| `packages/ai-contracts` | reference-only for future downstream integration |

---

## Audit Log Classification

All identity implementation must use canonical audit categories consistently.

### Canonical Identity Audit Categories

- `AUTH`
- `SECURITY`
- `SESSION`
- `RBAC`
- `PROFILE`
- `OAUTH`
- `SYSTEM`

### Required Usage Guidance

- `AUTH` — registration, password login, password reset completion
- `SECURITY` — failed login spikes, lockouts, suspicious token reuse, replay rejection
- `SESSION` — refresh, logout, revoke, session expiration handling
- `RBAC` — role resolution, assignment bootstrap, permission checks with governance importance
- `PROFILE` — core identity field updates if allowed later within scope
- `OAUTH` — Google redirect start, callback handling, provider-link activity
- `SYSTEM` — seed/bootstrap/system-initiated identity operations

Consistent categorization is mandatory so observability and incident response remain sane rather than archaeological.

---

## Password Security Policy

### Hashing Algorithm
- use **Argon2id** for password hashing
- no reversible encryption for passwords ever
- per-password salt handled by the hashing algorithm
- configuration parameters must be centrally governed through config contracts

### Password Rules
- minimum length: **12 characters**
- maximum length: **128 characters**
- require resistance against trivial passwords and common weak patterns
- allow passphrases; do not force arbitrary composition theater if strength policy is satisfied

### Recommended Complexity Standard
At least one of the following approaches should be enforced consistently:
- strong composition policy (upper, lower, number, symbol), or
- modern strength policy with entropy / deny-list validation

Preferred direction: strong minimum length + deny-list checks + breached-password screening when introduced.

### Failed Login Handling
- increment account-scoped and IP-scoped failure counters
- emit failed-login identity event and audit record
- trigger temporary lock behavior when threshold exceeded

### Lockout Policy
Recommended engineering baseline:
- soft throttle before hard lock
- temporary `LOCKED` or login suspension after repeated failures within a short window
- administrative unlock not required for transient security locks if automatic recovery window is defined

### Future Security Features — Not Implemented in Phase 1.1
- password history enforcement
- breached password checks
- MFA / 2FA
- hardware-backed passkeys

These remain future enhancements and are not implemented in this phase.

---

## OAuth Provider Strategy

### Phase 1.1 Policy
- only **Google OAuth** is implemented in Phase 1.1
- all provider communication must pass through the Integration Gateway abstraction
- no provider-specific domain logic may be spread across route handlers or services

### Future Provider Enumeration
- `GOOGLE`
- `APPLE`
- `FACEBOOK`
- `MICROSOFT`

### Future Strategy Rules
- additional providers require explicit approval in later milestones
- provider expansion must reuse the same abstraction boundary and normalized provider account model
- adding a provider later must not break the existing Google implementation contract

---

## Multi-Tenant Organization Readiness

The identity architecture must remain compatible with future multi-tenant expansion, but **multi-tenant functionality is not implemented in Phase 1.1**.

### Reserved Future Concepts
- `Organization`
- `OrganizationMember`
- `OrganizationRole`

### Planning Intent
- current RBAC in Phase 1.1 is **global platform RBAC**, not tenant-scoped RBAC
- future tenant scoping must be able to coexist with global permissions without rewriting the identity core
- no organization APIs, organization persistence, organization onboarding, or tenant admin functionality are introduced in this phase

This is architectural reservation only, not a stealth tenant milestone.

---

## Device Management Readiness

Phase 1.1 does not implement device registration, trusted-device workflows, or push-token management.

### Future Device Model Reservation
- `deviceId`
- `deviceName`
- `platform`
- `browser`
- `operatingSystem`
- `lastSeen`
- `trusted`
- `pushToken` *(future only)*
- `createdAt`
- `updatedAt`

### Compatibility Requirements for Phase 1.1
- session architecture must allow later attachment of a session to a registered device
- refresh/session design must not assume device-unaware permanence
- token and session records may retain enough snapshot metadata to support later migration without schema violence

---

## User Profile Readiness

Phase 1.1 implements only core identity fields necessary for authentication and authorization.

### Implemented Now
- `email`
- `displayName`
- `status`
- `emailVerifiedAt`
- `lastLoginAt`

### Reserved Future Profile Fields
- `firstName`
- `lastName`
- `avatar`
- `phone`
- `country`
- `language`
- `timezone`
- `currency`

### Boundary Rule
These fields are reserved for future profile evolution only. They are not part of the functional scope, validation scope, UI scope, or API scope of Phase 1.1.

---

## Testing

### Unit Tests
Must cover:
- email normalization
- password hashing and verification
- JWT signing and claim creation
- refresh token generation and rotation
- role-to-permission resolution
- token expiry logic
- one-time token use enforcement
- event payload mapping
- audit category mapping
- error mapping and safe serialization

### Integration Tests
Must cover:
- user creation transaction
- user creation + outbox persistence in same unit of work
- login against seeded RBAC catalog
- Google OAuth state validation with Redis
- refresh-session rotation and prior-token invalidation
- session revocation
- email verification transition
- password reset transition
- duplicate registration behavior and uniqueness constraints
- repository behavior against real Postgres

### API Tests
Must cover:
- registration happy path
- duplicate email registration
- failed password login
- successful password login
- Google callback success / failure
- refresh success / failure
- logout success / failure
- `/me` claim response
- sessions listing
- session revoke ownership checks
- verification request / confirm flow
- reset request / confirm flow
- validation failure behavior on all public endpoints

### Security Tests
Must cover:
- brute-force rate limiting behavior
- account enumeration resistance
- JWT tampering rejection
- expired token rejection
- revoked refresh token rejection
- session fixation protection
- replayed verification/reset token rejection
- permission enforcement on protected routes
- audit/event generation for sensitive operations
- OAuth state replay rejection

---

## Git Strategy

### Branch Structure
- `main` — protected, releasable only
- `release/phase-1-1-identity` — integration branch for the phase
- `feature/phase-1-1-schema-rbac`
- `feature/phase-1-1-auth-service`
- `feature/phase-1-1-google-oauth`
- `feature/phase-1-1-web-auth`
- `feature/phase-1-1-security-hardening`
- `feature/phase-1-1-test-suite`

### Logical Commits
1. schema and migration for identity + RBAC
2. auth contracts and shared type updates
3. repository interfaces and Prisma repository implementations
4. password auth flows
5. session and JWT flows
6. Google OAuth via Integration Gateway
7. web auth screens and client wiring
8. event publication and outbox integration
9. security hardening
10. tests and implementation documentation alignment

---

## Acceptance Criteria

### Definition of Done

Phase 1.1 is complete only when all of the following are true:

- one canonical `User` model exists
- local password auth works
- Google OAuth works through Integration Gateway abstraction
- JWT access tokens and refresh-session rotation work
- RBAC roles and permissions are seeded and enforced
- `/me`, session list, session revoke, logout, registration, login, verify, forgot, and reset endpoints are implemented
- all required identity events are published through outbox-compatible patterns
- audit logging uses canonical audit categories consistently
- no future dependency is implemented directly
- no admin UI or admin workflow is introduced
- no wallet, escrow, commerce, messaging, search, notification delivery, or AI execution logic is introduced
- unit, integration, API, and security tests pass
- lint, typecheck, build, and Prisma validation pass
- implementation remains aligned with approved governance documents

---

## Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Notification service not implemented yet | verification and reset cannot complete full delivery chain end-to-end | issue tokens and publish events only |
| RBAC scope explosion | identity turns into admin platform work | limit Phase 1.1 to enforcement, not admin management |
| Google OAuth misconfiguration | broken login and callback instability | enforce allow-listed redirects and state validation |
| weak session design | long-term security debt | hashed refresh tokens, rotation, revocation, short-lived access JWTs |
| account enumeration | public endpoint leakage | generic responses and rate limits |
| scope creep into wallet/admin/AI | milestone delay and architecture blur | strict PR scope review |
| future contract drift | downstream integration breakage | version contracts and events explicitly |
| retention ambiguity | later compliance pain | use lifecycle states now, future retention governance later |
| multi-tenant rewrite risk later | expensive schema churn | reserve organization concepts now without implementation |
| device-awareness retrofit later | session redesign risk | keep session structure future-compatible |

---

## Future Dependencies

These remain future integrations only and are not implemented in Phase 1.1.

| Future Dependency | Phase 1.1 Boundary | Expected Future Integration Point |
|---|---|---|
| Notification Service | do not implement delivery | consumes verification and reset events |
| Wallet | do not create wallets | may consume verified identity state later |
| Escrow | do not integrate | may consume verified identity state later |
| Aura AI | do not score or decide | may consume security-related identity events later |
| Admin | do not implement admin UI or operations | may later consume identity events and governed RBAC operations |

---

## Final Consistency Review

This refined implementation plan has been reviewed for alignment with the approved governance baseline and remains consistent with the following governing documents:

- `PROJECT_RULES.md`
- `ARCHITECTURE.md`
- `WORKFLOW_ATLAS.md`
- `DATABASE_STANDARDS.md`
- `API_STANDARDS.md`
- `SECURITY.md`
- `AI_ATLAS.md`
- `MASTER_PERMISSION_MATRIX.md`
- `MILESTONE_1_IMPLEMENTATION_CHARTER.md`

### Consistency Findings

- **No scope creep introduced**
- **No future milestone functionality implemented in plan scope**
- **No architecture boundary violations introduced**
- **No dependency violations introduced**
- **No additional APIs beyond the previously planned identity endpoints**
- **No Wallet, Escrow, Notifications, Aura AI, Search, Messaging, Commerce, or Admin implementation included**
- **Future placeholders are documented as non-implemented architectural reservations only**

---

## Final Implementation Readiness Assessment

The Phase 1.1 Identity Implementation Plan is now strengthened for enterprise execution with the following additional readiness qualities:

- future multi-tenant compatibility reserved without tenant implementation
- future device-awareness compatibility reserved without device implementation
- API versioning and sunset rules clarified
- event immutability and versioning rules clarified
- audit category consistency defined
- idempotency boundaries defined
- user lifecycle states formalized
- OAuth provider strategy normalized
- password security policy strengthened
- rate-limiting standard documented
- profile evolution reserved without scope expansion
- long-term retention direction clarified without adding data-governance implementation scope

The plan remains inside the approved Phase 1.1 boundary and is ready to govern implementation.

**✅ PHASE 1.1 IMPLEMENTATION PLAN APPROVED – READY FOR CODING**
