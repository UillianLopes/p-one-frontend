import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '@p-one/domain/admin';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';

import {
  addRoleFailure,
  addRoleSuccess,
  EProfileDetailsStoreActions,
  loadProfileAndRolesFailure,
  loadProfileAndRolesSuccess,
  ProfileDetailsStoreActionsUnion,
  removeRoleFailure,
  removeRoleSuccess,
} from './profile-details-store.actions';
import { ProfileDetailsStoreFacade } from './profile-details-store.facade';

@Injectable()
export class ProfilesDetailsStoreEffects {
  public readonly loadProfileRolesEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EProfileDetailsStoreActions.LOAD_PROFILE_AND_ROLES),
      switchMap(({ profileId }) =>
        this._service.get(profileId).pipe(
          switchMap((profile) =>
            this._service.getApplicationsAndRoles(profileId).pipe(
              map((applications) =>
                loadProfileAndRolesSuccess({ applications, profileId, profile })
              ),
              catchError((error) => of(loadProfileAndRolesFailure({ error })))
            )
          )
        )
      )
    )
  );

  public readonly addRoleEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EProfileDetailsStoreActions.ADD_ROLE),
      withLatestFrom(this._facade.profile$),
      switchMap(([{ key }, profile]) =>
        profile
          ? this._service
              .addRole(profile.id, key)
              .pipe(map(() => addRoleSuccess({ key })))
          : of(addRoleFailure({ error: 'Invalid profile' }))
      )
    )
  );

  public readonly removeRoleEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EProfileDetailsStoreActions.REMOVE_ROLE),
      withLatestFrom(this._facade.profile$),
      switchMap(([{ key }, profile]) =>
        profile
          ? this._service
              .removeRole(profile.id, key)
              .pipe(map(() => removeRoleSuccess({ key })))
          : of(removeRoleFailure({ error: 'Invalid profile' }))
      )
    )
  );

  constructor(
    private readonly _actions$: Actions<ProfileDetailsStoreActionsUnion>,
    private readonly _service: ProfileService,
    private readonly _facade: ProfileDetailsStoreFacade
  ) {}
}
