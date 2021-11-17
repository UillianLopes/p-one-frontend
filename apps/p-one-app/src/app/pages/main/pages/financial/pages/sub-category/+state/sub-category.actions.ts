import { createAction, props, union } from '@ngrx/store';
import { CategoryFilter, CategoryModel, PaginatedFilter, SubCategoryModel, UpdateSubCategoryRequest } from '@p-one/core';

import {
  CreateSubCategoryRequest,
} from '../../../../../../../../../../../libs/core/src/lib/models/requests/create-sub-category.request';

export enum ESubCategoryActions {
  LOAD_SUB_CATEGORIES = '[Sub Category] Load sub categories',
  LAOD_SUB_CATEGORIES_SUCCESS = '[Sub Category] Load sub categories success',
  LAOD_SUB_CATEGORIES_FAILURE = '[Sub Category] Load sub categories fail',

  SET_OPENED_CREATE_SUB_CATEGORY_DIALOG = '[Sub Category] Set opened create sub category dialog',
  CLOSE_CREATE_SUB_CATEGORY_DIALOG = '[Sub Category] Close create sub category dialog',
  CLOSE_CREATE_SUB_CATEGORY_DIALOG_SUCCESS = '[Sub Category] Close create sub category dialog success',

  SET_OPENED_UPDATE_SUB_CATEGORY_DIALOG = '[Sub Category] Set opened update sub category dialog',
  CLOSE_UPDATE_SUB_CATEGORY_DIALOG = '[Sub Category] Close update sub category dialog',
  CLOSE_UPDATE_SUB_CATEGORY_DIALOG_SUCCESS = '[Sub Category] Close update sub category dialog success',

  TOGGLE_SELECT_MULTIPLE_SUB_CATEGORIES = '[Sub Category] Toggle select multiple sub categories',
  SELECT_MULTIPLE_SUB_CATEGORIES = '[Sub Category] Select multiple sub categories',
  UNSELECT_MULTIPLE_SUB_CATEGORIES = '[Sub Category] Unselect multiple sub categories',

  TOGGLE_SUB_CATEGORY = '[Sub Category] Toggle sub category',
  SELECT_SUB_CATEGORY = '[Sub Category] Select sub category',
  UNSELECT_SUB_CATEGORY = '[Sub Category] Unselect sub category',

  CREATE_SUB_CATEGORY = '[Sub Category] Create category',
  CREATE_SUB_CATEGORY_SUCCESS = '[Sub Category] Create sub category success',
  CREATE_SUB_CATEGORY_FAILURE = '[Sub Category] Create sub category failure',

  UPDATE_SUB_CATEGORY = '[Sub Category] Update category',
  UPDATE_SUB_CATEGORY_SUCCESS = '[Sub Category] Update sub category success',
  UPDATE_SUB_CATEGORY_FAILURE = '[Sub Category] Update sub category failure',

  SET_OPENED_DELETE_SUB_CATEGORY_DIALOG = '[Sub Category] Set opened delete sub category dialog',
  CLOSE_DELETE_SUB_CATEGORY_DIALOG = '[Sub Category] Close delete sub category dialog',
  CLOSE_DELETE_SUB_CATEGORY_DIALOG_SUCCESS = '[Sub Category] Close delete sub category dialog success',

  DELETE_SUB_CATEGORY = '[Sub Category] Delete sub category',
  DELETE_SUB_CATEGORY_SUCCESS = '[Sub Category] Delete sub category success',
  DELETE_SUB_CATEGORY_FAILURE = '[Sub Category] Delete sub category failure',

  DELETE_SELECTED_SUB_CATEGORIES = '[Sub Category] Delete selected sub categories',
  DELETE_SELECTED_SUB_CATEGORIES_SUCCESS = '[Sub Category] Delete selected sub categories success',
  DELETE_SELECTED_SUB_CATEGORIES_FAILURE = '[Sub Category] Delete selected sub categories failure',

  SET_SUB_CATEGORIES_PAGE = '[Sub Category] Set sub categories  page',
  PAGINATE_SUB_CATEGORIES = '[Sub Category] Paginate sub categories',
  FILTER_SUB_CATEGORIES = '[Sub Category] Filter sub categories',

