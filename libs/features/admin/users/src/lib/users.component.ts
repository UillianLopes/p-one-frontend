import { Component, OnInit } from '@angular/core';
import { UserModel } from '@p-one/domain/admin';

import { UsersStoreFacade } from './store/users-store.facade';

@Component({
  selector: 'p-one-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public readonly users$ = this._facade.users$;
  public readonly usersAmmount$ = this._facade.usersAmmount$;
  public readonly trackBy = (index: number, user: UserModel) => user.id;

  constructor(private readonly _facade: UsersStoreFacade) {}

  public ngOnInit(): void {
    this._facade.loadUsers({});
  }

  public openCreateUserDialog(): void {
    this._facade.openCreateUserDialog();
  }
}
