import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProfilesListStoreEffects } from './profiles-list-store.effects';
import { ProfilesListStoreFacade } from './profiles-list-store.facade';
import { PROFILES_STORE_FEATURE_KEY, profilesListStoreReducer } from './profiles-list-store.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(
      PROFILES_STORE_FEATURE_KEY,
      profilesListStoreReducer
    ),
    EffectsModule.forFeature([ProfilesListStoreEffects]),
  ],
  providers: [ProfilesListStoreFacade],
})
export class ProfilesListStoreModule {}
