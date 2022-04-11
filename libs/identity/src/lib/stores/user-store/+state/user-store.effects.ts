import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { O_AUTH_CONFIG } from '../../../interceptors/oauth.config';
import { UserService } from '../../../services';
import {
  configureSuccess,
  EUserStoreActions,
  loadFailure,
  loadSuccess,
  signIn,
  signUpFailure,
  signUpSuccess,
  UserStoreActionsUnion,
} from './user-store.actions';
import { UserStoreFacade } from './user-store.facade';

@Injectable()
export class UserStoreEffects {
  public readonly loadEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EUserStoreActions.LOAD),
      map(() => this._oidcService.hasValidAccessToken()),
      filter((hasValidAccessToken) => hasValidAccessToken),
      switchMap(() => {
        return from(this._oidcService.loadUserProfile()).pipe(
          map((profile: any) => profile),
          map((profile) => {
            if (profile) {
              const {
                info: { email, name, id },
              } = profile;
              return loadSuccess({
                user: {
                  name,
                  email,
                  id,
                  accessToken: this._oidcService.getAccessToken(),
                  expires: this._oidcService.getIdTokenExpiration(),
                },
              });
            }

            return loadFailure();
          })
        );
      })
    )
  );

  public readonly signInEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(EUserStoreActions.SIGN_IN),
        map(() => this._oidcService.hasValidAccessToken()),
        filter((hasValidAccessToken) => !hasValidAccessToken),
        tap(() => this._oidcService.initLoginFlow())
      ),
    { dispatch: false }
  );

  public readonly configureEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EUserStoreActions.CONFIGURE),
      tap(() => this._oidcService.configure(this._config)),
      switchMap(() =>
        from(this._oidcService.loadDiscoveryDocumentAndTryLogin()).pipe(
          map(() => configureSuccess())
        )
      )
    )
  );

  public readonly signOutEffect$ = createEffect(
    () =>
      this._actions$
        .pipe(ofType(EUserStoreActions.SIGN_OUT))
        .pipe(tap(() => this._oidcService.revokeTokenAndLogout())),
    { dispatch: false }
  );

  public readonly signUpEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EUserStoreActions.SIGN_UP),
      switchMap((action) =>
        this._userService.create(action.user).pipe(
          map(() => signUpSuccess()),
          catchError((error) => of(signUpFailure({ error })))
        )
      )
    )
  );

  public readonly signUpSuccessEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EUserStoreActions.SIGN_UP_SUCCESS),
      map(() => signIn())
    )
  );

  constructor(
    private readonly _actions$: Actions<UserStoreActionsUnion>,
    private readonly _oidcService: OAuthService,
    private readonly _router: Router,
    private readonly _userService: UserService,
    private readonly _userStoreFacade: UserStoreFacade,
    @Inject(O_AUTH_CONFIG) private readonly _config: AuthConfig
  ) {}
}
