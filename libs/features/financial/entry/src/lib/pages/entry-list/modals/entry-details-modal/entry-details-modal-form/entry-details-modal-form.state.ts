import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { OptionModel } from '@p-one/core';
import { CategoryService, EEntryPaymentStatus, EntryModel, EntryService, SubCategoryService } from '@p-one/domain/financial';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

export interface EntryDetailsModalFormState {
  isLoading: boolean;
  entry?: EntryModel;
  categories: OptionModel[];
  subCategories: OptionModel[];
}

@Injectable()
export class EntryDetailsModalFormStore extends ComponentStore<EntryDetailsModalFormState> {
  readonly categories$ = this.select(({ categories }) => categories);
  readonly subCategories$ = this.select(({ subCategories }) => subCategories);
  readonly entry$ = this.select(({ entry }) => entry);
  readonly currency$ = this.select(({ entry }) => entry?.currency);
  readonly canEditValue$ = this.select(
    this.entry$,
    (entry) => entry && entry.paymentStatus !== EEntryPaymentStatus.Paid
  );
  readonly isLoading$ = this.select(({ isLoading }) => isLoading);

  constructor(
    private readonly _subCategoryService: SubCategoryService,
    private readonly _categoryService: CategoryService,
    private readonly _entryService: EntryService
  ) {
    super({ isLoading: false, categories: [], subCategories: [] });
  }

  readonly updateEntry = this.effect((event$: Observable<any>) =>
    event$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      withLatestFrom(this.entry$),
      switchMap(([{ category, subCategory, ...form }, entry]) =>
        entry?.id
          ? this._entryService
              .update(entry.id, {
                ...form,
                categoryId: category.id,
                subCategoryId: subCategory?.id,
              })
              .pipe(
                tap({
                  next: () => this.patchState({ isLoading: false }),
                  complete: () => this.patchState({ isLoading: false }),
                })
              )
          : of(null)
      )
    )
  );

  readonly setEntryAndLoad = this.effect((event$: Observable<EntryModel>) =>
    event$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap((entry) =>
        forkJoin([
          this._categoryService.getAllAsOptions(entry.type),
          this._subCategoryService.getAllAsOptions(entry.category.id),
        ]).pipe(
          tap({
            next: ([categories, subCategories]) =>
              this.patchState({
                categories,
                subCategories,
                entry,
              }),
            complete: () => this.patchState({ isLoading: false }),
          })
        )
      )
    )
  );
}
