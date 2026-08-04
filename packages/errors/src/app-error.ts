import type { ErrorResult } from '@naijadeals/types';

export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: Record<string, unknown>;

  public constructor(options: {
    code: string;
    message: string;
    statusCode?: number;
    details?: Record<string, unknown>;
  }) {
    super(options.message);
    this.name = 'AppError';
    this.code = options.code;
    this.statusCode = options.statusCode ?? 500;
    this.details = options.details;
  }
}

export const isAppError = (value: unknown): value is AppError => value instanceof AppError;

export const toErrorResult = (error: AppError, requestId: string): ErrorResult => ({
  success: false,
  error: {
    code: error.code,
    message: error.message,
    details: error.details
  },
  requestId
});
