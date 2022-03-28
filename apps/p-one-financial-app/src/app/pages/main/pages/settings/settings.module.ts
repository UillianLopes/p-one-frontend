import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  POneContainerModule,
  POneHeaderModule,
  POneSidenavModule,
} from '@p-one/shared';

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
  ],
})
export class SettingsModule {}
