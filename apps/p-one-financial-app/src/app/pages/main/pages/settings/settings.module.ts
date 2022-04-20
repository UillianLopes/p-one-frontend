import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { POneNotificationsDisplayButtonModule } from '@p-one/notification';
import { POneContainerModule, POneHeaderModule, POneSidenavModule } from '@p-one/shared';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings.routing';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    POneContainerModule,
    POneSidenavModule,
    POneHeaderModule,
    POneNotificationsDisplayButtonModule,
  ],
})
export class SettingsModule {}
