import { describe, it, expect, beforeEach } from 'vitest';
import type {
  EmailVerificationTokenRepository,
  PasswordCredentialRepository,
  PasswordResetTokenRepository,
  RoleRepository,
  UnitOfWork,
  UserRepository,
  UserRoleRepository
} from '@naijadeals/repository';
import type {
  EmailVerificationTokenEntity,
  PasswordCredentialEntity,
  PasswordResetTokenEntity,
  RoleEntity,
  UserEntity,
  UserRoleEntity
} from '@naijadeals/types';
import type { PasswordService, SecureToken, TokenService } from '@naijadeals/security';
import {
  RegistrationService,
  type RegistrationCommand,
  LoginValidationService,
  EmailVerificationService,
  PasswordResetRequestService,
  PasswordResetCompletionService,
  ProfileUpdateService,
  RoleAssignmentService,
  defaultIdentityServiceOptions
} from '../src/index.js';

const context = { requestId: 'req-123' };

let nextId = 1;
const generateId = (): string => `id-${nextId++}`;

const unitOfWork: UnitOfWork = {
  runInTransaction: async <T>(handler: () => Promise<T>): Promise<T> => handler()
};

const makePasswordService = (): PasswordService => ({
  hash: async (password: string) => `argon2:${password}`,
  verify: async (password: string, hash: string) => {
    if (hash.startsWith('argon2:')) {
      return hash === `argon2:${password}`;
    }
    // Legacy-format hashes verify directly (used for rehash-detection tests).
    return hash === password;
  },
  needsRehash: (hash: string) => !hash.startsWith('argon2:')
});

let tokenCounter = 0;
const makeTokenService = (): TokenService => {
  const hashes = new Map<string, string>();
  const service = {
    generate: (bytes?: number): SecureToken => {
      tokenCounter++;
      const token = `token-${tokenCounter}-${bytes ?? 32}`;
      const hashed = `hash-${token}`;
      hashes.set(token, hashed);
      return Object.freeze({ token, hashed, fingerprint: hashed.slice(0, 8) });
    },
    generatePlain: (bytes?: number): string => `plain-${tokenCounter++}-${bytes ?? 32}`,
    hash: (token: string): string => hashes.get(token) ?? `hash-${token}`,
    verify: (token: string, hashed: string): boolean => (hashes.get(token) ?? `hash-${token}`) === hashed
  };
  return service;
};

const makeUserRepository = (initial: UserEntity[] = []): UserRepository => {
  const users = new Map<string, UserEntity>(initial.map((u) => [u.id, { ...u }]));
  const byEmail = new Map<string, string>(initial.map((u) => [u.email, u.id]));

  return {
    findById: async (id: string) => (users.has(id) ? { ...users.get(id)! } : null),
    findByEmail: async (email: string) => {
      const id = byEmail.get(email);
      return id !== undefined ? { ...users.get(id)! } : null;
    },
    create: async (user: UserEntity) => {
      users.set(user.id, { ...user });
      byEmail.set(user.email, user.id);
      return { ...user };
    },
    save: async (user: UserEntity) => {
      const existing = users.get(user.id);
      if (existing && existing.email !== user.email) {
        byEmail.delete(existing.email);
        byEmail.set(user.email, user.id);
      }
      users.set(user.id, { ...user });
      return { ...user };
    },
    updateStatus: async (params) => {
      const user = users.get(params.userId);
      if (!user) throw new Error('User not found');
      const updated: UserEntity = {
        ...user,
        status: params.status,
        emailVerifiedAt: params.emailVerifiedAt ?? user.emailVerifiedAt,
        lastLoginAt: params.lastLoginAt ?? user.lastLoginAt,
        updatedAt: params.updatedAt
      };
      users.set(params.userId, updated);
      return { ...updated };
    }
  };
};

const makeCredentialRepository = (initial: PasswordCredentialEntity[] = []): PasswordCredentialRepository => {
  const credentials = new Map<string, PasswordCredentialEntity>(initial.map((c) => [c.userId, { ...c }]));
  return {
    findByUserId: async (userId: string) => (credentials.has(userId) ? { ...credentials.get(userId)! } : null),
    create: async (credential: PasswordCredentialEntity) => {
      credentials.set(credential.userId, { ...credential });
      return { ...credential };
    },
    save: async (credential: PasswordCredentialEntity) => {
      credentials.set(credential.userId, { ...credential });
      return { ...credential };
    }
  };
};

