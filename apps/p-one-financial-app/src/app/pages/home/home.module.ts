import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  POneChartModule,
  POneColorPickerModule,
  POneContainerModule,
  POneDatepickerModule,
  POneFlexModule,
  POneGridModule,
  POnePipesModule,
  POneSidenavModule,
  RangeSliderModule,
} from '@p-one/shared';
import { NgxCurrencyModule } from 'ngx-currency';

import { BalancesOvertimeChartModule } from '../../components/balances-overtime-chart/balances-overtime-chart.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    POneChartModule,
    POneSidenavModule,
    POneContainerModule,
    POneFlexModule,
    POnePipesModule,
    POneGridModule,
    NgxCurrencyModule,
    POneColorPickerModule,
    RangeSliderModule,
    BalancesOvertimeChartModule,
    POneDatepickerModule,
  ],
})
export class HomeModule {}
