import type {
  AuthSessionEntity,
  EmailVerificationTokenEntity,
  OAuthProvider,
  PasswordCredentialEntity,
  PasswordResetTokenEntity,
  ProviderAccountEntity,
  PermissionEntity,
  RoleEntity,
  RolePermissionEntity,
  UserEntity,
  UserRoleEntity,
  UserStatus
} from '@naijadeals/types';

export interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  create(user: UserEntity): Promise<UserEntity>;
  save(user: UserEntity): Promise<UserEntity>;
  updateStatus(params: {
    userId: string;
    status: UserStatus;
    emailVerifiedAt?: Date | null;
    lastLoginAt?: Date | null;
    updatedAt: Date;
  }): Promise<UserEntity>;
}

export interface PasswordCredentialRepository {
  findByUserId(userId: string): Promise<PasswordCredentialEntity | null>;
  create(credential: PasswordCredentialEntity): Promise<PasswordCredentialEntity>;
  save(credential: PasswordCredentialEntity): Promise<PasswordCredentialEntity>;
}

export interface ProviderAccountRepository {
  findByProviderIdentity(provider: OAuthProvider, providerUserId: string): Promise<ProviderAccountEntity | null>;
  findByUserAndProvider(userId: string, provider: OAuthProvider): Promise<ProviderAccountEntity | null>;
  create(account: ProviderAccountEntity): Promise<ProviderAccountEntity>;
  save(account: ProviderAccountEntity): Promise<ProviderAccountEntity>;
}

export interface AuthSessionRepository {
  findById(sessionId: string): Promise<AuthSessionEntity | null>;
  findByUserId(userId: string): Promise<AuthSessionEntity[]>;
  findByRefreshTokenHash(refreshTokenHash: string): Promise<AuthSessionEntity | null>;
  create(session: AuthSessionEntity): Promise<AuthSessionEntity>;
  save(session: AuthSessionEntity): Promise<AuthSessionEntity>;
}

export interface EmailVerificationTokenRepository {
  findByTokenHash(tokenHash: string): Promise<EmailVerificationTokenEntity | null>;
  create(token: EmailVerificationTokenEntity): Promise<EmailVerificationTokenEntity>;
  save(token: EmailVerificationTokenEntity): Promise<EmailVerificationTokenEntity>;
}

export interface PasswordResetTokenRepository {
  findByTokenHash(tokenHash: string): Promise<PasswordResetTokenEntity | null>;
  create(token: PasswordResetTokenEntity): Promise<PasswordResetTokenEntity>;
  save(token: PasswordResetTokenEntity): Promise<PasswordResetTokenEntity>;
}

export interface RoleRepository {
  findById(id: string): Promise<RoleEntity | null>;
  findBySlug(slug: string): Promise<RoleEntity | null>;
  findByUserId(userId: string): Promise<RoleEntity[]>;
}

export interface PermissionRepository {
  findByRoleIds(roleIds: string[]): Promise<PermissionEntity[]>;
  findByCodes(codes: string[]): Promise<PermissionEntity[]>;
}

export interface UserRoleRepository {
  findByUserId(userId: string): Promise<UserRoleEntity[]>;
  findByUserAndRole(userId: string, roleId: string): Promise<UserRoleEntity | null>;
  create(assignment: UserRoleEntity): Promise<UserRoleEntity>;
}

export interface RolePermissionRepository {
  findByRoleIds(roleIds: string[]): Promise<RolePermissionEntity[]>;
}
