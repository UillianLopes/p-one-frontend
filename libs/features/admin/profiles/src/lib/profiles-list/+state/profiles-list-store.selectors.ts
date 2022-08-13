import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PROFILES_STORE_FEATURE_KEY, ProfilesListStoreState } from './profiles-list-store.reducer';

const profilesListStoreStateSelector =
  createFeatureSelector<ProfilesListStoreState>(PROFILES_STORE_FEATURE_KEY);

export const isLoadingSelector = createSelector(
  profilesListStoreStateSelector,
  ({ isLoading }) => isLoading
);

export const profilesSelector = createSelector(
  profilesListStoreStateSelector,
  ({ profiles }) => profiles
);

export const errorSelector = createSelector(
  profilesListStoreStateSelector,
  ({ error }) => error
);
