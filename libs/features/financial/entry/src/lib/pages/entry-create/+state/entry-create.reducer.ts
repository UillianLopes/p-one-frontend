import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { FormStatusModel } from '@p-one/core';
import { CategoryModel, InstallmentModel, SubCategoryModel } from '@p-one/domain/financial';

import { GeneralInfoFormModel } from '../@types';
import { InstallmentsFormModel } from '../@types/installments-form.model';
import { RecurrenceFormModel } from '../@types/recurrence-form.model';
import {
  buildInstallments,
  buildInstallmentsFailure,
  buildInstallmentsSuccess,
  loadCategoriesFailure,
  loadCategoriesSuccess,
  loadSubCategoriesFailure,
  loadSubCategoriesSuccess,
  patchFormStatus,
  patchGeneralInfoForm,
  patchInstallmentsForm,
  patchRecurrenceForm,
  resetGeneralInfoForm,
  resetInstallmentsForm,
  resetRecurrenceForm,
  resetState,
  setCategoriesFilter,
  setSubCategoriesFilter,
} from './entry-create.actions';

export const ENTRY_CREATE_KEY = 'ENTRY_CREATE';

export interface EntryCreateState {
  loading: boolean;
  isBuildingRecurrences: boolean;

  subCategoriesFilter?: string;
  subCategories?: SubCategoryModel[];

  categoriesFilter?: string;
  categories?: CategoryModel[];

  installments: InstallmentModel[];

  generalInfoForm: Partial<GeneralInfoFormModel>;
  installmentsForm: Partial<InstallmentsFormModel>;
  recurrenceForm: Partial<RecurrenceFormModel>;

  formStatus: FormStatusModel;

  error?: unknown;
}

const initialState: EntryCreateState = {
  loading: false,
  isBuildingRecurrences: false,
  generalInfoForm: {},
  installmentsForm: {},
  recurrenceForm: {},
  installments: [],
  formStatus: {},
};

const _entryCreateReducer = createReducer<EntryCreateState>(
  initialState,

  on(loadCategoriesSuccess, (state, { categories }) => {
    return {
      ...state,
      categories,
      subCategories: [],
    };
  }),

  on(loadCategoriesFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),

  on(loadSubCategoriesSuccess, (state, { subCategories }) => {
    return {
      ...state,
      subCategories,
    };
  }),

  on(loadSubCategoriesFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),

  on(setCategoriesFilter, (state, { categoriesFilter }) => {
    return {
      ...state,
      categoriesFilter,
    };
  }),

  on(setSubCategoriesFilter, (state, { subCategoriesFilter }) => {
    return {
      ...state,
      subCategoriesFilter,
    };
  }),

  on(buildInstallments, (state) => {
    return {
      ...state,
      isBuildingRecurrences: true,
    };
  }),

  on(buildInstallmentsSuccess, (state, { installments }) => {
    return {
      ...state,
      installments,
      isBuildingRecurrences: false,
    };
  }),

  on(buildInstallmentsFailure, (state, { error }) => {
    return {
      ...state,
      error,
      isBuildingRecurrences: false,
    };
  }),

  on(patchGeneralInfoForm, ({ generalInfoForm, ...state }, action) => {
    return {
      ...state,
      generalInfoForm: {
        ...generalInfoForm,
        ...action.generalInfoForm,
      },
    };
  }),

  on(patchInstallmentsForm, ({ installmentsForm, ...state }, action) => {
    return {
      ...state,
      installmentsForm: {
        ...installmentsForm,
        ...action.installmentsForm,
      },
      installments: [],
    };
  }),

  on(patchRecurrenceForm, ({ recurrenceForm, ...state }, action) => {
    return {
      ...state,
      recurrenceForm: {
        ...recurrenceForm,
        ...action.recurrenceForm,
      },
      installments: [],
    };
  }),

  on(resetRecurrenceForm, (state) => ({ ...state, recurrenceForm: {} })),
  on(resetGeneralInfoForm, (state) => ({ ...state, generalInfoForm: {} })),
  on(resetInstallmentsForm, (state) => ({ ...state, installmentsForm: {} })),

  on(patchFormStatus, ({ formStatus, ...state }, { formKey, status }) => ({
    ...state,
    formStatus: {
      ...formStatus,
      [formKey]: status,
    },
  })),

  on(resetState, () => {
    return {
      ...initialState,
    };
  })
);

export function entryCreateReducer(state: EntryCreateState, action: Action) {
  return _entryCreateReducer(state, action);
}
