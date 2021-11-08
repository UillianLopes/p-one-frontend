import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject } from 'rxjs';

import { Chart } from '../chart';
import { StackedBarChartData } from './stacked-bar-char.data';

export type ZoomState = 'normal' | 'zoomed';
@Component({
  selector: 'p-one-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss'],
})
export class StackedBarChartComponent extends Chart<StackedBarChartData> {
  zoom$ = new BehaviorSubject<ZoomState>('normal');

  @Input()
  set zoomState(v: ZoomState) {
    this.zoom$.next(v);
  }

  render(data: StackedBarChartData, containerRect: DOMRect): void {
    this._elementRef.nativeElement.querySelector('svg')?.remove();
    // this._renderWithZoom(data, containerRect);
    // this._renderWithoutZoom(data, containerRect);
  }
  private _renderWithoutZoom(
    data: StackedBarChartData,
    containerRect: DOMRect
  ) {
    let { width } = containerRect;

    const maxDiference = d3.max(
      data.series
        .map((s) => ({
          leftValue: Math.abs(data.score - s.leftValue),
          rightValue: Math.abs(data.score - s.rightValue),
        }))
        .map((s) => (s.leftValue > s.rightValue ? s.leftValue : s.rightValue))
    ) as number;

    const maxRightDiference = d3.max(
      data.series.map((s) => Math.abs(s.rightValue - data.score))
    ) as number;

    const maxLeftDiference = d3.max(
      data.series.map((s) => Math.abs(s.leftValue - data.score))
    ) as number;

    const margin = {
      left: 30,
      right: 30,
      top: 16,
      bottom: 16,
    };

    const innerWidth = width - margin.left - margin.right;
    const tinyBarsWidthDiferece = 0;
    const barsWidth = innerWidth - tinyBarsWidthDiferece;

    const barHeight = 20;
    const tinyBarHeight = 20;
    const barSpacing = 16;

    const height =
      data.series.length * barHeight +
      barSpacing * (data.series.length - 2) +
      margin.top +
      margin.bottom;

    const chartHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleLinear()
      .domain([0, maxDiference])
      .range([0, barsWidth / 2]);

    const yScale = d3
      .scaleLinear()
      .domain([0, data.series.length])
      .range([0, chartHeight]);

    const xExtraScale = d3
      .scaleLinear()
      .domain([-100, 100])
      .range([0, barsWidth]);

    const rightXScale = d3
      .scaleLinear()
      .domain([data.score, 100])
      .range([0, xExtraScale(100) - xExtraScale(data.score)]);

    const leftXScale = d3
      .scaleLinear()
      .domain([data.score, -100])
      .range([0, xExtraScale(data.score)]);

    const scorePosition = xExtraScale(data.score);

    const svg = d3
      .select(this._elementRef.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const tinyBackgroudBars = chart
      .append('g')
      .attr('id', 'stacked-bar-chart__tiny-background-bars');

    tinyBackgroudBars
      .selectAll('rect')
      .data(data.series)
      .enter()
      .append('rect')
      .attr('id', (_, i) => `stacked-bar-chart__tiny-background-bars--${i}`)
      .attr('height', tinyBarHeight)
      .attr('width', innerWidth)
      .attr('y', (__, i) => yScale(i) + (barHeight - tinyBarHeight) / 2)
      .attr('fill', '#ebebeb');

    const backgroundBars = chart
      .append('g')
      .attr('transform', `translate(${tinyBarsWidthDiferece / 2}, 0)`)
      .attr('id', `stacked-bar-chart__background-bars`);

    backgroundBars
      .selectAll('rect')
      .data(data.series)
      .enter()
      .append('rect')
      .attr('id', (_, i) => `stacked-bar-chart__background-bars--${i}`)
      .attr('height', barHeight)
      .attr('width', barsWidth)
      .attr('y', (__, i) => yScale(i))
      .attr('fill', '#ebebeb');

    const rightBars = chart
      .append('g')
      .attr('transform', `translate(${scorePosition}, 0)`)
      .attr('id', `stacked-bar-chart__right-bars`);

    rightBars
      .selectAll('rect')
      .data(data.series)
      .enter()
      .append('rect')
      .attr('id', (_, i) => `stacked-bar-chart__right-bars--${i}`)
      .attr('height', barHeight)
      .attr('width', (d) => rightXScale(d.rightValue))
      .attr('y', (__, i) => yScale(i))
      .attr('fill', 'rgb(238, 123, 35)');

    const leftBars = chart
      .append('g')
      .attr('transform', `translate(${tinyBarsWidthDiferece / 2}, 0)`)
      .attr('id', `stacked-bar-chart__left-bars`);

    leftBars
      .selectAll('rect')
      .data(data.series)
      .enter()
      .append('rect')
      .attr('id', (_, i) => `stacked-bar-chart__left-bars--${i}`)
      .attr('height', barHeight)
      .attr('width', (d) => leftXScale(d.leftValue))
      .attr('y', (__, i) => yScale(i))
      .attr('fill', 'rgb(54, 169, 175)')
      .attr(
        'transform',
        (d) => `translate(${scorePosition - leftXScale(d.leftValue)}, 0)`
      );

    const centerLine = chart
      .append('g')
      .append('line')
      .attr('id', `stacked-bar-chart__center-line`)
      .attr('stroke-width', 1)
      .attr('y1', 0)
      .attr('y2', chartHeight)
      .attr('x1', innerWidth / 2)
      .attr('x2', innerWidth / 2)
      .attr('stroke', 'white');

    const scoreLine = chart
      .append('g')
      .append('line')
      .attr('id', `stacked-bar-chart__score-line`)
      .attr('stroke-width', 1)
      .attr('y1', 0)
      .attr('y2', chartHeight)
      .attr('x1', scorePosition)
      .attr('x2', scorePosition)
      .attr('stroke', 'black');
  }

  private _renderWithZoom(data: StackedBarChartData, containerRect: DOMRect) {
    let { width } = containerRect;

    const maxDiference = d3.max(
      data.series
        .map((s) => ({
          leftValue: Math.abs(data.score - s.leftValue),
          rightValue: Math.abs(data.score - s.rightValue),
        }))
        .map((s) => (s.leftValue > s.rightValue ? s.leftValue : s.rightValue))
    ) as number;

    const margin = {
      left: 30,
      right: 30,
      top: 16,
      bottom: 16,
    };

    const innerWidth = width - margin.left - margin.right;
    const tinyBarsWidthDiferece = 60;
    const barsWidth = innerWidth - tinyBarsWidthDiferece;

    const barHeight = 30;
    const tinyBarHeight = 20;
    const barSpacing = 16;

    const height =
      data.series.length * barHeight +
      barSpacing * (data.series.length - 2) +
      margin.top +
      margin.bottom;

    const chartHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleLinear()
      .domain([0, maxDiference])
      .range([0, barsWidth / 2]);

    const yScale = d3
      .scaleLinear()
      .domain([0, data.series.length])
      .range([0, chartHeight]);

    const svg = d3
      .select(this._elementRef.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const tinyBackgroudBars = chart
      .append('g')
      .attr('id', 'stacked-bar-chart__tiny-background-bars');

    tinyBackgroudBars
      .selectAll('rect')
      .data(data.series)
      .enter()
      .append('rect')
      .attr('id', (_, i) => `stacked-bar-chart__tiny-background-bars--${i}`)
      .attr('height', tinyBarHeight)
      .attr('width', innerWidth)
      .attr('y', (__, i) => yScale(i) + (barHeight - tinyBarHeight) / 2)
      .attr('fill', '#ebebeb');

    const backgroundBars = chart
      .append('g')
      .attr('transform', `translate(${tinyBarsWidthDiferece / 2}, 0)`)
      .attr('id', `stacked-bar-chart__background-bars`);

    backgroundBars
      .selectAll('rect')
      .data(data.series)
      .enter()
      .append('rect')
      .attr('id', (_, i) => `stacked-bar-chart__background-bars--${i}`)
      .attr('height', barHeight)
      .attr('width', barsWidth)
      .attr('y', (__, i) => yScale(i))
      .attr('fill', '#ebebeb');

    const rightBars = chart
      .append('g')
      .attr('transform', `translate(${innerWidth / 2}, 0)`)
      .attr('id', `stacked-bar-chart__right-bars`);

    rightBars
      .selectAll('rect')
      .data(data.series)
      .enter()
      .append('rect')
      .attr('id', (_, i) => `stacked-bar-chart__right-bars--${i}`)
      .attr('height', barHeight)
      .attr('width', (d) => xScale(Math.abs(d.rightValue - data.score)))
      .attr('y', (__, i) => yScale(i))
      .attr('fill', 'rgb(238, 123, 35)');

    const leftBars = chart
      .append('g')
      .attr('transform', `translate(${tinyBarsWidthDiferece / 2}, 0)`)
      .attr('id', `stacked-bar-chart__left-bars`);

    leftBars
      .selectAll('rect')
      .data(data.series)
      .enter()
      .append('rect')
      .attr('id', (_, i) => `stacked-bar-chart__left-bars--${i}`)
      .attr('height', barHeight)
      .attr('width', (d) => xScale(Math.abs(d.leftValue - data.score)))
      .attr('y', (__, i) => yScale(i))
      .attr('fill', 'rgb(54, 169, 175)')
      .attr(
        'transform',
        (d) =>
          `translate(${
            barsWidth / 2 - xScale(Math.abs(d.leftValue - data.score))
          }, 0)`
      );

    const centerLine = chart
      .append('g')
      .append('line')
      .attr('id', `stacked-bar-chart__center-line`)
      .attr('stroke-width', 1)
      .attr('y1', 0)
      .attr('y2', chartHeight)
      .attr('x1', innerWidth / 2)
      .attr('x2', innerWidth / 2)
      .attr('stroke', 'white');

    const scoreLine = chart
      .append('g')
      .append('line')
      .attr('id', `stacked-bar-chart__score-line`)
      .attr('stroke-width', 1)
      .attr('y1', 0)
      .attr('y2', chartHeight)
      .attr('x1', innerWidth / 2)
      .attr('x2', innerWidth / 2)
      .attr('stroke', 'black');
  }
}
