import { Component } from '@angular/core';

import { NotificationsStoreFacade } from '../../stores';

@Component({
  selector: 'p-one-notifications-display-button',
  templateUrl: './notifications-display-button.component.html',
  styleUrls: ['./notifications-display-button.component.scss'],
})
export class NotificationsDisplayButtonComponent {
  public readonly unreadNotifications$ = this._facade.unreadNotifications$;
  public readonly hasUnreadNotifications$ = this._facade.hasUnreadNotifications$;
  public readonly isUnreadNotificationsLoading$ = this._facade.isUnreadNotificationsLoading$;

  constructor(private readonly _facade: NotificationsStoreFacade) {}

  public markAllNotificationsAsRead(): void {
    this._facade.markAllNotificationsAsRead();
  }
}
