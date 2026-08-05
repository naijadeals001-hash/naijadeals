import type { CryptoConfig } from './types.js';

export const DEFAULT_ARGON2_MEMORY_KIB = 64 * 1024;
export const DEFAULT_ARGON2_ITERATIONS = 3;
export const DEFAULT_ARGON2_PARALLELISM = 4;
export const DEFAULT_ARGON2_HASH_LENGTH = 32;
export const DEFAULT_ARGON2_SALT_LENGTH = 16;
export const DEFAULT_TOKEN_RANDOM_BYTES = 32;
export const DEFAULT_SHA256_ALGORITHM = 'sha256';
export const DEFAULT_FINGERPRINT_PREFIX_LENGTH = 8;
export const MINIMUM_TOKEN_BYTES = 16;
export const MINIMUM_SALT_BYTES = 16;
export const MINIMUM_MEMORY_KIB = 8 * 1024;
export const MINIMUM_ITERATIONS = 2;
export const MINIMUM_PARALLELISM = 1;

export const defaultCryptoConfig: CryptoConfig = {
  argon2: {
    type: 2, // Argon2id
    memoryCost: DEFAULT_ARGON2_MEMORY_KIB,
    timeCost: DEFAULT_ARGON2_ITERATIONS,
    parallelism: DEFAULT_ARGON2_PARALLELISM,
    hashLength: DEFAULT_ARGON2_HASH_LENGTH,
    saltLength: DEFAULT_ARGON2_SALT_LENGTH
  },
  token: {
    randomBytes: DEFAULT_TOKEN_RANDOM_BYTES,
    encoding: 'base64url'
  },
  hash: {
    algorithm: DEFAULT_SHA256_ALGORITHM,
    fingerprintPrefixLength: DEFAULT_FINGERPRINT_PREFIX_LENGTH
  }
};

export const loadCryptoConfig = (
  source: NodeJS.ProcessEnv = process.env,
  base: CryptoConfig = defaultCryptoConfig
): CryptoConfig => {
  const parseIntEnv = (key: string, fallback: number, minimum: number): number => {
    const raw = source[key];
    if (raw === undefined || raw === null || raw === '') {
      return fallback;
    }
    const parsed = Number.parseInt(raw, 10);
    if (Number.isNaN(parsed) || parsed < minimum) {
      throw new Error(
        `Invalid crypto configuration: ${key} must be an integer >= ${minimum}, received "${raw}"`
      );
    }
    return parsed;
  };

  return {
    argon2: {
      type: base.argon2.type,
      memoryCost: parseIntEnv('ARGON2_MEMORY_KIB', base.argon2.memoryCost, MINIMUM_MEMORY_KIB),
      timeCost: parseIntEnv('ARGON2_ITERATIONS', base.argon2.timeCost, MINIMUM_ITERATIONS),
      parallelism: parseIntEnv('ARGON2_PARALLELISM', base.argon2.parallelism, MINIMUM_PARALLELISM),
      hashLength: parseIntEnv('ARGON2_HASH_LENGTH', base.argon2.hashLength, 1),
      saltLength: parseIntEnv('ARGON2_SALT_LENGTH', base.argon2.saltLength, MINIMUM_SALT_BYTES)
    },
    token: {
      randomBytes: parseIntEnv('TOKEN_RANDOM_BYTES', base.token.randomBytes, MINIMUM_TOKEN_BYTES),
      encoding: base.token.encoding
    },
    hash: {
      algorithm: (source.HASH_ALGORITHM as 'sha256' | undefined) ?? base.hash.algorithm,
      fingerprintPrefixLength: parseIntEnv(
        'HASH_FINGERPRINT_PREFIX_LENGTH',
        base.hash.fingerprintPrefixLength,
        4
      )
    }
  };
};

export const validateCryptoConfig = (config: CryptoConfig): void => {
  if (config.argon2.memoryCost < MINIMUM_MEMORY_KIB) {
    throw new Error(
      `Argon2 memoryCost must be at least ${MINIMUM_MEMORY_KIB} KiB, received ${config.argon2.memoryCost}`
    );
  }
  if (config.argon2.timeCost < MINIMUM_ITERATIONS) {
    throw new Error(
      `Argon2 timeCost must be at least ${MINIMUM_ITERATIONS}, received ${config.argon2.timeCost}`
    );
  }
  if (config.argon2.parallelism < MINIMUM_PARALLELISM) {
    throw new Error(
      `Argon2 parallelism must be at least ${MINIMUM_PARALLELISM}, received ${config.argon2.parallelism}`
    );
  }
  if (config.argon2.hashLength < 1) {
    throw new Error(
      `Argon2 hashLength must be at least 1, received ${config.argon2.hashLength}`
    );
  }
  if (config.argon2.saltLength < MINIMUM_SALT_BYTES) {
    throw new Error(
      `Argon2 saltLength must be at least ${MINIMUM_SALT_BYTES} bytes, received ${config.argon2.saltLength}`
    );
  }
  if (config.token.randomBytes < MINIMUM_TOKEN_BYTES) {
    throw new Error(
      `Token randomBytes must be at least ${MINIMUM_TOKEN_BYTES}, received ${config.token.randomBytes}`
    );
  }
  if (config.hash.fingerprintPrefixLength < 4) {
    throw new Error(
      `Fingerprint prefix length must be at least 4, received ${config.hash.fingerprintPrefixLength}`
    );
  }
  if (config.hash.algorithm !== 'sha256') {
    throw new Error(
      `Only sha256 is supported for token hashing; received ${config.hash.algorithm}`
    );
  }
};
