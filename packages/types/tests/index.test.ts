import { describe, expect, it } from 'vitest';
import { identityAuditCategories, oauthProviders, platformRoles, userStatuses } from '../src/index.js';

describe('identity type exports', () => {
  it('includes the approved canonical platform roles', () => {
    expect(platformRoles).toContain('super_admin');
    expect(platformRoles).toContain('support_manager');
    expect(platformRoles).toContain('platform_admin');
  });

  it('includes the approved user status lifecycle', () => {
    expect(userStatuses).toEqual([
      'PENDING',
      'EMAIL_UNVERIFIED',
      'ACTIVE',
      'LOCKED',
      'SUSPENDED',
      'BANNED',
      'ARCHIVED'
    ]);
  });

  it('includes the canonical identity audit categories', () => {
    expect(identityAuditCategories).toEqual(['AUTH', 'SECURITY', 'SESSION', 'RBAC', 'PROFILE', 'OAUTH', 'SYSTEM']);
  });

  it('includes future-ready OAuth providers while only Google is currently implemented', () => {
    expect(oauthProviders).toContain('GOOGLE');
    expect(oauthProviders).toContain('MICROSOFT');
  });
});
