import { Prisma } from '@prisma/client';
import type { PrismaTransactionClient } from './client.js';
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
import type {
  AuthSessionRepository,
  EmailVerificationTokenRepository,
  PasswordCredentialRepository,
  PasswordResetTokenRepository,
  PermissionRepository,
  ProviderAccountRepository,
  RolePermissionRepository,
  RoleRepository,
  UserRepository,
  UserRoleRepository
} from '../identity.js';
import type { PrismaTransactionContext } from './client.js';
import {
  mapAuthSession,
  mapEmailVerificationToken,
  mapPasswordCredential,
  mapPasswordResetToken,
  mapPermission,
  mapProviderAccount,
  mapRole,
  mapRolePermission,
  mapUser,
  mapUserRole
} from './mappers.js';

export class PrismaUserRepository implements UserRepository {
  public constructor(private readonly context: PrismaTransactionContext) {}

  private get client(): PrismaTransactionClient {
    return this.context.getClient();
  }

  public async findById(id: string): Promise<UserEntity | null> {
    const record = await this.client.user.findUnique({ where: { id } });
    return record ? mapUser(record) : null;
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const record = await this.client.user.findUnique({ where: { email } });
    return record ? mapUser(record) : null;
  }

  public async create(user: UserEntity): Promise<UserEntity> {
    const record = await this.client.user.create({
      data: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        status: user.status,
        emailVerifiedAt: user.emailVerifiedAt ?? null,
        lastLoginAt: user.lastLoginAt ?? null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
    return mapUser(record);
  }

  public async save(user: UserEntity): Promise<UserEntity> {
    const record = await this.client.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        displayName: user.displayName,
        status: user.status,
        emailVerifiedAt: user.emailVerifiedAt ?? null,
        lastLoginAt: user.lastLoginAt ?? null,
        updatedAt: user.updatedAt
      }
    });
    return mapUser(record);
  }

  public async updateStatus(params: {
    userId: string;
    status: UserStatus;
    emailVerifiedAt?: Date | null;
    lastLoginAt?: Date | null;
    updatedAt: Date;
  }): Promise<UserEntity> {
    const record = await this.client.user.update({
      where: { id: params.userId },
      data: {
        status: params.status,
        emailVerifiedAt: params.emailVerifiedAt ?? null,
        lastLoginAt: params.lastLoginAt ?? null,
        updatedAt: params.updatedAt
      }
    });
    return mapUser(record);
  }
}

export class PrismaPasswordCredentialRepository implements PasswordCredentialRepository {
  public constructor(private readonly context: PrismaTransactionContext) {}

  private get client(): PrismaTransactionClient {
    return this.context.getClient();
  }

  public async findByUserId(userId: string): Promise<PasswordCredentialEntity | null> {
    const record = await this.client.passwordCredential.findUnique({ where: { userId } });
    return record ? mapPasswordCredential(record) : null;
  }

  public async create(credential: PasswordCredentialEntity): Promise<PasswordCredentialEntity> {
    const record = await this.client.passwordCredential.create({
      data: {
        id: credential.id,
        userId: credential.userId,
        passwordHash: credential.passwordHash,
        passwordVersion: credential.passwordVersion,
        createdAt: credential.createdAt,
        updatedAt: credential.updatedAt
      }
    });
    return mapPasswordCredential(record);
  }

  public async save(credential: PasswordCredentialEntity): Promise<PasswordCredentialEntity> {
    const record = await this.client.passwordCredential.update({
      where: { id: credential.id },
      data: {
        passwordHash: credential.passwordHash,
        passwordVersion: credential.passwordVersion,
        updatedAt: credential.updatedAt
      }
    });
    return mapPasswordCredential(record);
  }
}

export class PrismaProviderAccountRepository implements ProviderAccountRepository {
  public constructor(private readonly context: PrismaTransactionContext) {}

  private get client(): PrismaTransactionClient {
    return this.context.getClient();
  }

  public async findByProviderIdentity(
    provider: OAuthProvider,
    providerUserId: string
  ): Promise<ProviderAccountEntity | null> {
    const record = await this.client.providerAccount.findUnique({
      where: { provider_providerUserId: { provider, providerUserId } }
    });
    return record ? mapProviderAccount(record) : null;
  }

  public async findByUserAndProvider(userId: string, provider: OAuthProvider): Promise<ProviderAccountEntity | null> {
    const record = await this.client.providerAccount.findFirst({
      where: { userId, provider }
    });
    return record ? mapProviderAccount(record) : null;
  }

