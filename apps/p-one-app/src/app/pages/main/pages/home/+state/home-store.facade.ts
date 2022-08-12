import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadWallets } from './home-store.actions';
import { HomeStoreState } from './home-store.reducer';
import * as HomeStoreSelectors from './home-store.selectors';

@Injectable()
export class HomeStoreFacade {
  public readonly wallets$ = this._store.select(
    HomeStoreSelectors.walletsSelector
  );

  public readonly isWalletsLoading$ = this._store.select(
    HomeStoreSelectors.isWalletsLoadingSelector
  );

  constructor(private readonly _store: Store<HomeStoreState>) {}

  public loadWallets(): void {
    this._store.dispatch(loadWallets());
  }
}
