import { describe, expect, it } from 'vitest';
import {
  NoopEventBus,
  createIdentityEmailVerificationRequestedEvent,
  createIdentityUserCreatedEvent,
  identityEventNames
} from '../src/index.js';

describe('NoopEventBus', () => {
  it('publishes without side effects', async () => {
    const eventBus = new NoopEventBus();
    await expect(
      eventBus.publish({
        eventId: '1',
        eventName: 'system.foundation.ready.v1',
        aggregateType: 'system',
        aggregateId: 'foundation',
        schemaVersion: 1,
        occurredAt: new Date().toISOString(),
        payload: {},
        context: { requestId: 'r1', correlationId: 'c1' }
      })
    ).resolves.toBeUndefined();
  });

  it('creates approved identity domain events', () => {
    const event = createIdentityUserCreatedEvent({
      userId: 'user_1',
      email: 'user@example.com',
      displayName: 'User',
      status: 'EMAIL_UNVERIFIED',
      context: { requestId: 'r1', correlationId: 'c1' }
    });

    expect(event.eventName).toBe(identityEventNames.userCreated);
    expect(event.aggregateType).toBe('identity');
  });

  it('creates verification lifecycle events', () => {
    const event = createIdentityEmailVerificationRequestedEvent({
      userId: 'user_1',
      tokenId: 'token_1',
      expiresAt: new Date('2026-08-04T00:00:00.000Z'),
      context: { requestId: 'r2', correlationId: 'c2' }
    });

    expect(event.eventName).toBe(identityEventNames.emailVerificationRequested);
    expect(event.payload.userId).toBe('user_1');
  });
});
