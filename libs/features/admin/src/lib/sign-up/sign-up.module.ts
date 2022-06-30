import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import {
  POneAddressFormModule,
  POneBreadcrumbModule,
  POneCardModule,
  POneContainerModule,
  POneDatepickerModule,
  POneFlexModule,
  POneHeaderModule,
  POneInputModule,
  POneStepperModule,
} from '@p-one/shared';
import { POneSettingsStoreModule } from '@p-one/stores/settings';
import { POneUsersStoreModule } from '@p-one/stores/users';
import { NgxMaskModule } from 'ngx-mask';


import { SignUpEffects } from './+state/sign-up-store.effects';
import { SignUpFacade } from './+state/sign-up-store.facade';
import { SIGN_UP_KEY, signUpReducer } from './+state/sign-up-store.reducer';
import { SignUpCardComponent } from './sign-up-card/sign-up-card.component';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up.routing';

@NgModule({
  declarations: [SignUpComponent, SignUpCardComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    POneContainerModule,
    POneStepperModule,
    POneInputModule,
    POneAddressFormModule,
    POneCardModule,
    ReactiveFormsModule,
    FormsModule,
    POneHeaderModule,
    POneBreadcrumbModule,
    POneFlexModule,
    POneUsersStoreModule,
    StoreModule.forFeature(SIGN_UP_KEY, signUpReducer),
    EffectsModule.forFeature([SignUpEffects]),
    POneDatepickerModule,
    NgxMaskModule,
    TranslateModule,
    POneSettingsStoreModule,
  ],
  providers: [SignUpFacade],
  exports: [SignUpCardComponent],
})
export class POneSignUpModule { }
