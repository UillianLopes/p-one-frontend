import { createAction, props, union } from '@ngrx/store';
import { CategoryModel, EEntryType, RecurrenceModel, SubCategoryModel } from '@p-one/financial';

import { FirstStepFormModel } from '../@types/first-step-form.model';
import { SecondStepFormModel } from '../@types/second-step-form.model';

export enum EEntryCreateActions {
  LOAD_CATEGORIES = '[Entry Create] Load categories',
  LOAD_CATEGORIES_SUCCESS = '[Entry Create] Load categories success',
  LOAD_CATEGORIES_FAILURE = '[Entry Create] Load categories failure',

  SET_CATEGORIES_FILTER = '[Entry Create] Set categories filter',

  LOAD_SUB_CATEGORIES = '[Entry Create] Load sub categories',
  LOAD_SUB_CATEGORIES_SUCCESS = '[Entry Create] Load sub categories success',
  LOAD_SUB_CATEGORIES_FAILURE = '[Entry Create] Load sub categories failure',

  BUILD_RECURRENCES = '[Entry Create] Build recurrences',
  BUILD_RECURRENCES_SUCCESS = '[Entry Create] Build recurrences success',
  BUILD_RECURRENCES_FAILURE = '[Entry Create] Build recurrences failure',

  SET_SUB_CATEGORIES_FILTER = '[Entry Create] Set sub categories filter',

  SET_FIRST_STEP_FORM = '[Entry Create] Set first step form',
  SET_SECOND_STEP_FORM = '[Entry Create] Set second step form',

  CREATE_ENTRY = '[Entry Create] Create entry',
  CREATE_ENTRY_SUCCESS = '[Entry Create] Create entry success',
  CREATE_ENTRY_FAILURE = '[Entry Create] Create entry failure',

  RESET_STATE = '[Entry Create] Reset state',
}

export const resetState = createAction(EEntryCreateActions.RESET_STATE);

export const loadCategories = createAction(
  EEntryCreateActions.LOAD_CATEGORIES,
  props<{ targetType: EEntryType }>()
);

export const createEntry = createAction(EEntryCreateActions.CREATE_ENTRY);

export const createEntrySuccess = createAction(
  EEntryCreateActions.CREATE_ENTRY_SUCCESS
);

export const createEntryFailure = createAction(
  EEntryCreateActions.CREATE_ENTRY_FAILURE,
  props<{ error: any }>()
);

export const loadCategoriesSuccess = createAction(
  EEntryCreateActions.LOAD_CATEGORIES_SUCCESS,
  props<{ categories: CategoryModel[] }>()
);

export const loadCategoriesFailure = createAction(
  EEntryCreateActions.LOAD_CATEGORIES_FAILURE,
  props<{ error: any }>()
);

export const setCategoriesFilter = createAction(
  EEntryCreateActions.SET_CATEGORIES_FILTER,
  props<{ categoriesFilter: string }>()
);

export const loadSubCategories = createAction(
  EEntryCreateActions.LOAD_SUB_CATEGORIES,
  props<{ categoryId: string }>()
);

export const loadSubCategoriesSuccess = createAction(
  EEntryCreateActions.LOAD_SUB_CATEGORIES_SUCCESS,
  props<{ subCategories: SubCategoryModel[] }>()
);

export const loadSubCategoriesFailure = createAction(
  EEntryCreateActions.LOAD_SUB_CATEGORIES_FAILURE,
  props<{ error: any }>()
);

export const setSubCategoriesFilter = createAction(
  EEntryCreateActions.SET_SUB_CATEGORIES_FILTER,
  props<{ subCategoriesFilter: string }>()
);

export const buildRecurrences = createAction(
  EEntryCreateActions.BUILD_RECURRENCES
);

export const buildRecurrencesSuccess = createAction(
  EEntryCreateActions.BUILD_RECURRENCES_SUCCESS,
  props<{ recurrences: RecurrenceModel[] }>()
);

export const buildRecurrencesFailure = createAction(
  EEntryCreateActions.BUILD_RECURRENCES_FAILURE,
  props<{ error: any }>()
);

export const setFirstStepForm = createAction(
  EEntryCreateActions.SET_FIRST_STEP_FORM,
  props<{ firstStepForm: FirstStepFormModel }>()
);

export const setSecondStepForm = createAction(
  EEntryCreateActions.SET_SECOND_STEP_FORM,
  props<{ secondStepForm: SecondStepFormModel }>()
);

const actionsUnion = union({
  loadCategories,
  loadCategoriesSuccess,
  loadCategoriesFailure,
  setCategoriesFilter,

  loadSubCategories,
  loadSubCategoriesSuccess,
  loadSubCategoriesFailure,
  setSubCategoriesFilter,

  buildRecurrences,
  buildRecurrencesSuccess,
  buildRecurrencesFailure,

  resetState,
});

export type EntryCreateActionsUnion = typeof actionsUnion;
