import { randomUUID } from 'node:crypto';
import { IdentityValidationError } from '@naijadeals/errors';
import {
  createIdentityPasswordResetRequestedEvent,
  type EventBus
} from '@naijadeals/events';
import type { PasswordResetTokenRepository, UserRepository } from '@naijadeals/repository';
import type { PasswordResetTokenEntity, RequestContext } from '@naijadeals/types';
import { resolveIdentityTelemetry, type IdentityDomainTelemetry } from '../support.js';
import { validateFutureDate, validateNonEmptyString } from './domain-rules.js';

export interface RequestPasswordResetCommand {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  requestContext: RequestContext;
  tokenId?: string;
  now?: Date;
}

export interface RequestPasswordResetDependencies {
  users: UserRepository;
  tokens: PasswordResetTokenRepository;
  eventBus: EventBus;
  telemetry?: IdentityDomainTelemetry;
}

export class RequestPasswordResetService {
  public constructor(private readonly dependencies: RequestPasswordResetDependencies) {}

  public async execute(command: RequestPasswordResetCommand): Promise<PasswordResetTokenEntity> {
    const telemetry = resolveIdentityTelemetry(this.dependencies.telemetry);
    const now = command.now ?? new Date();
    const tokenHash = validateNonEmptyString(command.tokenHash, 'Password reset token hash');
    validateFutureDate(command.expiresAt, now, 'Password reset token expiry');

    const user = await this.dependencies.users.findById(command.userId);
    if (!user) {
      throw new IdentityValidationError('User does not exist for password reset request.', {
        userId: command.userId
      });
    }

    const token: PasswordResetTokenEntity = {
      id: command.tokenId ?? randomUUID(),
      userId: user.id,
      tokenHash,
      expiresAt: command.expiresAt,
      usedAt: null,
      createdAt: now
    };

    const createdToken = await this.dependencies.tokens.create(token);

    await this.dependencies.eventBus.publish(
      createIdentityPasswordResetRequestedEvent({
        userId: user.id,
        tokenId: createdToken.id,
        expiresAt: createdToken.expiresAt,
        context: command.requestContext
      })
    );

    await telemetry.auditSink.record({
      category: 'AUTH',
      action: 'identity.user.request_password_reset',
      actorId: command.requestContext.actorId,
      targetType: 'reset_token',
      targetId: createdToken.id,
      status: 'succeeded',
      metadata: { userId: user.id, expiresAt: createdToken.expiresAt.toISOString() },
      requestContext: command.requestContext,
      occurredAt: now
    });

    telemetry.logger.info(
      {
        userId: user.id,
        tokenId: createdToken.id,
        requestId: command.requestContext.requestId,
        correlationId: command.requestContext.correlationId
      },
      'Password reset token issued'
    );

    return createdToken;
  }
}
