import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { WalletModel } from '@p-one/domain/financial';

import {
  filterWallets,
  loadWallets,
  openCreateWalletDialog,
  openDeleteWalletDialog,
  openDepositWalletDialog,
  openTransferFoundsDialog,
  openUpdateWalletDialog,
  openWithdrawWalletDialog,
  setWalletsPage,
} from './wallet-store.actions';
import { WalletState } from './wallet-store.reducer';
import * as WalletSelectors from './wallet-store.selectors';

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

  public filterWallets(filter: string): void {
    this._store.dispatch(filterWallets({ filter }));
  }
  public loadWallets(): void {
    this._store.dispatch(loadWallets());
  }

  public setWalletsPage(page: number): void {
    this._store.dispatch(setWalletsPage({ page }));
  }

  public openCreateWalletDialog(): void {
    this._store.dispatch(openCreateWalletDialog());
  }

  public openUpdateWalletDialog(wallet: WalletModel): void {
    this._store.dispatch(openUpdateWalletDialog({ wallet }));
  }

  public openDepositWalletDialog(wallet: WalletModel): void {
    this._store.dispatch(openDepositWalletDialog({ wallet }));
  }

  public openWithdrawWalletDialog(wallet?: WalletModel): void {
    this._store.dispatch(openWithdrawWalletDialog({ wallet }));
  }

  public openDeleteWalletDialog(balance: WalletModel) {
    this._store.dispatch(openDeleteWalletDialog({ wallet: balance }));
  }

  public openTransferFoundsDialog(wallet: WalletModel) {
    this._store.dispatch(openTransferFoundsDialog({ wallet }));
  }
}
