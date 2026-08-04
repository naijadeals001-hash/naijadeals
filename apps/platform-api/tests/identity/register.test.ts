import { describe, expect, it } from 'vitest';
import { RegisterUserService, type IdentityAuditRecord, type IdentityDomainLogger } from '../../src/modules/identity/index.js';
import type {
  PasswordCredentialRepository,
  RoleRepository,
  UnitOfWork,
  UserRepository,
  UserRoleRepository
} from '@naijadeals/repository';
import type { DomainEvent, EventBus } from '@naijadeals/events';
import type { PasswordCredentialEntity, RoleEntity, UserEntity, UserRoleEntity } from '@naijadeals/types';

class InMemoryUsers implements UserRepository {
  public readonly items = new Map<string, UserEntity>();
  public async findById(id: string): Promise<UserEntity | null> { return this.items.get(id) ?? null; }
  public async findByEmail(email: string): Promise<UserEntity | null> {
    return [...this.items.values()].find((item) => item.email === email) ?? null;
  }
  public async create(user: UserEntity): Promise<UserEntity> { this.items.set(user.id, user); return user; }
  public async save(user: UserEntity): Promise<UserEntity> { this.items.set(user.id, user); return user; }
  public async updateStatus(): Promise<UserEntity> { throw new Error('not used'); }
}

class InMemoryCredentials implements PasswordCredentialRepository {
  public readonly items = new Map<string, PasswordCredentialEntity>();
  public async findByUserId(userId: string): Promise<PasswordCredentialEntity | null> {
    return [...this.items.values()].find((item) => item.userId === userId) ?? null;
  }
  public async create(credential: PasswordCredentialEntity): Promise<PasswordCredentialEntity> { this.items.set(credential.id, credential); return credential; }
  public async save(credential: PasswordCredentialEntity): Promise<PasswordCredentialEntity> { this.items.set(credential.id, credential); return credential; }
}

class InMemoryRoles implements RoleRepository {
  public constructor(private readonly roles: RoleEntity[]) {}
  public async findById(id: string): Promise<RoleEntity | null> { return this.roles.find((role) => role.id === id) ?? null; }
  public async findBySlug(slug: string): Promise<RoleEntity | null> { return this.roles.find((role) => role.slug === slug) ?? null; }
  public async findByUserId(): Promise<RoleEntity[]> { return []; }
}

class InMemoryUserRoles implements UserRoleRepository {
  public readonly items: UserRoleEntity[] = [];
  public async findByUserId(userId: string): Promise<UserRoleEntity[]> { return this.items.filter((item) => item.userId === userId); }
  public async findByUserAndRole(userId: string, roleId: string): Promise<UserRoleEntity | null> {
    return this.items.find((item) => item.userId === userId && item.roleId === roleId) ?? null;
  }
  public async create(assignment: UserRoleEntity): Promise<UserRoleEntity> { this.items.push(assignment); return assignment; }
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

class RecordingLogger implements IdentityDomainLogger {
  public readonly infoLogs: Array<Record<string, unknown>> = [];
  public readonly warnLogs: Array<Record<string, unknown>> = [];
  public readonly errorLogs: Array<Record<string, unknown>> = [];
  public info(payload: Record<string, unknown>): void { this.infoLogs.push(payload); }
  public warn(payload: Record<string, unknown>): void { this.warnLogs.push(payload); }
  public error(payload: Record<string, unknown>): void { this.errorLogs.push(payload); }
}

const unitOfWork: UnitOfWork = {
  async runInTransaction<T>(handler: () => Promise<T>): Promise<T> {
    return handler();
  }
};

describe('RegisterUserService', () => {
  it('normalizes email, validates password policy, assigns the initial role, and emits domain telemetry', async () => {
    const users = new InMemoryUsers();
    const credentials = new InMemoryCredentials();
    const roles = new InMemoryRoles([
      {
        id: 'role_customer',
        slug: 'customer',
        name: 'Customer',
        isSystem: true,
        description: null,
        createdAt: new Date('2026-08-03T00:00:00.000Z'),
        updatedAt: new Date('2026-08-03T00:00:00.000Z')
      }
    ]);
    const userRoles = new InMemoryUserRoles();
    const eventBus = new RecordingEventBus();
    const auditSink = new RecordingAuditSink();
    const logger = new RecordingLogger();

    const service = new RegisterUserService({
      users,
      passwordCredentials: credentials,
      roles,
      userRoles,
      unitOfWork,
      eventBus,
      telemetry: { auditSink, logger }
    });

    const result = await service.execute({
      userId: 'user_1',
      credentialId: 'credential_1',
      email: '  Founder@NaijaDeals.com ',
      displayName: 'Founder One',
      plainPassword: 'UltraSecure#123',
      passwordHash: 'hashed-password',
      initialRoleSlug: 'customer',
      requestContext: { requestId: 'req_1', correlationId: 'corr_1' },
      now: new Date('2026-08-03T01:00:00.000Z')
    });

    expect(result.user.email).toBe('founder@naijadeals.com');
    expect(result.user.status).toBe('EMAIL_UNVERIFIED');
    expect(result.credential.passwordVersion).toBe(1);
    expect(result.assignment?.roleId).toBe('role_customer');
    expect(eventBus.events.map((event) => event.eventName)).toEqual([
      'identity.user.email.normalized.v1',
      'identity.user.created.v1',
      'identity.role.assigned.v1'
    ]);
    expect(auditSink.records.map((record) => record.category)).toEqual(['AUTH', 'RBAC']);
    expect(logger.infoLogs).toHaveLength(1);
  });
});
