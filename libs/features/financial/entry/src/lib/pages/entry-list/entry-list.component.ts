import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EEntryOperation, EEntryPaymentStatus, EntryModel } from '@p-one/domain/financial';
import { DestroyableMixin, DialogService, FilterDisplayData } from '@p-one/shared';
import { SettingsStoreFacade } from '@p-one/stores/identity';
import { map, take } from 'rxjs/operators';

import { EntryListFacade } from './+state/entry-list.facade';
import { EntryDetailsModalComponent } from './modals/entry-details-modal/entry-details-modal.component';
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
  public readonly EntryType = EEntryOperation;
  public readonly EntryPaymentStatus = EEntryPaymentStatus;

  public readonly entries$ = this._facade.entries$;
  public readonly isLoading$ = this._facade.isLoading$;
  public readonly filterToDisplay$ = this._facade.filterToDisplay$;

  public readonly filter$ = this._facade.filter$;
  public readonly dateFilter$ = this.filter$.pipe(map(({ date }) => date));
  public readonly operationFilter$ = this.filter$.pipe(
    map(({ operation }) => operation)
  );
  public readonly entryType$ = this._facade.entryType$;
  public readonly settingsCurrency$ =
    this._settingsStoreFacade.settingsCurrency$;

  constructor(
    private readonly _facade: EntryListFacade,
    private readonly _dialogService: DialogService,
    private readonly _route: ActivatedRoute,
    private readonly _settingsStoreFacade: SettingsStoreFacade
  ) {
    super();
  }

  public openEntryListFilterDialog(): void {
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

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._facade.resetState();
  }

  public remove({ id }: FilterDisplayData): void {
    this._facade.removeFilter(id);
  }

  public setTypeFilter(operation?: EEntryOperation): void {
    this._facade.patchEntriesFilter({
      operation,
    });
  }

  public setDateFilter(date: any): void {
    this._facade.patchEntriesFilter({
      date: {
        ...date,
      },
    });
  }

  public openDeleteEntryDialog(entry: EntryModel): void {
    this._facade.openDeleteEntriesDialog(entry);
  }

  public openPayEntryDialog(entry: EntryModel): void {
    this._facade.openPayEntryDialog(entry);
  }

  public openEntryDetailsDialog(entry: EntryModel): void {
    this._dialogService.open(
      EntryDetailsModalComponent,
      {
        maxWidth: '800px',
        minWidth: '800px',
      },
      entry
    );
  }

  public ngOnInit(): void {
    this._facade.loadEntriesWithType(this._route.snapshot.data['type']);
  }
}
