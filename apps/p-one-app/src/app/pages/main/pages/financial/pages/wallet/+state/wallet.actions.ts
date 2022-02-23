import { createAction, props, union } from '@ngrx/store';
import { WalletModel } from '@p-one/core';

export enum EWalletActions {
  LOAD_WALLETS = '[Wallet] Load wallets',
  LOAD_WALLETS_SUCCESS = '[Wallet] Load wallets success',
  LOAD_WALLETS_FAILURE = '[Wallet] Load wallets fail',

  OPEN_CREATE_WALLET_DIALOG = '[Wallet] Open create wallet dialog',
  OPEN_UPDATE_WALLET_DIALOG = '[Wallet] Open update wallet dialog',
  OPEN_DELETE_WALLET_DIALOG = '[Wallet] Open delete wallet dialog',

  SET_WALLETS_PAGE = '[Wallet] Set wallets page',

  RESET_STATE = '[Wallet] Reset state',
}

export const loadWallets = createAction(EWalletActions.LOAD_WALLETS);

export const loadWalletsSuccess = createAction(
  EWalletActions.LOAD_WALLETS_SUCCESS,
  props<{ wallets: WalletModel[] }>()
);

export const loadWalletsFailure = createAction(
  EWalletActions.LOAD_WALLETS_SUCCESS,
  props<{ error: any }>()
);

export const setWalletsPage = createAction(
  EWalletActions.SET_WALLETS_PAGE,
  props<{ page: number }>()
);

export const openCreateWalletDialog = createAction(
  EWalletActions.OPEN_CREATE_WALLET_DIALOG
);

export const openUpdateWalletDialog = createAction(
  EWalletActions.OPEN_UPDATE_WALLET_DIALOG,
  props<{ wallet: WalletModel }>()
);

export const openDeleteWalletDialog = createAction(
  EWalletActions.OPEN_DELETE_WALLET_DIALOG,
  props<{ wallet: WalletModel }>()
);

export const resetState = createAction(EWalletActions.RESET_STATE);

const actionsUnion = union({
  loadWallets,
  loadWalletsSuccess,
  loadWalletsFailure,

  openCreateWalletDialog,
  openUpdateWalletDialog,
  openDeleteWalletDialog,

  resetState,
});

export type WalletActionsUnion = typeof actionsUnion;
