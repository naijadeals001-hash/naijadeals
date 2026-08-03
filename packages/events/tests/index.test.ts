import { describe, expect, it } from 'vitest';
import { NoopEventBus } from '../src/index.js';

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
});
