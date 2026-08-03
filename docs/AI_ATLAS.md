# AI ATLAS

The AI Atlas defines the official enterprise AI blueprint for Aura AI and all future AI-enabled capability in the NaijaDeals Super Ecosystem. No AI implementation is performed in this phase.

## 1. AI Philosophy

- AI is a governed platform capability, not a bag of random prompts glued onto screens.
- AI should improve speed, insight, safety, search quality, and decision support without erasing human accountability.
- The platform must remain provider-agnostic through the AI Router and Provider Abstraction Layer.

## 2. Aura AI Architecture

Core layers:
1. AI Experience Layer
2. Aura AI Platform Layer
3. AI Router
4. Provider Abstraction Layer
5. Memory & Context Layer
6. Policy & Governance Layer
7. Observability Layer

## 3. AI Memory Boundaries

Memory is allowed only in governed layers:

- **Request context** — immediate workflow context only.
- **Session context** — current journey or operator case state.
- **Approved retrieval** — explicitly approved domain records and policy documents.
- **Longer-lived memory** — allowed only for approved use cases with defined retention class.

Memory is prohibited from becoming:

- a hidden replica of privileged records
- an uncontrolled PII archive
- a substitute for authoritative transactional state
- a cross-tenant or cross-role data leak vector

## 4. Prompt Versioning and Policy Control

- prompt templates are versioned assets
- every production prompt has an owner, capability name, version, review status, and change history
- sensitive prompts require regression validation before activation
- policy version and prompt version must be linked in AI audit records for sensitive operations

## 5. Model Selection Policy

| Use Case | Preferred Policy |
| --- | --- |
| classification/extraction | smallest approved capable model |
| summarization/drafting | mid-tier model with bounded context |
| complex reasoning/high-value analytics | higher-tier approved model only where business value justifies cost |
| sensitive operations | approved model + human review path |

Selection criteria:
- capability fit
- privacy classification
- latency target
- cost budget
- fallback availability
- safety profile

## 6. Fallback Strategy

Fallback order must be explicit per capability:

- provider fallback where policy allows
- smaller/simpler model fallback where answer quality remains acceptable
- retrieval-only or rules-based fallback where AI is unavailable
- human review/manual queue for sensitive workflows
- graceful disablement if no safe fallback exists

## 7. Cost Controls and Rate Limits

- budget per capability family
- monthly and per-actor guardrails
- role-based and tenant-based rate limits
- anomaly detection for token spikes or prompt loops
- cache use only where privacy and correctness allow
- premium model use restricted to approved workflows

## 8. Human Review Requirements

Human review is mandatory for AI outputs that materially affect:

- money movement
- escrow release or dispute outcome
- merchant/driver suspension
- KYC / trust risk outcome
- permission or role changes
- legal/compliance interpretation
- emergency or recovery actions

## 9. Sensitive Operation Boundary

AI may assist with sensitive workflows by summarizing, recommending, or classifying, but it may not silently finalize high-risk actions without the approval path defined in governance documents.

## 10. AI Audit Logging

Every AI invocation must capture at minimum:

- actor and role
- capability invoked
- prompt template version
- policy version
- provider/model
- token usage and latency
- context classification
- cache hit/miss
- output class or action recommendation
- human review requirement status
- final disposition for sensitive workflows

## 11. AI Approval Boundaries

| Capability Class | Approval Boundary |
| --- | --- |
| low-risk drafting/summarization | product/technical approval only |
| recommendation and ranking assistance | technical approval + monitoring approval |
| fraud/trust/moderation assistance | governance and security aware approval |
| action-triggering or state-changing AI | explicit governance approval + human review path |

## 12. AI Monitoring & Error Recovery

- provider health checks
- router health checks
- timeout policy
- fallback provider strategy
- degraded-mode responses
- manual escalation for blocked high-risk actions
- audit preservation during failure paths

## 13. AI Role Capability Matrix

| Role | Primary AI Capabilities |
| --- | --- |
| Customer | recommendations, search assist, support summarization, journey guidance |
| Merchant | catalog optimization, demand insight, support draft assist, analytics narration |
| Supplier / Farmer / Restaurant / Host / Freelancer / Creator / Driver | role-scoped guidance, summarization, analytics or planning assist |
| Support | conversation summarization, reply drafting, triage recommendations |
| Finance / Operations / Moderator | anomaly review support, prioritization, explanation assistance |
| Super Administrator | governance summaries, policy impact insight, anomaly dashboards |

## 14. Module AI Capability Matrix

| Module | AI Capability Set |
| --- | --- |
| NaijaShop | recommendations, search assist, merchant support, fraud signals |
| NaijaWholesale | supplier discovery intelligence, negotiation support, analytics assist |
| NaijaAgro | price intelligence, demand forecasting, logistics insight |
| NaijaSend | shipment ETA intelligence, anomaly detection, support assist |
| NaijaDrive | dispatch optimization, route insight, driver assist |
| NaijaEats | demand forecasting, support AI, operational alerting |
| NaijaStay | recommendation, trust summarization, incident summarization |
| NaijaGigs | matching, proposal assist, dispute summarization |
| NaijaStream | recommendations, moderation assist, creator analytics |

## 15. Governance Rule

Any future AI implementation must reference `AI_DEVELOPMENT_RULES.md`, `ARCHITECTURE.md`, `SECURITY.md`, `INTEGRATION_GATEWAY.md`, `FEATURE_MATRIX.md`, `docs/MASTER_PERMISSION_MATRIX.md`, and this `docs/AI_ATLAS.md`.
