import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { CategoryModel, CategoryService, EntryFilter, SubCategoryModel, SubCategoryService } from '@p-one/core';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface EntryListFilterState {
  categories: CategoryModel[];
  subCategories: SubCategoryModel[];

  categoryFilter?: string;
  subCategoryFilter?: string;

  error?: any;

  loadingCategories?: boolean;
  loadingSubCategories?: boolean;

  loading?: boolean;
}

@Injectable()
export class EntryListFilterStore extends ComponentStore<EntryListFilterState> {
  private readonly categoryFilter$ = this.select((e) =>
    e.categoryFilter?.toLowerCase()
  );
  private readonly subCategoryFilter$ = this.select((e) =>
    e.subCategoryFilter?.toLowerCase()
  );
  private readonly categories$ = this.select((e) => e.categories);
  private readonly subCategories$ = this.select((e) => e.subCategories);

  public readonly isLoading$ = this.select((e) => e.loading);
  public readonly filtredCategories$ = combineLatest([
    this.categoryFilter$,
    this.categories$,
  ]).pipe(
    map(([filter, categories]) =>
      categories.filter((c) => c.name.toLowerCase().includes(filter ?? ''))
    )
  );

  public readonly filtredSubCategories$ = combineLatest([
    this.subCategoryFilter$,
    this.subCategories$,
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

  public setFilter(filter: EntryFilter): void {
    this.setState((state) => {
      return {
        ...state,
        filter,
      };
    });
  }

  public loadCategories(): void {
    this.setState((state) => {
      return {
        ...state,
        loadingCategories: true,
      };
    });

    this._categoryService.get().subscribe({
      next: (categories) => this._loadCategoriesSuccess(categories),
      error: (error) => this._loadCategoriesFailure(error),
    });
  }

  public loadSubCategories(): void {
    this.setState((state) => {
      return {
        ...state,
        loadingSubCategories: true,
      };
    });

    this._subCategoryService.get().subscribe({
      next: (subCategories) => this._loadSubCategoriesSuccess(subCategories),
      error: (error) => this._loadSubCategoriesFailure(error),
    });
  }

  public setCategoryFilter(categoryFilter: string) {
    this.setState((state) => {
      return {
        ...state,
        categoryFilter,
      };
    });
  }

  public setSubCategoryFilter(subCategoryFilter: string) {
    this.setState((state) => {
      return {
        ...state,
        subCategoryFilter,
      };
    });
  }

  private _loadCategoriesSuccess(categories: CategoryModel[]): void {
    this.setState((state) => {
      return {
        ...state,
        categories,
        loadingCategories: false,
      };
    });
  }

  private _loadCategoriesFailure(error: any): void {
    this.setState((state) => {
      return {
        ...state,
        error,
        loadingCategories: false,
      };
    });
  }

  private _loadSubCategoriesSuccess(subCategories: SubCategoryModel[]): void {
    this.setState((state) => {
      return {
        ...state,
        subCategories,
        loadingSubCategories: false,
      };
    });
  }

  private _loadSubCategoriesFailure(error: any): void {
    this.setState((state) => {
      return {
        ...state,
        error,
        loadingSubCategories: false,
      };
    });
  }
}
