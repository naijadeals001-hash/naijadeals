import { UserStatusTransitionError } from '@naijadeals/errors';
import type { UserStatus } from '@naijadeals/types';

export const assertStatusTransition = (
  fromStatus: UserStatus,
  toStatus: UserStatus,
  allowedTransitions: Readonly<Record<string, readonly UserStatus[]>>
): void => {
  if (fromStatus === toStatus) {
    return;
  }
  const allowed = allowedTransitions[fromStatus] ?? [];
  if (!allowed.includes(toStatus)) {
    throw new UserStatusTransitionError(fromStatus, toStatus);
  }
};

export const isActiveForAuthentication = (status: UserStatus): boolean => {
  return status === 'ACTIVE' || status === 'EMAIL_UNVERIFIED';
};

export const assertCanAuthenticate = (status: UserStatus, _userId: string): void => {
  if (status === 'BANNED' || status === 'SUSPENDED' || status === 'ARCHIVED') {
    throw new UserStatusTransitionError(status, 'ACTIVE');
  }
  if (status === 'LOCKED') {
    throw new UserStatusTransitionError(status, 'ACTIVE');
  }
  if (status === 'PENDING') {
    throw new UserStatusTransitionError(status, 'ACTIVE');
  }
};
