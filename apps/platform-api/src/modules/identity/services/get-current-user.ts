import { IdentityValidationError } from '@naijadeals/errors';
import type {
  PermissionRepository,
  RoleRepository,
  UserRepository,
  UserRoleRepository
} from '@naijadeals/repository';
import type { AuthorizationSnapshot, PermissionEntity, UserEntity } from '@naijadeals/types';

export interface GetCurrentUserQuery {
  userId: string;
  now?: Date;
}

export interface CurrentUserIdentity {
  user: UserEntity;
  authorization: AuthorizationSnapshot;
}

export interface GetCurrentUserDependencies {
  users: UserRepository;
  roles: RoleRepository;
  userRoles: UserRoleRepository;
  permissions: PermissionRepository;
}

const isActiveAssignment = (expiresAt: Date | null | undefined, now: Date): boolean =>
  !expiresAt || expiresAt.getTime() > now.getTime();

export class GetCurrentUserService {
  public constructor(private readonly dependencies: GetCurrentUserDependencies) {}

  public async execute(query: GetCurrentUserQuery): Promise<CurrentUserIdentity> {
    const user = await this.dependencies.users.findById(query.userId);
    if (!user) {
      throw new IdentityValidationError('User does not exist.', { userId: query.userId });
    }

    const now = query.now ?? new Date();
    const assignments = (await this.dependencies.userRoles.findByUserId(user.id)).filter((assignment) =>
      isActiveAssignment(assignment.expiresAt, now)
    );

    const roles = await this.dependencies.roles.findByUserId(user.id);
    const activeRoleIds = new Set(assignments.map((assignment) => assignment.roleId));
    const activeRoles = roles.filter((role) => activeRoleIds.has(role.id));

    const permissions = await this.dependencies.permissions.findByRoleIds(activeRoles.map((role) => role.id));
    const deduplicatedPermissions: PermissionEntity[] = [];
    const seenPermissionCodes = new Set<string>();

    for (const permission of permissions) {
      if (seenPermissionCodes.has(permission.code)) {
        continue;
      }
      seenPermissionCodes.add(permission.code);
      deduplicatedPermissions.push(permission);
    }

    return {
      user,
      authorization: {
        roles: activeRoles,
        permissions: deduplicatedPermissions,
        permissionCodes: deduplicatedPermissions.map((permission) => permission.code)
      }
    };
  }
}
