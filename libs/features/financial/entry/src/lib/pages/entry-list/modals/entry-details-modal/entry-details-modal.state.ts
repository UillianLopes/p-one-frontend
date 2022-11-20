import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { OptionModel } from '@p-one/core';
import { CategoryService, EEntryPaymentStatus, EntryModel, EntryService, SubCategoryService } from '@p-one/domain/financial';
import { forkJoin, Observable, of, switchMap, tap, withLatestFrom } from 'rxjs';

export interface EntryDetailsModalState {
  isLoading: boolean;
  entry?: EntryModel;
  categories: OptionModel[];
  subCategories: OptionModel[];
  updated: boolean;
}

@Injectable()
export class EntryDetailsModalStore extends ComponentStore<EntryDetailsModalState> {
  readonly categories$ = this.select(({ categories }) => categories);
  readonly subCategories$ = this.select(({ subCategories }) => subCategories);
  readonly entry$ = this.select(({ entry }) => entry);
  readonly currency$ = this.select(({ entry }) => entry?.currency);
  readonly isNotPaid$ = this.select(
    this.entry$,
    (entry) => entry && entry.paymentStatus !== EEntryPaymentStatus.Paid
  );
  readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  readonly updated$ = this.select(({ updated }) => updated);

  constructor(
    private readonly _subCategoryService: SubCategoryService,
    private readonly _categoryService: CategoryService,
    private readonly _entryService: EntryService
  ) {
    super({
      isLoading: false,
      categories: [],
      subCategories: [],
      updated: false,
    });
  }

  readonly updateEntry = this.effect((event$: Observable<any>) =>
    event$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      withLatestFrom(this.entry$),
      switchMap(([{ category, subCategory, ...form }, entry]) => {
        const id = entry?.id ?? entry?.parentId;

        if (!id) {
          return of(null);
        }
        return this._entryService
          .update(id, {
            ...form,
            categoryId: category.id,
            subCategoryId: subCategory?.id,
          })
          .pipe(
            tap({
              next: () => this.patchState({ isLoading: false, updated: true }),
              complete: () => this.patchState({ isLoading: false }),
            })
          );
      })
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
