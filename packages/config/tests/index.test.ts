import { describe, expect, it } from 'vitest';
import { loadConfig } from '../src/index.js';

describe('loadConfig', () => {
  it('parses the platform env contract', () => {
    const config = loadConfig({
      NODE_ENV: 'development',
      APP_ENV: 'local',
      APP_NAME: 'NaijaDeals',
      WEB_PORT: '3000',
      API_PORT: '4000',
      WEB_BASE_URL: 'http://localhost:3000',
      API_BASE_URL: 'http://localhost:4000',
      DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/app',
      REDIS_URL: 'redis://localhost:6379',
      LOG_LEVEL: 'info'
    });
    expect(config.apiPort).toBe(4000);
  });
});
