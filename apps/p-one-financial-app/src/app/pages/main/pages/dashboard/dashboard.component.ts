import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterDisplayData } from '@p-one/shared';

import { DashboardFacade } from './+state/dashboard.facade';

@Component({
  selector: 'p-one-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public readonly filter$ = this._dashboardFacade.filter$;
  public readonly filtersToDisplay$ = this._dashboardFacade.applyedFilters$;

  constructor(private readonly _dashboardFacade: DashboardFacade) {}


  public ngOnInit(): void {}

  public openFilterModal(): void {
    this._dashboardFacade.openFilterModal();
  }

  public removeApplyedFilter({ id }: FilterDisplayData): void {
    this._dashboardFacade.removeApplyedFilter(id);
  }

  public ngOnDestroy(): void {
    this._dashboardFacade.resetState();
  }
}
