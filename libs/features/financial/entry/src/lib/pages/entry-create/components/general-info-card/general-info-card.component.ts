import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { NamedModel } from '@p-one/core';
import { CategoryModel, EEntryOperation, EEntryType } from '@p-one/domain/financial';
import { CustomValidators, DestroyableMixin } from '@p-one/shared';
import { SettingsStoreFacade } from '@p-one/stores/identity';
import { combineLatest, debounceTime, distinctUntilChanged, filter, map, startWith, takeUntil } from 'rxjs';

import { EntryCreateFacade } from '../../+state/entry-create.facade';
import { EntryCreateFormKeys } from '../../@types/entry-create-form-keys';

@Component({
  selector: 'p-one-general-info-card',
  templateUrl: './general-info-card.component.html',
  styleUrls: ['./general-info-card.component.scss'],
})
export class GeneralInfoCardComponent
  extends DestroyableMixin()
  implements OnInit, OnDestroy
{
  readonly EntryOperation = EEntryOperation;
  readonly EntryType = EEntryType;

  readonly form = this._formBuilder.group({
    title: [null, Validators.required],
    operation: [EEntryOperation.Credit],
    category: [null, [Validators.required, CustomValidators.requireToBeObject]],
    subCategory: [null, [CustomValidators.requireToBeObject]],
    currency: [null, Validators.required],
    value: [0.0, [Validators.required, Validators.min(0.01)]],
    type: [EEntryType.Normal, Validators.required],
    dueDate: [
      new Date(),
      CustomValidators.whenParent(
        Validators.required,
        (parent) =>
          parent &&
          parent.value &&
          parent.value.type &&
          parent.value.type === EEntryType.Normal
      ),
    ],
    wallet: [null, [CustomValidators.requireToBeObject]],
    paid: [false],
    paidValue: [],
    fees: [],
    fine: [],
  });

  readonly walletControl = this.form.get('wallet') as FormControl;
  readonly currencyControl = this.form.get('currency') as FormControl;
  readonly operationControl = this.form.get('operation') as FormControl;
  readonly categoryControl = this.form.get('category') as FormControl;
  readonly subCategoryControl = this.form.get('subCategory') as FormControl;
  readonly typeControl = this.form.get('type') as FormControl;
  readonly paidValueControl = this.form.get('paidValue') as FormControl;
  readonly fineControl = this.form.get('fine') as FormControl;
  readonly feesControl = this.form.get('fees') as FormControl;

  readonly categories$ = this._facade.filtredCategories$;
  readonly subCategories$ = this._facade.filtredSubCategories$;
  readonly wallets$ = this._facade.filtredWallets$;
  readonly generalInfoFormOperation$ = this._facade.generalInfoFormOperation$;
  readonly generalInfoFormValue$ = this._facade.generalInfoFormValue$;
  readonly isANormalEntry$ = this._facade.generalInfoFormType$.pipe(
    map((type) => type === EEntryType.Normal)
  );
  readonly isFormInvalid$ = this._facade.formStatus$.pipe(
    map((status) => status[EntryCreateFormKeys.GeneralInfo] === 'INVALID')
  );
  readonly isLoading$ = this._facade.isLoading$;
  readonly isCreateEntryDisabled$ = combineLatest([
    this.isFormInvalid$,
    this.isLoading$,
  ]).pipe(map(([isFormInvalid, isLoading]) => isFormInvalid || isLoading));
  readonly paid$ = this._facade.generalInfoFormPaid$;

  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _facade: EntryCreateFacade,
    private readonly _settingsStoreFacade: SettingsStoreFacade
  ) {
    super();
  }

  displayFn = (obj: NamedModel) => obj.name;

  ngOnInit(): void {
    this._settingsStoreFacade.settingsCurrency$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => this.currencyControl.setValue(value ?? 'BRL'));

    this.operationControl.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        startWith(this.operationControl.value),
        filter((type) => !!type)
      )
      .subscribe((operation) => {
        this._facade.loadCategories(operation);
      });

    this.categoryControl.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        filter((value) => !!value && typeof value !== 'string'),
        map((value) => value as CategoryModel)
      )
      .subscribe(({ id }) => {
        if (!id) return;

        this._facade.loadSubCategories(id);
      });

    this.form.valueChanges
      .pipe(takeUntil(this.destroyed$), startWith(this.form.value))
      .subscribe((value) => {
        this._facade.patchGeneralInfoForm(value);
      });

    this.categoryControl.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        filter((s) => typeof s == 'string' || !s)
      )
      .subscribe((value) => {
        this._facade.setCategoriesFilter(value);
      });

    this.subCategoryControl.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        filter((s) => typeof s == 'string' || !s)
      )
      .subscribe((value) => {
        this._facade.setSubCategoriesFilter(value);
      });

    this.walletControl.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        filter((s) => typeof s == 'string' || !s)
      )
      .subscribe((value) => {
        this._facade.setWalletsFilter(value);
      });

    this.form.statusChanges
      .pipe(
        takeUntil(this.destroyed$),
        startWith(this.form.status),
        distinctUntilChanged()
      )
      .subscribe((status) => {
        this._facade.patchFormStatus(EntryCreateFormKeys.GeneralInfo, status);
      });

    this.generalInfoFormValue$
      .pipe(takeUntil(this.destroyed$), debounceTime(300))
      .subscribe((value) => {
        if (typeof value !== 'number') {
          return;
        }

        this.paidValueControl.setValidators([
          Validators.min(0.01),
          Validators.max(value),
          Validators.required,
        ]);

        this.paidValueControl.setValue(value);
        this.paidValueControl.updateValueAndValidity();
        this.fineControl.setValue(0.0);
        this.feesControl.setValue(0.0);
      });

    combineLatest([this.paid$, this.isANormalEntry$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([paid, isANormalEntry]) => {
        if (paid && isANormalEntry) {
          this.paidValueControl.enable();
          this.fineControl.enable();
          this.feesControl.enable();
        } else {
          this.paidValueControl.disable();
          this.fineControl.disable();
          this.feesControl.disable();
        }
      });
  }

  createEntry(): void {
    this._facade.createEntry();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._facade.resetGeneralInfoForm();
  }
}
