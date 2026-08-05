import { buildApp } from './app.js';
import { loadConfig } from '@naijadeals/config';

const config = loadConfig();
const app = buildApp();

const start = async (): Promise<void> => {
  await app.listen({ host: '0.0.0.0', port: config.apiPort });
};

start().catch((error: unknown) => {
  app.log.error(error, 'failed to start platform api');
  process.exit(1);
});
