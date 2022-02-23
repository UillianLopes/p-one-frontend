import { Component, ElementRef, NgZone } from '@angular/core';
import * as d3 from 'd3';
import { Selection, svg } from 'd3';
import * as _ from 'lodash';

import { Chart } from '../chart';
import { BarChartData, BarChartSerie } from './bar-chart.data';

@Component({
  selector: 'p-one-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent extends Chart<BarChartData> {
  constructor(_elementRef: ElementRef<HTMLElement>, _ngZone: NgZone) {
    super(_elementRef, _ngZone, 'bar-chart');
  }

  public init(
    data: BarChartData,
    containerRect: DOMRect
  ): Selection<SVGSVGElement, unknown, null, undefined> {
    const { height, width } = this._getChartMetrics(containerRect, data);

    const svg = d3
      .select(this._elementRef.nativeElement)
      .append('svg')
      .attr('height', height)
      .attr('width', width);

    const chart = svg.append('g').attr('id', `${this.uniqueId}__chart`);

    this._render(chart, data, containerRect, false);

    return svg;
  }

  public update(
    svg: Selection<SVGSVGElement, unknown, null, undefined>,
    data: BarChartData,
    oldData: BarChartData,
    containerRect: DOMRect
  ): void {}

  public resize(
    svg: Selection<SVGSVGElement, unknown, null, undefined>,
    data: BarChartData,
    oldData: BarChartData,
    containerRect: DOMRect
  ): void {
    const { height, width } = this._getChartMetrics(containerRect, data);
    svg.attr('width', width).attr('height', height);

    const chart = svg.select<SVGGElement>(`#${this.uniqueId}__chart`);

    chart.selectAll('g').remove();

    this._render(chart, data, containerRect, true);
  }

  public _render(
    chart: d3.Selection<SVGGElement, unknown, null, undefined>,
    data: BarChartData,
    containerRect: DOMRect,
    animate?: boolean
  ) {
    const { innerHeight, innerWidth, leftMargin, topMargin, axisWidth } =
      this._getChartMetrics(containerRect, data);

    chart.attr('transform', `translate(${leftMargin}, ${topMargin})`);

    const { series } = data;
    const { yScale, barWidth, barGap } = this._getSeriesMetrics(
      series,
      innerWidth - axisWidth,
      innerHeight
    );

    const allBars = chart
      .append('g')
      .attr('id', `${this.uniqueId}__bars`)
      .attr('transform', `translate(${axisWidth}, 0)`);

    const bars = allBars
      .selectAll('g')
      .data(series)
      .enter()
      .append('g')
      .attr('id', (__, i) => `${this.uniqueId}__bars__${i}`)
      .attr('opacity', 1)
      .attr(
        'transform',
        (__, i) => `translate(${i * barWidth + barGap * i}, 0)`
      )
      .attr('cursor', 'pointer');

    bars
      .on('mouseover', (__, serie) =>
        this._allBarsMouseOver(allBars, serie, series)
      )
      .on('mouseleave', () => this._allBarsMouseLeave(allBars, series));

    bars
      .append('rect')
      .attr('y', ({ value }) => yScale(value) ?? 0)
      .attr('height', ({ value }) => innerHeight - yScale(value))
      .attr('width', barWidth)
      .attr('fill', (d) => d.color ?? 'black')
      .attr('id', (__, i) => `${this.uniqueId}__bars__${i}__rect`)
      .attr('border-top-left-radius', 4);

    bars
      .append('text')
      .text(({ name }) => name)
      .attr(
        'y',
        ({ value }) => yScale(value) + (innerHeight - yScale(value)) / 2
      )
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('fill', '#ffffff')
      .attr('transform', `translate(${barWidth / 2}, 0)`)
      .attr('id', (__, i) => `${this.uniqueId}__bars__${i}__label`);

    bars
      .append('text')
      .text(({ value }) => value)
      .attr('y', ({ value }) => (yScale(value) ?? 0) - 8)
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${barWidth / 2}, 0)`)
      .attr('id', (__, i) => `${this.uniqueId}__bars__${i}__value`);

    const axisLeft = d3.axisLeft(yScale);
    chart
      .append('g')
      .attr('transform', `translate(${axisWidth - 8}, 0)`)
      .call(axisLeft);
  }

  public _getSeriesMetrics(
    series: BarChartSerie[],
    width: number,
    height: number
  ) {
    const maxSeriesValue = _.max(series.map(({ value }) => value)) ?? 0;
    const seriesLength = series.length;
    const barGap = 8;
    const barWidth = (width - barGap * (seriesLength - 1)) / seriesLength;

    const yScale = d3
      .scaleLinear()
      .domain([0, maxSeriesValue + maxSeriesValue * 0.1])
      .range([height, 0]);

    const xScale = d3
      .scaleLinear()
      .domain([0, seriesLength - 1])
      .range([0, width]);

    return {
      yScale,
      xScale,
      barWidth,
      barGap,
    };
  }

  public _getChartMetrics(
    containerRect: DOMRect,
    data: BarChartData,
    animate?: boolean
  ) {
    let { width, height } = containerRect;

    if (width < 200) width = 200;

    if (height < 200) height = 200;

    const topMargin = 16;
    const bottomMargin = 16;
    const axisWidth = 30;

    const leftMargin = 16;
    const rightMargin = 16;

    const innerWidth = width - (leftMargin + rightMargin);
    const innerHeight = height - (bottomMargin + topMargin);

    return {
      width,
      height,
      innerWidth,
      innerHeight,
      animationDuration: animate ? this.animationDuration : 0,
      topMargin,
      leftMargin,
      rightMargin,
      bottomMargin,
      axisWidth,
    };
  }

  public _allBarsMouseOver(
    bars: d3.Selection<SVGGElement, unknown, null, undefined>,
    serie: BarChartSerie,
    series: BarChartSerie[]
  ) {
    const serieIndex = series.indexOf(serie);
    for (let s of series) {
      const index = series.indexOf(s);

      if (index === serieIndex) {
        continue;
      }

      bars
        .select(`#${this.uniqueId}__bars__${index}`)
        .transition()
        .duration(200)
        .ease(d3.easeQuadIn)
        .attr('opacity', 0.7);
    }
  }

  public _allBarsMouseLeave(
    bars: d3.Selection<SVGGElement, unknown, null, undefined>,
    series: BarChartSerie[]
  ) {
    for (let serie of series) {
      const index = series.indexOf(serie);
      bars
        .select(`#${this.uniqueId}__bars__${index}`)
        .transition()
        .duration(200)
        .ease(d3.easeQuadIn)
        .attr('opacity', 1);
    }
  }
}
