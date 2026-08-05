import { describe, it, expect } from 'vitest';
import {
  defaultCryptoConfig,
  loadCryptoConfig,
  validateCryptoConfig
} from '../src/config/crypto-config.js';
import type { CryptoConfig } from '../src/config/types.js';

describe('crypto-config', () => {
  it('defaultCryptoConfig uses Argon2id and sha256 defaults', () => {
    expect(defaultCryptoConfig.argon2.type).toBe(2);
    expect(defaultCryptoConfig.argon2.memoryCost).toBeGreaterThanOrEqual(8 * 1024);
    expect(defaultCryptoConfig.argon2.timeCost).toBeGreaterThanOrEqual(1);
    expect(defaultCryptoConfig.argon2.parallelism).toBeGreaterThanOrEqual(1);
    expect(defaultCryptoConfig.argon2.hashLength).toBeGreaterThanOrEqual(1);
    expect(defaultCryptoConfig.argon2.saltLength).toBeGreaterThanOrEqual(16);
    expect(defaultCryptoConfig.token.randomBytes).toBeGreaterThanOrEqual(16);
    expect(defaultCryptoConfig.token.encoding).toBe('base64url');
    expect(defaultCryptoConfig.hash.algorithm).toBe('sha256');
    expect(defaultCryptoConfig.hash.fingerprintPrefixLength).toBeGreaterThanOrEqual(4);
  });

  it('loadCryptoConfig uses defaults when no environment variables are set', () => {
    const config = loadCryptoConfig({});
    expect(config.argon2.type).toBe(defaultCryptoConfig.argon2.type);
    expect(config.argon2.memoryCost).toBe(defaultCryptoConfig.argon2.memoryCost);
    expect(config.argon2.timeCost).toBe(defaultCryptoConfig.argon2.timeCost);
    expect(config.argon2.parallelism).toBe(defaultCryptoConfig.argon2.parallelism);
    expect(config.token.randomBytes).toBe(defaultCryptoConfig.token.randomBytes);
  });

  it('loadCryptoConfig reads environment variables', () => {
    const env = {
      ARGON2_MEMORY_KIB: '32768',
      ARGON2_ITERATIONS: '2',
      ARGON2_PARALLELISM: '2',
      ARGON2_HASH_LENGTH: '48',
      ARGON2_SALT_LENGTH: '24',
      TOKEN_RANDOM_BYTES: '48',
      HASH_ALGORITHM: 'sha256',
      HASH_FINGERPRINT_PREFIX_LENGTH: '12'
    };
    const config = loadCryptoConfig(env);
    expect(config.argon2.memoryCost).toBe(32768);
    expect(config.argon2.timeCost).toBe(2);
    expect(config.argon2.parallelism).toBe(2);
    expect(config.argon2.hashLength).toBe(48);
    expect(config.argon2.saltLength).toBe(24);
    expect(config.token.randomBytes).toBe(48);
    expect(config.hash.algorithm).toBe('sha256');
    expect(config.hash.fingerprintPrefixLength).toBe(12);
  });

  it('loadCryptoConfig rejects invalid numeric values', () => {
    const env = { ARGON2_MEMORY_KIB: 'not-a-number' };
    expect(() => loadCryptoConfig(env)).toThrow(/ARGON2_MEMORY_KIB/);
  });

  it('loadCryptoConfig rejects values below minimums', () => {
    const env = { TOKEN_RANDOM_BYTES: '8' };
    expect(() => loadCryptoConfig(env)).toThrow(/TOKEN_RANDOM_BYTES/);
  });

  it('validateCryptoConfig accepts default config', () => {
    expect(() => validateCryptoConfig(defaultCryptoConfig)).not.toThrow();
  });

  it('validateCryptoConfig rejects low Argon2 memory cost', () => {
    const config: CryptoConfig = {
      ...defaultCryptoConfig,
      argon2: { ...defaultCryptoConfig.argon2, memoryCost: 1024 }
    };
    expect(() => validateCryptoConfig(config)).toThrow(/memoryCost/);
  });

  it('validateCryptoConfig rejects low Argon2 iterations', () => {
    const config: CryptoConfig = {
      ...defaultCryptoConfig,
      argon2: { ...defaultCryptoConfig.argon2, timeCost: 0 }
    };
    expect(() => validateCryptoConfig(config)).toThrow(/timeCost/);
  });

  it('validateCryptoConfig rejects low parallelism', () => {
    const config: CryptoConfig = {
      ...defaultCryptoConfig,
      argon2: { ...defaultCryptoConfig.argon2, parallelism: 0 }
    };
    expect(() => validateCryptoConfig(config)).toThrow(/parallelism/);
  });

  it('validateCryptoConfig rejects short salt length', () => {
    const config: CryptoConfig = {
      ...defaultCryptoConfig,
      argon2: { ...defaultCryptoConfig.argon2, saltLength: 8 }
    };
    expect(() => validateCryptoConfig(config)).toThrow(/saltLength/);
  });

  it('validateCryptoConfig rejects short token length', () => {
    const config: CryptoConfig = {
      ...defaultCryptoConfig,
      token: { ...defaultCryptoConfig.token, randomBytes: 8 }
    };
    expect(() => validateCryptoConfig(config)).toThrow(/randomBytes/);
  });

  it('validateCryptoConfig rejects short fingerprint prefix', () => {
    const config: CryptoConfig = {
      ...defaultCryptoConfig,
      hash: { ...defaultCryptoConfig.hash, fingerprintPrefixLength: 2 }
    };
    expect(() => validateCryptoConfig(config)).toThrow(/Fingerprint prefix length/);
  });

  it('validateCryptoConfig rejects unsupported hash algorithms', () => {
    const config: CryptoConfig = {
      ...defaultCryptoConfig,
      hash: { ...defaultCryptoConfig.hash, algorithm: 'md5' as 'sha256' }
    };
    expect(() => validateCryptoConfig(config)).toThrow(/Only sha256/);
  });
});
