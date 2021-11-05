import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoryModel } from '@p-one/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  createCategory,
  deleteCategory,
  loadCategories,
  resetState,
  setOpenedCreateCategoryDialog,
  setOpenedUpdateCategoryDialog,
  toggleCategory,
  toggleSelectMultipleCategories,
  updateCategory,
} from './category-list.actions';
import { CategoryListState } from './category-list.reducer';
import * as CategoryListSelectors from './category-list.selectors';

@Injectable()
export class CategoryListFacade {
  readonly filtredPaginatedCategories$ = this._store.select(
    CategoryListSelectors.filtredPaginatedCategoriesSelector
  );

  readonly isLoading$ = this._store.select(
    CategoryListSelectors.loadingSelector
  );

  readonly filter$ = this._store.select(CategoryListSelectors.filterSelector);

  readonly createCategoryDialogRef$ = this._store.select(
    CategoryListSelectors.createCategoryDialogIdSelector
  );

  readonly updateCategoryDialogRef$ = this._store.select(
    CategoryListSelectors.updateCategoryDialogIdSelector
  );

  readonly selectedCategoryIds$ = this._store.select(
    CategoryListSelectors.selectedCategoryIdsSelector
  );

  readonly filtredCategoriesIds$ = this._store.select(
    CategoryListSelectors.filtredCategoriesIdsSelector
  );

  readonly isAllFiltredCategoriesSelected$ = this._store.select(
    CategoryListSelectors.isAllFiltredCategoriesSelectedSelector
  );

  readonly isSomeFiltredCategoriesSelected$ = this._store.select(
    CategoryListSelectors.isSomeFiltredCategoriesSelectedSelector
  );

  readonly isSomeButNotAllFiltredCategoriesSelected$ = combineLatest([
    this.isAllFiltredCategoriesSelected$,
    this.isSomeFiltredCategoriesSelected$,
  ]).pipe(
    map(
      ([isAllFiltredCategoriesSelected, isSomeFiltredCategoriesSelected]) =>
        !isAllFiltredCategoriesSelected && isSomeFiltredCategoriesSelected
    )
  );

  constructor(private readonly _store: Store<CategoryListState>) {}

  loadCategories(): void {
    this._store.dispatch(loadCategories());
  }

  resetState(): void {
    this._store.dispatch(resetState());
  }

  deleteCategory(categoryId: string): void {
    this._store.dispatch(deleteCategory({ categoryId }));
  }

  toggleSelectMultipleCategories(): void {
    this._store.dispatch(toggleSelectMultipleCategories());
  }
  
  toggleCategory(categoryId: string): void {
    this._store.dispatch(toggleCategory({ categoryId }));
  }

  setOpenedCreateCategoryDialog(createCategoryDialogId: string): void {
    this._store.dispatch(
      setOpenedCreateCategoryDialog({ createCategoryDialogId })
    );
  }

  setOpenedUpdateCategoryDialog(updateCategoryDialogId: string): void {
    this._store.dispatch(
      setOpenedUpdateCategoryDialog({ updateCategoryDialogId })
    );
  }

  createCategory(category: CategoryModel): void {
    this._store.dispatch(createCategory({ category }));
  }

  updateCategory(category: CategoryModel): void {
    this._store.dispatch(updateCategory({ category }));
  }
}
