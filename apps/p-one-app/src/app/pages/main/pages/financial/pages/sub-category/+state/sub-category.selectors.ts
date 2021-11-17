import { createFeatureSelector, createSelector } from '@ngrx/store';
import { paginateArray } from '@p-one/core';
import * as _ from 'lodash';

import { SubCategoryListItemModel } from '../@types/sub-category-list-item.model';
import { SUB_CATEGORY_KEY, SubCategoryState } from './sub-category.reducer';

export const stateSelector =
  createFeatureSelector<SubCategoryState>(SUB_CATEGORY_KEY);

const subCategoriesSelector = createSelector(
  stateSelector,
  (state) => state.subCategories
);

export const filterSelector = createSelector(
  stateSelector,
  (state) => state.filter
);

export const paginationSelector = createSelector(
  stateSelector,
  (state) => state.pagination
);

export const selectedSubCategoryIdsSelector = createSelector(
  stateSelector,
  (state) => state.selectedSubCategoryIds
);

export const filtredSubCategoriesSelector = createSelector(
  subCategoriesSelector,
  filterSelector,
  selectedSubCategoryIdsSelector,
  (subCategories, filter, selectedSubCategoryIds) =>
    _.sortBy(
      subCategories
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
              isSelected: c.id && selectedSubCategoryIds.includes(c.id),
            } as SubCategoryListItemModel)
        ),
      (c) => c.name
    )
);

export const filtredSubCategoriesLengthSelector = createSelector(
  filtredSubCategoriesSelector,
  (subCategories) => subCategories.length
);

export const filtredSelectedSubCategoriesSelector = createSelector(
  selectedSubCategoryIdsSelector,
  filtredSubCategoriesSelector,
  (selectedCategoryIds, filtredCategories) =>
    filtredCategories.filter((c) => selectedCategoryIds.includes(c.id))
);

export const filtredSelectedSubCategoriesIdsSelector = createSelector(
  filtredSelectedSubCategoriesSelector,
  (filtredSelectedSubCategories) =>
    filtredSelectedSubCategories.map((c) => c.id)
);

export const filtredSubCategoriesIdsSelector = createSelector(
  filtredSubCategoriesSelector,
  (filtredCategories) => filtredCategories.map((c) => c.id) as string[]
);

export const filtredPaginatedSubCategoriesSelector = createSelector(
  filtredSubCategoriesSelector,
  paginationSelector,
  (filtredCategories, filter) => paginateArray(filtredCategories, filter)
);

export const createSubCategoryDialogIdSelector = createSelector(
  stateSelector,
  (state) => state.createSubCategoryDialogId
);

export const updateSubCategoryDialogIdSelector = createSelector(
  stateSelector,
  (state) => state.updateSubCategoryDialogId
);

export const deleteSubCategoryDialogIdSelector = createSelector(
  stateSelector,
  (state) => state.deleteSubCategoryDialogId
);

export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
);

export const isAllFiltredSubCategoriesSelectedSelector = createSelector(
  selectedSubCategoryIdsSelector,
  filtredSubCategoriesSelector,
  (selectedCategoryIds, filtredCategories) =>
    selectedCategoryIds &&
    filtredCategories &&
    filtredCategories.length > 0 &&
    !filtredCategories.some((c) => c.id && !selectedCategoryIds.includes(c.id))
);

export const isSomeFiltredSubCategoriesSelectedSelector = createSelector(
  selectedSubCategoryIdsSelector,
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

export const isCategoriesLoadingSelector = createSelector(
  stateSelector,
  (state) => state.isCategoriesLoading
);

const categoryFilterSelector = createSelector(stateSelector, (state) =>
  (state.categoryFilter ?? '').toLowerCase()
);

export const categoriesSelector = createSelector(
  stateSelector,
  categoryFilterSelector,
  (state, categoryFilter) =>
    (state.categories ?? []).filter(
      (c) => c.name.toLowerCase().indexOf(categoryFilter) >= 0
    )
);
