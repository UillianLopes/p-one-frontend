import { createAction, props, union } from '@ngrx/store';
import { WalletModel } from '@p-one/domain/financial';

export enum EWalletStoreActions {
  LOAD_WALLETS = '[Wallet Store] Load wallets',
  LOAD_WALLETS_SUCCESS = '[Wallet Store] Load wallets success',
  LOAD_WALLETS_FAILURE = '[Wallet Store] Load wallets fail',

  OPEN_CREATE_WALLET_DIALOG = '[Wallet Store] Open create wallet dialog',
  OPEN_UPDATE_WALLET_DIALOG = '[Wallet Store] Open update wallet dialog',
  OPEN_DELETE_WALLET_DIALOG = '[Wallet Store] Open delete wallet dialog',
  OPEN_DEPOSIT_WALLET_DIALOG = '[Wallet Store] Open deposit wallet dialog',
  OPEN_WITHDRAW_WALLET_DIALOG = '[Wallet Store] Open withdraw wallet dialog',
  OPEN_TRANSFER_FOUNDS_DIALOG = '[Wallet Store] Open transfer founds dialog',

  FILTER_WALLETS = '[Wallet Store] Filter wallets',

  SET_WALLETS_PAGE = '[Wallet Store] Set wallets page',

  RESET_STATE = '[Wallet Store] Reset state',
}

export const loadWallets = createAction(EWalletStoreActions.LOAD_WALLETS);

export const loadWalletsSuccess = createAction(
  EWalletStoreActions.LOAD_WALLETS_SUCCESS,
  props<{ wallets: WalletModel[] }>()
);

export const loadWalletsFailure = createAction(
  EWalletStoreActions.LOAD_WALLETS_SUCCESS,
  props<{ error: unknown }>()
);

export const setWalletsPage = createAction(
  EWalletStoreActions.SET_WALLETS_PAGE,
  props<{ page: number }>()
);

export const openCreateWalletDialog = createAction(
  EWalletStoreActions.OPEN_CREATE_WALLET_DIALOG
);

export const openUpdateWalletDialog = createAction(
  EWalletStoreActions.OPEN_UPDATE_WALLET_DIALOG,
  props<{ wallet: WalletModel }>()
);

export const openDepositWalletDialog = createAction(
  EWalletStoreActions.OPEN_DEPOSIT_WALLET_DIALOG,
  props<{ wallet: WalletModel }>()
);

export const openWithdrawWalletDialog = createAction(
  EWalletStoreActions.OPEN_WITHDRAW_WALLET_DIALOG,
  props<{ wallet: WalletModel }>()
);

export const openDeleteWalletDialog = createAction(
  EWalletStoreActions.OPEN_DELETE_WALLET_DIALOG,
  props<{ wallet: WalletModel }>()
);

export const filterWallets = createAction(
  EWalletStoreActions.FILTER_WALLETS,
  props<{ filter: string }>()
);

export const openTransferFoundsDialog = createAction(
  EWalletStoreActions.OPEN_TRANSFER_FOUNDS_DIALOG,
  props<{ wallet: WalletModel }>()
);

export const resetState = createAction(EWalletStoreActions.RESET_STATE);

const actionsUnion = union({
  loadWallets,
  loadWalletsSuccess,
  loadWalletsFailure,

  openCreateWalletDialog,
  openUpdateWalletDialog,
  openDeleteWalletDialog,
  openDepositWalletDialog,
  openTransferFoundsDialog,

  resetState,
});

export type WalletActionsUnion = typeof actionsUnion;
