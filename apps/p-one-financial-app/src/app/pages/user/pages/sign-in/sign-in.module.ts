import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { POneInputModule, POneStepperModule } from '@p-one/shared';
import { AuthModule } from 'angular-auth-oidc-client';

import { UserStoreModule } from '../../../../stores/user-store/user-store.module';
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
