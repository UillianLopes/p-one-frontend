import { Component, OnInit } from '@angular/core';
import { UsersStoreFacade } from '@p-one/stores/admin/users';

@Component({
  selector: 'p-one-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public readonly users$ = this._facade.users$;
  public readonly usersAmmount$ = this._facade.usersAmmount$;

  constructor(private readonly _facade: UsersStoreFacade) {}

  public ngOnInit(): void {
    this._facade.loadUsers({});
  }
}
