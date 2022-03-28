import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EEntryType, EntryFilter, EntryService } from '@p-one/financial';
import { DialogService } from '@p-one/shared';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { DeleteEntryModalComponent } from '../../../modals/delete-entry-modal/delete-entry-modal.component';
import { PayEntryModalComponent } from '../../../modals/pay-entry-modal';
import {
  EEntryListActions,
  EntryListActionsUnion,
  filterEntries,
  filterEntriesFailure,
  filterEntriesSuccess,
  patchEntriesFilterSuccess,
} from './entry-list.actions';
import { EntryListFacade } from './entry-list.facade';

export function compareValue(aValue: any, bValue: any) {
  if (!aValue && !bValue) {
    return true;
  }

  if (!aValue || !bValue) {
    return false;
  }

  const keys = _.uniq([...Object.keys(aValue), ...Object.keys(bValue)]);

  for (let key of keys) {
    if (aValue[key] != bValue[key]) {
      return false;
    }
  }

  return true;
}
export function mapFilterToRequest(
  {
    date: { month, year },
    categories,
    subCategories,
    text,
    type,
    minValue,
    maxValue,
    paymentStatus,
  }: Partial<EntryFilter>,
  entryType?: EEntryType
): any {
  return {
    minValue,
    maxValue,
    text,
    type: entryType === undefined ? type : entryType,
    month,
    year,
    categories: categories?.map((c) => c.id),
    subCategories: subCategories?.map((c) => c.id),
    paymentStatus,
  };
}
@Injectable()
export class EntryListEffects {
  public readonly loadEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryListActions.LOAD_ENTRIES),
      map(() => filterEntries())
    )
  );

  public readonly patchEntriesFilterEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryListActions.PATCH_ENTRIES_FILTER),
      withLatestFrom(this._facade.filter$),
      filter(
        ([{ filter }, oldFilter]) =>
          !_.isEqualWith({ ...oldFilter, ...filter }, oldFilter, compareValue)
      ),
      map(([{ filter }]) => patchEntriesFilterSuccess({ filter }))
    )
  );

  public readonly patchEntriesFilterSuccessEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryListActions.PATCH_ENTRIES_FILTER_SUCCESS),
      map(() => filterEntries())
    )
  );

  public readonly filterEntriesEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryListActions.FILTER_ENTRIES),
      withLatestFrom(this._facade.filter$, this._facade.entryType$),
      switchMap(([_, filter, entryType]) => {
        return this._entryService
          .get(mapFilterToRequest(filter, entryType))
          .pipe(
            map((entries) => {
              return filterEntriesSuccess({ entries });
            }),
            catchError((error) => {
              return of(filterEntriesFailure({ error }));
            })
          );
      })
    )
  );

  public readonly removeFilterEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryListActions.REMOVE_FILTER),
      map(() => filterEntries())
    )
  );

  public readonly openDeleteEntryDialogEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryListActions.OPEN_DELETE_ENTRIES_DIALOG),
      withLatestFrom(this._facade.entries$),
      switchMap(([{ entry }, entries]) => {
        return this._dialogService
          .open(
            DeleteEntryModalComponent,
            { minWidth: '600px' },
            {
              entries: entry ? [entry] : entries,
            }
          )
          .afterClosed$.pipe(
            filter((value) => value),
            map(() => filterEntries())
          );
      })
    )
  );

  public readonly openPayEntryDialogEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryListActions.OPEN_PAY_ENTRY_DIALOG),
      switchMap(({ entry }) => {
        return this._dialogService
          .open(PayEntryModalComponent, { minWidth: '600px' }, entry)
          .afterClosed$.pipe(
            filter((value) => value),
            map(() => filterEntries())
          );
      })
    )
  );
  constructor(
    private readonly _actions$: Actions<EntryListActionsUnion>,
    private readonly _entryService: EntryService,
    private readonly _facade: EntryListFacade,
    private readonly _dialogService: DialogService
  ) {}
}
