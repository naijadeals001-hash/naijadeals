# NAIJADEALS SUPER ECOSYSTEM
# PROJECT_RULES.md

Version: 1.0

This document governs every human developer, AI coding assistant, contractor, freelancer, and automation tool contributing to the NaijaDeals Super Ecosystem.

Failure to follow these rules is considered a violation of the engineering standards of this repository.

---

# 1. PROJECT VISION

NaijaDeals is NOT:

- a demo
- an MVP
- a prototype
- a landing page
- a proof of concept

NaijaDeals is a production-ready enterprise software platform.

Every implementation must support long-term scalability.

---

# 2. ECOSYSTEM PHILOSOPHY

NaijaDeals is ONE platform.

It is NOT multiple independent applications.

Every module shares:

- Identity
- Wallet
- Escrow
- Trust
- Search
- Notifications
- Messaging
- Audit
- AI
- Analytics

Never duplicate these systems.

---

# 3. OFFICIAL IMPLEMENTATION REFERENCES

The following documents are contractual engineering references.

They MUST be followed.

- Google Stitch UI/UX Atlas
- Workflow Atlas
- Architecture Atlas
- Operations Atlas
- AI Atlas
- Prompt Library
- PROJECT_RULES.md
- ARCHITECTURE.md

---

# 4. STITCH RULE

Google Stitch is the official UI/UX reference.

However:

DO NOT blindly copy Stitch.

Instead:

Review every screen.

Identify:

- Missing screens
- Missing dashboards
- Missing workflows
- Missing APIs
- Missing automation
- Missing AI
- Missing permissions
- Missing database entities

Improve Stitch where necessary.

Never reduce functionality because Stitch omitted something.

---

# 5. FOUNDATION FIRST

Build in this order:

Identity

↓

Wallet

↓

Escrow

↓

Trust

↓

Notifications

↓

Messaging

↓

Search

↓

Audit

↓

Analytics

↓

Aura AI

↓

Commerce

↓

Logistics

↓

Marketplace Modules

---

# 6. SHARED SERVICES

Every module MUST reuse:

Authentication

Authorization

Wallet

Escrow

Trust

Messaging

Notifications

AI

Search

Support

Audit

Analytics

Never create duplicates.

---

# 7. TECHNOLOGY STACK

Frontend

Next.js

TypeScript

TailwindCSS

Backend

Node.js

TypeScript

REST APIs

Database

PostgreSQL

Caching

Redis

Automation

n8n

Containers

Docker

Infrastructure

KVM2

KVM4

Google Cloud (where beneficial)

Maps

Google Maps Platform

AI

OpenAI (Primary)

Google Gemini (Secondary)

Claude (Optional Fallback)

Never hardcode a single AI provider.

Always use provider abstraction.

---

# 8. DEVELOPMENT STANDARD

Every feature must be:

Production Ready

Database Connected

API Connected

Authenticated

Authorized

Documented

Tested

Audited

No fake implementations.

---

# 9. ABSOLUTELY PROHIBITED

Do NOT create:

Fake dashboards

Hardcoded JSON pretending to be backend

Fake wallet balances

Fake shipment tracking

Fake analytics

Placeholder APIs

Temporary production code

Business logic in frontend

Secrets inside repository

Duplicate authentication systems

Duplicate wallet systems

Duplicate AI systems

---

# 10. EVERY SCREEN MUST WORK

Every screen must:

Save data

Retrieve data

Validate data

Call APIs

Enforce permissions

Generate audit logs

Use shared services

---

# 11. SECURITY

Never:

Commit secrets

Commit API keys

Commit passwords

Commit JWT secrets

Store secrets in frontend

Always:

Use .env

Use secret management

Use RBAC

Use audit logs

---

# 12. GITHUB

Every feature:

Commit

Push

Document

Never leave work only on local machine.

---

# 13. DATABASE

Every change requires:

Migration

Indexes

Relationships

Constraints

Documentation

---

# 14. APIs

Every endpoint must have:

Authentication

Authorization

Validation

Error handling

Logging

Documentation

---

# 15. AI

Aura AI controls all AI.

Never directly connect frontend to OpenAI.

Always:

Frontend

↓

Backend

↓

Aura AI

↓

Provider Router

↓

AI Provider

---

# 16. N8N

Automation belongs inside n8n.

Business logic belongs inside backend.

Never place core business logic exclusively inside n8n.

---

# 17. GOOGLE SERVICES

Google services are encouraged for:

Maps

GPS

Navigation

Firebase

Gemini

Cloud Monitoring

Cloud Logging

OAuth

But:

Core application remains deployable without Google Cloud.

Avoid vendor lock-in.

---

# 18. CODE QUALITY

Every pull request should improve:

Performance

Security

Readability

Scalability

Maintainability

Documentation

Never reduce code quality.

---

# 19. DOCUMENTATION

Every completed feature requires documentation.

Minimum:

README updates

API documentation

Database documentation

Deployment notes

---

# 20. DEVELOPER DUTY

Every developer has a professional obligation to identify:

Missing workflows

Missing dashboards

Missing APIs

Missing AI

Missing automation

Security weaknesses

Performance issues

Scalability risks

Do NOT silently ignore these issues.

Document them.

Recommend improvements.

---

# 21. FUTURE MODULES

The architecture must support:

NaijaWholesale

NaijaAgro

NaijaStay

NaijaGigs

NaijaStream

NaijaHealth

NaijaJobs

NaijaLearn

NaijaInsurance

without architectural redesign.

---

# 22. FINAL RULE

Every commit should make NaijaDeals closer to becoming Africa's most trusted digital super ecosystem.

If a change makes the architecture worse,

DO NOT MERGE IT.