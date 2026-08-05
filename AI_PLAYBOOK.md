# NaijaDeals AI Playbook

> This document defines how Aura AI and every AI-enabled capability in the NaijaDeals platform is engineered. It is the implementation guide for the AI policies in `AI_ENGINEERING_CONSTITUTION.md` and `AI_DEVELOPMENT_RULES.md`.
>
> For shared services context, see `SHARED_SERVICES_PLAYBOOK.md` (AI section). For integration rules, see `INTEGRATION_GATEWAY.md`. For security, see `SECURITY.md`. For the AI capability map, see `docs/AI_ATLAS.md`.

---

## 1. AI Philosophy

- **AI is assistive and governed.** Aura AI recommends, classifies, summarizes, predicts, detects, routes, and automates according to policy. It does not silently make irreversible decisions.
- **Human review for high-stakes decisions.** Money movement, escrow release, dispute outcomes, KYC/trust decisions, moderation enforcement, permission changes, and emergency actions require human approval.
- **Provider independence.** AI providers are accessed through the AI Adapter and Integration Gateway. The platform can switch models without application code changes.
- **Cost and safety are engineered.** Every capability has budgets, rate limits, fallbacks, and logging.
- **Memory is explicit and controlled.** No shadow databases of privileged state.

---

## 2. Aura AI Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                       Application Layer                       │
│  (Recommendation, Search, Support, Moderation, Personalization) │
└──────────────────┬────────────────────────────────────────────┘
                   │
┌──────────────────▼────────────────────────────────────────────┐
│                    AI Gateway / Orchestrator                    │
│   (Prompt selection, provider routing, fallback, rate limits) │
└──────────────────┬────────────────────────────────────────────┘
                   │
┌──────────────────▼────────────────────────────────────────────┐
│                     AI Adapter Layer                            │
│   (OpenAI, Gemini, Claude, local models)                      │
└──────────────────┬────────────────────────────────────────────┘
                   │
