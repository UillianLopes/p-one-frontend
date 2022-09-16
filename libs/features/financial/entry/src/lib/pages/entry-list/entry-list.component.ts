import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalRoles } from '@p-one/core';
import { EEntryOperation, EEntryPaymentStatus, EntryModel, FinancialRoles } from '@p-one/domain/financial';
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
  EntryRoles = FinancialRoles.Entry;
  GlobalRoles = GlobalRoles;

  readonly EntryType = EEntryOperation;
  readonly EntryPaymentStatus = EEntryPaymentStatus;
  readonly entries$ = this._facade.entries$;
  readonly isLoading$ = this._facade.isLoading$;
  readonly filterToDisplay$ = this._facade.filterToDisplay$;
  readonly filter$ = this._facade.filter$;
  readonly dateFilter$ = this.filter$.pipe(map(({ date }) => date));
  readonly operationFilter$ = this.filter$.pipe(
    map(({ operation }) => operation)
  );
  readonly entryType$ = this._facade.entryType$;
  readonly settingsCurrency$ = this._settingsStoreFacade.settingsCurrency$;

  constructor(
    private readonly _facade: EntryListFacade,
    private readonly _dialogService: DialogService,
    private readonly _route: ActivatedRoute,
    private readonly _settingsStoreFacade: SettingsStoreFacade
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

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._facade.resetState();
  }

  remove({ id }: FilterDisplayData): void {
    this._facade.removeFilter(id);
  }

  setTypeFilter(operation?: EEntryOperation): void {
    this._facade.patchEntriesFilter({
      operation,
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
    this._facade.openDeleteEntryDialog(entry);
  }

  openPayEntryDialog(entry: EntryModel): void {
    this._facade.openPayEntryDialog(entry);
  }

  openEntryDetailsDialog(entry: EntryModel): void {
    this._dialogService.open(
      EntryDetailsModalComponent,
      {
        maxWidth: '800px',
        minWidth: '800px',
      },
      entry
    );
  }

  ngOnInit(): void {
    this._facade.loadEntriesWithType(this._route.snapshot.data['type']);
  }
}
