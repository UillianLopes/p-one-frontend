import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OptionModel, ResponseModel, serializeToQueryParams } from '@p-one/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { FINANCIAL_ENDPOINT } from '../contants/financial-endpoints.token';
import { CategoryModel, EEntryOperation, ErrorModel } from '../models';

@Injectable()
export class CategoryService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(FINANCIAL_ENDPOINT) private readonly _financialApiUrl: string
  ) {}

  get(operation?: EEntryOperation): Observable<CategoryModel[]> {
    return this._httpClient
      .get<ResponseModel<CategoryModel[]>>(
        `${this._financialApiUrl}/Category`,
        {
          params: serializeToQueryParams({ operation }),
        }
      )
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  getAllAsOptions(type?: EEntryOperation): Observable<OptionModel[]> {
    return this._httpClient
      .get<ResponseModel<OptionModel[]>>(
        `${this._financialApiUrl}/Category/GetAllAsOptions`,
        {
          params: serializeToQueryParams({ type }),
        }
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
        `${this._financialApiUrl}/Category`,
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
        `${this._financialApiUrl}/Category/${id}`,
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
        `${this._financialApiUrl}/Category/${categoryId}`
      )
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  deleteMultiple(categoryIds?: string[]): Observable<CategoryModel> {
    return this._httpClient
      .delete<ResponseModel<CategoryModel>>(
        `${this._financialApiUrl}/Category`,
        {
          params: {
            ids: categoryIds ?? [],
          },
        }
      )
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }
}
