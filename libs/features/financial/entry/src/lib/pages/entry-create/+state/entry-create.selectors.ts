import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import { ENTRY_CREATE_KEY, EntryCreateState } from './entry-create.reducer';

export const stateSelector =
  createFeatureSelector<EntryCreateState>(ENTRY_CREATE_KEY);

const categoriesFilterSelector = createSelector(
  stateSelector,
  (state) => state.categoriesFilter?.toLowerCase() ?? ''
);

const categoriesSelector = createSelector(
  stateSelector,
  (state) => state.categories
);

export const filtredCategoriesSelector = createSelector(
  categoriesSelector,
  categoriesFilterSelector,
  (categories, filter) =>
    _.filter(categories, (sc) => sc.name.toLowerCase().indexOf(filter) >= 0)
);

const subCategoriesSelector = createSelector(
  stateSelector,
  (state) => state.subCategories
);

const subCategoriesFilterSelector = createSelector(
  stateSelector,
  (state) => state.subCategoriesFilter?.toLowerCase() ?? ''
);

export const filtredSubCategoriesSelector = createSelector(
  subCategoriesSelector,
  subCategoriesFilterSelector,
  (subCategories, filter) =>
    _.filter(subCategories, (sc) => sc.name.toLowerCase().indexOf(filter) >= 0)
);

const walletsSelector = createSelector(stateSelector, (state) => state.wallets);

const walletsFilterSelector = createSelector(
  stateSelector,
  (state) => state.walletsFilter?.toLowerCase() ?? ''
);

export const filtredWalletsSelector = createSelector(
  walletsSelector,
  walletsFilterSelector,
  (wallets, filter) =>
    _.filter(wallets, (sc) => sc.name.toLowerCase().indexOf(filter) >= 0)
);

export const installmentsSelector = createSelector(
  stateSelector,
  ({ installments }) => installments
);

export const generalInfoFormSelector = createSelector(
  stateSelector,
  ({ generalInfoForm }) => generalInfoForm
);

export const generalInfoFormTypeSelector = createSelector(
  generalInfoFormSelector,
  ({ type }) => type
);

export const generalInfoFormOperationSelector = createSelector(
  generalInfoFormSelector,
  ({ operation }) => operation
);
export const generalInfoFormCurrencySelector = createSelector(
  generalInfoFormSelector,
  ({ currency }) => currency
);

export const generalInfoFormValueSelector = createSelector(
  generalInfoFormSelector,
  ({ value }) => value
);

export const generalInfoFormPaidSelector = createSelector(
  generalInfoFormSelector,
  ({ paid }) => paid
);
export const installmentsFormSelector = createSelector(
  stateSelector,
  ({ installmentsForm }) => installmentsForm
);

export const installmentsFormRecurrenceSelector = createSelector(
  installmentsFormSelector,
  ({ recurrence }) => recurrence
);

export const recurrenceFormSelector = createSelector(
  stateSelector,
  ({ recurrenceForm }) => recurrenceForm
);

export const recurrenceFormRecurrenceSelector = createSelector(
  recurrenceFormSelector,
  ({ recurrence }) => recurrence
);

export const isLoadingSelector = createSelector(
  stateSelector,
  ({ loading }) => loading
);

export const isBuildingRecurrencesSelector = createSelector(
  stateSelector,
  ({ isBuildingRecurrences }) => isBuildingRecurrences
);

export const formStatusSelector = createSelector(
  stateSelector,
  ({ formStatus }) => formStatus
);
