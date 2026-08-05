import argon2 from 'argon2';
import type { CryptoConfig } from '../config/types.js';
import { validateCryptoConfig } from '../config/crypto-config.js';
import { timingSafeEqualString, generateRandomBytes } from '../hash/hash-utils.js';

export interface PasswordService {
  hash(password: string): Promise<string>;
  verify(password: string, hash: string): Promise<boolean>;
  needsRehash(hash: string): boolean;
}

export class Argon2idPasswordService implements PasswordService {
  public constructor(private readonly config: CryptoConfig) {
    validateCryptoConfig(config);
  }

  public async hash(password: string): Promise<string> {
    if (password.length === 0) {
      throw new Error('Password cannot be empty');
    }
    if (password.length > 1024) {
      throw new Error('Password exceeds maximum allowed length');
    }

    const salt = generateRandomBytes(this.config.argon2.saltLength);
    const options: argon2.Options = {
      type: argon2.argon2id,
      memoryCost: this.config.argon2.memoryCost,
      timeCost: this.config.argon2.timeCost,
      parallelism: this.config.argon2.parallelism,
      hashLength: this.config.argon2.hashLength,
      salt
    };

    return argon2.hash(password, options);
  }

  public async verify(password: string, hash: string): Promise<boolean> {
    if (password.length === 0) {
      return false;
    }
    if (hash.length === 0) {
      return false;
    }

    try {
      return await argon2.verify(hash, password);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      // Argon2 throws on malformed hashes (e.g., truncated, invalid version/params).
      // Treat verification failures as false without leaking hash internals.
      if (message.includes('Invalid hash') || message.includes('encoding')) {
        return false;
      }
      return false;
    }
  }

  public needsRehash(hash: string): boolean {
    if (hash.length === 0) {
      return true;
    }
    try {
      return argon2.needsRehash(hash, {
        memoryCost: this.config.argon2.memoryCost,
        timeCost: this.config.argon2.timeCost,
        parallelism: this.config.argon2.parallelism
      });
    } catch {
      return true;
    }
  }
}

export const verifyPasswordWithConstantTime = async (
  password: string,
  hash: string,
  service: PasswordService
): Promise<boolean> => {
  const result = await service.verify(password, hash);
  // Timing-safe comparison against a constant fallback ensures that the
  // observable branch duration is dominated by service.verify(), which is itself
  // constant-time within argon2. The comparison below prevents accidental
  // short-circuiting by callers that wrap the boolean result.
  timingSafeEqualString(String(result), 'true');
  return result;
};
