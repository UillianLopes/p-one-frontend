import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryModel, WalletModel } from '@p-one/financial';
import { DestroyableMixin, DialogRef, PONE_DIALOG_DATA } from '@p-one/shared';
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
  public readonly form = this._formBuilder.group({
    title: ['', [Validators.required]],
    withdraw: [
      0.01,
      [
        Validators.required,
        Validators.min(0.01),
        Validators.max(this._wallet.value),
      ],
    ],
    category: [null, [Validators.required]],
    subCategory: [null],
  });

  public readonly withdraw = this.form.get('withdraw');
  public readonly category = this.form.get('category');
  public readonly subCategory = this.form.get('subCategory');

  public readonly isConfirmFormDisabled$ = this.form.statusChanges.pipe(
    startWith(this.form.status),
    map((status) => !status || status === 'INVALID')
  );

  public readonly withdraw$ = this.withdraw.valueChanges.pipe(
    startWith(this.withdraw.value),
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

  public readonly currentBalance$ = this._store.wallet$.pipe(
    map(({ value }) => value)
  );

  public readonly isLoading$ = this._store.isLoading$;

  public readonly newBalance$ = combineLatest([
    this.withdraw$,
    this.currentBalance$,
  ]).pipe(map(([deposit, currentBalance]) => currentBalance - deposit));

  public readonly categories$ = combineLatest([
    this._store.categories$,
    this.categoryFilter$,
  ]).pipe(
    map(([categories, categoryFilter]) =>
      categories.filter((c) =>
        c.name.toLowerCase().includes((categoryFilter ?? '').toLowerCase())
      )
    )
  );

  public readonly subCategories$ = combineLatest([
    this._store.subCategories$,
    this.subCategoryFilter$,
  ]).pipe(
    map(([subCategories, subCategoryFilter]) =>
      subCategories.filter(({ name }) =>
        name.toLowerCase().includes((subCategoryFilter ?? '').toLowerCase())
      )
    )
  );

  public readonly displayFn = (obj: any) => obj?.name;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: WithdrawModalStore,
    @Inject(PONE_DIALOG_DATA) private readonly _wallet: WalletModel,
    { dialogId }: DialogRef
  ) {
    super();
    this._store.setWallet(_wallet);
    this._store.setDialogId(dialogId);
  }

  ngOnInit(): void {
    this._store.loadCategories();
    this.category$.pipe(takeUntil(this.destroyed$)).subscribe((category) => {
      this.subCategory.setValue(null);
      this._store.loadSubCategories(category?.id);
    });
  }

  public confirmWithdraw(): void {
    if (this.form.invalid) {
      this.form.updateValueAndValidity();
      return;
    }

    this._store.confirmWithdraw(this.form.value);
  }
}
