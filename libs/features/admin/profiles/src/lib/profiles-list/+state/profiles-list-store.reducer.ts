import { Action, createReducer, on } from '@ngrx/store';
import { ProfileModel } from '@p-one/domain/admin';

import * as ProfilesListStoreActions from './profiles-list-store.actions';

export const PROFILES_STORE_FEATURE_KEY = 'profilesListStore';

export interface ProfilesListStoreState {
  isLoading: boolean;
  profiles: ProfileModel[];
  error?: unknown;
}

const initialState: ProfilesListStoreState = {
  isLoading: false,
  profiles: [],
};

const _profilesListStoreReducer = createReducer(
  initialState,

  on(ProfilesListStoreActions.loadProfiles, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(ProfilesListStoreActions.loadProfilesSuccess, (state, { profiles }) => ({
    ...state,
    profiles,
    isLoading: false,
  })),
  on(ProfilesListStoreActions.loadProfilesFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(ProfilesListStoreActions.resetState, () => ({ ...initialState }))
);

export function profilesListStoreReducer(
  state: ProfilesListStoreState | undefined,
  action: Action
) {
  return _profilesListStoreReducer(state, action);
}
