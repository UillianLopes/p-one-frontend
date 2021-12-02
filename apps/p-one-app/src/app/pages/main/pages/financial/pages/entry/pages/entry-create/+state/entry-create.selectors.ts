import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import { EntryRecurrence } from '../../../../../../../../../../../../../libs/core/src';
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

export const recurrencesSelector = createSelector(
  stateSelector,
  (state) => state.recurrences
);

export const firstStepFormSelector = createSelector(
  stateSelector,
  (state) => state.firstStepForm
);

export const secondStepFormSelector = createSelector(
  stateSelector,
  (state) => state.secondStepForm
);

export const recurrenceSelector = createSelector(
  secondStepFormSelector,
  (secondStepForm) => secondStepForm?.recurrence
);

export const isLoadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
);

export const isFirstStepInvalidSelector = createSelector(
  firstStepFormSelector,
  (form) =>
    !(
      !!form &&
      !!form.title &&
      form.title != '' &&
      !!form.type &&
      !!form.category &&
      typeof form.subCategory == 'object' &&
      typeof form.category == 'object'
    )
);

export const isSecondStepInvalidSelector = createSelector(
  secondStepFormSelector,
  recurrencesSelector,
  (form, recurrences) => {
    if (!(form && form.dueDate && form.value)) {
      return true;
    }

    if (form.recurrence === EntryRecurrence.OneTime) {
      return recurrences?.length > 0;
    }

    return recurrences?.length < 1;
  }
);
export const isBuildingRecurrencesSelector = createSelector(
  stateSelector,
  (state) => state.isBuildingRecurrences
);
