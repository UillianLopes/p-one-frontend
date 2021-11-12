import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { FINANCIAL_API_URL } from '../../../contants/tokens';
import { ResponseModel, SubCategoryModel } from '../../../models';
import { ErrorModel } from '../../../models/responses/error.model';

@Injectable()
export class SubCategoryService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(FINANCIAL_API_URL) private readonly _financialApiUrl: string
  ) {}

  get(): Observable<SubCategoryModel[]> {
    return this._httpClient
      .get<ResponseModel<SubCategoryModel[]>>(
        `${this._financialApiUrl}/SubCategory`
      )
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  create(category: SubCategoryModel): Observable<SubCategoryModel> {
    return this._httpClient
      .post<ResponseModel<SubCategoryModel>>(
        `${this._financialApiUrl}/SubCategory`,
        category
      )
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  update(id: string, category: SubCategoryModel): Observable<SubCategoryModel> {
    return this._httpClient
      .put<ResponseModel<SubCategoryModel>>(
        `${this._financialApiUrl}/SubCategory/${id}`,
        category
      )
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  delete(categoryId: string): Observable<SubCategoryModel> {
    return this._httpClient
      .delete<ResponseModel<SubCategoryModel>>(
        `${this._financialApiUrl}/SubCategory/${categoryId}`
      )
      .pipe(
        map((resposne) => resposne.data),
        catchError((err) =>
          throwError({ messages: err.messages } as ErrorModel)
        )
      );
  }

  deleteMultiple(categoryIds: string[]): Observable<SubCategoryModel> {
    return this._httpClient
      .delete<ResponseModel<SubCategoryModel>>(
        `${this._financialApiUrl}/SubCategory`,
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