  public async create(account: ProviderAccountEntity): Promise<ProviderAccountEntity> {
    const record = await this.client.providerAccount.create({
      data: {
        id: account.id,
        userId: account.userId,
        provider: account.provider,
        providerUserId: account.providerUserId,
        providerEmail: account.providerEmail ?? null,
        linkedAt: account.linkedAt,
        lastLoginAt: account.lastLoginAt ?? null,
        metadata: account.metadata === null ? Prisma.JsonNull : (account.metadata as Prisma.InputJsonValue),
        createdAt: account.createdAt,
        updatedAt: account.updatedAt
      }
    });
    return mapProviderAccount(record);
  }

  public async save(account: ProviderAccountEntity): Promise<ProviderAccountEntity> {
    const record = await this.client.providerAccount.update({
      where: { id: account.id },
      data: {
        providerEmail: account.providerEmail ?? null,
        lastLoginAt: account.lastLoginAt ?? null,
        metadata: account.metadata === null ? Prisma.JsonNull : (account.metadata as Prisma.InputJsonValue),
        updatedAt: account.updatedAt
      }
    });
    return mapProviderAccount(record);
  }
}

export class PrismaAuthSessionRepository implements AuthSessionRepository {
  public constructor(private readonly context: PrismaTransactionContext) {}

  private get client(): PrismaTransactionClient {
    return this.context.getClient();
  }

  public async findById(sessionId: string): Promise<AuthSessionEntity | null> {
    const record = await this.client.authSession.findUnique({ where: { id: sessionId } });
    return record ? mapAuthSession(record) : null;
  }

  public async findByUserId(userId: string): Promise<AuthSessionEntity[]> {
    const records = await this.client.authSession.findMany({ where: { userId } });
    return records.map(mapAuthSession);
  }

  public async findByRefreshTokenHash(refreshTokenHash: string): Promise<AuthSessionEntity | null> {
    const record = await this.client.authSession.findUnique({ where: { refreshTokenHash } });
    return record ? mapAuthSession(record) : null;
  }

  public async create(session: AuthSessionEntity): Promise<AuthSessionEntity> {
    const record = await this.client.authSession.create({
      data: {
        id: session.id,
        userId: session.userId,
        refreshTokenHash: session.refreshTokenHash,
        deviceId: session.deviceId ?? null,
        deviceNameSnapshot: session.deviceNameSnapshot ?? null,
        userAgent: session.userAgent ?? null,
        ipAddress: session.ipAddress ?? null,
        lastUsedAt: session.lastUsedAt ?? null,
        expiresAt: session.expiresAt,
        revokedAt: session.revokedAt ?? null,
        createdAt: session.createdAt
      }
    });
    return mapAuthSession(record);
  }

  public async save(session: AuthSessionEntity): Promise<AuthSessionEntity> {
    const record = await this.client.authSession.update({
      where: { id: session.id },
      data: {
        refreshTokenHash: session.refreshTokenHash,
        deviceId: session.deviceId ?? null,
        deviceNameSnapshot: session.deviceNameSnapshot ?? null,
        userAgent: session.userAgent ?? null,
        ipAddress: session.ipAddress ?? null,
        lastUsedAt: session.lastUsedAt ?? null,
        expiresAt: session.expiresAt,
        revokedAt: session.revokedAt ?? null
      }
    });
    return mapAuthSession(record);
  }
}

export class PrismaEmailVerificationTokenRepository implements EmailVerificationTokenRepository {
  public constructor(private readonly context: PrismaTransactionContext) {}

  private get client(): PrismaTransactionClient {
    return this.context.getClient();
  }

  public async findByTokenHash(tokenHash: string): Promise<EmailVerificationTokenEntity | null> {
    const record = await this.client.emailVerificationToken.findUnique({ where: { tokenHash } });
    return record ? mapEmailVerificationToken(record) : null;
  }

  public async create(token: EmailVerificationTokenEntity): Promise<EmailVerificationTokenEntity> {
    const record = await this.client.emailVerificationToken.create({
      data: {
        id: token.id,
        userId: token.userId,
        tokenHash: token.tokenHash,
        expiresAt: token.expiresAt,
        usedAt: token.usedAt ?? null,
        createdAt: token.createdAt
      }
    });
    return mapEmailVerificationToken(record);
  }

  public async save(token: EmailVerificationTokenEntity): Promise<EmailVerificationTokenEntity> {
    const record = await this.client.emailVerificationToken.update({
      where: { id: token.id },
      data: {
        usedAt: token.usedAt ?? null,
        expiresAt: token.expiresAt
      }
    });
    return mapEmailVerificationToken(record);
  }
}

