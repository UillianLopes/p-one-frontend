import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { POneNotificationsDisplayButtonModule } from '@p-one/features/shared';
import {
  POneBreadcrumbModule,
  POneButtonModule,
  POneCardModule,
  POneContainerModule,
  POneDynamicFormsModule,
  POneFlexModule,
  POneHeaderModule,
  POneInputModule,
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
    POneNotificationsDisplayButtonModule,
    POneDynamicFormsModule,
    ReactiveFormsModule,
    FormsModule,
    POneInputModule,
    FormsModule,
    POneCardModule,
    POneBreadcrumbModule,
    POneFlexModule,
    POneButtonModule,
    TranslateModule,
  ],
})
export class SettingsModule {}
