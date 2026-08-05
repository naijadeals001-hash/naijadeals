# NaijaDeals API Playbook

> This document defines the rules every NaijaDeals API endpoint follows. Every backend service, shared service, and vertical integration that exposes an HTTP interface must comply with this playbook.
>
> For the detailed API standards, see `API_STANDARDS.md`. For the canonical endpoint map, see `MASTER_API_MAP.md` and `API_INVENTORY.md`. For the integration gateway, see `INTEGRATION_GATEWAY.md`.

---

## 1. API Philosophy

- **Consistent over clever.** Every API behaves predictably so client teams can integrate without relearning conventions.
- **REST over HTTPS.** JSON payloads, standard HTTP verbs, and resource-oriented URLs.
- **Versioned from day one.** API versions are explicit and stable.
- **Secure by default.** Every protected endpoint validates authentication and authorization.
- **Observable and idempotent.** Mutations support idempotency keys, and every response is traceable.
- **Documented in OpenAPI.** Every public endpoint is described in the OpenAPI specification.

---

## 2. Naming Conventions

- **Base path:** `/api/v{major}/{resource}`.
- **Resource names:** plural nouns, `kebab-case`, no verbs in the path.
- **Examples:**
  - `/api/v1/users`
  - `/api/v1/listings`
  - `/api/v1/wallet-transactions`
- **Sub-resources:** `/api/v1/users/{id}/addresses`.
- **Actions that do not map to HTTP verbs:** use a sub-resource or controller noun. Example: `/api/v1/listings/{id}/publish`, `/api/v1/orders/{id}/cancel`.
- **No trailing slashes.** Redirect or reject trailing slashes consistently.
- **No file extensions.** No `.json` in URLs.

---

## 3. Versioning

- **URL versioning:** `/api/v1/`, `/api/v2/`.
- **Semantic-like versions:** Major versions indicate breaking changes. Minor and patch versions are not in the URL.
- **Deprecation:** Deprecated versions return a `Sunset` or `Deprecation` header and are documented with a removal timeline.
- **Backward compatibility:** Existing clients must continue to work for the deprecation window.
- **New breaking changes:** Only introduced in a new major version.

---

## 4. HTTP Verbs and Status Codes

| Verb | Use | Success status |
| --- | --- | --- |
| GET | Read a resource or list | `200 OK` |
| POST | Create a resource or trigger an action | `201 Created` or `200 OK` |
| PUT | Full update (replace) | `200 OK` |
| PATCH | Partial update | `200 OK` |
| DELETE | Remove a resource | `204 No Content` or `200 OK` |

Common status codes:

| Code | Meaning |
| --- | --- |
| 200 | Success |
| 201 | Created |
| 204 | No content |
| 400 | Bad request (validation error) |
| 401 | Unauthorized (authentication required) |
| 403 | Forbidden (insufficient permission) |
| 404 | Not found |
| 409 | Conflict (business rule violation) |
| 422 | Unprocessable entity (semantic error) |
| 429 | Too many requests |
| 500 | Internal server error |
| 503 | Service unavailable |

---

## 5. Request Payloads

- **Content-Type:** `application/json` for request bodies.
- **Validation:** Validate at the edge and the service layer. Reject invalid input before business logic.
- **Field naming:** `camelCase` in JSON payloads.
- **Optional fields:** Omit or `null`, but never both conventions for the same API.
- **Dates:** ISO 8601 strings with timezone (`2026-08-05T10:30:00Z`).
- **Money:** Integer minor units (e.g., `10000` for ₦100.00) with a separate `currency` field when multi-currency.
- **Arrays:** Use arrays for plural values; avoid comma-separated strings.
- **File uploads:** Use multipart/form-data for binary data; return JSON metadata.

---

## 6. Response Shape

Every successful response and error response follows a standard envelope.

### Success envelope

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "requestId": "uuid",
    "timestamp": "2026-08-05T10:30:00Z"
  }
}
```

### List envelope

```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "requestId": "uuid",
    "timestamp": "2026-08-05T10:30:00Z",
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1000,
      "totalPages": 50,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### Error envelope

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more fields are invalid.",
    "details": [
      { "field": "email", "message": "Email is required." }
    ]
  },
  "meta": {
    "requestId": "uuid",
    "timestamp": "2026-08-05T10:30:00Z"
  }
}
```

Error codes are stable, machine-readable strings. Messages are human-readable but safe to expose.

---

## 7. Validation

- **Input validation happens at the edge.** Use Zod, Yup, or the approved validation library.
- **Business validation happens in the service layer.** Example: “insufficient wallet balance”.
- **Validation errors return 400** with field-level details.
- **Business rule errors return 409 or 422** with a clear code and message.
- **No stack traces in production responses.** Log stack traces server-side only.

---

## 8. Pagination

- **Default pagination:** cursor-based for high-volume lists; offset-based for small admin lists.
- **Offset parameters:** `page` (1-based), `limit` (default 20, max 100).
- **Cursor parameters:** `cursor`, `limit`. Cursor is opaque.
- **Response includes:** `total`, `totalPages` (offset only), `hasNext`, `hasPrev`, `nextCursor`, `prevCursor`.
- **Limits:** Enforce maximum `limit` to prevent abuse.

---

## 9. Filtering and Sorting

- **Filtering:** Use query parameters matching resource fields. Example: `?status=active&category=electronics`.
- **Operators:** `eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `in`, `contains`, `startsWith`, `endsWith`.
- **Format:** `?price[gte]=1000&price[lte]=50000` or `?status=in:active,pending` depending on convention.
- **Sorting:** `?sort=-createdAt` (descending) or `?sort=createdAt` (ascending). Multiple fields: `?sort=-priority,createdAt`.
- **Search:** `?q=query` for full-text search; use search service for heavy queries.
- **Date ranges:** `?from=...&to=...` with ISO 8601 values.

