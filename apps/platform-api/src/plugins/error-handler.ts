import fp from 'fastify-plugin';
import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { AppError, isAppError, toErrorResult } from '@naijadeals/errors';

export const errorHandlerPlugin = fp(async (fastify) => {
  fastify.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    const appError = isAppError(error)
      ? error
      : new AppError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected platform error occurred',
          statusCode: 500
        });

    request.log.error({ err: error, code: appError.code }, 'request failed');

    return reply.status(appError.statusCode).send(toErrorResult(appError, request.requestContext.requestId));
  });
});
