import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, switchMap, tap } from 'rxjs/operators';

import {
  AuthenticationStoreActionsUnion,
  EAuthenticationStoreActions,
  loadFailure,
  loadSuccess,
  signIn,
} from './authentication-store.actions';

@Injectable()
export class AuthenticationStoreEffects {
  public readonly loadEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EAuthenticationStoreActions.LOAD),
      switchMap(() =>
        this._oidcService.checkAuth(window.location.toString()).pipe(
          map(({ userData, isAuthenticated }) => {
            if (userData && !isAuthenticated) {
              return signIn();
            }

            if (!isAuthenticated) {
              return loadFailure();
            }

            return loadSuccess({
              user: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                roles: userData.role ?? [],
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

  public readonly signOutEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(EAuthenticationStoreActions.SIGN_OUT),
        tap(() => this._oidcService.logoff())
      ),
    { dispatch: false }
  );

  constructor(
    private readonly _oidcService: OidcSecurityService,
    private readonly _actions$: Actions<AuthenticationStoreActionsUnion>
  ) {}
}
