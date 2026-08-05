import { SessionLifecycleError } from '@naijadeals/errors';
import {
  createIdentitySessionRevokedEvent,
  type EventBus
} from '@naijadeals/events';
import type { AuthSessionRepository } from '@naijadeals/repository';
import type { AuthSessionEntity, RequestContext } from '@naijadeals/types';
import { resolveIdentityTelemetry, type IdentityDomainTelemetry } from '../support.js';

export interface RevokeUserSessionCommand {
  sessionId: string;
  requestContext: RequestContext;
  now?: Date;
}

export interface RevokeUserSessionDependencies {
  sessions: AuthSessionRepository;
  eventBus: EventBus;
  telemetry?: IdentityDomainTelemetry;
}

export class RevokeUserSessionService {
  public constructor(private readonly dependencies: RevokeUserSessionDependencies) {}

  public async execute(command: RevokeUserSessionCommand): Promise<AuthSessionEntity> {
    const telemetry = resolveIdentityTelemetry(this.dependencies.telemetry);
    const session = await this.dependencies.sessions.findById(command.sessionId);
    if (!session) {
      throw new SessionLifecycleError('Session does not exist.', { sessionId: command.sessionId });
    }

    if (session.revokedAt) {
      throw new SessionLifecycleError('Session has already been revoked.', { sessionId: session.id });
    }

    const now = command.now ?? new Date();
    const revokedSession: AuthSessionEntity = {
      ...session,
      revokedAt: now
    };

    const savedSession = await this.dependencies.sessions.save(revokedSession);

    await this.dependencies.eventBus.publish(
      createIdentitySessionRevokedEvent({
        sessionId: savedSession.id,
        userId: savedSession.userId,
        revokedAt: now,
        context: command.requestContext
      })
    );

    await telemetry.auditSink.record({
      category: 'SESSION',
      action: 'identity.session.revoke',
      actorId: command.requestContext.actorId,
      targetType: 'session',
      targetId: savedSession.id,
      status: 'succeeded',
      metadata: { userId: savedSession.userId },
      requestContext: command.requestContext,
      occurredAt: now
    });

    telemetry.logger.info(
      {
        sessionId: savedSession.id,
        userId: savedSession.userId,
        requestId: command.requestContext.requestId,
        correlationId: command.requestContext.correlationId
      },
      'Auth session revoked'
    );

    return savedSession;
  }
}
