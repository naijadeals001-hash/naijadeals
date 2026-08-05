import pino, { type Logger, type LoggerOptions } from 'pino';

export interface CreateLoggerOptions {
  serviceName: string;
  level?: string;
  base?: Record<string, unknown>;
}

export const createLogger = (options: CreateLoggerOptions): Logger => {
  const config: LoggerOptions = {
    level: options.level ?? 'info',
    base: {
      service: options.serviceName,
      ...options.base
    },
    timestamp: pino.stdTimeFunctions.isoTime
  };

  return pino(config);
};
