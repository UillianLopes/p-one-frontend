import { Action, createReducer, on } from '@ngrx/store';
import { DashboardFilter } from '@p-one/domain/financial';

import { resetState, setFilterSuccess } from './dashboard.actions';

export const DASHBOARD_KEY = 'DASHBOARD';
export interface DashboardState {
  isLoadingBalancesOverTime?: boolean;
  filter: DashboardFilter;
}

const begin = new Date();
begin.setMonth(begin.getMonth() - 1);
const end = new Date();

const initialState: DashboardState = {
  filter: {
    begin,
    end,
  },
};

const _dashboardReducer = createReducer(
  initialState,

  on(setFilterSuccess, (state, { filter }) => {
    return {
      ...state,
      filter,
    };
  }),
  on(resetState, () => {
    return {
      ...initialState,
    };
  })
);

export function dashboardReducer(state: DashboardState, action: Action) {
  return _dashboardReducer(state, action);
}
