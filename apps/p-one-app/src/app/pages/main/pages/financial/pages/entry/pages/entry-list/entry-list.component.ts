import { Component, OnDestroy, OnInit } from '@angular/core';
import { EEntryType, EntryModel } from '@p-one/core';
import { DestroyableMixin, DialogService, FilterDisplayData } from '@p-one/shared';
import { map, take } from 'rxjs/operators';

import { EntryListFacade } from './+state/entry-list.facade';
import { EntryListFilterComponent } from './modals/entry-list-filter/entry-list-filter.component';

@Component({
  selector: 'p-one-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],
})
export class EntryListComponent
  extends DestroyableMixin()
  implements OnInit, OnDestroy
{
  public readonly EntryType = EEntryType;
  public readonly entries$ = this._facade.entries$;
  public readonly isLoading$ = this._facade.isLoading$;
  public readonly filterToDisplay$ = this._facade.filterToDisplay$;

  public readonly filter$ = this._facade.filter$;
  public readonly dateFilter$ = this.filter$.pipe(map(({ date }) => date));
  public readonly typeFilter$ = this.filter$.pipe(map(({ type }) => type));

  constructor(
    private readonly _facade: EntryListFacade,
    private readonly _dialogService: DialogService
  ) {
    super();
  }

  openEntryListFilterDialog(): void {
    this._facade.filter$.pipe(take(1)).subscribe((filter) => {
      const dialogRef = this._dialogService.open(
        EntryListFilterComponent,
        { minWidth: '700px' },
        filter
      );

      dialogRef.afterClosed$.subscribe((data) => {
        if (data) {
          this._facade.patchEntriesFilter(data);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this._facade.resetState();
  }

  remove({ id }: FilterDisplayData): void {
    this._facade.removeFilter(id);
  }

  setTypeFilter(type?: EEntryType): void {
    this._facade.patchEntriesFilter({
      type,
    });
  }

  setDateFilter(date: any): void {
    this._facade.patchEntriesFilter({
      date: {
        ...date,
      },
    });
  }

  openDeleteEntryDialog(entry: EntryModel): void {
    this._facade.openDeleteEntriesDialog(entry);
  }
  
  openPayEntryDialog(entry: EntryModel): void {
    this._facade.openPayEntryDialog(entry);
  }
  
  ngOnInit(): void {
    this._facade.loadEntries();
  }
}
