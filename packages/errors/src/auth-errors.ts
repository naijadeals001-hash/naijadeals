import { AppError } from './app-error.js';

export class IdentityValidationError extends AppError {
  public constructor(message: string, details?: Record<string, unknown>) {
    super({ code: 'IDENTITY_VALIDATION_ERROR', message, statusCode: 400, details });
  }
}

export class EmailAlreadyExistsError extends AppError {
  public constructor(email: string) {
    super({
      code: 'EMAIL_ALREADY_EXISTS',
      message: 'A user with this email already exists.',
      statusCode: 409,
      details: { email }
    });
  }
}

export class PasswordPolicyError extends AppError {
  public constructor(message: string, details?: Record<string, unknown>) {
    super({ code: 'PASSWORD_POLICY_ERROR', message, statusCode: 400, details });
  }
}

export class UserStatusTransitionError extends AppError {
  public constructor(fromStatus: string, toStatus: string) {
    super({
      code: 'INVALID_USER_STATUS_TRANSITION',
      message: `Cannot transition user status from ${fromStatus} to ${toStatus}.`,
      statusCode: 409,
      details: { fromStatus, toStatus }
    });
  }
}

export class RoleAssignmentError extends AppError {
  public constructor(message: string, details?: Record<string, unknown>) {
    super({ code: 'ROLE_ASSIGNMENT_ERROR', message, statusCode: 409, details });
  }
}

export class ProviderAccountError extends AppError {
  public constructor(message: string, details?: Record<string, unknown>) {
    super({ code: 'PROVIDER_ACCOUNT_ERROR', message, statusCode: 409, details });
  }
}

export class UnsupportedOAuthProviderError extends AppError {
  public constructor(provider: string) {
    super({
      code: 'UNSUPPORTED_OAUTH_PROVIDER',
      message: `OAuth provider '${provider}' is not approved for Phase 1.1.`,
      statusCode: 400,
      details: { provider }
    });
  }
}

export class TokenLifecycleError extends AppError {
  public constructor(message: string, details?: Record<string, unknown>) {
    super({ code: 'TOKEN_LIFECYCLE_ERROR', message, statusCode: 409, details });
  }
}

export class SessionLifecycleError extends AppError {
  public constructor(message: string, details?: Record<string, unknown>) {
    super({ code: 'SESSION_LIFECYCLE_ERROR', message, statusCode: 409, details });
  }
}
