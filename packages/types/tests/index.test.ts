import { describe, expect, it } from 'vitest';
import { platformRoles } from '../src/index.js';

describe('platform roles', () => {
  it('includes super admin role', () => {
    expect(platformRoles).toContain('super_admin');
  });
});
