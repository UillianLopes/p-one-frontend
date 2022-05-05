import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { CreateUserRequest } from '../../../models';
import * as SignUpActions from './sign-up-store.actions';
import { SignUpState } from './sign-up-store.reducer';
import * as SignUpSelectors from './sign-up-store.selectors';

@Injectable()
export class SignUpFacade {
  public readonly isSignUpLoading$ = this._store.select(
    SignUpSelectors.isSignUpLoadingSelector
  );

  constructor(private readonly _store: Store<SignUpState>) {}

  public signUp(user: CreateUserRequest) {
    this._store.dispatch(SignUpActions.signUp({ user }));
  }
}
