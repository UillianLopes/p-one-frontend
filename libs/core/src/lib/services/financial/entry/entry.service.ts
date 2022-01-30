import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { FINANCIAL_API_URL } from '../../../contants/tokens';
import { CategoryModel, EntryFilterRequest, EntryModel, RecurrenceModel, ResponseModel } from '../../../models';
import { BuildEntryReccurrenceRequest } from '../../../models/requests/build-entry-recurrence.request';
import { CreateEntryRequest } from '../../../models/requests/create-entry.request';
import { PayEntryRequest } from '../../../models/requests/pay-entry.request';
import { ErrorModel } from '../../../models/responses/error.model';

function cleanFilter(filter: any) {
  if (!filter) {
    return {};
  }

  const keys = Object.keys(filter);
  let param = {};

  for (let key of keys) {
    if (filter[key] === undefined || filter[key] === null) {
      continue;
    }

    param = {
      ...param,
      [key]: filter[key],
    };
  }

  return {
    ...param,
  };
}
@Injectable()
export class EntryService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(FINANCIAL_API_URL) private readonly _financialApiUrl: string
  ) {}

  get(filter: Partial<EntryFilterRequest>): Observable<EntryModel[]> {
    return this._httpClient
      .get<ResponseModel<EntryModel[]>>(`${this._financialApiUrl}/Entry`, {
        params: {
          ...cleanFilter(filter),
        },
      })
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  buildEntryRecurrence(
    model: BuildEntryReccurrenceRequest
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

  create(entry: CreateEntryRequest): Observable<EntryModel[]> {
    return this._httpClient
      .post<ResponseModel<EntryModel[]>>(
        `${this._financialApiUrl}/Entry`,
        entry
      )
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  update(id: string, category: CategoryModel): Observable<EntryModel> {
    return this._httpClient
      .put<ResponseModel<EntryModel>>(
        `${this._financialApiUrl}/Entry/${id}`,
        category
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
