import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { DashboardService } from '@p-one/financial';

import { DashboardActionsUnion } from './dashboard.actions';
import { DashboardFacade } from './dashboard.facade';

@Injectable()
export class DashboardEffects {
  constructor(
    private readonly _actions: Actions<DashboardActionsUnion>,
    private readonly _facade: DashboardFacade,
    private readonly _service: DashboardService
  ) {}
}
