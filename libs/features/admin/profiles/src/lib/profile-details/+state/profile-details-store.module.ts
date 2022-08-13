import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProfilesDetailsStoreEffects } from './profile-details-store.effects';
import { ProfileDetailsStoreFacade } from './profile-details-store.facade';
import { PROFILE_DETAILS_STORE_FEATURE_KEY, profileDetailsStoreReducer } from './profile-details-store.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(
      PROFILE_DETAILS_STORE_FEATURE_KEY,
      profileDetailsStoreReducer
    ),
    EffectsModule.forFeature([ProfilesDetailsStoreEffects]),
  ],
  providers: [ProfileDetailsStoreFacade],
})
export class ProfileDetailsStoreModule {}
