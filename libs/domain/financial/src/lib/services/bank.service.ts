import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ResponseModel } from '@p-one/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { FINANCIAL_ENDPOINT } from '../contants';
import { BankModel, ErrorModel } from '../models';

@Injectable()
export class BankService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(FINANCIAL_ENDPOINT) private readonly _financialEndpoint: string
  ) {}

  getAll(): Observable<BankModel[]> {
    return this._httpClient
      .get<ResponseModel<BankModel[]>>(`${this._financialEndpoint}/bank`)
      .pipe(
        map(({ data }) => data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }
}
