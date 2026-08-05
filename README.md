# NaijaDeals Super Ecosystem — Milestone 1.0 Platform Foundation

This repository contains the enterprise platform skeleton for the NaijaDeals Super Ecosystem. It intentionally stops at infrastructure, contracts, and shared engineering patterns.

## Included
- Monorepo workspace for web, platform API, and shared packages
- Prisma schema for audit and outbox foundation tables
- Redis and PostgreSQL infrastructure definitions
- Health check, logging, error handling, request context, and dependency injection skeletons
- Integration Gateway abstraction only
- Notification, AI, and authentication contracts only
- CI/CD, linting, formatting, testing, and build pipeline scaffolding

## Explicitly Excluded in Milestone 1.0
- Business logic and business workflows
- Public or private business APIs
- Identity implementation, registration, or authentication flows
- Wallet, escrow, messaging, search, commerce, or AI execution
- Notification delivery implementation
- Live provider connectivity in Integration Gateway

## Quick Start
1. Copy `.env.example` to `.env`
2. Install dependencies with `npm install`
3. Start infrastructure with `docker compose up -d postgres redis`
4. Run `npm run db:generate`
5. Run `npm run dev`

## Quality Gates
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
