import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  CategoryModel,
  CategoryService,
  DashboardFilter,
  SubCategoryModel,
  SubCategoryService,
  WalletModel,
  WalletService,
} from '@p-one/financial';
import { DialogService } from '@p-one/shared';
import { Observable } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

export interface DashboardFilterModalState {
  dialogId?: string;
  categories?: CategoryModel[];
  subCategories?: SubCategoryModel[];
  wallets?: WalletModel[];

  selectedCategoriesIds?: string[];
  selectedSubCategoriesIds?: string[];
  selectedWalletsIds?: string[];

  walletsFilter?: string;
  categoriesFilter?: string;
  subCategoriesFilter?: string;

  isSubCategoriesLoading?: boolean;
  isCategoriesLoading?: boolean;
  isWalletsLoading?: boolean;
}

@Injectable()
export class DashboardFilterModalStore extends ComponentStore<DashboardFilterModalState> {
  public readonly dialogId$ = this.select(({ dialogId }) => dialogId);

  private readonly categories$ = this.select(
    ({ categories }) => categories ?? []
  );
  private readonly categoriesFilter$ = this.select(({ categoriesFilter }) =>
    (categoriesFilter ?? '').toLowerCase()
  );
  private readonly selectedCategoryIds$ = this.select(
    ({ selectedCategoriesIds }) => selectedCategoriesIds ?? []
  );
  public readonly filtredCategories$ = this.select(
    this.categories$,
    this.categoriesFilter$,
    this.selectedCategoryIds$,
    (categories, categoriesFilter, selectedCategoryIds) =>
      categories.filter(
        ({ name, id }) =>
          name.toLowerCase().includes(categoriesFilter) &&
          !selectedCategoryIds.includes(id)
      )
  );

  private readonly subCategories$ = this.select(
    ({ subCategories }) => subCategories ?? []
  );
  private readonly subCategoriesFilter$ = this.select(
    ({ subCategoriesFilter }) => (subCategoriesFilter ?? '').toLowerCase()
  );
  private readonly selectedSubCategoriesIds$ = this.select(
    ({ selectedSubCategoriesIds }) => selectedSubCategoriesIds ?? []
  );
  public readonly filtredSubCategories$ = this.select(
    this.subCategories$,
    this.subCategoriesFilter$,
    this.selectedSubCategoriesIds$,
    this.selectedCategoryIds$,
    (subCategories, filter, selectedSubCategoriesIds, selectedCategoryIds) => {
      if (selectedCategoryIds.length === 0) {
        return [];
      }

      return subCategories.filter(
        ({ name, category, id }) =>
          name.toLowerCase().includes(filter ?? '') &&
          category &&
          selectedCategoryIds.includes(category.id) &&
          !selectedSubCategoriesIds.includes(id)
      );
    }
  );

  private readonly wallets$ = this.select(({ wallets }) => wallets ?? []);
  private readonly walltsFilter$ = this.select(({ walletsFilter }) =>
    (walletsFilter ?? '').toLowerCase()
  );
  private readonly selectedWalletsIds$ = this.select(
    ({ selectedWalletsIds }) => selectedWalletsIds ?? []
  );
  public readonly filtredWallets$ = this.select(
    this.wallets$,
    this.walltsFilter$,
    this.selectedWalletsIds$,
    (wallets, walletsFilter, selectedWalletsIds) =>
      wallets.filter(
        ({ name, id }) =>
          name.toLowerCase().includes(walletsFilter) &&
          !selectedWalletsIds.includes(id)
      )
  );

  public readonly isSomethingLoading$ = this.select(
    ({ isSubCategoriesLoading, isCategoriesLoading, isWalletsLoading }) =>
      isSubCategoriesLoading || isCategoriesLoading || isWalletsLoading
  );

  constructor(
    private readonly _dialogService: DialogService,
    private readonly _categoryService: CategoryService,
    private readonly _subCategoryService: SubCategoryService,
    private readonly _walletService: WalletService
  ) {
    super({});
  }

  public readonly setCategoriesFilter = this.updater(
    (state, categoriesFilter: string) => {
      return {
        ...state,
        categoriesFilter,
      };
    }
  );

