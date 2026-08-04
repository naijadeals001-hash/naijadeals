import { TokenLifecycleError } from '@naijadeals/errors';
import {
  createIdentityPasswordResetCompletedEvent,
  type EventBus
} from '@naijadeals/events';
import type {
  PasswordCredentialRepository,
  PasswordResetTokenRepository,
  UnitOfWork,
  UserRepository
} from '@naijadeals/repository';
import type { PasswordCredentialEntity, RequestContext } from '@naijadeals/types';
import { resolveIdentityTelemetry, type IdentityDomainTelemetry } from '../support.js';
import { validateNonEmptyString, validatePasswordPolicy } from './domain-rules.js';

export interface ResetPasswordCommand {
  tokenHash: string;
  plainPassword: string;
  newPasswordHash: string;
  requestContext: RequestContext;
  now?: Date;
}

export interface ResetPasswordDependencies {
  users: UserRepository;
  credentials: PasswordCredentialRepository;
  tokens: PasswordResetTokenRepository;
  unitOfWork: UnitOfWork;
  eventBus: EventBus;
  telemetry?: IdentityDomainTelemetry;
}

export class ResetPasswordService {
  public constructor(private readonly dependencies: ResetPasswordDependencies) {}

  public async execute(command: ResetPasswordCommand): Promise<PasswordCredentialEntity> {
    const telemetry = resolveIdentityTelemetry(this.dependencies.telemetry);
    const now = command.now ?? new Date();
    const newPasswordHash = validateNonEmptyString(command.newPasswordHash, 'New password hash');
    const token = await this.dependencies.tokens.findByTokenHash(command.tokenHash);

    if (!token) {
      throw new TokenLifecycleError('Password reset token does not exist.');
    }

    if (token.usedAt) {
      throw new TokenLifecycleError('Password reset token has already been used.');
    }

    if (token.expiresAt.getTime() <= now.getTime()) {
      throw new TokenLifecycleError('Password reset token has expired.', {
        expiresAt: token.expiresAt.toISOString()
      });
    }

    const user = await this.dependencies.users.findById(token.userId);
    if (!user) {
      throw new TokenLifecycleError('Password reset token references an unknown user.');
    }

    validatePasswordPolicy(command.plainPassword, user.email);

    const existingCredential = await this.dependencies.credentials.findByUserId(user.id);
    if (!existingCredential) {
      throw new TokenLifecycleError('Password credential does not exist for password reset.');
    }

    const updatedCredential = await this.dependencies.unitOfWork.runInTransaction(async () => {
      token.usedAt = now;
      await this.dependencies.tokens.save(token);

      const nextCredential: PasswordCredentialEntity = {
        ...existingCredential,
        passwordHash: newPasswordHash,
        passwordVersion: existingCredential.passwordVersion + 1,
        updatedAt: now
      };

      return this.dependencies.credentials.save(nextCredential);
    });

    await this.dependencies.eventBus.publish(
      createIdentityPasswordResetCompletedEvent({
        userId: user.id,
        passwordVersion: updatedCredential.passwordVersion,
        context: command.requestContext
      })
    );

    await telemetry.auditSink.record({
      category: 'AUTH',
      action: 'identity.user.reset_password',
      actorId: command.requestContext.actorId,
      targetType: 'user',
      targetId: user.id,
      status: 'succeeded',
      metadata: { passwordVersion: updatedCredential.passwordVersion },
      requestContext: command.requestContext,
      occurredAt: now
    });

    telemetry.logger.info(
      {
        userId: user.id,
        passwordVersion: updatedCredential.passwordVersion,
        requestId: command.requestContext.requestId,
        correlationId: command.requestContext.correlationId
      },
      'Password reset completed'
    );

    return updatedCredential;
  }
}
