import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
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

import { SettingsEffects } from './+state/settings.effects';
import { SettingsFacade } from './+state/settings.facade';
import { SETTINGS_FEATURE_KEY, settingsReducer } from './+state/settings.reducer';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings.routing';

function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/libs/admin/settings/', '.json');
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
    StoreModule.forFeature(SETTINGS_FEATURE_KEY, settingsReducer),
    EffectsModule.forFeature([SettingsEffects]),
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
  providers: [SettingsFacade],
})
export class SettingsModule {
  constructor(
    translateService: TranslateService,
    private readonly _settingsFacade: SettingsFacade
  ) {
    this._settingsFacade.settings$.subscribe((settings) => {
      if (settings) {
        translateService.use(settings.language);
      }
    });
  }
}
