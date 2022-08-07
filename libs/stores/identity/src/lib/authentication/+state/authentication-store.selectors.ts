import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AUTHENTICATION_STORE_KEY, AuthenticationStoreState } from './authentication-store.reducer';

const authenticationStoreStateSelector =
  createFeatureSelector<AuthenticationStoreState>(AUTHENTICATION_STORE_KEY);

export const loadingSelector = createSelector(
  authenticationStoreStateSelector,
  ({ loading }) => loading
);

export const userSelector = createSelector(
  authenticationStoreStateSelector,
  ({ user }) => user
);

export const isAuthenticatedSelector = createSelector(
  userSelector,
  (user) => !!user
);

export const rolesSelector = createSelector(
  userSelector,
  (user) => user?.roles
);
