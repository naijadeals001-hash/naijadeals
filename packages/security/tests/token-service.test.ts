import { describe, it, expect } from 'vitest';
import { SecureTokenService } from '../src/token/token-service.js';
import { defaultCryptoConfig, loadCryptoConfig } from '../src/config/crypto-config.js';
import { generateSha256 } from '../src/hash/hash-utils.js';

describe('SecureTokenService', () => {
  const service = new SecureTokenService(
    loadCryptoConfig({ ARGON2_MEMORY_KIB: '8192', ARGON2_ITERATIONS: '2', ARGON2_PARALLELISM: '1' })
  );

  it('generates a URL-safe token object with hashed and fingerprint fields', () => {
    const secure = service.generate();
    expect(secure.token).toBeTruthy();
    expect(secure.token).not.toContain('+');
    expect(secure.token).not.toContain('/');
    expect(secure.token).not.toContain('=');
    expect(secure.hashed).toHaveLength(64);
    expect(secure.hashed).toBe(generateSha256(secure.token));
    expect(secure.fingerprint).toHaveLength(defaultCryptoConfig.hash.fingerprintPrefixLength);
  });

  it('generates unique tokens on each call', () => {
    const a = service.generate();
    const b = service.generate();
    expect(a.token).not.toBe(b.token);
    expect(a.hashed).not.toBe(b.hashed);
  });

  it('generates a plain token of configurable length', () => {
    const token = service.generatePlain(48);
    // base64url length of 48 bytes is ceil(48 / 3) * 4 = 64 characters
    const decoded = Buffer.from(token, 'base64url');
    expect(decoded).toHaveLength(48);
  });

  it('uses default length when generatePlain is called without argument', () => {
    const token = service.generatePlain();
    const decoded = Buffer.from(token, 'base64url');
    expect(decoded).toHaveLength(defaultCryptoConfig.token.randomBytes);
  });

  it('rejects token lengths below 16 bytes', () => {
    expect(() => service.generatePlain(8)).toThrow(/integer >= 16/);
    expect(() => service.generate(8)).toThrow(/integer >= 16/);
  });

  it('hashes a token with SHA-256', () => {
    const token = 'test-token';
    expect(service.hash(token)).toBe(generateSha256(token));
  });

  it('verifies a token against its hash', () => {
    const secure = service.generate();
    expect(service.verify(secure.token, secure.hashed)).toBe(true);
  });

  it('rejects verification against a different token', () => {
    const a = service.generate();
    const b = service.generate();
    expect(service.verify(a.token, b.hashed)).toBe(false);
  });

  it('rejects verification with empty inputs', () => {
    const hash = service.hash('token');
    expect(service.verify('', hash)).toBe(false);
    expect(service.verify('token', '')).toBe(false);
  });

  it('rejects verification against a malformed hash', () => {
    expect(service.verify('token', 'not-hex')).toBe(false);
  });

  it('computes a consistent fingerprint for a token', () => {
    const token = 'fingerprint-token';
    const first = service.fingerprint(token);
    const second = service.fingerprint(token);
    expect(first).toBe(second);
    expect(first).toHaveLength(defaultCryptoConfig.hash.fingerprintPrefixLength);
  });

  it('produces different fingerprints for different tokens', () => {
    const a = service.fingerprint('token-a');
    const b = service.fingerprint('token-b');
    expect(a).not.toBe(b);
  });

  it('validates configuration at construction time', () => {
    expect(() => new SecureTokenService(defaultCryptoConfig)).not.toThrow();
  });

  it('rejects weak configuration at construction time', () => {
    expect(() => new SecureTokenService(loadCryptoConfig({ TOKEN_RANDOM_BYTES: '8' }))).toThrow(
      /TOKEN_RANDOM_BYTES/
    );
  });

  it('returns immutable token objects', () => {
    const secure = service.generate();
    expect(() => {
      // Type assertion to bypass compile-time immutability and test runtime behavior
      (secure as { token: string }).token = 'mutated';
    }).toThrow();
  });
});
