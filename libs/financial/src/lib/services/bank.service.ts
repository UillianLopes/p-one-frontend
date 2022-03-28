import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { FINANCIAL_API_URL } from '../contants/tokens';
import { BankModel, ErrorModel, ResponseModel } from '../models';

@Injectable()
export class BankService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(FINANCIAL_API_URL) private readonly _financialApiUrl: string
  ) {}

  getAll(): Observable<BankModel[]> {
    return this._httpClient
      .get<ResponseModel<BankModel[]>>(`${this._financialApiUrl}/bank`)
      .pipe(
        map(({ data }) => data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }
}
