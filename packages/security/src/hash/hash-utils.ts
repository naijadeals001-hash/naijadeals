import crypto from 'node:crypto';
import type { HashConfig } from '../config/types.js';

export const generateSha256 = (input: string): string => {
  return crypto.createHash('sha256').update(input, 'utf8').digest('hex');
};

export const generateTokenFingerprint = (token: string, prefixLength: number): string => {
  if (prefixLength < 4) {
    throw new Error('Token fingerprint prefix length must be at least 4 characters');
  }
  const hash = generateSha256(token);
  return hash.slice(0, prefixLength);
};

export const timingSafeEqualString = (a: string, b: string): boolean => {
  if (a.length !== b.length) {
    return false;
  }
  const aBuffer = Buffer.from(a, 'utf8');
  const bBuffer = Buffer.from(b, 'utf8');
  return timingSafeEqualBuffer(aBuffer, bBuffer);
};

export const timingSafeEqualBuffer = (a: Buffer, b: Buffer): boolean => {
  if (a.length !== b.length) {
    return false;
  }
  try {
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
};

export const encodeBase64Url = (input: Buffer): string => {
  return input.toString('base64url');
};

export const decodeBase64Url = (input: string): Buffer => {
  return Buffer.from(input, 'base64url');
};

export const generateRandomBytes = (length: number): Buffer => {
  if (length < 1 || !Number.isInteger(length)) {
    throw new Error('Random byte length must be a positive integer');
  }
  return crypto.randomBytes(length);
};

export const hashWithConfig = (input: string, config: HashConfig): string => {
  if (config.algorithm !== 'sha256') {
    throw new Error(`Unsupported hash algorithm: ${config.algorithm}. Only sha256 is allowed.`);
  }
  return generateSha256(input);
};

export const fingerprintWithConfig = (token: string, config: HashConfig): string => {
  return generateTokenFingerprint(token, config.fingerprintPrefixLength);
};
