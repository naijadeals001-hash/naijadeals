import { describe, expect, it } from 'vitest';
import {
  RequestPasswordResetService,
  ResetPasswordService,
  type IdentityAuditRecord
} from '../../src/modules/identity/index.js';
import type {
  PasswordCredentialRepository,
  PasswordResetTokenRepository,
  UnitOfWork,
  UserRepository
} from '@naijadeals/repository';
import type { DomainEvent, EventBus } from '@naijadeals/events';
import type { PasswordCredentialEntity, PasswordResetTokenEntity, UserEntity, UserStatus } from '@naijadeals/types';

class InMemoryUsers implements UserRepository {
  public constructor(private readonly user: UserEntity) {}
  public async findById(): Promise<UserEntity | null> { return this.user; }
  public async findByEmail(): Promise<UserEntity | null> { return null; }
  public async create(user: UserEntity): Promise<UserEntity> { return user; }
  public async save(user: UserEntity): Promise<UserEntity> { return user; }
  public async updateStatus(params: { userId: string; status: UserStatus; updatedAt: Date }): Promise<UserEntity> {
    this.user.status = params.status;
    this.user.updatedAt = params.updatedAt;
    return this.user;
  }
}

class InMemoryCredentials implements PasswordCredentialRepository {
  public constructor(private readonly credential: PasswordCredentialEntity) {}
  public async findByUserId(): Promise<PasswordCredentialEntity | null> { return this.credential; }
  public async create(credential: PasswordCredentialEntity): Promise<PasswordCredentialEntity> { return credential; }
  public async save(credential: PasswordCredentialEntity): Promise<PasswordCredentialEntity> {
    this.credential.passwordHash = credential.passwordHash;
    this.credential.passwordVersion = credential.passwordVersion;
    this.credential.updatedAt = credential.updatedAt;
    return this.credential;
  }
}

class InMemoryTokens implements PasswordResetTokenRepository {
  public constructor(private readonly token: PasswordResetTokenEntity) {}
  public async findByTokenHash(tokenHash: string): Promise<PasswordResetTokenEntity | null> {
    return this.token.tokenHash === tokenHash ? this.token : null;
  }
  public async create(token: PasswordResetTokenEntity): Promise<PasswordResetTokenEntity> {
    this.token.id = token.id;
    this.token.userId = token.userId;
    this.token.tokenHash = token.tokenHash;
    this.token.expiresAt = token.expiresAt;
    this.token.createdAt = token.createdAt;
    return this.token;
  }
  public async save(token: PasswordResetTokenEntity): Promise<PasswordResetTokenEntity> {
    this.token.usedAt = token.usedAt ?? null;
    return this.token;
  }
}

class RecordingEventBus implements EventBus {
  public readonly events: DomainEvent[] = [];
  public async publish(event: DomainEvent): Promise<void> {
    this.events.push(event);
  }
}

class RecordingAuditSink {
  public readonly records: IdentityAuditRecord[] = [];
  public async record(record: IdentityAuditRecord): Promise<void> {
    this.records.push(record);
  }
}

const unitOfWork: UnitOfWork = {
  async runInTransaction<T>(handler: () => Promise<T>): Promise<T> {
    return handler();
  }
};

describe('Password reset domain services', () => {
  it('issues a password reset token and emits the requested event', async () => {
    const user: UserEntity = {
      id: 'user_1',
      email: 'user@example.com',
      displayName: 'User',
      status: 'ACTIVE',
      emailVerifiedAt: new Date('2026-08-03T00:00:00.000Z'),
      lastLoginAt: null,
      createdAt: new Date('2026-08-03T00:00:00.000Z'),
      updatedAt: new Date('2026-08-03T00:00:00.000Z')
    };
    const token: PasswordResetTokenEntity = {
      id: 'seed_token',
      userId: 'user_1',
      tokenHash: 'seed_hash',
      expiresAt: new Date('2026-08-04T00:00:00.000Z'),
      usedAt: null,
      createdAt: new Date('2026-08-03T00:00:00.000Z')
    };
    const eventBus = new RecordingEventBus();
    const auditSink = new RecordingAuditSink();

    const service = new RequestPasswordResetService({
      users: new InMemoryUsers(user),
      tokens: new InMemoryTokens(token),
      eventBus,
      telemetry: { auditSink }
    });

    const result = await service.execute({
      userId: 'user_1',
      tokenId: 'token_1',
      tokenHash: 'hash_1',
      expiresAt: new Date('2026-08-04T00:00:00.000Z'),
      requestContext: { requestId: 'req_1', correlationId: 'corr_1' },
      now: new Date('2026-08-03T08:00:00.000Z')
    });

    expect(result.id).toBe('token_1');
    expect(eventBus.events[0]?.eventName).toBe('identity.user.password_reset_requested.v1');
    expect(auditSink.records[0]?.category).toBe('AUTH');
  });

  it('consumes the token, enforces password policy, and increments password version', async () => {
    const user: UserEntity = {
      id: 'user_1',
      email: 'user@example.com',
      displayName: 'User',
      status: 'ACTIVE',
      emailVerifiedAt: new Date('2026-08-03T00:00:00.000Z'),
      lastLoginAt: null,
      createdAt: new Date('2026-08-03T00:00:00.000Z'),
      updatedAt: new Date('2026-08-03T00:00:00.000Z')
    };
    const credential: PasswordCredentialEntity = {
      id: 'credential_1',
      userId: 'user_1',
      passwordHash: 'old_hash',
      passwordVersion: 1,
      createdAt: new Date('2026-08-03T00:00:00.000Z'),
      updatedAt: new Date('2026-08-03T00:00:00.000Z')
    };
    const token: PasswordResetTokenEntity = {
      id: 'token_1',
      userId: 'user_1',
      tokenHash: 'hash_1',
      expiresAt: new Date('2026-08-04T00:00:00.000Z'),
      usedAt: null,
      createdAt: new Date('2026-08-03T00:00:00.000Z')
    };
    const eventBus = new RecordingEventBus();
    const auditSink = new RecordingAuditSink();

    const service = new ResetPasswordService({
      users: new InMemoryUsers(user),
      credentials: new InMemoryCredentials(credential),
      tokens: new InMemoryTokens(token),
      unitOfWork,
      eventBus,
      telemetry: { auditSink }
    });

    const result = await service.execute({
      tokenHash: 'hash_1',
      plainPassword: 'new-Reset#123',
      newPasswordHash: 'new_hash',
      requestContext: { requestId: 'req_1', correlationId: 'corr_1' },
      now: new Date('2026-08-03T09:00:00.000Z')
    });

    expect(result.passwordHash).toBe('new_hash');
    expect(result.passwordVersion).toBe(2);
    expect(token.usedAt?.toISOString()).toBe('2026-08-03T09:00:00.000Z');
    expect(eventBus.events[0]?.eventName).toBe('identity.user.password_reset_completed.v1');
    expect(auditSink.records[0]?.action).toBe('identity.user.reset_password');
  });
});
