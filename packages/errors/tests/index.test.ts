import { describe, expect, it } from 'vitest';
import { AppError, toErrorResult } from '../src/index.js';

describe('AppError', () => {
  it('serializes to the standard error format', () => {
    const error = new AppError({ code: 'TEST_ERROR', message: 'boom', statusCode: 400 });
    expect(toErrorResult(error, 'req_1').error.code).toBe('TEST_ERROR');
  });
});
