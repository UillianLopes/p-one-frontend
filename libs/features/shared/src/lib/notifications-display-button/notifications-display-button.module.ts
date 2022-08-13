import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { POneButtonModule } from '@p-one/shared';
import { POneNotificationsStoreModule } from '@p-one/stores/notifications';

import { NotificationsDisplayButtonComponent } from './notifications-display-button.component';

@NgModule({
  declarations: [NotificationsDisplayButtonComponent],
  exports: [NotificationsDisplayButtonComponent],
  imports: [
    CommonModule,
    POneNotificationsStoreModule,
    POneButtonModule,
    NgbPopoverModule,
  ],
})
export class POneNotificationsDisplayButtonModule {}
