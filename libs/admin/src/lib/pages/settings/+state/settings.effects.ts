import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { UserService } from '../../../services';
import {
  ESettingsActions,
  loadUserSettingsFailure,
  loadUserSettingsSuccess,
  SettingsActionsUnion,
  updateUserSettingsFailure,
  updateUserSettingsSuccess,
} from './settings.actions';

@Injectable()
export class SettingsEffects {
  public readonly loadUserSettingsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESettingsActions.LOAD_USER_SETTINGS),
      switchMap(() =>
        this._userService.settings().pipe(
          map((settings) => loadUserSettingsSuccess({ settings })),
          catchError((error) => of(loadUserSettingsFailure({ error })))
        )
      )
    )
  );

  public readonly updateUserSettingsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESettingsActions.UPDATE_USER_SETTINGS),
      switchMap(({ settings }) =>
        this._userService.updateSettings(settings).pipe(
          map(() => updateUserSettingsSuccess()),
          catchError((error) => of(updateUserSettingsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions<SettingsActionsUnion>,
    private readonly _userService: UserService
  ) {}
}
