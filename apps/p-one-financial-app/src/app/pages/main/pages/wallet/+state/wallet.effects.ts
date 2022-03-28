import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WalletService } from '@p-one/financial';
import { DialogService } from '@p-one/shared';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import { CreateWalletModalComponent } from '../modals/create-wallet-modal/create-wallet-modal.component';
import { DeleteWalletModalComponent } from '../modals/delete-wallet-modal/delete-wallet-modal.component';
import { DepositModalComponent } from '../modals/deposit-modal/deposit-modal.component';
import { UpdateWalletModalComponent } from '../modals/update-wallet-modal/update-wallet-modal.component';
import { WithdrawModalComponent } from '../modals/withdraw-modal/withdraw-modal.component';
import { EWalletActions, loadWallets, loadWalletsFailure, loadWalletsSuccess, WalletActionsUnion } from './wallet.actions';

@Injectable()
export class WalletEffects {
  public readonly loadWalletEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EWalletActions.LOAD_WALLETS),
      switchMap(() => {
        return this._walletService.get().pipe(
          map((wallets) => loadWalletsSuccess({ wallets })),
          catchError((error) => of(loadWalletsFailure({ error })))
        );
      })
    )
  );

  public readonly openCreateWalletEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EWalletActions.OPEN_CREATE_WALLET_DIALOG),
      switchMap(() =>
        this._dialogService
          .open(CreateWalletModalComponent, {
            minWidth: '800px',
            maxWidth: '800px',
          })
          .afterClosed$.pipe(
            filter((value) => !!value),
            map(() => loadWallets())
          )
      )
    )
  );

  public readonly openUpdateWalletEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EWalletActions.OPEN_UPDATE_WALLET_DIALOG),
      switchMap(({ wallet }) =>
        this._dialogService
          .open(
            UpdateWalletModalComponent,
            {
              minWidth: '800px',
              maxWidth: '800px',
            },
            wallet
          )
          .afterClosed$.pipe(
            filter((value) => !!value),
            map(() => loadWallets())
          )
      )
    )
  );

  public readonly openDepositWalletEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EWalletActions.OPEN_DEPOSIT_WALLET_DIALOG),
      switchMap(({ wallet }) =>
        this._dialogService
          .open(
            DepositModalComponent,
            {
              minWidth: '550px',
              maxWidth: '550px',
            },
            wallet
          )
          .afterClosed$.pipe(
            filter((value) => !!value),
            map(() => loadWallets())
          )
      )
    )
  );

  public readonly openWidthdrawWalletEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EWalletActions.OPEN_WITHDRAW_WALLET_DIALOG),
      switchMap(({ wallet }) =>
        this._dialogService
          .open(
            WithdrawModalComponent,
            {
              minWidth: '550px',
              maxWidth: '550px',
            },
            wallet
          )
          .afterClosed$.pipe(
            filter((value) => !!value),
            map(() => loadWallets())
          )
      )
    )
  );

  public readonly openDeleteWalletEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EWalletActions.OPEN_DELETE_WALLET_DIALOG),
      switchMap(({ wallet }) =>
        this._dialogService
          .open(
            DeleteWalletModalComponent,
            {
              minWidth: '800px',
              maxWidth: '800px',
            },
            [wallet]
          )
          .afterClosed$.pipe(
            filter((value) => !!value),
            map(() => loadWallets())
          )
      )
    )
  );
  constructor(
    private readonly _actions$: Actions<WalletActionsUnion>,
    private readonly _walletService: WalletService,
    private readonly _dialogService: DialogService
  ) {}
}
