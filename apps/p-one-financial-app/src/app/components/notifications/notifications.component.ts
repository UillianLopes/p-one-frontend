import { Component, OnInit } from '@angular/core';
import { NotificationsStoreFacade } from '@p-one/financial';

@Component({
  selector: 'p-one-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  public readonly unreadNotifications$ =
    this._notificationsFacade.unreadNotifications$;

  constructor(
    private readonly _notificationsFacade: NotificationsStoreFacade
  ) {}

  ngOnInit(): void {}
}
