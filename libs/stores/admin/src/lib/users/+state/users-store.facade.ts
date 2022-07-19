import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetAllUsersQuery } from '@p-one/domain/admin';

import { loadUsers } from './users-store.actions';
import { UsersStoreState } from './users-store.reducer';
import * as UsersStoreSelectors from './users-store.selectors';

@Injectable()
export class UsersStoreFacade {
  public readonly users$ = this._store.select(
    UsersStoreSelectors.usersSelector
  );

  public readonly usersAmmount$ = this._store.select(
    UsersStoreSelectors.usersAmmountSelector
  );

  public readonly loading$ = this._store.select(
    UsersStoreSelectors.loadingSelector
  );

  constructor(private readonly _store: Store<UsersStoreState>) {}

  public loadUsers(query: Partial<GetAllUsersQuery>) {
    this._store.dispatch(loadUsers({ query }));
  }
}
