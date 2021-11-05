import { Component } from '@angular/core';
import { Chart } from '../chart';
import { StackedBarChartData } from './stacked-bar-char.data';
import * as d3 from 'd3';

@Component({
  selector: 'p-one-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss'],
})
export class StackedBarChartComponent extends Chart<StackedBarChartData> {
  render(data: StackedBarChartData, containerRect: DOMRect): void {
    const seriesMaxValue = d3.max(
      data.series
        .map((s) => ({
          leftValue: Math.abs(s.leftValue),
          rightValue: Math.abs(s.leftValue),
        }))
        .map((s) => (s.leftValue > s.rightValue ? s.leftValue : s.rightValue))
    ) as number;

    const xScale = d3
      .scaleLinear()
      .domain([-seriesMaxValue, data.score, seriesMaxValue]);

    const svg = d3
      .select(this._elementRef.nativeElement)
      .append('svg')
      .attr('width', containerRect.width);
  }
}
