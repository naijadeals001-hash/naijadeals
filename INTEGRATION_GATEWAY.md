# INTEGRATION GATEWAY

The Integration Gateway is mandatory. No module or shared service may directly embed third-party provider coupling in domain logic.

## Responsibilities

- provider abstraction
- auth and credential isolation
- rate limiting and quota awareness
- retries, circuit breaking, and fallback
- response normalization
- logging and metrics
- policy enforcement
- provider substitution without domain contract breakage

## Adapter Matrix

| Adapter | Providers | Contract Rule |
| --- | --- | --- |
| Google Adapter | Google OAuth, Google Maps, Google Places, Google Directions, Google Geocoding, Google Distance Matrix, Google Cloud Storage, Firebase Cloud Messaging, Gemini, Google Cloud Logging, Google Cloud Monitoring, Secret Manager | Replaceable adapter interface with provider-specific implementation hidden behind internal contract. |
| Cloudflare Adapter | DNS, CDN, SSL, WAF, Cache, Rate Limiting | Replaceable adapter interface with provider-specific implementation hidden behind internal contract. |
| Payment Adapter | Paystack, Flutterwave | Replaceable adapter interface with provider-specific implementation hidden behind internal contract. |
| AI Adapter | OpenAI, Google Gemini | Replaceable adapter interface with provider-specific implementation hidden behind internal contract. |
| SMS Adapter | Termii | Replaceable adapter interface with provider-specific implementation hidden behind internal contract. |
| Email Adapter | Resend | Replaceable adapter interface with provider-specific implementation hidden behind internal contract. |
| KYC Adapter | Smile Identity | Replaceable adapter interface with provider-specific implementation hidden behind internal contract. |
| Weather Adapter | OpenWeather | Replaceable adapter interface with provider-specific implementation hidden behind internal contract. |
| Media Adapter | Cloudinary | Replaceable adapter interface with provider-specific implementation hidden behind internal contract. |
| Storage Adapter | Google Cloud Storage | Replaceable adapter interface with provider-specific implementation hidden behind internal contract. |
| Analytics Adapter | Google Analytics, Microsoft Clarity | Replaceable adapter interface with provider-specific implementation hidden behind internal contract. |
| Notification Adapter | Firebase Cloud Messaging, Resend, Termii | Replaceable adapter interface with provider-specific implementation hidden behind internal contract. |
| Search Adapter | Meilisearch | Replaceable adapter interface with provider-specific implementation hidden behind internal contract. |
| Government Adapter | Government / regulator integrations via approved adapter only | Replaceable adapter interface with provider-specific implementation hidden behind internal contract. |

## Required Gateway Behaviors

- standardized error mapping
- request correlation IDs
- timeout policy
- retry policy by provider category
- secrets managed outside application code
- health visibility and alerting
- failover-ready abstraction where justified

## Direct Coupling Prohibited

- No payment SDK inside commerce domain logic.
- No mapping SDK inside delivery orchestration logic.
- No LLM SDK scattered across feature modules.
- No direct SMS/email vendor calls from support or notification domain services.

## Review Rule

Any future implementation that bypasses the Integration Gateway must be rejected in review.
