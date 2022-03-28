import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LineChartData } from '../../../../../shared/src';
import { FINANCIAL_API_URL } from '../../contants/tokens';
import { ResponseModel } from '../../models';
import { GetBalanceOverTimeRequest } from '../../models/financial/requests';
import { serializeToQueryParams } from '../../utils/serialize-to-query-params';

@Injectable()
export class DashboardService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(FINANCIAL_API_URL) private readonly _apiUrl: string
  ) {}

  public getBalancesOvertime(
    filter: Partial<GetBalanceOverTimeRequest>
  ): Observable<LineChartData> {
    return this._httpClient
      .get<ResponseModel<LineChartData>>(
        `${this._apiUrl}/Dashboard/BalanceOverTime`,
        {
          params: serializeToQueryParams(filter),
        }
      )
      .pipe(map((response) => response.data));
  }
}
