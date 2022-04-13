export interface NotificationModel {
  id: string;
  title: string;
  text: string;
  isRead?: boolean;
  creation: Date;
}
