import { Action, createReducer, on } from '@ngrx/store';
import { BalanceFilter, BalanceModel, PaginatedFilter } from '@p-one/core';

import { loadBalances, loadBalancesFailure, loadBalancesSuccess, resetState } from './balance.actions';

export const BALANCE_KEY = `BALANCE`;

export interface BalanceState {
  selectedBalanceIds: string[];
  balances: BalanceModel[];
  filter: BalanceFilter;
  pagination: PaginatedFilter;
  isLoading?: boolean;
}

const initialState: BalanceState = {
  balances: [],
  pagination: {
    page: 1,
    pageSize: 50,
  },
  filter: {},
  selectedBalanceIds: [],
};

const _balanceReducer = createReducer(
  initialState,

  on(loadBalances, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(loadBalancesSuccess, (state, { balances }) => {
    return {
      ...state,
      balances,
      isLoading: false,
    };
  }),
  on(loadBalancesFailure, (state, { error }) => {
    return {
      ...state,
      error,
      isLoading: false,
    };
  }),

  on(resetState, (__) => {
    return {
      ...initialState,
    };
  })
);

export function balanceReducer(state: BalanceState, action: Action) {
  return _balanceReducer(state, action);
}
