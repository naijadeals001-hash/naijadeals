import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { buildApp } from '../src/app.js';

process.env.NODE_ENV = 'test';
process.env.APP_ENV = 'local';
process.env.APP_NAME = 'NaijaDeals';
process.env.WEB_PORT = '3000';
process.env.API_PORT = '4000';
process.env.WEB_BASE_URL = 'http://localhost:3000';
process.env.API_BASE_URL = 'http://localhost:4000';
process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/app';
process.env.REDIS_URL = 'redis://localhost:6379';
process.env.LOG_LEVEL = 'silent';

const app = buildApp();

describe('platform api health routes', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns liveness payload', async () => {
    const response = await app.inject({ method: 'GET', url: '/health/live' });
    expect(response.statusCode).toBe(200);
    expect(response.json().success).toBe(true);
  });

  it('returns correlation headers on readiness', async () => {
    const response = await app.inject({ method: 'GET', url: '/health/ready' });
    expect(response.statusCode).toBe(200);
    expect(response.headers['x-request-id']).toBeDefined();
    expect(response.headers['x-correlation-id']).toBeDefined();
  });
});
