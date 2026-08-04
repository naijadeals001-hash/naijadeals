import { describe, expect, it } from 'vitest';
import {
  ConfirmEmailVerificationService,
  RequestEmailVerificationService,
  type IdentityAuditRecord
} from '../../src/modules/identity/index.js';
import type {
  EmailVerificationTokenRepository,
  UnitOfWork,
  UserRepository
} from '@naijadeals/repository';
import type { DomainEvent, EventBus } from '@naijadeals/events';
import type { EmailVerificationTokenEntity, UserEntity, UserStatus } from '@naijadeals/types';

class InMemoryUsers implements UserRepository {
  public constructor(private readonly user: UserEntity) {}
  public async findById(): Promise<UserEntity | null> { return this.user; }
  public async findByEmail(): Promise<UserEntity | null> { return null; }
  public async create(user: UserEntity): Promise<UserEntity> { return user; }
  public async save(user: UserEntity): Promise<UserEntity> { return user; }
  public async updateStatus(params: {
    userId: string;
    status: UserStatus;
    emailVerifiedAt?: Date | null;
    updatedAt: Date;
  }): Promise<UserEntity> {
    this.user.status = params.status;
    this.user.emailVerifiedAt = params.emailVerifiedAt ?? null;
    this.user.updatedAt = params.updatedAt;
    return this.user;
  }
}

class InMemoryTokens implements EmailVerificationTokenRepository {
  public constructor(private readonly token: EmailVerificationTokenEntity) {}
  public async findByTokenHash(tokenHash: string): Promise<EmailVerificationTokenEntity | null> {
    return this.token.tokenHash === tokenHash ? this.token : null;
  }
  public async create(token: EmailVerificationTokenEntity): Promise<EmailVerificationTokenEntity> {
    this.token.id = token.id;
    this.token.tokenHash = token.tokenHash;
    this.token.expiresAt = token.expiresAt;
    this.token.createdAt = token.createdAt;
    return this.token;
  }
  public async save(token: EmailVerificationTokenEntity): Promise<EmailVerificationTokenEntity> {
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

describe('Email verification domain services', () => {
  it('issues a verification token and emits the requested event', async () => {
    const user: UserEntity = {
      id: 'user_1',
      email: 'user@example.com',
      displayName: 'User',
      status: 'EMAIL_UNVERIFIED',
      emailVerifiedAt: null,
      lastLoginAt: null,
      createdAt: new Date('2026-08-03T00:00:00.000Z'),
      updatedAt: new Date('2026-08-03T00:00:00.000Z')
    };
    const token: EmailVerificationTokenEntity = {
      id: 'seed_token',
      userId: 'user_1',
      tokenHash: 'seed_hash',
      expiresAt: new Date('2026-08-04T00:00:00.000Z'),
      usedAt: null,
      createdAt: new Date('2026-08-03T00:00:00.000Z')
    };
    const eventBus = new RecordingEventBus();
    const auditSink = new RecordingAuditSink();

    const service = new RequestEmailVerificationService({
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
    expect(eventBus.events[0]?.eventName).toBe('identity.user.email_verification_requested.v1');
    expect(auditSink.records[0]?.category).toBe('AUTH');
  });

  it('transitions EMAIL_UNVERIFIED users to ACTIVE and marks the token as used', async () => {
    const user: UserEntity = {
      id: 'user_1',
      email: 'user@example.com',
      displayName: 'User',
      status: 'EMAIL_UNVERIFIED',
      emailVerifiedAt: null,
      lastLoginAt: null,
      createdAt: new Date('2026-08-03T00:00:00.000Z'),
      updatedAt: new Date('2026-08-03T00:00:00.000Z')
    };
    const token: EmailVerificationTokenEntity = {
      id: 'token_1',
      userId: 'user_1',
      tokenHash: 'hash_1',
      expiresAt: new Date('2026-08-04T00:00:00.000Z'),
      usedAt: null,
      createdAt: new Date('2026-08-03T00:00:00.000Z')
    };
    const eventBus = new RecordingEventBus();
    const auditSink = new RecordingAuditSink();

    const service = new ConfirmEmailVerificationService({
      users: new InMemoryUsers(user),
      tokens: new InMemoryTokens(token),
      unitOfWork,
      eventBus,
      telemetry: { auditSink }
    });

    const result = await service.execute({
      tokenHash: 'hash_1',
      requestContext: { requestId: 'req_1', correlationId: 'corr_1' },
      now: new Date('2026-08-03T08:00:00.000Z')
    });

    expect(result.status).toBe('ACTIVE');
    expect(token.usedAt?.toISOString()).toBe('2026-08-03T08:00:00.000Z');
    expect(eventBus.events.map((event) => event.eventName)).toEqual([
      'identity.user.email_verified.v1',
      'identity.user.status.changed.v1'
    ]);
    expect(auditSink.records[0]?.action).toBe('identity.user.confirm_email_verification');
  });
});
