import { Action, createReducer, on } from '@ngrx/store';
import { CategoryFilter, CategoryModel } from '@p-one/core';

import {
  loadCategories,
  loadCategoriesFailure,
  loadCategoriesSuccess,
  paginateCategories,
  resetState,
} from './category-list.actions';

export const CATEGORY_LIST_KEY = 'CATEGORY LIST';

export interface CategoryListState {
  loading: boolean;
  filter: CategoryFilter;
  categories: CategoryModel[];
  error?: any;
}

const initialState: CategoryListState = {
  loading: false,
  categories: [],
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

  on(paginateCategories, (state, action) => {
    return {
      ...state,
      filter: {
        ...state.filter,
        ...action.pagination,
      },
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
