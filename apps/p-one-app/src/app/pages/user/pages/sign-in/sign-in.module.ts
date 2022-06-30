import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { POneUsersStoreModule } from '@p-one/stores/users';
import { POneInputModule, POneStepperModule } from '@p-one/shared';

import { SignInComponent } from './sign-in.component';
import { SignInRoutingModule } from './sing-in.routing';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    POneUsersStoreModule,
    POneStepperModule,
    FormsModule,
    ReactiveFormsModule,
    POneInputModule,
  ],
})
export class SignInModule {}
