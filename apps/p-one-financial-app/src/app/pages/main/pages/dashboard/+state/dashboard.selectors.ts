import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DASHBOARD_KEY, DashboardState } from './dashboard.reducer';

const dashboardStateSelector =
  createFeatureSelector<DashboardState>(DASHBOARD_KEY);

export const isLoadingBalancesOverTimeSelector = createSelector(
  dashboardStateSelector,
  ({ isLoadingBalancesOverTime }) => isLoadingBalancesOverTime
);
