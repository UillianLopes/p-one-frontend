import { Inject, Injectable } from '@angular/core';
import { HttpTransportType } from '@microsoft/signalr';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserStoreFacade } from '@p-one/identity';
import { createSignalRHub, mergeMapHubToAction, SIGNALR_HUB_UNSTARTED, startSignalRHub } from 'ngrx-signalr-core';
import { merge, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { FINANCIAL_API_URL } from '../../../contants';
import { NotificationsService } from '../../../services';
import {
  ENotificationsStoreActions,
  loadUnreadNotificationsFailure,
  loadUnreadNotificationsSuccess,
  newNotificationArrived,
  NotificationsStoreActionsUnion,
} from './notifications-store.actions';

@Injectable()
export class NotificationsStoreEffects {
  public readonly loadUnreadNotificationsEffect$ = createEffect(() =>
    this._actions.pipe(
      ofType(ENotificationsStoreActions.LOAD_UNREAD_NOTIFICATIONS),
      switchMap(() =>
        this._notificationsService.getUnreadNotifications().pipe(
          map((unreadNotifications) =>
            loadUnreadNotificationsSuccess({
              unreadNotifications,
            })
          ),
          catchError((error) => of(loadUnreadNotificationsFailure({ error })))
        )
      )
    )
  );

  public readonly startNotificationsHubEffect$ = createEffect(() =>
    this._actions.pipe(
      ofType(ENotificationsStoreActions.START_NOTIFICATIONS_HUB),
      withLatestFrom(this._userStoreFacade.accessToken$),
      map(([_, accessToken]) => {
        return createSignalRHub({
          hubName: 'Notifications HUB',
          url: `${this._financialApiUrl}/hubs/notifications`,
          options: {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            logMessageContent: true,
          },
        });
      })
    )
  );

  public readonly signalRHubUnstarted$ = createEffect(() =>
    this._actions.pipe(
      ofType(SIGNALR_HUB_UNSTARTED),
      mergeMapHubToAction(({ hub }) => {
        const onNewNotification$ = hub.on<any>('NOTIFICATE').pipe(
          map((json) => {
            return newNotificationArrived({ notification: json });
          })
        );

        return merge(onNewNotification$, of(startSignalRHub(hub)));
      })
    )
  );

  constructor(
    private readonly _notificationsService: NotificationsService,
    private readonly _actions: Actions<NotificationsStoreActionsUnion>,
    private readonly _userStoreFacade: UserStoreFacade,
    @Inject(FINANCIAL_API_URL) private readonly _financialApiUrl: string
  ) {}
}
