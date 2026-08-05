import { describe, expect, it } from 'vitest';
import {
  LinkProviderAccountService,
  type IdentityAuditRecord
} from '../../src/modules/identity/index.js';
import type {
  ProviderAccountRepository,
  UserRepository
} from '@naijadeals/repository';
import type { ProviderAccountEntity, UserEntity, UserStatus } from '@naijadeals/types';

class InMemoryUsers implements UserRepository {
  public constructor(private readonly user: UserEntity) {}
  public async findById(): Promise<UserEntity | null> { return this.user; }
  public async findByEmail(): Promise<UserEntity | null> { return null; }
  public async create(user: UserEntity): Promise<UserEntity> { return user; }
  public async save(user: UserEntity): Promise<UserEntity> { return user; }
  public async updateStatus(params: { userId: string; status: UserStatus; updatedAt: Date }): Promise<UserEntity> {
    this.user.status = params.status;
    this.user.updatedAt = params.updatedAt;
    return this.user;
  }
}

class InMemoryProviderAccounts implements ProviderAccountRepository {
  public readonly accounts: ProviderAccountEntity[] = [];
  public async findByProviderIdentity(provider: ProviderAccountEntity['provider'], providerUserId: string): Promise<ProviderAccountEntity | null> {
    return this.accounts.find((account) => account.provider === provider && account.providerUserId === providerUserId) ?? null;
  }
  public async findByUserAndProvider(userId: string, provider: ProviderAccountEntity['provider']): Promise<ProviderAccountEntity | null> {
    return this.accounts.find((account) => account.userId === userId && account.provider === provider) ?? null;
  }
  public async create(account: ProviderAccountEntity): Promise<ProviderAccountEntity> {
    this.accounts.push(account);
    return account;
  }
  public async save(account: ProviderAccountEntity): Promise<ProviderAccountEntity> { return account; }
}

class RecordingAuditSink {
  public readonly records: IdentityAuditRecord[] = [];
  public async record(record: IdentityAuditRecord): Promise<void> {
    this.records.push(record);
  }
}

describe('LinkProviderAccountService', () => {
  it('links the approved Google provider account and normalizes provider email', async () => {
    const user: UserEntity = {
      id: 'user_1',
      email: 'user@example.com',
      displayName: 'User',
      status: 'ACTIVE',
      emailVerifiedAt: new Date('2026-08-03T00:00:00.000Z'),
      lastLoginAt: null,
      createdAt: new Date('2026-08-03T00:00:00.000Z'),
      updatedAt: new Date('2026-08-03T00:00:00.000Z')
    };
    const providerAccounts = new InMemoryProviderAccounts();
    const auditSink = new RecordingAuditSink();

    const service = new LinkProviderAccountService({
      users: new InMemoryUsers(user),
      providerAccounts,
      telemetry: { auditSink }
    });

    const result = await service.execute({
      userId: 'user_1',
      provider: 'GOOGLE',
      providerAccountId: 'provider_account_1',
      providerUserId: 'google-sub-1',
      providerEmail: ' Founder@NaijaDeals.com ',
      requestContext: { requestId: 'req_1', correlationId: 'corr_1', actorId: 'user_1' },
      now: new Date('2026-08-03T12:00:00.000Z')
    });

    expect(result.id).toBe('provider_account_1');
    expect(result.providerEmail).toBe('founder@naijadeals.com');
    expect(auditSink.records[0]?.category).toBe('OAUTH');
  });
});
