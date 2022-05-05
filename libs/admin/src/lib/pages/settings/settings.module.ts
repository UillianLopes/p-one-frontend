import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { POneNotificationsDisplayButtonModule } from '@p-one/notification';
import {
  POneBreadcrumbModule,
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

function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/libs/admin/settings/',
    '.json'
  );
}

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
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
})
export class SettingsModule {}
