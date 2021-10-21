import { Action, createReducer, on } from '@ngrx/store';
import { UserModel } from '@p-one/core';

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
  on(UserStoreActions.loadSuccess, (state, action) => {
    return { ...state, loading: false, user: action.user };
  }),
  on(UserStoreActions.loadFailure, (state) => {
    return { ...state, loading: false, user: undefined };
  }),

  on(UserStoreActions.signIn, (state) => {
    return { ...state, loading: true };
  }),
  on(UserStoreActions.signInSuccess, (state, action) => {
    return { ...state, loading: false, user: action.user };
  }),
  on(UserStoreActions.signInFailure, (state) => {
    return { ...state, loading: false };
  }),
  
  on(UserStoreActions.signUp, (state) => {
    return { ...state };
  }),
  on(UserStoreActions.signUpSuccess, (state) => {
    return { ...state };
  }),
  on(UserStoreActions.signUpFailure, (state) => {
    return { ...state };
  })
);

export const userStoreReducer = (state: UserStoreState, action: Action) => {
  return _userStoreReducer(state, action);
};
