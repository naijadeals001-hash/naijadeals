import fp from 'fastify-plugin';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';

declare module 'fastify' {
  interface FastifyRequest {
    requestContext: {
      requestId: string;
      correlationId: string;
    };
  }
}

const resolveHeader = (request: FastifyRequest, headerName: string): string | undefined => {
  const value = request.headers[headerName];
  return Array.isArray(value) ? value[0] : value;
};

export const requestContextPlugin = fp(async (fastify) => {
  fastify.decorateRequest('requestContext', null);

  fastify.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
    const requestId = resolveHeader(request, 'x-request-id') ?? uuidv4();
    const correlationId = resolveHeader(request, 'x-correlation-id') ?? requestId;

    request.requestContext = {
      requestId,
      correlationId
    };

    reply.header('x-request-id', requestId);
    reply.header('x-correlation-id', correlationId);
  });
});
