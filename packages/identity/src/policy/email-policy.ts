import { IdentityValidationError } from '@naijadeals/errors';

const EMAIL_MAX_LENGTH = 254;
const DISPLAY_NAME_MIN_LENGTH = 2;
const DISPLAY_NAME_MAX_LENGTH = 120;

export const normalizeEmail = (email: string): string => {
  const trimmed = (email ?? '').trim().toLowerCase();
  return trimmed;
};

export const validateEmail = (email: string): string => {
  const normalized = normalizeEmail(email);
  if (normalized.length === 0) {
    throw new IdentityValidationError('Email is required.', { field: 'email' });
  }
  if (normalized.length > EMAIL_MAX_LENGTH) {
    throw new IdentityValidationError('Email exceeds maximum allowed length.', { field: 'email' });
  }
  // RFC 5322 simplified validation: local@domain with at least one dot in domain.
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(normalized)) {
    throw new IdentityValidationError('Email format is invalid.', { field: 'email', email: normalized });
  }
  return normalized;
};

export const validateDisplayName = (displayName: string): string => {
  const trimmed = (displayName ?? '').trim();
  if (trimmed.length === 0) {
    throw new IdentityValidationError('Display name is required.', { field: 'displayName' });
  }
  if (trimmed.length < DISPLAY_NAME_MIN_LENGTH) {
    throw new IdentityValidationError('Display name is too short.', {
      field: 'displayName',
      minLength: DISPLAY_NAME_MIN_LENGTH
    });
  }
  if (trimmed.length > DISPLAY_NAME_MAX_LENGTH) {
    throw new IdentityValidationError('Display name is too long.', {
      field: 'displayName',
      maxLength: DISPLAY_NAME_MAX_LENGTH
    });
  }
  return trimmed;
};
