import { ChangeDetectionStrategy, Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { OptionModel } from '@p-one/core';
import { CategoryModel, convetWalletIntoOption, WalletModel, WalletOptionModel } from '@p-one/domain/financial';
import { CustomValidators, DestroyableMixin, DialogRef, PONE_DIALOG_DATA } from '@p-one/shared';
import { SettingsStoreFacade } from '@p-one/stores/identity';
import * as _ from 'lodash';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, takeUntil } from 'rxjs/operators';

import { WithdrawModalStore } from './withdraw-modal.state';

@Component({
  selector: 'p-one-withdraw-modal',
  templateUrl: './withdraw-modal.component.html',
  styleUrls: ['./withdraw-modal.component.scss'],
  providers: [WithdrawModalStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithdrawModalComponent
  extends DestroyableMixin()
  implements OnInit
{
  readonly DEFAULT_WITHDRAW_VALIDATORS = [
    Validators.required,
    Validators.min(0.01),
  ];

  readonly form = this._formBuilder.group({
    title: ['', [Validators.required]],
    withdraw: [0.01],
    category: [null, [Validators.required]],
    subCategory: [null],
    wallet: [
      { value: convetWalletIntoOption(this._wallet), disabled: !!this._wallet },
      [CustomValidators.requireToBeObject, Validators.required],
    ],
    dueDate: [new Date(), [Validators.required]],
  });

  readonly withdrawControl = this.form.get('withdraw') as FormControl;
  readonly categoryControl = this.form.get('category') as FormControl;
  readonly subCategoryControl = this.form.get('subCategory') as FormControl;
  readonly walletControl = this.form.get('wallet') as FormControl;

  readonly isConfirmFormDisabled$ = this.form.statusChanges.pipe(
    startWith(this.form.status),
    map((status) => !status || status === 'INVALID')
  );

  readonly withdraw$ = this.withdrawControl.valueChanges.pipe(
    startWith(this.withdrawControl.value),
    map((value) => value as number)
  );

  readonly category$ = this.categoryControl.valueChanges.pipe(
    filter((category) => typeof category !== 'string'),
    map((category) => category as CategoryModel),
    distinctUntilChanged(_.isEqual)
  );

  readonly subCategoryFilter$ = this.subCategoryControl.valueChanges.pipe(
    startWith(''),
    filter((subCategory) => !subCategory || typeof subCategory === 'string'),
    map((subCategory) => (subCategory ?? '') as string)
  );

  readonly categoryFilter$ = this.categoryControl.valueChanges.pipe(
    startWith(''),
    filter((category) => !category || typeof category === 'string'),
    map((category) => (category ?? '') as string)
  );

  readonly wallet$ = this._store.wallet$;
  readonly walletCurrency$ = combineLatest([
    this._settingsStoreFacade.settingsCurrency$,
    this._store.walletExtra$,
  ]).pipe(map(([currency, extra]) => extra?.currency ?? currency));

  readonly currentBalance$ = this.wallet$.pipe(
    map((wallet) => wallet?.extra?.value ?? 0)
  );

  readonly isLoading$ = this._store.isLoading$;
  readonly newBalance$ = combineLatest([
    this.withdraw$,
    this.currentBalance$,
  ]).pipe(map(([withdraw, currentBalance]) => currentBalance - withdraw));
  readonly categories$ = combineLatest([
    this._store.categories$,
    this.categoryFilter$,
  ]).pipe(
    map(([categories, categoryFilter]) =>
      categories.filter(({ title }) =>
        title.toLowerCase().includes((categoryFilter ?? '').toLowerCase())
      )
    )
  );
  readonly subCategories$ = combineLatest([
    this._store.subCategories$,
    this.subCategoryFilter$,
  ]).pipe(
    map(([subCategories, subCategoryFilter]) =>
      subCategories.filter(({ title }) =>
        title.toLowerCase().includes((subCategoryFilter ?? '').toLowerCase())
      )
    )
  );

  readonly wallets$ = this._store.wallets$;

  readonly displayFn = (obj: OptionModel) => obj?.title;

  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _store: WithdrawModalStore,
    private readonly _settingsStoreFacade: SettingsStoreFacade,

    @Optional()
    @Inject(PONE_DIALOG_DATA)
    private readonly _wallet: WalletModel,
    { dialogId }: DialogRef<WithdrawModalComponent>
  ) {
    super();
    this._store.setDialogId(dialogId);
  }

  ngOnInit(): void {
    this._store.loadCategories();
    this._store.loadWallets({
      currency: this._wallet?.id,
    });

    this.category$.pipe(takeUntil(this.destroyed$)).subscribe((category) => {
      this.subCategoryControl.setValue(null);
      this._store.loadSubCategories(category?.id);
    });

    this.walletControl.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        startWith(this.walletControl.value),
        filter((wallet) => !!wallet && typeof wallet !== 'string')
      )
      .subscribe((wallet: WalletOptionModel) => {
        this._store.setWallet(wallet);
        this.withdrawControl.setValidators([
          ...this.DEFAULT_WITHDRAW_VALIDATORS,
          Validators.max(wallet.extra.value ?? 0),
        ]);
        this.withdrawControl.updateValueAndValidity();
      });
  }

  confirmWithdraw(): void {
    if (this.form.invalid) {
      this.form.updateValueAndValidity();
      return;
    }

    this._store.confirmWithdraw({
      ...this.form.value,
      wallet: this.walletControl.value,
    });
  }
}
