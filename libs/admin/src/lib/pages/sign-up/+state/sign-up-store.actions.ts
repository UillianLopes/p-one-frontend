import { createAction, props, union } from '@ngrx/store';

import { CreateUserRequest } from '../../../models';

export enum ESignUpActions {
  SIGN_UP = '[Sign up] Sign Up',
  SIGN_UP_SUCCESS = '[Sign up] Sign Up Success',
  SIGN_UP_FAILURE = '[Sign up] Sign Up Failure',

  RESET_STATE = '[Sign up] Reset State',
}

export const signUp = createAction(
  ESignUpActions.SIGN_UP,
  props<{ user: CreateUserRequest }>()
);

export const signUpSuccess = createAction(ESignUpActions.SIGN_UP_SUCCESS);

export const signUpFailure = createAction(
  ESignUpActions.SIGN_UP_FAILURE,
  props<{ error: unknown }>()
);

export const resetState = createAction(ESignUpActions.RESET_STATE);

const _userStoreActionsUnion = union({
  signUp,
  signUpFailure,
  signUpSuccess,

  resetState,
});
export type UserStoreActionsUnion = typeof _userStoreActionsUnion;
