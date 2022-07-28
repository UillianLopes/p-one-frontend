import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ResponseModel } from '@p-one/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ADMIN_ENDPOINT } from '../constants/admin-endpoints.token';
import { SettingsModel, UserModel } from '../models';
import { GetAllUsersQuery } from '../queries';
import { CreateUserRequest } from '../requests';

@Injectable()
export class UserService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(ADMIN_ENDPOINT) private readonly _adminEndpoint: string
  ) {}

  public settings(): Observable<SettingsModel> {
    return this._httpClient
      .get<ResponseModel<SettingsModel>>(`${this._adminEndpoint}/user/settings`)
      .pipe(map(({ data }) => data));
  }

  public updateSettings(settings: SettingsModel): Observable<SettingsModel> {
    return this._httpClient
      .put<ResponseModel>(`${this._adminEndpoint}/user/settings`, settings)
      .pipe(map(({ data }) => data));
  }

  public create(user: CreateUserRequest): Observable<unknown> {
    return this._httpClient
      .post<ResponseModel<unknown>>(`${this._adminEndpoint}/user`, user)
      .pipe(map(({ data }) => data));
  }

  public getAll(
    query: Partial<GetAllUsersQuery>
  ): Observable<ResponseModel<UserModel[]>> {
    return this._httpClient.get<ResponseModel<UserModel[]>>(
      `${this._adminEndpoint}/user`,
      {
        params: { ...query },
      }
    );
  }
}
