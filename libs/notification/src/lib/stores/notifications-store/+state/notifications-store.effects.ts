import { Inject, Injectable } from '@angular/core';
import { HttpTransportType } from '@microsoft/signalr';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { createSignalRHub, mergeMapHubToAction, SIGNALR_HUB_UNSTARTED, startSignalRHub } from 'ngrx-signalr-core';
import { merge, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { NOTIFICATION_ENDPOINT } from '../../../contants';
import { NotificationService } from '../../../services';
import {
  ENotificationsStoreActions,
  loadUnreadNotifications,
  loadUnreadNotificationsFailure,
  loadUnreadNotificationsSuccess,
  markAllNotificationsAsReadFailure,
  markAllNotificationsAsReadSuccess,
  markNotificationAsReadFailure,
  markNotificationAsReadSuccess,
  newNotificationArrived,
  NotificationsStoreActionsUnion,
} from './notifications-store.actions';

@Injectable()
export class NotificationsStoreEffects {
  public readonly loadUnreadNotificationsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ENotificationsStoreActions.LOAD_UNREAD_NOTIFICATIONS),
      switchMap(() =>
        this._notificationsService.unreadNotifications().pipe(
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

  public readonly markNotificationAsReadEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ENotificationsStoreActions.MARK_NOTIFICATION_AS_READ),
      switchMap(({ notificationId }) =>
        this._notificationsService.markNotificationAsRead(notificationId).pipe(
          map(() => markNotificationAsReadSuccess({ notificationId })),
          catchError((error) => of(markNotificationAsReadFailure({ error })))
        )
      )
    )
  );

  public readonly markAllNotificationsAsReadEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ENotificationsStoreActions.MARK_ALL_NOTIFICATIONS_AS_READ),
      switchMap(() =>
        this._notificationsService.markAllNotificationsAsRead().pipe(
          map(() => markAllNotificationsAsReadSuccess()),
          catchError((error) =>
            of(markAllNotificationsAsReadFailure({ error }))
          )
        )
      )
    )
  );

  public readonly markAllNotificationsAsReadSuccesEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ENotificationsStoreActions.MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS),
      map(() => loadUnreadNotifications())
    )
  );

  public readonly startNotificationsHubEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ENotificationsStoreActions.START_NOTIFICATIONS_HUB),
      map(() => {
        return createSignalRHub({
          hubName: 'Notifications HUB',
          url: `${this._notificationEndpoint}/hubs/notifications`,
          options: {
            transport: HttpTransportType.WebSockets,
            accessTokenFactory: () =>
              this._oidcSecurityService.getAccessToken(),
            logMessageContent: true,
          },
        });
      })
    )
  );

  public readonly signalRHubUnstarted$ = createEffect(() =>
    this._actions$.pipe(
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
    private readonly _actions$: Actions<NotificationsStoreActionsUnion>,
    private readonly _notificationsService: NotificationService,
    private readonly _oidcSecurityService: OidcSecurityService,
    @Inject(NOTIFICATION_ENDPOINT)
    private readonly _notificationEndpoint: string
  ) {}
}
