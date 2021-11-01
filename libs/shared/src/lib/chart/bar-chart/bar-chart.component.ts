import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

import { Chart } from '../chart';
import { BarChartData } from './bar-chart.data';

@Component({
  selector: 'p-one-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent extends Chart<BarChartData[]> implements OnInit {
  @Input()
  colors!: { [name: string]: string };

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
  }

  public render(data: BarChartData[], metrics: DOMRect): void {

    const margin = {
      right: 60,
      left: 60,
      top: 60,
      bottom: 60,
    };

    const svg = d3.select('svg');

    const { width, height } = metrics;

    svg.attr('width', width).attr('height', height);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) ?? 0])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, innerHeight])
      .padding(0.1);

    const axisLeft = d3.axisLeft(yScale);
    const axisRight = d3.axisRight(yScale);
    const axisBottom = d3.axisBottom(xScale);
    
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    chart.append('g').call(axisLeft);

    chart
      .append('g')
      .call(axisRight)
      .attr('transform', `translate(${innerWidth / 2}, 0)`);

    chart
      .append('g')
      .call(axisBottom)
      .attr('transform', `translate(0, ${innerHeight})`);

    chart
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', (d) => yScale(d.name) ?? 0)
      .attr('width', (d) => xScale(d.value))
      .attr('height', yScale.bandwidth())
      .attr('fill', (value) => {
        if (!this.colors) {
          return 'black';
        }

        return this.colors[value.name];
      });
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
