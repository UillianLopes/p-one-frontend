import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  NOTIFICATIONS_STORE_FEATURE_KEY,
  NotificationsStoreRootState as NotificationsStoreRootState,
} from './notifications-store.reducer';

const notificationsStoreSelector =
  createFeatureSelector<NotificationsStoreRootState>(
    NOTIFICATIONS_STORE_FEATURE_KEY
  );

const notificationsStateSelecor = createSelector(
  notificationsStoreSelector,
  ({ notifications }) => notifications
);

export const isUnreadNotificationsLoadingSelector = createSelector(
  notificationsStateSelecor,
  ({ isUnreadNotificationsLoading }) => isUnreadNotificationsLoading
);

export const unreadNotificationsSelector = createSelector(
  notificationsStateSelecor,
  ({ unreadNotifications }) => unreadNotifications
);

export const unreadNotificationsCountSelector = createSelector(
  unreadNotificationsSelector,
  (unreadNotifications) => unreadNotifications.length
);

export const hasUnreadNotificationsSelector = createSelector(
  unreadNotificationsCountSelector,
  (unreadNotificationsCount) => unreadNotificationsCount > 0
);
