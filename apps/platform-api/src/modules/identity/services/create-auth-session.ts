import { randomUUID } from 'node:crypto';
import { IdentityValidationError } from '@naijadeals/errors';
import type { AuthSessionRepository, UserRepository } from '@naijadeals/repository';
import type { AuthSessionEntity, RequestContext } from '@naijadeals/types';
import { resolveIdentityTelemetry, type IdentityDomainTelemetry } from '../support.js';
import {
  validateFutureDate,
  validateNonEmptyString,
  validateSessionCreationStatus
} from './domain-rules.js';

export interface CreateAuthSessionCommand {
  userId: string;
  refreshTokenHash: string;
  expiresAt: Date;
  requestContext: RequestContext;
  sessionId?: string;
  deviceId?: string | null;
  deviceNameSnapshot?: string | null;
  userAgent?: string | null;
  ipAddress?: string | null;
  now?: Date;
}

export interface CreateAuthSessionDependencies {
  users: UserRepository;
  sessions: AuthSessionRepository;
  telemetry?: IdentityDomainTelemetry;
}

export class CreateAuthSessionService {
  public constructor(private readonly dependencies: CreateAuthSessionDependencies) {}

  public async execute(command: CreateAuthSessionCommand): Promise<AuthSessionEntity> {
    const telemetry = resolveIdentityTelemetry(this.dependencies.telemetry);
    const now = command.now ?? new Date();
    const refreshTokenHash = validateNonEmptyString(command.refreshTokenHash, 'Refresh token hash');
    validateFutureDate(command.expiresAt, now, 'Session expiry');

    const user = await this.dependencies.users.findById(command.userId);
    if (!user) {
      throw new IdentityValidationError('User does not exist for auth session creation.', {
        userId: command.userId
      });
    }

    validateSessionCreationStatus(user.status);

    const existingSession = await this.dependencies.sessions.findByRefreshTokenHash(refreshTokenHash);
    if (existingSession) {
      throw new IdentityValidationError('Refresh token hash is already associated with a session.', {
        sessionId: existingSession.id
      });
    }

    const session: AuthSessionEntity = {
      id: command.sessionId ?? randomUUID(),
      userId: user.id,
      refreshTokenHash,
      deviceId: command.deviceId ?? null,
      deviceNameSnapshot: command.deviceNameSnapshot?.trim() || null,
      userAgent: command.userAgent?.trim() || null,
      ipAddress: command.ipAddress?.trim() || null,
      lastUsedAt: now,
      expiresAt: command.expiresAt,
      revokedAt: null,
      createdAt: now
    };

    const createdSession = await this.dependencies.sessions.create(session);

    await telemetry.auditSink.record({
      category: 'SESSION',
      action: 'identity.session.create',
      actorId: command.requestContext.actorId,
      targetType: 'session',
      targetId: createdSession.id,
      status: 'succeeded',
      metadata: { userId: createdSession.userId, deviceId: createdSession.deviceId },
      requestContext: command.requestContext,
      occurredAt: now
    });

    telemetry.logger.info(
      {
        sessionId: createdSession.id,
        userId: createdSession.userId,
        deviceId: createdSession.deviceId,
        requestId: command.requestContext.requestId,
        correlationId: command.requestContext.correlationId
      },
      'Auth session created'
    );

    return createdSession;
  }
}
