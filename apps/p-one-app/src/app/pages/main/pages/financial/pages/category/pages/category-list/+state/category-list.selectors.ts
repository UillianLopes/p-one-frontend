import { createFeatureSelector, createSelector } from '@ngrx/store';

import { paginateArray } from '../../../../../../../../../../../../../libs/core/src';
import { CATEGORY_LIST_KEY, CategoryListState } from './category-list.reducer';

export const stateSelector =
  createFeatureSelector<CategoryListState>(CATEGORY_LIST_KEY);

const categoriesSelector = createSelector(
  stateSelector,
  (state) => state.categories
);

export const filterSelector = createSelector(
  stateSelector,
  (state) => state.filter
);

const filtredCategoriesSelector = createSelector(
  categoriesSelector,
  filterSelector,
  (categories, filter) =>
    categories.filter(
      (c) =>
        c.name.toLowerCase().includes((filter.text ?? '').toLowerCase()) ||
        c.description?.toLowerCase().includes((filter.text ?? '').toLowerCase())
    )
);

export const filtredPaginatedCategoriesSelector = createSelector(
  filtredCategoriesSelector,
  filterSelector,
  (filtredCategories, filter) => paginateArray(filtredCategories, filter)
);

export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
);