const makeEmailTokenRepository = (initial: EmailVerificationTokenEntity[] = []): EmailVerificationTokenRepository => {
  const tokens = new Map<string, EmailVerificationTokenEntity>(initial.map((t) => [t.tokenHash, { ...t }]));
  return {
    findByTokenHash: async (tokenHash: string) => (tokens.has(tokenHash) ? { ...tokens.get(tokenHash)! } : null),
    create: async (token: EmailVerificationTokenEntity) => {
      tokens.set(token.tokenHash, { ...token });
      return { ...token };
    },
    save: async (token: EmailVerificationTokenEntity) => {
      tokens.set(token.tokenHash, { ...token });
      return { ...token };
    }
  };
};

const makeResetTokenRepository = (initial: PasswordResetTokenEntity[] = []): PasswordResetTokenRepository => {
  const tokens = new Map<string, PasswordResetTokenEntity>(initial.map((t) => [t.tokenHash, { ...t }]));
  return {
    findByTokenHash: async (tokenHash: string) => (tokens.has(tokenHash) ? { ...tokens.get(tokenHash)! } : null),
    create: async (token: PasswordResetTokenEntity) => {
      tokens.set(token.tokenHash, { ...token });
      return { ...token };
    },
    save: async (token: PasswordResetTokenEntity) => {
      tokens.set(token.tokenHash, { ...token });
      return { ...token };
    }
  };
};

const makeRoleRepository = (initial: RoleEntity[] = []): RoleRepository & { _assign: (userId: string, roleEntity: RoleEntity) => void } => {
  const roles = new Map<string, RoleEntity>(initial.map((r) => [r.id, { ...r }]));
  const bySlug = new Map<string, string>(initial.map((r) => [r.slug, r.id]));
  const userRoles = new Map<string, string[]>();
  const repo: RoleRepository = {
    findById: async (id: string) => (roles.has(id) ? { ...roles.get(id)! } : null),
    findBySlug: async (slug: string) => {
      const id = bySlug.get(slug);
      return id !== undefined ? { ...roles.get(id)! } : null;
    },
    findByUserId: async (userId: string) => {
      const ids = userRoles.get(userId) ?? [];
      return ids.map((id) => ({ ...roles.get(id)! })).filter((r): r is RoleEntity => r !== undefined);
    }
  };
  return Object.assign(repo, {
    _assign: (userId: string, roleEntity: RoleEntity) => {
      roles.set(roleEntity.id, { ...roleEntity });
      const list = userRoles.get(userId) ?? [];
      if (!list.includes(roleEntity.id)) {
        list.push(roleEntity.id);
        userRoles.set(userId, list);
      }
    }
  });
};

const makeUserRoleRepository = (initial: UserRoleEntity[] = []): UserRoleRepository => {
  const assignments = new Map<string, UserRoleEntity>(initial.map((a) => [`${a.userId}:${a.roleId}`, { ...a }]));
  return {
    findByUserId: async (userId: string) =>
      Array.from(assignments.values()).filter((a) => a.userId === userId).map((a) => ({ ...a })),
    findByUserAndRole: async (userId: string, roleId: string) => {
      const key = `${userId}:${roleId}`;
      return assignments.has(key) ? { ...assignments.get(key)! } : null;
    },
    create: async (assignment: UserRoleEntity) => {
      assignments.set(`${assignment.userId}:${assignment.roleId}`, { ...assignment });
      return { ...assignment };
    }
  };
};

const makeUser = (overrides: Partial<UserEntity> = {}): UserEntity => ({
  id: generateId(),
  email: `user-${nextId}@example.com`,
  displayName: `User ${nextId}`,
  status: 'EMAIL_UNVERIFIED',
  emailVerifiedAt: null,
  lastLoginAt: null,
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
  ...overrides
});

