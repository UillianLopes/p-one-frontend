import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  EUserStoreActions,
  loadFailure,
  loadSuccess,
  signInFailure,
  signInSuccess,
  UserStoreActionsUnion,
} from './user-store.actions';

@Injectable()
export class UserStoreEffects {
  readonly loadEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EUserStoreActions.LOAD),
      switchMap((_) => {
        return this._oidcService.checkAuth().pipe(
          map(({ isAuthenticated, userData, accessToken }) => {
            if (isAuthenticated && userData) {
              return loadSuccess({ user: userData, accessToken });
            }
            return loadFailure();
          })
        );
      })
    )
  );

  readonly signInEffect$ = createEffect(() =>
    this._actions$.pipe(ofType(EUserStoreActions.SIGN_IN)).pipe(
      switchMap(() => {
        return this._oidcService.checkAuth().pipe(
          switchMap(({ isAuthenticated, userData: user, accessToken }) => {
            if (isAuthenticated) {
              return from(this._router.navigate(['/'])).pipe(
                map(() => {
                  return signInSuccess({
                    user,
                    accessToken
                  });
                })
              );
            }
         
            this._oidcService.authorize();
            return of(signInFailure());
          })
        );
      })
    )
  );

  constructor(
    private readonly _actions$: Actions<UserStoreActionsUnion>,
    private readonly _oidcService: OidcSecurityService,
    private readonly _router: Router
  ) {}
}
