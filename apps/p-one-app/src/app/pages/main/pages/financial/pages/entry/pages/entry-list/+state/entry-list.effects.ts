import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EntryService } from '@p-one/core';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import {
  EEntryListActions,
  EntryListActionsUnion,
  loadEntriesFailure,
  loadEntriesSuccess,
  paginateEntriesFailure,
  paginateEntriesSuccess,
} from './entry-list.actions';
import { EntryListFacade } from './entry-list.facade';

@Injectable()
export class EntryListEffects {
  readonly loadEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryListActions.LOAD_ENTRIES),
      withLatestFrom(this._facade.filter$),
      switchMap(([_, { page, pageSize }]) => {
        return this._entryService
          .get({
            page,
            pageSize,
          })
          .pipe(
            map((entries) => {
              return loadEntriesSuccess({
                entries,
              });
            }),
            catchError((error) => of(loadEntriesFailure({ error })))
          );
      })
    )
  );

  readonly paginateEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryListActions.PAGINATE_ENTRIES),
      withLatestFrom(this._facade.filter$),
      filter(([{ pagination }, { page }]) => pagination.page !== page),
      switchMap(([{ pagination }, currentFilter]) => {
        return this._entryService
          .get({
            ...currentFilter,
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
  constructor(
    private readonly _actions$: Actions<EntryListActionsUnion>,
    private readonly _entryService: EntryService,
    private readonly _facade: EntryListFacade
  ) {}
}
