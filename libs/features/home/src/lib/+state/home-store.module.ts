import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HOME_FEATURE_KEY } from './home-store.actions';
import { HomeStoreEffects } from './home-store.effects';
import { HomeStoreFacade } from './home-store.facade';
import { homeStoreReducer } from './home-store.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(HOME_FEATURE_KEY, homeStoreReducer),
    EffectsModule.forFeature([HomeStoreEffects]),
  ],
  providers: [HomeStoreFacade],
})
export class HomeStoreModule {}
