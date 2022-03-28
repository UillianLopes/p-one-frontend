import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  POneCardModule,
  POneChartModule,
  POneContainerModule,
  POneHeaderModule,
  POneLineChartModule,
  POneSidenavModule,
} from '@p-one/shared';

import { BalancesOvertimeChartModule } from '../../../../components/balances-overtime-chart/balances-overtime-chart.module';
import { DashboardEffects } from './+state/dashboard.effects';
import { DashboardFacade } from './+state/dashboard.facade';
import { DASHBOARD_KEY, dashboardReducer } from './+state/dashboard.reducer';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    POneContainerModule,
    POneHeaderModule,
    POneSidenavModule,
    POneCardModule,
    POneChartModule,
    POneLineChartModule,
    StoreModule.forFeature(DASHBOARD_KEY, dashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
    BalancesOvertimeChartModule,
  ],
  providers: [DashboardFacade],
})
export class DashboardModule {}
