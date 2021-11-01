import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BarChartComponent } from './bar-chart/bar-chart.component';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
import { StackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';

@NgModule({
  declarations: [StackedBarChartComponent, BarChartComponent, GaugeChartComponent],
  imports: [CommonModule],
  exports: [BarChartComponent, StackedBarChartComponent, GaugeChartComponent],
})
export class POneChartModule {}
