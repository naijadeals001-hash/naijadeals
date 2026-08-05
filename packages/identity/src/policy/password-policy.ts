import { PasswordPolicyError } from '@naijadeals/errors';

const MIN_PASSWORD_LENGTH = 12;
const MAX_PASSWORD_LENGTH = 128;
const WHITESPACE_ONLY_PATTERN = /^\s*$/;

export const validatePassword = (password: string): void => {
  if (password === undefined || password === null) {
    throw new PasswordPolicyError('Password is required.', { field: 'password' });
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new PasswordPolicyError('Password must be at least 12 characters long.', {
      field: 'password',
      minLength: MIN_PASSWORD_LENGTH
    });
  }
  if (password.length > MAX_PASSWORD_LENGTH) {
    throw new PasswordPolicyError('Password exceeds maximum allowed length.', {
      field: 'password',
      maxLength: MAX_PASSWORD_LENGTH
    });
  }
  if (WHITESPACE_ONLY_PATTERN.test(password)) {
    throw new PasswordPolicyError('Password cannot be whitespace only.', { field: 'password' });
  }
};
