import { Component, OnDestroy, OnInit } from '@angular/core';
import { EntryType } from '@p-one/core';
import { DestroyableMixin, DialogService } from '@p-one/shared';
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
  public readonly EntryType = EntryType;
  public readonly entries$ = this._facade.entries$;
  public readonly isLoading$ = this._facade.isLoading$;

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
      const { dialogRef } = this._dialogService.open(
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

  setTypeFilter(type?: EntryType): void {
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

  ngOnInit(): void {
    this._facade.loadEntries();
  }
}
