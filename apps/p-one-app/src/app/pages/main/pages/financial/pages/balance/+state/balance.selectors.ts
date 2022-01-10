import { createFeatureSelector, createSelector } from '@ngrx/store';
import { paginateArray } from '@p-one/core';
import * as _ from 'lodash';

import { BALANCE_KEY, BalanceState } from './balance.reducer';

const stateSelector = createFeatureSelector<BalanceState>(BALANCE_KEY);

const balancesSelector = createSelector(
  stateSelector,
  ({ balances }) => balances
);

export const paginationSelector = createSelector(
  stateSelector,
  ({ pagination }) => pagination
);

const filtredBalancesSelector = createSelector(
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

export const filtredBalancesLengthSelector = createSelector(
  filtredBalancesSelector,
  ({ length }) => length
);

export const filtredPaginatedBalancesSelector = createSelector(
  filtredBalancesSelector,
  paginationSelector,
  (filtredBalances, pagination) => paginateArray(filtredBalances, pagination)
);

export const isLoadingSelector = createSelector(
  stateSelector,
  ({ isLoading }) => isLoading
);
