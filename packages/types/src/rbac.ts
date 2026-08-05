export const platformRoles = [
  'guest',
  'customer',
  'merchant',
  'supplier',
  'farmer',
  'restaurant',
  'driver',
  'host',
  'freelancer',
  'creator',
  'support_agent',
  'support_manager',
  'operations_admin',
  'finance_admin',
  'moderator',
  'platform_admin',
  'super_admin'
] as const;

export type PlatformRole = (typeof platformRoles)[number];

export interface RoleEntity {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PermissionEntity {
  id: string;
  code: string;
  resource: string;
  action: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRoleEntity {
  userId: string;
  roleId: string;
  assignedByUserId?: string | null;
  assignedReason?: string | null;
  assignedAt: Date;
  expiresAt?: Date | null;
}

export interface RolePermissionEntity {
  roleId: string;
  permissionId: string;
  createdAt: Date;
}

export interface AuthorizationSnapshot {
  roles: RoleEntity[];
  permissions: PermissionEntity[];
  permissionCodes: string[];
}
