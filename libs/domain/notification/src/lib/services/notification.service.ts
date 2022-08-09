import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ResponseModel } from '@p-one/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NOTIFICATION_ENDPOINT } from '../constants';
import { NotificationModel } from '../models';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(NOTIFICATION_ENDPOINT) private readonly _endpoint: string,
    private readonly _httpClient: HttpClient
  ) {}

  public unreadNotifications(): Observable<NotificationModel[]> {
    return this._httpClient
      .get<ResponseModel<NotificationModel[]>>(
        `${this._endpoint}/notification/unread`
      )
      .pipe(map(({ data }) => data));
  }

  public markNotificationAsRead(
    notificationId: string
  ): Observable<NotificationModel[]> {
    return this._httpClient
      .put<ResponseModel<NotificationModel[]>>(
        `${this._endpoint}/DomainNotification/${notificationId}/MarkAsRead`,
        {}
      )
      .pipe(map(({ data }) => data));
  }

  public markNotificationAsUnread(
    notificationId: string
  ): Observable<NotificationModel[]> {
    return this._httpClient
      .put<ResponseModel<NotificationModel[]>>(
        `${this._endpoint}/DomainNotification/${notificationId}/MarkAsUnread`,
        {}
      )
      .pipe(map(({ data }) => data));
  }

  public markAllNotificationsAsRead(): Observable<NotificationModel[]> {
    return this._httpClient
      .put<ResponseModel<NotificationModel[]>>(
        `${this._endpoint}/DomainNotification/MarkAllNotificationsAsRead`,
        {}
      )
      .pipe(map(({ data }) => data));
  }
}
