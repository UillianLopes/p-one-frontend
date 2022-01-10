import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BalanceService } from '@p-one/core';
import { DialogService } from '@p-one/shared';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import { CreateBalanceModalComponent } from '../modals/create-balance-modal/create-balance-modal.component';
import { DeleteBalanceModalComponent } from '../modals/delete-balance-modal/delete-balance-modal.component';
import { UpdateBalanceModalComponent } from '../modals/update-balance-modal/update-balance-modal.component';
import {
  BalanceActionsUnion,
  EBalanceActions,
  loadBalances,
  loadBalancesFailure,
  loadBalancesSuccess,
} from './balance.actions';

@Injectable()
export class BalanceEffects {
  public readonly loadBalanceEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EBalanceActions.LOAD_BALANCES),
      switchMap(() => {
        return this._balanceService.get().pipe(
          map((balances) => loadBalancesSuccess({ balances })),
          catchError((error) => of(loadBalancesFailure({ error })))
        );
      })
    )
  );

  public readonly openCreateBalanceEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EBalanceActions.OPEN_CREATE_BALANCE_DIALOG),
      switchMap(() =>
        this._dialogService
          .open(CreateBalanceModalComponent, {
            minWidth: '800px',
            maxWidth: '800px',
          })
          .afterClosed$.pipe(
            filter((value) => !!value),
            map(() => loadBalances())
          )
      )
    )
  );

  public readonly openUpdateBalanceEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EBalanceActions.OPEN_UPDATE_BALANCE_DIALOG),
      switchMap(({ balance }) =>
        this._dialogService
          .open(
            UpdateBalanceModalComponent,
            {
              minWidth: '800px',
              maxWidth: '800px',
            },
            balance
          )
          .afterClosed$.pipe(
            filter((value) => !!value),
            map(() => loadBalances())
          )
      )
    )
  );

  public readonly openDeleteBalanceEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EBalanceActions.OPEN_DELETE_BALANCE_DIALOG),
      switchMap(({ balance }) =>
        this._dialogService
          .open(
            DeleteBalanceModalComponent,
            {
              minWidth: '800px',
              maxWidth: '800px',
            },
            [balance]
          )
          .afterClosed$.pipe(
            filter((value) => !!value),
            map(() => loadBalances())
          )
      )
    )
  );
  constructor(
    private readonly _actions$: Actions<BalanceActionsUnion>,
    private readonly _balanceService: BalanceService,
    private readonly _dialogService: DialogService
  ) {}
}
