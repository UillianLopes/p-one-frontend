import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WalletService } from '@p-one/domain/financial';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { EHomeStoreActions, HomeStoreActionsUnion, loadWalletsFailure, loadWalletsSuccess } from './home-store.actions';

@Injectable()
export class HomeStoreEffects {
  public readonly wallets$ = createEffect(() =>
    this._actions.pipe(
      ofType(EHomeStoreActions.LOAD_WALLETS),
      switchMap(() =>
        this._walletService.get().pipe(
          map((wallets) => loadWalletsSuccess({ wallets })),
          catchError((error) => of(loadWalletsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly _walletService: WalletService,
    private readonly _actions: Actions<HomeStoreActionsUnion>
  ) {}
}
