# AI DEVELOPMENT RULES

## Purpose

These rules govern future AI implementation for Aura AI and all AI-enabled platform capability.

## Core AI Policy

- AI is assistive and governed.
- AI may recommend, classify, summarize, predict, detect, route, or automate according to policy.
- AI may not silently make irreversible financial, compliance, moderation, permission, recovery, or contractual decisions.

## Memory and Context Rules

- memory is allowed only in approved layers and retention classes
- sensitive context must be minimized and redacted where possible
- context assembly must be explicit, testable, and policy-aware
- AI memory may not become a shadow database of privileged state

## Prompt Versioning Rules

- prompts are versioned assets
- prompt changes affecting behavior, risk, or approval pathways require review
- sensitive prompt versions must be auditable and rollbackable

## Model Selection Policy

- use the smallest approved capable model for the job
- high-cost models require justified business value
- sensitive workflows require approved models and human review path
- provider access must occur only through the AI Adapter / provider abstraction layer

## Fallback and Failure Rules

- every production AI capability must define safe fallback behavior
- fallback may use alternate provider, smaller approved model, rules-based degradation, or manual review
- if no safe fallback exists, block the action rather than guess

## Logging

Log at minimum:
- actor
- capability invoked
- prompt template version
- policy version
- provider/model
- token usage
- latency
- outcome category
- review requirement status

## Cost and Rate Governance

- define budgets per capability
- enforce user/role/tenant/platform rate limits
- monitor token burn and outlier prompts
- cache only where privacy and correctness rules allow

## Human Review Requirements

Human review is mandatory for AI outputs that influence:
- money movement
- escrow release or dispute outcomes
- trust / KYC decisions
- moderation enforcement
- permission or role changes
- emergency or recovery actions

## Approval Rules

Any AI feature that changes real-world state or materially affects user, financial, trust, compliance, or permission outcomes must support:
- audit logging
- policy checks
- human override or approval where required
- post-decision reviewability
