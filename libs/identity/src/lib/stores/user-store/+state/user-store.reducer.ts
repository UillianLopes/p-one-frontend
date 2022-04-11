import { Action, createReducer, on } from '@ngrx/store';

import { UserModel } from '../../../models';
import * as UserStoreActions from './user-store.actions';

export const USER_STORE_KEY = 'USER_STORE';

export interface UserStoreState {
  loading: boolean;
  user?: UserModel;
}

const initialState: UserStoreState = {
  loading: false,
};

const _userStoreReducer = createReducer(
  initialState,

  on(UserStoreActions.load, (state) => {
    return { ...state, loading: true };
  }),
  on(UserStoreActions.loadSuccess, (state, { user }) => {
    return {
      ...state,
      loading: false,
      user,
    };
  }),
  on(UserStoreActions.loadFailure, (state) => {
    return { ...state, loading: false, user: undefined };
  }),

  on(UserStoreActions.signIn, (state) => {
    return { ...state, loading: true };
  }),
  on(UserStoreActions.signInSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      user: action.user,
    };
  }),
  on(UserStoreActions.signInFailure, (state) => {
    return { ...state, loading: false };
  }),

  on(UserStoreActions.signOut, (state) => {
    return { ...state, loading: true };
  }),
  on(UserStoreActions.signOutSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      user: undefined,
      accessToken: undefined,
    };
  }),
  on(UserStoreActions.signInFailure, (state) => {
    return { ...state, loading: false };
  })
);

export const userStoreReducer = (state: UserStoreState, action: Action) => {
  return _userStoreReducer(state, action);
};
