import { Component, ElementRef, Input, NgZone } from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'lodash';
import { Subject } from 'rxjs';

import { Chart } from '../chart';
import { ChartLegendData } from '../chart-legend/chart-legend.data';
import { ICanHaveALegend } from '../chart-legend/i-can-have-an-legend';
import { LineChartData, LineChartGroup, LineChartSerie } from './line-chart.data';

function findGroupInOldData(
  group: LineChartGroup,
  oldData?: LineChartData
): LineChartGroup | undefined {
  if (!oldData) {
    return undefined;
  }

  return oldData.groups.find((group) => group.name === group.name);
}

@Component({
  selector: 'p-one-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent
  extends Chart<LineChartData>
  implements ICanHaveALegend
{
  public readonly updateLegends$ = new Subject<ChartLegendData[]>();

  public bigDots: string[] = [];
  private readonly _svg = d3
    .select(this._elementRef.nativeElement)
    .append('svg');

  @Input() public valueFormater?: (value: number) => string;

  constructor(_elementRef: ElementRef<HTMLElement>, _ngZone: NgZone) {
    super(_elementRef, _ngZone, 'p-one-line-chart');
  }

  public init(data: LineChartData, containerRect: DOMRect): void {
    this._svg
      .attr('width', containerRect.width)
      .attr('height', containerRect.height);
    if (!data) {
      return;
    }

    this._render(data, containerRect);
  }

  public update(
    data: LineChartData,
    oldData: LineChartData,
    containerRect: DOMRect
  ): void {
    this._render(data, containerRect, oldData);
  }

  public resize(
    data: LineChartData,
    oldData: LineChartData,
    containerRect: DOMRect
  ): void {
    this._svg
      .attr('width', containerRect.width)
      .attr('height', containerRect.height);

    if (!data) {
      return;
    }

    this._render(data, containerRect, oldData);
  }

  private _render(
    data: LineChartData,
    containerRect: DOMRect,
    oldData?: LineChartData
  ) {
    this.updateLegends$.next(
      data.groups.map(({ name, color }) => ({ name, color }))
    );
    const svg = this._svg;
    const {
      yScale,
      xScale,
      points,
      graphHeight,
      graphWidth,
      horizontalLinesCount,
      yLinesScale,
      graphMargin,
      dotRadius,
      leftGraphMargin,
      yAxisWidth,
      yLineValuesScale,
    } = this._getChartConfig(svg, containerRect, data);

    let graph = svg.select<SVGGElement>(`#${this.uniqueId}__graph`);
    let xAxis = svg.select<SVGGElement>(`#${this.uniqueId}__x-axis`);
    let yAxis = svg.select<SVGGElement>(`#${this.uniqueId}__y-axis`);

    if (!yAxis.empty()) {
      yAxis.remove();
    }

    if (!xAxis.empty()) {
      xAxis.remove();
    }

    if (!graph.empty()) {
      graph.remove();
    }

    yAxis = svg
      .append('g')
      .attr('id', `${this.uniqueId}__y-axis`)
      .attr('transform', `translate(0, ${graphMargin})`);

    xAxis = svg
      .append('g')
      .attr('id', `${this.uniqueId}__x-axis`)
      .attr(
        'transform',
        `translate(${leftGraphMargin}, ${graphMargin * 2 + graphHeight})`
      );

    graph = svg
      .append('g')
      .attr('id', `${this.uniqueId}__graph`)
      .attr('transform', `translate(${leftGraphMargin}, ${graphMargin})`);

    const movingLines = graph
      .append('g')
      .attr('id', `${this.uniqueId}__moving-lines`);

    const hoverVerticalLine = movingLines
      .append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', graphHeight)
      .attr('stroke', 'black')
      .attr('opacity', 0)
      .attr('stroke-width', 1)
      .attr('id', `${this.uniqueId}__vertical-hover-line`)
      .attr('stroke-dasharray', '3,3')
      .attr('pointer-events', 'none')
      .attr('index', 0);

    const hoverHorizontalLine = movingLines
      .append('line')
      .attr('x1', 0)
      .attr('x2', graphWidth)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', 'black')
      .attr('opacity', 0)
      .attr('stroke-width', 1)
      .attr('id', `${this.uniqueId}__horizontal-hover-line`)
      .attr('stroke-dasharray', '3,3')
      .attr('pointer-events', 'none')
      .attr('index', 0);

    let valuesDisplay:
      | d3.Selection<SVGGElement, unknown, null, undefined>
      | undefined;

    graph
      .append('rect')
      .attr('fill', 'transparent')
      .attr('height', graphHeight)
      .attr('width', graphWidth)
      .attr('cursor', 'crosshair')
      .on('mousemove', (event: MouseEvent) => {
        const eventXInGraph = event.x - (containerRect.x + leftGraphMargin);
        const eventYInGraph = event.y - (containerRect.y + graphMargin - 0.5);

        hoverHorizontalLine
          .attr('y1', eventYInGraph)
          .attr('y2', eventYInGraph)
          .transition()
          .duration(100)
          .ease(d3.easeLinear)
          .attr('opacity', 1);

        hoverVerticalLine
          .attr('x1', eventXInGraph)
          .attr('x2', eventXInGraph)
          .transition()
          .duration(100)
          .ease(d3.easeLinear)
          .attr('opacity', 1);

        const dots = d3.selectAll(`.${this.uniqueId}__dot`);

        if (dots.empty()) {
          return;
        }

        const dotsData = dots.data() as {
          name: string;
          groupName: string;
          color: string;
          value: number;
        }[];

        const dotsInThisX = dotsData.filter(({ name }) => {
          const xPoint = xScale(points.indexOf(name)) - 8;
          const finalXpoint = xPoint + 16;
          return eventXInGraph >= xPoint && eventXInGraph <= finalXpoint;
        });

        if (dotsInThisX.length === 0) {
          for (let bigDotId of this.bigDots) {
            const dot = svg.select(bigDotId);

            if (dot.empty()) {
              return;
            }

            dot
              .transition()
              .duration(100)
              .ease(d3.easeLinear)
              .attr('r', dotRadius);
          }

          this.bigDots = [];

          if (valuesDisplay) {
            valuesDisplay.remove();
            valuesDisplay = undefined;
          }

          return;
        }

        const valuesDisplayHeight =
          dotsInThisX.length * 16 + 16 + (dotsInThisX.length - 1) * 4;
        const greaterLabelWidth = dotsInThisX
          .map(
            ({ groupName, value }) =>
              `${groupName}: ${
                this.valueFormater
                  ? this.valueFormater(value)
                  : value.toFixed(2)
              }`
          )
          .map((a) => {
            const fakeLabel = svg
              .append('text')
              .text(a)
              .attr('id', `${this.uniqueId}__fake-label`)
              .attr('font-size', 12)
              .attr('font-weight', 600)
              .attr('y', -99999)
              .attr('x', -99999);

            const width = fakeLabel.node()?.getBBox().width ?? 0;

            fakeLabel.remove();

            return width;
          })
          .reduce((a, b) => (a > b ? a : b));

        const valuesDisplayWidth = 40 + greaterLabelWidth;

        const labelsX =
          eventXInGraph > graphWidth / 2
            ? eventXInGraph - valuesDisplayWidth
            : eventXInGraph;
        const labelsY =
          eventYInGraph > graphHeight / 2
            ? eventYInGraph - valuesDisplayHeight
            : eventYInGraph;

        if (!valuesDisplay) {
          valuesDisplay = graph
            .append('g')
            .attr('opacity', 0)
            .attr('transform', `translate(${labelsX}, ${labelsY})`)
            .attr('pointer-events', 'none');

          valuesDisplay
            .append('rect')
            .attr('height', valuesDisplayHeight)
            .attr('width', valuesDisplayWidth)
            .attr('fill', 'rgba(0,0,0,0.75)')
            .attr('ry', 10);

          const valueLabels = valuesDisplay
            .append('g')
            .attr('transform', 'translate(16, 16)');

          const valueLabelsGroup = valueLabels
            .selectAll('g')
            .data([...dotsInThisX].sort((a, b) => b.value - a.value))
            .enter()
            .append('g')
            .attr('transform', (_, i) => `translate(0, ${i * 20})`);

          valueLabelsGroup
            .append('circle')
            .attr('r', 8)
            .attr('fill', ({ color }) => color);

          valueLabelsGroup
            .append('text')
            .text(
              ({ groupName, value }) =>
                `${groupName}: ${
                  this.valueFormater
                    ? this.valueFormater(value)
                    : value.toFixed(2)
                }`
            )
            .attr('alignment-baseline', 'middle')
            .attr('x', 16)
            .attr('fill', 'white')
            .attr('font-size', 12)
            .attr('font-weight', 600);

          valuesDisplay
            .transition()
            .duration(100)
            .ease(d3.easeLinear)
            .attr('opacity', 1);
        } else {
          valuesDisplay.attr('transform', `translate(${labelsX}, ${labelsY})`);
        }

        const dotsInThisXIds = dotsInThisX.map(
          ({ name, groupName }) =>
            `#${this.uniqueId}__dot__${this.slugify(groupName)}__${this.slugify(
              name
            )}`
        );

        if (dotsInThisXIds.every((dotId) => this.bigDots.includes(dotId))) {
          return;
        }

        for (let dotId of dotsInThisXIds) {
          const dot = svg.select(dotId);

          if (dot.empty()) {
            return;
          }

          dot
            .transition()
            .duration(100)
            .ease(d3.easeLinear)
            .attr('r', dotRadius * 2);

          this.bigDots = [...this.bigDots, dotId];
        }
      })
      .on('mouseleave', () => {
        hoverVerticalLine
          .transition()
          .duration(100)
          .ease(d3.easeLinear)
          .attr('opacity', 0);

        hoverHorizontalLine
          .transition()
          .duration(100)
          .ease(d3.easeLinear)
          .attr('opacity', 0);

        if (valuesDisplay) {
          valuesDisplay
            .transition()
            .duration(100)
            .ease(d3.easeLinear)
            .attr('opacity', 0)
            .remove();
        }

        for (let bigDotId of this.bigDots) {
          const dot = svg.select(bigDotId);

          if (dot.empty()) {
            return;
          }

          dot.transition().duration(100).ease(d3.easeLinear).attr('r', 4);
        }

        this.bigDots = [];
      });

    const verticalLinesSection = graph
      .append('g')
      .attr('id', `${this.uniqueId}__x-lines`);

    verticalLinesSection
      .selectAll('g')
      .data(points)
      .enter()
      .append('g')
      .attr('transform', (__, i) => `translate(${xScale(i)})`)
      .append('line')
      .attr('y1', 0)
      .attr('y2', graphHeight)
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('opacity', 0.25)
      .style('stroke-dasharray', '3, 3')
      .style('stroke', 'var(--bs-primary)')
      .style('stroke-width', 1)
      .attr('pointer-events', 'none');

    const horizontalLinesSection = graph
      .append('g')
      .attr('id', `${this.uniqueId}__y-lines`);

    horizontalLinesSection
      .selectAll('line')
      .data(new Array(horizontalLinesCount))
      .enter()
      .append('line')
      .attr('y1', (__, i) => yLinesScale(i))
      .attr('y2', (__, i) => yLinesScale(i))
      .attr('x1', 0)
      .attr('x2', graphWidth)
      .attr('opacity', 0.25)
      .style('stroke-dasharray', '3, 3')
      .style('stroke', 'var(--bs-primary)')
      .style('stroke-width', 1)
      .attr('pointer-events', 'none');

    const groupsSection = graph
      .append('g')
      .attr('id', `${this.uniqueId}__groups`);

    const groups = groupsSection
      .selectAll('g')
      .data(data.groups)
      .enter()
      .append('g')
      .attr('id', (__, i) => `${this.uniqueId}__group--${i}`);

    groups.call((group) => {
      const paths = group
        .append('g')
        .attr('pointer-events', 'none')
        .attr(
          'id',
          ({ name }) =>
            `${this.uniqueId}__normal-values-lines__${this.slugify(name)}`
        );
      paths
        .selectAll('path')
        .data((group) => {
          const oldGroup = findGroupInOldData(group, oldData);

          return this._getNormalValueLines(
            oldGroup?.series ?? group.series,
            xScale,
            yScale
          ).map((path) => ({
            path,
            color: oldGroup?.color ?? group.color,
          }));
        })
        .enter()
        .append('path')
        .attr('stroke', (d) => d.color)
        .attr('stroke-width', 1.5)
        .attr('fill', 'none')
        .attr('d', ({ path }) => path);

      group
        .append('g')
        .attr('pointer-events', 'none')
        .attr(
          'id',
          ({ name }) =>
            `${this.uniqueId}__sequential-equals-values-lines__${this.slugify(
              name
            )}`
        )
        .selectAll('path')
        .data(({ series, color }) =>
          this._getSequentialEqualsValuesLines(series, xScale, yScale).map(
            (path) => ({
              path,
              color,
            })
          )
        )
        .enter()
        .append('path')
        .attr('stroke', (d) => d.color)
        .attr('stroke-width', 1.5)
        .attr('fill', 'none')
        .style('stroke-dasharray', '9, 9')
        .attr('d', ({ path }) => path);

      group
        .append('g')
        .attr('pointer-events', 'none')
        .attr(
          'id',
          ({ name }) =>
            `${this.uniqueId}__null-values-lines__${this.slugify(name)}`
        )
        .selectAll('path')
        .data(({ series, color }) =>
          this._getNullValueLines(series, xScale, yScale).map((path) => ({
            path,
            color,
          }))
        )
        .enter()
        .append('path')
        .attr('stroke', (d) => d.color)
        .attr('stroke-width', 1.5)
        .attr('fill', 'none')
        .style('stroke-dasharray', '3, 3')
        .attr('d', ({ path }) => path)
        .attr('pointer-events', 'none');

      group
        .append('g')
        .attr(
          'id',
          ({ name }) => `${this.uniqueId}__dots__${this.slugify(name)}`
        )
        .selectAll('circle')
        .data(({ series, color, name }) =>
          series
            .filter(({ value }) => value !== null)
            .map((serie) => ({
              ...serie,
              color,
              groupName: name,
            }))
        )
        .enter()
        .append('circle')
        .attr(
          'class',
          ({ groupName }) =>
            `${this.uniqueId}__dot ${this.uniqueId}__dot__${this.slugify(
              groupName
            )}`
        )
        .attr(
          'id',
          ({ groupName, name }) =>
            `${this.uniqueId}__dot__${this.slugify(groupName)}__${this.slugify(
              name
            )}`
        )
        .attr('r', dotRadius)
        .attr('fill', ({ color }) => color)
        .attr('cy', ({ value }) => yScale(value))
        .attr('cx', ({ name }) => xScale(points.indexOf(name)))
        .attr('pointer-events', 'none');
    });

    xAxis
      .selectAll('text')
      .data(points)
      .enter()
      .append('text')
      .text((d) => d)
      .attr('alignment-baseline', 'middle')
      .attr('transform-orign', 'center')
      .attr('transform', (_, i) => `translate(${xScale(i)}, 0) rotate(90)`)
      .attr('font-size', 12)
      .attr('font-weight', '600');

    yAxis
      .selectAll('text')
      .data(new Array(horizontalLinesCount))
      .enter()
      .append('text')
      .attr('text-anchor', 'end')
      .attr('alignment-baseline', 'middle')
      .attr('transform-orign', 'center')
      .attr(
        'transform',
        (_, i) => `translate(${yAxisWidth}, ${yLinesScale(i)})`
      )
      .attr('font-size', 12)
      .attr('font-weight', '600')
      .text((_, i) =>
        this.valueFormater
          ? this.valueFormater(yLineValuesScale(i))
          : yLineValuesScale(i)?.toFixed(2)
      );
  }

  private _getNormalValueLines(
    series: LineChartSerie[],
    xScale: d3.ScaleLinear<number, number>,
    yScale: d3.ScaleLinear<number, number>
  ) {
    let line: [number, number][] = [];
    let paths: string[] = [];

    for (let serie of series) {
      const index = series.indexOf(serie);

      if (serie.value === null) {
        if (line.length > 0) {
          paths.push(d3.line()(line) ?? '');
          line = [];
        }
        continue;
      }

      line.push([xScale(index), yScale(serie.value)]);

      if (serie.value === series[index + 1]?.value) {
        if (line.length > 0) {
          paths.push(d3.line()(line) ?? '');
          line = [];
        }
        continue;
      }
    }

    if (line.length > 0) {
      paths.push(d3.line()(line) ?? '');
    }

    return paths;
  }

  private _getSequentialEqualsValuesLines(
    series: LineChartSerie[],
    xScale: d3.ScaleLinear<number, number>,
    yScale: d3.ScaleLinear<number, number>
  ) {
    let paths: string[] = [];

    for (let serie of series.filter(({ value }) => value !== null)) {
      const indexInSeries = series.indexOf(serie);
      const previousInSeries = series[indexInSeries - 1];
      if (previousInSeries && previousInSeries.value === serie.value) {
        const line = d3.line();
        paths.push(
          line([
            [xScale(indexInSeries - 1), yScale(previousInSeries.value)],
            [xScale(indexInSeries), yScale(serie.value)],
          ] as [number, number][]) ?? ''
        );
      }
    }

    return paths;
  }

  private _getNullValueLines(
    series: LineChartSerie[],
    xScale: d3.ScaleLinear<number, number>,
    yScale: d3.ScaleLinear<number, number>
  ) {
    let lines: [number, number][] = [];
    const paths: string[] = [];

    for (let serie of series) {
      const index = series.indexOf(serie);
      const nextSerie = series[index + 1];
      const previosSerie = series[index - 1];

      if (serie.value === null) {
        if (previosSerie && previosSerie.value !== null) {
          lines.push([xScale(index - 1), yScale(previosSerie.value)]);
        }

        if (nextSerie && nextSerie.value !== null) {
          lines.push([xScale(index + 1), yScale(nextSerie.value)]);
        }

        continue;
      }

      if (lines.length > 0) {
        paths.push(d3.line()(lines) ?? '');
        lines = [];
      }
    }

    return paths;
  }

  private _getChartConfig(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    containerRect: DOMRect,
    data: LineChartData
  ) {
    const { height, width } = containerRect;

    const graphMargin = 10;
    const dotRadius = 4;
    const innerHeight = height - graphMargin * 2;
    const innerWidth = width - graphMargin * 2;

    const series = data.groups
      .map((group) => group.series)
      .reduce((seriesA, seriesB) => [...seriesA, ...seriesB], []);

    const values = _.uniq(series.map(({ value }) => value));
    const points = _.uniq(series.map(({ name }) => name));
    const greaterPointWidth = points
      .map((a) => {
        const text = svg
          .append('text')
          .attr('y', -99999)
          .attr('x', -99999)
          .attr('id', `${this.uniqueId}__text__${this.slugify(a)}`)
          .attr('font-size', 12)
          .attr('font-weight', '600')
          .text(a);

        const computedTextLength = text.node()?.getComputedTextLength() ?? 0;

        text.remove();

        return computedTextLength;
      })
      .reduce((a, b) => (a > b ? a : b), 0);

    let minValue = values.reduce((a, b) => (a < b ? a : b), 0);

    if (minValue > 0) {
      minValue = 0;
    }

    const maxValue = values.reduce((a, b) => (a > b ? a : b), 0);
    const yAxisWidth = 50;
    const graphWidth = innerWidth - yAxisWidth;
    const xAxisHeight = greaterPointWidth + graphMargin;
    const graphHeight = innerHeight - xAxisHeight;
    const leftGraphMargin = graphMargin + yAxisWidth;

    const yScale = d3
      .scaleLinear()
      .range([graphHeight, 0])
      .domain([minValue, maxValue]);

    const xScale = d3
      .scaleLinear()
      .range([0, graphWidth - 1])
      .domain([0, points.length - 1]);

    const horizontalLinesCount = Math.floor(graphHeight / 25);

    const yLinesScale = d3
      .scaleLinear()
      .domain([0, horizontalLinesCount - 1])
      .range([graphHeight, 0]);

    const yLineValuesScale = d3
      .scaleLinear()
      .domain([0, horizontalLinesCount - 1])
      .range([minValue, maxValue]);

    return {
      points,
      graphHeight,
      graphWidth,
      yScale,
      xScale,
      horizontalLinesCount,
      yLinesScale,
      yLineValuesScale,
      graphMargin,
      dotRadius,
      xAxisHeight,
      yAxisWidth,
      leftGraphMargin,
    };
  }
}
