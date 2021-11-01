import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadEntries, resetState } from './entry-list.actions';
import { EntryListState } from './entry-list.reducer';
import * as EntryListSelector from './entry-list.selectors';

@Injectable()
export class EntryListFacade {
  entries$ = this._store.select(EntryListSelector.entriesSelector);
  isLoading$ = this._store.select(EntryListSelector.loadingSelector);
  filter$ = this._store.select(EntryListSelector.filterSelector);

  constructor(private readonly _store: Store<EntryListState>) {}

  loadEntries(): void {
    this._store.dispatch(loadEntries());
  }

  resetState(): void {
    this._store.dispatch(resetState());
  }
}
