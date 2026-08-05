import { describe, expect, it } from 'vitest';
import { ProviderRegistry } from '../src/index.js';

describe('ProviderRegistry', () => {
  it('throws for unknown providers', () => {
    const registry = new ProviderRegistry();
    expect(() => registry.get('google-oauth')).toThrowError(/not registered/i);
  });
});
