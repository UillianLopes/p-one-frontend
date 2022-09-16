import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { CategoryModel, CategoryService, EntryFilter, SubCategoryModel, SubCategoryService } from '@p-one/domain/financial';
import { combineLatest } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

export interface EntryListFilterState {
  categories: CategoryModel[];
  subCategories: SubCategoryModel[];

  categoryFilter?: string;
  subCategoryFilter?: string;

  error?: unknown;

  isCategoriesLoading?: boolean;
  isSubCategoriesLoading?: boolean;

  loading?: boolean;
}

@Injectable()
export class EntryListFilterStore extends ComponentStore<EntryListFilterState> {
  private readonly _categoryFilter$ = this.select(({ categoryFilter }) =>
    categoryFilter?.toLowerCase()
  );
  private readonly _subCategoryFilter$ = this.select(({ subCategoryFilter }) =>
    subCategoryFilter?.toLowerCase()
  );
  private readonly _categories$ = this.select((e) => e.categories);
  private readonly _subCategories$ = this.select((e) => e.subCategories);

  readonly isLoading$ = this.select((e) => e.loading);
  readonly categories$ = combineLatest([
    this._categoryFilter$,
    this._categories$,
  ]).pipe(
    map(([filter, categories]) =>
      categories.filter((c) => c.name.toLowerCase().includes(filter ?? ''))
    )
  );
  readonly subCategories$ = combineLatest([
    this._subCategoryFilter$,
    this._subCategories$,
  ]).pipe(
    map(([filter, subCategories]) =>
      subCategories.filter((c) => c.name.toLowerCase().includes(filter ?? ''))
    )
  );

  constructor(
    private readonly _categoryService: CategoryService,
    private readonly _subCategoryService: SubCategoryService
  ) {
    super({
      categories: [],
      subCategories: [],
    });
  }

  readonly setFilter = this.updater((state, filter: EntryFilter) => {
    return {
      ...state,
      filter,
    };
  });

  readonly loadCategories = this.effect((event$) => {
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

  readonly loadSubCategories = this.effect((event$) => {
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

  readonly setCategoryFilter = this.updater((state, categoryFilter: string) => {
    return {
      ...state,
      categoryFilter,
    };
  });

  readonly setSubCategoryFilter = this.updater(
    (state, subCategoryFilter: string) => {
      return {
        ...state,
        subCategoryFilter,
      };
    }
  );

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
    (state, error: unknown) => {
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
    (state, error: unknown) => {
      return {
        ...state,
        error,
        isSubCategoriesLoading: false,
      };
    }
  );

  private readonly _setIsCategoriesLoading = this.updater(
    (state, isCategoriesLoading: boolean) => {
      return {
        ...state,
        isCategoriesLoading,
      };
    }
  );

  private readonly _setIsSubCategoriesLoading = this.updater(
    (state, isSubCategoriesLoading: boolean) => {
      return {
        ...state,
        isSubCategoriesLoading,
      };
    }
  );
}
