import { Action, createReducer, on } from '@ngrx/store';
import { CategoryFilter, CategoryModel } from '@p-one/core';

import {
  closeCreateCategoryDialogSuccess,
  closeUpdateCategoryDialogSuccess,
  createCategory,
  createCategoryFailure,
  createCategorySuccess,
  loadCategories,
  loadCategoriesFailure,
  loadCategoriesSuccess,
  paginateCategories,
  resetState,
  selectCategory,
  selectMultipleCategories,
  setOpenedCreateCategoryDialog,
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
  categories: CategoryModel[];
  error?: any;

  selectedCategoryIds: string[];

  createCategoryDialogId?: string;
  updateCategoryDialogId?: string;
}

const initialState: CategoryListState = {
  loading: false,
  categories: [],
  selectedCategoryIds: [],
  filter: {
    page: 1,
    pageSize: 50,
  },
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

  on(resetState, (_) => {
    return {
      ...initialState,
    };
  })
);

export function categoryListReducer(state: CategoryListState, action: Action) {
  return _categoryListReducer(state, action);
}
