import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserStoreModule } from '@p-one/identity';
import { POneInputModule, POneStepperModule } from '@p-one/shared';
import { AuthModule } from 'angular-auth-oidc-client';

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
    AuthModule,
  ],
})
export class SignInModule {}
