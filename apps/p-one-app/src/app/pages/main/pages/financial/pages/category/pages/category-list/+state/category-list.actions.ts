import { createAction, props, union } from '@ngrx/store';
import { CategoryModel, PaginatedFilter } from '@p-one/core';

export enum EEntryListActions {
  LOAD_CATEGORIES = '[Entry List] Load categories',
  LAOD_CATEGORIES_SUCCESS = '[Entry List] Load categories success',
  LAOD_CATEGORIES_FAILURE = '[Entry List] Load categories fail',

  PAGINATE_CATEGORIES = '[Entry List] Paginate categories',

  RESET_STATE = '[Entry List] Reset state',
}

export const loadCategories = createAction(EEntryListActions.LOAD_CATEGORIES);

export const loadCategoriesSuccess = createAction(
  EEntryListActions.LAOD_CATEGORIES_SUCCESS,
  props<{ categories: CategoryModel[] }>()
);
export const loadCategoriesFailure = createAction(
  EEntryListActions.LAOD_CATEGORIES_FAILURE,
  props<{ error: any }>()
);

export const paginateCategories = createAction(
  EEntryListActions.PAGINATE_CATEGORIES,
  props<{ pagination: PaginatedFilter }>()
);

export const resetState = createAction(EEntryListActions.RESET_STATE);

const actionsUnion = union({
  loadCategories,
  loadCategoriesSuccess,
  loadCategoriesFailure,

  paginateCategories,

  resetState,
});

export type EntryListActionsUnion = typeof actionsUnion;
