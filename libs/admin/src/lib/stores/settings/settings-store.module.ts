import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SettingsEffects } from './+state/settings.effects';
import { SettingsFacade } from './+state/settings.facade';
import { SETTINGS_FEATURE_KEY, settingsReducer } from './+state/settings.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(SETTINGS_FEATURE_KEY, settingsReducer),
    EffectsModule.forFeature([SettingsEffects]),
  ],
  providers: [SettingsFacade],
})
export class SettingsStoreModule {}
