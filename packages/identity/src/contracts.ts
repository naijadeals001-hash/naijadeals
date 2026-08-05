import type { AuthorizationSnapshot, UserEntity, UserStatus } from '@naijadeals/types';

export interface IdentityContext {
  readonly requestId: string;
}

export interface RegisteredUser {
  user: UserEntity;
  emailVerificationToken?: string;
  emailVerificationTokenFingerprint?: string;
}

export interface LoginValidationResult {
  user: UserEntity;
  credential: {
    userId: string;
    passwordHash: string;
    passwordVersion: number;
  };
  passwordNeedsRehash: boolean;
  roles: AuthorizationSnapshot;
}

export interface EmailVerificationResult {
  user: UserEntity;
  tokenFingerprint: string;
}

export interface PasswordResetRequestResult {
  user: UserEntity;
  resetToken: string;
  resetTokenFingerprint: string;
}

export interface PasswordResetCompletionResult {
  user: UserEntity;
}

export interface ProfileUpdateResult {
  user: UserEntity;
  previousDisplayName: string;
  previousStatus: UserStatus;
}

export interface RoleAssignmentResult {
  assignment: {
    userId: string;
    roleId: string;
    assignedAt: Date;
    assignedByUserId?: string | null;
    assignedReason?: string | null;
    expiresAt?: Date | null;
  };
  role: {
    id: string;
    slug: string;
    name: string;
  };
}

export interface IdentityServiceOptions {
  emailVerificationTokenTtlSeconds: number;
  passwordResetTokenTtlSeconds: number;
  allowedTransitions: Readonly<Record<string, readonly UserStatus[]>>;
}
