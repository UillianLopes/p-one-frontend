import { createAction, props, union } from '@ngrx/store';
import { UserModel } from '@p-one/core';

export enum EUserStoreActions {
  SIGN_IN = '[User] Sign in',
  SIGN_IN_SUCCESS = '[User] Sign in success',
  SIGN_IN_FAILURE = '[User] Sign in failure',

  SIGN_UP = '[User] Sign up',
  SIGN_UP_SUCCESS = '[User] Sign up success',
  SIGN_UP_FAILURE = '[User] Sign up failure',
}

export const signIn = createAction(EUserStoreActions.SIGN_IN);
export const signInSuccess = createAction(EUserStoreActions.SIGN_IN_SUCCESS, props<{ user: UserModel }>());
export const signInFailure = createAction(EUserStoreActions.SIGN_IN_FAILURE);

export const signUp = createAction(EUserStoreActions.SIGN_UP);
export const signUpSuccess = createAction(EUserStoreActions.SIGN_UP_SUCCESS);
export const signUpFailure = createAction(EUserStoreActions.SIGN_UP_SUCCESS);

const actionsUnion = union({
  signIn,
  signInSuccess,
  signInFailure,

  signUp,
  signUpSuccess,
  signUpFailure,
});

export type UserStoreActionsUnion = typeof actionsUnion;
