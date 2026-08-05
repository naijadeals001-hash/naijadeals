import type {
  AuthSession as PrismaAuthSession,
  EmailVerificationToken as PrismaEmailVerificationToken,
  PasswordCredential as PrismaPasswordCredential,
  PasswordResetToken as PrismaPasswordResetToken,
  Permission as PrismaPermission,
  ProviderAccount as PrismaProviderAccount,
  Role as PrismaRole,
  RolePermission as PrismaRolePermission,
  User as PrismaUser,
  UserRole as PrismaUserRole
} from '@prisma/client';
import type {
  AuthSessionEntity,
  EmailVerificationTokenEntity,
  OAuthProvider,
  PasswordCredentialEntity,
  PasswordResetTokenEntity,
  PermissionEntity,
  ProviderAccountEntity,
  RoleEntity,
  RolePermissionEntity,
  UserEntity,
  UserRoleEntity,
  UserStatus
} from '@naijadeals/types';

export function mapUser(prismaUser: PrismaUser): UserEntity {
  return {
    id: prismaUser.id,
    email: prismaUser.email,
    displayName: prismaUser.displayName,
    status: prismaUser.status as UserStatus,
    emailVerifiedAt: prismaUser.emailVerifiedAt ?? null,
    lastLoginAt: prismaUser.lastLoginAt ?? null,
    createdAt: prismaUser.createdAt,
    updatedAt: prismaUser.updatedAt
  };
}

export function mapPasswordCredential(prismaCredential: PrismaPasswordCredential): PasswordCredentialEntity {
  return {
    id: prismaCredential.id,
    userId: prismaCredential.userId,
    passwordHash: prismaCredential.passwordHash,
    passwordVersion: prismaCredential.passwordVersion,
    createdAt: prismaCredential.createdAt,
    updatedAt: prismaCredential.updatedAt
  };
}

export function mapProviderAccount(prismaAccount: PrismaProviderAccount): ProviderAccountEntity {
  return {
    id: prismaAccount.id,
    userId: prismaAccount.userId,
    provider: prismaAccount.provider as OAuthProvider,
    providerUserId: prismaAccount.providerUserId,
    providerEmail: prismaAccount.providerEmail ?? null,
    linkedAt: prismaAccount.linkedAt,
    lastLoginAt: prismaAccount.lastLoginAt ?? null,
    metadata: (prismaAccount.metadata as Record<string, unknown>) ?? null,
    createdAt: prismaAccount.createdAt,
    updatedAt: prismaAccount.updatedAt
  };
}

export function mapAuthSession(prismaSession: PrismaAuthSession): AuthSessionEntity {
  return {
    id: prismaSession.id,
    userId: prismaSession.userId,
    refreshTokenHash: prismaSession.refreshTokenHash,
    deviceId: prismaSession.deviceId ?? null,
    deviceNameSnapshot: prismaSession.deviceNameSnapshot ?? null,
    userAgent: prismaSession.userAgent ?? null,
    ipAddress: prismaSession.ipAddress ?? null,
    lastUsedAt: prismaSession.lastUsedAt ?? null,
    expiresAt: prismaSession.expiresAt,
    revokedAt: prismaSession.revokedAt ?? null,
    createdAt: prismaSession.createdAt
  };
}

export function mapEmailVerificationToken(prismaToken: PrismaEmailVerificationToken): EmailVerificationTokenEntity {
  return {
    id: prismaToken.id,
    userId: prismaToken.userId,
    tokenHash: prismaToken.tokenHash,
    expiresAt: prismaToken.expiresAt,
    usedAt: prismaToken.usedAt ?? null,
    createdAt: prismaToken.createdAt
  };
}

export function mapPasswordResetToken(prismaToken: PrismaPasswordResetToken): PasswordResetTokenEntity {
  return {
    id: prismaToken.id,
    userId: prismaToken.userId,
    tokenHash: prismaToken.tokenHash,
    expiresAt: prismaToken.expiresAt,
    usedAt: prismaToken.usedAt ?? null,
    createdAt: prismaToken.createdAt
  };
}

export function mapRole(prismaRole: PrismaRole): RoleEntity {
  return {
    id: prismaRole.id,
    slug: prismaRole.slug,
    name: prismaRole.name,
    description: prismaRole.description ?? null,
    isSystem: prismaRole.isSystem,
    createdAt: prismaRole.createdAt,
    updatedAt: prismaRole.updatedAt
  };
}

export function mapPermission(prismaPermission: PrismaPermission): PermissionEntity {
  return {
    id: prismaPermission.id,
    code: prismaPermission.code,
    resource: prismaPermission.resource,
    action: prismaPermission.action,
    description: prismaPermission.description ?? null,
    createdAt: prismaPermission.createdAt,
    updatedAt: prismaPermission.updatedAt
  };
}

export function mapUserRole(prismaUserRole: PrismaUserRole): UserRoleEntity {
  return {
    userId: prismaUserRole.userId,
    roleId: prismaUserRole.roleId,
    assignedByUserId: prismaUserRole.assignedByUserId ?? null,
    assignedReason: prismaUserRole.assignedReason ?? null,
    assignedAt: prismaUserRole.assignedAt,
    expiresAt: prismaUserRole.expiresAt ?? null
  };
}

export function mapRolePermission(prismaRolePermission: PrismaRolePermission): RolePermissionEntity {
  return {
    roleId: prismaRolePermission.roleId,
    permissionId: prismaRolePermission.permissionId,
    createdAt: prismaRolePermission.createdAt
  };
}
