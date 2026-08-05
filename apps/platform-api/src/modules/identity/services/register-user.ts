import { randomUUID } from 'node:crypto';
import { EmailAlreadyExistsError, RoleAssignmentError } from '@naijadeals/errors';
import {
  createIdentityRoleAssignedEvent,
  createIdentityUserCreatedEvent,
  createIdentityUserEmailNormalizedEvent,
  type EventBus
} from '@naijadeals/events';
import type {
  PasswordCredentialRepository,
  RoleRepository,
  UnitOfWork,
  UserRepository,
  UserRoleRepository
} from '@naijadeals/repository';
import type { PasswordCredentialEntity, RequestContext, UserEntity, UserRoleEntity } from '@naijadeals/types';
import { resolveIdentityTelemetry, type IdentityDomainTelemetry } from '../support.js';
import {
  normalizeEmail,
  validateDisplayName,
  validateNonEmptyString,
  validatePasswordPolicy
} from './domain-rules.js';

export interface RegisterUserCommand {
  userId?: string;
  credentialId?: string;
  email: string;
  displayName: string;
  plainPassword: string;
  passwordHash: string;
  initialRoleSlug?: string;
  assignedByUserId?: string | null;
  assignedReason?: string | null;
  requestContext: RequestContext;
  now?: Date;
}

export interface RegisterUserResult {
  user: UserEntity;
  credential: PasswordCredentialEntity;
  assignment?: UserRoleEntity;
}

export interface RegisterUserDependencies {
  users: UserRepository;
  passwordCredentials: PasswordCredentialRepository;
  roles: RoleRepository;
  userRoles: UserRoleRepository;
  unitOfWork: UnitOfWork;
  eventBus: EventBus;
  telemetry?: IdentityDomainTelemetry;
}

export class RegisterUserService {
  public constructor(private readonly dependencies: RegisterUserDependencies) {}

  public async execute(command: RegisterUserCommand): Promise<RegisterUserResult> {
    const telemetry = resolveIdentityTelemetry(this.dependencies.telemetry);
    const now = command.now ?? new Date();
    const normalizedEmail = normalizeEmail(command.email);

    validateNonEmptyString(normalizedEmail, 'Email address');
    const displayName = validateDisplayName(command.displayName);
    validatePasswordPolicy(command.plainPassword, normalizedEmail);
    const passwordHash = validateNonEmptyString(command.passwordHash, 'Password hash');

    const existingUser = await this.dependencies.users.findByEmail(normalizedEmail);
    if (existingUser) {
      await telemetry.auditSink.record({
        category: 'AUTH',
        action: 'identity.user.register',
        status: 'rejected',
        targetType: 'user',
        targetId: existingUser.id,
        reasonCode: 'EMAIL_ALREADY_EXISTS',
        metadata: { email: normalizedEmail },
        requestContext: command.requestContext,
        occurredAt: now
      });
      telemetry.logger.warn(
        {
          email: normalizedEmail,
          requestId: command.requestContext.requestId,
          correlationId: command.requestContext.correlationId,
          reasonCode: 'EMAIL_ALREADY_EXISTS'
        },
        'Identity registration rejected because email already exists'
      );
      throw new EmailAlreadyExistsError(normalizedEmail);
    }

    const role = command.initialRoleSlug
      ? await this.dependencies.roles.findBySlug(command.initialRoleSlug)
      : null;

    if (command.initialRoleSlug && !role) {
      throw new RoleAssignmentError('Initial role does not exist.', {
        roleSlug: command.initialRoleSlug
      });
    }

    const userId = command.userId ?? randomUUID();
    const credentialId = command.credentialId ?? randomUUID();

    const user: UserEntity = {
      id: userId,
      email: normalizedEmail,
      displayName,
      status: 'EMAIL_UNVERIFIED',
      emailVerifiedAt: null,
      lastLoginAt: null,
      createdAt: now,
      updatedAt: now
    };

    const credential: PasswordCredentialEntity = {
      id: credentialId,
      userId,
      passwordHash,
      passwordVersion: 1,
      createdAt: now,
      updatedAt: now
    };

    const assignment: UserRoleEntity | undefined = role
      ? {
          userId,
          roleId: role.id,
          assignedAt: now,
          assignedByUserId: command.assignedByUserId ?? null,
          assignedReason: command.assignedReason ?? 'identity-registration',
          expiresAt: null
        }
      : undefined;

    await this.dependencies.unitOfWork.runInTransaction(async () => {
      await this.dependencies.users.create(user);
      await this.dependencies.passwordCredentials.create(credential);
      if (assignment) {
        const existingAssignment = await this.dependencies.userRoles.findByUserAndRole(userId, assignment.roleId);
        if (existingAssignment) {
          throw new RoleAssignmentError('User already has the assigned role.', {
            userId,
            roleId: assignment.roleId
          });
        }
        await this.dependencies.userRoles.create(assignment);
      }
    });

    if (normalizedEmail !== command.email) {
      await this.dependencies.eventBus.publish(
        createIdentityUserEmailNormalizedEvent({
          userId,
          originalEmail: command.email,
          normalizedEmail,
          context: command.requestContext
        })
      );
    }

    await this.dependencies.eventBus.publish(
      createIdentityUserCreatedEvent({
        userId,
        email: normalizedEmail,
        displayName: user.displayName,
        status: user.status,
        context: command.requestContext
      })
    );

    if (assignment && role) {
      await this.dependencies.eventBus.publish(
        createIdentityRoleAssignedEvent({
          userId,
          roleId: role.id,
          roleSlug: role.slug,
          context: command.requestContext
        })
      );
    }

    await telemetry.auditSink.record({
      category: 'AUTH',
      action: 'identity.user.register',
      actorId: command.requestContext.actorId,
      targetType: 'user',
      targetId: user.id,
      status: 'succeeded',
      metadata: { status: user.status },
      requestContext: command.requestContext,
      occurredAt: now
    });

    if (assignment && role) {
      await telemetry.auditSink.record({
        category: 'RBAC',
        action: 'identity.role.assign',
        actorId: command.assignedByUserId ?? command.requestContext.actorId,
        targetType: 'role',
        targetId: role.id,
        status: 'succeeded',
        metadata: { userId: user.id, roleSlug: role.slug },
        requestContext: command.requestContext,
        occurredAt: now
      });
    }

    telemetry.logger.info(
      {
        userId: user.id,
        email: user.email,
        status: user.status,
        roleId: assignment?.roleId,
        requestId: command.requestContext.requestId,
        correlationId: command.requestContext.correlationId
      },
      'Identity registration completed'
    );

    return { user, credential, assignment };
  }
}
