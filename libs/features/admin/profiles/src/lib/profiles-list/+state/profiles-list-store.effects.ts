import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '@p-one/domain/admin';
import { catchError, map, of, switchMap } from 'rxjs';

import {
  EProfilesListStoreActions,
  loadProfilesFailure,
  loadProfilesSuccess,
  ProfilesListStoreActionsUnion,
} from './profiles-list-store.actions';

@Injectable()
export class ProfilesListStoreEffects {
  public readonly loadProfilesEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EProfilesListStoreActions.LOAD_PROFILES),
      switchMap(() =>
        this._service.getAll().pipe(
          map((profiles) => loadProfilesSuccess({ profiles })),
          catchError((error) => of(loadProfilesFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions<ProfilesListStoreActionsUnion>,
    private readonly _service: ProfileService
  ) {}
}
