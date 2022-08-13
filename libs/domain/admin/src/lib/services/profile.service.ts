import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OptionModel, ResponseModel } from '@p-one/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ADMIN_ENDPOINT } from '../constants';
import { ProfileModel } from '../models';

@Injectable()
export class ProfileService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(ADMIN_ENDPOINT) private readonly _adminEndpoint: string
  ) {}

  public getAllAsOptions(): Observable<OptionModel[]> {
    return this._httpClient
      .get<ResponseModel<OptionModel[]>>(
        `${this._adminEndpoint}/profile/getAllAsOptions`
      )
      .pipe(map(({ data }) => data));
  }

  public getAll(): Observable<ProfileModel[]> {
    return this._httpClient
      .get<ResponseModel<ProfileModel[]>>(
        `${this._adminEndpoint}/profile`
      )
      .pipe(map(({ data }) => data));
  }
}
