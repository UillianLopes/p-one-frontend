import { Action, createReducer, on } from '@ngrx/store';

import { resetState } from './dashboard.actions';

export interface DashboardState {}

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
