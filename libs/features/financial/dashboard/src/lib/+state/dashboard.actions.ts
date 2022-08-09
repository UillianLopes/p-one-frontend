import { createAction, props, union } from '@ngrx/store';
import { DashboardFilter } from '@p-one/domain/financial';

export enum EDashboardActions {
  SET_FILTER = '[Dashboard] Set filter',
  SET_FILTER_SUCCESS = '[Dashboard] Set filter success',

  OPEN_FILTER_MODAL = '[Dashboard] Open filter modal',
  FILTER_MODAL_CLOSED = '[Dashboard] Filter modal closed',

  REMOVE_APPLIED_FILTER = '[Dashboard] Remove applied filter',

  RESET_STATE = '[Dashboard] Reset state',
}

export const setFilter = createAction(
  EDashboardActions.SET_FILTER,
  props<{ filter: DashboardFilter }>()
);

export const setFilterSuccess = createAction(
  EDashboardActions.SET_FILTER_SUCCESS,
  props<{ filter: DashboardFilter }>()
);

export const openFilterModal = createAction(
  EDashboardActions.OPEN_FILTER_MODAL
);

export const filterModalClosed = createAction(
  EDashboardActions.FILTER_MODAL_CLOSED,
  props<{ filter?: DashboardFilter }>()
);

export const removeApplyedFilter = createAction(
  EDashboardActions.REMOVE_APPLIED_FILTER,
  props<{ id: string }>()
);

export const resetState = createAction(EDashboardActions.RESET_STATE);

export const dashboardActionsUnion = union({
  setFilter,
  openFilterModal,
  filterModalClosed,

  resetState,
});

export type DashboardActionsUnion = typeof dashboardActionsUnion;
