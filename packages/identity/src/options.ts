import type { UserStatus } from '@naijadeals/types';
import type { IdentityServiceOptions } from './contracts.js';

export const defaultAllowedStatusTransitions: Readonly<Record<UserStatus, readonly UserStatus[]>> = {
  PENDING: ['EMAIL_UNVERIFIED', 'ACTIVE'],
  EMAIL_UNVERIFIED: ['ACTIVE'],
  ACTIVE: ['LOCKED', 'SUSPENDED', 'BANNED', 'ARCHIVED'],
  LOCKED: ['ACTIVE'],
  SUSPENDED: ['ACTIVE', 'BANNED'],
  BANNED: ['ARCHIVED'],
  ARCHIVED: []
};

export const defaultIdentityServiceOptions: IdentityServiceOptions = {
  emailVerificationTokenTtlSeconds: 24 * 60 * 60,
  passwordResetTokenTtlSeconds: 60 * 60,
  allowedTransitions: defaultAllowedStatusTransitions
};
