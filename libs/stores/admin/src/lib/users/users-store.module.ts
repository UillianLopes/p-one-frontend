import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UsersStoreEffects } from './+state/users-store.effects';
import { UsersStoreFacade } from './+state/users-store.facade';
import { USERS_STORE_FEATURE_KEY, usersStoreReducer } from './+state/users-store.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(USERS_STORE_FEATURE_KEY, usersStoreReducer),
    EffectsModule.forFeature([UsersStoreEffects]),
  ],
  providers: [UsersStoreFacade],
})
export class UsersStoreModule {}
