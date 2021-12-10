import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadBalances, openCreateBalanceDialog, setBalancesPage } from './balance.actions';
import { BalanceState } from './balance.reducer';
import * as BalanceSelectors from './balance.selectors';

@Injectable()
export class BalanceFacade {
  public readonly pagination$ = this._store.select(
    BalanceSelectors.paginationSelector
  );

  public readonly filtredPaginatedBalances$ = this._store.select(
    BalanceSelectors.filtredPaginatedBalancesSelector
  );

  public readonly filtredBalancesLength$ = this._store.select(
    BalanceSelectors.filtredBalancesLengthSelector
  );

  public readonly isLoading$ = this._store.select(
    BalanceSelectors.isLoadingSelector
  );

  constructor(private readonly _store: Store<BalanceState>) {}

  public loadBalances(): void {
    this._store.dispatch(loadBalances());
  }

  public setBalancesPage(page: number): void {
    this._store.dispatch(setBalancesPage({ page }));
  }

  public openCreateBalanceDialog() {
    this._store.dispatch(openCreateBalanceDialog());
  }
}
