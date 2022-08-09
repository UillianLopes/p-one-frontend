import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthenticationStoreEffects } from './+state/authentication-store.effects';
import { AuthenticationStoreFacade } from './+state/authentication-store.facade';
import { AUTHENTICATION_STORE_KEY, authenticationStoreReducer } from './+state/authentication-store.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      AUTHENTICATION_STORE_KEY,
      authenticationStoreReducer
    ),
    EffectsModule.forFeature([AuthenticationStoreEffects]),
  ],
  providers: [AuthenticationStoreFacade],
})
export class AuthenticationStoreModule {}
