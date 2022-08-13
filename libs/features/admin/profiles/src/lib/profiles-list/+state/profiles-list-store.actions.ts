import { createAction, props, union } from '@ngrx/store';
import { ProfileModel } from '@p-one/domain/admin';

export enum EProfilesListStoreActions {
  LOAD_PROFILES = '[Profiles List Store] Load Profiles',
  LOAD_PROFILES_SUCCESS = '[Profiles List Store] Load Profiles Success',
  LOAD_PROFILES_FAILURE = '[Profiles List Store] Load Profiles Failure',

  DELETE_PROFILE = '[Profiles List Store] Delete Profile',
  DELETE_PROFILE_SUCCESS = '[Profiles List Store] Delete Profile Success',
  DELETE_PROFILE_FAILURE = '[Profiles List Store] Delete Profile Failure',

  RESET_STATE = '[Profiles List Store] Reset State',
}

export const loadProfiles = createAction(
  EProfilesListStoreActions.LOAD_PROFILES
);

export const loadProfilesSuccess = createAction(
  EProfilesListStoreActions.LOAD_PROFILES_SUCCESS,
  props<{ profiles: ProfileModel[] }>()
);

export const loadProfilesFailure = createAction(
  EProfilesListStoreActions.LOAD_PROFILES_FAILURE,
  props<{ error: unknown }>()
);

export const resetState = createAction(EProfilesListStoreActions.RESET_STATE);

const _profilesListStoreActionsUnion = union({
  loadProfiles,
  loadProfilesSuccess,
  loadProfilesFailure,

  resetState,
});

export type ProfilesListStoreActionsUnion = typeof _profilesListStoreActionsUnion;
