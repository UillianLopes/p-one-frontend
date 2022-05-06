import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { UserService } from '../../../services';
import {
  ESettingsStoreActions,
  loadUserSettingsFailure,
  loadUserSettingsSuccess,
  SettingsStoreActionsUnion,
  updateUserSettings,
  updateUserSettingsFailure,
  updateUserSettingsSuccess,
} from './settings-store.actions';
import { SettingsStoreFacade } from './settings-store.facade';

@Injectable()
export class SettingsStoreEffects {
  public readonly loadUserSettingsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESettingsStoreActions.LOAD_USER_SETTINGS),
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
      ofType(ESettingsStoreActions.MANAGE_UPDATE_USER_SETTINGS),
      withLatestFrom(this._settingsStoreFacade.settings$),
      filter(
        ([{ settings }, currentSettings]) =>
          !_.isEqual(settings, currentSettings)
      ),
      map(([{ settings }]) => updateUserSettings({ settings }))
    )
  );

  public readonly updateUserSettingsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESettingsStoreActions.UPDATE_USER_SETTINGS),
      switchMap(({ settings }) =>
        this._userService.updateSettings(settings).pipe(
          map(() => updateUserSettingsSuccess({ settings })),
          catchError((error) => of(updateUserSettingsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions<SettingsStoreActionsUnion>,
    private readonly _userService: UserService,
    private readonly _settingsStoreFacade: SettingsStoreFacade
  ) {}
}
