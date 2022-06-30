import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SettingsStoreEffects } from './+state/settings-store.effects';
import { SettingsStoreFacade } from './+state/settings-store.facade';
import {
  SETTINGS_FEATURE_KEY,
  settingsStoreReducer,
} from './+state/settings-store.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(SETTINGS_FEATURE_KEY, settingsStoreReducer),
    EffectsModule.forFeature([SettingsStoreEffects]),
  ],
  providers: [SettingsStoreFacade],
})
export class SettingsStoreModule {}
