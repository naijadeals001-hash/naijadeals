# EXTERNAL SERVICES

Phase 0 registry of intended third-party service categories for future development. These are documented only and not implemented in this phase.

## Google Adapter

- OAuth
- Maps
- Places
- Directions
- Geocoding
- Distance Matrix
- Cloud Storage
- Firebase Cloud Messaging
- Gemini
- Cloud Logging
- Cloud Monitoring
- Secret Manager

## Payment Adapter

- Paystack
- Flutterwave

## AI Adapter

- OpenAI
- Google Gemini

## SMS Adapter

- Termii

## Email Adapter

- Resend

## KYC Adapter

- Smile Identity (or adapter-compatible equivalent)

## Media Adapter

- Cloudinary

## Analytics Adapter

- Google Analytics
- Microsoft Clarity

## Weather Adapter

- OpenWeather

## Storage Adapter

- Google Cloud Storage

## Notification Adapter

- Firebase Cloud Messaging
- Resend
- Termii

## Search Adapter

- Meilisearch

## Government Adapter

- Regulatory / government integrations via approved adapter layer only

## Future Adapters

- Any additional external provider must integrate only through the gateway and adapter contract

## Observations

- Google services dominate identity, mapping, storage, messaging, monitoring, and AI support needs.
- Payment providers require adapter isolation because regional provider reliability, settlement rules, and feature parity can change.
- AI providers should remain provider-agnostic so safety, cost, latency, and model quality can be optimized later.
- Messaging, analytics, and KYC vendors must remain replaceable for compliance and cost-control reasons.