import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder } from '@angular/forms';
import { EEntryOperation, EEntryPaymentStatus, EntryFilter } from '@p-one/domain/financial';
import { DestroyableMixin, DialogRef, PONE_DIALOG_DATA } from '@p-one/shared';
import { combineLatest } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

import { EntryListFacade } from '../../+state/entry-list.facade';
import { EntryListFilterStore } from './entry-list-filter.state';

@Component({
  selector: 'p-one-entry-list-filter',
  templateUrl: './entry-list-filter.component.html',
  styleUrls: ['./entry-list-filter.component.scss'],
  providers: [EntryListFilterStore],
})
export class EntryListFilterComponent
  extends DestroyableMixin()
  implements OnInit
{
  readonly EntryOperation = EEntryOperation;
  readonly EntryPaymentStatus = EEntryPaymentStatus;
  readonly isLoading$ = this._store.isLoading$;

  readonly form = this._formBuilder.group({
    operation: [this._data.operation],
    text: [this._data.text],
    categories: [this._data.categories],
    subCategories: [this._data.subCategories],
    paymentStatus: [this._data.paymentStatus],
    date: [this._data.date],
    minValue: [this._data.minValue],
    maxValue: [this._data.maxValue],
  });

  readonly subCategoriesControl = this.form.get('subCategories') as FormControl;
  readonly categoriesControl = this.form.get('categories') as FormControl;

  readonly inFilterCategoryIds$ = this.categoriesControl.valueChanges.pipe(
    startWith(this.categoriesControl.value),
    map((categories) => (categories?.map((c: any) => c.id) ?? []) as string[])
  );

  readonly inFilterSubCategoryIds$ =
    this.subCategoriesControl.valueChanges.pipe(
      startWith(this.subCategoriesControl.value),
      map(
        (subCategories) =>
          (subCategories?.map((c: any) => c.id) ?? []) as string[]
      )
    );

  readonly categories$ = combineLatest([
    this._store.categories$,
    this.inFilterCategoryIds$,
  ]).pipe(
    map(([subCategories, inFilterCategoryIds]) => {
      return subCategories.filter(
        ({ id }) =>
          !inFilterCategoryIds || (id && !inFilterCategoryIds.includes(id))
      );
    })
  );

  readonly subCategories$ = combineLatest([
    this._store.subCategories$,
    this.inFilterSubCategoryIds$,
    this.inFilterCategoryIds$,
  ]).pipe(
    map(([subCategories, inFilterSubCategoryIds, inFilterCategoryIds]) => {
      return subCategories.filter(
        (s) =>
          (!inFilterSubCategoryIds ||
            (s.id && !inFilterSubCategoryIds.includes(s.id))) &&
          (!s.category ||
            (inFilterCategoryIds &&
              s.category &&
              s.category.id &&
              inFilterCategoryIds.includes(s.category.id)))
      );
    })
  );

  readonly entryType$ = this._facade.entryType$;

  readonly displayFn = (obj: any) => obj.name;

  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _store: EntryListFilterStore,
    @Inject(PONE_DIALOG_DATA) private readonly _data: Partial<EntryFilter>,
    private readonly _dialog: DialogRef,
    private readonly _facade: EntryListFacade
  ) {
    super();
  }

  setCategoryFilter(value: string) {
    this._store.setCategoryFilter(value);
  }

  setSubCategoryFilter(value: string) {
    this._store.setSubCategoryFilter(value);
  }

  ngOnInit(): void {
    this._store.loadCategories();
    this._store.loadSubCategories();

    this.inFilterCategoryIds$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((inFilterCategoryIds) => {
        const subCategories = this.subCategoriesControl.value;

        if (!(subCategories instanceof Array) || subCategories.length == 0) {
          return;
        }

        if (inFilterCategoryIds.length == 0) {
          this.subCategoriesControl.setValue([]);
        } else {
          this.subCategoriesControl.setValue(
            subCategories.filter(
              (s) => !s.category || inFilterCategoryIds.includes(s.category.id)
            )
          );
        }

        this.subCategoriesControl.updateValueAndValidity();
      });
  }

  confirm(): void {
    this._dialog.close(this.form.value);
  }
}
