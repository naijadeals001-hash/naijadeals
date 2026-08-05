export type {
  IdentityContext,
  RegisteredUser,
  LoginValidationResult,
  EmailVerificationResult,
  PasswordResetRequestResult,
  PasswordResetCompletionResult,
  ProfileUpdateResult,
  RoleAssignmentResult,
  IdentityServiceOptions
} from './contracts.js';

export { defaultIdentityServiceOptions, defaultAllowedStatusTransitions } from './options.js';

export {
  normalizeEmail,
  validateEmail,
  validateDisplayName
} from './policy/email-policy.js';

export { validatePassword } from './policy/password-policy.js';

export {
  assertStatusTransition,
  assertCanAuthenticate,
  isActiveForAuthentication
} from './policy/status-policy.js';

export {
  RegistrationService,
  type RegistrationCommand
} from './services/registration-service.js';

export {
  LoginValidationService,
  type LoginValidationCommand
} from './services/login-validation-service.js';

export {
  EmailVerificationService,
  type RequestEmailVerificationCommand,
  type ConfirmEmailVerificationCommand
} from './services/email-verification-service.js';

export {
  PasswordResetRequestService,
  type RequestPasswordResetCommand
} from './services/password-reset-request-service.js';

export {
  PasswordResetCompletionService,
  type CompletePasswordResetCommand
} from './services/password-reset-completion-service.js';

export {
  ProfileUpdateService,
  type UpdateProfileCommand
} from './services/profile-update-service.js';

export {
  RoleAssignmentService,
  type AssignRoleCommand
} from './services/role-assignment-service.js';
