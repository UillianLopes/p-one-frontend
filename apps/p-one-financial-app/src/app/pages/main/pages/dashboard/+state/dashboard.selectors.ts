import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterDisplayData } from '@p-one/shared';

import { DASHBOARD_KEY, DashboardState } from './dashboard.reducer';

const dashboardStateSelector =
  createFeatureSelector<DashboardState>(DASHBOARD_KEY);

export const isLoadingBalancesOverTimeSelector = createSelector(
  dashboardStateSelector,
  ({ isLoadingBalancesOverTime }) => isLoadingBalancesOverTime
);

export const filterSelector = createSelector(
  dashboardStateSelector,
  ({ filter }) => filter
);

export const applyedFiltersSelector = createSelector(
  filterSelector,
  ({ categories, subCategories, wallets }) => {
    let data: FilterDisplayData[] = [];

    if (categories && categories.length > 0) {
      data = [
        ...data,
        {
          id: 'CATEGORIES',
          name: 'Categorias',
          value: categories.map((c) => c.name),
        },
      ];
    }

    if (subCategories && subCategories.length > 0) {
      data = [
        ...data,
        {
          id: 'SUB_CATEGORIES',
          name: 'Sub categorias',
          value: subCategories.map((c) => c.name),
        },
      ];
    }

    if (wallets && wallets.length > 0) {
      data = [
        ...data,
        {
          id: 'WALLETS',
          name: 'Contas / Carteiras',
          value: wallets.map((c) => c.name),
        },
      ];
    }

    return data;
  }
);
