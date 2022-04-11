import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NotificationModel, ResponseModel } from '@p-one/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FINANCIAL_API_URL } from '../contants';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(FINANCIAL_API_URL) private readonly _financialApiUrl: string
  ) {}

  public getUnreadNotifications(): Observable<NotificationModel[]> {
    return this._httpClient
      .get<ResponseModel<NotificationModel[]>>(
        `${this._financialApiUrl}/notification/unread`
      )
      .pipe(map(({ data }) => data));
  }
}