export class PrismaPasswordResetTokenRepository implements PasswordResetTokenRepository {
  public constructor(private readonly context: PrismaTransactionContext) {}

  private get client(): PrismaTransactionClient {
    return this.context.getClient();
  }

  public async findByTokenHash(tokenHash: string): Promise<PasswordResetTokenEntity | null> {
    const record = await this.client.passwordResetToken.findUnique({ where: { tokenHash } });
    return record ? mapPasswordResetToken(record) : null;
  }

  public async create(token: PasswordResetTokenEntity): Promise<PasswordResetTokenEntity> {
    const record = await this.client.passwordResetToken.create({
      data: {
        id: token.id,
        userId: token.userId,
        tokenHash: token.tokenHash,
        expiresAt: token.expiresAt,
        usedAt: token.usedAt ?? null,
        createdAt: token.createdAt
      }
    });
    return mapPasswordResetToken(record);
  }

  public async save(token: PasswordResetTokenEntity): Promise<PasswordResetTokenEntity> {
    const record = await this.client.passwordResetToken.update({
      where: { id: token.id },
      data: {
        usedAt: token.usedAt ?? null,
        expiresAt: token.expiresAt
      }
    });
    return mapPasswordResetToken(record);
  }
}

export class PrismaRoleRepository implements RoleRepository {
  public constructor(private readonly context: PrismaTransactionContext) {}

  private get client(): PrismaTransactionClient {
    return this.context.getClient();
  }

  public async findById(id: string): Promise<RoleEntity | null> {
    const record = await this.client.role.findUnique({ where: { id } });
    return record ? mapRole(record) : null;
  }

  public async findBySlug(slug: string): Promise<RoleEntity | null> {
    const record = await this.client.role.findUnique({ where: { slug } });
    return record ? mapRole(record) : null;
  }

  public async findByUserId(userId: string): Promise<RoleEntity[]> {
    const records = await this.client.role.findMany({
      where: { userRoles: { some: { userId } } }
    });
    return records.map(mapRole);
  }
}

export class PrismaPermissionRepository implements PermissionRepository {
  public constructor(private readonly context: PrismaTransactionContext) {}

  private get client(): PrismaTransactionClient {
    return this.context.getClient();
  }

  public async findByRoleIds(roleIds: string[]): Promise<PermissionEntity[]> {
    if (roleIds.length === 0) return [];
    const records = await this.client.permission.findMany({
      where: { roles: { some: { roleId: { in: roleIds } } } }
    });
    return records.map(mapPermission);
  }

  public async findByCodes(codes: string[]): Promise<PermissionEntity[]> {
    if (codes.length === 0) return [];
    const records = await this.client.permission.findMany({
      where: { code: { in: codes } }
    });
    return records.map(mapPermission);
  }
}

export class PrismaUserRoleRepository implements UserRoleRepository {
  public constructor(private readonly context: PrismaTransactionContext) {}

  private get client(): PrismaTransactionClient {
    return this.context.getClient();
  }

  public async findByUserId(userId: string): Promise<UserRoleEntity[]> {
    const records = await this.client.userRole.findMany({ where: { userId } });
    return records.map(mapUserRole);
  }

  public async findByUserAndRole(userId: string, roleId: string): Promise<UserRoleEntity | null> {
    const record = await this.client.userRole.findUnique({
      where: { userId_roleId: { userId, roleId } }
    });
    return record ? mapUserRole(record) : null;
  }

  public async create(assignment: UserRoleEntity): Promise<UserRoleEntity> {
    const record = await this.client.userRole.create({
      data: {
        userId: assignment.userId,
        roleId: assignment.roleId,
        assignedByUserId: assignment.assignedByUserId ?? null,
        assignedReason: assignment.assignedReason ?? null,
        assignedAt: assignment.assignedAt,
        expiresAt: assignment.expiresAt ?? null
      }
    });
    return mapUserRole(record);
  }
}

export class PrismaRolePermissionRepository implements RolePermissionRepository {
  public constructor(private readonly context: PrismaTransactionContext) {}

  private get client(): PrismaTransactionClient {
    return this.context.getClient();
  }

  public async findByRoleIds(roleIds: string[]): Promise<RolePermissionEntity[]> {
    if (roleIds.length === 0) return [];
    const records = await this.client.rolePermission.findMany({
      where: { roleId: { in: roleIds } }
    });
    return records.map(mapRolePermission);
  }
}
