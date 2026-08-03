import type { HealthComponentStatus, HealthStatus } from '@naijadeals/types';
import type { PlatformConfig } from '@naijadeals/config';

export interface HealthCheck {
  name: string;
  run(): Promise<HealthComponentStatus>;
}

export class StaticHealthCheck implements HealthCheck {
  public constructor(public readonly name: string) {}

  public async run(): Promise<HealthComponentStatus> {
    return {
      name: this.name,
      status: 'up'
    };
  }
}

export class HealthCheckService {
  public constructor(
    private readonly serviceName: string,
    private readonly config: PlatformConfig,
    private readonly checks: HealthCheck[]
  ) {}

  public async liveness(): Promise<HealthStatus> {
    return {
      status: 'ok',
      service: this.serviceName,
      environment: this.config.appEnv,
      version: '1.0.0',
      components: [],
      timestamp: new Date().toISOString()
    };
  }

  public async readiness(): Promise<HealthStatus> {
    const components = await Promise.all(this.checks.map((check) => check.run()));
    const status = components.some((component) => component.status === 'down')
      ? 'error'
      : components.some((component) => component.status === 'degraded')
        ? 'degraded'
        : 'ok';

    return {
      status,
      service: this.serviceName,
      environment: this.config.appEnv,
      version: '1.0.0',
      components,
      timestamp: new Date().toISOString()
    };
  }
}
