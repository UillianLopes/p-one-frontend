import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { UserService } from '../../../services';
import {
  ESettingsActions,
  loadUserSettingsFailure,
  loadUserSettingsSuccess,
  SettingsActionsUnion,
  updateUserSettings,
  updateUserSettingsFailure,
  updateUserSettingsSuccess,
} from './settings.actions';
import { SettingsFacade } from './settings.facade';

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

  public readonly manageUpdateUserSettingsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESettingsActions.MANAGE_UPDATE_USER_SETTINGS),
      withLatestFrom(this._settingsFacade.settings$),
      filter(
        ([{ settings }, currentSettings]) =>
          !_.isEqual(settings, currentSettings)
      ),
      map(([{ settings }]) => updateUserSettings({ settings }))
    )
  );

  public readonly updateUserSettingsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESettingsActions.UPDATE_USER_SETTINGS),
      switchMap(({ settings }) =>
        this._userService.updateSettings(settings).pipe(
          map(() => updateUserSettingsSuccess({ settings })),
          catchError((error) => of(updateUserSettingsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions<SettingsActionsUnion>,
    private readonly _userService: UserService,
    private readonly _settingsFacade: SettingsFacade
  ) {}
}
