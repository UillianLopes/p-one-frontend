import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { FirstStepFormModel } from '../@types/first-step-form.model';
import { SecondStepFormModel } from '../@types/second-step-form.model';
import {
  buildRecurrences,
  loadCategories,
  loadSubCategories,
  resetState,
  setCategoriesFilter,
  setFirstStepForm,
  setSecondStepForm,
  setSubCategoriesFilter,
} from './entry-create.actions';
import { EntryCreateState } from './entry-create.reducer';
import * as EntryCreateSelector from './entry-create.selectors';

@Injectable()
export class EntryCreateFacade {
  readonly filtredSubCategories$ = this._store.select(
    EntryCreateSelector.filtredSubCategoriesSelector
  );

  readonly filtredCategories$ = this._store.select(
    EntryCreateSelector.filtredCategoriesSelector
  );

  readonly isLoading$ = this._store.select(
    EntryCreateSelector.isLoadingSelector
  );

  readonly recurrences$ = this._store.select(
    EntryCreateSelector.recurrencesSelector
  );

  readonly recurrence$ = this._store.select(
    EntryCreateSelector.recurrenceSelector
  );

  readonly firstStepForm$ = this._store.select(
    EntryCreateSelector.firstStepFormSelector
  );

  readonly secondStepForm$ = this._store.select(
    EntryCreateSelector.secondStepFormSelector
  );

  readonly isFirstStepInvalid$ = this._store.select(
    EntryCreateSelector.isFirstStepInvalidSelector
  );

  readonly isSecondStepInvalid$ = this._store.select(
    EntryCreateSelector.isSecondStepInvalidSelector
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

  loadCategories(): void {
    this._store.dispatch(loadCategories());
  }

  loadSubCategories(): void {
    this._store.dispatch(loadSubCategories());
  }

  resetState(): void {
    this._store.dispatch(resetState());
  }

  buildRecurrences(): void {
    this._store.dispatch(buildRecurrences());
  }
}
