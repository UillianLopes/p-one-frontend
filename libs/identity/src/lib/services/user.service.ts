import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ResponseModel } from '@p-one/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDENTITY_API_URL } from '../constants';
import { CreateUserRequest } from '../models/requests/create-user.request';

@Injectable()
export class UserService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(IDENTITY_API_URL) private readonly _identityApiUrl: string
  ) {}

  public create(user: CreateUserRequest): Observable<unknown> {
    return this._httpClient
      .post<ResponseModel<unknown>>(`${this._identityApiUrl}/user`, user)
      .pipe(map(({ data }) => data));
  }
}
