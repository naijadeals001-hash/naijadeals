import { beforeEach, describe, expect, it } from 'vitest';
import { Prisma, type PrismaClient } from '@prisma/client';
import {
  PrismaAuthSessionRepository,
  PrismaEmailVerificationTokenRepository,
  PrismaPasswordCredentialRepository,
  PrismaPasswordResetTokenRepository,
  PrismaPermissionRepository,
  PrismaProviderAccountRepository,
  PrismaRolePermissionRepository,
  PrismaRoleRepository,
  PrismaUserRepository,
  PrismaUserRoleRepository,
  createPrismaTransactionContext
} from '../src/prisma/index.js';

type AnyRecord = Record<string, unknown>;

class InMemoryPrismaModel<T extends AnyRecord> {
  public readonly records: T[] = [];

  private matches(record: T, where: AnyRecord): boolean {
    for (const [key, value] of Object.entries(where)) {
      if (value === null || value === undefined) {
        if (record[key] !== value) return false;
        continue;
      }
      if (value && typeof value === 'object') {
        const valueObj = value as AnyRecord;
        if (Array.isArray(valueObj)) {
          const items = (record[key] as unknown[]) ?? [];
          const first = valueObj[0] as AnyRecord | undefined;
          if (first && !items.some((item) => this.matches(item as unknown as T, first))) {
            return false;
          }
        } else if ('in' in valueObj) {
          const accepted = (valueObj.in as unknown[]) ?? [];
          if (!accepted.includes(record[key])) return false;
        } else if (!this.matches(record, valueObj)) return false;
      } else if (record[key] !== value) {
        return false;
      }
    }
    return true;
  }

  public async findUnique(args: { where: AnyRecord }): Promise<T | null> {
    return this.records.find((record) => this.matches(record, args.where)) ?? null;
  }

  public async findFirst(args: { where: AnyRecord }): Promise<T | null> {
    return this.records.find((record) => this.matches(record, args.where)) ?? null;
  }

  public async findMany(args: { where: AnyRecord }): Promise<T[]> {
    return this.records.filter((record) => this.matches(record, args.where));
  }

  private normalizeJsonNull(value: unknown): unknown {
    if (value === Prisma.JsonNull) return null;
    if (value === Prisma.DbNull || value === Prisma.AnyNull) return null;
    return value;
  }

  private normalizeData(data: AnyRecord): AnyRecord {
    const result: AnyRecord = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = this.normalizeJsonNull(value);
    }
    return result;
  }

  public async create(args: { data: AnyRecord }): Promise<T> {
    const record = this.normalizeData(args.data) as unknown as T;
    this.records.push(record);
    return record;
  }

  public async update(args: { where: AnyRecord; data: AnyRecord }): Promise<T> {
    const index = this.records.findIndex((record) => this.matches(record, args.where));
    if (index === -1) {
      throw new Error(`Record not found for update: ${JSON.stringify(args.where)}`);
    }
    this.records[index] = { ...this.records[index], ...this.normalizeData(args.data) } as unknown as T;
    return this.records[index];
  }
}

class InMemoryPrismaClient {
  public readonly user = new InMemoryPrismaModel<AnyRecord>();
  public readonly passwordCredential = new InMemoryPrismaModel<AnyRecord>();
  public readonly providerAccount = new InMemoryPrismaModel<AnyRecord>();
  public readonly authSession = new InMemoryPrismaModel<AnyRecord>();
  public readonly emailVerificationToken = new InMemoryPrismaModel<AnyRecord>();
  public readonly passwordResetToken = new InMemoryPrismaModel<AnyRecord>();
  public readonly role = new InMemoryPrismaModel<AnyRecord>();
  public readonly permission = new InMemoryPrismaModel<AnyRecord>();
  public readonly userRole = new InMemoryPrismaModel<AnyRecord>();
  public readonly rolePermission = new InMemoryPrismaModel<AnyRecord>();

  public async $transaction<T>(handler: (tx: InMemoryPrismaClient) => Promise<T>): Promise<T> {
    return handler(this);
  }
}

