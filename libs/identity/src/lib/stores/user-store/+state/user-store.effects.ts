import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import {
  EUserStoreActions,
  loadFailure,
  loadSuccess,
  signOutFailure,
  signOutSuccess,
  UserStoreActionsUnion,
} from './user-store.actions';

@Injectable()
export class UserStoreEffects {
  public readonly loadEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EUserStoreActions.LOAD),
      switchMap(() =>
        this._oidcService.checkAuth(window.location.toString()).pipe(
          map(({ userData, isAuthenticated }) => {
            console.log(isAuthenticated);
            if (!isAuthenticated) {
              return loadFailure();
            }

            return loadSuccess({
              user: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
              },
            });
          })
        )
      )
    )
  );

  public readonly signInEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(EUserStoreActions.SIGN_IN),
        tap(() => this._oidcService.authorize())
      ),
    { dispatch: false }
  );

  public readonly signOutEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EUserStoreActions.SIGN_OUT),
      switchMap(() =>
        this._oidcService.logoffAndRevokeTokens().pipe(
          map(() => signOutSuccess()),
          catchError(() => of(signOutFailure()))
        )
      )
    )
  );

  constructor(
    private readonly _oidcService: OidcSecurityService,
    private readonly _actions$: Actions<UserStoreActionsUnion>
  ) {}
}
