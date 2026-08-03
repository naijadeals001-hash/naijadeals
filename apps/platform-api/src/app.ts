import Fastify from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import { loadConfig } from '@naijadeals/config';
import { createLogger } from '@naijadeals/logger';
import { ProviderRegistry } from '@naijadeals/integration-gateway';
import { NoopEventBus } from '@naijadeals/events';
import { Container, createToken } from '@naijadeals/di';
import { HealthCheckService, StaticHealthCheck } from './lib/health.js';
import { requestContextPlugin } from './plugins/request-context.js';
import { errorHandlerPlugin } from './plugins/error-handler.js';
import { registerHealthRoutes } from './routes/health.js';

export const TOKENS = {
  config: createToken<ReturnType<typeof loadConfig>>('config'),
  providerRegistry: createToken<ProviderRegistry>('providerRegistry'),
  eventBus: createToken<NoopEventBus>('eventBus')
};

export const buildApp = () => {
  const config = loadConfig();
  const logger = createLogger({ serviceName: 'platform-api', level: config.logLevel });
  const app = Fastify({ loggerInstance: logger });
  const container = new Container();
  const providerRegistry = new ProviderRegistry();
  const eventBus = new NoopEventBus();

  container.registerValue(TOKENS.config, config);
  container.registerValue(TOKENS.providerRegistry, providerRegistry);
  container.registerValue(TOKENS.eventBus, eventBus);

  const healthCheckService = new HealthCheckService('platform-api', config, [
    new StaticHealthCheck('config'),
    new StaticHealthCheck('event-bus'),
    new StaticHealthCheck('integration-gateway')
  ]);

  app.register(helmet);
  app.register(cors, { origin: true, credentials: true });
  app.register(cookie, { hook: 'onRequest' });
  app.register(requestContextPlugin);
  app.register(errorHandlerPlugin);
  app.get('/', async (request) => ({
    success: true,
    data: {
      name: config.appName,
      service: 'platform-api',
      phase: 'milestone-1.0-platform-foundation'
    },
    meta: {},
    request_id: request.requestContext.requestId
  }));
  app.register(async (instance) => registerHealthRoutes(instance, healthCheckService));

  return app;
};
