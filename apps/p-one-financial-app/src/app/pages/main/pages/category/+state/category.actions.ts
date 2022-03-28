import { createAction, props, union } from '@ngrx/store';
import {
  CategoryFilter,
  CategoryModel,
  CreateCategoryRequest,
  PaginatedFilter,
  UpdateCategoryRequest,
} from '@p-one/financial';

export enum ECategoryActions {
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

  SET_OPENED_DELETE_CATEGORY_DIALOG = '[Category List] Set opened delete category dialog',
  CLOSE_DELETE_CATEGORY_DIALOG = '[Category List] Close delete category dialog',
  CLOSE_DELETE_CATEGORY_DIALOG_SUCCESS = '[Category List] Close delete category dialog success',

  DELETE_CATEGORY = '[Category List] Delete category',
  DELETE_CATEGORY_SUCCESS = '[Category List] Delete category success',
  DELETE_CATEGORY_FAILURE = '[Category List] Delete category failure',

  DELETE_SELECTED_CATEGORIES = '[Category List] Delete selected categories',
  DELETE_SELECTED_CATEGORIES_SUCCESS = '[Category List] Delete selected categories success',
  DELETE_SELECTED_CATEGORIES_FAILURE = '[Category List] Delete selected categories failure',

  SET_CATEGORIES_PAGE = '[Category List] Set categories page',
  PAGINATE_CATEGORIES = '[Category List] Paginate categories',
  FILTER_CATEGORIES = '[Category List] Filter categories',

  RESET_STATE = '[Category List] Reset state',
}

export const loadCategories = createAction(ECategoryActions.LOAD_CATEGORIES);

export const loadCategoriesSuccess = createAction(
  ECategoryActions.LAOD_CATEGORIES_SUCCESS,
  props<{ categories: CategoryModel[] }>()
);
export const loadCategoriesFailure = createAction(
  ECategoryActions.LAOD_CATEGORIES_FAILURE,
  props<{ error: any }>()
);

export const createCategory = createAction(
  ECategoryActions.CREATE_CATEGORY,
  props<{ createCategoryRequest: CreateCategoryRequest }>()
);

export const createCategorySuccess = createAction(
  ECategoryActions.CREATE_CATEGORY_SUCCESS,
  props<{ category: CategoryModel }>()
);
export const createCategoryFailure = createAction(
  ECategoryActions.CREATE_CATEGORY_FAILURE,
  props<{ error: any }>()
);

export const updateCategory = createAction(
  ECategoryActions.UPDATE_CATEGORY,
  props<{ updateCategoryRequest: UpdateCategoryRequest }>()
);

export const updateCategorySuccess = createAction(
  ECategoryActions.UPDATE_CATEGORY_SUCCESS,
  props<{ category: CategoryModel }>()
);
export const updateCategoryFailure = createAction(
  ECategoryActions.UPDATE_CATEGORY_FAILURE,
  props<{ error: any }>()
);

export const paginateCategories = createAction(
  ECategoryActions.PAGINATE_CATEGORIES,
  props<{ pagination: PaginatedFilter }>()
);

export const setOpenedCreateCategoryDialog = createAction(
  ECategoryActions.SET_OPENED_CREATE_CATEGORY_DIALOG,
  props<{ createCategoryDialogId?: string }>()
);

export const closeCreateCategoryDialog = createAction(
  ECategoryActions.CLOSE_CREATE_CATEGORY_DIALOG
);

export const closeCreateCategoryDialogSuccess = createAction(
  ECategoryActions.CLOSE_CREATE_CATEGORY_DIALOG_SUCCESS
);

export const setOpenedUpdateCategoryDialog = createAction(
  ECategoryActions.SET_OPENED_UPDATE_CATEGORY_DIALOG,
  props<{ updateCategoryDialogId?: string }>()
);

export const closeUpdateCategoryDialog = createAction(
  ECategoryActions.CLOSE_UPDATE_CATEGORY_DIALOG
);

export const closeUpdateCategoryDialogSuccess = createAction(
  ECategoryActions.CLOSE_UPDATE_CATEGORY_DIALOG_SUCCESS
);

export const toggleSelectMultipleCategories = createAction(
  ECategoryActions.TOGGLE_SELECT_MULTIPLE_CATEGORIES
);

export const selectMultipleCategories = createAction(
  ECategoryActions.SELECT_MULTIPLE_CATEGORIES,
  props<{ categoryIds: string[] }>()
);

export const unselectMultipleCategories = createAction(
  ECategoryActions.UNSELECT_MULTIPLE_CATEGORIES,
  props<{ categoryIds: string[] }>()
);

export const toggleCategory = createAction(
  ECategoryActions.TOGGLE_CATEGORY,
  props<{ categoryId: string }>()
);

export const selectCategory = createAction(
  ECategoryActions.SELECT_CATEGORY,
  props<{ categoryId: string }>()
);

export const unselectCategory = createAction(
  ECategoryActions.UNSELECT_CATEGORY,
  props<{ categoryId: string }>()
);

export const setOpenedDeleteCategoryDialog = createAction(
  ECategoryActions.SET_OPENED_DELETE_CATEGORY_DIALOG,
  props<{ deleteCategoryDialogId?: string }>()
);

export const closeDeleteCategoryDialog = createAction(
  ECategoryActions.CLOSE_DELETE_CATEGORY_DIALOG
);

export const closeDeleteCategoryDialogSuccess = createAction(
  ECategoryActions.CLOSE_DELETE_CATEGORY_DIALOG_SUCCESS
);

export const deleteCategory = createAction(
  ECategoryActions.DELETE_CATEGORY,
  props<{ categoryId: string }>()
);

export const deleteCategorySuccess = createAction(
  ECategoryActions.DELETE_CATEGORY_SUCCESS,
  props<{ categoryId: string }>()
);

export const deleteCategoryFailure = createAction(
  ECategoryActions.DELETE_CATEGORY_FAILURE,
  props<{ error: any }>()
);

export const deleteSelectedCategories = createAction(
  ECategoryActions.DELETE_SELECTED_CATEGORIES
);

export const deleteSelectedCategoriesSuccess = createAction(
  ECategoryActions.DELETE_SELECTED_CATEGORIES_SUCCESS,
  props<{ categoriesIds: string[] }>()
);

export const deleteSelectedCategoriesFailure = createAction(
  ECategoryActions.DELETE_SELECTED_CATEGORIES_FAILURE,
  props<{ error: any }>()
);

export const filterCategories = createAction(
  ECategoryActions.FILTER_CATEGORIES,
  props<{ filter: CategoryFilter }>()
);

export const setCategoriesPage = createAction(
  ECategoryActions.SET_CATEGORIES_PAGE,
  props<{ page: number }>()
);

export const resetState = createAction(ECategoryActions.RESET_STATE);

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

  deleteSelectedCategories,
  deleteSelectedCategoriesSuccess,
  deleteSelectedCategoriesFailure,

  deleteCategory,
  deleteCategorySuccess,
  deleteCategoryFailure,

  toggleSelectMultipleCategories,
  selectMultipleCategories,
  unselectMultipleCategories,

  paginateCategories,

  resetState,
});

export type EntryListActionsUnion = typeof actionsUnion;
