import type { TokenService } from '@naijadeals/security';
import type {
  EmailVerificationTokenRepository,
  UnitOfWork,
  UserRepository
} from '@naijadeals/repository';
import { IdentityValidationError, TokenLifecycleError, UserStatusTransitionError } from '@naijadeals/errors';
import type { EmailVerificationTokenEntity } from '@naijadeals/types';
import type { EmailVerificationResult, IdentityContext, IdentityServiceOptions } from '../contracts.js';

const DEFAULT_FINGERPRINT_PREFIX_LENGTH = 16;
import { validateEmail } from '../policy/email-policy.js';
import { assertStatusTransition } from '../policy/status-policy.js';

export interface RequestEmailVerificationCommand {
  email: string;
}

export interface ConfirmEmailVerificationCommand {
  token: string;
}

export class EmailVerificationService {
  public constructor(
    private readonly users: UserRepository,
    private readonly emailTokens: EmailVerificationTokenRepository,
    private readonly unitOfWork: UnitOfWork,
    private readonly tokenService: TokenService,
    private readonly options: IdentityServiceOptions,
    private readonly generateId: () => string
  ) {}

  public async requestVerification(
    command: RequestEmailVerificationCommand,
    _context: IdentityContext
  ): Promise<EmailVerificationResult & { rawToken: string }> {
    const normalizedEmail = validateEmail(command.email);
    const user = await this.users.findByEmail(normalizedEmail);

    if (user === null) {
      // Generic response to avoid account enumeration.
      throw new IdentityValidationError('Unable to process this request.', { reason: 'verification_request_failed' });
    }

    if (user.status === 'ACTIVE') {
      throw new IdentityValidationError('Email is already verified.', { reason: 'already_verified' });
    }

    if (user.status === 'BANNED' || user.status === 'SUSPENDED' || user.status === 'ARCHIVED') {
      throw new UserStatusTransitionError(user.status, 'ACTIVE');
    }

    return this.unitOfWork.runInTransaction(async () => {
      const now = new Date();
      const token = this.tokenService.generate();
      const expiresAt = new Date(now.getTime() + this.options.emailVerificationTokenTtlSeconds * 1000);

      await this.emailTokens.create({
        id: this.generateId(),
        userId: user.id,
        tokenHash: token.hashed,
        expiresAt,
        usedAt: null,
        createdAt: now
      });

      return {
        user,
        tokenFingerprint: token.fingerprint,
        rawToken: token.token
      };
    });
  }

  public async confirmVerification(
    command: ConfirmEmailVerificationCommand,
    _context: IdentityContext
  ): Promise<EmailVerificationResult> {
    const token = command.token ?? '';
    if (token.length === 0) {
      throw new IdentityValidationError('Verification token is required.', { field: 'token' });
    }

    const tokenHash = this.tokenService.hash(token);
    const storedToken = await this.emailTokens.findByTokenHash(tokenHash);

    if (storedToken === null) {
      throw new TokenLifecycleError('Invalid or expired verification token.', { reason: 'token_not_found' });
    }

    const now = new Date();
    if (storedToken.expiresAt < now) {
      throw new TokenLifecycleError('Verification token has expired.', { reason: 'token_expired' });
    }

    if (storedToken.usedAt !== null && storedToken.usedAt !== undefined) {
      throw new TokenLifecycleError('Verification token has already been used.', { reason: 'token_reused' });
    }

    const user = await this.users.findById(storedToken.userId);
    if (user === null) {
      throw new TokenLifecycleError('Invalid or expired verification token.', { reason: 'user_not_found' });
    }

    if (user.status === 'ACTIVE') {
      throw new IdentityValidationError('Email is already verified.', { reason: 'already_verified' });
    }

    assertStatusTransition(user.status, 'ACTIVE', this.options.allowedTransitions);

    return this.unitOfWork.runInTransaction(async () => {
      const usedAt = new Date();
      const updatedAt = usedAt;
      const updatedUser = await this.users.updateStatus({
        userId: user.id,
        status: 'ACTIVE',
        emailVerifiedAt: usedAt,
        updatedAt
      });

      await this.emailTokens.save({
        ...storedToken,
        usedAt
      });

      return {
        user: updatedUser,
        tokenFingerprint: this.tokenService.hash(token).slice(0, DEFAULT_FINGERPRINT_PREFIX_LENGTH)
      };
    });
  }

  // Internal helper used when a registration flow needs to verify an existing token.
  public async findTokenByHash(tokenHash: string): Promise<EmailVerificationTokenEntity | null> {
    return this.emailTokens.findByTokenHash(tokenHash);
  }
}
