import { Action, createReducer, on } from '@ngrx/store';
import { NotificationModel } from '@p-one/core';

import * as NotificationsActions from './notifications-store.actions';

export const NOTIFICATIONS_STORE_FEATURE_KEY = 'NOTIFICATIONS_STORE';
export interface NotificationsStoreState {
  unreadNotifications: NotificationModel[];
  isUnreadNotificationsLoading?: boolean;
  error?: any;
  isHubConnectionEstablished?: boolean;
}

export const initialState: NotificationsStoreState = {
  unreadNotifications: [],
};

const _notificationsStoreReducer = createReducer(
  initialState,

  on(
    NotificationsActions.newNotificationArrived,
    ({ unreadNotifications, ...state }, { notification }) => {
      return {
        ...state,
        unreadNotifications: [...unreadNotifications, notification],
      };
    }
  ),

  on(NotificationsActions.loadUnreadNotifications, (state) => {
    return {
      ...state,
      isUnreadNotificationsLoading: true,
    };
  }),
  on(
    NotificationsActions.loadUnreadNotificationsSuccess,
    (state, { unreadNotifications }) => {
      return {
        ...state,
        unreadNotifications,
        isUnreadNotificationsLoading: false,
      };
    }
  ),
  on(
    NotificationsActions.loadUnreadNotificationsFailure,
    (state, { error }) => {
      return {
        ...state,
        error,
      };
    }
  )
);

export function notificationsStoreReducer(
  state: NotificationsStoreState | undefined,
  action: Action
): NotificationsStoreState {
  return _notificationsStoreReducer(state, action);
}
