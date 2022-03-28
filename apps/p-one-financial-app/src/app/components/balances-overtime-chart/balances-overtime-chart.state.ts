import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { DashboardService, GetBalanceOverTimeRequest } from '@p-one/financial';
import { Observable } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { LineChartData } from '../../../../../../libs/shared/src';

export interface BalancesOverTimeChartState {
  error?: any;
  balancesOverTime?: LineChartData;
  filter?: GetBalanceOverTimeRequest;
}

@Injectable()
export class BalancesOverTimeChartStore extends ComponentStore<BalancesOverTimeChartState> {
  public readonly balanceOverTime$ = this.select(
    ({ balancesOverTime }) => balancesOverTime ?? { groups: [] }
  );

  public readonly balancesOverTimeLineChartData$ = this.select(
    this.balanceOverTime$,
    (data) => {
      // return data;
      return {
        groups: [
          {
            name: 'TESTE',
            color: '#c32f1c',
            series: [
              {
                name: '27/01',
                value: 2000,
              },
              {
                name: '27/02',
                value: 200,
              },
              {
                name: '27/03',
                value: 200,
              },
              {
                name: '27/04',
                value: -2000,
              },
              {
                name: '27/05',
                value: 2000,
              },

              {
                name: '27/06',
                value: 1000,
              },
              {
                name: '27/07',
                value: 4500,
              },
              {
                name: '27/08',
                value: null,
              },
              {
                name: '27/09',
                value: 3000,
              },
              {
                name: '27/10',
                value: 3000,
              },
              {
                name: '27/11',
                value: 3000,
              },
              {
                name: '27/12',
                value: 200,
              },
              {
                name: '27/13',
                value: 200,
              },
              {
                name: '27/14',
                value: 200,
              },
              {
                name: '27/15',
                value: 0,
              },
              {
                name: '27/16',
                value: 2800,
              },
            ],
          },
          {
            name: 'TESTE IV',
            color: '#eecc1c',
            series: [
              {
                name: '27/01',
                value: 100,
              },
              {
                name: '27/02',
                value: 2000,
              },
              {
                name: '27/03',
                value: 1000,
              },
              {
                name: '27/04',
                value: 3000,
              },
              {
                name: '27/05',
                value: 500,
              },

              {
                name: '27/06',
                value: 600,
              },
              {
                name: '27/07',
                value: 2000,
              },
              {
                name: '27/08',
                value: 8000,
              },
              {
                name: '27/09',
                value: 12000,
              },
              {
                name: '27/10',
                value: 1500,
              },
              {
                name: '27/11',
                value: 600,
              },
              {
                name: '27/12',
                value: 900,
              },
              {
                name: '27/13',
                value: null,
              },
              {
                name: '27/14',
                value: 300,
              },
              {
                name: '27/15',
                value: 2000,
              },
              {
                name: '27/16',
                value: 6000,
              },
            ],
          },
          {
            name: 'Mais um teste',
            color: '#a2b42c',
            series: [
              {
                name: '27/01',
                value: 5000,
              },
              {
                name: '27/02',
                value: 4000,
              },
              {
                name: '27/03',
                value: 1000,
              },
              {
                name: '27/04',
                value: 1500,
              },
              {
                name: '27/05',
                value: null,
              },

              {
                name: '27/06',
                value: 1500,
              },
              {
                name: '27/07',
                value: 3000,
              },
              {
                name: '27/08',
                value: 4000,
              },
              {
                name: '27/09',
                value: 4900,
              },
              {
                name: '27/10',
                value: 1250,
              },
              {
                name: '27/11',
                value: 10000,
              },
              {
                name: '27/12',
                value: 2000,
              },
              {
                name: '27/13',
                value: 6000,
              },
              {
                name: '27/14',
                value: 8000,
              },
              {
                name: '27/15',
                value: 1500,
              },
              {
                name: '27/16',
                value: 0,
              },
            ],
          },
        ],
      } as LineChartData;
    }
  );

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
    (state, filter: GetBalanceOverTimeRequest) => {
      return {
        ...state,
        filter,
      };
    }
  );

  public readonly setFilter = this.effect(
    (event$: Observable<GetBalanceOverTimeRequest>) => {
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
        this._service.getBalancesOvertime(filter).pipe(
          tap({
            next: (response) => this._loadBalancesOverTimeSuccess(response),
            error: (error) => this._loadBalancesOverTimeFailure(error),
          })
        )
      )
    );
  });
}
