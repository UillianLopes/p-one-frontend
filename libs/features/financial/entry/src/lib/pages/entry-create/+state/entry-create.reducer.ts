import { Action, createReducer, on } from '@ngrx/store';
import {
  CategoryModel,
  RecurrenceModel,
  SubCategoryModel,
} from '@p-one/domain/financial';

import { FirstStepFormModel } from '../@types/first-step-form.model';
import { SecondStepFormModel } from '../@types/second-step-form.model';
import {
  buildRecurrences,
  buildRecurrencesFailure,
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
  isBuildingRecurrences: boolean;

  subCategoriesFilter?: string;
  subCategories?: SubCategoryModel[];

  categoriesFilter?: string;
  categories?: CategoryModel[];

  recurrences: RecurrenceModel[];

  firstStepForm: Partial<FirstStepFormModel>;
  secondStepForm: Partial<SecondStepFormModel>;

  error?: unknown;
}

const initialState: EntryCreateState = {
  loading: false,
  isBuildingRecurrences: false,
  firstStepForm: {},
  secondStepForm: {},
  recurrences: []
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

  on(buildRecurrences, (state) => {
    return {
      ...state,
      isBuildingRecurrences: true,
    };
  }),

  on(buildRecurrencesSuccess, (state, { recurrences }) => {
    return {
      ...state,
      recurrences,
      isBuildingRecurrences: false,
    };
  }),

  on(buildRecurrencesFailure, (state, { error }) => {
    return {
      ...state,
      error,
      isBuildingRecurrences: false,
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
      recurrences: [],
    };
  }),

  on(resetState, () => {
    return {
      ...initialState,
    };
  })
);

export function entryCreateReducer(state: EntryCreateState, action: Action) {
  return _entryCreateReducer(state, action);
}
