import { IdentityValidationError, RoleAssignmentError } from '@naijadeals/errors';
import {
  createIdentityRoleAssignedEvent,
  type EventBus
} from '@naijadeals/events';
import type {
  RoleRepository,
  UserRepository,
  UserRoleRepository
} from '@naijadeals/repository';
import type { RequestContext, RoleEntity, UserRoleEntity } from '@naijadeals/types';
import { resolveIdentityTelemetry, type IdentityDomainTelemetry } from '../support.js';
import { validateFutureDate, validateNonEmptyString } from './domain-rules.js';

export interface AssignUserRoleCommand {
  userId: string;
  roleId?: string;
  roleSlug?: string;
  assignedByUserId?: string | null;
  assignedReason?: string | null;
  expiresAt?: Date | null;
  requestContext: RequestContext;
  now?: Date;
}

export interface AssignUserRoleDependencies {
  users: UserRepository;
  roles: RoleRepository;
  userRoles: UserRoleRepository;
  eventBus: EventBus;
  telemetry?: IdentityDomainTelemetry;
}

const resolveRole = async (
  roles: RoleRepository,
  roleId?: string,
  roleSlug?: string
): Promise<RoleEntity | null> => {
  if (roleId) {
    return roles.findById(roleId);
  }

  if (roleSlug) {
    return roles.findBySlug(roleSlug);
  }

  return null;
};

export class AssignUserRoleService {
  public constructor(private readonly dependencies: AssignUserRoleDependencies) {}

  public async execute(command: AssignUserRoleCommand): Promise<UserRoleEntity> {
    const telemetry = resolveIdentityTelemetry(this.dependencies.telemetry);
    const now = command.now ?? new Date();

    if (!command.roleId && !command.roleSlug) {
      throw new IdentityValidationError('Role identifier is required.');
    }

    const user = await this.dependencies.users.findById(command.userId);
    if (!user) {
      throw new IdentityValidationError('Target user does not exist for role assignment.', {
        userId: command.userId
      });
    }

    if (command.assignedByUserId) {
      const actor = await this.dependencies.users.findById(command.assignedByUserId);
      if (!actor) {
        throw new IdentityValidationError('Assigned-by user does not exist for role assignment.', {
          assignedByUserId: command.assignedByUserId
        });
      }
    }

    const role = await resolveRole(this.dependencies.roles, command.roleId, command.roleSlug);
    if (!role) {
      throw new RoleAssignmentError('Role does not exist.', {
        roleId: command.roleId,
        roleSlug: command.roleSlug
      });
    }

    if (command.expiresAt) {
      validateFutureDate(command.expiresAt, now, 'Role assignment expiry');
    }

    const existingAssignment = await this.dependencies.userRoles.findByUserAndRole(user.id, role.id);
    if (existingAssignment) {
      throw new RoleAssignmentError('User already has the assigned role.', {
        userId: user.id,
        roleId: role.id
      });
    }

    const assignment: UserRoleEntity = {
      userId: user.id,
      roleId: role.id,
      assignedByUserId: command.assignedByUserId ?? null,
      assignedReason: command.assignedReason
        ? validateNonEmptyString(command.assignedReason, 'Assigned reason')
        : 'identity-domain-assignment',
      assignedAt: now,
      expiresAt: command.expiresAt ?? null
    };

    const createdAssignment = await this.dependencies.userRoles.create(assignment);

    await this.dependencies.eventBus.publish(
      createIdentityRoleAssignedEvent({
        userId: user.id,
        roleId: role.id,
        roleSlug: role.slug,
        context: command.requestContext
      })
    );

    await telemetry.auditSink.record({
      category: 'RBAC',
      action: 'identity.role.assign',
      actorId: command.assignedByUserId ?? command.requestContext.actorId,
      targetType: 'role',
      targetId: role.id,
      status: 'succeeded',
      metadata: { userId: user.id, roleSlug: role.slug },
      requestContext: command.requestContext,
      occurredAt: now
    });

    telemetry.logger.info(
      {
        userId: user.id,
        roleId: role.id,
        roleSlug: role.slug,
        requestId: command.requestContext.requestId,
        correlationId: command.requestContext.correlationId
      },
      'User role assigned'
    );

    return createdAssignment;
  }
}