describe('RegistrationService', () => {
  let users: UserRepository;
  let credentials: PasswordCredentialRepository;
  let emailTokens: EmailVerificationTokenRepository;
  let passwordService: PasswordService;
  let tokenService: TokenService;
  let service: RegistrationService;

  beforeEach(() => {
    nextId = 1;
    tokenCounter = 0;
    users = makeUserRepository();
    credentials = makeCredentialRepository();
    emailTokens = makeEmailTokenRepository();
    passwordService = makePasswordService();
    tokenService = makeTokenService();
    service = new RegistrationService(
      users,
      credentials,
      emailTokens,
      unitOfWork,
      passwordService,
      tokenService,
      defaultIdentityServiceOptions,
      generateId
    );
  });

  it('registers a new user with EMAIL_UNVERIFIED status and creates a credential and token', async () => {
    const command: RegistrationCommand = {
      email: 'new@example.com',
      password: 'StrongPass123!',
      displayName: 'New User'
    };

    const result = await service.register(command, context);

    expect(result.user.email).toBe('new@example.com');
    expect(result.user.displayName).toBe('New User');
    expect(result.user.status).toBe('EMAIL_UNVERIFIED');
    expect(result.emailVerificationToken).toMatch(/^token-/);
    expect(result.emailVerificationTokenFingerprint).toBeTruthy();

    const credential = await credentials.findByUserId(result.user.id);
    expect(credential).not.toBeNull();
    expect(credential!.passwordHash).toBe('argon2:StrongPass123!');
    expect(credential!.passwordVersion).toBe(1);

    const stored = await emailTokens.findByTokenHash(tokenService.hash(result.emailVerificationToken!));
    expect(stored).not.toBeNull();
    expect(stored!.userId).toBe(result.user.id);
    expect(stored!.usedAt).toBeNull();
  });

  it('rejects duplicate email registration', async () => {
    await service.register({ email: 'dup@example.com', password: 'StrongPass123!', displayName: 'First' }, context);
    await expect(
      service.register({ email: 'dup@example.com', password: 'StrongPass123!', displayName: 'Second' }, context)
    ).rejects.toThrow('A user with this email already exists.');
  });

  it('rejects invalid email format', async () => {
    await expect(
      service.register({ email: 'not-an-email', password: 'StrongPass123!', displayName: 'User' }, context)
    ).rejects.toThrow('Email format is invalid.');
  });

  it('rejects password that is too short', async () => {
    await expect(
      service.register({ email: 'a@example.com', password: 'short', displayName: 'User' }, context)
    ).rejects.toThrow('Password must be at least 12 characters long.');
  });

  it('rejects whitespace-only password', async () => {
    await expect(
      service.register({ email: 'a@example.com', password: '            ', displayName: 'User' }, context)
    ).rejects.toThrow('Password cannot be whitespace only.');
  });

  it('rejects missing display name', async () => {
    await expect(
      service.register({ email: 'a@example.com', password: 'StrongPass123!', displayName: '  ' }, context)
    ).rejects.toThrow('Display name is required.');
  });

  it('trims and lowercases email', async () => {
    const result = await service.register(
      { email: '  MIXED@Example.COM  ', password: 'StrongPass123!', displayName: 'User' },
      context
    );
    expect(result.user.email).toBe('mixed@example.com');
  });
});

