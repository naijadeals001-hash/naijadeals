# INTEGRATION GATEWAY

Phase 0 policy document for future external service integration architecture. No implementation is performed in this phase.

## Policy

- No NaijaDeals module may communicate directly with third-party providers.
- All external service access must route through a dedicated Integration Gateway.
- Each provider category must be encapsulated behind an adapter contract.
- Adapters are future implementation concerns; Phase 0 only documents the intended structure.

## Target Adapter Families

### Google Adapter

- **Potential providers:** OAuth, Maps, Places, Directions, Geocoding, Distance Matrix, Cloud Storage, Firebase Cloud Messaging, Gemini, Cloud Logging, Cloud Monitoring, Secret Manager
- **Future purpose:** Provide a stable internal contract so modules remain decoupled from provider-specific SDKs, rate limits, auth methods, and failure modes.

### Payment Adapter

- **Potential providers:** Paystack, Flutterwave
- **Future purpose:** Provide a stable internal contract so modules remain decoupled from provider-specific SDKs, rate limits, auth methods, and failure modes.

### AI Adapter

- **Potential providers:** OpenAI, Google Gemini
- **Future purpose:** Provide a stable internal contract so modules remain decoupled from provider-specific SDKs, rate limits, auth methods, and failure modes.

### SMS Adapter

- **Potential providers:** Termii
- **Future purpose:** Provide a stable internal contract so modules remain decoupled from provider-specific SDKs, rate limits, auth methods, and failure modes.

### Email Adapter

- **Potential providers:** Resend
- **Future purpose:** Provide a stable internal contract so modules remain decoupled from provider-specific SDKs, rate limits, auth methods, and failure modes.

### KYC Adapter

- **Potential providers:** Smile Identity (or adapter-compatible equivalent)
- **Future purpose:** Provide a stable internal contract so modules remain decoupled from provider-specific SDKs, rate limits, auth methods, and failure modes.

### Media Adapter

- **Potential providers:** Cloudinary
- **Future purpose:** Provide a stable internal contract so modules remain decoupled from provider-specific SDKs, rate limits, auth methods, and failure modes.

### Analytics Adapter

- **Potential providers:** Google Analytics, Microsoft Clarity
- **Future purpose:** Provide a stable internal contract so modules remain decoupled from provider-specific SDKs, rate limits, auth methods, and failure modes.

### Weather Adapter

- **Potential providers:** OpenWeather
- **Future purpose:** Provide a stable internal contract so modules remain decoupled from provider-specific SDKs, rate limits, auth methods, and failure modes.

### Storage Adapter

- **Potential providers:** Google Cloud Storage
- **Future purpose:** Provide a stable internal contract so modules remain decoupled from provider-specific SDKs, rate limits, auth methods, and failure modes.

### Notification Adapter

- **Potential providers:** Firebase Cloud Messaging, Resend, Termii
- **Future purpose:** Provide a stable internal contract so modules remain decoupled from provider-specific SDKs, rate limits, auth methods, and failure modes.

### Search Adapter

- **Potential providers:** Meilisearch
- **Future purpose:** Provide a stable internal contract so modules remain decoupled from provider-specific SDKs, rate limits, auth methods, and failure modes.

### Government Adapter

- **Potential providers:** Regulatory / government integrations via approved adapter layer only
- **Future purpose:** Provide a stable internal contract so modules remain decoupled from provider-specific SDKs, rate limits, auth methods, and failure modes.

### Future Adapters

- **Potential providers:** Any additional external provider must integrate only through the gateway and adapter contract
- **Future purpose:** Provide a stable internal contract so modules remain decoupled from provider-specific SDKs, rate limits, auth methods, and failure modes.

## Module Interaction Rule

- UI modules may trigger user flows that eventually require external data or side effects.
- Those integrations must be represented in future architecture documents as calls to the Integration Gateway, never direct provider calls from module services.

## Why This Matters

- Prevents vendor lock-in.
- Simplifies failover and provider substitution.
- Centralizes observability, security, secrets, rate limiting, and policy enforcement.
- Keeps enterprise governance sane instead of artisanal and expensive.