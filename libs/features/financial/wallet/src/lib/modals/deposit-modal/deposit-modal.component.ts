import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { OptionModel } from '@p-one/core';
import { CategoryModel, convetWalletIntoOption, WalletModel } from '@p-one/domain/financial';
import { CustomValidators, DestroyableMixin, DialogRef, PONE_DIALOG_DATA } from '@p-one/shared';
import { SettingsStoreFacade } from '@p-one/stores/identity';
import * as _ from 'lodash';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, takeUntil } from 'rxjs/operators';

import { DepositModalStore } from './deposit-modal.state';

@Component({
  selector: 'p-one-deposit-modal',
  templateUrl: './deposit-modal.component.html',
  styleUrls: ['./deposit-modal.component.scss'],
  providers: [DepositModalStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositModalComponent
  extends DestroyableMixin()
  implements OnInit
{
  public readonly form = this._formBuilder.group({
    title: ['', [Validators.required]],
    deposit: [0.01, [Validators.required, Validators.min(0.01)]],
    category: [null, [Validators.required]],
    subCategory: [null],
    wallet: [
      { value: convetWalletIntoOption(this._wallet), disabled: !!this._wallet },
      [CustomValidators.requireToBeObject, Validators.required],
    ],
    dueDate: [new Date(), [Validators.required]],
  });

  public readonly deposit = this.form.get('deposit') as FormControl;
  public readonly category = this.form.get('category') as FormControl;
  public readonly subCategory = this.form.get('subCategory') as FormControl;
  public readonly walletControl = this.form.get('wallet') as FormControl;

  public readonly isConfirmFormDisabled$ = this.form.statusChanges.pipe(
    startWith(this.form.status),
    map((status) => !status || status === 'INVALID')
  );

  public readonly deposit$ = this.deposit.valueChanges.pipe(
    startWith(this.deposit.value),
    map((value) => value as number)
  );

  public readonly category$ = this.category.valueChanges.pipe(
    filter((category) => typeof category !== 'string'),
    map((category) => category as CategoryModel),
    distinctUntilChanged(_.isEqual)
  );

  public readonly subCategoryFilter$ = this.subCategory.valueChanges.pipe(
    startWith(''),
    filter((subCategory) => !subCategory || typeof subCategory === 'string'),
    map((subCategory) => (subCategory ?? '') as string)
  );

  public readonly categoryFilter$ = this.category.valueChanges.pipe(
    startWith(''),
    filter((category) => !category || typeof category === 'string'),
    map((category) => (category ?? '') as string)
  );

  public readonly currentBalance$ = this._store.walletExtra$.pipe(
    map((wallet) => wallet?.value ?? 0)
  );

  public readonly isLoading$ = this._store.isLoading$;

  public readonly newBalance$ = combineLatest([
    this.deposit$,
    this.currentBalance$,
  ]).pipe(map(([deposit, currentBalance]) => currentBalance + deposit));

  public readonly categories$ = combineLatest([
    this._store.categories$,
    this.categoryFilter$,
  ]).pipe(
    map(([categories, categoryFilter]) =>
      categories.filter((c) =>
        c?.title?.toLowerCase().includes((categoryFilter ?? '').toLowerCase())
      )
    )
  );

  public readonly subCategories$ = combineLatest([
    this._store.subCategories$,
    this.subCategoryFilter$,
  ]).pipe(
    map(([subCategories, subCategoryFilter]) =>
      subCategories.filter(({ title }) =>
        title?.toLowerCase()?.includes((subCategoryFilter ?? '').toLowerCase())
      )
    )
  );

  readonly walletCurrency$ = combineLatest([
    this._settingsStoreFacade.settingsCurrency$,
    this._store.walletExtra$,
  ]).pipe(map(([currency, extra]) => extra?.currency ?? currency));

  readonly wallets$ = this._store.wallets$;

  public readonly displayFn = (obj: OptionModel) => obj?.title;

  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _store: DepositModalStore,
    private readonly _settingsStoreFacade: SettingsStoreFacade,
    @Inject(PONE_DIALOG_DATA) private readonly _wallet: WalletModel,
    { dialogId }: DialogRef<DepositModalComponent>
  ) {
    super();
    this._store.setDialogId(dialogId);
  }

  ngOnInit(): void {
    this._store.loadCategories();
    this._store.loadWallets({});
    this.category$.pipe(takeUntil(this.destroyed$)).subscribe((category) => {
      this.subCategory.setValue(null);
      this._store.loadSubCategories(category?.id);
    });

    this.walletControl.valueChanges
      .pipe(takeUntil(this.destroyed$), startWith(this.walletControl.value))
      .subscribe((wallet) => {
        this._store.setWallet(wallet);
      });

    this.walletControl;
  }

  public confirmDeposit(): void {
    if (this.form.invalid) {
      this.form.updateValueAndValidity();
      return;
    }

    this._store.confirmDeposit(this.form.value);
  }
}
