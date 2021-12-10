import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadItem, resetState } from './list-item.actions';
import { ListItemState } from './list-item.reducer';
import * as ListItemSelectors from './list-item.selectors';

@Injectable()
export class ListItemFacade {
  public readonly item$ = this._store.select(ListItemSelectors.itemSelector);

  constructor(private readonly _store: Store<ListItemState>) {}

  loadItem(id: string): void {
    this._store.dispatch(loadItem({ id }));
  }

  resetState(): void {
    this._store.dispatch(resetState());
  }
}
