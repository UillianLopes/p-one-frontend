import { createAction, props, union } from '@ngrx/store';

import { UserModel } from '../../../models';

export enum EUserStoreActions {
  LOAD = '[User] Load',
  LOAD_SUCCESS = '[User] Load Success',
  LOAD_FAILURE = '[User] Load fail',

  SIGN_IN = '[User] Sign in',
  SIGN_IN_SUCCESS = '[User] Sign in success',
  SIGN_IN_FAILURE = '[User] Sign in failure',

  SIGN_OUT = '[User] Sign out',
  SIGN_OUT_SUCCESS = '[User] Sign out success',
  SIGN_OUT_FAILURE = '[User] Sign out failure',

  SIGN_UP = '[User] Sign up',
  SIGN_UP_SUCCESS = '[User] Sign up success',
  SIGN_UP_FAILURE = '[User] Sign up failure',
}

export const load = createAction(EUserStoreActions.LOAD);
export const loadSuccess = createAction(
  EUserStoreActions.LOAD_SUCCESS,
  props<{ user: UserModel; accessToken: string }>()
);
export const loadFailure = createAction(EUserStoreActions.LOAD_FAILURE);

export const signIn = createAction(EUserStoreActions.SIGN_IN);
export const signInSuccess = createAction(
  EUserStoreActions.SIGN_IN_SUCCESS,
  props<{ user: UserModel; accessToken: string }>()
);
export const signInFailure = createAction(EUserStoreActions.SIGN_IN_FAILURE);

export const signOut = createAction(EUserStoreActions.SIGN_OUT);
export const signOutSuccess = createAction(EUserStoreActions.SIGN_OUT_SUCCESS);
export const signOutFailure = createAction(EUserStoreActions.SIGN_OUT_FAILURE);

export const signUp = createAction(EUserStoreActions.SIGN_UP);
export const signUpSuccess = createAction(EUserStoreActions.SIGN_UP_SUCCESS);
export const signUpFailure = createAction(EUserStoreActions.SIGN_UP_SUCCESS);

const actionsUnion = union({
  load,
  loadSuccess,

  signIn,
  signInSuccess,
  signInFailure,

  signUp,
  signUpSuccess,
  signUpFailure,
});

export type UserStoreActionsUnion = typeof actionsUnion;
