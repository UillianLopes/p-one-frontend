import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { signIn } from './+state/user-store.actions';
import { UserStoreState } from './+state/user-store.reducer';
import * as UserStoreSelectors from './+state/user-store.selectors';

@Injectable()
export class UserStoreService {
  loading$ = this._store.select(UserStoreSelectors.loadingSelector);
  user$ = this._store.select(UserStoreSelectors.userSelector);

  constructor(private readonly _store: Store<UserStoreState>) {}

  authorize() {
    this._store.dispatch(signIn());
  }
}