describe('LoginValidationService', () => {
  let users: UserRepository;
  let credentials: PasswordCredentialRepository;
  let roles: RoleRepository;
  let passwordService: PasswordService;
  let service: LoginValidationService;

  beforeEach(() => {
    nextId = 1;
    users = makeUserRepository();
    credentials = makeCredentialRepository();
    roles = makeRoleRepository();
    passwordService = makePasswordService();
    service = new LoginValidationService(users, credentials, roles, passwordService);
  });

  it('validates correct email and password', async () => {
    const user = makeUser({ email: 'active@example.com', status: 'ACTIVE' });
    await users.create(user);
    await credentials.create({
      id: generateId(),
      userId: user.id,
      passwordHash: 'argon2:CorrectPass123!',
      passwordVersion: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const result = await service.validate(
      { email: 'active@example.com', password: 'CorrectPass123!' },
      context
    );

    expect(result.user.id).toBe(user.id);
    expect(result.passwordNeedsRehash).toBe(false);
    expect(result.roles.roles).toEqual([]);
    expect(result.credential.passwordVersion).toBe(1);
  });

  it('flags password needing rehash', async () => {
    const user = makeUser({ email: 'old@example.com', status: 'ACTIVE' });
    await users.create(user);
    await credentials.create({
      id: generateId(),
      userId: user.id,
      passwordHash: 'oldhash',
      passwordVersion: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const result = await service.validate(
      { email: 'old@example.com', password: 'oldhash' },
      context
    );
    expect(result.passwordNeedsRehash).toBe(true);
  });

  it('returns generic error for non-existent email', async () => {
    await expect(
      service.validate({ email: 'missing@example.com', password: 'StrongPass123!' }, context)
    ).rejects.toThrow('Invalid email or password.');
  });

  it('returns generic error for wrong password', async () => {
    const user = makeUser({ email: 'wrong@example.com', status: 'ACTIVE' });
    await users.create(user);
    await credentials.create({
      id: generateId(),
      userId: user.id,
      passwordHash: 'argon2:CorrectPass123!',
      passwordVersion: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await expect(
      service.validate({ email: 'wrong@example.com', password: 'WrongPass123!' }, context)
    ).rejects.toThrow('Invalid email or password.');
  });

  it.each(['BANNED', 'SUSPENDED', 'ARCHIVED', 'LOCKED', 'PENDING'] as const)(
    'rejects login for %s status',
    async (status) => {
      const user = makeUser({ email: `${status.toLowerCase()}@example.com`, status });
      await users.create(user);
      await credentials.create({
        id: generateId(),
        userId: user.id,
        passwordHash: 'argon2:CorrectPass123!',
        passwordVersion: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      await expect(
        service.validate({ email: `${status.toLowerCase()}@example.com`, password: 'CorrectPass123!' }, context)
      ).rejects.toThrow('Cannot transition user status');
    }
  );

  it('allows login for EMAIL_UNVERIFIED status', async () => {
    const user = makeUser({ email: 'unverified@example.com', status: 'EMAIL_UNVERIFIED' });
    await users.create(user);
    await credentials.create({
      id: generateId(),
      userId: user.id,
      passwordHash: 'argon2:CorrectPass123!',
      passwordVersion: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const result = await service.validate(
      { email: 'unverified@example.com', password: 'CorrectPass123!' },
      context
    );
    expect(result.user.status).toBe('EMAIL_UNVERIFIED');
  });

  it('resolves roles for the user', async () => {
    const user = makeUser({ email: 'roles@example.com', status: 'ACTIVE' });
    await users.create(user);
    await credentials.create({
      id: generateId(),
      userId: user.id,
      passwordHash: 'argon2:CorrectPass123!',
      passwordVersion: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const role: RoleEntity = { id: generateId(), slug: 'customer', name: 'Customer', isSystem: true, createdAt: new Date(), updatedAt: new Date() };
    await roles.findBySlug('customer'); // noop side effect placeholder
    (roles as unknown as { _assign: (userId: string, roleEntity: RoleEntity) => void })._assign(user.id, role);

    const result = await service.validate({ email: 'roles@example.com', password: 'CorrectPass123!' }, context);
    expect(result.roles.roles).toHaveLength(1);
    expect(result.roles.roles[0].slug).toBe('customer');
  });
});

describe('EmailVerificationService', () => {
  let users: UserRepository;
  let emailTokens: EmailVerificationTokenRepository;
  let tokenService: TokenService;
  let service: EmailVerificationService;
  let user: UserEntity;

  beforeEach(async () => {
    nextId = 1;
    tokenCounter = 0;
    users = makeUserRepository();
    emailTokens = makeEmailTokenRepository();
    tokenService = makeTokenService();
    service = new EmailVerificationService(
      users,
      emailTokens,
      unitOfWork,
      tokenService,
      defaultIdentityServiceOptions,
      generateId
    );
    user = makeUser({ email: 'verify@example.com', status: 'EMAIL_UNVERIFIED' });
    await users.create(user);
  });

  it('issues a verification token for an EMAIL_UNVERIFIED user', async () => {
    const result = await service.requestVerification({ email: 'verify@example.com' }, context);
    expect(result.user.id).toBe(user.id);
    expect(result.rawToken).toMatch(/^token-/);
    expect(result.tokenFingerprint).toBeTruthy();
  });

  it('rejects verification request for non-existent email (generic)', async () => {
    await expect(service.requestVerification({ email: 'missing@example.com' }, context)).rejects.toThrow(
      'Unable to process this request.'
    );
  });

  it('rejects verification request for already ACTIVE user', async () => {
    const activeUser = makeUser({ email: 'active@example.com', status: 'ACTIVE' });
    await users.create(activeUser);
    await expect(service.requestVerification({ email: 'active@example.com' }, context)).rejects.toThrow(
      'Email is already verified.'
    );
  });

  it('rejects verification request for banned/suspended/archived users', async () => {
    for (const status of ['BANNED', 'SUSPENDED', 'ARCHIVED'] as const) {
      const u = makeUser({ email: `${status.toLowerCase()}@example.com`, status });
      await users.create(u);
      await expect(service.requestVerification({ email: u.email }, context)).rejects.toThrow(
        'Cannot transition user status'
      );
    }
  });

  it('confirms verification and transitions user to ACTIVE', async () => {
    const request = await service.requestVerification({ email: 'verify@example.com' }, context);
    const confirm = await service.confirmVerification({ token: request.rawToken }, context);

    expect(confirm.user.status).toBe('ACTIVE');
    expect(confirm.user.emailVerifiedAt).toBeInstanceOf(Date);

    const stored = await emailTokens.findByTokenHash(tokenService.hash(request.rawToken));
    expect(stored!.usedAt).not.toBeNull();
  });

  it('rejects confirmation with wrong token', async () => {
    await expect(service.confirmVerification({ token: 'totally-wrong-token' }, context)).rejects.toThrow(
      'Invalid or expired verification token.'
    );
  });

  it('rejects confirmation with expired token', async () => {
    const request = await service.requestVerification({ email: 'verify@example.com' }, context);
    const expired = await emailTokens.findByTokenHash(tokenService.hash(request.rawToken));
    expired!.expiresAt = new Date(Date.now() - 1000);
    await emailTokens.save(expired!);

    await expect(service.confirmVerification({ token: request.rawToken }, context)).rejects.toThrow(
      'Verification token has expired.'
    );
  });

  it('rejects confirmation with already used token', async () => {
    const request = await service.requestVerification({ email: 'verify@example.com' }, context);
    await service.confirmVerification({ token: request.rawToken }, context);

    await expect(service.confirmVerification({ token: request.rawToken }, context)).rejects.toThrow(
      'Verification token has already been used.'
    );
  });
});

describe('PasswordResetRequestService', () => {
  let users: UserRepository;
  let resetTokens: PasswordResetTokenRepository;
  let tokenService: TokenService;
  let service: PasswordResetRequestService;

  beforeEach(async () => {
    nextId = 1;
    tokenCounter = 0;
    users = makeUserRepository();
    resetTokens = makeResetTokenRepository();
    tokenService = makeTokenService();
    service = new PasswordResetRequestService(
      users,
      resetTokens,
      unitOfWork,
      tokenService,
      defaultIdentityServiceOptions,
      generateId
    );
  });

  it('issues a reset token for an active user', async () => {
    const user = makeUser({ email: 'reset@example.com', status: 'ACTIVE' });
    await users.create(user);

    const result = await service.requestReset({ email: 'reset@example.com' }, context);
    expect(result.user.id).toBe(user.id);
    expect(result.resetToken).toMatch(/^token-/);
    expect(result.resetTokenFingerprint).toBeTruthy();

    const stored = await resetTokens.findByTokenHash(tokenService.hash(result.resetToken));
    expect(stored!.userId).toBe(user.id);
    expect(stored!.usedAt).toBeNull();
  });

  it('issues a reset token for an EMAIL_UNVERIFIED user', async () => {
    const user = makeUser({ email: 'unverified-reset@example.com', status: 'EMAIL_UNVERIFIED' });
    await users.create(user);

    const result = await service.requestReset({ email: 'unverified-reset@example.com' }, context);
    expect(result.user.id).toBe(user.id);
  });

  it('returns generic error for non-existent email', async () => {
    await expect(service.requestReset({ email: 'missing@example.com' }, context)).rejects.toThrow(
      'Unable to process this request.'
    );
  });

  it('rejects reset request for banned/suspended/archived users', async () => {
    for (const status of ['BANNED', 'SUSPENDED', 'ARCHIVED'] as const) {
      const u = makeUser({ email: `${status.toLowerCase()}-reset@example.com`, status });
      await users.create(u);
      await expect(service.requestReset({ email: u.email }, context)).rejects.toThrow(
        'Cannot transition user status'
      );
    }
  });

  it('rejects reset request for locked/pending users', async () => {
    for (const status of ['LOCKED', 'PENDING'] as const) {
      const u = makeUser({ email: `${status.toLowerCase()}-reset@example.com`, status });
      await users.create(u);
      await expect(service.requestReset({ email: u.email }, context)).rejects.toThrow(
        'Unable to process this request.'
      );
    }
  });
});

describe('PasswordResetCompletionService', () => {
  let users: UserRepository;
  let credentials: PasswordCredentialRepository;
  let resetTokens: PasswordResetTokenRepository;
  let passwordService: PasswordService;
  let tokenService: TokenService;
  let service: PasswordResetCompletionService;
  let resetToken: string;
  let user: UserEntity;

  beforeEach(async () => {
    nextId = 1;
    tokenCounter = 0;
    users = makeUserRepository();
    credentials = makeCredentialRepository();
    resetTokens = makeResetTokenRepository();
    passwordService = makePasswordService();
    tokenService = makeTokenService();
    service = new PasswordResetCompletionService(
      users,
      credentials,
      resetTokens,
      unitOfWork,
      passwordService,
      tokenService,
      generateId
    );
    user = makeUser({ email: 'complete@example.com', status: 'ACTIVE' });
    await users.create(user);
    await credentials.create({
      id: generateId(),
      userId: user.id,
      passwordHash: 'argon2:OldPass123!',
      passwordVersion: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const requestService = new PasswordResetRequestService(
      users,
      resetTokens,
      unitOfWork,
      tokenService,
      defaultIdentityServiceOptions,
      generateId
    );
    const request = await requestService.requestReset({ email: 'complete@example.com' }, context);
    resetToken = request.resetToken;
  });

  it('completes password reset and increments password version', async () => {
    const result = await service.completeReset({ token: resetToken, newPassword: 'NewStrongPass123!' }, context);
    expect(result.user.id).toBe(user.id);

    const credential = await credentials.findByUserId(user.id);
    expect(credential!.passwordHash).toBe('argon2:NewStrongPass123!');
    expect(credential!.passwordVersion).toBe(2);

    const stored = await resetTokens.findByTokenHash(tokenService.hash(resetToken));
    expect(stored!.usedAt).not.toBeNull();
  });

  it('creates credential if none exists when completing reset', async () => {
    const noCredentialUser = makeUser({ email: 'nocred@example.com', status: 'ACTIVE' });
    await users.create(noCredentialUser);
    const requestService = new PasswordResetRequestService(
      users,
      resetTokens,
      unitOfWork,
      tokenService,
      defaultIdentityServiceOptions,
      generateId
    );
    const request = await requestService.requestReset({ email: 'nocred@example.com' }, context);

    await service.completeReset({ token: request.resetToken, newPassword: 'BrandNewPass123!' }, context);

    const credential = await credentials.findByUserId(noCredentialUser.id);
    expect(credential).not.toBeNull();
    expect(credential!.passwordVersion).toBe(1);
    expect(credential!.passwordHash).toBe('argon2:BrandNewPass123!');
  });

  it('rejects reset with invalid token', async () => {
    await expect(
      service.completeReset({ token: 'bad-token', newPassword: 'NewStrongPass123!' }, context)
    ).rejects.toThrow('Invalid or expired reset token.');
  });

  it('rejects reset with expired token', async () => {
    const stored = await resetTokens.findByTokenHash(tokenService.hash(resetToken));
    stored!.expiresAt = new Date(Date.now() - 1000);
    await resetTokens.save(stored!);

    await expect(
      service.completeReset({ token: resetToken, newPassword: 'NewStrongPass123!' }, context)
    ).rejects.toThrow('Reset token has expired.');
  });

  it('rejects reset with already used token', async () => {
    await service.completeReset({ token: resetToken, newPassword: 'NewStrongPass123!' }, context);
    await expect(
      service.completeReset({ token: resetToken, newPassword: 'AnotherPass123!' }, context)
    ).rejects.toThrow('Reset token has already been used.');
  });

  it('rejects reset with weak password', async () => {
    await expect(
      service.completeReset({ token: resetToken, newPassword: 'short' }, context)
    ).rejects.toThrow('Password must be at least 12 characters long.');
  });
});

describe('ProfileUpdateService', () => {
  let users: UserRepository;
  let service: ProfileUpdateService;
  let user: UserEntity;

  beforeEach(async () => {
    nextId = 1;
    users = makeUserRepository();
    service = new ProfileUpdateService(users, defaultIdentityServiceOptions);
    user = makeUser({ email: 'profile@example.com', status: 'ACTIVE', displayName: 'Original' });
    await users.create(user);
  });

  it('updates display name', async () => {
    const result = await service.update({ userId: user.id, displayName: 'Updated Name' }, context);
    expect(result.user.displayName).toBe('Updated Name');
    expect(result.previousDisplayName).toBe('Original');
    expect(result.user.updatedAt).toBeInstanceOf(Date);
  });

  it('trims display name', async () => {
    const result = await service.update({ userId: user.id, displayName: '  Trimmed  ' }, context);
    expect(result.user.displayName).toBe('Trimmed');
  });

  it('transitions status according to allowed rules', async () => {
    const result = await service.update({ userId: user.id, status: 'LOCKED' }, context);
    expect(result.user.status).toBe('LOCKED');
    expect(result.previousStatus).toBe('ACTIVE');
  });

  it('rejects invalid status transition', async () => {
    await expect(service.update({ userId: user.id, status: 'PENDING' }, context)).rejects.toThrow(
      'Cannot transition user status from ACTIVE to PENDING.'
    );
  });

  it('returns user unchanged when no updates are provided', async () => {
    const result = await service.update({ userId: user.id }, context);
    expect(result.user.displayName).toBe('Original');
    expect(result.user.status).toBe('ACTIVE');
  });

  it('throws when user is not found', async () => {
    await expect(service.update({ userId: 'missing-id', displayName: 'Name' }, context)).rejects.toThrow(
      'User not found.'
    );
  });

  it('rejects invalid display name', async () => {
    await expect(service.update({ userId: user.id, displayName: 'A' }, context)).rejects.toThrow(
      'Display name is too short.'
    );
  });
});

describe('RoleAssignmentService', () => {
  let users: UserRepository;
  let roles: RoleRepository;
  let userRoles: UserRoleRepository;
  let service: RoleAssignmentService;
  let user: UserEntity;
  let role: RoleEntity;

  beforeEach(async () => {
    nextId = 1;
    users = makeUserRepository();
    roles = makeRoleRepository();
    userRoles = makeUserRoleRepository();
    service = new RoleAssignmentService(users, roles, userRoles);
    user = makeUser({ email: 'roleuser@example.com', status: 'ACTIVE' });
    await users.create(user);
    role = { id: generateId(), slug: 'customer', name: 'Customer', isSystem: true, createdAt: new Date(), updatedAt: new Date() };
    (roles as unknown as { _assign: (userId: string, roleEntity: RoleEntity) => void })._assign(user.id, role);
  });

  it('assigns a role to a user', async () => {
    const result = await service.assignRole(
      { userId: user.id, roleId: role.id, assignedByUserId: 'admin-1', assignedReason: ' onboarding' },
      context
    );

    expect(result.assignment.userId).toBe(user.id);
    expect(result.assignment.roleId).toBe(role.id);
    expect(result.assignment.assignedByUserId).toBe('admin-1');
    expect(result.assignment.assignedReason).toBe(' onboarding');
    expect(result.role.slug).toBe('customer');
  });

  it('throws when user not found', async () => {
    await expect(
      service.assignRole({ userId: 'missing', roleId: role.id }, context)
    ).rejects.toThrow('User not found.');
  });

  it('throws when role not found', async () => {
    await expect(
      service.assignRole({ userId: user.id, roleId: 'missing' }, context)
    ).rejects.toThrow('Role not found.');
  });

  it('throws when user already has the role', async () => {
    await service.assignRole({ userId: user.id, roleId: role.id }, context);
    await expect(service.assignRole({ userId: user.id, roleId: role.id }, context)).rejects.toThrow(
      'User already has the requested role.'
    );
  });

  it('throws when expiration is in the past', async () => {
    await expect(
      service.assignRole({ userId: user.id, roleId: role.id, expiresAt: new Date(Date.now() - 1000) }, context)
    ).rejects.toThrow('Role assignment expiration must be in the future.');
  });

  it('allows assignment with future expiration', async () => {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const result = await service.assignRole({ userId: user.id, roleId: role.id, expiresAt }, context);
    expect(result.assignment.expiresAt).toEqual(expiresAt);
  });
});
