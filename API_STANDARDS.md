# API STANDARDS

## Style

- Primary style: REST over HTTPS.
- JSON request and response payloads unless explicitly approved otherwise.
- Resource-oriented URLs using plural nouns.
- Versioned APIs using URL versioning, e.g. `/api/v1/...`.

## Naming

- Use lowercase, kebab-free path segments where possible; prefer `/api/v1/orders` over action-heavy paths.
- Actions that do not map cleanly to CRUD should be nested resources or well-named commands, e.g. `/api/v1/escrows/{id}/release`.
- Avoid leaking provider names into public API contracts.

## Authentication

- Authenticated APIs must require access tokens issued by the identity platform.
- Machine-to-machine APIs must use scoped service credentials.
- Session and token strategy must be documented centrally.

## Authorization

- Authorization is mandatory at route, resource, and action level.
- Role checks alone are insufficient for sensitive actions; use permission and scope checks.
- Finance, moderation, and admin APIs require segregation-of-duties aware authorization.

## Validation

- Validate request structure, types, enums, and business preconditions before processing.
- Reject unknown fields where strict contracts are required.
- Never rely on frontend validation as the only validation layer.

## Response Format

Success response shape:

```json
{
  "success": true,
  "data": {},
  "meta": {},
  "request_id": "..."
}
```

Error response shape:

```json
{
  "success": false,
  "error": {
    "code": "DOMAIN_ERROR_CODE",
    "message": "Human-readable summary",
    "details": {}
  },
  "request_id": "..."
}
```

## Errors

- Use stable domain error codes.
- Never leak secrets, raw provider payloads, or internal stack traces in API responses.
- Map validation, auth, permission, conflict, and upstream errors consistently.

## Pagination

- Default style: cursor pagination for large mutable datasets.
- Offset pagination may be allowed for stable admin reports or small datasets only.
- Response metadata must document paging cursors or total counts explicitly.

## Rate Limiting

- Rate limits must exist at gateway and service levels where necessary.
- Sensitive flows: login, OTP, search, AI inference, messaging, payments, refunds, moderation actions.
- Limits must be actor-aware and abuse-aware.

## Idempotency

- Required for payment creation, payout initiation, escrow release, booking confirmation, and other retry-prone operations.
- Use idempotency keys for externally visible write operations where duplicates would be costly.

## Logging and Observability

- Every request gets a request ID.
- High-risk API actions must emit audit events.
- Logs must capture actor, route, latency, status class, and correlation IDs.

## Testing Standards

- Unit tests for validation and domain logic.
- Integration tests for route + service + persistence behavior.
- Contract tests for provider adapter boundaries.
- Security and rate-limit tests for high-risk endpoints.

## API Review Gate

No API may be implemented unless it references:
- `PROJECT_RULES.md`
- `ARCHITECTURE.md`
- `MASTER_API_MAP.md`
- `SECURITY.md`
- `INTEGRATION_GATEWAY.md`
