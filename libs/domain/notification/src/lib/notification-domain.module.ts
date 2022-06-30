import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NOTIFICATION_ENDPOINT } from './constants';
import { NotificationService } from './services';

export interface NotificationConfig {
  endpoint: string;
}

@NgModule({
  imports: [CommonModule],
})
export class POneNotificationDomainModule {
  static forRoot({ endpoint }: NotificationConfig) {
    return {
      ngModule: POneNotificationDomainModule,
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
