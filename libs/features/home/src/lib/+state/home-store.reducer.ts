import { createReducer, on } from '@ngrx/store';
import { WalletModel } from '@p-one/domain/financial';

import * as HomeStoreActions from './home-store.actions';

export interface HomeStoreState {
  isWalletsLoading: boolean;
  wallets: WalletModel[];
}

const initialState: HomeStoreState = {
  isWalletsLoading: false,
  wallets: [],
};

const _homeStoreReducer = createReducer(
  initialState,

  on(HomeStoreActions.loadWallets, (state) => ({
    ...state,
    isWalletsLoading: true,
    error: null,
  })),
  on(HomeStoreActions.loadWalletsSuccess, (state, { wallets }) => ({
    ...state,
    wallets,
    isWalletsLoading: false,
  })),
  on(HomeStoreActions.loadWalletsFailure, (state, { error }) => ({
    ...state,
    isWalletsLoading: false,
    error,
  })),

  on(HomeStoreActions.resetState, () => ({ ...initialState }))
);

export function homeStoreReducer(
  state: HomeStoreState | undefined,
  action: HomeStoreActions.HomeStoreActionsUnion
) {
  return _homeStoreReducer(state, action);
}
