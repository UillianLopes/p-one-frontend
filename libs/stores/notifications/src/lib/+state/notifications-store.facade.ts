import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  loadUnreadNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  startNotificationsHub,
} from './notifications-store.actions';
import { NotificationsStoreRootState as NotificationsStoreRootState } from './notifications-store.reducer';
import * as DomainNotificationsStoreSelectors from './notifications-store.selectors';

@Injectable()
export class NotificationsStoreFacade {
  public readonly unreadNotifications$ = this._store.select(
    DomainNotificationsStoreSelectors.unreadNotificationsSelector
  );
  public readonly unreadNotificationsCount$ = this._store.select(
    DomainNotificationsStoreSelectors.unreadNotificationsCountSelector
  );

  public readonly hasUnreadNotifications$ = this._store.select(
    DomainNotificationsStoreSelectors.hasUnreadNotificationsSelector
  );

  public readonly isUnreadNotificationsLoading$ = this._store.select(
    DomainNotificationsStoreSelectors.isUnreadNotificationsLoadingSelector
  );

  constructor(
    private readonly _store: Store<NotificationsStoreRootState>
  ) {}

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
