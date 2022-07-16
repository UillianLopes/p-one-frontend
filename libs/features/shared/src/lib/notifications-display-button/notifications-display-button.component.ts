import { Component } from '@angular/core';
import { NotificationsStoreFacade } from '@p-one/stores/notifications';

@Component({
  selector: 'p-one-notifications-display-button',
  templateUrl: './notifications-display-button.component.html',
  styleUrls: ['./notifications-display-button.component.scss'],
})
export class NotificationsDisplayButtonComponent {
  public readonly unreadNotifications$ = this._facade.unreadNotifications$;
  public readonly hasUnreadNotifications$ = this._facade.hasUnreadNotifications$;
  public readonly isUnreadNotificationsLoading$ = this._facade.isUnreadNotificationsLoading$;
  public readonly unreadNotificationsCount$ = this._facade.unreadNotificationsCount$;

  constructor(private readonly _facade: NotificationsStoreFacade) { }

  public markAllNotificationsAsRead(): void {
    this._facade.markAllNotificationsAsRead();
  }
}
