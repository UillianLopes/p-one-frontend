import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ResponseModel, serializeToQueryParams } from '@p-one/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { FINANCIAL_ENDPOINT } from '../contants/financial-endpoints.token';
import {
  BuildEntryReccurrenceRequest,
  CreateEntryRequest,
  EntryFilterRequest,
  EntryModel,
  ErrorModel,
  PayEntryRequest,
  RecurrenceModel,
} from '../models';
import { UpdateEntryRequest } from '../models/requests/update-entry.request';

@Injectable()
export class EntryService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(FINANCIAL_ENDPOINT) private readonly _financialApiUrl: string
  ) {}

  public get(filter: Partial<EntryFilterRequest>): Observable<EntryModel[]> {
    return this._httpClient
      .get<ResponseModel<EntryModel[]>>(`${this._financialApiUrl}/Entry`, {
        params: serializeToQueryParams(filter),
      })
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  buildEntryRecurrence(
    model: Partial<BuildEntryReccurrenceRequest>
  ): Observable<RecurrenceModel[]> {
    return this._httpClient
      .post<ResponseModel<RecurrenceModel[]>>(
        `${this._financialApiUrl}/Entry/BuildEntryRecurrence`,
        model
      )
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  create(body: Partial<CreateEntryRequest>): Observable<EntryModel[]> {
    return this._httpClient
      .post<ResponseModel<EntryModel[]>>(`${this._financialApiUrl}/Entry`, body)
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  update(id: string, body: Partial<UpdateEntryRequest>): Observable<any> {
    return this._httpClient
      .put<ResponseModel>(`${this._financialApiUrl}/Entry/${id}`, body)
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  patch(id: string, patch: string, value: any): Observable<EntryModel> {
    return this._httpClient
      .patch<ResponseModel<EntryModel>>(
        `${this._financialApiUrl}/Entry/${id}`,
        { op: 'replace', patch, value }
      )
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  delete(categoryId: string): Observable<EntryModel> {
    return this._httpClient
      .delete<ResponseModel<EntryModel>>(
        `${this._financialApiUrl}/Entry/${categoryId}`
      )
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  deleteMultiple(ids: string[]): Observable<EntryModel> {
    return this._httpClient
      .delete<ResponseModel<EntryModel>>(`${this._financialApiUrl}/Entry`, {
        params: {
          ids,
        },
      })
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  payEntry(id: string, pay: PayEntryRequest): Observable<EntryModel> {
    return this._httpClient
      .put<ResponseModel<EntryModel>>(
        `${this._financialApiUrl}/Entry/${id}/Pay`,
        pay
      )
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }
}
