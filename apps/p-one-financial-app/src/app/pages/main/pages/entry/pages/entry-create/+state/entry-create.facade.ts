import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EEntryType } from '@p-one/financial';

import { FirstStepFormModel } from '../@types/first-step-form.model';
import { SecondStepFormModel } from '../@types/second-step-form.model';
import {
  buildRecurrences,
  createEntry,
  loadCategories,
  loadSubCategories,
  resetState,
  setCategoriesFilter,
  setFirstStepForm,
  setSecondStepForm,
  setSubCategoriesFilter,
} from './entry-create.actions';
import { EntryCreateState } from './entry-create.reducer';
import * as EntryCreateSelectors from './entry-create.selectors';

@Injectable()
export class EntryCreateFacade {
  readonly filtredSubCategories$ = this._store.select(
    EntryCreateSelectors.filtredSubCategoriesSelector
  );

  readonly filtredCategories$ = this._store.select(
    EntryCreateSelectors.filtredCategoriesSelector
  );

  readonly isLoading$ = this._store.select(
    EntryCreateSelectors.isLoadingSelector
  );

  readonly recurrences$ = this._store.select(
    EntryCreateSelectors.recurrencesSelector
  );

  readonly recurrence$ = this._store.select(
    EntryCreateSelectors.recurrenceSelector
  );

  readonly firstStepForm$ = this._store.select(
    EntryCreateSelectors.firstStepFormSelector
  );

  readonly secondStepForm$ = this._store.select(
    EntryCreateSelectors.secondStepFormSelector
  );

  readonly isFirstStepInvalid$ = this._store.select(
    EntryCreateSelectors.isFirstStepInvalidSelector
  );

  readonly isSecondStepInvalid$ = this._store.select(
    EntryCreateSelectors.isSecondStepInvalidSelector
  );

  readonly isBuildingRecurrences$ = this._store.select(
    EntryCreateSelectors.isBuildingRecurrencesSelector
  );

  constructor(private readonly _store: Store<EntryCreateState>) {}

  setFirstStepForm(firstStepForm: FirstStepFormModel) {
    this._store.dispatch(setFirstStepForm({ firstStepForm }));
  }

  setSecondStepForm(secondStepForm: SecondStepFormModel) {
    this._store.dispatch(setSecondStepForm({ secondStepForm }));
  }

  setCategoriesFilter(categoriesFilter: string) {
    this._store.dispatch(setCategoriesFilter({ categoriesFilter }));
  }

  setSubCategoriesFilter(subCategoriesFilter: string) {
    this._store.dispatch(setSubCategoriesFilter({ subCategoriesFilter }));
  }

  loadCategories(targetType: EEntryType): void {
    this._store.dispatch(loadCategories({ targetType }));
  }

  loadSubCategories(categoryId: string): void {
    this._store.dispatch(loadSubCategories({ categoryId }));
  }

  resetState(): void {
    this._store.dispatch(resetState());
  }

  buildRecurrences(): void {
    this._store.dispatch(buildRecurrences());
  }

  createEntry(): void {
    this._store.dispatch(createEntry());
  }
}
