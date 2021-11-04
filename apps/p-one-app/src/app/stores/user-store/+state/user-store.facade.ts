import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { load, signIn } from './user-store.actions';
import { UserStoreState } from './user-store.reducer';
import * as UserStoreSelectors from './user-store.selectors';

@Injectable()
export class UserStoreFacade {
  loading$ = this._store.select(UserStoreSelectors.loadingSelector);
  user$ = this._store.select(UserStoreSelectors.userSelector);
  isAuthenticated$ = this._store.select(
    UserStoreSelectors.isAuthenticatedSelector
  );
  accessToken$ = this._store.select(UserStoreSelectors.accessTokenSelector);

  constructor(private readonly _store: Store<UserStoreState>) {}

  signIn() {
    this._store.dispatch(signIn());
  }

  load() {
    this._store.dispatch(load());
  }
}
