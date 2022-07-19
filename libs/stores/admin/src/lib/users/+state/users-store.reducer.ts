import { Action, createReducer, on } from '@ngrx/store';
import { GetAllUsersQuery, UserModel } from '@p-one/domain/admin';

import * as UserStoreActions from './users-store.actions';

export const USERS_STORE_FEATURE_KEY = 'usersStore';

export interface UsersStoreState {
  loading: boolean;
  usersQuery: GetAllUsersQuery;
  users: UserModel[];
  ammount: number;

  error?: unknown;
}

export const initialState: UsersStoreState = {
  loading: false,
  users: [],
  ammount: 0,

  usersQuery: {
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
    usersQuery: {
      ...state.usersQuery,
      ...query,
    },
    isLoading: false,
  })),
  on(UserStoreActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }))
);

export function usersStoreReducer(
  state: UsersStoreState | undefined,
  action: Action
) {
  return _usersStoreReducer(state, action);
}
