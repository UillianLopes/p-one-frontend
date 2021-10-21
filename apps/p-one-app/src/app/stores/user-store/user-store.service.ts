import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { load, signIn } from './+state/user-store.actions';
import { UserStoreState } from './+state/user-store.reducer';
import * as UserStoreSelectors from './+state/user-store.selectors';

@Injectable()
export class UserStoreService {
  loading$ = this._store.select(UserStoreSelectors.loadingSelector);
  user$ = this._store.select(UserStoreSelectors.userSelector);
  isAuthenticated$ = this._store.select(
    UserStoreSelectors.isAuthenticatedSelector
  );

  constructor(private readonly _store: Store<UserStoreState>) {}

  signIn() {
    this._store.dispatch(signIn());
  }

  load() {
    this._store.dispatch(load());
  }
}
