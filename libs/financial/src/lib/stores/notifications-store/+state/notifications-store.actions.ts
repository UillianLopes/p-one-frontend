import { createAction, props, union } from '@ngrx/store';
import { NotificationModel } from '@p-one/core';

export enum ENotificationsStoreActions {
  START_NOTIFICATIONS_HUB = '[Notifications] Start Notifications Hub',

  LOAD_UNREAD_NOTIFICATIONS = '[Notifications] Load unread notifications',
  LOAD_UNREAD_NOTIFICATIONS_SUCCESS = '[Notifications] Load unread notifications success',
  LOAD_UNREAD_NOTIFICATIONS_FAILURE = '[Notifications] Load unread notifications failure',

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
  props<{ error: any }>()
);

export const newNotificationArrived = createAction(
  ENotificationsStoreActions.NEW_NOTIFICATION_ARRIVED,
  props<{ notification: NotificationModel }>()
);

export const startNotificationsHub = createAction(
  ENotificationsStoreActions.START_NOTIFICATIONS_HUB
);

export const resetState = createAction(ENotificationsStoreActions.RESET_STATE);

const _notificationsStoreActionsUnion = union({
  loadUnreadNotifications,
  loadUnreadNotificationsSuccess,
  loadUnreadNotificationsFailure,

  newNotificationArrived,

  resetState,
});

export type NotificationsStoreActionsUnion =
  typeof _notificationsStoreActionsUnion;