  LOAD_CATEGORIES = '[Sub Category] Load categories',
  LOAD_CATEGORIES_SUCCESS = '[Sub Category] Load categories success',
  LOAD_CATEGORIES_FAILURE = '[Sub Category] Load categories failure',
  RESET_CATEGORIES = '[Sub Category] Reset categories',
  SET_CATEGORIES_FILTER = '[Sub Category] Set categories filter',

  RESET_STATE = '[Sub Category] Reset state',
}

export const loadSubCategories = createAction(
  ESubCategoryActions.LOAD_SUB_CATEGORIES
);

export const loadSubCategoriesSuccess = createAction(
  ESubCategoryActions.LAOD_SUB_CATEGORIES_SUCCESS,
  props<{ categories: CategoryModel[] }>()
);
export const loadSubCategoriesFailure = createAction(
  ESubCategoryActions.LAOD_SUB_CATEGORIES_FAILURE,
  props<{ error: any }>()
);

export const createSubCategory = createAction(
  ESubCategoryActions.CREATE_SUB_CATEGORY,
  props<{ createSubCategoryRequest: CreateSubCategoryRequest }>()
);

export const createSubCategorySuccess = createAction(
  ESubCategoryActions.CREATE_SUB_CATEGORY_SUCCESS,
  props<{ category: CategoryModel }>()
);
export const createSubCategoryFailure = createAction(
  ESubCategoryActions.CREATE_SUB_CATEGORY_FAILURE,
  props<{ error: any }>()
);

export const updateSubCategory = createAction(
  ESubCategoryActions.UPDATE_SUB_CATEGORY,
  props<{ updateSubCategoryRequest: UpdateSubCategoryRequest }>()
);

export const updateSubCategorySuccess = createAction(
  ESubCategoryActions.UPDATE_SUB_CATEGORY_SUCCESS,
  props<{ subCategory: SubCategoryModel }>()
);
export const updateSubCategoryFailure = createAction(
  ESubCategoryActions.UPDATE_SUB_CATEGORY_FAILURE,
  props<{ error: any }>()
);

export const paginateSubCategories = createAction(
  ESubCategoryActions.PAGINATE_SUB_CATEGORIES,
  props<{ pagination: PaginatedFilter }>()
);

export const setOpenedCreateSubCategoryDialog = createAction(
  ESubCategoryActions.SET_OPENED_CREATE_SUB_CATEGORY_DIALOG,
  props<{ createCategoryDialogId?: string }>()
);

export const closeCreateSubCategoryDialog = createAction(
  ESubCategoryActions.CLOSE_CREATE_SUB_CATEGORY_DIALOG
);

export const closeCreateSubCategoryDialogSuccess = createAction(
  ESubCategoryActions.CLOSE_CREATE_SUB_CATEGORY_DIALOG_SUCCESS
);

export const setOpenedUpdateSubCategoryDialog = createAction(
  ESubCategoryActions.SET_OPENED_UPDATE_SUB_CATEGORY_DIALOG,
  props<{ updateCategoryDialogId?: string }>()
);

export const closeUpdateSubCategoryDialog = createAction(
  ESubCategoryActions.CLOSE_UPDATE_SUB_CATEGORY_DIALOG
);

export const closeUpdateSubCategoryDialogSuccess = createAction(
  ESubCategoryActions.CLOSE_UPDATE_SUB_CATEGORY_DIALOG_SUCCESS
);

export const toggleSelectMultipleSubCategories = createAction(
  ESubCategoryActions.TOGGLE_SELECT_MULTIPLE_SUB_CATEGORIES
);

export const selectMultipleSubCategories = createAction(
  ESubCategoryActions.SELECT_MULTIPLE_SUB_CATEGORIES,
  props<{ subCategoryIds: string[] }>()
);

export const unselectMultipleSubCategories = createAction(
  ESubCategoryActions.UNSELECT_MULTIPLE_SUB_CATEGORIES,
  props<{ subCategoryIds: string[] }>()
);

export const toggleSubCategory = createAction(
  ESubCategoryActions.TOGGLE_SUB_CATEGORY,
  props<{ subCategoryId: string }>()
);

export const selectSubCategory = createAction(
  ESubCategoryActions.SELECT_SUB_CATEGORY,
  props<{ subCategoryId: string }>()
);

