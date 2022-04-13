import { Component, OnInit } from '@angular/core';
import { UserStoreFacade } from '@p-one/identity';
import { NotificationsStoreFacade } from '@p-one/notification';

@Component({
  selector: 'p-one-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public readonly user$ = this._userStoreFacade.user$;

  constructor(
    private readonly _userStoreFacade: UserStoreFacade,
    private readonly _notificationsStoreFacade: NotificationsStoreFacade
  ) {}

  ngOnInit(): void {
    this._userStoreFacade.load();
    this._notificationsStoreFacade.startNotificationsHub();
    this._notificationsStoreFacade.loadUnreadNotifications();
  }

  signOut(): void {
    this._userStoreFacade.signOut();
  }
}
