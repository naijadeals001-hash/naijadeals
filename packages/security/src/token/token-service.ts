import crypto from 'node:crypto';
import type { CryptoConfig } from '../config/types.js';
import { validateCryptoConfig } from '../config/crypto-config.js';
import { encodeBase64Url, generateSha256 } from '../hash/hash-utils.js';

export interface SecureToken {
  readonly token: string;
  readonly hashed: string;
  readonly fingerprint: string;
}

export interface TokenService {
  generate(bytes?: number): SecureToken;
  generatePlain(bytes?: number): string;
  hash(token: string): string;
  verify(token: string, hashed: string): boolean;
}

export class SecureTokenService implements TokenService {
  public constructor(private readonly config: CryptoConfig) {
    validateCryptoConfig(config);
  }

  public generate(bytes?: number): SecureToken {
    const length = this.resolveBytes(bytes);
    const raw = crypto.randomBytes(length);
    const token = encodeBase64Url(raw);
    const hashed = this.hash(token);
    const fingerprint = this.fingerprint(token);
    return Object.freeze({ token, hashed, fingerprint });
  }

  public generatePlain(bytes?: number): string {
    const length = this.resolveBytes(bytes);
    const raw = crypto.randomBytes(length);
    return encodeBase64Url(raw);
  }

  public hash(token: string): string {
    return generateSha256(token);
  }

  public verify(token: string, hashed: string): boolean {
    if (token.length === 0 || hashed.length === 0) {
      return false;
    }
    const candidate = generateSha256(token);
    if (candidate.length !== hashed.length) {
      return false;
    }
    try {
      return crypto.timingSafeEqual(Buffer.from(candidate, 'hex'), Buffer.from(hashed, 'hex'));
    } catch {
      return false;
    }
  }

  public fingerprint(token: string): string {
    const hash = generateSha256(token);
    return hash.slice(0, this.config.hash.fingerprintPrefixLength);
  }

  private resolveBytes(bytes?: number): number {
    if (bytes === undefined) {
      return this.config.token.randomBytes;
    }
    if (!Number.isInteger(bytes) || bytes < 16) {
      throw new Error('Token byte length must be an integer >= 16');
    }
    return bytes;
  }
}
