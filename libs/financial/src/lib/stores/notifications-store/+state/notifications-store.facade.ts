import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { NotificationsService } from '../../../services';
import { loadUnreadNotifications, startNotificationsHub } from './notifications-store.actions';
import { NotificationsStoreState } from './notifications-store.reducer';
import * as NotificationsStoreSelectors from './notifications-store.selectors';

@Injectable()
export class NotificationsStoreFacade {
  public readonly unreadNotifications$ = this._store.select(
    NotificationsStoreSelectors.unreadNotificationsSelector
  );

  public readonly isUnreadNotificationsLoading$ = this._store.select(
    NotificationsStoreSelectors.isUnreadNotificationsLoadingSelector
  );

  constructor(
    private readonly _store: Store<NotificationsStoreState>,
    private readonly _service: NotificationsService
  ) {}

  public loadUnreadNotifications(): void {
    this._store.dispatch(loadUnreadNotifications());
  }

  public startNotificationsHub(): void {
    this._store.dispatch(startNotificationsHub());
  }
}
