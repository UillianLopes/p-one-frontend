import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastService } from '@p-one/shared';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of } from 'rxjs';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';

import { UserService } from '../../../services';
import {
  EUserStoreActions,
  loadFailure,
  loadSuccess,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
  signUpSuccess,
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

  public readonly signUpEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EUserStoreActions.SIGN_UP),
      switchMap(({ user }) => {
        return this._userService.create(user).pipe(
          map(() => signUpSuccess()),
          catchError((error) => of(signUpFailure(error)))
        );
      })
    )
  );

  public readonly signUpEffectSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(EUserStoreActions.SIGN_UP_SUCCESS),
        tap(() => {
          this._toastService.open(
            'Usuário criado com sucesso, você sera redirecionado em instantes'
          );
        }),
        delay(3000),
        tap(() => this._oidcService.authorize())
      ),
    { dispatch: false }
  );

  public readonly signUpFailureEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(EUserStoreActions.SIGN_UP_FAILURE),
        tap(() => {
          this._toastService.open(
            'Não foi possivel criar seu usuário, verifique os dados e tente novamente',
            {
              color: 'danger',
            }
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly _oidcService: OidcSecurityService,
    private readonly _userService: UserService,
    private readonly _actions$: Actions<UserStoreActionsUnion>,
    private readonly _toastService: ToastService
  ) {}
}
