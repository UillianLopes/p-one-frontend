import { Action, createReducer, on } from '@ngrx/store';
import { UserModel } from '@p-one/domain/identity';

import * as AuthenticationStoreActions from './authentication-store.actions';

export const AUTHENTICATION_STORE_KEY = 'authenticationStore';

export interface AuthenticationStoreState {
  loading: boolean;
  user?: UserModel;
}

const initialState: AuthenticationStoreState = {
  loading: false,
};

const _authenticationStoreReducer = createReducer(
  initialState,

  on(AuthenticationStoreActions.load, (state) => {
    return { ...state, loading: true };
  }),
  on(AuthenticationStoreActions.loadSuccess, (state, { user }) => {
    return {
      ...state,
      loading: false,
      user,
    };
  }),
  on(AuthenticationStoreActions.loadFailure, (state) => {
    return { ...state, loading: false, user: undefined };
  }),

  on(AuthenticationStoreActions.signIn, (state) => {
    return { ...state, loading: true };
  }),
  on(AuthenticationStoreActions.signInSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      user: action.user,
    };
  }),
  on(AuthenticationStoreActions.signInFailure, (state) => {
    return { ...state, loading: false };
  }),

  on(AuthenticationStoreActions.signOut, (state) => {
    return { ...state, loading: true };
  }),
  on(AuthenticationStoreActions.signOutSuccess, (state) => {
    return {
      ...state,
      loading: false,
      user: undefined,
      accessToken: undefined,
    };
  }),
  on(AuthenticationStoreActions.signInFailure, (state) => {
    return { ...state, loading: false };
  })
);

export const authenticationStoreReducer = (
  state: AuthenticationStoreState,
  action: Action
) => {
  return _authenticationStoreReducer(state, action);
};
