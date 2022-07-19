import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { load, signIn, signOut } from './authentication-store.actions';
import { AuthenticationStoreState } from './authentication-store.reducer';
import * as AuthenticationStoreSelectors from './authentication-store.selectors';

@Injectable()
export class AuthenticationStoreFacade {
  public readonly loading$ = this._store.select(
    AuthenticationStoreSelectors.loadingSelector
  );
  public readonly user$ = this._store.select(
    AuthenticationStoreSelectors.userSelector
  );
  public readonly isAuthenticated$ = this._store.select(
    AuthenticationStoreSelectors.isAuthenticatedSelector
  );

  constructor(private readonly _store: Store<AuthenticationStoreState>) {}

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
