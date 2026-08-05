import type { PasswordService, TokenService } from '@naijadeals/security';
import type {
  EmailVerificationTokenRepository,
  PasswordCredentialRepository,
  UnitOfWork,
  UserRepository
} from '@naijadeals/repository';
import { EmailAlreadyExistsError } from '@naijadeals/errors';
import type { PasswordCredentialEntity, UserEntity } from '@naijadeals/types';
import type { IdentityContext, IdentityServiceOptions, RegisteredUser } from '../contracts.js';
import { validateDisplayName, validateEmail } from '../policy/email-policy.js';
import { validatePassword } from '../policy/password-policy.js';

export interface RegistrationCommand {
  email: string;
  password: string;
  displayName: string;
}

export class RegistrationService {
  public constructor(
    private readonly users: UserRepository,
    private readonly credentials: PasswordCredentialRepository,
    private readonly emailTokens: EmailVerificationTokenRepository,
    private readonly unitOfWork: UnitOfWork,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly options: IdentityServiceOptions,
    private readonly generateId: () => string
  ) {}

  public async register(command: RegistrationCommand, _context: IdentityContext): Promise<RegisteredUser> {
    const normalizedEmail = validateEmail(command.email);
    validatePassword(command.password);
    const displayName = validateDisplayName(command.displayName);

    const existing = await this.users.findByEmail(normalizedEmail);
    if (existing !== null) {
      throw new EmailAlreadyExistsError(normalizedEmail);
    }

    return this.unitOfWork.runInTransaction(async () => {
      const now = new Date();
      const user: UserEntity = {
        id: this.generateId(),
        email: normalizedEmail,
        displayName,
        status: 'EMAIL_UNVERIFIED',
        emailVerifiedAt: null,
        lastLoginAt: null,
        createdAt: now,
        updatedAt: now
      };
      const createdUser = await this.users.create(user);

      const passwordHash = await this.passwordService.hash(command.password);
      const credential: PasswordCredentialEntity = {
        id: this.generateId(),
        userId: createdUser.id,
        passwordHash,
        passwordVersion: 1,
        createdAt: now,
        updatedAt: now
      };
      await this.credentials.create(credential);

      const token = this.tokenService.generate();
      const expiresAt = new Date(now.getTime() + this.options.emailVerificationTokenTtlSeconds * 1000);
      await this.emailTokens.create({
        id: this.generateId(),
        userId: createdUser.id,
        tokenHash: token.hashed,
        expiresAt,
        usedAt: null,
        createdAt: now
      });

      return {
        user: createdUser,
        emailVerificationToken: token.token,
        emailVerificationTokenFingerprint: token.fingerprint
      };
    });
  }
}
