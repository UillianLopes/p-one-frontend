import { Component, ElementRef, NgZone } from '@angular/core';
import * as d3 from 'd3';
import { Selection, svg } from 'd3';
import * as _ from 'lodash';

import { Chart } from '../chart';
import { BarChartData } from './bar-chart.data';

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
    const { innerHeight, innerWidth, yScale, xScale, leftMargin, topMargin } =
      this._getChartMetrics(containerRect, data);

    chart.attr('transform', `translate(${leftMargin}, ${topMargin})`);

    
    chart
      .append('g')
      .attr('id', `${this.uniqueId}__bars`)
      .selectAll('rect')
      .data(data.series)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.name) ?? 0)
      .attr('y', (d) => yScale(d.value) ?? 0)
      .attr('height', (s) => innerHeight - yScale(s.value))
      .attr('width', xScale.bandwidth());

    chart.append('g').call(d3.axisLeft(yScale));

    chart
      .append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));
  }

  public _getChartMetrics(
    containerRect: DOMRect,
    data: BarChartData,
    animate?: boolean
  ) {
    const { series } = data;

    let { width, height } = containerRect;

    if (width < 200) width = 200;

    if (height < 200) height = 200;

    const barWidth = 30;
    const topMargin = 16;
    const bottomMargin = 38;
    const leftMargin = 40;
    const rightMargin = 16;

    const innerWidth = width - (leftMargin + rightMargin);
    const innerHeight = height - (bottomMargin + topMargin);

    const maxSeriesValue = _.max(series.map(({ value }) => value)) ?? 0;

    const yScale = d3
      .scaleLinear()
      .domain([0, maxSeriesValue + maxSeriesValue * 0.1])
      .range([innerHeight, 0]);

    const xScale = d3
      .scaleBand()
      .range([0, innerWidth])
      .domain(series.map(({ name }) => name))
      .padding(0.2);

    return {
      width,
      height,
      innerWidth,
      innerHeight,
      animationDuration: animate ? this.animationDuration : 0,
      yScale,
      xScale,
      topMargin,
      leftMargin,
      rightMargin,
      bottomMargin,
    };
  }
}
