import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ResponseModel } from '@p-one/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { FINANCIAL_ENDPOINT } from '../contants/financial-endpoints.token';
import { CategoryModel, EEntryType, ErrorModel } from '../models';

@Injectable()
export class CategoryService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(FINANCIAL_ENDPOINT) private readonly _financialApiUrl: string
  ) {}

  get(type?: EEntryType): Observable<CategoryModel[]> {
    const params: any = {
      type,
    };
    return this._httpClient
      .get<ResponseModel<CategoryModel[]>>(
        `${this._financialApiUrl}/Category`,
        {
          params,
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

  deleteMultiple(categoryIds: string[]): Observable<CategoryModel> {
    return this._httpClient
      .delete<ResponseModel<CategoryModel>>(
        `${this._financialApiUrl}/Category`,
        {
          params: {
            ids: categoryIds,
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
