import { createAction, union } from '@ngrx/store';

export enum EDashboardActions {
  RESET_STATE = '[Dashboard] Reset state',
}

export const resetState = createAction(EDashboardActions.RESET_STATE);

export const dashboardActionsUnion = union({
  resetState,
});
