import { Action, createReducer, on } from '@ngrx/store';
import { GetAllUsersQuery, UserModel } from '@p-one/domain/admin';

import * as UserStoreActions from './users-store.actions';

export const USERS_STORE_FEATURE_KEY = 'usersStore';

export interface UsersStoreState {
  loading: boolean;
  query: GetAllUsersQuery;
  users: UserModel[];
  ammount?: number;

  error?: unknown;
}

export const initialState: UsersStoreState = {
  loading: false,
  users: [],
  ammount: 0,

  query: {
    page: 1,
    pageSize: 50,
  },
};

const _usersStoreReducer = createReducer(
  initialState,

  on(UserStoreActions.loadUsers, (state) => ({ ...state, isLoading: true })),
  on(UserStoreActions.loadUsersSuccess, (state, { users, ammount, query }) => ({
    ...state,
    users,
    ammount,
    query,
    isLoading: false,
  })),
  on(UserStoreActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(UserStoreActions.resetState, () => ({ ...initialState }))
);

export function usersStoreReducer(
  state: UsersStoreState | undefined,
  action: Action
) {
  return _usersStoreReducer(state, action);
}
