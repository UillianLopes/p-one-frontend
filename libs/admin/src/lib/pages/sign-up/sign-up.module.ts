import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserStoreModule } from '@p-one/identity';
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
import { NgxMaskModule } from 'ngx-mask';

import { SignUpEffects } from './+state/sign-up-store.effects';
import { SignUpFacade } from './+state/sign-up-store.facade';
import { SIGN_UP_KEY, signUpReducer } from './+state/sign-up-store.reducer';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up.routing';

@NgModule({
  declarations: [SignUpComponent],
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
    UserStoreModule,
    StoreModule.forFeature(SIGN_UP_KEY, signUpReducer),
    EffectsModule.forFeature([SignUpEffects]),
    POneDatepickerModule,
    NgxMaskModule,
  ],
  providers: [SignUpFacade],
})
export class SignUpModule {}
