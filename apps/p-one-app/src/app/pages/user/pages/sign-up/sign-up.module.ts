import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {
  POneAddressFormModule,
  POneCardModule,
  POneDynamicFormsModule,
  POneFlexModule,
  POneInputModule,
  POnePhoneFormModule,
  POneStepperModule,
} from '@p-one/shared';
import { NgxMaskModule } from 'ngx-mask';

import { UserStoreModule } from '../../../../stores/user-store/user-store.module';
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
    POneAddressFormModule,
  ],
})
export class SignUpModule {}
