import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { POneCardModule, POneChartLegendModule, POneLineChartModule } from '@p-one/shared';

import { BalancesOvertimeChartComponent } from './balances-overtime-chart.component';

@NgModule({
  declarations: [BalancesOvertimeChartComponent],
  imports: [
    CommonModule,
    POneCardModule,
    POneLineChartModule,
    POneChartLegendModule,
  ],
  exports: [BalancesOvertimeChartComponent],
})
export class BalancesOvertimeChartModule {}
