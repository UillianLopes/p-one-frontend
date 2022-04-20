import { createAction, props, union } from '@ngrx/store';

import { NotificationModel } from '../../../models';

export enum ENotificationsStoreActions {
  START_NOTIFICATIONS_HUB = '[Notifications] Start Notifications Hub',

  LOAD_UNREAD_NOTIFICATIONS = '[Notifications] Load unread notifications',
  LOAD_UNREAD_NOTIFICATIONS_SUCCESS = '[Notifications] Load unread notifications success',
  LOAD_UNREAD_NOTIFICATIONS_FAILURE = '[Notifications] Load unread notifications failure',

  MARK_NOTIFICATION_AS_READ = '[Notifications] Mark notification as read',
  MARK_NOTIFICATION_AS_READ_SUCCESS = '[Notifications] Mark notification as read success',
  MARK_NOTIFICATION_AS_READ_FAILURE = '[Notifications] Mark notification as read success',

  MARK_ALL_NOTIFICATIONS_AS_READ = '[Notifications] Mark all notifications as read',
  MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS = '[Notifications] Mark all notifications as read success',
  MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE = '[Notifications] Mark all notifications as read failure',

  NEW_NOTIFICATION_ARRIVED = '[Notifications] New notification arrived',

  RESET_STATE = '[Notifications] Reset State',
}

export const loadUnreadNotifications = createAction(
  ENotificationsStoreActions.LOAD_UNREAD_NOTIFICATIONS
);

export const loadUnreadNotificationsSuccess = createAction(
  ENotificationsStoreActions.LOAD_UNREAD_NOTIFICATIONS_SUCCESS,
  props<{ unreadNotifications: NotificationModel[] }>()
);

export const loadUnreadNotificationsFailure = createAction(
  ENotificationsStoreActions.LOAD_UNREAD_NOTIFICATIONS_FAILURE,
  props<{ error: unknown }>()
);

export const newNotificationArrived = createAction(
  ENotificationsStoreActions.NEW_NOTIFICATION_ARRIVED,
  props<{ notification: NotificationModel }>()
);

export const startNotificationsHub = createAction(
  ENotificationsStoreActions.START_NOTIFICATIONS_HUB
);

export const markNotificationAsRead = createAction(
  ENotificationsStoreActions.MARK_NOTIFICATION_AS_READ,
  props<{ notificationId: string }>()
);

export const markNotificationAsReadSuccess = createAction(
  ENotificationsStoreActions.MARK_NOTIFICATION_AS_READ_SUCCESS,
  props<{ notificationId: string }>()
);

export const markNotificationAsReadFailure = createAction(
  ENotificationsStoreActions.MARK_NOTIFICATION_AS_READ_FAILURE,
  props<{ error: unknown }>()
);

export const markAllNotificationsAsRead = createAction(
  ENotificationsStoreActions.MARK_ALL_NOTIFICATIONS_AS_READ
);

export const markAllNotificationsAsReadSuccess = createAction(
  ENotificationsStoreActions.MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS
);

export const markAllNotificationsAsReadFailure = createAction(
  ENotificationsStoreActions.MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE,
  props<{ error: unknown }>()
);

export const resetState = createAction(ENotificationsStoreActions.RESET_STATE);

const _notificationsStoreActionsUnion = union({
  loadUnreadNotifications,
  loadUnreadNotificationsSuccess,
  loadUnreadNotificationsFailure,

  markNotificationAsRead,
  markNotificationAsReadFailure,
  markNotificationAsReadSuccess,

  markAllNotificationsAsRead,
  markAllNotificationsAsReadFailure,
  markAllNotificationsAsReadSuccess,

  newNotificationArrived,

  resetState,
});

export type NotificationsStoreActionsUnion =
  typeof _notificationsStoreActionsUnion;
