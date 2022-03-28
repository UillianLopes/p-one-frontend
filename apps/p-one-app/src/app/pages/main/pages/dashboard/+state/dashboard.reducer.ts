import { Action, createReducer, on } from '@ngrx/store';

import { resetState } from './dashboard.actions';

export const DASHBOARD_KEY = 'DASHBOARD';
export interface DashboardState {
  isLoadingBalancesOverTime?: boolean;
}

const initialState: DashboardState = {};

const _dashboardReducer = createReducer(
  initialState,

  on(resetState, (state) => {
    return {
      ...state,
    };
  })
);

export function dashboardReducer(state: DashboardState, action: Action) {
  return _dashboardReducer(state, action);
}
