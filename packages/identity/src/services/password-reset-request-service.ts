import type { TokenService } from '@naijadeals/security';
import type {
  PasswordResetTokenRepository,
  UnitOfWork,
  UserRepository
} from '@naijadeals/repository';
import { IdentityValidationError, UserStatusTransitionError } from '@naijadeals/errors';
import type { IdentityContext, IdentityServiceOptions, PasswordResetRequestResult } from '../contracts.js';
import { validateEmail } from '../policy/email-policy.js';
import { isActiveForAuthentication } from '../policy/status-policy.js';

export interface RequestPasswordResetCommand {
  email: string;
}

export class PasswordResetRequestService {
  public constructor(
    private readonly users: UserRepository,
    private readonly resetTokens: PasswordResetTokenRepository,
    private readonly unitOfWork: UnitOfWork,
    private readonly tokenService: TokenService,
    private readonly options: IdentityServiceOptions,
    private readonly generateId: () => string
  ) {}

  public async requestReset(
    command: RequestPasswordResetCommand,
    _context: IdentityContext
  ): Promise<PasswordResetRequestResult> {
    const normalizedEmail = validateEmail(command.email);

    const user = await this.users.findByEmail(normalizedEmail);
    if (user === null) {
      // Generic failure to avoid account enumeration.
      throw new IdentityValidationError('Unable to process this request.', { reason: 'reset_request_failed' });
    }

    if (user.status === 'BANNED' || user.status === 'SUSPENDED' || user.status === 'ARCHIVED') {
      throw new UserStatusTransitionError(user.status, 'ACTIVE');
    }

    if (!isActiveForAuthentication(user.status)) {
      throw new IdentityValidationError('Unable to process this request.', { reason: 'reset_request_failed' });
    }

    return this.unitOfWork.runInTransaction(async () => {
      const now = new Date();
      const token = this.tokenService.generate();
      const expiresAt = new Date(now.getTime() + this.options.passwordResetTokenTtlSeconds * 1000);

      await this.resetTokens.create({
        id: this.generateId(),
        userId: user.id,
        tokenHash: token.hashed,
        expiresAt,
        usedAt: null,
        createdAt: now
      });

      return {
        user,
        resetToken: token.token,
        resetTokenFingerprint: token.fingerprint
      };
    });
  }
}
