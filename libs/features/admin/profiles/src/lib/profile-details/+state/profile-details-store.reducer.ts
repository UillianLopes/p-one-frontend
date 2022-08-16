import { Action, createReducer, on } from '@ngrx/store';
import { ProfileModel } from '@p-one/domain/admin';
import { ApplicationModel } from 'libs/domain/admin/src/lib/models/application.model';
import * as _ from 'lodash';

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

  on(ProfileDetailsStoreActions.loadProfileAndRoles, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(
    ProfileDetailsStoreActions.loadProfileAndRolesSuccess,
    (state, { applications, profileId, profile }) => ({
      ...state,
      profileId,
      profile,
      applications,
      isLoading: false,
    })
  ),
  on(
    ProfileDetailsStoreActions.loadProfileAndRolesFailure,
    (state, { error }) => ({
      ...state,
      error,
      isLoading: false,
    })
  ),

  on(ProfileDetailsStoreActions.addRole, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(
    ProfileDetailsStoreActions.addRoleSuccess,
    ({ profile, ...state }, { key }) => ({
      ...state,
      profile: profile
        ? { ...profile, roles: _.uniq([...profile.roles, key]) }
        : profile,
      isLoading: false,
    })
  ),
  on(ProfileDetailsStoreActions.addRoleFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(ProfileDetailsStoreActions.removeRole, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(
    ProfileDetailsStoreActions.removeRoleSuccess,
    ({ profile, ...state }, { key }) => ({
      ...state,
      profile: profile
        ? {
            ...profile,
            roles: [...profile.roles.filter((role) => role !== key)],
          }
        : profile,
      isLoading: false,
    })
  ),
  on(ProfileDetailsStoreActions.removeRoleFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }))
);

export function profileDetailsStoreReducer(
  state: ProfileDetailsStoreState | undefined,
  action: Action
) {
  return _profileDetailsStoreReducer(state, action);
}
