import type { RequestContext } from '@naijadeals/types';

export const identityAuditCategories = ['AUTH', 'SECURITY', 'SESSION', 'RBAC', 'PROFILE', 'OAUTH', 'SYSTEM'] as const;
export type IdentityAuditCategory = (typeof identityAuditCategories)[number];
export type IdentityAuditStatus = 'attempted' | 'succeeded' | 'rejected';

export interface IdentityAuditRecord {
  category: IdentityAuditCategory;
  action: string;
  actorId?: string;
  targetType: 'user' | 'role' | 'session' | 'provider_account' | 'verification_token' | 'reset_token';
  targetId?: string;
  status: IdentityAuditStatus;
  reasonCode?: string;
  metadata?: Record<string, unknown>;
  requestContext: RequestContext;
  occurredAt: Date;
}

export interface IdentityAuditSink {
  record(record: IdentityAuditRecord): Promise<void>;
}

export interface IdentityDomainLogger {
  info(payload: Record<string, unknown>, message?: string): void;
  warn(payload: Record<string, unknown>, message?: string): void;
  error(payload: Record<string, unknown>, message?: string): void;
}

export interface IdentityDomainTelemetry {
  auditSink?: IdentityAuditSink;
  logger?: IdentityDomainLogger;
}

class NoopIdentityAuditSink implements IdentityAuditSink {
  public async record(): Promise<void> {
    return Promise.resolve();
  }
}

class NoopIdentityDomainLogger implements IdentityDomainLogger {
  public info(): void {}
  public warn(): void {}
  public error(): void {}
}

const noopAuditSink = new NoopIdentityAuditSink();
const noopLogger = new NoopIdentityDomainLogger();

export const resolveIdentityTelemetry = (telemetry?: IdentityDomainTelemetry): Required<IdentityDomainTelemetry> => ({
  auditSink: telemetry?.auditSink ?? noopAuditSink,
  logger: telemetry?.logger ?? noopLogger
});
