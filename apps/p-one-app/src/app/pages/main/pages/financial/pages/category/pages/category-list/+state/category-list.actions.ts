import { createAction, props, union } from '@ngrx/store';
import { CategoryModel, PaginatedFilter } from '@p-one/core';

export enum ECategoryListActions {
  LOAD_CATEGORIES = '[Category List] Load categories',
  LAOD_CATEGORIES_SUCCESS = '[Category List] Load categories success',
  LAOD_CATEGORIES_FAILURE = '[Category List] Load categories fail',

  SET_OPENED_CREATE_CATEGORY_DIALOG = '[Category List] Set opened create category dialog',
  CLOSE_CREATE_CATEGORY_DIALOG = '[Category List] Close create category dialog',
  CLOSE_CREATE_CATEGORY_DIALOG_SUCCESS = '[Category List] Close create category dialog success',

  SET_OPENED_UPDATE_CATEGORY_DIALOG = '[Category List] Set opened update category dialog',
  CLOSE_UPDATE_CATEGORY_DIALOG = '[Category List] Close update category dialog',
  CLOSE_UPDATE_CATEGORY_DIALOG_SUCCESS = '[Category List] Close update category dialog success',

  TOGGLE_SELECT_MULTIPLE_CATEGORIES = '[Category List] Toggle select multiple categories',
  SELECT_MULTIPLE_CATEGORIES = '[Category List] Select multiple categories',
  UNSELECT_MULTIPLE_CATEGORIES = '[Category List] Unselect multiple categories',

  TOGGLE_CATEGORY = '[Category List] Toggle category',
  SELECT_CATEGORY = '[Category List] Select category',
  UNSELECT_CATEGORY = '[Category List] Unselect category',

  CREATE_CATEGORY = '[Category List] Create category',
  CREATE_CATEGORY_SUCCESS = '[Category List] Create category success',
  CREATE_CATEGORY_FAILURE = '[Category List] Create category failure',

  UPDATE_CATEGORY = '[Category List] Update category',
  UPDATE_CATEGORY_SUCCESS = '[Category List] Update category success',
  UPDATE_CATEGORY_FAILURE = '[Category List] Update category failure',

  DELETE_CATEGORY = '[Category List] Delete category',
  DELETE_CATEGORY_SUCCESS = '[Category List] Delete category success',
  DELETE_CATEGORY_FAILURE = '[Category List] Delete category failure',

  DELETE_SELECTED_CATEGORIES = '[Category List] Delete selected categories',
  DELETE_SELECTED_CATEGORIES_SUCCESS = '[Category List] Delete selected categories success',
  DELETE_SELECTED_CATEGORIES_FAILURE = '[Category List] Delete selected categories failure',

  PAGINATE_CATEGORIES = '[Category List] Paginate categories',

  RESET_STATE = '[Category List] Reset state',
}

export const loadCategories = createAction(
  ECategoryListActions.LOAD_CATEGORIES
);

export const loadCategoriesSuccess = createAction(
  ECategoryListActions.LAOD_CATEGORIES_SUCCESS,
  props<{ categories: CategoryModel[] }>()
);
export const loadCategoriesFailure = createAction(
  ECategoryListActions.LAOD_CATEGORIES_FAILURE,
  props<{ error: any }>()
);

export const createCategory = createAction(
  ECategoryListActions.CREATE_CATEGORY,
  props<{ category: CategoryModel }>()
);



export const createCategorySuccess = createAction(
  ECategoryListActions.CREATE_CATEGORY_SUCCESS,
  props<{ category: CategoryModel }>()
);
export const createCategoryFailure = createAction(
  ECategoryListActions.CREATE_CATEGORY_FAILURE,
  props<{ error: any }>()
);

export const updateCategory = createAction(
  ECategoryListActions.UPDATE_CATEGORY,
  props<{ category: CategoryModel }>()
);

export const updateCategorySuccess = createAction(
  ECategoryListActions.UPDATE_CATEGORY_SUCCESS,
  props<{ category: CategoryModel }>()
);
export const updateCategoryFailure = createAction(
  ECategoryListActions.UPDATE_CATEGORY_FAILURE,
  props<{ error: any }>()
);



export const paginateCategories = createAction(
  ECategoryListActions.PAGINATE_CATEGORIES,
  props<{ pagination: PaginatedFilter }>()
);

export const setOpenedCreateCategoryDialog = createAction(
  ECategoryListActions.SET_OPENED_CREATE_CATEGORY_DIALOG,
  props<{ createCategoryDialogId?: string }>()
);

export const closeCreateCategoryDialog = createAction(
  ECategoryListActions.CLOSE_CREATE_CATEGORY_DIALOG
);

export const closeCreateCategoryDialogSuccess = createAction(
  ECategoryListActions.CLOSE_CREATE_CATEGORY_DIALOG_SUCCESS
);

export const setOpenedUpdateCategoryDialog = createAction(
  ECategoryListActions.SET_OPENED_UPDATE_CATEGORY_DIALOG,
  props<{ updateCategoryDialogId?: string }>()
);

export const closeUpdateCategoryDialog = createAction(
  ECategoryListActions.CLOSE_UPDATE_CATEGORY_DIALOG
);
export const closeUpdateCategoryDialogSuccess = createAction(
  ECategoryListActions.CLOSE_UPDATE_CATEGORY_DIALOG_SUCCESS
);

export const toggleSelectMultipleCategories = createAction(
  ECategoryListActions.TOGGLE_SELECT_MULTIPLE_CATEGORIES
);

export const selectMultipleCategories = createAction(
  ECategoryListActions.SELECT_MULTIPLE_CATEGORIES,
  props<{ categoryIds: string[] }>()
);

export const unselectMultipleCategories = createAction(
  ECategoryListActions.UNSELECT_MULTIPLE_CATEGORIES,
  props<{ categoryIds: string[] }>()
);

export const toggleCategory = createAction(
  ECategoryListActions.TOGGLE_CATEGORY,
  props<{ categoryId: string }>()
);

export const selectCategory = createAction(
  ECategoryListActions.SELECT_CATEGORY,
  props<{ categoryId: string }>()
);

export const unselectCategory = createAction(
  ECategoryListActions.UNSELECT_CATEGORY,
  props<{ categoryId: string }>()
);

export const resetState = createAction(ECategoryListActions.RESET_STATE);

const actionsUnion = union({
  loadCategories,
  loadCategoriesSuccess,
  loadCategoriesFailure,

  setOpenedCreateCategoryDialog,
  closeCreateCategoryDialog,
  closeCreateCategoryDialogSuccess,

  setOpenedUpdateCategoryDialog,
  closeUpdateCategoryDialog,
  closeUpdateCategoryDialogSuccess,

  toggleCategory,
  selectCategory,
  unselectCategory,

  createCategory,
  createCategorySuccess,
  createCategoryFailure,

  updateCategory,
  updateCategorySuccess,
  updateCategoryFailure,

  toggleSelectMultipleCategories,
  selectMultipleCategories,
  unselectMultipleCategories,

  paginateCategories,

  resetState,
});

export type EntryListActionsUnion = typeof actionsUnion;
