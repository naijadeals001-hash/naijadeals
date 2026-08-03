import type { PlatformRole } from '@naijadeals/types';

export type NotificationPriority = 'p0' | 'p1' | 'p2' | 'p3';
export type NotificationChannel = 'in_app' | 'email' | 'sms' | 'push';

export interface NotificationCommand {
  template: string;
  channels: NotificationChannel[];
  priority: NotificationPriority;
  actorRole?: PlatformRole;
  locale?: string;
  audienceId: string;
  payload: Record<string, unknown>;
}

export interface NotificationService {
  dispatch(command: NotificationCommand): Promise<void>;
}
