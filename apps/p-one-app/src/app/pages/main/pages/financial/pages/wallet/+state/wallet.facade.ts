import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { WalletModel } from '../../../../../../../../../../../libs/core/src';
import {
  loadWallets,
  openCreateWalletDialog,
  openDeleteWalletDialog,
  openUpdateWalletDialog,
  setWalletsPage,
} from './wallet.actions';
import { WalletState } from './wallet.reducer';
import * as WalletSelectors from './wallet.selectors';

@Injectable()
export class WalletFacade {
  public readonly pagination$ = this._store.select(
    WalletSelectors.paginationSelector
  );

  public readonly filtredPaginatedWallets$ = this._store.select(
    WalletSelectors.filtredPaginatedWalletsSelector
  );

  public readonly filtredWalletsLength$ = this._store.select(
    WalletSelectors.filtredWalletsLengthSelector
  );

  public readonly isLoading$ = this._store.select(
    WalletSelectors.isLoadingSelector
  );

  constructor(private readonly _store: Store<WalletState>) {}

  public loadWallets(): void {
    this._store.dispatch(loadWallets());
  }

  public setWalletsPage(page: number): void {
    this._store.dispatch(setWalletsPage({ page }));
  }

  public openCreateWalletDialog() {
    this._store.dispatch(openCreateWalletDialog());
  }

  public openUpdateWalletDialog(balance: WalletModel) {
    this._store.dispatch(openUpdateWalletDialog({ wallet: balance }));
  }

  public openDeleteWalletDialog(balance: WalletModel) {
    this._store.dispatch(openDeleteWalletDialog({ wallet: balance }));
  }
}
