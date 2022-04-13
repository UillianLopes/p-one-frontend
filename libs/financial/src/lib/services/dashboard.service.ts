import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ResponseModel, serializeToQueryParams } from '@p-one/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FINANCIAL_ENDPOINT } from '../contants/financial-endpoints.token';
import { BalancesOverTimeFilter } from '../models';



@Injectable()
export class DashboardService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(FINANCIAL_ENDPOINT) private readonly _apiUrl: string
  ) {}

  public getBalancesOvertime(
    filter: Partial<BalancesOverTimeFilter>
  ): Observable<any> {
    return this._httpClient
      .get<ResponseModel<any>>(`${this._apiUrl}/Dashboard/BalanceOverTime`, {
        params: serializeToQueryParams(filter),
      })
      .pipe(map((response) => response.data));
  }
}
