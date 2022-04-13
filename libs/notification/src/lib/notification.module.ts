import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NOTIFICATION_ENDPOINT } from './contants';
import { NotificationService } from './services';

export interface NotificationConfig {
  endpoint: string;
}

@NgModule({
  imports: [CommonModule],
})
export class POneNotificationModule {
  static forRoot({ endpoint }: NotificationConfig) {
    return {
      ngModule: POneNotificationModule,
      providers: [
        {
          provide: NOTIFICATION_ENDPOINT,
          useValue: endpoint,
        },
        NotificationService,
      ],
    };
  }
}
