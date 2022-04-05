import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SignalREffects, signalrReducer } from 'ngrx-signalr-core';

import { NotificationsStoreEffects } from './+state/notifications-store.effects';
import { NotificationsStoreFacade } from './+state/notifications-store.facade';
import { NOTIFICATIONS_STORE_FEATURE_KEY, notificationsStoreReducer } from './+state/notifications-store.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(NOTIFICATIONS_STORE_FEATURE_KEY, {
      signalr: signalrReducer,
      notifications: notificationsStoreReducer,
    }),
    EffectsModule.forFeature([SignalREffects, NotificationsStoreEffects]),
  ],
  providers: [NotificationsStoreFacade],
})
export class NotificationsStoreModule {}
