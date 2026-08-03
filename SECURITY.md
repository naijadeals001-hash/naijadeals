# SECURITY

## Security Posture

NaijaDeals handles identity, trust, payments, logistics, moderation, and AI-assisted operations. Security is therefore a design constraint, not a release-day apology.

## Authentication

- centralized identity platform
- MFA for privileged roles and sensitive workflows
- session management with revocation support
- device/session anomaly detection for high-risk actions

## Authorization

- RBAC plus fine-grained permissions and scoped access
- resource-level enforcement for admin, finance, support, moderation, and operations actions
- separation of duties for finance, refunds, payouts, permission changes, environment changes, and policy overrides
- privileged actions governed by `docs/MASTER_PERMISSION_MATRIX.md`

## Privileged Action Security Rules

Every privileged action must define:

- required role
- approval requirement
- maker-checker requirement
- audit evidence
- notification behavior
- emergency override rule

High-risk privileged actions include:

- wallet adjustments
- escrow release overrides
- refund approvals
- merchant or driver suspension
- role assignment and permission changes
- AI configuration changes
- environment changes
- API key rotation
- system recovery and emergency access
- super admin policy actions

## Emergency Access and Break-Glass Rule

- emergency access is allowed only for approved incident or recovery scenarios
- emergency access must be time-bound, attributable, and logged before or at activation
- emergency access must trigger immediate notification to designated governance/security recipients
- emergency access requires post-incident review and retroactive approval evidence

## Secrets and Environment Variables

- no secrets in code, client bundles, or git history
- use managed secret storage
- rotate secrets on schedule and on incident
- API key rotation is a privileged action with audit and notification requirements
- see `ENVIRONMENT_VARIABLES.md`

## Encryption

- TLS for all traffic
- encrypt sensitive data at rest using managed KMS-backed keys where available
- separate key material and application data
- heightened protection for identity, wallet, escrow, trust, moderation, and AI-sensitive records

## Audit Event Requirements

Required for at minimum:
- login and session events
- permission changes
- payout / refund / settlement actions
- escrow changes
- moderation decisions
- KYC decisions
- AI-assisted high-risk actions
- admin configuration changes
- emergency access
- replay / compensation / DLQ reprocessing of privileged workflows

Required audit fields:
- actor ID and role
- action name
- target resource
- approval reference where applicable
- before/after state reference where applicable
- correlation ID
- reason code / justification
- timestamp

## Webhook and Callback Security

- signature verification required
- replay detection required
- idempotency enforcement required
- callbacks must enter the platform through governed adapter or owning-domain verification flow
- financial/provider callbacks require audit evidence and anomaly monitoring

## Rate Limiting and Abuse Control

Apply layered controls to:
- login and OTP
- public search
- messaging
- AI inference
- payment actions
- admin mutation routes
- upload endpoints
- privileged approval endpoints

## Monitoring and Detection

- centralized security logging
- alerting on suspicious auth patterns, payout anomalies, moderation spikes, privilege escalation attempts, emergency access, and API abuse
- provider and adapter failure monitoring
- incident runbooks and escalation paths

## AI Security

- prompt injection resistance measures
- context filtering and minimization
- tenant and actor isolation
- sensitive tool-use approvals
- model/provider failover safety
- redaction and logging policy
- human review for sensitive operations as defined in AI governance

## Data Governance

- minimize stored PII
- mask or tokenize sensitive values where feasible
- apply retention policies by domain and legal requirement
- protect legal-hold and evidence records from accidental deletion
