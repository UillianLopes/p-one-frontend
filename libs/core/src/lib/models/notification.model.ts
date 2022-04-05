import { ENotificationType } from '../enums';

export interface NotificationModel {
  id: string;
  title: string;
  text: string;
  type: ENotificationType;
  date: Date;
  isRead: boolean;
}