function createTestContext() {
  const db = new InMemoryPrismaClient();
  const client = db as unknown as PrismaClient;
  const context = createPrismaTransactionContext(client);
  return {
    db,
    context,
    users: new PrismaUserRepository(context),
    credentials: new PrismaPasswordCredentialRepository(context),
    providerAccounts: new PrismaProviderAccountRepository(context),
    sessions: new PrismaAuthSessionRepository(context),
    emailVerificationTokens: new PrismaEmailVerificationTokenRepository(context),
    passwordResetTokens: new PrismaPasswordResetTokenRepository(context),
    roles: new PrismaRoleRepository(context),
    permissions: new PrismaPermissionRepository(context),
    userRoles: new PrismaUserRoleRepository(context),
    rolePermissions: new PrismaRolePermissionRepository(context)
  };
}

type TestContext = ReturnType<typeof createTestContext>;

describe('Prisma identity repositories', () => {
  let t: TestContext;

  beforeEach(() => {
    t = createTestContext();
  });

  describe('UserRepository', () => {
    it('creates and finds a user by id and email', async () => {
      const now = new Date('2026-08-05T12:00:00.000Z');
      const user = {
        id: 'user_1',
        email: 'founder@naijadeals.com',
        displayName: 'Founder One',
        status: 'EMAIL_UNVERIFIED' as const,
        emailVerifiedAt: null,
        lastLoginAt: null,
        createdAt: now,
        updatedAt: now
      };

      await t.users.create(user);

      const byId = await t.users.findById('user_1');
      const byEmail = await t.users.findByEmail('founder@naijadeals.com');

      expect(byId).toEqual(user);
      expect(byEmail).toEqual(user);
    });

    it('saves updates to a user', async () => {
      const now = new Date('2026-08-05T12:00:00.000Z');
      const user = {
        id: 'user_1',
        email: 'founder@naijadeals.com',
        displayName: 'Founder One',
        status: 'EMAIL_UNVERIFIED' as const,
        emailVerifiedAt: null,
        lastLoginAt: null,
        createdAt: now,
        updatedAt: now
      };
      await t.users.create(user);

      const updated = await t.users.save({
        ...user,
        displayName: 'Founder Updated',
        updatedAt: new Date('2026-08-05T13:00:00.000Z')
      });

      expect(updated.displayName).toBe('Founder Updated');
      expect((await t.users.findById('user_1'))?.displayName).toBe('Founder Updated');
    });

    it('updates status with email verification and last login timestamps', async () => {
      const now = new Date('2026-08-05T12:00:00.000Z');
      const user = {
        id: 'user_1',
        email: 'founder@naijadeals.com',
        displayName: 'Founder One',
        status: 'EMAIL_UNVERIFIED' as const,
        emailVerifiedAt: null,
        lastLoginAt: null,
        createdAt: now,
        updatedAt: now
      };
      await t.users.create(user);

      const verifiedAt = new Date('2026-08-05T13:00:00.000Z');
      const loginAt = new Date('2026-08-05T14:00:00.000Z');
      const updatedAt = new Date('2026-08-05T15:00:00.000Z');

      const updated = await t.users.updateStatus({
        userId: 'user_1',
        status: 'ACTIVE',
        emailVerifiedAt: verifiedAt,
        lastLoginAt: loginAt,
        updatedAt
      });

      expect(updated.status).toBe('ACTIVE');
      expect(updated.emailVerifiedAt).toEqual(verifiedAt);
      expect(updated.lastLoginAt).toEqual(loginAt);
      expect(updated.updatedAt).toEqual(updatedAt);
    });
  });

  describe('PasswordCredentialRepository', () => {
    it('creates and finds credentials by user id', async () => {
      const now = new Date('2026-08-05T12:00:00.000Z');
      const credential = {
        id: 'cred_1',
        userId: 'user_1',
        passwordHash: 'hashed-password',
        passwordVersion: 1,
        createdAt: now,
        updatedAt: now
      };

      await t.credentials.create(credential);

      const found = await t.credentials.findByUserId('user_1');
      expect(found).toEqual(credential);
    });

    it('saves updated credential fields', async () => {
      const now = new Date('2026-08-05T12:00:00.000Z');
      const credential = {
        id: 'cred_1',
        userId: 'user_1',
        passwordHash: 'hashed-password',
        passwordVersion: 1,
        createdAt: now,
        updatedAt: now
      };
      await t.credentials.create(credential);

      const updated = await t.credentials.save({
        ...credential,
        passwordHash: 'new-hashed-password',
        passwordVersion: 2,
        updatedAt: new Date('2026-08-05T13:00:00.000Z')
      });

      expect(updated.passwordHash).toBe('new-hashed-password');
      expect(updated.passwordVersion).toBe(2);
    });
  });

  describe('ProviderAccountRepository', () => {
    it('creates and finds a provider account by provider identity', async () => {
      const now = new Date('2026-08-05T12:00:00.000Z');
      const account = {
        id: 'account_1',
        userId: 'user_1',
        provider: 'GOOGLE' as const,
        providerUserId: 'google_123',
        providerEmail: 'founder@gmail.com',
        linkedAt: now,
        lastLoginAt: null,
        metadata: null,
        createdAt: now,
        updatedAt: now
      };

      await t.providerAccounts.create(account);

      const found = await t.providerAccounts.findByProviderIdentity('GOOGLE', 'google_123');
      expect(found).toEqual(account);
    });

    it('finds a provider account by user and provider', async () => {
      const now = new Date('2026-08-05T12:00:00.000Z');
      const account = {
        id: 'account_1',
        userId: 'user_1',
        provider: 'APPLE' as const,
        providerUserId: 'apple_123',
        providerEmail: null,
        linkedAt: now,
        lastLoginAt: null,
        metadata: null,
        createdAt: now,
        updatedAt: now
      };

      await t.providerAccounts.create(account);

      const found = await t.providerAccounts.findByUserAndProvider('user_1', 'APPLE');
      expect(found?.providerUserId).toBe('apple_123');
    });
  });

  describe('AuthSessionRepository', () => {
    it('creates and finds sessions by id, user id, and refresh token hash', async () => {
      const now = new Date('2026-08-05T12:00:00.000Z');
      const session = {
        id: 'session_1',
        userId: 'user_1',
        refreshTokenHash: 'hash_1',
        deviceId: 'device_1',
        deviceNameSnapshot: 'MacBook Pro',
        userAgent: 'Browser',
        ipAddress: '127.0.0.1',
        lastUsedAt: now,
        expiresAt: new Date('2026-08-06T12:00:00.000Z'),
        revokedAt: null,
        createdAt: now
      };

      await t.sessions.create(session);

      expect(await t.sessions.findById('session_1')).toEqual(session);
      expect(await t.sessions.findByRefreshTokenHash('hash_1')).toEqual(session);
      expect(await t.sessions.findByUserId('user_1')).toEqual([session]);
    });

    it('saves session revocation', async () => {
      const now = new Date('2026-08-05T12:00:00.000Z');
      const session = {
        id: 'session_1',
        userId: 'user_1',
        refreshTokenHash: 'hash_1',
        deviceId: null,
        deviceNameSnapshot: null,
        userAgent: null,
        ipAddress: null,
        lastUsedAt: null,
        expiresAt: new Date('2026-08-06T12:00:00.000Z'),
        revokedAt: null,
        createdAt: now
      };
      await t.sessions.create(session);

      const revokedAt = new Date('2026-08-05T15:00:00.000Z');
      const updated = await t.sessions.save({ ...session, revokedAt });

      expect(updated.revokedAt).toEqual(revokedAt);
    });
  });

  describe('EmailVerificationTokenRepository', () => {
    it('creates and finds a token by hash and marks it used', async () => {
      const now = new Date('2026-08-05T12:00:00.000Z');
      const token = {
        id: 'token_1',
        userId: 'user_1',
        tokenHash: 'hash_1',
        expiresAt: new Date('2026-08-06T12:00:00.000Z'),
        usedAt: null,
        createdAt: now
      };

      await t.emailVerificationTokens.create(token);
      expect(await t.emailVerificationTokens.findByTokenHash('hash_1')).toEqual(token);

      const usedAt = new Date('2026-08-05T13:00:00.000Z');
      const updated = await t.emailVerificationTokens.save({ ...token, usedAt });
      expect(updated.usedAt).toEqual(usedAt);
    });
  });

  describe('PasswordResetTokenRepository', () => {
    it('creates and finds a token by hash and marks it used', async () => {
      const now = new Date('2026-08-05T12:00:00.000Z');
      const token = {
        id: 'token_1',
        userId: 'user_1',
        tokenHash: 'hash_1',
        expiresAt: new Date('2026-08-06T12:00:00.000Z'),
        usedAt: null,
        createdAt: now
      };

      await t.passwordResetTokens.create(token);
      expect(await t.passwordResetTokens.findByTokenHash('hash_1')).toEqual(token);

      const usedAt = new Date('2026-08-05T13:00:00.000Z');
      const updated = await t.passwordResetTokens.save({ ...token, usedAt });
      expect(updated.usedAt).toEqual(usedAt);
    });
  });

  describe('RoleRepository', () => {
    it('finds roles by id, slug, and user id', async () => {
      const now = new Date('2026-08-05T12:00:00.000Z');
      const role = {
        id: 'role_1',
        slug: 'customer',
        name: 'Customer',
        description: null,
        isSystem: true,
        createdAt: now,
        updatedAt: now
      };

      await t.db.role.create({ data: role });

      expect(await t.roles.findById('role_1')).toEqual(role);
      expect(await t.roles.findBySlug('customer')).toEqual(role);
      expect(await t.roles.findByUserId('user_1')).toEqual([]);
    });
  });

  describe('PermissionRepository', () => {
    it('finds permissions by role ids and codes', async () => {
      const now = new Date('2026-08-05T12:00:00.000Z');
      const permission = {
        id: 'perm_1',
        code: 'user:read',
        resource: 'user',
        action: 'read',
        description: null,
        createdAt: now,
        updatedAt: now
      };

      await t.db.permission.create({ data: permission });

      expect(await t.permissions.findByCodes(['user:read'])).toEqual([permission]);
      expect(await t.permissions.findByRoleIds(['role_1'])).toEqual([]);
      expect(await t.permissions.findByCodes([])).toEqual([]);
    });
  });

  describe('UserRoleRepository', () => {
    it('creates and finds user role assignments', async () => {
      const now = new Date('2026-08-05T12:00:00.000Z');
      const assignment = {
        userId: 'user_1',
        roleId: 'role_1',
        assignedByUserId: null,
        assignedReason: null,
        assignedAt: now,
        expiresAt: null
      };

      await t.userRoles.create(assignment);

      expect(await t.userRoles.findByUserId('user_1')).toEqual([assignment]);
      expect(await t.userRoles.findByUserAndRole('user_1', 'role_1')).toEqual(assignment);
    });
  });

  describe('RolePermissionRepository', () => {
    it('finds role permissions by role ids', async () => {
      const now = new Date('2026-08-05T12:00:00.000Z');
      const mapping = {
        roleId: 'role_1',
        permissionId: 'perm_1',
        createdAt: now
      };

      await t.db.rolePermission.create({ data: mapping });

      expect(await t.rolePermissions.findByRoleIds(['role_1'])).toEqual([mapping]);
      expect(await t.rolePermissions.findByRoleIds([])).toEqual([]);
    });
  });

  describe('Transaction context routing', () => {
    it('routes repository calls to the active transaction client', async () => {
      const now = new Date('2026-08-05T12:00:00.000Z');
      const user = {
        id: 'user_1',
        email: 'founder@naijadeals.com',
        displayName: 'Founder One',
        status: 'EMAIL_UNVERIFIED' as const,
        emailVerifiedAt: null,
        lastLoginAt: null,
        createdAt: now,
        updatedAt: now
      };

      await t.context.runInTransaction(async () => {
        await t.users.create(user);
        const found = await t.users.findById('user_1');
        expect(found).toEqual(user);
      });
    });
  });
});
