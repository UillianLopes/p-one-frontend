import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { POneNotificationsDisplayButtonModule } from '@p-one/notification';
import { POneContainerModule, POneDynamicFormsModule, POneHeaderModule, POneSidenavModule } from '@p-one/shared';

import { SettingsEffects } from './+state/settings.effects';
import { SettingsFacade } from './+state/settings.facade';
import { SETTINGS_FEATURE_KEY, settingsReducer } from './+state/settings.reducer';
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
    StoreModule.forFeature(SETTINGS_FEATURE_KEY, settingsReducer),
    EffectsModule.forFeature([SettingsEffects]),
  ],
  providers: [SettingsFacade],
})
export class SettingsModule {}
