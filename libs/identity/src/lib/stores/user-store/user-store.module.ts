import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from 'angular-auth-oidc-client';

import { UserStoreEffects } from './+state/user-store.effects';
import { UserStoreFacade } from './+state/user-store.facade';
import { USER_STORE_KEY, userStoreReducer } from './+state/user-store.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(USER_STORE_KEY, userStoreReducer),
    EffectsModule.forFeature([UserStoreEffects]),
    AuthModule,
  ],
})
export class UserStoreModule {
  static forRoot(): ModuleWithProviders<UserStoreModule> {
    return {
      ngModule: UserStoreModule,
      providers: [UserStoreFacade],
    };
  }
}
