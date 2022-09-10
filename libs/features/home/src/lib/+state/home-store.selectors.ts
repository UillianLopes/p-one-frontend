import { createFeatureSelector, createSelector } from '@ngrx/store';

import { HOME_FEATURE_KEY } from './home-store.actions';
import { HomeStoreState } from './home-store.reducer';

export const homeStoreSelector =
  createFeatureSelector<HomeStoreState>(HOME_FEATURE_KEY);

export const walletsSelector = createSelector(
  homeStoreSelector,
  ({ wallets }) => wallets
);

export const isWalletsLoadingSelector = createSelector(
  homeStoreSelector,
  ({ isWalletsLoading }) => isWalletsLoading
);
