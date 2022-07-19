import { createAction, props, union } from '@ngrx/store';
import { UserModel } from '@p-one/domain/identity';

export enum EAuthenticationStoreActions {
  LOAD = '[Authentication Store] Load',
  LOAD_SUCCESS = '[Authentication Store] Load Success',
  LOAD_FAILURE = '[Authentication Store] Load fail',

  SIGN_IN = '[Authentication Store] Sign in',
  SIGN_IN_SUCCESS = '[Authentication Store] Sign in success',
  SIGN_IN_FAILURE = '[Authentication Store] Sign in failure',

  SIGN_OUT = '[Authentication Store] Sign out',
  SIGN_OUT_SUCCESS = '[Authentication Store] Sign out success',
  SIGN_OUT_FAILURE = '[Authentication Store] Sign out failure',
}

export const load = createAction(EAuthenticationStoreActions.LOAD);

export const loadSuccess = createAction(
  EAuthenticationStoreActions.LOAD_SUCCESS,
  props<{ user: UserModel }>()
);
export const loadFailure = createAction(
  EAuthenticationStoreActions.LOAD_FAILURE
);

export const signIn = createAction(EAuthenticationStoreActions.SIGN_IN);

export const signInSuccess = createAction(
  EAuthenticationStoreActions.SIGN_IN_SUCCESS,
  props<{ user?: UserModel }>()
);

export const signInFailure = createAction(
  EAuthenticationStoreActions.SIGN_IN_FAILURE
);

export const signOut = createAction(EAuthenticationStoreActions.SIGN_OUT);
export const signOutSuccess = createAction(
  EAuthenticationStoreActions.SIGN_OUT_SUCCESS
);
export const signOutFailure = createAction(
  EAuthenticationStoreActions.SIGN_OUT_FAILURE
);

const actionsUnion = union({
  load,
  loadSuccess,

  signIn,
  signInSuccess,
  signInFailure,
});

export type AuthenticationStoreActionsUnion = typeof actionsUnion;
