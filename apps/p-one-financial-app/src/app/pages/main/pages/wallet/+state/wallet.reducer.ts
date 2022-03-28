import { Action, createReducer, on } from '@ngrx/store';
import { BalanceFilter, PaginatedFilter, WalletModel } from '@p-one/financial';

import { loadWallets, loadWalletsFailure, loadWalletsSuccess, resetState } from './wallet.actions';

export const WALLET_KEY = `WALLET`;

export interface WalletState {
  selectedBalanceIds: string[];
  wallets: WalletModel[];
  filter: BalanceFilter;
  pagination: PaginatedFilter;
  isLoading?: boolean;
}

const initialState: WalletState = {
  wallets: [],
  pagination: {
    page: 1,
    pageSize: 50,
  },
  filter: {},
  selectedBalanceIds: [],
};

const _walletReducer = createReducer(
  initialState,

  on(loadWallets, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(loadWalletsSuccess, (state, { wallets }) => {
    return {
      ...state,
      wallets: wallets,
      isLoading: false,
    };
  }),
  on(loadWalletsFailure, (state, { error }) => {
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

export function walletReducer(state: WalletState, action: Action) {
  return _walletReducer(state, action);
}
