import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserStoreModule } from '@p-one/domain/identity';
import { POneInputModule, POneStepperModule } from '@p-one/shared';

import { SignInComponent } from './sign-in.component';
import { SignInRoutingModule } from './sing-in.routing';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    UserStoreModule,
    POneStepperModule,
    FormsModule,
    ReactiveFormsModule,
    POneInputModule,
  ],
})
export class SignInModule {}
