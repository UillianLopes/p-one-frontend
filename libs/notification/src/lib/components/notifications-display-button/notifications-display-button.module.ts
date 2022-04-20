import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { NotificationsStoreModule } from '../../stores';
import { NotificationsDisplayButtonComponent } from './notifications-display-button.component';

@NgModule({
  declarations: [NotificationsDisplayButtonComponent],
  exports: [NotificationsDisplayButtonComponent],
  imports: [CommonModule, NotificationsStoreModule, NgbPopoverModule],
})
export class POneNotificationsDisplayButtonModule {}
