export interface Argon2Config {
  readonly type: 0 | 1 | 2; // 0 = Argon2d, 1 = Argon2i, 2 = Argon2id
  readonly memoryCost: number; // KiB
  readonly timeCost: number; // iterations
  readonly parallelism: number;
  readonly hashLength: number;
  readonly saltLength: number;
}

export interface TokenConfig {
  readonly randomBytes: number;
  readonly encoding: 'base64url';
}

export interface HashConfig {
  readonly algorithm: 'sha256';
  readonly fingerprintPrefixLength: number;
}

export interface CryptoConfig {
  readonly argon2: Argon2Config;
  readonly token: TokenConfig;
  readonly hash: HashConfig;
}