---

## 10. Authentication

- **Primary mechanism:** JWT access tokens in the `Authorization` header.
- **Header format:** `Authorization: Bearer <access_token>`.
- **Token lifetimes:** Short-lived access tokens (minutes). Long-lived refresh tokens (days) with rotation.
- **Refresh endpoint:** `POST /api/v1/auth/refresh`.
- **Logout:** `POST /api/v1/auth/logout` invalidates the refresh token.
- **Third-party auth:** OAuth 2.0 / OIDC through the Identity service. Tokens are exchanged server-side.
- **No tokens in URLs.** Never pass tokens as query parameters.

See `SECURITY.md` for token and secret handling.

---

## 11. Authorization

- **Every protected endpoint checks authorization.**
- **RBAC first:** Check role/permission. Use RBAC service, not hardcoded checks.
- **ABAC second:** Check resource ownership, tenant membership, or other attributes when needed.
- **Privileged actions:** Require explicit approval flow, audit logging, and sometimes MFA. See `SECURITY.md`.
- **Forbidden vs. unauthorized:** Return `401` when identity is missing or invalid; `403` when identity is valid but permission is denied.
- **Authorization middleware:** Apply consistently to routes, not duplicated in every handler.

---

## 12. Idempotency

- **Mutating operations support idempotency keys.** `POST`, `PUT`, `PATCH`, `DELETE` where applicable.
- **Header:** `Idempotency-Key: <client-generated-uuid>`.
- **Key scope:** Per user/account and per endpoint.
- **Key lifetime:** 24 hours default. Store in Redis or database.
- **Retry behavior:** Same key + same payload returns the original result. Different payload returns a conflict.
- **Critical use cases:** wallet funding, payouts, order creation, listing publish, notification send.

---

## 13. Rate Limiting

- **Default limits:** Applied per endpoint and per user/IP.
- **Headers:** Return `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.
- **Status:** `429 Too Many Requests` when exceeded.
- **Retry-After:** Include seconds until next window.
- **Stricter limits:** Authentication, password reset, and high-cost operations (AI, search) have stricter limits.
- **Implementation:** Redis-backed rate limiter, applied at the API gateway or route middleware.

---

## 14. OpenAPI

- **Every public endpoint is documented in OpenAPI 3.x.**
- **File location:** `openapi/v1.yaml` or generated from code annotations.
- **Content:** paths, methods, parameters, request bodies, response schemas, error codes, authentication requirements.
- **SDK generation:** OpenAPI is the source for client SDKs and API documentation.
- **Review:** OpenAPI changes are reviewed alongside code changes.

---

## 15. Logging and Tracing

- **Request ID:** Every request gets a `X-Request-Id` or `correlation-id`. Propagate to downstream calls and events.
- **Structured logs:** JSON with `timestamp`, `level`, `service`, `requestId`, `actorId`, `method`, `path`, `status`, `duration`, `error`.
- **Sensitive data:** Redact tokens, passwords, and PII in logs.
- **Tracing:** Use correlation IDs across the event bus, integrations, and database queries.

---

## 16. Version Negotiation and Headers

- **Accept:** `application/json`.
- **Content-Type:** `application/json` on requests with bodies.
- **API version:** In URL path (`/api/v1/...`), not in headers, except for sunset/deprecation headers.
- **Deprecation headers:** `Deprecation: true`, `Sunset: <date>` when applicable.
- **Custom headers:** Prefer standard headers before introducing custom ones.

---

## 17. Testing APIs

- **Unit tests:** Handler logic, validation, and authorization rules.
- **Integration tests:** Full request/response cycle against test database.
- **Contract tests:** OpenAPI contract tests for public endpoints.
- **Security tests:** Broken authentication, IDOR, injection, and rate-limit bypass attempts.
- **Performance tests:** Load and latency benchmarks for high-traffic endpoints.

---

## 18. Do Not

- Do not expose internal IDs or stack traces in error responses.
- Do not version APIs in headers alone.
- Do not accept sensitive data in query parameters.
- Do not implement business logic in middleware or controllers.
- Do not skip OpenAPI documentation for public endpoints.
- Do not bypass rate limiting or authorization for convenience.
- Do not return 200 for failed operations.

---

## 19. Cross-References

- `API_STANDARDS.md` — detailed REST conventions, error shapes, and idempotency rules
- `MASTER_API_MAP.md` — canonical endpoint map
- `API_INVENTORY.md` — categorized API inventory
- `SECURITY.md` — authentication, authorization, and privileged action rules
- `INTEGRATION_GATEWAY.md` — external provider access rules
- `FRONTEND_PLAYBOOK.md` — frontend data fetching and caching conventions
- `SHARED_SERVICES_PLAYBOOK.md` — shared services API responsibilities
