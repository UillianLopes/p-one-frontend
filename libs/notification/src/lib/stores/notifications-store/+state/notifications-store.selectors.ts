import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BaseSignalRStoreState } from 'ngrx-signalr-core';

import { NOTIFICATIONS_STORE_FEATURE_KEY, NotificationsStoreState } from './notifications-store.reducer';

const notificationsStoreSelector =
  createFeatureSelector<{ notifications: NotificationsStoreState, signalr: BaseSignalRStoreState}>(
    NOTIFICATIONS_STORE_FEATURE_KEY
  );

const notificationsStateSelecor = createSelector(
    notificationsStoreSelector,
    ({ notifications }) => notifications
)

export const isUnreadNotificationsLoadingSelector = createSelector(
    notificationsStateSelecor,
  ({ isUnreadNotificationsLoading }) => isUnreadNotificationsLoading
);

export const unreadNotificationsSelector = createSelector(
    notificationsStateSelecor,
  ({ unreadNotifications }) => unreadNotifications
);
