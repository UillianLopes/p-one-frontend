import { Component, Input, OnInit } from '@angular/core';
import { BalancesOverTimeFilter } from '@p-one/financial';

import { BalancesOverTimeChartStore } from './balances-overtime-chart.state';

@Component({
  selector: 'p-one-balances-overtime-chart',
  templateUrl: './balances-overtime-chart.component.html',
  styleUrls: ['./balances-overtime-chart.component.scss'],
  providers: [BalancesOverTimeChartStore],
})
export class BalancesOvertimeChartComponent implements OnInit {
  @Input()
  public set filter(filter: BalancesOverTimeFilter) {
    this._store.setFilter(filter);
  }

  public readonly balancesOverTimeLineChartData$ =
    this._store.balancesOverTimeLineChartData$;

  constructor(private readonly _store: BalancesOverTimeChartStore) {}

  public ngOnInit(): void {}
}
