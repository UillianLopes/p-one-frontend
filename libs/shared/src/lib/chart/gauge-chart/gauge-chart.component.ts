import { Component, ElementRef } from '@angular/core';
import * as d3 from 'd3';

import { Chart } from '../chart';
import { GaugeChartData } from './gauge-chart.data';

@Component({
  selector: 'p-one-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss'],
})
export class GaugeChartComponent extends Chart<GaugeChartData> {
  constructor(el: ElementRef<HTMLElement>) {
    super(el);
  }

  render(data: GaugeChartData, containerRect: DOMRect): void {
    const querySvg = this._elementRef.nativeElement.querySelector('svg');
    if (querySvg) {
      querySvg.remove();
    }

    let width = containerRect.width > 80 ? containerRect.width : 80;

    const margin = {
      top: 16,
      bottom: 16,
    };

    const svg = d3
      .select(this._elementRef.nativeElement)
      .append('svg')
      .attr('class', `gauge-chart__svg`)
      .attr('id', this.uniqueId)
      .attr('width', width)
      .attr('height', width / 2);

    var pieGenerator = d3
      .pie()
      .startAngle(-0.5 * Math.PI)
      .endAngle(0.5 * Math.PI)
      .sort(null);

    const range = (data.maxValue ?? 100) - (data.minValue ?? 0);

    var datas = [(data.value / range) * 100, 100 - (data.value / range) * 100];

    const outerRadius = width / 2;

    var arcGenerator = d3
      .arc()
      .innerRadius(outerRadius - outerRadius * 0.4)
      .outerRadius(outerRadius);

    var arcData = pieGenerator(datas);

    const pieGradientId = `${this.uniqueId}__pie-gradient`;
    const pieGradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', pieGradientId);

    pieGradient
      .append('stop')
      .attr('offset', '20%')
      .attr('stop-color', 'green');

    pieGradient
      .append('stop')
      .attr('offset', '40%')
      .attr('stop-color', 'yellow');

    pieGradient
      .append('stop')
      .attr('offset', '60%')
      .attr('stop-color', 'orange');

    pieGradient.append('stop').attr('offset', '100%').attr('stop-color', 'red');

    svg
      .append('g')
      .attr('fill', `url(#${pieGradientId})`)
      .attr('transform', `translate(${width / 2}, ${width / 2})`)
      .selectAll('path')
      .data(pieGenerator([100]))
      .join('path')
      .attr('d', <any>arcGenerator)
      .on('mouseout', function () {});

    svg
      .append('g')
      .attr('fill', 'transparent')
      .attr('transform', `translate(${width / 2}, ${width / 2})`)
      .selectAll('path')
      .data(arcData)
      .join('path')
      .attr('d', <any>arcGenerator)
      .attr('stroke', 'black')
      .attr('stroke-width', `1`)
      .on('mouseout', function () {});

    svg
      .append('g')
      .attr('fill', 'transparent')
      .attr('transform', `translate(${width / 2}, ${width / 2})`)
      .selectAll('path')
      .data(pieGenerator([100]))
      .join('path')
      .attr('d', <any>arcGenerator)
      .attr('stroke', 'white')
      .attr('stroke-width', `4`)
      .on('mouseout', function () {
        console.log(this);
      });
  }
}
