import type { PlatformRole } from '@naijadeals/types';

export interface AuthPrincipal {
  subject: string;
  roles: PlatformRole[];
  permissions: string[];
  sessionId?: string;
}

export interface TokenVerifier {
  verifyAccessToken(token: string): Promise<AuthPrincipal>;
}

export interface SessionContract {
  sessionId: string;
  principal: AuthPrincipal;
  expiresAt: string;
}

export interface AuthenticationProvider {
  issueSession(principal: AuthPrincipal): Promise<SessionContract>;
  revokeSession(sessionId: string): Promise<void>;
}