┌──────────────────▼────────────────────────────────────────────┐
│                   Vector / Memory Store                         │
│   (Embeddings, retrieval, cache, prompt context)                │
└─────────────────────────────────────────────────────────────┘
```

Aura AI is composed of:

- **AI Gateway:** Orchestrates requests, selects prompts, enforces policy, routes to adapters, and manages fallbacks.
- **AI Adapter Layer:** Provider-specific clients (OpenAI, Gemini, Claude, local inference). All adapters implement a common interface.
- **Prompt Registry:** Versioned prompt templates with metadata, expected inputs, and output schemas.
- **Memory / Vector Store:** Stores embeddings, retrieved context, and approved short-term memory.
- **Safety Layer:** Input/output moderation, policy checks, PII redaction, and review routing.
- **Observability:** Logging, cost tracking, token usage, latency, and outcome metrics.

---

## 3. Prompt Architecture

- **Prompts are versioned assets.** Every prompt has a name, version, template, expected inputs, output schema, and policy classification.
- **Prompt registry location:** `packages/ai/prompts/` or `services/ai/prompts/`.
- **Template engine:** Use a typed template system. Never concatenate raw strings into prompts.
- **Prompt categories:**
  - **System prompts:** Define behavior, constraints, and tone.
  - **Task prompts:** Specific capability prompts (summarize, classify, generate, route).
  - **Safety prompts:** Moderation, redaction, and review guidance.
- **Prompt review:** Any prompt change affecting behavior, risk, or approval pathways requires review and approval.
- **Rollback:** Prompt versions are rollbackable. Store in version control and the prompt registry.

---

## 4. Memory

- **Memory is allowed only in approved layers.** Short-term memory lives in the context window; long-term memory lives in the vector store or approved cache.
- **Context assembly is explicit.** Build context from approved data sources, not from raw dumps of user history.
- **Sensitive context is minimized and redacted.** Remove or tokenize PII, financial details, and privileged state before sending to providers.
- **No shadow database.** AI memory must not become an alternate source of truth for business state.
- **Retention classes:** Define TTL per memory class (session, user, tenant, system).

---

## 5. Embeddings and Vector DB

- **Embedding model:** Use an approved model for embeddings. Document the model and dimensionality.
- **Vector store:** Use a single approved vector database (e.g., pgvector on PostgreSQL, Pinecone, or Weaviate via adapter).
- **Data in vector store:** Only approved, non-sensitive, and policy-compliant content is embedded.
- **Search and retrieval:** Implement hybrid search (vector + keyword) where appropriate. Rank and filter results before including them in prompts.
- **Re-indexing:** Re-indexing is event-driven or scheduled. Version embeddings alongside model changes.

---

## 6. Provider Switching

- **Provider list:** OpenAI, Google Gemini, Anthropic Claude, and approved local/self-hosted models.
- **Selection criteria:**
  - Use the smallest approved capable model for the job.
  - High-cost models require justified business value.
  - Sensitive workflows require approved models and a human review path.
- **Fallback strategy:**
  - Primary provider down or slow → route to secondary provider.
  - Model unavailable → fall back to smaller approved model or rules-based degradation.
  - No safe fallback → block the action rather than guess.
- **Provider switching is configuration-driven.** No application code changes when swapping providers or models.
- **All provider access flows through the AI Adapter and Integration Gateway.** No direct SDK calls from application code.

---

## 7. Cost Optimization

- **Budgets per capability:** Define monthly and per-request budgets in `AI_MONTHLY_BUDGET_LIMIT` and per-capability configuration.
- **Rate limits:** Enforce user/role/tenant/platform limits.
- **Token burn monitoring:** Track token usage per capability, per user, per model. Alert on outliers.
- **Caching:** Cache AI responses only where privacy, correctness, and policy allow. Use deterministic cache keys for identical inputs.
- **Model tiering:** Route low-risk tasks to cheaper models; reserve expensive models for high-value tasks.
- **Context compression:** Summarize or trim context to stay within token limits and reduce cost.
- **Streaming:** Use streaming responses for long outputs where user experience benefits.

---

## 8. Context Loading

- **Context is assembled explicitly.** Load only the data required for the current AI task.
- **Context sources:** Approved database queries, vector search results, event history, user profile, and policy documents.
- **Context limits:** Respect model token limits. Prioritize recency and relevance.
- **No full repository or history dumps.** Load targeted context, not broad scans.
- **Context versioning:** Include context version or snapshot timestamp in logs for reproducibility.

---

## 9. Safety

- **Input moderation:** Scan user inputs for abuse, prompt injection, PII, and policy violations.
- **Output moderation:** Validate AI outputs against output schemas, policy rules, and safety constraints.
- **PII redaction:** Remove or tokenize PII before sending to providers and before storing responses.
- **Prompt injection defense:** Use structured prompts, input validation, and output constraints. Never trust user input as system instructions.
- **Jailbreak resistance:** Monitor for jailbreak attempts and log them.
- **Review routing:** Route high-risk outputs to human review.
- **Fail safe:** If safety checks fail, block the action, return a safe fallback, or escalate to human review.

---

## 10. Logging and Observability

Log every AI invocation at minimum:

- Actor (user, tenant, role)
- Capability invoked
- Prompt template name and version
- Policy version
- Provider and model
- Token usage (input, output, total)
- Latency
- Outcome category (success, fallback, blocked, review, error)
- Review requirement status
- Request and response correlation IDs

Store logs in the audit log and analytics pipeline. Do not log raw PII or sensitive outputs.

---

## 11. Human Review

Human review is mandatory for AI outputs that influence:

- Money movement
- Escrow release or dispute outcomes
- Trust / KYC decisions
- Moderation enforcement
- Permission or role changes
- Emergency or recovery actions
- Any action not covered by an approved policy

Review workflow:
- AI recommends.
- System flags for review.
- Authorized human approves, rejects, or requests modification.
- Decision is logged and action proceeds or is blocked.

---

## 12. Capabilities Map

Aura AI capabilities include but are not limited to:

- **Search and discovery:** Listing recommendations, query understanding, autocomplete, personalization.
- **Customer support:** Ticket routing, response drafting, FAQ retrieval.
- **Trust and safety:** Fraud detection, spam classification, content moderation.
- **Commerce:** Pricing suggestions, listing quality scoring, demand prediction.
- **Logistics:** Route optimization, delivery ETA, driver matching.
- **Finance:** Risk scoring, transaction anomaly detection, support summarization.
- **Content:** Product description generation, image tagging, translation.
- **Admin:** Report summarization, anomaly alerts, policy compliance checks.

Each capability has a documented owner, policy, model selection, fallback, and budget.

---

## 13. Testing AI

- **Unit tests:** Prompt rendering, input validation, output parsing, fallback logic.
- **Integration tests:** Adapter responses, provider error simulation, rate-limit behavior.
- **Safety tests:** Prompt injection attempts, PII leakage, policy violation inputs.
- **Evaluation suite:** Run a fixed evaluation set for each capability and track score changes across prompt/model updates.
- **A/B testing:** Compare model/prompt variants using consistent metrics and safeguards.
- **Human evaluation:** Periodic review of high-impact AI outputs.

---

## 14. Definition of Done for AI Work

An AI capability is not done until:

- Prompt is versioned, documented, and reviewed.
- Provider access uses the AI Adapter and Integration Gateway.
- Safety, moderation, and PII redaction are in place.
- Fallback behavior is defined and tested.
- Cost and rate limits are configured.
- Logging and audit events are implemented.
- Human review path is defined for high-stakes outputs.
- Tests pass, including safety and evaluation tests.
- Documentation is updated in this playbook and `docs/AI_ATLAS.md`.

---

## 15. Do Not

- Do not call AI providers directly from application code.
- Do not let AI make irreversible financial, compliance, moderation, permission, recovery, or contractual decisions without human review.
- Do not store sensitive context in AI memory without approval and redaction.
- Do not treat AI outputs as truth without verification where required.
- Do not skip logging or cost tracking.
- Do not use unapproved models for sensitive workflows.

---

## 16. Cross-References

- `AI_ENGINEERING_CONSTITUTION.md` — highest AI governance authority
- `AI_DEVELOPMENT_RULES.md` — concise AI development rules
- `SHARED_SERVICES_PLAYBOOK.md` — AI shared service context
- `INTEGRATION_GATEWAY.md` — provider adapter rules
- `SECURITY.md` — privileged actions, audit, and encryption
- `docs/AI_ATLAS.md` — AI capability map
- `COMPONENT_PLAYBOOK.md` — AI UI components (chat, suggestions, etc.)
