import { Component, OnInit } from '@angular/core';

import { BalancesOverTimeChartStore } from './balances-overtime-chart.state';

@Component({
  selector: 'p-one-balances-overtime-chart',
  templateUrl: './balances-overtime-chart.component.html',
  styleUrls: ['./balances-overtime-chart.component.scss'],
  providers: [BalancesOverTimeChartStore],
})
export class BalancesOvertimeChartComponent implements OnInit {
  public readonly data$ = this._store.balancesOverTimeLineChartData$;

  constructor(private readonly _store: BalancesOverTimeChartStore) {}

  ngOnInit(): void {
    const end = new Date();
    end.setMonth(end.getMonth() + 1);
    const begin = new Date();
    begin.setDate(begin.getDate() - 3);
    
    this._store.setFilter({
      begin,
      end,
      useMock: false,
    });
  }
}
