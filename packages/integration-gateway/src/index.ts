import { AppError } from '@naijadeals/errors';
import type { RequestContext } from '@naijadeals/types';

export type ProviderKind =
  | 'google'
  | 'payment'
  | 'email'
  | 'sms'
  | 'storage'
  | 'analytics'
  | 'ai'
  | 'search';

export interface GatewayRequest<TInput = unknown> {
  provider: string;
  action: string;
  payload: TInput;
  context: RequestContext;
}

export interface GatewayResponse<TOutput = unknown> {
  provider: string;
  action: string;
  data: TOutput;
}

export interface ProviderAdapter<TInput = unknown, TOutput = unknown> {
  readonly providerKind: ProviderKind;
  readonly providerName: string;
  execute(request: GatewayRequest<TInput>): Promise<GatewayResponse<TOutput>>;
  healthCheck(): Promise<{ status: 'up' | 'down' | 'degraded'; details?: Record<string, unknown> }>;
}

export class ProviderRegistry {
  private readonly adapters = new Map<string, ProviderAdapter>();

  public register(adapter: ProviderAdapter): void {
    this.adapters.set(adapter.providerName, adapter);
  }

  public get(providerName: string): ProviderAdapter {
    const adapter = this.adapters.get(providerName);
    if (!adapter) {
      throw new AppError({
        code: 'PROVIDER_NOT_REGISTERED',
        message: `Provider adapter '${providerName}' is not registered`,
        statusCode: 500
      });
    }
    return adapter;
  }
}
