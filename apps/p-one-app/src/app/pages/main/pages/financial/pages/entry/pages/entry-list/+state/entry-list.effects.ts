import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EntryFilter, EntryService } from '@p-one/core';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import {
  EEntryListActions,
  EntryListActionsUnion,
  filterEntries,
  filterEntriesFailure,
  filterEntriesSuccess,
  paginateEntriesFailure,
  paginateEntriesSuccess,
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

  console.log('A VALUE -> B VALUE', { ...aValue }, { ...bValue });
  for (let key of keys) {
    if (aValue[key] != bValue[key]) {
      return false;
    }
  }

  return true;
}
export function mapFilterToRequest({
  date,
  categories,
  subCategories,
  text,
  type,
}: Partial<EntryFilter>): any {
  return {
    text,
    type,
    month: date.month,
    year: date.year,
    categoryIds: categories?.map((c) => c.id),
    subCategoryIds: subCategories?.map((c) => c.id),
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

  public readonly paginateEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryListActions.PAGINATE_ENTRIES),
      withLatestFrom(
        this._facade.filter$.pipe(map((filter) => mapFilterToRequest(filter))),
        this._facade.pagination$
      ),
      filter(
        ([{ pagination }, __, currentPagination]) =>
          currentPagination.page !== pagination.page
      ),
      switchMap(([{ pagination }, filter]) => {
        return this._entryService
          .get({
            ...filter,
            ...pagination,
          })
          .pipe(
            map((entries) => {
              return paginateEntriesSuccess({
                entries,
                pagination,
              });
            }),

            catchError((error) => of(paginateEntriesFailure({ error })))
          );
      })
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
      withLatestFrom(this._facade.filter$, this._facade.pagination$),
      switchMap(([_, filter, pagination]) => {
        return this._entryService
          .get({
            ...mapFilterToRequest(filter),
            ...pagination,
          })
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

  constructor(
    private readonly _actions$: Actions<EntryListActionsUnion>,
    private readonly _entryService: EntryService,
    private readonly _facade: EntryListFacade
  ) {}
}
