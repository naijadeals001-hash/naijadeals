import { randomUUID } from 'node:crypto';
import { IdentityValidationError, ProviderAccountError } from '@naijadeals/errors';
import type { ProviderAccountRepository, UserRepository } from '@naijadeals/repository';
import type { OAuthProvider, ProviderAccountEntity, RequestContext } from '@naijadeals/types';
import { resolveIdentityTelemetry, type IdentityDomainTelemetry } from '../support.js';
import {
  normalizeOptionalEmail,
  validateNonEmptyString,
  validateSupportedOAuthProvider
} from './domain-rules.js';

export interface LinkProviderAccountCommand {
  userId: string;
  provider: OAuthProvider;
  providerUserId: string;
  requestContext: RequestContext;
  providerAccountId?: string;
  providerEmail?: string | null;
  metadata?: Record<string, unknown> | null;
  now?: Date;
}

export interface LinkProviderAccountDependencies {
  users: UserRepository;
  providerAccounts: ProviderAccountRepository;
  telemetry?: IdentityDomainTelemetry;
}

export class LinkProviderAccountService {
  public constructor(private readonly dependencies: LinkProviderAccountDependencies) {}

  public async execute(command: LinkProviderAccountCommand): Promise<ProviderAccountEntity> {
    const telemetry = resolveIdentityTelemetry(this.dependencies.telemetry);
    const now = command.now ?? new Date();
    validateSupportedOAuthProvider(command.provider);
    const providerUserId = validateNonEmptyString(command.providerUserId, 'Provider user identifier');

    const user = await this.dependencies.users.findById(command.userId);
    if (!user) {
      throw new IdentityValidationError('User does not exist for provider account linking.', {
        userId: command.userId
      });
    }

    const existingIdentity = await this.dependencies.providerAccounts.findByProviderIdentity(
      command.provider,
      providerUserId
    );
    if (existingIdentity) {
      throw new ProviderAccountError('Provider identity is already linked to a user.', {
        provider: command.provider,
        providerUserId
      });
    }

    const existingProvider = await this.dependencies.providerAccounts.findByUserAndProvider(user.id, command.provider);
    if (existingProvider) {
      throw new ProviderAccountError('User already has an account linked for this provider.', {
        userId: user.id,
        provider: command.provider
      });
    }

    const account: ProviderAccountEntity = {
      id: command.providerAccountId ?? randomUUID(),
      userId: user.id,
      provider: command.provider,
      providerUserId,
      providerEmail: normalizeOptionalEmail(command.providerEmail),
      linkedAt: now,
      lastLoginAt: null,
      metadata: command.metadata ?? null,
      createdAt: now,
      updatedAt: now
    };

    const createdAccount = await this.dependencies.providerAccounts.create(account);

    await telemetry.auditSink.record({
      category: 'OAUTH',
      action: 'identity.provider_account.link',
      actorId: command.requestContext.actorId,
      targetType: 'provider_account',
      targetId: createdAccount.id,
      status: 'succeeded',
      metadata: { userId: createdAccount.userId, provider: createdAccount.provider },
      requestContext: command.requestContext,
      occurredAt: now
    });

    telemetry.logger.info(
      {
        providerAccountId: createdAccount.id,
        userId: createdAccount.userId,
        provider: createdAccount.provider,
        requestId: command.requestContext.requestId,
        correlationId: command.requestContext.correlationId
      },
      'Provider account linked'
    );

    return createdAccount;
  }
}
