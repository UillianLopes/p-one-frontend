import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { NamedModel } from '@p-one/core';
import { CategoryModel, EEntryOperation, EEntryType } from '@p-one/domain/financial';
import { CustomValidators, DestroyableMixin } from '@p-one/shared';
import { SettingsStoreFacade } from '@p-one/stores/identity';
import { filter, map, startWith, takeUntil } from 'rxjs';

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
  public readonly EntryOperation = EEntryOperation;
  public readonly EntryType = EEntryType;

  public readonly form = this._formBuilder.group({
    title: [null, Validators.required],
    operation: [EEntryOperation.Credit],
    category: [null, [Validators.required]],
    subCategory: [null],
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
  });

  public readonly currencyControl = this.form.get('currency') as FormControl;
  public readonly operationControl = this.form.get('operation') as FormControl;
  public readonly categoryControl = this.form.get('category') as FormControl;
  public readonly subCategoryControl = this.form.get(
    'subCategory'
  ) as FormControl;
  public readonly typeControl = this.form.get('type') as FormControl;

  public readonly categories$ = this._facade.filtredCategories$;
  public readonly subCategories$ = this._facade.filtredSubCategories$;

  public readonly isANormalEntry$ = this._facade.generalInfoFormType$.pipe(
    map((type) => type === EEntryType.Normal)
  );

  public readonly isFormValid$ = this._facade.formStatus$.pipe(
    map((status) => status[EntryCreateFormKeys.GeneralInfo] === 'VALID')
  );

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

    this.form.statusChanges
      .pipe(takeUntil(this.destroyed$), startWith(this.form.status))
      .subscribe((status) => {
        this._facade.patchFormStatus(EntryCreateFormKeys.GeneralInfo, status);
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
