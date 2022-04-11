import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { CreateUserRequest } from '../../../models/requests/create-user.request';
import { configure, load, signIn, signOut, signUp } from './user-store.actions';
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
  public readonly accessToken$ = this._store.select(
    UserStoreSelectors.accessTokenSelector
  );

  constructor(private readonly _store: Store<UserStoreState>) {}

  public signUp(user: CreateUserRequest) {
    this._store.dispatch(signUp({ user }));
  }

  public signIn() {
    this._store.dispatch(signIn());
  }

  public signOut() {
    this._store.dispatch(signOut());
  }

  public load() {
    this._store.dispatch(load());
  }

  public configure() {
    this._store.dispatch(configure());
  }
}
