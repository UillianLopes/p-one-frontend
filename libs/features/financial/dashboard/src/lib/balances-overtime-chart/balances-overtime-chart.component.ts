import { Component, Input } from '@angular/core';
import { BalancesOverTimeFilter } from '@p-one/domain/financial';

import { BalancesOverTimeChartStore } from './balances-overtime-chart.state';

@Component({
  selector: 'p-one-balances-overtime-chart',
  templateUrl: './balances-overtime-chart.component.html',
  styleUrls: ['./balances-overtime-chart.component.scss'],
  providers: [BalancesOverTimeChartStore],
})
export class BalancesOvertimeChartComponent {
  @Input()
  public set filter(filter: BalancesOverTimeFilter) {
    this._store.setFilter(filter);
  }

  public readonly balancesOverTimeLineChartData$ = this._store.balancesOverTimeLineChartData$;

  constructor(private readonly _store: BalancesOverTimeChartStore) { }
}
