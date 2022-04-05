import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { openFilterModal, removeApplyedFilter } from './dashboard.actions';
import { DashboardState } from './dashboard.reducer';
import * as DashboardSelectors from './dashboard.selectors';

@Injectable()
export class DashboardFacade {
  public isLoadingBalancesOverTime$ = this._store.select(
    DashboardSelectors.isLoadingBalancesOverTimeSelector
  );
  public readonly filter$ = this._store.select(
    DashboardSelectors.filterSelector
  );

  public readonly applyedFilters$ = this._store.select(
    DashboardSelectors.applyedFiltersSelector
  );

  constructor(private readonly _store: Store<DashboardState>) {}

  public openFilterModal() {
    this._store.dispatch(openFilterModal());
  }

  public removeApplyedFilter(id: string) {
    this._store.dispatch(removeApplyedFilter({ id }));
  }
}
