import { z } from 'zod';
import type { AppEnvironment } from '@naijadeals/types';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  APP_ENV: z.enum(['local', 'development', 'staging', 'production']).default('local'),
  APP_NAME: z.string().min(1),
  WEB_PORT: z.coerce.number().int().positive().default(3000),
  API_PORT: z.coerce.number().int().positive().default(4000),
  WEB_BASE_URL: z.string().url(),
  API_BASE_URL: z.string().url(),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  LOG_LEVEL: z.string().default('info'),
  GOOGLE_CLIENT_ID: z.string().optional().default(''),
  GOOGLE_CLIENT_SECRET: z.string().optional().default(''),
  SENTRY_DSN: z.string().optional().default('')
});

export type PlatformConfig = {
  nodeEnv: 'development' | 'test' | 'production';
  appEnv: AppEnvironment;
  appName: string;
  webPort: number;
  apiPort: number;
  webBaseUrl: string;
  apiBaseUrl: string;
  databaseUrl: string;
  redisUrl: string;
  logLevel: string;
  googleClientId?: string;
  googleClientSecret?: string;
  sentryDsn?: string;
};

export const loadConfig = (source: NodeJS.ProcessEnv = process.env): PlatformConfig => {
  const parsed = envSchema.parse(source);
  return {
    nodeEnv: parsed.NODE_ENV,
    appEnv: parsed.APP_ENV,
    appName: parsed.APP_NAME,
    webPort: parsed.WEB_PORT,
    apiPort: parsed.API_PORT,
    webBaseUrl: parsed.WEB_BASE_URL,
    apiBaseUrl: parsed.API_BASE_URL,
    databaseUrl: parsed.DATABASE_URL,
    redisUrl: parsed.REDIS_URL,
    logLevel: parsed.LOG_LEVEL,
    googleClientId: parsed.GOOGLE_CLIENT_ID,
    googleClientSecret: parsed.GOOGLE_CLIENT_SECRET,
    sentryDsn: parsed.SENTRY_DSN
  };
};
