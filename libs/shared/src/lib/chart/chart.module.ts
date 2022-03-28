import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    BarChartComponent
  ],
  imports: [CommonModule],
  exports: [BarChartComponent],
})
export class POneChartModule {}
