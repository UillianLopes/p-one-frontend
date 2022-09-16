import { Injectable } from '@angular/core';
import { FormControlStatus } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EEntryOperation } from '@p-one/domain/financial';

import { InstallmentsFormModel } from '../@types/installments-form.model';
import { RecurrenceFormModel } from '../@types/recurrence-form.model';
import {
  buildInstallments,
  createEntry,
  createInstallmentEntries,
  createRecurrentEntry,
  loadCategories,
  loadSubCategories,
  loadWallets,
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
  setWalletsFilter,
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

  readonly filtredWallets$ = this._store.select(
    EntryCreateSelectors.filtredWalletsSelector
  );

  readonly isLoading$ = this._store.select(
    EntryCreateSelectors.isLoadingSelector
  );

  readonly generalInfoForm$ = this._store.select(
    EntryCreateSelectors.generalInfoFormSelector
  );

  readonly generalInfoFormValue$ = this._store.select(
    EntryCreateSelectors.generalInfoFormValueSelector
  );

  readonly generalInfoFormType$ = this._store.select(
    EntryCreateSelectors.generalInfoFormTypeSelector
  );

  readonly generalInfoFormCurrencySelector$ = this._store.select(
    EntryCreateSelectors.generalInfoFormCurrencySelector
  );

  readonly generalInfoFormOperation$ = this._store.select(
    EntryCreateSelectors.generalInfoFormOperationSelector
  );
  
  readonly generalInfoFormPaid$ = this._store.select(
    EntryCreateSelectors.generalInfoFormPaidSelector
  );

  readonly installmentsForm$ = this._store.select(
    EntryCreateSelectors.installmentsFormSelector
  );

  readonly installmentsFromRecurrence$ = this._store.select(
    EntryCreateSelectors.installmentsFormRecurrenceSelector
  );

  readonly installments$ = this._store.select(
    EntryCreateSelectors.installmentsSelector
  );

  readonly isBuildingRecurrences$ = this._store.select(
    EntryCreateSelectors.isBuildingRecurrencesSelector
  );

  readonly formStatus$ = this._store.select(
    EntryCreateSelectors.formStatusSelector
  );

  readonly recurrenceForm$ = this._store.select(
    EntryCreateSelectors.recurrenceFormSelector
  );

  readonly recurrenceFormRecurrence$ = this._store.select(
    EntryCreateSelectors.recurrenceFormRecurrenceSelector
  );


  constructor(private readonly _store: Store<EntryCreateState>) {}

  patchGeneralInfoForm(generalInfoForm: Partial<InstallmentsFormModel>): void {
    this._store.dispatch(patchGeneralInfoForm({ generalInfoForm }));
  }

  resetGeneralInfoForm(): void {
    this._store.dispatch(resetGeneralInfoForm());
  }

  pathInstallmentsForm(installmentsForm: Partial<InstallmentsFormModel>): void {
    this._store.dispatch(patchInstallmentsForm({ installmentsForm }));
  }

  resetInstallmentsForm(): void {
    this._store.dispatch(resetInstallmentsForm());
  }

  pathRecurrenceForm(recurrenceForm: Partial<RecurrenceFormModel>): void {
    this._store.dispatch(patchRecurrenceForm({ recurrenceForm }));
  }

  resetRecurrenceForm(): void {
    this._store.dispatch(resetRecurrenceForm());
  }

  setCategoriesFilter(categoriesFilter: string): void {
    this._store.dispatch(setCategoriesFilter({ categoriesFilter }));
  }

  setSubCategoriesFilter(subCategoriesFilter: string): void {
    this._store.dispatch(setSubCategoriesFilter({ subCategoriesFilter }));
  }

  setWalletsFilter(walletsFilter: string) {
    this._store.dispatch(setWalletsFilter({ walletsFilter }));
  }

  loadWallets(): void {
    this._store.dispatch(loadWallets());
  }

  loadCategories(targetOperation: EEntryOperation): void {
    this._store.dispatch(loadCategories({ targetOperation }));
  }

  loadSubCategories(categoryId: string): void {
    this._store.dispatch(loadSubCategories({ categoryId }));
  }

  buildInstallments(): void {
    this._store.dispatch(buildInstallments());
  }

  createEntry(): void {
    this._store.dispatch(createEntry());
  }

  createRecurrentEntry(): void {
    this._store.dispatch(createRecurrentEntry());
  }

  createInstallmentEntries(): void {
    this._store.dispatch(createInstallmentEntries());
  }

  patchFormStatus(formKey: string, status: FormControlStatus): void {
    this._store.dispatch(patchFormStatus({ formKey, status }));
  }

  resetState(): void {
    this._store.dispatch(resetState());
  }
}
