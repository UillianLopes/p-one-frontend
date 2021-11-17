import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { FINANCIAL_API_URL } from '../../../contants/tokens';
import { CategoryModel, EntryFilter, EntryModel, RecurrenceModel, ResponseModel } from '../../../models';
import { BuildEntryReccurrenceRequest } from '../../../models/requests/build-entry-recurrence.request';
import { ErrorModel } from '../../../models/responses/error.model';

@Injectable()
export class EntryService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(FINANCIAL_API_URL) private readonly _financialApiUrl: string
  ) {}

  get(filter: Partial<EntryFilter>): Observable<EntryModel[]> {
    return this._httpClient
      .get<ResponseModel<EntryModel[]>>(`${this._financialApiUrl}/Entry`, {
        params: {
          ...filter,
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

  create(category: CategoryModel): Observable<CategoryModel> {
    return this._httpClient
      .post<ResponseModel<CategoryModel>>(
        `${this._financialApiUrl}/Entry`,
        category
      )
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  update(id: string, category: CategoryModel): Observable<CategoryModel> {
    return this._httpClient
      .put<ResponseModel<CategoryModel>>(
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

  delete(categoryId: string): Observable<CategoryModel> {
    return this._httpClient
      .delete<ResponseModel<CategoryModel>>(
        `${this._financialApiUrl}/Entry/${categoryId}`
      )
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  deleteMultiple(categoryIds: string[]): Observable<CategoryModel> {
    return this._httpClient
      .delete<ResponseModel<CategoryModel>>(`${this._financialApiUrl}/Entry`, {
        params: {
          ids: categoryIds,
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
