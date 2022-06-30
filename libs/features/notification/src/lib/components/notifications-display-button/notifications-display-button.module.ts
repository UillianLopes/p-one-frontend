import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { POneNotificationsStoreModule } from '@p-one/stores/notification';

import { NotificationsDisplayButtonComponent } from './notifications-display-button.component';

@NgModule({
  declarations: [NotificationsDisplayButtonComponent],
  exports: [NotificationsDisplayButtonComponent],
  imports: [CommonModule, POneNotificationsStoreModule, NgbPopoverModule],
})
export class POneNotificationsDisplayButtonModule { }
