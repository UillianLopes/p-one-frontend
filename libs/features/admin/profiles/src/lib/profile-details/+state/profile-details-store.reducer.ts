import { Action, createReducer, on } from '@ngrx/store';
import { ProfileModel } from '@p-one/domain/admin';
import { ApplicationModel } from 'libs/domain/admin/src/lib/models/application.model';

import * as ProfileDetailsStoreActions from './profile-details-store.actions';

export const PROFILE_DETAILS_STORE_FEATURE_KEY = 'profileDetailsStore';

export interface ProfileDetailsStoreState {
  isLoading: boolean;

  profileId?: string;

  applications: ApplicationModel[];
  isApplicationsLoading: boolean;

  profile?: ProfileModel;
}

const initialState: ProfileDetailsStoreState = {
  isLoading: false,
  isApplicationsLoading: false,
  applications: [],
};

const _profileDetailsStoreReducer = createReducer(
  initialState,

  on(ProfileDetailsStoreActions.loadProfileRoles, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(
    ProfileDetailsStoreActions.loadProfileRolesSuccess,
    (state, { applications, profileId }) => ({
      ...state,
      profileId,
      applications,
      isLoading: false,
    })
  ),
  on(
    ProfileDetailsStoreActions.loadProfileRolesFailure,
    (state, { error }) => ({
      ...state,
      error,
      isLoading: false,
    })
  )
);

export function profileDetailsStoreReducer(
  state: ProfileDetailsStoreState | undefined,
  action: Action
) {
  return _profileDetailsStoreReducer(state, action);
}
