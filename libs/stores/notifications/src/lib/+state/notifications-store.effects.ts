import { Inject, Injectable } from '@angular/core';
import { HttpTransportType } from '@microsoft/signalr';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NOTIFICATION_ENDPOINT, NotificationModel, NotificationService } from '@p-one/domain/notification';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { createSignalRHub, mergeMapHubToAction, ofHub, signalrHubUnstarted, startSignalRHub } from 'ngrx-signalr-core';
import { merge, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

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
  private readonly _hub = {
    hubName: 'NOTIFICATIONS HUB',
    url: `${this._notificationEndpoint}/hubs/notifications`,
  };

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
          ...this._hub,
          options: {
            transport: HttpTransportType.WebSockets,
            accessTokenFactory: () =>
              new Promise((resolve) => {
                this._oidcSecurityService
                  .getAccessToken()
                  .pipe(take(1))
                  .subscribe((accessToken) => {
                    resolve(accessToken);
                  });
              }),
            logMessageContent: true,
          },
        });
      })
    )
  );

  public readonly signalRHubUnstarted$ = createEffect(() =>
    this._actions$.pipe(
      ofType(signalrHubUnstarted),
      ofHub(this._hub),
      mergeMapHubToAction(({ hub }) => {
        const onNewNotification$ = hub
          .on<NotificationModel>('NOTIFICATE')
          .pipe(
            map((notification) => newNotificationArrived({ notification }))
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
