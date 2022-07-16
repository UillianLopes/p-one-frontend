import { Component } from '@angular/core';
import { UsersStoreFacade } from '@p-one/stores/users';

@Component({
  selector: 'p-one-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public readonly user$ = this._usersStoreFacade.user$;

  constructor(
    private readonly _usersStoreFacade: UsersStoreFacade
  ) { }

  public signOut(): void {
    this._usersStoreFacade.signOut();
  }
}
