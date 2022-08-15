import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '@p-one/domain/admin';
import { catchError, map, of, switchMap } from 'rxjs';

import {
  EProfileDetailsStoreActions,
  loadProfileFailure,
  loadProfileRolesSuccess,
  ProfileDetailsStoreActionsUnion,
} from './profile-details-store.actions';

@Injectable()
export class ProfilesDetailsStoreEffects {
  public readonly loadProfileRolesEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EProfileDetailsStoreActions.LOAD_PROFILE_ROLES),
      switchMap(({ profileId }) =>
        this._service.getRoles(profileId).pipe(
          map((applications) =>
            loadProfileRolesSuccess({ applications, profileId })
          ),
          catchError((error) => of(loadProfileFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions<ProfileDetailsStoreActionsUnion>,
    private readonly _service: ProfileService
  ) {}
}
