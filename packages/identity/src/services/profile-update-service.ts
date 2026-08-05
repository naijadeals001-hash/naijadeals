import type { UserRepository } from '@naijadeals/repository';
import { IdentityValidationError, UserStatusTransitionError } from '@naijadeals/errors';
import type { UserEntity, UserStatus } from '@naijadeals/types';
import type { IdentityContext, IdentityServiceOptions, ProfileUpdateResult } from '../contracts.js';
import { normalizeEmail, validateDisplayName } from '../policy/email-policy.js';
import { assertStatusTransition } from '../policy/status-policy.js';

export interface UpdateProfileCommand {
  userId: string;
  displayName?: string;
  status?: UserStatus;
}

export class ProfileUpdateService {
  public constructor(
    private readonly users: UserRepository,
    private readonly options: IdentityServiceOptions
  ) {}

  public async update(
    command: UpdateProfileCommand,
    _context: IdentityContext
  ): Promise<ProfileUpdateResult> {
    if (command.userId.length === 0) {
      throw new IdentityValidationError('User ID is required.', { field: 'userId' });
    }

    const user = await this.users.findById(command.userId);
    if (user === null) {
      throw new IdentityValidationError('User not found.', { field: 'userId', reason: 'user_not_found' });
    }

    const previousDisplayName = user.displayName;
    const previousStatus = user.status;

    let displayName = user.displayName;
    if (command.displayName !== undefined) {
      displayName = validateDisplayName(command.displayName);
    }

    let nextStatus = user.status;
    if (command.status !== undefined) {
      assertStatusTransition(user.status, command.status, this.options.allowedTransitions);
      nextStatus = command.status;
    }

    if (displayName === previousDisplayName && nextStatus === previousStatus) {
      return {
        user,
        previousDisplayName,
        previousStatus
      };
    }

    const updatedAt = new Date();
    const updatedUser = await this.users.save({
      ...user,
      displayName,
      status: nextStatus,
      updatedAt
    });

    return {
      user: updatedUser,
      previousDisplayName,
      previousStatus
    };
  }

  // Internal helper for ownership-aware email lookups (e.g., route guards).
  public async findUserById(userId: string): Promise<UserEntity | null> {
    return this.users.findById(userId);
  }

  // Internal helper for email normalization (e.g., before updating email).
  public normalizeEmail(email: string): string {
    return normalizeEmail(email);
  }
}

// Re-export for the standalone status-transition helper used by admin/ops layers.
export { UserStatusTransitionError };
