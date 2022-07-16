import { createAction, props, union } from '@ngrx/store';
import { UserModel } from '@p-one/domain/admin';

export enum EUsersStoreActions {
  LOAD_USERS = '[Users] Load Users',
  LOAD_USERS_SUCCESS = '[Users] Load Users Success',
  LOAD_USERS_FAILURE = '[Users] Load Users Failure',

  CREATE_USER = '[Users] Create User',
  CREATE_USER_SUCCESS = '[Users] Create User Success',
  CREATE_USER_FAILURE = '[Users] Create User Failure',

  UPDATE_USER = '[Users] Update User',
  UPDATE_USER_SUCCESS = '[Users] Update User Success',
  UPDATE_USER_FAILURE = '[Users] Update User Failure',

  DELETE_USER = '[Users] Delete User',
  DELETE_USER_SUCCESS = '[Users] Delete User Success',
  DELETE_USER_FAILURE = '[Users] Delete User Failure',

  RESET_STATE = '[Users] Reset State',
}

export const loadUsers = createAction(EUsersStoreActions.LOAD_USERS);
export const loadUsersSuccess = createAction(
  EUsersStoreActions.LOAD_USERS_SUCCESS,
  props<{ users: UserModel[]; ammount: number }>()
);
export const loadUsersFailure = createAction(
  EUsersStoreActions.LOAD_USERS_FAILURE,
  props<{ error: unknown }>()
);

export const createUser = createAction(EUsersStoreActions.CREATE_USER);
export const createUserSuccess = createAction(
  EUsersStoreActions.CREATE_USER_SUCCESS
);
export const createUserFailure = createAction(
  EUsersStoreActions.CREATE_USER_FAILURE,
  props<{ error: unknown }>()
);

export const updateUser = createAction(EUsersStoreActions.UPDATE_USER);
export const updateUserSuccess = createAction(
  EUsersStoreActions.UPDATE_USER_SUCCESS
);
export const updateUserFailure = createAction(
  EUsersStoreActions.UPDATE_USER_FAILURE,
  props<{ error: unknown }>()
);

export const deleteUser = createAction(
  EUsersStoreActions.DELETE_USER,
  props<{ userId: string }>()
);
export const deleteUserSuccess = createAction(
  EUsersStoreActions.DELETE_USER_SUCCESS
);
export const deleteUserFailure = createAction(
  EUsersStoreActions.DELETE_USER_FAILURE,
  props<{ error: unknown }>()
);

export const resetState = createAction(EUsersStoreActions.RESET_STATE);

const _usersStoreActionsUnion = union({
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,

  createUser,
  createUserSuccess,
  createUserFailure,

  updateUser,
  updateUserSuccess,
  updateUserFailure,

  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,

  resetState,
});

export type UserrStoreActionsUnion = typeof _usersStoreActionsUnion;
