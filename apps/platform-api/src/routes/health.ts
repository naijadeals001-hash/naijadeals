import type { FastifyInstance } from 'fastify';
import type { HealthCheckService } from '../lib/health.js';

export const registerHealthRoutes = async (
  fastify: FastifyInstance,
  healthCheckService: HealthCheckService
): Promise<void> => {
  fastify.get('/health/live', async () => ({
    success: true,
    data: await healthCheckService.liveness(),
    meta: {},
    request_id: 'system'
  }));

  fastify.get('/health/ready', async () => ({
    success: true,
    data: await healthCheckService.readiness(),
    meta: {},
    request_id: 'system'
  }));
};
