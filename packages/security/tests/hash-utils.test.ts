import { describe, it, expect } from 'vitest';
import {
  generateSha256,
  generateTokenFingerprint,
  timingSafeEqualString,
  timingSafeEqualBuffer,
  encodeBase64Url,
  decodeBase64Url,
  generateRandomBytes,
  hashWithConfig,
  fingerprintWithConfig
} from '../src/hash/hash-utils.js';
import { defaultCryptoConfig } from '../src/config/crypto-config.js';
import type { HashConfig } from '../src/config/types.js';

describe('hash-utils', () => {
  describe('generateSha256', () => {
    it('returns a 64-character hex digest for a string input', () => {
      const hash = generateSha256('hello');
      expect(hash).toHaveLength(64);
      expect(hash).toMatch(/^[a-f0-9]+$/);
    });

    it('produces deterministic output for the same input', () => {
      expect(generateSha256('deterministic')).toBe(generateSha256('deterministic'));
    });

    it('produces different output for different inputs', () => {
      expect(generateSha256('a')).not.toBe(generateSha256('b'));
    });
  });

  describe('generateTokenFingerprint', () => {
    it('returns a prefix of the requested length', () => {
      const fingerprint = generateTokenFingerprint('secret-token', 8);
      expect(fingerprint).toHaveLength(8);
      expect(fingerprint).toMatch(/^[a-f0-9]+$/);
    });

    it('rejects prefix length below 4', () => {
      expect(() => generateTokenFingerprint('token', 3)).toThrow(/prefix length/);
    });

    it('produces the same prefix for the same token', () => {
      const token = 'repeatable-token';
      expect(generateTokenFingerprint(token, 8)).toBe(generateTokenFingerprint(token, 8));
    });
  });

  describe('timingSafeEqualString', () => {
    it('returns true for equal strings', () => {
      expect(timingSafeEqualString('same', 'same')).toBe(true);
    });

    it('returns false for different strings of the same length', () => {
      expect(timingSafeEqualString('same', 'diff')).toBe(false);
    });

    it('returns false for strings of different lengths', () => {
      expect(timingSafeEqualString('short', 'longer')).toBe(false);
    });
  });

  describe('timingSafeEqualBuffer', () => {
    it('returns true for equal buffers', () => {
      const a = Buffer.from('same');
      const b = Buffer.from('same');
      expect(timingSafeEqualBuffer(a, b)).toBe(true);
    });

    it('returns false for different buffers', () => {
      const a = Buffer.from('same');
      const b = Buffer.from('diff');
      expect(timingSafeEqualBuffer(a, b)).toBe(false);
    });

    it('returns false for buffers of different lengths', () => {
      expect(timingSafeEqualBuffer(Buffer.from('ab'), Buffer.from('abc'))).toBe(false);
    });
  });

  describe('encodeBase64Url / decodeBase64Url', () => {
    it('round-trips a buffer', () => {
      const original = Buffer.from('hello world +/==');
      const encoded = encodeBase64Url(original);
      expect(encoded).not.toContain('+');
      expect(encoded).not.toContain('/');
      expect(encoded).not.toContain('=');
      expect(decodeBase64Url(encoded)).toEqual(original);
    });
  });

  describe('generateRandomBytes', () => {
    it('returns a buffer of the requested length', () => {
      const bytes = generateRandomBytes(32);
      expect(bytes).toHaveLength(32);
    });

    it('produces different values on successive calls', () => {
      const a = generateRandomBytes(32);
      const b = generateRandomBytes(32);
      expect(a.equals(b)).toBe(false);
    });

    it('rejects non-positive lengths', () => {
      expect(() => generateRandomBytes(0)).toThrow(/positive integer/);
      expect(() => generateRandomBytes(-1)).toThrow(/positive integer/);
      expect(() => generateRandomBytes(1.5)).toThrow(/positive integer/);
    });
  });

  describe('hashWithConfig', () => {
    it('hashes with sha256 using the configured algorithm', () => {
      const hash = hashWithConfig('input', defaultCryptoConfig.hash);
      expect(hash).toBe(generateSha256('input'));
    });

    it('rejects non-sha256 algorithms', () => {
      const config: HashConfig = { algorithm: 'md5' as 'sha256', fingerprintPrefixLength: 8 };
      expect(() => hashWithConfig('input', config)).toThrow(/Unsupported hash algorithm/);
    });
  });

  describe('fingerprintWithConfig', () => {
    it('uses the configured fingerprint prefix length', () => {
      const config: HashConfig = { algorithm: 'sha256', fingerprintPrefixLength: 12 };
      const fingerprint = fingerprintWithConfig('token', config);
      expect(fingerprint).toHaveLength(12);
    });
  });
});
