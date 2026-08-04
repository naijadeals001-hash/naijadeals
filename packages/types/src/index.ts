export const userStatuses = [
  'PENDING',
  'EMAIL_UNVERIFIED',
  'ACTIVE',
  'LOCKED',
  'SUSPENDED',
  'BANNED',
  'ARCHIVED'
] as const;

export type UserStatus = (typeof userStatuses)[number];

export const oauthProviders = ['GOOGLE', 'APPLE', 'FACEBOOK', 'MICROSOFT'] as const;
export type OAuthProvider = (typeof oauthProviders)[number];

export const identityAuditCategories = ['AUTH', 'SECURITY', 'SESSION', 'RBAC', 'PROFILE', 'OAUTH', 'SYSTEM'] as const;
export type IdentityAuditCategory = (typeof identityAuditCategories)[number];

export const platformRoles = [
  'guest',
  'customer',
  'merchant',
  'supplier',
  'farmer',
  'restaurant',
  'driver',
  'host',
  'freelancer',
  'creator',
  'support_agent',
  'support_manager',
  'operations_admin',
  'finance_admin',
  'moderator',
  'platform_admin',
  'super_admin'
] as const;

export type PlatformRole = (typeof platformRoles)[number];

export interface UserEntity {
  id: string;
  email: string;
  displayName: string;
  status: UserStatus;
  emailVerifiedAt?: Date | null;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PasswordCredentialEntity {
  id: string;
  userId: string;
  passwordHash: string;
  passwordVersion: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProviderAccountEntity {
  id: string;
  userId: string;
  provider: OAuthProvider;
  providerUserId: string;
  providerEmail?: string | null;
  linkedAt: Date;
  lastLoginAt?: Date | null;
  metadata?: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoleEntity {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PermissionEntity {
  id: string;
  code: string;
  resource: string;
  action: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRoleEntity {
  userId: string;
  roleId: string;
  assignedByUserId?: string | null;
  assignedReason?: string | null;
  assignedAt: Date;
  expiresAt?: Date | null;
}

export interface RolePermissionEntity {
  roleId: string;
  permissionId: string;
  createdAt: Date;
}

export interface AuthorizationSnapshot {
  roles: RoleEntity[];
  permissions: PermissionEntity[];
  permissionCodes: string[];
}

export interface AuthSessionEntity {
  id: string;
  userId: string;
  refreshTokenHash: string;
  deviceId?: string | null;
  deviceNameSnapshot?: string | null;
  userAgent?: string | null;
  ipAddress?: string | null;
  lastUsedAt?: Date | null;
  expiresAt: Date;
  revokedAt?: Date | null;
  createdAt: Date;
}

export interface EmailVerificationTokenEntity {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  usedAt?: Date | null;
  createdAt: Date;
}

export interface PasswordResetTokenEntity {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  usedAt?: Date | null;
  createdAt: Date;
}

export type AppEnvironment = 'local' | 'development' | 'staging' | 'production';

export interface RequestContext {
  requestId: string;
  correlationId: string;
  actorId?: string;
  actorRole?: string;
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
