import { describe, it, expect } from 'vitest';
import {
  Argon2idPasswordService,
  verifyPasswordWithConstantTime
} from '../src/password/password-service.js';
import { defaultCryptoConfig, loadCryptoConfig } from '../src/config/crypto-config.js';

describe('Argon2idPasswordService', () => {
  const service = new Argon2idPasswordService(
    loadCryptoConfig({
      ARGON2_MEMORY_KIB: '8192',
      ARGON2_ITERATIONS: '2',
      ARGON2_PARALLELISM: '1'
    })
  );

  it('hashes a password and returns an Argon2id-encoded string', async () => {
    const hash = await service.hash('a-strong-password');
    expect(hash.startsWith('$argon2id$')).toBe(true);
    expect(hash.length).toBeGreaterThan(20);
  });

  it('verifies the correct password', async () => {
    const password = 'correct-horse-battery-staple';
    const hash = await service.hash(password);
    expect(await service.verify(password, hash)).toBe(true);
  });

  it('rejects an incorrect password for a valid hash', async () => {
    const hash = await service.hash('correct-password');
    expect(await service.verify('wrong-password', hash)).toBe(false);
  });

  it('rejects verification against an empty hash', async () => {
    expect(await service.verify('password', '')).toBe(false);
  });

  it('rejects verification with an empty password', async () => {
    const hash = await service.hash('real-password');
    expect(await service.verify('', hash)).toBe(false);
  });

  it('rejects verification against a malformed hash', async () => {
    expect(await service.verify('password', 'not-a-valid-hash')).toBe(false);
  });

  it('produces different hashes for the same password (random salt)', async () => {
    const password = 'same-password';
    const a = await service.hash(password);
    const b = await service.hash(password);
    expect(a).not.toBe(b);
  });

  it('throws when hashing an empty password', async () => {
    await expect(service.hash('')).rejects.toThrow(/Password cannot be empty/);
  });

  it('throws when hashing a password exceeding max length', async () => {
    const longPassword = 'a'.repeat(1025);
    await expect(service.hash(longPassword)).rejects.toThrow(/exceeds maximum/);
  });

  it('needsRehash returns true for an empty hash', () => {
    expect(service.needsRehash('')).toBe(true);
  });

  it('needsRehash returns false for a freshly generated hash with matching params', async () => {
    const hash = await service.hash('password');
    expect(service.needsRehash(hash)).toBe(false);
  });

  it('needsRehash returns true when memory cost differs', async () => {
    const strongerService = new Argon2idPasswordService(
      loadCryptoConfig({
        ARGON2_MEMORY_KIB: '16384',
        ARGON2_ITERATIONS: '2',
        ARGON2_PARALLELISM: '1'
      })
    );
    const hash = await service.hash('password');
    expect(strongerService.needsRehash(hash)).toBe(true);
  });

  it('needsRehash returns true for malformed hashes', () => {
    expect(service.needsRehash('not-a-hash')).toBe(true);
  });

  it('verifyPasswordWithConstantTime wrapper returns true for valid password', async () => {
    const password = 'wrapper-password';
    const hash = await service.hash(password);
    expect(await verifyPasswordWithConstantTime(password, hash, service)).toBe(true);
  });

  it('verifyPasswordWithConstantTime wrapper returns false for invalid password', async () => {
    const hash = await service.hash('wrapper-password');
    expect(await verifyPasswordWithConstantTime('other', hash, service)).toBe(false);
  });

  it('validates configuration at construction time', () => {
    expect(() => new Argon2idPasswordService(defaultCryptoConfig)).not.toThrow();
  });

  it('rejects weak configuration at construction time', () => {
    expect(
      () =>
        new Argon2idPasswordService(
          loadCryptoConfig({
            ARGON2_MEMORY_KIB: '1024',
            ARGON2_ITERATIONS: '2',
            ARGON2_PARALLELISM: '1'
          })
        )
    ).toThrow(/ARGON2_MEMORY_KIB/);
  });
});
