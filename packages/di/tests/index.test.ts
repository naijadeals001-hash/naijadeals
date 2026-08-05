import { describe, expect, it } from 'vitest';
import { Container, createToken } from '../src/index.js';

describe('Container', () => {
  it('resolves registered values', () => {
    const token = createToken<string>('service');
    const container = new Container();
    container.registerValue(token, 'ready');
    expect(container.resolve(token)).toBe('ready');
  });
});
