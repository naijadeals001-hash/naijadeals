import {
  IdentityValidationError,
  PasswordPolicyError,
  SessionLifecycleError,
  UnsupportedOAuthProviderError,
  UserStatusTransitionError
} from '@naijadeals/errors';
import type { OAuthProvider, UserStatus } from '@naijadeals/types';

export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_LENGTH = 128;

export const allowedUserStatusTransitions: Record<UserStatus, UserStatus[]> = {
  PENDING: ['EMAIL_UNVERIFIED'],
  EMAIL_UNVERIFIED: ['ACTIVE'],
  ACTIVE: ['LOCKED', 'SUSPENDED', 'BANNED', 'ARCHIVED'],
  LOCKED: ['ACTIVE'],
  SUSPENDED: ['ACTIVE', 'BANNED'],
  BANNED: ['ARCHIVED'],
  ARCHIVED: []
};

export const normalizeEmail = (email: string): string => email.trim().toLowerCase();

export const normalizeOptionalEmail = (email?: string | null): string | null => {
  if (!email) {
    return null;
  }

  const normalized = normalizeEmail(email);
  return normalized || null;
};

export const validateDisplayName = (displayName: string): string => {
  const trimmed = displayName.trim();
  if (trimmed.length < 2 || trimmed.length > 120) {
    throw new IdentityValidationError('Display name must be between 2 and 120 characters.', {
      displayNameLength: trimmed.length
    });
  }

  return trimmed;
};

export const validatePasswordPolicy = (plainPassword: string, normalizedEmail: string): void => {
  if (plainPassword.length < PASSWORD_MIN_LENGTH || plainPassword.length > PASSWORD_MAX_LENGTH) {
    throw new PasswordPolicyError('Password must be between 12 and 128 characters.', {
      minLength: PASSWORD_MIN_LENGTH,
      maxLength: PASSWORD_MAX_LENGTH
    });
  }

  const loweredPassword = plainPassword.toLowerCase();
  if (loweredPassword.includes(normalizedEmail)) {
    throw new PasswordPolicyError('Password must not contain the email address.');
  }

  const hasLowercase = /[a-z]/.test(plainPassword);
  const hasUppercase = /[A-Z]/.test(plainPassword);
  const hasNumber = /\d/.test(plainPassword);
  const hasSymbol = /[^A-Za-z0-9]/.test(plainPassword);
  const signalCount = [hasLowercase, hasUppercase, hasNumber, hasSymbol].filter(Boolean).length;

  if (signalCount < 3) {
    throw new PasswordPolicyError(
      'Password must satisfy at least three of four categories: lowercase, uppercase, number, symbol.'
    );
  }
};

export const validateNonEmptyString = (value: string, fieldName: string): string => {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new IdentityValidationError(`${fieldName} is required.`);
  }

  return trimmed;
};

export const validateFutureDate = (date: Date, now: Date, fieldName: string): void => {
  if (date.getTime() <= now.getTime()) {
    throw new IdentityValidationError(`${fieldName} must be in the future.`, {
      fieldName,
      providedAt: date.toISOString(),
      now: now.toISOString()
    });
  }
};

export const validateUserStatusTransition = (fromStatus: UserStatus, toStatus: UserStatus): void => {
  if (fromStatus === toStatus) {
    return;
  }

  if (!allowedUserStatusTransitions[fromStatus].includes(toStatus)) {
    throw new UserStatusTransitionError(fromStatus, toStatus);
  }
};

export const validateSupportedOAuthProvider = (provider: OAuthProvider): void => {
  if (provider !== 'GOOGLE') {
    throw new UnsupportedOAuthProviderError(provider);
  }
};

export const validateSessionCreationStatus = (status: UserStatus): void => {
  if (!['ACTIVE', 'EMAIL_UNVERIFIED'].includes(status)) {
    throw new SessionLifecycleError('User is not eligible for a new auth session.', { status });
  }
};
