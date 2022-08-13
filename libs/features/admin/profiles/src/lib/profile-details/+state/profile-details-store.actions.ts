import { createAction, props, union } from '@ngrx/store';
import { ProfileModel } from '@p-one/domain/admin';
import { ApplicationModel } from 'libs/domain/admin/src/lib/models/application.model';

export enum EProfileDetailsStoreActions {
  LOAD_PROFILE = '[Profile Details Store] Load Profile',
  LOAD_PROFILE_SUCCESS = '[Profile Details Store] Load Profile Success',
  LOAD_PROFILE_FAILURE = '[Profile Details Store] Load Profile Failure',

  LOAD_PROFILE_ROLES = '[Profile Details Store] Load Profile Roles',
  LOAD_PROFILE_ROLES_SUCCESS = '[Profile Details Store] Load Profile Roles Success',
  LOAD_PROFILE_ROLES_FAILURE = '[Profile Details Store] Load Profile Roles Failure',

  RESED_STATE = '[ProfileDetails] Reset State',
}

export const loadProfile = createAction(
  EProfileDetailsStoreActions.LOAD_PROFILE,
  props<{ profileId: string }>()
);

export const loadProfileSuccess = createAction(
  EProfileDetailsStoreActions.LOAD_PROFILE_SUCCESS,
  props<{ profile: ProfileModel }>()
);

export const loadProfileFailure = createAction(
  EProfileDetailsStoreActions.LOAD_PROFILE_FAILURE,
  props<{ error: unknown }>()
);

export const loadProfileRoles = createAction(
  EProfileDetailsStoreActions.LOAD_PROFILE_ROLES,
  props<{ profileId: string }>()
);

export const loadProfileRolesSuccess = createAction(
  EProfileDetailsStoreActions.LOAD_PROFILE_ROLES_SUCCESS,
  props<{ applications: ApplicationModel[] }>()
);

export const loadProfileRolesFailure = createAction(
  EProfileDetailsStoreActions.LOAD_PROFILE_ROLES_FAILURE,
  props<{ error: unknown }>()
);

export const resetState = createAction(EProfileDetailsStoreActions.RESED_STATE);

const _profileDetailsStoreActionsUnion = union({
  loadProfile,
  loadProfileSuccess,
  loadProfileFailure,

  loadProfileRoles,
  loadProfileRolesSuccess,
  loadProfileRolesFailure,

  resetState,
});

export type ProfileDetailsStoreActionsUnion =
  typeof _profileDetailsStoreActionsUnion;
