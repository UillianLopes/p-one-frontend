import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbButtonsModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { UserStoreModule } from '@p-one/identity';
import {
  POneAddressFormModule,
  POneCardModule,
  POneContainerModule,
  POneDatepickerModule,
  POneDynamicFormsModule,
  POneFlexModule,
  POneHeaderModule,
  POneInputModule,
  POnePhoneFormModule,
  POneStepperModule,
} from '@p-one/shared';
import { NgxMaskModule } from 'ngx-mask';

import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up.routing';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    POneInputModule,
    ReactiveFormsModule,
    UserStoreModule,
    POneDynamicFormsModule,
    POneCardModule,
    POnePhoneFormModule,
    POneStepperModule,
    POneFlexModule,
    NgbDatepickerModule,
    NgxMaskModule,
    NgbButtonsModule,
    POneAddressFormModule,
    POneContainerModule,
    POneHeaderModule,
    POneDatepickerModule,
  ],
})
export class SignUpModule {}
