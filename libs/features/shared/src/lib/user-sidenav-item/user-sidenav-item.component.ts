import { Component } from '@angular/core';

import { UsersStoreFacade } from '@p-one/stores/users';

@Component({
  selector: 'p-one-user-sidenav-item',
  templateUrl: './user-sidenav-item.component.html',
  styleUrls: ['./user-sidenav-item.component.scss'],
})
export class UserSidenavItemComponent {

  public readonly user$ = this._userStore.user$;

  constructor(private readonly _userStore: UsersStoreFacade) { }
}

