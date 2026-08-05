import type { PasswordService, TokenService } from '@naijadeals/security';
import type {
  PasswordCredentialRepository,
  PasswordResetTokenRepository,
  UnitOfWork,
  UserRepository
} from '@naijadeals/repository';
import { IdentityValidationError, TokenLifecycleError, UserStatusTransitionError } from '@naijadeals/errors';
import type { IdentityContext, PasswordResetCompletionResult } from '../contracts.js';
import { validatePassword } from '../policy/password-policy.js';
import { isActiveForAuthentication } from '../policy/status-policy.js';

export interface CompletePasswordResetCommand {
  token: string;
  newPassword: string;
}

export class PasswordResetCompletionService {
  public constructor(
    private readonly users: UserRepository,
    private readonly credentials: PasswordCredentialRepository,
    private readonly resetTokens: PasswordResetTokenRepository,
    private readonly unitOfWork: UnitOfWork,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly generateId: () => string
  ) {}

  public async completeReset(
    command: CompletePasswordResetCommand,
    _context: IdentityContext
  ): Promise<PasswordResetCompletionResult> {
    const token = command.token ?? '';
    if (token.length === 0) {
      throw new IdentityValidationError('Reset token is required.', { field: 'token' });
    }

    validatePassword(command.newPassword);

    const tokenHash = this.tokenService.hash(token);
    const storedToken = await this.resetTokens.findByTokenHash(tokenHash);

    if (storedToken === null) {
      throw new TokenLifecycleError('Invalid or expired reset token.', { reason: 'token_not_found' });
    }

    const now = new Date();
    if (storedToken.expiresAt < now) {
      throw new TokenLifecycleError('Reset token has expired.', { reason: 'token_expired' });
    }

    if (storedToken.usedAt !== null && storedToken.usedAt !== undefined) {
      throw new TokenLifecycleError('Reset token has already been used.', { reason: 'token_reused' });
    }

    const user = await this.users.findById(storedToken.userId);
    if (user === null) {
      throw new TokenLifecycleError('Invalid or expired reset token.', { reason: 'user_not_found' });
    }

    if (!isActiveForAuthentication(user.status)) {
      if (user.status === 'BANNED' || user.status === 'SUSPENDED' || user.status === 'ARCHIVED') {
        throw new UserStatusTransitionError(user.status, 'ACTIVE');
      }
      throw new IdentityValidationError('Unable to process this request.', { reason: 'reset_completion_failed' });
    }

    return this.unitOfWork.runInTransaction(async () => {
      const usedAt = new Date();
      const updatedAt = usedAt;
      const newPasswordHash = await this.passwordService.hash(command.newPassword);

      const existingCredential = await this.credentials.findByUserId(user.id);
      if (existingCredential === null) {
        await this.credentials.create({
          id: this.generateId(),
          userId: user.id,
          passwordHash: newPasswordHash,
          passwordVersion: 1,
          createdAt: usedAt,
          updatedAt
        });
      } else {
        await this.credentials.save({
          ...existingCredential,
          passwordHash: newPasswordHash,
          passwordVersion: existingCredential.passwordVersion + 1,
          updatedAt
        });
      }

      await this.resetTokens.save({
        ...storedToken,
        usedAt
      });

      return {
        user
      };
    });
  }
}
