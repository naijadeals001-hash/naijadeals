import { describe, expect, it } from 'vitest';
import {
  CreateAuthSessionService,
  RevokeUserSessionService,
  type IdentityAuditRecord
} from '../../src/modules/identity/index.js';
import type { AuthSessionRepository, UserRepository } from '@naijadeals/repository';
import type { DomainEvent, EventBus } from '@naijadeals/events';
import type { AuthSessionEntity, UserEntity, UserStatus } from '@naijadeals/types';

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

class InMemorySessions implements AuthSessionRepository {
  public constructor(private readonly session: AuthSessionEntity) {}
  public async findById(sessionId: string): Promise<AuthSessionEntity | null> {
    return this.session.id === sessionId ? this.session : null;
  }
  public async findByUserId(): Promise<AuthSessionEntity[]> { return [this.session]; }
  public async findByRefreshTokenHash(refreshTokenHash: string): Promise<AuthSessionEntity | null> {
    return this.session.refreshTokenHash === refreshTokenHash ? this.session : null;
  }
  public async create(session: AuthSessionEntity): Promise<AuthSessionEntity> {
    this.session.id = session.id;
    this.session.userId = session.userId;
    this.session.refreshTokenHash = session.refreshTokenHash;
    this.session.lastUsedAt = session.lastUsedAt;
    this.session.expiresAt = session.expiresAt;
    this.session.userAgent = session.userAgent;
    this.session.ipAddress = session.ipAddress;
    return this.session;
  }
  public async save(session: AuthSessionEntity): Promise<AuthSessionEntity> {
    this.session.revokedAt = session.revokedAt ?? null;
    return this.session;
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

describe('Auth session domain services', () => {
  it('creates an auth session for an eligible user and records audit telemetry', async () => {
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
    const session: AuthSessionEntity = {
      id: 'seed_session',
      userId: 'seed_user',
      refreshTokenHash: 'seed_hash',
      deviceId: null,
      deviceNameSnapshot: null,
      userAgent: null,
      ipAddress: null,
      lastUsedAt: null,
      expiresAt: new Date('2026-08-04T00:00:00.000Z'),
      revokedAt: null,
      createdAt: new Date('2026-08-03T00:00:00.000Z')
    };
    const auditSink = new RecordingAuditSink();

    const service = new CreateAuthSessionService({
      users: new InMemoryUsers(user),
      sessions: new InMemorySessions(session),
      telemetry: { auditSink }
    });

    const result = await service.execute({
      userId: 'user_1',
      sessionId: 'session_1',
      refreshTokenHash: 'hash_1',
      expiresAt: new Date('2026-08-04T00:00:00.000Z'),
      deviceNameSnapshot: 'MacBook Pro',
      userAgent: 'Browser',
      ipAddress: '127.0.0.1',
      requestContext: { requestId: 'req_1', correlationId: 'corr_1', actorId: 'user_1' },
      now: new Date('2026-08-03T10:00:00.000Z')
    });

    expect(result.id).toBe('session_1');
    expect(result.lastUsedAt?.toISOString()).toBe('2026-08-03T10:00:00.000Z');
    expect(auditSink.records[0]?.category).toBe('SESSION');
  });

  it('revokes an active session and emits the revoke event', async () => {
    const session: AuthSessionEntity = {
      id: 'session_1',
      userId: 'user_1',
      refreshTokenHash: 'hash_1',
      deviceId: null,
      deviceNameSnapshot: null,
      userAgent: 'browser',
      ipAddress: '127.0.0.1',
      lastUsedAt: null,
      expiresAt: new Date('2026-08-04T00:00:00.000Z'),
      revokedAt: null,
      createdAt: new Date('2026-08-03T00:00:00.000Z')
    };
    const eventBus = new RecordingEventBus();
    const auditSink = new RecordingAuditSink();

    const service = new RevokeUserSessionService({
      sessions: new InMemorySessions(session),
      eventBus,
      telemetry: { auditSink }
    });

    const result = await service.execute({
      sessionId: 'session_1',
      requestContext: { requestId: 'req_2', correlationId: 'corr_2', actorId: 'user_1' },
      now: new Date('2026-08-03T10:00:00.000Z')
    });

    expect(result.revokedAt?.toISOString()).toBe('2026-08-03T10:00:00.000Z');
    expect(eventBus.events[0]?.eventName).toBe('identity.session.revoked.v1');
    expect(auditSink.records[0]?.action).toBe('identity.session.revoke');
  });
});
