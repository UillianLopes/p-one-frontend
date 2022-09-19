import { createFeatureSelector, createSelector } from '@ngrx/store';
import { paginateArray } from '@p-one/core';
import * as _ from 'lodash';

import { WALLET_KEY, WalletState } from './wallet-store.reducer';

const stateSelector = createFeatureSelector<WalletState>(WALLET_KEY);

const balancesSelector = createSelector(
  stateSelector,
  ({ wallets: balances }) => balances
);

export const paginationSelector = createSelector(
  stateSelector,
  ({ pagination }) => pagination
);

const filtredWalletsSelector = createSelector(
  stateSelector,
  balancesSelector,
  ({ filter: { text, minValue, maxValue } }, balances) =>
    _.filter(
      balances,
      (b) =>
        b.name.toLowerCase().includes((text ?? '').toLowerCase()) &&
        (!minValue || b.value >= minValue) &&
        (!maxValue || b.value <= maxValue)
    )
);

export const filtredWalletsLengthSelector = createSelector(
  filtredWalletsSelector,
  ({ length }) => length
);

export const filtredPaginatedWalletsSelector = createSelector(
  filtredWalletsSelector,
  paginationSelector,
  (wallets, pagination) => paginateArray(wallets, pagination)
);

export const isLoadingSelector = createSelector(
  stateSelector,
  ({ isLoading }) => isLoading
);
