import type { RoleRepository, UserRepository, UserRoleRepository } from '@naijadeals/repository';
import { IdentityValidationError, RoleAssignmentError } from '@naijadeals/errors';
import type { UserEntity } from '@naijadeals/types';
import type { IdentityContext, RoleAssignmentResult } from '../contracts.js';

export interface AssignRoleCommand {
  userId: string;
  roleId: string;
  assignedByUserId?: string;
  assignedReason?: string;
  expiresAt?: Date;
}

export class RoleAssignmentService {
  public constructor(
    private readonly users: UserRepository,
    private readonly roles: RoleRepository,
    private readonly userRoles: UserRoleRepository
  ) {}

  public async assignRole(
    command: AssignRoleCommand,
    _context: IdentityContext
  ): Promise<RoleAssignmentResult> {
    if (command.userId.length === 0) {
      throw new IdentityValidationError('User ID is required.', { field: 'userId' });
    }
    if (command.roleId.length === 0) {
      throw new IdentityValidationError('Role ID is required.', { field: 'roleId' });
    }

    if (command.expiresAt !== undefined && command.expiresAt <= new Date()) {
      throw new RoleAssignmentError('Role assignment expiration must be in the future.', {
        field: 'expiresAt'
      });
    }

    const user = await this.users.findById(command.userId);
    if (user === null) {
      throw new IdentityValidationError('User not found.', { field: 'userId', reason: 'user_not_found' });
    }

    const role = await this.roles.findById(command.roleId);
    if (role === null) {
      throw new IdentityValidationError('Role not found.', { field: 'roleId', reason: 'role_not_found' });
    }

    const existing = await this.userRoles.findByUserAndRole(command.userId, command.roleId);
    if (existing !== null) {
      throw new RoleAssignmentError('User already has the requested role.', {
        userId: command.userId,
        roleId: command.roleId
      });
    }

    const assignedAt = new Date();
    await this.userRoles.create({
      userId: command.userId,
      roleId: command.roleId,
      assignedByUserId: command.assignedByUserId ?? null,
      assignedReason: command.assignedReason ?? null,
      assignedAt,
      expiresAt: command.expiresAt ?? null
    });

    return {
      assignment: {
        userId: command.userId,
        roleId: command.roleId,
        assignedAt,
        assignedByUserId: command.assignedByUserId ?? null,
        assignedReason: command.assignedReason ?? null,
        expiresAt: command.expiresAt ?? null
      },
      role: {
        id: role.id,
        slug: role.slug,
        name: role.name
      }
    };
  }

  // Internal helper for resolving the user object for downstream guards.
  public async findUserById(userId: string): Promise<UserEntity | null> {
    return this.users.findById(userId);
  }
}
