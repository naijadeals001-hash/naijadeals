# API INVENTORY

Approved provider inventory for future architecture. These integrations are documented only; none are implemented in this phase.

| Provider | Purpose | Adapter | Environment Variables | Fallback Provider | Future Alternatives |
| --- | --- | --- | --- | --- | --- |
| Google Cloud | Cloud platform services, logging, monitoring, storage, secret management | Google Adapter / Storage Adapter / Analytics Adapter | GOOGLE_CLOUD_PROJECT_ID, GOOGLE_CLOUD_STORAGE_BUCKET | Cloud provider fallback by service type | AWS, Azure, other provider-specific equivalents |
| Google Maps | Maps, places, directions, geocoding, distance matrix | Google Adapter | GOOGLE_MAPS_API_KEY | Alternative mapping provider through adapter | Mapbox, Here, OpenStreetMap stack |
| Google OAuth | Social login / identity federation | Google Adapter | GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET | Local / alternative identity federation | Auth0, Azure AD B2C, custom OIDC |
| Gemini | AI inference and multimodal capability | AI Adapter | GEMINI_API_KEY | OpenAI or alternative model provider | Anthropic, open-source hosting |
| Firebase | Push notifications / messaging infrastructure | Notification Adapter | FIREBASE_PROJECT_ID, FIREBASE_SERVICE_ACCOUNT_JSON | Alternate push stack via adapter | OneSignal, direct APNs/FCM abstractions |
| Cloudflare | Edge security, DNS, SSL, WAF, cache | Cloudflare Adapter | CLOUDFLARE_API_TOKEN | Edge platform fallback | Fastly, Akamai, native cloud edge |
| Paystack | Payments and collections | Payment Adapter | PAYSTACK_SECRET_KEY | Flutterwave or secondary PSP | Moniepoint, Stripe if geography permits |
| Flutterwave | Payments and collections / payouts | Payment Adapter | FLUTTERWAVE_SECRET_KEY | Paystack or secondary PSP | Stripe, Interswitch, regional PSPs |
| OpenAI | LLM inference / AI capabilities | AI Adapter | OPENAI_API_KEY | Gemini or alternate provider | Anthropic, open-source model stack |
| Resend | Transactional email | Email Adapter | RESEND_API_KEY | SMTP or alternate email provider | SendGrid, Postmark, SES |
| Termii | SMS / OTP messaging | SMS Adapter | TERMII_API_KEY | Secondary SMS route via adapter | Twilio, Africa's Talking |
| Cloudinary | Media storage, transformations, delivery | Media Adapter | CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET | Storage + image pipeline fallback | Imgix, ImageKit, self-hosted media pipeline |
| OpenWeather | Weather context for logistics / agriculture | Weather Adapter | OPENWEATHER_API_KEY | Alternative weather provider | Tomorrow.io, WeatherAPI |
| Smile Identity | KYC and verification | KYC Adapter | SMILE_IDENTITY_API_KEY, SMILE_IDENTITY_PARTNER_ID | Manual or alternate provider fallback | Dojah, VerifyMe, provider-compatible equivalent |
| Google Analytics | Product analytics | Analytics Adapter | GA_MEASUREMENT_ID | Alternate analytics routing | PostHog, Segment |
| Microsoft Clarity | Session analytics and UX diagnostics | Analytics Adapter | CLARITY_PROJECT_ID | Alternate behavioral analytics | Hotjar, FullStory |
| Sentry | Error monitoring and alerting | Analytics Adapter / Observability Adapter | SENTRY_DSN | Alternate error monitoring | Bugsnag, Datadog |
| Meilisearch | Universal search index | Search Adapter | MEILISEARCH_HOST, MEILISEARCH_API_KEY | Fallback search engine via adapter | OpenSearch, Elasticsearch, Typesense |
