import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { POneCardModule, POneLineChartModule } from '@p-one/shared';

import { BalancesOvertimeChartComponent } from './balances-overtime-chart.component';

@NgModule({
  declarations: [BalancesOvertimeChartComponent],
  imports: [CommonModule, POneCardModule, POneLineChartModule],
  exports: [BalancesOvertimeChartComponent],
})
export class BalancesOvertimeChartModule {}
