import { randomUUID } from 'node:crypto';
import { IdentityValidationError, TokenLifecycleError } from '@naijadeals/errors';
import {
  createIdentityEmailVerificationRequestedEvent,
  type EventBus
} from '@naijadeals/events';
import type { EmailVerificationTokenRepository, UserRepository } from '@naijadeals/repository';
import type { EmailVerificationTokenEntity, RequestContext } from '@naijadeals/types';
import { resolveIdentityTelemetry, type IdentityDomainTelemetry } from '../support.js';
import { validateFutureDate, validateNonEmptyString } from './domain-rules.js';

export interface RequestEmailVerificationCommand {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  requestContext: RequestContext;
  tokenId?: string;
  now?: Date;
}

export interface RequestEmailVerificationDependencies {
  users: UserRepository;
  tokens: EmailVerificationTokenRepository;
  eventBus: EventBus;
  telemetry?: IdentityDomainTelemetry;
}

export class RequestEmailVerificationService {
  public constructor(private readonly dependencies: RequestEmailVerificationDependencies) {}

  public async execute(command: RequestEmailVerificationCommand): Promise<EmailVerificationTokenEntity> {
    const telemetry = resolveIdentityTelemetry(this.dependencies.telemetry);
    const now = command.now ?? new Date();
    const tokenHash = validateNonEmptyString(command.tokenHash, 'Email verification token hash');
    validateFutureDate(command.expiresAt, now, 'Email verification token expiry');

    const user = await this.dependencies.users.findById(command.userId);
    if (!user) {
      throw new IdentityValidationError('User does not exist for email verification request.', {
        userId: command.userId
      });
    }

    if (user.emailVerifiedAt || user.status === 'ACTIVE') {
      throw new TokenLifecycleError('Email verification request is not valid for an already verified user.', {
        userId: user.id,
        status: user.status
      });
    }

    const token: EmailVerificationTokenEntity = {
      id: command.tokenId ?? randomUUID(),
      userId: user.id,
      tokenHash,
      expiresAt: command.expiresAt,
      usedAt: null,
      createdAt: now
    };

    const createdToken = await this.dependencies.tokens.create(token);

    await this.dependencies.eventBus.publish(
      createIdentityEmailVerificationRequestedEvent({
        userId: user.id,
        tokenId: createdToken.id,
        expiresAt: createdToken.expiresAt,
        context: command.requestContext
      })
    );

    await telemetry.auditSink.record({
      category: 'AUTH',
      action: 'identity.user.request_email_verification',
      actorId: command.requestContext.actorId,
      targetType: 'verification_token',
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
      'Email verification token issued'
    );

    return createdToken;
  }
}
