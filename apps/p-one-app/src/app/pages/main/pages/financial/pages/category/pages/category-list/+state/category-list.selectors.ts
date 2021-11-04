import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import { paginateArray } from '../../../../../../../../../../../../../libs/core/src';
import { CategoryListItemModel } from '../@types/category-list-item.model';
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

export const selectedCategoryIdsSelector = createSelector(
  stateSelector,
  (state) => state.selectedCategoryIds
);

const filtredCategoriesSelector = createSelector(
  categoriesSelector,
  filterSelector,
  selectedCategoryIdsSelector,
  (categories, filter, selectedCategoryIds) =>
    _.sortBy(categories
      .filter(
        (c) =>
          c.name.toLowerCase().includes((filter.text ?? '').toLowerCase()) ||
          c.description
            ?.toLowerCase()
            .includes((filter.text ?? '').toLowerCase())
      )
      .map(
        (c) =>
          ({
            ...c,
            isSelected: c.id && selectedCategoryIds.includes(c.id),
          } as CategoryListItemModel)
      ), c => c.name)
);

export const filtredCategoriesIdsSelector = createSelector(
  filtredCategoriesSelector,
  (filtredCategories) => filtredCategories.map((c) => c.id) as string[]
);

export const filtredPaginatedCategoriesSelector = createSelector(
  filtredCategoriesSelector,
  filterSelector,
  (filtredCategories, filter) => paginateArray(filtredCategories, filter)
);

export const createCategoryDialogIdSelector = createSelector(
  stateSelector,
  (state) => state.createCategoryDialogId
);

export const updateCategoryDialogIdSelector = createSelector(
  stateSelector,
  (state) => state.updateCategoryDialogId
);

export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
);

export const isAllFiltredCategoriesSelectedSelector = createSelector(
  selectedCategoryIdsSelector,
  filtredCategoriesSelector,
  (selectedCategoryIds, filtredCategories) =>
    filtredCategories &&
    filtredCategories.length > 0 &&
    !filtredCategories.some((c) => c.id && !selectedCategoryIds.includes(c.id))
);

export const isSomeFiltredCategoriesSelectedSelector = createSelector(
  selectedCategoryIdsSelector,
  (selectedCategoryIds) => selectedCategoryIds.length > 0
);
