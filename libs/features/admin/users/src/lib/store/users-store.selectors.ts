import { createFeatureSelector, createSelector } from '@ngrx/store';

import { USERS_STORE_FEATURE_KEY, UsersStoreState } from './users-store.reducer';

const usersStoreStateSelector = createFeatureSelector<UsersStoreState>(
  USERS_STORE_FEATURE_KEY
);

export const usersSelector = createSelector(
  usersStoreStateSelector,
  ({ users }) => users
);

export const usersAmmountSelector = createSelector(
  usersStoreStateSelector,
  ({ ammount }) => ammount
);

export const loadingSelector = createSelector(
  usersStoreStateSelector,
  ({ loading }) => loading
);

export const querySelector = createSelector(
  usersStoreStateSelector,
  ({ query }) => query
);
