import { Action, createReducer, on } from '@ngrx/store';
import { CategoryFilter, CategoryModel, PaginatedFilter } from '@p-one/core';

import {
  closeCreateCategoryDialogSuccess,
  closeUpdateCategoryDialogSuccess,
  createCategory,
  createCategoryFailure,
  createCategorySuccess,
  deleteCategory,
  deleteCategoryFailure,
  deleteCategorySuccess,
  deleteSelectedCategories,
  deleteSelectedCategoriesFailure,
  deleteSelectedCategoriesSuccess,
  filterCategories,
  loadCategories,
  loadCategoriesFailure,
  loadCategoriesSuccess,
  paginateCategories,
  resetState,
  selectCategory,
  selectMultipleCategories,
  setOpenedCreateCategoryDialog,
  setOpenedDeleteCategoryDialog,
  setOpenedUpdateCategoryDialog,
  unselectCategory,
  unselectMultipleCategories,
  updateCategory,
  updateCategoryFailure,
  updateCategorySuccess,
} from './category-list.actions';

export const CATEGORY_LIST_KEY = 'FINANCIAL_CATEGORY_LIST';

export interface CategoryListState {
  loading: boolean;
  filter: CategoryFilter;
  pagination: PaginatedFilter;
  categories: CategoryModel[];
  error?: any;

  selectedCategoryIds: string[];

  createCategoryDialogId?: string;
  updateCategoryDialogId?: string;
  deleteCategoryDialogId?: string;
}

const initialState: CategoryListState = {
  loading: false,
  categories: [],
  selectedCategoryIds: [],
  pagination: {
    page: 1,
    pageSize: 50,
  },
  filter: {},
};

const _categoryListReducer = createReducer<CategoryListState>(
  initialState,

  on(loadCategories, (state, _) => {
    return { ...state, loading: true };
  }),

  on(loadCategoriesSuccess, (state, action) => {
    return { ...state, categories: action.categories, loading: false };
  }),

  on(loadCategoriesFailure, (state, action) => {
    return { ...state, error: action.error, loading: false };
  }),

  on(createCategory, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(createCategorySuccess, (state, action) => {
    return {
      ...state,
      categories: [...state.categories, action.category],
      loading: false,
    };
  }),

  on(createCategoryFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  }),

  on(updateCategory, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(updateCategorySuccess, (state, action) => {
    return {
      ...state,
      categories: [
        ...state.categories.filter((c) => c.id != action.category.id),
        action.category,
      ],
      loading: false,
    };
  }),

  on(updateCategoryFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  }),

  on(setOpenedCreateCategoryDialog, (state, action) => {
    return {
      ...state,
      createCategoryDialogId: action.createCategoryDialogId,
    };
  }),

  on(closeCreateCategoryDialogSuccess, (state) => {
    return {
      ...state,
      createCategoryDialogId: undefined,
    };
  }),

  on(setOpenedUpdateCategoryDialog, (state, action) => {
    return {
      ...state,
      updateCategoryDialogId: action.updateCategoryDialogId,
    };
  }),

  on(closeUpdateCategoryDialogSuccess, (state) => {
    return {
      ...state,
      updateCategoryDialogId: undefined,
    };
  }),

  on(paginateCategories, (state, action) => {
    return {
      ...state,
      filter: {
        ...state.filter,
        ...action.pagination,
      },
    };
  }),

  on(selectCategory, (state, action) => {
    return {
      ...state,
      selectedCategoryIds: [...state.selectedCategoryIds, action.categoryId],
    };
  }),

  on(unselectCategory, (state, action) => {
    return {
      ...state,
      selectedCategoryIds: [
        ...state.selectedCategoryIds.filter(
          (categoryId) => categoryId != action.categoryId
        ),
      ],
    };
  }),

  on(selectMultipleCategories, (state, action) => {
    return {
      ...state,
      selectedCategoryIds: [...(action.categoryIds ?? [])],
    };
  }),

  on(unselectMultipleCategories, (state, action) => {
    return {
      ...state,
      selectedCategoryIds: [...(action.categoryIds ?? [])],
    };
  }),

  on(setOpenedDeleteCategoryDialog, (state, action) => {
    return { ...state, deleteCategoryDialogId: action.deleteCategoryDialogId };
  }),

  on(deleteCategory, (state) => {
    return { ...state, loading: true };
  }),

  on(deleteCategorySuccess, (state, { categoryId }) => {
    return {
      ...state,
      loading: false,
      categories: [...state.categories.filter((c) => c.id != categoryId)],
    };
  }),

  on(deleteCategoryFailure, (state) => {
    return { ...state, loading: false };
  }),

  on(deleteSelectedCategories, (state) => {
    return { ...state, loading: true };
  }),

  on(deleteSelectedCategoriesSuccess, (state, { categoriesIds }) => {
    return {
      ...state,
      loading: false,
      selectedCategoryIds: [],
      categories: [
        ...state.categories.filter(
          (e) => !(e.id && categoriesIds.includes(e.id))
        ),
      ],
    };
  }),

  on(deleteSelectedCategoriesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(filterCategories, (state, { filter }) => {
    return {
      ...state,
      filter,
    };
  }),

  on(paginateCategories, (state, { pagination }) => {
    return {
      ...state,
      pagination,
    };
  }),

  on(resetState, (_) => {
    return {
      ...initialState,
    };
  })
);

export function categoryListReducer(state: CategoryListState, action: Action) {
  return _categoryListReducer(state, action);
}
