export interface AuthSessionEntity {
  id: string;
  userId: string;
  refreshTokenHash: string;
  deviceId?: string | null;
  deviceNameSnapshot?: string | null;
  userAgent?: string | null;
  ipAddress?: string | null;
  lastUsedAt?: Date | null;
  expiresAt: Date;
  revokedAt?: Date | null;
  createdAt: Date;
}

export interface EmailVerificationTokenEntity {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  usedAt?: Date | null;
  createdAt: Date;
}

export interface PasswordResetTokenEntity {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  usedAt?: Date | null;
  createdAt: Date;
}
