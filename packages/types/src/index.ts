export const platformRoles = [
  'guest',
  'customer',
  'merchant',
  'restaurant',
  'driver',
  'host',
  'freelancer',
  'creator',
  'support',
  'operations',
  'finance',
  'moderator',
  'super_admin'
] as const;

export type PlatformRole = (typeof platformRoles)[number];
export type AppEnvironment = 'local' | 'development' | 'staging' | 'production';

export interface RequestContext {
  requestId: string;
  correlationId: string;
  actorId?: string;
  actorRole?: PlatformRole;
}

export interface SuccessResult<T> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
  requestId: string;
}

export interface ErrorResult {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  requestId: string;
}

export interface HealthComponentStatus {
  name: string;
  status: 'up' | 'down' | 'degraded';
  latencyMs?: number;
  details?: Record<string, unknown>;
}

export interface HealthStatus {
  status: 'ok' | 'degraded' | 'error';
  service: string;
  environment: AppEnvironment;
  version: string;
  components: HealthComponentStatus[];
  timestamp: string;
}
