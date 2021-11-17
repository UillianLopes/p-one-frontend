import { Action, createReducer, on } from '@ngrx/store';
import { CategoryModel, RecurrenceModel, SubCategoryModel } from '@p-one/core';

import { FirstStepFormModel } from '../@types/first-step-form.model';
import { SecondStepFormModel } from '../@types/second-step-form.model';
import {
    buildRecurrencesSuccess,
    loadCategoriesFailure,
    loadCategoriesSuccess,
    loadSubCategoriesFailure,
    loadSubCategoriesSuccess,
    resetState,
    setCategoriesFilter,
    setFirstStepForm,
    setSecondStepForm,
    setSubCategoriesFilter,
} from './entry-create.actions';

export const ENTRY_CREATE_KEY = 'ENTRY_CREATE';

export interface EntryCreateState {
  loading: boolean;

  subCategoriesFilter?: string;
  subCategories?: SubCategoryModel[];

  categoriesFilter?: string;
  categories?: CategoryModel[];

  recurrences?: RecurrenceModel[];

  firstStepForm?: FirstStepFormModel;
  secondStepForm?: SecondStepFormModel;

  error?: any;
}

const initialState: EntryCreateState = {
  loading: false,
};

const _entryCreateReducer = createReducer<EntryCreateState>(
  initialState,

  on(loadCategoriesSuccess, (state, { categories }) => {
    return {
      ...state,
      categories,
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

  on(buildRecurrencesSuccess, (state, { recurrences }) => {
    return {
      ...state,
      recurrences,
    };
  }),

  on(setFirstStepForm, (state, { firstStepForm }) => {
    return {
      ...state,
      firstStepForm,
    };
  }),

  on(setSecondStepForm, (state, { secondStepForm }) => {
    return {
      ...state,
      secondStepForm,
    };
  }),

  on(resetState, (_) => {
    return {
      ...initialState,
    };
  })
);

export function entryCreateReducer(state: EntryCreateState, action: Action) {
  return _entryCreateReducer(state, action);
}
