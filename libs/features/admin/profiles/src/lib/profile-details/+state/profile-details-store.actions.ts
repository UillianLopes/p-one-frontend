import { createAction, props, union } from '@ngrx/store';
import { ProfileModel } from '@p-one/domain/admin';
import { ApplicationModel } from 'libs/domain/admin/src/lib/models/application.model';

export enum EProfileDetailsStoreActions {
  LOAD_PROFILE_AND_ROLES = '[Profile Details Store] Load Profile and Roles',
  LOAD_PROFILE_AND_ROLES_SUCCESS = '[Profile Details Store] Load Profile and Roles Success',
  LOAD_PROFILE_AND_ROLES_FAILURE = '[Profile Details Store] Load Profile and Roles Failure',

  ADD_ROLE = '[Profile Details Store] Add Role',
  ADD_ROLE_SUCCESS = '[Profile Details Store] Add Role Success',
  ADD_ROLE_FAILURE = '[Profile Details Store] Add Role Failure',

  REMOVE_ROLE = '[Profile Details Store] Remove Role',
  REMOVE_ROLE_SUCCESS = '[Profile Details Store] Remove Role Success',
  REMOVE_ROLE_FAILURE = '[Profile Details Store] Remove Role Failure',

  RESED_STATE = '[Profile Details Store] Reset State',
}

export const loadProfileAndRoles = createAction(
  EProfileDetailsStoreActions.LOAD_PROFILE_AND_ROLES,
  props<{ profileId: string }>()
);

export const loadProfileAndRolesSuccess = createAction(
  EProfileDetailsStoreActions.LOAD_PROFILE_AND_ROLES_SUCCESS,
  props<{
    applications: ApplicationModel[];
    profile: ProfileModel;
    profileId: string;
  }>()
);

export const loadProfileAndRolesFailure = createAction(
  EProfileDetailsStoreActions.LOAD_PROFILE_AND_ROLES_FAILURE,
  props<{ error: unknown }>()
);

export const addRole = createAction(
  EProfileDetailsStoreActions.ADD_ROLE,
  props<{ key: string }>()
);

export const addRoleSuccess = createAction(
  EProfileDetailsStoreActions.ADD_ROLE_SUCCESS,
  props<{ key: string }>()
);

export const addRoleFailure = createAction(
  EProfileDetailsStoreActions.ADD_ROLE_FAILURE,
  props<{ error: unknown }>()
);

export const removeRole = createAction(
  EProfileDetailsStoreActions.REMOVE_ROLE,
  props<{ key: string }>()
);

export const removeRoleSuccess = createAction(
  EProfileDetailsStoreActions.REMOVE_ROLE_SUCCESS,
  props<{ key: string }>()
);

export const removeRoleFailure = createAction(
  EProfileDetailsStoreActions.REMOVE_ROLE_FAILURE,
  props<{ error: unknown }>()
);

export const resetState = createAction(EProfileDetailsStoreActions.RESED_STATE);

const _profileDetailsStoreActionsUnion = union({
  loadProfileAndRoles,
  loadProfileAndRolesSuccess,
  loadProfileAndRolesFailure,

  removeRole,
  removeRoleFailure,
  removeRoleSuccess,

  addRole,
  addRoleFailure,
  addRoleSuccess,

  resetState,
});

export type ProfileDetailsStoreActionsUnion =
  typeof _profileDetailsStoreActionsUnion;
