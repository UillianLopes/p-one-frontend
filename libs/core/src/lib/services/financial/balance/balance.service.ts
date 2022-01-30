import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { FINANCIAL_API_URL } from '../../../contants/tokens';
import { BalanceModel, ResponseModel } from '../../../models';
import { CreateBalanceRequest } from '../../../models/requests/create-balance.request';
import { UpdateBalanceRequest } from '../../../models/requests/update-balance.request';
import { ErrorModel } from '../../../models/responses/error.model';

@Injectable()
export class BalanceService {

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(FINANCIAL_API_URL) private readonly _financialApiUrl: string
  ) {}

  public get(): Observable<BalanceModel[]> {
    return this._httpClient
      .get<ResponseModel<BalanceModel[]>>(`${this._financialApiUrl}/Balance`)
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  public create(balance: CreateBalanceRequest): Observable<BalanceModel> {
    return this._httpClient
      .post<ResponseModel<BalanceModel>>(
        `${this._financialApiUrl}/Balance`,
        balance
      )
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  public update(
    balanceId: string,
    balance: UpdateBalanceRequest
  ): Observable<BalanceModel> {
    return this._httpClient
      .put<ResponseModel<BalanceModel>>(
        `${this._financialApiUrl}/Balance/${balanceId}`,
        balance
      )
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  public delete(balanceId: string): Observable<BalanceModel> {
    return this._httpClient
      .delete<ResponseModel<BalanceModel>>(
        `${this._financialApiUrl}/Balance/${balanceId}`
      )
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  public deleteMultiple(ids: string[]): Observable<BalanceModel> {
    return this._httpClient
      .delete<ResponseModel<BalanceModel>>(`${this._financialApiUrl}/Balance`, {
        params: {
          ids: ids,
        },
      })
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }


}
