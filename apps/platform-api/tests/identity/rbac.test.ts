import { describe, expect, it } from 'vitest';
import {
  AssignUserRoleService,
  GetCurrentUserService,
  type IdentityAuditRecord
} from '../../src/modules/identity/index.js';
import type {
  PermissionRepository,
  RoleRepository,
  UserRepository,
  UserRoleRepository
} from '@naijadeals/repository';
import type { DomainEvent, EventBus } from '@naijadeals/events';
import type { PermissionEntity, RoleEntity, UserEntity, UserRoleEntity, UserStatus } from '@naijadeals/types';

class InMemoryUsers implements UserRepository {
  public constructor(private readonly user: UserEntity, private readonly actor?: UserEntity) {}
  public async findById(id: string): Promise<UserEntity | null> {
    if (id === this.user.id) {
      return this.user;
    }

    if (this.actor && id === this.actor.id) {
      return this.actor;
    }

    return null;
  }
  public async findByEmail(): Promise<UserEntity | null> { return null; }
  public async create(user: UserEntity): Promise<UserEntity> { return user; }
  public async save(user: UserEntity): Promise<UserEntity> { return user; }
  public async updateStatus(params: { userId: string; status: UserStatus; updatedAt: Date }): Promise<UserEntity> {
    this.user.status = params.status;
    this.user.updatedAt = params.updatedAt;
    return this.user;
  }
}

class InMemoryRoles implements RoleRepository {
  public constructor(private readonly roles: RoleEntity[]) {}
  public async findById(id: string): Promise<RoleEntity | null> { return this.roles.find((role) => role.id === id) ?? null; }
  public async findBySlug(slug: string): Promise<RoleEntity | null> { return this.roles.find((role) => role.slug === slug) ?? null; }
  public async findByUserId(): Promise<RoleEntity[]> { return this.roles; }
}

class InMemoryUserRoles implements UserRoleRepository {
  public constructor(private readonly assignments: UserRoleEntity[]) {}
  public async findByUserId(): Promise<UserRoleEntity[]> { return this.assignments; }
  public async findByUserAndRole(userId: string, roleId: string): Promise<UserRoleEntity | null> {
    return this.assignments.find((assignment) => assignment.userId === userId && assignment.roleId === roleId) ?? null;
  }
  public async create(assignment: UserRoleEntity): Promise<UserRoleEntity> {
    this.assignments.push(assignment);
    return assignment;
  }
}

class InMemoryPermissions implements PermissionRepository {
  public constructor(private readonly permissions: PermissionEntity[]) {}
  public async findByRoleIds(): Promise<PermissionEntity[]> { return this.permissions; }
  public async findByCodes(codes: string[]): Promise<PermissionEntity[]> {
    return this.permissions.filter((permission) => codes.includes(permission.code));
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

describe('RBAC domain services', () => {
  it('returns deduplicated permissions across active roles only', async () => {
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

    const roleA: RoleEntity = {
      id: 'role_customer',
      slug: 'customer',
      name: 'Customer',
      description: null,
      isSystem: true,
      createdAt: new Date('2026-08-03T00:00:00.000Z'),
      updatedAt: new Date('2026-08-03T00:00:00.000Z')
    };

    const roleB: RoleEntity = {
      id: 'role_support',
      slug: 'support_agent',
      name: 'Support',
      description: null,
      isSystem: true,
      createdAt: new Date('2026-08-03T00:00:00.000Z'),
      updatedAt: new Date('2026-08-03T00:00:00.000Z')
    };

    const permissions: PermissionEntity[] = [
      {
        id: 'permission_1',
        code: 'identity:sessions:revoke:self',
        resource: 'identity:sessions',
        action: 'revoke:self',
        description: null,
        createdAt: new Date('2026-08-03T00:00:00.000Z'),
        updatedAt: new Date('2026-08-03T00:00:00.000Z')
      },
      {
        id: 'permission_2',
        code: 'identity:sessions:revoke:self',
        resource: 'identity:sessions',
        action: 'revoke:self',
        description: null,
        createdAt: new Date('2026-08-03T00:00:00.000Z'),
        updatedAt: new Date('2026-08-03T00:00:00.000Z')
      }
    ];

    const service = new GetCurrentUserService({
      users: new InMemoryUsers(user),
      roles: new InMemoryRoles([roleA, roleB]),
      userRoles: new InMemoryUserRoles([
        {
          userId: 'user_1',
          roleId: 'role_customer',
          assignedAt: new Date('2026-08-03T00:00:00.000Z'),
          assignedByUserId: null,
          assignedReason: 'registration',
          expiresAt: null
        },
        {
          userId: 'user_1',
          roleId: 'role_support',
          assignedAt: new Date('2026-08-03T00:00:00.000Z'),
          assignedByUserId: null,
          assignedReason: 'expired',
          expiresAt: new Date('2026-08-03T00:00:01.000Z')
        }
      ]),
      permissions: new InMemoryPermissions(permissions)
    });

    const result = await service.execute({
      userId: 'user_1',
      now: new Date('2026-08-03T00:00:02.000Z')
    });

    expect(result.authorization.roles).toHaveLength(1);
    expect(result.authorization.permissionCodes).toEqual(['identity:sessions:revoke:self']);
  });

  it('assigns a role, emits an RBAC event, and records an audit entry', async () => {
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
    const actor: UserEntity = { ...user, id: 'admin_1', email: 'admin@example.com' };
    const role: RoleEntity = {
      id: 'role_support',
      slug: 'support_agent',
      name: 'Support',
      description: null,
      isSystem: true,
      createdAt: new Date('2026-08-03T00:00:00.000Z'),
      updatedAt: new Date('2026-08-03T00:00:00.000Z')
    };
    const assignments: UserRoleEntity[] = [];
    const eventBus = new RecordingEventBus();
    const auditSink = new RecordingAuditSink();

    const service = new AssignUserRoleService({
      users: new InMemoryUsers(user, actor),
      roles: new InMemoryRoles([role]),
      userRoles: new InMemoryUserRoles(assignments),
      eventBus,
      telemetry: { auditSink }
    });

    const result = await service.execute({
      userId: 'user_1',
      roleSlug: 'support_agent',
      assignedByUserId: 'admin_1',
      assignedReason: 'support onboarding',
      requestContext: { requestId: 'req_2', correlationId: 'corr_2', actorId: 'admin_1' },
      now: new Date('2026-08-03T11:00:00.000Z')
    });

    expect(result.roleId).toBe('role_support');
    expect(eventBus.events[0]?.eventName).toBe('identity.role.assigned.v1');
    expect(auditSink.records[0]?.category).toBe('RBAC');
  });
});
