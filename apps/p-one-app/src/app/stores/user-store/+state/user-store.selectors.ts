import { createFeatureSelector, createSelector } from '@ngrx/store';

import { USER_STORE_KEY, UserStoreState } from './user-store.reducer';

const userStoreStateSelector =
  createFeatureSelector<UserStoreState>(USER_STORE_KEY);

export const loadingSelector = createSelector(
  userStoreStateSelector,
  (state) => state.loading
);

export const userSelector = createSelector(
  userStoreStateSelector,
  (state) => state.user
);

export const isAuthenticatedSelector = createSelector(
  userStoreStateSelector,
  (state) => !!state.user
);
