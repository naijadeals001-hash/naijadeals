FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
COPY apps/platform-api/package.json ./apps/platform-api/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/config/package.json ./packages/config/package.json
COPY packages/di/package.json ./packages/di/package.json
COPY packages/errors/package.json ./packages/errors/package.json
COPY packages/events/package.json ./packages/events/package.json
COPY packages/integration-gateway/package.json ./packages/integration-gateway/package.json
COPY packages/logger/package.json ./packages/logger/package.json
RUN npm install

FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/platform-api/dist ./apps/platform-api/dist
COPY --from=builder /app/node_modules ./node_modules
COPY .env.example ./.env.example
CMD ["node", "apps/platform-api/dist/index.js"]