  public readonly setWalletsFilter = this.updater(
    (state, walletsFilter: string) => {
      return {
        ...state,
        walletsFilter,
      };
    }
  );
  public readonly setSubCategoriesFilter = this.updater(
    (state, subCategoriesFilter: string) => {
      return {
        ...state,
        subCategoriesFilter,
      };
    }
  );

  public readonly setDialogId = this.updater((state, dialogId: string) => {
    return {
      ...state,
      dialogId,
    };
  });

  public readonly setSelectedCategoriesIds = this.updater(
    (state, selectedCategoriesIds: string[]) => ({
      ...state,
      selectedCategoriesIds,
    })
  );
  public readonly setSelectedSubCategoriesIds = this.updater(
    (state, selectedSubCategoriesIds: string[]) => ({
      ...state,
      selectedSubCategoriesIds,
    })
  );

  public readonly setSelectedWalletsIds = this.updater(
    (state, selectedWalletsIds: string[]) => ({
      ...state,
      selectedWalletsIds,
    })
  );

  public readonly loadWallets = this.effect((event$) => {
    return event$.pipe(
      tap(() => this._setIsWalletsLoading(true)),
      switchMap(() =>
        this._walletService.get().pipe(
          tap({
            next: (wallets) => this._loadWalletsSuccess(wallets),
            error: (error) => this._loadWalletsFailure(error),
          })
        )
      )
    );
  });

  public readonly loadCategories = this.effect((event$) => {
    return event$.pipe(
      tap(() => this._setIsCategoriesLoading(true)),
      switchMap(() =>
        this._categoryService.get().pipe(
          tap({
            next: (categories) => this._loadCategoriesSuccess(categories),
            error: (error) => this._loadCategoriesFailure(error),
          })
        )
      )
    );
  });

  public readonly loadSubCategories = this.effect((event$) => {
    return event$.pipe(
      tap(() => this._setIsSubCategoriesLoading(true)),
      switchMap(() =>
        this._subCategoryService.get().pipe(
          tap({
            next: (categories) => this._loadSubCategoriesSuccess(categories),
            error: (error) => this._loadSubCategoriesFailure(error),
          })
        )
      )
    );
  });

  public readonly confirm = this.effect(($event: Observable<DashboardFilter>) =>
    $event.pipe(
      withLatestFrom(this.dialogId$),
      tap(([filter, dialogId]) => this._dialogService.close(dialogId, filter))
    )
  );

  private readonly _loadWalletsSuccess = this.updater(
    (state, wallets: WalletModel[]) => {
      return {
        ...state,
        wallets,
        isWalletsLoading: false,
      };
    }
  );

  private readonly _loadWalletsFailure = this.updater((state, error: any) => {
    return {
      ...state,
      error,
      isWalletsLoading: false,
    };
  });

  private readonly _loadCategoriesSuccess = this.updater(
    (state, categories: CategoryModel[]) => {
      return {
        ...state,
        categories,
        isCategoriesLoading: false,
      };
    }
  );

  private readonly _loadCategoriesFailure = this.updater(
    (state, error: any) => {
      return {
        ...state,
        error,
        isCategoriesLoading: false,
      };
    }
  );

  private readonly _loadSubCategoriesSuccess = this.updater(
    (state, subCategories: SubCategoryModel[]) => {
      return {
        ...state,
        subCategories,
        isSubCategoriesLoading: false,
      };
    }
  );

  private readonly _loadSubCategoriesFailure = this.updater(
    (state, error: any) => {
      return {
        ...state,
        error,
        isSubCategoriesLoading: false,
      };
    }
  );

  private readonly _setIsCategoriesLoading = this.updater(
    (state, isCategoriesLoading: boolean) => ({
      ...state,
      isCategoriesLoading,
    })
  );

  private readonly _setIsSubCategoriesLoading = this.updater(
    (state, isSubCategoriesLoading: boolean) => ({
      ...state,
      isSubCategoriesLoading,
    })
  );

  private readonly _setIsWalletsLoading = this.updater(
    (state, isWalletsLoading: boolean) => ({ ...state, isWalletsLoading })
  );
}
