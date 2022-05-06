import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  loadUnreadNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  startNotificationsHub,
} from './notifications-store.actions';
import { NotificationsStoreRootState } from './notifications-store.reducer';
import * as NotificationsStoreSelectors from './notifications-store.selectors';

@Injectable()
export class NotificationsStoreFacade {
  public readonly unreadNotifications$ = this._store.select(
    NotificationsStoreSelectors.unreadNotificationsSelector
  );
  public readonly unreadNotificationsCount$ = this._store.select(
    NotificationsStoreSelectors.unreadNotificationsCountSelector
  );

  public readonly hasUnreadNotifications$ = this._store.select(
    NotificationsStoreSelectors.hasUnreadNotificationsSelector
  );

  public readonly isUnreadNotificationsLoading$ = this._store.select(
    NotificationsStoreSelectors.isUnreadNotificationsLoadingSelector
  );

  constructor(private readonly _store: Store<NotificationsStoreRootState>) {}

  public loadUnreadNotifications(): void {
    this._store.dispatch(loadUnreadNotifications());
  }

  public startNotificationsHub(): void {
    this._store.dispatch(startNotificationsHub());
  }

  public markNotificationAsRead(notificationId: string): void {
    this._store.dispatch(markNotificationAsRead({ notificationId }));
  }

  public markAllNotificationsAsRead(): void {
    this._store.dispatch(markAllNotificationsAsRead());
  }
}
