import { FormControlStatus } from '@angular/forms';
import { createAction, props, union } from '@ngrx/store';
import { CategoryModel, EEntryOperation, InstallmentModel, SubCategoryModel, WalletModel } from '@p-one/domain/financial';

import { GeneralInfoFormModel } from '../@types';
import { InstallmentsFormModel } from '../@types/installments-form.model';
import { RecurrenceFormModel } from '../@types/recurrence-form.model';

export enum EEntryCreateActions {
  LOAD_CATEGORIES = '[Entry Create] Load categories',
  LOAD_CATEGORIES_SUCCESS = '[Entry Create] Load categories success',
  LOAD_CATEGORIES_FAILURE = '[Entry Create] Load categories failure',
  SET_CATEGORIES_FILTER = '[Entry Create] Set categories filter',

  LOAD_SUB_CATEGORIES = '[Entry Create] Load sub categories',
  LOAD_SUB_CATEGORIES_SUCCESS = '[Entry Create] Load sub categories success',
  LOAD_SUB_CATEGORIES_FAILURE = '[Entry Create] Load sub categories failure',
  SET_SUB_CATEGORIES_FILTER = '[Entry Create] Set sub categories filter',

  LOAD_WALLETS = '[Entry Create] Load wallets',
  LOAD_WALLETS_SUCCESS = '[Entry Create] Load wallets success',
  LOAD_WALLETS_FAILURE = '[Entry Create] Load wallets failure',
  SET_WALLETS_FILTER = '[Entry Create] Set wallets filter',

  BUILD_INSTALLMENTS = '[Entry Create] Build installments',
  BUILD_INSTALLMENTS_SUCCESS = '[Entry Create] Build installments success',
  BUILD_INSTALLMENTS_FAILURE = '[Entry Create] Build installments failure',

  PATCH_GENERAL_INFO_FORM = '[Entry Create] Patch general info form',
  RESET_GENERAL_INFO_FORM = '[Entry Create] Reset general info form',

  PATCH_INSTALLMENTS_FORM = '[Entry Create] Patch installments form',
  RESET_INSTALLMENTS_FORM = '[Entry Create] Reset installments form',

  PATCH_RECURRENCE_FORM = '[Entry Create] Patch recurrence form',
  RESET_RECURRENCE_FORM = '[Entry Create] Reset recurrence form',

  PATCH_FORM_STATUS = '[Entry Create] Patch form status',

  CREATE_ENTRY = '[Entry Create] Create entry',
  CREATE_INSTALLMENT_ENTRIES = '[Entry Create] Create installment entries',
  CREATE_RECURRENT_ENTRY = '[Entry Create] Create recurrent entry',
  CREATE_ENTRY_SUCCESS = '[Entry Create] Create entry success',
  CREATE_ENTRY_FAILURE = '[Entry Create] Create entry failure',

  RESET_STATE = '[Entry Create] Reset state',
}

export const resetState = createAction(EEntryCreateActions.RESET_STATE);

export const createEntry = createAction(EEntryCreateActions.CREATE_ENTRY);

export const createInstallmentEntries = createAction(
  EEntryCreateActions.CREATE_INSTALLMENT_ENTRIES
);

export const createRecurrentEntry = createAction(
  EEntryCreateActions.CREATE_RECURRENT_ENTRY
);

export const createEntrySuccess = createAction(
  EEntryCreateActions.CREATE_ENTRY_SUCCESS
);

export const createEntryFailure = createAction(
  EEntryCreateActions.CREATE_ENTRY_FAILURE,
  props<{ error: any }>()
);

export const loadCategories = createAction(
  EEntryCreateActions.LOAD_CATEGORIES,
  props<{ targetOperation: EEntryOperation }>()
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

export const loadWallets = createAction(EEntryCreateActions.LOAD_WALLETS);

export const loadWalletsSuccess = createAction(
  EEntryCreateActions.LOAD_WALLETS_SUCCESS,
  props<{ wallets: WalletModel[] }>()
);

export const loadWalletsFailure = createAction(
  EEntryCreateActions.LOAD_WALLETS_FAILURE,
  props<{ error: any }>()
);

export const setWalletsFilter = createAction(
  EEntryCreateActions.SET_WALLETS_FILTER,
  props<{ walletsFilter: string }>()
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

export const buildInstallments = createAction(
  EEntryCreateActions.BUILD_INSTALLMENTS
);

export const buildInstallmentsSuccess = createAction(
  EEntryCreateActions.BUILD_INSTALLMENTS_SUCCESS,
  props<{ installments: InstallmentModel[] }>()
);

export const buildInstallmentsFailure = createAction(
  EEntryCreateActions.BUILD_INSTALLMENTS_FAILURE,
  props<{ error: unknown }>()
);

export const patchGeneralInfoForm = createAction(
  EEntryCreateActions.PATCH_GENERAL_INFO_FORM,
  props<{ generalInfoForm: Partial<GeneralInfoFormModel> }>()
);

export const resetGeneralInfoForm = createAction(
  EEntryCreateActions.RESET_GENERAL_INFO_FORM
);

export const patchInstallmentsForm = createAction(
  EEntryCreateActions.PATCH_INSTALLMENTS_FORM,
  props<{ installmentsForm: Partial<InstallmentsFormModel> }>()
);

export const resetInstallmentsForm = createAction(
  EEntryCreateActions.RESET_INSTALLMENTS_FORM
);

export const patchFormStatus = createAction(
  EEntryCreateActions.PATCH_FORM_STATUS,
  props<{ formKey: string; status: FormControlStatus }>()
);

export const patchRecurrenceForm = createAction(
  EEntryCreateActions.PATCH_RECURRENCE_FORM,
  props<{ recurrenceForm: Partial<RecurrenceFormModel> }>()
);

export const resetRecurrenceForm = createAction(
  EEntryCreateActions.RESET_RECURRENCE_FORM
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

  loadWallets,
  loadWalletsSuccess,
  loadWalletsFailure,
  setWalletsFilter,

  patchInstallmentsForm,
  resetInstallmentsForm,

  patchGeneralInfoForm,
  resetGeneralInfoForm,

  patchRecurrenceForm,
  resetRecurrenceForm,

  buildInstallments,
  buildInstallmentsSuccess,
  buildInstallmentsFailure,

  createEntry,
  createInstallmentEntries,
  createRecurrentEntry,

  patchFormStatus,

  resetState,
});

export type EntryCreateActionsUnion = typeof actionsUnion;
