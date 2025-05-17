export type NotificationType = 
  | 'system_alert'
  | 'documentation_alert'
  | 'risk_alert'
  | 'consent_alert'
  | 'provider_alert';

export type NotificationSeverity = 'low' | 'medium' | 'high';

export interface Notification {
  type: NotificationType;
  message: string;
  severity: NotificationSeverity;
  timestamp?: Date;
  metadata?: Record<string, unknown>;
} 