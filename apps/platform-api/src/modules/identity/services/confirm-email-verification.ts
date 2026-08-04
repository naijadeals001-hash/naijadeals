import { TokenLifecycleError, UserStatusTransitionError } from '@naijadeals/errors';
import {
  createIdentityEmailVerifiedEvent,
  createIdentityUserStatusChangedEvent,
  type EventBus
} from '@naijadeals/events';
import type {
  EmailVerificationTokenRepository,
  UnitOfWork,
  UserRepository
} from '@naijadeals/repository';
import type { RequestContext, UserEntity, UserStatus } from '@naijadeals/types';
import { resolveIdentityTelemetry, type IdentityDomainTelemetry } from '../support.js';
import { validateUserStatusTransition } from './domain-rules.js';

export interface ConfirmEmailVerificationCommand {
  tokenHash: string;
  requestContext: RequestContext;
  now?: Date;
}

export interface ConfirmEmailVerificationDependencies {
  tokens: EmailVerificationTokenRepository;
  users: UserRepository;
  unitOfWork: UnitOfWork;
  eventBus: EventBus;
  telemetry?: IdentityDomainTelemetry;
}

const canTransitionToActive = (status: UserStatus): boolean =>
  ['PENDING', 'EMAIL_UNVERIFIED', 'LOCKED', 'SUSPENDED', 'ACTIVE'].includes(status);

export class ConfirmEmailVerificationService {
  public constructor(private readonly dependencies: ConfirmEmailVerificationDependencies) {}

  public async execute(command: ConfirmEmailVerificationCommand): Promise<UserEntity> {
    const telemetry = resolveIdentityTelemetry(this.dependencies.telemetry);
    const now = command.now ?? new Date();
    const token = await this.dependencies.tokens.findByTokenHash(command.tokenHash);

    if (!token) {
      throw new TokenLifecycleError('Email verification token does not exist.');
    }

    if (token.usedAt) {
      throw new TokenLifecycleError('Email verification token has already been used.');
    }

    if (token.expiresAt.getTime() <= now.getTime()) {
      throw new TokenLifecycleError('Email verification token has expired.', {
        expiresAt: token.expiresAt.toISOString()
      });
    }

    const user = await this.dependencies.users.findById(token.userId);
    if (!user) {
      throw new TokenLifecycleError('Email verification token references an unknown user.');
    }

    if (!canTransitionToActive(user.status)) {
      throw new UserStatusTransitionError(user.status, 'ACTIVE');
    }

    const fromStatus = user.status;
    validateUserStatusTransition(fromStatus, 'ACTIVE');

    const updatedUser = await this.dependencies.unitOfWork.runInTransaction(async () => {
      token.usedAt = now;
      await this.dependencies.tokens.save(token);

      if (user.status === 'ACTIVE' && user.emailVerifiedAt) {
        return user;
      }

      return this.dependencies.users.updateStatus({
        userId: user.id,
        status: 'ACTIVE',
        emailVerifiedAt: now,
        updatedAt: now
      });
    });

    await this.dependencies.eventBus.publish(
      createIdentityEmailVerifiedEvent({
        userId: updatedUser.id,
        verifiedAt: now,
        context: command.requestContext
      })
    );

    if (fromStatus !== updatedUser.status) {
      await this.dependencies.eventBus.publish(
        createIdentityUserStatusChangedEvent({
          userId: updatedUser.id,
          fromStatus,
          toStatus: updatedUser.status,
          context: command.requestContext
        })
      );
    }

    await telemetry.auditSink.record({
      category: 'AUTH',
      action: 'identity.user.confirm_email_verification',
      actorId: command.requestContext.actorId,
      targetType: 'user',
      targetId: updatedUser.id,
      status: 'succeeded',
      metadata: { fromStatus, toStatus: updatedUser.status },
      requestContext: command.requestContext,
      occurredAt: now
    });

    telemetry.logger.info(
      {
        userId: updatedUser.id,
        fromStatus,
        toStatus: updatedUser.status,
        requestId: command.requestContext.requestId,
        correlationId: command.requestContext.correlationId
      },
      'Email verification confirmed'
    );

    return updatedUser;
  }
}
