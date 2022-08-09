import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { POneInputModule, POneStepperModule } from '@p-one/shared';
import { AuthenticationStoreModule } from '@p-one/stores/identity';

import { SignInComponent } from './sign-in.component';
import { SignInRoutingModule } from './sing-in.routing';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    POneStepperModule,
    FormsModule,
    ReactiveFormsModule,
    POneInputModule,
    AuthenticationStoreModule,
  ],
})
export class SignInModule {}
