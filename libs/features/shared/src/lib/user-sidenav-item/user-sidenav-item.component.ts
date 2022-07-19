import { Component } from '@angular/core';
import { AuthenticationStoreFacade } from '@p-one/stores/identity';

@Component({
  selector: 'p-one-user-sidenav-item',
  templateUrl: './user-sidenav-item.component.html',
  styleUrls: ['./user-sidenav-item.component.scss'],
})
export class UserSidenavItemComponent {
  public readonly user$ = this._authenticationStore.user$;

  constructor(private readonly _authenticationStore: AuthenticationStoreFacade) {}
}
