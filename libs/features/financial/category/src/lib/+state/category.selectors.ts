import { createFeatureSelector, createSelector } from '@ngrx/store';
import { paginateArray } from '@p-one/core';
import * as _ from 'lodash';

import { CategoryListItemModel } from '../@types/category-item.model';
import { CATEGORY_KEY, CategoryState } from './category.reducer';

export const stateSelector = createFeatureSelector<CategoryState>(CATEGORY_KEY);

const categoriesSelector = createSelector(
  stateSelector,
  ({ categories }) => categories
);

export const filterSelector = createSelector(
  stateSelector,
  ({ filter }) => filter
);

export const paginationSelector = createSelector(
  stateSelector,
  ({ pagination }) => pagination
);

export const selectedCategoryIdsSelector = createSelector(
  stateSelector,
  ({ selectedCategoryIds }) => selectedCategoryIds
);

export const filtredCategoriesSelector = createSelector(
  categoriesSelector,
  filterSelector,
  selectedCategoryIdsSelector,
  (categories, filter, selectedCategoryIds) =>
    _.sortBy(
      categories
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
        ),
      (c) => c.name
    )
);

export const filtredCategoriesLengthSelector = createSelector(
  filtredCategoriesSelector,
  (categories) => categories.length
);

export const filtredSelectedCategoriesSelector = createSelector(
  selectedCategoryIdsSelector,
  filtredCategoriesSelector,
  (selectedCategoryIds, filtredCategories) =>
    filtredCategories.filter((c) => selectedCategoryIds.includes(c.id as string))
);

export const filtredSelectedCategoriesIdsSelector = createSelector(
  filtredSelectedCategoriesSelector,
  (filtredSelectedCategories) => filtredSelectedCategories.filter((c) => !!c.id).map((c) => c.id as string)
);

export const filtredCategoriesIdsSelector = createSelector(
  filtredCategoriesSelector,
  (filtredCategories) => filtredCategories.map((c) => c.id) as string[]
);

export const filtredPaginatedCategoriesSelector = createSelector(
  filtredCategoriesSelector,
  paginationSelector,
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

export const deleteCategoryDialogIdSelector = createSelector(
  stateSelector,
  (state) => state.deleteCategoryDialogId
);

export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
);

export const isAllFiltredCategoriesSelectedSelector = createSelector(
  selectedCategoryIdsSelector,
  filtredCategoriesSelector,
  (selectedCategoryIds, filtredCategories) =>
    selectedCategoryIds &&
    filtredCategories &&
    filtredCategories.length > 0 &&
    !filtredCategories.some((c) => c.id && !selectedCategoryIds.includes(c.id))
);

export const isSomeFiltredCategoriesSelectedSelector = createSelector(
  selectedCategoryIdsSelector,
  (selectedCategoryIds) => selectedCategoryIds && selectedCategoryIds.length > 0
);

export const pageSelector = createSelector(
  paginationSelector,
  (pagination) => pagination.page
);

export const pageSizeSelector = createSelector(
  paginationSelector,
  (pagination) => pagination.pageSize
);
