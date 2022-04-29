import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartLegendComponent } from './chart-legend.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ChartLegendComponent],
  exports: [ChartLegendComponent],
})
export class POneChartLegendModule {}
