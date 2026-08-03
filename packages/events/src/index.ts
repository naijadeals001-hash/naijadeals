import type { RequestContext } from '@naijadeals/types';

export interface DomainEvent<TPayload extends Record<string, unknown> = Record<string, unknown>> {
  eventId: string;
  eventName: string;
  aggregateType: string;
  aggregateId: string;
  schemaVersion: number;
  occurredAt: string;
  payload: TPayload;
  context: RequestContext;
}

export interface PublishOptions {
  delayMs?: number;
}

export interface EventBus {
  publish<TPayload extends Record<string, unknown>>(
    event: DomainEvent<TPayload>,
    options?: PublishOptions
  ): Promise<void>;
}

export class NoopEventBus implements EventBus {
  public async publish(): Promise<void> {
    return Promise.resolve();
  }
}
