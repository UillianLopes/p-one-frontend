import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoryFilter, CategoryModel } from '@p-one/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  createSubCategory,
  deleteSelectedSubCategories,
  deleteSubCategory,
  filterSubCategories,
  loadSubCategories,
  resetState,
  setOpenedCreateSubCategoryDialog,
  setOpenedDeleteSubCategoryDialog,
  setOpenedUpdateSubCategoryDialog,
  setSubCategoriesPage,
  toggleSelectMultipleSubCategories,
  toggleSubCategory,
  updateSubCategory,
} from './sub-category.actions';
import { SubCategoryState } from './sub-category.reducer';
import * as SubCategorySelectors from './sub-category.selectors';

@Injectable()
export class SubCategoryFacade {
  readonly filtredPaginatedSubCategories$ = this._store.select(
    SubCategorySelectors.filtredPaginatedSubCategoriesSelector
  );

  readonly isLoading$ = this._store.select(
    SubCategorySelectors.loadingSelector
  );

  readonly filter$ = this._store.select(SubCategorySelectors.filterSelector);

  readonly createSubCategoryDialogId$ = this._store.select(
    SubCategorySelectors.createSubCategoryDialogIdSelector
  );

  readonly updateSubCategoryDialogId$ = this._store.select(
    SubCategorySelectors.updateSubCategoryDialogIdSelector
  );

  readonly deleteSubCategoryDialogId$ = this._store.select(
    SubCategorySelectors.deleteSubCategoryDialogIdSelector
  );

  readonly filtredSubCategoriesLength$ = this._store.select(
    SubCategorySelectors.filtredSubCategoriesLengthSelector
  );

  readonly selectedSubCategoryIds$ = this._store.select(
    SubCategorySelectors.selectedSubCategoryIdsSelector
  );

  readonly filtredSubCategories$ = this._store.select(
    SubCategorySelectors.filtredSubCategoriesSelector
  );

  readonly filtredSubCategoriesIds$ = this._store.select(
    SubCategorySelectors.filtredSubCategoriesIdsSelector
  );

  readonly filtredSelectedSubCategories$ = this._store.select(
    SubCategorySelectors.filtredSelectedSubCategoriesSelector
  );

  readonly filtredSelectedSubCategoriesIds$ = this._store.select(
    SubCategorySelectors.filtredSelectedSubCategoriesIdsSelector
  );

  readonly isAllFiltredSubCategoriesSelected$ = this._store.select(
    SubCategorySelectors.isAllFiltredSubCategoriesSelectedSelector
  );

  readonly isSomeFiltredSubCategoriesSelected$ = this._store.select(
    SubCategorySelectors.isSomeFiltredSubCategoriesSelectedSelector
  );

  readonly page$ = this._store.select(SubCategorySelectors.pageSelector);

  readonly pageSize$ = this._store.select(
    SubCategorySelectors.pageSizeSelector
  );

  readonly isSomeButNotAllFiltredSubCategoriesSelected$ = combineLatest([
    this.isAllFiltredSubCategoriesSelected$,
    this.isSomeFiltredSubCategoriesSelected$,
  ]).pipe(
    map(
      ([
        isAllFiltredSubCategoriesSelected,
        isSomeFiltredSubCategoriesSelected,
      ]) =>
        !isAllFiltredSubCategoriesSelected && isSomeFiltredSubCategoriesSelected
    )
  );

  constructor(private readonly _store: Store<SubCategoryState>) {}

  loadSubCategories(): void {
    this._store.dispatch(loadSubCategories());
  }

  resetState(): void {
    this._store.dispatch(resetState());
  }

  deleteSelectedSubCategories(): void {
    this._store.dispatch(deleteSelectedSubCategories());
  }

  deleteSubCategory(categoryId: string): void {
    this._store.dispatch(deleteSubCategory({ subCategoryId: categoryId }));
  }

  filterSubCategories(filter: CategoryFilter): void {
    this._store.dispatch(filterSubCategories({ filter }));
  }

  toggleSelectMultipleSubCategories(): void {
    this._store.dispatch(toggleSelectMultipleSubCategories());
  }

  toggleSubCategory(categoryId: string): void {
    this._store.dispatch(toggleSubCategory({ subCategoryId: categoryId }));
  }

  setOpenedCreateSubCategoryDialog(createCategoryDialogId: string): void {
    this._store.dispatch(
      setOpenedCreateSubCategoryDialog({ createCategoryDialogId })
    );
  }

  setOpenedUpdateSubCategoryDialog(updateCategoryDialogId: string): void {
    this._store.dispatch(
      setOpenedUpdateSubCategoryDialog({ updateCategoryDialogId })
    );
  }

  setOpenedDeleteSubCategoryDialog(deleteCategoryDialogId: string): void {
    this._store.dispatch(
      setOpenedDeleteSubCategoryDialog({ deleteSubCategoryDialogId: deleteCategoryDialogId })
    );
  }

  setSubCategoriesPage(page: number) {
    this._store.dispatch(setSubCategoriesPage({ page }));
  }

  createSubCategory(category: CategoryModel): void {
    this._store.dispatch(createSubCategory({ category }));
  }

  updateSubCategory(category: CategoryModel): void {
    this._store.dispatch(updateSubCategory({ category }));
  }
}
