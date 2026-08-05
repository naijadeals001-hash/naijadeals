import { describe, expect, it } from 'vitest';
import { AppError, PasswordPolicyError, UnsupportedOAuthProviderError, toErrorResult } from '../src/index.js';

describe('AppError', () => {
  it('serializes to the standard error format', () => {
    const error = new AppError({ code: 'TEST_ERROR', message: 'boom', statusCode: 400 });
    expect(toErrorResult(error, 'req_1').error.code).toBe('TEST_ERROR');
  });

  it('exposes identity-specific domain errors', () => {
    const error = new PasswordPolicyError('weak');
    expect(error.code).toBe('PASSWORD_POLICY_ERROR');
    expect(error.statusCode).toBe(400);
  });

  it('captures unsupported OAuth provider usage for Phase 1.1', () => {
    const error = new UnsupportedOAuthProviderError('APPLE');
    expect(error.code).toBe('UNSUPPORTED_OAUTH_PROVIDER');
    expect(error.statusCode).toBe(400);
  });
});
