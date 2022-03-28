import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { serializeToQueryParams } from '@p-one/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FINANCIAL_API_URL } from '../contants/tokens';
import { GetBalanceOverTimeRequest, ResponseModel } from '../models';

@Injectable()
export class DashboardService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(FINANCIAL_API_URL) private readonly _apiUrl: string
  ) {}

  public getBalancesOvertime(
    filter: Partial<GetBalanceOverTimeRequest>
  ): Observable<any> {
    return this._httpClient
      .get<ResponseModel<any>>(`${this._apiUrl}/Dashboard/BalanceOverTime`, {
        params: serializeToQueryParams(filter),
      })
      .pipe(map((response) => response.data));
  }
}
