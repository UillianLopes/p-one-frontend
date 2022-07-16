import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  BalancesOverTimeFilter,
  DashboardService,
} from '@p-one/domain/financial';
import { Observable } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { LineChartData } from '../../../../../../shared/src';

export interface BalancesOverTimeChartState {
  error?: any;
  balancesOverTime?: LineChartData;
  filter?: BalancesOverTimeFilter;
}

@Injectable()
export class BalancesOverTimeChartStore extends ComponentStore<BalancesOverTimeChartState> {
  public readonly balanceOverTime$ = this.select(
    ({ balancesOverTime }) => balancesOverTime ?? { groups: [] }
  );

  public readonly balancesOverTimeLineChartData$ = this.balanceOverTime$;
  public readonly filter$ = this.select(({ filter }) => filter);

  constructor(private readonly _service: DashboardService) {
    super({});
  }

  private readonly _loadBalancesOverTimeSuccess = this.updater(
    (state, balancesOverTime: LineChartData) => {
      return {
        ...state,
        balancesOverTime,
      };
    }
  );

  private readonly _loadBalancesOverTimeFailure = this.updater(
    (state, error: any) => {
      return {
        ...state,
        error,
      };
    }
  );

  private readonly _setFilter = this.updater(
    (state, filter: BalancesOverTimeFilter) => {
      return {
        ...state,
        filter,
      };
    }
  );

  public readonly setFilter = this.effect(
    (event$: Observable<BalancesOverTimeFilter>) => {
      return event$.pipe(
        tap((filter) => this._setFilter(filter)),
        tap(() => this.loadBalancesOverTime())
      );
    }
  );

  public readonly loadBalancesOverTime = this.effect((event$) => {
    return event$.pipe(
      withLatestFrom(this.filter$),
      switchMap(([__, filter]) =>
        this._service.getBalancesOvertime(filter ?? {}).pipe(
          tap({
            next: (response) => this._loadBalancesOverTimeSuccess(response),
            error: (error) => this._loadBalancesOverTimeFailure(error),
          })
        )
      )
    );
  });
}
