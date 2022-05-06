import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserStoreFacade } from '@p-one/identity';
import { of } from 'rxjs';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';

import { UserService } from '../../../services';
import { ESignUpActions, signUpFailure, signUpSuccess, UserStoreActionsUnion } from './sign-up-store.actions';

@Injectable()
export class SignUpEffects {
  public readonly signUpEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESignUpActions.SIGN_UP),
      switchMap(({ user }) =>
        this._userService.create(user).pipe(
          map(() => signUpSuccess()),
          catchError((error) => of(signUpFailure({ error })))
        )
      )
    )
  );

  public readonly signUpSuccessEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(ESignUpActions.SIGN_UP_SUCCESS),
        delay(1000),
        tap(() => this._userStoreFacade.signIn())
      ),
    { dispatch: false }
  );

  constructor(
    private readonly _actions$: Actions<UserStoreActionsUnion>,
    private readonly _userService: UserService,
    private readonly _userStoreFacade: UserStoreFacade
  ) {}
}
