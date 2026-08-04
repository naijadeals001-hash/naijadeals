import { IdentityValidationError } from '@naijadeals/errors';
import type { AuthSessionRepository, UserRepository } from '@naijadeals/repository';
import type { AuthSessionEntity } from '@naijadeals/types';

export interface ListUserSessionsQuery {
  userId: string;
}

export interface ListUserSessionsDependencies {
  users: UserRepository;
  sessions: AuthSessionRepository;
}

export class ListUserSessionsService {
  public constructor(private readonly dependencies: ListUserSessionsDependencies) {}

  public async execute(query: ListUserSessionsQuery): Promise<AuthSessionEntity[]> {
    const user = await this.dependencies.users.findById(query.userId);
    if (!user) {
      throw new IdentityValidationError('User does not exist.', { userId: query.userId });
    }

    return this.dependencies.sessions.findByUserId(user.id);
  }
}
