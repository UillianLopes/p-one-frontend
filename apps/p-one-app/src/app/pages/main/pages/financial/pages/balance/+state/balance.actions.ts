import { createAction, props, union } from '@ngrx/store';
import { BalanceModel } from '@p-one/core';

export enum EBalanceActions {
  LOAD_BALANCES = '[Balance] Load balances',
  LOAD_BALANCES_SUCCESS = '[Balance] Load balances success',
  LOAD_BALANCES_FAILURE = '[Balance] Load balances fail',

  OPEN_CREATE_BALANCE_DIALOG = '[Balance] Open create balance dialog',
  OPEN_UPDATE_BALANCE_DIALOG = '[Balance] Open update balance dialog',
  OPEN_DELETE_BALANCE_DIALOG = '[Balance] Open delete balance dialog',

  SET_BALANCES_PAGE = '[Balance] Set balances page',

  RESET_STATE = '[Balance] Reset state',
}

export const loadBalances = createAction(EBalanceActions.LOAD_BALANCES);

export const loadBalancesSuccess = createAction(
  EBalanceActions.LOAD_BALANCES_SUCCESS,
  props<{ balances: BalanceModel[] }>()
);

export const loadBalancesFailure = createAction(
  EBalanceActions.LOAD_BALANCES_SUCCESS,
  props<{ error: any }>()
);

export const setBalancesPage = createAction(
  EBalanceActions.SET_BALANCES_PAGE,
  props<{ page: number }>()
);

export const openCreateBalanceDialog = createAction(
  EBalanceActions.OPEN_CREATE_BALANCE_DIALOG
);

export const openUpdateBalanceDialog = createAction(
  EBalanceActions.OPEN_UPDATE_BALANCE_DIALOG,
  props<{ balance: BalanceModel }>()
);

export const openDeleteBalanceDialog = createAction(
  EBalanceActions.OPEN_DELETE_BALANCE_DIALOG,
  props<{ balance: BalanceModel }>()
);

export const resetState = createAction(EBalanceActions.RESET_STATE);

const actionsUnion = union({
  loadBalances,
  loadBalancesSuccess,
  loadBalancesFailure,

  openCreateBalanceDialog,
  openUpdateBalanceDialog,

  resetState,
});

export type BalanceActionsUnion = typeof actionsUnion;
