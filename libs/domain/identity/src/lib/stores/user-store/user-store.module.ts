import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserStoreEffects } from './+state/user-store.effects';
import { UserStoreFacade } from './+state/user-store.facade';
import { USER_STORE_KEY, userStoreReducer } from './+state/user-store.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(USER_STORE_KEY, userStoreReducer),
    EffectsModule.forFeature([UserStoreEffects]),
  ],
  providers: [UserStoreFacade],
})
export class UserStoreModule {}
