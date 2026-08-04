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
