import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { Chart } from '../chart';
import { StackedBarChartData } from './stacked-bar-char.data';

export type ZoomState = 'normal' | 'zoomed';
@Component({
  selector: 'p-one-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss'],
})
export class StackedBarChartComponent
  extends Chart<StackedBarChartData>
  implements OnInit
{
  readonly zoom$ = new Subject<ZoomState>();

  @Input()
  set zoom(v: ZoomState) {
    this.zoom$.next(v);
  }

  readonly animationDuration = 200;
  readonly margin = {
    left: 16,
    right: 16,
    top: 16,
    bottom: 16,
  };

  render(data: StackedBarChartData, containerRect: DOMRect): void {
    this._elementRef.nativeElement.querySelector('svg')?.remove();

    let { width } = containerRect;

    const innerWidth = width - this.margin.left - this.margin.right;
    const tinyBarsWidthDiferece = 0;
    const barsWidth = innerWidth - tinyBarsWidthDiferece;

    const barHeight = 20;
    const tinyBarHeight = 20;
    const barSpacing = 16;

    const height =
      data.series.length * 30 +
      barSpacing * (data.series.length - 1) +
      this.margin.top +
      this.margin.bottom;

    const chartHeight = height - this.margin.top - this.margin.bottom;

    const yScale = d3
      .scaleLinear()
      .domain([0, data.series.length])
      .range([0, chartHeight]);

    const xScale = d3.scaleLinear().domain([-100, 100]).range([0, barsWidth]);

    const rightXScale = d3
      .scaleLinear()
      .domain([data.score, 100])
      .range([0, xScale(100) - xScale(data.score)]);

    const leftXScale = d3
      .scaleLinear()
      .domain([data.score, -100])
      .range([0, xScale(data.score)]);

    const scorePosition = xScale(data.score);

    const svg = d3
      .select(this._elementRef.nativeElement)
      .append('svg')
      .attr('id', 'stacked-bar-chart__svg' + this.uniqueId)
      .attr('width', width)
      .attr('height', height);

    const chart = svg
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .attr('id', 'stacked-bar-chart__chart' + this.uniqueId);

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
      .attr(
        'y',
        (__, i) => yScale(i) + (barHeight - tinyBarHeight) / 2 + barSpacing / 2
      )
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
      .attr('y', (__, i) => yScale(i) + barSpacing / 2)
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
      .attr('y', (__, i) => yScale(i) + barSpacing / 2)
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
      .attr('y', (__, i) => yScale(i) + barSpacing / 2)
      .attr('fill', 'rgb(54, 169, 175)')
      .attr(
        'transform',
        (d) => `translate(${scorePosition - leftXScale(d.leftValue)}, 0)`
      );

    chart
      .append('g')
      .append('line')
      .attr('id', `stacked-bar-chart__center-line`)
      .attr('stroke-width', 1)
      .attr('y1', 0)
      .attr('y2', chartHeight)
      .attr('x1', innerWidth / 2)
      .attr('x2', innerWidth / 2)
      .attr('stroke', 'white');

    chart
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

  ngOnInit() {
    super.ngOnInit();

    this.zoom$
      .pipe(
        takeUntil(this.destroyed$),
        filter((zoom) => zoom == 'zoomed')
      )
      .subscribe((_) => {
        this._applyZoomedVersion(
          this.data,
          this._elementRef.nativeElement.getBoundingClientRect()
        );
      });

    this.zoom$
      .pipe(
        takeUntil(this.destroyed$),
        filter((zoom) => zoom == 'normal')
      )
      .subscribe((_) => {
        this._applyNormalVersion(
          this.data,
          this._elementRef.nativeElement.getBoundingClientRect()
        );
      });
  }

  private _applyZoomedVersion(
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

    const innerWidth = width - this.margin.left - this.margin.right;
    const tinyBarsWidthDiferece = 60;
    const barsWidth = innerWidth - tinyBarsWidthDiferece;

    const barHeight = 30;
    const tinyBarHeight = 20;
    const barSpacing = 16;

    const height =
      data.series.length * 30 +
      barSpacing * (data.series.length - 1) +
      this.margin.top +
      this.margin.bottom;

    const chartHeight = height - this.margin.top - this.margin.bottom;

    const xScale = d3
      .scaleLinear()
      .domain([0, maxDiference])
      .range([0, barsWidth / 2]);

    const yScale = d3
      .scaleLinear()
      .domain([0, data.series.length])
      .range([0, chartHeight]);

    const svg = d3.select<SVGSVGElement, unknown>(
      '#stacked-bar-chart__svg' + this.uniqueId
    );

    const chart = svg.select<SVGGElement>(
      '#stacked-bar-chart__chart' + this.uniqueId
    );

    const tinyBackgroudBars = chart.select<SVGSVGElement>(
      '#stacked-bar-chart__tiny-background-bars'
    );

    const backgroundBars = chart.select('#stacked-bar-chart__background-bars');

    backgroundBars
      .transition()
      .duration(this.animationDuration)
      .ease(d3.easeQuadIn)
      .attr('transform', `translate(${tinyBarsWidthDiferece / 2}, 0)`);

    const rightBars = chart.select('#stacked-bar-chart__right-bars');

    rightBars
      .transition()
      .duration(this.animationDuration)
      .ease(d3.easeQuadIn)
      .attr('transform', `translate(${innerWidth / 2}, 0)`);

    const leftBars = chart.select('#stacked-bar-chart__left-bars');

    leftBars
      .transition()
      .duration(this.animationDuration)
      .ease(d3.easeQuadIn)
      .attr('transform', `translate(${tinyBarsWidthDiferece / 2}, 0)`);

    data.series.forEach((d, i) => {
      tinyBackgroudBars
        .select(`#stacked-bar-chart__tiny-background-bars--${i}`)
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeQuadIn)
        .attr('height', tinyBarHeight)
        .attr('width', innerWidth)
        .attr('y', yScale(i) + (barHeight - tinyBarHeight) / 2 + barSpacing / 2)
        .attr('fill', '#ebebeb');

      backgroundBars
        .select(`#stacked-bar-chart__background-bars--${i}`)
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeQuadIn)
        .attr('height', barHeight)
        .attr('width', barsWidth)
        .attr('y', yScale(i) + barSpacing / 2)
        .attr('fill', '#ebebeb');

      rightBars
        .select(`#stacked-bar-chart__right-bars--${i}`)
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeQuadIn)
        .attr('height', barHeight)
        .attr('width', xScale(Math.abs(d.rightValue - data.score)))
        .attr('y', yScale(i) + barSpacing / 2)
        .attr('fill', 'rgb(238, 123, 35)');

      leftBars
        .select(`#stacked-bar-chart__left-bars--${i}`)
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeQuadIn)
        .attr('height', barHeight)
        .attr('width', xScale(Math.abs(d.leftValue - data.score)))
        .attr('y', yScale(i) + barSpacing / 2)
        .attr('fill', 'rgb(54, 169, 175)')
        .attr(
          'transform',
          `translate(${
            barsWidth / 2 - xScale(Math.abs(d.leftValue - data.score))
          }, 0)`
        );
    });

    chart
      .select('#stacked-bar-chart__score-line')
      .transition()
      .duration(this.animationDuration)
      .ease(d3.easeQuadIn)
      .attr('stroke-width', 1)
      .attr('y1', 0)
      .attr('y2', chartHeight)
      .attr('x1', innerWidth / 2)
      .attr('x2', innerWidth / 2)
      .attr('stroke', 'black');
  }

  private _applyNormalVersion(
    data: StackedBarChartData,
    containerRect: DOMRect
  ) {
    let { width } = containerRect;

    const innerWidth = width - this.margin.left - this.margin.right;
    const tinyBarsWidthDiferece = 0;
    const barsWidth = innerWidth - tinyBarsWidthDiferece;

    const barHeight = 20;
    const tinyBarHeight = 20;
    const barSpacing = 16;

    const height =
      data.series.length * 30 +
      barSpacing * (data.series.length - 1) +
      this.margin.top +
      this.margin.bottom;

    const chartHeight = height - this.margin.top - this.margin.bottom;

    const yScale = d3
      .scaleLinear()
      .domain([0, data.series.length])
      .range([0, chartHeight]);

    const xScale = d3.scaleLinear().domain([-100, 100]).range([0, barsWidth]);

    const rightXScale = d3
      .scaleLinear()
      .domain([data.score, 100])
      .range([0, xScale(100) - xScale(data.score)]);

    const leftXScale = d3
      .scaleLinear()
      .domain([data.score, -100])
      .range([0, xScale(data.score)]);

    const scorePosition = xScale(data.score);

    const svg = d3.select('#stacked-bar-chart__svg' + this.uniqueId);

    const chart = svg.select('#stacked-bar-chart__chart' + this.uniqueId);

    const tinyBackgroudBars = chart.select(
      '#stacked-bar-chart__tiny-background-bars'
    );

    const backgroundBars = chart.select('#stacked-bar-chart__background-bars');

    backgroundBars
      .transition()
      .duration(this.animationDuration)
      .ease(d3.easeQuadIn)
      .attr('transform', `translate(${tinyBarsWidthDiferece / 2}, 0)`);

    const rightBars = chart.select('#stacked-bar-chart__right-bars');

    rightBars
      .transition()
      .duration(this.animationDuration)
      .ease(d3.easeQuadIn)
      .attr('transform', `translate(${scorePosition}, 0)`);

    const leftBars = chart.select('#stacked-bar-chart__left-bars');

    leftBars
      .transition()
      .duration(this.animationDuration)
      .ease(d3.easeQuadIn)
      .attr('transform', `translate(${tinyBarsWidthDiferece / 2}, 0)`);

    data.series.forEach((d, i) => {
      tinyBackgroudBars
        .select(`#stacked-bar-chart__tiny-background-bars--${i}`)
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeQuadIn)
        .attr('height', tinyBarHeight)
        .attr('width', innerWidth)
        .attr('y', yScale(i) + (barHeight - tinyBarHeight) / 2 + barSpacing / 2)
        .attr('fill', '#ebebeb');

      backgroundBars
        .select(`#stacked-bar-chart__background-bars--${i}`)
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeQuadIn)
        .attr('height', barHeight)
        .attr('width', barsWidth)
        .attr('y', yScale(i) + barSpacing / 2)
        .attr('fill', '#ebebeb');

      rightBars
        .select(`#stacked-bar-chart__right-bars--${i}`)
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeQuadIn)
        .attr('height', barHeight)
        .attr('width', rightXScale(d.rightValue))
        .attr('y', yScale(i) + barSpacing / 2)
        .attr('fill', 'rgb(238, 123, 35)');

      leftBars
        .select(`#stacked-bar-chart__left-bars--${i}`)
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeQuadIn)
        .attr('height', barHeight)
        .attr('width', leftXScale(d.leftValue))
        .attr('y', yScale(i) + barSpacing / 2)
        .attr('fill', 'rgb(54, 169, 175)')
        .attr(
          'transform',
          `translate(${scorePosition - leftXScale(d.leftValue)}, 0)`
        );
    });

    chart
      .select(`#stacked-bar-chart__center-line`)
      .transition()
      .duration(this.animationDuration)
      .ease(d3.easeQuadIn)
      .attr('stroke-width', 1)
      .attr('y1', 0)
      .attr('y2', chartHeight)
      .attr('x1', innerWidth / 2)
      .attr('x2', innerWidth / 2)
      .attr('stroke', 'white');

    chart
      .select(`#stacked-bar-chart__score-line`)
      .transition()
      .duration(this.animationDuration)
      .ease(d3.easeQuadIn)
      .attr('stroke-width', 1)
      .attr('y1', 0)
      .attr('y2', chartHeight)
      .attr('x1', scorePosition)
      .attr('x2', scorePosition)
      .attr('stroke', 'black');
  }

  private _renderWithoutZoom(
    data: StackedBarChartData,
    containerRect: DOMRect
  ) {
    let { width } = containerRect;

    const innerWidth = width - this.margin.left - this.margin.right;
    const tinyBarsWidthDiferece = 0;
    const barsWidth = innerWidth - tinyBarsWidthDiferece;

    const barHeight = 20;
    const tinyBarHeight = 20;
    const barSpacing = 16;

    const height =
      data.series.length * 30 +
      barSpacing * (data.series.length - 1) +
      this.margin.top +
      this.margin.bottom;

    const chartHeight = height - this.margin.top - this.margin.bottom;

    const yScale = d3
      .scaleLinear()
      .domain([0, data.series.length])
      .range([0, chartHeight]);

    const xScale = d3.scaleLinear().domain([-100, 100]).range([0, barsWidth]);

    const rightXScale = d3
      .scaleLinear()
      .domain([data.score, 100])
      .range([0, xScale(100) - xScale(data.score)]);

    const leftXScale = d3
      .scaleLinear()
      .domain([data.score, -100])
      .range([0, xScale(data.score)]);

    const scorePosition = xScale(data.score);

    const svg = d3
      .select(this._elementRef.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const chart = svg
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

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

    chart
      .append('g')
      .append('line')
      .attr('id', `stacked-bar-chart__center-line`)
      .attr('stroke-width', 1)
      .attr('y1', 0)
      .attr('y2', chartHeight)
      .attr('x1', innerWidth / 2)
      .attr('x2', innerWidth / 2)
      .attr('stroke', 'white');

    chart
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

    const innerWidth = width - this.margin.left - this.margin.right;
    const tinyBarsWidthDiferece = 60;
    const barsWidth = innerWidth - tinyBarsWidthDiferece;

    const barHeight = 30;
    const tinyBarHeight = 20;
    const barSpacing = 16;

    const height =
      data.series.length * 30 +
      barSpacing * (data.series.length - 1) +
      this.margin.top +
      this.margin.bottom;

    const chartHeight = height - this.margin.top - this.margin.bottom;

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
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

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

    chart
      .append('g')
      .append('line')
      .attr('id', `stacked-bar-chart__center-line`)
      .attr('stroke-width', 1)
      .attr('y1', 0)
      .attr('y2', chartHeight)
      .attr('x1', innerWidth / 2)
      .attr('x2', innerWidth / 2)
      .attr('stroke', 'white');

    chart
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
