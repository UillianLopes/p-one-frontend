import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UsersStoreEffects } from './users-store.effects';
import { UsersStoreFacade } from './users-store.facade';
import { USERS_STORE_FEATURE_KEY, usersStoreReducer } from './users-store.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(USERS_STORE_FEATURE_KEY, usersStoreReducer),
    EffectsModule.forFeature([UsersStoreEffects]),
  ],
  providers: [UsersStoreFacade],
})
export class UsersStoreModule {}
