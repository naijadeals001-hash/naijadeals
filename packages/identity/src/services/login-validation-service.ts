import type { PasswordService } from '@naijadeals/security';
import type {
  PasswordCredentialRepository,
  RoleRepository,
  UserRepository
} from '@naijadeals/repository';
import { IdentityValidationError } from '@naijadeals/errors';
import type { IdentityContext, LoginValidationResult } from '../contracts.js';
import { normalizeEmail } from '../policy/email-policy.js';
import { assertCanAuthenticate } from '../policy/status-policy.js';

export interface LoginValidationCommand {
  email: string;
  password: string;
}

export class LoginValidationService {
  public constructor(
    private readonly users: UserRepository,
    private readonly credentials: PasswordCredentialRepository,
    private readonly roles: RoleRepository,
    private readonly passwordService: PasswordService
  ) {}

  public async validate(command: LoginValidationCommand, _context: IdentityContext): Promise<LoginValidationResult> {
    const normalizedEmail = normalizeEmail(command.email);
    if (normalizedEmail.length === 0) {
      throw new IdentityValidationError('Email is required.', { field: 'email' });
    }
    if ((command.password ?? '').length === 0) {
      throw new IdentityValidationError('Password is required.', { field: 'password' });
    }

    const user = await this.users.findByEmail(normalizedEmail);
    if (user === null) {
      // Generic failure to avoid account enumeration.
      throw new IdentityValidationError('Invalid email or password.', { reason: 'authentication_failed' });
    }

    assertCanAuthenticate(user.status, user.id);

    const credential = await this.credentials.findByUserId(user.id);
    if (credential === null) {
      throw new IdentityValidationError('Invalid email or password.', { reason: 'authentication_failed' });
    }

    const passwordValid = await this.passwordService.verify(command.password, credential.passwordHash);
    if (!passwordValid) {
      throw new IdentityValidationError('Invalid email or password.', { reason: 'authentication_failed' });
    }

    const roleEntities = await this.roles.findByUserId(user.id);
    const permissionCodes: string[] = [];

    return {
      user,
      credential: {
        userId: credential.userId,
        passwordHash: credential.passwordHash,
        passwordVersion: credential.passwordVersion
      },
      passwordNeedsRehash: this.passwordService.needsRehash(credential.passwordHash),
      roles: {
        roles: roleEntities,
        permissions: [],
        permissionCodes
      }
    };
  }
}
