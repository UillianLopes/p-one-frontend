import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadCategories, resetState } from './category-list.actions';
import { CategoryListState } from './category-list.reducer';
import * as EntryListSelector from './category-list.selectors';

@Injectable()
export class CategoryListFacade {
  categories$ = this._store.select(EntryListSelector.filtredPaginatedCategoriesSelector);
  isLoading$ = this._store.select(EntryListSelector.loadingSelector);
  filter$ = this._store.select(EntryListSelector.filterSelector);

  constructor(private readonly _store: Store<CategoryListState>) {}

  loadCategories(): void {
    this._store.dispatch(loadCategories());
  }

  resetState(): void {
    this._store.dispatch(resetState());
  }
}
