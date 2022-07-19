import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import {
  AuthenticationStoreActionsUnion,
  EAuthenticationStoreActions,
  loadFailure,
  loadSuccess,
  signOutFailure,
  signOutSuccess,
} from './authentication-store.actions';

@Injectable()
export class AuthenticationStoreEffects {
  public readonly loadEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EAuthenticationStoreActions.LOAD),
      switchMap(() =>
        this._oidcService.checkAuth(window.location.toString()).pipe(
          map(({ userData, isAuthenticated }) => {
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
        ofType(EAuthenticationStoreActions.SIGN_IN),
        tap(() => this._oidcService.authorize())
      ),
    { dispatch: false }
  );

  public readonly signOutEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EAuthenticationStoreActions.SIGN_OUT),
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
    private readonly _actions$: Actions<AuthenticationStoreActionsUnion>
  ) {}
}
