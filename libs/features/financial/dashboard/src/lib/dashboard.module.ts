import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { POneNotificationsDisplayButtonModule } from '@p-one/features/shared';
import {
  POneBreadcrumbModule,
  POneCardModule,
  POneChartModule,
  POneContainerModule,
  POneDatepickerModule,
  POneDialogModule,
  POneFilterDisplayModule,
  POneFlexModule,
  POneGridModule,
  POneHeaderModule,
  POneInputModule,
  POneLineChartModule,
  POneSidenavModule,
} from '@p-one/shared';

import { DashboardEffects } from './+state/dashboard.effects';
import { DashboardFacade } from './+state/dashboard.facade';
import { DASHBOARD_KEY, dashboardReducer } from './+state/dashboard.reducer';
import { BalancesOvertimeChartModule } from './balances-overtime-chart';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardFilterModalComponent } from './modals/dashboard-filter-modal/dashboard-filter-modal.component';


@NgModule({
  declarations: [DashboardComponent, DashboardFilterModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    StoreModule.forFeature(DASHBOARD_KEY, dashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
    POneContainerModule,
    POneHeaderModule,
    POneSidenavModule,
    POneCardModule,
    POneChartModule,
    POneLineChartModule,
    POneBreadcrumbModule,
    POneFilterDisplayModule,
    POneInputModule,
    POneDialogModule,
    POneGridModule,
    POneFlexModule,
    BalancesOvertimeChartModule,
    POneNotificationsDisplayButtonModule,
    NgbDatepickerModule,
    POneDatepickerModule,
  ],
  providers: [DashboardFacade],
})
export class DashboardModule { }
