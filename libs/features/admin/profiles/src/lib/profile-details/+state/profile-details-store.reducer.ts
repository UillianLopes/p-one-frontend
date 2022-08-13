import { Action, createReducer, on } from '@ngrx/store';

import * as ProfileDetailsStoreActions from './profile-details-store.actions';

export const PROFILE_DETAILS_STORE_FEATURE_KEY = 'profileDetailsStore';

export interface ProfileDetailsStoreState {
  isLoading: boolean;
  profileId?: string;
  roles: string[];
}

const initialState: ProfileDetailsStoreState = {
  isLoading: false,
  roles: [],
};

const _profileDetailsStoreReducer = createReducer(
  initialState,

  on(ProfileDetailsStoreActions.loadProfileRoles, (state, { profileId }) => ({
    ...state,
    profileId,
    isLoading: true,
  })),
  on(
    ProfileDetailsStoreActions.loadProfileRolesSuccess,
    (state, { applications }) => ({
      ...state,
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
