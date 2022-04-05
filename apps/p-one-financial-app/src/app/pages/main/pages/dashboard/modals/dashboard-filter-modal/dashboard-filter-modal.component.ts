import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CategoryModel, DashboardFilter, SubCategoryModel, WalletModel } from '@p-one/financial';
import { DestroyableMixin, DialogRef, PONE_DIALOG_DATA } from '@p-one/shared';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';

import { DashboardFilterModalStore } from './dashboard-filter-modal.state';

@Component({
  selector: 'p-one-dashboard-filter-modal',
  templateUrl: './dashboard-filter-modal.component.html',
  styleUrls: ['./dashboard-filter-modal.component.scss'],
  providers: [DashboardFilterModalStore],
})
export class DashboardFilterModalComponent
  extends DestroyableMixin()
  implements OnInit
{
  public readonly form = this._formBuilder.group({
    begin: [this._filter?.begin],
    end: [this._filter?.end],
    wallets: [this._filter?.wallets],
    categories: [this._filter?.categories],
    subCategories: [this._filter?.subCategories],
  });

  public readonly filtredCategories$ = this._store.filtredCategories$;
  public readonly filtredSubCategories$ = this._store.filtredSubCategories$;
  public readonly filtredWallets$ = this._store.filtredWallets$;
  public readonly isSomethingLoading$ = this._store.isSomethingLoading$;

  public readonly displayFn = (obj: any) => obj.name;

  private readonly _categories = this.form.get('categories');
  private readonly _subCategories = this.form.get('subCategories');
  private readonly _wallets = this.form.get('wallets');

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: DashboardFilterModalStore,
    @Inject(PONE_DIALOG_DATA) private readonly _filter: DashboardFilter,
    dialogRef: DialogRef
  ) {
    super();
    this._store.setDialogId(dialogRef.dialogId);
  }

  ngOnInit(): void {
    this._store.loadWallets();
    this._store.loadCategories();
    this._store.loadSubCategories();

    this._categories.valueChanges
      .pipe(
        startWith(this._categories.value),
        takeUntil(this.destroyed$),
        filter((value) => value instanceof Array || !value),
        map(
          (categories: CategoryModel[] | undefined) =>
            categories?.map(({ id }) => id) ?? []
        )
      )
      .subscribe((categoriesIds) =>
        this._store.setSelectedCategoriesIds(categoriesIds)
      );

    this._subCategories.valueChanges
      .pipe(
        startWith(this._subCategories.value),
        takeUntil(this.destroyed$),
        filter((value) => value instanceof Array || !value),
        map(
          (subCategories: SubCategoryModel[] | undefined) =>
            subCategories?.map(({ id }) => id) ?? []
        )
      )
      .subscribe((subCategoriesIds) =>
        this._store.setSelectedSubCategoriesIds(subCategoriesIds)
      );

    this._wallets.valueChanges
      .pipe(
        startWith(this._wallets.value),
        takeUntil(this.destroyed$),
        filter((value) => value instanceof Array || !value),
        map(
          (wallets: WalletModel[] | undefined) =>
            wallets?.map(({ id }) => id) ?? []
        )
      )
      .subscribe((walletsIds) => this._store.setSelectedWalletsIds(walletsIds));
  }

  public confirm(): void {
    this._store.confirm(this.form.value);
  }

  public setCategoriesFilter(categoriesFilter: string) {
    this._store.setCategoriesFilter(categoriesFilter);
  }

  public setWalletsFilter(walletsFilter: string) {
    this._store.setWalletsFilter(walletsFilter);
  }

  public setSubCategoriesFilter(subCategoriesFilter: string) {
    this._store.setSubCategoriesFilter(subCategoriesFilter);
  }
}
