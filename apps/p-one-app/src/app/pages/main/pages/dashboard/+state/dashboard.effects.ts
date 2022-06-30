import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DialogService } from '@p-one/shared';
import * as _ from 'lodash';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { DashboardFilterModalComponent } from '../modals/dashboard-filter-modal/dashboard-filter-modal.component';
import {
  DashboardActionsUnion,
  EDashboardActions,
  filterModalClosed,
  setFilter,
  setFilterSuccess,
} from './dashboard.actions';
import { DashboardFacade } from './dashboard.facade';

@Injectable()
export class DashboardEffects {
  public readonly setFilter$ = createEffect(() =>
    this._actions.pipe(
      ofType(EDashboardActions.SET_FILTER),
      withLatestFrom(this._facade.filter$),
      filter(
        ([{ filter }, currentFilter]) =>
          filter && !_.isEqual(filter, currentFilter)
      ),
      map(([{ filter }]) => {
        return setFilterSuccess({ filter });
      })
    )
  );

  public readonly openFilterModal$ = createEffect(() =>
    this._actions.pipe(
      ofType(EDashboardActions.OPEN_FILTER_MODAL),
      withLatestFrom(this._facade.filter$),
      switchMap(([_, currentFilter]) =>
        this._dialogService
          .open(
            DashboardFilterModalComponent,
            { minWidth: '500px' },
            currentFilter
          )
          .afterClosed$.pipe(
            map((result) => filterModalClosed({ filter: result }))
          )
      )
    )
  );

  public readonly filterModalClosed$ = createEffect(() =>
    this._actions.pipe(
      ofType(EDashboardActions.FILTER_MODAL_CLOSED),
      filter(({ filter }) => !!filter),
      map(({ filter }) => setFilter({ filter }))
    )
  );

  public readonly removeApplyedFilter = createEffect(() =>
    this._actions.pipe(
      ofType(EDashboardActions.REMOVE_APPLIED_FILTER),
      withLatestFrom(this._facade.filter$),
      map(([{ id }, filter]) => {
        let newFilter = { ...filter };

        switch (id) {
          case 'CATEGORIES':
            newFilter = { ...filter, categories: undefined };
            break;

          case 'SUB_CATEGORIES':
            newFilter = { ...filter, subCategories: undefined };
            break;

          case 'WALLETS':
            newFilter = { ...filter, wallets: undefined };
            break;
        }

        return setFilter({ filter: newFilter });
      })
    )
  );

  constructor(
    private readonly _actions: Actions<DashboardActionsUnion>,
    private readonly _facade: DashboardFacade,
    private readonly _dialogService: DialogService
  ) {}
}
