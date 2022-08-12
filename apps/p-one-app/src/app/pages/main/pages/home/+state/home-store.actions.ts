import { createAction, props, union } from '@ngrx/store';
import { WalletModel } from '@p-one/domain/financial';

export const HOME_FEATURE_KEY = 'homeStore';
export enum EHomeStoreActions {
  LOAD_WALLETS = '[Home Store] Load Wallets',
  LOAD_WALLETS_SUCCESS = '[Home Store] Load Wallets Success',
  LOAD_WALLETS_FAILURE = '[Home Store] Load Wallets Failure',

  RESET_STATE = '[Home Store] Reset State',
}

export const loadWallets = createAction(EHomeStoreActions.LOAD_WALLETS);
export const loadWalletsSuccess = createAction(
  EHomeStoreActions.LOAD_WALLETS_SUCCESS,
  props<{ wallets: WalletModel[] }>()
);
export const loadWalletsFailure = createAction(
  EHomeStoreActions.LOAD_WALLETS_FAILURE,
  props<{ error: unknown }>()
);

export const resetState = createAction(EHomeStoreActions.RESET_STATE);

const _homeStoreActionsUnion = union({
  loadWallets,
  loadWalletsSuccess,
  loadWalletsFailure,

  resetState,
});

export type HomeStoreActionsUnion = typeof _homeStoreActionsUnion;
