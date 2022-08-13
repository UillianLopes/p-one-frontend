import { Component, OnInit } from '@angular/core';
import { trackById } from '@p-one/core';

import { UsersStoreFacade } from './store/users-store.facade';

@Component({
  selector: 'p-one-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public readonly users$ = this._facade.users$;
  public readonly usersAmmount$ = this._facade.usersAmmount$;
  public readonly trackById = trackById;

  constructor(private readonly _facade: UsersStoreFacade) {}

  public ngOnInit(): void {
    this._facade.loadUsers({});
  }

  public openCreateUserDialog(): void {
    this._facade.openCreateUserDialog();
  }
}
