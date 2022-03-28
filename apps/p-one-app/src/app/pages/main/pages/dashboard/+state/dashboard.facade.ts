import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { DashboardState } from './dashboard.reducer';
import * as DashboardSelectors from './dashboard.selectors';

@Injectable()
export class DashboardFacade {
  public isLoadingBalancesOverTime$ = this._store.select(
    DashboardSelectors.isLoadingBalancesOverTimeSelector
  );

  constructor(private readonly _store: Store<DashboardState>) {}
}