export const unselectSubCategory = createAction(
  ESubCategoryActions.UNSELECT_SUB_CATEGORY,
  props<{ subCategoryId: string }>()
);

export const setOpenedDeleteSubCategoryDialog = createAction(
  ESubCategoryActions.SET_OPENED_DELETE_SUB_CATEGORY_DIALOG,
  props<{ deleteSubCategoryDialogId?: string }>()
);

export const closeDeleteSubCategoryDialog = createAction(
  ESubCategoryActions.CLOSE_DELETE_SUB_CATEGORY_DIALOG
);

export const closeDeleteSubCategoryDialogSuccess = createAction(
  ESubCategoryActions.CLOSE_DELETE_SUB_CATEGORY_DIALOG_SUCCESS
);

export const deleteSubCategory = createAction(
  ESubCategoryActions.DELETE_SUB_CATEGORY,
  props<{ subCategoryId: string }>()
);

export const deleteSubCategorySuccess = createAction(
  ESubCategoryActions.DELETE_SUB_CATEGORY_SUCCESS,
  props<{ subCategoryId: string }>()
);

export const deleteSubCategoryFailure = createAction(
  ESubCategoryActions.DELETE_SUB_CATEGORY_FAILURE,
  props<{ error: any }>()
);

export const deleteSelectedSubCategories = createAction(
  ESubCategoryActions.DELETE_SELECTED_SUB_CATEGORIES
);

export const deleteSelectedSubCategoriesSuccess = createAction(
  ESubCategoryActions.DELETE_SELECTED_SUB_CATEGORIES_SUCCESS,
  props<{ subCategoriesIds: string[] }>()
);

export const deleteSelectedSubCategoriesFailure = createAction(
  ESubCategoryActions.DELETE_SELECTED_SUB_CATEGORIES_FAILURE,
  props<{ error: any }>()
);

export const filterSubCategories = createAction(
  ESubCategoryActions.FILTER_SUB_CATEGORIES,
  props<{ filter: CategoryFilter }>()
);

export const setSubCategoriesPage = createAction(
  ESubCategoryActions.SET_SUB_CATEGORIES_PAGE,
  props<{ page: number }>()
);

export const loadCategories = createAction(ESubCategoryActions.LOAD_CATEGORIES);

export const loadCategoriesSuccess = createAction(
  ESubCategoryActions.LOAD_CATEGORIES_SUCCESS,
  props<{ categories: CategoryModel[] }>()
);
export const loadCategoriesFailure = createAction(
  ESubCategoryActions.LOAD_CATEGORIES_FAILURE,
  props<{ error: any }>()
);

export const resetCategories = createAction(
  ESubCategoryActions.RESET_CATEGORIES
);

export const setCategoriesFilter = createAction(
  ESubCategoryActions.SET_CATEGORIES_FILTER,
  props<{ categoryFilter: string }>()
);

export const resetState = createAction(ESubCategoryActions.RESET_STATE);

const actionsUnion = union({
  loadSubCategories,
  loadSubCategoriesSuccess,
  loadSubCategoriesFailure,

  setOpenedCreateSubCategoryDialog,
  closeCreateSubCategoryDialog,
  closeCreateSubCategoryDialogSuccess,

  setOpenedUpdateSubCategoryDialog,
  closeUpdateSubCategoryDialog,
  closeUpdateSubCategoryDialogSuccess,

  toggleSubCategory,
  selectSubCategory,
  unselectSubCategory,

  createSubCategory,
  createSubCategorySuccess,
  createSubCategoryFailure,

  updateSubCategory,
  updateSubCategorySuccess,
  updateSubCategoryFailure,

  deleteSelectedSubCategories,
  deleteSelectedSubCategoriesSuccess,
  deleteSelectedSubCategoriesFailure,

  deleteSubCategory,
  deleteSubCategorySuccess,
  deleteSubCategoryFailure,

  toggleSelectMultipleSubCategories,
  selectMultipleSubCategories,
  unselectMultipleSubCategories,

  paginateSubCategories,

  loadCategories,
  loadCategoriesSuccess,
  loadCategoriesFailure,
  resetCategories,

  resetState,
});

export type EntryListActionsUnion = typeof actionsUnion;
