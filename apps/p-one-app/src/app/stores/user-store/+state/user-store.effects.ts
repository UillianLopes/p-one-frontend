import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { UserStoreService } from '../user-store.service';
import { EUserStoreActions, signIn, signInFailure, signInSuccess, UserStoreActionsUnion } from './user-store.actions';

@Injectable()
export class UserStoreEffects {
  readonly signInEffect$ = createEffect(() =>
    this._actions$.pipe(ofType(EUserStoreActions.SIGN_IN)).pipe(
      switchMap(() => {
        return this._oidcService.checkAuth().pipe(
          switchMap(({ isAuthenticated, userData }) => {
            if (isAuthenticated) {
              return from(this._router.navigate(['/'])).pipe(
                map(() => {
                  return signInSuccess({
                    user: userData,
                  });
                })
              );
            }

            return this._oidcService.authorizeWithPopUp().pipe(
              map(({ isAuthenticated, userData }) => {
                if (isAuthenticated) {
                  return signInSuccess({ user: userData });
                }

                return signIn();
              }),
              catchError(() => of(signInFailure()))
            );
          })
        );
      })
    )
  );

  constructor(
    private readonly _actions$: Actions<UserStoreActionsUnion>,
    private readonly _userStoreService: UserStoreService,
    private readonly _oidcService: OidcSecurityService,
    private readonly _router: Router
  ) {}
}
