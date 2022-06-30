import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { load, signIn, signOut } from './user-store.actions';
import { UserStoreState } from './user-store.reducer';
import * as UserStoreSelectors from './user-store.selectors';

@Injectable()
export class UserStoreFacade {
  public readonly loading$ = this._store.select(
    UserStoreSelectors.loadingSelector
  );
  public readonly user$ = this._store.select(UserStoreSelectors.userSelector);
  public readonly isAuthenticated$ = this._store.select(
    UserStoreSelectors.isAuthenticatedSelector
  );

  constructor(private readonly _store: Store<UserStoreState>) {}

  public signIn() {
    this._store.dispatch(signIn());
  }

  public signOut() {
    this._store.dispatch(signOut());
  }

  public load() {
    this._store.dispatch(load());
  }
}
