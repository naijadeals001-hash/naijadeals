import { randomUUID } from 'node:crypto';
import type { RequestContext, UserStatus } from '@naijadeals/types';
import type { DomainEvent } from './index.js';

export const identityEventNames = {
  userCreated: 'identity.user.created.v1',
  userEmailNormalized: 'identity.user.email.normalized.v1',
  userStatusChanged: 'identity.user.status.changed.v1',
  roleAssigned: 'identity.role.assigned.v1',
  permissionAssigned: 'identity.permission.assigned.v1',
  emailVerificationRequested: 'identity.user.email_verification_requested.v1',
  emailVerified: 'identity.user.email_verified.v1',
  passwordResetRequested: 'identity.user.password_reset_requested.v1',
  passwordResetCompleted: 'identity.user.password_reset_completed.v1',
  sessionRevoked: 'identity.session.revoked.v1'
} as const;

export interface IdentityUserCreatedPayload extends Record<string, unknown> {
  email: string;
  displayName: string;
  status: UserStatus;
}

export interface IdentityUserEmailNormalizedPayload extends Record<string, unknown> {
  originalEmail: string;
  normalizedEmail: string;
}

export interface IdentityUserStatusChangedPayload extends Record<string, unknown> {
  fromStatus: UserStatus;
  toStatus: UserStatus;
}

export interface IdentityRoleAssignedPayload extends Record<string, unknown> {
  roleId: string;
  roleSlug: string;
}

export interface IdentityPermissionAssignedPayload extends Record<string, unknown> {
  permissionId: string;
  permissionCode: string;
  roleId: string;
}

export interface IdentityEmailVerificationRequestedPayload extends Record<string, unknown> {
  userId: string;
  expiresAt: string;
}

export interface IdentityEmailVerifiedPayload extends Record<string, unknown> {
  userId: string;
  verifiedAt: string;
}

export interface IdentityPasswordResetRequestedPayload extends Record<string, unknown> {
  userId: string;
  expiresAt: string;
}

export interface IdentityPasswordResetCompletedPayload extends Record<string, unknown> {
  userId: string;
  passwordVersion: number;
}

export interface IdentitySessionRevokedPayload extends Record<string, unknown> {
  userId: string;
  revokedAt: string;
}

const createIdentityEvent = <TPayload extends Record<string, unknown>>(params: {
  eventName: (typeof identityEventNames)[keyof typeof identityEventNames];
  aggregateId: string;
  payload: TPayload;
  context: RequestContext;
}): DomainEvent<TPayload> => ({
  eventId: randomUUID(),
  eventName: params.eventName,
  aggregateType: 'identity',
  aggregateId: params.aggregateId,
  schemaVersion: 1,
  occurredAt: new Date().toISOString(),
  payload: params.payload,
  context: params.context
});

export const createIdentityUserCreatedEvent = (params: {
  userId: string;
  email: string;
  displayName: string;
  status: UserStatus;
  context: RequestContext;
}): DomainEvent<IdentityUserCreatedPayload> =>
  createIdentityEvent({
    eventName: identityEventNames.userCreated,
    aggregateId: params.userId,
    payload: {
      email: params.email,
      displayName: params.displayName,
      status: params.status
    },
    context: params.context
  });

export const createIdentityUserEmailNormalizedEvent = (params: {
  userId: string;
  originalEmail: string;
  normalizedEmail: string;
  context: RequestContext;
}): DomainEvent<IdentityUserEmailNormalizedPayload> =>
  createIdentityEvent({
    eventName: identityEventNames.userEmailNormalized,
    aggregateId: params.userId,
    payload: {
      originalEmail: params.originalEmail,
      normalizedEmail: params.normalizedEmail
    },
    context: params.context
  });

export const createIdentityUserStatusChangedEvent = (params: {
  userId: string;
  fromStatus: UserStatus;
  toStatus: UserStatus;
  context: RequestContext;
}): DomainEvent<IdentityUserStatusChangedPayload> =>
  createIdentityEvent({
    eventName: identityEventNames.userStatusChanged,
    aggregateId: params.userId,
    payload: {
      fromStatus: params.fromStatus,
      toStatus: params.toStatus
    },
    context: params.context
  });

export const createIdentityRoleAssignedEvent = (params: {
  userId: string;
  roleId: string;
  roleSlug: string;
  context: RequestContext;
}): DomainEvent<IdentityRoleAssignedPayload> =>
  createIdentityEvent({
    eventName: identityEventNames.roleAssigned,
    aggregateId: params.userId,
    payload: {
      roleId: params.roleId,
      roleSlug: params.roleSlug
    },
    context: params.context
  });

export const createIdentityPermissionAssignedEvent = (params: {
  roleId: string;
  permissionId: string;
  permissionCode: string;
  context: RequestContext;
}): DomainEvent<IdentityPermissionAssignedPayload> =>
  createIdentityEvent({
    eventName: identityEventNames.permissionAssigned,
    aggregateId: params.roleId,
    payload: {
      roleId: params.roleId,
      permissionId: params.permissionId,
      permissionCode: params.permissionCode
    },
    context: params.context
  });

export const createIdentityEmailVerificationRequestedEvent = (params: {
  userId: string;
  tokenId: string;
  expiresAt: Date;
  context: RequestContext;
}): DomainEvent<IdentityEmailVerificationRequestedPayload> =>
  createIdentityEvent({
    eventName: identityEventNames.emailVerificationRequested,
    aggregateId: params.tokenId,
    payload: {
      userId: params.userId,
      expiresAt: params.expiresAt.toISOString()
    },
    context: params.context
  });

export const createIdentityEmailVerifiedEvent = (params: {
  userId: string;
  verifiedAt: Date;
  context: RequestContext;
}): DomainEvent<IdentityEmailVerifiedPayload> =>
  createIdentityEvent({
    eventName: identityEventNames.emailVerified,
    aggregateId: params.userId,
    payload: {
      userId: params.userId,
      verifiedAt: params.verifiedAt.toISOString()
    },
    context: params.context
  });

export const createIdentityPasswordResetRequestedEvent = (params: {
  userId: string;
  tokenId: string;
  expiresAt: Date;
  context: RequestContext;
}): DomainEvent<IdentityPasswordResetRequestedPayload> =>
  createIdentityEvent({
    eventName: identityEventNames.passwordResetRequested,
    aggregateId: params.tokenId,
    payload: {
      userId: params.userId,
      expiresAt: params.expiresAt.toISOString()
    },
    context: params.context
  });

export const createIdentityPasswordResetCompletedEvent = (params: {
  userId: string;
  passwordVersion: number;
  context: RequestContext;
}): DomainEvent<IdentityPasswordResetCompletedPayload> =>
  createIdentityEvent({
    eventName: identityEventNames.passwordResetCompleted,
    aggregateId: params.userId,
    payload: {
      userId: params.userId,
      passwordVersion: params.passwordVersion
    },
    context: params.context
  });

export const createIdentitySessionRevokedEvent = (params: {
  sessionId: string;
  userId: string;
  revokedAt: Date;
  context: RequestContext;
}): DomainEvent<IdentitySessionRevokedPayload> =>
  createIdentityEvent({
    eventName: identityEventNames.sessionRevoked,
    aggregateId: params.sessionId,
    payload: {
      userId: params.userId,
      revokedAt: params.revokedAt.toISOString()
    },
    context: params.context
  });
