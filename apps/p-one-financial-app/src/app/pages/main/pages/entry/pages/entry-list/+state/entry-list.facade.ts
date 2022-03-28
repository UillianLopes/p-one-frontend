import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EEntryType, EntryFilter, EntryModel, PaginatedFilter } from '@p-one/financial';

import {
  filterEntries,
  loadEntriesWithType,
  openDeleteEntriesDialog,
  openPayEntryDialog,
  paginateEntries,
  patchEntriesFilter,
  removeFilter,
  resetState,
} from './entry-list.actions';
import { EntryListState } from './entry-list.reducer';
import * as EntryListSelector from './entry-list.selectors';

@Injectable()
export class EntryListFacade {
  public readonly entries$ = this._store.select(
    EntryListSelector.entriesSelector
  );
  public readonly isLoading$ = this._store.select(
    EntryListSelector.loadingSelector
  );
  public readonly filter$ = this._store.select(
    EntryListSelector.filterSelector
  );
  public readonly pagination$ = this._store.select(
    EntryListSelector.paginationSelector
  );
  public readonly page$ = this._store.select(EntryListSelector.pageSelector);
  public readonly pageSize$ = this._store.select(
    EntryListSelector.pageSizeSelector
  );
  public readonly filterToDisplay$ = this._store.select(
    EntryListSelector.filterToDisplaySelector
  );

  public readonly typeFilter$ = this._store.select(
    EntryListSelector.typeFilterSelecotr
  );

  public readonly entryType$ = this._store.select(
    EntryListSelector.entryTypeSelector
  );

  constructor(private readonly _store: Store<EntryListState>) {}

  public loadEntriesWithType(entryType?: EEntryType): void {
    this._store.dispatch(loadEntriesWithType({ entryType }));
  }

  public paginateEntries(pagination: PaginatedFilter): void {
    this._store.dispatch(
      paginateEntries({
        pagination,
      })
    );
  }

  public filterEntries(): void {
    this._store.dispatch(filterEntries());
  }

  public patchEntriesFilter(filter: Partial<EntryFilter>): void {
    this._store.dispatch(patchEntriesFilter({ filter }));
  }

  public resetState(): void {
    this._store.dispatch(resetState());
  }

  public removeFilter(id: string): void {
    this._store.dispatch(removeFilter({ id }));
  }

  public openDeleteEntriesDialog(entry?: EntryModel): void {
    this._store.dispatch(openDeleteEntriesDialog({ entry }));
  }

  public openPayEntryDialog(entry?: EntryModel): void {
    this._store.dispatch(openPayEntryDialog({ entry }));
  }
}
